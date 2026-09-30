//#region ../../helper/utils/logger.ts
var LogLevel = /* @__PURE__ */ function(LogLevel) {
	LogLevel[LogLevel["DEBUG"] = 0] = "DEBUG";
	LogLevel[LogLevel["INFO"] = 1] = "INFO";
	LogLevel[LogLevel["WARN"] = 2] = "WARN";
	LogLevel[LogLevel["ERROR"] = 3] = "ERROR";
	return LogLevel;
}({});
var Logger = class {
	level;
	showTimestamp;
	constructor(options = {}) {
		this.level = options.level ?? LogLevel.INFO;
		this.showTimestamp = options.showTimestamp ?? true;
	}
	formatMessage(level, message) {
		const paddedLevel = level.toUpperCase().padEnd(5, " ");
		return `${this.showTimestamp ? `[${(/* @__PURE__ */ new Date()).toISOString()}] ` : ""}${paddedLevel}: ${message}`;
	}
	debug(message, ...args) {
		if (this.level <= LogLevel.DEBUG) console.debug(this.formatMessage("debug", message), ...args);
	}
	info(message, ...args) {
		if (this.level <= LogLevel.INFO) console.info(this.formatMessage("info", message), ...args);
	}
	warn(message, ...args) {
		if (this.level <= LogLevel.WARN) console.warn(this.formatMessage("warn", message), ...args);
	}
	error(message, ...args) {
		if (this.level <= LogLevel.ERROR) console.error(this.formatMessage("error", message), ...args);
	}
	setLevel(newLevel) {
		this.level = newLevel;
	}
};
var loggerInstance;
function getLogger() {
	if (!loggerInstance) loggerInstance = new Logger({
		level: LogLevel.DEBUG,
		showTimestamp: true
	});
	return loggerInstance;
}
//#endregion
//#region src/scripts/script.ts
var logger = getLogger();
/**
* "Rechnung aus Bestellung": liest Umgebungen, Firmen, Bestellungen und
* Lieferanten aus Business Central (per App-Registrierung, client_credentials)
* für das Formular (src/forms/form.ts), das daraus die Rechnungs-PDF erzeugt.
*
* Aufruf per POST mit { method, environment?, companyId?, orderNo? }:
* - getEnvironments                          -> { environments: [{ name, type }] }
* - getCompanies  (environment)              -> { companies: [{ id, name }] }
* - getOrders     (environment, companyId)   -> { orders: [...] }
* - getOrder      (environment, companyId, orderNo) -> { order, lines, vendor, buyer }
*   (buyer = companyInformation der Firma, für die E-Rechnung)
* Fehler: Status 4xx/500 mit { error }.
*
* customerVariables (von der Toolbox nur beim Neuanlegen gesetzt):
* erpTenantId, clientId, clientSecret (verschlüsselt). Das Business-Central-
* Token bleibt nur im Speicher der laufenden Script-Instanz - es wird NICHT in
* die Script-Variablen geschrieben (das würde das Client-Secret überschreiben).
*/
var BC_API = "https://api.businesscentral.dynamics.com";
var GWS_API = "api/gws/ecm/v1.0";
var RequestError = class extends Error {
	constructor(message, status = 400) {
		super(message);
		this.status = status;
	}
};
module.exports = async (req, res) => {
	try {
		const body = parseBody(req);
		const settings = {
			tenantId: String(req.var("erpTenantId") ?? "").trim(),
			clientId: String(req.var("clientId") ?? "").trim(),
			clientSecret: String(req.var("clientSecret") ?? "")
		};
		if (!settings.tenantId || !settings.clientId || !settings.clientSecret) throw new RequestError("Script-Variablen erpTenantId, clientId und clientSecret müssen gesetzt sein.", 500);
		const result = await dispatch(settings, body);
		res.status(200).set("Content-Type", "application/json").send(JSON.stringify(result));
	} catch (error) {
		const status = error instanceof RequestError ? error.status : 500;
		logger.error(`Error: ${error}`);
		res.status(status).set("Content-Type", "application/json").send(JSON.stringify({ error: error instanceof Error ? error.message : String(error) }));
	}
};
async function dispatch(settings, body) {
	const method = String(body.method ?? "");
	switch (method) {
		case "getEnvironments": return { environments: ((await bcGet(settings, `${BC_API}/admin/v2.11/applications/businesscentral/environments`)).value ?? []).map((e) => ({
			name: String(e.name ?? ""),
			type: String(e.type ?? "")
		})).filter((e) => e.name) };
		case "getCompanies": return { companies: (await bcGetAll(settings, `${bcBase(settings, requireEnvironment(body))}/api/v2.0/companies`)).map((c) => ({
			id: String(c.id ?? ""),
			name: String(c.displayName || c.name || c.id || "")
		})).filter((c) => c.id) };
		case "getOrders": return { orders: (await bcGetAll(settings, `${companyBase(settings, requireEnvironment(body), requireCompanyId(body))}/purchaseOrders`)).map((o) => ({
			no: String(o.no ?? ""),
			vendorNo: String(o.buyFromVendorNo ?? ""),
			vendorName: String(o.buyFromVendorName ?? ""),
			date: String(o.orderDate ?? o.documentDate ?? o.systemCreatedAt ?? "")
		})).filter((o) => o.no) };
		case "getOrder": {
			const environment = requireEnvironment(body);
			const companyId = requireCompanyId(body);
			const orderNo = String(body.orderNo ?? "").trim();
			if (!orderNo) throw new RequestError("orderNo fehlt.");
			return getOrder(settings, environment, companyId, orderNo);
		}
		default: throw new RequestError(`Unbekannte Methode "${method}".`);
	}
}
async function getOrder(settings, environment, companyId, orderNo) {
	const base = companyBase(settings, environment, companyId);
	const filter = `$filter=${encodeURIComponent(`no eq ${odataString(orderNo)}`)}`;
	let order = (await bcGet(settings, `${base}/purchaseOrders?${filter}`)).value?.[0];
	if (!order) throw new RequestError(`Bestellung "${orderNo}" nicht gefunden.`, 404);
	if (!Array.isArray(order.purchaseOrderLines)) try {
		const expanded = (await bcGet(settings, `${base}/purchaseOrders?${filter}&$expand=purchaseOrderLines`)).value?.[0];
		if (expanded) order = expanded;
	} catch (error) {
		logger.warn(`Zeilen zu Bestellung "${orderNo}" nicht per $expand ladbar: ${error}`);
	}
	const lines = Array.isArray(order.purchaseOrderLines) ? order.purchaseOrderLines : [];
	delete order.purchaseOrderLines;
	let vendor = null;
	if (order.buyFromVendorNo) {
		vendor = (await bcGet(settings, `${base}/vendors?${`$filter=${encodeURIComponent(`no eq ${odataString(String(order.buyFromVendorNo))}`)}`}`)).value?.[0] ?? null;
		if (vendor && !vendorVatId(vendor)) try {
			const standardFilter = `$filter=${encodeURIComponent(`number eq ${odataString(String(order.buyFromVendorNo))}`)}`;
			const standard = (await bcGet(settings, `${bcBase(settings, environment)}/api/v2.0/companies(${companyId})/vendors?${standardFilter}`)).value?.[0];
			if (standard?.taxRegistrationNumber) vendor.taxRegistrationNumber = standard.taxRegistrationNumber;
		} catch (error) {
			logger.warn(`USt-IdNr. des Lieferanten nicht ladbar: ${error}`);
		}
	}
	let buyer = null;
	try {
		buyer = (await bcGet(settings, `${bcBase(settings, environment)}/api/v2.0/companies(${companyId})/companyInformation`)).value?.[0] ?? null;
	} catch (error) {
		logger.warn(`Firmendaten (companyInformation) nicht ladbar: ${error}`);
	}
	return {
		order,
		lines,
		vendor,
		buyer
	};
}
function vendorVatId(vendor) {
	return String(vendor?.vatRegistrationNo ?? vendor?.vatRegistrationNumber ?? vendor?.taxRegistrationNumber ?? "").trim();
}
function requireEnvironment(body) {
	const environment = String(body.environment ?? "").trim();
	if (!/^[A-Za-z0-9_-]{1,64}$/.test(environment)) throw new RequestError("Ungültige oder fehlende Umgebung.");
	return environment;
}
function requireCompanyId(body) {
	const companyId = String(body.companyId ?? "").trim();
	if (!/^[0-9a-fA-F-]{36}$/.test(companyId)) throw new RequestError("Ungültige oder fehlende Firmen-ID.");
	return companyId;
}
function bcBase(settings, environment) {
	return `${BC_API}/v2.0/${encodeURIComponent(settings.tenantId)}/${encodeURIComponent(environment)}`;
}
function companyBase(settings, environment, companyId) {
	return `${bcBase(settings, environment)}/${GWS_API}/companies(${companyId})`;
}
function odataString(value) {
	return `'${value.replace(/'/g, "''")}'`;
}
var cachedToken;
async function getAccessToken(settings) {
	const key = `${settings.tenantId}|${settings.clientId}`;
	if (cachedToken && cachedToken.key === key && cachedToken.expiresAt > Date.now() + 6e4) return cachedToken.token;
	const params = new URLSearchParams({
		grant_type: "client_credentials",
		scope: `${BC_API}/.default`,
		client_id: settings.clientId,
		client_secret: settings.clientSecret
	});
	const response = await fetch(`https://login.microsoftonline.com/${encodeURIComponent(settings.tenantId)}/oauth2/v2.0/token`, {
		method: "POST",
		headers: { "Content-Type": "application/x-www-form-urlencoded" },
		body: params
	});
	const text = await response.text();
	if (!response.ok) throw new Error(`Anmeldung bei Microsoft fehlgeschlagen (${response.status}): ${text.slice(0, 500)}`);
	const data = JSON.parse(text);
	cachedToken = {
		key,
		token: data.access_token,
		expiresAt: Date.now() + Number(data.expires_in ?? 0) * 1e3
	};
	return cachedToken.token;
}
async function bcGet(settings, url) {
	const token = await getAccessToken(settings);
	const response = await fetch(url, { headers: {
		Authorization: `Bearer ${token}`,
		Accept: "application/json"
	} });
	const text = await response.text();
	if (!response.ok) throw new Error(`Business Central antwortet mit ${response.status} (${url.replace(BC_API, "")}): ${text.slice(0, 500)}`);
	return JSON.parse(text);
}
async function bcGetAll(settings, url) {
	const items = [];
	let next = url;
	while (next) {
		const page = await bcGet(settings, next);
		items.push(...page.value ?? []);
		next = page["@odata.nextLink"];
	}
	return items;
}
function parseBody(req) {
	try {
		const body = req.json?.();
		return body && typeof body === "object" ? body : {};
	} catch {
		return {};
	}
}
//#endregion

//# sourceMappingURL=script.js.map