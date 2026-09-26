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

/***/ "./src/scripts/preExport.ts"
/*!**********************************!*\
  !*** ./src/scripts/preExport.ts ***!
  \**********************************/
(module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const logger_1 = __webpack_require__(/*! ../../../../helper/utils/logger */ "../../helper/utils/logger.ts");
/**
 * "Rechnungsleser PreExport": wird vom Rechnungsleser vor dem Export
 * aufgerufen (Extension Point "IR_Business_BeforeExportHook", Typ
 * ScriptingApp, Profil "PreExportScript" - hinterlegt vom Onboarding-Formular).
 * Bekommt die Attribute des Dokuments als JSON und liefert sie verändert
 * zurück:
 *  - DocumentType wird zum ERP-Code: CreditAdvice -> "3", alles andere
 *    (Invoice, CorrectionOfInvoice, unbekannt) -> "2".
 *    Alle übrigen Attribute bleiben unverändert.
 *
 * Wird der Hook erneut mit einem bereits umgesetzten Dokument aufgerufen
 * (DocumentType ist dann schon "2"/"3"), greift der Standardfall - der Code
 * bleibt "2" bzw. wird aus "3" zu "2"; daher "3" ausdrücklich beibehalten.
 */
const logger = (0, logger_1.initLogger)(logger_1.LogLevel.INFO);
const DOCUMENT_TYPE_FIELD = "DocumentType";
const MAPPING = {
    Invoice: "2",
    CreditAdvice: "3",
    CorrectionOfInvoice: "2",
};
// Bereits umgesetzte Codes (erneuter Aufruf) nicht verändern.
const KNOWN_CODES = new Set(["2", "3"]);
module.exports = async (req, res) => {
    try {
        const body = parseBody(req);
        const documentType = String(body[DOCUMENT_TYPE_FIELD] ?? "");
        const mapped = MAPPING[documentType];
        if (mapped) {
            body[DOCUMENT_TYPE_FIELD] = mapped;
        }
        else if (!KNOWN_CODES.has(documentType)) {
            body[DOCUMENT_TYPE_FIELD] = "2";
        }
        logger.info(`DocumentType "${documentType}" -> "${body[DOCUMENT_TYPE_FIELD]}".`);
        res.status(200).set("Content-Type", "application/json").send(JSON.stringify(body));
    }
    catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        logger.error(`Fehler: ${message}`);
        res.status(500).set("Content-Type", "application/json").send(JSON.stringify({ error: message }));
    }
};
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
/******/ 	let __webpack_exports__ = __webpack_require__("./src/scripts/preExport.ts");
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;
//# sourceMappingURL=preExport.js.map