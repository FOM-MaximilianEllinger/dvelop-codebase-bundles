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
//#endregion
//#region ../../helper/utils/logger.ts
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
		throw new Error(`Network error during fetch: ${err.message}`);
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
//#region ../../helper/identityprovider/getToken.ts
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
//#region ../../helper/webindexlayouter/executeSqlQuery.ts
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
	return await performHttpRequest(`${baseUri}/webindexlayouter/api/v1/apps/${encodeURIComponent(app)}/sqlResult`, {
		method: "POST",
		headers: {
			...token ? { Authorization: `Bearer ${token}` } : {},
			Accept: "application/json",
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			connectionString,
			sqlQuery
		})
	});
}
//#endregion
//#region src/scripts/script.ts
var logger = getLogger();
/**
* "Rechnungsleser-Auswertung": zählt die vom Rechnungsleser verarbeiteten
* Rechnungen je Mandant (Attribut DEBITOR_NUM) und Monat - per SQL auf den
* Protokoll-Tabellen des Rechnungslesers (CCLogDocuments/CCLogAttributes) über
* den Webindex-Designer. Läuft mit dem API-Key aus den Script-Variablen; das
* Formular (src/forms/form.ts) ruft das Script auf und stellt das Ergebnis dar.
*/
var APP = "classcon-documentreader";
var SQL_QUERY = `SELECT
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
	const credentials = new APICredentials("", req.var("baseUri"), req.var("apiKey"), "", /* @__PURE__ */ new Date());
	try {
		const response = await executeSqlQuery(credentials.baseUri, credentials.apiKey, APP, SQL_QUERY);
		const rows = toRows(response.body);
		if (!rows) {
			const sample = (typeof response.body === "string" ? response.body : JSON.stringify(response.body)).slice(0, 300);
			throw new Error(`Unbekanntes Antwortformat von sqlResult: ${sample}`);
		}
		const result = { rows };
		logger.info(`${rows.length} Zeilen ermittelt.`);
		res.status(200).set("Content-Type", "application/json").send(JSON.stringify(result));
	} catch (error) {
		logger.error(`Error: ${error}`);
		res.status(500).set("Content-Type", "application/json").send(JSON.stringify({ error: String(error) }));
	}
};
function toRows(body) {
	let data = body;
	if (typeof data === "string") try {
		data = JSON.parse(data);
	} catch {
		return;
	}
	const list = Array.isArray(data) ? data : findArray(data, [
		"rows",
		"data",
		"result",
		"results",
		"items",
		"values",
		"records",
		"table"
	]);
	if (!list) return void 0;
	const columns = !Array.isArray(data) ? columnNames(data) : void 0;
	const rows = list.map((entry) => toRow(entry, columns));
	return rows.every((row) => !!row) ? rows : void 0;
}
function findArray(data, keys) {
	if (!data || typeof data !== "object") return void 0;
	const lookup = new Map(Object.entries(data).map(([key, value]) => [key.toLowerCase(), value]));
	for (const key of keys) {
		const value = lookup.get(key);
		if (Array.isArray(value)) return value;
		const nested = findArray(value, keys);
		if (nested) return nested;
	}
}
function columnNames(data) {
	const lookup = new Map(Object.entries(data ?? {}).map(([key, value]) => [key.toLowerCase(), value]));
	const columns = lookup.get("columns") ?? lookup.get("columnnames") ?? lookup.get("headers") ?? lookup.get("fields");
	return Array.isArray(columns) ? columns.map((column) => String(typeof column === "object" ? column?.name ?? column?.Name ?? column?.columnName ?? "" : column)) : void 0;
}
function toRow(entry, columns) {
	let record;
	const cells = Array.isArray(entry) ? entry : Array.isArray(entry?.cells) ? entry.cells : void 0;
	if (cells && columns) record = Object.fromEntries(columns.map((name, i) => [name, cells[i]]));
	else if (entry && typeof entry === "object") record = entry;
	else return;
	const lookup = new Map(Object.entries(record).map(([key, value]) => [key.toLowerCase(), value]));
	const year = Number(lookup.get("year"));
	const count = Number(lookup.get("count"));
	if (!Number.isFinite(year) || !Number.isFinite(count)) return void 0;
	return {
		year,
		month: String(lookup.get("month") ?? ""),
		company: String(lookup.get("company") ?? ""),
		count
	};
}
//#endregion

//# sourceMappingURL=script.js.map