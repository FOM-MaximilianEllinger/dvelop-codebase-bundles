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
//#endregion
//#region src/scripts/preExport.ts
/**
* "Rechnungsleser: PreExport": wird vom Rechnungsleser vor dem Export
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
var logger = initLogger(LogLevel.INFO);
var DOCUMENT_TYPE_FIELD = "DocumentType";
var MAPPING = {
	Invoice: "2",
	CreditAdvice: "3",
	CorrectionOfInvoice: "2"
};
var KNOWN_CODES = /* @__PURE__ */ new Set(["2", "3"]);
module.exports = async (req, res) => {
	try {
		const body = parseBody(req);
		const documentType = String(body[DOCUMENT_TYPE_FIELD] ?? "");
		const mapped = MAPPING[documentType];
		if (mapped) body[DOCUMENT_TYPE_FIELD] = mapped;
		else if (!KNOWN_CODES.has(documentType)) body[DOCUMENT_TYPE_FIELD] = "2";
		logger.info(`DocumentType "${documentType}" -> "${body[DOCUMENT_TYPE_FIELD]}".`);
		res.status(200).set("Content-Type", "application/json").send(JSON.stringify(body));
	} catch (error) {
		const message = error instanceof Error ? error.message : String(error);
		logger.error(`Fehler: ${message}`);
		res.status(500).set("Content-Type", "application/json").send(JSON.stringify({ error: message }));
	}
};
function parseBody(req) {
	try {
		const body = req.json?.();
		return body && typeof body === "object" ? body : {};
	} catch {
		return {};
	}
}
//#endregion

//# sourceMappingURL=preExport.js.map