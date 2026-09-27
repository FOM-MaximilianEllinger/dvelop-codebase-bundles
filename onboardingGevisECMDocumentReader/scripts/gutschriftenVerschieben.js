/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "../../helper/dms/getRepositories.ts"
/*!*******************************************!*\
  !*** ../../helper/dms/getRepositories.ts ***!
  \*******************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getRepositories = getRepositories;
const performHttpRequest_1 = __webpack_require__(/*! ../performHttpRequest/performHttpRequest */ "../../helper/performHttpRequest/performHttpRequest.ts");
async function getRepositories(baseUri, token) {
    const url = `${baseUri}/dms/r`;
    const headers = {
        "Authorization": `Bearer ${token}`,
        "Accept": "application/json",
        "Content-Type": "application/json",
    };
    const options = {
        method: "GET",
        headers,
    };
    return await (0, performHttpRequest_1.performHttpRequest)(url, options);
}


/***/ },

/***/ "../../helper/dms/getSpecificDocument.ts"
/*!***********************************************!*\
  !*** ../../helper/dms/getSpecificDocument.ts ***!
  \***********************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getSpecificDocument = getSpecificDocument;
const performHttpRequest_1 = __webpack_require__(/*! ../performHttpRequest/performHttpRequest */ "../../helper/performHttpRequest/performHttpRequest.ts");
/**
 * Retrieves a specific document from the DMS (Document Management System) using the provided parameters.
 *
 * @param baseUri - The base URI of the DMS API.
 * @param token - The authorization token to access the DMS API.
 * @param repositoryId - The ID of the repository where the document is stored.
 * @param documentId - The ID of the specific document to retrieve.
 * @returns A promise that resolves to an `ApiResponse` containing the `GetSpecificDocument` data.
 *
 * @throws Will throw an error if the HTTP request fails or the response is invalid.
 */
async function getSpecificDocument(baseUri, token, repositoryId, documentId) {
    const url = `${baseUri}/dms/r/${repositoryId}/o2/${documentId}`;
    const headers = {
        "Authorization": `Bearer ${token}`,
        "Accept": "application/json",
        "Content-Type": "application/json",
    };
    const options = {
        method: "GET",
        headers
    };
    return await (0, performHttpRequest_1.performHttpRequest)(url, options);
}


/***/ },

/***/ "../../helper/dms/updateDocument.ts"
/*!******************************************!*\
  !*** ../../helper/dms/updateDocument.ts ***!
  \******************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.updateDocument = updateDocument;
const performHttpRequest_1 = __webpack_require__(/*! ../performHttpRequest/performHttpRequest */ "../../helper/performHttpRequest/performHttpRequest.ts");
async function updateDocument(baseUri, token, repositoryId, documentId, sourceCategory, sourceProperties) {
    const url = `${baseUri}/dms/r/${repositoryId}/o2m/${documentId}`;
    const headers = {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
    };
    const body = {
        sourceCategory: sourceCategory,
        sourceId: `/dms/r/${repositoryId}/source`,
        sourceProperties: sourceProperties,
    };
    const options = {
        method: "PUT",
        headers,
        body: JSON.stringify(body),
    };
    return await (0, performHttpRequest_1.performHttpRequest)(url, options);
}


/***/ },

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

/***/ "./src/scripts/gutschriftenVerschieben.ts"
/*!************************************************!*\
  !*** ./src/scripts/gutschriftenVerschieben.ts ***!
  \************************************************/
(module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const getRepositories_1 = __webpack_require__(/*! ../../../../helper/dms/getRepositories */ "../../helper/dms/getRepositories.ts");
const getSpecificDocument_1 = __webpack_require__(/*! ../../../../helper/dms/getSpecificDocument */ "../../helper/dms/getSpecificDocument.ts");
const updateDocument_1 = __webpack_require__(/*! ../../../../helper/dms/updateDocument */ "../../helper/dms/updateDocument.ts");
const logger_1 = __webpack_require__(/*! ../../../../helper/utils/logger */ "../../helper/utils/logger.ts");
/**
 * "Rechnungsleser: Gutschriften verschieben" (ehemals
 * projects/_OLD/moveDocumentsOfDocumentReader/script.mjs, bisher nur per
 * DMS-Webhook aufgerufen): prüft beim Dokument mit der übergebenen DocId die
 * Dokumentart des Rechnungslesers und
 *  - verschiebt Gutschriften ("3", "Gutschrift", "CreditAdvice" oder der Wert
 *    aus fieldDocumentTypeValueMatch) in die Kategorie categoryCreditMemoGUID
 *    und setzt die Dokumentart auf "Gutschrift",
 *  - setzt bei Rechnungen ("2", "Rechnung", "Invoice", "CorrectionOfInvoice")
 *    die Dokumentart auf "Rechnung" (Kategorie bleibt),
 *  - lässt leere/unbekannte Werte unverändert (protokolliert die Eigenschaften
 *    des Dokuments zur Diagnose).
 *
 * Wird vom Onboarding-Formular (src/forms/form.ts) als Process-Studio-Aktion
 * mit dem Eingabeparameter "docId" (wie im BPMN "Rechnungsleser Gutschriften
 * verschieben" verwendet) angelegt; der Code wird beim Build als
 * Text ins Formular-Bundle übernommen (siehe build/webpack.form.config.js).
 * Aus Kompatibilität wird auch der Body eines DMS-Webhooks ({ doc: { id } })
 * verstanden.
 *
 * customerVariables (werden vom Formular nur beim Neuanlegen gesetzt):
 * apiKey, categoryCreditMemoGUID, fieldDocumentTypeGUID,
 * fieldDocumentTypeValueMatch.
 */
const logger = (0, logger_1.initLogger)(logger_1.LogLevel.INFO);
/** Name des Eingabeparameters der Aktion. */
const DOC_ID_INPUT = "docId";
module.exports = async (req, res) => {
    try {
        const body = parseBody(req);
        const documentId = body?.[DOC_ID_INPUT] ?? body?.DocId ?? body?.doc?.id;
        if (!documentId) {
            respond(res, 400, { success: false, message: `Eingabeparameter "${DOC_ID_INPUT}" fehlt.` });
            return;
        }
        const baseUri = req.get("x-dv-baseuri");
        const apiKey = req.var("apiKey");
        const categoryCreditMemo = req.var("categoryCreditMemoGUID");
        const fieldDocumentType = req.var("fieldDocumentTypeGUID");
        const valueMatch = req.var("fieldDocumentTypeValueMatch");
        const repositoryId = (await (0, getRepositories_1.getRepositories)(baseUri, apiKey)).body.repositories[0]?.id;
        if (!repositoryId) {
            throw new Error("Kein DMS-Repository gefunden.");
        }
        let document = (await (0, getSpecificDocument_1.getSpecificDocument)(baseUri, apiKey, repositoryId, documentId)).body;
        let documentType = readDocumentType(document, fieldDocumentType);
        if (!documentType) {
            // Beim Aufruf direkt nach dem Import sind die Eigenschaften ggf. noch
            // nicht geschrieben - einmal kurz warten und neu laden.
            await new Promise((resolve) => setTimeout(resolve, RELOAD_DELAY_MS));
            document = (await (0, getSpecificDocument_1.getSpecificDocument)(baseUri, apiKey, repositoryId, documentId)).body;
            documentType = readDocumentType(document, fieldDocumentType);
        }
        const kind = classify(documentType, valueMatch);
        if (!kind) {
            // Leer/unbekannt: nichts ändern (früher wurde daraus "Rechnung").
            const properties = [...(document.objectProperties ?? []), ...(document.multivalueProperties ?? [])]
                .map((p) => `${p.name ?? "?"} [${p.id}]=${JSON.stringify(p.value ?? p.values ?? "")}`)
                .join("; ");
            const message = `Dokument ${documentId}: Dokumentart "${documentType}" nicht erkannt (Feld ${fieldDocumentType}) - unverändert.`;
            logger.warn(`${message} Eigenschaften: ${properties.slice(0, 3000)}`);
            respond(res, 200, { success: true, changed: false, creditMemo: false, message });
            return;
        }
        const isCreditMemo = kind === "creditMemo";
        const targetCategory = isCreditMemo ? categoryCreditMemo : document.category;
        if (!targetCategory) {
            throw new Error(`Kategorie von Dokument ${documentId} konnte nicht ermittelt werden.`);
        }
        await (0, updateDocument_1.updateDocument)(baseUri, apiKey, repositoryId, documentId, targetCategory, {
            properties: [{ key: fieldDocumentType, values: [isCreditMemo ? "Gutschrift" : "Rechnung"] }],
        });
        const message = isCreditMemo
            ? `Dokument ${documentId} (Dokumentart "${documentType}") als Gutschrift in Kategorie ${categoryCreditMemo} verschoben.`
            : `Dokument ${documentId} (Dokumentart "${documentType}") als Rechnung gekennzeichnet.`;
        logger.info(message);
        respond(res, 200, { success: true, changed: true, creditMemo: isCreditMemo, message });
    }
    catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        logger.error(`Fehler: ${message}`);
        respond(res, 500, { success: false, message });
    }
};
const RELOAD_DELAY_MS = 3000;
// Werte, die der Rechnungsleser bzw. frühere Läufe im Feld hinterlassen:
// ERP-Code (preExport.ts: 3 Gutschrift, 2 Rechnung), Rechnungsleser-Typ oder
// schon der Klartext. fieldDocumentTypeValueMatch zählt zusätzlich als Gutschrift.
const CREDIT_MEMO_VALUES = ["3", "gutschrift", "creditadvice"];
const INVOICE_VALUES = ["2", "rechnung", "invoice", "correctionofinvoice"];
function classify(value, valueMatch) {
    const normalized = value.trim().toLowerCase();
    if (!normalized)
        return undefined;
    if (CREDIT_MEMO_VALUES.includes(normalized) || (valueMatch && normalized === valueMatch.trim().toLowerCase())) {
        return "creditMemo";
    }
    return INVOICE_VALUES.includes(normalized) ? "invoice" : undefined;
}
// Wert des Dokumenttyp-Felds: Einzelfeld (value/displayValue) oder erster
// Wert eines Mehrfachfelds.
function readDocumentType(document, fieldId) {
    const single = document.objectProperties?.find((p) => p.id === fieldId);
    const multi = document.multivalueProperties?.find((p) => p.id === fieldId);
    const value = single?.value ?? single?.displayValue ?? (multi?.values ? Object.values(multi.values)[0] : undefined);
    return value === undefined || value === null ? "" : String(value).trim();
}
function parseBody(req) {
    try {
        return req.json?.() ?? {};
    }
    catch {
        return {};
    }
}
function respond(res, status, body) {
    res.status(status).set("Content-Type", "application/json").send(JSON.stringify(body));
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
/******/ 	let __webpack_exports__ = __webpack_require__("./src/scripts/gutschriftenVerschieben.ts");
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;
//# sourceMappingURL=gutschriftenVerschieben.js.map