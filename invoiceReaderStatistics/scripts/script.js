/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "../../node_modules/dotenv/lib/main.js"
/*!*********************************************!*\
  !*** ../../node_modules/dotenv/lib/main.js ***!
  \*********************************************/
(module, __unused_webpack_exports, __webpack_require__) {

/* @flow */
/*::

type DotenvParseOptions = {
  debug?: boolean
}

// keys and values from src
type DotenvParseOutput = { [string]: string }

type DotenvConfigOptions = {
  path?: string, // path to .env file
  encoding?: string, // encoding of .env file
  debug?: string // turn on logging for debugging purposes
}

type DotenvConfigOutput = {
  parsed?: DotenvParseOutput,
  error?: Error
}

*/

const fs = __webpack_require__(/*! fs */ "fs")
const path = __webpack_require__(/*! path */ "path")

function log (message /*: string */) {
  console.log(`[dotenv][DEBUG] ${message}`)
}

const NEWLINE = '\n'
const RE_INI_KEY_VAL = /^\s*([\w.-]+)\s*=\s*(.*)?\s*$/
const RE_NEWLINES = /\\n/g
const NEWLINES_MATCH = /\n|\r|\r\n/

// Parses src into an Object
function parse (src /*: string | Buffer */, options /*: ?DotenvParseOptions */) /*: DotenvParseOutput */ {
  const debug = Boolean(options && options.debug)
  const obj = {}

  // convert Buffers before splitting into lines and processing
  src.toString().split(NEWLINES_MATCH).forEach(function (line, idx) {
    // matching "KEY' and 'VAL' in 'KEY=VAL'
    const keyValueArr = line.match(RE_INI_KEY_VAL)
    // matched?
    if (keyValueArr != null) {
      const key = keyValueArr[1]
      // default undefined or missing values to empty string
      let val = (keyValueArr[2] || '')
      const end = val.length - 1
      const isDoubleQuoted = val[0] === '"' && val[end] === '"'
      const isSingleQuoted = val[0] === "'" && val[end] === "'"

      // if single or double quoted, remove quotes
      if (isSingleQuoted || isDoubleQuoted) {
        val = val.substring(1, end)

        // if double quoted, expand newlines
        if (isDoubleQuoted) {
          val = val.replace(RE_NEWLINES, NEWLINE)
        }
      } else {
        // remove surrounding whitespace
        val = val.trim()
      }

      obj[key] = val
    } else if (debug) {
      log(`did not match key and value when parsing line ${idx + 1}: ${line}`)
    }
  })

  return obj
}

// Populates process.env from .env file
function config (options /*: ?DotenvConfigOptions */) /*: DotenvConfigOutput */ {
  let dotenvPath = path.resolve(process.cwd(), '.env')
  let encoding /*: string */ = 'utf8'
  let debug = false

  if (options) {
    if (options.path != null) {
      dotenvPath = options.path
    }
    if (options.encoding != null) {
      encoding = options.encoding
    }
    if (options.debug != null) {
      debug = true
    }
  }

  try {
    // specifying an encoding returns a string instead of a buffer
    const parsed = parse(fs.readFileSync(dotenvPath, { encoding }), { debug })

    Object.keys(parsed).forEach(function (key) {
      if (!Object.prototype.hasOwnProperty.call(process.env, key)) {
        process.env[key] = parsed[key]
      } else if (debug) {
        log(`"${key}" is already defined in \`process.env\` and will not be overwritten`)
      }
    })

    return { parsed }
  } catch (e) {
    return { error: e }
  }
}

module.exports.config = config
module.exports.parse = parse


/***/ },

/***/ "../../helper/identityprovider/getToken.ts"
/*!*************************************************!*\
  !*** ../../helper/identityprovider/getToken.ts ***!
  \*************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getToken = getToken;
const performHttpRequest_1 = __webpack_require__(/*! ../performHttpRequest/performHttpRequest */ "../../helper/performHttpRequest/performHttpRequest.ts");
/**
 * Retrieves a token from the identity provider.
 *
 * @param baseUri - The base URI of the identity provider.
 * @param token - The bearer token used for authorization.
 * @returns A promise that resolves to an `ApiResponse` containing the `GetToken` data.
 */
async function getToken(baseUri, token) {
    const url = `${baseUri}/identityprovider/login`;
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

/***/ "../../helper/performHttpRequest/performHttpRequest.ts"
/*!*************************************************************!*\
  !*** ../../helper/performHttpRequest/performHttpRequest.ts ***!
  \*************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

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

/***/ "../../helper/utils/credentials.ts"
/*!*****************************************!*\
  !*** ../../helper/utils/credentials.ts ***!
  \*****************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Credentials = exports.APICredentials = void 0;
const dotenv = __importStar(__webpack_require__(/*! dotenv */ "../../node_modules/dotenv/lib/main.js"));
const path = __importStar(__webpack_require__(/*! path */ "path"));
const getToken_1 = __webpack_require__(/*! ./../identityprovider/getToken */ "../../helper/identityprovider/getToken.ts");
dotenv.config({ path: path.resolve(__dirname, '../../../helper/utils/.env') });
class APICredentials {
    constructor(name, baseUri, apiKey, AuthsessionId, Expire) {
        this.name = name;
        this.baseUri = baseUri;
        this.apiKey = apiKey;
        this.AuthsessionId = AuthsessionId;
        this.Expire = Expire;
    }
    static async fromRequest(req) {
        const baseUri = req.var("baseUri");
        const apiKey = req.var("apiKey");
        const token = await (0, getToken_1.getToken)(baseUri, apiKey);
        if (!token?.body?.AuthSessionId || !token?.body?.Expire) {
            throw new Error("Token response is missing required fields.");
        }
        return new APICredentials("", baseUri, apiKey, token.body.AuthSessionId, token.body.Expire);
    }
    static async findByName(name) {
        const match = exports.Credentials.find(c => c.name === name);
        if (!match) {
            throw new Error(`Credentials not found for '${name}'`);
        }
        const token = await (0, getToken_1.getToken)(match.baseUri, match.apiKey);
        if (!token?.body?.AuthSessionId || !token?.body?.Expire) {
            throw new Error("Token response is missing required fields.");
        }
        return new APICredentials(match.name, match.baseUri, match.apiKey, token.body.AuthSessionId, token.body.Expire);
    }
}
exports.APICredentials = APICredentials;
exports.Credentials = [];
for (const key in process.env) {
    if (key.startsWith('CREDENTIALS_')) {
        const name = key.replace('CREDENTIALS_', '').toLowerCase();
        const [baseUri, apiKey] = (process.env[key] ?? '').split('|');
        if (!baseUri || !apiKey) {
            continue;
        }
        exports.Credentials.push({ name, baseUri, apiKey });
    }
}


/***/ },

/***/ "../../helper/utils/logger.ts"
/*!************************************!*\
  !*** ../../helper/utils/logger.ts ***!
  \************************************/
(__unused_webpack_module, exports) {

"use strict";

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

/***/ "../../helper/webindexlayouter/executeSqlQuery.ts"
/*!********************************************************!*\
  !*** ../../helper/webindexlayouter/executeSqlQuery.ts ***!
  \********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.executeSqlQuery = executeSqlQuery;
const performHttpRequest_1 = __webpack_require__(/*! ../performHttpRequest/performHttpRequest */ "../../helper/performHttpRequest/performHttpRequest.ts");
/**
 * Führt eine SQL-Abfrage auf der Datenbank einer App aus - wie der
 * Webindex-Designer (z.B. für eigene Dublettenprüfungen):
 * POST /webindexlayouter/api/v1/apps/<app>/sqlResult
 * mit { connectionString: null, sqlQuery }.
 * connectionString null = Standard-Datenbank der App (z.B. die Protokoll-
 * Tabellen CCLogDocuments/CCLogAttributes des Rechnungslesers).
 *
 * @param token - API-Key; leer = Browser-Session.
 * @param app - App-Name, z.B. "classcon-documentreader".
 */
async function executeSqlQuery(baseUri, token, app, sqlQuery, connectionString = null) {
    return await (0, performHttpRequest_1.performHttpRequest)(`${baseUri}/webindexlayouter/api/v1/apps/${encodeURIComponent(app)}/sqlResult`, {
        method: "POST",
        headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ connectionString, sqlQuery }),
    });
}


/***/ },

/***/ "./src/scripts/script.ts"
/*!*******************************!*\
  !*** ./src/scripts/script.ts ***!
  \*******************************/
(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const credentials_1 = __webpack_require__(/*! ../../../../helper/utils/credentials */ "../../helper/utils/credentials.ts");
const executeSqlQuery_1 = __webpack_require__(/*! ../../../../helper/webindexlayouter/executeSqlQuery */ "../../helper/webindexlayouter/executeSqlQuery.ts");
const logger_1 = __webpack_require__(/*! ../../../../helper/utils/logger */ "../../helper/utils/logger.ts");
let logger = (0, logger_1.getLogger)();
/**
 * "Rechnungsleser-Auswertung": zählt die vom Rechnungsleser verarbeiteten
 * Rechnungen je Mandant (Attribut DEBITOR_NUM) und Monat - per SQL auf den
 * Protokoll-Tabellen des Rechnungslesers (CCLogDocuments/CCLogAttributes) über
 * den Webindex-Designer. Läuft mit dem API-Key aus den Script-Variablen; das
 * Formular (src/forms/form.ts) ruft das Script auf und stellt das Ergebnis dar.
 *
 * VERSION_COUNTER unten NICHT umbenennen (siehe generateTargetForms.js) und
 * synchron zum VERSION_COUNTER in src/forms/form.ts halten -
 * .github/workflows/publish-bundles.yml stempelt beim Publish in BEIDE Bundles
 * denselben nächsten Stand (der Wert hier ist nur ein Platzhalter).
 */
const VERSION_COUNTER = 2;
const APP = "classcon-documentreader";
const SQL_QUERY = `SELECT
  YEAR(doc.LogTime) AS Year,
  DATENAME(MONTH, doc.LogTime) AS Month,
  Attribute_After as Company,
  COUNT(*) AS Count
FROM
  CCLogAttributes AS att
  INNER JOIN CCLogDocuments AS doc ON att.DocumentID = doc.DocumentID
WHERE
  Attribute_Name = 'DEBITOR_NUM'
GROUP BY
  YEAR(doc.LogTime),
  DATENAME(MONTH, doc.LogTime),
  MONTH(doc.LogTime),
  Attribute_After
ORDER BY
  Attribute_After DESC,
  Year DESC,
  MONTH(doc.LogTime) DESC,
  Count DESC;`;
module.exports = async (req, res) => {
    const credentials = new credentials_1.APICredentials("", req.var("baseUri"), req.var("apiKey"), "", new Date());
    try {
        const response = await (0, executeSqlQuery_1.executeSqlQuery)(credentials.baseUri, credentials.apiKey, APP, SQL_QUERY);
        const rows = toRows(response.body);
        if (!rows) {
            const sample = (typeof response.body === "string" ? response.body : JSON.stringify(response.body)).slice(0, 300);
            throw new Error(`Unbekanntes Antwortformat von sqlResult: ${sample}`);
        }
        const result = { rows };
        logger.info(`${rows.length} Zeilen ermittelt.`);
        res.status(200).set("Content-Type", "application/json").send(JSON.stringify(result));
    }
    catch (error) {
        logger.error(`Error: ${error}`);
        res.status(500).set("Content-Type", "application/json").send(JSON.stringify({ error: String(error) }));
    }
};
// ---------------------------------------------------------------------------
// Antwort von sqlResult tolerant in Zeilen umwandeln: Liste von Objekten
// (direkt oder in einem Feld wie "rows"/"data"/"result") oder Spalten +
// Werte-Arrays. Spaltennamen ohne Rücksicht auf Groß-/Kleinschreibung.
// ---------------------------------------------------------------------------
function toRows(body) {
    let data = body;
    if (typeof data === "string") {
        try {
            data = JSON.parse(data);
        }
        catch {
            return undefined;
        }
    }
    const list = Array.isArray(data)
        ? data
        : findArray(data, ["rows", "data", "result", "results", "items", "values", "records", "table"]);
    if (!list)
        return undefined;
    const columns = !Array.isArray(data) ? columnNames(data) : undefined;
    const rows = list.map((entry) => toRow(entry, columns));
    return rows.every((row) => !!row) ? rows : undefined;
}
function findArray(data, keys) {
    if (!data || typeof data !== "object")
        return undefined;
    const lookup = new Map(Object.entries(data).map(([key, value]) => [key.toLowerCase(), value]));
    for (const key of keys) {
        const value = lookup.get(key);
        if (Array.isArray(value))
            return value;
        const nested = findArray(value, keys);
        if (nested)
            return nested;
    }
    return undefined;
}
function columnNames(data) {
    const lookup = new Map(Object.entries(data ?? {}).map(([key, value]) => [key.toLowerCase(), value]));
    const columns = lookup.get("columns") ?? lookup.get("columnnames") ?? lookup.get("headers") ?? lookup.get("fields");
    return Array.isArray(columns)
        ? columns.map((column) => String(typeof column === "object" ? column?.name ?? column?.Name ?? column?.columnName ?? "" : column))
        : undefined;
}
function toRow(entry, columns) {
    let record;
    if (Array.isArray(entry) && columns) {
        record = Object.fromEntries(columns.map((name, i) => [name, entry[i]]));
    }
    else if (entry && typeof entry === "object") {
        record = entry;
    }
    else {
        return undefined;
    }
    const lookup = new Map(Object.entries(record).map(([key, value]) => [key.toLowerCase(), value]));
    const year = Number(lookup.get("year"));
    const count = Number(lookup.get("count"));
    if (!Number.isFinite(year) || !Number.isFinite(count))
        return undefined;
    return {
        year,
        month: String(lookup.get("month") ?? ""),
        company: String(lookup.get("company") ?? ""),
        count,
    };
}


/***/ },

/***/ "fs"
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
(module) {

"use strict";
module.exports = require("fs");

/***/ },

/***/ "path"
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
(module) {

"use strict";
module.exports = require("path");

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
/******/ 	let __webpack_exports__ = __webpack_require__("./src/scripts/script.ts");
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;
//# sourceMappingURL=script.js.map