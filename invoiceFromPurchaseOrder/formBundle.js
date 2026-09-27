/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "../../helper/emailinbound/getEmailinboundProfiles.ts"
/*!************************************************************!*\
  !*** ../../helper/emailinbound/getEmailinboundProfiles.ts ***!
  \************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getEmailinboundProfiles = getEmailinboundProfiles;
const performHttpRequest_1 = __webpack_require__(/*! ../performHttpRequest/performHttpRequest */ "../../helper/performHttpRequest/performHttpRequest.ts");
/**
 * Retrieves the list of email inbound profiles from the specified base URI.
 *
 * @param baseUri - The base URI of the API endpoint.
 * @param token - The bearer token used for authentication.
 * @returns A promise that resolves to an ApiResponse containing the email inbound profiles.
 */
async function getEmailinboundProfiles(baseUri, token) {
    const url = `${baseUri}/emailinbound/settings`;
    const headers = {
        "Authorization": `Bearer ${token}`,
        "Accept": "application/json",
        "Content-Type": "application/json; charset=utf-8",
    };
    const options = {
        method: "GET",
        headers
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


/***/ },

/***/ "./src/forms/eInvoice.ts"
/*!*******************************!*\
  !*** ./src/forms/eInvoice.ts ***!
  \*******************************/
(__unused_webpack_module, exports) {


/**
 * E-Rechnung nach EN 16931 in der Syntax UN/CEFACT CII (CrossIndustryInvoice):
 * - XRechnung 3.0 (CII): reine XML-Datei,
 * - ZUGFeRD 2 / Factur-X, Profil EN 16931: PDF/A-3 mit demselben XML als
 *   Anhang "factur-x.xml" (pdf-lib, wird bei Bedarf von cdnjs nachgeladen).
 *
 * Geprüft (lokal) mit der KoSIT-Konfiguration XRechnung 3.0.2: XSD CII D16B
 * sowie Schematron EN16931-CII und XRechnung-CII.
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FACTURX_FILE_NAME = void 0;
exports.eInvoiceTotals = eInvoiceTotals;
exports.unitCode = unitCode;
exports.missingEInvoiceFields = missingEInvoiceFields;
exports.buildCiiXml = buildCiiXml;
exports.createFacturXPdf = createFacturXPdf;
exports.buildSrgbIccProfile = buildSrgbIccProfile;
const GUIDELINE_ID = {
    xrechnung: "urn:cen.eu:en16931:2017#compliant#urn:xeinkauf.de:kosit:xrechnung_3.0",
    zugferd: "urn:cen.eu:en16931:2017",
};
const BUSINESS_PROCESS_ID = "urn:fdc:peppol.eu:2017:poacc:billing:01.0";
exports.FACTURX_FILE_NAME = "factur-x.xml";
// ---------------------------------------------------------------------------
// Beträge
// ---------------------------------------------------------------------------
function round2(value) {
    return Math.round(value * 100) / 100;
}
function eInvoiceTotals(data) {
    const lineTotal = round2(data.lines.reduce((sum, line) => sum + round2(line.lineTotal), 0));
    const taxTotal = round2(lineTotal * data.vatRate / 100);
    const grandTotal = round2(lineTotal + taxTotal);
    return { lineTotal, taxTotal, grandTotal };
}
// ---------------------------------------------------------------------------
// Einheiten: BC-Maßeinheiten -> UN/ECE Rec. 20 (bzw. Rec. 21 mit "X").
// ---------------------------------------------------------------------------
const UNIT_CODES = {
    STK: "H87", "STÜCK": "H87", STUECK: "H87", ST: "H87", PCS: "H87", PIECE: "H87",
    KG: "KGM", KILO: "KGM", G: "GRM", GR: "GRM", T: "TNE", TO: "TNE", TONNE: "TNE",
    L: "LTR", LTR: "LTR", LITER: "LTR", ML: "MLT",
    M: "MTR", MTR: "MTR", METER: "MTR", CM: "CMT", MM: "MMT", KM: "KMT",
    M2: "MTK", QM: "MTK", "M²": "MTK", M3: "MTQ", CBM: "MTQ", "M³": "MTQ",
    STD: "HUR", STUNDE: "HUR", H: "HUR", HOUR: "HUR", MIN: "MIN", TAG: "DAY", DAY: "DAY", WOCHE: "WEE", MONAT: "MON",
    PAK: "XPK", PAKET: "XPK", PCK: "XPK", KARTON: "XCT", KRT: "XCT", PAL: "XPX", PALETTE: "XPX", ROLLE: "XRO", SACK: "XSA",
    SET: "SET", PAAR: "PR", PAR: "PR", PAUSCHAL: "LS", PSCH: "LS", LS: "LS",
};
/** C62 ("Einheit") als Rückfall, wenn der BC-Code unbekannt ist. */
function unitCode(bcUnit) {
    const key = bcUnit.trim().toUpperCase();
    if (!key)
        return "C62";
    return UNIT_CODES[key] ?? (/^[A-Z0-9]{2,3}$/.test(key) && Object.values(UNIT_CODES).includes(key) ? key : "C62");
}
// ---------------------------------------------------------------------------
// Pflichtangaben prüfen (Auszug aus EN 16931 / XRechnung) - als Hinweis vor
// dem Erzeugen; formal gültig ist erst, was ein Validator (KoSIT) bestätigt.
// ---------------------------------------------------------------------------
function missingEInvoiceFields(data, profile) {
    const missing = [];
    const need = (value, label) => {
        if (!value || !value.trim())
            missing.push(label);
    };
    need(data.seller.name, "Name des Lieferanten");
    need(data.seller.city, "Ort des Lieferanten");
    need(data.seller.postcode, "PLZ des Lieferanten");
    need(data.seller.country, "Land des Lieferanten");
    need(data.buyer.name, "Name des Käufers");
    need(data.buyer.city, "Ort des Käufers");
    need(data.buyer.postcode, "PLZ des Käufers");
    need(data.buyer.country, "Land des Käufers");
    need(data.iban, "IBAN");
    // BR-S-02 / BR-DE-16: bei steuerpflichtigen Positionen USt-IdNr. des Verkäufers.
    if (data.vatRate > 0)
        need(data.seller.vatId, "USt-IdNr. des Lieferanten");
    for (const [party, label] of [[data.seller, "Lieferanten"], [data.buyer, "Käufers"]]) {
        if (party.vatId && !/^[A-Z]{2}[A-Z0-9+*.]{2,13}$/.test(party.vatId)) {
            missing.push(`gültige USt-IdNr. des ${label} (mit Länderkennung, z. B. DE123456789)`);
        }
    }
    if (data.lines.length === 0)
        missing.push("mindestens eine Rechnungsposition");
    if (profile === "xrechnung") {
        need(data.buyerReference, "Käuferreferenz / Leitweg-ID");
        need(data.seller.email, "E-Mail des Lieferanten");
        need(data.seller.phone, "Telefon des Lieferanten");
        need(data.buyer.email, "E-Mail des Käufers");
    }
    return missing;
}
// ---------------------------------------------------------------------------
// CII-XML
// ---------------------------------------------------------------------------
function xml(value) {
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");
}
function amount(value) {
    return round2(value).toFixed(2);
}
// Menge/Preis: bis zu 4 Nachkommastellen, ohne überflüssige Nullen.
function decimal(value) {
    return String(Number(value.toFixed(4)));
}
function date102(value) {
    const pad = (n) => String(n).padStart(2, "0");
    return `${value.getFullYear()}${pad(value.getMonth() + 1)}${pad(value.getDate())}`;
}
function dateTime(tag, value) {
    return `<${tag}><udt:DateTimeString format="102">${date102(value)}</udt:DateTimeString></${tag}>`;
}
function optional(tag, value) {
    return value && value.trim() ? `<${tag}>${xml(value.trim())}</${tag}>` : "";
}
function address(party) {
    return "<ram:PostalTradeAddress>"
        + optional("ram:PostcodeCode", party.postcode)
        + optional("ram:LineOne", party.street)
        + optional("ram:LineTwo", party.street2)
        + optional("ram:CityName", party.city)
        + `<ram:CountryID>${xml(party.country || "DE")}</ram:CountryID>`
        + "</ram:PostalTradeAddress>";
}
function electronicAddress(party) {
    return party.email?.trim()
        ? `<ram:URIUniversalCommunication><ram:URIID schemeID="EM">${xml(party.email.trim())}</ram:URIID></ram:URIUniversalCommunication>`
        : "";
}
function vatRegistration(party) {
    return party.vatId?.trim()
        ? `<ram:SpecifiedTaxRegistration><ram:ID schemeID="VA">${xml(party.vatId.trim())}</ram:ID></ram:SpecifiedTaxRegistration>`
        : "";
}
function sellerContact(party) {
    const name = party.contactName || party.name;
    if (!name && !party.phone && !party.email)
        return "";
    return "<ram:DefinedTradeContact>"
        + optional("ram:PersonName", name)
        + (party.phone?.trim() ? `<ram:TelephoneUniversalCommunication><ram:CompleteNumber>${xml(party.phone.trim())}</ram:CompleteNumber></ram:TelephoneUniversalCommunication>` : "")
        + (party.email?.trim() ? `<ram:EmailURIUniversalCommunication><ram:URIID>${xml(party.email.trim())}</ram:URIID></ram:EmailURIUniversalCommunication>` : "")
        + "</ram:DefinedTradeContact>";
}
function taxCategory(rate) {
    // Normalsatz "S"; 0 % als "Z" (nullbesteuert).
    return rate > 0 ? "S" : "Z";
}
function buildCiiXml(data, profile) {
    const totals = eInvoiceTotals(data);
    const category = taxCategory(data.vatRate);
    const rate = decimal(data.vatRate);
    const currency = xml(data.currency);
    const lines = data.lines.map((line) => `
    <ram:IncludedSupplyChainTradeLineItem>
      <ram:AssociatedDocumentLineDocument><ram:LineID>${xml(line.id)}</ram:LineID></ram:AssociatedDocumentLineDocument>
      <ram:SpecifiedTradeProduct>${optional("ram:SellerAssignedID", line.itemNo)}<ram:Name>${xml(line.name || line.itemNo || "Position")}</ram:Name></ram:SpecifiedTradeProduct>
      <ram:SpecifiedLineTradeAgreement><ram:NetPriceProductTradePrice><ram:ChargeAmount>${decimal(line.netPrice)}</ram:ChargeAmount></ram:NetPriceProductTradePrice></ram:SpecifiedLineTradeAgreement>
      <ram:SpecifiedLineTradeDelivery><ram:BilledQuantity unitCode="${xml(line.unitCode)}">${decimal(line.quantity)}</ram:BilledQuantity></ram:SpecifiedLineTradeDelivery>
      <ram:SpecifiedLineTradeSettlement>
        <ram:ApplicableTradeTax><ram:TypeCode>VAT</ram:TypeCode><ram:CategoryCode>${category}</ram:CategoryCode><ram:RateApplicablePercent>${rate}</ram:RateApplicablePercent></ram:ApplicableTradeTax>
        <ram:SpecifiedTradeSettlementLineMonetarySummation><ram:LineTotalAmount>${amount(line.lineTotal)}</ram:LineTotalAmount></ram:SpecifiedTradeSettlementLineMonetarySummation>
      </ram:SpecifiedLineTradeSettlement>
    </ram:IncludedSupplyChainTradeLineItem>`).join("");
    return `<?xml version="1.0" encoding="UTF-8"?>
<rsm:CrossIndustryInvoice xmlns:rsm="urn:un:unece:uncefact:data:standard:CrossIndustryInvoice:100" xmlns:ram="urn:un:unece:uncefact:data:standard:ReusableAggregateBusinessInformationEntity:100" xmlns:qdt="urn:un:unece:uncefact:data:standard:QualifiedDataType:100" xmlns:udt="urn:un:unece:uncefact:data:standard:UnqualifiedDataType:100">
  <rsm:ExchangedDocumentContext>
    <ram:BusinessProcessSpecifiedDocumentContextParameter><ram:ID>${BUSINESS_PROCESS_ID}</ram:ID></ram:BusinessProcessSpecifiedDocumentContextParameter>
    <ram:GuidelineSpecifiedDocumentContextParameter><ram:ID>${GUIDELINE_ID[profile]}</ram:ID></ram:GuidelineSpecifiedDocumentContextParameter>
  </rsm:ExchangedDocumentContext>
  <rsm:ExchangedDocument>
    <ram:ID>${xml(data.invoiceNo)}</ram:ID>
    <ram:TypeCode>380</ram:TypeCode>
    ${dateTime("ram:IssueDateTime", data.issueDate)}
    ${data.note ? `<ram:IncludedNote><ram:Content>${xml(data.note)}</ram:Content></ram:IncludedNote>` : ""}
  </rsm:ExchangedDocument>
  <rsm:SupplyChainTradeTransaction>${lines}
    <ram:ApplicableHeaderTradeAgreement>
      ${optional("ram:BuyerReference", data.buyerReference)}
      <ram:SellerTradeParty>
        ${optional("ram:ID", data.seller.id)}
        <ram:Name>${xml(data.seller.name)}</ram:Name>
        ${sellerContact(data.seller)}
        ${address(data.seller)}
        ${electronicAddress(data.seller)}
        ${vatRegistration(data.seller)}
      </ram:SellerTradeParty>
      <ram:BuyerTradeParty>
        <ram:Name>${xml(data.buyer.name)}</ram:Name>
        ${address(data.buyer)}
        ${electronicAddress(data.buyer)}
        ${vatRegistration(data.buyer)}
      </ram:BuyerTradeParty>
      ${data.orderReference ? `<ram:BuyerOrderReferencedDocument><ram:IssuerAssignedID>${xml(data.orderReference)}</ram:IssuerAssignedID></ram:BuyerOrderReferencedDocument>` : ""}
    </ram:ApplicableHeaderTradeAgreement>
    <ram:ApplicableHeaderTradeDelivery>
      ${data.deliveryDate ? `<ram:ActualDeliverySupplyChainEvent>${dateTime("ram:OccurrenceDateTime", data.deliveryDate)}</ram:ActualDeliverySupplyChainEvent>` : ""}
    </ram:ApplicableHeaderTradeDelivery>
    <ram:ApplicableHeaderTradeSettlement>
      <ram:InvoiceCurrencyCode>${currency}</ram:InvoiceCurrencyCode>
      <ram:SpecifiedTradeSettlementPaymentMeans>
        <ram:TypeCode>58</ram:TypeCode>
        <ram:PayeePartyCreditorFinancialAccount><ram:IBANID>${xml(data.iban.replace(/\s+/g, ""))}</ram:IBANID></ram:PayeePartyCreditorFinancialAccount>
      </ram:SpecifiedTradeSettlementPaymentMeans>
      <ram:ApplicableTradeTax>
        <ram:CalculatedAmount>${amount(totals.taxTotal)}</ram:CalculatedAmount>
        <ram:TypeCode>VAT</ram:TypeCode>
        <ram:BasisAmount>${amount(totals.lineTotal)}</ram:BasisAmount>
        <ram:CategoryCode>${category}</ram:CategoryCode>
        <ram:RateApplicablePercent>${rate}</ram:RateApplicablePercent>
      </ram:ApplicableTradeTax>
      <ram:SpecifiedTradePaymentTerms>
        ${optional("ram:Description", data.paymentTerms)}
        ${dateTime("ram:DueDateDateTime", data.dueDate)}
      </ram:SpecifiedTradePaymentTerms>
      <ram:SpecifiedTradeSettlementHeaderMonetarySummation>
        <ram:LineTotalAmount>${amount(totals.lineTotal)}</ram:LineTotalAmount>
        <ram:TaxBasisTotalAmount>${amount(totals.lineTotal)}</ram:TaxBasisTotalAmount>
        <ram:TaxTotalAmount currencyID="${currency}">${amount(totals.taxTotal)}</ram:TaxTotalAmount>
        <ram:GrandTotalAmount>${amount(totals.grandTotal)}</ram:GrandTotalAmount>
        <ram:DuePayableAmount>${amount(totals.grandTotal)}</ram:DuePayableAmount>
      </ram:SpecifiedTradeSettlementHeaderMonetarySummation>
    </ram:ApplicableHeaderTradeSettlement>
  </rsm:SupplyChainTradeTransaction>
</rsm:CrossIndustryInvoice>
`.replace(/\n\s*\n/g, "\n");
}
/**
 * Macht aus der PDF ein PDF/A-3b mit eingebettetem factur-x.xml:
 * sRGB-OutputIntent, XMP-Metadaten (PDF/A + Factur-X-Erweiterungsschema,
 * passend zum Info-Dictionary), Anhang mit AFRelationship "Alternative" und
 * /AF im Katalog, Datei-ID im Trailer.
 */
async function createFacturXPdf(PDFLib, pdfBytes, ciiXml, meta) {
    const { PDFDocument, PDFName, PDFString, PDFHexString } = PDFLib;
    const pdfDoc = await PDFDocument.load(pdfBytes, { updateMetadata: false });
    const context = pdfDoc.context;
    const catalog = pdfDoc.catalog;
    // Sekundengenau - Info-Dictionary und XMP müssen übereinstimmen.
    const now = new Date(Math.floor(Date.now() / 1000) * 1000);
    const producer = "pdfmake + pdf-lib";
    pdfDoc.setTitle(meta.title);
    pdfDoc.setAuthor(meta.author);
    pdfDoc.setSubject(meta.subject);
    pdfDoc.setCreator(producer);
    pdfDoc.setProducer(producer);
    pdfDoc.setCreationDate(now);
    pdfDoc.setModificationDate(now);
    // Anhang factur-x.xml
    const xmlBytes = new TextEncoder().encode(ciiXml);
    const fileStream = context.flateStream(xmlBytes, {
        Type: "EmbeddedFile",
        Subtype: "text/xml",
        Params: { Size: xmlBytes.length, ModDate: PDFString.fromDate(now) },
    });
    const fileStreamRef = context.register(fileStream);
    const fileSpec = context.obj({
        Type: "Filespec",
        F: PDFString.of(exports.FACTURX_FILE_NAME),
        UF: PDFHexString.fromText(exports.FACTURX_FILE_NAME),
        EF: { F: fileStreamRef, UF: fileStreamRef },
        Desc: PDFString.of("Factur-X/ZUGFeRD Rechnung"),
        AFRelationship: "Alternative",
    });
    const fileSpecRef = context.register(fileSpec);
    catalog.set(PDFName.of("Names"), context.obj({
        EmbeddedFiles: { Names: [PDFHexString.fromText(exports.FACTURX_FILE_NAME), fileSpecRef] },
    }));
    catalog.set(PDFName.of("AF"), context.obj([fileSpecRef]));
    // OutputIntent sRGB
    const iccStream = context.flateStream(buildSrgbIccProfile(), { N: 3 });
    const iccRef = context.register(iccStream);
    const outputIntent = context.obj({
        Type: "OutputIntent",
        S: "GTS_PDFA1",
        OutputConditionIdentifier: PDFString.of("sRGB IEC61966-2.1"),
        Info: PDFString.of("sRGB IEC61966-2.1"),
        DestOutputProfile: iccRef,
    });
    catalog.set(PDFName.of("OutputIntents"), context.obj([context.register(outputIntent)]));
    // XMP-Metadaten (unkomprimiert)
    const xmp = buildXmp(meta, producer, now);
    const metadata = context.stream(new TextEncoder().encode(xmp), { Type: "Metadata", Subtype: "XML" });
    catalog.set(PDFName.of("Metadata"), context.register(metadata));
    // Datei-ID im Trailer (PDF/A-Pflicht)
    const id = Array.from(crypto.getRandomValues(new Uint8Array(16)), (b) => b.toString(16).padStart(2, "0")).join("");
    context.trailerInfo.ID = context.obj([PDFHexString.of(id), PDFHexString.of(id)]);
    return pdfDoc.save({ useObjectStreams: false });
}
function xmpDate(value) {
    return value.toISOString().replace(/\.\d{3}Z$/, "Z");
}
function buildXmp(meta, producer, date) {
    const fxProperty = (name, description) => `
            <rdf:li rdf:parseType="Resource">
              <pdfaProperty:name>${name}</pdfaProperty:name>
              <pdfaProperty:valueType>Text</pdfaProperty:valueType>
              <pdfaProperty:category>external</pdfaProperty:category>
              <pdfaProperty:description>${description}</pdfaProperty:description>
            </rdf:li>`;
    return `<?xpacket begin="﻿" id="W5M0MpCehiHzreSzNTczkc9d"?>
<x:xmpmeta xmlns:x="adobe:ns:meta/">
  <rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
    <rdf:Description rdf:about="" xmlns:pdfaid="http://www.aiim.org/pdfa/ns/id/">
      <pdfaid:part>3</pdfaid:part>
      <pdfaid:conformance>B</pdfaid:conformance>
    </rdf:Description>
    <rdf:Description rdf:about="" xmlns:dc="http://purl.org/dc/elements/1.1/">
      <dc:format>application/pdf</dc:format>
      <dc:title><rdf:Alt><rdf:li xml:lang="x-default">${xml(meta.title)}</rdf:li></rdf:Alt></dc:title>
      <dc:creator><rdf:Seq><rdf:li>${xml(meta.author)}</rdf:li></rdf:Seq></dc:creator>
      <dc:description><rdf:Alt><rdf:li xml:lang="x-default">${xml(meta.subject)}</rdf:li></rdf:Alt></dc:description>
    </rdf:Description>
    <rdf:Description rdf:about="" xmlns:xmp="http://ns.adobe.com/xap/1.0/">
      <xmp:CreatorTool>${xml(producer)}</xmp:CreatorTool>
      <xmp:CreateDate>${xmpDate(date)}</xmp:CreateDate>
      <xmp:ModifyDate>${xmpDate(date)}</xmp:ModifyDate>
    </rdf:Description>
    <rdf:Description rdf:about="" xmlns:pdf="http://ns.adobe.com/pdf/1.3/">
      <pdf:Producer>${xml(producer)}</pdf:Producer>
    </rdf:Description>
    <rdf:Description rdf:about="" xmlns:fx="urn:factur-x:pdfa:CrossIndustryDocument:invoice:1p0#">
      <fx:DocumentType>INVOICE</fx:DocumentType>
      <fx:DocumentFileName>${exports.FACTURX_FILE_NAME}</fx:DocumentFileName>
      <fx:Version>1.0</fx:Version>
      <fx:ConformanceLevel>EN 16931</fx:ConformanceLevel>
    </rdf:Description>
    <rdf:Description rdf:about="" xmlns:pdfaExtension="http://www.aiim.org/pdfa/ns/extension/" xmlns:pdfaSchema="http://www.aiim.org/pdfa/ns/schema#" xmlns:pdfaProperty="http://www.aiim.org/pdfa/ns/property#">
      <pdfaExtension:schemas>
        <rdf:Bag>
          <rdf:li rdf:parseType="Resource">
            <pdfaSchema:schema>Factur-X PDFA Extension Schema</pdfaSchema:schema>
            <pdfaSchema:namespaceURI>urn:factur-x:pdfa:CrossIndustryDocument:invoice:1p0#</pdfaSchema:namespaceURI>
            <pdfaSchema:prefix>fx</pdfaSchema:prefix>
            <pdfaSchema:property>
              <rdf:Seq>${fxProperty("DocumentFileName", "The name of the embedded XML document")}${fxProperty("DocumentType", "The type of the hybrid document in capital letters, e.g. INVOICE or ORDER")}${fxProperty("Version", "The actual version of the standard applying to the embedded XML document")}${fxProperty("ConformanceLevel", "The conformance level of the embedded XML document")}
              </rdf:Seq>
            </pdfaSchema:property>
          </rdf:li>
        </rdf:Bag>
      </pdfaExtension:schemas>
    </rdf:Description>
  </rdf:RDF>
</x:xmpmeta>
<?xpacket end="w"?>`;
}
/**
 * Minimales ICC-v2-Profil (Monitor, RGB, Matrix/TRC) mit den sRGB-Primärfarben
 * (D50-adaptiert) und Gamma 2.2 - für den PDF/A-OutputIntent.
 */
function buildSrgbIccProfile() {
    const text = (s) => Array.from(s, (c) => c.charCodeAt(0));
    const u32 = (v) => [(v >>> 24) & 255, (v >>> 16) & 255, (v >>> 8) & 255, v & 255];
    const u16 = (v) => [(v >>> 8) & 255, v & 255];
    const zeros = (n) => new Array(n).fill(0);
    const s15 = (v) => u32(Math.round(v * 65536) >>> 0);
    const xyz = (x, y, z) => [...text("XYZ "), ...zeros(4), ...s15(x), ...s15(y), ...s15(z)];
    const descText = "sRGB IEC61966-2.1";
    const desc = [...text("desc"), ...zeros(4), ...u32(descText.length + 1), ...text(descText), 0, ...u32(0), ...u32(0), ...u16(0), 0, ...zeros(67)];
    const cprt = [...text("text"), ...zeros(4), ...text("No copyright, use freely"), 0];
    const curve = [...text("curv"), ...zeros(4), ...u32(1), ...u16(0x0233)]; // Gamma ~2.2 (u8Fixed8)
    const tags = [
        ["desc", desc],
        ["cprt", cprt],
        ["wtpt", xyz(0.9642, 1.0, 0.8249)],
        ["rXYZ", xyz(0.4361, 0.2225, 0.0139)],
        ["gXYZ", xyz(0.3851, 0.7169, 0.0971)],
        ["bXYZ", xyz(0.1431, 0.0606, 0.7141)],
        ["rTRC", curve],
        ["gTRC", curve],
        ["bTRC", curve],
    ];
    const dataStart = 128 + 4 + tags.length * 12;
    const table = [...u32(tags.length)];
    const data = [];
    const offsets = new Map();
    for (const [signature, bytes] of tags) {
        let offset = offsets.get(bytes);
        if (offset === undefined) {
            offset = dataStart + data.length;
            data.push(...bytes);
            while (data.length % 4)
                data.push(0);
            offsets.set(bytes, offset);
        }
        table.push(...text(signature), ...u32(offset), ...u32(bytes.length));
    }
    const size = dataStart + data.length;
    const header = [
        ...u32(size), ...zeros(4), ...u32(0x02100000), ...text("mntr"), ...text("RGB "), ...text("XYZ "),
        ...u16(2000), ...u16(1), ...u16(1), ...u16(0), ...u16(0), ...u16(0),
        ...text("acsp"), ...zeros(4), ...zeros(4), ...zeros(4), ...zeros(4), ...zeros(8), ...u32(0),
        ...s15(0.9642), ...s15(1.0), ...s15(0.8249), ...zeros(4),
    ];
    header.push(...zeros(128 - header.length));
    return new Uint8Array([...header, ...table, ...data]);
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
const getEmailinboundProfiles_1 = __webpack_require__(/*! ../../../../helper/emailinbound/getEmailinboundProfiles */ "../../helper/emailinbound/getEmailinboundProfiles.ts");
const eInvoice_1 = __webpack_require__(/*! ./eInvoice */ "./src/forms/eInvoice.ts");
/**
 * Formular-Gegenstück zum Script "Rechnung aus Bestellung"
 * (src/scripts/script.ts): Umgebung, Firma und Bestellung aus Business Central
 * wählen, Vorschau prüfen und daraus eine Beispiel-Rechnung als PDF
 * herunterladen (pdfmake, wird bei Bedarf von cdnjs nachgeladen) - wahlweise
 * auch als E-Rechnung: ZUGFeRD-PDF oder XRechnung-XML (siehe eInvoice.ts). Die Daten
 * holt das Script mit seiner App-Registrierung - der Browser bekommt weder
 * Client-Secret noch Business-Central-Token zu sehen.
 *
 * Das Feld-Layout (nur die Content-Komponente "result") liegt als Code in
 * src/forms/form.json und wird von der Toolbox mit ausgerollt.
 *
 * VERSION_COUNTER unten NICHT umbenennen (siehe generateTargetForms.js) und
 * synchron zum VERSION_COUNTER in src/scripts/script.ts halten -
 * .github/workflows/publish-bundles.yml stempelt beim Publish in BEIDE Bundles
 * denselben nächsten Stand (der Wert hier ist nur ein Platzhalter).
 */
const VERSION_COUNTER = 4;
const logger = (0, logger_1.initLogger)(logger_1.LogLevel.INFO);
// Muss exakt dem Script-Namen in toolbox.meta.json ("scripts[].name") entsprechen.
const SCRIPT_NAME = "Rechnung aus Bestellung";
// Komponenten-Key aus src/forms/form.json.
const resultKey = "result";
const PDFMAKE_URL = "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/pdfmake.min.js";
const PDFMAKE_FONTS_URL = "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/vfs_fonts.js";
const PDF_LIB_URL = "https://cdnjs.cloudflare.com/ajax/libs/pdf-lib/1.17.1/pdf-lib.min.js";
const DEFAULT_VAT_RATE = 19;
// E-Rechnung: Test-IBAN (öffentliches Beispielkonto) als Vorbelegung,
// Zahlungsziel und Kennzeichnung als Beispiel (BT-22).
const TEST_IBAN = "DE02120300000000202051";
const PAYMENT_DAYS = 14;
const EXAMPLE_NOTE = "BEISPIEL – keine echte Rechnung";
const FORMATS = [
    { value: "pdf", label: "PDF" },
    { value: "zugferd", label: "ZUGFeRD-PDF (EN 16931)" },
    { value: "xrechnung", label: "XRechnung (XML, CII)" },
];
// ---------------------------------------------------------------------------
// Zustand
// ---------------------------------------------------------------------------
const state = {
    environments: [],
    companies: [],
    orders: [],
    environment: "",
    companyId: "",
    orderNo: "",
    orderFilter: "",
    vatRate: DEFAULT_VAT_RATE,
    // Empfänger der E-Mail (.eml) - vorbelegt in formInit.
    emailTo: "",
    mailboxes: [],
    format: "pdf",
    // Angaben für die E-Rechnung, bei jeder Bestellung neu vorbelegt (selectOrder).
    eInvoice: {
        iban: TEST_IBAN,
        buyerReference: "",
        sellerEmail: "",
        sellerPhone: "",
        sellerVatId: "",
        buyerEmail: "",
        buyerVatId: "",
    },
    details: undefined,
    // Welche Liste gerade lädt (für die Anzeige) und letzter Fehler.
    loading: "",
    error: "",
};
let currentForm;
let mountedRoot;
let scriptId;
// ---------------------------------------------------------------------------
// Script-Aufruf
// ---------------------------------------------------------------------------
async function callScript(payload) {
    const baseUri = window.location.origin;
    if (!scriptId) {
        scriptId = (await (0, getAllScripts_1.getAllScripts)(baseUri, "")).body.find((s) => s.name === SCRIPT_NAME)?.id;
        if (!scriptId) {
            throw new Error(`Script "${SCRIPT_NAME}" wurde nicht gefunden - wurde es bereits über die Toolbox angelegt?`);
        }
    }
    try {
        const response = await (0, callScriptEndpoint_1.callScriptEndpoint)(baseUri, scriptId, "POST", { "Content-Type": "application/json", Accept: "application/json" }, payload);
        const body = response.body;
        if (!body || typeof body !== "object") {
            throw new Error(`Unerwartete Antwort von Script "${SCRIPT_NAME}" - bitte das Tool über die Toolbox aktualisieren.`);
        }
        return body;
    }
    catch (error) {
        // Fehlertext des Scripts ({ error }) aus der HTTP-Fehlermeldung herauslösen.
        const message = getErrorMessage(error);
        const match = message.match(/"error"\s*:\s*"((?:[^"\\]|\\.)*)"/);
        throw new Error(match ? JSON.parse(`"${match[1]}"`) : message);
    }
}
async function loadEnvironments() {
    await runLoading("environments", async () => {
        state.environments = (await callScript({ method: "getEnvironments" })).environments ?? [];
        // Nur eine Umgebung: direkt wählen.
        if (state.environments.length === 1) {
            await selectEnvironment(state.environments[0].name);
        }
    });
}
async function selectEnvironment(name) {
    state.environment = name;
    state.companies = [];
    state.companyId = "";
    resetOrders();
    if (!name)
        return render();
    await runLoading("companies", async () => {
        state.companies = ((await callScript({ method: "getCompanies", environment: name })).companies ?? [])
            .sort((a, b) => a.name.localeCompare(b.name, "de"));
        if (state.companies.length === 1) {
            await selectCompany(state.companies[0].id);
        }
    });
}
async function selectCompany(id) {
    state.companyId = id;
    resetOrders();
    if (!id)
        return render();
    await runLoading("orders", async () => {
        state.orders = ((await callScript({ method: "getOrders", environment: state.environment, companyId: id })).orders ?? [])
            .sort((a, b) => b.no.localeCompare(a.no, "de", { numeric: true }));
    });
}
async function selectOrder(no) {
    state.orderNo = no;
    state.details = undefined;
    if (!no)
        return render();
    await runLoading("order", async () => {
        const details = await callScript({ method: "getOrder", environment: state.environment, companyId: state.companyId, orderNo: no });
        if (state.orderNo === no) {
            state.details = details;
            // IBAN bleibt über Bestellungen hinweg stehen, der Rest kommt aus den Daten.
            state.eInvoice = {
                iban: state.eInvoice.iban || TEST_IBAN,
                buyerReference: String(details.order.no ?? ""),
                sellerEmail: text(details.vendor?.email ?? details.vendor?.eMail),
                sellerPhone: text(details.vendor?.phoneNumber ?? details.vendor?.phoneNo),
                sellerVatId: normalizeVatId(details.vendor?.vatRegistrationNo ?? details.vendor?.vatRegistrationNumber ?? details.vendor?.taxRegistrationNumber, details.vendor?.country ?? details.vendor?.countryRegionCode),
                buyerEmail: text(details.buyer?.email) || state.emailTo,
                buyerVatId: normalizeVatId(details.buyer?.taxRegistrationNumber ?? details.buyer?.vatRegistrationNo, details.buyer?.country),
            };
        }
    });
}
// USt-IdNr. aus BC: Leerzeichen/Punkte/Bindestriche weg; fehlt die
// Länderkennung (in BC bei Inlandsadressen üblich), die des Landes davorsetzen.
function normalizeVatId(value, country) {
    const id = text(value).toUpperCase().replace(/[\s.\-/]/g, "");
    if (!id)
        return "";
    return /^[A-Z]{2}/.test(id) ? id : `${countryCode(country)}${id}`;
}
function text(value) {
    return value === undefined || value === null ? "" : String(value).trim();
}
function resetOrders() {
    state.orders = [];
    state.orderNo = "";
    state.orderFilter = "";
    state.details = undefined;
}
async function runLoading(kind, action) {
    state.loading = kind;
    state.error = "";
    render();
    try {
        await action();
    }
    catch (error) {
        logger.error(`Fehler (${kind}): ${getErrorMessage(error)}`);
        state.error = getErrorMessage(error);
    }
    finally {
        if (state.loading === kind)
            state.loading = "";
        render();
    }
}
// ---------------------------------------------------------------------------
// Rechnungsdaten
// ---------------------------------------------------------------------------
function num(value) {
    const n = typeof value === "number" ? value : Number(value);
    return Number.isFinite(n) ? n : 0;
}
function toInvoiceLines(lines) {
    return lines
        .filter((line) => line && (line.description || line.no || num(line.quantity)))
        .map((line, index) => {
        const quantity = num(line.quantity);
        const unitPrice = num(line.unitCost ?? line.directUnitCost ?? line.unitPrice);
        // Auf Cent gerundet, damit PDF und E-Rechnung dieselben Summen haben.
        const amount = round(line.amount !== undefined || line.lineAmount !== undefined
            ? num(line.amount ?? line.lineAmount)
            : quantity * unitPrice);
        return {
            position: String(line.lineNo ?? line.sequence ?? (index + 1)),
            itemNo: String(line.no ?? line.itemNo ?? line.lineObjectNumber ?? ""),
            description: String(line.description ?? ""),
            quantity,
            unit: String(line.unitOfMeasureCode ?? line.unitOfMeasure ?? ""),
            unitPrice,
            amount,
        };
    });
}
function totals(lines, vatRate) {
    const net = round(lines.reduce((sum, line) => sum + round(line.amount), 0));
    const vat = round(net * vatRate / 100);
    return { net, vat, gross: round(net + vat) };
}
function round(value) {
    return Math.round(value * 100) / 100;
}
function money(value) {
    return value.toLocaleString("de-DE", { style: "currency", currency: "EUR" });
}
function quantityText(value) {
    return value.toLocaleString("de-DE", { maximumFractionDigits: 3 });
}
function formatDate(value) {
    if (!value)
        return "";
    const date = new Date(String(value));
    return isNaN(date.getTime()) || date.getFullYear() < 1900 ? "" : date.toLocaleDateString("de-DE");
}
// Eindeutige Rechnungsnummer aus Datum/Uhrzeit + Zufallsteil.
function generateInvoiceNumber() {
    const d = new Date();
    const pad = (n, len = 2) => String(n).padStart(len, "0");
    return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}${pad(Math.floor(Math.random() * 1000), 3)}`;
}
// Anschriftzeilen von Lieferant (vendor) bzw. Käufer (companyInformation).
function vendorAddressLines(vendor) {
    if (!vendor)
        return [];
    const cityLine = [vendor.postalCode, vendor.city].filter(Boolean).join(" ");
    return [vendor.addressLine1 ?? vendor.address, vendor.addressLine2 ?? vendor.address2, cityLine, vendor.country ?? vendor.countryRegionCode]
        .map((v) => String(v ?? "").trim())
        .filter(Boolean);
}
function companyName(details) {
    return text(details.buyer?.displayName ?? details.buyer?.name) || (state.companies.find((c) => c.id === state.companyId)?.name ?? "");
}
function addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}
function parseDate(value) {
    if (!value)
        return undefined;
    const date = new Date(String(value));
    return isNaN(date.getTime()) || date.getFullYear() < 1900 ? undefined : date;
}
// ISO-Ländercode; BC lässt das Land bei Inlandsadressen oft leer -> "DE".
function countryCode(value) {
    const code = text(value).toUpperCase();
    return /^[A-Z]{2}$/.test(code) ? code : "DE";
}
function paymentTermsText(dueDate) {
    return `Zahlbar bis ${dueDate.toLocaleDateString("de-DE")} ohne Abzug.`;
}
// ---------------------------------------------------------------------------
// E-Rechnung (Daten für eInvoice.ts)
// ---------------------------------------------------------------------------
function buildEInvoiceData(details, invoiceNo, issueDate) {
    const { order, vendor, buyer } = details;
    const party = (source, name, email, extra = {}) => ({
        name,
        street: text(source?.addressLine1 ?? source?.address),
        street2: text(source?.addressLine2 ?? source?.address2),
        postcode: text(source?.postalCode),
        city: text(source?.city),
        country: countryCode(source?.country ?? source?.countryRegionCode),
        email,
        ...extra,
    });
    const vendorName = text(vendor?.displayName ?? vendor?.name ?? order.buyFromVendorName);
    const dueDate = addDays(issueDate, PAYMENT_DAYS);
    return {
        invoiceNo,
        issueDate,
        dueDate,
        deliveryDate: parseDate(order.expectedReceiptDate ?? order.requestedReceiptDate ?? order.orderDate),
        currency: text(order.currencyCode) || text(buyer?.currencyCode) || "EUR",
        buyerReference: state.eInvoice.buyerReference.trim(),
        orderReference: text(order.no),
        note: EXAMPLE_NOTE,
        paymentTerms: paymentTermsText(dueDate),
        iban: state.eInvoice.iban.trim(),
        vatRate: state.vatRate,
        seller: party(vendor, vendorName, state.eInvoice.sellerEmail.trim(), {
            id: text(vendor?.no ?? order.buyFromVendorNo),
            phone: state.eInvoice.sellerPhone.trim(),
            vatId: state.eInvoice.sellerVatId.trim().toUpperCase(),
        }),
        buyer: party(buyer, companyName(details), state.eInvoice.buyerEmail.trim(), {
            vatId: state.eInvoice.buyerVatId.trim().toUpperCase() || undefined,
        }),
        // Text-/Leerzeilen (ohne Menge und Betrag) gehören nicht in die E-Rechnung.
        lines: toInvoiceLines(details.lines)
            .filter((line) => line.quantity !== 0 || line.amount !== 0)
            .map((line) => ({
            id: line.position,
            itemNo: line.itemNo,
            name: line.description,
            quantity: line.quantity,
            unitCode: (0, eInvoice_1.unitCode)(line.unit),
            netPrice: line.unitPrice,
            lineTotal: line.amount,
        })),
    };
}
// ---------------------------------------------------------------------------
// PDF (pdfmake)
// ---------------------------------------------------------------------------
function loadScriptOnce(src) {
    return new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)?.getAttribute("data-loaded") === "true")
            return resolve();
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => {
            script.setAttribute("data-loaded", "true");
            resolve();
        };
        script.onerror = () => reject(new Error(`Konnte ${src} nicht laden.`));
        document.head.appendChild(script);
    });
}
async function loadPdfMake() {
    const w = window;
    if (!w.pdfMake?.vfs) {
        if (!w.pdfMake)
            await loadScriptOnce(PDFMAKE_URL);
        await loadScriptOnce(PDFMAKE_FONTS_URL);
    }
    if (!w.pdfMake?.createPdf)
        throw new Error("pdfmake konnte nicht geladen werden.");
    return w.pdfMake;
}
// eInvoice gesetzt (ZUGFeRD): Zahlungsangaben und Käuferreferenz wie im XML
// zusätzlich sichtbar in die PDF.
function buildDocDefinition(details, vatRate, invoiceNo, issueDate, eInvoice) {
    const { order, vendor } = details;
    const lines = toInvoiceLines(details.lines);
    const sum = totals(lines, vatRate);
    const buyerName = companyName(details);
    // USt-IdNr. (Pflichtangabe auf Rechnungen) - wie im Formular vorbelegt/geändert.
    const sellerVatId = state.eInvoice.sellerVatId.trim().toUpperCase();
    const buyerVatId = state.eInvoice.buyerVatId.trim().toUpperCase();
    const vendorName = String(vendor?.displayName ?? vendor?.name ?? order.buyFromVendorName ?? "");
    const vendorNo = String(vendor?.no ?? order.buyFromVendorNo ?? "");
    const orderDate = formatDate(order.orderDate ?? order.documentDate ?? order.systemCreatedAt);
    const deliveryDate = formatDate(order.expectedReceiptDate ?? order.requestedReceiptDate) || orderDate;
    const infoRow = (label, value) => [{ text: label, color: "#555" }, { text: value, bold: true, alignment: "right" }];
    const right = (text) => ({ text, alignment: "right" });
    return {
        pageSize: "A4",
        pageMargins: [50, 50, 50, 60],
        watermark: { text: "BEISPIEL", color: "#999", opacity: 0.08, bold: true },
        defaultStyle: { fontSize: 10 },
        footer: (current, count) => ({
            columns: [
                { text: "BEISPIEL – keine echte Rechnung", color: "#888", fontSize: 8 },
                { text: `Seite ${current} von ${count}`, alignment: "right", color: "#888", fontSize: 8 },
            ],
            margin: [50, 20, 50, 0],
        }),
        content: [
            { text: "BEISPIEL – KEINE echte Rechnung", color: "#c0392b", bold: true, fontSize: 9, margin: [0, 0, 0, 12] },
            {
                columns: [
                    [
                        { text: vendorName, bold: true, fontSize: 12 },
                        ...vendorAddressLines(vendor).map((text) => ({ text })),
                        ...(sellerVatId ? [{ text: `USt-IdNr.: ${sellerVatId}`, color: "#555" }] : []),
                        { text: "\n" },
                        { text: "Rechnungsempfänger", color: "#555", fontSize: 8 },
                        { text: buyerName, bold: true },
                        ...vendorAddressLines(details.buyer).map((text) => ({ text })),
                        ...(buyerVatId ? [{ text: `USt-IdNr.: ${buyerVatId}`, color: "#555" }] : []),
                    ],
                    {
                        width: 230,
                        stack: [
                            { text: "Rechnung", fontSize: 24, bold: true, alignment: "right", margin: [0, 0, 0, 8] },
                            {
                                table: {
                                    widths: ["*", "auto"],
                                    body: [
                                        infoRow("Rechnungsnummer", invoiceNo),
                                        infoRow("Rechnungsdatum", issueDate.toLocaleDateString("de-DE")),
                                        infoRow("Bestellnummer", String(order.no ?? "")),
                                        ...(eInvoice?.buyerReference ? [infoRow("Käuferreferenz", eInvoice.buyerReference)] : []),
                                        infoRow("Lieferantennummer", vendorNo),
                                        ...(orderDate ? [infoRow("Bestelldatum", orderDate)] : []),
                                        ...(deliveryDate ? [infoRow("Lieferdatum", deliveryDate)] : []),
                                    ],
                                },
                                layout: "noBorders",
                            },
                        ],
                    },
                ],
            },
            { text: "\n\n" },
            { text: `Für Ihre Bestellung ${order.no ?? ""} berechnen wir Ihnen:`, margin: [0, 0, 0, 8] },
            {
                table: {
                    headerRows: 1,
                    widths: ["auto", "auto", "*", "auto", "auto", "auto", "auto"],
                    body: [
                        ["Pos.", "Artikel", "Beschreibung", right("Menge"), "Einheit", right("Einzelpreis"), right("Betrag")].map((cell) => typeof cell === "string" ? { text: cell, bold: true, fillColor: "#eeeeee" } : { ...cell, bold: true, fillColor: "#eeeeee" }),
                        ...lines.map((line) => [
                            line.position,
                            line.itemNo,
                            line.description,
                            right(quantityText(line.quantity)),
                            line.unit,
                            right(money(line.unitPrice)),
                            right(money(line.amount)),
                        ]),
                    ],
                },
                layout: "lightHorizontalLines",
            },
            {
                columns: [
                    { text: "" },
                    {
                        width: 230,
                        margin: [0, 12, 0, 0],
                        table: {
                            widths: ["*", "auto"],
                            body: [
                                ["Nettobetrag", right(money(sum.net))],
                                [`zzgl. ${quantityText(vatRate)} % MwSt.`, right(money(sum.vat))],
                                [{ text: "Gesamtbetrag", bold: true }, { text: money(sum.gross), bold: true, alignment: "right" }],
                            ],
                        },
                        layout: "lightHorizontalLines",
                    },
                ],
            },
            ...(eInvoice ? [{
                    text: `\n${eInvoice.paymentTerms} Bitte überweisen Sie ${money(sum.gross)} auf die IBAN ${eInvoice.iban}.`,
                }] : []),
            { text: "\n\nEs gelten unsere allgemeinen Geschäftsbedingungen. Diese sind auf unserer Homepage einzusehen.", color: "#555" },
        ],
    };
}
async function loadPdfLib() {
    const w = window;
    if (!w.PDFLib)
        await loadScriptOnce(PDF_LIB_URL);
    if (!w.PDFLib?.PDFDocument)
        throw new Error("pdf-lib konnte nicht geladen werden.");
    return w.PDFLib;
}
// Erzeugt die Rechnung im gewählten Format - jedes Mal mit neuer Rechnungsnummer.
async function createInvoiceFile(details, format) {
    const invoiceNo = generateInvoiceNumber();
    const issueDate = new Date();
    const baseName = `Rechnung_${String(details.order.no ?? "").replace(/[^\w-]+/g, "_")}_${invoiceNo}`;
    if (format === "xrechnung") {
        const xml = (0, eInvoice_1.buildCiiXml)(buildEInvoiceData(details, invoiceNo, issueDate), "xrechnung");
        return { blob: new Blob([xml], { type: "application/xml" }), fileName: `X${baseName}.xml`, contentType: "application/xml", invoiceNo };
    }
    const eInvoice = format === "zugferd" ? buildEInvoiceData(details, invoiceNo, issueDate) : undefined;
    const pdfMake = await loadPdfMake();
    const doc = pdfMake.createPdf(buildDocDefinition(details, state.vatRate, invoiceNo, issueDate, eInvoice));
    const pdf = await new Promise((resolve) => doc.getBlob((b) => resolve(b)));
    if (!eInvoice) {
        return { blob: pdf, fileName: `${baseName}.pdf`, contentType: "application/pdf", invoiceNo };
    }
    const bytes = await (0, eInvoice_1.createFacturXPdf)(await loadPdfLib(), new Uint8Array(await pdf.arrayBuffer()), (0, eInvoice_1.buildCiiXml)(eInvoice, "zugferd"), {
        title: `Rechnung ${invoiceNo}`,
        author: eInvoice.seller.name || "Lieferant",
        subject: `Rechnung ${invoiceNo} zur Bestellung ${eInvoice.orderReference} (${EXAMPLE_NOTE})`,
    });
    return { blob: new Blob([bytes], { type: "application/pdf" }), fileName: `${baseName}_ZUGFeRD.pdf`, contentType: "application/pdf", invoiceNo };
}
async function downloadInvoice() {
    const details = state.details;
    if (!details)
        return;
    await runLoading("pdf", async () => {
        const { blob, fileName } = await createInvoiceFile(details, state.format);
        (0, tableExport_1.downloadBlob)(blob, fileName);
    });
}
// ---------------------------------------------------------------------------
// E-Mail (.eml) mit der PDF im Anhang - "X-Unsent: 1": Outlook & Co. öffnen
// die Datei als Entwurf, der nur noch abgeschickt werden muss.
// ---------------------------------------------------------------------------
// Postfach, das das Onboarding (Toolbox_OnboardingGevisECMDocumentReader)
// für den Rechnungsleser anlegt - bevorzugte Vorbelegung.
const PREFERRED_MAILBOX = "fruehesscannenmail";
// Lädt die E-Mail-Eingangs-Postfächer des Mandanten (Auswahlliste) und belegt
// den Empfänger vor: bevorzugt PREFERRED_MAILBOX, sonst das Standard-Postfach
// bzw. das erste. Ohne Zugriff bleibt das Feld frei editierbar.
async function loadMailboxes() {
    try {
        const settings = (await (0, getEmailinboundProfiles_1.getEmailinboundProfiles)(window.location.origin, "")).body.mailStoreSettings ?? [];
        state.mailboxes = settings.map((m) => String(m.mailbox ?? "")).filter(Boolean).sort();
        if (!state.emailTo) {
            state.emailTo = state.mailboxes.find((m) => m.split("@")[0].toLowerCase() === PREFERRED_MAILBOX)
                ?? settings.find((m) => m.isDefaultMailbox)?.mailbox
                ?? state.mailboxes[0]
                ?? "";
        }
    }
    catch (error) {
        logger.warn(`E-Mail-Eingangs-Postfächer nicht ladbar: ${getErrorMessage(error)}`);
    }
    render();
}
function isValidEmail(value) {
    return /^[^\s@<>",;]+@[^\s@<>",;]+\.[^\s@<>",;]+$/.test(value);
}
function blobToBase64(blob) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(String(reader.result).split(",")[1] ?? "");
        reader.onerror = () => reject(reader.error);
        reader.readAsDataURL(blob);
    });
}
function utf8ToBase64(value) {
    const bytes = new TextEncoder().encode(value);
    let binary = "";
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return btoa(binary);
}
// Base64 in Zeilen zu 76 Zeichen (RFC 2045).
function wrapBase64(value) {
    return value.replace(/.{1,76}/g, "$&\r\n");
}
// Kopfzeile mit Umlauten nach RFC 2047 kodieren.
function encodeHeader(value) {
    return /^[\x20-\x7e]*$/.test(value) ? value : `=?UTF-8?B?${utf8ToBase64(value)}?=`;
}
function buildEml(to, subject, html, attachment) {
    const boundary = `=_${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`;
    const messageId = `<${Date.now().toString(36)}.${Math.random().toString(36).slice(2)}@${window.location.hostname || "localhost"}>`;
    return [
        `Date: ${new Date().toUTCString()}`,
        `To: ${to}`,
        `Subject: ${encodeHeader(subject)}`,
        `Message-ID: ${messageId}`,
        "X-Unsent: 1",
        "MIME-Version: 1.0",
        `Content-Type: multipart/mixed; boundary="${boundary}"`,
        "",
        `--${boundary}`,
        "Content-Type: text/html; charset=utf-8",
        "Content-Transfer-Encoding: base64",
        "",
        wrapBase64(utf8ToBase64(html)),
        `--${boundary}`,
        `Content-Type: ${attachment.contentType}; name="${attachment.name}"`,
        "Content-Transfer-Encoding: base64",
        `Content-Disposition: attachment; filename="${attachment.name}"`,
        "",
        wrapBase64(attachment.base64),
        `--${boundary}--`,
        "",
    ].join("\r\n");
}
async function downloadEml() {
    const details = state.details;
    if (!details)
        return;
    const to = state.emailTo.trim();
    if (!isValidEmail(to)) {
        state.error = "Bitte eine gültige Empfänger-Adresse angeben.";
        render();
        return;
    }
    await runLoading("pdf", async () => {
        const { blob, fileName, contentType, invoiceNo } = await createInvoiceFile(details, state.format);
        const html = "<html><body>Sehr geehrte Damen und Herren,<br/><br/>im Anhang finden Sie die Rechnung "
            + `${escapeHtml(invoiceNo)} zu Ihrer Bestellung ${escapeHtml(String(details.order.no ?? ""))}.`
            + "<br/><br/>Mit freundlichen Grüßen</body></html>";
        const eml = buildEml(to, `Rechnung ${invoiceNo}`, html, { name: fileName, contentType, base64: await blobToBase64(blob) });
        (0, tableExport_1.downloadBlob)(new Blob([eml], { type: "message/rfc822" }), fileName.replace(/\.(pdf|xml)$/, ".eml"));
    });
}
// ---------------------------------------------------------------------------
// Darstellung
// ---------------------------------------------------------------------------
const styles = `
<style>
  .ipo-section { border: 1px solid #dee2e6; border-radius: 6px; background: #fff; }
  .ipo-header { padding: 10px 12px; border-bottom: 1px solid #dee2e6; background: #f8f9fa; border-radius: 6px 6px 0 0; font-weight: 600; font-size: 1.05em; }
  .ipo-body { padding: 12px; }
  .ipo-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 12px; align-items: end; }
  .ipo-field label { display: block; font-size: 0.85em; font-weight: 600; color: #495057; margin-bottom: 3px; }
  .ipo-order-select { margin-top: 4px; }
  .ipo-loading { display: flex; align-items: center; gap: 8px; color: #6c757d; margin-top: 12px; }
  .ipo-error { color: #842029; background: #f8d7da; border: 1px solid #f5c2c7; border-radius: 6px; padding: 10px 12px; margin-top: 12px; }
  .ipo-preview { margin-top: 16px; border-top: 1px solid #dee2e6; padding-top: 12px; }
  .ipo-meta { display: flex; flex-wrap: wrap; gap: 6px 18px; margin-bottom: 10px; }
  .ipo-meta span { color: #6c757d; }
  .ipo-table-wrap { max-height: 45vh; overflow: auto; border: 1px solid #dee2e6; border-radius: 6px; }
  .ipo-table { margin: 0; font-size: 0.9em; }
  .ipo-table thead th { position: sticky; top: 0; background: #f8f9fa; white-space: nowrap; }
  .ipo-num { text-align: right; white-space: nowrap; font-variant-numeric: tabular-nums; }
  .ipo-totals { display: flex; justify-content: flex-end; gap: 18px; flex-wrap: wrap; margin-top: 10px; }
  .ipo-totals strong { font-variant-numeric: tabular-nums; }
  .ipo-actions { display: flex; justify-content: flex-end; align-items: flex-end; gap: 8px; flex-wrap: wrap; margin-top: 12px; }
  .ipo-email { flex: 0 1 380px; }
  .ipo-einvoice { margin-top: 14px; padding: 10px 12px; border: 1px solid #dee2e6; border-radius: 6px; background: #f8f9fa; }
  .ipo-einvoice-title { font-weight: 600; margin-bottom: 8px; }
  .ipo-hint { margin-top: 8px; font-size: 0.85em; color: #6c4a00; }
  .ipo-muted { color: #adb5bd; font-style: italic; }
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
    return error && typeof error === "object" && "message" in error ? String(error.message) : String(error);
}
function option(value, label, selected) {
    return `<option value="${escapeHtml(value)}"${selected ? " selected" : ""}>${escapeHtml(label)}</option>`;
}
function filteredOrders() {
    const filter = state.orderFilter.trim().toLowerCase();
    if (!filter)
        return state.orders;
    return state.orders.filter((o) => `${o.no} ${o.vendorNo} ${o.vendorName}`.toLowerCase().includes(filter));
}
function orderOptionsHtml() {
    const orders = filteredOrders();
    const placeholder = state.orders.length
        ? `– Bestellung wählen (${orders.length} von ${state.orders.length}) –`
        : "– keine Bestellungen –";
    return option("", placeholder, !state.orderNo) + orders
        .map((o) => option(o.no, [o.no, o.vendorName || o.vendorNo, formatDate(o.date)].filter(Boolean).join(" · "), o.no === state.orderNo))
        .join("");
}
function renderPreview() {
    const details = state.details;
    if (!details)
        return "";
    const lines = toInvoiceLines(details.lines);
    const sum = totals(lines, state.vatRate);
    const vendor = details.vendor;
    const vendorName = String(vendor?.displayName ?? vendor?.name ?? details.order.buyFromVendorName ?? "");
    const rows = lines.length
        ? lines.map((line) => `
        <tr>
          <td>${escapeHtml(line.position)}</td>
          <td>${escapeHtml(line.itemNo)}</td>
          <td>${escapeHtml(line.description)}</td>
          <td class="ipo-num">${quantityText(line.quantity)}</td>
          <td>${escapeHtml(line.unit)}</td>
          <td class="ipo-num">${money(line.unitPrice)}</td>
          <td class="ipo-num">${money(line.amount)}</td>
        </tr>`).join("")
        : `<tr><td colspan="7" class="ipo-muted">Die Bestellung hat keine Zeilen.</td></tr>`;
    return `
    <div class="ipo-preview">
      <div class="ipo-meta">
        <div><span>Bestellung</span> <strong>${escapeHtml(String(details.order.no ?? ""))}</strong></div>
        <div><span>Lieferant</span> <strong>${escapeHtml([vendor?.no ?? details.order.buyFromVendorNo, vendorName].filter(Boolean).join(" – "))}</strong></div>
        <div><span>Anschrift</span> ${escapeHtml(vendorAddressLines(vendor).join(", ") || "–")}</div>
      </div>
      <div class="ipo-table-wrap">
        <table class="table table-sm table-striped ipo-table">
          <thead><tr><th>Pos.</th><th>Artikel</th><th>Beschreibung</th><th class="ipo-num">Menge</th><th>Einheit</th><th class="ipo-num">Einzelpreis</th><th class="ipo-num">Betrag</th></tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
      <div class="ipo-totals">
        <div>Netto <strong>${money(sum.net)}</strong></div>
        <div>MwSt. <strong>${money(sum.vat)}</strong></div>
        <div>Gesamt <strong>${money(sum.gross)}</strong></div>
      </div>
      ${renderEInvoiceOptions(details)}
      <div class="ipo-actions">
        <div class="ipo-field">
          <label>Format</label>
          <select class="form-control" data-ipo="format">
            ${FORMATS.map((f) => option(f.value, f.label, f.value === state.format)).join("")}
          </select>
        </div>
        <div class="ipo-field ipo-email">
          <label>Empfänger der E-Mail</label>
          <input type="email" class="form-control" list="ipo-mailboxes" data-ipo="emailTo" value="${escapeHtml(state.emailTo)}" placeholder="postfach@….emailinbound.service.d-velop.cloud">
          <datalist id="ipo-mailboxes">${state.mailboxes.map((m) => `<option value="${escapeHtml(m)}"></option>`).join("")}</datalist>
        </div>
        <button type="button" class="btn btn-outline-primary" data-ipo="downloadEml"${state.loading ? " disabled" : ""} title="E-Mail-Entwurf mit der Rechnung als Anhang, z. B. an den Rechnungsleser">Als E-Mail (.eml) herunterladen</button>
        <button type="button" class="btn btn-primary" data-ipo="download"${state.loading ? " disabled" : ""}>Rechnung herunterladen</button>
      </div>
    </div>`;
}
// Felder und Hinweise zur E-Rechnung - nur bei ZUGFeRD/XRechnung.
function renderEInvoiceOptions(details) {
    if (state.format === "pdf")
        return "";
    const profile = state.format;
    const field = (key, label, type = "text", hint = "") => `
        <div class="ipo-field">
          <label>${escapeHtml(label)}</label>
          <input type="${type}" class="form-control" data-ipo-einv="${key}" value="${escapeHtml(state.eInvoice[key])}"${hint ? ` placeholder="${escapeHtml(hint)}"` : ""}>
        </div>`;
    return `
    <div class="ipo-einvoice">
      <div class="ipo-einvoice-title">Angaben für die E-Rechnung</div>
      <div class="ipo-grid">
        ${field("iban", "IBAN des Lieferanten", "text", TEST_IBAN)}
        ${field("buyerReference", profile === "xrechnung" ? "Käuferreferenz / Leitweg-ID" : "Käuferreferenz")}
        ${field("sellerEmail", "E-Mail des Lieferanten", "email")}
        ${field("sellerPhone", "Telefon des Lieferanten", "tel")}
        ${field("sellerVatId", "USt-IdNr. des Lieferanten", "text", "DE123456789")}
        ${field("buyerEmail", "E-Mail des Käufers", "email")}
        ${field("buyerVatId", "USt-IdNr. des Käufers (optional)", "text", "DE123456789")}
      </div>
      <div class="ipo-hint" data-ipo="einvHint">${eInvoiceHintHtml(details, profile)}</div>
    </div>`;
}
function eInvoiceHintHtml(details, profile) {
    const missing = (0, eInvoice_1.missingEInvoiceFields)(buildEInvoiceData(details, "0", new Date()), profile);
    return (missing.length
        ? `<strong>Es fehlen Pflichtangaben:</strong> ${escapeHtml(missing.join(", "))}.`
        : "Pflichtangaben vollständig.");
}
function renderContent() {
    const loadingText = {
        environments: "Umgebungen werden geladen…",
        companies: "Firmen werden geladen…",
        orders: "Bestellungen werden geladen…",
        order: "Bestellung wird geladen…",
        pdf: "Rechnung wird erzeugt…",
    };
    const busy = !!state.loading;
    return `
  <div class="ipo-section">
    <div class="ipo-header">Rechnung aus Bestellung</div>
    <div class="ipo-body">
      <div class="ipo-grid">
        <div class="ipo-field">
          <label>Umgebung</label>
          <select class="form-control" data-ipo="environment"${busy ? " disabled" : ""}>
            ${option("", "– Umgebung wählen –", !state.environment)}
            ${state.environments.map((e) => option(e.name, e.type ? `${e.name} (${e.type})` : e.name, e.name === state.environment)).join("")}
          </select>
        </div>
        <div class="ipo-field">
          <label>Firma</label>
          <select class="form-control" data-ipo="company"${busy || !state.environment ? " disabled" : ""}>
            ${option("", "– Firma wählen –", !state.companyId)}
            ${state.companies.map((c) => option(c.id, c.name, c.id === state.companyId)).join("")}
          </select>
        </div>
        <div class="ipo-field">
          <label>MwSt.-Satz (%)</label>
          <input type="number" class="form-control" min="0" max="100" step="0.1" data-ipo="vat" value="${state.vatRate}">
        </div>
      </div>
      <div class="ipo-field" style="margin-top:12px;">
        <label>Bestellung</label>
        <input type="search" class="form-control" placeholder="Suchen nach Nummer oder Lieferant…" data-ipo="orderFilter" value="${escapeHtml(state.orderFilter)}"${!state.companyId ? " disabled" : ""}>
        <select class="form-control ipo-order-select" data-ipo="order"${busy || !state.companyId ? " disabled" : ""}>${orderOptionsHtml()}</select>
      </div>
      ${busy ? `<div class="ipo-loading"><span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>${loadingText[state.loading] ?? ""}</div>` : ""}
      ${state.error ? `<div class="ipo-error"><strong>Fehler:</strong> ${escapeHtml(state.error)}</div>` : ""}
      ${renderPreview()}
    </div>
  </div>`;
}
// Wie in der Toolbox: direkt in das Kind-Element ref="html" der
// HTML-Element-Komponente rendern.
function getContentHost(form) {
    const component = form.getComponent?.(resultKey);
    if (!component)
        return undefined;
    return component.refs?.html ?? component.element?.querySelector?.('[ref="html"]') ?? component.element ?? undefined;
}
function render() {
    const host = currentForm ? getContentHost(currentForm) : undefined;
    if (!host) {
        logger.warn(`Komponente "${resultKey}" nicht im Formular gefunden (oder noch nicht gerendert).`);
        return;
    }
    host.innerHTML = `${styles}<div data-ipo-root>${renderContent()}</div>`;
    mountedRoot = host.querySelector("[data-ipo-root]") ?? undefined;
    if (mountedRoot)
        bindEvents(mountedRoot);
}
// Listener direkt an die Elemente, bewusst ohne "instanceof HTMLElement"
// (dforms führt das Bundle ggf. in einem anderen Fenster-Kontext aus).
function bindEvents(root) {
    const el = (name) => root.querySelector(`[data-ipo="${name}"]`);
    el("environment")?.addEventListener("change", (e) => {
        void selectEnvironment(e.target.value);
    });
    el("company")?.addEventListener("change", (e) => {
        void selectCompany(e.target.value);
    });
    el("order")?.addEventListener("change", (e) => {
        void selectOrder(e.target.value);
    });
    // Suche: nur die Optionen austauschen, damit Fokus/Cursor im Suchfeld bleiben.
    el("orderFilter")?.addEventListener("input", (e) => {
        state.orderFilter = e.target.value;
        const select = el("order");
        if (select)
            select.innerHTML = orderOptionsHtml();
    });
    el("vat")?.addEventListener("change", (e) => {
        const value = Number(e.target.value);
        state.vatRate = Number.isFinite(value) && value >= 0 && value <= 100 ? value : DEFAULT_VAT_RATE;
        render();
    });
    el("download")?.addEventListener("click", () => {
        void downloadInvoice();
    });
    el("format")?.addEventListener("change", (e) => {
        state.format = e.target.value;
        render();
    });
    // E-Rechnungs-Felder: nur den Hinweis auf fehlende Pflichtangaben
    // austauschen, damit Fokus/Cursor erhalten bleiben.
    root.querySelectorAll("[data-ipo-einv]").forEach((input) => {
        const key = input.getAttribute("data-ipo-einv");
        input.addEventListener("input", () => {
            state.eInvoice[key] = input.value;
            const hint = el("einvHint");
            if (hint && state.details && state.format !== "pdf")
                hint.innerHTML = eInvoiceHintHtml(state.details, state.format);
        });
    });
    el("emailTo")?.addEventListener("input", (e) => {
        state.emailTo = e.target.value;
    });
    el("downloadEml")?.addEventListener("click", () => {
        void downloadEml();
    });
}
window.formInit = function (form, data) {
    logger.debug(`Rechnung aus Bestellung initialisiert (Version ${VERSION_COUNTER}).`);
    currentForm = form;
    form.on?.("render", () => {
        if (!mountedRoot?.isConnected)
            render();
    });
    render();
    void loadEnvironments();
    void loadMailboxes();
};

})();

window.InvoiceFromPurchaseOrderFormBundle = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=formBundle.js.map