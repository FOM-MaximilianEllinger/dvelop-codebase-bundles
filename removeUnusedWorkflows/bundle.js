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
// Eigene Aktionen (kein JobType): wirken unabhängig von der gewählten
// "Version" auf alle Versionen eines Prozesses.
const CANCEL_ALL_ACTION = "CANCEL_ALL";
const MIGRATE_ALL_ACTION = "MIGRATE_ALL";
// "Aktion" ist unabhängig von Server-Daten, deshalb statisch.
const AKTIONEN = [
    { label: "Erneut versuchen", value: getAllJobs_1.JobType.Retry },
    { label: "Abbrechen", value: getAllJobs_1.JobType.Cancel },
    { label: "Alle abbrechen", value: CANCEL_ALL_ACTION },
    { label: "Löschen", value: getAllJobs_1.JobType.Deletion },
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
            setContent(form, "instanzenInfo", `<p>Aktuell laufen <strong>${total}</strong> Instanz(en) über <strong>${counts.length}</strong> Version(en) von "${processKey}".</p>`);
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
            setContent(form, "instanzenInfo", `<p>Aktuell laufen <strong>${count}</strong> Instanz(en) von "${processKey}" (Version ${version}).</p>`);
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
                setContent(form, "instanzenInfo", `<p>Keine Versionen für "${processKey}" gefunden.</p>`);
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
            setContent(form, "instanzenInfo", `<p>Aktuell laufen <strong>${total}</strong> Instanz(en) über <strong>${olderVersions.length}</strong> ältere Version(en) von "${processKey}" – werden auf Version <strong>${latest}</strong> migriert.</p>`);
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
            setContent(form, "instanzenInfo", `<p>Aktuell laufen <strong>${count}</strong> Instanz(en) von "${processKey}" (Version ${version}) – werden${targetText} migriert.</p>`);
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
        inputLabel: `Grund für den Abbruch von "${processKey}" (Version ${version})`,
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
        inputLabel: `Grund für den Abbruch aller Versionen von "${processKey}"`,
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
            text: `Instanzen aller ${versionNumbers.length} Version(en) von "${processKey}" wurden abgebrochen.`,
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
        text: `Instanzen von "${processKey}" (Version ${version}) werden auf die aktuellste Version migriert.`,
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
            await Swal.fire({ icon: "info", title: "Keine Versionen", text: `Für "${processKey}" wurden keine Versionen gefunden.` });
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
            text: `${olderVersions.length} ältere Version(en) von "${processKey}" werden auf Version ${latest} migriert.`,
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
            text: `${olderVersions.length} ältere Version(en) von "${processKey}" wurden auf Version ${latest} migriert.`,
        });
        await refreshInstanceInfo(form, MIGRATE_ALL_ACTION, processKey, undefined);
    }
    catch (error) {
        logger.error(`Fehler beim Migrieren aller Instanzen von "${processKey}": ${error}`);
        await Swal.fire({ icon: "error", title: "Fehler beim Migrieren", text: String(error) });
    }
}
// Klick-Handler des generischen Aktions-Buttons: leitet je nach gewählter
// Aktion an den passenden Cancel- bzw. Migrations-Ablauf weiter.
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