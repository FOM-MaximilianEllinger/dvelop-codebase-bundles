/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "../../helper/dms/createSourceMapping.ts"
/*!***********************************************!*\
  !*** ../../helper/dms/createSourceMapping.ts ***!
  \***********************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createSourceMapping = createSourceMapping;
const performHttpRequest_1 = __webpack_require__(/*! ../performHttpRequest/performHttpRequest */ "../../helper/performHttpRequest/performHttpRequest.ts");
/**
 * Creates a new source mapping in the specified repository.
 *
 * @template T - The expected response type.
 * @param baseUri - The base URI of the DMS API.
 * @param token - The bearer token used for authentication.
 * @param repositoryId - The identifier of the repository where the source mapping will be created.
 * @param sourceMapping - The body payload containing the source mapping details.
 * @returns A promise that resolves to an ApiResponse of type T.
 */
async function createSourceMapping(baseUri, token, repositoryId, sourceMapping) {
    const url = `${baseUri}/dms/r/${repositoryId}/m`;
    const headers = {
        "Authorization": `Bearer ${token}`,
        "Accept": "application/json",
        "Content-Type": "application/json",
    };
    const options = {
        method: "POST",
        headers,
        body: JSON.stringify(sourceMapping),
    };
    return await (0, performHttpRequest_1.performHttpRequest)(url, options);
}


/***/ },

/***/ "../../helper/dms/getMappingContainers.ts"
/*!************************************************!*\
  !*** ../../helper/dms/getMappingContainers.ts ***!
  \************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getMappingContainer = getMappingContainer;
exports.updateMappingContainer = updateMappingContainer;
exports.getMappingContainers = getMappingContainers;
const performHttpRequest_1 = __webpack_require__(/*! ../performHttpRequest/performHttpRequest */ "../../helper/performHttpRequest/performHttpRequest.ts");
/**
 * Liest ein einzelnes Quell-Mapping inkl. seiner Zuordnungen (GET auf den
 * self-Link aus getMappingContainers, z.B.
 * /dms/r/<repositoryId>/mapping/container/<id>).
 */
async function getMappingContainer(baseUri, token, container) {
    const href = container._links?.self?.href;
    if (!href) {
        throw new Error(`Für das Quell-Mapping "${container.name}" liefert die API keinen Link.`);
    }
    const headers = {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        Accept: "application/hal+json, application/json",
    };
    return await (0, performHttpRequest_1.performHttpRequest)(new URL(href, baseUri).toString(), { method: "GET", headers });
}
/**
 * Speichert ein bestehendes Quell-Mapping (PUT
 * /dms/r/<repositoryId>/mapping/container/<id>) - wie die DMS-Oberfläche mit
 * {"name", "id", "sourceId", "mappingItems": [...]}. mappingItems ersetzt die
 * komplette Liste, also vorher mit getMappingContainer laden und ergänzen.
 */
async function updateMappingContainer(baseUri, token, repositoryId, container) {
    if (!container.id) {
        throw new Error(`Quell-Mapping "${container.name}" hat keine Id.`);
    }
    const url = `${baseUri}/dms/r/${repositoryId}/mapping/container/${container.id}`;
    const headers = {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        Accept: "application/hal+json, application/json",
        "Content-Type": "application/json",
    };
    const body = {
        name: container.name,
        id: container.id,
        sourceId: container.sourceId,
        mappingItems: container.mappingItems ?? [],
    };
    return await (0, performHttpRequest_1.performHttpRequest)(url, { method: "PUT", headers, body: JSON.stringify(body) });
}
/**
 * Liest die Quell-Mappings eines Repositorys
 * (GET /dms/r/<repositoryId>/mapping/container) - z.B. um vor
 * createSourceMapping zu prüfen, ob für eine Quelle schon ein Mapping existiert.
 *
 * @param baseUri - The base URI of the DMS API.
 * @param token - Optional bearer token; ohne Token wird die Browser-Session genutzt.
 * @param repositoryId - The identifier of the repository.
 */
async function getMappingContainers(baseUri, token, repositoryId) {
    const url = `${baseUri}/dms/r/${repositoryId}/mapping/container`;
    const headers = {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        Accept: "application/hal+json, application/json",
    };
    const options = {
        method: "GET",
        headers,
    };
    return await (0, performHttpRequest_1.performHttpRequest)(url, options);
}


/***/ },

/***/ "../../helper/dms/getRepositories.ts"
/*!*******************************************!*\
  !*** ../../helper/dms/getRepositories.ts ***!
  \*******************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getRepositories = getRepositories;
const performHttpRequest_1 = __webpack_require__(/*! ../performHttpRequest/performHttpRequest */ "../../helper/performHttpRequest/performHttpRequest.ts");
async function getRepositories(baseUri, token) {
    const url = `${baseUri}/dms/r`;
    const headers = {
        "Authorization": `Bearer ${token}`,
        "Accept": "application/json",
        "Content-Type": "application/json",
    };
    const options = {
        method: "GET",
        headers,
    };
    return await (0, performHttpRequest_1.performHttpRequest)(url, options);
}


/***/ },

/***/ "../../helper/dmsConfig/createEvent.ts"
/*!*********************************************!*\
  !*** ../../helper/dmsConfig/createEvent.ts ***!
  \*********************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EventType = void 0;
exports.createEvent = createEvent;
const performHttpRequest_1 = __webpack_require__(/*! ../performHttpRequest/performHttpRequest */ "../../helper/performHttpRequest/performHttpRequest.ts");
var EventType;
(function (EventType) {
    EventType["PreSearch"] = "presearch";
    EventType["PostSearch"] = "postsearch";
    EventType["ValidateImport"] = "validateimport";
    EventType["PreImport"] = "preimport";
    EventType["PostImport"] = "postimport";
    EventType["PreNewVersion"] = "prenewversion";
    EventType["PostNewVersion"] = "postnewversion";
    EventType["ValidateUpdateProperties"] = "validateupdateproperties";
    EventType["PreUpdateProperties"] = "preupdateproperties";
    EventType["PostUpdateProperties"] = "postupdateproperties";
    EventType["PreLink"] = "prelink";
    EventType["PostLink"] = "postlink";
    EventType["PreDelete"] = "predelete";
    EventType["PostDelete"] = "postdelete";
    EventType["PreTransfer"] = "pretransfer";
    EventType["PostTransfer"] = "posttransfer";
    EventType["PreGeneratedDocument"] = "pregenerateddocument";
    EventType["PostGeneratedDocument"] = "postgenerateddocument";
    EventType["PreReleaseDocument"] = "prereleasedocument";
    EventType["PostReleaseDocument"] = "postreleasedocument";
})(EventType || (exports.EventType = EventType = {}));
/**
 * Creates an event in the DMS configuration for a specified repository.
 *
 * @template T - The type of the response expected from the API.
 * @param {string} baseUri - The base URI of the DMS configuration API.
 * @param {string} token - The authorization token to access the API.
 * @param {string} repositoryId - The ID of the repository where the event will be created.
 * @param {EventType} eventType - The type of the event to be created.
 * @param {Event} event - The event data to be sent in the request body.
 * @returns {Promise<ApiResponse<T>>} A promise that resolves to the API response of type `T`.
 */
async function createEvent(baseUri, token, repositoryId, eventType, event) {
    const url = `${baseUri}/dmsconfig/r/${repositoryId}/events/${eventType}`;
    const headers = {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
    };
    const options = {
        method: "POST",
        headers,
        body: JSON.stringify(event)
    };
    return await (0, performHttpRequest_1.performHttpRequest)(url, options);
}


/***/ },

/***/ "../../helper/dmsConfig/getEvents.ts"
/*!*******************************************!*\
  !*** ../../helper/dmsConfig/getEvents.ts ***!
  \*******************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Key = exports.HandleResponse = void 0;
exports.getEvents = getEvents;
const performHttpRequest_1 = __webpack_require__(/*! ../performHttpRequest/performHttpRequest */ "../../helper/performHttpRequest/performHttpRequest.ts");
var HandleResponse;
(function (HandleResponse) {
    HandleResponse["None"] = "NONE";
    HandleResponse["Status"] = "STATUS";
    HandleResponse["StatusAndBody"] = "STATUS_AND_BODY";
})(HandleResponse || (exports.HandleResponse = HandleResponse = {}));
var Key;
(function (Key) {
    Key["Category"] = "CATEGORY";
})(Key || (exports.Key = Key = {}));
/**
 * Fetches the events for a specific repository from the DMS configuration.
 *
 * @param baseUri - The base URI of the DMS configuration API.
 * @param token - The authorization token to access the API.
 * @param repositoryId - The ID of the repository for which events are to be retrieved.
 * @returns A promise that resolves to an `ApiResponse` containing the events data.
 */
async function getEvents(baseUri, token, repositoryId) {
    const url = `${baseUri}/dmsconfig/r/${repositoryId}/events`;
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

/***/ "../../helper/dmsConfig/updateEvent.ts"
/*!*********************************************!*\
  !*** ../../helper/dmsConfig/updateEvent.ts ***!
  \*********************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.updateEvent = updateEvent;
const performHttpRequest_1 = __webpack_require__(/*! ../performHttpRequest/performHttpRequest */ "../../helper/performHttpRequest/performHttpRequest.ts");
/**
 * Aktualisiert einen bestehenden Webhook (PUT auf dessen "_links.self" aus
 * getEvents).
 *
 * @param baseUri - The base URI of the DMS configuration API.
 * @param token - The authorization token to access the API.
 * @param existing - Bestehender Webhook aus getEvents.
 * @param event - Neue Einstellungen des Webhooks.
 */
async function updateEvent(baseUri, token, existing, event) {
    const href = existing._links?.self?.href;
    if (!href) {
        throw new Error("Für den Webhook liefert die API keinen Link zum Aktualisieren.");
    }
    const headers = {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        Accept: "application/json",
        "Content-Type": "application/json",
    };
    const options = {
        method: "PUT",
        headers,
        body: JSON.stringify({ ...event, id: existing.id }),
    };
    return await (0, performHttpRequest_1.performHttpRequest)(new URL(href, baseUri).toString(), options);
}


/***/ },

/***/ "../../helper/emailinbound/createEmailinboundProfile.ts"
/*!**************************************************************!*\
  !*** ../../helper/emailinbound/createEmailinboundProfile.ts ***!
  \**************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createEmailinboundProfiles = createEmailinboundProfiles;
const performHttpRequest_1 = __webpack_require__(/*! ../performHttpRequest/performHttpRequest */ "../../helper/performHttpRequest/performHttpRequest.ts");
async function createEmailinboundProfiles(baseUri, token, payload) {
    const url = `${baseUri}/emailinbound/settings`;
    const headers = {
        "Authorization": `Bearer ${token}`,
        "Accept": "application/json",
        "Content-Type": "application/json; charset=utf-8",
    };
    const options = {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
    };
    return await (0, performHttpRequest_1.performHttpRequest)(url, options);
}


/***/ },

/***/ "../../helper/emailinbound/getEmailinboundProfiles.ts"
/*!************************************************************!*\
  !*** ../../helper/emailinbound/getEmailinboundProfiles.ts ***!
  \************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getEmailinboundProfiles = getEmailinboundProfiles;
const performHttpRequest_1 = __webpack_require__(/*! ../performHttpRequest/performHttpRequest */ "../../helper/performHttpRequest/performHttpRequest.ts");
/**
 * Retrieves the list of email inbound profiles from the specified base URI.
 *
 * @param baseUri - The base URI of the API endpoint.
 * @param token - The bearer token used for authentication.
 * @returns A promise that resolves to an ApiResponse containing the email inbound profiles.
 */
async function getEmailinboundProfiles(baseUri, token) {
    const url = `${baseUri}/emailinbound/settings`;
    const headers = {
        "Authorization": `Bearer ${token}`,
        "Accept": "application/json",
        "Content-Type": "application/json; charset=utf-8",
    };
    const options = {
        method: "GET",
        headers
    };
    return await (0, performHttpRequest_1.performHttpRequest)(url, options);
}


/***/ },

/***/ "../../helper/emailinbound/updateEmailinboundProfile.ts"
/*!**************************************************************!*\
  !*** ../../helper/emailinbound/updateEmailinboundProfile.ts ***!
  \**************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.updateEmailinboundProfile = updateEmailinboundProfile;
const performHttpRequest_1 = __webpack_require__(/*! ../performHttpRequest/performHttpRequest */ "../../helper/performHttpRequest/performHttpRequest.ts");
/**
 * Aktualisiert ein bestehendes E-Mail-Postfach (PUT auf "_links.update" aus
 * getEmailinboundProfiles, sonst auf "_links.self").
 *
 * @param baseUri - The base URI of the API endpoint.
 * @param token - The bearer token used for authentication.
 * @param existing - Bestehendes Postfach aus getEmailinboundProfiles.
 * @param payload - Neue Einstellungen des Postfachs.
 */
async function updateEmailinboundProfile(baseUri, token, existing, payload) {
    const href = existing._links?.update?.href ?? existing._links?.self?.href;
    if (!href) {
        throw new Error(`Für das Postfach "${existing.mailbox}" liefert die API keinen Link zum Aktualisieren.`);
    }
    const url = new URL(href, baseUri).toString();
    const headers = {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
    };
    const options = {
        method: "PUT",
        headers,
        body: JSON.stringify(payload),
    };
    return await (0, performHttpRequest_1.performHttpRequest)(url, options);
}


/***/ },

/***/ "../../helper/identityprovider/createAPIKey.ts"
/*!*****************************************************!*\
  !*** ../../helper/identityprovider/createAPIKey.ts ***!
  \*****************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createAPIKey = createAPIKey;
const performHttpRequest_1 = __webpack_require__(/*! ../performHttpRequest/performHttpRequest */ "../../helper/performHttpRequest/performHttpRequest.ts");
/**
 * Legt einen API-Key für einen Benutzer an - wie die Identityprovider-
 * Oberfläche: POST /identityprovider/config/apikey mit
 * {"id":"create","status":"Unconfirmed","userId":"<id>","label":"<label>"}.
 *
 * @param token - Optional bearer token; ohne Token wird die Browser-Session genutzt.
 */
async function createAPIKey(baseUri, token = null, input) {
    const url = `${baseUri}/identityprovider/config/apikey`;
    const headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
    };
    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }
    const options = {
        method: "POST",
        headers,
        body: JSON.stringify(input),
    };
    return await (0, performHttpRequest_1.performHttpRequest)(url, options);
}


/***/ },

/***/ "../../helper/identityprovider/getAllUsers.ts"
/*!****************************************************!*\
  !*** ../../helper/identityprovider/getAllUsers.ts ***!
  \****************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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

/***/ "../../helper/identityprovider/getCurrentUserInformation.ts"
/*!******************************************************************!*\
  !*** ../../helper/identityprovider/getCurrentUserInformation.ts ***!
  \******************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getCurrentUserInformation = getCurrentUserInformation;
const performHttpRequest_1 = __webpack_require__(/*! ../performHttpRequest/performHttpRequest */ "../../helper/performHttpRequest/performHttpRequest.ts");
/**
 * Retrieves the current user information by validating the provided token
 * with the identity provider.
 *
 * @param baseUri - The base URI of the identity provider.
 * @param token - The optional bearer token for authentication. If not provided,
 *                the request will be made without an Authorization header.
 * @returns A promise that resolves to an `ApiResponse` containing the
 *          `GetCurrentUserInformation` data.
 */
async function getCurrentUserInformation(baseUri, token = null) {
    const url = `${baseUri}/identityprovider/validate`;
    const headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
    };
    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }
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

/***/ "../../helper/identityprovider/getUsers.ts"
/*!*************************************************!*\
  !*** ../../helper/identityprovider/getUsers.ts ***!
  \*************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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

/***/ "../../helper/inbound/createBatchProfile.ts"
/*!**************************************************!*\
  !*** ../../helper/inbound/createBatchProfile.ts ***!
  \**************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createBatchProfile = createBatchProfile;
const performHttpRequest_1 = __webpack_require__(/*! ../performHttpRequest/performHttpRequest */ "../../helper/performHttpRequest/performHttpRequest.ts");
async function createBatchProfile(baseUri, token, createBatchProfileBody) {
    const url = `${baseUri}/inbound/batchprofile`;
    const headers = {
        "Authorization": `Bearer ${token}`,
        "Accept": "application/json",
        "Content-Type": "application/json; charset=utf-8",
    };
    const options = {
        method: "POST",
        headers,
        body: JSON.stringify(createBatchProfileBody),
    };
    return await (0, performHttpRequest_1.performHttpRequest)(url, options);
}


/***/ },

/***/ "../../helper/inbound/getBatchProfiles.ts"
/*!************************************************!*\
  !*** ../../helper/inbound/getBatchProfiles.ts ***!
  \************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ID = exports.DisplayName = void 0;
exports.getBatchProfiles = getBatchProfiles;
const performHttpRequest_1 = __webpack_require__(/*! ../performHttpRequest/performHttpRequest */ "../../helper/performHttpRequest/performHttpRequest.ts");
var DisplayName;
(function (DisplayName) {
    DisplayName["BereitsBerechtigteGruppenUndPersonen"] = "Bereits berechtigte Gruppen und Personen";
    DisplayName["ErstellerInDESStapels"] = "Ersteller*in des Stapels";
})(DisplayName || (exports.DisplayName = DisplayName = {}));
var ID;
(function (ID) {
    ID["Da68014B8Faf48Da904BF8B360D0B803"] = "DA68014B-8FAF-48DA-904B-F8B360D0B803";
    ID["The005B1D7A0899481F9E61De43C90F1381"] = "005B1D7A-0899-481F-9E61-DE43C90F1381";
})(ID || (exports.ID = ID = {}));
/**
 * Retrieves batch profiles from the specified base URI using the provided authentication token.
 *
 * @template GetBatchProfiles - The expected response type for the batch profiles.
 * @param baseUri - The base URI of the API endpoint.
 * @param token - The Bearer token used for authentication.
 * @returns A promise that resolves to the batch profiles of type `GetBatchProfiles`.
 */
async function getBatchProfiles(baseUri, token) {
    const url = `${baseUri}/inbound/batchprofile`;
    const headers = {
        "Authorization": `Bearer ${token}`,
        "Accept": "application/json",
        "Content-Type": "application/json",
    };
    const options = {
        method: "GET",
        headers,
    };
    return await (0, performHttpRequest_1.performHttpRequest)(url, options);
}


/***/ },

/***/ "../../helper/inbound/updateBatchProfile.ts"
/*!**************************************************!*\
  !*** ../../helper/inbound/updateBatchProfile.ts ***!
  \**************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.updateBatchProfile = updateBatchProfile;
const performHttpRequest_1 = __webpack_require__(/*! ../performHttpRequest/performHttpRequest */ "../../helper/performHttpRequest/performHttpRequest.ts");
/**
 * Aktualisiert ein bestehendes Stapelprofil (PUT). Nutzt den Link
 * "_links.update" aus getBatchProfiles, sonst /inbound/batchprofile/<id>.
 *
 * @param baseUri - The base URI of the API endpoint.
 * @param token - The bearer token used for authentication.
 * @param profile - Bestehendes Profil (batchProfileId und ggf. _links aus getBatchProfiles).
 * @param body - Neue Einstellungen des Profils.
 */
async function updateBatchProfile(baseUri, token, profile, body) {
    const href = profile._links?.update?.href ?? `/inbound/batchprofile/${profile.batchProfileId}`;
    const url = new URL(href, baseUri).toString();
    const headers = {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
    };
    const options = {
        method: "PUT",
        headers,
        body: JSON.stringify({ ...body, batchProfileId: profile.batchProfileId }),
    };
    return await (0, performHttpRequest_1.performHttpRequest)(url, options);
}


/***/ },

/***/ "../../helper/performHttpRequest/performHttpRequest.ts"
/*!*************************************************************!*\
  !*** ../../helper/performHttpRequest/performHttpRequest.ts ***!
  \*************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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

/***/ "../../helper/scripting/getAllScripts.ts"
/*!***********************************************!*\
  !*** ../../helper/scripting/getAllScripts.ts ***!
  \***********************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getAllScripts = getAllScripts;
const performHttpRequest_1 = __webpack_require__(/*! ../performHttpRequest/performHttpRequest */ "../../helper/performHttpRequest/performHttpRequest.ts");
async function getAllScripts(baseUri, token) {
    const url = `${baseUri}/scripting/script`;
    const headers = {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
    };
    const options = {
        method: "GET",
        headers
    };
    return await (0, performHttpRequest_1.performHttpRequest)(url, options);
}


/***/ },

/***/ "../../helper/scripting/getScriptVersion.ts"
/*!**************************************************!*\
  !*** ../../helper/scripting/getScriptVersion.ts ***!
  \**************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getScriptVersion = getScriptVersion;
const performHttpRequest_1 = __webpack_require__(/*! ../performHttpRequest/performHttpRequest */ "../../helper/performHttpRequest/performHttpRequest.ts");
async function getScriptVersion(baseUri, token, scriptId) {
    const url = `${baseUri}/scripting/script/${scriptId}/version`;
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

/***/ "../../helper/scripting/importScript.ts"
/*!**********************************************!*\
  !*** ../../helper/scripting/importScript.ts ***!
  \**********************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.importScript = importScript;
const performHttpRequest_1 = __webpack_require__(/*! ../performHttpRequest/performHttpRequest */ "../../helper/performHttpRequest/performHttpRequest.ts");
async function importScript(baseUri, token, payload) {
    const url = `${baseUri}/scripting/import`;
    const headers = {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
    };
    const options = {
        method: "PUT",
        headers,
        body: JSON.stringify(payload),
    };
    return await (0, performHttpRequest_1.performHttpRequest)(url, options);
}


/***/ },

/***/ "../../helper/scripting/patchScript.ts"
/*!*********************************************!*\
  !*** ../../helper/scripting/patchScript.ts ***!
  \*********************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PatchScript_Scriptbody_CustomerVariable = exports.PatchScript_Scriptbody_OutputProperty = exports.PatchScript_Scriptbody_InputProperty = exports.PatchScript_Scriptbody_Description = exports.PatchScript_Scriptbody_Action = exports.PatchScript_Scriptbody = void 0;
exports.patchScript = patchScript;
const performHttpRequest_1 = __webpack_require__(/*! ../performHttpRequest/performHttpRequest */ "../../helper/performHttpRequest/performHttpRequest.ts");
class PatchScript_Scriptbody {
}
exports.PatchScript_Scriptbody = PatchScript_Scriptbody;
class PatchScript_Scriptbody_Action {
}
exports.PatchScript_Scriptbody_Action = PatchScript_Scriptbody_Action;
class PatchScript_Scriptbody_Description {
}
exports.PatchScript_Scriptbody_Description = PatchScript_Scriptbody_Description;
class PatchScript_Scriptbody_InputProperty {
}
exports.PatchScript_Scriptbody_InputProperty = PatchScript_Scriptbody_InputProperty;
class PatchScript_Scriptbody_OutputProperty {
}
exports.PatchScript_Scriptbody_OutputProperty = PatchScript_Scriptbody_OutputProperty;
class PatchScript_Scriptbody_CustomerVariable {
}
exports.PatchScript_Scriptbody_CustomerVariable = PatchScript_Scriptbody_CustomerVariable;
/**
 * Overrides a script version with the provided body content.
 *
 * @param baseUri - The base URI of the API endpoint.
 * @param token - The authorization token to access the API.
 * @param scriptId - The unique identifier of the script to override.
 * @param scriptVersionId - The unique identifier of the script version to override.
 * @param body - The content to override the script version with.
 * @returns A promise that resolves to the API response containing the overridden script details.
 */
async function patchScript(baseUri, token, scriptId, scriptVersionId, body) {
    const url = `${baseUri}/scripting/script/${scriptId}/version/${scriptVersionId}`;
    const headers = {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
    };
    const options = {
        method: "PATCH",
        headers,
        body: JSON.stringify(body),
    };
    return await (0, performHttpRequest_1.performHttpRequest)(url, options);
}


/***/ },

/***/ "../../helper/usermanagement/createGroup.ts"
/*!**************************************************!*\
  !*** ../../helper/usermanagement/createGroup.ts ***!
  \**************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createGroup = createGroup;
const performHttpRequest_1 = __webpack_require__(/*! ../performHttpRequest/performHttpRequest */ "../../helper/performHttpRequest/performHttpRequest.ts");
async function createGroup(baseUri, token, input) {
    const url = `${baseUri}/usermanagement/group`;
    const headers = {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
    };
    const options = {
        method: "POST",
        headers,
        body: JSON.stringify(input),
    };
    return await (0, performHttpRequest_1.performHttpRequest)(url, options);
}


/***/ },

/***/ "../../helper/usermanagement/getAllGroups.ts"
/*!***************************************************!*\
  !*** ../../helper/usermanagement/getAllGroups.ts ***!
  \***************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getAllGroups = getAllGroups;
const performHttpRequest_1 = __webpack_require__(/*! ../performHttpRequest/performHttpRequest */ "../../helper/performHttpRequest/performHttpRequest.ts");
/**
 * Retrieves all user groups from the user management service.
 *
 * @param baseUri - The base URI of the user management API.
 * @param token - The bearer token used for authentication.
 * @returns A promise that resolves to an `ApiResponse` containing all groups.
 */
async function getAllGroups(baseUri, token) {
    const url = `${baseUri}/usermanagement/group`;
    const headers = {
        "Authorization": `Bearer ${token}`,
        "Accept": "application/json",
        "Content-Type": "application/json",
    };
    const options = {
        method: "GET",
        headers
    };
    return await (0, performHttpRequest_1.performHttpRequest)(url, options);
}


/***/ },

/***/ "../../helper/utils/logger.ts"
/*!************************************!*\
  !*** ../../helper/utils/logger.ts ***!
  \************************************/
(__unused_webpack_module, exports) {


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

/***/ "../../helper/utils/tableExport.ts"
/*!*****************************************!*\
  !*** ../../helper/utils/tableExport.ts ***!
  \*****************************************/
(__unused_webpack_module, exports) {


/**
 * Export einer einfachen Tabelle (Kopfzeile + Zeilen) als CSV oder Excel
 * (.xlsx) direkt im Browser - ohne externe Bibliothek. Eine .xlsx-Datei ist
 * ein ZIP-Archiv aus wenigen XML-Dateien; hier wird es unkomprimiert
 * ("stored") erzeugt, was Excel/LibreOffice problemlos öffnen.
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.toCsv = toCsv;
exports.toXlsx = toXlsx;
exports.downloadBlob = downloadBlob;
exports.getTenantName = getTenantName;
// ---------------------------------------------------------------- CSV
/**
 * CSV im von deutschem Excel erwarteten Format: Semikolon als Trennzeichen,
 * CRLF als Zeilenende und UTF-8-BOM, damit Umlaute korrekt erkannt werden.
 */
function toCsv(table, separator = ";") {
    const escapeCell = (cell) => {
        const text = cell === null || cell === undefined ? "" : String(cell);
        return /["\r\n]/.test(text) || text.includes(separator)
            ? `"${text.replace(/"/g, '""')}"`
            : text;
    };
    const lines = [table.headers, ...table.rows].map((row) => row.map(escapeCell).join(separator));
    return new Blob(["﻿" + lines.join("\r\n")], { type: "text/csv;charset=utf-8" });
}
// ---------------------------------------------------------------- XLSX
function escapeXml(value) {
    return value
        // In XML 1.0 unzulässige Steuerzeichen entfernen, sonst meldet Excel eine beschädigte Datei.
        .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}
function columnName(index) {
    let name = "";
    for (let n = index + 1; n > 0; n = Math.floor((n - 1) / 26)) {
        name = String.fromCharCode(65 + ((n - 1) % 26)) + name;
    }
    return name;
}
function xlsxCell(cell, ref, style) {
    const s = style ? ` s="${style}"` : "";
    if (typeof cell === "number" && Number.isFinite(cell)) {
        return `<c r="${ref}"${s}><v>${cell}</v></c>`;
    }
    if (typeof cell === "boolean") {
        return `<c r="${ref}"${s} t="b"><v>${cell ? 1 : 0}</v></c>`;
    }
    const text = cell === null || cell === undefined ? "" : String(cell);
    return `<c r="${ref}"${s} t="inlineStr"><is><t xml:space="preserve">${escapeXml(text)}</t></is></c>`;
}
function sheetXml(table) {
    const allRows = [table.headers, ...table.rows];
    const columnCount = Math.max(1, ...allRows.map((row) => row.length));
    const lastRef = `${columnName(columnCount - 1)}${allRows.length}`;
    // Spaltenbreite grob nach längstem Inhalt (in Zeichen), begrenzt auf 10..60.
    const cols = Array.from({ length: columnCount }, (_, c) => {
        const longest = Math.max(...allRows.map((row) => String(row[c] ?? "").length));
        const width = Math.min(60, Math.max(10, longest + 2));
        return `<col min="${c + 1}" max="${c + 1}" width="${width}" customWidth="1"/>`;
    }).join("");
    const rowsXml = allRows
        .map((row, r) => {
        const cells = row.map((cell, c) => xlsxCell(cell, `${columnName(c)}${r + 1}`, r === 0 ? 1 : 0)).join("");
        return `<row r="${r + 1}">${cells}</row>`;
    })
        .join("");
    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
<sheetViews><sheetView workbookViewId="0"><pane ySplit="1" topLeftCell="A2" activePane="bottomLeft" state="frozen"/></sheetView></sheetViews>
<cols>${cols}</cols>
<sheetData>${rowsXml}</sheetData>
<autoFilter ref="A1:${lastRef}"/>
</worksheet>`;
}
function xlsxFiles(table, sheetName) {
    // Excel erlaubt max. 31 Zeichen und keine der Zeichen []:*?/\ im Blattnamen.
    const safeSheetName = escapeXml(sheetName.replace(/[\[\]:*?\/\\]/g, " ").slice(0, 31) || "Tabelle1");
    return [
        {
            name: "[Content_Types].xml",
            content: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
<Default Extension="xml" ContentType="application/xml"/>
<Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>
<Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>
<Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>
</Types>`,
        },
        {
            name: "_rels/.rels",
            content: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>
</Relationships>`,
        },
        {
            name: "xl/workbook.xml",
            content: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
<sheets><sheet name="${safeSheetName}" sheetId="1" r:id="rId1"/></sheets>
<definedNames><definedName name="_xlnm._FilterDatabase" localSheetId="0" hidden="1">'${safeSheetName.replace(/'/g, "''")}'!$A$1:$${columnName(Math.max(1, table.headers.length) - 1)}$${table.rows.length + 1}</definedName></definedNames>
</workbook>`,
        },
        {
            name: "xl/_rels/workbook.xml.rels",
            content: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/>
<Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
</Relationships>`,
        },
        {
            // Stil 0 = Standard, Stil 1 = fett mit grauem Hintergrund (Kopfzeile).
            name: "xl/styles.xml",
            content: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
<fonts count="2"><font><sz val="11"/><name val="Calibri"/></font><font><b/><sz val="11"/><name val="Calibri"/></font></fonts>
<fills count="3"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill><fill><patternFill patternType="solid"><fgColor rgb="FFE9ECEF"/><bgColor indexed="64"/></patternFill></fill></fills>
<borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders>
<cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>
<cellXfs count="2"><xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/><xf numFmtId="0" fontId="1" fillId="2" borderId="0" xfId="0" applyFont="1" applyFill="1"/></cellXfs>
<cellStyles count="1"><cellStyle name="Standard" xfId="0" builtinId="0"/></cellStyles>
</styleSheet>`,
        },
        { name: "xl/worksheets/sheet1.xml", content: sheetXml(table) },
    ];
}
const CRC_TABLE = (() => {
    const table = new Uint32Array(256);
    for (let n = 0; n < 256; n++) {
        let c = n;
        for (let k = 0; k < 8; k++) {
            c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
        }
        table[n] = c >>> 0;
    }
    return table;
})();
function crc32(data) {
    let crc = 0xffffffff;
    for (let i = 0; i < data.length; i++) {
        crc = CRC_TABLE[(crc ^ data[i]) & 0xff] ^ (crc >>> 8);
    }
    return (crc ^ 0xffffffff) >>> 0;
}
// Minimales ZIP ohne Kompression (Methode 0 "stored").
function createZip(files) {
    const encoder = new TextEncoder();
    const localParts = [];
    const centralParts = [];
    let offset = 0;
    for (const file of files) {
        const name = encoder.encode(file.name);
        const data = encoder.encode(file.content);
        const crc = crc32(data);
        const local = new Uint8Array(30 + name.length);
        const lv = new DataView(local.buffer);
        lv.setUint32(0, 0x04034b50, true); // Local file header signature
        lv.setUint16(4, 20, true); // Version needed
        lv.setUint16(6, 0x0800, true); // Flags: Dateinamen in UTF-8
        lv.setUint16(8, 0, true); // Methode: stored
        lv.setUint16(10, 0, true); // Uhrzeit
        lv.setUint16(12, 0x21, true); // Datum 01.01.1980
        lv.setUint32(14, crc, true);
        lv.setUint32(18, data.length, true); // Komprimierte Größe
        lv.setUint32(22, data.length, true); // Originalgröße
        lv.setUint16(26, name.length, true);
        lv.setUint16(28, 0, true); // Extra-Feld
        local.set(name, 30);
        const central = new Uint8Array(46 + name.length);
        const cv = new DataView(central.buffer);
        cv.setUint32(0, 0x02014b50, true); // Central directory signature
        cv.setUint16(4, 20, true); // Version made by
        cv.setUint16(6, 20, true); // Version needed
        cv.setUint16(8, 0x0800, true);
        cv.setUint16(10, 0, true);
        cv.setUint16(12, 0, true);
        cv.setUint16(14, 0x21, true);
        cv.setUint32(16, crc, true);
        cv.setUint32(20, data.length, true);
        cv.setUint32(24, data.length, true);
        cv.setUint16(28, name.length, true);
        cv.setUint32(42, offset, true); // Offset des Local Headers
        central.set(name, 46);
        localParts.push(local, data);
        centralParts.push(central);
        offset += local.length + data.length;
    }
    const centralSize = centralParts.reduce((sum, part) => sum + part.length, 0);
    const end = new Uint8Array(22);
    const ev = new DataView(end.buffer);
    ev.setUint32(0, 0x06054b50, true); // End of central directory signature
    ev.setUint16(8, files.length, true);
    ev.setUint16(10, files.length, true);
    ev.setUint32(12, centralSize, true);
    ev.setUint32(16, offset, true);
    const parts = [...localParts, ...centralParts, end];
    const zip = new Uint8Array(parts.reduce((sum, part) => sum + part.length, 0));
    let position = 0;
    for (const part of parts) {
        zip.set(part, position);
        position += part.length;
    }
    return zip;
}
/** Excel-Datei (.xlsx) mit einem Blatt, fetter Kopfzeile, fixierter erster Zeile und Autofilter. */
function toXlsx(table, sheetName = "Tabelle1") {
    // .buffer statt des Uint8Array selbst: neuere TS-DOM-Typen lassen
    // Uint8Array<ArrayBufferLike> nicht als BlobPart zu (der Puffer ist exakt so groß wie das ZIP).
    return new Blob([createZip(xlsxFiles(table, sheetName)).buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
}
// ---------------------------------------------------------------- Download
/** Startet im Browser den Download eines Blobs unter dem angegebenen Dateinamen. */
function downloadBlob(blob, fileName) {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
}
/**
 * Mandantenname für Dateinamen, abgeleitet aus der ersten Stelle des
 * Hostnamens, z.B. "ellinger.d-velop.cloud" -> "Ellinger".
 */
function getTenantName(hostname = window.location.hostname) {
    const label = hostname.split(".")[0] ?? "";
    return label ? label.charAt(0).toUpperCase() + label.slice(1) : "";
}


/***/ },

/***/ "../../helper/webindexlayouter/getWebindexConfigurations.ts"
/*!******************************************************************!*\
  !*** ../../helper/webindexlayouter/getWebindexConfigurations.ts ***!
  \******************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getWebindexConfigurations = getWebindexConfigurations;
exports.findWebindexConfiguration = findWebindexConfiguration;
const performHttpRequest_1 = __webpack_require__(/*! ../performHttpRequest/performHttpRequest */ "../../helper/performHttpRequest/performHttpRequest.ts");
/**
 * Liest die Webindex-Layout-Konfigurationen aller Apps
 * (GET /webindexlayouter/api/v1/apps/configurations) - z.B. als Sicherung vor
 * dem Überschreiben mit replaceDocumentReaderWebindexForm.
 *
 * @param baseUri - The base URI of the API endpoint.
 * @param token - Optional bearer token; ohne Token wird die Browser-Session genutzt.
 * @returns Die Konfigurationen (JSON, Format je nach API-Version).
 */
async function getWebindexConfigurations(baseUri, token) {
    const url = `${baseUri}/webindexlayouter/api/v1/apps/configurations`;
    const headers = {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        Accept: "application/json",
    };
    const options = {
        method: "GET",
        headers,
    };
    return await (0, performHttpRequest_1.performHttpRequest)(url, options);
}
/**
 * Sucht in der Antwort von getWebindexConfigurations die Konfiguration einer
 * App (Standard: Rechnungsleser "classcon-documentreader") - Liste direkt oder
 * unter "configurations"/"apps"/"items"/"value", erkannt am Feld "name" bzw.
 * "appId"/"id". undefined = nicht gefunden.
 */
function findWebindexConfiguration(configurations, appName = "classcon-documentreader") {
    const body = configurations;
    const list = Array.isArray(body)
        ? body
        : body?.configurations ?? body?.apps ?? body?.items ?? body?.value;
    if (Array.isArray(list)) {
        return list.find((entry) => [entry?.name, entry?.appId, entry?.id, entry?.app].includes(appName));
    }
    // Objekt mit den App-Namen als Schlüssel.
    if (body && typeof body === "object" && appName in body) {
        return body[appName];
    }
    return undefined;
}


/***/ },

/***/ "../../helper/webindexlayouter/replaceDocumentReaderWebindexForm.ts"
/*!**************************************************************************!*\
  !*** ../../helper/webindexlayouter/replaceDocumentReaderWebindexForm.ts ***!
  \**************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.replaceDocumentReaderWebindexForm = replaceDocumentReaderWebindexForm;
const performHttpRequest_1 = __webpack_require__(/*! ../performHttpRequest/performHttpRequest */ "../../helper/performHttpRequest/performHttpRequest.ts");
/**
 * Replaces the webindex layout configuration for the Document Reader app via a PUT request.
 *
 * @template T The expected response type.
 * @param baseUri - The base URI of the API endpoint.
 * @param token - The Bearer token used for authentication.
 * @param webindexLayout - The new webindex layout configuration to be set.
 * @returns A promise resolving to the response of type `T`.
 */
async function replaceDocumentReaderWebindexForm(baseUri, token, webindexLayout) {
    const url = `${baseUri}/webindexlayouter/api/v1/apps/classcon-documentreader/configuration`;
    const body = {
        webindexLayout
    };
    const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    };
    const options = {
        method: "PUT",
        headers,
        body: webindexLayout,
    };
    return await (0, performHttpRequest_1.performHttpRequest)(url, options);
}


/***/ },

/***/ "./src/forms/form.ts"
/*!***************************!*\
  !*** ./src/forms/form.ts ***!
  \***************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const logger_1 = __webpack_require__(/*! ../../../../helper/utils/logger */ "../../helper/utils/logger.ts");
const getBatchProfiles_1 = __webpack_require__(/*! ../../../../helper/inbound/getBatchProfiles */ "../../helper/inbound/getBatchProfiles.ts");
const createBatchProfile_1 = __webpack_require__(/*! ../../../../helper/inbound/createBatchProfile */ "../../helper/inbound/createBatchProfile.ts");
const updateBatchProfile_1 = __webpack_require__(/*! ../../../../helper/inbound/updateBatchProfile */ "../../helper/inbound/updateBatchProfile.ts");
const updateEmailinboundProfile_1 = __webpack_require__(/*! ../../../../helper/emailinbound/updateEmailinboundProfile */ "../../helper/emailinbound/updateEmailinboundProfile.ts");
const getMappingContainers_1 = __webpack_require__(/*! ../../../../helper/dms/getMappingContainers */ "../../helper/dms/getMappingContainers.ts");
const updateEvent_1 = __webpack_require__(/*! ../../../../helper/dmsConfig/updateEvent */ "../../helper/dmsConfig/updateEvent.ts");
const getScriptVersion_1 = __webpack_require__(/*! ../../../../helper/scripting/getScriptVersion */ "../../helper/scripting/getScriptVersion.ts");
const patchScript_1 = __webpack_require__(/*! ../../../../helper/scripting/patchScript */ "../../helper/scripting/patchScript.ts");
const getGroups_1 = __webpack_require__(/*! ../../../../helper/identityprovider/getGroups */ "../../helper/identityprovider/getGroups.ts");
const createGroup_1 = __webpack_require__(/*! ../../../../helper/usermanagement/createGroup */ "../../helper/usermanagement/createGroup.ts");
const getAllGroups_1 = __webpack_require__(/*! ../../../../helper/usermanagement/getAllGroups */ "../../helper/usermanagement/getAllGroups.ts");
const getEmailinboundProfiles_1 = __webpack_require__(/*! ../../../../helper/emailinbound/getEmailinboundProfiles */ "../../helper/emailinbound/getEmailinboundProfiles.ts");
const createEmailinboundProfile_1 = __webpack_require__(/*! ../../../../helper/emailinbound/createEmailinboundProfile */ "../../helper/emailinbound/createEmailinboundProfile.ts");
const replaceDocumentReaderWebindexForm_1 = __webpack_require__(/*! ../../../../helper/webindexlayouter/replaceDocumentReaderWebindexForm */ "../../helper/webindexlayouter/replaceDocumentReaderWebindexForm.ts");
const getWebindexConfigurations_1 = __webpack_require__(/*! ../../../../helper/webindexlayouter/getWebindexConfigurations */ "../../helper/webindexlayouter/getWebindexConfigurations.ts");
const tableExport_1 = __webpack_require__(/*! ../../../../helper/utils/tableExport */ "../../helper/utils/tableExport.ts");
const getRepositories_1 = __webpack_require__(/*! ../../../../helper/dms/getRepositories */ "../../helper/dms/getRepositories.ts");
const createSourceMapping_1 = __webpack_require__(/*! ../../../../helper/dms/createSourceMapping */ "../../helper/dms/createSourceMapping.ts");
const getAllScripts_1 = __webpack_require__(/*! ../../../../helper/scripting/getAllScripts */ "../../helper/scripting/getAllScripts.ts");
const importScript_1 = __webpack_require__(/*! ../../../../helper/scripting/importScript */ "../../helper/scripting/importScript.ts");
const getEvents_1 = __webpack_require__(/*! ../../../../helper/dmsConfig/getEvents */ "../../helper/dmsConfig/getEvents.ts");
const createEvent_1 = __webpack_require__(/*! ../../../../helper/dmsConfig/createEvent */ "../../helper/dmsConfig/createEvent.ts");
const getCurrentUserInformation_1 = __webpack_require__(/*! ../../../../helper/identityprovider/getCurrentUserInformation */ "../../helper/identityprovider/getCurrentUserInformation.ts");
const createAPIKey_1 = __webpack_require__(/*! ../../../../helper/identityprovider/createAPIKey */ "../../helper/identityprovider/createAPIKey.ts");
const getAllUsers_1 = __webpack_require__(/*! ../../../../helper/identityprovider/getAllUsers */ "../../helper/identityprovider/getAllUsers.ts");
const batchProfileMail_json_1 = __importDefault(__webpack_require__(/*! ../data/batchProfileMail.json */ "./src/data/batchProfileMail.json"));
const batchProfileScan_json_1 = __importDefault(__webpack_require__(/*! ../data/batchProfileScan.json */ "./src/data/batchProfileScan.json"));
const webindexDesignerForm_json_1 = __importDefault(__webpack_require__(/*! ../data/webindexDesignerForm.json */ "./src/data/webindexDesignerForm.json"));
const scriptGutschriftenVerschieben_json_1 = __importDefault(__webpack_require__(/*! ../data/scriptGutschriftenVerschieben.json */ "./src/data/scriptGutschriftenVerschieben.json"));
/**
 * Onboarding gevis ECM Rechnungsleser (ehemals
 * projects/OnboardingGevisECMDocumentReader - dort als lokales Node-Script
 * src/script.ts plus unfertigem Formular): richtet den Rechnungsleser in einem
 * Mandanten Schritt für Schritt ein (je Stapelprofil und je Postfach ein
 * eigener Schritt). Jeder Schritt zeigt, ob er fehlt (→ anlegen) oder schon
 * vorhanden ist (→ auf die Vorlage aktualisieren) und lässt sich einzeln
 * ausführen; gesammelt geht "Alle fehlenden anlegen" bzw. "Alles anlegen /
 * aktualisieren". Nicht aktualisiert werden bestehende Gruppen (Mitglieder
 * blieben sonst nicht erhalten) und die hinterlegten API-Keys in Script
 * (customerVariables) und Webhook.
 *
 * Alle Aufrufe laufen mit dem im Formular eingegebenen (oder hier neu
 * erstellten) API-Key - der wird außerdem beim Neuanlegen im Gutschriften-
 * Script und im Webhook hinterlegt. Der Key wird nirgends im Formular
 * gespeichert, nur im Speicher dieser Seite.
 *
 * Nicht übernommen: die im alten Script auskommentierten gevis-R-Schritte
 * (SFTP-Zielsystem, XML-Aufbereitungs-Script, Extension Point) und das
 * d.velop-Zielsystem.
 *
 * Das Feld-Layout (nur die Content-Komponente "result") liegt als Code in
 * src/forms/form.json und wird von der Toolbox bei jedem Anlegen/
 * Aktualisieren mit ausgerollt. Das bestehende Formular behält seine GUID
 * (PINNED_FORM_IDS in projects/Toolbox/generateTargetForms.js).
 *
 * VERSION_COUNTER unten NICHT umbenennen, der Name ist projektübergreifend
 * fest "VERSION_COUNTER" (siehe generateTargetForms.js) -
 * .github/workflows/publish-bundles.yml stempelt beim Publish den nächsten
 * Stand nur ins veröffentlichte Bundle - der Wert hier ist ein Platzhalter und
 * wird nicht hochgezählt.
 */
const VERSION_COUNTER = 4;
const logger = (0, logger_1.initLogger)(logger_1.LogLevel.INFO);
const BASE_URI = window.location.origin;
const SUBDOMAIN = window.location.hostname.split(".")[0];
// Komponenten-Key aus src/forms/form.json.
const resultKey = "result";
// Feste Werte aus dem bisherigen Onboarding (Formular bzw. Script).
const GROUP_RECHNUNGSLESER_ID = "7167794f-3a89-4a2c-9639-f4bc4b7822b3";
const GROUP_RECHNUNGSLESER_NAME = "Rechnungsleser";
const ADMIN_GROUP_NAME = "Administrative group for the tenant";
const GROUP_FRUEHES_SCANNEN_NAME = "gevis ECM Frühes Scannen";
const PROFILE_MAIL_NAME = "Frühes Scannen (Mail)";
const PROFILE_SCAN_NAME = "Frühes Scannen (Scan)";
const CREDIT_MEMO_SCRIPT_NAME = "Rechnungsleser Gutschriften verschieben";
const CREDIT_MEMO_CATEGORY_ID = "fc3d3e6d-46f6-4fcd-84e3-db79e14b2751";
const API_KEY_LABEL = "Onboarding Gevis ECM Document Reader";
const MAILBOXES = [
    { mailbox: "fruehesscannenmail", description: PROFILE_MAIL_NAME, profileName: PROFILE_MAIL_NAME },
    { mailbox: "fruehesscannenscan", description: PROFILE_SCAN_NAME, profileName: PROFILE_SCAN_NAME },
];
const SOURCE_MAPPING = {
    name: "Rechnungsleser",
    sourceId: "/classcon-documentreader/sources/invoices",
    mappingItems: [
        { source: "InvoiceNumber", destination: "9ebfdb3d-e096-49ba-b854-56e09b39db5a", isSystemProperty: false, regexIgnoreCase: false, type: 0 },
        { source: "documentCategory", destination: "fc3d3e6d-46f6-4fcd-84e3-db79e14b2751", isSystemProperty: false, regexIgnoreCase: false, type: 1 },
        { source: "VENDOR_NUM", destination: "17d56c68-f74d-40ca-989c-9ecd80c773bd", isSystemProperty: false, regexIgnoreCase: false, type: 0 },
        { source: "VENDOR_NAME", destination: "348219f7-cd82-42bd-aa3d-57dafc4bf9ef", isSystemProperty: false, regexIgnoreCase: false, type: 0 },
        { source: "OrderNum", destination: "1c13a20f-cf94-460a-ba49-3dd83cbce609", isSystemProperty: false, regexIgnoreCase: false, type: 0 },
        { source: "Rechnungstyp", destination: "e6bef93c-ac18-40bb-8afb-93ba48b3b176", isSystemProperty: false, regexIgnoreCase: false, type: 0 },
        { source: "InvoiceDate", destination: "e16f89a9-a8de-4f55-b287-415e4a543701", isSystemProperty: false, regexIgnoreCase: false, type: 0 },
        { source: "NAME", destination: "49f2d260-5fc4-4331-9da6-aa553a5ee044", isSystemProperty: false, regexIgnoreCase: false, type: 0 },
        { source: "GrossAmount", destination: "3d07a2af-546f-4360-8254-daeec02dd101", isSystemProperty: false, regexIgnoreCase: false, type: 0 },
        { source: "NetAmount1", destination: "98ff7208-08d6-4f7a-bf19-63c1b61c12e1", isSystemProperty: false, regexIgnoreCase: false, type: 0 },
        { source: "NetAmount2", destination: "7342cada-e4b0-481a-bd22-990555287524", isSystemProperty: false, regexIgnoreCase: false, type: 0 },
        { source: "VatRate1", destination: "8a23cfb1-a13f-40b4-aec9-126b451f3b22", isSystemProperty: false, regexIgnoreCase: false, type: 0 },
        { source: "VatRate2", destination: "81f354c2-a6ef-492a-bbda-a7eefe5bb9dd", isSystemProperty: false, regexIgnoreCase: false, type: 0 },
        { source: "Barcode", destination: "property_document_number", isSystemProperty: true, regexIgnoreCase: false, type: 0 },
        { source: "DocumentType", destination: "ed5c47ce-716a-4182-986f-dffa4135b7cf", isSystemProperty: false, regexIgnoreCase: false, type: 0 },
    ],
};
async function ensureSwal() {
    await loadSweetAlert();
    if (typeof Swal === "undefined") {
        throw new Error("Dialog-Bibliothek (SweetAlert2) konnte nicht geladen werden.");
    }
}
async function confirmWarning(title, html, confirmText) {
    await ensureSwal();
    const result = await Swal.fire({
        icon: "warning",
        title,
        html,
        showCancelButton: true,
        confirmButtonColor: "#dc3545",
        confirmButtonText: confirmText,
        cancelButtonText: "Abbrechen",
        focusCancel: true,
    });
    return !!result.isConfirmed;
}
// Sichert das aktuelle Layout als JSON-Datei, z.B.
// "Ellinger_Webindex-Layout_Rechnungsleser_2026-09-26.json".
async function downloadCurrentWebindexLayout(apiKey) {
    const configurations = (await (0, getWebindexConfigurations_1.getWebindexConfigurations)(BASE_URI, apiKey)).body;
    // Möglichst nur die Rechnungsleser-Konfiguration sichern (gleiches Format
    // wie beim Überschreiben), sonst die komplette Antwort.
    const current = (0, getWebindexConfigurations_1.findWebindexConfiguration)(configurations) ?? configurations;
    const content = typeof current === "string" ? current : JSON.stringify(current, null, 2);
    if (!content || content === "{}") {
        throw new Error("Das aktuelle Webindex-Layout ist leer oder konnte nicht gelesen werden.");
    }
    const date = new Date().toISOString().slice(0, 10);
    const fileName = [(0, tableExport_1.getTenantName)(), "Webindex-Layout_Rechnungsleser", date].filter(Boolean).join("_") + ".json";
    (0, tableExport_1.downloadBlob)(new Blob([content], { type: "application/json" }), fileName);
}
// Swal mit deutlichem Hinweis aufs Überschreiben und (vorausgewählter)
// Sicherung des aktuellen Layouts. Schlägt die Sicherung fehl, wird NICHT
// überschrieben.
async function confirmWebindexOverwrite(apiKey) {
    await ensureSwal();
    const result = await Swal.fire({
        icon: "warning",
        title: "Achtung: Webindex-Layout wird überschrieben",
        html: `
      <p>Das aktuelle Webindex-Layout des Rechnungslesers wird <strong>vollständig und unwiderruflich</strong> durch die gevis-ECM-Vorlage ersetzt.
      Eigene Anpassungen gehen dabei verloren.</p>
      <label style="display:flex;gap:8px;align-items:center;justify-content:center;margin-top:12px;cursor:pointer">
        <input type="checkbox" id="onb-swal-backup" checked style="width:16px;height:16px">
        Aktuelles Webindex-Layout vorher herunterladen (Sicherung)
      </label>`,
        showCancelButton: true,
        confirmButtonColor: "#dc3545",
        confirmButtonText: "Überschreiben",
        cancelButtonText: "Abbrechen",
        focusCancel: true,
        preConfirm: () => {
            const checkbox = Swal.getPopup().querySelector("#onb-swal-backup");
            return { backup: !!checkbox?.checked };
        },
    });
    if (!result.isConfirmed) {
        return false;
    }
    if (result.value?.backup) {
        try {
            await downloadCurrentWebindexLayout(apiKey);
        }
        catch (error) {
            await Swal.fire({
                icon: "error",
                title: "Sicherung fehlgeschlagen",
                html: `Das aktuelle Layout konnte nicht heruntergeladen werden - es wurde <strong>nichts überschrieben</strong>.<br><br>${escapeHtml(getErrorMessage(error))}`,
            });
            return false;
        }
    }
    return true;
}
function done(text) {
    return { state: "done", text };
}
function missing(text) {
    return { state: "missing", text };
}
async function getRepositoryId(apiKey) {
    const repositoryId = (await (0, getRepositories_1.getRepositories)(BASE_URI, apiKey)).body.repositories?.[0]?.id;
    if (!repositoryId) {
        throw new Error("Kein DMS-Repository gefunden.");
    }
    return repositoryId;
}
async function findCreditMemoScriptId(apiKey) {
    const scripts = (await (0, getAllScripts_1.getAllScripts)(BASE_URI, apiKey)).body ?? [];
    return scripts.find((script) => script.name === CREDIT_MEMO_SCRIPT_NAME)?.id;
}
function scriptRunUri(scriptId) {
    return `${BASE_URI}/scripting/script/${scriptId}/run`;
}
// Gruppennamen tolerant vergleichen: Groß-/Kleinschreibung, mehrfache
// Leerzeichen und unterschiedlich kodierte Umlaute ("ü" als ein Zeichen oder
// als "u" + Trema) sollen keinen Unterschied machen.
function normalizeGroupName(name) {
    return (name ?? "").normalize("NFC").replace(/\s+/g, " ").trim().toLowerCase();
}
// Gruppen aus Benutzerverwaltung UND Identityprovider (SCIM) - je nach
// Mandant ist eine Gruppe nur in einer der beiden Listen vollständig.
async function loadGroups(apiKey) {
    const [management, scim] = await Promise.all([
        (0, getAllGroups_1.getAllGroups)(BASE_URI, apiKey).then((r) => r.body.groups ?? []).catch(() => []),
        (0, getGroups_1.getGroups)(BASE_URI, apiKey).then((r) => r.body.resources ?? []).catch(() => []),
    ]);
    const groups = new Map();
    for (const group of management) {
        if (group.id && group.name)
            groups.set(group.id.toLowerCase(), { id: group.id, name: group.name });
    }
    for (const group of scim) {
        if (group.id && group.displayName && !groups.has(group.id.toLowerCase())) {
            groups.set(group.id.toLowerCase(), { id: group.id, name: group.displayName });
        }
    }
    if (groups.size === 0) {
        throw new Error("Gruppen konnten nicht geladen werden - ist der API-Key gültig?");
    }
    return [...groups.values()];
}
function findGroupId(groups, name, id) {
    const wanted = normalizeGroupName(name);
    return groups.find((group) => (id && group.id.toLowerCase() === id.toLowerCase()) || normalizeGroupName(group.name) === wanted)?.id;
}
// Vom Onboarding benötigte Gruppen; "id" nur, wo sie fest vorgegeben ist.
const REQUIRED_GROUPS = [
    { name: GROUP_RECHNUNGSLESER_NAME, id: GROUP_RECHNUNGSLESER_ID, addCurrentUser: true },
    { name: GROUP_FRUEHES_SCANNEN_NAME, addCurrentUser: false },
];
async function findMissingGroups(apiKey) {
    const groups = await loadGroups(apiKey);
    return REQUIRED_GROUPS.filter((definition) => !findGroupId(groups, definition.name, definition.id));
}
function exists(text) {
    return { state: "exists", text };
}
function mailboxMatches(mailbox, name) {
    return mailbox === name || !!mailbox?.startsWith(`${name}@`);
}
async function findMailbox(apiKey, name) {
    const settings = (await (0, getEmailinboundProfiles_1.getEmailinboundProfiles)(BASE_URI, apiKey)).body.mailStoreSettings ?? [];
    return settings.find((setting) => mailboxMatches(setting.mailbox, name));
}
async function findBatchProfile(apiKey, name) {
    const profiles = (await (0, getBatchProfiles_1.getBatchProfiles)(BASE_URI, apiKey)).body.profiles ?? [];
    return profiles.find((profile) => profile.name === name);
}
function unique(values) {
    return [...new Set(values.filter((value) => !!value))];
}
// Ein Schritt je Stapelprofil: anlegen bzw. mit der Vorlage aktualisieren.
function batchProfileStep(id, template) {
    return {
        id,
        title: `Stapelprofil „${template.name}“`,
        description: "Eingangsverarbeitung - ein vorhandenes Profil wird mit den Einstellungen der Vorlage aktualisiert.",
        async check(apiKey) {
            return (await findBatchProfile(apiKey, template.name))
                ? exists("Vorhanden - Einstellungen werden aktualisiert.")
                : missing("Profil fehlt.");
        },
        async run(apiKey) {
            const body = template;
            const existing = await findBatchProfile(apiKey, template.name);
            if (existing) {
                await (0, updateBatchProfile_1.updateBatchProfile)(BASE_URI, apiKey, existing, body);
                return "Profil aktualisiert.";
            }
            await (0, createBatchProfile_1.createBatchProfile)(BASE_URI, apiKey, body);
            return "Profil angelegt.";
        },
    };
}
// Ein Schritt je Postfach: anlegen bzw. aktualisieren. Beim Aktualisieren
// bleiben zusätzlich berechtigte Gruppen/Benutzer erhalten, die Onboarding-
// Gruppen werden ergänzt.
function mailboxStep(entry) {
    return {
        id: `mailbox-${entry.mailbox}`,
        title: `Postfach „${entry.mailbox}“`,
        description: `${entry.mailbox}@${SUBDOMAIN}.emailinbound… → Stapelprofil „${entry.profileName}“ - benötigt das Stapelprofil und die Gruppen.`,
        async check(apiKey) {
            return (await findMailbox(apiKey, entry.mailbox))
                ? exists("Vorhanden - Einstellungen werden aktualisiert.")
                : missing("Postfach fehlt.");
        },
        async run(apiKey) {
            const groups = await loadGroups(apiKey);
            const adminGroupId = findGroupId(groups, ADMIN_GROUP_NAME);
            if (!adminGroupId) {
                throw new Error(`Gruppe „${ADMIN_GROUP_NAME}“ nicht gefunden.`);
            }
            const scanGroupId = findGroupId(groups, GROUP_FRUEHES_SCANNEN_NAME);
            if (!scanGroupId) {
                throw new Error(`Gruppe „${GROUP_FRUEHES_SCANNEN_NAME}“ nicht gefunden - bitte zuerst den Schritt „Gruppen“ ausführen.`);
            }
            const profileId = (await findBatchProfile(apiKey, entry.profileName))?.batchProfileId;
            if (!profileId) {
                throw new Error(`Stapelprofil „${entry.profileName}“ nicht gefunden - bitte zuerst das Stapelprofil anlegen.`);
            }
            const existing = await findMailbox(apiKey, entry.mailbox);
            const payload = {
                _links: {},
                mailbox: entry.mailbox,
                description: entry.description,
                emailWhiteList: ["*@*"],
                profileId,
                finishImportProcess: true,
                updated: !!existing,
                batchnameTemplate: "%Subject%",
                authorizedInboundGroupIds: unique([...(existing?.authorizedInboundGroupIds ?? []), adminGroupId, scanGroupId]),
                authorizedInboundUserIds: existing?.authorizedInboundUserIds ?? [],
                informOnErrorGroupIds: unique([...(existing?.informOnErrorGroupIds ?? []), adminGroupId]),
                informOnErrorUserIds: existing?.informOnErrorUserIds ?? [],
                batchProperties: [],
                documentProperties: [],
            };
            if (existing) {
                await (0, updateEmailinboundProfile_1.updateEmailinboundProfile)(BASE_URI, apiKey, existing, payload);
                return "Postfach aktualisiert.";
            }
            await (0, createEmailinboundProfile_1.createEmailinboundProfiles)(BASE_URI, apiKey, payload);
            return "Postfach angelegt.";
        },
    };
}
// Quell-Mapping über seine Quelle (sourceId) wiederfinden - der Name im DMS
// ist nicht verlässlich (z.B. "Document Reader (d.velop document reader
// invoice business)" statt "Rechnungsleser").
async function findSourceMapping(apiKey) {
    const repositoryId = await getRepositoryId(apiKey);
    const containers = (await (0, getMappingContainers_1.getMappingContainers)(BASE_URI, apiKey, repositoryId)).body.containers ?? [];
    return { repositoryId, existing: containers.find((c) => c.sourceId === SOURCE_MAPPING.sourceId) };
}
async function findCreditMemoWebhookEntry(apiKey, scriptId) {
    const events = (await (0, getEvents_1.getEvents)(BASE_URI, apiKey, await getRepositoryId(apiKey))).body;
    const uri = scriptRunUri(scriptId);
    for (const [eventType, event] of Object.entries(events._embedded ?? {})) {
        const webhook = (event._embedded?.webhooks ?? []).find((w) => w.uri === uri);
        if (webhook) {
            return { eventType, webhook };
        }
    }
    return undefined;
}
function creditMemoEvent(scriptId, webhookApiKey) {
    return {
        description: "Gutschriften des Rechnungslesers verschieben",
        uri: scriptRunUri(scriptId),
        enabled: true,
        timeout: 10000,
        retry: false,
        restrictions: [{ key: "CATEGORY", value: CREDIT_MEMO_CATEGORY_ID }],
        apiKey: webhookApiKey,
        handleResponse: "NONE",
    };
}
const steps = [
    batchProfileStep("profileMail", batchProfileMail_json_1.default),
    batchProfileStep("profileScan", batchProfileScan_json_1.default),
    {
        id: "group",
        title: "Gruppen",
        description: `„${GROUP_RECHNUNGSLESER_NAME}“ (der aktuelle Benutzer wird Mitglied) und „${GROUP_FRUEHES_SCANNEN_NAME}“ (für die Postfächer). Vorhandene Gruppen bleiben unverändert, damit keine Mitglieder verloren gehen.`,
        async check(apiKey) {
            const absent = await findMissingGroups(apiKey);
            return absent.length === 0 ? done("Beide Gruppen vorhanden.") : missing(`Fehlt: ${absent.map((g) => g.name).join(", ")}`);
        },
        async run(apiKey) {
            const absent = await findMissingGroups(apiKey);
            if (absent.length === 0) {
                return "Bereits vorhanden.";
            }
            const userId = await getCurrentUserId().catch(() => undefined);
            for (const definition of absent) {
                const group = {
                    name: definition.name,
                    id: definition.id ?? crypto.randomUUID(),
                    isGlobalGroup: false,
                    isScimProvisioned: false,
                    isTenantAdminGroup: false,
                    showChangeToGlobalGroupButton: true,
                    groupTypes: [],
                    groupMembers: [],
                    idpGroupMembers: [],
                    userMembers: definition.addCurrentUser && userId ? [userId] : [],
                    idpUserMembers: [],
                };
                await (0, createGroup_1.createGroup)(BASE_URI, apiKey, group);
            }
            return `Angelegt: ${absent.map((g) => g.name).join(", ")}`;
        },
    },
    ...MAILBOXES.map(mailboxStep),
    {
        id: "webindex",
        title: "Webindex-Layout",
        description: "Ersetzt das Webindex-Designer-Layout des Rechnungslesers durch die gevis-ECM-Vorlage.",
        beforeRun: confirmWebindexOverwrite,
        async check() {
            return { state: "manual", text: "Nicht prüfbar - wird beim Ausführen überschrieben." };
        },
        async run(apiKey) {
            await (0, replaceDocumentReaderWebindexForm_1.replaceDocumentReaderWebindexForm)(BASE_URI, apiKey, JSON.stringify(webindexDesignerForm_json_1.default));
            return "Layout ersetzt.";
        },
    },
    {
        id: "sourceMapping",
        title: "Quell-Mapping „Rechnungsleser“",
        description: `Zuordnung der Rechnungsleser-Felder zu den DMS-Eigenschaften (erstes Repository, Quelle ${SOURCE_MAPPING.sourceId}). Bei einem vorhandenen Mapping werden die Vorlagen-Zuordnungen aktualisiert bzw. ergänzt, weitere Zuordnungen bleiben erhalten.`,
        // Bei einem vorhandenen Mapping vorher zeigen, welche bestehenden
        // Zuordnungen auf ein anderes Ziel umgebogen werden (die Vorlage nutzt die
        // Eigenschafts-IDs von gevis ECM, die im Mandanten abweichen können).
        async beforeRun(apiKey) {
            const { existing } = await findSourceMapping(apiKey);
            if (!existing) {
                return true;
            }
            const current = (await (0, getMappingContainers_1.getMappingContainer)(BASE_URI, apiKey, existing)).body;
            const changes = (SOURCE_MAPPING.mappingItems ?? []).flatMap((item) => {
                const before = current.mappingItems?.find((existingItem) => existingItem.source === item.source);
                return before && before.destination !== item.destination
                    ? [`<li><code>${escapeHtml(item.source ?? "")}</code>: ${escapeHtml(before.destination ?? "–")} → ${escapeHtml(item.destination ?? "–")}</li>`]
                    : [];
            });
            if (changes.length === 0) {
                return true;
            }
            return confirmWarning("Achtung: Zuordnungen werden geändert", `Im Quell-Mapping „${escapeHtml(current.name ?? existing.name ?? "")}“ zeigen folgende Felder danach auf ein <strong>anderes Ziel</strong>:
         <ul style="text-align:left;font-size:0.85em;margin-top:8px">${changes.join("")}</ul>
         Neue Felder werden ergänzt, alle übrigen Zuordnungen bleiben unverändert.`, "Zuordnungen ändern");
        },
        async check(apiKey) {
            const { existing } = await findSourceMapping(apiKey);
            return existing
                ? exists(`Vorhanden als „${existing.name ?? SOURCE_MAPPING.name}“ - Zuordnungen werden aktualisiert.`)
                : missing("Mapping fehlt.");
        },
        async run(apiKey) {
            const { repositoryId, existing } = await findSourceMapping(apiKey);
            if (!existing) {
                await (0, createSourceMapping_1.createSourceMapping)(BASE_URI, apiKey, repositoryId, SOURCE_MAPPING);
                return "Quell-Mapping angelegt.";
            }
            // Vollständig laden, Vorlagen-Zuordnungen je Quellfeld ersetzen bzw.
            // anhängen, alle übrigen (mandantenspezifischen) Zuordnungen behalten.
            const current = (await (0, getMappingContainers_1.getMappingContainer)(BASE_URI, apiKey, existing)).body;
            const items = [...(current.mappingItems ?? [])];
            let updated = 0;
            let added = 0;
            for (const item of SOURCE_MAPPING.mappingItems ?? []) {
                const index = items.findIndex((existingItem) => existingItem.source === item.source);
                if (index >= 0) {
                    items[index] = { ...items[index], ...item };
                    updated++;
                }
                else {
                    items.push({ ...item });
                    added++;
                }
            }
            const id = current.id ?? existing._links?.self?.href?.split("/").pop();
            await (0, getMappingContainers_1.updateMappingContainer)(BASE_URI, apiKey, repositoryId, {
                name: current.name ?? existing.name,
                id,
                sourceId: current.sourceId ?? existing.sourceId,
                mappingItems: items,
            });
            return `Quell-Mapping aktualisiert (${updated} geändert, ${added} ergänzt, ${items.length - updated - added} weitere beibehalten).`;
        },
    },
    {
        id: "creditMemoScript",
        title: "Script „Gutschriften verschieben“",
        description: `„${CREDIT_MEMO_SCRIPT_NAME}“ - wird importiert (API-Key und Kategorien werden dabei hinterlegt) bzw. bei einem vorhandenen Script nur der Code aktualisiert; hinterlegte Werte bleiben unverändert.`,
        async check(apiKey) {
            return (await findCreditMemoScriptId(apiKey)) ? exists("Vorhanden - Code wird aktualisiert.") : missing("Script fehlt.");
        },
        async run(apiKey) {
            const scriptId = await findCreditMemoScriptId(apiKey);
            if (scriptId) {
                // Nur den Code - customerVariables (u.a. der verschlüsselte API-Key)
                // werden bei einem vorhandenen Script NIE mitgeschickt.
                const versionId = (await (0, getScriptVersion_1.getScriptVersion)(BASE_URI, apiKey, scriptId)).body[0]?.id;
                if (!versionId) {
                    throw new Error(`Für „${CREDIT_MEMO_SCRIPT_NAME}“ wurde keine Version gefunden.`);
                }
                await (0, patchScript_1.patchScript)(BASE_URI, apiKey, scriptId, versionId, { content: scriptGutschriftenVerschieben_json_1.default.content });
                return "Script-Code aktualisiert.";
            }
            const script = JSON.parse(JSON.stringify(scriptGutschriftenVerschieben_json_1.default));
            const apiKeyVariable = script.customerVariables?.find((entry) => entry.key === "apiKey");
            if (apiKeyVariable) {
                apiKeyVariable.value = apiKey;
            }
            await (0, importScript_1.importScript)(BASE_URI, apiKey, script);
            return "Script importiert.";
        },
    },
    {
        id: "webhook",
        title: "Webhook „Gutschriften verschieben“",
        description: "Ruft das Script nach dem Import von Gutschriften (Kategorie) im DMS auf - benötigt das Script. Ein vorhandener Webhook wird aktualisiert, sein hinterlegter API-Key bleibt erhalten.",
        async check(apiKey) {
            const scriptId = await findCreditMemoScriptId(apiKey);
            if (!scriptId) {
                return missing("Script fehlt noch.");
            }
            return (await findCreditMemoWebhookEntry(apiKey, scriptId))
                ? exists("Vorhanden - Einstellungen werden aktualisiert.")
                : missing("Webhook fehlt.");
        },
        async run(apiKey) {
            const scriptId = await findCreditMemoScriptId(apiKey);
            if (!scriptId) {
                throw new Error(`Script „${CREDIT_MEMO_SCRIPT_NAME}“ nicht gefunden - bitte zuerst das Script importieren.`);
            }
            const found = await findCreditMemoWebhookEntry(apiKey, scriptId);
            if (found) {
                // Hinterlegten API-Key nie überschreiben/leeren: liefert die API ihn
                // nicht mit, wird der Webhook nicht angefasst.
                if (!found.webhook.apiKey) {
                    return "Vorhanden - nicht aktualisiert, da der hinterlegte API-Key sonst überschrieben würde.";
                }
                await (0, updateEvent_1.updateEvent)(BASE_URI, apiKey, found.webhook, creditMemoEvent(scriptId, found.webhook.apiKey));
                return "Webhook aktualisiert.";
            }
            await (0, createEvent_1.createEvent)(BASE_URI, apiKey, await getRepositoryId(apiKey), createEvent_1.EventType.PostImport, creditMemoEvent(scriptId, apiKey));
            return "Webhook angelegt.";
        },
    },
];
// ---------------------------------------------------------------------------
// Benutzer / API-Key
// ---------------------------------------------------------------------------
let apiKey = "";
let currentUserId;
const statuses = new Map(steps.map((step) => [step.id, { state: "unknown", text: "" }]));
let busy = false;
let message = {
    kind: "info",
    text: "Bitte einen API-Key eingeben oder neu erstellen und dann „Status prüfen“ klicken.",
};
function getCookie(name) {
    return document.cookie
        .split("; ")
        .find((row) => row.startsWith(`${name}=`))
        ?.split("=")[1];
}
async function getCurrentUserId() {
    if (!currentUserId) {
        currentUserId = (await (0, getCurrentUserInformation_1.getCurrentUserInformation)(BASE_URI, getCookie("AuthSessionId") || null)).body.id;
    }
    return currentUserId;
}
function loadSweetAlert() {
    return new Promise((resolve) => {
        if (typeof Swal !== "undefined") {
            resolve();
            return;
        }
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css";
        document.head.appendChild(link);
        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.js";
        script.onload = () => resolve();
        script.onerror = () => resolve();
        document.head.appendChild(script);
    });
}
function userLabel(user) {
    const name = `${user.name?.givenName ?? ""} ${user.name?.familyName ?? ""}`.trim() || user.displayName || "";
    const login = user.emails?.[0]?.value || user.userName || "";
    return name && login && name !== login ? `${name} (${login})` : name || login || user.id || "";
}
// Swal-Dialog: Benutzer (Dropdown mit Suchfeld, angemeldeter Benutzer
// vorausgewählt) und Bezeichnung des Keys. undefined = abgebrochen.
async function askApiKeyRequest() {
    const [users, ownId] = await Promise.all([
        (0, getAllUsers_1.getAllUsers)(BASE_URI, ""),
        getCurrentUserId().catch(() => undefined),
    ]);
    const options = users
        .filter((user) => !!user.id)
        .map((user) => ({ id: user.id, label: userLabel(user) }))
        .sort((a, b) => a.label.localeCompare(b.label, "de"));
    if (options.length === 0) {
        throw new Error("Es wurden keine Benutzer gefunden.");
    }
    const renderOptions = (term) => options
        .filter((option) => !term || option.label.toLowerCase().includes(term))
        .map((option) => `<option value="${escapeHtml(option.id)}" ${option.id === ownId ? "selected" : ""}>${escapeHtml(option.label)}</option>`)
        .join("");
    const result = await Swal.fire({
        title: "Neuen API-Key erstellen",
        html: `
      <div style="text-align:left">
        <label for="onb-swal-search" style="font-size:0.85em;font-weight:600">Benutzer</label>
        <input id="onb-swal-search" class="swal2-input" style="margin:4px 0 6px;width:100%" placeholder="Benutzer suchen…" autocomplete="off">
        <select id="onb-swal-user" class="swal2-select" size="8" style="margin:0 0 12px;width:100%;display:block">${renderOptions("")}</select>
        <label for="onb-swal-label" style="font-size:0.85em;font-weight:600">Bezeichnung</label>
        <input id="onb-swal-label" class="swal2-input" style="margin:4px 0 0;width:100%" value="${escapeHtml(API_KEY_LABEL)}">
      </div>`,
        width: 600,
        showCancelButton: true,
        confirmButtonText: "API-Key erstellen",
        cancelButtonText: "Abbrechen",
        focusConfirm: false,
        didOpen: (popup) => {
            const search = popup.querySelector("#onb-swal-search");
            const select = popup.querySelector("#onb-swal-user");
            search?.addEventListener("input", () => {
                if (!select)
                    return;
                const previous = select.value;
                select.innerHTML = renderOptions(search.value.trim().toLowerCase());
                if ([...select.options].some((option) => option.value === previous)) {
                    select.value = previous;
                }
                else if (select.options.length > 0) {
                    select.selectedIndex = 0;
                }
            });
            select?.querySelector("option[selected]")?.scrollIntoView({ block: "nearest" });
        },
        preConfirm: () => {
            const popup = Swal.getPopup();
            const userId = popup.querySelector("#onb-swal-user")?.value ?? "";
            const label = popup.querySelector("#onb-swal-label")?.value.trim() ?? "";
            if (!userId) {
                Swal.showValidationMessage("Bitte einen Benutzer auswählen.");
                return false;
            }
            if (!label) {
                Swal.showValidationMessage("Bitte eine Bezeichnung eingeben.");
                return false;
            }
            return { userId, label };
        },
    });
    return result.isConfirmed ? result.value : undefined;
}
// Wie die Identityprovider-Oberfläche: POST /identityprovider/config/apikey
// über die Browser-Session.
async function createNewApiKey(request) {
    const input = {
        id: "create",
        status: "Unconfirmed",
        userId: request.userId,
        label: request.label,
    };
    // Antwort: { apiKeyDto: { key, ... }, saveOk, problemMessages, ... }
    const body = (await (0, createAPIKey_1.createAPIKey)(BASE_URI, null, input)).body;
    const problems = (body.problemMessages ?? []).map((problem) => typeof problem === "string" ? problem : JSON.stringify(problem));
    if (body.saveOk === false || problems.length > 0) {
        throw new Error(`Der Identityprovider hat den API-Key nicht gespeichert${problems.length ? `: ${problems.join("; ")}` : "."}`);
    }
    const key = body.apiKeyDto?.key;
    if (!key) {
        throw new Error("Der API-Key wurde angelegt, aber nicht zurückgeliefert - bitte in der Benutzerverwaltung prüfen.");
    }
    return key;
}
// ---------------------------------------------------------------------------
// Darstellung
// ---------------------------------------------------------------------------
const styles = `
<style>
  .onb-section { border: 1px solid #dee2e6; border-radius: 6px; background: #fff; }
  .onb-header { padding: 10px 12px; border-bottom: 1px solid #dee2e6; background: #f8f9fa; border-radius: 6px 6px 0 0; }
  .onb-title { font-weight: 600; font-size: 1.05em; }
  .onb-hint { color: #6c757d; font-size: 0.85em; margin-top: 4px; }
  .onb-body { padding: 12px; }
  .onb-key { display: flex; gap: 6px; flex-wrap: wrap; align-items: flex-end; margin-bottom: 12px; }
  .onb-field { display: flex; flex-direction: column; gap: 2px; }
  .onb-field label { font-size: 0.75em; font-weight: 600; color: #495057; margin: 0; }
  .onb-key-input { width: 340px; max-width: 100%; }
  .onb-key .btn, .onb-actions .btn { white-space: nowrap; }
  .onb-message { border-radius: 6px; padding: 8px 12px; margin-bottom: 12px; font-size: 0.9em; }
  .onb-message-info { background: #e7f1ff; color: #084298; border: 1px solid #b6d4fe; }
  .onb-message-ok { background: #d1e7dd; color: #0f5132; border: 1px solid #badbcc; }
  .onb-message-error { background: #f8d7da; color: #842029; border: 1px solid #f5c2c7; }
  .onb-table-wrap { border: 1px solid #dee2e6; border-radius: 6px; overflow: auto; }
  .onb-table { margin: 0; font-size: 0.9em; }
  .onb-table thead th { background: #f8f9fa; border-bottom: 1px solid #dee2e6; white-space: nowrap; }
  .onb-table td { vertical-align: middle; }
  .onb-nr { color: #6c757d; width: 2.5em; text-align: right; }
  .onb-step-title { font-weight: 600; }
  .onb-step-desc { color: #6c757d; font-size: 0.85em; }
  .onb-status { min-width: 180px; }
  .onb-status-text { display: block; font-size: 0.8em; color: #6c757d; margin-top: 2px; }
  .onb-badge { display: inline-block; font-size: 0.75em; font-weight: 600; padding: 2px 8px; border-radius: 10px; white-space: nowrap; }
  .onb-badge-unknown { background: #e9ecef; color: #495057; }
  .onb-badge-checking, .onb-badge-running { background: #e7f1ff; color: #084298; }
  .onb-badge-done { background: #d1e7dd; color: #0f5132; }
  .onb-badge-exists { background: #cfe2ff; color: #084298; }
  .onb-badge-missing { background: #fff3cd; color: #997404; }
  .onb-badge-manual { background: #e2e3e5; color: #41464b; }
  .onb-badge-error { background: #f8d7da; color: #842029; }
  .onb-action { text-align: right; white-space: nowrap; }
  .onb-actions { display: flex; justify-content: flex-end; gap: 6px; flex-wrap: wrap; margin-top: 12px; }
</style>`;
const STATE_LABELS = {
    unknown: "Nicht geprüft",
    checking: "Wird geprüft…",
    running: "Wird ausgeführt…",
    done: "Erledigt",
    exists: "Vorhanden",
    missing: "Fehlt",
    manual: "Manuell",
    error: "Fehler",
};
// Beschriftung des Zeilen-Buttons je nach geprüftem Status.
const RUN_LABELS = {
    unknown: "Ausführen",
    checking: "Ausführen",
    running: "Läuft…",
    done: "Erneut ausführen",
    exists: "Aktualisieren",
    missing: "Anlegen",
    manual: "Ausführen",
    error: "Erneut versuchen",
};
function escapeHtml(value) {
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}
function getErrorMessage(error) {
    return error instanceof Error ? error.message : String(error);
}
let currentForm;
let mountedRoot;
// Wie in der Toolbox (projects/Toolbox/src/forms/form.ts, getContentHost):
// direkt in das Kind-Element ref="html" der HTML-Element-Komponente rendern.
function getContentHost(form) {
    const component = form.getComponent?.(resultKey);
    if (!component)
        return undefined;
    return component.refs?.html ?? component.element?.querySelector?.('[ref="html"]') ?? component.element ?? undefined;
}
function renderShell() {
    const rows = steps
        .map((step, index) => `
        <tr data-onb-step="${step.id}">
          <td class="onb-nr">${index + 1}</td>
          <td><div class="onb-step-title">${escapeHtml(step.title)}</div><div class="onb-step-desc">${escapeHtml(step.description)}</div></td>
          <td class="onb-status" data-onb-status></td>
          <td class="onb-action"><button type="button" class="btn btn-sm btn-outline-primary" data-onb-run="${step.id}">Ausführen</button></td>
        </tr>`)
        .join("");
    return `
  <div class="onb-section">
    <div class="onb-header">
      <div class="onb-title">Onboarding gevis ECM Rechnungsleser</div>
      <div class="onb-hint">Mandant <strong>${escapeHtml(SUBDOMAIN)}</strong> · Fehlendes wird angelegt, Vorhandenes auf die Vorlage aktualisiert - einzeln oder gesammelt.</div>
    </div>
    <div class="onb-body">
      <div class="onb-key">
        <div class="onb-field">
          <label for="onb-api-key">API-Key</label>
          <input id="onb-api-key" type="password" autocomplete="off" class="form-control form-control-sm onb-key-input" data-onb-key placeholder="API-Key eingeben…" value="${escapeHtml(apiKey)}">
        </div>
        <button type="button" class="btn btn-sm btn-outline-secondary" data-onb-action="create-key" title="Legt für den angemeldeten Benutzer einen neuen API-Key an">Neuen API-Key erstellen</button>
        <button type="button" class="btn btn-sm btn-outline-secondary" data-onb-action="check">Status prüfen</button>
      </div>
      <div data-onb-message></div>
      <div class="onb-table-wrap">
        <table class="table table-sm onb-table">
          <thead><tr><th class="onb-nr">Nr.</th><th>Schritt</th><th>Status</th><th></th></tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
      <div class="onb-actions">
        <button type="button" class="btn btn-sm btn-outline-primary" data-onb-action="run-missing">Alle fehlenden anlegen</button>
        <button type="button" class="btn btn-sm btn-primary" data-onb-action="run-all">Alles anlegen / aktualisieren</button>
      </div>
    </div>
  </div>`;
}
// Aktualisiert Status, Meldung und Buttons, ohne das API-Key-Feld neu zu
// zeichnen.
function refreshView() {
    const root = mountedRoot;
    if (!root?.isConnected)
        return;
    for (const step of steps) {
        const row = root.querySelector(`tr[data-onb-step="${step.id}"]`);
        const status = statuses.get(step.id);
        const cell = row?.querySelector("[data-onb-status]");
        if (cell) {
            cell.innerHTML = `<span class="onb-badge onb-badge-${status.state}">${STATE_LABELS[status.state]}</span>`
                + (status.text ? `<span class="onb-status-text">${escapeHtml(status.text)}</span>` : "");
        }
    }
    const messageHost = root.querySelector("[data-onb-message]");
    if (messageHost) {
        messageHost.innerHTML = message
            ? `<div class="onb-message onb-message-${message.kind}">${escapeHtml(message.text)}</div>`
            : "";
    }
    const hasKey = apiKey.trim() !== "";
    root.querySelectorAll("button[data-onb-run]").forEach((button) => {
        button.disabled = busy || !hasKey;
        const state = statuses.get(button.dataset.onbRun ?? "")?.state;
        button.textContent = RUN_LABELS[state ?? "unknown"];
    });
    root.querySelectorAll("button[data-onb-action]").forEach((button) => {
        const action = button.dataset.onbAction;
        button.disabled = busy || (action !== "create-key" && !hasKey);
    });
}
function mountContent(form) {
    const host = getContentHost(form);
    if (!host) {
        logger.warn(`Komponente "${resultKey}" nicht im Formular gefunden (oder noch nicht gerendert).`);
        return;
    }
    host.innerHTML = `${styles}<div data-onb-root>${renderShell()}</div>`;
    mountedRoot = host.querySelector("[data-onb-root]") ?? undefined;
    if (mountedRoot) {
        bindEvents(mountedRoot);
        refreshView();
    }
}
function setStatus(stepId, status) {
    statuses.set(stepId, status);
    refreshView();
}
// ---------------------------------------------------------------------------
// Abläufe
// ---------------------------------------------------------------------------
async function withBusy(action) {
    if (busy)
        return;
    busy = true;
    refreshView();
    try {
        await action();
    }
    finally {
        busy = false;
        refreshView();
    }
}
async function checkStep(step) {
    setStatus(step.id, { state: "checking", text: "" });
    try {
        setStatus(step.id, await step.check(apiKey.trim()));
    }
    catch (error) {
        logger.error(`Prüfung "${step.title}" fehlgeschlagen: ${getErrorMessage(error)}`);
        setStatus(step.id, { state: "error", text: getErrorMessage(error) });
    }
}
async function checkAll() {
    message = { kind: "info", text: "Status wird geprüft…" };
    for (const step of steps) {
        await checkStep(step);
    }
    const counts = steps.map((step) => statuses.get(step.id).state);
    const open = counts.filter((state) => state === "missing").length;
    const existing = counts.filter((state) => state === "exists").length;
    const errors = counts.filter((state) => state === "error").length;
    message = errors > 0
        ? { kind: "error", text: `${errors} Schritt(e) konnten nicht geprüft werden - ist der API-Key gültig?` }
        : { kind: open > 0 ? "info" : "ok", text: `${open} fehlend, ${existing} vorhanden (können aktualisiert werden).` };
    refreshView();
}
// Führt einen Schritt aus und prüft ihn danach erneut. false = Fehler.
async function runStep(step) {
    setStatus(step.id, { state: "running", text: "" });
    try {
        const result = await step.run(apiKey.trim());
        logger.info(`${step.title}: ${result}`);
        const status = await step.check(apiKey.trim());
        // Nach erfolgreichem Anlegen/Aktualisieren gilt der Schritt als erledigt,
        // solange die Prüfung nicht weiterhin "fehlt" meldet.
        setStatus(step.id, status.state === "missing" || status.state === "error"
            ? { ...status, text: `${result} ${status.text}`.trim() }
            : { state: "done", text: result });
        return true;
    }
    catch (error) {
        logger.error(`Schritt "${step.title}" fehlgeschlagen: ${getErrorMessage(error)}`);
        setStatus(step.id, { state: "error", text: getErrorMessage(error) });
        return false;
    }
}
async function runSingle(step) {
    await withBusy(async () => {
        if (step.beforeRun) {
            try {
                if (!(await step.beforeRun(apiKey.trim()))) {
                    return;
                }
            }
            catch (error) {
                message = { kind: "error", text: getErrorMessage(error) };
                return;
            }
        }
        const ok = await runStep(step);
        message = ok
            ? { kind: "ok", text: `„${step.title}“ ausgeführt.` }
            : { kind: "error", text: `„${step.title}“ ist fehlgeschlagen - Details in der Statusspalte.` };
    });
}
const ACTION_VERBS = {
    missing: "anlegen",
    exists: "aktualisieren",
    manual: "ausführen",
};
// Führt die übergebenen Status-Arten gesammelt aus (vorher neu prüfen), in
// Reihenfolge - bricht beim ersten Fehler bzw. bei einer abgebrochenen
// Rückfrage (z.B. Webindex-Layout) ab, weil spätere Schritte auf frühere
// aufbauen.
async function runBatch(states, title) {
    await withBusy(async () => {
        await checkAll();
        const todo = steps.filter((step) => states.includes(statuses.get(step.id).state));
        if (todo.length === 0) {
            message = { kind: "ok", text: "Nichts zu tun." };
            return;
        }
        try {
            await ensureSwal();
        }
        catch (error) {
            message = { kind: "error", text: getErrorMessage(error) };
            return;
        }
        const list = todo
            .map((step) => `<li><strong>${escapeHtml(step.title)}</strong> – ${ACTION_VERBS[statuses.get(step.id).state] ?? "ausführen"}</li>`)
            .join("");
        const confirmed = await Swal.fire({
            icon: "question",
            title,
            html: `<ul style="text-align:left;margin:0 auto;display:inline-block">${list}</ul>`,
            showCancelButton: true,
            confirmButtonText: "Ausführen",
            cancelButtonText: "Abbrechen",
        });
        if (!confirmed.isConfirmed) {
            message = undefined;
            return;
        }
        for (const step of todo) {
            if (step.beforeRun && !(await step.beforeRun(apiKey.trim()))) {
                message = { kind: "info", text: `Abgebrochen bei „${step.title}“ - die Schritte davor wurden ausgeführt.` };
                return;
            }
            if (!(await runStep(step))) {
                message = { kind: "error", text: `Abgebrochen bei „${step.title}“ - Details in der Statusspalte.` };
                return;
            }
        }
        message = { kind: "ok", text: `${todo.length} Schritt(e) ausgeführt.` };
    });
}
async function createKey() {
    let created = false;
    await withBusy(async () => {
        try {
            await loadSweetAlert();
            if (typeof Swal === "undefined") {
                throw new Error("Dialog-Bibliothek (SweetAlert2) konnte nicht geladen werden.");
            }
            message = { kind: "info", text: "Benutzer werden geladen…" };
            refreshView();
            const request = await askApiKeyRequest();
            if (!request) {
                message = undefined;
                return;
            }
            apiKey = await createNewApiKey(request);
            created = true;
            const input = mountedRoot?.querySelector("[data-onb-key]");
            if (input)
                input.value = apiKey;
            steps.forEach((step) => statuses.set(step.id, { state: "unknown", text: "" }));
            message = { kind: "ok", text: `API-Key „${request.label}“ erstellt und eingetragen.` };
        }
        catch (error) {
            logger.error(`API-Key konnte nicht erstellt werden: ${getErrorMessage(error)}`);
            message = { kind: "error", text: `API-Key konnte nicht erstellt werden: ${getErrorMessage(error)}` };
        }
    });
    if (created) {
        await withBusy(checkAll);
    }
}
// Listener direkt an den Elementen. Bewusst ohne "instanceof HTMLElement":
// dforms führt das Bundle ggf. in einem anderen Fenster-Kontext aus.
function bindEvents(root) {
    const keyInput = root.querySelector("[data-onb-key]");
    if (keyInput) {
        const onKeyChange = () => {
            if (apiKey === keyInput.value)
                return;
            apiKey = keyInput.value;
            // Neuer Key = alte Prüfergebnisse gelten nicht mehr.
            steps.forEach((step) => statuses.set(step.id, { state: "unknown", text: "" }));
            refreshView();
        };
        keyInput.addEventListener("input", onKeyChange);
        keyInput.addEventListener("change", onKeyChange);
        keyInput.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                event.preventDefault();
                onKeyChange();
                if (apiKey.trim())
                    void withBusy(checkAll);
            }
        });
    }
    root.querySelectorAll("button[data-onb-run]").forEach((button) => {
        const step = steps.find((s) => s.id === button.dataset.onbRun);
        if (step) {
            button.addEventListener("click", () => void runSingle(step));
        }
    });
    root.querySelectorAll("button[data-onb-action]").forEach((button) => {
        button.addEventListener("click", () => {
            switch (button.dataset.onbAction) {
                case "create-key":
                    void createKey();
                    return;
                case "check":
                    void withBusy(checkAll);
                    return;
                case "run-missing":
                    void runBatch(["missing"], "Fehlende Schritte anlegen?");
                    return;
                case "run-all":
                    void runBatch(["missing", "exists", "manual"], "Alles anlegen bzw. aktualisieren?");
                    return;
            }
        });
    });
}
window.formInit = function (form, data) {
    logger.debug("Onboarding-Formular initialisiert.");
    currentForm = form;
    mountContent(form);
    // Zeichnet Formio die Komponente neu (oder war sie beim Init noch nicht
    // gerendert), ist unser Inhalt weg - dann einfach erneut einhängen.
    form.on?.("render", () => {
        if (!mountedRoot?.isConnected) {
            mountContent(currentForm);
        }
    });
};


/***/ },

/***/ "./src/data/batchProfileMail.json"
/*!****************************************!*\
  !*** ./src/data/batchProfileMail.json ***!
  \****************************************/
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"name":"Frühes Scannen (Mail)","authorizedGroups":[{"id":"C7D335FA-C1A1-4BB3-80F6-A1A6415DAE27","displayName":"Alle"}],"authorizedBatchIdpElements":[{"id":"DA68014B-8FAF-48DA-904B-F8B360D0B803","displayName":"Ersteller*in des Stapels","elementType":0}],"errorNotificationRecipients":[{"id":"005B1D7A-0899-481F-9E61-DE43C90F1381","displayName":"Bereits berechtigte Gruppen und Personen","elementType":1}],"authorizedDeleteBatchIdpElements":[{"id":"DA68014B-8FAF-48DA-904B-F8B360D0B803","displayName":"Ersteller*in des Stapels","elementType":0},{"id":"005B1D7A-0899-481F-9E61-DE43C90F1381","displayName":"Bereits berechtigte Gruppen und Personen","elementType":1}],"importProfile":{"defaultCategoryId":null,"categoryRules":null},"mailBodyCategoryRule":{"ruleType":0,"active":false,"categoryId":"likeDefaultCategory"},"emailHandling":{"import":"3","placeBody":"0","importInlineAttachments":false},"properties":{"documentProperties":[],"batchProperties":[]},"exportProfile":{"primaryExportFile":"4","automatedExport":true,"exportSystemId":"classcon-documentreader-0189e289-edcc-48ae-974e-3edde2029063_ExportImportProcessAutomated","showExportSystemInstantly":false,"exportAdditionalAttachments":true},"allowPageEditing":true,"respectSignature":true,"guiRestrictions":{"addPagesAvailable":true,"deletePagesAvailable":true,"movePagesAvailable":true,"rotatePagesAvailable":true,"editDocumentsAvailable":true,"editDocumentPropertiesAvailable":true},"splittingProfile":{"active":true,"barcodeProfileId":null,"regEx":null,"removePage":false,"splittingMode":"2","maxPageCount":null,"regExForSplitting":null},"pageProcessing":{"barcodeRecognition":true,"textRecognition":true,"searchablePdf":true},"compression":{"active":false,"compression":"-1"},"documentProcessing":{"kiProcessing":true,"llmProcessing":false},"fileImportRules":{"type":0,"regExRules":[".*\\\\.exe$",".*\\\\.dll$",".*\\\\.msi$",".*\\\\.js$",".*\\\\.jar$",".*\\\\.ear$",".*\\\\.war$",".*\\\\.mpkg$",".*\\\\.php\\\\d?$",".*\\\\.sh$",".*\\\\.swf$",".*\\\\.pm$",".*\\\\.pl$",".*\\\\.ps1$",".*\\\\.com$",".*\\\\.bat$",".*\\\\.cmd$",".*\\\\.vbs$",".*\\\\.vbe$",".*\\\\.jse$",".*\\\\.wsf$",".*\\\\.wsh$",".*\\\\.msc$",".*\\\\.p7c$",".*\\\\.p7m$",".*\\\\.p7s$",".*\\\\.crt$",".*\\\\.der$",".*\\\\.cer$",".*\\\\.pem$",".*\\\\.ics$",".*\\\\.bin$",".*\\\\.vcf$"]},"newRegEx":null}');

/***/ },

/***/ "./src/data/batchProfileScan.json"
/*!****************************************!*\
  !*** ./src/data/batchProfileScan.json ***!
  \****************************************/
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"name":"Frühes Scannen (Scan)","authorizedGroups":[{"id":"C7D335FA-C1A1-4BB3-80F6-A1A6415DAE27","displayName":"Alle","elementType":1}],"authorizedBatchIdpElements":[{"id":"DA68014B-8FAF-48DA-904B-F8B360D0B803","displayName":"Ersteller*in des Stapels","elementType":0}],"errorNotificationRecipients":[{"id":"005B1D7A-0899-481F-9E61-DE43C90F1381","displayName":"Bereits berechtigte Gruppen und Personen","elementType":1}],"authorizedDeleteBatchIdpElements":[{"id":"DA68014B-8FAF-48DA-904B-F8B360D0B803","displayName":"Ersteller*in des Stapels","elementType":0},{"id":"005B1D7A-0899-481F-9E61-DE43C90F1381","displayName":"Bereits berechtigte Gruppen und Personen","elementType":1}],"importProfile":{"defaultCategoryId":null,"categoryRules":null},"mailBodyCategoryRule":{"ruleType":0,"active":false,"categoryId":"likeDefaultCategory"},"emailHandling":{"import":"3","placeBody":"0","importInlineAttachments":false},"properties":{"documentProperties":[],"batchProperties":[]},"exportProfile":{"primaryExportFile":"4","automatedExport":false,"exportSystemId":"classcon-documentreader-0189e289-edcc-48ae-974e-3edde2029063_ExportImportProcess","showExportSystemInstantly":false,"exportAdditionalAttachments":true},"allowPageEditing":true,"respectSignature":true,"guiRestrictions":{"addPagesAvailable":true,"deletePagesAvailable":true,"movePagesAvailable":true,"rotatePagesAvailable":true,"editDocumentsAvailable":true,"editDocumentPropertiesAvailable":true},"splittingProfile":{"active":true,"barcodeProfileId":null,"regEx":null,"removePage":false,"splittingMode":"0","maxPageCount":null,"regExForSplitting":null},"pageProcessing":{"barcodeRecognition":true,"textRecognition":true,"searchablePdf":true},"compression":{"active":false,"compression":"-1"},"documentProcessing":{"kiProcessing":true,"llmProcessing":false},"fileImportRules":{"type":0,"regExRules":[".*\\\\.exe$",".*\\\\.dll$",".*\\\\.msi$",".*\\\\.js$",".*\\\\.jar$",".*\\\\.ear$",".*\\\\.war$",".*\\\\.mpkg$",".*\\\\.php\\\\d?$",".*\\\\.sh$",".*\\\\.swf$",".*\\\\.pm$",".*\\\\.pl$",".*\\\\.ps1$",".*\\\\.com$",".*\\\\.bat$",".*\\\\.cmd$",".*\\\\.vbs$",".*\\\\.vbe$",".*\\\\.jse$",".*\\\\.wsf$",".*\\\\.wsh$",".*\\\\.msc$",".*\\\\.p7c$",".*\\\\.p7m$",".*\\\\.p7s$",".*\\\\.crt$",".*\\\\.der$",".*\\\\.cer$",".*\\\\.pem$",".*\\\\.ics$",".*\\\\.bin$",".*\\\\.vcf$"]},"newRegEx":null}');

/***/ },

/***/ "./src/data/scriptGutschriftenVerschieben.json"
/*!*****************************************************!*\
  !*** ./src/data/scriptGutschriftenVerschieben.json ***!
  \*****************************************************/
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"id":"d5795100-1f19-46e1-8c7f-8888ec9ce5b6","name":"Rechnungsleser Gutschriften verschieben","changelog":"","creationDate":"2025-02-11T13:02:29Z","changeDate":"2025-03-31T14:38:11Z","author":"1B8DE68A-2C75-45F0-B649-635EA4619060","dev":true,"released":false,"scriptId":"3fa4300f-97ba-4628-904d-e7353c2c2861","actionEnabled":false,"action":{"id":"3fa4300f-97ba-4628-904d-e7353c2c2861-d5795100-1f19-46e1-8c7f-8888ec9ce5b6","display_name":{"de":""},"tags":null,"description":{"de":""},"endpoint":"/scripting/script/3fa4300f-97ba-4628-904d-e7353c2c2861/version/d5795100-1f19-46e1-8c7f-8888ec9ce5b6/run","execution_mode":"Synchron","input_properties":null,"output_properties":null,"volatile":true},"dependencies":null,"customerVariables":[{"key":"apiKey","value":"","encrypted":true},{"key":"categoryCreditMemoGUID","value":"52a84dbc-31bf-4351-9c16-4852dc2e816d","encrypted":false},{"key":"fieldDocumentTypeGUID","value":"717f4480-f16c-4838-96a3-f69a01eb41f1","encrypted":false},{"key":"fieldDocumentTypeValueMatch","value":"CreditAdvice","encrypted":false}],"content":"(()=>{\\"use strict\\";const t={DEBUG:\\"DEBUG\\",INFO:\\"INFO\\",WARN:\\"WARN\\",ERROR:\\"ERROR\\"};let e=t.DEBUG;function s(s,n=t.INFO){const o=[t.DEBUG,t.INFO,t.WARN,t.ERROR],a=o.indexOf(e);o.indexOf(n)>=a&&console.log(`[${n}] ${s}`)}function n(s){Object.values(t).includes(s)?e=s:console.warn(`Invalid log level: ${s}`)}async function o(e,n,o,a=null){const i={method:n,headers:o};if(a)if(\\"application/json\\"===o[\\"Content-Type\\"]||\\"application/hal+json\\"===o[\\"Content-Type\\"])i.body=JSON.stringify(a);else{if(\\"application/octet-stream\\"!==o[\\"Content-Type\\"])throw new Error(\\"Unsupported Content-Type or body format.\\");i.body=a}s(`Performing HTTP request to URL: ${e}\\\\nRequest options: ${JSON.stringify({...i,body:a&&(\\"object\\"==typeof a?a:JSON.parse(a))},null,2)}`,t.DEBUG);const r=await fetch(e,i);if(!r.ok)return await async function(e){const n=e.clone();let o,a;try{o=await n.text()}catch(n){return void s(`$Statuscode: ${e.status} Unable to read the response body.`,t.ERROR)}if(!o.trim())return void s(`Statuscode: ${e.status} Response body is empty.`,t.ERROR);try{a=JSON.parse(o)}catch(n){return void s(`Statuscode: ${e.status} Body is not valid JSON: ${o}`,t.ERROR)}const i=Object.entries(a).map((([t,e])=>`${t.charAt(0).toUpperCase()+t.slice(1)}: ${e}`)).join(\\" \\");s(`Statuscode: ${e.status} Errordetails: ${i}`,t.ERROR)}(r),r.ok;const c=r.headers.get(\\"Content-Type\\");switch(n){case\\"GET\\":if(s(`Response Content-Type: ${c}`,t.DEBUG),c.includes(\\"application/json\\")||c.includes(\\"application/hal+json\\")){let e=await r.json();return s(`Response: ${r.status} ${r.statusText}`,t.DEBUG),e}if(c.includes(\\"text/\\")){let e=await r.text();return s(`Response: ${r.status} ${r.statusText}`,t.DEBUG),e}if(c.includes(\\"application/octet-stream\\")||c.includes(\\"image/\\")||c.includes(\\"application/pdf\\"))return s(`Response: ${r.status} ${r.statusText}`,t.DEBUG),await r.arrayBuffer();throw new Error(`Unsupported Content-Type: ${c}`);case\\"POST\\":if(null!=c){if(s(`Response Content-Type: ${c}`,t.DEBUG),c.includes(\\"application/json\\")||c.includes(\\"application/hal+json\\")){let e=await r.json();return s(`Response: ${r.status} ${r.statusText}`,t.DEBUG),e}if(c.includes(\\"text/\\")){let e=await r.text();return s(`Response: ${r.status} ${r.statusText}`,t.DEBUG),e}if(c.includes(\\"application/octet-stream\\")||c.includes(\\"image/\\")||c.includes(\\"application/pdf\\"))return s(`Response: ${r.status} ${r.statusText}`,t.DEBUG),await r.arrayBuffer();throw new Error(`Unsupported Content-Type: ${c}`)}case\\"PUT\\":case\\"DELETE\\":return r;default:throw new Error(`Unsupported HTTP method: ${n}`)}}class a{constructor(t){this.AuthSessionId=t.AuthSessionId,this.Expire=t.Expire}}async function i(t,e,s,n,a,i,r){const c=`${t}/dms/r/${s}/o2m/${n}`,u={Authorization:`Bearer ${e}`,Accept:\\"application/hal+json\\",\\"Content-Type\\":\\"application/hal+json\\"},p={sourceCategory:a,sourceId:i,sourceProperties:r};return(await o(c,\\"PUT\\",u,p)).ok??!0}n(t.ERROR),module.exports=async(e,r)=>{try{n(t.DEBUG);let c=e.json();s(`Request Body Below:\\\\n        ${JSON.stringify(c)}`,t.INFO);const u=e.get(\\"x-dv-baseuri\\"),p=e.var(\\"apiKey\\"),l=e.var(\\"categoryCreditMemoGUID\\"),d=e.var(\\"fieldDocumentTypeGUID\\"),y=e.var(\\"fieldDocumentTypeValueMatch\\"),$=c.doc.id,h=c.doc.categoryId,f=(await async function(t,e){const s=`${t}/identityprovider/login`,n={Authorization:`Bearer ${e}`,Accept:\\"application/hal+json\\",\\"Content-Type\\":\\"application/hal+json\\"};return new a(await o(s,\\"GET\\",n))}(u,p)).AuthSessionId,R=(await async function(t,e){const s=`${t}/dms/r`,n={Authorization:`Bearer ${e}`,Accept:\\"application/hal+json\\",\\"Content-Type\\":\\"application/hal+json\\"};return await o(s,\\"GET\\",n)}(u,f)).repositories[0].id;let T=c.doc.properties.find((t=>t.id==d)).value;if(T==y){s(`Document Type matched: ${T} with ${y}`,t.INFO);const e={properties:[{key:d,values:[\\"Gutschrift\\"]}]};await i(u,f,R,$,l,`/dms/r/${R}/source`,e)?r.status(200).set(\\"Content-Type\\",\\"text\\").send(\\"Successfully switched category\\"):r.status(500).set(\\"Content-Type\\",\\"text\\").send(\\"Failed to switch category\\")}else{const e={properties:[{key:d,values:[\\"Rechnung\\"]}]};await i(u,f,R,$,h,`/dms/r/${R}/source`,e)?r.status(200).set(\\"Content-Type\\",\\"text\\").send(\\"Successfully switched field DocumentType\\"):r.status(500).set(\\"Content-Type\\",\\"text\\").send(\\"Failed to switch DocumenType\\"),s(`Document Type did not match: ${T} with ${y}`,t.INFO),r.status(200).set(\\"Content-Type\\",\\"text\\").send(\\"Document Type does not match\\")}}catch(e){s(`Error: ${e}`,t.ERROR),r.status(500).set(\\"Content-Type\\",\\"text\\").send(e)}}})();"}');

/***/ },

/***/ "./src/data/webindexDesignerForm.json"
/*!********************************************!*\
  !*** ./src/data/webindexDesignerForm.json ***!
  \********************************************/
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"name":"classcon-documentreader","baseLayout":{"DocumentTypeID":"INV","CustomDuplicateCheck":{"QueryDefinition":"SELECT\\n  *\\nFROM\\n  CCLogAttributes AS att\\n  INNER JOIN CCLogDocuments AS doc ON att.DocumentID = doc.DocumentID\\nWHERE\\n  doc.SubscriptionID = @subscriptionID\\n  AND doc.ProcessSequenceID = @processSequenceID\\n  AND doc.Type = 0\\n  AND doc.Category_After = @vendorNumber\\n  AND att.DocumentID <> @documentID\\n  AND att.Attribute_Name = \'InvoiceNumber\'\\n  AND att.Attribute_After = @invoiceNumber","QueryMappings":[{"ColumnName":"@subscriptionID","AttributeID":"SubscriptionId"},{"ColumnName":"@processSequenceID","AttributeID":"ProcessSequenceId"},{"ColumnName":"@documentID","AttributeID":"DocumentUID"},{"ColumnName":"@invoiceNumber","AttributeID":"InvoiceNumber"},{"ColumnName":"@vendorNumber","AttributeID":"VENDOR_NUM"}],"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DateTargetFormats":[{"Code":"de","JSFormat":"DD.MM.YYYY","Format":"dd.MM.yyyy","Pattern":"^(0?[1-9]|[12][0-9]|3[01])[.](0?[1-9]|1[012])[.](\\\\d{4})$"},{"Code":"en-GB","JSFormat":"DD/MM/YYYY","Format":"dd/MM/yyyy","Pattern":"^(0?[1-9]|[12][0-9]|3[01])\\\\/(0?[1-9]|1[012])\\\\/(\\\\d{4})$"},{"Code":"en-US","JSFormat":"MM/DD/YYYY","Format":"MM/dd/yyyy","Pattern":"^(0?[1-9]|1[012])\\\\/(0?[1-9]|[12][0-9]|3[01])\\\\/(\\\\d{4})$"},{"Code":"en","JSFormat":"DD/MM/YYYY","Format":"dd/MM/yyyy","Pattern":"^(0?[1-9]|[12][0-9]|3[01])\\\\/(0?[1-9]|1[012])\\\\/(\\\\d{4})$"},{"Code":"fr","JSFormat":"DD/MM/YYYY","Format":"dd/MM/yyyy","Pattern":"^(0?[1-9]|[12][0-9]|3[01])\\\\/(0?[1-9]|1[012])\\\\/(\\\\d{4})$"},{"Code":"cs","JSFormat":"DD.MM.YYYY","Format":"dd.MM.yyyy","Pattern":"^(0?[1-9]|[12][0-9]|3[01])[.](0?[1-9]|1[012])[.](\\\\d{4})$"},{"Code":"da","JSFormat":"DD-MM-YYYY","Format":"dd-MM-yyyy","Pattern":"^(0?[1-9]|[12][0-9]|3[01])-(0?[1-9]|1[012])-(\\\\d{4})$"},{"Code":"es","JSFormat":"DD/MM/YYYY","Format":"dd/MM/yyyy","Pattern":"^(0?[1-9]|[12][0-9]|3[01])\\\\/(0?[1-9]|1[012])\\\\/(\\\\d{4})$"},{"Code":"hr","JSFormat":"DD.MM.YYYY","Format":"dd.MM.yyyy","Pattern":"^(0?[1-9]|[12][0-9]|3[01])[.](0?[1-9]|1[012])[.](\\\\d{4})$"},{"Code":"it","JSFormat":"DD/MM/YYYY","Format":"dd/MM/yyyy","Pattern":"^(0?[1-9]|[12][0-9]|3[01])\\\\/(0?[1-9]|1[012])\\\\/(\\\\d{4})$"},{"Code":"nl","JSFormat":"DD-MM-YYYY","Format":"dd-MM-yyyy","Pattern":"^(0?[1-9]|[12][0-9]|3[01])-(0?[1-9]|1[012])-(\\\\d{4})$"},{"Code":"pl","JSFormat":"DD.MM.YYYY","Format":"dd.MM.yyyy","Pattern":"^(0?[1-9]|[12][0-9]|3[01])[.](0?[1-9]|1[012])[.](\\\\d{4})$"},{"Code":"pt","JSFormat":"DD-MM-YYYY","Format":"dd-MM-yyyy","Pattern":"^(0?[1-9]|[12][0-9]|3[01])-(0?[1-9]|1[012])-(\\\\d{4})$"},{"Code":"sk","JSFormat":"DD.MM.YYYY","Format":"dd.MM.yyyy","Pattern":"^(0?[1-9]|[12][0-9]|3[01])[.](0?[1-9]|1[012])[.](\\\\d{4})$"},{"Code":"sr","JSFormat":"DD.MM.YYYY","Format":"dd.MM.yyyy","Pattern":"^(0?[1-9]|[12][0-9]|3[01])[.](0?[1-9]|1[012])[.](\\\\d{4})$"},{"Code":"zh","JSFormat":"YYYY-MM-DD","Format":"yyyy-MM-dd","Pattern":"^\\\\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])$"}],"FloatValueFormats":[{"Code":"de","ThousandDelimiter":"","DecimalPlacesDelimiter":",","Pattern":"^\\\\d+(,\\\\d+)?$"},{"Code":"en-GB","ThousandDelimiter":"","DecimalPlacesDelimiter":".","Pattern":"^\\\\d+(\\\\.\\\\d+)?$"},{"Code":"en-US","ThousandDelimiter":"","DecimalPlacesDelimiter":".","Pattern":"^\\\\d+(\\\\.\\\\d+)?$"},{"Code":"en","ThousandDelimiter":"","DecimalPlacesDelimiter":".","Pattern":"^\\\\d+(\\\\.\\\\d+)?$"},{"Code":"fr","ThousandDelimiter":"","DecimalPlacesDelimiter":",","Pattern":"^\\\\d+(,\\\\d+)?$"},{"Code":"cs","ThousandDelimiter":"","DecimalPlacesDelimiter":",","Pattern":"^\\\\d+(,\\\\d+)?$"},{"Code":"da","ThousandDelimiter":"","DecimalPlacesDelimiter":",","Pattern":"^\\\\d+(,\\\\d+)?$"},{"Code":"es","ThousandDelimiter":"","DecimalPlacesDelimiter":",","Pattern":"^\\\\d+(,\\\\d+)?$"},{"Code":"hr","ThousandDelimiter":"","DecimalPlacesDelimiter":",","Pattern":"^\\\\d+(,\\\\d+)?$"},{"Code":"it","ThousandDelimiter":"","DecimalPlacesDelimiter":",","Pattern":"^\\\\d+(,\\\\d+)?$"},{"Code":"nl","ThousandDelimiter":"","DecimalPlacesDelimiter":",","Pattern":"^\\\\d+(,\\\\d+)?$"},{"Code":"pl","ThousandDelimiter":"","DecimalPlacesDelimiter":",","Pattern":"^\\\\d+(,\\\\d+)?$"},{"Code":"pt","ThousandDelimiter":"","DecimalPlacesDelimiter":",","Pattern":"^\\\\d+(,\\\\d+)?$"},{"Code":"sk","ThousandDelimiter":"","DecimalPlacesDelimiter":",","Pattern":"^\\\\d+(,\\\\d+)?$"},{"Code":"sr","ThousandDelimiter":"","DecimalPlacesDelimiter":",","Pattern":"^\\\\d+(,\\\\d+)?$"},{"Code":"zh","ThousandDelimiter":"","DecimalPlacesDelimiter":".","Pattern":"^\\\\d+(\\\\.\\\\d+)?$"}],"AttributeTypeDefinitions":[{"AttributeTypeId":"VENDOR_NUM","AttributeTypeDescription":"Vendor Number","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"vendor.VENDOR_NUM","InboundAlias":null,"LoggingFlag":0,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":"basics.vendor clues"},{"AttributeTypeId":"InvoiceNumber","AttributeTypeDescription":"Invoice Number","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"invoicenumber","InboundAlias":null,"LoggingFlag":0,"InterpretAsMultipleValues":false,"ModelType":1,"TemplatePath":"vendor.[TEMPLATE_ID].invoicenumber"},{"AttributeTypeId":"InvoiceDate","AttributeTypeDescription":"Invoice Date","SemanticType":0,"ValueType":2,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"invoicedate.date","InboundAlias":null,"LoggingFlag":0,"InterpretAsMultipleValues":false,"ModelType":1,"TemplatePath":"vendor.[TEMPLATE_ID].invoicedate"},{"AttributeTypeId":"CostCenter","AttributeTypeDescription":"CostCenter","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":1,"DClassifyAlias":"costcenter","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"ImpersonalAccount","AttributeTypeDescription":"ImpersonalAccount","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":1,"DClassifyAlias":"impersonal-account","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"9e322012-3cc1-402d-9fd8-f64aad71fbf7","AttributeTypeDescription":"Barcode","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"3d6dd2a3-bfc6-4170-b7e5-8d347d449c35","AttributeTypeDescription":"Barcode3","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Notes","AttributeTypeDescription":"Notes","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"VENDOR_NAME","AttributeTypeDescription":"Vendor Name","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"vendor.VENDOR_NAME","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"VENDOR_CITY","AttributeTypeDescription":"Vendor City","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"vendor.VENDOR_CITY","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"VENDOR_STR","AttributeTypeDescription":"VendorStr","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"vendor.VENDOR_STR","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"VENDOR_ZIP_CODE","AttributeTypeDescription":"VendorZipCode","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"vendor.VENDOR_ZIP_CODE","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"VENDOR_VAT_REGISTRATION_ID","AttributeTypeDescription":"VendorVatID","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"vendor.VENDOR_VAT_REGISTRATION_ID","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"VENDOR_COUNTRY","AttributeTypeDescription":"Vendor Country","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"VENDOR_IBAN","AttributeTypeDescription":"VENDOR_IBAN","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"vendor.iban","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"DEBITOR_NUM","AttributeTypeDescription":"DebitorNum","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"company.COMPANY_NUM","InboundAlias":null,"LoggingFlag":0,"InterpretAsMultipleValues":false,"ModelType":2,"TemplatePath":"mandant"},{"AttributeTypeId":"NAME","AttributeTypeDescription":"DebitorName","SemanticType":1,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"company.NAME","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"CITY","AttributeTypeDescription":"DebitorCity","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"company.CITY","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"STR","AttributeTypeDescription":"DebitorStr","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"company.STR","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"COUNTRY","AttributeTypeDescription":"COUNTRY","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"company.COUNTRY","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"DEFAULT_CURRENCY","AttributeTypeDescription":"DEFAULT_CURRENCY","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"company.DEFAULT_CURRENCY","InboundAlias":null,"LoggingFlag":2,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"GrossAmount","AttributeTypeDescription":"GrossAmount","SemanticType":0,"ValueType":1,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"Betragsdaten.Bruttobetrag","InboundAlias":null,"LoggingFlag":0,"InterpretAsMultipleValues":false,"ModelType":1,"TemplatePath":"vendor.[TEMPLATE_ID].TrustedAmount"},{"AttributeTypeId":"NetAmount1","AttributeTypeDescription":"NetAmount1","SemanticType":0,"ValueType":1,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"Betragsdaten.Nettobetrag","InboundAlias":null,"LoggingFlag":0,"InterpretAsMultipleValues":false,"ModelType":1,"TemplatePath":"vendor.[TEMPLATE_ID].TrustedNet1"},{"AttributeTypeId":"VatAmount1","AttributeTypeDescription":"VatAmount1","SemanticType":0,"ValueType":1,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"Betragsdaten.Mehrwertsteuerbetrag","InboundAlias":null,"LoggingFlag":0,"InterpretAsMultipleValues":false,"ModelType":1,"TemplatePath":"vendor.[TEMPLATE_ID].TrustedVatAmount1"},{"AttributeTypeId":"VatRate1","AttributeTypeDescription":"VatRate1","SemanticType":0,"ValueType":1,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"Betragsdaten.Mehrwertsteuersatz","InboundAlias":null,"LoggingFlag":0,"InterpretAsMultipleValues":false,"ModelType":1,"TemplatePath":"vendor.[TEMPLATE_ID].TrustedVat1"},{"AttributeTypeId":"OrderNum","AttributeTypeDescription":"OrderNum","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"orders.ORDER_NUM","InboundAlias":null,"LoggingFlag":0,"InterpretAsMultipleValues":true,"ModelType":2,"TemplatePath":"basics.ordernumber"},{"AttributeTypeId":"ProjectNumber","AttributeTypeDescription":"ProjectNumber","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"ProjectNumber","InboundAlias":null,"LoggingFlag":0,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"ZIP","AttributeTypeDescription":"DebitorZip","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"company.ZIP","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"NetAmount2","AttributeTypeDescription":"NetAmount2","SemanticType":0,"ValueType":1,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"Betragsdaten.Nettobetrag2","InboundAlias":null,"LoggingFlag":0,"InterpretAsMultipleValues":false,"ModelType":1,"TemplatePath":"vendor.[TEMPLATE_ID].TrustedNet2"},{"AttributeTypeId":"VatAmount2","AttributeTypeDescription":"VatAmount2","SemanticType":0,"ValueType":1,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"Betragsdaten.Mehrwertsteuerbetrag2","InboundAlias":null,"LoggingFlag":0,"InterpretAsMultipleValues":false,"ModelType":1,"TemplatePath":"vendor.[TEMPLATE_ID].TrustedVatAmount2"},{"AttributeTypeId":"VatRate2","AttributeTypeDescription":"VatRate2","SemanticType":0,"ValueType":1,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"Betragsdaten.Mehrwertsteuersatz2","InboundAlias":null,"LoggingFlag":0,"InterpretAsMultipleValues":false,"ModelType":1,"TemplatePath":"vendor.[TEMPLATE_ID].TrustedVat2"},{"AttributeTypeId":"NetAmount3","AttributeTypeDescription":"NetAmount3","SemanticType":0,"ValueType":1,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":0,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"VatAmount3","AttributeTypeDescription":"VatAmount3","SemanticType":0,"ValueType":1,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":0,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"VatRate3","AttributeTypeDescription":"VatRate3","SemanticType":0,"ValueType":1,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":0,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"AdditionalCosts","AttributeTypeDescription":"AdditionalCosts","SemanticType":0,"ValueType":1,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"deliverycosts","InboundAlias":null,"LoggingFlag":0,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Discount","AttributeTypeDescription":"Discount","SemanticType":0,"ValueType":1,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":0,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Issuer","AttributeTypeDescription":"Issuer","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Advisor","AttributeTypeDescription":"Advisor","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Email","AttributeTypeDescription":"Email","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"TermOfPayment","AttributeTypeDescription":"TermOfPayment","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"GrossAmountCurrency","AttributeTypeDescription":"GrossAmountCurrency","SemanticType":0,"ValueType":5,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"currency","InboundAlias":null,"LoggingFlag":0,"InterpretAsMultipleValues":false,"ModelType":1,"TemplatePath":"vendor.[TEMPLATE_ID].currency"},{"AttributeTypeId":"DocumentType","AttributeTypeDescription":"DocumentType","SemanticType":0,"ValueType":5,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"documenttype","InboundAlias":null,"LoggingFlag":0,"InterpretAsMultipleValues":false,"ModelType":1,"TemplatePath":"vendor.[TEMPLATE_ID].Documenttype"},{"AttributeTypeId":"DocumentUID","AttributeTypeDescription":"DocumentUID","SemanticType":16,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"PerformanceDate","AttributeTypeDescription":"PerformanceDate","SemanticType":0,"ValueType":2,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"performancedate.date","InboundAlias":null,"LoggingFlag":0,"InterpretAsMultipleValues":false,"ModelType":1,"TemplatePath":"vendor.[TEMPLATE_ID].performancedate"},{"AttributeTypeId":"BookingDate","AttributeTypeDescription":"BookingDate","SemanticType":0,"ValueType":2,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"performancedate.date","InboundAlias":null,"LoggingFlag":0,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"VENDOR_REGISTRATION_ID","AttributeTypeDescription":"VENDOR_REGISTRATION_ID","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"vendor.VENDOR_REGISTRATION_ID","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"AutoRoutingFlag","AttributeTypeDescription":"AutoRoutingFlag","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"extended_vendor_settings.AutoRoutingFlag","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"QR-IBAN","AttributeTypeDescription":"QR-IBAN","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"QR-IBAN","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"QR-REFERENCE","AttributeTypeDescription":"QR-REFERENCE","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"QR-REFERENCE","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Custom1","AttributeTypeDescription":"Custom1","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"Custom1","InboundAlias":null,"LoggingFlag":2,"InterpretAsMultipleValues":false,"ModelType":2,"TemplatePath":"custom1"},{"AttributeTypeId":"Custom2","AttributeTypeDescription":"Custom2","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"Custom2","InboundAlias":null,"LoggingFlag":2,"InterpretAsMultipleValues":false,"ModelType":2,"TemplatePath":"custom2"},{"AttributeTypeId":"Custom3","AttributeTypeDescription":"Custom3","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"Custom3","InboundAlias":null,"LoggingFlag":2,"InterpretAsMultipleValues":false,"ModelType":1,"TemplatePath":"vendor.[TEMPLATE_ID].custom3"},{"AttributeTypeId":"Custom4","AttributeTypeDescription":"Custom4","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"Custom4","InboundAlias":null,"LoggingFlag":2,"InterpretAsMultipleValues":false,"ModelType":1,"TemplatePath":"vendor.[TEMPLATE_ID].custom4"},{"AttributeTypeId":"Custom5","AttributeTypeDescription":"Custom5","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"Custom5","InboundAlias":null,"LoggingFlag":2,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Custom6","AttributeTypeDescription":"Custom6","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"Custom6","InboundAlias":null,"LoggingFlag":2,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Custom7","AttributeTypeDescription":"Custom7","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"Custom7","InboundAlias":null,"LoggingFlag":2,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Custom8","AttributeTypeDescription":"Custom8","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"Custom8","InboundAlias":null,"LoggingFlag":2,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Custom9","AttributeTypeDescription":"Custom9","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"Custom9","InboundAlias":null,"LoggingFlag":2,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Custom10","AttributeTypeDescription":"Custom10","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"Custom10","InboundAlias":null,"LoggingFlag":2,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Custom11","AttributeTypeDescription":"Custom11","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":1,"DClassifyAlias":"Custom11","InboundAlias":null,"LoggingFlag":2,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Custom12","AttributeTypeDescription":"Custom12","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":1,"DClassifyAlias":"Custom12","InboundAlias":null,"LoggingFlag":2,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Custom13","AttributeTypeDescription":"Custom13","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":1,"DClassifyAlias":"Custom13","InboundAlias":null,"LoggingFlag":2,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Custom14","AttributeTypeDescription":"Custom14","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":1,"DClassifyAlias":"Custom14","InboundAlias":null,"LoggingFlag":2,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Custom15","AttributeTypeDescription":"Custom15","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":1,"DClassifyAlias":"Custom15","InboundAlias":null,"LoggingFlag":2,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Custom16","AttributeTypeDescription":"Custom16","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":1,"DClassifyAlias":"Custom16","InboundAlias":null,"LoggingFlag":2,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Custom17","AttributeTypeDescription":"Custom17","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":1,"DClassifyAlias":"Custom17","InboundAlias":null,"LoggingFlag":2,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Custom18","AttributeTypeDescription":"Custom18","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":1,"DClassifyAlias":"Custom18","InboundAlias":null,"LoggingFlag":2,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Custom19","AttributeTypeDescription":"Custom19","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":1,"DClassifyAlias":"Custom19","InboundAlias":null,"LoggingFlag":2,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Custom20","AttributeTypeDescription":"Custom20","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":1,"DClassifyAlias":"Custom20","InboundAlias":null,"LoggingFlag":2,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Inbound_creatorName","AttributeTypeDescription":"InboundCreatorName","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":1,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Inbound_importProcessname","AttributeTypeDescription":"InboundImportProcessname","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":1,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Inbound_importProcessId","AttributeTypeDescription":"InboundImportProcessId","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":1,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Inbound_importDateTime","AttributeTypeDescription":"InboundImportDateTime","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":1,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Inbound_documentName","AttributeTypeDescription":"InboundDocumentName","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":1,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Inbound_documentCategoryId","AttributeTypeDescription":"InboundDocumentCategoryId","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":1,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Inbound_documentCategoryName","AttributeTypeDescription":"InboundDocumentCategoryName","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":1,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"DocumentGUID","AttributeTypeDescription":"DocumentGUID","SemanticType":0,"ValueType":6,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":2,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"OriginalFileName","AttributeTypeDescription":"OriginalFileName","SemanticType":0,"ValueType":6,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"BatchCreator","AttributeTypeDescription":"BatchCreator","SemanticType":0,"ValueType":6,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"BatchEditor","AttributeTypeDescription":"BatchEditor","SemanticType":0,"ValueType":6,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"CH_QR_IBAN","AttributeTypeDescription":"CH_QR_IBAN","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"CH_QR_TYPE","AttributeTypeDescription":"CH_QR_TYPE","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"CH_QR_REFERENCE","AttributeTypeDescription":"CH_QR_REFERENCE","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"CH_QR_AMOUNT","AttributeTypeDescription":"CH_QR_AMOUNT","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"CH_QR_CURENCY","AttributeTypeDescription":"CH_QR_CURENCY","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"CH_QR_DESCR_MESSAGE","AttributeTypeDescription":"CH_QR_DESCR_MESSAGE","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"CH_QR_DESCR_INFO","AttributeTypeDescription":"CH_QR_DESCR_INFO","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"CH_QR_CODE","AttributeTypeDescription":"CH_QR_CODE","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"CH_ESR_LINE","AttributeTypeDescription":"CH_ESR_LINE","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"ESLine.ESCodezeile","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"$DocumentRole$","AttributeTypeDescription":"$DocumentRole$","SemanticType":19,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":1,"DClassifyAlias":"document-role","InboundAlias":null,"LoggingFlag":0,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null}],"AttributeTypeStructureDefinitions":[{"StructureName":"positions","Description":null,"DClassifyAlias":"Positionen","AttributeTypes":[{"AttributeTypeId":"Pos.OrderNum","AttributeTypeDescription":"Pos.OrderNum","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"ordernumber","InboundAlias":null,"LoggingFlag":0,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Pos.UPrice","AttributeTypeDescription":"Pos.UPrice","SemanticType":0,"ValueType":1,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"unitprice","InboundAlias":null,"LoggingFlag":0,"InterpretAsMultipleValues":false,"ModelType":1,"TemplatePath":"vendor.[TEMPLATE_ID].Positionstemplate.PosUPrice"},{"AttributeTypeId":"Pos.SPrice","AttributeTypeDescription":"Pos.SPrice","SemanticType":0,"ValueType":1,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"totalamount","InboundAlias":null,"LoggingFlag":0,"InterpretAsMultipleValues":false,"ModelType":1,"TemplatePath":"vendor.[TEMPLATE_ID].Positionstemplate.PosSPrice"},{"AttributeTypeId":"Pos.Quantity","AttributeTypeDescription":"Pos.Quantity","SemanticType":0,"ValueType":1,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"quantity","InboundAlias":null,"LoggingFlag":0,"InterpretAsMultipleValues":false,"ModelType":1,"TemplatePath":"vendor.[TEMPLATE_ID].Positionstemplate.PosQuantity"},{"AttributeTypeId":"Pos.OrderPos","AttributeTypeDescription":"Pos.OrderPos","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"order_item-number","InboundAlias":null,"LoggingFlag":0,"InterpretAsMultipleValues":false,"ModelType":1,"TemplatePath":"vendor.[TEMPLATE_ID].Positionstemplate.BestellPosnum"},{"AttributeTypeId":"Pos.DeliveryNote","AttributeTypeDescription":"Pos.DeliveryNote","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"delivery-number","InboundAlias":null,"LoggingFlag":0,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Pos.Article","AttributeTypeDescription":"Pos.Article","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"material-number","InboundAlias":null,"LoggingFlag":0,"InterpretAsMultipleValues":false,"ModelType":1,"TemplatePath":"vendor.[TEMPLATE_ID].Positionstemplate.MaterialNumber"},{"AttributeTypeId":"Pos.Description","AttributeTypeDescription":"Pos.Description","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"description","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":1,"TemplatePath":"vendor.[TEMPLATE_ID].Positionstemplate.Description"},{"AttributeTypeId":"Pos.CostCenter","AttributeTypeDescription":"Pos.CostCenter","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Pos.CostUnit","AttributeTypeDescription":"Pos.CostUnit","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Pos.GLAccount","AttributeTypeDescription":"Pos.GLAccount","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Pos.Custom1","AttributeTypeDescription":"Pos.Custom1","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"Pos.Custom1","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Pos.Custom2","AttributeTypeDescription":"Pos.Custom2","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"Pos.Custom2","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Pos.Custom3","AttributeTypeDescription":"Pos.Custom3","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"Pos.Custom3","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Pos.Custom4","AttributeTypeDescription":"Pos.Custom4","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"Pos.Custom4","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Pos.Custom5","AttributeTypeDescription":"Pos.Custom5","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"Pos.Custom5","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Pos.Custom6","AttributeTypeDescription":"Pos.Custom6","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"Pos.Custom6","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Pos.Custom7","AttributeTypeDescription":"Pos.Custom7","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"Pos.Custom7","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Pos.Custom8","AttributeTypeDescription":"Pos.Custom8","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"Pos.Custom8","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Pos.Custom9","AttributeTypeDescription":"Pos.Custom9","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"Pos.Custom9","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Pos.Custom10","AttributeTypeDescription":"Pos.Custom10","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"Pos.Custom10","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Pos.Custom11","AttributeTypeDescription":"Pos.Custom11","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"Pos.Custom11","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Pos.Custom12","AttributeTypeDescription":"Pos.Custom12","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"Pos.Custom12","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Pos.Custom13","AttributeTypeDescription":"Pos.Custom13","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"Pos.Custom13","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Pos.Custom14","AttributeTypeDescription":"Pos.Custom14","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"Pos.Custom14","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Pos.Custom15","AttributeTypeDescription":"Pos.Custom15","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"Pos.Custom15","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Pos.Custom16","AttributeTypeDescription":"Pos.Custom16","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"Pos.Custom16","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Pos.Custom17","AttributeTypeDescription":"Pos.Custom17","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"Pos.Custom17","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Pos.Custom18","AttributeTypeDescription":"Pos.Custom18","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"Pos.Custom18","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Pos.Custom19","AttributeTypeDescription":"Pos.Custom19","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"Pos.Custom19","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Pos.Custom20","AttributeTypeDescription":"Pos.Custom20","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"Pos.Custom20","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Pos.Zone","AttributeTypeDescription":"Pos.Zone","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":2,"InterpretAsMultipleValues":false,"ModelType":1,"TemplatePath":"vendor.[TEMPLATE_ID].Positionstemplate.PosZone"}]}],"AttributeGroups":[{"GroupID":0,"GroupDescription":"Client","MinifiedView":true,"AttributeDefinitions":[{"AttributeID":"DEBITOR_NUM","Description":"","LocalizedDescriptions":{},"AttributeLabel":null,"AttributeIcon":null,"AttributeType":0,"Required":true,"ReadOnly":false,"DoAlignStart":true,"DefaultValue":null,"Values":[],"ColumnSizePercent":0,"MinLength":0,"MaxLength":0,"SizeDesktop":3,"SizeTablet":3,"SizePhone":4,"Minified":{"SizeDesktop":3,"SizeTablet":3,"SizePhone":4},"Position":{"verticalPosition":0,"horizontalPosition":0},"TabStop":1,"ValueConversion":null,"Title":null,"Pattern":null,"QueryAttributes":[{"AttributeID":"DEBITOR_NUM","AttributeValue":null,"AttributeQueryPrefix":"%","AttributeQuerySuffix":"%","Prefix":false,"MultipleParameter":false}],"JSSnippets":[],"DataBaseDefinition":{"QueryDefinition":"SELECT\\n  COMPANY_NUM,\\n  NAME,\\n  STR,\\n  ZIP,\\n  CITY,\\n  COUNTRY,\\n  DEFAULT_CURRENCY\\nFROM\\n  dbo.CC_COMPANIES\\nWHERE\\n  COMPANY_NUM LIKE @DEBITOR_NUM","QueryMappings":[{"ColumnName":"COMPANY_NUM","AttributeID":"DEBITOR_NUM"},{"ColumnName":"NAME","AttributeID":"NAME"},{"ColumnName":"STR","AttributeID":"STR"},{"ColumnName":"ZIP","AttributeID":"ZIP"},{"ColumnName":"CITY","AttributeID":"CITY"},{"ColumnName":"COUNTRY","AttributeID":"COUNTRY"},{"ColumnName":"DEFAULT_CURRENCY","AttributeID":"DEFAULT_CURRENCY"}],"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":false},{"AttributeID":"NAME","Description":null,"LocalizedDescriptions":{},"AttributeLabel":null,"AttributeIcon":null,"AttributeType":0,"Required":false,"ReadOnly":false,"DoAlignStart":true,"DefaultValue":null,"Values":[],"ColumnSizePercent":0,"MinLength":0,"MaxLength":0,"SizeDesktop":9,"SizeTablet":5,"SizePhone":4,"Minified":{"SizeDesktop":9,"SizeTablet":5,"SizePhone":4},"Position":{"verticalPosition":0,"horizontalPosition":1},"TabStop":2,"ValueConversion":null,"Title":null,"Pattern":null,"QueryAttributes":[{"AttributeID":"NAME","AttributeValue":null,"AttributeQueryPrefix":"%","AttributeQuerySuffix":"%","Prefix":false,"MultipleParameter":false}],"JSSnippets":[],"DataBaseDefinition":{"QueryDefinition":"SELECT\\n  COMPANY_NUM,\\n  NAME,\\n  STR,\\n  ZIP,\\n  CITY,\\n  COUNTRY,\\n  DEFAULT_CURRENCY\\nFROM\\n  dbo.CC_COMPANIES\\nWHERE\\n  NAME LIKE @NAME","QueryMappings":[{"ColumnName":"COMPANY_NUM","AttributeID":"DEBITOR_NUM"},{"ColumnName":"NAME","AttributeID":"NAME"},{"ColumnName":"STR","AttributeID":"STR"},{"ColumnName":"ZIP","AttributeID":"ZIP"},{"ColumnName":"CITY","AttributeID":"CITY"},{"ColumnName":"COUNTRY","AttributeID":"COUNTRY"},{"ColumnName":"DEFAULT_CURRENCY","AttributeID":"DEFAULT_CURRENCY"}],"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":false},{"AttributeID":"STR","Description":null,"LocalizedDescriptions":{},"AttributeLabel":null,"AttributeIcon":null,"AttributeType":0,"Required":false,"ReadOnly":true,"DoAlignStart":true,"DefaultValue":null,"Values":[],"ColumnSizePercent":0,"MinLength":0,"MaxLength":0,"SizeDesktop":4,"SizeTablet":3,"SizePhone":4,"Minified":null,"Position":{"verticalPosition":1,"horizontalPosition":0},"TabStop":3,"ValueConversion":null,"Title":null,"Pattern":null,"QueryAttributes":[{"AttributeID":"STR","AttributeValue":null,"AttributeQueryPrefix":"%","AttributeQuerySuffix":"%","Prefix":false,"MultipleParameter":false}],"JSSnippets":[],"DataBaseDefinition":{"QueryDefinition":"SELECT\\n  COMPANY_NUM,\\n  NAME,\\n  STR,\\n  ZIP,\\n  CITY,\\n  COUNTRY,\\n  DEFAULT_CURRENCY\\nFROM\\n  dbo.CC_COMPANIES\\nWHERE\\n  STR LIKE @STR","QueryMappings":[{"ColumnName":"COMPANY_NUM","AttributeID":"DEBITOR_NUM"},{"ColumnName":"NAME","AttributeID":"NAME"},{"ColumnName":"STR","AttributeID":"STR"},{"ColumnName":"ZIP","AttributeID":"ZIP"},{"ColumnName":"CITY","AttributeID":"CITY"},{"ColumnName":"COUNTRY","AttributeID":"COUNTRY"},{"ColumnName":"DEFAULT_CURRENCY","AttributeID":"DEFAULT_CURRENCY"}],"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":false},{"AttributeID":"ZIP","Description":null,"LocalizedDescriptions":{},"AttributeLabel":null,"AttributeIcon":null,"AttributeType":0,"Required":false,"ReadOnly":true,"DoAlignStart":true,"DefaultValue":null,"Values":[],"ColumnSizePercent":0,"MinLength":0,"MaxLength":0,"SizeDesktop":4,"SizeTablet":2,"SizePhone":4,"Minified":null,"Position":{"verticalPosition":1,"horizontalPosition":1},"TabStop":4,"ValueConversion":null,"Title":null,"Pattern":null,"QueryAttributes":null,"JSSnippets":[],"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":false},{"AttributeID":"CITY","Description":null,"LocalizedDescriptions":{},"AttributeLabel":null,"AttributeIcon":null,"AttributeType":0,"Required":false,"ReadOnly":true,"DoAlignStart":true,"DefaultValue":null,"Values":[],"ColumnSizePercent":0,"MinLength":0,"MaxLength":0,"SizeDesktop":4,"SizeTablet":3,"SizePhone":4,"Minified":null,"Position":{"verticalPosition":1,"horizontalPosition":2},"TabStop":5,"ValueConversion":null,"Title":null,"Pattern":null,"QueryAttributes":[{"AttributeID":"CITY","AttributeValue":null,"AttributeQueryPrefix":"%","AttributeQuerySuffix":"%","Prefix":false,"MultipleParameter":false}],"JSSnippets":[],"DataBaseDefinition":{"QueryDefinition":"SELECT\\n  COMPANY_NUM,\\n  NAME,\\n  STR,\\n  ZIP,\\n  CITY,\\n  COUNTRY,\\n  DEFAULT_CURRENCY\\nFROM\\n  dbo.CC_COMPANIES\\nWHERE\\n  CITY LIKE @CITY","QueryMappings":[{"ColumnName":"COMPANY_NUM","AttributeID":"DEBITOR_NUM"},{"ColumnName":"NAME","AttributeID":"NAME"},{"ColumnName":"STR","AttributeID":"STR"},{"ColumnName":"ZIP","AttributeID":"ZIP"},{"ColumnName":"CITY","AttributeID":"CITY"},{"ColumnName":"COUNTRY","AttributeID":"COUNTRY"},{"ColumnName":"DEFAULT_CURRENCY","AttributeID":"DEFAULT_CURRENCY"}],"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":false}],"AttributeStructureDefinitions":[]},{"GroupID":1,"GroupDescription":"Sender","MinifiedView":true,"AttributeDefinitions":[{"AttributeID":"VENDOR_NUM","Description":null,"LocalizedDescriptions":{},"AttributeLabel":null,"AttributeIcon":null,"AttributeType":0,"Required":true,"ReadOnly":false,"DoAlignStart":true,"DefaultValue":null,"Values":[],"ColumnSizePercent":0,"MinLength":0,"MaxLength":0,"SizeDesktop":3,"SizeTablet":3,"SizePhone":4,"Minified":{"SizeDesktop":3,"SizeTablet":3,"SizePhone":4},"Position":{"verticalPosition":0,"horizontalPosition":0},"TabStop":6,"ValueConversion":null,"Title":null,"Pattern":null,"QueryAttributes":[{"AttributeID":"VENDOR_NUM","AttributeValue":null,"AttributeQueryPrefix":"%","AttributeQuerySuffix":"%","Prefix":false,"MultipleParameter":false},{"AttributeID":"DEBITOR_NUM","AttributeValue":null,"AttributeQueryPrefix":"","AttributeQuerySuffix":"","Prefix":false,"MultipleParameter":false}],"JSSnippets":[],"DataBaseDefinition":{"QueryDefinition":"SELECT\\n  ven.*,\\n  venb.*\\nFROM\\n  dbo.CC_VENDORS AS ven\\n  LEFT JOIN dbo.CC_VENDOR_BANK AS venb ON ven.VENDOR_NUM = venb.VENDOR_NUM\\n  AND ven.COMPANY_NUM = venb.COMPANY_NUM\\nWHERE\\n  ven.COMPANY_NUM = @DEBITOR_NUM\\n  AND ven.VENDOR_NUM LIKE @VENDOR_NUM","QueryMappings":[{"ColumnName":"VENDOR_NUM","AttributeID":"VENDOR_NUM"},{"ColumnName":"VENDOR_NAME","AttributeID":"VENDOR_NAME"},{"ColumnName":"VENDOR_STR","AttributeID":"VENDOR_STR"},{"ColumnName":"VENDOR_CITY","AttributeID":"VENDOR_CITY"},{"ColumnName":"VENDOR_ZIP_CODE","AttributeID":"VENDOR_ZIP_CODE"},{"ColumnName":"VENDOR_COUNTRY","AttributeID":"VENDOR_COUNTRY"},{"ColumnName":"VENDOR_EMAIL","AttributeID":"VENDOR_EMAIL"},{"ColumnName":"VENDOR_VAT_REGISTRATION_ID","AttributeID":"VENDOR_VAT_REGISTRATION_ID"},{"ColumnName":"VENDOR_REGISTRATION_ID","AttributeID":"VENDOR_REGISTRATION_ID"},{"ColumnName":"IBAN","AttributeID":"VENDOR_IBAN"}],"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":false},{"AttributeID":"VENDOR_NAME","Description":null,"LocalizedDescriptions":{},"AttributeLabel":null,"AttributeIcon":null,"AttributeType":0,"Required":true,"ReadOnly":false,"DoAlignStart":true,"DefaultValue":null,"Values":[],"ColumnSizePercent":0,"MinLength":0,"MaxLength":0,"SizeDesktop":9,"SizeTablet":5,"SizePhone":4,"Minified":{"SizeDesktop":9,"SizeTablet":5,"SizePhone":4},"Position":{"verticalPosition":0,"horizontalPosition":1},"TabStop":7,"ValueConversion":null,"Title":null,"Pattern":null,"QueryAttributes":[{"AttributeID":"VENDOR_NAME","AttributeValue":null,"AttributeQueryPrefix":"%","AttributeQuerySuffix":"%","Prefix":false,"MultipleParameter":false},{"AttributeID":"DEBITOR_NUM","AttributeValue":null,"AttributeQueryPrefix":"","AttributeQuerySuffix":"","Prefix":false,"MultipleParameter":false}],"JSSnippets":[],"DataBaseDefinition":{"QueryDefinition":"SELECT\\n  ven.*,\\n  venb.*\\nFROM\\n  dbo.CC_VENDORS AS ven\\n  LEFT JOIN dbo.CC_VENDOR_BANK AS venb ON ven.VENDOR_NUM = venb.VENDOR_NUM\\n  AND ven.COMPANY_NUM = venb.COMPANY_NUM\\nWHERE\\n  ven.COMPANY_NUM = @DEBITOR_NUM\\n  AND ven.VENDOR_NAME LIKE @VENDOR_NAME","QueryMappings":[{"ColumnName":"VENDOR_NUM","AttributeID":"VENDOR_NUM"},{"ColumnName":"VENDOR_NAME","AttributeID":"VENDOR_NAME"},{"ColumnName":"VENDOR_STR","AttributeID":"VENDOR_STR"},{"ColumnName":"VENDOR_CITY","AttributeID":"VENDOR_CITY"},{"ColumnName":"VENDOR_ZIP_CODE","AttributeID":"VENDOR_ZIP_CODE"},{"ColumnName":"VENDOR_COUNTRY","AttributeID":"VENDOR_COUNTRY"},{"ColumnName":"VENDOR_EMAIL","AttributeID":"VENDOR_EMAIL"},{"ColumnName":"VENDOR_VAT_REGISTRATION_ID","AttributeID":"VENDOR_VAT_REGISTRATION_ID"},{"ColumnName":"VENDOR_REGISTRATION_ID","AttributeID":"VENDOR_REGISTRATION_ID"},{"ColumnName":"IBAN","AttributeID":"VENDOR_IBAN"}],"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":false},{"AttributeID":"VENDOR_STR","Description":null,"LocalizedDescriptions":{},"AttributeLabel":null,"AttributeIcon":null,"AttributeType":0,"Required":false,"ReadOnly":true,"DoAlignStart":true,"DefaultValue":null,"Values":[],"ColumnSizePercent":0,"MinLength":0,"MaxLength":0,"SizeDesktop":4,"SizeTablet":3,"SizePhone":4,"Minified":null,"Position":{"verticalPosition":1,"horizontalPosition":0},"TabStop":8,"ValueConversion":null,"Title":null,"Pattern":null,"QueryAttributes":[{"AttributeID":"VENDOR_STR","AttributeValue":null,"AttributeQueryPrefix":"%","AttributeQuerySuffix":"%","Prefix":false,"MultipleParameter":false},{"AttributeID":"DEBITOR_NUM","AttributeValue":null,"AttributeQueryPrefix":"","AttributeQuerySuffix":"","Prefix":false,"MultipleParameter":false}],"JSSnippets":[],"DataBaseDefinition":{"QueryDefinition":"SELECT\\n  ven.*,\\n  venb.*\\nFROM\\n  dbo.CC_VENDORS AS ven\\n  LEFT JOIN dbo.CC_VENDOR_BANK AS venb ON ven.VENDOR_NUM = venb.VENDOR_NUM\\n  AND ven.COMPANY_NUM = venb.COMPANY_NUM\\nWHERE\\n  ven.COMPANY_NUM = @DEBITOR_NUM\\n  AND ven.VENDOR_STR LIKE @VENDOR_STR","QueryMappings":[{"ColumnName":"VENDOR_NUM","AttributeID":"VENDOR_NUM"},{"ColumnName":"VENDOR_NAME","AttributeID":"VENDOR_NAME"},{"ColumnName":"VENDOR_STR","AttributeID":"VENDOR_STR"},{"ColumnName":"VENDOR_CITY","AttributeID":"VENDOR_CITY"},{"ColumnName":"VENDOR_ZIP_CODE","AttributeID":"VENDOR_ZIP_CODE"},{"ColumnName":"VENDOR_COUNTRY","AttributeID":"VENDOR_COUNTRY"},{"ColumnName":"VENDOR_EMAIL","AttributeID":"VENDOR_EMAIL"},{"ColumnName":"VENDOR_VAT_REGISTRATION_ID","AttributeID":"VENDOR_VAT_REGISTRATION_ID"},{"ColumnName":"VENDOR_REGISTRATION_ID","AttributeID":"VENDOR_REGISTRATION_ID"},{"ColumnName":"IBAN","AttributeID":"VENDOR_IBAN"}],"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":false},{"AttributeID":"VENDOR_ZIP_CODE","Description":null,"LocalizedDescriptions":{},"AttributeLabel":null,"AttributeIcon":null,"AttributeType":0,"Required":false,"ReadOnly":true,"DoAlignStart":true,"DefaultValue":null,"Values":[],"ColumnSizePercent":0,"MinLength":0,"MaxLength":0,"SizeDesktop":4,"SizeTablet":2,"SizePhone":4,"Minified":null,"Position":{"verticalPosition":1,"horizontalPosition":1},"TabStop":9,"ValueConversion":null,"Title":null,"Pattern":null,"QueryAttributes":[{"AttributeID":"VENDOR_ZIP_CODE","AttributeValue":null,"AttributeQueryPrefix":"%","AttributeQuerySuffix":"%","Prefix":false,"MultipleParameter":false},{"AttributeID":"DEBITOR_NUM","AttributeValue":null,"AttributeQueryPrefix":"","AttributeQuerySuffix":"","Prefix":false,"MultipleParameter":false}],"JSSnippets":[],"DataBaseDefinition":{"QueryDefinition":"SELECT\\n  ven.*,\\n  venb.*\\nFROM\\n  dbo.CC_VENDORS AS ven\\n  LEFT JOIN dbo.CC_VENDOR_BANK AS venb ON ven.VENDOR_NUM = venb.VENDOR_NUM\\n  AND ven.COMPANY_NUM = venb.COMPANY_NUM\\nWHERE\\n  ven.COMPANY_NUM = @DEBITOR_NUM\\n  AND ven.VENDOR_ZIP_CODE LIKE @VENDOR_ZIP_CODE","QueryMappings":[{"ColumnName":"VENDOR_NUM","AttributeID":"VENDOR_NUM"},{"ColumnName":"VENDOR_NAME","AttributeID":"VENDOR_NAME"},{"ColumnName":"VENDOR_STR","AttributeID":"VENDOR_STR"},{"ColumnName":"VENDOR_CITY","AttributeID":"VENDOR_CITY"},{"ColumnName":"VENDOR_ZIP_CODE","AttributeID":"VENDOR_ZIP_CODE"},{"ColumnName":"VENDOR_COUNTRY","AttributeID":"VENDOR_COUNTRY"},{"ColumnName":"VENDOR_EMAIL","AttributeID":"VENDOR_EMAIL"},{"ColumnName":"VENDOR_VAT_REGISTRATION_ID","AttributeID":"VENDOR_VAT_REGISTRATION_ID"},{"ColumnName":"VENDOR_REGISTRATION_ID","AttributeID":"VENDOR_REGISTRATION_ID"},{"ColumnName":"IBAN","AttributeID":"VENDOR_IBAN"}],"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":false},{"AttributeID":"VENDOR_CITY","Description":null,"LocalizedDescriptions":{},"AttributeLabel":null,"AttributeIcon":null,"AttributeType":0,"Required":false,"ReadOnly":true,"DoAlignStart":true,"DefaultValue":null,"Values":[],"ColumnSizePercent":0,"MinLength":0,"MaxLength":0,"SizeDesktop":4,"SizeTablet":3,"SizePhone":4,"Minified":null,"Position":{"verticalPosition":1,"horizontalPosition":2},"TabStop":10,"ValueConversion":null,"Title":null,"Pattern":null,"QueryAttributes":[{"AttributeID":"VENDOR_CITY","AttributeValue":null,"AttributeQueryPrefix":"%","AttributeQuerySuffix":"%","Prefix":false,"MultipleParameter":false},{"AttributeID":"DEBITOR_NUM","AttributeValue":null,"AttributeQueryPrefix":"","AttributeQuerySuffix":"","Prefix":false,"MultipleParameter":false}],"JSSnippets":[],"DataBaseDefinition":{"QueryDefinition":"SELECT\\n  ven.*,\\n  venb.*\\nFROM\\n  dbo.CC_VENDORS AS ven\\n  LEFT JOIN dbo.CC_VENDOR_BANK AS venb ON ven.VENDOR_NUM = venb.VENDOR_NUM\\n  AND ven.COMPANY_NUM = venb.COMPANY_NUM\\nWHERE\\n  ven.COMPANY_NUM = @DEBITOR_NUM\\n  AND ven.VENDOR_CITY LIKE @VENDOR_CITY","QueryMappings":[{"ColumnName":"VENDOR_NUM","AttributeID":"VENDOR_NUM"},{"ColumnName":"VENDOR_NAME","AttributeID":"VENDOR_NAME"},{"ColumnName":"VENDOR_STR","AttributeID":"VENDOR_STR"},{"ColumnName":"VENDOR_CITY","AttributeID":"VENDOR_CITY"},{"ColumnName":"VENDOR_ZIP_CODE","AttributeID":"VENDOR_ZIP_CODE"},{"ColumnName":"VENDOR_COUNTRY","AttributeID":"VENDOR_COUNTRY"},{"ColumnName":"VENDOR_EMAIL","AttributeID":"VENDOR_EMAIL"},{"ColumnName":"VENDOR_VAT_REGISTRATION_ID","AttributeID":"VENDOR_VAT_REGISTRATION_ID"},{"ColumnName":"VENDOR_REGISTRATION_ID","AttributeID":"VENDOR_REGISTRATION_ID"},{"ColumnName":"IBAN","AttributeID":"VENDOR_IBAN"}],"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":false},{"AttributeID":"VENDOR_VAT_REGISTRATION_ID","Description":null,"LocalizedDescriptions":{},"AttributeLabel":null,"AttributeIcon":null,"AttributeType":0,"Required":false,"ReadOnly":false,"DoAlignStart":true,"DefaultValue":null,"Values":[],"ColumnSizePercent":0,"MinLength":0,"MaxLength":0,"SizeDesktop":3,"SizeTablet":2,"SizePhone":4,"Minified":null,"Position":{"verticalPosition":2,"horizontalPosition":0},"TabStop":11,"ValueConversion":null,"Title":null,"Pattern":null,"QueryAttributes":[{"AttributeID":"VENDOR_VAT_REGISTRATION_ID","AttributeValue":null,"AttributeQueryPrefix":"%","AttributeQuerySuffix":"%","Prefix":false,"MultipleParameter":false},{"AttributeID":"DEBITOR_NUM","AttributeValue":null,"AttributeQueryPrefix":"","AttributeQuerySuffix":"","Prefix":false,"MultipleParameter":false}],"JSSnippets":[],"DataBaseDefinition":{"QueryDefinition":"SELECT\\n  ven.*,\\n  venb.*\\nFROM\\n  dbo.CC_VENDORS AS ven\\n  LEFT JOIN dbo.CC_VENDOR_BANK AS venb ON ven.VENDOR_NUM = venb.VENDOR_NUM\\n  AND ven.COMPANY_NUM = venb.COMPANY_NUM\\nWHERE\\n  ven.COMPANY_NUM = @DEBITOR_NUM\\n  AND ven.VENDOR_VAT_REGISTRATION_ID LIKE @VENDOR_VAT_REGISTRATION_ID","QueryMappings":[{"ColumnName":"VENDOR_NUM","AttributeID":"VENDOR_NUM"},{"ColumnName":"VENDOR_NAME","AttributeID":"VENDOR_NAME"},{"ColumnName":"VENDOR_STR","AttributeID":"VENDOR_STR"},{"ColumnName":"VENDOR_CITY","AttributeID":"VENDOR_CITY"},{"ColumnName":"VENDOR_ZIP_CODE","AttributeID":"VENDOR_ZIP_CODE"},{"ColumnName":"VENDOR_COUNTRY","AttributeID":"VENDOR_COUNTRY"},{"ColumnName":"VENDOR_EMAIL","AttributeID":"VENDOR_EMAIL"},{"ColumnName":"VENDOR_VAT_REGISTRATION_ID","AttributeID":"VENDOR_VAT_REGISTRATION_ID"},{"ColumnName":"VENDOR_REGISTRATION_ID","AttributeID":"VENDOR_REGISTRATION_ID"},{"ColumnName":"IBAN","AttributeID":"VENDOR_IBAN"}],"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":false},{"AttributeID":"VENDOR_REGISTRATION_ID","Description":null,"LocalizedDescriptions":{},"AttributeLabel":null,"AttributeIcon":null,"AttributeType":0,"Required":false,"ReadOnly":false,"DoAlignStart":true,"DefaultValue":null,"Values":[],"ColumnSizePercent":0,"MinLength":0,"MaxLength":0,"SizeDesktop":3,"SizeTablet":2,"SizePhone":4,"Minified":null,"Position":{"verticalPosition":2,"horizontalPosition":1},"TabStop":12,"ValueConversion":null,"Title":null,"Pattern":null,"QueryAttributes":[{"AttributeID":"VENDOR_REGISTRATION_ID","AttributeValue":null,"AttributeQueryPrefix":"%","AttributeQuerySuffix":"%","Prefix":false,"MultipleParameter":false},{"AttributeID":"DEBITOR_NUM","AttributeValue":null,"AttributeQueryPrefix":"","AttributeQuerySuffix":"","Prefix":false,"MultipleParameter":false}],"JSSnippets":[],"DataBaseDefinition":{"QueryDefinition":"SELECT\\n  ven.*,\\n  venb.*\\nFROM\\n  dbo.CC_VENDORS AS ven\\n  LEFT JOIN dbo.CC_VENDOR_BANK AS venb ON ven.VENDOR_NUM = venb.VENDOR_NUM\\n  AND ven.COMPANY_NUM = venb.COMPANY_NUM\\nWHERE\\n  ven.COMPANY_NUM = @DEBITOR_NUM\\n  AND ven.VENDOR_REGISTRATION_ID LIKE @VENDOR_REGISTRATION_ID","QueryMappings":[{"ColumnName":"VENDOR_NUM","AttributeID":"VENDOR_NUM"},{"ColumnName":"VENDOR_NAME","AttributeID":"VENDOR_NAME"},{"ColumnName":"VENDOR_STR","AttributeID":"VENDOR_STR"},{"ColumnName":"VENDOR_CITY","AttributeID":"VENDOR_CITY"},{"ColumnName":"VENDOR_ZIP_CODE","AttributeID":"VENDOR_ZIP_CODE"},{"ColumnName":"VENDOR_COUNTRY","AttributeID":"VENDOR_COUNTRY"},{"ColumnName":"VENDOR_EMAIL","AttributeID":"VENDOR_EMAIL"},{"ColumnName":"VENDOR_VAT_REGISTRATION_ID","AttributeID":"VENDOR_VAT_REGISTRATION_ID"},{"ColumnName":"VENDOR_REGISTRATION_ID","AttributeID":"VENDOR_REGISTRATION_ID"},{"ColumnName":"IBAN","AttributeID":"VENDOR_IBAN"}],"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":false},{"AttributeID":"VENDOR_IBAN","Description":null,"LocalizedDescriptions":{},"AttributeLabel":null,"AttributeIcon":null,"AttributeType":0,"Required":false,"ReadOnly":false,"DoAlignStart":true,"DefaultValue":null,"Values":[],"ColumnSizePercent":0,"MinLength":0,"MaxLength":0,"SizeDesktop":6,"SizeTablet":4,"SizePhone":4,"Minified":null,"Position":{"verticalPosition":2,"horizontalPosition":2},"TabStop":13,"ValueConversion":null,"Title":null,"Pattern":null,"QueryAttributes":[{"AttributeID":"VENDOR_IBAN","AttributeValue":null,"AttributeQueryPrefix":"%","AttributeQuerySuffix":"%","Prefix":false,"MultipleParameter":false},{"AttributeID":"DEBITOR_NUM","AttributeValue":null,"AttributeQueryPrefix":"","AttributeQuerySuffix":"","Prefix":false,"MultipleParameter":false}],"JSSnippets":[],"DataBaseDefinition":{"QueryDefinition":"SELECT\\n  ven.*,\\n  venb.*\\nFROM\\n  dbo.CC_VENDORS AS ven\\n  LEFT JOIN dbo.CC_VENDOR_BANK AS venb ON ven.VENDOR_NUM = venb.VENDOR_NUM\\n  AND ven.COMPANY_NUM = venb.COMPANY_NUM\\nWHERE\\n  ven.COMPANY_NUM = @DEBITOR_NUM\\n  AND venb.IBAN LIKE @VENDOR_IBAN","QueryMappings":[{"ColumnName":"VENDOR_NUM","AttributeID":"VENDOR_NUM"},{"ColumnName":"VENDOR_NAME","AttributeID":"VENDOR_NAME"},{"ColumnName":"VENDOR_STR","AttributeID":"VENDOR_STR"},{"ColumnName":"VENDOR_CITY","AttributeID":"VENDOR_CITY"},{"ColumnName":"VENDOR_ZIP_CODE","AttributeID":"VENDOR_ZIP_CODE"},{"ColumnName":"VENDOR_COUNTRY","AttributeID":"VENDOR_COUNTRY"},{"ColumnName":"VENDOR_EMAIL","AttributeID":"VENDOR_EMAIL"},{"ColumnName":"VENDOR_VAT_REGISTRATION_ID","AttributeID":"VENDOR_VAT_REGISTRATION_ID"},{"ColumnName":"VENDOR_REGISTRATION_ID","AttributeID":"VENDOR_REGISTRATION_ID"},{"ColumnName":"IBAN","AttributeID":"VENDOR_IBAN"}],"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":false}],"AttributeStructureDefinitions":[]},{"GroupID":2,"GroupDescription":"InvoiceData","MinifiedView":false,"AttributeDefinitions":[{"AttributeID":"DocumentType","Description":null,"LocalizedDescriptions":{},"AttributeLabel":null,"AttributeIcon":null,"AttributeType":0,"Required":false,"ReadOnly":false,"DoAlignStart":true,"DefaultValue":"Invoice","Values":["Invoice","CreditAdvice","CorrectionOfInvoice"],"ColumnSizePercent":0,"MinLength":0,"MaxLength":0,"SizeDesktop":4,"SizeTablet":4,"SizePhone":4,"Minified":null,"Position":{"verticalPosition":0,"horizontalPosition":0},"TabStop":14,"ValueConversion":null,"Title":null,"Pattern":null,"QueryAttributes":null,"JSSnippets":[],"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":false},{"AttributeID":"InvoiceNumber","Description":null,"LocalizedDescriptions":{},"AttributeLabel":null,"AttributeIcon":null,"AttributeType":0,"Required":true,"ReadOnly":false,"DoAlignStart":true,"DefaultValue":null,"Values":[],"ColumnSizePercent":0,"MinLength":0,"MaxLength":0,"SizeDesktop":8,"SizeTablet":4,"SizePhone":4,"Minified":null,"Position":{"verticalPosition":0,"horizontalPosition":1},"TabStop":15,"ValueConversion":null,"Title":null,"Pattern":null,"QueryAttributes":null,"JSSnippets":[],"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":false},{"AttributeID":"InvoiceDate","Description":null,"LocalizedDescriptions":{},"AttributeLabel":null,"AttributeIcon":null,"AttributeType":0,"Required":true,"ReadOnly":false,"DoAlignStart":true,"DefaultValue":null,"Values":[],"ColumnSizePercent":0,"MinLength":0,"MaxLength":0,"SizeDesktop":6,"SizeTablet":4,"SizePhone":4,"Minified":null,"Position":{"verticalPosition":1,"horizontalPosition":0},"TabStop":16,"ValueConversion":"ConvertInputDate","Title":"dd.mm.YYYY","Pattern":"^(0?[1-9]|[12][0-9]|3[01])[.](0?[1-9]|1[012])[.](\\\\d{4})$","QueryAttributes":null,"JSSnippets":[{"OnMethod":"input","Code":" clearTimeout(typingInvoiceDateTimer); var element = $(this);  if (element.val()) { typingInvoiceDateTimer = setTimeout( function() { element.val(ConvertInputDate(element.val())); TriggerFieldValidation(element.attr(\'id\')); }, doneTypingInterval); }\\n "}],"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":false},{"AttributeID":"PerformanceDate","Description":null,"LocalizedDescriptions":{},"AttributeLabel":null,"AttributeIcon":null,"AttributeType":0,"Required":false,"ReadOnly":false,"DoAlignStart":true,"DefaultValue":null,"Values":[],"ColumnSizePercent":0,"MinLength":0,"MaxLength":0,"SizeDesktop":6,"SizeTablet":4,"SizePhone":4,"Minified":null,"Position":{"verticalPosition":1,"horizontalPosition":1},"TabStop":17,"ValueConversion":"ConvertInputDate","Title":"dd.mm.YYYY","Pattern":"^(0?[1-9]|[12][0-9]|3[01])[.](0?[1-9]|1[012])[.](\\\\d{4})$","QueryAttributes":null,"JSSnippets":[{"OnMethod":"input","Code":" clearTimeout(typingPerformanceDateTimer); var element = $(this);  if (element.val()) { typingPerformanceDateTimer = setTimeout( function() { element.val(ConvertInputDate(element.val())); TriggerFieldValidation(element.attr(\'id\')); }, doneTypingInterval); }\\n "}],"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":false},{"AttributeID":"NetAmount1","Description":null,"LocalizedDescriptions":{},"AttributeLabel":null,"AttributeIcon":null,"AttributeType":0,"Required":true,"ReadOnly":false,"DoAlignStart":false,"DefaultValue":"0.00","Values":[],"ColumnSizePercent":0,"MinLength":0,"MaxLength":0,"SizeDesktop":6,"SizeTablet":4,"SizePhone":4,"Minified":null,"Position":{"verticalPosition":2,"horizontalPosition":0},"TabStop":18,"ValueConversion":"ConvertInputFloatWithCustomDelimiter","Title":null,"Pattern":null,"QueryAttributes":null,"JSSnippets":[{"OnMethod":"input","Code":" ConvertInputFloatWithCustomDelimiterOnInput(this);\\n var netAmount1 = Number(GetAttribute(\\"NetAmount1\\"));\\n var vatRate1 = Number(GetAttribute(\\"VatRate1\\"))/100;\\n var vatAmount1 = netAmount1 * vatRate1;\\n SetAttribute(\\"VatAmount1\\", vatAmount1.toFixed(2));\\n\\n var netAmount2 = Number(GetAttribute(\\"NetAmount2\\"));\\n var vatRate2 = Number(GetAttribute(\\"VatRate2\\"))/100;\\n var grossAmount = netAmount1 * (1 + vatRate1) + netAmount2 * (1 + vatRate2);\\n SetAttribute(\\"GrossAmount\\", grossAmount.toFixed(2));"}],"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":false},{"AttributeID":"NetAmount2","Description":null,"LocalizedDescriptions":{},"AttributeLabel":null,"AttributeIcon":null,"AttributeType":0,"Required":false,"ReadOnly":false,"DoAlignStart":false,"DefaultValue":"0.00","Values":[],"ColumnSizePercent":0,"MinLength":0,"MaxLength":0,"SizeDesktop":6,"SizeTablet":4,"SizePhone":4,"Minified":null,"Position":{"verticalPosition":2,"horizontalPosition":1},"TabStop":21,"ValueConversion":"ConvertInputFloatWithCustomDelimiter","Title":null,"Pattern":null,"QueryAttributes":null,"JSSnippets":[{"OnMethod":"input","Code":" ConvertInputFloatWithCustomDelimiterOnInput(this);\\n var netAmount1 = Number(GetAttribute(\\"NetAmount1\\"));\\n var vatRate1 = Number(GetAttribute(\\"VatRate1\\"))/100;\\n\\n var netAmount2 = Number(GetAttribute(\\"NetAmount2\\"));\\n var vatRate2 = Number(GetAttribute(\\"VatRate2\\"))/100;\\n var vatAmount2 = netAmount2 * vatRate2;\\n SetAttribute(\\"VatAmount2\\", vatAmount2.toFixed(2));\\n var grossAmount = netAmount1 * (1 + vatRate1) + netAmount2 * (1 + vatRate2);\\n SetAttribute(\\"GrossAmount\\", grossAmount.toFixed(2));"}],"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":false},{"AttributeID":"VatRate1","Description":null,"LocalizedDescriptions":{},"AttributeLabel":null,"AttributeIcon":null,"AttributeType":0,"Required":false,"ReadOnly":false,"DoAlignStart":false,"DefaultValue":"0.00","Values":[],"ColumnSizePercent":0,"MinLength":0,"MaxLength":0,"SizeDesktop":6,"SizeTablet":4,"SizePhone":4,"Minified":null,"Position":{"verticalPosition":3,"horizontalPosition":0},"TabStop":19,"ValueConversion":"ConvertInputFloatWithCustomDelimiter","Title":null,"Pattern":null,"QueryAttributes":null,"JSSnippets":[{"OnMethod":"input","Code":" ConvertInputFloatWithCustomDelimiterOnInput(this);\\n var netAmount1 = Number(GetAttribute(\\"NetAmount1\\"));\\n var vatRate1 = Number(GetAttribute(\\"VatRate1\\"))/100;\\n var vatAmount1 = netAmount1 * vatRate1;\\n SetAttribute(\\"VatAmount1\\", vatAmount1.toFixed(2));\\n\\n var netAmount2 = Number(GetAttribute(\\"NetAmount2\\"));\\n var vatRate2 = Number(GetAttribute(\\"VatRate2\\"))/100;\\n var grossAmount = netAmount1 * (1 + vatRate1) + netAmount2 * (1 + vatRate2);\\n SetAttribute(\\"GrossAmount\\", grossAmount.toFixed(2));"}],"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":false},{"AttributeID":"VatRate2","Description":null,"LocalizedDescriptions":{},"AttributeLabel":null,"AttributeIcon":null,"AttributeType":0,"Required":false,"ReadOnly":false,"DoAlignStart":false,"DefaultValue":"0.00","Values":[],"ColumnSizePercent":0,"MinLength":0,"MaxLength":0,"SizeDesktop":6,"SizeTablet":4,"SizePhone":4,"Minified":null,"Position":{"verticalPosition":3,"horizontalPosition":1},"TabStop":22,"ValueConversion":"ConvertInputFloatWithCustomDelimiter","Title":null,"Pattern":null,"QueryAttributes":null,"JSSnippets":[{"OnMethod":"input","Code":" ConvertInputFloatWithCustomDelimiterOnInput(this);\\n var netAmount1 = Number(GetAttribute(\\"NetAmount1\\"));\\n var vatRate1 = Number(GetAttribute(\\"VatRate1\\"))/100;\\n\\n var netAmount2 = Number(GetAttribute(\\"NetAmount2\\"));\\n var vatRate2 = Number(GetAttribute(\\"VatRate2\\"))/100;\\n var vatAmount2 = netAmount2 * vatRate2;\\n SetAttribute(\\"VatAmount2\\", vatAmount2.toFixed(2));\\n var grossAmount = netAmount1 * (1 + vatRate1) + netAmount2 * (1 + vatRate2);\\n SetAttribute(\\"GrossAmount\\", grossAmount.toFixed(2));"}],"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":false},{"AttributeID":"VatAmount1","Description":null,"LocalizedDescriptions":{},"AttributeLabel":null,"AttributeIcon":null,"AttributeType":0,"Required":true,"ReadOnly":false,"DoAlignStart":false,"DefaultValue":"0.00","Values":[],"ColumnSizePercent":0,"MinLength":0,"MaxLength":0,"SizeDesktop":6,"SizeTablet":4,"SizePhone":4,"Minified":null,"Position":{"verticalPosition":4,"horizontalPosition":0},"TabStop":20,"ValueConversion":"ConvertInputFloatWithCustomDelimiter","Title":null,"Pattern":null,"QueryAttributes":null,"JSSnippets":[{"OnMethod":"input","Code":" ConvertInputFloatWithCustomDelimiterOnInput(this);\\n "}],"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":false},{"AttributeID":"VatAmount2","Description":null,"LocalizedDescriptions":{},"AttributeLabel":null,"AttributeIcon":null,"AttributeType":0,"Required":false,"ReadOnly":false,"DoAlignStart":false,"DefaultValue":"0.00","Values":[],"ColumnSizePercent":0,"MinLength":0,"MaxLength":0,"SizeDesktop":6,"SizeTablet":4,"SizePhone":4,"Minified":null,"Position":{"verticalPosition":4,"horizontalPosition":1},"TabStop":23,"ValueConversion":"ConvertInputFloatWithCustomDelimiter","Title":null,"Pattern":null,"QueryAttributes":null,"JSSnippets":[{"OnMethod":"input","Code":" ConvertInputFloatWithCustomDelimiterOnInput(this);\\n "}],"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":false},{"AttributeID":"AdditionalCosts","Description":null,"LocalizedDescriptions":{},"AttributeLabel":null,"AttributeIcon":null,"AttributeType":0,"Required":false,"ReadOnly":false,"DoAlignStart":false,"DefaultValue":"0.00","Values":[],"ColumnSizePercent":0,"MinLength":0,"MaxLength":0,"SizeDesktop":12,"SizeTablet":8,"SizePhone":4,"Minified":null,"Position":{"verticalPosition":5,"horizontalPosition":0},"TabStop":24,"ValueConversion":"ConvertInputFloatWithCustomDelimiter","Title":null,"Pattern":null,"QueryAttributes":null,"JSSnippets":[{"OnMethod":"input","Code":" ConvertInputFloatWithCustomDelimiterOnInput(this);\\n "}],"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":false},{"AttributeID":"GrossAmount","Description":null,"LocalizedDescriptions":{},"AttributeLabel":null,"AttributeIcon":null,"AttributeType":0,"Required":true,"ReadOnly":false,"DoAlignStart":false,"DefaultValue":"0.00","Values":[],"ColumnSizePercent":0,"MinLength":0,"MaxLength":0,"SizeDesktop":6,"SizeTablet":4,"SizePhone":4,"Minified":null,"Position":{"verticalPosition":6,"horizontalPosition":0},"TabStop":25,"ValueConversion":"ConvertInputFloatWithCustomDelimiter","Title":null,"Pattern":null,"QueryAttributes":null,"JSSnippets":[{"OnMethod":"input","Code":" ConvertInputFloatWithCustomDelimiterOnInput(this);\\n "}],"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":false},{"AttributeID":"GrossAmountCurrency","Description":null,"LocalizedDescriptions":{},"AttributeLabel":null,"AttributeIcon":null,"AttributeType":0,"Required":false,"ReadOnly":false,"DoAlignStart":true,"DefaultValue":null,"Values":["","AUD","CAD","CHF","CNY","CZK","DKK","EUR","GBP","HKD","INR","JPY","KRW","MYR","NOK","PLN","RUB","SAR","SEK","SGD","TWD","UAH","USD","ZAR"],"ColumnSizePercent":0,"MinLength":0,"MaxLength":0,"SizeDesktop":6,"SizeTablet":4,"SizePhone":4,"Minified":null,"Position":{"verticalPosition":6,"horizontalPosition":1},"TabStop":26,"ValueConversion":null,"Title":null,"Pattern":null,"QueryAttributes":null,"JSSnippets":[],"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":false},{"AttributeID":"OrderNum","Description":null,"LocalizedDescriptions":{},"AttributeLabel":null,"AttributeIcon":null,"AttributeType":0,"Required":false,"ReadOnly":false,"DoAlignStart":true,"DefaultValue":null,"Values":[],"ColumnSizePercent":0,"MinLength":0,"MaxLength":0,"SizeDesktop":12,"SizeTablet":8,"SizePhone":4,"Minified":null,"Position":{"verticalPosition":7,"horizontalPosition":0},"TabStop":27,"ValueConversion":null,"Title":null,"Pattern":null,"QueryAttributes":[{"AttributeID":"OrderNum","AttributeValue":null,"AttributeQueryPrefix":"%","AttributeQuerySuffix":"%","Prefix":false,"MultipleParameter":true},{"AttributeID":"DEBITOR_NUM","AttributeValue":null,"AttributeQueryPrefix":"","AttributeQuerySuffix":"","Prefix":false,"MultipleParameter":false},{"AttributeID":"VENDOR_NUM","AttributeValue":null,"AttributeQueryPrefix":"","AttributeQuerySuffix":"","Prefix":false,"MultipleParameter":false}],"JSSnippets":[],"DataBaseDefinition":{"QueryDefinition":"SELECT\\n  COMPANY_NUM,\\n  VENDOR_NUM,\\n  ORDER_NUM\\nFROM\\n  dbo.CC_ORDERS\\nWHERE\\n  COMPANY_NUM = @DEBITOR_NUM\\n  AND VENDOR_NUM = @VENDOR_NUM\\n  AND (ORDER_NUM LIKE @OrderNum)","QueryMappings":[{"ColumnName":"VENDOR_NUM","AttributeID":"VENDOR_NUM"},{"ColumnName":"COMPANY_NUM","AttributeID":"DEBITOR_NUM"},{"ColumnName":"ORDER_NUM","AttributeID":"OrderNum"}],"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":false}],"AttributeStructureDefinitions":[]}],"StructureGroups":[{"GroupID":0,"GroupDescription":"PositionData","MinifiedView":false,"AttributeDefinitions":[],"AttributeStructureDefinitions":[{"AttributeID":"positions","AttributeDefinitions":[{"AttributeID":"Pos.OrderNum","Description":null,"LocalizedDescriptions":{},"AttributeLabel":null,"AttributeIcon":null,"AttributeType":0,"Required":false,"ReadOnly":false,"DoAlignStart":true,"DefaultValue":null,"Values":[],"ColumnSizePercent":15,"MinLength":0,"MaxLength":0,"SizeDesktop":0,"SizeTablet":0,"SizePhone":0,"Minified":null,"Position":{"verticalPosition":0,"horizontalPosition":0},"TabStop":0,"ValueConversion":null,"Title":null,"Pattern":null,"QueryAttributes":[{"AttributeID":"Pos.OrderNum","AttributeValue":null,"AttributeQueryPrefix":"%","AttributeQuerySuffix":"%","Prefix":true,"MultipleParameter":false},{"AttributeID":"DEBITOR_NUM","AttributeValue":null,"AttributeQueryPrefix":"","AttributeQuerySuffix":"","Prefix":false,"MultipleParameter":false},{"AttributeID":"VENDOR_NUM","AttributeValue":null,"AttributeQueryPrefix":"","AttributeQuerySuffix":"","Prefix":false,"MultipleParameter":false}],"JSSnippets":[],"DataBaseDefinition":{"QueryDefinition":"SELECT\\n  ORL.ORDER_NUM,\\n  ORL.ORDER_POS,\\n  MATNR,\\n  VENDOR_MATNR,\\n  DESCRIPTION,\\n  UNIT_PRICE,\\n  ORL.QUANTITY,\\n  SUM_PRICE,\\n  PRICE_UNITS,\\n  UNITS,\\n  RECEIPT_NUM\\nFROM\\n  dbo.CC_ORDERLINES AS ORL\\n  INNER JOIN dbo.CC_ORDERS AS ORD ON ORL.ORDER_NUM = ORD.ORDER_NUM\\n  LEFT JOIN dbo.CC_RECEIPTS AS REC ON ORL.ORDER_NUM = REC.ORDER_NUM\\n  AND ORL.ORDER_POS = REC.ORDER_POS\\n  AND ORL.COMPANY_NUM = REC.COMPANY_NUM\\nWHERE\\n  ORL.COMPANY_NUM = @DEBITOR_NUM\\n  AND ORD.VENDOR_NUM = @VENDOR_NUM\\n  AND ORL.ORDER_NUM LIKE @PosOrderNum","QueryMappings":[{"ColumnName":"ORDER_NUM","AttributeID":"Pos.OrderNum"},{"ColumnName":"ORDER_POS","AttributeID":"Pos.OrderPos"},{"ColumnName":"MATNR","AttributeID":"Pos.Article"},{"ColumnName":"VENDOR_MATNR","AttributeID":"Pos.VENDOR_MATNR"},{"ColumnName":"DESCRIPTION","AttributeID":"Pos.Description"},{"ColumnName":"UNIT_PRICE","AttributeID":"Pos.UPrice"},{"ColumnName":"QUANTITY","AttributeID":"Pos.Quantity"},{"ColumnName":"SUM_PRICE","AttributeID":"Pos.SPrice"},{"ColumnName":"PRICE_UNITS","AttributeID":"Pos.PRICE_UNITS"},{"ColumnName":"UNITS","AttributeID":"Pos.UNITS"},{"ColumnName":"RECEIPT_NUM","AttributeID":"Pos.DeliveryNote"}],"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":false},{"AttributeID":"Pos.UPrice","Description":null,"LocalizedDescriptions":{},"AttributeLabel":null,"AttributeIcon":null,"AttributeType":0,"Required":true,"ReadOnly":false,"DoAlignStart":false,"DefaultValue":"0.00","Values":[],"ColumnSizePercent":10,"MinLength":0,"MaxLength":0,"SizeDesktop":0,"SizeTablet":0,"SizePhone":0,"Minified":null,"Position":{"verticalPosition":0,"horizontalPosition":0},"TabStop":0,"ValueConversion":"ConvertInputFloatWithCustomDelimiter","Title":null,"Pattern":null,"QueryAttributes":null,"JSSnippets":[{"OnMethod":"input","Code":" ConvertInputFloatWithCustomDelimiterOnInput(this);\\n var rowPrefixValues = this.id.split(\'___\');\\n var structureName = rowPrefixValues[0];\\n var rowIndex = rowPrefixValues[1];\\n var UPrice = Number(GetPositionAttribute(\'Pos.UPrice\', rowIndex, structureName));\\n var quantity = Number(GetPositionAttribute(\'Pos.Quantity\', rowIndex, structureName));\\n SetPositionAttribute(\'Pos.SPrice\', (UPrice * quantity).toFixed(2), rowIndex, structureName);"}],"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":false},{"AttributeID":"Pos.Quantity","Description":null,"LocalizedDescriptions":{},"AttributeLabel":null,"AttributeIcon":null,"AttributeType":0,"Required":true,"ReadOnly":false,"DoAlignStart":false,"DefaultValue":"0","Values":[],"ColumnSizePercent":10,"MinLength":0,"MaxLength":0,"SizeDesktop":0,"SizeTablet":0,"SizePhone":0,"Minified":null,"Position":{"verticalPosition":0,"horizontalPosition":0},"TabStop":0,"ValueConversion":"ConvertInputFloatWithCustomDelimiter","Title":null,"Pattern":null,"QueryAttributes":null,"JSSnippets":[{"OnMethod":"input","Code":" ConvertInputFloatWithCustomDelimiterOnInput(this);\\n var rowPrefixValues = this.id.split(\'___\');\\n var structureName = rowPrefixValues[0];\\n var rowIndex = rowPrefixValues[1];\\n var UPrice = Number(GetPositionAttribute(\'Pos.UPrice\', rowIndex, structureName));\\n var quantity = Number(GetPositionAttribute(\'Pos.Quantity\', rowIndex, structureName));\\n SetPositionAttribute(\'Pos.SPrice\', (UPrice * quantity).toFixed(2), rowIndex, structureName);"}],"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":false},{"AttributeID":"Pos.SPrice","Description":null,"LocalizedDescriptions":{},"AttributeLabel":null,"AttributeIcon":null,"AttributeType":0,"Required":true,"ReadOnly":false,"DoAlignStart":false,"DefaultValue":"0.00","Values":[],"ColumnSizePercent":10,"MinLength":0,"MaxLength":0,"SizeDesktop":0,"SizeTablet":0,"SizePhone":0,"Minified":null,"Position":{"verticalPosition":0,"horizontalPosition":0},"TabStop":0,"ValueConversion":"ConvertInputFloatWithCustomDelimiter","Title":null,"Pattern":null,"QueryAttributes":null,"JSSnippets":[{"OnMethod":"input","Code":" ConvertInputFloatWithCustomDelimiterOnInput(this);"}],"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":false},{"AttributeID":"Pos.OrderPos","Description":null,"LocalizedDescriptions":{},"AttributeLabel":null,"AttributeIcon":null,"AttributeType":0,"Required":false,"ReadOnly":false,"DoAlignStart":true,"DefaultValue":null,"Values":[],"ColumnSizePercent":10,"MinLength":0,"MaxLength":0,"SizeDesktop":0,"SizeTablet":0,"SizePhone":0,"Minified":null,"Position":{"verticalPosition":0,"horizontalPosition":0},"TabStop":0,"ValueConversion":null,"Title":null,"Pattern":null,"QueryAttributes":null,"JSSnippets":[],"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":false},{"AttributeID":"Pos.DeliveryNote","Description":null,"LocalizedDescriptions":{},"AttributeLabel":null,"AttributeIcon":null,"AttributeType":0,"Required":false,"ReadOnly":false,"DoAlignStart":true,"DefaultValue":null,"Values":[],"ColumnSizePercent":10,"MinLength":0,"MaxLength":0,"SizeDesktop":0,"SizeTablet":0,"SizePhone":0,"Minified":null,"Position":{"verticalPosition":0,"horizontalPosition":0},"TabStop":0,"ValueConversion":null,"Title":null,"Pattern":null,"QueryAttributes":null,"JSSnippets":[],"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":false},{"AttributeID":"Pos.Article","Description":null,"LocalizedDescriptions":{},"AttributeLabel":null,"AttributeIcon":null,"AttributeType":0,"Required":false,"ReadOnly":false,"DoAlignStart":true,"DefaultValue":null,"Values":[],"ColumnSizePercent":10,"MinLength":0,"MaxLength":0,"SizeDesktop":0,"SizeTablet":0,"SizePhone":0,"Minified":null,"Position":{"verticalPosition":0,"horizontalPosition":0},"TabStop":0,"ValueConversion":null,"Title":null,"Pattern":null,"QueryAttributes":null,"JSSnippets":[],"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":false},{"AttributeID":"Pos.Description","Description":null,"LocalizedDescriptions":{},"AttributeLabel":null,"AttributeIcon":null,"AttributeType":0,"Required":false,"ReadOnly":false,"DoAlignStart":true,"DefaultValue":null,"Values":[],"ColumnSizePercent":20,"MinLength":0,"MaxLength":0,"SizeDesktop":0,"SizeTablet":0,"SizePhone":0,"Minified":null,"Position":{"verticalPosition":0,"horizontalPosition":0},"TabStop":0,"ValueConversion":null,"Title":null,"Pattern":null,"QueryAttributes":null,"JSSnippets":[],"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":false},{"AttributeID":"ConfigColumn","Description":null,"LocalizedDescriptions":{},"AttributeLabel":null,"AttributeIcon":null,"AttributeType":0,"Required":false,"ReadOnly":false,"DoAlignStart":true,"DefaultValue":null,"Values":[],"ColumnSizePercent":5,"MinLength":0,"MaxLength":0,"SizeDesktop":0,"SizeTablet":0,"SizePhone":0,"Minified":null,"Position":{"verticalPosition":0,"horizontalPosition":0},"TabStop":0,"ValueConversion":null,"Title":null,"Pattern":null,"QueryAttributes":null,"JSSnippets":[],"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":false}],"JSSnippets":[]}]}],"JSSnippets":[],"TemplateDefinition":{"TemplateId":"VENDOR_NUM","TemplateName":"VENDOR_NAME"}},"layouts":[{"DocumentTypeID":"INV","CustomDuplicateCheck":{"QueryDefinition":"SELECT\\n  *\\nFROM\\n  CCLogAttributes AS att\\n  INNER JOIN CCLogDocuments AS doc ON att.DocumentID = doc.DocumentID\\nWHERE\\n  doc.SubscriptionID = @subscriptionID\\n  AND doc.ProcessSequenceID = @processSequenceID\\n  AND doc.Type = 0\\n  AND att.DocumentID <> @documentID\\n  AND att.Attribute_Name = \'InvoiceNumber\'\\n  AND att.Attribute_After = @invoiceNumber","QueryMappings":[{"ColumnName":"@subscriptionID","AttributeID":"SubscriptionId"},{"ColumnName":"@processSequenceID","AttributeID":"ProcessSequenceId"},{"ColumnName":"@documentID","AttributeID":"DocumentUID"},{"ColumnName":"@invoiceNumber","AttributeID":"InvoiceNumber"}],"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DateTargetFormats":[{"Code":"de","JSFormat":"DD.MM.YYYY","Format":"dd.MM.yyyy","Pattern":"^(0?[1-9]|[12][0-9]|3[01])[.](0?[1-9]|1[012])[.](\\\\d{4})$"},{"Code":"en-GB","JSFormat":"DD/MM/YYYY","Format":"dd/MM/yyyy","Pattern":"^(0?[1-9]|[12][0-9]|3[01])\\\\/(0?[1-9]|1[012])\\\\/(\\\\d{4})$"},{"Code":"en-US","JSFormat":"MM/DD/YYYY","Format":"MM/dd/yyyy","Pattern":"^(0?[1-9]|1[012])\\\\/(0?[1-9]|[12][0-9]|3[01])\\\\/(\\\\d{4})$"},{"Code":"en","JSFormat":"DD/MM/YYYY","Format":"dd/MM/yyyy","Pattern":"^(0?[1-9]|[12][0-9]|3[01])\\\\/(0?[1-9]|1[012])\\\\/(\\\\d{4})$"},{"Code":"fr","JSFormat":"DD/MM/YYYY","Format":"dd/MM/yyyy","Pattern":"^(0?[1-9]|[12][0-9]|3[01])\\\\/(0?[1-9]|1[012])\\\\/(\\\\d{4})$"},{"Code":"cs","JSFormat":"DD.MM.YYYY","Format":"dd.MM.yyyy","Pattern":"^(0?[1-9]|[12][0-9]|3[01])[.](0?[1-9]|1[012])[.](\\\\d{4})$"},{"Code":"da","JSFormat":"DD-MM-YYYY","Format":"dd-MM-yyyy","Pattern":"^(0?[1-9]|[12][0-9]|3[01])-(0?[1-9]|1[012])-(\\\\d{4})$"},{"Code":"es","JSFormat":"DD/MM/YYYY","Format":"dd/MM/yyyy","Pattern":"^(0?[1-9]|[12][0-9]|3[01])\\\\/(0?[1-9]|1[012])\\\\/(\\\\d{4})$"},{"Code":"hr","JSFormat":"DD.MM.YYYY","Format":"dd.MM.yyyy","Pattern":"^(0?[1-9]|[12][0-9]|3[01])[.](0?[1-9]|1[012])[.](\\\\d{4})$"},{"Code":"it","JSFormat":"DD/MM/YYYY","Format":"dd/MM/yyyy","Pattern":"^(0?[1-9]|[12][0-9]|3[01])\\\\/(0?[1-9]|1[012])\\\\/(\\\\d{4})$"},{"Code":"nl","JSFormat":"DD-MM-YYYY","Format":"dd-MM-yyyy","Pattern":"^(0?[1-9]|[12][0-9]|3[01])-(0?[1-9]|1[012])-(\\\\d{4})$"},{"Code":"pl","JSFormat":"DD.MM.YYYY","Format":"dd.MM.yyyy","Pattern":"^(0?[1-9]|[12][0-9]|3[01])[.](0?[1-9]|1[012])[.](\\\\d{4})$"},{"Code":"pt","JSFormat":"DD-MM-YYYY","Format":"dd-MM-yyyy","Pattern":"^(0?[1-9]|[12][0-9]|3[01])-(0?[1-9]|1[012])-(\\\\d{4})$"},{"Code":"sk","JSFormat":"DD.MM.YYYY","Format":"dd.MM.yyyy","Pattern":"^(0?[1-9]|[12][0-9]|3[01])[.](0?[1-9]|1[012])[.](\\\\d{4})$"},{"Code":"sr","JSFormat":"DD.MM.YYYY","Format":"dd.MM.yyyy","Pattern":"^(0?[1-9]|[12][0-9]|3[01])[.](0?[1-9]|1[012])[.](\\\\d{4})$"},{"Code":"zh","JSFormat":"YYYY-MM-DD","Format":"yyyy-MM-dd","Pattern":"^\\\\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])$"}],"FloatValueFormats":[{"Code":"de","ThousandDelimiter":"","DecimalPlacesDelimiter":",","Pattern":"^\\\\d+(,\\\\d+)?$"},{"Code":"en-GB","ThousandDelimiter":"","DecimalPlacesDelimiter":".","Pattern":"^\\\\d+(\\\\.\\\\d+)?$"},{"Code":"en-US","ThousandDelimiter":"","DecimalPlacesDelimiter":".","Pattern":"^\\\\d+(\\\\.\\\\d+)?$"},{"Code":"en","ThousandDelimiter":"","DecimalPlacesDelimiter":".","Pattern":"^\\\\d+(\\\\.\\\\d+)?$"},{"Code":"fr","ThousandDelimiter":"","DecimalPlacesDelimiter":",","Pattern":"^\\\\d+(,\\\\d+)?$"},{"Code":"cs","ThousandDelimiter":"","DecimalPlacesDelimiter":",","Pattern":"^\\\\d+(,\\\\d+)?$"},{"Code":"da","ThousandDelimiter":"","DecimalPlacesDelimiter":",","Pattern":"^\\\\d+(,\\\\d+)?$"},{"Code":"es","ThousandDelimiter":"","DecimalPlacesDelimiter":",","Pattern":"^\\\\d+(,\\\\d+)?$"},{"Code":"hr","ThousandDelimiter":"","DecimalPlacesDelimiter":",","Pattern":"^\\\\d+(,\\\\d+)?$"},{"Code":"it","ThousandDelimiter":"","DecimalPlacesDelimiter":",","Pattern":"^\\\\d+(,\\\\d+)?$"},{"Code":"nl","ThousandDelimiter":"","DecimalPlacesDelimiter":",","Pattern":"^\\\\d+(,\\\\d+)?$"},{"Code":"pl","ThousandDelimiter":"","DecimalPlacesDelimiter":",","Pattern":"^\\\\d+(,\\\\d+)?$"},{"Code":"pt","ThousandDelimiter":"","DecimalPlacesDelimiter":",","Pattern":"^\\\\d+(,\\\\d+)?$"},{"Code":"sk","ThousandDelimiter":"","DecimalPlacesDelimiter":",","Pattern":"^\\\\d+(,\\\\d+)?$"},{"Code":"sr","ThousandDelimiter":"","DecimalPlacesDelimiter":",","Pattern":"^\\\\d+(,\\\\d+)?$"},{"Code":"zh","ThousandDelimiter":"","DecimalPlacesDelimiter":".","Pattern":"^\\\\d+(\\\\.\\\\d+)?$"}],"AttributeTypeDefinitions":[{"AttributeTypeId":"VENDOR_NUM","AttributeTypeDescription":"Vendor Number","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"vendor.VENDOR_NUM","InboundAlias":null,"LoggingFlag":0,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":"basics.vendor clues"},{"AttributeTypeId":"InvoiceNumber","AttributeTypeDescription":"Invoice Number","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"invoicenumber","InboundAlias":null,"LoggingFlag":0,"InterpretAsMultipleValues":false,"ModelType":1,"TemplatePath":"vendor.[TEMPLATE_ID].invoicenumber"},{"AttributeTypeId":"InvoiceDate","AttributeTypeDescription":"Invoice Date","SemanticType":0,"ValueType":2,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"invoicedate.date","InboundAlias":null,"LoggingFlag":0,"InterpretAsMultipleValues":false,"ModelType":1,"TemplatePath":"vendor.[TEMPLATE_ID].invoicedate"},{"AttributeTypeId":"CostCenter","AttributeTypeDescription":"CostCenter","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":1,"DClassifyAlias":"costcenter","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"ImpersonalAccount","AttributeTypeDescription":"ImpersonalAccount","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":1,"DClassifyAlias":"impersonal-account","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"9e322012-3cc1-402d-9fd8-f64aad71fbf7","AttributeTypeDescription":"Barcode","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"3d6dd2a3-bfc6-4170-b7e5-8d347d449c35","AttributeTypeDescription":"Barcode3","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Notes","AttributeTypeDescription":"Notes","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"VENDOR_NAME","AttributeTypeDescription":"Vendor Name","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"vendor.VENDOR_NAME","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"VENDOR_CITY","AttributeTypeDescription":"Vendor City","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"vendor.VENDOR_CITY","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"VENDOR_STR","AttributeTypeDescription":"VendorStr","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"vendor.VENDOR_STR","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"VENDOR_ZIP_CODE","AttributeTypeDescription":"VendorZipCode","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"vendor.VENDOR_ZIP_CODE","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"VENDOR_VAT_REGISTRATION_ID","AttributeTypeDescription":"VendorVatID","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"vendor.VENDOR_VAT_REGISTRATION_ID","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"VENDOR_COUNTRY","AttributeTypeDescription":"Vendor Country","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"VENDOR_IBAN","AttributeTypeDescription":"VENDOR_IBAN","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"vendor.iban","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"DEBITOR_NUM","AttributeTypeDescription":"DebitorNum","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"company.COMPANY_NUM","InboundAlias":null,"LoggingFlag":0,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"NAME","AttributeTypeDescription":"DebitorName","SemanticType":1,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"company.NAME","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"CITY","AttributeTypeDescription":"DebitorCity","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"company.CITY","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"STR","AttributeTypeDescription":"DebitorStr","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"company.STR","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"COUNTRY","AttributeTypeDescription":"COUNTRY","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"company.COUNTRY","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"DEFAULT_CURRENCY","AttributeTypeDescription":"DEFAULT_CURRENCY","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"company.DEFAULT_CURRENCY","InboundAlias":null,"LoggingFlag":2,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"GrossAmount","AttributeTypeDescription":"GrossAmount","SemanticType":0,"ValueType":1,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"Betragsdaten.Bruttobetrag","InboundAlias":null,"LoggingFlag":0,"InterpretAsMultipleValues":false,"ModelType":1,"TemplatePath":"vendor.[TEMPLATE_ID].TrustedAmount"},{"AttributeTypeId":"NetAmount1","AttributeTypeDescription":"NetAmount1","SemanticType":0,"ValueType":1,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"Betragsdaten.Nettobetrag","InboundAlias":null,"LoggingFlag":0,"InterpretAsMultipleValues":false,"ModelType":1,"TemplatePath":"vendor.[TEMPLATE_ID].TrustedNet1"},{"AttributeTypeId":"VatAmount1","AttributeTypeDescription":"VatAmount1","SemanticType":0,"ValueType":1,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"Betragsdaten.Mehrwertsteuerbetrag","InboundAlias":null,"LoggingFlag":0,"InterpretAsMultipleValues":false,"ModelType":1,"TemplatePath":"vendor.[TEMPLATE_ID].TrustedVatAmount1"},{"AttributeTypeId":"VatRate1","AttributeTypeDescription":"VatRate1","SemanticType":0,"ValueType":1,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"Betragsdaten.Mehrwertsteuersatz","InboundAlias":null,"LoggingFlag":0,"InterpretAsMultipleValues":false,"ModelType":1,"TemplatePath":"vendor.[TEMPLATE_ID].TrustedVat1"},{"AttributeTypeId":"OrderNum","AttributeTypeDescription":"OrderNum","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"orders.ORDER_NUM","InboundAlias":null,"LoggingFlag":0,"InterpretAsMultipleValues":true,"ModelType":2,"TemplatePath":"basics.ordernumber"},{"AttributeTypeId":"ProjectNumber","AttributeTypeDescription":"ProjectNumber","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"ProjectNumber","InboundAlias":null,"LoggingFlag":0,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"ZIP","AttributeTypeDescription":"DebitorZip","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"company.ZIP","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"NetAmount2","AttributeTypeDescription":"NetAmount2","SemanticType":0,"ValueType":1,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"Betragsdaten.Nettobetrag2","InboundAlias":null,"LoggingFlag":0,"InterpretAsMultipleValues":false,"ModelType":1,"TemplatePath":"vendor.[TEMPLATE_ID].TrustedNet2"},{"AttributeTypeId":"VatAmount2","AttributeTypeDescription":"VatAmount2","SemanticType":0,"ValueType":1,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"Betragsdaten.Mehrwertsteuerbetrag2","InboundAlias":null,"LoggingFlag":0,"InterpretAsMultipleValues":false,"ModelType":1,"TemplatePath":"vendor.[TEMPLATE_ID].TrustedVatAmount2"},{"AttributeTypeId":"VatRate2","AttributeTypeDescription":"VatRate2","SemanticType":0,"ValueType":1,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"Betragsdaten.Mehrwertsteuersatz2","InboundAlias":null,"LoggingFlag":0,"InterpretAsMultipleValues":false,"ModelType":1,"TemplatePath":"vendor.[TEMPLATE_ID].TrustedVat2"},{"AttributeTypeId":"NetAmount3","AttributeTypeDescription":"NetAmount3","SemanticType":0,"ValueType":1,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":0,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"VatAmount3","AttributeTypeDescription":"VatAmount3","SemanticType":0,"ValueType":1,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":0,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"VatRate3","AttributeTypeDescription":"VatRate3","SemanticType":0,"ValueType":1,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":0,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"AdditionalCosts","AttributeTypeDescription":"AdditionalCosts","SemanticType":0,"ValueType":1,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"deliverycosts","InboundAlias":null,"LoggingFlag":0,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Discount","AttributeTypeDescription":"Discount","SemanticType":0,"ValueType":1,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":0,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Issuer","AttributeTypeDescription":"Issuer","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Advisor","AttributeTypeDescription":"Advisor","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Email","AttributeTypeDescription":"Email","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"TermOfPayment","AttributeTypeDescription":"TermOfPayment","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"GrossAmountCurrency","AttributeTypeDescription":"GrossAmountCurrency","SemanticType":0,"ValueType":5,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"currency","InboundAlias":null,"LoggingFlag":0,"InterpretAsMultipleValues":false,"ModelType":1,"TemplatePath":"vendor.[TEMPLATE_ID].currency"},{"AttributeTypeId":"DocumentType","AttributeTypeDescription":"DocumentType","SemanticType":0,"ValueType":5,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"documenttype","InboundAlias":null,"LoggingFlag":0,"InterpretAsMultipleValues":false,"ModelType":1,"TemplatePath":"vendor.[TEMPLATE_ID].Documenttype"},{"AttributeTypeId":"DocumentUID","AttributeTypeDescription":"DocumentUID","SemanticType":16,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"PerformanceDate","AttributeTypeDescription":"PerformanceDate","SemanticType":0,"ValueType":2,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"performancedate.date","InboundAlias":null,"LoggingFlag":0,"InterpretAsMultipleValues":false,"ModelType":1,"TemplatePath":"vendor.[TEMPLATE_ID].performancedate"},{"AttributeTypeId":"BookingDate","AttributeTypeDescription":"BookingDate","SemanticType":0,"ValueType":2,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"performancedate.date","InboundAlias":null,"LoggingFlag":0,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"VENDOR_REGISTRATION_ID","AttributeTypeDescription":"VENDOR_REGISTRATION_ID","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"vendor.VENDOR_REGISTRATION_ID","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"AutoRoutingFlag","AttributeTypeDescription":"AutoRoutingFlag","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"extended_vendor_settings.AutoRoutingFlag","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"QR-IBAN","AttributeTypeDescription":"QR-IBAN","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"QR-IBAN","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"QR-REFERENCE","AttributeTypeDescription":"QR-REFERENCE","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"QR-REFERENCE","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Custom1","AttributeTypeDescription":"Custom1","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"Custom1","InboundAlias":null,"LoggingFlag":2,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Custom2","AttributeTypeDescription":"Custom2","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"Custom2","InboundAlias":null,"LoggingFlag":2,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Custom3","AttributeTypeDescription":"Custom3","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"Custom3","InboundAlias":null,"LoggingFlag":2,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Custom4","AttributeTypeDescription":"Custom4","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"Custom4","InboundAlias":null,"LoggingFlag":2,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Custom5","AttributeTypeDescription":"Custom5","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"Custom5","InboundAlias":null,"LoggingFlag":2,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Custom6","AttributeTypeDescription":"Custom6","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"Custom6","InboundAlias":null,"LoggingFlag":2,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Custom7","AttributeTypeDescription":"Custom7","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"Custom7","InboundAlias":null,"LoggingFlag":2,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Custom8","AttributeTypeDescription":"Custom8","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"Custom8","InboundAlias":null,"LoggingFlag":2,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Custom9","AttributeTypeDescription":"Custom9","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"Custom9","InboundAlias":null,"LoggingFlag":2,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Custom10","AttributeTypeDescription":"Custom10","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"Custom10","InboundAlias":null,"LoggingFlag":2,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Custom11","AttributeTypeDescription":"Custom11","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":1,"DClassifyAlias":"Custom11","InboundAlias":null,"LoggingFlag":2,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Custom12","AttributeTypeDescription":"Custom12","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":1,"DClassifyAlias":"Custom12","InboundAlias":null,"LoggingFlag":2,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Custom13","AttributeTypeDescription":"Custom13","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":1,"DClassifyAlias":"Custom13","InboundAlias":null,"LoggingFlag":2,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Custom14","AttributeTypeDescription":"Custom14","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":1,"DClassifyAlias":"Custom14","InboundAlias":null,"LoggingFlag":2,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Custom15","AttributeTypeDescription":"Custom15","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":1,"DClassifyAlias":"Custom15","InboundAlias":null,"LoggingFlag":2,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Custom16","AttributeTypeDescription":"Custom16","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":1,"DClassifyAlias":"Custom16","InboundAlias":null,"LoggingFlag":2,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Custom17","AttributeTypeDescription":"Custom17","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":1,"DClassifyAlias":"Custom17","InboundAlias":null,"LoggingFlag":2,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Custom18","AttributeTypeDescription":"Custom18","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":1,"DClassifyAlias":"Custom18","InboundAlias":null,"LoggingFlag":2,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Custom19","AttributeTypeDescription":"Custom19","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":1,"DClassifyAlias":"Custom19","InboundAlias":null,"LoggingFlag":2,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Custom20","AttributeTypeDescription":"Custom20","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":1,"DClassifyAlias":"Custom20","InboundAlias":null,"LoggingFlag":2,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Inbound_creatorName","AttributeTypeDescription":"InboundCreatorName","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":1,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Inbound_importProcessname","AttributeTypeDescription":"InboundImportProcessname","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":1,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Inbound_importProcessId","AttributeTypeDescription":"InboundImportProcessId","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":1,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Inbound_importDateTime","AttributeTypeDescription":"InboundImportDateTime","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":1,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Inbound_documentName","AttributeTypeDescription":"InboundDocumentName","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":1,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Inbound_documentCategoryId","AttributeTypeDescription":"InboundDocumentCategoryId","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":1,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Inbound_documentCategoryName","AttributeTypeDescription":"InboundDocumentCategoryName","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":1,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"DocumentGUID","AttributeTypeDescription":"DocumentGUID","SemanticType":0,"ValueType":6,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":2,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"OriginalFileName","AttributeTypeDescription":"OriginalFileName","SemanticType":0,"ValueType":6,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"BatchCreator","AttributeTypeDescription":"BatchCreator","SemanticType":0,"ValueType":6,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"BatchEditor","AttributeTypeDescription":"BatchEditor","SemanticType":0,"ValueType":6,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"CH_QR_IBAN","AttributeTypeDescription":"CH_QR_IBAN","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"CH_QR_TYPE","AttributeTypeDescription":"CH_QR_TYPE","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"CH_QR_REFERENCE","AttributeTypeDescription":"CH_QR_REFERENCE","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"CH_QR_AMOUNT","AttributeTypeDescription":"CH_QR_AMOUNT","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"CH_QR_CURENCY","AttributeTypeDescription":"CH_QR_CURENCY","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"CH_QR_DESCR_MESSAGE","AttributeTypeDescription":"CH_QR_DESCR_MESSAGE","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"CH_QR_DESCR_INFO","AttributeTypeDescription":"CH_QR_DESCR_INFO","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"CH_QR_CODE","AttributeTypeDescription":"CH_QR_CODE","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"CH_ESR_LINE","AttributeTypeDescription":"CH_ESR_LINE","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"ESLine.ESCodezeile","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"$DocumentRole$","AttributeTypeDescription":"$DocumentRole$","SemanticType":19,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":1,"DClassifyAlias":"document-role","InboundAlias":null,"LoggingFlag":0,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Barcode","AttributeTypeDescription":"Barcode","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":null,"InboundAlias":"a347de7d-62f5-4c44-8cf0-d963ab40b8e9","LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Rechnungstyp","AttributeTypeDescription":"Rechnungstyp","SemanticType":0,"ValueType":5,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"Rechnungstyp","InboundAlias":null,"LoggingFlag":0,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"exportXML","AttributeTypeDescription":"exportXML","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null}],"AttributeTypeStructureDefinitions":[{"StructureName":"positions","Description":null,"DClassifyAlias":"Positionen","AttributeTypes":[{"AttributeTypeId":"Pos.OrderNum","AttributeTypeDescription":"Pos.OrderNum","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"ordernumber","InboundAlias":null,"LoggingFlag":0,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Pos.UPrice","AttributeTypeDescription":"Pos.UPrice","SemanticType":0,"ValueType":1,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"unitprice","InboundAlias":null,"LoggingFlag":0,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Pos.SPrice","AttributeTypeDescription":"Pos.SPrice","SemanticType":0,"ValueType":1,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"totalamount","InboundAlias":null,"LoggingFlag":0,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Pos.Quantity","AttributeTypeDescription":"Pos.Quantity","SemanticType":0,"ValueType":1,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"quantity","InboundAlias":null,"LoggingFlag":0,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Pos.OrderPos","AttributeTypeDescription":"Pos.OrderPos","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"order_item-number","InboundAlias":null,"LoggingFlag":0,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Pos.DeliveryNote","AttributeTypeDescription":"Pos.DeliveryNote","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"delivery-number","InboundAlias":null,"LoggingFlag":0,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Pos.Article","AttributeTypeDescription":"Pos.Article","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"material-number","InboundAlias":null,"LoggingFlag":0,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Pos.Description","AttributeTypeDescription":"Pos.Description","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"description","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Pos.CostCenter","AttributeTypeDescription":"Pos.CostCenter","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Pos.CostUnit","AttributeTypeDescription":"Pos.CostUnit","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Pos.GLAccount","AttributeTypeDescription":"Pos.GLAccount","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Pos.Custom1","AttributeTypeDescription":"Pos.Custom1","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"Pos.Custom1","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Pos.Custom2","AttributeTypeDescription":"Pos.Custom2","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"Pos.Custom2","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Pos.Custom3","AttributeTypeDescription":"Pos.Custom3","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"Pos.Custom3","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Pos.Custom4","AttributeTypeDescription":"Pos.Custom4","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"Pos.Custom4","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Pos.Custom5","AttributeTypeDescription":"Pos.Custom5","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"Pos.Custom5","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Pos.Custom6","AttributeTypeDescription":"Pos.Custom6","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"Pos.Custom6","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Pos.Custom7","AttributeTypeDescription":"Pos.Custom7","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"Pos.Custom7","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Pos.Custom8","AttributeTypeDescription":"Pos.Custom8","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"Pos.Custom8","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Pos.Custom9","AttributeTypeDescription":"Pos.Custom9","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"Pos.Custom9","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Pos.Custom10","AttributeTypeDescription":"Pos.Custom10","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"Pos.Custom10","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Pos.Custom11","AttributeTypeDescription":"Pos.Custom11","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"Pos.Custom11","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Pos.Custom12","AttributeTypeDescription":"Pos.Custom12","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"Pos.Custom12","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Pos.Custom13","AttributeTypeDescription":"Pos.Custom13","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"Pos.Custom13","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Pos.Custom14","AttributeTypeDescription":"Pos.Custom14","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"Pos.Custom14","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Pos.Custom15","AttributeTypeDescription":"Pos.Custom15","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"Pos.Custom15","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Pos.Custom16","AttributeTypeDescription":"Pos.Custom16","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"Pos.Custom16","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Pos.Custom17","AttributeTypeDescription":"Pos.Custom17","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"Pos.Custom17","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Pos.Custom18","AttributeTypeDescription":"Pos.Custom18","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"Pos.Custom18","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Pos.Custom19","AttributeTypeDescription":"Pos.Custom19","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"Pos.Custom19","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Pos.Custom20","AttributeTypeDescription":"Pos.Custom20","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"Pos.Custom20","InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Pos.Zone","AttributeTypeDescription":"Pos.Zone","SemanticType":0,"ValueType":3,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":2,"InterpretAsMultipleValues":false,"ModelType":1,"TemplatePath":"vendor.[TEMPLATE_ID].Positionstemplate.PosZone"},{"AttributeTypeId":"Pos.PlannedQuantity","AttributeTypeDescription":"Pos.PlannedQuantity","SemanticType":0,"ValueType":1,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":"PLANNEDQUANTITY","InboundAlias":null,"LoggingFlag":0,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Pos.PlannedUPrice","AttributeTypeDescription":"Pos.PlannedUPrice","SemanticType":0,"ValueType":1,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null},{"AttributeTypeId":"Pos.PlannedSPrice","AttributeTypeDescription":"Pos.PlannedSPrice","SemanticType":0,"ValueType":1,"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"DInfSaveOption":0,"DClassifyAlias":null,"InboundAlias":null,"LoggingFlag":1,"InterpretAsMultipleValues":false,"ModelType":0,"TemplatePath":null}]}],"AttributeGroups":[{"GroupID":0,"GroupDescription":"Client","MinifiedView":true,"AttributeDefinitions":[{"AttributeID":"DEBITOR_NUM","Description":"","LocalizedDescriptions":{},"AttributeLabel":null,"AttributeIcon":null,"AttributeType":0,"Required":true,"ReadOnly":false,"DoAlignStart":true,"DefaultValue":null,"Values":[],"ColumnSizePercent":0,"MinLength":0,"MaxLength":0,"SizeDesktop":3,"SizeTablet":3,"SizePhone":4,"Minified":{"SizeDesktop":3,"SizeTablet":3,"SizePhone":4},"Position":{"verticalPosition":0,"horizontalPosition":0},"TabStop":1,"ValueConversion":null,"Title":null,"Pattern":null,"QueryAttributes":[{"AttributeID":"DEBITOR_NUM","AttributeValue":null,"AttributeQueryPrefix":"%","AttributeQuerySuffix":"%","Prefix":false,"MultipleParameter":false}],"JSSnippets":[],"DataBaseDefinition":{"QueryDefinition":"SELECT\\n  COMPANY_NUM,\\n  NAME,\\n  STR,\\n  ZIP,\\n  CITY,\\n  COUNTRY,\\n  DEFAULT_CURRENCY\\nFROM\\n  dbo.CC_COMPANIES\\nWHERE\\n  COMPANY_NUM LIKE @DEBITOR_NUM","QueryMappings":[{"ColumnName":"COMPANY_NUM","AttributeID":"DEBITOR_NUM"},{"ColumnName":"NAME","AttributeID":"NAME"},{"ColumnName":"STR","AttributeID":"STR"},{"ColumnName":"ZIP","AttributeID":"ZIP"},{"ColumnName":"CITY","AttributeID":"CITY"},{"ColumnName":"COUNTRY","AttributeID":"COUNTRY"},{"ColumnName":"DEFAULT_CURRENCY","AttributeID":"DEFAULT_CURRENCY"}],"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":false},{"AttributeID":"NAME","Description":null,"LocalizedDescriptions":{},"AttributeLabel":null,"AttributeIcon":null,"AttributeType":0,"Required":false,"ReadOnly":false,"DoAlignStart":true,"DefaultValue":null,"Values":[],"ColumnSizePercent":0,"MinLength":0,"MaxLength":0,"SizeDesktop":9,"SizeTablet":5,"SizePhone":4,"Minified":{"SizeDesktop":9,"SizeTablet":5,"SizePhone":4},"Position":{"verticalPosition":0,"horizontalPosition":1},"TabStop":2,"ValueConversion":null,"Title":null,"Pattern":null,"QueryAttributes":[{"AttributeID":"NAME","AttributeValue":null,"AttributeQueryPrefix":"%","AttributeQuerySuffix":"%","Prefix":false,"MultipleParameter":false}],"JSSnippets":[],"DataBaseDefinition":{"QueryDefinition":"SELECT\\n  COMPANY_NUM,\\n  NAME,\\n  STR,\\n  ZIP,\\n  CITY,\\n  COUNTRY,\\n  DEFAULT_CURRENCY\\nFROM\\n  dbo.CC_COMPANIES\\nWHERE\\n  NAME LIKE @NAME","QueryMappings":[{"ColumnName":"COMPANY_NUM","AttributeID":"DEBITOR_NUM"},{"ColumnName":"NAME","AttributeID":"NAME"},{"ColumnName":"STR","AttributeID":"STR"},{"ColumnName":"ZIP","AttributeID":"ZIP"},{"ColumnName":"CITY","AttributeID":"CITY"},{"ColumnName":"COUNTRY","AttributeID":"COUNTRY"},{"ColumnName":"DEFAULT_CURRENCY","AttributeID":"DEFAULT_CURRENCY"}],"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":false},{"AttributeID":"STR","Description":null,"LocalizedDescriptions":{},"AttributeLabel":null,"AttributeIcon":null,"AttributeType":0,"Required":false,"ReadOnly":true,"DoAlignStart":true,"DefaultValue":null,"Values":[],"ColumnSizePercent":0,"MinLength":0,"MaxLength":0,"SizeDesktop":4,"SizeTablet":3,"SizePhone":4,"Minified":null,"Position":{"verticalPosition":1,"horizontalPosition":0},"TabStop":3,"ValueConversion":null,"Title":null,"Pattern":null,"QueryAttributes":[{"AttributeID":"STR","AttributeValue":null,"AttributeQueryPrefix":"%","AttributeQuerySuffix":"%","Prefix":false,"MultipleParameter":false}],"JSSnippets":[],"DataBaseDefinition":{"QueryDefinition":"SELECT\\n  COMPANY_NUM,\\n  NAME,\\n  STR,\\n  ZIP,\\n  CITY,\\n  COUNTRY,\\n  DEFAULT_CURRENCY\\nFROM\\n  dbo.CC_COMPANIES\\nWHERE\\n  STR LIKE @STR","QueryMappings":[{"ColumnName":"COMPANY_NUM","AttributeID":"DEBITOR_NUM"},{"ColumnName":"NAME","AttributeID":"NAME"},{"ColumnName":"STR","AttributeID":"STR"},{"ColumnName":"ZIP","AttributeID":"ZIP"},{"ColumnName":"CITY","AttributeID":"CITY"},{"ColumnName":"COUNTRY","AttributeID":"COUNTRY"},{"ColumnName":"DEFAULT_CURRENCY","AttributeID":"DEFAULT_CURRENCY"}],"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":false},{"AttributeID":"ZIP","Description":null,"LocalizedDescriptions":{},"AttributeLabel":null,"AttributeIcon":null,"AttributeType":0,"Required":false,"ReadOnly":true,"DoAlignStart":true,"DefaultValue":null,"Values":[],"ColumnSizePercent":0,"MinLength":0,"MaxLength":0,"SizeDesktop":4,"SizeTablet":2,"SizePhone":4,"Minified":null,"Position":{"verticalPosition":1,"horizontalPosition":1},"TabStop":4,"ValueConversion":null,"Title":null,"Pattern":null,"QueryAttributes":null,"JSSnippets":[],"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":false},{"AttributeID":"CITY","Description":null,"LocalizedDescriptions":{},"AttributeLabel":null,"AttributeIcon":null,"AttributeType":0,"Required":false,"ReadOnly":true,"DoAlignStart":true,"DefaultValue":null,"Values":[],"ColumnSizePercent":0,"MinLength":0,"MaxLength":0,"SizeDesktop":4,"SizeTablet":3,"SizePhone":4,"Minified":null,"Position":{"verticalPosition":1,"horizontalPosition":2},"TabStop":5,"ValueConversion":null,"Title":null,"Pattern":null,"QueryAttributes":[{"AttributeID":"CITY","AttributeValue":null,"AttributeQueryPrefix":"%","AttributeQuerySuffix":"%","Prefix":false,"MultipleParameter":false}],"JSSnippets":[],"DataBaseDefinition":{"QueryDefinition":"SELECT\\n  COMPANY_NUM,\\n  NAME,\\n  STR,\\n  ZIP,\\n  CITY,\\n  COUNTRY,\\n  DEFAULT_CURRENCY\\nFROM\\n  dbo.CC_COMPANIES\\nWHERE\\n  CITY LIKE @CITY","QueryMappings":[{"ColumnName":"COMPANY_NUM","AttributeID":"DEBITOR_NUM"},{"ColumnName":"NAME","AttributeID":"NAME"},{"ColumnName":"STR","AttributeID":"STR"},{"ColumnName":"ZIP","AttributeID":"ZIP"},{"ColumnName":"CITY","AttributeID":"CITY"},{"ColumnName":"COUNTRY","AttributeID":"COUNTRY"},{"ColumnName":"DEFAULT_CURRENCY","AttributeID":"DEFAULT_CURRENCY"}],"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":false}],"AttributeStructureDefinitions":[]},{"GroupID":1,"GroupDescription":"Sender","MinifiedView":true,"AttributeDefinitions":[{"AttributeID":"VENDOR_NUM","Description":null,"LocalizedDescriptions":{},"AttributeLabel":null,"AttributeIcon":null,"AttributeType":0,"Required":true,"ReadOnly":false,"DoAlignStart":true,"DefaultValue":null,"Values":[],"ColumnSizePercent":0,"MinLength":0,"MaxLength":0,"SizeDesktop":3,"SizeTablet":3,"SizePhone":4,"Minified":{"SizeDesktop":3,"SizeTablet":3,"SizePhone":4},"Position":{"verticalPosition":0,"horizontalPosition":0},"TabStop":6,"ValueConversion":null,"Title":null,"Pattern":null,"QueryAttributes":[{"AttributeID":"VENDOR_NUM","AttributeValue":null,"AttributeQueryPrefix":"%","AttributeQuerySuffix":"%","Prefix":false,"MultipleParameter":false},{"AttributeID":"DEBITOR_NUM","AttributeValue":null,"AttributeQueryPrefix":"","AttributeQuerySuffix":"","Prefix":false,"MultipleParameter":false}],"JSSnippets":[],"DataBaseDefinition":{"QueryDefinition":"SELECT\\n  ven.*,\\n  venb.*\\nFROM\\n  dbo.CC_VENDORS AS ven\\n  LEFT JOIN dbo.CC_VENDOR_BANK AS venb ON ven.VENDOR_NUM = venb.VENDOR_NUM\\n  AND ven.COMPANY_NUM = venb.COMPANY_NUM\\nWHERE\\n  ven.COMPANY_NUM = @DEBITOR_NUM\\n  AND ven.VENDOR_NUM LIKE @VENDOR_NUM","QueryMappings":[{"ColumnName":"VENDOR_NUM","AttributeID":"VENDOR_NUM"},{"ColumnName":"VENDOR_NAME","AttributeID":"VENDOR_NAME"},{"ColumnName":"VENDOR_STR","AttributeID":"VENDOR_STR"},{"ColumnName":"VENDOR_CITY","AttributeID":"VENDOR_CITY"},{"ColumnName":"VENDOR_ZIP_CODE","AttributeID":"VENDOR_ZIP_CODE"},{"ColumnName":"VENDOR_COUNTRY","AttributeID":"VENDOR_COUNTRY"},{"ColumnName":"VENDOR_EMAIL","AttributeID":"VENDOR_EMAIL"},{"ColumnName":"VENDOR_VAT_REGISTRATION_ID","AttributeID":"VENDOR_VAT_REGISTRATION_ID"},{"ColumnName":"VENDOR_REGISTRATION_ID","AttributeID":"VENDOR_REGISTRATION_ID"},{"ColumnName":"IBAN","AttributeID":"VENDOR_IBAN"}],"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":false},{"AttributeID":"VENDOR_NAME","Description":null,"LocalizedDescriptions":{},"AttributeLabel":null,"AttributeIcon":null,"AttributeType":0,"Required":true,"ReadOnly":false,"DoAlignStart":true,"DefaultValue":null,"Values":[],"ColumnSizePercent":0,"MinLength":0,"MaxLength":0,"SizeDesktop":9,"SizeTablet":5,"SizePhone":4,"Minified":{"SizeDesktop":9,"SizeTablet":5,"SizePhone":4},"Position":{"verticalPosition":0,"horizontalPosition":1},"TabStop":7,"ValueConversion":null,"Title":null,"Pattern":null,"QueryAttributes":[{"AttributeID":"VENDOR_NAME","AttributeValue":null,"AttributeQueryPrefix":"%","AttributeQuerySuffix":"%","Prefix":false,"MultipleParameter":false},{"AttributeID":"DEBITOR_NUM","AttributeValue":null,"AttributeQueryPrefix":"","AttributeQuerySuffix":"","Prefix":false,"MultipleParameter":false}],"JSSnippets":[],"DataBaseDefinition":{"QueryDefinition":"SELECT\\n  ven.*,\\n  venb.*\\nFROM\\n  dbo.CC_VENDORS AS ven\\n  LEFT JOIN dbo.CC_VENDOR_BANK AS venb ON ven.VENDOR_NUM = venb.VENDOR_NUM\\n  AND ven.COMPANY_NUM = venb.COMPANY_NUM\\nWHERE\\n  ven.COMPANY_NUM = @DEBITOR_NUM\\n  AND ven.VENDOR_NAME LIKE @VENDOR_NAME","QueryMappings":[{"ColumnName":"VENDOR_NUM","AttributeID":"VENDOR_NUM"},{"ColumnName":"VENDOR_NAME","AttributeID":"VENDOR_NAME"},{"ColumnName":"VENDOR_STR","AttributeID":"VENDOR_STR"},{"ColumnName":"VENDOR_CITY","AttributeID":"VENDOR_CITY"},{"ColumnName":"VENDOR_ZIP_CODE","AttributeID":"VENDOR_ZIP_CODE"},{"ColumnName":"VENDOR_COUNTRY","AttributeID":"VENDOR_COUNTRY"},{"ColumnName":"VENDOR_EMAIL","AttributeID":"VENDOR_EMAIL"},{"ColumnName":"VENDOR_VAT_REGISTRATION_ID","AttributeID":"VENDOR_VAT_REGISTRATION_ID"},{"ColumnName":"VENDOR_REGISTRATION_ID","AttributeID":"VENDOR_REGISTRATION_ID"},{"ColumnName":"IBAN","AttributeID":"VENDOR_IBAN"}],"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":false},{"AttributeID":"VENDOR_STR","Description":null,"LocalizedDescriptions":{},"AttributeLabel":null,"AttributeIcon":null,"AttributeType":0,"Required":false,"ReadOnly":true,"DoAlignStart":true,"DefaultValue":null,"Values":[],"ColumnSizePercent":0,"MinLength":0,"MaxLength":0,"SizeDesktop":4,"SizeTablet":3,"SizePhone":4,"Minified":null,"Position":{"verticalPosition":1,"horizontalPosition":0},"TabStop":8,"ValueConversion":null,"Title":null,"Pattern":null,"QueryAttributes":[{"AttributeID":"VENDOR_STR","AttributeValue":null,"AttributeQueryPrefix":"%","AttributeQuerySuffix":"%","Prefix":false,"MultipleParameter":false},{"AttributeID":"DEBITOR_NUM","AttributeValue":null,"AttributeQueryPrefix":"","AttributeQuerySuffix":"","Prefix":false,"MultipleParameter":false}],"JSSnippets":[],"DataBaseDefinition":{"QueryDefinition":"SELECT\\n  ven.*,\\n  venb.*\\nFROM\\n  dbo.CC_VENDORS AS ven\\n  LEFT JOIN dbo.CC_VENDOR_BANK AS venb ON ven.VENDOR_NUM = venb.VENDOR_NUM\\n  AND ven.COMPANY_NUM = venb.COMPANY_NUM\\nWHERE\\n  ven.COMPANY_NUM = @DEBITOR_NUM\\n  AND ven.VENDOR_STR LIKE @VENDOR_STR","QueryMappings":[{"ColumnName":"VENDOR_NUM","AttributeID":"VENDOR_NUM"},{"ColumnName":"VENDOR_NAME","AttributeID":"VENDOR_NAME"},{"ColumnName":"VENDOR_STR","AttributeID":"VENDOR_STR"},{"ColumnName":"VENDOR_CITY","AttributeID":"VENDOR_CITY"},{"ColumnName":"VENDOR_ZIP_CODE","AttributeID":"VENDOR_ZIP_CODE"},{"ColumnName":"VENDOR_COUNTRY","AttributeID":"VENDOR_COUNTRY"},{"ColumnName":"VENDOR_EMAIL","AttributeID":"VENDOR_EMAIL"},{"ColumnName":"VENDOR_VAT_REGISTRATION_ID","AttributeID":"VENDOR_VAT_REGISTRATION_ID"},{"ColumnName":"VENDOR_REGISTRATION_ID","AttributeID":"VENDOR_REGISTRATION_ID"},{"ColumnName":"IBAN","AttributeID":"VENDOR_IBAN"}],"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":false},{"AttributeID":"VENDOR_ZIP_CODE","Description":null,"LocalizedDescriptions":{},"AttributeLabel":null,"AttributeIcon":null,"AttributeType":0,"Required":false,"ReadOnly":true,"DoAlignStart":true,"DefaultValue":null,"Values":[],"ColumnSizePercent":0,"MinLength":0,"MaxLength":0,"SizeDesktop":4,"SizeTablet":2,"SizePhone":4,"Minified":null,"Position":{"verticalPosition":1,"horizontalPosition":1},"TabStop":9,"ValueConversion":null,"Title":null,"Pattern":null,"QueryAttributes":[{"AttributeID":"VENDOR_ZIP_CODE","AttributeValue":null,"AttributeQueryPrefix":"%","AttributeQuerySuffix":"%","Prefix":false,"MultipleParameter":false},{"AttributeID":"DEBITOR_NUM","AttributeValue":null,"AttributeQueryPrefix":"","AttributeQuerySuffix":"","Prefix":false,"MultipleParameter":false}],"JSSnippets":[],"DataBaseDefinition":{"QueryDefinition":"SELECT\\n  ven.*,\\n  venb.*\\nFROM\\n  dbo.CC_VENDORS AS ven\\n  LEFT JOIN dbo.CC_VENDOR_BANK AS venb ON ven.VENDOR_NUM = venb.VENDOR_NUM\\n  AND ven.COMPANY_NUM = venb.COMPANY_NUM\\nWHERE\\n  ven.COMPANY_NUM = @DEBITOR_NUM\\n  AND ven.VENDOR_ZIP_CODE LIKE @VENDOR_ZIP_CODE","QueryMappings":[{"ColumnName":"VENDOR_NUM","AttributeID":"VENDOR_NUM"},{"ColumnName":"VENDOR_NAME","AttributeID":"VENDOR_NAME"},{"ColumnName":"VENDOR_STR","AttributeID":"VENDOR_STR"},{"ColumnName":"VENDOR_CITY","AttributeID":"VENDOR_CITY"},{"ColumnName":"VENDOR_ZIP_CODE","AttributeID":"VENDOR_ZIP_CODE"},{"ColumnName":"VENDOR_COUNTRY","AttributeID":"VENDOR_COUNTRY"},{"ColumnName":"VENDOR_EMAIL","AttributeID":"VENDOR_EMAIL"},{"ColumnName":"VENDOR_VAT_REGISTRATION_ID","AttributeID":"VENDOR_VAT_REGISTRATION_ID"},{"ColumnName":"VENDOR_REGISTRATION_ID","AttributeID":"VENDOR_REGISTRATION_ID"},{"ColumnName":"IBAN","AttributeID":"VENDOR_IBAN"}],"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":false},{"AttributeID":"VENDOR_CITY","Description":null,"LocalizedDescriptions":{},"AttributeLabel":null,"AttributeIcon":null,"AttributeType":0,"Required":false,"ReadOnly":true,"DoAlignStart":true,"DefaultValue":null,"Values":[],"ColumnSizePercent":0,"MinLength":0,"MaxLength":0,"SizeDesktop":4,"SizeTablet":3,"SizePhone":4,"Minified":null,"Position":{"verticalPosition":1,"horizontalPosition":2},"TabStop":10,"ValueConversion":null,"Title":null,"Pattern":null,"QueryAttributes":[{"AttributeID":"VENDOR_CITY","AttributeValue":null,"AttributeQueryPrefix":"%","AttributeQuerySuffix":"%","Prefix":false,"MultipleParameter":false},{"AttributeID":"DEBITOR_NUM","AttributeValue":null,"AttributeQueryPrefix":"","AttributeQuerySuffix":"","Prefix":false,"MultipleParameter":false}],"JSSnippets":[],"DataBaseDefinition":{"QueryDefinition":"SELECT\\n  ven.*,\\n  venb.*\\nFROM\\n  dbo.CC_VENDORS AS ven\\n  LEFT JOIN dbo.CC_VENDOR_BANK AS venb ON ven.VENDOR_NUM = venb.VENDOR_NUM\\n  AND ven.COMPANY_NUM = venb.COMPANY_NUM\\nWHERE\\n  ven.COMPANY_NUM = @DEBITOR_NUM\\n  AND ven.VENDOR_CITY LIKE @VENDOR_CITY","QueryMappings":[{"ColumnName":"VENDOR_NUM","AttributeID":"VENDOR_NUM"},{"ColumnName":"VENDOR_NAME","AttributeID":"VENDOR_NAME"},{"ColumnName":"VENDOR_STR","AttributeID":"VENDOR_STR"},{"ColumnName":"VENDOR_CITY","AttributeID":"VENDOR_CITY"},{"ColumnName":"VENDOR_ZIP_CODE","AttributeID":"VENDOR_ZIP_CODE"},{"ColumnName":"VENDOR_COUNTRY","AttributeID":"VENDOR_COUNTRY"},{"ColumnName":"VENDOR_EMAIL","AttributeID":"VENDOR_EMAIL"},{"ColumnName":"VENDOR_VAT_REGISTRATION_ID","AttributeID":"VENDOR_VAT_REGISTRATION_ID"},{"ColumnName":"VENDOR_REGISTRATION_ID","AttributeID":"VENDOR_REGISTRATION_ID"},{"ColumnName":"IBAN","AttributeID":"VENDOR_IBAN"}],"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":false},{"AttributeID":"VENDOR_VAT_REGISTRATION_ID","Description":null,"LocalizedDescriptions":{},"AttributeLabel":null,"AttributeIcon":null,"AttributeType":0,"Required":false,"ReadOnly":false,"DoAlignStart":true,"DefaultValue":null,"Values":[],"ColumnSizePercent":0,"MinLength":0,"MaxLength":0,"SizeDesktop":3,"SizeTablet":2,"SizePhone":4,"Minified":null,"Position":{"verticalPosition":2,"horizontalPosition":0},"TabStop":11,"ValueConversion":null,"Title":null,"Pattern":null,"QueryAttributes":[{"AttributeID":"VENDOR_VAT_REGISTRATION_ID","AttributeValue":null,"AttributeQueryPrefix":"%","AttributeQuerySuffix":"%","Prefix":false,"MultipleParameter":false},{"AttributeID":"DEBITOR_NUM","AttributeValue":null,"AttributeQueryPrefix":"","AttributeQuerySuffix":"","Prefix":false,"MultipleParameter":false}],"JSSnippets":[],"DataBaseDefinition":{"QueryDefinition":"SELECT\\n  ven.*,\\n  venb.*\\nFROM\\n  dbo.CC_VENDORS AS ven\\n  LEFT JOIN dbo.CC_VENDOR_BANK AS venb ON ven.VENDOR_NUM = venb.VENDOR_NUM\\n  AND ven.COMPANY_NUM = venb.COMPANY_NUM\\nWHERE\\n  ven.COMPANY_NUM = @DEBITOR_NUM\\n  AND ven.VENDOR_VAT_REGISTRATION_ID LIKE @VENDOR_VAT_REGISTRATION_ID","QueryMappings":[{"ColumnName":"VENDOR_NUM","AttributeID":"VENDOR_NUM"},{"ColumnName":"VENDOR_NAME","AttributeID":"VENDOR_NAME"},{"ColumnName":"VENDOR_STR","AttributeID":"VENDOR_STR"},{"ColumnName":"VENDOR_CITY","AttributeID":"VENDOR_CITY"},{"ColumnName":"VENDOR_ZIP_CODE","AttributeID":"VENDOR_ZIP_CODE"},{"ColumnName":"VENDOR_COUNTRY","AttributeID":"VENDOR_COUNTRY"},{"ColumnName":"VENDOR_EMAIL","AttributeID":"VENDOR_EMAIL"},{"ColumnName":"VENDOR_VAT_REGISTRATION_ID","AttributeID":"VENDOR_VAT_REGISTRATION_ID"},{"ColumnName":"VENDOR_REGISTRATION_ID","AttributeID":"VENDOR_REGISTRATION_ID"},{"ColumnName":"IBAN","AttributeID":"VENDOR_IBAN"}],"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":false},{"AttributeID":"VENDOR_REGISTRATION_ID","Description":null,"LocalizedDescriptions":{},"AttributeLabel":null,"AttributeIcon":null,"AttributeType":0,"Required":false,"ReadOnly":false,"DoAlignStart":true,"DefaultValue":null,"Values":[],"ColumnSizePercent":0,"MinLength":0,"MaxLength":0,"SizeDesktop":3,"SizeTablet":2,"SizePhone":4,"Minified":null,"Position":{"verticalPosition":2,"horizontalPosition":1},"TabStop":12,"ValueConversion":null,"Title":null,"Pattern":null,"QueryAttributes":[{"AttributeID":"VENDOR_REGISTRATION_ID","AttributeValue":null,"AttributeQueryPrefix":"%","AttributeQuerySuffix":"%","Prefix":false,"MultipleParameter":false},{"AttributeID":"DEBITOR_NUM","AttributeValue":null,"AttributeQueryPrefix":"","AttributeQuerySuffix":"","Prefix":false,"MultipleParameter":false}],"JSSnippets":[],"DataBaseDefinition":{"QueryDefinition":"SELECT\\n  ven.*,\\n  venb.*\\nFROM\\n  dbo.CC_VENDORS AS ven\\n  LEFT JOIN dbo.CC_VENDOR_BANK AS venb ON ven.VENDOR_NUM = venb.VENDOR_NUM\\n  AND ven.COMPANY_NUM = venb.COMPANY_NUM\\nWHERE\\n  ven.COMPANY_NUM = @DEBITOR_NUM\\n  AND ven.VENDOR_REGISTRATION_ID LIKE @VENDOR_REGISTRATION_ID","QueryMappings":[{"ColumnName":"VENDOR_NUM","AttributeID":"VENDOR_NUM"},{"ColumnName":"VENDOR_NAME","AttributeID":"VENDOR_NAME"},{"ColumnName":"VENDOR_STR","AttributeID":"VENDOR_STR"},{"ColumnName":"VENDOR_CITY","AttributeID":"VENDOR_CITY"},{"ColumnName":"VENDOR_ZIP_CODE","AttributeID":"VENDOR_ZIP_CODE"},{"ColumnName":"VENDOR_COUNTRY","AttributeID":"VENDOR_COUNTRY"},{"ColumnName":"VENDOR_EMAIL","AttributeID":"VENDOR_EMAIL"},{"ColumnName":"VENDOR_VAT_REGISTRATION_ID","AttributeID":"VENDOR_VAT_REGISTRATION_ID"},{"ColumnName":"VENDOR_REGISTRATION_ID","AttributeID":"VENDOR_REGISTRATION_ID"},{"ColumnName":"IBAN","AttributeID":"VENDOR_IBAN"}],"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":false},{"AttributeID":"VENDOR_IBAN","Description":null,"LocalizedDescriptions":{},"AttributeLabel":null,"AttributeIcon":null,"AttributeType":0,"Required":false,"ReadOnly":false,"DoAlignStart":true,"DefaultValue":null,"Values":[],"ColumnSizePercent":0,"MinLength":0,"MaxLength":0,"SizeDesktop":6,"SizeTablet":4,"SizePhone":4,"Minified":null,"Position":{"verticalPosition":2,"horizontalPosition":2},"TabStop":13,"ValueConversion":null,"Title":null,"Pattern":null,"QueryAttributes":[{"AttributeID":"VENDOR_IBAN","AttributeValue":null,"AttributeQueryPrefix":"%","AttributeQuerySuffix":"%","Prefix":false,"MultipleParameter":false},{"AttributeID":"DEBITOR_NUM","AttributeValue":null,"AttributeQueryPrefix":"","AttributeQuerySuffix":"","Prefix":false,"MultipleParameter":false}],"JSSnippets":[],"DataBaseDefinition":{"QueryDefinition":"SELECT\\n  ven.*,\\n  venb.*\\nFROM\\n  dbo.CC_VENDORS AS ven\\n  LEFT JOIN dbo.CC_VENDOR_BANK AS venb ON ven.VENDOR_NUM = venb.VENDOR_NUM\\n  AND ven.COMPANY_NUM = venb.COMPANY_NUM\\nWHERE\\n  ven.COMPANY_NUM = @DEBITOR_NUM\\n  AND venb.IBAN LIKE @VENDOR_IBAN","QueryMappings":[{"ColumnName":"VENDOR_NUM","AttributeID":"VENDOR_NUM"},{"ColumnName":"VENDOR_NAME","AttributeID":"VENDOR_NAME"},{"ColumnName":"VENDOR_STR","AttributeID":"VENDOR_STR"},{"ColumnName":"VENDOR_CITY","AttributeID":"VENDOR_CITY"},{"ColumnName":"VENDOR_ZIP_CODE","AttributeID":"VENDOR_ZIP_CODE"},{"ColumnName":"VENDOR_COUNTRY","AttributeID":"VENDOR_COUNTRY"},{"ColumnName":"VENDOR_EMAIL","AttributeID":"VENDOR_EMAIL"},{"ColumnName":"VENDOR_VAT_REGISTRATION_ID","AttributeID":"VENDOR_VAT_REGISTRATION_ID"},{"ColumnName":"VENDOR_REGISTRATION_ID","AttributeID":"VENDOR_REGISTRATION_ID"},{"ColumnName":"IBAN","AttributeID":"VENDOR_IBAN"}],"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":false}],"AttributeStructureDefinitions":[]},{"GroupID":2,"GroupDescription":"InvoiceData","MinifiedView":false,"AttributeDefinitions":[{"AttributeID":"DocumentType","Description":null,"LocalizedDescriptions":{},"AttributeLabel":null,"AttributeIcon":null,"AttributeType":0,"Required":false,"ReadOnly":false,"DoAlignStart":true,"DefaultValue":"Invoice","Values":["Invoice","CreditAdvice","CorrectionOfInvoice"],"ColumnSizePercent":0,"MinLength":0,"MaxLength":0,"SizeDesktop":3,"SizeTablet":1,"SizePhone":4,"Minified":null,"Position":{"verticalPosition":0,"horizontalPosition":0},"TabStop":14,"ValueConversion":null,"Title":null,"Pattern":null,"QueryAttributes":null,"JSSnippets":[],"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":false},{"AttributeID":"InvoiceDate","Description":null,"LocalizedDescriptions":{},"AttributeLabel":null,"AttributeIcon":null,"AttributeType":0,"Required":true,"ReadOnly":false,"DoAlignStart":true,"DefaultValue":null,"Values":[],"ColumnSizePercent":0,"MinLength":0,"MaxLength":0,"SizeDesktop":3,"SizeTablet":2,"SizePhone":4,"Minified":null,"Position":{"verticalPosition":0,"horizontalPosition":1},"TabStop":16,"ValueConversion":"ConvertInputDate","Title":"dd.mm.YYYY","Pattern":"^(0?[1-9]|[12][0-9]|3[01])[.](0?[1-9]|1[012])[.](\\\\d{4})$","QueryAttributes":null,"JSSnippets":[{"OnMethod":"input","Code":" clearTimeout(typingInvoiceDateTimer); var element = $(this);  if (element.val()) { typingInvoiceDateTimer = setTimeout( function() { element.val(ConvertInputDate(element.val())); TriggerFieldValidation(element.attr(\'id\')); }, doneTypingInterval); }\\n "}],"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":false},{"AttributeID":"InvoiceNumber","Description":null,"LocalizedDescriptions":{},"AttributeLabel":null,"AttributeIcon":null,"AttributeType":0,"Required":true,"ReadOnly":false,"DoAlignStart":true,"DefaultValue":null,"Values":[],"ColumnSizePercent":0,"MinLength":0,"MaxLength":0,"SizeDesktop":3,"SizeTablet":1,"SizePhone":4,"Minified":null,"Position":{"verticalPosition":0,"horizontalPosition":2},"TabStop":15,"ValueConversion":null,"Title":null,"Pattern":null,"QueryAttributes":null,"JSSnippets":[],"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":false},{"AttributeID":"OrderNum","Description":null,"LocalizedDescriptions":{},"AttributeLabel":null,"AttributeIcon":null,"AttributeType":0,"Required":false,"ReadOnly":false,"DoAlignStart":true,"DefaultValue":null,"Values":[],"ColumnSizePercent":0,"MinLength":0,"MaxLength":0,"SizeDesktop":3,"SizeTablet":4,"SizePhone":4,"Minified":null,"Position":{"verticalPosition":0,"horizontalPosition":3},"TabStop":26,"ValueConversion":null,"Title":null,"Pattern":null,"QueryAttributes":[{"AttributeID":"OrderNum","AttributeValue":null,"AttributeQueryPrefix":"%","AttributeQuerySuffix":"%","Prefix":false,"MultipleParameter":true},{"AttributeID":"DEBITOR_NUM","AttributeValue":null,"AttributeQueryPrefix":"","AttributeQuerySuffix":"","Prefix":false,"MultipleParameter":false},{"AttributeID":"VENDOR_NUM","AttributeValue":null,"AttributeQueryPrefix":"","AttributeQuerySuffix":"","Prefix":false,"MultipleParameter":false}],"JSSnippets":[{"OnMethod":"change","Code":"let orderNum = GetAttribute(\'OrderNum\');\\r\\nlet i = 0;\\r\\n\\r\\nasync function processNextPosition() {\\r\\n    let value = GetPositionAttribute(\'Pos.OrderNum\', i, \'positions\');\\r\\n    console.log(value);\\r\\n    if (value !== null) {\\r\\n        SetPositionAttribute(\'Pos.OrderNum\', orderNum, i, \'positions\');\\r\\n        TriggerPositionAttributeQuery(\'Pos.OrderNum\', \'positions\', i);\\r\\n        i++;\\r\\n        setTimeout(processNextPosition, 1000);\\r\\n    } else {\\r\\n        console.log(\'Finished processing positions\');\\r\\n    }\\r\\n}\\r\\n\\r\\nif (orderNum != \'\') {\\r\\n    processNextPosition();\\r\\n}\\r\\n\\r\\n\\r\\n\\r\\n\\r\\n\\r\\n"}],"DataBaseDefinition":{"QueryDefinition":"SELECT\\n  COMPANY_NUM,\\n  VENDOR_NUM,\\n  ORDER_NUM\\nFROM\\n  dbo.CC_ORDERS\\nWHERE\\n  COMPANY_NUM = @DEBITOR_NUM\\n  AND VENDOR_NUM = @VENDOR_NUM\\n  AND (ORDER_NUM LIKE @OrderNum)","QueryMappings":[{"ColumnName":"VENDOR_NUM","AttributeID":"VENDOR_NUM"},{"ColumnName":"COMPANY_NUM","AttributeID":"DEBITOR_NUM"},{"ColumnName":"ORDER_NUM","AttributeID":"OrderNum"}],"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":false},{"AttributeID":"Barcode","Description":null,"LocalizedDescriptions":{},"AttributeLabel":null,"AttributeIcon":null,"AttributeType":0,"Required":false,"ReadOnly":false,"DoAlignStart":true,"DefaultValue":null,"Values":[],"ColumnSizePercent":0,"MinLength":0,"MaxLength":0,"SizeDesktop":3,"SizeTablet":4,"SizePhone":4,"Minified":null,"Position":{"verticalPosition":1,"horizontalPosition":0},"TabStop":-1,"ValueConversion":null,"Title":null,"Pattern":null,"QueryAttributes":[],"JSSnippets":[{"OnMethod":"change","Code":"function generateGUID() {\\r\\n    return \'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx\'.replace(/[xy]/g, function (c) {\\r\\n        var r = Math.random() * 16 | 0,\\r\\n            v = c === \'x\' ? r : (r & 0x3 | 0x8);\\r\\n        return v.toString(16);\\r\\n    });\\r\\n}\\r\\n\\r\\nvar barcodeValue = GetAttribute(\'Barcode\');\\r\\nif (barcodeValue == \'\') {\\r\\n    barcodeValue = generateGUID();\\r\\n}\\r\\n\\r\\nSetAttribute(\'Barcode\', barcodeValue);\\r\\n"}],"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":true},{"AttributeID":"Rechnungstyp","Description":null,"LocalizedDescriptions":{},"AttributeLabel":null,"AttributeIcon":null,"AttributeType":0,"Required":false,"ReadOnly":false,"DoAlignStart":true,"DefaultValue":"Warenrechnung","Values":["Warenrechnung","Kostenrechnung"],"ColumnSizePercent":0,"MinLength":0,"MaxLength":0,"SizeDesktop":3,"SizeTablet":2,"SizePhone":4,"Minified":null,"Position":{"verticalPosition":1,"horizontalPosition":1},"TabStop":-1,"ValueConversion":null,"Title":null,"Pattern":null,"QueryAttributes":[],"JSSnippets":[],"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":true},{"AttributeID":"NetAmount1","Description":null,"LocalizedDescriptions":{},"AttributeLabel":null,"AttributeIcon":null,"AttributeType":0,"Required":true,"ReadOnly":false,"DoAlignStart":false,"DefaultValue":"0.00","Values":[],"ColumnSizePercent":0,"MinLength":0,"MaxLength":0,"SizeDesktop":6,"SizeTablet":4,"SizePhone":4,"Minified":null,"Position":{"verticalPosition":2,"horizontalPosition":0},"TabStop":17,"ValueConversion":"ConvertInputFloatWithCustomDelimiter","Title":null,"Pattern":null,"QueryAttributes":null,"JSSnippets":[{"OnMethod":"input","Code":" ConvertInputFloatWithCustomDelimiterOnInput(this);\\n var netAmount1 = Number(GetAttribute(\\"NetAmount1\\"));\\n var vatRate1 = Number(GetAttribute(\\"VatRate1\\"))/100;\\n var vatAmount1 = netAmount1 * vatRate1;\\n SetAttribute(\\"VatAmount1\\", vatAmount1.toFixed(2));\\n\\n var netAmount2 = Number(GetAttribute(\\"NetAmount2\\"));\\n var vatRate2 = Number(GetAttribute(\\"VatRate2\\"))/100;\\n var grossAmount = netAmount1 * (1 + vatRate1) + netAmount2 * (1 + vatRate2);\\n SetAttribute(\\"GrossAmount\\", grossAmount.toFixed(2));"}],"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":false},{"AttributeID":"NetAmount2","Description":null,"LocalizedDescriptions":{},"AttributeLabel":null,"AttributeIcon":null,"AttributeType":0,"Required":false,"ReadOnly":false,"DoAlignStart":false,"DefaultValue":"0.00","Values":[],"ColumnSizePercent":0,"MinLength":0,"MaxLength":0,"SizeDesktop":6,"SizeTablet":4,"SizePhone":4,"Minified":null,"Position":{"verticalPosition":2,"horizontalPosition":1},"TabStop":20,"ValueConversion":"ConvertInputFloatWithCustomDelimiter","Title":null,"Pattern":null,"QueryAttributes":null,"JSSnippets":[{"OnMethod":"input","Code":" ConvertInputFloatWithCustomDelimiterOnInput(this);\\n var netAmount1 = Number(GetAttribute(\\"NetAmount1\\"));\\n var vatRate1 = Number(GetAttribute(\\"VatRate1\\"))/100;\\n\\n var netAmount2 = Number(GetAttribute(\\"NetAmount2\\"));\\n var vatRate2 = Number(GetAttribute(\\"VatRate2\\"))/100;\\n var vatAmount2 = netAmount2 * vatRate2;\\n SetAttribute(\\"VatAmount2\\", vatAmount2.toFixed(2));\\n var grossAmount = netAmount1 * (1 + vatRate1) + netAmount2 * (1 + vatRate2);\\n SetAttribute(\\"GrossAmount\\", grossAmount.toFixed(2));"}],"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":false},{"AttributeID":"VatRate1","Description":null,"LocalizedDescriptions":{},"AttributeLabel":null,"AttributeIcon":null,"AttributeType":0,"Required":false,"ReadOnly":false,"DoAlignStart":false,"DefaultValue":"0.00","Values":[],"ColumnSizePercent":0,"MinLength":0,"MaxLength":0,"SizeDesktop":6,"SizeTablet":4,"SizePhone":4,"Minified":null,"Position":{"verticalPosition":3,"horizontalPosition":0},"TabStop":18,"ValueConversion":"ConvertInputFloatWithCustomDelimiter","Title":null,"Pattern":null,"QueryAttributes":null,"JSSnippets":[{"OnMethod":"input","Code":" ConvertInputFloatWithCustomDelimiterOnInput(this);\\n var netAmount1 = Number(GetAttribute(\\"NetAmount1\\"));\\n var vatRate1 = Number(GetAttribute(\\"VatRate1\\"))/100;\\n var vatAmount1 = netAmount1 * vatRate1;\\n SetAttribute(\\"VatAmount1\\", vatAmount1.toFixed(2));\\n\\n var netAmount2 = Number(GetAttribute(\\"NetAmount2\\"));\\n var vatRate2 = Number(GetAttribute(\\"VatRate2\\"))/100;\\n var grossAmount = netAmount1 * (1 + vatRate1) + netAmount2 * (1 + vatRate2);\\n SetAttribute(\\"GrossAmount\\", grossAmount.toFixed(2));"}],"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":false},{"AttributeID":"VatRate2","Description":null,"LocalizedDescriptions":{},"AttributeLabel":null,"AttributeIcon":null,"AttributeType":0,"Required":false,"ReadOnly":false,"DoAlignStart":false,"DefaultValue":"0.00","Values":[],"ColumnSizePercent":0,"MinLength":0,"MaxLength":0,"SizeDesktop":6,"SizeTablet":4,"SizePhone":4,"Minified":null,"Position":{"verticalPosition":3,"horizontalPosition":1},"TabStop":21,"ValueConversion":"ConvertInputFloatWithCustomDelimiter","Title":null,"Pattern":null,"QueryAttributes":null,"JSSnippets":[{"OnMethod":"input","Code":" ConvertInputFloatWithCustomDelimiterOnInput(this);\\n var netAmount1 = Number(GetAttribute(\\"NetAmount1\\"));\\n var vatRate1 = Number(GetAttribute(\\"VatRate1\\"))/100;\\n\\n var netAmount2 = Number(GetAttribute(\\"NetAmount2\\"));\\n var vatRate2 = Number(GetAttribute(\\"VatRate2\\"))/100;\\n var vatAmount2 = netAmount2 * vatRate2;\\n SetAttribute(\\"VatAmount2\\", vatAmount2.toFixed(2));\\n var grossAmount = netAmount1 * (1 + vatRate1) + netAmount2 * (1 + vatRate2);\\n SetAttribute(\\"GrossAmount\\", grossAmount.toFixed(2));"}],"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":false},{"AttributeID":"VatAmount1","Description":null,"LocalizedDescriptions":{},"AttributeLabel":null,"AttributeIcon":null,"AttributeType":0,"Required":true,"ReadOnly":false,"DoAlignStart":false,"DefaultValue":"0.00","Values":[],"ColumnSizePercent":0,"MinLength":0,"MaxLength":0,"SizeDesktop":6,"SizeTablet":4,"SizePhone":4,"Minified":null,"Position":{"verticalPosition":4,"horizontalPosition":0},"TabStop":19,"ValueConversion":"ConvertInputFloatWithCustomDelimiter","Title":null,"Pattern":null,"QueryAttributes":null,"JSSnippets":[{"OnMethod":"input","Code":" ConvertInputFloatWithCustomDelimiterOnInput(this);\\n "}],"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":false},{"AttributeID":"VatAmount2","Description":null,"LocalizedDescriptions":{},"AttributeLabel":null,"AttributeIcon":null,"AttributeType":0,"Required":false,"ReadOnly":false,"DoAlignStart":false,"DefaultValue":"0.00","Values":[],"ColumnSizePercent":0,"MinLength":0,"MaxLength":0,"SizeDesktop":6,"SizeTablet":4,"SizePhone":4,"Minified":null,"Position":{"verticalPosition":4,"horizontalPosition":1},"TabStop":22,"ValueConversion":"ConvertInputFloatWithCustomDelimiter","Title":null,"Pattern":null,"QueryAttributes":null,"JSSnippets":[{"OnMethod":"input","Code":" ConvertInputFloatWithCustomDelimiterOnInput(this);\\n "}],"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":false},{"AttributeID":"AdditionalCosts","Description":null,"LocalizedDescriptions":{},"AttributeLabel":null,"AttributeIcon":null,"AttributeType":0,"Required":false,"ReadOnly":false,"DoAlignStart":false,"DefaultValue":"0.00","Values":[],"ColumnSizePercent":0,"MinLength":0,"MaxLength":0,"SizeDesktop":12,"SizeTablet":8,"SizePhone":4,"Minified":null,"Position":{"verticalPosition":5,"horizontalPosition":0},"TabStop":23,"ValueConversion":"ConvertInputFloatWithCustomDelimiter","Title":null,"Pattern":null,"QueryAttributes":null,"JSSnippets":[{"OnMethod":"input","Code":" ConvertInputFloatWithCustomDelimiterOnInput(this);\\n "}],"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":false},{"AttributeID":"GrossAmount","Description":null,"LocalizedDescriptions":{},"AttributeLabel":null,"AttributeIcon":null,"AttributeType":0,"Required":true,"ReadOnly":false,"DoAlignStart":false,"DefaultValue":"0.00","Values":[],"ColumnSizePercent":0,"MinLength":0,"MaxLength":0,"SizeDesktop":9,"SizeTablet":4,"SizePhone":4,"Minified":null,"Position":{"verticalPosition":6,"horizontalPosition":0},"TabStop":24,"ValueConversion":"ConvertInputFloatWithCustomDelimiter","Title":null,"Pattern":null,"QueryAttributes":null,"JSSnippets":[{"OnMethod":"input","Code":" ConvertInputFloatWithCustomDelimiterOnInput(this);\\n "}],"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":false},{"AttributeID":"GrossAmountCurrency","Description":null,"LocalizedDescriptions":{},"AttributeLabel":null,"AttributeIcon":null,"AttributeType":0,"Required":false,"ReadOnly":false,"DoAlignStart":true,"DefaultValue":null,"Values":["","AUD","CAD","CHF","CNY","CZK","DKK","EUR","GBP","HKD","INR","JPY","KRW","MYR","NOK","PLN","RUB","SAR","SEK","SGD","TWD","UAH","USD","ZAR"],"ColumnSizePercent":0,"MinLength":0,"MaxLength":0,"SizeDesktop":3,"SizeTablet":4,"SizePhone":4,"Minified":null,"Position":{"verticalPosition":6,"horizontalPosition":1},"TabStop":25,"ValueConversion":null,"Title":null,"Pattern":null,"QueryAttributes":null,"JSSnippets":[],"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":false}],"AttributeStructureDefinitions":[]}],"StructureGroups":[{"GroupID":0,"GroupDescription":"PositionData","MinifiedView":false,"AttributeDefinitions":[],"AttributeStructureDefinitions":[{"AttributeID":"positions","AttributeDefinitions":[{"AttributeID":"Pos.OrderNum","Description":null,"LocalizedDescriptions":{},"AttributeLabel":null,"AttributeIcon":null,"AttributeType":0,"Required":false,"ReadOnly":false,"DoAlignStart":true,"DefaultValue":null,"Values":[],"ColumnSizePercent":14,"MinLength":0,"MaxLength":0,"SizeDesktop":1,"SizeTablet":1,"SizePhone":1,"Minified":null,"Position":{"verticalPosition":0,"horizontalPosition":0},"TabStop":0,"ValueConversion":null,"Title":null,"Pattern":null,"QueryAttributes":[{"AttributeID":"Pos.OrderNum","AttributeValue":null,"AttributeQueryPrefix":"%","AttributeQuerySuffix":"%","Prefix":true,"MultipleParameter":false},{"AttributeID":"DEBITOR_NUM","AttributeValue":null,"AttributeQueryPrefix":"","AttributeQuerySuffix":"","Prefix":false,"MultipleParameter":false},{"AttributeID":"VENDOR_NUM","AttributeValue":null,"AttributeQueryPrefix":"","AttributeQuerySuffix":"","Prefix":false,"MultipleParameter":false},{"AttributeID":"OrderNum","AttributeValue":null,"AttributeQueryPrefix":"","AttributeQuerySuffix":"","Prefix":false,"MultipleParameter":false},{"AttributeID":"Pos.Article","AttributeValue":null,"AttributeQueryPrefix":"%","AttributeQuerySuffix":"%","Prefix":true,"MultipleParameter":false}],"JSSnippets":[{"OnMethod":"change","Code":""}],"DataBaseDefinition":{"QueryDefinition":"SELECT\\n  ORL.ORDER_NUM,\\n  ORL.ORDER_POS,\\n  MATNR,\\n  VENDOR_MATNR,\\n  DESCRIPTION,\\n  FORMAT(UNIT_PRICE, \'N2\', \'de-de\') AS UNIT_PRICE,\\n  FORMAT(ORL.QUANTITY, \'N2\', \'de-de\') AS QUANTITY,\\n  FORMAT(SUM_PRICE, \'N2\', \'de-de\') AS SUM_PRICE,\\n  PRICE_UNITS,\\n  UNITS,\\n  RECEIPT_NUM\\nFROM\\n  dbo.CC_ORDERLINES AS ORL\\n  INNER JOIN dbo.CC_ORDERS AS ORD ON ORL.ORDER_NUM = ORD.ORDER_NUM\\n  LEFT JOIN dbo.CC_RECEIPTS AS REC ON ORL.ORDER_NUM = REC.ORDER_NUM\\n  AND ORL.ORDER_POS = REC.ORDER_POS\\n  AND ORL.COMPANY_NUM = REC.COMPANY_NUM\\nWHERE\\n  ORL.COMPANY_NUM = @DEBITOR_NUM\\n  AND ORD.VENDOR_NUM = @VENDOR_NUM\\n  AND ORD.ORDER_NUM LIKE @PosOrderNum\\n  AND ORL.MATNR LIKE @PosArticle","QueryMappings":[{"ColumnName":"ORDER_NUM","AttributeID":"Pos.OrderNum"},{"ColumnName":"ORDER_POS","AttributeID":"Pos.OrderPos"},{"ColumnName":"MATNR","AttributeID":"Pos.Article"},{"ColumnName":"VENDOR_MATNR","AttributeID":"Pos.VENDOR_MATNR"},{"ColumnName":"DESCRIPTION","AttributeID":"Pos.Description"},{"ColumnName":"UNIT_PRICE","AttributeID":"Pos.PlannedUPrice"},{"ColumnName":"QUANTITY","AttributeID":"Pos.PlannedQuantity"},{"ColumnName":"SUM_PRICE","AttributeID":"Pos.PlannedSPrice"},{"ColumnName":"PRICE_UNITS","AttributeID":"Pos.PRICE_UNITS"},{"ColumnName":"UNITS","AttributeID":"Pos.UNITS"},{"ColumnName":"RECEIPT_NUM","AttributeID":"Pos.DeliveryNote"}],"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":false},{"AttributeID":"Pos.OrderPos","Description":null,"LocalizedDescriptions":{},"AttributeLabel":null,"AttributeIcon":null,"AttributeType":0,"Required":false,"ReadOnly":false,"DoAlignStart":true,"DefaultValue":null,"Values":[],"ColumnSizePercent":8,"MinLength":0,"MaxLength":0,"SizeDesktop":0,"SizeTablet":0,"SizePhone":0,"Minified":null,"Position":{"verticalPosition":0,"horizontalPosition":0},"TabStop":0,"ValueConversion":null,"Title":null,"Pattern":null,"QueryAttributes":null,"JSSnippets":[],"DataBaseDefinition":{"QueryDefinition":"","QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":false},{"AttributeID":"Pos.Article","Description":null,"LocalizedDescriptions":{},"AttributeLabel":null,"AttributeIcon":null,"AttributeType":0,"Required":false,"ReadOnly":false,"DoAlignStart":true,"DefaultValue":null,"Values":[],"ColumnSizePercent":8,"MinLength":0,"MaxLength":0,"SizeDesktop":0,"SizeTablet":0,"SizePhone":0,"Minified":null,"Position":{"verticalPosition":0,"horizontalPosition":0},"TabStop":0,"ValueConversion":null,"Title":null,"Pattern":null,"QueryAttributes":null,"JSSnippets":[],"DataBaseDefinition":{"QueryDefinition":"","QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":false},{"AttributeID":"Pos.Description","Description":null,"LocalizedDescriptions":{},"AttributeLabel":null,"AttributeIcon":null,"AttributeType":0,"Required":false,"ReadOnly":false,"DoAlignStart":true,"DefaultValue":null,"Values":[],"ColumnSizePercent":17,"MinLength":0,"MaxLength":0,"SizeDesktop":0,"SizeTablet":0,"SizePhone":0,"Minified":null,"Position":{"verticalPosition":0,"horizontalPosition":0},"TabStop":0,"ValueConversion":null,"Title":null,"Pattern":null,"QueryAttributes":null,"JSSnippets":[],"DataBaseDefinition":{"QueryDefinition":null,"QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":false},{"AttributeID":"Pos.Quantity","Description":null,"LocalizedDescriptions":{},"AttributeLabel":null,"AttributeIcon":null,"AttributeType":0,"Required":true,"ReadOnly":false,"DoAlignStart":false,"DefaultValue":"0","Values":[],"ColumnSizePercent":8,"MinLength":0,"MaxLength":0,"SizeDesktop":0,"SizeTablet":0,"SizePhone":0,"Minified":null,"Position":{"verticalPosition":0,"horizontalPosition":0},"TabStop":0,"ValueConversion":"ConvertInputFloatWithCustomDelimiter","Title":null,"Pattern":"^(0?[1-9]|[12][0-9]|3[01])[.](0?[1-9]|1[012])[.](\\\\d{4})$","QueryAttributes":null,"JSSnippets":[{"OnMethod":"input","Code":"ConvertInputFloatWithCustomDelimiterOnInput(this);\\nvar rowPrefixValues = this.id.split(\'___\');\\nvar structureName = rowPrefixValues[0];\\nvar rowIndex = rowPrefixValues[1];\\nvar UPrice = Number(GetPositionAttribute(\'Pos.UPrice\', rowIndex, structureName));\\nvar quantity = Number(GetPositionAttribute(\'Pos.Quantity\', rowIndex, structureName));\\nSetPositionAttribute(\'Pos.SPrice\', (UPrice * quantity).toFixed(2), rowIndex, structureName);\\n\\n\\n"},{"OnMethod":"change","Code":"async function setPositionValue() {\\r\\n    try {\\r\\n        setColors();\\r\\n        let posOrderNum = GetPositionAttribute(\'Pos.OrderNum\', rowIndex, structureName);\\r\\n        let posOrderArticle = GetPositionAttribute(\'Pos.Article\', rowIndex, structureName);\\r\\n        let plannedQuantity = GetPositionAttribute(\'Pos.PlannedQuantity\', rowIndex, structureName);\\r\\n\\r\\n        if (plannedQuantity != \'\') {\\r\\n            return;\\r\\n        }\\r\\n\\r\\n        if (posOrderNum == undefined || posOrderNum == \'\'\\r\\n            || posOrderArticle == undefined || posOrderArticle == \'\') {\\r\\n            return;\\r\\n        }\\r\\n\\r\\n        let positions = await GetSqlResult(`SELECT * FROM CC_ORDERLINES WHERE ORDER_NUM = \'${posOrderNum}\' AND MATNR = \'${posOrderArticle}\'`);\\r\\n\\r\\n        console.log(positions);\\r\\n\\r\\n        let quantity = GetPositionAttribute(\'Pos.Quantity\', rowIndex, structureName);\\r\\n\\r\\n        plannedQuantity = parseFloat(positions.Rows[0].Cells[7].replace(\',\', \'.\')).toLocaleString(\'de-DE\', { minimumFractionDigits: 2 });\\r\\n\\r\\n        quantity = parseFloat(quantity).toLocaleString(\'de-DE\', { minimumFractionDigits: 2, maximumFractionDigits: 2 })\\r\\n\\r\\n        SetPositionAttribute(\'Pos.PlannedQuantity\', plannedQuantity, rowIndex, structureName);\\r\\n\\r\\n        SetPositionAttribute(\'Pos.Quantity\', quantity, rowIndex, structureName);\\r\\n\\r\\n        setColors();\\r\\n\\r\\n    } catch (error) {\\r\\n        console.error(\'Fehler beim Abrufen der Positionen:\', error);\\r\\n    }\\r\\n}\\r\\n\\r\\nfunction setColors() {\\r\\n    console.log(\'setting colors\');\\r\\n    let quantity = GetPositionAttribute(\'Pos.Quantity\', rowIndex, structureName);\\r\\n\\r\\n    let quantityFormatted = parseFloat(quantity).toLocaleString(\'de-DE\', { minimumFractionDigits: 2, maximumFractionDigits: 2 })\\r\\n\\r\\n    if (quantity == quantityFormatted) {\\r\\n        return;\\r\\n    }\\r\\n\\r\\n    SetPositionAttribute(\'Pos.Quantity\', quantityFormatted, rowIndex, structureName);\\r\\n\\r\\n    let plannedQuantity = GetPositionAttribute(\'Pos.PlannedQuantity\', rowIndex, structureName);\\r\\n    quantity = GetPositionAttribute(\'Pos.Quantity\', rowIndex, structureName);\\r\\n\\r\\n    console.log(plannedQuantity);\\r\\n    console.log(quantity);\\r\\n\\r\\n    const color = quantity !== plannedQuantity ? \'#FF0000\' : \'#68b300\';\\r\\n    SetPositionTextColor(\'Pos.Quantity\', rowIndex, structureName, color);\\r\\n    SetPositionTextColor(\'Pos.PlannedQuantity\', rowIndex, structureName, color);\\r\\n}\\r\\n\\r\\nsetPositionValue();\\r\\n"}],"DataBaseDefinition":{"QueryDefinition":"","QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":false},{"AttributeID":"Pos.PlannedQuantity","Description":"Urspr. Menge","LocalizedDescriptions":{},"AttributeLabel":"Urspr. Menge","AttributeIcon":null,"AttributeType":0,"Required":false,"ReadOnly":true,"DoAlignStart":true,"DefaultValue":null,"Values":[],"ColumnSizePercent":9,"MinLength":0,"MaxLength":0,"SizeDesktop":0,"SizeTablet":0,"SizePhone":0,"Minified":null,"Position":{"verticalPosition":1,"horizontalPosition":0},"TabStop":-1,"ValueConversion":"ConvertInputFloatWithCustomDelimiter","Title":null,"Pattern":null,"QueryAttributes":[],"JSSnippets":[{"OnMethod":"change","Code":""}],"DataBaseDefinition":{"QueryDefinition":"","QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":true},{"AttributeID":"Pos.UPrice","Description":"Einzelpreis","LocalizedDescriptions":{},"AttributeLabel":"Einzelpreis","AttributeIcon":null,"AttributeType":0,"Required":true,"ReadOnly":false,"DoAlignStart":false,"DefaultValue":"0.00","Values":[],"ColumnSizePercent":8,"MinLength":0,"MaxLength":0,"SizeDesktop":0,"SizeTablet":0,"SizePhone":0,"Minified":null,"Position":{"verticalPosition":0,"horizontalPosition":0},"TabStop":0,"ValueConversion":"ConvertInputFloatWithCustomDelimiter","Title":null,"Pattern":null,"QueryAttributes":null,"JSSnippets":[{"OnMethod":"input","Code":"ConvertInputFloatWithCustomDelimiterOnInput(this);\\nvar rowPrefixValues = this.id.split(\'___\');\\nvar structureName = rowPrefixValues[0];\\nvar rowIndex = rowPrefixValues[1];\\nvar UPrice = Number(GetPositionAttribute(\'Pos.UPrice\', rowIndex, structureName));\\nvar quantity = Number(GetPositionAttribute(\'Pos.Quantity\', rowIndex, structureName));\\nSetPositionAttribute(\'Pos.SPrice\', (UPrice * quantity).toFixed(2), rowIndex, structureName);"},{"OnMethod":"change","Code":"async function setPositionValue() {\\r\\n    try {\\r\\n        setColors();\\r\\n        let posOrderNum = GetPositionAttribute(\'Pos.OrderNum\', rowIndex, structureName);\\r\\n        let posOrderArticle = GetPositionAttribute(\'Pos.Article\', rowIndex, structureName);\\r\\n        let plannedUPrice = GetPositionAttribute(\'Pos.PlannedUPrice\', rowIndex, structureName);\\r\\n\\r\\n        if (plannedUPrice != \'\') {\\r\\n            return;\\r\\n        }\\r\\n\\r\\n        if (posOrderNum == undefined || posOrderNum == \'\'\\r\\n            || posOrderArticle == undefined || posOrderArticle == \'\') {\\r\\n            return;\\r\\n        }\\r\\n\\r\\n        let positions = await GetSqlResult(`SELECT * FROM CC_ORDERLINES WHERE ORDER_NUM = \'${posOrderNum}\' AND MATNR = \'${posOrderArticle}\'`);\\r\\n\\r\\n        let uPrice = GetPositionAttribute(\'Pos.UPrice\', rowIndex, structureName);\\r\\n\\r\\n        console.log(JSON.stringify(positions));\\r\\n        plannedUPrice = parseFloat(positions.Rows[0].Cells[6].replace(\',\', \'.\')).toLocaleString(\'de-DE\', { minimumFractionDigits: 2 });\\r\\n        console.log(plannedUPrice);\\r\\n        uPrice = parseFloat(uPrice).toLocaleString(\'de-DE\', { minimumFractionDigits: 2, maximumFractionDigits: 2 })\\r\\n\\r\\n        SetPositionAttribute(\'Pos.PlannedUPrice\', plannedUPrice, rowIndex, structureName);\\r\\n\\r\\n        SetPositionAttribute(\'Pos.UPrice\', uPrice, rowIndex, structureName);\\r\\n\\r\\n        setColors();\\r\\n\\r\\n    } catch (error) {\\r\\n        console.error(\'Fehler beim Abrufen der Positionen:\', error);\\r\\n    }\\r\\n}\\r\\n\\r\\nfunction setColors() {\\r\\n    console.log(\'setting colors\');\\r\\n    let uPrice = GetPositionAttribute(\'Pos.UPrice\', rowIndex, structureName);\\r\\n\\r\\n    let uPriceFormatted = parseFloat(uPrice).toLocaleString(\'de-DE\', { minimumFractionDigits: 2, maximumFractionDigits: 2 })\\r\\n\\r\\n    if (uPrice == uPriceFormatted) {\\r\\n        return;\\r\\n    }\\r\\n\\r\\n    SetPositionAttribute(\'Pos.UPrice\', uPriceFormatted, rowIndex, structureName);\\r\\n\\r\\n    let plannedUPrice = GetPositionAttribute(\'Pos.PlannedUPrice\', rowIndex, structureName);\\r\\n    uPrice = GetPositionAttribute(\'Pos.UPrice\', rowIndex, structureName);\\r\\n\\r\\n    console.log(plannedUPrice);\\r\\n    console.log(uPrice);\\r\\n\\r\\n    const color = uPrice !== plannedUPrice ? \'#FF0000\' : \'#68b300\';\\r\\n    SetPositionTextColor(\'Pos.UPrice\', rowIndex, structureName, color);\\r\\n    SetPositionTextColor(\'Pos.PlannedUPrice\', rowIndex, structureName, color);\\r\\n}\\r\\n\\r\\nsetPositionValue();\\r\\n"}],"DataBaseDefinition":{"QueryDefinition":"","QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":false},{"AttributeID":"Pos.PlannedUPrice","Description":"Urspr. Einzelpreis","LocalizedDescriptions":{},"AttributeLabel":"Urspr. Einzelpreis","AttributeIcon":null,"AttributeType":0,"Required":false,"ReadOnly":true,"DoAlignStart":true,"DefaultValue":null,"Values":[],"ColumnSizePercent":9,"MinLength":0,"MaxLength":0,"SizeDesktop":0,"SizeTablet":0,"SizePhone":0,"Minified":null,"Position":{"verticalPosition":1,"horizontalPosition":0},"TabStop":-1,"ValueConversion":"ConvertInputFloatWithCustomDelimiter","Title":null,"Pattern":null,"QueryAttributes":[],"JSSnippets":[],"DataBaseDefinition":{"QueryDefinition":"","QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":true},{"AttributeID":"Pos.SPrice","Description":null,"LocalizedDescriptions":{},"AttributeLabel":null,"AttributeIcon":null,"AttributeType":0,"Required":true,"ReadOnly":false,"DoAlignStart":false,"DefaultValue":"0.00","Values":[],"ColumnSizePercent":8,"MinLength":0,"MaxLength":0,"SizeDesktop":0,"SizeTablet":0,"SizePhone":0,"Minified":null,"Position":{"verticalPosition":0,"horizontalPosition":0},"TabStop":0,"ValueConversion":"ConvertInputFloatWithCustomDelimiter","Title":null,"Pattern":null,"QueryAttributes":null,"JSSnippets":[{"OnMethod":"input","Code":" ConvertInputFloatWithCustomDelimiterOnInput(this);"},{"OnMethod":"change","Code":"async function setPositionValue() {\\r\\n    try {\\r\\n        setColors();\\r\\n        let posOrderNum = GetPositionAttribute(\'Pos.OrderNum\', rowIndex, structureName);\\r\\n        let posOrderArticle = GetPositionAttribute(\'Pos.Article\', rowIndex, structureName);\\r\\n        let plannedSPrice = GetPositionAttribute(\'Pos.PlannedSPrice\', rowIndex, structureName);\\r\\n\\r\\n        if (plannedSPrice != \'\') {\\r\\n            return;\\r\\n        }\\r\\n\\r\\n        if (posOrderNum == undefined || posOrderNum == \'\'\\r\\n            || posOrderArticle == undefined || posOrderArticle == \'\') {\\r\\n            return;\\r\\n        }\\r\\n\\r\\n        let positions = await GetSqlResult(`SELECT * FROM CC_ORDERLINES WHERE ORDER_NUM = \'${posOrderNum}\' AND MATNR = \'${posOrderArticle}\'`);\\r\\n\\r\\n        let sPrice = GetPositionAttribute(\'Pos.SPrice\', rowIndex, structureName);\\r\\n\\r\\n        plannedSPrice = positions.Rows[0].Cells[8];\\r\\n\\r\\n        plannedSPrice = parseFloat(sPrice).toLocaleString(\'de-DE\', { minimumFractionDigits: 2, maximumFractionDigits: 2 })\\r\\n\\r\\n        sPrice = parseFloat(sPrice).toLocaleString(\'de-DE\', { minimumFractionDigits: 2, maximumFractionDigits: 2 })\\r\\n\\r\\n        SetPositionAttribute(\'Pos.PlannedSPrice\', plannedSPrice, rowIndex, structureName);\\r\\n\\r\\n        SetPositionAttribute(\'Pos.SPrice\', sPrice, rowIndex, structureName);\\r\\n\\r\\n        console.log(sPrice);\\r\\n        console.log(plannedSPrice);\\r\\n        setColors(sPrice, plannedSPrice);\\r\\n\\r\\n\\r\\n    } catch (error) {\\r\\n        console.error(\'Fehler beim Abrufen der Positionen:\', error);\\r\\n    }\\r\\n}\\r\\n\\r\\nfunction setColors() {\\r\\n    console.log(\'setting colors\');\\r\\n    let sPrice = GetPositionAttribute(\'Pos.SPrice\', rowIndex, structureName);\\r\\n\\r\\n    let sPriceFormatted = parseFloat(sPrice).toLocaleString(\'de-DE\', { minimumFractionDigits: 2, maximumFractionDigits: 2 })\\r\\n\\r\\n    if (sPrice == sPriceFormatted) {\\r\\n        return;\\r\\n    }\\r\\n\\r\\n    SetPositionAttribute(\'Pos.SPrice\', sPriceFormatted, rowIndex, structureName);\\r\\n\\r\\n    let plannedSPrice = GetPositionAttribute(\'Pos.PlannedSPrice\', rowIndex, structureName);\\r\\n    sPrice = GetPositionAttribute(\'Pos.SPrice\', rowIndex, structureName);\\r\\n\\r\\n    console.log(plannedSPrice);\\r\\n    console.log(sPrice);\\r\\n\\r\\n    const color = sPrice !== plannedSPrice ? \'#FF0000\' : \'#68b300\';\\r\\n    SetPositionTextColor(\'Pos.SPrice\', rowIndex, structureName, color);\\r\\n    SetPositionTextColor(\'Pos.PlannedSPrice\', rowIndex, structureName, color);\\r\\n}\\r\\n\\r\\nsetPositionValue();\\r\\n"}],"DataBaseDefinition":{"QueryDefinition":"","QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":false},{"AttributeID":"Pos.PlannedSPrice","Description":"Urspr. Gesamtpreis","LocalizedDescriptions":{},"AttributeLabel":"Urspr. Gesamtpreis","AttributeIcon":null,"AttributeType":0,"Required":false,"ReadOnly":true,"DoAlignStart":true,"DefaultValue":null,"Values":[],"ColumnSizePercent":9,"MinLength":0,"MaxLength":0,"SizeDesktop":0,"SizeTablet":0,"SizePhone":0,"Minified":null,"Position":{"verticalPosition":1,"horizontalPosition":0},"TabStop":-1,"ValueConversion":"ConvertInputFloatWithCustomDelimiter","Title":null,"Pattern":null,"QueryAttributes":[],"JSSnippets":[],"DataBaseDefinition":{"QueryDefinition":"","QueryMappings":null,"HttpDataSourceId":null,"IsResultTransformationEnabled":false},"IsTransitive":false,"PositionCounterpart":null,"AutoComplete":true,"AllowNegativeAmount":true}],"JSSnippets":[]}]}],"JSSnippets":[{"OnMethod":"documentready","Code":"document.querySelector(\\"#tabButton_AttributeStructures\\").style.display = \\"none\\";"}],"TemplateDefinition":{"TemplateId":"VENDOR_NUM","TemplateName":"VENDOR_NAME"}}],"masterDataDefinitions":[{"TableName":"CC_COMPANIES","Description":"debitorlist","Columns":[{"ColumnName":"COMPANY_NUM","Description":"Companynumber","ColumnType":1,"MaxLength":256,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"NAME","Description":"Name","ColumnType":1,"MaxLength":256,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"STR","Description":"Street","ColumnType":1,"MaxLength":256,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"CITY","Description":"City","ColumnType":1,"MaxLength":256,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"ZIP","Description":"Zipcode","ColumnType":1,"MaxLength":15,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"COUNTRY","Description":"COUNTRY","ColumnType":1,"MaxLength":15,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"DE","CreateFulltextIndex":false},{"ColumnName":"DEFAULT_CURRENCY","Description":"DEFAULT_CURRENCY","ColumnType":1,"MaxLength":15,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"EUR","CreateFulltextIndex":false},{"ColumnName":"BLACK","Description":"blacklistid","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false}]},{"TableName":"CC_VENDORS","Description":"vendorlist","Columns":[{"ColumnName":"COMPANY_NUM","Description":"Companynumber","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"VENDOR_NUM","Description":"Vendornumber","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"VENDOR_NAME","Description":"vendorname","ColumnType":1,"MaxLength":256,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":1,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"VENDOR_STR","Description":"vendorstreet","ColumnType":1,"MaxLength":256,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":5,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"VENDOR_ZIP_CODE","Description":"vendorzipcode","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":4,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"VENDOR_CITY","Description":"vendorcity","ColumnType":1,"MaxLength":256,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":3,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"VENDOR_COUNTRY","Description":"vendorcountry","ColumnType":1,"MaxLength":256,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"VENDOR_EMAIL","Description":"vendoremail","ColumnType":1,"MaxLength":256,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"VENDOR_VAT_REGISTRATION_ID","Description":"vendorVATId","ColumnType":1,"MaxLength":100,"CreateIndex":true,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":"[A-Za-z0-9]","DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"VENDOR_REGISTRATION_ID","Description":"vendorregistrationid","ColumnType":1,"MaxLength":100,"CreateIndex":true,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":"[A-Za-z0-9]","DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"VENDOR_PHONE_NUMBER","Description":"vendorphonenumber","ColumnType":1,"MaxLength":100,"CreateIndex":true,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":"[0-9]","DefaultValue":"","CreateFulltextIndex":false}]},{"TableName":"CC_VENDOR_BANK","Description":"vendorbankdata","Columns":[{"ColumnName":"COMPANY_NUM","Description":"Companynumber","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"VENDOR_NUM","Description":"Vendornumber","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"BANK_CODE","Description":"bankcode","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"BANK_ACCOUNT","Description":"bankaccount","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"IBAN","Description":"IBAN","ColumnType":1,"MaxLength":100,"CreateIndex":true,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":6,"SignificantCharacters":"[A-Za-z0-9]","DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"BIC","Description":"BIC","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false}]},{"TableName":"CC_ORDERS","Description":"orders","Columns":[{"ColumnName":"COMPANY_NUM","Description":"Companynumber","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"VENDOR_NUM","Description":"Vendornumber","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"ORDER_NUM","Description":"Ordernumber","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":true,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"PLANNED_DELIVERY_DATE","Description":"DeliveryDate","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"ORDER_DATE","Description":"OrderDate","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false}]},{"TableName":"CC_ORDERLINES","Description":"orderlines","Columns":[{"ColumnName":"COMPANY_NUM","Description":"CompanyNumber","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"ORDER_NUM","Description":"OrderNumber","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"ORDER_POS","Description":"OrderPosNumber","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"MATNR","Description":"OrderPosNumber","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"VENDOR_MATNR","Description":"OrderPosNumber","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"DESCRIPTION","Description":"OrderPosNumber","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"UNIT_PRICE","Description":"OrderPosNumber","ColumnType":2,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"QUANTITY","Description":"OrderPosNumber","ColumnType":2,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"SUM_PRICE","Description":"OrderPosNumber","ColumnType":2,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"PRICE_UNITS","Description":"OrderPosNumber","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"UNITS","Description":"OrderPosNumber","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"PLANNED_DELIVERY_DATE","Description":"DeliveryDate","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false}]},{"TableName":"CC_RECEIPTS","Description":"receipts","Columns":[{"ColumnName":"COMPANY_NUM","Description":"Companynumber","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"ORDER_NUM","Description":"Ordernumber","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"ORDER_POS","Description":"orderpos","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"QUANTITY","Description":"orderpos","ColumnType":2,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"RECEIPT_NUM","Description":"orderpos","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false}]},{"TableName":"EXTENDED_VENDOR_SETTINGS","Description":"extendet vendor settings","Columns":[{"ColumnName":"COMPANY_NUM","Description":"Companynumber","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"VENDOR_NUM","Description":"Vendornumber","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"AutoRoutingFlag","Description":"AutoRoutingFlag","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false}]},{"TableName":"CC_RULES","Description":"CC_RULES","Columns":[{"ColumnName":"ID","Description":"ID","ColumnType":0,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"EXPORTVALUE","Description":"EXPORTVALUE","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"BOOST","Description":"BOOST","ColumnType":0,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"RULEEXPRESSION","Description":"RULEEXPRESSION","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"RULESCHEMA","Description":"RULESCHEMA","ColumnType":1,"MaxLength":15,"CreateIndex":true,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"CREATEDBY","Description":"CREATEDBY","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"CREATEDATE","Description":"CREATEDATE","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"UPDATEDBY","Description":"UPDATEDBY","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"UPDATEDATE","Description":"UPDATEDATE","ColumnType":1,"MaxLength":100,"CreateIndex":true,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"DISABLED","Description":"DISABLED","ColumnType":0,"MaxLength":100,"CreateIndex":true,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false}]}],"baseMasterDataDefinitions":[{"TableName":"CC_COMPANIES","Description":"debitorlist","Columns":[{"ColumnName":"COMPANY_NUM","Description":"Companynumber","ColumnType":1,"MaxLength":256,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"NAME","Description":"Name","ColumnType":1,"MaxLength":256,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"STR","Description":"Street","ColumnType":1,"MaxLength":256,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"CITY","Description":"City","ColumnType":1,"MaxLength":256,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"ZIP","Description":"Zipcode","ColumnType":1,"MaxLength":15,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"COUNTRY","Description":"COUNTRY","ColumnType":1,"MaxLength":15,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"DE","CreateFulltextIndex":false},{"ColumnName":"DEFAULT_CURRENCY","Description":"DEFAULT_CURRENCY","ColumnType":1,"MaxLength":15,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"EUR","CreateFulltextIndex":false},{"ColumnName":"BLACK","Description":"blacklistid","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false}]},{"TableName":"CC_VENDORS","Description":"vendorlist","Columns":[{"ColumnName":"COMPANY_NUM","Description":"Companynumber","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"VENDOR_NUM","Description":"Vendornumber","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"VENDOR_NAME","Description":"vendorname","ColumnType":1,"MaxLength":256,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":1,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"VENDOR_STR","Description":"vendorstreet","ColumnType":1,"MaxLength":256,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":5,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"VENDOR_ZIP_CODE","Description":"vendorzipcode","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":4,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"VENDOR_CITY","Description":"vendorcity","ColumnType":1,"MaxLength":256,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":3,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"VENDOR_COUNTRY","Description":"vendorcountry","ColumnType":1,"MaxLength":256,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"VENDOR_EMAIL","Description":"vendoremail","ColumnType":1,"MaxLength":256,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"VENDOR_VAT_REGISTRATION_ID","Description":"vendorVATId","ColumnType":1,"MaxLength":100,"CreateIndex":true,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":"[A-Za-z0-9]","DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"VENDOR_REGISTRATION_ID","Description":"vendorregistrationid","ColumnType":1,"MaxLength":100,"CreateIndex":true,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":"[A-Za-z0-9]","DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"VENDOR_PHONE_NUMBER","Description":"vendorphonenumber","ColumnType":1,"MaxLength":100,"CreateIndex":true,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":"[0-9]","DefaultValue":"","CreateFulltextIndex":false}]},{"TableName":"CC_VENDOR_BANK","Description":"vendorbankdata","Columns":[{"ColumnName":"COMPANY_NUM","Description":"Companynumber","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"VENDOR_NUM","Description":"Vendornumber","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"BANK_CODE","Description":"bankcode","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"BANK_ACCOUNT","Description":"bankaccount","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"IBAN","Description":"IBAN","ColumnType":1,"MaxLength":100,"CreateIndex":true,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":6,"SignificantCharacters":"[A-Za-z0-9]","DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"BIC","Description":"BIC","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false}]},{"TableName":"CC_ORDERS","Description":"orders","Columns":[{"ColumnName":"COMPANY_NUM","Description":"Companynumber","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"VENDOR_NUM","Description":"Vendornumber","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"ORDER_NUM","Description":"Ordernumber","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":true,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"PLANNED_DELIVERY_DATE","Description":"DeliveryDate","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"ORDER_DATE","Description":"OrderDate","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false}]},{"TableName":"CC_ORDERLINES","Description":"orderlines","Columns":[{"ColumnName":"COMPANY_NUM","Description":"CompanyNumber","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"ORDER_NUM","Description":"OrderNumber","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"ORDER_POS","Description":"OrderPosNumber","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"MATNR","Description":"OrderPosNumber","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"VENDOR_MATNR","Description":"OrderPosNumber","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"DESCRIPTION","Description":"OrderPosNumber","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"UNIT_PRICE","Description":"OrderPosNumber","ColumnType":2,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"QUANTITY","Description":"OrderPosNumber","ColumnType":2,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"SUM_PRICE","Description":"OrderPosNumber","ColumnType":2,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"PRICE_UNITS","Description":"OrderPosNumber","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"UNITS","Description":"OrderPosNumber","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"PLANNED_DELIVERY_DATE","Description":"DeliveryDate","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false}]},{"TableName":"CC_RECEIPTS","Description":"receipts","Columns":[{"ColumnName":"COMPANY_NUM","Description":"Companynumber","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"ORDER_NUM","Description":"Ordernumber","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"ORDER_POS","Description":"orderpos","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"QUANTITY","Description":"orderpos","ColumnType":2,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"RECEIPT_NUM","Description":"orderpos","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false}]},{"TableName":"EXTENDED_VENDOR_SETTINGS","Description":"extendet vendor settings","Columns":[{"ColumnName":"COMPANY_NUM","Description":"Companynumber","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"VENDOR_NUM","Description":"Vendornumber","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"AutoRoutingFlag","Description":"AutoRoutingFlag","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false}]},{"TableName":"CC_RULES","Description":"CC_RULES","Columns":[{"ColumnName":"ID","Description":"ID","ColumnType":0,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"EXPORTVALUE","Description":"EXPORTVALUE","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"BOOST","Description":"BOOST","ColumnType":0,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"RULEEXPRESSION","Description":"RULEEXPRESSION","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"RULESCHEMA","Description":"RULESCHEMA","ColumnType":1,"MaxLength":15,"CreateIndex":true,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"CREATEDBY","Description":"CREATEDBY","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"CREATEDATE","Description":"CREATEDATE","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"UPDATEDBY","Description":"UPDATEDBY","ColumnType":1,"MaxLength":100,"CreateIndex":false,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"UPDATEDATE","Description":"UPDATEDATE","ColumnType":1,"MaxLength":100,"CreateIndex":true,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false},{"ColumnName":"DISABLED","Description":"DISABLED","ColumnType":0,"MaxLength":100,"CreateIndex":true,"TryIdentifyPattern":false,"SingleValueEntityName":null,"SemanticType":0,"SignificantCharacters":null,"DefaultValue":"","CreateFulltextIndex":false}]}],"httpDataSources":[],"appSettings":{"DocumentClassAttributeId":null,"DefaultLayout":"INV","TenantDbConnectionString":null}}');

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
/******/ 	let __webpack_exports__ = __webpack_require__("./src/forms/form.ts");
/******/ 	window.OnboardingGevisECMDocumentReaderFormBundle = __webpack_exports__;
/******/ 	
/******/ })()
;
//# sourceMappingURL=formBundle.js.map