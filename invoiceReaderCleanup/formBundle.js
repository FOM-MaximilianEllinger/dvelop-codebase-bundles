/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "../../helper/classcon-documentreader/deleteDocumentBadge.ts"
/*!*******************************************************************!*\
  !*** ../../helper/classcon-documentreader/deleteDocumentBadge.ts ***!
  \*******************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.deleteDocumentBadge = deleteDocumentBadge;
const performHttpRequest_1 = __webpack_require__(/*! ../performHttpRequest/performHttpRequest */ "../../helper/performHttpRequest/performHttpRequest.ts");
/**
 * Löscht einen Stapel im Rechnungsleser - analog zu
 * classconorderconfirmations/deleteOrderConfirmationBadge, aber mit der
 * processSequenceId des Stapels (beim Rechnungsleser eine GUID je
 * Verarbeitungsablauf statt eines festen Werts).
 *
 * @param baseUri - The base URI of the API endpoint.
 * @param token - Optional bearer token; ohne Token wird die Browser-Session genutzt.
 * @param subscriptionId - The ID of the subscription.
 * @param processSequenceId - batchTask.processSequenceId des Stapels.
 * @param taskId - The ID of the task (batch) to delete.
 */
async function deleteDocumentBadge(baseUri, token, subscriptionId, processSequenceId, taskId) {
    const url = `${baseUri}/classcon-documentreader/DocumentProcessing/DeleteItem`;
    const headers = {
        ...(token ? { "Authorization": `Bearer ${token}` } : {}),
        "Accept": "*/*",
        "Content-Type": "application/x-www-form-urlencoded",
    };
    const body = new URLSearchParams({
        subscriptionID: subscriptionId,
        processSequenceID: processSequenceId,
        taskID: taskId,
    }).toString();
    const options = {
        method: "POST",
        headers,
        body,
    };
    return await (0, performHttpRequest_1.performHttpRequest)(url, options);
}


/***/ },

/***/ "../../helper/classcon-documentreader/getDocumentBadges.ts"
/*!*****************************************************************!*\
  !*** ../../helper/classcon-documentreader/getDocumentBadges.ts ***!
  \*****************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getDocumentBadges = getDocumentBadges;
const performHttpRequest_1 = __webpack_require__(/*! ../performHttpRequest/performHttpRequest */ "../../helper/performHttpRequest/performHttpRequest.ts");
/**
 * Retrieves document badges for a given repository.
 *
 * Sends a GET request to the DocumentProcessing endpoint to fetch batch tasks related to invoices.
 *
 * @param baseUri - The base URI of the API.
 * @param token - The bearer token for authentication.
 * @returns A promise resolving to an {@link ApiResponse} containing {@link GetOrderConfirmationBadges}.
 */
async function getDocumentBadges(baseUri, token, subscriptionId) {
    const url = `${baseUri}/classcon-documentreader/DocumentProcessing/GetBatchTasksNew?id=${subscriptionId}`;
    const headers = {
        ...(token ? { "Authorization": `Bearer ${token}` } : {}),
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Accept-Language": "de-DE",
    };
    const options = {
        method: "GET",
        headers,
    };
    return await (0, performHttpRequest_1.performHttpRequest)(url, options);
}


/***/ },

/***/ "../../helper/classcon-documentreader/getFeatures.ts"
/*!***********************************************************!*\
  !*** ../../helper/classcon-documentreader/getFeatures.ts ***!
  \***********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getDocumentReaderFeatures = getDocumentReaderFeatures;
const performHttpRequest_1 = __webpack_require__(/*! ../performHttpRequest/performHttpRequest */ "../../helper/performHttpRequest/performHttpRequest.ts");
/**
 * Liefert die Features (Kacheln) des Rechnungslesers - analog zu
 * classconorderconfirmations/getFeatures. Die URL eines Features endet auf
 * die Subscription-ID.
 *
 * @param baseUri - The base URI of the API.
 * @param token - Optional bearer token; ohne Token wird die Browser-Session genutzt.
 */
async function getDocumentReaderFeatures(baseUri, token) {
    const url = `${baseUri}/classcon-documentreader/getFeatures`;
    const headers = {
        ...(token ? { "Authorization": `Bearer ${token}` } : {}),
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Accept-Language": "de-DE",
    };
    const options = {
        method: "GET",
        headers,
    };
    return await (0, performHttpRequest_1.performHttpRequest)(url, options);
}


/***/ },

/***/ "../../helper/classcon-documentreader/reClassifyDocumentItem.ts"
/*!**********************************************************************!*\
  !*** ../../helper/classcon-documentreader/reClassifyDocumentItem.ts ***!
  \**********************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.reClassifyDocumentItem = reClassifyDocumentItem;
const performHttpRequest_1 = __webpack_require__(/*! ../performHttpRequest/performHttpRequest */ "../../helper/performHttpRequest/performHttpRequest.ts");
/**
 * Klassifiziert einen Stapel im Rechnungsleser erneut - analog zu
 * classconorderconfirmations/ReClassifyItem.
 */
async function reClassifyDocumentItem(baseUri, params, token) {
    const url = `${baseUri}/classcon-documentreader/DocumentProcessing/ReClassifyItem`;
    const body = new URLSearchParams({
        subscriptionID: params.subscriptionID,
        processSequenceID: params.processSequenceID,
        destinationNode: params.destinationNode,
        taskID: params.taskID,
    }).toString();
    const headers = {
        ...(token ? { "Authorization": `Bearer ${token}` } : {}),
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    };
    const options = {
        method: "POST",
        headers,
        body,
    };
    return await (0, performHttpRequest_1.performHttpRequest)(url, options);
}


/***/ },

/***/ "../../helper/dforms/classconBatchCleanup.ts"
/*!***************************************************!*\
  !*** ../../helper/dforms/classconBatchCleanup.ts ***!
  \***************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.initClassconBatchCleanup = initClassconBatchCleanup;
exports.subscriptionIdFromFeatures = subscriptionIdFromFeatures;
const logger_1 = __webpack_require__(/*! ../utils/logger */ "../../helper/utils/logger.ts");
const resultKey = "result";
const styles = `
<style>
  .ccc-section { border: 1px solid #dee2e6; border-radius: 6px; background: #fff; }
  .ccc-header { display: flex; justify-content: space-between; align-items: flex-end; gap: 12px; flex-wrap: wrap; padding: 10px 12px; border-bottom: 1px solid #dee2e6; background: #f8f9fa; border-radius: 6px 6px 0 0; }
  .ccc-title { font-weight: 600; font-size: 1.05em; }
  .ccc-hint { color: #6c757d; font-size: 0.85em; margin-top: 4px; }
  .ccc-filters { display: flex; gap: 8px; flex-wrap: wrap; align-items: flex-end; }
  .ccc-field { display: flex; flex-direction: column; gap: 2px; }
  .ccc-field label { font-size: 0.75em; font-weight: 600; color: #495057; margin: 0; }
  .ccc-name { width: 220px; }
  .ccc-date { width: 150px; }
  .ccc-body { padding: 12px; }
  .ccc-table-wrap { max-height: 60vh; overflow: auto; border: 1px solid #dee2e6; border-radius: 6px; }
  .ccc-table { margin: 0; font-size: 0.9em; }
  .ccc-table thead th { position: sticky; top: 0; z-index: 1; background: #f8f9fa; border-bottom: 1px solid #dee2e6; white-space: nowrap; }
  .ccc-table td { vertical-align: middle; }
  .ccc-check { width: 2.5em; text-align: center; }
  .ccc-check input { width: 15px; height: 15px; cursor: pointer; }
  .ccc-num { text-align: right; white-space: nowrap; }
  .ccc-nowrap { white-space: nowrap; }
  .ccc-muted { color: #adb5bd; font-style: italic; }
  .ccc-footer { display: flex; justify-content: space-between; align-items: center; gap: 8px; flex-wrap: wrap; margin-top: 10px; }
  .ccc-status { color: #6c757d; font-size: 0.85em; }
  .ccc-actions { display: flex; gap: 6px; flex-wrap: nowrap; }
  .ccc-actions .btn { white-space: nowrap; }
  .ccc-loading { display: flex; align-items: center; gap: 10px; color: #6c757d; padding: 12px; }
  .ccc-error { color: #842029; background: #f8d7da; border: 1px solid #f5c2c7; border-radius: 6px; padding: 10px 12px; margin-bottom: 10px; }
</style>`;
const BULK_ACTIONS = {
    delete: {
        title: (n) => `${n} Stapel löschen?`,
        html: "Dieser Vorgang kann <strong>nicht</strong> rückgängig gemacht werden.",
        confirmText: "Löschen",
        color: "#dc3545",
        icon: "warning",
        progress: "Lösche",
        done: "gelöscht",
    },
    reclassify: {
        title: (n) => `${n} Stapel erneut klassifizieren?`,
        html: "",
        confirmText: "Klassifizieren",
        color: "#198754",
        icon: "question",
        progress: "Klassifiziere",
        done: "klassifiziert",
    },
};
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
        script.onerror = () => resolve(); // Fallback auf confirm/alert, siehe confirmAction
        document.head.appendChild(script);
    });
}
function hasSwal() {
    return typeof Swal !== "undefined";
}
function escapeHtml(value) {
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}
function getErrorMessage(error) {
    return error instanceof Error ? error.message : String(error);
}
function parseCreationTime(value) {
    if (!value)
        return undefined;
    const [datePart, timePart] = value.split(" ");
    const dateParts = (datePart ?? "").split(".").map(Number);
    if (dateParts.length !== 3)
        return undefined;
    const [dd, mm, yyyy] = dateParts;
    const [hh, min, ss] = (timePart ?? "0:0:0").split(":").map(Number);
    const date = new Date(yyyy, mm - 1, dd, hh || 0, min || 0, ss || 0);
    return isNaN(date.getTime()) ? undefined : date;
}
function formatCreationTime(value) {
    return parseCreationTime(value)?.toLocaleString("de-DE", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    }) ?? value ?? "";
}
// "YYYY-MM-DD" aus <input type="date"> als lokales Datum.
function parseInputDate(value, endOfDay) {
    if (!value)
        return undefined;
    const [y, m, d] = value.split("-").map(Number);
    return endOfDay ? new Date(y, m - 1, d, 23, 59, 59, 999) : new Date(y, m - 1, d);
}
async function confirmAction(title, html, confirmText, color, icon) {
    if (!hasSwal()) {
        return window.confirm(title);
    }
    const result = await Swal.fire({
        icon,
        title,
        html,
        showCancelButton: true,
        confirmButtonColor: color,
        confirmButtonText: confirmText,
        cancelButtonText: "Abbrechen",
    });
    return !!result.isConfirmed;
}
function showInfo(icon, title, html) {
    if (hasSwal()) {
        Swal.fire({ icon, title, html });
    }
    else {
        window.alert(`${title}\n${html.replace(/<[^>]+>/g, "")}`);
    }
}
/**
 * Startet die Oberfläche im Formular - aus window.formInit(form, data)
 * aufrufen. Lädt die Stapel sofort.
 */
function initClassconBatchCleanup(form, api) {
    const logger = (0, logger_1.getLogger)();
    let subscriptionId = "";
    let allBadges = [];
    let filteredBadges = [];
    // Markierte Stapel (taskId). Enthält nur sichtbare Stapel - beim Filtern
    // werden ausgeblendete Stapel abgewählt, damit nie etwas Unsichtbares
    // gelöscht wird.
    const selected = new Set();
    const filters = { name: "", from: "", to: "" };
    let loading = false;
    let busy = false;
    let loadError = "";
    let loadedAt = "";
    let mountedRoot;
    function getContentHost() {
        const component = form.getComponent?.(resultKey);
        if (!component)
            return undefined;
        return component.refs?.html ?? component.element?.querySelector?.('[ref="html"]') ?? component.element ?? undefined;
    }
    function renderShell() {
        return `
    <div class="ccc-section">
      <div class="ccc-header">
        <div>
          <span class="ccc-title">${escapeHtml(api.title)}</span>
          <div class="ccc-hint">Markierte Stapel können gelöscht oder erneut klassifiziert werden.</div>
        </div>
        <div class="ccc-filters">
          <div class="ccc-field">
            <label for="ccc-name">Stapelname</label>
            <input id="ccc-name" type="search" class="form-control form-control-sm ccc-name" data-ccc-filter="name" placeholder="Stapelname suchen…" value="${escapeHtml(filters.name)}">
          </div>
          <div class="ccc-field">
            <label for="ccc-from">Datum von</label>
            <input id="ccc-from" type="date" class="form-control form-control-sm ccc-date" data-ccc-filter="from" value="${escapeHtml(filters.from)}">
          </div>
          <div class="ccc-field">
            <label for="ccc-to">Datum bis</label>
            <input id="ccc-to" type="date" class="form-control form-control-sm ccc-date" data-ccc-filter="to" value="${escapeHtml(filters.to)}">
          </div>
          <button type="button" class="btn btn-sm btn-outline-secondary" data-ccc-action="reset">Filter zurücksetzen</button>
        </div>
      </div>
      <div class="ccc-body">
        <div data-ccc-message></div>
        <div class="ccc-table-wrap">
          <table class="table table-sm table-hover table-striped ccc-table">
            <thead>
              <tr>
                <th class="ccc-check"><input type="checkbox" data-ccc-select-all title="Alle angezeigten markieren / entmarkieren"></th>
                <th>Beschreibung</th>
                <th>Erstellt von</th>
                <th class="ccc-num">Dokumente</th>
                <th>Erstellungsdatum</th>
              </tr>
            </thead>
            <tbody data-ccc-rows></tbody>
          </table>
        </div>
        <div class="ccc-footer">
          <span class="ccc-status" data-ccc-status></span>
          <div class="ccc-actions">
            <button type="button" class="btn btn-sm btn-outline-secondary" data-ccc-action="refresh">Aktualisieren</button>
            <button type="button" class="btn btn-sm btn-success" data-ccc-action="reclassify">Erneut klassifizieren</button>
            <button type="button" class="btn btn-sm btn-danger" data-ccc-action="delete">Markierte löschen</button>
          </div>
        </div>
      </div>
    </div>`;
    }
    function renderRow(badge) {
        const taskId = badge.batchTask?.taskId ?? "";
        const cell = (value, className = "") => value !== undefined && value !== ""
            ? `<td class="${className}">${escapeHtml(String(value))}</td>`
            : `<td class="${className}"><span class="ccc-muted">–</span></td>`;
        return `
        <tr>
          <td class="ccc-check"><input type="checkbox" data-ccc-task="${escapeHtml(taskId)}" ${selected.has(taskId) ? "checked" : ""}></td>
          ${cell(badge.description)}
          ${cell(badge.creatorName || badge.ownerName)}
          ${cell(badge.batchTask?.documentCount, "ccc-num")}
          ${cell(formatCreationTime(badge.creationTime), "ccc-nowrap")}
        </tr>`;
    }
    // Aktualisiert Tabelle, Statuszeile und Buttons, ohne Filterfelder neu zu
    // zeichnen (sonst verliert das Suchfeld beim Tippen den Fokus).
    function refreshView() {
        const root = mountedRoot;
        if (!root?.isConnected)
            return;
        const rows = root.querySelector("[data-ccc-rows]");
        if (rows) {
            if (loading && allBadges.length === 0) {
                rows.innerHTML = `<tr><td colspan="5"><div class="ccc-loading"><span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>Stapel werden geladen…</div></td></tr>`;
            }
            else if (filteredBadges.length === 0) {
                rows.innerHTML = `<tr><td colspan="5" class="ccc-muted">Keine Einträge gefunden.</td></tr>`;
            }
            else {
                rows.innerHTML = filteredBadges.map(renderRow).join("");
            }
        }
        const message = root.querySelector("[data-ccc-message]");
        if (message) {
            message.innerHTML = loadError
                ? `<div class="ccc-error"><strong>Stapel konnten nicht geladen werden:</strong> ${escapeHtml(loadError)}</div>`
                : "";
        }
        const status = root.querySelector("[data-ccc-status]");
        if (status) {
            const total = allBadges.length;
            const shown = filteredBadges.length;
            const parts = [shown === total ? `${total} Einträge` : `${shown} von ${total} Einträgen (gefiltert)`];
            if (selected.size > 0)
                parts.push(`${selected.size} markiert`);
            if (loadedAt)
                parts.push(`Stand ${loadedAt}`);
            status.textContent = loading ? "Lade Daten…" : parts.join(" · ");
        }
        const selectAll = root.querySelector("[data-ccc-select-all]");
        if (selectAll) {
            const visibleSelected = filteredBadges.filter((b) => selected.has(b.batchTask?.taskId)).length;
            selectAll.checked = filteredBadges.length > 0 && visibleSelected === filteredBadges.length;
            selectAll.indeterminate = visibleSelected > 0 && visibleSelected < filteredBadges.length;
        }
        root.querySelectorAll("button[data-ccc-action]").forEach((button) => {
            const action = button.dataset.cccAction;
            button.disabled = busy || loading || ((action === "delete" || action === "reclassify") && selected.size === 0);
        });
    }
    function applyFilters() {
        const nameFilter = filters.name.trim().toLowerCase();
        const from = parseInputDate(filters.from, false);
        const to = parseInputDate(filters.to, true);
        filteredBadges = allBadges.filter((badge) => {
            if (nameFilter && !(badge.description ?? "").toLowerCase().includes(nameFilter))
                return false;
            if (from || to) {
                const created = parseCreationTime(badge.creationTime);
                if (!created)
                    return false;
                if (from && created < from)
                    return false;
                if (to && created > to)
                    return false;
            }
            return true;
        });
        const visible = new Set(filteredBadges.map((b) => b.batchTask?.taskId));
        for (const taskId of [...selected]) {
            if (!visible.has(taskId))
                selected.delete(taskId);
        }
        refreshView();
    }
    function mountContent() {
        const host = getContentHost();
        if (!host) {
            logger.warn(`Komponente "${resultKey}" nicht im Formular gefunden (oder noch nicht gerendert).`);
            return;
        }
        host.innerHTML = `${styles}<div data-ccc-root>${renderShell()}</div>`;
        mountedRoot = host.querySelector("[data-ccc-root]") ?? undefined;
        if (mountedRoot) {
            bindEvents(mountedRoot);
            refreshView();
        }
    }
    // Listener direkt an den Elementen bzw. an tbody (Zeilen werden neu
    // erzeugt). Bewusst ohne "instanceof HTMLElement": dforms führt das Bundle
    // ggf. in einem anderen Fenster-Kontext aus, dann ist instanceof immer false.
    function bindEvents(root) {
        root.querySelectorAll("input[data-ccc-filter]").forEach((input) => {
            const key = input.dataset.cccFilter;
            const onChange = () => {
                if (filters[key] === input.value)
                    return;
                filters[key] = input.value;
                applyFilters();
            };
            input.addEventListener("input", onChange);
            input.addEventListener("change", onChange);
            input.addEventListener("keyup", onChange);
            // Enter darf das Formular nicht absenden.
            input.addEventListener("keydown", (event) => {
                if (event.key === "Enter")
                    event.preventDefault();
            });
        });
        root.querySelector("[data-ccc-rows]")?.addEventListener("change", (event) => {
            const checkbox = event.target;
            const taskId = checkbox?.dataset?.cccTask;
            if (!checkbox || !taskId)
                return;
            if (checkbox.checked)
                selected.add(taskId);
            else
                selected.delete(taskId);
            refreshView();
        });
        const selectAll = root.querySelector("[data-ccc-select-all]");
        selectAll?.addEventListener("change", () => {
            for (const badge of filteredBadges) {
                const taskId = badge.batchTask?.taskId;
                if (!taskId)
                    continue;
                if (selectAll.checked)
                    selected.add(taskId);
                else
                    selected.delete(taskId);
            }
            refreshView();
        });
        root.querySelectorAll("button[data-ccc-action]").forEach((button) => {
            button.addEventListener("click", () => {
                switch (button.dataset.cccAction) {
                    case "reset":
                        filters.name = filters.from = filters.to = "";
                        root.querySelectorAll("input[data-ccc-filter]").forEach((input) => (input.value = ""));
                        applyFilters();
                        return;
                    case "refresh":
                        void loadBadges();
                        return;
                    case "reclassify":
                        void runBulkAction("reclassify");
                        return;
                    case "delete":
                        void runBulkAction("delete");
                        return;
                }
            });
        });
    }
    async function runBulkAction(kind) {
        const config = BULK_ACTIONS[kind];
        // Nur markierte UND angezeigte Stapel, in angezeigter Reihenfolge.
        const badges = filteredBadges.filter((b) => selected.has(b.batchTask?.taskId));
        if (badges.length === 0) {
            showInfo("info", "Keine Auswahl", "Bitte markieren Sie mindestens einen Stapel.");
            return;
        }
        if (!(await confirmAction(config.title(badges.length), config.html, config.confirmText, config.color, config.icon))) {
            return;
        }
        busy = true;
        refreshView();
        if (hasSwal()) {
            Swal.fire({
                title: `${config.progress} Stapel…`,
                html: `${config.progress} <b>1</b> von <b>${badges.length}</b>`,
                allowOutsideClick: false,
                allowEscapeKey: false,
                showConfirmButton: false,
                didOpen: () => Swal.showLoading(),
            });
        }
        const succeeded = new Set();
        let errorCount = 0;
        for (const [i, badge] of badges.entries()) {
            if (hasSwal()) {
                Swal.update({ html: `${config.progress} <b>${i + 1}</b> von <b>${badges.length}</b>` });
            }
            try {
                if (kind === "delete") {
                    await api.deleteBadge(subscriptionId, badge);
                }
                else {
                    await api.reClassifyBadge(badge);
                }
                succeeded.add(badge.batchTask.taskId);
            }
            catch (error) {
                logger.error(`Stapel ${badge.batchTask.taskId} konnte nicht ${config.done} werden: ${getErrorMessage(error)}`);
                errorCount++;
            }
        }
        if (kind === "delete") {
            allBadges = allBadges.filter((b) => !succeeded.has(b.batchTask?.taskId));
        }
        succeeded.forEach((taskId) => selected.delete(taskId));
        busy = false;
        applyFilters();
        if (errorCount === 0) {
            showInfo("success", "Fertig", `${succeeded.size} Stapel erfolgreich ${config.done}.`);
        }
        else {
            showInfo("warning", `Teilweise ${config.done}`, `<b>${succeeded.size}</b> ${config.done} &nbsp;·&nbsp; <b>${errorCount}</b> Fehler (Details in der Konsole)`);
        }
    }
    async function loadBadges() {
        loading = true;
        loadError = "";
        refreshView();
        try {
            if (!subscriptionId) {
                subscriptionId = await api.findSubscriptionId();
                if (!subscriptionId) {
                    throw new Error(`Subscription-ID des ${api.appName}s nicht gefunden.`);
                }
            }
            // Neueste Stapel zuerst.
            allBadges = [...(await api.loadBadges(subscriptionId))].sort((a, b) => (b.batchTask?.creationTimeStamp ?? 0) - (a.batchTask?.creationTimeStamp ?? 0));
            loadedAt = new Date().toLocaleString("de-DE");
        }
        catch (error) {
            logger.error(`Stapel konnten nicht geladen werden: ${getErrorMessage(error)}`);
            loadError = getErrorMessage(error);
        }
        finally {
            loading = false;
            applyFilters();
        }
    }
    mountContent();
    // Zeichnet Formio die Komponente neu (oder war sie beim Init noch nicht
    // gerendert), ist unser Inhalt weg - dann einfach erneut einhängen.
    form.on?.("render", () => {
        if (!mountedRoot?.isConnected) {
            mountContent();
        }
    });
    void loadSweetAlert();
    void loadBadges();
}
/** Subscription-ID aus den Features einer classcon-App (URL endet auf die ID). */
function subscriptionIdFromFeatures(features, appPath) {
    return features?.find((f) => f.url?.includes(appPath))?.url?.split("/").pop() ?? "";
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
const logger_1 = __webpack_require__(/*! ../../../../helper/utils/logger */ "../../helper/utils/logger.ts");
const getFeatures_1 = __webpack_require__(/*! ../../../../helper/classcon-documentreader/getFeatures */ "../../helper/classcon-documentreader/getFeatures.ts");
const getDocumentBadges_1 = __webpack_require__(/*! ../../../../helper/classcon-documentreader/getDocumentBadges */ "../../helper/classcon-documentreader/getDocumentBadges.ts");
const deleteDocumentBadge_1 = __webpack_require__(/*! ../../../../helper/classcon-documentreader/deleteDocumentBadge */ "../../helper/classcon-documentreader/deleteDocumentBadge.ts");
const reClassifyDocumentItem_1 = __webpack_require__(/*! ../../../../helper/classcon-documentreader/reClassifyDocumentItem */ "../../helper/classcon-documentreader/reClassifyDocumentItem.ts");
const classconBatchCleanup_1 = __webpack_require__(/*! ../../../../helper/dforms/classconBatchCleanup */ "../../helper/dforms/classconBatchCleanup.ts");
/**
 * Bereinigung Rechnungsleser: Gegenstück zur "Bereinigung
 * Auftragsbestätigungsleser" (projects/Toolbox_OrderConfirmationCleanup) für
 * den Rechnungsleser (classcon-documentreader) - listet dessen Stapel,
 * filterbar nach Name und Erstellungsdatum, und löscht bzw. klassifiziert
 * markierte Stapel erneut. Die Oberfläche liegt gemeinsam in
 * helper/dforms/classconBatchCleanup.ts, hier stehen nur die
 * App-spezifischen Aufrufe (Anmeldung über die Browser-Session).
 *
 * Das Feld-Layout (nur die Content-Komponente "result") liegt als Code in
 * src/forms/form.json und wird von der Toolbox bei jedem Anlegen/
 * Aktualisieren mit ausgerollt - im Process Studio Formular-Editor muss nichts
 * angelegt werden.
 *
 * VERSION_COUNTER unten NICHT umbenennen, der Name ist projektübergreifend
 * fest "VERSION_COUNTER" (siehe generateTargetForms.js) -
 * .github/workflows/publish-bundles.yml erhöht ihn bei jedem Publish
 * automatisch.
 */
const VERSION_COUNTER = 2;
const logger = (0, logger_1.initLogger)(logger_1.LogLevel.INFO);
const BASE_URI = window.location.origin;
window.formInit = function (form, data) {
    logger.debug("Bereinigung-Rechnungsleser-Formular initialisiert.");
    (0, classconBatchCleanup_1.initClassconBatchCleanup)(form, {
        title: "Stapel im Rechnungsleser",
        appName: "Rechnungsleser",
        findSubscriptionId: async () => {
            const features = await (0, getFeatures_1.getDocumentReaderFeatures)(BASE_URI, "");
            return (0, classconBatchCleanup_1.subscriptionIdFromFeatures)(features.body?.features, "classcon-documentreader");
        },
        loadBadges: async (subscriptionId) => (await (0, getDocumentBadges_1.getDocumentBadges)(BASE_URI, "", subscriptionId)).body?.tasksIndex ?? [],
        // Anders als beim Auftragsbestätigungsleser ist die processSequenceId
        // beim Rechnungsleser kein fester Wert, sondern die GUID des
        // Verarbeitungsablaufs - daher aus dem Stapel selbst.
        deleteBadge: async (subscriptionId, badge) => {
            await (0, deleteDocumentBadge_1.deleteDocumentBadge)(BASE_URI, "", subscriptionId, badge.batchTask.processSequenceId, badge.batchTask.taskId);
        },
        reClassifyBadge: async (badge) => {
            await (0, reClassifyDocumentItem_1.reClassifyDocumentItem)(BASE_URI, {
                subscriptionID: badge.batchTask.subscriptionId,
                processSequenceID: badge.batchTask.processSequenceId,
                destinationNode: badge.batchTask.processNodeId,
                taskID: badge.batchTask.taskId,
            });
        },
    });
};

})();

window.InvoiceReaderCleanupFormBundle = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=formBundle.js.map