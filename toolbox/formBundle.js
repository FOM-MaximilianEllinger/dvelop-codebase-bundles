/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "../../helper/dforms/createForm.ts"
/*!*****************************************!*\
  !*** ../../helper/dforms/createForm.ts ***!
  \*****************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createForm = createForm;
const performHttpRequest_1 = __webpack_require__(/*! ../performHttpRequest/performHttpRequest */ "../../helper/performHttpRequest/performHttpRequest.ts");
/**
 * Legt ein neues, noch leeres Formular in Process Studio an (dieselbe Aktion, die
 * der Formular-Editor beim Klick auf "Neues Formular" ausführt). Das Ergebnis hat
 * noch keine formioFormDefinition (definition ist ein leerer String) – dafür
 * anschließend patchForm aus helper/dforms/patchForm.ts verwenden.
 *
 * @param baseUri - Die Basis-URI der d.velop-API.
 * @param token - Das Autorisierungs-Token für den Zugriff auf die API.
 * @param formId - Die vom Aufrufer vergebene GUID des neuen Formulars.
 * @param name - Der Name des neuen Formulars.
 * @param author - Identity-ID des Erstellers/letzten Bearbeiters (optional).
 * @returns Ein Promise, das zu einer `ApiResponse` mit dem angelegten Formular auflöst.
 */
async function createForm(baseUri, token, formId, name, author = "") {
    const url = `${baseUri}/processstudio/components/form`;
    const headers = {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
    };
    const now = new Date().toISOString();
    const body = {
        form: {
            id: formId,
            name,
            author,
            lastEditor: author,
            creationDate: now,
            lastModificationDate: now,
            definition: "",
            tags: null,
            automationIds: null,
            readOnly: false,
            versionId: null,
            _links: {
                edit: { href: `/dforms/ui/forms/${formId}/edit` },
                self: { href: `/dforms/api/forms/${formId}` },
                view: { href: `/dforms/ui/forms/${formId}/view` },
            },
        },
    };
    const options = {
        method: "POST",
        headers,
        body: JSON.stringify(body),
    };
    return await (0, performHttpRequest_1.performHttpRequest)(url, options);
}


/***/ },

/***/ "../../helper/dforms/getForm.ts"
/*!**************************************!*\
  !*** ../../helper/dforms/getForm.ts ***!
  \**************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getForm = getForm;
const performHttpRequest_1 = __webpack_require__(/*! ../performHttpRequest/performHttpRequest */ "../../helper/performHttpRequest/performHttpRequest.ts");
/**
 * Fetches a form by its ID from the d.velop forms API.
 *
 * @param baseUri - The base URI of the d.velop API.
 * @param token - The authorization token to access the API.
 * @param formId - The unique identifier of the form to retrieve.
 * @returns A promise that resolves to an `ApiResponse` containing the form data of type `GetForm`.
 */
async function getForm(baseUri, token, formId) {
    const url = `${baseUri}/dforms/api/forms/${formId}`;
    const headers = new Headers({
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
    });
    const options = {
        method: "GET",
        headers,
    };
    const response = await (0, performHttpRequest_1.performHttpRequest)(url, options);
    if (typeof response.body.definition === "string") {
        response.body.definition = JSON.parse(response.body.definition);
    }
    return response;
}


/***/ },

/***/ "../../helper/dforms/patchForm.ts"
/*!****************************************!*\
  !*** ../../helper/dforms/patchForm.ts ***!
  \****************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.patchForm = patchForm;
const performHttpRequest_1 = __webpack_require__(/*! ../performHttpRequest/performHttpRequest */ "../../helper/performHttpRequest/performHttpRequest.ts");
/**
 * Updates an existing form by sending a PATCH request to the specified API endpoint.
 *
 * @template T - The type of the response expected from the API.
 * @param baseUri - The base URI of the API.
 * @param token - The authorization token to access the API.
 * @param formId - The unique identifier of the form to be updated.
 * @param name - The new name for the form.
 * @param definition - The updated definition of the form.
 * @returns A promise that resolves to the API response of type `T`.
 */
async function patchForm(baseUri, token, formId, name, definition) {
    const url = `${baseUri}/dforms/api/forms/${formId}`;
    const headers = {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
    };
    const body = {
        id: formId,
        name: name,
        definition: JSON.stringify(definition)
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

/***/ "./src/config/publicBundleRepo.ts"
/*!****************************************!*\
  !*** ./src/config/publicBundleRepo.ts ***!
  \****************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PUBLIC_BUNDLE_REPO_BASE_URL = void 0;
// Öffentliches Artefakt-Repo, in das eine GitHub Action bei jedem Push auf main
// (siehe .github/workflows/publish-bundles.yml) die gebauten Bundles der einzelnen
// Content-Formular-Projekte kopiert. Öffentlich und ohne Auth abrufbar, deshalb kann
// sowohl der Browser (form.ts) als auch ein Node-Kontext (deployProjectForm.ts) den
// aktuellen Stand direkt per HTTP laden.
// TODO: Owner/Repo/Branch anpassen, falls sich das Artefakt-Repo ändert.
exports.PUBLIC_BUNDLE_REPO_BASE_URL = "https://raw.githubusercontent.com/FOM-MaximilianEllinger/dvelop-codebase-bundles/main";


/***/ },

/***/ "./src/config/targetForms.ts"
/*!***********************************!*\
  !*** ./src/config/targetForms.ts ***!
  \***********************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.targetForms = void 0;
// Kuratierte Liste der nachladbaren Content-Formulare.
// Neue Einträge hier ergänzen, sobald ein Formular per Formio + uploadFormToCloud
// eigenständig deploybar ist.
exports.targetForms = [
    {
        id: "removeUnusedWorkflows",
        name: "Ungenutzte Workflows entfernen",
        formId: "2c3e00b6-8e00-4a27-9a9e-2b5dee133ca7",
        bundlePath: "removeUnusedWorkflows/bundle.js",
    },
];


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
/*!*********************!*\
  !*** ./src/form.ts ***!
  \*********************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.APICredentials = void 0;
const getForm_1 = __webpack_require__(/*! ../../../helper/dforms/getForm */ "../../helper/dforms/getForm.ts");
const createForm_1 = __webpack_require__(/*! ../../../helper/dforms/createForm */ "../../helper/dforms/createForm.ts");
const patchForm_1 = __webpack_require__(/*! ../../../helper/dforms/patchForm */ "../../helper/dforms/patchForm.ts");
const logger_1 = __webpack_require__(/*! ../../../helper/utils/logger */ "../../helper/utils/logger.ts");
const targetForms_1 = __webpack_require__(/*! ./config/targetForms */ "./src/config/targetForms.ts");
const publicBundleRepo_1 = __webpack_require__(/*! ./config/publicBundleRepo */ "./src/config/publicBundleRepo.ts");
const logger = (0, logger_1.initLogger)(logger_1.LogLevel.DEBUG, true);
const TOOLBOX_FORM_ID = "1216ed4f-1d27-491b-b974-150d847f0c2d";
const TOOLBOX_FORM_NAME = "Toolbox";
// Pfad des eigenen Bundles im öffentlichen Artefakt-Repo (wird von
// .github/workflows/publish-bundles.yml dorthin veröffentlicht).
const TOOLBOX_BUNDLE_PATH = "toolbox/formBundle.js";
class APICredentials {
    // apiKey kommt aus dem Formularfeld "apiKey" (vom Nutzer eingegeben), statt fest im
    // customJs-Bundle zu stehen. baseUri wird aus der aktuellen Seite abgeleitet.
    constructor(apiKey) {
        this.baseUri = window.location.origin;
        this.apiKey = apiKey;
    }
}
exports.APICredentials = APICredentials;
window.formInit = function (form, data) {
    logger.debug("FormLoader initialisiert.");
    populateAvailableForms(form);
    document.addEventListener("keydown", function (event) {
        if (event.ctrlKey && event.key === "F1") {
            console.log("data");
            console.dir(data);
            console.log("form");
            console.dir(form);
            console.log("document");
            console.dir(document);
        }
    });
};
// Setzt die Auswahl-Optionen der Select-Komponente "targetFormSelector" anhand der
// kuratierten Liste in config/targetForms.ts. Key an das tatsächliche Feld im
// Formio-Schema (Process Studio Formular-Editor) anpassen, falls abweichend benannt.
function populateAvailableForms(form) {
    const selector = form.getComponent("availableForms");
    if (!selector) {
        logger.warn('Komponente "availableForms" nicht im Formular gefunden.');
        return;
    }
    selector.component.data = {
        values: targetForms_1.targetForms.map((t) => ({ label: t.name, value: t.id })),
    };
    selector.redraw();
}
const CONTENT_CSS_STYLE_ID = "form-loader-content-css";
const CONTENT_MOUNT_ID = "form-loader-content-mount";
// Aktuell aktive Ziel-Formular-Instanz (falls schon eins geladen wurde) sowie ihr
// Mount-Element. Beides lebt außerhalb des Formio-Schemas des Loaders (reines
// Code-Element), damit die Auswahl/der Button des Loaders nach dem Laden weiter
// erreichbar bleiben und man das Ziel-Formular wechseln kann.
let activeForm = null;
let activeMountElement = null;
function getOrCreateMountElement(form) {
    if (activeMountElement)
        return activeMountElement;
    let mount = document.getElementById(CONTENT_MOUNT_ID);
    if (!mount) {
        mount = document.createElement("div");
        mount.id = CONTENT_MOUNT_ID;
        form.element.insertAdjacentElement("afterend", mount);
    }
    activeMountElement = mount;
    return mount;
}
/**
 * Holt zuerst den aktuellen Bundle-Inhalt (customJs) des Ziel-Projekts direkt aus dem
 * öffentlichen Artefakt-Repo (kein Auth nötig, dasselbe Repo, in das
 * .github/workflows/publish-bundles.yml bei jedem Push auf main veröffentlicht).
 * Prüft dann per GET, ob das dforms-Formular schon existiert:
 *  - existiert es: vorhandenes Formio-Schema/CSS bleibt (Editor bleibt führend),
 *    nur customJs wird auf den frisch geladenen Bundle-Inhalt aktualisiert.
 *  - existiert es nicht ("tag:dforms:form_not_found"): wird per createForm (POST
 *    /processstudio/components/form) neu angelegt und mit einem minimalen
 *    Bootstrap-Schema plus dem Bundle-Inhalt befüllt.
 * So erledigt ein Klick auf createOrUpdate wirklich beides: anlegen ODER
 * aktualisieren, immer mit dem aktuellsten Stand aus GitHub main.
 */
async function ensureTargetFormUpToDate(credentials, target) {
    const customJsContent = await loadLatestBundle(target.bundlePath);
    try {
        const existing = await (0, getForm_1.getForm)(credentials.baseUri, credentials.apiKey, target.formId);
        logger.debug(`Formular "${target.name}" existiert bereits, aktualisiere customJs.`);
        const definition = {
            formioFormDefinition: existing.body.definition.formioFormDefinition,
            customCss: existing.body.definition.customCss,
            dvfDefVersion: "1.0",
            customJs: customJsContent,
        };
        await (0, patchForm_1.patchForm)(credentials.baseUri, credentials.apiKey, target.formId, target.name, definition);
        return definition;
    }
    catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        if (!message.includes("form_not_found")) {
            throw error;
        }
        logger.debug(`Formular "${target.name}" existiert noch nicht, lege es neu an.`);
        await (0, createForm_1.createForm)(credentials.baseUri, credentials.apiKey, target.formId, target.name);
        const definition = {
            // Bootstrap-Schema: Feld-Layout muss danach ggf. im Process Studio
            // Formular-Editor gestaltet werden, hier zählt nur das customJs.
            formioFormDefinition: { display: "form", components: [] },
            customCss: "",
            dvfDefVersion: "1.0",
            customJs: customJsContent,
        };
        await (0, patchForm_1.patchForm)(credentials.baseUri, credentials.apiKey, target.formId, target.name, definition);
        return definition;
    }
}
async function loadLatestBundle(bundlePath) {
    const url = `${publicBundleRepo_1.PUBLIC_BUNDLE_REPO_BASE_URL}/${bundlePath}`;
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) {
        throw new Error(`Bundle konnte nicht geladen werden (Status ${response.status}): ${url}`);
    }
    return await response.text();
}
/**
 * Lädt das ausgewählte Ziel-Formular in ein separates Mount-Element neben dem
 * Loader-Formular. Existiert dort noch kein Ziel-Formular ("gibt es nicht"), wird es
 * per Formio.createForm neu angelegt; läuft dort bereits eines, wird nur dessen
 * Definition per setForm() aktualisiert, statt es zu zerstören und neu aufzubauen.
 * Anschließend wird das customJs des Ziel-Formulars ausgeführt.
 */
async function createOrUpdate(form, instance, data) {
    const targetId = data.availableForms;
    const target = targetForms_1.targetForms.find((t) => t.id === targetId);
    if (!target) {
        logger.error(`Kein Formular mit id "${targetId}" in der kuratierten Liste gefunden.`);
        return;
    }
    if (!data.apiKey) {
        logger.error('Feld "apiKey" ist leer. Bitte API-Key im Formular eintragen.');
        return;
    }
    try {
        const credentials = new APICredentials(data.apiKey);
        const definition = await ensureTargetFormUpToDate(credentials, target);
        injectContentCss(definition.customCss);
        if (!window.Formio) {
            throw new Error("Formio ist im aktuellen Kontext nicht verfügbar.");
        }
        const mountElement = getOrCreateMountElement(form);
        if (!activeForm) {
            logger.debug(`Kein Ziel-Formular aktiv, lege "${target.name}" neu an.`);
            activeForm = await window.Formio.createForm(mountElement, definition.formioFormDefinition);
        }
        else {
            logger.debug(`Ziel-Formular bereits aktiv, aktualisiere auf "${target.name}".`);
            await activeForm.setForm(definition.formioFormDefinition);
        }
        runContentCustomJs(definition.customJs, activeForm);
    }
    catch (error) {
        logger.error(`Fehler beim Laden von Formular "${target.name}": ${error}`);
    }
}
window.createOrUpdate = createOrUpdate;
/**
 * Aktualisiert das Toolbox-Formular selbst: lädt sein eigenes Bundle aus dem
 * öffentlichen Artefakt-Repo und patcht es als customJs auf TOOLBOX_FORM_ID.
 * Wirkt erst nach einem Neuladen der Seite, da das gerade laufende Skript im
 * Browser-Speicher davon unberührt bleibt – patcht nur den in dforms hinterlegten
 * Stand für den nächsten Aufruf.
 */
async function updateForm(form, instance, data) {
    if (!data.apiKey) {
        logger.error('Feld "apiKey" ist leer. Bitte API-Key im Formular eintragen.');
        return;
    }
    if (TOOLBOX_FORM_ID === "TODO-GUID") {
        logger.error("TOOLBOX_FORM_ID ist noch nicht gesetzt (siehe Kommentar am Anfang von form.ts).");
        return;
    }
    try {
        const credentials = new APICredentials(data.apiKey);
        const customJsContent = await loadLatestBundle(TOOLBOX_BUNDLE_PATH);
        const existing = await (0, getForm_1.getForm)(credentials.baseUri, credentials.apiKey, TOOLBOX_FORM_ID);
        const definition = {
            formioFormDefinition: existing.body.definition.formioFormDefinition,
            customCss: existing.body.definition.customCss,
            dvfDefVersion: "1.0",
            customJs: customJsContent,
        };
        await (0, patchForm_1.patchForm)(credentials.baseUri, credentials.apiKey, TOOLBOX_FORM_ID, TOOLBOX_FORM_NAME, definition);
        logger.info("Toolbox-Formular aktualisiert. Bitte Seite neu laden, damit die neue Version greift.");
    }
    catch (error) {
        logger.error(`Fehler beim Aktualisieren des Toolbox-Formulars: ${error}`);
    }
}
window.updateForm = updateForm;
function injectContentCss(css) {
    let styleEl = document.getElementById(CONTENT_CSS_STYLE_ID);
    if (!styleEl) {
        styleEl = document.createElement("style");
        styleEl.id = CONTENT_CSS_STYLE_ID;
        document.head.appendChild(styleEl);
    }
    styleEl.textContent = css ?? "";
}
// Führt das customJs des Ziel-Formulars aus (registriert dessen eigenes
// window.formInit) und ruft es danach manuell auf, da Process Studio das nur für
// das ursprünglich deployte Formular automatisch tut.
function runContentCustomJs(customJs, newForm) {
    if (!customJs)
        return;
    try {
        // eslint-disable-next-line no-new-func
        const run = new Function(customJs);
        run();
    }
    catch (error) {
        logger.error(`Fehler beim Ausführen des customJs: ${error}`);
        return;
    }
    if (typeof window.formInit === "function") {
        void window.formInit(newForm, newForm.data);
    }
}

})();

window.FormLoaderBundle = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=formBundle.js.map