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


/***/ },

/***/ "../../helper/utils/tableExport.ts"
/*!*****************************************!*\
  !*** ../../helper/utils/tableExport.ts ***!
  \*****************************************/
(__unused_webpack_module, exports) {


/**
 * Export einer einfachen Tabelle (Kopfzeile + Zeilen) als CSV oder Excel
 * (.xlsx) direkt im Browser - ohne externe Bibliothek. Eine .xlsx-Datei ist
 * ein ZIP-Archiv aus wenigen XML-Dateien; hier wird es unkomprimiert
 * ("stored") erzeugt, was Excel/LibreOffice problemlos öffnen.
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.toCsv = toCsv;
exports.toXlsx = toXlsx;
exports.downloadBlob = downloadBlob;
// ---------------------------------------------------------------- CSV
/**
 * CSV im von deutschem Excel erwarteten Format: Semikolon als Trennzeichen,
 * CRLF als Zeilenende und UTF-8-BOM, damit Umlaute korrekt erkannt werden.
 */
function toCsv(table, separator = ";") {
    const escapeCell = (cell) => {
        const text = cell === null || cell === undefined ? "" : String(cell);
        return /["\r\n]/.test(text) || text.includes(separator)
            ? `"${text.replace(/"/g, '""')}"`
            : text;
    };
    const lines = [table.headers, ...table.rows].map((row) => row.map(escapeCell).join(separator));
    return new Blob(["﻿" + lines.join("\r\n")], { type: "text/csv;charset=utf-8" });
}
// ---------------------------------------------------------------- XLSX
function escapeXml(value) {
    return value
        // In XML 1.0 unzulässige Steuerzeichen entfernen, sonst meldet Excel eine beschädigte Datei.
        .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}
function columnName(index) {
    let name = "";
    for (let n = index + 1; n > 0; n = Math.floor((n - 1) / 26)) {
        name = String.fromCharCode(65 + ((n - 1) % 26)) + name;
    }
    return name;
}
function xlsxCell(cell, ref, style) {
    const s = style ? ` s="${style}"` : "";
    if (typeof cell === "number" && Number.isFinite(cell)) {
        return `<c r="${ref}"${s}><v>${cell}</v></c>`;
    }
    if (typeof cell === "boolean") {
        return `<c r="${ref}"${s} t="b"><v>${cell ? 1 : 0}</v></c>`;
    }
    const text = cell === null || cell === undefined ? "" : String(cell);
    return `<c r="${ref}"${s} t="inlineStr"><is><t xml:space="preserve">${escapeXml(text)}</t></is></c>`;
}
function sheetXml(table) {
    const allRows = [table.headers, ...table.rows];
    const columnCount = Math.max(1, ...allRows.map((row) => row.length));
    const lastRef = `${columnName(columnCount - 1)}${allRows.length}`;
    // Spaltenbreite grob nach längstem Inhalt (in Zeichen), begrenzt auf 10..60.
    const cols = Array.from({ length: columnCount }, (_, c) => {
        const longest = Math.max(...allRows.map((row) => String(row[c] ?? "").length));
        const width = Math.min(60, Math.max(10, longest + 2));
        return `<col min="${c + 1}" max="${c + 1}" width="${width}" customWidth="1"/>`;
    }).join("");
    const rowsXml = allRows
        .map((row, r) => {
        const cells = row.map((cell, c) => xlsxCell(cell, `${columnName(c)}${r + 1}`, r === 0 ? 1 : 0)).join("");
        return `<row r="${r + 1}">${cells}</row>`;
    })
        .join("");
    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
<sheetViews><sheetView workbookViewId="0"><pane ySplit="1" topLeftCell="A2" activePane="bottomLeft" state="frozen"/></sheetView></sheetViews>
<cols>${cols}</cols>
<sheetData>${rowsXml}</sheetData>
<autoFilter ref="A1:${lastRef}"/>
</worksheet>`;
}
function xlsxFiles(table, sheetName) {
    // Excel erlaubt max. 31 Zeichen und keine der Zeichen []:*?/\ im Blattnamen.
    const safeSheetName = escapeXml(sheetName.replace(/[\[\]:*?\/\\]/g, " ").slice(0, 31) || "Tabelle1");
    return [
        {
            name: "[Content_Types].xml",
            content: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
<Default Extension="xml" ContentType="application/xml"/>
<Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>
<Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>
<Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>
</Types>`,
        },
        {
            name: "_rels/.rels",
            content: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>
</Relationships>`,
        },
        {
            name: "xl/workbook.xml",
            content: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
<sheets><sheet name="${safeSheetName}" sheetId="1" r:id="rId1"/></sheets>
<definedNames><definedName name="_xlnm._FilterDatabase" localSheetId="0" hidden="1">'${safeSheetName.replace(/'/g, "''")}'!$A$1:$${columnName(Math.max(1, table.headers.length) - 1)}$${table.rows.length + 1}</definedName></definedNames>
</workbook>`,
        },
        {
            name: "xl/_rels/workbook.xml.rels",
            content: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/>
<Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
</Relationships>`,
        },
        {
            // Stil 0 = Standard, Stil 1 = fett mit grauem Hintergrund (Kopfzeile).
            name: "xl/styles.xml",
            content: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
<fonts count="2"><font><sz val="11"/><name val="Calibri"/></font><font><b/><sz val="11"/><name val="Calibri"/></font></fonts>
<fills count="3"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill><fill><patternFill patternType="solid"><fgColor rgb="FFE9ECEF"/><bgColor indexed="64"/></patternFill></fill></fills>
<borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders>
<cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>
<cellXfs count="2"><xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/><xf numFmtId="0" fontId="1" fillId="2" borderId="0" xfId="0" applyFont="1" applyFill="1"/></cellXfs>
<cellStyles count="1"><cellStyle name="Standard" xfId="0" builtinId="0"/></cellStyles>
</styleSheet>`,
        },
        { name: "xl/worksheets/sheet1.xml", content: sheetXml(table) },
    ];
}
const CRC_TABLE = (() => {
    const table = new Uint32Array(256);
    for (let n = 0; n < 256; n++) {
        let c = n;
        for (let k = 0; k < 8; k++) {
            c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
        }
        table[n] = c >>> 0;
    }
    return table;
})();
function crc32(data) {
    let crc = 0xffffffff;
    for (let i = 0; i < data.length; i++) {
        crc = CRC_TABLE[(crc ^ data[i]) & 0xff] ^ (crc >>> 8);
    }
    return (crc ^ 0xffffffff) >>> 0;
}
// Minimales ZIP ohne Kompression (Methode 0 "stored").
function createZip(files) {
    const encoder = new TextEncoder();
    const localParts = [];
    const centralParts = [];
    let offset = 0;
    for (const file of files) {
        const name = encoder.encode(file.name);
        const data = encoder.encode(file.content);
        const crc = crc32(data);
        const local = new Uint8Array(30 + name.length);
        const lv = new DataView(local.buffer);
        lv.setUint32(0, 0x04034b50, true); // Local file header signature
        lv.setUint16(4, 20, true); // Version needed
        lv.setUint16(6, 0x0800, true); // Flags: Dateinamen in UTF-8
        lv.setUint16(8, 0, true); // Methode: stored
        lv.setUint16(10, 0, true); // Uhrzeit
        lv.setUint16(12, 0x21, true); // Datum 01.01.1980
        lv.setUint32(14, crc, true);
        lv.setUint32(18, data.length, true); // Komprimierte Größe
        lv.setUint32(22, data.length, true); // Originalgröße
        lv.setUint16(26, name.length, true);
        lv.setUint16(28, 0, true); // Extra-Feld
        local.set(name, 30);
        const central = new Uint8Array(46 + name.length);
        const cv = new DataView(central.buffer);
        cv.setUint32(0, 0x02014b50, true); // Central directory signature
        cv.setUint16(4, 20, true); // Version made by
        cv.setUint16(6, 20, true); // Version needed
        cv.setUint16(8, 0x0800, true);
        cv.setUint16(10, 0, true);
        cv.setUint16(12, 0, true);
        cv.setUint16(14, 0x21, true);
        cv.setUint32(16, crc, true);
        cv.setUint32(20, data.length, true);
        cv.setUint32(24, data.length, true);
        cv.setUint16(28, name.length, true);
        cv.setUint32(42, offset, true); // Offset des Local Headers
        central.set(name, 46);
        localParts.push(local, data);
        centralParts.push(central);
        offset += local.length + data.length;
    }
    const centralSize = centralParts.reduce((sum, part) => sum + part.length, 0);
    const end = new Uint8Array(22);
    const ev = new DataView(end.buffer);
    ev.setUint32(0, 0x06054b50, true); // End of central directory signature
    ev.setUint16(8, files.length, true);
    ev.setUint16(10, files.length, true);
    ev.setUint32(12, centralSize, true);
    ev.setUint32(16, offset, true);
    const parts = [...localParts, ...centralParts, end];
    const zip = new Uint8Array(parts.reduce((sum, part) => sum + part.length, 0));
    let position = 0;
    for (const part of parts) {
        zip.set(part, position);
        position += part.length;
    }
    return zip;
}
/** Excel-Datei (.xlsx) mit einem Blatt, fetter Kopfzeile, fixierter erster Zeile und Autofilter. */
function toXlsx(table, sheetName = "Tabelle1") {
    // .buffer statt des Uint8Array selbst: neuere TS-DOM-Typen lassen
    // Uint8Array<ArrayBufferLike> nicht als BlobPart zu (der Puffer ist exakt so groß wie das ZIP).
    return new Blob([createZip(xlsxFiles(table, sheetName)).buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
}
// ---------------------------------------------------------------- Download
/** Startet im Browser den Download eines Blobs unter dem angegebenen Dateinamen. */
function downloadBlob(blob, fileName) {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
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
const tableExport_1 = __webpack_require__(/*! ../../../../helper/utils/tableExport */ "../../helper/utils/tableExport.ts");
/**
 * Formular-Gegenstück zum User-Lizenz-Zähler-Script (src/scripts/script.ts,
 * siehe dessen Kommentar für die eigentliche Zähl-Logik) - "type": "combined"
 * in toolbox.meta.json sorgt dafür, dass die Toolbox dieses Formular UND das
 * Script als EIN Eintrag gemeinsam anlegt/aktualisiert (siehe
 * rolloutParts in projects/Toolbox/src/forms/form.ts).
 *
 * Das Feld-Layout (nur die Content-Komponente "result") liegt als Code in
 * src/forms/form.json und wird von der Toolbox bei jedem Anlegen/
 * Aktualisieren mit ausgerollt - im Process Studio Formular-Editor muss nichts
 * angelegt werden (Änderungen dort werden beim nächsten Update überschrieben).
 * Die Zählung startet direkt beim Laden des Formulars, das Script liefert ALLE
 * Benutzer als Daten (JSON, mit Kennzeichen technisch/@gws.ms/bezahlt), die
 * Darstellung inkl. Filter passiert hier.
 *
 * VERSION_COUNTER unten NICHT umbenennen, der Name ist projektübergreifend
 * fest "VERSION_COUNTER" (siehe generateTargetForms.js) - muss bei einem
 * "combined"-Tool synchron zum VERSION_COUNTER in src/scripts/script.ts
 * bleiben; .github/workflows/publish-bundles.yml erhöht bei jedem Publish
 * automatisch BEIDE Vorkommen gemeinsam.
 */
const VERSION_COUNTER = 10;
const logger = (0, logger_1.initLogger)(logger_1.LogLevel.INFO);
// Muss exakt dem Script-Namen in toolbox.meta.json ("scripts[].name") entsprechen - so
// findet die Toolbox das zugehörige Script anhand seines eindeutigen Namens
// (siehe ensureTargetScriptUpToDate/getAllScripts, Scripts vergeben ihre GUID
// serverseitig, es gibt keine feste Id wie bei Formularen).
const SCRIPT_NAME = "User-Lizenz-Zähler";
// Komponenten-Key aus src/forms/form.json.
const resultKey = "result";
// Zuletzt angezeigte (sortierte) Benutzer - Index = data-index der
// Tabellenzeile, damit der Export genau die aktuell sichtbaren Zeilen nimmt.
let displayedUsers = [];
// Werte des Filter-Selects, jeweils mit dem data-Attribut der Tabellenzeile,
// das für die Kategorie "1" sein muss (leer = kein Kategorie-Filter).
const CATEGORY_FILTERS = [
    { value: "all", label: "Alle Benutzer", attribute: "" },
    { value: "paid", label: "Bezahlte Benutzer", attribute: "paid" },
    { value: "technical", label: "API-Benutzer", attribute: "technical" },
    { value: "gws", label: "Administrative Benutzer", attribute: "gws" },
];
// Gleiche Optik wie die Toolbox (projects/Toolbox/src/forms/form.ts,
// toolboxStyles): Karte mit grauer Kopfzeile, Bootstrap-Tabelle darunter.
const styles = `
<style>
  .ulc-section { border: 1px solid #dee2e6; border-radius: 6px; background: #fff; }
  .ulc-header { display: flex; justify-content: space-between; align-items: center; gap: 12px; flex-wrap: wrap; padding: 10px 12px; border-bottom: 1px solid #dee2e6; background: #f8f9fa; border-radius: 6px 6px 0 0; }
  .ulc-title { font-weight: 600; font-size: 1.05em; }
  .ulc-stats { display: flex; gap: 6px; flex-wrap: wrap; margin-top: 6px; }
  .ulc-stat { font-size: 0.8em; font-weight: 600; padding: 2px 9px; border-radius: 10px; background: #e9ecef; color: #495057; }
  .ulc-stat strong { font-weight: 700; }
  .ulc-stat-paid { background: #d1e7dd; color: #0f5132; font-size: 0.9em; }
  .ulc-controls { display: flex; gap: 6px; flex-wrap: wrap; }
  .ulc-category { width: auto; }
  .ulc-filter { max-width: 220px; }
  .ulc-export { white-space: nowrap; }
  .ulc-badge { display: inline-block; font-size: 0.75em; font-weight: 600; padding: 2px 7px; border-radius: 10px; margin-right: 4px; white-space: nowrap; }
  .ulc-badge-paid { background: #d1e7dd; color: #0f5132; }
  .ulc-badge-technical { background: #e2e3e5; color: #41464b; }
  .ulc-badge-gws { background: #fff3cd; color: #997404; }
  .ulc-body { padding: 12px; }
  .ulc-table-wrap { max-height: 65vh; overflow: auto; border: 1px solid #dee2e6; border-radius: 6px; }
  .ulc-table { margin: 0; font-size: 0.9em; }
  .ulc-table thead th { position: sticky; top: 0; background: #f8f9fa; border-bottom: 1px solid #dee2e6; white-space: nowrap; }
  .ulc-table td { vertical-align: middle; }
  .ulc-nr { color: #6c757d; width: 3em; text-align: right; }
  .ulc-name { font-weight: 600; }
  .ulc-id { color: #6c757d; font-family: monospace; font-size: 0.85em; }
  .ulc-muted { color: #adb5bd; font-style: italic; }
  .ulc-footer { color: #6c757d; font-size: 0.85em; margin-top: 8px; }
  .ulc-loading { display: flex; align-items: center; gap: 10px; color: #6c757d; padding: 12px; }
  .ulc-error { color: #842029; background: #f8d7da; border: 1px solid #f5c2c7; border-radius: 6px; padding: 10px 12px; }
</style>`;
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
// Aktueller Inhalt und die Wurzel, in die er zuletzt gerendert wurde.
let currentContent = "";
let mountedRoot;
// Wie in der Toolbox (projects/Toolbox/src/forms/form.ts, getContentHost):
// direkt in das Kind-Element ref="html" der HTML-Element-Komponente rendern
// statt component.content + redraw() - so bleiben Formio's Hülle erhalten und
// Suchfeld/Select/Buttons bekommen ihre Listener an genau diesem Inhalt.
function getContentHost(form) {
    const component = form.getComponent?.(resultKey);
    if (!component)
        return undefined;
    return component.refs?.html ?? component.element?.querySelector?.('[ref="html"]') ?? component.element ?? undefined;
}
function mountContent(form) {
    const host = getContentHost(form);
    if (!host) {
        logger.warn(`Komponente "${resultKey}" nicht im Formular gefunden (oder noch nicht gerendert).`);
        return;
    }
    host.innerHTML = `${styles}<div data-ulc-root>${currentContent}</div>`;
    mountedRoot = host.querySelector("[data-ulc-root]") ?? undefined;
    if (mountedRoot) {
        bindEvents(mountedRoot);
    }
}
function showResult(form, content) {
    currentContent = content;
    mountContent(form);
}
function renderLoading() {
    return `
  <div class="ulc-section">
    <div class="ulc-loading">
      <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
      Benutzer werden geladen…
    </div>
  </div>`;
}
function renderError(message) {
    return `<div class="ulc-error"><strong>Zählung fehlgeschlagen:</strong> ${escapeHtml(message)}</div>`;
}
function renderValue(value, className = "") {
    return value
        ? `<span class="${className}">${escapeHtml(value)}</span>`
        : `<span class="ulc-muted">–</span>`;
}
function renderTypeBadges(user) {
    const badges = [];
    if (user.paid) {
        badges.push(`<span class="ulc-badge ulc-badge-paid">Bezahlt</span>`);
    }
    if (user.technical) {
        badges.push(`<span class="ulc-badge ulc-badge-technical">API-Benutzer</span>`);
    }
    if (user.gwsDomain) {
        badges.push(`<span class="ulc-badge ulc-badge-gws">Administrativ</span>`);
    }
    return badges.join("");
}
function renderUserRow(user, index) {
    const email = user.email
        ? `<a href="mailto:${escapeHtml(user.email)}">${escapeHtml(user.email)}</a>`
        : renderValue("");
    // data-search: alles, wonach das Suchfeld filtern kann, in Kleinbuchstaben.
    // data-paid/-technical/-gws: für den Kategorie-Filter (siehe CATEGORY_FILTERS).
    const search = [user.fullName, user.userName, user.email, user.id].join(" ").toLowerCase();
    const flag = (value) => (value ? "1" : "0");
    return `
      <tr data-index="${index}" data-search="${escapeHtml(search)}" data-paid="${flag(user.paid)}" data-technical="${flag(user.technical)}" data-gws="${flag(user.gwsDomain)}">
        <td class="ulc-nr" data-ulc-nr>${index + 1}</td>
        <td>${renderValue(user.fullName, "ulc-name")}</td>
        <td>${renderValue(user.userName)}</td>
        <td>${email}</td>
        <td>${renderTypeBadges(user)}</td>
        <td>${renderValue(user.id, "ulc-id")}</td>
      </tr>`;
}
function renderStat(label, value, className = "") {
    return `<span class="ulc-stat ${className}">${label}: <strong>${value}</strong></span>`;
}
function renderResult(result) {
    // Bezahlte Benutzer zuerst, innerhalb davon nach Name sortiert.
    const users = [...result.users].sort((a, b) => Number(b.paid) - Number(a.paid) ||
        (a.fullName || a.userName).localeCompare(b.fullName || b.userName, "de"));
    displayedUsers = users;
    const rows = users.length
        ? users.map(renderUserRow).join("")
        : `<tr><td colspan="6" class="ulc-muted">Keine Benutzer gefunden.</td></tr>`;
    const options = CATEGORY_FILTERS
        .map((filter) => `<option value="${filter.value}">${filter.label}</option>`)
        .join("");
    const countedAt = new Date().toLocaleString("de-DE");
    return `
  <div class="ulc-section">
    <div class="ulc-header">
      <div>
        <span class="ulc-title">Benutzer</span>
        <div class="ulc-stats">
          ${renderStat("Bezahlt", result.paid, "ulc-stat-paid")}
          ${renderStat("API-Benutzer", result.technical)}
          ${renderStat("Administrativ", result.gwsDomain)}
          ${renderStat("Gesamt", result.total)}
        </div>
        <div class="ulc-hint">Bezahlt = weder API-Benutzer noch administrativer Benutzer (@gws.ms)</div>
      </div>
      <div class="ulc-controls">
        <select class="form-control form-control-sm ulc-category" aria-label="Benutzer filtern">${options}</select>
        <input type="search" class="form-control form-control-sm ulc-filter" placeholder="Suchen…" aria-label="Benutzer suchen">
        <button type="button" class="btn btn-sm btn-outline-secondary ulc-export" data-export="xlsx" title="Angezeigte Benutzer als Excel-Datei exportieren">Excel</button>
        <button type="button" class="btn btn-sm btn-outline-secondary ulc-export" data-export="csv" title="Angezeigte Benutzer als CSV-Datei exportieren">CSV</button>
      </div>
    </div>
    <div class="ulc-body">
      <div class="ulc-table-wrap">
        <table class="table table-sm table-hover table-striped ulc-table">
          <thead>
            <tr><th class="ulc-nr">Nr.</th><th>Name</th><th>Benutzername</th><th>E-Mail</th><th>Typ</th><th>ID</th></tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
      <div class="ulc-footer"><span data-ulc-visible>${users.length} von ${users.length} Benutzern angezeigt</span> · Stand ${escapeHtml(countedAt)}</div>
    </div>
  </div>`;
}
// Blendet Zeilen nach Kategorie (Select) UND Suchbegriff aus und nummeriert
// die sichtbaren Zeilen neu durch.
function applyFilters(section) {
    const category = section.querySelector(".ulc-category")?.value ?? "all";
    const attribute = CATEGORY_FILTERS.find((filter) => filter.value === category)?.attribute ?? "";
    const term = section.querySelector(".ulc-filter")?.value.trim().toLowerCase() ?? "";
    const rows = Array.from(section.querySelectorAll("tr[data-search]"));
    let visible = 0;
    for (const row of rows) {
        const matchesCategory = !attribute || row.dataset[attribute] === "1";
        const matchesTerm = !term || (row.dataset.search ?? "").includes(term);
        const match = matchesCategory && matchesTerm;
        row.style.display = match ? "" : "none";
        if (match) {
            visible++;
            const nr = row.querySelector("[data-ulc-nr]");
            if (nr) {
                nr.textContent = String(visible);
            }
        }
    }
    const counter = section.querySelector("[data-ulc-visible]");
    if (counter) {
        counter.textContent = `${visible} von ${rows.length} Benutzern angezeigt`;
    }
}
function yesNo(value) {
    return value ? "Ja" : "Nein";
}
// Nimmt genau die aktuell sichtbaren Zeilen (Kategorie-Filter + Suche) in der
// angezeigten Reihenfolge und Nummerierung.
function buildExportTable(section) {
    const visibleRows = Array.from(section.querySelectorAll("tr[data-index]"))
        .filter((row) => row.style.display !== "none");
    return {
        headers: ["Nr.", "Name", "Benutzername", "E-Mail", "Bezahlt", "API-Benutzer", "Administrativ", "ID"],
        rows: visibleRows
            .map((row) => displayedUsers[Number(row.dataset.index)])
            .filter((user) => !!user)
            .map((user, index) => [
            index + 1,
            user.fullName,
            user.userName,
            user.email,
            yesNo(user.paid),
            yesNo(user.technical),
            yesNo(user.gwsDomain),
            user.id,
        ]),
    };
}
function exportUsers(section, format) {
    const table = buildExportTable(section);
    const category = section.querySelector(".ulc-category")?.value ?? "all";
    const categoryLabel = CATEGORY_FILTERS.find((filter) => filter.value === category)?.label ?? "Benutzer";
    const date = new Date().toISOString().slice(0, 10);
    const baseName = `${categoryLabel.replace(/[^\wäöüÄÖÜß-]+/g, "_")}_${date}`;
    if (format === "csv") {
        (0, tableExport_1.downloadBlob)((0, tableExport_1.toCsv)(table), `${baseName}.csv`);
    }
    else {
        (0, tableExport_1.downloadBlob)((0, tableExport_1.toXlsx)(table, categoryLabel), `${baseName}.xlsx`);
    }
    logger.debug(`${table.rows.length} Benutzer als ${format.toUpperCase()} exportiert.`);
}
// Listener direkt an der eigenen Wurzel (wird bei jedem mountContent neu
// erzeugt, daher keine doppelten Listener). Delegation innerhalb der Wurzel,
// weil Tabelle/Controls beim Wechsel Laden -> Ergebnis ausgetauscht werden.
function bindEvents(root) {
    const onFilterChange = (event) => {
        const target = event.target;
        if (!(target instanceof HTMLElement) || !target.matches(".ulc-filter, .ulc-category")) {
            return;
        }
        const section = target.closest(".ulc-section");
        if (section) {
            applyFilters(section);
        }
    };
    root.addEventListener("input", onFilterChange);
    root.addEventListener("change", onFilterChange);
    root.addEventListener("keyup", onFilterChange);
    // Enter im Suchfeld darf das Formular nicht absenden.
    root.addEventListener("keydown", (event) => {
        if (event.key === "Enter" && event.target instanceof HTMLInputElement && event.target.matches(".ulc-filter")) {
            event.preventDefault();
        }
    });
    root.addEventListener("click", (event) => {
        const target = event.target;
        const button = target instanceof HTMLElement ? target.closest("button[data-export]") : null;
        const section = button?.closest(".ulc-section");
        if (!button || !section) {
            return;
        }
        exportUsers(section, button.dataset.export === "csv" ? "csv" : "xlsx");
    });
}
/**
 * Sucht die Script-Id per Name (siehe SCRIPT_NAME), ruft sie per
 * callScriptEndpoint auf und stellt das Ergebnis in der Content-Komponente
 * "result" dar - dieselbe Browser-Session (window.location.origin) wie bei
 * allen anderen dforms/Scripting-Aufrufen der Toolbox-Familie, ein API-Key
 * ist dafür nicht nötig.
 */
async function runUserLicenceCounter(form) {
    showResult(form, renderLoading());
    try {
        const baseUri = window.location.origin;
        const allScripts = await (0, getAllScripts_1.getAllScripts)(baseUri, "");
        const script = allScripts.body.find((s) => s.name === SCRIPT_NAME);
        if (!script?.id) {
            throw new Error(`Script "${SCRIPT_NAME}" wurde nicht gefunden - wurde es bereits über die Toolbox angelegt?`);
        }
        const response = await (0, callScriptEndpoint_1.callScriptEndpoint)(baseUri, script.id, "POST", { "Content-Type": "application/json" }, {});
        if (typeof response.body === "string" || !Array.isArray(response.body?.users) || typeof response.body.paid !== "number") {
            // Ältere Script-Version (fertiges HTML bzw. noch ohne Typ-Kennzeichen) - Formular
            // und Script sollten über die Toolbox gemeinsam aktualisiert werden.
            throw new Error(`Unerwartete Antwort von Script "${SCRIPT_NAME}" - bitte das Script über die Toolbox aktualisieren.`);
        }
        showResult(form, renderResult(response.body));
    }
    catch (error) {
        logger.error(`Fehler beim Ausführen von "${SCRIPT_NAME}": ${getErrorMessage(error)}`);
        showResult(form, renderError(getErrorMessage(error)));
    }
}
window.formInit = function (form, data) {
    logger.debug("User-Lizenz-Zähler-Formular initialisiert.");
    // Zeichnet Formio die Komponente neu (oder war sie beim Init noch nicht
    // gerendert), ist unser Inhalt weg - dann einfach erneut einhängen.
    form.on?.("render", () => {
        if (currentContent && !mountedRoot?.isConnected) {
            mountContent(form);
        }
    });
    runUserLicenceCounter(form);
};

})();

window.UserLicenceCounterFormBundle = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=formBundle.js.map