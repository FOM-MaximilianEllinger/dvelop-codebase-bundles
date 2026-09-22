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

/***/ "../../helper/process/cancelProcessInstances.ts":
/*!******************************************************!*\
  !*** ../../helper/process/cancelProcessInstances.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.cancelProcessInstances = cancelProcessInstances;
const performHttpRequest_1 = __webpack_require__(/*! ../performHttpRequest/performHttpRequest */ "../../helper/performHttpRequest/performHttpRequest.ts");
async function cancelProcessInstances(baseUri, token, processKey, version, cancelReason) {
    const url = `${baseUri}/process/processes/${encodeURIComponent(processKey)}/versions/${encodeURIComponent(String(version))}/cancel`;
    const headers = {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
    };
    const body = { cancelReason };
    const options = {
        method: "POST",
        headers,
        body: JSON.stringify(body),
    };
    return await (0, performHttpRequest_1.performHttpRequest)(url, options);
}


/***/ }),

/***/ "../../helper/process/deleteProcessVersion.ts":
/*!****************************************************!*\
  !*** ../../helper/process/deleteProcessVersion.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.deleteProcessVersion = deleteProcessVersion;
const performHttpRequest_1 = __webpack_require__(/*! ../performHttpRequest/performHttpRequest */ "../../helper/performHttpRequest/performHttpRequest.ts");
async function deleteProcessVersion(baseUri, token, processKey, version) {
    const url = `${baseUri}/process/processes/${encodeURIComponent(processKey)}/versions/${encodeURIComponent(String(version))}`;
    const headers = {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
    };
    const options = {
        method: "DELETE",
        headers,
    };
    return await (0, performHttpRequest_1.performHttpRequest)(url, options);
}


/***/ }),

/***/ "../../helper/process/getActiveInstanceCount.ts":
/*!******************************************************!*\
  !*** ../../helper/process/getActiveInstanceCount.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getActiveInstanceCount = getActiveInstanceCount;
const performHttpRequest_1 = __webpack_require__(/*! ../performHttpRequest/performHttpRequest */ "../../helper/performHttpRequest/performHttpRequest.ts");
async function getActiveInstanceCount(baseUri, token, processKey, version) {
    const url = `${baseUri}/process/processes/${encodeURIComponent(processKey)}/versions/${encodeURIComponent(String(version))}/activeInstanceCount`;
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

/***/ "../../helper/process/getAllJobs.ts":
/*!******************************************!*\
  !*** ../../helper/process/getAllJobs.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JobType = exports.JobState = exports.Type = void 0;
exports.getAllJobs = getAllJobs;
const performHttpRequest_1 = __webpack_require__(/*! ../performHttpRequest/performHttpRequest */ "../../helper/performHttpRequest/performHttpRequest.ts");
var Type;
(function (Type) {
    Type["ApplicationHALJSON"] = "application/hal+json";
})(Type || (exports.Type = Type = {}));
var JobState;
(function (JobState) {
    JobState["Scheduled"] = "SCHEDULED";
    JobState["Ended"] = "ENDED";
    JobState["Pending"] = "PENDING";
})(JobState || (exports.JobState = JobState = {}));
var JobType;
(function (JobType) {
    JobType["Cancel"] = "CANCEL";
    JobType["Deletion"] = "DELETION";
    JobType["Migration"] = "MIGRATION";
    JobType["Retry"] = "RETRY";
})(JobType || (exports.JobType = JobType = {}));
async function getAllJobs(baseUri, token) {
    const url = `${baseUri}/process/jobs`;
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

/***/ "../../helper/process/getAllProcesses.ts":
/*!***********************************************!*\
  !*** ../../helper/process/getAllProcesses.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Source = exports.Type = void 0;
exports.getAllProcesses = getAllProcesses;
const performHttpRequest_1 = __webpack_require__(/*! ../performHttpRequest/performHttpRequest */ "../../helper/performHttpRequest/performHttpRequest.ts");
var Type;
(function (Type) {
    Type["ApplicationHALJSON"] = "application/hal+json";
})(Type || (exports.Type = Type = {}));
var Source;
(function (Source) {
    Source["Inbound"] = "inbound";
    Source["Processadministration"] = "processadministration";
})(Source || (exports.Source = Source = {}));
async function getAllProcesses(baseUri, token) {
    const url = `${baseUri}/process/processes`;
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

/***/ "../../helper/process/getProcessVersions.ts":
/*!**************************************************!*\
  !*** ../../helper/process/getProcessVersions.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Type = void 0;
exports.getProcessVersions = getProcessVersions;
const performHttpRequest_1 = __webpack_require__(/*! ../performHttpRequest/performHttpRequest */ "../../helper/performHttpRequest/performHttpRequest.ts");
var Type;
(function (Type) {
    Type["ApplicationHALJSON"] = "application/hal+json";
})(Type || (exports.Type = Type = {}));
async function getProcessVersions(baseUri, token, processKey) {
    const url = `${baseUri}/process/processes/${encodeURIComponent(processKey)}/versions`;
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

/***/ "../../helper/process/migrateProcessInstances.ts":
/*!*******************************************************!*\
  !*** ../../helper/process/migrateProcessInstances.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.migrateProcessInstances = migrateProcessInstances;
const performHttpRequest_1 = __webpack_require__(/*! ../performHttpRequest/performHttpRequest */ "../../helper/performHttpRequest/performHttpRequest.ts");
async function migrateProcessInstances(baseUri, token, processKey, version) {
    const url = `${baseUri}/process/processes/${encodeURIComponent(processKey)}/versions/${encodeURIComponent(String(version))}/migration`;
    const headers = {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
    };
    const options = {
        method: "POST",
        headers,
        body: JSON.stringify({}),
    };
    return await (0, performHttpRequest_1.performHttpRequest)(url, options);
}


/***/ }),

/***/ "../../helper/process/retryProcessInstances.ts":
/*!*****************************************************!*\
  !*** ../../helper/process/retryProcessInstances.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.retryProcessInstances = retryProcessInstances;
const performHttpRequest_1 = __webpack_require__(/*! ../performHttpRequest/performHttpRequest */ "../../helper/performHttpRequest/performHttpRequest.ts");
async function retryProcessInstances(baseUri, token, processKey, version) {
    const url = `${baseUri}/process/processes/${encodeURIComponent(processKey)}/versions/${encodeURIComponent(String(version))}/retry`;
    const headers = {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
    };
    const options = {
        method: "POST",
        headers,
        body: JSON.stringify({}),
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
const getAllProcesses_1 = __webpack_require__(/*! ../../../helper/process/getAllProcesses */ "../../helper/process/getAllProcesses.ts");
const getProcessVersions_1 = __webpack_require__(/*! ../../../helper/process/getProcessVersions */ "../../helper/process/getProcessVersions.ts");
const getActiveInstanceCount_1 = __webpack_require__(/*! ../../../helper/process/getActiveInstanceCount */ "../../helper/process/getActiveInstanceCount.ts");
const cancelProcessInstances_1 = __webpack_require__(/*! ../../../helper/process/cancelProcessInstances */ "../../helper/process/cancelProcessInstances.ts");
const migrateProcessInstances_1 = __webpack_require__(/*! ../../../helper/process/migrateProcessInstances */ "../../helper/process/migrateProcessInstances.ts");
const retryProcessInstances_1 = __webpack_require__(/*! ../../../helper/process/retryProcessInstances */ "../../helper/process/retryProcessInstances.ts");
const deleteProcessVersion_1 = __webpack_require__(/*! ../../../helper/process/deleteProcessVersion */ "../../helper/process/deleteProcessVersion.ts");
// Lädt SweetAlert2 bei Bedarf nach, analog zu deleteBadgesFromDocumentReaderForm/src/form.ts.
function loadSweetAlert() {
    return new Promise((resolve) => {
        if (typeof Swal !== "undefined") {
            resolve();
            return;
        }
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css";
        document.head.appendChild(link);
        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.js";
        script.onload = () => resolve();
        document.head.appendChild(script);
    });
}
const logger = (0, logger_1.initLogger)(logger_1.LogLevel.DEBUG, true);
// Eigener Versionszähler, analog zu TOOLBOX_VERSION_COUNTER in
// projects/Toolbox/src/form.ts: wird von publish-bundles.yml bei jedem
// Publish automatisch um 1 erhöht, damit die Toolbox (loadedTools-Grid)
// erkennen kann, ob auf GitHub eine neuere Version dieses Tools liegt.
const REMOVEUNUSEDWORKFLOWS_VERSION_COUNTER = 7;
// Eigene Aktionen (kein JobType): wirken unabhängig von der gewählten
// "Version" auf alle Versionen eines Prozesses.
const CANCEL_ALL_ACTION = "CANCEL_ALL";
const MIGRATE_ALL_ACTION = "MIGRATE_ALL";
const RETRY_ALL_ACTION = "RETRY_ALL";
const DELETE_ALL_ACTION = "DELETE_ALL";
// "Aktion" ist unabhängig von Server-Daten, deshalb statisch.
const AKTIONEN = [
    { label: "Erneut versuchen", value: getAllJobs_1.JobType.Retry },
    { label: "Alle erneut versuchen", value: RETRY_ALL_ACTION },
    { label: "Abbrechen", value: getAllJobs_1.JobType.Cancel },
    { label: "Alle abbrechen", value: CANCEL_ALL_ACTION },
    { label: "Prozessversion löschen", value: getAllJobs_1.JobType.Deletion },
    { label: "Alle Prozessversionen löschen", value: DELETE_ALL_ACTION },
    { label: "Migrieren", value: getAllJobs_1.JobType.Migration },
    { label: "Alle migrieren", value: MIGRATE_ALL_ACTION },
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
async function loadProcesses() {
    // Kein API-Key nötig: läuft über die aktuelle Browser-Session (Session-Cookie),
    // genau wie die dforms-Aufrufe der Toolbox.
    const response = await (0, getAllProcesses_1.getAllProcesses)(window.location.origin, "");
    return response.body._embedded?.processes ?? [];
}
async function loadVersions(processKey) {
    const response = await (0, getProcessVersions_1.getProcessVersions)(window.location.origin, "", processKey);
    return response.body._embedded?.versions ?? [];
}
function processOptions(processes) {
    return processes
        .filter((p) => !!p.key)
        .map((p) => ({ label: p.name ?? p.key, value: p.key }));
}
// Cache Prozess-Key -> Prozess-Name, damit Meldungen den lesbaren Namen statt
// des technischen Keys (z.B. "p-729f3447-...") anzeigen können.
let processNameByKey = {};
function getProcessDisplayName(processKey) {
    return processNameByKey[processKey] ?? processKey;
}
// Alle Jobs (unter https://.../process/jobs), zuletzt geladen für die
// Jobs-Übersicht unterhalb der Aktion-Auswahl.
let allJobs = [];
async function loadAllJobs() {
    const response = await (0, getAllJobs_1.getAllJobs)(window.location.origin, "");
    return response.body._embedded?.jobs ?? [];
}
function jobStateLabel(state) {
    switch (state) {
        case getAllJobs_1.JobState.Scheduled:
            return "Geplant";
        case getAllJobs_1.JobState.Pending:
            return "Ausstehend";
        case getAllJobs_1.JobState.Ended:
            return "Beendet";
        default:
            return state ?? "-";
    }
}
function formatJobDate(value) {
    if (!value) {
        return "-";
    }
    const date = new Date(value);
    return isNaN(date.getTime()) ? String(value) : date.toLocaleString("de-DE");
}
function jobTypeLabel(type) {
    switch (type) {
        case getAllJobs_1.JobType.Cancel:
            return "Abbrechen";
        case getAllJobs_1.JobType.Deletion:
            return "Löschen";
        case getAllJobs_1.JobType.Migration:
            return "Migrieren";
        case getAllJobs_1.JobType.Retry:
            return "Erneut versuchen";
        default:
            return type ?? "-";
    }
}
function escapeHtml(value) {
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}
const jobFilters = { type: "", processKey: "", version: "", state: "", created: "", started: "" };
function jobMatchesFilters(job) {
    if (jobFilters.type && job.type !== jobFilters.type) {
        return false;
    }
    if (jobFilters.state && job.state !== jobFilters.state) {
        return false;
    }
    if (jobFilters.version && !String(job.processVersion ?? "").includes(jobFilters.version)) {
        return false;
    }
    if (jobFilters.processKey) {
        const processName = job.processKey ? getProcessDisplayName(job.processKey) : "";
        const haystack = `${processName} ${job.processKey ?? ""}`.toLowerCase();
        if (!haystack.includes(jobFilters.processKey.toLowerCase())) {
            return false;
        }
    }
    if (jobFilters.created && !formatJobDate(job.creationDate).toLowerCase().includes(jobFilters.created.toLowerCase())) {
        return false;
    }
    if (jobFilters.started && !formatJobDate(job.startDate).toLowerCase().includes(jobFilters.started.toLowerCase())) {
        return false;
    }
    return true;
}
// Standard: neueste Jobs zuerst (nach Erstellungsdatum absteigend).
let jobSort = { field: "creationDate", direction: "desc" };
function compareJobs(a, b, sort) {
    let result;
    switch (sort.field) {
        case "type":
            result = (a.type ?? "").localeCompare(b.type ?? "");
            break;
        case "processKey": {
            const nameA = a.processKey ? getProcessDisplayName(a.processKey) : "";
            const nameB = b.processKey ? getProcessDisplayName(b.processKey) : "";
            result = nameA.localeCompare(nameB);
            break;
        }
        case "processVersion":
            result = (a.processVersion ?? 0) - (b.processVersion ?? 0);
            break;
        case "state":
            result = (a.state ?? "").localeCompare(b.state ?? "");
            break;
        case "creationDate":
            result = new Date(a.creationDate ?? 0).getTime() - new Date(b.creationDate ?? 0).getTime();
            break;
        case "startDate":
            result = new Date(a.startDate ?? 0).getTime() - new Date(b.startDate ?? 0).getTime();
            break;
    }
    return sort.direction === "asc" ? result : -result;
}
// Rendert nur die Tabellenzeilen (ohne Filterzeile/Header), damit ein
// Filter- oder Sortierwechsel nur den <tbody>-Inhalt austauscht und die
// Filterfelder (samt Fokus/Cursor) nicht durch ein volles Redraw verloren
// gehen.
function renderJobsTableRows(jobs) {
    const filtered = jobs.filter(jobMatchesFilters);
    if (jobSort) {
        filtered.sort((a, b) => compareJobs(a, b, jobSort));
    }
    if (filtered.length === 0) {
        return `<tr><td colspan="6">Keine Jobs gefunden.</td></tr>`;
    }
    return filtered
        .map((job) => `
      <tr>
        <td>${jobTypeLabel(job.type)}</td>
        <td>${job.processKey ? escapeHtml(getProcessDisplayName(job.processKey)) : "-"}</td>
        <td>${job.processVersion ?? "-"}</td>
        <td>${jobStateLabel(job.state)}</td>
        <td>${formatJobDate(job.creationDate)}</td>
        <td>${formatJobDate(job.startDate)}</td>
      </tr>`)
        .join("");
}
// Baut die Filterzeile mit je einem Eingabefeld pro Spalte. Typ/Status sind
// Dropdowns (feste Werte), die übrigen Spalten Freitext-Filter ("enthält").
function renderJobsFilterRow() {
    const typeOptions = [{ value: "", label: "Alle" }, ...Object.values(getAllJobs_1.JobType).map((value) => ({ value, label: jobTypeLabel(value) }))]
        .map((opt) => `<option value="${opt.value}"${jobFilters.type === opt.value ? " selected" : ""}>${escapeHtml(opt.label)}</option>`)
        .join("");
    const stateOptions = [{ value: "", label: "Alle" }, ...Object.values(getAllJobs_1.JobState).map((value) => ({ value, label: jobStateLabel(value) }))]
        .map((opt) => `<option value="${opt.value}"${jobFilters.state === opt.value ? " selected" : ""}>${escapeHtml(opt.label)}</option>`)
        .join("");
    return `
    <tr>
      <th><select data-job-filter="type" style="width:100%;">${typeOptions}</select></th>
      <th><input type="text" data-job-filter="processKey" placeholder="Filtern…" value="${escapeHtml(jobFilters.processKey)}" style="width:100%;" /></th>
      <th><input type="text" data-job-filter="version" placeholder="Filtern…" value="${escapeHtml(jobFilters.version)}" style="width:100%;" /></th>
      <th><select data-job-filter="state" style="width:100%;">${stateOptions}</select></th>
      <th><input type="text" data-job-filter="created" placeholder="Filtern…" value="${escapeHtml(jobFilters.created)}" style="width:100%;" /></th>
      <th><input type="text" data-job-filter="started" placeholder="Filtern…" value="${escapeHtml(jobFilters.started)}" style="width:100%;" /></th>
    </tr>`;
}
// Baut eine klickbare, sortierbare Spaltenüberschrift mit Sortierpfeil.
function renderJobsHeaderCell(label, field) {
    const indicator = jobSort && jobSort.field === field ? (jobSort.direction === "asc" ? " ▲" : " ▼") : "";
    return `<th data-job-sort="${field}" style="cursor:pointer; user-select:none; white-space:nowrap;">${escapeHtml(label)}<span data-job-sort-indicator="${field}">${indicator}</span></th>`;
}
// Baut die vollständige Tabelle (Header + Filterzeile + Zeilen). Wird nur bei
// einem echten Neuladen der Jobs vom Server aufgerufen.
function renderJobsTableShell() {
    return `
    <table class="table table-striped" style="width:100%;">
      <thead>
        <tr>
          ${renderJobsHeaderCell("Typ", "type")}
          ${renderJobsHeaderCell("Prozess", "processKey")}
          ${renderJobsHeaderCell("Version", "processVersion")}
          ${renderJobsHeaderCell("Status", "state")}
          ${renderJobsHeaderCell("Erstellt", "creationDate")}
          ${renderJobsHeaderCell("Gestartet", "startDate")}
        </tr>
        ${renderJobsFilterRow()}
      </thead>
      <tbody id="jobsTableBody">${renderJobsTableRows(allJobs)}</tbody>
    </table>`;
}
// Tauscht nur den Tabellenkörper aus (Filterwechsel), ohne die Filterzeile
// per formio-Redraw neu zu erzeugen.
function refreshJobsTableBody(form) {
    const component = form.getComponent("jobsListe");
    const tbody = component?.element?.querySelector("#jobsTableBody") ?? null;
    if (tbody) {
        tbody.innerHTML = renderJobsTableRows(allJobs);
    }
}
// Aktualisiert nur die Sortierpfeile in den Spaltenüberschriften (ohne die
// Filterzeile neu zu erzeugen), nachdem sich die Sortierung geändert hat.
function updateJobsSortIndicators(form) {
    const component = form.getComponent("jobsListe");
    const root = component?.element;
    if (!root) {
        return;
    }
    root.querySelectorAll("[data-job-sort-indicator]").forEach((el) => {
        const field = el.getAttribute("data-job-sort-indicator");
        el.textContent = jobSort && jobSort.field === field ? (jobSort.direction === "asc" ? " ▲" : " ▼") : "";
    });
}
// Bindet Filter- und Sortier-Interaktionen per Event-Delegation auf dem
// stabilen Komponenten-Wrapper, statt auf jedes Feld/jede Überschrift
// einzeln zu horchen – so funktioniert es unabhängig davon, wann formio den
// Inhalt tatsächlich in den DOM schreibt, und muss nach einem reinen
// Body-Update nicht neu gebunden werden.
function bindJobsTableEvents(form) {
    const component = form.getComponent("jobsListe");
    const root = component?.element;
    if (!root || root.dataset.eventsBound === "true") {
        return;
    }
    root.dataset.eventsBound = "true";
    const handleFilterChange = (event) => {
        const target = event.target;
        const field = target?.getAttribute("data-job-filter");
        if (!field) {
            return;
        }
        jobFilters[field] = target.value;
        refreshJobsTableBody(form);
    };
    root.addEventListener("input", handleFilterChange);
    root.addEventListener("change", handleFilterChange);
    root.addEventListener("click", (event) => {
        const target = event.target?.closest("[data-job-sort]");
        const field = target?.getAttribute("data-job-sort");
        if (!field) {
            return;
        }
        if (jobSort && jobSort.field === field) {
            jobSort = { field, direction: jobSort.direction === "asc" ? "desc" : "asc" };
        }
        else {
            jobSort = { field, direction: "asc" };
        }
        updateJobsSortIndicators(form);
        refreshJobsTableBody(form);
    });
}
// Rendert Header, Filterzeile und Zeilen komplett neu (z.B. nach dem Laden
// neuer Jobs vom Server) und bindet die Filter-/Sortier-Listener auf den
// neuen Wrapper.
function renderJobsList(form) {
    setContent(form, "jobsListe", renderJobsTableShell());
    bindJobsTableEvents(form);
}
// Lädt die Jobs neu vom Server und rendert die Übersicht mit dem aktuell
// gesetzten Spaltenfiltern neu. Wird initial sowie nach jeder Aktion
// aufgerufen, damit die Übersicht aktuell bleibt.
async function reloadJobsList(form) {
    setContent(form, "jobsListe", "<p>Jobs werden geladen…</p>");
    try {
        allJobs = await loadAllJobs();
    }
    catch (error) {
        logger.error(`Fehler beim Laden der Jobs: ${error}`);
        setContent(form, "jobsListe", "<p>Fehler beim Laden der Jobs.</p>");
        return;
    }
    renderJobsList(form);
}
function versionOptions(versions) {
    return versions
        .filter((v) => v.number !== undefined)
        .sort((a, b) => b.number - a.number)
        .map((v) => ({ label: String(v.number), value: String(v.number) }));
}
// Setzt den Inhalt einer Content-Komponente (type: "htmlelement") und stößt ein
// Redraw an, analog zu setTitle in projects/GeneralCostAccountingWorkflow/src/form.ts.
function setContent(form, key, html) {
    const component = form.getComponent(key);
    if (!component) {
        logger.warn(`Komponente "${key}" nicht im Formular gefunden.`);
        return;
    }
    component.component.content = html;
    component.redraw();
}
// Setzt das Label einer Komponente (z.B. Button-Text) und stößt ein Redraw an.
function setLabel(form, key, label) {
    const component = form.getComponent(key);
    if (!component) {
        logger.warn(`Komponente "${key}" nicht im Formular gefunden.`);
        return;
    }
    component.component.label = label;
    component.redraw();
}
// Liefert die Versionsnummern aller Versionen eines Prozesses, absteigend
// nicht garantiert (Reihenfolge wie von der API zurückgegeben).
async function getVersionNumbers(processKey) {
    const versions = await loadVersions(processKey);
    return versions
        .filter((v) => v.number !== undefined)
        .map((v) => v.number);
}
// Ermittelt für die angegebenen Versionen jeweils die Anzahl aktiver
// Instanzen. Einzelne fehlgeschlagene Abfragen zählen als 0, damit eine
// Version mit Fehler nicht die gesamte Summe verhindert.
async function getActiveInstanceCounts(processKey, versionNumbers) {
    return Promise.all(versionNumbers.map(async (version) => {
        try {
            const response = await (0, getActiveInstanceCount_1.getActiveInstanceCount)(window.location.origin, "", processKey, version);
            return { version, count: response.body.count ?? 0 };
        }
        catch (error) {
            logger.error(`Fehler beim Laden der aktiven Instanzenanzahl für "${processKey}" Version ${version}: ${error}`);
            return { version, count: 0 };
        }
    }));
}
// Lädt die Anzahl laufender Instanzen und zeigt sie im Info-Feld an. Je nach
// gewählter Aktion entweder für die gewählte Version oder summiert über alle
// (bzw. alle älteren) Versionen des Prozesses. Die Sichtbarkeit von Info-Feld
// und Button regelt form.json selbst über customConditional.
async function refreshInstanceInfo(form, aktion, processKey, version) {
    if (!processKey) {
        return;
    }
    if (aktion === CANCEL_ALL_ACTION) {
        setLabel(form, "instanzenAction", "Alle Instanzen abbrechen");
        setContent(form, "instanzenInfo", "<p>Anzahl laufender Instanzen wird geladen…</p>");
        try {
            const versionNumbers = await getVersionNumbers(processKey);
            const counts = await getActiveInstanceCounts(processKey, versionNumbers);
            const total = counts.reduce((sum, c) => sum + c.count, 0);
            setContent(form, "instanzenInfo", `<p>Aktuell laufen <strong>${total}</strong> Instanz(en) über <strong>${counts.length}</strong> Version(en) von "${getProcessDisplayName(processKey)}".</p>`);
        }
        catch (error) {
            logger.error(`Fehler beim Laden der aktiven Instanzenanzahl (alle Versionen) für "${processKey}": ${error}`);
            setContent(form, "instanzenInfo", "<p>Fehler beim Laden der Instanzenanzahl.</p>");
        }
        return;
    }
    if (aktion === getAllJobs_1.JobType.Cancel && version) {
        setLabel(form, "instanzenAction", "Instanzen abbrechen");
        setContent(form, "instanzenInfo", "<p>Anzahl laufender Instanzen wird geladen…</p>");
        try {
            const response = await (0, getActiveInstanceCount_1.getActiveInstanceCount)(window.location.origin, "", processKey, version);
            const count = response.body.count ?? 0;
            setContent(form, "instanzenInfo", `<p>Aktuell laufen <strong>${count}</strong> Instanz(en) von "${getProcessDisplayName(processKey)}" (Version ${version}).</p>`);
        }
        catch (error) {
            logger.error(`Fehler beim Laden der aktiven Instanzenanzahl für "${processKey}" Version ${version}: ${error}`);
            setContent(form, "instanzenInfo", "<p>Fehler beim Laden der Instanzenanzahl.</p>");
        }
        return;
    }
    if (aktion === MIGRATE_ALL_ACTION) {
        setLabel(form, "instanzenAction", "Alle auf aktuellste Version migrieren");
        setContent(form, "instanzenInfo", "<p>Anzahl laufender Instanzen wird geladen…</p>");
        try {
            const versionNumbers = await getVersionNumbers(processKey);
            if (versionNumbers.length === 0) {
                setContent(form, "instanzenInfo", `<p>Keine Versionen für "${getProcessDisplayName(processKey)}" gefunden.</p>`);
                return;
            }
            const latest = Math.max(...versionNumbers);
            const olderVersions = versionNumbers.filter((v) => v !== latest);
            if (olderVersions.length === 0) {
                setContent(form, "instanzenInfo", `<p>Es gibt nur die aktuelle Version <strong>${latest}</strong> – keine Migration notwendig.</p>`);
                return;
            }
            const counts = await getActiveInstanceCounts(processKey, olderVersions);
            const total = counts.reduce((sum, c) => sum + c.count, 0);
            setContent(form, "instanzenInfo", `<p>Aktuell laufen <strong>${total}</strong> Instanz(en) über <strong>${olderVersions.length}</strong> ältere Version(en) von "${getProcessDisplayName(processKey)}" – werden auf Version <strong>${latest}</strong> migriert.</p>`);
        }
        catch (error) {
            logger.error(`Fehler beim Laden der aktiven Instanzenanzahl (alle Versionen) für "${processKey}": ${error}`);
            setContent(form, "instanzenInfo", "<p>Fehler beim Laden der Instanzenanzahl.</p>");
        }
        return;
    }
    if (aktion === getAllJobs_1.JobType.Migration && version) {
        setLabel(form, "instanzenAction", "Auf aktuellste Version migrieren");
        setContent(form, "instanzenInfo", "<p>Anzahl laufender Instanzen wird geladen…</p>");
        try {
            const [versionNumbers, response] = await Promise.all([
                getVersionNumbers(processKey),
                (0, getActiveInstanceCount_1.getActiveInstanceCount)(window.location.origin, "", processKey, version),
            ]);
            const count = response.body.count ?? 0;
            const latest = versionNumbers.length ? Math.max(...versionNumbers) : undefined;
            const targetText = latest !== undefined ? ` auf Version <strong>${latest}</strong>` : "";
            setContent(form, "instanzenInfo", `<p>Aktuell laufen <strong>${count}</strong> Instanz(en) von "${getProcessDisplayName(processKey)}" (Version ${version}) – werden${targetText} migriert.</p>`);
        }
        catch (error) {
            logger.error(`Fehler beim Laden der aktiven Instanzenanzahl für "${processKey}" Version ${version}: ${error}`);
            setContent(form, "instanzenInfo", "<p>Fehler beim Laden der Instanzenanzahl.</p>");
        }
        return;
    }
    if (aktion === RETRY_ALL_ACTION) {
        setLabel(form, "instanzenAction", "Alle erneut versuchen");
        setContent(form, "instanzenInfo", "<p>Anzahl laufender Instanzen wird geladen…</p>");
        try {
            const versionNumbers = await getVersionNumbers(processKey);
            const counts = await getActiveInstanceCounts(processKey, versionNumbers);
            const total = counts.reduce((sum, c) => sum + c.count, 0);
            setContent(form, "instanzenInfo", `<p>Aktuell laufen <strong>${total}</strong> Instanz(en) über <strong>${counts.length}</strong> Version(en) von "${getProcessDisplayName(processKey)}".</p>`);
        }
        catch (error) {
            logger.error(`Fehler beim Laden der aktiven Instanzenanzahl (alle Versionen) für "${processKey}": ${error}`);
            setContent(form, "instanzenInfo", "<p>Fehler beim Laden der Instanzenanzahl.</p>");
        }
        return;
    }
    if (aktion === getAllJobs_1.JobType.Retry && version) {
        setLabel(form, "instanzenAction", "Erneut versuchen");
        setContent(form, "instanzenInfo", "<p>Anzahl laufender Instanzen wird geladen…</p>");
        try {
            const response = await (0, getActiveInstanceCount_1.getActiveInstanceCount)(window.location.origin, "", processKey, version);
            const count = response.body.count ?? 0;
            setContent(form, "instanzenInfo", `<p>Aktuell laufen <strong>${count}</strong> Instanz(en) von "${getProcessDisplayName(processKey)}" (Version ${version}).</p>`);
        }
        catch (error) {
            logger.error(`Fehler beim Laden der aktiven Instanzenanzahl für "${processKey}" Version ${version}: ${error}`);
            setContent(form, "instanzenInfo", "<p>Fehler beim Laden der Instanzenanzahl.</p>");
        }
        return;
    }
    if (aktion === DELETE_ALL_ACTION) {
        setLabel(form, "instanzenAction", "Alle Prozessversionen löschen");
        setContent(form, "instanzenInfo", "<p>Anzahl laufender Instanzen wird geladen…</p>");
        try {
            const versionNumbers = await getVersionNumbers(processKey);
            const counts = await getActiveInstanceCounts(processKey, versionNumbers);
            const total = counts.reduce((sum, c) => sum + c.count, 0);
            setContent(form, "instanzenInfo", `<p><strong>${counts.length}</strong> Version(en) von "${getProcessDisplayName(processKey)}" werden gelöscht (aktuell <strong>${total}</strong> laufende Instanz(en)).</p>`);
        }
        catch (error) {
            logger.error(`Fehler beim Laden der aktiven Instanzenanzahl (alle Versionen) für "${processKey}": ${error}`);
            setContent(form, "instanzenInfo", "<p>Fehler beim Laden der Instanzenanzahl.</p>");
        }
        return;
    }
    if (aktion === getAllJobs_1.JobType.Deletion && version) {
        setLabel(form, "instanzenAction", "Prozessversion löschen");
        setContent(form, "instanzenInfo", "<p>Anzahl laufender Instanzen wird geladen…</p>");
        try {
            const response = await (0, getActiveInstanceCount_1.getActiveInstanceCount)(window.location.origin, "", processKey, version);
            const count = response.body.count ?? 0;
            setContent(form, "instanzenInfo", `<p>Version <strong>${version}</strong> von "${getProcessDisplayName(processKey)}" wird gelöscht (aktuell <strong>${count}</strong> laufende Instanz(en)).</p>`);
        }
        catch (error) {
            logger.error(`Fehler beim Laden der aktiven Instanzenanzahl für "${processKey}" Version ${version}: ${error}`);
            setContent(form, "instanzenInfo", "<p>Fehler beim Laden der Instanzenanzahl.</p>");
        }
    }
}
// Bricht die Instanzen der gewählten Version ab (nach Abfrage des
// Abbruchgrunds per SweetAlert2), mit Lade-Anzeige während des Requests.
async function cancelSingleVersion(form, processKey, version) {
    await loadSweetAlert();
    const { value: cancelReason, isConfirmed } = await Swal.fire({
        title: "Instanzen abbrechen",
        input: "text",
        inputLabel: `Grund für den Abbruch von "${getProcessDisplayName(processKey)}" (Version ${version})`,
        inputPlaceholder: "Abbruchgrund…",
        showCancelButton: true,
        confirmButtonText: "Abbrechen",
        cancelButtonText: "Zurück",
        inputValidator: (value) => (!value ? "Bitte einen Grund angeben." : undefined),
    });
    if (!isConfirmed || !cancelReason) {
        return;
    }
    Swal.fire({
        title: "Instanzen werden abgebrochen…",
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        didOpen: () => Swal.showLoading(),
    });
    try {
        await (0, cancelProcessInstances_1.cancelProcessInstances)(window.location.origin, "", processKey, version, cancelReason);
        await Swal.fire({ icon: "success", title: "Abgebrochen", text: "Die Instanzen wurden abgebrochen." });
        await refreshInstanceInfo(form, getAllJobs_1.JobType.Cancel, processKey, version);
    }
    catch (error) {
        logger.error(`Fehler beim Abbrechen der Instanzen von "${processKey}" Version ${version}: ${error}`);
        await Swal.fire({ icon: "error", title: "Fehler beim Abbrechen", text: String(error) });
    }
}
// Bricht die Instanzen aller Versionen eines Prozesses ab, mit
// Fortschrittsanzeige (Version X von Y) während der einzelnen Requests.
async function cancelAllVersions(form, processKey) {
    await loadSweetAlert();
    const { value: cancelReason, isConfirmed } = await Swal.fire({
        title: "Alle Instanzen abbrechen",
        input: "text",
        inputLabel: `Grund für den Abbruch aller Versionen von "${getProcessDisplayName(processKey)}"`,
        inputPlaceholder: "Abbruchgrund…",
        showCancelButton: true,
        confirmButtonText: "Alle abbrechen",
        cancelButtonText: "Zurück",
        inputValidator: (value) => (!value ? "Bitte einen Grund angeben." : undefined),
    });
    if (!isConfirmed || !cancelReason) {
        return;
    }
    try {
        const versionNumbers = await getVersionNumbers(processKey);
        Swal.fire({
            title: "Instanzen werden abgebrochen…",
            html: `Version <b>1</b> von <b>${versionNumbers.length}</b>`,
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            didOpen: () => Swal.showLoading(),
        });
        for (let i = 0; i < versionNumbers.length; i++) {
            Swal.update({ html: `Version <b>${i + 1}</b> von <b>${versionNumbers.length}</b> (Nr. ${versionNumbers[i]})` });
            await (0, cancelProcessInstances_1.cancelProcessInstances)(window.location.origin, "", processKey, versionNumbers[i], cancelReason);
        }
        await Swal.fire({
            icon: "success",
            title: "Abgebrochen",
            text: `Instanzen aller ${versionNumbers.length} Version(en) von "${getProcessDisplayName(processKey)}" wurden abgebrochen.`,
        });
        await refreshInstanceInfo(form, CANCEL_ALL_ACTION, processKey, undefined);
    }
    catch (error) {
        logger.error(`Fehler beim Abbrechen aller Instanzen von "${processKey}": ${error}`);
        await Swal.fire({ icon: "error", title: "Fehler beim Abbrechen", text: String(error) });
    }
}
// Migriert die Instanzen der gewählten Version auf die aktuellste Version,
// mit Lade-Anzeige während des Requests.
async function migrateSingleVersion(form, processKey, version) {
    await loadSweetAlert();
    const { isConfirmed } = await Swal.fire({
        title: "Auf aktuellste Version migrieren?",
        text: `Instanzen von "${getProcessDisplayName(processKey)}" (Version ${version}) werden auf die aktuellste Version migriert.`,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Migrieren",
        cancelButtonText: "Zurück",
    });
    if (!isConfirmed) {
        return;
    }
    Swal.fire({
        title: "Instanzen werden migriert…",
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        didOpen: () => Swal.showLoading(),
    });
    try {
        await (0, migrateProcessInstances_1.migrateProcessInstances)(window.location.origin, "", processKey, version);
        await Swal.fire({ icon: "success", title: "Migriert", text: "Die Instanzen wurden migriert." });
        await refreshInstanceInfo(form, getAllJobs_1.JobType.Migration, processKey, version);
    }
    catch (error) {
        logger.error(`Fehler beim Migrieren der Instanzen von "${processKey}" Version ${version}: ${error}`);
        await Swal.fire({ icon: "error", title: "Fehler beim Migrieren", text: String(error) });
    }
}
// Migriert die Instanzen aller älteren Versionen eines Prozesses auf die
// aktuellste Version, mit Fortschrittsanzeige (Version X von Y).
async function migrateAllVersions(form, processKey) {
    await loadSweetAlert();
    try {
        const versionNumbers = await getVersionNumbers(processKey);
        if (versionNumbers.length === 0) {
            await Swal.fire({ icon: "info", title: "Keine Versionen", text: `Für "${getProcessDisplayName(processKey)}" wurden keine Versionen gefunden.` });
            return;
        }
        const latest = Math.max(...versionNumbers);
        const olderVersions = versionNumbers.filter((v) => v !== latest);
        if (olderVersions.length === 0) {
            await Swal.fire({ icon: "info", title: "Keine Migration notwendig", text: `Es gibt nur die aktuelle Version ${latest}.` });
            return;
        }
        const { isConfirmed } = await Swal.fire({
            title: "Alle auf aktuellste Version migrieren?",
            text: `${olderVersions.length} ältere Version(en) von "${getProcessDisplayName(processKey)}" werden auf Version ${latest} migriert.`,
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Alle migrieren",
            cancelButtonText: "Zurück",
        });
        if (!isConfirmed) {
            return;
        }
        Swal.fire({
            title: "Instanzen werden migriert…",
            html: `Version <b>1</b> von <b>${olderVersions.length}</b>`,
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            didOpen: () => Swal.showLoading(),
        });
        for (let i = 0; i < olderVersions.length; i++) {
            Swal.update({ html: `Version <b>${i + 1}</b> von <b>${olderVersions.length}</b> (Nr. ${olderVersions[i]})` });
            await (0, migrateProcessInstances_1.migrateProcessInstances)(window.location.origin, "", processKey, olderVersions[i]);
        }
        await Swal.fire({
            icon: "success",
            title: "Migriert",
            text: `${olderVersions.length} ältere Version(en) von "${getProcessDisplayName(processKey)}" wurden auf Version ${latest} migriert.`,
        });
        await refreshInstanceInfo(form, MIGRATE_ALL_ACTION, processKey, undefined);
    }
    catch (error) {
        logger.error(`Fehler beim Migrieren aller Instanzen von "${processKey}": ${error}`);
        await Swal.fire({ icon: "error", title: "Fehler beim Migrieren", text: String(error) });
    }
}
// Versucht die (fehlgeschlagenen) Instanzen der gewählten Version erneut,
// mit Lade-Anzeige während des Requests.
async function retrySingleVersion(form, processKey, version) {
    await loadSweetAlert();
    const { isConfirmed } = await Swal.fire({
        title: "Erneut versuchen?",
        text: `Instanzen von "${getProcessDisplayName(processKey)}" (Version ${version}) werden erneut versucht.`,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Erneut versuchen",
        cancelButtonText: "Zurück",
    });
    if (!isConfirmed) {
        return;
    }
    Swal.fire({
        title: "Instanzen werden erneut versucht…",
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        didOpen: () => Swal.showLoading(),
    });
    try {
        await (0, retryProcessInstances_1.retryProcessInstances)(window.location.origin, "", processKey, version);
        await Swal.fire({ icon: "success", title: "Erneut versucht", text: "Die Instanzen wurden erneut versucht." });
        await refreshInstanceInfo(form, getAllJobs_1.JobType.Retry, processKey, version);
    }
    catch (error) {
        logger.error(`Fehler beim erneuten Versuch der Instanzen von "${processKey}" Version ${version}: ${error}`);
        await Swal.fire({ icon: "error", title: "Fehler beim erneuten Versuch", text: String(error) });
    }
}
// Versucht die Instanzen aller Versionen eines Prozesses erneut, mit
// Fortschrittsanzeige (Version X von Y).
async function retryAllVersions(form, processKey) {
    await loadSweetAlert();
    try {
        const versionNumbers = await getVersionNumbers(processKey);
        if (versionNumbers.length === 0) {
            await Swal.fire({ icon: "info", title: "Keine Versionen", text: `Für "${getProcessDisplayName(processKey)}" wurden keine Versionen gefunden.` });
            return;
        }
        const { isConfirmed } = await Swal.fire({
            title: "Alle erneut versuchen?",
            text: `${versionNumbers.length} Version(en) von "${getProcessDisplayName(processKey)}" werden erneut versucht.`,
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Alle erneut versuchen",
            cancelButtonText: "Zurück",
        });
        if (!isConfirmed) {
            return;
        }
        Swal.fire({
            title: "Instanzen werden erneut versucht…",
            html: `Version <b>1</b> von <b>${versionNumbers.length}</b>`,
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            didOpen: () => Swal.showLoading(),
        });
        for (let i = 0; i < versionNumbers.length; i++) {
            Swal.update({ html: `Version <b>${i + 1}</b> von <b>${versionNumbers.length}</b> (Nr. ${versionNumbers[i]})` });
            await (0, retryProcessInstances_1.retryProcessInstances)(window.location.origin, "", processKey, versionNumbers[i]);
        }
        await Swal.fire({
            icon: "success",
            title: "Erneut versucht",
            text: `Instanzen aller ${versionNumbers.length} Version(en) von "${getProcessDisplayName(processKey)}" wurden erneut versucht.`,
        });
        await refreshInstanceInfo(form, RETRY_ALL_ACTION, processKey, undefined);
    }
    catch (error) {
        logger.error(`Fehler beim erneuten Versuch aller Instanzen von "${processKey}": ${error}`);
        await Swal.fire({ icon: "error", title: "Fehler beim erneuten Versuch", text: String(error) });
    }
}
// Löscht die gewählte Prozessversion unwiderruflich, mit Lade-Anzeige während
// des Requests.
async function deleteSingleVersion(form, processKey, version) {
    await loadSweetAlert();
    const { isConfirmed } = await Swal.fire({
        title: "Prozessversion löschen?",
        html: `Version <strong>${version}</strong> von "${getProcessDisplayName(processKey)}" wird <strong>unwiderruflich</strong> gelöscht.`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#c0392b",
        confirmButtonText: "Löschen",
        cancelButtonText: "Zurück",
    });
    if (!isConfirmed) {
        return;
    }
    Swal.fire({
        title: "Prozessversion wird gelöscht…",
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        didOpen: () => Swal.showLoading(),
    });
    try {
        await (0, deleteProcessVersion_1.deleteProcessVersion)(window.location.origin, "", processKey, version);
        await Swal.fire({ icon: "success", title: "Gelöscht", text: "Die Prozessversion wurde gelöscht." });
        await refreshInstanceInfo(form, getAllJobs_1.JobType.Deletion, processKey, version);
    }
    catch (error) {
        logger.error(`Fehler beim Löschen der Prozessversion von "${processKey}" Version ${version}: ${error}`);
        await Swal.fire({ icon: "error", title: "Fehler beim Löschen", text: String(error) });
    }
}
// Löscht alle Prozessversionen eines Prozesses unwiderruflich, mit
// Fortschrittsanzeige (Version X von Y).
async function deleteAllVersions(form, processKey) {
    await loadSweetAlert();
    try {
        const versionNumbers = await getVersionNumbers(processKey);
        if (versionNumbers.length === 0) {
            await Swal.fire({ icon: "info", title: "Keine Versionen", text: `Für "${getProcessDisplayName(processKey)}" wurden keine Versionen gefunden.` });
            return;
        }
        const { isConfirmed } = await Swal.fire({
            title: "Alle Prozessversionen löschen?",
            html: `<strong>${versionNumbers.length}</strong> Version(en) von "${getProcessDisplayName(processKey)}" werden <strong>unwiderruflich</strong> gelöscht.`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#c0392b",
            confirmButtonText: "Alle löschen",
            cancelButtonText: "Zurück",
        });
        if (!isConfirmed) {
            return;
        }
        Swal.fire({
            title: "Prozessversionen werden gelöscht…",
            html: `Version <b>1</b> von <b>${versionNumbers.length}</b>`,
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            didOpen: () => Swal.showLoading(),
        });
        for (let i = 0; i < versionNumbers.length; i++) {
            Swal.update({ html: `Version <b>${i + 1}</b> von <b>${versionNumbers.length}</b> (Nr. ${versionNumbers[i]})` });
            await (0, deleteProcessVersion_1.deleteProcessVersion)(window.location.origin, "", processKey, versionNumbers[i]);
        }
        await Swal.fire({
            icon: "success",
            title: "Gelöscht",
            text: `${versionNumbers.length} Version(en) von "${getProcessDisplayName(processKey)}" wurden gelöscht.`,
        });
        await refreshInstanceInfo(form, DELETE_ALL_ACTION, processKey, undefined);
    }
    catch (error) {
        logger.error(`Fehler beim Löschen aller Prozessversionen von "${processKey}": ${error}`);
        await Swal.fire({ icon: "error", title: "Fehler beim Löschen", text: String(error) });
    }
}
// Klick-Handler des generischen Aktions-Buttons: leitet je nach gewählter
// Aktion an den passenden Cancel-, Migrations-, Retry- bzw. Lösch-Ablauf
// weiter.
async function runPrimaryAction(form, aktion, processKey, version) {
    if (!processKey) {
        return;
    }
    if (aktion === CANCEL_ALL_ACTION) {
        await cancelAllVersions(form, processKey);
    }
    else if (aktion === getAllJobs_1.JobType.Cancel && version) {
        await cancelSingleVersion(form, processKey, version);
    }
    else if (aktion === MIGRATE_ALL_ACTION) {
        await migrateAllVersions(form, processKey);
    }
    else if (aktion === getAllJobs_1.JobType.Migration && version) {
        await migrateSingleVersion(form, processKey, version);
    }
    else if (aktion === RETRY_ALL_ACTION) {
        await retryAllVersions(form, processKey);
    }
    else if (aktion === getAllJobs_1.JobType.Retry && version) {
        await retrySingleVersion(form, processKey, version);
    }
    else if (aktion === DELETE_ALL_ACTION) {
        await deleteAllVersions(form, processKey);
    }
    else if (aktion === getAllJobs_1.JobType.Deletion && version) {
        await deleteSingleVersion(form, processKey, version);
    }
    // Jobs-Übersicht neu laden, da die obigen Aktionen neue Jobs anlegen bzw.
    // bestehende beenden können.
    await reloadJobsList(form);
}
window.formInit = async function (form, data) {
    logger.debug("RemoveUnusedWorkflows-Formular initialisiert.");
    setSelectValues(form, "aktion", AKTIONEN);
    let processes = [];
    try {
        processes = await loadProcesses();
    }
    catch (error) {
        logger.error(`Fehler beim Laden der Prozesse: ${error}`);
    }
    setSelectValues(form, "prozess", processOptions(processes));
    processNameByKey = Object.fromEntries(processes
        .filter((p) => !!p.key)
        .map((p) => [p.key, p.name ?? p.key]));
    // Jobs-Übersicht (unter https://.../process/jobs) mit Filtern pro Spalte,
    // unabhängig von der gewählten Aktion/Prozess/Version.
    await reloadJobsList(form);
    // "Version" hängt vom gewählten Prozess ab (kaskadierende Selectbox). Die
    // Versionen kommen nicht mehr aus der Prozess-Liste selbst, sondern werden
    // pro Prozess über dessen versions-Endpunkt nachgeladen.
    const loadVersionsForProcess = async (processKey) => {
        if (!processKey) {
            setSelectValues(form, "version", []);
            return;
        }
        try {
            setSelectValues(form, "version", versionOptions(await loadVersions(processKey)));
        }
        catch (error) {
            logger.error(`Fehler beim Laden der Versionen für "${processKey}": ${error}`);
            setSelectValues(form, "version", []);
        }
    };
    await loadVersionsForProcess(data?.prozess);
    await refreshInstanceInfo(form, data?.aktion, data?.prozess, data?.version);
    // Kaskade: sobald sich "prozess" ändert, "version" für den neuen Prozess
    // neu befüllen. Ändert sich "aktion", "prozess" oder "version", wird die
    // Instanzen-Info (Anzahl laufender Instanzen) neu geladen.
    form.on("change", (event) => {
        const changedKey = event?.changed?.component?.key;
        if (changedKey === "prozess") {
            loadVersionsForProcess(event.data?.prozess);
        }
        if (changedKey === "prozess" || changedKey === "version" || changedKey === "aktion") {
            refreshInstanceInfo(form, event.data?.aktion, event.data?.prozess, event.data?.version);
        }
    });
    // Klick auf den Aktions-Button (form.json: action "event", event
    // "primaryAction") – führt je nach Aktion Cancel/Migration (einzeln oder
    // für alle Versionen) aus.
    form.on("primaryAction", () => {
        runPrimaryAction(form, form.data?.aktion, form.data?.prozess, form.data?.version);
    });
};

})();

window.MyScriptBundle = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=bundle.js.map