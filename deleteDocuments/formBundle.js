/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "../../helper/dms/deleteDmsObject.ts"
/*!*******************************************!*\
  !*** ../../helper/dms/deleteDmsObject.ts ***!
  \*******************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getDeleteHref = getDeleteHref;
exports.expandDeleteHref = expandDeleteHref;
exports.deleteDmsObject = deleteDmsObject;
const performHttpRequest_1 = __webpack_require__(/*! ../performHttpRequest/performHttpRequest */ "../../helper/performHttpRequest/performHttpRequest.ts");
function headers(token) {
    return {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        Accept: "application/json",
    };
}
/**
 * Liest den Lösch-Link eines DMS-Objekts (bevorzugt "deleteWithReason",
 * sonst "delete"). undefined = der Benutzer darf das Objekt nicht löschen.
 * Templates wie "{?reason}" bleiben erhalten - siehe expandDeleteHref.
 */
async function getDeleteHref(baseUri, token, repositoryId, documentId) {
    const body = (await (0, performHttpRequest_1.performHttpRequest)(`${baseUri}/dms/r/${repositoryId}/o2m/${encodeURIComponent(documentId)}`, { method: "GET", headers: headers(token) })).body;
    return body._links?.deleteWithReason?.href ?? body._links?.delete?.href;
}
/**
 * Setzt den Löschgrund in einen (ggf. templatisierten) Lösch-Link ein:
 * "...{?reason}", "...?reason={reason}" oder ohne Platzhalter (dann wird
 * reason als Query-Parameter angehängt).
 */
function expandDeleteHref(href, reason) {
    const encoded = encodeURIComponent(reason);
    if (href.includes("{?reason}")) {
        return href.replace("{?reason}", `?reason=${encoded}`);
    }
    if (href.includes("{reason}")) {
        return href.replace("{reason}", encoded);
    }
    if (/[?&]reason=/.test(href)) {
        return href;
    }
    return `${href}${href.includes("?") ? "&" : "?"}reason=${encoded}`;
}
/**
 * Löscht ein DMS-Objekt über seinen (bereits expandierten) Lösch-Link.
 * Wirft bei HTTP-Fehlern (z.B. 403 ohne Löschrecht, 409/423 gesperrt).
 */
async function deleteDmsObject(baseUri, token, href) {
    await (0, performHttpRequest_1.performHttpRequest)(href.startsWith("http") ? href : `${baseUri}${href}`, {
        method: "DELETE",
        headers: headers(token),
    });
}


/***/ },

/***/ "../../helper/dms/getDocumentIdsByCategory.ts"
/*!****************************************************!*\
  !*** ../../helper/dms/getDocumentIdsByCategory.ts ***!
  \****************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getDocumentIdsByCategory = getDocumentIdsByCategory;
const performHttpRequest_1 = __webpack_require__(/*! ../performHttpRequest/performHttpRequest */ "../../helper/performHttpRequest/performHttpRequest.ts");
function headers(token) {
    return {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        Accept: "application/json",
    };
}
/**
 * Liefert die Ids ALLER DMS-Objekte einer Kategorie - blättert über
 * _links.next durch die komplette Trefferliste (srm-Suche mit der
 * Standardquelle des Repositorys).
 *
 * @param baseUri - Basis-URL des Mandanten.
 * @param token - API-Key; leer = Browser-Session des angemeldeten Benutzers.
 * @param repositoryId - Id des DMS-Repositorys.
 * @param categoryKey - Key der Kategorie (aus /dms/r/<repo>/source).
 * @param onProgress - Optional, wird nach jeder Seite mit der bisherigen Anzahl aufgerufen.
 * @param pageSize - Treffer pro Seite (max. 1000).
 */
async function getDocumentIdsByCategory(baseUri, token, repositoryId, categoryKey, onProgress, pageSize = 1000) {
    const params = new URLSearchParams({
        sourceid: `/dms/r/${repositoryId}/source`,
        sourcecategories: JSON.stringify([categoryKey]),
        pagesize: String(pageSize),
    });
    let url = `${baseUri}/dms/r/${repositoryId}/srm/?${params}`;
    const ids = new Set();
    while (url) {
        const body = (await (0, performHttpRequest_1.performHttpRequest)(url, { method: "GET", headers: headers(token) })).body;
        const before = ids.size;
        for (const item of body.items ?? []) {
            if (item.id)
                ids.add(item.id);
        }
        onProgress?.(ids.size);
        const next = body._links?.next?.href;
        // Ohne neue Treffer nicht weiterblättern (Schutz vor Endlosschleifen).
        url = next && ids.size > before ? (next.startsWith("http") ? next : `${baseUri}${next}`) : undefined;
    }
    return [...ids];
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
const performHttpRequest_1 = __webpack_require__(/*! ../../../../helper/performHttpRequest/performHttpRequest */ "../../helper/performHttpRequest/performHttpRequest.ts");
const getDocumentIdsByCategory_1 = __webpack_require__(/*! ../../../../helper/dms/getDocumentIdsByCategory */ "../../helper/dms/getDocumentIdsByCategory.ts");
const deleteDmsObject_1 = __webpack_require__(/*! ../../../../helper/dms/deleteDmsObject */ "../../helper/dms/deleteDmsObject.ts");
const logger_1 = __webpack_require__(/*! ../../../../helper/utils/logger */ "../../helper/utils/logger.ts");
const tableExport_1 = __webpack_require__(/*! ../../../../helper/utils/tableExport */ "../../helper/utils/tableExport.ts");
/**
 * Dokumente löschen: listet alle Kategorien des DMS-Repositorys und löscht
 * alle Dokumente EINER Kategorie oder ALLER Kategorien - komplett im Browser
 * mit der Session (und damit den Rechten) des angemeldeten Benutzers, ohne
 * API-Key.
 *
 * Schutz vor Versehen - vor dem Löschen immer drei Abfragen:
 *  1. Übersicht (Kategorien + Anzahl), Pflicht-Löschgrund und Checkbox
 *     "Mir ist bewusst ...",
 *  2. Bestätigungstext abtippen (Kategoriename bzw. "ALLE DOKUMENTE LÖSCHEN"
 *     plus Mandantenname),
 *  3. letzte Abfrage, deren Button erst nach einem Countdown freigegeben wird.
 * Gelöscht werden genau die Dokumente, die direkt vor Abfrage 1 ermittelt
 * wurden. Ohne SweetAlert2 (CDN nicht erreichbar) wird NICHT gelöscht.
 * Nach dem Lauf gibt es ein Protokoll (CSV) aller Ids mit Ergebnis.
 *
 * Das Feld-Layout (nur die Content-Komponente "result") liegt als Code in
 * src/forms/form.json und wird von der Toolbox mit ausgerollt.
 *
 * VERSION_COUNTER unten NICHT umbenennen, der Name ist projektübergreifend
 * fest "VERSION_COUNTER" (siehe generateTargetForms.js) -
 * .github/workflows/publish-bundles.yml stempelt beim Publish den nächsten
 * Stand nur ins veröffentlichte Bundle - der Wert hier ist ein Platzhalter und
 * wird nicht hochgezählt.
 */
const VERSION_COUNTER = 2;
const logger = (0, logger_1.initLogger)(logger_1.LogLevel.INFO);
const BASE_URI = window.location.origin;
const GET_HEADERS = { Accept: "application/json" };
// Komponenten-Key aus src/forms/form.json.
const resultKey = "result";
// Parallele Löschaufrufe - klein genug, um das DMS nicht zu überlasten.
const DELETE_CONCURRENCY = 5;
// Sekunden, bis der Button der letzten Abfrage klickbar wird.
const FINAL_COUNTDOWN_SECONDS = 5;
const ALL_CONFIRM_PHRASE = "ALLE DOKUMENTE LÖSCHEN";
let repositoryId = "";
let categories = [];
let busy = false;
let cancelRequested = false;
let lastLog = [];
// Fortschritt des laufenden Vorgangs (wird in renderPanel angezeigt).
let progress;
let lastSummary = "";
const styles = `
<style>
  .ddd-section { border: 1px solid #dee2e6; border-radius: 6px; background: #fff; }
  .ddd-header { display: flex; justify-content: space-between; align-items: center; gap: 12px; flex-wrap: wrap; padding: 10px 12px; border-bottom: 1px solid #dee2e6; background: #f8f9fa; border-radius: 6px 6px 0 0; }
  .ddd-title { font-weight: 600; font-size: 1.05em; }
  .ddd-hint { color: #6c757d; font-size: 0.85em; margin-top: 4px; }
  .ddd-controls { display: flex; gap: 6px; flex-wrap: wrap; }
  .ddd-filter { max-width: 220px; }
  .ddd-body { padding: 12px; }
  .ddd-warning { color: #842029; background: #f8d7da; border: 1px solid #f5c2c7; border-radius: 6px; padding: 8px 12px; margin-bottom: 12px; font-size: 0.9em; }
  .ddd-table-wrap { max-height: 60vh; overflow: auto; border: 1px solid #dee2e6; border-radius: 6px; }
  .ddd-table { margin: 0; font-size: 0.9em; }
  .ddd-table thead th { position: sticky; top: 0; background: #f8f9fa; border-bottom: 1px solid #dee2e6; white-space: nowrap; }
  .ddd-table td { vertical-align: middle; }
  .ddd-nr { color: #6c757d; width: 3em; text-align: right; }
  .ddd-num { text-align: right; white-space: nowrap; }
  .ddd-name { font-weight: 600; }
  .ddd-id { color: #6c757d; font-family: monospace; font-size: 0.8em; }
  .ddd-muted { color: #adb5bd; font-style: italic; }
  .ddd-err { color: #842029; font-size: 0.85em; }
  .ddd-action { white-space: nowrap; text-align: right; }
  .ddd-footer { color: #6c757d; font-size: 0.85em; margin-top: 8px; }
  .ddd-panel { border: 1px solid #dee2e6; border-radius: 6px; padding: 10px 12px; margin-bottom: 12px; background: #fcfcfd; }
  .ddd-panel .progress { height: 18px; margin: 6px 0; }
  .ddd-loading { display: flex; align-items: center; gap: 10px; color: #6c757d; padding: 12px; }
  .ddd-error { color: #842029; background: #f8d7da; border: 1px solid #f5c2c7; border-radius: 6px; padding: 10px 12px; }
  .ddd-swal-list { text-align: left; max-height: 220px; overflow: auto; margin: 8px 0; font-size: 0.9em; }
  .ddd-swal-list td { padding: 2px 8px; }
  .ddd-swal-phrase { font-family: monospace; font-weight: 700; background: #f1f3f5; padding: 1px 6px; border-radius: 4px; }
  .ddd-swal-check { display: flex; gap: 8px; align-items: flex-start; text-align: left; margin-top: 12px; font-size: 0.9em; }
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
// ---------------------------------------------------------------------------
// DMS (Browser-Session, daher ohne Authorization-Header)
// ---------------------------------------------------------------------------
async function fetchRepositoryId() {
    const repositories = (await (0, performHttpRequest_1.performHttpRequest)(`${BASE_URI}/dms/r`, { method: "GET", headers: GET_HEADERS })).body.repositories ?? [];
    const repository = repositories.find((r) => r.isDefault) ?? repositories[0];
    if (!repository?.id) {
        throw new Error("Kein DMS-Repository gefunden.");
    }
    return repository.id;
}
async function fetchCategories(repoId) {
    const source = (await (0, performHttpRequest_1.performHttpRequest)(`${BASE_URI}/dms/r/${repoId}/source`, { method: "GET", headers: GET_HEADERS })).body;
    return (source.categories ?? [])
        .filter((category) => !!category.key)
        .map((category) => ({ key: category.key, name: category.displayName || category.key }))
        .sort((a, b) => a.name.localeCompare(b.name, "de"));
}
// ---------------------------------------------------------------------------
// Darstellung
// ---------------------------------------------------------------------------
let currentForm;
let mountedRoot;
let currentContent = "";
// Wie in der Toolbox: direkt in das Kind-Element ref="html" der
// HTML-Element-Komponente rendern (siehe Toolbox_DownloadBatchDocuments).
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
    // Suchbegriff über das Neuzeichnen hinweg behalten.
    const term = mountedRoot?.querySelector(".ddd-filter")?.value ?? "";
    host.innerHTML = `${styles}<div data-ddd-root>${currentContent}</div>`;
    mountedRoot = host.querySelector("[data-ddd-root]") ?? undefined;
    if (mountedRoot) {
        const search = mountedRoot.querySelector(".ddd-filter");
        if (search && term) {
            search.value = term;
            applyFilter(mountedRoot);
        }
        bindEvents(mountedRoot);
    }
}
function showResult(content) {
    currentContent = content;
    if (currentForm) {
        mountContent(currentForm);
    }
}
function rerender() {
    showResult(renderCategories());
}
function renderLoading() {
    return `
  <div class="ddd-section">
    <div class="ddd-loading">
      <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
      Kategorien werden geladen…
    </div>
  </div>`;
}
function renderError(message) {
    return `
  <div class="ddd-error">
    <strong>Kategorien konnten nicht geladen werden:</strong> ${escapeHtml(message)}
    <div class="mt-2"><button type="button" class="btn btn-sm btn-outline-secondary" data-ddd-reload>Erneut versuchen</button></div>
  </div>`;
}
function renderCount(category) {
    if (category.counting) {
        return `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>`;
    }
    if (category.error) {
        return `<span class="ddd-err" title="${escapeHtml(category.error)}">Fehler</span>`;
    }
    return category.count === undefined ? `<span class="ddd-muted">–</span>` : formatNumber(category.count);
}
function renderRow(category, index) {
    const search = `${category.name} ${category.key}`.toLowerCase();
    const disabled = busy || category.count === 0 ? "disabled" : "";
    return `
      <tr data-search="${escapeHtml(search)}">
        <td class="ddd-nr" data-ddd-nr>${index + 1}</td>
        <td><span class="ddd-name">${escapeHtml(category.name)}</span><div class="ddd-id">${escapeHtml(category.key)}</div></td>
        <td class="ddd-num">${renderCount(category)}</td>
        <td class="ddd-action">
          <button type="button" class="btn btn-sm btn-outline-secondary" data-ddd-count="${index}" ${busy ? "disabled" : ""}>Zählen</button>
          <button type="button" class="btn btn-sm btn-outline-danger" data-ddd-delete="${index}" ${disabled}>Löschen…</button>
        </td>
      </tr>`;
}
function renderPanel() {
    if (progress) {
        const percent = progress.total ? Math.round((progress.done / progress.total) * 100) : 0;
        return `
      <div class="ddd-panel">
        <strong>${escapeHtml(progress.title)}</strong>
        <div class="progress"><div class="progress-bar progress-bar-striped progress-bar-animated bg-danger" style="width: ${percent}%">${percent}%</div></div>
        <div class="d-flex justify-content-between align-items-center flex-wrap gap-2">
          <span>${escapeHtml(progress.text)}</span>
          <button type="button" class="btn btn-sm btn-outline-secondary" data-ddd-cancel ${cancelRequested ? "disabled" : ""}>${cancelRequested ? "Wird abgebrochen…" : "Abbrechen"}</button>
        </div>
      </div>`;
    }
    if (lastSummary) {
        return `
      <div class="ddd-panel">
        <span>${escapeHtml(lastSummary)}</span>
        ${lastLog.length ? `<button type="button" class="btn btn-sm btn-outline-secondary ms-2" data-ddd-log>Protokoll herunterladen (CSV)</button>` : ""}
      </div>`;
    }
    return "";
}
function renderCategories() {
    const rows = categories.length
        ? categories.map(renderRow).join("")
        : `<tr><td colspan="4" class="ddd-muted">Keine Kategorien vorhanden.</td></tr>`;
    const counted = categories.filter((c) => c.count !== undefined);
    const total = counted.reduce((sum, c) => sum + (c.count ?? 0), 0);
    const totalText = counted.length === categories.length && categories.length
        ? `${formatNumber(total)} Dokumente insgesamt`
        : counted.length
            ? `${formatNumber(total)} Dokumente in ${counted.length} gezählten Kategorien`
            : "Anzahlen noch nicht ermittelt";
    return `
  <div class="ddd-section">
    <div class="ddd-header">
      <div>
        <span class="ddd-title">Dokumente löschen</span>
        <div class="ddd-hint">Löscht alle Dokumente einer Kategorie oder aller Kategorien - mit dem Rechten des angemeldeten Benutzers.</div>
      </div>
      <div class="ddd-controls">
        <input type="search" class="form-control form-control-sm ddd-filter" placeholder="Kategorie suchen…" aria-label="Kategorie suchen">
        <button type="button" class="btn btn-sm btn-outline-secondary" data-ddd-count-all ${busy ? "disabled" : ""}>Alle zählen</button>
        <button type="button" class="btn btn-sm btn-outline-secondary" data-ddd-reload ${busy ? "disabled" : ""}>Aktualisieren</button>
        <button type="button" class="btn btn-sm btn-danger" data-ddd-delete-all ${busy || !categories.length ? "disabled" : ""}>Alle Kategorien löschen…</button>
      </div>
    </div>
    <div class="ddd-body">
      <div class="ddd-warning"><strong>Achtung:</strong> Gelöschte Dokumente lassen sich über dieses Werkzeug nicht wiederherstellen. Vor jedem Löschen folgen drei Sicherheitsabfragen.</div>
      ${renderPanel()}
      <div class="ddd-table-wrap">
        <table class="table table-sm table-hover table-striped ddd-table">
          <thead>
            <tr><th class="ddd-nr">Nr.</th><th>Kategorie</th><th class="ddd-num">Dokumente</th><th></th></tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
      <div class="ddd-footer"><span data-ddd-visible>${categories.length} von ${categories.length} Kategorien angezeigt</span> · ${escapeHtml(totalText)}</div>
    </div>
  </div>`;
}
function applyFilter(root) {
    const term = root.querySelector(".ddd-filter")?.value.trim().toLowerCase() ?? "";
    const rows = Array.from(root.querySelectorAll("tr[data-search]"));
    let visible = 0;
    for (const row of rows) {
        const match = !term || (row.dataset.search ?? "").includes(term);
        row.style.display = match ? "" : "none";
        if (match) {
            visible++;
            const nr = row.querySelector("[data-ddd-nr]");
            if (nr)
                nr.textContent = String(visible);
        }
    }
    const counter = root.querySelector("[data-ddd-visible]");
    if (counter)
        counter.textContent = `${visible} von ${rows.length} Kategorien angezeigt`;
}
// Listener direkt an die Elemente, bewusst ohne "instanceof HTMLElement"
// (dforms führt das Bundle ggf. in einem anderen Fenster-Kontext aus).
function bindEvents(root) {
    const search = root.querySelector(".ddd-filter");
    if (search) {
        const onFilterChange = () => applyFilter(root);
        search.addEventListener("input", onFilterChange);
        search.addEventListener("keyup", onFilterChange);
        search.addEventListener("search", onFilterChange);
        search.addEventListener("keydown", (event) => {
            if (event.key === "Enter")
                event.preventDefault();
        });
    }
    root.querySelectorAll("button[data-ddd-reload]").forEach((button) => button.addEventListener("click", () => loadCategories()));
    root.querySelectorAll("button[data-ddd-count]").forEach((button) => button.addEventListener("click", () => countCategories([categories[Number(button.dataset.dddCount)]])));
    root.querySelector("button[data-ddd-count-all]")?.addEventListener("click", () => countCategories(categories));
    root.querySelectorAll("button[data-ddd-delete]").forEach((button) => button.addEventListener("click", () => deleteFlow([categories[Number(button.dataset.dddDelete)]], false)));
    root.querySelector("button[data-ddd-delete-all]")?.addEventListener("click", () => deleteFlow(categories, true));
    root.querySelector("button[data-ddd-cancel]")?.addEventListener("click", () => {
        cancelRequested = true;
        rerender();
    });
    root.querySelector("button[data-ddd-log]")?.addEventListener("click", downloadLog);
}
// ---------------------------------------------------------------------------
// Zählen
// ---------------------------------------------------------------------------
async function countCategories(targets) {
    if (busy)
        return;
    busy = true;
    try {
        for (const category of targets.filter(Boolean)) {
            category.counting = true;
            category.error = undefined;
            rerender();
            try {
                category.count = (await (0, getDocumentIdsByCategory_1.getDocumentIdsByCategory)(BASE_URI, undefined, repositoryId, category.key)).length;
            }
            catch (error) {
                category.error = getErrorMessage(error);
                logger.error(`Zählen von „${category.name}“ fehlgeschlagen: ${category.error}`);
            }
            finally {
                category.counting = false;
            }
        }
    }
    finally {
        busy = false;
        rerender();
    }
}
// ---------------------------------------------------------------------------
// Sicherheitsabfragen
// ---------------------------------------------------------------------------
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
        script.onerror = () => resolve();
        document.head.appendChild(script);
    });
}
async function ensureSwal() {
    await loadSweetAlert();
    if (typeof Swal === "undefined") {
        throw new Error("Dialog-Bibliothek (SweetAlert2) konnte nicht geladen werden - ohne Sicherheitsabfragen wird nicht gelöscht.");
    }
}
function selectionTable(selection) {
    const shown = selection.slice(0, 50);
    const rest = selection.length - shown.length;
    return `<div class="ddd-swal-list"><table>${shown
        .map((s) => `<tr><td>${escapeHtml(s.category.name)}</td><td style="text-align:right">${formatNumber(s.ids.length)}</td></tr>`)
        .join("")}${rest > 0 ? `<tr><td colspan="2">… und ${rest} weitere Kategorien</td></tr>` : ""}</table></div>`;
}
/** Abfrage 1: Übersicht, Löschgrund, Checkbox. Liefert den Löschgrund oder undefined. */
async function confirmOverview(selection, total, all) {
    const tenant = (0, tableExport_1.getTenantName)();
    const result = await Swal.fire({
        icon: "warning",
        title: "Achtung - Dokumente löschen",
        html: `
      <p><strong>${formatNumber(total)} Dokument(e)</strong> ${all ? "aus <strong>allen Kategorien</strong>" : "aus der folgenden Kategorie"} im Mandanten <strong>${escapeHtml(tenant)}</strong> werden gelöscht:</p>
      ${selectionTable(selection)}
      <p>Das Löschen kann über dieses Werkzeug nicht rückgängig gemacht werden.</p>
      <input id="ddd-reason" class="swal2-input" placeholder="Löschgrund (Pflicht)" maxlength="250">
      <label class="ddd-swal-check"><input type="checkbox" id="ddd-ack"> <span>Mir ist bewusst, dass diese Dokumente endgültig gelöscht werden.</span></label>`,
        showCancelButton: true,
        confirmButtonColor: "#dc3545",
        confirmButtonText: "Weiter",
        cancelButtonText: "Abbrechen",
        focusCancel: true,
        preConfirm: () => {
            const reason = document.getElementById("ddd-reason")?.value.trim() ?? "";
            const ack = document.getElementById("ddd-ack")?.checked;
            if (!reason) {
                Swal.showValidationMessage("Bitte einen Löschgrund angeben.");
                return false;
            }
            if (!ack) {
                Swal.showValidationMessage("Bitte bestätigen, dass die Dokumente endgültig gelöscht werden.");
                return false;
            }
            return reason;
        },
    });
    return result.isConfirmed ? String(result.value) : undefined;
}
/** Abfrage 2: Bestätigungstext abtippen. */
async function confirmPhrase(selection, all) {
    const phrase = all ? `${ALL_CONFIRM_PHRASE} ${(0, tableExport_1.getTenantName)()}` : selection[0].category.name;
    const result = await Swal.fire({
        icon: "warning",
        title: "Zur Bestätigung abtippen",
        html: `<p>Bitte ${all ? "diesen Text" : "den Namen der Kategorie"} exakt eingeben:</p>
      <p><span class="ddd-swal-phrase">${escapeHtml(phrase)}</span></p>`,
        input: "text",
        inputAttributes: { autocomplete: "off", autocapitalize: "off", spellcheck: "false" },
        showCancelButton: true,
        confirmButtonColor: "#dc3545",
        confirmButtonText: "Weiter",
        cancelButtonText: "Abbrechen",
        focusCancel: false,
        inputValidator: (value) => value.trim() === phrase ? undefined : "Der Text stimmt nicht überein.",
    });
    return !!result.isConfirmed;
}
/** Abfrage 3: letzte Abfrage, Button erst nach Countdown klickbar. */
async function confirmFinal(total, all) {
    let timer;
    const label = (seconds) => seconds > 0 ? `Endgültig löschen (${seconds})` : "Endgültig löschen";
    const result = await Swal.fire({
        icon: "error",
        title: "Letzte Abfrage",
        html: `<p>Jetzt wirklich <strong>${formatNumber(total)} Dokument(e)</strong> ${all ? "aus <strong>allen Kategorien</strong>" : ""} im Mandanten <strong>${escapeHtml((0, tableExport_1.getTenantName)())}</strong> löschen?</p>`,
        showCancelButton: true,
        confirmButtonColor: "#dc3545",
        confirmButtonText: label(FINAL_COUNTDOWN_SECONDS),
        cancelButtonText: "Abbrechen",
        focusCancel: true,
        didOpen: () => {
            const button = Swal.getConfirmButton();
            let seconds = FINAL_COUNTDOWN_SECONDS;
            if (button)
                button.disabled = true;
            timer = setInterval(() => {
                seconds--;
                if (button) {
                    button.textContent = label(seconds);
                    button.disabled = seconds > 0;
                }
                if (seconds <= 0 && timer)
                    clearInterval(timer);
            }, 1000);
        },
        willClose: () => {
            if (timer)
                clearInterval(timer);
        },
    });
    return !!result.isConfirmed;
}
// ---------------------------------------------------------------------------
// Löschen
// ---------------------------------------------------------------------------
// Fortschritt höchstens alle 250 ms neu zeichnen - sonst würde bei jedem
// einzelnen Dokument die komplette Tabelle neu aufgebaut.
let progressRenderPending = false;
function setProgress(update) {
    progress = { title: "", done: 0, total: 0, ok: 0, failed: 0, text: "", ...progress, ...update };
    if (progressRenderPending)
        return;
    progressRenderPending = true;
    setTimeout(() => {
        progressRenderPending = false;
        if (progress)
            rerender();
    }, 250);
}
async function collectSelection(targets) {
    const selection = [];
    for (const [index, category] of targets.entries()) {
        if (cancelRequested)
            break;
        setProgress({
            title: "Dokumente werden ermittelt…",
            done: index,
            total: targets.length,
            text: `Kategorie ${index + 1} von ${targets.length}: ${category.name}`,
        });
        const ids = await (0, getDocumentIdsByCategory_1.getDocumentIdsByCategory)(BASE_URI, undefined, repositoryId, category.key, (count) => setProgress({ text: `Kategorie ${index + 1} von ${targets.length}: ${category.name} - ${formatNumber(count)} Dokumente` }));
        category.count = ids.length;
        category.error = undefined;
        if (ids.length) {
            selection.push({ category, ids });
        }
    }
    return selection;
}
async function deleteOne(category, documentId, reason) {
    const base = { category: category.name, categoryKey: category.key, documentId };
    try {
        const href = await (0, deleteDmsObject_1.getDeleteHref)(BASE_URI, undefined, repositoryId, documentId);
        if (!href) {
            return { ...base, result: "Fehler", message: "Keine Löschberechtigung (kein Lösch-Link am Dokument)." };
        }
        await (0, deleteDmsObject_1.deleteDmsObject)(BASE_URI, undefined, (0, deleteDmsObject_1.expandDeleteHref)(href, reason));
        return { ...base, result: "gelöscht", message: "" };
    }
    catch (error) {
        return { ...base, result: "Fehler", message: getErrorMessage(error) };
    }
}
async function runDeletion(selection, reason, total) {
    const queue = selection.flatMap((s) => s.ids.map((id) => ({ category: s.category, id })));
    const log = [];
    let next = 0;
    setProgress({ title: "Dokumente werden gelöscht…", done: 0, total, ok: 0, failed: 0, text: `0 von ${formatNumber(total)}` });
    const worker = async () => {
        while (next < queue.length && !cancelRequested) {
            const item = queue[next++];
            const entry = await deleteOne(item.category, item.id, reason);
            log.push(entry);
            if (entry.result === "Fehler") {
                logger.warn(`${item.id} (${item.category.name}): ${entry.message}`);
            }
            const ok = log.filter((e) => e.result === "gelöscht").length;
            setProgress({
                done: log.length,
                ok,
                failed: log.length - ok,
                text: `${formatNumber(log.length)} von ${formatNumber(total)} - ${formatNumber(ok)} gelöscht, ${formatNumber(log.length - ok)} Fehler`,
            });
        }
    };
    await Promise.all(Array.from({ length: DELETE_CONCURRENCY }, worker));
    // Nicht mehr bearbeitete Dokumente (Abbruch) ebenfalls protokollieren.
    for (const item of queue.slice(next)) {
        log.push({ category: item.category.name, categoryKey: item.category.key, documentId: item.id, result: "abgebrochen", message: "" });
    }
    return log;
}
async function deleteFlow(targets, all) {
    if (busy || !targets.length || targets.some((t) => !t))
        return;
    busy = true;
    cancelRequested = false;
    lastSummary = "";
    try {
        await ensureSwal();
        // Direkt vor den Abfragen frisch ermitteln - gelöscht werden genau diese Ids.
        const selection = await collectSelection(targets);
        if (cancelRequested) {
            lastSummary = "Abgebrochen - es wurde nichts gelöscht.";
            return;
        }
        progress = undefined;
        rerender();
        const total = selection.reduce((sum, s) => sum + s.ids.length, 0);
        if (!total) {
            await Swal.fire({ icon: "info", title: "Keine Dokumente", text: "In der Auswahl gibt es keine Dokumente." });
            return;
        }
        const reason = await confirmOverview(selection, total, all);
        if (!reason || !(await confirmPhrase(selection, all)) || !(await confirmFinal(total, all))) {
            lastSummary = "Abgebrochen - es wurde nichts gelöscht.";
            return;
        }
        logger.info(`Lösche ${total} Dokument(e) aus ${selection.length} Kategorie(n), Grund: ${reason}`);
        const log = await runDeletion(selection, reason, total);
        lastLog = log;
        const ok = log.filter((e) => e.result === "gelöscht").length;
        const failed = log.filter((e) => e.result === "Fehler").length;
        const cancelled = log.filter((e) => e.result === "abgebrochen").length;
        lastSummary = `${formatNumber(ok)} von ${formatNumber(total)} Dokument(en) gelöscht`
            + (failed ? `, ${formatNumber(failed)} Fehler` : "")
            + (cancelled ? `, ${formatNumber(cancelled)} wegen Abbruch nicht gelöscht` : "")
            + ".";
        for (const s of selection) {
            s.category.count = log.filter((e) => e.categoryKey === s.category.key && e.result !== "gelöscht").length;
        }
        progress = undefined;
        rerender();
        await Swal.fire({
            icon: failed || cancelled ? "warning" : "success",
            title: failed || cancelled ? "Löschen mit Einschränkungen beendet" : "Löschen abgeschlossen",
            text: `${lastSummary}${failed ? " Details im Protokoll (CSV)." : ""}`,
        });
    }
    catch (error) {
        lastSummary = `Fehler: ${getErrorMessage(error)}`;
        logger.error(lastSummary);
        if (typeof Swal !== "undefined") {
            await Swal.fire({ icon: "error", title: "Fehler", text: getErrorMessage(error) });
        }
    }
    finally {
        busy = false;
        cancelRequested = false;
        progress = undefined;
        rerender();
    }
}
function downloadLog() {
    const date = new Date().toISOString().slice(0, 10);
    const fileName = `${[(0, tableExport_1.getTenantName)(), "Loeschprotokoll", date].filter(Boolean).join("_")}.csv`;
    (0, tableExport_1.downloadBlob)((0, tableExport_1.toCsv)({
        headers: ["Kategorie", "Kategorie-Key", "Dokument-Id", "Ergebnis", "Meldung"],
        rows: lastLog.map((e) => [e.category, e.categoryKey, e.documentId, e.result, e.message]),
    }), fileName);
}
// ---------------------------------------------------------------------------
// Init
// ---------------------------------------------------------------------------
async function loadCategories() {
    if (busy)
        return;
    showResult(renderLoading());
    try {
        repositoryId = repositoryId || await fetchRepositoryId();
        categories = await fetchCategories(repositoryId);
        rerender();
    }
    catch (error) {
        logger.error(`Kategorien konnten nicht geladen werden: ${getErrorMessage(error)}`);
        showResult(renderError(getErrorMessage(error)));
    }
}
window.formInit = function (form, data) {
    logger.debug(`Formular "Dokumente löschen" initialisiert (Version ${VERSION_COUNTER}).`);
    currentForm = form;
    form.on?.("render", () => {
        if (currentContent && !mountedRoot?.isConnected) {
            mountContent(form);
        }
    });
    void loadSweetAlert();
    loadCategories();
};

})();

window.DeleteDocumentsFormBundle = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=formBundle.js.map