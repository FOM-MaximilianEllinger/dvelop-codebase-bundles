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

/***/ "../../helper/identityprovider/getAllUsers.ts"
/*!****************************************************!*\
  !*** ../../helper/identityprovider/getAllUsers.ts ***!
  \****************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

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

/***/ "../../helper/identityprovider/getGroup.ts"
/*!*************************************************!*\
  !*** ../../helper/identityprovider/getGroup.ts ***!
  \*************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getGroup = getGroup;
const performHttpRequest_1 = __webpack_require__(/*! ../performHttpRequest/performHttpRequest */ "../../helper/performHttpRequest/performHttpRequest.ts");
/**
 * Retrieves a group from the identity provider using the specified group ID.
 *
 * @param baseUri - The base URI of the identity provider.
 * @param token - The authorization token to access the identity provider.
 * @param id - The unique identifier of the group to retrieve.
 * @returns A promise that resolves to an `ApiResponse` containing the group details.
 *
 * @template GetGroup - The type representing the group details in the response.
 */
async function getGroup(baseUri, token, id) {
    const url = `${baseUri}/identityprovider/scim/Groups/${id}`;
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

/***/ "../../helper/identityprovider/getGroups.ts"
/*!**************************************************!*\
  !*** ../../helper/identityprovider/getGroups.ts ***!
  \**************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

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

/***/ "../../helper/identityprovider/getIdentityproviderConfig.ts"
/*!******************************************************************!*\
  !*** ../../helper/identityprovider/getIdentityproviderConfig.ts ***!
  \******************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getIdentityproviderConfig = getIdentityproviderConfig;
const performHttpRequest_1 = __webpack_require__(/*! ../performHttpRequest/performHttpRequest */ "../../helper/performHttpRequest/performHttpRequest.ts");
/**
 * Fetches the identity provider configuration from the specified base URI.
 *
 * @param baseUri - The base URI of the API endpoint.
 * @param token - The authorization token to be used for the request.
 * @returns A promise that resolves to an `ApiResponse` containing the identity provider configuration.
 *
 * @template GetIdentityproviderConfig - The type representing the identity provider configuration response.
 */
async function getIdentityproviderConfig(baseUri, token) {
    const url = `${baseUri}/identityprovider/config/cloud`;
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

/***/ "../../helper/identityprovider/getUsers.ts"
/*!*************************************************!*\
  !*** ../../helper/identityprovider/getUsers.ts ***!
  \*************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

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

/***/ "./src/scripts/script.ts"
/*!*******************************!*\
  !*** ./src/scripts/script.ts ***!
  \*******************************/
(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const credentials_1 = __webpack_require__(/*! ../../../../helper/utils/credentials */ "../../helper/utils/credentials.ts");
const getAllUsers_1 = __webpack_require__(/*! ../../../../helper/identityprovider/getAllUsers */ "../../helper/identityprovider/getAllUsers.ts");
const getGroups_1 = __webpack_require__(/*! ../../../../helper/identityprovider/getGroups */ "../../helper/identityprovider/getGroups.ts");
const getGroup_1 = __webpack_require__(/*! ../../../../helper/identityprovider/getGroup */ "../../helper/identityprovider/getGroup.ts");
const getIdentityproviderConfig_1 = __webpack_require__(/*! ../../../../helper/identityprovider/getIdentityproviderConfig */ "../../helper/identityprovider/getIdentityproviderConfig.ts");
const logger_1 = __webpack_require__(/*! ../../../../helper/utils/logger */ "../../helper/utils/logger.ts");
let logger = (0, logger_1.getLogger)();
// Eigener Versionszähler, analog zu TOOLBOX_VERSION_COUNTER in
// projects/Toolbox/src/form.ts: publish-bundles.yml stempelt bei jedem
// Publish den nächsten Stand ins veröffentlichte Bundle (der Wert hier ist nur
// ein Platzhalter und wird nicht hochgezählt), damit die Toolbox (loadedTools-Grid)
// erkennen kann, ob auf GitHub eine neuere Version dieses Tools liegt. Heißt
// wie in jedem Toolbox-Tool-Projekt einheitlich "VERSION_COUNTER".
const VERSION_COUNTER = 13;
module.exports = async (req, res) => {
    const credentials = new credentials_1.APICredentials("", req.var("baseUri"), req.var("apiKey"), "", new Date());
    await main(credentials, req, res);
};
async function main(credentials, req, res) {
    try {
        logger.debug("Start");
        let identityProviderConfig = await (0, getIdentityproviderConfig_1.getIdentityproviderConfig)(credentials.baseUri, credentials.apiKey);
        logger.debug(JSON.stringify(identityProviderConfig));
        // Technische Benutzer = ALLE Mitglieder der in der Identityprovider-
        // Konfiguration hinterlegten technischen Benutzergruppe(n).
        const technicalGroupNames = new Set((identityProviderConfig.body.provider ?? [])
            .map((provider) => provider?.technicalUserGroup)
            .filter((name) => !!name));
        const groups = await (0, getGroups_1.getGroups)(credentials.baseUri, credentials.apiKey);
        const technicalGroupIds = (groups.body.resources ?? [])
            .filter((group) => group.id && group.displayName && technicalGroupNames.has(group.displayName))
            .map((group) => group.id);
        const technicalUserIds = new Set();
        for (const groupId of technicalGroupIds) {
            const group = await (0, getGroup_1.getGroup)(credentials.baseUri, credentials.apiKey, groupId);
            for (const member of group.body.members ?? []) {
                if (member.value) {
                    technicalUserIds.add(member.value);
                }
            }
        }
        if (technicalGroupNames.size > 0 && technicalGroupIds.length === 0) {
            logger.warn(`Technische Benutzergruppe(n) ${[...technicalGroupNames].join(", ")} nicht gefunden.`);
        }
        const users = (await (0, getAllUsers_1.getAllUsers)(credentials.baseUri, credentials.apiKey))
            .map((user) => toLicencedUser(user, technicalUserIds));
        const result = {
            total: users.length,
            paid: users.filter((user) => user.paid).length,
            technical: users.filter((user) => user.technical).length,
            gwsDomain: users.filter((user) => user.gwsDomain).length,
            users,
        };
        logger.debug(JSON.stringify(result));
        logger.debug(`Benutzer gesamt: ${result.total}, davon bezahlt: ${result.paid}`);
        res.status(200).set("Content-Type", "application/json").send(JSON.stringify(result));
        logger.info("End");
    }
    catch (error) {
        logger.error(`Error: ${error}`);
        res
            .status(500)
            .set("Content-Type", "application/json")
            .send(JSON.stringify({ error: String(error) }));
    }
}
const GWS_DOMAIN = "@gws.ms";
function toLicencedUser(user, technicalUserIds) {
    const email = user.emails?.[0]?.value ?? "";
    const userName = user.userName ?? "";
    const technical = !!user.id && technicalUserIds.has(user.id);
    const gwsDomain = (email || userName).toLowerCase().endsWith(GWS_DOMAIN);
    return {
        id: user.id ?? "",
        userName,
        fullName: `${user.name?.givenName ?? ""} ${user.name?.familyName ?? ""}`.trim() || user.displayName || "",
        email,
        technical,
        gwsDomain,
        paid: !technical && !gwsDomain,
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