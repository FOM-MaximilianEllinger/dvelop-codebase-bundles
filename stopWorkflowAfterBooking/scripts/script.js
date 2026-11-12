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
//#region ../../helper/dms/getSpecificDocument.ts
/**
* Retrieves a specific document from the DMS (Document Management System) using the provided parameters.
*
* @param baseUri - The base URI of the DMS API.
* @param token - The authorization token to access the DMS API.
* @param repositoryId - The ID of the repository where the document is stored.
* @param documentId - The ID of the specific document to retrieve.
* @returns A promise that resolves to an `ApiResponse` containing the `GetSpecificDocument` data.
*
* @throws Will throw an error if the HTTP request fails or the response is invalid.
*/
async function getSpecificDocument(baseUri, token, repositoryId, documentId) {
	return await performHttpRequest(`${baseUri}/dms/r/${repositoryId}/o2/${documentId}`, {
		method: "GET",
		headers: {
			"Authorization": `Bearer ${token}`,
			"Accept": "application/json",
			"Content-Type": "application/json"
		}
	});
}
//#endregion
//#region ../../helper/dms/getSpecificDocumentWithDefaultSource.ts
/**
* Retrieves a specific document from the DMS (Document Management System) using the default source.
*
* @param baseUri - The base URI of the DMS API.
* @param token - The authorization token to access the DMS API.
* @param repositoryId - The ID of the repository where the document is stored.
* @param documentId - The ID of the document to retrieve.
* @returns A promise that resolves to an `ApiResponse` containing the document details.
*
* @template GetSpecificDocumentWithDefaultSource - The expected response type for the document details.
*/
async function getSpecificDocumentWithDefaultSource(baseUri, token, repositoryId, documentId) {
	return await performHttpRequest(`${baseUri}/dms/r/${repositoryId}/o2m/${documentId}?sourceid=/dms/r/${repositoryId}/source`, {
		method: "GET",
		headers: {
			"Authorization": `Bearer ${token}`,
			"Accept": "application/json",
			"Content-Type": "application/json"
		}
	});
}
//#endregion
//#region ../../helper/dms/getDocumentPropertyValue.ts
/**
* Liest den Wert einer DMS-Eigenschaft über ihre GUID (wie im Quell-Mapping
* bzw. in updateDocument verwendet). /dms/r/<repo>/o2/<id> liefert die
* Eigenschaften nur mit ihrer internen Nummer (z.B. "91") - deshalb zuerst
* über die Standardquelle (/o2m/<id>?sourceid=…), deren Eigenschaften nach
* GUID benannt sind; /o2 dient als Rückfall und für die Kategorie.
*/
async function getDocumentPropertyValue(baseUri, token, repositoryId, documentId, propertyGuid) {
	const debug = [];
	let value = "";
	try {
		const withSource = (await getSpecificDocumentWithDefaultSource(baseUri, token, repositoryId, documentId)).body;
		value = findValue(withSource, propertyGuid);
		debug.push(`o2m: ${describe(withSource)}`);
	} catch (error) {
		debug.push(`o2m fehlgeschlagen: ${error}`);
	}
	const document = (await getSpecificDocument(baseUri, token, repositoryId, documentId)).body;
	if (!value) {
		value = findValue(document, propertyGuid);
		debug.push(`o2: ${describe(document)}`);
	}
	return {
		value,
		category: document.category,
		debug: debug.join(" | ")
	};
}
function findValue(source, guid) {
	const key = guid.toLowerCase();
	const matches = (p) => [
		p?.key,
		p?.id,
		p?.uuid
	].some((k) => typeof k === "string" && k.toLowerCase() === key);
	const lists = [
		source?.sourceProperties,
		source?.objectProperties,
		source?.multivalueProperties
	];
	for (const list of lists) {
		const property = Array.isArray(list) ? list.find(matches) : void 0;
		if (!property) continue;
		const raw = property.value ?? property.displayValue ?? (Array.isArray(property.values) ? property.values[0]?.value ?? property.values[0] : property.values && typeof property.values === "object" ? Object.values(property.values)[0] : void 0);
		const text = raw === void 0 || raw === null ? "" : String(raw).trim();
		if (text) return text;
	}
	return "";
}
function describe(source) {
	const lists = [
		"sourceProperties",
		"objectProperties",
		"multivalueProperties"
	].filter((name) => Array.isArray(source?.[name])).map((name) => `${name}[${source[name].length}] ${source[name].slice(0, 40).map((p) => `${p.name ?? ""}(${p.key ?? p.uuid ?? p.id})=${JSON.stringify(p.value ?? p.values ?? "")}`).join(", ")}`);
	return lists.length ? lists.join("; ") : `Felder: ${Object.keys(source ?? {}).join(", ")}`;
}
//#endregion
//#region ../../helper/scripting/cancelIncident.ts
async function cancelIncident(baseUri, token, instanceId, cancelReason) {
	return await performHttpRequest(`${baseUri}/process/instances/${instanceId}/cancel`, {
		method: "POST",
		headers: {
			"Authorization": `Bearer ${token}`,
			"Accept": "application/json",
			"Content-Type": "application/json"
		},
		body: JSON.stringify({ cancelReason })
	});
}
//#endregion
//#region ../../helper/scripting/getProcessInstanceTokenVariables.ts
/**
* Liest die Variablen eines Tokens einer Prozessinstanz.
*
* @param baseUri - Basis-URI der d.velop-Umgebung.
* @param token - Bearer-Token / API-Key.
* @param instanceId - ID der Prozessinstanz.
* @param tokenId - ID des Tokens (z.B. das Token mit activityType "PROCESS").
*/
async function getProcessInstanceTokenVariables(baseUri, token, instanceId, tokenId) {
	return await performHttpRequest(`${baseUri}/process/instances/${encodeURIComponent(instanceId)}/tokens/${encodeURIComponent(tokenId)}/variables`, {
		method: "GET",
		headers: {
			"Authorization": `Bearer ${token}`,
			"Accept": "application/json"
		}
	});
}
//#endregion
//#region ../../helper/scripting/getProcessInstances.ts
/**
* Retrieves all process instances from the specified base URI with pagination support.
*
* @param baseUri - The base URI of the API endpoint.
* @param token - The authorization token to access the API.
* @param processId - An array of process IDs to filter the instances.
* @param version - The version of the process to filter the instances.
* @param state - An array of states to filter the process instances.
* @param activity - The activity to filter the process instances.
* @param businessKey - The business key to filter the process instances.
* @returns A promise that resolves to an `ApiResponse` containing all process instances.
*/
async function getProcessInstances(baseUri, token, processId, version, state, activity, businessKey) {
	const headers = {
		"Authorization": `Bearer ${token}`,
		"Accept": "application/json",
		"Content-Type": "application/json"
	};
	const body = {
		processId,
		version,
		state,
		activity,
		businessKey
	};
	const allInstances = [];
	let lastId;
	let lastTimestamp;
	let hasMore = true;
	while (hasMore) {
		let url = `${baseUri}/process/instances`;
		if (lastId && lastTimestamp) url += `?lastId=${encodeURIComponent(lastId)}&lastTimestamp=${lastTimestamp}`;
		const options = {
			method: "POST",
			headers,
			body: JSON.stringify(body)
		};
		const response = await performHttpRequest(url, options);
		if (response.status === 200 && response.body?._embedded?.instances) {
			allInstances.push(...response.body._embedded.instances);
			if (response.body._links?.next?.href) {
				const lastInstance = response.body._embedded.instances[response.body._embedded.instances.length - 1];
				lastId = lastInstance.id;
				lastTimestamp = new Date(lastInstance.startTime).getTime();
			} else hasMore = false;
		} else hasMore = false;
	}
	return {
		_embedded: { instances: allInstances },
		_links: {
			self: { href: `${baseUri}/process/instances` },
			next: { href: "" }
		}
	};
}
//#endregion
//#region ../../helper/scripting/getSpecificProcessInstanceToken.ts
async function getSpecificProcessInstanceToken(baseUri, token, instanceId) {
	return await performHttpRequest(`${baseUri}/process/instances/${instanceId}/tokens`, {
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
//#region src/scripts/script.ts
/**
* StopWorkflowAfterBooking
*
* Process Studio "Scripting"-Modul: beendet den laufenden Workflow eines
* Belegs, sobald dieser gebucht wurde.
*
* Ablauf:
*   1. Alle aktiven Instanzen (STARTED/STARTING/UNSTARTED) des Prozesses
*      `processId` suchen.
*   2. Je Instanz die Tokens laden und das Token mit activityType "PROCESS"
*      (Prozess-Ebene) nehmen.
*   3. Aus dessen Variablen `dv_attachment` (verknüpfter DMS-Beleg) lesen.
*   4. Das Dokument abrufen und die Eigenschaft `bookedPropertyId` prüfen.
*      Ist sie befüllt, die Instanz mit CANCEL_REASON abbrechen.
*   5. Die Dokument-IDs der abgebrochenen Workflows als Prozessvariable
*      `docIds` zurückgeben.
*
* Production: läuft als HTTP-Handler mit (req, res); Konfiguration über die
* customerVariables aus toolbox.meta.json (req.var("<key>")).
* Development: läuft lokal gegen die Umgebung aus helper/utils/credentials.ts
* (.env-Eintrag CREDENTIALS_<NAME>).
*/
var logger = getLogger();
var config = { mode: process.platform === "linux" ? "production" : "development" };
var ACTIVE_STATES = [
	"STARTED",
	"STARTING",
	"UNSTARTED"
];
var DEFAULT_PROCESS_ID = "gws_goodsInvoice";
var CANCEL_REASON = "Automatischer Workflowabschluss durch s.dok";
if (config.mode === "production") module.exports = async (req, res) => {
	await main(new APICredentials("", req.var("baseUri"), req.var("apiKey"), "", /* @__PURE__ */ new Date()), {
		processId: req.var("processId") || DEFAULT_PROCESS_ID,
		bookedPropertyId: req.var("bookedPropertyId")
	}, req, res);
};
else (async () => {
	initLogger(LogLevel.DEBUG);
	const credentials = await APICredentials.findByName("TODO-credentials-name");
	if (!credentials) throw new Error("Credentials not found");
	await main(credentials, {
		processId: DEFAULT_PROCESS_ID,
		bookedPropertyId: "TODO-property-id"
	}, null, null);
})().catch((err) => {
	console.error("Error in development mode:", err);
});
async function main(credentials, settings, req, res) {
	try {
		logger.debug("Start");
		if (!settings.bookedPropertyId) throw new Error("Variable bookedPropertyId ist nicht gesetzt.");
		const activeInstances = (await getProcessInstances(credentials.baseUri, credentials.apiKey, [settings.processId], [], ACTIVE_STATES, null, ""))._embedded.instances;
		logger.info(`${activeInstances.length} aktive Instanz(en) von "${settings.processId}" gefunden.`);
		const docIds = [];
		for (const instance of activeInstances) try {
			const documentId = await processInstance(credentials, settings, instance);
			if (documentId) docIds.push(documentId);
		} catch (error) {
			logger.error(`Instanz ${instance.id}: ${error}`);
		}
		logger.info(`${docIds.length} Workflow(s) abgebrochen: ${docIds.join(", ")}`);
		if (config.mode === "production") res.status(200).set("Content-Type", "application/json").send(JSON.stringify({ variables: { docIds } }));
		logger.info("End");
	} catch (error) {
		logger.error(`Error: ${error}`);
		if (config.mode === "production") res.status(500).send("Internal Server Error");
	}
}
/**
* Prüft eine Instanz und bricht sie ab, wenn der verknüpfte Beleg gebucht
* ist. Liefert die Dokument-ID zurück, wenn abgebrochen wurde.
*/
async function processInstance(credentials, settings, instance) {
	const attachment = await getAttachmentOfInstance(credentials, instance);
	if (!attachment) return;
	const reference = parseDmsReference(attachment);
	if (!reference) {
		logger.warn(`Instanz ${instance.id}: dv_attachment "${attachment}" ist keine DMS-Referenz.`);
		return;
	}
	const property = await getDocumentPropertyValue(credentials.baseUri, credentials.apiKey, reference.repositoryId, reference.documentId, settings.bookedPropertyId);
	if (!property.value) {
		logger.debug(`Instanz ${instance.id}: Dokument ${reference.documentId} noch nicht gebucht.`);
		return;
	}
	logger.info(`Instanz ${instance.id}: Dokument ${reference.documentId} gebucht (${settings.bookedPropertyId} = "${property.value}") - Workflow wird abgebrochen.`);
	await cancelIncident(credentials.baseUri, credentials.apiKey, instance.id, CANCEL_REASON);
	return reference.documentId;
}
/**
* Sucht in den Tokens der Instanz das Token mit activityType "PROCESS" und
* liest daraus die Variable dv_attachment.
*/
async function getAttachmentOfInstance(credentials, instance) {
	const processToken = (await getSpecificProcessInstanceToken(credentials.baseUri, credentials.apiKey, instance.id)).body?.tokens?.find((token) => token.activity?.activityType === "PROCESS");
	if (!processToken?.id) {
		logger.warn(`Instanz ${instance.id}: kein Token mit activityType "PROCESS" gefunden.`);
		return;
	}
	const attachment = extractAttachment((await getProcessInstanceTokenVariables(credentials.baseUri, credentials.apiKey, instance.id, processToken.id)).body);
	if (!attachment) logger.warn(`Instanz ${instance.id}: keine Variable dv_attachment gefunden.`);
	return attachment;
}
/**
* Liest dv_attachment aus der Variablen-Antwort. Toleriert sowohl
* { dv_attachment: ... } als auch { variables: { dv_attachment: ... } }
* sowie String- oder Array-Werte.
*/
function extractAttachment(body) {
	const raw = body?.variables?.dv_attachment ?? body?.dv_attachment;
	const value = Array.isArray(raw) ? raw[0] : raw;
	return typeof value === "string" && value.length > 0 ? value : void 0;
}
/**
* Zerlegt "dmsObject:///dms/r/<repositoryId>/o2/<documentId>" (auch o2m bzw.
* mit Query-String) in Repository- und Dokument-ID.
*/
function parseDmsReference(attachment) {
	const match = /\/dms\/r\/([^/]+)\/o2m?\/([^/?#]+)/.exec(attachment);
	if (!match) return;
	return {
		repositoryId: decodeURIComponent(match[1]),
		documentId: decodeURIComponent(match[2])
	};
}
//#endregion

//# sourceMappingURL=script.js.map