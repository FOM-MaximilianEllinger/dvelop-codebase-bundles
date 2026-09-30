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
//#region ../../helper/identityprovider/getUsers.ts
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
	if (startIndex !== void 0) query.set("startIndex", String(startIndex));
	if (count !== void 0) query.set("count", String(count));
	const queryString = query.toString();
	return await performHttpRequest(`${baseUri}/identityprovider/scim/Users${queryString ? `?${queryString}` : ""}`, {
		method: "GET",
		headers: {
			...token ? { Authorization: `Bearer ${token}` } : {},
			Accept: "application/json",
			"Content-Type": "application/json"
		}
	});
}
//#endregion
//#region ../../helper/identityprovider/getAllUsers.ts
var PAGE_SIZE = 100;
var MAX_PAGES = 1e3;
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
	const usersById = /* @__PURE__ */ new Map();
	const usersWithoutId = [];
	let startIndex = 1;
	for (let page = 0; page < MAX_PAGES; page++) {
		const response = await getUsers(baseUri, token, startIndex, PAGE_SIZE);
		const resources = response.body.resources ?? [];
		for (const user of resources) if (user.id) usersById.set(user.id, user);
		else usersWithoutId.push(user);
		const total = response.body.totalResults;
		startIndex += resources.length;
		if (resources.length === 0 || total !== void 0 && startIndex > total) break;
	}
	return [...usersById.values(), ...usersWithoutId];
}
//#endregion
//#region ../../helper/identityprovider/getGroups.ts
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
	return await performHttpRequest(`${baseUri}/identityprovider/scim/Groups`, {
		method: "GET",
		headers: {
			Authorization: `Bearer ${token}`,
			Accept: "application/json"
		}
	});
}
//#endregion
//#region ../../helper/identityprovider/getGroup.ts
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
	return await performHttpRequest(`${baseUri}/identityprovider/scim/Groups/${id}`, {
		method: "GET",
		headers: {
			Authorization: `Bearer ${token}`,
			Accept: "application/json",
			"Content-Type": "application/json"
		}
	});
}
//#endregion
//#region ../../helper/identityprovider/getIdentityproviderConfig.ts
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
	return await performHttpRequest(`${baseUri}/identityprovider/config/cloud`, {
		method: "GET",
		headers: {
			Authorization: `Bearer ${token}`,
			Accept: "application/json",
			"Content-Type": "application/json"
		}
	});
}
//#endregion
//#region src/scripts/script.ts
var logger = getLogger();
module.exports = async (req, res) => {
	await main(new APICredentials("", req.var("baseUri"), req.var("apiKey"), "", /* @__PURE__ */ new Date()), req, res);
};
async function main(credentials, req, res) {
	try {
		logger.debug("Start");
		let identityProviderConfig = await getIdentityproviderConfig(credentials.baseUri, credentials.apiKey);
		logger.debug(JSON.stringify(identityProviderConfig));
		const technicalGroupNames = new Set((identityProviderConfig.body.provider ?? []).map((provider) => provider?.technicalUserGroup).filter((name) => !!name));
		const technicalGroupIds = ((await getGroups(credentials.baseUri, credentials.apiKey)).body.resources ?? []).filter((group) => group.id && group.displayName && technicalGroupNames.has(group.displayName)).map((group) => group.id);
		const technicalUserIds = /* @__PURE__ */ new Set();
		for (const groupId of technicalGroupIds) {
			const group = await getGroup(credentials.baseUri, credentials.apiKey, groupId);
			for (const member of group.body.members ?? []) if (member.value) technicalUserIds.add(member.value);
		}
		if (technicalGroupNames.size > 0 && technicalGroupIds.length === 0) logger.warn(`Technische Benutzergruppe(n) ${[...technicalGroupNames].join(", ")} nicht gefunden.`);
		const users = (await getAllUsers(credentials.baseUri, credentials.apiKey)).map((user) => toLicencedUser(user, technicalUserIds));
		const result = {
			total: users.length,
			paid: users.filter((user) => user.paid).length,
			technical: users.filter((user) => user.technical).length,
			gwsDomain: users.filter((user) => user.gwsDomain).length,
			users
		};
		logger.debug(JSON.stringify(result));
		logger.debug(`Benutzer gesamt: ${result.total}, davon bezahlt: ${result.paid}`);
		res.status(200).set("Content-Type", "application/json").send(JSON.stringify(result));
		logger.info("End");
	} catch (error) {
		logger.error(`Error: ${error}`);
		res.status(500).set("Content-Type", "application/json").send(JSON.stringify({ error: String(error) }));
	}
}
var GWS_DOMAIN = "@gws.ms";
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
		paid: !technical && !gwsDomain
	};
}
//#endregion

//# sourceMappingURL=script.js.map