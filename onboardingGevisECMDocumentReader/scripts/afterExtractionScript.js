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
//#region ../../helper/classcon-documentreader/getBatchTasks.ts
/**
* Liefert die offenen Stapel des Rechnungslesers
* (GET /classcon-documentreader/DocumentProcessing/GetBatchTasksNew?id=<subscriptionId>).
*
* @param token - API-Key; leer = Browser-Session.
*/
async function getBatchTasks(baseUri, token, subscriptionId) {
	return await performHttpRequest(`${baseUri}/classcon-documentreader/DocumentProcessing/GetBatchTasksNew?id=${encodeURIComponent(subscriptionId)}`, {
		method: "GET",
		headers: {
			...token ? { Authorization: `Bearer ${token}` } : {},
			Accept: "application/json"
		}
	});
}
//#endregion
//#region ../../helper/classcon-documentreader/getPdf.ts
/**
* Liefert die Dokumentansicht eines Dokuments im Rechnungsleser als HTML
* (GET /classcon-documentreader/DocumentProcessing/GetPdf?taskID=<taskId>&documentID=<documentNumber>).
*
* @param documentId - Nummer des Dokuments im Stapel, z.B. "00000".
* @param token - API-Key; leer = Browser-Session.
*/
async function getPdf(baseUri, token, taskId, documentId) {
	return await performHttpRequest(`${baseUri}/classcon-documentreader/DocumentProcessing/GetPdf?taskID=${encodeURIComponent(taskId)}&documentID=${encodeURIComponent(documentId)}`, {
		method: "GET",
		headers: {
			...token ? { Authorization: `Bearer ${token}` } : {},
			Accept: "text/html"
		}
	});
}
//#endregion
//#region ../../helper/classcon-documentreader/getFeatures.ts
/**
* Liefert die Features (Kacheln) des Rechnungslesers - analog zu
* classconorderconfirmations/getFeatures. Die URL eines Features endet auf
* die Subscription-ID.
*
* @param baseUri - The base URI of the API.
* @param token - Optional bearer token; ohne Token wird die Browser-Session genutzt.
*/
async function getDocumentReaderFeatures(baseUri, token) {
	return await performHttpRequest(`${baseUri}/classcon-documentreader/getFeatures`, {
		method: "GET",
		headers: {
			...token ? { "Authorization": `Bearer ${token}` } : {},
			"Accept": "application/json",
			"Content-Type": "application/json",
			"Accept-Language": "de-DE"
		}
	});
}
//#endregion
//#region ../../helper/businessObjects/getAllEntriesFromEntity.ts
/**
* Retrieves all entries from a specified entity in a paginated API and merges them into a single response.
*
* @template T - The type of the response body, extending `GetAllEntriesFromEntity`.
* 
* @param {string} baseUri - The base URI of the API.
* @param {string | null} token - The authorization token for the API. Can be `null` if no token is required.
* @param {string} modelName - The name of the model to query.
* @param {string} entityPluralName - The plural name of the entity to retrieve entries from.
* @param {string} [endPointMoreEntries=""] - Optional endpoint to retrieve additional entries. Defaults to an empty string.
* 
* @returns {Promise<ApiResponse<T>>} A promise that resolves to an `ApiResponse` containing all entries from the entity.
* 
* @throws {Error} If the HTTP request fails or the response is invalid.
* 
* @remarks
* This function handles pagination by following the `@odata.nextLink` property in the response until all entries are retrieved.
* The final response contains all entries merged into the `value` property of the response body.
*/
async function getAllEntriesFromEntity(baseUri, token, modelName, entityPluralName, endPointMoreEntries = "") {
	const url = endPointMoreEntries || `${baseUri}/businessobjects/custom/${modelName}/${entityPluralName}`;
	const options = {
		method: "GET",
		headers: {
			"Authorization": `Bearer ${token}`,
			"Accept": "application/hal+json"
		}
	};
	const response = await performHttpRequest(url, options);
	let allValues = response.body.value ?? [];
	let nextLink = response.body["@odata.nextLink"];
	while (nextLink) {
		const nextResponse = await performHttpRequest(nextLink, options);
		const nextValues = nextResponse.body.value ?? [];
		allValues = [...allValues, ...nextValues];
		nextLink = nextResponse.body["@odata.nextLink"];
	}
	return {
		...response,
		body: {
			...response.body,
			value: allValues
		}
	};
}
//#endregion
//#region ../../helper/classcon-documentreader/autoRouting.ts
/**
* Dunkelverarbeitung des Rechnungslesers: Regeln je Lieferant (und optional
* Mandant), wann ein Dokument das Attribut "AutoRoutingFlag" = true bekommt -
* die Weiterleitungsregel "Dunkelverarbeitung" leitet es dann ohne Prüfung an
* den Export weiter.
*
* Gespeichert in Business Objects (Modell AUTO_ROUTING_MODEL). Gepflegt im
* Werkzeug "Rechnungsleser Dunkelverarbeitung"
* (projects/Toolbox_InvoiceReaderAutoRouting), ausgewertet im Skript
* "Rechnungsleser: AfterExtraction" (evaluateAutoRouting). Beide nutzen diese
* Datei - Änderungen am Bedingungskatalog wirken damit auf Formular UND
* Auswertung.
*/
var AUTO_ROUTING_ATTRIBUTE = "AutoRoutingFlag";
var AUTO_ROUTING_MODEL = {
	name: "invoiceReaderAutoRouting",
	description: "Rechnungsleser: Regeln für die Dunkelverarbeitung (AutoRoutingFlag)",
	rules: {
		name: "autoRoutingRule",
		pluralName: "autoRoutingRules",
		description: "Regel je Lieferant (und optional Mandant): wann ein Dokument ohne Prüfung exportiert wird.",
		key: {
			name: "id",
			type: "string",
			description: "Id der Regel (GUID)"
		},
		properties: [
			{
				name: "vendorNum",
				type: "string",
				required: true,
				indexed: true
			},
			{
				name: "vendorName",
				type: "string",
				required: false,
				indexed: false
			},
			{
				name: "companyNum",
				type: "string",
				required: false,
				indexed: true
			},
			{
				name: "active",
				type: "boolean",
				required: false,
				indexed: false
			},
			{
				name: "conditions",
				type: "string",
				required: false,
				indexed: false
			},
			{
				name: "validFrom",
				type: "string",
				required: false,
				indexed: false
			},
			{
				name: "validTo",
				type: "string",
				required: false,
				indexed: false
			},
			{
				name: "comment",
				type: "string",
				required: false,
				indexed: false
			}
		]
	},
	settings: {
		name: "autoRoutingSetting",
		pluralName: "autoRoutingSettings",
		description: "Globale Einstellungen der Dunkelverarbeitung (ein Eintrag mit id \"global\").",
		key: {
			name: "id",
			type: "string",
			description: "Immer \"global\""
		},
		properties: [{
			name: "enabled",
			type: "boolean",
			required: false,
			indexed: false
		}]
	}
};
var AUTO_ROUTING_SETTINGS_ID = "global";
var DEFAULT_AUTO_ROUTING_SETTINGS = { enabled: true };
var OPERATOR_LABELS = {
	lte: "≤",
	gte: "≥",
	between: "zwischen",
	eq: "ist",
	neq: "ist nicht",
	is: "ist"
};
/**
* Verfügbare Bedingungen. Neue Bedingung: Eintrag hier ergänzen und in
* conditionValue (unten) den Wert aus dem Dokument liefern.
*/
var CONDITION_FIELDS = [
	{
		id: "grossAmount",
		label: "Bruttobetrag",
		type: "number",
		operators: [
			"lte",
			"gte",
			"between"
		]
	},
	{
		id: "documentType",
		label: "Dokumenttyp",
		type: "select",
		operators: ["eq", "neq"],
		options: [
			{
				value: "Invoice",
				label: "Rechnung"
			},
			{
				value: "CreditAdvice",
				label: "Gutschrift"
			},
			{
				value: "CorrectionOfInvoice",
				label: "Rechnungskorrektur"
			}
		]
	},
	{
		id: "orderNumPresent",
		label: "Bestellnummer vorhanden",
		type: "boolean",
		operators: ["is"]
	},
	{
		id: "eInvoice",
		label: "E-Rechnung",
		type: "boolean",
		operators: ["is"]
	}
];
function conditionField(id) {
	return CONDITION_FIELDS.find((field) => field.id === id);
}
/** Bedingungen aus dem JSON-Text der Regel; ungültiger Inhalt = keine. */
function parseConditions(text) {
	if (!text?.trim()) return [];
	try {
		const list = JSON.parse(text);
		return Array.isArray(list) ? list.filter((c) => c && typeof c.field === "string" && typeof c.op === "string").map((c) => ({
			field: c.field,
			op: c.op,
			value: String(c.value ?? ""),
			...c.value2 !== void 0 && c.value2 !== "" ? { value2: String(c.value2) } : {}
		})) : [];
	} catch {
		return [];
	}
}
/** Kurztext einer Bedingung, z.B. "Bruttobetrag ≤ 250,00". */
function describeCondition(condition) {
	const field = conditionField(condition.field);
	if (!field) return `Unbekannte Bedingung „${condition.field}“`;
	if (field.type === "boolean") return `${field.label}: ${condition.value === "true" ? "ja" : "nein"}`;
	const show = (value) => field.type === "select" ? field.options?.find((o) => o.value === value)?.label ?? value ?? "" : formatAmount(parseAmount(value ?? ""));
	return condition.op === "between" ? `${field.label} zwischen ${show(condition.value)} und ${show(condition.value2)}` : `${field.label} ${OPERATOR_LABELS[condition.op] ?? condition.op} ${show(condition.value)}`;
}
/**
* Betrag aus dem Rechnungsleser bzw. der Eingabe: "1.234,56", "1234.56",
* "1 234,56 EUR". Das letzte Komma/der letzte Punkt mit 1-2 Nachkommastellen
* gilt als Dezimaltrenner. NaN = kein Betrag.
*/
function parseAmount(text) {
	const cleaned = text.replace(/[^\d,.\-]/g, "");
	if (!/\d/.test(cleaned)) return NaN;
	const match = /^(.*)[.,](\d{1,2})$/.exec(cleaned);
	const normalized = match ? `${match[1].replace(/[.,]/g, "")}.${match[2]}` : cleaned.replace(/[.,]/g, "");
	return Number(normalized);
}
function formatAmount(value) {
	return Number.isFinite(value) ? value.toLocaleString("de-DE", {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	}) : "?";
}
function conditionValue(field, doc) {
	switch (field) {
		case "grossAmount": {
			const amount = parseAmount(doc.attribute("GrossAmount"));
			return Number.isFinite(amount) ? amount : void 0;
		}
		case "documentType": return doc.attribute("DocumentType") || void 0;
		case "orderNumPresent": return !!(doc.attribute("OrderNum") || doc.attribute("OrderNumMulti"));
		case "eInvoice": return doc.isEInvoice;
		default: return;
	}
}
function conditionMet(condition, doc) {
	const actual = conditionValue(condition.field, doc);
	if (actual === void 0) return false;
	switch (condition.op) {
		case "lte": return typeof actual === "number" && actual <= parseAmount(condition.value);
		case "gte": return typeof actual === "number" && actual >= parseAmount(condition.value);
		case "between": return typeof actual === "number" && actual >= parseAmount(condition.value) && actual <= parseAmount(condition.value2 ?? "");
		case "eq": return String(actual).toLowerCase() === condition.value.toLowerCase();
		case "neq": return String(actual).toLowerCase() !== condition.value.toLowerCase();
		case "is": return actual === (condition.value === "true");
		default: return false;
	}
}
function sameKey(a, b) {
	return (a ?? "").trim().toLowerCase() === (b ?? "").trim().toLowerCase();
}
function isRuleValidOn(rule, day) {
	return (!rule.validFrom || rule.validFrom <= day) && (!rule.validTo || day <= rule.validTo);
}
/**
* Passende Regel: gleicher Lieferant, Mandant gleich oder leer (= alle),
* heute gültig. Eine Regel für genau diesen Mandanten geht vor "alle".
*/
function findAutoRoutingRule(rules, vendorNum, companyNum, day) {
	const candidates = rules.filter((rule) => sameKey(rule.vendorNum, vendorNum) && (!rule.companyNum?.trim() || sameKey(rule.companyNum, companyNum)) && isRuleValidOn(rule, day));
	return candidates.find((rule) => rule.companyNum?.trim()) ?? candidates[0];
}
/** Ermittelt das AutoRoutingFlag eines Dokuments samt Begründung fürs Log. */
function evaluateAutoRouting(rules, settings, doc) {
	if (!settings.enabled) return {
		flag: false,
		reason: "Dunkelverarbeitung global ausgeschaltet."
	};
	if (!doc.vendorNum) return {
		flag: false,
		reason: "Keine Lieferantennummer."
	};
	const rule = findAutoRoutingRule(rules, doc.vendorNum, doc.companyNum, doc.today);
	if (!rule) return {
		flag: false,
		reason: `Keine Regel für Lieferant ${doc.vendorNum}.`
	};
	if (!rule.active) return {
		flag: false,
		reason: `Regel ${rule.id} ist ausgeschaltet.`
	};
	const failed = parseConditions(rule.conditions).filter((condition) => !conditionMet(condition, doc));
	return failed.length === 0 ? {
		flag: true,
		reason: `Regel ${rule.id}: alle Bedingungen erfüllt.`
	} : {
		flag: false,
		reason: `Regel ${rule.id}: nicht erfüllt - ${failed.map(describeCondition).join("; ")}.`
	};
}
/** Globale Einstellungen aus dem Business-Objects-Eintrag (fehlend = Standard). */
function toAutoRoutingSettings(entry) {
	return { enabled: typeof entry?.enabled === "boolean" ? entry.enabled : DEFAULT_AUTO_ROUTING_SETTINGS.enabled };
}
//#endregion
//#region src/scripts/afterExtractionScript.ts
/**
* "Rechnungsleser: AfterExtraction": wird vom Rechnungsleser nach der
* Extraktion aufgerufen (Extension Point "IR_Business_PostExtractionScript",
* Typ ScriptingApp, Profil "PostExtractionScript" - hinterlegt vom
* Onboarding-Formular). Bekommt die Attribute des Dokuments als JSON und
* liefert sie zurück.
*
* Sucht im Protokoll des Rechnungslesers (CCLogDocuments/CCLogAttributes, per
* SQL über den Webindex-Designer) nach Dokumenten mit derselben
* Lieferantennummer (VENDOR_NUM) UND derselben Rechnungsnummer
* (InvoiceNumber). Das aktuelle Dokument selbst (DocumentUID) zählt nicht.
* Bei einer Dublette werden die Attribute IsDuplicate (true) und
* DuplicateDocumentIds (Ids der früheren Dokumente) gesetzt - im Typ des
* Attributs im Rechnungsleser (Text-Attribut: "true" bzw. kommagetrennte Ids).
*
* Dunkelverarbeitung: setzt AutoRoutingFlag nach den Regeln aus Business
* Objects (Werkzeug "Rechnungsleser Dunkelverarbeitung", Auswertung in
* helper/classcon-documentreader/autoRouting.ts). Fehlt das Modell oder
* schlägt das Laden fehl, bleibt AutoRoutingFlag unverändert (Wert aus den
* Stammdaten).
*
* customerVariables (vom Onboarding-Formular nur beim Neuanlegen gesetzt):
* apiKey (verschlüsselt). Die Mandanten-Adresse kommt aus dem Header
* "x-dv-baseuri".
*/
var logger = initLogger(LogLevel.INFO);
var APP = "classcon-documentreader";
var VENDOR_FIELD = "VENDOR_NUM";
var INVOICE_FIELD = "InvoiceNumber";
var DOCUMENT_ID_FIELD = "DocumentUID";
var ORDER_FIELD = "OrderNum";
var VENDOR_DELIVERY_FIELD = "VendorDeliveryNum";
var VENDOR_DELIVERY_DATE_FIELD = "VendorDeliveryDate";
var SKONTO_COUNT = 2;
var SKONTO_KEYS = {
	TAGE: "Tage",
	PROZENT: "Prozent",
	BASISBETRAG: "Basisbetrag"
};
var COMPANY_FIELD = "DEBITOR_NUM";
var DUPLICATE_FLAG_FIELD = "IsDuplicate";
var DUPLICATE_IDS_FIELD = "DuplicateDocumentIds";
module.exports = async (req, res) => {
	const body = parseBody(req);
	logger.info(`Eingang: ${JSON.stringify(body)}`);
	let isEInvoice;
	try {
		const baseUri = req.get("x-dv-baseuri");
		const apiKey = req.var("apiKey");
		const current = await findCurrentBatchDocument(baseUri, apiKey, body);
		if (current?.candidates !== 1) logger.info(`Stapel nicht eindeutig (${current?.candidates ?? 0} Treffer) - keine Werte aus der E-Rechnung.`);
		else {
			const metadataText = extractScriptVariable(String((await getPdf(baseUri, apiKey, current.taskId, current.documentNumber)).body ?? ""), "metadataText");
			isEInvoice = !!metadataText?.trim();
			const orderNum = xmlElementText(metadataText ?? "", "PurchaseOrderReference");
			if (orderNum) {
				logger.info(`${ORDER_FIELD}: "${attribute(body, ORDER_FIELD)}" -> "${orderNum}" (PurchaseOrderReference)`);
				setAttribute(body, ORDER_FIELD, orderNum);
			}
			const vendorDeliveryNum = xmlElementText(metadataText ?? "", "DespatchAdviceReference");
			if (vendorDeliveryNum) {
				logger.info(`${VENDOR_DELIVERY_FIELD}: "${attribute(body, VENDOR_DELIVERY_FIELD)}" -> "${vendorDeliveryNum}" (DespatchAdviceReference)`);
				setAttribute(body, VENDOR_DELIVERY_FIELD, vendorDeliveryNum);
			}
			const vendorDeliveryDate = germanDate(xmlElementText(metadataText ?? "", "DespatchAdviceDate"));
			if (vendorDeliveryDate) {
				logger.info(`${VENDOR_DELIVERY_DATE_FIELD}: "${attribute(body, VENDOR_DELIVERY_DATE_FIELD)}" -> "${vendorDeliveryDate}" (DespatchAdviceDate)`);
				setAttribute(body, VENDOR_DELIVERY_DATE_FIELD, vendorDeliveryDate);
			}
			parseSkonto(xmlElementText(metadataText ?? "", "SpecifiedTradePaymentTerms")).slice(0, SKONTO_COUNT).forEach((entry, index) => {
				for (const [key, suffix] of Object.entries(SKONTO_KEYS)) {
					const value = entry[key];
					if (!value) continue;
					const field = `Skonto${index + 1}_${suffix}`;
					logger.info(`${field}: "${attribute(body, field)}" -> "${value}" (SpecifiedTradePaymentTerms)`);
					setAttribute(body, field, value);
				}
			});
		}
	} catch (error) {
		logger.error(`Werte aus der E-Rechnung fehlgeschlagen: ${error instanceof Error ? error.message : String(error)}`);
	}
	try {
		const vendorNum = attribute(body, VENDOR_FIELD);
		const invoiceNumber = attribute(body, INVOICE_FIELD);
		if (!vendorNum || !invoiceNumber) logger.info(`Keine Prüfung: ${VENDOR_FIELD} "${vendorNum}" / ${INVOICE_FIELD} "${invoiceNumber}" unvollständig.`);
		else {
			const duplicates = await findDuplicates(req.get("x-dv-baseuri"), req.var("apiKey"), vendorNum, invoiceNumber, attribute(body, DOCUMENT_ID_FIELD));
			logger.info(`Lieferant "${vendorNum}", Rechnung "${invoiceNumber}": ${duplicates.length} Dublette(n) ${JSON.stringify(duplicates)}`);
			if (duplicates.length > 0) {
				setAttribute(body, DUPLICATE_FLAG_FIELD, true);
				setAttribute(body, DUPLICATE_IDS_FIELD, duplicates.map((d) => d.documentId));
			}
		}
	} catch (error) {
		logger.error(`Dublettenprüfung fehlgeschlagen: ${error instanceof Error ? error.message : String(error)}`);
	}
	try {
		await applyAutoRouting(req.get("x-dv-baseuri"), req.var("apiKey"), body, isEInvoice);
	} catch (error) {
		logger.error(`Dunkelverarbeitung fehlgeschlagen: ${error instanceof Error ? error.message : String(error)}`);
	}
	const response = JSON.stringify(body);
	logger.info(`Antwort: ${response}`);
	res.status(200).set("Content-Type", "application/json").send(response);
};
/**
* Setzt AutoRoutingFlag nach den Regeln aus Business Objects. Ohne Modell
* (Dunkelverarbeitung nicht eingerichtet) bleibt das Attribut unverändert.
*/
async function applyAutoRouting(baseUri, apiKey, body, isEInvoice) {
	const load = async (pluralName) => {
		try {
			return (await getAllEntriesFromEntity(baseUri, apiKey, AUTO_ROUTING_MODEL.name, pluralName)).body.value ?? [];
		} catch (error) {
			if (String(error).includes("status: 404")) return void 0;
			throw error;
		}
	};
	const [rules, settingsEntries] = await Promise.all([load(AUTO_ROUTING_MODEL.rules.pluralName), load(AUTO_ROUTING_MODEL.settings.pluralName)]);
	if (!rules) {
		logger.info(`Dunkelverarbeitung: Business-Objects-Modell "${AUTO_ROUTING_MODEL.name}" fehlt - ${AUTO_ROUTING_ATTRIBUTE} bleibt "${attribute(body, AUTO_ROUTING_ATTRIBUTE)}".`);
		return;
	}
	const result = evaluateAutoRouting(rules, toAutoRoutingSettings(settingsEntries?.find((entry) => entry.id === AUTO_ROUTING_SETTINGS_ID)), {
		vendorNum: attribute(body, VENDOR_FIELD),
		companyNum: attribute(body, COMPANY_FIELD),
		attribute: (name) => attribute(body, name),
		isEInvoice,
		today: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10)
	});
	logger.info(`${AUTO_ROUTING_ATTRIBUTE}: "${attribute(body, AUTO_ROUTING_ATTRIBUTE)}" -> ${result.flag} (${result.reason})`);
	setAttribute(body, AUTO_ROUTING_ATTRIBUTE, result.flag);
}
async function findDuplicates(baseUri, apiKey, vendorNum, invoiceNumber, currentDocumentId) {
	const sqlQuery = `
SELECT
  doc.DocumentId,
  aV.Attribute_After AS VendorNum,
  aI.Attribute_After AS InvoiceNumber
FROM
  CCLogDocuments AS doc
  JOIN CCLogAttributes AS aV ON aV.DocumentID = doc.DocumentID
    AND aV.Attribute_Name = '${VENDOR_FIELD}'
    AND aV.Attribute_After = ${sqlString(vendorNum)}
  JOIN CCLogAttributes AS aI ON aI.DocumentID = doc.DocumentID
    AND aI.Attribute_Name = '${INVOICE_FIELD}'
    AND aI.Attribute_After = ${sqlString(invoiceNumber)}${currentDocumentId ? `
WHERE
  doc.DocumentID <> ${sqlString(currentDocumentId)}` : ""}`;
	logger.debug(`SQL Query: ${sqlQuery}`);
	const result = (await executeSqlQuery(baseUri, apiKey, APP, sqlQuery)).body;
	const headers = (result?.headers ?? []).map((h) => h.toLowerCase());
	const column = (cells, name) => cells[headers.indexOf(name.toLowerCase())] ?? "";
	return (result?.rows ?? []).map((row) => ({
		documentId: column(row.cells ?? [], "DocumentId"),
		vendorNum: column(row.cells ?? [], "VendorNum"),
		invoiceNumber: column(row.cells ?? [], "InvoiceNumber")
	}));
}
function sqlString(value) {
	return `N'${value.replace(/'/g, "''")}'`;
}
function attribute(body, name) {
	const key = name.toLowerCase();
	for (const [field, value] of Object.entries(body)) if (field.toLowerCase() === key && value !== null && typeof value !== "object") return String(value).trim();
	for (const value of Object.values(body)) {
		if (!Array.isArray(value)) continue;
		for (const entry of value) if (String(entry?.Name ?? entry?.AttributeName ?? entry?.Id ?? entry?.name ?? "").toLowerCase() === key) return String(entry?.Value ?? entry?.value ?? "").trim();
	}
	return "";
}
function setAttribute(body, name, value) {
	body[name] = typeof body[name] === "string" ? Array.isArray(value) ? value.join(", ") : String(value) : value;
}
function parseSkonto(text) {
	return text.split(/\r?\n/).map((line) => line.trim()).filter((line) => line.toUpperCase().startsWith("#SKONTO#")).map((line) => Object.fromEntries(line.split("#").filter((part) => part.includes("=")).map((part) => {
		const [key, ...rest] = part.split("=");
		return [key.trim().toUpperCase(), rest.join("=").trim()];
	})));
}
function germanDate(value) {
	const match = /^(\d{4})-?(\d{2})-?(\d{2})/.exec(value);
	return match ? `${match[3]}.${match[2]}.${match[1]}` : value;
}
function parseBody(req) {
	try {
		const body = req.json?.();
		return body && typeof body === "object" ? body : {};
	} catch {
		return {};
	}
}
/**
* Sucht das aktuelle Dokument in den Stapeln des Rechnungslesers
* (GetBatchTasksNew, Listen tasksInProgress und tasksIndex): Dateiname
* (OriginalFileName = displayName) und Ersteller des Stapels
* (BatchCreator = creator) müssen passen. Passen mehrere, gewinnen Stapel in
* Verarbeitung vor offenen, danach der jüngste Stapel.
*/
async function findCurrentBatchDocument(baseUri, apiKey, body) {
	const fileName = attribute(body, "OriginalFileName").toLowerCase();
	const creator = attribute(body, "BatchCreator").toLowerCase();
	if (!fileName || !creator) {
		logger.info(`Keine Stapelsuche: OriginalFileName "${fileName}" / BatchCreator "${creator}" unvollständig.`);
		return;
	}
	const subscriptionId = (await getDocumentReaderFeatures(baseUri, apiKey)).body.features?.find((f) => f.url?.includes(APP))?.url?.split("/").pop();
	if (!subscriptionId) throw new Error("Subscription-ID des Rechnungslesers nicht gefunden.");
	const result = (await getBatchTasks(baseUri, apiKey, subscriptionId)).body;
	const candidates = [["tasksInProgress", result?.tasksInProgress], ["tasksIndex", result?.tasksIndex]].flatMap(([list, entries]) => (entries ?? []).map((entry) => ({
		list,
		entry
	}))).filter(({ entry }) => entry.batchTask?.creator?.toLowerCase() === creator).flatMap(({ list, entry }) => documentsOf(entry).filter((doc) => doc.displayName?.trim().toLowerCase() === fileName).map((doc) => ({
		list,
		task: entry.batchTask,
		doc
	}))).sort((a, b) => listRank(a.list) - listRank(b.list) || (b.task.creationTimeStamp ?? 0) - (a.task.creationTimeStamp ?? 0));
	const match = candidates[0];
	return match && {
		list: match.list,
		subscriptionId: match.task.subscriptionId ?? subscriptionId,
		processSequenceId: match.task.processSequenceId ?? "",
		taskId: match.task.taskId ?? "",
		documentNumber: match.doc.documentNumber ?? "",
		candidates: candidates.length
	};
}
var listRank = (list) => list === "tasksInProgress" ? 0 : 1;
function documentsOf(entry) {
	return entry.batchTask?.documentMetaDataList ?? entry.documentModels ?? [];
}
/**
* Liest den Wert einer Variablen aus dem <script> einer HTML-Seite
* (`var name = "…";`, `name: '…'` o.ä.): Zeichenketten in Anführungszeichen
* werden entschlüsselt, sonst kommt der Rohtext bis zum Zeilenende bzw. ";"
* zurück.
*/
function extractScriptVariable(html, name) {
	const quoted = new RegExp(String.raw`\b${name}\s*[:=]\s*(["'` + "`" + String.raw`])((?:\\[\s\S]|(?!\1)[^\\])*)\1`).exec(html);
	if (quoted) {
		const [, quote, raw] = quoted;
		try {
			const json = quote === "\"" ? raw : raw.replace(/\\(['`])/g, "$1").replace(/"/g, "\\\"");
			return JSON.parse(`"${json}"`);
		} catch {
			return raw;
		}
	}
	return new RegExp(String.raw`\b${name}\s*[:=]\s*([^;\r\n]*)`).exec(html)?.[1]?.trim();
}
/**
* Text des ersten XML-Elements mit diesem lokalen Namen - mit beliebigem
* Namespace-Präfix (<xr:Name>, <ram:Name>, <Name>) und Attributen. Entities
* (&amp; …) werden aufgelöst; leer = nicht vorhanden.
*/
function xmlElementText(xml, localName) {
	const text = xml.includes("\\u003c") ? xml.replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) => String.fromCharCode(parseInt(hex, 16))) : xml;
	return (new RegExp(String.raw`<(?:[\w.-]+:)?${localName}(?:\s[^>]*)?>([\s\S]*?)</(?:[\w.-]+:)?${localName}\s*>`).exec(text)?.[1] ?? "").replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, "\"").replace(/&apos;/g, "'").replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n))).replace(/&amp;/g, "&").trim();
}
//#endregion

//# sourceMappingURL=afterExtractionScript.js.map