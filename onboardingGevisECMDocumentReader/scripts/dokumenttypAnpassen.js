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
//#region ../../helper/dms/updateDocument.ts
async function updateDocument(baseUri, token, repositoryId, documentId, sourceCategory, sourceProperties) {
	const url = `${baseUri}/dms/r/${repositoryId}/o2m/${documentId}`;
	const headers = {
		Authorization: `Bearer ${token}`,
		Accept: "application/json",
		"Content-Type": "application/json"
	};
	const body = {
		sourceCategory,
		sourceId: `/dms/r/${repositoryId}/source`,
		sourceProperties
	};
	return await performHttpRequest(url, {
		method: "PUT",
		headers,
		body: JSON.stringify(body)
	});
}
//#endregion
//#region src/scripts/dokumenttypAnpassen.ts
/**
* "Rechnungsleser: Dokumenttyp anpassen": der Rechnungsleser übergibt den
* Dokumenttyp als ERP-Code (siehe src/scripts/preExport.ts: Rechnung 2,
* Gutschrift 3) - im DMS-Feld fieldDocumentTypeGUID landet daher "2" bzw.
* "3". Dieses Skript setzt beim Dokument mit der übergebenen DocId den
* lesbaren Wert: "2" -> "Rechnung", "3" -> "Gutschrift". Andere Werte bleiben
* unverändert, die Kategorie ebenfalls.
*
* Wird vom Onboarding-Formular (src/forms/form.ts) als Process-Studio-Aktion
* mit dem Eingabeparameter "docId" angelegt; der Code wird beim Build als Text
* ins Formular-Bundle übernommen ("?raw"-Import in src/forms/form.ts). Aus
* Kompatibilität wird auch der Body eines DMS-Webhooks ({ doc: { id } })
* verstanden.
*
* customerVariables (werden vom Formular nur beim Neuanlegen gesetzt):
* apiKey, fieldDocumentTypeGUID.
*/
var logger = initLogger(LogLevel.INFO);
/** Name des Eingabeparameters der Aktion. */
var DOC_ID_INPUT = "docId";
/** ERP-Code -> Dokumenttyp im DMS. */
var DOCUMENT_TYPES = {
	"2": "Rechnung",
	"3": "Gutschrift"
};
module.exports = async (req, res) => {
	try {
		const body = parseBody(req);
		const documentId = body?.[DOC_ID_INPUT] ?? body?.DocId ?? body?.doc?.id;
		if (!documentId) {
			respond(res, 400, {
				success: false,
				message: `Eingabeparameter "${DOC_ID_INPUT}" fehlt.`
			});
			return;
		}
		const baseUri = req.get("x-dv-baseuri");
		const apiKey = req.var("apiKey");
		const fieldDocumentType = req.var("fieldDocumentTypeGUID");
		const repositoryId = (await getRepositories(baseUri, apiKey)).body.repositories[0]?.id;
		if (!repositoryId) throw new Error("Kein DMS-Repository gefunden.");
		const document = await getDocumentPropertyValue(baseUri, apiKey, repositoryId, documentId, fieldDocumentType);
		const current = document.value;
		const target = DOCUMENT_TYPES[current];
		if (!target) {
			const message = `Dokument ${documentId}: Dokumenttyp "${current}" - keine Anpassung nötig.`;
			logger.info(current ? message : `${message} Gelesen: ${document.debug.slice(0, 4e3)}`);
			respond(res, 200, {
				success: true,
				changed: false,
				documentType: current,
				message
			});
			return;
		}
		if (!document.category) throw new Error(`Kategorie von Dokument ${documentId} konnte nicht ermittelt werden.`);
		await updateDocument(baseUri, apiKey, repositoryId, documentId, document.category, { properties: [{
			key: fieldDocumentType,
			values: [target]
		}] });
		const message = `Dokument ${documentId}: Dokumenttyp "${current}" -> "${target}".`;
		logger.info(message);
		respond(res, 200, {
			success: true,
			changed: true,
			documentType: target,
			message
		});
	} catch (error) {
		const message = error instanceof Error ? error.message : String(error);
		logger.error(`Fehler: ${message}`);
		respond(res, 500, {
			success: false,
			message
		});
	}
};
function parseBody(req) {
	try {
		return req.json?.() ?? {};
	} catch {
		return {};
	}
}
function respond(res, status, body) {
	res.status(status).set("Content-Type", "application/json").send(JSON.stringify(body));
}
//#endregion

//# sourceMappingURL=dokumenttypAnpassen.js.map