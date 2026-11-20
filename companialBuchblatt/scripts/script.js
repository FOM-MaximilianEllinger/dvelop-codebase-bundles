//#region \0rolldown/runtime.js
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJSMin = (cb, mod) => () => (mod || (cb((mod = { exports: {} }).exports, mod), cb = null), mod.exports);
var __copyProps = (to, from, except, desc) => {
	if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
		key = keys[i];
		if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
			get: ((k) => from[k]).bind(null, key),
			enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
		});
	}
	return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule || !__hasOwnProp.call(mod, "default") ? __defProp(target, "default", {
	value: mod,
	enumerable: true
}) : target, mod));
//#endregion
let path = require("path");
path = __toESM(path);
//#endregion
//#region ../../helper/utils/logger.ts
var import_main = /* @__PURE__ */ __toESM((/* @__PURE__ */ __commonJSMin(((exports, module) => {
	var fs = require("fs");
	var path$1 = require("path");
	function log(message) {
		console.log(`[dotenv][DEBUG] ${message}`);
	}
	var NEWLINE = "\n";
	var RE_INI_KEY_VAL = /^\s*([\w.-]+)\s*=\s*(.*)?\s*$/;
	var RE_NEWLINES = /\\n/g;
	var NEWLINES_MATCH = /\n|\r|\r\n/;
	function parse(src, options) {
		const debug = Boolean(options && options.debug);
		const obj = {};
		src.toString().split(NEWLINES_MATCH).forEach(function(line, idx) {
			const keyValueArr = line.match(RE_INI_KEY_VAL);
			if (keyValueArr != null) {
				const key = keyValueArr[1];
				let val = keyValueArr[2] || "";
				const end = val.length - 1;
				const isDoubleQuoted = val[0] === "\"" && val[end] === "\"";
				if (val[0] === "'" && val[end] === "'" || isDoubleQuoted) {
					val = val.substring(1, end);
					if (isDoubleQuoted) val = val.replace(RE_NEWLINES, NEWLINE);
				} else val = val.trim();
				obj[key] = val;
			} else if (debug) log(`did not match key and value when parsing line ${idx + 1}: ${line}`);
		});
		return obj;
	}
	function config(options) {
		let dotenvPath = path$1.resolve(process.cwd(), ".env");
		let encoding = "utf8";
		let debug = false;
		if (options) {
			if (options.path != null) dotenvPath = options.path;
			if (options.encoding != null) encoding = options.encoding;
			if (options.debug != null) debug = true;
		}
		try {
			const parsed = parse(fs.readFileSync(dotenvPath, { encoding }), { debug });
			Object.keys(parsed).forEach(function(key) {
				if (!Object.prototype.hasOwnProperty.call(process.env, key)) process.env[key] = parsed[key];
				else if (debug) log(`"${key}" is already defined in \`process.env\` and will not be overwritten`);
			});
			return { parsed };
		} catch (e) {
			return { error: e };
		}
	}
	module.exports.config = config;
	module.exports.parse = parse;
})))());
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
function initLogger(level = LogLevel.INFO, showTimestamp = true) {
	if (!loggerInstance) loggerInstance = new Logger({
		level,
		showTimestamp
	});
	return loggerInstance;
}
function getLogger() {
	if (!loggerInstance) loggerInstance = new Logger({
		level: LogLevel.DEBUG,
		showTimestamp: true
	});
	return loggerInstance;
}
getLogger();
//#endregion
//#region ../../helper/utils/credentials.ts
import_main.config({ path: path.resolve(__dirname, "../../../helper/utils/.env") });
var Credentials = [];
for (const key in process.env) if (key.startsWith("CREDENTIALS_")) {
	const name = key.replace("CREDENTIALS_", "").toLowerCase();
	const [baseUri, apiKey] = (process.env[key] ?? "").split("|");
	if (!baseUri || !apiKey) continue;
	Credentials.push({
		name,
		baseUri,
		apiKey
	});
}
//#endregion
//#region src/scripts/script.ts
var logger = getLogger();
var config = {
	mode: process.platform === "linux" ? "production" : "development",
	devAction: process.env.COMPANIAL_DEV_ACTION ?? "write"
};
var DEFAULT_SCOPE = "https://api.businesscentral.dynamics.com/.default";
/** SOAP-Basis bis einschließlich /WS, ohne Firma. */
var DEFAULT_SOAP_URL = "https://42673-test.dynamicstocloud.com:1102/ST-155958/WS";
var DEFAULT_TENANT = "42673-TEST.dynamicstocloud.com";
var SOAP_ENV = "http://schemas.xmlsoap.org/soap/envelope/";
var SYSTEM_SERVICE_NS = "urn:microsoft-dynamics-schemas/nav/system/";
/** Puffer, damit das Token nicht mitten in der Aufrufkette abläuft. */
var TOKEN_EXPIRY_BUFFER_MS = 6e4;
var DEFAULT_TOKEN_LIFETIME_S = 3600;
var SERVICES = {
	header: {
		service: "CreateHeader",
		method: "CreateHeader"
	},
	lines: {
		service: "CreateLines",
		method: "CreateLines"
	},
	buchblatt: {
		service: "CreateBuchblattZeilen",
		method: "CreateBuchblattZeilen"
	}
};
var HEADER_OK = "Kopf wurde angelegt";
var LINES_OK = "Zeilen wurden angelegt";
var DMS_PROPERTY = {
	documentId: "property_document_id",
	creationDate: "property_creation_date",
	kreditorNr: "17d56c68-f74d-40ca-989c-9ecd80c773bd",
	kreditorName: "348219f7-cd82-42bd-aa3d-57dafc4bf9ef",
	extBelegNr: "9ebfdb3d-e096-49ba-b854-56e09b39db5a",
	belegdatum: "e16f89a9-a8de-4f55-b287-415e4a543701",
	brutto: "3d07a2af-546f-4360-8254-daeec02dd101",
	mwst: "8a23cfb1-a13f-40b4-aec9-126b451f3b22",
	zahlungsbedingung: "2f169b9f-df96-4d24-8809-dfaf3155d1c6",
	zahlungsform: "d8c3cf6d-da5f-461a-9849-efc573c8d655",
	mandant: "49f2d260-5fc4-4331-9da6-aa553a5ee044"
};
var BENUTZER_ID = "DVELOP";
var LINE_ART = "Sachkonto";
var SAMPLE_ID = `DV-${(/* @__PURE__ */ new Date()).toISOString().replace(/\D/g, "").slice(2, 14)}`;
var SAMPLE_BODY = {
	accounting: [{
		glAccount: "0099980",
		costCenter: "",
		costUnit: "",
		vatProductBookingGroup: "",
		description: "Test",
		netAmount: 157.94,
		vatRate: 0,
		grossAmount: 157.94
	}],
	dmsProperties: {
		[DMS_PROPERTY.documentId]: SAMPLE_ID,
		[DMS_PROPERTY.creationDate]: "2026-11-02T08:29:36.000+00:00",
		[DMS_PROPERTY.kreditorName]: ["Hch. Perschmann GmbH"],
		[DMS_PROPERTY.brutto]: 187.95,
		[DMS_PROPERTY.mandant]: "Hedwigsburger Okermuehle",
		[DMS_PROPERTY.kreditorNr]: "712512",
		[DMS_PROPERTY.extBelegNr]: "57934185",
		[DMS_PROPERTY.belegdatum]: "2026-10-30",
		"98ff7208-08d6-4f7a-bf19-63c1b61c12e1": 157.94,
		[DMS_PROPERTY.mwst]: 30.01,
		[DMS_PROPERTY.zahlungsbedingung]: "0TG",
		[DMS_PROPERTY.zahlungsform]: "D0"
	}
};
async function main(getVar, body, res) {
	try {
		logger.debug("Start");
		logger.info(`Request-Body: ${JSON.stringify(body)}`);
		const settings = readSettings(getVar);
		if (!body.accounting && !body.dmsProperties) {
			logger.info(`Kein accounting/dmsProperties im Body (Felder: ${Object.keys(body).join(", ") || "-"}) - nur Verbindungstest`);
			sendJson(res, 200, await checkSoapEndpoint(settings, SERVICES.buchblatt.service));
			logger.info("End (Verbindungstest)");
			return;
		}
		const props = body.dmsProperties;
		const accounting = body.accounting;
		logger.info(`Eingang accounting: ${JSON.stringify(accounting)}`);
		logger.info(`Eingang dmsProperties: ${JSON.stringify(props)}`);
		if (!props || typeof props !== "object") throw new Error("dmsProperties fehlt.");
		if (!Array.isArray(accounting) || accounting.length === 0) throw new Error("accounting fehlt oder ist leer.");
		const mandant = propText(props, DMS_PROPERTY.mandant);
		if (mandant && mandant !== settings.company) throw new Error(`Mandant am Dokument "${mandant}" passt nicht zur Firma "${settings.company}".`);
		const header = mapHeader(props);
		const lines = mapLines(header, accounting);
		logger.info(`Beleg ${header.pID}: Kreditor ${header.pKreditorNr} (${propText(props, DMS_PROPERTY.kreditorName)}), Rechnung ${header.pExtBelegnummer}, ${lines.length} Zeile(n)`);
		const companies = await getCompanies(settings);
		logger.info(`Verbindung OK, Firmen: ${companies.join(", ")}`);
		if (!companies.includes(settings.company)) throw new Error(`Firma "${settings.company}" nicht gefunden. Vorhanden: ${companies.join(", ")}`);
		const headerResult = await callCodeunit(settings, SERVICES.header, header);
		logger.info(`CreateHeader ${header.pID}: ${headerResult}`);
		if (headerResult !== HEADER_OK) throw new Error(`CreateHeader ${header.pID} fehlgeschlagen: ${headerResult}`);
		const lineResults = [];
		for (const line of lines) {
			const lineResult = await callCodeunit(settings, SERVICES.lines, line);
			logger.info(`CreateLines ${header.pID}/${line.pZeilennr}: ${lineResult}`);
			if (lineResult !== LINES_OK) throw new Error(`CreateLines ${header.pID}/${line.pZeilennr} fehlgeschlagen: ${lineResult}`);
			lineResults.push(lineResult);
		}
		const buchblattResult = await callCodeunit(settings, SERVICES.buchblatt, { pID: header.pID });
		logger.info(`CreateBuchblattZeilen ${header.pID}: ${buchblattResult}`);
		const result = {
			id: header.pID,
			companies,
			header: headerResult,
			lines: lineResults,
			buchblatt: buchblattResult
		};
		logger.info(`Ergebnis: ${JSON.stringify(result)}`);
		sendJson(res, 200, result);
		logger.info("End");
	} catch (error) {
		logger.error(`Error: ${error}`);
		sendJson(res, 500, { error: error instanceof Error ? error.message : String(error) });
	}
}
/**
* GET auf .../WS/<Firma>/Codeunit/<Service> liefert bei Erfolg die WSDL.
* Wirft nur bei Token-/Netzwerkfehlern; HTTP-Fehler kommen im Ergebnis zurück.
*/
async function checkSoapEndpoint(settings, service) {
	const url = codeunitUrl(settings, service);
	const token = await getAccessToken(settings);
	logger.debug(`[SOAP] GET ${url}`);
	let response;
	try {
		response = await fetch(url, {
			method: "GET",
			headers: { Authorization: `Bearer ${token}` }
		});
	} catch (err) {
		throw networkError("Verbindungstest", err);
	}
	const text = await response.text();
	logger.info(`[SOAP] ${response.status} ${url}`);
	logger.debug(`[SOAP] ${text.slice(0, 2e3)}`);
	return {
		url,
		status: response.status,
		ok: response.ok,
		excerpt: text.slice(0, 500),
		wwwAuthenticate: response.headers.get("www-authenticate") ?? void 0
	};
}
function codeunitUrl(settings, service) {
	return `${settings.soapUrl}/${encodeURIComponent(settings.company)}/Codeunit/${encodeURIComponent(service)}?tenant=${encodeURIComponent(settings.tenant)}`;
}
/** Firmenliste über den mandantenübergreifenden SystemService. */
async function getCompanies(settings) {
	return soapRequest(settings, `${settings.soapUrl}/SystemService?tenant=${encodeURIComponent(settings.tenant)}`, SYSTEM_SERVICE_NS, "Companies", {});
}
async function callCodeunit(settings, target, params) {
	const ns = `urn:microsoft-dynamics-schemas/codeunit/${target.service}`;
	return (await soapRequest(settings, codeunitUrl(settings, target.service), ns, target.method, params))[0] ?? "";
}
/**
* Schickt <method xmlns=ns><param>…</param>…</method> und liefert alle
* <return_value> aus <method>_Result. Die Parameter werden in der
* Reihenfolge der Objekt-Keys gesendet (siehe HeaderData/LineData).
*/
async function soapRequest(settings, url, ns, method, params) {
	const inner = Object.entries(params).map(([key, value]) => `<${key}>${escapeXml(String(value ?? ""))}</${key}>`).join("");
	const envelope = `<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="${SOAP_ENV}"><soap:Body><${method} xmlns="${ns}">${inner}</${method}></soap:Body></soap:Envelope>`;
	logger.debug(`[SOAP] POST ${url} ${method} | ${inner}`);
	const token = await getAccessToken(settings);
	let response;
	try {
		response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "text/xml; charset=utf-8",
				SOAPAction: `"${ns}:${method}"`,
				Authorization: `Bearer ${token}`
			},
			body: envelope
		});
	} catch (err) {
		throw networkError(method, err);
	}
	const text = await response.text();
	logger.debug(`[SOAP] ${response.status} ${method} | ${text.slice(0, 2e3)}`);
	if (!response.ok) {
		const fault = readXmlValues(text, "faultstring")[0];
		const hint = response.status === 401 ? unauthorizedHint(settings, response) : "";
		throw new Error(`${method}: HTTP ${response.status} ${fault ?? text.slice(0, 500)}${hint}`);
	}
	return readXmlValues(text, "return_value");
}
function unauthorizedHint(settings, response) {
	return ` (Anmeldung abgelehnt - zuerst Script-Variable companialTenant prüfen (aktuell "${settings.tenant}", muss zum Host in companialSoapUrl passen), dann Scope und Entra-Anwendung in BC; WWW-Authenticate: ${response.headers.get("www-authenticate") ?? "-"})`;
}
/**
* Reicht für die flachen BC-Antworten (<return_value>Text</return_value>,
* leer auch als <return_value/>); BC schreibt keine CDATA-Abschnitte.
*/
function readXmlValues(xml, tag) {
	const pattern = new RegExp(`<(?:[\\w-]+:)?${tag}(?:\\s[^>]*)?(?:/>|>([\\s\\S]*?)</(?:[\\w-]+:)?${tag}>)`, "g");
	return [...xml.matchAll(pattern)].map((match) => unescapeXml(match[1] ?? ""));
}
function escapeXml(value) {
	return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}
function unescapeXml(value) {
	return value.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, "\"").replace(/&apos;/g, "'").replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code))).replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCharCode(parseInt(code, 16))).replace(/&amp;/g, "&");
}
function mapHeader(props) {
	const documentId = propText(props, DMS_PROPERTY.documentId);
	const kreditorNr = propText(props, DMS_PROPERTY.kreditorNr);
	if (!documentId) throw new Error(`dmsProperties.${DMS_PROPERTY.documentId} fehlt.`);
	if (!kreditorNr) throw new Error(`Kreditornummer (${DMS_PROPERTY.kreditorNr}) fehlt.`);
	const brutto = toNumber(props[DMS_PROPERTY.brutto]);
	const mwst = toNumber(props[DMS_PROPERTY.mwst]);
	return {
		pID: documentId,
		pDMSNo: documentId,
		pScandatum: toBcDate(propText(props, DMS_PROPERTY.creationDate)),
		pExtBelegnummer: propText(props, DMS_PROPERTY.extBelegNr),
		pKreditorNr: kreditorNr,
		pBelegdatum: toBcDate(propText(props, DMS_PROPERTY.belegdatum)),
		pZahlungsbedingung: propText(props, DMS_PROPERTY.zahlungsbedingung),
		pZahlungsformcode: propText(props, DMS_PROPERTY.zahlungsform),
		pBenutzerID: BENUTZER_ID,
		pBuchungsdatum: toBcDate((/* @__PURE__ */ new Date()).toISOString()),
		pBetrag: toBcAmount(brutto),
		pMwst: toBcAmount(mwst * 100)
	};
}
function mapLines(header, accounting) {
	return accounting.map((line, index) => {
		if (!line?.glAccount) throw new Error(`accounting[${index}].glAccount fehlt.`);
		return {
			pID: header.pID,
			pDMSNo: header.pDMSNo,
			pZeilennr: String((index + 1) * 1e4),
			pArt: LINE_ART,
			pKostenstelle: text(line.costCenter),
			pKostentraeger: text(line.costUnit),
			pBeschreibung: text(line.description),
			pArtikelEDI: text(line.glAccount),
			pArtikelverfahrenEDI: "",
			pVarField1: "",
			pVarField2: "",
			pProdBuchGrp: text(line.vatProductBookingGroup),
			pBetrag: toBcAmount(toNumber(line.netAmount)),
			pMenge: "1"
		};
	});
}
/** DMS-Mehrfachwerte kommen als Array - dann zählt der erste Eintrag. */
function propText(props, key) {
	const value = props[key];
	return text(Array.isArray(value) ? value[0] : value);
}
function text(value) {
	return value === void 0 || value === null ? "" : String(value).trim();
}
/** Akzeptiert Zahlen und Texte mit Komma oder Punkt ("157,94" / "157.94"). */
function toNumber(value) {
	if (typeof value === "number") return value;
	const raw = text(value);
	if (!raw) return 0;
	const normalized = raw.includes(",") ? raw.replace(/\./g, "").replace(",", ".") : raw;
	const result = Number(normalized);
	if (Number.isNaN(result)) throw new Error(`Ungültiger Betrag: "${raw}"`);
	return result;
}
function toBcAmount(value) {
	return (Math.round(value * 100) / 100).toFixed(2).replace(".", ",");
}
/** "2026-10-30" oder "2026-11-02T08:29:36.000+00:00" -> "30.10.2026" / "02.11.2026". */
function toBcDate(value) {
	const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(value);
	return match ? `${match[3]}.${match[2]}.${match[1]}` : "";
}
var cachedToken;
async function getAccessToken(settings) {
	const key = `${settings.entraTenantId}|${settings.clientId}|${settings.scope}`;
	if (cachedToken && cachedToken.key === key && cachedToken.expiresAt - TOKEN_EXPIRY_BUFFER_MS > Date.now()) return cachedToken.token;
	const url = `https://login.microsoftonline.com/${encodeURIComponent(settings.entraTenantId)}/oauth2/v2.0/token`;
	logger.debug(`[OAuth] Token anfordern für Client ${settings.clientId}, Scope ${settings.scope}`);
	let response;
	try {
		response = await fetch(url, {
			method: "POST",
			headers: { "Content-Type": "application/x-www-form-urlencoded" },
			body: new URLSearchParams({
				grant_type: "client_credentials",
				client_id: settings.clientId,
				client_secret: settings.clientSecret,
				scope: settings.scope
			})
		});
	} catch (err) {
		throw networkError("Token-Abruf", err);
	}
	const data = await response.json().catch(() => ({}));
	if (!response.ok || !data.access_token) throw new Error(`Token-Abruf fehlgeschlagen: HTTP ${response.status} ${data.error ?? ""} ${data.error_description ?? ""}`.trim());
	const lifetimeSeconds = Number(data.expires_in ?? DEFAULT_TOKEN_LIFETIME_S);
	cachedToken = {
		key,
		token: data.access_token,
		expiresAt: Date.now() + lifetimeSeconds * 1e3
	};
	logger.debug(`[OAuth] Token erhalten, gültig ${data.expires_in ?? "?"} s, Claims: ${describeToken(data.access_token)}`);
	return cachedToken.token;
}
/**
* Für die Fehlersuche bei 401: nur die für BC relevanten Claims des Tokens
* (Zielgruppe, Aussteller, Tenant, App, Rollen) - nie das Token selbst.
*/
function describeToken(token) {
	try {
		const { aud, iss, tid, appid, azp, roles, ver } = JSON.parse(Buffer.from(token.split(".")[1], "base64url").toString("utf8"));
		return JSON.stringify({
			aud,
			iss,
			tid,
			appid: appid ?? azp,
			roles,
			ver
		});
	} catch {
		return "(nicht lesbar)";
	}
}
function readSettings(getVar) {
	const settings = {
		soapUrl: readSoapUrl(getVar),
		company: readVar(getVar, "companialCompany").trim(),
		tenant: readVar(getVar, "companialTenant").trim(),
		entraTenantId: stripBraces(readVar(getVar, "entraTenantId")),
		clientId: stripBraces(readVar(getVar, "clientId")),
		clientSecret: readVar(getVar, "clientSecret"),
		scope: readVar(getVar, "companialScope").trim() || DEFAULT_SCOPE
	};
	const missing = Object.entries(settings).filter(([, value]) => !value).map(([key]) => key);
	if (missing.length > 0) throw new Error(`Script-Variablen fehlen: ${missing.join(", ")}`);
	return settings;
}
function readVar(getVar, key) {
	return String(getVar(key) ?? "");
}
/**
* Script-Instanzen, die noch mit der OData-Version angelegt wurden, haben
* companialSoapUrl nicht (die Toolbox setzt Variablen nur beim Anlegen) -
* dann mit der Standard-URL weiterarbeiten statt abzubrechen.
*/
function readSoapUrl(getVar) {
	const value = readVar(getVar, "companialSoapUrl").trim();
	if (!value) logger.warn(`Script-Variable companialSoapUrl fehlt, verwende ${DEFAULT_SOAP_URL}`);
	return (value || DEFAULT_SOAP_URL).replace(/\/+$/, "");
}
/** BC zeigt GUIDs auf der Entra-Anwendungskarte als {xxxxxxxx-...} an - Entra erwartet sie ohne Klammern. */
function stripBraces(value) {
	return value.trim().replace(/^\{(.*)\}$/, "$1").trim();
}
function networkError(label, err) {
	const cause = err?.cause;
	return /* @__PURE__ */ new Error(`${label}: Netzwerkfehler ${err.message}${cause ? ` (${cause.code ?? cause})` : ""}`);
}
function sendJson(res, status, payload) {
	res?.status(status).set("Content-Type", "application/json").send(JSON.stringify(payload));
}
function parseBody(req) {
	try {
		const body = req.json?.();
		return body && typeof body === "object" ? body : {};
	} catch {
		return {};
	}
}
if (config.mode === "production") module.exports = async (req, res) => {
	await main((key) => req.var(key), parseBody(req), res);
};
else (async () => {
	initLogger(LogLevel.DEBUG);
	const devVars = {
		companialSoapUrl: process.env.COMPANIAL_SOAP_URL ?? DEFAULT_SOAP_URL,
		companialCompany: process.env.COMPANIAL_COMPANY ?? "Hedwigsburger Okermuehle",
		companialTenant: process.env.COMPANIAL_TENANT ?? DEFAULT_TENANT,
		entraTenantId: process.env.COMPANIAL_ENTRA_TENANT_ID,
		clientId: process.env.COMPANIAL_CLIENT_ID,
		clientSecret: process.env.COMPANIAL_CLIENT_SECRET,
		companialScope: process.env.COMPANIAL_SCOPE
	};
	const action = config.devAction === "write" ? `schreibe Testbeleg ${SAMPLE_ID}` : "nur Verbindungstest";
	logger.info(`Development: ${action}`);
	await main((key) => devVars[key], config.devAction === "write" ? SAMPLE_BODY : {}, null);
})().catch((err) => {
	console.error("Error in development mode:", err);
});
//#endregion

//# sourceMappingURL=script.js.map