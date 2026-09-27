/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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

/***/ "./src/scripts/script.ts"
/*!*******************************!*\
  !*** ./src/scripts/script.ts ***!
  \*******************************/
(module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const logger_1 = __webpack_require__(/*! ../../../../helper/utils/logger */ "../../helper/utils/logger.ts");
let logger = (0, logger_1.getLogger)();
/**
 * "Rechnung aus Bestellung": liest Umgebungen, Firmen, Bestellungen und
 * Lieferanten aus Business Central (per App-Registrierung, client_credentials)
 * für das Formular (src/forms/form.ts), das daraus die Rechnungs-PDF erzeugt.
 *
 * Aufruf per POST mit { method, environment?, companyId?, orderNo? }:
 * - getEnvironments                          -> { environments: [{ name, type }] }
 * - getCompanies  (environment)              -> { companies: [{ id, name }] }
 * - getOrders     (environment, companyId)   -> { orders: [...] }
 * - getOrder      (environment, companyId, orderNo) -> { order, lines, vendor, buyer }
 *   (buyer = companyInformation der Firma, für die E-Rechnung)
 * Fehler: Status 4xx/500 mit { error }.
 *
 * customerVariables (von der Toolbox nur beim Neuanlegen gesetzt):
 * erpTenantId, clientId, clientSecret (verschlüsselt). Das Business-Central-
 * Token bleibt nur im Speicher der laufenden Script-Instanz - es wird NICHT in
 * die Script-Variablen geschrieben (das würde das Client-Secret überschreiben).
 *
 * VERSION_COUNTER unten NICHT umbenennen (siehe generateTargetForms.js) und
 * synchron zum VERSION_COUNTER in src/forms/form.ts halten -
 * .github/workflows/publish-bundles.yml stempelt beim Publish in BEIDE Bundles
 * denselben nächsten Stand (der Wert hier ist nur ein Platzhalter).
 */
const VERSION_COUNTER = 4;
const BC_API = "https://api.businesscentral.dynamics.com";
// Eigene GWS-API in Business Central (Bestellungen inkl. Zeilen, Lieferanten).
const GWS_API = "api/gws/ecm/v1.0";
class RequestError extends Error {
    constructor(message, status = 400) {
        super(message);
        this.status = status;
    }
}
module.exports = async (req, res) => {
    try {
        const body = parseBody(req);
        const settings = {
            tenantId: String(req.var("erpTenantId") ?? "").trim(),
            clientId: String(req.var("clientId") ?? "").trim(),
            clientSecret: String(req.var("clientSecret") ?? ""),
        };
        if (!settings.tenantId || !settings.clientId || !settings.clientSecret) {
            throw new RequestError("Script-Variablen erpTenantId, clientId und clientSecret müssen gesetzt sein.", 500);
        }
        const result = await dispatch(settings, body);
        res.status(200).set("Content-Type", "application/json").send(JSON.stringify(result));
    }
    catch (error) {
        const status = error instanceof RequestError ? error.status : 500;
        logger.error(`Error: ${error}`);
        res.status(status).set("Content-Type", "application/json").send(JSON.stringify({ error: error instanceof Error ? error.message : String(error) }));
    }
};
async function dispatch(settings, body) {
    const method = String(body.method ?? "");
    switch (method) {
        case "getEnvironments": {
            const data = await bcGet(settings, `${BC_API}/admin/v2.11/applications/businesscentral/environments`);
            return {
                environments: (data.value ?? []).map((e) => ({ name: String(e.name ?? ""), type: String(e.type ?? "") })).filter((e) => e.name),
            };
        }
        case "getCompanies": {
            const environment = requireEnvironment(body);
            const data = await bcGetAll(settings, `${bcBase(settings, environment)}/api/v2.0/companies`);
            return {
                companies: data.map((c) => ({ id: String(c.id ?? ""), name: String(c.displayName || c.name || c.id || "") })).filter((c) => c.id),
            };
        }
        case "getOrders": {
            const environment = requireEnvironment(body);
            const companyId = requireCompanyId(body);
            const data = await bcGetAll(settings, `${companyBase(settings, environment, companyId)}/purchaseOrders`);
            return {
                orders: data.map((o) => ({
                    no: String(o.no ?? ""),
                    vendorNo: String(o.buyFromVendorNo ?? ""),
                    vendorName: String(o.buyFromVendorName ?? ""),
                    date: String(o.orderDate ?? o.documentDate ?? o.systemCreatedAt ?? ""),
                })).filter((o) => o.no),
            };
        }
        case "getOrder": {
            const environment = requireEnvironment(body);
            const companyId = requireCompanyId(body);
            const orderNo = String(body.orderNo ?? "").trim();
            if (!orderNo)
                throw new RequestError("orderNo fehlt.");
            return getOrder(settings, environment, companyId, orderNo);
        }
        default:
            throw new RequestError(`Unbekannte Methode "${method}".`);
    }
}
// Bestellung samt Zeilen und Lieferant. Zeilen stecken entweder schon in der
// Bestellung (purchaseOrderLines) oder werden per $expand nachgeladen.
async function getOrder(settings, environment, companyId, orderNo) {
    const base = companyBase(settings, environment, companyId);
    const filter = `$filter=${encodeURIComponent(`no eq ${odataString(orderNo)}`)}`;
    let order = (await bcGet(settings, `${base}/purchaseOrders?${filter}`)).value?.[0];
    if (!order)
        throw new RequestError(`Bestellung "${orderNo}" nicht gefunden.`, 404);
    if (!Array.isArray(order.purchaseOrderLines)) {
        try {
            const expanded = (await bcGet(settings, `${base}/purchaseOrders?${filter}&$expand=purchaseOrderLines`)).value?.[0];
            if (expanded)
                order = expanded;
        }
        catch (error) {
            logger.warn(`Zeilen zu Bestellung "${orderNo}" nicht per $expand ladbar: ${error}`);
        }
    }
    const lines = Array.isArray(order.purchaseOrderLines) ? order.purchaseOrderLines : [];
    delete order.purchaseOrderLines;
    let vendor = null;
    if (order.buyFromVendorNo) {
        const vendorFilter = `$filter=${encodeURIComponent(`no eq ${odataString(String(order.buyFromVendorNo))}`)}`;
        vendor = (await bcGet(settings, `${base}/vendors?${vendorFilter}`)).value?.[0] ?? null;
        // USt-IdNr. für die E-Rechnung: liefert die GWS-API sie nicht mit, aus der
        // Standard-API (vendors.taxRegistrationNumber) ergänzen.
        if (vendor && !vendorVatId(vendor)) {
            try {
                const standardFilter = `$filter=${encodeURIComponent(`number eq ${odataString(String(order.buyFromVendorNo))}`)}`;
                const standard = (await bcGet(settings, `${bcBase(settings, environment)}/api/v2.0/companies(${companyId})/vendors?${standardFilter}`)).value?.[0];
                if (standard?.taxRegistrationNumber)
                    vendor.taxRegistrationNumber = standard.taxRegistrationNumber;
            }
            catch (error) {
                logger.warn(`USt-IdNr. des Lieferanten nicht ladbar: ${error}`);
            }
        }
    }
    // Käufer = die Firma selbst (Anschrift, E-Mail, Währung) für die E-Rechnung;
    // Standard-API "companyInformation". Fehlt sie, bleibt buyer leer.
    let buyer = null;
    try {
        buyer = (await bcGet(settings, `${bcBase(settings, environment)}/api/v2.0/companies(${companyId})/companyInformation`)).value?.[0] ?? null;
    }
    catch (error) {
        logger.warn(`Firmendaten (companyInformation) nicht ladbar: ${error}`);
    }
    return { order, lines, vendor, buyer };
}
function vendorVatId(vendor) {
    return String(vendor?.vatRegistrationNo ?? vendor?.vatRegistrationNumber ?? vendor?.taxRegistrationNumber ?? "").trim();
}
function requireEnvironment(body) {
    const environment = String(body.environment ?? "").trim();
    // Umgebungsnamen in BC: Buchstaben, Ziffern, "-" und "_".
    if (!/^[A-Za-z0-9_-]{1,64}$/.test(environment))
        throw new RequestError("Ungültige oder fehlende Umgebung.");
    return environment;
}
function requireCompanyId(body) {
    const companyId = String(body.companyId ?? "").trim();
    if (!/^[0-9a-fA-F-]{36}$/.test(companyId))
        throw new RequestError("Ungültige oder fehlende Firmen-ID.");
    return companyId;
}
function bcBase(settings, environment) {
    return `${BC_API}/v2.0/${encodeURIComponent(settings.tenantId)}/${encodeURIComponent(environment)}`;
}
function companyBase(settings, environment, companyId) {
    return `${bcBase(settings, environment)}/${GWS_API}/companies(${companyId})`;
}
function odataString(value) {
    return `'${value.replace(/'/g, "''")}'`;
}
// ---------------------------------------------------------------------------
// Business-Central-Zugriff
// ---------------------------------------------------------------------------
// Token nur im Speicher (bleibt erhalten, solange die Script-Instanz warm ist).
let cachedToken;
async function getAccessToken(settings) {
    const key = `${settings.tenantId}|${settings.clientId}`;
    if (cachedToken && cachedToken.key === key && cachedToken.expiresAt > Date.now() + 60000) {
        return cachedToken.token;
    }
    const params = new URLSearchParams({
        grant_type: "client_credentials",
        scope: `${BC_API}/.default`,
        client_id: settings.clientId,
        client_secret: settings.clientSecret,
    });
    const response = await fetch(`https://login.microsoftonline.com/${encodeURIComponent(settings.tenantId)}/oauth2/v2.0/token`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params,
    });
    const text = await response.text();
    if (!response.ok) {
        throw new Error(`Anmeldung bei Microsoft fehlgeschlagen (${response.status}): ${text.slice(0, 500)}`);
    }
    const data = JSON.parse(text);
    cachedToken = { key, token: data.access_token, expiresAt: Date.now() + Number(data.expires_in ?? 0) * 1000 };
    return cachedToken.token;
}
async function bcGet(settings, url) {
    const token = await getAccessToken(settings);
    const response = await fetch(url, { headers: { Authorization: `Bearer ${token}`, Accept: "application/json" } });
    const text = await response.text();
    if (!response.ok) {
        throw new Error(`Business Central antwortet mit ${response.status} (${url.replace(BC_API, "")}): ${text.slice(0, 500)}`);
    }
    return JSON.parse(text);
}
// Liste inkl. Folgeseiten (@odata.nextLink).
async function bcGetAll(settings, url) {
    const items = [];
    let next = url;
    while (next) {
        const page = await bcGet(settings, next);
        items.push(...(page.value ?? []));
        next = page["@odata.nextLink"];
    }
    return items;
}
function parseBody(req) {
    try {
        const body = req.json?.();
        return body && typeof body === "object" ? body : {};
    }
    catch {
        return {};
    }
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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	let __webpack_exports__ = __webpack_require__("./src/scripts/script.ts");
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;
//# sourceMappingURL=script.js.map