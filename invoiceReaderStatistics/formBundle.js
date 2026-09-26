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
exports.getTenantName = getTenantName;
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
/**
 * Mandantenname für Dateinamen, abgeleitet aus der ersten Stelle des
 * Hostnamens, z.B. "ellinger.d-velop.cloud" -> "Ellinger".
 */
function getTenantName(hostname = window.location.hostname) {
    const label = hostname.split(".")[0] ?? "";
    return label ? label.charAt(0).toUpperCase() + label.slice(1) : "";
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
 * Formular-Gegenstück zum Script "Rechnungsleser-Auswertung"
 * (src/scripts/script.ts): ruft das Script (mit dessen API-Key) auf und zeigt,
 * wie viele Rechnungen der Rechnungsleser je Mandant und Monat verarbeitet
 * hat - mit Filter nach Mandant/Jahr und Export als CSV/Excel. "type":
 * "combined" in toolbox.meta.json: die Toolbox legt Formular UND Script als
 * EIN Eintrag gemeinsam an bzw. aktualisiert beide.
 *
 * Das Feld-Layout (nur die Content-Komponente "result") liegt als Code in
 * src/forms/form.json und wird von der Toolbox mit ausgerollt.
 *
 * VERSION_COUNTER unten NICHT umbenennen (siehe generateTargetForms.js) und
 * synchron zum VERSION_COUNTER in src/scripts/script.ts halten -
 * .github/workflows/publish-bundles.yml stempelt beim Publish in BEIDE Bundles
 * denselben nächsten Stand (der Wert hier ist nur ein Platzhalter).
 */
const VERSION_COUNTER = 2;
const logger = (0, logger_1.initLogger)(logger_1.LogLevel.INFO);
// Muss exakt dem Script-Namen in toolbox.meta.json ("scripts[].name") entsprechen.
const SCRIPT_NAME = "Rechnungsleser-Auswertung";
// Komponenten-Key aus src/forms/form.json.
const resultKey = "result";
// Monatsnamen der Datenbank (DATENAME liefert je nach SQL-Sprache Englisch
// oder Deutsch) -> Monatsnummer.
const MONTHS = {
    january: 1, february: 2, march: 3, april: 4, may: 5, june: 6,
    july: 7, august: 8, september: 9, october: 10, november: 11, december: 12,
    januar: 1, februar: 2, "märz": 3, mai: 5, juni: 6, juli: 7, oktober: 10, dezember: 12,
};
const MONTH_NAMES_DE = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
let displayedRows = [];
let currentForm;
const styles = `
<style>
  .irs-section { border: 1px solid #dee2e6; border-radius: 6px; background: #fff; }
  .irs-header { display: flex; justify-content: space-between; align-items: center; gap: 12px; flex-wrap: wrap; padding: 10px 12px; border-bottom: 1px solid #dee2e6; background: #f8f9fa; border-radius: 6px 6px 0 0; }
  .irs-title { font-weight: 600; font-size: 1.05em; }
  .irs-stats { display: flex; gap: 6px; flex-wrap: wrap; margin-top: 6px; }
  .irs-stat { font-size: 0.8em; font-weight: 600; padding: 2px 9px; border-radius: 10px; background: #e9ecef; color: #495057; }
  .irs-stat-main { background: #d1e7dd; color: #0f5132; font-size: 0.9em; }
  .irs-controls { display: flex; gap: 6px; flex-wrap: wrap; align-items: center; }
  .irs-select { width: auto; flex: 0 0 auto; }
  .irs-export-group { display: flex; gap: 6px; flex-wrap: nowrap; }
  .irs-body { padding: 12px; }
  .irs-table-wrap { max-height: 65vh; overflow: auto; border: 1px solid #dee2e6; border-radius: 6px; }
  .irs-table { margin: 0; font-size: 0.9em; }
  .irs-table thead th { position: sticky; top: 0; background: #f8f9fa; border-bottom: 1px solid #dee2e6; white-space: nowrap; }
  .irs-nr { color: #6c757d; width: 3em; text-align: right; }
  .irs-num { text-align: right; white-space: nowrap; font-variant-numeric: tabular-nums; }
  .irs-company { font-weight: 600; }
  .irs-muted { color: #adb5bd; font-style: italic; }
  .irs-footer { color: #6c757d; font-size: 0.85em; margin-top: 8px; }
  .irs-loading { display: flex; align-items: center; gap: 10px; color: #6c757d; padding: 12px; }
  .irs-error { color: #842029; background: #f8d7da; border: 1px solid #f5c2c7; border-radius: 6px; padding: 10px 12px; }
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
function formatNumber(value) {
    return value.toLocaleString("de-DE");
}
function toDisplayRow(row) {
    const monthNumber = MONTHS[row.month.trim().toLowerCase()] ?? (Number(row.month) || 0);
    return { ...row, monthNumber, monthLabel: MONTH_NAMES_DE[monthNumber - 1] ?? row.month };
}
// ---------------------------------------------------------------------------
// Darstellung
// ---------------------------------------------------------------------------
let currentContent = "";
let mountedRoot;
// Wie in der Toolbox: direkt in das Kind-Element ref="html" der
// HTML-Element-Komponente rendern.
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
    host.innerHTML = `${styles}<div data-irs-root>${currentContent}</div>`;
    mountedRoot = host.querySelector("[data-irs-root]") ?? undefined;
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
  <div class="irs-section">
    <div class="irs-loading">
      <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
      Auswertung wird geladen…
    </div>
  </div>`;
}
function renderError(message) {
    return `
  <div class="irs-error">
    <strong>Auswertung fehlgeschlagen:</strong> ${escapeHtml(message)}
    <div class="mt-2"><button type="button" class="btn btn-sm btn-outline-secondary" data-irs-reload>Erneut versuchen</button></div>
  </div>`;
}
function renderRow(row, index) {
    return `
      <tr data-index="${index}" data-company="${escapeHtml(row.company)}" data-year="${row.year}">
        <td class="irs-nr" data-irs-nr>${index + 1}</td>
        <td class="irs-company">${row.company ? escapeHtml(row.company) : `<span class="irs-muted">–</span>`}</td>
        <td class="irs-num">${row.year}</td>
        <td>${escapeHtml(row.monthLabel)}</td>
        <td class="irs-num">${formatNumber(row.count)}</td>
      </tr>`;
}
function renderResult(result) {
    // Mandant aufsteigend, darin neueste Monate zuerst.
    const rows = result.rows.map(toDisplayRow).sort((a, b) => a.company.localeCompare(b.company, "de", { numeric: true }) ||
        b.year - a.year ||
        b.monthNumber - a.monthNumber);
    displayedRows = rows;
    const companies = [...new Set(rows.map((row) => row.company))].sort((a, b) => a.localeCompare(b, "de", { numeric: true }));
    const years = [...new Set(rows.map((row) => row.year))].sort((a, b) => b - a);
    const tableRows = rows.length
        ? rows.map(renderRow).join("")
        : `<tr><td colspan="5" class="irs-muted">Keine verarbeiteten Rechnungen gefunden.</td></tr>`;
    const loadedAt = new Date().toLocaleString("de-DE");
    return `
  <div class="irs-section">
    <div class="irs-header">
      <div>
        <span class="irs-title">Verarbeitete Rechnungen</span>
        <div class="irs-stats" data-irs-stats></div>
      </div>
      <div class="irs-controls">
        <select class="form-control form-control-sm irs-select" data-irs-company aria-label="Mandant filtern">
          <option value="">Alle Mandanten</option>
          ${companies.map((company) => `<option value="${escapeHtml(company)}">${escapeHtml(company || "(ohne Mandant)")}</option>`).join("")}
        </select>
        <select class="form-control form-control-sm irs-select" data-irs-year aria-label="Jahr filtern">
          <option value="">Alle Jahre</option>
          ${years.map((year) => `<option value="${year}">${year}</option>`).join("")}
        </select>
        <div class="irs-export-group">
          <button type="button" class="btn btn-sm btn-outline-secondary" data-export="csv" title="Angezeigte Zeilen als CSV-Datei exportieren">CSV-Download</button>
          <button type="button" class="btn btn-sm btn-outline-secondary" data-export="xlsx" title="Angezeigte Zeilen als Excel-Datei exportieren">Excel-Download</button>
        </div>
        <button type="button" class="btn btn-sm btn-outline-secondary" data-irs-reload title="Auswertung neu laden">Aktualisieren</button>
      </div>
    </div>
    <div class="irs-body">
      <div class="irs-table-wrap">
        <table class="table table-sm table-hover table-striped irs-table">
          <thead>
            <tr><th class="irs-nr">Nr.</th><th>Mandant</th><th class="irs-num">Jahr</th><th>Monat</th><th class="irs-num">Rechnungen</th></tr>
          </thead>
          <tbody>${tableRows}</tbody>
        </table>
      </div>
      <div class="irs-footer"><span data-irs-visible></span> · Stand ${escapeHtml(loadedAt)}</div>
    </div>
  </div>`;
}
// Sichtbare Zeilen (nach Mandant/Jahr), in Anzeige-Reihenfolge.
function visibleRows(root) {
    return Array.from(root.querySelectorAll("tr[data-index]"))
        .filter((row) => row.style.display !== "none")
        .map((row) => displayedRows[Number(row.dataset.index)])
        .filter((row) => !!row);
}
// Filter anwenden, sichtbare Zeilen neu nummerieren, Kennzahlen aktualisieren.
function applyFilters(root) {
    const company = root.querySelector("[data-irs-company]")?.value ?? "";
    const year = root.querySelector("[data-irs-year]")?.value ?? "";
    const rows = Array.from(root.querySelectorAll("tr[data-index]"));
    let visible = 0;
    for (const row of rows) {
        const match = (!company || row.dataset.company === company) && (!year || row.dataset.year === year);
        row.style.display = match ? "" : "none";
        if (match) {
            visible++;
            const nr = row.querySelector("[data-irs-nr]");
            if (nr)
                nr.textContent = String(visible);
        }
    }
    const shown = visibleRows(root);
    const total = shown.reduce((sum, row) => sum + row.count, 0);
    const companies = new Set(shown.map((row) => row.company)).size;
    const periods = shown.map((row) => row.year * 100 + row.monthNumber).filter((p) => p % 100 > 0);
    const period = periods.length
        ? `${formatPeriod(Math.min(...periods))} – ${formatPeriod(Math.max(...periods))}`
        : "–";
    const stats = root.querySelector("[data-irs-stats]");
    if (stats) {
        stats.innerHTML = [
            `<span class="irs-stat irs-stat-main">Rechnungen: <strong>${formatNumber(total)}</strong></span>`,
            `<span class="irs-stat">Mandanten: <strong>${companies}</strong></span>`,
            `<span class="irs-stat">Zeitraum: <strong>${escapeHtml(period)}</strong></span>`,
        ].join("");
    }
    const counter = root.querySelector("[data-irs-visible]");
    if (counter)
        counter.textContent = `${visible} von ${rows.length} Zeilen angezeigt`;
}
function formatPeriod(value) {
    return `${String(value % 100).padStart(2, "0")}/${Math.floor(value / 100)}`;
}
function exportRows(root, format) {
    const table = {
        headers: ["Mandant", "Jahr", "Monat", "Rechnungen"],
        rows: visibleRows(root).map((row) => [row.company, row.year, row.monthLabel, row.count]),
    };
    const company = root.querySelector("[data-irs-company]")?.value ?? "";
    const year = root.querySelector("[data-irs-year]")?.value ?? "";
    const date = new Date().toISOString().slice(0, 10);
    // z.B. "Ellinger_Rechnungsleser-Auswertung_1000_2026_2026-09-27".
    const baseName = [(0, tableExport_1.getTenantName)(), "Rechnungsleser-Auswertung", company, year, date]
        .filter(Boolean)
        .join("_")
        .replace(/[^\wäöüÄÖÜß-]+/g, "_");
    if (format === "csv") {
        (0, tableExport_1.downloadBlob)((0, tableExport_1.toCsv)(table), `${baseName}.csv`);
    }
    else {
        (0, tableExport_1.downloadBlob)((0, tableExport_1.toXlsx)(table, "Rechnungen"), `${baseName}.xlsx`);
    }
}
// Listener direkt an die Elemente, bewusst ohne "instanceof HTMLElement"
// (dforms führt das Bundle ggf. in einem anderen Fenster-Kontext aus).
function bindEvents(root) {
    const onFilterChange = () => applyFilters(root);
    root.querySelector("[data-irs-company]")?.addEventListener("change", onFilterChange);
    root.querySelector("[data-irs-year]")?.addEventListener("change", onFilterChange);
    root.querySelectorAll("button[data-export]").forEach((button) => {
        button.addEventListener("click", () => exportRows(root, button.dataset.export === "csv" ? "csv" : "xlsx"));
    });
    root.querySelectorAll("button[data-irs-reload]").forEach((button) => {
        button.addEventListener("click", () => {
            if (currentForm)
                void loadStatistics(currentForm);
        });
    });
    if (root.querySelector("[data-irs-stats]")) {
        applyFilters(root);
    }
}
/**
 * Sucht das Script per Name, ruft es auf (das Script nutzt seinen eigenen
 * API-Key) und stellt das Ergebnis dar.
 */
async function loadStatistics(form) {
    showResult(form, renderLoading());
    try {
        const baseUri = window.location.origin;
        const script = (await (0, getAllScripts_1.getAllScripts)(baseUri, "")).body.find((s) => s.name === SCRIPT_NAME);
        if (!script?.id) {
            throw new Error(`Script "${SCRIPT_NAME}" wurde nicht gefunden - wurde es bereits über die Toolbox angelegt?`);
        }
        const response = await (0, callScriptEndpoint_1.callScriptEndpoint)(baseUri, script.id, "POST", { "Content-Type": "application/json" }, {});
        const body = response.body;
        if (!body || typeof body === "string" || !Array.isArray(body.rows)) {
            throw new Error(body?.error ?? `Unerwartete Antwort von Script "${SCRIPT_NAME}" - bitte das Tool über die Toolbox aktualisieren.`);
        }
        showResult(form, renderResult(body));
    }
    catch (error) {
        logger.error(`Fehler beim Ausführen von "${SCRIPT_NAME}": ${getErrorMessage(error)}`);
        showResult(form, renderError(getErrorMessage(error)));
    }
}
window.formInit = function (form, data) {
    logger.debug(`Rechnungsleser-Auswertung initialisiert (Version ${VERSION_COUNTER}).`);
    currentForm = form;
    form.on?.("render", () => {
        if (currentContent && !mountedRoot?.isConnected) {
            mountContent(form);
        }
    });
    void loadStatistics(form);
};

})();

window.InvoiceReaderStatisticsFormBundle = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=formBundle.js.map