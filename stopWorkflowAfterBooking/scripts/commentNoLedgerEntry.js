//#region \0rolldown/runtime.js
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJSMin = (cb, mod) => () => (mod || (cb((mod = { exports: {} }).exports, mod), cb = null), mod.exports);
var __copyProps = (to, from, except, desc) => {
	if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
		key = keys[i];
		if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
			get: ((k) => from[k]).bind(null, key),
			enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
		});
	}
	return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule || !__hasOwnProp.call(mod, "default") ? __defProp(target, "default", {
	value: mod,
	enumerable: true
}) : target, mod));
//#endregion
let path = require("path");
path = __toESM(path);
//#region ../../helper/utils/logger.ts
var LogLevel = /* @__PURE__ */ function(LogLevel) {
	LogLevel[LogLevel["DEBUG"] = 0] = "DEBUG";
	LogLevel[LogLevel["INFO"] = 1] = "INFO";
	LogLevel[LogLevel["WARN"] = 2] = "WARN";
	LogLevel[LogLevel["ERROR"] = 3] = "ERROR";
	return LogLevel;
}({});
var Logger = class {
	level;
	showTimestamp;
	constructor(options = {}) {
		this.level = options.level ?? LogLevel.INFO;
		this.showTimestamp = options.showTimestamp ?? true;
	}
	formatMessage(level, message) {
		const paddedLevel = level.toUpperCase().padEnd(5, " ");
		return `${this.showTimestamp ? `[${(/* @__PURE__ */ new Date()).toISOString()}] ` : ""}${paddedLevel}: ${message}`;
	}
	debug(message, ...args) {
		if (this.level <= LogLevel.DEBUG) console.debug(this.formatMessage("debug", message), ...args);
	}
	info(message, ...args) {
		if (this.level <= LogLevel.INFO) console.info(this.formatMessage("info", message), ...args);
	}
	warn(message, ...args) {
		if (this.level <= LogLevel.WARN) console.warn(this.formatMessage("warn", message), ...args);
	}
	error(message, ...args) {
		if (this.level <= LogLevel.ERROR) console.error(this.formatMessage("error", message), ...args);
	}
	setLevel(newLevel) {
		this.level = newLevel;
	}
};
var loggerInstance;
function initLogger(level = LogLevel.INFO, showTimestamp = true) {
	if (!loggerInstance) loggerInstance = new Logger({
		level,
		showTimestamp
	});
	return loggerInstance;
}
function getLogger() {
	if (!loggerInstance) loggerInstance = new Logger({
		level: LogLevel.DEBUG,
		showTimestamp: true
	});
	return loggerInstance;
}
//#endregion
//#region ../../helper/performHttpRequest/performHttpRequest.ts
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
var logger$1 = getLogger();
async function performHttpRequest(url, options) {
	let body = {};
	let errorMessage = "";
	let response;
	logger$1.debug(`[Request] ${options.method} ${url} | Headers: ${JSON.stringify(options.headers)} | Body: ${!(options.body instanceof Uint8Array) && options.body !== void 0 ? options.body : "[Binary body omitted]"}`);
	try {
		response = await fetch(url, options);
	} catch (err) {
		const cause = err?.cause;
		const causeText = cause ? ` (cause: ${cause.code ?? ""} ${cause.message ?? cause})` : "";
		throw new Error(`Network error during fetch: ${err.message}${causeText}`);
	}
	const contentType = response.headers.get("content-type") || "";
	const parseBody = async () => {
		try {
			if (contentType.includes("application/json") || contentType.includes("application/hal+json")) return await response.json();
			else if (contentType.includes("application/octet-stream") || contentType.includes("application/pdf")) {
				const arrayBuffer = await response.arrayBuffer();
				return new Uint8Array(arrayBuffer);
			} else return await response.text();
		} catch (e) {
			return;
		}
	};
	if (response.ok) {
		const result = await parseBody();
		if (result !== void 0) body = result;
	} else {
		const errorBody = await parseBody();
		errorMessage = typeof errorBody === "string" ? errorBody : JSON.stringify(errorBody);
		throw new Error(`HTTP error! status: ${response.status}, message: ${errorMessage}`);
	}
	return {
		status: response.status,
		statusText: response.statusText,
		body,
		bodyUsed: response.bodyUsed,
		headers: response.headers,
		ok: response.ok,
		redirected: response.redirected,
		type: response.type,
		url: response.url
	};
}
//#endregion
//#region ../../helper/dms/createNewCommentOnDocument.ts
/**
* Creates a new comment on a specified document in the ECM.
*
* @template T - The expected type of the API response.
* @param {string} baseUri - The base URI of the DMS API.
* @param {string} token - The authentication token for API access.
* @param {string} repositoryId - The ID of the repository containing the document.
* @param {string} documentId - The ID of the document to which the comment will be added.
* @param {string} comment - The content of the comment to be added to the document.
* @returns {Promise<ApiResponse<T>>} A promise that resolves to the API response of type `T`.
*/
async function createNewCommentOnDocument(baseUri, token, repositoryId, documentId, comment) {
	return await performHttpRequest(`${baseUri}/dms/r/${repositoryId}/o2m/${documentId}/n`, {
		method: "POST",
		headers: {
			"Authorization": `Bearer ${token}`,
			"Accept": "application/json",
			"Content-Type": "application/json"
		},
		body: JSON.stringify({ text: comment })
	});
}
//#endregion
//#region ../../helper/dms/getRepositories.ts
async function getRepositories(baseUri, token) {
	return await performHttpRequest(`${baseUri}/dms/r`, {
		method: "GET",
		headers: {
			"Authorization": `Bearer ${token}`,
			"Accept": "application/json",
			"Content-Type": "application/json"
		}
	});
}
//#endregion
//#region ../../helper/identityprovider/getToken.ts
var import_main = /* @__PURE__ */ __toESM((/* @__PURE__ */ __commonJSMin(((exports, module) => {
	var fs = require("fs");
	var path$1 = require("path");
	function log(message) {
		console.log(`[dotenv][DEBUG] ${message}`);
	}
	var NEWLINE = "\n";
	var RE_INI_KEY_VAL = /^\s*([\w.-]+)\s*=\s*(.*)?\s*$/;
	var RE_NEWLINES = /\\n/g;
	var NEWLINES_MATCH = /\n|\r|\r\n/;
	function parse(src, options) {
		const debug = Boolean(options && options.debug);
		const obj = {};
		src.toString().split(NEWLINES_MATCH).forEach(function(line, idx) {
			const keyValueArr = line.match(RE_INI_KEY_VAL);
			if (keyValueArr != null) {
				const key = keyValueArr[1];
				let val = keyValueArr[2] || "";
				const end = val.length - 1;
				const isDoubleQuoted = val[0] === "\"" && val[end] === "\"";
				if (val[0] === "'" && val[end] === "'" || isDoubleQuoted) {
					val = val.substring(1, end);
					if (isDoubleQuoted) val = val.replace(RE_NEWLINES, NEWLINE);
				} else val = val.trim();
				obj[key] = val;
			} else if (debug) log(`did not match key and value when parsing line ${idx + 1}: ${line}`);
		});
		return obj;
	}
	function config(options) {
		let dotenvPath = path$1.resolve(process.cwd(), ".env");
		let encoding = "utf8";
		let debug = false;
		if (options) {
			if (options.path != null) dotenvPath = options.path;
			if (options.encoding != null) encoding = options.encoding;
			if (options.debug != null) debug = true;
		}
		try {
			const parsed = parse(fs.readFileSync(dotenvPath, { encoding }), { debug });
			Object.keys(parsed).forEach(function(key) {
				if (!Object.prototype.hasOwnProperty.call(process.env, key)) process.env[key] = parsed[key];
				else if (debug) log(`"${key}" is already defined in \`process.env\` and will not be overwritten`);
			});
			return { parsed };
		} catch (e) {
			return { error: e };
		}
	}
	module.exports.config = config;
	module.exports.parse = parse;
})))());
/**
* Retrieves a token from the identity provider.
*
* @param baseUri - The base URI of the identity provider.
* @param token - The bearer token used for authorization.
* @returns A promise that resolves to an `ApiResponse` containing the `GetToken` data.
*/
async function getToken(baseUri, token) {
	return await performHttpRequest(`${baseUri}/identityprovider/login`, {
		method: "GET",
		headers: {
			Authorization: `Bearer ${token}`,
			Accept: "application/json",
			"Content-Type": "application/json"
		}
	});
}
//#endregion
//#region ../../helper/utils/credentials.ts
import_main.config({ path: path.resolve(__dirname, "../../../helper/utils/.env") });
var APICredentials = class APICredentials {
	name;
	baseUri;
	apiKey;
	AuthsessionId;
	Expire;
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
		const token = await getToken(baseUri, apiKey);
		if (!token?.body?.AuthSessionId || !token?.body?.Expire) throw new Error("Token response is missing required fields.");
		return new APICredentials("", baseUri, apiKey, token.body.AuthSessionId, token.body.Expire);
	}
	static async findByName(name) {
		const match = Credentials.find((c) => c.name === name);
		if (!match) throw new Error(`Credentials not found for '${name}'`);
		const token = await getToken(match.baseUri, match.apiKey);
		if (!token?.body?.AuthSessionId || !token?.body?.Expire) throw new Error("Token response is missing required fields.");
		return new APICredentials(match.name, match.baseUri, match.apiKey, token.body.AuthSessionId, token.body.Expire);
	}
};
var Credentials = [];
for (const key in process.env) if (key.startsWith("CREDENTIALS_")) {
	const name = key.replace("CREDENTIALS_", "").toLowerCase();
	const [baseUri, apiKey] = (process.env[key] ?? "").split("|");
	if (!baseUri || !apiKey) continue;
	Credentials.push({
		name,
		baseUri,
		apiKey
	});
}
//#endregion
//#region src/scripts/commentNoLedgerEntry.ts
/**
* commentNoLedgerEntry
*
* Process Studio "Scripting"-Modul: legt am Dokument `docId` (aus dem
* Request-Body, z.B. { "docId": "..." }) eine Notiz an (Text aus der
* Variable "comment", vorbelegt mit DEFAULT_COMMENT). Die Repository-ID wird über GET /dms/r
* ermittelt (erstes Repository des Mandanten).
*
* Antwort: { "success": true } bzw. HTTP 400/500 mit { "success": false, ... }.
*/
var logger = getLogger();
var config = { mode: process.platform === "linux" ? "production" : "development" };
var DEFAULT_COMMENT = "Automatischer Workflowabschluss durch System";
if (config.mode === "production") module.exports = async (req, res) => {
	await main(new APICredentials("", req.var("baseUri"), req.var("apiKey"), "", /* @__PURE__ */ new Date()), { comment: req.var("comment") || DEFAULT_COMMENT }, req.json()?.docId, res);
};
else (async () => {
	initLogger(LogLevel.DEBUG);
	const credentials = await APICredentials.findByName("TODO-credentials-name");
	if (!credentials) throw new Error("Credentials not found");
	await main(credentials, { comment: DEFAULT_COMMENT }, "TODO-doc-id", null);
})().catch((err) => {
	console.error("Error in development mode:", err);
});
async function main(credentials, settings, docId, res) {
	try {
		logger.debug(`Start (docId: ${docId})`);
		if (!docId) {
			logger.error("Request-Body enthält keine docId.");
			sendJson(res, 400, {
				success: false,
				error: "docId fehlt"
			});
			return;
		}
		const repositoryId = await getRepositoryId(credentials);
		await createNewCommentOnDocument(credentials.baseUri, credentials.apiKey, repositoryId, docId, settings.comment);
		logger.info(`Notiz an Dokument ${docId} angelegt.`);
		sendJson(res, 200, { success: true });
		logger.info("End");
	} catch (error) {
		logger.error(`Error: ${error}`);
		sendJson(res, 500, {
			success: false,
			error: String(error)
		});
	}
}
async function getRepositoryId(credentials) {
	const repositoryId = (await getRepositories(credentials.baseUri, credentials.apiKey)).body.repositories?.[0]?.id;
	if (!repositoryId) throw new Error("Kein DMS-Repository gefunden.");
	return repositoryId;
}
function sendJson(res, status, payload) {
	if (config.mode !== "production") return;
	res.status(status).set("Content-Type", "application/json").send(JSON.stringify(payload));
}
//#endregion

//# sourceMappingURL=commentNoLedgerEntry.js.map