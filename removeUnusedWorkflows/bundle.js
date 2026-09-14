/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "../../helper/performHttpRequest/performHttpRequest.ts":
/*!*************************************************************!*\
  !*** ../../helper/performHttpRequest/performHttpRequest.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


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


/***/ }),

/***/ "../../helper/process/getAllJobs.ts":
/*!******************************************!*\
  !*** ../../helper/process/getAllJobs.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JobType = exports.State = exports.SelfType = void 0;
exports.getJobs = getJobs;
const performHttpRequest_1 = __webpack_require__(/*! ../performHttpRequest/performHttpRequest */ "../../helper/performHttpRequest/performHttpRequest.ts");
var SelfType;
(function (SelfType) {
    SelfType["ApplicationHALJSON"] = "application/hal+json";
})(SelfType || (exports.SelfType = SelfType = {}));
var State;
(function (State) {
    State["Ended"] = "ENDED";
    State["Error"] = "ERROR";
})(State || (exports.State = State = {}));
var JobType;
(function (JobType) {
    JobType["Cancel"] = "CANCEL";
    JobType["Deletion"] = "DELETION";
    JobType["Migration"] = "MIGRATION";
    JobType["Retry"] = "RETRY";
})(JobType || (exports.JobType = JobType = {}));
async function getJobs(baseUri, token) {
    const url = `${baseUri}/process/instances`;
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


/***/ }),

/***/ "../../helper/utils/logger.ts":
/*!************************************!*\
  !*** ../../helper/utils/logger.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports) => {


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


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!***********************!*\
  !*** ./src/script.ts ***!
  \***********************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const logger_1 = __webpack_require__(/*! ../../../helper/utils/logger */ "../../helper/utils/logger.ts");
const getAllJobs_1 = __webpack_require__(/*! ../../../helper/process/getAllJobs */ "../../helper/process/getAllJobs.ts");
const logger = (0, logger_1.initLogger)(logger_1.LogLevel.DEBUG, true);
// "Aktion" ist unabhängig von Server-Daten, deshalb statisch.
const AKTIONEN = [
    { label: "Erneut versuchen", value: getAllJobs_1.JobType.Retry },
    { label: "Abbrechen", value: getAllJobs_1.JobType.Cancel },
    { label: "Löschen", value: getAllJobs_1.JobType.Deletion },
    { label: "Migrieren", value: getAllJobs_1.JobType.Migration },
];
// Setzt die Optionen einer Select-Komponente und stößt ein Redraw an, analog zu
// populateAvailableForms in projects/Toolbox/src/form.ts.
function setSelectValues(form, key, values) {
    const component = form.getComponent(key);
    if (!component) {
        logger.warn(`Komponente "${key}" nicht im Formular gefunden.`);
        return;
    }
    component.component.data = { values };
    component.redraw();
}
async function loadJobs() {
    // Kein API-Key nötig: läuft über die aktuelle Browser-Session (Session-Cookie),
    // genau wie die dforms-Aufrufe der Toolbox.
    const response = await (0, getAllJobs_1.getJobs)(window.location.origin, "");
    return response.body._embedded?.jobs ?? [];
}
function distinctProcessOptions(jobs) {
    const keys = Array.from(new Set(jobs.map((j) => j.processKey).filter((k) => !!k)));
    return keys.map((k) => ({ label: k, value: k }));
}
// "Version" hängt vom gewählten Prozess ab (kaskadierende Selectbox). Ohne
// gewählten Prozess werden alle vorkommenden Versionen angezeigt.
function versionOptionsForProcess(jobs, processKey) {
    const versions = Array.from(new Set(jobs
        .filter((j) => !processKey || j.processKey === processKey)
        .map((j) => j.processVersion)
        .filter((v) => v !== undefined))).sort((a, b) => b - a);
    return versions.map((v) => ({ label: String(v), value: String(v) }));
}
window.formInit = async function (form, data) {
    logger.debug("RemoveUnusedWorkflows-Formular initialisiert.");
    setSelectValues(form, "aktion", AKTIONEN);
    let jobs = [];
    try {
        jobs = await loadJobs();
    }
    catch (error) {
        logger.error(`Fehler beim Laden der Jobs: ${error}`);
    }
    setSelectValues(form, "prozess", distinctProcessOptions(jobs));
    setSelectValues(form, "version", versionOptionsForProcess(jobs, data?.prozess));
    // Kaskade: sobald sich "prozess" ändert, "version" auf die dazu passenden
    // Versionen neu befüllen.
    form.on("change", (event) => {
        if (event?.changed?.component?.key === "prozess") {
            setSelectValues(form, "version", versionOptionsForProcess(jobs, event.data?.prozess));
        }
    });
};

})();

window.MyScriptBundle = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=bundle.js.map