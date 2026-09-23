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
/*!*********************!*\
  !*** ./src/form.ts ***!
  \*********************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const logger_1 = __webpack_require__(/*! ../../../helper/utils/logger */ "../../helper/utils/logger.ts");
const performHttpRequest_1 = __webpack_require__(/*! ../../../helper/performHttpRequest/performHttpRequest */ "../../helper/performHttpRequest/performHttpRequest.ts");
const logger = (0, logger_1.initLogger)(logger_1.LogLevel.INFO);
// Eigener Versionszähler, analog zu TOOLBOX_VERSION_COUNTER in
// projects/Toolbox/src/form.ts: wird von publish-bundles.yml bei jedem
// Publish automatisch um 1 erhöht, damit die Toolbox (loadedTools-Grid)
// erkennen kann, ob auf GitHub eine neuere Version dieses Tools liegt.
const BUSINESSOBJECTSEDITOR_VERSION_COUNTER = 4;
const BASE_URI = window.location.origin;
const GET_HEADERS = { 'Accept': 'application/json' };
function loadBootstrap() {
    return new Promise((resolve) => {
        if (typeof bootstrap !== "undefined") {
            resolve();
            return;
        }
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css";
        document.head.appendChild(link);
        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js";
        script.onload = () => resolve();
        document.head.appendChild(script);
        logger.info("Bootstrap loaded");
    });
}
async function fetchModels() {
    const response = await (0, performHttpRequest_1.performHttpRequest)(`${BASE_URI}/businessobjects/core/models/customModels`, { method: "GET", headers: GET_HEADERS });
    return response.body.value ?? [];
}
async function fetchEntityTypes(modelId) {
    const response = await (0, performHttpRequest_1.performHttpRequest)(`${BASE_URI}/businessobjects/core/models/customModels(${modelId})/entityTypes`, { method: "GET", headers: GET_HEADERS });
    return response.body.value ?? [];
}
async function createEntityEntry(modelName, entityPluralName, data) {
    await (0, performHttpRequest_1.performHttpRequest)(`${BASE_URI}/businessobjects/custom/${modelName}/${entityPluralName}`, {
        method: "POST",
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
}
async function updateEntityEntry(modelName, entityPluralName, id, data) {
    await (0, performHttpRequest_1.performHttpRequest)(`${BASE_URI}/businessobjects/custom/${modelName}/${entityPluralName}(${id})`, {
        method: "PATCH",
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
}
async function deleteEntityEntry(modelName, entityPluralName, id) {
    await (0, performHttpRequest_1.performHttpRequest)(`${BASE_URI}/businessobjects/custom/${modelName}/${entityPluralName}(${id})`, { method: "DELETE", headers: { 'Accept': 'application/json' } });
}
async function fetchEntityEntries(modelName, entityPluralName) {
    let url = `${BASE_URI}/businessobjects/custom/${modelName}/${entityPluralName}`;
    let all = [];
    while (url) {
        const response = await (0, performHttpRequest_1.performHttpRequest)(url, { method: "GET", headers: { 'Accept': 'application/hal+json' } });
        all = all.concat(response.body.value ?? []);
        url = response.body["@odata.nextLink"];
    }
    return all;
}
function buildUI() {
    document.body.innerHTML = '';
    document.body.style.cssText = 'margin:0;padding:0;height:100vh;overflow:hidden;';
    const root = document.createElement('div');
    root.className = 'd-flex flex-column h-100';
    const main = document.createElement('div');
    main.className = 'd-flex flex-grow-1 overflow-hidden';
    const sidebar = document.createElement('div');
    sidebar.style.cssText = 'width:20%;min-width:180px;';
    sidebar.className = 'border-end d-flex flex-column overflow-hidden';
    const sidebarHeader = document.createElement('div');
    sidebarHeader.className = 'p-2 bg-secondary text-white fw-semibold small flex-shrink-0';
    sidebarHeader.textContent = 'Modelle';
    const accordionWrapper = document.createElement('div');
    accordionWrapper.className = 'overflow-y-auto flex-grow-1';
    const accordionContainer = document.createElement('div');
    accordionContainer.id = 'modelsAccordion';
    accordionContainer.className = 'accordion accordion-flush';
    accordionWrapper.appendChild(accordionContainer);
    sidebar.appendChild(sidebarHeader);
    sidebar.appendChild(accordionWrapper);
    const content = document.createElement('div');
    content.className = 'flex-grow-1 overflow-auto p-3';
    content.innerHTML = '<p class="text-muted">Bitte Modelle laden und eine Entität auswählen.</p>';
    main.appendChild(sidebar);
    main.appendChild(content);
    root.appendChild(main);
    document.body.appendChild(root);
    return { sidebar: accordionContainer, content };
}
function renderModels(accordionEl, contentEl, models) {
    accordionEl.innerHTML = '';
    if (models.length === 0) {
        accordionEl.innerHTML = '<div class="p-3 text-muted small">Keine Modelle gefunden.</div>';
        return;
    }
    models.forEach((model, idx) => {
        const collapseId = `modelCollapse${idx}`;
        const headerId = `modelHeader${idx}`;
        const item = document.createElement('div');
        item.className = 'accordion-item border-0 border-bottom';
        item.innerHTML = `
      <h2 class="accordion-header" id="${headerId}">
        <button
          class="accordion-button collapsed py-2 px-3"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#${collapseId}"
          aria-expanded="false"
          aria-controls="${collapseId}"
          style="font-size:0.82rem;font-weight:600"
        >${model.name}</button>
      </h2>
      <div id="${collapseId}" class="accordion-collapse collapse" aria-labelledby="${headerId}">
        <div class="accordion-body p-0" id="entityList${idx}">
          <div class="px-3 py-1 text-muted small">Lade Entitäten...</div>
        </div>
      </div>
    `;
        accordionEl.appendChild(item);
        item.querySelector(`#${collapseId}`).addEventListener('show.bs.collapse', async () => {
            const entityListEl = item.querySelector(`#entityList${idx}`);
            entityListEl.innerHTML = '<div class="px-3 py-1 text-muted small">Lade...</div>';
            try {
                const entities = await fetchEntityTypes(model.id);
                renderEntityList(entityListEl, contentEl, entities, model);
            }
            catch {
                entityListEl.innerHTML = '<div class="px-3 py-1 text-danger small">Fehler beim Laden</div>';
            }
        }, { once: true });
    });
}
function renderEntityList(container, contentEl, entities, model) {
    container.innerHTML = '';
    if (entities.length === 0) {
        container.innerHTML = '<div class="px-3 py-1 text-muted small">Keine Entitäten</div>';
        return;
    }
    entities.forEach(entity => {
        const btn = document.createElement('button');
        btn.className = 'btn btn-link btn-sm text-start w-100 px-4 py-1 text-decoration-none text-dark border-0 rounded-0';
        btn.style.fontSize = '0.8rem';
        btn.textContent = entity.name;
        btn.addEventListener('click', async () => {
            container.querySelectorAll('button').forEach(b => {
                b.classList.remove('bg-primary', 'text-white');
                b.classList.add('text-dark');
            });
            btn.classList.add('bg-primary', 'text-white');
            btn.classList.remove('text-dark');
            contentEl.innerHTML = '<div class="text-muted p-2">Lade Einträge...</div>';
            try {
                const entries = await fetchEntityEntries(model.name, entity.pluralName);
                renderEntityContent(contentEl, entity, entries, model);
            }
            catch (err) {
                contentEl.innerHTML = `<div class="alert alert-danger m-2">Fehler beim Laden: ${err}</div>`;
            }
        });
        container.appendChild(btn);
    });
}
function extractEntityId(entry, keyName, keyType) {
    // 1. Bekanntes Key-Feld (aus EntityType.key.name)
    if (keyName && entry[keyName] !== undefined) {
        const val = String(entry[keyName]);
        return keyType === 'string' ? `'${val}'` : val;
    }
    // 2. Fallback: direktes id-Feld (case-insensitiv)
    const idKey = Object.keys(entry).find(k => k.toLowerCase() === 'id');
    if (idKey)
        return String(entry[idKey]);
    // 3. Fallback: aus @odata.id-URL extrahieren
    const odataId = entry['@odata.id'];
    if (odataId) {
        const match = String(odataId).match(/\(([^)]+)\)$/);
        if (match)
            return match[1];
    }
    return '';
}
function buildEntityFormFields(columns, values = {}, disabledFields = new Set()) {
    if (columns.length === 0) {
        return '<p class="text-muted small">Keine Felder ermittelbar – es sind noch keine Einträge vorhanden.</p>';
    }
    return columns.map(col => {
        const val = String(values[col] ?? '').replace(/&/g, '&amp;').replace(/"/g, '&quot;');
        const disabled = disabledFields.has(col);
        return `
      <div class="mb-3">
        <label class="form-label small fw-semibold">${col}${disabled ? ' <span class="text-muted fw-normal" style="font-size:0.75em"></span>' : ''}</label>
        <input type="text" class="form-control form-control-sm" name="${col}" value="${val}" ${disabled ? 'disabled' : ''} />
      </div>`;
    }).join('');
}
function showEntityModal(title, modalId, formFields, saveDisabled, onSave) {
    document.getElementById(modalId)?.remove();
    const modalEl = document.createElement('div');
    modalEl.id = modalId;
    modalEl.className = 'modal fade';
    modalEl.tabIndex = -1;
    modalEl.innerHTML = `
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">${title}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">
          <div class="alert alert-danger d-none mb-3" data-role="error"></div>
          <form data-role="form">${formFields}</form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal">Abbrechen</button>
          <button type="button" class="btn btn-primary btn-sm" data-role="save" ${saveDisabled ? 'disabled' : ''}>Speichern</button>
        </div>
      </div>
    </div>
  `;
    document.body.appendChild(modalEl);
    const modal = new bootstrap.Modal(modalEl);
    const errorDiv = modalEl.querySelector('[data-role="error"]');
    const form = modalEl.querySelector('[data-role="form"]');
    modalEl.querySelector('[data-role="save"]').addEventListener('click', async () => {
        errorDiv.classList.add('d-none');
        try {
            await onSave(form, errorDiv, modal);
        }
        catch (err) {
            errorDiv.textContent = `Fehler beim Speichern: ${err}`;
            errorDiv.classList.remove('d-none');
        }
    });
    modalEl.addEventListener('hidden.bs.modal', () => modalEl.remove());
    modal.show();
}
function showAddEntityModal(entity, model, columns, onSaved) {
    showEntityModal(`${entity.name} hinzufügen`, 'addEntityModal', buildEntityFormFields(columns), columns.length === 0, async (form, _err, modal) => {
        const data = {};
        new FormData(form).forEach((val, key) => { data[key] = val; });
        await createEntityEntry(model.name, entity.pluralName, data);
        modal.hide();
        onSaved();
    });
}
function showEditEntityModal(entity, model, entry, columns, onSaved) {
    const id = extractEntityId(entry, entity.key?.name, entity.key?.type);
    const keyField = entity.key?.name;
    const displayColumns = keyField ? [keyField, ...columns] : columns;
    const disabledFields = keyField ? new Set([keyField]) : new Set();
    showEntityModal(`${entity.name} bearbeiten`, 'editEntityModal', buildEntityFormFields(displayColumns, entry, disabledFields), false, async (form, _err, modal) => {
        const data = {};
        new FormData(form).forEach((val, key) => { data[key] = val; });
        await updateEntityEntry(model.name, entity.pluralName, id, data);
        modal.hide();
        onSaved();
    });
}
function showDeleteConfirmModal(count, onConfirmed) {
    document.getElementById('deleteConfirmModal')?.remove();
    const modalEl = document.createElement('div');
    modalEl.id = 'deleteConfirmModal';
    modalEl.className = 'modal fade';
    modalEl.tabIndex = -1;
    modalEl.innerHTML = `
    <div class="modal-dialog modal-sm">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Löschen bestätigen</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">
          <div class="alert alert-danger d-none mb-3" data-role="error"></div>
          <p class="mb-0">Sollen <strong>${count}</strong> ${count === 1 ? 'Eintrag' : 'Einträge'} wirklich gelöscht werden?</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal">Abbrechen</button>
          <button type="button" class="btn btn-danger btn-sm" data-role="confirm">Löschen</button>
        </div>
      </div>
    </div>
  `;
    document.body.appendChild(modalEl);
    const modal = new bootstrap.Modal(modalEl);
    const errorDiv = modalEl.querySelector('[data-role="error"]');
    const confirmBtn = modalEl.querySelector('[data-role="confirm"]');
    confirmBtn.addEventListener('click', async () => {
        confirmBtn.disabled = true;
        errorDiv.classList.add('d-none');
        try {
            await onConfirmed();
            modal.hide();
        }
        catch (err) {
            errorDiv.textContent = `Fehler beim Löschen: ${err}`;
            errorDiv.classList.remove('d-none');
            confirmBtn.disabled = false;
        }
    });
    modalEl.addEventListener('hidden.bs.modal', () => modalEl.remove());
    modal.show();
}
const ICON_PENCIL = `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor" viewBox="0 0 16 16" style="margin-bottom:2px"><path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/></svg>`;
const ICON_TRASH = `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor" viewBox="0 0 16 16" style="margin-bottom:2px"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/><path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/></svg>`;
function renderEntityContent(contentEl, entity, entries, model) {
    contentEl.innerHTML = '';
    const editColumns = entries.length > 0
        ? Object.keys(entries[0]).filter(k => !k.startsWith('@') && k.toLowerCase() !== 'id' && k !== entity.key?.name)
        : [];
    const addColumns = entity.key?.name ? [entity.key.name, ...editColumns] : editColumns;
    const allColumns = entries.length > 0
        ? Object.keys(entries[0]).filter(k => !k.startsWith('@'))
        : [];
    const reloadEntries = async () => {
        contentEl.innerHTML = '<div class="text-muted p-2">Lade Einträge...</div>';
        try {
            const refreshed = await fetchEntityEntries(model.name, entity.pluralName);
            renderEntityContent(contentEl, entity, refreshed, model);
        }
        catch (err) {
            contentEl.innerHTML = `<div class="alert alert-danger m-2">Fehler beim Laden: ${err}</div>`;
        }
    };
    // --- Row 1: Title + Search ---
    const titleRow = document.createElement('div');
    titleRow.className = 'd-flex align-items-center justify-content-between mb-1 gap-2';
    const title = document.createElement('h5');
    title.className = 'mb-0';
    title.innerHTML = `${entity.name} <small class="text-muted fw-normal fs-6">${entries.length} Einträge</small>`;
    titleRow.appendChild(title);
    let searchInput = null;
    if (entries.length > 0) {
        searchInput = document.createElement('input');
        searchInput.type = 'search';
        searchInput.className = 'form-control form-control-sm';
        searchInput.placeholder = 'Alle Spalten durchsuchen...';
        searchInput.style.minWidth = '220px';
        searchInput.style.maxWidth = '320px';
        titleRow.appendChild(searchInput);
    }
    contentEl.appendChild(titleRow);
    // --- Row 2: Toolbar ---
    const toolbar = document.createElement('div');
    toolbar.className = 'd-flex align-items-center gap-2 mt-2 mb-3 pb-2 border-bottom';
    const addBtn = document.createElement('button');
    addBtn.className = 'btn btn-sm btn-outline-success';
    addBtn.textContent = '+ Hinzufügen';
    addBtn.addEventListener('click', () => showAddEntityModal(entity, model, addColumns, reloadEntries));
    const editBtn = document.createElement('button');
    editBtn.className = 'btn btn-sm btn-outline-primary';
    editBtn.innerHTML = `${ICON_PENCIL} Bearbeiten`;
    editBtn.disabled = true;
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn btn-sm btn-outline-danger';
    deleteBtn.innerHTML = `${ICON_TRASH} Löschen`;
    deleteBtn.disabled = true;
    toolbar.appendChild(addBtn);
    toolbar.appendChild(editBtn);
    toolbar.appendChild(deleteBtn);
    contentEl.appendChild(toolbar);
    if (entries.length === 0) {
        const empty = document.createElement('p');
        empty.className = 'text-muted';
        empty.textContent = 'Keine Einträge vorhanden.';
        contentEl.appendChild(empty);
        return;
    }
    // --- Checkbox selection state ---
    const selectedIds = new Set();
    const updateToolbarState = () => {
        editBtn.disabled = selectedIds.size !== 1;
        deleteBtn.disabled = selectedIds.size === 0;
    };
    // --- Table ---
    const tableWrapper = document.createElement('div');
    tableWrapper.className = 'table-responsive';
    const table = document.createElement('table');
    table.className = 'table table-sm table-bordered table-hover align-middle';
    const thead = document.createElement('thead');
    thead.className = 'table-dark';
    const headerRow = document.createElement('tr');
    const thCheck = document.createElement('th');
    thCheck.style.width = '32px';
    const selectAllWrapper = document.createElement('div');
    selectAllWrapper.className = 'form-check';
    const selectAllCb = document.createElement('input');
    selectAllCb.type = 'checkbox';
    selectAllCb.className = 'form-check-input';
    selectAllCb.title = 'Alle auswählen';
    selectAllWrapper.appendChild(selectAllCb);
    thCheck.appendChild(selectAllWrapper);
    headerRow.appendChild(thCheck);
    allColumns.forEach(c => {
        const th = document.createElement('th');
        th.className = 'text-nowrap';
        th.textContent = c;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);
    const tbody = document.createElement('tbody');
    const rows = entries.map((entry, idx) => {
        const id = String(idx);
        const tr = document.createElement('tr');
        const cellValues = [];
        const tdCheck = document.createElement('td');
        const cbWrapper = document.createElement('div');
        cbWrapper.className = 'form-check';
        const cb = document.createElement('input');
        cb.type = 'checkbox';
        cb.className = 'form-check-input';
        cb.addEventListener('change', () => {
            if (cb.checked) {
                selectedIds.add(id);
                tr.classList.add('table-active');
            }
            else {
                selectedIds.delete(id);
                tr.classList.remove('table-active');
            }
            const visible = rows.filter(r => r.el.style.display !== 'none');
            selectAllCb.checked = visible.length > 0 && visible.every(r => r.cb.checked);
            selectAllCb.indeterminate = !selectAllCb.checked && visible.some(r => r.cb.checked);
            updateToolbarState();
        });
        cbWrapper.appendChild(cb);
        tdCheck.appendChild(cbWrapper);
        tr.appendChild(tdCheck);
        allColumns.forEach(col => {
            const val = entry[col];
            const td = document.createElement('td');
            if (val === null || val === undefined) {
                td.innerHTML = '<span class="text-muted">—</span>';
                cellValues.push('');
            }
            else {
                td.textContent = String(val);
                cellValues.push(String(val).toLowerCase());
            }
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
        return { el: tr, searchText: cellValues.join('\0'), cb, id, entry };
    });
    table.appendChild(tbody);
    tableWrapper.appendChild(table);
    contentEl.appendChild(tableWrapper);
    // Select-all header checkbox
    selectAllCb.addEventListener('change', () => {
        const visible = rows.filter(r => r.el.style.display !== 'none');
        visible.forEach(r => {
            r.cb.checked = selectAllCb.checked;
            if (selectAllCb.checked) {
                selectedIds.add(r.id);
                r.el.classList.add('table-active');
            }
            else {
                selectedIds.delete(r.id);
                r.el.classList.remove('table-active');
            }
        });
        updateToolbarState();
    });
    // Edit button
    editBtn.addEventListener('click', () => {
        if (selectedIds.size !== 1)
            return;
        const id = [...selectedIds][0];
        const rowInfo = rows.find(r => r.id === id);
        if (rowInfo)
            showEditEntityModal(entity, model, rowInfo.entry, editColumns, reloadEntries);
    });
    // Delete button
    deleteBtn.addEventListener('click', () => {
        const rowIds = [...selectedIds];
        showDeleteConfirmModal(rowIds.length, async () => {
            for (const rowId of rowIds) {
                const rowInfo = rows.find(r => r.id === rowId);
                if (rowInfo) {
                    const entityId = extractEntityId(rowInfo.entry, entity.key?.name, entity.key?.type);
                    await deleteEntityEntry(model.name, entity.pluralName, entityId);
                }
            }
            await reloadEntries();
        });
    });
    // Search
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            const term = searchInput.value.toLowerCase().trim();
            rows.forEach(r => {
                r.el.style.display = (!term || r.searchText.includes(term)) ? '' : 'none';
            });
            const visible = rows.filter(r => r.el.style.display !== 'none');
            selectAllCb.checked = visible.length > 0 && visible.every(r => r.cb.checked);
            selectAllCb.indeterminate = !selectAllCb.checked && visible.some(r => r.cb.checked);
        });
    }
}
(async function () {
    logger.info("BusinessObjectsEditor: onFormLoad");
    await loadBootstrap();
    const { sidebar, content } = buildUI();
    try {
        const models = await fetchModels();
        renderModels(sidebar, content, models);
    }
    catch (err) {
        logger.error(`Fehler beim Laden der Modelle: ${err}`);
    }
})();

})();

window.MyFormBundle = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=formBundle.js.map