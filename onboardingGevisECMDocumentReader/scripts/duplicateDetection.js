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
//#endregion
//#region ../../helper/performHttpRequest/performHttpRequest.ts
/**
* Performs an HTTP request and returns a structured response.
*
* @template T - The expected type of the response body.
* @param {string} url - The URL to which the request is sent.
* @param {RequestInit} options - The options for the HTTP request, such as method, headers, and body.
* @returns {Promise<ApiResponse<T>>} A promise that resolves to an `ApiResponse` object containing the response details.
* @throws {Error} Throws an error if the HTTP response status is not OK (status code outside the range 200-299).
*
* The function attempts to parse the response body based on the `Content-Type` header:
* - If the `Content-Type` includes "application/json", it parses the body as JSON.
* - Otherwise, it parses the body as plain text.
*
* If the response is not OK, the function throws an error with the status code and error message.
*/
var logger$1 = getLogger();
async function performHttpRequest(url, options) {
	let body = {};
	let errorMessage = "";
	let response;
	logger$1.debug(`[Request] ${options.method} ${url} | Headers: ${JSON.stringify(options.headers)} | Body: ${!(options.body instanceof Uint8Array) && options.body !== void 0 ? options.body : "[Binary body omitted]"}`);
	try {
		response = await fetch(url, options);
	} catch (err) {
		throw new Error(`Network error during fetch: ${err.message}`);
	}
	const contentType = response.headers.get("content-type") || "";
	const parseBody = async () => {
		try {
			if (contentType.includes("application/json") || contentType.includes("application/hal+json")) return await response.json();
			else if (contentType.includes("application/octet-stream") || contentType.includes("application/pdf")) {
				const arrayBuffer = await response.arrayBuffer();
				return new Uint8Array(arrayBuffer);
			} else return await response.text();
		} catch (e) {
			return;
		}
	};
	if (response.ok) {
		const result = await parseBody();
		if (result !== void 0) body = result;
	} else {
		const errorBody = await parseBody();
		errorMessage = typeof errorBody === "string" ? errorBody : JSON.stringify(errorBody);
		throw new Error(`HTTP error! status: ${response.status}, message: ${errorMessage}`);
	}
	return {
		status: response.status,
		statusText: response.statusText,
		body,
		bodyUsed: response.bodyUsed,
		headers: response.headers,
		ok: response.ok,
		redirected: response.redirected,
		type: response.type,
		url: response.url
	};
}
//#endregion
//#region ../../helper/webindexlayouter/executeSqlQuery.ts
/**
* Führt eine SQL-Abfrage auf der Datenbank einer App aus - wie der
* Webindex-Designer (z.B. für eigene Dublettenprüfungen):
* POST /webindexlayouter/api/v1/apps/<app>/sqlResult
* mit { connectionString: null, sqlQuery }.
* connectionString null = Standard-Datenbank der App (z.B. die Protokoll-
* Tabellen CCLogDocuments/CCLogAttributes des Rechnungslesers).
*
* @param token - API-Key; leer = Browser-Session.
* @param app - App-Name, z.B. "classcon-documentreader".
*/
async function executeSqlQuery(baseUri, token, app, sqlQuery, connectionString = null) {
	return await performHttpRequest(`${baseUri}/webindexlayouter/api/v1/apps/${encodeURIComponent(app)}/sqlResult`, {
		method: "POST",
		headers: {
			...token ? { Authorization: `Bearer ${token}` } : {},
			Accept: "application/json",
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			connectionString,
			sqlQuery
		})
	});
}
//#endregion
//#region src/scripts/duplicateDetection.ts
/**
* "Rechnungsleser: Dublettenerkennung": wird vom Rechnungsleser nach der
* Extraktion aufgerufen (Extension Point "IR_Business_PostExtractionScript",
* Typ ScriptingApp, Profil "PostExtractionScript" - hinterlegt vom
* Onboarding-Formular). Bekommt die Attribute des Dokuments als JSON und
* liefert sie zurück.
*
* Sucht im Protokoll des Rechnungslesers (CCLogDocuments/CCLogAttributes, per
* SQL über den Webindex-Designer) nach Dokumenten mit derselben
* Lieferantennummer (VENDOR_NUM) UND derselben Rechnungsnummer
* (InvoiceNumber). Das aktuelle Dokument selbst (DocumentUID) zählt nicht.
* Bei einer Dublette werden die Attribute IsDuplicate (true) und
* DuplicateDocumentIds (Ids der früheren Dokumente) gesetzt - im Typ des
* Attributs im Rechnungsleser (Text-Attribut: "true" bzw. kommagetrennte Ids).
*
* customerVariables (vom Onboarding-Formular nur beim Neuanlegen gesetzt):
* apiKey (verschlüsselt). Die Mandanten-Adresse kommt aus dem Header
* "x-dv-baseuri".
*/
var logger = initLogger(LogLevel.INFO);
var APP = "classcon-documentreader";
var VENDOR_FIELD = "VENDOR_NUM";
var INVOICE_FIELD = "InvoiceNumber";
var DOCUMENT_ID_FIELD = "DocumentUID";
var DUPLICATE_FLAG_FIELD = "IsDuplicate";
var DUPLICATE_IDS_FIELD = "DuplicateDocumentIds";
module.exports = async (req, res) => {
	const body = parseBody(req);
	logger.info(`Eingang: ${JSON.stringify(body).slice(0, 4e3)}`);
	try {
		const vendorNum = attribute(body, VENDOR_FIELD);
		const invoiceNumber = attribute(body, INVOICE_FIELD);
		if (!vendorNum || !invoiceNumber) logger.info(`Keine Prüfung: ${VENDOR_FIELD} "${vendorNum}" / ${INVOICE_FIELD} "${invoiceNumber}" unvollständig.`);
		else {
			const duplicates = await findDuplicates(req.get("x-dv-baseuri"), req.var("apiKey"), vendorNum, invoiceNumber, attribute(body, DOCUMENT_ID_FIELD));
			logger.info(`Lieferant "${vendorNum}", Rechnung "${invoiceNumber}": ${duplicates.length} Dublette(n) ${JSON.stringify(duplicates)}`);
			if (duplicates.length > 0) {
				setAttribute(body, DUPLICATE_FLAG_FIELD, true);
				setAttribute(body, DUPLICATE_IDS_FIELD, duplicates.map((d) => d.documentId));
			}
		}
	} catch (error) {
		logger.error(`Dublettenprüfung fehlgeschlagen: ${error instanceof Error ? error.message : String(error)}`);
	}
	logger.info(`Antwort: ${JSON.stringify(body).slice(0, 4e3)}`);
	res.status(200).set("Content-Type", "application/json").send(JSON.stringify(body));
};
async function findDuplicates(baseUri, apiKey, vendorNum, invoiceNumber, currentDocumentId) {
	const sqlQuery = `
SELECT
  doc.DocumentId,
  aV.Attribute_After AS VendorNum,
  aI.Attribute_After AS InvoiceNumber
FROM
  CCLogDocuments AS doc
  JOIN CCLogAttributes AS aV ON aV.DocumentID = doc.DocumentID
    AND aV.Attribute_Name = '${VENDOR_FIELD}'
    AND aV.Attribute_After = ${sqlString(vendorNum)}
  JOIN CCLogAttributes AS aI ON aI.DocumentID = doc.DocumentID
    AND aI.Attribute_Name = '${INVOICE_FIELD}'
    AND aI.Attribute_After = ${sqlString(invoiceNumber)}${currentDocumentId ? `
WHERE
  doc.DocumentID <> ${sqlString(currentDocumentId)}` : ""}`;
	logger.debug(`SQL Query: ${sqlQuery}`);
	const result = (await executeSqlQuery(baseUri, apiKey, APP, sqlQuery)).body;
	const headers = (result?.headers ?? []).map((h) => h.toLowerCase());
	const column = (cells, name) => cells[headers.indexOf(name.toLowerCase())] ?? "";
	return (result?.rows ?? []).map((row) => ({
		documentId: column(row.cells ?? [], "DocumentId"),
		vendorNum: column(row.cells ?? [], "VendorNum"),
		invoiceNumber: column(row.cells ?? [], "InvoiceNumber")
	}));
}
function sqlString(value) {
	return `N'${value.replace(/'/g, "''")}'`;
}
function attribute(body, name) {
	const key = name.toLowerCase();
	for (const [field, value] of Object.entries(body)) if (field.toLowerCase() === key && value !== null && typeof value !== "object") return String(value).trim();
	for (const value of Object.values(body)) {
		if (!Array.isArray(value)) continue;
		for (const entry of value) if (String(entry?.Name ?? entry?.AttributeName ?? entry?.Id ?? entry?.name ?? "").toLowerCase() === key) return String(entry?.Value ?? entry?.value ?? "").trim();
	}
	return "";
}
function setAttribute(body, name, value) {
	body[name] = typeof body[name] === "string" ? Array.isArray(value) ? value.join(", ") : String(value) : value;
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

//# sourceMappingURL=duplicateDetection.js.map