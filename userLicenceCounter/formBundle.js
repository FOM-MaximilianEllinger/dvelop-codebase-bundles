/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/forms/UserLicenceOverview.svelte"
/*!**********************************************!*\
  !*** ./src/forms/UserLicenceOverview.svelte ***!
  \**********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UserLicenceOverview)
/* harmony export */ });
/* harmony import */ var svelte_internal_disclose_version__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal/disclose-version */ "./node_modules/svelte/src/internal/disclose-version.js");
/* harmony import */ var svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! svelte/internal/client */ "./node_modules/svelte/src/internal/client/index.js");
/* harmony import */ var svelte__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! svelte */ "./node_modules/svelte/src/index-client.js");
/* harmony import */ var _userLicence__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./userLicence */ "./src/forms/userLicence.ts");





var root = svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.from_html(`<div class="section svelte-nd7kvc"><div class="loading svelte-nd7kvc"><span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Benutzer werden geladen…</div></div>`);
var root_1 = svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.from_html(`<div class="error svelte-nd7kvc"><strong>Zählung fehlgeschlagen:</strong> </div>`);
var root_2 = svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.from_html(`<option> </option>`);
var root_3 = svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.from_html(`<span class="name svelte-nd7kvc"> </span>`);
var root_4 = svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.from_html(`<span class="muted svelte-nd7kvc">–</span>`);
var root_5 = svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.from_html(`<a> </a>`);
var root_6 = svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.from_html(`<span class="badge-type badge-paid svelte-nd7kvc">Bezahlt</span>`);
var root_7 = svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.from_html(`<span class="badge-type badge-gws svelte-nd7kvc">Administrativ</span>`);
var root_8 = svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.from_html(`<span class="id svelte-nd7kvc"> </span>`);
var root_9 = svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.from_html(`<tr><td class="nr svelte-nd7kvc"> </td><td class="svelte-nd7kvc"><!></td><td class="svelte-nd7kvc"><!></td><td class="svelte-nd7kvc"><!></td><td class="svelte-nd7kvc"><!> <!></td><td class="svelte-nd7kvc"><!></td></tr>`);
var root_10 = svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.from_html(`<tr><td colspan="6" class="muted svelte-nd7kvc">Keine Benutzer gefunden.</td></tr>`);

var root_11 = svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.from_html(`<div class="section svelte-nd7kvc"><div class="header svelte-nd7kvc"><div><span class="title svelte-nd7kvc">Benutzer</span> <div class="stats svelte-nd7kvc"><span class="stat stat-paid svelte-nd7kvc">Bezahlt: <strong class="svelte-nd7kvc"> </strong></span> <span class="stat svelte-nd7kvc">Administrativ: <strong class="svelte-nd7kvc"> </strong></span> <span class="stat svelte-nd7kvc">Gesamt: <strong class="svelte-nd7kvc"> </strong></span></div> <div class="hint">Bezahlt = alle Benutzer außer administrativen Benutzern (@gws.ms). Technische (API-)Benutzer werden vom
          Identityprovider nicht aufgelistet und sind daher nicht enthalten.</div></div> <div class="controls svelte-nd7kvc"><select class="form-control form-control-sm category svelte-nd7kvc" aria-label="Benutzer filtern"></select> <input type="search" class="form-control form-control-sm search svelte-nd7kvc" placeholder="Suchen…" aria-label="Benutzer suchen"/> <div class="export-group svelte-nd7kvc"><button type="button" class="btn btn-sm btn-outline-secondary svelte-nd7kvc" title="Angezeigte Benutzer als CSV-Datei exportieren">CSV-Download</button> <button type="button" class="btn btn-sm btn-outline-secondary svelte-nd7kvc" title="Angezeigte Benutzer als Excel-Datei exportieren">Excel-Download</button></div></div></div> <div class="body svelte-nd7kvc"><div class="table-wrap svelte-nd7kvc"><table class="table table-sm table-hover table-striped svelte-nd7kvc"><thead class="svelte-nd7kvc"><tr><th class="nr svelte-nd7kvc">Nr.</th><th class="svelte-nd7kvc">Name</th><th class="svelte-nd7kvc">Benutzername</th><th class="svelte-nd7kvc">E-Mail</th><th class="svelte-nd7kvc">Typ</th><th class="svelte-nd7kvc">ID</th></tr></thead><tbody></tbody></table></div> <div class="footer svelte-nd7kvc"> </div></div></div>`);

const $$css = {
	hash: 'svelte-nd7kvc',
	code: '.section.svelte-nd7kvc {border:1px solid #dee2e6;border-radius:6px;background:#fff;}.header.svelte-nd7kvc {display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap;padding:10px 12px;border-bottom:1px solid #dee2e6;background:#f8f9fa;border-radius:6px 6px 0 0;}.title.svelte-nd7kvc {font-weight:600;font-size:1.05em;}.stats.svelte-nd7kvc {display:flex;gap:6px;flex-wrap:wrap;margin-top:6px;}.stat.svelte-nd7kvc {font-size:0.8em;font-weight:600;padding:2px 9px;border-radius:10px;background:#e9ecef;color:#495057;}.stat.svelte-nd7kvc strong:where(.svelte-nd7kvc) {font-weight:700;}.stat-paid.svelte-nd7kvc {background:#d1e7dd;color:#0f5132;font-size:0.9em;}.controls.svelte-nd7kvc {display:flex;gap:6px;flex-wrap:wrap;align-items:center;}.category.svelte-nd7kvc {width:auto;flex:0 0 auto;}.search.svelte-nd7kvc {width:220px;flex:0 0 auto;}.export-group.svelte-nd7kvc {display:flex;gap:6px;flex-wrap:nowrap;}.export-group.svelte-nd7kvc button:where(.svelte-nd7kvc) {white-space:nowrap;}.badge-type.svelte-nd7kvc {display:inline-block;font-size:0.75em;font-weight:600;padding:2px 7px;border-radius:10px;margin-right:4px;white-space:nowrap;}.badge-paid.svelte-nd7kvc {background:#d1e7dd;color:#0f5132;}.badge-gws.svelte-nd7kvc {background:#fff3cd;color:#997404;}.body.svelte-nd7kvc {padding:12px;}.table-wrap.svelte-nd7kvc {max-height:65vh;overflow:auto;border:1px solid #dee2e6;border-radius:6px;}table.svelte-nd7kvc {margin:0;font-size:0.9em;}thead.svelte-nd7kvc th:where(.svelte-nd7kvc) {position:sticky;top:0;background:#f8f9fa;border-bottom:1px solid #dee2e6;white-space:nowrap;}td.svelte-nd7kvc {vertical-align:middle;}.nr.svelte-nd7kvc {color:#6c757d;width:3em;text-align:right;}.name.svelte-nd7kvc {font-weight:600;}.id.svelte-nd7kvc {color:#6c757d;font-family:monospace;font-size:0.85em;}.muted.svelte-nd7kvc {color:#adb5bd;font-style:italic;}.footer.svelte-nd7kvc {color:#6c757d;font-size:0.85em;margin-top:8px;}.loading.svelte-nd7kvc {display:flex;align-items:center;gap:10px;color:#6c757d;padding:12px;}.error.svelte-nd7kvc {color:#842029;background:#f8d7da;border:1px solid #f5c2c7;border-radius:6px;padding:10px 12px;}'
};

function UserLicenceOverview($$anchor, $$props) {
	svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.push($$props, true);
	svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.append_styles($$anchor, $$css);

	// Filter-Stand, der ein Neu-Einhängen der Komponente überdauert (siehe
	// mountContent in form.ts) - die Komponente liest ihn beim Start und
	// schreibt Änderungen zurück.
	let filters = svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.prop($$props, 'filters', 7);

	// Bewusst nur der Startwert, danach führt die Komponente den Filter selbst.
	let category = svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.state(svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.proxy((0,svelte__WEBPACK_IMPORTED_MODULE_2__.untrack)(() => filters().category)));

	let term = svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.state(svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.proxy((0,svelte__WEBPACK_IMPORTED_MODULE_2__.untrack)(() => filters().term)));

	svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.user_effect(() => {
		filters().category = svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.get(category);
		filters().term = svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.get(term);
	});

	const users = svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.derived(() => $$props.view.kind === "result" ? (0,_userLicence__WEBPACK_IMPORTED_MODULE_3__.sortUsers)($$props.view.result.users) : []);

	const visibleUsers = svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.derived(() => {
		const filter = _userLicence__WEBPACK_IMPORTED_MODULE_3__.CATEGORY_FILTERS.find((entry) => entry.value === svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.get(category)) ?? _userLicence__WEBPACK_IMPORTED_MODULE_3__.CATEGORY_FILTERS[0];
		const search = svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.get(term).trim().toLowerCase();

		return svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.get(users).filter((user) => filter.matches(user) && (0,_userLicence__WEBPACK_IMPORTED_MODULE_3__.matchesSearch)(user, search));
	});

	function download(format) {
		const count = (0,_userLicence__WEBPACK_IMPORTED_MODULE_3__.exportUsers)(svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.get(visibleUsers), svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.get(category), format);

		$$props.onExported?.(count, format);
	}

	// Enter im Suchfeld darf das dforms-Formular nicht absenden.
	function preventSubmit(event) {
		if (event.key === "Enter") {
			event.preventDefault();
		}
	}

	var fragment = svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.comment();
	var node = svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.first_child(fragment);

	{
		var consequent = ($$anchor) => {
			var div = root();

			svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.append($$anchor, div);
		};

		var consequent_1 = ($$anchor) => {
			var div_1 = root_1();
			var text = svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.sibling(svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.child(div_1));

			svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.reset(div_1);
			svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.template_effect(() => svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.set_text(text, ` ${$$props.view.message ?? ''}`));
			svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.append($$anchor, div_1);
		};

		var alternate_4 = ($$anchor) => {
			var div_2 = root_11();
			var div_3 = svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.child(div_2);
			var div_4 = svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.child(div_3);
			var div_5 = svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.sibling(svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.child(div_4), 2);
			var span = svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.child(div_5);
			var strong = svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.sibling(svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.child(span));
			var text_1 = svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.only_child(strong, true);

			svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.reset(span);

			var span_1 = svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.sibling(span, 2);
			var strong_1 = svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.sibling(svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.child(span_1));
			var text_2 = svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.only_child(strong_1, true);

			svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.reset(span_1);

			var span_2 = svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.sibling(span_1, 2);
			var strong_2 = svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.sibling(svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.child(span_2));
			var text_3 = svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.only_child(strong_2, true);

			svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.reset(span_2);
			svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.reset(div_5);
			svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.next(2);
			svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.reset(div_4);

			var div_6 = svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.sibling(div_4, 2);
			var select = svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.child(div_6);

			svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.each(select, 21, () => _userLicence__WEBPACK_IMPORTED_MODULE_3__.CATEGORY_FILTERS, (filter) => filter.value, ($$anchor, filter) => {
				var option = root_2();
				var text_4 = svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.only_child(option, true);
				var option_value = {};

				svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.template_effect(() => {
					svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.set_text(text_4, svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.get(filter).label);

					if (option_value !== (option_value = svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.get(filter).value)) {
						option.value = (option.__value = option_value) ?? '';
					}
				});

				svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.append($$anchor, option);
			});

			svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.reset(select);
			svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.init_select(select);

			var input = svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.sibling(select, 2);

			svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.remove_input_defaults(input);

			var div_7 = svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.sibling(input, 2);
			var button = svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.child(div_7);
			var button_1 = svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.sibling(button, 2);

			svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.reset(div_7);
			svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.reset(div_6);
			svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.reset(div_3);

			var div_8 = svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.sibling(div_3, 2);
			var div_9 = svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.child(div_8);
			var table = svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.child(div_9);
			var tbody = svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.sibling(svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.child(table));

			svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.each(
				tbody,
				23,
				() => svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.get(visibleUsers),
				(user, index) => user.id || index,
				($$anchor, user, index) => {
					var tr = root_9();
					var td = svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.child(tr);
					var text_5 = svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.only_child(td, true);
					var td_1 = svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.sibling(td);
					var node_1 = svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.child(td_1);

					{
						var consequent_2 = ($$anchor) => {
							var span_3 = root_3();
							var text_6 = svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.only_child(span_3, true);

							svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.template_effect(() => svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.set_text(text_6, svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.get(user).fullName));
							svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.append($$anchor, span_3);
						};

						var alternate = ($$anchor) => {
							var span_4 = root_4();

							svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.append($$anchor, span_4);
						};

						svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__["if"](node_1, ($$render) => {
							if (svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.get(user).fullName) $$render(consequent_2); else $$render(alternate, -1);
						});
					}

					svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.reset(td_1);

					var td_2 = svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.sibling(td_1);
					var node_2 = svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.child(td_2);

					{
						var consequent_3 = ($$anchor) => {
							var text_7 = svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.text();

							svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.template_effect(() => svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.set_text(text_7, svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.get(user).userName));
							svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.append($$anchor, text_7);
						};

						var alternate_1 = ($$anchor) => {
							var span_5 = root_4();

							svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.append($$anchor, span_5);
						};

						svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__["if"](node_2, ($$render) => {
							if (svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.get(user).userName) $$render(consequent_3); else $$render(alternate_1, -1);
						});
					}

					svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.reset(td_2);

					var td_3 = svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.sibling(td_2);
					var node_3 = svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.child(td_3);

					{
						var consequent_4 = ($$anchor) => {
							var a = root_5();
							var text_8 = svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.only_child(a, true);

							svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.template_effect(() => {
								svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.set_attribute(a, 'href', `mailto:${svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.get(user).email ?? ''}`);
								svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.set_text(text_8, svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.get(user).email);
							});

							svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.append($$anchor, a);
						};

						var alternate_2 = ($$anchor) => {
							var span_6 = root_4();

							svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.append($$anchor, span_6);
						};

						svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__["if"](node_3, ($$render) => {
							if (svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.get(user).email) $$render(consequent_4); else $$render(alternate_2, -1);
						});
					}

					svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.reset(td_3);

					var td_4 = svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.sibling(td_3);
					var node_4 = svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.child(td_4);

					{
						var consequent_5 = ($$anchor) => {
							var span_7 = root_6();

							svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.append($$anchor, span_7);
						};

						svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__["if"](node_4, ($$render) => {
							if (svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.get(user).paid) $$render(consequent_5);
						});
					}

					var node_5 = svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.sibling(node_4, 2);

					{
						var consequent_6 = ($$anchor) => {
							var span_8 = root_7();

							svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.append($$anchor, span_8);
						};

						svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__["if"](node_5, ($$render) => {
							if (svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.get(user).gwsDomain) $$render(consequent_6);
						});
					}

					svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.reset(td_4);

					var td_5 = svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.sibling(td_4);
					var node_6 = svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.child(td_5);

					{
						var consequent_7 = ($$anchor) => {
							var span_9 = root_8();
							var text_9 = svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.only_child(span_9, true);

							svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.template_effect(() => svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.set_text(text_9, svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.get(user).id));
							svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.append($$anchor, span_9);
						};

						var alternate_3 = ($$anchor) => {
							var span_10 = root_4();

							svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.append($$anchor, span_10);
						};

						svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__["if"](node_6, ($$render) => {
							if (svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.get(user).id) $$render(consequent_7); else $$render(alternate_3, -1);
						});
					}

					svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.reset(td_5);
					svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.reset(tr);
					svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.template_effect(() => svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.set_text(text_5, svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.get(index) + 1));
					svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.append($$anchor, tr);
				},
				($$anchor) => {
					var tr_1 = root_10();

					svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.append($$anchor, tr_1);
				}
			);

			svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.reset(tbody);
			svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.reset(table);
			svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.reset(div_9);

			var div_10 = svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.sibling(div_9, 2);
			var text_10 = svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.only_child(div_10);

			svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.reset(div_8);
			svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.reset(div_2);

			svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.template_effect(
				($0) => {
					svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.set_text(text_1, $$props.view.result.paid);
					svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.set_text(text_2, $$props.view.result.gwsDomain);
					svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.set_text(text_3, $$props.view.result.total);
					svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.set_text(text_10, `${svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.get(visibleUsers).length ?? ''} von ${svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.get(users).length ?? ''} Benutzern angezeigt · Stand ${$0 ?? ''}`);
				},
				[() => $$props.view.countedAt.toLocaleString("de-DE")]
			);

			svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.bind_select_value(select, () => svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.get(category), ($$value) => svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.set(category, $$value));
			svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.delegated('keydown', input, preventSubmit);
			svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.bind_value(input, () => svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.get(term), ($$value) => svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.set(term, $$value));
			svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.delegated('click', button, () => download("csv"));
			svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.delegated('click', button_1, () => download("xlsx"));
			svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.append($$anchor, div_2);
		};

		svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__["if"](node, ($$render) => {
			if ($$props.view.kind === "loading") $$render(consequent); else if ($$props.view.kind === "error") $$render(consequent_1, 1); else $$render(alternate_4, -1);
		});
	}

	svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.append($$anchor, fragment);
	svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.pop();
}

svelte_internal_client__WEBPACK_IMPORTED_MODULE_1__.delegate(['keydown', 'click']);

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

/***/ "../../helper/scripting/callScriptEndpoint.ts"
/*!****************************************************!*\
  !*** ../../helper/scripting/callScriptEndpoint.ts ***!
  \****************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.callScriptEndpoint = callScriptEndpoint;
const performHttpRequest_1 = __webpack_require__(/*! ../performHttpRequest/performHttpRequest */ "../../helper/performHttpRequest/performHttpRequest.ts");
async function callScriptEndpoint(baseUri, scriptId, method, headers, payload) {
    const url = `${baseUri}/scripting/script/${scriptId}/run`;
    const options = {
        method: method,
        headers: headers,
        body: JSON.stringify(payload),
    };
    return await (0, performHttpRequest_1.performHttpRequest)(url, options);
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

/***/ "./src/forms/form.ts"
/*!***************************!*\
  !*** ./src/forms/form.ts ***!
  \***************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const getAllScripts_1 = __webpack_require__(/*! ../../../../helper/scripting/getAllScripts */ "../../helper/scripting/getAllScripts.ts");
const callScriptEndpoint_1 = __webpack_require__(/*! ../../../../helper/scripting/callScriptEndpoint */ "../../helper/scripting/callScriptEndpoint.ts");
const logger_1 = __webpack_require__(/*! ../../../../helper/utils/logger */ "../../helper/utils/logger.ts");
const svelte_1 = __webpack_require__(/*! svelte */ "./node_modules/svelte/src/index-client.js");
const UserLicenceOverview_svelte_1 = __importDefault(__webpack_require__(/*! ./UserLicenceOverview.svelte */ "./src/forms/UserLicenceOverview.svelte"));
/**
 * Formular-Gegenstück zum User-Lizenz-Zähler-Script (src/scripts/script.ts,
 * siehe dessen Kommentar für die eigentliche Zähl-Logik) - "type": "combined"
 * in toolbox.meta.json sorgt dafür, dass die Toolbox dieses Formular UND das
 * Script als EIN Eintrag gemeinsam anlegt/aktualisiert (siehe
 * rolloutParts in projects/Toolbox/src/forms/form.ts).
 *
 * Das Feld-Layout (nur die Content-Komponente "result") liegt als Code in
 * src/forms/form.json und wird von der Toolbox bei jedem Anlegen/
 * Aktualisieren mit ausgerollt - im Process Studio Formular-Editor muss nichts
 * angelegt werden (Änderungen dort werden beim nächsten Update überschrieben).
 * Die Zählung startet direkt beim Laden des Formulars, das Script liefert ALLE
 * Benutzer als Daten (JSON, mit Kennzeichen @gws.ms/bezahlt), die
 * Darstellung inkl. Filter und Export übernimmt die Svelte-Komponente
 * UserLicenceOverview.svelte, die hier in die Content-Komponente eingehängt wird. Technische (API-)Benutzer liefert
 * /identityprovider/scim/Users gar nicht aus - sie tauchen daher weder in der
 * Liste noch in der Zählung auf und werden hier nicht dargestellt.
 *
 * VERSION_COUNTER unten NICHT umbenennen, der Name ist projektübergreifend
 * fest "VERSION_COUNTER" (siehe generateTargetForms.js) - muss bei einem
 * "combined"-Tool synchron zum VERSION_COUNTER in src/scripts/script.ts
 * bleiben; .github/workflows/publish-bundles.yml stempelt beim Publish in
 * BEIDE Bundles denselben nächsten Stand (nur ins veröffentlichte Bundle - der
 * Wert hier ist ein Platzhalter und wird nicht hochgezählt).
 */
const VERSION_COUNTER = 15;
const logger = (0, logger_1.initLogger)(logger_1.LogLevel.INFO);
// Muss exakt dem Script-Namen in toolbox.meta.json ("scripts[].name") entsprechen - so
// findet die Toolbox das zugehörige Script anhand seines eindeutigen Namens
// (siehe ensureTargetScriptUpToDate/getAllScripts, Scripts vergeben ihre GUID
// serverseitig, es gibt keine feste Id wie bei Formularen).
const SCRIPT_NAME = "User-Lizenz-Zähler";
// Komponenten-Key aus src/forms/form.json.
const resultKey = "result";
function getErrorMessage(error) {
    return error instanceof Error ? error.message : String(error);
}
// Aktuell angezeigter Stand, Filter (überdauern ein Neu-Einhängen) und die
// zuletzt gemountete Svelte-Komponente samt Wurzel-Element.
let currentView;
const filters = { category: "all", term: "" };
let mountedApp;
let mountedRoot;
// Wie in der Toolbox (projects/Toolbox/src/forms/form.ts, getContentHost):
// direkt in das Kind-Element ref="html" der HTML-Element-Komponente rendern
// statt component.content + redraw() - so bleibt Formio's Hülle erhalten.
function getContentHost(form) {
    const component = form.getComponent?.(resultKey);
    if (!component)
        return undefined;
    return component.refs?.html ?? component.element?.querySelector?.('[ref="html"]') ?? component.element ?? undefined;
}
// Hängt die Svelte-Komponente (neu) mit dem aktuellen Stand ein. Wird nur
// beim Wechsel Laden -> Ergebnis/Fehler und nach einem Formio-Redraw
// aufgerufen, Filter/Suche/Export laufen komplett innerhalb der Komponente.
function mountContent(form) {
    if (!currentView)
        return;
    const host = getContentHost(form);
    if (!host) {
        logger.warn(`Komponente "${resultKey}" nicht im Formular gefunden (oder noch nicht gerendert).`);
        return;
    }
    if (mountedApp) {
        (0, svelte_1.unmount)(mountedApp);
        mountedApp = undefined;
    }
    // Eigenes Wurzel-Element statt direkt in den Host: verwirft Formio beim
    // Redraw nur den Inhalt, bleibt der Host verbunden - die Wurzel nicht.
    host.innerHTML = "";
    mountedRoot = host.ownerDocument.createElement("div");
    host.appendChild(mountedRoot);
    mountedApp = (0, svelte_1.mount)(UserLicenceOverview_svelte_1.default, {
        target: mountedRoot,
        props: {
            view: currentView,
            filters,
            onExported: (count, format) => logger.debug(`${count} Benutzer als ${format.toUpperCase()} exportiert.`),
        },
    });
}
function showView(form, view) {
    currentView = view;
    mountContent(form);
}
/**
 * Sucht die Script-Id per Name (siehe SCRIPT_NAME), ruft sie per
 * callScriptEndpoint auf und stellt das Ergebnis in der Content-Komponente
 * "result" dar (siehe showView) - dieselbe Browser-Session (window.location.origin) wie bei
 * allen anderen dforms/Scripting-Aufrufen der Toolbox-Familie, ein API-Key
 * ist dafür nicht nötig.
 */
async function runUserLicenceCounter(form) {
    showView(form, { kind: "loading" });
    try {
        const baseUri = window.location.origin;
        const allScripts = await (0, getAllScripts_1.getAllScripts)(baseUri, "");
        const script = allScripts.body.find((s) => s.name === SCRIPT_NAME);
        if (!script?.id) {
            throw new Error(`Script "${SCRIPT_NAME}" wurde nicht gefunden - wurde es bereits über die Toolbox angelegt?`);
        }
        const response = await (0, callScriptEndpoint_1.callScriptEndpoint)(baseUri, script.id, "POST", { "Content-Type": "application/json" }, {});
        if (typeof response.body === "string" || !Array.isArray(response.body?.users) || typeof response.body.paid !== "number") {
            // Ältere Script-Version (fertiges HTML bzw. noch ohne Typ-Kennzeichen) - Formular
            // und Script sollten über die Toolbox gemeinsam aktualisiert werden.
            throw new Error(`Unerwartete Antwort von Script "${SCRIPT_NAME}" - bitte das Script über die Toolbox aktualisieren.`);
        }
        showView(form, { kind: "result", result: response.body, countedAt: new Date() });
    }
    catch (error) {
        logger.error(`Fehler beim Ausführen von "${SCRIPT_NAME}": ${getErrorMessage(error)}`);
        showView(form, { kind: "error", message: getErrorMessage(error) });
    }
}
window.formInit = function (form, data) {
    logger.debug("User-Lizenz-Zähler-Formular initialisiert.");
    // Zeichnet Formio die Komponente neu (oder war sie beim Init noch nicht
    // gerendert), ist unser Inhalt weg - dann einfach erneut einhängen.
    form.on?.("render", () => {
        if (currentView && !mountedRoot?.isConnected) {
            mountContent(form);
        }
    });
    runUserLicenceCounter(form);
};


/***/ },

/***/ "./src/forms/userLicence.ts"
/*!**********************************!*\
  !*** ./src/forms/userLicence.ts ***!
  \**********************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CATEGORY_FILTERS = void 0;
exports.sortUsers = sortUsers;
exports.matchesSearch = matchesSearch;
exports.exportUsers = exportUsers;
const tableExport_1 = __webpack_require__(/*! ../../../../helper/utils/tableExport */ "../../helper/utils/tableExport.ts");
// Werte des Filter-Selects mit der Bedingung, die ein Benutzer dafür erfüllen muss.
exports.CATEGORY_FILTERS = [
    { value: "all", label: "Alle Benutzer", matches: () => true },
    { value: "paid", label: "Bezahlte Benutzer", matches: (user) => user.paid },
    { value: "gws", label: "Administrative Benutzer", matches: (user) => user.gwsDomain },
];
// Bezahlte Benutzer zuerst, innerhalb davon nach Name sortiert.
function sortUsers(users) {
    return [...users].sort((a, b) => Number(b.paid) - Number(a.paid) ||
        (a.fullName || a.userName).localeCompare(b.fullName || b.userName, "de"));
}
// Alles, wonach das Suchfeld filtern kann.
function matchesSearch(user, term) {
    return !term || [user.fullName, user.userName, user.email, user.id].join(" ").toLowerCase().includes(term);
}
function yesNo(value) {
    return value ? "Ja" : "Nein";
}
// Exportiert genau die übergebenen (= aktuell sichtbaren) Benutzer in der
// angezeigten Reihenfolge und Nummerierung.
function exportUsers(users, category, format) {
    const table = {
        headers: ["Nr.", "Name", "Benutzername", "E-Mail", "Bezahlt", "Administrativ", "ID"],
        rows: users.map((user, index) => [
            index + 1,
            user.fullName,
            user.userName,
            user.email,
            yesNo(user.paid),
            yesNo(user.gwsDomain),
            user.id,
        ]),
    };
    const categoryLabel = exports.CATEGORY_FILTERS.find((filter) => filter.value === category)?.label ?? "Benutzer";
    const date = new Date().toISOString().slice(0, 10);
    // z.B. "Ellinger_Bezahlte_Benutzer_2026-09-25" (Mandant aus dem Hostnamen).
    const baseName = [(0, tableExport_1.getTenantName)(), categoryLabel, date]
        .filter(Boolean)
        .join("_")
        .replace(/[^\wäöüÄÖÜß-]+/g, "_");
    if (format === "csv") {
        (0, tableExport_1.downloadBlob)((0, tableExport_1.toCsv)(table), `${baseName}.csv`);
    }
    else {
        (0, tableExport_1.downloadBlob)((0, tableExport_1.toXlsx)(table, categoryLabel), `${baseName}.xlsx`);
    }
    return table.rows.length;
}


/***/ },

/***/ "./node_modules/clsx/dist/clsx.mjs"
/*!*****************************************!*\
  !*** ./node_modules/clsx/dist/clsx.mjs ***!
  \*****************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   clsx: () => (/* binding */ clsx),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function r(e){var t,f,n="";if("string"==typeof e||"number"==typeof e)n+=e;else if("object"==typeof e)if(Array.isArray(e)){var o=e.length;for(t=0;t<o;t++)e[t]&&(f=r(e[t]))&&(n&&(n+=" "),n+=f)}else for(f in e)e[f]&&(n&&(n+=" "),n+=f);return n}function clsx(){for(var e,t,f=0,n="",o=arguments.length;f<o;f++)(e=arguments[f])&&(t=r(e))&&(n&&(n+=" "),n+=t);return n}/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (clsx);

/***/ },

/***/ "./node_modules/esm-env/dev-fallback.js"
/*!**********************************************!*\
  !*** ./node_modules/esm-env/dev-fallback.js ***!
  \**********************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const node_env = globalThis.process?.env?.NODE_ENV;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (node_env && !node_env.toLowerCase().startsWith('prod'));


/***/ },

/***/ "./node_modules/esm-env/false.js"
/*!***************************************!*\
  !*** ./node_modules/esm-env/false.js ***!
  \***************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (false);


/***/ },

/***/ "./node_modules/esm-env/index.js"
/*!***************************************!*\
  !*** ./node_modules/esm-env/index.js ***!
  \***************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BROWSER: () => (/* reexport safe */ esm_env_browser__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   DEV: () => (/* reexport safe */ esm_env_development__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   NODE: () => (/* reexport safe */ esm_env_node__WEBPACK_IMPORTED_MODULE_2__["default"])
/* harmony export */ });
/* harmony import */ var esm_env_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! esm-env/browser */ "./node_modules/esm-env/true.js");
/* harmony import */ var esm_env_development__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! esm-env/development */ "./node_modules/esm-env/dev-fallback.js");
/* harmony import */ var esm_env_node__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! esm-env/node */ "./node_modules/esm-env/false.js");





/***/ },

/***/ "./node_modules/esm-env/true.js"
/*!**************************************!*\
  !*** ./node_modules/esm-env/true.js ***!
  \**************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (true);


/***/ },

/***/ "./node_modules/svelte/src/attachments/index.js"
/*!******************************************************!*\
  !*** ./node_modules/svelte/src/attachments/index.js ***!
  \******************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createAttachmentKey: () => (/* binding */ createAttachmentKey),
/* harmony export */   fromAction: () => (/* binding */ fromAction)
/* harmony export */ });
/* harmony import */ var svelte_internal_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal/client */ "./node_modules/svelte/src/internal/client/index.js");
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants.js */ "./node_modules/svelte/src/constants.js");
/* harmony import */ var _index_client_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../index-client.js */ "./node_modules/svelte/src/index-client.js");
/* harmony import */ var _internal_client_reactivity_effects_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../internal/client/reactivity/effects.js */ "./node_modules/svelte/src/internal/client/reactivity/effects.js");
/** @import { Action, ActionReturn } from '../action/public' */
/** @import { Attachment } from './public' */





/**
 * Creates an object key that will be recognised as an attachment when the object is spread onto an element,
 * as a programmatic alternative to using `{@attach ...}`. This can be useful for library authors, though
 * is generally not needed when building an app.
 *
 * ```svelte
 * <script>
 * 	import { createAttachmentKey } from 'svelte/attachments';
 *
 * 	const props = {
 * 		class: 'cool',
 * 		onclick: () => alert('clicked'),
 * 		[createAttachmentKey()]: (node) => {
 * 			node.textContent = 'attached!';
 * 		}
 * 	};
 * </script>
 *
 * <button {...props}>click me</button>
 * ```
 * @since 5.29
 */
function createAttachmentKey() {
	return Symbol(_constants_js__WEBPACK_IMPORTED_MODULE_1__.ATTACHMENT_KEY);
}

/**
 * Converts an [action](https://svelte.dev/docs/svelte/use) into an [attachment](https://svelte.dev/docs/svelte/@attach) keeping the same behavior.
 * It's useful if you want to start using attachments on components but you have actions provided by a library.
 *
 * Note that the second argument, if provided, must be a function that _returns_ the argument to the
 * action function, not the argument itself.
 *
 * ```svelte
 * <!-- with an action -->
 * <div use:foo={bar}>...</div>
 *
 * <!-- with an attachment -->
 * <div {@attach fromAction(foo, () => bar)}>...</div>
 * ```
 * @template {EventTarget} E
 * @template {unknown} T
 * @overload
 * @param {Action<E, T> | ((element: E, arg: T) => void | ActionReturn<T>)} action The action function
 * @param {() => T} fn A function that returns the argument for the action
 * @returns {Attachment<E>}
 */
/**
 * Converts an [action](https://svelte.dev/docs/svelte/use) into an [attachment](https://svelte.dev/docs/svelte/@attach) keeping the same behavior.
 * It's useful if you want to start using attachments on components but you have actions provided by a library.
 *
 * Note that the second argument, if provided, must be a function that _returns_ the argument to the
 * action function, not the argument itself.
 *
 * ```svelte
 * <!-- with an action -->
 * <div use:foo={bar}>...</div>
 *
 * <!-- with an attachment -->
 * <div {@attach fromAction(foo, () => bar)}>...</div>
 * ```
 * @template {EventTarget} E
 * @overload
 * @param {Action<E, void> | ((element: E) => void | ActionReturn<void>)} action The action function
 * @returns {Attachment<E>}
 */
/**
 * Converts an [action](https://svelte.dev/docs/svelte/use) into an [attachment](https://svelte.dev/docs/svelte/@attach) keeping the same behavior.
 * It's useful if you want to start using attachments on components but you have actions provided by a library.
 *
 * Note that the second argument, if provided, must be a function that _returns_ the argument to the
 * action function, not the argument itself.
 *
 * ```svelte
 * <!-- with an action -->
 * <div use:foo={bar}>...</div>
 *
 * <!-- with an attachment -->
 * <div {@attach fromAction(foo, () => bar)}>...</div>
 * ```
 *
 * @template {EventTarget} E
 * @template {unknown} T
 * @param {Action<E, T> | ((element: E, arg: T) => void | ActionReturn<T>)} action The action function
 * @param {() => T} fn A function that returns the argument for the action
 * @returns {Attachment<E>}
 * @since 5.32
 */
function fromAction(action, fn = /** @type {() => T} */ (svelte_internal_client__WEBPACK_IMPORTED_MODULE_0__.noop)) {
	return (element) => {
		const { update, destroy } = (0,_index_client_js__WEBPACK_IMPORTED_MODULE_2__.untrack)(() => action(element, fn()) ?? {});

		if (update) {
			var ran = false;
			(0,svelte_internal_client__WEBPACK_IMPORTED_MODULE_0__.render_effect)(() => {
				const arg = fn();
				if (ran) update(arg);
			});
			ran = true;
		}

		if (destroy) {
			(0,_internal_client_reactivity_effects_js__WEBPACK_IMPORTED_MODULE_3__.teardown)(destroy);
		}
	};
}


/***/ },

/***/ "./node_modules/svelte/src/constants.js"
/*!**********************************************!*\
  !*** ./node_modules/svelte/src/constants.js ***!
  \**********************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ATTACHMENT_KEY: () => (/* binding */ ATTACHMENT_KEY),
/* harmony export */   EACH_INDEX_REACTIVE: () => (/* binding */ EACH_INDEX_REACTIVE),
/* harmony export */   EACH_IS_ANIMATED: () => (/* binding */ EACH_IS_ANIMATED),
/* harmony export */   EACH_IS_CONTROLLED: () => (/* binding */ EACH_IS_CONTROLLED),
/* harmony export */   EACH_ITEM_IMMUTABLE: () => (/* binding */ EACH_ITEM_IMMUTABLE),
/* harmony export */   EACH_ITEM_REACTIVE: () => (/* binding */ EACH_ITEM_REACTIVE),
/* harmony export */   ELEMENTS_WITHOUT_TEXT: () => (/* binding */ ELEMENTS_WITHOUT_TEXT),
/* harmony export */   ELEMENT_IS_INPUT: () => (/* binding */ ELEMENT_IS_INPUT),
/* harmony export */   ELEMENT_IS_NAMESPACED: () => (/* binding */ ELEMENT_IS_NAMESPACED),
/* harmony export */   ELEMENT_PRESERVE_ATTRIBUTE_CASE: () => (/* binding */ ELEMENT_PRESERVE_ATTRIBUTE_CASE),
/* harmony export */   FILENAME: () => (/* binding */ FILENAME),
/* harmony export */   HMR: () => (/* binding */ HMR),
/* harmony export */   HYDRATION_END: () => (/* binding */ HYDRATION_END),
/* harmony export */   HYDRATION_ERROR: () => (/* binding */ HYDRATION_ERROR),
/* harmony export */   HYDRATION_START: () => (/* binding */ HYDRATION_START),
/* harmony export */   HYDRATION_START_ELSE: () => (/* binding */ HYDRATION_START_ELSE),
/* harmony export */   HYDRATION_START_FAILED: () => (/* binding */ HYDRATION_START_FAILED),
/* harmony export */   IGNORABLE_RUNTIME_WARNINGS: () => (/* binding */ IGNORABLE_RUNTIME_WARNINGS),
/* harmony export */   NAMESPACE_HTML: () => (/* binding */ NAMESPACE_HTML),
/* harmony export */   NAMESPACE_MATHML: () => (/* binding */ NAMESPACE_MATHML),
/* harmony export */   NAMESPACE_SVG: () => (/* binding */ NAMESPACE_SVG),
/* harmony export */   PROPS_IS_BINDABLE: () => (/* binding */ PROPS_IS_BINDABLE),
/* harmony export */   PROPS_IS_IMMUTABLE: () => (/* binding */ PROPS_IS_IMMUTABLE),
/* harmony export */   PROPS_IS_LAZY_INITIAL: () => (/* binding */ PROPS_IS_LAZY_INITIAL),
/* harmony export */   PROPS_IS_RUNES: () => (/* binding */ PROPS_IS_RUNES),
/* harmony export */   PROPS_IS_UPDATED: () => (/* binding */ PROPS_IS_UPDATED),
/* harmony export */   TEMPLATE_FRAGMENT: () => (/* binding */ TEMPLATE_FRAGMENT),
/* harmony export */   TEMPLATE_USE_IMPORT_NODE: () => (/* binding */ TEMPLATE_USE_IMPORT_NODE),
/* harmony export */   TEMPLATE_USE_MATHML: () => (/* binding */ TEMPLATE_USE_MATHML),
/* harmony export */   TEMPLATE_USE_SVG: () => (/* binding */ TEMPLATE_USE_SVG),
/* harmony export */   TRANSITION_GLOBAL: () => (/* binding */ TRANSITION_GLOBAL),
/* harmony export */   TRANSITION_IN: () => (/* binding */ TRANSITION_IN),
/* harmony export */   TRANSITION_OUT: () => (/* binding */ TRANSITION_OUT),
/* harmony export */   UNINITIALIZED: () => (/* binding */ UNINITIALIZED)
/* harmony export */ });
const EACH_ITEM_REACTIVE = 1;
const EACH_INDEX_REACTIVE = 1 << 1;
/** See EachBlock interface metadata.is_controlled for an explanation what this is */
const EACH_IS_CONTROLLED = 1 << 2;
const EACH_IS_ANIMATED = 1 << 3;
const EACH_ITEM_IMMUTABLE = 1 << 4;

const PROPS_IS_IMMUTABLE = 1;
const PROPS_IS_RUNES = 1 << 1;
const PROPS_IS_UPDATED = 1 << 2;
const PROPS_IS_BINDABLE = 1 << 3;
const PROPS_IS_LAZY_INITIAL = 1 << 4;

const TRANSITION_IN = 1;
const TRANSITION_OUT = 1 << 1;
const TRANSITION_GLOBAL = 1 << 2;

const TEMPLATE_FRAGMENT = 1;
const TEMPLATE_USE_IMPORT_NODE = 1 << 1;
const TEMPLATE_USE_SVG = 1 << 2;
const TEMPLATE_USE_MATHML = 1 << 3;

const HYDRATION_START = '[';
/** used to indicate that an `{:else}...` block was rendered */
const HYDRATION_START_ELSE = '[!';
/** used to indicate that a boundary's `failed` snippet was rendered on the server */
const HYDRATION_START_FAILED = '[?';
const HYDRATION_END = ']';
const HYDRATION_ERROR = {};

const ELEMENT_IS_NAMESPACED = 1;
const ELEMENT_PRESERVE_ATTRIBUTE_CASE = 1 << 1;
const ELEMENT_IS_INPUT = 1 << 2;

const UNINITIALIZED = Symbol('uninitialized');

// Dev-time component properties
const FILENAME = Symbol('filename');
const HMR = Symbol('hmr');

const NAMESPACE_HTML = 'http://www.w3.org/1999/xhtml';
const NAMESPACE_SVG = 'http://www.w3.org/2000/svg';
const NAMESPACE_MATHML = 'http://www.w3.org/1998/Math/MathML';

// we use a list of ignorable runtime warnings because not every runtime warning
// can be ignored and we want to keep the validation for svelte-ignore in place
const IGNORABLE_RUNTIME_WARNINGS = /** @type {const} */ ([
	'await_waterfall',
	'await_reactivity_loss',
	'state_snapshot_uncloneable',
	'binding_property_non_reactive',
	'hydration_attribute_changed',
	'hydration_html_changed',
	'ownership_invalid_binding',
	'ownership_invalid_mutation'
]);

/**
 * Whitespace inside one of these elements will not result in
 * a whitespace node being created in any circumstances. (This
 * list is almost certainly very incomplete)
 * TODO this is currently unused
 */
const ELEMENTS_WITHOUT_TEXT = ['audio', 'datalist', 'dl', 'optgroup', 'select', 'video'];

const ATTACHMENT_KEY = '@attach';


/***/ },

/***/ "./node_modules/svelte/src/escaping.js"
/*!*********************************************!*\
  !*** ./node_modules/svelte/src/escaping.js ***!
  \*********************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   escape_html: () => (/* binding */ escape_html)
/* harmony export */ });
const ATTR_REGEX = /[&"<]/g;
const CONTENT_REGEX = /[&<]/g;

/**
 * @template V
 * @param {V} value
 * @param {boolean} [is_attr]
 */
function escape_html(value, is_attr) {
	const str = String(value ?? '');

	const pattern = is_attr ? ATTR_REGEX : CONTENT_REGEX;
	pattern.lastIndex = 0;

	let escaped = '';
	let last = 0;

	while (pattern.test(str)) {
		const i = pattern.lastIndex - 1;
		const ch = str[i];
		escaped += str.substring(last, i) + (ch === '&' ? '&amp;' : ch === '"' ? '&quot;' : '&lt;');
		last = i + 1;
	}

	return escaped + str.substring(last);
}


/***/ },

/***/ "./node_modules/svelte/src/index-client.js"
/*!*************************************************!*\
  !*** ./node_modules/svelte/src/index-client.js ***!
  \*************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   afterUpdate: () => (/* binding */ afterUpdate),
/* harmony export */   beforeUpdate: () => (/* binding */ beforeUpdate),
/* harmony export */   createContext: () => (/* reexport safe */ _internal_client_context_js__WEBPACK_IMPORTED_MODULE_5__.createContext),
/* harmony export */   createEventDispatcher: () => (/* binding */ createEventDispatcher),
/* harmony export */   createRawSnippet: () => (/* reexport safe */ _internal_client_dom_blocks_snippet_js__WEBPACK_IMPORTED_MODULE_10__.createRawSnippet),
/* harmony export */   flushSync: () => (/* reexport safe */ _internal_client_reactivity_batch_js__WEBPACK_IMPORTED_MODULE_7__.flushSync),
/* harmony export */   fork: () => (/* reexport safe */ _internal_client_reactivity_batch_js__WEBPACK_IMPORTED_MODULE_7__.fork),
/* harmony export */   getAbortSignal: () => (/* binding */ getAbortSignal),
/* harmony export */   getAllContexts: () => (/* reexport safe */ _internal_client_context_js__WEBPACK_IMPORTED_MODULE_5__.getAllContexts),
/* harmony export */   getContext: () => (/* reexport safe */ _internal_client_context_js__WEBPACK_IMPORTED_MODULE_5__.getContext),
/* harmony export */   hasContext: () => (/* reexport safe */ _internal_client_context_js__WEBPACK_IMPORTED_MODULE_5__.hasContext),
/* harmony export */   hydratable: () => (/* reexport safe */ _internal_client_hydratable_js__WEBPACK_IMPORTED_MODULE_8__.hydratable),
/* harmony export */   hydrate: () => (/* reexport safe */ _internal_client_render_js__WEBPACK_IMPORTED_MODULE_9__.hydrate),
/* harmony export */   mount: () => (/* reexport safe */ _internal_client_render_js__WEBPACK_IMPORTED_MODULE_9__.mount),
/* harmony export */   onDestroy: () => (/* binding */ onDestroy),
/* harmony export */   onMount: () => (/* binding */ onMount),
/* harmony export */   setContext: () => (/* reexport safe */ _internal_client_context_js__WEBPACK_IMPORTED_MODULE_5__.setContext),
/* harmony export */   settled: () => (/* reexport safe */ _internal_client_runtime_js__WEBPACK_IMPORTED_MODULE_0__.settled),
/* harmony export */   tick: () => (/* reexport safe */ _internal_client_runtime_js__WEBPACK_IMPORTED_MODULE_0__.tick),
/* harmony export */   unmount: () => (/* reexport safe */ _internal_client_render_js__WEBPACK_IMPORTED_MODULE_9__.unmount),
/* harmony export */   untrack: () => (/* reexport safe */ _internal_client_runtime_js__WEBPACK_IMPORTED_MODULE_0__.untrack)
/* harmony export */ });
/* harmony import */ var _internal_client_runtime_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/client/runtime.js */ "./node_modules/svelte/src/internal/client/runtime.js");
/* harmony import */ var _internal_shared_utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/shared/utils.js */ "./node_modules/svelte/src/internal/shared/utils.js");
/* harmony import */ var _internal_client_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/client/index.js */ "./node_modules/svelte/src/internal/client/index.js");
/* harmony import */ var _internal_client_errors_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./internal/client/errors.js */ "./node_modules/svelte/src/internal/client/errors.js");
/* harmony import */ var _internal_flags_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./internal/flags/index.js */ "./node_modules/svelte/src/internal/flags/index.js");
/* harmony import */ var _internal_client_context_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./internal/client/context.js */ "./node_modules/svelte/src/internal/client/context.js");
/* harmony import */ var esm_env__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! esm-env */ "./node_modules/esm-env/index.js");
/* harmony import */ var _internal_client_reactivity_batch_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./internal/client/reactivity/batch.js */ "./node_modules/svelte/src/internal/client/reactivity/batch.js");
/* harmony import */ var _internal_client_hydratable_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./internal/client/hydratable.js */ "./node_modules/svelte/src/internal/client/hydratable.js");
/* harmony import */ var _internal_client_render_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./internal/client/render.js */ "./node_modules/svelte/src/internal/client/render.js");
/* harmony import */ var _internal_client_dom_blocks_snippet_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./internal/client/dom/blocks/snippet.js */ "./node_modules/svelte/src/internal/client/dom/blocks/snippet.js");
/** @import { ComponentContext, ComponentContextLegacy } from '#client' */
/** @import { EventDispatcher } from './index.js' */
/** @import { NotFunction } from './internal/types.js' */








if (esm_env__WEBPACK_IMPORTED_MODULE_6__.DEV) {
	/**
	 * @param {string} rune
	 */
	function throw_rune_error(rune) {
		if (!(rune in globalThis)) {
			// TODO if people start adjusting the "this can contain runes" config through v-p-s more, adjust this message
			/** @type {any} */
			let value; // let's hope noone modifies this global, but belts and braces
			Object.defineProperty(globalThis, rune, {
				configurable: true,
				// eslint-disable-next-line getter-return
				get: () => {
					if (value !== undefined) {
						return value;
					}

					_internal_client_errors_js__WEBPACK_IMPORTED_MODULE_3__.rune_outside_svelte(rune);
				},
				set: (v) => {
					value = v;
				}
			});
		}
	}

	throw_rune_error('$state');
	throw_rune_error('$effect');
	throw_rune_error('$derived');
	throw_rune_error('$inspect');
	throw_rune_error('$props');
	throw_rune_error('$bindable');
}

/**
 * Returns an [`AbortSignal`](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal) that aborts when the current [derived](https://svelte.dev/docs/svelte/$derived) or [effect](https://svelte.dev/docs/svelte/$effect) re-runs or is destroyed.
 *
 * Must be called while a derived or effect is running.
 *
 * ```svelte
 * <script>
 * 	import { getAbortSignal } from 'svelte';
 *
 * 	let { id } = $props();
 *
 * 	async function getData(id) {
 * 		const response = await fetch(`/items/${id}`, {
 * 			signal: getAbortSignal()
 * 		});
 *
 * 		return await response.json();
 * 	}
 *
 * 	const data = $derived(await getData(id));
 * </script>
 * ```
 */
function getAbortSignal() {
	if (_internal_client_runtime_js__WEBPACK_IMPORTED_MODULE_0__.active_reaction === null) {
		_internal_client_errors_js__WEBPACK_IMPORTED_MODULE_3__.get_abort_signal_outside_reaction();
	}

	return (_internal_client_runtime_js__WEBPACK_IMPORTED_MODULE_0__.active_reaction.ac ??= new AbortController()).signal;
}

/**
 * `onMount`, like [`$effect`](https://svelte.dev/docs/svelte/$effect), schedules a function to run as soon as the component has been mounted to the DOM.
 * Unlike `$effect`, the provided function only runs once.
 *
 * It must be called during the component's initialisation (but doesn't need to live _inside_ the component;
 * it can be called from an external module). If a function is returned _synchronously_ from `onMount`,
 * it will be called when the component is unmounted.
 *
 * `onMount` functions do not run during [server-side rendering](https://svelte.dev/docs/svelte/svelte-server#render).
 *
 * @template T
 * @param {() => NotFunction<T> | Promise<NotFunction<T>> | (() => any)} fn
 * @returns {void}
 */
function onMount(fn) {
	if (_internal_client_context_js__WEBPACK_IMPORTED_MODULE_5__.component_context === null) {
		_internal_client_errors_js__WEBPACK_IMPORTED_MODULE_3__.lifecycle_outside_component('onMount');
	}

	if (_internal_flags_index_js__WEBPACK_IMPORTED_MODULE_4__.legacy_mode_flag && _internal_client_context_js__WEBPACK_IMPORTED_MODULE_5__.component_context.l !== null) {
		init_update_callbacks(_internal_client_context_js__WEBPACK_IMPORTED_MODULE_5__.component_context).m.push(fn);
	} else {
		(0,_internal_client_index_js__WEBPACK_IMPORTED_MODULE_2__.user_effect)(() => {
			const cleanup = (0,_internal_client_runtime_js__WEBPACK_IMPORTED_MODULE_0__.untrack)(fn);
			if (typeof cleanup === 'function') return /** @type {() => void} */ (cleanup);
		});
	}
}

/**
 * Schedules a callback to run immediately before the component is unmounted.
 *
 * Out of `onMount`, `beforeUpdate`, `afterUpdate` and `onDestroy`, this is the
 * only one that runs inside a server-side component.
 *
 * @param {() => any} fn
 * @returns {void}
 */
function onDestroy(fn) {
	if (_internal_client_context_js__WEBPACK_IMPORTED_MODULE_5__.component_context === null) {
		_internal_client_errors_js__WEBPACK_IMPORTED_MODULE_3__.lifecycle_outside_component('onDestroy');
	}

	onMount(() => () => (0,_internal_client_runtime_js__WEBPACK_IMPORTED_MODULE_0__.untrack)(fn));
}

/**
 * @template [T=any]
 * @param {string} type
 * @param {T} [detail]
 * @param {any}params_0
 * @returns {CustomEvent<T>}
 */
function create_custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
	return new CustomEvent(type, { detail, bubbles, cancelable });
}

/**
 * Creates an event dispatcher that can be used to dispatch [component events](https://svelte.dev/docs/svelte/legacy-on#Component-events).
 * Event dispatchers are functions that can take two arguments: `name` and `detail`.
 *
 * Component events created with `createEventDispatcher` create a
 * [CustomEvent](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent).
 * These events do not [bubble](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events#Event_bubbling_and_capture).
 * The `detail` argument corresponds to the [CustomEvent.detail](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/detail)
 * property and can contain any type of data.
 *
 * The event dispatcher can be typed to narrow the allowed event names and the type of the `detail` argument:
 * ```ts
 * const dispatch = createEventDispatcher<{
 *  loaded: null; // does not take a detail argument
 *  change: string; // takes a detail argument of type string, which is required
 *  optional: number | null; // takes an optional detail argument of type number
 * }>();
 * ```
 *
 * @deprecated Use callback props and/or the `$host()` rune instead — see [migration guide](https://svelte.dev/docs/svelte/v5-migration-guide#Event-changes-Component-events)
 * @template {Record<string, any>} [EventMap = any]
 * @returns {EventDispatcher<EventMap>}
 */
function createEventDispatcher() {
	const active_component_context = _internal_client_context_js__WEBPACK_IMPORTED_MODULE_5__.component_context;
	if (active_component_context === null) {
		_internal_client_errors_js__WEBPACK_IMPORTED_MODULE_3__.lifecycle_outside_component('createEventDispatcher');
	}

	/**
	 * @param [detail]
	 * @param [options]
	 */
	return (type, detail, options) => {
		const events = /** @type {Record<string, Function | Function[]>} */ (
			active_component_context.s.$$events
		)?.[/** @type {string} */ (type)];

		if (events) {
			const callbacks = (0,_internal_shared_utils_js__WEBPACK_IMPORTED_MODULE_1__.is_array)(events) ? events.slice() : [events];
			// TODO are there situations where events could be dispatched
			// in a server (non-DOM) environment?
			const event = create_custom_event(/** @type {string} */ (type), detail, options);
			for (const fn of callbacks) {
				fn.call(active_component_context.x, event);
			}
			return !event.defaultPrevented;
		}

		return true;
	};
}

// TODO mark beforeUpdate and afterUpdate as deprecated in Svelte 6

/**
 * Schedules a callback to run immediately before the component is updated after any state change.
 *
 * The first time the callback runs will be before the initial `onMount`.
 *
 * In runes mode use `$effect.pre` instead.
 *
 * @deprecated Use [`$effect.pre`](https://svelte.dev/docs/svelte/$effect#$effect.pre) instead
 * @param {() => void} fn
 * @returns {void}
 */
function beforeUpdate(fn) {
	if (_internal_client_context_js__WEBPACK_IMPORTED_MODULE_5__.component_context === null) {
		_internal_client_errors_js__WEBPACK_IMPORTED_MODULE_3__.lifecycle_outside_component('beforeUpdate');
	}

	if (_internal_client_context_js__WEBPACK_IMPORTED_MODULE_5__.component_context.l === null) {
		_internal_client_errors_js__WEBPACK_IMPORTED_MODULE_3__.lifecycle_legacy_only('beforeUpdate');
	}

	init_update_callbacks(_internal_client_context_js__WEBPACK_IMPORTED_MODULE_5__.component_context).b.push(fn);
}

/**
 * Schedules a callback to run immediately after the component has been updated.
 *
 * The first time the callback runs will be after the initial `onMount`.
 *
 * In runes mode use `$effect` instead.
 *
 * @deprecated Use [`$effect`](https://svelte.dev/docs/svelte/$effect) instead
 * @param {() => void} fn
 * @returns {void}
 */
function afterUpdate(fn) {
	if (_internal_client_context_js__WEBPACK_IMPORTED_MODULE_5__.component_context === null) {
		_internal_client_errors_js__WEBPACK_IMPORTED_MODULE_3__.lifecycle_outside_component('afterUpdate');
	}

	if (_internal_client_context_js__WEBPACK_IMPORTED_MODULE_5__.component_context.l === null) {
		_internal_client_errors_js__WEBPACK_IMPORTED_MODULE_3__.lifecycle_legacy_only('afterUpdate');
	}

	init_update_callbacks(_internal_client_context_js__WEBPACK_IMPORTED_MODULE_5__.component_context).a.push(fn);
}

/**
 * Legacy-mode: Init callbacks object for onMount/beforeUpdate/afterUpdate
 * @param {ComponentContext} context
 */
function init_update_callbacks(context) {
	var l = /** @type {ComponentContextLegacy} */ (context).l;
	return (l.u ??= { a: [], b: [], m: [] });
}









/***/ },

/***/ "./node_modules/svelte/src/internal/client/constants.js"
/*!**************************************************************!*\
  !*** ./node_modules/svelte/src/internal/client/constants.js ***!
  \**************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ASYNC: () => (/* binding */ ASYNC),
/* harmony export */   ATTRIBUTES_CACHE: () => (/* binding */ ATTRIBUTES_CACHE),
/* harmony export */   BLOCK_EFFECT: () => (/* binding */ BLOCK_EFFECT),
/* harmony export */   BOUNDARY_EFFECT: () => (/* binding */ BOUNDARY_EFFECT),
/* harmony export */   BRANCH_EFFECT: () => (/* binding */ BRANCH_EFFECT),
/* harmony export */   CLASS_CACHE: () => (/* binding */ CLASS_CACHE),
/* harmony export */   CLEAN: () => (/* binding */ CLEAN),
/* harmony export */   COMMENT_NODE: () => (/* binding */ COMMENT_NODE),
/* harmony export */   COMPONENT_SYMBOL: () => (/* binding */ COMPONENT_SYMBOL),
/* harmony export */   CONNECTED: () => (/* binding */ CONNECTED),
/* harmony export */   DERIVED: () => (/* binding */ DERIVED),
/* harmony export */   DESTROYED: () => (/* binding */ DESTROYED),
/* harmony export */   DESTROYING: () => (/* binding */ DESTROYING),
/* harmony export */   DIRTY: () => (/* binding */ DIRTY),
/* harmony export */   DOCUMENT_FRAGMENT_NODE: () => (/* binding */ DOCUMENT_FRAGMENT_NODE),
/* harmony export */   EAGER_EFFECT: () => (/* binding */ EAGER_EFFECT),
/* harmony export */   EFFECT: () => (/* binding */ EFFECT),
/* harmony export */   EFFECT_OFFSCREEN: () => (/* binding */ EFFECT_OFFSCREEN),
/* harmony export */   EFFECT_PRESERVED: () => (/* binding */ EFFECT_PRESERVED),
/* harmony export */   EFFECT_TRANSPARENT: () => (/* binding */ EFFECT_TRANSPARENT),
/* harmony export */   ELEMENT_NODE: () => (/* binding */ ELEMENT_NODE),
/* harmony export */   ERROR_VALUE: () => (/* binding */ ERROR_VALUE),
/* harmony export */   FORM_RESET_HANDLER: () => (/* binding */ FORM_RESET_HANDLER),
/* harmony export */   HEAD_EFFECT: () => (/* binding */ HEAD_EFFECT),
/* harmony export */   HMR_ANCHOR: () => (/* binding */ HMR_ANCHOR),
/* harmony export */   INERT: () => (/* binding */ INERT),
/* harmony export */   IS_XHTML: () => (/* binding */ IS_XHTML),
/* harmony export */   LEGACY_PROPS: () => (/* binding */ LEGACY_PROPS),
/* harmony export */   LOADING_ATTR_SYMBOL: () => (/* binding */ LOADING_ATTR_SYMBOL),
/* harmony export */   MANAGED_EFFECT: () => (/* binding */ MANAGED_EFFECT),
/* harmony export */   MAYBE_DIRTY: () => (/* binding */ MAYBE_DIRTY),
/* harmony export */   PAUSED: () => (/* binding */ PAUSED),
/* harmony export */   PROXY_PATH_SYMBOL: () => (/* binding */ PROXY_PATH_SYMBOL),
/* harmony export */   REACTION_IS_UPDATING: () => (/* binding */ REACTION_IS_UPDATING),
/* harmony export */   REACTION_RAN: () => (/* binding */ REACTION_RAN),
/* harmony export */   RENDER_EFFECT: () => (/* binding */ RENDER_EFFECT),
/* harmony export */   ROOT_EFFECT: () => (/* binding */ ROOT_EFFECT),
/* harmony export */   STALE_REACTION: () => (/* binding */ STALE_REACTION),
/* harmony export */   STATE_SYMBOL: () => (/* binding */ STATE_SYMBOL),
/* harmony export */   STYLE_CACHE: () => (/* binding */ STYLE_CACHE),
/* harmony export */   TEXT_CACHE: () => (/* binding */ TEXT_CACHE),
/* harmony export */   TEXT_NODE: () => (/* binding */ TEXT_NODE),
/* harmony export */   USER_EFFECT: () => (/* binding */ USER_EFFECT)
/* harmony export */ });
// General flags
const DERIVED = 1 << 1;
const EFFECT = 1 << 2;
const RENDER_EFFECT = 1 << 3;
/**
 * An effect that does not destroy its child effects when it reruns.
 * Runs as part of render effects, i.e. not eagerly as part of tree traversal or effect flushing.
 */
const MANAGED_EFFECT = 1 << 24;
/**
 * An effect that does not destroy its child effects when it reruns (like MANAGED_EFFECT).
 * Runs eagerly as part of tree traversal or effect flushing.
 */
const BLOCK_EFFECT = 1 << 4;
const BRANCH_EFFECT = 1 << 5;
const ROOT_EFFECT = 1 << 6;
const BOUNDARY_EFFECT = 1 << 7;
/**
 * Set on the effect that `pause_effect` was called on, i.e. the root of a paused subtree,
 * as opposed to its descendants which are merely `INERT`. This allows `resume_effect` on
 * an ancestor to skip subtrees that were paused for their own reasons (such as a block
 * whose condition is still false) rather than resurrecting them
 */
const PAUSED = 1 << 8;
/**
 * Indicates that a reaction is connected to an effect root — either it is an effect,
 * or it is a derived that is depended on by at least one effect. If a derived has
 * no dependents, we can disconnect it from the graph, allowing it to either be
 * GC'd or reconnected later if an effect comes to depend on it again
 */
const CONNECTED = 1 << 9;
const CLEAN = 1 << 10;
const DIRTY = 1 << 11;
const MAYBE_DIRTY = 1 << 12;
const INERT = 1 << 13;
const DESTROYED = 1 << 14;
/** Set once a reaction has run for the first time */
const REACTION_RAN = 1 << 15;
/** Effect is in the process of getting destroyed. Can be observed in child teardown functions */
const DESTROYING = 1 << 25;

// Flags exclusive to effects
/**
 * 'Transparent' effects do not create a transition boundary.
 * This is on a block effect 99% of the time but may also be on a branch effect if its parent block effect was pruned
 */
const EFFECT_TRANSPARENT = 1 << 16;
const EAGER_EFFECT = 1 << 17;
const HEAD_EFFECT = 1 << 18;
const EFFECT_PRESERVED = 1 << 19;
const USER_EFFECT = 1 << 20;
const EFFECT_OFFSCREEN = 1 << 25;

// Flags used for async
const REACTION_IS_UPDATING = 1 << 21;
const ASYNC = 1 << 22;

const ERROR_VALUE = 1 << 23;

const STATE_SYMBOL = Symbol('$state');
/** Marks component export objects, so that `proxy(...)` leaves them untouched */
const COMPONENT_SYMBOL = Symbol('component');
const LEGACY_PROPS = Symbol('legacy props');
const LOADING_ATTR_SYMBOL = Symbol('');
const PROXY_PATH_SYMBOL = Symbol('proxy path');
const ATTRIBUTES_CACHE = Symbol('attributes');
const CLASS_CACHE = Symbol('class');
const STYLE_CACHE = Symbol('style');
const TEXT_CACHE = Symbol('text');
const FORM_RESET_HANDLER = Symbol('form reset');
/** An anchor might change, via this symbol on the original anchor we can tell HMR about the updated anchor */
const HMR_ANCHOR = Symbol('hmr anchor');

/** allow users to ignore aborted signal errors if `reason.name === 'StaleReactionError` */
const STALE_REACTION = new (class StaleReactionError extends Error {
	name = 'StaleReactionError';
	message = 'The reaction that called `getAbortSignal()` was re-run or destroyed';
})();

const IS_XHTML =
	// We gotta write it like this because after downleveling the pure comment may end up in the wrong location
	!!globalThis.document?.contentType &&
	/* @__PURE__ */ globalThis.document.contentType.includes('xml');
const ELEMENT_NODE = 1;
const TEXT_NODE = 3;
const COMMENT_NODE = 8;
const DOCUMENT_FRAGMENT_NODE = 11;


/***/ },

/***/ "./node_modules/svelte/src/internal/client/context.js"
/*!************************************************************!*\
  !*** ./node_modules/svelte/src/internal/client/context.js ***!
  \************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   add_svelte_meta: () => (/* binding */ add_svelte_meta),
/* harmony export */   component_context: () => (/* binding */ component_context),
/* harmony export */   createContext: () => (/* binding */ createContext),
/* harmony export */   dev_current_component_function: () => (/* binding */ dev_current_component_function),
/* harmony export */   dev_stack: () => (/* binding */ dev_stack),
/* harmony export */   getAllContexts: () => (/* binding */ getAllContexts),
/* harmony export */   getContext: () => (/* binding */ getContext),
/* harmony export */   hasContext: () => (/* binding */ hasContext),
/* harmony export */   is_runes: () => (/* binding */ is_runes),
/* harmony export */   mark_as_component: () => (/* binding */ mark_as_component),
/* harmony export */   pop: () => (/* binding */ pop),
/* harmony export */   push: () => (/* binding */ push),
/* harmony export */   setContext: () => (/* binding */ setContext),
/* harmony export */   set_component_context: () => (/* binding */ set_component_context),
/* harmony export */   set_dev_current_component_function: () => (/* binding */ set_dev_current_component_function),
/* harmony export */   set_dev_stack: () => (/* binding */ set_dev_stack)
/* harmony export */ });
/* harmony import */ var esm_env__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! esm-env */ "./node_modules/esm-env/index.js");
/* harmony import */ var _errors_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./errors.js */ "./node_modules/svelte/src/internal/client/errors.js");
/* harmony import */ var _runtime_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./runtime.js */ "./node_modules/svelte/src/internal/client/runtime.js");
/* harmony import */ var _reactivity_effects_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./reactivity/effects.js */ "./node_modules/svelte/src/internal/client/reactivity/effects.js");
/* harmony import */ var _flags_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../flags/index.js */ "./node_modules/svelte/src/internal/flags/index.js");
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../constants.js */ "./node_modules/svelte/src/constants.js");
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./constants.js */ "./node_modules/svelte/src/internal/client/constants.js");
/* harmony import */ var _shared_utils_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../shared/utils.js */ "./node_modules/svelte/src/internal/shared/utils.js");
/* harmony import */ var _shared_context_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../shared/context.js */ "./node_modules/svelte/src/internal/shared/context.js");
/** @import { ComponentContext, DevStackEntry, Effect } from '#client' */










/** @type {ComponentContext | null} */
let component_context = null;

/** @param {ComponentContext | null} context */
function set_component_context(context) {
	component_context = context;
}

/** @type {DevStackEntry | null} */
let dev_stack = null;

/** @param {DevStackEntry | null} stack */
function set_dev_stack(stack) {
	dev_stack = stack;
}

/**
 * Execute a callback with a new dev stack entry
 * @param {() => any} callback - Function to execute
 * @param {DevStackEntry['type']} type - Type of block/component
 * @param {any} component - Component function
 * @param {number} line - Line number
 * @param {number} column - Column number
 * @param {Record<string, any>} [additional] - Any additional properties to add to the dev stack entry
 * @returns {any}
 */
function add_svelte_meta(callback, type, component, line, column, additional) {
	const parent = dev_stack;

	dev_stack = {
		type,
		file: component[_constants_js__WEBPACK_IMPORTED_MODULE_5__.FILENAME],
		line,
		column,
		parent,
		...additional
	};

	try {
		return callback();
	} finally {
		dev_stack = parent;
	}
}

/**
 * The current component function. Different from current component context:
 * ```html
 * <!-- App.svelte -->
 * <Foo>
 *   <Bar /> <!-- context == Foo.svelte, function == App.svelte -->
 * </Foo>
 * ```
 * @type {ComponentContext['function']}
 */
let dev_current_component_function = null;

/** @param {ComponentContext['function']} fn */
function set_dev_current_component_function(fn) {
	dev_current_component_function = fn;
}

/**
 * Returns a `[get, set, has]` triplet of functions for working with context in a type-safe way.
 *
 * `get` will throw an error if `set` has not yet been called in the current component or any of
 * its ancestors.
 *
 * @template T
 * @returns {[() => T, (context: T) => T, () => boolean]}
 * @since 5.40.0
 */
function createContext() {
	return /** @type {[() => T, (context: T) => T, () => boolean]} */ (
		(0,_shared_context_js__WEBPACK_IMPORTED_MODULE_8__.create_context)(getContext, setContext, hasContext)
	);
}

/**
 * Retrieves the context set with the specified `key` in the current component or any of its
 * ancestors. If multiple components set the same key, the value from the closest one is returned.
 * A `setContext` call in the current component is only visible to `getContext` calls that run after it.
 * Must be called during component initialisation.
 *
 * [`createContext`](https://svelte.dev/docs/svelte/svelte#createContext) is a type-safe alternative.
 *
 * @template T
 * @param {any} key
 * @returns {T}
 */
function getContext(key) {
	const context_map = (0,_shared_context_js__WEBPACK_IMPORTED_MODULE_8__.get_or_init_context_map)(component_context, 'getContext');
	const result = /** @type {T} */ (context_map.get(key));
	return result;
}

/**
 * Associates an arbitrary `context` object with the current component and the specified `key`
 * and returns that object. The context is then available to the component itself and all of its
 * descendants (including slotted content) with `getContext`.
 *
 * Like lifecycle functions, this must be called during component initialisation.
 *
 * [`createContext`](https://svelte.dev/docs/svelte/svelte#createContext) is a type-safe alternative.
 *
 * @template T
 * @param {any} key
 * @param {T} context
 * @returns {T}
 */
function setContext(key, context) {
	const context_map = (0,_shared_context_js__WEBPACK_IMPORTED_MODULE_8__.get_or_init_context_map)(component_context, 'setContext');

	if (_flags_index_js__WEBPACK_IMPORTED_MODULE_4__.async_mode_flag) {
		var flags = /** @type {Effect} */ (_runtime_js__WEBPACK_IMPORTED_MODULE_2__.active_effect).f;
		var valid =
			!_runtime_js__WEBPACK_IMPORTED_MODULE_2__.active_reaction &&
			(flags & _constants_js__WEBPACK_IMPORTED_MODULE_6__.BRANCH_EFFECT) !== 0 &&
			// pop() runs synchronously, so this indicates we're setting context after an await
			!(/** @type {ComponentContext} */ (component_context).i);

		if (!valid) {
			_errors_js__WEBPACK_IMPORTED_MODULE_1__.set_context_after_init();
		}
	}

	context_map.set(key, context);
	return context;
}

/**
 * Checks whether a given `key` has been set in the context of the current component or any of
 * its ancestors. Must be called during component initialisation.
 *
 * @param {any} key
 * @returns {boolean}
 */
function hasContext(key) {
	const context_map = (0,_shared_context_js__WEBPACK_IMPORTED_MODULE_8__.get_or_init_context_map)(component_context, 'hasContext');
	return context_map.has(key);
}

/**
 * Retrieves the whole context map that belongs to the current component, including entries
 * inherited from its ancestors. Must be called during component initialisation. Useful, for
 * example, if you programmatically create a component and want to pass the existing context to it.
 *
 * @template {Map<any, any>} [T=Map<any, any>]
 * @returns {T}
 */
function getAllContexts() {
	const context_map = (0,_shared_context_js__WEBPACK_IMPORTED_MODULE_8__.get_or_init_context_map)(component_context, 'getAllContexts');
	return /** @type {T} */ (context_map);
}

/**
 * @param {Record<string, unknown>} props
 * @param {any} runes
 * @param {Function} [fn]
 * @returns {void}
 */
function push(props, runes = false, fn) {
	component_context = {
		p: component_context,
		i: false,
		c: null,
		e: null,
		s: props,
		x: null,
		r: /** @type {Effect} */ (_runtime_js__WEBPACK_IMPORTED_MODULE_2__.active_effect),
		l: _flags_index_js__WEBPACK_IMPORTED_MODULE_4__.legacy_mode_flag && !runes ? { s: null, u: null, $: [] } : null
	};

	if (esm_env__WEBPACK_IMPORTED_MODULE_0__.DEV) {
		// component function
		component_context.function = fn;
		dev_current_component_function = fn;
	}
}

/**
 * @template {Record<string, any>} T
 * @param {T} [component]
 * @returns {T}
 */
function pop(component) {
	var context = /** @type {ComponentContext} */ (component_context);
	var effects = context.e;

	if (effects !== null) {
		context.e = null;

		for (var fn of effects) {
			(0,_reactivity_effects_js__WEBPACK_IMPORTED_MODULE_3__.create_user_effect)(fn);
		}
	}

	if (component !== undefined) {
		context.x = component;
	}

	context.i = true;

	component_context = context.p;

	if (esm_env__WEBPACK_IMPORTED_MODULE_0__.DEV) {
		dev_current_component_function = component_context?.function ?? null;
	}

	return mark_as_component(component);
}

/**
 * Add a symbol to the object (or create one if undefined) to mark it as a component so it isn't proxified.
 * @param {any} component
 */
function mark_as_component(component = {}) {
	;(0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_7__.define_property)(component, _constants_js__WEBPACK_IMPORTED_MODULE_6__.COMPONENT_SYMBOL, { value: true });
	return component;
}

/** @returns {boolean} */
function is_runes() {
	return !_flags_index_js__WEBPACK_IMPORTED_MODULE_4__.legacy_mode_flag || (component_context !== null && component_context.l === null);
}


/***/ },

/***/ "./node_modules/svelte/src/internal/client/dev/assign.js"
/*!***************************************************************!*\
  !*** ./node_modules/svelte/src/internal/client/dev/assign.js ***!
  \***************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   assign: () => (/* binding */ assign),
/* harmony export */   assign_async: () => (/* binding */ assign_async)
/* harmony export */ });
/* harmony import */ var _client_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! #client/constants */ "./node_modules/svelte/src/internal/client/constants.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../utils.js */ "./node_modules/svelte/src/utils.js");
/* harmony import */ var _runtime_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../runtime.js */ "./node_modules/svelte/src/internal/client/runtime.js");
/* harmony import */ var _warnings_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../warnings.js */ "./node_modules/svelte/src/internal/client/warnings.js");





/**
 *
 * @param {any} a
 * @param {any} b
 * @param {string} property
 * @param {string} location
 */
function compare(a, b, property, location) {
	if (a !== b && typeof b === 'object' && _client_constants__WEBPACK_IMPORTED_MODULE_0__.STATE_SYMBOL in b) {
		_warnings_js__WEBPACK_IMPORTED_MODULE_3__.assignment_value_stale(property, /** @type {string} */ ((0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.sanitize_location)(location)));
	}

	return a;
}

/**
 * @param {any} object
 * @param {string} property
 * @param {string} operator
 * @param {any} rhs
 * @param {string} location
 */
function assign(object, property, operator, rhs, location) {
	return compare(
		operator === '='
			? (object[property] = rhs)
			: operator === '&&='
				? (object[property] &&= rhs())
				: operator === '||='
					? (object[property] ||= rhs())
					: operator === '??='
						? (object[property] ??= rhs())
						: null,
		(0,_runtime_js__WEBPACK_IMPORTED_MODULE_2__.untrack)(() => object[property]),
		property,
		location
	);
}

/**
 * @param {any} object
 * @param {string} property
 * @param {string} operator
 * @param {any} rhs
 * @param {string} location
 */
async function assign_async(object, property, operator, rhs, location) {
	return compare(
		operator === '='
			? (object[property] = await rhs)
			: operator === '&&='
				? (object[property] &&= await rhs())
				: operator === '||='
					? (object[property] ||= await rhs())
					: operator === '??='
						? (object[property] ??= await rhs())
						: null,
		(0,_runtime_js__WEBPACK_IMPORTED_MODULE_2__.untrack)(() => object[property]),
		property,
		location
	);
}


/***/ },

/***/ "./node_modules/svelte/src/internal/client/dev/console-log.js"
/*!********************************************************************!*\
  !*** ./node_modules/svelte/src/internal/client/dev/console-log.js ***!
  \********************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   log_if_contains_state: () => (/* binding */ log_if_contains_state)
/* harmony export */ });
/* harmony import */ var _client_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! #client/constants */ "./node_modules/svelte/src/internal/client/constants.js");
/* harmony import */ var _shared_clone_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/clone.js */ "./node_modules/svelte/src/internal/shared/clone.js");
/* harmony import */ var _warnings_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../warnings.js */ "./node_modules/svelte/src/internal/client/warnings.js");
/* harmony import */ var _runtime_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../runtime.js */ "./node_modules/svelte/src/internal/client/runtime.js");





/**
 * @param {string} method
 * @param  {...any} objects
 */
function log_if_contains_state(method, ...objects) {
	(0,_runtime_js__WEBPACK_IMPORTED_MODULE_3__.untrack)(() => {
		try {
			let has_state = false;
			const transformed = [];

			for (const obj of objects) {
				if (obj && typeof obj === 'object' && _client_constants__WEBPACK_IMPORTED_MODULE_0__.STATE_SYMBOL in obj) {
					transformed.push((0,_shared_clone_js__WEBPACK_IMPORTED_MODULE_1__.snapshot)(obj, true));
					has_state = true;
				} else {
					transformed.push(obj);
				}
			}

			if (has_state) {
				_warnings_js__WEBPACK_IMPORTED_MODULE_2__.console_log_state(method);

				// eslint-disable-next-line no-console
				console.log('%c[snapshot]', 'color: grey', ...transformed);
			}
		} catch {
			// Errors can occur when trying to snapshot objects with getters that throw or non-enumerable properties.
		}
	});

	return objects;
}


/***/ },

/***/ "./node_modules/svelte/src/internal/client/dev/css.js"
/*!************************************************************!*\
  !*** ./node_modules/svelte/src/internal/client/dev/css.js ***!
  \************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   cleanup_styles: () => (/* binding */ cleanup_styles),
/* harmony export */   register_style: () => (/* binding */ register_style)
/* harmony export */ });
/** @type {Map<String, Set<HTMLStyleElement>>} */
var all_styles = new Map();

/**
 * @param {String} hash
 * @param {HTMLStyleElement} style
 */
function register_style(hash, style) {
	var styles = all_styles.get(hash);

	if (!styles) {
		styles = new Set();
		all_styles.set(hash, styles);
	}

	styles.add(style);
}

/**
 * @param {String} hash
 */
function cleanup_styles(hash) {
	var styles = all_styles.get(hash);
	if (!styles) return;

	for (const style of styles) {
		style.remove();
	}

	all_styles.delete(hash);
}


/***/ },

/***/ "./node_modules/svelte/src/internal/client/dev/debug.js"
/*!**************************************************************!*\
  !*** ./node_modules/svelte/src/internal/client/dev/debug.js ***!
  \**************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   log_effect_tree: () => (/* binding */ log_effect_tree),
/* harmony export */   log_inconsistent_branches: () => (/* binding */ log_inconsistent_branches),
/* harmony export */   log_reactions: () => (/* binding */ log_reactions),
/* harmony export */   root: () => (/* binding */ root)
/* harmony export */ });
/* harmony import */ var _client_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! #client/constants */ "./node_modules/svelte/src/internal/client/constants.js");
/* harmony import */ var _shared_clone_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/clone.js */ "./node_modules/svelte/src/internal/shared/clone.js");
/* harmony import */ var _runtime_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../runtime.js */ "./node_modules/svelte/src/internal/client/runtime.js");
/** @import { Derived, Effect, Value } from '#client' */





/**
 *
 * @param {Effect} effect
 */
function root(effect) {
	while (effect.parent !== null) {
		effect = effect.parent;
	}

	return effect;
}

/**
 *
 * @param {Effect} effect
 * @param {boolean} append_effect
 * @returns {string}
 */
function effect_label(effect, append_effect = false) {
	const flags = effect.f;

	let label = `(unknown ${append_effect ? 'effect' : ''})`;

	if ((flags & _client_constants__WEBPACK_IMPORTED_MODULE_0__.ROOT_EFFECT) !== 0) {
		label = 'root';
	} else if ((flags & _client_constants__WEBPACK_IMPORTED_MODULE_0__.BOUNDARY_EFFECT) !== 0) {
		label = 'boundary';
	} else if ((flags & _client_constants__WEBPACK_IMPORTED_MODULE_0__.BLOCK_EFFECT) !== 0) {
		label = 'block';
	} else if ((flags & _client_constants__WEBPACK_IMPORTED_MODULE_0__.MANAGED_EFFECT) !== 0) {
		label = 'managed';
	} else if ((flags & _client_constants__WEBPACK_IMPORTED_MODULE_0__.ASYNC) !== 0) {
		label = 'async';
	} else if ((flags & _client_constants__WEBPACK_IMPORTED_MODULE_0__.BRANCH_EFFECT) !== 0) {
		label = 'branch';
	} else if ((flags & _client_constants__WEBPACK_IMPORTED_MODULE_0__.RENDER_EFFECT) !== 0) {
		label = 'render effect';
	} else if ((flags & _client_constants__WEBPACK_IMPORTED_MODULE_0__.EFFECT) !== 0) {
		label = 'effect';
	}

	if (append_effect && !label.endsWith('effect')) {
		label += ' effect';
	}

	return label;
}

/**
 * @param {Effect} effect
 * @param {Effect[]} highlighted
 */
function log_effect_tree(effect, highlighted = [], depth = 0, is_reachable = true) {
	const flags = effect.f;
	let label = effect_label(effect);

	let status =
		(flags & _client_constants__WEBPACK_IMPORTED_MODULE_0__.CLEAN) !== 0 ? 'clean' : (flags & _client_constants__WEBPACK_IMPORTED_MODULE_0__.MAYBE_DIRTY) !== 0 ? 'maybe dirty' : 'dirty';

	let styles = [`font-weight: ${status === 'clean' ? 'normal' : 'bold'}`];

	if (status !== 'clean' && !is_reachable) {
		label = `⚠️ ${label}`;
		styles.push(`color: red`);
	}

	if ((flags & _client_constants__WEBPACK_IMPORTED_MODULE_0__.INERT) !== 0) {
		styles.push('font-style: italic');
	}

	if (highlighted.includes(effect)) {
		styles.push('background-color: yellow');
	}

	// eslint-disable-next-line no-console
	console.group(`%c${label} (${status})`, styles.join('; '));

	if (depth === 0) {
		const callsite = new Error().stack
			?.split('\n')[2]
			.replace(/\s+at (?: \w+\(?)?(.+)\)?/, (m, $1) => $1.replace(/\?[^:]+/, ''));

		// eslint-disable-next-line no-console
		console.log(callsite);
	} else {
		// eslint-disable-next-line no-console
		console.groupCollapsed(`%cfn`, `font-weight: normal`);
		// eslint-disable-next-line no-console
		console.log(effect.fn);
		// eslint-disable-next-line no-console
		console.groupEnd();
	}

	if (effect.deps !== null) {
		// eslint-disable-next-line no-console
		console.groupCollapsed('%cdeps', 'font-weight: normal');

		for (const dep of effect.deps) {
			log_dep(dep);
		}

		// eslint-disable-next-line no-console
		console.groupEnd();
	}

	if (effect.nodes) {
		// eslint-disable-next-line no-console
		console.log(effect.nodes.start);

		if (effect.nodes.start !== effect.nodes.end) {
			// eslint-disable-next-line no-console
			console.log(effect.nodes.end);
		}
	}

	var child_is_reachable = is_reachable && ((flags & _client_constants__WEBPACK_IMPORTED_MODULE_0__.BRANCH_EFFECT) === 0 || (flags & _client_constants__WEBPACK_IMPORTED_MODULE_0__.CLEAN) === 0);

	let child = effect.first;
	while (child !== null) {
		log_effect_tree(child, highlighted, depth + 1, child_is_reachable);
		child = child.next;
	}

	// eslint-disable-next-line no-console
	console.groupEnd();
}

/**
 *
 * @param {Value} dep
 */
function log_dep(dep) {
	if ((dep.f & _client_constants__WEBPACK_IMPORTED_MODULE_0__.DERIVED) !== 0) {
		const derived = /** @type {Derived} */ (dep);

		// eslint-disable-next-line no-console
		console.groupCollapsed(
			`%c$derived %c${dep.label ?? '<unknown>'}`,
			'font-weight: bold; color: CornflowerBlue',
			'font-weight: normal',
			(0,_runtime_js__WEBPACK_IMPORTED_MODULE_2__.untrack)(() => (0,_shared_clone_js__WEBPACK_IMPORTED_MODULE_1__.snapshot)(derived.v))
		);

		if (derived.deps) {
			for (const d of derived.deps) {
				log_dep(d);
			}
		}

		// eslint-disable-next-line no-console
		console.groupEnd();
	} else {
		// eslint-disable-next-line no-console
		console.log(
			`%c$state %c${dep.label ?? '<unknown>'}`,
			'font-weight: bold; color: CornflowerBlue',
			'font-weight: normal',
			(0,_runtime_js__WEBPACK_IMPORTED_MODULE_2__.untrack)(() => (0,_shared_clone_js__WEBPACK_IMPORTED_MODULE_1__.snapshot)(dep.v))
		);
	}
}

/**
 * Logs all reactions of a source or derived transitively
 * @param {Derived | Value} signal
 */
function log_reactions(signal) {
	/** @type {Set<Derived | Value>} */
	const visited = new Set();

	/**
	 * Returns an array of flag names that are set on the given flags bitmask
	 * @param {number} flags
	 * @returns {string[]}
	 */
	function get_derived_flag_names(flags) {
		/** @type {string[]} */
		const names = [];

		if ((flags & _client_constants__WEBPACK_IMPORTED_MODULE_0__.CLEAN) !== 0) names.push('CLEAN');
		if ((flags & _client_constants__WEBPACK_IMPORTED_MODULE_0__.DIRTY) !== 0) names.push('DIRTY');
		if ((flags & _client_constants__WEBPACK_IMPORTED_MODULE_0__.MAYBE_DIRTY) !== 0) names.push('MAYBE_DIRTY');
		if ((flags & _client_constants__WEBPACK_IMPORTED_MODULE_0__.CONNECTED) !== 0) names.push('CONNECTED');
		if ((flags & _client_constants__WEBPACK_IMPORTED_MODULE_0__.INERT) !== 0) names.push('INERT');
		if ((flags & _client_constants__WEBPACK_IMPORTED_MODULE_0__.DESTROYED) !== 0) names.push('DESTROYED');

		return names;
	}

	/**
	 * @param {Derived | Value} d
	 * @param {number} depth
	 */
	function log_derived(d, depth) {
		const flags = d.f;
		const flag_names = get_derived_flag_names(flags);
		const flags_str = flag_names.length > 0 ? `(${flag_names.join(', ')})` : '(no flags)';

		// eslint-disable-next-line no-console
		console.group(
			`%c${flags & _client_constants__WEBPACK_IMPORTED_MODULE_0__.DERIVED ? '$derived' : '$state'} %c${d.label ?? '<unknown>'} %c${flags_str}`,
			'font-weight: bold; color: CornflowerBlue',
			'font-weight: normal; color: inherit',
			'font-weight: normal; color: gray'
		);

		// eslint-disable-next-line no-console
		console.log((0,_runtime_js__WEBPACK_IMPORTED_MODULE_2__.untrack)(() => (0,_shared_clone_js__WEBPACK_IMPORTED_MODULE_1__.snapshot)(d.v)));

		if ('fn' in d) {
			// eslint-disable-next-line no-console
			console.log('%cfn:', 'font-weight: bold', d.fn);
		}

		if (d.reactions !== null && d.reactions.length > 0) {
			// eslint-disable-next-line no-console
			console.group('%creactions', 'font-weight: bold');

			for (const reaction of d.reactions) {
				if ((reaction.f & _client_constants__WEBPACK_IMPORTED_MODULE_0__.DERIVED) !== 0) {
					const derived_reaction = /** @type {Derived} */ (reaction);

					if (visited.has(derived_reaction)) {
						// eslint-disable-next-line no-console
						console.log(
							`%c$derived %c${derived_reaction.label ?? '<unknown>'} %c(already seen)`,
							'font-weight: bold; color: CornflowerBlue',
							'font-weight: normal; color: inherit',
							'font-weight: bold; color: orange'
						);
					} else {
						visited.add(derived_reaction);
						log_derived(derived_reaction, depth + 1);
					}
				} else {
					// It's an effect
					const label = effect_label(/** @type {Effect} */ (reaction), true);
					const status = (flags & _client_constants__WEBPACK_IMPORTED_MODULE_0__.MAYBE_DIRTY) !== 0 ? 'maybe dirty' : 'dirty';

					// Collect parent statuses
					/** @type {string[]} */
					const parent_statuses = [];
					let show = false;
					let current = /** @type {Effect} */ (reaction).parent;
					while (current !== null) {
						const parent_flags = current.f;
						if ((parent_flags & (_client_constants__WEBPACK_IMPORTED_MODULE_0__.ROOT_EFFECT | _client_constants__WEBPACK_IMPORTED_MODULE_0__.BRANCH_EFFECT)) !== 0) {
							const parent_status = (parent_flags & _client_constants__WEBPACK_IMPORTED_MODULE_0__.CLEAN) !== 0 ? 'clean' : 'not clean';
							if (parent_status === 'clean' && parent_statuses.includes('not clean')) show = true;
							parent_statuses.push(parent_status);
						}
						if (!current.parent) break;
						current = current.parent;
					}

					// Check if reaction is reachable from root
					const seen_effects = new Set();
					let reachable = false;
					/**
					 * @param {Effect | null} effect
					 */
					function check_reachable(effect) {
						if (effect === null || reachable) return;
						if (effect === reaction) {
							reachable = true;
							return;
						}
						if (effect.f & _client_constants__WEBPACK_IMPORTED_MODULE_0__.DESTROYED) return;
						if (seen_effects.has(effect)) {
							throw new Error('');
						}
						seen_effects.add(effect);
						let child = effect.first;
						while (child !== null) {
							check_reachable(child);
							child = child.next;
						}
					}
					try {
						if (current) check_reachable(current);
					} catch (e) {
						// eslint-disable-next-line no-console
						console.log(
							`%c⚠️ Circular reference detected in effect tree`,
							'font-weight: bold; color: red',
							seen_effects
						);
					}

					if (!reachable) {
						// eslint-disable-next-line no-console
						console.log(
							`%c⚠️ Effect is NOT reachable from its parent chain`,
							'font-weight: bold; color: red'
						);
					}

					const parent_status_str = show ? ` (${parent_statuses.join(', ')})` : '';

					// eslint-disable-next-line no-console
					console.log(
						`%c${label} (${status})${parent_status_str}`,
						`font-weight: bold; color: ${parent_status_str ? 'red' : 'green'}`,
						reaction
					);
				}
			}

			// eslint-disable-next-line no-console
			console.groupEnd();
		} else {
			// eslint-disable-next-line no-console
			console.log('%cno reactions', 'font-style: italic; color: gray');
		}

		// eslint-disable-next-line no-console
		console.groupEnd();
	}

	// eslint-disable-next-line no-console
	console.group(`%cDerived Reactions Graph`, 'font-weight: bold; color: purple');

	visited.add(signal);
	log_derived(signal, 0);

	// eslint-disable-next-line no-console
	console.groupEnd();
}

/**
 * Traverses an effect tree and logs branches where a non-clean branch exists below a clean branch
 * @param {Effect} effect
 */
function log_inconsistent_branches(effect) {
	const root_effect = root(effect);

	/**
	 * @typedef {{
	 *   effect: Effect,
	 *   status: 'clean' | 'maybe dirty' | 'dirty',
	 *   parent_clean: boolean,
	 *   children: BranchInfo[]
	 * }} BranchInfo
	 */

	/**
	 * Collects branch effects from the tree
	 * @param {Effect} eff
	 * @param {boolean} parent_clean - whether any ancestor branch is clean
	 * @returns {BranchInfo[]}
	 */
	function collect_branches(eff, parent_clean) {
		/** @type {BranchInfo[]} */
		const branches = [];
		const flags = eff.f;
		const is_branch = (flags & _client_constants__WEBPACK_IMPORTED_MODULE_0__.BRANCH_EFFECT) !== 0;

		if (is_branch) {
			const status =
				(flags & _client_constants__WEBPACK_IMPORTED_MODULE_0__.CLEAN) !== 0 ? 'clean' : (flags & _client_constants__WEBPACK_IMPORTED_MODULE_0__.MAYBE_DIRTY) !== 0 ? 'maybe dirty' : 'dirty';

			/** @type {BranchInfo[]} */
			const child_branches = [];

			let child = eff.first;
			while (child !== null) {
				child_branches.push(...collect_branches(child, status === 'clean'));
				child = child.next;
			}

			branches.push({
				effect: eff,
				status,
				parent_clean,
				children: child_branches
			});
		} else {
			// Not a branch, continue traversing
			let child = eff.first;
			while (child !== null) {
				branches.push(...collect_branches(child, parent_clean));
				child = child.next;
			}
		}

		return branches;
	}

	/**
	 * Checks if a branch tree contains any inconsistencies (non-clean below clean)
	 * @param {BranchInfo} branch
	 * @param {boolean} ancestor_clean
	 * @returns {boolean}
	 */
	function has_inconsistency(branch, ancestor_clean) {
		const is_inconsistent = ancestor_clean && branch.status !== 'clean';
		if (is_inconsistent) return true;

		const new_ancestor_clean = ancestor_clean || branch.status === 'clean';
		for (const child of branch.children) {
			if (has_inconsistency(child, new_ancestor_clean)) return true;
		}
		return false;
	}

	/**
	 * Logs a branch and its children, but only if there are inconsistencies
	 * @param {BranchInfo} branch
	 * @param {boolean} ancestor_clean
	 * @param {number} depth
	 */
	function log_branch(branch, ancestor_clean, depth) {
		const is_inconsistent = ancestor_clean && branch.status !== 'clean';
		const new_ancestor_clean = ancestor_clean || branch.status === 'clean';

		// Only log if this branch or any descendant has an inconsistency
		if (!has_inconsistency(branch, ancestor_clean) && !is_inconsistent) {
			return;
		}

		const style = is_inconsistent
			? 'font-weight: bold; color: red'
			: branch.status === 'clean'
				? 'font-weight: normal; color: green'
				: 'font-weight: bold; color: orange';

		const warning = is_inconsistent ? ' ⚠️ INCONSISTENT' : '';

		// eslint-disable-next-line no-console
		console.group(`%cbranch (${branch.status})${warning}`, style);

		// eslint-disable-next-line no-console
		console.log('%ceffect:', 'font-weight: bold', branch.effect);

		if (branch.effect.fn) {
			// eslint-disable-next-line no-console
			console.log('%cfn:', 'font-weight: bold', branch.effect.fn);
		}

		if (branch.effect.deps !== null) {
			// eslint-disable-next-line no-console
			console.groupCollapsed('%cdeps', 'font-weight: normal');
			for (const dep of branch.effect.deps) {
				log_dep(dep);
			}
			// eslint-disable-next-line no-console
			console.groupEnd();
		}

		if (is_inconsistent) {
			log_effect_tree(branch.effect);
		} else if (branch.children.length > 0) {
			// eslint-disable-next-line no-console
			console.group('%cchild branches', 'font-weight: bold');
			for (const child of branch.children) {
				log_branch(child, new_ancestor_clean, depth + 1);
			}
			// eslint-disable-next-line no-console
			console.groupEnd();
		}

		// eslint-disable-next-line no-console
		console.groupEnd();
	}

	const branches = collect_branches(root_effect, false);

	// Check if there are any inconsistencies at all
	let has_any_inconsistency = false;
	for (const branch of branches) {
		if (has_inconsistency(branch, false)) {
			has_any_inconsistency = true;
			break;
		}
	}

	if (!has_any_inconsistency) {
		// eslint-disable-next-line no-console
		console.log('%cNo inconsistent branches found', 'font-weight: bold; color: green');
		return;
	}

	// eslint-disable-next-line no-console
	console.group(`%cInconsistent Branches (non-clean below clean)`, 'font-weight: bold; color: red');

	for (const branch of branches) {
		log_branch(branch, false, 0);
	}

	// eslint-disable-next-line no-console
	console.groupEnd();

	return true;
}


/***/ },

/***/ "./node_modules/svelte/src/internal/client/dev/elements.js"
/*!*****************************************************************!*\
  !*** ./node_modules/svelte/src/internal/client/dev/elements.js ***!
  \*****************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   add_locations: () => (/* binding */ add_locations)
/* harmony export */ });
/* harmony import */ var _client_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! #client/constants */ "./node_modules/svelte/src/internal/client/constants.js");
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../constants.js */ "./node_modules/svelte/src/constants.js");
/* harmony import */ var _dom_hydration_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../dom/hydration.js */ "./node_modules/svelte/src/internal/client/dom/hydration.js");
/* harmony import */ var _context_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../context.js */ "./node_modules/svelte/src/internal/client/context.js");
/** @import { SourceLocation } from '#client' */





/**
 * @param {any} fn
 * @param {string} filename
 * @param {SourceLocation[]} locations
 * @returns {any}
 */
function add_locations(fn, filename, locations) {
	return (/** @type {any[]} */ ...args) => {
		const dom = fn(...args);

		var node = _dom_hydration_js__WEBPACK_IMPORTED_MODULE_2__.hydrating ? dom : dom.nodeType === _client_constants__WEBPACK_IMPORTED_MODULE_0__.DOCUMENT_FRAGMENT_NODE ? dom.firstChild : dom;
		assign_locations(node, filename, locations);

		return dom;
	};
}

/**
 * @param {Element} element
 * @param {string} filename
 * @param {SourceLocation} location
 */
function assign_location(element, filename, location) {
	// @ts-expect-error
	element.__svelte_meta = {
		parent: _context_js__WEBPACK_IMPORTED_MODULE_3__.dev_stack,
		loc: { file: filename, line: location[0], column: location[1] }
	};

	if (location[2]) {
		assign_locations(element.firstChild, filename, location[2]);
	}
}

/**
 * @param {Node | null} node
 * @param {string} filename
 * @param {SourceLocation[]} locations
 */
function assign_locations(node, filename, locations) {
	var i = 0;
	var depth = 0;

	while (node && i < locations.length) {
		if (_dom_hydration_js__WEBPACK_IMPORTED_MODULE_2__.hydrating && node.nodeType === _client_constants__WEBPACK_IMPORTED_MODULE_0__.COMMENT_NODE) {
			var comment = /** @type {Comment} */ (node);
			if (comment.data[0] === _constants_js__WEBPACK_IMPORTED_MODULE_1__.HYDRATION_START) depth += 1;
			else if (comment.data[0] === _constants_js__WEBPACK_IMPORTED_MODULE_1__.HYDRATION_END) depth -= 1;
		}

		if (depth === 0 && node.nodeType === _client_constants__WEBPACK_IMPORTED_MODULE_0__.ELEMENT_NODE) {
			assign_location(/** @type {Element} */ (node), filename, locations[i++]);
		}

		node = node.nextSibling;
	}
}


/***/ },

/***/ "./node_modules/svelte/src/internal/client/dev/equality.js"
/*!*****************************************************************!*\
  !*** ./node_modules/svelte/src/internal/client/dev/equality.js ***!
  \*****************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   equals: () => (/* binding */ equals),
/* harmony export */   init_array_prototype_warnings: () => (/* binding */ init_array_prototype_warnings),
/* harmony export */   strict_equals: () => (/* binding */ strict_equals)
/* harmony export */ });
/* harmony import */ var _warnings_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../warnings.js */ "./node_modules/svelte/src/internal/client/warnings.js");
/* harmony import */ var _proxy_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../proxy.js */ "./node_modules/svelte/src/internal/client/proxy.js");



function init_array_prototype_warnings() {
	const array_prototype = Array.prototype;
	// The REPL ends up here over and over, and this prevents it from adding more and more patches
	// of the same kind to the prototype, which would slow down everything over time.
	// @ts-expect-error
	const cleanup = Array.__svelte_cleanup;
	if (cleanup) {
		cleanup();
	}

	const { indexOf, lastIndexOf, includes } = array_prototype;

	array_prototype.indexOf = function (item, from_index) {
		const index = indexOf.call(this, item, from_index);

		if (index === -1) {
			for (let i = from_index ?? 0; i < this.length; i += 1) {
				if ((0,_proxy_js__WEBPACK_IMPORTED_MODULE_1__.get_proxied_value)(this[i]) === item) {
					_warnings_js__WEBPACK_IMPORTED_MODULE_0__.state_proxy_equality_mismatch('array.indexOf(...)');
					break;
				}
			}
		}

		return index;
	};

	array_prototype.lastIndexOf = function (item, from_index) {
		// we need to specify this.length - 1 because it's probably using something like
		// `arguments` inside so passing undefined is different from not passing anything
		const index = lastIndexOf.call(this, item, from_index ?? this.length - 1);

		if (index === -1) {
			for (let i = 0; i <= (from_index ?? this.length - 1); i += 1) {
				if ((0,_proxy_js__WEBPACK_IMPORTED_MODULE_1__.get_proxied_value)(this[i]) === item) {
					_warnings_js__WEBPACK_IMPORTED_MODULE_0__.state_proxy_equality_mismatch('array.lastIndexOf(...)');
					break;
				}
			}
		}

		return index;
	};

	array_prototype.includes = function (item, from_index) {
		const has = includes.call(this, item, from_index);

		if (!has) {
			for (let i = 0; i < this.length; i += 1) {
				if ((0,_proxy_js__WEBPACK_IMPORTED_MODULE_1__.get_proxied_value)(this[i]) === item) {
					_warnings_js__WEBPACK_IMPORTED_MODULE_0__.state_proxy_equality_mismatch('array.includes(...)');
					break;
				}
			}
		}

		return has;
	};

	// @ts-expect-error
	Array.__svelte_cleanup = () => {
		array_prototype.indexOf = indexOf;
		array_prototype.lastIndexOf = lastIndexOf;
		array_prototype.includes = includes;
	};
}

/**
 * @param {any} a
 * @param {any} b
 * @param {boolean} equal
 * @returns {boolean}
 */
function strict_equals(a, b, equal = true) {
	// try-catch needed because this tries to read properties of `a` and `b`,
	// which could be disallowed for example in a secure context
	try {
		if ((a === b) !== ((0,_proxy_js__WEBPACK_IMPORTED_MODULE_1__.get_proxied_value)(a) === (0,_proxy_js__WEBPACK_IMPORTED_MODULE_1__.get_proxied_value)(b))) {
			_warnings_js__WEBPACK_IMPORTED_MODULE_0__.state_proxy_equality_mismatch(equal ? '===' : '!==');
		}
	} catch {}

	return (a === b) === equal;
}

/**
 * @param {any} a
 * @param {any} b
 * @param {boolean} equal
 * @returns {boolean}
 */
function equals(a, b, equal = true) {
	if ((a == b) !== ((0,_proxy_js__WEBPACK_IMPORTED_MODULE_1__.get_proxied_value)(a) == (0,_proxy_js__WEBPACK_IMPORTED_MODULE_1__.get_proxied_value)(b))) {
		_warnings_js__WEBPACK_IMPORTED_MODULE_0__.state_proxy_equality_mismatch(equal ? '==' : '!=');
	}

	return (a == b) === equal;
}


/***/ },

/***/ "./node_modules/svelte/src/internal/client/dev/hmr.js"
/*!************************************************************!*\
  !*** ./node_modules/svelte/src/internal/client/dev/hmr.js ***!
  \************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   hmr: () => (/* binding */ hmr)
/* harmony export */ });
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../constants.js */ "./node_modules/svelte/src/constants.js");
/* harmony import */ var _client_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! #client/constants */ "./node_modules/svelte/src/internal/client/constants.js");
/* harmony import */ var _dom_hydration_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../dom/hydration.js */ "./node_modules/svelte/src/internal/client/dom/hydration.js");
/* harmony import */ var _reactivity_effects_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../reactivity/effects.js */ "./node_modules/svelte/src/internal/client/reactivity/effects.js");
/* harmony import */ var _reactivity_sources_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../reactivity/sources.js */ "./node_modules/svelte/src/internal/client/reactivity/sources.js");
/* harmony import */ var _render_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../render.js */ "./node_modules/svelte/src/internal/client/render.js");
/* harmony import */ var _runtime_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../runtime.js */ "./node_modules/svelte/src/internal/client/runtime.js");
/** @import { Effect, TemplateNode } from '#client' */








/**
 * @template {(anchor: Comment, props: any) => any} Component
 * @param {Component} fn
 */
function hmr(fn) {
	const current = (0,_reactivity_sources_js__WEBPACK_IMPORTED_MODULE_4__.source)(fn);

	/**
	 * @param {TemplateNode} initial_anchor
	 * @param {any} props
	 */
	function wrapper(initial_anchor, props) {
		let component = {};
		let instance = {};

		/** @type {Effect} */
		let effect;

		let ran = false;
		let anchor = initial_anchor;

		(0,_reactivity_effects_js__WEBPACK_IMPORTED_MODULE_3__.block)(() => {
			if (component === (component = (0,_runtime_js__WEBPACK_IMPORTED_MODULE_6__.get)(current))) {
				return;
			}

			if (effect) {
				// @ts-ignore
				for (var k in instance) delete instance[k];
				(0,_reactivity_effects_js__WEBPACK_IMPORTED_MODULE_3__.destroy_effect)(effect);
			}

			effect = (0,_reactivity_effects_js__WEBPACK_IMPORTED_MODULE_3__.branch)(() => {
				anchor = /** @type {any} */ (anchor)[_client_constants__WEBPACK_IMPORTED_MODULE_1__.HMR_ANCHOR] ?? anchor;

				// when the component is invalidated, replace it without transitions
				if (ran) (0,_render_js__WEBPACK_IMPORTED_MODULE_5__.set_should_intro)(false);

				// preserve getters/setters
				var result =
					// @ts-expect-error
					new.target ? new component(anchor, props) : component(anchor, props);
				// a component is not guaranteed to return something and we can't invoke getOwnPropertyDescriptors on undefined
				if (result) {
					Object.defineProperties(instance, Object.getOwnPropertyDescriptors(result));
				}

				if (ran) (0,_render_js__WEBPACK_IMPORTED_MODULE_5__.set_should_intro)(true);
			});

			// Forward the start/end DOM nodes from the inner effect to the outer active effect
			// which would get them if the HMR wrapper wasn't there. Do this inside the block not
			// outside so that HMR updates to the component will also update the nodes on the
			// active effect. We copy only start/end, not the full nodes object, so that
			// pause_children does not collect transitions from both effects and fire outroend twice.
			var inner_nodes = effect.nodes;
			if (inner_nodes) {
				var ae = /** @type {Effect} */ (_runtime_js__WEBPACK_IMPORTED_MODULE_6__.active_effect);
				if (ae.nodes) {
					ae.nodes.start = inner_nodes.start;
					ae.nodes.end = inner_nodes.end;
				} else {
					ae.nodes = { start: inner_nodes.start, end: inner_nodes.end, a: null, t: null };
				}
			}
		}, _client_constants__WEBPACK_IMPORTED_MODULE_1__.EFFECT_TRANSPARENT);

		ran = true;

		if (_dom_hydration_js__WEBPACK_IMPORTED_MODULE_2__.hydrating) {
			anchor = _dom_hydration_js__WEBPACK_IMPORTED_MODULE_2__.hydrate_node;
		}

		return instance;
	}

	// @ts-expect-error
	wrapper[_constants_js__WEBPACK_IMPORTED_MODULE_0__.FILENAME] = fn[_constants_js__WEBPACK_IMPORTED_MODULE_0__.FILENAME];

	// @ts-ignore
	wrapper[_constants_js__WEBPACK_IMPORTED_MODULE_0__.HMR] = {
		fn,
		current,
		update: (/** @type {any} */ incoming) => {
			// This logic ensures that the first version of the component is the one
			// whose update function and therefore block effect is preserved across updates.
			// If we don't do this dance and instead just use `incoming` as the new component
			// and then update, we'll create an ever-growing stack of block effects.

			// Trigger the original block effect
			(0,_reactivity_sources_js__WEBPACK_IMPORTED_MODULE_4__.set)(wrapper[_constants_js__WEBPACK_IMPORTED_MODULE_0__.HMR].current, incoming[_constants_js__WEBPACK_IMPORTED_MODULE_0__.HMR].fn);

			// Replace the incoming source with the original one
			incoming[_constants_js__WEBPACK_IMPORTED_MODULE_0__.HMR].current = wrapper[_constants_js__WEBPACK_IMPORTED_MODULE_0__.HMR].current;
		}
	};

	return wrapper;
}


/***/ },

/***/ "./node_modules/svelte/src/internal/client/dev/inspect.js"
/*!****************************************************************!*\
  !*** ./node_modules/svelte/src/internal/client/dev/inspect.js ***!
  \****************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   inspect: () => (/* binding */ inspect)
/* harmony export */ });
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../constants.js */ "./node_modules/svelte/src/constants.js");
/* harmony import */ var _shared_clone_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/clone.js */ "./node_modules/svelte/src/internal/shared/clone.js");
/* harmony import */ var _reactivity_effects_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../reactivity/effects.js */ "./node_modules/svelte/src/internal/client/reactivity/effects.js");
/* harmony import */ var _runtime_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../runtime.js */ "./node_modules/svelte/src/internal/client/runtime.js");
/* harmony import */ var _shared_dev_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared/dev.js */ "./node_modules/svelte/src/internal/shared/dev.js");






/**
 * @param {() => any[]} get_value
 * @param {Function} inspector
 * @param {boolean} show_stack
 */
function inspect(get_value, inspector, show_stack = false) {
	(0,_reactivity_effects_js__WEBPACK_IMPORTED_MODULE_2__.validate_effect)('$inspect');

	let initial = true;
	let error = /** @type {any} */ (_constants_js__WEBPACK_IMPORTED_MODULE_0__.UNINITIALIZED);

	// Inspect effects runs synchronously so that we can capture useful
	// stack traces. As a consequence, reading the value might result
	// in an error (an `$inspect(object.property)` will run before the
	// `{#if object}...{/if}` that contains it)
	(0,_reactivity_effects_js__WEBPACK_IMPORTED_MODULE_2__.eager_effect)(() => {
		error = _constants_js__WEBPACK_IMPORTED_MODULE_0__.UNINITIALIZED;

		try {
			var value = get_value();
		} catch (e) {
			error = e;
			return;
		}

		var snap = (0,_shared_clone_js__WEBPACK_IMPORTED_MODULE_1__.snapshot)(value, true, true);
		(0,_runtime_js__WEBPACK_IMPORTED_MODULE_3__.untrack)(() => {
			if (show_stack) {
				inspector(...snap);

				if (!initial) {
					const stack = (0,_shared_dev_js__WEBPACK_IMPORTED_MODULE_4__.get_error)('$inspect(...)');
					if (stack) {
						// eslint-disable-next-line no-console
						console.groupCollapsed('stack trace');
						// eslint-disable-next-line no-console
						console.log(stack);
						// eslint-disable-next-line no-console
						console.groupEnd();
					}
				}
			} else {
				inspector(initial ? 'init' : 'update', ...snap);
			}
		});

		initial = false;
	});

	// If an error occurs, we store it (along with its stack trace).
	// If the render effect subsequently runs, we log the error,
	// but if it doesn't run it's because the `$inspect` was
	// destroyed, meaning we don't need to bother
	(0,_reactivity_effects_js__WEBPACK_IMPORTED_MODULE_2__.render_effect)(() => {
		try {
			// call `get_value` so that this runs alongside the inspect effect
			get_value();
		} catch {
			// ignore
		}

		if (error !== _constants_js__WEBPACK_IMPORTED_MODULE_0__.UNINITIALIZED) {
			// eslint-disable-next-line no-console
			console.error(error);
			error = _constants_js__WEBPACK_IMPORTED_MODULE_0__.UNINITIALIZED;
		}
	});
}


/***/ },

/***/ "./node_modules/svelte/src/internal/client/dev/legacy.js"
/*!***************************************************************!*\
  !*** ./node_modules/svelte/src/internal/client/dev/legacy.js ***!
  \***************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   check_target: () => (/* binding */ check_target),
/* harmony export */   legacy_api: () => (/* binding */ legacy_api)
/* harmony export */ });
/* harmony import */ var _errors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../errors.js */ "./node_modules/svelte/src/internal/client/errors.js");
/* harmony import */ var _context_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../context.js */ "./node_modules/svelte/src/internal/client/context.js");
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../constants.js */ "./node_modules/svelte/src/constants.js");




/** @param {Function & { [FILENAME]: string }} target */
function check_target(target) {
	if (target) {
		_errors_js__WEBPACK_IMPORTED_MODULE_0__.component_api_invalid_new(target[_constants_js__WEBPACK_IMPORTED_MODULE_2__.FILENAME] ?? 'a component', target.name);
	}
}

function legacy_api() {
	const component = _context_js__WEBPACK_IMPORTED_MODULE_1__.component_context?.function;

	/** @param {string} method */
	function error(method) {
		_errors_js__WEBPACK_IMPORTED_MODULE_0__.component_api_changed(method, component[_constants_js__WEBPACK_IMPORTED_MODULE_2__.FILENAME]);
	}

	return {
		$destroy: () => error('$destroy()'),
		$on: () => error('$on(...)'),
		$set: () => error('$set(...)')
	};
}


/***/ },

/***/ "./node_modules/svelte/src/internal/client/dev/ownership.js"
/*!******************************************************************!*\
  !*** ./node_modules/svelte/src/internal/client/dev/ownership.js ***!
  \******************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   create_ownership_validator: () => (/* binding */ create_ownership_validator)
/* harmony export */ });
/* harmony import */ var _shared_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/utils.js */ "./node_modules/svelte/src/internal/shared/utils.js");
/* harmony import */ var _client_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! #client/constants */ "./node_modules/svelte/src/internal/client/constants.js");
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../constants.js */ "./node_modules/svelte/src/constants.js");
/* harmony import */ var _context_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../context.js */ "./node_modules/svelte/src/internal/client/context.js");
/* harmony import */ var _warnings_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../warnings.js */ "./node_modules/svelte/src/internal/client/warnings.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../utils.js */ "./node_modules/svelte/src/utils.js");
/** @typedef {{ file: string, line: number, column: number }} Location */








/**
 * Sets up a validator that
 * - traverses the path of a prop to find out if it is allowed to be mutated
 * - checks that the binding chain is not interrupted
 * @param {Record<string, any>} props
 */
function create_ownership_validator(props) {
	const component = _context_js__WEBPACK_IMPORTED_MODULE_3__.component_context?.function;
	const parent = _context_js__WEBPACK_IMPORTED_MODULE_3__.component_context?.p?.function;

	return {
		/**
		 * @param {string} prop
		 * @param {any[]} path
		 * @param {any} result
		 * @param {number} line
		 * @param {number} column
		 */
		mutation: (prop, path, result, line, column) => {
			const name = path[0];
			if (is_bound_or_unset(props, name) || !parent) {
				return result;
			}

			/** @type {any} */
			let value = props;

			for (let i = 0; i < path.length - 1; i++) {
				value = value[path[i]];
				if (!value?.[_client_constants__WEBPACK_IMPORTED_MODULE_1__.STATE_SYMBOL]) {
					return result;
				}
			}

			const location = (0,_utils_js__WEBPACK_IMPORTED_MODULE_5__.sanitize_location)(`${component[_constants_js__WEBPACK_IMPORTED_MODULE_2__.FILENAME]}:${line}:${column}`);

			_warnings_js__WEBPACK_IMPORTED_MODULE_4__.ownership_invalid_mutation(name, location, prop, parent[_constants_js__WEBPACK_IMPORTED_MODULE_2__.FILENAME]);

			return result;
		},
		/**
		 * @param {any} key
		 * @param {any} child_component
		 * @param {() => any} value
		 */
		binding: (key, child_component, value) => {
			if (!is_bound_or_unset(props, key) && parent && value()?.[_client_constants__WEBPACK_IMPORTED_MODULE_1__.STATE_SYMBOL]) {
				_warnings_js__WEBPACK_IMPORTED_MODULE_4__.ownership_invalid_binding(
					component[_constants_js__WEBPACK_IMPORTED_MODULE_2__.FILENAME],
					key,
					child_component[_constants_js__WEBPACK_IMPORTED_MODULE_2__.FILENAME],
					parent[_constants_js__WEBPACK_IMPORTED_MODULE_2__.FILENAME]
				);
			}
		}
	};
}

/**
 * @param {Record<string, any>} props
 * @param {string} prop_name
 */
function is_bound_or_unset(props, prop_name) {
	// Can be the case when someone does `mount(Component, props)` with `let props = $state({...})`
	// or `createClassComponent(Component, props)`
	const is_entry_props = _client_constants__WEBPACK_IMPORTED_MODULE_1__.STATE_SYMBOL in props || _client_constants__WEBPACK_IMPORTED_MODULE_1__.LEGACY_PROPS in props;
	return (
		!!(0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_0__.get_descriptor)(props, prop_name)?.set ||
		(is_entry_props && prop_name in props) ||
		!(prop_name in props)
	);
}


/***/ },

/***/ "./node_modules/svelte/src/internal/client/dev/tracing.js"
/*!****************************************************************!*\
  !*** ./node_modules/svelte/src/internal/client/dev/tracing.js ***!
  \****************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   label: () => (/* binding */ label),
/* harmony export */   tag: () => (/* binding */ tag),
/* harmony export */   tag_proxy: () => (/* binding */ tag_proxy),
/* harmony export */   trace: () => (/* binding */ trace),
/* harmony export */   tracing_expressions: () => (/* binding */ tracing_expressions)
/* harmony export */ });
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../constants.js */ "./node_modules/svelte/src/constants.js");
/* harmony import */ var _shared_clone_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/clone.js */ "./node_modules/svelte/src/internal/shared/clone.js");
/* harmony import */ var _client_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! #client/constants */ "./node_modules/svelte/src/internal/client/constants.js");
/* harmony import */ var _reactivity_effects_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../reactivity/effects.js */ "./node_modules/svelte/src/internal/client/reactivity/effects.js");
/* harmony import */ var _runtime_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../runtime.js */ "./node_modules/svelte/src/internal/client/runtime.js");
/** @import { Derived, Reaction, Value } from '#client' */






/**
 * @typedef {{
 *   traces: Error[];
 * }} TraceEntry
 */

/** @type {{ reaction: Reaction | null, entries: Map<Value, TraceEntry> } | null} */
let tracing_expressions = null;

/**
 * @param {Value} signal
 * @param {TraceEntry} [entry]
 */
function log_entry(signal, entry) {
	const value = signal.v;

	if (value === _constants_js__WEBPACK_IMPORTED_MODULE_0__.UNINITIALIZED) {
		return;
	}

	const type = get_type(signal);
	const current_reaction = /** @type {Reaction} */ (_runtime_js__WEBPACK_IMPORTED_MODULE_4__.active_reaction);
	const dirty = signal.wv > current_reaction.wv || current_reaction.wv === 0;
	const style = dirty
		? 'color: CornflowerBlue; font-weight: bold'
		: 'color: grey; font-weight: normal';

	// eslint-disable-next-line no-console
	console.groupCollapsed(
		signal.label ? `%c${type}%c ${signal.label}` : `%c${type}%c`,
		style,
		dirty ? 'font-weight: normal' : style,
		typeof value === 'object' && value !== null && _client_constants__WEBPACK_IMPORTED_MODULE_2__.STATE_SYMBOL in value
			? (0,_shared_clone_js__WEBPACK_IMPORTED_MODULE_1__.snapshot)(value, true)
			: value
	);

	if (type === '$derived') {
		const deps = new Set(/** @type {Derived} */ (signal).deps);
		for (const dep of deps) {
			log_entry(dep);
		}
	}

	if (signal.created) {
		// eslint-disable-next-line no-console
		console.log(signal.created);
	}

	if (dirty && signal.updated) {
		for (const updated of signal.updated.values()) {
			if (updated.error) {
				// eslint-disable-next-line no-console
				console.log(updated.error);
			}
		}
	}

	if (entry) {
		for (var trace of entry.traces) {
			// eslint-disable-next-line no-console
			console.log(trace);
		}
	}

	// eslint-disable-next-line no-console
	console.groupEnd();
}

/**
 * @param {Value} signal
 * @returns {'$state' | '$derived' | 'store'}
 */
function get_type(signal) {
	if ((signal.f & (_client_constants__WEBPACK_IMPORTED_MODULE_2__.DERIVED | _client_constants__WEBPACK_IMPORTED_MODULE_2__.ASYNC)) !== 0) return '$derived';
	return signal.label?.startsWith('$') ? 'store' : '$state';
}

/**
 * @template T
 * @param {() => string} label
 * @param {() => T} fn
 */
function trace(label, fn) {
	var previously_tracing_expressions = tracing_expressions;

	try {
		tracing_expressions = { entries: new Map(), reaction: _runtime_js__WEBPACK_IMPORTED_MODULE_4__.active_reaction };

		var start = performance.now();
		var value = fn();
		var time = (performance.now() - start).toFixed(2);

		var prefix = (0,_runtime_js__WEBPACK_IMPORTED_MODULE_4__.untrack)(label);

		if (!(0,_reactivity_effects_js__WEBPACK_IMPORTED_MODULE_3__.effect_tracking)()) {
			// eslint-disable-next-line no-console
			console.log(`${prefix} %cran outside of an effect (${time}ms)`, 'color: grey');
		} else if (tracing_expressions.entries.size === 0) {
			// eslint-disable-next-line no-console
			console.log(`${prefix} %cno reactive dependencies (${time}ms)`, 'color: grey');
		} else {
			// eslint-disable-next-line no-console
			console.group(`${prefix} %c(${time}ms)`, 'color: grey');

			var entries = tracing_expressions.entries;

			(0,_runtime_js__WEBPACK_IMPORTED_MODULE_4__.untrack)(() => {
				for (const [signal, traces] of entries) {
					log_entry(signal, traces);
				}
			});

			tracing_expressions = null;

			// eslint-disable-next-line no-console
			console.groupEnd();
		}

		return value;
	} finally {
		tracing_expressions = previously_tracing_expressions;
	}
}

/**
 * @param {Value} source
 * @param {string} label
 */
function tag(source, label) {
	source.label = label;
	tag_proxy(source.v, label);

	return source;
}

/**
 * @param {unknown} value
 * @param {string} label
 */
function tag_proxy(value, label) {
	// @ts-expect-error
	value?.[_client_constants__WEBPACK_IMPORTED_MODULE_2__.PROXY_PATH_SYMBOL]?.(label);
	return value;
}

/**
 * @param {unknown} value
 */
function label(value) {
	if (typeof value === 'symbol') return `Symbol(${value.description})`;
	if (typeof value === 'function') return '<function>';
	if (typeof value === 'object' && value) return '<object>';
	return String(value);
}


/***/ },

/***/ "./node_modules/svelte/src/internal/client/dev/validation.js"
/*!*******************************************************************!*\
  !*** ./node_modules/svelte/src/internal/client/dev/validation.js ***!
  \*******************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   validate_snippet_args: () => (/* binding */ validate_snippet_args)
/* harmony export */ });
/* harmony import */ var _errors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../errors.js */ "./node_modules/svelte/src/internal/client/errors.js");

/**
 * @param {Node} anchor
 * @param {...(()=>any)[]} args
 */
function validate_snippet_args(anchor, ...args) {
	if (typeof anchor !== 'object' || !(anchor instanceof Node)) {
		_errors_js__WEBPACK_IMPORTED_MODULE_0__.invalid_snippet_arguments();
	}

	for (let arg of args) {
		if (typeof arg !== 'function') {
			_errors_js__WEBPACK_IMPORTED_MODULE_0__.invalid_snippet_arguments();
		}
	}
}


/***/ },

/***/ "./node_modules/svelte/src/internal/client/dom/blocks/async.js"
/*!*********************************************************************!*\
  !*** ./node_modules/svelte/src/internal/client/dom/blocks/async.js ***!
  \*********************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   async: () => (/* binding */ async)
/* harmony export */ });
/* harmony import */ var _reactivity_async_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../reactivity/async.js */ "./node_modules/svelte/src/internal/client/reactivity/async.js");
/* harmony import */ var _runtime_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../runtime.js */ "./node_modules/svelte/src/internal/client/runtime.js");
/* harmony import */ var _hydration_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../hydration.js */ "./node_modules/svelte/src/internal/client/dom/hydration.js");
/* harmony import */ var _template_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../template.js */ "./node_modules/svelte/src/internal/client/dom/template.js");
/** @import { Blocker, TemplateNode, Value } from '#client' */





/**
 * @param {TemplateNode} node
 * @param {Blocker[]} blockers
 * @param {Array<() => Promise<any>>} expressions
 * @param {(anchor: TemplateNode, ...deriveds: Value[]) => void} fn
 */
function async(node, blockers = [], expressions = [], fn) {
	var was_hydrating = _hydration_js__WEBPACK_IMPORTED_MODULE_2__.hydrating;
	var end = null;

	if (was_hydrating) {
		(0,_hydration_js__WEBPACK_IMPORTED_MODULE_2__.hydrate_next)();
		end = (0,_hydration_js__WEBPACK_IMPORTED_MODULE_2__.skip_nodes)(false);
		(0,_template_js__WEBPACK_IMPORTED_MODULE_3__.assign_nodes)(node, end); // Necessary if this wraps the sole child of a block, else end marker can be wrong
	}

	if (expressions.length === 0 && blockers.every((b) => b.settled)) {
		fn(node);

		// This is necessary because it is not guaranteed that the render function will
		// advance the hydration node to $.async's end marker: it may stop at an inner
		// block's end marker (in case of an inner if block for example), but it also may
		// stop at the correct $.async end marker (in case of component child) - hence
		// we can't just use hydrate_next()
		// TODO this feels indicative of a bug elsewhere; ideally we wouldn't need
		// to double-traverse in the already-resolved case
		if (was_hydrating) {
			(0,_hydration_js__WEBPACK_IMPORTED_MODULE_2__.set_hydrate_node)(end);
		}

		return;
	}

	if (was_hydrating) {
		var previous_hydrate_node = _hydration_js__WEBPACK_IMPORTED_MODULE_2__.hydrate_node;
		(0,_hydration_js__WEBPACK_IMPORTED_MODULE_2__.set_hydrate_node)(end);
	}

	;(0,_reactivity_async_js__WEBPACK_IMPORTED_MODULE_0__.flatten)(blockers, [], expressions, (values) => {
		if (was_hydrating) {
			(0,_hydration_js__WEBPACK_IMPORTED_MODULE_2__.set_hydrating)(true);
			(0,_hydration_js__WEBPACK_IMPORTED_MODULE_2__.set_hydrate_node)(previous_hydrate_node);
		}

		try {
			// get values eagerly to avoid creating blocks if they reject
			for (const d of values) (0,_runtime_js__WEBPACK_IMPORTED_MODULE_1__.get)(d);

			fn(node, ...values);
		} finally {
			if (was_hydrating) {
				(0,_hydration_js__WEBPACK_IMPORTED_MODULE_2__.set_hydrating)(false);
			}
		}
	});
}


/***/ },

/***/ "./node_modules/svelte/src/internal/client/dom/blocks/await.js"
/*!*********************************************************************!*\
  !*** ./node_modules/svelte/src/internal/client/dom/blocks/await.js ***!
  \*********************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   await_block: () => (/* binding */ await_block)
/* harmony export */ });
/* harmony import */ var _shared_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../shared/utils.js */ "./node_modules/svelte/src/internal/shared/utils.js");
/* harmony import */ var _reactivity_effects_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../reactivity/effects.js */ "./node_modules/svelte/src/internal/client/reactivity/effects.js");
/* harmony import */ var _reactivity_sources_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../reactivity/sources.js */ "./node_modules/svelte/src/internal/client/reactivity/sources.js");
/* harmony import */ var _hydration_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../hydration.js */ "./node_modules/svelte/src/internal/client/dom/hydration.js");
/* harmony import */ var _task_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../task.js */ "./node_modules/svelte/src/internal/client/dom/task.js");
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../constants.js */ "./node_modules/svelte/src/constants.js");
/* harmony import */ var _context_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../context.js */ "./node_modules/svelte/src/internal/client/context.js");
/* harmony import */ var _reactivity_batch_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../reactivity/batch.js */ "./node_modules/svelte/src/internal/client/reactivity/batch.js");
/* harmony import */ var _branches_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./branches.js */ "./node_modules/svelte/src/internal/client/dom/blocks/branches.js");
/* harmony import */ var _reactivity_async_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../reactivity/async.js */ "./node_modules/svelte/src/internal/client/reactivity/async.js");
/* harmony import */ var esm_env__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! esm-env */ "./node_modules/esm-env/index.js");
/** @import { Source, TemplateNode } from '#client' */












const PENDING = 0;
const THEN = 1;
const CATCH = 2;

/** @typedef {typeof PENDING | typeof THEN | typeof CATCH} AwaitState */

/**
 * @template V
 * @param {TemplateNode} node
 * @param {(() => any)} get_input
 * @param {null | ((anchor: Node) => void)} pending_fn
 * @param {null | ((anchor: Node, value: Source<V>) => void)} then_fn
 * @param {null | ((anchor: Node, error: unknown) => void)} catch_fn
 * @returns {void}
 */
function await_block(node, get_input, pending_fn, then_fn, catch_fn) {
	if (_hydration_js__WEBPACK_IMPORTED_MODULE_3__.hydrating) {
		(0,_hydration_js__WEBPACK_IMPORTED_MODULE_3__.hydrate_next)();
	}

	var runes = (0,_context_js__WEBPACK_IMPORTED_MODULE_6__.is_runes)();

	var v = /** @type {V} */ (_constants_js__WEBPACK_IMPORTED_MODULE_5__.UNINITIALIZED);
	var value = runes ? (0,_reactivity_sources_js__WEBPACK_IMPORTED_MODULE_2__.source)(v) : (0,_reactivity_sources_js__WEBPACK_IMPORTED_MODULE_2__.mutable_source)(v, false, false);
	var error = runes ? (0,_reactivity_sources_js__WEBPACK_IMPORTED_MODULE_2__.source)(v) : (0,_reactivity_sources_js__WEBPACK_IMPORTED_MODULE_2__.mutable_source)(v, false, false);

	if (esm_env__WEBPACK_IMPORTED_MODULE_10__.DEV) {
		value.label = '{#await ...} value';
		error.label = '{#await ...} error';
	}

	var branches = new _branches_js__WEBPACK_IMPORTED_MODULE_8__.BranchManager(node);

	(0,_reactivity_effects_js__WEBPACK_IMPORTED_MODULE_1__.block)(() => {
		var batch = /** @type {Batch} */ (_reactivity_batch_js__WEBPACK_IMPORTED_MODULE_7__.current_batch);
		var input = get_input();

		var destroyed = false;

		/** Whether or not there was a hydration mismatch. Needs to be a `let` or else it isn't treeshaken out */
		// @ts-ignore coercing `node` to a `Comment` causes TypeScript and Prettier to fight
		let mismatch = _hydration_js__WEBPACK_IMPORTED_MODULE_3__.hydrating && (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_0__.is_promise)(input) === (node.data === _constants_js__WEBPACK_IMPORTED_MODULE_5__.HYDRATION_START_ELSE);

		if (mismatch) {
			// Hydration mismatch: remove everything inside the anchor and start fresh
			(0,_hydration_js__WEBPACK_IMPORTED_MODULE_3__.set_hydrate_node)((0,_hydration_js__WEBPACK_IMPORTED_MODULE_3__.skip_nodes)());
			(0,_hydration_js__WEBPACK_IMPORTED_MODULE_3__.set_hydrating)(false);
		}

		if ((0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_0__.is_promise)(input)) {
			var restore = (0,_reactivity_async_js__WEBPACK_IMPORTED_MODULE_9__.capture)();
			var resolved = false;

			/**
			 * @param {() => void} fn
			 */
			const resolve = (fn) => {
				if (destroyed) return;

				resolved = true;
				// We don't want to restore the previous batch here; {#await} blocks don't follow the async logic
				// we have elsewhere, instead pending/resolve/fail states are each their own batch so to speak.
				restore(false);
				// ...but it might still be set here. That means a `save(...)` has restored it — but that batch will
				// likely already have been committed by the time it resolves, and this resolve should be processed
				// in a separate batch. We're not using batch.deactivate()/activate() above because get_input()
				// could write to sources, which would then incorrectly create a new batch or could mess with
				// async_derived expecting a current_batch to exist.
				if (_reactivity_batch_js__WEBPACK_IMPORTED_MODULE_7__.current_batch === batch) {
					batch.deactivate();
				}
				// Make sure we have a batch, since the branch manager expects one to exist
				_reactivity_batch_js__WEBPACK_IMPORTED_MODULE_7__.Batch.ensure();

				try {
					fn();
				} finally {
					;(0,_reactivity_async_js__WEBPACK_IMPORTED_MODULE_9__.unset_context)(false);

					// without this, the DOM does not update until two ticks after the promise
					// resolves, which is unexpected behaviour (and somewhat irksome to test)
					if (!_reactivity_batch_js__WEBPACK_IMPORTED_MODULE_7__.is_flushing_sync) (0,_reactivity_batch_js__WEBPACK_IMPORTED_MODULE_7__.flushSync)();
				}
			};

			input.then(
				(v) => {
					resolve(() => {
						(0,_reactivity_sources_js__WEBPACK_IMPORTED_MODULE_2__.internal_set)(value, v);
						branches.ensure(THEN, then_fn && ((target) => then_fn(target, value)));
					});
				},
				(e) => {
					resolve(() => {
						(0,_reactivity_sources_js__WEBPACK_IMPORTED_MODULE_2__.internal_set)(error, e);
						branches.ensure(CATCH, catch_fn && ((target) => catch_fn(target, error)));

						if (!catch_fn) {
							// Rethrow the error if no catch block exists
							throw error.v;
						}
					});
				}
			);

			if (_hydration_js__WEBPACK_IMPORTED_MODULE_3__.hydrating) {
				branches.ensure(PENDING, pending_fn);
			} else {
				// Wait a microtask before checking if we should show the pending state as
				// the promise might have resolved by then
				(0,_task_js__WEBPACK_IMPORTED_MODULE_4__.queue_micro_task)(() => {
					if (!resolved) {
						resolve(() => {
							branches.ensure(PENDING, pending_fn);
						});
					}
				});
			}
		} else {
			(0,_reactivity_sources_js__WEBPACK_IMPORTED_MODULE_2__.internal_set)(value, input);
			branches.ensure(THEN, then_fn && ((target) => then_fn(target, value)));
		}

		if (mismatch) {
			// continue in hydration mode
			(0,_hydration_js__WEBPACK_IMPORTED_MODULE_3__.set_hydrating)(true);
		}

		return () => {
			destroyed = true;
		};
	});
}


/***/ },

/***/ "./node_modules/svelte/src/internal/client/dom/blocks/boundary.js"
/*!************************************************************************!*\
  !*** ./node_modules/svelte/src/internal/client/dom/blocks/boundary.js ***!
  \************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Boundary: () => (/* binding */ Boundary),
/* harmony export */   boundary: () => (/* binding */ boundary),
/* harmony export */   pending: () => (/* binding */ pending)
/* harmony export */ });
/* harmony import */ var _client_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! #client/constants */ "./node_modules/svelte/src/internal/client/constants.js");
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../constants.js */ "./node_modules/svelte/src/constants.js");
/* harmony import */ var _context_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../context.js */ "./node_modules/svelte/src/internal/client/context.js");
/* harmony import */ var _error_handling_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../error-handling.js */ "./node_modules/svelte/src/internal/client/error-handling.js");
/* harmony import */ var _reactivity_effects_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../reactivity/effects.js */ "./node_modules/svelte/src/internal/client/reactivity/effects.js");
/* harmony import */ var _runtime_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../runtime.js */ "./node_modules/svelte/src/internal/client/runtime.js");
/* harmony import */ var _hydration_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../hydration.js */ "./node_modules/svelte/src/internal/client/dom/hydration.js");
/* harmony import */ var _task_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../task.js */ "./node_modules/svelte/src/internal/client/dom/task.js");
/* harmony import */ var _errors_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../errors.js */ "./node_modules/svelte/src/internal/client/errors.js");
/* harmony import */ var _warnings_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../warnings.js */ "./node_modules/svelte/src/internal/client/warnings.js");
/* harmony import */ var esm_env__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! esm-env */ "./node_modules/esm-env/index.js");
/* harmony import */ var _reactivity_batch_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../reactivity/batch.js */ "./node_modules/svelte/src/internal/client/reactivity/batch.js");
/* harmony import */ var _reactivity_sources_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../reactivity/sources.js */ "./node_modules/svelte/src/internal/client/reactivity/sources.js");
/* harmony import */ var _dev_tracing_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../dev/tracing.js */ "./node_modules/svelte/src/internal/client/dev/tracing.js");
/* harmony import */ var _reactivity_create_subscriber_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../../reactivity/create-subscriber.js */ "./node_modules/svelte/src/reactivity/create-subscriber.js");
/* harmony import */ var _operations_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../operations.js */ "./node_modules/svelte/src/internal/client/dom/operations.js");
/* harmony import */ var _reactivity_utils_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../reactivity/utils.js */ "./node_modules/svelte/src/internal/client/reactivity/utils.js");
/** @import { Effect, Source, TemplateNode, } from '#client' */


















/**
 * @typedef {{
 * 	 onerror?: ((error: unknown, reset: () => void) => void) | null;
 *   failed?: ((anchor: Node, error: () => unknown, reset: () => () => void) => void) | null;
 *   pending?: ((anchor: Node) => void) | null;
 * }} BoundaryProps
 */

var flags = _client_constants__WEBPACK_IMPORTED_MODULE_0__.EFFECT_TRANSPARENT | _client_constants__WEBPACK_IMPORTED_MODULE_0__.EFFECT_PRESERVED;

/**
 * @param {TemplateNode} node
 * @param {BoundaryProps} props
 * @param {((anchor: Node) => void)} children
 * @param {((error: unknown) => unknown) | undefined} [transform_error]
 * @returns {void}
 */
function boundary(node, props, children, transform_error) {
	new Boundary(node, props, children, transform_error);
}

class Boundary {
	/** @type {Boundary | null} */
	parent;

	is_pending = false;

	/**
	 * API-level transformError transform function. Transforms errors before they reach the `failed` snippet.
	 * Inherited from parent boundary, or defaults to identity.
	 * @type {(error: unknown) => unknown}
	 */
	transform_error;

	/** @type {TemplateNode} */
	#anchor;

	/** @type {TemplateNode | null} */
	#hydrate_open = _hydration_js__WEBPACK_IMPORTED_MODULE_6__.hydrating ? _hydration_js__WEBPACK_IMPORTED_MODULE_6__.hydrate_node : null;

	/** @type {BoundaryProps} */
	#props;

	/** @type {((anchor: Node) => void)} */
	#children;

	/** @type {Effect} */
	#effect;

	/** @type {Effect | null} */
	#main_effect = null;

	/** @type {Effect | null} */
	#pending_effect = null;

	/** @type {Effect | null} */
	#failed_effect = null;

	/** @type {DocumentFragment | null} */
	#offscreen_fragment = null;

	#local_pending_count = 0;
	#pending_count = 0;
	#pending_count_update_queued = false;

	/** @type {Set<Effect>} */
	#dirty_effects = new Set();

	/** @type {Set<Effect>} */
	#maybe_dirty_effects = new Set();

	/**
	 * A source containing the number of pending async deriveds/expressions.
	 * Only created if `$effect.pending()` is used inside the boundary,
	 * otherwise updating the source results in needless `Batch.ensure()`
	 * calls followed by no-op flushes
	 * @type {Source<number> | null}
	 */
	#effect_pending = null;

	#effect_pending_subscriber = (0,_reactivity_create_subscriber_js__WEBPACK_IMPORTED_MODULE_14__.createSubscriber)(() => {
		this.#effect_pending = (0,_reactivity_sources_js__WEBPACK_IMPORTED_MODULE_12__.source)(this.#local_pending_count);

		if (esm_env__WEBPACK_IMPORTED_MODULE_10__.DEV) {
			(0,_dev_tracing_js__WEBPACK_IMPORTED_MODULE_13__.tag)(this.#effect_pending, '$effect.pending()');
		}

		return () => {
			this.#effect_pending = null;
		};
	});

	/**
	 * @param {TemplateNode} node
	 * @param {BoundaryProps} props
	 * @param {((anchor: Node) => void)} children
	 * @param {((error: unknown) => unknown) | undefined} [transform_error]
	 */
	constructor(node, props, children, transform_error) {
		this.#anchor = node;
		this.#props = props;

		this.#children = (anchor) => {
			var effect = /** @type {Effect} */ (_runtime_js__WEBPACK_IMPORTED_MODULE_5__.active_effect);

			effect.b = this;
			effect.f |= _client_constants__WEBPACK_IMPORTED_MODULE_0__.BOUNDARY_EFFECT;

			children(anchor);
		};

		this.parent = /** @type {Effect} */ (_runtime_js__WEBPACK_IMPORTED_MODULE_5__.active_effect).b;

		// Inherit transform_error from parent boundary, or use the provided one, or default to identity
		this.transform_error = transform_error ?? this.parent?.transform_error ?? ((e) => e);

		this.#effect = (0,_reactivity_effects_js__WEBPACK_IMPORTED_MODULE_4__.block)(() => {
			if (_hydration_js__WEBPACK_IMPORTED_MODULE_6__.hydrating) {
				const comment = /** @type {Comment} */ (this.#hydrate_open);
				(0,_hydration_js__WEBPACK_IMPORTED_MODULE_6__.hydrate_next)();

				const server_rendered_pending = comment.data === _constants_js__WEBPACK_IMPORTED_MODULE_1__.HYDRATION_START_ELSE;
				const server_rendered_failed = comment.data.startsWith(_constants_js__WEBPACK_IMPORTED_MODULE_1__.HYDRATION_START_FAILED);

				if (server_rendered_failed) {
					// Server rendered the failed snippet - hydrate it.
					// The serialized error is embedded in the comment: <!--[?<json>-->
					const serialized_error = JSON.parse(comment.data.slice(_constants_js__WEBPACK_IMPORTED_MODULE_1__.HYDRATION_START_FAILED.length));
					this.#hydrate_failed_content(serialized_error);
				} else if (server_rendered_pending) {
					this.#hydrate_pending_content();
				} else {
					this.#hydrate_resolved_content();
				}
			} else {
				this.#render();
			}
		}, flags);

		if (_hydration_js__WEBPACK_IMPORTED_MODULE_6__.hydrating) {
			this.#anchor = _hydration_js__WEBPACK_IMPORTED_MODULE_6__.hydrate_node;
		}
	}

	#hydrate_resolved_content() {
		try {
			this.#main_effect = (0,_reactivity_effects_js__WEBPACK_IMPORTED_MODULE_4__.branch)(() => this.#children(this.#anchor));
		} catch (error) {
			this.error(error);
		}
	}

	/**
	 * @param {unknown} error The deserialized error from the server's hydration comment
	 */
	#hydrate_failed_content(error) {
		const failed = this.#props.failed;
		const { reset, invoke_onerror } = this.#create_reset(error);

		// `onerror` may mutate state, which is disallowed while hydrating
		(0,_task_js__WEBPACK_IMPORTED_MODULE_7__.queue_micro_task)(invoke_onerror);

		if (!failed) return;

		this.#failed_effect = (0,_reactivity_effects_js__WEBPACK_IMPORTED_MODULE_4__.branch)(() => {
			failed(
				this.#anchor,
				() => error,
				() => reset
			);
		});
	}

	/**
	 * Creates the `reset` function for a failed boundary, along with a function
	 * that invokes `onerror` with it (if provided)
	 * @param {unknown} error
	 * @returns {{ reset: () => void, invoke_onerror: () => void }}
	 */
	#create_reset(error) {
		var did_reset = false;
		var calling_on_error = false;

		const reset = () => {
			if (did_reset) {
				_warnings_js__WEBPACK_IMPORTED_MODULE_9__.svelte_boundary_reset_noop();
				return;
			}

			did_reset = true;

			if (calling_on_error) {
				_errors_js__WEBPACK_IMPORTED_MODULE_8__.svelte_boundary_reset_onerror();
			}

			if (this.#failed_effect !== null) {
				(0,_reactivity_effects_js__WEBPACK_IMPORTED_MODULE_4__.pause_effect)(this.#failed_effect, () => {
					this.#failed_effect = null;
				});
			}

			this.#run(() => {
				this.#render();
			});
		};

		const invoke_onerror = () => {
			try {
				calling_on_error = true;
				this.#props.onerror?.(error, reset);
				calling_on_error = false;
			} catch (err) {
				;(0,_error_handling_js__WEBPACK_IMPORTED_MODULE_3__.invoke_error_boundary)(err, this.#effect && this.#effect.parent);
			}
		};

		return { reset, invoke_onerror };
	}

	#hydrate_pending_content() {
		const pending = this.#props.pending;
		if (!pending) return;

		this.is_pending = true;
		this.#pending_effect = (0,_reactivity_effects_js__WEBPACK_IMPORTED_MODULE_4__.branch)(() => pending(this.#anchor));

		(0,_task_js__WEBPACK_IMPORTED_MODULE_7__.queue_micro_task)(() => {
			var fragment = (this.#offscreen_fragment = document.createDocumentFragment());
			var anchor = (0,_operations_js__WEBPACK_IMPORTED_MODULE_15__.create_text)();
			var handled = false;

			fragment.append(anchor);

			this.#main_effect = this.#run(() => {
				try {
					return (0,_reactivity_effects_js__WEBPACK_IMPORTED_MODULE_4__.branch)(() => this.#children(anchor));
				} catch (error) {
					try {
						this.error(error);
						handled = true;
					} catch (error) {
						;(0,_error_handling_js__WEBPACK_IMPORTED_MODULE_3__.invoke_error_boundary)(error, this.#effect.parent);
					}

					return null;
				}
			});

			if (this.#main_effect === null) {
				this.#offscreen_fragment = null;
				if (handled) this.#resolve(/** @type {Batch} */ (_reactivity_batch_js__WEBPACK_IMPORTED_MODULE_11__.current_batch));
				return;
			}

			if (this.#pending_count === 0) {
				this.#anchor.before(fragment);
				this.#offscreen_fragment = null;

				(0,_reactivity_effects_js__WEBPACK_IMPORTED_MODULE_4__.pause_effect)(/** @type {Effect} */ (this.#pending_effect), () => {
					this.#pending_effect = null;
				});

				this.#resolve(/** @type {Batch} */ (_reactivity_batch_js__WEBPACK_IMPORTED_MODULE_11__.current_batch));
			}
		});
	}

	#render() {
		try {
			this.is_pending = this.has_pending_snippet();
			this.#pending_count = 0;
			this.#local_pending_count = 0;

			this.#main_effect = (0,_reactivity_effects_js__WEBPACK_IMPORTED_MODULE_4__.branch)(() => {
				this.#children(this.#anchor);
			});

			if (this.#pending_count > 0) {
				var fragment = (this.#offscreen_fragment = document.createDocumentFragment());
				(0,_reactivity_effects_js__WEBPACK_IMPORTED_MODULE_4__.move_effect)(this.#main_effect, fragment);

				const pending = /** @type {(anchor: Node) => void} */ (this.#props.pending);
				this.#pending_effect = (0,_reactivity_effects_js__WEBPACK_IMPORTED_MODULE_4__.branch)(() => pending(this.#anchor));
			} else {
				this.#resolve(/** @type {Batch} */ (_reactivity_batch_js__WEBPACK_IMPORTED_MODULE_11__.current_batch));
			}
		} catch (error) {
			this.error(error);
		}
	}

	/**
	 * @param {Batch} batch
	 */
	#resolve(batch) {
		this.is_pending = false;

		// any effects that were previously deferred should be transferred
		// to the batch, which will flush in the next microtask
		batch.transfer_effects(this.#dirty_effects, this.#maybe_dirty_effects);
	}

	/**
	 * Defer an effect inside a pending boundary until the boundary resolves
	 * @param {Effect} effect
	 */
	defer_effect(effect) {
		;(0,_reactivity_utils_js__WEBPACK_IMPORTED_MODULE_16__.defer_effect)(effect, this.#dirty_effects, this.#maybe_dirty_effects);
	}

	/**
	 * Returns `false` if the effect exists inside a boundary whose pending snippet is shown
	 * @returns {boolean}
	 */
	is_rendered() {
		return !this.is_pending && (!this.parent || this.parent.is_rendered());
	}

	has_pending_snippet() {
		return !!this.#props.pending;
	}

	/**
	 * @template T
	 * @param {() => T} fn
	 */
	#run(fn) {
		var previous_effect = _runtime_js__WEBPACK_IMPORTED_MODULE_5__.active_effect;
		var previous_reaction = _runtime_js__WEBPACK_IMPORTED_MODULE_5__.active_reaction;
		var previous_ctx = _context_js__WEBPACK_IMPORTED_MODULE_2__.component_context;

		(0,_runtime_js__WEBPACK_IMPORTED_MODULE_5__.set_active_effect)(this.#effect);
		(0,_runtime_js__WEBPACK_IMPORTED_MODULE_5__.set_active_reaction)(this.#effect);
		(0,_context_js__WEBPACK_IMPORTED_MODULE_2__.set_component_context)(this.#effect.ctx);

		try {
			_reactivity_batch_js__WEBPACK_IMPORTED_MODULE_11__.Batch.ensure();
			return fn();
		} finally {
			;(0,_runtime_js__WEBPACK_IMPORTED_MODULE_5__.set_active_effect)(previous_effect);
			(0,_runtime_js__WEBPACK_IMPORTED_MODULE_5__.set_active_reaction)(previous_reaction);
			(0,_context_js__WEBPACK_IMPORTED_MODULE_2__.set_component_context)(previous_ctx);
		}
	}

	/**
	 * Updates the pending count associated with the currently visible pending snippet,
	 * if any, such that we can replace the snippet with content once work is done
	 * @param {1 | -1} d
	 * @param {Batch} batch
	 */
	#update_pending_count(d, batch) {
		if (!this.has_pending_snippet()) {
			if (this.parent) {
				this.parent.#update_pending_count(d, batch);
			}

			// if there's no parent, we're in a scope with no pending snippet
			return;
		}

		this.#pending_count += d;

		if (this.#pending_count === 0) {
			this.#resolve(batch);

			if (this.#pending_effect) {
				(0,_reactivity_effects_js__WEBPACK_IMPORTED_MODULE_4__.pause_effect)(this.#pending_effect, () => {
					this.#pending_effect = null;
				});
			}

			if (this.#offscreen_fragment) {
				this.#anchor.before(this.#offscreen_fragment);
				this.#offscreen_fragment = null;
			}
		}
	}

	/**
	 * Update the source that powers `$effect.pending()` inside this boundary,
	 * and controls when the current `pending` snippet (if any) is removed.
	 * Do not call from inside the class
	 * @param {1 | -1} d
	 * @param {Batch} batch
	 */
	update_pending_count(d, batch) {
		this.#update_pending_count(d, batch);

		this.#local_pending_count += d;

		if (!this.#effect_pending || this.#pending_count_update_queued) return;
		this.#pending_count_update_queued = true;

		(0,_task_js__WEBPACK_IMPORTED_MODULE_7__.queue_micro_task)(() => {
			this.#pending_count_update_queued = false;
			if (this.#effect_pending) {
				(0,_reactivity_sources_js__WEBPACK_IMPORTED_MODULE_12__.internal_set)(this.#effect_pending, this.#local_pending_count);
			}
		});
	}

	get_effect_pending() {
		this.#effect_pending_subscriber();
		return (0,_runtime_js__WEBPACK_IMPORTED_MODULE_5__.get)(/** @type {Source<number>} */ (this.#effect_pending));
	}

	/** @param {unknown} error */
	error(error) {
		// If we have nothing to capture the error, or if we hit an error while
		// rendering the fallback, re-throw for another boundary to handle
		if (!this.#props.onerror && !this.#props.failed) {
			throw error;
		}

		if (_reactivity_batch_js__WEBPACK_IMPORTED_MODULE_11__.current_batch?.is_fork) {
			if (this.#main_effect) _reactivity_batch_js__WEBPACK_IMPORTED_MODULE_11__.current_batch.skip_effect(this.#main_effect);
			if (this.#pending_effect) _reactivity_batch_js__WEBPACK_IMPORTED_MODULE_11__.current_batch.skip_effect(this.#pending_effect);
			if (this.#failed_effect) _reactivity_batch_js__WEBPACK_IMPORTED_MODULE_11__.current_batch.skip_effect(this.#failed_effect);

			_reactivity_batch_js__WEBPACK_IMPORTED_MODULE_11__.current_batch.oncommit(() => {
				this.#handle_error(error);
			});
		} else {
			this.#handle_error(error);
		}
	}

	/**
	 * @param {unknown} error
	 */
	#handle_error(error) {
		if (this.#main_effect) {
			(0,_reactivity_effects_js__WEBPACK_IMPORTED_MODULE_4__.destroy_effect)(this.#main_effect);
			this.#main_effect = null;
		}

		if (this.#pending_effect) {
			(0,_reactivity_effects_js__WEBPACK_IMPORTED_MODULE_4__.destroy_effect)(this.#pending_effect);
			this.#pending_effect = null;
		}

		if (this.#failed_effect) {
			(0,_reactivity_effects_js__WEBPACK_IMPORTED_MODULE_4__.destroy_effect)(this.#failed_effect);
			this.#failed_effect = null;
		}

		if (_hydration_js__WEBPACK_IMPORTED_MODULE_6__.hydrating) {
			(0,_hydration_js__WEBPACK_IMPORTED_MODULE_6__.set_hydrate_node)(/** @type {TemplateNode} */ (this.#hydrate_open));
			(0,_hydration_js__WEBPACK_IMPORTED_MODULE_6__.next)();
			(0,_hydration_js__WEBPACK_IMPORTED_MODULE_6__.set_hydrate_node)((0,_hydration_js__WEBPACK_IMPORTED_MODULE_6__.skip_nodes)());
		}

		let failed = this.#props.failed;

		/** @param {unknown} transformed_error */
		const handle_error_result = (transformed_error) => {
			const { reset, invoke_onerror } = this.#create_reset(transformed_error);

			invoke_onerror();

			if (failed) {
				this.#failed_effect = this.#run(() => {
					try {
						return (0,_reactivity_effects_js__WEBPACK_IMPORTED_MODULE_4__.branch)(() => {
							// errors in `failed` snippets cause the boundary to error again
							// TODO Svelte 6: revisit this decision, most likely better to go to parent boundary instead
							var effect = /** @type {Effect} */ (_runtime_js__WEBPACK_IMPORTED_MODULE_5__.active_effect);

							effect.b = this;
							effect.f |= _client_constants__WEBPACK_IMPORTED_MODULE_0__.BOUNDARY_EFFECT;

							failed(
								this.#anchor,
								() => transformed_error,
								() => reset
							);
						});
					} catch (error) {
						;(0,_error_handling_js__WEBPACK_IMPORTED_MODULE_3__.invoke_error_boundary)(error, /** @type {Effect} */ (this.#effect.parent));
						return null;
					}
				});
			}
		};

		(0,_task_js__WEBPACK_IMPORTED_MODULE_7__.queue_micro_task)(() => {
			// Run the error through the API-level transformError transform (e.g. SvelteKit's handleError)
			/** @type {unknown} */
			var result;
			try {
				result = this.transform_error(error);
			} catch (e) {
				;(0,_error_handling_js__WEBPACK_IMPORTED_MODULE_3__.invoke_error_boundary)(e, this.#effect && this.#effect.parent);
				return;
			}

			if (
				result !== null &&
				typeof result === 'object' &&
				typeof (/** @type {any} */ (result).then) === 'function'
			) {
				// transformError returned a Promise — wait for it
				/** @type {any} */ (result).then(
					handle_error_result,
					/** @param {unknown} e */
					(e) => (0,_error_handling_js__WEBPACK_IMPORTED_MODULE_3__.invoke_error_boundary)(e, this.#effect && this.#effect.parent)
				);
			} else {
				// Synchronous result — handle immediately
				handle_error_result(result);
			}
		});
	}
}

function pending() {
	if (_runtime_js__WEBPACK_IMPORTED_MODULE_5__.active_effect === null) {
		_errors_js__WEBPACK_IMPORTED_MODULE_8__.effect_pending_outside_reaction();
	}

	var boundary = _runtime_js__WEBPACK_IMPORTED_MODULE_5__.active_effect.b;

	if (boundary === null) {
		return 0; // TODO eventually we will need this to be global
	}

	return boundary.get_effect_pending();
}


/***/ },

/***/ "./node_modules/svelte/src/internal/client/dom/blocks/branches.js"
/*!************************************************************************!*\
  !*** ./node_modules/svelte/src/internal/client/dom/blocks/branches.js ***!
  \************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BranchManager: () => (/* binding */ BranchManager)
/* harmony export */ });
/* harmony import */ var _reactivity_batch_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../reactivity/batch.js */ "./node_modules/svelte/src/internal/client/reactivity/batch.js");
/* harmony import */ var _reactivity_effects_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../reactivity/effects.js */ "./node_modules/svelte/src/internal/client/reactivity/effects.js");
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../constants.js */ "./node_modules/svelte/src/internal/client/constants.js");
/* harmony import */ var _hydration_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../hydration.js */ "./node_modules/svelte/src/internal/client/dom/hydration.js");
/* harmony import */ var _operations_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../operations.js */ "./node_modules/svelte/src/internal/client/dom/operations.js");
/* harmony import */ var esm_env__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! esm-env */ "./node_modules/esm-env/index.js");
/** @import { Effect, TemplateNode } from '#client' */







/**
 * @typedef {{ effect: Effect, fragment: DocumentFragment }} Branch
 */

/**
 * @template Key
 */
class BranchManager {
	/** @type {TemplateNode} */
	anchor;

	/** @type {Map<Batch, Key>} */
	#batches = new Map();

	/**
	 * Map of keys to effects that are currently rendered in the DOM.
	 * These effects are visible and actively part of the document tree.
	 * Example:
	 * ```
	 * {#if condition}
	 * 	foo
	 * {:else}
	 * 	bar
	 * {/if}
	 * ```
	 * Can result in the entries `true->Effect` and `false->Effect`
	 * @type {Map<Key, Effect>}
	 */
	#onscreen = new Map();

	/**
	 * Similar to #onscreen with respect to the keys, but contains branches that are not yet
	 * in the DOM, because their insertion is deferred.
	 * @type {Map<Key, Branch>}
	 */
	#offscreen = new Map();

	/**
	 * Keys of effects that are currently outroing
	 * @type {Set<Key>}
	 */
	#outroing = new Set();

	/**
	 * Whether to pause (i.e. outro) on change, or destroy immediately.
	 * This is necessary for `<svelte:element>`
	 */
	#transition = true;

	/**
	 * @param {TemplateNode} anchor
	 * @param {boolean} transition
	 */
	constructor(anchor, transition = true) {
		this.anchor = anchor;
		this.#transition = transition;
	}

	/**
	 * @param {Batch} batch
	 */
	#commit = (batch) => {
		// if this batch was made obsolete, bail
		if (!this.#batches.has(batch)) return;

		var key = /** @type {Key} */ (this.#batches.get(batch));

		var onscreen = this.#onscreen.get(key);

		if (onscreen) {
			// effect is already in the DOM — abort any current outro
			(0,_reactivity_effects_js__WEBPACK_IMPORTED_MODULE_1__.resume_effect)(onscreen);
			this.#outroing.delete(key);
		} else {
			// effect is currently offscreen. put it in the DOM
			var offscreen = this.#offscreen.get(key);

			if (offscreen) {
				// effect could have been outro'ed before through a prior batch — resume if necessary
				(0,_reactivity_effects_js__WEBPACK_IMPORTED_MODULE_1__.resume_effect)(offscreen.effect);
				this.#onscreen.set(key, offscreen.effect);
				this.#offscreen.delete(key);

				if (esm_env__WEBPACK_IMPORTED_MODULE_5__.DEV) {
					// Tell hmr.js about the anchor it should use for updates,
					// since the initial one will be removed
					/** @type {any} */ (offscreen.fragment.lastChild)[_constants_js__WEBPACK_IMPORTED_MODULE_2__.HMR_ANCHOR] = this.anchor;
				}

				// remove the anchor...
				/** @type {TemplateNode} */ (offscreen.fragment.lastChild).remove();

				// ...and append the fragment
				this.anchor.before(offscreen.fragment);
				onscreen = offscreen.effect;
			}
		}

		for (const [b, k] of this.#batches) {
			this.#batches.delete(b);

			if (b === batch) {
				// keep values for newer batches
				break;
			}

			const offscreen = this.#offscreen.get(k);

			if (offscreen) {
				// for older batches, destroy offscreen effects
				// as they will never be committed
				(0,_reactivity_effects_js__WEBPACK_IMPORTED_MODULE_1__.destroy_effect)(offscreen.effect);
				this.#offscreen.delete(k);
			}
		}

		// outro/destroy all onscreen effects...
		for (const [k, effect] of this.#onscreen) {
			// ...except the one that was just committed
			//    or those that are already outroing (else the transition is aborted and the effect destroyed right away)
			if (k === key || this.#outroing.has(k)) continue;

			const on_destroy = () => {
				const keys = Array.from(this.#batches.values());

				if (keys.includes(k)) {
					// keep the effect offscreen, as another batch will need it
					var fragment = document.createDocumentFragment();
					(0,_reactivity_effects_js__WEBPACK_IMPORTED_MODULE_1__.move_effect)(effect, fragment);

					fragment.append((0,_operations_js__WEBPACK_IMPORTED_MODULE_4__.create_text)()); // TODO can we avoid this?

					this.#offscreen.set(k, { effect, fragment });
				} else {
					(0,_reactivity_effects_js__WEBPACK_IMPORTED_MODULE_1__.destroy_effect)(effect);
				}

				this.#outroing.delete(k);
				this.#onscreen.delete(k);
			};

			if (this.#transition || !onscreen) {
				this.#outroing.add(k);
				(0,_reactivity_effects_js__WEBPACK_IMPORTED_MODULE_1__.pause_effect)(effect, on_destroy, false);
			} else {
				on_destroy();
			}
		}
	};

	/**
	 * @param {Batch} batch
	 */
	#discard = (batch) => {
		this.#batches.delete(batch);

		const keys = Array.from(this.#batches.values());

		for (const [k, branch] of this.#offscreen) {
			if (!keys.includes(k)) {
				(0,_reactivity_effects_js__WEBPACK_IMPORTED_MODULE_1__.destroy_effect)(branch.effect);
				this.#offscreen.delete(k);
			}
		}
	};

	/**
	 *
	 * @param {any} key
	 * @param {null | ((target: TemplateNode) => void)} fn
	 */
	ensure(key, fn) {
		var batch = /** @type {Batch} */ (_reactivity_batch_js__WEBPACK_IMPORTED_MODULE_0__.current_batch);
		var defer = (0,_operations_js__WEBPACK_IMPORTED_MODULE_4__.should_defer_append)();

		if (fn && !this.#onscreen.has(key) && !this.#offscreen.has(key)) {
			if (defer) {
				var fragment = document.createDocumentFragment();
				var target = (0,_operations_js__WEBPACK_IMPORTED_MODULE_4__.create_text)();

				fragment.append(target);

				this.#offscreen.set(key, {
					effect: (0,_reactivity_effects_js__WEBPACK_IMPORTED_MODULE_1__.branch)(() => fn(target)),
					fragment
				});
			} else {
				this.#onscreen.set(
					key,
					(0,_reactivity_effects_js__WEBPACK_IMPORTED_MODULE_1__.branch)(() => fn(this.anchor))
				);
			}
		}

		this.#batches.set(batch, key);

		if (defer) {
			for (const [k, effect] of this.#onscreen) {
				if (k === key) {
					batch.unskip_effect(effect);
				} else {
					batch.skip_effect(effect);
				}
			}

			for (const [k, branch] of this.#offscreen) {
				if (k === key) {
					batch.unskip_effect(branch.effect);
				} else {
					batch.skip_effect(branch.effect);
				}
			}

			batch.oncommit(this.#commit);
			batch.ondiscard(this.#discard);
		} else {
			if (_hydration_js__WEBPACK_IMPORTED_MODULE_3__.hydrating) {
				this.anchor = _hydration_js__WEBPACK_IMPORTED_MODULE_3__.hydrate_node;
			}

			this.#commit(batch);
		}
	}
}


/***/ },

/***/ "./node_modules/svelte/src/internal/client/dom/blocks/css-props.js"
/*!*************************************************************************!*\
  !*** ./node_modules/svelte/src/internal/client/dom/blocks/css-props.js ***!
  \*************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   css_props: () => (/* binding */ css_props)
/* harmony export */ });
/* harmony import */ var _reactivity_effects_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../reactivity/effects.js */ "./node_modules/svelte/src/internal/client/reactivity/effects.js");
/* harmony import */ var _hydration_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../hydration.js */ "./node_modules/svelte/src/internal/client/dom/hydration.js");
/* harmony import */ var _operations_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../operations.js */ "./node_modules/svelte/src/internal/client/dom/operations.js");




/**
 * @param {HTMLDivElement | SVGGElement} element
 * @param {() => Record<string, string>} get_styles
 * @returns {void}
 */
function css_props(element, get_styles) {
	if (_hydration_js__WEBPACK_IMPORTED_MODULE_1__.hydrating) {
		(0,_hydration_js__WEBPACK_IMPORTED_MODULE_1__.set_hydrate_node)((0,_operations_js__WEBPACK_IMPORTED_MODULE_2__.get_first_child)(element));
	}

	;(0,_reactivity_effects_js__WEBPACK_IMPORTED_MODULE_0__.render_effect)(() => {
		var styles = get_styles();

		for (var key in styles) {
			var value = styles[key];

			if (value == null || value === '') {
				element.style.removeProperty(key);
			} else {
				element.style.setProperty(key, value);
			}
		}
	});
}


/***/ },

/***/ "./node_modules/svelte/src/internal/client/dom/blocks/each.js"
/*!********************************************************************!*\
  !*** ./node_modules/svelte/src/internal/client/dom/blocks/each.js ***!
  \********************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   each: () => (/* binding */ each),
/* harmony export */   index: () => (/* binding */ index)
/* harmony export */ });
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../constants.js */ "./node_modules/svelte/src/constants.js");
/* harmony import */ var _hydration_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../hydration.js */ "./node_modules/svelte/src/internal/client/dom/hydration.js");
/* harmony import */ var _operations_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../operations.js */ "./node_modules/svelte/src/internal/client/dom/operations.js");
/* harmony import */ var _reactivity_effects_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../reactivity/effects.js */ "./node_modules/svelte/src/internal/client/reactivity/effects.js");
/* harmony import */ var _reactivity_sources_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../reactivity/sources.js */ "./node_modules/svelte/src/internal/client/reactivity/sources.js");
/* harmony import */ var _shared_utils_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../shared/utils.js */ "./node_modules/svelte/src/internal/shared/utils.js");
/* harmony import */ var _client_constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! #client/constants */ "./node_modules/svelte/src/internal/client/constants.js");
/* harmony import */ var _task_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../task.js */ "./node_modules/svelte/src/internal/client/dom/task.js");
/* harmony import */ var _runtime_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../runtime.js */ "./node_modules/svelte/src/internal/client/runtime.js");
/* harmony import */ var esm_env__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! esm-env */ "./node_modules/esm-env/index.js");
/* harmony import */ var _reactivity_deriveds_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../reactivity/deriveds.js */ "./node_modules/svelte/src/internal/client/reactivity/deriveds.js");
/* harmony import */ var _reactivity_batch_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../reactivity/batch.js */ "./node_modules/svelte/src/internal/client/reactivity/batch.js");
/* harmony import */ var _errors_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../errors.js */ "./node_modules/svelte/src/internal/client/errors.js");
/* harmony import */ var _dev_tracing_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../dev/tracing.js */ "./node_modules/svelte/src/internal/client/dev/tracing.js");
/** @import { EachItem, EachOutroGroup, EachState, Effect, EffectNodes, MaybeSource, Source, TemplateNode, TransitionManager, Value } from '#client' */
/** @import { Batch } from '../../reactivity/batch.js'; */















// When making substantive changes to this file, validate them with the each block stress test:
// https://svelte.dev/playground/1972b2cf46564476ad8c8c6405b23b7b
// This test also exists in this repo, as `packages/svelte/tests/manual/each-stress-test`

/**
 * @param {any} _
 * @param {number} i
 */
function index(_, i) {
	return i;
}

/**
 * Pause multiple effects simultaneously, and coordinate their
 * subsequent destruction. Used in each blocks
 * @param {EachState} state
 * @param {Effect[]} to_destroy
 * @param {null | Node} controlled_anchor
 */
function pause_effects(state, to_destroy, controlled_anchor) {
	/** @type {TransitionManager[]} */
	var transitions = [];
	var length = to_destroy.length;

	/** @type {EachOutroGroup} */
	var group;
	var remaining = to_destroy.length;

	for (var i = 0; i < length; i++) {
		let effect = to_destroy[i];

		(0,_reactivity_effects_js__WEBPACK_IMPORTED_MODULE_3__.pause_effect)(
			effect,
			() => {
				if (group) {
					group.pending.delete(effect);
					group.done.add(effect);

					if (group.pending.size === 0) {
						var groups = /** @type {Set<EachOutroGroup>} */ (state.outrogroups);

						destroy_effects(state, (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_5__.array_from)(group.done));
						groups.delete(group);

						if (groups.size === 0) {
							state.outrogroups = null;
						}
					}
				} else {
					remaining -= 1;
				}
			},
			false
		);
	}

	if (remaining === 0) {
		// If we're in a controlled each block (i.e. the block is the only child of an
		// element), and we are removing all items, _and_ there are no out transitions,
		// we can use the fast path — emptying the element and replacing the anchor.
		// Skip the fast path when another batch is still pending on this each block:
		// that batch's keys still reference EachItems in `state.items`, which
		// `destroy_effects` needs to preserve offscreen (see #18610).
		var fast_path =
			transitions.length === 0 && controlled_anchor !== null && state.pending.size === 0;

		if (fast_path) {
			var anchor = /** @type {Element} */ (controlled_anchor);
			var parent_node = /** @type {Element} */ (anchor.parentNode);

			(0,_operations_js__WEBPACK_IMPORTED_MODULE_2__.clear_text_content)(parent_node);
			parent_node.append(anchor);

			state.items.clear();
		}

		destroy_effects(state, to_destroy, !fast_path);
	} else {
		group = {
			pending: new Set(to_destroy),
			done: new Set()
		};

		(state.outrogroups ??= new Set()).add(group);
	}
}

/**
 * @param {EachState} state
 * @param {Effect[]} to_destroy
 * @param {boolean} remove_dom
 */
function destroy_effects(state, to_destroy, remove_dom = true) {
	/** @type {Set<Effect> | undefined} */
	var preserved_effects;

	// The loop-in-a-loop isn't ideal, but we should only hit this in relatively rare cases
	if (state.pending.size > 0) {
		preserved_effects = new Set();

		for (const keys of state.pending.values()) {
			for (const key of keys) {
				preserved_effects.add(/** @type {EachItem} */ (state.items.get(key)).e);
			}
		}
	}

	for (var i = 0; i < to_destroy.length; i++) {
		var e = to_destroy[i];

		if (preserved_effects?.has(e)) {
			e.f |= _client_constants__WEBPACK_IMPORTED_MODULE_6__.EFFECT_OFFSCREEN;

			const fragment = document.createDocumentFragment();
			(0,_reactivity_effects_js__WEBPACK_IMPORTED_MODULE_3__.move_effect)(e, fragment);
		} else {
			(0,_reactivity_effects_js__WEBPACK_IMPORTED_MODULE_3__.destroy_effect)(to_destroy[i], remove_dom);
		}
	}
}

/** @type {TemplateNode} */
var offscreen_anchor;

/**
 * @template V
 * @param {Element | Comment} node The next sibling node, or the parent node if this is a 'controlled' block
 * @param {number} flags
 * @param {() => V[]} get_collection
 * @param {(value: V, index: number) => any} get_key
 * @param {(anchor: Node, item: MaybeSource<V>, index: MaybeSource<number>) => void} render_fn
 * @param {null | ((anchor: Node) => void)} fallback_fn
 * @returns {void}
 */
function each(node, flags, get_collection, get_key, render_fn, fallback_fn = null) {
	var anchor = node;

	/** @type {Map<any, EachItem>} */
	var items = new Map();

	var is_controlled = (flags & _constants_js__WEBPACK_IMPORTED_MODULE_0__.EACH_IS_CONTROLLED) !== 0;

	if (is_controlled) {
		var parent_node = /** @type {Element} */ (node);

		anchor = _hydration_js__WEBPACK_IMPORTED_MODULE_1__.hydrating
			? (0,_hydration_js__WEBPACK_IMPORTED_MODULE_1__.set_hydrate_node)((0,_operations_js__WEBPACK_IMPORTED_MODULE_2__.get_first_child)(parent_node))
			: parent_node.appendChild((0,_operations_js__WEBPACK_IMPORTED_MODULE_2__.create_text)());
	}

	if (_hydration_js__WEBPACK_IMPORTED_MODULE_1__.hydrating) {
		(0,_hydration_js__WEBPACK_IMPORTED_MODULE_1__.hydrate_next)();
	}

	/** @type {Effect | null} */
	var fallback = null;

	// TODO: ideally we could use derived for runes mode but because of the ability
	// to use a store which can be mutated, we can't do that here as mutating a store
	// will still result in the collection array being the same from the store
	var each_array = (0,_reactivity_deriveds_js__WEBPACK_IMPORTED_MODULE_10__.derived_safe_equal)(() => {
		var collection = get_collection();

		return /** @type {V[]} */ (
			(0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_5__.is_array)(collection) ? collection : collection == null ? [] : (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_5__.array_from)(collection)
		);
	});

	if (esm_env__WEBPACK_IMPORTED_MODULE_9__.DEV) {
		(0,_dev_tracing_js__WEBPACK_IMPORTED_MODULE_13__.tag)(each_array, '{#each ...}');
	}

	/** @type {V[]} */
	var array;

	/** @type {Map<Batch, Set<any>>} */
	var pending = new Map();

	var first_run = true;

	/**
	 * @param {Batch} batch
	 */
	function commit(batch) {
		if ((state.effect.f & _client_constants__WEBPACK_IMPORTED_MODULE_6__.DESTROYED) !== 0) {
			return;
		}

		state.pending.delete(batch);

		state.fallback = fallback;
		reconcile(state, array, anchor, flags, get_key);

		if (fallback !== null) {
			if (array.length === 0) {
				if ((fallback.f & _client_constants__WEBPACK_IMPORTED_MODULE_6__.EFFECT_OFFSCREEN) === 0) {
					(0,_reactivity_effects_js__WEBPACK_IMPORTED_MODULE_3__.resume_effect)(fallback);
				} else {
					fallback.f ^= _client_constants__WEBPACK_IMPORTED_MODULE_6__.EFFECT_OFFSCREEN;
					move(fallback, null, anchor);
				}
			} else {
				(0,_reactivity_effects_js__WEBPACK_IMPORTED_MODULE_3__.pause_effect)(fallback, () => {
					// TODO only null out if no pending batch needs it,
					// otherwise re-add `fallback.fragment` and move the
					// effect into it
					fallback = null;
				});
			}
		}
	}

	/**
	 * @param {Batch} batch
	 */
	function discard(batch) {
		state.pending.delete(batch);
	}

	var effect = (0,_reactivity_effects_js__WEBPACK_IMPORTED_MODULE_3__.block)(() => {
		array = /** @type {V[]} */ ((0,_runtime_js__WEBPACK_IMPORTED_MODULE_8__.get)(each_array));
		var length = array.length;

		/** `true` if there was a hydration mismatch. Needs to be a `let` or else it isn't treeshaken out */
		let mismatch = false;

		if (_hydration_js__WEBPACK_IMPORTED_MODULE_1__.hydrating) {
			var is_else = (0,_hydration_js__WEBPACK_IMPORTED_MODULE_1__.read_hydration_instruction)(anchor) === _constants_js__WEBPACK_IMPORTED_MODULE_0__.HYDRATION_START_ELSE;

			if (is_else !== (length === 0)) {
				// hydration mismatch — remove the server-rendered DOM and start over
				anchor = (0,_hydration_js__WEBPACK_IMPORTED_MODULE_1__.skip_nodes)();

				(0,_hydration_js__WEBPACK_IMPORTED_MODULE_1__.set_hydrate_node)(anchor);
				(0,_hydration_js__WEBPACK_IMPORTED_MODULE_1__.set_hydrating)(false);
				mismatch = true;
			}
		}

		var keys = new Set();
		var batch = /** @type {Batch} */ (_reactivity_batch_js__WEBPACK_IMPORTED_MODULE_11__.current_batch);
		var defer = (0,_operations_js__WEBPACK_IMPORTED_MODULE_2__.should_defer_append)();

		for (var index = 0; index < length; index += 1) {
			if (
				_hydration_js__WEBPACK_IMPORTED_MODULE_1__.hydrating &&
				_hydration_js__WEBPACK_IMPORTED_MODULE_1__.hydrate_node.nodeType === _client_constants__WEBPACK_IMPORTED_MODULE_6__.COMMENT_NODE &&
				/** @type {Comment} */ (_hydration_js__WEBPACK_IMPORTED_MODULE_1__.hydrate_node).data === _constants_js__WEBPACK_IMPORTED_MODULE_0__.HYDRATION_END
			) {
				// The server rendered fewer items than expected,
				// so break out and continue appending non-hydrated items
				anchor = /** @type {Comment} */ (_hydration_js__WEBPACK_IMPORTED_MODULE_1__.hydrate_node);
				mismatch = true;
				(0,_hydration_js__WEBPACK_IMPORTED_MODULE_1__.set_hydrating)(false);
			}

			var value = array[index];
			var key = get_key(value, index);

			if (esm_env__WEBPACK_IMPORTED_MODULE_9__.DEV) {
				// Check that the key function is idempotent (returns the same value when called twice)
				var key_again = get_key(value, index);
				if (key !== key_again) {
					_errors_js__WEBPACK_IMPORTED_MODULE_12__.each_key_volatile(String(index), String(key), String(key_again));
				}
			}

			var item = first_run ? null : items.get(key);

			if (item) {
				// update before reconciliation, to trigger any async updates
				if (item.v) (0,_reactivity_sources_js__WEBPACK_IMPORTED_MODULE_4__.internal_set)(item.v, value);
				if (item.i) (0,_reactivity_sources_js__WEBPACK_IMPORTED_MODULE_4__.internal_set)(item.i, index);

				if (defer) {
					batch.unskip_effect(item.e);
				}
			} else {
				item = create_item(
					items,
					first_run ? anchor : (offscreen_anchor ??= (0,_operations_js__WEBPACK_IMPORTED_MODULE_2__.create_text)()),
					value,
					key,
					index,
					render_fn,
					flags,
					get_collection
				);

				if (!first_run) {
					item.e.f |= _client_constants__WEBPACK_IMPORTED_MODULE_6__.EFFECT_OFFSCREEN;
				}

				items.set(key, item);
			}

			keys.add(key);
		}

		if (length === 0 && fallback_fn && !fallback) {
			if (first_run) {
				fallback = (0,_reactivity_effects_js__WEBPACK_IMPORTED_MODULE_3__.branch)(() => fallback_fn(anchor));
			} else {
				fallback = (0,_reactivity_effects_js__WEBPACK_IMPORTED_MODULE_3__.branch)(() => fallback_fn((offscreen_anchor ??= (0,_operations_js__WEBPACK_IMPORTED_MODULE_2__.create_text)())));
				fallback.f |= _client_constants__WEBPACK_IMPORTED_MODULE_6__.EFFECT_OFFSCREEN;
			}
		}

		if (length > keys.size) {
			if (esm_env__WEBPACK_IMPORTED_MODULE_9__.DEV) {
				validate_each_keys(array, get_key);
			} else {
				// in prod, the additional information isn't printed, so don't bother computing it
				_errors_js__WEBPACK_IMPORTED_MODULE_12__.each_key_duplicate('', '', '');
			}
		}

		// remove excess nodes
		if (_hydration_js__WEBPACK_IMPORTED_MODULE_1__.hydrating && length > 0) {
			(0,_hydration_js__WEBPACK_IMPORTED_MODULE_1__.set_hydrate_node)((0,_hydration_js__WEBPACK_IMPORTED_MODULE_1__.skip_nodes)());
		}

		if (!first_run) {
			pending.set(batch, keys);

			if (defer) {
				for (const [key, item] of items) {
					if (!keys.has(key)) {
						batch.skip_effect(item.e);
					}
				}

				batch.oncommit(commit);
				batch.ondiscard(discard);
			} else {
				commit(batch);
			}
		}

		if (mismatch) {
			// continue in hydration mode
			(0,_hydration_js__WEBPACK_IMPORTED_MODULE_1__.set_hydrating)(true);
		}

		// When we mount the each block for the first time, the collection won't be
		// connected to this effect as the effect hasn't finished running yet and its deps
		// won't be assigned. However, it's possible that when reconciling the each block
		// that a mutation occurred and it's made the collection MAYBE_DIRTY, so reading the
		// collection again can provide consistency to the reactive graph again as the deriveds
		// will now be `CLEAN`.
		;(0,_runtime_js__WEBPACK_IMPORTED_MODULE_8__.get)(each_array);
	});

	/** @type {EachState} */
	var state = { effect, flags, items, pending, outrogroups: null, fallback };

	first_run = false;

	if (_hydration_js__WEBPACK_IMPORTED_MODULE_1__.hydrating) {
		anchor = _hydration_js__WEBPACK_IMPORTED_MODULE_1__.hydrate_node;
	}
}

/**
 * Skip past any non-branch effects (which could be created with `createSubscriber`, for example) to find the next branch effect
 * @param {Effect | null} effect
 * @returns {Effect | null}
 */
function skip_to_branch(effect) {
	while (effect !== null && (effect.f & _client_constants__WEBPACK_IMPORTED_MODULE_6__.BRANCH_EFFECT) === 0) {
		effect = effect.next;
	}
	return effect;
}

/**
 * Add, remove, or reorder items output by an each block as its input changes
 * @template V
 * @param {EachState} state
 * @param {Array<V>} array
 * @param {Element | Comment | Text} anchor
 * @param {number} flags
 * @param {(value: V, index: number) => any} get_key
 * @returns {void}
 */
function reconcile(state, array, anchor, flags, get_key) {
	var is_animated = (flags & _constants_js__WEBPACK_IMPORTED_MODULE_0__.EACH_IS_ANIMATED) !== 0;

	var length = array.length;
	var items = state.items;
	var current = skip_to_branch(state.effect.first);

	/** @type {undefined | Set<Effect>} */
	var seen;

	/** @type {Effect | null} */
	var prev = null;

	/** @type {undefined | Set<Effect>} */
	var to_animate;

	/** @type {Effect[]} */
	var matched = [];

	/** @type {Effect[]} */
	var stashed = [];

	/** @type {V} */
	var value;

	/** @type {any} */
	var key;

	/** @type {Effect | undefined} */
	var effect;

	/** @type {number} */
	var i;

	if (is_animated) {
		for (i = 0; i < length; i += 1) {
			value = array[i];
			key = get_key(value, i);
			effect = /** @type {EachItem} */ (items.get(key)).e;

			// offscreen == coming in now, no animation in that case,
			// else this would happen https://github.com/sveltejs/svelte/issues/17181
			if ((effect.f & _client_constants__WEBPACK_IMPORTED_MODULE_6__.EFFECT_OFFSCREEN) === 0) {
				effect.nodes?.a?.measure();
				(to_animate ??= new Set()).add(effect);
			}
		}
	}

	for (i = 0; i < length; i += 1) {
		value = array[i];
		key = get_key(value, i);

		effect = /** @type {EachItem} */ (items.get(key)).e;

		if (state.outrogroups !== null) {
			for (const group of state.outrogroups) {
				group.pending.delete(effect);
				group.done.delete(effect);
			}
		}

		if ((effect.f & _client_constants__WEBPACK_IMPORTED_MODULE_6__.INERT) !== 0) {
			(0,_reactivity_effects_js__WEBPACK_IMPORTED_MODULE_3__.resume_effect)(effect);
			if (is_animated) {
				effect.nodes?.a?.unfix();
				(to_animate ??= new Set()).delete(effect);
			}
		}

		if ((effect.f & _client_constants__WEBPACK_IMPORTED_MODULE_6__.EFFECT_OFFSCREEN) !== 0) {
			effect.f ^= _client_constants__WEBPACK_IMPORTED_MODULE_6__.EFFECT_OFFSCREEN;

			if (effect === current) {
				move(effect, null, anchor);
			} else {
				var next = prev ? prev.next : current;

				if (effect === state.effect.last) {
					state.effect.last = effect.prev;
				}

				if (effect.prev) effect.prev.next = effect.next;
				if (effect.next) effect.next.prev = effect.prev;
				link(state, prev, effect);
				link(state, effect, next);

				move(effect, next, anchor);
				prev = effect;

				matched = [];
				stashed = [];

				current = skip_to_branch(prev.next);
				continue;
			}
		}

		if (effect !== current) {
			if (seen !== undefined && seen.has(effect)) {
				if (matched.length < stashed.length) {
					// more efficient to move later items to the front
					var start = stashed[0];
					var j;

					prev = start.prev;

					var a = matched[0];
					var b = matched[matched.length - 1];

					for (j = 0; j < matched.length; j += 1) {
						move(matched[j], start, anchor);
					}

					for (j = 0; j < stashed.length; j += 1) {
						seen.delete(stashed[j]);
					}

					link(state, a.prev, b.next);
					link(state, prev, a);
					link(state, b, start);

					current = start;
					prev = b;
					i -= 1;

					matched = [];
					stashed = [];
				} else {
					// more efficient to move earlier items to the back
					seen.delete(effect);
					move(effect, current, anchor);

					link(state, effect.prev, effect.next);
					link(state, effect, prev === null ? state.effect.first : prev.next);
					link(state, prev, effect);

					prev = effect;
				}

				continue;
			}

			matched = [];
			stashed = [];

			while (current !== null && current !== effect) {
				(seen ??= new Set()).add(current);
				stashed.push(current);
				current = skip_to_branch(current.next);
			}

			if (current === null) {
				continue;
			}
		}

		if ((effect.f & _client_constants__WEBPACK_IMPORTED_MODULE_6__.EFFECT_OFFSCREEN) === 0) {
			matched.push(effect);
		}

		prev = effect;
		current = skip_to_branch(effect.next);
	}

	if (state.outrogroups !== null) {
		for (const group of state.outrogroups) {
			if (group.pending.size === 0) {
				destroy_effects(state, (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_5__.array_from)(group.done));
				state.outrogroups?.delete(group);
			}
		}

		if (state.outrogroups.size === 0) {
			state.outrogroups = null;
		}
	}

	if (current !== null || seen !== undefined) {
		/** @type {Effect[]} */
		var to_destroy = [];

		if (seen !== undefined) {
			for (effect of seen) {
				if ((effect.f & _client_constants__WEBPACK_IMPORTED_MODULE_6__.INERT) === 0) {
					to_destroy.push(effect);
				}
			}
		}

		while (current !== null) {
			// If the each block isn't inert, then inert effects are currently outroing and will be removed once the transition is finished
			if ((current.f & _client_constants__WEBPACK_IMPORTED_MODULE_6__.INERT) === 0 && current !== state.fallback) {
				to_destroy.push(current);
			}

			current = skip_to_branch(current.next);
		}

		var destroy_length = to_destroy.length;

		if (destroy_length > 0) {
			var controlled_anchor = (flags & _constants_js__WEBPACK_IMPORTED_MODULE_0__.EACH_IS_CONTROLLED) !== 0 && length === 0 ? anchor : null;

			if (is_animated) {
				for (i = 0; i < destroy_length; i += 1) {
					to_destroy[i].nodes?.a?.measure();
				}

				for (i = 0; i < destroy_length; i += 1) {
					to_destroy[i].nodes?.a?.fix();
				}
			}

			pause_effects(state, to_destroy, controlled_anchor);
		}
	}

	if (is_animated) {
		(0,_task_js__WEBPACK_IMPORTED_MODULE_7__.queue_micro_task)(() => {
			if (to_animate === undefined) return;
			for (effect of to_animate) {
				effect.nodes?.a?.apply();
			}
		});
	}
}

/**
 * @template V
 * @param {Map<any, EachItem>} items
 * @param {Node} anchor
 * @param {V} value
 * @param {unknown} key
 * @param {number} index
 * @param {(anchor: Node, item: V | Source<V>, index: number | Value<number>, collection: () => V[]) => void} render_fn
 * @param {number} flags
 * @param {() => V[]} get_collection
 * @returns {EachItem}
 */
function create_item(items, anchor, value, key, index, render_fn, flags, get_collection) {
	var v =
		(flags & _constants_js__WEBPACK_IMPORTED_MODULE_0__.EACH_ITEM_REACTIVE) !== 0
			? (flags & _constants_js__WEBPACK_IMPORTED_MODULE_0__.EACH_ITEM_IMMUTABLE) === 0
				? (0,_reactivity_sources_js__WEBPACK_IMPORTED_MODULE_4__.mutable_source)(value, false, false)
				: (0,_reactivity_sources_js__WEBPACK_IMPORTED_MODULE_4__.source)(value)
			: null;

	var i = (flags & _constants_js__WEBPACK_IMPORTED_MODULE_0__.EACH_INDEX_REACTIVE) !== 0 ? (0,_reactivity_sources_js__WEBPACK_IMPORTED_MODULE_4__.source)(index) : null;

	if (esm_env__WEBPACK_IMPORTED_MODULE_9__.DEV && v) {
		// For tracing purposes, we need to link the source signal we create with the
		// collection + index so that tracing works as intended
		v.trace = () => {
			// eslint-disable-next-line @typescript-eslint/no-unused-expressions
			get_collection()[i?.v ?? index];
		};
	}

	return {
		v,
		i,
		e: (0,_reactivity_effects_js__WEBPACK_IMPORTED_MODULE_3__.branch)(() => {
			render_fn(anchor, v ?? value, i ?? index, get_collection);

			return () => {
				items.delete(key);
			};
		})
	};
}

/**
 * @param {Effect} effect
 * @param {Effect | null} next
 * @param {Text | Element | Comment} anchor
 */
function move(effect, next, anchor) {
	if (!effect.nodes) return;

	var node = effect.nodes.start;
	var end = effect.nodes.end;

	var dest =
		next && (next.f & _client_constants__WEBPACK_IMPORTED_MODULE_6__.EFFECT_OFFSCREEN) === 0
			? /** @type {EffectNodes} */ (next.nodes).start
			: anchor;

	while (node !== null) {
		var next_node = /** @type {TemplateNode} */ ((0,_operations_js__WEBPACK_IMPORTED_MODULE_2__.get_next_sibling)(node));
		dest.before(node);

		if (node === end) {
			return;
		}

		node = next_node;
	}
}

/**
 * @param {EachState} state
 * @param {Effect | null} prev
 * @param {Effect | null} next
 */
function link(state, prev, next) {
	if (prev === null) {
		state.effect.first = next;
	} else {
		prev.next = next;
	}

	if (next === null) {
		state.effect.last = prev;
	} else {
		next.prev = prev;
	}
}

/**
 * @param {Array<any>} array
 * @param {(item: any, index: number) => string} key_fn
 * @returns {void}
 */
function validate_each_keys(array, key_fn) {
	const keys = new Map();
	const length = array.length;

	for (let i = 0; i < length; i++) {
		const key = key_fn(array[i], i);

		if (keys.has(key)) {
			const a = String(keys.get(key));
			const b = String(i);

			/** @type {string | null} */
			let k = String(key);
			if (k.startsWith('[object ')) k = null;

			_errors_js__WEBPACK_IMPORTED_MODULE_12__.each_key_duplicate(a, b, k);
		}

		keys.set(key, i);
	}
}


/***/ },

/***/ "./node_modules/svelte/src/internal/client/dom/blocks/html.js"
/*!********************************************************************!*\
  !*** ./node_modules/svelte/src/internal/client/dom/blocks/html.js ***!
  \********************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   html: () => (/* binding */ html)
/* harmony export */ });
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../constants.js */ "./node_modules/svelte/src/constants.js");
/* harmony import */ var _reactivity_effects_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../reactivity/effects.js */ "./node_modules/svelte/src/internal/client/reactivity/effects.js");
/* harmony import */ var _hydration_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../hydration.js */ "./node_modules/svelte/src/internal/client/dom/hydration.js");
/* harmony import */ var _template_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../template.js */ "./node_modules/svelte/src/internal/client/dom/template.js");
/* harmony import */ var _warnings_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../warnings.js */ "./node_modules/svelte/src/internal/client/warnings.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../utils.js */ "./node_modules/svelte/src/utils.js");
/* harmony import */ var esm_env__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! esm-env */ "./node_modules/esm-env/index.js");
/* harmony import */ var _context_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../context.js */ "./node_modules/svelte/src/internal/client/context.js");
/* harmony import */ var _operations_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../operations.js */ "./node_modules/svelte/src/internal/client/dom/operations.js");
/* harmony import */ var _runtime_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../runtime.js */ "./node_modules/svelte/src/internal/client/runtime.js");
/* harmony import */ var _client_constants__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! #client/constants */ "./node_modules/svelte/src/internal/client/constants.js");
/** @import { Effect, TemplateNode } from '#client' */
/** @import {} from 'trusted-types' */













/**
 * @param {Element} element
 * @param {string | null} server_hash
 * @param {string | TrustedHTML} value
 */
function check_hash(element, server_hash, value) {
	if (!server_hash || server_hash === (0,_utils_js__WEBPACK_IMPORTED_MODULE_5__.hash)(String(value ?? ''))) return;

	let location;

	// @ts-expect-error
	const loc = element.__svelte_meta?.loc;
	if (loc) {
		location = `near ${loc.file}:${loc.line}:${loc.column}`;
	} else if (_context_js__WEBPACK_IMPORTED_MODULE_7__.dev_current_component_function?.[_constants_js__WEBPACK_IMPORTED_MODULE_0__.FILENAME]) {
		location = `in ${_context_js__WEBPACK_IMPORTED_MODULE_7__.dev_current_component_function[_constants_js__WEBPACK_IMPORTED_MODULE_0__.FILENAME]}`;
	}

	_warnings_js__WEBPACK_IMPORTED_MODULE_4__.hydration_html_changed((0,_utils_js__WEBPACK_IMPORTED_MODULE_5__.sanitize_location)(location));
}

/**
 * @param {Element | Text | Comment} node
 * @param {() => string | TrustedHTML} get_value
 * @param {boolean} [is_controlled]
 * @param {boolean} [svg]
 * @param {boolean} [mathml]
 * @param {boolean} [skip_warning]
 * @returns {void}
 */
function html(
	node,
	get_value,
	is_controlled = false,
	svg = false,
	mathml = false,
	skip_warning = false
) {
	var anchor = node;

	/** @type {string | TrustedHTML} */
	var value = '';

	if (is_controlled) {
		var parent_node = /** @type {Element} */ (node);

		if (_hydration_js__WEBPACK_IMPORTED_MODULE_2__.hydrating) {
			anchor = (0,_hydration_js__WEBPACK_IMPORTED_MODULE_2__.set_hydrate_node)((0,_operations_js__WEBPACK_IMPORTED_MODULE_8__.get_first_child)(parent_node));
		}
	}

	;(0,_reactivity_effects_js__WEBPACK_IMPORTED_MODULE_1__.template_effect)(() => {
		var effect = /** @type {Effect} */ (_runtime_js__WEBPACK_IMPORTED_MODULE_9__.active_effect);

		if (value === (value = get_value() ?? '')) {
			if (_hydration_js__WEBPACK_IMPORTED_MODULE_2__.hydrating) (0,_hydration_js__WEBPACK_IMPORTED_MODULE_2__.hydrate_next)();
			return;
		}

		if (is_controlled && !_hydration_js__WEBPACK_IMPORTED_MODULE_2__.hydrating) {
			// When @html is the only child, use innerHTML directly.
			// This also handles contenteditable, where the user may delete the anchor comment.
			effect.nodes = null;
			parent_node.innerHTML = /** @type {string} */ (value);

			if (value !== '') {
				(0,_template_js__WEBPACK_IMPORTED_MODULE_3__.assign_nodes)(
					/** @type {TemplateNode} */ ((0,_operations_js__WEBPACK_IMPORTED_MODULE_8__.get_first_child)(parent_node)),
					/** @type {TemplateNode} */ (parent_node.lastChild)
				);
			}

			return;
		}

		if (effect.nodes !== null) {
			(0,_reactivity_effects_js__WEBPACK_IMPORTED_MODULE_1__.remove_effect_dom)(effect.nodes.start, /** @type {TemplateNode} */ (effect.nodes.end));
			effect.nodes = null;
		}

		if (value === '') return;

		if (_hydration_js__WEBPACK_IMPORTED_MODULE_2__.hydrating) {
			// We're deliberately not trying to repair mismatches between server and client,
			// as it's costly and error-prone (and it's an edge case to have a mismatch anyway)
			var hash = /** @type {Comment} */ (_hydration_js__WEBPACK_IMPORTED_MODULE_2__.hydrate_node).data;

			/** @type {TemplateNode | null} */
			var next = (0,_hydration_js__WEBPACK_IMPORTED_MODULE_2__.hydrate_next)();
			var last = next;

			while (
				next !== null &&
				(next.nodeType !== _client_constants__WEBPACK_IMPORTED_MODULE_10__.COMMENT_NODE || /** @type {Comment} */ (next).data !== '')
			) {
				last = next;
				next = (0,_operations_js__WEBPACK_IMPORTED_MODULE_8__.get_next_sibling)(next);
			}

			if (next === null) {
				_warnings_js__WEBPACK_IMPORTED_MODULE_4__.hydration_mismatch();
				throw _constants_js__WEBPACK_IMPORTED_MODULE_0__.HYDRATION_ERROR;
			}

			if (esm_env__WEBPACK_IMPORTED_MODULE_6__.DEV && !skip_warning) {
				check_hash(/** @type {Element} */ (next.parentNode), hash, value);
			}

			;(0,_template_js__WEBPACK_IMPORTED_MODULE_3__.assign_nodes)(_hydration_js__WEBPACK_IMPORTED_MODULE_2__.hydrate_node, last);
			anchor = (0,_hydration_js__WEBPACK_IMPORTED_MODULE_2__.set_hydrate_node)(next);
			return;
		}

		// Don't use create_fragment_with_script_from_html here because that would mean script tags are executed.
		// @html is basically `.innerHTML = ...` and that doesn't execute scripts either due to security reasons.
		// Use a <template>, <svg>, or <math> wrapper depending on context. If value is a TrustedHTML object,
		// it will be assigned directly to innerHTML without coercion — this allows {@html policy.createHTML(...)} to work.
		var ns = svg ? _constants_js__WEBPACK_IMPORTED_MODULE_0__.NAMESPACE_SVG : mathml ? _constants_js__WEBPACK_IMPORTED_MODULE_0__.NAMESPACE_MATHML : undefined;
		var wrapper = /** @type {HTMLTemplateElement | SVGElement | MathMLElement} */ (
			(0,_operations_js__WEBPACK_IMPORTED_MODULE_8__.create_element)(svg ? 'svg' : mathml ? 'math' : 'template', ns)
		);
		wrapper.innerHTML = /** @type {any} */ (value);

		/** @type {DocumentFragment | Element} */
		var node = svg || mathml ? wrapper : /** @type {HTMLTemplateElement} */ (wrapper).content;

		(0,_template_js__WEBPACK_IMPORTED_MODULE_3__.assign_nodes)(
			/** @type {TemplateNode} */ ((0,_operations_js__WEBPACK_IMPORTED_MODULE_8__.get_first_child)(node)),
			/** @type {TemplateNode} */ (node.lastChild)
		);

		if (svg || mathml) {
			while ((0,_operations_js__WEBPACK_IMPORTED_MODULE_8__.get_first_child)(node)) {
				anchor.before(/** @type {TemplateNode} */ ((0,_operations_js__WEBPACK_IMPORTED_MODULE_8__.get_first_child)(node)));
			}
		} else {
			anchor.before(node);
		}
	});
}


/***/ },

/***/ "./node_modules/svelte/src/internal/client/dom/blocks/if.js"
/*!******************************************************************!*\
  !*** ./node_modules/svelte/src/internal/client/dom/blocks/if.js ***!
  \******************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   if_block: () => (/* binding */ if_block)
/* harmony export */ });
/* harmony import */ var _client_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! #client/constants */ "./node_modules/svelte/src/internal/client/constants.js");
/* harmony import */ var _hydration_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../hydration.js */ "./node_modules/svelte/src/internal/client/dom/hydration.js");
/* harmony import */ var _reactivity_effects_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../reactivity/effects.js */ "./node_modules/svelte/src/internal/client/reactivity/effects.js");
/* harmony import */ var _branches_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./branches.js */ "./node_modules/svelte/src/internal/client/dom/blocks/branches.js");
/** @import { TemplateNode } from '#client' */





/**
 * @param {TemplateNode} node
 * @param {(branch: (fn: (anchor: Node) => void, key?: number | false) => void) => void} fn
 * @param {boolean} [elseif] True if this is an `{:else if ...}` block rather than an `{#if ...}`, as that affects which transitions are considered 'local'
 * @returns {void}
 */
function if_block(node, fn, elseif = false) {
	/** @type {TemplateNode | undefined} */
	var marker;
	if (_hydration_js__WEBPACK_IMPORTED_MODULE_1__.hydrating) {
		marker = _hydration_js__WEBPACK_IMPORTED_MODULE_1__.hydrate_node;
		(0,_hydration_js__WEBPACK_IMPORTED_MODULE_1__.hydrate_next)();
	}

	var branches = new _branches_js__WEBPACK_IMPORTED_MODULE_3__.BranchManager(node);
	var flags = elseif ? _client_constants__WEBPACK_IMPORTED_MODULE_0__.EFFECT_TRANSPARENT : 0;

	/**
	 * @param {number | false} key
	 * @param {null | ((anchor: Node) => void)} fn
	 */
	function update_branch(key, fn) {
		if (_hydration_js__WEBPACK_IMPORTED_MODULE_1__.hydrating) {
			var data = (0,_hydration_js__WEBPACK_IMPORTED_MODULE_1__.read_hydration_instruction)(/** @type {TemplateNode} */ (marker));

			// "[n" = branch n, "[-1" = else
			if (key !== parseInt(data.substring(1))) {
				// Hydration mismatch: remove everything inside the anchor and start fresh.
				// This could happen with `{#if browser}...{/if}`, for example
				var anchor = (0,_hydration_js__WEBPACK_IMPORTED_MODULE_1__.skip_nodes)();

				(0,_hydration_js__WEBPACK_IMPORTED_MODULE_1__.set_hydrate_node)(anchor);
				branches.anchor = anchor;

				(0,_hydration_js__WEBPACK_IMPORTED_MODULE_1__.set_hydrating)(false);
				branches.ensure(key, fn);
				(0,_hydration_js__WEBPACK_IMPORTED_MODULE_1__.set_hydrating)(true);

				return;
			}
		}

		branches.ensure(key, fn);
	}

	;(0,_reactivity_effects_js__WEBPACK_IMPORTED_MODULE_2__.block)(() => {
		var has_branch = false;

		fn((fn, key = 0) => {
			has_branch = true;
			update_branch(key, fn);
		});

		if (!has_branch) {
			update_branch(-1, null);
		}
	}, flags);
}


/***/ },

/***/ "./node_modules/svelte/src/internal/client/dom/blocks/key.js"
/*!*******************************************************************!*\
  !*** ./node_modules/svelte/src/internal/client/dom/blocks/key.js ***!
  \*******************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   key: () => (/* binding */ key)
/* harmony export */ });
/* harmony import */ var _context_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../context.js */ "./node_modules/svelte/src/internal/client/context.js");
/* harmony import */ var _reactivity_effects_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../reactivity/effects.js */ "./node_modules/svelte/src/internal/client/reactivity/effects.js");
/* harmony import */ var _hydration_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../hydration.js */ "./node_modules/svelte/src/internal/client/dom/hydration.js");
/* harmony import */ var _branches_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./branches.js */ "./node_modules/svelte/src/internal/client/dom/blocks/branches.js");
/** @import { TemplateNode } from '#client' */





const NAN = Symbol('NaN');

/**
 * @template V
 * @param {TemplateNode} node
 * @param {() => V} get_key
 * @param {(anchor: Node) => TemplateNode | void} render_fn
 * @returns {void}
 */
function key(node, get_key, render_fn) {
	if (_hydration_js__WEBPACK_IMPORTED_MODULE_2__.hydrating) {
		(0,_hydration_js__WEBPACK_IMPORTED_MODULE_2__.hydrate_next)();
	}

	var branches = new _branches_js__WEBPACK_IMPORTED_MODULE_3__.BranchManager(node);

	var legacy = !(0,_context_js__WEBPACK_IMPORTED_MODULE_0__.is_runes)();

	(0,_reactivity_effects_js__WEBPACK_IMPORTED_MODULE_1__.block)(() => {
		var key = get_key();

		// NaN !== NaN, hence we do this workaround to not trigger remounts unnecessarily
		if (key !== key) {
			key = /** @type {any} */ (NAN);
		}

		// key blocks in Svelte <5 had stupid semantics
		if (legacy && key !== null && typeof key === 'object') {
			key = /** @type {V} */ ({});
		}

		branches.ensure(key, render_fn);
	});
}


/***/ },

/***/ "./node_modules/svelte/src/internal/client/dom/blocks/slot.js"
/*!********************************************************************!*\
  !*** ./node_modules/svelte/src/internal/client/dom/blocks/slot.js ***!
  \********************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   sanitize_slots: () => (/* binding */ sanitize_slots),
/* harmony export */   slot: () => (/* binding */ slot)
/* harmony export */ });
/* harmony import */ var _hydration_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../hydration.js */ "./node_modules/svelte/src/internal/client/dom/hydration.js");
/* harmony import */ var _operations_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../operations.js */ "./node_modules/svelte/src/internal/client/dom/operations.js");
/* harmony import */ var _template_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../template.js */ "./node_modules/svelte/src/internal/client/dom/template.js");




/**
 * @param {Comment} anchor
 * @param {Record<string, any>} $$props
 * @param {string} name
 * @param {Record<string, unknown>} slot_props
 * @param {null | ((anchor: Comment) => void)} fallback_fn
 */
function slot(anchor, $$props, name, slot_props, fallback_fn) {
	if (_hydration_js__WEBPACK_IMPORTED_MODULE_0__.hydrating) {
		(0,_hydration_js__WEBPACK_IMPORTED_MODULE_0__.hydrate_next)();
	}

	// Custom element slots are native DOM slots.
	// Use the stored reference because the shadow root may be closed.
	if ($$props.$$host?.$$shadowRoot) {
		const element = (0,_operations_js__WEBPACK_IMPORTED_MODULE_1__.create_element)('slot');
		if (name !== 'default') element.name = name;

		(0,_template_js__WEBPACK_IMPORTED_MODULE_2__.append)(anchor, element);

		if (fallback_fn !== null) {
			const fallback_anchor = (0,_operations_js__WEBPACK_IMPORTED_MODULE_1__.create_text)();
			element.append(fallback_anchor);
			fallback_fn(fallback_anchor);
		}

		return;
	}

	var slot_fn = $$props.$$slots?.[name];
	// Interop: Can use snippets to fill slots
	var is_interop = false;
	if (slot_fn === true) {
		slot_fn = $$props[name === 'default' ? 'children' : name];
		is_interop = true;
	}

	if (slot_fn === undefined) {
		if (fallback_fn !== null) {
			fallback_fn(anchor);
		}
	} else {
		slot_fn(anchor, is_interop ? () => slot_props : slot_props);
	}
}

/**
 * @param {Record<string, any>} props
 * @returns {Record<string, boolean>}
 */
function sanitize_slots(props) {
	/** @type {Record<string, boolean>} */
	const sanitized = {};
	if (props.children) sanitized.default = true;
	for (const key in props.$$slots) {
		sanitized[key] = true;
	}
	return sanitized;
}


/***/ },

/***/ "./node_modules/svelte/src/internal/client/dom/blocks/snippet.js"
/*!***********************************************************************!*\
  !*** ./node_modules/svelte/src/internal/client/dom/blocks/snippet.js ***!
  \***********************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createRawSnippet: () => (/* binding */ createRawSnippet),
/* harmony export */   snippet: () => (/* binding */ snippet),
/* harmony export */   wrap_snippet: () => (/* binding */ wrap_snippet)
/* harmony export */ });
/* harmony import */ var _client_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! #client/constants */ "./node_modules/svelte/src/internal/client/constants.js");
/* harmony import */ var _reactivity_effects_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../reactivity/effects.js */ "./node_modules/svelte/src/internal/client/reactivity/effects.js");
/* harmony import */ var _context_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../context.js */ "./node_modules/svelte/src/internal/client/context.js");
/* harmony import */ var _hydration_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../hydration.js */ "./node_modules/svelte/src/internal/client/dom/hydration.js");
/* harmony import */ var _reconciler_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../reconciler.js */ "./node_modules/svelte/src/internal/client/dom/reconciler.js");
/* harmony import */ var _template_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../template.js */ "./node_modules/svelte/src/internal/client/dom/template.js");
/* harmony import */ var _warnings_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../warnings.js */ "./node_modules/svelte/src/internal/client/warnings.js");
/* harmony import */ var _errors_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../errors.js */ "./node_modules/svelte/src/internal/client/errors.js");
/* harmony import */ var esm_env__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! esm-env */ "./node_modules/esm-env/index.js");
/* harmony import */ var _operations_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../operations.js */ "./node_modules/svelte/src/internal/client/dom/operations.js");
/* harmony import */ var _shared_validate_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../shared/validate.js */ "./node_modules/svelte/src/internal/shared/validate.js");
/* harmony import */ var _branches_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./branches.js */ "./node_modules/svelte/src/internal/client/dom/blocks/branches.js");
/** @import { Snippet } from 'svelte' */
/** @import { TemplateNode } from '#client' */
/** @import { Getters } from '#shared' */













/**
 * @template {(node: TemplateNode, ...args: any[]) => void} SnippetFn
 * @param {TemplateNode} node
 * @param {() => SnippetFn | null | undefined} get_snippet
 * @param {(() => any)[]} args
 * @returns {void}
 */
function snippet(node, get_snippet, ...args) {
	var branches = new _branches_js__WEBPACK_IMPORTED_MODULE_11__.BranchManager(node);

	(0,_reactivity_effects_js__WEBPACK_IMPORTED_MODULE_1__.block)(() => {
		const snippet = get_snippet() ?? null;

		if (esm_env__WEBPACK_IMPORTED_MODULE_8__.DEV && snippet == null) {
			_errors_js__WEBPACK_IMPORTED_MODULE_7__.invalid_snippet();
		}

		branches.ensure(snippet, snippet && ((anchor) => snippet(anchor, ...args)));
	}, _client_constants__WEBPACK_IMPORTED_MODULE_0__.EFFECT_TRANSPARENT);
}

/**
 * In development, wrap the snippet function so that it passes validation, and so that the
 * correct component context is set for ownership checks
 * @param {any} component
 * @param {(node: TemplateNode, ...args: any[]) => void} fn
 */
function wrap_snippet(component, fn) {
	const snippet = (/** @type {TemplateNode} */ node, /** @type {any[]} */ ...args) => {
		var previous_component_function = _context_js__WEBPACK_IMPORTED_MODULE_2__.dev_current_component_function;
		(0,_context_js__WEBPACK_IMPORTED_MODULE_2__.set_dev_current_component_function)(component);

		try {
			return fn(node, ...args);
		} finally {
			;(0,_context_js__WEBPACK_IMPORTED_MODULE_2__.set_dev_current_component_function)(previous_component_function);
		}
	};

	(0,_shared_validate_js__WEBPACK_IMPORTED_MODULE_10__.prevent_snippet_stringification)(snippet);

	return snippet;
}

/**
 * Create a snippet programmatically
 * @template {unknown[]} Params
 * @param {(...params: Getters<Params>) => {
 *   render: () => string
 *   setup?: (element: Element) => void | (() => void)
 * }} fn
 * @returns {Snippet<Params>}
 */
function createRawSnippet(fn) {
	// @ts-expect-error the types are a lie
	return (/** @type {TemplateNode} */ anchor, /** @type {Getters<Params>} */ ...params) => {
		var snippet = fn(...params);

		/** @type {Element} */
		var element;

		if (_hydration_js__WEBPACK_IMPORTED_MODULE_3__.hydrating) {
			element = /** @type {Element} */ (_hydration_js__WEBPACK_IMPORTED_MODULE_3__.hydrate_node);
			(0,_hydration_js__WEBPACK_IMPORTED_MODULE_3__.hydrate_next)();
		} else {
			var html = snippet.render().trim();
			var fragment = (0,_reconciler_js__WEBPACK_IMPORTED_MODULE_4__.create_fragment_from_html)(html);
			element = /** @type {Element} */ ((0,_operations_js__WEBPACK_IMPORTED_MODULE_9__.get_first_child)(fragment));

			if (esm_env__WEBPACK_IMPORTED_MODULE_8__.DEV && ((0,_operations_js__WEBPACK_IMPORTED_MODULE_9__.get_next_sibling)(element) !== null || element.nodeType !== _client_constants__WEBPACK_IMPORTED_MODULE_0__.ELEMENT_NODE)) {
				_warnings_js__WEBPACK_IMPORTED_MODULE_6__.invalid_raw_snippet_render();
			}

			anchor.before(element);
		}

		const result = snippet.setup?.(element);
		(0,_template_js__WEBPACK_IMPORTED_MODULE_5__.assign_nodes)(element, element);

		if (typeof result === 'function') {
			(0,_reactivity_effects_js__WEBPACK_IMPORTED_MODULE_1__.teardown)(result);
		}
	};
}


/***/ },

/***/ "./node_modules/svelte/src/internal/client/dom/blocks/svelte-component.js"
/*!********************************************************************************!*\
  !*** ./node_modules/svelte/src/internal/client/dom/blocks/svelte-component.js ***!
  \********************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   component: () => (/* binding */ component)
/* harmony export */ });
/* harmony import */ var _client_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! #client/constants */ "./node_modules/svelte/src/internal/client/constants.js");
/* harmony import */ var _reactivity_effects_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../reactivity/effects.js */ "./node_modules/svelte/src/internal/client/reactivity/effects.js");
/* harmony import */ var _hydration_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../hydration.js */ "./node_modules/svelte/src/internal/client/dom/hydration.js");
/* harmony import */ var _branches_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./branches.js */ "./node_modules/svelte/src/internal/client/dom/blocks/branches.js");
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../constants.js */ "./node_modules/svelte/src/constants.js");
/** @import { TemplateNode, Dom } from '#client' */






/**
 * @template P
 * @template {(props: P) => void} C
 * @param {TemplateNode} node
 * @param {() => C} get_component
 * @param {(anchor: TemplateNode, component: C) => Dom | void} render_fn
 * @returns {void}
 */
function component(node, get_component, render_fn) {
	/** @type {TemplateNode | undefined} */
	var hydration_start_node;

	if (_hydration_js__WEBPACK_IMPORTED_MODULE_2__.hydrating) {
		hydration_start_node = _hydration_js__WEBPACK_IMPORTED_MODULE_2__.hydrate_node;
		(0,_hydration_js__WEBPACK_IMPORTED_MODULE_2__.hydrate_next)();
	}

	var branches = new _branches_js__WEBPACK_IMPORTED_MODULE_3__.BranchManager(node);

	(0,_reactivity_effects_js__WEBPACK_IMPORTED_MODULE_1__.block)(() => {
		var component = get_component() ?? null;

		if (_hydration_js__WEBPACK_IMPORTED_MODULE_2__.hydrating) {
			var data = (0,_hydration_js__WEBPACK_IMPORTED_MODULE_2__.read_hydration_instruction)(/** @type {TemplateNode} */ (hydration_start_node));

			var server_had_component = data === _constants_js__WEBPACK_IMPORTED_MODULE_4__.HYDRATION_START;
			var client_has_component = component !== null;

			if (server_had_component !== client_has_component) {
				// Hydration mismatch: skip the server-rendered nodes and render fresh
				var anchor = (0,_hydration_js__WEBPACK_IMPORTED_MODULE_2__.skip_nodes)();

				(0,_hydration_js__WEBPACK_IMPORTED_MODULE_2__.set_hydrate_node)(anchor);
				branches.anchor = anchor;

				(0,_hydration_js__WEBPACK_IMPORTED_MODULE_2__.set_hydrating)(false);
				branches.ensure(component, component && ((target) => render_fn(target, component)));
				(0,_hydration_js__WEBPACK_IMPORTED_MODULE_2__.set_hydrating)(true);

				return;
			}
		}

		branches.ensure(component, component && ((target) => render_fn(target, component)));
	}, _client_constants__WEBPACK_IMPORTED_MODULE_0__.EFFECT_TRANSPARENT);
}


/***/ },

/***/ "./node_modules/svelte/src/internal/client/dom/blocks/svelte-element.js"
/*!******************************************************************************!*\
  !*** ./node_modules/svelte/src/internal/client/dom/blocks/svelte-element.js ***!
  \******************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   element: () => (/* binding */ element)
/* harmony export */ });
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../constants.js */ "./node_modules/svelte/src/constants.js");
/* harmony import */ var _hydration_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../hydration.js */ "./node_modules/svelte/src/internal/client/dom/hydration.js");
/* harmony import */ var _operations_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../operations.js */ "./node_modules/svelte/src/internal/client/dom/operations.js");
/* harmony import */ var _reactivity_effects_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../reactivity/effects.js */ "./node_modules/svelte/src/internal/client/reactivity/effects.js");
/* harmony import */ var _render_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../render.js */ "./node_modules/svelte/src/internal/client/render.js");
/* harmony import */ var _runtime_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../runtime.js */ "./node_modules/svelte/src/internal/client/runtime.js");
/* harmony import */ var _context_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../context.js */ "./node_modules/svelte/src/internal/client/context.js");
/* harmony import */ var esm_env__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! esm-env */ "./node_modules/esm-env/index.js");
/* harmony import */ var _client_constants__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! #client/constants */ "./node_modules/svelte/src/internal/client/constants.js");
/* harmony import */ var _template_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../template.js */ "./node_modules/svelte/src/internal/client/dom/template.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../utils.js */ "./node_modules/svelte/src/utils.js");
/* harmony import */ var _branches_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./branches.js */ "./node_modules/svelte/src/internal/client/dom/blocks/branches.js");
/* harmony import */ var _elements_transitions_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../elements/transitions.js */ "./node_modules/svelte/src/internal/client/dom/elements/transitions.js");
/** @import { Effect, EffectNodes, TemplateNode } from '#client' */














/**
 * @param {Comment | Element} node
 * @param {() => string} get_tag
 * @param {boolean} is_svg
 * @param {undefined | ((element: Element, anchor: Node | null) => void)} render_fn,
 * @param {undefined | (() => string)} get_namespace
 * @param {undefined | [number, number]} location
 * @returns {void}
 */
function element(node, get_tag, is_svg, render_fn, get_namespace, location) {
	let was_hydrating = _hydration_js__WEBPACK_IMPORTED_MODULE_1__.hydrating;

	if (_hydration_js__WEBPACK_IMPORTED_MODULE_1__.hydrating) {
		(0,_hydration_js__WEBPACK_IMPORTED_MODULE_1__.hydrate_next)();
	}

	var filename = esm_env__WEBPACK_IMPORTED_MODULE_7__.DEV && location && _context_js__WEBPACK_IMPORTED_MODULE_6__.component_context?.function[_constants_js__WEBPACK_IMPORTED_MODULE_0__.FILENAME];

	/** @type {null | Element} */
	var element = null;

	if (_hydration_js__WEBPACK_IMPORTED_MODULE_1__.hydrating && _hydration_js__WEBPACK_IMPORTED_MODULE_1__.hydrate_node.nodeType === _client_constants__WEBPACK_IMPORTED_MODULE_8__.ELEMENT_NODE) {
		element = /** @type {Element} */ (_hydration_js__WEBPACK_IMPORTED_MODULE_1__.hydrate_node);
		(0,_hydration_js__WEBPACK_IMPORTED_MODULE_1__.hydrate_next)();
	}

	var anchor = /** @type {TemplateNode} */ (_hydration_js__WEBPACK_IMPORTED_MODULE_1__.hydrating ? _hydration_js__WEBPACK_IMPORTED_MODULE_1__.hydrate_node : node);

	/**
	 * We track this so we can set it when changing the element, allowing any
	 * `animate:` directive to bind itself to the correct block
	 */
	var parent_effect = /** @type {Effect} */ (_runtime_js__WEBPACK_IMPORTED_MODULE_5__.active_effect);

	var branches = new _branches_js__WEBPACK_IMPORTED_MODULE_11__.BranchManager(anchor, false);

	(0,_reactivity_effects_js__WEBPACK_IMPORTED_MODULE_3__.block)(() => {
		const next_tag = get_tag() || null;
		var ns = get_namespace
			? get_namespace()
			: is_svg || next_tag === 'svg'
				? _constants_js__WEBPACK_IMPORTED_MODULE_0__.NAMESPACE_SVG
				: undefined;

		if (next_tag === null) {
			branches.ensure(null, null);
			(0,_render_js__WEBPACK_IMPORTED_MODULE_4__.set_should_intro)(true);
			return;
		}

		branches.ensure(next_tag, (anchor) => {
			if (next_tag) {
				element = _hydration_js__WEBPACK_IMPORTED_MODULE_1__.hydrating ? /** @type {Element} */ (element) : (0,_operations_js__WEBPACK_IMPORTED_MODULE_2__.create_element)(next_tag, ns);

				if (esm_env__WEBPACK_IMPORTED_MODULE_7__.DEV && location) {
					// @ts-expect-error
					element.__svelte_meta = {
						parent: _context_js__WEBPACK_IMPORTED_MODULE_6__.dev_stack,
						loc: {
							file: filename,
							line: location[0],
							column: location[1]
						}
					};
				}

				;(0,_template_js__WEBPACK_IMPORTED_MODULE_9__.assign_nodes)(element, element);

				if (render_fn) {
					var tmp_comment = null;

					if (_hydration_js__WEBPACK_IMPORTED_MODULE_1__.hydrating && (0,_utils_js__WEBPACK_IMPORTED_MODULE_10__.is_raw_text_element)(next_tag)) {
						// prevent hydration glitches (code just below expects an anchor)
						element.append((tmp_comment = document.createComment('')));
					}

					// If hydrating, use the existing ssr comment as the anchor so that the
					// inner open and close methods can pick up the existing nodes correctly
					var child_anchor = _hydration_js__WEBPACK_IMPORTED_MODULE_1__.hydrating
						? (0,_operations_js__WEBPACK_IMPORTED_MODULE_2__.get_first_child)(element)
						: element.appendChild((0,_operations_js__WEBPACK_IMPORTED_MODULE_2__.create_text)());

					if (_hydration_js__WEBPACK_IMPORTED_MODULE_1__.hydrating) {
						if (child_anchor === null) {
							(0,_hydration_js__WEBPACK_IMPORTED_MODULE_1__.set_hydrating)(false);
						} else {
							(0,_hydration_js__WEBPACK_IMPORTED_MODULE_1__.set_hydrate_node)(child_anchor);
						}
					}

					;(0,_elements_transitions_js__WEBPACK_IMPORTED_MODULE_12__.set_animation_effect_override)(parent_effect);

					// `child_anchor` is undefined if this is a void element, but we still
					// need to call `render_fn` in order to run actions etc. If the element
					// contains children, it's a user error (which is warned on elsewhere)
					// and the DOM will be silently discarded
					render_fn(element, child_anchor);
					tmp_comment?.remove();
					(0,_elements_transitions_js__WEBPACK_IMPORTED_MODULE_12__.set_animation_effect_override)(null);
				}

				// we do this after calling `render_fn` so that child effects don't override `nodes.end`
				/** @type {Effect & { nodes: EffectNodes }} */ (_runtime_js__WEBPACK_IMPORTED_MODULE_5__.active_effect).nodes.end = element;

				anchor.before(element);
			}

			if (_hydration_js__WEBPACK_IMPORTED_MODULE_1__.hydrating) {
				(0,_hydration_js__WEBPACK_IMPORTED_MODULE_1__.set_hydrate_node)(anchor);
			}
		});

		// revert to the default state after the effect has been created
		(0,_render_js__WEBPACK_IMPORTED_MODULE_4__.set_should_intro)(true);

		return () => {
			if (next_tag) {
				// if we're in this callback because we're re-running the effect,
				// disable intros (unless no element is currently displayed)
				(0,_render_js__WEBPACK_IMPORTED_MODULE_4__.set_should_intro)(false);
			}
		};
	}, _client_constants__WEBPACK_IMPORTED_MODULE_8__.EFFECT_TRANSPARENT);

	(0,_reactivity_effects_js__WEBPACK_IMPORTED_MODULE_3__.teardown)(() => {
		(0,_render_js__WEBPACK_IMPORTED_MODULE_4__.set_should_intro)(true);
	});

	if (was_hydrating) {
		(0,_hydration_js__WEBPACK_IMPORTED_MODULE_1__.set_hydrating)(true);
		(0,_hydration_js__WEBPACK_IMPORTED_MODULE_1__.set_hydrate_node)(anchor);
	}
}


/***/ },

/***/ "./node_modules/svelte/src/internal/client/dom/blocks/svelte-head.js"
/*!***************************************************************************!*\
  !*** ./node_modules/svelte/src/internal/client/dom/blocks/svelte-head.js ***!
  \***************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   head: () => (/* binding */ head)
/* harmony export */ });
/* harmony import */ var _hydration_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../hydration.js */ "./node_modules/svelte/src/internal/client/dom/hydration.js");
/* harmony import */ var _operations_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../operations.js */ "./node_modules/svelte/src/internal/client/dom/operations.js");
/* harmony import */ var _reactivity_effects_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../reactivity/effects.js */ "./node_modules/svelte/src/internal/client/reactivity/effects.js");
/* harmony import */ var _client_constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! #client/constants */ "./node_modules/svelte/src/internal/client/constants.js");
/** @import { TemplateNode } from '#client' */





/**
 * @param {string} hash
 * @param {(anchor: Node) => void} render_fn
 * @returns {void}
 */
function head(hash, render_fn) {
	// The head function may be called after the first hydration pass and ssr comment nodes may still be present,
	// therefore we need to skip that when we detect that we're not in hydration mode.
	let previous_hydrate_node = null;
	let was_hydrating = _hydration_js__WEBPACK_IMPORTED_MODULE_0__.hydrating;

	/** @type {Comment | Text} */
	var anchor;

	if (_hydration_js__WEBPACK_IMPORTED_MODULE_0__.hydrating) {
		previous_hydrate_node = _hydration_js__WEBPACK_IMPORTED_MODULE_0__.hydrate_node;

		var head_anchor = (0,_operations_js__WEBPACK_IMPORTED_MODULE_1__.get_first_child)(document.head);

		// There might be multiple head blocks in our app, and they could have been
		// rendered in an arbitrary order — find one corresponding to this component
		while (
			head_anchor !== null &&
			(head_anchor.nodeType !== _client_constants__WEBPACK_IMPORTED_MODULE_3__.COMMENT_NODE || /** @type {Comment} */ (head_anchor).data !== hash)
		) {
			head_anchor = (0,_operations_js__WEBPACK_IMPORTED_MODULE_1__.get_next_sibling)(head_anchor);
		}

		// If we can't find an opening hydration marker, skip hydration (this can happen
		// if a framework rendered body but not head content)
		if (head_anchor === null) {
			(0,_hydration_js__WEBPACK_IMPORTED_MODULE_0__.set_hydrating)(false);
		} else {
			var start = /** @type {TemplateNode} */ ((0,_operations_js__WEBPACK_IMPORTED_MODULE_1__.get_next_sibling)(head_anchor));
			head_anchor.remove(); // in case this component is repeated

			(0,_hydration_js__WEBPACK_IMPORTED_MODULE_0__.set_hydrate_node)(start);
		}
	}

	if (!_hydration_js__WEBPACK_IMPORTED_MODULE_0__.hydrating) {
		anchor = document.head.appendChild((0,_operations_js__WEBPACK_IMPORTED_MODULE_1__.create_text)());
	}

	try {
		;(0,_reactivity_effects_js__WEBPACK_IMPORTED_MODULE_2__.block)(() => {
			var e = (0,_reactivity_effects_js__WEBPACK_IMPORTED_MODULE_2__.branch)(() => render_fn(anchor));
			e.f |= _client_constants__WEBPACK_IMPORTED_MODULE_3__.HEAD_EFFECT;

			if (!_hydration_js__WEBPACK_IMPORTED_MODULE_0__.hydrating) {
				if (e.nodes === null) {
					e.nodes = { start: anchor, end: anchor, a: null, t: null };
				} else {
					e.nodes.end = anchor;
				}
			}
		});
	} finally {
		if (was_hydrating) {
			(0,_hydration_js__WEBPACK_IMPORTED_MODULE_0__.set_hydrating)(true);
			(0,_hydration_js__WEBPACK_IMPORTED_MODULE_0__.set_hydrate_node)(/** @type {TemplateNode} */ (previous_hydrate_node));
		}
	}
}


/***/ },

/***/ "./node_modules/svelte/src/internal/client/dom/css.js"
/*!************************************************************!*\
  !*** ./node_modules/svelte/src/internal/client/dom/css.js ***!
  \************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   append_styles: () => (/* binding */ append_styles)
/* harmony export */ });
/* harmony import */ var esm_env__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! esm-env */ "./node_modules/esm-env/index.js");
/* harmony import */ var _dev_css_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../dev/css.js */ "./node_modules/svelte/src/internal/client/dev/css.js");
/* harmony import */ var _reactivity_effects_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../reactivity/effects.js */ "./node_modules/svelte/src/internal/client/reactivity/effects.js");
/* harmony import */ var _operations_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./operations.js */ "./node_modules/svelte/src/internal/client/dom/operations.js");
/* harmony import */ var _runtime_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../runtime.js */ "./node_modules/svelte/src/internal/client/runtime.js");






/**
 * @param {Node} anchor
 * @param {{ hash: string, code: string }} css
 */
function append_styles(anchor, css) {
	// Use an effect to ensure `anchor` is in the DOM, otherwise getRootNode() will yield wrong results
	(0,_reactivity_effects_js__WEBPACK_IMPORTED_MODULE_2__.effect)(() => {
		// Bit of a hack: branches.js/each.js use offscreen fragments with temporary text nodes that will
		// never be connected to the real dom. Therfore walk up to the branch that has created the component
		// whose styles we want to append, and check its node instead. It will be connected by the time we get here.
		anchor = _runtime_js__WEBPACK_IMPORTED_MODULE_4__.active_effect?.parent?.nodes?.start ?? anchor;
		var root = anchor.getRootNode();

		var target = /** @type {ShadowRoot} */ (root).host
			? /** @type {ShadowRoot} */ (root)
			: /** @type {Document} */ (root).head ?? /** @type {Document} */ (root.ownerDocument).head;

		// Always querying the DOM is roughly the same perf as additionally checking for presence in a map first assuming
		// that you'll get cache hits half of the time, so we just always query the dom for simplicity and code savings.
		if (!target.querySelector('#' + css.hash)) {
			const style = (0,_operations_js__WEBPACK_IMPORTED_MODULE_3__.create_element)('style');
			style.id = css.hash;
			style.textContent = css.code;

			target.appendChild(style);

			if (esm_env__WEBPACK_IMPORTED_MODULE_0__.DEV) {
				(0,_dev_css_js__WEBPACK_IMPORTED_MODULE_1__.register_style)(css.hash, style);
			}
		}
	});
}


/***/ },

/***/ "./node_modules/svelte/src/internal/client/dom/elements/actions.js"
/*!*************************************************************************!*\
  !*** ./node_modules/svelte/src/internal/client/dom/elements/actions.js ***!
  \*************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   action: () => (/* binding */ action)
/* harmony export */ });
/* harmony import */ var _reactivity_effects_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../reactivity/effects.js */ "./node_modules/svelte/src/internal/client/reactivity/effects.js");
/* harmony import */ var _reactivity_equality_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../reactivity/equality.js */ "./node_modules/svelte/src/internal/client/reactivity/equality.js");
/* harmony import */ var _runtime_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../runtime.js */ "./node_modules/svelte/src/internal/client/runtime.js");
/** @import { ActionPayload } from '#client' */




/**
 * @template P
 * @param {Element} dom
 * @param {(dom: Element, value?: P) => ActionPayload<P>} action
 * @param {() => P} [get_value]
 * @returns {void}
 */
function action(dom, action, get_value) {
	(0,_reactivity_effects_js__WEBPACK_IMPORTED_MODULE_0__.effect)(() => {
		var payload = (0,_runtime_js__WEBPACK_IMPORTED_MODULE_2__.untrack)(() => action(dom, get_value?.()) || {});

		if (get_value && payload?.update) {
			var inited = false;
			/** @type {P} */
			var prev = /** @type {any} */ ({}); // initialize with something so it's never equal on first run

			(0,_reactivity_effects_js__WEBPACK_IMPORTED_MODULE_0__.render_effect)(() => {
				var value = get_value();

				// Action's update method is coarse-grained, i.e. when anything in the passed value changes, update.
				// This works in legacy mode because of mutable_source being updated as a whole, but when using $state
				// together with actions and mutation, it wouldn't notice the change without a deep read.
				(0,_runtime_js__WEBPACK_IMPORTED_MODULE_2__.deep_read_state)(value);

				if (inited && (0,_reactivity_equality_js__WEBPACK_IMPORTED_MODULE_1__.safe_not_equal)(prev, value)) {
					prev = value;
					/** @type {Function} */ (payload.update)(value);
				}
			});

			inited = true;
		}

		if (payload?.destroy) {
			return () => /** @type {Function} */ (payload.destroy)();
		}
	});
}


/***/ },

/***/ "./node_modules/svelte/src/internal/client/dom/elements/attachments.js"
/*!*****************************************************************************!*\
  !*** ./node_modules/svelte/src/internal/client/dom/elements/attachments.js ***!
  \*****************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   attach: () => (/* binding */ attach)
/* harmony export */ });
/* harmony import */ var _reactivity_effects_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../reactivity/effects.js */ "./node_modules/svelte/src/internal/client/reactivity/effects.js");
/** @import { Effect } from '#client' */


// TODO in 6.0 or 7.0, when we remove legacy mode, we can simplify this by
// getting rid of the block/branch stuff and just letting the effect rip.
// see https://github.com/sveltejs/svelte/pull/15962

/**
 * @param {Element} node
 * @param {() => (node: Element) => void} get_fn
 */
function attach(node, get_fn) {
	/** @type {false | undefined | ((node: Element) => void)} */
	var fn = undefined;

	/** @type {Effect | null} */
	var e;

	(0,_reactivity_effects_js__WEBPACK_IMPORTED_MODULE_0__.managed)(() => {
		if (fn !== (fn = get_fn())) {
			if (e) {
				(0,_reactivity_effects_js__WEBPACK_IMPORTED_MODULE_0__.destroy_effect)(e);
				e = null;
			}

			if (fn) {
				e = (0,_reactivity_effects_js__WEBPACK_IMPORTED_MODULE_0__.branch)(() => {
					(0,_reactivity_effects_js__WEBPACK_IMPORTED_MODULE_0__.effect)(() => /** @type {(node: Element) => void} */ (fn)(node));
				});
			}
		}
	});
}


/***/ },

/***/ "./node_modules/svelte/src/internal/client/dom/elements/attributes.js"
/*!****************************************************************************!*\
  !*** ./node_modules/svelte/src/internal/client/dom/elements/attributes.js ***!
  \****************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CLASS: () => (/* binding */ CLASS),
/* harmony export */   STYLE: () => (/* binding */ STYLE),
/* harmony export */   attribute_effect: () => (/* binding */ attribute_effect),
/* harmony export */   remove_input_defaults: () => (/* binding */ remove_input_defaults),
/* harmony export */   set_attribute: () => (/* binding */ set_attribute),
/* harmony export */   set_checked: () => (/* binding */ set_checked),
/* harmony export */   set_custom_element_data: () => (/* binding */ set_custom_element_data),
/* harmony export */   set_default_checked: () => (/* binding */ set_default_checked),
/* harmony export */   set_default_value: () => (/* binding */ set_default_value),
/* harmony export */   set_value: () => (/* binding */ set_value),
/* harmony export */   set_xlink_attribute: () => (/* binding */ set_xlink_attribute)
/* harmony export */ });
/* harmony import */ var esm_env__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! esm-env */ "./node_modules/esm-env/index.js");
/* harmony import */ var _hydration_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../hydration.js */ "./node_modules/svelte/src/internal/client/dom/hydration.js");
/* harmony import */ var _shared_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../shared/utils.js */ "./node_modules/svelte/src/internal/shared/utils.js");
/* harmony import */ var _events_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./events.js */ "./node_modules/svelte/src/internal/client/dom/elements/events.js");
/* harmony import */ var _misc_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./misc.js */ "./node_modules/svelte/src/internal/client/dom/elements/misc.js");
/* harmony import */ var _warnings_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../warnings.js */ "./node_modules/svelte/src/internal/client/warnings.js");
/* harmony import */ var _client_constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! #client/constants */ "./node_modules/svelte/src/internal/client/constants.js");
/* harmony import */ var _task_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../task.js */ "./node_modules/svelte/src/internal/client/dom/task.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../utils.js */ "./node_modules/svelte/src/utils.js");
/* harmony import */ var _runtime_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../runtime.js */ "./node_modules/svelte/src/internal/client/runtime.js");
/* harmony import */ var _attachments_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./attachments.js */ "./node_modules/svelte/src/internal/client/dom/elements/attachments.js");
/* harmony import */ var _shared_attributes_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../shared/attributes.js */ "./node_modules/svelte/src/internal/shared/attributes.js");
/* harmony import */ var _class_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./class.js */ "./node_modules/svelte/src/internal/client/dom/elements/class.js");
/* harmony import */ var _style_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./style.js */ "./node_modules/svelte/src/internal/client/dom/elements/style.js");
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../../constants.js */ "./node_modules/svelte/src/constants.js");
/* harmony import */ var _reactivity_effects_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../reactivity/effects.js */ "./node_modules/svelte/src/internal/client/reactivity/effects.js");
/* harmony import */ var _bindings_select_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./bindings/select.js */ "./node_modules/svelte/src/internal/client/dom/elements/bindings/select.js");
/* harmony import */ var _reactivity_async_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../reactivity/async.js */ "./node_modules/svelte/src/internal/client/reactivity/async.js");
/** @import { Blocker, Effect } from '#client' */



















const CLASS = Symbol('class');
const STYLE = Symbol('style');

const IS_CUSTOM_ELEMENT = Symbol('is custom element');
const IS_HTML = Symbol('is html');

const LINK_TAG = _client_constants__WEBPACK_IMPORTED_MODULE_6__.IS_XHTML ? 'link' : 'LINK';
const INPUT_TAG = _client_constants__WEBPACK_IMPORTED_MODULE_6__.IS_XHTML ? 'input' : 'INPUT';
const OPTION_TAG = _client_constants__WEBPACK_IMPORTED_MODULE_6__.IS_XHTML ? 'option' : 'OPTION';
const SELECT_TAG = _client_constants__WEBPACK_IMPORTED_MODULE_6__.IS_XHTML ? 'select' : 'SELECT';
const PROGRESS_TAG = _client_constants__WEBPACK_IMPORTED_MODULE_6__.IS_XHTML ? 'progress' : 'PROGRESS';

/**
 * The value/checked attribute in the template actually corresponds to the defaultValue property, so we need
 * to remove it upon hydration to avoid a bug when someone resets the form value.
 * @param {HTMLInputElement} input
 * @returns {void}
 */
function remove_input_defaults(input) {
	if (!_hydration_js__WEBPACK_IMPORTED_MODULE_1__.hydrating) return;

	var already_removed = false;

	// We try and remove the default attributes later, rather than sync during hydration.
	// Doing it sync during hydration has a negative impact on performance, but deferring the
	// work in an idle task alleviates this greatly. If a form reset event comes in before
	// the idle callback, then we ensure the input defaults are cleared just before.
	var remove_defaults = () => {
		if (already_removed) return;
		already_removed = true;

		// Remove the attributes but preserve the values
		if (input.hasAttribute('value')) {
			var value = input.value;
			set_attribute(input, 'value', null);
			input.value = value;
		}

		if (input.hasAttribute('checked')) {
			var checked = input.checked;
			set_attribute(input, 'checked', null);
			input.checked = checked;
		}
	};

	/** @type {any} */ (input)[_client_constants__WEBPACK_IMPORTED_MODULE_6__.FORM_RESET_HANDLER] = remove_defaults;
	(0,_task_js__WEBPACK_IMPORTED_MODULE_7__.queue_micro_task)(remove_defaults);
	(0,_misc_js__WEBPACK_IMPORTED_MODULE_4__.add_form_reset_listener)();
}

/**
 * @param {Element} element
 * @param {any} value
 */
function set_value(element, value) {
	var attributes = get_attributes(element);

	if (
		attributes.value ===
			(attributes.value =
				// treat null and undefined the same for the initial value
				value ?? undefined) ||
		// @ts-expect-error
		// `progress` elements always need their value set when it's `0`
		(element.value === value && (value !== 0 || element.nodeName !== PROGRESS_TAG))
	) {
		return;
	}

	// @ts-expect-error
	element.value = value ?? '';
}

/**
 * @param {Element} element
 * @param {boolean} checked
 */
function set_checked(element, checked) {
	var attributes = get_attributes(element);

	if (
		attributes.checked ===
		(attributes.checked =
			// treat null and undefined the same for the initial value
			checked ?? undefined)
	) {
		return;
	}

	// @ts-expect-error
	element.checked = checked;
}

/**
 * Applies the default checked property without influencing the current checked property.
 * @param {HTMLInputElement} element
 * @param {boolean} checked
 */
function set_default_checked(element, checked) {
	const existing_value = element.checked;
	element.defaultChecked = checked;
	element.checked = existing_value;
}

/**
 * Applies the default value property without influencing the current value property.
 * @param {HTMLInputElement | HTMLTextAreaElement} element
 * @param {string} value
 */
function set_default_value(element, value) {
	const existing_value = element.value;
	element.defaultValue = value;
	element.value = existing_value;
}

/**
 * @param {Element} element
 * @param {string} attribute
 * @param {string | null} value
 * @param {boolean} [skip_warning]
 */
function set_attribute(element, attribute, value, skip_warning) {
	var attributes = get_attributes(element);

	if (_hydration_js__WEBPACK_IMPORTED_MODULE_1__.hydrating) {
		attributes[attribute] = element.getAttribute(attribute);

		if (
			attribute === 'src' ||
			attribute === 'srcset' ||
			(attribute === 'href' && element.nodeName === LINK_TAG)
		) {
			if (!skip_warning) {
				check_src_in_dev_hydration(element, attribute, value ?? '');
			}

			// If we reset these attributes, they would result in another network request, which we want to avoid.
			// We assume they are the same between client and server as checking if they are equal is expensive
			// (we can't just compare the strings as they can be different between client and server but result in the
			// same url, so we would need to create hidden anchor elements to compare them)
			return;
		}
	}

	if (attributes[attribute] === (attributes[attribute] = value)) return;

	if (attribute === 'loading') {
		// @ts-expect-error
		element[_client_constants__WEBPACK_IMPORTED_MODULE_6__.LOADING_ATTR_SYMBOL] = value;
	}

	if (value == null) {
		element.removeAttribute(attribute);
	} else if (typeof value !== 'string' && get_setters(element).has(attribute)) {
		// @ts-ignore
		element[attribute] = value;
	} else {
		element.setAttribute(attribute, value);
	}
}

/**
 * @param {Element} dom
 * @param {string} attribute
 * @param {string} value
 */
function set_xlink_attribute(dom, attribute, value) {
	dom.setAttributeNS('http://www.w3.org/1999/xlink', attribute, value);
}

/**
 * @param {HTMLElement} node
 * @param {string} prop
 * @param {any} value
 */
function set_custom_element_data(node, prop, value) {
	// We need to ensure that setting custom element props, which can
	// invoke lifecycle methods on other custom elements, does not also
	// associate those lifecycle methods with the current active reaction
	// or effect
	var previous_reaction = _runtime_js__WEBPACK_IMPORTED_MODULE_9__.active_reaction;
	var previous_effect = _runtime_js__WEBPACK_IMPORTED_MODULE_9__.active_effect;

	// If we're hydrating but the custom element is from Svelte, and it already scaffolded,
	// then it might run block logic in hydration mode, which we have to prevent.
	let was_hydrating = _hydration_js__WEBPACK_IMPORTED_MODULE_1__.hydrating;
	if (_hydration_js__WEBPACK_IMPORTED_MODULE_1__.hydrating) {
		(0,_hydration_js__WEBPACK_IMPORTED_MODULE_1__.set_hydrating)(false);
	}

	;(0,_runtime_js__WEBPACK_IMPORTED_MODULE_9__.set_active_reaction)(null);
	(0,_runtime_js__WEBPACK_IMPORTED_MODULE_9__.set_active_effect)(null);

	try {
		if (
			// `style` should use `set_attribute` rather than the setter
			prop !== 'style' &&
			// Don't compute setters for custom elements while they aren't registered yet,
			// because during their upgrade/instantiation they might add more setters.
			// Instead, fall back to a simple "an object, then set as property" heuristic.
			(setters_cache.has(node.getAttribute('is') || node.nodeName) ||
			// customElements may not be available in browser extension contexts
			!customElements ||
			customElements.get(node.getAttribute('is') || node.nodeName.toLowerCase())
				? get_setters(node).has(prop)
				: value && typeof value === 'object')
		) {
			// @ts-expect-error
			node[prop] = value;
		} else {
			// We did getters etc checks already, stringify before passing to set_attribute
			// to ensure it doesn't invoke the same logic again, and potentially populating
			// the setters cache too early.
			set_attribute(node, prop, value == null ? value : String(value));
		}
	} finally {
		;(0,_runtime_js__WEBPACK_IMPORTED_MODULE_9__.set_active_reaction)(previous_reaction);
		(0,_runtime_js__WEBPACK_IMPORTED_MODULE_9__.set_active_effect)(previous_effect);
		if (was_hydrating) {
			(0,_hydration_js__WEBPACK_IMPORTED_MODULE_1__.set_hydrating)(true);
		}
	}
}

/**
 * Spreads attributes onto a DOM element, taking into account the currently set attributes
 * @param {Element & ElementCSSInlineStyle} element
 * @param {Record<string | symbol, any> | undefined} prev
 * @param {Record<string | symbol, any>} next New attributes - this function mutates this object
 * @param {string} [css_hash]
 * @param {boolean} [should_remove_defaults]
 * @param {boolean} [skip_warning]
 * @returns {Record<string, any>}
 */
function set_attributes(
	element,
	prev,
	next,
	css_hash,
	should_remove_defaults = false,
	skip_warning = false
) {
	if (_hydration_js__WEBPACK_IMPORTED_MODULE_1__.hydrating && should_remove_defaults && element.nodeName === INPUT_TAG) {
		if (!('defaultValue' in next || 'defaultChecked' in next)) {
			remove_input_defaults(/** @type {HTMLInputElement} */ (element));
		}
	}

	var attributes = get_attributes(element);

	var is_custom_element = attributes[IS_CUSTOM_ELEMENT];
	var preserve_attribute_case = !attributes[IS_HTML];

	// If we're hydrating but the custom element is from Svelte, and it already scaffolded,
	// then it might run block logic in hydration mode, which we have to prevent.
	let is_hydrating_custom_element = _hydration_js__WEBPACK_IMPORTED_MODULE_1__.hydrating && is_custom_element;
	if (is_hydrating_custom_element) {
		(0,_hydration_js__WEBPACK_IMPORTED_MODULE_1__.set_hydrating)(false);
	}

	var current = prev || {};
	var is_option_element = element.nodeName === OPTION_TAG;
	var is_select_element = element.nodeName === SELECT_TAG;

	for (var key in prev) {
		// don't null our internal $$onX listeners
		if (!(key in next) && key[0] + key[1] !== '$$') {
			next[key] = null;
		}
	}

	if (next.class) {
		next.class = (0,_shared_attributes_js__WEBPACK_IMPORTED_MODULE_11__.clsx)(next.class);
	} else if (css_hash || next[CLASS]) {
		next.class = null; /* force call to set_class() */
	}

	if (next[STYLE]) {
		next.style ??= null; /* force call to set_style() */
	}

	var setters = get_setters(element);

	if (element.nodeName === INPUT_TAG && 'type' in next && ('value' in next || '__value' in next)) {
		var type = next.type;

		if (type !== current.type || (type === undefined && element.hasAttribute('type'))) {
			current.type = type;
			set_attribute(element, 'type', type, skip_warning);
		}
	}

	// since key is captured we use const
	for (const key in next) {
		// let instead of var because referenced in a closure
		let value = next[key];

		// Up here because we want to do this for the initial value, too, even if it's undefined,
		// and this wouldn't be reached in case of undefined because of the equality check below
		if (is_option_element && key === 'value' && value == null) {
			// The <option> element is a special case because removing the value attribute means
			// the value is set to the text content of the option element, and setting the value
			// to null or undefined means the value is set to the string "null" or "undefined".
			// To align with how we handle this case in non-spread-scenarios, this logic is needed.
			// There's a super-edge-case bug here that is left in in favor of smaller code size:
			// Because of the "set missing props to null" logic above, we can't differentiate
			// between a missing value and an explicitly set value of null or undefined. That means
			// that once set, the value attribute of an <option> element can't be removed. This is
			// a very rare edge case, and removing the attribute altogether isn't possible either
			// for the <option value={undefined}> case, so we're not losing any functionality here.
			// @ts-ignore
			element.value = element.__value = '';
			current[key] = value;
			continue;
		}

		if (key === 'class') {
			var is_html = element.namespaceURI === 'http://www.w3.org/1999/xhtml';
			(0,_class_js__WEBPACK_IMPORTED_MODULE_12__.set_class)(element, is_html, value, css_hash, prev?.[CLASS], next[CLASS]);
			current[key] = value;
			current[CLASS] = next[CLASS];
			continue;
		}

		if (key === 'style') {
			(0,_style_js__WEBPACK_IMPORTED_MODULE_13__.set_style)(element, value, prev?.[STYLE], next[STYLE]);
			current[key] = value;
			current[STYLE] = next[STYLE];
			continue;
		}

		var prev_value = current[key];

		// Skip if value is unchanged, unless it's `undefined` and the element still has the attribute
		if (value === prev_value && !(value === undefined && element.hasAttribute(key))) {
			continue;
		}

		current[key] = value;

		var prefix = key[0] + key[1]; // this is faster than key.slice(0, 2)
		if (prefix === '$$') continue;

		if (prefix === 'on') {
			/** @type {{ capture?: true }} */
			const opts = {};
			const event_handle_key = '$$' + key;
			let event_name = key.slice(2);
			var is_delegated = (0,_utils_js__WEBPACK_IMPORTED_MODULE_8__.can_delegate_event)(event_name);

			if ((0,_utils_js__WEBPACK_IMPORTED_MODULE_8__.is_capture_event)(event_name)) {
				event_name = event_name.slice(0, -7);
				opts.capture = true;
			}

			if (!is_delegated && prev_value) {
				// Listening to same event but different handler -> our handle function below takes care of this
				// If we were to remove and add listeners in this case, it could happen that the event is "swallowed"
				// (the browser seems to not know yet that a new one exists now) and doesn't reach the handler
				// https://github.com/sveltejs/svelte/issues/11903
				if (value != null) continue;

				element.removeEventListener(event_name, current[event_handle_key], opts);
				current[event_handle_key] = null;
			}

			if (is_delegated) {
				(0,_events_js__WEBPACK_IMPORTED_MODULE_3__.delegated)(event_name, element, value);
				(0,_events_js__WEBPACK_IMPORTED_MODULE_3__.delegate)([event_name]);
			} else if (value != null) {
				/**
				 * @this {any}
				 * @param {Event} evt
				 */
				function handle(evt) {
					current[key].call(this, evt);
				}

				current[event_handle_key] = (0,_events_js__WEBPACK_IMPORTED_MODULE_3__.create_event)(event_name, element, handle, opts);
			}
		} else if (key === 'style') {
			// avoid using the setter
			set_attribute(element, key, value);
		} else if (key === 'autofocus') {
			(0,_misc_js__WEBPACK_IMPORTED_MODULE_4__.autofocus)(/** @type {HTMLElement} */ (element), Boolean(value));
		} else if (!is_custom_element && (key === '__value' || (key === 'value' && value != null))) {
			// @ts-ignore We're not running this for custom elements because __value is actually
			// how Lit stores the current value on the element, and messing with that would break things.
			element.value = element.__value = value;
		} else if (key === 'selected' && is_option_element) {
			(0,_bindings_select_js__WEBPACK_IMPORTED_MODULE_16__.set_selected)(/** @type {HTMLOptionElement} */ (element), value);
		} else {
			var name = key;
			if (!preserve_attribute_case) {
				name = (0,_utils_js__WEBPACK_IMPORTED_MODULE_8__.normalize_attribute)(name);
			}

			var is_default = name === 'defaultValue' || name === 'defaultChecked';

			// A select's default value is represented by selected options, not a property.
			if (is_select_element && name === 'defaultValue') continue;

			if (value == null && !is_custom_element && !is_default) {
				attributes[key] = null;

				if (name === 'value' || name === 'checked') {
					// removing value/checked also removes defaultValue/defaultChecked — preserve
					let input = /** @type {HTMLInputElement} */ (element);
					const use_default = prev === undefined;
					if (name === 'value') {
						let previous = input.defaultValue;
						input.removeAttribute(name);
						input.defaultValue = previous;
						// @ts-ignore
						input.value = input.__value = use_default ? previous : null;
					} else {
						let previous = input.defaultChecked;
						input.removeAttribute(name);
						input.defaultChecked = previous;
						input.checked = use_default ? previous : false;
					}
				} else {
					element.removeAttribute(key);
				}
			} else if (
				is_default ||
				((is_custom_element || typeof value !== 'string') && setters.has(name))
			) {
				// @ts-ignore
				element[name] = value;
				// remove it from attributes's cache
				if (name in attributes) attributes[name] = _constants_js__WEBPACK_IMPORTED_MODULE_14__.UNINITIALIZED;
			} else if (typeof value !== 'function') {
				set_attribute(element, name, value, skip_warning);
			}
		}
	}

	if (is_hydrating_custom_element) {
		(0,_hydration_js__WEBPACK_IMPORTED_MODULE_1__.set_hydrating)(true);
	}

	return current;
}

/**
 * @param {Element & ElementCSSInlineStyle} element
 * @param {(...expressions: any) => Record<string | symbol, any>} fn
 * @param {Array<() => any>} sync
 * @param {Array<() => Promise<any>>} async
 * @param {Blocker[]} blockers
 * @param {string} [css_hash]
 * @param {boolean} [should_remove_defaults]
 * @param {boolean} [skip_warning]
 */
function attribute_effect(
	element,
	fn,
	sync = [],
	async = [],
	blockers = [],
	css_hash,
	should_remove_defaults = false,
	skip_warning = false
) {
	;(0,_reactivity_async_js__WEBPACK_IMPORTED_MODULE_17__.flatten)(blockers, sync, async, (values) => {
		/** @type {Record<string | symbol, any> | undefined} */
		var prev = undefined;

		/** @type {Record<symbol, Effect>} */
		var effects = {};

		var is_select = element.nodeName === SELECT_TAG;
		var inited = false;

		(0,_reactivity_effects_js__WEBPACK_IMPORTED_MODULE_15__.managed)(() => {
			var next = fn(...values.map(_runtime_js__WEBPACK_IMPORTED_MODULE_9__.get));
			/** @type {Record<string | symbol, any>} */
			var current = set_attributes(
				element,
				prev,
				next,
				css_hash,
				should_remove_defaults,
				skip_warning
			);

			if (inited && is_select) {
				var select = /** @type {HTMLSelectElement} */ (element);

				if ('defaultValue' in next) {
					(0,_bindings_select_js__WEBPACK_IMPORTED_MODULE_16__.set_default_select_value)(select, next.defaultValue);
				}

				if ('value' in next) {
					(0,_bindings_select_js__WEBPACK_IMPORTED_MODULE_16__.select_option)(select, next.value);
				}
			}

			for (let symbol of Object.getOwnPropertySymbols(effects)) {
				if (!next[symbol]) (0,_reactivity_effects_js__WEBPACK_IMPORTED_MODULE_15__.destroy_effect)(effects[symbol]);
			}

			for (let symbol of Object.getOwnPropertySymbols(next)) {
				var n = next[symbol];

				if (symbol.description === _constants_js__WEBPACK_IMPORTED_MODULE_14__.ATTACHMENT_KEY && (!prev || n !== prev[symbol])) {
					if (effects[symbol]) (0,_reactivity_effects_js__WEBPACK_IMPORTED_MODULE_15__.destroy_effect)(effects[symbol]);
					effects[symbol] = (0,_reactivity_effects_js__WEBPACK_IMPORTED_MODULE_15__.branch)(() => (0,_attachments_js__WEBPACK_IMPORTED_MODULE_10__.attach)(element, () => n));
				}

				current[symbol] = n;
			}

			prev = current;
		});

		if (is_select) {
			var select = /** @type {HTMLSelectElement} */ (element);

			(0,_reactivity_effects_js__WEBPACK_IMPORTED_MODULE_15__.effect)(() => {
				var attrs = /** @type {Record<string | symbol, any>} */ (prev);

				if ('defaultValue' in attrs) {
					(0,_bindings_select_js__WEBPACK_IMPORTED_MODULE_16__.set_default_select_value)(select, attrs.defaultValue);
				}

				;(0,_bindings_select_js__WEBPACK_IMPORTED_MODULE_16__.select_option)(select, attrs.value, true);
				(0,_bindings_select_js__WEBPACK_IMPORTED_MODULE_16__.init_select)(select);
			});
		}

		inited = true;
	});
}

/**
 *
 * @param {Element} element
 */
function get_attributes(element) {
	return /** @type {Record<string | symbol, unknown>} **/ (
		/** @type {any} */ (element)[_client_constants__WEBPACK_IMPORTED_MODULE_6__.ATTRIBUTES_CACHE] ??= {
			[IS_CUSTOM_ELEMENT]: element.nodeName.includes('-'),
			[IS_HTML]: element.namespaceURI === _constants_js__WEBPACK_IMPORTED_MODULE_14__.NAMESPACE_HTML
		}
	);
}

/** @type {Map<string, Set<string>>} */
var setters_cache = new Map();

/** @param {Element} element */
function get_setters(element) {
	var cache_key = element.getAttribute('is') || element.nodeName;
	var setters = setters_cache.get(cache_key);
	if (setters) return setters;
	setters_cache.set(cache_key, (setters = new Set()));

	var descriptors;
	var proto = element; // In the case of custom elements there might be setters on the instance
	var element_proto = Element.prototype;

	// Stop at Element, from there on there's only unnecessary (and dangerous, like innerHTML) setters we're not interested in
	// Do not use constructor.name here as that's unreliable in some browser environments
	while (element_proto !== proto) {
		descriptors = (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_2__.get_descriptors)(proto);

		for (var key in descriptors) {
			if (
				descriptors[key].set &&
				// better safe than sorry, we don't want spread attributes to mess with HTML content
				key !== 'innerHTML' &&
				key !== 'textContent' &&
				key !== 'innerText'
			) {
				setters.add(key);
			}
		}

		proto = (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_2__.get_prototype_of)(proto);
	}

	return setters;
}

/**
 * @param {any} element
 * @param {string} attribute
 * @param {string} value
 */
function check_src_in_dev_hydration(element, attribute, value) {
	if (!esm_env__WEBPACK_IMPORTED_MODULE_0__.DEV) return;
	if (attribute === 'srcset' && srcset_url_equal(element, value)) return;
	if (src_url_equal(element.getAttribute(attribute) ?? '', value)) return;

	_warnings_js__WEBPACK_IMPORTED_MODULE_5__.hydration_attribute_changed(
		attribute,
		element.outerHTML.replace(element.innerHTML, element.innerHTML && '...'),
		String(value)
	);
}

/**
 * @param {string} element_src
 * @param {string} url
 * @returns {boolean}
 */
function src_url_equal(element_src, url) {
	if (element_src === url) return true;
	return new URL(element_src, document.baseURI).href === new URL(url, document.baseURI).href;
}

/** @param {string} srcset */
function split_srcset(srcset) {
	return srcset.split(',').map((src) => src.trim().split(' ').filter(Boolean));
}

/**
 * @param {HTMLSourceElement | HTMLImageElement} element
 * @param {string} srcset
 * @returns {boolean}
 */
function srcset_url_equal(element, srcset) {
	var element_urls = split_srcset(element.srcset);
	var urls = split_srcset(srcset);

	return (
		urls.length === element_urls.length &&
		urls.every(
			([url, width], i) =>
				width === element_urls[i][1] &&
				// We need to test both ways because Vite will create an a full URL with
				// `new URL(asset, import.meta.url).href` for the client when `base: './'`, and the
				// relative URLs inside srcset are not automatically resolved to absolute URLs by
				// browsers (in contrast to img.src). This means both SSR and DOM code could
				// contain relative or absolute URLs.
				(src_url_equal(element_urls[i][0], url) || src_url_equal(url, element_urls[i][0]))
		)
	);
}


/***/ },

/***/ "./node_modules/svelte/src/internal/client/dom/elements/bindings/document.js"
/*!***********************************************************************************!*\
  !*** ./node_modules/svelte/src/internal/client/dom/elements/bindings/document.js ***!
  \***********************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   bind_active_element: () => (/* binding */ bind_active_element)
/* harmony export */ });
/* harmony import */ var _shared_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./shared.js */ "./node_modules/svelte/src/internal/client/dom/elements/bindings/shared.js");


/**
 * @param {(activeElement: Element | null) => void} update
 * @returns {void}
 */
function bind_active_element(update) {
	(0,_shared_js__WEBPACK_IMPORTED_MODULE_0__.listen)(document, ['focusin', 'focusout'], (event) => {
		if (event && event.type === 'focusout' && /** @type {FocusEvent} */ (event).relatedTarget) {
			// The tests still pass if we remove this, because of JSDOM limitations, but it is necessary
			// to avoid temporarily resetting to `document.body`
			return;
		}

		update(document.activeElement);
	});
}


/***/ },

/***/ "./node_modules/svelte/src/internal/client/dom/elements/bindings/input.js"
/*!********************************************************************************!*\
  !*** ./node_modules/svelte/src/internal/client/dom/elements/bindings/input.js ***!
  \********************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   bind_checked: () => (/* binding */ bind_checked),
/* harmony export */   bind_files: () => (/* binding */ bind_files),
/* harmony export */   bind_group: () => (/* binding */ bind_group),
/* harmony export */   bind_value: () => (/* binding */ bind_value)
/* harmony export */ });
/* harmony import */ var esm_env__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! esm-env */ "./node_modules/esm-env/index.js");
/* harmony import */ var _reactivity_effects_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../reactivity/effects.js */ "./node_modules/svelte/src/internal/client/reactivity/effects.js");
/* harmony import */ var _shared_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./shared.js */ "./node_modules/svelte/src/internal/client/dom/elements/bindings/shared.js");
/* harmony import */ var _errors_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../errors.js */ "./node_modules/svelte/src/internal/client/errors.js");
/* harmony import */ var _proxy_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../proxy.js */ "./node_modules/svelte/src/internal/client/proxy.js");
/* harmony import */ var _task_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../task.js */ "./node_modules/svelte/src/internal/client/dom/task.js");
/* harmony import */ var _hydration_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../hydration.js */ "./node_modules/svelte/src/internal/client/dom/hydration.js");
/* harmony import */ var _runtime_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../runtime.js */ "./node_modules/svelte/src/internal/client/runtime.js");
/* harmony import */ var _reactivity_batch_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../reactivity/batch.js */ "./node_modules/svelte/src/internal/client/reactivity/batch.js");
/* harmony import */ var _flags_index_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../flags/index.js */ "./node_modules/svelte/src/internal/flags/index.js");
/** @import { Batch } from '../../../reactivity/batch.js' */











/**
 * @param {HTMLInputElement} input
 * @param {() => unknown} get
 * @param {(value: unknown) => void} set
 * @returns {void}
 */
function bind_value(input, get, set = get) {
	var batches = new WeakSet();

	(0,_shared_js__WEBPACK_IMPORTED_MODULE_2__.listen_to_event_and_reset_event)(input, 'input', async (is_reset) => {
		if (esm_env__WEBPACK_IMPORTED_MODULE_0__.DEV && input.type === 'checkbox') {
			// TODO should this happen in prod too?
			_errors_js__WEBPACK_IMPORTED_MODULE_3__.bind_invalid_checkbox_value();
		}

		/** @type {any} */
		var value = is_reset ? input.defaultValue : input.value;
		value = is_numberlike_input(input) ? to_number(value) : value;
		set(value);

		if (_reactivity_batch_js__WEBPACK_IMPORTED_MODULE_8__.current_batch !== null) {
			batches.add(_reactivity_batch_js__WEBPACK_IMPORTED_MODULE_8__.current_batch);
		}

		// Because `{#each ...}` blocks work by updating sources inside the flush,
		// we need to wait a tick before checking to see if we should forcibly
		// update the input and reset the selection state
		await (0,_runtime_js__WEBPACK_IMPORTED_MODULE_7__.tick)();

		// Respect any validation in accessors
		if (value !== (value = get())) {
			var start = input.selectionStart;
			var end = input.selectionEnd;
			var length = input.value.length;

			// the value is coerced on assignment
			input.value = value ?? '';

			// Restore selection
			if (end !== null) {
				var new_length = input.value.length;
				// If cursor was at end and new input is longer, move cursor to new end
				if (start === end && end === length && new_length > length) {
					input.selectionStart = new_length;
					input.selectionEnd = new_length;
				} else {
					input.selectionStart = start;
					input.selectionEnd = Math.min(end, new_length);
				}
			}
		}
	});

	if (
		// If we are hydrating and the value has since changed,
		// then use the updated value from the input instead.
		(_hydration_js__WEBPACK_IMPORTED_MODULE_6__.hydrating && input.defaultValue !== input.value) ||
		// If defaultValue is set, then value == defaultValue
		// TODO Svelte 6: remove input.value check and set to empty string?
		((0,_runtime_js__WEBPACK_IMPORTED_MODULE_7__.untrack)(get) == null && input.value)
	) {
		set(is_numberlike_input(input) ? to_number(input.value) : input.value);

		if (_reactivity_batch_js__WEBPACK_IMPORTED_MODULE_8__.current_batch !== null) {
			batches.add(_reactivity_batch_js__WEBPACK_IMPORTED_MODULE_8__.current_batch);
		}
	}

	;(0,_reactivity_effects_js__WEBPACK_IMPORTED_MODULE_1__.render_effect)(() => {
		if (esm_env__WEBPACK_IMPORTED_MODULE_0__.DEV && input.type === 'checkbox') {
			// TODO should this happen in prod too?
			_errors_js__WEBPACK_IMPORTED_MODULE_3__.bind_invalid_checkbox_value();
		}

		var value = get();

		if (input === document.activeElement) {
			// In sync mode render effects are executed during tree traversal -> needs current_batch
			// In async mode render effects are flushed once batch resolved, at which point current_batch is null -> needs previous_batch
			var batch = /** @type {Batch} */ (_flags_index_js__WEBPACK_IMPORTED_MODULE_9__.async_mode_flag ? _reactivity_batch_js__WEBPACK_IMPORTED_MODULE_8__.previous_batch : _reactivity_batch_js__WEBPACK_IMPORTED_MODULE_8__.current_batch);

			// Never rewrite the contents of a focused input. We can get here if, for example,
			// an update is deferred because of async work depending on the input:
			//
			// <input bind:value={query}>
			// <p>{await find(query)}</p>
			if (batches.has(batch)) {
				return;
			}
		}

		if (is_numberlike_input(input) && value === to_number(input.value)) {
			// handles 0 vs 00 case (see https://github.com/sveltejs/svelte/issues/9959)
			return;
		}

		if (input.type === 'date' && !value && !input.value) {
			// Handles the case where a temporarily invalid date is set (while typing, for example with a leading 0 for the day)
			// and prevents this state from clearing the other parts of the date input (see https://github.com/sveltejs/svelte/issues/7897)
			return;
		}

		// don't set the value of the input if it's the same to allow
		// minlength to work properly
		if (value !== input.value) {
			// @ts-expect-error the value is coerced on assignment
			input.value = value ?? '';
		}
	});
}

/** @type {Set<HTMLInputElement[]>} */
const pending = new Set();

/**
 * @param {HTMLInputElement[]} inputs
 * @param {null | [number]} group_index
 * @param {HTMLInputElement} input
 * @param {() => unknown} get
 * @param {(value: unknown) => void} set
 * @returns {void}
 */
function bind_group(inputs, group_index, input, get, set = get) {
	var is_checkbox = input.getAttribute('type') === 'checkbox';
	var binding_group = inputs;

	// needs to be let or related code isn't treeshaken out if it's always false
	let hydration_mismatch = false;

	if (group_index !== null) {
		for (var index of group_index) {
			// @ts-expect-error
			binding_group = binding_group[index] ??= [];
		}
	}

	binding_group.push(input);

	(0,_shared_js__WEBPACK_IMPORTED_MODULE_2__.listen_to_event_and_reset_event)(
		input,
		'change',
		() => {
			// @ts-ignore
			var value = input.__value;

			if (is_checkbox) {
				value = get_binding_group_value(binding_group, value, input.checked);
			}

			set(value);
		},
		// TODO better default value handling
		() => set(is_checkbox ? [] : null)
	);

	(0,_reactivity_effects_js__WEBPACK_IMPORTED_MODULE_1__.render_effect)(() => {
		var value = get();

		// If we are hydrating and the value has since changed, then use the update value
		// from the input instead.
		if (_hydration_js__WEBPACK_IMPORTED_MODULE_6__.hydrating && input.defaultChecked !== input.checked) {
			hydration_mismatch = true;
			return;
		}

		if (is_checkbox) {
			value = value || [];
			// @ts-ignore
			input.checked = value.includes(input.__value);
		} else {
			// @ts-ignore
			input.checked = (0,_proxy_js__WEBPACK_IMPORTED_MODULE_4__.is)(input.__value, value);
		}
	});

	(0,_reactivity_effects_js__WEBPACK_IMPORTED_MODULE_1__.teardown)(() => {
		var index = binding_group.indexOf(input);

		if (index !== -1) {
			binding_group.splice(index, 1);
		}
	});

	if (!pending.has(binding_group)) {
		pending.add(binding_group);

		(0,_task_js__WEBPACK_IMPORTED_MODULE_5__.queue_micro_task)(() => {
			// necessary to maintain binding group order in all insertion scenarios
			binding_group.sort((a, b) => (a.compareDocumentPosition(b) === 4 ? -1 : 1));
			pending.delete(binding_group);
		});
	}

	;(0,_task_js__WEBPACK_IMPORTED_MODULE_5__.queue_micro_task)(() => {
		if (hydration_mismatch) {
			var value;

			if (is_checkbox) {
				value = get_binding_group_value(binding_group, value, input.checked);
			} else {
				var hydration_input = binding_group.find((input) => input.checked);
				// @ts-ignore
				value = hydration_input?.__value;
			}

			set(value);
		}
	});
}

/**
 * @param {HTMLInputElement} input
 * @param {() => unknown} get
 * @param {(value: unknown) => void} set
 * @returns {void}
 */
function bind_checked(input, get, set = get) {
	;(0,_shared_js__WEBPACK_IMPORTED_MODULE_2__.listen_to_event_and_reset_event)(input, 'change', (is_reset) => {
		var value = is_reset ? input.defaultChecked : input.checked;
		set(value);
	});

	if (
		// If we are hydrating and the value has since changed,
		// then use the update value from the input instead.
		(_hydration_js__WEBPACK_IMPORTED_MODULE_6__.hydrating && input.defaultChecked !== input.checked) ||
		// If defaultChecked is set, then checked == defaultChecked
		(0,_runtime_js__WEBPACK_IMPORTED_MODULE_7__.untrack)(get) == null
	) {
		set(input.checked);
	}

	;(0,_reactivity_effects_js__WEBPACK_IMPORTED_MODULE_1__.render_effect)(() => {
		var value = get();
		input.checked = Boolean(value);
	});
}

/**
 * @template V
 * @param {Array<HTMLInputElement>} group
 * @param {V} __value
 * @param {boolean} checked
 * @returns {V[]}
 */
function get_binding_group_value(group, __value, checked) {
	/** @type {Set<V>} */
	var value = new Set();

	for (var i = 0; i < group.length; i += 1) {
		if (group[i].checked) {
			// @ts-ignore
			value.add(group[i].__value);
		}
	}

	if (!checked) {
		value.delete(__value);
	}

	return Array.from(value);
}

/**
 * @param {HTMLInputElement} input
 */
function is_numberlike_input(input) {
	var type = input.type;
	return type === 'number' || type === 'range';
}

/**
 * @param {string} value
 */
function to_number(value) {
	return value === '' ? null : +value;
}

/**
 * @param {HTMLInputElement} input
 * @param {() => FileList | null} get
 * @param {(value: FileList | null) => void} set
 */
function bind_files(input, get, set = get) {
	;(0,_shared_js__WEBPACK_IMPORTED_MODULE_2__.listen_to_event_and_reset_event)(input, 'change', () => {
		set(input.files);
	});

	if (
		// If we are hydrating and the value has since changed,
		// then use the updated value from the input instead.
		_hydration_js__WEBPACK_IMPORTED_MODULE_6__.hydrating &&
		input.files
	) {
		set(input.files);
	}

	;(0,_reactivity_effects_js__WEBPACK_IMPORTED_MODULE_1__.render_effect)(() => {
		input.files = get();
	});
}


/***/ },

/***/ "./node_modules/svelte/src/internal/client/dom/elements/bindings/media.js"
/*!********************************************************************************!*\
  !*** ./node_modules/svelte/src/internal/client/dom/elements/bindings/media.js ***!
  \********************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   bind_buffered: () => (/* binding */ bind_buffered),
/* harmony export */   bind_current_time: () => (/* binding */ bind_current_time),
/* harmony export */   bind_ended: () => (/* binding */ bind_ended),
/* harmony export */   bind_muted: () => (/* binding */ bind_muted),
/* harmony export */   bind_paused: () => (/* binding */ bind_paused),
/* harmony export */   bind_playback_rate: () => (/* binding */ bind_playback_rate),
/* harmony export */   bind_played: () => (/* binding */ bind_played),
/* harmony export */   bind_ready_state: () => (/* binding */ bind_ready_state),
/* harmony export */   bind_seekable: () => (/* binding */ bind_seekable),
/* harmony export */   bind_seeking: () => (/* binding */ bind_seeking),
/* harmony export */   bind_volume: () => (/* binding */ bind_volume)
/* harmony export */ });
/* harmony import */ var _reactivity_effects_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../reactivity/effects.js */ "./node_modules/svelte/src/internal/client/reactivity/effects.js");
/* harmony import */ var _shared_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./shared.js */ "./node_modules/svelte/src/internal/client/dom/elements/bindings/shared.js");



/** @param {TimeRanges} ranges */
function time_ranges_to_array(ranges) {
	var array = [];

	for (var i = 0; i < ranges.length; i += 1) {
		array.push({ start: ranges.start(i), end: ranges.end(i) });
	}

	return array;
}

/**
 * @param {HTMLVideoElement | HTMLAudioElement} media
 * @param {() => number | undefined} get
 * @param {(value: number) => void} set
 * @returns {void}
 */
function bind_current_time(media, get, set = get) {
	/** @type {number} */
	var raf_id;
	/** @type {number} */
	var value;

	// Ideally, listening to timeupdate would be enough, but it fires too infrequently for the currentTime
	// binding, which is why we use a raf loop, too. We additionally still listen to timeupdate because
	// the user could be scrubbing through the video using the native controls when the media is paused.
	var callback = () => {
		cancelAnimationFrame(raf_id);

		if (!media.paused) {
			raf_id = requestAnimationFrame(callback);
		}

		var next_value = media.currentTime;
		if (value !== next_value) {
			set((value = next_value));
		}
	};

	raf_id = requestAnimationFrame(callback);
	media.addEventListener('timeupdate', callback);

	(0,_reactivity_effects_js__WEBPACK_IMPORTED_MODULE_0__.render_effect)(() => {
		var next_value = Number(get());

		if (value !== next_value && !isNaN(/** @type {any} */ (next_value))) {
			media.currentTime = value = next_value;
		}
	});

	(0,_reactivity_effects_js__WEBPACK_IMPORTED_MODULE_0__.teardown)(() => {
		cancelAnimationFrame(raf_id);
		media.removeEventListener('timeupdate', callback);
	});
}

/**
 * @param {HTMLVideoElement | HTMLAudioElement} media
 * @param {(array: Array<{ start: number; end: number }>) => void} set
 */
function bind_buffered(media, set) {
	/** @type {{ start: number; end: number; }[]} */
	var current;

	// `buffered` can update without emitting any event, so we check it on various events.
	// By specs, `buffered` always returns a new object, so we have to compare deeply.
	(0,_shared_js__WEBPACK_IMPORTED_MODULE_1__.listen)(media, ['loadedmetadata', 'progress', 'timeupdate', 'seeking'], () => {
		var ranges = media.buffered;

		if (
			!current ||
			current.length !== ranges.length ||
			current.some((range, i) => ranges.start(i) !== range.start || ranges.end(i) !== range.end)
		) {
			current = time_ranges_to_array(ranges);
			set(current);
		}
	});
}

/**
 * @param {HTMLVideoElement | HTMLAudioElement} media
 * @param {(array: Array<{ start: number; end: number }>) => void} set
 */
function bind_seekable(media, set) {
	;(0,_shared_js__WEBPACK_IMPORTED_MODULE_1__.listen)(media, ['loadedmetadata'], () => set(time_ranges_to_array(media.seekable)));
}

/**
 * @param {HTMLVideoElement | HTMLAudioElement} media
 * @param {(array: Array<{ start: number; end: number }>) => void} set
 */
function bind_played(media, set) {
	;(0,_shared_js__WEBPACK_IMPORTED_MODULE_1__.listen)(media, ['timeupdate'], () => set(time_ranges_to_array(media.played)));
}

/**
 * @param {HTMLVideoElement | HTMLAudioElement} media
 * @param {(seeking: boolean) => void} set
 */
function bind_seeking(media, set) {
	;(0,_shared_js__WEBPACK_IMPORTED_MODULE_1__.listen)(media, ['seeking', 'seeked'], () => set(media.seeking));
}

/**
 * @param {HTMLVideoElement | HTMLAudioElement} media
 * @param {(seeking: boolean) => void} set
 */
function bind_ended(media, set) {
	;(0,_shared_js__WEBPACK_IMPORTED_MODULE_1__.listen)(media, ['timeupdate', 'ended'], () => set(media.ended));
}

/**
 * @param {HTMLVideoElement | HTMLAudioElement} media
 * @param {(ready_state: number) => void} set
 */
function bind_ready_state(media, set) {
	;(0,_shared_js__WEBPACK_IMPORTED_MODULE_1__.listen)(
		media,
		['loadedmetadata', 'loadeddata', 'canplay', 'canplaythrough', 'playing', 'waiting', 'emptied'],
		() => set(media.readyState)
	);
}

/**
 * @param {HTMLVideoElement | HTMLAudioElement} media
 * @param {() => number | undefined} get
 * @param {(playback_rate: number) => void} set
 */
function bind_playback_rate(media, get, set = get) {
	// Needs to happen after element is inserted into the dom (which is guaranteed by using effect),
	// else playback will be set back to 1 by the browser
	;(0,_reactivity_effects_js__WEBPACK_IMPORTED_MODULE_0__.effect)(() => {
		var value = Number(get());

		if (value !== media.playbackRate && !isNaN(value)) {
			media.playbackRate = value;
		}
	});

	// Start listening to ratechange events after the element is inserted into the dom,
	// else playback will be set to 1 by the browser
	(0,_reactivity_effects_js__WEBPACK_IMPORTED_MODULE_0__.effect)(() => {
		(0,_shared_js__WEBPACK_IMPORTED_MODULE_1__.listen)(media, ['ratechange'], () => {
			set(media.playbackRate);
		});
	});
}

/**
 * @param {HTMLVideoElement | HTMLAudioElement} media
 * @param {() => boolean | undefined} get
 * @param {(paused: boolean) => void} set
 */
function bind_paused(media, get, set = get) {
	var paused = get();

	var update = () => {
		if (paused !== media.paused) {
			set((paused = media.paused));
		}
	};

	// If someone switches the src while media is playing, the player will pause.
	// Listen to the canplay event to get notified of this situation.
	(0,_shared_js__WEBPACK_IMPORTED_MODULE_1__.listen)(media, ['play', 'pause', 'canplay'], update, paused == null);

	// Needs to be an effect to ensure media element is mounted: else, if paused is `false` (i.e. should play right away)
	// a "The play() request was interrupted by a new load request" error would be thrown because the resource isn't loaded yet.
	(0,_reactivity_effects_js__WEBPACK_IMPORTED_MODULE_0__.effect)(() => {
		if ((paused = !!get()) !== media.paused) {
			if (paused) {
				media.pause();
			} else {
				media.play().catch((error) => {
					set((paused = true));
					throw error;
				});
			}
		}
	});
}

/**
 * @param {HTMLVideoElement | HTMLAudioElement} media
 * @param {() => number | undefined} get
 * @param {(volume: number) => void} set
 */
function bind_volume(media, get, set = get) {
	var callback = () => {
		set(media.volume);
	};

	if (get() == null) {
		callback();
	}

	;(0,_shared_js__WEBPACK_IMPORTED_MODULE_1__.listen)(media, ['volumechange'], callback, false);

	(0,_reactivity_effects_js__WEBPACK_IMPORTED_MODULE_0__.render_effect)(() => {
		var value = Number(get());

		if (value !== media.volume && !isNaN(value)) {
			media.volume = value;
		}
	});
}

/**
 * @param {HTMLVideoElement | HTMLAudioElement} media
 * @param {() => boolean | undefined} get
 * @param {(muted: boolean) => void} set
 */
function bind_muted(media, get, set = get) {
	var callback = () => {
		set(media.muted);
	};

	if (get() == null) {
		callback();
	}

	;(0,_shared_js__WEBPACK_IMPORTED_MODULE_1__.listen)(media, ['volumechange'], callback, false);

	(0,_reactivity_effects_js__WEBPACK_IMPORTED_MODULE_0__.render_effect)(() => {
		var value = !!get();

		if (media.muted !== value) media.muted = value;
	});
}


/***/ },

/***/ "./node_modules/svelte/src/internal/client/dom/elements/bindings/navigator.js"
/*!************************************************************************************!*\
  !*** ./node_modules/svelte/src/internal/client/dom/elements/bindings/navigator.js ***!
  \************************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   bind_online: () => (/* binding */ bind_online)
/* harmony export */ });
/* harmony import */ var _shared_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./shared.js */ "./node_modules/svelte/src/internal/client/dom/elements/bindings/shared.js");


/**
 * @param {(online: boolean) => void} update
 * @returns {void}
 */
function bind_online(update) {
	(0,_shared_js__WEBPACK_IMPORTED_MODULE_0__.listen)(window, ['online', 'offline'], () => {
		update(navigator.onLine);
	});
}


/***/ },

/***/ "./node_modules/svelte/src/internal/client/dom/elements/bindings/props.js"
/*!********************************************************************************!*\
  !*** ./node_modules/svelte/src/internal/client/dom/elements/bindings/props.js ***!
  \********************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   bind_prop: () => (/* binding */ bind_prop)
/* harmony export */ });
/* harmony import */ var _reactivity_effects_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../reactivity/effects.js */ "./node_modules/svelte/src/internal/client/reactivity/effects.js");
/* harmony import */ var _shared_utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../shared/utils.js */ "./node_modules/svelte/src/internal/shared/utils.js");



/**
 * Makes an `export`ed (non-prop) variable available on the `$$props` object
 * so that consumers can do `bind:x` on the component.
 * @template V
 * @param {Record<string, unknown>} props
 * @param {string} prop
 * @param {V} value
 * @returns {void}
 */
function bind_prop(props, prop, value) {
	var desc = (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_1__.get_descriptor)(props, prop);

	if (desc && desc.set) {
		props[prop] = value;
		(0,_reactivity_effects_js__WEBPACK_IMPORTED_MODULE_0__.teardown)(() => {
			props[prop] = null;
		});
	}
}


/***/ },

/***/ "./node_modules/svelte/src/internal/client/dom/elements/bindings/select.js"
/*!*********************************************************************************!*\
  !*** ./node_modules/svelte/src/internal/client/dom/elements/bindings/select.js ***!
  \*********************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   bind_select_value: () => (/* binding */ bind_select_value),
/* harmony export */   init_select: () => (/* binding */ init_select),
/* harmony export */   select_option: () => (/* binding */ select_option),
/* harmony export */   set_default_select_value: () => (/* binding */ set_default_select_value),
/* harmony export */   set_selected: () => (/* binding */ set_selected)
/* harmony export */ });
/* harmony import */ var _reactivity_effects_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../reactivity/effects.js */ "./node_modules/svelte/src/internal/client/reactivity/effects.js");
/* harmony import */ var _shared_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./shared.js */ "./node_modules/svelte/src/internal/client/dom/elements/bindings/shared.js");
/* harmony import */ var _proxy_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../proxy.js */ "./node_modules/svelte/src/internal/client/proxy.js");
/* harmony import */ var _shared_utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../shared/utils.js */ "./node_modules/svelte/src/internal/shared/utils.js");
/* harmony import */ var _warnings_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../warnings.js */ "./node_modules/svelte/src/internal/client/warnings.js");
/* harmony import */ var _reactivity_batch_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../reactivity/batch.js */ "./node_modules/svelte/src/internal/client/reactivity/batch.js");
/* harmony import */ var _flags_index_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../flags/index.js */ "./node_modules/svelte/src/internal/flags/index.js");








/**
 * Sets the `selected` attribute on an option so form reset can restore it.
 * @param {HTMLOptionElement} option
 * @param {boolean} selected
 */
function set_selected(option, selected) {
	if (selected) {
		if (!option.hasAttribute('selected')) option.setAttribute('selected', '');
	} else {
		option.removeAttribute('selected');
	}
}

/**
 * Sets the options a form reset should restore. The first call selects
 * them if nothing has set a value, later calls leave the current selection alone.
 * @param {HTMLSelectElement} select
 * @param {any} value
 */
function set_default_select_value(select, value) {
	var mounting = !('__defaultValue' in select);
	// @ts-expect-error
	if (!mounting && select.__defaultValue === value) return;
	// @ts-expect-error
	select.__defaultValue = value;
	apply_default_select_value(select, !mounting || '__value' in select);
}

/**
 * Marks the options matching `__defaultValue` as selected. Without `preserve`
 * a newly matching option gets selected, as an inserted `<option selected>` would.
 * @param {HTMLSelectElement} select
 * @param {boolean} preserve
 */
function apply_default_select_value(select, preserve) {
	// @ts-expect-error
	var value = select.__defaultValue;
	var multiple = select.multiple;
	var values = multiple ? value ?? [] : null;

	if (multiple && !(0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_3__.is_array)(values)) return;

	var index = select.selectedIndex;
	var selected = preserve && multiple ? new Set(select.selectedOptions) : null;

	for (var option of select.options) {
		var option_value = get_option_value(option);
		set_selected(
			option,
			multiple ? /** @type {any[]} */ (values).includes(option_value) : (0,_proxy_js__WEBPACK_IMPORTED_MODULE_2__.is)(option_value, value)
		);
	}

	if (!preserve) return;

	if (selected !== null) {
		for (option of select.options) {
			var was_selected = selected.has(option);
			if (option.selected !== was_selected) option.selected = was_selected;
		}
	} else if (select.selectedIndex !== index) {
		select.selectedIndex = index;
	}
}

/**
 * Selects the correct option(s) (depending on whether this is a multiple select)
 * @template V
 * @param {HTMLSelectElement} select
 * @param {V} value
 * @param {boolean} mounting
 */
function select_option(select, value, mounting = false) {
	if (select.multiple) {
		// If value is null or undefined, keep the selection as is
		if (value == undefined) {
			return;
		}

		// If not an array, warn and keep the selection as is
		if (!(0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_3__.is_array)(value)) {
			return _warnings_js__WEBPACK_IMPORTED_MODULE_4__.select_multiple_invalid_value();
		}

		// Otherwise, update the selection
		for (var option of select.options) {
			option.selected = value.includes(get_option_value(option));
		}

		return;
	}

	for (option of select.options) {
		var option_value = get_option_value(option);
		if ((0,_proxy_js__WEBPACK_IMPORTED_MODULE_2__.is)(option_value, value)) {
			option.selected = true;
			return;
		}
	}

	if (!mounting || value !== undefined) {
		select.selectedIndex = -1; // no option should be selected
	}
}

/**
 * Sets up a mutation observer to sync the current selection
 * and default to the dom when the options change, for example
 * when they are inside an `#each` block. Called once per `<select>`,
 * by the compiled output or by `attribute_effect` for spreads.
 * @param {HTMLSelectElement} select
 */
function init_select(select) {
	var observer = new MutationObserver((entries) => {
		// Mutations related to `<selectedcontent>` can never affect the option list.
		// Reacting to them could revert a user-initiated selection change, because the
		// records are delivered as soon as any listener returns (e.g. a delegated `input`
		// handler), which can happen before the `change` handler has updated `__value`
		if (entries.every(is_selectedcontent_mutation)) return;

		if ('__defaultValue' in select) {
			apply_default_select_value(select, false);
		}

		if ('__value' in select) {
			select_option(select, select.__value);
		}
		// Deliberately don't update the potential binding value,
		// the model should be preserved unless explicitly changed
	});

	observer.observe(select, {
		// Listen to option element changes
		childList: true,
		subtree: true, // because of <optgroup>
		// Listen to option element value attribute changes
		// (doesn't get notified of select value changes,
		// because that property is not reflected as an attribute)
		attributes: true,
		attributeFilter: ['value']
	});

	(0,_reactivity_effects_js__WEBPACK_IMPORTED_MODULE_0__.teardown)(() => {
		observer.disconnect();
	});
}

/**
 * @param {HTMLSelectElement} select
 * @param {() => unknown} get
 * @param {(value: unknown) => void} set
 * @returns {void}
 */
function bind_select_value(select, get, set = get) {
	var batches = new WeakSet();
	var mounting = true;

	(0,_shared_js__WEBPACK_IMPORTED_MODULE_1__.listen_to_event_and_reset_event)(select, 'change', (is_reset) => {
		var query = is_reset ? '[selected]' : ':checked';
		/** @type {unknown} */
		var value;

		if (select.multiple) {
			value = [].map.call(select.querySelectorAll(query), get_option_value);
		} else {
			/** @type {HTMLOptionElement | null} */
			var selected_option =
				select.querySelector(query) ??
				// will fall back to first non-disabled option if no option is selected
				select.querySelector('option:not([disabled])');
			value = selected_option && get_option_value(selected_option);
		}

		set(value);

		// @ts-ignore
		select.__value = value;

		if (_reactivity_batch_js__WEBPACK_IMPORTED_MODULE_5__.current_batch !== null) {
			batches.add(_reactivity_batch_js__WEBPACK_IMPORTED_MODULE_5__.current_batch);
		}
	});

	// Needs to be an effect, not a render_effect, so that in case of each loops the logic runs after the each block has updated
	(0,_reactivity_effects_js__WEBPACK_IMPORTED_MODULE_0__.effect)(() => {
		var value = get();

		if (select === document.activeElement) {
			// In sync mode render effects are executed during tree traversal -> needs current_batch
			// In async mode render effects are flushed once batch resolved, at which point current_batch is null -> needs previous_batch
			var batch = /** @type {Batch} */ (_flags_index_js__WEBPACK_IMPORTED_MODULE_6__.async_mode_flag ? _reactivity_batch_js__WEBPACK_IMPORTED_MODULE_5__.previous_batch : _reactivity_batch_js__WEBPACK_IMPORTED_MODULE_5__.current_batch);

			// Don't update the <select> if it is focused. We can get here if, for example,
			// an update is deferred because of async work depending on the select:
			//
			// <select bind:value={selected}>...</select>
			// <p>{await find(selected)}</p>
			if (batches.has(batch)) {
				return;
			}
		}

		select_option(select, value, mounting);

		// Mounting and value undefined -> take selection from dom
		if (mounting && value === undefined) {
			/** @type {HTMLOptionElement | null} */
			var selected_option = select.querySelector(':checked');
			if (selected_option !== null) {
				value = get_option_value(selected_option);
				set(value);
			}
		}

		// @ts-ignore
		select.__value = value;
		mounting = false;
	});
}

/** @param {HTMLOptionElement} option */
function get_option_value(option) {
	// __value only exists if the <option> has a value attribute
	if ('__value' in option) {
		return option.__value;
	} else {
		return option.value;
	}
}

/**
 * Returns `true` if the mutation stems from the browser mirroring the selected
 * option's content into `<selectedcontent>`, or from us replacing the
 * `<selectedcontent>` element with a clone of itself
 * @param {MutationRecord} entry
 */
function is_selectedcontent_mutation(entry) {
	if (/** @type {Element} */ (entry.target).closest('selectedcontent') !== null) {
		return true;
	}

	if (entry.type === 'childList') {
		var nodes = [...entry.addedNodes, ...entry.removedNodes];
		return nodes.length > 0 && nodes.every((node) => node.nodeName === 'SELECTEDCONTENT');
	}

	return false;
}


/***/ },

/***/ "./node_modules/svelte/src/internal/client/dom/elements/bindings/shared.js"
/*!*********************************************************************************!*\
  !*** ./node_modules/svelte/src/internal/client/dom/elements/bindings/shared.js ***!
  \*********************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   listen: () => (/* binding */ listen),
/* harmony export */   listen_to_event_and_reset_event: () => (/* binding */ listen_to_event_and_reset_event),
/* harmony export */   without_reactive_context: () => (/* binding */ without_reactive_context)
/* harmony export */ });
/* harmony import */ var _reactivity_effects_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../reactivity/effects.js */ "./node_modules/svelte/src/internal/client/reactivity/effects.js");
/* harmony import */ var _runtime_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../runtime.js */ "./node_modules/svelte/src/internal/client/runtime.js");
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../constants.js */ "./node_modules/svelte/src/internal/client/constants.js");
/* harmony import */ var _misc_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../misc.js */ "./node_modules/svelte/src/internal/client/dom/elements/misc.js");





/**
 * Fires the handler once immediately (unless corresponding arg is set to `false`),
 * then listens to the given events until the render effect context is destroyed
 * @param {EventTarget} target
 * @param {Array<string>} events
 * @param {(event?: Event) => void} handler
 * @param {any} call_handler_immediately
 */
function listen(target, events, handler, call_handler_immediately = true) {
	if (call_handler_immediately) {
		handler();
	}

	for (var name of events) {
		target.addEventListener(name, handler);
	}

	;(0,_reactivity_effects_js__WEBPACK_IMPORTED_MODULE_0__.teardown)(() => {
		for (var name of events) {
			target.removeEventListener(name, handler);
		}
	});
}

/**
 * @template T
 * @param {() => T} fn
 */
function without_reactive_context(fn) {
	var previous_reaction = _runtime_js__WEBPACK_IMPORTED_MODULE_1__.active_reaction;
	var previous_effect = _runtime_js__WEBPACK_IMPORTED_MODULE_1__.active_effect;
	(0,_runtime_js__WEBPACK_IMPORTED_MODULE_1__.set_active_reaction)(null);
	(0,_runtime_js__WEBPACK_IMPORTED_MODULE_1__.set_active_effect)(null);
	try {
		return fn();
	} finally {
		;(0,_runtime_js__WEBPACK_IMPORTED_MODULE_1__.set_active_reaction)(previous_reaction);
		(0,_runtime_js__WEBPACK_IMPORTED_MODULE_1__.set_active_effect)(previous_effect);
	}
}

/**
 * Listen to the given event, and then instantiate a global form reset listener if not already done,
 * to notify all bindings when the form is reset
 * @param {HTMLElement} element
 * @param {string} event
 * @param {(is_reset?: true) => void} handler
 * @param {(is_reset?: true) => void} [on_reset]
 */
function listen_to_event_and_reset_event(element, event, handler, on_reset = handler) {
	element.addEventListener(event, () => without_reactive_context(handler));
	const prev = /** @type {any} */ (element)[_constants_js__WEBPACK_IMPORTED_MODULE_2__.FORM_RESET_HANDLER];
	if (prev) {
		// special case for checkbox that can have multiple binds (group & checked)
		/** @type {any} */ (element)[_constants_js__WEBPACK_IMPORTED_MODULE_2__.FORM_RESET_HANDLER] = () => {
			prev();
			on_reset(true);
		};
	} else {
		/** @type {any} */ (element)[_constants_js__WEBPACK_IMPORTED_MODULE_2__.FORM_RESET_HANDLER] = () => on_reset(true);
	}

	;(0,_misc_js__WEBPACK_IMPORTED_MODULE_3__.add_form_reset_listener)();
}


/***/ },

/***/ "./node_modules/svelte/src/internal/client/dom/elements/bindings/size.js"
/*!*******************************************************************************!*\
  !*** ./node_modules/svelte/src/internal/client/dom/elements/bindings/size.js ***!
  \*******************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   bind_element_size: () => (/* binding */ bind_element_size),
/* harmony export */   bind_resize_observer: () => (/* binding */ bind_resize_observer)
/* harmony export */ });
/* harmony import */ var _reactivity_effects_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../reactivity/effects.js */ "./node_modules/svelte/src/internal/client/reactivity/effects.js");
/* harmony import */ var _runtime_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../runtime.js */ "./node_modules/svelte/src/internal/client/runtime.js");



/**
 * We create one listener for all elements
 * @see {@link https://groups.google.com/a/chromium.org/g/blink-dev/c/z6ienONUb5A/m/F5-VcUZtBAAJ Explanation}
 */
class ResizeObserverSingleton {
	/** */
	#listeners = new WeakMap();

	/** @type {ResizeObserver | undefined} */
	#observer;

	/** @type {ResizeObserverOptions} */
	#options;

	/** @static */
	static entries = new WeakMap();

	/** @param {ResizeObserverOptions} options */
	constructor(options) {
		this.#options = options;
	}

	/**
	 * @param {Element} element
	 * @param {(entry: ResizeObserverEntry) => any} listener
	 */
	observe(element, listener) {
		var listeners = this.#listeners.get(element) || new Set();
		listeners.add(listener);

		this.#listeners.set(element, listeners);
		this.#getObserver().observe(element, this.#options);

		return () => {
			var listeners = this.#listeners.get(element);
			listeners.delete(listener);

			if (listeners.size === 0) {
				this.#listeners.delete(element);
				/** @type {ResizeObserver} */ (this.#observer).unobserve(element);
			}
		};
	}

	#getObserver() {
		return (
			this.#observer ??
			(this.#observer = new ResizeObserver(
				/** @param {any} entries */ (entries) => {
					for (var entry of entries) {
						ResizeObserverSingleton.entries.set(entry.target, entry);
						for (var listener of this.#listeners.get(entry.target) || []) {
							listener(entry);
						}
					}
				}
			))
		);
	}
}

var resize_observer_content_box = /* @__PURE__ */ new ResizeObserverSingleton({
	box: 'content-box'
});

var resize_observer_border_box = /* @__PURE__ */ new ResizeObserverSingleton({
	box: 'border-box'
});

var resize_observer_device_pixel_content_box = /* @__PURE__ */ new ResizeObserverSingleton({
	box: 'device-pixel-content-box'
});

/**
 * @param {Element} element
 * @param {'contentRect' | 'contentBoxSize' | 'borderBoxSize' | 'devicePixelContentBoxSize'} type
 * @param {(entry: keyof ResizeObserverEntry) => void} set
 */
function bind_resize_observer(element, type, set) {
	var observer =
		type === 'contentRect' || type === 'contentBoxSize'
			? resize_observer_content_box
			: type === 'borderBoxSize'
				? resize_observer_border_box
				: resize_observer_device_pixel_content_box;

	var unsub = observer.observe(element, /** @param {any} entry */ (entry) => set(entry[type]));
	(0,_reactivity_effects_js__WEBPACK_IMPORTED_MODULE_0__.teardown)(unsub);
}

/**
 * @param {HTMLElement} element
 * @param {'clientWidth' | 'clientHeight' | 'offsetWidth' | 'offsetHeight'} type
 * @param {(size: number) => void} set
 */
function bind_element_size(element, type, set) {
	var unsub = resize_observer_border_box.observe(element, () => set(element[type]));

	(0,_reactivity_effects_js__WEBPACK_IMPORTED_MODULE_0__.effect)(() => {
		// The update could contain reads which should be ignored
		(0,_runtime_js__WEBPACK_IMPORTED_MODULE_1__.untrack)(() => set(element[type]));
		return unsub;
	});
}


/***/ },

/***/ "./node_modules/svelte/src/internal/client/dom/elements/bindings/this.js"
/*!*******************************************************************************!*\
  !*** ./node_modules/svelte/src/internal/client/dom/elements/bindings/this.js ***!
  \*******************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   bind_this: () => (/* binding */ bind_this)
/* harmony export */ });
/* harmony import */ var _client_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! #client/constants */ "./node_modules/svelte/src/internal/client/constants.js");
/* harmony import */ var _context_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../context.js */ "./node_modules/svelte/src/internal/client/context.js");
/* harmony import */ var _reactivity_effects_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../reactivity/effects.js */ "./node_modules/svelte/src/internal/client/reactivity/effects.js");
/* harmony import */ var _runtime_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../runtime.js */ "./node_modules/svelte/src/internal/client/runtime.js");
/** @import { ComponentContext, Effect } from '#client' */





/**
 * @param {any} bound_value
 * @param {Element} element_or_component
 * @returns {boolean}
 */
function is_bound_this(bound_value, element_or_component) {
	return (
		bound_value === element_or_component || bound_value?.[_client_constants__WEBPACK_IMPORTED_MODULE_0__.STATE_SYMBOL] === element_or_component
	);
}

/**
 * @param {any} element_or_component
 * @param {(value: unknown, ...parts: unknown[]) => void} update
 * @param {(...parts: unknown[]) => unknown} get_value
 * @param {() => unknown[]} [get_parts] Set if the this binding is used inside an each block,
 * 										returns all the parts of the each block context that are used in the expression
 * @returns {void}
 */
function bind_this(
	element_or_component = (0,_context_js__WEBPACK_IMPORTED_MODULE_1__.mark_as_component)(),
	update,
	get_value,
	get_parts
) {
	var component_effect = /** @type {ComponentContext} */ (_context_js__WEBPACK_IMPORTED_MODULE_1__.component_context).r;
	var parent = /** @type {Effect} */ (_runtime_js__WEBPACK_IMPORTED_MODULE_3__.active_effect);

	(0,_reactivity_effects_js__WEBPACK_IMPORTED_MODULE_2__.effect)(() => {
		/** @type {unknown[]} */
		var old_parts;

		/** @type {unknown[]} */
		var parts;

		(0,_reactivity_effects_js__WEBPACK_IMPORTED_MODULE_2__.render_effect)(() => {
			old_parts = parts;
			// We only track changes to the parts, not the value itself to avoid unnecessary reruns.
			parts = get_parts?.() || [];

			(0,_runtime_js__WEBPACK_IMPORTED_MODULE_3__.untrack)(() => {
				if (!is_bound_this(get_value(...parts), element_or_component)) {
					update(element_or_component, ...parts);
					// If this is an effect rerun (cause: each block context changes), then nullify the binding at
					// the previous position if it isn't already taken over by a different effect.
					if (old_parts && is_bound_this(get_value(...old_parts), element_or_component)) {
						update(null, ...old_parts);
					}
				}
			});
		});

		return () => {
			// When the bind:this effect is destroyed, we go up the effect parent chain until we find the last parent effect that is destroyed,
			// or the effect containing the component bind:this is in (whichever comes first). That way we can time the nulling of the binding
			// as close to user/developer expectation as possible.
			// TODO Svelte 6: Decide if we want to keep this logic or just always null the binding in the component effect's teardown
			// (which would be simpler, but less intuitive in some cases, and breaks the `ondestroy-before-cleanup` test)
			let p = parent;
			while (p !== component_effect && p.parent !== null && p.parent.f & _client_constants__WEBPACK_IMPORTED_MODULE_0__.DESTROYING) {
				p = p.parent;
			}
			const teardown = () => {
				if (parts && is_bound_this(get_value(...parts), element_or_component)) {
					update(null, ...parts);
				}
			};
			const original_teardown = p.teardown;
			p.teardown = () => {
				teardown();
				original_teardown?.();
			};
		};
	});

	return element_or_component;
}


/***/ },

/***/ "./node_modules/svelte/src/internal/client/dom/elements/bindings/universal.js"
/*!************************************************************************************!*\
  !*** ./node_modules/svelte/src/internal/client/dom/elements/bindings/universal.js ***!
  \************************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   bind_content_editable: () => (/* binding */ bind_content_editable),
/* harmony export */   bind_focused: () => (/* binding */ bind_focused),
/* harmony export */   bind_property: () => (/* binding */ bind_property)
/* harmony export */ });
/* harmony import */ var _reactivity_effects_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../reactivity/effects.js */ "./node_modules/svelte/src/internal/client/reactivity/effects.js");
/* harmony import */ var _shared_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./shared.js */ "./node_modules/svelte/src/internal/client/dom/elements/bindings/shared.js");



/**
 * @param {'innerHTML' | 'textContent' | 'innerText'} property
 * @param {HTMLElement} element
 * @param {() => unknown} get
 * @param {(value: unknown) => void} set
 * @returns {void}
 */
function bind_content_editable(property, element, get, set = get) {
	element.addEventListener('input', () => {
		// @ts-ignore
		set(element[property]);
	});

	(0,_reactivity_effects_js__WEBPACK_IMPORTED_MODULE_0__.render_effect)(() => {
		var value = get();

		if (element[property] !== value) {
			if (value == null) {
				// @ts-ignore
				var non_null_value = element[property];
				set(non_null_value);
			} else {
				// @ts-ignore
				element[property] = value + '';
			}
		}
	});
}

/**
 * @param {string} property
 * @param {string} event_name
 * @param {Element} element
 * @param {(value: unknown) => void} set
 * @param {() => unknown} [get]
 * @returns {void}
 */
function bind_property(property, event_name, element, set, get) {
	var handler = () => {
		// @ts-ignore
		set(element[property]);
	};

	element.addEventListener(event_name, handler);

	if (get) {
		(0,_reactivity_effects_js__WEBPACK_IMPORTED_MODULE_0__.render_effect)(() => {
			// @ts-ignore
			element[property] = get();
		});
	} else {
		handler();
	}

	// @ts-ignore
	if (element === document.body || element === window || element === document) {
		(0,_reactivity_effects_js__WEBPACK_IMPORTED_MODULE_0__.teardown)(() => {
			element.removeEventListener(event_name, handler);
		});
	}
}

/**
 * @param {HTMLElement} element
 * @param {(value: unknown) => void} set
 * @returns {void}
 */
function bind_focused(element, set) {
	;(0,_shared_js__WEBPACK_IMPORTED_MODULE_1__.listen)(element, ['focus', 'blur'], () => {
		set(element === document.activeElement);
	});
}


/***/ },

/***/ "./node_modules/svelte/src/internal/client/dom/elements/bindings/window.js"
/*!*********************************************************************************!*\
  !*** ./node_modules/svelte/src/internal/client/dom/elements/bindings/window.js ***!
  \*********************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   bind_window_scroll: () => (/* binding */ bind_window_scroll),
/* harmony export */   bind_window_size: () => (/* binding */ bind_window_size)
/* harmony export */ });
/* harmony import */ var _reactivity_effects_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../reactivity/effects.js */ "./node_modules/svelte/src/internal/client/reactivity/effects.js");
/* harmony import */ var _shared_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./shared.js */ "./node_modules/svelte/src/internal/client/dom/elements/bindings/shared.js");



/**
 * @param {'x' | 'y'} type
 * @param {() => number} get
 * @param {(value: number) => void} set
 * @returns {void}
 */
function bind_window_scroll(type, get, set = get) {
	var is_scrolling_x = type === 'x';

	var target_handler = () =>
		(0,_shared_js__WEBPACK_IMPORTED_MODULE_1__.without_reactive_context)(() => {
			scrolling = true;
			clearTimeout(timeout);
			timeout = setTimeout(clear, 100); // TODO use scrollend event if supported (or when supported everywhere?)

			set(window[is_scrolling_x ? 'scrollX' : 'scrollY']);
		});

	addEventListener('scroll', target_handler, {
		passive: true
	});

	var scrolling = false;

	/** @type {ReturnType<typeof setTimeout>} */
	var timeout;
	var clear = () => {
		scrolling = false;
	};
	var first = true;

	(0,_reactivity_effects_js__WEBPACK_IMPORTED_MODULE_0__.render_effect)(() => {
		var latest_value = get();
		// Don't scroll to the initial value for accessibility reasons
		if (first) {
			first = false;
		} else if (!scrolling && latest_value != null) {
			scrolling = true;
			clearTimeout(timeout);
			if (is_scrolling_x) {
				scrollTo(latest_value, window.scrollY);
			} else {
				scrollTo(window.scrollX, latest_value);
			}
			timeout = setTimeout(clear, 100);
		}
	});

	// Browsers don't fire the scroll event for the initial scroll position when scroll style isn't set to smooth
	(0,_reactivity_effects_js__WEBPACK_IMPORTED_MODULE_0__.effect)(target_handler);

	(0,_reactivity_effects_js__WEBPACK_IMPORTED_MODULE_0__.teardown)(() => {
		removeEventListener('scroll', target_handler);
	});
}

/**
 * @param {'innerWidth' | 'innerHeight' | 'outerWidth' | 'outerHeight'} type
 * @param {(size: number) => void} set
 */
function bind_window_size(type, set) {
	;(0,_shared_js__WEBPACK_IMPORTED_MODULE_1__.listen)(window, ['resize'], () => (0,_shared_js__WEBPACK_IMPORTED_MODULE_1__.without_reactive_context)(() => set(window[type])));
}


/***/ },

/***/ "./node_modules/svelte/src/internal/client/dom/elements/class.js"
/*!***********************************************************************!*\
  !*** ./node_modules/svelte/src/internal/client/dom/elements/class.js ***!
  \***********************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   set_class: () => (/* binding */ set_class)
/* harmony export */ });
/* harmony import */ var _shared_attributes_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../shared/attributes.js */ "./node_modules/svelte/src/internal/shared/attributes.js");
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../constants.js */ "./node_modules/svelte/src/internal/client/constants.js");
/* harmony import */ var _hydration_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../hydration.js */ "./node_modules/svelte/src/internal/client/dom/hydration.js");




/**
 * @param {Element} dom
 * @param {boolean | number} is_html
 * @param {string | null} value
 * @param {string} [hash]
 * @param {Record<string, any>} [prev_classes]
 * @param {Record<string, any>} [next_classes]
 * @returns {Record<string, boolean> | undefined}
 */
function set_class(dom, is_html, value, hash, prev_classes, next_classes) {
	var prev = /** @type {any} */ (dom)[_constants_js__WEBPACK_IMPORTED_MODULE_1__.CLASS_CACHE];

	if (
		_hydration_js__WEBPACK_IMPORTED_MODULE_2__.hydrating ||
		prev !== value ||
		prev === undefined // for edge case of `class={undefined}`
	) {
		var next_class_name = (0,_shared_attributes_js__WEBPACK_IMPORTED_MODULE_0__.to_class)(value, hash, next_classes);

		if (!_hydration_js__WEBPACK_IMPORTED_MODULE_2__.hydrating || next_class_name !== dom.getAttribute('class')) {
			// Removing the attribute when the value is only an empty string causes
			// performance issues vs simply making the className an empty string. So
			// we should only remove the class if the value is nullish
			// and there no hash/directives :
			if (next_class_name == null) {
				dom.removeAttribute('class');
			} else if (is_html) {
				dom.className = next_class_name;
			} else {
				dom.setAttribute('class', next_class_name);
			}
		}

		/** @type {any} */ (dom)[_constants_js__WEBPACK_IMPORTED_MODULE_1__.CLASS_CACHE] = value;
	} else if (next_classes && prev_classes !== next_classes) {
		for (var key in next_classes) {
			var is_present = !!next_classes[key];

			if (prev_classes == null || is_present !== !!prev_classes[key]) {
				dom.classList.toggle(key, is_present);
			}
		}
	}

	return next_classes;
}


/***/ },

/***/ "./node_modules/svelte/src/internal/client/dom/elements/custom-element.js"
/*!********************************************************************************!*\
  !*** ./node_modules/svelte/src/internal/client/dom/elements/custom-element.js ***!
  \********************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   create_custom_element: () => (/* binding */ create_custom_element)
/* harmony export */ });
/* harmony import */ var _legacy_legacy_client_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../legacy/legacy-client.js */ "./node_modules/svelte/src/legacy/legacy-client.js");
/* harmony import */ var _reactivity_effects_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../reactivity/effects.js */ "./node_modules/svelte/src/internal/client/reactivity/effects.js");
/* harmony import */ var _template_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../template.js */ "./node_modules/svelte/src/internal/client/dom/template.js");
/* harmony import */ var _shared_utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../shared/utils.js */ "./node_modules/svelte/src/internal/shared/utils.js");
/* harmony import */ var _operations_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../operations.js */ "./node_modules/svelte/src/internal/client/dom/operations.js");






/**
 * @typedef {Object} CustomElementPropDefinition
 * @property {string} [attribute]
 * @property {boolean} [reflect]
 * @property {'String'|'Boolean'|'Number'|'Array'|'Object'} [type]
 */

/** @type {any} */
let SvelteElement;

if (typeof HTMLElement === 'function') {
	SvelteElement = class extends HTMLElement {
		/** The Svelte component constructor */
		$$ctor;
		/** Slots */
		$$s;
		/** @type {any} The Svelte component instance */
		$$c;
		/** Whether or not the custom element is connected */
		$$cn = false;
		/** @type {Record<string, any>} Component props data */
		$$d = {};
		/** `true` if currently in the process of reflecting component props back to attributes */
		$$r = false;
		/** @type {Record<string, CustomElementPropDefinition>} Props definition (name, reflected, type etc) */
		$$p_d = {};
		/** @type {Record<string, EventListenerOrEventListenerObject[]>} Event listeners */
		$$l = {};
		/** @type {Map<EventListenerOrEventListenerObject, Function>} Event listener unsubscribe functions */
		$$l_u = new Map();
		/** @type {any} The managed render effect for reflecting attributes */
		$$me;
		/** @type {ShadowRoot | null} The ShadowRoot of the custom element */
		$$shadowRoot = null;

		/**
		 * @param {*} $$componentCtor
		 * @param {*} $$slots
		 * @param {ShadowRootInit | undefined} shadow_root_init
		 */
		constructor($$componentCtor, $$slots, shadow_root_init) {
			super();
			this.$$ctor = $$componentCtor;
			this.$$s = $$slots;

			if (shadow_root_init) {
				// We need to store the reference to shadow root, because `closed` shadow root cannot be
				// accessed with `this.shadowRoot`.
				this.$$shadowRoot = this.attachShadow(shadow_root_init);
			}
		}

		/**
		 * @param {string} type
		 * @param {EventListenerOrEventListenerObject} listener
		 * @param {boolean | AddEventListenerOptions} [options]
		 */
		addEventListener(type, listener, options) {
			// We can't determine upfront if the event is a custom event or not, so we have to
			// listen to both. If someone uses a custom event with the same name as a regular
			// browser event, this fires twice - we can't avoid that.
			this.$$l[type] = this.$$l[type] || [];
			this.$$l[type].push(listener);
			if (this.$$c) {
				const unsub = this.$$c.$on(type, listener);
				this.$$l_u.set(listener, unsub);
			}
			super.addEventListener(type, listener, options);
		}

		/**
		 * @param {string} type
		 * @param {EventListenerOrEventListenerObject} listener
		 * @param {boolean | AddEventListenerOptions} [options]
		 */
		removeEventListener(type, listener, options) {
			super.removeEventListener(type, listener, options);
			if (this.$$c) {
				const unsub = this.$$l_u.get(listener);
				if (unsub) {
					unsub();
					this.$$l_u.delete(listener);
				}
			}
		}

		async connectedCallback() {
			this.$$cn = true;
			if (!this.$$c) {
				// We wait one tick to let possible child slot elements be created/mounted
				await Promise.resolve();
				if (!this.$$cn || this.$$c) {
					return;
				}
				/** @param {string} name */
				function create_slot(name) {
					/**
					 * @param {Element} anchor
					 */
					return (anchor) => {
						const slot = (0,_operations_js__WEBPACK_IMPORTED_MODULE_4__.create_element)('slot');
						if (name !== 'default') slot.name = name;

						(0,_template_js__WEBPACK_IMPORTED_MODULE_2__.append)(anchor, slot);
					};
				}
				/** @type {Record<string, any>} */
				const $$slots = {};
				const existing_slots = get_custom_elements_slots(this);
				for (const name of this.$$s) {
					if (name in existing_slots) {
						if (name === 'default' && !this.$$d.children) {
							this.$$d.children = create_slot(name);
							$$slots.default = true;
						} else {
							$$slots[name] = create_slot(name);
						}
					}
				}
				for (const attribute of this.attributes) {
					// this.$$data takes precedence over this.attributes
					const name = this.$$g_p(attribute.name);
					if (!(name in this.$$d)) {
						this.$$d[name] = get_custom_element_value(name, attribute.value, this.$$p_d, 'toProp');
					}
				}
				// Port over props that were set programmatically before ce was initialized
				for (const key in this.$$p_d) {
					// @ts-expect-error
					if (!(key in this.$$d) && this[key] !== undefined) {
						// @ts-expect-error
						this.$$d[key] = this[key]; // don't transform, these were set through JavaScript
						// @ts-expect-error
						delete this[key]; // remove the property that shadows the getter/setter
					}
				}
				this.$$c = (0,_legacy_legacy_client_js__WEBPACK_IMPORTED_MODULE_0__.createClassComponent)({
					component: this.$$ctor,
					target: this.$$shadowRoot || this,
					props: {
						...this.$$d,
						$$slots,
						$$host: this
					}
				});

				// Reflect component props as attributes
				this.$$me = (0,_reactivity_effects_js__WEBPACK_IMPORTED_MODULE_1__.effect_root)(() => {
					(0,_reactivity_effects_js__WEBPACK_IMPORTED_MODULE_1__.render_effect)(() => {
						this.$$r = true;
						for (const key of (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_3__.object_keys)(this.$$c)) {
							if (!this.$$p_d[key]?.reflect) continue;
							this.$$d[key] = this.$$c[key];
							const attribute_value = get_custom_element_value(
								key,
								this.$$d[key],
								this.$$p_d,
								'toAttribute'
							);
							if (attribute_value == null) {
								this.removeAttribute(this.$$p_d[key].attribute || key);
							} else {
								this.setAttribute(this.$$p_d[key].attribute || key, attribute_value);
							}
						}
						this.$$r = false;
					});
				});

				for (const type in this.$$l) {
					for (const listener of this.$$l[type]) {
						const unsub = this.$$c.$on(type, listener);
						this.$$l_u.set(listener, unsub);
					}
				}
				this.$$l = {};
			}
		}

		// We don't need this when working within Svelte code, but for compatibility of people using this outside of Svelte
		// and setting attributes through setAttribute etc, this is helpful

		/**
		 * @param {string} attr
		 * @param {string} _oldValue
		 * @param {string} newValue
		 */
		attributeChangedCallback(attr, _oldValue, newValue) {
			if (this.$$r) return;
			attr = this.$$g_p(attr);
			this.$$d[attr] = get_custom_element_value(attr, newValue, this.$$p_d, 'toProp');
			this.$$c?.$set({ [attr]: this.$$d[attr] });
		}

		disconnectedCallback() {
			this.$$cn = false;
			// In a microtask, because this could be a move within the DOM
			Promise.resolve().then(() => {
				if (!this.$$cn && this.$$c) {
					this.$$c.$destroy();
					this.$$me();
					this.$$c = undefined;
				}
			});
		}

		/**
		 * @param {string} attribute_name
		 */
		$$g_p(attribute_name) {
			return (
				(0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_3__.object_keys)(this.$$p_d).find(
					(key) =>
						this.$$p_d[key].attribute === attribute_name ||
						(!this.$$p_d[key].attribute && key.toLowerCase() === attribute_name)
				) || attribute_name
			);
		}
	};
}

/**
 * @param {string} prop
 * @param {any} value
 * @param {Record<string, CustomElementPropDefinition>} props_definition
 * @param {'toAttribute' | 'toProp'} [transform]
 */
function get_custom_element_value(prop, value, props_definition, transform) {
	const type = props_definition[prop]?.type;
	value = type === 'Boolean' && typeof value !== 'boolean' ? value != null : value;
	if (!transform || !props_definition[prop]) {
		return value;
	} else if (transform === 'toAttribute') {
		switch (type) {
			case 'Object':
			case 'Array':
				return value == null ? null : JSON.stringify(value);
			case 'Boolean':
				return value ? '' : null;
			case 'Number':
				return value == null ? null : value;
			default:
				return value;
		}
	} else {
		switch (type) {
			case 'Object':
			case 'Array':
				return value && JSON.parse(value);
			case 'Boolean':
				return value; // conversion already handled above
			case 'Number':
				return value != null ? +value : value;
			default:
				return value;
		}
	}
}

/**
 * @param {HTMLElement} element
 */
function get_custom_elements_slots(element) {
	/** @type {Record<string, true>} */
	const result = {};
	element.childNodes.forEach((node) => {
		result[/** @type {Element} node */ (node).slot || 'default'] = true;
	});
	return result;
}

/**
 * @internal
 *
 * Turn a Svelte component into a custom element.
 * @param {any} Component  A Svelte component function
 * @param {Record<string, CustomElementPropDefinition>} props_definition  The props to observe
 * @param {string[]} slots  The slots to create
 * @param {string[]} exports  Explicitly exported values, other than props
 * @param {ShadowRootInit | undefined} shadow_root_init  Options passed to shadow DOM constructor
 * @param {(ce: new () => HTMLElement) => new () => HTMLElement} [extend]
 */
function create_custom_element(
	Component,
	props_definition,
	slots,
	exports,
	shadow_root_init,
	extend
) {
	let Class = class extends SvelteElement {
		constructor() {
			super(Component, slots, shadow_root_init);
			this.$$p_d = props_definition;
		}
		static get observedAttributes() {
			return (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_3__.object_keys)(props_definition).map((key) =>
				(props_definition[key].attribute || key).toLowerCase()
			);
		}
	};
	(0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_3__.object_keys)(props_definition).forEach((prop) => {
		(0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_3__.define_property)(Class.prototype, prop, {
			get() {
				return this.$$c && prop in this.$$c ? this.$$c[prop] : this.$$d[prop];
			},
			set(value) {
				value = get_custom_element_value(prop, value, props_definition);
				this.$$d[prop] = value;
				var component = this.$$c;

				if (component) {
					// // If the instance has an accessor, use that instead
					var setter = (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_3__.get_descriptor)(component, prop)?.get;

					if (setter) {
						component[prop] = value;
					} else {
						component.$set({ [prop]: value });
					}
				}
			}
		});
	});
	exports.forEach((property) => {
		(0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_3__.define_property)(Class.prototype, property, {
			get() {
				return this.$$c?.[property];
			}
		});
	});
	if (extend) {
		// @ts-expect-error - assigning here is fine
		Class = extend(Class);
	}
	Component.element = /** @type {any} */ Class;
	return Class;
}


/***/ },

/***/ "./node_modules/svelte/src/internal/client/dom/elements/customizable-select.js"
/*!*************************************************************************************!*\
  !*** ./node_modules/svelte/src/internal/client/dom/elements/customizable-select.js ***!
  \*************************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   customizable_select: () => (/* binding */ customizable_select),
/* harmony export */   selectedcontent: () => (/* binding */ selectedcontent)
/* harmony export */ });
/* harmony import */ var _hydration_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../hydration.js */ "./node_modules/svelte/src/internal/client/dom/hydration.js");
/* harmony import */ var _operations_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../operations.js */ "./node_modules/svelte/src/internal/client/dom/operations.js");
/* harmony import */ var _reconciler_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../reconciler.js */ "./node_modules/svelte/src/internal/client/dom/reconciler.js");
/* harmony import */ var _attachments_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./attachments.js */ "./node_modules/svelte/src/internal/client/dom/elements/attachments.js");





/** @type {boolean | null} */
let supported = null;

/**
 * Checks if the browser supports rich HTML content inside `<option>` elements.
 * Modern browsers preserve HTML elements inside options, while older browsers
 * strip them during parsing, leaving only text content.
 * @returns {boolean}
 */
function is_supported() {
	if (supported === null) {
		var select = (0,_operations_js__WEBPACK_IMPORTED_MODULE_1__.create_element)('select');
		select.innerHTML = (0,_reconciler_js__WEBPACK_IMPORTED_MODULE_2__.create_trusted_html)('<option><span>t</span></option>');
		supported = /** @type {Element} */ (select.firstChild)?.firstChild?.nodeType === 1;
	}

	return supported;
}

/**
 *
 * @param {HTMLElement} element
 * @param {(new_element: HTMLElement) => void} update_element
 */
function selectedcontent(element, update_element) {
	// if it's not supported no need for special logic
	if (!is_supported()) return;

	// we use the attach function directly just to make sure is executed when is mounted to the dom
	(0,_attachments_js__WEBPACK_IMPORTED_MODULE_3__.attach)(element, () => () => {
		const select = element.closest('select');
		if (!select) return;

		const observer = new MutationObserver((entries) => {
			var selected = false;

			for (const entry of entries) {
				if (entry.target === element) {
					// the `<selectedcontent>` already changed, no need to replace it
					return;
				}

				// if the changes doesn't include the selected `<option>` we don't need to do anything
				selected ||= !!entry.target.parentElement?.closest('option')?.selected;
			}

			if (selected) {
				// replace the `<selectedcontent>` with a clone
				element.replaceWith((element = /** @type {HTMLElement} */ (element.cloneNode(true))));
				update_element(element);
			}
		});

		observer.observe(select, {
			childList: true,
			characterData: true,
			subtree: true
		});

		return () => {
			observer.disconnect();
		};
	});
}

/**
 * Handles rich HTML content inside `<option>`, `<optgroup>`, or `<select>` elements with browser-specific branching.
 * Modern browsers preserve HTML inside options, while older browsers strip it to text only.
 *
 * @param {HTMLOptionElement | HTMLOptGroupElement | HTMLSelectElement} element The element to process
 * @param {() => void} rich_fn Function to process rich HTML content (modern browsers)
 */
function customizable_select(element, rich_fn) {
	var was_hydrating = _hydration_js__WEBPACK_IMPORTED_MODULE_0__.hydrating;

	if (!is_supported()) {
		(0,_hydration_js__WEBPACK_IMPORTED_MODULE_0__.set_hydrating)(false);
		element.textContent = '';
		element.append((0,_operations_js__WEBPACK_IMPORTED_MODULE_1__.create_comment)(''));
	}

	try {
		rich_fn();
	} finally {
		if (was_hydrating) {
			if (_hydration_js__WEBPACK_IMPORTED_MODULE_0__.hydrating) {
				(0,_hydration_js__WEBPACK_IMPORTED_MODULE_0__.reset)(element);
			} else {
				(0,_hydration_js__WEBPACK_IMPORTED_MODULE_0__.set_hydrating)(true);
				(0,_hydration_js__WEBPACK_IMPORTED_MODULE_0__.set_hydrate_node)(element);
			}
		}
	}
}


/***/ },

/***/ "./node_modules/svelte/src/internal/client/dom/elements/events.js"
/*!************************************************************************!*\
  !*** ./node_modules/svelte/src/internal/client/dom/elements/events.js ***!
  \************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   all_registered_events: () => (/* binding */ all_registered_events),
/* harmony export */   apply: () => (/* binding */ apply),
/* harmony export */   create_event: () => (/* binding */ create_event),
/* harmony export */   delegate: () => (/* binding */ delegate),
/* harmony export */   delegated: () => (/* binding */ delegated),
/* harmony export */   event: () => (/* binding */ event),
/* harmony export */   event_symbol: () => (/* binding */ event_symbol),
/* harmony export */   handle_event_propagation: () => (/* binding */ handle_event_propagation),
/* harmony export */   on: () => (/* binding */ on),
/* harmony export */   replay_events: () => (/* binding */ replay_events),
/* harmony export */   root_event_handles: () => (/* binding */ root_event_handles)
/* harmony export */ });
/* harmony import */ var _reactivity_effects_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../reactivity/effects.js */ "./node_modules/svelte/src/internal/client/reactivity/effects.js");
/* harmony import */ var _shared_utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../shared/utils.js */ "./node_modules/svelte/src/internal/shared/utils.js");
/* harmony import */ var _hydration_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../hydration.js */ "./node_modules/svelte/src/internal/client/dom/hydration.js");
/* harmony import */ var _task_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../task.js */ "./node_modules/svelte/src/internal/client/dom/task.js");
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../constants.js */ "./node_modules/svelte/src/constants.js");
/* harmony import */ var _warnings_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../warnings.js */ "./node_modules/svelte/src/internal/client/warnings.js");
/* harmony import */ var _runtime_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../runtime.js */ "./node_modules/svelte/src/internal/client/runtime.js");
/* harmony import */ var _bindings_shared_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./bindings/shared.js */ "./node_modules/svelte/src/internal/client/dom/elements/bindings/shared.js");









/**
 * Used on elements, as a map of event type -> event handler,
 * and on events themselves to track which element handled an event
 */
const event_symbol = Symbol('events');

/** @type {Set<string>} */
const all_registered_events = new Set();

/** @type {Set<(events: Array<string>) => void>} */
const root_event_handles = new Set();

/**
 * SSR adds onload and onerror attributes to catch those events before the hydration.
 * This function detects those cases, removes the attributes and replays the events.
 * @param {HTMLElement} dom
 */
function replay_events(dom) {
	if (!_hydration_js__WEBPACK_IMPORTED_MODULE_2__.hydrating) return;

	dom.removeAttribute('onload');
	dom.removeAttribute('onerror');
	// @ts-expect-error
	const event = dom.__e;
	if (event !== undefined) {
		// @ts-expect-error
		dom.__e = undefined;
		queueMicrotask(() => {
			if (dom.isConnected) {
				dom.dispatchEvent(event);
			}
		});
	}
}

/**
 * @param {string} event_name
 * @param {EventTarget} dom
 * @param {EventListener} [handler]
 * @param {AddEventListenerOptions} [options]
 */
function create_event(event_name, dom, handler, options = {}) {
	/**
	 * @this {EventTarget}
	 */
	function target_handler(/** @type {Event} */ event) {
		if (!options.capture) {
			// Only call in the bubble phase, else delegated events would be called before the capturing events
			handle_event_propagation.call(dom, event);
		}
		if (!event.cancelBubble) {
			return (0,_bindings_shared_js__WEBPACK_IMPORTED_MODULE_7__.without_reactive_context)(() => {
				return handler?.call(this, event);
			});
		}
	}

	// Chrome has a bug where pointer events don't work when attached to a DOM element that has been cloned
	// with cloneNode() and the DOM element is disconnected from the document. To ensure the event works, we
	// defer the attachment till after it's been appended to the document. TODO: remove this once Chrome fixes
	// this bug. The same applies to wheel events and touch events.
	if (
		event_name.startsWith('pointer') ||
		event_name.startsWith('touch') ||
		event_name === 'wheel'
	) {
		target_handler.__removed = false;
		(0,_task_js__WEBPACK_IMPORTED_MODULE_3__.queue_micro_task)(() => {
			if (!target_handler.__removed) {
				dom.addEventListener(event_name, target_handler, options);
			}
		});
	} else {
		dom.addEventListener(event_name, target_handler, options);
	}

	return target_handler;
}

/**
 * Attaches an event handler to an element and returns a function that removes the handler. Using this
 * rather than `addEventListener` will preserve the correct order relative to handlers added declaratively
 * (with attributes like `onclick`), which use event delegation for performance reasons
 *
 * @param {EventTarget} element
 * @param {string} type
 * @param {EventListener} handler
 * @param {AddEventListenerOptions} [options]
 */
function on(element, type, handler, options = {}) {
	var target_handler = create_event(type, element, handler, options);

	return () => {
		target_handler.__removed = true;
		element.removeEventListener(type, target_handler, options);
	};
}

/**
 * @param {string} event_name
 * @param {Element} dom
 * @param {EventListener} [handler]
 * @param {boolean} [capture]
 * @param {boolean} [passive]
 * @returns {void}
 */
function event(event_name, dom, handler, capture, passive) {
	var options = { capture, passive };
	var target_handler = create_event(event_name, dom, handler, options);

	if (
		dom === document.body ||
		// @ts-ignore
		dom === window ||
		// @ts-ignore
		dom === document ||
		// Firefox has quirky behavior, it can happen that we still get "canplay" events when the element is already removed
		dom instanceof HTMLMediaElement
	) {
		(0,_reactivity_effects_js__WEBPACK_IMPORTED_MODULE_0__.teardown)(() => {
			target_handler.__removed = true;
			dom.removeEventListener(event_name, target_handler, options);
		});
	}
}

/**
 * @param {string} event_name
 * @param {Element} element
 * @param {EventListener} [handler]
 * @returns {void}
 */
function delegated(event_name, element, handler) {
	// @ts-expect-error
	(element[event_symbol] ??= {})[event_name] = handler;
}

/**
 * @param {Array<string>} events
 * @returns {void}
 */
function delegate(events) {
	for (var i = 0; i < events.length; i++) {
		all_registered_events.add(events[i]);
	}

	for (var fn of root_event_handles) {
		fn(events);
	}
}

// used to store the reference to the currently propagated event
// to prevent garbage collection between microtasks in Firefox (<= 141)
// If the event object is GCed too early, the expando __root property
// set on the event object is lost, causing the event delegation
// to process the event twice
let last_propagated_event = null;

// whether a task is already queued to clear `last_propagated_event`
let last_propagated_event_clear_scheduled = false;

/**
 * @this {EventTarget}
 * @param {Event} event
 * @returns {void}
 */
function handle_event_propagation(event) {
	var handler_element = this;
	var owner_document = /** @type {Node} */ (handler_element).ownerDocument;
	var event_name = event.type;
	var path = event.composedPath?.() || [];
	var current_target = /** @type {null | Element} */ (path[0] || event.target);

	last_propagated_event = event;

	// The reference is only needed while the event can still reach another
	// delegated root, i.e. during the current (synchronous) dispatch and its
	// microtask checkpoints. Clearing it in a later task preserves the
	// Firefox workaround while making sure the slot doesn't retain the last
	// event forever — through `event.target` it would otherwise keep the
	// entire detached subtree of whatever the user last clicked in alive
	// until the next delegated event happens to arrive.
	if (!last_propagated_event_clear_scheduled) {
		last_propagated_event_clear_scheduled = true;
		setTimeout(() => {
			last_propagated_event_clear_scheduled = false;
			last_propagated_event = null;
		});
	}

	// composedPath contains list of nodes the event has propagated through.
	// We check `event_symbol` to skip all nodes below it in case this is a
	// parent of the `event_symbol` node, which indicates that there's nested
	// mounted apps. In this case we don't want to trigger events multiple times.
	var path_idx = 0;

	// the `last_propagated_event === event` check is redundant, but
	// without it the variable will be DCE'd and things will
	// fail mysteriously in Firefox
	// @ts-expect-error is added below
	var handled_at = last_propagated_event === event && event[event_symbol];

	if (handled_at) {
		var at_idx = path.indexOf(handled_at);
		if (
			at_idx !== -1 &&
			(handler_element === document || handler_element === /** @type {any} */ (window))
		) {
			// This is the fallback document listener or a window listener, but the event was already handled
			// -> ignore, but set handle_at to document/window so that we're resetting the event
			// chain in case someone manually dispatches the same event object again.
			// @ts-expect-error
			event[event_symbol] = handler_element;
			return;
		}

		// We're deliberately not skipping if the index is higher, because
		// someone could create an event programmatically and emit it multiple times,
		// in which case we want to handle the whole propagation chain properly each time.
		// (this will only be a false negative if the event is dispatched multiple times and
		// the fallback document listener isn't reached in between, but that's super rare)
		var handler_idx = path.indexOf(handler_element);
		if (handler_idx === -1) {
			// handle_idx can theoretically be -1 (happened in some JSDOM testing scenarios with an event listener on the window object)
			// so guard against that, too, and assume that everything was handled at this point.
			return;
		}

		if (at_idx <= handler_idx) {
			path_idx = at_idx;
		}
	}

	current_target = /** @type {Element} */ (path[path_idx] || event.target);
	// there can only be one delegated event per element, and we either already handled the current target,
	// or this is the very first target in the chain which has a non-delegated listener, in which case it's safe
	// to handle a possible delegated event on it later (through the root delegation listener for example).
	if (current_target === handler_element) return;

	// Proxy currentTarget to correct target
	(0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_1__.define_property)(event, 'currentTarget', {
		configurable: true,
		get() {
			return current_target || owner_document;
		}
	});

	// This started because of Chromium issue https://chromestatus.com/feature/5128696823545856,
	// where removal or moving of the DOM can cause sync `blur` events to fire, which can cause logic
	// to run inside the current `active_reaction`, which isn't what we want at all. However, on reflection,
	// it's probably best that all events handled by Svelte have this behaviour, as we don't really want
	// an event handler to run in the context of another reaction or effect.
	var previous_reaction = _runtime_js__WEBPACK_IMPORTED_MODULE_6__.active_reaction;
	var previous_effect = _runtime_js__WEBPACK_IMPORTED_MODULE_6__.active_effect;
	(0,_runtime_js__WEBPACK_IMPORTED_MODULE_6__.set_active_reaction)(null);
	(0,_runtime_js__WEBPACK_IMPORTED_MODULE_6__.set_active_effect)(null);

	try {
		/**
		 * @type {unknown}
		 */
		var throw_error;
		/**
		 * @type {unknown[]}
		 */
		var other_errors = [];

		while (current_target !== null) {
			if (current_target === handler_element) break;

			try {
				// @ts-expect-error
				var delegated = current_target[event_symbol]?.[event_name];

				if (
					delegated != null &&
					(!(/** @type {any} */ (current_target).disabled) ||
						// DOM could've been updated already by the time this is reached, so we check this as well
						// -> the target could not have been disabled because it emits the event in the first place
						event.target === current_target)
				) {
					delegated.call(current_target, event);
				}
			} catch (error) {
				if (throw_error) {
					other_errors.push(error);
				} else {
					throw_error = error;
				}
			}
			if (event.cancelBubble) break;

			path_idx++;
			current_target = path_idx < path.length ? /** @type {Element} */ (path[path_idx]) : null;
		}

		if (throw_error) {
			for (let error of other_errors) {
				// Throw the rest of the errors, one-by-one on a microtask
				queueMicrotask(() => {
					throw error;
				});
			}
			throw throw_error;
		}
	} finally {
		// @ts-expect-error is used above
		event[event_symbol] = handler_element;
		// @ts-ignore remove proxy on currentTarget
		delete event.currentTarget;
		(0,_runtime_js__WEBPACK_IMPORTED_MODULE_6__.set_active_reaction)(previous_reaction);
		(0,_runtime_js__WEBPACK_IMPORTED_MODULE_6__.set_active_effect)(previous_effect);
	}
}

/**
 * In dev, warn if an event handler is not a function, as it means the
 * user probably called the handler or forgot to add a `() =>`
 * @param {() => (event: Event, ...args: any) => void} thunk
 * @param {EventTarget} element
 * @param {[Event, ...any]} args
 * @param {any} component
 * @param {[number, number]} [loc]
 * @param {boolean} [remove_parens]
 */
function apply(
	thunk,
	element,
	args,
	component,
	loc,
	has_side_effects = false,
	remove_parens = false
) {
	let handler;
	let error;

	try {
		handler = thunk();
	} catch (e) {
		error = e;
	}

	if (typeof handler !== 'function' && (has_side_effects || handler != null || error)) {
		const filename = component?.[_constants_js__WEBPACK_IMPORTED_MODULE_4__.FILENAME];
		const location = loc ? ` at ${filename}:${loc[0]}:${loc[1]}` : ` in ${filename}`;
		const phase = args[0]?.eventPhase < Event.BUBBLING_PHASE ? 'capture' : '';
		const event_name = args[0]?.type + phase;
		const description = `\`${event_name}\` handler${location}`;
		const suggestion = remove_parens ? 'remove the trailing `()`' : 'add a leading `() =>`';

		_warnings_js__WEBPACK_IMPORTED_MODULE_5__.event_handler_invalid(description, suggestion);

		if (error) {
			throw error;
		}
	}
	handler?.apply(element, args);
}


/***/ },

/***/ "./node_modules/svelte/src/internal/client/dom/elements/misc.js"
/*!**********************************************************************!*\
  !*** ./node_modules/svelte/src/internal/client/dom/elements/misc.js ***!
  \**********************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   add_form_reset_listener: () => (/* binding */ add_form_reset_listener),
/* harmony export */   autofocus: () => (/* binding */ autofocus),
/* harmony export */   remove_textarea_child: () => (/* binding */ remove_textarea_child)
/* harmony export */ });
/* harmony import */ var _hydration_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../hydration.js */ "./node_modules/svelte/src/internal/client/dom/hydration.js");
/* harmony import */ var _operations_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../operations.js */ "./node_modules/svelte/src/internal/client/dom/operations.js");
/* harmony import */ var _task_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../task.js */ "./node_modules/svelte/src/internal/client/dom/task.js");
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../constants.js */ "./node_modules/svelte/src/internal/client/constants.js");





/**
 * @param {HTMLElement} dom
 * @param {boolean} value
 * @returns {void}
 */
function autofocus(dom, value) {
	if (value) {
		const body = document.body;
		dom.autofocus = true;

		(0,_task_js__WEBPACK_IMPORTED_MODULE_2__.queue_micro_task)(() => {
			if (document.activeElement === body) {
				dom.focus();
			}
		});
	}
}

/**
 * The child of a textarea actually corresponds to the defaultValue property, so we need
 * to remove it upon hydration to avoid a bug when someone resets the form value.
 * @param {HTMLTextAreaElement} dom
 * @returns {void}
 */
function remove_textarea_child(dom) {
	if (_hydration_js__WEBPACK_IMPORTED_MODULE_0__.hydrating && (0,_operations_js__WEBPACK_IMPORTED_MODULE_1__.get_first_child)(dom) !== null) {
		(0,_operations_js__WEBPACK_IMPORTED_MODULE_1__.clear_text_content)(dom);
	}
}

let listening_to_form_reset = false;

function add_form_reset_listener() {
	if (!listening_to_form_reset) {
		listening_to_form_reset = true;
		document.addEventListener(
			'reset',
			(evt) => {
				// Needs to happen one tick later or else the dom properties of the form
				// elements have not updated to their reset values yet
				Promise.resolve().then(() => {
					if (!evt.defaultPrevented) {
						for (const e of /**@type {HTMLFormElement} */ (evt.target).elements) {
							/** @type {any} */ (e)[_constants_js__WEBPACK_IMPORTED_MODULE_3__.FORM_RESET_HANDLER]?.();
						}
					}
				});
			},
			// In the capture phase to guarantee we get noticed of it (no possibility of stopPropagation)
			{ capture: true }
		);
	}
}


/***/ },

/***/ "./node_modules/svelte/src/internal/client/dom/elements/style.js"
/*!***********************************************************************!*\
  !*** ./node_modules/svelte/src/internal/client/dom/elements/style.js ***!
  \***********************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   set_style: () => (/* binding */ set_style)
/* harmony export */ });
/* harmony import */ var _shared_attributes_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../shared/attributes.js */ "./node_modules/svelte/src/internal/shared/attributes.js");
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../constants.js */ "./node_modules/svelte/src/internal/client/constants.js");
/* harmony import */ var _hydration_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../hydration.js */ "./node_modules/svelte/src/internal/client/dom/hydration.js");




/**
 * @param {Element & ElementCSSInlineStyle} dom
 * @param {Record<string, any>} prev
 * @param {Record<string, any>} next
 * @param {string} [priority]
 */
function update_styles(dom, prev = {}, next, priority) {
	for (var key in next) {
		var value = next[key];

		if (prev[key] !== value) {
			if (next[key] == null) {
				dom.style.removeProperty(key);
			} else {
				dom.style.setProperty(key, value, priority);
			}
		}
	}
}

/**
 * @param {Element & ElementCSSInlineStyle} dom
 * @param {string | null} value
 * @param {Record<string, any> | [Record<string, any>, Record<string, any>]} [prev_styles]
 * @param {Record<string, any> | [Record<string, any>, Record<string, any>]} [next_styles]
 */
function set_style(dom, value, prev_styles, next_styles) {
	var prev = /** @type {any} */ (dom)[_constants_js__WEBPACK_IMPORTED_MODULE_1__.STYLE_CACHE];

	if (_hydration_js__WEBPACK_IMPORTED_MODULE_2__.hydrating || prev !== value) {
		var next_style_attr = (0,_shared_attributes_js__WEBPACK_IMPORTED_MODULE_0__.to_style)(value, next_styles);

		if (!_hydration_js__WEBPACK_IMPORTED_MODULE_2__.hydrating || next_style_attr !== dom.getAttribute('style')) {
			if (next_style_attr == null) {
				dom.removeAttribute('style');
			} else {
				dom.style.cssText = next_style_attr;
			}
		}

		/** @type {any} */ (dom)[_constants_js__WEBPACK_IMPORTED_MODULE_1__.STYLE_CACHE] = value;
	} else if (next_styles) {
		if (Array.isArray(next_styles)) {
			update_styles(dom, prev_styles?.[0], next_styles[0]);
			update_styles(dom, prev_styles?.[1], next_styles[1], 'important');
		} else {
			update_styles(dom, prev_styles, next_styles);
		}
	}

	return next_styles;
}


/***/ },

/***/ "./node_modules/svelte/src/internal/client/dom/elements/transitions.js"
/*!*****************************************************************************!*\
  !*** ./node_modules/svelte/src/internal/client/dom/elements/transitions.js ***!
  \*****************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   animation: () => (/* binding */ animation),
/* harmony export */   set_animation_effect_override: () => (/* binding */ set_animation_effect_override),
/* harmony export */   transition: () => (/* binding */ transition)
/* harmony export */ });
/* harmony import */ var _shared_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../shared/utils.js */ "./node_modules/svelte/src/internal/shared/utils.js");
/* harmony import */ var _reactivity_effects_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../reactivity/effects.js */ "./node_modules/svelte/src/internal/client/reactivity/effects.js");
/* harmony import */ var _runtime_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../runtime.js */ "./node_modules/svelte/src/internal/client/runtime.js");
/* harmony import */ var _loop_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../loop.js */ "./node_modules/svelte/src/internal/client/loop.js");
/* harmony import */ var _render_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../render.js */ "./node_modules/svelte/src/internal/client/render.js");
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../constants.js */ "./node_modules/svelte/src/constants.js");
/* harmony import */ var _client_constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! #client/constants */ "./node_modules/svelte/src/internal/client/constants.js");
/* harmony import */ var _task_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../task.js */ "./node_modules/svelte/src/internal/client/dom/task.js");
/* harmony import */ var _bindings_shared_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./bindings/shared.js */ "./node_modules/svelte/src/internal/client/dom/elements/bindings/shared.js");
/** @import { AnimateFn, Animation, AnimationConfig, EachItem, Effect, EffectNodes, TransitionFn, TransitionManager } from '#client' */










/**
 * @param {Element} element
 * @param {'introstart' | 'introend' | 'outrostart' | 'outroend'} type
 * @returns {void}
 */
function dispatch_event(element, type) {
	(0,_bindings_shared_js__WEBPACK_IMPORTED_MODULE_8__.without_reactive_context)(() => {
		element.dispatchEvent(new CustomEvent(type));
	});
}

/**
 * Converts a property to the camel-case format expected by Element.animate(), KeyframeEffect(), and KeyframeEffect.setKeyframes().
 * @param {string} style
 * @returns {string}
 */
function css_property_to_camelcase(style) {
	// in compliance with spec
	if (style === 'float') return 'cssFloat';
	if (style === 'offset') return 'cssOffset';

	// do not rename custom @properties
	if (style.startsWith('--')) return style;

	const parts = style.split('-');
	if (parts.length === 1) return parts[0];
	return (
		parts[0] +
		parts
			.slice(1)
			.map(/** @param {any} word */ (word) => word[0].toUpperCase() + word.slice(1))
			.join('')
	);
}

/**
 * @param {string} css
 * @returns {Keyframe}
 */
function css_to_keyframe(css) {
	/** @type {Keyframe} */
	const keyframe = {};
	const parts = css.split(';');
	for (const part of parts) {
		const [property, value] = part.split(':');
		if (!property || value === undefined) break;

		const formatted_property = css_property_to_camelcase(property.trim());
		keyframe[formatted_property] = value.trim();
	}
	return keyframe;
}

/** @param {number} t */
const linear = (t) => t;

/** @type {Effect | null} */
let animation_effect_override = null;

/** @param {Effect | null} v */
function set_animation_effect_override(v) {
	animation_effect_override = v;
}

/**
 * Called inside keyed `{#each ...}` blocks (as `$.animation(...)`). This creates an animation manager
 * and attaches it to the block, so that moves can be animated following reconciliation.
 * @template P
 * @param {Element} element
 * @param {() => AnimateFn<P | undefined>} get_fn
 * @param {(() => P) | null} get_params
 */
function animation(element, get_fn, get_params) {
	var effect = animation_effect_override ?? /** @type {Effect} */ (_runtime_js__WEBPACK_IMPORTED_MODULE_2__.active_effect);
	var nodes = /** @type {EffectNodes} */ (effect.nodes);

	/** @type {DOMRect} */
	var from;

	/** @type {DOMRect} */
	var to;

	/** @type {Animation | undefined} */
	var animation;

	/** @type {null | { position: string, width: string, height: string, transform: string }} */
	var original_styles = null;

	nodes.a ??= {
		element,
		measure() {
			from = this.element.getBoundingClientRect();
		},
		apply() {
			animation?.abort();

			to = this.element.getBoundingClientRect();

			if (
				from.left !== to.left ||
				from.right !== to.right ||
				from.top !== to.top ||
				from.bottom !== to.bottom
			) {
				const options = get_fn()(this.element, { from, to }, get_params?.());

				animation = animate(
					this.element,
					options,
					undefined,
					1,
					() => {},
					() => {
						animation?.abort();
						animation = undefined;
					}
				);
			}
		},
		fix() {
			// If an animation is already running, transforming the element is likely to fail,
			// because the styles applied by the animation take precedence. In the case of crossfade,
			// that means the `translate(...)` of the crossfade transition overrules the `translate(...)`
			// we would apply below, leading to the element jumping somewhere to the top left.
			if (element.getAnimations().length) return;

			// It's important to destructure these to get fixed values - the object itself has getters,
			// and changing the style to 'absolute' can for example influence the width.
			var { position, width, height } = getComputedStyle(element);

			if (position !== 'absolute' && position !== 'fixed') {
				var style = /** @type {HTMLElement | SVGElement} */ (element).style;

				original_styles = {
					position: style.position,
					width: style.width,
					height: style.height,
					transform: style.transform
				};

				style.position = 'absolute';
				style.width = width;
				style.height = height;
				var to = element.getBoundingClientRect();

				if (from.left !== to.left || from.top !== to.top) {
					var transform = `translate(${from.left - to.left}px, ${from.top - to.top}px)`;
					style.transform = style.transform ? `${style.transform} ${transform}` : transform;
				}
			}
		},
		unfix() {
			if (original_styles) {
				var style = /** @type {HTMLElement | SVGElement} */ (element).style;

				style.position = original_styles.position;
				style.width = original_styles.width;
				style.height = original_styles.height;
				style.transform = original_styles.transform;
			}
		}
	};

	// in the case of a `<svelte:element>`, it's possible for `$.animation(...)` to be called
	// when an animation manager already exists, if the tag changes. in that case, we need to
	// swap out the element rather than creating a new manager, in case it happened at the same
	// moment as a reconciliation
	nodes.a.element = element;
}

/**
 * Called inside block effects as `$.transition(...)`. This creates a transition manager and
 * attaches it to the current effect — later, inside `pause_effect` and `resume_effect`, we
 * use this to create `intro` and `outro` transitions.
 * @template P
 * @param {number} flags
 * @param {HTMLElement} element
 * @param {() => TransitionFn<P | undefined>} get_fn
 * @param {(() => P) | null} get_params
 * @returns {void}
 */
function transition(flags, element, get_fn, get_params) {
	var is_intro = (flags & _constants_js__WEBPACK_IMPORTED_MODULE_5__.TRANSITION_IN) !== 0;
	var is_outro = (flags & _constants_js__WEBPACK_IMPORTED_MODULE_5__.TRANSITION_OUT) !== 0;
	var is_both = is_intro && is_outro;
	var is_global = (flags & _constants_js__WEBPACK_IMPORTED_MODULE_5__.TRANSITION_GLOBAL) !== 0;

	/** @type {'in' | 'out' | 'both'} */
	var direction = is_both ? 'both' : is_intro ? 'in' : 'out';

	/** @type {AnimationConfig | ((opts: { direction: 'in' | 'out' }) => AnimationConfig) | undefined} */
	var current_options;

	var inert = element.inert;

	/**
	 * The default overflow style, stashed so we can revert changes during the transition
	 * that are necessary to work around a Safari <18 bug
	 * TODO 6.0 remove this, if older versions of Safari have died out enough
	 */
	var overflow = element.style.overflow;

	/** @type {Animation | undefined} */
	var intro;

	/** @type {Animation | undefined} */
	var outro;

	function get_options() {
		return (0,_bindings_shared_js__WEBPACK_IMPORTED_MODULE_8__.without_reactive_context)(() => {
			// If a transition is still ongoing, we use the existing options rather than generating
			// new ones. This ensures that reversible transitions reverse smoothly, rather than
			// jumping to a new spot because (for example) a different `duration` was used
			return (current_options ??= get_fn()(element, get_params?.() ?? /** @type {P} */ ({}), {
				direction
			}));
		});
	}

	/** @type {TransitionManager} */
	var transition = {
		is_global,
		in() {
			element.inert = inert;

			if (!is_intro) {
				outro?.abort();
				outro?.reset?.();
				return;
			}

			if (!is_outro) {
				// if we intro then outro then intro again, we want to abort the first intro,
				// if it's not a bidirectional transition
				intro?.abort();
			}

			intro = animate(
				element,
				get_options(),
				outro,
				1,
				() => {
					dispatch_event(element, 'introstart');
				},
				() => {
					dispatch_event(element, 'introend');

					// Ensure we cancel the animation to prevent leaking
					intro?.abort();
					intro = current_options = undefined;

					element.style.overflow = overflow;
				}
			);
		},
		out(fn) {
			if (!is_outro) {
				fn?.();
				current_options = undefined;
				return;
			}

			element.inert = true;

			outro = animate(
				element,
				get_options(),
				intro,
				0,
				() => {
					dispatch_event(element, 'outrostart');
				},
				() => {
					dispatch_event(element, 'outroend');
					fn?.();
				}
			);
		},
		stop: () => {
			intro?.abort();
			outro?.abort();
		}
	};

	var e = /** @type {Effect & { nodes: EffectNodes }} */ (_runtime_js__WEBPACK_IMPORTED_MODULE_2__.active_effect);

	(e.nodes.t ??= []).push(transition);

	// if this is a local transition, we only want to run it if the parent (branch) effect's
	// parent (block) effect is where the state change happened. we can determine that by
	// looking at whether the block effect is currently initializing
	if (is_intro && _render_js__WEBPACK_IMPORTED_MODULE_4__.should_intro) {
		var run = is_global;

		if (!run) {
			var block = /** @type {Effect | null} */ (e.parent);

			// skip over transparent blocks (e.g. snippets, else-if blocks)
			while (block && (block.f & _client_constants__WEBPACK_IMPORTED_MODULE_6__.EFFECT_TRANSPARENT) !== 0) {
				while ((block = block.parent)) {
					if ((block.f & _client_constants__WEBPACK_IMPORTED_MODULE_6__.BLOCK_EFFECT) !== 0) break;
				}
			}

			run = !block || (block.f & _client_constants__WEBPACK_IMPORTED_MODULE_6__.REACTION_RAN) !== 0;
		}

		if (run) {
			(0,_reactivity_effects_js__WEBPACK_IMPORTED_MODULE_1__.effect)(() => {
				(0,_runtime_js__WEBPACK_IMPORTED_MODULE_2__.untrack)(() => transition.in());
			});
		}
	}
}

/**
 * Animates an element, according to the provided configuration
 * @param {Element} element
 * @param {AnimationConfig | ((opts: { direction: 'in' | 'out' }) => AnimationConfig)} options
 * @param {Animation | undefined} counterpart The corresponding intro/outro to this outro/intro
 * @param {number} t2 The target `t` value — `1` for intro, `0` for outro
 * @param {(() => void)} on_begin Called just before beginning the animation
 * @param {(() => void)} on_finish Called after successfully completing the animation
 * @returns {Animation}
 */
function animate(element, options, counterpart, t2, on_begin, on_finish) {
	var is_intro = t2 === 1;
	var aborted = false;

	if ((0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_0__.is_function)(options)) {
		// In the case of a deferred transition (such as `crossfade`), `option` will be
		// a function rather than an `AnimationConfig`. We need to call this function
		// once the DOM has been updated...
		/** @type {Animation} */
		var a;

		(0,_task_js__WEBPACK_IMPORTED_MODULE_7__.queue_micro_task)(() => {
			if (aborted) return;
			var o = options({ direction: is_intro ? 'in' : 'out' });
			a = animate(element, o, counterpart, t2, on_begin, on_finish);
		});

		// ...but we want to do so without using `async`/`await` everywhere, so
		// we return a facade that allows everything to remain synchronous
		return {
			abort: () => {
				aborted = true;
				a?.abort();
			},
			deactivate: () => a.deactivate(),
			reset: () => a.reset(),
			t: () => a.t()
		};
	}

	counterpart?.deactivate();

	if (!options?.duration && !options?.delay) {
		on_begin();
		on_finish();

		return {
			abort: _shared_utils_js__WEBPACK_IMPORTED_MODULE_0__.noop,
			deactivate: _shared_utils_js__WEBPACK_IMPORTED_MODULE_0__.noop,
			reset: _shared_utils_js__WEBPACK_IMPORTED_MODULE_0__.noop,
			t: () => t2
		};
	}

	const { delay = 0, css, tick, easing = linear } = options;

	/** @type {globalThis.Animation} */
	var animation;

	var get_t = () => 1 - t2;

	// wait a microtask before applying the initial styles and creating the dummy animation,
	// so that transitions created in the same batch (e.g. on nested elements) all measure
	// the DOM first (#18421). this still happens before the next paint, so the element
	// won't be rendered without styles applied (#14732)
	(0,_task_js__WEBPACK_IMPORTED_MODULE_7__.queue_micro_task)(() => {
		if (aborted) return;

		var keyframes = [];

		if (is_intro && counterpart === undefined) {
			if (tick) {
				tick(0, 1); // TODO put in nested effect, to avoid interleaved reads/writes?
			}

			if (css) {
				var styles = css_to_keyframe(css(0, 1));
				keyframes.push(styles, styles);
			}
		}

		// create a dummy animation that lasts as long as the delay (but with whatever devtools
		// multiplier is in effect). in the common case that it is `0`, we keep it anyway so that
		// the CSS keyframes aren't created until the DOM is updated
		//
		// fill forwards to prevent the element from rendering without styles applied
		// see https://github.com/sveltejs/svelte/issues/14732
		animation = element.animate(keyframes, { duration: delay, fill: 'forwards' });

		animation.onfinish = () => {
			// remove dummy animation from the stack to prevent conflict with main animation
			animation.cancel();

			on_begin();

			// for bidirectional transitions, we start from the current position,
			// rather than doing a full intro/outro
			var t1 = counterpart?.t() ?? 1 - t2;
			counterpart?.abort();

			var delta = t2 - t1;
			var duration = /** @type {number} */ (options.duration) * Math.abs(delta);
			var keyframes = [];

			if (duration > 0) {
				/**
				 * Whether or not the CSS includes `overflow: hidden`, in which case we need to
				 * add it as an inline style to work around a Safari <18 bug
				 * TODO 6.0 remove this, if possible
				 */
				var needs_overflow_hidden = false;

				if (css) {
					var n = Math.ceil(duration / (1000 / 60)); // `n` must be an integer, or we risk missing the `t2` value

					for (var i = 0; i <= n; i += 1) {
						var t = t1 + delta * easing(i / n);
						var styles = css_to_keyframe(css(t, 1 - t));
						keyframes.push(styles);

						needs_overflow_hidden ||= styles.overflow === 'hidden';
					}
				}

				if (needs_overflow_hidden) {
					/** @type {HTMLElement} */ (element).style.overflow = 'hidden';
				}

				get_t = () => {
					var time = /** @type {number} */ (
						/** @type {globalThis.Animation} */ (animation).currentTime
					);

					return t1 + delta * easing(time / duration);
				};

				if (tick) {
					(0,_loop_js__WEBPACK_IMPORTED_MODULE_3__.loop)(() => {
						if (animation.playState !== 'running') return false;

						var t = get_t();
						tick(t, 1 - t);

						return true;
					});
				}
			}

			animation = element.animate(keyframes, { duration, fill: 'forwards' });

			animation.onfinish = () => {
				get_t = () => t2;
				tick?.(t2, 1 - t2);
				on_finish();
			};
		};
	});

	return {
		abort: () => {
			aborted = true;

			if (animation) {
				animation.cancel();
				// This prevents memory leaks in Chromium
				animation.effect = null;
				// This prevents onfinish to be launched after cancel(),
				// which can happen in some rare cases
				// see https://github.com/sveltejs/svelte/issues/13681
				animation.onfinish = _shared_utils_js__WEBPACK_IMPORTED_MODULE_0__.noop;
			}
		},
		deactivate: () => {
			on_finish = _shared_utils_js__WEBPACK_IMPORTED_MODULE_0__.noop;
		},
		reset: () => {
			if (t2 === 0) {
				tick?.(1, 0);
			}
		},
		t: () => get_t()
	};
}


/***/ },

/***/ "./node_modules/svelte/src/internal/client/dom/hydration.js"
/*!******************************************************************!*\
  !*** ./node_modules/svelte/src/internal/client/dom/hydration.js ***!
  \******************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   hydrate_next: () => (/* binding */ hydrate_next),
/* harmony export */   hydrate_node: () => (/* binding */ hydrate_node),
/* harmony export */   hydrate_template: () => (/* binding */ hydrate_template),
/* harmony export */   hydrating: () => (/* binding */ hydrating),
/* harmony export */   next: () => (/* binding */ next),
/* harmony export */   read_hydration_instruction: () => (/* binding */ read_hydration_instruction),
/* harmony export */   reset: () => (/* binding */ reset),
/* harmony export */   set_hydrate_node: () => (/* binding */ set_hydrate_node),
/* harmony export */   set_hydrating: () => (/* binding */ set_hydrating),
/* harmony export */   skip_nodes: () => (/* binding */ skip_nodes)
/* harmony export */ });
/* harmony import */ var _client_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! #client/constants */ "./node_modules/svelte/src/internal/client/constants.js");
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../constants.js */ "./node_modules/svelte/src/constants.js");
/* harmony import */ var _warnings_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../warnings.js */ "./node_modules/svelte/src/internal/client/warnings.js");
/* harmony import */ var _operations_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./operations.js */ "./node_modules/svelte/src/internal/client/dom/operations.js");
/** @import { TemplateNode } from '#client' */






/**
 * Use this variable to guard everything related to hydration code so it can be treeshaken out
 * if the user doesn't use the `hydrate` method and these code paths are therefore not needed.
 */
let hydrating = false;

/** @param {boolean} value */
function set_hydrating(value) {
	hydrating = value;
}

/**
 * The node that is currently being hydrated. This starts out as the first node inside the opening
 * <!--[--> comment, and updates each time a component calls `$.child(...)` or `$.sibling(...)`.
 * When entering a block (e.g. `{#if ...}`), `hydrate_node` is the block opening comment; by the
 * time we leave the block it is the closing comment, which serves as the block's anchor.
 * @type {TemplateNode}
 */
let hydrate_node;

/** @param {TemplateNode | null} node */
function set_hydrate_node(node) {
	if (node === null) {
		_warnings_js__WEBPACK_IMPORTED_MODULE_2__.hydration_mismatch();
		throw _constants_js__WEBPACK_IMPORTED_MODULE_1__.HYDRATION_ERROR;
	}

	return (hydrate_node = node);
}

function hydrate_next() {
	return set_hydrate_node((0,_operations_js__WEBPACK_IMPORTED_MODULE_3__.get_next_sibling)(hydrate_node));
}

/** @param {TemplateNode} node */
function reset(node) {
	if (!hydrating) return;

	// If the node has remaining siblings, something has gone wrong
	if ((0,_operations_js__WEBPACK_IMPORTED_MODULE_3__.get_next_sibling)(hydrate_node) !== null) {
		_warnings_js__WEBPACK_IMPORTED_MODULE_2__.hydration_mismatch();
		throw _constants_js__WEBPACK_IMPORTED_MODULE_1__.HYDRATION_ERROR;
	}

	hydrate_node = node;
}

/**
 * @param {HTMLTemplateElement} template
 */
function hydrate_template(template) {
	if (hydrating) {
		// @ts-expect-error TemplateNode doesn't include DocumentFragment, but it's actually fine
		hydrate_node = template.content;
	}
}

function next(count = 1) {
	if (hydrating) {
		var i = count;
		var node = hydrate_node;

		while (i--) {
			node = /** @type {TemplateNode} */ ((0,_operations_js__WEBPACK_IMPORTED_MODULE_3__.get_next_sibling)(node));
		}

		hydrate_node = node;
	}
}

/**
 * Skips or removes (depending on {@link remove}) all nodes starting at `hydrate_node` up until the next hydration end comment
 * @param {boolean} remove
 */
function skip_nodes(remove = true) {
	var depth = 0;
	var node = hydrate_node;

	while (true) {
		if (node.nodeType === _client_constants__WEBPACK_IMPORTED_MODULE_0__.COMMENT_NODE) {
			var data = /** @type {Comment} */ (node).data;

			if (data === _constants_js__WEBPACK_IMPORTED_MODULE_1__.HYDRATION_END) {
				if (depth === 0) return node;
				depth -= 1;
			} else if (
				data === _constants_js__WEBPACK_IMPORTED_MODULE_1__.HYDRATION_START ||
				data === _constants_js__WEBPACK_IMPORTED_MODULE_1__.HYDRATION_START_ELSE ||
				// "[1", "[2", etc. for if blocks
				(data[0] === '[' && !isNaN(Number(data.slice(1))))
			) {
				depth += 1;
			}
		}

		var next = /** @type {TemplateNode} */ ((0,_operations_js__WEBPACK_IMPORTED_MODULE_3__.get_next_sibling)(node));
		if (remove) node.remove();
		node = next;
	}
}

/**
 *
 * @param {TemplateNode} node
 */
function read_hydration_instruction(node) {
	if (!node || node.nodeType !== _client_constants__WEBPACK_IMPORTED_MODULE_0__.COMMENT_NODE) {
		_warnings_js__WEBPACK_IMPORTED_MODULE_2__.hydration_mismatch();
		throw _constants_js__WEBPACK_IMPORTED_MODULE_1__.HYDRATION_ERROR;
	}

	return /** @type {Comment} */ (node).data;
}


/***/ },

/***/ "./node_modules/svelte/src/internal/client/dom/legacy/event-modifiers.js"
/*!*******************************************************************************!*\
  !*** ./node_modules/svelte/src/internal/client/dom/legacy/event-modifiers.js ***!
  \*******************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   nonpassive: () => (/* binding */ nonpassive),
/* harmony export */   once: () => (/* binding */ once),
/* harmony export */   passive: () => (/* binding */ passive),
/* harmony export */   preventDefault: () => (/* binding */ preventDefault),
/* harmony export */   self: () => (/* binding */ self),
/* harmony export */   stopImmediatePropagation: () => (/* binding */ stopImmediatePropagation),
/* harmony export */   stopPropagation: () => (/* binding */ stopPropagation),
/* harmony export */   trusted: () => (/* binding */ trusted)
/* harmony export */ });
/* harmony import */ var _shared_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../shared/utils.js */ "./node_modules/svelte/src/internal/shared/utils.js");
/* harmony import */ var _reactivity_effects_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../reactivity/effects.js */ "./node_modules/svelte/src/internal/client/reactivity/effects.js");
/* harmony import */ var _elements_events_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../elements/events.js */ "./node_modules/svelte/src/internal/client/dom/elements/events.js");




/**
 * Substitute for the `trusted` event modifier
 * @deprecated
 * @param {(event: Event, ...args: Array<unknown>) => void} fn
 * @returns {(event: Event, ...args: unknown[]) => void}
 */
function trusted(fn) {
	return function (...args) {
		var event = /** @type {Event} */ (args[0]);
		if (event.isTrusted) {
			// @ts-ignore
			fn?.apply(this, args);
		}
	};
}

/**
 * Substitute for the `self` event modifier
 * @deprecated
 * @param {(event: Event, ...args: Array<unknown>) => void} fn
 * @returns {(event: Event, ...args: unknown[]) => void}
 */
function self(fn) {
	return function (...args) {
		var event = /** @type {Event} */ (args[0]);
		// @ts-ignore
		if (event.target === this) {
			// @ts-ignore
			fn?.apply(this, args);
		}
	};
}

/**
 * Substitute for the `stopPropagation` event modifier
 * @deprecated
 * @param {(event: Event, ...args: Array<unknown>) => void} fn
 * @returns {(event: Event, ...args: unknown[]) => void}
 */
function stopPropagation(fn) {
	return function (...args) {
		var event = /** @type {Event} */ (args[0]);
		event.stopPropagation();
		// @ts-ignore
		return fn?.apply(this, args);
	};
}

/**
 * Substitute for the `once` event modifier
 * @deprecated
 * @param {(event: Event, ...args: Array<unknown>) => void} fn
 * @returns {(event: Event, ...args: unknown[]) => void}
 */
function once(fn) {
	var ran = false;

	return function (...args) {
		if (ran) return;
		ran = true;

		// @ts-ignore
		return fn?.apply(this, args);
	};
}

/**
 * Substitute for the `stopImmediatePropagation` event modifier
 * @deprecated
 * @param {(event: Event, ...args: Array<unknown>) => void} fn
 * @returns {(event: Event, ...args: unknown[]) => void}
 */
function stopImmediatePropagation(fn) {
	return function (...args) {
		var event = /** @type {Event} */ (args[0]);
		event.stopImmediatePropagation();
		// @ts-ignore
		return fn?.apply(this, args);
	};
}

/**
 * Substitute for the `preventDefault` event modifier
 * @deprecated
 * @param {(event: Event, ...args: Array<unknown>) => void} fn
 * @returns {(event: Event, ...args: unknown[]) => void}
 */
function preventDefault(fn) {
	return function (...args) {
		var event = /** @type {Event} */ (args[0]);
		event.preventDefault();
		// @ts-ignore
		return fn?.apply(this, args);
	};
}

/**
 * Substitute for the `passive` event modifier, implemented as an action
 * @deprecated
 * @param {HTMLElement} node
 * @param {[event: string, handler: () => EventListener]} options
 */
function passive(node, [event, handler]) {
	;(0,_reactivity_effects_js__WEBPACK_IMPORTED_MODULE_1__.user_pre_effect)(() => {
		return (0,_elements_events_js__WEBPACK_IMPORTED_MODULE_2__.on)(node, event, handler() ?? _shared_utils_js__WEBPACK_IMPORTED_MODULE_0__.noop, {
			passive: true
		});
	});
}

/**
 * Substitute for the `nonpassive` event modifier, implemented as an action
 * @deprecated
 * @param {HTMLElement} node
 * @param {[event: string, handler: () => EventListener]} options
 */
function nonpassive(node, [event, handler]) {
	;(0,_reactivity_effects_js__WEBPACK_IMPORTED_MODULE_1__.user_pre_effect)(() => {
		return (0,_elements_events_js__WEBPACK_IMPORTED_MODULE_2__.on)(node, event, handler() ?? _shared_utils_js__WEBPACK_IMPORTED_MODULE_0__.noop, {
			passive: false
		});
	});
}


/***/ },

/***/ "./node_modules/svelte/src/internal/client/dom/legacy/lifecycle.js"
/*!*************************************************************************!*\
  !*** ./node_modules/svelte/src/internal/client/dom/legacy/lifecycle.js ***!
  \*************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   init: () => (/* binding */ init)
/* harmony export */ });
/* harmony import */ var _shared_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../shared/utils.js */ "./node_modules/svelte/src/internal/shared/utils.js");
/* harmony import */ var _context_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../context.js */ "./node_modules/svelte/src/internal/client/context.js");
/* harmony import */ var _reactivity_deriveds_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../reactivity/deriveds.js */ "./node_modules/svelte/src/internal/client/reactivity/deriveds.js");
/* harmony import */ var _reactivity_effects_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../reactivity/effects.js */ "./node_modules/svelte/src/internal/client/reactivity/effects.js");
/* harmony import */ var _runtime_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../runtime.js */ "./node_modules/svelte/src/internal/client/runtime.js");
/** @import { ComponentContextLegacy } from '#client' */






/**
 * Legacy-mode only: Call `onMount` callbacks and set up `beforeUpdate`/`afterUpdate` effects
 * @param {boolean} [immutable]
 */
function init(immutable = false) {
	const context = /** @type {ComponentContextLegacy} */ (_context_js__WEBPACK_IMPORTED_MODULE_1__.component_context);

	const callbacks = context.l.u;
	if (!callbacks) return;

	let props = () => (0,_runtime_js__WEBPACK_IMPORTED_MODULE_4__.deep_read_state)(context.s);

	if (immutable) {
		let version = 0;
		let prev = /** @type {Record<string, any>} */ ({});

		// In legacy immutable mode, before/afterUpdate only fire if the object identity of a prop changes
		const d = (0,_reactivity_deriveds_js__WEBPACK_IMPORTED_MODULE_2__.derived)(() => {
			let changed = false;
			const props = context.s;
			for (const key in props) {
				if (props[key] !== prev[key]) {
					prev[key] = props[key];
					changed = true;
				}
			}
			if (changed) version++;
			return version;
		});

		props = () => (0,_runtime_js__WEBPACK_IMPORTED_MODULE_4__.get)(d);
	}

	// beforeUpdate
	if (callbacks.b.length) {
		(0,_reactivity_effects_js__WEBPACK_IMPORTED_MODULE_3__.user_pre_effect)(() => {
			observe_all(context, props);
			(0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_0__.run_all)(callbacks.b);
		});
	}

	// onMount (must run before afterUpdate)
	;(0,_reactivity_effects_js__WEBPACK_IMPORTED_MODULE_3__.user_effect)(() => {
		const fns = (0,_runtime_js__WEBPACK_IMPORTED_MODULE_4__.untrack)(() => callbacks.m.map(_shared_utils_js__WEBPACK_IMPORTED_MODULE_0__.run));
		return () => {
			for (const fn of fns) {
				if (typeof fn === 'function') {
					fn();
				}
			}
		};
	});

	// afterUpdate
	if (callbacks.a.length) {
		(0,_reactivity_effects_js__WEBPACK_IMPORTED_MODULE_3__.user_effect)(() => {
			observe_all(context, props);
			(0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_0__.run_all)(callbacks.a);
		});
	}
}

/**
 * Invoke the getter of all signals associated with a component
 * so they can be registered to the effect this function is called in.
 * @param {ComponentContextLegacy} context
 * @param {(() => void)} props
 */
function observe_all(context, props) {
	if (context.l.s) {
		for (const signal of context.l.s) (0,_runtime_js__WEBPACK_IMPORTED_MODULE_4__.get)(signal);
	}

	props();
}


/***/ },

/***/ "./node_modules/svelte/src/internal/client/dom/legacy/misc.js"
/*!********************************************************************!*\
  !*** ./node_modules/svelte/src/internal/client/dom/legacy/misc.js ***!
  \********************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   add_legacy_event_listener: () => (/* binding */ add_legacy_event_listener),
/* harmony export */   bubble_event: () => (/* binding */ bubble_event),
/* harmony export */   reactive_import: () => (/* binding */ reactive_import),
/* harmony export */   update_legacy_props: () => (/* binding */ update_legacy_props)
/* harmony export */ });
/* harmony import */ var _reactivity_sources_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../reactivity/sources.js */ "./node_modules/svelte/src/internal/client/reactivity/sources.js");
/* harmony import */ var _runtime_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../runtime.js */ "./node_modules/svelte/src/internal/client/runtime.js");
/* harmony import */ var _shared_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../shared/utils.js */ "./node_modules/svelte/src/internal/shared/utils.js");




/**
 * Under some circumstances, imports may be reactive in legacy mode. In that case,
 * they should be using `reactive_import` as part of the transformation
 * @param {() => any} fn
 */
function reactive_import(fn) {
	var s = (0,_reactivity_sources_js__WEBPACK_IMPORTED_MODULE_0__.source)(0);

	return function () {
		if (arguments.length === 1) {
			(0,_reactivity_sources_js__WEBPACK_IMPORTED_MODULE_0__.set)(s, (0,_runtime_js__WEBPACK_IMPORTED_MODULE_1__.get)(s) + 1);
			return arguments[0];
		} else {
			(0,_runtime_js__WEBPACK_IMPORTED_MODULE_1__.get)(s);
			return fn();
		}
	};
}

/**
 * @this {any}
 * @param {Record<string, unknown>} $$props
 * @param {Event} event
 * @returns {void}
 */
function bubble_event($$props, event) {
	var events = /** @type {Record<string, Function[] | Function>} */ ($$props.$$events)?.[
		event.type
	];

	var callbacks = (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_2__.is_array)(events) ? events.slice() : events == null ? [] : [events];

	for (var fn of callbacks) {
		// Preserve "this" context
		fn.call(this, event);
	}
}

/**
 * Used to simulate `$on` on a component instance when `compatibility.componentApi === 4`
 * @param {Record<string, any>} $$props
 * @param {string} event_name
 * @param {Function} event_callback
 */
function add_legacy_event_listener($$props, event_name, event_callback) {
	$$props.$$events ||= {};
	$$props.$$events[event_name] ||= [];
	$$props.$$events[event_name].push(event_callback);
}

/**
 * Used to simulate `$set` on a component instance when `compatibility.componentApi === 4`.
 * Needs component accessors so that it can call the setter of the prop. Therefore doesn't
 * work for updating props in `$$props` or `$$restProps`.
 * @this {Record<string, any>}
 * @param {Record<string, any>} $$new_props
 */
function update_legacy_props($$new_props) {
	for (var key in $$new_props) {
		if (key in this) {
			this[key] = $$new_props[key];
		}
	}
}


/***/ },

/***/ "./node_modules/svelte/src/internal/client/dom/operations.js"
/*!*******************************************************************!*\
  !*** ./node_modules/svelte/src/internal/client/dom/operations.js ***!
  \*******************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $document: () => (/* binding */ $document),
/* harmony export */   $window: () => (/* binding */ $window),
/* harmony export */   child: () => (/* binding */ child),
/* harmony export */   clear_text_content: () => (/* binding */ clear_text_content),
/* harmony export */   create_comment: () => (/* binding */ create_comment),
/* harmony export */   create_element: () => (/* binding */ create_element),
/* harmony export */   create_fragment: () => (/* binding */ create_fragment),
/* harmony export */   create_text: () => (/* binding */ create_text),
/* harmony export */   first_child: () => (/* binding */ first_child),
/* harmony export */   get_first_child: () => (/* binding */ get_first_child),
/* harmony export */   get_next_sibling: () => (/* binding */ get_next_sibling),
/* harmony export */   init_operations: () => (/* binding */ init_operations),
/* harmony export */   is_firefox: () => (/* binding */ is_firefox),
/* harmony export */   merge_text_nodes: () => (/* binding */ merge_text_nodes),
/* harmony export */   only_child: () => (/* binding */ only_child),
/* harmony export */   set_attribute: () => (/* binding */ set_attribute),
/* harmony export */   should_defer_append: () => (/* binding */ should_defer_append),
/* harmony export */   sibling: () => (/* binding */ sibling)
/* harmony export */ });
/* harmony import */ var _hydration_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./hydration.js */ "./node_modules/svelte/src/internal/client/dom/hydration.js");
/* harmony import */ var esm_env__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! esm-env */ "./node_modules/esm-env/index.js");
/* harmony import */ var _dev_equality_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../dev/equality.js */ "./node_modules/svelte/src/internal/client/dev/equality.js");
/* harmony import */ var _shared_utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/utils.js */ "./node_modules/svelte/src/internal/shared/utils.js");
/* harmony import */ var _runtime_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../runtime.js */ "./node_modules/svelte/src/internal/client/runtime.js");
/* harmony import */ var _flags_index_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../flags/index.js */ "./node_modules/svelte/src/internal/flags/index.js");
/* harmony import */ var _client_constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! #client/constants */ "./node_modules/svelte/src/internal/client/constants.js");
/* harmony import */ var _reactivity_batch_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../reactivity/batch.js */ "./node_modules/svelte/src/internal/client/reactivity/batch.js");
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../constants.js */ "./node_modules/svelte/src/constants.js");
/** @import { Effect, TemplateNode } from '#client' */










// export these for reference in the compiled code, making global name deduplication unnecessary
/** @type {Window} */
var $window;

/** @type {Document} */
var $document;

/** @type {boolean} */
var is_firefox;

/** @type {() => Node | null} */
var first_child_getter;
/** @type {() => Node | null} */
var next_sibling_getter;

/**
 * Initialize these lazily to avoid issues when using the runtime in a server context
 * where these globals are not available while avoiding a separate server entry point
 */
function init_operations() {
	if ($window !== undefined) {
		return;
	}

	$window = window;
	$document = document;
	is_firefox = /Firefox/.test(navigator.userAgent);

	var element_prototype = Element.prototype;
	var node_prototype = Node.prototype;
	var text_prototype = Text.prototype;

	// @ts-ignore
	first_child_getter = (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_3__.get_descriptor)(node_prototype, 'firstChild').get;
	// @ts-ignore
	next_sibling_getter = (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_3__.get_descriptor)(node_prototype, 'nextSibling').get;

	if ((0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_3__.is_extensible)(element_prototype)) {
		// the following assignments improve perf of lookups on DOM nodes
		/** @type {any} */ (element_prototype)[_client_constants__WEBPACK_IMPORTED_MODULE_6__.CLASS_CACHE] = undefined;
		/** @type {any} */ (element_prototype)[_client_constants__WEBPACK_IMPORTED_MODULE_6__.ATTRIBUTES_CACHE] = null;
		/** @type {any} */ (element_prototype)[_client_constants__WEBPACK_IMPORTED_MODULE_6__.STYLE_CACHE] = undefined;
		// @ts-expect-error
		element_prototype.__e = undefined;
	}

	if ((0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_3__.is_extensible)(text_prototype)) {
		/** @type {any} */ (text_prototype)[_client_constants__WEBPACK_IMPORTED_MODULE_6__.TEXT_CACHE] = undefined;
	}

	if (esm_env__WEBPACK_IMPORTED_MODULE_1__.DEV) {
		// @ts-expect-error
		element_prototype.__svelte_meta = null;

		(0,_dev_equality_js__WEBPACK_IMPORTED_MODULE_2__.init_array_prototype_warnings)();
	}
}

/**
 * @param {string} value
 * @returns {Text}
 */
function create_text(value = '') {
	return document.createTextNode(value);
}

/**
 * @template {Node} N
 * @param {N} node
 */
/*@__NO_SIDE_EFFECTS__*/
function get_first_child(node) {
	return /** @type {TemplateNode | null} */ (first_child_getter.call(node));
}

/**
 * @template {Node} N
 * @param {N} node
 */
/*@__NO_SIDE_EFFECTS__*/
function get_next_sibling(node) {
	return /** @type {TemplateNode | null} */ (next_sibling_getter.call(node));
}

/**
 * Don't mark this as side-effect-free, hydration needs to walk all nodes
 * @template {Node} N
 * @param {N} node
 * @param {boolean} is_text
 * @returns {TemplateNode | null}
 */
function child(node, is_text) {
	if (!_hydration_js__WEBPACK_IMPORTED_MODULE_0__.hydrating) {
		return get_first_child(node);
	}

	var child = get_first_child(_hydration_js__WEBPACK_IMPORTED_MODULE_0__.hydrate_node);

	// Child can be null if we have an element with a single child, like `<p>{text}</p>`, where `text` is empty
	if (child === null) {
		child = _hydration_js__WEBPACK_IMPORTED_MODULE_0__.hydrate_node.appendChild(create_text());
	} else if (is_text && child.nodeType !== _client_constants__WEBPACK_IMPORTED_MODULE_6__.TEXT_NODE) {
		var text = create_text();
		child?.before(text);
		(0,_hydration_js__WEBPACK_IMPORTED_MODULE_0__.set_hydrate_node)(text);
		return text;
	}

	if (is_text) {
		merge_text_nodes(/** @type {Text} */ (child));
	}

	;(0,_hydration_js__WEBPACK_IMPORTED_MODULE_0__.set_hydrate_node)(child);
	return child;
}

/**
 * Don't mark this as side-effect-free, hydration needs to walk all nodes
 * @param {TemplateNode} node
 * @param {boolean} [is_text]
 * @returns {TemplateNode | null}
 */
function first_child(node, is_text = false) {
	if (!_hydration_js__WEBPACK_IMPORTED_MODULE_0__.hydrating) {
		var first = get_first_child(node);

		// TODO prevent user comments with the empty string when preserveComments is true
		if (first instanceof Comment && first.data === '') return get_next_sibling(first);

		return first;
	}

	if (is_text) {
		// if an {expression} is empty during SSR, there might be no
		// text node to hydrate — we must therefore create one
		if (_hydration_js__WEBPACK_IMPORTED_MODULE_0__.hydrate_node?.nodeType !== _client_constants__WEBPACK_IMPORTED_MODULE_6__.TEXT_NODE) {
			var text = create_text();

			_hydration_js__WEBPACK_IMPORTED_MODULE_0__.hydrate_node?.before(text);
			(0,_hydration_js__WEBPACK_IMPORTED_MODULE_0__.set_hydrate_node)(text);
			return text;
		}

		merge_text_nodes(/** @type {Text} */ (_hydration_js__WEBPACK_IMPORTED_MODULE_0__.hydrate_node));
	}

	return _hydration_js__WEBPACK_IMPORTED_MODULE_0__.hydrate_node;
}

/**
 * `child`, for the very common case of an element with exactly one child. Resetting the
 * hydration cursor is part of the same step, so the compiler doesn't have to emit a
 * separate `reset` call for every `<p>{text}</p>` in an app.
 * Don't mark this as side-effect-free, hydration needs to walk all nodes
 * @param {TemplateNode} node
 * @param {boolean} [is_text]
 * @returns {TemplateNode | null}
 */
function only_child(node, is_text = false) {
	if (!_hydration_js__WEBPACK_IMPORTED_MODULE_0__.hydrating) {
		return get_first_child(node);
	}

	var first = child(node, is_text);
	(0,_hydration_js__WEBPACK_IMPORTED_MODULE_0__.reset)(node);

	return first;
}

/**
 * Don't mark this as side-effect-free, hydration needs to walk all nodes
 * @param {TemplateNode} node
 * @param {number} count
 * @param {boolean} is_text
 * @returns {TemplateNode | null}
 */
function sibling(node, count = 1, is_text = false) {
	let next_sibling = _hydration_js__WEBPACK_IMPORTED_MODULE_0__.hydrating ? _hydration_js__WEBPACK_IMPORTED_MODULE_0__.hydrate_node : node;
	var last_sibling;

	while (count--) {
		last_sibling = next_sibling;
		next_sibling = /** @type {TemplateNode} */ (get_next_sibling(next_sibling));
	}

	if (!_hydration_js__WEBPACK_IMPORTED_MODULE_0__.hydrating) {
		return next_sibling;
	}

	if (is_text) {
		// if a sibling {expression} is empty during SSR, there might be no
		// text node to hydrate — we must therefore create one
		if (next_sibling?.nodeType !== _client_constants__WEBPACK_IMPORTED_MODULE_6__.TEXT_NODE) {
			var text = create_text();
			// If the next sibling is `null` and we're handling text then it's because
			// the SSR content was empty for the text, so we need to generate a new text
			// node and insert it after the last sibling
			if (next_sibling === null) {
				last_sibling?.after(text);
			} else {
				next_sibling.before(text);
			}
			;(0,_hydration_js__WEBPACK_IMPORTED_MODULE_0__.set_hydrate_node)(text);
			return text;
		}

		merge_text_nodes(/** @type {Text} */ (next_sibling));
	}

	;(0,_hydration_js__WEBPACK_IMPORTED_MODULE_0__.set_hydrate_node)(next_sibling);
	return next_sibling;
}

/**
 * @template {Node} N
 * @param {N} node
 * @returns {void}
 */
function clear_text_content(node) {
	node.textContent = '';
}

/**
 * Returns `true` if we're updating the current block, for example `condition` in
 * an `{#if condition}` block just changed. In this case, the branch should be
 * appended (or removed) at the same time as other updates within the
 * current `<svelte:boundary>`
 */
function should_defer_append() {
	if (!_flags_index_js__WEBPACK_IMPORTED_MODULE_5__.async_mode_flag) return false;
	if (_reactivity_batch_js__WEBPACK_IMPORTED_MODULE_7__.eager_block_effects !== null) return false;

	var flags = /** @type {Effect} */ (_runtime_js__WEBPACK_IMPORTED_MODULE_4__.active_effect).f;
	return (flags & _client_constants__WEBPACK_IMPORTED_MODULE_6__.REACTION_RAN) !== 0;
}

/**
 * Branching here is intentional and load-bearing for perf. `createElement(tag)`
 * hits a fast path in Blink that `createElementNS(NAMESPACE_HTML, tag)` doesn't,
 * and passing an explicit `undefined` as the trailing options arg measurably
 * slows both APIs. Funnelling every case through a single `createElementNS(ns,
 * tag, options)` call would be smaller but slower on the HTML path.
 *
 * @template {keyof HTMLElementTagNameMap | string} T
 * @param {T} tag
 * @param {string} [namespace]
 * @param {string} [is]
 * @returns {T extends keyof HTMLElementTagNameMap ? HTMLElementTagNameMap[T] : Element}
 */
function create_element(tag, namespace, is) {
	if (namespace == null || namespace === _constants_js__WEBPACK_IMPORTED_MODULE_8__.NAMESPACE_HTML) {
		return /** @type {T extends keyof HTMLElementTagNameMap ? HTMLElementTagNameMap[T] : Element} */ (
			is ? document.createElement(tag, { is }) : document.createElement(tag)
		);
	}
	return /** @type {T extends keyof HTMLElementTagNameMap ? HTMLElementTagNameMap[T] : Element} */ (
		is ? document.createElementNS(namespace, tag, { is }) : document.createElementNS(namespace, tag)
	);
}

function create_fragment() {
	return document.createDocumentFragment();
}

/**
 * @param {string} data
 * @returns
 */
function create_comment(data = '') {
	return document.createComment(data);
}

/**
 * @param {Element} element
 * @param {string} key
 * @param {string} value
 * @returns
 */
function set_attribute(element, key, value = '') {
	if (key.startsWith('xlink:')) {
		element.setAttributeNS('http://www.w3.org/1999/xlink', key, value);
		return;
	}
	return element.setAttribute(key, value);
}

/**
 * Browsers split text nodes larger than 65536 bytes when parsing.
 * For hydration to succeed, we need to stitch them back together
 * @param {Text} text
 */
function merge_text_nodes(text) {
	if (/** @type {string} */ (text.nodeValue).length < 65536) {
		return;
	}

	let next = text.nextSibling;

	while (next !== null && next.nodeType === _client_constants__WEBPACK_IMPORTED_MODULE_6__.TEXT_NODE) {
		next.remove();

		/** @type {string} */ (text.nodeValue) += /** @type {string} */ (next.nodeValue);

		next = text.nextSibling;
	}
}


/***/ },

/***/ "./node_modules/svelte/src/internal/client/dom/reconciler.js"
/*!*******************************************************************!*\
  !*** ./node_modules/svelte/src/internal/client/dom/reconciler.js ***!
  \*******************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   create_fragment_from_html: () => (/* binding */ create_fragment_from_html),
/* harmony export */   create_trusted_html: () => (/* binding */ create_trusted_html)
/* harmony export */ });
/* harmony import */ var _operations_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./operations.js */ "./node_modules/svelte/src/internal/client/dom/operations.js");


const policy =
	// We gotta write it like this because after downleveling the pure comment may end up in the wrong location
	globalThis?.window?.trustedTypes &&
	/* @__PURE__ */ globalThis.window.trustedTypes.createPolicy('svelte-trusted-html', {
		/** @param {string} html */
		createHTML: (html) => {
			return html;
		}
	});

/** @param {string} html */
function create_trusted_html(html) {
	return /** @type {string} */ (policy?.createHTML(html) ?? html);
}

/**
 * @param {string} html
 */
function create_fragment_from_html(html) {
	var elem = (0,_operations_js__WEBPACK_IMPORTED_MODULE_0__.create_element)('template');
	elem.innerHTML = create_trusted_html(html.replaceAll('<!>', '<!---->')); // XHTML compliance
	return elem.content;
}


/***/ },

/***/ "./node_modules/svelte/src/internal/client/dom/task.js"
/*!*************************************************************!*\
  !*** ./node_modules/svelte/src/internal/client/dom/task.js ***!
  \*************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   flush_tasks: () => (/* binding */ flush_tasks),
/* harmony export */   queue_micro_task: () => (/* binding */ queue_micro_task)
/* harmony export */ });
/* harmony import */ var _shared_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/utils.js */ "./node_modules/svelte/src/internal/shared/utils.js");
/* harmony import */ var _reactivity_batch_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../reactivity/batch.js */ "./node_modules/svelte/src/internal/client/reactivity/batch.js");



/** @type {Array<() => void>} */
let micro_tasks = [];

function run_micro_tasks() {
	var tasks = micro_tasks;
	micro_tasks = [];
	(0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_0__.run_all)(tasks);
}

/**
 * @param {() => void} fn
 */
function queue_micro_task(fn) {
	if (micro_tasks.length === 0 && !_reactivity_batch_js__WEBPACK_IMPORTED_MODULE_1__.is_flushing_sync) {
		var tasks = micro_tasks;
		queueMicrotask(() => {
			// If this is false, a flushSync happened in the meantime. Do _not_ run new scheduled microtasks in that case
			// as the ordering of microtasks would be broken at that point - consider this case:
			// - queue_micro_task schedules microtask A to flush task X
			// - synchronously after, flushSync runs, processing task X
			// - synchronously after, some other microtask B is scheduled, but not through queue_micro_task but for example a Promise.resolve() in user code
			// - synchronously after, queue_micro_task schedules microtask C to flush task Y
			// - one tick later, microtask A now resolves, flushing task Y before microtask B, which is incorrect
			// This if check prevents that race condition (that realistically will only happen in tests)
			if (tasks === micro_tasks) run_micro_tasks();
		});
	}

	micro_tasks.push(fn);
}

/**
 * Synchronously run any queued tasks.
 */
function flush_tasks() {
	while (micro_tasks.length > 0) {
		run_micro_tasks();
	}
}


/***/ },

/***/ "./node_modules/svelte/src/internal/client/dom/template.js"
/*!*****************************************************************!*\
  !*** ./node_modules/svelte/src/internal/client/dom/template.js ***!
  \*****************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   append: () => (/* binding */ append),
/* harmony export */   assign_nodes: () => (/* binding */ assign_nodes),
/* harmony export */   comment: () => (/* binding */ comment),
/* harmony export */   from_html: () => (/* binding */ from_html),
/* harmony export */   from_mathml: () => (/* binding */ from_mathml),
/* harmony export */   from_svg: () => (/* binding */ from_svg),
/* harmony export */   from_tree: () => (/* binding */ from_tree),
/* harmony export */   props_id: () => (/* binding */ props_id),
/* harmony export */   text: () => (/* binding */ text),
/* harmony export */   with_script: () => (/* binding */ with_script)
/* harmony export */ });
/* harmony import */ var _hydration_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./hydration.js */ "./node_modules/svelte/src/internal/client/dom/hydration.js");
/* harmony import */ var _operations_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./operations.js */ "./node_modules/svelte/src/internal/client/dom/operations.js");
/* harmony import */ var _reconciler_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./reconciler.js */ "./node_modules/svelte/src/internal/client/dom/reconciler.js");
/* harmony import */ var _runtime_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../runtime.js */ "./node_modules/svelte/src/internal/client/runtime.js");
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../constants.js */ "./node_modules/svelte/src/constants.js");
/* harmony import */ var _client_constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! #client/constants */ "./node_modules/svelte/src/internal/client/constants.js");
/** @import { Effect, EffectNodes, TemplateNode } from '#client' */
/** @import { TemplateStructure } from './types' */







const TEMPLATE_TAG = _client_constants__WEBPACK_IMPORTED_MODULE_5__.IS_XHTML ? 'template' : 'TEMPLATE';
const SCRIPT_TAG = _client_constants__WEBPACK_IMPORTED_MODULE_5__.IS_XHTML ? 'script' : 'SCRIPT';

/**
 * @param {TemplateNode} start
 * @param {TemplateNode | null} end
 */
function assign_nodes(start, end) {
	var effect = /** @type {Effect} */ (_runtime_js__WEBPACK_IMPORTED_MODULE_3__.active_effect);
	if (effect.nodes === null) {
		effect.nodes = { start, end, a: null, t: null };
	}
}

/**
 * @param {string} content
 * @param {number} flags
 * @returns {() => Node | Node[]}
 */
/*#__NO_SIDE_EFFECTS__*/
function from_html(content, flags) {
	var is_fragment = (flags & _constants_js__WEBPACK_IMPORTED_MODULE_4__.TEMPLATE_FRAGMENT) !== 0;
	var use_import_node = (flags & _constants_js__WEBPACK_IMPORTED_MODULE_4__.TEMPLATE_USE_IMPORT_NODE) !== 0;

	/** @type {Node} */
	var node;

	/**
	 * Whether or not the first item is a text/element node. If not, we need to
	 * create an additional comment node to act as `effect.nodes.start`
	 */
	var has_start = !content.startsWith('<!>');

	return () => {
		if (_hydration_js__WEBPACK_IMPORTED_MODULE_0__.hydrating) {
			assign_nodes(_hydration_js__WEBPACK_IMPORTED_MODULE_0__.hydrate_node, null);
			return _hydration_js__WEBPACK_IMPORTED_MODULE_0__.hydrate_node;
		}

		if (node === undefined) {
			node = (0,_reconciler_js__WEBPACK_IMPORTED_MODULE_2__.create_fragment_from_html)(has_start ? content : '<!>' + content);
			if (!is_fragment) node = /** @type {TemplateNode} */ ((0,_operations_js__WEBPACK_IMPORTED_MODULE_1__.get_first_child)(node));
		}

		var clone = /** @type {TemplateNode} */ (
			use_import_node || _operations_js__WEBPACK_IMPORTED_MODULE_1__.is_firefox ? document.importNode(node, true) : node.cloneNode(true)
		);

		if (is_fragment) {
			var start = /** @type {TemplateNode} */ ((0,_operations_js__WEBPACK_IMPORTED_MODULE_1__.get_first_child)(clone));
			var end = /** @type {TemplateNode} */ (clone.lastChild);

			assign_nodes(start, end);
		} else {
			assign_nodes(clone, clone);
		}

		return clone;
	};
}

/**
 * @param {string} content
 * @param {number} flags
 * @param {'svg' | 'math'} ns
 * @returns {() => Node | Node[]}
 */
/*#__NO_SIDE_EFFECTS__*/
function from_namespace(content, flags, ns = 'svg') {
	/**
	 * Whether or not the first item is a text/element node. If not, we need to
	 * create an additional comment node to act as `effect.nodes.start`
	 */
	var has_start = !content.startsWith('<!>');

	var is_fragment = (flags & _constants_js__WEBPACK_IMPORTED_MODULE_4__.TEMPLATE_FRAGMENT) !== 0;
	var wrapped = `<${ns}>${has_start ? content : '<!>' + content}</${ns}>`;

	/** @type {Element | DocumentFragment} */
	var node;

	return () => {
		if (_hydration_js__WEBPACK_IMPORTED_MODULE_0__.hydrating) {
			assign_nodes(_hydration_js__WEBPACK_IMPORTED_MODULE_0__.hydrate_node, null);
			return _hydration_js__WEBPACK_IMPORTED_MODULE_0__.hydrate_node;
		}

		if (!node) {
			var fragment = /** @type {DocumentFragment} */ ((0,_reconciler_js__WEBPACK_IMPORTED_MODULE_2__.create_fragment_from_html)(wrapped));
			var root = /** @type {Element} */ ((0,_operations_js__WEBPACK_IMPORTED_MODULE_1__.get_first_child)(fragment));

			if (is_fragment) {
				node = document.createDocumentFragment();
				while ((0,_operations_js__WEBPACK_IMPORTED_MODULE_1__.get_first_child)(root)) {
					node.appendChild(/** @type {TemplateNode} */ ((0,_operations_js__WEBPACK_IMPORTED_MODULE_1__.get_first_child)(root)));
				}
			} else {
				node = /** @type {Element} */ ((0,_operations_js__WEBPACK_IMPORTED_MODULE_1__.get_first_child)(root));
			}
		}

		var clone = /** @type {TemplateNode} */ (node.cloneNode(true));

		if (is_fragment) {
			var start = /** @type {TemplateNode} */ ((0,_operations_js__WEBPACK_IMPORTED_MODULE_1__.get_first_child)(clone));
			var end = /** @type {TemplateNode} */ (clone.lastChild);

			assign_nodes(start, end);
		} else {
			assign_nodes(clone, clone);
		}

		return clone;
	};
}

/**
 * @param {string} content
 * @param {number} flags
 */
/*#__NO_SIDE_EFFECTS__*/
function from_svg(content, flags) {
	return from_namespace(content, flags, 'svg');
}

/**
 * @param {string} content
 * @param {number} flags
 */
/*#__NO_SIDE_EFFECTS__*/
function from_mathml(content, flags) {
	return from_namespace(content, flags, 'math');
}

/**
 * @param {TemplateStructure[]} structure
 * @param {typeof NAMESPACE_SVG | typeof NAMESPACE_MATHML | undefined} [ns]
 */
function fragment_from_tree(structure, ns) {
	var fragment = (0,_operations_js__WEBPACK_IMPORTED_MODULE_1__.create_fragment)();

	for (var item of structure) {
		if (typeof item === 'string') {
			fragment.append((0,_operations_js__WEBPACK_IMPORTED_MODULE_1__.create_text)(item));
			continue;
		}

		// if `preserveComments === true`, comments are represented as `['// <data>']`
		if (item === undefined || item[0][0] === '/') {
			fragment.append((0,_operations_js__WEBPACK_IMPORTED_MODULE_1__.create_comment)(item ? item[0].slice(3) : ''));
			continue;
		}

		const [name, attributes, ...children] = item;

		const namespace = name === 'svg' ? _constants_js__WEBPACK_IMPORTED_MODULE_4__.NAMESPACE_SVG : name === 'math' ? _constants_js__WEBPACK_IMPORTED_MODULE_4__.NAMESPACE_MATHML : ns;

		var element = (0,_operations_js__WEBPACK_IMPORTED_MODULE_1__.create_element)(name, namespace, attributes?.is);

		for (var key in attributes) {
			(0,_operations_js__WEBPACK_IMPORTED_MODULE_1__.set_attribute)(element, key, attributes[key]);
		}

		if (children.length > 0) {
			var target =
				element.nodeName === TEMPLATE_TAG
					? /** @type {HTMLTemplateElement} */ (element).content
					: element;

			target.append(
				fragment_from_tree(children, element.nodeName === 'foreignObject' ? undefined : namespace)
			);
		}

		fragment.append(element);
	}

	return fragment;
}

/**
 * @param {TemplateStructure[]} structure
 * @param {number} flags
 * @returns {() => Node | Node[]}
 */
/*#__NO_SIDE_EFFECTS__*/
function from_tree(structure, flags) {
	var is_fragment = (flags & _constants_js__WEBPACK_IMPORTED_MODULE_4__.TEMPLATE_FRAGMENT) !== 0;
	var use_import_node = (flags & _constants_js__WEBPACK_IMPORTED_MODULE_4__.TEMPLATE_USE_IMPORT_NODE) !== 0;

	/** @type {Node} */
	var node;

	return () => {
		if (_hydration_js__WEBPACK_IMPORTED_MODULE_0__.hydrating) {
			assign_nodes(_hydration_js__WEBPACK_IMPORTED_MODULE_0__.hydrate_node, null);
			return _hydration_js__WEBPACK_IMPORTED_MODULE_0__.hydrate_node;
		}

		if (node === undefined) {
			const ns =
				(flags & _constants_js__WEBPACK_IMPORTED_MODULE_4__.TEMPLATE_USE_SVG) !== 0
					? _constants_js__WEBPACK_IMPORTED_MODULE_4__.NAMESPACE_SVG
					: (flags & _constants_js__WEBPACK_IMPORTED_MODULE_4__.TEMPLATE_USE_MATHML) !== 0
						? _constants_js__WEBPACK_IMPORTED_MODULE_4__.NAMESPACE_MATHML
						: undefined;

			node = fragment_from_tree(structure, ns);
			if (!is_fragment) node = /** @type {TemplateNode} */ ((0,_operations_js__WEBPACK_IMPORTED_MODULE_1__.get_first_child)(node));
		}

		var clone = /** @type {TemplateNode} */ (
			use_import_node || _operations_js__WEBPACK_IMPORTED_MODULE_1__.is_firefox ? document.importNode(node, true) : node.cloneNode(true)
		);

		if (is_fragment) {
			var start = /** @type {TemplateNode} */ ((0,_operations_js__WEBPACK_IMPORTED_MODULE_1__.get_first_child)(clone));
			var end = /** @type {TemplateNode} */ (clone.lastChild);

			assign_nodes(start, end);
		} else {
			assign_nodes(clone, clone);
		}

		return clone;
	};
}

/**
 * @param {() => Element | DocumentFragment} fn
 */
function with_script(fn) {
	return () => run_scripts(fn());
}

/**
 * Creating a document fragment from HTML that contains script tags will not execute
 * the scripts. We need to replace the script tags with new ones so that they are executed.
 * @param {Element | DocumentFragment} node
 * @returns {Node | Node[]}
 */
function run_scripts(node) {
	// scripts were SSR'd, in which case they will run
	if (_hydration_js__WEBPACK_IMPORTED_MODULE_0__.hydrating) return node;

	const is_fragment = node.nodeType === _client_constants__WEBPACK_IMPORTED_MODULE_5__.DOCUMENT_FRAGMENT_NODE;
	const scripts =
		/** @type {HTMLElement} */ (node).nodeName === SCRIPT_TAG
			? [/** @type {HTMLScriptElement} */ (node)]
			: node.querySelectorAll('script');

	const effect = /** @type {Effect & { nodes: EffectNodes }} */ (_runtime_js__WEBPACK_IMPORTED_MODULE_3__.active_effect);

	for (const script of scripts) {
		const clone = (0,_operations_js__WEBPACK_IMPORTED_MODULE_1__.create_element)('script');
		for (var attribute of script.attributes) {
			clone.setAttribute(attribute.name, attribute.value);
		}

		clone.textContent = script.textContent;

		// The script has changed - if it's at the edges, the effect now points at dead nodes
		if (is_fragment ? node.firstChild === script : node === script) {
			effect.nodes.start = clone;
		}
		if (is_fragment ? node.lastChild === script : node === script) {
			effect.nodes.end = clone;
		}

		script.replaceWith(clone);
	}
	return node;
}

/**
 * Don't mark this as side-effect-free, hydration needs to walk all nodes
 * @param {any} value
 */
function text(value = '') {
	if (!_hydration_js__WEBPACK_IMPORTED_MODULE_0__.hydrating) {
		var t = (0,_operations_js__WEBPACK_IMPORTED_MODULE_1__.create_text)(value + '');
		assign_nodes(t, t);
		return t;
	}

	var node = _hydration_js__WEBPACK_IMPORTED_MODULE_0__.hydrate_node;

	if (node.nodeType !== _client_constants__WEBPACK_IMPORTED_MODULE_5__.TEXT_NODE) {
		// if an {expression} is empty during SSR, we need to insert an empty text node
		node.before((node = (0,_operations_js__WEBPACK_IMPORTED_MODULE_1__.create_text)()));
		(0,_hydration_js__WEBPACK_IMPORTED_MODULE_0__.set_hydrate_node)(node);
	} else {
		(0,_operations_js__WEBPACK_IMPORTED_MODULE_1__.merge_text_nodes)(/** @type {Text} */ (node));
	}

	assign_nodes(node, node);
	return node;
}

/**
 * @returns {TemplateNode | DocumentFragment}
 */
function comment() {
	// we're not delegating to `template` here for performance reasons
	if (_hydration_js__WEBPACK_IMPORTED_MODULE_0__.hydrating) {
		assign_nodes(_hydration_js__WEBPACK_IMPORTED_MODULE_0__.hydrate_node, null);
		return _hydration_js__WEBPACK_IMPORTED_MODULE_0__.hydrate_node;
	}

	var frag = document.createDocumentFragment();
	var start = document.createComment('');
	var anchor = (0,_operations_js__WEBPACK_IMPORTED_MODULE_1__.create_text)();
	frag.append(start, anchor);

	assign_nodes(start, anchor);

	return frag;
}

/**
 * Assign the created (or in hydration mode, traversed) dom elements to the current block
 * and insert the elements into the dom (in client mode).
 * @param {Text | Comment | Element} anchor
 * @param {DocumentFragment | Element} dom
 */
function append(anchor, dom) {
	if (_hydration_js__WEBPACK_IMPORTED_MODULE_0__.hydrating) {
		var effect = /** @type {Effect & { nodes: EffectNodes }} */ (_runtime_js__WEBPACK_IMPORTED_MODULE_3__.active_effect);

		// When hydrating and outer component and an inner component is async, i.e. blocked on a promise,
		// then by the time the inner resolves we have already advanced to the end of the hydrated nodes
		// of the parent component. Check for defined for that reason to avoid rewinding the parent's end marker.
		if ((effect.f & _client_constants__WEBPACK_IMPORTED_MODULE_5__.REACTION_RAN) === 0 || effect.nodes.end === null) {
			effect.nodes.end = _hydration_js__WEBPACK_IMPORTED_MODULE_0__.hydrate_node;
		}

		;(0,_hydration_js__WEBPACK_IMPORTED_MODULE_0__.hydrate_next)();
		return;
	}

	if (anchor === null) {
		// edge case — void `<svelte:element>` with content
		return;
	}

	anchor.before(/** @type {Node} */ (dom));
}

/**
 * Create (or hydrate) an unique UID for the component instance.
 */
function props_id() {
	if (
		_hydration_js__WEBPACK_IMPORTED_MODULE_0__.hydrating &&
		_hydration_js__WEBPACK_IMPORTED_MODULE_0__.hydrate_node &&
		_hydration_js__WEBPACK_IMPORTED_MODULE_0__.hydrate_node.nodeType === _client_constants__WEBPACK_IMPORTED_MODULE_5__.COMMENT_NODE &&
		_hydration_js__WEBPACK_IMPORTED_MODULE_0__.hydrate_node.textContent?.startsWith(`$`)
	) {
		const id = _hydration_js__WEBPACK_IMPORTED_MODULE_0__.hydrate_node.textContent.substring(1);
		(0,_hydration_js__WEBPACK_IMPORTED_MODULE_0__.hydrate_next)();
		return id;
	}

	// @ts-expect-error This way we ensure the id is unique even across Svelte runtimes
	(window.__svelte ??= {}).uid ??= 1;

	// @ts-expect-error
	return `c${window.__svelte.uid++}`;
}


/***/ },

/***/ "./node_modules/svelte/src/internal/client/error-handling.js"
/*!*******************************************************************!*\
  !*** ./node_modules/svelte/src/internal/client/error-handling.js ***!
  \*******************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   handle_error: () => (/* binding */ handle_error),
/* harmony export */   invoke_error_boundary: () => (/* binding */ invoke_error_boundary)
/* harmony export */ });
/* harmony import */ var esm_env__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! esm-env */ "./node_modules/esm-env/index.js");
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../constants.js */ "./node_modules/svelte/src/constants.js");
/* harmony import */ var _dom_operations_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dom/operations.js */ "./node_modules/svelte/src/internal/client/dom/operations.js");
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./constants.js */ "./node_modules/svelte/src/internal/client/constants.js");
/* harmony import */ var _shared_utils_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/utils.js */ "./node_modules/svelte/src/internal/shared/utils.js");
/* harmony import */ var _runtime_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./runtime.js */ "./node_modules/svelte/src/internal/client/runtime.js");
/** @import { Derived, Effect } from '#client' */
/** @import { Boundary } from './dom/blocks/boundary.js' */







const adjustments = new WeakMap();

/**
 * @param {unknown} error
 */
function handle_error(error) {
	var effect = _runtime_js__WEBPACK_IMPORTED_MODULE_5__.active_effect;

	// for unowned deriveds, don't throw until we read the value
	if (effect === null) {
		/** @type {Derived} */ (_runtime_js__WEBPACK_IMPORTED_MODULE_5__.active_reaction).f |= _constants_js__WEBPACK_IMPORTED_MODULE_3__.ERROR_VALUE;
		return error;
	}

	if (esm_env__WEBPACK_IMPORTED_MODULE_0__.DEV && error instanceof Error && !adjustments.has(error)) {
		adjustments.set(error, get_adjustments(error, effect));
	}

	// if the error occurred while creating this subtree, we let it
	// bubble up until it hits a boundary that can handle it, unless
	// it's an $effect in which case it doesn't run immediately
	if ((effect.f & _constants_js__WEBPACK_IMPORTED_MODULE_3__.REACTION_RAN) === 0 && (effect.f & _constants_js__WEBPACK_IMPORTED_MODULE_3__.EFFECT) === 0) {
		if (esm_env__WEBPACK_IMPORTED_MODULE_0__.DEV && !effect.parent && error instanceof Error) {
			apply_adjustments(error);
		}

		throw error;
	}

	// otherwise we bubble up the effect tree ourselves
	invoke_error_boundary(error, effect);
}

/**
 * @param {unknown} error
 * @param {Effect | null} effect
 */
function invoke_error_boundary(error, effect) {
	if (effect !== null && (effect.f & _constants_js__WEBPACK_IMPORTED_MODULE_3__.DESTROYED) !== 0) {
		return;
	}

	while (effect !== null) {
		// Skip boundaries that are destroyed/destroying and cannot meaningfully handle the error.
		if ((effect.f & _constants_js__WEBPACK_IMPORTED_MODULE_3__.BOUNDARY_EFFECT) !== 0 && (effect.f & (_constants_js__WEBPACK_IMPORTED_MODULE_3__.DESTROYED | _constants_js__WEBPACK_IMPORTED_MODULE_3__.DESTROYING)) === 0) {
			if ((effect.f & _constants_js__WEBPACK_IMPORTED_MODULE_3__.REACTION_RAN) === 0) {
				// we are still creating the boundary effect
				throw error;
			}

			try {
				/** @type {Boundary} */ (effect.b).error(error);
				return;
			} catch (e) {
				error = e;
			}
		}

		effect = effect.parent;
	}

	if (esm_env__WEBPACK_IMPORTED_MODULE_0__.DEV && error instanceof Error) {
		apply_adjustments(error);
	}

	throw error;
}

/**
 * Add useful information to the error message/stack in development
 * @param {Error} error
 * @param {Effect} effect
 */
function get_adjustments(error, effect) {
	const message_descriptor = (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_4__.get_descriptor)(error, 'message');

	// if the message was already changed and it's not configurable we can't change it
	// or it will throw a different error swallowing the original error
	if (message_descriptor && !message_descriptor.configurable) return;

	var indent = _dom_operations_js__WEBPACK_IMPORTED_MODULE_2__.is_firefox ? '  ' : '\t';
	var component_stack = `\n${indent}in ${effect.fn?.name || '<unknown>'}`;
	var context = effect.ctx;

	while (context !== null) {
		component_stack += `\n${indent}in ${context.function?.[_constants_js__WEBPACK_IMPORTED_MODULE_1__.FILENAME].split('/').pop()}`;
		context = context.p;
	}

	return {
		message: error.message + `\n${component_stack}\n`,
		stack: error.stack
			?.split('\n')
			.filter((line) => !line.includes('svelte/src/internal'))
			.join('\n')
	};
}

/**
 * @param {Error} error
 */
function apply_adjustments(error) {
	const adjusted = adjustments.get(error);

	if (adjusted) {
		(0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_4__.define_property)(error, 'message', {
			value: adjusted.message
		});

		(0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_4__.define_property)(error, 'stack', {
			value: adjusted.stack
		});
	}
}


/***/ },

/***/ "./node_modules/svelte/src/internal/client/errors.js"
/*!***********************************************************!*\
  !*** ./node_modules/svelte/src/internal/client/errors.js ***!
  \***********************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   async_derived_orphan: () => (/* binding */ async_derived_orphan),
/* harmony export */   bind_invalid_checkbox_value: () => (/* binding */ bind_invalid_checkbox_value),
/* harmony export */   bind_invalid_export: () => (/* binding */ bind_invalid_export),
/* harmony export */   bind_not_bindable: () => (/* binding */ bind_not_bindable),
/* harmony export */   component_api_changed: () => (/* binding */ component_api_changed),
/* harmony export */   component_api_invalid_new: () => (/* binding */ component_api_invalid_new),
/* harmony export */   derived_references_self: () => (/* binding */ derived_references_self),
/* harmony export */   each_key_duplicate: () => (/* binding */ each_key_duplicate),
/* harmony export */   each_key_volatile: () => (/* binding */ each_key_volatile),
/* harmony export */   effect_in_teardown: () => (/* binding */ effect_in_teardown),
/* harmony export */   effect_in_unowned_derived: () => (/* binding */ effect_in_unowned_derived),
/* harmony export */   effect_orphan: () => (/* binding */ effect_orphan),
/* harmony export */   effect_pending_outside_reaction: () => (/* binding */ effect_pending_outside_reaction),
/* harmony export */   effect_update_depth_exceeded: () => (/* binding */ effect_update_depth_exceeded),
/* harmony export */   experimental_async_required: () => (/* reexport safe */ _shared_errors_js__WEBPACK_IMPORTED_MODULE_1__.experimental_async_required),
/* harmony export */   flush_sync_in_effect: () => (/* binding */ flush_sync_in_effect),
/* harmony export */   fork_discarded: () => (/* binding */ fork_discarded),
/* harmony export */   fork_timing: () => (/* binding */ fork_timing),
/* harmony export */   get_abort_signal_outside_reaction: () => (/* binding */ get_abort_signal_outside_reaction),
/* harmony export */   hydratable_missing_but_required: () => (/* binding */ hydratable_missing_but_required),
/* harmony export */   hydration_failed: () => (/* binding */ hydration_failed),
/* harmony export */   invalid_default_snippet: () => (/* reexport safe */ _shared_errors_js__WEBPACK_IMPORTED_MODULE_1__.invalid_default_snippet),
/* harmony export */   invalid_snippet: () => (/* binding */ invalid_snippet),
/* harmony export */   invalid_snippet_arguments: () => (/* reexport safe */ _shared_errors_js__WEBPACK_IMPORTED_MODULE_1__.invalid_snippet_arguments),
/* harmony export */   invariant_violation: () => (/* reexport safe */ _shared_errors_js__WEBPACK_IMPORTED_MODULE_1__.invariant_violation),
/* harmony export */   lifecycle_legacy_only: () => (/* binding */ lifecycle_legacy_only),
/* harmony export */   lifecycle_outside_component: () => (/* reexport safe */ _shared_errors_js__WEBPACK_IMPORTED_MODULE_1__.lifecycle_outside_component),
/* harmony export */   missing_context: () => (/* reexport safe */ _shared_errors_js__WEBPACK_IMPORTED_MODULE_1__.missing_context),
/* harmony export */   props_invalid_value: () => (/* binding */ props_invalid_value),
/* harmony export */   props_rest_readonly: () => (/* binding */ props_rest_readonly),
/* harmony export */   rune_outside_svelte: () => (/* binding */ rune_outside_svelte),
/* harmony export */   set_context_after_init: () => (/* reexport safe */ _shared_errors_js__WEBPACK_IMPORTED_MODULE_1__.set_context_after_init),
/* harmony export */   snippet_without_render_tag: () => (/* reexport safe */ _shared_errors_js__WEBPACK_IMPORTED_MODULE_1__.snippet_without_render_tag),
/* harmony export */   state_descriptors_fixed: () => (/* binding */ state_descriptors_fixed),
/* harmony export */   state_prototype_fixed: () => (/* binding */ state_prototype_fixed),
/* harmony export */   state_unsafe_mutation: () => (/* binding */ state_unsafe_mutation),
/* harmony export */   store_invalid_shape: () => (/* reexport safe */ _shared_errors_js__WEBPACK_IMPORTED_MODULE_1__.store_invalid_shape),
/* harmony export */   svelte_boundary_reset_onerror: () => (/* binding */ svelte_boundary_reset_onerror),
/* harmony export */   svelte_element_invalid_this_value: () => (/* reexport safe */ _shared_errors_js__WEBPACK_IMPORTED_MODULE_1__.svelte_element_invalid_this_value)
/* harmony export */ });
/* harmony import */ var esm_env__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! esm-env */ "./node_modules/esm-env/index.js");
/* harmony import */ var _shared_errors_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/errors.js */ "./node_modules/svelte/src/internal/shared/errors.js");
/* This file is generated by scripts/process-messages/index.js. Do not edit! */





/**
 * Cannot create a `$derived(...)` with an `await` expression outside of an effect tree
 * @returns {never}
 */
function async_derived_orphan() {
	if (esm_env__WEBPACK_IMPORTED_MODULE_0__.DEV) {
		const error = new Error(`async_derived_orphan\nCannot create a \`$derived(...)\` with an \`await\` expression outside of an effect tree\nhttps://svelte.dev/e/async_derived_orphan`);

		error.name = 'Svelte error';

		throw error;
	} else {
		throw new Error(`https://svelte.dev/e/async_derived_orphan`);
	}
}

/**
 * Using `bind:value` together with a checkbox input is not allowed. Use `bind:checked` instead
 * @returns {never}
 */
function bind_invalid_checkbox_value() {
	if (esm_env__WEBPACK_IMPORTED_MODULE_0__.DEV) {
		const error = new Error(`bind_invalid_checkbox_value\nUsing \`bind:value\` together with a checkbox input is not allowed. Use \`bind:checked\` instead\nhttps://svelte.dev/e/bind_invalid_checkbox_value`);

		error.name = 'Svelte error';

		throw error;
	} else {
		throw new Error(`https://svelte.dev/e/bind_invalid_checkbox_value`);
	}
}

/**
 * Component %component% has an export named `%key%` that a consumer component is trying to access using `bind:%key%`, which is disallowed. Instead, use `bind:this` (e.g. `<%name% bind:this={component} />`) and then access the property on the bound component instance (e.g. `component.%key%`)
 * @param {string} component
 * @param {string} key
 * @param {string} name
 * @returns {never}
 */
function bind_invalid_export(component, key, name) {
	if (esm_env__WEBPACK_IMPORTED_MODULE_0__.DEV) {
		const error = new Error(`bind_invalid_export\nComponent ${component} has an export named \`${key}\` that a consumer component is trying to access using \`bind:${key}\`, which is disallowed. Instead, use \`bind:this\` (e.g. \`<${name} bind:this={component} />\`) and then access the property on the bound component instance (e.g. \`component.${key}\`)\nhttps://svelte.dev/e/bind_invalid_export`);

		error.name = 'Svelte error';

		throw error;
	} else {
		throw new Error(`https://svelte.dev/e/bind_invalid_export`);
	}
}

/**
 * A component is attempting to bind to a non-bindable property `%key%` belonging to %component% (i.e. `<%name% bind:%key%={...}>`). To mark a property as bindable: `let { %key% = $bindable() } = $props()`
 * @param {string} key
 * @param {string} component
 * @param {string} name
 * @returns {never}
 */
function bind_not_bindable(key, component, name) {
	if (esm_env__WEBPACK_IMPORTED_MODULE_0__.DEV) {
		const error = new Error(`bind_not_bindable\nA component is attempting to bind to a non-bindable property \`${key}\` belonging to ${component} (i.e. \`<${name} bind:${key}={...}>\`). To mark a property as bindable: \`let { ${key} = $bindable() } = $props()\`\nhttps://svelte.dev/e/bind_not_bindable`);

		error.name = 'Svelte error';

		throw error;
	} else {
		throw new Error(`https://svelte.dev/e/bind_not_bindable`);
	}
}

/**
 * Calling `%method%` on a component instance (of %component%) is no longer valid in Svelte 5
 * @param {string} method
 * @param {string} component
 * @returns {never}
 */
function component_api_changed(method, component) {
	if (esm_env__WEBPACK_IMPORTED_MODULE_0__.DEV) {
		const error = new Error(`component_api_changed\nCalling \`${method}\` on a component instance (of ${component}) is no longer valid in Svelte 5\nhttps://svelte.dev/e/component_api_changed`);

		error.name = 'Svelte error';

		throw error;
	} else {
		throw new Error(`https://svelte.dev/e/component_api_changed`);
	}
}

/**
 * Attempted to instantiate %component% with `new %name%`, which is no longer valid in Svelte 5. If this component is not under your control, set the `compatibility.componentApi` compiler option to `4` to keep it working.
 * @param {string} component
 * @param {string} name
 * @returns {never}
 */
function component_api_invalid_new(component, name) {
	if (esm_env__WEBPACK_IMPORTED_MODULE_0__.DEV) {
		const error = new Error(`component_api_invalid_new\nAttempted to instantiate ${component} with \`new ${name}\`, which is no longer valid in Svelte 5. If this component is not under your control, set the \`compatibility.componentApi\` compiler option to \`4\` to keep it working.\nhttps://svelte.dev/e/component_api_invalid_new`);

		error.name = 'Svelte error';

		throw error;
	} else {
		throw new Error(`https://svelte.dev/e/component_api_invalid_new`);
	}
}

/**
 * A derived value cannot reference itself recursively
 * @returns {never}
 */
function derived_references_self() {
	if (esm_env__WEBPACK_IMPORTED_MODULE_0__.DEV) {
		const error = new Error(`derived_references_self\nA derived value cannot reference itself recursively\nhttps://svelte.dev/e/derived_references_self`);

		error.name = 'Svelte error';

		throw error;
	} else {
		throw new Error(`https://svelte.dev/e/derived_references_self`);
	}
}

/**
 * Keyed each block has duplicate key `%value%` at indexes %a% and %b%
 * @param {string} a
 * @param {string} b
 * @param {string | undefined | null} [value]
 * @returns {never}
 */
function each_key_duplicate(a, b, value) {
	if (esm_env__WEBPACK_IMPORTED_MODULE_0__.DEV) {
		const error = new Error(`each_key_duplicate\n${value
			? `Keyed each block has duplicate key \`${value}\` at indexes ${a} and ${b}`
			: `Keyed each block has duplicate key at indexes ${a} and ${b}`}\nhttps://svelte.dev/e/each_key_duplicate`);

		error.name = 'Svelte error';

		throw error;
	} else {
		throw new Error(`https://svelte.dev/e/each_key_duplicate`);
	}
}

/**
 * Keyed each block has key that is not idempotent — the key for item at index %index% was `%a%` but is now `%b%`. Keys must be the same each time for a given item
 * @param {string} index
 * @param {string} a
 * @param {string} b
 * @returns {never}
 */
function each_key_volatile(index, a, b) {
	if (esm_env__WEBPACK_IMPORTED_MODULE_0__.DEV) {
		const error = new Error(`each_key_volatile\nKeyed each block has key that is not idempotent — the key for item at index ${index} was \`${a}\` but is now \`${b}\`. Keys must be the same each time for a given item\nhttps://svelte.dev/e/each_key_volatile`);

		error.name = 'Svelte error';

		throw error;
	} else {
		throw new Error(`https://svelte.dev/e/each_key_volatile`);
	}
}

/**
 * `%rune%` cannot be used inside an effect cleanup function
 * @param {string} rune
 * @returns {never}
 */
function effect_in_teardown(rune) {
	if (esm_env__WEBPACK_IMPORTED_MODULE_0__.DEV) {
		const error = new Error(`effect_in_teardown\n\`${rune}\` cannot be used inside an effect cleanup function\nhttps://svelte.dev/e/effect_in_teardown`);

		error.name = 'Svelte error';

		throw error;
	} else {
		throw new Error(`https://svelte.dev/e/effect_in_teardown`);
	}
}

/**
 * Effect cannot be created inside a `$derived` value that was not itself created inside an effect
 * @returns {never}
 */
function effect_in_unowned_derived() {
	if (esm_env__WEBPACK_IMPORTED_MODULE_0__.DEV) {
		const error = new Error(`effect_in_unowned_derived\nEffect cannot be created inside a \`$derived\` value that was not itself created inside an effect\nhttps://svelte.dev/e/effect_in_unowned_derived`);

		error.name = 'Svelte error';

		throw error;
	} else {
		throw new Error(`https://svelte.dev/e/effect_in_unowned_derived`);
	}
}

/**
 * `%rune%` can only be used inside an effect (e.g. during component initialisation)
 * @param {string} rune
 * @returns {never}
 */
function effect_orphan(rune) {
	if (esm_env__WEBPACK_IMPORTED_MODULE_0__.DEV) {
		const error = new Error(`effect_orphan\n\`${rune}\` can only be used inside an effect (e.g. during component initialisation)\nhttps://svelte.dev/e/effect_orphan`);

		error.name = 'Svelte error';

		throw error;
	} else {
		throw new Error(`https://svelte.dev/e/effect_orphan`);
	}
}

/**
 * `$effect.pending()` can only be called inside an effect or derived
 * @returns {never}
 */
function effect_pending_outside_reaction() {
	if (esm_env__WEBPACK_IMPORTED_MODULE_0__.DEV) {
		const error = new Error(`effect_pending_outside_reaction\n\`$effect.pending()\` can only be called inside an effect or derived\nhttps://svelte.dev/e/effect_pending_outside_reaction`);

		error.name = 'Svelte error';

		throw error;
	} else {
		throw new Error(`https://svelte.dev/e/effect_pending_outside_reaction`);
	}
}

/**
 * Maximum update depth exceeded. This typically indicates that an effect reads and writes the same piece of state
 * @returns {never}
 */
function effect_update_depth_exceeded() {
	if (esm_env__WEBPACK_IMPORTED_MODULE_0__.DEV) {
		const error = new Error(`effect_update_depth_exceeded\nMaximum update depth exceeded. This typically indicates that an effect reads and writes the same piece of state\nhttps://svelte.dev/e/effect_update_depth_exceeded`);

		error.name = 'Svelte error';

		throw error;
	} else {
		throw new Error(`https://svelte.dev/e/effect_update_depth_exceeded`);
	}
}

/**
 * Cannot use `flushSync` inside an effect
 * @returns {never}
 */
function flush_sync_in_effect() {
	if (esm_env__WEBPACK_IMPORTED_MODULE_0__.DEV) {
		const error = new Error(`flush_sync_in_effect\nCannot use \`flushSync\` inside an effect\nhttps://svelte.dev/e/flush_sync_in_effect`);

		error.name = 'Svelte error';

		throw error;
	} else {
		throw new Error(`https://svelte.dev/e/flush_sync_in_effect`);
	}
}

/**
 * Cannot commit a fork that was already discarded
 * @returns {never}
 */
function fork_discarded() {
	if (esm_env__WEBPACK_IMPORTED_MODULE_0__.DEV) {
		const error = new Error(`fork_discarded\nCannot commit a fork that was already discarded\nhttps://svelte.dev/e/fork_discarded`);

		error.name = 'Svelte error';

		throw error;
	} else {
		throw new Error(`https://svelte.dev/e/fork_discarded`);
	}
}

/**
 * Cannot create a fork inside an effect or when state changes are pending
 * @returns {never}
 */
function fork_timing() {
	if (esm_env__WEBPACK_IMPORTED_MODULE_0__.DEV) {
		const error = new Error(`fork_timing\nCannot create a fork inside an effect or when state changes are pending\nhttps://svelte.dev/e/fork_timing`);

		error.name = 'Svelte error';

		throw error;
	} else {
		throw new Error(`https://svelte.dev/e/fork_timing`);
	}
}

/**
 * `getAbortSignal()` can only be called inside an effect or derived
 * @returns {never}
 */
function get_abort_signal_outside_reaction() {
	if (esm_env__WEBPACK_IMPORTED_MODULE_0__.DEV) {
		const error = new Error(`get_abort_signal_outside_reaction\n\`getAbortSignal()\` can only be called inside an effect or derived\nhttps://svelte.dev/e/get_abort_signal_outside_reaction`);

		error.name = 'Svelte error';

		throw error;
	} else {
		throw new Error(`https://svelte.dev/e/get_abort_signal_outside_reaction`);
	}
}

/**
 * Expected to find a hydratable with key `%key%` during hydration, but did not.
 * @param {string} key
 * @returns {never}
 */
function hydratable_missing_but_required(key) {
	if (esm_env__WEBPACK_IMPORTED_MODULE_0__.DEV) {
		const error = new Error(`hydratable_missing_but_required\nExpected to find a hydratable with key \`${key}\` during hydration, but did not.\nhttps://svelte.dev/e/hydratable_missing_but_required`);

		error.name = 'Svelte error';

		throw error;
	} else {
		throw new Error(`https://svelte.dev/e/hydratable_missing_but_required`);
	}
}

/**
 * Failed to hydrate the application
 * @returns {never}
 */
function hydration_failed() {
	if (esm_env__WEBPACK_IMPORTED_MODULE_0__.DEV) {
		const error = new Error(`hydration_failed\nFailed to hydrate the application\nhttps://svelte.dev/e/hydration_failed`);

		error.name = 'Svelte error';

		throw error;
	} else {
		throw new Error(`https://svelte.dev/e/hydration_failed`);
	}
}

/**
 * Could not `{@render}` snippet due to the expression being `null` or `undefined`. Consider using optional chaining `{@render snippet?.()}`
 * @returns {never}
 */
function invalid_snippet() {
	if (esm_env__WEBPACK_IMPORTED_MODULE_0__.DEV) {
		const error = new Error(`invalid_snippet\nCould not \`{@render}\` snippet due to the expression being \`null\` or \`undefined\`. Consider using optional chaining \`{@render snippet?.()}\`\nhttps://svelte.dev/e/invalid_snippet`);

		error.name = 'Svelte error';

		throw error;
	} else {
		throw new Error(`https://svelte.dev/e/invalid_snippet`);
	}
}

/**
 * `%name%(...)` cannot be used in runes mode
 * @param {string} name
 * @returns {never}
 */
function lifecycle_legacy_only(name) {
	if (esm_env__WEBPACK_IMPORTED_MODULE_0__.DEV) {
		const error = new Error(`lifecycle_legacy_only\n\`${name}(...)\` cannot be used in runes mode\nhttps://svelte.dev/e/lifecycle_legacy_only`);

		error.name = 'Svelte error';

		throw error;
	} else {
		throw new Error(`https://svelte.dev/e/lifecycle_legacy_only`);
	}
}

/**
 * Cannot do `bind:%key%={undefined}` when `%key%` has a fallback value
 * @param {string} key
 * @returns {never}
 */
function props_invalid_value(key) {
	if (esm_env__WEBPACK_IMPORTED_MODULE_0__.DEV) {
		const error = new Error(`props_invalid_value\nCannot do \`bind:${key}={undefined}\` when \`${key}\` has a fallback value\nhttps://svelte.dev/e/props_invalid_value`);

		error.name = 'Svelte error';

		throw error;
	} else {
		throw new Error(`https://svelte.dev/e/props_invalid_value`);
	}
}

/**
 * Rest element properties of `$props()` such as `%property%` are readonly
 * @param {string} property
 * @returns {never}
 */
function props_rest_readonly(property) {
	if (esm_env__WEBPACK_IMPORTED_MODULE_0__.DEV) {
		const error = new Error(`props_rest_readonly\nRest element properties of \`$props()\` such as \`${property}\` are readonly\nhttps://svelte.dev/e/props_rest_readonly`);

		error.name = 'Svelte error';

		throw error;
	} else {
		throw new Error(`https://svelte.dev/e/props_rest_readonly`);
	}
}

/**
 * The `%rune%` rune is only available inside `.svelte` and `.svelte.js/ts` files
 * @param {string} rune
 * @returns {never}
 */
function rune_outside_svelte(rune) {
	if (esm_env__WEBPACK_IMPORTED_MODULE_0__.DEV) {
		const error = new Error(`rune_outside_svelte\nThe \`${rune}\` rune is only available inside \`.svelte\` and \`.svelte.js/ts\` files\nhttps://svelte.dev/e/rune_outside_svelte`);

		error.name = 'Svelte error';

		throw error;
	} else {
		throw new Error(`https://svelte.dev/e/rune_outside_svelte`);
	}
}

/**
 * Property descriptors defined on `$state` objects must contain `value` and always be `enumerable`, `configurable` and `writable`.
 * @returns {never}
 */
function state_descriptors_fixed() {
	if (esm_env__WEBPACK_IMPORTED_MODULE_0__.DEV) {
		const error = new Error(`state_descriptors_fixed\nProperty descriptors defined on \`$state\` objects must contain \`value\` and always be \`enumerable\`, \`configurable\` and \`writable\`.\nhttps://svelte.dev/e/state_descriptors_fixed`);

		error.name = 'Svelte error';

		throw error;
	} else {
		throw new Error(`https://svelte.dev/e/state_descriptors_fixed`);
	}
}

/**
 * Cannot set prototype of `$state` object
 * @returns {never}
 */
function state_prototype_fixed() {
	if (esm_env__WEBPACK_IMPORTED_MODULE_0__.DEV) {
		const error = new Error(`state_prototype_fixed\nCannot set prototype of \`$state\` object\nhttps://svelte.dev/e/state_prototype_fixed`);

		error.name = 'Svelte error';

		throw error;
	} else {
		throw new Error(`https://svelte.dev/e/state_prototype_fixed`);
	}
}

/**
 * Updating state inside `$derived(...)`, `$inspect(...)` or a template expression is forbidden. If the value should not be reactive, declare it without `$state`
 * @returns {never}
 */
function state_unsafe_mutation() {
	if (esm_env__WEBPACK_IMPORTED_MODULE_0__.DEV) {
		const error = new Error(`state_unsafe_mutation\nUpdating state inside \`$derived(...)\`, \`$inspect(...)\` or a template expression is forbidden. If the value should not be reactive, declare it without \`$state\`\nhttps://svelte.dev/e/state_unsafe_mutation`);

		error.name = 'Svelte error';

		throw error;
	} else {
		throw new Error(`https://svelte.dev/e/state_unsafe_mutation`);
	}
}

/**
 * A `<svelte:boundary>` `reset` function cannot be called while an error is still being handled
 * @returns {never}
 */
function svelte_boundary_reset_onerror() {
	if (esm_env__WEBPACK_IMPORTED_MODULE_0__.DEV) {
		const error = new Error(`svelte_boundary_reset_onerror\nA \`<svelte:boundary>\` \`reset\` function cannot be called while an error is still being handled\nhttps://svelte.dev/e/svelte_boundary_reset_onerror`);

		error.name = 'Svelte error';

		throw error;
	} else {
		throw new Error(`https://svelte.dev/e/svelte_boundary_reset_onerror`);
	}
}

/***/ },

/***/ "./node_modules/svelte/src/internal/client/hydratable.js"
/*!***************************************************************!*\
  !*** ./node_modules/svelte/src/internal/client/hydratable.js ***!
  \***************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   hydratable: () => (/* binding */ hydratable)
/* harmony export */ });
/* harmony import */ var _flags_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../flags/index.js */ "./node_modules/svelte/src/internal/flags/index.js");
/* harmony import */ var _dom_hydration_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom/hydration.js */ "./node_modules/svelte/src/internal/client/dom/hydration.js");
/* harmony import */ var _warnings_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./warnings.js */ "./node_modules/svelte/src/internal/client/warnings.js");
/* harmony import */ var _errors_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./errors.js */ "./node_modules/svelte/src/internal/client/errors.js");
/* harmony import */ var esm_env__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! esm-env */ "./node_modules/esm-env/index.js");






/**
 * @template T
 * @param {string} key
 * @param {() => T} fn
 * @returns {T}
 */
function hydratable(key, fn) {
	if (!_flags_index_js__WEBPACK_IMPORTED_MODULE_0__.async_mode_flag) {
		_errors_js__WEBPACK_IMPORTED_MODULE_3__.experimental_async_required('hydratable');
	}

	if (_dom_hydration_js__WEBPACK_IMPORTED_MODULE_1__.hydrating) {
		const store = window.__svelte?.h;

		if (store?.has(key)) {
			return /** @type {T} */ (store.get(key));
		}

		if (esm_env__WEBPACK_IMPORTED_MODULE_4__.DEV) {
			_errors_js__WEBPACK_IMPORTED_MODULE_3__.hydratable_missing_but_required(key);
		} else {
			_warnings_js__WEBPACK_IMPORTED_MODULE_2__.hydratable_missing_but_expected(key);
		}
	}

	return fn();
}


/***/ },

/***/ "./node_modules/svelte/src/internal/client/index.js"
/*!**********************************************************!*\
  !*** ./node_modules/svelte/src/internal/client/index.js ***!
  \**********************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CLASS: () => (/* reexport safe */ _dom_elements_attributes_js__WEBPACK_IMPORTED_MODULE_27__.CLASS),
/* harmony export */   FILENAME: () => (/* reexport safe */ _constants_js__WEBPACK_IMPORTED_MODULE_1__.FILENAME),
/* harmony export */   HMR: () => (/* reexport safe */ _constants_js__WEBPACK_IMPORTED_MODULE_1__.HMR),
/* harmony export */   NAMESPACE_SVG: () => (/* reexport safe */ _constants_js__WEBPACK_IMPORTED_MODULE_1__.NAMESPACE_SVG),
/* harmony export */   STYLE: () => (/* reexport safe */ _dom_elements_attributes_js__WEBPACK_IMPORTED_MODULE_27__.STYLE),
/* harmony export */   aborted: () => (/* reexport safe */ _reactivity_effects_js__WEBPACK_IMPORTED_MODULE_52__.aborted),
/* harmony export */   action: () => (/* reexport safe */ _dom_elements_actions_js__WEBPACK_IMPORTED_MODULE_25__.action),
/* harmony export */   active_effect: () => (/* reexport safe */ _runtime_js__WEBPACK_IMPORTED_MODULE_59__.active_effect),
/* harmony export */   add_legacy_event_listener: () => (/* reexport safe */ _dom_legacy_misc_js__WEBPACK_IMPORTED_MODULE_47__.add_legacy_event_listener),
/* harmony export */   add_locations: () => (/* reexport safe */ _dev_elements_js__WEBPACK_IMPORTED_MODULE_5__.add_locations),
/* harmony export */   add_svelte_meta: () => (/* reexport safe */ _context_js__WEBPACK_IMPORTED_MODULE_2__.add_svelte_meta),
/* harmony export */   animation: () => (/* reexport safe */ _dom_elements_transitions_js__WEBPACK_IMPORTED_MODULE_33__.animation),
/* harmony export */   append: () => (/* reexport safe */ _dom_template_js__WEBPACK_IMPORTED_MODULE_48__.append),
/* harmony export */   append_styles: () => (/* reexport safe */ _dom_css_js__WEBPACK_IMPORTED_MODULE_24__.append_styles),
/* harmony export */   apply: () => (/* reexport safe */ _dom_elements_events_js__WEBPACK_IMPORTED_MODULE_29__.apply),
/* harmony export */   assign: () => (/* reexport safe */ _dev_assign_js__WEBPACK_IMPORTED_MODULE_3__.assign),
/* harmony export */   assign_async: () => (/* reexport safe */ _dev_assign_js__WEBPACK_IMPORTED_MODULE_3__.assign_async),
/* harmony export */   async: () => (/* reexport safe */ _dom_blocks_async_js__WEBPACK_IMPORTED_MODULE_11__.async),
/* harmony export */   async_derived: () => (/* reexport safe */ _reactivity_deriveds_js__WEBPACK_IMPORTED_MODULE_51__.async_derived),
/* harmony export */   attach: () => (/* reexport safe */ _dom_elements_attachments_js__WEBPACK_IMPORTED_MODULE_26__.attach),
/* harmony export */   attachment: () => (/* reexport safe */ _attachments_index_js__WEBPACK_IMPORTED_MODULE_0__.createAttachmentKey),
/* harmony export */   attr: () => (/* reexport safe */ _shared_attributes_js__WEBPACK_IMPORTED_MODULE_65__.attr),
/* harmony export */   attribute_effect: () => (/* reexport safe */ _dom_elements_attributes_js__WEBPACK_IMPORTED_MODULE_27__.attribute_effect),
/* harmony export */   autofocus: () => (/* reexport safe */ _dom_elements_misc_js__WEBPACK_IMPORTED_MODULE_30__.autofocus),
/* harmony export */   "await": () => (/* reexport safe */ _dom_blocks_await_js__WEBPACK_IMPORTED_MODULE_13__.await_block),
/* harmony export */   bind_active_element: () => (/* reexport safe */ _dom_elements_bindings_document_js__WEBPACK_IMPORTED_MODULE_34__.bind_active_element),
/* harmony export */   bind_buffered: () => (/* reexport safe */ _dom_elements_bindings_media_js__WEBPACK_IMPORTED_MODULE_36__.bind_buffered),
/* harmony export */   bind_checked: () => (/* reexport safe */ _dom_elements_bindings_input_js__WEBPACK_IMPORTED_MODULE_35__.bind_checked),
/* harmony export */   bind_content_editable: () => (/* reexport safe */ _dom_elements_bindings_universal_js__WEBPACK_IMPORTED_MODULE_42__.bind_content_editable),
/* harmony export */   bind_current_time: () => (/* reexport safe */ _dom_elements_bindings_media_js__WEBPACK_IMPORTED_MODULE_36__.bind_current_time),
/* harmony export */   bind_element_size: () => (/* reexport safe */ _dom_elements_bindings_size_js__WEBPACK_IMPORTED_MODULE_40__.bind_element_size),
/* harmony export */   bind_ended: () => (/* reexport safe */ _dom_elements_bindings_media_js__WEBPACK_IMPORTED_MODULE_36__.bind_ended),
/* harmony export */   bind_files: () => (/* reexport safe */ _dom_elements_bindings_input_js__WEBPACK_IMPORTED_MODULE_35__.bind_files),
/* harmony export */   bind_focused: () => (/* reexport safe */ _dom_elements_bindings_universal_js__WEBPACK_IMPORTED_MODULE_42__.bind_focused),
/* harmony export */   bind_group: () => (/* reexport safe */ _dom_elements_bindings_input_js__WEBPACK_IMPORTED_MODULE_35__.bind_group),
/* harmony export */   bind_muted: () => (/* reexport safe */ _dom_elements_bindings_media_js__WEBPACK_IMPORTED_MODULE_36__.bind_muted),
/* harmony export */   bind_online: () => (/* reexport safe */ _dom_elements_bindings_navigator_js__WEBPACK_IMPORTED_MODULE_37__.bind_online),
/* harmony export */   bind_paused: () => (/* reexport safe */ _dom_elements_bindings_media_js__WEBPACK_IMPORTED_MODULE_36__.bind_paused),
/* harmony export */   bind_playback_rate: () => (/* reexport safe */ _dom_elements_bindings_media_js__WEBPACK_IMPORTED_MODULE_36__.bind_playback_rate),
/* harmony export */   bind_played: () => (/* reexport safe */ _dom_elements_bindings_media_js__WEBPACK_IMPORTED_MODULE_36__.bind_played),
/* harmony export */   bind_prop: () => (/* reexport safe */ _dom_elements_bindings_props_js__WEBPACK_IMPORTED_MODULE_38__.bind_prop),
/* harmony export */   bind_property: () => (/* reexport safe */ _dom_elements_bindings_universal_js__WEBPACK_IMPORTED_MODULE_42__.bind_property),
/* harmony export */   bind_ready_state: () => (/* reexport safe */ _dom_elements_bindings_media_js__WEBPACK_IMPORTED_MODULE_36__.bind_ready_state),
/* harmony export */   bind_resize_observer: () => (/* reexport safe */ _dom_elements_bindings_size_js__WEBPACK_IMPORTED_MODULE_40__.bind_resize_observer),
/* harmony export */   bind_seekable: () => (/* reexport safe */ _dom_elements_bindings_media_js__WEBPACK_IMPORTED_MODULE_36__.bind_seekable),
/* harmony export */   bind_seeking: () => (/* reexport safe */ _dom_elements_bindings_media_js__WEBPACK_IMPORTED_MODULE_36__.bind_seeking),
/* harmony export */   bind_select_value: () => (/* reexport safe */ _dom_elements_bindings_select_js__WEBPACK_IMPORTED_MODULE_39__.bind_select_value),
/* harmony export */   bind_this: () => (/* reexport safe */ _dom_elements_bindings_this_js__WEBPACK_IMPORTED_MODULE_41__.bind_this),
/* harmony export */   bind_value: () => (/* reexport safe */ _dom_elements_bindings_input_js__WEBPACK_IMPORTED_MODULE_35__.bind_value),
/* harmony export */   bind_volume: () => (/* reexport safe */ _dom_elements_bindings_media_js__WEBPACK_IMPORTED_MODULE_36__.bind_volume),
/* harmony export */   bind_window_scroll: () => (/* reexport safe */ _dom_elements_bindings_window_js__WEBPACK_IMPORTED_MODULE_43__.bind_window_scroll),
/* harmony export */   bind_window_size: () => (/* reexport safe */ _dom_elements_bindings_window_js__WEBPACK_IMPORTED_MODULE_43__.bind_window_size),
/* harmony export */   boundary: () => (/* reexport safe */ _dom_blocks_boundary_js__WEBPACK_IMPORTED_MODULE_56__.boundary),
/* harmony export */   bubble_event: () => (/* reexport safe */ _dom_legacy_misc_js__WEBPACK_IMPORTED_MODULE_47__.bubble_event),
/* harmony export */   check_target: () => (/* reexport safe */ _dev_legacy_js__WEBPACK_IMPORTED_MODULE_8__.check_target),
/* harmony export */   child: () => (/* reexport safe */ _dom_operations_js__WEBPACK_IMPORTED_MODULE_64__.child),
/* harmony export */   cleanup_styles: () => (/* reexport safe */ _dev_css_js__WEBPACK_IMPORTED_MODULE_4__.cleanup_styles),
/* harmony export */   clsx: () => (/* reexport safe */ _shared_attributes_js__WEBPACK_IMPORTED_MODULE_65__.clsx),
/* harmony export */   comment: () => (/* reexport safe */ _dom_template_js__WEBPACK_IMPORTED_MODULE_48__.comment),
/* harmony export */   component: () => (/* reexport safe */ _dom_blocks_svelte_component_js__WEBPACK_IMPORTED_MODULE_21__.component),
/* harmony export */   create_custom_element: () => (/* reexport safe */ _dom_elements_custom_element_js__WEBPACK_IMPORTED_MODULE_63__.create_custom_element),
/* harmony export */   create_ownership_validator: () => (/* reexport safe */ _dev_ownership_js__WEBPACK_IMPORTED_MODULE_7__.create_ownership_validator),
/* harmony export */   css_props: () => (/* reexport safe */ _dom_blocks_css_props_js__WEBPACK_IMPORTED_MODULE_16__.css_props),
/* harmony export */   customizable_select: () => (/* reexport safe */ _dom_elements_customizable_select_js__WEBPACK_IMPORTED_MODULE_31__.customizable_select),
/* harmony export */   deep_read: () => (/* reexport safe */ _runtime_js__WEBPACK_IMPORTED_MODULE_59__.deep_read),
/* harmony export */   deep_read_state: () => (/* reexport safe */ _runtime_js__WEBPACK_IMPORTED_MODULE_59__.deep_read_state),
/* harmony export */   deferred_template_effect: () => (/* reexport safe */ _reactivity_effects_js__WEBPACK_IMPORTED_MODULE_52__.deferred_template_effect),
/* harmony export */   delegate: () => (/* reexport safe */ _dom_elements_events_js__WEBPACK_IMPORTED_MODULE_29__.delegate),
/* harmony export */   delegated: () => (/* reexport safe */ _dom_elements_events_js__WEBPACK_IMPORTED_MODULE_29__.delegated),
/* harmony export */   derived: () => (/* reexport safe */ _reactivity_deriveds_js__WEBPACK_IMPORTED_MODULE_51__.user_derived),
/* harmony export */   derived_safe_equal: () => (/* reexport safe */ _reactivity_deriveds_js__WEBPACK_IMPORTED_MODULE_51__.derived_safe_equal),
/* harmony export */   document: () => (/* reexport safe */ _dom_operations_js__WEBPACK_IMPORTED_MODULE_64__.$document),
/* harmony export */   each: () => (/* reexport safe */ _dom_blocks_each_js__WEBPACK_IMPORTED_MODULE_17__.each),
/* harmony export */   eager: () => (/* reexport safe */ _reactivity_batch_js__WEBPACK_IMPORTED_MODULE_50__.eager),
/* harmony export */   effect: () => (/* reexport safe */ _reactivity_effects_js__WEBPACK_IMPORTED_MODULE_52__.effect),
/* harmony export */   effect_root: () => (/* reexport safe */ _reactivity_effects_js__WEBPACK_IMPORTED_MODULE_52__.effect_root),
/* harmony export */   effect_tracking: () => (/* reexport safe */ _reactivity_effects_js__WEBPACK_IMPORTED_MODULE_52__.effect_tracking),
/* harmony export */   element: () => (/* reexport safe */ _dom_blocks_svelte_element_js__WEBPACK_IMPORTED_MODULE_22__.element),
/* harmony export */   equals: () => (/* reexport safe */ _dev_equality_js__WEBPACK_IMPORTED_MODULE_69__.equals),
/* harmony export */   event: () => (/* reexport safe */ _dom_elements_events_js__WEBPACK_IMPORTED_MODULE_29__.event),
/* harmony export */   exclude_from_object: () => (/* reexport safe */ _shared_utils_js__WEBPACK_IMPORTED_MODULE_67__.exclude_from_object),
/* harmony export */   fallback: () => (/* reexport safe */ _shared_utils_js__WEBPACK_IMPORTED_MODULE_67__.fallback),
/* harmony export */   first_child: () => (/* reexport safe */ _dom_operations_js__WEBPACK_IMPORTED_MODULE_64__.first_child),
/* harmony export */   flush: () => (/* reexport safe */ _reactivity_batch_js__WEBPACK_IMPORTED_MODULE_50__.flushSync),
/* harmony export */   for_await_track_reactivity_loss: () => (/* reexport safe */ _reactivity_async_js__WEBPACK_IMPORTED_MODULE_49__.for_await_track_reactivity_loss),
/* harmony export */   from_html: () => (/* reexport safe */ _dom_template_js__WEBPACK_IMPORTED_MODULE_48__.from_html),
/* harmony export */   from_mathml: () => (/* reexport safe */ _dom_template_js__WEBPACK_IMPORTED_MODULE_48__.from_mathml),
/* harmony export */   from_svg: () => (/* reexport safe */ _dom_template_js__WEBPACK_IMPORTED_MODULE_48__.from_svg),
/* harmony export */   from_tree: () => (/* reexport safe */ _dom_template_js__WEBPACK_IMPORTED_MODULE_48__.from_tree),
/* harmony export */   get: () => (/* reexport safe */ _runtime_js__WEBPACK_IMPORTED_MODULE_59__.get),
/* harmony export */   head: () => (/* reexport safe */ _dom_blocks_svelte_head_js__WEBPACK_IMPORTED_MODULE_23__.head),
/* harmony export */   hmr: () => (/* reexport safe */ _dev_hmr_js__WEBPACK_IMPORTED_MODULE_6__.hmr),
/* harmony export */   html: () => (/* reexport safe */ _dom_blocks_html_js__WEBPACK_IMPORTED_MODULE_18__.html),
/* harmony export */   hydrate_template: () => (/* reexport safe */ _dom_hydration_js__WEBPACK_IMPORTED_MODULE_44__.hydrate_template),
/* harmony export */   "if": () => (/* reexport safe */ _dom_blocks_if_js__WEBPACK_IMPORTED_MODULE_14__.if_block),
/* harmony export */   index: () => (/* reexport safe */ _dom_blocks_each_js__WEBPACK_IMPORTED_MODULE_17__.index),
/* harmony export */   init: () => (/* reexport safe */ _dom_legacy_lifecycle_js__WEBPACK_IMPORTED_MODULE_46__.init),
/* harmony export */   init_select: () => (/* reexport safe */ _dom_elements_bindings_select_js__WEBPACK_IMPORTED_MODULE_39__.init_select),
/* harmony export */   inspect: () => (/* reexport safe */ _dev_inspect_js__WEBPACK_IMPORTED_MODULE_10__.inspect),
/* harmony export */   invalid_default_snippet: () => (/* reexport safe */ _shared_validate_js__WEBPACK_IMPORTED_MODULE_68__.invalid_default_snippet),
/* harmony export */   invalidate_inner_signals: () => (/* reexport safe */ _legacy_js__WEBPACK_IMPORTED_MODULE_57__.invalidate_inner_signals),
/* harmony export */   invalidate_store: () => (/* reexport safe */ _reactivity_store_js__WEBPACK_IMPORTED_MODULE_55__.invalidate_store),
/* harmony export */   key: () => (/* reexport safe */ _dom_blocks_key_js__WEBPACK_IMPORTED_MODULE_15__.key),
/* harmony export */   legacy_api: () => (/* reexport safe */ _dev_legacy_js__WEBPACK_IMPORTED_MODULE_8__.legacy_api),
/* harmony export */   legacy_pre_effect: () => (/* reexport safe */ _reactivity_effects_js__WEBPACK_IMPORTED_MODULE_52__.legacy_pre_effect),
/* harmony export */   legacy_pre_effect_reset: () => (/* reexport safe */ _reactivity_effects_js__WEBPACK_IMPORTED_MODULE_52__.legacy_pre_effect_reset),
/* harmony export */   legacy_rest_props: () => (/* reexport safe */ _reactivity_props_js__WEBPACK_IMPORTED_MODULE_54__.legacy_rest_props),
/* harmony export */   log_if_contains_state: () => (/* reexport safe */ _dev_console_log_js__WEBPACK_IMPORTED_MODULE_70__.log_if_contains_state),
/* harmony export */   mark_store_binding: () => (/* reexport safe */ _reactivity_store_js__WEBPACK_IMPORTED_MODULE_55__.mark_store_binding),
/* harmony export */   mutable_source: () => (/* reexport safe */ _reactivity_sources_js__WEBPACK_IMPORTED_MODULE_53__.mutable_source),
/* harmony export */   mutate: () => (/* reexport safe */ _reactivity_sources_js__WEBPACK_IMPORTED_MODULE_53__.mutate),
/* harmony export */   next: () => (/* reexport safe */ _dom_hydration_js__WEBPACK_IMPORTED_MODULE_44__.next),
/* harmony export */   noop: () => (/* reexport safe */ _shared_utils_js__WEBPACK_IMPORTED_MODULE_67__.noop),
/* harmony export */   once: () => (/* reexport safe */ _dom_legacy_event_modifiers_js__WEBPACK_IMPORTED_MODULE_45__.once),
/* harmony export */   only_child: () => (/* reexport safe */ _dom_operations_js__WEBPACK_IMPORTED_MODULE_64__.only_child),
/* harmony export */   pending: () => (/* reexport safe */ _dom_blocks_boundary_js__WEBPACK_IMPORTED_MODULE_56__.pending),
/* harmony export */   pop: () => (/* reexport safe */ _context_js__WEBPACK_IMPORTED_MODULE_2__.pop),
/* harmony export */   preventDefault: () => (/* reexport safe */ _dom_legacy_event_modifiers_js__WEBPACK_IMPORTED_MODULE_45__.preventDefault),
/* harmony export */   prevent_snippet_stringification: () => (/* reexport safe */ _shared_validate_js__WEBPACK_IMPORTED_MODULE_68__.prevent_snippet_stringification),
/* harmony export */   prop: () => (/* reexport safe */ _reactivity_props_js__WEBPACK_IMPORTED_MODULE_54__.prop),
/* harmony export */   props_id: () => (/* reexport safe */ _dom_template_js__WEBPACK_IMPORTED_MODULE_48__.props_id),
/* harmony export */   proxy: () => (/* reexport safe */ _proxy_js__WEBPACK_IMPORTED_MODULE_62__.proxy),
/* harmony export */   push: () => (/* reexport safe */ _context_js__WEBPACK_IMPORTED_MODULE_2__.push),
/* harmony export */   raf: () => (/* reexport safe */ _timing_js__WEBPACK_IMPORTED_MODULE_61__.raf),
/* harmony export */   reactive_import: () => (/* reexport safe */ _dom_legacy_misc_js__WEBPACK_IMPORTED_MODULE_47__.reactive_import),
/* harmony export */   remove_input_defaults: () => (/* reexport safe */ _dom_elements_attributes_js__WEBPACK_IMPORTED_MODULE_27__.remove_input_defaults),
/* harmony export */   remove_textarea_child: () => (/* reexport safe */ _dom_elements_misc_js__WEBPACK_IMPORTED_MODULE_30__.remove_textarea_child),
/* harmony export */   render_effect: () => (/* reexport safe */ _reactivity_effects_js__WEBPACK_IMPORTED_MODULE_52__.render_effect),
/* harmony export */   replay_events: () => (/* reexport safe */ _dom_elements_events_js__WEBPACK_IMPORTED_MODULE_29__.replay_events),
/* harmony export */   reset: () => (/* reexport safe */ _dom_hydration_js__WEBPACK_IMPORTED_MODULE_44__.reset),
/* harmony export */   rest_props: () => (/* reexport safe */ _reactivity_props_js__WEBPACK_IMPORTED_MODULE_54__.rest_props),
/* harmony export */   run: () => (/* reexport safe */ _reactivity_async_js__WEBPACK_IMPORTED_MODULE_49__.run),
/* harmony export */   run_after_blockers: () => (/* reexport safe */ _reactivity_async_js__WEBPACK_IMPORTED_MODULE_49__.run_after_blockers),
/* harmony export */   safe_get: () => (/* reexport safe */ _runtime_js__WEBPACK_IMPORTED_MODULE_59__.safe_get),
/* harmony export */   sanitize_slots: () => (/* reexport safe */ _dom_blocks_slot_js__WEBPACK_IMPORTED_MODULE_19__.sanitize_slots),
/* harmony export */   save: () => (/* reexport safe */ _reactivity_async_js__WEBPACK_IMPORTED_MODULE_49__.save),
/* harmony export */   select_option: () => (/* reexport safe */ _dom_elements_bindings_select_js__WEBPACK_IMPORTED_MODULE_39__.select_option),
/* harmony export */   selectedcontent: () => (/* reexport safe */ _dom_elements_customizable_select_js__WEBPACK_IMPORTED_MODULE_31__.selectedcontent),
/* harmony export */   self: () => (/* reexport safe */ _dom_legacy_event_modifiers_js__WEBPACK_IMPORTED_MODULE_45__.self),
/* harmony export */   set: () => (/* reexport safe */ _reactivity_sources_js__WEBPACK_IMPORTED_MODULE_53__.set),
/* harmony export */   set_attribute: () => (/* reexport safe */ _dom_elements_attributes_js__WEBPACK_IMPORTED_MODULE_27__.set_attribute),
/* harmony export */   set_checked: () => (/* reexport safe */ _dom_elements_attributes_js__WEBPACK_IMPORTED_MODULE_27__.set_checked),
/* harmony export */   set_class: () => (/* reexport safe */ _dom_elements_class_js__WEBPACK_IMPORTED_MODULE_28__.set_class),
/* harmony export */   set_custom_element_data: () => (/* reexport safe */ _dom_elements_attributes_js__WEBPACK_IMPORTED_MODULE_27__.set_custom_element_data),
/* harmony export */   set_default_checked: () => (/* reexport safe */ _dom_elements_attributes_js__WEBPACK_IMPORTED_MODULE_27__.set_default_checked),
/* harmony export */   set_default_select_value: () => (/* reexport safe */ _dom_elements_bindings_select_js__WEBPACK_IMPORTED_MODULE_39__.set_default_select_value),
/* harmony export */   set_default_value: () => (/* reexport safe */ _dom_elements_attributes_js__WEBPACK_IMPORTED_MODULE_27__.set_default_value),
/* harmony export */   set_selected: () => (/* reexport safe */ _dom_elements_bindings_select_js__WEBPACK_IMPORTED_MODULE_39__.set_selected),
/* harmony export */   set_style: () => (/* reexport safe */ _dom_elements_style_js__WEBPACK_IMPORTED_MODULE_32__.set_style),
/* harmony export */   set_text: () => (/* reexport safe */ _render_js__WEBPACK_IMPORTED_MODULE_58__.set_text),
/* harmony export */   set_value: () => (/* reexport safe */ _dom_elements_attributes_js__WEBPACK_IMPORTED_MODULE_27__.set_value),
/* harmony export */   set_xlink_attribute: () => (/* reexport safe */ _dom_elements_attributes_js__WEBPACK_IMPORTED_MODULE_27__.set_xlink_attribute),
/* harmony export */   setup_stores: () => (/* reexport safe */ _reactivity_store_js__WEBPACK_IMPORTED_MODULE_55__.setup_stores),
/* harmony export */   sibling: () => (/* reexport safe */ _dom_operations_js__WEBPACK_IMPORTED_MODULE_64__.sibling),
/* harmony export */   slot: () => (/* reexport safe */ _dom_blocks_slot_js__WEBPACK_IMPORTED_MODULE_19__.slot),
/* harmony export */   snapshot: () => (/* reexport safe */ _shared_clone_js__WEBPACK_IMPORTED_MODULE_66__.snapshot),
/* harmony export */   snippet: () => (/* reexport safe */ _dom_blocks_snippet_js__WEBPACK_IMPORTED_MODULE_20__.snippet),
/* harmony export */   spread_props: () => (/* reexport safe */ _reactivity_props_js__WEBPACK_IMPORTED_MODULE_54__.spread_props),
/* harmony export */   state: () => (/* reexport safe */ _reactivity_sources_js__WEBPACK_IMPORTED_MODULE_53__.state),
/* harmony export */   stopImmediatePropagation: () => (/* reexport safe */ _dom_legacy_event_modifiers_js__WEBPACK_IMPORTED_MODULE_45__.stopImmediatePropagation),
/* harmony export */   stopPropagation: () => (/* reexport safe */ _dom_legacy_event_modifiers_js__WEBPACK_IMPORTED_MODULE_45__.stopPropagation),
/* harmony export */   store_get: () => (/* reexport safe */ _reactivity_store_js__WEBPACK_IMPORTED_MODULE_55__.store_get),
/* harmony export */   store_mutate: () => (/* reexport safe */ _reactivity_store_js__WEBPACK_IMPORTED_MODULE_55__.store_mutate),
/* harmony export */   store_set: () => (/* reexport safe */ _reactivity_store_js__WEBPACK_IMPORTED_MODULE_55__.store_set),
/* harmony export */   store_unsub: () => (/* reexport safe */ _reactivity_store_js__WEBPACK_IMPORTED_MODULE_55__.store_unsub),
/* harmony export */   strict_equals: () => (/* reexport safe */ _dev_equality_js__WEBPACK_IMPORTED_MODULE_69__.strict_equals),
/* harmony export */   tag: () => (/* reexport safe */ _dev_tracing_js__WEBPACK_IMPORTED_MODULE_9__.tag),
/* harmony export */   tag_proxy: () => (/* reexport safe */ _dev_tracing_js__WEBPACK_IMPORTED_MODULE_9__.tag_proxy),
/* harmony export */   template_effect: () => (/* reexport safe */ _reactivity_effects_js__WEBPACK_IMPORTED_MODULE_52__.template_effect),
/* harmony export */   text: () => (/* reexport safe */ _dom_template_js__WEBPACK_IMPORTED_MODULE_48__.text),
/* harmony export */   tick: () => (/* reexport safe */ _runtime_js__WEBPACK_IMPORTED_MODULE_59__.tick),
/* harmony export */   to_array: () => (/* reexport safe */ _shared_utils_js__WEBPACK_IMPORTED_MODULE_67__.to_array),
/* harmony export */   trace: () => (/* reexport safe */ _dev_tracing_js__WEBPACK_IMPORTED_MODULE_9__.trace),
/* harmony export */   track_reactivity_loss: () => (/* reexport safe */ _reactivity_async_js__WEBPACK_IMPORTED_MODULE_49__.track_reactivity_loss),
/* harmony export */   transition: () => (/* reexport safe */ _dom_elements_transitions_js__WEBPACK_IMPORTED_MODULE_33__.transition),
/* harmony export */   trusted: () => (/* reexport safe */ _dom_legacy_event_modifiers_js__WEBPACK_IMPORTED_MODULE_45__.trusted),
/* harmony export */   unsave: () => (/* reexport safe */ _reactivity_async_js__WEBPACK_IMPORTED_MODULE_49__.unsave),
/* harmony export */   untrack: () => (/* reexport safe */ _runtime_js__WEBPACK_IMPORTED_MODULE_59__.untrack),
/* harmony export */   update: () => (/* reexport safe */ _reactivity_sources_js__WEBPACK_IMPORTED_MODULE_53__.update),
/* harmony export */   update_legacy_props: () => (/* reexport safe */ _dom_legacy_misc_js__WEBPACK_IMPORTED_MODULE_47__.update_legacy_props),
/* harmony export */   update_pre: () => (/* reexport safe */ _reactivity_sources_js__WEBPACK_IMPORTED_MODULE_53__.update_pre),
/* harmony export */   update_pre_prop: () => (/* reexport safe */ _reactivity_props_js__WEBPACK_IMPORTED_MODULE_54__.update_pre_prop),
/* harmony export */   update_pre_store: () => (/* reexport safe */ _reactivity_store_js__WEBPACK_IMPORTED_MODULE_55__.update_pre_store),
/* harmony export */   update_prop: () => (/* reexport safe */ _reactivity_props_js__WEBPACK_IMPORTED_MODULE_54__.update_prop),
/* harmony export */   update_store: () => (/* reexport safe */ _reactivity_store_js__WEBPACK_IMPORTED_MODULE_55__.update_store),
/* harmony export */   user_effect: () => (/* reexport safe */ _reactivity_effects_js__WEBPACK_IMPORTED_MODULE_52__.user_effect),
/* harmony export */   user_pre_effect: () => (/* reexport safe */ _reactivity_effects_js__WEBPACK_IMPORTED_MODULE_52__.user_pre_effect),
/* harmony export */   validate_binding: () => (/* reexport safe */ _validate_js__WEBPACK_IMPORTED_MODULE_60__.validate_binding),
/* harmony export */   validate_dynamic_element_tag: () => (/* reexport safe */ _shared_validate_js__WEBPACK_IMPORTED_MODULE_68__.validate_dynamic_element_tag),
/* harmony export */   validate_snippet_args: () => (/* reexport safe */ _dev_validation_js__WEBPACK_IMPORTED_MODULE_12__.validate_snippet_args),
/* harmony export */   validate_store: () => (/* reexport safe */ _shared_validate_js__WEBPACK_IMPORTED_MODULE_68__.validate_store),
/* harmony export */   validate_void_dynamic_element: () => (/* reexport safe */ _shared_validate_js__WEBPACK_IMPORTED_MODULE_68__.validate_void_dynamic_element),
/* harmony export */   wait: () => (/* reexport safe */ _reactivity_async_js__WEBPACK_IMPORTED_MODULE_49__.wait),
/* harmony export */   window: () => (/* reexport safe */ _dom_operations_js__WEBPACK_IMPORTED_MODULE_64__.$window),
/* harmony export */   with_script: () => (/* reexport safe */ _dom_template_js__WEBPACK_IMPORTED_MODULE_48__.with_script),
/* harmony export */   wrap_snippet: () => (/* reexport safe */ _dom_blocks_snippet_js__WEBPACK_IMPORTED_MODULE_20__.wrap_snippet)
/* harmony export */ });
/* harmony import */ var _attachments_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../attachments/index.js */ "./node_modules/svelte/src/attachments/index.js");
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../constants.js */ "./node_modules/svelte/src/constants.js");
/* harmony import */ var _context_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./context.js */ "./node_modules/svelte/src/internal/client/context.js");
/* harmony import */ var _dev_assign_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dev/assign.js */ "./node_modules/svelte/src/internal/client/dev/assign.js");
/* harmony import */ var _dev_css_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./dev/css.js */ "./node_modules/svelte/src/internal/client/dev/css.js");
/* harmony import */ var _dev_elements_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./dev/elements.js */ "./node_modules/svelte/src/internal/client/dev/elements.js");
/* harmony import */ var _dev_hmr_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./dev/hmr.js */ "./node_modules/svelte/src/internal/client/dev/hmr.js");
/* harmony import */ var _dev_ownership_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./dev/ownership.js */ "./node_modules/svelte/src/internal/client/dev/ownership.js");
/* harmony import */ var _dev_legacy_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./dev/legacy.js */ "./node_modules/svelte/src/internal/client/dev/legacy.js");
/* harmony import */ var _dev_tracing_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./dev/tracing.js */ "./node_modules/svelte/src/internal/client/dev/tracing.js");
/* harmony import */ var _dev_inspect_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./dev/inspect.js */ "./node_modules/svelte/src/internal/client/dev/inspect.js");
/* harmony import */ var _dom_blocks_async_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./dom/blocks/async.js */ "./node_modules/svelte/src/internal/client/dom/blocks/async.js");
/* harmony import */ var _dev_validation_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./dev/validation.js */ "./node_modules/svelte/src/internal/client/dev/validation.js");
/* harmony import */ var _dom_blocks_await_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./dom/blocks/await.js */ "./node_modules/svelte/src/internal/client/dom/blocks/await.js");
/* harmony import */ var _dom_blocks_if_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./dom/blocks/if.js */ "./node_modules/svelte/src/internal/client/dom/blocks/if.js");
/* harmony import */ var _dom_blocks_key_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./dom/blocks/key.js */ "./node_modules/svelte/src/internal/client/dom/blocks/key.js");
/* harmony import */ var _dom_blocks_css_props_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./dom/blocks/css-props.js */ "./node_modules/svelte/src/internal/client/dom/blocks/css-props.js");
/* harmony import */ var _dom_blocks_each_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./dom/blocks/each.js */ "./node_modules/svelte/src/internal/client/dom/blocks/each.js");
/* harmony import */ var _dom_blocks_html_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./dom/blocks/html.js */ "./node_modules/svelte/src/internal/client/dom/blocks/html.js");
/* harmony import */ var _dom_blocks_slot_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./dom/blocks/slot.js */ "./node_modules/svelte/src/internal/client/dom/blocks/slot.js");
/* harmony import */ var _dom_blocks_snippet_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./dom/blocks/snippet.js */ "./node_modules/svelte/src/internal/client/dom/blocks/snippet.js");
/* harmony import */ var _dom_blocks_svelte_component_js__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./dom/blocks/svelte-component.js */ "./node_modules/svelte/src/internal/client/dom/blocks/svelte-component.js");
/* harmony import */ var _dom_blocks_svelte_element_js__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./dom/blocks/svelte-element.js */ "./node_modules/svelte/src/internal/client/dom/blocks/svelte-element.js");
/* harmony import */ var _dom_blocks_svelte_head_js__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./dom/blocks/svelte-head.js */ "./node_modules/svelte/src/internal/client/dom/blocks/svelte-head.js");
/* harmony import */ var _dom_css_js__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./dom/css.js */ "./node_modules/svelte/src/internal/client/dom/css.js");
/* harmony import */ var _dom_elements_actions_js__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./dom/elements/actions.js */ "./node_modules/svelte/src/internal/client/dom/elements/actions.js");
/* harmony import */ var _dom_elements_attachments_js__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./dom/elements/attachments.js */ "./node_modules/svelte/src/internal/client/dom/elements/attachments.js");
/* harmony import */ var _dom_elements_attributes_js__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./dom/elements/attributes.js */ "./node_modules/svelte/src/internal/client/dom/elements/attributes.js");
/* harmony import */ var _dom_elements_class_js__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./dom/elements/class.js */ "./node_modules/svelte/src/internal/client/dom/elements/class.js");
/* harmony import */ var _dom_elements_events_js__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./dom/elements/events.js */ "./node_modules/svelte/src/internal/client/dom/elements/events.js");
/* harmony import */ var _dom_elements_misc_js__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./dom/elements/misc.js */ "./node_modules/svelte/src/internal/client/dom/elements/misc.js");
/* harmony import */ var _dom_elements_customizable_select_js__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./dom/elements/customizable-select.js */ "./node_modules/svelte/src/internal/client/dom/elements/customizable-select.js");
/* harmony import */ var _dom_elements_style_js__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./dom/elements/style.js */ "./node_modules/svelte/src/internal/client/dom/elements/style.js");
/* harmony import */ var _dom_elements_transitions_js__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./dom/elements/transitions.js */ "./node_modules/svelte/src/internal/client/dom/elements/transitions.js");
/* harmony import */ var _dom_elements_bindings_document_js__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./dom/elements/bindings/document.js */ "./node_modules/svelte/src/internal/client/dom/elements/bindings/document.js");
/* harmony import */ var _dom_elements_bindings_input_js__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ./dom/elements/bindings/input.js */ "./node_modules/svelte/src/internal/client/dom/elements/bindings/input.js");
/* harmony import */ var _dom_elements_bindings_media_js__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ./dom/elements/bindings/media.js */ "./node_modules/svelte/src/internal/client/dom/elements/bindings/media.js");
/* harmony import */ var _dom_elements_bindings_navigator_js__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! ./dom/elements/bindings/navigator.js */ "./node_modules/svelte/src/internal/client/dom/elements/bindings/navigator.js");
/* harmony import */ var _dom_elements_bindings_props_js__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! ./dom/elements/bindings/props.js */ "./node_modules/svelte/src/internal/client/dom/elements/bindings/props.js");
/* harmony import */ var _dom_elements_bindings_select_js__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! ./dom/elements/bindings/select.js */ "./node_modules/svelte/src/internal/client/dom/elements/bindings/select.js");
/* harmony import */ var _dom_elements_bindings_size_js__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! ./dom/elements/bindings/size.js */ "./node_modules/svelte/src/internal/client/dom/elements/bindings/size.js");
/* harmony import */ var _dom_elements_bindings_this_js__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(/*! ./dom/elements/bindings/this.js */ "./node_modules/svelte/src/internal/client/dom/elements/bindings/this.js");
/* harmony import */ var _dom_elements_bindings_universal_js__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(/*! ./dom/elements/bindings/universal.js */ "./node_modules/svelte/src/internal/client/dom/elements/bindings/universal.js");
/* harmony import */ var _dom_elements_bindings_window_js__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(/*! ./dom/elements/bindings/window.js */ "./node_modules/svelte/src/internal/client/dom/elements/bindings/window.js");
/* harmony import */ var _dom_hydration_js__WEBPACK_IMPORTED_MODULE_44__ = __webpack_require__(/*! ./dom/hydration.js */ "./node_modules/svelte/src/internal/client/dom/hydration.js");
/* harmony import */ var _dom_legacy_event_modifiers_js__WEBPACK_IMPORTED_MODULE_45__ = __webpack_require__(/*! ./dom/legacy/event-modifiers.js */ "./node_modules/svelte/src/internal/client/dom/legacy/event-modifiers.js");
/* harmony import */ var _dom_legacy_lifecycle_js__WEBPACK_IMPORTED_MODULE_46__ = __webpack_require__(/*! ./dom/legacy/lifecycle.js */ "./node_modules/svelte/src/internal/client/dom/legacy/lifecycle.js");
/* harmony import */ var _dom_legacy_misc_js__WEBPACK_IMPORTED_MODULE_47__ = __webpack_require__(/*! ./dom/legacy/misc.js */ "./node_modules/svelte/src/internal/client/dom/legacy/misc.js");
/* harmony import */ var _dom_template_js__WEBPACK_IMPORTED_MODULE_48__ = __webpack_require__(/*! ./dom/template.js */ "./node_modules/svelte/src/internal/client/dom/template.js");
/* harmony import */ var _reactivity_async_js__WEBPACK_IMPORTED_MODULE_49__ = __webpack_require__(/*! ./reactivity/async.js */ "./node_modules/svelte/src/internal/client/reactivity/async.js");
/* harmony import */ var _reactivity_batch_js__WEBPACK_IMPORTED_MODULE_50__ = __webpack_require__(/*! ./reactivity/batch.js */ "./node_modules/svelte/src/internal/client/reactivity/batch.js");
/* harmony import */ var _reactivity_deriveds_js__WEBPACK_IMPORTED_MODULE_51__ = __webpack_require__(/*! ./reactivity/deriveds.js */ "./node_modules/svelte/src/internal/client/reactivity/deriveds.js");
/* harmony import */ var _reactivity_effects_js__WEBPACK_IMPORTED_MODULE_52__ = __webpack_require__(/*! ./reactivity/effects.js */ "./node_modules/svelte/src/internal/client/reactivity/effects.js");
/* harmony import */ var _reactivity_sources_js__WEBPACK_IMPORTED_MODULE_53__ = __webpack_require__(/*! ./reactivity/sources.js */ "./node_modules/svelte/src/internal/client/reactivity/sources.js");
/* harmony import */ var _reactivity_props_js__WEBPACK_IMPORTED_MODULE_54__ = __webpack_require__(/*! ./reactivity/props.js */ "./node_modules/svelte/src/internal/client/reactivity/props.js");
/* harmony import */ var _reactivity_store_js__WEBPACK_IMPORTED_MODULE_55__ = __webpack_require__(/*! ./reactivity/store.js */ "./node_modules/svelte/src/internal/client/reactivity/store.js");
/* harmony import */ var _dom_blocks_boundary_js__WEBPACK_IMPORTED_MODULE_56__ = __webpack_require__(/*! ./dom/blocks/boundary.js */ "./node_modules/svelte/src/internal/client/dom/blocks/boundary.js");
/* harmony import */ var _legacy_js__WEBPACK_IMPORTED_MODULE_57__ = __webpack_require__(/*! ./legacy.js */ "./node_modules/svelte/src/internal/client/legacy.js");
/* harmony import */ var _render_js__WEBPACK_IMPORTED_MODULE_58__ = __webpack_require__(/*! ./render.js */ "./node_modules/svelte/src/internal/client/render.js");
/* harmony import */ var _runtime_js__WEBPACK_IMPORTED_MODULE_59__ = __webpack_require__(/*! ./runtime.js */ "./node_modules/svelte/src/internal/client/runtime.js");
/* harmony import */ var _validate_js__WEBPACK_IMPORTED_MODULE_60__ = __webpack_require__(/*! ./validate.js */ "./node_modules/svelte/src/internal/client/validate.js");
/* harmony import */ var _timing_js__WEBPACK_IMPORTED_MODULE_61__ = __webpack_require__(/*! ./timing.js */ "./node_modules/svelte/src/internal/client/timing.js");
/* harmony import */ var _proxy_js__WEBPACK_IMPORTED_MODULE_62__ = __webpack_require__(/*! ./proxy.js */ "./node_modules/svelte/src/internal/client/proxy.js");
/* harmony import */ var _dom_elements_custom_element_js__WEBPACK_IMPORTED_MODULE_63__ = __webpack_require__(/*! ./dom/elements/custom-element.js */ "./node_modules/svelte/src/internal/client/dom/elements/custom-element.js");
/* harmony import */ var _dom_operations_js__WEBPACK_IMPORTED_MODULE_64__ = __webpack_require__(/*! ./dom/operations.js */ "./node_modules/svelte/src/internal/client/dom/operations.js");
/* harmony import */ var _shared_attributes_js__WEBPACK_IMPORTED_MODULE_65__ = __webpack_require__(/*! ../shared/attributes.js */ "./node_modules/svelte/src/internal/shared/attributes.js");
/* harmony import */ var _shared_clone_js__WEBPACK_IMPORTED_MODULE_66__ = __webpack_require__(/*! ../shared/clone.js */ "./node_modules/svelte/src/internal/shared/clone.js");
/* harmony import */ var _shared_utils_js__WEBPACK_IMPORTED_MODULE_67__ = __webpack_require__(/*! ../shared/utils.js */ "./node_modules/svelte/src/internal/shared/utils.js");
/* harmony import */ var _shared_validate_js__WEBPACK_IMPORTED_MODULE_68__ = __webpack_require__(/*! ../shared/validate.js */ "./node_modules/svelte/src/internal/shared/validate.js");
/* harmony import */ var _dev_equality_js__WEBPACK_IMPORTED_MODULE_69__ = __webpack_require__(/*! ./dev/equality.js */ "./node_modules/svelte/src/internal/client/dev/equality.js");
/* harmony import */ var _dev_console_log_js__WEBPACK_IMPORTED_MODULE_70__ = __webpack_require__(/*! ./dev/console-log.js */ "./node_modules/svelte/src/internal/client/dev/console-log.js");









































































/***/ },

/***/ "./node_modules/svelte/src/internal/client/legacy.js"
/*!***********************************************************!*\
  !*** ./node_modules/svelte/src/internal/client/legacy.js ***!
  \***********************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   captured_signals: () => (/* binding */ captured_signals),
/* harmony export */   invalidate_inner_signals: () => (/* binding */ invalidate_inner_signals)
/* harmony export */ });
/* harmony import */ var _reactivity_sources_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./reactivity/sources.js */ "./node_modules/svelte/src/internal/client/reactivity/sources.js");
/* harmony import */ var _runtime_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./runtime.js */ "./node_modules/svelte/src/internal/client/runtime.js");
/** @import { Value } from '#client' */



/**
 * @type {Set<Value> | null}
 * @deprecated
 */
let captured_signals = null;

/**
 * Capture an array of all the signals that are read when `fn` is called
 * @template T
 * @param {() => T} fn
 */
function capture_signals(fn) {
	var previous_captured_signals = captured_signals;

	try {
		captured_signals = new Set();

		(0,_runtime_js__WEBPACK_IMPORTED_MODULE_1__.untrack)(fn);

		if (previous_captured_signals !== null) {
			for (var signal of captured_signals) {
				previous_captured_signals.add(signal);
			}
		}

		return captured_signals;
	} finally {
		captured_signals = previous_captured_signals;
	}
}

/**
 * Invokes a function and captures all signals that are read during the invocation,
 * then invalidates them.
 * @param {() => any} fn
 * @deprecated
 */
function invalidate_inner_signals(fn) {
	for (var signal of capture_signals(fn)) {
		;(0,_reactivity_sources_js__WEBPACK_IMPORTED_MODULE_0__.internal_set)(signal, signal.v);
	}
}


/***/ },

/***/ "./node_modules/svelte/src/internal/client/loop.js"
/*!*********************************************************!*\
  !*** ./node_modules/svelte/src/internal/client/loop.js ***!
  \*********************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   loop: () => (/* binding */ loop)
/* harmony export */ });
/* harmony import */ var _timing_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./timing.js */ "./node_modules/svelte/src/internal/client/timing.js");
/** @import { TaskCallback, Task, TaskEntry } from '#client' */


// TODO move this into timing.js where it probably belongs

/**
 * @returns {void}
 */
function run_tasks() {
	// use `raf.now()` instead of the `requestAnimationFrame` callback argument, because
	// otherwise things can get wonky https://github.com/sveltejs/svelte/pull/14541
	const now = _timing_js__WEBPACK_IMPORTED_MODULE_0__.raf.now();

	_timing_js__WEBPACK_IMPORTED_MODULE_0__.raf.tasks.forEach((task) => {
		if (!task.c(now)) {
			_timing_js__WEBPACK_IMPORTED_MODULE_0__.raf.tasks.delete(task);
			task.f();
		}
	});

	if (_timing_js__WEBPACK_IMPORTED_MODULE_0__.raf.tasks.size !== 0) {
		_timing_js__WEBPACK_IMPORTED_MODULE_0__.raf.tick(run_tasks);
	}
}

/**
 * Creates a new task that runs on each raf frame
 * until it returns a falsy value or is aborted
 * @param {TaskCallback} callback
 * @returns {Task}
 */
function loop(callback) {
	/** @type {TaskEntry} */
	let task;

	if (_timing_js__WEBPACK_IMPORTED_MODULE_0__.raf.tasks.size === 0) {
		_timing_js__WEBPACK_IMPORTED_MODULE_0__.raf.tick(run_tasks);
	}

	return {
		promise: new Promise((fulfill) => {
			_timing_js__WEBPACK_IMPORTED_MODULE_0__.raf.tasks.add((task = { c: callback, f: fulfill }));
		}),
		abort() {
			_timing_js__WEBPACK_IMPORTED_MODULE_0__.raf.tasks.delete(task);
		}
	};
}


/***/ },

/***/ "./node_modules/svelte/src/internal/client/proxy.js"
/*!**********************************************************!*\
  !*** ./node_modules/svelte/src/internal/client/proxy.js ***!
  \**********************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   get_proxied_value: () => (/* binding */ get_proxied_value),
/* harmony export */   is: () => (/* binding */ is),
/* harmony export */   proxy: () => (/* binding */ proxy)
/* harmony export */ });
/* harmony import */ var esm_env__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! esm-env */ "./node_modules/esm-env/index.js");
/* harmony import */ var _runtime_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./runtime.js */ "./node_modules/svelte/src/internal/client/runtime.js");
/* harmony import */ var _shared_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/utils.js */ "./node_modules/svelte/src/internal/shared/utils.js");
/* harmony import */ var _reactivity_sources_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./reactivity/sources.js */ "./node_modules/svelte/src/internal/client/reactivity/sources.js");
/* harmony import */ var _client_constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! #client/constants */ "./node_modules/svelte/src/internal/client/constants.js");
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../constants.js */ "./node_modules/svelte/src/constants.js");
/* harmony import */ var _errors_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./errors.js */ "./node_modules/svelte/src/internal/client/errors.js");
/* harmony import */ var _dev_tracing_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./dev/tracing.js */ "./node_modules/svelte/src/internal/client/dev/tracing.js");
/* harmony import */ var _shared_dev_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../shared/dev.js */ "./node_modules/svelte/src/internal/shared/dev.js");
/* harmony import */ var _flags_index_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../flags/index.js */ "./node_modules/svelte/src/internal/flags/index.js");
/** @import { Source } from '#client' */











// TODO move all regexes into shared module?
const regex_is_valid_identifier = /^[a-zA-Z_$][a-zA-Z_$0-9]*$/;

/**
 * @template T
 * @param {T} value
 * @returns {T}
 */
function proxy(value) {
	// if non-proxyable, a component instance, or already a proxy, return `value`
	if (
		typeof value !== 'object' ||
		value === null ||
		_client_constants__WEBPACK_IMPORTED_MODULE_4__.STATE_SYMBOL in value ||
		_client_constants__WEBPACK_IMPORTED_MODULE_4__.COMPONENT_SYMBOL in value
	) {
		return value;
	}

	const prototype = (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_2__.get_prototype_of)(value);

	if (prototype !== _shared_utils_js__WEBPACK_IMPORTED_MODULE_2__.object_prototype && prototype !== _shared_utils_js__WEBPACK_IMPORTED_MODULE_2__.array_prototype) {
		return value;
	}

	/** @type {Map<any, Source<any>>} */
	var sources = new Map();
	var is_proxied_array = (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_2__.is_array)(value);
	var version = (0,_reactivity_sources_js__WEBPACK_IMPORTED_MODULE_3__.state)(0);

	var stack = esm_env__WEBPACK_IMPORTED_MODULE_0__.DEV && _flags_index_js__WEBPACK_IMPORTED_MODULE_9__.tracing_mode_flag ? (0,_shared_dev_js__WEBPACK_IMPORTED_MODULE_8__.get_error)('created at') : null;
	var parent_version = _runtime_js__WEBPACK_IMPORTED_MODULE_1__.update_version;

	/**
	 * Executes the proxy in the context of the reaction it was originally created in, if any
	 * @template T
	 * @param {() => T} fn
	 */
	var with_parent = (fn) => {
		if (_runtime_js__WEBPACK_IMPORTED_MODULE_1__.update_version === parent_version) {
			return fn();
		}

		// child source is being created after the initial proxy —
		// prevent it from being associated with the current reaction
		var reaction = _runtime_js__WEBPACK_IMPORTED_MODULE_1__.active_reaction;
		var version = _runtime_js__WEBPACK_IMPORTED_MODULE_1__.update_version;

		(0,_runtime_js__WEBPACK_IMPORTED_MODULE_1__.set_active_reaction)(null);
		(0,_runtime_js__WEBPACK_IMPORTED_MODULE_1__.set_update_version)(parent_version);

		var result = fn();

		(0,_runtime_js__WEBPACK_IMPORTED_MODULE_1__.set_active_reaction)(reaction);
		(0,_runtime_js__WEBPACK_IMPORTED_MODULE_1__.set_update_version)(version);

		return result;
	};

	if (is_proxied_array) {
		// We need to create the length source eagerly to ensure that
		// mutations to the array are properly synced with our proxy
		sources.set('length', (0,_reactivity_sources_js__WEBPACK_IMPORTED_MODULE_3__.state)(/** @type {any[]} */ (value).length, stack));
		if (esm_env__WEBPACK_IMPORTED_MODULE_0__.DEV) {
			value = /** @type {any} */ (inspectable_array(/** @type {any[]} */ (value)));
		}
	}

	/** Used in dev for $inspect.trace() */
	var path = '';
	let updating = false;
	/** @param {string} new_path */
	function update_path(new_path) {
		if (updating) return;
		updating = true;
		path = new_path;

		(0,_dev_tracing_js__WEBPACK_IMPORTED_MODULE_7__.tag)(version, `${path} version`);

		// rename all child sources and child proxies
		for (const [prop, source] of sources) {
			(0,_dev_tracing_js__WEBPACK_IMPORTED_MODULE_7__.tag)(source, get_label(path, prop));
		}
		updating = false;
	}

	return new Proxy(/** @type {any} */ (value), {
		defineProperty(_, prop, descriptor) {
			if (
				!('value' in descriptor) ||
				descriptor.configurable === false ||
				descriptor.enumerable === false ||
				descriptor.writable === false
			) {
				// we disallow non-basic descriptors, because unless they are applied to the
				// target object — which we avoid, so that state can be forked — we will run
				// afoul of the various invariants
				// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/getOwnPropertyDescriptor#invariants
				_errors_js__WEBPACK_IMPORTED_MODULE_6__.state_descriptors_fixed();
			}
			var s = sources.get(prop);
			if (s === undefined) {
				with_parent(() => {
					var s = (0,_reactivity_sources_js__WEBPACK_IMPORTED_MODULE_3__.state)(descriptor.value, stack);
					sources.set(prop, s);
					if (esm_env__WEBPACK_IMPORTED_MODULE_0__.DEV && typeof prop === 'string') {
						(0,_dev_tracing_js__WEBPACK_IMPORTED_MODULE_7__.tag)(s, get_label(path, prop));
					}
					return s;
				});
			} else {
				(0,_reactivity_sources_js__WEBPACK_IMPORTED_MODULE_3__.set)(s, descriptor.value, true);
			}

			return true;
		},

		deleteProperty(target, prop) {
			var s = sources.get(prop);

			if (s === undefined) {
				if (prop in target) {
					const s = with_parent(() => (0,_reactivity_sources_js__WEBPACK_IMPORTED_MODULE_3__.state)(_constants_js__WEBPACK_IMPORTED_MODULE_5__.UNINITIALIZED, stack));
					sources.set(prop, s);
					(0,_reactivity_sources_js__WEBPACK_IMPORTED_MODULE_3__.increment)(version);

					if (esm_env__WEBPACK_IMPORTED_MODULE_0__.DEV) {
						(0,_dev_tracing_js__WEBPACK_IMPORTED_MODULE_7__.tag)(s, get_label(path, prop));
					}
				}
			} else {
				(0,_reactivity_sources_js__WEBPACK_IMPORTED_MODULE_3__.set)(s, _constants_js__WEBPACK_IMPORTED_MODULE_5__.UNINITIALIZED);
				(0,_reactivity_sources_js__WEBPACK_IMPORTED_MODULE_3__.increment)(version);
			}

			return true;
		},

		get(target, prop, receiver) {
			if (prop === _client_constants__WEBPACK_IMPORTED_MODULE_4__.STATE_SYMBOL) {
				return value;
			}

			if (esm_env__WEBPACK_IMPORTED_MODULE_0__.DEV && prop === _client_constants__WEBPACK_IMPORTED_MODULE_4__.PROXY_PATH_SYMBOL) {
				return update_path;
			}

			var s = sources.get(prop);
			var exists = prop in target;

			// create a source, but only if it's an own property and not a prototype property
			if (s === undefined && (!exists || (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_2__.get_descriptor)(target, prop)?.writable)) {
				s = with_parent(() => {
					var p = proxy(exists ? target[prop] : _constants_js__WEBPACK_IMPORTED_MODULE_5__.UNINITIALIZED);
					var s = (0,_reactivity_sources_js__WEBPACK_IMPORTED_MODULE_3__.state)(p, stack);

					if (esm_env__WEBPACK_IMPORTED_MODULE_0__.DEV) {
						(0,_dev_tracing_js__WEBPACK_IMPORTED_MODULE_7__.tag)(s, get_label(path, prop));
					}

					return s;
				});

				sources.set(prop, s);
			}

			if (s !== undefined) {
				var v = (0,_runtime_js__WEBPACK_IMPORTED_MODULE_1__.get)(s);
				return v === _constants_js__WEBPACK_IMPORTED_MODULE_5__.UNINITIALIZED ? undefined : v;
			}

			return Reflect.get(target, prop, receiver);
		},

		getOwnPropertyDescriptor(target, prop) {
			this.has?.(target, prop);

			var descriptor = Reflect.getOwnPropertyDescriptor(target, prop);
			var s = sources.get(prop);

			if (s !== undefined) {
				var value = (0,_runtime_js__WEBPACK_IMPORTED_MODULE_1__.get)(s);

				if (value === _constants_js__WEBPACK_IMPORTED_MODULE_5__.UNINITIALIZED) {
					return undefined;
				}

				if (descriptor && 'value' in descriptor) {
					descriptor.value = value;
				} else {
					return {
						enumerable: true,
						configurable: true,
						value,
						writable: true
					};
				}
			}

			return descriptor;
		},

		has(target, prop) {
			if (prop === _client_constants__WEBPACK_IMPORTED_MODULE_4__.STATE_SYMBOL) {
				return true;
			}

			var s = sources.get(prop);
			var has = (s !== undefined && s.v !== _constants_js__WEBPACK_IMPORTED_MODULE_5__.UNINITIALIZED) || Reflect.has(target, prop);

			if (
				s !== undefined ||
				(_runtime_js__WEBPACK_IMPORTED_MODULE_1__.active_effect !== null && (!has || (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_2__.get_descriptor)(target, prop)?.writable))
			) {
				if (s === undefined) {
					s = with_parent(() => {
						var p = has ? proxy(target[prop]) : _constants_js__WEBPACK_IMPORTED_MODULE_5__.UNINITIALIZED;
						var s = (0,_reactivity_sources_js__WEBPACK_IMPORTED_MODULE_3__.state)(p, stack);

						if (esm_env__WEBPACK_IMPORTED_MODULE_0__.DEV) {
							(0,_dev_tracing_js__WEBPACK_IMPORTED_MODULE_7__.tag)(s, get_label(path, prop));
						}

						return s;
					});

					sources.set(prop, s);
				}

				var value = (0,_runtime_js__WEBPACK_IMPORTED_MODULE_1__.get)(s);
				if (value === _constants_js__WEBPACK_IMPORTED_MODULE_5__.UNINITIALIZED) {
					return false;
				}
			}

			return has;
		},

		set(target, prop, value, receiver) {
			var s = sources.get(prop);
			var has = prop in target;

			// variable.length = value -> clear all signals with index >= value
			if (is_proxied_array && prop === 'length') {
				for (var i = value; i < /** @type {Source<number>} */ (s).v; i += 1) {
					var other_s = sources.get(i + '');
					if (other_s !== undefined) {
						(0,_reactivity_sources_js__WEBPACK_IMPORTED_MODULE_3__.set)(other_s, _constants_js__WEBPACK_IMPORTED_MODULE_5__.UNINITIALIZED);
					} else if (i in target) {
						// If the item exists in the original, we need to create an uninitialized source,
						// else a later read of the property would result in a source being created with
						// the value of the original item at that index.
						other_s = with_parent(() => (0,_reactivity_sources_js__WEBPACK_IMPORTED_MODULE_3__.state)(_constants_js__WEBPACK_IMPORTED_MODULE_5__.UNINITIALIZED, stack));
						sources.set(i + '', other_s);

						if (esm_env__WEBPACK_IMPORTED_MODULE_0__.DEV) {
							(0,_dev_tracing_js__WEBPACK_IMPORTED_MODULE_7__.tag)(other_s, get_label(path, i));
						}
					}
				}
			}

			// If we haven't yet created a source for this property, we need to ensure
			// we do so otherwise if we read it later, then the write won't be tracked and
			// the heuristics of effects will be different vs if we had read the proxied
			// object property before writing to that property.
			if (s === undefined) {
				if (!has || (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_2__.get_descriptor)(target, prop)?.writable) {
					s = with_parent(() => (0,_reactivity_sources_js__WEBPACK_IMPORTED_MODULE_3__.state)(undefined, stack));

					if (esm_env__WEBPACK_IMPORTED_MODULE_0__.DEV) {
						(0,_dev_tracing_js__WEBPACK_IMPORTED_MODULE_7__.tag)(s, get_label(path, prop));
					}
					;(0,_reactivity_sources_js__WEBPACK_IMPORTED_MODULE_3__.set)(s, proxy(value));

					sources.set(prop, s);
				}
			} else {
				has = s.v !== _constants_js__WEBPACK_IMPORTED_MODULE_5__.UNINITIALIZED;

				var p = with_parent(() => proxy(value));
				(0,_reactivity_sources_js__WEBPACK_IMPORTED_MODULE_3__.set)(s, p);
			}

			var descriptor = Reflect.getOwnPropertyDescriptor(target, prop);

			// Set the new value before updating any signals so that any listeners get the new value
			if (descriptor?.set) {
				descriptor.set.call(receiver, value);
			}

			if (!has) {
				// If we have mutated an array directly, we might need to
				// signal that length has also changed. Do it before updating metadata
				// to ensure that iterating over the array as a result of a metadata update
				// will not cause the length to be out of sync.
				if (is_proxied_array && typeof prop === 'string') {
					var ls = /** @type {Source<number>} */ (sources.get('length'));
					var n = Number(prop);

					if (Number.isInteger(n) && n >= ls.v) {
						(0,_reactivity_sources_js__WEBPACK_IMPORTED_MODULE_3__.set)(ls, n + 1);
					}
				}

				;(0,_reactivity_sources_js__WEBPACK_IMPORTED_MODULE_3__.increment)(version);
			}

			return true;
		},

		ownKeys(target) {
			(0,_runtime_js__WEBPACK_IMPORTED_MODULE_1__.get)(version);

			var own_keys = Reflect.ownKeys(target).filter((key) => {
				var source = sources.get(key);
				return source === undefined || source.v !== _constants_js__WEBPACK_IMPORTED_MODULE_5__.UNINITIALIZED;
			});

			for (var [key, source] of sources) {
				if (source.v !== _constants_js__WEBPACK_IMPORTED_MODULE_5__.UNINITIALIZED && !(key in target)) {
					own_keys.push(key);
				}
			}

			return own_keys;
		},

		setPrototypeOf() {
			_errors_js__WEBPACK_IMPORTED_MODULE_6__.state_prototype_fixed();
		}
	});
}

/**
 * @param {string} path
 * @param {string | symbol} prop
 */
function get_label(path, prop) {
	if (typeof prop === 'symbol') return `${path}[Symbol(${prop.description ?? ''})]`;
	if (regex_is_valid_identifier.test(prop)) return `${path}.${prop}`;
	return /^\d+$/.test(prop) ? `${path}[${prop}]` : `${path}['${prop}']`;
}

/**
 * @param {any} value
 */
function get_proxied_value(value) {
	try {
		if (value !== null && typeof value === 'object' && _client_constants__WEBPACK_IMPORTED_MODULE_4__.STATE_SYMBOL in value) {
			return value[_client_constants__WEBPACK_IMPORTED_MODULE_4__.STATE_SYMBOL];
		}
	} catch {
		// the above if check can throw an error if the value in question
		// is the contentWindow of an iframe on another domain, in which
		// case we want to just return the value (because it's definitely
		// not a proxied value) so we don't break any JavaScript interacting
		// with that iframe (such as various payment companies client side
		// JavaScript libraries interacting with their iframes on the same
		// domain)
	}

	return value;
}

/**
 * @param {any} a
 * @param {any} b
 */
function is(a, b) {
	return Object.is(get_proxied_value(a), get_proxied_value(b));
}

const ARRAY_MUTATING_METHODS = new Set([
	'copyWithin',
	'fill',
	'pop',
	'push',
	'reverse',
	'shift',
	'sort',
	'splice',
	'unshift'
]);

/**
 * Wrap array mutating methods so $inspect is triggered only once and
 * to prevent logging an array in intermediate state (e.g. with an empty slot)
 * @param {any[]} array
 */
function inspectable_array(array) {
	return new Proxy(array, {
		get(target, prop, receiver) {
			var value = Reflect.get(target, prop, receiver);
			if (!ARRAY_MUTATING_METHODS.has(/** @type {string} */ (prop))) {
				return value;
			}

			/**
			 * @this {any[]}
			 * @param {any[]} args
			 */
			return function (...args) {
				;(0,_reactivity_sources_js__WEBPACK_IMPORTED_MODULE_3__.set_eager_effects_deferred)();
				var result = value.apply(this, args);
				(0,_reactivity_sources_js__WEBPACK_IMPORTED_MODULE_3__.flush_eager_effects)();
				return result;
			};
		}
	});
}


/***/ },

/***/ "./node_modules/svelte/src/internal/client/reactivity/async.js"
/*!*********************************************************************!*\
  !*** ./node_modules/svelte/src/internal/client/reactivity/async.js ***!
  \*********************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   capture: () => (/* binding */ capture),
/* harmony export */   flatten: () => (/* binding */ flatten),
/* harmony export */   for_await_track_reactivity_loss: () => (/* binding */ for_await_track_reactivity_loss),
/* harmony export */   increment_pending: () => (/* binding */ increment_pending),
/* harmony export */   run: () => (/* binding */ run),
/* harmony export */   run_after_blockers: () => (/* binding */ run_after_blockers),
/* harmony export */   save: () => (/* binding */ save),
/* harmony export */   track_reactivity_loss: () => (/* binding */ track_reactivity_loss),
/* harmony export */   unsave: () => (/* binding */ unsave),
/* harmony export */   unset_context: () => (/* binding */ unset_context),
/* harmony export */   wait: () => (/* binding */ wait)
/* harmony export */ });
/* harmony import */ var _client_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! #client/constants */ "./node_modules/svelte/src/internal/client/constants.js");
/* harmony import */ var esm_env__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! esm-env */ "./node_modules/esm-env/index.js");
/* harmony import */ var _context_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../context.js */ "./node_modules/svelte/src/internal/client/context.js");
/* harmony import */ var _error_handling_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../error-handling.js */ "./node_modules/svelte/src/internal/client/error-handling.js");
/* harmony import */ var _runtime_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../runtime.js */ "./node_modules/svelte/src/internal/client/runtime.js");
/* harmony import */ var _batch_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./batch.js */ "./node_modules/svelte/src/internal/client/reactivity/batch.js");
/* harmony import */ var _deriveds_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./deriveds.js */ "./node_modules/svelte/src/internal/client/reactivity/deriveds.js");
/* harmony import */ var _effects_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./effects.js */ "./node_modules/svelte/src/internal/client/reactivity/effects.js");
/** @import { Blocker, Effect, Source, Value } from '#client' */









/**
 * @param {Blocker[]} blockers
 * @param {Array<() => any>} sync
 * @param {Array<() => Promise<any>>} async
 * @param {(values: Value[]) => any} fn
 */
function flatten(blockers, sync, async, fn) {
	const d = (0,_context_js__WEBPACK_IMPORTED_MODULE_2__.is_runes)() ? _deriveds_js__WEBPACK_IMPORTED_MODULE_6__.derived : _deriveds_js__WEBPACK_IMPORTED_MODULE_6__.derived_safe_equal;

	// Filter out already-settled blockers - no need to wait for them
	var pending = blockers.filter((b) => !b.settled);

	var deriveds = sync.map(d);

	if (esm_env__WEBPACK_IMPORTED_MODULE_1__.DEV) {
		deriveds.forEach((d, i) => {
			// TODO this is kinda useful for debugging but a lousy implementation —
			// maybe the compiler could pass through the template string
			d.label = sync[i]
				.toString()
				.replace('() => ', '')
				.replaceAll('$.eager(() => ', '$state.eager(')
				.replace(/\$\.get\((.+?)\)/g, (_, id) => id);
		});
	}

	if (async.length === 0 && pending.length === 0) {
		fn(deriveds);
		return;
	}

	var parent = /** @type {Effect} */ (_runtime_js__WEBPACK_IMPORTED_MODULE_4__.active_effect);

	var restore = capture();
	var blocker_promise =
		pending.length === 1
			? pending[0].promise
			: pending.length > 1
				? Promise.all(pending.map((b) => b.promise))
				: null;

	/**
	 * @param {Source[]} async
	 */
	function finish(async) {
		if ((parent.f & _client_constants__WEBPACK_IMPORTED_MODULE_0__.DESTROYED) !== 0) {
			return;
		}

		restore();

		try {
			fn([...deriveds, ...async]);
		} catch (error) {
			;(0,_error_handling_js__WEBPACK_IMPORTED_MODULE_3__.invoke_error_boundary)(error, parent);
		}

		unset_context();
	}

	var decrement_pending = increment_pending();

	// Fast path: blockers but no async expressions
	if (async.length === 0) {
		/** @type {Promise<any>} */ (blocker_promise).then(() => finish([])).finally(decrement_pending);
		return;
	}

	// Full path: has async expressions
	function run() {
		Promise.all(async.map((expression) => (0,_deriveds_js__WEBPACK_IMPORTED_MODULE_6__.async_derived)(expression)))
			.then(finish)
			.catch((error) => (0,_error_handling_js__WEBPACK_IMPORTED_MODULE_3__.invoke_error_boundary)(error, parent))
			.finally(decrement_pending);
	}

	if (blocker_promise) {
		blocker_promise.then(() => {
			restore();
			run();
			unset_context();
		});
	} else {
		run();
	}
}

/**
 * @param {Blocker[]} blockers
 * @param {(values: Value[]) => any} fn
 */
function run_after_blockers(blockers, fn) {
	flatten(blockers, [], [], fn);
}

/**
 * Captures the current effect context so that we can restore it after
 * some asynchronous work has happened (so that e.g. `await a + b`
 * causes `b` to be registered as a dependency).
 */
function capture() {
	var previous_effect = /** @type {Effect} */ (_runtime_js__WEBPACK_IMPORTED_MODULE_4__.active_effect);
	var previous_reaction = _runtime_js__WEBPACK_IMPORTED_MODULE_4__.active_reaction;
	var previous_component_context = _context_js__WEBPACK_IMPORTED_MODULE_2__.component_context;
	var previous_batch = /** @type {Batch} */ (_batch_js__WEBPACK_IMPORTED_MODULE_5__.current_batch);

	if (esm_env__WEBPACK_IMPORTED_MODULE_1__.DEV) {
		var previous_dev_stack = _context_js__WEBPACK_IMPORTED_MODULE_2__.dev_stack;
	}

	return function restore(activate_batch = true) {
		;(0,_runtime_js__WEBPACK_IMPORTED_MODULE_4__.set_active_effect)(previous_effect);
		(0,_runtime_js__WEBPACK_IMPORTED_MODULE_4__.set_active_reaction)(previous_reaction);
		(0,_context_js__WEBPACK_IMPORTED_MODULE_2__.set_component_context)(previous_component_context);

		if (activate_batch && (previous_effect.f & _client_constants__WEBPACK_IMPORTED_MODULE_0__.DESTROYED) === 0) {
			// TODO we only need optional chaining here because `{#await ...}` blocks
			// are anomalous. Once we retire them we can get rid of it
			previous_batch?.activate();
			previous_batch?.apply();
		}

		if (esm_env__WEBPACK_IMPORTED_MODULE_1__.DEV) {
			(0,_deriveds_js__WEBPACK_IMPORTED_MODULE_6__.set_reactivity_loss_tracker)(null);
			(0,_context_js__WEBPACK_IMPORTED_MODULE_2__.set_dev_stack)(previous_dev_stack);
		}
	};
}

/** `true` between a `save` thunk restoring a context and the end of that synchronous segment */
var restored = false;

/**
 * Wraps an `await` expression in such a way that the effect context that was
 * active before the expression evaluated can be reapplied afterwards —
 * `await a + b` becomes `(await $.save(a))() + b`
 * @template T
 * @param {Promise<T>} promise
 * @returns {Promise<() => T>}
 */
async function save(promise) {
	var restore = capture();
	// the context restored by an earlier `save` in this expression must not
	// outlive the synchronous segment that is about to end at this `await`
	unsave();
	var value = await promise;

	return () => {
		restore();
		restored = true;
		return value;
	};
}

/**
 * Unset the context if a `save` thunk restored it in the current synchronous segment,
 * so that a foreign microtask can never run inside a restored reaction context.
 * Called at every suspension point, and at the end of async expression bodies —
 * `async () => (await $.save(a))().b` becomes `async () => { try { return (await $.save(a))().b; } finally { $.unsave(); } }`
 * @template T
 * @param {T} [value]
 * @returns {T}
 */
function unsave(value) {
	if (restored) unset_context();
	return /** @type {T} */ (value);
}

/**
 * Reset `current_async_effect` after the `promise` resolves, so
 * that we can emit `await_reactivity_loss` warnings
 * @template T
 * @param {Promise<T>} promise
 * @returns {Promise<() => T>}
 */
async function track_reactivity_loss(promise) {
	unsave();
	var previous_reactivity_loss_tracker = _deriveds_js__WEBPACK_IMPORTED_MODULE_6__.reactivity_loss_tracker;
	// Ensure that unrelated reads after an async operation is kicked off don't cause false positives
	queueMicrotask(() => {
		if (_deriveds_js__WEBPACK_IMPORTED_MODULE_6__.reactivity_loss_tracker === previous_reactivity_loss_tracker) {
			(0,_deriveds_js__WEBPACK_IMPORTED_MODULE_6__.set_reactivity_loss_tracker)(null);
		}
	});

	var value = await promise;

	return () => {
		(0,_deriveds_js__WEBPACK_IMPORTED_MODULE_6__.set_reactivity_loss_tracker)(previous_reactivity_loss_tracker);
		// While this can result in false negatives it also guards against the more important
		// false positives that would occur if this is the last in a chain of async operations,
		// and the reactivity_loss_tracker would then stay around until the next async operation happens.
		queueMicrotask(() => {
			if (_deriveds_js__WEBPACK_IMPORTED_MODULE_6__.reactivity_loss_tracker === previous_reactivity_loss_tracker) {
				(0,_deriveds_js__WEBPACK_IMPORTED_MODULE_6__.set_reactivity_loss_tracker)(null);
			}
		});

		return value;
	};
}

/**
 * Used in `for await` loops in DEV, so
 * that we can emit `await_reactivity_loss` warnings
 * after each `async_iterator` result resolves and
 * after the `async_iterator` return resolves (if it runs)
 * @template T
 * @template TReturn
 * @param {Iterable<T> | AsyncIterable<T>} iterable
 * @returns {AsyncGenerator<T, TReturn | undefined>}
 */
async function* for_await_track_reactivity_loss(iterable) {
	// This is based on the algorithms described in ECMA-262:
	// ForIn/OfBodyEvaluation
	// https://tc39.es/ecma262/multipage/ecmascript-language-statements-and-declarations.html#sec-runtime-semantics-forin-div-ofbodyevaluation-lhs-stmt-iterator-lhskind-labelset
	// AsyncIteratorClose
	// https://tc39.es/ecma262/multipage/abstract-operations.html#sec-asynciteratorclose

	/** @type {AsyncIterator<T, TReturn>} */
	// @ts-ignore
	const iterator = iterable[Symbol.asyncIterator]?.() ?? iterable[Symbol.iterator]?.();

	if (iterator === undefined) {
		throw new TypeError('value is not async iterable');
	}

	// eslint-disable-next-line no-useless-assignment
	let invoke_return = true;

	try {
		while (true) {
			const { done, value } = (await track_reactivity_loss(iterator.next()))();
			if (done) {
				invoke_return = false;
				break;
			}
			var prev = _deriveds_js__WEBPACK_IMPORTED_MODULE_6__.reactivity_loss_tracker;
			try {
				yield value;
			} catch (e) {
				;(0,_deriveds_js__WEBPACK_IMPORTED_MODULE_6__.set_reactivity_loss_tracker)(prev);
				// If the yield throws, we need to call `return` but not return its value, instead rethrow
				if (iterator.return !== undefined) {
					(await track_reactivity_loss(iterator.return()))();
				}
				throw e;
			}
			;(0,_deriveds_js__WEBPACK_IMPORTED_MODULE_6__.set_reactivity_loss_tracker)(prev);
		}
	} catch (error) {
		invoke_return = false;
		throw error;
	} finally {
		// If the iterator had an abrupt completion (break) and `return` is defined on the iterator, call it and return the value
		if (invoke_return && iterator.return !== undefined) {
			// eslint-disable-next-line no-unsafe-finally
			return /** @type {TReturn} */ ((await track_reactivity_loss(iterator.return()))().value);
		}
	}
}

function unset_context(deactivate_batch = true) {
	restored = false;
	(0,_runtime_js__WEBPACK_IMPORTED_MODULE_4__.set_active_effect)(null);
	(0,_runtime_js__WEBPACK_IMPORTED_MODULE_4__.set_active_reaction)(null);
	(0,_context_js__WEBPACK_IMPORTED_MODULE_2__.set_component_context)(null);
	if (deactivate_batch) _batch_js__WEBPACK_IMPORTED_MODULE_5__.current_batch?.deactivate();

	if (esm_env__WEBPACK_IMPORTED_MODULE_1__.DEV) {
		(0,_deriveds_js__WEBPACK_IMPORTED_MODULE_6__.set_reactivity_loss_tracker)(null);
		(0,_context_js__WEBPACK_IMPORTED_MODULE_2__.set_dev_stack)(null);
	}
}

/**
 * @param {Array<() => void | Promise<void>>} thunks
 */
function run(thunks) {
	const restore = capture();

	const decrement_pending = increment_pending();

	var active = /** @type {Effect} */ (_runtime_js__WEBPACK_IMPORTED_MODULE_4__.active_effect);

	/** @type {null | { error: any }} */
	var errored = null;

	/** @param {any} error */
	const handle_error = (error) => {
		errored = { error }; // wrap in object in case a promise rejects with a falsy value

		if (!(0,_effects_js__WEBPACK_IMPORTED_MODULE_7__.aborted)(active)) {
			(0,_error_handling_js__WEBPACK_IMPORTED_MODULE_3__.invoke_error_boundary)(error, active);
		}
	};

	var promise = Promise.resolve(thunks[0]()).catch(handle_error);

	/** @type {Blocker} */
	var blocker = { promise, settled: false };
	var blockers = [blocker];

	promise.finally(() => {
		blocker.settled = true;
		unset_context();
	});

	for (const fn of thunks.slice(1)) {
		promise = promise
			.then(() => {
				restore();

				try {
					if (errored) {
						throw errored.error;
					}

					if ((0,_effects_js__WEBPACK_IMPORTED_MODULE_7__.aborted)(active)) {
						throw _client_constants__WEBPACK_IMPORTED_MODULE_0__.STALE_REACTION;
					}

					return fn();
				} finally {
					// We gotta unset context directly in case the function returns a promise, in which case
					// unset_context in .finally() would be too late ...
					unset_context();
				}
			})
			.catch(handle_error);

		const blocker = { promise, settled: false };
		blockers.push(blocker);

		promise.finally(() => {
			blocker.settled = true;
			// ... but we also need it after such a promise has resolved in case it restores our context
			unset_context();
		});
	}

	promise
		// wait one more tick, so that template effects are
		// guaranteed to run before `$effect(...)`
		.then(() => Promise.resolve())
		.finally(decrement_pending);

	return blockers;
}

/**
 * @param {Blocker[]} blockers
 */
function wait(blockers) {
	return Promise.all(blockers.map((b) => b.promise));
}

/**
 * @returns {(skip?: boolean) => void}
 */
function increment_pending() {
	var effect = /** @type {Effect} */ (_runtime_js__WEBPACK_IMPORTED_MODULE_4__.active_effect);
	var boundary = effect.b; // undefined if called outside the render tree, e.g. a standalone $effect.root
	var batch = /** @type {Batch} */ (_batch_js__WEBPACK_IMPORTED_MODULE_5__.current_batch);
	var blocking = !!boundary?.is_rendered();

	boundary?.update_pending_count(1, batch);
	batch.increment(blocking, effect);

	return () => {
		boundary?.update_pending_count(-1, batch);
		batch.decrement(blocking, effect);
	};
}


/***/ },

/***/ "./node_modules/svelte/src/internal/client/reactivity/batch.js"
/*!*********************************************************************!*\
  !*** ./node_modules/svelte/src/internal/client/reactivity/batch.js ***!
  \*********************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Batch: () => (/* binding */ Batch),
/* harmony export */   batch_values: () => (/* binding */ batch_values),
/* harmony export */   clear: () => (/* binding */ clear),
/* harmony export */   collected_effects: () => (/* binding */ collected_effects),
/* harmony export */   current_batch: () => (/* binding */ current_batch),
/* harmony export */   eager: () => (/* binding */ eager),
/* harmony export */   eager_block_effects: () => (/* binding */ eager_block_effects),
/* harmony export */   flushSync: () => (/* binding */ flushSync),
/* harmony export */   fork: () => (/* binding */ fork),
/* harmony export */   is_flushing_sync: () => (/* binding */ is_flushing_sync),
/* harmony export */   legacy_updates: () => (/* binding */ legacy_updates),
/* harmony export */   previous_batch: () => (/* binding */ previous_batch),
/* harmony export */   schedule_effect: () => (/* binding */ schedule_effect)
/* harmony export */ });
/* harmony import */ var _client_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! #client/constants */ "./node_modules/svelte/src/internal/client/constants.js");
/* harmony import */ var _flags_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../flags/index.js */ "./node_modules/svelte/src/internal/flags/index.js");
/* harmony import */ var _shared_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/utils.js */ "./node_modules/svelte/src/internal/shared/utils.js");
/* harmony import */ var _runtime_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../runtime.js */ "./node_modules/svelte/src/internal/client/runtime.js");
/* harmony import */ var _errors_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../errors.js */ "./node_modules/svelte/src/internal/client/errors.js");
/* harmony import */ var _dom_task_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../dom/task.js */ "./node_modules/svelte/src/internal/client/dom/task.js");
/* harmony import */ var esm_env__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! esm-env */ "./node_modules/esm-env/index.js");
/* harmony import */ var _error_handling_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../error-handling.js */ "./node_modules/svelte/src/internal/client/error-handling.js");
/* harmony import */ var _sources_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./sources.js */ "./node_modules/svelte/src/internal/client/reactivity/sources.js");
/* harmony import */ var _effects_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./effects.js */ "./node_modules/svelte/src/internal/client/reactivity/effects.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./utils.js */ "./node_modules/svelte/src/internal/client/reactivity/utils.js");
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../constants.js */ "./node_modules/svelte/src/constants.js");
/* harmony import */ var _status_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./status.js */ "./node_modules/svelte/src/internal/client/reactivity/status.js");
/* harmony import */ var _shared_dev_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../shared/dev.js */ "./node_modules/svelte/src/internal/shared/dev.js");
/* harmony import */ var _dev_debug_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../dev/debug.js */ "./node_modules/svelte/src/internal/client/dev/debug.js");
/* harmony import */ var _deriveds_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./deriveds.js */ "./node_modules/svelte/src/internal/client/reactivity/deriveds.js");
/** @import { Fork } from 'svelte' */
/** @import { Derived, Effect, Reaction, Source, Value } from '#client' */

















/** @type {Batch | null} */
let first_batch = null;

/** @type {Batch | null} */
let last_batch = null;

/** @type {Batch | null} */
let current_batch = null;

/**
 * This is needed to avoid overwriting inputs
 * @type {Batch | null}
 */
let previous_batch = null;

/**
 * When time travelling (i.e. working in one batch, while other batches
 * still have ongoing work), we ignore the real values of affected
 * signals in favour of their values within the batch
 * @type {Map<Value, any> | null}
 */
let batch_values = null;

/** @type {Effect | null} */
let last_scheduled_effect = null;

let is_flushing_sync = false;
let is_processing = false;

/**
 * During traversal, this is an array. Newly created effects are (if not immediately
 * executed) pushed to this array, rather than going through the scheduling
 * rigamarole that would cause another turn of the flush loop.
 * @type {Effect[] | null}
 */
let collected_effects = null;

/**
 * An array of effects that are marked during traversal as a result of a `set`
 * (not `internal_set`) call. These will be added to the next batch and
 * trigger another `batch.process()`
 * @type {Effect[] | null}
 * @deprecated when we get rid of legacy mode and stores, we can get rid of this
 */
let legacy_updates = null;

var flush_count = 0;

/** @type {Set<Value>} */
var source_stacks = new Set();

let uid = 1;

class Batch {
	id = uid++;

	/** True as soon as `#process` was called */
	#started = false;

	linked = true;

	/** @type {Batch | null} */
	#prev = null;

	/** @type {Batch | null} */
	#next = null;

	/** @type {Map<Effect, ReturnType<typeof deferred<any>>>} */
	async_deriveds = new Map();

	/**
	 * The current values of any signals that are updated in this batch.
	 * Tuple format: [value, is_derived] (note: is_derived is false for deriveds, too, if they were overridden via assignment)
	 * They keys of this map are identical to `this.#previous`
	 * @type {Map<Value, [any, boolean]>}
	 */
	current = new Map();

	/**
	 * The values of any signals (sources and deriveds) that are updated in this batch _before_ those updates took place.
	 * They keys of this map are identical to `this.#current`
	 * @type {Map<Value, any>}
	 */
	previous = new Map();

	/**
	 * When the batch is committed (and the DOM is updated), we need to remove old branches
	 * and append new ones by calling the functions added inside (if/each/key/etc) blocks
	 * @type {Set<(batch: Batch) => void>}
	 */
	#commit_callbacks = new Set();

	/**
	 * If a fork is discarded, we need to destroy any effects that are no longer needed
	 * @type {Set<(batch: Batch) => void>}
	 */
	#discard_callbacks = new Set();

	/**
	 * The number of async effects that are currently in flight
	 */
	#pending = 0;

	/**
	 * Async effects that are currently in flight, _not_ inside a pending boundary
	 * @type {Map<Effect, number>}
	 */
	#blocking_pending = new Map();

	/**
	 * A deferred that resolves when the batch is committed, used with `settled()`
	 * TODO replace with Promise.withResolvers once supported widely enough
	 * @type {{ promise: Promise<void>, resolve: (value?: any) => void, reject: (reason: unknown) => void } | null}
	 */
	#deferred = null;

	/**
	 * Effects that were scheduled in this batch but not yet 'resolved' into the
	 * root effects that need to be flushed. Resolving — the upwards traversal that
	 * marks the path to each effect on the shared effect tree (see #resolve) — is
	 * deferred until the batch is processed, so that the markers are created and
	 * consumed within a single traversal. Scheduling into other batches (which can
	 * happen concurrently, e.g. while a batch is committed) can therefore never
	 * observe (and be confused by) this batch's markers.
	 * May contain duplicates — deduplication happens during resolving
	 * @type {Effect[]}
	 */
	#scheduled = [];

	/**
	 * Effects created while this batch was active.
	 * @type {Effect[]}
	 */
	#new_effects = [];

	/**
	 * Deferred effects (which run after async work has completed) that are DIRTY
	 * @type {Set<Effect>}
	 */
	#dirty_effects = new Set();

	/**
	 * Deferred effects that are MAYBE_DIRTY
	 * @type {Set<Effect>}
	 */
	#maybe_dirty_effects = new Set();

	/**
	 * A map of branches that still exist, but will be destroyed when this batch
	 * is committed — we skip over these during `process`.
	 * The value contains child effects that were dirty/maybe_dirty before being reset,
	 * so they can be rescheduled if the branch survives.
	 * @type {Map<Effect, { d: Effect[], m: Effect[] }>}
	 */
	#skipped_branches = new Map();

	/**
	 * Inverse of #skipped_branches which we need to tell prior batches to unskip them when committing
	 * @type {Set<Effect>}
	 */
	#unskipped_branches = new Set();

	is_fork = false;

	#decrement_queued = false;

	constructor() {
		// link batch
		if (last_batch === null) {
			first_batch = last_batch = this;
		} else {
			last_batch.#next = this;
			this.#prev = last_batch;
		}

		last_batch = this;
	}

	#is_deferred() {
		if (this.is_fork) return true;

		for (const effect of this.#blocking_pending.keys()) {
			var e = effect;
			var skipped = false;

			while (e.parent !== null) {
				if (this.#skipped_branches.has(e)) {
					skipped = true;
					break;
				}

				e = e.parent;
			}

			if (!skipped) {
				return true;
			}
		}

		return false;
	}

	/**
	 * Add an effect to the #skipped_branches map and reset its children
	 * @param {Effect} effect
	 */
	skip_effect(effect) {
		if (!this.#skipped_branches.has(effect)) {
			this.#skipped_branches.set(effect, { d: [], m: [] });
		}
		this.#unskipped_branches.delete(effect);
	}

	/**
	 * Remove an effect from the #skipped_branches map and reschedule
	 * any tracked dirty/maybe_dirty child effects
	 * @param {Effect} effect
	 * @param {(e: Effect) => void} callback
	 */
	unskip_effect(effect, callback = (e) => this.schedule(e)) {
		var tracked = this.#skipped_branches.get(effect);
		if (tracked) {
			this.#skipped_branches.delete(effect);

			for (var e of tracked.d) {
				(0,_status_js__WEBPACK_IMPORTED_MODULE_12__.set_signal_status)(e, _client_constants__WEBPACK_IMPORTED_MODULE_0__.DIRTY);
				callback(e);
			}

			for (e of tracked.m) {
				;(0,_status_js__WEBPACK_IMPORTED_MODULE_12__.set_signal_status)(e, _client_constants__WEBPACK_IMPORTED_MODULE_0__.MAYBE_DIRTY);
				callback(e);
			}
		}
		this.#unskipped_branches.add(effect);
	}

	/**
	 * Convert the effects that were scheduled in this batch into the root effects
	 * that need to be traversed, marking the path to each effect (by clearing the
	 * `CLEAN` flag on ancestor branches) so that the traversal can find them.
	 * This happens right before traversal rather than at scheduling time, so that
	 * the markers left on the (shared) effect tree are created and consumed within
	 * a single traversal — scheduling into other batches can never observe them
	 * @returns {Effect[]}
	 */
	#resolve() {
		/** @type {Effect[]} */
		var roots = [];

		for (const effect of this.#scheduled) {
			// skip effects that are destroyed, or that already ran (e.g. because
			// they were reached by the traversal that preceded a drain iteration,
			// or because they were scheduled twice)
			if ((effect.f & _client_constants__WEBPACK_IMPORTED_MODULE_0__.DESTROYED) !== 0 || (effect.f & (_client_constants__WEBPACK_IMPORTED_MODULE_0__.DIRTY | _client_constants__WEBPACK_IMPORTED_MODULE_0__.MAYBE_DIRTY)) === 0) continue;

			var e = effect;
			var covered = false;

			while (e.parent !== null) {
				e = e.parent;
				var flags = e.f;

				if ((flags & (_client_constants__WEBPACK_IMPORTED_MODULE_0__.ROOT_EFFECT | _client_constants__WEBPACK_IMPORTED_MODULE_0__.BRANCH_EFFECT)) !== 0) {
					if ((flags & _client_constants__WEBPACK_IMPORTED_MODULE_0__.CLEAN) === 0) {
						// the path to the root was already marked, meaning the
						// root was already collected — nothing left to do
						covered = true;
						break;
					}

					e.f ^= _client_constants__WEBPACK_IMPORTED_MODULE_0__.CLEAN;
				}
			}

			if (!covered) {
				roots.push(e);
			}
		}

		this.#scheduled = [];

		return roots;
	}

	#process() {
		this.#started = true;

		if (esm_env__WEBPACK_IMPORTED_MODULE_6__.DEV) {
			// track all the values that were updated during this flush,
			// so that they can be reset afterwards
			for (const value of this.current.keys()) {
				source_stacks.add(value);
			}
		}

		// We always reschedule previously-deferred effects, not just when
		// #is_deferred() is true, because traversing the tree could make
		// an if block that contains the last blocking pending effect falsy,
		// causing the block to no longer be deferred.
		for (const e of this.#dirty_effects) {
			this.#maybe_dirty_effects.delete(e);
			(0,_status_js__WEBPACK_IMPORTED_MODULE_12__.set_signal_status)(e, _client_constants__WEBPACK_IMPORTED_MODULE_0__.DIRTY);
			this.schedule(e);
		}

		for (const e of this.#maybe_dirty_effects) {
			;(0,_status_js__WEBPACK_IMPORTED_MODULE_12__.set_signal_status)(e, _client_constants__WEBPACK_IMPORTED_MODULE_0__.MAYBE_DIRTY);
			this.schedule(e);
		}

		this.apply();

		/** @type {Effect[]} */
		var effects = (collected_effects = []);

		/** @type {Effect[]} */
		var render_effects = [];

		/**
		 * @type {Effect[]}
		 * @deprecated when we get rid of legacy mode and stores, we can get rid of this
		 */
		var updates = (legacy_updates = []);

		// Effects can be scheduled during traversal (e.g. because a parent each/await/etc
		// block updated an internal source, or because an effect invalidated itself)
		// hence we loop until there are no more scheduled effects.
		while (this.#scheduled.length > 0) {
			if (flush_count++ > 1000) {
				this.#unlink();
				infinite_loop_guard(); // TODO try to reset_all() here?
			}

			for (const root of this.#resolve()) {
				try {
					this.#traverse(root, effects, render_effects);
				} catch (e) {
					reset_all(root);
					// If there's no async work left, this branch is now dead and needs
					// to be discarded to not become a zombie that is never cleaned up.
					// See https://github.com/sveltejs/svelte/issues/18221#issuecomment-4497918414
					// for a (non-minimal) reproduction that demonstrates a case where this is necessary
					// to not get follow-up false-positives via "batch has scheduled roots" invariant errors.
					if (!this.#is_deferred()) this.discard();
					throw e;
				}
			}
		}

		// any writes should take effect in a subsequent batch
		current_batch = null;

		if (updates.length > 0) {
			var batch = Batch.ensure();
			for (const e of updates) {
				batch.schedule(e);
			}
		}

		collected_effects = null;
		legacy_updates = null;

		// if the batch has outstanding pending work, stash effects and bail
		if (this.#is_deferred()) {
			this.#defer_effects(render_effects);
			this.#defer_effects(effects);

			for (const [e, t] of this.#skipped_branches) {
				reset_branch(e, t);
			}

			if (updates.length > 0) {
				/** @type {Batch} */ (/** @type {unknown} */ (current_batch)).#process();
			}

			return;
		}

		const earlier_batch = this.#find_earlier_batch();

		if (earlier_batch) {
			// If this batch collected deferred effects during traversal, they still need
			// to run after being merged into the earlier batch.
			this.#defer_effects(render_effects);
			this.#defer_effects(effects);
			earlier_batch.#merge(this);
			return;
		}

		// clear effects. Those that are still needed will be rescheduled through unskipping the skipped branches.
		this.#dirty_effects.clear();
		this.#maybe_dirty_effects.clear();

		// append/remove branches
		for (const fn of this.#commit_callbacks) fn(this);
		this.#commit_callbacks.clear();

		previous_batch = this;
		flush_queued_effects(render_effects);
		flush_queued_effects(effects);
		previous_batch = null;

		this.#deferred?.resolve();

		var next_batch = /** @type {Batch | null} */ (/** @type {unknown} */ (current_batch));

		if (this.#pending === 0 && (this.#scheduled.length === 0 || next_batch !== null)) {
			this.#unlink();

			// Order matters here - we need to commit and THEN continue flushing new batches, not the other way around,
			// else we could start flushing a new batch and then, if it has pending work, rebase it right afterwards, which is wrong.
			// In sync mode flushSync can cause #commit to wrongfully think that there needs to be a rebase, so we only do it in async mode
			// TODO fix the underlying cause, otherwise this will likely regress when non-async mode is removed
			if (_flags_index_js__WEBPACK_IMPORTED_MODULE_1__.async_mode_flag) {
				this.#commit();
				// Rebases can activate other batches or null it out, therefore restore the new one here
				current_batch = next_batch;
			}
		}

		// Edge case: During traversal new branches might create effects that run immediately and set state,
		// causing an effect to be scheduled again. We need to traverse the current batch
		// once more in that case - most of the time this will just clean up dirty branches.
		if (this.#scheduled.length > 0) {
			if (next_batch !== null) {
				for (const e of this.#scheduled) {
					next_batch.#scheduled.push(e);
				}

				this.#scheduled = [];
			} else {
				next_batch = this;
			}
		}

		if (next_batch !== null) {
			_sources_js__WEBPACK_IMPORTED_MODULE_8__.old_values.clear();
			next_batch.#process();
		}
	}

	/**
	 * Traverse the effect tree, executing effects or stashing
	 * them for later execution as appropriate
	 * @param {Effect} root
	 * @param {Effect[]} effects
	 * @param {Effect[]} render_effects
	 */
	#traverse(root, effects, render_effects) {
		root.f ^= _client_constants__WEBPACK_IMPORTED_MODULE_0__.CLEAN;

		var effect = root.first;

		while (effect !== null) {
			var flags = effect.f;
			var is_branch = (flags & (_client_constants__WEBPACK_IMPORTED_MODULE_0__.BRANCH_EFFECT | _client_constants__WEBPACK_IMPORTED_MODULE_0__.ROOT_EFFECT)) !== 0;
			var is_skippable_branch = is_branch && (flags & _client_constants__WEBPACK_IMPORTED_MODULE_0__.CLEAN) !== 0;

			var skip = is_skippable_branch || (flags & _client_constants__WEBPACK_IMPORTED_MODULE_0__.INERT) !== 0 || this.#skipped_branches.has(effect);

			if (!skip && effect.fn !== null) {
				if (is_branch) {
					effect.f ^= _client_constants__WEBPACK_IMPORTED_MODULE_0__.CLEAN;
				} else if ((flags & _client_constants__WEBPACK_IMPORTED_MODULE_0__.EFFECT) !== 0) {
					effects.push(effect);
				} else if (_flags_index_js__WEBPACK_IMPORTED_MODULE_1__.async_mode_flag && (flags & (_client_constants__WEBPACK_IMPORTED_MODULE_0__.RENDER_EFFECT | _client_constants__WEBPACK_IMPORTED_MODULE_0__.MANAGED_EFFECT)) !== 0) {
					render_effects.push(effect);
				} else if ((0,_runtime_js__WEBPACK_IMPORTED_MODULE_3__.is_dirty)(effect)) {
					if ((flags & _client_constants__WEBPACK_IMPORTED_MODULE_0__.BLOCK_EFFECT) !== 0) this.#maybe_dirty_effects.add(effect);
					(0,_runtime_js__WEBPACK_IMPORTED_MODULE_3__.update_effect)(effect);
				}

				var child = effect.first;

				if (child !== null) {
					effect = child;
					continue;
				}
			}

			while (effect !== null) {
				var next = effect.next;

				if (next !== null) {
					effect = next;
					break;
				}

				effect = effect.parent;
			}
		}
	}

	#find_earlier_batch() {
		var batch = this.#prev;

		while (batch !== null) {
			if (!batch.is_fork) {
				// if the batches are connected, break
				for (const [value, [, is_derived]] of this.current) {
					if (batch.current.has(value) && !is_derived) {
						return batch;
					}
				}
			}

			batch = batch.#prev;
		}

		return null;
	}

	/**
	 * @param {Batch} batch
	 */
	#merge(batch) {
		for (const [source, value] of batch.current) {
			if (!this.previous.has(source) && batch.previous.has(source)) {
				this.previous.set(source, batch.previous.get(source));
			}

			this.current.set(source, value);
		}

		for (const [effect, deferred] of batch.async_deriveds) {
			const d = this.async_deriveds.get(effect);
			if (d) deferred.promise.then(d.resolve).catch(d.reject);
		}

		// Clear them or else those that are still pending might get rejected on discard (after merged-into batch is done).
		// This can happen when batch Y merged into X and Y has a pending boundary and therefore still-pending async deriveds inside.
		batch.async_deriveds.clear();

		// Mark is not guaranteed not touch these, so we transfer them
		this.transfer_effects(batch.#dirty_effects, batch.#maybe_dirty_effects);

		/**
		 * mark all effects that depend on `batch.current`, except the
		 * async effects that we just resolved (TODO unless they depend
		 * on values in this batch that are NOT in the later batch?).
		 * Through this we also will populate the correct #skipped_branches,
		 * oncommit callbacks etc, so we don't need to merge them separately.
		 * @param {Value} value
		 */
		const mark = (value) => {
			var reactions = value.reactions;
			if (reactions === null) return;
			// skip if value is derived and is neither dirty nor maybe dirty. transitive
			// deriveds (a derived depending on another derived) are only MAYBE_DIRTY, so
			// we must continue traversing them to reach the effects that depend on them
			if ((value.f & _client_constants__WEBPACK_IMPORTED_MODULE_0__.DERIVED) !== 0 && (value.f & (_client_constants__WEBPACK_IMPORTED_MODULE_0__.DIRTY | _client_constants__WEBPACK_IMPORTED_MODULE_0__.MAYBE_DIRTY)) === 0) {
				return;
			}

			for (const reaction of reactions) {
				var flags = reaction.f;

				if ((flags & _client_constants__WEBPACK_IMPORTED_MODULE_0__.DERIVED) !== 0) {
					mark(/** @type {Derived} */ (reaction));
				} else {
					var effect = /** @type {Effect} */ (reaction);

					if (flags & (_client_constants__WEBPACK_IMPORTED_MODULE_0__.ASYNC | _client_constants__WEBPACK_IMPORTED_MODULE_0__.BLOCK_EFFECT) && !this.async_deriveds.has(effect)) {
						this.#maybe_dirty_effects.delete(effect);
						(0,_status_js__WEBPACK_IMPORTED_MODULE_12__.set_signal_status)(effect, _client_constants__WEBPACK_IMPORTED_MODULE_0__.DIRTY);
						this.schedule(effect);
					}
				}
			}
		};

		for (const source of this.current.keys()) {
			mark(source);
		}

		this.oncommit(() => batch.discard());
		batch.#unlink();

		current_batch = this;
		this.#process();
	}

	/**
	 * @param {Effect[]} effects
	 */
	#defer_effects(effects) {
		for (var i = 0; i < effects.length; i += 1) {
			(0,_utils_js__WEBPACK_IMPORTED_MODULE_10__.defer_effect)(effects[i], this.#dirty_effects, this.#maybe_dirty_effects);
		}
	}

	/**
	 * Associate a change to a given source with the current
	 * batch, noting its previous and current values
	 * @param {Value} source
	 * @param {any} value
	 * @param {boolean} [is_derived]
	 */
	capture(source, value, is_derived = false) {
		if (source.v !== _constants_js__WEBPACK_IMPORTED_MODULE_11__.UNINITIALIZED && !this.previous.has(source)) {
			this.previous.set(source, source.v);
		}

		// Don't save errors in `batch_values`, or they won't be thrown in `runtime.js#get`
		if ((source.f & _client_constants__WEBPACK_IMPORTED_MODULE_0__.ERROR_VALUE) === 0) {
			this.current.set(source, [value, is_derived]);
			batch_values?.set(source, value);
		}

		if (!this.is_fork) {
			source.v = value;
		}
	}

	activate() {
		current_batch = this;
	}

	deactivate() {
		current_batch = null;
		batch_values = null;
	}

	flush() {
		try {
			if (esm_env__WEBPACK_IMPORTED_MODULE_6__.DEV) {
				source_stacks.clear();
			}

			is_processing = true;
			current_batch = this;

			this.#process();
		} finally {
			flush_count = 0;
			last_scheduled_effect = null;
			collected_effects = null;
			legacy_updates = null;
			is_processing = false;

			current_batch = null;
			batch_values = null;

			_sources_js__WEBPACK_IMPORTED_MODULE_8__.old_values.clear();

			if (esm_env__WEBPACK_IMPORTED_MODULE_6__.DEV) {
				for (const source of source_stacks) {
					source.updated = null;
				}
			}
		}
	}

	discard() {
		for (const fn of this.#discard_callbacks) fn(this);
		this.#discard_callbacks.clear();

		for (const deferred of this.async_deriveds.values()) {
			deferred.reject(_deriveds_js__WEBPACK_IMPORTED_MODULE_15__.OBSOLETE);
		}

		this.#unlink();
		this.#deferred?.resolve();
	}

	/**
	 * @param {Effect} effect
	 */
	register_created_effect(effect) {
		this.#new_effects.push(effect);
	}

	#commit() {
		// If there are other pending batches, they now need to be 'rebased' —
		// in other words, we re-run block/async effects with the newly
		// committed state, unless the batch in question has a more
		// recent value for a given source
		for (let batch = first_batch; batch !== null; batch = batch.#next) {
			var is_earlier = batch.id < this.id;

			/** @type {Source[]} */
			var sources = [];

			for (const [source, [value, is_derived]] of this.current) {
				if (batch.current.has(source)) {
					var batch_value = /** @type {[any, boolean]} */ (batch.current.get(source))[0]; // faster than destructuring

					if (is_earlier && value !== batch_value) {
						// bring the value up to date
						batch.current.set(source, [value, is_derived]);
					} else {
						// same value or later batch has more recent value,
						// no need to re-run these effects
						continue;
					}
				}

				sources.push(source);
			}

			if (is_earlier) {
				// TODO do we need to restart these in some cases, instead of
				// immediately resolving them? Likely not because of how this.apply() works.
				for (const [effect, deferred] of this.async_deriveds) {
					const d = batch.async_deriveds.get(effect);
					if (d) deferred.promise.then(d.resolve).catch(d.reject);
				}
			}

			var current = [...batch.current.keys()].filter(
				(source) => !(/** @type {[any, boolean]} */ (batch.current.get(source))[1])
			);

			// If not started yet or no sources to update (which is e.g. possible for the very first batch) then bail
			if (!batch.#started || current.length === 0) continue;

			// Re-run async/block effects that depend on distinct values changed in both batches (ignoring deriveds)
			var others = current.filter((source) => !this.current.has(source));

			if (others.length === 0) {
				if (is_earlier) {
					// this batch is now obsolete and can be discarded
					batch.discard();
				}
			} else if (sources.length > 0) {
				// The microtask queue can contain the batch already scheduled to run right
				// after this one is finished, so throwing the invariant would be wrong here.
				if (esm_env__WEBPACK_IMPORTED_MODULE_6__.DEV && !batch.#decrement_queued) {
					(0,_shared_dev_js__WEBPACK_IMPORTED_MODULE_13__.invariant)(batch.#scheduled.length === 0, 'Batch has scheduled effects');
				}

				// A batch was unskipped in a later batch -> tell prior batches to unskip it, too
				if (is_earlier) {
					for (const unskipped of this.#unskipped_branches) {
						batch.unskip_effect(unskipped, (e) => {
							if ((e.f & (_client_constants__WEBPACK_IMPORTED_MODULE_0__.BLOCK_EFFECT | _client_constants__WEBPACK_IMPORTED_MODULE_0__.ASYNC)) !== 0) {
								batch.schedule(e);
							} else {
								batch.#defer_effects([e]);
							}
						});
					}
				}

				batch.activate();

				/** @type {Set<Value>} */
				var marked = new Set();

				/** @type {Map<Reaction, boolean>} */
				var checked = new Map();

				for (var source of sources) {
					mark_effects(source, others, marked, checked);
				}

				checked = new Map();
				var current_unequal = [...batch.current]
					.filter(([c, v1]) => {
						const v2 = this.current.get(c);
						if (!v2) return true;
						// Either their values are different or one is a derived but not the other
						return v2[0] !== v1[0] || v2[1] !== v1[1];
					})
					.map(([c]) => c);

				if (current_unequal.length > 0) {
					for (const effect of this.#new_effects) {
						if (
							(effect.f & (_client_constants__WEBPACK_IMPORTED_MODULE_0__.DESTROYED | _client_constants__WEBPACK_IMPORTED_MODULE_0__.INERT | _client_constants__WEBPACK_IMPORTED_MODULE_0__.EAGER_EFFECT)) === 0 &&
							depends_on(effect, current_unequal, checked)
						) {
							if ((effect.f & (_client_constants__WEBPACK_IMPORTED_MODULE_0__.ASYNC | _client_constants__WEBPACK_IMPORTED_MODULE_0__.BLOCK_EFFECT)) !== 0) {
								(0,_status_js__WEBPACK_IMPORTED_MODULE_12__.set_signal_status)(effect, _client_constants__WEBPACK_IMPORTED_MODULE_0__.DIRTY);
								batch.schedule(effect);
							} else {
								batch.#dirty_effects.add(effect);
							}
						}
					}
				}

				// Only apply and traverse when we know we triggered async work with marking the effects
				// and know this won't run anyway right afterwards
				if (batch.#scheduled.length > 0 && !batch.#decrement_queued) {
					batch.apply();

					for (var root of batch.#resolve()) {
						batch.#traverse(root, [], []);
					}
				}

				batch.deactivate();
			}
		}
	}

	/**
	 * @param {boolean} blocking
	 * @param {Effect} effect
	 */
	increment(blocking, effect) {
		this.#pending += 1;

		if (blocking) {
			let blocking_pending_count = this.#blocking_pending.get(effect) ?? 0;
			this.#blocking_pending.set(effect, blocking_pending_count + 1);
		}
	}

	/**
	 * @param {boolean} blocking
	 * @param {Effect} effect
	 */
	decrement(blocking, effect) {
		this.#pending -= 1;

		if (blocking) {
			let blocking_pending_count = this.#blocking_pending.get(effect) ?? 0;

			if (blocking_pending_count === 1) {
				this.#blocking_pending.delete(effect);
			} else {
				this.#blocking_pending.set(effect, blocking_pending_count - 1);
			}
		}

		if (this.#decrement_queued) return;
		this.#decrement_queued = true;

		(0,_dom_task_js__WEBPACK_IMPORTED_MODULE_5__.queue_micro_task)(() => {
			this.#decrement_queued = false;

			if (this.linked) {
				this.flush();
			}
		});
	}

	/**
	 * @param {Set<Effect>} dirty_effects
	 * @param {Set<Effect>} maybe_dirty_effects
	 */
	transfer_effects(dirty_effects, maybe_dirty_effects) {
		for (const e of dirty_effects) {
			this.#dirty_effects.add(e);
		}

		for (const e of maybe_dirty_effects) {
			this.#maybe_dirty_effects.add(e);
		}

		dirty_effects.clear();
		maybe_dirty_effects.clear();
	}

	/** @param {(batch: Batch) => void} fn */
	oncommit(fn) {
		this.#commit_callbacks.add(fn);
	}

	/** @param {(batch: Batch) => void} fn */
	ondiscard(fn) {
		this.#discard_callbacks.add(fn);
	}

	settled() {
		return (this.#deferred ??= (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_2__.deferred)()).promise;
	}

	static ensure() {
		if (current_batch === null) {
			const batch = (current_batch = new Batch());

			if (!is_processing && !is_flushing_sync) {
				(0,_dom_task_js__WEBPACK_IMPORTED_MODULE_5__.queue_micro_task)(() => {
					if (!batch.#started) {
						batch.flush();
					}
				});
			}
		}

		return current_batch;
	}

	apply() {
		if (!_flags_index_js__WEBPACK_IMPORTED_MODULE_1__.async_mode_flag || (!this.is_fork && this.#prev === null && this.#next === null)) {
			batch_values = null;
			return;
		}

		// if there are multiple batches, we are 'time travelling' —
		// we need to override values with the ones in this batch...
		batch_values = new Map();
		for (const [source, [value]] of this.current) {
			batch_values.set(source, value);
		}

		// ...and undo changes belonging to other batches unless they intersect
		for (let batch = first_batch; batch !== null; batch = batch.#next) {
			if (batch === this || batch.is_fork) continue;

			// If two batches intersect, the latter batch will be merged into the earlier batch,
			// and we should treat them as a single set of changes
			var intersects = false;

			if (batch.id < this.id) {
				for (const [source, [, is_derived]] of batch.current) {
					// Derived values don't partake in the intersection mechanism, because a derived could
					// be triggered in one batch already but not the other one yet, causing a false-positive
					if (is_derived) continue;

					if (this.current.has(source)) {
						intersects = true;
						break;
					}
				}
			}

			// Since the latter batch merges into the earlier (if it resolves before the earlier one),
			// we treat the earlier values as "already applied". This way we don't need to rerun async
			// effects of the earlier batch in case they are merged.
			// As a result you can think of batch_values as having the latest values of all intersecting
			// batches up until this batch.
			if (!intersects) {
				for (const [source, previous] of batch.previous) {
					if (!batch_values.has(source)) {
						batch_values.set(source, previous);
					}
				}
			}
		}
	}

	/**
	 *
	 * @param {Effect} effect
	 */
	schedule(effect) {
		last_scheduled_effect = effect;

		// defer render effects inside a pending boundary
		// TODO the `REACTION_RAN` check is only necessary because of legacy `$:` effects AFAICT — we can remove later
		if (
			effect.b?.is_pending &&
			(effect.f & (_client_constants__WEBPACK_IMPORTED_MODULE_0__.EFFECT | _client_constants__WEBPACK_IMPORTED_MODULE_0__.RENDER_EFFECT | _client_constants__WEBPACK_IMPORTED_MODULE_0__.MANAGED_EFFECT)) !== 0 &&
			(effect.f & _client_constants__WEBPACK_IMPORTED_MODULE_0__.REACTION_RAN) === 0
		) {
			effect.b.defer_effect(effect);
			return;
		}

		this.#scheduled.push(effect);
	}

	#unlink() {
		// #merge calls #unlink, discard later on does it again - prevent
		// running it multiple times to not corrupt the linked list
		if (!this.linked) return;

		var prev = this.#prev;
		var next = this.#next;

		if (prev === null) {
			first_batch = next;
		} else {
			prev.#next = next;
		}

		if (next === null) {
			last_batch = prev;
		} else {
			next.#prev = prev;
		}

		this.linked = false;
	}
}

// TODO Svelte@6 think about removing the callback argument.
/**
 * Synchronously flush any pending updates.
 * Returns void if no callback is provided, otherwise returns the result of calling the callback.
 * @template [T=void]
 * @param {(() => T) | undefined} [fn]
 * @returns {T}
 */
function flushSync(fn) {
	var was_flushing_sync = is_flushing_sync;
	is_flushing_sync = true;

	try {
		var result;

		if (fn) {
			if (current_batch !== null && !current_batch.is_fork) {
				current_batch.flush();
			}

			result = fn();
		}

		while (true) {
			(0,_dom_task_js__WEBPACK_IMPORTED_MODULE_5__.flush_tasks)();

			if (current_batch === null) {
				return /** @type {T} */ (result);
			}

			current_batch.flush();
		}
	} finally {
		is_flushing_sync = was_flushing_sync;
	}
}

function infinite_loop_guard() {
	if (esm_env__WEBPACK_IMPORTED_MODULE_6__.DEV) {
		var updates = new Map();

		for (const source of /** @type {Batch} */ (current_batch).current.keys()) {
			for (const [stack, update] of source.updated ?? []) {
				var entry = updates.get(stack);

				if (!entry) {
					entry = { error: update.error, count: 0 };
					updates.set(stack, entry);
				}

				entry.count += update.count;
			}
		}

		for (const update of updates.values()) {
			if (update.error) {
				// eslint-disable-next-line no-console
				console.error(update.error);
			}
		}
	}

	try {
		_errors_js__WEBPACK_IMPORTED_MODULE_4__.effect_update_depth_exceeded();
	} catch (error) {
		if (esm_env__WEBPACK_IMPORTED_MODULE_6__.DEV) {
			// stack contains no useful information, replace it
			(0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_2__.define_property)(error, 'stack', { value: '' });
		}

		// Best effort: invoke the boundary nearest the most recent
		// effect and hope that it's relevant to the infinite loop
		;(0,_error_handling_js__WEBPACK_IMPORTED_MODULE_7__.invoke_error_boundary)(error, last_scheduled_effect);
	}
}

/** @type {Set<Effect> | null} */
let eager_block_effects = null;

/**
 * @param {Array<Effect>} effects
 * @returns {void}
 */
function flush_queued_effects(effects) {
	var length = effects.length;
	if (length === 0) return;

	var i = 0;

	while (i < length) {
		var effect = effects[i++];

		if ((effect.f & (_client_constants__WEBPACK_IMPORTED_MODULE_0__.DESTROYED | _client_constants__WEBPACK_IMPORTED_MODULE_0__.INERT)) === 0 && (0,_runtime_js__WEBPACK_IMPORTED_MODULE_3__.is_dirty)(effect)) {
			eager_block_effects = new Set();

			(0,_runtime_js__WEBPACK_IMPORTED_MODULE_3__.update_effect)(effect);

			// Effects with no dependencies or teardown do not get added to the effect tree.
			// Deferred effects (e.g. `$effect(...)`) _are_ added to the tree because we
			// don't know if we need to keep them until they are executed. Doing the check
			// here (rather than in `update_effect`) allows us to skip the work for
			// immediate effects.
			if (
				effect.deps === null &&
				effect.first === null &&
				effect.nodes === null &&
				effect.teardown === null &&
				effect.ac === null
			) {
				// remove this effect from the graph
				(0,_effects_js__WEBPACK_IMPORTED_MODULE_9__.unlink_effect)(effect);
			}

			// If update_effect() has a flushSync() in it, we may have flushed another flush_queued_effects(),
			// which already handled this logic and did set eager_block_effects to null.
			if (eager_block_effects?.size > 0) {
				_sources_js__WEBPACK_IMPORTED_MODULE_8__.old_values.clear();

				for (const e of eager_block_effects) {
					// Skip eager effects that have already been unmounted
					if ((e.f & (_client_constants__WEBPACK_IMPORTED_MODULE_0__.DESTROYED | _client_constants__WEBPACK_IMPORTED_MODULE_0__.INERT)) !== 0) continue;

					// Run effects in order from ancestor to descendant, else we could run into nullpointers
					/** @type {Effect[]} */
					const ordered_effects = [e];
					let ancestor = e.parent;
					while (ancestor !== null) {
						if (eager_block_effects.has(ancestor)) {
							eager_block_effects.delete(ancestor);
							ordered_effects.push(ancestor);
						}
						ancestor = ancestor.parent;
					}

					for (let j = ordered_effects.length - 1; j >= 0; j--) {
						const e = ordered_effects[j];
						// Skip eager effects that have already been unmounted
						if ((e.f & (_client_constants__WEBPACK_IMPORTED_MODULE_0__.DESTROYED | _client_constants__WEBPACK_IMPORTED_MODULE_0__.INERT)) !== 0) continue;
						(0,_runtime_js__WEBPACK_IMPORTED_MODULE_3__.update_effect)(e);
					}
				}

				eager_block_effects.clear();
			}
		}
	}

	eager_block_effects = null;
}

/**
 * This is similar to `mark_reactions`, but it only marks async/block effects
 * depending on `value` and at least one of the other `sources`, so that
 * these effects can re-run after another batch has been committed
 * @param {Value} value
 * @param {Source[]} sources
 * @param {Set<Value>} marked
 * @param {Map<Reaction, boolean>} checked
 */
function mark_effects(value, sources, marked, checked) {
	if (marked.has(value)) return;
	marked.add(value);

	if (value.reactions !== null) {
		for (const reaction of value.reactions) {
			const flags = reaction.f;

			if ((flags & _client_constants__WEBPACK_IMPORTED_MODULE_0__.DERIVED) !== 0) {
				mark_effects(/** @type {Derived} */ (reaction), sources, marked, checked);
			} else if (
				(flags & (_client_constants__WEBPACK_IMPORTED_MODULE_0__.ASYNC | _client_constants__WEBPACK_IMPORTED_MODULE_0__.BLOCK_EFFECT)) !== 0 &&
				(flags & _client_constants__WEBPACK_IMPORTED_MODULE_0__.DIRTY) === 0 &&
				depends_on(reaction, sources, checked)
			) {
				(0,_status_js__WEBPACK_IMPORTED_MODULE_12__.set_signal_status)(reaction, _client_constants__WEBPACK_IMPORTED_MODULE_0__.DIRTY);
				schedule_effect(/** @type {Effect} */ (reaction));
			}
		}
	}
}

/**
 * When committing a fork, we need to trigger eager effects so that
 * any `$state.eager(...)` expressions update immediately. This
 * function allows us to discover them
 * @param {Value} value
 * @param {Set<Effect>} effects
 */
function mark_eager_effects(value, effects) {
	if (value.reactions === null) return;

	for (const reaction of value.reactions) {
		const flags = reaction.f;

		if ((flags & _client_constants__WEBPACK_IMPORTED_MODULE_0__.DERIVED) !== 0) {
			mark_eager_effects(/** @type {Derived} */ (reaction), effects);
		} else if ((flags & _client_constants__WEBPACK_IMPORTED_MODULE_0__.EAGER_EFFECT) !== 0) {
			(0,_status_js__WEBPACK_IMPORTED_MODULE_12__.set_signal_status)(reaction, _client_constants__WEBPACK_IMPORTED_MODULE_0__.DIRTY);
			effects.add(/** @type {Effect} */ (reaction));
		}
	}
}

/**
 * @param {Reaction} reaction
 * @param {Source[]} sources
 * @param {Map<Reaction, boolean>} checked
 */
function depends_on(reaction, sources, checked) {
	const depends = checked.get(reaction);
	if (depends !== undefined) return depends;

	if (reaction.deps !== null) {
		for (const dep of reaction.deps) {
			if (_shared_utils_js__WEBPACK_IMPORTED_MODULE_2__.includes.call(sources, dep)) {
				return true;
			}

			if ((dep.f & _client_constants__WEBPACK_IMPORTED_MODULE_0__.DERIVED) !== 0 && depends_on(/** @type {Derived} */ (dep), sources, checked)) {
				checked.set(/** @type {Derived} */ (dep), true);
				return true;
			}
		}
	}

	checked.set(reaction, false);

	return false;
}

/**
 * @param {Effect} effect
 * @returns {void}
 */
function schedule_effect(effect) {
	/** @type {Batch} */ (current_batch).schedule(effect);
}

/** @type {Source<number>[]} */
let eager_versions = [];

function eager_flush() {
	flushSync(() => {
		const eager = eager_versions;
		eager_versions = [];
		for (const version of eager) {
			(0,_sources_js__WEBPACK_IMPORTED_MODULE_8__.update)(version);
		}
	});
}

/** @type {Map<Reaction, Source<number>>} */
var version_map = new Map();

/**
 * Implementation of `$state.eager(fn())`
 * @template T
 * @param {() => T} fn
 * @returns {T}
 */
function eager(fn) {
	var initial = true;
	var value = /** @type {T} */ (undefined);

	if (_runtime_js__WEBPACK_IMPORTED_MODULE_3__.active_reaction === null) {
		return fn();
	}

	let parent = _runtime_js__WEBPACK_IMPORTED_MODULE_3__.active_reaction;

	let version = version_map.get(parent) ?? (0,_sources_js__WEBPACK_IMPORTED_MODULE_8__.source)(0);
	version_map.set(parent, version);

	(0,_effects_js__WEBPACK_IMPORTED_MODULE_9__.teardown)(() => {
		if (parent.f & _client_constants__WEBPACK_IMPORTED_MODULE_0__.DESTROYING) version_map.delete(parent);
	});

	(0,_runtime_js__WEBPACK_IMPORTED_MODULE_3__.get)(version);

	(0,_effects_js__WEBPACK_IMPORTED_MODULE_9__.eager_effect)(() => {
		if (initial) {
			// the first time this runs, we create an eager effect
			// that will run eagerly whenever the expression changes
			var previous_batch_values = batch_values;

			try {
				batch_values = null;
				value = fn();
			} finally {
				batch_values = previous_batch_values;
			}

			return;
		}

		// the second time this effect runs, it's to schedule a
		// `version` update. since this will recreate the effect,
		// we don't need to evaluate the expression here
		if (eager_versions.length === 0) {
			(0,_dom_task_js__WEBPACK_IMPORTED_MODULE_5__.queue_micro_task)(eager_flush);
		}

		eager_versions.push(version);
	});

	initial = false;

	return value;
}

/**
 * Mark all the effects inside a skipped branch CLEAN, so that
 * they can be correctly rescheduled later. Tracks dirty and maybe_dirty
 * effects so they can be rescheduled if the branch survives.
 * @param {Effect} effect
 * @param {{ d: Effect[], m: Effect[] }} tracked
 */
function reset_branch(effect, tracked) {
	// clean branch = nothing dirty inside, no need to traverse further
	if ((effect.f & _client_constants__WEBPACK_IMPORTED_MODULE_0__.BRANCH_EFFECT) !== 0 && (effect.f & _client_constants__WEBPACK_IMPORTED_MODULE_0__.CLEAN) !== 0) {
		return;
	}

	if ((effect.f & _client_constants__WEBPACK_IMPORTED_MODULE_0__.DIRTY) !== 0) {
		tracked.d.push(effect);
	} else if ((effect.f & _client_constants__WEBPACK_IMPORTED_MODULE_0__.MAYBE_DIRTY) !== 0) {
		tracked.m.push(effect);
	}

	;(0,_status_js__WEBPACK_IMPORTED_MODULE_12__.set_signal_status)(effect, _client_constants__WEBPACK_IMPORTED_MODULE_0__.CLEAN);

	var e = effect.first;
	while (e !== null) {
		reset_branch(e, tracked);
		e = e.next;
	}
}

/**
 * Mark an entire effect tree clean following an error
 * @param {Effect} effect
 */
function reset_all(effect) {
	;(0,_status_js__WEBPACK_IMPORTED_MODULE_12__.set_signal_status)(effect, _client_constants__WEBPACK_IMPORTED_MODULE_0__.CLEAN);

	var e = effect.first;
	while (e !== null) {
		reset_all(e);
		e = e.next;
	}
}

/**
 * Creates a 'fork', in which state changes are evaluated but not applied to the DOM.
 * This is useful for speculatively loading data (for example) when you suspect that
 * the user is about to take some action.
 *
 * Frameworks like SvelteKit can use this to preload data when the user touches or
 * hovers over a link, making any subsequent navigation feel instantaneous.
 *
 * The `fn` parameter is a synchronous function that modifies some state. The
 * state changes will be reverted after the fork is initialised, then reapplied
 * if and when the fork is eventually committed.
 *
 * When it becomes clear that a fork will _not_ be committed (e.g. because the
 * user navigated elsewhere), it must be discarded to avoid leaking memory.
 *
 * @param {() => void} fn
 * @returns {Fork}
 * @since 5.42
 */
function fork(fn) {
	if (!_flags_index_js__WEBPACK_IMPORTED_MODULE_1__.async_mode_flag) {
		_errors_js__WEBPACK_IMPORTED_MODULE_4__.experimental_async_required('fork');
	}

	if (current_batch !== null) {
		_errors_js__WEBPACK_IMPORTED_MODULE_4__.fork_timing();
	}

	var batch = Batch.ensure();
	batch.is_fork = true;
	batch_values = new Map();

	var committed = false;
	var settled = batch.settled();

	flushSync(fn);

	return {
		commit: async () => {
			if (committed) {
				await settled;
				return;
			}

			if (!batch.linked) {
				_errors_js__WEBPACK_IMPORTED_MODULE_4__.fork_discarded();
			}

			committed = true;

			batch.is_fork = false;

			// apply changes and update write versions so deriveds see the change
			for (var [source, [value]] of batch.current) {
				source.v = value;
				source.wv = (0,_runtime_js__WEBPACK_IMPORTED_MODULE_3__.increment_write_version)();
			}

			// trigger any `$state.eager(...)` expressions with the new state.
			// eager effects don't get scheduled like other effects, so we
			// can't just encounter them during traversal, we need to
			// proactively flush them
			// TODO maybe there's a better implementation?
			flushSync(() => {
				/** @type {Set<Effect>} */
				var eager_effects = new Set();

				for (var source of batch.current.keys()) {
					mark_eager_effects(source, eager_effects);
				}

				;(0,_sources_js__WEBPACK_IMPORTED_MODULE_8__.set_eager_effects)(eager_effects);
				(0,_sources_js__WEBPACK_IMPORTED_MODULE_8__.flush_eager_effects)();
			});

			batch.flush();
			await settled;
		},
		discard: () => {
			// cause any MAYBE_DIRTY deriveds to update
			// if they depend on things thath changed
			// inside the discarded fork
			for (var source of batch.current.keys()) {
				source.wv = (0,_runtime_js__WEBPACK_IMPORTED_MODULE_3__.increment_write_version)();
			}

			if (!committed && batch.linked) {
				batch.discard();
			}
		}
	};
}

/**
 * Forcibly remove all current batches, to prevent cross-talk between tests
 */
function clear() {
	first_batch = last_batch = null;
}


/***/ },

/***/ "./node_modules/svelte/src/internal/client/reactivity/deriveds.js"
/*!************************************************************************!*\
  !*** ./node_modules/svelte/src/internal/client/reactivity/deriveds.js ***!
  \************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OBSOLETE: () => (/* binding */ OBSOLETE),
/* harmony export */   async_derived: () => (/* binding */ async_derived),
/* harmony export */   derived: () => (/* binding */ derived),
/* harmony export */   derived_safe_equal: () => (/* binding */ derived_safe_equal),
/* harmony export */   destroy_derived_effects: () => (/* binding */ destroy_derived_effects),
/* harmony export */   execute_derived: () => (/* binding */ execute_derived),
/* harmony export */   freeze_derived_effects: () => (/* binding */ freeze_derived_effects),
/* harmony export */   reactivity_loss_tracker: () => (/* binding */ reactivity_loss_tracker),
/* harmony export */   recent_async_deriveds: () => (/* binding */ recent_async_deriveds),
/* harmony export */   set_reactivity_loss_tracker: () => (/* binding */ set_reactivity_loss_tracker),
/* harmony export */   unfreeze_derived_effects: () => (/* binding */ unfreeze_derived_effects),
/* harmony export */   update_derived: () => (/* binding */ update_derived),
/* harmony export */   user_derived: () => (/* binding */ user_derived)
/* harmony export */ });
/* harmony import */ var esm_env__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! esm-env */ "./node_modules/esm-env/index.js");
/* harmony import */ var _client_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! #client/constants */ "./node_modules/svelte/src/internal/client/constants.js");
/* harmony import */ var _runtime_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../runtime.js */ "./node_modules/svelte/src/internal/client/runtime.js");
/* harmony import */ var _dom_elements_bindings_shared_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../dom/elements/bindings/shared.js */ "./node_modules/svelte/src/internal/client/dom/elements/bindings/shared.js");
/* harmony import */ var _equality_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./equality.js */ "./node_modules/svelte/src/internal/client/reactivity/equality.js");
/* harmony import */ var _errors_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../errors.js */ "./node_modules/svelte/src/internal/client/errors.js");
/* harmony import */ var _warnings_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../warnings.js */ "./node_modules/svelte/src/internal/client/warnings.js");
/* harmony import */ var _effects_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./effects.js */ "./node_modules/svelte/src/internal/client/reactivity/effects.js");
/* harmony import */ var _sources_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./sources.js */ "./node_modules/svelte/src/internal/client/reactivity/sources.js");
/* harmony import */ var _shared_dev_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../shared/dev.js */ "./node_modules/svelte/src/internal/shared/dev.js");
/* harmony import */ var _flags_index_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../flags/index.js */ "./node_modules/svelte/src/internal/flags/index.js");
/* harmony import */ var _context_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../context.js */ "./node_modules/svelte/src/internal/client/context.js");
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../constants.js */ "./node_modules/svelte/src/constants.js");
/* harmony import */ var _batch_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./batch.js */ "./node_modules/svelte/src/internal/client/reactivity/batch.js");
/* harmony import */ var _async_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./async.js */ "./node_modules/svelte/src/internal/client/reactivity/async.js");
/* harmony import */ var _shared_utils_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../shared/utils.js */ "./node_modules/svelte/src/internal/shared/utils.js");
/* harmony import */ var _status_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./status.js */ "./node_modules/svelte/src/internal/client/reactivity/status.js");
/** @import { Derived, Effect, Reaction, Source, Value } from '#client' */
/** @import { Batch } from './batch.js'; */
/** @import { Boundary } from '../dom/blocks/boundary.js'; */


















/**
 * This allows us to track 'reactivity loss' that occurs when signals
 * are read after a non-context-restoring `await`. Dev-only
 * @type {{ effect: Effect, effect_deps: Set<Value>, warned: boolean } | null}
 */
let reactivity_loss_tracker = null;

/** @param {{ effect: Effect, effect_deps: Set<Value>, warned: boolean } | null} v */
function set_reactivity_loss_tracker(v) {
	reactivity_loss_tracker = v;
}

const recent_async_deriveds = new Set();

/**
 * @template V
 * @param {() => V} fn
 * @returns {Derived<V>}
 */
/*#__NO_SIDE_EFFECTS__*/
function derived(fn) {
	var flags = _client_constants__WEBPACK_IMPORTED_MODULE_1__.DERIVED | _client_constants__WEBPACK_IMPORTED_MODULE_1__.DIRTY;

	if (_runtime_js__WEBPACK_IMPORTED_MODULE_2__.active_effect !== null) {
		// Since deriveds are evaluated lazily, any effects created inside them are
		// created too late to ensure that the parent effect is added to the tree
		_runtime_js__WEBPACK_IMPORTED_MODULE_2__.active_effect.f |= _client_constants__WEBPACK_IMPORTED_MODULE_1__.EFFECT_PRESERVED;
	}

	/** @type {Derived<V>} */
	const signal = {
		ctx: _context_js__WEBPACK_IMPORTED_MODULE_11__.component_context,
		deps: null,
		effects: null,
		equals: _equality_js__WEBPACK_IMPORTED_MODULE_4__.equals,
		f: flags,
		fn,
		reactions: null,
		rv: 0,
		v: /** @type {V} */ (_constants_js__WEBPACK_IMPORTED_MODULE_12__.UNINITIALIZED),
		wv: 0,
		parent: _runtime_js__WEBPACK_IMPORTED_MODULE_2__.active_effect,
		ac: null
	};

	if (esm_env__WEBPACK_IMPORTED_MODULE_0__.DEV && _flags_index_js__WEBPACK_IMPORTED_MODULE_10__.tracing_mode_flag) {
		signal.created = (0,_shared_dev_js__WEBPACK_IMPORTED_MODULE_9__.get_error)('created at');
	}

	return signal;
}

const OBSOLETE = Symbol('obsolete');

/**
 * @template V
 * @param {() => V | Promise<V>} fn
 * @param {string} [label]
 * @param {string} [location] If provided, print a warning if the value is not read immediately after update
 * @returns {Promise<Source<V>>}
 */
/*#__NO_SIDE_EFFECTS__*/
function async_derived(fn, label, location) {
	let parent = /** @type {Effect | null} */ (_runtime_js__WEBPACK_IMPORTED_MODULE_2__.active_effect);

	if (parent === null) {
		_errors_js__WEBPACK_IMPORTED_MODULE_5__.async_derived_orphan();
	}

	var promise = /** @type {Promise<V>} */ (/** @type {unknown} */ (undefined));
	var signal = (0,_sources_js__WEBPACK_IMPORTED_MODULE_8__.source)(/** @type {V} */ (_constants_js__WEBPACK_IMPORTED_MODULE_12__.UNINITIALIZED));

	if (esm_env__WEBPACK_IMPORTED_MODULE_0__.DEV) signal.label = label ?? fn.toString();

	// only suspend in async deriveds created on initialisation
	var should_suspend = !_runtime_js__WEBPACK_IMPORTED_MODULE_2__.active_reaction;

	/** @type {Set<ReturnType<typeof deferred<V>>>} */
	var deferreds = new Set();

	(0,_effects_js__WEBPACK_IMPORTED_MODULE_7__.async_effect)(() => {
		var effect = /** @type {Effect} */ (_runtime_js__WEBPACK_IMPORTED_MODULE_2__.active_effect);

		if (esm_env__WEBPACK_IMPORTED_MODULE_0__.DEV) {
			reactivity_loss_tracker = { effect, effect_deps: new Set(), warned: false };
		}

		/** @type {ReturnType<typeof deferred<V>>} */
		var d = (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_15__.deferred)();
		promise = d.promise;

		try {
			// If this code is changed at some point, make sure to still access the then property
			// of fn() to read any signals it might access, so that we track them as dependencies.
			// We call `unset_context` to undo any `save` calls that happen inside `fn()`
			Promise.resolve(fn())
				.then(d.resolve, (e) => {
					// if the promise was rejected by the user, via `getAbortSignal`, then
					// wait for a subsequent resolution instead of flushing the batch
					if (e !== _client_constants__WEBPACK_IMPORTED_MODULE_1__.STALE_REACTION) d.reject(e);
				})
				.finally(_async_js__WEBPACK_IMPORTED_MODULE_14__.unset_context);
		} catch (error) {
			d.reject(error);
			(0,_async_js__WEBPACK_IMPORTED_MODULE_14__.unset_context)();
		}

		if (esm_env__WEBPACK_IMPORTED_MODULE_0__.DEV) {
			if (reactivity_loss_tracker) {
				// Reused deps from previous run (indices 0 to skipped_deps-1)
				// We deliberately only track direct dependencies of the async expression to encourage
				// dependencies being directly visible at the point of the expression
				if (effect.deps !== null) {
					for (let i = 0; i < _runtime_js__WEBPACK_IMPORTED_MODULE_2__.skipped_deps; i += 1) {
						reactivity_loss_tracker.effect_deps.add(effect.deps[i]);
					}
				}

				// New deps discovered this run
				if (_runtime_js__WEBPACK_IMPORTED_MODULE_2__.new_deps !== null) {
					for (let i = 0; i < _runtime_js__WEBPACK_IMPORTED_MODULE_2__.new_deps.length; i += 1) {
						reactivity_loss_tracker.effect_deps.add(_runtime_js__WEBPACK_IMPORTED_MODULE_2__.new_deps[i]);
					}
				}
			}

			reactivity_loss_tracker = null;
		}

		var batch = /** @type {Batch} */ (_batch_js__WEBPACK_IMPORTED_MODULE_13__.current_batch);

		if (should_suspend) {
			// we only increment the batch's pending state for updates, not creation, otherwise
			// we will decrement to zero before the work that depends on this promise (e.g. a
			// template effect) has initialized, causing the batch to resolve prematurely
			if ((effect.f & _client_constants__WEBPACK_IMPORTED_MODULE_1__.REACTION_RAN) !== 0) {
				var decrement_pending = (0,_async_js__WEBPACK_IMPORTED_MODULE_14__.increment_pending)();
			}

			if (
				// boundary can be null if the async derived is inside an $effect.root not connected to the component render tree
				parent.b?.is_rendered()
			) {
				batch.async_deriveds.get(effect)?.reject(OBSOLETE);
			} else {
				// While the boundary is still showing pending, a new run supersedes all older in-flight runs
				// for this async expression. Cancel eagerly so resolution cannot commit stale values.
				for (const d of deferreds.values()) {
					d.reject(OBSOLETE);
				}
			}

			deferreds.add(d);
			batch.async_deriveds.set(effect, d);
		}

		/**
		 * @param {any} value
		 * @param {unknown} error
		 */
		const handler = (value, error = undefined) => {
			if (esm_env__WEBPACK_IMPORTED_MODULE_0__.DEV) {
				reactivity_loss_tracker = null;
			}

			decrement_pending?.();
			deferreds.delete(d);

			if (error === OBSOLETE) return;

			batch.activate();

			if (error) {
				signal.f |= _client_constants__WEBPACK_IMPORTED_MODULE_1__.ERROR_VALUE;

				// @ts-expect-error the error is the wrong type, but we don't care
				(0,_sources_js__WEBPACK_IMPORTED_MODULE_8__.internal_set)(signal, error);
			} else {
				if ((signal.f & _client_constants__WEBPACK_IMPORTED_MODULE_1__.ERROR_VALUE) !== 0) {
					signal.f ^= _client_constants__WEBPACK_IMPORTED_MODULE_1__.ERROR_VALUE;
				}

				if (esm_env__WEBPACK_IMPORTED_MODULE_0__.DEV && location !== undefined && !signal.equals(value)) {
					recent_async_deriveds.add(signal);

					setTimeout(() => {
						if (recent_async_deriveds.has(signal) && (effect.f & _client_constants__WEBPACK_IMPORTED_MODULE_1__.DESTROYED) === 0) {
							_warnings_js__WEBPACK_IMPORTED_MODULE_6__.await_waterfall(/** @type {string} */ (signal.label), location);
							recent_async_deriveds.delete(signal);
						}
					});
				}

				;(0,_sources_js__WEBPACK_IMPORTED_MODULE_8__.internal_set)(signal, value);
			}

			batch.deactivate();
		};

		d.promise.then(handler, (e) => handler(null, e || 'unknown'));
	});

	(0,_effects_js__WEBPACK_IMPORTED_MODULE_7__.teardown)(() => {
		for (const d of deferreds) {
			d.reject(OBSOLETE);
		}
	});

	if (esm_env__WEBPACK_IMPORTED_MODULE_0__.DEV) {
		// add a flag that lets this be printed as a derived
		// when using `$inspect.trace()`
		signal.f |= _client_constants__WEBPACK_IMPORTED_MODULE_1__.ASYNC;
	}

	return new Promise((fulfil) => {
		/** @param {Promise<V>} p */
		function next(p) {
			function go() {
				if (p === promise) {
					fulfil(signal);
				} else {
					// if the effect re-runs before the initial promise
					// resolves, delay resolution until we have a value
					next(promise);
				}
			}

			p.then(go, go);
		}

		next(promise);
	});
}

/**
 * @template V
 * @param {() => V} fn
 * @returns {Derived<V>}
 */
/*#__NO_SIDE_EFFECTS__*/
function user_derived(fn) {
	const d = derived(fn);

	if (!_flags_index_js__WEBPACK_IMPORTED_MODULE_10__.async_mode_flag) (0,_runtime_js__WEBPACK_IMPORTED_MODULE_2__.push_reaction_value)(d);

	return d;
}

/**
 * @template V
 * @param {() => V} fn
 * @returns {Derived<V>}
 */
/*#__NO_SIDE_EFFECTS__*/
function derived_safe_equal(fn) {
	const signal = derived(fn);
	signal.equals = _equality_js__WEBPACK_IMPORTED_MODULE_4__.safe_equals;
	return signal;
}

/**
 * @param {Derived} derived
 * @returns {void}
 */
function destroy_derived_effects(derived) {
	var effects = derived.effects;

	if (effects !== null) {
		derived.effects = null;

		for (var i = 0; i < effects.length; i += 1) {
			(0,_effects_js__WEBPACK_IMPORTED_MODULE_7__.destroy_effect)(/** @type {Effect} */ (effects[i]));
		}
	}
}

/**
 * The currently updating deriveds, used to detect infinite recursion
 * in dev mode and provide a nicer error than 'too much recursion'
 * @type {Derived[]}
 */
let stack = [];

/**
 * @template T
 * @param {Derived} derived
 * @returns {T}
 */
function execute_derived(derived) {
	var value;
	var prev_active_effect = _runtime_js__WEBPACK_IMPORTED_MODULE_2__.active_effect;
	var parent = derived.parent;

	if (
		!_runtime_js__WEBPACK_IMPORTED_MODULE_2__.is_destroying_effect &&
		parent !== null &&
		derived.v !== _constants_js__WEBPACK_IMPORTED_MODULE_12__.UNINITIALIZED && // if it was never evaluated before, it's guaranteed to fail downstream, so we try to execute instead
		(parent.f & (_client_constants__WEBPACK_IMPORTED_MODULE_1__.DESTROYED | _client_constants__WEBPACK_IMPORTED_MODULE_1__.INERT)) !== 0
	) {
		_warnings_js__WEBPACK_IMPORTED_MODULE_6__.derived_inert();

		return derived.v;
	}

	;(0,_runtime_js__WEBPACK_IMPORTED_MODULE_2__.set_active_effect)(parent);

	if (esm_env__WEBPACK_IMPORTED_MODULE_0__.DEV) {
		let prev_eager_effects = _sources_js__WEBPACK_IMPORTED_MODULE_8__.eager_effects;
		(0,_sources_js__WEBPACK_IMPORTED_MODULE_8__.set_eager_effects)(new Set());
		try {
			if (_shared_utils_js__WEBPACK_IMPORTED_MODULE_15__.includes.call(stack, derived)) {
				_errors_js__WEBPACK_IMPORTED_MODULE_5__.derived_references_self();
			}

			stack.push(derived);

			destroy_derived_effects(derived);
			value = (0,_runtime_js__WEBPACK_IMPORTED_MODULE_2__.update_reaction)(derived);
		} finally {
			;(0,_runtime_js__WEBPACK_IMPORTED_MODULE_2__.set_active_effect)(prev_active_effect);
			(0,_sources_js__WEBPACK_IMPORTED_MODULE_8__.set_eager_effects)(prev_eager_effects);
			stack.pop();
		}
	} else {
		try {
			destroy_derived_effects(derived);
			value = (0,_runtime_js__WEBPACK_IMPORTED_MODULE_2__.update_reaction)(derived);
		} finally {
			;(0,_runtime_js__WEBPACK_IMPORTED_MODULE_2__.set_active_effect)(prev_active_effect);
		}
	}

	return value;
}

/**
 * @param {Derived} derived
 * @returns {void}
 */
function update_derived(derived) {
	var value = execute_derived(derived);

	if (!derived.equals(value)) {
		derived.wv = (0,_runtime_js__WEBPACK_IMPORTED_MODULE_2__.increment_write_version)();

		// in a fork, we don't update the underlying value, just `batch_values`.
		// the underlying value will be updated when the fork is committed.
		// otherwise, the next time we get here after a 'real world' state
		// change, `derived.equals` may incorrectly return `true`
		if (!_batch_js__WEBPACK_IMPORTED_MODULE_13__.current_batch?.is_fork || derived.deps === null) {
			if (_batch_js__WEBPACK_IMPORTED_MODULE_13__.current_batch !== null) {
				// We also write to previous_batch because if it exists, it is a sign that we're
				// currently in the process of flushing effects. These updates to deriveds may belong
				// to the previous batch, not the new one (which can already exist if an earlier
				// effect wrote to a source). This can cause bugs when running batch.#commit() later,
				// but not adding it to current_batch can, too, so we add it to both.
				// See https://github.com/sveltejs/svelte/pull/18117 for more details.
				_batch_js__WEBPACK_IMPORTED_MODULE_13__.current_batch.capture(derived, value, true);
				_batch_js__WEBPACK_IMPORTED_MODULE_13__.previous_batch?.capture(derived, value, true);
			} else {
				derived.v = value;
			}

			// deriveds without dependencies should never be recomputed
			if (derived.deps === null) {
				(0,_status_js__WEBPACK_IMPORTED_MODULE_16__.set_signal_status)(derived, _client_constants__WEBPACK_IMPORTED_MODULE_1__.CLEAN);
				return;
			}
		}
	}

	// don't mark derived clean if we're reading it inside a
	// cleanup function, or it will cache a stale value
	if (_runtime_js__WEBPACK_IMPORTED_MODULE_2__.is_destroying_effect) {
		return;
	}

	// During time traveling we don't want to reset the status so that
	// traversal of the graph in the other batches still happens
	if (_batch_js__WEBPACK_IMPORTED_MODULE_13__.batch_values !== null) {
		// only cache the value if we're in a tracking context, otherwise we won't
		// clear the cache in `mark_reactions` when dependencies are updated
		if ((0,_effects_js__WEBPACK_IMPORTED_MODULE_7__.effect_tracking)() || _batch_js__WEBPACK_IMPORTED_MODULE_13__.current_batch?.is_fork) {
			_batch_js__WEBPACK_IMPORTED_MODULE_13__.batch_values.set(derived, value);
		}
	} else {
		(0,_status_js__WEBPACK_IMPORTED_MODULE_16__.update_derived_status)(derived);
	}
}

/**
 * @param {Derived} derived
 */
function freeze_derived_effects(derived) {
	if (derived.effects === null) return;

	for (const e of derived.effects) {
		// if the effect has a teardown function or abort signal, call it
		if (e.teardown || e.ac) {
			e.teardown?.();
			if (e.ac !== null) {
				(0,_dom_elements_bindings_shared_js__WEBPACK_IMPORTED_MODULE_3__.without_reactive_context)(() => {
					/** @type {AbortController} */ (e.ac).abort(_client_constants__WEBPACK_IMPORTED_MODULE_1__.STALE_REACTION);
					e.ac = null;
				});
			}

			// make it a noop so it doesn't get called again if the derived
			// is unfrozen. we don't set it to `null`, because the existence
			// of a teardown function is what determines whether the
			// effect runs again during unfreezing (but not for teardown-only effects)
			if (e.fn !== null) e.teardown = _shared_utils_js__WEBPACK_IMPORTED_MODULE_15__.noop;

			(0,_runtime_js__WEBPACK_IMPORTED_MODULE_2__.remove_reactions)(e, 0);
			(0,_effects_js__WEBPACK_IMPORTED_MODULE_7__.destroy_effect_children)(e);
		}
	}
}

/**
 * @param {Derived} derived
 */
function unfreeze_derived_effects(derived) {
	if (derived.effects === null) return;

	for (const e of derived.effects) {
		// if the effect was previously frozen — indicated by the presence
		// of a teardown function — unfreeze it
		if (e.teardown && e.fn !== null) {
			(0,_runtime_js__WEBPACK_IMPORTED_MODULE_2__.update_effect)(e);
		}
	}
}


/***/ },

/***/ "./node_modules/svelte/src/internal/client/reactivity/effects.js"
/*!***********************************************************************!*\
  !*** ./node_modules/svelte/src/internal/client/reactivity/effects.js ***!
  \***********************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   aborted: () => (/* binding */ aborted),
/* harmony export */   async_effect: () => (/* binding */ async_effect),
/* harmony export */   block: () => (/* binding */ block),
/* harmony export */   branch: () => (/* binding */ branch),
/* harmony export */   component_root: () => (/* binding */ component_root),
/* harmony export */   create_user_effect: () => (/* binding */ create_user_effect),
/* harmony export */   deferred_template_effect: () => (/* binding */ deferred_template_effect),
/* harmony export */   destroy_block_effect_children: () => (/* binding */ destroy_block_effect_children),
/* harmony export */   destroy_effect: () => (/* binding */ destroy_effect),
/* harmony export */   destroy_effect_children: () => (/* binding */ destroy_effect_children),
/* harmony export */   eager_effect: () => (/* binding */ eager_effect),
/* harmony export */   effect: () => (/* binding */ effect),
/* harmony export */   effect_root: () => (/* binding */ effect_root),
/* harmony export */   effect_tracking: () => (/* binding */ effect_tracking),
/* harmony export */   execute_effect_teardown: () => (/* binding */ execute_effect_teardown),
/* harmony export */   legacy_pre_effect: () => (/* binding */ legacy_pre_effect),
/* harmony export */   legacy_pre_effect_reset: () => (/* binding */ legacy_pre_effect_reset),
/* harmony export */   managed: () => (/* binding */ managed),
/* harmony export */   move_effect: () => (/* binding */ move_effect),
/* harmony export */   pause_effect: () => (/* binding */ pause_effect),
/* harmony export */   remove_effect_dom: () => (/* binding */ remove_effect_dom),
/* harmony export */   render_effect: () => (/* binding */ render_effect),
/* harmony export */   resume_effect: () => (/* binding */ resume_effect),
/* harmony export */   teardown: () => (/* binding */ teardown),
/* harmony export */   template_effect: () => (/* binding */ template_effect),
/* harmony export */   unlink_effect: () => (/* binding */ unlink_effect),
/* harmony export */   user_effect: () => (/* binding */ user_effect),
/* harmony export */   user_pre_effect: () => (/* binding */ user_pre_effect),
/* harmony export */   validate_effect: () => (/* binding */ validate_effect)
/* harmony export */ });
/* harmony import */ var _runtime_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../runtime.js */ "./node_modules/svelte/src/internal/client/runtime.js");
/* harmony import */ var _client_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! #client/constants */ "./node_modules/svelte/src/internal/client/constants.js");
/* harmony import */ var _error_handling_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../error-handling.js */ "./node_modules/svelte/src/internal/client/error-handling.js");
/* harmony import */ var _errors_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../errors.js */ "./node_modules/svelte/src/internal/client/errors.js");
/* harmony import */ var esm_env__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! esm-env */ "./node_modules/esm-env/index.js");
/* harmony import */ var _shared_utils_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../shared/utils.js */ "./node_modules/svelte/src/internal/shared/utils.js");
/* harmony import */ var _dom_operations_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../dom/operations.js */ "./node_modules/svelte/src/internal/client/dom/operations.js");
/* harmony import */ var _context_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../context.js */ "./node_modules/svelte/src/internal/client/context.js");
/* harmony import */ var _batch_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./batch.js */ "./node_modules/svelte/src/internal/client/reactivity/batch.js");
/* harmony import */ var _async_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./async.js */ "./node_modules/svelte/src/internal/client/reactivity/async.js");
/* harmony import */ var _dom_elements_bindings_shared_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../dom/elements/bindings/shared.js */ "./node_modules/svelte/src/internal/client/dom/elements/bindings/shared.js");
/* harmony import */ var _status_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./status.js */ "./node_modules/svelte/src/internal/client/reactivity/status.js");
/** @import { Blocker, ComponentContext, ComponentContextLegacy, Derived, Effect, TemplateNode, TransitionManager } from '#client' */













/**
 * @param {'$effect' | '$effect.pre' | '$inspect'} rune
 */
function validate_effect(rune) {
	if (_runtime_js__WEBPACK_IMPORTED_MODULE_0__.active_effect === null) {
		if (_runtime_js__WEBPACK_IMPORTED_MODULE_0__.active_reaction === null) {
			_errors_js__WEBPACK_IMPORTED_MODULE_3__.effect_orphan(rune);
		}

		_errors_js__WEBPACK_IMPORTED_MODULE_3__.effect_in_unowned_derived();
	}

	if (_runtime_js__WEBPACK_IMPORTED_MODULE_0__.is_destroying_effect) {
		_errors_js__WEBPACK_IMPORTED_MODULE_3__.effect_in_teardown(rune);
	}
}

/**
 * @param {Effect} effect
 * @param {Effect} parent_effect
 */
function push_effect(effect, parent_effect) {
	var parent_last = parent_effect.last;
	if (parent_last === null) {
		parent_effect.last = parent_effect.first = effect;
	} else {
		parent_last.next = effect;
		effect.prev = parent_last;
		parent_effect.last = effect;
	}
}

/**
 * @param {number} type
 * @param {null | (() => void | (() => void))} fn
 * @returns {Effect}
 */
function create_effect(type, fn) {
	var parent = _runtime_js__WEBPACK_IMPORTED_MODULE_0__.active_effect;

	if (esm_env__WEBPACK_IMPORTED_MODULE_4__.DEV) {
		// Ensure the parent is never an inspect effect
		while (parent !== null && (parent.f & _client_constants__WEBPACK_IMPORTED_MODULE_1__.EAGER_EFFECT) !== 0) {
			parent = parent.parent;
		}
	}

	if (parent !== null && (parent.f & _client_constants__WEBPACK_IMPORTED_MODULE_1__.INERT) !== 0) {
		type |= _client_constants__WEBPACK_IMPORTED_MODULE_1__.INERT;
	}

	/** @type {Effect} */
	var effect = {
		ctx: _context_js__WEBPACK_IMPORTED_MODULE_7__.component_context,
		deps: null,
		nodes: null,
		f: type | _client_constants__WEBPACK_IMPORTED_MODULE_1__.DIRTY | _client_constants__WEBPACK_IMPORTED_MODULE_1__.CONNECTED,
		first: null,
		fn,
		last: null,
		next: null,
		parent,
		b: parent && parent.b,
		prev: null,
		teardown: null,
		wv: 0,
		ac: null
	};

	if (esm_env__WEBPACK_IMPORTED_MODULE_4__.DEV) {
		effect.component_function = _context_js__WEBPACK_IMPORTED_MODULE_7__.dev_current_component_function;
	}

	_batch_js__WEBPACK_IMPORTED_MODULE_8__.current_batch?.register_created_effect(effect);

	/** @type {Effect | null} */
	var e = effect;

	if ((type & _client_constants__WEBPACK_IMPORTED_MODULE_1__.EFFECT) !== 0) {
		if (_batch_js__WEBPACK_IMPORTED_MODULE_8__.collected_effects !== null) {
			// created during traversal — collect and run afterwards
			_batch_js__WEBPACK_IMPORTED_MODULE_8__.collected_effects.push(effect);
		} else {
			// schedule for later
			_batch_js__WEBPACK_IMPORTED_MODULE_8__.Batch.ensure().schedule(effect);
		}
	} else if (fn !== null) {
		try {
			(0,_runtime_js__WEBPACK_IMPORTED_MODULE_0__.update_effect)(effect);
		} catch (e) {
			destroy_effect(effect);
			throw e;
		}

		// if an effect doesn't need to be kept in the tree (because it
		// won't re-run, has no DOM, and has no teardown etc)
		// then we skip it and go to its child (if any)
		if (
			e.deps === null &&
			e.teardown === null &&
			e.nodes === null &&
			e.first === e.last && // either `null`, or a singular child
			(e.f & _client_constants__WEBPACK_IMPORTED_MODULE_1__.EFFECT_PRESERVED) === 0
		) {
			e = e.first;
			if ((type & _client_constants__WEBPACK_IMPORTED_MODULE_1__.BLOCK_EFFECT) !== 0 && (type & _client_constants__WEBPACK_IMPORTED_MODULE_1__.EFFECT_TRANSPARENT) !== 0 && e !== null) {
				e.f |= _client_constants__WEBPACK_IMPORTED_MODULE_1__.EFFECT_TRANSPARENT;
			}
		}
	}

	if (e !== null) {
		e.parent = parent;

		if (parent !== null) {
			push_effect(e, parent);
		}

		// if we're in a derived, add the effect there too
		if (
			_runtime_js__WEBPACK_IMPORTED_MODULE_0__.active_reaction !== null &&
			(_runtime_js__WEBPACK_IMPORTED_MODULE_0__.active_reaction.f & _client_constants__WEBPACK_IMPORTED_MODULE_1__.DERIVED) !== 0 &&
			(type & _client_constants__WEBPACK_IMPORTED_MODULE_1__.ROOT_EFFECT) === 0
		) {
			var derived = /** @type {Derived} */ (_runtime_js__WEBPACK_IMPORTED_MODULE_0__.active_reaction);
			(derived.effects ??= []).push(e);
		}
	}

	return effect;
}

/**
 * Internal representation of `$effect.tracking()`
 * @returns {boolean}
 */
function effect_tracking() {
	return _runtime_js__WEBPACK_IMPORTED_MODULE_0__.active_reaction !== null && !_runtime_js__WEBPACK_IMPORTED_MODULE_0__.untracking;
}

/**
 * @param {() => void} fn
 */
function teardown(fn) {
	const effect = create_effect(_client_constants__WEBPACK_IMPORTED_MODULE_1__.RENDER_EFFECT, null);
	(0,_status_js__WEBPACK_IMPORTED_MODULE_11__.set_signal_status)(effect, _client_constants__WEBPACK_IMPORTED_MODULE_1__.CLEAN);
	effect.teardown = fn;
	return effect;
}

/**
 * Internal representation of `$effect(...)`
 * @param {() => void | (() => void)} fn
 */
function user_effect(fn) {
	validate_effect('$effect');

	if (esm_env__WEBPACK_IMPORTED_MODULE_4__.DEV) {
		(0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_5__.define_property)(fn, 'name', {
			value: '$effect'
		});
	}

	// Non-nested `$effect(...)` in a component should be deferred
	// until the component is mounted
	var flags = /** @type {Effect} */ (_runtime_js__WEBPACK_IMPORTED_MODULE_0__.active_effect).f;
	var defer =
		!_runtime_js__WEBPACK_IMPORTED_MODULE_0__.active_reaction &&
		(flags & _client_constants__WEBPACK_IMPORTED_MODULE_1__.BRANCH_EFFECT) !== 0 &&
		_context_js__WEBPACK_IMPORTED_MODULE_7__.component_context !== null &&
		!_context_js__WEBPACK_IMPORTED_MODULE_7__.component_context.i;

	if (defer) {
		// Top-level `$effect(...)` in an unmounted component — defer until mount
		var context = /** @type {ComponentContext} */ (_context_js__WEBPACK_IMPORTED_MODULE_7__.component_context);
		(context.e ??= []).push(fn);
	} else {
		// Everything else — create immediately
		return create_user_effect(fn);
	}
}

/**
 * @param {() => void | (() => void)} fn
 */
function create_user_effect(fn) {
	return create_effect(_client_constants__WEBPACK_IMPORTED_MODULE_1__.EFFECT | _client_constants__WEBPACK_IMPORTED_MODULE_1__.USER_EFFECT, fn);
}

/**
 * Internal representation of `$effect.pre(...)`
 * @param {() => void | (() => void)} fn
 * @returns {Effect}
 */
function user_pre_effect(fn) {
	validate_effect('$effect.pre');
	if (esm_env__WEBPACK_IMPORTED_MODULE_4__.DEV) {
		(0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_5__.define_property)(fn, 'name', {
			value: '$effect.pre'
		});
	}
	return create_effect(_client_constants__WEBPACK_IMPORTED_MODULE_1__.RENDER_EFFECT | _client_constants__WEBPACK_IMPORTED_MODULE_1__.USER_EFFECT, fn);
}

/** @param {() => void | (() => void)} fn */
function eager_effect(fn) {
	return create_effect(_client_constants__WEBPACK_IMPORTED_MODULE_1__.EAGER_EFFECT, fn);
}

/**
 * Internal representation of `$effect.root(...)`
 * @param {() => void | (() => void)} fn
 * @returns {() => void}
 */
function effect_root(fn) {
	_batch_js__WEBPACK_IMPORTED_MODULE_8__.Batch.ensure();
	const effect = create_effect(_client_constants__WEBPACK_IMPORTED_MODULE_1__.ROOT_EFFECT | _client_constants__WEBPACK_IMPORTED_MODULE_1__.EFFECT_PRESERVED, fn);

	return () => {
		destroy_effect(effect);
	};
}

/**
 * An effect root whose children can transition out
 * @param {() => void} fn
 * @returns {(options?: { outro?: boolean }) => Promise<void>}
 */
function component_root(fn) {
	_batch_js__WEBPACK_IMPORTED_MODULE_8__.Batch.ensure();
	const effect = create_effect(_client_constants__WEBPACK_IMPORTED_MODULE_1__.ROOT_EFFECT | _client_constants__WEBPACK_IMPORTED_MODULE_1__.EFFECT_PRESERVED, fn);

	return (options = {}) => {
		return new Promise((fulfil) => {
			if (options.outro) {
				pause_effect(effect, () => {
					destroy_effect(effect);
					fulfil(undefined);
				});
			} else {
				destroy_effect(effect);
				fulfil(undefined);
			}
		});
	};
}

/**
 * @param {() => void | (() => void)} fn
 * @returns {Effect}
 */
function effect(fn) {
	return create_effect(_client_constants__WEBPACK_IMPORTED_MODULE_1__.EFFECT, fn);
}

/**
 * Internal representation of `$: ..`
 * @param {() => any} deps
 * @param {() => void | (() => void)} fn
 */
function legacy_pre_effect(deps, fn) {
	var context = /** @type {ComponentContextLegacy} */ (_context_js__WEBPACK_IMPORTED_MODULE_7__.component_context);

	/** @type {{ effect: null | Effect, ran: boolean, deps: () => any }} */
	var token = { effect: null, ran: false, deps };

	context.l.$.push(token);

	token.effect = render_effect(() => {
		deps();

		// If this legacy pre effect has already run before the end of the reset, then
		// bail out to emulate the same behavior.
		if (token.ran) return;

		token.ran = true;

		var effect = /** @type {Effect} */ (_runtime_js__WEBPACK_IMPORTED_MODULE_0__.active_effect);

		// here, we lie: by setting `active_effect` to be the parent branch, any writes
		// that happen inside `fn` will _not_ cause an unnecessary reschedule, because
		// the affected effects will be children of `active_effect`. this is safe
		// because these effects are known to run in the correct order
		try {
			(0,_runtime_js__WEBPACK_IMPORTED_MODULE_0__.set_active_effect)(effect.parent);
			(0,_runtime_js__WEBPACK_IMPORTED_MODULE_0__.untrack)(fn);
		} finally {
			;(0,_runtime_js__WEBPACK_IMPORTED_MODULE_0__.set_active_effect)(effect);
		}
	});
}

function legacy_pre_effect_reset() {
	var context = /** @type {ComponentContextLegacy} */ (_context_js__WEBPACK_IMPORTED_MODULE_7__.component_context);

	render_effect(() => {
		// Run dirty `$:` statements
		for (var token of context.l.$) {
			token.deps();

			var effect = token.effect;

			// If the effect is CLEAN, then make it MAYBE_DIRTY. This ensures we traverse through
			// the effects dependencies and correctly ensure each dependency is up-to-date.
			if ((effect.f & _client_constants__WEBPACK_IMPORTED_MODULE_1__.CLEAN) !== 0 && effect.deps !== null) {
				(0,_status_js__WEBPACK_IMPORTED_MODULE_11__.set_signal_status)(effect, _client_constants__WEBPACK_IMPORTED_MODULE_1__.MAYBE_DIRTY);
			}

			if ((0,_runtime_js__WEBPACK_IMPORTED_MODULE_0__.is_dirty)(effect)) {
				(0,_runtime_js__WEBPACK_IMPORTED_MODULE_0__.update_effect)(effect);
			}

			token.ran = false;
		}
	});
}

/**
 * @param {() => void | (() => void)} fn
 * @returns {Effect}
 */
function async_effect(fn) {
	return create_effect(_client_constants__WEBPACK_IMPORTED_MODULE_1__.ASYNC | _client_constants__WEBPACK_IMPORTED_MODULE_1__.EFFECT_PRESERVED, fn);
}

/**
 * @param {() => void | (() => void)} fn
 * @returns {Effect}
 */
function render_effect(fn, flags = 0) {
	return create_effect(_client_constants__WEBPACK_IMPORTED_MODULE_1__.RENDER_EFFECT | flags, fn);
}

/**
 * @param {(...expressions: any) => void | (() => void)} fn
 * @param {Array<() => any>} sync
 * @param {Array<() => Promise<any>>} async
 * @param {Blocker[]} blockers
 */
function template_effect(fn, sync = [], async = [], blockers = []) {
	;(0,_async_js__WEBPACK_IMPORTED_MODULE_9__.flatten)(blockers, sync, async, (values) => {
		create_effect(_client_constants__WEBPACK_IMPORTED_MODULE_1__.RENDER_EFFECT, () => {
			fn(...values.map(_runtime_js__WEBPACK_IMPORTED_MODULE_0__.get));
		});
	});
}

/**
 * Like `template_effect`, but with an effect which is deferred until the batch commits
 * @param {(...expressions: any) => void | (() => void)} fn
 * @param {Array<() => any>} sync
 * @param {Array<() => Promise<any>>} async
 * @param {Blocker[]} blockers
 */
function deferred_template_effect(fn, sync = [], async = [], blockers = []) {
	;(0,_async_js__WEBPACK_IMPORTED_MODULE_9__.flatten)(blockers, sync, async, (values) => {
		create_effect(_client_constants__WEBPACK_IMPORTED_MODULE_1__.EFFECT, () => fn(...values.map(_runtime_js__WEBPACK_IMPORTED_MODULE_0__.get)));
	});
}

/**
 * @param {(() => void)} fn
 * @param {number} flags
 */
function block(fn, flags = 0) {
	var effect = create_effect(_client_constants__WEBPACK_IMPORTED_MODULE_1__.BLOCK_EFFECT | flags, fn);
	if (esm_env__WEBPACK_IMPORTED_MODULE_4__.DEV) {
		effect.dev_stack = _context_js__WEBPACK_IMPORTED_MODULE_7__.dev_stack;
	}
	return effect;
}

/**
 * @param {(() => void)} fn
 * @param {number} flags
 */
function managed(fn, flags = 0) {
	var effect = create_effect(_client_constants__WEBPACK_IMPORTED_MODULE_1__.MANAGED_EFFECT | flags, fn);
	if (esm_env__WEBPACK_IMPORTED_MODULE_4__.DEV) {
		effect.dev_stack = _context_js__WEBPACK_IMPORTED_MODULE_7__.dev_stack;
	}
	return effect;
}

/**
 * @param {(() => void)} fn
 */
function branch(fn) {
	return create_effect(_client_constants__WEBPACK_IMPORTED_MODULE_1__.BRANCH_EFFECT | _client_constants__WEBPACK_IMPORTED_MODULE_1__.EFFECT_PRESERVED, fn);
}

/**
 * @param {Effect} effect
 */
function execute_effect_teardown(effect) {
	var teardown = effect.teardown;
	if (teardown !== null) {
		const previously_destroying_effect = _runtime_js__WEBPACK_IMPORTED_MODULE_0__.is_destroying_effect;
		const previous_reaction = _runtime_js__WEBPACK_IMPORTED_MODULE_0__.active_reaction;
		(0,_runtime_js__WEBPACK_IMPORTED_MODULE_0__.set_is_destroying_effect)(true);
		(0,_runtime_js__WEBPACK_IMPORTED_MODULE_0__.set_active_reaction)(null);
		try {
			teardown.call(null);
		} catch (error) {
			// Route teardown errors through the boundary system so that a live
			// ancestor <svelte:boundary> can handle them. Boundaries that are
			// themselves mid-teardown are skipped by invoke_error_boundary.
			;(0,_error_handling_js__WEBPACK_IMPORTED_MODULE_2__.invoke_error_boundary)(error, effect.parent);
		} finally {
			;(0,_runtime_js__WEBPACK_IMPORTED_MODULE_0__.set_is_destroying_effect)(previously_destroying_effect);
			(0,_runtime_js__WEBPACK_IMPORTED_MODULE_0__.set_active_reaction)(previous_reaction);
		}
	}
}

/**
 * @param {Effect} signal
 * @param {boolean} remove_dom
 * @returns {void}
 */
function destroy_effect_children(signal, remove_dom = false) {
	var effect = signal.first;
	signal.first = signal.last = null;

	while (effect !== null) {
		const controller = effect.ac;

		if (controller !== null) {
			(0,_dom_elements_bindings_shared_js__WEBPACK_IMPORTED_MODULE_10__.without_reactive_context)(() => {
				controller.abort(_client_constants__WEBPACK_IMPORTED_MODULE_1__.STALE_REACTION);
			});
		}

		var next = effect.next;

		if ((effect.f & _client_constants__WEBPACK_IMPORTED_MODULE_1__.ROOT_EFFECT) !== 0) {
			// this is now an independent root
			effect.parent = null;
		} else {
			destroy_effect(effect, remove_dom);
		}

		effect = next;
	}
}

/**
 * @param {Effect} signal
 * @returns {void}
 */
function destroy_block_effect_children(signal) {
	var effect = signal.first;

	while (effect !== null) {
		var next = effect.next;
		if ((effect.f & _client_constants__WEBPACK_IMPORTED_MODULE_1__.BRANCH_EFFECT) === 0) {
			destroy_effect(effect);
		}
		effect = next;
	}
}

/**
 * @param {Effect} effect
 * @param {boolean} [remove_dom]
 * @returns {void}
 */
function destroy_effect(effect, remove_dom = true) {
	var removed = false;

	if (
		(remove_dom || (effect.f & _client_constants__WEBPACK_IMPORTED_MODULE_1__.HEAD_EFFECT) !== 0) &&
		effect.nodes !== null &&
		effect.nodes.end !== null
	) {
		remove_effect_dom(effect.nodes.start, /** @type {TemplateNode} */ (effect.nodes.end));
		removed = true;
	}

	effect.f |= _client_constants__WEBPACK_IMPORTED_MODULE_1__.DESTROYING;
	destroy_effect_children(effect, remove_dom && !removed);
	(0,_runtime_js__WEBPACK_IMPORTED_MODULE_0__.remove_reactions)(effect, 0);

	var transitions = effect.nodes && effect.nodes.t;

	if (transitions !== null) {
		for (const transition of transitions) {
			transition.stop();
		}
	}

	execute_effect_teardown(effect);

	effect.f ^= _client_constants__WEBPACK_IMPORTED_MODULE_1__.DESTROYING;
	effect.f |= _client_constants__WEBPACK_IMPORTED_MODULE_1__.DESTROYED;

	var parent = effect.parent;

	// If the parent doesn't have any children, then skip this work altogether
	if (parent !== null && parent.first !== null) {
		unlink_effect(effect);
	}

	if (esm_env__WEBPACK_IMPORTED_MODULE_4__.DEV) {
		effect.component_function = null;
	}

	// `first` and `child` are nulled out in destroy_effect_children
	// we don't null out `parent` so that error propagation can work correctly
	effect.next =
		effect.prev =
		effect.teardown =
		effect.ctx =
		effect.deps =
		effect.fn =
		effect.nodes =
		effect.ac =
		effect.b =
			null;
}

/**
 *
 * @param {TemplateNode | null} node
 * @param {TemplateNode} end
 */
function remove_effect_dom(node, end) {
	while (node !== null) {
		/** @type {TemplateNode | null} */
		var next = node === end ? null : (0,_dom_operations_js__WEBPACK_IMPORTED_MODULE_6__.get_next_sibling)(node);

		node.remove();
		node = next;
	}
}

/**
 * Detach an effect from the effect tree, freeing up memory and
 * reducing the amount of work that happens on subsequent traversals
 * @param {Effect} effect
 */
function unlink_effect(effect) {
	var parent = effect.parent;
	var prev = effect.prev;
	var next = effect.next;

	if (prev !== null) prev.next = next;
	if (next !== null) next.prev = prev;

	if (parent !== null) {
		if (parent.first === effect) parent.first = next;
		if (parent.last === effect) parent.last = prev;
	}
}

/**
 * When a block effect is removed, we don't immediately destroy it or yank it
 * out of the DOM, because it might have transitions. Instead, we 'pause' it.
 * It stays around (in memory, and in the DOM) until outro transitions have
 * completed, and if the state change is reversed then we _resume_ it.
 * A paused effect does not update, and the DOM subtree becomes inert.
 * @param {Effect} effect
 * @param {() => void} [callback]
 * @param {boolean} [destroy]
 */
function pause_effect(effect, callback, destroy = true) {
	/** @type {TransitionManager[]} */
	var transitions = [];

	effect.f |= _client_constants__WEBPACK_IMPORTED_MODULE_1__.PAUSED;
	pause_children(effect, transitions, true);

	var fn = () => {
		if (destroy) destroy_effect(effect);
		if (callback) callback();
	};

	var remaining = transitions.length;
	if (remaining > 0) {
		var check = () => --remaining || fn();
		for (var transition of transitions) {
			transition.out(check);
		}
	} else {
		fn();
	}
}

/**
 * @param {Effect} effect
 * @param {TransitionManager[]} transitions
 * @param {boolean} local
 */
function pause_children(effect, transitions, local) {
	if ((effect.f & _client_constants__WEBPACK_IMPORTED_MODULE_1__.INERT) !== 0) return;
	effect.f ^= _client_constants__WEBPACK_IMPORTED_MODULE_1__.INERT;

	var t = effect.nodes && effect.nodes.t;

	if (t !== null) {
		for (const transition of t) {
			if (transition.is_global || local) {
				transitions.push(transition);
			}
		}
	}

	var child = effect.first;

	while (child !== null) {
		var sibling = child.next;

		// If this child is a root effect, then it will become an independent root when its parent
		// is destroyed, it should therefore not become inert nor partake in transitions.
		if ((child.f & _client_constants__WEBPACK_IMPORTED_MODULE_1__.ROOT_EFFECT) === 0) {
			var transparent =
				(child.f & _client_constants__WEBPACK_IMPORTED_MODULE_1__.EFFECT_TRANSPARENT) !== 0 ||
				// If this is a branch effect without a block effect parent,
				// it means the parent block effect was pruned. In that case,
				// transparency information was transferred to the branch effect.
				((child.f & _client_constants__WEBPACK_IMPORTED_MODULE_1__.BRANCH_EFFECT) !== 0 && (effect.f & _client_constants__WEBPACK_IMPORTED_MODULE_1__.BLOCK_EFFECT) !== 0);
			// TODO we don't need to call pause_children recursively with a linked list in place
			// it's slightly more involved though as we have to account for `transparent` changing
			// through the tree.
			pause_children(child, transitions, transparent ? local : false);
		}

		child = sibling;
	}
}

/**
 * The opposite of `pause_effect`. We call this if (for example)
 * `x` becomes falsy then truthy: `{#if x}...{/if}`
 * @param {Effect} effect
 */
function resume_effect(effect) {
	effect.f &= ~_client_constants__WEBPACK_IMPORTED_MODULE_1__.PAUSED;
	resume_children(effect, true);
}

/**
 * @param {Effect} effect
 * @param {boolean} local
 */
function resume_children(effect, local) {
	// this subtree was paused for its own reasons (e.g. a block whose condition
	// is still false) — its controller will resume or destroy it
	if ((effect.f & _client_constants__WEBPACK_IMPORTED_MODULE_1__.PAUSED) !== 0) return;

	if ((effect.f & _client_constants__WEBPACK_IMPORTED_MODULE_1__.INERT) === 0) return;
	effect.f ^= _client_constants__WEBPACK_IMPORTED_MODULE_1__.INERT;

	// If a dependency of this effect changed while it was paused,
	// schedule the effect to update. we don't use `is_dirty`
	// here because we don't want to eagerly recompute a derived like
	// `{#if foo}{foo.bar()}{/if}` if `foo` is now `undefined
	if ((effect.f & _client_constants__WEBPACK_IMPORTED_MODULE_1__.CLEAN) === 0) {
		(0,_status_js__WEBPACK_IMPORTED_MODULE_11__.set_signal_status)(effect, _client_constants__WEBPACK_IMPORTED_MODULE_1__.DIRTY);
		_batch_js__WEBPACK_IMPORTED_MODULE_8__.Batch.ensure().schedule(effect); // Assumption: This happens during the commit phase of the batch, causing another flush, but it's safe
	}

	var child = effect.first;

	while (child !== null) {
		var sibling = child.next;
		var transparent = (child.f & _client_constants__WEBPACK_IMPORTED_MODULE_1__.EFFECT_TRANSPARENT) !== 0 || (child.f & _client_constants__WEBPACK_IMPORTED_MODULE_1__.BRANCH_EFFECT) !== 0;
		// TODO we don't need to call resume_children recursively with a linked list in place
		// it's slightly more involved though as we have to account for `transparent` changing
		// through the tree.
		resume_children(child, transparent ? local : false);
		child = sibling;
	}

	var t = effect.nodes && effect.nodes.t;

	if (t !== null) {
		for (const transition of t) {
			if (transition.is_global || local) {
				transition.in();
			}
		}
	}
}

function aborted(effect = /** @type {Effect} */ (_runtime_js__WEBPACK_IMPORTED_MODULE_0__.active_effect)) {
	return (effect.f & _client_constants__WEBPACK_IMPORTED_MODULE_1__.DESTROYED) !== 0;
}

/**
 * @param {Effect} effect
 * @param {DocumentFragment} fragment
 */
function move_effect(effect, fragment) {
	if (!effect.nodes) return;

	/** @type {TemplateNode | null} */
	var node = effect.nodes.start;
	var end = effect.nodes.end;

	while (node !== null) {
		/** @type {TemplateNode | null} */
		var next = node === end ? null : (0,_dom_operations_js__WEBPACK_IMPORTED_MODULE_6__.get_next_sibling)(node);

		fragment.append(node);
		node = next;
	}
}


/***/ },

/***/ "./node_modules/svelte/src/internal/client/reactivity/equality.js"
/*!************************************************************************!*\
  !*** ./node_modules/svelte/src/internal/client/reactivity/equality.js ***!
  \************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   equals: () => (/* binding */ equals),
/* harmony export */   not_equal: () => (/* binding */ not_equal),
/* harmony export */   safe_equals: () => (/* binding */ safe_equals),
/* harmony export */   safe_not_equal: () => (/* binding */ safe_not_equal)
/* harmony export */ });
/** @import { Equals } from '#client' */

/** @type {Equals} */
function equals(value) {
	return value === this.v;
}

/**
 * @param {unknown} a
 * @param {unknown} b
 * @returns {boolean}
 */
function safe_not_equal(a, b) {
	return a != a
		? b == b
		: a !== b || (a !== null && typeof a === 'object') || typeof a === 'function';
}

/**
 * @param {unknown} a
 * @param {unknown} b
 * @returns {boolean}
 */
function not_equal(a, b) {
	return a !== b;
}

/** @type {Equals} */
function safe_equals(value) {
	return !safe_not_equal(value, this.v);
}


/***/ },

/***/ "./node_modules/svelte/src/internal/client/reactivity/props.js"
/*!*********************************************************************!*\
  !*** ./node_modules/svelte/src/internal/client/reactivity/props.js ***!
  \*********************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   legacy_rest_props: () => (/* binding */ legacy_rest_props),
/* harmony export */   prop: () => (/* binding */ prop),
/* harmony export */   rest_props: () => (/* binding */ rest_props),
/* harmony export */   spread_props: () => (/* binding */ spread_props),
/* harmony export */   update_pre_prop: () => (/* binding */ update_pre_prop),
/* harmony export */   update_prop: () => (/* binding */ update_prop)
/* harmony export */ });
/* harmony import */ var esm_env__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! esm-env */ "./node_modules/esm-env/index.js");
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../constants.js */ "./node_modules/svelte/src/constants.js");
/* harmony import */ var _shared_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/utils.js */ "./node_modules/svelte/src/internal/shared/utils.js");
/* harmony import */ var _sources_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./sources.js */ "./node_modules/svelte/src/internal/client/reactivity/sources.js");
/* harmony import */ var _deriveds_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./deriveds.js */ "./node_modules/svelte/src/internal/client/reactivity/deriveds.js");
/* harmony import */ var _runtime_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../runtime.js */ "./node_modules/svelte/src/internal/client/runtime.js");
/* harmony import */ var _errors_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../errors.js */ "./node_modules/svelte/src/internal/client/errors.js");
/* harmony import */ var _client_constants__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! #client/constants */ "./node_modules/svelte/src/internal/client/constants.js");
/* harmony import */ var _proxy_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../proxy.js */ "./node_modules/svelte/src/internal/client/proxy.js");
/* harmony import */ var _store_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./store.js */ "./node_modules/svelte/src/internal/client/reactivity/store.js");
/* harmony import */ var _flags_index_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../flags/index.js */ "./node_modules/svelte/src/internal/flags/index.js");
/* harmony import */ var _effects_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./effects.js */ "./node_modules/svelte/src/internal/client/reactivity/effects.js");
/** @import { Derived, Effect, Source } from './types.js' */













/**
 * @param {((value?: number) => number)} fn
 * @param {1 | -1} [d]
 * @returns {number}
 */
function update_prop(fn, d = 1) {
	const value = fn();
	fn(value + d);
	return value;
}

/**
 * @param {((value?: number) => number)} fn
 * @param {1 | -1} [d]
 * @returns {number}
 */
function update_pre_prop(fn, d = 1) {
	const value = fn() + d;
	fn(value);
	return value;
}

/**
 * The proxy handler for rest props (i.e. `const { x, ...rest } = $props()`).
 * Is passed the full `$$props` object and excludes the named props.
 * @type {ProxyHandler<{ props: Record<string | symbol, unknown>, exclude: Set<string | symbol>, name?: string }>}}
 */
const rest_props_handler = {
	get(target, key) {
		if (target.exclude.has(key)) return;
		return target.props[key];
	},
	set(target, key) {
		if (esm_env__WEBPACK_IMPORTED_MODULE_0__.DEV) {
			// TODO should this happen in prod too?
			_errors_js__WEBPACK_IMPORTED_MODULE_6__.props_rest_readonly(`${target.name}.${String(key)}`);
		}

		return false;
	},
	getOwnPropertyDescriptor(target, key) {
		if (target.exclude.has(key)) return;
		if (key in target.props) {
			return {
				enumerable: true,
				configurable: true,
				value: target.props[key]
			};
		}
	},
	has(target, key) {
		if (target.exclude.has(key)) return false;
		return key in target.props;
	},
	ownKeys(target) {
		return Reflect.ownKeys(target.props).filter((key) => !target.exclude.has(key));
	}
};

/**
 * @param {Record<string, unknown>} props
 * @param {Set<string>} exclude
 * @param {string} [name]
 * @returns {Record<string, unknown>}
 */
/*#__NO_SIDE_EFFECTS__*/
function rest_props(props, exclude, name) {
	return new Proxy(esm_env__WEBPACK_IMPORTED_MODULE_0__.DEV ? { props, exclude, name } : { props, exclude }, rest_props_handler);
}

/**
 * The proxy handler for legacy $$restProps and $$props
 * @type {ProxyHandler<{ props: Record<string | symbol, unknown>, exclude: Array<string | symbol>, special: Record<string | symbol, (v?: unknown) => unknown>, version: Source<number>, parent_effect: Effect }>}}
 */
const legacy_rest_props_handler = {
	get(target, key) {
		if (target.exclude.includes(key)) return;
		(0,_runtime_js__WEBPACK_IMPORTED_MODULE_5__.get)(target.version);
		return key in target.special ? target.special[key]() : target.props[key];
	},
	set(target, key, value) {
		if (!(key in target.special)) {
			var previous_effect = _runtime_js__WEBPACK_IMPORTED_MODULE_5__.active_effect;

			try {
				(0,_runtime_js__WEBPACK_IMPORTED_MODULE_5__.set_active_effect)(target.parent_effect);

				// Handle props that can temporarily get out of sync with the parent
				/** @type {Record<string, (v?: unknown) => unknown>} */
				target.special[key] = prop(
					{
						get [key]() {
							return target.props[key];
						}
					},
					/** @type {string} */ (key),
					_constants_js__WEBPACK_IMPORTED_MODULE_1__.PROPS_IS_UPDATED
				);
			} finally {
				;(0,_runtime_js__WEBPACK_IMPORTED_MODULE_5__.set_active_effect)(previous_effect);
			}
		}

		target.special[key](value);
		(0,_sources_js__WEBPACK_IMPORTED_MODULE_3__.update)(target.version); // $$props is coarse-grained: when $$props.x is updated, usages of $$props.y etc are also rerun
		return true;
	},
	getOwnPropertyDescriptor(target, key) {
		if (target.exclude.includes(key)) return;
		if (key in target.props) {
			return {
				enumerable: true,
				configurable: true,
				value: target.props[key]
			};
		}
	},
	deleteProperty(target, key) {
		// Svelte 4 allowed for deletions on $$restProps
		if (target.exclude.includes(key)) return true;
		target.exclude.push(key);
		(0,_sources_js__WEBPACK_IMPORTED_MODULE_3__.update)(target.version);
		return true;
	},
	has(target, key) {
		if (target.exclude.includes(key)) return false;
		return key in target.props;
	},
	ownKeys(target) {
		return Reflect.ownKeys(target.props).filter((key) => !target.exclude.includes(key));
	}
};

/**
 * @param {Record<string, unknown>} props
 * @param {string[]} exclude
 * @returns {Record<string, unknown>}
 */
function legacy_rest_props(props, exclude) {
	return new Proxy(
		{
			props,
			exclude,
			special: {},
			version: (0,_sources_js__WEBPACK_IMPORTED_MODULE_3__.source)(0),
			// TODO this is only necessary because we need to track component
			// destruction inside `prop`, because of `bind:this`, but it
			// seems likely that we can simplify `bind:this` instead
			parent_effect: /** @type {Effect} */ (_runtime_js__WEBPACK_IMPORTED_MODULE_5__.active_effect)
		},
		legacy_rest_props_handler
	);
}

/**
 * The proxy handler for spread props. Handles the incoming array of props
 * that looks like `() => { dynamic: props }, { static: prop }, ..` and wraps
 * them so that the whole thing is passed to the component as the `$$props` argument.
 * @type {ProxyHandler<{ props: Array<Record<string | symbol, unknown> | (() => Record<string | symbol, unknown>)> }>}}
 */
const spread_props_handler = {
	get(target, key) {
		let i = target.props.length;
		while (i--) {
			let p = target.props[i];
			if ((0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_2__.is_function)(p)) p = p();
			if (typeof p === 'object' && p !== null && key in p) return p[key];
		}
	},
	set(target, key, value) {
		let i = target.props.length;
		while (i--) {
			let p = target.props[i];
			if ((0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_2__.is_function)(p)) p = p();
			const desc = (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_2__.get_descriptor)(p, key);
			if (desc && desc.set) {
				desc.set(value);
				return true;
			}
		}
		return false;
	},
	getOwnPropertyDescriptor(target, key) {
		let i = target.props.length;
		while (i--) {
			let p = target.props[i];
			if ((0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_2__.is_function)(p)) p = p();
			if (typeof p === 'object' && p !== null && key in p) {
				const descriptor = (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_2__.get_descriptor)(p, key);
				if (descriptor && !descriptor.configurable) {
					// Prevent a "Non-configurability Report Error": The target is an array, it does
					// not actually contain this property. If it is now described as non-configurable,
					// the proxy throws a validation error. Setting it to true avoids that.
					descriptor.configurable = true;
				}
				return descriptor;
			}
		}
	},
	has(target, key) {
		// To prevent a false positive `is_entry_props` in the `prop` function
		if (key === _client_constants__WEBPACK_IMPORTED_MODULE_7__.STATE_SYMBOL || key === _client_constants__WEBPACK_IMPORTED_MODULE_7__.LEGACY_PROPS) return false;

		for (let p of target.props) {
			if ((0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_2__.is_function)(p)) p = p();
			if (p != null && key in p) return true;
		}

		return false;
	},
	ownKeys(target) {
		/** @type {Array<string | symbol>} */
		const keys = [];

		for (let p of target.props) {
			if ((0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_2__.is_function)(p)) p = p();
			if (!p) continue;

			for (const key in p) {
				if (!keys.includes(key)) keys.push(key);
			}

			for (const key of Object.getOwnPropertySymbols(p)) {
				if (!keys.includes(key)) keys.push(key);
			}
		}

		return keys;
	}
};

/**
 * @param {Array<Record<string, unknown> | (() => Record<string, unknown>)>} props
 * @returns {any}
 */
function spread_props(...props) {
	return new Proxy({ props }, spread_props_handler);
}

/**
 * This function is responsible for synchronizing a possibly bound prop with the inner component state.
 * It is used whenever the compiler sees that the component writes to the prop, or when it has a default prop_value.
 * @template V
 * @param {Record<string, unknown>} props
 * @param {string} key
 * @param {number} flags
 * @param {V | (() => V)} [fallback]
 * @returns {(() => V | ((arg: V) => V) | ((arg: V, mutation: boolean) => V))}
 */
function prop(props, key, flags, fallback) {
	var runes = !_flags_index_js__WEBPACK_IMPORTED_MODULE_10__.legacy_mode_flag || (flags & _constants_js__WEBPACK_IMPORTED_MODULE_1__.PROPS_IS_RUNES) !== 0;
	var bindable = (flags & _constants_js__WEBPACK_IMPORTED_MODULE_1__.PROPS_IS_BINDABLE) !== 0;
	var lazy = (flags & _constants_js__WEBPACK_IMPORTED_MODULE_1__.PROPS_IS_LAZY_INITIAL) !== 0;

	var fallback_value = /** @type {V} */ (fallback);
	var fallback_dirty = true;
	var fallback_signal = /** @type {Derived<V> | undefined} */ (undefined);

	var get_fallback = () => {
		if (lazy && runes) {
			fallback_signal ??= (0,_deriveds_js__WEBPACK_IMPORTED_MODULE_4__.derived)(/** @type {() => V} */ (fallback));
			return (0,_runtime_js__WEBPACK_IMPORTED_MODULE_5__.get)(fallback_signal);
		}

		if (fallback_dirty) {
			fallback_dirty = false;

			fallback_value = lazy
				? (0,_runtime_js__WEBPACK_IMPORTED_MODULE_5__.untrack)(/** @type {() => V} */ (fallback))
				: /** @type {V} */ (fallback);
		}

		return fallback_value;
	};

	/** @type {((v: V) => void) | undefined} */
	let setter;

	if (bindable) {
		// Can be the case when someone does `mount(Component, props)` with `let props = $state({...})`
		// or `createClassComponent(Component, props)`
		var is_entry_props = _client_constants__WEBPACK_IMPORTED_MODULE_7__.STATE_SYMBOL in props || _client_constants__WEBPACK_IMPORTED_MODULE_7__.LEGACY_PROPS in props;

		setter =
			(0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_2__.get_descriptor)(props, key)?.set ??
			(is_entry_props && key in props ? (v) => (props[key] = v) : undefined);
	}

	/** @type {V} */
	var initial_value;
	var is_store_sub = false;

	if (bindable) {
		[initial_value, is_store_sub] = (0,_store_js__WEBPACK_IMPORTED_MODULE_9__.capture_store_binding)(() => /** @type {V} */ (props[key]));
	} else {
		initial_value = /** @type {V} */ (props[key]);
	}

	if (initial_value === undefined && fallback !== undefined) {
		initial_value = get_fallback();

		if (setter) {
			if (runes) _errors_js__WEBPACK_IMPORTED_MODULE_6__.props_invalid_value(key);
			setter(initial_value);
		}
	}

	/** @type {() => V} */
	var getter;

	if (runes) {
		getter = () => {
			var value = /** @type {V} */ (props[key]);
			if (value === undefined) return get_fallback();
			fallback_dirty = true;
			return value;
		};
	} else {
		getter = () => {
			var value = /** @type {V} */ (props[key]);

			if (value !== undefined) {
				// in legacy mode, we don't revert to the fallback value
				// if the prop goes from defined to undefined. The easiest
				// way to model this is to make the fallback undefined
				// as soon as the prop has a value
				fallback_value = /** @type {V} */ (undefined);
			}

			return value === undefined ? fallback_value : value;
		};
	}

	// prop is never written to — we only need a getter
	if (runes && (flags & _constants_js__WEBPACK_IMPORTED_MODULE_1__.PROPS_IS_UPDATED) === 0) {
		return getter;
	}

	// prop is written to, but the parent component had `bind:foo` which
	// means we can just call `$$props.foo = value` directly
	if (setter) {
		var legacy_parent = props.$$legacy;
		return /** @type {() => V} */ (
			function (/** @type {V} */ value, /** @type {boolean} */ mutation) {
				if (arguments.length > 0) {
					// We don't want to notify if the value was mutated and the parent is in runes mode.
					// In that case the state proxy (if it exists) should take care of the notification.
					// If the parent is not in runes mode, we need to notify on mutation, too, that the prop
					// has changed because the parent will not be able to detect the change otherwise.
					if (!runes || !mutation || legacy_parent || is_store_sub) {
						/** @type {Function} */ (setter)(mutation ? getter() : value);
					}

					return value;
				}

				return getter();
			}
		);
	}

	// Either prop is written to, but there's no binding, which means we
	// create a derived that we can write to locally.
	// Or we are in legacy mode where we always create a derived to replicate that
	// Svelte 4 did not trigger updates when a primitive value was updated to the same value.
	var overridden = false;

	var d = ((flags & _constants_js__WEBPACK_IMPORTED_MODULE_1__.PROPS_IS_IMMUTABLE) !== 0 ? _deriveds_js__WEBPACK_IMPORTED_MODULE_4__.derived : _deriveds_js__WEBPACK_IMPORTED_MODULE_4__.derived_safe_equal)(() => {
		overridden = false;
		return getter();
	});

	if (esm_env__WEBPACK_IMPORTED_MODULE_0__.DEV) {
		d.label = key;
	}

	// Capture the initial value if it's bindable
	if (bindable) (0,_runtime_js__WEBPACK_IMPORTED_MODULE_5__.get)(d);

	var parent_effect = /** @type {Effect} */ (_runtime_js__WEBPACK_IMPORTED_MODULE_5__.active_effect);

	return /** @type {() => V} */ (
		function (/** @type {any} */ value, /** @type {boolean} */ mutation) {
			if (arguments.length > 0) {
				const new_value = mutation ? (0,_runtime_js__WEBPACK_IMPORTED_MODULE_5__.get)(d) : runes && bindable ? (0,_proxy_js__WEBPACK_IMPORTED_MODULE_8__.proxy)(value) : value;

				(0,_sources_js__WEBPACK_IMPORTED_MODULE_3__.set)(d, new_value);
				overridden = true;

				if (fallback_value !== undefined) {
					fallback_value = new_value;
				}

				return value;
			}

			// special case — avoid recalculating the derived if we're in a
			// teardown function and the prop was overridden locally, or the
			// component was already destroyed (people could access props in a timeout)
			if ((_runtime_js__WEBPACK_IMPORTED_MODULE_5__.is_destroying_effect && overridden) || (parent_effect.f & _client_constants__WEBPACK_IMPORTED_MODULE_7__.DESTROYED) !== 0) {
				return d.v;
			}

			return (0,_runtime_js__WEBPACK_IMPORTED_MODULE_5__.get)(d);
		}
	);
}


/***/ },

/***/ "./node_modules/svelte/src/internal/client/reactivity/sources.js"
/*!***********************************************************************!*\
  !*** ./node_modules/svelte/src/internal/client/reactivity/sources.js ***!
  \***********************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   eager_effects: () => (/* binding */ eager_effects),
/* harmony export */   flush_eager_effects: () => (/* binding */ flush_eager_effects),
/* harmony export */   increment: () => (/* binding */ increment),
/* harmony export */   internal_set: () => (/* binding */ internal_set),
/* harmony export */   mutable_source: () => (/* binding */ mutable_source),
/* harmony export */   mutate: () => (/* binding */ mutate),
/* harmony export */   old_values: () => (/* binding */ old_values),
/* harmony export */   set: () => (/* binding */ set),
/* harmony export */   set_eager_effects: () => (/* binding */ set_eager_effects),
/* harmony export */   set_eager_effects_deferred: () => (/* binding */ set_eager_effects_deferred),
/* harmony export */   source: () => (/* binding */ source),
/* harmony export */   state: () => (/* binding */ state),
/* harmony export */   update: () => (/* binding */ update),
/* harmony export */   update_pre: () => (/* binding */ update_pre)
/* harmony export */ });
/* harmony import */ var esm_env__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! esm-env */ "./node_modules/esm-env/index.js");
/* harmony import */ var _runtime_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../runtime.js */ "./node_modules/svelte/src/internal/client/runtime.js");
/* harmony import */ var _equality_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./equality.js */ "./node_modules/svelte/src/internal/client/reactivity/equality.js");
/* harmony import */ var _client_constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! #client/constants */ "./node_modules/svelte/src/internal/client/constants.js");
/* harmony import */ var _errors_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../errors.js */ "./node_modules/svelte/src/internal/client/errors.js");
/* harmony import */ var _flags_index_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../flags/index.js */ "./node_modules/svelte/src/internal/flags/index.js");
/* harmony import */ var _dev_tracing_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../dev/tracing.js */ "./node_modules/svelte/src/internal/client/dev/tracing.js");
/* harmony import */ var _shared_dev_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../shared/dev.js */ "./node_modules/svelte/src/internal/shared/dev.js");
/* harmony import */ var _context_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../context.js */ "./node_modules/svelte/src/internal/client/context.js");
/* harmony import */ var _batch_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./batch.js */ "./node_modules/svelte/src/internal/client/reactivity/batch.js");
/* harmony import */ var _proxy_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../proxy.js */ "./node_modules/svelte/src/internal/client/proxy.js");
/* harmony import */ var _deriveds_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./deriveds.js */ "./node_modules/svelte/src/internal/client/reactivity/deriveds.js");
/* harmony import */ var _status_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./status.js */ "./node_modules/svelte/src/internal/client/reactivity/status.js");
/** @import { Derived, Effect, Source, Value } from '#client' */














/** @type {Set<Effect>} */
let eager_effects = new Set();

/** @type {Map<Source, any>} */
const old_values = new Map();

/**
 * @param {Set<any>} v
 */
function set_eager_effects(v) {
	eager_effects = v;
}

let eager_effects_deferred = false;

function set_eager_effects_deferred() {
	eager_effects_deferred = true;
}

/**
 * @template V
 * @param {V} v
 * @param {Error | null} [stack]
 * @returns {Source<V>}
 */
// TODO rename this to `state` throughout the codebase
function source(v, stack) {
	/** @type {Value} */
	var signal = {
		f: 0, // TODO ideally we could skip this altogether, but it causes type errors
		v,
		reactions: null,
		equals: _equality_js__WEBPACK_IMPORTED_MODULE_2__.equals,
		rv: 0,
		wv: 0
	};

	if (esm_env__WEBPACK_IMPORTED_MODULE_0__.DEV && _flags_index_js__WEBPACK_IMPORTED_MODULE_5__.tracing_mode_flag) {
		signal.created = stack ?? (0,_shared_dev_js__WEBPACK_IMPORTED_MODULE_7__.get_error)('created at');
		signal.updated = null;
		signal.set_during_effect = false;
		signal.trace = null;
	}

	return signal;
}

/**
 * @template V
 * @param {V} v
 * @param {Error | null} [stack]
 */
/*#__NO_SIDE_EFFECTS__*/
function state(v, stack) {
	const s = source(v, stack);

	(0,_runtime_js__WEBPACK_IMPORTED_MODULE_1__.push_reaction_value)(s);

	return s;
}

/**
 * @template V
 * @param {V} initial_value
 * @param {boolean} [immutable]
 * @returns {Source<V>}
 */
/*#__NO_SIDE_EFFECTS__*/
function mutable_source(initial_value, immutable = false, trackable = true) {
	const s = source(initial_value);
	if (!immutable) {
		s.equals = _equality_js__WEBPACK_IMPORTED_MODULE_2__.safe_equals;
	}

	// bind the signal to the component context, in case we need to
	// track updates to trigger beforeUpdate/afterUpdate callbacks
	if (_flags_index_js__WEBPACK_IMPORTED_MODULE_5__.legacy_mode_flag && trackable && _context_js__WEBPACK_IMPORTED_MODULE_8__.component_context !== null && _context_js__WEBPACK_IMPORTED_MODULE_8__.component_context.l !== null) {
		(_context_js__WEBPACK_IMPORTED_MODULE_8__.component_context.l.s ??= []).push(s);
	}

	return s;
}

/**
 * @template V
 * @param {Value<V>} source
 * @param {V} value
 */
function mutate(source, value) {
	set(
		source,
		(0,_runtime_js__WEBPACK_IMPORTED_MODULE_1__.untrack)(() => (0,_runtime_js__WEBPACK_IMPORTED_MODULE_1__.get)(source))
	);
	return value;
}

/**
 * @template V
 * @param {Source<V>} source
 * @param {V} value
 * @param {boolean} [should_proxy]
 * @returns {V}
 */
function set(source, value, should_proxy = false) {
	if (
		_runtime_js__WEBPACK_IMPORTED_MODULE_1__.active_reaction !== null &&
		// since we are untracking the function inside `$inspect.with` we need to add this check
		// to ensure we error if state is set inside an inspect effect
		(!_runtime_js__WEBPACK_IMPORTED_MODULE_1__.untracking || (_runtime_js__WEBPACK_IMPORTED_MODULE_1__.active_reaction.f & _client_constants__WEBPACK_IMPORTED_MODULE_3__.EAGER_EFFECT) !== 0) &&
		(0,_context_js__WEBPACK_IMPORTED_MODULE_8__.is_runes)() &&
		(_runtime_js__WEBPACK_IMPORTED_MODULE_1__.active_reaction.f & (_client_constants__WEBPACK_IMPORTED_MODULE_3__.DERIVED | _client_constants__WEBPACK_IMPORTED_MODULE_3__.BLOCK_EFFECT | _client_constants__WEBPACK_IMPORTED_MODULE_3__.ASYNC | _client_constants__WEBPACK_IMPORTED_MODULE_3__.EAGER_EFFECT)) !== 0 &&
		(_runtime_js__WEBPACK_IMPORTED_MODULE_1__.current_sources === null || !_runtime_js__WEBPACK_IMPORTED_MODULE_1__.current_sources.has(source))
	) {
		_errors_js__WEBPACK_IMPORTED_MODULE_4__.state_unsafe_mutation();
	}

	let new_value = should_proxy ? (0,_proxy_js__WEBPACK_IMPORTED_MODULE_10__.proxy)(value) : value;

	if (esm_env__WEBPACK_IMPORTED_MODULE_0__.DEV) {
		(0,_dev_tracing_js__WEBPACK_IMPORTED_MODULE_6__.tag_proxy)(new_value, /** @type {string} */ (source.label));
	}

	return internal_set(source, new_value, _batch_js__WEBPACK_IMPORTED_MODULE_9__.legacy_updates);
}

/**
 * A set of signals we have already seen while traversing in mark_reactions.
 * Not always set to balance the common case of sources only having a couple
 * of (transitive) dependencies (where always creating a Set would be bad for perf)
 * with the edge case of extremely deep or wide dependency arrays with cycles.
 * @type {Set<any> | null}
 */
var seen = null;
/** Number of transitive dependencies, see {@link seen} for more info */
var count_deps = 0;

/**
 * @template V
 * @param {Source<V>} source
 * @param {V} value
 * @param {Effect[] | null} [updated_during_traversal]
 * @returns {V}
 */
function internal_set(source, value, updated_during_traversal = null) {
	if (!source.equals(value)) {
		if (_runtime_js__WEBPACK_IMPORTED_MODULE_1__.is_destroying_effect) {
			old_values.set(source, value);
		} else if (!old_values.has(source)) {
			// only record the value from before the first write in this flush, otherwise a
			// teardown would see the value from before whichever write happened to be last
			old_values.set(source, source.v);
		}

		var batch = _batch_js__WEBPACK_IMPORTED_MODULE_9__.Batch.ensure();
		batch.capture(source, value);

		if (esm_env__WEBPACK_IMPORTED_MODULE_0__.DEV) {
			if (_flags_index_js__WEBPACK_IMPORTED_MODULE_5__.tracing_mode_flag || _runtime_js__WEBPACK_IMPORTED_MODULE_1__.active_effect !== null) {
				source.updated ??= new Map();

				// For performance reasons, when not using $inspect.trace, we only start collecting stack traces
				// after the same source has been updated more than 5 times in the same flush cycle.
				const count = (source.updated.get('')?.count ?? 0) + 1;
				source.updated.set('', { error: /** @type {any} */ (null), count });

				if (_flags_index_js__WEBPACK_IMPORTED_MODULE_5__.tracing_mode_flag || count > 5) {
					const error = (0,_shared_dev_js__WEBPACK_IMPORTED_MODULE_7__.get_error)('updated at');

					if (error !== null) {
						let entry = source.updated.get(error.stack);

						if (!entry) {
							entry = { error, count: 0 };
							source.updated.set(error.stack, entry);
						}

						entry.count++;
					}
				}
			}

			if (_runtime_js__WEBPACK_IMPORTED_MODULE_1__.active_effect !== null) {
				source.set_during_effect = true;
			}
		}

		if ((source.f & _client_constants__WEBPACK_IMPORTED_MODULE_3__.DERIVED) !== 0) {
			const derived = /** @type {Derived} */ (source);

			// if we are assigning to a dirty derived we set it to clean/maybe dirty but we also eagerly execute it to track the dependencies
			if ((source.f & _client_constants__WEBPACK_IMPORTED_MODULE_3__.DIRTY) !== 0) {
				(0,_deriveds_js__WEBPACK_IMPORTED_MODULE_11__.execute_derived)(derived);
			}

			// During time traveling we don't want to reset the status so that
			// traversal of the graph in the other batches still happens
			if (_batch_js__WEBPACK_IMPORTED_MODULE_9__.batch_values === null) {
				(0,_status_js__WEBPACK_IMPORTED_MODULE_12__.update_derived_status)(derived);
			}
		}

		source.wv = (0,_runtime_js__WEBPACK_IMPORTED_MODULE_1__.increment_write_version)();

		// For debugging, in case you want to know which reactions are being scheduled:
		// log_reactions(source);
		seen = null;
		count_deps = 0;
		mark_reactions(source, _client_constants__WEBPACK_IMPORTED_MODULE_3__.DIRTY, updated_during_traversal);
		seen = null;

		// It's possible that the current reaction might not have up-to-date dependencies
		// whilst it's actively running. So in the case of ensuring it registers the reaction
		// properly for itself, we need to ensure the current effect actually gets
		// scheduled. i.e: `$effect(() => x++)`
		if (
			(0,_context_js__WEBPACK_IMPORTED_MODULE_8__.is_runes)() &&
			_runtime_js__WEBPACK_IMPORTED_MODULE_1__.active_effect !== null &&
			(_runtime_js__WEBPACK_IMPORTED_MODULE_1__.active_effect.f & _client_constants__WEBPACK_IMPORTED_MODULE_3__.CLEAN) !== 0 &&
			(_runtime_js__WEBPACK_IMPORTED_MODULE_1__.active_effect.f & (_client_constants__WEBPACK_IMPORTED_MODULE_3__.BRANCH_EFFECT | _client_constants__WEBPACK_IMPORTED_MODULE_3__.ROOT_EFFECT)) === 0
		) {
			if (_runtime_js__WEBPACK_IMPORTED_MODULE_1__.untracked_writes === null) {
				(0,_runtime_js__WEBPACK_IMPORTED_MODULE_1__.set_untracked_writes)([source]);
			} else {
				_runtime_js__WEBPACK_IMPORTED_MODULE_1__.untracked_writes.push(source);
			}
		}

		if (!batch.is_fork && eager_effects.size > 0 && !eager_effects_deferred) {
			flush_eager_effects();
		}
	}

	return value;
}

function flush_eager_effects() {
	eager_effects_deferred = false;

	for (const effect of eager_effects) {
		// Mark clean inspect-effects as maybe dirty and then check their dirtiness
		// instead of just updating the effects - this way we avoid overfiring.
		if ((effect.f & _client_constants__WEBPACK_IMPORTED_MODULE_3__.CLEAN) !== 0) {
			(0,_status_js__WEBPACK_IMPORTED_MODULE_12__.set_signal_status)(effect, _client_constants__WEBPACK_IMPORTED_MODULE_3__.MAYBE_DIRTY);
		}

		let dirty;

		try {
			dirty = (0,_runtime_js__WEBPACK_IMPORTED_MODULE_1__.is_dirty)(effect);
		} catch {
			// Dirty-checking can evaluate derived dependencies and throw in cases where
			// parent effects are about to destroy this eager effect. Run the effect so
			// its own error handling can deal with transient failures.
			dirty = true;
		}

		if (dirty) {
			(0,_runtime_js__WEBPACK_IMPORTED_MODULE_1__.update_effect)(effect);
		}
	}

	eager_effects.clear();
}

/**
 * @template {number | bigint} T
 * @param {Source<T>} source
 * @param {1 | -1} [d]
 * @returns {T}
 */
function update(source, d = 1) {
	var value = (0,_runtime_js__WEBPACK_IMPORTED_MODULE_1__.get)(source);
	var result = d === 1 ? value++ : value--;

	set(source, value);

	// @ts-expect-error
	return result;
}

/**
 * @template {number | bigint} T
 * @param {Source<T>} source
 * @param {1 | -1} [d]
 * @returns {T}
 */
function update_pre(source, d = 1) {
	var value = (0,_runtime_js__WEBPACK_IMPORTED_MODULE_1__.get)(source);

	// @ts-expect-error
	// eslint-disable-next-line no-useless-assignment -- `++`/`--` used for return value, not side effect on `value`
	return set(source, d === 1 ? ++value : --value);
}

/**
 * Silently (without using `get`) increment a source
 * @param {Source<number>} source
 */
function increment(source) {
	set(source, source.v + 1);
}

/**
 * @param {Value} signal
 * @param {number} status should be DIRTY or MAYBE_DIRTY
 * @param {Effect[] | null} updated_during_traversal
 * @returns {void}
 */
function mark_reactions(signal, status, updated_during_traversal) {
	var reactions = signal.reactions;
	if (reactions === null) return;

	var runes = (0,_context_js__WEBPACK_IMPORTED_MODULE_8__.is_runes)();
	var length = reactions.length;

	count_deps += length;
	// Activate the `seen` Set if we think from the unusually high number of deps that
	// there might be cycles in the graph, to avoid repeated lookups for reactions
	// Example: https://github.com/sveltejs/svelte/issues/16658 has a graph with one source
	// reaching ~10000 distinct deriveds/effects each, resulting in 65 million walks through repeated visits.
	if (count_deps > 100000 && seen === null) seen = new Set();

	if (seen !== null) {
		if (seen.has(signal)) return;
		seen.add(signal);
	}

	for (var i = 0; i < length; i++) {
		var reaction = reactions[i];
		var flags = reaction.f;

		// In legacy mode, skip the current effect to prevent infinite loops
		if (!runes && reaction === _runtime_js__WEBPACK_IMPORTED_MODULE_1__.active_effect) continue;

		var not_dirty = (flags & _client_constants__WEBPACK_IMPORTED_MODULE_3__.DIRTY) === 0;

		// don't set a DIRTY reaction to MAYBE_DIRTY
		if (not_dirty) {
			(0,_status_js__WEBPACK_IMPORTED_MODULE_12__.set_signal_status)(reaction, status);
		}

		if ((flags & _client_constants__WEBPACK_IMPORTED_MODULE_3__.EAGER_EFFECT) !== 0) {
			// Eager effects need to run immediately:
			// - for $inspect so that the stack trace makes sense
			// - for $state.eager because they might be without an effect parent
			eager_effects.add(/** @type {Effect} */ (reaction));
		} else if ((flags & _client_constants__WEBPACK_IMPORTED_MODULE_3__.DERIVED) !== 0) {
			var derived = /** @type {Derived} */ (reaction);

			_batch_js__WEBPACK_IMPORTED_MODULE_9__.batch_values?.delete(derived);
			mark_reactions(derived, _client_constants__WEBPACK_IMPORTED_MODULE_3__.MAYBE_DIRTY, updated_during_traversal);
		} else if (not_dirty) {
			var effect = /** @type {Effect} */ (reaction);

			if ((flags & _client_constants__WEBPACK_IMPORTED_MODULE_3__.BLOCK_EFFECT) !== 0 && _batch_js__WEBPACK_IMPORTED_MODULE_9__.eager_block_effects !== null) {
				_batch_js__WEBPACK_IMPORTED_MODULE_9__.eager_block_effects.add(effect);
			}

			if (updated_during_traversal !== null) {
				updated_during_traversal.push(effect);
			} else {
				(0,_batch_js__WEBPACK_IMPORTED_MODULE_9__.schedule_effect)(effect);
			}
		}
	}
}


/***/ },

/***/ "./node_modules/svelte/src/internal/client/reactivity/status.js"
/*!**********************************************************************!*\
  !*** ./node_modules/svelte/src/internal/client/reactivity/status.js ***!
  \**********************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   set_signal_status: () => (/* binding */ set_signal_status),
/* harmony export */   update_derived_status: () => (/* binding */ update_derived_status)
/* harmony export */ });
/* harmony import */ var _client_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! #client/constants */ "./node_modules/svelte/src/internal/client/constants.js");
/** @import { Derived, Signal } from '#client' */


const STATUS_MASK = ~(_client_constants__WEBPACK_IMPORTED_MODULE_0__.DIRTY | _client_constants__WEBPACK_IMPORTED_MODULE_0__.MAYBE_DIRTY | _client_constants__WEBPACK_IMPORTED_MODULE_0__.CLEAN);

/**
 * @param {Signal} signal
 * @param {number} status
 */
function set_signal_status(signal, status) {
	signal.f = (signal.f & STATUS_MASK) | status;
}

/**
 * Set a derived's status to CLEAN or MAYBE_DIRTY based on its connection state.
 * @param {Derived} derived
 */
function update_derived_status(derived) {
	// Only mark as MAYBE_DIRTY if disconnected and has dependencies.
	if ((derived.f & _client_constants__WEBPACK_IMPORTED_MODULE_0__.CONNECTED) !== 0 || derived.deps === null) {
		set_signal_status(derived, _client_constants__WEBPACK_IMPORTED_MODULE_0__.CLEAN);
	} else {
		set_signal_status(derived, _client_constants__WEBPACK_IMPORTED_MODULE_0__.MAYBE_DIRTY);
	}
}


/***/ },

/***/ "./node_modules/svelte/src/internal/client/reactivity/store.js"
/*!*********************************************************************!*\
  !*** ./node_modules/svelte/src/internal/client/reactivity/store.js ***!
  \*********************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   capture_store_binding: () => (/* binding */ capture_store_binding),
/* harmony export */   invalidate_store: () => (/* binding */ invalidate_store),
/* harmony export */   legacy_is_updating_store: () => (/* binding */ legacy_is_updating_store),
/* harmony export */   mark_store_binding: () => (/* binding */ mark_store_binding),
/* harmony export */   setup_stores: () => (/* binding */ setup_stores),
/* harmony export */   store_get: () => (/* binding */ store_get),
/* harmony export */   store_mutate: () => (/* binding */ store_mutate),
/* harmony export */   store_set: () => (/* binding */ store_set),
/* harmony export */   store_unsub: () => (/* binding */ store_unsub),
/* harmony export */   update_pre_store: () => (/* binding */ update_pre_store),
/* harmony export */   update_store: () => (/* binding */ update_store)
/* harmony export */ });
/* harmony import */ var _store_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../store/utils.js */ "./node_modules/svelte/src/store/utils.js");
/* harmony import */ var _store_shared_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../store/shared/index.js */ "./node_modules/svelte/src/store/shared/index.js");
/* harmony import */ var _shared_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/utils.js */ "./node_modules/svelte/src/internal/shared/utils.js");
/* harmony import */ var _runtime_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../runtime.js */ "./node_modules/svelte/src/internal/client/runtime.js");
/* harmony import */ var _effects_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./effects.js */ "./node_modules/svelte/src/internal/client/reactivity/effects.js");
/* harmony import */ var _sources_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./sources.js */ "./node_modules/svelte/src/internal/client/reactivity/sources.js");
/* harmony import */ var esm_env__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! esm-env */ "./node_modules/esm-env/index.js");
/** @import { StoreReferencesContainer } from '#client' */
/** @import { Store } from '#shared' */








/**
 * We set this to `true` when updating a store so that we correctly
 * schedule effects if the update takes place inside a `$:` effect
 */
let legacy_is_updating_store = false;

/**
 * Whether or not the prop currently being read is a store binding, as in
 * `<Child bind:x={$y} />`. If it is, we treat the prop as mutable even in
 * runes mode, and skip `binding_property_non_reactive` validation
 */
let is_store_binding = false;

let IS_UNMOUNTED = Symbol('unmounted');

/**
 * Gets the current value of a store. If the store isn't subscribed to yet, it will create a proxy
 * signal that will be updated when the store is. The store references container is needed to
 * track reassignments to stores and to track the correct component context.
 * @template V
 * @param {Store<V> | null | undefined} store
 * @param {string} store_name
 * @param {StoreReferencesContainer} stores
 * @returns {V}
 */
function store_get(store, store_name, stores) {
	const entry = (stores[store_name] ??= {
		store: null,
		source: (0,_sources_js__WEBPACK_IMPORTED_MODULE_5__.mutable_source)(undefined),
		unsubscribe: _shared_utils_js__WEBPACK_IMPORTED_MODULE_2__.noop
	});

	if (esm_env__WEBPACK_IMPORTED_MODULE_6__.DEV) {
		entry.source.label = store_name;
	}

	// if the component that setup this is already unmounted we don't want to register a subscription
	if (entry.store !== store && !(IS_UNMOUNTED in stores)) {
		entry.unsubscribe();
		entry.store = store ?? null;

		if (store == null) {
			entry.source.v = undefined; // see synchronous callback comment below
			entry.unsubscribe = _shared_utils_js__WEBPACK_IMPORTED_MODULE_2__.noop;
		} else {
			var is_synchronous_callback = true;

			entry.unsubscribe = (0,_store_utils_js__WEBPACK_IMPORTED_MODULE_0__.subscribe_to_store)(store, (v) => {
				if (is_synchronous_callback) {
					// If the first updates to the store value (possibly multiple of them) are synchronously
					// inside a derived, we will hit the `state_unsafe_mutation` error if we `set` the value
					entry.source.v = v;
				} else {
					(0,_sources_js__WEBPACK_IMPORTED_MODULE_5__.set)(entry.source, v);
				}
			});

			is_synchronous_callback = false;
		}
	}

	// if the component that setup this stores is already unmounted the source will be out of sync
	// so we just use the `get` for the stores, less performant but it avoids to create a memory leak
	// and it will keep the value consistent
	if (store && IS_UNMOUNTED in stores) {
		return (0,_store_shared_index_js__WEBPACK_IMPORTED_MODULE_1__.get)(store);
	}

	return (0,_runtime_js__WEBPACK_IMPORTED_MODULE_3__.get)(entry.source);
}

/**
 * Unsubscribe from a store if it's not the same as the one in the store references container.
 * We need this in addition to `store_get` because someone could unsubscribe from a store but
 * then never subscribe to the new one (if any), causing the subscription to stay open wrongfully.
 * @param {Store<any> | null | undefined} store
 * @param {string} store_name
 * @param {StoreReferencesContainer} stores
 */
function store_unsub(store, store_name, stores) {
	/** @type {StoreReferencesContainer[''] | undefined} */
	let entry = stores[store_name];

	if (entry && entry.store !== store) {
		// Don't reset store yet, so that store_get above can resubscribe to new store if necessary
		entry.unsubscribe();
		entry.unsubscribe = _shared_utils_js__WEBPACK_IMPORTED_MODULE_2__.noop;
	}

	return store;
}

/**
 * Sets the new value of a store and returns that value.
 * @template V
 * @param {Store<V>} store
 * @param {V} value
 * @returns {V}
 */
function store_set(store, value) {
	update_with_flag(store, value);
	return value;
}

/**
 * @param {StoreReferencesContainer} stores
 * @param {string} store_name
 */
function invalidate_store(stores, store_name) {
	var entry = stores[store_name];
	if (entry.store !== null) {
		store_set(entry.store, entry.source.v);
	}
}

/**
 * Unsubscribes from all auto-subscribed stores on destroy
 * @returns {[StoreReferencesContainer, ()=>void]}
 */
function setup_stores() {
	/** @type {StoreReferencesContainer} */
	const stores = {};

	function cleanup() {
		(0,_effects_js__WEBPACK_IMPORTED_MODULE_4__.teardown)(() => {
			for (var store_name in stores) {
				const ref = stores[store_name];
				ref.unsubscribe();
			}
			;(0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_2__.define_property)(stores, IS_UNMOUNTED, {
				enumerable: false,
				value: true
			});
		});
	}

	return [stores, cleanup];
}

/**
 * @param {Store<V>} store
 * @param {V} value
 * @template V
 */
function update_with_flag(store, value) {
	legacy_is_updating_store = true;

	try {
		store.set(value);
	} finally {
		legacy_is_updating_store = false;
	}
}

/**
 * Updates a store with a new value.
 * @param {Store<V>} store  the store to update
 * @param {any} expression  the expression that mutates the store
 * @param {V} new_value  the new store value
 * @template V
 */
function store_mutate(store, expression, new_value) {
	update_with_flag(store, new_value);
	return expression;
}

/**
 * @param {Store<number>} store
 * @param {number} store_value
 * @param {1 | -1} [d]
 * @returns {number}
 */
function update_store(store, store_value, d = 1) {
	update_with_flag(store, store_value + d);
	return store_value;
}

/**
 * @param {Store<number>} store
 * @param {number} store_value
 * @param {1 | -1} [d]
 * @returns {number}
 */
function update_pre_store(store, store_value, d = 1) {
	const value = store_value + d;
	update_with_flag(store, value);
	return value;
}

/**
 * Called inside prop getters to communicate that the prop is a store binding
 */
function mark_store_binding() {
	is_store_binding = true;
}

/**
 * Returns a tuple that indicates whether `fn()` reads a prop that is a store binding.
 * Used to prevent `binding_property_non_reactive` validation false positives and
 * ensure that these props are treated as mutable even in runes mode
 * @template T
 * @param {() => T} fn
 * @returns {[T, boolean]}
 */
function capture_store_binding(fn) {
	var previous_is_store_binding = is_store_binding;

	try {
		is_store_binding = false;
		return [fn(), is_store_binding];
	} finally {
		is_store_binding = previous_is_store_binding;
	}
}


/***/ },

/***/ "./node_modules/svelte/src/internal/client/reactivity/utils.js"
/*!*********************************************************************!*\
  !*** ./node_modules/svelte/src/internal/client/reactivity/utils.js ***!
  \*********************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   defer_effect: () => (/* binding */ defer_effect)
/* harmony export */ });
/* harmony import */ var _client_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! #client/constants */ "./node_modules/svelte/src/internal/client/constants.js");
/* harmony import */ var _status_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./status.js */ "./node_modules/svelte/src/internal/client/reactivity/status.js");
/** @import { Effect } from '#client' */



/**
 * @param {Effect} effect
 * @param {Set<Effect>} dirty_effects
 * @param {Set<Effect>} maybe_dirty_effects
 */
function defer_effect(effect, dirty_effects, maybe_dirty_effects) {
	if ((effect.f & _client_constants__WEBPACK_IMPORTED_MODULE_0__.DIRTY) !== 0) {
		dirty_effects.add(effect);
	} else if ((effect.f & _client_constants__WEBPACK_IMPORTED_MODULE_0__.MAYBE_DIRTY) !== 0) {
		maybe_dirty_effects.add(effect);
	}

	// mark as clean so they get scheduled if they depend on pending async state
	;(0,_status_js__WEBPACK_IMPORTED_MODULE_1__.set_signal_status)(effect, _client_constants__WEBPACK_IMPORTED_MODULE_0__.CLEAN);
}


/***/ },

/***/ "./node_modules/svelte/src/internal/client/render.js"
/*!***********************************************************!*\
  !*** ./node_modules/svelte/src/internal/client/render.js ***!
  \***********************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   hydrate: () => (/* binding */ hydrate),
/* harmony export */   mount: () => (/* binding */ mount),
/* harmony export */   set_should_intro: () => (/* binding */ set_should_intro),
/* harmony export */   set_text: () => (/* binding */ set_text),
/* harmony export */   should_intro: () => (/* binding */ should_intro),
/* harmony export */   unmount: () => (/* binding */ unmount)
/* harmony export */ });
/* harmony import */ var esm_env__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! esm-env */ "./node_modules/esm-env/index.js");
/* harmony import */ var _dom_operations_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom/operations.js */ "./node_modules/svelte/src/internal/client/dom/operations.js");
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../constants.js */ "./node_modules/svelte/src/constants.js");
/* harmony import */ var _runtime_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./runtime.js */ "./node_modules/svelte/src/internal/client/runtime.js");
/* harmony import */ var _context_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./context.js */ "./node_modules/svelte/src/internal/client/context.js");
/* harmony import */ var _reactivity_effects_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./reactivity/effects.js */ "./node_modules/svelte/src/internal/client/reactivity/effects.js");
/* harmony import */ var _dom_hydration_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./dom/hydration.js */ "./node_modules/svelte/src/internal/client/dom/hydration.js");
/* harmony import */ var _shared_utils_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../shared/utils.js */ "./node_modules/svelte/src/internal/shared/utils.js");
/* harmony import */ var _dom_elements_events_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./dom/elements/events.js */ "./node_modules/svelte/src/internal/client/dom/elements/events.js");
/* harmony import */ var _warnings_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./warnings.js */ "./node_modules/svelte/src/internal/client/warnings.js");
/* harmony import */ var _errors_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./errors.js */ "./node_modules/svelte/src/internal/client/errors.js");
/* harmony import */ var _dom_template_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./dom/template.js */ "./node_modules/svelte/src/internal/client/dom/template.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../utils.js */ "./node_modules/svelte/src/utils.js");
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./constants.js */ "./node_modules/svelte/src/internal/client/constants.js");
/* harmony import */ var _dom_blocks_boundary_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./dom/blocks/boundary.js */ "./node_modules/svelte/src/internal/client/dom/blocks/boundary.js");
/** @import { ComponentContext, Effect, EffectNodes, TemplateNode } from '#client' */
/** @import { Component, ComponentType, SvelteComponent, MountOptions } from '../../index.js' */
















/**
 * This is normally true — block effects should run their intro transitions —
 * but is false during hydration (unless `options.intro` is `true`) and
 * when creating the children of a `<svelte:element>` that just changed tag
 */
let should_intro = true;

/** @param {boolean} value */
function set_should_intro(value) {
	should_intro = value;
}

/**
 * @param {Element} text
 * @param {string} value
 * @returns {void}
 */
function set_text(text, value) {
	// For objects, we apply string coercion (which might make things like $state array references in the template reactive) before diffing
	var str = value == null ? '' : typeof value === 'object' ? `${value}` : value;
	// prettier-ignore
	if (str !== (/** @type {any} */ (text)[_constants_js__WEBPACK_IMPORTED_MODULE_13__.TEXT_CACHE] ??= text.nodeValue)) {
		/** @type {any} */ (text)[_constants_js__WEBPACK_IMPORTED_MODULE_13__.TEXT_CACHE] = str;
		text.nodeValue = `${str}`;
	}
}

/**
 * Mounts a component to the given target and returns the exports and potentially the props (if compiled with `accessors: true`) of the component.
 * Transitions will play during the initial render unless the `intro` option is set to `false`.
 *
 * @template {Record<string, any>} Props
 * @template {Record<string, any>} Exports
 * @param {ComponentType<SvelteComponent<Props>> | Component<Props, Exports, any>} component
 * @param {MountOptions<Props>} options
 * @returns {Exports}
 */
function mount(component, options) {
	return _mount(component, options);
}

/**
 * Hydrates a component on the given target and returns the exports and potentially the props (if compiled with `accessors: true`) of the component
 *
 * @template {Record<string, any>} Props
 * @template {Record<string, any>} Exports
 * @param {ComponentType<SvelteComponent<Props>> | Component<Props, Exports, any>} component
 * @param {{} extends Props ? {
 * 		target: Document | Element | ShadowRoot;
 * 		props?: Props;
 * 		events?: Record<string, (e: any) => any>;
 *  	context?: Map<any, any>;
 * 		intro?: boolean;
 * 		recover?: boolean;
 *		transformError?: (error: unknown) => unknown;
 * 	} : {
 * 		target: Document | Element | ShadowRoot;
 * 		props: Props;
 * 		events?: Record<string, (e: any) => any>;
 *  	context?: Map<any, any>;
 * 		intro?: boolean;
 * 		recover?: boolean;
 *		transformError?: (error: unknown) => unknown;
 * 	}} options
 * @returns {Exports}
 */
function hydrate(component, options) {
	;(0,_dom_operations_js__WEBPACK_IMPORTED_MODULE_1__.init_operations)();
	options.intro = options.intro ?? false;
	const target = options.target;
	const was_hydrating = _dom_hydration_js__WEBPACK_IMPORTED_MODULE_6__.hydrating;
	const previous_hydrate_node = _dom_hydration_js__WEBPACK_IMPORTED_MODULE_6__.hydrate_node;

	try {
		var anchor = (0,_dom_operations_js__WEBPACK_IMPORTED_MODULE_1__.get_first_child)(target);

		while (
			anchor &&
			(anchor.nodeType !== _constants_js__WEBPACK_IMPORTED_MODULE_13__.COMMENT_NODE || /** @type {Comment} */ (anchor).data !== _constants_js__WEBPACK_IMPORTED_MODULE_2__.HYDRATION_START)
		) {
			anchor = (0,_dom_operations_js__WEBPACK_IMPORTED_MODULE_1__.get_next_sibling)(anchor);
		}

		if (!anchor) {
			throw _constants_js__WEBPACK_IMPORTED_MODULE_2__.HYDRATION_ERROR;
		}

		;(0,_dom_hydration_js__WEBPACK_IMPORTED_MODULE_6__.set_hydrating)(true);
		(0,_dom_hydration_js__WEBPACK_IMPORTED_MODULE_6__.set_hydrate_node)(/** @type {Comment} */ (anchor));

		const instance = _mount(component, { ...options, anchor });

		(0,_dom_hydration_js__WEBPACK_IMPORTED_MODULE_6__.set_hydrating)(false);

		return /**  @type {Exports} */ (instance);
	} catch (error) {
		// re-throw Svelte errors - they are certainly not related to hydration
		if (
			error instanceof Error &&
			error.message.split('\n').some((line) => line.startsWith('https://svelte.dev/e/'))
		) {
			throw error;
		}
		if (error !== _constants_js__WEBPACK_IMPORTED_MODULE_2__.HYDRATION_ERROR) {
			// eslint-disable-next-line no-console
			console.warn('Failed to hydrate: ', error);
		}

		if (options.recover === false) {
			_errors_js__WEBPACK_IMPORTED_MODULE_10__.hydration_failed();
		}

		// If an error occurred above, the operations might not yet have been initialised.
		;(0,_dom_operations_js__WEBPACK_IMPORTED_MODULE_1__.init_operations)();
		(0,_dom_operations_js__WEBPACK_IMPORTED_MODULE_1__.clear_text_content)(target);

		(0,_dom_hydration_js__WEBPACK_IMPORTED_MODULE_6__.set_hydrating)(false);
		return mount(component, options);
	} finally {
		;(0,_dom_hydration_js__WEBPACK_IMPORTED_MODULE_6__.set_hydrating)(was_hydrating);
		(0,_dom_hydration_js__WEBPACK_IMPORTED_MODULE_6__.set_hydrate_node)(previous_hydrate_node);
	}
}

/** @type {Map<EventTarget, Map<string, number>>} */
const listeners = new Map();

/**
 * @template {Record<string, any>} Exports
 * @param {ComponentType<SvelteComponent<any>> | Component<any>} Component
 * @param {MountOptions} options
 * @returns {Exports}
 */
function _mount(
	Component,
	{ target, anchor, props = {}, events, context, intro = true, transformError }
) {
	(0,_dom_operations_js__WEBPACK_IMPORTED_MODULE_1__.init_operations)();

	/** @type {Exports} */
	// @ts-expect-error will be defined because the render effect runs synchronously
	var component = undefined;

	var unmount = (0,_reactivity_effects_js__WEBPACK_IMPORTED_MODULE_5__.component_root)(() => {
		var anchor_node = anchor ?? target.appendChild((0,_dom_operations_js__WEBPACK_IMPORTED_MODULE_1__.create_text)());

		(0,_dom_blocks_boundary_js__WEBPACK_IMPORTED_MODULE_14__.boundary)(
			/** @type {TemplateNode} */ (anchor_node),
			{
				pending: () => {}
			},
			(anchor_node) => {
				;(0,_context_js__WEBPACK_IMPORTED_MODULE_4__.push)({});
				var ctx = /** @type {ComponentContext} */ (_context_js__WEBPACK_IMPORTED_MODULE_4__.component_context);
				if (context) ctx.c = context;

				if (events) {
					// We can't spread the object or else we'd lose the state proxy stuff, if it is one
					/** @type {any} */ (props).$$events = events;
				}

				if (_dom_hydration_js__WEBPACK_IMPORTED_MODULE_6__.hydrating) {
					(0,_dom_template_js__WEBPACK_IMPORTED_MODULE_11__.assign_nodes)(/** @type {TemplateNode} */ (anchor_node), null);
				}

				should_intro = intro;
				// @ts-expect-error the public typings are not what the actual function looks like
				component = Component(anchor_node, props) || (0,_context_js__WEBPACK_IMPORTED_MODULE_4__.mark_as_component)();
				should_intro = true;

				if (_dom_hydration_js__WEBPACK_IMPORTED_MODULE_6__.hydrating) {
					/** @type {Effect & { nodes: EffectNodes }} */ (_runtime_js__WEBPACK_IMPORTED_MODULE_3__.active_effect).nodes.end = _dom_hydration_js__WEBPACK_IMPORTED_MODULE_6__.hydrate_node;

					if (
						_dom_hydration_js__WEBPACK_IMPORTED_MODULE_6__.hydrate_node === null ||
						_dom_hydration_js__WEBPACK_IMPORTED_MODULE_6__.hydrate_node.nodeType !== _constants_js__WEBPACK_IMPORTED_MODULE_13__.COMMENT_NODE ||
						/** @type {Comment} */ (_dom_hydration_js__WEBPACK_IMPORTED_MODULE_6__.hydrate_node).data !== _constants_js__WEBPACK_IMPORTED_MODULE_2__.HYDRATION_END
					) {
						_warnings_js__WEBPACK_IMPORTED_MODULE_9__.hydration_mismatch();
						throw _constants_js__WEBPACK_IMPORTED_MODULE_2__.HYDRATION_ERROR;
					}
				}

				;(0,_context_js__WEBPACK_IMPORTED_MODULE_4__.pop)();
			},
			transformError
		);

		// Setup event delegation _after_ component is mounted - if an error would happen during mount, it would otherwise not be cleaned up
		/** @type {Set<string>} */
		var registered_events = new Set();

		/** @param {Array<string>} events */
		var event_handle = (events) => {
			for (var i = 0; i < events.length; i++) {
				var event_name = events[i];

				if (registered_events.has(event_name)) continue;
				registered_events.add(event_name);

				var passive = (0,_utils_js__WEBPACK_IMPORTED_MODULE_12__.is_passive_event)(event_name);

				// Add the event listener to both the container and the document.
				// The container listener ensures we catch events from within in case
				// the outer content stops propagation of the event.
				//
				// The document listener ensures we catch events that originate from elements that were
				// manually moved outside of the container (e.g. via manual portals).
				for (const node of [target, document]) {
					var counts = listeners.get(node);

					if (counts === undefined) {
						counts = new Map();
						listeners.set(node, counts);
					}

					var count = counts.get(event_name);

					if (count === undefined) {
						node.addEventListener(event_name, _dom_elements_events_js__WEBPACK_IMPORTED_MODULE_8__.handle_event_propagation, { passive });
						counts.set(event_name, 1);
					} else {
						counts.set(event_name, count + 1);
					}
				}
			}
		};

		event_handle((0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_7__.array_from)(_dom_elements_events_js__WEBPACK_IMPORTED_MODULE_8__.all_registered_events));
		_dom_elements_events_js__WEBPACK_IMPORTED_MODULE_8__.root_event_handles.add(event_handle);

		return () => {
			for (var event_name of registered_events) {
				for (const node of [target, document]) {
					var counts = /** @type {Map<string, number>} */ (listeners.get(node));
					var count = /** @type {number} */ (counts.get(event_name));

					if (--count == 0) {
						node.removeEventListener(event_name, _dom_elements_events_js__WEBPACK_IMPORTED_MODULE_8__.handle_event_propagation);
						counts.delete(event_name);

						if (counts.size === 0) {
							listeners.delete(node);
						}
					} else {
						counts.set(event_name, count);
					}
				}
			}

			_dom_elements_events_js__WEBPACK_IMPORTED_MODULE_8__.root_event_handles.delete(event_handle);

			if (anchor_node !== anchor) {
				anchor_node.parentNode?.removeChild(anchor_node);
			}
		};
	});

	mounted_components.set(component, unmount);
	return component;
}

/**
 * References of the components that were mounted or hydrated.
 * Uses a `WeakMap` to avoid memory leaks.
 */
let mounted_components = new WeakMap();

/**
 * Unmounts a component that was previously mounted using `mount` or `hydrate`.
 *
 * Since 5.13.0, if `options.outro` is `true`, [transitions](https://svelte.dev/docs/svelte/transition) will play before the component is removed from the DOM.
 *
 * Returns a `Promise` that resolves after transitions have completed if `options.outro` is true, or immediately otherwise (prior to 5.13.0, returns `void`).
 *
 * ```js
 * import { mount, unmount } from 'svelte';
 * import App from './App.svelte';
 *
 * const app = mount(App, { target: document.body });
 *
 * // later...
 * unmount(app, { outro: true });
 * ```
 * @param {Record<string, any>} component
 * @param {{ outro?: boolean }} [options]
 * @returns {Promise<void>}
 */
function unmount(component, options) {
	const fn = mounted_components.get(component);

	if (fn) {
		mounted_components.delete(component);
		return fn(options);
	}

	if (esm_env__WEBPACK_IMPORTED_MODULE_0__.DEV) {
		_warnings_js__WEBPACK_IMPORTED_MODULE_9__.lifecycle_double_unmount();
	}

	return Promise.resolve();
}


/***/ },

/***/ "./node_modules/svelte/src/internal/client/runtime.js"
/*!************************************************************!*\
  !*** ./node_modules/svelte/src/internal/client/runtime.js ***!
  \************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   active_effect: () => (/* binding */ active_effect),
/* harmony export */   active_reaction: () => (/* binding */ active_reaction),
/* harmony export */   current_sources: () => (/* binding */ current_sources),
/* harmony export */   deep_read: () => (/* binding */ deep_read),
/* harmony export */   deep_read_state: () => (/* binding */ deep_read_state),
/* harmony export */   get: () => (/* binding */ get),
/* harmony export */   increment_write_version: () => (/* binding */ increment_write_version),
/* harmony export */   is_destroying_effect: () => (/* binding */ is_destroying_effect),
/* harmony export */   is_dirty: () => (/* binding */ is_dirty),
/* harmony export */   new_deps: () => (/* binding */ new_deps),
/* harmony export */   push_reaction_value: () => (/* binding */ push_reaction_value),
/* harmony export */   remove_reactions: () => (/* binding */ remove_reactions),
/* harmony export */   safe_get: () => (/* binding */ safe_get),
/* harmony export */   set_active_effect: () => (/* binding */ set_active_effect),
/* harmony export */   set_active_reaction: () => (/* binding */ set_active_reaction),
/* harmony export */   set_is_destroying_effect: () => (/* binding */ set_is_destroying_effect),
/* harmony export */   set_untracked_writes: () => (/* binding */ set_untracked_writes),
/* harmony export */   set_update_version: () => (/* binding */ set_update_version),
/* harmony export */   settled: () => (/* binding */ settled),
/* harmony export */   skipped_deps: () => (/* binding */ skipped_deps),
/* harmony export */   tick: () => (/* binding */ tick),
/* harmony export */   untrack: () => (/* binding */ untrack),
/* harmony export */   untracked_writes: () => (/* binding */ untracked_writes),
/* harmony export */   untracking: () => (/* binding */ untracking),
/* harmony export */   update_effect: () => (/* binding */ update_effect),
/* harmony export */   update_reaction: () => (/* binding */ update_reaction),
/* harmony export */   update_version: () => (/* binding */ update_version),
/* harmony export */   write_version: () => (/* binding */ write_version)
/* harmony export */ });
/* harmony import */ var esm_env__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! esm-env */ "./node_modules/esm-env/index.js");
/* harmony import */ var _shared_utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/utils.js */ "./node_modules/svelte/src/internal/shared/utils.js");
/* harmony import */ var _reactivity_effects_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./reactivity/effects.js */ "./node_modules/svelte/src/internal/client/reactivity/effects.js");
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./constants.js */ "./node_modules/svelte/src/internal/client/constants.js");
/* harmony import */ var _reactivity_sources_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./reactivity/sources.js */ "./node_modules/svelte/src/internal/client/reactivity/sources.js");
/* harmony import */ var _reactivity_deriveds_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./reactivity/deriveds.js */ "./node_modules/svelte/src/internal/client/reactivity/deriveds.js");
/* harmony import */ var _flags_index_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../flags/index.js */ "./node_modules/svelte/src/internal/flags/index.js");
/* harmony import */ var _dev_tracing_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./dev/tracing.js */ "./node_modules/svelte/src/internal/client/dev/tracing.js");
/* harmony import */ var _shared_dev_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../shared/dev.js */ "./node_modules/svelte/src/internal/shared/dev.js");
/* harmony import */ var _context_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./context.js */ "./node_modules/svelte/src/internal/client/context.js");
/* harmony import */ var _reactivity_batch_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./reactivity/batch.js */ "./node_modules/svelte/src/internal/client/reactivity/batch.js");
/* harmony import */ var _error_handling_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./error-handling.js */ "./node_modules/svelte/src/internal/client/error-handling.js");
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../constants.js */ "./node_modules/svelte/src/constants.js");
/* harmony import */ var _legacy_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./legacy.js */ "./node_modules/svelte/src/internal/client/legacy.js");
/* harmony import */ var _dom_elements_bindings_shared_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./dom/elements/bindings/shared.js */ "./node_modules/svelte/src/internal/client/dom/elements/bindings/shared.js");
/* harmony import */ var _reactivity_status_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./reactivity/status.js */ "./node_modules/svelte/src/internal/client/reactivity/status.js");
/* harmony import */ var _warnings_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./warnings.js */ "./node_modules/svelte/src/internal/client/warnings.js");
/** @import { Derived, Effect, Reaction, Source, Value } from '#client' */


















/**
 * True if updating in an effect context that is reactive (i.e. not branch/root effects)
 */
let is_updating_effect = false;

let is_destroying_effect = false;

/** @param {boolean} value */
function set_is_destroying_effect(value) {
	is_destroying_effect = value;
}

/** @type {null | Reaction} */
let active_reaction = null;

let untracking = false;

/** @param {null | Reaction} reaction */
function set_active_reaction(reaction) {
	active_reaction = reaction;
}

/** @type {null | Effect} */
let active_effect = null;

/** @param {null | Effect} effect */
function set_active_effect(effect) {
	active_effect = effect;
}

/**
 * When sources are created within a reaction, reading and writing
 * them within that reaction should not cause a re-run
 * @type {null | Set<Source>}
 */
let current_sources = null;

/** @param {Value} value */
function push_reaction_value(value) {
	if (
		active_reaction !== null &&
		((!_flags_index_js__WEBPACK_IMPORTED_MODULE_6__.async_mode_flag && (active_reaction.f & _constants_js__WEBPACK_IMPORTED_MODULE_3__.REACTION_IS_UPDATING) !== 0) ||
			(active_reaction.f & _constants_js__WEBPACK_IMPORTED_MODULE_3__.DERIVED) !== 0)
	) {
		(current_sources ??= new Set()).add(value);
	}
}

/**
 * The dependencies of the reaction that is currently being executed. In many cases,
 * the dependencies are unchanged between runs, and so this will be `null` unless
 * and until a new dependency is accessed — we track this via `skipped_deps`
 * @type {null | Value[]}
 */
let new_deps = null;

let skipped_deps = 0;

/**
 * Tracks writes that the effect it's executed in doesn't listen to yet,
 * so that the dependency can be added to the effect later on if it then reads it
 * @type {null | Source[]}
 */
let untracked_writes = null;

/** @param {null | Source[]} value */
function set_untracked_writes(value) {
	untracked_writes = value;
}

/**
 * @type {number} Used by sources and deriveds for handling updates.
 * Version starts from 1 so that unowned deriveds differentiate between a created effect and a run one for tracing
 **/
let write_version = 1;

/** @type {number} Used to version each read of a source of derived to avoid duplicating dependencies inside a reaction */
let read_version = 0;

let update_version = read_version;

/** @param {number} value */
function set_update_version(value) {
	update_version = value;
}

function increment_write_version() {
	return ++write_version;
}

/**
 * Determines whether a derived or effect is dirty.
 * If it is MAYBE_DIRTY, will set the status to CLEAN
 * @param {Reaction} reaction
 * @returns {boolean}
 */
function is_dirty(reaction) {
	var flags = reaction.f;

	if ((flags & _constants_js__WEBPACK_IMPORTED_MODULE_3__.DIRTY) !== 0) {
		return true;
	}

	if ((flags & _constants_js__WEBPACK_IMPORTED_MODULE_3__.MAYBE_DIRTY) !== 0) {
		var dependencies = /** @type {Value[]} */ (reaction.deps);
		var length = dependencies.length;

		for (var i = 0; i < length; i++) {
			var dependency = dependencies[i];

			if (is_dirty(/** @type {Derived} */ (dependency))) {
				(0,_reactivity_deriveds_js__WEBPACK_IMPORTED_MODULE_5__.update_derived)(/** @type {Derived} */ (dependency));
			}

			if (dependency.wv > reaction.wv) {
				return true;
			}
		}

		if (
			(flags & _constants_js__WEBPACK_IMPORTED_MODULE_3__.CONNECTED) !== 0 &&
			// During time traveling we don't want to reset the status so that
			// traversal of the graph in the other batches still happens
			_reactivity_batch_js__WEBPACK_IMPORTED_MODULE_10__.batch_values === null
		) {
			(0,_reactivity_status_js__WEBPACK_IMPORTED_MODULE_15__.set_signal_status)(reaction, _constants_js__WEBPACK_IMPORTED_MODULE_3__.CLEAN);
		}
	}

	return false;
}

/**
 * @param {Value} signal
 * @param {Effect} effect
 * @param {boolean} [root]
 */
function schedule_possible_effect_self_invalidation(signal, effect, root = true) {
	var reactions = signal.reactions;
	if (reactions === null) return;

	if (!_flags_index_js__WEBPACK_IMPORTED_MODULE_6__.async_mode_flag && current_sources !== null && current_sources.has(signal)) {
		return;
	}

	for (var i = 0; i < reactions.length; i++) {
		var reaction = reactions[i];

		if ((reaction.f & _constants_js__WEBPACK_IMPORTED_MODULE_3__.DERIVED) !== 0) {
			schedule_possible_effect_self_invalidation(/** @type {Derived} */ (reaction), effect, false);
		} else if (effect === reaction) {
			if (root) {
				(0,_reactivity_status_js__WEBPACK_IMPORTED_MODULE_15__.set_signal_status)(reaction, _constants_js__WEBPACK_IMPORTED_MODULE_3__.DIRTY);
			} else if ((reaction.f & _constants_js__WEBPACK_IMPORTED_MODULE_3__.CLEAN) !== 0) {
				(0,_reactivity_status_js__WEBPACK_IMPORTED_MODULE_15__.set_signal_status)(reaction, _constants_js__WEBPACK_IMPORTED_MODULE_3__.MAYBE_DIRTY);
			}
			;(0,_reactivity_batch_js__WEBPACK_IMPORTED_MODULE_10__.schedule_effect)(/** @type {Effect} */ (reaction));
		}
	}
}

/** @param {Reaction} reaction */
function update_reaction(reaction) {
	var previous_deps = new_deps;
	var previous_skipped_deps = skipped_deps;
	var previous_untracked_writes = untracked_writes;
	var previous_reaction = active_reaction;
	var previous_sources = current_sources;
	var previous_component_context = _context_js__WEBPACK_IMPORTED_MODULE_9__.component_context;
	var previous_untracking = untracking;
	var previous_update_version = update_version;

	var flags = reaction.f;

	new_deps = /** @type {null | Value[]} */ (null);
	skipped_deps = 0;
	untracked_writes = null;
	active_reaction = (flags & (_constants_js__WEBPACK_IMPORTED_MODULE_3__.BRANCH_EFFECT | _constants_js__WEBPACK_IMPORTED_MODULE_3__.ROOT_EFFECT)) === 0 ? reaction : null;

	current_sources = null;
	(0,_context_js__WEBPACK_IMPORTED_MODULE_9__.set_component_context)(reaction.ctx);
	untracking = false;
	update_version = ++read_version;

	if (reaction.ac !== null) {
		(0,_dom_elements_bindings_shared_js__WEBPACK_IMPORTED_MODULE_14__.without_reactive_context)(() => {
			/** @type {AbortController} */ (reaction.ac).abort(_constants_js__WEBPACK_IMPORTED_MODULE_3__.STALE_REACTION);
		});

		reaction.ac = null;
	}

	try {
		reaction.f |= _constants_js__WEBPACK_IMPORTED_MODULE_3__.REACTION_IS_UPDATING;
		var fn = /** @type {Function} */ (reaction.fn);
		var result = fn();
		reaction.f |= _constants_js__WEBPACK_IMPORTED_MODULE_3__.REACTION_RAN;
		var deps = update_dependencies(reaction);

		// If we're inside an effect and we have untracked writes, then we need to
		// ensure that if any of those untracked writes result in re-invalidation
		// of the current effect, then that happens accordingly
		if (
			(0,_context_js__WEBPACK_IMPORTED_MODULE_9__.is_runes)() &&
			untracked_writes !== null &&
			!untracking &&
			deps !== null &&
			(reaction.f & (_constants_js__WEBPACK_IMPORTED_MODULE_3__.DERIVED | _constants_js__WEBPACK_IMPORTED_MODULE_3__.MAYBE_DIRTY | _constants_js__WEBPACK_IMPORTED_MODULE_3__.DIRTY)) === 0
		) {
			for (var i = 0; i < /** @type {Source[]} */ (untracked_writes).length; i++) {
				schedule_possible_effect_self_invalidation(
					untracked_writes[i],
					/** @type {Effect} */ (reaction)
				);
			}
		}

		// If we are returning to an previous reaction then
		// we need to increment the read version to ensure that
		// any dependencies in this reaction aren't marked with
		// the same version
		if (previous_reaction !== null && previous_reaction !== reaction) {
			read_version++;

			// update the `rv` of the previous reaction's deps — both existing and new —
			// so that they are not added again
			if (previous_reaction.deps !== null) {
				for (let i = 0; i < previous_skipped_deps; i += 1) {
					previous_reaction.deps[i].rv = read_version;
				}
			}

			if (previous_deps !== null) {
				for (const dep of previous_deps) {
					dep.rv = read_version;
				}
			}

			if (untracked_writes !== null) {
				if (previous_untracked_writes === null) {
					previous_untracked_writes = untracked_writes;
				} else {
					previous_untracked_writes.push(.../** @type {Source[]} */ (untracked_writes));
				}
			}
		}

		if ((reaction.f & _constants_js__WEBPACK_IMPORTED_MODULE_3__.ERROR_VALUE) !== 0) {
			reaction.f ^= _constants_js__WEBPACK_IMPORTED_MODULE_3__.ERROR_VALUE;
		}

		return result;
	} catch (error) {
		// still commit the deps read before the throw, otherwise deriveds connected by this run keep no reader and the reaction never re-runs when they change
		update_dependencies(reaction);

		return (0,_error_handling_js__WEBPACK_IMPORTED_MODULE_11__.handle_error)(error);
	} finally {
		reaction.f ^= _constants_js__WEBPACK_IMPORTED_MODULE_3__.REACTION_IS_UPDATING;
		new_deps = previous_deps;
		skipped_deps = previous_skipped_deps;
		untracked_writes = previous_untracked_writes;
		active_reaction = previous_reaction;
		current_sources = previous_sources;
		(0,_context_js__WEBPACK_IMPORTED_MODULE_9__.set_component_context)(previous_component_context);
		untracking = previous_untracking;
		update_version = previous_update_version;
	}
}

/**
 * @param {Reaction} reaction
 */
function update_dependencies(reaction) {
	var deps = reaction.deps;

	// Don't remove reactions during fork;
	// they must remain for when fork is discarded
	var is_fork = _reactivity_batch_js__WEBPACK_IMPORTED_MODULE_10__.current_batch?.is_fork;

	if (new_deps !== null) {
		var i;

		if (!is_fork) {
			remove_reactions(reaction, skipped_deps);
		}

		if (deps !== null && skipped_deps > 0) {
			deps.length = skipped_deps + new_deps.length;
			for (i = 0; i < new_deps.length; i++) {
				deps[skipped_deps + i] = new_deps[i];
			}
		} else {
			reaction.deps = deps = new_deps;
		}

		if ((0,_reactivity_effects_js__WEBPACK_IMPORTED_MODULE_2__.effect_tracking)() && (reaction.f & _constants_js__WEBPACK_IMPORTED_MODULE_3__.CONNECTED) !== 0) {
			for (i = skipped_deps; i < deps.length; i++) {
				(deps[i].reactions ??= []).push(reaction);
			}
		}
	} else if (!is_fork && deps !== null && skipped_deps < deps.length) {
		remove_reactions(reaction, skipped_deps);
		deps.length = skipped_deps;
	}

	return deps;
}

/**
 * @template V
 * @param {Reaction} signal
 * @param {Value<V>} dependency
 * @returns {void}
 */
function remove_reaction(signal, dependency) {
	let reactions = dependency.reactions;
	if (reactions !== null) {
		var index = _shared_utils_js__WEBPACK_IMPORTED_MODULE_1__.index_of.call(reactions, signal);
		if (index !== -1) {
			var new_length = reactions.length - 1;
			if (new_length === 0) {
				reactions = dependency.reactions = null;
			} else {
				// Swap with last element and then remove.
				reactions[index] = reactions[new_length];
				reactions.pop();
			}
		}
	}

	// If the derived has no reactions, then we can disconnect it from the graph,
	// allowing it to either reconnect in the future, or be GC'd by the VM.
	if (
		reactions === null &&
		(dependency.f & _constants_js__WEBPACK_IMPORTED_MODULE_3__.DERIVED) !== 0 &&
		// Destroying a child effect while updating a parent effect can cause a dependency to appear
		// to be unused, when in fact it is used by the currently-updating parent. Checking `new_deps`
		// allows us to skip the expensive work of disconnecting and immediately reconnecting it
		(new_deps === null || !_shared_utils_js__WEBPACK_IMPORTED_MODULE_1__.includes.call(new_deps, dependency))
	) {
		var derived = /** @type {Derived} */ (dependency);

		if ((derived.f & _constants_js__WEBPACK_IMPORTED_MODULE_3__.CONNECTED) !== 0) {
			derived.f ^= _constants_js__WEBPACK_IMPORTED_MODULE_3__.CONNECTED;
		}

		// In a fork it's possible that a derived is executed and gets reactions, then commits, but is
		// never re-executed. This is possible when the derived is only executed once in the context
		// of a new branch which happens before fork.commit() runs. In this case, the derived still has
		// UNINITIALIZED as its value, and then when it's loosing its reactions we need to ensure it stays
		// DIRTY so it is reexecuted once someone wants its value again.
		if (derived.v !== _constants_js__WEBPACK_IMPORTED_MODULE_12__.UNINITIALIZED) {
			(0,_reactivity_status_js__WEBPACK_IMPORTED_MODULE_15__.update_derived_status)(derived);
		}

		// Call abort controller, noone's listening to this derived anymore
		if (derived.ac !== null) {
			(0,_dom_elements_bindings_shared_js__WEBPACK_IMPORTED_MODULE_14__.without_reactive_context)(() => {
				/** @type {AbortController} */ (derived.ac).abort(_constants_js__WEBPACK_IMPORTED_MODULE_3__.STALE_REACTION);
				derived.ac = null;
				// ensure it reruns right away next time instead of potentially returning a rejected promise as its value
				(0,_reactivity_status_js__WEBPACK_IMPORTED_MODULE_15__.set_signal_status)(derived, _constants_js__WEBPACK_IMPORTED_MODULE_3__.DIRTY);
			});
		}

		// freeze any effects inside this derived
		;(0,_reactivity_deriveds_js__WEBPACK_IMPORTED_MODULE_5__.freeze_derived_effects)(derived);

		// Disconnect any reactions owned by this reaction
		remove_reactions(derived, 0);
	}
}

/**
 * @param {Reaction} signal
 * @param {number} start_index
 * @returns {void}
 */
function remove_reactions(signal, start_index) {
	var dependencies = signal.deps;
	if (dependencies === null) return;

	for (var i = start_index; i < dependencies.length; i++) {
		remove_reaction(signal, dependencies[i]);
	}
}

/**
 * @param {Effect} effect
 * @returns {void}
 */
function update_effect(effect) {
	var flags = effect.f;

	if ((flags & _constants_js__WEBPACK_IMPORTED_MODULE_3__.DESTROYED) !== 0) {
		return;
	}

	;(0,_reactivity_status_js__WEBPACK_IMPORTED_MODULE_15__.set_signal_status)(effect, _constants_js__WEBPACK_IMPORTED_MODULE_3__.CLEAN);

	var previous_effect = active_effect;
	var was_updating_effect = is_updating_effect;

	active_effect = effect;
	is_updating_effect = (flags & (_constants_js__WEBPACK_IMPORTED_MODULE_3__.BRANCH_EFFECT | _constants_js__WEBPACK_IMPORTED_MODULE_3__.ROOT_EFFECT)) === 0; // Branch/root effects are not reactive contexts

	if (esm_env__WEBPACK_IMPORTED_MODULE_0__.DEV) {
		var previous_component_fn = _context_js__WEBPACK_IMPORTED_MODULE_9__.dev_current_component_function;
		(0,_context_js__WEBPACK_IMPORTED_MODULE_9__.set_dev_current_component_function)(effect.component_function);
		var previous_stack = /** @type {any} */ (_context_js__WEBPACK_IMPORTED_MODULE_9__.dev_stack);
		// only block effects have a dev stack, keep the current one otherwise
		(0,_context_js__WEBPACK_IMPORTED_MODULE_9__.set_dev_stack)(effect.dev_stack ?? _context_js__WEBPACK_IMPORTED_MODULE_9__.dev_stack);
	}

	try {
		if ((flags & (_constants_js__WEBPACK_IMPORTED_MODULE_3__.BLOCK_EFFECT | _constants_js__WEBPACK_IMPORTED_MODULE_3__.MANAGED_EFFECT)) !== 0) {
			(0,_reactivity_effects_js__WEBPACK_IMPORTED_MODULE_2__.destroy_block_effect_children)(effect);
		} else {
			(0,_reactivity_effects_js__WEBPACK_IMPORTED_MODULE_2__.destroy_effect_children)(effect);
		}

		;(0,_reactivity_effects_js__WEBPACK_IMPORTED_MODULE_2__.execute_effect_teardown)(effect);
		var teardown = update_reaction(effect);
		effect.teardown = typeof teardown === 'function' ? teardown : null;
		effect.wv = write_version;

		// In DEV, increment versions of any sources that were written to during the effect,
		// so that they are correctly marked as dirty when the effect re-runs
		if (esm_env__WEBPACK_IMPORTED_MODULE_0__.DEV && _flags_index_js__WEBPACK_IMPORTED_MODULE_6__.tracing_mode_flag && (effect.f & _constants_js__WEBPACK_IMPORTED_MODULE_3__.DIRTY) !== 0 && effect.deps !== null) {
			for (var dep of effect.deps) {
				if (dep.set_during_effect) {
					dep.wv = increment_write_version();
					dep.set_during_effect = false;
				}
			}
		}
	} finally {
		is_updating_effect = was_updating_effect;
		active_effect = previous_effect;

		if (esm_env__WEBPACK_IMPORTED_MODULE_0__.DEV) {
			(0,_context_js__WEBPACK_IMPORTED_MODULE_9__.set_dev_current_component_function)(previous_component_fn);
			(0,_context_js__WEBPACK_IMPORTED_MODULE_9__.set_dev_stack)(previous_stack);
		}
	}
}

/**
 * Returns a promise that resolves once any pending state changes have been applied.
 * @returns {Promise<void>}
 */
async function tick() {
	if (_flags_index_js__WEBPACK_IMPORTED_MODULE_6__.async_mode_flag) {
		return new Promise((f) => {
			// Race them against each other - in almost all cases requestAnimationFrame will fire first,
			// but e.g. in case the window is not focused or a view transition happens, requestAnimationFrame
			// will be delayed and setTimeout helps us resolve fast enough in that case
			requestAnimationFrame(() => f());
			setTimeout(() => f());
		});
	}

	await Promise.resolve();

	// By calling flushSync we guarantee that any pending state changes are applied after one tick.
	// TODO look into whether we can make flushing subsequent updates synchronously in the future.
	(0,_reactivity_batch_js__WEBPACK_IMPORTED_MODULE_10__.flushSync)();
}

/**
 * Returns a promise that resolves once any state changes, and asynchronous work resulting from them,
 * have resolved and the DOM has been updated
 * @returns {Promise<void>}
 * @since 5.36
 */
function settled() {
	return _reactivity_batch_js__WEBPACK_IMPORTED_MODULE_10__.Batch.ensure().settled();
}

/**
 * @template V
 * @param {Value<V>} signal
 * @returns {V}
 */
function get(signal) {
	var flags = signal.f;
	var is_derived = (flags & _constants_js__WEBPACK_IMPORTED_MODULE_3__.DERIVED) !== 0;

	_legacy_js__WEBPACK_IMPORTED_MODULE_13__.captured_signals?.add(signal);

	// Register the dependency on the current reaction signal.
	if (active_reaction !== null && !untracking) {
		// if we're in a derived that is being read inside an _async_ derived,
		// it's possible that the effect was already destroyed. In this case,
		// we don't add the dependency, because that would create a memory leak
		var destroyed = active_effect !== null && (active_effect.f & _constants_js__WEBPACK_IMPORTED_MODULE_3__.DESTROYED) !== 0;

		if (!destroyed && (current_sources === null || !current_sources.has(signal))) {
			var deps = active_reaction.deps;

			if ((active_reaction.f & _constants_js__WEBPACK_IMPORTED_MODULE_3__.REACTION_IS_UPDATING) !== 0) {
				// we're in the effect init/update cycle
				if (signal.rv < read_version) {
					signal.rv = read_version;

					// If the signal is accessing the same dependencies in the same
					// order as it did last time, increment `skipped_deps`
					// rather than updating `new_deps`, which creates GC cost
					if (new_deps === null && deps !== null && deps[skipped_deps] === signal) {
						skipped_deps++;
					} else if (new_deps === null) {
						new_deps = [signal];
					} else {
						new_deps.push(signal);
					}
				}
			} else {
				// We're adding a dependency outside the init/update cycle (i.e. after an `await`).
				// We have to deduplicate deps/reactions in this case or remove_reactions could
				// disconnect deps/reactions that are actually still in use (if skip_deps says
				// "disconnect all after this index" and some of the signals are also present in
				// list prior to the cutoff index, i.e. that should be kept).
				active_reaction.deps ??= [];
				if (!_shared_utils_js__WEBPACK_IMPORTED_MODULE_1__.includes.call(active_reaction.deps, signal)) {
					active_reaction.deps.push(signal);
				}

				var reactions = signal.reactions;

				if (reactions === null) {
					signal.reactions = [active_reaction];
				} else if (!_shared_utils_js__WEBPACK_IMPORTED_MODULE_1__.includes.call(reactions, active_reaction)) {
					reactions.push(active_reaction);
				}
			}
		}
	}

	if (esm_env__WEBPACK_IMPORTED_MODULE_0__.DEV) {
		if (
			!untracking &&
			_reactivity_deriveds_js__WEBPACK_IMPORTED_MODULE_5__.reactivity_loss_tracker &&
			// By checking that current/previous batch are null we filter out false positives.
			// reactivity_loss_tracker is only reset after a microtask, so if a flush happens
			// before that, we get warnings for things we shouldn't warn on.
			_reactivity_batch_js__WEBPACK_IMPORTED_MODULE_10__.current_batch === null &&
			_reactivity_batch_js__WEBPACK_IMPORTED_MODULE_10__.previous_batch === null &&
			!_reactivity_deriveds_js__WEBPACK_IMPORTED_MODULE_5__.reactivity_loss_tracker.warned &&
			(_reactivity_deriveds_js__WEBPACK_IMPORTED_MODULE_5__.reactivity_loss_tracker.effect.f & _constants_js__WEBPACK_IMPORTED_MODULE_3__.REACTION_IS_UPDATING) === 0 &&
			!_reactivity_deriveds_js__WEBPACK_IMPORTED_MODULE_5__.reactivity_loss_tracker.effect_deps.has(signal)
		) {
			_reactivity_deriveds_js__WEBPACK_IMPORTED_MODULE_5__.reactivity_loss_tracker.warned = true;

			_warnings_js__WEBPACK_IMPORTED_MODULE_16__.await_reactivity_loss(/** @type {string} */ (signal.label));

			var trace = (0,_shared_dev_js__WEBPACK_IMPORTED_MODULE_8__.get_error)('traced at');
			// eslint-disable-next-line no-console
			if (trace) console.warn(trace);
		}

		_reactivity_deriveds_js__WEBPACK_IMPORTED_MODULE_5__.recent_async_deriveds.delete(signal);

		if (
			_flags_index_js__WEBPACK_IMPORTED_MODULE_6__.tracing_mode_flag &&
			!untracking &&
			_dev_tracing_js__WEBPACK_IMPORTED_MODULE_7__.tracing_expressions !== null &&
			active_reaction !== null &&
			_dev_tracing_js__WEBPACK_IMPORTED_MODULE_7__.tracing_expressions.reaction === active_reaction
		) {
			// Used when mapping state between special blocks like `each`
			if (signal.trace) {
				signal.trace();
			} else {
				trace = (0,_shared_dev_js__WEBPACK_IMPORTED_MODULE_8__.get_error)('traced at');

				if (trace) {
					var entry = _dev_tracing_js__WEBPACK_IMPORTED_MODULE_7__.tracing_expressions.entries.get(signal);

					if (entry === undefined) {
						entry = { traces: [] };
						_dev_tracing_js__WEBPACK_IMPORTED_MODULE_7__.tracing_expressions.entries.set(signal, entry);
					}

					var last = entry.traces[entry.traces.length - 1];

					// traces can be duplicated, e.g. by `snapshot` invoking both
					// both `getOwnPropertyDescriptor` and `get` traps at once
					if (trace.stack !== last?.stack) {
						entry.traces.push(trace);
					}
				}
			}
		}
	}

	if (is_destroying_effect && _reactivity_sources_js__WEBPACK_IMPORTED_MODULE_4__.old_values.has(signal)) {
		return _reactivity_sources_js__WEBPACK_IMPORTED_MODULE_4__.old_values.get(signal);
	}

	if (is_derived) {
		var derived = /** @type {Derived} */ (signal);

		if (is_destroying_effect) {
			var value = derived.v;

			// if the derived is dirty and has reactions, or depends on the values that just changed, re-execute
			// (a derived can be maybe_dirty due to the effect destroy removing its last reaction)
			if (
				((derived.f & _constants_js__WEBPACK_IMPORTED_MODULE_3__.CLEAN) === 0 && derived.reactions !== null) ||
				depends_on_old_values(derived)
			) {
				value = (0,_reactivity_deriveds_js__WEBPACK_IMPORTED_MODULE_5__.execute_derived)(derived);
			}

			_reactivity_sources_js__WEBPACK_IMPORTED_MODULE_4__.old_values.set(derived, value);

			return value;
		}

		// connect disconnected deriveds if we are reading them inside an effect,
		// or inside another derived that is already connected
		var should_connect =
			(derived.f & _constants_js__WEBPACK_IMPORTED_MODULE_3__.CONNECTED) === 0 &&
			!untracking &&
			active_reaction !== null &&
			(is_updating_effect || (active_reaction.f & _constants_js__WEBPACK_IMPORTED_MODULE_3__.CONNECTED) !== 0);

		var is_new = (derived.f & _constants_js__WEBPACK_IMPORTED_MODULE_3__.REACTION_RAN) === 0;

		if (is_dirty(derived)) {
			if (should_connect) {
				// set the flag before `update_derived`, so that the derived
				// is added as a reaction to its dependencies
				derived.f |= _constants_js__WEBPACK_IMPORTED_MODULE_3__.CONNECTED;
			}

			;(0,_reactivity_deriveds_js__WEBPACK_IMPORTED_MODULE_5__.update_derived)(derived);
		}

		if (should_connect && !is_new) {
			(0,_reactivity_deriveds_js__WEBPACK_IMPORTED_MODULE_5__.unfreeze_derived_effects)(derived);
			reconnect(derived);
		}
	}

	if (_reactivity_batch_js__WEBPACK_IMPORTED_MODULE_10__.batch_values?.has(signal)) {
		return _reactivity_batch_js__WEBPACK_IMPORTED_MODULE_10__.batch_values.get(signal);
	}

	if ((signal.f & _constants_js__WEBPACK_IMPORTED_MODULE_3__.ERROR_VALUE) !== 0) {
		throw signal.v;
	}

	return signal.v;
}

/**
 * (Re)connect a disconnected derived, so that it is notified
 * of changes in `mark_reactions`
 * @param {Derived} derived
 */
function reconnect(derived) {
	derived.f |= _constants_js__WEBPACK_IMPORTED_MODULE_3__.CONNECTED;

	if (derived.deps === null) return;

	for (const dep of derived.deps) {
		(dep.reactions ??= []).push(derived);

		if ((dep.f & _constants_js__WEBPACK_IMPORTED_MODULE_3__.DERIVED) !== 0 && (dep.f & _constants_js__WEBPACK_IMPORTED_MODULE_3__.CONNECTED) === 0) {
			(0,_reactivity_deriveds_js__WEBPACK_IMPORTED_MODULE_5__.unfreeze_derived_effects)(/** @type {Derived} */ (dep));
			reconnect(/** @type {Derived} */ (dep));
		}
	}
}

/** @param {Derived} derived */
function depends_on_old_values(derived) {
	if (derived.v === _constants_js__WEBPACK_IMPORTED_MODULE_12__.UNINITIALIZED) return true; // we don't know, so assume the worst
	if (derived.deps === null) return false;

	for (const dep of derived.deps) {
		if (_reactivity_sources_js__WEBPACK_IMPORTED_MODULE_4__.old_values.has(dep)) {
			return true;
		}

		if ((dep.f & _constants_js__WEBPACK_IMPORTED_MODULE_3__.DERIVED) !== 0 && depends_on_old_values(/** @type {Derived} */ (dep))) {
			return true;
		}
	}

	return false;
}

/**
 * Like `get`, but checks for `undefined`. Used for `var` declarations because they can be accessed before being declared
 * @template V
 * @param {Value<V> | undefined} signal
 * @returns {V | undefined}
 */
function safe_get(signal) {
	return signal && get(signal);
}

/**
 * When used inside a [`$derived`](https://svelte.dev/docs/svelte/$derived) or [`$effect`](https://svelte.dev/docs/svelte/$effect),
 * any state read inside `fn` will not be treated as a dependency.
 *
 * ```ts
 * $effect(() => {
 *   // this will run when `data` changes, but not when `time` changes
 *   save(data, {
 *     timestamp: untrack(() => time)
 *   });
 * });
 * ```
 * @template T
 * @param {() => T} fn
 * @returns {T}
 */
function untrack(fn) {
	var previous_untracking = untracking;
	try {
		untracking = true;
		return fn();
	} finally {
		untracking = previous_untracking;
	}
}

/**
 * Possibly traverse an object and read all its properties so that they're all reactive in case this is `$state`.
 * Does only check first level of an object for performance reasons (heuristic should be good for 99% of all cases).
 * @param {any} value
 * @returns {void}
 */
function deep_read_state(value) {
	if (typeof value !== 'object' || !value || value instanceof EventTarget) {
		return;
	}

	if (_constants_js__WEBPACK_IMPORTED_MODULE_3__.STATE_SYMBOL in value) {
		deep_read(value);
	} else if (!Array.isArray(value)) {
		for (let key in value) {
			const prop = value[key];
			if (typeof prop === 'object' && prop && _constants_js__WEBPACK_IMPORTED_MODULE_3__.STATE_SYMBOL in prop) {
				deep_read(prop);
			}
		}
	}
}

/**
 * Deeply traverse an object and read all its properties
 * so that they're all reactive in case this is `$state`
 * @param {any} value
 * @param {Set<any>} visited
 * @returns {void}
 */
function deep_read(value, visited = new Set()) {
	if (
		typeof value === 'object' &&
		value !== null &&
		// We don't want to traverse DOM elements
		!(value instanceof EventTarget) &&
		!visited.has(value)
	) {
		visited.add(value);
		// When working with a possible SvelteDate, this
		// will ensure we capture changes to it.
		if (value instanceof Date) {
			value.getTime();
		}
		for (let key in value) {
			try {
				deep_read(value[key], visited);
			} catch (e) {
				// continue
			}
		}
		const proto = (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_1__.get_prototype_of)(value);
		if (
			proto !== Object.prototype &&
			proto !== Array.prototype &&
			proto !== Map.prototype &&
			proto !== Set.prototype &&
			proto !== Date.prototype
		) {
			const descriptors = (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_1__.get_descriptors)(proto);
			for (let key in descriptors) {
				const get = descriptors[key].get;
				if (get) {
					try {
						get.call(value);
					} catch (e) {
						// continue
					}
				}
			}
		}
	}
}


/***/ },

/***/ "./node_modules/svelte/src/internal/client/timing.js"
/*!***********************************************************!*\
  !*** ./node_modules/svelte/src/internal/client/timing.js ***!
  \***********************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   raf: () => (/* binding */ raf)
/* harmony export */ });
/* harmony import */ var _shared_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/utils.js */ "./node_modules/svelte/src/internal/shared/utils.js");
/* harmony import */ var esm_env__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! esm-env */ "./node_modules/esm-env/index.js");
/** @import { Raf } from '#client' */




const now = esm_env__WEBPACK_IMPORTED_MODULE_1__.BROWSER ? () => performance.now() : () => Date.now();

/** @type {Raf} */
const raf = {
	// don't access requestAnimationFrame eagerly outside method
	// this allows basic testing of user code without JSDOM
	// bunder will eval and remove ternary when the user's app is built
	tick: /** @param {any} _ */ (_) => (esm_env__WEBPACK_IMPORTED_MODULE_1__.BROWSER ? requestAnimationFrame : _shared_utils_js__WEBPACK_IMPORTED_MODULE_0__.noop)(_),
	now: () => now(),
	tasks: new Set()
};


/***/ },

/***/ "./node_modules/svelte/src/internal/client/validate.js"
/*!*************************************************************!*\
  !*** ./node_modules/svelte/src/internal/client/validate.js ***!
  \*************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   validate_binding: () => (/* binding */ validate_binding)
/* harmony export */ });
/* harmony import */ var _context_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./context.js */ "./node_modules/svelte/src/internal/client/context.js");
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../constants.js */ "./node_modules/svelte/src/constants.js");
/* harmony import */ var _reactivity_effects_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./reactivity/effects.js */ "./node_modules/svelte/src/internal/client/reactivity/effects.js");
/* harmony import */ var _warnings_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./warnings.js */ "./node_modules/svelte/src/internal/client/warnings.js");
/* harmony import */ var _reactivity_store_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./reactivity/store.js */ "./node_modules/svelte/src/internal/client/reactivity/store.js");
/* harmony import */ var _reactivity_async_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./reactivity/async.js */ "./node_modules/svelte/src/internal/client/reactivity/async.js");
/** @import { Blocker } from '#client' */







/**
 * @param {string} binding
 * @param {Blocker[]} blockers
 * @param {() => Record<string, any>} get_object
 * @param {() => string} get_property
 * @param {number} line
 * @param {number} column
 */
function validate_binding(binding, blockers, get_object, get_property, line, column) {
	(0,_reactivity_async_js__WEBPACK_IMPORTED_MODULE_5__.run_after_blockers)(blockers, () => {
		var warned = false;

		var filename = _context_js__WEBPACK_IMPORTED_MODULE_0__.dev_current_component_function?.[_constants_js__WEBPACK_IMPORTED_MODULE_1__.FILENAME];

		(0,_reactivity_effects_js__WEBPACK_IMPORTED_MODULE_2__.render_effect)(() => {
			if (warned) return;

			var [object, is_store_sub] = (0,_reactivity_store_js__WEBPACK_IMPORTED_MODULE_4__.capture_store_binding)(get_object);

			if (is_store_sub) return;

			var property = get_property();

			var ran = false;

			// by making the (possibly false, but it would be an extreme edge case) assumption
			// that a getter has a corresponding setter, we can determine if a property is
			// reactive by seeing if this effect has dependencies
			var effect = (0,_reactivity_effects_js__WEBPACK_IMPORTED_MODULE_2__.render_effect)(() => {
				if (ran) return;

				// eslint-disable-next-line @typescript-eslint/no-unused-expressions
				object[property];
			});

			ran = true;

			if (effect.deps === null) {
				var location = `${filename}:${line}:${column}`;
				_warnings_js__WEBPACK_IMPORTED_MODULE_3__.binding_property_non_reactive(binding, location);

				warned = true;
			}
		});
	});
}


/***/ },

/***/ "./node_modules/svelte/src/internal/client/warnings.js"
/*!*************************************************************!*\
  !*** ./node_modules/svelte/src/internal/client/warnings.js ***!
  \*************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   assignment_value_stale: () => (/* binding */ assignment_value_stale),
/* harmony export */   await_reactivity_loss: () => (/* binding */ await_reactivity_loss),
/* harmony export */   await_waterfall: () => (/* binding */ await_waterfall),
/* harmony export */   binding_property_non_reactive: () => (/* binding */ binding_property_non_reactive),
/* harmony export */   console_log_state: () => (/* binding */ console_log_state),
/* harmony export */   derived_inert: () => (/* binding */ derived_inert),
/* harmony export */   event_handler_invalid: () => (/* binding */ event_handler_invalid),
/* harmony export */   hydratable_missing_but_expected: () => (/* binding */ hydratable_missing_but_expected),
/* harmony export */   hydration_attribute_changed: () => (/* binding */ hydration_attribute_changed),
/* harmony export */   hydration_html_changed: () => (/* binding */ hydration_html_changed),
/* harmony export */   hydration_mismatch: () => (/* binding */ hydration_mismatch),
/* harmony export */   invalid_raw_snippet_render: () => (/* binding */ invalid_raw_snippet_render),
/* harmony export */   legacy_recursive_reactive_block: () => (/* binding */ legacy_recursive_reactive_block),
/* harmony export */   lifecycle_double_unmount: () => (/* binding */ lifecycle_double_unmount),
/* harmony export */   ownership_invalid_binding: () => (/* binding */ ownership_invalid_binding),
/* harmony export */   ownership_invalid_mutation: () => (/* binding */ ownership_invalid_mutation),
/* harmony export */   select_multiple_invalid_value: () => (/* binding */ select_multiple_invalid_value),
/* harmony export */   state_proxy_equality_mismatch: () => (/* binding */ state_proxy_equality_mismatch),
/* harmony export */   svelte_boundary_reset_noop: () => (/* binding */ svelte_boundary_reset_noop),
/* harmony export */   transition_slide_display: () => (/* binding */ transition_slide_display)
/* harmony export */ });
/* harmony import */ var esm_env__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! esm-env */ "./node_modules/esm-env/index.js");
/* This file is generated by scripts/process-messages/index.js. Do not edit! */



var bold = 'font-weight: bold';
var normal = 'font-weight: normal';

/**
 * Assignment to `%property%` property (%location%) will evaluate to the right-hand side, not the value of `%property%` following the assignment. This may result in unexpected behaviour.
 * @param {string} property
 * @param {string} location
 */
function assignment_value_stale(property, location) {
	if (esm_env__WEBPACK_IMPORTED_MODULE_0__.DEV) {
		console.warn(`%c[svelte] assignment_value_stale\n%cAssignment to \`${property}\` property (${location}) will evaluate to the right-hand side, not the value of \`${property}\` following the assignment. This may result in unexpected behaviour.\nhttps://svelte.dev/e/assignment_value_stale`, bold, normal);
	} else {
		console.warn(`https://svelte.dev/e/assignment_value_stale`);
	}
}

/**
 * Detected reactivity loss when reading `%name%`. This happens when state is read in an async function after an earlier `await`
 * @param {string} name
 */
function await_reactivity_loss(name) {
	if (esm_env__WEBPACK_IMPORTED_MODULE_0__.DEV) {
		console.warn(`%c[svelte] await_reactivity_loss\n%cDetected reactivity loss when reading \`${name}\`. This happens when state is read in an async function after an earlier \`await\`\nhttps://svelte.dev/e/await_reactivity_loss`, bold, normal);
	} else {
		console.warn(`https://svelte.dev/e/await_reactivity_loss`);
	}
}

/**
 * An async derived, `%name%` (%location%) was not read immediately after it resolved. This often indicates an unnecessary waterfall, which can slow down your app
 * @param {string} name
 * @param {string} location
 */
function await_waterfall(name, location) {
	if (esm_env__WEBPACK_IMPORTED_MODULE_0__.DEV) {
		console.warn(`%c[svelte] await_waterfall\n%cAn async derived, \`${name}\` (${location}) was not read immediately after it resolved. This often indicates an unnecessary waterfall, which can slow down your app\nhttps://svelte.dev/e/await_waterfall`, bold, normal);
	} else {
		console.warn(`https://svelte.dev/e/await_waterfall`);
	}
}

/**
 * `%binding%` (%location%) is binding to a non-reactive property
 * @param {string} binding
 * @param {string | undefined | null} [location]
 */
function binding_property_non_reactive(binding, location) {
	if (esm_env__WEBPACK_IMPORTED_MODULE_0__.DEV) {
		console.warn(
			`%c[svelte] binding_property_non_reactive\n%c${location
				? `\`${binding}\` (${location}) is binding to a non-reactive property`
				: `\`${binding}\` is binding to a non-reactive property`}\nhttps://svelte.dev/e/binding_property_non_reactive`,
			bold,
			normal
		);
	} else {
		console.warn(`https://svelte.dev/e/binding_property_non_reactive`);
	}
}

/**
 * Your `console.%method%` contained `$state` proxies. Consider using `$inspect(...)` or `$state.snapshot(...)` instead
 * @param {string} method
 */
function console_log_state(method) {
	if (esm_env__WEBPACK_IMPORTED_MODULE_0__.DEV) {
		console.warn(`%c[svelte] console_log_state\n%cYour \`console.${method}\` contained \`$state\` proxies. Consider using \`$inspect(...)\` or \`$state.snapshot(...)\` instead\nhttps://svelte.dev/e/console_log_state`, bold, normal);
	} else {
		console.warn(`https://svelte.dev/e/console_log_state`);
	}
}

/**
 * Reading a derived belonging to a now-destroyed effect may result in stale values
 */
function derived_inert() {
	if (esm_env__WEBPACK_IMPORTED_MODULE_0__.DEV) {
		console.warn(`%c[svelte] derived_inert\n%cReading a derived belonging to a now-destroyed effect may result in stale values\nhttps://svelte.dev/e/derived_inert`, bold, normal);
	} else {
		console.warn(`https://svelte.dev/e/derived_inert`);
	}
}

/**
 * %handler% should be a function. Did you mean to %suggestion%?
 * @param {string} handler
 * @param {string} suggestion
 */
function event_handler_invalid(handler, suggestion) {
	if (esm_env__WEBPACK_IMPORTED_MODULE_0__.DEV) {
		console.warn(`%c[svelte] event_handler_invalid\n%c${handler} should be a function. Did you mean to ${suggestion}?\nhttps://svelte.dev/e/event_handler_invalid`, bold, normal);
	} else {
		console.warn(`https://svelte.dev/e/event_handler_invalid`);
	}
}

/**
 * Expected to find a hydratable with key `%key%` during hydration, but did not.
 * @param {string} key
 */
function hydratable_missing_but_expected(key) {
	if (esm_env__WEBPACK_IMPORTED_MODULE_0__.DEV) {
		console.warn(`%c[svelte] hydratable_missing_but_expected\n%cExpected to find a hydratable with key \`${key}\` during hydration, but did not.\nhttps://svelte.dev/e/hydratable_missing_but_expected`, bold, normal);
	} else {
		console.warn(`https://svelte.dev/e/hydratable_missing_but_expected`);
	}
}

/**
 * The `%attribute%` attribute on `%html%` changed its value between server and client renders. The client value, `%value%`, will be ignored in favour of the server value
 * @param {string} attribute
 * @param {string} html
 * @param {string} value
 */
function hydration_attribute_changed(attribute, html, value) {
	if (esm_env__WEBPACK_IMPORTED_MODULE_0__.DEV) {
		console.warn(`%c[svelte] hydration_attribute_changed\n%cThe \`${attribute}\` attribute on \`${html}\` changed its value between server and client renders. The client value, \`${value}\`, will be ignored in favour of the server value\nhttps://svelte.dev/e/hydration_attribute_changed`, bold, normal);
	} else {
		console.warn(`https://svelte.dev/e/hydration_attribute_changed`);
	}
}

/**
 * The value of an `{@html ...}` block %location% changed between server and client renders. The client value will be ignored in favour of the server value
 * @param {string | undefined | null} [location]
 */
function hydration_html_changed(location) {
	if (esm_env__WEBPACK_IMPORTED_MODULE_0__.DEV) {
		console.warn(
			`%c[svelte] hydration_html_changed\n%c${location
				? `The value of an \`{@html ...}\` block ${location} changed between server and client renders. The client value will be ignored in favour of the server value`
				: 'The value of an `{@html ...}` block changed between server and client renders. The client value will be ignored in favour of the server value'}\nhttps://svelte.dev/e/hydration_html_changed`,
			bold,
			normal
		);
	} else {
		console.warn(`https://svelte.dev/e/hydration_html_changed`);
	}
}

/**
 * Hydration failed because the initial UI does not match what was rendered on the server. The error occurred near %location%
 * @param {string | undefined | null} [location]
 */
function hydration_mismatch(location) {
	if (esm_env__WEBPACK_IMPORTED_MODULE_0__.DEV) {
		console.warn(
			`%c[svelte] hydration_mismatch\n%c${location
				? `Hydration failed because the initial UI does not match what was rendered on the server. The error occurred near ${location}`
				: 'Hydration failed because the initial UI does not match what was rendered on the server'}\nhttps://svelte.dev/e/hydration_mismatch`,
			bold,
			normal
		);
	} else {
		console.warn(`https://svelte.dev/e/hydration_mismatch`);
	}
}

/**
 * The `render` function passed to `createRawSnippet` should return HTML for a single element
 */
function invalid_raw_snippet_render() {
	if (esm_env__WEBPACK_IMPORTED_MODULE_0__.DEV) {
		console.warn(`%c[svelte] invalid_raw_snippet_render\n%cThe \`render\` function passed to \`createRawSnippet\` should return HTML for a single element\nhttps://svelte.dev/e/invalid_raw_snippet_render`, bold, normal);
	} else {
		console.warn(`https://svelte.dev/e/invalid_raw_snippet_render`);
	}
}

/**
 * Detected a migrated `$:` reactive block in `%filename%` that both accesses and updates the same reactive value. This may cause recursive updates when converted to an `$effect`.
 * @param {string} filename
 */
function legacy_recursive_reactive_block(filename) {
	if (esm_env__WEBPACK_IMPORTED_MODULE_0__.DEV) {
		console.warn(`%c[svelte] legacy_recursive_reactive_block\n%cDetected a migrated \`$:\` reactive block in \`${filename}\` that both accesses and updates the same reactive value. This may cause recursive updates when converted to an \`$effect\`.\nhttps://svelte.dev/e/legacy_recursive_reactive_block`, bold, normal);
	} else {
		console.warn(`https://svelte.dev/e/legacy_recursive_reactive_block`);
	}
}

/**
 * Tried to unmount a component that was not mounted
 */
function lifecycle_double_unmount() {
	if (esm_env__WEBPACK_IMPORTED_MODULE_0__.DEV) {
		console.warn(`%c[svelte] lifecycle_double_unmount\n%cTried to unmount a component that was not mounted\nhttps://svelte.dev/e/lifecycle_double_unmount`, bold, normal);
	} else {
		console.warn(`https://svelte.dev/e/lifecycle_double_unmount`);
	}
}

/**
 * %parent% passed property `%prop%` to %child% with `bind:`, but its parent component %owner% did not declare `%prop%` as a binding. Consider creating a binding between %owner% and %parent% (e.g. `bind:%prop%={...}` instead of `%prop%={...}`)
 * @param {string} parent
 * @param {string} prop
 * @param {string} child
 * @param {string} owner
 */
function ownership_invalid_binding(parent, prop, child, owner) {
	if (esm_env__WEBPACK_IMPORTED_MODULE_0__.DEV) {
		console.warn(`%c[svelte] ownership_invalid_binding\n%c${parent} passed property \`${prop}\` to ${child} with \`bind:\`, but its parent component ${owner} did not declare \`${prop}\` as a binding. Consider creating a binding between ${owner} and ${parent} (e.g. \`bind:${prop}={...}\` instead of \`${prop}={...}\`)\nhttps://svelte.dev/e/ownership_invalid_binding`, bold, normal);
	} else {
		console.warn(`https://svelte.dev/e/ownership_invalid_binding`);
	}
}

/**
 * Mutating unbound props (`%name%`, at %location%) is strongly discouraged. Consider using `bind:%prop%={...}` in %parent% (or using a callback) instead
 * @param {string} name
 * @param {string} location
 * @param {string} prop
 * @param {string} parent
 */
function ownership_invalid_mutation(name, location, prop, parent) {
	if (esm_env__WEBPACK_IMPORTED_MODULE_0__.DEV) {
		console.warn(`%c[svelte] ownership_invalid_mutation\n%cMutating unbound props (\`${name}\`, at ${location}) is strongly discouraged. Consider using \`bind:${prop}={...}\` in ${parent} (or using a callback) instead\nhttps://svelte.dev/e/ownership_invalid_mutation`, bold, normal);
	} else {
		console.warn(`https://svelte.dev/e/ownership_invalid_mutation`);
	}
}

/**
 * The `value` property of a `<select multiple>` element should be an array, but it received a non-array value. The selection will be kept as is.
 */
function select_multiple_invalid_value() {
	if (esm_env__WEBPACK_IMPORTED_MODULE_0__.DEV) {
		console.warn(`%c[svelte] select_multiple_invalid_value\n%cThe \`value\` property of a \`<select multiple>\` element should be an array, but it received a non-array value. The selection will be kept as is.\nhttps://svelte.dev/e/select_multiple_invalid_value`, bold, normal);
	} else {
		console.warn(`https://svelte.dev/e/select_multiple_invalid_value`);
	}
}

/**
 * Reactive `$state(...)` proxies and the values they proxy have different identities. Because of this, comparisons with `%operator%` will produce unexpected results
 * @param {string} operator
 */
function state_proxy_equality_mismatch(operator) {
	if (esm_env__WEBPACK_IMPORTED_MODULE_0__.DEV) {
		console.warn(`%c[svelte] state_proxy_equality_mismatch\n%cReactive \`$state(...)\` proxies and the values they proxy have different identities. Because of this, comparisons with \`${operator}\` will produce unexpected results\nhttps://svelte.dev/e/state_proxy_equality_mismatch`, bold, normal);
	} else {
		console.warn(`https://svelte.dev/e/state_proxy_equality_mismatch`);
	}
}

/**
 * A `<svelte:boundary>` `reset` function only resets the boundary the first time it is called
 */
function svelte_boundary_reset_noop() {
	if (esm_env__WEBPACK_IMPORTED_MODULE_0__.DEV) {
		console.warn(`%c[svelte] svelte_boundary_reset_noop\n%cA \`<svelte:boundary>\` \`reset\` function only resets the boundary the first time it is called\nhttps://svelte.dev/e/svelte_boundary_reset_noop`, bold, normal);
	} else {
		console.warn(`https://svelte.dev/e/svelte_boundary_reset_noop`);
	}
}

/**
 * The `slide` transition does not work correctly for elements with `display: %value%`
 * @param {string} value
 */
function transition_slide_display(value) {
	if (esm_env__WEBPACK_IMPORTED_MODULE_0__.DEV) {
		console.warn(`%c[svelte] transition_slide_display\n%cThe \`slide\` transition does not work correctly for elements with \`display: ${value}\`\nhttps://svelte.dev/e/transition_slide_display`, bold, normal);
	} else {
		console.warn(`https://svelte.dev/e/transition_slide_display`);
	}
}

/***/ },

/***/ "./node_modules/svelte/src/internal/disclose-version.js"
/*!**************************************************************!*\
  !*** ./node_modules/svelte/src/internal/disclose-version.js ***!
  \**************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../version.js */ "./node_modules/svelte/src/version.js");


if (typeof window !== 'undefined') {
	// @ts-expect-error
	((window.__svelte ??= {}).v ??= new Set()).add(_version_js__WEBPACK_IMPORTED_MODULE_0__.PUBLIC_VERSION);
}


/***/ },

/***/ "./node_modules/svelte/src/internal/flags/index.js"
/*!*********************************************************!*\
  !*** ./node_modules/svelte/src/internal/flags/index.js ***!
  \*********************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   async_mode_flag: () => (/* binding */ async_mode_flag),
/* harmony export */   disable_async_mode_flag: () => (/* binding */ disable_async_mode_flag),
/* harmony export */   enable_async_mode_flag: () => (/* binding */ enable_async_mode_flag),
/* harmony export */   enable_legacy_mode_flag: () => (/* binding */ enable_legacy_mode_flag),
/* harmony export */   enable_tracing_mode_flag: () => (/* binding */ enable_tracing_mode_flag),
/* harmony export */   legacy_mode_flag: () => (/* binding */ legacy_mode_flag),
/* harmony export */   tracing_mode_flag: () => (/* binding */ tracing_mode_flag)
/* harmony export */ });
/** True if experimental.async=true */
let async_mode_flag = false;
/** True if we're not certain that we only have Svelte 5 code in the compilation */
let legacy_mode_flag = false;
/** True if $inspect.trace is used */
let tracing_mode_flag = false;

function enable_async_mode_flag() {
	async_mode_flag = true;
}

/** ONLY USE THIS DURING TESTING */
function disable_async_mode_flag() {
	async_mode_flag = false;
}

function enable_legacy_mode_flag() {
	legacy_mode_flag = true;
}

function enable_tracing_mode_flag() {
	tracing_mode_flag = true;
}


/***/ },

/***/ "./node_modules/svelte/src/internal/shared/attributes.js"
/*!***************************************************************!*\
  !*** ./node_modules/svelte/src/internal/shared/attributes.js ***!
  \***************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   attr: () => (/* binding */ attr),
/* harmony export */   clsx: () => (/* binding */ clsx),
/* harmony export */   to_class: () => (/* binding */ to_class),
/* harmony export */   to_style: () => (/* binding */ to_style)
/* harmony export */ });
/* harmony import */ var _escaping_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../escaping.js */ "./node_modules/svelte/src/escaping.js");
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.mjs");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils.js */ "./node_modules/svelte/src/internal/shared/utils.js");




/**
 * `<div translate={false}>` should be rendered as `<div translate="no">` and _not_
 * `<div translate="false">`, which is equivalent to `<div translate="yes">`. There
 * may be other odd cases that need to be added to this list in future
 * @type {Record<string, Map<any, string>>}
 */
const replacements = {
	translate: new Map([
		[true, 'yes'],
		[false, 'no']
	])
};

/**
 * @template V
 * @param {string} name
 * @param {V} value
 * @param {boolean} [is_boolean]
 * @returns {string}
 */
function attr(name, value, is_boolean = false) {
	// attribute hidden for values other than "until-found" behaves like a boolean attribute
	if (name === 'hidden' && value !== 'until-found') {
		is_boolean = true;
	}
	// `''` is a present boolean attribute, as it is in markup and on the client
	if (value == null || (is_boolean && !value && value !== '')) return '';
	const normalized =
		(_utils_js__WEBPACK_IMPORTED_MODULE_2__.has_own_property.call(replacements, name) && replacements[name].get(value)) || value;
	const assignment = is_boolean ? `=""` : `="${(0,_escaping_js__WEBPACK_IMPORTED_MODULE_0__.escape_html)(normalized, true)}"`;
	return ` ${name}${assignment}`;
}

/**
 * Small wrapper around clsx to preserve Svelte's (weird) handling of falsy values.
 * TODO Svelte 6 revisit this, and likely turn all falsy values into the empty string (what clsx also does)
 * @param  {any} value
 */
function clsx(value) {
	if (typeof value === 'object') {
		return (0,clsx__WEBPACK_IMPORTED_MODULE_1__.clsx)(value);
	} else {
		return value ?? '';
	}
}

const whitespace = [...' \t\n\r\f\u00a0\u000b\ufeff'];

/**
 * @param {any} value
 * @param {string | null} [hash]
 * @param {Record<string, boolean>} [directives]
 * @returns {string | null}
 */
function to_class(value, hash, directives) {
	var classname = value == null ? '' : '' + value;

	if (hash) {
		classname = classname ? classname + ' ' + hash : hash;
	}

	if (directives) {
		for (var key of Object.keys(directives)) {
			if (directives[key]) {
				classname = classname ? classname + ' ' + key : key;
			} else if (classname.length) {
				var len = key.length;
				var a = 0;

				while ((a = classname.indexOf(key, a)) >= 0) {
					var b = a + len;

					if (
						(a === 0 || whitespace.includes(classname[a - 1])) &&
						(b === classname.length || whitespace.includes(classname[b]))
					) {
						classname = (a === 0 ? '' : classname.substring(0, a)) + classname.substring(b + 1);
					} else {
						a = b;
					}
				}
			}
		}
	}

	return classname === '' ? null : classname;
}

/**
 *
 * @param {Record<string,any>} styles
 * @param {boolean} important
 */
function append_styles(styles, important = false) {
	var separator = important ? ' !important;' : ';';
	var css = '';

	for (var key of Object.keys(styles)) {
		var value = styles[key];
		if (value != null && value !== '') {
			css += ' ' + key + ': ' + value + separator;
		}
	}

	return css;
}

/**
 * @param {string} name
 * @returns {string}
 */
function to_css_name(name) {
	if (name[0] !== '-' || name[1] !== '-') {
		return name.toLowerCase();
	}
	return name;
}

/**
 * @param {any} value
 * @param {Record<string, any> | [Record<string, any>, Record<string, any>]} [styles]
 * @returns {string | null}
 */
function to_style(value, styles) {
	if (styles) {
		var new_style = '';

		/** @type {Record<string,any> | undefined} */
		var normal_styles;

		/** @type {Record<string,any> | undefined} */
		var important_styles;

		if (Array.isArray(styles)) {
			normal_styles = styles[0];
			important_styles = styles[1];
		} else {
			normal_styles = styles;
		}

		if (value) {
			// strip comments; surrounding whitespace is handled by the trims below (which is much faster than doing it through regex)
			value = String(value)
				.replaceAll(/\/\*.*?\*\//g, '')
				.trim();

			/** @type {boolean | '"' | "'"} */
			var in_str = false;
			var in_apo = 0;
			var in_comment = false;

			var reserved_names = [];

			if (normal_styles) {
				reserved_names.push(...Object.keys(normal_styles).map(to_css_name));
			}
			if (important_styles) {
				reserved_names.push(...Object.keys(important_styles).map(to_css_name));
			}

			var start_index = 0;
			var name_index = -1;

			const len = value.length;
			for (var i = 0; i < len; i++) {
				var c = value[i];

				if (in_comment) {
					if (c === '/' && value[i - 1] === '*') {
						in_comment = false;
					}
				} else if (in_str) {
					if (in_str === c) {
						in_str = false;
					}
				} else if (c === '/' && value[i + 1] === '*') {
					in_comment = true;
				} else if (c === '"' || c === "'") {
					in_str = c;
				} else if (c === '(') {
					in_apo++;
				} else if (c === ')') {
					in_apo--;
				}

				if (!in_comment && in_str === false && in_apo === 0) {
					if (c === ':' && name_index === -1) {
						name_index = i;
					} else if (c === ';' || i === len - 1) {
						if (name_index !== -1) {
							var name = to_css_name(value.substring(start_index, name_index).trim());

							if (!reserved_names.includes(name)) {
								if (c !== ';') {
									i++;
								}

								var property = value.substring(start_index, i).trim();
								new_style += ' ' + property + ';';
							}
						}

						start_index = i + 1;
						name_index = -1;
					}
				}
			}
		}

		if (normal_styles) {
			new_style += append_styles(normal_styles);
		}

		if (important_styles) {
			new_style += append_styles(important_styles, true);
		}

		new_style = new_style.trim();
		return new_style === '' ? null : new_style;
	}

	return value == null ? null : String(value);
}


/***/ },

/***/ "./node_modules/svelte/src/internal/shared/clone.js"
/*!**********************************************************!*\
  !*** ./node_modules/svelte/src/internal/shared/clone.js ***!
  \**********************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   snapshot: () => (/* binding */ snapshot)
/* harmony export */ });
/* harmony import */ var esm_env__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! esm-env */ "./node_modules/esm-env/index.js");
/* harmony import */ var _warnings_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./warnings.js */ "./node_modules/svelte/src/internal/shared/warnings.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils.js */ "./node_modules/svelte/src/internal/shared/utils.js");
/** @import { Snapshot } from './types' */




/**
 * In dev, we keep track of which properties could not be cloned. In prod
 * we don't bother, but we keep a dummy array around so that the
 * signature stays the same
 * @type {string[]}
 */
const empty = [];

/**
 * @template T
 * @param {T} value
 * @param {boolean} [skip_warning]
 * @param {boolean} [no_tojson]
 * @returns {Snapshot<T>}
 */
function snapshot(value, skip_warning = false, no_tojson = false) {
	if (esm_env__WEBPACK_IMPORTED_MODULE_0__.DEV && !skip_warning) {
		/** @type {string[]} */
		const paths = [];

		const copy = clone(value, new Map(), '', paths, null, no_tojson);
		if (paths.length === 1 && paths[0] === '') {
			// value could not be cloned
			_warnings_js__WEBPACK_IMPORTED_MODULE_1__.state_snapshot_uncloneable();
		} else if (paths.length > 0) {
			// some properties could not be cloned
			const slice = paths.length > 10 ? paths.slice(0, 7) : paths.slice(0, 10);
			const excess = paths.length - slice.length;

			let uncloned = slice.map((path) => `- <value>${path}`).join('\n');
			if (excess > 0) uncloned += `\n- ...and ${excess} more`;

			_warnings_js__WEBPACK_IMPORTED_MODULE_1__.state_snapshot_uncloneable(uncloned);
		}

		return copy;
	}

	return clone(value, new Map(), '', empty, null, no_tojson);
}

/**
 * @template T
 * @param {T} value
 * @param {Map<T, Snapshot<T>>} cloned
 * @param {string} path
 * @param {string[]} paths
 * @param {null | T} [original] The original value, if `value` was produced from a `toJSON` call
 * @param {boolean} [no_tojson]
 * @returns {Snapshot<T>}
 */
function clone(value, cloned, path, paths, original = null, no_tojson = false) {
	if (typeof value === 'object' && value !== null) {
		var unwrapped = cloned.get(value);
		if (unwrapped !== undefined) return unwrapped;

		if (value instanceof Map) return /** @type {Snapshot<T>} */ (new Map(value));
		if (value instanceof Set) return /** @type {Snapshot<T>} */ (new Set(value));

		if ((0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.is_array)(value)) {
			var copy = /** @type {Snapshot<any>} */ (Array(value.length));
			cloned.set(value, copy);

			if (original !== null) {
				cloned.set(original, copy);
			}

			for (var i = 0; i < value.length; i += 1) {
				var element = value[i];
				if (i in value) {
					copy[i] = clone(element, cloned, esm_env__WEBPACK_IMPORTED_MODULE_0__.DEV ? `${path}[${i}]` : path, paths, null, no_tojson);
				}
			}

			return copy;
		}

		if ((0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.get_prototype_of)(value) === _utils_js__WEBPACK_IMPORTED_MODULE_2__.object_prototype) {
			/** @type {Snapshot<any>} */
			copy = {};
			cloned.set(value, copy);

			if (original !== null) {
				cloned.set(original, copy);
			}

			for (var key of Object.keys(value)) {
				copy[key] = clone(
					// @ts-expect-error
					value[key],
					cloned,
					esm_env__WEBPACK_IMPORTED_MODULE_0__.DEV ? `${path}.${key}` : path,
					paths,
					null,
					no_tojson
				);
			}

			return copy;
		}

		if (value instanceof Date) {
			// Ensure SvelteDate snapshots are tracked
			value.getTime();
			return /** @type {Snapshot<T>} */ (structuredClone(value));
		}

		if (typeof (/** @type {T & { toJSON?: any } } */ (value).toJSON) === 'function' && !no_tojson) {
			return clone(
				/** @type {T & { toJSON(): any } } */ (value).toJSON(),
				cloned,
				esm_env__WEBPACK_IMPORTED_MODULE_0__.DEV ? `${path}.toJSON()` : path,
				paths,
				// Associate the instance with the toJSON clone
				value
			);
		}
	}

	if (value instanceof EventTarget) {
		// can't be cloned
		return /** @type {Snapshot<T>} */ (value);
	}

	try {
		return /** @type {Snapshot<T>} */ (structuredClone(value));
	} catch (e) {
		if (esm_env__WEBPACK_IMPORTED_MODULE_0__.DEV) {
			paths.push(path);
		}

		return /** @type {Snapshot<T>} */ (value);
	}
}


/***/ },

/***/ "./node_modules/svelte/src/internal/shared/context.js"
/*!************************************************************!*\
  !*** ./node_modules/svelte/src/internal/shared/context.js ***!
  \************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   create_context: () => (/* binding */ create_context),
/* harmony export */   get_or_init_context_map: () => (/* binding */ get_or_init_context_map)
/* harmony export */ });
/* harmony import */ var _errors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./errors.js */ "./node_modules/svelte/src/internal/shared/errors.js");


/**
 * @template T
 * @param {(key: object) => T} get_context
 * @param {(key: object, context: T) => T} set_context
 * @param {(key: object) => boolean} has_context
 * @returns {[() => T, (context: T) => T, () => boolean]}
 */
function create_context(get_context, set_context, has_context) {
	const key = {};

	return [
		() => {
			if (!has_context(key)) {
				(0,_errors_js__WEBPACK_IMPORTED_MODULE_0__.missing_context)();
			}

			return get_context(key);
		},
		(context) => set_context(key, context),
		() => has_context(key)
	];
}

/**
 * @typedef {{ p: Context | null, c: Map<unknown, unknown> | null }} Context
 */

/**
 * @param {Context} context
 * @returns {Map<unknown, unknown> | null}
 */
function get_parent_context(context) {
	let parent = context.p;
	while (parent !== null && parent.c === null) {
		parent = parent.p;
	}
	return parent?.c ?? null;
}

/**
 * @param {Context | null} context
 * @param {string} name
 * @returns {Map<unknown, unknown>}
 */
function get_or_init_context_map(context, name) {
	if (context === null) {
		(0,_errors_js__WEBPACK_IMPORTED_MODULE_0__.lifecycle_outside_component)(name);
	}

	return (context.c ??= new Map(get_parent_context(context) || undefined));
}


/***/ },

/***/ "./node_modules/svelte/src/internal/shared/dev.js"
/*!********************************************************!*\
  !*** ./node_modules/svelte/src/internal/shared/dev.js ***!
  \********************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   get_error: () => (/* binding */ get_error),
/* harmony export */   get_stack: () => (/* binding */ get_stack),
/* harmony export */   invariant: () => (/* binding */ invariant)
/* harmony export */ });
/* harmony import */ var esm_env__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! esm-env */ "./node_modules/esm-env/index.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils.js */ "./node_modules/svelte/src/internal/shared/utils.js");
/* harmony import */ var _errors_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./errors.js */ "./node_modules/svelte/src/internal/shared/errors.js");




/**
 * @param {string} label
 * @returns {Error & { stack: string } | null}
 */
function get_error(label) {
	const error = new Error();
	const stack = get_stack();

	if (stack.length === 0) {
		return null;
	}

	stack.unshift('\n');

	(0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.define_property)(error, 'stack', {
		value: stack.join('\n')
	});

	(0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.define_property)(error, 'name', {
		value: label
	});

	return /** @type {Error & { stack: string }} */ (error);
}

/**
 * @returns {string[]}
 */
function get_stack() {
	// @ts-ignore - doesn't exist everywhere
	const limit = Error.stackTraceLimit;
	// @ts-ignore - doesn't exist everywhere
	Error.stackTraceLimit = Infinity;
	const stack = new Error().stack;
	// @ts-ignore - doesn't exist everywhere
	Error.stackTraceLimit = limit;

	if (!stack) return [];

	const lines = stack.split('\n');
	const new_lines = [];

	for (let i = 0; i < lines.length; i++) {
		const line = lines[i];
		const posixified = line.replaceAll('\\', '/');

		if (line.trim() === 'Error') {
			continue;
		}

		if (line.includes('validate_each_keys')) {
			return [];
		}

		if (posixified.includes('svelte/src/internal') || posixified.includes('node_modules/.vite')) {
			continue;
		}

		new_lines.push(line);
	}

	return new_lines;
}

/**
 * @param {boolean} condition
 * @param {string} message
 */
function invariant(condition, message) {
	if (!esm_env__WEBPACK_IMPORTED_MODULE_0__.DEV) {
		throw new Error('invariant(...) was not guarded by if (DEV)');
	}

	if (!condition) _errors_js__WEBPACK_IMPORTED_MODULE_2__.invariant_violation(message);
}


/***/ },

/***/ "./node_modules/svelte/src/internal/shared/errors.js"
/*!***********************************************************!*\
  !*** ./node_modules/svelte/src/internal/shared/errors.js ***!
  \***********************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   experimental_async_required: () => (/* binding */ experimental_async_required),
/* harmony export */   invalid_default_snippet: () => (/* binding */ invalid_default_snippet),
/* harmony export */   invalid_snippet_arguments: () => (/* binding */ invalid_snippet_arguments),
/* harmony export */   invariant_violation: () => (/* binding */ invariant_violation),
/* harmony export */   lifecycle_outside_component: () => (/* binding */ lifecycle_outside_component),
/* harmony export */   missing_context: () => (/* binding */ missing_context),
/* harmony export */   set_context_after_init: () => (/* binding */ set_context_after_init),
/* harmony export */   snippet_without_render_tag: () => (/* binding */ snippet_without_render_tag),
/* harmony export */   store_invalid_shape: () => (/* binding */ store_invalid_shape),
/* harmony export */   svelte_element_invalid_this_value: () => (/* binding */ svelte_element_invalid_this_value)
/* harmony export */ });
/* harmony import */ var esm_env__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! esm-env */ "./node_modules/esm-env/index.js");
/* This file is generated by scripts/process-messages/index.js. Do not edit! */



/**
 * Cannot use `%name%(...)` unless the `experimental.async` compiler option is `true`
 * @param {string} name
 * @returns {never}
 */
function experimental_async_required(name) {
	if (esm_env__WEBPACK_IMPORTED_MODULE_0__.DEV) {
		const error = new Error(`experimental_async_required\nCannot use \`${name}(...)\` unless the \`experimental.async\` compiler option is \`true\`\nhttps://svelte.dev/e/experimental_async_required`);

		error.name = 'Svelte error';

		throw error;
	} else {
		throw new Error(`https://svelte.dev/e/experimental_async_required`);
	}
}

/**
 * Cannot use `{@render children(...)}` if the parent component uses `let:` directives. Consider using a named snippet instead
 * @returns {never}
 */
function invalid_default_snippet() {
	if (esm_env__WEBPACK_IMPORTED_MODULE_0__.DEV) {
		const error = new Error(`invalid_default_snippet\nCannot use \`{@render children(...)}\` if the parent component uses \`let:\` directives. Consider using a named snippet instead\nhttps://svelte.dev/e/invalid_default_snippet`);

		error.name = 'Svelte error';

		throw error;
	} else {
		throw new Error(`https://svelte.dev/e/invalid_default_snippet`);
	}
}

/**
 * A snippet function was passed invalid arguments. Snippets should only be instantiated via `{@render ...}`
 * @returns {never}
 */
function invalid_snippet_arguments() {
	if (esm_env__WEBPACK_IMPORTED_MODULE_0__.DEV) {
		const error = new Error(`invalid_snippet_arguments\nA snippet function was passed invalid arguments. Snippets should only be instantiated via \`{@render ...}\`\nhttps://svelte.dev/e/invalid_snippet_arguments`);

		error.name = 'Svelte error';

		throw error;
	} else {
		throw new Error(`https://svelte.dev/e/invalid_snippet_arguments`);
	}
}

/**
 * An invariant violation occurred, meaning Svelte's internal assumptions were flawed. This is a bug in Svelte, not your app — please open an issue at https://github.com/sveltejs/svelte, citing the following message: "%message%"
 * @param {string} message
 * @returns {never}
 */
function invariant_violation(message) {
	if (esm_env__WEBPACK_IMPORTED_MODULE_0__.DEV) {
		const error = new Error(`invariant_violation\nAn invariant violation occurred, meaning Svelte's internal assumptions were flawed. This is a bug in Svelte, not your app — please open an issue at https://github.com/sveltejs/svelte, citing the following message: "${message}"\nhttps://svelte.dev/e/invariant_violation`);

		error.name = 'Svelte error';

		throw error;
	} else {
		throw new Error(`https://svelte.dev/e/invariant_violation`);
	}
}

/**
 * `%name%(...)` can only be used during component initialisation
 * @param {string} name
 * @returns {never}
 */
function lifecycle_outside_component(name) {
	if (esm_env__WEBPACK_IMPORTED_MODULE_0__.DEV) {
		const error = new Error(`lifecycle_outside_component\n\`${name}(...)\` can only be used during component initialisation\nhttps://svelte.dev/e/lifecycle_outside_component`);

		error.name = 'Svelte error';

		throw error;
	} else {
		throw new Error(`https://svelte.dev/e/lifecycle_outside_component`);
	}
}

/**
 * Context was not set in the current component or any of its ancestors
 * @returns {never}
 */
function missing_context() {
	if (esm_env__WEBPACK_IMPORTED_MODULE_0__.DEV) {
		const error = new Error(`missing_context\nContext was not set in the current component or any of its ancestors\nhttps://svelte.dev/e/missing_context`);

		error.name = 'Svelte error';

		throw error;
	} else {
		throw new Error(`https://svelte.dev/e/missing_context`);
	}
}

/**
 * `setContext` must be called when a component first initializes, not in a subsequent effect or after an `await` expression
 * @returns {never}
 */
function set_context_after_init() {
	if (esm_env__WEBPACK_IMPORTED_MODULE_0__.DEV) {
		const error = new Error(`set_context_after_init\n\`setContext\` must be called when a component first initializes, not in a subsequent effect or after an \`await\` expression\nhttps://svelte.dev/e/set_context_after_init`);

		error.name = 'Svelte error';

		throw error;
	} else {
		throw new Error(`https://svelte.dev/e/set_context_after_init`);
	}
}

/**
 * Attempted to render a snippet without a `{@render}` block. This would cause the snippet code to be stringified instead of its content being rendered to the DOM. To fix this, change `{snippet}` to `{@render snippet()}`.
 * @returns {never}
 */
function snippet_without_render_tag() {
	if (esm_env__WEBPACK_IMPORTED_MODULE_0__.DEV) {
		const error = new Error(`snippet_without_render_tag\nAttempted to render a snippet without a \`{@render}\` block. This would cause the snippet code to be stringified instead of its content being rendered to the DOM. To fix this, change \`{snippet}\` to \`{@render snippet()}\`.\nhttps://svelte.dev/e/snippet_without_render_tag`);

		error.name = 'Svelte error';

		throw error;
	} else {
		throw new Error(`https://svelte.dev/e/snippet_without_render_tag`);
	}
}

/**
 * `%name%` is not a store with a `subscribe` method
 * @param {string} name
 * @returns {never}
 */
function store_invalid_shape(name) {
	if (esm_env__WEBPACK_IMPORTED_MODULE_0__.DEV) {
		const error = new Error(`store_invalid_shape\n\`${name}\` is not a store with a \`subscribe\` method\nhttps://svelte.dev/e/store_invalid_shape`);

		error.name = 'Svelte error';

		throw error;
	} else {
		throw new Error(`https://svelte.dev/e/store_invalid_shape`);
	}
}

/**
 * The `this` prop on `<svelte:element>` must be a string, if defined
 * @returns {never}
 */
function svelte_element_invalid_this_value() {
	if (esm_env__WEBPACK_IMPORTED_MODULE_0__.DEV) {
		const error = new Error(`svelte_element_invalid_this_value\nThe \`this\` prop on \`<svelte:element>\` must be a string, if defined\nhttps://svelte.dev/e/svelte_element_invalid_this_value`);

		error.name = 'Svelte error';

		throw error;
	} else {
		throw new Error(`https://svelte.dev/e/svelte_element_invalid_this_value`);
	}
}

/***/ },

/***/ "./node_modules/svelte/src/internal/shared/utils.js"
/*!**********************************************************!*\
  !*** ./node_modules/svelte/src/internal/shared/utils.js ***!
  \**********************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   array_from: () => (/* binding */ array_from),
/* harmony export */   array_prototype: () => (/* binding */ array_prototype),
/* harmony export */   deferred: () => (/* binding */ deferred),
/* harmony export */   define_property: () => (/* binding */ define_property),
/* harmony export */   exclude_from_object: () => (/* binding */ exclude_from_object),
/* harmony export */   fallback: () => (/* binding */ fallback),
/* harmony export */   get_descriptor: () => (/* binding */ get_descriptor),
/* harmony export */   get_descriptors: () => (/* binding */ get_descriptors),
/* harmony export */   get_prototype_of: () => (/* binding */ get_prototype_of),
/* harmony export */   has_own_property: () => (/* binding */ has_own_property),
/* harmony export */   includes: () => (/* binding */ includes),
/* harmony export */   index_of: () => (/* binding */ index_of),
/* harmony export */   is_array: () => (/* binding */ is_array),
/* harmony export */   is_extensible: () => (/* binding */ is_extensible),
/* harmony export */   is_function: () => (/* binding */ is_function),
/* harmony export */   is_promise: () => (/* binding */ is_promise),
/* harmony export */   noop: () => (/* binding */ noop),
/* harmony export */   object_keys: () => (/* binding */ object_keys),
/* harmony export */   object_prototype: () => (/* binding */ object_prototype),
/* harmony export */   run: () => (/* binding */ run),
/* harmony export */   run_all: () => (/* binding */ run_all),
/* harmony export */   to_array: () => (/* binding */ to_array)
/* harmony export */ });
// Store the references to globals in case someone tries to monkey patch these, causing the below
// to de-opt (this occurs often when using popular extensions).
var is_array = Array.isArray;
var index_of = Array.prototype.indexOf;
var includes = Array.prototype.includes;
var array_from = Array.from;
var object_keys = Object.keys;
var define_property = Object.defineProperty;
var get_descriptor = Object.getOwnPropertyDescriptor;
var get_descriptors = Object.getOwnPropertyDescriptors;
var object_prototype = Object.prototype;
var array_prototype = Array.prototype;
var get_prototype_of = Object.getPrototypeOf;
var is_extensible = Object.isExtensible;
var has_own_property = Object.prototype.hasOwnProperty;

/**
 * @param {any} thing
 * @returns {thing is Function}
 */
function is_function(thing) {
	return typeof thing === 'function';
}

const noop = () => {};

// Adapted from https://github.com/then/is-promise/blob/master/index.js
// Distributed under MIT License https://github.com/then/is-promise/blob/master/LICENSE

/**
 * @template [T=any]
 * @param {any} value
 * @returns {value is PromiseLike<T>}
 */
function is_promise(value) {
	return typeof value?.then === 'function';
}

/** @param {Function} fn */
function run(fn) {
	return fn();
}

/** @param {Array<() => void>} arr */
function run_all(arr) {
	for (var i = 0; i < arr.length; i++) {
		arr[i]();
	}
}

/**
 * TODO replace with Promise.withResolvers once supported widely enough
 * @template [T=void]
 */
function deferred() {
	/** @type {(value: T) => void} */
	var resolve;

	/** @type {(reason: any) => void} */
	var reject;

	/** @type {Promise<T>} */
	var promise = new Promise((res, rej) => {
		resolve = res;
		reject = rej;
	});

	// @ts-expect-error
	return { promise, resolve, reject };
}

/**
 * @template V
 * @param {V} value
 * @param {V | (() => V)} fallback
 * @param {boolean} [lazy]
 * @returns {V}
 */
function fallback(value, fallback, lazy = false) {
	return value === undefined
		? lazy
			? /** @type {() => V} */ (fallback)()
			: /** @type {V} */ (fallback)
		: value;
}

/**
 * When encountering a situation like `let [a, b, c] = $derived(blah())`,
 * we need to stash an intermediate value that `a`, `b`, and `c` derive
 * from, in case it's an iterable
 * @template T
 * @param {ArrayLike<T> | Iterable<T>} value
 * @param {number} [n]
 * @returns {Array<T>}
 */
function to_array(value, n) {
	// return arrays unchanged
	if (Array.isArray(value)) {
		return value;
	}

	// if value is not iterable, or `n` is unspecified (indicates a rest
	// element, which means we're not concerned about unbounded iterables)
	// convert to an array with `Array.from`
	if (n === undefined || !(Symbol.iterator in value)) {
		return Array.from(value);
	}

	// otherwise, populate an array with `n` values

	/** @type {T[]} */
	const array = [];

	for (const element of value) {
		array.push(element);
		if (array.length === n) break;
	}

	return array;
}

/**
 * @param {Record<string | symbol, unknown>} obj
 * @param {Array<string | symbol>} keys
 * @returns {Record<string | symbol, unknown>}
 */
function exclude_from_object(obj, keys) {
	/** @type {Record<string | symbol, unknown>} */
	var result = {};

	for (var key in obj) {
		if (!keys.includes(key)) {
			result[key] = obj[key];
		}
	}

	for (var symbol of Object.getOwnPropertySymbols(obj)) {
		if (Object.propertyIsEnumerable.call(obj, symbol) && !keys.includes(symbol)) {
			result[symbol] = obj[symbol];
		}
	}

	return result;
}


/***/ },

/***/ "./node_modules/svelte/src/internal/shared/validate.js"
/*!*************************************************************!*\
  !*** ./node_modules/svelte/src/internal/shared/validate.js ***!
  \*************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   invalid_default_snippet: () => (/* reexport safe */ _errors_js__WEBPACK_IMPORTED_MODULE_2__.invalid_default_snippet),
/* harmony export */   prevent_snippet_stringification: () => (/* binding */ prevent_snippet_stringification),
/* harmony export */   validate_dynamic_element_tag: () => (/* binding */ validate_dynamic_element_tag),
/* harmony export */   validate_store: () => (/* binding */ validate_store),
/* harmony export */   validate_void_dynamic_element: () => (/* binding */ validate_void_dynamic_element)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils.js */ "./node_modules/svelte/src/utils.js");
/* harmony import */ var _warnings_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./warnings.js */ "./node_modules/svelte/src/internal/shared/warnings.js");
/* harmony import */ var _errors_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./errors.js */ "./node_modules/svelte/src/internal/shared/errors.js");






/**
 * @param {() => string} tag_fn
 * @returns {void}
 */
function validate_void_dynamic_element(tag_fn) {
	const tag = tag_fn();
	if (tag && (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.is_void)(tag)) {
		_warnings_js__WEBPACK_IMPORTED_MODULE_1__.dynamic_void_element_content(tag);
	}
}

/** @param {() => unknown} tag_fn */
function validate_dynamic_element_tag(tag_fn) {
	const tag = tag_fn();
	const is_string = typeof tag === 'string';
	if (tag && !is_string) {
		_errors_js__WEBPACK_IMPORTED_MODULE_2__.svelte_element_invalid_this_value();
	}
}

/**
 * @param {any} store
 * @param {string} name
 */
function validate_store(store, name) {
	if (store != null && typeof store.subscribe !== 'function') {
		_errors_js__WEBPACK_IMPORTED_MODULE_2__.store_invalid_shape(name);
	}
}

/**
 * @template {(...args: any[]) => unknown} T
 * @param {T} fn
 */
function prevent_snippet_stringification(fn) {
	fn.toString = () => {
		_errors_js__WEBPACK_IMPORTED_MODULE_2__.snippet_without_render_tag();
		return '';
	};
	return fn;
}


/***/ },

/***/ "./node_modules/svelte/src/internal/shared/warnings.js"
/*!*************************************************************!*\
  !*** ./node_modules/svelte/src/internal/shared/warnings.js ***!
  \*************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   dynamic_void_element_content: () => (/* binding */ dynamic_void_element_content),
/* harmony export */   state_snapshot_uncloneable: () => (/* binding */ state_snapshot_uncloneable)
/* harmony export */ });
/* harmony import */ var esm_env__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! esm-env */ "./node_modules/esm-env/index.js");
/* This file is generated by scripts/process-messages/index.js. Do not edit! */



var bold = 'font-weight: bold';
var normal = 'font-weight: normal';

/**
 * `<svelte:element this="%tag%">` is a void element — it cannot have content
 * @param {string} tag
 */
function dynamic_void_element_content(tag) {
	if (esm_env__WEBPACK_IMPORTED_MODULE_0__.DEV) {
		console.warn(`%c[svelte] dynamic_void_element_content\n%c\`<svelte:element this="${tag}">\` is a void element — it cannot have content\nhttps://svelte.dev/e/dynamic_void_element_content`, bold, normal);
	} else {
		console.warn(`https://svelte.dev/e/dynamic_void_element_content`);
	}
}

/**
 * The following properties cannot be cloned with `$state.snapshot` — the return value contains the originals:
 * 
 * %properties%
 * @param {string | undefined | null} [properties]
 */
function state_snapshot_uncloneable(properties) {
	if (esm_env__WEBPACK_IMPORTED_MODULE_0__.DEV) {
		console.warn(
			`%c[svelte] state_snapshot_uncloneable\n%c${properties
				? `The following properties cannot be cloned with \`$state.snapshot\` — the return value contains the originals:

${properties}`
				: 'Value cannot be cloned with `$state.snapshot` — the original value was returned'}\nhttps://svelte.dev/e/state_snapshot_uncloneable`,
			bold,
			normal
		);
	} else {
		console.warn(`https://svelte.dev/e/state_snapshot_uncloneable`);
	}
}

/***/ },

/***/ "./node_modules/svelte/src/legacy/legacy-client.js"
/*!*********************************************************!*\
  !*** ./node_modules/svelte/src/legacy/legacy-client.js ***!
  \*********************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   asClassComponent: () => (/* binding */ asClassComponent),
/* harmony export */   createBubbler: () => (/* binding */ createBubbler),
/* harmony export */   createClassComponent: () => (/* binding */ createClassComponent),
/* harmony export */   handlers: () => (/* binding */ handlers),
/* harmony export */   nonpassive: () => (/* reexport safe */ _internal_client_dom_legacy_event_modifiers_js__WEBPACK_IMPORTED_MODULE_14__.nonpassive),
/* harmony export */   once: () => (/* reexport safe */ _internal_client_dom_legacy_event_modifiers_js__WEBPACK_IMPORTED_MODULE_14__.once),
/* harmony export */   passive: () => (/* reexport safe */ _internal_client_dom_legacy_event_modifiers_js__WEBPACK_IMPORTED_MODULE_14__.passive),
/* harmony export */   preventDefault: () => (/* reexport safe */ _internal_client_dom_legacy_event_modifiers_js__WEBPACK_IMPORTED_MODULE_14__.preventDefault),
/* harmony export */   run: () => (/* binding */ run),
/* harmony export */   self: () => (/* reexport safe */ _internal_client_dom_legacy_event_modifiers_js__WEBPACK_IMPORTED_MODULE_14__.self),
/* harmony export */   stopImmediatePropagation: () => (/* reexport safe */ _internal_client_dom_legacy_event_modifiers_js__WEBPACK_IMPORTED_MODULE_14__.stopImmediatePropagation),
/* harmony export */   stopPropagation: () => (/* reexport safe */ _internal_client_dom_legacy_event_modifiers_js__WEBPACK_IMPORTED_MODULE_14__.stopPropagation),
/* harmony export */   trusted: () => (/* reexport safe */ _internal_client_dom_legacy_event_modifiers_js__WEBPACK_IMPORTED_MODULE_14__.trusted)
/* harmony export */ });
/* harmony import */ var _internal_client_constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../internal/client/constants.js */ "./node_modules/svelte/src/internal/client/constants.js");
/* harmony import */ var _internal_client_reactivity_effects_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../internal/client/reactivity/effects.js */ "./node_modules/svelte/src/internal/client/reactivity/effects.js");
/* harmony import */ var _internal_client_reactivity_sources_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../internal/client/reactivity/sources.js */ "./node_modules/svelte/src/internal/client/reactivity/sources.js");
/* harmony import */ var _internal_client_render_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../internal/client/render.js */ "./node_modules/svelte/src/internal/client/render.js");
/* harmony import */ var _internal_client_runtime_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../internal/client/runtime.js */ "./node_modules/svelte/src/internal/client/runtime.js");
/* harmony import */ var _internal_client_reactivity_batch_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../internal/client/reactivity/batch.js */ "./node_modules/svelte/src/internal/client/reactivity/batch.js");
/* harmony import */ var _internal_shared_utils_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../internal/shared/utils.js */ "./node_modules/svelte/src/internal/shared/utils.js");
/* harmony import */ var _internal_client_errors_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../internal/client/errors.js */ "./node_modules/svelte/src/internal/client/errors.js");
/* harmony import */ var _internal_client_warnings_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../internal/client/warnings.js */ "./node_modules/svelte/src/internal/client/warnings.js");
/* harmony import */ var esm_env__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! esm-env */ "./node_modules/esm-env/index.js");
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../constants.js */ "./node_modules/svelte/src/constants.js");
/* harmony import */ var _internal_client_context_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../internal/client/context.js */ "./node_modules/svelte/src/internal/client/context.js");
/* harmony import */ var _internal_flags_index_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../internal/flags/index.js */ "./node_modules/svelte/src/internal/flags/index.js");
/* harmony import */ var _internal_client_reactivity_status_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../internal/client/reactivity/status.js */ "./node_modules/svelte/src/internal/client/reactivity/status.js");
/* harmony import */ var _internal_client_dom_legacy_event_modifiers_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../internal/client/dom/legacy/event-modifiers.js */ "./node_modules/svelte/src/internal/client/dom/legacy/event-modifiers.js");
/** @import { ComponentConstructorOptions, ComponentType, SvelteComponent, Component } from 'svelte' */















/**
 * Takes the same options as a Svelte 4 component and the component function and returns a Svelte 4 compatible component.
 *
 * @deprecated Use this only as a temporary solution to migrate your imperative component code to Svelte 5.
 *
 * @template {Record<string, any>} Props
 * @template {Record<string, any>} Exports
 * @template {Record<string, any>} Events
 * @template {Record<string, any>} Slots
 *
 * @param {ComponentConstructorOptions<Props> & {
 * 	component: ComponentType<SvelteComponent<Props, Events, Slots>> | Component<Props>;
 * }} options
 * @returns {SvelteComponent<Props, Events, Slots> & Exports}
 */
function createClassComponent(options) {
	// @ts-expect-error $$prop_def etc are not actually defined
	return new Svelte4Component(options);
}

/**
 * Takes the component function and returns a Svelte 4 compatible component constructor.
 *
 * @deprecated Use this only as a temporary solution to migrate your imperative component code to Svelte 5.
 *
 * @template {Record<string, any>} Props
 * @template {Record<string, any>} Exports
 * @template {Record<string, any>} Events
 * @template {Record<string, any>} Slots
 *
 * @param {SvelteComponent<Props, Events, Slots> | Component<Props>} component
 * @returns {ComponentType<SvelteComponent<Props, Events, Slots> & Exports>}
 */
function asClassComponent(component) {
	// @ts-expect-error $$prop_def etc are not actually defined
	return class extends Svelte4Component {
		/** @param {any} options */
		constructor(options) {
			super({
				component,
				...options
			});
		}
	};
}

/**
 * Support using the component as both a class and function during the transition period
 * @typedef  {{new (o: ComponentConstructorOptions): SvelteComponent;(...args: Parameters<Component<Record<string, any>>>): ReturnType<Component<Record<string, any>, Record<string, any>>>;}} LegacyComponentType
 */

class Svelte4Component {
	/** @type {any} */
	#events;

	/** @type {Record<string, any>} */
	#instance;

	/**
	 * @param {ComponentConstructorOptions & {
	 *  component: any;
	 * }} options
	 */
	constructor(options) {
		var sources = new Map();

		/**
		 * @param {string | symbol} key
		 * @param {unknown} value
		 */
		var add_source = (key, value) => {
			var s = (0,_internal_client_reactivity_sources_js__WEBPACK_IMPORTED_MODULE_2__.mutable_source)(value, false, false);
			sources.set(key, s);
			return s;
		};

		// Replicate coarse-grained props through a proxy that has a version source for
		// each property, which is incremented on updates to the property itself. Do not
		// use our $state proxy because that one has fine-grained reactivity.
		const props = new Proxy(
			{ ...(options.props || {}), $$events: {} },
			{
				get(target, prop) {
					return (0,_internal_client_runtime_js__WEBPACK_IMPORTED_MODULE_4__.get)(sources.get(prop) ?? add_source(prop, Reflect.get(target, prop)));
				},
				has(target, prop) {
					// Necessary to not throw "invalid binding" validation errors on the component side
					if (prop === _internal_client_constants_js__WEBPACK_IMPORTED_MODULE_0__.LEGACY_PROPS) return true;

					(0,_internal_client_runtime_js__WEBPACK_IMPORTED_MODULE_4__.get)(sources.get(prop) ?? add_source(prop, Reflect.get(target, prop)));
					return Reflect.has(target, prop);
				},
				set(target, prop, value) {
					(0,_internal_client_reactivity_sources_js__WEBPACK_IMPORTED_MODULE_2__.set)(sources.get(prop) ?? add_source(prop, value), value);
					return Reflect.set(target, prop, value);
				}
			}
		);

		this.#instance = (options.hydrate ? _internal_client_render_js__WEBPACK_IMPORTED_MODULE_3__.hydrate : _internal_client_render_js__WEBPACK_IMPORTED_MODULE_3__.mount)(options.component, {
			target: options.target,
			anchor: options.anchor,
			props,
			context: options.context,
			intro: options.intro ?? false,
			recover: options.recover,
			transformError: options.transformError
		});

		// We don't flushSync for custom element wrappers or if the user doesn't want it,
		// or if we're in async mode since `flushSync()` will fail
		if (!_internal_flags_index_js__WEBPACK_IMPORTED_MODULE_12__.async_mode_flag && (!options?.props?.$$host || options.sync === false)) {
			(0,_internal_client_reactivity_batch_js__WEBPACK_IMPORTED_MODULE_5__.flushSync)();
		}

		this.#events = props.$$events;

		for (const key of Object.keys(this.#instance)) {
			if (key === '$set' || key === '$destroy' || key === '$on') continue;
			(0,_internal_shared_utils_js__WEBPACK_IMPORTED_MODULE_6__.define_property)(this, key, {
				get() {
					return this.#instance[key];
				},
				/** @param {any} value */
				set(value) {
					this.#instance[key] = value;
				},
				enumerable: true
			});
		}

		this.#instance.$set = /** @param {Record<string, any>} next */ (next) => {
			Object.assign(props, next);
		};

		this.#instance.$destroy = () => {
			(0,_internal_client_render_js__WEBPACK_IMPORTED_MODULE_3__.unmount)(this.#instance);
		};
	}

	/** @param {Record<string, any>} props */
	$set(props) {
		this.#instance.$set(props);
	}

	/**
	 * @param {string} event
	 * @param {(...args: any[]) => any} callback
	 * @returns {any}
	 */
	$on(event, callback) {
		this.#events[event] = this.#events[event] || [];

		/** @param {any[]} args */
		const cb = (...args) => callback.call(this, ...args);
		this.#events[event].push(cb);
		return () => {
			this.#events[event] = this.#events[event].filter(/** @param {any} fn */ (fn) => fn !== cb);
		};
	}

	$destroy() {
		this.#instance.$destroy();
	}
}

/**
 * Runs the given function once immediately on the server, and works like `$effect.pre` on the client.
 *
 * @deprecated Use this only as a temporary solution to migrate your component code to Svelte 5.
 * @param {() => void | (() => void)} fn
 * @returns {void}
 */
function run(fn) {
	;(0,_internal_client_reactivity_effects_js__WEBPACK_IMPORTED_MODULE_1__.user_pre_effect)(() => {
		fn();
		var effect = /** @type {import('#client').Effect} */ (_internal_client_runtime_js__WEBPACK_IMPORTED_MODULE_4__.active_effect);
		// If the effect is immediately made dirty again, mark it as maybe dirty to emulate legacy behaviour
		if ((effect.f & _internal_client_constants_js__WEBPACK_IMPORTED_MODULE_0__.DIRTY) !== 0) {
			let filename = "a file (we can't know which one)";
			if (esm_env__WEBPACK_IMPORTED_MODULE_9__.DEV) {
				// @ts-ignore
				filename = _internal_client_context_js__WEBPACK_IMPORTED_MODULE_11__.dev_current_component_function?.[_constants_js__WEBPACK_IMPORTED_MODULE_10__.FILENAME] ?? filename;
			}
			_internal_client_warnings_js__WEBPACK_IMPORTED_MODULE_8__.legacy_recursive_reactive_block(filename);
			(0,_internal_client_reactivity_status_js__WEBPACK_IMPORTED_MODULE_13__.set_signal_status)(effect, _internal_client_constants_js__WEBPACK_IMPORTED_MODULE_0__.MAYBE_DIRTY);
		}
	});
}

/**
 * Function to mimic the multiple listeners available in svelte 4
 * @deprecated
 * @param {EventListener[]} handlers
 * @returns {EventListener}
 */
function handlers(...handlers) {
	return function (event) {
		const { stopImmediatePropagation } = event;
		let stopped = false;

		event.stopImmediatePropagation = () => {
			stopped = true;
			stopImmediatePropagation.call(event);
		};

		const errors = [];

		for (const handler of handlers) {
			try {
				// @ts-expect-error `this` is not typed
				handler?.call(this, event);
			} catch (e) {
				errors.push(e);
			}

			if (stopped) {
				break;
			}
		}

		for (let error of errors) {
			queueMicrotask(() => {
				throw error;
			});
		}
	};
}

/**
 * Function to create a `bubble` function that mimic the behavior of `on:click` without handler available in svelte 4.
 * @deprecated Use this only as a temporary solution to migrate your automatically delegated events in Svelte 5.
 */
function createBubbler() {
	const active_component_context = _internal_client_context_js__WEBPACK_IMPORTED_MODULE_11__.component_context;
	if (active_component_context === null) {
		_internal_client_errors_js__WEBPACK_IMPORTED_MODULE_7__.lifecycle_outside_component('createBubbler');
	}

	return (/**@type {string}*/ type) => (/**@type {Event}*/ event) => {
		const events = /** @type {Record<string, Function | Function[]>} */ (
			active_component_context.s.$$events
		)?.[/** @type {any} */ (type)];

		if (events) {
			const callbacks = (0,_internal_shared_utils_js__WEBPACK_IMPORTED_MODULE_6__.is_array)(events) ? events.slice() : [events];
			for (const fn of callbacks) {
				fn.call(active_component_context.x, event);
			}
			return !event.defaultPrevented;
		}
		return true;
	};
}




/***/ },

/***/ "./node_modules/svelte/src/reactivity/create-subscriber.js"
/*!*****************************************************************!*\
  !*** ./node_modules/svelte/src/reactivity/create-subscriber.js ***!
  \*****************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createSubscriber: () => (/* binding */ createSubscriber)
/* harmony export */ });
/* harmony import */ var _internal_client_runtime_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../internal/client/runtime.js */ "./node_modules/svelte/src/internal/client/runtime.js");
/* harmony import */ var _internal_client_reactivity_effects_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../internal/client/reactivity/effects.js */ "./node_modules/svelte/src/internal/client/reactivity/effects.js");
/* harmony import */ var _internal_client_reactivity_sources_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../internal/client/reactivity/sources.js */ "./node_modules/svelte/src/internal/client/reactivity/sources.js");
/* harmony import */ var _internal_client_dev_tracing_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../internal/client/dev/tracing.js */ "./node_modules/svelte/src/internal/client/dev/tracing.js");
/* harmony import */ var esm_env__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! esm-env */ "./node_modules/esm-env/index.js");
/* harmony import */ var _internal_client_dom_task_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../internal/client/dom/task.js */ "./node_modules/svelte/src/internal/client/dom/task.js");







/**
 * Returns a `subscribe` function that integrates external event-based systems with Svelte's reactivity.
 * It's particularly useful for integrating with web APIs like `MediaQuery`, `IntersectionObserver`, or `WebSocket`.
 *
 * If `subscribe` is called inside an effect (including indirectly, for example inside a getter),
 * the `start` callback will be called with an `update` function. Whenever `update` is called, the effect re-runs.
 *
 * If `start` returns a cleanup function, it will be called when the effect is destroyed.
 *
 * If `subscribe` is called in multiple effects, `start` will only be called once as long as the effects
 * are active, and the returned teardown function will only be called when all effects are destroyed.
 *
 * It's best understood with an example. Here's an implementation of [`MediaQuery`](https://svelte.dev/docs/svelte/svelte-reactivity#MediaQuery):
 *
 * ```js
 * import { createSubscriber } from 'svelte/reactivity';
 * import { on } from 'svelte/events';
 *
 * export class MediaQuery {
 * 	#query;
 * 	#subscribe;
 *
 * 	constructor(query) {
 * 		this.#query = window.matchMedia(`(${query})`);
 *
 * 		this.#subscribe = createSubscriber((update) => {
 * 			// when the `change` event occurs, re-run any effects that read `this.current`
 * 			const off = on(this.#query, 'change', update);
 *
 * 			// stop listening when all the effects are destroyed
 * 			return () => off();
 * 		});
 * 	}
 *
 * 	get current() {
 * 		// This makes the getter reactive, if read in an effect
 * 		this.#subscribe();
 *
 * 		// Return the current state of the query, whether or not we're in an effect
 * 		return this.#query.matches;
 * 	}
 * }
 * ```
 * @param {(update: () => void) => (() => void) | void} start
 * @since 5.7.0
 */
function createSubscriber(start) {
	let subscribers = 0;
	let version = (0,_internal_client_reactivity_sources_js__WEBPACK_IMPORTED_MODULE_2__.source)(0);
	/** @type {(() => void) | void} */
	let stop;

	if (esm_env__WEBPACK_IMPORTED_MODULE_4__.DEV) {
		(0,_internal_client_dev_tracing_js__WEBPACK_IMPORTED_MODULE_3__.tag)(version, 'createSubscriber version');
	}

	return () => {
		if ((0,_internal_client_reactivity_effects_js__WEBPACK_IMPORTED_MODULE_1__.effect_tracking)()) {
			(0,_internal_client_runtime_js__WEBPACK_IMPORTED_MODULE_0__.get)(version);

			(0,_internal_client_reactivity_effects_js__WEBPACK_IMPORTED_MODULE_1__.render_effect)(() => {
				if (subscribers === 0) {
					stop = (0,_internal_client_runtime_js__WEBPACK_IMPORTED_MODULE_0__.untrack)(() => start(() => (0,_internal_client_reactivity_sources_js__WEBPACK_IMPORTED_MODULE_2__.increment)(version)));
				}

				subscribers += 1;

				return () => {
					(0,_internal_client_dom_task_js__WEBPACK_IMPORTED_MODULE_5__.queue_micro_task)(() => {
						// Only count down after a microtask, else we would reach 0 before our own render effect reruns,
						// but reach 1 again when the tick callback of the prior teardown runs. That would mean we
						// re-subcribe unnecessarily and create a memory leak because the old subscription is never cleaned up.
						subscribers -= 1;

						if (subscribers === 0) {
							stop?.();
							stop = undefined;
							// Increment the version to ensure any dependent deriveds are marked dirty when the subscription is picked up again later.
							// If we didn't do this then the comparison of write versions would determine that the derived has a later version than
							// the subscriber, and it would not be re-run.
							(0,_internal_client_reactivity_sources_js__WEBPACK_IMPORTED_MODULE_2__.increment)(version);
						}
					});
				};
			});
		}
	};
}


/***/ },

/***/ "./node_modules/svelte/src/store/shared/index.js"
/*!*******************************************************!*\
  !*** ./node_modules/svelte/src/store/shared/index.js ***!
  \*******************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   derived: () => (/* binding */ derived),
/* harmony export */   get: () => (/* binding */ get),
/* harmony export */   readable: () => (/* binding */ readable),
/* harmony export */   readonly: () => (/* binding */ readonly),
/* harmony export */   writable: () => (/* binding */ writable)
/* harmony export */ });
/* harmony import */ var _internal_shared_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../internal/shared/utils.js */ "./node_modules/svelte/src/internal/shared/utils.js");
/* harmony import */ var _internal_client_reactivity_equality_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../internal/client/reactivity/equality.js */ "./node_modules/svelte/src/internal/client/reactivity/equality.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils.js */ "./node_modules/svelte/src/store/utils.js");
/** @import { Readable, StartStopNotifier, Subscriber, Unsubscriber, Updater, Writable } from '../public.js' */
/** @import { Stores, StoresValues, SubscribeInvalidateTuple } from '../private.js' */




/**
 * @type {Array<SubscribeInvalidateTuple<any> | any>}
 */
const subscriber_queue = [];

/**
 * Creates a `Readable` store that allows reading by subscription.
 *
 * @template T
 * @param {T} [value] initial value
 * @param {StartStopNotifier<T>} [start]
 * @returns {Readable<T>}
 */
function readable(value, start) {
	return {
		subscribe: writable(value, start).subscribe
	};
}

/**
 * Create a `Writable` store that allows both updating and reading by subscription.
 *
 * @template T
 * @param {T} [value] initial value
 * @param {StartStopNotifier<T>} [start]
 * @returns {Writable<T>}
 */
function writable(value, start = _internal_shared_utils_js__WEBPACK_IMPORTED_MODULE_0__.noop) {
	/** @type {Unsubscriber | null} */
	let stop = null;

	/** @type {Set<SubscribeInvalidateTuple<T>>} */
	const subscribers = new Set();

	/**
	 * @param {T} new_value
	 * @returns {void}
	 */
	function set(new_value) {
		if ((0,_internal_client_reactivity_equality_js__WEBPACK_IMPORTED_MODULE_1__.safe_not_equal)(value, new_value)) {
			value = new_value;
			if (stop) {
				// store is ready
				const run_queue = !subscriber_queue.length;
				for (const subscriber of subscribers) {
					subscriber[1]();
					subscriber_queue.push(subscriber, value);
				}
				if (run_queue) {
					for (let i = 0; i < subscriber_queue.length; i += 2) {
						subscriber_queue[i][0](subscriber_queue[i + 1]);
					}
					subscriber_queue.length = 0;
				}
			}
		}
	}

	/**
	 * @param {Updater<T>} fn
	 * @returns {void}
	 */
	function update(fn) {
		set(fn(/** @type {T} */ (value)));
	}

	/**
	 * @param {Subscriber<T>} run
	 * @param {() => void} [invalidate]
	 * @returns {Unsubscriber}
	 */
	function subscribe(run, invalidate = _internal_shared_utils_js__WEBPACK_IMPORTED_MODULE_0__.noop) {
		/** @type {SubscribeInvalidateTuple<T>} */
		const subscriber = [run, invalidate];
		subscribers.add(subscriber);
		if (subscribers.size === 1) {
			stop = start(set, update) || _internal_shared_utils_js__WEBPACK_IMPORTED_MODULE_0__.noop;
		}
		run(/** @type {T} */ (value));
		return () => {
			subscribers.delete(subscriber);
			if (subscribers.size === 0 && stop) {
				stop();
				stop = null;
			}
		};
	}
	return { set, update, subscribe };
}

/**
 * Derived value store by synchronizing one or more readable stores and
 * applying an aggregation function over its input values.
 *
 * @template {Stores} S
 * @template T
 * @overload
 * @param {S} stores
 * @param {(values: StoresValues<S>, set: (value: T) => void, update: (fn: Updater<T>) => void) => Unsubscriber | void} fn
 * @param {T} [initial_value]
 * @returns {Readable<T>}
 */
/**
 * Derived value store by synchronizing one or more readable stores and
 * applying an aggregation function over its input values.
 *
 * @template {Stores} S
 * @template T
 * @overload
 * @param {S} stores
 * @param {(values: StoresValues<S>) => T} fn
 * @param {T} [initial_value]
 * @returns {Readable<T>}
 */
/**
 * @template {Stores} S
 * @template T
 * @param {S} stores
 * @param {Function} fn
 * @param {T} [initial_value]
 * @returns {Readable<T>}
 */
function derived(stores, fn, initial_value) {
	const single = !Array.isArray(stores);
	/** @type {Array<Readable<any>>} */
	const stores_array = single ? [stores] : stores;
	if (!stores_array.every(Boolean)) {
		throw new Error('derived() expects stores as input, got a falsy value');
	}
	const auto = fn.length < 2;
	return readable(initial_value, (set, update) => {
		let started = false;
		/** @type {T[]} */
		const values = [];
		let pending = 0;
		let cleanup = _internal_shared_utils_js__WEBPACK_IMPORTED_MODULE_0__.noop;
		const sync = () => {
			if (pending) {
				return;
			}
			cleanup();
			const result = fn(single ? values[0] : values, set, update);
			if (auto) {
				set(result);
			} else {
				cleanup = typeof result === 'function' ? result : _internal_shared_utils_js__WEBPACK_IMPORTED_MODULE_0__.noop;
			}
		};
		const unsubscribers = stores_array.map((store, i) =>
			(0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.subscribe_to_store)(
				store,
				(value) => {
					values[i] = value;
					pending &= ~(1 << i);
					if (started) {
						sync();
					}
				},
				() => {
					pending |= 1 << i;
				}
			)
		);
		started = true;
		sync();
		return function stop() {
			(0,_internal_shared_utils_js__WEBPACK_IMPORTED_MODULE_0__.run_all)(unsubscribers);
			cleanup();
			// We need to set this to false because callbacks can still happen despite having unsubscribed:
			// Callbacks might already be placed in the queue which doesn't know it should no longer
			// invoke this derived store.
			started = false;
		};
	});
}

/**
 * Takes a store and returns a new one derived from the old one that is readable.
 *
 * @template T
 * @param {Readable<T>} store  - store to make readonly
 * @returns {Readable<T>}
 */
function readonly(store) {
	return {
		// @ts-expect-error TODO i suspect the bind is unnecessary
		subscribe: store.subscribe.bind(store)
	};
}

/**
 * Get the current value from a store by subscribing and immediately unsubscribing.
 *
 * @template T
 * @param {Readable<T>} store
 * @returns {T}
 */
function get(store) {
	let value;
	(0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.subscribe_to_store)(store, (_) => (value = _))();
	// @ts-expect-error
	return value;
}


/***/ },

/***/ "./node_modules/svelte/src/store/utils.js"
/*!************************************************!*\
  !*** ./node_modules/svelte/src/store/utils.js ***!
  \************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   subscribe_to_store: () => (/* binding */ subscribe_to_store)
/* harmony export */ });
/* harmony import */ var _internal_client_runtime_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../internal/client/runtime.js */ "./node_modules/svelte/src/internal/client/runtime.js");
/* harmony import */ var _internal_shared_utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../internal/shared/utils.js */ "./node_modules/svelte/src/internal/shared/utils.js");
/** @import { Readable } from './public' */



/**
 * @template T
 * @param {Readable<T> | null | undefined} store
 * @param {(value: T) => void} run
 * @param {(value: T) => void} [invalidate]
 * @returns {() => void}
 */
function subscribe_to_store(store, run, invalidate) {
	if (store == null) {
		// @ts-expect-error
		run(undefined);

		// @ts-expect-error
		if (invalidate) invalidate(undefined);

		return _internal_shared_utils_js__WEBPACK_IMPORTED_MODULE_1__.noop;
	}

	// Svelte store takes a private second argument
	// StartStopNotifier could mutate state, and we want to silence the corresponding validation error
	const unsub = (0,_internal_client_runtime_js__WEBPACK_IMPORTED_MODULE_0__.untrack)(() =>
		store.subscribe(
			run,
			// @ts-expect-error
			invalidate
		)
	);

	// Also support RxJS
	// @ts-expect-error TODO fix this in the types?
	return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}


/***/ },

/***/ "./node_modules/svelte/src/utils.js"
/*!******************************************!*\
  !*** ./node_modules/svelte/src/utils.js ***!
  \******************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   REGEX_VALID_TAG_NAME: () => (/* binding */ REGEX_VALID_TAG_NAME),
/* harmony export */   RUNES: () => (/* binding */ RUNES),
/* harmony export */   can_delegate_event: () => (/* binding */ can_delegate_event),
/* harmony export */   cannot_be_set_statically: () => (/* binding */ cannot_be_set_statically),
/* harmony export */   hash: () => (/* binding */ hash),
/* harmony export */   is_boolean_attribute: () => (/* binding */ is_boolean_attribute),
/* harmony export */   is_capture_event: () => (/* binding */ is_capture_event),
/* harmony export */   is_content_editable_binding: () => (/* binding */ is_content_editable_binding),
/* harmony export */   is_dom_property: () => (/* binding */ is_dom_property),
/* harmony export */   is_load_error_element: () => (/* binding */ is_load_error_element),
/* harmony export */   is_mathml: () => (/* binding */ is_mathml),
/* harmony export */   is_passive_event: () => (/* binding */ is_passive_event),
/* harmony export */   is_raw_text_element: () => (/* binding */ is_raw_text_element),
/* harmony export */   is_reserved: () => (/* binding */ is_reserved),
/* harmony export */   is_rune: () => (/* binding */ is_rune),
/* harmony export */   is_state_creation_rune: () => (/* binding */ is_state_creation_rune),
/* harmony export */   is_svg: () => (/* binding */ is_svg),
/* harmony export */   is_void: () => (/* binding */ is_void),
/* harmony export */   normalize_attribute: () => (/* binding */ normalize_attribute),
/* harmony export */   sanitize_location: () => (/* binding */ sanitize_location)
/* harmony export */ });
const regex_return_characters = /\r/g;

/**
 * @param {string} str
 * @returns {string}
 */
function hash(str) {
	str = str.replace(regex_return_characters, '');
	let hash = 5381;
	let i = str.length;

	while (i--) hash = ((hash << 5) - hash) ^ str.charCodeAt(i);
	return (hash >>> 0).toString(36);
}

const VOID_ELEMENT_NAMES = [
	'area',
	'base',
	'br',
	'col',
	'command',
	'embed',
	'hr',
	'img',
	'input',
	'keygen',
	'link',
	'meta',
	'param',
	'source',
	'track',
	'wbr'
];

/**
 * Returns `true` if `name` is of a void element
 * @param {string} name
 */
function is_void(name) {
	return VOID_ELEMENT_NAMES.includes(name) || name.toLowerCase() === '!doctype';
}

const RESERVED_WORDS = [
	'arguments',
	'await',
	'break',
	'case',
	'catch',
	'class',
	'const',
	'continue',
	'debugger',
	'default',
	'delete',
	'do',
	'else',
	'enum',
	'eval',
	'export',
	'extends',
	'false',
	'finally',
	'for',
	'function',
	'if',
	'implements',
	'import',
	'in',
	'instanceof',
	'interface',
	'let',
	'new',
	'null',
	'package',
	'private',
	'protected',
	'public',
	'return',
	'static',
	'super',
	'switch',
	'this',
	'throw',
	'true',
	'try',
	'typeof',
	'var',
	'void',
	'while',
	'with',
	'yield'
];

/**
 * Returns `true` if `word` is a reserved JavaScript keyword
 * @param {string} word
 */
function is_reserved(word) {
	return RESERVED_WORDS.includes(word);
}

/**
 * @param {string} name
 */
function is_capture_event(name) {
	return name.endsWith('capture') && name !== 'gotpointercapture' && name !== 'lostpointercapture';
}

/** List of Element events that will be delegated */
const DELEGATED_EVENTS = [
	'beforeinput',
	'click',
	'change',
	'dblclick',
	'contextmenu',
	'focusin',
	'focusout',
	'input',
	'keydown',
	'keyup',
	'mousedown',
	'mousemove',
	'mouseout',
	'mouseover',
	'mouseup',
	'pointerdown',
	'pointermove',
	'pointerout',
	'pointerover',
	'pointerup',
	'touchend',
	'touchmove',
	'touchstart'
];

/**
 * Returns `true` if `event_name` is a delegated event
 * @param {string} event_name
 */
function can_delegate_event(event_name) {
	return DELEGATED_EVENTS.includes(event_name);
}

/**
 * Attributes that are boolean, i.e. they are present or not present.
 */
const DOM_BOOLEAN_ATTRIBUTES = [
	'allowfullscreen',
	'async',
	'autofocus',
	'autoplay',
	'checked',
	'controls',
	'default',
	'disabled',
	'formnovalidate',
	'indeterminate',
	'inert',
	'ismap',
	'loop',
	'multiple',
	'muted',
	'nomodule',
	'novalidate',
	'open',
	'playsinline',
	'readonly',
	'required',
	'reversed',
	'seamless',
	'selected',
	'webkitdirectory',
	'defer',
	'disablepictureinpicture',
	'disableremoteplayback'
];

/**
 * Returns `true` if `name` is a boolean attribute
 * @param {string} name
 */
function is_boolean_attribute(name) {
	return DOM_BOOLEAN_ATTRIBUTES.includes(name);
}

/**
 * @type {Record<string, string>}
 * List of attribute names that should be aliased to their property names
 * because they behave differently between setting them as an attribute and
 * setting them as a property.
 */
const ATTRIBUTE_ALIASES = {
	// no `class: 'className'` because we handle that separately
	formnovalidate: 'formNoValidate',
	ismap: 'isMap',
	nomodule: 'noModule',
	playsinline: 'playsInline',
	readonly: 'readOnly',
	defaultvalue: 'defaultValue',
	defaultchecked: 'defaultChecked',
	srcobject: 'srcObject',
	novalidate: 'noValidate',
	allowfullscreen: 'allowFullscreen',
	disablepictureinpicture: 'disablePictureInPicture',
	disableremoteplayback: 'disableRemotePlayback'
};

/**
 * @param {string} name
 */
function normalize_attribute(name) {
	name = name.toLowerCase();
	return ATTRIBUTE_ALIASES[name] ?? name;
}

const DOM_PROPERTIES = [
	...DOM_BOOLEAN_ATTRIBUTES,
	'formNoValidate',
	'isMap',
	'noModule',
	'playsInline',
	'readOnly',
	'value',
	'volume',
	'defaultValue',
	'defaultChecked',
	'srcObject',
	'noValidate',
	'allowFullscreen',
	'disablePictureInPicture',
	'disableRemotePlayback'
];

/**
 * @param {string} name
 */
function is_dom_property(name) {
	return DOM_PROPERTIES.includes(name);
}

const NON_STATIC_PROPERTIES = ['autofocus', 'muted', 'defaultValue', 'defaultChecked'];

/**
 * Returns `true` if the given attribute cannot be set through the template
 * string, i.e. needs some kind of JavaScript handling to work.
 * @param {string} name
 */
function cannot_be_set_statically(name) {
	return NON_STATIC_PROPERTIES.includes(name);
}

/**
 * Subset of delegated events which should be passive by default.
 * These two are already passive via browser defaults on window, document and body.
 * But since
 * - we're delegating them
 * - they happen often
 * - they apply to mobile which is generally less performant
 * we're marking them as passive by default for other elements, too.
 */
const PASSIVE_EVENTS = ['touchstart', 'touchmove'];

/**
 * Returns `true` if `name` is a passive event
 * @param {string} name
 */
function is_passive_event(name) {
	return PASSIVE_EVENTS.includes(name);
}

const CONTENT_EDITABLE_BINDINGS = ['textContent', 'innerHTML', 'innerText'];

/** @param {string} name */
function is_content_editable_binding(name) {
	return CONTENT_EDITABLE_BINDINGS.includes(name);
}

const LOAD_ERROR_ELEMENTS = [
	'body',
	'embed',
	'iframe',
	'img',
	'link',
	'object',
	'script',
	'style',
	'track'
];

/**
 * Returns `true` if the element emits `load` and `error` events
 * @param {string} name
 */
function is_load_error_element(name) {
	return LOAD_ERROR_ELEMENTS.includes(name);
}

const SVG_ELEMENTS = [
	'altGlyph',
	'altGlyphDef',
	'altGlyphItem',
	'animate',
	'animateColor',
	'animateMotion',
	'animateTransform',
	'circle',
	'clipPath',
	'color-profile',
	'cursor',
	'defs',
	'desc',
	'discard',
	'ellipse',
	'feBlend',
	'feColorMatrix',
	'feComponentTransfer',
	'feComposite',
	'feConvolveMatrix',
	'feDiffuseLighting',
	'feDisplacementMap',
	'feDistantLight',
	'feDropShadow',
	'feFlood',
	'feFuncA',
	'feFuncB',
	'feFuncG',
	'feFuncR',
	'feGaussianBlur',
	'feImage',
	'feMerge',
	'feMergeNode',
	'feMorphology',
	'feOffset',
	'fePointLight',
	'feSpecularLighting',
	'feSpotLight',
	'feTile',
	'feTurbulence',
	'filter',
	'font',
	'font-face',
	'font-face-format',
	'font-face-name',
	'font-face-src',
	'font-face-uri',
	'foreignObject',
	'g',
	'glyph',
	'glyphRef',
	'hatch',
	'hatchpath',
	'hkern',
	'image',
	'line',
	'linearGradient',
	'marker',
	'mask',
	'mesh',
	'meshgradient',
	'meshpatch',
	'meshrow',
	'metadata',
	'missing-glyph',
	'mpath',
	'path',
	'pattern',
	'polygon',
	'polyline',
	'radialGradient',
	'rect',
	'set',
	'solidcolor',
	'stop',
	'svg',
	'switch',
	'symbol',
	'text',
	'textPath',
	'tref',
	'tspan',
	'unknown',
	'use',
	'view',
	'vkern'
];

/** @param {string} name */
function is_svg(name) {
	return SVG_ELEMENTS.includes(name);
}

const MATHML_ELEMENTS = [
	'annotation',
	'annotation-xml',
	'maction',
	'math',
	'merror',
	'mfrac',
	'mi',
	'mmultiscripts',
	'mn',
	'mo',
	'mover',
	'mpadded',
	'mphantom',
	'mprescripts',
	'mroot',
	'mrow',
	'ms',
	'mspace',
	'msqrt',
	'mstyle',
	'msub',
	'msubsup',
	'msup',
	'mtable',
	'mtd',
	'mtext',
	'mtr',
	'munder',
	'munderover',
	'semantics'
];

/** @param {string} name */
function is_mathml(name) {
	return MATHML_ELEMENTS.includes(name);
}

const STATE_CREATION_RUNES = /** @type {const} */ ([
	'$state',
	'$state.raw',
	'$derived',
	'$derived.by'
]);

const RUNES = /** @type {const} */ ([
	...STATE_CREATION_RUNES,
	'$state.eager',
	'$state.snapshot',
	'$props',
	'$props.id',
	'$bindable',
	'$effect',
	'$effect.pre',
	'$effect.tracking',
	'$effect.root',
	'$effect.pending',
	'$inspect',
	'$inspect().with',
	'$inspect.trace',
	'$host'
]);

/** @typedef {typeof RUNES[number]} RuneName */

/**
 * @param {string} name
 * @returns {name is RuneName}
 */
function is_rune(name) {
	return RUNES.includes(/** @type {RuneName} */ (name));
}

/** @typedef {typeof STATE_CREATION_RUNES[number]} StateCreationRuneName */

/**
 * @param {string} name
 * @returns {name is StateCreationRuneName}
 */
function is_state_creation_rune(name) {
	return STATE_CREATION_RUNES.includes(/** @type {StateCreationRuneName} */ (name));
}

/** List of elements that require raw contents and should not have SSR comments put in them */
const RAW_TEXT_ELEMENTS = /** @type {const} */ (['textarea', 'script', 'style', 'title']);

/** @param {string} name */
function is_raw_text_element(name) {
	return RAW_TEXT_ELEMENTS.includes(/** @type {typeof RAW_TEXT_ELEMENTS[number]} */ (name));
}

// Matches valid HTML/SVG/MathML element names and custom element names.
// https://html.spec.whatwg.org/multipage/custom-elements.html#valid-custom-element-name
//
// Standard elements: ASCII alpha start, followed by ASCII alphanumerics.
// Custom elements: ASCII alpha start, followed by any mix of PCENChar (which
// includes ASCII alphanumerics, `-`, `.`, `_`, and specified Unicode ranges),
// with at least one hyphen required somewhere after the first character.
//
// Rejects strings containing whitespace, quotes, angle brackets, slashes, equals,
// or other characters that could break out of a tag-name token and enable markup injection.
const REGEX_VALID_TAG_NAME =
	/^[a-zA-Z][a-zA-Z0-9]*(-[a-zA-Z0-9.\-_\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u{10000}-\u{EFFFF}]*)?$/u;

/**
 * Prevent devtools trying to make `location` a clickable link by inserting a zero-width space
 * @template {string | undefined} T
 * @param {T} location
 * @returns {T};
 */
function sanitize_location(location) {
	return /** @type {T} */ (location?.replace(/\//g, '/\u200b'));
}


/***/ },

/***/ "./node_modules/svelte/src/version.js"
/*!********************************************!*\
  !*** ./node_modules/svelte/src/version.js ***!
  \********************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PUBLIC_VERSION: () => (/* binding */ PUBLIC_VERSION),
/* harmony export */   VERSION: () => (/* binding */ VERSION)
/* harmony export */ });
// generated during release, do not modify

/**
 * The current version, as set in package.json.
 * @type {string}
 */
const VERSION = '5.57.1';
const PUBLIC_VERSION = '5';


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
/******/ 	/* webpack/runtime/define property getters */
/******/ 	// define getter/value functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop));
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = (exports) => {
/******/ 		Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	let __webpack_exports__ = __webpack_require__("./src/forms/form.ts");
/******/ 	window.UserLicenceCounterFormBundle = __webpack_exports__;
/******/ 	
/******/ })()
;
//# sourceMappingURL=formBundle.js.map