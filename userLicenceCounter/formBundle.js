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

/***/ "../../helper/scripting/callScriptEndpoint.ts"
/*!****************************************************!*\
  !*** ../../helper/scripting/callScriptEndpoint.ts ***!
  \****************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.callScriptEndpoint = callScriptEndpoint;
const performHttpRequest_1 = __webpack_require__(/*! ../performHttpRequest/performHttpRequest */ "../../helper/performHttpRequest/performHttpRequest.ts");
async function callScriptEndpoint(baseUri, scriptId, method, headers, payload) {
    const url = `${baseUri}/scripting/script/${scriptId}/run`;
    const options = {
        method: method,
        headers: headers,
        body: JSON.stringify(payload),
    };
    return await (0, performHttpRequest_1.performHttpRequest)(url, options);
}


/***/ },

/***/ "../../helper/scripting/getAllScripts.ts"
/*!***********************************************!*\
  !*** ../../helper/scripting/getAllScripts.ts ***!
  \***********************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getAllScripts = getAllScripts;
const performHttpRequest_1 = __webpack_require__(/*! ../performHttpRequest/performHttpRequest */ "../../helper/performHttpRequest/performHttpRequest.ts");
async function getAllScripts(baseUri, token) {
    const url = `${baseUri}/scripting/script`;
    const headers = {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
    };
    const options = {
        method: "GET",
        headers
    };
    return await (0, performHttpRequest_1.performHttpRequest)(url, options);
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
let __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
let exports = __webpack_exports__;
/*!***************************!*\
  !*** ./src/forms/form.ts ***!
  \***************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const getAllScripts_1 = __webpack_require__(/*! ../../../../helper/scripting/getAllScripts */ "../../helper/scripting/getAllScripts.ts");
const callScriptEndpoint_1 = __webpack_require__(/*! ../../../../helper/scripting/callScriptEndpoint */ "../../helper/scripting/callScriptEndpoint.ts");
const logger_1 = __webpack_require__(/*! ../../../../helper/utils/logger */ "../../helper/utils/logger.ts");
/**
 * Formular-Gegenstück zum User-Lizenz-Zähler-Script (src/scripts/script.ts,
 * siehe dessen Kommentar für die eigentliche Zähl-Logik) - "type": "combined"
 * in toolbox.meta.json sorgt dafür, dass die Toolbox dieses Formular UND das
 * Script als EIN Eintrag gemeinsam anlegt/aktualisiert (siehe
 * ensureTargetUpToDate in projects/Toolbox/src/forms/form.ts).
 *
 * Im Process Studio Formular-Editor manuell anzulegende Komponenten:
 *   - Ein Button mit Custom Action "runUserLicenceCounter(form, instance, data);".
 *   - Eine Content-Komponente mit Key "result" (zeigt die vom Script
 *     gelieferte HTML-Tabelle bzw. eine Fehlermeldung an).
 *
 * VERSION_COUNTER unten NICHT umbenennen, der Name ist projektübergreifend
 * fest "VERSION_COUNTER" (siehe generateTargetForms.js) - muss bei einem
 * "combined"-Tool synchron zum VERSION_COUNTER in src/scripts/script.ts
 * bleiben; .github/workflows/publish-bundles.yml erhöht bei jedem Publish
 * automatisch BEIDE Vorkommen gemeinsam.
 */
const VERSION_COUNTER = 4;
const logger = (0, logger_1.initLogger)(logger_1.LogLevel.INFO);
// Muss exakt dem Anzeigenamen in toolbox.meta.json ("name") entsprechen - so
// findet die Toolbox das zugehörige Script anhand seines eindeutigen Namens
// (siehe ensureTargetScriptUpToDate/getAllScripts, Scripts vergeben ihre GUID
// serverseitig, es gibt keine feste Id wie bei Formularen).
const SCRIPT_NAME = "User-Lizenz-Zähler";
const resultKey = "result";
function getErrorMessage(error) {
    return error instanceof Error ? error.message : String(error);
}
function showResult(form, content) {
    const resultComponent = form.getComponent(resultKey);
    if (!resultComponent) {
        logger.warn(`Komponente "${resultKey}" nicht im Formular gefunden.`);
        return;
    }
    resultComponent.component.content = content;
    resultComponent.redraw();
}
/**
 * Custom-Action des Buttons, der das User-Lizenz-Zähler-Script direkt
 * aufruft (im Process Studio Formular-Editor als
 * "runUserLicenceCounter(form, instance, data);" konfiguriert). Sucht die
 * Script-Id per Name (siehe SCRIPT_NAME), ruft sie per callScriptEndpoint
 * auf und zeigt die zurückgelieferte HTML-Tabelle in der Content-Komponente
 * "result" an - dieselbe Browser-Session (window.location.origin) wie bei
 * allen anderen dforms/Scripting-Aufrufen der Toolbox-Familie, ein
 * API-Key ist dafür nicht nötig.
 */
async function runUserLicenceCounter(form, instance, data) {
    instance.component.disabled = true;
    instance.redraw();
    try {
        const baseUri = window.location.origin;
        const allScripts = await (0, getAllScripts_1.getAllScripts)(baseUri, "");
        const script = allScripts.body.find((s) => s.name === SCRIPT_NAME);
        if (!script?.id) {
            throw new Error(`Script "${SCRIPT_NAME}" wurde nicht gefunden - wurde es bereits über die Toolbox angelegt?`);
        }
        const response = await (0, callScriptEndpoint_1.callScriptEndpoint)(baseUri, script.id, "POST", { "Content-Type": "application/json" }, {});
        showResult(form, response.body);
    }
    catch (error) {
        logger.error(`Fehler beim Ausführen von "${SCRIPT_NAME}": ${getErrorMessage(error)}`);
        showResult(form, `Fehler: ${getErrorMessage(error)}`);
    }
    finally {
        instance.component.disabled = false;
        instance.redraw();
    }
}
window.runUserLicenceCounter = runUserLicenceCounter;
function onInitialization(form, instance, data) {
    logger.debug("User-Lizenz-Zähler-Formular initialisiert.");
}
window.onInitialization = onInitialization;

})();

window.UserLicenceCounterFormBundle = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=formBundle.js.map