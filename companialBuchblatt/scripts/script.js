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
getLogger();
//#endregion
//#region ../../helper/utils/credentials.ts
import_main.config({ path: path.resolve(__dirname, "../../../helper/utils/.env") });
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
* Companial Buchblatt-Übergabe: legt in Business Central (gehostet bei
* Companial) über drei veröffentlichte SOAP-Codeunits einen Beleg an:
*   1. CreateHeader            - Belegkopf
*   2. CreateLines             - je Zeile ein Aufruf
*   3. CreateBuchblattZeilen   - erzeugt aus pID die Buchblattzeilen
*
* Aufruf per POST mit { header, lines } (Felder siehe HeaderData/LineData,
* alle Werte als Text). Ohne Body werden die Beispieldaten unten verwendet.
* Antwort: { id, header, lines[], buchblatt } mit den return_values aus BC.
*
* Anmeldung: OAuth 2.0 Client-Credentials gegen Microsoft Entra ID mit einer
* App-Registrierung, die in BC auf der Seite "Microsoft Entra-Anwendungen"
* (Karte mit Client-ID, Status "Aktiviert", Berechtigungssätzen) angelegt ist.
* Das Token bleibt nur im Speicher der laufenden Script-Instanz.
*
* Offene Punkte (Stand 10.11.2026):
*  - Scope/Audience: Für eine bei Companial gehostete Instanz kann der Scope
*    von der SaaS-Vorgabe abweichen (App-ID-URI der Instanz + "/.default") -
*    bei Companial erfragen und in der Script-Variable companialScope setzen.
*  - Text-Formate für Datum/Betrag (dd.MM.yyyy / Komma?) mit der AL-Seite
*    abstimmen - die Beispieldaten sind nur eine Annahme.
*  - Servicename vs. Methodenname: Die URLs enthalten je Prozedur einen
*    eigenen Servicenamen. Angenommen ist Methode == Servicename. Falls die
*    WSDL etwas anderes zeigt, SERVICES unten anpassen.
*/
var logger = getLogger();
var config = { mode: process.platform === "linux" ? "production" : "development" };
var SERVICES = {
	header: {
		service: "CreateHeader",
		method: "CreateHeader"
	},
	lines: {
		service: "CreateLines",
		method: "CreateLines"
	},
	buchblatt: {
		service: "CreateBuchblattZeilen",
		method: "CreateBuchblattZeilen"
	}
};
var DEFAULT_SCOPE = "https://api.businesscentral.dynamics.com/.default";
var SAMPLE_ID = "DV-TEST-0001";
var SAMPLE_DMS_NO = "P000012345";
var SAMPLE_HEADER = {
	pID: SAMPLE_ID,
	pDMSNo: SAMPLE_DMS_NO,
	pScandatum: "10.11.2026",
	pExtBelegnummer: "RE-2026-4711",
	pKreditorNr: "70000",
	pBelegdatum: "05.11.2026",
	pZahlungsbedingung: "14T2%",
	pZahlungsformcode: "BANK",
	pBenutzerID: "DVELOP",
	pBuchungsdatum: "10.11.2026",
	pBetrag: "1190,00",
	pMwst: "190,00"
};
var SAMPLE_LINES = [{
	pID: SAMPLE_ID,
	pDMSNo: SAMPLE_DMS_NO,
	pZeilennr: "10000",
	pArt: "Sachkonto",
	pKostenstelle: "1000",
	pKostentraeger: "",
	pBeschreibung: "Wartung Mahlanlage",
	pArtikelEDI: "",
	pArtikelverfahrenEDI: "",
	pVarField1: "",
	pVarField2: "",
	pProdBuchGrp: "DIENSTL",
	pBetrag: "600,00",
	pMenge: "1"
}, {
	pID: SAMPLE_ID,
	pDMSNo: SAMPLE_DMS_NO,
	pZeilennr: "20000",
	pArt: "Sachkonto",
	pKostenstelle: "2000",
	pKostentraeger: "",
	pBeschreibung: "Ersatzteile Walzenstuhl",
	pArtikelEDI: "",
	pArtikelverfahrenEDI: "",
	pVarField1: "",
	pVarField2: "",
	pProdBuchGrp: "MATERIAL",
	pBetrag: "400,00",
	pMenge: "2"
}];
if (config.mode === "production") module.exports = async (req, res) => {
	await main((key) => req.var(key), parseBody(req), res);
};
else (async () => {
	initLogger(LogLevel.DEBUG);
	const devVars = {
		companialBaseUrl: process.env.COMPANIAL_BASE_URL ?? "https://t1016463.dynamicstocloud.com:1102/ST-155958/WS",
		companialCompany: process.env.COMPANIAL_COMPANY ?? "Hedwigsburger Okermuehle",
		companialTenant: process.env.COMPANIAL_TENANT ?? "T1016463.dynamicstocloud.com",
		entraTenantId: process.env.COMPANIAL_ENTRA_TENANT_ID,
		clientId: process.env.COMPANIAL_CLIENT_ID,
		clientSecret: process.env.COMPANIAL_CLIENT_SECRET,
		companialScope: process.env.COMPANIAL_SCOPE
	};
	await main((key) => devVars[key], {}, null);
})().catch((err) => {
	console.error("Error in development mode:", err);
});
async function main(getVar, body, res) {
	try {
		logger.debug("Start");
		const settings = readSettings(getVar);
		const header = body.header ?? SAMPLE_HEADER;
		const lines = body.lines ?? SAMPLE_LINES;
		if (!header.pID) throw new Error("header.pID fehlt.");
		const headerResult = await callCodeunit(settings, SERVICES.header, header);
		logger.info(`CreateHeader ${header.pID}: ${headerResult}`);
		const lineResults = [];
		for (const line of lines) {
			const result = await callCodeunit(settings, SERVICES.lines, {
				...line,
				pID: line.pID || header.pID,
				pDMSNo: line.pDMSNo || header.pDMSNo
			});
			logger.info(`CreateLines ${header.pID}/${line.pZeilennr}: ${result}`);
			lineResults.push(result);
		}
		const buchblattResult = await callCodeunit(settings, SERVICES.buchblatt, { pID: header.pID });
		logger.info(`CreateBuchblattZeilen ${header.pID}: ${buchblattResult}`);
		const result = {
			id: header.pID,
			header: headerResult,
			lines: lineResults,
			buchblatt: buchblattResult
		};
		if (res) res.status(200).set("Content-Type", "application/json").send(JSON.stringify(result));
		logger.info("End");
	} catch (error) {
		logger.error(`Error: ${error}`);
		if (res) res.status(500).set("Content-Type", "application/json").send(JSON.stringify({ error: error instanceof Error ? error.message : String(error) }));
	}
}
async function callCodeunit(settings, target, params) {
	const namespace = `urn:microsoft-dynamics-schemas/codeunit/${target.service}`;
	const url = `${settings.baseUrl.replace(/\/+$/, "")}/${encodeURIComponent(settings.company)}/Codeunit/${encodeURIComponent(target.service)}?tenant=${encodeURIComponent(settings.tenant)}`;
	const paramXml = Object.entries(params).map(([key, value]) => `<tns:${key}>${escapeXml(String(value ?? ""))}</tns:${key}>`).join("");
	const envelope = `<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tns="${namespace}"><soap:Body><tns:${target.method}>${paramXml}</tns:${target.method}></soap:Body></soap:Envelope>`;
	logger.debug(`[SOAP] POST ${url} | ${envelope}`);
	let response;
	try {
		response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "text/xml; charset=utf-8",
				SOAPAction: `"${namespace}:${target.method}"`,
				Authorization: `Bearer ${await getAccessToken(settings)}`
			},
			body: envelope
		});
	} catch (err) {
		const cause = err?.cause;
		throw new Error(`${target.service}: Netzwerkfehler ${err.message}${cause ? ` (${cause.code ?? cause})` : ""}`);
	}
	const text = await response.text();
	logger.debug(`[SOAP] ${response.status} ${target.service} | ${text}`);
	if (!response.ok) {
		const fault = extractTag(text, "faultstring");
		throw new Error(`${target.service}: HTTP ${response.status} ${fault ?? text.slice(0, 500)}`);
	}
	return extractTag(text, "return_value") ?? "";
}
var cachedToken;
async function getAccessToken(settings) {
	const key = `${settings.entraTenantId}|${settings.clientId}|${settings.scope}`;
	if (cachedToken && cachedToken.key === key && cachedToken.expiresAt - 6e4 > Date.now()) return cachedToken.token;
	const url = `https://login.microsoftonline.com/${encodeURIComponent(settings.entraTenantId)}/oauth2/v2.0/token`;
	logger.debug(`[OAuth] Token anfordern für Client ${settings.clientId}, Scope ${settings.scope}`);
	const response = await fetch(url, {
		method: "POST",
		headers: { "Content-Type": "application/x-www-form-urlencoded" },
		body: new URLSearchParams({
			grant_type: "client_credentials",
			client_id: settings.clientId,
			client_secret: settings.clientSecret,
			scope: settings.scope
		})
	});
	const data = await response.json().catch(() => ({}));
	if (!response.ok || !data.access_token) throw new Error(`Token-Abruf fehlgeschlagen: HTTP ${response.status} ${data.error ?? ""} ${data.error_description ?? ""}`.trim());
	cachedToken = {
		key,
		token: data.access_token,
		expiresAt: Date.now() + Number(data.expires_in ?? 3600) * 1e3
	};
	return cachedToken.token;
}
function extractTag(xml, tag) {
	const match = xml.match(new RegExp(`<(?:\\w+:)?${tag}[^>]*>([\\s\\S]*?)</(?:\\w+:)?${tag}>`));
	return match ? unescapeXml(match[1]) : void 0;
}
function escapeXml(value) {
	return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}
function unescapeXml(value) {
	return value.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, "\"").replace(/&apos;/g, "'").replace(/&amp;/g, "&");
}
function readSettings(getVar) {
	const settings = {
		baseUrl: String(getVar("companialBaseUrl") ?? "").trim(),
		company: String(getVar("companialCompany") ?? "").trim(),
		tenant: String(getVar("companialTenant") ?? "").trim(),
		entraTenantId: String(getVar("entraTenantId") ?? "").trim(),
		clientId: String(getVar("clientId") ?? "").trim(),
		clientSecret: String(getVar("clientSecret") ?? ""),
		scope: String(getVar("companialScope") ?? "").trim() || DEFAULT_SCOPE
	};
	const missing = Object.entries(settings).filter(([, v]) => !v).map(([k]) => k);
	if (missing.length) throw new Error(`Script-Variablen fehlen: ${missing.join(", ")}`);
	return settings;
}
function parseBody(req) {
	try {
		const body = req.json?.();
		return body && typeof body === "object" ? body : {};
	} catch {
		return {};
	}
}
//#endregion

//# sourceMappingURL=script.js.map