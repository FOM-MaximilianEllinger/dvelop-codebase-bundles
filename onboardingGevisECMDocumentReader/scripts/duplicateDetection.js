/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "../../helper/performHttpRequest/performHttpRequest.ts"
/*!*************************************************************!*\
  !*** ../../helper/performHttpRequest/performHttpRequest.ts ***!
  \*************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.performHttpRequest = performHttpRequest;
const logger_1 = __webpack_require__(/*! ../utils/logger */ "../../helper/utils/logger.ts");
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
const logger = (0, logger_1.getLogger)();
async function performHttpRequest(url, options) {
    let body = {};
    let errorMessage = "";
    let response;
    logger.debug(`[Request] ${options.method} ${url} | Headers: ${JSON.stringify(options.headers)} | Body: ${!(options.body instanceof Uint8Array) && options.body !== undefined
        ? options.body
        : "[Binary body omitted]"}`);
    try {
        response = await fetch(url, options);
    }
    catch (err) {
        throw new Error(`Network error during fetch: ${err.message}`);
    }
    const contentType = response.headers.get("content-type") || "";
    const parseBody = async () => {
        try {
            if (contentType.includes("application/json") || contentType.includes('application/hal+json')) {
                return await response.json();
            }
            else if (contentType.includes("application/octet-stream") ||
                contentType.includes("application/pdf")) {
                const arrayBuffer = await response.arrayBuffer();
                return new Uint8Array(arrayBuffer);
            }
            else {
                return await response.text();
            }
        }
        catch (e) {
            return undefined;
        }
    };
    if (response.ok) {
        const result = await parseBody();
        if (result !== undefined) {
            body = result;
        }
    }
    else {
        const errorBody = await parseBody();
        errorMessage =
            typeof errorBody === "string" ? errorBody : JSON.stringify(errorBody);
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorMessage}`);
    }
    return {
        status: response.status,
        statusText: response.statusText,
        body: body,
        bodyUsed: response.bodyUsed,
        headers: response.headers,
        ok: response.ok,
        redirected: response.redirected,
        type: response.type,
        url: response.url,
    };
}


/***/ },

/***/ "../../helper/utils/logger.ts"
/*!************************************!*\
  !*** ../../helper/utils/logger.ts ***!
  \************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Logger = exports.LogLevel = void 0;
exports.initLogger = initLogger;
exports.getLogger = getLogger;
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["DEBUG"] = 0] = "DEBUG";
    LogLevel[LogLevel["INFO"] = 1] = "INFO";
    LogLevel[LogLevel["WARN"] = 2] = "WARN";
    LogLevel[LogLevel["ERROR"] = 3] = "ERROR";
})(LogLevel || (exports.LogLevel = LogLevel = {}));
class Logger {
    constructor(options = {}) {
        this.level = options.level ?? LogLevel.INFO;
        this.showTimestamp = options.showTimestamp ?? true;
    }
    formatMessage(level, message) {
        const paddedLevel = level.toUpperCase().padEnd(5, ' ');
        const timestamp = this.showTimestamp
            ? `[${new Date().toISOString()}] `
            : "";
        return `${timestamp}${paddedLevel}: ${message}`;
    }
    debug(message, ...args) {
        if (this.level <= LogLevel.DEBUG) {
            console.debug(this.formatMessage("debug", message), ...args);
        }
    }
    info(message, ...args) {
        if (this.level <= LogLevel.INFO) {
            console.info(this.formatMessage("info", message), ...args);
        }
    }
    warn(message, ...args) {
        if (this.level <= LogLevel.WARN) {
            console.warn(this.formatMessage("warn", message), ...args);
        }
    }
    error(message, ...args) {
        if (this.level <= LogLevel.ERROR) {
            console.error(this.formatMessage("error", message), ...args);
        }
    }
    setLevel(newLevel) {
        this.level = newLevel;
    }
}
exports.Logger = Logger;
let loggerInstance;
function initLogger(level = LogLevel.INFO, showTimestamp = true) {
    if (!loggerInstance) {
        loggerInstance = new Logger({ level, showTimestamp });
    }
    return loggerInstance;
}
function getLogger() {
    // Fallback: falls noch niemand initLogger() aufgerufen hat
    if (!loggerInstance) {
        loggerInstance = new Logger({ level: LogLevel.DEBUG, showTimestamp: true });
    }
    return loggerInstance;
}


/***/ },

/***/ "../../helper/webindexlayouter/executeSqlQuery.ts"
/*!********************************************************!*\
  !*** ../../helper/webindexlayouter/executeSqlQuery.ts ***!
  \********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.executeSqlQuery = executeSqlQuery;
const performHttpRequest_1 = __webpack_require__(/*! ../performHttpRequest/performHttpRequest */ "../../helper/performHttpRequest/performHttpRequest.ts");
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
    return await (0, performHttpRequest_1.performHttpRequest)(`${baseUri}/webindexlayouter/api/v1/apps/${encodeURIComponent(app)}/sqlResult`, {
        method: "POST",
        headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ connectionString, sqlQuery }),
    });
}


/***/ },

/***/ "./src/scripts/duplicateDetection.ts"
/*!*******************************************!*\
  !*** ./src/scripts/duplicateDetection.ts ***!
  \*******************************************/
(module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const executeSqlQuery_1 = __webpack_require__(/*! ../../../../helper/webindexlayouter/executeSqlQuery */ "../../helper/webindexlayouter/executeSqlQuery.ts");
const logger_1 = __webpack_require__(/*! ../../../../helper/utils/logger */ "../../helper/utils/logger.ts");
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
const logger = (0, logger_1.initLogger)(logger_1.LogLevel.INFO);
const APP = "classcon-documentreader";
const VENDOR_FIELD = "VENDOR_NUM";
const INVOICE_FIELD = "InvoiceNumber";
const DOCUMENT_ID_FIELD = "DocumentUID";
// Ergebnis bei einer Dublette: Kennzeichen (boolean) und die Ids der früheren
// Dokumente (Array).
const DUPLICATE_FLAG_FIELD = "IsDuplicate";
const DUPLICATE_IDS_FIELD = "DuplicateDocumentIds";
module.exports = async (req, res) => {
    const body = parseBody(req);
    // Diagnose (vorübergehend): Aufbau der Daten, die der Rechnungsleser schickt.
    logger.info(`Eingang: ${JSON.stringify(body).slice(0, 4000)}`);
    try {
        const vendorNum = attribute(body, VENDOR_FIELD);
        const invoiceNumber = attribute(body, INVOICE_FIELD);
        if (!vendorNum || !invoiceNumber) {
            logger.info(`Keine Prüfung: ${VENDOR_FIELD} "${vendorNum}" / ${INVOICE_FIELD} "${invoiceNumber}" unvollständig.`);
        }
        else {
            const baseUri = req.get("x-dv-baseuri");
            const apiKey = req.var("apiKey");
            const duplicates = await findDuplicates(baseUri, apiKey, vendorNum, invoiceNumber, attribute(body, DOCUMENT_ID_FIELD));
            logger.info(`Lieferant "${vendorNum}", Rechnung "${invoiceNumber}": ${duplicates.length} Dublette(n) ${JSON.stringify(duplicates)}`);
            if (duplicates.length > 0) {
                setAttribute(body, DUPLICATE_FLAG_FIELD, true);
                setAttribute(body, DUPLICATE_IDS_FIELD, duplicates.map((d) => d.documentId));
            }
        }
    }
    catch (error) {
        // Die Dublettenprüfung darf die Verarbeitung nicht aufhalten - Fehler nur
        // protokollieren und die Attribute unverändert zurückgeben.
        logger.error(`Dublettenprüfung fehlgeschlagen: ${error instanceof Error ? error.message : String(error)}`);
    }
    // Diagnose (vorübergehend): was an den Rechnungsleser zurückgeht.
    logger.info(`Antwort: ${JSON.stringify(body).slice(0, 4000)}`);
    res.status(200).set("Content-Type", "application/json").send(JSON.stringify(body));
};
async function findDuplicates(baseUri, apiKey, vendorNum, invoiceNumber, currentDocumentId) {
    // Werte stammen aus der Extraktion (Rechnungstext) - als SQL-Literal
    // maskieren, damit z.B. ein Hochkomma in der Rechnungsnummer die Abfrage
    // nicht verändert.
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
    const result = (await (0, executeSqlQuery_1.executeSqlQuery)(baseUri, apiKey, APP, sqlQuery)).body;
    const headers = (result?.headers ?? []).map((h) => h.toLowerCase());
    const column = (cells, name) => cells[headers.indexOf(name.toLowerCase())] ?? "";
    return (result?.rows ?? []).map((row) => ({
        documentId: column(row.cells ?? [], "DocumentId"),
        vendorNum: column(row.cells ?? [], "VendorNum"),
        invoiceNumber: column(row.cells ?? [], "InvoiceNumber"),
    }));
}
function sqlString(value) {
    return `N'${value.replace(/'/g, "''")}'`;
}
// Attribut aus dem Rechnungsleser-JSON: direkt als Feld (ohne Rücksicht auf
// Groß-/Kleinschreibung) oder als Eintrag einer Attributliste
// ({ Name/AttributeName/Id, Value }).
function attribute(body, name) {
    const key = name.toLowerCase();
    for (const [field, value] of Object.entries(body)) {
        if (field.toLowerCase() === key && value !== null && typeof value !== "object") {
            return String(value).trim();
        }
    }
    for (const value of Object.values(body)) {
        if (!Array.isArray(value))
            continue;
        for (const entry of value) {
            const entryName = String(entry?.Name ?? entry?.AttributeName ?? entry?.Id ?? entry?.name ?? "").toLowerCase();
            if (entryName === key) {
                return String(entry?.Value ?? entry?.value ?? "").trim();
            }
        }
    }
    return "";
}
// Schreibt ein Attribut im selben Format zurück, in dem die Attribute
// ankommen: steckt VENDOR_NUM in einer Attributliste ({ Name, Value }), wird
// dort ein Eintrag mit denselben Feldnamen ergänzt bzw. überschrieben - sonst
// direkt als Feld.
function setAttribute(body, name, value) {
    // Der Rechnungsleser schickt die Attribute flach ({ "VENDOR_NUM": "…" }) und
    // übernimmt nur Werte im Typ des Attributs: ein Text-Attribut kommt als ""
    // an und verwirft true bzw. ein Array - dann als Text zurückgeben
    // ("true", Ids kommagetrennt). Boolean-/Listen-Attribute bekommen den Wert
    // unverändert.
    const current = body[name];
    body[name] = typeof current === "string"
        ? (Array.isArray(value) ? value.join(", ") : String(value))
        : value;
}
function parseBody(req) {
    try {
        const body = req.json?.();
        return body && typeof body === "object" ? body : {};
    }
    catch {
        return {};
    }
}


/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	const __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		const cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		const module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			const e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	let __webpack_exports__ = __webpack_require__("./src/scripts/duplicateDetection.ts");
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;
//# sourceMappingURL=duplicateDetection.js.map