/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "../../helper/classcon-documentreader/d3EndpointService.ts"
/*!*****************************************************************!*\
  !*** ../../helper/classcon-documentreader/d3EndpointService.ts ***!
  \*****************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getD3EndpointService = getD3EndpointService;
exports.saveD3EndpointService = saveD3EndpointService;
const performHttpRequest_1 = __webpack_require__(/*! ../performHttpRequest/performHttpRequest */ "../../helper/performHttpRequest/performHttpRequest.ts");
const FIELDS = ["ApiKey", "RepositoryId", "D3Owner", "EndpointServiceOutputStructure"];
function endpointUrl(baseUri, subscriptionId) {
    return `${baseUri}/classcon-documentreader/Configuration/D3EndpointService?subscriptionId=${encodeURIComponent(subscriptionId)}`;
}
function authHeaders(token) {
    return token ? { Authorization: `Bearer ${token}` } : {};
}
// Felder ohne Rücksicht auf Groß-/Kleinschreibung übernehmen (JSON kann camelCase sein).
function pick(raw) {
    const lookup = new Map(Object.entries(raw).map(([key, value]) => [key.toLowerCase(), value]));
    const result = {};
    for (const field of FIELDS) {
        const value = lookup.get(field.toLowerCase());
        if (value !== undefined && value !== null)
            result[field] = String(value);
    }
    return result;
}
// HTML-Konfigurationsseite: Formularfelder mit den Namen aus FIELDS auslesen
// (ohne instanceof - anderer Fenster-Kontext möglich).
function parseHtml(html) {
    if (typeof DOMParser === "undefined")
        return undefined;
    const doc = new DOMParser().parseFromString(html, "text/html");
    const raw = {};
    doc.querySelectorAll("input[name], select[name], textarea[name]").forEach((element) => {
        const type = element.tagName === "INPUT" ? element.type : "";
        if (type === "radio" && !element.checked)
            return;
        if (FIELDS.some((field) => field.toLowerCase() === element.name.toLowerCase())) {
            raw[element.name] = element.value;
        }
    });
    const result = pick(raw);
    return Object.keys(result).length ? result : undefined;
}
/**
 * Liest das eingerichtete Zielsystem
 * (GET /classcon-documentreader/Configuration/D3EndpointService?subscriptionId=...).
 * Versteht JSON und die HTML-Konfigurationsseite. undefined = nicht lesbar.
 */
async function getD3EndpointService(baseUri, token, subscriptionId) {
    const response = await (0, performHttpRequest_1.performHttpRequest)(endpointUrl(baseUri, subscriptionId), {
        method: "GET",
        headers: { ...authHeaders(token), Accept: "application/json, text/html;q=0.9" },
    });
    if (typeof response.body === "string") {
        try {
            return pick(JSON.parse(response.body));
        }
        catch {
            return parseHtml(response.body);
        }
    }
    return response.body && typeof response.body === "object" ? pick(response.body) : undefined;
}
/**
 * Richtet das Zielsystem ein - wie die Oberfläche: POST als Formulardaten
 * ApiKey=...&RepositoryId=...&D3Owner=Editor&EndpointServiceOutputStructure=MainDocWithAttachments.
 */
async function saveD3EndpointService(baseUri, token, subscriptionId, settings) {
    const body = new URLSearchParams();
    for (const field of FIELDS) {
        body.set(field, settings[field]);
    }
    return await (0, performHttpRequest_1.performHttpRequest)(endpointUrl(baseUri, subscriptionId), {
        method: "POST",
        headers: {
            ...authHeaders(token),
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
        body: body.toString(),
    });
}


/***/ },

/***/ "../../helper/classcon-documentreader/endpointServices.ts"
/*!****************************************************************!*\
  !*** ../../helper/classcon-documentreader/endpointServices.ts ***!
  \****************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getConfiguredEndpointServices = getConfiguredEndpointServices;
const performHttpRequest_1 = __webpack_require__(/*! ../performHttpRequest/performHttpRequest */ "../../helper/performHttpRequest/performHttpRequest.ts");
/**
 * Liefert die Namen der im Rechnungsleser eingerichteten Zielsysteme, z.B.
 * ["D3EndpointService", "MetadataEndpointService"].
 *
 * Quelle ist die Übersichtsseite "Zielsysteme"
 * (GET /classcon-documentreader/Configuration?subscriptionId=...), die jedes
 * eingerichtete Zielsystem als <li class="mdc-list-item" id="<Name>"> listet.
 * Die Details eines Zielsystems liefert GET
 * /classcon-documentreader/Configuration/<Name>?subscriptionId=... (siehe
 * d3EndpointService.ts / metadataEndpointService.ts).
 */
async function getConfiguredEndpointServices(baseUri, token, subscriptionId) {
    const response = await (0, performHttpRequest_1.performHttpRequest)(`${baseUri}/classcon-documentreader/Configuration?subscriptionId=${encodeURIComponent(subscriptionId)}`, {
        method: "GET",
        headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}), Accept: "text/html" },
    });
    if (typeof response.body !== "string" || typeof DOMParser === "undefined") {
        throw new Error("Die Zielsysteme des Rechnungslesers konnten nicht gelesen werden.");
    }
    const doc = new DOMParser().parseFromString(response.body, "text/html");
    // Nur Einträge MIT id - die Auswahllisten der Seite (Exportformat usw.)
    // nutzen dieselbe Klasse, aber data-value statt id.
    return Array.from(doc.querySelectorAll(".mdc-list-group li.mdc-list-item[id]"))
        .map((item) => item.getAttribute("id") ?? "")
        .filter(Boolean);
}


/***/ },

/***/ "../../helper/classcon-documentreader/extensionPoints.ts"
/*!***************************************************************!*\
  !*** ../../helper/classcon-documentreader/extensionPoints.ts ***!
  \***************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getExtensionPoints = getExtensionPoints;
exports.saveExtensionPoints = saveExtensionPoints;
const performHttpRequest_1 = __webpack_require__(/*! ../performHttpRequest/performHttpRequest */ "../../helper/performHttpRequest/performHttpRequest.ts");
const FIELDS = [
    "NodeId",
    "IsActivated",
    "ExtensionPointType",
    "ConnectionString",
    "QueueName",
    "ScriptingAppEndpoint",
    "ScriptingEngineProfile",
];
function extensionPointsUrl(baseUri, subscriptionId) {
    return `${baseUri}/classcon-documentreader/Configuration/ExtensionPoints?subscriptionId=${encodeURIComponent(subscriptionId)}`;
}
function toExtensionPoint(raw) {
    // Schlüssel ohne Rücksicht auf Groß-/Kleinschreibung (JSON kann camelCase sein).
    const lookup = new Map(Object.entries(raw).map(([key, value]) => [key.toLowerCase(), value]));
    const text = (field) => {
        const value = lookup.get(field.toLowerCase());
        return value === undefined || value === null ? "" : String(value);
    };
    return {
        NodeId: text("NodeId"),
        IsActivated: ["true", "on", "1"].includes(text("IsActivated").toLowerCase()),
        ExtensionPointType: text("ExtensionPointType"),
        ConnectionString: text("ConnectionString"),
        QueueName: text("QueueName"),
        ScriptingAppEndpoint: text("ScriptingAppEndpoint"),
        ScriptingEngineProfile: text("ScriptingEngineProfile"),
    };
}
// JSON-Antwort: Liste direkt oder unter "ExtensionPoints"/"extensionPoints".
function parseJson(body) {
    const data = body;
    const list = Array.isArray(data) ? data : data?.ExtensionPoints ?? data?.extensionPoints;
    return Array.isArray(list) ? list.map(toExtensionPoint) : undefined;
}
// HTML-Antwort (Konfigurationsseite): Formularfelder "ExtensionPoints[i].<Feld>"
// auslesen. Checkboxen (IsActivated) über ihren checked-Zustand, da ASP.NET
// daneben ein verstecktes Feld "false" mit demselben Namen rendert.
function parseHtml(html) {
    if (typeof DOMParser === "undefined") {
        return undefined;
    }
    const doc = new DOMParser().parseFromString(html, "text/html");
    const entries = new Map();
    const checkboxes = new Set();
    doc.querySelectorAll("input[name], select[name], textarea[name]")
        .forEach((element) => {
        const match = element.name.match(/^ExtensionPoints\[(\d+)\]\.(\w+)$/);
        if (!match)
            return;
        const index = Number(match[1]);
        const field = match[2];
        const entry = entries.get(index) ?? {};
        entries.set(index, entry);
        // Ohne instanceof (anderer Fenster-Kontext möglich), daher über type.
        const type = element.tagName === "INPUT" ? element.type : "";
        if (type === "checkbox") {
            checkboxes.add(element.name);
            entry[field] = element.checked ? "true" : "false";
        }
        else if (type === "radio") {
            if (element.checked)
                entry[field] = element.value;
        }
        else if (!checkboxes.has(element.name)) {
            // Verstecktes "false" hinter einer Checkbox wird oben übersprungen;
            // steht es davor, überschreibt die Checkbox den Wert anschließend.
            entry[field] = element.value;
        }
    });
    if (entries.size === 0) {
        return undefined;
    }
    return [...entries.keys()].sort((a, b) => a - b).map((index) => toExtensionPoint(entries.get(index)));
}
/**
 * Liest ALLE Extension Points eines Rechnungslesers
 * (GET /classcon-documentreader/Configuration/ExtensionPoints?subscriptionId=...).
 * Versteht eine JSON-Antwort sowie die HTML-Konfigurationsseite (nur im
 * Browser). Wirft, wenn keine Einträge erkennbar sind - saveExtensionPoints
 * darf nie mit einer unvollständigen Liste aufgerufen werden, sonst würden
 * die übrigen Extension Points überschrieben.
 */
async function getExtensionPoints(baseUri, token, subscriptionId) {
    const headers = {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        Accept: "application/json, text/html;q=0.9",
    };
    const response = await (0, performHttpRequest_1.performHttpRequest)(extensionPointsUrl(baseUri, subscriptionId), { method: "GET", headers });
    const points = typeof response.body === "string"
        ? parseHtml(response.body) ?? (() => { try {
            return parseJson(JSON.parse(response.body));
        }
        catch {
            return undefined;
        } })()
        : parseJson(response.body);
    if (!points || points.length === 0) {
        throw new Error("Die Extension Points des Rechnungslesers konnten nicht gelesen werden - es wird nichts gespeichert.");
    }
    return points;
}
/**
 * Speichert die KOMPLETTE Liste der Extension Points (POST, Formulardaten
 * "ExtensionPoints[i].<Feld>" wie die Konfigurationsseite). Immer vorher mit
 * getExtensionPoints laden und nur den gewünschten Eintrag ändern.
 */
async function saveExtensionPoints(baseUri, token, subscriptionId, points) {
    const headers = {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    };
    const body = new URLSearchParams();
    points.forEach((point, index) => {
        for (const field of FIELDS) {
            body.append(`ExtensionPoints[${index}].${field}`, String(point[field] ?? ""));
        }
    });
    return await (0, performHttpRequest_1.performHttpRequest)(extensionPointsUrl(baseUri, subscriptionId), {
        method: "POST",
        headers,
        body: body.toString(),
    });
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

/***/ "../../helper/classcon-documentreader/masterFile.ts"
/*!**********************************************************!*\
  !*** ../../helper/classcon-documentreader/masterFile.ts ***!
  \**********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getMasterFileRequestToken = getMasterFileRequestToken;
exports.uploadMasterFile = uploadMasterFile;
exports.buildMasterFileCsv = buildMasterFileCsv;
exports.invalidMasterFileValue = invalidMasterFileValue;
const performHttpRequest_1 = __webpack_require__(/*! ../performHttpRequest/performHttpRequest */ "../../helper/performHttpRequest/performHttpRequest.ts");
/**
 * Stammdaten des Rechnungslesers (CC_Companies.csv, CC_Vendors.csv, ...).
 * Läuft über die Browser-Session des angemeldeten Benutzers - der Upload ist
 * per ASP.NET-Antiforgery-Token geschützt, das zur Session gehört.
 */
function masterFileIndexUrl(baseUri, subscriptionId) {
    return `${baseUri}/classcon-documentreader/MasterFile/Index/${encodeURIComponent(subscriptionId)}`;
}
const TOKEN_NAME = "__RequestVerificationToken";
const IFRAME_TIMEOUT_MS = 15000;
// Token im Seitentext suchen: verstecktes Feld (Attribute in beliebiger
// Reihenfolge), Meta-Tag oder Zuweisung in einem Script.
function findTokenInHtml(html) {
    const doc = new DOMParser().parseFromString(html, "text/html");
    const fromDom = doc.querySelector(`input[name="${TOKEN_NAME}"]`)?.getAttribute("value")
        ?? doc.querySelector(`meta[name="${TOKEN_NAME}"], meta[name="RequestVerificationToken"]`)?.getAttribute("content");
    if (fromDom)
        return fromDom;
    const patterns = [
        /name=["']__RequestVerificationToken["'][^>]*value=["']([^"']+)["']/i,
        /value=["']([^"']+)["'][^>]*name=["']__RequestVerificationToken["']/i,
        /__RequestVerificationToken["']?\s*[:=,]\s*["']([A-Za-z0-9_\-+/=]{20,})["']/i,
    ];
    for (const pattern of patterns) {
        const match = html.match(pattern);
        if (match)
            return match[1];
    }
    return undefined;
}
// Fallback: Seite unsichtbar im iframe öffnen (gleicher Ursprung), damit auch
// per Script nachgeladene Formulare vorhanden sind, und das Feld dort lesen.
function findTokenInIframe(url) {
    return new Promise((resolve) => {
        const iframe = document.createElement("iframe");
        iframe.style.cssText = "position:absolute;width:0;height:0;border:0;visibility:hidden";
        iframe.setAttribute("aria-hidden", "true");
        let poll;
        const finish = (value) => {
            clearTimeout(timer);
            if (poll)
                clearInterval(poll);
            iframe.remove();
            resolve(value);
        };
        const timer = setTimeout(() => finish(undefined), IFRAME_TIMEOUT_MS);
        iframe.onload = () => {
            // Nachgeladene Teile abwarten: bis zum Timeout alle 250 ms nachsehen.
            poll = setInterval(() => {
                try {
                    const doc = iframe.contentDocument;
                    const token = doc?.querySelector(`input[name="${TOKEN_NAME}"]`)?.getAttribute("value")
                        ?? (doc ? findTokenInHtml(doc.documentElement.outerHTML) : undefined);
                    if (token)
                        finish(token);
                }
                catch {
                    finish(undefined);
                }
            }, 250);
        };
        iframe.src = url;
        document.body.appendChild(iframe);
    });
}
/**
 * Holt das Antiforgery-Token der Stammdaten-Seite
 * (/classcon-documentreader/MasterFile/Index/<subscriptionId>): erst aus dem
 * HTML, sonst aus der im Hintergrund geöffneten Seite.
 */
async function getMasterFileRequestToken(baseUri, subscriptionId) {
    const url = masterFileIndexUrl(baseUri, subscriptionId);
    const response = await fetch(url, {
        method: "GET",
        headers: { Accept: "text/html" },
        credentials: "same-origin",
    });
    if (!response.ok) {
        throw new Error(`Stammdaten-Seite des Rechnungslesers nicht erreichbar (HTTP ${response.status}).`);
    }
    const token = findTokenInHtml(await response.text()) ?? await findTokenInIframe(url);
    if (!token) {
        throw new Error("Sicherheitstoken der Stammdaten-Seite nicht gefunden.");
    }
    return token;
}
/**
 * Lädt eine Stammdaten-Datei hoch - wie die Oberfläche:
 * POST /classcon-documentreader/MasterFile/Upload?id=<subscriptionId>
 * als multipart/form-data mit "__RequestVerificationToken" und "file[0]".
 */
async function uploadMasterFile(baseUri, subscriptionId, fileName, content) {
    const token = await getMasterFileRequestToken(baseUri, subscriptionId);
    const form = new FormData();
    form.append("__RequestVerificationToken", token);
    form.append("file[0]", new Blob([content], { type: "text/csv" }), fileName);
    // Content-Type (mit boundary) setzt der Browser selbst.
    await (0, performHttpRequest_1.performHttpRequest)(`${baseUri}/classcon-documentreader/MasterFile/Upload?id=${encodeURIComponent(subscriptionId)}`, {
        method: "POST",
        headers: { Accept: "application/json", "X-Requested-With": "XMLHttpRequest" },
        body: form,
        credentials: "same-origin",
    });
}
/**
 * Baut eine Stammdaten-CSV im Format des Rechnungslesers: UTF-8 ohne BOM,
 * Semikolon als Trennzeichen, CRLF zwischen den Zeilen (wie die Beispiel-
 * dateien). Werte dürfen weder ";" noch Zeilenumbrüche enthalten - vorher
 * prüfen (siehe invalidMasterFileValue).
 */
function buildMasterFileCsv(headers, rows) {
    return [headers, ...rows].map((row) => row.join(";")).join("\r\n");
}
/** Liefert eine Fehlermeldung, wenn der Wert nicht in die CSV passt. */
function invalidMasterFileValue(value) {
    if (value.includes(";"))
        return "darf kein Semikolon enthalten";
    if (/[\r\n]/.test(value))
        return "darf keinen Zeilenumbruch enthalten";
    return undefined;
}


/***/ },

/***/ "../../helper/classcon-documentreader/metadataEndpointService.ts"
/*!***********************************************************************!*\
  !*** ../../helper/classcon-documentreader/metadataEndpointService.ts ***!
  \***********************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getMetadataEndpointService = getMetadataEndpointService;
exports.saveMetadataEndpointService = saveMetadataEndpointService;
const performHttpRequest_1 = __webpack_require__(/*! ../performHttpRequest/performHttpRequest */ "../../helper/performHttpRequest/performHttpRequest.ts");
const SCALAR_FIELDS = ["ServiceBusConnectionString", "QueueName", "ReferencedTargetSystem"];
function endpointUrl(baseUri, subscriptionId) {
    return `${baseUri}/classcon-documentreader/Configuration/MetadataEndpointService?subscriptionId=${encodeURIComponent(subscriptionId)}`;
}
function authHeaders(token) {
    return token ? { Authorization: `Bearer ${token}` } : {};
}
// JSON: Felder ohne Rücksicht auf Groß-/Kleinschreibung übernehmen.
function fromJson(raw) {
    const lookup = new Map(Object.entries(raw).map(([key, value]) => [key.toLowerCase(), value]));
    const result = {};
    for (const field of SCALAR_FIELDS) {
        const value = lookup.get(field.toLowerCase());
        if (value !== undefined && value !== null)
            result[field] = String(value);
    }
    const properties = lookup.get("properties");
    if (Array.isArray(properties)) {
        result.Properties = properties.map((p) => ({ Name: String(p?.Name ?? p?.name ?? ""), Value: String(p?.Value ?? p?.value ?? "") }));
    }
    return result;
}
// HTML-Konfigurationsseite: Felder wie im POST ("QueueName",
// "Properties[i].Name"/"Properties[i].Value") auslesen.
function fromHtml(html) {
    if (typeof DOMParser === "undefined")
        return undefined;
    const doc = new DOMParser().parseFromString(html, "text/html");
    const result = {};
    const properties = new Map();
    doc.querySelectorAll("input[name], select[name], textarea[name]").forEach((element) => {
        const type = element.tagName === "INPUT" ? element.type : "";
        if (type === "radio" && !element.checked)
            return;
        const property = element.name.match(/^Properties\[(\d+)\]\.(Name|Value)$/i);
        if (property) {
            const entry = properties.get(Number(property[1])) ?? { Name: "", Value: "" };
            entry[property[2].toLowerCase() === "name" ? "Name" : "Value"] = element.value;
            properties.set(Number(property[1]), entry);
            return;
        }
        const field = SCALAR_FIELDS.find((f) => f.toLowerCase() === element.name.toLowerCase());
        if (field)
            result[field] = element.value;
    });
    if (properties.size) {
        result.Properties = [...properties.keys()].sort((a, b) => a - b).map((i) => properties.get(i));
    }
    return Object.keys(result).length ? result : undefined;
}
/**
 * Liest den eingerichteten Metadaten-Endpunkt
 * (GET /classcon-documentreader/Configuration/MetadataEndpointService?subscriptionId=...).
 * Versteht JSON und die HTML-Konfigurationsseite. undefined = nicht lesbar.
 */
async function getMetadataEndpointService(baseUri, token, subscriptionId) {
    const response = await (0, performHttpRequest_1.performHttpRequest)(endpointUrl(baseUri, subscriptionId), {
        method: "GET",
        headers: { ...authHeaders(token), Accept: "application/json, text/html;q=0.9" },
    });
    if (typeof response.body === "string") {
        try {
            return fromJson(JSON.parse(response.body));
        }
        catch {
            return fromHtml(response.body);
        }
    }
    return response.body && typeof response.body === "object" ? fromJson(response.body) : undefined;
}
/**
 * Richtet den Metadaten-Endpunkt ein - wie die Oberfläche: POST als
 * Formulardaten ServiceBusConnectionString, QueueName, ReferencedTargetSystem
 * und Properties[i].Name / Properties[i].Value.
 */
async function saveMetadataEndpointService(baseUri, token, subscriptionId, settings) {
    const body = new URLSearchParams();
    for (const field of SCALAR_FIELDS) {
        body.set(field, settings[field]);
    }
    settings.Properties.forEach((property, index) => {
        body.set(`Properties[${index}].Name`, property.Name);
        body.set(`Properties[${index}].Value`, property.Value);
    });
    return await (0, performHttpRequest_1.performHttpRequest)(endpointUrl(baseUri, subscriptionId), {
        method: "POST",
        headers: {
            ...authHeaders(token),
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
        body: body.toString(),
    });
}


/***/ },

/***/ "../../helper/classcon-documentreader/serviceBusEndpointMapping.ts"
/*!*************************************************************************!*\
  !*** ../../helper/classcon-documentreader/serviceBusEndpointMapping.ts ***!
  \*************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getServiceBusEndpointMapping = getServiceBusEndpointMapping;
exports.saveServiceBusEndpointMapping = saveServiceBusEndpointMapping;
const performHttpRequest_1 = __webpack_require__(/*! ../performHttpRequest/performHttpRequest */ "../../helper/performHttpRequest/performHttpRequest.ts");
const PREFIX = "ServiceBusMapping.ServiceBusAttributeMappings";
function mappingUrl(baseUri, subscriptionId, endpointServiceName, documentClass, save) {
    const params = new URLSearchParams({ subscriptionId });
    if (save)
        params.set("saveMapping", "true");
    params.set("endpointServiceName", endpointServiceName);
    params.set("documentClass", documentClass);
    return `${baseUri}/classcon-documentreader/Configuration/ServiceBusEndpointService?${params}`;
}
function authHeaders(token) {
    return token ? { Authorization: `Bearer ${token}` } : {};
}
// Zeilenenden wie die Oberfläche (Textarea sendet CRLF).
function toCrlf(text) {
    return text.replace(/\r?\n/g, "\r\n");
}
// HTML-Konfigurationsseite auslesen: Mapping-Zeilen
// "ServiceBusMapping.ServiceBusAttributeMappings[i].<Feld>", StyleSheet usw.
function parseHtml(html) {
    if (typeof DOMParser === "undefined")
        return undefined;
    const doc = new DOMParser().parseFromString(html, "text/html");
    const rows = new Map();
    const scalars = {};
    doc.querySelectorAll("input[name], textarea[name], select[name]").forEach((element) => {
        const type = element.tagName === "INPUT" ? element.type : "";
        if ((type === "radio" || type === "checkbox") && !element.checked)
            return;
        const row = element.name.match(/^ServiceBusMapping\.ServiceBusAttributeMappings\[(\d+)\]\.(\w+)$/);
        if (row) {
            const entry = rows.get(Number(row[1])) ?? {};
            entry[row[2]] = element.value;
            rows.set(Number(row[1]), entry);
        }
        else {
            scalars[element.name] = element.value;
        }
    });
    const result = {};
    if (rows.size) {
        result.AttributeMappings = [...rows.keys()].sort((a, b) => a - b).map((i) => {
            const r = rows.get(i);
            return {
                JsonOutputName: r.JsonOutputName ?? "",
                AttributeName: r.AttributeName ?? "",
                DefaultValue: r.DefaultValue ?? "",
                ServiceBusDataType: r.ServiceBusDataType ?? "",
                Export: (r.Export ?? "").toLowerCase() === "true",
            };
        });
    }
    if ("StyleSheet" in scalars)
        result.StyleSheet = scalars.StyleSheet;
    if ("ServiceBusExportType" in scalars)
        result.ServiceBusExportType = scalars.ServiceBusExportType;
    if ("IsCustomTemplate" in scalars)
        result.IsCustomTemplate = scalars.IsCustomTemplate.toLowerCase() === "true";
    return Object.keys(result).length ? result : undefined;
}
/**
 * Liest das Export-Mapping eines Zielsystems
 * (GET /classcon-documentreader/Configuration/ServiceBusEndpointService?subscriptionId=...&endpointServiceName=...&documentClass=...).
 * undefined = nicht lesbar.
 */
async function getServiceBusEndpointMapping(baseUri, token, subscriptionId, endpointServiceName, documentClass) {
    const response = await (0, performHttpRequest_1.performHttpRequest)(mappingUrl(baseUri, subscriptionId, endpointServiceName, documentClass, false), {
        method: "GET",
        headers: { ...authHeaders(token), Accept: "text/html" },
    });
    return typeof response.body === "string" ? parseHtml(response.body) : undefined;
}
/**
 * Speichert das Export-Mapping eines Zielsystems - wie die Oberfläche:
 * POST .../ServiceBusEndpointService?subscriptionId=...&saveMapping=true&endpointServiceName=...&documentClass=...
 * als Formulardaten (ASP.NET-Liste mit "...Index"-Feldern, StyleSheet usw.).
 */
async function saveServiceBusEndpointMapping(baseUri, token, subscriptionId, endpointServiceName, documentClass, mapping) {
    const body = new URLSearchParams();
    mapping.AttributeMappings.forEach((row, i) => {
        body.append(`${PREFIX}.Index`, String(i));
        body.append(`${PREFIX}[${i}].JsonOutputName`, row.JsonOutputName);
        body.append(`${PREFIX}[${i}].AttributeName`, row.AttributeName);
        body.append(`${PREFIX}[${i}].DefaultValue`, row.DefaultValue);
        body.append(`${PREFIX}[${i}].ServiceBusDataType`, row.ServiceBusDataType);
        body.append(`${PREFIX}[${i}].Export`, row.Export ? "True" : "False");
    });
    body.append("IsCustomTemplate", mapping.IsCustomTemplate ? "true" : "false");
    body.append("StyleSheet", toCrlf(mapping.StyleSheet));
    body.append("DefaultStyleSheetName", mapping.DefaultStyleSheetName);
    body.append("ServiceBusExportType", mapping.ServiceBusExportType);
    return await (0, performHttpRequest_1.performHttpRequest)(mappingUrl(baseUri, subscriptionId, endpointServiceName, documentClass, true), {
        method: "POST",
        headers: {
            ...authHeaders(token),
            Accept: "application/json, text/html;q=0.9",
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
        body: body.toString(),
    });
}


/***/ },

/***/ "../../helper/classcon-documentreader/setDocumentProcessingConfiguration.ts"
/*!**********************************************************************************!*\
  !*** ../../helper/classcon-documentreader/setDocumentProcessingConfiguration.ts ***!
  \**********************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getDocumentProcessingConfiguration = getDocumentProcessingConfiguration;
exports.setDocumentProcessingConfiguration = setDocumentProcessingConfiguration;
const performHttpRequest_1 = __webpack_require__(/*! ../performHttpRequest/performHttpRequest */ "../../helper/performHttpRequest/performHttpRequest.ts");
/**
 * Liest die Verarbeitungs-Einstellungen des Rechnungslesers (Seite
 * "Dokumentprüfung"): GET /classcon-documentreader/Configuration/DocumentProcessing?subscriptionId=...
 * liefert HTML, in dem jede Einstellung ein Schalter
 * <button role="switch" id="<Name>" aria-checked="true|false"> ist, z.B.
 * { InvoicePreCheck: true, DuplicateCheck: false, BatchPermissions: true }.
 *
 * @param token - Optional bearer token; ohne Token wird die Browser-Session genutzt.
 */
async function getDocumentProcessingConfiguration(baseUri, token, subscriptionId) {
    const response = await (0, performHttpRequest_1.performHttpRequest)(`${baseUri}/classcon-documentreader/Configuration/DocumentProcessing?subscriptionId=${encodeURIComponent(subscriptionId)}`, {
        method: "GET",
        headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}), Accept: "text/html" },
    });
    if (typeof response.body !== "string" || typeof DOMParser === "undefined") {
        throw new Error("Die Dokumentprüfung des Rechnungslesers konnte nicht gelesen werden.");
    }
    const doc = new DOMParser().parseFromString(response.body, "text/html");
    const result = {};
    doc.querySelectorAll('[role="switch"][id]').forEach((element) => {
        result[element.id] = element.getAttribute("aria-checked") === "true";
    });
    return result;
}
/**
 * Schaltet eine Verarbeitungs-Einstellung des Rechnungslesers ein oder aus -
 * wie die Oberfläche: POST /classcon-documentreader/Configuration/DocumentProcessing
 * als Formulardaten
 *   subscriptionID=<id>&configuration={"Name":"<name>","Active":<true|false>}
 * z.B. Name "DuplicateCheck" für die Dublettenprüfung.
 *
 * @param baseUri - The base URI of the API endpoint.
 * @param token - Optional bearer token; ohne Token wird die Browser-Session genutzt.
 * @param subscriptionId - Subscription-ID des Rechnungslesers.
 * @param name - Name der Einstellung, z.B. "DuplicateCheck".
 * @param active - Einstellung aktivieren (true) oder deaktivieren (false).
 */
async function setDocumentProcessingConfiguration(baseUri, token, subscriptionId, name, active) {
    const url = `${baseUri}/classcon-documentreader/Configuration/DocumentProcessing`;
    const headers = {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    };
    const body = new URLSearchParams({
        subscriptionID: subscriptionId,
        configuration: JSON.stringify({ Name: name, Active: active }),
    }).toString();
    const options = {
        method: "POST",
        headers,
        body,
    };
    return await (0, performHttpRequest_1.performHttpRequest)(url, options);
}


/***/ },

/***/ "../../helper/classcon-documentreader/sftpEndpointService.ts"
/*!*******************************************************************!*\
  !*** ../../helper/classcon-documentreader/sftpEndpointService.ts ***!
  \*******************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getSftpEndpointService = getSftpEndpointService;
exports.saveSftpEndpointService = saveSftpEndpointService;
const performHttpRequest_1 = __webpack_require__(/*! ../performHttpRequest/performHttpRequest */ "../../helper/performHttpRequest/performHttpRequest.ts");
const FIELDS = ["Host", "Port", "User", "Password", "Directory"];
function endpointUrl(baseUri, subscriptionId) {
    return `${baseUri}/classcon-documentreader/Configuration/SftpEndpointService?subscriptionId=${encodeURIComponent(subscriptionId)}`;
}
function authHeaders(token) {
    return token ? { Authorization: `Bearer ${token}` } : {};
}
// Felder ohne Rücksicht auf Groß-/Kleinschreibung übernehmen (JSON kann camelCase sein).
function pick(raw) {
    const lookup = new Map(Object.entries(raw).map(([key, value]) => [key.toLowerCase(), value]));
    const result = {};
    for (const field of FIELDS) {
        const value = lookup.get(field.toLowerCase());
        if (value !== undefined && value !== null)
            result[field] = String(value);
    }
    return result;
}
// HTML-Konfigurationsseite: Formularfelder mit den Namen aus FIELDS auslesen.
function parseHtml(html) {
    if (typeof DOMParser === "undefined")
        return undefined;
    const doc = new DOMParser().parseFromString(html, "text/html");
    const raw = {};
    doc.querySelectorAll("input[name], textarea[name]").forEach((element) => {
        if (FIELDS.some((field) => field.toLowerCase() === element.name.toLowerCase())) {
            raw[element.name] = element.value;
        }
    });
    const result = pick(raw);
    return Object.keys(result).length ? result : undefined;
}
/**
 * Liest das eingerichtete SFTP-Zielsystem
 * (GET /classcon-documentreader/Configuration/SftpEndpointService?subscriptionId=...).
 * Versteht JSON und die HTML-Konfigurationsseite. undefined = nicht lesbar.
 * Das Kennwort liefert die Seite ggf. nicht (oder maskiert) mit.
 */
async function getSftpEndpointService(baseUri, token, subscriptionId) {
    const response = await (0, performHttpRequest_1.performHttpRequest)(endpointUrl(baseUri, subscriptionId), {
        method: "GET",
        headers: { ...authHeaders(token), Accept: "application/json, text/html;q=0.9" },
    });
    if (typeof response.body === "string") {
        try {
            return pick(JSON.parse(response.body));
        }
        catch {
            return parseHtml(response.body);
        }
    }
    return response.body && typeof response.body === "object" ? pick(response.body) : undefined;
}
/**
 * Richtet das SFTP-Zielsystem ein - wie die Oberfläche: POST als
 * Formulardaten Host=...&Port=22&User=...&Password=...&Directory=...
 */
async function saveSftpEndpointService(baseUri, token, subscriptionId, settings) {
    const body = new URLSearchParams();
    for (const field of FIELDS) {
        body.set(field, settings[field]);
    }
    return await (0, performHttpRequest_1.performHttpRequest)(endpointUrl(baseUri, subscriptionId), {
        method: "POST",
        headers: {
            ...authHeaders(token),
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
        body: body.toString(),
    });
}


/***/ },

/***/ "../../helper/dash/getApps.ts"
/*!************************************!*\
  !*** ../../helper/dash/getApps.ts ***!
  \************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Target = void 0;
exports.getApps = getApps;
const performHttpRequest_1 = __webpack_require__(/*! ../performHttpRequest/performHttpRequest */ "../../helper/performHttpRequest/performHttpRequest.ts");
var Target;
(function (Target) {
    Target["Blank"] = "_blank";
    Target["DapiNavigate"] = "dapi_navigate";
    Target["Empty"] = "";
})(Target || (exports.Target = Target = {}));
/**
 * Retrieves the list of available apps from the dashboard API.
 *
 * @param baseUri - The base URI of the API endpoint.
 * @param token - The bearer token used for authentication.
 * @returns A promise that resolves to an `ApiResponse` containing the `GetApps` data.
 */
async function getApps(baseUri, token) {
    const url = `${baseUri}/dash/api/appsmenu`;
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

/***/ "../../helper/dms/createSourceMapping.ts"
/*!***********************************************!*\
  !*** ../../helper/dms/createSourceMapping.ts ***!
  \***********************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createSourceMapping = createSourceMapping;
const performHttpRequest_1 = __webpack_require__(/*! ../performHttpRequest/performHttpRequest */ "../../helper/performHttpRequest/performHttpRequest.ts");
/**
 * Creates a new source mapping in the specified repository.
 *
 * @template T - The expected response type.
 * @param baseUri - The base URI of the DMS API.
 * @param token - The bearer token used for authentication.
 * @param repositoryId - The identifier of the repository where the source mapping will be created.
 * @param sourceMapping - The body payload containing the source mapping details.
 * @returns A promise that resolves to an ApiResponse of type T.
 */
async function createSourceMapping(baseUri, token, repositoryId, sourceMapping) {
    const url = `${baseUri}/dms/r/${repositoryId}/m`;
    const headers = {
        "Authorization": `Bearer ${token}`,
        "Accept": "application/json",
        "Content-Type": "application/json",
    };
    const options = {
        method: "POST",
        headers,
        body: JSON.stringify(sourceMapping),
    };
    return await (0, performHttpRequest_1.performHttpRequest)(url, options);
}


/***/ },

/***/ "../../helper/dms/getMappingContainers.ts"
/*!************************************************!*\
  !*** ../../helper/dms/getMappingContainers.ts ***!
  \************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getMappingContainer = getMappingContainer;
exports.updateMappingContainer = updateMappingContainer;
exports.getMappingContainers = getMappingContainers;
const performHttpRequest_1 = __webpack_require__(/*! ../performHttpRequest/performHttpRequest */ "../../helper/performHttpRequest/performHttpRequest.ts");
/**
 * Liest ein einzelnes Quell-Mapping inkl. seiner Zuordnungen (GET auf den
 * self-Link aus getMappingContainers, z.B.
 * /dms/r/<repositoryId>/mapping/container/<id>).
 */
async function getMappingContainer(baseUri, token, container) {
    const href = container._links?.self?.href;
    if (!href) {
        throw new Error(`Für das Quell-Mapping "${container.name}" liefert die API keinen Link.`);
    }
    const headers = {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        Accept: "application/hal+json, application/json",
    };
    return await (0, performHttpRequest_1.performHttpRequest)(new URL(href, baseUri).toString(), { method: "GET", headers });
}
/**
 * Speichert ein bestehendes Quell-Mapping (PUT
 * /dms/r/<repositoryId>/mapping/container/<id>) - wie die DMS-Oberfläche mit
 * {"name", "id", "sourceId", "mappingItems": [...]}. mappingItems ersetzt die
 * komplette Liste, also vorher mit getMappingContainer laden und ergänzen.
 */
async function updateMappingContainer(baseUri, token, repositoryId, container) {
    if (!container.id) {
        throw new Error(`Quell-Mapping "${container.name}" hat keine Id.`);
    }
    const url = `${baseUri}/dms/r/${repositoryId}/mapping/container/${container.id}`;
    const headers = {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        Accept: "application/hal+json, application/json",
        "Content-Type": "application/json",
    };
    const body = {
        name: container.name,
        id: container.id,
        sourceId: container.sourceId,
        mappingItems: container.mappingItems ?? [],
    };
    return await (0, performHttpRequest_1.performHttpRequest)(url, { method: "PUT", headers, body: JSON.stringify(body) });
}
/**
 * Liest die Quell-Mappings eines Repositorys
 * (GET /dms/r/<repositoryId>/mapping/container) - z.B. um vor
 * createSourceMapping zu prüfen, ob für eine Quelle schon ein Mapping existiert.
 *
 * @param baseUri - The base URI of the DMS API.
 * @param token - Optional bearer token; ohne Token wird die Browser-Session genutzt.
 * @param repositoryId - The identifier of the repository.
 */
async function getMappingContainers(baseUri, token, repositoryId) {
    const url = `${baseUri}/dms/r/${repositoryId}/mapping/container`;
    const headers = {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        Accept: "application/hal+json, application/json",
    };
    const options = {
        method: "GET",
        headers,
    };
    return await (0, performHttpRequest_1.performHttpRequest)(url, options);
}


/***/ },

/***/ "../../helper/dms/getRepositories.ts"
/*!*******************************************!*\
  !*** ../../helper/dms/getRepositories.ts ***!
  \*******************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getRepositories = getRepositories;
const performHttpRequest_1 = __webpack_require__(/*! ../performHttpRequest/performHttpRequest */ "../../helper/performHttpRequest/performHttpRequest.ts");
async function getRepositories(baseUri, token) {
    const url = `${baseUri}/dms/r`;
    const headers = {
        "Authorization": `Bearer ${token}`,
        "Accept": "application/json",
        "Content-Type": "application/json",
    };
    const options = {
        method: "GET",
        headers,
    };
    return await (0, performHttpRequest_1.performHttpRequest)(url, options);
}


/***/ },

/***/ "../../helper/emailinbound/createEmailinboundProfile.ts"
/*!**************************************************************!*\
  !*** ../../helper/emailinbound/createEmailinboundProfile.ts ***!
  \**************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createEmailinboundProfiles = createEmailinboundProfiles;
const performHttpRequest_1 = __webpack_require__(/*! ../performHttpRequest/performHttpRequest */ "../../helper/performHttpRequest/performHttpRequest.ts");
async function createEmailinboundProfiles(baseUri, token, payload) {
    const url = `${baseUri}/emailinbound/settings`;
    const headers = {
        "Authorization": `Bearer ${token}`,
        "Accept": "application/json",
        "Content-Type": "application/json; charset=utf-8",
    };
    const options = {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
    };
    return await (0, performHttpRequest_1.performHttpRequest)(url, options);
}


/***/ },

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

/***/ "../../helper/emailinbound/updateEmailinboundProfile.ts"
/*!**************************************************************!*\
  !*** ../../helper/emailinbound/updateEmailinboundProfile.ts ***!
  \**************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.updateEmailinboundProfile = updateEmailinboundProfile;
const performHttpRequest_1 = __webpack_require__(/*! ../performHttpRequest/performHttpRequest */ "../../helper/performHttpRequest/performHttpRequest.ts");
/**
 * Aktualisiert ein bestehendes E-Mail-Postfach (PUT auf "_links.update" aus
 * getEmailinboundProfiles, sonst auf "_links.self").
 *
 * @param baseUri - The base URI of the API endpoint.
 * @param token - The bearer token used for authentication.
 * @param existing - Bestehendes Postfach aus getEmailinboundProfiles.
 * @param payload - Neue Einstellungen des Postfachs.
 */
async function updateEmailinboundProfile(baseUri, token, existing, payload) {
    const href = existing._links?.update?.href ?? existing._links?.self?.href;
    if (!href) {
        throw new Error(`Für das Postfach "${existing.mailbox}" liefert die API keinen Link zum Aktualisieren.`);
    }
    const url = new URL(href, baseUri).toString();
    const headers = {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
    };
    const options = {
        method: "PUT",
        headers,
        body: JSON.stringify(payload),
    };
    return await (0, performHttpRequest_1.performHttpRequest)(url, options);
}


/***/ },

/***/ "../../helper/eventbridge/getEventbridgeConfig.ts"
/*!********************************************************!*\
  !*** ../../helper/eventbridge/getEventbridgeConfig.ts ***!
  \********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getEventbridgeConfig = getEventbridgeConfig;
const performHttpRequest_1 = __webpack_require__(/*! ../performHttpRequest/performHttpRequest */ "../../helper/performHttpRequest/performHttpRequest.ts");
/**
 * Liest die Eventbridge-Konfiguration: GET /eventbridge/config/events.
 * Enthält die aktivierten Ereignisse (samt Webhook im DMS) und wann welches
 * Repository zuletzt synchronisiert wurde.
 *
 * @param token - API-Key; leer = Browser-Session.
 */
async function getEventbridgeConfig(baseUri, token) {
    return (await (0, performHttpRequest_1.performHttpRequest)(`${baseUri}/eventbridge/config/events`, {
        method: "GET",
        headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}), Accept: "application/json" },
    })).body;
}


/***/ },

/***/ "../../helper/eventbridge/setDmspostimport.ts"
/*!****************************************************!*\
  !*** ../../helper/eventbridge/setDmspostimport.ts ***!
  \****************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.setDmspostimport = setDmspostimport;
const performHttpRequest_1 = __webpack_require__(/*! ../performHttpRequest/performHttpRequest */ "../../helper/performHttpRequest/performHttpRequest.ts");
/**
 * Enables the "dmspostimport" event in the EventBridge configuration by sending a PATCH request.
 *
 * @template T - The expected response type.
 * @param baseUri - The base URI of the API endpoint.
 * @param token - The bearer token used for authorization.
 * @returns A promise that resolves to an `ApiResponse<T>` containing the API response.
 */
async function setDmspostimport(baseUri, token, activated) {
    const url = `${baseUri}/eventbridge/config/events`;
    const headers = {
        "Authorization": `Bearer ${token}`,
        "Accept": "application/json",
        "Content-Type": "application/json",
    };
    const body = {
        events: [
            { id: "dmspostimport", enabled: activated },
        ]
    };
    const options = {
        method: "PATCH",
        headers,
        body: JSON.stringify(body),
    };
    return await (0, performHttpRequest_1.performHttpRequest)(url, options);
}


/***/ },

/***/ "../../helper/eventbridge/synchronizeEventbride.ts"
/*!*********************************************************!*\
  !*** ../../helper/eventbridge/synchronizeEventbride.ts ***!
  \*********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.synchronizeEventbride = synchronizeEventbride;
const performHttpRequest_1 = __webpack_require__(/*! ../performHttpRequest/performHttpRequest */ "../../helper/performHttpRequest/performHttpRequest.ts");
/**
 * Synchronizes the Eventbridge configuration for a given repository by sending a refresh request.
 *
 * @template T - The expected response type.
 * @param baseUri - The base URI of the API endpoint.
 * @param token - The bearer token used for authentication.
 * @param repositoryId - The ID of the repository to synchronize.
 * @returns A promise that resolves to an `ApiResponse<T>` containing the response data.
 */
async function synchronizeEventbride(baseUri, token, repositoryId) {
    const url = `${baseUri}/eventbridge/config/dms/refresh`;
    const headers = {
        "Authorization": `Bearer ${token}`,
        "Accept": "application/json",
        "Content-Type": "application/json",
    };
    const body = {
        id: repositoryId,
    };
    const options = {
        method: "POST",
        headers,
        body: JSON.stringify(body),
    };
    return await (0, performHttpRequest_1.performHttpRequest)(url, options);
}


/***/ },

/***/ "../../helper/identityprovider/createAPIKey.ts"
/*!*****************************************************!*\
  !*** ../../helper/identityprovider/createAPIKey.ts ***!
  \*****************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getIdentityProviderCsrfToken = getIdentityProviderCsrfToken;
exports.createAPIKey = createAPIKey;
const performHttpRequest_1 = __webpack_require__(/*! ../performHttpRequest/performHttpRequest */ "../../helper/performHttpRequest/performHttpRequest.ts");
// Die Identityprovider-Oberfläche liest das Token aus ihrem eigenen HTML:
// document.querySelector('meta[name="x-csrf-token"]')?.getAttribute("content").
const CSRF_META_SELECTOR = 'meta[name="x-csrf-token"]';
// Seiten der Identityprovider-Konfiguration, die das Meta-Tag ausliefern.
const CSRF_PAGES = ["/identityprovider/config/apikey/create", "/identityprovider/config/apikey", "/identityprovider/config"];
const IFRAME_TIMEOUT_MS = 15000;
function readCsrfMeta(doc) {
    return doc?.querySelector(CSRF_META_SELECTOR)?.getAttribute("content") || undefined;
}
// Schnellweg: Seite per fetch laden und das Meta-Tag aus dem HTML lesen.
async function csrfFromFetch(baseUri, path) {
    try {
        const response = await fetch(`${baseUri}${path}`, {
            method: "GET",
            headers: { Accept: "text/html" },
            credentials: "same-origin",
        });
        if (!response.ok)
            return undefined;
        return readCsrfMeta(new DOMParser().parseFromString(await response.text(), "text/html"));
    }
    catch {
        return undefined;
    }
}
// Fallback: Seite unsichtbar im iframe öffnen (echte Navigation wie im
// Browser, gleicher Ursprung - x-frame-options SAMEORIGIN erlaubt das) und das
// Meta-Tag aus dem geladenen Dokument lesen.
function csrfFromIframe(baseUri, path) {
    return new Promise((resolve) => {
        const iframe = document.createElement("iframe");
        iframe.style.cssText = "position:absolute;width:0;height:0;border:0;visibility:hidden";
        iframe.setAttribute("aria-hidden", "true");
        const finish = (value) => {
            clearTimeout(timer);
            iframe.remove();
            resolve(value);
        };
        const timer = setTimeout(() => finish(undefined), IFRAME_TIMEOUT_MS);
        iframe.onload = () => {
            try {
                finish(readCsrfMeta(iframe.contentDocument));
            }
            catch {
                finish(undefined);
            }
        };
        iframe.src = `${baseUri}${path}`;
        document.body.appendChild(iframe);
    });
}
/**
 * Holt das Anti-CSRF-Token der Identityprovider-Konfiguration. Die
 * Oberfläche schickt es als Header "x-csrf-token" mit - ohne antwortet
 * POST /identityprovider/config/apikey mit 401 (auch mit gültiger Session).
 * Das Token steht im HTML der Konfigurationsseiten als
 * <meta name="x-csrf-token" content="...">.
 */
async function getIdentityProviderCsrfToken(baseUri) {
    for (const path of CSRF_PAGES) {
        const token = await csrfFromFetch(baseUri, path);
        if (token)
            return token;
    }
    const token = await csrfFromIframe(baseUri, CSRF_PAGES[0]);
    if (token)
        return token;
    throw new Error("CSRF-Token der Identityprovider-Konfiguration nicht gefunden (meta x-csrf-token).");
}
/**
 * Legt einen API-Key für einen Benutzer an - wie die Identityprovider-
 * Oberfläche: POST /identityprovider/config/apikey mit
 * {"id":"create","status":"Unconfirmed","userId":"<id>","label":"<label>"}
 * und Header "x-csrf-token" (siehe getIdentityProviderCsrfToken).
 *
 * @param token - Optional bearer token; ohne Token wird die Browser-Session genutzt.
 */
async function createAPIKey(baseUri, token = null, input) {
    const url = `${baseUri}/identityprovider/config/apikey`;
    const headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-csrf-token": await getIdentityProviderCsrfToken(baseUri),
    };
    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }
    const options = {
        method: "POST",
        headers,
        body: JSON.stringify(input),
    };
    return await (0, performHttpRequest_1.performHttpRequest)(url, options);
}


/***/ },

/***/ "../../helper/identityprovider/getAllUsers.ts"
/*!****************************************************!*\
  !*** ../../helper/identityprovider/getAllUsers.ts ***!
  \****************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getAllUsers = getAllUsers;
const getUsers_1 = __webpack_require__(/*! ./getUsers */ "../../helper/identityprovider/getUsers.ts");
const PAGE_SIZE = 100;
// Schutz vor Endlosschleifen, falls die API totalResults/startIndex nicht wie
// erwartet liefert (100 * 1000 = 100.000 Benutzer).
const MAX_PAGES = 1000;
/**
 * Fetches ALL users from the identity provider (SCIM). getUsers alone returns
 * only the API's default page; this pages through with startIndex/count until
 * totalResults is reached or a page comes back empty.
 *
 * @param baseUri - The base URI of the identity provider API.
 * @param token - The authorization token to access the API.
 * @returns All users, duplicates (same id on several pages) removed.
 */
async function getAllUsers(baseUri, token) {
    const usersById = new Map();
    const usersWithoutId = [];
    let startIndex = 1;
    for (let page = 0; page < MAX_PAGES; page++) {
        const response = await (0, getUsers_1.getUsers)(baseUri, token, startIndex, PAGE_SIZE);
        const resources = response.body.resources ?? [];
        for (const user of resources) {
            if (user.id) {
                usersById.set(user.id, user);
            }
            else {
                usersWithoutId.push(user);
            }
        }
        const total = response.body.totalResults;
        startIndex += resources.length;
        if (resources.length === 0 || (total !== undefined && startIndex > total)) {
            break;
        }
    }
    return [...usersById.values(), ...usersWithoutId];
}


/***/ },

/***/ "../../helper/identityprovider/getCurrentUserInformation.ts"
/*!******************************************************************!*\
  !*** ../../helper/identityprovider/getCurrentUserInformation.ts ***!
  \******************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getCurrentUserInformation = getCurrentUserInformation;
const performHttpRequest_1 = __webpack_require__(/*! ../performHttpRequest/performHttpRequest */ "../../helper/performHttpRequest/performHttpRequest.ts");
/**
 * Retrieves the current user information by validating the provided token
 * with the identity provider.
 *
 * @param baseUri - The base URI of the identity provider.
 * @param token - The optional bearer token for authentication. If not provided,
 *                the request will be made without an Authorization header.
 * @returns A promise that resolves to an `ApiResponse` containing the
 *          `GetCurrentUserInformation` data.
 */
async function getCurrentUserInformation(baseUri, token = null) {
    const url = `${baseUri}/identityprovider/validate`;
    const headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
    };
    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }
    const options = {
        method: "GET",
        headers,
    };
    return await (0, performHttpRequest_1.performHttpRequest)(url, options);
}


/***/ },

/***/ "../../helper/identityprovider/getGroups.ts"
/*!**************************************************!*\
  !*** ../../helper/identityprovider/getGroups.ts ***!
  \**************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Schema = void 0;
exports.getGroups = getGroups;
const performHttpRequest_1 = __webpack_require__(/*! ../performHttpRequest/performHttpRequest */ "../../helper/performHttpRequest/performHttpRequest.ts");
var Schema;
(function (Schema) {
    Schema["UrnScimSchemasCore10"] = "urn:scim:schemas:core:1.0";
})(Schema || (exports.Schema = Schema = {}));
/**
 * Fetches a list of groups from the identity provider using the SCIM protocol.
 *
 * @param baseUri - The base URI of the identity provider.
 * @param token - The authorization token to access the identity provider.
 * @returns A promise that resolves to an `ApiResponse` containing the group data.
 *
 * @template GetGroups - The expected structure of the group data returned by the API.
 */
async function getGroups(baseUri, token) {
    const url = `${baseUri}/identityprovider/scim/Groups`;
    const headers = {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
    };
    const options = {
        method: "GET",
        headers,
    };
    return await (0, performHttpRequest_1.performHttpRequest)(url, options);
}


/***/ },

/***/ "../../helper/identityprovider/getUsers.ts"
/*!*************************************************!*\
  !*** ../../helper/identityprovider/getUsers.ts ***!
  \*************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getUsers = getUsers;
const performHttpRequest_1 = __webpack_require__(/*! ../performHttpRequest/performHttpRequest */ "../../helper/performHttpRequest/performHttpRequest.ts");
/**
 * Fetches a list of users from the identity provider using the SCIM protocol.
 *
 * @param baseUri - The base URI of the identity provider API.
 * @param token - The authorization token to access the API.
 * @param startIndex - Optional (SCIM, 1-based): first result of the page. Without it the API returns only its default page - see getAllUsers for all users.
 * @param count - Optional (SCIM): maximum number of results of the page.
 * @returns A promise that resolves to an `ApiResponse` containing the list of users.
 *
 * @template GetUsers - The type representing the structure of the user data returned by the API.
 */
async function getUsers(baseUri, token, startIndex, count) {
    const query = new URLSearchParams();
    if (startIndex !== undefined)
        query.set("startIndex", String(startIndex));
    if (count !== undefined)
        query.set("count", String(count));
    const queryString = query.toString();
    const url = `${baseUri}/identityprovider/scim/Users${queryString ? `?${queryString}` : ""}`;
    // Ohne Token (Formular im Browser) über die Session des angemeldeten Benutzers.
    const headers = {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        Accept: "application/json",
        "Content-Type": "application/json",
    };
    const options = {
        method: "GET",
        headers,
    };
    return await (0, performHttpRequest_1.performHttpRequest)(url, options);
}


/***/ },

/***/ "../../helper/identityprovider/impersonateWhitelist.ts"
/*!*************************************************************!*\
  !*** ../../helper/identityprovider/impersonateWhitelist.ts ***!
  \*************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isAppImpersonationWhitelisted = isAppImpersonationWhitelisted;
exports.addAppToImpersonationWhitelist = addAppToImpersonationWhitelist;
const performHttpRequest_1 = __webpack_require__(/*! ../performHttpRequest/performHttpRequest */ "../../helper/performHttpRequest/performHttpRequest.ts");
const createAPIKey_1 = __webpack_require__(/*! ./createAPIKey */ "../../helper/identityprovider/createAPIKey.ts");
function whitelistUrl(baseUri) {
    return `${baseUri}/identityprovider/config/impersonatewhitelist`;
}
/**
 * Prüft, ob eine App als vertrauenswürdige App (Impersonation) eingetragen
 * ist. Wertet nur eine JSON-Antwort aus (Liste von App-Namen, direkt oder in
 * einem Feld) - undefined, wenn der Stand nicht eindeutig lesbar ist (z.B.
 * HTML-Seite, die auch die NICHT eingetragenen Apps auflistet).
 */
async function isAppImpersonationWhitelisted(baseUri, app) {
    try {
        const response = await fetch(whitelistUrl(baseUri), {
            method: "GET",
            headers: { Accept: "application/json" },
            credentials: "same-origin",
        });
        if (!response.ok || !(response.headers.get("content-type") ?? "").includes("json"))
            return undefined;
        const body = await response.json();
        const lists = Array.isArray(body)
            ? [body]
            : Object.values(body ?? {}).filter(Array.isArray);
        if (!lists.length)
            return undefined;
        return lists.some((list) => list.some((entry) => (typeof entry === "string" ? entry : entry?.appName ?? entry?.name ?? entry?.id) === app));
    }
    catch {
        return undefined;
    }
}
/**
 * Trägt eine App als vertrauenswürdige App ein - wie die Identityprovider-
 * Oberfläche: POST /identityprovider/config/impersonatewhitelist mit
 * {"addApp":"<app>"} und Header "x-csrf-token". Läuft über die
 * Browser-Session (Konfigurationsbereich des Identityproviders).
 */
async function addAppToImpersonationWhitelist(baseUri, app) {
    await (0, performHttpRequest_1.performHttpRequest)(whitelistUrl(baseUri), {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "x-csrf-token": await (0, createAPIKey_1.getIdentityProviderCsrfToken)(baseUri),
        },
        body: JSON.stringify({ addApp: app }),
    });
}


/***/ },

/***/ "../../helper/inbound/createBatchProfile.ts"
/*!**************************************************!*\
  !*** ../../helper/inbound/createBatchProfile.ts ***!
  \**************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createBatchProfile = createBatchProfile;
const performHttpRequest_1 = __webpack_require__(/*! ../performHttpRequest/performHttpRequest */ "../../helper/performHttpRequest/performHttpRequest.ts");
async function createBatchProfile(baseUri, token, createBatchProfileBody) {
    const url = `${baseUri}/inbound/batchprofile`;
    const headers = {
        "Authorization": `Bearer ${token}`,
        "Accept": "application/json",
        "Content-Type": "application/json; charset=utf-8",
    };
    const options = {
        method: "POST",
        headers,
        body: JSON.stringify(createBatchProfileBody),
    };
    return await (0, performHttpRequest_1.performHttpRequest)(url, options);
}


/***/ },

/***/ "../../helper/inbound/getBatchProfiles.ts"
/*!************************************************!*\
  !*** ../../helper/inbound/getBatchProfiles.ts ***!
  \************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ID = exports.DisplayName = void 0;
exports.getBatchProfiles = getBatchProfiles;
const performHttpRequest_1 = __webpack_require__(/*! ../performHttpRequest/performHttpRequest */ "../../helper/performHttpRequest/performHttpRequest.ts");
var DisplayName;
(function (DisplayName) {
    DisplayName["BereitsBerechtigteGruppenUndPersonen"] = "Bereits berechtigte Gruppen und Personen";
    DisplayName["ErstellerInDESStapels"] = "Ersteller*in des Stapels";
})(DisplayName || (exports.DisplayName = DisplayName = {}));
var ID;
(function (ID) {
    ID["Da68014B8Faf48Da904BF8B360D0B803"] = "DA68014B-8FAF-48DA-904B-F8B360D0B803";
    ID["The005B1D7A0899481F9E61De43C90F1381"] = "005B1D7A-0899-481F-9E61-DE43C90F1381";
})(ID || (exports.ID = ID = {}));
/**
 * Retrieves batch profiles from the specified base URI using the provided authentication token.
 *
 * @template GetBatchProfiles - The expected response type for the batch profiles.
 * @param baseUri - The base URI of the API endpoint.
 * @param token - The Bearer token used for authentication.
 * @returns A promise that resolves to the batch profiles of type `GetBatchProfiles`.
 */
async function getBatchProfiles(baseUri, token) {
    const url = `${baseUri}/inbound/batchprofile`;
    const headers = {
        "Authorization": `Bearer ${token}`,
        "Accept": "application/json",
        "Content-Type": "application/json",
    };
    const options = {
        method: "GET",
        headers,
    };
    return await (0, performHttpRequest_1.performHttpRequest)(url, options);
}


/***/ },

/***/ "../../helper/inbound/updateBatchProfile.ts"
/*!**************************************************!*\
  !*** ../../helper/inbound/updateBatchProfile.ts ***!
  \**************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.updateBatchProfile = updateBatchProfile;
const performHttpRequest_1 = __webpack_require__(/*! ../performHttpRequest/performHttpRequest */ "../../helper/performHttpRequest/performHttpRequest.ts");
/**
 * Aktualisiert ein bestehendes Stapelprofil (PUT). Nutzt den Link
 * "_links.update" aus getBatchProfiles, sonst /inbound/batchprofile/<id>.
 *
 * @param baseUri - The base URI of the API endpoint.
 * @param token - The bearer token used for authentication.
 * @param profile - Bestehendes Profil (batchProfileId und ggf. _links aus getBatchProfiles).
 * @param body - Neue Einstellungen des Profils.
 */
async function updateBatchProfile(baseUri, token, profile, body) {
    const href = profile._links?.update?.href ?? `/inbound/batchprofile/${profile.batchProfileId}`;
    const url = new URL(href, baseUri).toString();
    const headers = {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
    };
    const options = {
        method: "PUT",
        headers,
        body: JSON.stringify({ ...body, batchProfileId: profile.batchProfileId }),
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

/***/ "../../helper/processstudio/processComponents.ts"
/*!*******************************************************!*\
  !*** ../../helper/processstudio/processComponents.ts ***!
  \*******************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.resolveComponent = resolveComponent;
exports.componentExists = componentExists;
exports.deployProcess = deployProcess;
const performHttpRequest_1 = __webpack_require__(/*! ../performHttpRequest/performHttpRequest */ "../../helper/performHttpRequest/performHttpRequest.ts");
function jsonHeaders(token) {
    return {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        Accept: "application/json",
        "Content-Type": "application/json",
    };
}
/**
 * Lässt Process Studio eine Komponente (z.B. BPMN-Inhalt) auflösen/prüfen -
 * wie der Import in der Oberfläche vor dem Deployment:
 * POST /processstudio/components/resolve mit { type, content }.
 */
async function resolveComponent(baseUri, token, type, content) {
    return await (0, performHttpRequest_1.performHttpRequest)(`${baseUri}/processstudio/components/resolve`, {
        method: "POST",
        headers: jsonHeaders(token),
        body: JSON.stringify({ type, content }),
    });
}
/**
 * Prüft, ob eine Komponente schon existiert:
 * POST /processstudio/components/exists mit { id, name, type }.
 * Die Antwort wird tolerant ausgewertet (true bzw. { exists: true }).
 */
async function componentExists(baseUri, token, id, name, type) {
    const response = await (0, performHttpRequest_1.performHttpRequest)(`${baseUri}/processstudio/components/exists`, {
        method: "POST",
        headers: jsonHeaders(token),
        body: JSON.stringify({ id, name, type }),
    });
    const body = response.body;
    if (typeof body === "boolean")
        return body;
    if (typeof body === "string")
        return body.trim().toLowerCase() === "true";
    return body?.exists === true || body?.idExists === true || body?.nameExists === true;
}
/**
 * Deployt einen BPMN-Prozess (neue Version, falls er schon existiert):
 * POST /processstudio/components/process/deployment mit { type: "process", content }.
 */
async function deployProcess(baseUri, token, content) {
    return await (0, performHttpRequest_1.performHttpRequest)(`${baseUri}/processstudio/components/process/deployment`, {
        method: "POST",
        headers: jsonHeaders(token),
        body: JSON.stringify({ type: "process", content }),
    });
}


/***/ },

/***/ "../../helper/scripting/createScript.ts"
/*!**********************************************!*\
  !*** ../../helper/scripting/createScript.ts ***!
  \**********************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createScript = createScript;
const performHttpRequest_1 = __webpack_require__(/*! ../performHttpRequest/performHttpRequest */ "../../helper/performHttpRequest/performHttpRequest.ts");
async function createScript(baseUri, token, name) {
    const url = `${baseUri}/scripting/script`;
    const headers = {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
    };
    const body = {
        name: name
    };
    const options = {
        method: "POST",
        headers,
        body: JSON.stringify(body),
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

/***/ "../../helper/scripting/getScriptVersion.ts"
/*!**************************************************!*\
  !*** ../../helper/scripting/getScriptVersion.ts ***!
  \**************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getScriptVersion = getScriptVersion;
const performHttpRequest_1 = __webpack_require__(/*! ../performHttpRequest/performHttpRequest */ "../../helper/performHttpRequest/performHttpRequest.ts");
async function getScriptVersion(baseUri, token, scriptId) {
    const url = `${baseUri}/scripting/script/${scriptId}/version`;
    const headers = {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
    };
    const options = {
        method: "GET",
        headers,
    };
    return await (0, performHttpRequest_1.performHttpRequest)(url, options);
}


/***/ },

/***/ "../../helper/scripting/patchScript.ts"
/*!*********************************************!*\
  !*** ../../helper/scripting/patchScript.ts ***!
  \*********************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PatchScript_Scriptbody_CustomerVariable = exports.PatchScript_Scriptbody_OutputProperty = exports.PatchScript_Scriptbody_InputProperty = exports.PatchScript_Scriptbody_Description = exports.PatchScript_Scriptbody_Action = exports.PatchScript_Scriptbody = void 0;
exports.patchScript = patchScript;
const performHttpRequest_1 = __webpack_require__(/*! ../performHttpRequest/performHttpRequest */ "../../helper/performHttpRequest/performHttpRequest.ts");
class PatchScript_Scriptbody {
}
exports.PatchScript_Scriptbody = PatchScript_Scriptbody;
class PatchScript_Scriptbody_Action {
}
exports.PatchScript_Scriptbody_Action = PatchScript_Scriptbody_Action;
class PatchScript_Scriptbody_Description {
}
exports.PatchScript_Scriptbody_Description = PatchScript_Scriptbody_Description;
class PatchScript_Scriptbody_InputProperty {
}
exports.PatchScript_Scriptbody_InputProperty = PatchScript_Scriptbody_InputProperty;
class PatchScript_Scriptbody_OutputProperty {
}
exports.PatchScript_Scriptbody_OutputProperty = PatchScript_Scriptbody_OutputProperty;
class PatchScript_Scriptbody_CustomerVariable {
}
exports.PatchScript_Scriptbody_CustomerVariable = PatchScript_Scriptbody_CustomerVariable;
/**
 * Overrides a script version with the provided body content.
 *
 * @param baseUri - The base URI of the API endpoint.
 * @param token - The authorization token to access the API.
 * @param scriptId - The unique identifier of the script to override.
 * @param scriptVersionId - The unique identifier of the script version to override.
 * @param body - The content to override the script version with.
 * @returns A promise that resolves to the API response containing the overridden script details.
 */
async function patchScript(baseUri, token, scriptId, scriptVersionId, body) {
    const url = `${baseUri}/scripting/script/${scriptId}/version/${scriptVersionId}`;
    const headers = {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
    };
    const options = {
        method: "PATCH",
        headers,
        body: JSON.stringify(body),
    };
    return await (0, performHttpRequest_1.performHttpRequest)(url, options);
}


/***/ },

/***/ "../../helper/usermanagement/createGroup.ts"
/*!**************************************************!*\
  !*** ../../helper/usermanagement/createGroup.ts ***!
  \**************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createGroup = createGroup;
const performHttpRequest_1 = __webpack_require__(/*! ../performHttpRequest/performHttpRequest */ "../../helper/performHttpRequest/performHttpRequest.ts");
async function createGroup(baseUri, token, input) {
    const url = `${baseUri}/usermanagement/group`;
    const headers = {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
    };
    const options = {
        method: "POST",
        headers,
        body: JSON.stringify(input),
    };
    return await (0, performHttpRequest_1.performHttpRequest)(url, options);
}


/***/ },

/***/ "../../helper/usermanagement/getAllGroups.ts"
/*!***************************************************!*\
  !*** ../../helper/usermanagement/getAllGroups.ts ***!
  \***************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getAllGroups = getAllGroups;
const performHttpRequest_1 = __webpack_require__(/*! ../performHttpRequest/performHttpRequest */ "../../helper/performHttpRequest/performHttpRequest.ts");
/**
 * Retrieves all user groups from the user management service.
 *
 * @param baseUri - The base URI of the user management API.
 * @param token - The bearer token used for authentication.
 * @returns A promise that resolves to an `ApiResponse` containing all groups.
 */
async function getAllGroups(baseUri, token) {
    const url = `${baseUri}/usermanagement/group`;
    const headers = {
        "Authorization": `Bearer ${token}`,
        "Accept": "application/json",
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

/***/ "../../helper/webindexlayouter/getWebindexConfigurations.ts"
/*!******************************************************************!*\
  !*** ../../helper/webindexlayouter/getWebindexConfigurations.ts ***!
  \******************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getWebindexConfigurations = getWebindexConfigurations;
exports.findWebindexConfiguration = findWebindexConfiguration;
const performHttpRequest_1 = __webpack_require__(/*! ../performHttpRequest/performHttpRequest */ "../../helper/performHttpRequest/performHttpRequest.ts");
/**
 * Liest die Webindex-Layout-Konfigurationen aller Apps
 * (GET /webindexlayouter/api/v1/apps/configurations) - z.B. als Sicherung vor
 * dem Überschreiben mit replaceDocumentReaderWebindexForm.
 *
 * @param baseUri - The base URI of the API endpoint.
 * @param token - Optional bearer token; ohne Token wird die Browser-Session genutzt.
 * @returns Die Konfigurationen (JSON, Format je nach API-Version).
 */
async function getWebindexConfigurations(baseUri, token) {
    const url = `${baseUri}/webindexlayouter/api/v1/apps/configurations`;
    const headers = {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        Accept: "application/json",
    };
    const options = {
        method: "GET",
        headers,
    };
    return await (0, performHttpRequest_1.performHttpRequest)(url, options);
}
/**
 * Sucht in der Antwort von getWebindexConfigurations die Konfiguration einer
 * App (Standard: Rechnungsleser "classcon-documentreader") - Liste direkt oder
 * unter "configurations"/"apps"/"items"/"value", erkannt am Feld "name" bzw.
 * "appId"/"id". undefined = nicht gefunden.
 */
function findWebindexConfiguration(configurations, appName = "classcon-documentreader") {
    const body = configurations;
    const list = Array.isArray(body)
        ? body
        : body?.configurations ?? body?.apps ?? body?.items ?? body?.value;
    if (Array.isArray(list)) {
        return list.find((entry) => [entry?.name, entry?.appId, entry?.id, entry?.app].includes(appName));
    }
    // Objekt mit den App-Namen als Schlüssel.
    if (body && typeof body === "object" && appName in body) {
        return body[appName];
    }
    return undefined;
}


/***/ },

/***/ "../../helper/webindexlayouter/replaceDocumentReaderWebindexForm.ts"
/*!**************************************************************************!*\
  !*** ../../helper/webindexlayouter/replaceDocumentReaderWebindexForm.ts ***!
  \**************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.replaceDocumentReaderWebindexForm = replaceDocumentReaderWebindexForm;
const performHttpRequest_1 = __webpack_require__(/*! ../performHttpRequest/performHttpRequest */ "../../helper/performHttpRequest/performHttpRequest.ts");
/**
 * Replaces the webindex layout configuration for the Document Reader app via a PUT request.
 *
 * @template T The expected response type.
 * @param baseUri - The base URI of the API endpoint.
 * @param token - The Bearer token used for authentication.
 * @param webindexLayout - The new webindex layout configuration to be set.
 * @returns A promise resolving to the response of type `T`.
 */
async function replaceDocumentReaderWebindexForm(baseUri, token, webindexLayout) {
    const url = `${baseUri}/webindexlayouter/api/v1/apps/classcon-documentreader/configuration`;
    const body = {
        webindexLayout
    };
    const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    };
    const options = {
        method: "PUT",
        headers,
        body: webindexLayout,
    };
    return await (0, performHttpRequest_1.performHttpRequest)(url, options);
}


/***/ },

/***/ "./src/forms/form.ts"
/*!***************************!*\
  !*** ./src/forms/form.ts ***!
  \***************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const logger_1 = __webpack_require__(/*! ../../../../helper/utils/logger */ "../../helper/utils/logger.ts");
const getBatchProfiles_1 = __webpack_require__(/*! ../../../../helper/inbound/getBatchProfiles */ "../../helper/inbound/getBatchProfiles.ts");
const createBatchProfile_1 = __webpack_require__(/*! ../../../../helper/inbound/createBatchProfile */ "../../helper/inbound/createBatchProfile.ts");
const updateBatchProfile_1 = __webpack_require__(/*! ../../../../helper/inbound/updateBatchProfile */ "../../helper/inbound/updateBatchProfile.ts");
const updateEmailinboundProfile_1 = __webpack_require__(/*! ../../../../helper/emailinbound/updateEmailinboundProfile */ "../../helper/emailinbound/updateEmailinboundProfile.ts");
const getMappingContainers_1 = __webpack_require__(/*! ../../../../helper/dms/getMappingContainers */ "../../helper/dms/getMappingContainers.ts");
const getScriptVersion_1 = __webpack_require__(/*! ../../../../helper/scripting/getScriptVersion */ "../../helper/scripting/getScriptVersion.ts");
const patchScript_1 = __webpack_require__(/*! ../../../../helper/scripting/patchScript */ "../../helper/scripting/patchScript.ts");
const getGroups_1 = __webpack_require__(/*! ../../../../helper/identityprovider/getGroups */ "../../helper/identityprovider/getGroups.ts");
const createGroup_1 = __webpack_require__(/*! ../../../../helper/usermanagement/createGroup */ "../../helper/usermanagement/createGroup.ts");
const getAllGroups_1 = __webpack_require__(/*! ../../../../helper/usermanagement/getAllGroups */ "../../helper/usermanagement/getAllGroups.ts");
const getEmailinboundProfiles_1 = __webpack_require__(/*! ../../../../helper/emailinbound/getEmailinboundProfiles */ "../../helper/emailinbound/getEmailinboundProfiles.ts");
const createEmailinboundProfile_1 = __webpack_require__(/*! ../../../../helper/emailinbound/createEmailinboundProfile */ "../../helper/emailinbound/createEmailinboundProfile.ts");
const replaceDocumentReaderWebindexForm_1 = __webpack_require__(/*! ../../../../helper/webindexlayouter/replaceDocumentReaderWebindexForm */ "../../helper/webindexlayouter/replaceDocumentReaderWebindexForm.ts");
const getWebindexConfigurations_1 = __webpack_require__(/*! ../../../../helper/webindexlayouter/getWebindexConfigurations */ "../../helper/webindexlayouter/getWebindexConfigurations.ts");
const tableExport_1 = __webpack_require__(/*! ../../../../helper/utils/tableExport */ "../../helper/utils/tableExport.ts");
const getRepositories_1 = __webpack_require__(/*! ../../../../helper/dms/getRepositories */ "../../helper/dms/getRepositories.ts");
const createSourceMapping_1 = __webpack_require__(/*! ../../../../helper/dms/createSourceMapping */ "../../helper/dms/createSourceMapping.ts");
const getAllScripts_1 = __webpack_require__(/*! ../../../../helper/scripting/getAllScripts */ "../../helper/scripting/getAllScripts.ts");
const createScript_1 = __webpack_require__(/*! ../../../../helper/scripting/createScript */ "../../helper/scripting/createScript.ts");
const setDmspostimport_1 = __webpack_require__(/*! ../../../../helper/eventbridge/setDmspostimport */ "../../helper/eventbridge/setDmspostimport.ts");
const synchronizeEventbride_1 = __webpack_require__(/*! ../../../../helper/eventbridge/synchronizeEventbride */ "../../helper/eventbridge/synchronizeEventbride.ts");
const getApps_1 = __webpack_require__(/*! ../../../../helper/dash/getApps */ "../../helper/dash/getApps.ts");
const getFeatures_1 = __webpack_require__(/*! ../../../../helper/classcon-documentreader/getFeatures */ "../../helper/classcon-documentreader/getFeatures.ts");
const setDocumentProcessingConfiguration_1 = __webpack_require__(/*! ../../../../helper/classcon-documentreader/setDocumentProcessingConfiguration */ "../../helper/classcon-documentreader/setDocumentProcessingConfiguration.ts");
const getCurrentUserInformation_1 = __webpack_require__(/*! ../../../../helper/identityprovider/getCurrentUserInformation */ "../../helper/identityprovider/getCurrentUserInformation.ts");
const createAPIKey_1 = __webpack_require__(/*! ../../../../helper/identityprovider/createAPIKey */ "../../helper/identityprovider/createAPIKey.ts");
const getAllUsers_1 = __webpack_require__(/*! ../../../../helper/identityprovider/getAllUsers */ "../../helper/identityprovider/getAllUsers.ts");
const batchProfileMail_json_1 = __importDefault(__webpack_require__(/*! ../data/batchProfileMail.json */ "./src/data/batchProfileMail.json"));
const batchProfileScan_json_1 = __importDefault(__webpack_require__(/*! ../data/batchProfileScan.json */ "./src/data/batchProfileScan.json"));
const webindexDesignerForm_json_1 = __importDefault(__webpack_require__(/*! ../data/webindexDesignerForm.json */ "./src/data/webindexDesignerForm.json"));
// Beim Build zuerst aus src/scripts/gutschriftenVerschieben.ts gebaut (siehe
// "build" in package.json) und hier als Text eingebunden.
const gutschriftenVerschieben_js_raw_1 = __importDefault(__webpack_require__(/*! ../../dist/scripts/gutschriftenVerschieben.js?raw */ "./dist/scripts/gutschriftenVerschieben.js?raw"));
const preExport_js_raw_1 = __importDefault(__webpack_require__(/*! ../../dist/scripts/preExport.js?raw */ "./dist/scripts/preExport.js?raw"));
const duplicateDetection_js_raw_1 = __importDefault(__webpack_require__(/*! ../../dist/scripts/duplicateDetection.js?raw */ "./dist/scripts/duplicateDetection.js?raw"));
const angebotMitAuftragVerknuepfen_js_raw_1 = __importDefault(__webpack_require__(/*! ../../dist/scripts/angebotMitAuftragVerknuepfen.js?raw */ "./dist/scripts/angebotMitAuftragVerknuepfen.js?raw"));
const Rechnungsleser_Gutschriften_verschieben_v1_bpmn_raw_1 = __importDefault(__webpack_require__(/*! ../data/Rechnungsleser Gutschriften verschieben_v1.bpmn?raw */ "./src/data/Rechnungsleser Gutschriften verschieben_v1.bpmn?raw"));
const processComponents_1 = __webpack_require__(/*! ../../../../helper/processstudio/processComponents */ "../../helper/processstudio/processComponents.ts");
const d3EndpointService_1 = __webpack_require__(/*! ../../../../helper/classcon-documentreader/d3EndpointService */ "../../helper/classcon-documentreader/d3EndpointService.ts");
const getEventbridgeConfig_1 = __webpack_require__(/*! ../../../../helper/eventbridge/getEventbridgeConfig */ "../../helper/eventbridge/getEventbridgeConfig.ts");
const serviceBusEndpointMapping_1 = __webpack_require__(/*! ../../../../helper/classcon-documentreader/serviceBusEndpointMapping */ "../../helper/classcon-documentreader/serviceBusEndpointMapping.ts");
// XSLT für den SFTP-Export (gibt das fertige Export-XML aus dem Attribut
// "exportXML" als Text aus) - als Text ins Bundle eingebunden.
const sftpExportStylesheet_xsl_raw_1 = __importDefault(__webpack_require__(/*! ../data/sftpExportStylesheet.xsl?raw */ "./src/data/sftpExportStylesheet.xsl?raw"));
const sftpEndpointService_1 = __webpack_require__(/*! ../../../../helper/classcon-documentreader/sftpEndpointService */ "../../helper/classcon-documentreader/sftpEndpointService.ts");
const masterFile_1 = __webpack_require__(/*! ../../../../helper/classcon-documentreader/masterFile */ "../../helper/classcon-documentreader/masterFile.ts");
const endpointServices_1 = __webpack_require__(/*! ../../../../helper/classcon-documentreader/endpointServices */ "../../helper/classcon-documentreader/endpointServices.ts");
const metadataEndpointService_1 = __webpack_require__(/*! ../../../../helper/classcon-documentreader/metadataEndpointService */ "../../helper/classcon-documentreader/metadataEndpointService.ts");
const impersonateWhitelist_1 = __webpack_require__(/*! ../../../../helper/identityprovider/impersonateWhitelist */ "../../helper/identityprovider/impersonateWhitelist.ts");
const extensionPoints_1 = __webpack_require__(/*! ../../../../helper/classcon-documentreader/extensionPoints */ "../../helper/classcon-documentreader/extensionPoints.ts");
/**
 * Onboarding gevis ECM Rechnungsleser (ehemals
 * projects/OnboardingGevisECMDocumentReader - dort als lokales Node-Script
 * src/script.ts plus unfertigem Formular): richtet den Rechnungsleser in einem
 * Mandanten Schritt für Schritt ein (je Stapelprofil und je Postfach ein
 * eigener Schritt). Jeder Schritt zeigt, ob er fehlt (→ anlegen) oder schon
 * vorhanden ist (→ auf die Vorlage aktualisieren) und lässt sich einzeln
 * ausführen; gesammelt geht "Alle fehlenden anlegen" bzw. "Alles anlegen /
 * aktualisieren". Nicht aktualisiert werden bestehende Gruppen (Mitglieder
 * blieben sonst nicht erhalten) und der hinterlegte API-Key im Skript
 * (customerVariables).
 *
 * Schritt 1 legt die Berechtigungsgruppe fest (neu anlegen oder vorhandene
 * per Dropdown wählen, direkt in der Zeile des Schritts); Stapelprofile und
 * Postfächer werden beim Anlegen/Aktualisieren für genau diese Gruppe
 * berechtigt (siehe resolveTargetGroup).
 *
 * Vorgeschaltet ist eine Konfigurationsseite: API-Key (eingeben oder neu
 * erstellen, wird beim "Weiter" geprüft) und ERP-Zielsystem (VEO oder gevis
 * R-Linie). Schritte, die nur für ein ERP-System gelten, tragen das in
 * Step.erp ein und erscheinen nur bei passender Auswahl.
 *
 * Alle Aufrufe laufen mit dem im Formular eingegebenen (oder hier neu
 * erstellten) API-Key - der wird außerdem beim Neuanlegen im Gutschriften-
 * Skript hinterlegt. Der Key wird nirgends im Formular
 * gespeichert, nur im Speicher dieser Seite.
 *
 * Nicht übernommen: die im alten Script auskommentierten gevis-R-Schritte
 * (SFTP-Zielsystem, XML-Aufbereitungs-Script, Extension Point) und das
 * d.velop-Zielsystem.
 *
 * Das Feld-Layout (nur die Content-Komponente "result") liegt als Code in
 * src/forms/form.json und wird von der Toolbox bei jedem Anlegen/
 * Aktualisieren mit ausgerollt. Das bestehende Formular behält seine GUID
 * (PINNED_FORM_IDS in projects/Toolbox/generateTargetForms.js).
 *
 * VERSION_COUNTER unten NICHT umbenennen, der Name ist projektübergreifend
 * fest "VERSION_COUNTER" (siehe generateTargetForms.js) -
 * .github/workflows/publish-bundles.yml stempelt beim Publish den nächsten
 * Stand nur ins veröffentlichte Bundle - der Wert hier ist ein Platzhalter und
 * wird nicht hochgezählt.
 */
const VERSION_COUNTER = 26;
const logger = (0, logger_1.initLogger)(logger_1.LogLevel.INFO);
const BASE_URI = window.location.origin;
const SUBDOMAIN = window.location.hostname.split(".")[0];
// Komponenten-Key aus src/forms/form.json.
const resultKey = "result";
// Feste Werte aus dem bisherigen Onboarding (Formular bzw. Script).
const ADMIN_GROUP_NAME = "Administrative group for the tenant";
const GROUP_FRUEHES_SCANNEN_NAME = "gevis ECM Frühes Scannen";
const PROFILE_MAIL_NAME = "Frühes Scannen (Mail)";
const PROFILE_SCAN_NAME = "Frühes Scannen (Scan)";
const CREDIT_MEMO_SCRIPT_NAME = "Rechnungsleser Gutschriften verschieben";
// Skript für den Extension Point "vor dem Export" des Rechnungslesers
// (src/scripts/preExport.ts).
const PRE_EXPORT_SCRIPT_NAME = "Rechnungsleser PreExport";
const BEFORE_EXPORT_NODE_ID = "IR_Business_BeforeExportHook";
const BEFORE_EXPORT_PROFILE = "PreExportScript";
// Skript für den Extension Point "nach der Extraktion" (Dublettenerkennung,
// src/scripts/duplicateDetection.ts).
const DUPLICATE_DETECTION_SCRIPT_NAME = "Rechnungsleser Dublettenerkennung";
const POST_EXTRACTION_NODE_ID = "IR_Business_PostExtractionScript";
const POST_EXTRACTION_PROFILE = "PostExtractionScript";
// Eingabeparameter der Aktion - muss zu DOC_ID_INPUT in
// src/scripts/gutschriftenVerschieben.ts passen.
const CREDIT_MEMO_INPUT_DOC_ID = "docId";
// Werte, die beim Neuanlegen des Skripts hinterlegt werden (aus dem bisherigen
// Script-Export übernommen); der API-Key kommt aus der Konfigurationsseite.
const CREDIT_MEMO_VARIABLES = [
    { key: "categoryCreditMemoGUID", value: "52a84dbc-31bf-4351-9c16-4852dc2e816d", encrypted: false },
    { key: "fieldDocumentTypeGUID", value: "717f4480-f16c-4838-96a3-f69a01eb41f1", encrypted: false },
    { key: "fieldDocumentTypeValueMatch", value: "CreditAdvice", encrypted: false },
];
// Aktion "Angebot mit Auftrag verknüpfen" (src/scripts/angebotMitAuftragVerknuepfen.ts,
// ehemals projects/LinkQuoteWithOrder) - wird im BPMN eingebunden.
const LINK_QUOTE_SCRIPT_NAME = "Angebot mit Auftrag verknüpfen";
// Eingabeparameter der Aktion - muss zu DOC_ID_INPUT im Skript passen.
const LINK_QUOTE_INPUT_DOC_ID = "docId";
// Werte, die beim Neuanlegen des Skripts hinterlegt werden (aus
// projects/LinkQuoteWithOrder übernommen).
const LINK_QUOTE_VARIABLES = [
    { key: "dmsCategoryDebAngeboteGUID", value: "f97cacec-54a9-4cdb-9111-9d02b1bd06e4", encrypted: false },
    { key: "dmsFieldBelegNrGUID", value: "d73f3204-7e60-49a8-8586-1d9fe00061e1", encrypted: false },
    { key: "dmsFieldAngebotsNrnGUID", value: "a5de04a2-132d-436f-b328-4d1d9fc19aef", encrypted: false },
    { key: "dmsFieldAuftragsNrnGUID", value: "13497c25-d5ac-455c-9084-2c85c9ef50b4", encrypted: false },
];
const API_KEY_LABEL = "Onboarding Gevis ECM Document Reader";
const MAILBOXES = [
    { mailbox: "fruehesscannenmail", description: PROFILE_MAIL_NAME, profileName: PROFILE_MAIL_NAME },
    { mailbox: "fruehesscannenscan", description: PROFILE_SCAN_NAME, profileName: PROFILE_SCAN_NAME },
];
const SOURCE_MAPPING = {
    name: "Rechnungsleser",
    sourceId: "/classcon-documentreader/sources/invoices",
    mappingItems: [
        { source: "InvoiceNumber", destination: "9ebfdb3d-e096-49ba-b854-56e09b39db5a", isSystemProperty: false, regexIgnoreCase: false, type: 0 },
        { source: "documentCategory", destination: "fc3d3e6d-46f6-4fcd-84e3-db79e14b2751", isSystemProperty: false, regexIgnoreCase: false, type: 1 },
        { source: "VENDOR_NUM", destination: "17d56c68-f74d-40ca-989c-9ecd80c773bd", isSystemProperty: false, regexIgnoreCase: false, type: 0 },
        { source: "VENDOR_NAME", destination: "348219f7-cd82-42bd-aa3d-57dafc4bf9ef", isSystemProperty: false, regexIgnoreCase: false, type: 0 },
        { source: "OrderNum", destination: "1c13a20f-cf94-460a-ba49-3dd83cbce609", isSystemProperty: false, regexIgnoreCase: false, type: 0 },
        { source: "Rechnungstyp", destination: "e6bef93c-ac18-40bb-8afb-93ba48b3b176", isSystemProperty: false, regexIgnoreCase: false, type: 0 },
        { source: "InvoiceDate", destination: "e16f89a9-a8de-4f55-b287-415e4a543701", isSystemProperty: false, regexIgnoreCase: false, type: 0 },
        { source: "NAME", destination: "49f2d260-5fc4-4331-9da6-aa553a5ee044", isSystemProperty: false, regexIgnoreCase: false, type: 0 },
        { source: "GrossAmount", destination: "3d07a2af-546f-4360-8254-daeec02dd101", isSystemProperty: false, regexIgnoreCase: false, type: 0 },
        { source: "NetAmount1", destination: "98ff7208-08d6-4f7a-bf19-63c1b61c12e1", isSystemProperty: false, regexIgnoreCase: false, type: 0 },
        { source: "NetAmount2", destination: "7342cada-e4b0-481a-bd22-990555287524", isSystemProperty: false, regexIgnoreCase: false, type: 0 },
        { source: "VatRate1", destination: "8a23cfb1-a13f-40b4-aec9-126b451f3b22", isSystemProperty: false, regexIgnoreCase: false, type: 0 },
        { source: "VatRate2", destination: "81f354c2-a6ef-492a-bbda-a7eefe5bb9dd", isSystemProperty: false, regexIgnoreCase: false, type: 0 },
        { source: "Barcode", destination: "property_document_number", isSystemProperty: true, regexIgnoreCase: false, type: 0 },
        { source: "DocumentType", destination: "717f4480-f16c-4838-96a3-f69a01eb41f1", isSystemProperty: false, regexIgnoreCase: false, type: 0 },
    ],
};
async function ensureSwal() {
    await loadSweetAlert();
    if (typeof Swal === "undefined") {
        throw new Error("Dialog-Bibliothek (SweetAlert2) konnte nicht geladen werden.");
    }
}
async function confirmWarning(title, html, confirmText) {
    await ensureSwal();
    const result = await Swal.fire({
        icon: "warning",
        title,
        html,
        showCancelButton: true,
        confirmButtonColor: "#dc3545",
        confirmButtonText: confirmText,
        cancelButtonText: "Abbrechen",
        focusCancel: true,
    });
    return !!result.isConfirmed;
}
// Sichert das aktuelle Layout als JSON-Datei, z.B.
// "Ellinger_Webindex-Layout_Rechnungsleser_2026-09-26.json".
async function downloadCurrentWebindexLayout(apiKey) {
    const configurations = (await (0, getWebindexConfigurations_1.getWebindexConfigurations)(BASE_URI, apiKey)).body;
    // Möglichst nur die Rechnungsleser-Konfiguration sichern (gleiches Format
    // wie beim Überschreiben), sonst die komplette Antwort.
    const current = (0, getWebindexConfigurations_1.findWebindexConfiguration)(configurations) ?? configurations;
    const content = typeof current === "string" ? current : JSON.stringify(current, null, 2);
    if (!content || content === "{}") {
        throw new Error("Das aktuelle Webindex-Layout ist leer oder konnte nicht gelesen werden.");
    }
    const date = new Date().toISOString().slice(0, 10);
    const fileName = [(0, tableExport_1.getTenantName)(), "Webindex-Layout_Rechnungsleser", date].filter(Boolean).join("_") + ".json";
    (0, tableExport_1.downloadBlob)(new Blob([content], { type: "application/json" }), fileName);
}
// Swal mit deutlichem Hinweis aufs Überschreiben und (vorausgewählter)
// Sicherung des aktuellen Layouts. Schlägt die Sicherung fehl, wird NICHT
// überschrieben.
async function confirmWebindexOverwrite(apiKey) {
    await ensureSwal();
    const result = await Swal.fire({
        icon: "warning",
        title: "Achtung: Webindex-Layout wird überschrieben",
        html: `
      <p>Das aktuelle Webindex-Layout des Rechnungslesers wird <strong>vollständig und unwiderruflich</strong> durch die gevis-ECM-Vorlage ersetzt.
      Eigene Anpassungen gehen dabei verloren.</p>
      <label style="display:flex;gap:8px;align-items:center;justify-content:center;margin-top:12px;cursor:pointer">
        <input type="checkbox" id="onb-swal-backup" checked style="width:16px;height:16px">
        Aktuelles Webindex-Layout vorher herunterladen (Sicherung)
      </label>`,
        showCancelButton: true,
        confirmButtonColor: "#dc3545",
        confirmButtonText: "Überschreiben",
        cancelButtonText: "Abbrechen",
        focusCancel: true,
        preConfirm: () => {
            const checkbox = Swal.getPopup().querySelector("#onb-swal-backup");
            return { backup: !!checkbox?.checked };
        },
    });
    if (!result.isConfirmed) {
        return false;
    }
    if (result.value?.backup) {
        try {
            await downloadCurrentWebindexLayout(apiKey);
        }
        catch (error) {
            await Swal.fire({
                icon: "error",
                title: "Sicherung fehlgeschlagen",
                html: `Das aktuelle Layout konnte nicht heruntergeladen werden - es wurde <strong>nichts überschrieben</strong>.<br><br>${escapeHtml(getErrorMessage(error))}`,
            });
            return false;
        }
    }
    return true;
}
function done(text) {
    return { state: "done", text };
}
function missing(text) {
    return { state: "missing", text };
}
async function getRepositoryId(apiKey) {
    const repositoryId = (await (0, getRepositories_1.getRepositories)(BASE_URI, apiKey)).body.repositories?.[0]?.id;
    if (!repositoryId) {
        throw new Error("Kein DMS-Repository gefunden.");
    }
    return repositoryId;
}
async function findScriptIdByName(apiKey, name) {
    const scripts = (await (0, getAllScripts_1.getAllScripts)(BASE_URI, apiKey)).body ?? [];
    return scripts.find((script) => script.name === name)?.id;
}
function scriptRunUrl(scriptId) {
    return `${BASE_URI}/scripting/script/${scriptId}/run`;
}
// Soll-Zustand eines Extension Points mit eigenem Skript: aktiv,
// ScriptingApp, ruft das Skript auf.
function isHookConfigured(point, endpoint) {
    return !!point && point.IsActivated && point.ExtensionPointType === "ScriptingApp" && point.ScriptingAppEndpoint === endpoint;
}
// Prozess-Id und -Name aus dem BPMN (<bpmn:process id="..." name="...">).
function bpmnProcessInfo(bpmn) {
    const tag = bpmn.match(/<bpmn:process\b[^>]*>/)?.[0] ?? "";
    const id = tag.match(/\bid="([^"]+)"/)?.[1];
    const name = tag.match(/\bname="([^"]+)"/)?.[1];
    if (!id || !name) {
        throw new Error("Prozess-Id/-Name im BPMN nicht gefunden.");
    }
    return { id, name };
}
// Das BPMN ruft die Aktion "Gutschriften verschieben" über die Id aus dem
// Mandanten auf, in dem es modelliert wurde ("scripting_<script>-<version>").
// Vor dem Hochladen durch die Aktions-Id des Skripts in DIESEM Mandanten
// ersetzen.
async function bpmnForTenant(apiKey) {
    const scriptId = await findCreditMemoScriptId(apiKey);
    if (!scriptId) {
        throw new Error(`Skript „${CREDIT_MEMO_SCRIPT_NAME}“ nicht gefunden - bitte zuerst das Skript anlegen.`);
    }
    const version = (await (0, getScriptVersion_1.getScriptVersion)(BASE_URI, apiKey, scriptId)).body[0];
    if (!version?.id) {
        throw new Error(`Für „${CREDIT_MEMO_SCRIPT_NAME}“ wurde keine Version gefunden.`);
    }
    if (!version.actionEnabled) {
        throw new Error(`„${CREDIT_MEMO_SCRIPT_NAME}“ ist noch keine Aktion - bitte zuerst den Skript-Schritt ausführen.`);
    }
    const actionId = `scripting_${version.action?.id ?? `${scriptId}-${version.id}`}`;
    const pattern = /(<camunda:inputParameter name="actionId">)scripting_[^<]+(<\/camunda:inputParameter>)/g;
    if (!pattern.test(Rechnungsleser_Gutschriften_verschieben_v1_bpmn_raw_1.default)) {
        throw new Error("Im BPMN wurde kein Aufruf einer Skript-Aktion gefunden.");
    }
    return Rechnungsleser_Gutschriften_verschieben_v1_bpmn_raw_1.default.replace(pattern, `$1${actionId}$2`);
}
async function findCreditMemoScriptId(apiKey) {
    const scripts = (await (0, getAllScripts_1.getAllScripts)(BASE_URI, apiKey)).body ?? [];
    return scripts.find((script) => script.name === CREDIT_MEMO_SCRIPT_NAME)?.id;
}
// Gruppennamen tolerant vergleichen: Groß-/Kleinschreibung, mehrfache
// Leerzeichen und unterschiedlich kodierte Umlaute ("ü" als ein Zeichen oder
// als "u" + Trema) sollen keinen Unterschied machen.
function normalizeGroupName(name) {
    return (name ?? "").normalize("NFC").replace(/\s+/g, " ").trim().toLowerCase();
}
// Gruppen aus Benutzerverwaltung UND Identityprovider (SCIM) - je nach
// Mandant ist eine Gruppe nur in einer der beiden Listen vollständig.
async function loadGroups(apiKey) {
    const [management, scim] = await Promise.all([
        (0, getAllGroups_1.getAllGroups)(BASE_URI, apiKey).then((r) => r.body.groups ?? []).catch(() => []),
        (0, getGroups_1.getGroups)(BASE_URI, apiKey).then((r) => r.body.resources ?? []).catch(() => []),
    ]);
    const groups = new Map();
    for (const group of management) {
        if (group.id && group.name)
            groups.set(group.id.toLowerCase(), { id: group.id, name: group.name });
    }
    for (const group of scim) {
        if (group.id && group.displayName && !groups.has(group.id.toLowerCase())) {
            groups.set(group.id.toLowerCase(), { id: group.id, name: group.displayName });
        }
    }
    if (groups.size === 0) {
        throw new Error("Gruppen konnten nicht geladen werden - ist der API-Key gültig?");
    }
    return [...groups.values()];
}
function findGroupId(groups, name, id) {
    const wanted = normalizeGroupName(name);
    return groups.find((group) => (id && group.id.toLowerCase() === id.toLowerCase()) || normalizeGroupName(group.name) === wanted)?.id;
}
function findGroup(groups, name, id) {
    const groupId = findGroupId(groups, name, id);
    return groups.find((group) => group.id === groupId);
}
function newGroupBody(name, id, userMembers) {
    return {
        name,
        id,
        isGlobalGroup: false,
        isScimProvisioned: false,
        isTenantAdminGroup: false,
        showChangeToGlobalGroupButton: true,
        groupTypes: [],
        groupMembers: [],
        idpGroupMembers: [],
        userMembers,
        idpUserMembers: [],
    };
}
// Berechtigungsgruppe aus Schritt 1: neu anlegen (Name frei wählbar) oder
// eine vorhandene Gruppe verwenden. Sie wird in den Stapelprofilen und
// Postfächern berechtigt.
// Eventbridge-Schritt in dieser Sitzung ausgeführt (siehe Schritt "eventbridge").
// Dublettenprüfung in dieser Sitzung ausgeschaltet (siehe Schritt "duplicateCheck").
let impersonationAdded = false;
// App-Name des Rechnungslesers (vertrauenswürdige App im Identityprovider).
const DOCUMENT_READER_APP = "classcon-documentreader";
// Soll-Zustand des Zielsystems (d.3-Endpunkt) des Rechnungslesers.
async function targetEndpointSettings(apiKey) {
    return {
        ApiKey: apiKey,
        RepositoryId: await getRepositoryId(apiKey),
        D3Owner: "Editor",
        EndpointServiceOutputStructure: "MainDocWithAttachments",
    };
}
// ---------------------------------------------------------------------------
// Stammdaten: Mandanten (CC_Companies.csv)
// ---------------------------------------------------------------------------
const COMPANY_FILE_NAME = "CC_Companies.csv";
// Spalten in der Reihenfolge der Datei - label/placeholder für den Dialog.
const COMPANY_COLUMNS = [
    { key: "COMPANY_NUM", label: "Mandanten-Nr.", placeholder: "z.B. 1000", required: true },
    { key: "NAME", label: "Name", placeholder: "Firmenname", required: true },
    { key: "STR", label: "Straße", placeholder: "Straße Hausnr." },
    { key: "ZIP", label: "PLZ", placeholder: "PLZ" },
    { key: "CITY", label: "Ort", placeholder: "Ort" },
    { key: "COUNTRY", label: "Land", placeholder: "z.B. DE" },
    { key: "DEFAULT_CURRENCY", label: "Währung", placeholder: "z.B. EUR" },
    { key: "BLACK", label: "BLACK", placeholder: "" },
    { key: "ERPTENANT_ID", label: "ERP-Mandant-ID", placeholder: "" },
    { key: "COMPANY_ID", label: "Company-ID", placeholder: "" },
];
// Zuletzt eingegebene Mandanten (bleiben für einen erneuten Lauf erhalten).
let companies = [];
function emptyCompany() {
    return Object.fromEntries(COMPANY_COLUMNS.map((column) => [column.key, ""]));
}
function companyRowHtml(company) {
    const cells = COMPANY_COLUMNS
        .map((column) => `<td><input type="text" class="form-control form-control-sm" data-company-field="${column.key}" value="${escapeHtml(company[column.key] ?? "")}" placeholder="${escapeHtml(column.placeholder)}" aria-label="${escapeHtml(column.label)}"></td>`)
        .join("");
    return `<tr data-company-row>${cells}<td><button type="button" class="btn btn-sm btn-link text-danger p-0" data-company-remove title="Zeile entfernen">✕</button></td></tr>`;
}
// Eingabetabelle der Mandanten auf der Konfigurationsseite.
function renderCompanyTable() {
    const head = COMPANY_COLUMNS.map((c) => `<th>${escapeHtml(c.label)}${c.required ? " *" : ""}</th>`).join("");
    const rows = (companies.length ? companies : [emptyCompany()]).map(companyRowHtml).join("");
    return `
        <div class="onb-company-wrap">
          <table class="onb-company-table"><thead><tr>${head}<th></th></tr></thead><tbody data-company-body>${rows}</tbody></table>
        </div>
        <button type="button" class="btn btn-sm btn-outline-secondary mt-2" data-company-add>+ Mandant hinzufügen</button>`;
}
// Liest die Tabelle in "companies" (komplett leere Zeilen zählen nicht).
function readCompanyTable(root) {
    companies = Array.from(root.querySelectorAll("[data-company-row]")).map((row) => {
        const company = emptyCompany();
        row.querySelectorAll("[data-company-field]").forEach((input) => {
            company[input.dataset.companyField ?? ""] = input.value.trim();
        });
        return company;
    }).filter((company) => Object.values(company).some(Boolean));
}
function bindCompanyTable(root) {
    const body = root.querySelector("[data-company-body]");
    if (!body)
        return;
    const bindRow = (row) => {
        row.querySelectorAll("[data-company-field]").forEach((input) => {
            input.addEventListener("input", () => readCompanyTable(root));
            input.addEventListener("keydown", (event) => {
                if (event.key === "Enter")
                    event.preventDefault();
            });
        });
        row.querySelector("[data-company-remove]")?.addEventListener("click", () => {
            if (body.querySelectorAll("[data-company-row]").length > 1) {
                row.remove();
            }
            else {
                row.querySelectorAll("[data-company-field]").forEach((input) => (input.value = ""));
            }
            readCompanyTable(root);
        });
    };
    body.querySelectorAll("[data-company-row]").forEach(bindRow);
    root.querySelector("[data-company-add]")?.addEventListener("click", () => {
        body.insertAdjacentHTML("beforeend", companyRowHtml(emptyCompany()));
        const added = body.lastElementChild;
        if (added) {
            bindRow(added);
            added.querySelector("input")?.focus();
        }
    });
}
// Prüft die Mandanten; liefert eine Fehlermeldung oder undefined.
function validateCompanies() {
    if (!companies.length) {
        return "Bitte mindestens einen Mandanten für die Stammdaten eintragen.";
    }
    for (const [index, company] of companies.entries()) {
        for (const column of COMPANY_COLUMNS) {
            const value = company[column.key];
            if (column.required && !value) {
                return `Mandanten, Zeile ${index + 1}: „${column.label}“ fehlt.`;
            }
            const problem = (0, masterFile_1.invalidMasterFileValue)(value);
            if (problem) {
                return `Mandanten, Zeile ${index + 1}: „${column.label}“ ${problem}.`;
            }
        }
    }
    const numbers = companies.map((company) => company.COMPANY_NUM);
    const duplicate = numbers.find((num, i) => numbers.indexOf(num) !== i);
    return duplicate ? `Mandanten-Nr. „${duplicate}“ ist doppelt.` : undefined;
}
function companiesCsv(list) {
    return (0, masterFile_1.buildMasterFileCsv)(COMPANY_COLUMNS.map((column) => column.key), list.map((company) => COMPANY_COLUMNS.map((column) => company[column.key] ?? "")));
}
// Ist das Zielsystem <name> im Rechnungsleser eingerichtet? (Übersichtsseite
// "Zielsysteme" listet jedes eingerichtete Zielsystem mit seinem Namen als id.)
async function isEndpointConfigured(apiKey, name) {
    const subscriptionId = await findDocumentReaderSubscriptionId(apiKey);
    return (await (0, endpointServices_1.getConfiguredEndpointServices)(BASE_URI, apiKey, subscriptionId)).includes(name);
}
// SFTP-Zielsystem für gevis R-Linie - Werte von der Konfigurationsseite.
function sftpEndpointSettings() {
    return {
        Host: sftpConfig.host.trim(),
        Port: sftpConfig.port.trim(),
        User: sftpConfig.user.trim(),
        Password: sftpConfig.password,
        Directory: sftpConfig.directory.trim(),
    };
}
// Export-Mapping des SFTP-Zielsystems (Dokumentklasse INV_Standard): das
// Attribut "exportXML" wird per XSLT unverändert als XML-Datei ausgegeben.
const SFTP_DOCUMENT_CLASS = "INV_Standard";
const SFTP_EXPORT_MAPPING = {
    AttributeMappings: [
        { JsonOutputName: "exportXML", AttributeName: "exportXML", DefaultValue: "", ServiceBusDataType: "String", Export: true },
    ],
    IsCustomTemplate: true,
    StyleSheet: sftpExportStylesheet_xsl_raw_1.default,
    DefaultStyleSheetName: "",
    ServiceBusExportType: "XML",
};
async function readSftpEndpoint(apiKey) {
    try {
        return await (0, sftpEndpointService_1.getSftpEndpointService)(BASE_URI, apiKey, await findDocumentReaderSubscriptionId(apiKey));
    }
    catch {
        return undefined;
    }
}
// Metadaten-Endpunkt (Azure Service Bus) für VEO. Connection String, Queue
// und GWS-Nr. kommen von der Konfigurationsseite - NIE in den Code schreiben
// (die Bundles sind öffentlich).
function veoMetadataSettings() {
    return {
        ServiceBusConnectionString: veoConfig.connectionString.trim(),
        QueueName: veoConfig.queueName.trim(),
        ReferencedTargetSystem: "D3EndpointService",
        Properties: [
            { Name: "DvelopTenant", Value: SUBDOMAIN },
            { Name: "GWSNo", Value: veoConfig.gwsNo.trim() },
            { Name: "ExportType", Value: "JSON" },
            { Name: "type", Value: "docreader" },
            { Name: "subtype", Value: "rechnung" },
            { Name: "erptype", Value: "veo" },
            { Name: "CustomerId", Value: "DynamicProp_debitorMapping" },
        ],
    };
}
function samePropertyList(a, b) {
    const key = (list) => list.map((p) => `${p.Name}=${p.Value}`).sort().join("\n");
    return !!a && key(a) === key(b);
}
async function readMetadataEndpoint(apiKey) {
    try {
        return await (0, metadataEndpointService_1.getMetadataEndpointService)(BASE_URI, apiKey, await findDocumentReaderSubscriptionId(apiKey));
    }
    catch {
        return undefined;
    }
}
async function readEndpointService(apiKey) {
    try {
        return await (0, d3EndpointService_1.getD3EndpointService)(BASE_URI, apiKey, await findDocumentReaderSubscriptionId(apiKey));
    }
    catch {
        return undefined;
    }
}
// Subscription-ID des Rechnungslesers: aus der Kachel "classcon-documentreader/
// indexing" im App-Menü (wie im bisherigen Onboarding-Script), ersatzweise aus
// den Features des Rechnungslesers - die URL endet jeweils auf die ID.
let documentReaderSubscriptionId = "";
async function findDocumentReaderSubscriptionId(apiKey) {
    if (documentReaderSubscriptionId) {
        return documentReaderSubscriptionId;
    }
    const fromApps = await (0, getApps_1.getApps)(BASE_URI, apiKey)
        .then((r) => r.body.widgets?.find((w) => w.id === "classcon-documentreader/indexing")?.target_uri?.split("/").pop())
        .catch(() => undefined);
    const fromFeatures = fromApps ? undefined : await (0, getFeatures_1.getDocumentReaderFeatures)(BASE_URI, apiKey)
        .then((r) => r.body.features?.find((f) => f.url?.includes("classcon-documentreader"))?.url?.split("/").pop())
        .catch(() => undefined);
    const subscriptionId = fromApps || fromFeatures;
    if (!subscriptionId) {
        throw new Error("Subscription-ID des Rechnungslesers nicht gefunden - ist der Rechnungsleser im Mandanten gebucht?");
    }
    documentReaderSubscriptionId = subscriptionId;
    return subscriptionId;
}
let availableGroups = [];
let groupMode = "new";
let newGroupName = GROUP_FRUEHES_SCANNEN_NAME;
let selectedGroupId = "";
// Für welchen API-Key die Gruppenliste geladen ist ("" = noch nicht).
let groupsLoadedFor = "";
// Hat der Benutzer die Gruppenauswahl selbst geändert? Dann nicht mehr
// automatisch auf die Standardgruppe umstellen.
let groupChoiceTouched = false;
// Gruppen laden (Konfigurationsseite, sobald ein API-Key da ist) und
// sinnvoll vorbelegen - gibt es die Standardgruppe schon, wird sie als
// vorhandene Gruppe gewählt, solange der Benutzer nichts geändert hat.
async function initGroupSelection(apiKey) {
    availableGroups = (await loadGroups(apiKey)).sort((a, b) => a.name.localeCompare(b.name, "de"));
    groupsLoadedFor = apiKey;
    if (groupChoiceTouched || (selectedGroupId && availableGroups.some((group) => group.id === selectedGroupId))) {
        return;
    }
    const standard = findGroup(availableGroups, GROUP_FRUEHES_SCANNEN_NAME);
    if (standard) {
        groupMode = "existing";
        selectedGroupId = standard.id;
    }
}
// Die in Schritt 1 festgelegte Gruppe (für Stapelprofile/Postfächer).
async function resolveTargetGroup(apiKey) {
    const groups = await loadGroups(apiKey);
    if (groupMode === "existing") {
        const group = groups.find((g) => g.id === selectedGroupId);
        if (!group) {
            throw new Error("Bitte in der Konfiguration eine vorhandene Gruppe auswählen.");
        }
        return group;
    }
    const group = findGroup(groups, newGroupName);
    if (!group) {
        throw new Error(`Gruppe „${newGroupName}“ existiert noch nicht - bitte zuerst den Schritt „Berechtigungsgruppe“ ausführen.`);
    }
    return group;
}
function exists(text) {
    return { state: "exists", text };
}
function mailboxMatches(mailbox, name) {
    return mailbox === name || !!mailbox?.startsWith(`${name}@`);
}
async function findMailbox(apiKey, name) {
    const settings = (await (0, getEmailinboundProfiles_1.getEmailinboundProfiles)(BASE_URI, apiKey)).body.mailStoreSettings ?? [];
    return settings.find((setting) => mailboxMatches(setting.mailbox, name));
}
async function findBatchProfile(apiKey, name) {
    const profiles = (await (0, getBatchProfiles_1.getBatchProfiles)(BASE_URI, apiKey)).body.profiles ?? [];
    return profiles.find((profile) => profile.name === name);
}
function unique(values) {
    return [...new Set(values.filter((value) => !!value))];
}
// Ein Schritt je Stapelprofil: anlegen bzw. mit der Vorlage aktualisieren.
function batchProfileStep(id, template) {
    return {
        id,
        title: `Stapelprofil „${template.name}“`,
        description: "Eingangsverarbeitung, berechtigt wird die Gruppe aus Schritt 1 - ein vorhandenes Profil wird mit den Einstellungen der Vorlage aktualisiert.",
        async check(apiKey) {
            return (await findBatchProfile(apiKey, template.name))
                ? exists("Vorhanden - Einstellungen werden aktualisiert.")
                : missing("Profil fehlt.");
        },
        async run(apiKey) {
            const group = await resolveTargetGroup(apiKey);
            // Statt der Vorlagen-Berechtigung ("Alle") die Gruppe aus Schritt 1.
            const body = {
                ...template,
                authorizedGroups: [{ id: group.id, displayName: group.name, elementType: 1 }],
            };
            const existing = await findBatchProfile(apiKey, template.name);
            if (existing) {
                await (0, updateBatchProfile_1.updateBatchProfile)(BASE_URI, apiKey, existing, body);
                return "Profil aktualisiert.";
            }
            await (0, createBatchProfile_1.createBatchProfile)(BASE_URI, apiKey, body);
            return "Profil angelegt.";
        },
    };
}
// Ein Schritt je Postfach: anlegen bzw. aktualisieren. Berechtigt werden die
// Administratoren und die Gruppe aus Schritt 1; zusätzlich berechtigte
// Benutzer und Fehler-Empfänger eines vorhandenen Postfachs bleiben erhalten.
function mailboxStep(entry) {
    return {
        id: `mailbox-${entry.mailbox}`,
        title: `Postfach „${entry.mailbox}“`,
        description: `${entry.mailbox}@${SUBDOMAIN}.emailinbound… → Stapelprofil „${entry.profileName}“, berechtigt wird die Gruppe aus Schritt 1.`,
        async check(apiKey) {
            return (await findMailbox(apiKey, entry.mailbox))
                ? exists("Vorhanden - Einstellungen werden aktualisiert.")
                : missing("Postfach fehlt.");
        },
        async run(apiKey) {
            const groups = await loadGroups(apiKey);
            const adminGroupId = findGroupId(groups, ADMIN_GROUP_NAME);
            if (!adminGroupId) {
                throw new Error(`Gruppe „${ADMIN_GROUP_NAME}“ nicht gefunden.`);
            }
            const scanGroupId = (await resolveTargetGroup(apiKey)).id;
            const profileId = (await findBatchProfile(apiKey, entry.profileName))?.batchProfileId;
            if (!profileId) {
                throw new Error(`Stapelprofil „${entry.profileName}“ nicht gefunden - bitte zuerst das Stapelprofil anlegen.`);
            }
            const existing = await findMailbox(apiKey, entry.mailbox);
            const payload = {
                _links: {},
                mailbox: entry.mailbox,
                description: entry.description,
                emailWhiteList: ["*@*"],
                profileId,
                finishImportProcess: true,
                updated: !!existing,
                batchnameTemplate: "%Subject%",
                authorizedInboundGroupIds: unique([adminGroupId, scanGroupId]),
                authorizedInboundUserIds: existing?.authorizedInboundUserIds ?? [],
                informOnErrorGroupIds: unique([...(existing?.informOnErrorGroupIds ?? []), adminGroupId]),
                informOnErrorUserIds: existing?.informOnErrorUserIds ?? [],
                batchProperties: [],
                documentProperties: [],
            };
            if (existing) {
                await (0, updateEmailinboundProfile_1.updateEmailinboundProfile)(BASE_URI, apiKey, existing, payload);
                return "Postfach aktualisiert.";
            }
            await (0, createEmailinboundProfile_1.createEmailinboundProfiles)(BASE_URI, apiKey, payload);
            return "Postfach angelegt.";
        },
    };
}
// Quell-Mapping über seine Quelle (sourceId) wiederfinden - der Name im DMS
// ist nicht verlässlich (z.B. "Document Reader (d.velop document reader
// invoice business)" statt "Rechnungsleser").
async function findSourceMapping(apiKey) {
    const repositoryId = await getRepositoryId(apiKey);
    const containers = (await (0, getMappingContainers_1.getMappingContainers)(BASE_URI, apiKey, repositoryId)).body.containers ?? [];
    return { repositoryId, existing: containers.find((c) => c.sourceId === SOURCE_MAPPING.sourceId) };
}
// Schritt: eigenes Skript für einen Extension Point des Rechnungslesers
// anlegen bzw. seinen Code aktualisieren (customerVariables werden nie
// gesendet).
// withApiKey: das Skript ruft selbst APIs auf und bekommt beim NEUANLEGEN den
// API-Key als verschlüsselte customerVariable "apiKey" (ein vorhandener Key
// wird nie überschrieben oder geleert).
// Schritt: Skript als Process-Studio-Aktion mit dem Eingabeparameter
// inputDocId anlegen bzw. aktualisieren. customerVariables (API-Key +
// variables) NUR bei einem in diesem Aufruf neu angelegten Skript - ein
// vorhandener Key und hinterlegte Werte werden nie überschrieben oder geleert.
function actionScriptStep(options) {
    const { id, title, scriptName, content, actionDescription, inputDocId, variables, variablesText } = options;
    return {
        id,
        title,
        description: `„${scriptName}“ als Aktion mit Eingabeparameter „${inputDocId}“ - beim Anlegen werden ${variablesText} hinterlegt, bei einem vorhandenen Skript nur Code und Aktion aktualisiert; hinterlegte Werte bleiben unverändert.`,
        async check(apiKey) {
            return (await findScriptIdByName(apiKey, scriptName)) ? exists("Vorhanden - Code und Aktion werden aktualisiert.") : missing("Skript fehlt.");
        },
        async run(apiKey) {
            let scriptId = await findScriptIdByName(apiKey, scriptName);
            const createdNow = !scriptId;
            if (!scriptId) {
                scriptId = (await (0, createScript_1.createScript)(BASE_URI, apiKey, scriptName)).body.id;
                if (!scriptId) {
                    throw new Error(`„${scriptName}“ konnte nicht angelegt werden (keine Id).`);
                }
            }
            const versionId = (await (0, getScriptVersion_1.getScriptVersion)(BASE_URI, apiKey, scriptId)).body[0]?.id;
            if (!versionId) {
                throw new Error(`Für „${scriptName}“ wurde keine Version gefunden.`);
            }
            const body = {
                content,
                actionEnabled: true,
                action: {
                    display_name: { de: scriptName },
                    description: { de: actionDescription },
                    volatile: true,
                    execution_mode: "Synchron",
                    input_properties: [
                        { id: inputDocId, type: "String", title: { de: "Dokument-ID" }, required: true },
                    ],
                    output_properties: [],
                },
            };
            if (createdNow) {
                body.customerVariables = [
                    { key: "apiKey", value: apiKey, encrypted: true },
                    ...variables,
                ];
            }
            await (0, patchScript_1.patchScript)(BASE_URI, apiKey, scriptId, versionId, body);
            return createdNow ? "Skript als Aktion angelegt." : "Code und Aktion aktualisiert.";
        },
    };
}
function hookScriptStep(options) {
    const { id, scriptName, content, description, withApiKey } = options;
    return {
        id,
        title: `Skript „${scriptName}“`,
        description,
        async check(apiKey) {
            return (await findScriptIdByName(apiKey, scriptName))
                ? exists("Vorhanden - Code wird aktualisiert.")
                : missing("Skript fehlt.");
        },
        async run(apiKey) {
            let scriptId = await findScriptIdByName(apiKey, scriptName);
            const createdNow = !scriptId;
            if (!scriptId) {
                scriptId = (await (0, createScript_1.createScript)(BASE_URI, apiKey, scriptName)).body.id;
                if (!scriptId) {
                    throw new Error(`„${scriptName}“ konnte nicht angelegt werden (keine Id).`);
                }
            }
            const versionId = (await (0, getScriptVersion_1.getScriptVersion)(BASE_URI, apiKey, scriptId)).body[0]?.id;
            if (!versionId) {
                throw new Error(`Für „${scriptName}“ wurde keine Version gefunden.`);
            }
            const body = { content };
            if (createdNow && withApiKey) {
                body.customerVariables = [{ key: "apiKey", value: apiKey, encrypted: true }];
            }
            await (0, patchScript_1.patchScript)(BASE_URI, apiKey, scriptId, versionId, body);
            return createdNow ? "Skript angelegt." : "Code aktualisiert.";
        },
    };
}
// Schritt: Extension Point des Rechnungslesers aktivieren und auf das Skript
// umstellen (ScriptingApp). Liest vorher ALLE Extension Points und ändert nur
// den eigenen - der POST ersetzt die komplette Liste.
// Liest ALLE Extension Points, ändert nur den mit nodeId (fehlt er, wird er
// ergänzt) und speichert die komplette Liste - der POST ersetzt die Liste.
async function updateExtensionPoint(apiKey, nodeId, profile, change) {
    const subscriptionId = await findDocumentReaderSubscriptionId(apiKey);
    const points = await (0, extensionPoints_1.getExtensionPoints)(BASE_URI, apiKey, subscriptionId);
    const index = points.findIndex((p) => p.NodeId === nodeId);
    const base = index >= 0
        ? points[index]
        : { NodeId: nodeId, IsActivated: false, ExtensionPointType: "", ConnectionString: "", QueueName: "", ScriptingAppEndpoint: "", ScriptingEngineProfile: profile };
    const next = [...points];
    const updated = change({ ...base, ScriptingEngineProfile: base.ScriptingEngineProfile || profile });
    if (index >= 0) {
        next[index] = updated;
    }
    else {
        next.push(updated);
    }
    await (0, extensionPoints_1.saveExtensionPoints)(BASE_URI, apiKey, subscriptionId, next);
}
async function findExtensionPoint(apiKey, nodeId) {
    const points = await (0, extensionPoints_1.getExtensionPoints)(BASE_URI, apiKey, await findDocumentReaderSubscriptionId(apiKey));
    return points.find((p) => p.NodeId === nodeId);
}
// Schritt: Extension Point nur aktivieren (IsActivated) - Typ und Skript
// bleiben unverändert (siehe extensionPointAssignStep).
function extensionPointActivateStep(options) {
    const { id, title, nodeId, profile } = options;
    return {
        id,
        title,
        description: `Aktiviert ${nodeId} im Rechnungsleser. Typ und hinterlegtes Skript bleiben unverändert, alle übrigen Extension Points ebenfalls.`,
        async check(apiKey) {
            const point = await findExtensionPoint(apiKey, nodeId);
            if (!point) {
                return missing(`${nodeId} nicht gefunden - wird ergänzt und aktiviert.`);
            }
            return point.IsActivated ? done("Aktiv.") : missing("Nicht aktiv.");
        },
        async run(apiKey) {
            await updateExtensionPoint(apiKey, nodeId, profile, (point) => ({ ...point, IsActivated: true }));
            return "Aktiviert.";
        },
    };
}
// Schritt: Skript am Extension Point hinterlegen (ScriptingApp + Aufruf-URL)
// - der Aktivierungszustand bleibt unverändert (siehe extensionPointActivateStep).
function extensionPointAssignStep(options) {
    const { id, title, nodeId, profile, scriptName } = options;
    const isAssigned = (point, endpoint) => !!point && point.ExtensionPointType === "ScriptingApp" && point.ScriptingAppEndpoint === endpoint;
    return {
        id,
        title,
        description: `Hinterlegt das Skript „${scriptName}“ an ${nodeId} (Typ ScriptingApp). Alle übrigen Extension Points bleiben unverändert - sie werden vorher gelesen und unverändert mitgesendet.`,
        async check(apiKey) {
            const scriptId = await findScriptIdByName(apiKey, scriptName);
            if (!scriptId) {
                return missing("Skript fehlt noch.");
            }
            const point = await findExtensionPoint(apiKey, nodeId);
            if (isAssigned(point, scriptRunUrl(scriptId))) {
                return done(`Ruft „${scriptName}“ auf.`);
            }
            if (!point) {
                return missing(`${nodeId} nicht gefunden - wird ergänzt.`);
            }
            const current = point.ExtensionPointType === "ScriptingApp" ? point.ScriptingAppEndpoint : point.ExtensionPointType;
            return current
                ? exists(`Aktuell: ${current} - wird auf „${scriptName}“ umgestellt.`)
                : missing("Kein Skript hinterlegt.");
        },
        // Ist bereits etwas anderes hinterlegt und der Extension Point aktiv
        // (z.B. ScriptingEngine), vor dem Umstellen nachfragen.
        async beforeRun(apiKey) {
            const scriptId = await findScriptIdByName(apiKey, scriptName);
            const point = await findExtensionPoint(apiKey, nodeId);
            if (!point?.IsActivated || !point.ExtensionPointType || (scriptId && isAssigned(point, scriptRunUrl(scriptId)))) {
                return true;
            }
            const current = point.ExtensionPointType === "ScriptingApp"
                ? `ScriptingApp <code>${escapeHtml(point.ScriptingAppEndpoint)}</code>`
                : escapeHtml(point.ExtensionPointType);
            return confirmWarning("Extension Point umstellen?", `<strong>Achtung:</strong> ${escapeHtml(nodeId)} ist aktiv und nutzt aktuell ${current}. Er wird auf das Skript „${escapeHtml(scriptName)}“ (ScriptingApp) umgestellt - die bisherige Verarbeitung an dieser Stelle entfällt.`, "Umstellen");
        },
        async run(apiKey) {
            const scriptId = await findScriptIdByName(apiKey, scriptName);
            if (!scriptId) {
                throw new Error(`Skript „${scriptName}“ nicht gefunden - bitte zuerst das Skript anlegen.`);
            }
            const endpoint = scriptRunUrl(scriptId);
            if (isAssigned(await findExtensionPoint(apiKey, nodeId), endpoint)) {
                return "Bereits hinterlegt.";
            }
            await updateExtensionPoint(apiKey, nodeId, profile, (point) => ({
                ...point,
                ExtensionPointType: "ScriptingApp",
                ScriptingAppEndpoint: endpoint,
            }));
            return `„${scriptName}“ hinterlegt.`;
        },
    };
}
function extensionPointStep(options) {
    const { id, title, nodeId, profile, scriptName } = options;
    return {
        id,
        title,
        description: `Aktiviert ${nodeId} im Rechnungsleser und hinterlegt das Skript „${scriptName}“ (ScriptingApp). Alle übrigen Extension Points bleiben unverändert - sie werden vorher gelesen und unverändert mitgesendet.`,
        async check(apiKey) {
            const scriptId = await findScriptIdByName(apiKey, scriptName);
            if (!scriptId) {
                return missing("Skript fehlt noch.");
            }
            const points = await (0, extensionPoints_1.getExtensionPoints)(BASE_URI, apiKey, await findDocumentReaderSubscriptionId(apiKey));
            const point = points.find((p) => p.NodeId === nodeId);
            if (isHookConfigured(point, scriptRunUrl(scriptId))) {
                return done(`Aktiv, ruft „${scriptName}“ auf.`);
            }
            if (!point) {
                return missing(`${nodeId} nicht gefunden - wird ergänzt.`);
            }
            const current = point.ExtensionPointType === "ScriptingApp" ? point.ScriptingAppEndpoint : point.ExtensionPointType;
            return point.IsActivated || point.ScriptingAppEndpoint
                ? exists(`Aktuell: ${point.IsActivated ? "aktiv" : "inaktiv"}${current ? `, ${current}` : ""} - wird auf „${scriptName}“ umgestellt.`)
                : missing("Nicht aktiv.");
        },
        // Ist der Extension Point schon aktiv und ruft etwas anderes auf (z.B.
        // ScriptingEngine), vor dem Umstellen nachfragen.
        async beforeRun(apiKey) {
            const scriptId = await findScriptIdByName(apiKey, scriptName);
            const points = await (0, extensionPoints_1.getExtensionPoints)(BASE_URI, apiKey, await findDocumentReaderSubscriptionId(apiKey));
            const point = points.find((p) => p.NodeId === nodeId);
            if (!point?.IsActivated || (scriptId && isHookConfigured(point, scriptRunUrl(scriptId)))) {
                return true;
            }
            const current = point.ExtensionPointType === "ScriptingApp"
                ? `ScriptingApp <code>${escapeHtml(point.ScriptingAppEndpoint)}</code>`
                : escapeHtml(point.ExtensionPointType || "unbekannt");
            return confirmWarning("Extension Point umstellen?", `<strong>Achtung:</strong> ${escapeHtml(nodeId)} ist bereits aktiv (${current}). Er wird auf das Skript „${escapeHtml(scriptName)}“ (ScriptingApp) umgestellt - die bisherige Verarbeitung an dieser Stelle entfällt.`, "Umstellen");
        },
        async run(apiKey) {
            const scriptId = await findScriptIdByName(apiKey, scriptName);
            if (!scriptId) {
                throw new Error(`Skript „${scriptName}“ nicht gefunden - bitte zuerst das Skript anlegen.`);
            }
            const subscriptionId = await findDocumentReaderSubscriptionId(apiKey);
            const points = await (0, extensionPoints_1.getExtensionPoints)(BASE_URI, apiKey, subscriptionId);
            const endpoint = scriptRunUrl(scriptId);
            const index = points.findIndex((p) => p.NodeId === nodeId);
            if (index >= 0 && isHookConfigured(points[index], endpoint)) {
                return "Bereits hinterlegt.";
            }
            const updated = {
                ...(index >= 0 ? points[index] : { ConnectionString: "", QueueName: "" }),
                NodeId: nodeId,
                IsActivated: true,
                ExtensionPointType: "ScriptingApp",
                ScriptingAppEndpoint: endpoint,
                ScriptingEngineProfile: (index >= 0 && points[index].ScriptingEngineProfile) || profile,
            };
            const next = [...points];
            if (index >= 0) {
                next[index] = updated;
            }
            else {
                next.push(updated);
            }
            await (0, extensionPoints_1.saveExtensionPoints)(BASE_URI, apiKey, subscriptionId, next);
            return `„${scriptName}“ hinterlegt und aktiviert.`;
        },
    };
}
const steps = [
    {
        id: "targetGroup",
        title: "Berechtigungsgruppe",
        description: "Die in der Konfiguration gewählte Gruppe, die in den Stapelprofilen und Postfächern berechtigt wird. Eine neue Gruppe wird hier angelegt, eine vorhandene bleibt unverändert.",
        async check(apiKey) {
            const groups = await loadGroups(apiKey);
            if (groupMode === "existing") {
                const group = groups.find((g) => g.id === selectedGroupId);
                return group ? done(`Verwendet: „${group.name}“.`) : missing("Bitte eine vorhandene Gruppe auswählen.");
            }
            if (!newGroupName.trim()) {
                return missing("Bitte einen Gruppennamen eingeben.");
            }
            const group = findGroup(groups, newGroupName);
            return group
                ? done(`„${group.name}“ existiert bereits und wird verwendet.`)
                : missing(`„${newGroupName.trim()}“ wird angelegt.`);
        },
        async run(apiKey) {
            if (groupMode === "existing") {
                return `Verwendet: „${(await resolveTargetGroup(apiKey)).name}“.`;
            }
            const name = newGroupName.trim();
            if (!name) {
                throw new Error("Bitte einen Gruppennamen eingeben.");
            }
            if (findGroup(await loadGroups(apiKey), name)) {
                return "Bereits vorhanden - wird verwendet.";
            }
            await (0, createGroup_1.createGroup)(BASE_URI, apiKey, newGroupBody(name, crypto.randomUUID(), []));
            availableGroups = (await loadGroups(apiKey)).sort((a, b) => a.name.localeCompare(b.name, "de"));
            return `Gruppe „${name}“ angelegt.`;
        },
    },
    batchProfileStep("profileMail", batchProfileMail_json_1.default),
    batchProfileStep("profileScan", batchProfileScan_json_1.default),
    ...MAILBOXES.map(mailboxStep),
    {
        id: "webindex",
        title: "Webindex-Layout",
        description: "Ersetzt das Webindex-Designer-Layout des Rechnungslesers durch die gevis-ECM-Vorlage.",
        beforeRun: confirmWebindexOverwrite,
        async check() {
            return { state: "manual", text: "Nicht prüfbar - wird beim Ausführen überschrieben." };
        },
        async run(apiKey) {
            await (0, replaceDocumentReaderWebindexForm_1.replaceDocumentReaderWebindexForm)(BASE_URI, apiKey, JSON.stringify(webindexDesignerForm_json_1.default));
            return "Layout ersetzt.";
        },
    },
    {
        id: "sourceMapping",
        title: "Quell-Mapping „Rechnungsleser“",
        description: `Zuordnung der Rechnungsleser-Felder zu den DMS-Eigenschaften (erstes Repository, Quelle ${SOURCE_MAPPING.sourceId}). Bei einem vorhandenen Mapping werden die Vorlagen-Zuordnungen aktualisiert bzw. ergänzt, weitere Zuordnungen bleiben erhalten.`,
        // Bei einem vorhandenen Mapping vorher zeigen, welche bestehenden
        // Zuordnungen auf ein anderes Ziel umgebogen werden (die Vorlage nutzt die
        // Eigenschafts-IDs von gevis ECM, die im Mandanten abweichen können).
        async beforeRun(apiKey) {
            const { existing } = await findSourceMapping(apiKey);
            if (!existing) {
                return true;
            }
            const current = (await (0, getMappingContainers_1.getMappingContainer)(BASE_URI, apiKey, existing)).body;
            const changes = (SOURCE_MAPPING.mappingItems ?? []).flatMap((item) => {
                const before = current.mappingItems?.find((existingItem) => existingItem.source === item.source);
                return before && before.destination !== item.destination
                    ? [`<li><code>${escapeHtml(item.source ?? "")}</code>: ${escapeHtml(before.destination ?? "–")} → ${escapeHtml(item.destination ?? "–")}</li>`]
                    : [];
            });
            if (changes.length === 0) {
                return true;
            }
            return confirmWarning("Achtung: Zuordnungen werden geändert", `Im Quell-Mapping „${escapeHtml(current.name ?? existing.name ?? "")}“ zeigen folgende Felder danach auf ein <strong>anderes Ziel</strong>:
         <ul style="text-align:left;font-size:0.85em;margin-top:8px">${changes.join("")}</ul>
         Neue Felder werden ergänzt, alle übrigen Zuordnungen bleiben unverändert.`, "Zuordnungen ändern");
        },
        async check(apiKey) {
            const { existing } = await findSourceMapping(apiKey);
            return existing
                ? exists(`Vorhanden als „${existing.name ?? SOURCE_MAPPING.name}“ - Zuordnungen werden aktualisiert.`)
                : missing("Mapping fehlt.");
        },
        async run(apiKey) {
            const { repositoryId, existing } = await findSourceMapping(apiKey);
            if (!existing) {
                await (0, createSourceMapping_1.createSourceMapping)(BASE_URI, apiKey, repositoryId, SOURCE_MAPPING);
                return "Quell-Mapping angelegt.";
            }
            // Vollständig laden, Vorlagen-Zuordnungen je Quellfeld ersetzen bzw.
            // anhängen, alle übrigen (mandantenspezifischen) Zuordnungen behalten.
            const current = (await (0, getMappingContainers_1.getMappingContainer)(BASE_URI, apiKey, existing)).body;
            const items = [...(current.mappingItems ?? [])];
            let updated = 0;
            let added = 0;
            for (const item of SOURCE_MAPPING.mappingItems ?? []) {
                const index = items.findIndex((existingItem) => existingItem.source === item.source);
                if (index >= 0) {
                    items[index] = { ...items[index], ...item };
                    updated++;
                }
                else {
                    items.push({ ...item });
                    added++;
                }
            }
            const id = current.id ?? existing._links?.self?.href?.split("/").pop();
            await (0, getMappingContainers_1.updateMappingContainer)(BASE_URI, apiKey, repositoryId, {
                name: current.name ?? existing.name,
                id,
                sourceId: current.sourceId ?? existing.sourceId,
                mappingItems: items,
            });
            return `Quell-Mapping aktualisiert (${updated} geändert, ${added} ergänzt, ${items.length - updated - added} weitere beibehalten).`;
        },
    },
    actionScriptStep({
        id: "creditMemoScript",
        title: "Skript „Gutschriften verschieben“",
        scriptName: CREDIT_MEMO_SCRIPT_NAME,
        content: gutschriftenVerschieben_js_raw_1.default,
        actionDescription: "Verschiebt eine Gutschrift des Rechnungslesers in die Gutschrift-Kategorie bzw. kennzeichnet das Dokument als Rechnung.",
        inputDocId: CREDIT_MEMO_INPUT_DOC_ID,
        variables: CREDIT_MEMO_VARIABLES,
        variablesText: "API-Key und Kategorien",
    }),
    actionScriptStep({
        id: "linkQuoteScript",
        title: `Skript „${LINK_QUOTE_SCRIPT_NAME}“`,
        scriptName: LINK_QUOTE_SCRIPT_NAME,
        content: angebotMitAuftragVerknuepfen_js_raw_1.default,
        actionDescription: "Trägt die Belegnummer eines Auftrags bei den Angeboten aus seinen Angebotsnummern als Auftragsnummer ein.",
        inputDocId: LINK_QUOTE_INPUT_DOC_ID,
        variables: LINK_QUOTE_VARIABLES,
        variablesText: "API-Key, Kategorie und Eigenschaften",
    }),
    hookScriptStep({
        id: "preExportScript",
        scriptName: PRE_EXPORT_SCRIPT_NAME,
        content: preExport_js_raw_1.default,
        description: "Wird vom Rechnungsleser vor dem Export aufgerufen: setzt DocumentType auf den ERP-Code (Gutschrift 3, sonst 2) - alle übrigen Attribute bleiben unverändert. Ein vorhandenes Skript bekommt nur den aktuellen Code.",
    }),
    extensionPointStep({
        id: "beforeExportHook",
        title: "Extension Point „vor dem Export“",
        nodeId: BEFORE_EXPORT_NODE_ID,
        profile: BEFORE_EXPORT_PROFILE,
        scriptName: PRE_EXPORT_SCRIPT_NAME,
    }),
    hookScriptStep({
        id: "duplicateDetectionScript",
        scriptName: DUPLICATE_DETECTION_SCRIPT_NAME,
        content: duplicateDetection_js_raw_1.default,
        withApiKey: true,
        description: "Wird vom Rechnungsleser nach der Extraktion aufgerufen und sucht per SQL im Protokoll des Rechnungslesers nach Rechnungen mit gleicher Lieferantennummer und Rechnungsnummer. Beim Neuanlegen wird der API-Key hinterlegt; ein vorhandenes Skript bekommt nur den aktuellen Code.",
    }),
    extensionPointActivateStep({
        id: "postExtractionActivate",
        title: "Extension Point „nach der Extraktion“ aktivieren",
        nodeId: POST_EXTRACTION_NODE_ID,
        profile: POST_EXTRACTION_PROFILE,
    }),
    extensionPointAssignStep({
        id: "postExtractionAssign",
        title: "Extension Point „nach der Extraktion“: Skript hinterlegen",
        nodeId: POST_EXTRACTION_NODE_ID,
        profile: POST_EXTRACTION_PROFILE,
        scriptName: DUPLICATE_DETECTION_SCRIPT_NAME,
    }),
    {
        id: "eventbridgeHook",
        title: "Eventbridge: DMS-Ereignis aktivieren",
        description: "Aktiviert das DMS-Ereignis „dmspostimport“ in der Eventbridge. Beliebig wiederholbar.",
        async check(apiKey) {
            const event = (await (0, getEventbridgeConfig_1.getEventbridgeConfig)(BASE_URI, apiKey)).events?.find((e) => e.id === "dmspostimport");
            return event?.enabled
                ? done("„dmspostimport“ ist aktiv.")
                : missing(event ? "„dmspostimport“ ist deaktiviert." : "„dmspostimport“ ist nicht eingerichtet.");
        },
        async run(apiKey) {
            await (0, setDmspostimport_1.setDmspostimport)(BASE_URI, apiKey, true);
            return "„dmspostimport“ aktiviert.";
        },
    },
    {
        id: "eventbridgeSync",
        title: "Eventbridge synchronisieren",
        description: "Synchronisiert die Eventbridge mit dem DMS-Repository - dabei wird der Webhook für „dmspostimport“ im DMS angelegt. Wird pauschal ausgeführt, beliebig wiederholbar.",
        async check(apiKey) {
            // Kann nicht "fehlen": die Synchronisierung läuft einfach pauschal bei
            // jedem Aktualisieren mit. Angezeigt wird nur, wann zuletzt synchronisiert wurde.
            const repositoryId = await getRepositoryId(apiKey);
            const sync = (await (0, getEventbridgeConfig_1.getEventbridgeConfig)(BASE_URI, apiKey)).dmsSynchronization?.find((entry) => entry.repoId === repositoryId);
            const when = sync?.lastUpdateTime ? new Date(sync.lastUpdateTime).toLocaleString("de-DE") : "";
            return exists(when ? `Zuletzt synchronisiert am ${when} - wird erneut synchronisiert.` : "Wird synchronisiert.");
        },
        async run(apiKey) {
            await (0, synchronizeEventbride_1.synchronizeEventbride)(BASE_URI, apiKey, await getRepositoryId(apiKey));
            return "Synchronisierung ausgeführt.";
        },
    },
    {
        id: "creditMemoProcess",
        title: `Prozess „${bpmnProcessInfo(Rechnungsleser_Gutschriften_verschieben_v1_bpmn_raw_1.default).name}“`,
        description: "Startet bei der Ablage einer Gutschrift (Eventbridge „dmspostimport“) die Aktion „Gutschriften verschieben“ - benötigt Skript und Eventbridge. Die Aktions-Id im BPMN wird beim Hochladen auf das Skript dieses Mandanten gesetzt; ein vorhandener Prozess bekommt eine neue Version.",
        async check(apiKey) {
            const { id, name } = bpmnProcessInfo(Rechnungsleser_Gutschriften_verschieben_v1_bpmn_raw_1.default);
            return (await (0, processComponents_1.componentExists)(BASE_URI, apiKey, id, name, "process"))
                ? exists("Vorhanden - wird als neue Version deployt.")
                : missing("Prozess fehlt.");
        },
        async run(apiKey) {
            const content = await bpmnForTenant(apiKey);
            const { id, name } = bpmnProcessInfo(content);
            const existedBefore = await (0, processComponents_1.componentExists)(BASE_URI, apiKey, id, name, "process");
            // Wie der Import in Process Studio: erst auflösen lassen (meldet z.B.
            // fehlende Aktionen), dann deployen.
            await (0, processComponents_1.resolveComponent)(BASE_URI, apiKey, "process", content);
            await (0, processComponents_1.deployProcess)(BASE_URI, apiKey, content);
            return existedBefore ? "Neue Version deployt." : "Prozess deployt.";
        },
    },
    {
        id: "duplicateCheck",
        title: "Dublettenprüfung ausschalten",
        description: "Schaltet die Dublettenprüfung („DuplicateCheck“) in der Dokumentverarbeitung des Rechnungslesers aus. Beliebig wiederholbar.",
        async check(apiKey) {
            const subscriptionId = await findDocumentReaderSubscriptionId(apiKey);
            const settings = await (0, setDocumentProcessingConfiguration_1.getDocumentProcessingConfiguration)(BASE_URI, apiKey, subscriptionId);
            if (!("DuplicateCheck" in settings)) {
                return missing("Einstellung „DuplicateCheck“ nicht gefunden - wird ausgeschaltet.");
            }
            return settings.DuplicateCheck
                ? missing("Dublettenprüfung ist eingeschaltet.")
                : done("Dublettenprüfung ist ausgeschaltet.");
        },
        async run(apiKey) {
            const subscriptionId = await findDocumentReaderSubscriptionId(apiKey);
            await (0, setDocumentProcessingConfiguration_1.setDocumentProcessingConfiguration)(BASE_URI, apiKey, subscriptionId, "DuplicateCheck", false);
            return "Dublettenprüfung ausgeschaltet.";
        },
    },
    {
        id: "masterDataCompanies",
        title: "Stammdaten: Mandanten",
        description: `Erzeugt aus den Mandanten der Konfiguration ${COMPANY_FILE_NAME} und lädt sie in die Stammdaten des Rechnungslesers hoch. Die vorhandene Datei wird ersetzt.`,
        // Mandanten kommen von der Konfigurationsseite; vor dem Hochladen fragen,
        // da die vorhandene Datei ersetzt wird.
        beforeRun: () => confirmWarning("Stammdaten ersetzen?", `<strong>Achtung:</strong> ${COMPANY_FILE_NAME} wird mit ${companies.length} Mandant(en) aus der Konfiguration hochgeladen und ersetzt die vorhandenen Mandanten-Stammdaten.`, "Hochladen"),
        async check() {
            return { state: "manual", text: `${companies.length} Mandant(en) aus der Konfiguration - nicht prüfbar, wird beim Ausführen hochgeladen.` };
        },
        async run(apiKey) {
            if (!companies.length) {
                throw new Error("Keine Mandanten erfasst - bitte in der Konfiguration eintragen.");
            }
            const subscriptionId = await findDocumentReaderSubscriptionId(apiKey);
            await (0, masterFile_1.uploadMasterFile)(BASE_URI, subscriptionId, COMPANY_FILE_NAME, companiesCsv(companies));
            return `${COMPANY_FILE_NAME} mit ${companies.length} Mandant(en) hochgeladen.`;
        },
    },
    {
        id: "targetSystem",
        title: "Zielsystem des Rechnungslesers",
        description: "Richtet das Zielsystem (d.3-Endpunkt) ein: dieses DMS-Repository, der API-Key aus der Konfiguration, Besitzer „Editor“, Ausgabe „Hauptdokument mit Anhängen“.",
        async check(apiKey) {
            if (!(await isEndpointConfigured(apiKey, "D3EndpointService"))) {
                return missing("Nicht eingerichtet.");
            }
            const current = await readEndpointService(apiKey);
            if (!current) {
                return exists("Eingerichtet - Einstellungen nicht lesbar, werden beim Ausführen überschrieben.");
            }
            const target = await targetEndpointSettings(apiKey);
            const sameSettings = current.RepositoryId === target.RepositoryId
                && current.D3Owner === target.D3Owner
                && current.EndpointServiceOutputStructure === target.EndpointServiceOutputStructure;
            if (sameSettings && current.ApiKey === target.ApiKey) {
                return done("Eingerichtet.");
            }
            if (sameSettings && current.ApiKey) {
                return exists("Eingerichtet, aber mit einem anderen API-Key - wird auf den aktuellen umgestellt.");
            }
            return current.RepositoryId
                ? exists("Abweichend eingerichtet - wird aktualisiert.")
                : missing("Nicht eingerichtet.");
        },
        async beforeRun(apiKey) {
            if (!(await isEndpointConfigured(apiKey, "D3EndpointService"))) {
                return true;
            }
            const current = await readEndpointService(apiKey);
            const target = await targetEndpointSettings(apiKey);
            if (current && current.RepositoryId === target.RepositoryId && current.ApiKey === target.ApiKey) {
                return true;
            }
            return confirmWarning("Zielsystem überschreiben?", `Der Rechnungsleser hat bereits ein Zielsystem „d.velop documents“${current?.RepositoryId ? ` (Repository <code>${current.RepositoryId}</code>)` : ""}. Es wird durch dieses Repository und den API-Key aus der Konfiguration ersetzt.`, "Überschreiben");
        },
        async run(apiKey) {
            const subscriptionId = await findDocumentReaderSubscriptionId(apiKey);
            await (0, d3EndpointService_1.saveD3EndpointService)(BASE_URI, apiKey, subscriptionId, await targetEndpointSettings(apiKey));
            return "Zielsystem eingerichtet.";
        },
    },
    {
        id: "metadataEndpoint",
        title: "Metadaten-Endpunkt VEO (Service Bus)",
        erp: ["veo"],
        description: "Richtet den Metadaten-Endpunkt des Rechnungslesers für VEO ein: Service Bus Connection String und Queue aus der Konfiguration, Bezug auf das Zielsystem und die Eigenschaften DvelopTenant, GWSNo, ExportType, type, subtype, erptype und CustomerId.",
        async check(apiKey) {
            if (!(await isEndpointConfigured(apiKey, "MetadataEndpointService"))) {
                return missing("Nicht eingerichtet.");
            }
            const current = await readMetadataEndpoint(apiKey);
            if (!current) {
                return exists("Eingerichtet - Einstellungen nicht lesbar, werden beim Ausführen überschrieben.");
            }
            const target = veoMetadataSettings();
            const same = current.QueueName === target.QueueName
                && current.ReferencedTargetSystem === target.ReferencedTargetSystem
                && samePropertyList(current.Properties, target.Properties);
            if (same && current.ServiceBusConnectionString === target.ServiceBusConnectionString) {
                return done(`Eingerichtet (Queue ${target.QueueName}).`);
            }
            if (same) {
                return exists("Eingerichtet, aber mit anderem Connection String - wird aktualisiert.");
            }
            return current.QueueName
                ? exists(`Abweichend eingerichtet (Queue ${current.QueueName}) - wird aktualisiert.`)
                : missing("Nicht eingerichtet.");
        },
        async beforeRun(apiKey) {
            if (!(await isEndpointConfigured(apiKey, "MetadataEndpointService"))) {
                return true;
            }
            const current = await readMetadataEndpoint(apiKey);
            const target = veoMetadataSettings();
            if (current?.QueueName === target.QueueName) {
                return true;
            }
            return confirmWarning("Metadaten-Endpunkt überschreiben?", current?.QueueName
                ? `Der Rechnungsleser sendet aktuell an die Queue <code>${escapeHtml(current.QueueName)}</code>. Sie wird durch <code>${escapeHtml(target.QueueName)}</code> ersetzt.`
                : `Ein Metadaten-Endpunkt ist bereits eingerichtet. Er wird mit der Queue <code>${escapeHtml(target.QueueName)}</code> und den Angaben aus der Konfiguration überschrieben.`, "Überschreiben");
        },
        async run(apiKey) {
            const subscriptionId = await findDocumentReaderSubscriptionId(apiKey);
            await (0, metadataEndpointService_1.saveMetadataEndpointService)(BASE_URI, apiKey, subscriptionId, veoMetadataSettings());
            return "Metadaten-Endpunkt eingerichtet.";
        },
    },
    {
        id: "sftpEndpoint",
        title: "SFTP-Zielsystem gevis R-Linie",
        erp: ["gevisR"],
        description: "Richtet den SFTP-Server aus der Konfiguration als Zielsystem des Rechnungslesers ein (Host, Port, Benutzer, Kennwort, Verzeichnis).",
        async check(apiKey) {
            if (!(await isEndpointConfigured(apiKey, "SftpEndpointService"))) {
                return missing("Nicht eingerichtet.");
            }
            const current = await readSftpEndpoint(apiKey);
            if (!current) {
                return exists("Eingerichtet - Einstellungen nicht lesbar, werden beim Ausführen überschrieben.");
            }
            const target = sftpEndpointSettings();
            const same = current.Host === target.Host
                && current.Port === target.Port
                && current.User === target.User
                && current.Directory === target.Directory;
            // Das Kennwort liefert die Seite nicht zuverlässig mit - nur vergleichen, wenn vorhanden.
            if (same && (!current.Password || current.Password === target.Password)) {
                return done(`Eingerichtet (${target.User}@${target.Host}:${target.Port}${target.Directory}).`);
            }
            return exists(same
                ? "Eingerichtet, aber mit anderem Kennwort - wird aktualisiert."
                : `Abweichend eingerichtet (${current.User ?? "?"}@${current.Host ?? "?"}:${current.Port ?? "?"}${current.Directory ?? ""}) - wird aktualisiert.`);
        },
        async beforeRun(apiKey) {
            if (!(await isEndpointConfigured(apiKey, "SftpEndpointService"))) {
                return true;
            }
            const current = await readSftpEndpoint(apiKey);
            const target = sftpEndpointSettings();
            if (current && current.Host === target.Host && current.User === target.User && current.Directory === target.Directory) {
                return true;
            }
            return confirmWarning("SFTP-Zielsystem überschreiben?", current?.Host
                ? `Der Rechnungsleser übergibt aktuell an <code>${escapeHtml(`${current.User ?? ""}@${current.Host}:${current.Port ?? ""}${current.Directory ?? ""}`)}</code>. Das wird durch <code>${escapeHtml(`${target.User}@${target.Host}:${target.Port}${target.Directory}`)}</code> ersetzt.`
                : "Ein SFTP-Zielsystem ist bereits eingerichtet. Es wird mit den Angaben aus der Konfiguration überschrieben.", "Überschreiben");
        },
        async run(apiKey) {
            const subscriptionId = await findDocumentReaderSubscriptionId(apiKey);
            await (0, sftpEndpointService_1.saveSftpEndpointService)(BASE_URI, apiKey, subscriptionId, sftpEndpointSettings());
            return "SFTP-Zielsystem eingerichtet.";
        },
    },
    {
        id: "sftpExportMapping",
        title: "SFTP-Zielsystem: Export konfigurieren",
        erp: ["gevisR"],
        description: `Konfiguriert den Export des SFTP-Zielsystems für die Dokumentklasse ${SFTP_DOCUMENT_CLASS}: Attribut „exportXML“ wird exportiert und per XSLT-Vorlage als XML-Datei auf den SFTP-Server geschrieben.`,
        // Wie beim Webindex-Layout: nicht prüfbar, wird beim Ausführen (nach
        // Rückfrage, ohne Sicherung) mit der Vorlage überschrieben.
        beforeRun: () => confirmWarning("Export-Konfiguration überschreiben?", `<strong>Achtung:</strong> Die Export-Konfiguration des SFTP-Zielsystems (Dokumentklasse ${SFTP_DOCUMENT_CLASS}) wird vollständig durch die Vorlage ersetzt - Attribut-Zuordnungen und XSLT-Vorlage. Die aktuelle Konfiguration wird nicht gesichert.`, "Überschreiben"),
        async check(apiKey) {
            if (!(await isEndpointConfigured(apiKey, "SftpEndpointService"))) {
                return missing("SFTP-Zielsystem fehlt noch.");
            }
            return { state: "manual", text: "Nicht prüfbar - wird beim Ausführen überschrieben." };
        },
        async run(apiKey) {
            if (!(await isEndpointConfigured(apiKey, "SftpEndpointService"))) {
                throw new Error("Das SFTP-Zielsystem fehlt noch - bitte zuerst den Schritt „SFTP-Zielsystem gevis R-Linie“ ausführen.");
            }
            const subscriptionId = await findDocumentReaderSubscriptionId(apiKey);
            await (0, serviceBusEndpointMapping_1.saveServiceBusEndpointMapping)(BASE_URI, apiKey, subscriptionId, "SftpEndpointService", SFTP_DOCUMENT_CLASS, SFTP_EXPORT_MAPPING);
            return "Export konfiguriert.";
        },
    },
    {
        id: "trustedApp",
        title: "Rechnungsleser als vertrauenswürdige App",
        description: `Trägt „${DOCUMENT_READER_APP}“ im Identityprovider als vertrauenswürdige App ein (darf im Namen von Benutzern handeln). Läuft mit der Anmeldung des aktuellen Benutzers - dafür sind Administrationsrechte nötig.`,
        async check() {
            if (impersonationAdded) {
                return done("In dieser Sitzung eingetragen.");
            }
            const whitelisted = await (0, impersonateWhitelist_1.isAppImpersonationWhitelisted)(BASE_URI, DOCUMENT_READER_APP);
            if (whitelisted) {
                return done("Eingetragen.");
            }
            return missing(whitelisted === false ? "Nicht eingetragen." : "Wird eingetragen.");
        },
        async run() {
            await (0, impersonateWhitelist_1.addAppToImpersonationWhitelist)(BASE_URI, DOCUMENT_READER_APP);
            impersonationAdded = true;
            return "Als vertrauenswürdige App eingetragen.";
        },
    },
];
const ERP_OPTIONS = [
    { value: "veo", label: "VEO", description: "gevis ECM mit ERP-System VEO" },
    { value: "gevisR", label: "gevis R-Linie", description: "gevis ECM mit ERP-System gevis R-Linie" },
];
let page = "config";
let apiKey = "";
let erpSystem = "";
// Zusatzangaben für VEO (Metadaten-Endpunkt). Die Queue folgt üblicherweise
// dem Muster "sbq-scan-in-<mandant>" und ist damit vorbelegt.
const veoConfig = { gwsNo: "", connectionString: "", queueName: `sbq-scan-in-${SUBDOMAIN}` };
// Zusatzangaben für gevis R-Linie (SFTP-Server statt Service Bus). Zugangsdaten
// nur zur Laufzeit - NIE in den Code schreiben (die Bundles sind öffentlich).
const sftpConfig = { host: "mt-sftp.gws.ms", port: "22", user: "", password: "", directory: "/out/dms/scandta" };
// Prüft die SFTP-Angaben; liefert eine Fehlermeldung oder undefined.
function validateSftpConfig() {
    if (!sftpConfig.host.trim()) {
        return "Bitte den SFTP-Host eingeben.";
    }
    const port = Number(sftpConfig.port.trim());
    if (!Number.isInteger(port) || port < 1 || port > 65535) {
        return "Bitte eine gültige Portnummer (1-65535) eingeben.";
    }
    if (!sftpConfig.user.trim() || !sftpConfig.password) {
        return "Bitte Benutzer und Kennwort für den SFTP-Server eingeben.";
    }
    if (!sftpConfig.directory.trim().startsWith("/")) {
        return "Bitte das Verzeichnis auf dem SFTP-Server eingeben (beginnt mit \"/\").";
    }
    return undefined;
}
// Prüft die VEO-Angaben; liefert eine Fehlermeldung oder undefined.
function validateVeoConfig() {
    if (!/^\d+$/.test(veoConfig.gwsNo.trim())) {
        return "Bitte die GWS-Nr. (nur Ziffern) eingeben.";
    }
    const connection = veoConfig.connectionString.trim();
    if (!/^Endpoint=sb:\/\//i.test(connection) || !/SharedAccessKey=/i.test(connection)) {
        return "Bitte einen gültigen Service Bus Connection String eingeben (beginnt mit \"Endpoint=sb://\", enthält \"SharedAccessKey=\").";
    }
    if (!veoConfig.queueName.trim()) {
        return "Bitte den Queue-Namen eingeben.";
    }
    return undefined;
}
let currentUserId;
const statuses = new Map(steps.map((step) => [step.id, { state: "unknown", text: "" }]));
let busy = false;
let message;
function erpLabel(value) {
    return ERP_OPTIONS.find((option) => option.value === value)?.label ?? "";
}
// Schritte, die für das gewählte ERP-System gelten.
function activeSteps() {
    return steps.filter((step) => !step.erp || (erpSystem !== "" && step.erp.includes(erpSystem)));
}
function getCookie(name) {
    return document.cookie
        .split("; ")
        .find((row) => row.startsWith(`${name}=`))
        ?.split("=")[1];
}
async function getCurrentUserId() {
    if (!currentUserId) {
        currentUserId = (await (0, getCurrentUserInformation_1.getCurrentUserInformation)(BASE_URI, getCookie("AuthSessionId") || null)).body.id;
    }
    return currentUserId;
}
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
function userLabel(user) {
    const name = `${user.name?.givenName ?? ""} ${user.name?.familyName ?? ""}`.trim() || user.displayName || "";
    const login = user.emails?.[0]?.value || user.userName || "";
    return name && login && name !== login ? `${name} (${login})` : name || login || user.id || "";
}
// Swal-Dialog: Benutzer (Dropdown mit Suchfeld, angemeldeter Benutzer
// vorausgewählt) und Bezeichnung des Keys. undefined = abgebrochen.
async function askApiKeyRequest() {
    const [users, ownId] = await Promise.all([
        (0, getAllUsers_1.getAllUsers)(BASE_URI, ""),
        getCurrentUserId().catch(() => undefined),
    ]);
    const options = users
        .filter((user) => !!user.id)
        .map((user) => ({ id: user.id, label: userLabel(user) }))
        .sort((a, b) => a.label.localeCompare(b.label, "de"));
    if (options.length === 0) {
        throw new Error("Es wurden keine Benutzer gefunden.");
    }
    const renderOptions = (term) => options
        .filter((option) => !term || option.label.toLowerCase().includes(term))
        .map((option) => `<option value="${escapeHtml(option.id)}" ${option.id === ownId ? "selected" : ""}>${escapeHtml(option.label)}</option>`)
        .join("");
    const result = await Swal.fire({
        title: "Neuen API-Key erstellen",
        html: `
      <div style="text-align:left">
        <label for="onb-swal-search" style="font-size:0.85em;font-weight:600">Benutzer</label>
        <input id="onb-swal-search" class="swal2-input" style="margin:4px 0 6px;width:100%" placeholder="Benutzer suchen…" autocomplete="off">
        <select id="onb-swal-user" class="swal2-select" size="8" style="margin:0 0 12px;width:100%;display:block">${renderOptions("")}</select>
        <label for="onb-swal-label" style="font-size:0.85em;font-weight:600">Bezeichnung</label>
        <input id="onb-swal-label" class="swal2-input" style="margin:4px 0 0;width:100%" value="${escapeHtml(API_KEY_LABEL)}">
      </div>`,
        width: 600,
        showCancelButton: true,
        confirmButtonText: "API-Key erstellen",
        cancelButtonText: "Abbrechen",
        focusConfirm: false,
        didOpen: (popup) => {
            const search = popup.querySelector("#onb-swal-search");
            const select = popup.querySelector("#onb-swal-user");
            search?.addEventListener("input", () => {
                if (!select)
                    return;
                const previous = select.value;
                select.innerHTML = renderOptions(search.value.trim().toLowerCase());
                if ([...select.options].some((option) => option.value === previous)) {
                    select.value = previous;
                }
                else if (select.options.length > 0) {
                    select.selectedIndex = 0;
                }
            });
            select?.querySelector("option[selected]")?.scrollIntoView({ block: "nearest" });
        },
        preConfirm: () => {
            const popup = Swal.getPopup();
            const userId = popup.querySelector("#onb-swal-user")?.value ?? "";
            const label = popup.querySelector("#onb-swal-label")?.value.trim() ?? "";
            if (!userId) {
                Swal.showValidationMessage("Bitte einen Benutzer auswählen.");
                return false;
            }
            if (!label) {
                Swal.showValidationMessage("Bitte eine Bezeichnung eingeben.");
                return false;
            }
            return { userId, label };
        },
    });
    return result.isConfirmed ? result.value : undefined;
}
// Wie die Identityprovider-Oberfläche: POST /identityprovider/config/apikey
// über die Browser-Session.
async function createNewApiKey(request) {
    const input = {
        id: "create",
        status: "Unconfirmed",
        userId: request.userId,
        label: request.label,
    };
    // Antwort: { apiKeyDto: { key, ... }, saveOk, problemMessages, ... }
    const body = (await (0, createAPIKey_1.createAPIKey)(BASE_URI, null, input)).body;
    const problems = (body.problemMessages ?? []).map((problem) => typeof problem === "string" ? problem : JSON.stringify(problem));
    if (body.saveOk === false || problems.length > 0) {
        throw new Error(`Der Identityprovider hat den API-Key nicht gespeichert${problems.length ? `: ${problems.join("; ")}` : "."}`);
    }
    const key = body.apiKeyDto?.key;
    if (!key) {
        throw new Error("Der API-Key wurde angelegt, aber nicht zurückgeliefert - bitte in der Benutzerverwaltung prüfen.");
    }
    return key;
}
// ---------------------------------------------------------------------------
// Darstellung
// ---------------------------------------------------------------------------
const styles = `
<style>
  .onb-section { border: 1px solid #dee2e6; border-radius: 6px; background: #fff; }
  .onb-header { padding: 10px 12px; border-bottom: 1px solid #dee2e6; background: #f8f9fa; border-radius: 6px 6px 0 0; }
  .onb-title { font-weight: 600; font-size: 1.05em; }
  .onb-hint { color: #6c757d; font-size: 0.85em; margin-top: 4px; }
  .onb-body { padding: 12px; }
  .onb-key { display: flex; gap: 6px; flex-wrap: wrap; align-items: flex-end; margin-bottom: 12px; }
  .onb-field { display: flex; flex-direction: column; gap: 2px; }
  .onb-field label { font-size: 0.75em; font-weight: 600; color: #495057; margin: 0; }
  .onb-key-input { flex: 1 1 340px; min-width: 0; }
  .onb-key .btn, .onb-actions .btn { white-space: nowrap; }
  .onb-message { border-radius: 6px; padding: 8px 12px; margin-bottom: 12px; font-size: 0.9em; }
  .onb-message-info { background: #e7f1ff; color: #084298; border: 1px solid #b6d4fe; }
  .onb-message-ok { background: #d1e7dd; color: #0f5132; border: 1px solid #badbcc; }
  .onb-message-error { background: #f8d7da; color: #842029; border: 1px solid #f5c2c7; }
  .onb-table-wrap { border: 1px solid #dee2e6; border-radius: 6px; overflow: auto; }
  .onb-table { margin: 0; font-size: 0.9em; }
  .onb-table thead th { background: #f8f9fa; border-bottom: 1px solid #dee2e6; white-space: nowrap; }
  .onb-table td { vertical-align: middle; }
  .onb-nr { color: #6c757d; width: 2.5em; text-align: right; }
  .onb-step-title { font-weight: 600; }
  .onb-step-desc { color: #6c757d; font-size: 0.85em; }
  .onb-status { min-width: 180px; }
  .onb-status-text { display: block; font-size: 0.8em; color: #6c757d; margin-top: 2px; }
  .onb-badge { display: inline-block; font-size: 0.75em; font-weight: 600; padding: 2px 8px; border-radius: 10px; white-space: nowrap; }
  .onb-badge-unknown { background: #e9ecef; color: #495057; }
  .onb-badge-checking, .onb-badge-running { background: #e7f1ff; color: #084298; }
  .onb-badge-done { background: #d1e7dd; color: #0f5132; }
  .onb-badge-exists { background: #cfe2ff; color: #084298; }
  .onb-badge-missing { background: #fff3cd; color: #997404; }
  .onb-badge-manual { background: #e2e3e5; color: #41464b; }
  .onb-badge-error { background: #f8d7da; color: #842029; }
  .onb-action { text-align: right; white-space: nowrap; }
  .onb-actions { display: flex; justify-content: flex-end; gap: 6px; flex-wrap: wrap; margin-top: 12px; }
  .onb-config { width: 100%; }
  .onb-config-block { margin-bottom: 18px; }
  .onb-config-block[hidden] { display: none; }
  .onb-company-wrap { overflow-x: auto; }
  .onb-company-table { border-collapse: collapse; font-size: 0.85em; width: 100%; }
  .onb-company-table th { text-align: left; padding: 2px 4px; white-space: nowrap; font-weight: 600; }
  .onb-company-table td { padding: 2px; }
  .onb-company-table input { min-width: 110px; width: 100%; }
  .onb-veo-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 8px 12px; }
  .onb-veo-grid label { display: flex; flex-direction: column; gap: 4px; font-size: 0.85em; margin: 0; }
  .onb-veo-wide { grid-column: 1 / -1; }
  .onb-config-title { font-weight: 600; margin-bottom: 2px; }
  .onb-config-desc { color: #6c757d; font-size: 0.85em; margin-bottom: 6px; }
  .onb-erp-options { display: flex; gap: 10px; flex-wrap: wrap; }
  .onb-erp { display: flex; gap: 8px; align-items: flex-start; border: 1px solid #dee2e6; border-radius: 6px; padding: 10px 12px; cursor: pointer; min-width: 220px; margin: 0; }
  .onb-erp:hover { border-color: #86b7fe; }
  .onb-erp-selected { border-color: #0d6efd; background: #f1f6ff; }
  .onb-erp input { margin-top: 3px; }
  .onb-erp-label { font-weight: 600; }
  .onb-erp-desc { display: block; color: #6c757d; font-size: 0.8em; font-weight: normal; }
  .onb-summary { display: flex; gap: 14px; flex-wrap: wrap; align-items: center; font-size: 0.85em; margin-top: 6px; }
  .onb-summary strong { font-weight: 600; }
  .onb-group-options { display: flex; flex-direction: column; gap: 6px; margin-top: 8px; }
  .onb-group-option { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; font-size: 0.85em; margin: 0; }
  .onb-group-label { width: 15em; flex: 0 0 auto; }
  .onb-group-input { width: 280px; max-width: 100%; }
</style>`;
const STATE_LABELS = {
    unknown: "Nicht geprüft",
    checking: "Wird geprüft…",
    running: "Wird ausgeführt…",
    done: "Erledigt",
    exists: "Vorhanden",
    missing: "Fehlt",
    manual: "Manuell",
    error: "Fehler",
};
// Beschriftung des Zeilen-Buttons je nach geprüftem Status.
const RUN_LABELS = {
    unknown: "Ausführen",
    checking: "Ausführen",
    running: "Läuft…",
    done: "Erneut ausführen",
    exists: "Aktualisieren",
    missing: "Anlegen",
    manual: "Ausführen",
    error: "Erneut versuchen",
};
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
let currentForm;
let mountedRoot;
// Wie in der Toolbox (projects/Toolbox/src/forms/form.ts, getContentHost):
// direkt in das Kind-Element ref="html" der HTML-Element-Komponente rendern.
function getContentHost(form) {
    const component = form.getComponent?.(resultKey);
    if (!component)
        return undefined;
    return component.refs?.html ?? component.element?.querySelector?.('[ref="html"]') ?? component.element ?? undefined;
}
function renderShell() {
    return page === "config" ? renderConfigPage() : renderStepsPage();
}
function renderConfigPage() {
    const options = ERP_OPTIONS
        .map((option) => `
          <label class="onb-erp ${erpSystem === option.value ? "onb-erp-selected" : ""}">
            <input type="radio" name="onb-erp" value="${option.value}" data-onb-erp ${erpSystem === option.value ? "checked" : ""}>
            <span class="onb-erp-label">${escapeHtml(option.label)}<span class="onb-erp-desc">${escapeHtml(option.description)}</span></span>
          </label>`)
        .join("");
    return `
  <div class="onb-section">
    <div class="onb-header">
      <div class="onb-title">Onboarding gevis ECM Rechnungsleser – Konfiguration</div>
      <div class="onb-hint">Mandant <strong>${escapeHtml(SUBDOMAIN)}</strong> · Schritt 1 von 2: Grundeinstellungen für das Onboarding.</div>
    </div>
    <div class="onb-body onb-config">
      <div class="onb-config-block">
        <div class="onb-config-title">API-Key</div>
        <div class="onb-config-desc">Mit diesem Key wird eingerichtet; er wird außerdem im Gutschriften-Skript hinterlegt.</div>
        <div class="onb-key">
          <input id="onb-api-key" type="password" autocomplete="off" class="form-control form-control-sm onb-key-input" data-onb-key placeholder="API-Key eingeben…" aria-label="API-Key" value="${escapeHtml(apiKey)}">
          <button type="button" class="btn btn-sm btn-outline-secondary" data-onb-action="create-key" title="Legt für einen Benutzer einen neuen API-Key an">Neuen API-Key erstellen</button>
        </div>
      </div>
      <div class="onb-config-block">
        <div class="onb-config-title">Berechtigungsgruppe</div>
        <div class="onb-config-desc">Diese Gruppe wird in den Stapelprofilen und Postfächern berechtigt.</div>
        ${renderGroupChoice()}
      </div>
      <div class="onb-config-block">
        <div class="onb-config-title">ERP-Zielsystem</div>
        <div class="onb-config-desc">An welches ERP-System übergibt der Rechnungsleser?</div>
        <div class="onb-erp-options">${options}</div>
      </div>
      <div class="onb-config-block" data-onb-veo-block ${erpSystem === "veo" ? "" : "hidden"}>
        <div class="onb-config-title">VEO-Anbindung</div>
        <div class="onb-config-desc">Für den Metadaten-Endpunkt des Rechnungslesers (Azure Service Bus). Mandant: <strong>${escapeHtml(SUBDOMAIN)}</strong></div>
        <div class="onb-veo-grid">
          <label>GWS-Nr.<input type="text" inputmode="numeric" autocomplete="off" class="form-control form-control-sm" data-onb-veo="gwsNo" placeholder="z.B. 12345" value="${escapeHtml(veoConfig.gwsNo)}"></label>
          <label>Queue-Name<input type="text" autocomplete="off" class="form-control form-control-sm" data-onb-veo="queueName" value="${escapeHtml(veoConfig.queueName)}"></label>
          <label class="onb-veo-wide">Service Bus Connection String<input type="password" autocomplete="off" class="form-control form-control-sm" data-onb-veo="connectionString" placeholder="Endpoint=sb://…;SharedAccessKeyName=…;SharedAccessKey=…" value="${escapeHtml(veoConfig.connectionString)}"></label>
        </div>
      </div>
      <div class="onb-config-block" data-onb-sftp-block ${erpSystem === "gevisR" ? "" : "hidden"}>
        <div class="onb-config-title">gevis R-Linie – SFTP-Server</div>
        <div class="onb-config-desc">Hierhin übergibt der Rechnungsleser die Daten für gevis R-Linie.</div>
        <div class="onb-veo-grid">
          <label>Host<input type="text" autocomplete="off" class="form-control form-control-sm" data-onb-sftp="host" value="${escapeHtml(sftpConfig.host)}"></label>
          <label>Port<input type="text" inputmode="numeric" autocomplete="off" class="form-control form-control-sm" data-onb-sftp="port" value="${escapeHtml(sftpConfig.port)}"></label>
          <label>Benutzer<input type="text" autocomplete="off" class="form-control form-control-sm" data-onb-sftp="user" value="${escapeHtml(sftpConfig.user)}"></label>
          <label>Kennwort<input type="password" autocomplete="new-password" class="form-control form-control-sm" data-onb-sftp="password" value="${escapeHtml(sftpConfig.password)}"></label>
          <label class="onb-veo-wide">Verzeichnis<input type="text" autocomplete="off" class="form-control form-control-sm" data-onb-sftp="directory" value="${escapeHtml(sftpConfig.directory)}"></label>
        </div>
      </div>
      <div class="onb-config-block">
        <div class="onb-config-title">Stammdaten: Mandanten</div>
        <div class="onb-config-desc">Alle Mandanten des Kunden - daraus wird <code>${COMPANY_FILE_NAME}</code> für die Stammdaten des Rechnungslesers erzeugt. * = Pflichtfeld</div>
        ${renderCompanyTable()}
      </div>
      <div data-onb-message></div>
      <div class="onb-actions">
        <button type="button" class="btn btn-sm btn-primary" data-onb-action="next">Weiter</button>
      </div>
    </div>
  </div>`;
}
// Auswahl der Berechtigungsgruppe (Konfigurationsseite). Die Liste der
// vorhandenen Gruppen braucht den API-Key und wird nachgeladen.
let groupsLoading = false;
let groupsError = "";
function renderGroupChoice() {
    const options = availableGroups
        .map((group) => `<option value="${escapeHtml(group.id)}" ${group.id === selectedGroupId ? "selected" : ""}>${escapeHtml(group.name)}</option>`)
        .join("");
    const hint = groupsLoading
        ? "Vorhandene Gruppen werden geladen…"
        : groupsError
            ? `Gruppen konnten nicht geladen werden: ${groupsError}`
            : groupsLoadedFor
                ? ""
                : "Vorhandene Gruppen werden geladen, sobald ein API-Key eingegeben ist.";
    return `
        <div data-onb-group-choice>
          <div class="onb-group-options">
            <label class="onb-group-option">
              <input type="radio" name="onb-group-mode" value="new" data-onb-group-mode ${groupMode === "new" ? "checked" : ""}>
              <span class="onb-group-label">Neue Gruppe anlegen:</span>
              <input type="text" class="form-control form-control-sm onb-group-input" data-onb-group-name value="${escapeHtml(newGroupName)}" placeholder="Gruppenname">
            </label>
            <label class="onb-group-option">
              <input type="radio" name="onb-group-mode" value="existing" data-onb-group-mode ${groupMode === "existing" ? "checked" : ""} ${availableGroups.length ? "" : "disabled"}>
              <span class="onb-group-label">Vorhandene Gruppe verwenden:</span>
              <select class="form-control form-control-sm onb-group-input" data-onb-group-select ${availableGroups.length ? "" : "disabled"}>
                <option value="">– Gruppe auswählen –</option>${options}
              </select>
            </label>
          </div>
          ${hint ? `<div class="onb-config-desc">${escapeHtml(hint)}</div>` : ""}
        </div>`;
}
function bindGroupChoice(root) {
    const container = root.querySelector("[data-onb-group-choice]");
    if (!container)
        return;
    const nameInput = container.querySelector("[data-onb-group-name]");
    const select = container.querySelector("[data-onb-group-select]");
    const setMode = (mode) => {
        groupMode = mode;
        groupChoiceTouched = true;
        container.querySelectorAll("[data-onb-group-mode]").forEach((radio) => (radio.checked = radio.value === mode));
    };
    container.querySelectorAll("[data-onb-group-mode]").forEach((radio) => {
        radio.addEventListener("change", () => {
            if (radio.checked)
                setMode(radio.value);
        });
    });
    nameInput?.addEventListener("input", () => {
        newGroupName = nameInput.value;
        setMode("new");
    });
    nameInput?.addEventListener("keydown", (event) => {
        if (event.key === "Enter")
            event.preventDefault();
    });
    select?.addEventListener("change", () => {
        selectedGroupId = select.value;
        setMode("existing");
    });
}
// Gruppenauswahl auf der Konfigurationsseite neu zeichnen.
function redrawGroupChoice() {
    const container = mountedRoot?.querySelector("[data-onb-group-choice]");
    if (!container || !mountedRoot)
        return;
    container.outerHTML = renderGroupChoice();
    bindGroupChoice(mountedRoot);
}
// Lädt die Gruppen für den eingegebenen API-Key (einmal pro Key).
async function loadGroupChoices() {
    const key = apiKey.trim();
    if (!key || groupsLoading || groupsLoadedFor === key)
        return;
    groupsLoading = true;
    groupsError = "";
    redrawGroupChoice();
    try {
        await initGroupSelection(key);
    }
    catch (error) {
        availableGroups = [];
        groupsLoadedFor = "";
        groupsError = getErrorMessage(error);
    }
    finally {
        groupsLoading = false;
        redrawGroupChoice();
    }
}
function groupLabel() {
    if (groupMode === "existing") {
        return availableGroups.find((group) => group.id === selectedGroupId)?.name ?? "–";
    }
    return `${newGroupName.trim()} (neu)`;
}
function renderStepsPage() {
    const rows = activeSteps()
        .map((step, index) => `
        <tr data-onb-step="${step.id}">
          <td class="onb-nr">${index + 1}</td>
          <td><div class="onb-step-title">${escapeHtml(step.title)}</div><div class="onb-step-desc">${escapeHtml(step.description)}</div>${step.renderOptions?.() ?? ""}</td>
          <td class="onb-status" data-onb-status></td>
          <td class="onb-action"><button type="button" class="btn btn-sm btn-outline-primary" data-onb-run="${step.id}">Ausführen</button></td>
        </tr>`)
        .join("");
    return `
  <div class="onb-section">
    <div class="onb-header">
      <div class="onb-title">Onboarding gevis ECM Rechnungsleser</div>
      <div class="onb-hint">Mandant <strong>${escapeHtml(SUBDOMAIN)}</strong> · Schritt 2 von 2: Fehlendes wird angelegt, Vorhandenes auf die Vorlage aktualisiert - einzeln oder gesammelt.</div>
      <div class="onb-summary">
        <span>ERP-Zielsystem: <strong>${escapeHtml(erpLabel(erpSystem))}</strong></span>
        <span>Gruppe: <strong>${escapeHtml(groupLabel())}</strong></span>
        <span>API-Key: <strong>••••${escapeHtml(apiKey.trim().slice(-4))}</strong></span>
        <button type="button" class="btn btn-sm btn-link p-0" data-onb-action="config">Konfiguration ändern</button>
      </div>
    </div>
    <div class="onb-body">
      <div class="onb-key">
        <button type="button" class="btn btn-sm btn-outline-secondary" data-onb-action="check">Status prüfen</button>
      </div>
      <div data-onb-message></div>
      <div class="onb-table-wrap">
        <table class="table table-sm onb-table">
          <thead><tr><th class="onb-nr">Nr.</th><th>Schritt</th><th>Status</th><th></th></tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
      <div class="onb-actions">
        <button type="button" class="btn btn-sm btn-outline-primary" data-onb-action="run-missing">Alle fehlenden anlegen</button>
        <button type="button" class="btn btn-sm btn-primary" data-onb-action="run-all">Alles anlegen / aktualisieren</button>
      </div>
    </div>
  </div>`;
}
// Aktualisiert Status, Meldung und Buttons, ohne das API-Key-Feld neu zu
// zeichnen.
function refreshView() {
    const root = mountedRoot;
    if (!root?.isConnected)
        return;
    for (const step of activeSteps()) {
        const row = root.querySelector(`tr[data-onb-step="${step.id}"]`);
        const status = statuses.get(step.id);
        const cell = row?.querySelector("[data-onb-status]");
        if (cell) {
            cell.innerHTML = `<span class="onb-badge onb-badge-${status.state}">${STATE_LABELS[status.state]}</span>`
                + (status.text ? `<span class="onb-status-text">${escapeHtml(status.text)}</span>` : "");
        }
    }
    const messageHost = root.querySelector("[data-onb-message]");
    if (messageHost) {
        messageHost.innerHTML = message
            ? `<div class="onb-message onb-message-${message.kind}">${escapeHtml(message.text)}</div>`
            : "";
    }
    const hasKey = apiKey.trim() !== "";
    root.querySelectorAll("button[data-onb-run]").forEach((button) => {
        button.disabled = busy || !hasKey;
        const state = statuses.get(button.dataset.onbRun ?? "")?.state;
        button.textContent = RUN_LABELS[state ?? "unknown"];
    });
    root.querySelectorAll("button[data-onb-action]").forEach((button) => {
        const action = button.dataset.onbAction;
        button.disabled = busy
            || (action !== "create-key" && action !== "config" && !hasKey)
            || (action === "next" && erpSystem === "");
    });
}
function mountContent(form) {
    const host = getContentHost(form);
    if (!host) {
        logger.warn(`Komponente "${resultKey}" nicht im Formular gefunden (oder noch nicht gerendert).`);
        return;
    }
    host.innerHTML = `${styles}<div data-onb-root>${renderShell()}</div>`;
    mountedRoot = host.querySelector("[data-onb-root]") ?? undefined;
    if (mountedRoot) {
        bindEvents(mountedRoot);
        refreshView();
    }
}
function setStatus(stepId, status) {
    statuses.set(stepId, status);
    refreshView();
}
// ---------------------------------------------------------------------------
// Abläufe
// ---------------------------------------------------------------------------
async function withBusy(action) {
    if (busy)
        return;
    busy = true;
    refreshView();
    try {
        await action();
    }
    finally {
        busy = false;
        refreshView();
    }
}
async function checkStep(step) {
    setStatus(step.id, { state: "checking", text: "" });
    try {
        setStatus(step.id, await step.check(apiKey.trim()));
    }
    catch (error) {
        logger.error(`Prüfung "${step.title}" fehlgeschlagen: ${getErrorMessage(error)}`);
        setStatus(step.id, { state: "error", text: getErrorMessage(error) });
    }
}
async function checkAll() {
    message = { kind: "info", text: "Status wird geprüft…" };
    for (const step of activeSteps()) {
        await checkStep(step);
    }
    const counts = activeSteps().map((step) => statuses.get(step.id).state);
    const open = counts.filter((state) => state === "missing").length;
    const existing = counts.filter((state) => state === "exists").length;
    const errors = counts.filter((state) => state === "error").length;
    message = errors > 0
        ? { kind: "error", text: `${errors} Schritt(e) konnten nicht geprüft werden - ist der API-Key gültig?` }
        : { kind: open > 0 ? "info" : "ok", text: `${open} fehlend, ${existing} vorhanden (können aktualisiert werden).` };
    refreshView();
}
// Führt einen Schritt aus und prüft ihn danach erneut. false = Fehler.
async function runStep(step) {
    setStatus(step.id, { state: "running", text: "" });
    try {
        const result = await step.run(apiKey.trim());
        logger.info(`${step.title}: ${result}`);
        const status = await step.check(apiKey.trim());
        // Nach erfolgreichem Anlegen/Aktualisieren gilt der Schritt als erledigt,
        // solange die Prüfung nicht weiterhin "fehlt" meldet.
        setStatus(step.id, status.state === "missing" || status.state === "error"
            ? { ...status, text: `${result} ${status.text}`.trim() }
            : { state: "done", text: result });
        return true;
    }
    catch (error) {
        logger.error(`Schritt "${step.title}" fehlgeschlagen: ${getErrorMessage(error)}`);
        setStatus(step.id, { state: "error", text: getErrorMessage(error) });
        return false;
    }
}
async function runSingle(step) {
    await withBusy(async () => {
        if (step.beforeRun) {
            try {
                if (!(await step.beforeRun(apiKey.trim()))) {
                    return;
                }
            }
            catch (error) {
                message = { kind: "error", text: getErrorMessage(error) };
                return;
            }
        }
        const ok = await runStep(step);
        message = ok
            ? { kind: "ok", text: `„${step.title}“ ausgeführt.` }
            : { kind: "error", text: `„${step.title}“ ist fehlgeschlagen - Details in der Statusspalte.` };
    });
}
const ACTION_VERBS = {
    missing: "anlegen",
    exists: "aktualisieren",
    manual: "ausführen",
};
// Führt die übergebenen Status-Arten gesammelt aus (vorher neu prüfen), in
// Reihenfolge - bricht beim ersten Fehler bzw. bei einer abgebrochenen
// Rückfrage (z.B. Webindex-Layout) ab, weil spätere Schritte auf frühere
// aufbauen.
async function runBatch(states, title) {
    await withBusy(async () => {
        await checkAll();
        const todo = activeSteps().filter((step) => states.includes(statuses.get(step.id).state));
        if (todo.length === 0) {
            message = { kind: "ok", text: "Nichts zu tun." };
            return;
        }
        try {
            await ensureSwal();
        }
        catch (error) {
            message = { kind: "error", text: getErrorMessage(error) };
            return;
        }
        const list = todo
            .map((step) => `<li><strong>${escapeHtml(step.title)}</strong> – ${ACTION_VERBS[statuses.get(step.id).state] ?? "ausführen"}</li>`)
            .join("");
        const confirmed = await Swal.fire({
            icon: "question",
            title,
            html: `<ul style="text-align:left;margin:0 auto;display:inline-block">${list}</ul>`,
            showCancelButton: true,
            confirmButtonText: "Ausführen",
            cancelButtonText: "Abbrechen",
        });
        if (!confirmed.isConfirmed) {
            message = undefined;
            return;
        }
        for (const step of todo) {
            if (step.beforeRun && !(await step.beforeRun(apiKey.trim()))) {
                message = { kind: "info", text: `Abgebrochen bei „${step.title}“ - die Schritte davor wurden ausgeführt.` };
                return;
            }
            if (!(await runStep(step))) {
                message = { kind: "error", text: `Abgebrochen bei „${step.title}“ - Details in der Statusspalte.` };
                return;
            }
        }
        message = { kind: "ok", text: `${todo.length} Schritt(e) ausgeführt.` };
    });
}
async function createKey() {
    let created = false;
    await withBusy(async () => {
        try {
            await loadSweetAlert();
            if (typeof Swal === "undefined") {
                throw new Error("Dialog-Bibliothek (SweetAlert2) konnte nicht geladen werden.");
            }
            message = { kind: "info", text: "Benutzer werden geladen…" };
            refreshView();
            const request = await askApiKeyRequest();
            if (!request) {
                message = undefined;
                return;
            }
            apiKey = await createNewApiKey(request);
            created = true;
            const input = mountedRoot?.querySelector("[data-onb-key]");
            if (input)
                input.value = apiKey;
            steps.forEach((step) => statuses.set(step.id, { state: "unknown", text: "" }));
            message = { kind: "ok", text: `API-Key „${request.label}“ erstellt und eingetragen.` };
        }
        catch (error) {
            logger.error(`API-Key konnte nicht erstellt werden: ${getErrorMessage(error)}`);
            message = { kind: "error", text: `API-Key konnte nicht erstellt werden: ${getErrorMessage(error)}` };
        }
    });
    if (created && page === "steps") {
        await withBusy(checkAll);
    }
}
// Konfigurationsseite -> Schritte: API-Key vorher kurz prüfen (ein
// ungültiger Key würde sonst erst in jedem einzelnen Schritt auffallen).
async function goToSteps() {
    if (!apiKey.trim() || erpSystem === "") {
        message = { kind: "error", text: "Bitte API-Key eingeben und das ERP-Zielsystem auswählen." };
        refreshView();
        return;
    }
    const veoError = (erpSystem === "veo" ? validateVeoConfig() : erpSystem === "gevisR" ? validateSftpConfig() : undefined)
        ?? validateCompanies();
    if (veoError) {
        message = { kind: "error", text: veoError };
        refreshView();
        return;
    }
    let valid = false;
    await withBusy(async () => {
        message = { kind: "info", text: "API-Key wird geprüft…" };
        refreshView();
        try {
            await getRepositoryId(apiKey.trim());
            const firstLoad = groupsLoadedFor !== apiKey.trim();
            await initGroupSelection(apiKey.trim());
            if (firstLoad) {
                // Gruppen erst jetzt geladen (ggf. Standardgruppe vorbelegt) - den
                // Benutzer die Auswahl erst sehen lassen.
                groupsError = "";
                redrawGroupChoice();
                message = { kind: "info", text: "Vorhandene Gruppen wurden geladen - bitte die Berechtigungsgruppe prüfen und erneut auf „Weiter“ klicken." };
                return;
            }
            valid = true;
        }
        catch (error) {
            message = { kind: "error", text: `Der API-Key funktioniert nicht: ${getErrorMessage(error)}` };
        }
    });
    if (!valid) {
        refreshView();
        return;
    }
    const groupError = groupMode === "existing"
        ? (availableGroups.some((group) => group.id === selectedGroupId) ? undefined : "Bitte eine vorhandene Berechtigungsgruppe auswählen.")
        : (newGroupName.trim() ? undefined : "Bitte einen Namen für die neue Berechtigungsgruppe eingeben.");
    if (groupError) {
        message = { kind: "error", text: groupError };
        refreshView();
        return;
    }
    page = "steps";
    message = undefined;
    steps.forEach((step) => statuses.set(step.id, { state: "unknown", text: "" }));
    mountContent(currentForm);
    await withBusy(checkAll);
}
function goToConfig() {
    page = "config";
    message = undefined;
    mountContent(currentForm);
}
// Listener direkt an den Elementen. Bewusst ohne "instanceof HTMLElement":
// dforms führt das Bundle ggf. in einem anderen Fenster-Kontext aus.
function bindEvents(root) {
    const keyInput = root.querySelector("[data-onb-key]");
    if (keyInput) {
        const onKeyChange = () => {
            if (apiKey === keyInput.value)
                return;
            apiKey = keyInput.value;
            // Neuer Key = alte Prüfergebnisse gelten nicht mehr.
            steps.forEach((step) => statuses.set(step.id, { state: "unknown", text: "" }));
            refreshView();
        };
        keyInput.addEventListener("input", onKeyChange);
        keyInput.addEventListener("change", () => {
            onKeyChange();
            void loadGroupChoices();
        });
        keyInput.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                event.preventDefault();
                onKeyChange();
                void goToSteps();
            }
        });
    }
    root.querySelectorAll("input[data-onb-erp]").forEach((radio) => {
        radio.addEventListener("change", () => {
            if (!radio.checked)
                return;
            erpSystem = radio.value;
            root.querySelectorAll(".onb-erp").forEach((label) => {
                label.classList.toggle("onb-erp-selected", label.contains(radio));
            });
            const veoBlock = root.querySelector("[data-onb-veo-block]");
            if (veoBlock)
                veoBlock.hidden = erpSystem !== "veo";
            const sftpBlock = root.querySelector("[data-onb-sftp-block]");
            if (sftpBlock)
                sftpBlock.hidden = erpSystem !== "gevisR";
            refreshView();
        });
    });
    bindGroupChoice(root);
    bindCompanyTable(root);
    if (page === "config") {
        void loadGroupChoices();
    }
    root.querySelectorAll("input[data-onb-sftp]").forEach((input) => {
        const field = input.dataset.onbSftp;
        const onChange = () => {
            sftpConfig[field] = input.value;
        };
        input.addEventListener("input", onChange);
        input.addEventListener("change", onChange);
        input.addEventListener("keydown", (event) => {
            if (event.key === "Enter")
                event.preventDefault();
        });
    });
    root.querySelectorAll("input[data-onb-veo]").forEach((input) => {
        const field = input.dataset.onbVeo;
        const onChange = () => {
            veoConfig[field] = input.value;
        };
        input.addEventListener("input", onChange);
        input.addEventListener("change", onChange);
        input.addEventListener("keydown", (event) => {
            if (event.key === "Enter")
                event.preventDefault();
        });
    });
    root.querySelectorAll("button[data-onb-run]").forEach((button) => {
        const step = steps.find((s) => s.id === button.dataset.onbRun);
        if (step) {
            button.addEventListener("click", () => void runSingle(step));
        }
    });
    for (const step of activeSteps()) {
        const row = root.querySelector(`tr[data-onb-step="${step.id}"]`);
        if (row && step.bindOptions) {
            step.bindOptions(row);
        }
    }
    root.querySelectorAll("button[data-onb-action]").forEach((button) => {
        button.addEventListener("click", () => {
            switch (button.dataset.onbAction) {
                case "create-key":
                    void createKey();
                    return;
                case "next":
                    void goToSteps();
                    return;
                case "config":
                    goToConfig();
                    return;
                case "check":
                    void withBusy(checkAll);
                    return;
                case "run-missing":
                    void runBatch(["missing"], "Fehlende Schritte anlegen?");
                    return;
                case "run-all":
                    void runBatch(["missing", "exists", "manual"], "Alles anlegen bzw. aktualisieren?");
                    return;
            }
        });
    });
}
window.formInit = function (form, data) {
    logger.debug("Onboarding-Formular initialisiert.");
    currentForm = form;
    mountContent(form);
    // Zeichnet Formio die Komponente neu (oder war sie beim Init noch nicht
    // gerendert), ist unser Inhalt weg - dann einfach erneut einhängen.
    form.on?.("render", () => {
        if (!mountedRoot?.isConnected) {
            mountContent(currentForm);
        }
    });
};


/***/ },

/***/ "./dist/scripts/angebotMitAuftragVerknuepfen.js?raw"
/*!**********************************************************!*\
  !*** ./dist/scripts/angebotMitAuftragVerknuepfen.js?raw ***!
  \**********************************************************/
(module) {

module.exports = "/******/ (() => { // webpackBootstrap\n/******/ \t\"use strict\";\n/******/ \tvar __webpack_modules__ = ({\n\n/***/ \"../../helper/dms/getDocumentsWithSourcemapping.ts\"\n/*!*********************************************************!*\\\n  !*** ../../helper/dms/getDocumentsWithSourcemapping.ts ***!\n  \\*********************************************************/\n(__unused_webpack_module, exports, __webpack_require__) {\n\n\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.getDocumentsWithSourcemapping = getDocumentsWithSourcemapping;\nconst performHttpRequest_1 = __webpack_require__(/*! ../performHttpRequest/performHttpRequest */ \"../../helper/performHttpRequest/performHttpRequest.ts\");\n/**\n * Retrieves documents with sourcemapping from a specified repository.\n *\n * @template T - The type of the response data.\n * @param baseUri - The base URI of the DMS API.\n * @param token - The authorization token for API access.\n * @param repositoryId - The ID of the repository to query.\n * @param sourcemapping - The source mapping identifier to filter documents.\n * @param searchParameterProperties - Optional. An array of property IDs to include in the search filter.\n * @param searchParameterCategories - Optional. An array of category IDs to include in the search filter.\n * @param pageSize - Optional. The number of results per page. Defaults to 25. Maximum is 1000.\n * @param nextLink - Optional. The next link for pagination.\n * @returns A promise that resolves to an `ApiResponse` containing the requested documents.\n */\nasync function getDocumentsWithSourcemapping(baseUri, token, repositoryId, sourcemapping, searchParameterProperties, searchParameterCategories, pageSize = 25, nextLink = null) {\n    let finalUrl;\n    if (nextLink) {\n        finalUrl = `${baseUri}${nextLink}`;\n    }\n    else {\n        // Build new request with sourcemapping\n        const url = new URL(`${baseUri}/dms/r/${repositoryId}/srm/`);\n        const params = new URLSearchParams();\n        if (sourcemapping) {\n            params.set(\"sourceId\", sourcemapping);\n        }\n        if (searchParameterProperties) {\n            params.set(\"sourceproperties\", JSON.stringify(searchParameterProperties));\n        }\n        if (searchParameterCategories) {\n            params.set(\"sourcecategories\", JSON.stringify(searchParameterCategories));\n        }\n        if (pageSize) {\n            params.set(\"pageSize\", pageSize.toString());\n        }\n        url.search = params.toString();\n        finalUrl = url.toString();\n    }\n    const headers = {\n        \"Authorization\": `Bearer ${token}`,\n        \"Accept\": \"application/json\",\n        \"Content-Type\": \"application/json\",\n    };\n    const options = {\n        method: \"GET\",\n        headers\n    };\n    return await (0, performHttpRequest_1.performHttpRequest)(finalUrl.toString(), options);\n}\n\n\n/***/ },\n\n/***/ \"../../helper/dms/getRepositories.ts\"\n/*!*******************************************!*\\\n  !*** ../../helper/dms/getRepositories.ts ***!\n  \\*******************************************/\n(__unused_webpack_module, exports, __webpack_require__) {\n\n\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.getRepositories = getRepositories;\nconst performHttpRequest_1 = __webpack_require__(/*! ../performHttpRequest/performHttpRequest */ \"../../helper/performHttpRequest/performHttpRequest.ts\");\nasync function getRepositories(baseUri, token) {\n    const url = `${baseUri}/dms/r`;\n    const headers = {\n        \"Authorization\": `Bearer ${token}`,\n        \"Accept\": \"application/json\",\n        \"Content-Type\": \"application/json\",\n    };\n    const options = {\n        method: \"GET\",\n        headers,\n    };\n    return await (0, performHttpRequest_1.performHttpRequest)(url, options);\n}\n\n\n/***/ },\n\n/***/ \"../../helper/dms/getSpecificDocument.ts\"\n/*!***********************************************!*\\\n  !*** ../../helper/dms/getSpecificDocument.ts ***!\n  \\***********************************************/\n(__unused_webpack_module, exports, __webpack_require__) {\n\n\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.getSpecificDocument = getSpecificDocument;\nconst performHttpRequest_1 = __webpack_require__(/*! ../performHttpRequest/performHttpRequest */ \"../../helper/performHttpRequest/performHttpRequest.ts\");\n/**\n * Retrieves a specific document from the DMS (Document Management System) using the provided parameters.\n *\n * @param baseUri - The base URI of the DMS API.\n * @param token - The authorization token to access the DMS API.\n * @param repositoryId - The ID of the repository where the document is stored.\n * @param documentId - The ID of the specific document to retrieve.\n * @returns A promise that resolves to an `ApiResponse` containing the `GetSpecificDocument` data.\n *\n * @throws Will throw an error if the HTTP request fails or the response is invalid.\n */\nasync function getSpecificDocument(baseUri, token, repositoryId, documentId) {\n    const url = `${baseUri}/dms/r/${repositoryId}/o2/${documentId}`;\n    const headers = {\n        \"Authorization\": `Bearer ${token}`,\n        \"Accept\": \"application/json\",\n        \"Content-Type\": \"application/json\",\n    };\n    const options = {\n        method: \"GET\",\n        headers\n    };\n    return await (0, performHttpRequest_1.performHttpRequest)(url, options);\n}\n\n\n/***/ },\n\n/***/ \"../../helper/dms/updateDocument.ts\"\n/*!******************************************!*\\\n  !*** ../../helper/dms/updateDocument.ts ***!\n  \\******************************************/\n(__unused_webpack_module, exports, __webpack_require__) {\n\n\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.updateDocument = updateDocument;\nconst performHttpRequest_1 = __webpack_require__(/*! ../performHttpRequest/performHttpRequest */ \"../../helper/performHttpRequest/performHttpRequest.ts\");\nasync function updateDocument(baseUri, token, repositoryId, documentId, sourceCategory, sourceProperties) {\n    const url = `${baseUri}/dms/r/${repositoryId}/o2m/${documentId}`;\n    const headers = {\n        Authorization: `Bearer ${token}`,\n        Accept: \"application/json\",\n        \"Content-Type\": \"application/json\",\n    };\n    const body = {\n        sourceCategory: sourceCategory,\n        sourceId: `/dms/r/${repositoryId}/source`,\n        sourceProperties: sourceProperties,\n    };\n    const options = {\n        method: \"PUT\",\n        headers,\n        body: JSON.stringify(body),\n    };\n    return await (0, performHttpRequest_1.performHttpRequest)(url, options);\n}\n\n\n/***/ },\n\n/***/ \"../../helper/performHttpRequest/performHttpRequest.ts\"\n/*!*************************************************************!*\\\n  !*** ../../helper/performHttpRequest/performHttpRequest.ts ***!\n  \\*************************************************************/\n(__unused_webpack_module, exports, __webpack_require__) {\n\n\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.performHttpRequest = performHttpRequest;\nconst logger_1 = __webpack_require__(/*! ../utils/logger */ \"../../helper/utils/logger.ts\");\n/**\n * Performs an HTTP request and returns a structured response.\n*\n* @template T - The expected type of the response body.\n* @param {string} url - The URL to which the request is sent.\n* @param {RequestInit} options - The options for the HTTP request, such as method, headers, and body.\n* @returns {Promise<ApiResponse<T>>} A promise that resolves to an `ApiResponse` object containing the response details.\n* @throws {Error} Throws an error if the HTTP response status is not OK (status code outside the range 200-299).\n*\n* The function attempts to parse the response body based on the `Content-Type` header:\n* - If the `Content-Type` includes \"application/json\", it parses the body as JSON.\n* - Otherwise, it parses the body as plain text.\n*\n* If the response is not OK, the function throws an error with the status code and error message.\n*/\nconst logger = (0, logger_1.getLogger)();\nasync function performHttpRequest(url, options) {\n    let body = {};\n    let errorMessage = \"\";\n    let response;\n    logger.debug(`[Request] ${options.method} ${url} | Headers: ${JSON.stringify(options.headers)} | Body: ${!(options.body instanceof Uint8Array) && options.body !== undefined\n        ? options.body\n        : \"[Binary body omitted]\"}`);\n    try {\n        response = await fetch(url, options);\n    }\n    catch (err) {\n        throw new Error(`Network error during fetch: ${err.message}`);\n    }\n    const contentType = response.headers.get(\"content-type\") || \"\";\n    const parseBody = async () => {\n        try {\n            if (contentType.includes(\"application/json\") || contentType.includes('application/hal+json')) {\n                return await response.json();\n            }\n            else if (contentType.includes(\"application/octet-stream\") ||\n                contentType.includes(\"application/pdf\")) {\n                const arrayBuffer = await response.arrayBuffer();\n                return new Uint8Array(arrayBuffer);\n            }\n            else {\n                return await response.text();\n            }\n        }\n        catch (e) {\n            return undefined;\n        }\n    };\n    if (response.ok) {\n        const result = await parseBody();\n        if (result !== undefined) {\n            body = result;\n        }\n    }\n    else {\n        const errorBody = await parseBody();\n        errorMessage =\n            typeof errorBody === \"string\" ? errorBody : JSON.stringify(errorBody);\n        throw new Error(`HTTP error! status: ${response.status}, message: ${errorMessage}`);\n    }\n    return {\n        status: response.status,\n        statusText: response.statusText,\n        body: body,\n        bodyUsed: response.bodyUsed,\n        headers: response.headers,\n        ok: response.ok,\n        redirected: response.redirected,\n        type: response.type,\n        url: response.url,\n    };\n}\n\n\n/***/ },\n\n/***/ \"../../helper/utils/logger.ts\"\n/*!************************************!*\\\n  !*** ../../helper/utils/logger.ts ***!\n  \\************************************/\n(__unused_webpack_module, exports) {\n\n\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Logger = exports.LogLevel = void 0;\nexports.initLogger = initLogger;\nexports.getLogger = getLogger;\nvar LogLevel;\n(function (LogLevel) {\n    LogLevel[LogLevel[\"DEBUG\"] = 0] = \"DEBUG\";\n    LogLevel[LogLevel[\"INFO\"] = 1] = \"INFO\";\n    LogLevel[LogLevel[\"WARN\"] = 2] = \"WARN\";\n    LogLevel[LogLevel[\"ERROR\"] = 3] = \"ERROR\";\n})(LogLevel || (exports.LogLevel = LogLevel = {}));\nclass Logger {\n    constructor(options = {}) {\n        this.level = options.level ?? LogLevel.INFO;\n        this.showTimestamp = options.showTimestamp ?? true;\n    }\n    formatMessage(level, message) {\n        const paddedLevel = level.toUpperCase().padEnd(5, ' ');\n        const timestamp = this.showTimestamp\n            ? `[${new Date().toISOString()}] `\n            : \"\";\n        return `${timestamp}${paddedLevel}: ${message}`;\n    }\n    debug(message, ...args) {\n        if (this.level <= LogLevel.DEBUG) {\n            console.debug(this.formatMessage(\"debug\", message), ...args);\n        }\n    }\n    info(message, ...args) {\n        if (this.level <= LogLevel.INFO) {\n            console.info(this.formatMessage(\"info\", message), ...args);\n        }\n    }\n    warn(message, ...args) {\n        if (this.level <= LogLevel.WARN) {\n            console.warn(this.formatMessage(\"warn\", message), ...args);\n        }\n    }\n    error(message, ...args) {\n        if (this.level <= LogLevel.ERROR) {\n            console.error(this.formatMessage(\"error\", message), ...args);\n        }\n    }\n    setLevel(newLevel) {\n        this.level = newLevel;\n    }\n}\nexports.Logger = Logger;\nlet loggerInstance;\nfunction initLogger(level = LogLevel.INFO, showTimestamp = true) {\n    if (!loggerInstance) {\n        loggerInstance = new Logger({ level, showTimestamp });\n    }\n    return loggerInstance;\n}\nfunction getLogger() {\n    // Fallback: falls noch niemand initLogger() aufgerufen hat\n    if (!loggerInstance) {\n        loggerInstance = new Logger({ level: LogLevel.DEBUG, showTimestamp: true });\n    }\n    return loggerInstance;\n}\n\n\n/***/ },\n\n/***/ \"./src/scripts/angebotMitAuftragVerknuepfen.ts\"\n/*!*****************************************************!*\\\n  !*** ./src/scripts/angebotMitAuftragVerknuepfen.ts ***!\n  \\*****************************************************/\n(module, exports, __webpack_require__) {\n\n\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst getRepositories_1 = __webpack_require__(/*! ../../../../helper/dms/getRepositories */ \"../../helper/dms/getRepositories.ts\");\nconst getSpecificDocument_1 = __webpack_require__(/*! ../../../../helper/dms/getSpecificDocument */ \"../../helper/dms/getSpecificDocument.ts\");\nconst getDocumentsWithSourcemapping_1 = __webpack_require__(/*! ../../../../helper/dms/getDocumentsWithSourcemapping */ \"../../helper/dms/getDocumentsWithSourcemapping.ts\");\nconst updateDocument_1 = __webpack_require__(/*! ../../../../helper/dms/updateDocument */ \"../../helper/dms/updateDocument.ts\");\nconst logger_1 = __webpack_require__(/*! ../../../../helper/utils/logger */ \"../../helper/utils/logger.ts\");\n/**\n * \"Angebot mit Auftrag verknüpfen\" (ehemals projects/LinkQuoteWithOrder, dort\n * per DMS-Webhook \"postimport\"/\"postupdateproperties\" aufgerufen): liest beim\n * Auftrag (Auftragsbestätigung) mit der übergebenen DocId die Belegnummer und\n * die Angebotsnummern, sucht zu jeder Angebotsnummer das Angebot (Belegnummer\n * = Angebotsnummer in der Kategorie dmsCategoryDebAngeboteGUID) und trägt dort\n * die Auftragsnummer in das Mehrfachfeld dmsFieldAuftragsNrnGUID ein\n * (vorhandene Auftragsnummern bleiben, doppelte werden nicht ergänzt).\n *\n * Wird vom Onboarding-Formular (src/forms/form.ts) als Process-Studio-Aktion\n * mit dem Eingabeparameter \"docId\" angelegt; der Code wird beim Build als Text\n * ins Formular-Bundle übernommen (siehe build/webpack.form.config.js). Aus\n * Kompatibilität wird auch der Body eines DMS-Webhooks ({ doc: { id,\n * properties } }) verstanden.\n *\n * customerVariables (werden vom Formular nur beim Neuanlegen gesetzt):\n * apiKey, dmsCategoryDebAngeboteGUID, dmsFieldBelegNrGUID,\n * dmsFieldAngebotsNrnGUID, dmsFieldAuftragsNrnGUID.\n */\nconst logger = (0, logger_1.initLogger)(logger_1.LogLevel.INFO);\n/** Name des Eingabeparameters der Aktion. */\nconst DOC_ID_INPUT = \"docId\";\nmodule.exports = async (req, res) => {\n    try {\n        const body = parseBody(req);\n        const documentId = body?.[DOC_ID_INPUT] ?? body?.DocId ?? body?.doc?.id;\n        if (!documentId) {\n            respond(res, 400, { success: false, message: `Eingabeparameter \"${DOC_ID_INPUT}\" fehlt.` });\n            return;\n        }\n        const settings = {\n            baseUri: req.get(\"x-dv-baseuri\"),\n            apiKey: req.var(\"apiKey\"),\n            categoryQuotes: req.var(\"dmsCategoryDebAngeboteGUID\"),\n            fieldDocumentNo: req.var(\"dmsFieldBelegNrGUID\"),\n            fieldQuoteNos: req.var(\"dmsFieldAngebotsNrnGUID\"),\n            fieldOrderNos: req.var(\"dmsFieldAuftragsNrnGUID\"),\n        };\n        const repositoryId = (await (0, getRepositories_1.getRepositories)(settings.baseUri, settings.apiKey)).body.repositories[0]?.id;\n        if (!repositoryId) {\n            throw new Error(\"Kein DMS-Repository gefunden.\");\n        }\n        // Webhook-Body bringt die Eigenschaften mit, sonst das Dokument laden.\n        const { orderNo, quoteNos } = Array.isArray(body?.doc?.properties)\n            ? valuesFromWebhook(body.doc.properties, settings)\n            : await valuesFromDocument(settings, repositoryId, documentId);\n        logger.info(`Auftrag ${documentId}: Belegnummer \"${orderNo}\", Angebotsnummern ${JSON.stringify(quoteNos)}`);\n        if (!orderNo) {\n            respond(res, 200, { success: true, linked: [], message: `Auftrag ${documentId} hat keine Belegnummer - nichts zu verknüpfen.` });\n            return;\n        }\n        if (quoteNos.length === 0) {\n            respond(res, 200, { success: true, linked: [], message: `Auftrag ${documentId} hat keine Angebotsnummer - nichts zu verknüpfen.` });\n            return;\n        }\n        const linked = [];\n        const notFound = [];\n        for (const quoteNo of quoteNos) {\n            const quoteId = await linkQuote(settings, repositoryId, quoteNo, orderNo);\n            if (quoteId) {\n                linked.push(quoteNo);\n            }\n            else {\n                notFound.push(quoteNo);\n            }\n        }\n        const message = [\n            linked.length ? `Auftrag ${orderNo} mit Angebot(en) ${linked.join(\", \")} verknüpft.` : \"\",\n            notFound.length ? `Angebot(e) ${notFound.join(\", \")} nicht gefunden.` : \"\",\n        ].filter(Boolean).join(\" \");\n        logger.info(message);\n        respond(res, 200, { success: true, linked, notFound, message });\n    }\n    catch (error) {\n        const message = error instanceof Error ? error.message : String(error);\n        logger.error(`Fehler: ${message}`);\n        respond(res, 500, { success: false, message });\n    }\n};\n// Sucht das Angebot mit der Belegnummer quoteNo und ergänzt dort orderNo in\n// den Auftragsnummern. Liefert die Dokument-Id oder undefined, wenn es kein\n// Angebot mit dieser Nummer gibt.\nasync function linkQuote(settings, repositoryId, quoteNo, orderNo) {\n    const result = await (0, getDocumentsWithSourcemapping_1.getDocumentsWithSourcemapping)(settings.baseUri, settings.apiKey, repositoryId, `/dms/r/${repositoryId}/source`, { [settings.fieldDocumentNo]: [quoteNo] }, [settings.categoryQuotes]);\n    const quote = result.body.items?.[0];\n    if (!quote) {\n        return undefined;\n    }\n    const property = quote.sourceProperties.find((p) => p.key === settings.fieldOrderNos);\n    const orderNos = property?.values ? Object.values(property.values).filter(Boolean) : property?.value ? [property.value] : [];\n    if (orderNos.includes(orderNo)) {\n        logger.info(`Angebot ${quoteNo} (${quote.id}) enthält Auftrag ${orderNo} bereits.`);\n        return quote.id;\n    }\n    await (0, updateDocument_1.updateDocument)(settings.baseUri, settings.apiKey, repositoryId, quote.id, settings.categoryQuotes, {\n        properties: [{ key: settings.fieldOrderNos, values: [...orderNos, orderNo] }],\n    });\n    logger.info(`Angebot ${quoteNo} (${quote.id}): Auftrag ${orderNo} ergänzt.`);\n    return quote.id;\n}\nasync function valuesFromDocument(settings, repositoryId, documentId) {\n    const document = (await (0, getSpecificDocument_1.getSpecificDocument)(settings.baseUri, settings.apiKey, repositoryId, documentId)).body;\n    const orderNo = document.objectProperties?.find((p) => p.id === settings.fieldDocumentNo)?.value;\n    const multi = document.multivalueProperties?.find((p) => p.id === settings.fieldQuoteNos);\n    // Angebotsnummern als Mehrfachfeld ({ \"1\": \"...\", ... }) oder notfalls als Einzelfeld.\n    const quoteNos = multi?.values\n        ? Object.values(multi.values)\n        : [document.objectProperties?.find((p) => p.id === settings.fieldQuoteNos)?.value];\n    return { orderNo: clean(orderNo), quoteNos: unique(quoteNos) };\n}\n// Body eines DMS-Webhooks: doc.properties = [{ id, value } | { id, values: [{ value }] }].\nfunction valuesFromWebhook(properties, settings) {\n    const find = (id) => properties.find((p) => p?.id === id);\n    const quoteProperty = find(settings.fieldQuoteNos);\n    const quoteNos = Array.isArray(quoteProperty?.values)\n        ? quoteProperty.values.map((v) => v?.value)\n        : [quoteProperty?.value];\n    return { orderNo: clean(find(settings.fieldDocumentNo)?.value), quoteNos: unique(quoteNos) };\n}\nfunction clean(value) {\n    return value === undefined || value === null ? \"\" : String(value).trim();\n}\nfunction unique(values) {\n    return [...new Set(values.map(clean).filter(Boolean))];\n}\nfunction parseBody(req) {\n    try {\n        return req.json?.() ?? {};\n    }\n    catch {\n        return {};\n    }\n}\nfunction respond(res, status, body) {\n    res.status(status).set(\"Content-Type\", \"application/json\").send(JSON.stringify(body));\n}\n\n\n/***/ }\n\n/******/ \t});\n/************************************************************************/\n/******/ \t// The module cache\n/******/ \tconst __webpack_module_cache__ = {};\n/******/ \t\n/******/ \t// The require function\n/******/ \tfunction __webpack_require__(moduleId) {\n/******/ \t\t// Check if module is in cache\n/******/ \t\tconst cachedModule = __webpack_module_cache__[moduleId];\n/******/ \t\tif (cachedModule !== undefined) {\n/******/ \t\t\treturn cachedModule.exports;\n/******/ \t\t}\n/******/ \t\t// Create a new module (and put it into the cache)\n/******/ \t\tconst module = __webpack_module_cache__[moduleId] = {\n/******/ \t\t\t// no module.id needed\n/******/ \t\t\t// no module.loaded needed\n/******/ \t\t\texports: {}\n/******/ \t\t};\n/******/ \t\n/******/ \t\t// Execute the module function\n/******/ \t\tif (!(moduleId in __webpack_modules__)) {\n/******/ \t\t\tdelete __webpack_module_cache__[moduleId];\n/******/ \t\t\tconst e = new Error(\"Cannot find module '\" + moduleId + \"'\");\n/******/ \t\t\te.code = 'MODULE_NOT_FOUND';\n/******/ \t\t\tthrow e;\n/******/ \t\t}\n/******/ \t\t__webpack_modules__[moduleId](module, module.exports, __webpack_require__);\n/******/ \t\n/******/ \t\t// Return the exports of the module\n/******/ \t\treturn module.exports;\n/******/ \t}\n/******/ \t\n/************************************************************************/\n/******/ \t\n/******/ \t// startup\n/******/ \t// Load entry module and return exports\n/******/ \t// This entry module is referenced by other modules so it can't be inlined\n/******/ \tlet __webpack_exports__ = __webpack_require__(\"./src/scripts/angebotMitAuftragVerknuepfen.ts\");\n/******/ \tmodule.exports = __webpack_exports__;\n/******/ \t\n/******/ })()\n;\n//# sourceMappingURL=angebotMitAuftragVerknuepfen.js.map";

/***/ },

/***/ "./dist/scripts/duplicateDetection.js?raw"
/*!************************************************!*\
  !*** ./dist/scripts/duplicateDetection.js?raw ***!
  \************************************************/
(module) {

module.exports = "/******/ (() => { // webpackBootstrap\n/******/ \t\"use strict\";\n/******/ \tvar __webpack_modules__ = ({\n\n/***/ \"../../helper/performHttpRequest/performHttpRequest.ts\"\n/*!*************************************************************!*\\\n  !*** ../../helper/performHttpRequest/performHttpRequest.ts ***!\n  \\*************************************************************/\n(__unused_webpack_module, exports, __webpack_require__) {\n\n\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.performHttpRequest = performHttpRequest;\nconst logger_1 = __webpack_require__(/*! ../utils/logger */ \"../../helper/utils/logger.ts\");\n/**\n * Performs an HTTP request and returns a structured response.\n*\n* @template T - The expected type of the response body.\n* @param {string} url - The URL to which the request is sent.\n* @param {RequestInit} options - The options for the HTTP request, such as method, headers, and body.\n* @returns {Promise<ApiResponse<T>>} A promise that resolves to an `ApiResponse` object containing the response details.\n* @throws {Error} Throws an error if the HTTP response status is not OK (status code outside the range 200-299).\n*\n* The function attempts to parse the response body based on the `Content-Type` header:\n* - If the `Content-Type` includes \"application/json\", it parses the body as JSON.\n* - Otherwise, it parses the body as plain text.\n*\n* If the response is not OK, the function throws an error with the status code and error message.\n*/\nconst logger = (0, logger_1.getLogger)();\nasync function performHttpRequest(url, options) {\n    let body = {};\n    let errorMessage = \"\";\n    let response;\n    logger.debug(`[Request] ${options.method} ${url} | Headers: ${JSON.stringify(options.headers)} | Body: ${!(options.body instanceof Uint8Array) && options.body !== undefined\n        ? options.body\n        : \"[Binary body omitted]\"}`);\n    try {\n        response = await fetch(url, options);\n    }\n    catch (err) {\n        throw new Error(`Network error during fetch: ${err.message}`);\n    }\n    const contentType = response.headers.get(\"content-type\") || \"\";\n    const parseBody = async () => {\n        try {\n            if (contentType.includes(\"application/json\") || contentType.includes('application/hal+json')) {\n                return await response.json();\n            }\n            else if (contentType.includes(\"application/octet-stream\") ||\n                contentType.includes(\"application/pdf\")) {\n                const arrayBuffer = await response.arrayBuffer();\n                return new Uint8Array(arrayBuffer);\n            }\n            else {\n                return await response.text();\n            }\n        }\n        catch (e) {\n            return undefined;\n        }\n    };\n    if (response.ok) {\n        const result = await parseBody();\n        if (result !== undefined) {\n            body = result;\n        }\n    }\n    else {\n        const errorBody = await parseBody();\n        errorMessage =\n            typeof errorBody === \"string\" ? errorBody : JSON.stringify(errorBody);\n        throw new Error(`HTTP error! status: ${response.status}, message: ${errorMessage}`);\n    }\n    return {\n        status: response.status,\n        statusText: response.statusText,\n        body: body,\n        bodyUsed: response.bodyUsed,\n        headers: response.headers,\n        ok: response.ok,\n        redirected: response.redirected,\n        type: response.type,\n        url: response.url,\n    };\n}\n\n\n/***/ },\n\n/***/ \"../../helper/utils/logger.ts\"\n/*!************************************!*\\\n  !*** ../../helper/utils/logger.ts ***!\n  \\************************************/\n(__unused_webpack_module, exports) {\n\n\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Logger = exports.LogLevel = void 0;\nexports.initLogger = initLogger;\nexports.getLogger = getLogger;\nvar LogLevel;\n(function (LogLevel) {\n    LogLevel[LogLevel[\"DEBUG\"] = 0] = \"DEBUG\";\n    LogLevel[LogLevel[\"INFO\"] = 1] = \"INFO\";\n    LogLevel[LogLevel[\"WARN\"] = 2] = \"WARN\";\n    LogLevel[LogLevel[\"ERROR\"] = 3] = \"ERROR\";\n})(LogLevel || (exports.LogLevel = LogLevel = {}));\nclass Logger {\n    constructor(options = {}) {\n        this.level = options.level ?? LogLevel.INFO;\n        this.showTimestamp = options.showTimestamp ?? true;\n    }\n    formatMessage(level, message) {\n        const paddedLevel = level.toUpperCase().padEnd(5, ' ');\n        const timestamp = this.showTimestamp\n            ? `[${new Date().toISOString()}] `\n            : \"\";\n        return `${timestamp}${paddedLevel}: ${message}`;\n    }\n    debug(message, ...args) {\n        if (this.level <= LogLevel.DEBUG) {\n            console.debug(this.formatMessage(\"debug\", message), ...args);\n        }\n    }\n    info(message, ...args) {\n        if (this.level <= LogLevel.INFO) {\n            console.info(this.formatMessage(\"info\", message), ...args);\n        }\n    }\n    warn(message, ...args) {\n        if (this.level <= LogLevel.WARN) {\n            console.warn(this.formatMessage(\"warn\", message), ...args);\n        }\n    }\n    error(message, ...args) {\n        if (this.level <= LogLevel.ERROR) {\n            console.error(this.formatMessage(\"error\", message), ...args);\n        }\n    }\n    setLevel(newLevel) {\n        this.level = newLevel;\n    }\n}\nexports.Logger = Logger;\nlet loggerInstance;\nfunction initLogger(level = LogLevel.INFO, showTimestamp = true) {\n    if (!loggerInstance) {\n        loggerInstance = new Logger({ level, showTimestamp });\n    }\n    return loggerInstance;\n}\nfunction getLogger() {\n    // Fallback: falls noch niemand initLogger() aufgerufen hat\n    if (!loggerInstance) {\n        loggerInstance = new Logger({ level: LogLevel.DEBUG, showTimestamp: true });\n    }\n    return loggerInstance;\n}\n\n\n/***/ },\n\n/***/ \"../../helper/webindexlayouter/executeSqlQuery.ts\"\n/*!********************************************************!*\\\n  !*** ../../helper/webindexlayouter/executeSqlQuery.ts ***!\n  \\********************************************************/\n(__unused_webpack_module, exports, __webpack_require__) {\n\n\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.executeSqlQuery = executeSqlQuery;\nconst performHttpRequest_1 = __webpack_require__(/*! ../performHttpRequest/performHttpRequest */ \"../../helper/performHttpRequest/performHttpRequest.ts\");\n/**\n * Führt eine SQL-Abfrage auf der Datenbank einer App aus - wie der\n * Webindex-Designer (z.B. für eigene Dublettenprüfungen):\n * POST /webindexlayouter/api/v1/apps/<app>/sqlResult\n * mit { connectionString: null, sqlQuery }.\n * connectionString null = Standard-Datenbank der App (z.B. die Protokoll-\n * Tabellen CCLogDocuments/CCLogAttributes des Rechnungslesers).\n *\n * @param token - API-Key; leer = Browser-Session.\n * @param app - App-Name, z.B. \"classcon-documentreader\".\n */\nasync function executeSqlQuery(baseUri, token, app, sqlQuery, connectionString = null) {\n    return await (0, performHttpRequest_1.performHttpRequest)(`${baseUri}/webindexlayouter/api/v1/apps/${encodeURIComponent(app)}/sqlResult`, {\n        method: \"POST\",\n        headers: {\n            ...(token ? { Authorization: `Bearer ${token}` } : {}),\n            Accept: \"application/json\",\n            \"Content-Type\": \"application/json\",\n        },\n        body: JSON.stringify({ connectionString, sqlQuery }),\n    });\n}\n\n\n/***/ },\n\n/***/ \"./src/scripts/duplicateDetection.ts\"\n/*!*******************************************!*\\\n  !*** ./src/scripts/duplicateDetection.ts ***!\n  \\*******************************************/\n(module, exports, __webpack_require__) {\n\n\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst executeSqlQuery_1 = __webpack_require__(/*! ../../../../helper/webindexlayouter/executeSqlQuery */ \"../../helper/webindexlayouter/executeSqlQuery.ts\");\nconst logger_1 = __webpack_require__(/*! ../../../../helper/utils/logger */ \"../../helper/utils/logger.ts\");\n/**\n * \"Rechnungsleser Dublettenerkennung\": wird vom Rechnungsleser nach der\n * Extraktion aufgerufen (Extension Point \"IR_Business_PostExtractionScript\",\n * Typ ScriptingApp, Profil \"PostExtractionScript\" - hinterlegt vom\n * Onboarding-Formular). Bekommt die Attribute des Dokuments als JSON und\n * liefert sie zurück.\n *\n * Sucht im Protokoll des Rechnungslesers (CCLogDocuments/CCLogAttributes, per\n * SQL über den Webindex-Designer) nach Dokumenten mit derselben\n * Lieferantennummer (VENDOR_NUM) UND derselben Rechnungsnummer\n * (InvoiceNumber). Das aktuelle Dokument selbst (DocumentUID) zählt nicht.\n * Bei einer Dublette werden die Attribute IsDuplicate (true) und\n * DuplicateDocumentIds (Ids der früheren Dokumente) gesetzt - im Typ des\n * Attributs im Rechnungsleser (Text-Attribut: \"true\" bzw. kommagetrennte Ids).\n *\n * customerVariables (vom Onboarding-Formular nur beim Neuanlegen gesetzt):\n * apiKey (verschlüsselt). Die Mandanten-Adresse kommt aus dem Header\n * \"x-dv-baseuri\".\n */\nconst logger = (0, logger_1.initLogger)(logger_1.LogLevel.INFO);\nconst APP = \"classcon-documentreader\";\nconst VENDOR_FIELD = \"VENDOR_NUM\";\nconst INVOICE_FIELD = \"InvoiceNumber\";\nconst DOCUMENT_ID_FIELD = \"DocumentUID\";\n// Ergebnis bei einer Dublette: Kennzeichen (boolean) und die Ids der früheren\n// Dokumente (Array).\nconst DUPLICATE_FLAG_FIELD = \"IsDuplicate\";\nconst DUPLICATE_IDS_FIELD = \"DuplicateDocumentIds\";\nmodule.exports = async (req, res) => {\n    const body = parseBody(req);\n    // Diagnose (vorübergehend): Aufbau der Daten, die der Rechnungsleser schickt.\n    logger.info(`Eingang: ${JSON.stringify(body).slice(0, 4000)}`);\n    try {\n        const vendorNum = attribute(body, VENDOR_FIELD);\n        const invoiceNumber = attribute(body, INVOICE_FIELD);\n        if (!vendorNum || !invoiceNumber) {\n            logger.info(`Keine Prüfung: ${VENDOR_FIELD} \"${vendorNum}\" / ${INVOICE_FIELD} \"${invoiceNumber}\" unvollständig.`);\n        }\n        else {\n            const baseUri = req.get(\"x-dv-baseuri\");\n            const apiKey = req.var(\"apiKey\");\n            const duplicates = await findDuplicates(baseUri, apiKey, vendorNum, invoiceNumber, attribute(body, DOCUMENT_ID_FIELD));\n            logger.info(`Lieferant \"${vendorNum}\", Rechnung \"${invoiceNumber}\": ${duplicates.length} Dublette(n) ${JSON.stringify(duplicates)}`);\n            if (duplicates.length > 0) {\n                setAttribute(body, DUPLICATE_FLAG_FIELD, true);\n                setAttribute(body, DUPLICATE_IDS_FIELD, duplicates.map((d) => d.documentId));\n            }\n        }\n    }\n    catch (error) {\n        // Die Dublettenprüfung darf die Verarbeitung nicht aufhalten - Fehler nur\n        // protokollieren und die Attribute unverändert zurückgeben.\n        logger.error(`Dublettenprüfung fehlgeschlagen: ${error instanceof Error ? error.message : String(error)}`);\n    }\n    // Diagnose (vorübergehend): was an den Rechnungsleser zurückgeht.\n    logger.info(`Antwort: ${JSON.stringify(body).slice(0, 4000)}`);\n    res.status(200).set(\"Content-Type\", \"application/json\").send(JSON.stringify(body));\n};\nasync function findDuplicates(baseUri, apiKey, vendorNum, invoiceNumber, currentDocumentId) {\n    // Werte stammen aus der Extraktion (Rechnungstext) - als SQL-Literal\n    // maskieren, damit z.B. ein Hochkomma in der Rechnungsnummer die Abfrage\n    // nicht verändert.\n    const sqlQuery = `\nSELECT\n  doc.DocumentId,\n  aV.Attribute_After AS VendorNum,\n  aI.Attribute_After AS InvoiceNumber\nFROM\n  CCLogDocuments AS doc\n  JOIN CCLogAttributes AS aV ON aV.DocumentID = doc.DocumentID\n    AND aV.Attribute_Name = '${VENDOR_FIELD}'\n    AND aV.Attribute_After = ${sqlString(vendorNum)}\n  JOIN CCLogAttributes AS aI ON aI.DocumentID = doc.DocumentID\n    AND aI.Attribute_Name = '${INVOICE_FIELD}'\n    AND aI.Attribute_After = ${sqlString(invoiceNumber)}${currentDocumentId ? `\nWHERE\n  doc.DocumentID <> ${sqlString(currentDocumentId)}` : \"\"}`;\n    logger.debug(`SQL Query: ${sqlQuery}`);\n    const result = (await (0, executeSqlQuery_1.executeSqlQuery)(baseUri, apiKey, APP, sqlQuery)).body;\n    const headers = (result?.headers ?? []).map((h) => h.toLowerCase());\n    const column = (cells, name) => cells[headers.indexOf(name.toLowerCase())] ?? \"\";\n    return (result?.rows ?? []).map((row) => ({\n        documentId: column(row.cells ?? [], \"DocumentId\"),\n        vendorNum: column(row.cells ?? [], \"VendorNum\"),\n        invoiceNumber: column(row.cells ?? [], \"InvoiceNumber\"),\n    }));\n}\nfunction sqlString(value) {\n    return `N'${value.replace(/'/g, \"''\")}'`;\n}\n// Attribut aus dem Rechnungsleser-JSON: direkt als Feld (ohne Rücksicht auf\n// Groß-/Kleinschreibung) oder als Eintrag einer Attributliste\n// ({ Name/AttributeName/Id, Value }).\nfunction attribute(body, name) {\n    const key = name.toLowerCase();\n    for (const [field, value] of Object.entries(body)) {\n        if (field.toLowerCase() === key && value !== null && typeof value !== \"object\") {\n            return String(value).trim();\n        }\n    }\n    for (const value of Object.values(body)) {\n        if (!Array.isArray(value))\n            continue;\n        for (const entry of value) {\n            const entryName = String(entry?.Name ?? entry?.AttributeName ?? entry?.Id ?? entry?.name ?? \"\").toLowerCase();\n            if (entryName === key) {\n                return String(entry?.Value ?? entry?.value ?? \"\").trim();\n            }\n        }\n    }\n    return \"\";\n}\n// Schreibt ein Attribut im selben Format zurück, in dem die Attribute\n// ankommen: steckt VENDOR_NUM in einer Attributliste ({ Name, Value }), wird\n// dort ein Eintrag mit denselben Feldnamen ergänzt bzw. überschrieben - sonst\n// direkt als Feld.\nfunction setAttribute(body, name, value) {\n    // Der Rechnungsleser schickt die Attribute flach ({ \"VENDOR_NUM\": \"…\" }) und\n    // übernimmt nur Werte im Typ des Attributs: ein Text-Attribut kommt als \"\"\n    // an und verwirft true bzw. ein Array - dann als Text zurückgeben\n    // (\"true\", Ids kommagetrennt). Boolean-/Listen-Attribute bekommen den Wert\n    // unverändert.\n    const current = body[name];\n    body[name] = typeof current === \"string\"\n        ? (Array.isArray(value) ? value.join(\", \") : String(value))\n        : value;\n}\nfunction parseBody(req) {\n    try {\n        const body = req.json?.();\n        return body && typeof body === \"object\" ? body : {};\n    }\n    catch {\n        return {};\n    }\n}\n\n\n/***/ }\n\n/******/ \t});\n/************************************************************************/\n/******/ \t// The module cache\n/******/ \tconst __webpack_module_cache__ = {};\n/******/ \t\n/******/ \t// The require function\n/******/ \tfunction __webpack_require__(moduleId) {\n/******/ \t\t// Check if module is in cache\n/******/ \t\tconst cachedModule = __webpack_module_cache__[moduleId];\n/******/ \t\tif (cachedModule !== undefined) {\n/******/ \t\t\treturn cachedModule.exports;\n/******/ \t\t}\n/******/ \t\t// Create a new module (and put it into the cache)\n/******/ \t\tconst module = __webpack_module_cache__[moduleId] = {\n/******/ \t\t\t// no module.id needed\n/******/ \t\t\t// no module.loaded needed\n/******/ \t\t\texports: {}\n/******/ \t\t};\n/******/ \t\n/******/ \t\t// Execute the module function\n/******/ \t\tif (!(moduleId in __webpack_modules__)) {\n/******/ \t\t\tdelete __webpack_module_cache__[moduleId];\n/******/ \t\t\tconst e = new Error(\"Cannot find module '\" + moduleId + \"'\");\n/******/ \t\t\te.code = 'MODULE_NOT_FOUND';\n/******/ \t\t\tthrow e;\n/******/ \t\t}\n/******/ \t\t__webpack_modules__[moduleId](module, module.exports, __webpack_require__);\n/******/ \t\n/******/ \t\t// Return the exports of the module\n/******/ \t\treturn module.exports;\n/******/ \t}\n/******/ \t\n/************************************************************************/\n/******/ \t\n/******/ \t// startup\n/******/ \t// Load entry module and return exports\n/******/ \t// This entry module is referenced by other modules so it can't be inlined\n/******/ \tlet __webpack_exports__ = __webpack_require__(\"./src/scripts/duplicateDetection.ts\");\n/******/ \tmodule.exports = __webpack_exports__;\n/******/ \t\n/******/ })()\n;\n//# sourceMappingURL=duplicateDetection.js.map";

/***/ },

/***/ "./dist/scripts/gutschriftenVerschieben.js?raw"
/*!*****************************************************!*\
  !*** ./dist/scripts/gutschriftenVerschieben.js?raw ***!
  \*****************************************************/
(module) {

module.exports = "/******/ (() => { // webpackBootstrap\n/******/ \t\"use strict\";\n/******/ \tvar __webpack_modules__ = ({\n\n/***/ \"../../helper/dms/getRepositories.ts\"\n/*!*******************************************!*\\\n  !*** ../../helper/dms/getRepositories.ts ***!\n  \\*******************************************/\n(__unused_webpack_module, exports, __webpack_require__) {\n\n\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.getRepositories = getRepositories;\nconst performHttpRequest_1 = __webpack_require__(/*! ../performHttpRequest/performHttpRequest */ \"../../helper/performHttpRequest/performHttpRequest.ts\");\nasync function getRepositories(baseUri, token) {\n    const url = `${baseUri}/dms/r`;\n    const headers = {\n        \"Authorization\": `Bearer ${token}`,\n        \"Accept\": \"application/json\",\n        \"Content-Type\": \"application/json\",\n    };\n    const options = {\n        method: \"GET\",\n        headers,\n    };\n    return await (0, performHttpRequest_1.performHttpRequest)(url, options);\n}\n\n\n/***/ },\n\n/***/ \"../../helper/dms/getSpecificDocument.ts\"\n/*!***********************************************!*\\\n  !*** ../../helper/dms/getSpecificDocument.ts ***!\n  \\***********************************************/\n(__unused_webpack_module, exports, __webpack_require__) {\n\n\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.getSpecificDocument = getSpecificDocument;\nconst performHttpRequest_1 = __webpack_require__(/*! ../performHttpRequest/performHttpRequest */ \"../../helper/performHttpRequest/performHttpRequest.ts\");\n/**\n * Retrieves a specific document from the DMS (Document Management System) using the provided parameters.\n *\n * @param baseUri - The base URI of the DMS API.\n * @param token - The authorization token to access the DMS API.\n * @param repositoryId - The ID of the repository where the document is stored.\n * @param documentId - The ID of the specific document to retrieve.\n * @returns A promise that resolves to an `ApiResponse` containing the `GetSpecificDocument` data.\n *\n * @throws Will throw an error if the HTTP request fails or the response is invalid.\n */\nasync function getSpecificDocument(baseUri, token, repositoryId, documentId) {\n    const url = `${baseUri}/dms/r/${repositoryId}/o2/${documentId}`;\n    const headers = {\n        \"Authorization\": `Bearer ${token}`,\n        \"Accept\": \"application/json\",\n        \"Content-Type\": \"application/json\",\n    };\n    const options = {\n        method: \"GET\",\n        headers\n    };\n    return await (0, performHttpRequest_1.performHttpRequest)(url, options);\n}\n\n\n/***/ },\n\n/***/ \"../../helper/dms/updateDocument.ts\"\n/*!******************************************!*\\\n  !*** ../../helper/dms/updateDocument.ts ***!\n  \\******************************************/\n(__unused_webpack_module, exports, __webpack_require__) {\n\n\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.updateDocument = updateDocument;\nconst performHttpRequest_1 = __webpack_require__(/*! ../performHttpRequest/performHttpRequest */ \"../../helper/performHttpRequest/performHttpRequest.ts\");\nasync function updateDocument(baseUri, token, repositoryId, documentId, sourceCategory, sourceProperties) {\n    const url = `${baseUri}/dms/r/${repositoryId}/o2m/${documentId}`;\n    const headers = {\n        Authorization: `Bearer ${token}`,\n        Accept: \"application/json\",\n        \"Content-Type\": \"application/json\",\n    };\n    const body = {\n        sourceCategory: sourceCategory,\n        sourceId: `/dms/r/${repositoryId}/source`,\n        sourceProperties: sourceProperties,\n    };\n    const options = {\n        method: \"PUT\",\n        headers,\n        body: JSON.stringify(body),\n    };\n    return await (0, performHttpRequest_1.performHttpRequest)(url, options);\n}\n\n\n/***/ },\n\n/***/ \"../../helper/performHttpRequest/performHttpRequest.ts\"\n/*!*************************************************************!*\\\n  !*** ../../helper/performHttpRequest/performHttpRequest.ts ***!\n  \\*************************************************************/\n(__unused_webpack_module, exports, __webpack_require__) {\n\n\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.performHttpRequest = performHttpRequest;\nconst logger_1 = __webpack_require__(/*! ../utils/logger */ \"../../helper/utils/logger.ts\");\n/**\n * Performs an HTTP request and returns a structured response.\n*\n* @template T - The expected type of the response body.\n* @param {string} url - The URL to which the request is sent.\n* @param {RequestInit} options - The options for the HTTP request, such as method, headers, and body.\n* @returns {Promise<ApiResponse<T>>} A promise that resolves to an `ApiResponse` object containing the response details.\n* @throws {Error} Throws an error if the HTTP response status is not OK (status code outside the range 200-299).\n*\n* The function attempts to parse the response body based on the `Content-Type` header:\n* - If the `Content-Type` includes \"application/json\", it parses the body as JSON.\n* - Otherwise, it parses the body as plain text.\n*\n* If the response is not OK, the function throws an error with the status code and error message.\n*/\nconst logger = (0, logger_1.getLogger)();\nasync function performHttpRequest(url, options) {\n    let body = {};\n    let errorMessage = \"\";\n    let response;\n    logger.debug(`[Request] ${options.method} ${url} | Headers: ${JSON.stringify(options.headers)} | Body: ${!(options.body instanceof Uint8Array) && options.body !== undefined\n        ? options.body\n        : \"[Binary body omitted]\"}`);\n    try {\n        response = await fetch(url, options);\n    }\n    catch (err) {\n        throw new Error(`Network error during fetch: ${err.message}`);\n    }\n    const contentType = response.headers.get(\"content-type\") || \"\";\n    const parseBody = async () => {\n        try {\n            if (contentType.includes(\"application/json\") || contentType.includes('application/hal+json')) {\n                return await response.json();\n            }\n            else if (contentType.includes(\"application/octet-stream\") ||\n                contentType.includes(\"application/pdf\")) {\n                const arrayBuffer = await response.arrayBuffer();\n                return new Uint8Array(arrayBuffer);\n            }\n            else {\n                return await response.text();\n            }\n        }\n        catch (e) {\n            return undefined;\n        }\n    };\n    if (response.ok) {\n        const result = await parseBody();\n        if (result !== undefined) {\n            body = result;\n        }\n    }\n    else {\n        const errorBody = await parseBody();\n        errorMessage =\n            typeof errorBody === \"string\" ? errorBody : JSON.stringify(errorBody);\n        throw new Error(`HTTP error! status: ${response.status}, message: ${errorMessage}`);\n    }\n    return {\n        status: response.status,\n        statusText: response.statusText,\n        body: body,\n        bodyUsed: response.bodyUsed,\n        headers: response.headers,\n        ok: response.ok,\n        redirected: response.redirected,\n        type: response.type,\n        url: response.url,\n    };\n}\n\n\n/***/ },\n\n/***/ \"../../helper/utils/logger.ts\"\n/*!************************************!*\\\n  !*** ../../helper/utils/logger.ts ***!\n  \\************************************/\n(__unused_webpack_module, exports) {\n\n\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Logger = exports.LogLevel = void 0;\nexports.initLogger = initLogger;\nexports.getLogger = getLogger;\nvar LogLevel;\n(function (LogLevel) {\n    LogLevel[LogLevel[\"DEBUG\"] = 0] = \"DEBUG\";\n    LogLevel[LogLevel[\"INFO\"] = 1] = \"INFO\";\n    LogLevel[LogLevel[\"WARN\"] = 2] = \"WARN\";\n    LogLevel[LogLevel[\"ERROR\"] = 3] = \"ERROR\";\n})(LogLevel || (exports.LogLevel = LogLevel = {}));\nclass Logger {\n    constructor(options = {}) {\n        this.level = options.level ?? LogLevel.INFO;\n        this.showTimestamp = options.showTimestamp ?? true;\n    }\n    formatMessage(level, message) {\n        const paddedLevel = level.toUpperCase().padEnd(5, ' ');\n        const timestamp = this.showTimestamp\n            ? `[${new Date().toISOString()}] `\n            : \"\";\n        return `${timestamp}${paddedLevel}: ${message}`;\n    }\n    debug(message, ...args) {\n        if (this.level <= LogLevel.DEBUG) {\n            console.debug(this.formatMessage(\"debug\", message), ...args);\n        }\n    }\n    info(message, ...args) {\n        if (this.level <= LogLevel.INFO) {\n            console.info(this.formatMessage(\"info\", message), ...args);\n        }\n    }\n    warn(message, ...args) {\n        if (this.level <= LogLevel.WARN) {\n            console.warn(this.formatMessage(\"warn\", message), ...args);\n        }\n    }\n    error(message, ...args) {\n        if (this.level <= LogLevel.ERROR) {\n            console.error(this.formatMessage(\"error\", message), ...args);\n        }\n    }\n    setLevel(newLevel) {\n        this.level = newLevel;\n    }\n}\nexports.Logger = Logger;\nlet loggerInstance;\nfunction initLogger(level = LogLevel.INFO, showTimestamp = true) {\n    if (!loggerInstance) {\n        loggerInstance = new Logger({ level, showTimestamp });\n    }\n    return loggerInstance;\n}\nfunction getLogger() {\n    // Fallback: falls noch niemand initLogger() aufgerufen hat\n    if (!loggerInstance) {\n        loggerInstance = new Logger({ level: LogLevel.DEBUG, showTimestamp: true });\n    }\n    return loggerInstance;\n}\n\n\n/***/ },\n\n/***/ \"./src/scripts/gutschriftenVerschieben.ts\"\n/*!************************************************!*\\\n  !*** ./src/scripts/gutschriftenVerschieben.ts ***!\n  \\************************************************/\n(module, exports, __webpack_require__) {\n\n\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst getRepositories_1 = __webpack_require__(/*! ../../../../helper/dms/getRepositories */ \"../../helper/dms/getRepositories.ts\");\nconst getSpecificDocument_1 = __webpack_require__(/*! ../../../../helper/dms/getSpecificDocument */ \"../../helper/dms/getSpecificDocument.ts\");\nconst updateDocument_1 = __webpack_require__(/*! ../../../../helper/dms/updateDocument */ \"../../helper/dms/updateDocument.ts\");\nconst logger_1 = __webpack_require__(/*! ../../../../helper/utils/logger */ \"../../helper/utils/logger.ts\");\n/**\n * \"Rechnungsleser Gutschriften verschieben\" (ehemals\n * projects/_OLD/moveDocumentsOfDocumentReader/script.mjs, bisher nur per\n * DMS-Webhook aufgerufen): prüft beim Dokument mit der übergebenen DocId die\n * Dokumentart des Rechnungslesers und\n *  - verschiebt Gutschriften (Wert = fieldDocumentTypeValueMatch, z.B.\n *    \"CreditAdvice\") in die Kategorie categoryCreditMemoGUID und setzt die\n *    Dokumentart auf \"Gutschrift\",\n *  - setzt bei allen anderen Dokumenten die Dokumentart auf \"Rechnung\"\n *    (Kategorie bleibt).\n *\n * Wird vom Onboarding-Formular (src/forms/form.ts) als Process-Studio-Aktion\n * mit dem Eingabeparameter \"docId\" (wie im BPMN \"Rechnungsleser Gutschriften\n * verschieben\" verwendet) angelegt; der Code wird beim Build als\n * Text ins Formular-Bundle übernommen (siehe build/webpack.form.config.js).\n * Aus Kompatibilität wird auch der Body eines DMS-Webhooks ({ doc: { id } })\n * verstanden.\n *\n * customerVariables (werden vom Formular nur beim Neuanlegen gesetzt):\n * apiKey, categoryCreditMemoGUID, fieldDocumentTypeGUID,\n * fieldDocumentTypeValueMatch.\n */\nconst logger = (0, logger_1.initLogger)(logger_1.LogLevel.INFO);\n/** Name des Eingabeparameters der Aktion. */\nconst DOC_ID_INPUT = \"docId\";\nmodule.exports = async (req, res) => {\n    try {\n        const body = parseBody(req);\n        const documentId = body?.[DOC_ID_INPUT] ?? body?.DocId ?? body?.doc?.id;\n        if (!documentId) {\n            respond(res, 400, { success: false, message: `Eingabeparameter \"${DOC_ID_INPUT}\" fehlt.` });\n            return;\n        }\n        const baseUri = req.get(\"x-dv-baseuri\");\n        const apiKey = req.var(\"apiKey\");\n        const categoryCreditMemo = req.var(\"categoryCreditMemoGUID\");\n        const fieldDocumentType = req.var(\"fieldDocumentTypeGUID\");\n        const valueMatch = req.var(\"fieldDocumentTypeValueMatch\");\n        const repositoryId = (await (0, getRepositories_1.getRepositories)(baseUri, apiKey)).body.repositories[0]?.id;\n        if (!repositoryId) {\n            throw new Error(\"Kein DMS-Repository gefunden.\");\n        }\n        const document = (await (0, getSpecificDocument_1.getSpecificDocument)(baseUri, apiKey, repositoryId, documentId)).body;\n        const documentType = document.objectProperties?.find((property) => property.id === fieldDocumentType)?.value;\n        const isCreditMemo = documentType === valueMatch;\n        const targetCategory = isCreditMemo ? categoryCreditMemo : document.category;\n        if (!targetCategory) {\n            throw new Error(`Kategorie von Dokument ${documentId} konnte nicht ermittelt werden.`);\n        }\n        await (0, updateDocument_1.updateDocument)(baseUri, apiKey, repositoryId, documentId, targetCategory, {\n            properties: [{ key: fieldDocumentType, values: [isCreditMemo ? \"Gutschrift\" : \"Rechnung\"] }],\n        });\n        const message = isCreditMemo\n            ? `Dokument ${documentId} als Gutschrift in Kategorie ${categoryCreditMemo} verschoben.`\n            : `Dokument ${documentId} ist keine Gutschrift (Dokumentart \"${documentType ?? \"\"}\"), als Rechnung gekennzeichnet.`;\n        logger.info(message);\n        respond(res, 200, { success: true, creditMemo: isCreditMemo, message });\n    }\n    catch (error) {\n        const message = error instanceof Error ? error.message : String(error);\n        logger.error(`Fehler: ${message}`);\n        respond(res, 500, { success: false, message });\n    }\n};\nfunction parseBody(req) {\n    try {\n        return req.json?.() ?? {};\n    }\n    catch {\n        return {};\n    }\n}\nfunction respond(res, status, body) {\n    res.status(status).set(\"Content-Type\", \"application/json\").send(JSON.stringify(body));\n}\n\n\n/***/ }\n\n/******/ \t});\n/************************************************************************/\n/******/ \t// The module cache\n/******/ \tconst __webpack_module_cache__ = {};\n/******/ \t\n/******/ \t// The require function\n/******/ \tfunction __webpack_require__(moduleId) {\n/******/ \t\t// Check if module is in cache\n/******/ \t\tconst cachedModule = __webpack_module_cache__[moduleId];\n/******/ \t\tif (cachedModule !== undefined) {\n/******/ \t\t\treturn cachedModule.exports;\n/******/ \t\t}\n/******/ \t\t// Create a new module (and put it into the cache)\n/******/ \t\tconst module = __webpack_module_cache__[moduleId] = {\n/******/ \t\t\t// no module.id needed\n/******/ \t\t\t// no module.loaded needed\n/******/ \t\t\texports: {}\n/******/ \t\t};\n/******/ \t\n/******/ \t\t// Execute the module function\n/******/ \t\tif (!(moduleId in __webpack_modules__)) {\n/******/ \t\t\tdelete __webpack_module_cache__[moduleId];\n/******/ \t\t\tconst e = new Error(\"Cannot find module '\" + moduleId + \"'\");\n/******/ \t\t\te.code = 'MODULE_NOT_FOUND';\n/******/ \t\t\tthrow e;\n/******/ \t\t}\n/******/ \t\t__webpack_modules__[moduleId](module, module.exports, __webpack_require__);\n/******/ \t\n/******/ \t\t// Return the exports of the module\n/******/ \t\treturn module.exports;\n/******/ \t}\n/******/ \t\n/************************************************************************/\n/******/ \t\n/******/ \t// startup\n/******/ \t// Load entry module and return exports\n/******/ \t// This entry module is referenced by other modules so it can't be inlined\n/******/ \tlet __webpack_exports__ = __webpack_require__(\"./src/scripts/gutschriftenVerschieben.ts\");\n/******/ \tmodule.exports = __webpack_exports__;\n/******/ \t\n/******/ })()\n;\n//# sourceMappingURL=gutschriftenVerschieben.js.map";

/***/ },

/***/ "./dist/scripts/preExport.js?raw"
/*!***************************************!*\
  !*** ./dist/scripts/preExport.js?raw ***!
  \***************************************/
(module) {

module.exports = "/******/ (() => { // webpackBootstrap\n/******/ \t\"use strict\";\n/******/ \tvar __webpack_modules__ = ({\n\n/***/ \"../../helper/utils/logger.ts\"\n/*!************************************!*\\\n  !*** ../../helper/utils/logger.ts ***!\n  \\************************************/\n(__unused_webpack_module, exports) {\n\n\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Logger = exports.LogLevel = void 0;\nexports.initLogger = initLogger;\nexports.getLogger = getLogger;\nvar LogLevel;\n(function (LogLevel) {\n    LogLevel[LogLevel[\"DEBUG\"] = 0] = \"DEBUG\";\n    LogLevel[LogLevel[\"INFO\"] = 1] = \"INFO\";\n    LogLevel[LogLevel[\"WARN\"] = 2] = \"WARN\";\n    LogLevel[LogLevel[\"ERROR\"] = 3] = \"ERROR\";\n})(LogLevel || (exports.LogLevel = LogLevel = {}));\nclass Logger {\n    constructor(options = {}) {\n        this.level = options.level ?? LogLevel.INFO;\n        this.showTimestamp = options.showTimestamp ?? true;\n    }\n    formatMessage(level, message) {\n        const paddedLevel = level.toUpperCase().padEnd(5, ' ');\n        const timestamp = this.showTimestamp\n            ? `[${new Date().toISOString()}] `\n            : \"\";\n        return `${timestamp}${paddedLevel}: ${message}`;\n    }\n    debug(message, ...args) {\n        if (this.level <= LogLevel.DEBUG) {\n            console.debug(this.formatMessage(\"debug\", message), ...args);\n        }\n    }\n    info(message, ...args) {\n        if (this.level <= LogLevel.INFO) {\n            console.info(this.formatMessage(\"info\", message), ...args);\n        }\n    }\n    warn(message, ...args) {\n        if (this.level <= LogLevel.WARN) {\n            console.warn(this.formatMessage(\"warn\", message), ...args);\n        }\n    }\n    error(message, ...args) {\n        if (this.level <= LogLevel.ERROR) {\n            console.error(this.formatMessage(\"error\", message), ...args);\n        }\n    }\n    setLevel(newLevel) {\n        this.level = newLevel;\n    }\n}\nexports.Logger = Logger;\nlet loggerInstance;\nfunction initLogger(level = LogLevel.INFO, showTimestamp = true) {\n    if (!loggerInstance) {\n        loggerInstance = new Logger({ level, showTimestamp });\n    }\n    return loggerInstance;\n}\nfunction getLogger() {\n    // Fallback: falls noch niemand initLogger() aufgerufen hat\n    if (!loggerInstance) {\n        loggerInstance = new Logger({ level: LogLevel.DEBUG, showTimestamp: true });\n    }\n    return loggerInstance;\n}\n\n\n/***/ },\n\n/***/ \"./src/scripts/preExport.ts\"\n/*!**********************************!*\\\n  !*** ./src/scripts/preExport.ts ***!\n  \\**********************************/\n(module, exports, __webpack_require__) {\n\n\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst logger_1 = __webpack_require__(/*! ../../../../helper/utils/logger */ \"../../helper/utils/logger.ts\");\n/**\n * \"Rechnungsleser PreExport\": wird vom Rechnungsleser vor dem Export\n * aufgerufen (Extension Point \"IR_Business_BeforeExportHook\", Typ\n * ScriptingApp, Profil \"PreExportScript\" - hinterlegt vom Onboarding-Formular).\n * Bekommt die Attribute des Dokuments als JSON und liefert sie verändert\n * zurück:\n *  - DocumentType wird zum ERP-Code: CreditAdvice -> \"3\", alles andere\n *    (Invoice, CorrectionOfInvoice, unbekannt) -> \"2\".\n *    Alle übrigen Attribute bleiben unverändert.\n *\n * Wird der Hook erneut mit einem bereits umgesetzten Dokument aufgerufen\n * (DocumentType ist dann schon \"2\"/\"3\"), greift der Standardfall - der Code\n * bleibt \"2\" bzw. wird aus \"3\" zu \"2\"; daher \"3\" ausdrücklich beibehalten.\n */\nconst logger = (0, logger_1.initLogger)(logger_1.LogLevel.INFO);\nconst DOCUMENT_TYPE_FIELD = \"DocumentType\";\nconst MAPPING = {\n    Invoice: \"2\",\n    CreditAdvice: \"3\",\n    CorrectionOfInvoice: \"2\",\n};\n// Bereits umgesetzte Codes (erneuter Aufruf) nicht verändern.\nconst KNOWN_CODES = new Set([\"2\", \"3\"]);\nmodule.exports = async (req, res) => {\n    try {\n        const body = parseBody(req);\n        const documentType = String(body[DOCUMENT_TYPE_FIELD] ?? \"\");\n        const mapped = MAPPING[documentType];\n        if (mapped) {\n            body[DOCUMENT_TYPE_FIELD] = mapped;\n        }\n        else if (!KNOWN_CODES.has(documentType)) {\n            body[DOCUMENT_TYPE_FIELD] = \"2\";\n        }\n        logger.info(`DocumentType \"${documentType}\" -> \"${body[DOCUMENT_TYPE_FIELD]}\".`);\n        res.status(200).set(\"Content-Type\", \"application/json\").send(JSON.stringify(body));\n    }\n    catch (error) {\n        const message = error instanceof Error ? error.message : String(error);\n        logger.error(`Fehler: ${message}`);\n        res.status(500).set(\"Content-Type\", \"application/json\").send(JSON.stringify({ error: message }));\n    }\n};\nfunction parseBody(req) {\n    try {\n        const body = req.json?.();\n        return body && typeof body === \"object\" ? body : {};\n    }\n    catch {\n        return {};\n    }\n}\n\n\n/***/ }\n\n/******/ \t});\n/************************************************************************/\n/******/ \t// The module cache\n/******/ \tconst __webpack_module_cache__ = {};\n/******/ \t\n/******/ \t// The require function\n/******/ \tfunction __webpack_require__(moduleId) {\n/******/ \t\t// Check if module is in cache\n/******/ \t\tconst cachedModule = __webpack_module_cache__[moduleId];\n/******/ \t\tif (cachedModule !== undefined) {\n/******/ \t\t\treturn cachedModule.exports;\n/******/ \t\t}\n/******/ \t\t// Create a new module (and put it into the cache)\n/******/ \t\tconst module = __webpack_module_cache__[moduleId] = {\n/******/ \t\t\t// no module.id needed\n/******/ \t\t\t// no module.loaded needed\n/******/ \t\t\texports: {}\n/******/ \t\t};\n/******/ \t\n/******/ \t\t// Execute the module function\n/******/ \t\tif (!(moduleId in __webpack_modules__)) {\n/******/ \t\t\tdelete __webpack_module_cache__[moduleId];\n/******/ \t\t\tconst e = new Error(\"Cannot find module '\" + moduleId + \"'\");\n/******/ \t\t\te.code = 'MODULE_NOT_FOUND';\n/******/ \t\t\tthrow e;\n/******/ \t\t}\n/******/ \t\t__webpack_modules__[moduleId](module, module.exports, __webpack_require__);\n/******/ \t\n/******/ \t\t// Return the exports of the module\n/******/ \t\treturn module.exports;\n/******/ \t}\n/******/ \t\n/************************************************************************/\n/******/ \t\n/******/ \t// startup\n/******/ \t// Load entry module and return exports\n/******/ \t// This entry module is referenced by other modules so it can't be inlined\n/******/ \tlet __webpack_exports__ = __webpack_require__(\"./src/scripts/preExport.ts\");\n/******/ \tmodule.exports = __webpack_exports__;\n/******/ \t\n/******/ })()\n;\n//# sourceMappingURL=preExport.js.map";

/***/ },

/***/ "./src/data/Rechnungsleser Gutschriften verschieben_v1.bpmn?raw"
/*!**********************************************************************!*\
  !*** ./src/data/Rechnungsleser Gutschriften verschieben_v1.bpmn?raw ***!
  \**********************************************************************/
(module) {

module.exports = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\"?>\n<bpmn:definitions xmlns:bpmn=\"http://www.omg.org/spec/BPMN/20100524/MODEL\" xmlns:bpmndi=\"http://www.omg.org/spec/BPMN/20100524/DI\" xmlns:camunda=\"http://camunda.org/schema/1.0/bpmn\" xmlns:dc=\"http://www.omg.org/spec/DD/20100524/DC\" xmlns:di=\"http://www.omg.org/spec/DD/20100524/DI\" xmlns:modeler=\"http://camunda.org/schema/modeler/1.0\" exporter=\"d.velop process modeler\" exporterVersion=\"1.1.0\" expressionLanguage=\"http://www.w3.org/1999/XPath\" id=\"definitions_p-77b509e1-e27b-4696-8ea7-b1eb3875692e\" modeler:executionPlatform=\"Camunda Platform\" modeler:executionPlatformVersion=\"7.15.0\" targetNamespace=\"http://bpmn.io/schema/bpmn\" typeLanguage=\"http://www.w3.org/2001/XMLSchema\">\n    \n  <bpmn:process id=\"p-77b509e1-e27b-4696-8ea7-b1eb3875692e\" isClosed=\"false\" isExecutable=\"true\" name=\"Rechnungsleser Gutschriften verschieben\" processType=\"None\">\n        \n    <bpmn:extensionElements>\n            \n      <camunda:properties>\n                \n        <camunda:property name=\"service:/process/services/actions:in:actionId\" value=\"String\"/>\n                \n        <camunda:property name=\"service:/process/services/actions:in:executingUser\" value=\"Identity\"/>\n                \n        <camunda:property name=\"service:/process/services/actions:in:actionPayload\" value=\"InternalObject\"/>\n                \n        <camunda:property name=\"service:/process/services/actions:out:status\" value=\"Number\"/>\n                \n        <camunda:property name=\"service:/process/services/actions:out:actionOutput\" value=\"InternalObject\"/>\n                \n        <camunda:property name=\"variable:docId*\" value=\"String!\"/>\n              \n      </camunda:properties>\n          \n    </bpmn:extensionElements>\n        \n    <bpmn:startEvent id=\"StartEvent_1\" isInterrupting=\"true\" parallelMultiple=\"false\">\n            \n      <bpmn:extensionElements>\n                \n        <camunda:properties>\n                    \n          <camunda:property name=\"event:0\" value=\"eventbridge_dmspostimport\"/>\n                    \n          <camunda:property name=\"event:0:app\" value=\"eventbridge\"/>\n                    \n          <camunda:property name=\"event:0:name\" value=\"Ablage Gutschrift\"/>\n                    \n          <camunda:property name=\"start:action\" value=\"false\"/>\n                    \n          <camunda:property name=\"event:0:filter\" value=\"{&quot;and&quot;:[{&quot;==&quot;:[{&quot;var&quot;:&quot;doc.categoryId&quot;},&quot;fc3d3e6d-46f6-4fcd-84e3-db79e14b2751&quot;]},{&quot;==&quot;:[{&quot;var&quot;:&quot;doc.properties.717f4480-f16c-4838-96a3-f69a01eb41f1&quot;},&quot;Gutschrift&quot;]}]}\"/>\n                    \n          <camunda:property name=\"event:0:input:docId\" value=\"${input.getValue(&quot;$['doc']['id']&quot;)}\"/>\n                    \n          <camunda:property name=\"event:0:input:process.instance.businessKey\" value=\"${input.getValue(&quot;$['doc']['id']&quot;)}\"/>\n                  \n        </camunda:properties>\n              \n      </bpmn:extensionElements>\n            \n      <bpmn:outgoing>Flow_0abuizb</bpmn:outgoing>\n          \n    </bpmn:startEvent>\n        \n    <bpmn:endEvent id=\"Event_1fwwxqz\">\n            \n      <bpmn:incoming>Flow_1mc7kpw</bpmn:incoming>\n          \n    </bpmn:endEvent>\n        \n    <bpmn:sequenceFlow id=\"Flow_0abuizb\" sourceRef=\"StartEvent_1\" targetRef=\"Activity_1k6yh1s\"/>\n        \n    <bpmn:sequenceFlow id=\"Flow_1mc7kpw\" sourceRef=\"Activity_1k6yh1s\" targetRef=\"Event_1fwwxqz\"/>\n        \n    <bpmn:subProcess completionQuantity=\"1\" id=\"Activity_1k6yh1s\" isForCompensation=\"false\" name=\"Gutschriften verschieben\" startQuantity=\"1\" triggeredByEvent=\"false\">\n            \n      <bpmn:documentation textFormat=\"text/plain\">#action</bpmn:documentation>\n            \n      <bpmn:incoming>Flow_0abuizb</bpmn:incoming>\n            \n      <bpmn:outgoing>Flow_1mc7kpw</bpmn:outgoing>\n            \n      <bpmn:startEvent id=\"Activity_0qxarpb-StartEvent-0\" isInterrupting=\"true\" name=\"Gutschriften verschieben (Start)\" parallelMultiple=\"false\"/>\n            \n      <bpmn:sequenceFlow id=\"Activity_0qxarpb-SequenceFlow-0\" sourceRef=\"Activity_0qxarpb-StartEvent-0\" targetRef=\"Activity_0qxarpb-SendTask-0\"/>\n            \n      <bpmn:sendTask camunda:asyncBefore=\"true\" camunda:delegateExpression=\"${asyncService}\" completionQuantity=\"1\" id=\"Activity_0qxarpb-SendTask-0\" implementation=\"##WebService\" isForCompensation=\"false\" name=\"Gutschriften verschieben (Request)\" startQuantity=\"1\">\n                \n        <bpmn:extensionElements>\n                    \n          <camunda:inputOutput>\n                        \n            <camunda:inputParameter name=\"service.uri\">/process/services/actions</camunda:inputParameter>\n                        \n            <camunda:inputParameter name=\"actionId\">scripting_3fa4300f-97ba-4628-904d-e7353c2c2861-d5795100-1f19-46e1-8c7f-8888ec9ce5b6</camunda:inputParameter>\n                        \n            <camunda:inputParameter name=\"actionPayload[$.docId]\">${variables.get('docId')}</camunda:inputParameter>\n                      \n          </camunda:inputOutput>\n                  \n        </bpmn:extensionElements>\n              \n      </bpmn:sendTask>\n            \n      <bpmn:sequenceFlow id=\"Activity_0qxarpb-SequenceFlow-1\" sourceRef=\"Activity_0qxarpb-SendTask-0\" targetRef=\"Activity_0qxarpb-ReceiveTask-0\"/>\n            \n      <bpmn:receiveTask camunda:asyncAfter=\"true\" completionQuantity=\"1\" id=\"Activity_0qxarpb-ReceiveTask-0\" implementation=\"##WebService\" instantiate=\"false\" isForCompensation=\"false\" name=\"Gutschriften verschieben (Response)\" startQuantity=\"1\"/>\n            \n      <bpmn:sequenceFlow id=\"Activity_0qxarpb-SequenceFlow-2\" sourceRef=\"Activity_0qxarpb-ReceiveTask-0\" targetRef=\"Activity_0qxarpb-EndEvent-0\"/>\n            \n      <bpmn:endEvent id=\"Activity_0qxarpb-EndEvent-0\" name=\"Gutschriften verschieben (End)\"/>\n          \n    </bpmn:subProcess>\n      \n  </bpmn:process>\n    \n  <bpmndi:BPMNDiagram id=\"BPMNDiagram_1\">\n        \n    <bpmndi:BPMNPlane bpmnElement=\"p-77b509e1-e27b-4696-8ea7-b1eb3875692e\" id=\"BPMNPlane_1\">\n            \n      <bpmndi:BPMNShape bpmnElement=\"StartEvent_1\" id=\"_BPMNShape_StartEvent_2\">\n                \n        <dc:Bounds height=\"36\" width=\"36\" x=\"200\" y=\"100\"/>\n              \n      </bpmndi:BPMNShape>\n            \n      <bpmndi:BPMNShape bpmnElement=\"Event_1fwwxqz\" id=\"Event_1fwwxqz_di\">\n                \n        <dc:Bounds height=\"36\" width=\"36\" x=\"412\" y=\"100\"/>\n              \n      </bpmndi:BPMNShape>\n            \n      <bpmndi:BPMNShape bpmnElement=\"Activity_1k6yh1s\" id=\"Activity_0qxarpb_di\">\n                \n        <dc:Bounds height=\"80\" width=\"100\" x=\"270\" y=\"78\"/>\n                \n        <bpmndi:BPMNLabel/>\n              \n      </bpmndi:BPMNShape>\n            \n      <bpmndi:BPMNEdge bpmnElement=\"Flow_0abuizb\" id=\"Flow_0abuizb_di\">\n                \n        <di:waypoint x=\"236\" y=\"118\"/>\n                \n        <di:waypoint x=\"270\" y=\"118\"/>\n              \n      </bpmndi:BPMNEdge>\n            \n      <bpmndi:BPMNEdge bpmnElement=\"Flow_1mc7kpw\" id=\"Flow_1mc7kpw_di\">\n                \n        <di:waypoint x=\"370\" y=\"118\"/>\n                \n        <di:waypoint x=\"412\" y=\"118\"/>\n              \n      </bpmndi:BPMNEdge>\n          \n    </bpmndi:BPMNPlane>\n      \n  </bpmndi:BPMNDiagram>\n    \n  <bpmndi:BPMNDiagram id=\"BPMNDiagram_02nsx8j\">\n        \n    <bpmndi:BPMNPlane bpmnElement=\"Activity_1k6yh1s\" id=\"BPMNPlane_1ob96s9\"/>\n      \n  </bpmndi:BPMNDiagram>\n  \n</bpmn:definitions>";

/***/ },

/***/ "./src/data/sftpExportStylesheet.xsl?raw"
/*!***********************************************!*\
  !*** ./src/data/sftpExportStylesheet.xsl?raw ***!
  \***********************************************/
(module) {

module.exports = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<xsl:stylesheet xmlns:xsl=\"http://www.w3.org/1999/XSL/Transform\" version=\"2.0\"  xmlns:xs=\"http://www.w3.org/2001/XMLSchema\">\t\n  \n  <xsl:output method=\"text\"/>\n\t\n  <xsl:template match=\"/root\">\n  <xsl:for-each select=\"exportXML\">\n\t<xsl:value-of select=\"translate(translate(current(),'&lt;','&lt;'), '&gt;', '&gt;')\"/>\n   </xsl:for-each>\n   </xsl:template>\n </xsl:stylesheet>";

/***/ },

/***/ "./src/data/batchProfileMail.json"
/*!****************************************!*\
  !*** ./src/data/batchProfileMail.json ***!
  \****************************************/
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"name":"Frühes Scannen (Mail)","authorizedGroups":[{"id":"C7D335FA-C1A1-4BB3-80F6-A1A6415DAE27","displayName":"Alle"}],"authorizedBatchIdpElements":[{"id":"DA68014B-8FAF-48DA-904B-F8B360D0B803","displayName":"Ersteller*in des Stapels","elementType":0}],"errorNotificationRecipients":[{"id":"005B1D7A-0899-481F-9E61-DE43C90F1381","displayName":"Bereits berechtigte Gruppen und Personen","elementType":1}],"authorizedDeleteBatchIdpElements":[{"id":"DA68014B-8FAF-48DA-904B-F8B360D0B803","displayName":"Ersteller*in des Stapels","elementType":0},{"id":"005B1D7A-0899-481F-9E61-DE43C90F1381","displayName":"Bereits berechtigte Gruppen und Personen","elementType":1}],"importProfile":{"defaultCategoryId":null,"categoryRules":null},"mailBodyCategoryRule":{"ruleType":0,"active":false,"categoryId":"likeDefaultCategory"},"emailHandling":{"import":"3","placeBody":"0","importInlineAttachments":false},"properties":{"documentProperties":[],"batchProperties":[]},"exportProfile":{"primaryExportFile":"4","automatedExport":true,"exportSystemId":"classcon-documentreader-0189e289-edcc-48ae-974e-3edde2029063_ExportImportProcessAutomated","showExportSystemInstantly":false,"exportAdditionalAttachments":true},"allowPageEditing":true,"respectSignature":true,"guiRestrictions":{"addPagesAvailable":true,"deletePagesAvailable":true,"movePagesAvailable":true,"rotatePagesAvailable":true,"editDocumentsAvailable":true,"editDocumentPropertiesAvailable":true},"splittingProfile":{"active":true,"barcodeProfileId":null,"regEx":null,"removePage":false,"splittingMode":"2","maxPageCount":null,"regExForSplitting":null},"pageProcessing":{"barcodeRecognition":true,"textRecognition":true,"searchablePdf":true},"compression":{"active":false,"compression":"-1"},"documentProcessing":{"kiProcessing":true,"llmProcessing":false},"fileImportRules":{"type":0,"regExRules":[".*\\\\.exe$",".*\\\\.dll$",".*\\\\.msi$",".*\\\\.js$",".*\\\\.jar$",".*\\\\.ear$",".*\\\\.war$",".*\\\\.mpkg$",".*\\\\.php\\\\d?$",".*\\\\.sh$",".*\\\\.swf$",".*\\\\.pm$",".*\\\\.pl$",".*\\\\.ps1$",".*\\\\.com$",".*\\\\.bat$",".*\\\\.cmd$",".*\\\\.vbs$",".*\\\\.vbe$",".*\\\\.jse$",".*\\\\.wsf$",".*\\\\.wsh$",".*\\\\.msc$",".*\\\\.p7c$",".*\\\\.p7m$",".*\\\\.p7s$",".*\\\\.crt$",".*\\\\.der$",".*\\\\.cer$",".*\\\\.pem$",".*\\\\.ics$",".*\\\\.bin$",".*\\\\.vcf$"]},"newRegEx":null}');

/***/ },

/***/ "./src/data/batchProfileScan.json"
/*!****************************************!*\
  !*** ./src/data/batchProfileScan.json ***!
  \****************************************/
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"name":"Frühes Scannen (Scan)","authorizedGroups":[{"id":"C7D335FA-C1A1-4BB3-80F6-A1A6415DAE27","displayName":"Alle","elementType":1}],"authorizedBatchIdpElements":[{"id":"DA68014B-8FAF-48DA-904B-F8B360D0B803","displayName":"Ersteller*in des Stapels","elementType":0}],"errorNotificationRecipients":[{"id":"005B1D7A-0899-481F-9E61-DE43C90F1381","displayName":"Bereits berechtigte Gruppen und Personen","elementType":1}],"authorizedDeleteBatchIdpElements":[{"id":"DA68014B-8FAF-48DA-904B-F8B360D0B803","displayName":"Ersteller*in des Stapels","elementType":0},{"id":"005B1D7A-0899-481F-9E61-DE43C90F1381","displayName":"Bereits berechtigte Gruppen und Personen","elementType":1}],"importProfile":{"defaultCategoryId":null,"categoryRules":null},"mailBodyCategoryRule":{"ruleType":0,"active":false,"categoryId":"likeDefaultCategory"},"emailHandling":{"import":"3","placeBody":"0","importInlineAttachments":false},"properties":{"documentProperties":[],"batchProperties":[]},"exportProfile":{"primaryExportFile":"4","automatedExport":false,"exportSystemId":"classcon-documentreader-0189e289-edcc-48ae-974e-3edde2029063_ExportImportProcess","showExportSystemInstantly":false,"exportAdditionalAttachments":true},"allowPageEditing":true,"respectSignature":true,"guiRestrictions":{"addPagesAvailable":true,"deletePagesAvailable":true,"movePagesAvailable":true,"rotatePagesAvailable":true,"editDocumentsAvailable":true,"editDocumentPropertiesAvailable":true},"splittingProfile":{"active":true,"barcodeProfileId":null,"regEx":null,"removePage":false,"splittingMode":"0","maxPageCount":null,"regExForSplitting":null},"pageProcessing":{"barcodeRecognition":true,"textRecognition":true,"searchablePdf":true},"compression":{"active":false,"compression":"-1"},"documentProcessing":{"kiProcessing":true,"llmProcessing":false},"fileImportRules":{"type":0,"regExRules":[".*\\\\.exe$",".*\\\\.dll$",".*\\\\.msi$",".*\\\\.js$",".*\\\\.jar$",".*\\\\.ear$",".*\\\\.war$",".*\\\\.mpkg$",".*\\\\.php\\\\d?$",".*\\\\.sh$",".*\\\\.swf$",".*\\\\.pm$",".*\\\\.pl$",".*\\\\.ps1$",".*\\\\.com$",".*\\\\.bat$",".*\\\\.cmd$",".*\\\\.vbs$",".*\\\\.vbe$",".*\\\\.jse$",".*\\\\.wsf$",".*\\\\.wsh$",".*\\\\.msc$",".*\\\\.p7c$",".*\\\\.p7m$",".*\\\\.p7s$",".*\\\\.crt$",".*\\\\.der$",".*\\\\.cer$",".*\\\\.pem$",".*\\\\.ics$",".*\\\\.bin$",".*\\\\.vcf$"]},"newRegEx":null}');

/***/ },

/***/ "./src/data/webindexDesignerForm.json"
/*!********************************************!*\
  !*** ./src/data/webindexDesignerForm.json ***!
  \********************************************/
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"name":"classcon-documentreader","baseLayout":{"DocumentTypeID":"INV","CustomDuplicateCheck":{"QueryDefinition":"SELECT\\n  *\\nFROM\\n  CCLogAttributes AS att\\n  INNER JOIN CCLogDocuments AS doc ON att.DocumentID = doc.DocumentID\\nWHERE\\n  doc.SubscriptionID = @subscriptionID\\n  AND doc.ProcessSequenceID = @processSequenceID\\n  AND doc.Type = 0\\n  AND doc.Category_After = @vendorNumber\\n  AND att.DocumentID <> @documentID\\n  AND att.Attribute_Name = \'InvoiceNumber\'\\n  AND att.Attribute_After = @invoiceNumber","QueryMappings":[{"ColumnName":"@subscriptionID","AttributeID":"SubscriptionId"},{"ColumnName":"@processSequenceID","AttributeID":"ProcessSequenceId"},{"ColumnName":"@documentID","AttributeID":"DocumentUID"},{"ColumnName":"@invoiceNumber","AttributeID":"InvoiceNumber"},{"ColumnName":"@vendorNumber","AttributeID":"VENDOR_NUM"}],"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DateTargetFormats":[{"Code":"de","JSFormat":"DD.MM.YYYY","Format":"dd.MM.yyyy","Pattern":"^(0?[1-9]|[12][0-9]|3[01])[.](0?[1-9]|1[012])[.](\\\\d{4})$"},{"Code":"en-GB","JSFormat":"DD/MM/YYYY","Format":"dd/MM/yyyy","Pattern":"^(0?[1-9]|[12][0-9]|3[01])\\\\/(0?[1-9]|1[012])\\\\/(\\\\d{4})$"},{"Code":"en-US","JSFormat":"MM/DD/YYYY","Format":"MM/dd/yyyy","Pattern":"^(0?[1-9]|1[012])\\\\/(0?[1-9]|[12][0-9]|3[01])\\\\/(\\\\d{4})$"},{"Code":"en","JSFormat":"DD/MM/YYYY","Format":"dd/MM/yyyy","Pattern":"^(0?[1-9]|[12][0-9]|3[01])\\\\/(0?[1-9]|1[012])\\\\/(\\\\d{4})$"},{"Code":"fr","JSFormat":"DD/MM/YYYY","Format":"dd/MM/yyyy","Pattern":"^(0?[1-9]|[12][0-9]|3[01])\\\\/(0?[1-9]|1[012])\\\\/(\\\\d{4})$"},{"Code":"cs","JSFormat":"DD.MM.YYYY","Format":"dd.MM.yyyy","Pattern":"^(0?[1-9]|[12][0-9]|3[01])[.](0?[1-9]|1[012])[.](\\\\d{4})$"},{"Code":"da","JSFormat":"DD-MM-YYYY","Format":"dd-MM-yyyy","Pattern":"^(0?[1-9]|[12][0-9]|3[01])-(0?[1-9]|1[012])-(\\\\d{4})$"},{"Code":"es","JSFormat":"DD/MM/YYYY","Format":"dd/MM/yyyy","Pattern":"^(0?[1-9]|[12][0-9]|3[01])\\\\/(0?[1-9]|1[012])\\\\/(\\\\d{4})$"},{"Code":"hr","JSFormat":"DD.MM.YYYY","Format":"dd.MM.yyyy","Pattern":"^(0?[1-9]|[12][0-9]|3[01])[.](0?[1-9]|1[012])[.](\\\\d{4})$"},{"Code":"it","JSFormat":"DD/MM/YYYY","Format":"dd/MM/yyyy","Pattern":"^(0?[1-9]|[12][0-9]|3[01])\\\\/(0?[1-9]|1[012])\\\\/(\\\\d{4})$"},{"Code":"nl","JSFormat":"DD-MM-YYYY","Format":"dd-MM-yyyy","Pattern":"^(0?[1-9]|[12][0-9]|3[01])-(0?[1-9]|1[012])-(\\\\d{4})$"},{"Code":"pl","JSFormat":"DD.MM.YYYY","Format":"dd.MM.yyyy","Pattern":"^(0?[1-9]|[12][0-9]|3[01])[.](0?[1-9]|1[012])[.](\\\\d{4})$"},{"Code":"pt","JSFormat":"DD-MM-YYYY","Format":"dd-MM-yyyy","Pattern":"^(0?[1-9]|[12][0-9]|3[01])-(0?[1-9]|1[012])-(\\\\d{4})$"},{"Code":"sk","JSFormat":"DD.MM.YYYY","Format":"dd.MM.yyyy","Pattern":"^(0?[1-9]|[12][0-9]|3[01])[.](0?[1-9]|1[012])[.](\\\\d{4})$"},{"Code":"sr","JSFormat":"DD.MM.YYYY","Format":"dd.MM.yyyy","Pattern":"^(0?[1-9]|[12][0-9]|3[01])[.](0?[1-9]|1[012])[.](\\\\d{4})$"},{"Code":"zh","JSFormat":"YYYY-MM-DD","Format":"yyyy-MM-dd","Pattern":"^\\\\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])$"}],"FloatValueFormats":[{"Code":"de","ThousandDelimiter":"","DecimalPlacesDelimiter":",","Pattern":"^\\\\d+(,\\\\d+)?$"},{"Code":"en-GB","ThousandDelimiter":"","DecimalPlacesDelimiter":".","Pattern":"^\\\\d+(\\\\.\\\\d+)?$"},{"Code":"en-US","ThousandDelimiter":"","DecimalPlacesDelimiter":".","Pattern":"^\\\\d+(\\\\.\\\\d+)?$"},{"Code":"en","ThousandDelimiter":"","DecimalPlacesDelimiter":".","Pattern":"^\\\\d+(\\\\.\\\\d+)?$"},{"Code":"fr","ThousandDelimiter":"","DecimalPlacesDelimiter":",","Pattern":"^\\\\d+(,\\\\d+)?$"},{"Code":"cs","ThousandDelimiter":"","DecimalPlacesDelimiter":",","Pattern":"^\\\\d+(,\\\\d+)?$"},{"Code":"da","ThousandDelimiter":"","DecimalPlacesDelimiter":",","Pattern":"^\\\\d+(,\\\\d+)?$"},{"Code":"es","ThousandDelimiter":"","DecimalPlacesDelimiter":",","Pattern":"^\\\\d+(,\\\\d+)?$"},{"Code":"hr","ThousandDelimiter":"","DecimalPlacesDelimiter":",","Pattern":"^\\\\d+(,\\\\d+)?$"},{"Code":"it","ThousandDelimiter":"","DecimalPlacesDelimiter":",","Pattern":"^\\\\d+(,\\\\d+)?$"},{"Code":"nl","ThousandDelimiter":"","DecimalPlacesDelimiter":",","Pattern":"^\\\\d+(,\\\\d+)?$"},{"Code":"pl","ThousandDelimiter":"","DecimalPlacesDelimiter":",","Pattern":"^\\\\d+(,\\\\d+)?$"},{"Code":"pt","ThousandDelimiter":"","DecimalPlacesDelimiter":",","Pattern":"^\\\\d+(,\\\\d+)?$"},{"Code":"sk","ThousandDelimiter":"","DecimalPlacesDelimiter":",","Pattern":"^\\\\d+(,\\\\d+)?$"},{"Code":"sr","ThousandDelimiter":"","DecimalPlacesDelimiter":",","Pattern":"^\\\\d+(,\\\\d+)?$"},{"Code":"zh","ThousandDelimiter":"","DecimalPlacesDelimiter":".","Pattern":"^\\\\d+(\\\\.\\\\d+)?$"}],"AttributeTypeDefinitions":[{"AttributeTypeId":"VENDOR_NUM","AttributeTypeDescription":"Vendor Number","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"vendor.VENDOR_NUM","InboundAlias":null,"LoggingFlag":0,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":"basics.vendor clues"},{"AttributeTypeId":"InvoiceNumber","AttributeTypeDescription":"Invoice Number","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"invoicenumber","InboundAlias":null,"LoggingFlag":0,"InterpretAsMultipleValues":false,"ModelType":1,"TemplatePath":"vendor.[TEMPLATE_ID].invoicenumber"},{"AttributeTypeId":"InvoiceDate","AttributeTypeDescription":"Invoice Date","SemanticType":0,"ValueType":2,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"invoicedate.date","InboundAlias":null,"LoggingFlag":0,"InterpretAsMultipleValues":false,"ModelType":1,"TemplatePath":"vendor.[TEMPLATE_ID].invoicedate"},{"AttributeTypeId":"CostCenter","AttributeTypeDescription":"CostCenter","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":1,"DClassifyAlias":"costcenter","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"ImpersonalAccount","AttributeTypeDescription":"ImpersonalAccount","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":1,"DClassifyAlias":"impersonal-account","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"9e322012-3cc1-402d-9fd8-f64aad71fbf7","AttributeTypeDescription":"Barcode","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"3d6dd2a3-bfc6-4170-b7e5-8d347d449c35","AttributeTypeDescription":"Barcode3","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Notes","AttributeTypeDescription":"Notes","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"VENDOR_NAME","AttributeTypeDescription":"Vendor Name","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"vendor.VENDOR_NAME","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"VENDOR_CITY","AttributeTypeDescription":"Vendor City","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"vendor.VENDOR_CITY","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"VENDOR_STR","AttributeTypeDescription":"VendorStr","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"vendor.VENDOR_STR","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"VENDOR_ZIP_CODE","AttributeTypeDescription":"VendorZipCode","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"vendor.VENDOR_ZIP_CODE","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"VENDOR_VAT_REGISTRATION_ID","AttributeTypeDescription":"VendorVatID","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"vendor.VENDOR_VAT_REGISTRATION_ID","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"VENDOR_COUNTRY","AttributeTypeDescription":"Vendor Country","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"VENDOR_IBAN","AttributeTypeDescription":"VENDOR_IBAN","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"vendor.iban","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"DEBITOR_NUM","AttributeTypeDescription":"DebitorNum","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"company.COMPANY_NUM","InboundAlias":null,"LoggingFlag":0,"InterpretAsMultipleValues":false,"ModelType":2,"TemplatePath":"mandant"},{"AttributeTypeId":"NAME","AttributeTypeDescription":"DebitorName","SemanticType":1,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"company.NAME","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"CITY","AttributeTypeDescription":"DebitorCity","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"company.CITY","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"STR","AttributeTypeDescription":"DebitorStr","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"company.STR","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"COUNTRY","AttributeTypeDescription":"COUNTRY","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"company.COUNTRY","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"DEFAULT_CURRENCY","AttributeTypeDescription":"DEFAULT_CURRENCY","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"company.DEFAULT_CURRENCY","InboundAlias":null,"LoggingFlag":2,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"GrossAmount","AttributeTypeDescription":"GrossAmount","SemanticType":0,"ValueType":1,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"Betragsdaten.Bruttobetrag","InboundAlias":null,"LoggingFlag":0,"InterpretAsMultipleValues":false,"ModelType":1,"TemplatePath":"vendor.[TEMPLATE_ID].TrustedAmount"},{"AttributeTypeId":"NetAmount1","AttributeTypeDescription":"NetAmount1","SemanticType":0,"ValueType":1,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"Betragsdaten.Nettobetrag","InboundAlias":null,"LoggingFlag":0,"InterpretAsMultipleValues":false,"ModelType":1,"TemplatePath":"vendor.[TEMPLATE_ID].TrustedNet1"},{"AttributeTypeId":"VatAmount1","AttributeTypeDescription":"VatAmount1","SemanticType":0,"ValueType":1,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"Betragsdaten.Mehrwertsteuerbetrag","InboundAlias":null,"LoggingFlag":0,"InterpretAsMultipleValues":false,"ModelType":1,"TemplatePath":"vendor.[TEMPLATE_ID].TrustedVatAmount1"},{"AttributeTypeId":"VatRate1","AttributeTypeDescription":"VatRate1","SemanticType":0,"ValueType":1,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"Betragsdaten.Mehrwertsteuersatz","InboundAlias":null,"LoggingFlag":0,"InterpretAsMultipleValues":false,"ModelType":1,"TemplatePath":"vendor.[TEMPLATE_ID].TrustedVat1"},{"AttributeTypeId":"OrderNum","AttributeTypeDescription":"OrderNum","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"orders.ORDER_NUM","InboundAlias":null,"LoggingFlag":0,"InterpretAsMultipleValues":true,"ModelType":2,"TemplatePath":"basics.ordernumber"},{"AttributeTypeId":"ProjectNumber","AttributeTypeDescription":"ProjectNumber","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"ProjectNumber","InboundAlias":null,"LoggingFlag":0,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"ZIP","AttributeTypeDescription":"DebitorZip","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"company.ZIP","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"NetAmount2","AttributeTypeDescription":"NetAmount2","SemanticType":0,"ValueType":1,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"Betragsdaten.Nettobetrag2","InboundAlias":null,"LoggingFlag":0,"InterpretAsMultipleValues":false,"ModelType":1,"TemplatePath":"vendor.[TEMPLATE_ID].TrustedNet2"},{"AttributeTypeId":"VatAmount2","AttributeTypeDescription":"VatAmount2","SemanticType":0,"ValueType":1,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"Betragsdaten.Mehrwertsteuerbetrag2","InboundAlias":null,"LoggingFlag":0,"InterpretAsMultipleValues":false,"ModelType":1,"TemplatePath":"vendor.[TEMPLATE_ID].TrustedVatAmount2"},{"AttributeTypeId":"VatRate2","AttributeTypeDescription":"VatRate2","SemanticType":0,"ValueType":1,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"Betragsdaten.Mehrwertsteuersatz2","InboundAlias":null,"LoggingFlag":0,"InterpretAsMultipleValues":false,"ModelType":1,"TemplatePath":"vendor.[TEMPLATE_ID].TrustedVat2"},{"AttributeTypeId":"NetAmount3","AttributeTypeDescription":"NetAmount3","SemanticType":0,"ValueType":1,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":0,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"VatAmount3","AttributeTypeDescription":"VatAmount3","SemanticType":0,"ValueType":1,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":0,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"VatRate3","AttributeTypeDescription":"VatRate3","SemanticType":0,"ValueType":1,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":0,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"AdditionalCosts","AttributeTypeDescription":"AdditionalCosts","SemanticType":0,"ValueType":1,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"deliverycosts","InboundAlias":null,"LoggingFlag":0,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Discount","AttributeTypeDescription":"Discount","SemanticType":0,"ValueType":1,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":0,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Issuer","AttributeTypeDescription":"Issuer","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Advisor","AttributeTypeDescription":"Advisor","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Email","AttributeTypeDescription":"Email","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"TermOfPayment","AttributeTypeDescription":"TermOfPayment","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"GrossAmountCurrency","AttributeTypeDescription":"GrossAmountCurrency","SemanticType":0,"ValueType":5,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"currency","InboundAlias":null,"LoggingFlag":0,"InterpretAsMultipleValues":false,"ModelType":1,"TemplatePath":"vendor.[TEMPLATE_ID].currency"},{"AttributeTypeId":"DocumentType","AttributeTypeDescription":"DocumentType","SemanticType":0,"ValueType":5,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"documenttype","InboundAlias":null,"LoggingFlag":0,"InterpretAsMultipleValues":false,"ModelType":1,"TemplatePath":"vendor.[TEMPLATE_ID].Documenttype"},{"AttributeTypeId":"DocumentUID","AttributeTypeDescription":"DocumentUID","SemanticType":16,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"PerformanceDate","AttributeTypeDescription":"PerformanceDate","SemanticType":0,"ValueType":2,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"performancedate.date","InboundAlias":null,"LoggingFlag":0,"InterpretAsMultipleValues":false,"ModelType":1,"TemplatePath":"vendor.[TEMPLATE_ID].performancedate"},{"AttributeTypeId":"BookingDate","AttributeTypeDescription":"BookingDate","SemanticType":0,"ValueType":2,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"performancedate.date","InboundAlias":null,"LoggingFlag":0,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"VENDOR_REGISTRATION_ID","AttributeTypeDescription":"VENDOR_REGISTRATION_ID","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"vendor.VENDOR_REGISTRATION_ID","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"AutoRoutingFlag","AttributeTypeDescription":"AutoRoutingFlag","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"extended_vendor_settings.AutoRoutingFlag","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"QR-IBAN","AttributeTypeDescription":"QR-IBAN","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"QR-IBAN","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"QR-REFERENCE","AttributeTypeDescription":"QR-REFERENCE","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"QR-REFERENCE","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Custom1","AttributeTypeDescription":"Custom1","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"Custom1","InboundAlias":null,"LoggingFlag":2,"InterpretAsMultipleValues":false,"ModelType":2,"TemplatePath":"custom1"},{"AttributeTypeId":"Custom2","AttributeTypeDescription":"Custom2","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"Custom2","InboundAlias":null,"LoggingFlag":2,"InterpretAsMultipleValues":false,"ModelType":2,"TemplatePath":"custom2"},{"AttributeTypeId":"Custom3","AttributeTypeDescription":"Custom3","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"Custom3","InboundAlias":null,"LoggingFlag":2,"InterpretAsMultipleValues":false,"ModelType":1,"TemplatePath":"vendor.[TEMPLATE_ID].custom3"},{"AttributeTypeId":"Custom4","AttributeTypeDescription":"Custom4","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"Custom4","InboundAlias":null,"LoggingFlag":2,"InterpretAsMultipleValues":false,"ModelType":1,"TemplatePath":"vendor.[TEMPLATE_ID].custom4"},{"AttributeTypeId":"Custom5","AttributeTypeDescription":"Custom5","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"Custom5","InboundAlias":null,"LoggingFlag":2,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Custom6","AttributeTypeDescription":"Custom6","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"Custom6","InboundAlias":null,"LoggingFlag":2,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Custom7","AttributeTypeDescription":"Custom7","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"Custom7","InboundAlias":null,"LoggingFlag":2,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Custom8","AttributeTypeDescription":"Custom8","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"Custom8","InboundAlias":null,"LoggingFlag":2,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Custom9","AttributeTypeDescription":"Custom9","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"Custom9","InboundAlias":null,"LoggingFlag":2,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Custom10","AttributeTypeDescription":"Custom10","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"Custom10","InboundAlias":null,"LoggingFlag":2,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Custom11","AttributeTypeDescription":"Custom11","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":1,"DClassifyAlias":"Custom11","InboundAlias":null,"LoggingFlag":2,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Custom12","AttributeTypeDescription":"Custom12","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":1,"DClassifyAlias":"Custom12","InboundAlias":null,"LoggingFlag":2,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Custom13","AttributeTypeDescription":"Custom13","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":1,"DClassifyAlias":"Custom13","InboundAlias":null,"LoggingFlag":2,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Custom14","AttributeTypeDescription":"Custom14","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":1,"DClassifyAlias":"Custom14","InboundAlias":null,"LoggingFlag":2,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Custom15","AttributeTypeDescription":"Custom15","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":1,"DClassifyAlias":"Custom15","InboundAlias":null,"LoggingFlag":2,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Custom16","AttributeTypeDescription":"Custom16","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":1,"DClassifyAlias":"Custom16","InboundAlias":null,"LoggingFlag":2,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Custom17","AttributeTypeDescription":"Custom17","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":1,"DClassifyAlias":"Custom17","InboundAlias":null,"LoggingFlag":2,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Custom18","AttributeTypeDescription":"Custom18","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":1,"DClassifyAlias":"Custom18","InboundAlias":null,"LoggingFlag":2,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Custom19","AttributeTypeDescription":"Custom19","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":1,"DClassifyAlias":"Custom19","InboundAlias":null,"LoggingFlag":2,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Custom20","AttributeTypeDescription":"Custom20","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":1,"DClassifyAlias":"Custom20","InboundAlias":null,"LoggingFlag":2,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Inbound_creatorName","AttributeTypeDescription":"InboundCreatorName","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":1,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Inbound_importProcessname","AttributeTypeDescription":"InboundImportProcessname","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":1,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Inbound_importProcessId","AttributeTypeDescription":"InboundImportProcessId","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":1,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Inbound_importDateTime","AttributeTypeDescription":"InboundImportDateTime","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":1,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Inbound_documentName","AttributeTypeDescription":"InboundDocumentName","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":1,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Inbound_documentCategoryId","AttributeTypeDescription":"InboundDocumentCategoryId","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":1,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Inbound_documentCategoryName","AttributeTypeDescription":"InboundDocumentCategoryName","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":1,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"DocumentGUID","AttributeTypeDescription":"DocumentGUID","SemanticType":0,"ValueType":6,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":2,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"OriginalFileName","AttributeTypeDescription":"OriginalFileName","SemanticType":0,"ValueType":6,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"BatchCreator","AttributeTypeDescription":"BatchCreator","SemanticType":0,"ValueType":6,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"BatchEditor","AttributeTypeDescription":"BatchEditor","SemanticType":0,"ValueType":6,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"CH_QR_IBAN","AttributeTypeDescription":"CH_QR_IBAN","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"CH_QR_TYPE","AttributeTypeDescription":"CH_QR_TYPE","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"CH_QR_REFERENCE","AttributeTypeDescription":"CH_QR_REFERENCE","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"CH_QR_AMOUNT","AttributeTypeDescription":"CH_QR_AMOUNT","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"CH_QR_CURENCY","AttributeTypeDescription":"CH_QR_CURENCY","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"CH_QR_DESCR_MESSAGE","AttributeTypeDescription":"CH_QR_DESCR_MESSAGE","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"CH_QR_DESCR_INFO","AttributeTypeDescription":"CH_QR_DESCR_INFO","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"CH_QR_CODE","AttributeTypeDescription":"CH_QR_CODE","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"CH_ESR_LINE","AttributeTypeDescription":"CH_ESR_LINE","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"ESLine.ESCodezeile","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"$DocumentRole$","AttributeTypeDescription":"$DocumentRole$","SemanticType":19,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":1,"DClassifyAlias":"document-role","InboundAlias":null,"LoggingFlag":0,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null}],"AttributeTypeStructureDefinitions":[{"StructureName":"positions","Description":null,"DClassifyAlias":"Positionen","AttributeTypes":[{"AttributeTypeId":"Pos.OrderNum","AttributeTypeDescription":"Pos.OrderNum","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"ordernumber","InboundAlias":null,"LoggingFlag":0,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Pos.UPrice","AttributeTypeDescription":"Pos.UPrice","SemanticType":0,"ValueType":1,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"unitprice","InboundAlias":null,"LoggingFlag":0,"InterpretAsMultipleValues":false,"ModelType":1,"TemplatePath":"vendor.[TEMPLATE_ID].Positionstemplate.PosUPrice"},{"AttributeTypeId":"Pos.SPrice","AttributeTypeDescription":"Pos.SPrice","SemanticType":0,"ValueType":1,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"totalamount","InboundAlias":null,"LoggingFlag":0,"InterpretAsMultipleValues":false,"ModelType":1,"TemplatePath":"vendor.[TEMPLATE_ID].Positionstemplate.PosSPrice"},{"AttributeTypeId":"Pos.Quantity","AttributeTypeDescription":"Pos.Quantity","SemanticType":0,"ValueType":1,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"quantity","InboundAlias":null,"LoggingFlag":0,"InterpretAsMultipleValues":false,"ModelType":1,"TemplatePath":"vendor.[TEMPLATE_ID].Positionstemplate.PosQuantity"},{"AttributeTypeId":"Pos.OrderPos","AttributeTypeDescription":"Pos.OrderPos","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"order_item-number","InboundAlias":null,"LoggingFlag":0,"InterpretAsMultipleValues":false,"ModelType":1,"TemplatePath":"vendor.[TEMPLATE_ID].Positionstemplate.BestellPosnum"},{"AttributeTypeId":"Pos.DeliveryNote","AttributeTypeDescription":"Pos.DeliveryNote","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"delivery-number","InboundAlias":null,"LoggingFlag":0,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Pos.Article","AttributeTypeDescription":"Pos.Article","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"material-number","InboundAlias":null,"LoggingFlag":0,"InterpretAsMultipleValues":false,"ModelType":1,"TemplatePath":"vendor.[TEMPLATE_ID].Positionstemplate.MaterialNumber"},{"AttributeTypeId":"Pos.Description","AttributeTypeDescription":"Pos.Description","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"description","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":1,"TemplatePath":"vendor.[TEMPLATE_ID].Positionstemplate.Description"},{"AttributeTypeId":"Pos.CostCenter","AttributeTypeDescription":"Pos.CostCenter","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Pos.CostUnit","AttributeTypeDescription":"Pos.CostUnit","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Pos.GLAccount","AttributeTypeDescription":"Pos.GLAccount","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Pos.Custom1","AttributeTypeDescription":"Pos.Custom1","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"Pos.Custom1","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Pos.Custom2","AttributeTypeDescription":"Pos.Custom2","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"Pos.Custom2","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Pos.Custom3","AttributeTypeDescription":"Pos.Custom3","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"Pos.Custom3","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Pos.Custom4","AttributeTypeDescription":"Pos.Custom4","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"Pos.Custom4","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Pos.Custom5","AttributeTypeDescription":"Pos.Custom5","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"Pos.Custom5","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Pos.Custom6","AttributeTypeDescription":"Pos.Custom6","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"Pos.Custom6","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Pos.Custom7","AttributeTypeDescription":"Pos.Custom7","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"Pos.Custom7","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Pos.Custom8","AttributeTypeDescription":"Pos.Custom8","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"Pos.Custom8","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Pos.Custom9","AttributeTypeDescription":"Pos.Custom9","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"Pos.Custom9","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Pos.Custom10","AttributeTypeDescription":"Pos.Custom10","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"Pos.Custom10","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Pos.Custom11","AttributeTypeDescription":"Pos.Custom11","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"Pos.Custom11","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Pos.Custom12","AttributeTypeDescription":"Pos.Custom12","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"Pos.Custom12","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Pos.Custom13","AttributeTypeDescription":"Pos.Custom13","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"Pos.Custom13","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Pos.Custom14","AttributeTypeDescription":"Pos.Custom14","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"Pos.Custom14","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Pos.Custom15","AttributeTypeDescription":"Pos.Custom15","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"Pos.Custom15","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Pos.Custom16","AttributeTypeDescription":"Pos.Custom16","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"Pos.Custom16","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Pos.Custom17","AttributeTypeDescription":"Pos.Custom17","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"Pos.Custom17","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Pos.Custom18","AttributeTypeDescription":"Pos.Custom18","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"Pos.Custom18","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Pos.Custom19","AttributeTypeDescription":"Pos.Custom19","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"Pos.Custom19","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Pos.Custom20","AttributeTypeDescription":"Pos.Custom20","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"Pos.Custom20","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Pos.Zone","AttributeTypeDescription":"Pos.Zone","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":2,"InterpretAsMultipleValues":false,"ModelType":1,"TemplatePath":"vendor.[TEMPLATE_ID].Positionstemplate.PosZone"}]}],"AttributeGroups":[{"GroupID":0,"GroupDescription":"Client","MinifiedView":true,"AttributeDefinitions":[{"AttributeID":"DEBITOR_NUM","Description":"","LocalizedDescriptions":{},"AttributeLabel":null,"AttributeIcon":null,"AttributeType":0,"Required":true,"ReadOnly":false,"DoAlignStart":true,"DefaultValue":null,"Values":[],"ColumnSizePercent":0,"MinLength":0,"MaxLength":0,"SizeDesktop":3,"SizeTablet":3,"SizePhone":4,"Minified":{"SizeDesktop":3,"SizeTablet":3,"SizePhone":4},"Position":{"verticalPosition":0,"horizontalPosition":0},"TabStop":1,"ValueConversion":null,"Title":null,"Pattern":null,"QueryAttributes":[{"AttributeID":"DEBITOR_NUM","AttributeValue":null,"AttributeQueryPrefix":"%","AttributeQuerySuffix":"%","Prefix":false,"MultipleParameter":false}],"JSSnippets":[],"DataBaseDefinition":{"QueryDefinition":"SELECT\\n  COMPANY_NUM,\\n  NAME,\\n  STR,\\n  ZIP,\\n  CITY,\\n  COUNTRY,\\n  DEFAULT_CURRENCY\\nFROM\\n  dbo.CC_COMPANIES\\nWHERE\\n  COMPANY_NUM LIKE @DEBITOR_NUM","QueryMappings":[{"ColumnName":"COMPANY_NUM","AttributeID":"DEBITOR_NUM"},{"ColumnName":"NAME","AttributeID":"NAME"},{"ColumnName":"STR","AttributeID":"STR"},{"ColumnName":"ZIP","AttributeID":"ZIP"},{"ColumnName":"CITY","AttributeID":"CITY"},{"ColumnName":"COUNTRY","AttributeID":"COUNTRY"},{"ColumnName":"DEFAULT_CURRENCY","AttributeID":"DEFAULT_CURRENCY"}],"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":false},{"AttributeID":"NAME","Description":null,"LocalizedDescriptions":{},"AttributeLabel":null,"AttributeIcon":null,"AttributeType":0,"Required":false,"ReadOnly":false,"DoAlignStart":true,"DefaultValue":null,"Values":[],"ColumnSizePercent":0,"MinLength":0,"MaxLength":0,"SizeDesktop":9,"SizeTablet":5,"SizePhone":4,"Minified":{"SizeDesktop":9,"SizeTablet":5,"SizePhone":4},"Position":{"verticalPosition":0,"horizontalPosition":1},"TabStop":2,"ValueConversion":null,"Title":null,"Pattern":null,"QueryAttributes":[{"AttributeID":"NAME","AttributeValue":null,"AttributeQueryPrefix":"%","AttributeQuerySuffix":"%","Prefix":false,"MultipleParameter":false}],"JSSnippets":[],"DataBaseDefinition":{"QueryDefinition":"SELECT\\n  COMPANY_NUM,\\n  NAME,\\n  STR,\\n  ZIP,\\n  CITY,\\n  COUNTRY,\\n  DEFAULT_CURRENCY\\nFROM\\n  dbo.CC_COMPANIES\\nWHERE\\n  NAME LIKE @NAME","QueryMappings":[{"ColumnName":"COMPANY_NUM","AttributeID":"DEBITOR_NUM"},{"ColumnName":"NAME","AttributeID":"NAME"},{"ColumnName":"STR","AttributeID":"STR"},{"ColumnName":"ZIP","AttributeID":"ZIP"},{"ColumnName":"CITY","AttributeID":"CITY"},{"ColumnName":"COUNTRY","AttributeID":"COUNTRY"},{"ColumnName":"DEFAULT_CURRENCY","AttributeID":"DEFAULT_CURRENCY"}],"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":false},{"AttributeID":"STR","Description":null,"LocalizedDescriptions":{},"AttributeLabel":null,"AttributeIcon":null,"AttributeType":0,"Required":false,"ReadOnly":true,"DoAlignStart":true,"DefaultValue":null,"Values":[],"ColumnSizePercent":0,"MinLength":0,"MaxLength":0,"SizeDesktop":4,"SizeTablet":3,"SizePhone":4,"Minified":null,"Position":{"verticalPosition":1,"horizontalPosition":0},"TabStop":3,"ValueConversion":null,"Title":null,"Pattern":null,"QueryAttributes":[{"AttributeID":"STR","AttributeValue":null,"AttributeQueryPrefix":"%","AttributeQuerySuffix":"%","Prefix":false,"MultipleParameter":false}],"JSSnippets":[],"DataBaseDefinition":{"QueryDefinition":"SELECT\\n  COMPANY_NUM,\\n  NAME,\\n  STR,\\n  ZIP,\\n  CITY,\\n  COUNTRY,\\n  DEFAULT_CURRENCY\\nFROM\\n  dbo.CC_COMPANIES\\nWHERE\\n  STR LIKE @STR","QueryMappings":[{"ColumnName":"COMPANY_NUM","AttributeID":"DEBITOR_NUM"},{"ColumnName":"NAME","AttributeID":"NAME"},{"ColumnName":"STR","AttributeID":"STR"},{"ColumnName":"ZIP","AttributeID":"ZIP"},{"ColumnName":"CITY","AttributeID":"CITY"},{"ColumnName":"COUNTRY","AttributeID":"COUNTRY"},{"ColumnName":"DEFAULT_CURRENCY","AttributeID":"DEFAULT_CURRENCY"}],"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":false},{"AttributeID":"ZIP","Description":null,"LocalizedDescriptions":{},"AttributeLabel":null,"AttributeIcon":null,"AttributeType":0,"Required":false,"ReadOnly":true,"DoAlignStart":true,"DefaultValue":null,"Values":[],"ColumnSizePercent":0,"MinLength":0,"MaxLength":0,"SizeDesktop":4,"SizeTablet":2,"SizePhone":4,"Minified":null,"Position":{"verticalPosition":1,"horizontalPosition":1},"TabStop":4,"ValueConversion":null,"Title":null,"Pattern":null,"QueryAttributes":null,"JSSnippets":[],"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":false},{"AttributeID":"CITY","Description":null,"LocalizedDescriptions":{},"AttributeLabel":null,"AttributeIcon":null,"AttributeType":0,"Required":false,"ReadOnly":true,"DoAlignStart":true,"DefaultValue":null,"Values":[],"ColumnSizePercent":0,"MinLength":0,"MaxLength":0,"SizeDesktop":4,"SizeTablet":3,"SizePhone":4,"Minified":null,"Position":{"verticalPosition":1,"horizontalPosition":2},"TabStop":5,"ValueConversion":null,"Title":null,"Pattern":null,"QueryAttributes":[{"AttributeID":"CITY","AttributeValue":null,"AttributeQueryPrefix":"%","AttributeQuerySuffix":"%","Prefix":false,"MultipleParameter":false}],"JSSnippets":[],"DataBaseDefinition":{"QueryDefinition":"SELECT\\n  COMPANY_NUM,\\n  NAME,\\n  STR,\\n  ZIP,\\n  CITY,\\n  COUNTRY,\\n  DEFAULT_CURRENCY\\nFROM\\n  dbo.CC_COMPANIES\\nWHERE\\n  CITY LIKE @CITY","QueryMappings":[{"ColumnName":"COMPANY_NUM","AttributeID":"DEBITOR_NUM"},{"ColumnName":"NAME","AttributeID":"NAME"},{"ColumnName":"STR","AttributeID":"STR"},{"ColumnName":"ZIP","AttributeID":"ZIP"},{"ColumnName":"CITY","AttributeID":"CITY"},{"ColumnName":"COUNTRY","AttributeID":"COUNTRY"},{"ColumnName":"DEFAULT_CURRENCY","AttributeID":"DEFAULT_CURRENCY"}],"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":false}],"AttributeStructureDefinitions":[]},{"GroupID":1,"GroupDescription":"Sender","MinifiedView":true,"AttributeDefinitions":[{"AttributeID":"VENDOR_NUM","Description":null,"LocalizedDescriptions":{},"AttributeLabel":null,"AttributeIcon":null,"AttributeType":0,"Required":true,"ReadOnly":false,"DoAlignStart":true,"DefaultValue":null,"Values":[],"ColumnSizePercent":0,"MinLength":0,"MaxLength":0,"SizeDesktop":3,"SizeTablet":3,"SizePhone":4,"Minified":{"SizeDesktop":3,"SizeTablet":3,"SizePhone":4},"Position":{"verticalPosition":0,"horizontalPosition":0},"TabStop":6,"ValueConversion":null,"Title":null,"Pattern":null,"QueryAttributes":[{"AttributeID":"VENDOR_NUM","AttributeValue":null,"AttributeQueryPrefix":"%","AttributeQuerySuffix":"%","Prefix":false,"MultipleParameter":false},{"AttributeID":"DEBITOR_NUM","AttributeValue":null,"AttributeQueryPrefix":"","AttributeQuerySuffix":"","Prefix":false,"MultipleParameter":false}],"JSSnippets":[],"DataBaseDefinition":{"QueryDefinition":"SELECT\\n  ven.*,\\n  venb.*\\nFROM\\n  dbo.CC_VENDORS AS ven\\n  LEFT JOIN dbo.CC_VENDOR_BANK AS venb ON ven.VENDOR_NUM = venb.VENDOR_NUM\\n  AND ven.COMPANY_NUM = venb.COMPANY_NUM\\nWHERE\\n  ven.COMPANY_NUM = @DEBITOR_NUM\\n  AND ven.VENDOR_NUM LIKE @VENDOR_NUM","QueryMappings":[{"ColumnName":"VENDOR_NUM","AttributeID":"VENDOR_NUM"},{"ColumnName":"VENDOR_NAME","AttributeID":"VENDOR_NAME"},{"ColumnName":"VENDOR_STR","AttributeID":"VENDOR_STR"},{"ColumnName":"VENDOR_CITY","AttributeID":"VENDOR_CITY"},{"ColumnName":"VENDOR_ZIP_CODE","AttributeID":"VENDOR_ZIP_CODE"},{"ColumnName":"VENDOR_COUNTRY","AttributeID":"VENDOR_COUNTRY"},{"ColumnName":"VENDOR_EMAIL","AttributeID":"VENDOR_EMAIL"},{"ColumnName":"VENDOR_VAT_REGISTRATION_ID","AttributeID":"VENDOR_VAT_REGISTRATION_ID"},{"ColumnName":"VENDOR_REGISTRATION_ID","AttributeID":"VENDOR_REGISTRATION_ID"},{"ColumnName":"IBAN","AttributeID":"VENDOR_IBAN"}],"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":false},{"AttributeID":"VENDOR_NAME","Description":null,"LocalizedDescriptions":{},"AttributeLabel":null,"AttributeIcon":null,"AttributeType":0,"Required":true,"ReadOnly":false,"DoAlignStart":true,"DefaultValue":null,"Values":[],"ColumnSizePercent":0,"MinLength":0,"MaxLength":0,"SizeDesktop":9,"SizeTablet":5,"SizePhone":4,"Minified":{"SizeDesktop":9,"SizeTablet":5,"SizePhone":4},"Position":{"verticalPosition":0,"horizontalPosition":1},"TabStop":7,"ValueConversion":null,"Title":null,"Pattern":null,"QueryAttributes":[{"AttributeID":"VENDOR_NAME","AttributeValue":null,"AttributeQueryPrefix":"%","AttributeQuerySuffix":"%","Prefix":false,"MultipleParameter":false},{"AttributeID":"DEBITOR_NUM","AttributeValue":null,"AttributeQueryPrefix":"","AttributeQuerySuffix":"","Prefix":false,"MultipleParameter":false}],"JSSnippets":[],"DataBaseDefinition":{"QueryDefinition":"SELECT\\n  ven.*,\\n  venb.*\\nFROM\\n  dbo.CC_VENDORS AS ven\\n  LEFT JOIN dbo.CC_VENDOR_BANK AS venb ON ven.VENDOR_NUM = venb.VENDOR_NUM\\n  AND ven.COMPANY_NUM = venb.COMPANY_NUM\\nWHERE\\n  ven.COMPANY_NUM = @DEBITOR_NUM\\n  AND ven.VENDOR_NAME LIKE @VENDOR_NAME","QueryMappings":[{"ColumnName":"VENDOR_NUM","AttributeID":"VENDOR_NUM"},{"ColumnName":"VENDOR_NAME","AttributeID":"VENDOR_NAME"},{"ColumnName":"VENDOR_STR","AttributeID":"VENDOR_STR"},{"ColumnName":"VENDOR_CITY","AttributeID":"VENDOR_CITY"},{"ColumnName":"VENDOR_ZIP_CODE","AttributeID":"VENDOR_ZIP_CODE"},{"ColumnName":"VENDOR_COUNTRY","AttributeID":"VENDOR_COUNTRY"},{"ColumnName":"VENDOR_EMAIL","AttributeID":"VENDOR_EMAIL"},{"ColumnName":"VENDOR_VAT_REGISTRATION_ID","AttributeID":"VENDOR_VAT_REGISTRATION_ID"},{"ColumnName":"VENDOR_REGISTRATION_ID","AttributeID":"VENDOR_REGISTRATION_ID"},{"ColumnName":"IBAN","AttributeID":"VENDOR_IBAN"}],"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":false},{"AttributeID":"VENDOR_STR","Description":null,"LocalizedDescriptions":{},"AttributeLabel":null,"AttributeIcon":null,"AttributeType":0,"Required":false,"ReadOnly":true,"DoAlignStart":true,"DefaultValue":null,"Values":[],"ColumnSizePercent":0,"MinLength":0,"MaxLength":0,"SizeDesktop":4,"SizeTablet":3,"SizePhone":4,"Minified":null,"Position":{"verticalPosition":1,"horizontalPosition":0},"TabStop":8,"ValueConversion":null,"Title":null,"Pattern":null,"QueryAttributes":[{"AttributeID":"VENDOR_STR","AttributeValue":null,"AttributeQueryPrefix":"%","AttributeQuerySuffix":"%","Prefix":false,"MultipleParameter":false},{"AttributeID":"DEBITOR_NUM","AttributeValue":null,"AttributeQueryPrefix":"","AttributeQuerySuffix":"","Prefix":false,"MultipleParameter":false}],"JSSnippets":[],"DataBaseDefinition":{"QueryDefinition":"SELECT\\n  ven.*,\\n  venb.*\\nFROM\\n  dbo.CC_VENDORS AS ven\\n  LEFT JOIN dbo.CC_VENDOR_BANK AS venb ON ven.VENDOR_NUM = venb.VENDOR_NUM\\n  AND ven.COMPANY_NUM = venb.COMPANY_NUM\\nWHERE\\n  ven.COMPANY_NUM = @DEBITOR_NUM\\n  AND ven.VENDOR_STR LIKE @VENDOR_STR","QueryMappings":[{"ColumnName":"VENDOR_NUM","AttributeID":"VENDOR_NUM"},{"ColumnName":"VENDOR_NAME","AttributeID":"VENDOR_NAME"},{"ColumnName":"VENDOR_STR","AttributeID":"VENDOR_STR"},{"ColumnName":"VENDOR_CITY","AttributeID":"VENDOR_CITY"},{"ColumnName":"VENDOR_ZIP_CODE","AttributeID":"VENDOR_ZIP_CODE"},{"ColumnName":"VENDOR_COUNTRY","AttributeID":"VENDOR_COUNTRY"},{"ColumnName":"VENDOR_EMAIL","AttributeID":"VENDOR_EMAIL"},{"ColumnName":"VENDOR_VAT_REGISTRATION_ID","AttributeID":"VENDOR_VAT_REGISTRATION_ID"},{"ColumnName":"VENDOR_REGISTRATION_ID","AttributeID":"VENDOR_REGISTRATION_ID"},{"ColumnName":"IBAN","AttributeID":"VENDOR_IBAN"}],"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":false},{"AttributeID":"VENDOR_ZIP_CODE","Description":null,"LocalizedDescriptions":{},"AttributeLabel":null,"AttributeIcon":null,"AttributeType":0,"Required":false,"ReadOnly":true,"DoAlignStart":true,"DefaultValue":null,"Values":[],"ColumnSizePercent":0,"MinLength":0,"MaxLength":0,"SizeDesktop":4,"SizeTablet":2,"SizePhone":4,"Minified":null,"Position":{"verticalPosition":1,"horizontalPosition":1},"TabStop":9,"ValueConversion":null,"Title":null,"Pattern":null,"QueryAttributes":[{"AttributeID":"VENDOR_ZIP_CODE","AttributeValue":null,"AttributeQueryPrefix":"%","AttributeQuerySuffix":"%","Prefix":false,"MultipleParameter":false},{"AttributeID":"DEBITOR_NUM","AttributeValue":null,"AttributeQueryPrefix":"","AttributeQuerySuffix":"","Prefix":false,"MultipleParameter":false}],"JSSnippets":[],"DataBaseDefinition":{"QueryDefinition":"SELECT\\n  ven.*,\\n  venb.*\\nFROM\\n  dbo.CC_VENDORS AS ven\\n  LEFT JOIN dbo.CC_VENDOR_BANK AS venb ON ven.VENDOR_NUM = venb.VENDOR_NUM\\n  AND ven.COMPANY_NUM = venb.COMPANY_NUM\\nWHERE\\n  ven.COMPANY_NUM = @DEBITOR_NUM\\n  AND ven.VENDOR_ZIP_CODE LIKE @VENDOR_ZIP_CODE","QueryMappings":[{"ColumnName":"VENDOR_NUM","AttributeID":"VENDOR_NUM"},{"ColumnName":"VENDOR_NAME","AttributeID":"VENDOR_NAME"},{"ColumnName":"VENDOR_STR","AttributeID":"VENDOR_STR"},{"ColumnName":"VENDOR_CITY","AttributeID":"VENDOR_CITY"},{"ColumnName":"VENDOR_ZIP_CODE","AttributeID":"VENDOR_ZIP_CODE"},{"ColumnName":"VENDOR_COUNTRY","AttributeID":"VENDOR_COUNTRY"},{"ColumnName":"VENDOR_EMAIL","AttributeID":"VENDOR_EMAIL"},{"ColumnName":"VENDOR_VAT_REGISTRATION_ID","AttributeID":"VENDOR_VAT_REGISTRATION_ID"},{"ColumnName":"VENDOR_REGISTRATION_ID","AttributeID":"VENDOR_REGISTRATION_ID"},{"ColumnName":"IBAN","AttributeID":"VENDOR_IBAN"}],"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":false},{"AttributeID":"VENDOR_CITY","Description":null,"LocalizedDescriptions":{},"AttributeLabel":null,"AttributeIcon":null,"AttributeType":0,"Required":false,"ReadOnly":true,"DoAlignStart":true,"DefaultValue":null,"Values":[],"ColumnSizePercent":0,"MinLength":0,"MaxLength":0,"SizeDesktop":4,"SizeTablet":3,"SizePhone":4,"Minified":null,"Position":{"verticalPosition":1,"horizontalPosition":2},"TabStop":10,"ValueConversion":null,"Title":null,"Pattern":null,"QueryAttributes":[{"AttributeID":"VENDOR_CITY","AttributeValue":null,"AttributeQueryPrefix":"%","AttributeQuerySuffix":"%","Prefix":false,"MultipleParameter":false},{"AttributeID":"DEBITOR_NUM","AttributeValue":null,"AttributeQueryPrefix":"","AttributeQuerySuffix":"","Prefix":false,"MultipleParameter":false}],"JSSnippets":[],"DataBaseDefinition":{"QueryDefinition":"SELECT\\n  ven.*,\\n  venb.*\\nFROM\\n  dbo.CC_VENDORS AS ven\\n  LEFT JOIN dbo.CC_VENDOR_BANK AS venb ON ven.VENDOR_NUM = venb.VENDOR_NUM\\n  AND ven.COMPANY_NUM = venb.COMPANY_NUM\\nWHERE\\n  ven.COMPANY_NUM = @DEBITOR_NUM\\n  AND ven.VENDOR_CITY LIKE @VENDOR_CITY","QueryMappings":[{"ColumnName":"VENDOR_NUM","AttributeID":"VENDOR_NUM"},{"ColumnName":"VENDOR_NAME","AttributeID":"VENDOR_NAME"},{"ColumnName":"VENDOR_STR","AttributeID":"VENDOR_STR"},{"ColumnName":"VENDOR_CITY","AttributeID":"VENDOR_CITY"},{"ColumnName":"VENDOR_ZIP_CODE","AttributeID":"VENDOR_ZIP_CODE"},{"ColumnName":"VENDOR_COUNTRY","AttributeID":"VENDOR_COUNTRY"},{"ColumnName":"VENDOR_EMAIL","AttributeID":"VENDOR_EMAIL"},{"ColumnName":"VENDOR_VAT_REGISTRATION_ID","AttributeID":"VENDOR_VAT_REGISTRATION_ID"},{"ColumnName":"VENDOR_REGISTRATION_ID","AttributeID":"VENDOR_REGISTRATION_ID"},{"ColumnName":"IBAN","AttributeID":"VENDOR_IBAN"}],"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":false},{"AttributeID":"VENDOR_VAT_REGISTRATION_ID","Description":null,"LocalizedDescriptions":{},"AttributeLabel":null,"AttributeIcon":null,"AttributeType":0,"Required":false,"ReadOnly":false,"DoAlignStart":true,"DefaultValue":null,"Values":[],"ColumnSizePercent":0,"MinLength":0,"MaxLength":0,"SizeDesktop":3,"SizeTablet":2,"SizePhone":4,"Minified":null,"Position":{"verticalPosition":2,"horizontalPosition":0},"TabStop":11,"ValueConversion":null,"Title":null,"Pattern":null,"QueryAttributes":[{"AttributeID":"VENDOR_VAT_REGISTRATION_ID","AttributeValue":null,"AttributeQueryPrefix":"%","AttributeQuerySuffix":"%","Prefix":false,"MultipleParameter":false},{"AttributeID":"DEBITOR_NUM","AttributeValue":null,"AttributeQueryPrefix":"","AttributeQuerySuffix":"","Prefix":false,"MultipleParameter":false}],"JSSnippets":[],"DataBaseDefinition":{"QueryDefinition":"SELECT\\n  ven.*,\\n  venb.*\\nFROM\\n  dbo.CC_VENDORS AS ven\\n  LEFT JOIN dbo.CC_VENDOR_BANK AS venb ON ven.VENDOR_NUM = venb.VENDOR_NUM\\n  AND ven.COMPANY_NUM = venb.COMPANY_NUM\\nWHERE\\n  ven.COMPANY_NUM = @DEBITOR_NUM\\n  AND ven.VENDOR_VAT_REGISTRATION_ID LIKE @VENDOR_VAT_REGISTRATION_ID","QueryMappings":[{"ColumnName":"VENDOR_NUM","AttributeID":"VENDOR_NUM"},{"ColumnName":"VENDOR_NAME","AttributeID":"VENDOR_NAME"},{"ColumnName":"VENDOR_STR","AttributeID":"VENDOR_STR"},{"ColumnName":"VENDOR_CITY","AttributeID":"VENDOR_CITY"},{"ColumnName":"VENDOR_ZIP_CODE","AttributeID":"VENDOR_ZIP_CODE"},{"ColumnName":"VENDOR_COUNTRY","AttributeID":"VENDOR_COUNTRY"},{"ColumnName":"VENDOR_EMAIL","AttributeID":"VENDOR_EMAIL"},{"ColumnName":"VENDOR_VAT_REGISTRATION_ID","AttributeID":"VENDOR_VAT_REGISTRATION_ID"},{"ColumnName":"VENDOR_REGISTRATION_ID","AttributeID":"VENDOR_REGISTRATION_ID"},{"ColumnName":"IBAN","AttributeID":"VENDOR_IBAN"}],"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":false},{"AttributeID":"VENDOR_REGISTRATION_ID","Description":null,"LocalizedDescriptions":{},"AttributeLabel":null,"AttributeIcon":null,"AttributeType":0,"Required":false,"ReadOnly":false,"DoAlignStart":true,"DefaultValue":null,"Values":[],"ColumnSizePercent":0,"MinLength":0,"MaxLength":0,"SizeDesktop":3,"SizeTablet":2,"SizePhone":4,"Minified":null,"Position":{"verticalPosition":2,"horizontalPosition":1},"TabStop":12,"ValueConversion":null,"Title":null,"Pattern":null,"QueryAttributes":[{"AttributeID":"VENDOR_REGISTRATION_ID","AttributeValue":null,"AttributeQueryPrefix":"%","AttributeQuerySuffix":"%","Prefix":false,"MultipleParameter":false},{"AttributeID":"DEBITOR_NUM","AttributeValue":null,"AttributeQueryPrefix":"","AttributeQuerySuffix":"","Prefix":false,"MultipleParameter":false}],"JSSnippets":[],"DataBaseDefinition":{"QueryDefinition":"SELECT\\n  ven.*,\\n  venb.*\\nFROM\\n  dbo.CC_VENDORS AS ven\\n  LEFT JOIN dbo.CC_VENDOR_BANK AS venb ON ven.VENDOR_NUM = venb.VENDOR_NUM\\n  AND ven.COMPANY_NUM = venb.COMPANY_NUM\\nWHERE\\n  ven.COMPANY_NUM = @DEBITOR_NUM\\n  AND ven.VENDOR_REGISTRATION_ID LIKE @VENDOR_REGISTRATION_ID","QueryMappings":[{"ColumnName":"VENDOR_NUM","AttributeID":"VENDOR_NUM"},{"ColumnName":"VENDOR_NAME","AttributeID":"VENDOR_NAME"},{"ColumnName":"VENDOR_STR","AttributeID":"VENDOR_STR"},{"ColumnName":"VENDOR_CITY","AttributeID":"VENDOR_CITY"},{"ColumnName":"VENDOR_ZIP_CODE","AttributeID":"VENDOR_ZIP_CODE"},{"ColumnName":"VENDOR_COUNTRY","AttributeID":"VENDOR_COUNTRY"},{"ColumnName":"VENDOR_EMAIL","AttributeID":"VENDOR_EMAIL"},{"ColumnName":"VENDOR_VAT_REGISTRATION_ID","AttributeID":"VENDOR_VAT_REGISTRATION_ID"},{"ColumnName":"VENDOR_REGISTRATION_ID","AttributeID":"VENDOR_REGISTRATION_ID"},{"ColumnName":"IBAN","AttributeID":"VENDOR_IBAN"}],"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":false},{"AttributeID":"VENDOR_IBAN","Description":null,"LocalizedDescriptions":{},"AttributeLabel":null,"AttributeIcon":null,"AttributeType":0,"Required":false,"ReadOnly":false,"DoAlignStart":true,"DefaultValue":null,"Values":[],"ColumnSizePercent":0,"MinLength":0,"MaxLength":0,"SizeDesktop":6,"SizeTablet":4,"SizePhone":4,"Minified":null,"Position":{"verticalPosition":2,"horizontalPosition":2},"TabStop":13,"ValueConversion":null,"Title":null,"Pattern":null,"QueryAttributes":[{"AttributeID":"VENDOR_IBAN","AttributeValue":null,"AttributeQueryPrefix":"%","AttributeQuerySuffix":"%","Prefix":false,"MultipleParameter":false},{"AttributeID":"DEBITOR_NUM","AttributeValue":null,"AttributeQueryPrefix":"","AttributeQuerySuffix":"","Prefix":false,"MultipleParameter":false}],"JSSnippets":[],"DataBaseDefinition":{"QueryDefinition":"SELECT\\n  ven.*,\\n  venb.*\\nFROM\\n  dbo.CC_VENDORS AS ven\\n  LEFT JOIN dbo.CC_VENDOR_BANK AS venb ON ven.VENDOR_NUM = venb.VENDOR_NUM\\n  AND ven.COMPANY_NUM = venb.COMPANY_NUM\\nWHERE\\n  ven.COMPANY_NUM = @DEBITOR_NUM\\n  AND venb.IBAN LIKE @VENDOR_IBAN","QueryMappings":[{"ColumnName":"VENDOR_NUM","AttributeID":"VENDOR_NUM"},{"ColumnName":"VENDOR_NAME","AttributeID":"VENDOR_NAME"},{"ColumnName":"VENDOR_STR","AttributeID":"VENDOR_STR"},{"ColumnName":"VENDOR_CITY","AttributeID":"VENDOR_CITY"},{"ColumnName":"VENDOR_ZIP_CODE","AttributeID":"VENDOR_ZIP_CODE"},{"ColumnName":"VENDOR_COUNTRY","AttributeID":"VENDOR_COUNTRY"},{"ColumnName":"VENDOR_EMAIL","AttributeID":"VENDOR_EMAIL"},{"ColumnName":"VENDOR_VAT_REGISTRATION_ID","AttributeID":"VENDOR_VAT_REGISTRATION_ID"},{"ColumnName":"VENDOR_REGISTRATION_ID","AttributeID":"VENDOR_REGISTRATION_ID"},{"ColumnName":"IBAN","AttributeID":"VENDOR_IBAN"}],"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":false}],"AttributeStructureDefinitions":[]},{"GroupID":2,"GroupDescription":"InvoiceData","MinifiedView":false,"AttributeDefinitions":[{"AttributeID":"DocumentType","Description":null,"LocalizedDescriptions":{},"AttributeLabel":null,"AttributeIcon":null,"AttributeType":0,"Required":false,"ReadOnly":false,"DoAlignStart":true,"DefaultValue":"Invoice","Values":["Invoice","CreditAdvice","CorrectionOfInvoice"],"ColumnSizePercent":0,"MinLength":0,"MaxLength":0,"SizeDesktop":4,"SizeTablet":4,"SizePhone":4,"Minified":null,"Position":{"verticalPosition":0,"horizontalPosition":0},"TabStop":14,"ValueConversion":null,"Title":null,"Pattern":null,"QueryAttributes":null,"JSSnippets":[],"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":false},{"AttributeID":"InvoiceNumber","Description":null,"LocalizedDescriptions":{},"AttributeLabel":null,"AttributeIcon":null,"AttributeType":0,"Required":true,"ReadOnly":false,"DoAlignStart":true,"DefaultValue":null,"Values":[],"ColumnSizePercent":0,"MinLength":0,"MaxLength":0,"SizeDesktop":8,"SizeTablet":4,"SizePhone":4,"Minified":null,"Position":{"verticalPosition":0,"horizontalPosition":1},"TabStop":15,"ValueConversion":null,"Title":null,"Pattern":null,"QueryAttributes":null,"JSSnippets":[],"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":false},{"AttributeID":"InvoiceDate","Description":null,"LocalizedDescriptions":{},"AttributeLabel":null,"AttributeIcon":null,"AttributeType":0,"Required":true,"ReadOnly":false,"DoAlignStart":true,"DefaultValue":null,"Values":[],"ColumnSizePercent":0,"MinLength":0,"MaxLength":0,"SizeDesktop":6,"SizeTablet":4,"SizePhone":4,"Minified":null,"Position":{"verticalPosition":1,"horizontalPosition":0},"TabStop":16,"ValueConversion":"ConvertInputDate","Title":"dd.mm.YYYY","Pattern":"^(0?[1-9]|[12][0-9]|3[01])[.](0?[1-9]|1[012])[.](\\\\d{4})$","QueryAttributes":null,"JSSnippets":[{"OnMethod":"input","Code":" clearTimeout(typingInvoiceDateTimer); var element = $(this);  if (element.val()) { typingInvoiceDateTimer = setTimeout( function() { element.val(ConvertInputDate(element.val())); TriggerFieldValidation(element.attr(\'id\')); }, doneTypingInterval); }\\n "}],"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":false},{"AttributeID":"PerformanceDate","Description":null,"LocalizedDescriptions":{},"AttributeLabel":null,"AttributeIcon":null,"AttributeType":0,"Required":false,"ReadOnly":false,"DoAlignStart":true,"DefaultValue":null,"Values":[],"ColumnSizePercent":0,"MinLength":0,"MaxLength":0,"SizeDesktop":6,"SizeTablet":4,"SizePhone":4,"Minified":null,"Position":{"verticalPosition":1,"horizontalPosition":1},"TabStop":17,"ValueConversion":"ConvertInputDate","Title":"dd.mm.YYYY","Pattern":"^(0?[1-9]|[12][0-9]|3[01])[.](0?[1-9]|1[012])[.](\\\\d{4})$","QueryAttributes":null,"JSSnippets":[{"OnMethod":"input","Code":" clearTimeout(typingPerformanceDateTimer); var element = $(this);  if (element.val()) { typingPerformanceDateTimer = setTimeout( function() { element.val(ConvertInputDate(element.val())); TriggerFieldValidation(element.attr(\'id\')); }, doneTypingInterval); }\\n "}],"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":false},{"AttributeID":"NetAmount1","Description":null,"LocalizedDescriptions":{},"AttributeLabel":null,"AttributeIcon":null,"AttributeType":0,"Required":true,"ReadOnly":false,"DoAlignStart":false,"DefaultValue":"0.00","Values":[],"ColumnSizePercent":0,"MinLength":0,"MaxLength":0,"SizeDesktop":6,"SizeTablet":4,"SizePhone":4,"Minified":null,"Position":{"verticalPosition":2,"horizontalPosition":0},"TabStop":18,"ValueConversion":"ConvertInputFloatWithCustomDelimiter","Title":null,"Pattern":null,"QueryAttributes":null,"JSSnippets":[{"OnMethod":"input","Code":" ConvertInputFloatWithCustomDelimiterOnInput(this);\\n var netAmount1 = Number(GetAttribute(\\"NetAmount1\\"));\\n var vatRate1 = Number(GetAttribute(\\"VatRate1\\"))/100;\\n var vatAmount1 = netAmount1 * vatRate1;\\n SetAttribute(\\"VatAmount1\\", (Math.round((vatAmount1 + Number.EPSILON) * 100) / 100).toFixed(2));\\n\\n var netAmount2 = Number(GetAttribute(\\"NetAmount2\\"));\\n var vatRate2 = Number(GetAttribute(\\"VatRate2\\"))/100;\\n var grossAmount = netAmount1 * (1 + vatRate1) + netAmount2 * (1 + vatRate2);\\n SetAttribute(\\"GrossAmount\\", (Math.round((grossAmount + Number.EPSILON) * 100) / 100).toFixed(2));"}],"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":false},{"AttributeID":"NetAmount2","Description":null,"LocalizedDescriptions":{},"AttributeLabel":null,"AttributeIcon":null,"AttributeType":0,"Required":false,"ReadOnly":false,"DoAlignStart":false,"DefaultValue":"0.00","Values":[],"ColumnSizePercent":0,"MinLength":0,"MaxLength":0,"SizeDesktop":6,"SizeTablet":4,"SizePhone":4,"Minified":null,"Position":{"verticalPosition":2,"horizontalPosition":1},"TabStop":21,"ValueConversion":"ConvertInputFloatWithCustomDelimiter","Title":null,"Pattern":null,"QueryAttributes":null,"JSSnippets":[{"OnMethod":"input","Code":" ConvertInputFloatWithCustomDelimiterOnInput(this);\\n var netAmount1 = Number(GetAttribute(\\"NetAmount1\\"));\\n var vatRate1 = Number(GetAttribute(\\"VatRate1\\"))/100;\\n\\n var netAmount2 = Number(GetAttribute(\\"NetAmount2\\"));\\n var vatRate2 = Number(GetAttribute(\\"VatRate2\\"))/100;\\n var vatAmount2 = netAmount2 * vatRate2;\\n SetAttribute(\\"VatAmount2\\", (Math.round((vatAmount2 + Number.EPSILON) * 100) / 100).toFixed(2));\\n var grossAmount = netAmount1 * (1 + vatRate1) + netAmount2 * (1 + vatRate2);\\n SetAttribute(\\"GrossAmount\\", (Math.round((grossAmount + Number.EPSILON) * 100) / 100).toFixed(2));"}],"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":false},{"AttributeID":"VatRate1","Description":null,"LocalizedDescriptions":{},"AttributeLabel":null,"AttributeIcon":null,"AttributeType":0,"Required":false,"ReadOnly":false,"DoAlignStart":false,"DefaultValue":"0.00","Values":[],"ColumnSizePercent":0,"MinLength":0,"MaxLength":0,"SizeDesktop":6,"SizeTablet":4,"SizePhone":4,"Minified":null,"Position":{"verticalPosition":3,"horizontalPosition":0},"TabStop":19,"ValueConversion":"ConvertInputFloatWithCustomDelimiter","Title":null,"Pattern":null,"QueryAttributes":null,"JSSnippets":[{"OnMethod":"input","Code":" ConvertInputFloatWithCustomDelimiterOnInput(this);\\n var netAmount1 = Number(GetAttribute(\\"NetAmount1\\"));\\n var vatRate1 = Number(GetAttribute(\\"VatRate1\\"))/100;\\n var vatAmount1 = netAmount1 * vatRate1;\\n SetAttribute(\\"VatAmount1\\", (Math.round((vatAmount1 + Number.EPSILON) * 100) / 100).toFixed(2));\\n\\n var netAmount2 = Number(GetAttribute(\\"NetAmount2\\"));\\n var vatRate2 = Number(GetAttribute(\\"VatRate2\\"))/100;\\n var grossAmount = netAmount1 * (1 + vatRate1) + netAmount2 * (1 + vatRate2);\\n SetAttribute(\\"GrossAmount\\", (Math.round((grossAmount + Number.EPSILON) * 100) / 100).toFixed(2));"}],"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":false},{"AttributeID":"VatRate2","Description":null,"LocalizedDescriptions":{},"AttributeLabel":null,"AttributeIcon":null,"AttributeType":0,"Required":false,"ReadOnly":false,"DoAlignStart":false,"DefaultValue":"0.00","Values":[],"ColumnSizePercent":0,"MinLength":0,"MaxLength":0,"SizeDesktop":6,"SizeTablet":4,"SizePhone":4,"Minified":null,"Position":{"verticalPosition":3,"horizontalPosition":1},"TabStop":22,"ValueConversion":"ConvertInputFloatWithCustomDelimiter","Title":null,"Pattern":null,"QueryAttributes":null,"JSSnippets":[{"OnMethod":"input","Code":" ConvertInputFloatWithCustomDelimiterOnInput(this);\\n var netAmount1 = Number(GetAttribute(\\"NetAmount1\\"));\\n var vatRate1 = Number(GetAttribute(\\"VatRate1\\"))/100;\\n\\n var netAmount2 = Number(GetAttribute(\\"NetAmount2\\"));\\n var vatRate2 = Number(GetAttribute(\\"VatRate2\\"))/100;\\n var vatAmount2 = netAmount2 * vatRate2;\\n SetAttribute(\\"VatAmount2\\", (Math.round((vatAmount2 + Number.EPSILON) * 100) / 100).toFixed(2));\\n var grossAmount = netAmount1 * (1 + vatRate1) + netAmount2 * (1 + vatRate2);\\n SetAttribute(\\"GrossAmount\\", (Math.round((grossAmount + Number.EPSILON) * 100) / 100).toFixed(2));"}],"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":false},{"AttributeID":"VatAmount1","Description":null,"LocalizedDescriptions":{},"AttributeLabel":null,"AttributeIcon":null,"AttributeType":0,"Required":true,"ReadOnly":false,"DoAlignStart":false,"DefaultValue":"0.00","Values":[],"ColumnSizePercent":0,"MinLength":0,"MaxLength":0,"SizeDesktop":6,"SizeTablet":4,"SizePhone":4,"Minified":null,"Position":{"verticalPosition":4,"horizontalPosition":0},"TabStop":20,"ValueConversion":"ConvertInputFloatWithCustomDelimiter","Title":null,"Pattern":null,"QueryAttributes":null,"JSSnippets":[{"OnMethod":"input","Code":" ConvertInputFloatWithCustomDelimiterOnInput(this);\\n "}],"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":false},{"AttributeID":"VatAmount2","Description":null,"LocalizedDescriptions":{},"AttributeLabel":null,"AttributeIcon":null,"AttributeType":0,"Required":false,"ReadOnly":false,"DoAlignStart":false,"DefaultValue":"0.00","Values":[],"ColumnSizePercent":0,"MinLength":0,"MaxLength":0,"SizeDesktop":6,"SizeTablet":4,"SizePhone":4,"Minified":null,"Position":{"verticalPosition":4,"horizontalPosition":1},"TabStop":23,"ValueConversion":"ConvertInputFloatWithCustomDelimiter","Title":null,"Pattern":null,"QueryAttributes":null,"JSSnippets":[{"OnMethod":"input","Code":" ConvertInputFloatWithCustomDelimiterOnInput(this);\\n "}],"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":false},{"AttributeID":"AdditionalCosts","Description":null,"LocalizedDescriptions":{},"AttributeLabel":null,"AttributeIcon":null,"AttributeType":0,"Required":false,"ReadOnly":false,"DoAlignStart":false,"DefaultValue":"0.00","Values":[],"ColumnSizePercent":0,"MinLength":0,"MaxLength":0,"SizeDesktop":12,"SizeTablet":8,"SizePhone":4,"Minified":null,"Position":{"verticalPosition":5,"horizontalPosition":0},"TabStop":24,"ValueConversion":"ConvertInputFloatWithCustomDelimiter","Title":null,"Pattern":null,"QueryAttributes":null,"JSSnippets":[{"OnMethod":"input","Code":" ConvertInputFloatWithCustomDelimiterOnInput(this);\\n "}],"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":false},{"AttributeID":"GrossAmount","Description":null,"LocalizedDescriptions":{},"AttributeLabel":null,"AttributeIcon":null,"AttributeType":0,"Required":true,"ReadOnly":false,"DoAlignStart":false,"DefaultValue":"0.00","Values":[],"ColumnSizePercent":0,"MinLength":0,"MaxLength":0,"SizeDesktop":6,"SizeTablet":4,"SizePhone":4,"Minified":null,"Position":{"verticalPosition":6,"horizontalPosition":0},"TabStop":25,"ValueConversion":"ConvertInputFloatWithCustomDelimiter","Title":null,"Pattern":null,"QueryAttributes":null,"JSSnippets":[{"OnMethod":"input","Code":" ConvertInputFloatWithCustomDelimiterOnInput(this);\\n "}],"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":false},{"AttributeID":"GrossAmountCurrency","Description":null,"LocalizedDescriptions":{},"AttributeLabel":null,"AttributeIcon":null,"AttributeType":0,"Required":false,"ReadOnly":false,"DoAlignStart":true,"DefaultValue":null,"Values":["","AUD","CAD","CHF","CNY","CZK","DKK","EUR","GBP","HKD","INR","JPY","KRW","MYR","NOK","PLN","RUB","SAR","SEK","SGD","TWD","UAH","USD","ZAR"],"ColumnSizePercent":0,"MinLength":0,"MaxLength":0,"SizeDesktop":6,"SizeTablet":4,"SizePhone":4,"Minified":null,"Position":{"verticalPosition":6,"horizontalPosition":1},"TabStop":26,"ValueConversion":null,"Title":null,"Pattern":null,"QueryAttributes":null,"JSSnippets":[],"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":false},{"AttributeID":"OrderNum","Description":null,"LocalizedDescriptions":{},"AttributeLabel":null,"AttributeIcon":null,"AttributeType":0,"Required":false,"ReadOnly":false,"DoAlignStart":true,"DefaultValue":null,"Values":[],"ColumnSizePercent":0,"MinLength":0,"MaxLength":0,"SizeDesktop":12,"SizeTablet":8,"SizePhone":4,"Minified":null,"Position":{"verticalPosition":7,"horizontalPosition":0},"TabStop":27,"ValueConversion":null,"Title":null,"Pattern":null,"QueryAttributes":[{"AttributeID":"OrderNum","AttributeValue":null,"AttributeQueryPrefix":"%","AttributeQuerySuffix":"%","Prefix":false,"MultipleParameter":true},{"AttributeID":"DEBITOR_NUM","AttributeValue":null,"AttributeQueryPrefix":"","AttributeQuerySuffix":"","Prefix":false,"MultipleParameter":false},{"AttributeID":"VENDOR_NUM","AttributeValue":null,"AttributeQueryPrefix":"","AttributeQuerySuffix":"","Prefix":false,"MultipleParameter":false}],"JSSnippets":[],"DataBaseDefinition":{"QueryDefinition":"SELECT\\n  COMPANY_NUM,\\n  VENDOR_NUM,\\n  ORDER_NUM\\nFROM\\n  dbo.CC_ORDERS\\nWHERE\\n  COMPANY_NUM = @DEBITOR_NUM\\n  AND VENDOR_NUM = @VENDOR_NUM\\n  AND (ORDER_NUM LIKE @OrderNum)","QueryMappings":[{"ColumnName":"VENDOR_NUM","AttributeID":"VENDOR_NUM"},{"ColumnName":"COMPANY_NUM","AttributeID":"DEBITOR_NUM"},{"ColumnName":"ORDER_NUM","AttributeID":"OrderNum"}],"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":false}],"AttributeStructureDefinitions":[]}],"StructureGroups":[{"GroupID":0,"GroupDescription":"PositionData","MinifiedView":false,"AttributeDefinitions":[],"AttributeStructureDefinitions":[{"AttributeID":"positions","AttributeDefinitions":[{"AttributeID":"Pos.OrderNum","Description":null,"LocalizedDescriptions":{},"AttributeLabel":null,"AttributeIcon":null,"AttributeType":0,"Required":false,"ReadOnly":false,"DoAlignStart":true,"DefaultValue":null,"Values":[],"ColumnSizePercent":15,"MinLength":0,"MaxLength":0,"SizeDesktop":0,"SizeTablet":0,"SizePhone":0,"Minified":null,"Position":{"verticalPosition":0,"horizontalPosition":0},"TabStop":0,"ValueConversion":null,"Title":null,"Pattern":null,"QueryAttributes":[{"AttributeID":"Pos.OrderNum","AttributeValue":null,"AttributeQueryPrefix":"%","AttributeQuerySuffix":"%","Prefix":true,"MultipleParameter":false},{"AttributeID":"DEBITOR_NUM","AttributeValue":null,"AttributeQueryPrefix":"","AttributeQuerySuffix":"","Prefix":false,"MultipleParameter":false},{"AttributeID":"VENDOR_NUM","AttributeValue":null,"AttributeQueryPrefix":"","AttributeQuerySuffix":"","Prefix":false,"MultipleParameter":false}],"JSSnippets":[],"DataBaseDefinition":{"QueryDefinition":"SELECT\\n  ORL.ORDER_NUM,\\n  ORL.ORDER_POS,\\n  MATNR,\\n  VENDOR_MATNR,\\n  DESCRIPTION,\\n  UNIT_PRICE,\\n  ORL.QUANTITY,\\n  SUM_PRICE,\\n  PRICE_UNITS,\\n  UNITS,\\n  RECEIPT_NUM\\nFROM\\n  dbo.CC_ORDERLINES AS ORL\\n  INNER JOIN dbo.CC_ORDERS AS ORD ON ORL.ORDER_NUM = ORD.ORDER_NUM\\n  LEFT JOIN dbo.CC_RECEIPTS AS REC ON ORL.ORDER_NUM = REC.ORDER_NUM\\n  AND ORL.ORDER_POS = REC.ORDER_POS\\n  AND ORL.COMPANY_NUM = REC.COMPANY_NUM\\nWHERE\\n  ORL.COMPANY_NUM = @DEBITOR_NUM\\n  AND ORD.VENDOR_NUM = @VENDOR_NUM\\n  AND ORL.ORDER_NUM LIKE @PosOrderNum","QueryMappings":[{"ColumnName":"ORDER_NUM","AttributeID":"Pos.OrderNum"},{"ColumnName":"ORDER_POS","AttributeID":"Pos.OrderPos"},{"ColumnName":"MATNR","AttributeID":"Pos.Article"},{"ColumnName":"VENDOR_MATNR","AttributeID":"Pos.VENDOR_MATNR"},{"ColumnName":"DESCRIPTION","AttributeID":"Pos.Description"},{"ColumnName":"UNIT_PRICE","AttributeID":"Pos.UPrice"},{"ColumnName":"QUANTITY","AttributeID":"Pos.Quantity"},{"ColumnName":"SUM_PRICE","AttributeID":"Pos.SPrice"},{"ColumnName":"PRICE_UNITS","AttributeID":"Pos.PRICE_UNITS"},{"ColumnName":"UNITS","AttributeID":"Pos.UNITS"},{"ColumnName":"RECEIPT_NUM","AttributeID":"Pos.DeliveryNote"}],"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":false},{"AttributeID":"Pos.UPrice","Description":null,"LocalizedDescriptions":{},"AttributeLabel":null,"AttributeIcon":null,"AttributeType":0,"Required":true,"ReadOnly":false,"DoAlignStart":false,"DefaultValue":"0.00","Values":[],"ColumnSizePercent":10,"MinLength":0,"MaxLength":0,"SizeDesktop":0,"SizeTablet":0,"SizePhone":0,"Minified":null,"Position":{"verticalPosition":0,"horizontalPosition":0},"TabStop":0,"ValueConversion":"ConvertInputFloatWithCustomDelimiter","Title":null,"Pattern":null,"QueryAttributes":null,"JSSnippets":[{"OnMethod":"input","Code":" ConvertInputFloatWithCustomDelimiterOnInput(this);\\n var rowPrefixValues = this.id.split(\'___\');\\n var structureName = rowPrefixValues[0];\\n var rowIndex = rowPrefixValues[1];\\n var UPrice = Number(GetPositionAttribute(\'Pos.UPrice\', rowIndex, structureName));\\n var quantity = Number(GetPositionAttribute(\'Pos.Quantity\', rowIndex, structureName));\\n SetPositionAttribute(\'Pos.SPrice\', (Math.round(((UPrice * quantity) + Number.EPSILON) * 100) / 100).toFixed(2), rowIndex, structureName);"}],"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":false},{"AttributeID":"Pos.Quantity","Description":null,"LocalizedDescriptions":{},"AttributeLabel":null,"AttributeIcon":null,"AttributeType":0,"Required":true,"ReadOnly":false,"DoAlignStart":false,"DefaultValue":"0","Values":[],"ColumnSizePercent":10,"MinLength":0,"MaxLength":0,"SizeDesktop":0,"SizeTablet":0,"SizePhone":0,"Minified":null,"Position":{"verticalPosition":0,"horizontalPosition":0},"TabStop":0,"ValueConversion":"ConvertInputFloatWithCustomDelimiter","Title":null,"Pattern":null,"QueryAttributes":null,"JSSnippets":[{"OnMethod":"input","Code":" ConvertInputFloatWithCustomDelimiterOnInput(this);\\n var rowPrefixValues = this.id.split(\'___\');\\n var structureName = rowPrefixValues[0];\\n var rowIndex = rowPrefixValues[1];\\n var UPrice = Number(GetPositionAttribute(\'Pos.UPrice\', rowIndex, structureName));\\n var quantity = Number(GetPositionAttribute(\'Pos.Quantity\', rowIndex, structureName));\\n SetPositionAttribute(\'Pos.SPrice\', (Math.round(((UPrice * quantity) + Number.EPSILON) * 100) / 100).toFixed(2), rowIndex, structureName);"}],"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":false},{"AttributeID":"Pos.SPrice","Description":null,"LocalizedDescriptions":{},"AttributeLabel":null,"AttributeIcon":null,"AttributeType":0,"Required":true,"ReadOnly":false,"DoAlignStart":false,"DefaultValue":"0.00","Values":[],"ColumnSizePercent":10,"MinLength":0,"MaxLength":0,"SizeDesktop":0,"SizeTablet":0,"SizePhone":0,"Minified":null,"Position":{"verticalPosition":0,"horizontalPosition":0},"TabStop":0,"ValueConversion":"ConvertInputFloatWithCustomDelimiter","Title":null,"Pattern":null,"QueryAttributes":null,"JSSnippets":[{"OnMethod":"input","Code":" ConvertInputFloatWithCustomDelimiterOnInput(this);"}],"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":false},{"AttributeID":"Pos.OrderPos","Description":null,"LocalizedDescriptions":{},"AttributeLabel":null,"AttributeIcon":null,"AttributeType":0,"Required":false,"ReadOnly":false,"DoAlignStart":true,"DefaultValue":null,"Values":[],"ColumnSizePercent":10,"MinLength":0,"MaxLength":0,"SizeDesktop":0,"SizeTablet":0,"SizePhone":0,"Minified":null,"Position":{"verticalPosition":0,"horizontalPosition":0},"TabStop":0,"ValueConversion":null,"Title":null,"Pattern":null,"QueryAttributes":null,"JSSnippets":[],"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":false},{"AttributeID":"Pos.DeliveryNote","Description":null,"LocalizedDescriptions":{},"AttributeLabel":null,"AttributeIcon":null,"AttributeType":0,"Required":false,"ReadOnly":false,"DoAlignStart":true,"DefaultValue":null,"Values":[],"ColumnSizePercent":10,"MinLength":0,"MaxLength":0,"SizeDesktop":0,"SizeTablet":0,"SizePhone":0,"Minified":null,"Position":{"verticalPosition":0,"horizontalPosition":0},"TabStop":0,"ValueConversion":null,"Title":null,"Pattern":null,"QueryAttributes":null,"JSSnippets":[],"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":false},{"AttributeID":"Pos.Article","Description":null,"LocalizedDescriptions":{},"AttributeLabel":null,"AttributeIcon":null,"AttributeType":0,"Required":false,"ReadOnly":false,"DoAlignStart":true,"DefaultValue":null,"Values":[],"ColumnSizePercent":10,"MinLength":0,"MaxLength":0,"SizeDesktop":0,"SizeTablet":0,"SizePhone":0,"Minified":null,"Position":{"verticalPosition":0,"horizontalPosition":0},"TabStop":0,"ValueConversion":null,"Title":null,"Pattern":null,"QueryAttributes":null,"JSSnippets":[],"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":false},{"AttributeID":"Pos.Description","Description":null,"LocalizedDescriptions":{},"AttributeLabel":null,"AttributeIcon":null,"AttributeType":0,"Required":false,"ReadOnly":false,"DoAlignStart":true,"DefaultValue":null,"Values":[],"ColumnSizePercent":20,"MinLength":0,"MaxLength":0,"SizeDesktop":0,"SizeTablet":0,"SizePhone":0,"Minified":null,"Position":{"verticalPosition":0,"horizontalPosition":0},"TabStop":0,"ValueConversion":null,"Title":null,"Pattern":null,"QueryAttributes":null,"JSSnippets":[],"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":false},{"AttributeID":"ConfigColumn","Description":null,"LocalizedDescriptions":{},"AttributeLabel":null,"AttributeIcon":null,"AttributeType":0,"Required":false,"ReadOnly":false,"DoAlignStart":true,"DefaultValue":null,"Values":[],"ColumnSizePercent":5,"MinLength":0,"MaxLength":0,"SizeDesktop":0,"SizeTablet":0,"SizePhone":0,"Minified":null,"Position":{"verticalPosition":0,"horizontalPosition":0},"TabStop":0,"ValueConversion":null,"Title":null,"Pattern":null,"QueryAttributes":null,"JSSnippets":[],"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":false}],"JSSnippets":[]}]}],"JSSnippets":[],"TemplateDefinition":{"TemplateId":"VENDOR_NUM","TemplateName":"VENDOR_NAME"}},"layouts":[{"DocumentTypeID":"INV_Standard","CustomDuplicateCheck":{"QueryDefinition":"","QueryMappings":[],"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DateTargetFormats":[{"Code":"de","JSFormat":"DD.MM.YYYY","Format":"dd.MM.yyyy","Pattern":"^(0?[1-9]|[12][0-9]|3[01])[.](0?[1-9]|1[012])[.](\\\\d{4})$"},{"Code":"en-GB","JSFormat":"DD/MM/YYYY","Format":"dd/MM/yyyy","Pattern":"^(0?[1-9]|[12][0-9]|3[01])/(0?[1-9]|1[012])/(\\\\d{4})$"},{"Code":"en-US","JSFormat":"MM/DD/YYYY","Format":"MM/dd/yyyy","Pattern":"^(0?[1-9]|1[012])/(0?[1-9]|[12][0-9]|3[01])/(\\\\d{4})$"},{"Code":"en","JSFormat":"DD/MM/YYYY","Format":"dd/MM/yyyy","Pattern":"^(0?[1-9]|[12][0-9]|3[01])/(0?[1-9]|1[012])/(\\\\d{4})$"},{"Code":"fr","JSFormat":"DD/MM/YYYY","Format":"dd/MM/yyyy","Pattern":"^(0?[1-9]|[12][0-9]|3[01])/(0?[1-9]|1[012])/(\\\\d{4})$"},{"Code":"cs","JSFormat":"DD.MM.YYYY","Format":"dd.MM.yyyy","Pattern":"^(0?[1-9]|[12][0-9]|3[01])[.](0?[1-9]|1[012])[.](\\\\d{4})$"},{"Code":"da","JSFormat":"DD-MM-YYYY","Format":"dd-MM-yyyy","Pattern":"^(0?[1-9]|[12][0-9]|3[01])-(0?[1-9]|1[012])-(\\\\d{4})$"},{"Code":"es","JSFormat":"DD/MM/YYYY","Format":"dd/MM/yyyy","Pattern":"^(0?[1-9]|[12][0-9]|3[01])/(0?[1-9]|1[012])/(\\\\d{4})$"},{"Code":"hr","JSFormat":"DD.MM.YYYY","Format":"dd.MM.yyyy","Pattern":"^(0?[1-9]|[12][0-9]|3[01])[.](0?[1-9]|1[012])[.](\\\\d{4})$"},{"Code":"it","JSFormat":"DD/MM/YYYY","Format":"dd/MM/yyyy","Pattern":"^(0?[1-9]|[12][0-9]|3[01])/(0?[1-9]|1[012])/(\\\\d{4})$"},{"Code":"nl","JSFormat":"DD-MM-YYYY","Format":"dd-MM-yyyy","Pattern":"^(0?[1-9]|[12][0-9]|3[01])-(0?[1-9]|1[012])-(\\\\d{4})$"},{"Code":"pl","JSFormat":"DD.MM.YYYY","Format":"dd.MM.yyyy","Pattern":"^(0?[1-9]|[12][0-9]|3[01])[.](0?[1-9]|1[012])[.](\\\\d{4})$"},{"Code":"pt","JSFormat":"DD-MM-YYYY","Format":"dd-MM-yyyy","Pattern":"^(0?[1-9]|[12][0-9]|3[01])-(0?[1-9]|1[012])-(\\\\d{4})$"},{"Code":"sk","JSFormat":"DD.MM.YYYY","Format":"dd.MM.yyyy","Pattern":"^(0?[1-9]|[12][0-9]|3[01])[.](0?[1-9]|1[012])[.](\\\\d{4})$"},{"Code":"sr","JSFormat":"DD.MM.YYYY","Format":"dd.MM.yyyy","Pattern":"^(0?[1-9]|[12][0-9]|3[01])[.](0?[1-9]|1[012])[.](\\\\d{4})$"},{"Code":"zh","JSFormat":"YYYY-MM-DD","Format":"yyyy-MM-dd","Pattern":"^\\\\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])$"}],"FloatValueFormats":[{"Code":"de","ThousandDelimiter":"","DecimalPlacesDelimiter":",","Pattern":"^\\\\d+(,\\\\d+)?$"},{"Code":"en-GB","ThousandDelimiter":"","DecimalPlacesDelimiter":".","Pattern":"^\\\\d+(\\\\.\\\\d+)?$"},{"Code":"en-US","ThousandDelimiter":"","DecimalPlacesDelimiter":".","Pattern":"^\\\\d+(\\\\.\\\\d+)?$"},{"Code":"en","ThousandDelimiter":"","DecimalPlacesDelimiter":".","Pattern":"^\\\\d+(\\\\.\\\\d+)?$"},{"Code":"fr","ThousandDelimiter":"","DecimalPlacesDelimiter":",","Pattern":"^\\\\d+(,\\\\d+)?$"},{"Code":"cs","ThousandDelimiter":"","DecimalPlacesDelimiter":",","Pattern":"^\\\\d+(,\\\\d+)?$"},{"Code":"da","ThousandDelimiter":"","DecimalPlacesDelimiter":",","Pattern":"^\\\\d+(,\\\\d+)?$"},{"Code":"es","ThousandDelimiter":"","DecimalPlacesDelimiter":",","Pattern":"^\\\\d+(,\\\\d+)?$"},{"Code":"hr","ThousandDelimiter":"","DecimalPlacesDelimiter":",","Pattern":"^\\\\d+(,\\\\d+)?$"},{"Code":"it","ThousandDelimiter":"","DecimalPlacesDelimiter":",","Pattern":"^\\\\d+(,\\\\d+)?$"},{"Code":"nl","ThousandDelimiter":"","DecimalPlacesDelimiter":",","Pattern":"^\\\\d+(,\\\\d+)?$"},{"Code":"pl","ThousandDelimiter":"","DecimalPlacesDelimiter":",","Pattern":"^\\\\d+(,\\\\d+)?$"},{"Code":"pt","ThousandDelimiter":"","DecimalPlacesDelimiter":",","Pattern":"^\\\\d+(,\\\\d+)?$"},{"Code":"sk","ThousandDelimiter":"","DecimalPlacesDelimiter":",","Pattern":"^\\\\d+(,\\\\d+)?$"},{"Code":"sr","ThousandDelimiter":"","DecimalPlacesDelimiter":",","Pattern":"^\\\\d+(,\\\\d+)?$"},{"Code":"zh","ThousandDelimiter":"","DecimalPlacesDelimiter":".","Pattern":"^\\\\d+(\\\\.\\\\d+)?$"}],"AttributeTypeDefinitions":[{"AttributeTypeId":"VENDOR_NUM","AttributeTypeDescription":"Vendor Number","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"vendor.VENDOR_NUM","InboundAlias":null,"LoggingFlag":0,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":"basics.vendor clues"},{"AttributeTypeId":"InvoiceNumber","AttributeTypeDescription":"Invoice Number","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"invoicenumber","InboundAlias":null,"LoggingFlag":0,"InterpretAsMultipleValues":false,"ModelType":1,"TemplatePath":"vendor.[TEMPLATE_ID].invoicenumber"},{"AttributeTypeId":"InvoiceDate","AttributeTypeDescription":"Invoice Date","SemanticType":0,"ValueType":2,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"invoicedate.date","InboundAlias":null,"LoggingFlag":0,"InterpretAsMultipleValues":false,"ModelType":1,"TemplatePath":"vendor.[TEMPLATE_ID].invoicedate"},{"AttributeTypeId":"CostCenter","AttributeTypeDescription":"CostCenter","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":1,"DClassifyAlias":"costcenter","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"ImpersonalAccount","AttributeTypeDescription":"ImpersonalAccount","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":1,"DClassifyAlias":"impersonal-account","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"9e322012-3cc1-402d-9fd8-f64aad71fbf7","AttributeTypeDescription":"Barcode","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"3d6dd2a3-bfc6-4170-b7e5-8d347d449c35","AttributeTypeDescription":"Barcode3","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Notes","AttributeTypeDescription":"Notes","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"VENDOR_NAME","AttributeTypeDescription":"Vendor Name","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"vendor.VENDOR_NAME","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"VENDOR_CITY","AttributeTypeDescription":"Vendor City","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"vendor.VENDOR_CITY","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"VENDOR_STR","AttributeTypeDescription":"VendorStr","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"vendor.VENDOR_STR","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"VENDOR_ZIP_CODE","AttributeTypeDescription":"VendorZipCode","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"vendor.VENDOR_ZIP_CODE","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"VENDOR_VAT_REGISTRATION_ID","AttributeTypeDescription":"VendorVatID","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"vendor.VENDOR_VAT_REGISTRATION_ID","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"VENDOR_COUNTRY","AttributeTypeDescription":"Vendor Country","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"VENDOR_IBAN","AttributeTypeDescription":"VENDOR_IBAN","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"vendor.iban","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"DEBITOR_NUM","AttributeTypeDescription":"DebitorNum","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"company.COMPANY_NUM","InboundAlias":null,"LoggingFlag":0,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"NAME","AttributeTypeDescription":"DebitorName","SemanticType":1,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":"SELECT COMPANY_NUM, NAME, STR, ZIP, CITY, COUNTRY, DEFAULT_CURRENCY FROM dbo.CC_COMPANIES WHERE NAME LIKE @NAME","QueryMappings":[{"ColumnName":"COMPANY_NUM","AttributeID":"DEBITOR_NUM"},{"ColumnName":"NAME","AttributeID":"NAME"},{"ColumnName":"STR","AttributeID":"STR"},{"ColumnName":"ZIP","AttributeID":"ZIP"},{"ColumnName":"CITY","AttributeID":"CITY"},{"ColumnName":"COUNTRY","AttributeID":"COUNTRY"},{"ColumnName":"DEFAULT_CURRENCY","AttributeID":"DEFAULT_CURRENCY"}],"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"company.NAME","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"CITY","AttributeTypeDescription":"DebitorCity","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"company.CITY","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"STR","AttributeTypeDescription":"DebitorStr","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"company.STR","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"COUNTRY","AttributeTypeDescription":"COUNTRY","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"company.COUNTRY","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"DEFAULT_CURRENCY","AttributeTypeDescription":"DEFAULT_CURRENCY","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"company.DEFAULT_CURRENCY","InboundAlias":null,"LoggingFlag":2,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"GrossAmount","AttributeTypeDescription":"GrossAmount","SemanticType":0,"ValueType":1,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"Betragsdaten.Bruttobetrag","InboundAlias":null,"LoggingFlag":0,"InterpretAsMultipleValues":false,"ModelType":1,"TemplatePath":"vendor.[TEMPLATE_ID].TrustedAmount"},{"AttributeTypeId":"NetAmount1","AttributeTypeDescription":"NetAmount1","SemanticType":0,"ValueType":1,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"Betragsdaten.Nettobetrag","InboundAlias":null,"LoggingFlag":0,"InterpretAsMultipleValues":false,"ModelType":1,"TemplatePath":"vendor.[TEMPLATE_ID].TrustedNet1"},{"AttributeTypeId":"VatAmount1","AttributeTypeDescription":"VatAmount1","SemanticType":0,"ValueType":1,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"Betragsdaten.Mehrwertsteuerbetrag","InboundAlias":null,"LoggingFlag":0,"InterpretAsMultipleValues":false,"ModelType":1,"TemplatePath":"vendor.[TEMPLATE_ID].TrustedVatAmount1"},{"AttributeTypeId":"VatRate1","AttributeTypeDescription":"VatRate1","SemanticType":0,"ValueType":1,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"Betragsdaten.Mehrwertsteuersatz","InboundAlias":null,"LoggingFlag":0,"InterpretAsMultipleValues":false,"ModelType":1,"TemplatePath":"vendor.[TEMPLATE_ID].TrustedVat1"},{"AttributeTypeId":"OrderNum","AttributeTypeDescription":"OrderNum","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"orders.ORDER_NUM","InboundAlias":null,"LoggingFlag":0,"InterpretAsMultipleValues":true,"ModelType":2,"TemplatePath":"basics.ordernumber"},{"AttributeTypeId":"ProjectNumber","AttributeTypeDescription":"ProjectNumber","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"ProjectNumber","InboundAlias":null,"LoggingFlag":0,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"ZIP","AttributeTypeDescription":"DebitorZip","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"company.ZIP","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"NetAmount2","AttributeTypeDescription":"NetAmount2","SemanticType":0,"ValueType":1,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"Betragsdaten.Nettobetrag2","InboundAlias":null,"LoggingFlag":0,"InterpretAsMultipleValues":false,"ModelType":1,"TemplatePath":"vendor.[TEMPLATE_ID].TrustedNet2"},{"AttributeTypeId":"VatAmount2","AttributeTypeDescription":"VatAmount2","SemanticType":0,"ValueType":1,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"Betragsdaten.Mehrwertsteuerbetrag2","InboundAlias":null,"LoggingFlag":0,"InterpretAsMultipleValues":false,"ModelType":1,"TemplatePath":"vendor.[TEMPLATE_ID].TrustedVatAmount2"},{"AttributeTypeId":"VatRate2","AttributeTypeDescription":"VatRate2","SemanticType":0,"ValueType":1,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"Betragsdaten.Mehrwertsteuersatz2","InboundAlias":null,"LoggingFlag":0,"InterpretAsMultipleValues":false,"ModelType":1,"TemplatePath":"vendor.[TEMPLATE_ID].TrustedVat2"},{"AttributeTypeId":"NetAmount3","AttributeTypeDescription":"NetAmount3","SemanticType":0,"ValueType":1,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":0,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"VatAmount3","AttributeTypeDescription":"VatAmount3","SemanticType":0,"ValueType":1,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":0,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"VatRate3","AttributeTypeDescription":"VatRate3","SemanticType":0,"ValueType":1,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":0,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"AdditionalCosts","AttributeTypeDescription":"AdditionalCosts","SemanticType":0,"ValueType":1,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"deliverycosts","InboundAlias":null,"LoggingFlag":0,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Discount","AttributeTypeDescription":"Discount","SemanticType":0,"ValueType":1,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":0,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Issuer","AttributeTypeDescription":"Issuer","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Advisor","AttributeTypeDescription":"Advisor","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Email","AttributeTypeDescription":"Email","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"TermOfPayment","AttributeTypeDescription":"TermOfPayment","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"GrossAmountCurrency","AttributeTypeDescription":"GrossAmountCurrency","SemanticType":0,"ValueType":5,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"currency","InboundAlias":null,"LoggingFlag":0,"InterpretAsMultipleValues":false,"ModelType":1,"TemplatePath":"vendor.[TEMPLATE_ID].currency"},{"AttributeTypeId":"DocumentType","AttributeTypeDescription":"DocumentType","SemanticType":0,"ValueType":5,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"documenttype","InboundAlias":null,"LoggingFlag":0,"InterpretAsMultipleValues":false,"ModelType":1,"TemplatePath":"vendor.[TEMPLATE_ID].Documenttype"},{"AttributeTypeId":"DocumentUID","AttributeTypeDescription":"DocumentUID","SemanticType":16,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"PerformanceDate","AttributeTypeDescription":"PerformanceDate","SemanticType":0,"ValueType":2,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"performancedate.date","InboundAlias":null,"LoggingFlag":0,"InterpretAsMultipleValues":false,"ModelType":1,"TemplatePath":"vendor.[TEMPLATE_ID].performancedate"},{"AttributeTypeId":"BookingDate","AttributeTypeDescription":"BookingDate","SemanticType":0,"ValueType":2,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"performancedate.date","InboundAlias":null,"LoggingFlag":0,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"VENDOR_REGISTRATION_ID","AttributeTypeDescription":"VENDOR_REGISTRATION_ID","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"vendor.VENDOR_REGISTRATION_ID","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"AutoRoutingFlag","AttributeTypeDescription":"AutoRoutingFlag","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"extended_vendor_settings.AutoRoutingFlag","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"QR-IBAN","AttributeTypeDescription":"QR-IBAN","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"QR-IBAN","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"QR-REFERENCE","AttributeTypeDescription":"QR-REFERENCE","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"QR-REFERENCE","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Custom1","AttributeTypeDescription":"Custom1","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"Custom1","InboundAlias":null,"LoggingFlag":2,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Custom2","AttributeTypeDescription":"Custom2","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"Custom2","InboundAlias":null,"LoggingFlag":2,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Custom3","AttributeTypeDescription":"Custom3","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"Custom3","InboundAlias":null,"LoggingFlag":2,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Custom4","AttributeTypeDescription":"Custom4","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"Custom4","InboundAlias":null,"LoggingFlag":2,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Custom5","AttributeTypeDescription":"Custom5","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"Custom5","InboundAlias":null,"LoggingFlag":2,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Custom6","AttributeTypeDescription":"Custom6","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"Custom6","InboundAlias":null,"LoggingFlag":2,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Custom7","AttributeTypeDescription":"Custom7","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"Custom7","InboundAlias":null,"LoggingFlag":2,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Custom8","AttributeTypeDescription":"Custom8","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"Custom8","InboundAlias":null,"LoggingFlag":2,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Custom9","AttributeTypeDescription":"Custom9","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"Custom9","InboundAlias":null,"LoggingFlag":2,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Custom10","AttributeTypeDescription":"Custom10","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"Custom10","InboundAlias":null,"LoggingFlag":2,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Custom11","AttributeTypeDescription":"Custom11","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":1,"DClassifyAlias":"Custom11","InboundAlias":null,"LoggingFlag":2,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Custom12","AttributeTypeDescription":"Custom12","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":1,"DClassifyAlias":"Custom12","InboundAlias":null,"LoggingFlag":2,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Custom13","AttributeTypeDescription":"Custom13","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":1,"DClassifyAlias":"Custom13","InboundAlias":null,"LoggingFlag":2,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Custom14","AttributeTypeDescription":"Custom14","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":1,"DClassifyAlias":"Custom14","InboundAlias":null,"LoggingFlag":2,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Custom15","AttributeTypeDescription":"Custom15","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":1,"DClassifyAlias":"Custom15","InboundAlias":null,"LoggingFlag":2,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Custom16","AttributeTypeDescription":"Custom16","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":1,"DClassifyAlias":"Custom16","InboundAlias":null,"LoggingFlag":2,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Custom17","AttributeTypeDescription":"Custom17","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":1,"DClassifyAlias":"Custom17","InboundAlias":null,"LoggingFlag":2,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Custom18","AttributeTypeDescription":"Custom18","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":1,"DClassifyAlias":"Custom18","InboundAlias":null,"LoggingFlag":2,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Custom19","AttributeTypeDescription":"Custom19","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":1,"DClassifyAlias":"Custom19","InboundAlias":null,"LoggingFlag":2,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Custom20","AttributeTypeDescription":"Custom20","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":1,"DClassifyAlias":"Custom20","InboundAlias":null,"LoggingFlag":2,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Inbound_creatorName","AttributeTypeDescription":"InboundCreatorName","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":1,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Inbound_importProcessname","AttributeTypeDescription":"InboundImportProcessname","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":1,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Inbound_importProcessId","AttributeTypeDescription":"InboundImportProcessId","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":1,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Inbound_importDateTime","AttributeTypeDescription":"InboundImportDateTime","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":1,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Inbound_documentName","AttributeTypeDescription":"InboundDocumentName","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":1,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Inbound_documentCategoryId","AttributeTypeDescription":"InboundDocumentCategoryId","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":1,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Inbound_documentCategoryName","AttributeTypeDescription":"InboundDocumentCategoryName","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":1,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"DocumentGUID","AttributeTypeDescription":"DocumentGUID","SemanticType":0,"ValueType":6,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":2,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"OriginalFileName","AttributeTypeDescription":"OriginalFileName","SemanticType":0,"ValueType":6,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"BatchCreator","AttributeTypeDescription":"BatchCreator","SemanticType":0,"ValueType":6,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"BatchEditor","AttributeTypeDescription":"BatchEditor","SemanticType":0,"ValueType":6,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"CH_QR_IBAN","AttributeTypeDescription":"CH_QR_IBAN","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"CH_QR_TYPE","AttributeTypeDescription":"CH_QR_TYPE","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"CH_QR_REFERENCE","AttributeTypeDescription":"CH_QR_REFERENCE","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"CH_QR_AMOUNT","AttributeTypeDescription":"CH_QR_AMOUNT","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"CH_QR_CURENCY","AttributeTypeDescription":"CH_QR_CURENCY","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"CH_QR_DESCR_MESSAGE","AttributeTypeDescription":"CH_QR_DESCR_MESSAGE","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"CH_QR_DESCR_INFO","AttributeTypeDescription":"CH_QR_DESCR_INFO","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"CH_QR_CODE","AttributeTypeDescription":"CH_QR_CODE","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"CH_ESR_LINE","AttributeTypeDescription":"CH_ESR_LINE","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"ESLine.ESCodezeile","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"$DocumentRole$","AttributeTypeDescription":"$DocumentRole$","SemanticType":19,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":1,"DClassifyAlias":"document-role","InboundAlias":null,"LoggingFlag":0,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Barcode","AttributeTypeDescription":"Barcode","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":null,"InboundAlias":"a347de7d-62f5-4c44-8cf0-d963ab40b8e9","LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Rechnungstyp","AttributeTypeDescription":"Rechnungstyp","SemanticType":0,"ValueType":5,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"Rechnungstyp","InboundAlias":null,"LoggingFlag":0,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"exportXML","AttributeTypeDescription":"exportXML","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"debitorMapping","AttributeTypeDescription":"debitorMapping","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Valutadatum","AttributeTypeDescription":"Valutadatum","SemanticType":0,"ValueType":2,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"Valutadatum","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"OrderNumMulti","AttributeTypeDescription":"OrderNumMulti","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"OrderNumMulti","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Dokumentnummer","AttributeTypeDescription":"Dokumentnummer","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"Dokumentnummer","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"DEBITOR_NAME","AttributeTypeDescription":"DEBITOR_NAME","SemanticType":0,"ValueType":5,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"DEBITOR_NAME","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"IsDuplicate","AttributeTypeDescription":"","SemanticType":0,"ValueType":4,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0},{"AttributeTypeId":"DuplicateDocumentIds","AttributeTypeDescription":"","SemanticType":0,"ValueType":5,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0}],"AttributeTypeStructureDefinitions":[],"AttributeGroups":[{"GroupID":0,"GroupDescription":"Client","MinifiedView":true,"AttributeDefinitions":[{"AttributeID":"DEBITOR_NAME","Description":"","LocalizedDescriptions":{},"AttributeLabel":null,"AttributeIcon":null,"AttributeType":0,"Required":true,"ReadOnly":false,"DoAlignStart":true,"DefaultValue":null,"Values":[],"ColumnSizePercent":0,"MinLength":0,"MaxLength":0,"SizeDesktop":12,"SizeTablet":3,"SizePhone":4,"Minified":{"SizeDesktop":12,"SizeTablet":3,"SizePhone":4},"Position":{"verticalPosition":0,"horizontalPosition":0},"TabStop":0,"ValueConversion":null,"Title":null,"Pattern":null,"QueryAttributes":[],"JSSnippets":[{"OnMethod":"change","Code":"let debitorName = GetAttribute(\'DEBITOR_NAME\');\\r\\n\\r\\nconst sqlQuery = `SELECT * FROM CC_COMPANIES WHERE NAME = \'${debitorName}\'`;\\r\\nif (!debitorName || debitorName.trim() === \\"\\") {\\r\\n    return;\\r\\n}\\r\\n\\r\\nGetSqlResult(sqlQuery)\\r\\n    .then(result => {\\r\\n\\r\\n        const headers = result.Headers;\\r\\n\\r\\n        const idxCompanyERPTenantId = headers.indexOf(\'ERPTENANT_ID\');\\r\\n        const idxCompanyCompanyNum = headers.indexOf(\'COMPANY_ID\');\\r\\n\\r\\n        const row = result.Rows[0];\\r\\n\\r\\n        const companyERPTenantId = row.Cells[idxCompanyERPTenantId];\\r\\n        const companyCompanyNum = row.Cells[idxCompanyCompanyNum];\\r\\n\\r\\n        SetAttribute(\'DEBITOR_NUM\', companyCompanyNum);\\r\\n        SetAttribute(\'debitorMapping\', `${companyERPTenantId}-${companyCompanyNum}`);\\r\\n\\r\\n    })\\r\\n    .catch(console.error);"}],"DataBaseDefinition":{"QueryDefinition":"","QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":false},{"AttributeID":"STR","Description":null,"LocalizedDescriptions":{},"AttributeLabel":null,"AttributeIcon":null,"AttributeType":0,"Required":false,"ReadOnly":true,"DoAlignStart":true,"DefaultValue":null,"Values":[],"ColumnSizePercent":0,"MinLength":0,"MaxLength":0,"SizeDesktop":4,"SizeTablet":2,"SizePhone":4,"Minified":null,"Position":{"verticalPosition":1,"horizontalPosition":0},"TabStop":1,"ValueConversion":null,"Title":null,"Pattern":null,"QueryAttributes":[{"AttributeID":"STR","AttributeValue":null,"AttributeQueryPrefix":"%","AttributeQuerySuffix":"%","Prefix":false,"MultipleParameter":false}],"JSSnippets":[],"DataBaseDefinition":{"QueryDefinition":"SELECT\\n  COMPANY_NUM,\\n  NAME,\\n  STR,\\n  ZIP,\\n  CITY,\\n  COUNTRY,\\n  DEFAULT_CURRENCY\\nFROM\\n  dbo.CC_COMPANIES\\nWHERE\\n  STR LIKE @STR","QueryMappings":[{"ColumnName":"COMPANY_NUM","AttributeID":"DEBITOR_NUM"},{"ColumnName":"NAME","AttributeID":"NAME"},{"ColumnName":"STR","AttributeID":"STR"},{"ColumnName":"ZIP","AttributeID":"ZIP"},{"ColumnName":"CITY","AttributeID":"CITY"},{"ColumnName":"COUNTRY","AttributeID":"COUNTRY"},{"ColumnName":"DEFAULT_CURRENCY","AttributeID":"DEFAULT_CURRENCY"}],"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":false},{"AttributeID":"ZIP","Description":null,"LocalizedDescriptions":{},"AttributeLabel":null,"AttributeIcon":null,"AttributeType":0,"Required":false,"ReadOnly":true,"DoAlignStart":true,"DefaultValue":null,"Values":[],"ColumnSizePercent":0,"MinLength":0,"MaxLength":0,"SizeDesktop":4,"SizeTablet":1,"SizePhone":4,"Minified":null,"Position":{"verticalPosition":1,"horizontalPosition":1},"TabStop":2,"ValueConversion":null,"Title":null,"Pattern":null,"QueryAttributes":null,"JSSnippets":[],"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":false},{"AttributeID":"CITY","Description":null,"LocalizedDescriptions":{},"AttributeLabel":null,"AttributeIcon":null,"AttributeType":0,"Required":false,"ReadOnly":true,"DoAlignStart":true,"DefaultValue":null,"Values":[],"ColumnSizePercent":0,"MinLength":0,"MaxLength":0,"SizeDesktop":4,"SizeTablet":2,"SizePhone":4,"Minified":null,"Position":{"verticalPosition":1,"horizontalPosition":2},"TabStop":3,"ValueConversion":null,"Title":null,"Pattern":null,"QueryAttributes":[{"AttributeID":"CITY","AttributeValue":null,"AttributeQueryPrefix":"%","AttributeQuerySuffix":"%","Prefix":false,"MultipleParameter":false}],"JSSnippets":[],"DataBaseDefinition":{"QueryDefinition":"SELECT\\n  COMPANY_NUM,\\n  NAME,\\n  STR,\\n  ZIP,\\n  CITY,\\n  COUNTRY,\\n  DEFAULT_CURRENCY\\nFROM\\n  dbo.CC_COMPANIES\\nWHERE\\n  CITY LIKE @CITY","QueryMappings":[{"ColumnName":"COMPANY_NUM","AttributeID":"DEBITOR_NUM"},{"ColumnName":"NAME","AttributeID":"NAME"},{"ColumnName":"STR","AttributeID":"STR"},{"ColumnName":"ZIP","AttributeID":"ZIP"},{"ColumnName":"CITY","AttributeID":"CITY"},{"ColumnName":"COUNTRY","AttributeID":"COUNTRY"},{"ColumnName":"DEFAULT_CURRENCY","AttributeID":"DEFAULT_CURRENCY"}],"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":false},{"AttributeID":"DEBITOR_NUM","Description":null,"LocalizedDescriptions":{},"AttributeLabel":null,"AttributeIcon":null,"AttributeType":0,"Required":false,"ReadOnly":true,"DoAlignStart":true,"DefaultValue":null,"Values":[],"ColumnSizePercent":0,"MinLength":0,"MaxLength":0,"SizeDesktop":6,"SizeTablet":4,"SizePhone":4,"Minified":null,"Position":{"verticalPosition":2,"horizontalPosition":0},"TabStop":4,"ValueConversion":null,"Title":null,"Pattern":null,"QueryAttributes":[],"JSSnippets":[],"DataBaseDefinition":{"QueryDefinition":"","QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":true},{"AttributeID":"debitorMapping","Description":null,"LocalizedDescriptions":{},"AttributeLabel":null,"AttributeIcon":null,"AttributeType":0,"Required":false,"ReadOnly":true,"DoAlignStart":true,"DefaultValue":null,"Values":[],"ColumnSizePercent":0,"MinLength":0,"MaxLength":0,"SizeDesktop":6,"SizeTablet":4,"SizePhone":4,"Minified":null,"Position":{"verticalPosition":2,"horizontalPosition":1},"TabStop":5,"ValueConversion":null,"Title":null,"Pattern":null,"QueryAttributes":[],"JSSnippets":[],"DataBaseDefinition":{"QueryDefinition":"","QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":true}],"AttributeStructureDefinitions":[]},{"GroupID":1,"GroupDescription":"Sender","MinifiedView":true,"AttributeDefinitions":[{"AttributeID":"VENDOR_NUM","Description":"Lieferant","LocalizedDescriptions":{},"AttributeLabel":"Lieferant","AttributeIcon":null,"AttributeType":0,"Required":true,"ReadOnly":false,"DoAlignStart":true,"DefaultValue":null,"Values":[],"ColumnSizePercent":0,"MinLength":0,"MaxLength":0,"SizeDesktop":6,"SizeTablet":3,"SizePhone":4,"Minified":{"SizeDesktop":6,"SizeTablet":3,"SizePhone":4},"Position":{"verticalPosition":0,"horizontalPosition":0},"TabStop":6,"ValueConversion":null,"Title":null,"Pattern":null,"QueryAttributes":[{"AttributeID":"VENDOR_NUM","AttributeValue":null,"AttributeQueryPrefix":"%","AttributeQuerySuffix":"%","Prefix":false,"MultipleParameter":false},{"AttributeID":"DEBITOR_NAME","AttributeValue":null,"AttributeQueryPrefix":"","AttributeQuerySuffix":"","Prefix":false,"MultipleParameter":false}],"JSSnippets":[],"DataBaseDefinition":{"QueryDefinition":"SELECT\\n  TOP 100 ven.*,\\n  venb.*\\nFROM\\n  dbo.CC_VENDORS AS ven\\n  LEFT JOIN dbo.CC_VENDOR_BANK AS venb ON ven.VENDOR_NUM = venb.VENDOR_NUM\\n  AND ven.COMPANY_NUM = venb.COMPANY_NUM\\nWHERE\\n  ven.COMPANY_NUM = @DEBITOR_NAME\\n  AND (\\n    ven.VENDOR_NUM LIKE @VENDOR_NUM\\n    OR ven.VENDOR_NAME LIKE @VENDOR_NUM\\n  )","QueryMappings":[{"ColumnName":"VENDOR_NUM","AttributeID":"VENDOR_NUM"},{"ColumnName":"VENDOR_NAME","AttributeID":"VENDOR_NAME"},{"ColumnName":"VENDOR_STR","AttributeID":"VENDOR_STR"},{"ColumnName":"VENDOR_CITY","AttributeID":"VENDOR_CITY"},{"ColumnName":"VENDOR_ZIP_CODE","AttributeID":"VENDOR_ZIP_CODE"},{"ColumnName":"VENDOR_VAT_REGISTRATION_ID","AttributeID":"VENDOR_VAT_REGISTRATION_ID"},{"ColumnName":"VENDOR_REGISTRATION_ID","AttributeID":"VENDOR_REGISTRATION_ID"},{"ColumnName":"IBAN","AttributeID":"VENDOR_IBAN"}],"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":false},{"AttributeID":"VENDOR_NAME","Description":null,"LocalizedDescriptions":{},"AttributeLabel":null,"AttributeIcon":null,"AttributeType":0,"Required":true,"ReadOnly":true,"DoAlignStart":true,"DefaultValue":null,"Values":[],"ColumnSizePercent":0,"MinLength":0,"MaxLength":0,"SizeDesktop":6,"SizeTablet":5,"SizePhone":4,"Minified":{"SizeDesktop":6,"SizeTablet":5,"SizePhone":4},"Position":{"verticalPosition":0,"horizontalPosition":1},"TabStop":7,"ValueConversion":null,"Title":null,"Pattern":null,"QueryAttributes":[{"AttributeID":"VENDOR_NAME","AttributeValue":null,"AttributeQueryPrefix":"%","AttributeQuerySuffix":"%","Prefix":false,"MultipleParameter":false},{"AttributeID":"DEBITOR_NUM","AttributeValue":null,"AttributeQueryPrefix":"","AttributeQuerySuffix":"","Prefix":false,"MultipleParameter":false}],"JSSnippets":[],"DataBaseDefinition":{"QueryDefinition":"SELECT\\n  ven.*,\\n  venb.*\\nFROM\\n  dbo.CC_VENDORS AS ven\\n  LEFT JOIN dbo.CC_VENDOR_BANK AS venb ON ven.VENDOR_NUM = venb.VENDOR_NUM\\n  AND ven.COMPANY_NUM = venb.COMPANY_NUM\\nWHERE\\n  ven.COMPANY_NUM = @DEBITOR_NUM\\n  AND ven.VENDOR_NAME LIKE @VENDOR_NAME","QueryMappings":[{"ColumnName":"VENDOR_NUM","AttributeID":"VENDOR_NUM"},{"ColumnName":"VENDOR_NAME","AttributeID":"VENDOR_NAME"},{"ColumnName":"VENDOR_STR","AttributeID":"VENDOR_STR"},{"ColumnName":"VENDOR_CITY","AttributeID":"VENDOR_CITY"},{"ColumnName":"VENDOR_ZIP_CODE","AttributeID":"VENDOR_ZIP_CODE"},{"ColumnName":"VENDOR_VAT_REGISTRATION_ID","AttributeID":"VENDOR_VAT_REGISTRATION_ID"},{"ColumnName":"VENDOR_REGISTRATION_ID","AttributeID":"VENDOR_REGISTRATION_ID"},{"ColumnName":"IBAN","AttributeID":"VENDOR_IBAN"}],"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":false},{"AttributeID":"VENDOR_STR","Description":null,"LocalizedDescriptions":{},"AttributeLabel":null,"AttributeIcon":null,"AttributeType":0,"Required":false,"ReadOnly":true,"DoAlignStart":true,"DefaultValue":null,"Values":[],"ColumnSizePercent":0,"MinLength":0,"MaxLength":0,"SizeDesktop":4,"SizeTablet":3,"SizePhone":4,"Minified":null,"Position":{"verticalPosition":1,"horizontalPosition":0},"TabStop":8,"ValueConversion":null,"Title":null,"Pattern":null,"QueryAttributes":[{"AttributeID":"VENDOR_STR","AttributeValue":null,"AttributeQueryPrefix":"%","AttributeQuerySuffix":"%","Prefix":false,"MultipleParameter":false},{"AttributeID":"DEBITOR_NUM","AttributeValue":null,"AttributeQueryPrefix":"","AttributeQuerySuffix":"","Prefix":false,"MultipleParameter":false}],"JSSnippets":[],"DataBaseDefinition":{"QueryDefinition":"SELECT\\n  ven.*,\\n  venb.*\\nFROM\\n  dbo.CC_VENDORS AS ven\\n  LEFT JOIN dbo.CC_VENDOR_BANK AS venb ON ven.VENDOR_NUM = venb.VENDOR_NUM\\n  AND ven.COMPANY_NUM = venb.COMPANY_NUM\\nWHERE\\n  ven.COMPANY_NUM = @DEBITOR_NUM\\n  AND ven.VENDOR_STR LIKE @VENDOR_STR","QueryMappings":[{"ColumnName":"VENDOR_NUM","AttributeID":"VENDOR_NUM"},{"ColumnName":"VENDOR_NAME","AttributeID":"VENDOR_NAME"},{"ColumnName":"VENDOR_STR","AttributeID":"VENDOR_STR"},{"ColumnName":"VENDOR_CITY","AttributeID":"VENDOR_CITY"},{"ColumnName":"VENDOR_ZIP_CODE","AttributeID":"VENDOR_ZIP_CODE"},{"ColumnName":"VENDOR_VAT_REGISTRATION_ID","AttributeID":"VENDOR_VAT_REGISTRATION_ID"},{"ColumnName":"VENDOR_REGISTRATION_ID","AttributeID":"VENDOR_REGISTRATION_ID"},{"ColumnName":"IBAN","AttributeID":"VENDOR_IBAN"}],"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":false},{"AttributeID":"VENDOR_ZIP_CODE","Description":null,"LocalizedDescriptions":{},"AttributeLabel":null,"AttributeIcon":null,"AttributeType":0,"Required":false,"ReadOnly":true,"DoAlignStart":true,"DefaultValue":null,"Values":[],"ColumnSizePercent":0,"MinLength":0,"MaxLength":0,"SizeDesktop":4,"SizeTablet":2,"SizePhone":4,"Minified":null,"Position":{"verticalPosition":1,"horizontalPosition":1},"TabStop":9,"ValueConversion":null,"Title":null,"Pattern":null,"QueryAttributes":[{"AttributeID":"VENDOR_ZIP_CODE","AttributeValue":null,"AttributeQueryPrefix":"%","AttributeQuerySuffix":"%","Prefix":false,"MultipleParameter":false},{"AttributeID":"DEBITOR_NUM","AttributeValue":null,"AttributeQueryPrefix":"","AttributeQuerySuffix":"","Prefix":false,"MultipleParameter":false}],"JSSnippets":[],"DataBaseDefinition":{"QueryDefinition":"SELECT\\n  ven.*,\\n  venb.*\\nFROM\\n  dbo.CC_VENDORS AS ven\\n  LEFT JOIN dbo.CC_VENDOR_BANK AS venb ON ven.VENDOR_NUM = venb.VENDOR_NUM\\n  AND ven.COMPANY_NUM = venb.COMPANY_NUM\\nWHERE\\n  ven.COMPANY_NUM = @DEBITOR_NUM\\n  AND ven.VENDOR_ZIP_CODE LIKE @VENDOR_ZIP_CODE","QueryMappings":[{"ColumnName":"VENDOR_NUM","AttributeID":"VENDOR_NUM"},{"ColumnName":"VENDOR_NAME","AttributeID":"VENDOR_NAME"},{"ColumnName":"VENDOR_STR","AttributeID":"VENDOR_STR"},{"ColumnName":"VENDOR_CITY","AttributeID":"VENDOR_CITY"},{"ColumnName":"VENDOR_ZIP_CODE","AttributeID":"VENDOR_ZIP_CODE"},{"ColumnName":"VENDOR_VAT_REGISTRATION_ID","AttributeID":"VENDOR_VAT_REGISTRATION_ID"},{"ColumnName":"VENDOR_REGISTRATION_ID","AttributeID":"VENDOR_REGISTRATION_ID"},{"ColumnName":"IBAN","AttributeID":"VENDOR_IBAN"}],"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":false},{"AttributeID":"VENDOR_CITY","Description":null,"LocalizedDescriptions":{},"AttributeLabel":null,"AttributeIcon":null,"AttributeType":0,"Required":false,"ReadOnly":true,"DoAlignStart":true,"DefaultValue":null,"Values":[],"ColumnSizePercent":0,"MinLength":0,"MaxLength":0,"SizeDesktop":4,"SizeTablet":3,"SizePhone":4,"Minified":null,"Position":{"verticalPosition":1,"horizontalPosition":2},"TabStop":10,"ValueConversion":null,"Title":null,"Pattern":null,"QueryAttributes":[{"AttributeID":"VENDOR_CITY","AttributeValue":null,"AttributeQueryPrefix":"%","AttributeQuerySuffix":"%","Prefix":false,"MultipleParameter":false},{"AttributeID":"DEBITOR_NUM","AttributeValue":null,"AttributeQueryPrefix":"","AttributeQuerySuffix":"","Prefix":false,"MultipleParameter":false}],"JSSnippets":[],"DataBaseDefinition":{"QueryDefinition":"SELECT\\n  ven.*,\\n  venb.*\\nFROM\\n  dbo.CC_VENDORS AS ven\\n  LEFT JOIN dbo.CC_VENDOR_BANK AS venb ON ven.VENDOR_NUM = venb.VENDOR_NUM\\n  AND ven.COMPANY_NUM = venb.COMPANY_NUM\\nWHERE\\n  ven.COMPANY_NUM = @DEBITOR_NUM\\n  AND ven.VENDOR_CITY LIKE @VENDOR_CITY","QueryMappings":[{"ColumnName":"VENDOR_NUM","AttributeID":"VENDOR_NUM"},{"ColumnName":"VENDOR_NAME","AttributeID":"VENDOR_NAME"},{"ColumnName":"VENDOR_STR","AttributeID":"VENDOR_STR"},{"ColumnName":"VENDOR_CITY","AttributeID":"VENDOR_CITY"},{"ColumnName":"VENDOR_ZIP_CODE","AttributeID":"VENDOR_ZIP_CODE"},{"ColumnName":"VENDOR_VAT_REGISTRATION_ID","AttributeID":"VENDOR_VAT_REGISTRATION_ID"},{"ColumnName":"VENDOR_REGISTRATION_ID","AttributeID":"VENDOR_REGISTRATION_ID"},{"ColumnName":"IBAN","AttributeID":"VENDOR_IBAN"}],"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":false},{"AttributeID":"VENDOR_VAT_REGISTRATION_ID","Description":null,"LocalizedDescriptions":{},"AttributeLabel":null,"AttributeIcon":null,"AttributeType":0,"Required":false,"ReadOnly":true,"DoAlignStart":true,"DefaultValue":null,"Values":[],"ColumnSizePercent":0,"MinLength":0,"MaxLength":0,"SizeDesktop":3,"SizeTablet":2,"SizePhone":4,"Minified":null,"Position":{"verticalPosition":2,"horizontalPosition":0},"TabStop":11,"ValueConversion":null,"Title":null,"Pattern":null,"QueryAttributes":[{"AttributeID":"VENDOR_VAT_REGISTRATION_ID","AttributeValue":null,"AttributeQueryPrefix":"%","AttributeQuerySuffix":"%","Prefix":false,"MultipleParameter":false},{"AttributeID":"DEBITOR_NUM","AttributeValue":null,"AttributeQueryPrefix":"","AttributeQuerySuffix":"","Prefix":false,"MultipleParameter":false}],"JSSnippets":[],"DataBaseDefinition":{"QueryDefinition":"SELECT\\n  ven.*,\\n  venb.*\\nFROM\\n  dbo.CC_VENDORS AS ven\\n  LEFT JOIN dbo.CC_VENDOR_BANK AS venb ON ven.VENDOR_NUM = venb.VENDOR_NUM\\n  AND ven.COMPANY_NUM = venb.COMPANY_NUM\\nWHERE\\n  ven.COMPANY_NUM = @DEBITOR_NUM\\n  AND ven.VENDOR_VAT_REGISTRATION_ID LIKE @VENDOR_VAT_REGISTRATION_ID","QueryMappings":[{"ColumnName":"VENDOR_NUM","AttributeID":"VENDOR_NUM"},{"ColumnName":"VENDOR_NAME","AttributeID":"VENDOR_NAME"},{"ColumnName":"VENDOR_STR","AttributeID":"VENDOR_STR"},{"ColumnName":"VENDOR_CITY","AttributeID":"VENDOR_CITY"},{"ColumnName":"VENDOR_ZIP_CODE","AttributeID":"VENDOR_ZIP_CODE"},{"ColumnName":"VENDOR_VAT_REGISTRATION_ID","AttributeID":"VENDOR_VAT_REGISTRATION_ID"},{"ColumnName":"VENDOR_REGISTRATION_ID","AttributeID":"VENDOR_REGISTRATION_ID"},{"ColumnName":"IBAN","AttributeID":"VENDOR_IBAN"}],"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":false},{"AttributeID":"VENDOR_REGISTRATION_ID","Description":null,"LocalizedDescriptions":{},"AttributeLabel":null,"AttributeIcon":null,"AttributeType":0,"Required":false,"ReadOnly":true,"DoAlignStart":true,"DefaultValue":null,"Values":[],"ColumnSizePercent":0,"MinLength":0,"MaxLength":0,"SizeDesktop":3,"SizeTablet":2,"SizePhone":4,"Minified":null,"Position":{"verticalPosition":2,"horizontalPosition":1},"TabStop":12,"ValueConversion":null,"Title":null,"Pattern":null,"QueryAttributes":[{"AttributeID":"VENDOR_REGISTRATION_ID","AttributeValue":null,"AttributeQueryPrefix":"%","AttributeQuerySuffix":"%","Prefix":false,"MultipleParameter":false},{"AttributeID":"DEBITOR_NUM","AttributeValue":null,"AttributeQueryPrefix":"","AttributeQuerySuffix":"","Prefix":false,"MultipleParameter":false}],"JSSnippets":[],"DataBaseDefinition":{"QueryDefinition":"SELECT\\n  ven.*,\\n  venb.*\\nFROM\\n  dbo.CC_VENDORS AS ven\\n  LEFT JOIN dbo.CC_VENDOR_BANK AS venb ON ven.VENDOR_NUM = venb.VENDOR_NUM\\n  AND ven.COMPANY_NUM = venb.COMPANY_NUM\\nWHERE\\n  ven.COMPANY_NUM = @DEBITOR_NUM\\n  AND ven.VENDOR_REGISTRATION_ID LIKE @VENDOR_REGISTRATION_ID","QueryMappings":[{"ColumnName":"VENDOR_NUM","AttributeID":"VENDOR_NUM"},{"ColumnName":"VENDOR_NAME","AttributeID":"VENDOR_NAME"},{"ColumnName":"VENDOR_STR","AttributeID":"VENDOR_STR"},{"ColumnName":"VENDOR_CITY","AttributeID":"VENDOR_CITY"},{"ColumnName":"VENDOR_ZIP_CODE","AttributeID":"VENDOR_ZIP_CODE"},{"ColumnName":"VENDOR_VAT_REGISTRATION_ID","AttributeID":"VENDOR_VAT_REGISTRATION_ID"},{"ColumnName":"VENDOR_REGISTRATION_ID","AttributeID":"VENDOR_REGISTRATION_ID"},{"ColumnName":"IBAN","AttributeID":"VENDOR_IBAN"}],"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":false},{"AttributeID":"VENDOR_IBAN","Description":null,"LocalizedDescriptions":{},"AttributeLabel":null,"AttributeIcon":null,"AttributeType":0,"Required":false,"ReadOnly":true,"DoAlignStart":true,"DefaultValue":null,"Values":[],"ColumnSizePercent":0,"MinLength":0,"MaxLength":0,"SizeDesktop":6,"SizeTablet":4,"SizePhone":4,"Minified":null,"Position":{"verticalPosition":2,"horizontalPosition":2},"TabStop":13,"ValueConversion":null,"Title":null,"Pattern":null,"QueryAttributes":[{"AttributeID":"VENDOR_IBAN","AttributeValue":null,"AttributeQueryPrefix":"%","AttributeQuerySuffix":"%","Prefix":false,"MultipleParameter":false},{"AttributeID":"DEBITOR_NUM","AttributeValue":null,"AttributeQueryPrefix":"","AttributeQuerySuffix":"","Prefix":false,"MultipleParameter":false}],"JSSnippets":[],"DataBaseDefinition":{"QueryDefinition":"SELECT\\n  ven.*,\\n  venb.*\\nFROM\\n  dbo.CC_VENDORS AS ven\\n  LEFT JOIN dbo.CC_VENDOR_BANK AS venb ON ven.VENDOR_NUM = venb.VENDOR_NUM\\n  AND ven.COMPANY_NUM = venb.COMPANY_NUM\\nWHERE\\n  ven.COMPANY_NUM = @DEBITOR_NUM\\n  AND venb.IBAN LIKE @VENDOR_IBAN","QueryMappings":[{"ColumnName":"VENDOR_NUM","AttributeID":"VENDOR_NUM"},{"ColumnName":"VENDOR_NAME","AttributeID":"VENDOR_NAME"},{"ColumnName":"VENDOR_STR","AttributeID":"VENDOR_STR"},{"ColumnName":"VENDOR_CITY","AttributeID":"VENDOR_CITY"},{"ColumnName":"VENDOR_ZIP_CODE","AttributeID":"VENDOR_ZIP_CODE"},{"ColumnName":"VENDOR_VAT_REGISTRATION_ID","AttributeID":"VENDOR_VAT_REGISTRATION_ID"},{"ColumnName":"VENDOR_REGISTRATION_ID","AttributeID":"VENDOR_REGISTRATION_ID"},{"ColumnName":"IBAN","AttributeID":"VENDOR_IBAN"}],"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":false}],"AttributeStructureDefinitions":[]},{"GroupID":2,"GroupDescription":"InvoiceData","MinifiedView":false,"AttributeDefinitions":[{"AttributeID":"DocumentType","Description":null,"LocalizedDescriptions":{},"AttributeLabel":null,"AttributeIcon":null,"AttributeType":0,"Required":false,"ReadOnly":false,"DoAlignStart":true,"DefaultValue":"Invoice","Values":["Invoice","CreditAdvice"],"ColumnSizePercent":0,"MinLength":0,"MaxLength":0,"SizeDesktop":3,"SizeTablet":1,"SizePhone":4,"Minified":null,"Position":{"verticalPosition":0,"horizontalPosition":0},"TabStop":14,"ValueConversion":null,"Title":null,"Pattern":null,"QueryAttributes":null,"JSSnippets":[],"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":false},{"AttributeID":"InvoiceDate","Description":null,"LocalizedDescriptions":{},"AttributeLabel":null,"AttributeIcon":null,"AttributeType":0,"Required":true,"ReadOnly":false,"DoAlignStart":true,"DefaultValue":null,"Values":[],"ColumnSizePercent":0,"MinLength":0,"MaxLength":0,"SizeDesktop":3,"SizeTablet":2,"SizePhone":4,"Minified":null,"Position":{"verticalPosition":0,"horizontalPosition":1},"TabStop":15,"ValueConversion":"ConvertInputDate","Title":"dd.mm.YYYY","Pattern":"^(0?[1-9]|[12][0-9]|3[01])[.](0?[1-9]|1[012])[.](\\\\d{4})$","QueryAttributes":null,"JSSnippets":[{"OnMethod":"input","Code":"clearTimeout(typingInvoiceDateTimer); var element = $(this); if (element.val()) { typingInvoiceDateTimer = setTimeout(function () { element.val(ConvertInputDate(element.val())); TriggerFieldValidation(element.attr(\'id\')); }, doneTypingInterval); }\\n"}],"DataBaseDefinition":{"QueryDefinition":"","QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":false},{"AttributeID":"InvoiceNumber","Description":null,"LocalizedDescriptions":{},"AttributeLabel":null,"AttributeIcon":null,"AttributeType":0,"Required":true,"ReadOnly":false,"DoAlignStart":true,"DefaultValue":null,"Values":[],"ColumnSizePercent":0,"MinLength":0,"MaxLength":0,"SizeDesktop":6,"SizeTablet":1,"SizePhone":4,"Minified":null,"Position":{"verticalPosition":0,"horizontalPosition":2},"TabStop":16,"ValueConversion":null,"Title":null,"Pattern":null,"QueryAttributes":null,"JSSnippets":[],"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":false},{"AttributeID":"Rechnungstyp","Description":null,"LocalizedDescriptions":{},"AttributeLabel":null,"AttributeIcon":null,"AttributeType":0,"Required":false,"ReadOnly":false,"DoAlignStart":true,"DefaultValue":"Warenrechnung","Values":["Warenrechnung","Kostenrechnung"],"ColumnSizePercent":0,"MinLength":0,"MaxLength":0,"SizeDesktop":6,"SizeTablet":2,"SizePhone":4,"Minified":null,"Position":{"verticalPosition":1,"horizontalPosition":0},"TabStop":17,"ValueConversion":null,"Title":null,"Pattern":null,"QueryAttributes":[],"JSSnippets":[],"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":true},{"AttributeID":"OrderNum","Description":"Bestellnummer(n)","LocalizedDescriptions":{},"AttributeLabel":"Bestellnummer(n)","AttributeIcon":null,"AttributeType":0,"Required":false,"ReadOnly":false,"DoAlignStart":true,"DefaultValue":null,"Values":[],"ColumnSizePercent":0,"MinLength":0,"MaxLength":0,"SizeDesktop":6,"SizeTablet":3,"SizePhone":4,"Minified":null,"Position":{"verticalPosition":1,"horizontalPosition":1},"TabStop":18,"ValueConversion":null,"Title":null,"Pattern":"^([^;]{1,20})(;[^;]{1,20})*$","QueryAttributes":[{"AttributeID":"OrderNum","AttributeValue":null,"AttributeQueryPrefix":"%","AttributeQuerySuffix":"%","Prefix":false,"MultipleParameter":true},{"AttributeID":"DEBITOR_NUM","AttributeValue":null,"AttributeQueryPrefix":"","AttributeQuerySuffix":"","Prefix":false,"MultipleParameter":false},{"AttributeID":"VENDOR_NUM","AttributeValue":null,"AttributeQueryPrefix":"","AttributeQuerySuffix":"","Prefix":false,"MultipleParameter":false}],"JSSnippets":[],"DataBaseDefinition":{"QueryDefinition":"SELECT\\n  COMPANY_NUM,\\n  VENDOR_NUM,\\n  ORDER_NUM\\nFROM\\n  dbo.CC_ORDERS\\nWHERE\\n  COMPANY_NUM = @DEBITOR_NUM\\n  AND VENDOR_NUM = @VENDOR_NUM\\n  AND (ORDER_NUM LIKE @OrderNum)","QueryMappings":[{"ColumnName":"VENDOR_NUM","AttributeID":"VENDOR_NUM"},{"ColumnName":"COMPANY_NUM","AttributeID":"DEBITOR_NUM"},{"ColumnName":"ORDER_NUM","AttributeID":"OrderNum"}],"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":false},{"AttributeID":"NetAmount1","Description":null,"LocalizedDescriptions":{},"AttributeLabel":null,"AttributeIcon":null,"AttributeType":0,"Required":true,"ReadOnly":false,"DoAlignStart":false,"DefaultValue":"0.00","Values":[],"ColumnSizePercent":0,"MinLength":0,"MaxLength":0,"SizeDesktop":6,"SizeTablet":4,"SizePhone":4,"Minified":null,"Position":{"verticalPosition":2,"horizontalPosition":0},"TabStop":19,"ValueConversion":"ConvertInputFloatWithCustomDelimiter","Title":null,"Pattern":null,"QueryAttributes":null,"JSSnippets":[{"OnMethod":"input","Code":" ConvertInputFloatWithCustomDelimiterOnInput(this);\\n var netAmount1 = Number(GetAttribute(\\"NetAmount1\\"));\\n var vatRate1 = Number(GetAttribute(\\"VatRate1\\"))/100;\\n var vatAmount1 = netAmount1 * vatRate1;\\n SetAttribute(\\"VatAmount1\\", vatAmount1.toFixed(2));\\n\\n var netAmount2 = Number(GetAttribute(\\"NetAmount2\\"));\\n var vatRate2 = Number(GetAttribute(\\"VatRate2\\"))/100;\\n var grossAmount = netAmount1 * (1 + vatRate1) + netAmount2 * (1 + vatRate2);\\n SetAttribute(\\"GrossAmount\\", grossAmount.toFixed(2));"}],"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":false},{"AttributeID":"NetAmount2","Description":null,"LocalizedDescriptions":{},"AttributeLabel":null,"AttributeIcon":null,"AttributeType":0,"Required":false,"ReadOnly":false,"DoAlignStart":false,"DefaultValue":"0.00","Values":[],"ColumnSizePercent":0,"MinLength":0,"MaxLength":0,"SizeDesktop":6,"SizeTablet":4,"SizePhone":4,"Minified":null,"Position":{"verticalPosition":2,"horizontalPosition":1},"TabStop":20,"ValueConversion":"ConvertInputFloatWithCustomDelimiter","Title":null,"Pattern":null,"QueryAttributes":null,"JSSnippets":[{"OnMethod":"input","Code":" ConvertInputFloatWithCustomDelimiterOnInput(this);\\n var netAmount1 = Number(GetAttribute(\\"NetAmount1\\"));\\n var vatRate1 = Number(GetAttribute(\\"VatRate1\\"))/100;\\n\\n var netAmount2 = Number(GetAttribute(\\"NetAmount2\\"));\\n var vatRate2 = Number(GetAttribute(\\"VatRate2\\"))/100;\\n var vatAmount2 = netAmount2 * vatRate2;\\n SetAttribute(\\"VatAmount2\\", vatAmount2.toFixed(2));\\n var grossAmount = netAmount1 * (1 + vatRate1) + netAmount2 * (1 + vatRate2);\\n SetAttribute(\\"GrossAmount\\", grossAmount.toFixed(2));"}],"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":false},{"AttributeID":"VatRate1","Description":null,"LocalizedDescriptions":{},"AttributeLabel":null,"AttributeIcon":null,"AttributeType":0,"Required":false,"ReadOnly":false,"DoAlignStart":false,"DefaultValue":"0.00","Values":[],"ColumnSizePercent":0,"MinLength":0,"MaxLength":0,"SizeDesktop":6,"SizeTablet":4,"SizePhone":4,"Minified":null,"Position":{"verticalPosition":3,"horizontalPosition":0},"TabStop":21,"ValueConversion":"ConvertInputFloatWithCustomDelimiter","Title":null,"Pattern":null,"QueryAttributes":null,"JSSnippets":[{"OnMethod":"input","Code":"ConvertInputFloatWithCustomDelimiterOnInput(this);\\nvar netAmount1 = Number(GetAttribute(\\"NetAmount1\\"));\\nvar vatRate1 = Number(GetAttribute(\\"VatRate1\\")) / 100;\\nvar vatAmount1 = netAmount1 * vatRate1;\\nSetAttribute(\\"VatAmount1\\", vatAmount1.toFixed(2));\\n\\nvar netAmount2 = Number(GetAttribute(\\"NetAmount2\\"));\\nvar vatRate2 = Number(GetAttribute(\\"VatRate2\\")) / 100;\\nvar grossAmount = netAmount1 * (1 + vatRate1) + netAmount2 * (1 + vatRate2);\\nSetAttribute(\\"GrossAmount\\", grossAmount.toFixed(2));"}],"DataBaseDefinition":{"QueryDefinition":"","QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":false},{"AttributeID":"VatRate2","Description":null,"LocalizedDescriptions":{},"AttributeLabel":null,"AttributeIcon":null,"AttributeType":0,"Required":false,"ReadOnly":false,"DoAlignStart":false,"DefaultValue":"0.00","Values":[],"ColumnSizePercent":0,"MinLength":0,"MaxLength":0,"SizeDesktop":6,"SizeTablet":4,"SizePhone":4,"Minified":null,"Position":{"verticalPosition":3,"horizontalPosition":1},"TabStop":22,"ValueConversion":"ConvertInputFloatWithCustomDelimiter","Title":null,"Pattern":null,"QueryAttributes":null,"JSSnippets":[{"OnMethod":"input","Code":" ConvertInputFloatWithCustomDelimiterOnInput(this);\\n var netAmount1 = Number(GetAttribute(\\"NetAmount1\\"));\\n var vatRate1 = Number(GetAttribute(\\"VatRate1\\"))/100;\\n\\n var netAmount2 = Number(GetAttribute(\\"NetAmount2\\"));\\n var vatRate2 = Number(GetAttribute(\\"VatRate2\\"))/100;\\n var vatAmount2 = netAmount2 * vatRate2;\\n SetAttribute(\\"VatAmount2\\", vatAmount2.toFixed(2));\\n var grossAmount = netAmount1 * (1 + vatRate1) + netAmount2 * (1 + vatRate2);\\n SetAttribute(\\"GrossAmount\\", grossAmount.toFixed(2));"}],"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":false},{"AttributeID":"VatAmount1","Description":null,"LocalizedDescriptions":{},"AttributeLabel":null,"AttributeIcon":null,"AttributeType":0,"Required":true,"ReadOnly":false,"DoAlignStart":false,"DefaultValue":"0.00","Values":[],"ColumnSizePercent":0,"MinLength":0,"MaxLength":0,"SizeDesktop":6,"SizeTablet":4,"SizePhone":4,"Minified":null,"Position":{"verticalPosition":4,"horizontalPosition":0},"TabStop":23,"ValueConversion":"ConvertInputFloatWithCustomDelimiter","Title":null,"Pattern":null,"QueryAttributes":null,"JSSnippets":[{"OnMethod":"input","Code":" ConvertInputFloatWithCustomDelimiterOnInput(this);\\n "}],"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":false},{"AttributeID":"VatAmount2","Description":null,"LocalizedDescriptions":{},"AttributeLabel":null,"AttributeIcon":null,"AttributeType":0,"Required":false,"ReadOnly":false,"DoAlignStart":false,"DefaultValue":"0.00","Values":[],"ColumnSizePercent":0,"MinLength":0,"MaxLength":0,"SizeDesktop":6,"SizeTablet":4,"SizePhone":4,"Minified":null,"Position":{"verticalPosition":4,"horizontalPosition":1},"TabStop":24,"ValueConversion":"ConvertInputFloatWithCustomDelimiter","Title":null,"Pattern":null,"QueryAttributes":null,"JSSnippets":[{"OnMethod":"input","Code":" ConvertInputFloatWithCustomDelimiterOnInput(this);\\n "}],"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":false},{"AttributeID":"AdditionalCosts","Description":null,"LocalizedDescriptions":{},"AttributeLabel":null,"AttributeIcon":null,"AttributeType":0,"Required":false,"ReadOnly":false,"DoAlignStart":false,"DefaultValue":"0.00","Values":[],"ColumnSizePercent":0,"MinLength":0,"MaxLength":0,"SizeDesktop":12,"SizeTablet":8,"SizePhone":4,"Minified":null,"Position":{"verticalPosition":5,"horizontalPosition":0},"TabStop":25,"ValueConversion":"ConvertInputFloatWithCustomDelimiter","Title":null,"Pattern":null,"QueryAttributes":null,"JSSnippets":[{"OnMethod":"input","Code":" ConvertInputFloatWithCustomDelimiterOnInput(this);\\n "}],"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":true},{"AttributeID":"GrossAmount","Description":null,"LocalizedDescriptions":{},"AttributeLabel":null,"AttributeIcon":null,"AttributeType":0,"Required":true,"ReadOnly":false,"DoAlignStart":false,"DefaultValue":"0.00","Values":[],"ColumnSizePercent":0,"MinLength":0,"MaxLength":0,"SizeDesktop":9,"SizeTablet":4,"SizePhone":4,"Minified":null,"Position":{"verticalPosition":6,"horizontalPosition":0},"TabStop":26,"ValueConversion":"ConvertInputFloatWithCustomDelimiter","Title":null,"Pattern":null,"QueryAttributes":null,"JSSnippets":[{"OnMethod":"input","Code":" ConvertInputFloatWithCustomDelimiterOnInput(this);\\n "}],"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":false},{"AttributeID":"GrossAmountCurrency","Description":null,"LocalizedDescriptions":{},"AttributeLabel":null,"AttributeIcon":null,"AttributeType":0,"Required":false,"ReadOnly":false,"DoAlignStart":true,"DefaultValue":null,"Values":["","AUD","CAD","CHF","CNY","CZK","DKK","EUR","GBP","HKD","INR","JPY","KRW","MYR","NOK","PLN","RUB","SAR","SEK","SGD","TWD","UAH","USD","ZAR"],"ColumnSizePercent":0,"MinLength":0,"MaxLength":0,"SizeDesktop":3,"SizeTablet":4,"SizePhone":4,"Minified":null,"Position":{"verticalPosition":6,"horizontalPosition":1},"TabStop":27,"ValueConversion":null,"Title":null,"Pattern":null,"QueryAttributes":null,"JSSnippets":[],"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":false},{"AttributeID":"Dokumentnummer","Description":null,"LocalizedDescriptions":{},"AttributeLabel":null,"AttributeIcon":null,"AttributeType":0,"Required":false,"ReadOnly":true,"DoAlignStart":true,"DefaultValue":null,"Values":[],"ColumnSizePercent":0,"MinLength":0,"MaxLength":0,"SizeDesktop":12,"SizeTablet":4,"SizePhone":4,"Minified":null,"Position":{"verticalPosition":7,"horizontalPosition":0},"TabStop":28,"ValueConversion":null,"Title":null,"Pattern":null,"QueryAttributes":[],"JSSnippets":[{"OnMethod":"change","Code":"function generateGUID() {\\r\\n    return \'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx\'.replace(/[xy]/g, function (c) {\\r\\n        var r = Math.random() * 16 | 0,\\r\\n            v = c === \'x\' ? r : (r & 0x3 | 0x8);\\r\\n        return v.toString(16);\\r\\n    });\\r\\n}\\r\\n\\r\\nvar barcodeValue = GetAttribute(\'Barcode\');\\r\\nif (barcodeValue == \'\') {\\r\\n    barcodeValue = generateGUID();\\r\\n}\\r\\n\\r\\nSetAttribute(\'Barcode\', barcodeValue.toUpperCase());\\r\\n\\r\\nconst input = document.getElementById(\'Dokumentnummer\');\\r\\n\\r\\nif (input) {\\r\\n    const container = input.closest(\'.ccAttributeContainer\');\\r\\n    if (container) {\\r\\n        container.style.display = \'none\';\\r\\n    }\\r\\n}\\r\\n"}],"DataBaseDefinition":{"QueryDefinition":"","QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":true}],"AttributeStructureDefinitions":[]}],"StructureGroups":[],"JSSnippets":[{"OnMethod":"documentready","Code":"// Aktuellen Task und Dokument-ID ermitteln\\r\\nvar taskId = __ActiveTask__.Task;\\r\\nvar documentId = __ActiveTask__.Document;\\r\\nvar subscriptionId = taskList[__ActiveTask__.Task].batchTask.subscriptionId;\\r\\nvar processSequenceId = taskList[__ActiveTask__.Task].batchTask.processSequenceId;\\r\\nvar invoiceNumber = GetAttribute(\'InvoiceNumber\');\\r\\nvar vendorNum = GetAttribute(\'VENDOR_NUM\');\\r\\n\\r\\nconsole.log({\\r\\n    taskId: taskId,\\r\\n    documentId: documentId,\\r\\n    subscriptionId: subscriptionId,\\r\\n    processSequenceId: processSequenceId\\r\\n});\\r\\n\\r\\n// Dropdownfeld für Mandant\\r\\nGetSqlResult(\'SELECT * FROM CC_COMPANIES\')\\r\\n    .then(result => {\\r\\n        const companyNumIndex = result.Headers.indexOf(\'COMPANY_NUM\');\\r\\n        const nameIndex = result.Headers.indexOf(\'NAME\');\\r\\n\\r\\n        const selectValues = [];\\r\\n\\r\\n        result.Rows.forEach(row => {\\r\\n            const value = row.Cells[nameIndex];\\r\\n            const display = row.Cells[nameIndex];\\r\\n\\r\\n            selectValues.push([value, display]);\\r\\n        });\\r\\n\\r\\n        SetAttributeSelection(\'DEBITOR_NAME\', selectValues);\\r\\n\\r\\n        const sqlQueryCompany = `SELECT * FROM CC_COMPANIES WHERE NAME = \'${selectValues[0][0]}\'`;\\r\\n\\r\\n        console.log(sqlQueryCompany)\\r\\n\\r\\n        GetSqlResult(sqlQueryCompany)\\r\\n            .then(result => {\\r\\n                const headers = result.Headers;\\r\\n\\r\\n                const idxCompanyERPTenantId = headers.indexOf(\'ERPTENANT_ID\');\\r\\n                const idxCompanyCompanyNum = headers.indexOf(\'COMPANY_ID\');\\r\\n\\r\\n                const row = result.Rows[0];\\r\\n\\r\\n                const companyERPTenantId = row.Cells[idxCompanyERPTenantId];\\r\\n                const companyCompanyNum = row.Cells[idxCompanyCompanyNum];\\r\\n\\r\\n                SetAttribute(\'DEBITOR_NUM\', companyCompanyNum);\\r\\n                SetAttribute(\'debitorMapping\', `${companyERPTenantId}-${companyCompanyNum}`);\\r\\n            })\\r\\n            .catch(console.error);\\r\\n    })\\r\\n    .catch(console.error);\\r\\n\\r\\n\\r\\nlet IsDuplicate = GetAttribute(\\"IsDuplicate\\");\\r\\nif (IsDuplicate) {\\r\\n    showDuplicateWarning()\\r\\n}\\r\\n\\r\\n\\r\\nfunction showDuplicateWarning() {\\r\\n    // Definition der Fehlerdaten\\r\\n    var customValidation = [\\r\\n        {\\r\\n            \\"errorGroupId\\": \\"CustomValidation\\",\\r\\n            \\"errorGroup\\": \\"Dublettenprüfung\\",\\r\\n            \\"result\\": false,\\r\\n            \\"errorMessages\\": [\\r\\n                {\\r\\n                    \\"message\\": `Die Rechnung vom Lieferanten ${vendorNum} mit der Rechnungsnummer ${invoiceNumber} wurde bereits verarbeitet.`,\\r\\n                    \\"attributesConcerned\\": [\\"InvoiceNumber\\", \\"VENDOR_NUM\\"]\\r\\n                }\\r\\n            ]\\r\\n        }\\r\\n    ];\\r\\n    // Die Daten in das Live-Objekt taskList schreiben\\r\\n    if (taskList[taskId]) {\\r\\n        taskList[taskId].documentModels.forEach(function (doc) {\\r\\n            if (doc.documentNumber === documentId) {\\r\\n                doc.validationResults = customValidation;\\r\\n                if (typeof ElementAddFlag === \'function\') {\\r\\n                    ElementAddFlag(taskId + \\"_\\" + documentId, \\"Rejected\\");\\r\\n                }\\r\\n            }\\r\\n        });\\r\\n    }\\r\\n\\r\\n    __ValidationErrors__ = customValidation;\\r\\n    showDocumentInformation();\\r\\n}\\r\\n\\r\\n\\r\\n\\r\\n// Lupe im Feld: löst STRG + F9 im Feld aus.\\r\\n(function () {\\r\\n    const FIELD_IDS = [\\"VENDOR_NUM\\"]; // weitere Felder hier ergänzen\\r\\n    const ICON_NAME = \\"ccCtrlF9Icon\\";\\r\\n\\r\\n    FIELD_IDS.forEach(function (id) { waitForField(id, 0); });\\r\\n\\r\\n    // Wartet, bis das Feld im DOM ist (max. 10 s)\\r\\n    function waitForField(id, attempt) {\\r\\n        const input = document.getElementById(id);\\r\\n        if (input) {\\r\\n            addIcon(input);\\r\\n        } else if (attempt < 50) {\\r\\n            setTimeout(function () { waitForField(id, attempt + 1); }, 200);\\r\\n        } else {\\r\\n            console.warn(\\"[Lupe] Feld nicht gefunden: \\" + id);\\r\\n        }\\r\\n    }\\r\\n\\r\\n    function addIcon(input) {\\r\\n        const label = input.closest(\\"label\\") || input.parentElement;\\r\\n        if (label.querySelector(\'[name=\\"\' + ICON_NAME + \'\\"]\')) return; // nur einmal\\r\\n\\r\\n        const icon = document.createElement(\\"i\\");\\r\\n        icon.setAttribute(\\"name\\", ICON_NAME);\\r\\n        icon.className = \\"material-icons\\"; // nur für das Lupen-Zeichen\\r\\n        icon.textContent = \\"search\\";\\r\\n        icon.title = \\"Suche (STRG + F9)\\";\\r\\n        icon.setAttribute(\\"role\\", \\"button\\");\\r\\n        icon.setAttribute(\\"tabindex\\", \\"0\\");\\r\\n        // Aussehen direkt am Symbol, damit das CSS des Webindex es nicht ausblendet\\r\\n        icon.style.cssText =\\r\\n            \\"display:inline-flex !important; align-items:center; align-self:center;\\" +\\r\\n            \\"position:relative; z-index:2; cursor:pointer; padding:0 4px;\\" +\\r\\n            \\"font-size:22px; color:rgba(0,0,0,.54); user-select:none;\\";\\r\\n\\r\\n        // Fokus im Feld lassen, sonst startet onblur die Hintergrundabfrage (BackgroundQuery)\\r\\n        icon.addEventListener(\\"mousedown\\", function (e) { e.preventDefault(); });\\r\\n        icon.addEventListener(\\"click\\", function (e) {\\r\\n            e.preventDefault();\\r\\n            e.stopPropagation();\\r\\n            pressCtrlF9(input);\\r\\n        });\\r\\n        icon.addEventListener(\\"keydown\\", function (e) {\\r\\n            if (e.key === \\"Enter\\" || e.key === \\" \\") {\\r\\n                e.preventDefault();\\r\\n                pressCtrlF9(input);\\r\\n            }\\r\\n        });\\r\\n\\r\\n        // Direkt hinter dem Eingabefeld einfügen\\r\\n        input.insertAdjacentElement(\\"afterend\\", icon);\\r\\n        console.log(\\"[Lupe] eingefügt in \\" + input.id + \\" nach \\" + (attempt * 200) + \\" ms\\");\\r\\n    }\\r\\n\\r\\n    function pressCtrlF9(target) {\\r\\n        target.focus(); // setzt über onfocus das aktive Feld (changeActiveInput)\\r\\n        [\\"keydown\\", \\"keyup\\"].forEach(function (type) {\\r\\n            const event = new KeyboardEvent(type, {\\r\\n                key: \\"F9\\", code: \\"F9\\", ctrlKey: true, bubbles: true, cancelable: true\\r\\n            });\\r\\n            // Ältere Tasten-Handler lesen keyCode/which; das lässt sich im Konstruktor nicht setzen\\r\\n            Object.defineProperty(event, \\"keyCode\\", { get: function () { return 120; } });\\r\\n            Object.defineProperty(event, \\"which\\", { get: function () { return 120; } });\\r\\n            target.dispatchEvent(event);\\r\\n        });\\r\\n        console.log(\\"[Lupe] STRG + F9 ausgelöst in \\" + target.id);\\r\\n        TriggerAttributeQuery(\\"VENDOR_NUM\\");\\r\\n    }\\r\\n})();\\r\\n"}],"TemplateDefinition":{"TemplateId":"VENDOR_NUM","TemplateName":"VENDOR_NAME"}}],"masterDataDefinitions":[{"TableName":"CC_COMPANIES","Description":"debitorlist","Columns":[{"ColumnName":"COMPANY_NUM","Description":"Companynumber","ColumnType":1,"MaxLength":256,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"NAME","Description":"Name","ColumnType":1,"MaxLength":256,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"STR","Description":"Street","ColumnType":1,"MaxLength":256,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"CITY","Description":"City","ColumnType":1,"MaxLength":256,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"ZIP","Description":"Zipcode","ColumnType":1,"MaxLength":15,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"COUNTRY","Description":"COUNTRY","ColumnType":1,"MaxLength":15,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"DE","CreateFulltextIndex":false},{"ColumnName":"DEFAULT_CURRENCY","Description":"DEFAULT_CURRENCY","ColumnType":1,"MaxLength":15,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"EUR","CreateFulltextIndex":false},{"ColumnName":"BLACK","Description":"blacklistid","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"ERPTENANT_ID","Description":null,"ColumnType":1,"MaxLength":1024,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"COMPANY_ID","Description":null,"ColumnType":1,"MaxLength":1024,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false}]},{"TableName":"CC_VENDORS","Description":"vendorlist","Columns":[{"ColumnName":"COMPANY_NUM","Description":"Companynumber","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"VENDOR_NUM","Description":"Vendornumber","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"VENDOR_NAME","Description":"vendorname","ColumnType":1,"MaxLength":256,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":1,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"VENDOR_STR","Description":"vendorstreet","ColumnType":1,"MaxLength":256,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":5,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"VENDOR_ZIP_CODE","Description":"vendorzipcode","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":4,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"VENDOR_CITY","Description":"vendorcity","ColumnType":1,"MaxLength":256,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":3,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"VENDOR_COUNTRY","Description":"vendorcountry","ColumnType":1,"MaxLength":256,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"VENDOR_EMAIL","Description":"vendoremail","ColumnType":1,"MaxLength":256,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"VENDOR_VAT_REGISTRATION_ID","Description":"vendorVATId","ColumnType":1,"MaxLength":100,"CreateIndex":true,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":"[A-Za-z0-9]","DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"VENDOR_REGISTRATION_ID","Description":"vendorregistrationid","ColumnType":1,"MaxLength":100,"CreateIndex":true,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":"[A-Za-z0-9]","DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"VENDOR_PHONE_NUMBER","Description":"vendorphonenumber","ColumnType":1,"MaxLength":100,"CreateIndex":true,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":"[0-9]","DefaultValue":"","CreateFulltextIndex":false}]},{"TableName":"CC_VENDOR_BANK","Description":"vendorbankdata","Columns":[{"ColumnName":"COMPANY_NUM","Description":"Companynumber","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"VENDOR_NUM","Description":"Vendornumber","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"BANK_CODE","Description":"bankcode","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"BANK_ACCOUNT","Description":"bankaccount","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"IBAN","Description":"IBAN","ColumnType":1,"MaxLength":100,"CreateIndex":true,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":6,"SignificantCharacters":"[A-Za-z0-9]","DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"BIC","Description":"BIC","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false}]},{"TableName":"CC_ORDERS","Description":"orders","Columns":[{"ColumnName":"COMPANY_NUM","Description":"Companynumber","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"VENDOR_NUM","Description":"Vendornumber","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"ORDER_NUM","Description":"Ordernumber","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":true,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"PLANNED_DELIVERY_DATE","Description":"DeliveryDate","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"ORDER_DATE","Description":"OrderDate","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false}]},{"TableName":"CC_ORDERLINES","Description":"orderlines","Columns":[{"ColumnName":"COMPANY_NUM","Description":"CompanyNumber","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"ORDER_NUM","Description":"OrderNumber","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"ORDER_POS","Description":"OrderPosNumber","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"MATNR","Description":"OrderPosNumber","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"VENDOR_MATNR","Description":"OrderPosNumber","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"DESCRIPTION","Description":"OrderPosNumber","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"UNIT_PRICE","Description":"OrderPosNumber","ColumnType":2,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"QUANTITY","Description":"OrderPosNumber","ColumnType":2,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"SUM_PRICE","Description":"OrderPosNumber","ColumnType":2,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"PRICE_UNITS","Description":"OrderPosNumber","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"UNITS","Description":"OrderPosNumber","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"PLANNED_DELIVERY_DATE","Description":"DeliveryDate","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false}]},{"TableName":"CC_RECEIPTS","Description":"receipts","Columns":[{"ColumnName":"COMPANY_NUM","Description":"Companynumber","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"ORDER_NUM","Description":"Ordernumber","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"ORDER_POS","Description":"orderpos","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"QUANTITY","Description":"orderpos","ColumnType":2,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"RECEIPT_NUM","Description":"orderpos","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false}]},{"TableName":"EXTENDED_VENDOR_SETTINGS","Description":"extendet vendor settings","Columns":[{"ColumnName":"COMPANY_NUM","Description":"Companynumber","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"VENDOR_NUM","Description":"Vendornumber","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"AutoRoutingFlag","Description":"AutoRoutingFlag","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false}]},{"TableName":"CC_RULES","Description":"CC_RULES","Columns":[{"ColumnName":"ID","Description":"ID","ColumnType":0,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"EXPORTVALUE","Description":"EXPORTVALUE","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"BOOST","Description":"BOOST","ColumnType":0,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"RULEEXPRESSION","Description":"RULEEXPRESSION","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"RULESCHEMA","Description":"RULESCHEMA","ColumnType":1,"MaxLength":15,"CreateIndex":true,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"CREATEDBY","Description":"CREATEDBY","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"CREATEDATE","Description":"CREATEDATE","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"UPDATEDBY","Description":"UPDATEDBY","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"UPDATEDATE","Description":"UPDATEDATE","ColumnType":1,"MaxLength":100,"CreateIndex":true,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"DISABLED","Description":"DISABLED","ColumnType":0,"MaxLength":100,"CreateIndex":true,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false}]}],"baseMasterDataDefinitions":[{"TableName":"CC_COMPANIES","Description":"debitorlist","Columns":[{"ColumnName":"COMPANY_NUM","Description":"Companynumber","ColumnType":1,"MaxLength":256,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"NAME","Description":"Name","ColumnType":1,"MaxLength":256,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"STR","Description":"Street","ColumnType":1,"MaxLength":256,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"CITY","Description":"City","ColumnType":1,"MaxLength":256,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"ZIP","Description":"Zipcode","ColumnType":1,"MaxLength":15,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"COUNTRY","Description":"COUNTRY","ColumnType":1,"MaxLength":15,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"DE","CreateFulltextIndex":false},{"ColumnName":"DEFAULT_CURRENCY","Description":"DEFAULT_CURRENCY","ColumnType":1,"MaxLength":15,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"EUR","CreateFulltextIndex":false},{"ColumnName":"BLACK","Description":"blacklistid","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false}]},{"TableName":"CC_VENDORS","Description":"vendorlist","Columns":[{"ColumnName":"COMPANY_NUM","Description":"Companynumber","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"VENDOR_NUM","Description":"Vendornumber","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"VENDOR_NAME","Description":"vendorname","ColumnType":1,"MaxLength":256,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":1,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"VENDOR_STR","Description":"vendorstreet","ColumnType":1,"MaxLength":256,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":5,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"VENDOR_ZIP_CODE","Description":"vendorzipcode","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":4,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"VENDOR_CITY","Description":"vendorcity","ColumnType":1,"MaxLength":256,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":3,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"VENDOR_COUNTRY","Description":"vendorcountry","ColumnType":1,"MaxLength":256,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"VENDOR_EMAIL","Description":"vendoremail","ColumnType":1,"MaxLength":256,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"VENDOR_VAT_REGISTRATION_ID","Description":"vendorVATId","ColumnType":1,"MaxLength":100,"CreateIndex":true,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":"[A-Za-z0-9]","DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"VENDOR_REGISTRATION_ID","Description":"vendorregistrationid","ColumnType":1,"MaxLength":100,"CreateIndex":true,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":"[A-Za-z0-9]","DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"VENDOR_PHONE_NUMBER","Description":"vendorphonenumber","ColumnType":1,"MaxLength":100,"CreateIndex":true,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":"[0-9]","DefaultValue":"","CreateFulltextIndex":false}]},{"TableName":"CC_VENDOR_BANK","Description":"vendorbankdata","Columns":[{"ColumnName":"COMPANY_NUM","Description":"Companynumber","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"VENDOR_NUM","Description":"Vendornumber","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"BANK_CODE","Description":"bankcode","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"BANK_ACCOUNT","Description":"bankaccount","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"IBAN","Description":"IBAN","ColumnType":1,"MaxLength":100,"CreateIndex":true,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":6,"SignificantCharacters":"[A-Za-z0-9]","DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"BIC","Description":"BIC","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false}]},{"TableName":"CC_ORDERS","Description":"orders","Columns":[{"ColumnName":"COMPANY_NUM","Description":"Companynumber","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"VENDOR_NUM","Description":"Vendornumber","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"ORDER_NUM","Description":"Ordernumber","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":true,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"PLANNED_DELIVERY_DATE","Description":"DeliveryDate","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"ORDER_DATE","Description":"OrderDate","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false}]},{"TableName":"CC_ORDERLINES","Description":"orderlines","Columns":[{"ColumnName":"COMPANY_NUM","Description":"CompanyNumber","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"ORDER_NUM","Description":"OrderNumber","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"ORDER_POS","Description":"OrderPosNumber","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"MATNR","Description":"OrderPosNumber","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"VENDOR_MATNR","Description":"OrderPosNumber","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"DESCRIPTION","Description":"OrderPosNumber","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"UNIT_PRICE","Description":"OrderPosNumber","ColumnType":2,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"QUANTITY","Description":"OrderPosNumber","ColumnType":2,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"SUM_PRICE","Description":"OrderPosNumber","ColumnType":2,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"PRICE_UNITS","Description":"OrderPosNumber","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"UNITS","Description":"OrderPosNumber","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"PLANNED_DELIVERY_DATE","Description":"DeliveryDate","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false}]},{"TableName":"CC_RECEIPTS","Description":"receipts","Columns":[{"ColumnName":"COMPANY_NUM","Description":"Companynumber","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"ORDER_NUM","Description":"Ordernumber","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"ORDER_POS","Description":"orderpos","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"QUANTITY","Description":"orderpos","ColumnType":2,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"RECEIPT_NUM","Description":"orderpos","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false}]},{"TableName":"EXTENDED_VENDOR_SETTINGS","Description":"extendet vendor settings","Columns":[{"ColumnName":"COMPANY_NUM","Description":"Companynumber","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"VENDOR_NUM","Description":"Vendornumber","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"AutoRoutingFlag","Description":"AutoRoutingFlag","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false}]},{"TableName":"CC_RULES","Description":"CC_RULES","Columns":[{"ColumnName":"ID","Description":"ID","ColumnType":0,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"EXPORTVALUE","Description":"EXPORTVALUE","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"BOOST","Description":"BOOST","ColumnType":0,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"RULEEXPRESSION","Description":"RULEEXPRESSION","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"RULESCHEMA","Description":"RULESCHEMA","ColumnType":1,"MaxLength":15,"CreateIndex":true,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"CREATEDBY","Description":"CREATEDBY","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"CREATEDATE","Description":"CREATEDATE","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"UPDATEDBY","Description":"UPDATEDBY","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"UPDATEDATE","Description":"UPDATEDATE","ColumnType":1,"MaxLength":100,"CreateIndex":true,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"DISABLED","Description":"DISABLED","ColumnType":0,"MaxLength":100,"CreateIndex":true,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false}]}],"httpDataSources":[],"appSettings":{"DocumentClassAttributeId":null,"DefaultLayout":"INV_Standard","TenantDbConnectionString":null},"dihAppName":"dih"}');

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
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	let __webpack_exports__ = __webpack_require__("./src/forms/form.ts");
/******/ 	window.OnboardingGevisECMDocumentReaderFormBundle = __webpack_exports__;
/******/ 	
/******/ })()
;
//# sourceMappingURL=formBundle.js.map