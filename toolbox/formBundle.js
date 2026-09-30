(function() {
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
	//#region node_modules/svelte/src/internal/shared/utils.js
	var is_array = Array.isArray;
	var index_of = Array.prototype.indexOf;
	var includes = Array.prototype.includes;
	var array_from = Array.from;
	var define_property = Object.defineProperty;
	var get_descriptor = Object.getOwnPropertyDescriptor;
	var object_prototype = Object.prototype;
	var array_prototype = Array.prototype;
	var get_prototype_of = Object.getPrototypeOf;
	var is_extensible = Object.isExtensible;
	var noop = () => {};
	/** @param {Array<() => void>} arr */
	function run_all(arr) {
		for (var i = 0; i < arr.length; i++) arr[i]();
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
		return {
			promise: new Promise((res, rej) => {
				resolve = res;
				reject = rej;
			}),
			resolve,
			reject
		};
	}
	var CLEAN = 1024;
	var DIRTY = 2048;
	var MAYBE_DIRTY = 4096;
	var INERT = 8192;
	var DESTROYED = 16384;
	/** Set once a reaction has run for the first time */
	var REACTION_RAN = 32768;
	/** Effect is in the process of getting destroyed. Can be observed in child teardown functions */
	var DESTROYING = 1 << 25;
	/**
	* 'Transparent' effects do not create a transition boundary.
	* This is on a block effect 99% of the time but may also be on a branch effect if its parent block effect was pruned
	*/
	var EFFECT_TRANSPARENT = 65536;
	var EFFECT_PRESERVED = 1 << 19;
	var USER_EFFECT = 1 << 20;
	var EFFECT_OFFSCREEN = 1 << 25;
	var REACTION_IS_UPDATING = 1 << 21;
	var ASYNC = 1 << 22;
	var ERROR_VALUE = 1 << 23;
	var STATE_SYMBOL = Symbol("$state");
	/** Marks component export objects, so that `proxy(...)` leaves them untouched */
	var COMPONENT_SYMBOL = Symbol("component");
	var LEGACY_PROPS = Symbol("legacy props");
	var ATTRIBUTES_CACHE = Symbol("attributes");
	var CLASS_CACHE = Symbol("class");
	var STYLE_CACHE = Symbol("style");
	var TEXT_CACHE = Symbol("text");
	var FORM_RESET_HANDLER = Symbol("form reset");
	/** allow users to ignore aborted signal errors if `reason.name === 'StaleReactionError` */
	var STALE_REACTION = new class StaleReactionError extends Error {
		name = "StaleReactionError";
		message = "The reaction that called `getAbortSignal()` was re-run or destroyed";
	}();
	globalThis.document?.contentType;
	//#endregion
	//#region node_modules/svelte/src/constants.js
	var HYDRATION_ERROR = {};
	var UNINITIALIZED = Symbol("uninitialized");
	/**
	* Reading a derived belonging to a now-destroyed effect may result in stale values
	*/
	function derived_inert() {
		console.warn(`https://svelte.dev/e/derived_inert`);
	}
	/**
	* Hydration failed because the initial UI does not match what was rendered on the server. The error occurred near %location%
	* @param {string | undefined | null} [location]
	*/
	function hydration_mismatch(location) {
		console.warn(`https://svelte.dev/e/hydration_mismatch`);
	}
	/**
	* The `value` property of a `<select multiple>` element should be an array, but it received a non-array value. The selection will be kept as is.
	*/
	function select_multiple_invalid_value() {
		console.warn(`https://svelte.dev/e/select_multiple_invalid_value`);
	}
	/**
	* A `<svelte:boundary>` `reset` function only resets the boundary the first time it is called
	*/
	function svelte_boundary_reset_noop() {
		console.warn(`https://svelte.dev/e/svelte_boundary_reset_noop`);
	}
	//#endregion
	//#region node_modules/svelte/src/internal/client/dom/hydration.js
	/** @import { TemplateNode } from '#client' */
	/**
	* Use this variable to guard everything related to hydration code so it can be treeshaken out
	* if the user doesn't use the `hydrate` method and these code paths are therefore not needed.
	*/
	var hydrating = false;
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
	var hydrate_node;
	/** @param {TemplateNode | null} node */
	function set_hydrate_node(node) {
		if (node === null) {
			hydration_mismatch();
			throw HYDRATION_ERROR;
		}
		return hydrate_node = node;
	}
	function hydrate_next() {
		return set_hydrate_node(/* @__PURE__ */ get_next_sibling(hydrate_node));
	}
	/** @param {TemplateNode} node */
	function reset(node) {
		if (!hydrating) return;
		if (/* @__PURE__ */ get_next_sibling(hydrate_node) !== null) {
			hydration_mismatch();
			throw HYDRATION_ERROR;
		}
		hydrate_node = node;
	}
	function next(count = 1) {
		if (hydrating) {
			var i = count;
			var node = hydrate_node;
			while (i--) node = /* @__PURE__ */ get_next_sibling(node);
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
			if (node.nodeType === 8) {
				var data = node.data;
				if (data === "]") {
					if (depth === 0) return node;
					depth -= 1;
				} else if (data === "[" || data === "[!" || data[0] === "[" && !isNaN(Number(data.slice(1)))) depth += 1;
			}
			var next = /* @__PURE__ */ get_next_sibling(node);
			if (remove) node.remove();
			node = next;
		}
	}
	/**
	*
	* @param {TemplateNode} node
	*/
	function read_hydration_instruction(node) {
		if (!node || node.nodeType !== 8) {
			hydration_mismatch();
			throw HYDRATION_ERROR;
		}
		return node.data;
	}
	//#endregion
	//#region node_modules/svelte/src/internal/client/reactivity/equality.js
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
		return a != a ? b == b : a !== b || a !== null && typeof a === "object" || typeof a === "function";
	}
	/** @type {Equals} */
	function safe_equals(value) {
		return !safe_not_equal(value, this.v);
	}
	//#endregion
	//#region node_modules/svelte/src/internal/client/errors.js
	/**
	* Cannot create a `$derived(...)` with an `await` expression outside of an effect tree
	* @returns {never}
	*/
	function async_derived_orphan() {
		throw new Error(`https://svelte.dev/e/async_derived_orphan`);
	}
	/**
	* Keyed each block has duplicate key `%value%` at indexes %a% and %b%
	* @param {string} a
	* @param {string} b
	* @param {string | undefined | null} [value]
	* @returns {never}
	*/
	function each_key_duplicate(a, b, value) {
		throw new Error(`https://svelte.dev/e/each_key_duplicate`);
	}
	/**
	* Maximum update depth exceeded. This typically indicates that an effect reads and writes the same piece of state
	* @returns {never}
	*/
	function effect_update_depth_exceeded() {
		throw new Error(`https://svelte.dev/e/effect_update_depth_exceeded`);
	}
	/**
	* Cannot do `bind:%key%={undefined}` when `%key%` has a fallback value
	* @param {string} key
	* @returns {never}
	*/
	function props_invalid_value(key) {
		throw new Error(`https://svelte.dev/e/props_invalid_value`);
	}
	/**
	* Property descriptors defined on `$state` objects must contain `value` and always be `enumerable`, `configurable` and `writable`.
	* @returns {never}
	*/
	function state_descriptors_fixed() {
		throw new Error(`https://svelte.dev/e/state_descriptors_fixed`);
	}
	/**
	* Cannot set prototype of `$state` object
	* @returns {never}
	*/
	function state_prototype_fixed() {
		throw new Error(`https://svelte.dev/e/state_prototype_fixed`);
	}
	/**
	* Updating state inside `$derived(...)`, `$inspect(...)` or a template expression is forbidden. If the value should not be reactive, declare it without `$state`
	* @returns {never}
	*/
	function state_unsafe_mutation() {
		throw new Error(`https://svelte.dev/e/state_unsafe_mutation`);
	}
	/**
	* A `<svelte:boundary>` `reset` function cannot be called while an error is still being handled
	* @returns {never}
	*/
	function svelte_boundary_reset_onerror() {
		throw new Error(`https://svelte.dev/e/svelte_boundary_reset_onerror`);
	}
	//#endregion
	//#region node_modules/svelte/src/internal/flags/index.js
	/** True if experimental.async=true */
	var async_mode_flag = false;
	/** True if we're not certain that we only have Svelte 5 code in the compilation */
	var legacy_mode_flag = false;
	//#endregion
	//#region node_modules/svelte/src/internal/client/context.js
	/** @import { ComponentContext, DevStackEntry, Effect } from '#client' */
	/** @type {ComponentContext | null} */
	var component_context = null;
	/** @param {ComponentContext | null} context */
	function set_component_context(context) {
		component_context = context;
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
			r: active_effect,
			l: legacy_mode_flag && !runes ? {
				s: null,
				u: null,
				$: []
			} : null
		};
	}
	/**
	* @template {Record<string, any>} T
	* @param {T} [component]
	* @returns {T}
	*/
	function pop(component) {
		var context = component_context;
		var effects = context.e;
		if (effects !== null) {
			context.e = null;
			for (var fn of effects) create_user_effect(fn);
		}
		if (component !== void 0) context.x = component;
		context.i = true;
		component_context = context.p;
		return mark_as_component(component);
	}
	/**
	* Add a symbol to the object (or create one if undefined) to mark it as a component so it isn't proxified.
	* @param {any} component
	*/
	function mark_as_component(component = {}) {
		define_property(component, COMPONENT_SYMBOL, { value: true });
		return component;
	}
	/** @returns {boolean} */
	function is_runes() {
		return !legacy_mode_flag || component_context !== null && component_context.l === null;
	}
	//#endregion
	//#region node_modules/svelte/src/internal/client/dom/task.js
	/** @type {Array<() => void>} */
	var micro_tasks = [];
	function run_micro_tasks() {
		var tasks = micro_tasks;
		micro_tasks = [];
		run_all(tasks);
	}
	/**
	* @param {() => void} fn
	*/
	function queue_micro_task(fn) {
		if (micro_tasks.length === 0 && !is_flushing_sync) {
			var tasks = micro_tasks;
			queueMicrotask(() => {
				if (tasks === micro_tasks) run_micro_tasks();
			});
		}
		micro_tasks.push(fn);
	}
	//#endregion
	//#region node_modules/svelte/src/internal/client/reactivity/status.js
	/** @import { Derived, Signal } from '#client' */
	var STATUS_MASK = ~(DIRTY | MAYBE_DIRTY | CLEAN);
	/**
	* @param {Signal} signal
	* @param {number} status
	*/
	function set_signal_status(signal, status) {
		signal.f = signal.f & STATUS_MASK | status;
	}
	/**
	* Set a derived's status to CLEAN or MAYBE_DIRTY based on its connection state.
	* @param {Derived} derived
	*/
	function update_derived_status(derived) {
		if ((derived.f & 512) !== 0 || derived.deps === null) set_signal_status(derived, CLEAN);
		else set_signal_status(derived, MAYBE_DIRTY);
	}
	//#endregion
	//#region node_modules/svelte/src/internal/client/reactivity/utils.js
	/** @import { Effect } from '#client' */
	/**
	* @param {Effect} effect
	* @param {Set<Effect>} dirty_effects
	* @param {Set<Effect>} maybe_dirty_effects
	*/
	function defer_effect(effect, dirty_effects, maybe_dirty_effects) {
		if ((effect.f & 2048) !== 0) dirty_effects.add(effect);
		else if ((effect.f & 4096) !== 0) maybe_dirty_effects.add(effect);
		set_signal_status(effect, CLEAN);
	}
	//#endregion
	//#region node_modules/svelte/src/internal/client/dom/elements/misc.js
	var listening_to_form_reset = false;
	function add_form_reset_listener() {
		if (!listening_to_form_reset) {
			listening_to_form_reset = true;
			document.addEventListener("reset", (evt) => {
				Promise.resolve().then(() => {
					if (!evt.defaultPrevented) for (const e of evt.target.elements)
 /** @type {any} */ e[FORM_RESET_HANDLER]?.();
				});
			}, { capture: true });
		}
	}
	//#endregion
	//#region node_modules/svelte/src/internal/client/dom/elements/bindings/shared.js
	/**
	* @template T
	* @param {() => T} fn
	*/
	function without_reactive_context(fn) {
		var previous_reaction = active_reaction;
		var previous_effect = active_effect;
		set_active_reaction(null);
		set_active_effect(null);
		try {
			return fn();
		} finally {
			set_active_reaction(previous_reaction);
			set_active_effect(previous_effect);
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
		const prev = element[FORM_RESET_HANDLER];
		if (prev)
 /** @type {any} */ element[FORM_RESET_HANDLER] = () => {
			prev();
			on_reset(true);
		};
		else
 /** @type {any} */ element[FORM_RESET_HANDLER] = () => on_reset(true);
		add_form_reset_listener();
	}
	//#endregion
	//#region node_modules/svelte/src/internal/client/reactivity/async.js
	/** @import { Blocker, Effect, Source, Value } from '#client' */
	/**
	* @param {Blocker[]} blockers
	* @param {Array<() => any>} sync
	* @param {Array<() => Promise<any>>} async
	* @param {(values: Value[]) => any} fn
	*/
	function flatten(blockers, sync, async, fn) {
		const d = is_runes() ? derived : derived_safe_equal;
		var pending = blockers.filter((b) => !b.settled);
		var deriveds = sync.map(d);
		if (async.length === 0 && pending.length === 0) {
			fn(deriveds);
			return;
		}
		var parent = active_effect;
		var restore = capture();
		var blocker_promise = pending.length === 1 ? pending[0].promise : pending.length > 1 ? Promise.all(pending.map((b) => b.promise)) : null;
		/**
		* @param {Source[]} async
		*/
		function finish(async) {
			if ((parent.f & 16384) !== 0) return;
			restore();
			try {
				fn([...deriveds, ...async]);
			} catch (error) {
				invoke_error_boundary(error, parent);
			}
			unset_context();
		}
		var decrement_pending = increment_pending();
		if (async.length === 0) {
			/** @type {Promise<any>} */ blocker_promise.then(() => finish([])).finally(decrement_pending);
			return;
		}
		function run() {
			Promise.all(async.map((expression) => /* @__PURE__ */ async_derived(expression))).then(finish).catch((error) => invoke_error_boundary(error, parent)).finally(decrement_pending);
		}
		if (blocker_promise) blocker_promise.then(() => {
			restore();
			run();
			unset_context();
		});
		else run();
	}
	/**
	* Captures the current effect context so that we can restore it after
	* some asynchronous work has happened (so that e.g. `await a + b`
	* causes `b` to be registered as a dependency).
	*/
	function capture() {
		var previous_effect = active_effect;
		var previous_reaction = active_reaction;
		var previous_component_context = component_context;
		var previous_batch = current_batch;
		return function restore(activate_batch = true) {
			set_active_effect(previous_effect);
			set_active_reaction(previous_reaction);
			set_component_context(previous_component_context);
			if (activate_batch && (previous_effect.f & 16384) === 0) {
				previous_batch?.activate();
				previous_batch?.apply();
			}
		};
	}
	function unset_context(deactivate_batch = true) {
		set_active_effect(null);
		set_active_reaction(null);
		set_component_context(null);
		if (deactivate_batch) current_batch?.deactivate();
	}
	/**
	* @returns {(skip?: boolean) => void}
	*/
	function increment_pending() {
		var effect = active_effect;
		var boundary = effect.b;
		var batch = current_batch;
		var blocking = !!boundary?.is_rendered();
		boundary?.update_pending_count(1, batch);
		batch.increment(blocking, effect);
		return () => {
			boundary?.update_pending_count(-1, batch);
			batch.decrement(blocking, effect);
		};
	}
	/**
	* @template V
	* @param {() => V} fn
	* @returns {Derived<V>}
	*/
	/*#__NO_SIDE_EFFECTS__*/
	function derived(fn) {
		var flags = 2 | DIRTY;
		if (active_effect !== null) active_effect.f |= EFFECT_PRESERVED;
		return {
			ctx: component_context,
			deps: null,
			effects: null,
			equals,
			f: flags,
			fn,
			reactions: null,
			rv: 0,
			v: UNINITIALIZED,
			wv: 0,
			parent: active_effect,
			ac: null
		};
	}
	var OBSOLETE = Symbol("obsolete");
	/**
	* @template V
	* @param {() => V | Promise<V>} fn
	* @param {string} [label]
	* @param {string} [location] If provided, print a warning if the value is not read immediately after update
	* @returns {Promise<Source<V>>}
	*/
	/*#__NO_SIDE_EFFECTS__*/
	function async_derived(fn, label, location) {
		let parent = active_effect;
		if (parent === null) async_derived_orphan();
		var promise = void 0;
		var signal = source(UNINITIALIZED);
		var should_suspend = !active_reaction;
		/** @type {Set<ReturnType<typeof deferred<V>>>} */
		var deferreds = /* @__PURE__ */ new Set();
		async_effect(() => {
			var effect = active_effect;
			/** @type {ReturnType<typeof deferred<V>>} */
			var d = deferred();
			promise = d.promise;
			try {
				Promise.resolve(fn()).then(d.resolve, (e) => {
					if (e !== STALE_REACTION) d.reject(e);
				}).finally(unset_context);
			} catch (error) {
				d.reject(error);
				unset_context();
			}
			var batch = current_batch;
			if (should_suspend) {
				if ((effect.f & 32768) !== 0) var decrement_pending = increment_pending();
				if (parent.b?.is_rendered()) batch.async_deriveds.get(effect)?.reject(OBSOLETE);
				else for (const d of deferreds.values()) d.reject(OBSOLETE);
				deferreds.add(d);
				batch.async_deriveds.set(effect, d);
			}
			/**
			* @param {any} value
			* @param {unknown} error
			*/
			const handler = (value, error = void 0) => {
				decrement_pending?.();
				deferreds.delete(d);
				if (error === OBSOLETE) return;
				batch.activate();
				if (error) {
					signal.f |= ERROR_VALUE;
					internal_set(signal, error);
				} else {
					if ((signal.f & 8388608) !== 0) signal.f ^= ERROR_VALUE;
					internal_set(signal, value);
				}
				batch.deactivate();
			};
			d.promise.then(handler, (e) => handler(null, e || "unknown"));
		});
		teardown(() => {
			for (const d of deferreds) d.reject(OBSOLETE);
		});
		return new Promise((fulfil) => {
			/** @param {Promise<V>} p */
			function next(p) {
				function go() {
					if (p === promise) fulfil(signal);
					else next(promise);
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
		const d = /* @__PURE__ */ derived(fn);
		if (!async_mode_flag) push_reaction_value(d);
		return d;
	}
	/**
	* @template V
	* @param {() => V} fn
	* @returns {Derived<V>}
	*/
	/*#__NO_SIDE_EFFECTS__*/
	function derived_safe_equal(fn) {
		const signal = /* @__PURE__ */ derived(fn);
		signal.equals = safe_equals;
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
			for (var i = 0; i < effects.length; i += 1) destroy_effect(effects[i]);
		}
	}
	/**
	* @template T
	* @param {Derived} derived
	* @returns {T}
	*/
	function execute_derived(derived) {
		var value;
		var prev_active_effect = active_effect;
		var parent = derived.parent;
		if (!is_destroying_effect && parent !== null && derived.v !== UNINITIALIZED && (parent.f & 24576) !== 0) {
			derived_inert();
			return derived.v;
		}
		set_active_effect(parent);
		try {
			destroy_derived_effects(derived);
			value = update_reaction(derived);
		} finally {
			set_active_effect(prev_active_effect);
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
			derived.wv = increment_write_version();
			if (!current_batch?.is_fork || derived.deps === null) {
				if (current_batch !== null) {
					current_batch.capture(derived, value, true);
					previous_batch?.capture(derived, value, true);
				} else derived.v = value;
				if (derived.deps === null) {
					set_signal_status(derived, CLEAN);
					return;
				}
			}
		}
		if (is_destroying_effect) return;
		if (batch_values !== null) {
			if (effect_tracking() || current_batch?.is_fork) batch_values.set(derived, value);
		} else update_derived_status(derived);
	}
	/**
	* @param {Derived} derived
	*/
	function freeze_derived_effects(derived) {
		if (derived.effects === null) return;
		for (const e of derived.effects) if (e.teardown || e.ac) {
			e.teardown?.();
			if (e.ac !== null) without_reactive_context(() => {
				/** @type {AbortController} */ e.ac.abort(STALE_REACTION);
				e.ac = null;
			});
			if (e.fn !== null) e.teardown = noop;
			remove_reactions(e, 0);
			destroy_effect_children(e);
		}
	}
	/**
	* @param {Derived} derived
	*/
	function unfreeze_derived_effects(derived) {
		if (derived.effects === null) return;
		for (const e of derived.effects) if (e.teardown && e.fn !== null) update_effect(e);
	}
	//#endregion
	//#region node_modules/svelte/src/internal/client/reactivity/batch.js
	/** @import { Fork } from 'svelte' */
	/** @import { Derived, Effect, Reaction, Source, Value } from '#client' */
	/** @type {Batch | null} */
	var first_batch = null;
	/** @type {Batch | null} */
	var last_batch = null;
	/** @type {Batch | null} */
	var current_batch = null;
	/**
	* This is needed to avoid overwriting inputs
	* @type {Batch | null}
	*/
	var previous_batch = null;
	/**
	* When time travelling (i.e. working in one batch, while other batches
	* still have ongoing work), we ignore the real values of affected
	* signals in favour of their values within the batch
	* @type {Map<Value, any> | null}
	*/
	var batch_values = null;
	/** @type {Effect | null} */
	var last_scheduled_effect = null;
	var is_flushing_sync = false;
	var is_processing = false;
	/**
	* During traversal, this is an array. Newly created effects are (if not immediately
	* executed) pushed to this array, rather than going through the scheduling
	* rigamarole that would cause another turn of the flush loop.
	* @type {Effect[] | null}
	*/
	var collected_effects = null;
	/**
	* An array of effects that are marked during traversal as a result of a `set`
	* (not `internal_set`) call. These will be added to the next batch and
	* trigger another `batch.process()`
	* @type {Effect[] | null}
	* @deprecated when we get rid of legacy mode and stores, we can get rid of this
	*/
	var legacy_updates = null;
	var flush_count = 0;
	var uid = 1;
	var Batch = class Batch {
		id = uid++;
		/** True as soon as `#process` was called */
		#started = false;
		linked = true;
		/** @type {Batch | null} */
		#prev = null;
		/** @type {Batch | null} */
		#next = null;
		/** @type {Map<Effect, ReturnType<typeof deferred<any>>>} */
		async_deriveds = /* @__PURE__ */ new Map();
		/**
		* The current values of any signals that are updated in this batch.
		* Tuple format: [value, is_derived] (note: is_derived is false for deriveds, too, if they were overridden via assignment)
		* They keys of this map are identical to `this.#previous`
		* @type {Map<Value, [any, boolean]>}
		*/
		current = /* @__PURE__ */ new Map();
		/**
		* The values of any signals (sources and deriveds) that are updated in this batch _before_ those updates took place.
		* They keys of this map are identical to `this.#current`
		* @type {Map<Value, any>}
		*/
		previous = /* @__PURE__ */ new Map();
		/**
		* When the batch is committed (and the DOM is updated), we need to remove old branches
		* and append new ones by calling the functions added inside (if/each/key/etc) blocks
		* @type {Set<(batch: Batch) => void>}
		*/
		#commit_callbacks = /* @__PURE__ */ new Set();
		/**
		* If a fork is discarded, we need to destroy any effects that are no longer needed
		* @type {Set<(batch: Batch) => void>}
		*/
		#discard_callbacks = /* @__PURE__ */ new Set();
		/**
		* The number of async effects that are currently in flight
		*/
		#pending = 0;
		/**
		* Async effects that are currently in flight, _not_ inside a pending boundary
		* @type {Map<Effect, number>}
		*/
		#blocking_pending = /* @__PURE__ */ new Map();
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
		#dirty_effects = /* @__PURE__ */ new Set();
		/**
		* Deferred effects that are MAYBE_DIRTY
		* @type {Set<Effect>}
		*/
		#maybe_dirty_effects = /* @__PURE__ */ new Set();
		/**
		* A map of branches that still exist, but will be destroyed when this batch
		* is committed — we skip over these during `process`.
		* The value contains child effects that were dirty/maybe_dirty before being reset,
		* so they can be rescheduled if the branch survives.
		* @type {Map<Effect, { d: Effect[], m: Effect[] }>}
		*/
		#skipped_branches = /* @__PURE__ */ new Map();
		/**
		* Inverse of #skipped_branches which we need to tell prior batches to unskip them when committing
		* @type {Set<Effect>}
		*/
		#unskipped_branches = /* @__PURE__ */ new Set();
		is_fork = false;
		#decrement_queued = false;
		constructor() {
			if (last_batch === null) first_batch = last_batch = this;
			else {
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
				if (!skipped) return true;
			}
			return false;
		}
		/**
		* Add an effect to the #skipped_branches map and reset its children
		* @param {Effect} effect
		*/
		skip_effect(effect) {
			if (!this.#skipped_branches.has(effect)) this.#skipped_branches.set(effect, {
				d: [],
				m: []
			});
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
					set_signal_status(e, DIRTY);
					callback(e);
				}
				for (e of tracked.m) {
					set_signal_status(e, MAYBE_DIRTY);
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
				if ((effect.f & 16384) !== 0 || (effect.f & 6144) === 0) continue;
				var e = effect;
				var covered = false;
				while (e.parent !== null) {
					e = e.parent;
					var flags = e.f;
					if ((flags & 96) !== 0) {
						if ((flags & 1024) === 0) {
							covered = true;
							break;
						}
						e.f ^= CLEAN;
					}
				}
				if (!covered) roots.push(e);
			}
			this.#scheduled = [];
			return roots;
		}
		#process() {
			this.#started = true;
			for (const e of this.#dirty_effects) {
				this.#maybe_dirty_effects.delete(e);
				set_signal_status(e, DIRTY);
				this.schedule(e);
			}
			for (const e of this.#maybe_dirty_effects) {
				set_signal_status(e, MAYBE_DIRTY);
				this.schedule(e);
			}
			this.apply();
			/** @type {Effect[]} */
			var effects = collected_effects = [];
			/** @type {Effect[]} */
			var render_effects = [];
			/**
			* @type {Effect[]}
			* @deprecated when we get rid of legacy mode and stores, we can get rid of this
			*/
			var updates = legacy_updates = [];
			while (this.#scheduled.length > 0) {
				if (flush_count++ > 1e3) {
					this.#unlink();
					infinite_loop_guard();
				}
				for (const root of this.#resolve()) try {
					this.#traverse(root, effects, render_effects);
				} catch (e) {
					reset_all(root);
					if (!this.#is_deferred()) this.discard();
					throw e;
				}
			}
			current_batch = null;
			if (updates.length > 0) {
				var batch = Batch.ensure();
				for (const e of updates) batch.schedule(e);
			}
			collected_effects = null;
			legacy_updates = null;
			if (this.#is_deferred()) {
				this.#defer_effects(render_effects);
				this.#defer_effects(effects);
				for (const [e, t] of this.#skipped_branches) reset_branch(e, t);
				if (updates.length > 0)
 /** @type {Batch} */ current_batch.#process();
				return;
			}
			const earlier_batch = this.#find_earlier_batch();
			if (earlier_batch) {
				this.#defer_effects(render_effects);
				this.#defer_effects(effects);
				earlier_batch.#merge(this);
				return;
			}
			this.#dirty_effects.clear();
			this.#maybe_dirty_effects.clear();
			for (const fn of this.#commit_callbacks) fn(this);
			this.#commit_callbacks.clear();
			previous_batch = this;
			flush_queued_effects(render_effects);
			flush_queued_effects(effects);
			previous_batch = null;
			this.#deferred?.resolve();
			var next_batch = current_batch;
			if (this.#pending === 0 && (this.#scheduled.length === 0 || next_batch !== null)) {
				this.#unlink();
				if (async_mode_flag) {
					this.#commit();
					current_batch = next_batch;
				}
			}
			if (this.#scheduled.length > 0) {
				if (next_batch !== null) {
					for (const e of this.#scheduled) next_batch.#scheduled.push(e);
					this.#scheduled = [];
				} else next_batch = this;
			}
			if (next_batch !== null) {
				old_values.clear();
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
			root.f ^= CLEAN;
			var effect = root.first;
			while (effect !== null) {
				var flags = effect.f;
				var is_branch = (flags & 96) !== 0;
				if (!(is_branch && (flags & 1024) !== 0 || (flags & 8192) !== 0 || this.#skipped_branches.has(effect)) && effect.fn !== null) {
					if (is_branch) effect.f ^= CLEAN;
					else if ((flags & 4) !== 0) effects.push(effect);
					else if (async_mode_flag && (flags & 16777224) !== 0) render_effects.push(effect);
					else if (is_dirty(effect)) {
						if ((flags & 16) !== 0) this.#maybe_dirty_effects.add(effect);
						update_effect(effect);
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
					for (const [value, [, is_derived]] of this.current) if (batch.current.has(value) && !is_derived) return batch;
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
				if (!this.previous.has(source) && batch.previous.has(source)) this.previous.set(source, batch.previous.get(source));
				this.current.set(source, value);
			}
			for (const [effect, deferred] of batch.async_deriveds) {
				const d = this.async_deriveds.get(effect);
				if (d) deferred.promise.then(d.resolve).catch(d.reject);
			}
			batch.async_deriveds.clear();
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
				if ((value.f & 2) !== 0 && (value.f & 6144) === 0) return;
				for (const reaction of reactions) {
					var flags = reaction.f;
					if ((flags & 2) !== 0) mark(reaction);
					else {
						var effect = reaction;
						if (flags & 4194320 && !this.async_deriveds.has(effect)) {
							this.#maybe_dirty_effects.delete(effect);
							set_signal_status(effect, DIRTY);
							this.schedule(effect);
						}
					}
				}
			};
			for (const source of this.current.keys()) mark(source);
			this.oncommit(() => batch.discard());
			batch.#unlink();
			current_batch = this;
			this.#process();
		}
		/**
		* @param {Effect[]} effects
		*/
		#defer_effects(effects) {
			for (var i = 0; i < effects.length; i += 1) defer_effect(effects[i], this.#dirty_effects, this.#maybe_dirty_effects);
		}
		/**
		* Associate a change to a given source with the current
		* batch, noting its previous and current values
		* @param {Value} source
		* @param {any} value
		* @param {boolean} [is_derived]
		*/
		capture(source, value, is_derived = false) {
			if (source.v !== UNINITIALIZED && !this.previous.has(source)) this.previous.set(source, source.v);
			if ((source.f & 8388608) === 0) {
				this.current.set(source, [value, is_derived]);
				batch_values?.set(source, value);
			}
			if (!this.is_fork) source.v = value;
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
				old_values.clear();
			}
		}
		discard() {
			for (const fn of this.#discard_callbacks) fn(this);
			this.#discard_callbacks.clear();
			for (const deferred of this.async_deriveds.values()) deferred.reject(OBSOLETE);
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
			for (let batch = first_batch; batch !== null; batch = batch.#next) {
				var is_earlier = batch.id < this.id;
				/** @type {Source[]} */
				var sources = [];
				for (const [source, [value, is_derived]] of this.current) {
					if (batch.current.has(source)) {
						var batch_value = batch.current.get(source)[0];
						if (is_earlier && value !== batch_value) batch.current.set(source, [value, is_derived]);
						else continue;
					}
					sources.push(source);
				}
				if (is_earlier) for (const [effect, deferred] of this.async_deriveds) {
					const d = batch.async_deriveds.get(effect);
					if (d) deferred.promise.then(d.resolve).catch(d.reject);
				}
				var current = [...batch.current.keys()].filter((source) => !batch.current.get(source)[1]);
				if (!batch.#started || current.length === 0) continue;
				var others = current.filter((source) => !this.current.has(source));
				if (others.length === 0) {
					if (is_earlier) batch.discard();
				} else if (sources.length > 0) {
					if (is_earlier) for (const unskipped of this.#unskipped_branches) batch.unskip_effect(unskipped, (e) => {
						if ((e.f & 4194320) !== 0) batch.schedule(e);
						else batch.#defer_effects([e]);
					});
					batch.activate();
					/** @type {Set<Value>} */
					var marked = /* @__PURE__ */ new Set();
					/** @type {Map<Reaction, boolean>} */
					var checked = /* @__PURE__ */ new Map();
					for (var source of sources) mark_effects(source, others, marked, checked);
					checked = /* @__PURE__ */ new Map();
					var current_unequal = [...batch.current].filter(([c, v1]) => {
						const v2 = this.current.get(c);
						if (!v2) return true;
						return v2[0] !== v1[0] || v2[1] !== v1[1];
					}).map(([c]) => c);
					if (current_unequal.length > 0) {
						for (const effect of this.#new_effects) if ((effect.f & 155648) === 0 && depends_on(effect, current_unequal, checked)) {
							if ((effect.f & 4194320) !== 0) {
								set_signal_status(effect, DIRTY);
								batch.schedule(effect);
							} else batch.#dirty_effects.add(effect);
						}
					}
					if (batch.#scheduled.length > 0 && !batch.#decrement_queued) {
						batch.apply();
						for (var root of batch.#resolve()) batch.#traverse(root, [], []);
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
				if (blocking_pending_count === 1) this.#blocking_pending.delete(effect);
				else this.#blocking_pending.set(effect, blocking_pending_count - 1);
			}
			if (this.#decrement_queued) return;
			this.#decrement_queued = true;
			queue_micro_task(() => {
				this.#decrement_queued = false;
				if (this.linked) this.flush();
			});
		}
		/**
		* @param {Set<Effect>} dirty_effects
		* @param {Set<Effect>} maybe_dirty_effects
		*/
		transfer_effects(dirty_effects, maybe_dirty_effects) {
			for (const e of dirty_effects) this.#dirty_effects.add(e);
			for (const e of maybe_dirty_effects) this.#maybe_dirty_effects.add(e);
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
			return (this.#deferred ??= deferred()).promise;
		}
		static ensure() {
			if (current_batch === null) {
				const batch = current_batch = new Batch();
				if (!is_processing && !is_flushing_sync) queue_micro_task(() => {
					if (!batch.#started) batch.flush();
				});
			}
			return current_batch;
		}
		apply() {
			if (!async_mode_flag || !this.is_fork && this.#prev === null && this.#next === null) {
				batch_values = null;
				return;
			}
			batch_values = /* @__PURE__ */ new Map();
			for (const [source, [value]] of this.current) batch_values.set(source, value);
			for (let batch = first_batch; batch !== null; batch = batch.#next) {
				if (batch === this || batch.is_fork) continue;
				var intersects = false;
				if (batch.id < this.id) for (const [source, [, is_derived]] of batch.current) {
					if (is_derived) continue;
					if (this.current.has(source)) {
						intersects = true;
						break;
					}
				}
				if (!intersects) {
					for (const [source, previous] of batch.previous) if (!batch_values.has(source)) batch_values.set(source, previous);
				}
			}
		}
		/**
		*
		* @param {Effect} effect
		*/
		schedule(effect) {
			last_scheduled_effect = effect;
			if (effect.b?.is_pending && (effect.f & 16777228) !== 0 && (effect.f & 32768) === 0) {
				effect.b.defer_effect(effect);
				return;
			}
			this.#scheduled.push(effect);
		}
		#unlink() {
			if (!this.linked) return;
			var prev = this.#prev;
			var next = this.#next;
			if (prev === null) first_batch = next;
			else prev.#next = next;
			if (next === null) last_batch = prev;
			else next.#prev = prev;
			this.linked = false;
		}
	};
	function infinite_loop_guard() {
		try {
			effect_update_depth_exceeded();
		} catch (error) {
			invoke_error_boundary(error, last_scheduled_effect);
		}
	}
	/** @type {Set<Effect> | null} */
	var eager_block_effects = null;
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
			if ((effect.f & 24576) === 0 && is_dirty(effect)) {
				eager_block_effects = /* @__PURE__ */ new Set();
				update_effect(effect);
				if (effect.deps === null && effect.first === null && effect.nodes === null && effect.teardown === null && effect.ac === null) unlink_effect(effect);
				if (eager_block_effects?.size > 0) {
					old_values.clear();
					for (const e of eager_block_effects) {
						if ((e.f & 24576) !== 0) continue;
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
							if ((e.f & 24576) !== 0) continue;
							update_effect(e);
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
		if (value.reactions !== null) for (const reaction of value.reactions) {
			const flags = reaction.f;
			if ((flags & 2) !== 0) mark_effects(reaction, sources, marked, checked);
			else if ((flags & 4194320) !== 0 && (flags & 2048) === 0 && depends_on(reaction, sources, checked)) {
				set_signal_status(reaction, DIRTY);
				schedule_effect(reaction);
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
		if (depends !== void 0) return depends;
		if (reaction.deps !== null) for (const dep of reaction.deps) {
			if (includes.call(sources, dep)) return true;
			if ((dep.f & 2) !== 0 && depends_on(dep, sources, checked)) {
				checked.set(dep, true);
				return true;
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
		/** @type {Batch} */ current_batch.schedule(effect);
	}
	/**
	* Mark all the effects inside a skipped branch CLEAN, so that
	* they can be correctly rescheduled later. Tracks dirty and maybe_dirty
	* effects so they can be rescheduled if the branch survives.
	* @param {Effect} effect
	* @param {{ d: Effect[], m: Effect[] }} tracked
	*/
	function reset_branch(effect, tracked) {
		if ((effect.f & 32) !== 0 && (effect.f & 1024) !== 0) return;
		if ((effect.f & 2048) !== 0) tracked.d.push(effect);
		else if ((effect.f & 4096) !== 0) tracked.m.push(effect);
		set_signal_status(effect, CLEAN);
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
		set_signal_status(effect, CLEAN);
		var e = effect.first;
		while (e !== null) {
			reset_all(e);
			e = e.next;
		}
	}
	//#endregion
	//#region node_modules/svelte/src/internal/client/reactivity/sources.js
	/** @import { Derived, Effect, Source, Value } from '#client' */
	/** @type {Set<Effect>} */
	var eager_effects = /* @__PURE__ */ new Set();
	/** @type {Map<Source, any>} */
	var old_values = /* @__PURE__ */ new Map();
	var eager_effects_deferred = false;
	/**
	* @template V
	* @param {V} v
	* @param {Error | null} [stack]
	* @returns {Source<V>}
	*/
	function source(v, stack) {
		return {
			f: 0,
			v,
			reactions: null,
			equals,
			rv: 0,
			wv: 0
		};
	}
	/**
	* @template V
	* @param {V} v
	* @param {Error | null} [stack]
	*/
	/*#__NO_SIDE_EFFECTS__*/
	function state(v, stack) {
		const s = source(v, stack);
		push_reaction_value(s);
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
		if (!immutable) s.equals = safe_equals;
		if (legacy_mode_flag && trackable && component_context !== null && component_context.l !== null) (component_context.l.s ??= []).push(s);
		return s;
	}
	/**
	* @template V
	* @param {Source<V>} source
	* @param {V} value
	* @param {boolean} [should_proxy]
	* @returns {V}
	*/
	function set(source, value, should_proxy = false) {
		if (active_reaction !== null && (!untracking || (active_reaction.f & 131072) !== 0) && is_runes() && (active_reaction.f & 4325394) !== 0 && (current_sources === null || !current_sources.has(source))) state_unsafe_mutation();
		return internal_set(source, should_proxy ? proxy(value) : value, legacy_updates);
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
			if (is_destroying_effect) old_values.set(source, value);
			else if (!old_values.has(source)) old_values.set(source, source.v);
			var batch = Batch.ensure();
			batch.capture(source, value);
			if ((source.f & 2) !== 0) {
				const derived = source;
				if ((source.f & 2048) !== 0) execute_derived(derived);
				if (batch_values === null) update_derived_status(derived);
			}
			source.wv = increment_write_version();
			seen = null;
			count_deps = 0;
			mark_reactions(source, DIRTY, updated_during_traversal);
			seen = null;
			if (is_runes() && active_effect !== null && (active_effect.f & 1024) !== 0 && (active_effect.f & 96) === 0) {
				if (untracked_writes === null) set_untracked_writes([source]);
				else untracked_writes.push(source);
			}
			if (!batch.is_fork && eager_effects.size > 0 && !eager_effects_deferred) flush_eager_effects();
		}
		return value;
	}
	function flush_eager_effects() {
		eager_effects_deferred = false;
		for (const effect of eager_effects) {
			if ((effect.f & 1024) !== 0) set_signal_status(effect, MAYBE_DIRTY);
			let dirty;
			try {
				dirty = is_dirty(effect);
			} catch {
				dirty = true;
			}
			if (dirty) update_effect(effect);
		}
		eager_effects.clear();
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
		var runes = is_runes();
		var length = reactions.length;
		count_deps += length;
		if (count_deps > 1e5 && seen === null) seen = /* @__PURE__ */ new Set();
		if (seen !== null) {
			if (seen.has(signal)) return;
			seen.add(signal);
		}
		for (var i = 0; i < length; i++) {
			var reaction = reactions[i];
			var flags = reaction.f;
			if (!runes && reaction === active_effect) continue;
			var not_dirty = (flags & DIRTY) === 0;
			if (not_dirty) set_signal_status(reaction, status);
			if ((flags & 131072) !== 0) eager_effects.add(reaction);
			else if ((flags & 2) !== 0) {
				var derived = reaction;
				batch_values?.delete(derived);
				mark_reactions(derived, MAYBE_DIRTY, updated_during_traversal);
			} else if (not_dirty) {
				var effect = reaction;
				if ((flags & 16) !== 0 && eager_block_effects !== null) eager_block_effects.add(effect);
				if (updated_during_traversal !== null) updated_during_traversal.push(effect);
				else schedule_effect(effect);
			}
		}
	}
	/**
	* @template T
	* @param {T} value
	* @returns {T}
	*/
	function proxy(value) {
		if (typeof value !== "object" || value === null || STATE_SYMBOL in value || COMPONENT_SYMBOL in value) return value;
		const prototype = get_prototype_of(value);
		if (prototype !== object_prototype && prototype !== array_prototype) return value;
		/** @type {Map<any, Source<any>>} */
		var sources = /* @__PURE__ */ new Map();
		var is_proxied_array = is_array(value);
		var version = /* @__PURE__ */ state(0);
		var stack = null;
		var parent_version = update_version;
		/**
		* Executes the proxy in the context of the reaction it was originally created in, if any
		* @template T
		* @param {() => T} fn
		*/
		var with_parent = (fn) => {
			if (update_version === parent_version) return fn();
			var reaction = active_reaction;
			var version = update_version;
			set_active_reaction(null);
			set_update_version(parent_version);
			var result = fn();
			set_active_reaction(reaction);
			set_update_version(version);
			return result;
		};
		if (is_proxied_array) sources.set("length", /* @__PURE__ */ state(
			/** @type {any[]} */
			value.length,
			stack
		));
		return new Proxy(value, {
			defineProperty(_, prop, descriptor) {
				if (!("value" in descriptor) || descriptor.configurable === false || descriptor.enumerable === false || descriptor.writable === false) state_descriptors_fixed();
				var s = sources.get(prop);
				if (s === void 0) with_parent(() => {
					var s = /* @__PURE__ */ state(descriptor.value, stack);
					sources.set(prop, s);
					return s;
				});
				else set(s, descriptor.value, true);
				return true;
			},
			deleteProperty(target, prop) {
				var s = sources.get(prop);
				if (s === void 0) {
					if (prop in target) {
						const s = with_parent(() => /* @__PURE__ */ state(UNINITIALIZED, stack));
						sources.set(prop, s);
						increment(version);
					}
				} else {
					set(s, UNINITIALIZED);
					increment(version);
				}
				return true;
			},
			get(target, prop, receiver) {
				if (prop === STATE_SYMBOL) return value;
				var s = sources.get(prop);
				var exists = prop in target;
				if (s === void 0 && (!exists || get_descriptor(target, prop)?.writable)) {
					s = with_parent(() => {
						return /* @__PURE__ */ state(proxy(exists ? target[prop] : UNINITIALIZED), stack);
					});
					sources.set(prop, s);
				}
				if (s !== void 0) {
					var v = get(s);
					return v === UNINITIALIZED ? void 0 : v;
				}
				return Reflect.get(target, prop, receiver);
			},
			getOwnPropertyDescriptor(target, prop) {
				this.has?.(target, prop);
				var descriptor = Reflect.getOwnPropertyDescriptor(target, prop);
				var s = sources.get(prop);
				if (s !== void 0) {
					var value = get(s);
					if (value === UNINITIALIZED) return;
					if (descriptor && "value" in descriptor) descriptor.value = value;
					else return {
						enumerable: true,
						configurable: true,
						value,
						writable: true
					};
				}
				return descriptor;
			},
			has(target, prop) {
				if (prop === STATE_SYMBOL) return true;
				var s = sources.get(prop);
				var has = s !== void 0 && s.v !== UNINITIALIZED || Reflect.has(target, prop);
				if (s !== void 0 || active_effect !== null && (!has || get_descriptor(target, prop)?.writable)) {
					if (s === void 0) {
						s = with_parent(() => {
							return /* @__PURE__ */ state(has ? proxy(target[prop]) : UNINITIALIZED, stack);
						});
						sources.set(prop, s);
					}
					if (get(s) === UNINITIALIZED) return false;
				}
				return has;
			},
			set(target, prop, value, receiver) {
				var s = sources.get(prop);
				var has = prop in target;
				if (is_proxied_array && prop === "length") for (var i = value; i < s.v; i += 1) {
					var other_s = sources.get(i + "");
					if (other_s !== void 0) set(other_s, UNINITIALIZED);
					else if (i in target) {
						other_s = with_parent(() => /* @__PURE__ */ state(UNINITIALIZED, stack));
						sources.set(i + "", other_s);
					}
				}
				if (s === void 0) {
					if (!has || get_descriptor(target, prop)?.writable) {
						s = with_parent(() => /* @__PURE__ */ state(void 0, stack));
						set(s, proxy(value));
						sources.set(prop, s);
					}
				} else {
					has = s.v !== UNINITIALIZED;
					var p = with_parent(() => proxy(value));
					set(s, p);
				}
				var descriptor = Reflect.getOwnPropertyDescriptor(target, prop);
				if (descriptor?.set) descriptor.set.call(receiver, value);
				if (!has) {
					if (is_proxied_array && typeof prop === "string") {
						var ls = sources.get("length");
						var n = Number(prop);
						if (Number.isInteger(n) && n >= ls.v) set(ls, n + 1);
					}
					increment(version);
				}
				return true;
			},
			ownKeys(target) {
				get(version);
				var own_keys = Reflect.ownKeys(target).filter((key) => {
					var source = sources.get(key);
					return source === void 0 || source.v !== UNINITIALIZED;
				});
				for (var [key, source] of sources) if (source.v !== UNINITIALIZED && !(key in target)) own_keys.push(key);
				return own_keys;
			},
			setPrototypeOf() {
				state_prototype_fixed();
			}
		});
	}
	/**
	* @param {any} value
	*/
	function get_proxied_value(value) {
		try {
			if (value !== null && typeof value === "object" && STATE_SYMBOL in value) return value[STATE_SYMBOL];
		} catch {}
		return value;
	}
	/**
	* @param {any} a
	* @param {any} b
	*/
	function is(a, b) {
		return Object.is(get_proxied_value(a), get_proxied_value(b));
	}
	//#endregion
	//#region node_modules/svelte/src/internal/client/dom/operations.js
	/** @import { Effect, TemplateNode } from '#client' */
	/** @type {Window} */
	var $window;
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
		if ($window !== void 0) return;
		$window = window;
		is_firefox = /Firefox/.test(navigator.userAgent);
		var element_prototype = Element.prototype;
		var node_prototype = Node.prototype;
		var text_prototype = Text.prototype;
		first_child_getter = get_descriptor(node_prototype, "firstChild").get;
		next_sibling_getter = get_descriptor(node_prototype, "nextSibling").get;
		if (is_extensible(element_prototype)) {
			/** @type {any} */ element_prototype[CLASS_CACHE] = void 0;
			/** @type {any} */ element_prototype[ATTRIBUTES_CACHE] = null;
			/** @type {any} */ element_prototype[STYLE_CACHE] = void 0;
			element_prototype.__e = void 0;
		}
		if (is_extensible(text_prototype))
 /** @type {any} */ text_prototype[TEXT_CACHE] = void 0;
	}
	/**
	* @param {string} value
	* @returns {Text}
	*/
	function create_text(value = "") {
		return document.createTextNode(value);
	}
	/**
	* @template {Node} N
	* @param {N} node
	*/
	/*@__NO_SIDE_EFFECTS__*/
	function get_first_child(node) {
		return first_child_getter.call(node);
	}
	/**
	* @template {Node} N
	* @param {N} node
	*/
	/*@__NO_SIDE_EFFECTS__*/
	function get_next_sibling(node) {
		return next_sibling_getter.call(node);
	}
	/**
	* Don't mark this as side-effect-free, hydration needs to walk all nodes
	* @template {Node} N
	* @param {N} node
	* @param {boolean} is_text
	* @returns {TemplateNode | null}
	*/
	function child(node, is_text) {
		if (!hydrating) return /* @__PURE__ */ get_first_child(node);
		var child = /* @__PURE__ */ get_first_child(hydrate_node);
		if (child === null) child = hydrate_node.appendChild(create_text());
		else if (is_text && child.nodeType !== 3) {
			var text = create_text();
			child?.before(text);
			set_hydrate_node(text);
			return text;
		}
		if (is_text) merge_text_nodes(child);
		set_hydrate_node(child);
		return child;
	}
	/**
	* Don't mark this as side-effect-free, hydration needs to walk all nodes
	* @param {TemplateNode} node
	* @param {boolean} [is_text]
	* @returns {TemplateNode | null}
	*/
	function first_child(node, is_text = false) {
		if (!hydrating) {
			var first = /* @__PURE__ */ get_first_child(node);
			if (first instanceof Comment && first.data === "") return /* @__PURE__ */ get_next_sibling(first);
			return first;
		}
		if (is_text) {
			if (hydrate_node?.nodeType !== 3) {
				var text = create_text();
				hydrate_node?.before(text);
				set_hydrate_node(text);
				return text;
			}
			merge_text_nodes(hydrate_node);
		}
		return hydrate_node;
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
		if (!hydrating) return /* @__PURE__ */ get_first_child(node);
		var first = child(node, is_text);
		reset(node);
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
		let next_sibling = hydrating ? hydrate_node : node;
		var last_sibling;
		while (count--) {
			last_sibling = next_sibling;
			next_sibling = /* @__PURE__ */ get_next_sibling(next_sibling);
		}
		if (!hydrating) return next_sibling;
		if (is_text) {
			if (next_sibling?.nodeType !== 3) {
				var text = create_text();
				if (next_sibling === null) last_sibling?.after(text);
				else next_sibling.before(text);
				set_hydrate_node(text);
				return text;
			}
			merge_text_nodes(next_sibling);
		}
		set_hydrate_node(next_sibling);
		return next_sibling;
	}
	/**
	* @template {Node} N
	* @param {N} node
	* @returns {void}
	*/
	function clear_text_content(node) {
		node.textContent = "";
	}
	/**
	* Returns `true` if we're updating the current block, for example `condition` in
	* an `{#if condition}` block just changed. In this case, the branch should be
	* appended (or removed) at the same time as other updates within the
	* current `<svelte:boundary>`
	*/
	function should_defer_append() {
		if (!async_mode_flag) return false;
		if (eager_block_effects !== null) return false;
		return (active_effect.f & REACTION_RAN) !== 0;
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
		if (namespace == null || namespace === "http://www.w3.org/1999/xhtml") return is ? document.createElement(tag, { is }) : document.createElement(tag);
		return is ? document.createElementNS(namespace, tag, { is }) : document.createElementNS(namespace, tag);
	}
	/**
	* Browsers split text nodes larger than 65536 bytes when parsing.
	* For hydration to succeed, we need to stitch them back together
	* @param {Text} text
	*/
	function merge_text_nodes(text) {
		if (text.nodeValue.length < 65536) return;
		let next = text.nextSibling;
		while (next !== null && next.nodeType === 3) {
			next.remove();
			/** @type {string} */ text.nodeValue += next.nodeValue;
			next = text.nextSibling;
		}
	}
	/**
	* @param {unknown} error
	*/
	function handle_error(error) {
		var effect = active_effect;
		if (effect === null) {
			/** @type {Derived} */ active_reaction.f |= ERROR_VALUE;
			return error;
		}
		if ((effect.f & 32768) === 0 && (effect.f & 4) === 0) throw error;
		invoke_error_boundary(error, effect);
	}
	/**
	* @param {unknown} error
	* @param {Effect | null} effect
	*/
	function invoke_error_boundary(error, effect) {
		if (effect !== null && (effect.f & 16384) !== 0) return;
		while (effect !== null) {
			if ((effect.f & 128) !== 0 && (effect.f & 33570816) === 0) {
				if ((effect.f & 32768) === 0) throw error;
				try {
					/** @type {Boundary} */ effect.b.error(error);
					return;
				} catch (e) {
					error = e;
				}
			}
			effect = effect.parent;
		}
		throw error;
	}
	//#endregion
	//#region node_modules/svelte/src/internal/client/reactivity/effects.js
	/** @import { Blocker, ComponentContext, ComponentContextLegacy, Derived, Effect, TemplateNode, TransitionManager } from '#client' */
	/**
	* @param {Effect} effect
	* @param {Effect} parent_effect
	*/
	function push_effect(effect, parent_effect) {
		var parent_last = parent_effect.last;
		if (parent_last === null) parent_effect.last = parent_effect.first = effect;
		else {
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
		var parent = active_effect;
		if (parent !== null && (parent.f & 8192) !== 0) type |= INERT;
		/** @type {Effect} */
		var effect = {
			ctx: component_context,
			deps: null,
			nodes: null,
			f: type | DIRTY | 512,
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
		current_batch?.register_created_effect(effect);
		/** @type {Effect | null} */
		var e = effect;
		if ((type & 4) !== 0) {
			if (collected_effects !== null) collected_effects.push(effect);
			else Batch.ensure().schedule(effect);
		} else if (fn !== null) {
			try {
				update_effect(effect);
			} catch (e) {
				destroy_effect(effect);
				throw e;
			}
			if (e.deps === null && e.teardown === null && e.nodes === null && e.first === e.last && (e.f & 524288) === 0) {
				e = e.first;
				if ((type & 16) !== 0 && (type & 65536) !== 0 && e !== null) e.f |= EFFECT_TRANSPARENT;
			}
		}
		if (e !== null) {
			e.parent = parent;
			if (parent !== null) push_effect(e, parent);
			if (active_reaction !== null && (active_reaction.f & 2) !== 0 && (type & 64) === 0) {
				var derived = active_reaction;
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
		return active_reaction !== null && !untracking;
	}
	/**
	* @param {() => void} fn
	*/
	function teardown(fn) {
		const effect = create_effect(8, null);
		set_signal_status(effect, CLEAN);
		effect.teardown = fn;
		return effect;
	}
	/**
	* @param {() => void | (() => void)} fn
	*/
	function create_user_effect(fn) {
		return create_effect(4 | USER_EFFECT, fn);
	}
	/**
	* An effect root whose children can transition out
	* @param {() => void} fn
	* @returns {(options?: { outro?: boolean }) => Promise<void>}
	*/
	function component_root(fn) {
		Batch.ensure();
		const effect = create_effect(64 | EFFECT_PRESERVED, fn);
		return (options = {}) => {
			return new Promise((fulfil) => {
				if (options.outro) pause_effect(effect, () => {
					destroy_effect(effect);
					fulfil(void 0);
				});
				else {
					destroy_effect(effect);
					fulfil(void 0);
				}
			});
		};
	}
	/**
	* @param {() => void | (() => void)} fn
	* @returns {Effect}
	*/
	function effect(fn) {
		return create_effect(4, fn);
	}
	/**
	* @param {() => void | (() => void)} fn
	* @returns {Effect}
	*/
	function async_effect(fn) {
		return create_effect(ASYNC | EFFECT_PRESERVED, fn);
	}
	/**
	* @param {() => void | (() => void)} fn
	* @returns {Effect}
	*/
	function render_effect(fn, flags = 0) {
		return create_effect(8 | flags, fn);
	}
	/**
	* @param {(...expressions: any) => void | (() => void)} fn
	* @param {Array<() => any>} sync
	* @param {Array<() => Promise<any>>} async
	* @param {Blocker[]} blockers
	*/
	function template_effect(fn, sync = [], async = [], blockers = []) {
		flatten(blockers, sync, async, (values) => {
			create_effect(8, () => {
				fn(...values.map(get));
			});
		});
	}
	/**
	* @param {(() => void)} fn
	* @param {number} flags
	*/
	function block(fn, flags = 0) {
		return create_effect(16 | flags, fn);
	}
	/**
	* @param {(() => void)} fn
	*/
	function branch(fn) {
		return create_effect(32 | EFFECT_PRESERVED, fn);
	}
	/**
	* @param {Effect} effect
	*/
	function execute_effect_teardown(effect) {
		var teardown = effect.teardown;
		if (teardown !== null) {
			const previously_destroying_effect = is_destroying_effect;
			const previous_reaction = active_reaction;
			set_is_destroying_effect(true);
			set_active_reaction(null);
			try {
				teardown.call(null);
			} catch (error) {
				invoke_error_boundary(error, effect.parent);
			} finally {
				set_is_destroying_effect(previously_destroying_effect);
				set_active_reaction(previous_reaction);
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
			if (controller !== null) without_reactive_context(() => {
				controller.abort(STALE_REACTION);
			});
			var next = effect.next;
			if ((effect.f & 64) !== 0) effect.parent = null;
			else destroy_effect(effect, remove_dom);
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
			if ((effect.f & 32) === 0) destroy_effect(effect);
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
		if ((remove_dom || (effect.f & 262144) !== 0) && effect.nodes !== null && effect.nodes.end !== null) {
			remove_effect_dom(effect.nodes.start, effect.nodes.end);
			removed = true;
		}
		effect.f |= DESTROYING;
		destroy_effect_children(effect, remove_dom && !removed);
		remove_reactions(effect, 0);
		var transitions = effect.nodes && effect.nodes.t;
		if (transitions !== null) for (const transition of transitions) transition.stop();
		execute_effect_teardown(effect);
		effect.f ^= DESTROYING;
		effect.f |= DESTROYED;
		var parent = effect.parent;
		if (parent !== null && parent.first !== null) unlink_effect(effect);
		effect.next = effect.prev = effect.teardown = effect.ctx = effect.deps = effect.fn = effect.nodes = effect.ac = effect.b = null;
	}
	/**
	*
	* @param {TemplateNode | null} node
	* @param {TemplateNode} end
	*/
	function remove_effect_dom(node, end) {
		while (node !== null) {
			/** @type {TemplateNode | null} */
			var next = node === end ? null : /* @__PURE__ */ get_next_sibling(node);
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
		effect.f |= 256;
		pause_children(effect, transitions, true);
		var fn = () => {
			if (destroy) destroy_effect(effect);
			if (callback) callback();
		};
		var remaining = transitions.length;
		if (remaining > 0) {
			var check = () => --remaining || fn();
			for (var transition of transitions) transition.out(check);
		} else fn();
	}
	/**
	* @param {Effect} effect
	* @param {TransitionManager[]} transitions
	* @param {boolean} local
	*/
	function pause_children(effect, transitions, local) {
		if ((effect.f & 8192) !== 0) return;
		effect.f ^= INERT;
		var t = effect.nodes && effect.nodes.t;
		if (t !== null) {
			for (const transition of t) if (transition.is_global || local) transitions.push(transition);
		}
		var child = effect.first;
		while (child !== null) {
			var sibling = child.next;
			if ((child.f & 64) === 0) {
				var transparent = (child.f & 65536) !== 0 || (child.f & 32) !== 0 && (effect.f & 16) !== 0;
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
		effect.f &= -257;
		resume_children(effect, true);
	}
	/**
	* @param {Effect} effect
	* @param {boolean} local
	*/
	function resume_children(effect, local) {
		if ((effect.f & 256) !== 0) return;
		if ((effect.f & 8192) === 0) return;
		effect.f ^= INERT;
		if ((effect.f & 1024) === 0) {
			set_signal_status(effect, DIRTY);
			Batch.ensure().schedule(effect);
		}
		var child = effect.first;
		while (child !== null) {
			var sibling = child.next;
			var transparent = (child.f & 65536) !== 0 || (child.f & 32) !== 0;
			resume_children(child, transparent ? local : false);
			child = sibling;
		}
		var t = effect.nodes && effect.nodes.t;
		if (t !== null) {
			for (const transition of t) if (transition.is_global || local) transition.in();
		}
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
			var next = node === end ? null : /* @__PURE__ */ get_next_sibling(node);
			fragment.append(node);
			node = next;
		}
	}
	//#endregion
	//#region node_modules/svelte/src/internal/client/legacy.js
	/**
	* @type {Set<Value> | null}
	* @deprecated
	*/
	var captured_signals = null;
	//#endregion
	//#region node_modules/svelte/src/internal/client/runtime.js
	/** @import { Derived, Effect, Reaction, Source, Value } from '#client' */
	/**
	* True if updating in an effect context that is reactive (i.e. not branch/root effects)
	*/
	var is_updating_effect = false;
	var is_destroying_effect = false;
	/** @param {boolean} value */
	function set_is_destroying_effect(value) {
		is_destroying_effect = value;
	}
	/** @type {null | Reaction} */
	var active_reaction = null;
	var untracking = false;
	/** @param {null | Reaction} reaction */
	function set_active_reaction(reaction) {
		active_reaction = reaction;
	}
	/** @type {null | Effect} */
	var active_effect = null;
	/** @param {null | Effect} effect */
	function set_active_effect(effect) {
		active_effect = effect;
	}
	/**
	* When sources are created within a reaction, reading and writing
	* them within that reaction should not cause a re-run
	* @type {null | Set<Source>}
	*/
	var current_sources = null;
	/** @param {Value} value */
	function push_reaction_value(value) {
		if (active_reaction !== null && (!async_mode_flag && (active_reaction.f & 2097152) !== 0 || (active_reaction.f & 2) !== 0)) (current_sources ??= /* @__PURE__ */ new Set()).add(value);
	}
	/**
	* The dependencies of the reaction that is currently being executed. In many cases,
	* the dependencies are unchanged between runs, and so this will be `null` unless
	* and until a new dependency is accessed — we track this via `skipped_deps`
	* @type {null | Value[]}
	*/
	var new_deps = null;
	var skipped_deps = 0;
	/**
	* Tracks writes that the effect it's executed in doesn't listen to yet,
	* so that the dependency can be added to the effect later on if it then reads it
	* @type {null | Source[]}
	*/
	var untracked_writes = null;
	/** @param {null | Source[]} value */
	function set_untracked_writes(value) {
		untracked_writes = value;
	}
	/**
	* @type {number} Used by sources and deriveds for handling updates.
	* Version starts from 1 so that unowned deriveds differentiate between a created effect and a run one for tracing
	**/
	var write_version = 1;
	/** @type {number} Used to version each read of a source of derived to avoid duplicating dependencies inside a reaction */
	var read_version = 0;
	var update_version = read_version;
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
		if ((flags & 2048) !== 0) return true;
		if ((flags & 4096) !== 0) {
			var dependencies = reaction.deps;
			var length = dependencies.length;
			for (var i = 0; i < length; i++) {
				var dependency = dependencies[i];
				if (is_dirty(dependency)) update_derived(dependency);
				if (dependency.wv > reaction.wv) return true;
			}
			if ((flags & 512) !== 0 && batch_values === null) set_signal_status(reaction, CLEAN);
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
		if (!async_mode_flag && current_sources !== null && current_sources.has(signal)) return;
		for (var i = 0; i < reactions.length; i++) {
			var reaction = reactions[i];
			if ((reaction.f & 2) !== 0) schedule_possible_effect_self_invalidation(reaction, effect, false);
			else if (effect === reaction) {
				if (root) set_signal_status(reaction, DIRTY);
				else if ((reaction.f & 1024) !== 0) set_signal_status(reaction, MAYBE_DIRTY);
				schedule_effect(reaction);
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
		var previous_component_context = component_context;
		var previous_untracking = untracking;
		var previous_update_version = update_version;
		var flags = reaction.f;
		new_deps = null;
		skipped_deps = 0;
		untracked_writes = null;
		active_reaction = (flags & 96) === 0 ? reaction : null;
		current_sources = null;
		set_component_context(reaction.ctx);
		untracking = false;
		update_version = ++read_version;
		if (reaction.ac !== null) {
			without_reactive_context(() => {
				/** @type {AbortController} */ reaction.ac.abort(STALE_REACTION);
			});
			reaction.ac = null;
		}
		try {
			reaction.f |= REACTION_IS_UPDATING;
			var fn = reaction.fn;
			var result = fn();
			reaction.f |= REACTION_RAN;
			var deps = update_dependencies(reaction);
			if (is_runes() && untracked_writes !== null && !untracking && deps !== null && (reaction.f & 6146) === 0) for (var i = 0; i < untracked_writes.length; i++) schedule_possible_effect_self_invalidation(untracked_writes[i], reaction);
			if (previous_reaction !== null && previous_reaction !== reaction) {
				read_version++;
				if (previous_reaction.deps !== null) for (let i = 0; i < previous_skipped_deps; i += 1) previous_reaction.deps[i].rv = read_version;
				if (previous_deps !== null) for (const dep of previous_deps) dep.rv = read_version;
				if (untracked_writes !== null) {
					if (previous_untracked_writes === null) previous_untracked_writes = untracked_writes;
					else previous_untracked_writes.push(...untracked_writes);
				}
			}
			if ((reaction.f & 8388608) !== 0) reaction.f ^= ERROR_VALUE;
			return result;
		} catch (error) {
			update_dependencies(reaction);
			return handle_error(error);
		} finally {
			reaction.f ^= REACTION_IS_UPDATING;
			new_deps = previous_deps;
			skipped_deps = previous_skipped_deps;
			untracked_writes = previous_untracked_writes;
			active_reaction = previous_reaction;
			current_sources = previous_sources;
			set_component_context(previous_component_context);
			untracking = previous_untracking;
			update_version = previous_update_version;
		}
	}
	/**
	* @param {Reaction} reaction
	*/
	function update_dependencies(reaction) {
		var deps = reaction.deps;
		var is_fork = current_batch?.is_fork;
		if (new_deps !== null) {
			var i;
			if (!is_fork) remove_reactions(reaction, skipped_deps);
			if (deps !== null && skipped_deps > 0) {
				deps.length = skipped_deps + new_deps.length;
				for (i = 0; i < new_deps.length; i++) deps[skipped_deps + i] = new_deps[i];
			} else reaction.deps = deps = new_deps;
			if (effect_tracking() && (reaction.f & 512) !== 0) for (i = skipped_deps; i < deps.length; i++) (deps[i].reactions ??= []).push(reaction);
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
			var index = index_of.call(reactions, signal);
			if (index !== -1) {
				var new_length = reactions.length - 1;
				if (new_length === 0) reactions = dependency.reactions = null;
				else {
					reactions[index] = reactions[new_length];
					reactions.pop();
				}
			}
		}
		if (reactions === null && (dependency.f & 2) !== 0 && (new_deps === null || !includes.call(new_deps, dependency))) {
			var derived = dependency;
			if ((derived.f & 512) !== 0) derived.f ^= 512;
			if (derived.v !== UNINITIALIZED) update_derived_status(derived);
			if (derived.ac !== null) without_reactive_context(() => {
				/** @type {AbortController} */ derived.ac.abort(STALE_REACTION);
				derived.ac = null;
				set_signal_status(derived, DIRTY);
			});
			freeze_derived_effects(derived);
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
		for (var i = start_index; i < dependencies.length; i++) remove_reaction(signal, dependencies[i]);
	}
	/**
	* @param {Effect} effect
	* @returns {void}
	*/
	function update_effect(effect) {
		var flags = effect.f;
		if ((flags & 16384) !== 0) return;
		set_signal_status(effect, CLEAN);
		var previous_effect = active_effect;
		var was_updating_effect = is_updating_effect;
		active_effect = effect;
		is_updating_effect = (flags & 96) === 0;
		try {
			if ((flags & 16777232) !== 0) destroy_block_effect_children(effect);
			else destroy_effect_children(effect);
			execute_effect_teardown(effect);
			var teardown = update_reaction(effect);
			effect.teardown = typeof teardown === "function" ? teardown : null;
			effect.wv = write_version;
		} finally {
			is_updating_effect = was_updating_effect;
			active_effect = previous_effect;
		}
	}
	/**
	* @template V
	* @param {Value<V>} signal
	* @returns {V}
	*/
	function get(signal) {
		var is_derived = (signal.f & 2) !== 0;
		captured_signals?.add(signal);
		if (active_reaction !== null && !untracking) {
			if (!(active_effect !== null && (active_effect.f & 16384) !== 0) && (current_sources === null || !current_sources.has(signal))) {
				var deps = active_reaction.deps;
				if ((active_reaction.f & 2097152) !== 0) {
					if (signal.rv < read_version) {
						signal.rv = read_version;
						if (new_deps === null && deps !== null && deps[skipped_deps] === signal) skipped_deps++;
						else if (new_deps === null) new_deps = [signal];
						else new_deps.push(signal);
					}
				} else {
					active_reaction.deps ??= [];
					if (!includes.call(active_reaction.deps, signal)) active_reaction.deps.push(signal);
					var reactions = signal.reactions;
					if (reactions === null) signal.reactions = [active_reaction];
					else if (!includes.call(reactions, active_reaction)) reactions.push(active_reaction);
				}
			}
		}
		if (is_destroying_effect && old_values.has(signal)) return old_values.get(signal);
		if (is_derived) {
			var derived = signal;
			if (is_destroying_effect) {
				var value = derived.v;
				if ((derived.f & 1024) === 0 && derived.reactions !== null || depends_on_old_values(derived)) value = execute_derived(derived);
				old_values.set(derived, value);
				return value;
			}
			var should_connect = (derived.f & 512) === 0 && !untracking && active_reaction !== null && (is_updating_effect || (active_reaction.f & 512) !== 0);
			var is_new = (derived.f & REACTION_RAN) === 0;
			if (is_dirty(derived)) {
				if (should_connect) derived.f |= 512;
				update_derived(derived);
			}
			if (should_connect && !is_new) {
				unfreeze_derived_effects(derived);
				reconnect(derived);
			}
		}
		if (batch_values?.has(signal)) return batch_values.get(signal);
		if ((signal.f & 8388608) !== 0) throw signal.v;
		return signal.v;
	}
	/**
	* (Re)connect a disconnected derived, so that it is notified
	* of changes in `mark_reactions`
	* @param {Derived} derived
	*/
	function reconnect(derived) {
		derived.f |= 512;
		if (derived.deps === null) return;
		for (const dep of derived.deps) {
			(dep.reactions ??= []).push(derived);
			if ((dep.f & 2) !== 0 && (dep.f & 512) === 0) {
				unfreeze_derived_effects(dep);
				reconnect(dep);
			}
		}
	}
	/** @param {Derived} derived */
	function depends_on_old_values(derived) {
		if (derived.v === UNINITIALIZED) return true;
		if (derived.deps === null) return false;
		for (const dep of derived.deps) {
			if (old_values.has(dep)) return true;
			if ((dep.f & 2) !== 0 && depends_on_old_values(dep)) return true;
		}
		return false;
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
	* Subset of delegated events which should be passive by default.
	* These two are already passive via browser defaults on window, document and body.
	* But since
	* - we're delegating them
	* - they happen often
	* - they apply to mobile which is generally less performant
	* we're marking them as passive by default for other elements, too.
	*/
	var PASSIVE_EVENTS = ["touchstart", "touchmove"];
	/**
	* Returns `true` if `name` is a passive event
	* @param {string} name
	*/
	function is_passive_event(name) {
		return PASSIVE_EVENTS.includes(name);
	}
	//#endregion
	//#region node_modules/svelte/src/internal/client/dom/elements/events.js
	/**
	* Used on elements, as a map of event type -> event handler,
	* and on events themselves to track which element handled an event
	*/
	var event_symbol = Symbol("events");
	/** @type {Set<string>} */
	var all_registered_events = /* @__PURE__ */ new Set();
	/** @type {Set<(events: Array<string>) => void>} */
	var root_event_handles = /* @__PURE__ */ new Set();
	/**
	* @param {string} event_name
	* @param {Element} element
	* @param {EventListener} [handler]
	* @returns {void}
	*/
	function delegated(event_name, element, handler) {
		(element[event_symbol] ??= {})[event_name] = handler;
	}
	/**
	* @param {Array<string>} events
	* @returns {void}
	*/
	function delegate(events) {
		for (var i = 0; i < events.length; i++) all_registered_events.add(events[i]);
		for (var fn of root_event_handles) fn(events);
	}
	var last_propagated_event = null;
	var last_propagated_event_clear_scheduled = false;
	/**
	* @this {EventTarget}
	* @param {Event} event
	* @returns {void}
	*/
	function handle_event_propagation(event) {
		var handler_element = this;
		var owner_document = handler_element.ownerDocument;
		var event_name = event.type;
		var path = event.composedPath?.() || [];
		var current_target = path[0] || event.target;
		last_propagated_event = event;
		if (!last_propagated_event_clear_scheduled) {
			last_propagated_event_clear_scheduled = true;
			setTimeout(() => {
				last_propagated_event_clear_scheduled = false;
				last_propagated_event = null;
			});
		}
		var path_idx = 0;
		var handled_at = last_propagated_event === event && event[event_symbol];
		if (handled_at) {
			var at_idx = path.indexOf(handled_at);
			if (at_idx !== -1 && (handler_element === document || handler_element === window)) {
				event[event_symbol] = handler_element;
				return;
			}
			var handler_idx = path.indexOf(handler_element);
			if (handler_idx === -1) return;
			if (at_idx <= handler_idx) path_idx = at_idx;
		}
		current_target = path[path_idx] || event.target;
		if (current_target === handler_element) return;
		define_property(event, "currentTarget", {
			configurable: true,
			get() {
				return current_target || owner_document;
			}
		});
		var previous_reaction = active_reaction;
		var previous_effect = active_effect;
		set_active_reaction(null);
		set_active_effect(null);
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
					var delegated = current_target[event_symbol]?.[event_name];
					if (delegated != null && (!current_target.disabled || event.target === current_target)) delegated.call(current_target, event);
				} catch (error) {
					if (throw_error) other_errors.push(error);
					else throw_error = error;
				}
				if (event.cancelBubble) break;
				path_idx++;
				current_target = path_idx < path.length ? path[path_idx] : null;
			}
			if (throw_error) {
				for (let error of other_errors) queueMicrotask(() => {
					throw error;
				});
				throw throw_error;
			}
		} finally {
			event[event_symbol] = handler_element;
			delete event.currentTarget;
			set_active_reaction(previous_reaction);
			set_active_effect(previous_effect);
		}
	}
	//#endregion
	//#region node_modules/svelte/src/internal/client/dom/reconciler.js
	var policy = globalThis?.window?.trustedTypes && /* @__PURE__ */ globalThis.window.trustedTypes.createPolicy("svelte-trusted-html", { 
	/** @param {string} html */
createHTML: (html) => {
		return html;
	} });
	/** @param {string} html */
	function create_trusted_html(html) {
		return policy?.createHTML(html) ?? html;
	}
	/**
	* @param {string} html
	*/
	function create_fragment_from_html(html) {
		var elem = create_element("template");
		elem.innerHTML = create_trusted_html(html.replaceAll("<!>", "<!---->"));
		return elem.content;
	}
	//#endregion
	//#region node_modules/svelte/src/internal/client/dom/template.js
	/** @import { Effect, EffectNodes, TemplateNode } from '#client' */
	/** @import { TemplateStructure } from './types' */
	/**
	* @param {TemplateNode} start
	* @param {TemplateNode | null} end
	*/
	function assign_nodes(start, end) {
		var effect = active_effect;
		if (effect.nodes === null) effect.nodes = {
			start,
			end,
			a: null,
			t: null
		};
	}
	/**
	* @param {string} content
	* @param {number} flags
	* @returns {() => Node | Node[]}
	*/
	/*#__NO_SIDE_EFFECTS__*/
	function from_html(content, flags) {
		var is_fragment = (flags & 1) !== 0;
		var use_import_node = (flags & 2) !== 0;
		/** @type {Node} */
		var node;
		/**
		* Whether or not the first item is a text/element node. If not, we need to
		* create an additional comment node to act as `effect.nodes.start`
		*/
		var has_start = !content.startsWith("<!>");
		return () => {
			if (hydrating) {
				assign_nodes(hydrate_node, null);
				return hydrate_node;
			}
			if (node === void 0) {
				node = create_fragment_from_html(has_start ? content : "<!>" + content);
				if (!is_fragment) node = /* @__PURE__ */ get_first_child(node);
			}
			var clone = use_import_node || is_firefox ? document.importNode(node, true) : node.cloneNode(true);
			if (is_fragment) {
				var start = /* @__PURE__ */ get_first_child(clone);
				var end = clone.lastChild;
				assign_nodes(start, end);
			} else assign_nodes(clone, clone);
			return clone;
		};
	}
	/**
	* @returns {TemplateNode | DocumentFragment}
	*/
	function comment() {
		if (hydrating) {
			assign_nodes(hydrate_node, null);
			return hydrate_node;
		}
		var frag = document.createDocumentFragment();
		var start = document.createComment("");
		var anchor = create_text();
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
		if (hydrating) {
			var effect = active_effect;
			if ((effect.f & 32768) === 0 || effect.nodes.end === null) effect.nodes.end = hydrate_node;
			hydrate_next();
			return;
		}
		if (anchor === null) return;
		anchor.before(dom);
	}
	//#endregion
	//#region node_modules/svelte/src/reactivity/create-subscriber.js
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
		let version = source(0);
		/** @type {(() => void) | void} */
		let stop;
		return () => {
			if (effect_tracking()) {
				get(version);
				render_effect(() => {
					if (subscribers === 0) stop = untrack(() => start(() => increment(version)));
					subscribers += 1;
					return () => {
						queue_micro_task(() => {
							subscribers -= 1;
							if (subscribers === 0) {
								stop?.();
								stop = void 0;
								increment(version);
							}
						});
					};
				});
			}
		};
	}
	//#endregion
	//#region node_modules/svelte/src/internal/client/dom/blocks/boundary.js
	/** @import { Effect, Source, TemplateNode, } from '#client' */
	/**
	* @typedef {{
	* 	 onerror?: ((error: unknown, reset: () => void) => void) | null;
	*   failed?: ((anchor: Node, error: () => unknown, reset: () => () => void) => void) | null;
	*   pending?: ((anchor: Node) => void) | null;
	* }} BoundaryProps
	*/
	var flags = EFFECT_TRANSPARENT | EFFECT_PRESERVED;
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
	var Boundary = class {
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
		#hydrate_open = hydrating ? hydrate_node : null;
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
		#dirty_effects = /* @__PURE__ */ new Set();
		/** @type {Set<Effect>} */
		#maybe_dirty_effects = /* @__PURE__ */ new Set();
		/**
		* A source containing the number of pending async deriveds/expressions.
		* Only created if `$effect.pending()` is used inside the boundary,
		* otherwise updating the source results in needless `Batch.ensure()`
		* calls followed by no-op flushes
		* @type {Source<number> | null}
		*/
		#effect_pending = null;
		#effect_pending_subscriber = createSubscriber(() => {
			this.#effect_pending = source(this.#local_pending_count);
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
				var effect = active_effect;
				effect.b = this;
				effect.f |= 128;
				children(anchor);
			};
			this.parent = active_effect.b;
			this.transform_error = transform_error ?? this.parent?.transform_error ?? ((e) => e);
			this.#effect = block(() => {
				if (hydrating) {
					const comment = this.#hydrate_open;
					hydrate_next();
					const server_rendered_pending = comment.data === "[!";
					if (comment.data.startsWith("[?")) {
						const serialized_error = JSON.parse(comment.data.slice(2));
						this.#hydrate_failed_content(serialized_error);
					} else if (server_rendered_pending) this.#hydrate_pending_content();
					else this.#hydrate_resolved_content();
				} else this.#render();
			}, flags);
			if (hydrating) this.#anchor = hydrate_node;
		}
		#hydrate_resolved_content() {
			try {
				this.#main_effect = branch(() => this.#children(this.#anchor));
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
			queue_micro_task(invoke_onerror);
			if (!failed) return;
			this.#failed_effect = branch(() => {
				failed(this.#anchor, () => error, () => reset);
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
					svelte_boundary_reset_noop();
					return;
				}
				did_reset = true;
				if (calling_on_error) svelte_boundary_reset_onerror();
				if (this.#failed_effect !== null) pause_effect(this.#failed_effect, () => {
					this.#failed_effect = null;
				});
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
					invoke_error_boundary(err, this.#effect && this.#effect.parent);
				}
			};
			return {
				reset,
				invoke_onerror
			};
		}
		#hydrate_pending_content() {
			const pending = this.#props.pending;
			if (!pending) return;
			this.is_pending = true;
			this.#pending_effect = branch(() => pending(this.#anchor));
			queue_micro_task(() => {
				var fragment = this.#offscreen_fragment = document.createDocumentFragment();
				var anchor = create_text();
				var handled = false;
				fragment.append(anchor);
				this.#main_effect = this.#run(() => {
					try {
						return branch(() => this.#children(anchor));
					} catch (error) {
						try {
							this.error(error);
							handled = true;
						} catch (error) {
							invoke_error_boundary(error, this.#effect.parent);
						}
						return null;
					}
				});
				if (this.#main_effect === null) {
					this.#offscreen_fragment = null;
					if (handled) this.#resolve(current_batch);
					return;
				}
				if (this.#pending_count === 0) {
					this.#anchor.before(fragment);
					this.#offscreen_fragment = null;
					pause_effect(this.#pending_effect, () => {
						this.#pending_effect = null;
					});
					this.#resolve(current_batch);
				}
			});
		}
		#render() {
			try {
				this.is_pending = this.has_pending_snippet();
				this.#pending_count = 0;
				this.#local_pending_count = 0;
				this.#main_effect = branch(() => {
					this.#children(this.#anchor);
				});
				if (this.#pending_count > 0) {
					var fragment = this.#offscreen_fragment = document.createDocumentFragment();
					move_effect(this.#main_effect, fragment);
					const pending = this.#props.pending;
					this.#pending_effect = branch(() => pending(this.#anchor));
				} else this.#resolve(current_batch);
			} catch (error) {
				this.error(error);
			}
		}
		/**
		* @param {Batch} batch
		*/
		#resolve(batch) {
			this.is_pending = false;
			batch.transfer_effects(this.#dirty_effects, this.#maybe_dirty_effects);
		}
		/**
		* Defer an effect inside a pending boundary until the boundary resolves
		* @param {Effect} effect
		*/
		defer_effect(effect) {
			defer_effect(effect, this.#dirty_effects, this.#maybe_dirty_effects);
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
			var previous_effect = active_effect;
			var previous_reaction = active_reaction;
			var previous_ctx = component_context;
			set_active_effect(this.#effect);
			set_active_reaction(this.#effect);
			set_component_context(this.#effect.ctx);
			try {
				Batch.ensure();
				return fn();
			} finally {
				set_active_effect(previous_effect);
				set_active_reaction(previous_reaction);
				set_component_context(previous_ctx);
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
				if (this.parent) this.parent.#update_pending_count(d, batch);
				return;
			}
			this.#pending_count += d;
			if (this.#pending_count === 0) {
				this.#resolve(batch);
				if (this.#pending_effect) pause_effect(this.#pending_effect, () => {
					this.#pending_effect = null;
				});
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
			queue_micro_task(() => {
				this.#pending_count_update_queued = false;
				if (this.#effect_pending) internal_set(this.#effect_pending, this.#local_pending_count);
			});
		}
		get_effect_pending() {
			this.#effect_pending_subscriber();
			return get(this.#effect_pending);
		}
		/** @param {unknown} error */
		error(error) {
			if (!this.#props.onerror && !this.#props.failed) throw error;
			if (current_batch?.is_fork) {
				if (this.#main_effect) current_batch.skip_effect(this.#main_effect);
				if (this.#pending_effect) current_batch.skip_effect(this.#pending_effect);
				if (this.#failed_effect) current_batch.skip_effect(this.#failed_effect);
				current_batch.oncommit(() => {
					this.#handle_error(error);
				});
			} else this.#handle_error(error);
		}
		/**
		* @param {unknown} error
		*/
		#handle_error(error) {
			if (this.#main_effect) {
				destroy_effect(this.#main_effect);
				this.#main_effect = null;
			}
			if (this.#pending_effect) {
				destroy_effect(this.#pending_effect);
				this.#pending_effect = null;
			}
			if (this.#failed_effect) {
				destroy_effect(this.#failed_effect);
				this.#failed_effect = null;
			}
			if (hydrating) {
				set_hydrate_node(this.#hydrate_open);
				next();
				set_hydrate_node(skip_nodes());
			}
			let failed = this.#props.failed;
			/** @param {unknown} transformed_error */
			const handle_error_result = (transformed_error) => {
				const { reset, invoke_onerror } = this.#create_reset(transformed_error);
				invoke_onerror();
				if (failed) this.#failed_effect = this.#run(() => {
					try {
						return branch(() => {
							var effect = active_effect;
							effect.b = this;
							effect.f |= 128;
							failed(this.#anchor, () => transformed_error, () => reset);
						});
					} catch (error) {
						invoke_error_boundary(error, this.#effect.parent);
						return null;
					}
				});
			};
			queue_micro_task(() => {
				/** @type {unknown} */
				var result;
				try {
					result = this.transform_error(error);
				} catch (e) {
					invoke_error_boundary(e, this.#effect && this.#effect.parent);
					return;
				}
				if (result !== null && typeof result === "object" && typeof result.then === "function")
 /** @type {any} */ result.then(
					handle_error_result,
					/** @param {unknown} e */
					(e) => invoke_error_boundary(e, this.#effect && this.#effect.parent)
				);
				else handle_error_result(result);
			});
		}
	};
	/**
	* @param {Element} text
	* @param {string} value
	* @returns {void}
	*/
	function set_text(text, value) {
		var str = value == null ? "" : typeof value === "object" ? `${value}` : value;
		if (str !== (text[TEXT_CACHE] ??= text.nodeValue)) {
			/** @type {any} */ text[TEXT_CACHE] = str;
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
	/** @type {Map<EventTarget, Map<string, number>>} */
	var listeners = /* @__PURE__ */ new Map();
	/**
	* @template {Record<string, any>} Exports
	* @param {ComponentType<SvelteComponent<any>> | Component<any>} Component
	* @param {MountOptions} options
	* @returns {Exports}
	*/
	function _mount(Component, { target, anchor, props = {}, events, context, intro = true, transformError }) {
		init_operations();
		/** @type {Exports} */
		var component = void 0;
		var unmount = component_root(() => {
			var anchor_node = anchor ?? target.appendChild(create_text());
			boundary(anchor_node, { pending: () => {} }, (anchor_node) => {
				push({});
				var ctx = component_context;
				if (context) ctx.c = context;
				if (events)
 /** @type {any} */ props.$$events = events;
				if (hydrating) assign_nodes(anchor_node, null);
				component = Component(anchor_node, props) || mark_as_component();
				if (hydrating) {
					/** @type {Effect & { nodes: EffectNodes }} */ active_effect.nodes.end = hydrate_node;
					if (hydrate_node === null || hydrate_node.nodeType !== 8 || hydrate_node.data !== "]") {
						hydration_mismatch();
						throw HYDRATION_ERROR;
					}
				}
				pop();
			}, transformError);
			/** @type {Set<string>} */
			var registered_events = /* @__PURE__ */ new Set();
			/** @param {Array<string>} events */
			var event_handle = (events) => {
				for (var i = 0; i < events.length; i++) {
					var event_name = events[i];
					if (registered_events.has(event_name)) continue;
					registered_events.add(event_name);
					var passive = is_passive_event(event_name);
					for (const node of [target, document]) {
						var counts = listeners.get(node);
						if (counts === void 0) {
							counts = /* @__PURE__ */ new Map();
							listeners.set(node, counts);
						}
						var count = counts.get(event_name);
						if (count === void 0) {
							node.addEventListener(event_name, handle_event_propagation, { passive });
							counts.set(event_name, 1);
						} else counts.set(event_name, count + 1);
					}
				}
			};
			event_handle(array_from(all_registered_events));
			root_event_handles.add(event_handle);
			return () => {
				for (var event_name of registered_events) for (const node of [target, document]) {
					var counts = listeners.get(node);
					var count = counts.get(event_name);
					if (--count == 0) {
						node.removeEventListener(event_name, handle_event_propagation);
						counts.delete(event_name);
						if (counts.size === 0) listeners.delete(node);
					} else counts.set(event_name, count);
				}
				root_event_handles.delete(event_handle);
				if (anchor_node !== anchor) anchor_node.parentNode?.removeChild(anchor_node);
			};
		});
		mounted_components.set(component, unmount);
		return component;
	}
	/**
	* References of the components that were mounted or hydrated.
	* Uses a `WeakMap` to avoid memory leaks.
	*/
	var mounted_components = /* @__PURE__ */ new WeakMap();
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
		return Promise.resolve();
	}
	//#endregion
	//#region node_modules/svelte/src/internal/client/dom/blocks/branches.js
	/** @import { Effect, TemplateNode } from '#client' */
	/**
	* @typedef {{ effect: Effect, fragment: DocumentFragment }} Branch
	*/
	/**
	* @template Key
	*/
	var BranchManager = class {
		/** @type {TemplateNode} */
		anchor;
		/** @type {Map<Batch, Key>} */
		#batches = /* @__PURE__ */ new Map();
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
		#onscreen = /* @__PURE__ */ new Map();
		/**
		* Similar to #onscreen with respect to the keys, but contains branches that are not yet
		* in the DOM, because their insertion is deferred.
		* @type {Map<Key, Branch>}
		*/
		#offscreen = /* @__PURE__ */ new Map();
		/**
		* Keys of effects that are currently outroing
		* @type {Set<Key>}
		*/
		#outroing = /* @__PURE__ */ new Set();
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
			if (!this.#batches.has(batch)) return;
			var key = this.#batches.get(batch);
			var onscreen = this.#onscreen.get(key);
			if (onscreen) {
				resume_effect(onscreen);
				this.#outroing.delete(key);
			} else {
				var offscreen = this.#offscreen.get(key);
				if (offscreen) {
					resume_effect(offscreen.effect);
					this.#onscreen.set(key, offscreen.effect);
					this.#offscreen.delete(key);
					/** @type {TemplateNode} */ offscreen.fragment.lastChild.remove();
					this.anchor.before(offscreen.fragment);
					onscreen = offscreen.effect;
				}
			}
			for (const [b, k] of this.#batches) {
				this.#batches.delete(b);
				if (b === batch) break;
				const offscreen = this.#offscreen.get(k);
				if (offscreen) {
					destroy_effect(offscreen.effect);
					this.#offscreen.delete(k);
				}
			}
			for (const [k, effect] of this.#onscreen) {
				if (k === key || this.#outroing.has(k)) continue;
				const on_destroy = () => {
					if (Array.from(this.#batches.values()).includes(k)) {
						var fragment = document.createDocumentFragment();
						move_effect(effect, fragment);
						fragment.append(create_text());
						this.#offscreen.set(k, {
							effect,
							fragment
						});
					} else destroy_effect(effect);
					this.#outroing.delete(k);
					this.#onscreen.delete(k);
				};
				if (this.#transition || !onscreen) {
					this.#outroing.add(k);
					pause_effect(effect, on_destroy, false);
				} else on_destroy();
			}
		};
		/**
		* @param {Batch} batch
		*/
		#discard = (batch) => {
			this.#batches.delete(batch);
			const keys = Array.from(this.#batches.values());
			for (const [k, branch] of this.#offscreen) if (!keys.includes(k)) {
				destroy_effect(branch.effect);
				this.#offscreen.delete(k);
			}
		};
		/**
		*
		* @param {any} key
		* @param {null | ((target: TemplateNode) => void)} fn
		*/
		ensure(key, fn) {
			var batch = current_batch;
			var defer = should_defer_append();
			if (fn && !this.#onscreen.has(key) && !this.#offscreen.has(key)) {
				if (defer) {
					var fragment = document.createDocumentFragment();
					var target = create_text();
					fragment.append(target);
					this.#offscreen.set(key, {
						effect: branch(() => fn(target)),
						fragment
					});
				} else this.#onscreen.set(key, branch(() => fn(this.anchor)));
			}
			this.#batches.set(batch, key);
			if (defer) {
				for (const [k, effect] of this.#onscreen) if (k === key) batch.unskip_effect(effect);
				else batch.skip_effect(effect);
				for (const [k, branch] of this.#offscreen) if (k === key) batch.unskip_effect(branch.effect);
				else batch.skip_effect(branch.effect);
				batch.oncommit(this.#commit);
				batch.ondiscard(this.#discard);
			} else {
				if (hydrating) this.anchor = hydrate_node;
				this.#commit(batch);
			}
		}
	};
	//#endregion
	//#region node_modules/svelte/src/internal/client/dom/blocks/if.js
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
		if (hydrating) {
			marker = hydrate_node;
			hydrate_next();
		}
		var branches = new BranchManager(node);
		var flags = elseif ? EFFECT_TRANSPARENT : 0;
		/**
		* @param {number | false} key
		* @param {null | ((anchor: Node) => void)} fn
		*/
		function update_branch(key, fn) {
			if (hydrating) {
				var data = read_hydration_instruction(marker);
				if (key !== parseInt(data.substring(1))) {
					var anchor = skip_nodes();
					set_hydrate_node(anchor);
					branches.anchor = anchor;
					set_hydrating(false);
					branches.ensure(key, fn);
					set_hydrating(true);
					return;
				}
			}
			branches.ensure(key, fn);
		}
		block(() => {
			var has_branch = false;
			fn((fn, key = 0) => {
				has_branch = true;
				update_branch(key, fn);
			});
			if (!has_branch) update_branch(-1, null);
		}, flags);
	}
	//#endregion
	//#region node_modules/svelte/src/internal/client/dom/blocks/each.js
	/** @import { EachItem, EachOutroGroup, EachState, Effect, EffectNodes, MaybeSource, Source, TemplateNode, TransitionManager, Value } from '#client' */
	/** @import { Batch } from '../../reactivity/batch.js'; */
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
			pause_effect(effect, () => {
				if (group) {
					group.pending.delete(effect);
					group.done.add(effect);
					if (group.pending.size === 0) {
						var groups = state.outrogroups;
						destroy_effects(state, array_from(group.done));
						groups.delete(group);
						if (groups.size === 0) state.outrogroups = null;
					}
				} else remaining -= 1;
			}, false);
		}
		if (remaining === 0) {
			var fast_path = transitions.length === 0 && controlled_anchor !== null && state.pending.size === 0;
			if (fast_path) {
				var anchor = controlled_anchor;
				var parent_node = anchor.parentNode;
				clear_text_content(parent_node);
				parent_node.append(anchor);
				state.items.clear();
			}
			destroy_effects(state, to_destroy, !fast_path);
		} else {
			group = {
				pending: new Set(to_destroy),
				done: /* @__PURE__ */ new Set()
			};
			(state.outrogroups ??= /* @__PURE__ */ new Set()).add(group);
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
		if (state.pending.size > 0) {
			preserved_effects = /* @__PURE__ */ new Set();
			for (const keys of state.pending.values()) for (const key of keys) preserved_effects.add(
				/** @type {EachItem} */
				state.items.get(key).e
			);
		}
		for (var i = 0; i < to_destroy.length; i++) {
			var e = to_destroy[i];
			if (preserved_effects?.has(e)) {
				e.f |= EFFECT_OFFSCREEN;
				move_effect(e, document.createDocumentFragment());
			} else destroy_effect(to_destroy[i], remove_dom);
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
		var items = /* @__PURE__ */ new Map();
		if ((flags & 4) !== 0) {
			var parent_node = node;
			anchor = hydrating ? set_hydrate_node(/* @__PURE__ */ get_first_child(parent_node)) : parent_node.appendChild(create_text());
		}
		if (hydrating) hydrate_next();
		/** @type {Effect | null} */
		var fallback = null;
		var each_array = /* @__PURE__ */ derived_safe_equal(() => {
			var collection = get_collection();
			return is_array(collection) ? collection : collection == null ? [] : array_from(collection);
		});
		/** @type {V[]} */
		var array;
		/** @type {Map<Batch, Set<any>>} */
		var pending = /* @__PURE__ */ new Map();
		var first_run = true;
		/**
		* @param {Batch} batch
		*/
		function commit(batch) {
			if ((state.effect.f & 16384) !== 0) return;
			state.pending.delete(batch);
			state.fallback = fallback;
			reconcile(state, array, anchor, flags, get_key);
			if (fallback !== null) {
				if (array.length === 0) {
					if ((fallback.f & 33554432) === 0) resume_effect(fallback);
					else {
						fallback.f ^= EFFECT_OFFSCREEN;
						move(fallback, null, anchor);
					}
				} else pause_effect(fallback, () => {
					fallback = null;
				});
			}
		}
		/**
		* @param {Batch} batch
		*/
		function discard(batch) {
			state.pending.delete(batch);
		}
		/** @type {EachState} */
		var state = {
			effect: block(() => {
				array = get(each_array);
				var length = array.length;
				/** `true` if there was a hydration mismatch. Needs to be a `let` or else it isn't treeshaken out */
				let mismatch = false;
				if (hydrating) {
					if (read_hydration_instruction(anchor) === "[!" !== (length === 0)) {
						anchor = skip_nodes();
						set_hydrate_node(anchor);
						set_hydrating(false);
						mismatch = true;
					}
				}
				var keys = /* @__PURE__ */ new Set();
				var batch = current_batch;
				var defer = should_defer_append();
				for (var index = 0; index < length; index += 1) {
					if (hydrating && hydrate_node.nodeType === 8 && hydrate_node.data === "]") {
						anchor = hydrate_node;
						mismatch = true;
						set_hydrating(false);
					}
					var value = array[index];
					var key = get_key(value, index);
					var item = first_run ? null : items.get(key);
					if (item) {
						if (item.v) internal_set(item.v, value);
						if (item.i) internal_set(item.i, index);
						if (defer) batch.unskip_effect(item.e);
					} else {
						item = create_item(items, first_run ? anchor : offscreen_anchor ??= create_text(), value, key, index, render_fn, flags, get_collection);
						if (!first_run) item.e.f |= EFFECT_OFFSCREEN;
						items.set(key, item);
					}
					keys.add(key);
				}
				if (length === 0 && fallback_fn && !fallback) {
					if (first_run) fallback = branch(() => fallback_fn(anchor));
					else {
						fallback = branch(() => fallback_fn(offscreen_anchor ??= create_text()));
						fallback.f |= EFFECT_OFFSCREEN;
					}
				}
				if (length > keys.size) each_key_duplicate("", "", "");
				if (hydrating && length > 0) set_hydrate_node(skip_nodes());
				if (!first_run) {
					pending.set(batch, keys);
					if (defer) {
						for (const [key, item] of items) if (!keys.has(key)) batch.skip_effect(item.e);
						batch.oncommit(commit);
						batch.ondiscard(discard);
					} else commit(batch);
				}
				if (mismatch) set_hydrating(true);
				get(each_array);
			}),
			flags,
			items,
			pending,
			outrogroups: null,
			fallback
		};
		first_run = false;
		if (hydrating) anchor = hydrate_node;
	}
	/**
	* Skip past any non-branch effects (which could be created with `createSubscriber`, for example) to find the next branch effect
	* @param {Effect | null} effect
	* @returns {Effect | null}
	*/
	function skip_to_branch(effect) {
		while (effect !== null && (effect.f & 32) === 0) effect = effect.next;
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
		var is_animated = (flags & 8) !== 0;
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
		if (is_animated) for (i = 0; i < length; i += 1) {
			value = array[i];
			key = get_key(value, i);
			effect = items.get(key).e;
			if ((effect.f & 33554432) === 0) {
				effect.nodes?.a?.measure();
				(to_animate ??= /* @__PURE__ */ new Set()).add(effect);
			}
		}
		for (i = 0; i < length; i += 1) {
			value = array[i];
			key = get_key(value, i);
			effect = items.get(key).e;
			if (state.outrogroups !== null) for (const group of state.outrogroups) {
				group.pending.delete(effect);
				group.done.delete(effect);
			}
			if ((effect.f & 8192) !== 0) {
				resume_effect(effect);
				if (is_animated) {
					effect.nodes?.a?.unfix();
					(to_animate ??= /* @__PURE__ */ new Set()).delete(effect);
				}
			}
			if ((effect.f & 33554432) !== 0) {
				effect.f ^= EFFECT_OFFSCREEN;
				if (effect === current) move(effect, null, anchor);
				else {
					var next = prev ? prev.next : current;
					if (effect === state.effect.last) state.effect.last = effect.prev;
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
				if (seen !== void 0 && seen.has(effect)) {
					if (matched.length < stashed.length) {
						var start = stashed[0];
						var j;
						prev = start.prev;
						var a = matched[0];
						var b = matched[matched.length - 1];
						for (j = 0; j < matched.length; j += 1) move(matched[j], start, anchor);
						for (j = 0; j < stashed.length; j += 1) seen.delete(stashed[j]);
						link(state, a.prev, b.next);
						link(state, prev, a);
						link(state, b, start);
						current = start;
						prev = b;
						i -= 1;
						matched = [];
						stashed = [];
					} else {
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
					(seen ??= /* @__PURE__ */ new Set()).add(current);
					stashed.push(current);
					current = skip_to_branch(current.next);
				}
				if (current === null) continue;
			}
			if ((effect.f & 33554432) === 0) matched.push(effect);
			prev = effect;
			current = skip_to_branch(effect.next);
		}
		if (state.outrogroups !== null) {
			for (const group of state.outrogroups) if (group.pending.size === 0) {
				destroy_effects(state, array_from(group.done));
				state.outrogroups?.delete(group);
			}
			if (state.outrogroups.size === 0) state.outrogroups = null;
		}
		if (current !== null || seen !== void 0) {
			/** @type {Effect[]} */
			var to_destroy = [];
			if (seen !== void 0) {
				for (effect of seen) if ((effect.f & 8192) === 0) to_destroy.push(effect);
			}
			while (current !== null) {
				if ((current.f & 8192) === 0 && current !== state.fallback) to_destroy.push(current);
				current = skip_to_branch(current.next);
			}
			var destroy_length = to_destroy.length;
			if (destroy_length > 0) {
				var controlled_anchor = (flags & 4) !== 0 && length === 0 ? anchor : null;
				if (is_animated) {
					for (i = 0; i < destroy_length; i += 1) to_destroy[i].nodes?.a?.measure();
					for (i = 0; i < destroy_length; i += 1) to_destroy[i].nodes?.a?.fix();
				}
				pause_effects(state, to_destroy, controlled_anchor);
			}
		}
		if (is_animated) queue_micro_task(() => {
			if (to_animate === void 0) return;
			for (effect of to_animate) effect.nodes?.a?.apply();
		});
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
		var v = (flags & 1) !== 0 ? (flags & 16) === 0 ? /* @__PURE__ */ mutable_source(value, false, false) : source(value) : null;
		var i = (flags & 2) !== 0 ? source(index) : null;
		return {
			v,
			i,
			e: branch(() => {
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
		var dest = next && (next.f & 33554432) === 0 ? next.nodes.start : anchor;
		while (node !== null) {
			var next_node = /* @__PURE__ */ get_next_sibling(node);
			dest.before(node);
			if (node === end) return;
			node = next_node;
		}
	}
	/**
	* @param {EachState} state
	* @param {Effect | null} prev
	* @param {Effect | null} next
	*/
	function link(state, prev, next) {
		if (prev === null) state.effect.first = next;
		else prev.next = next;
		if (next === null) state.effect.last = prev;
		else next.prev = prev;
	}
	//#endregion
	//#region node_modules/svelte/src/internal/client/dom/blocks/snippet.js
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
		var branches = new BranchManager(node);
		block(() => {
			const snippet = get_snippet() ?? null;
			branches.ensure(snippet, snippet && ((anchor) => snippet(anchor, ...args)));
		}, EFFECT_TRANSPARENT);
	}
	//#endregion
	//#region node_modules/svelte/src/internal/client/dom/css.js
	/**
	* @param {Node} anchor
	* @param {{ hash: string, code: string }} css
	*/
	function append_styles(anchor, css) {
		effect(() => {
			anchor = active_effect?.parent?.nodes?.start ?? anchor;
			var root = anchor.getRootNode();
			var target = root.host ? root : /** @type {Document} */ root.head ?? root.ownerDocument.head;
			if (!target.querySelector("#" + css.hash)) {
				const style = create_element("style");
				style.id = css.hash;
				style.textContent = css.code;
				target.appendChild(style);
			}
		});
	}
	//#endregion
	//#region node_modules/svelte/src/internal/shared/attributes.js
	var whitespace = [..." 	\n\r\f\xA0\v﻿"];
	/**
	* @param {any} value
	* @param {string | null} [hash]
	* @param {Record<string, boolean>} [directives]
	* @returns {string | null}
	*/
	function to_class(value, hash, directives) {
		var classname = value == null ? "" : "" + value;
		if (hash) classname = classname ? classname + " " + hash : hash;
		if (directives) {
			for (var key of Object.keys(directives)) if (directives[key]) classname = classname ? classname + " " + key : key;
			else if (classname.length) {
				var len = key.length;
				var a = 0;
				while ((a = classname.indexOf(key, a)) >= 0) {
					var b = a + len;
					if ((a === 0 || whitespace.includes(classname[a - 1])) && (b === classname.length || whitespace.includes(classname[b]))) classname = (a === 0 ? "" : classname.substring(0, a)) + classname.substring(b + 1);
					else a = b;
				}
			}
		}
		return classname === "" ? null : classname;
	}
	//#endregion
	//#region node_modules/svelte/src/internal/client/dom/elements/class.js
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
		var prev = dom[CLASS_CACHE];
		if (hydrating || prev !== value || prev === void 0) {
			var next_class_name = to_class(value, hash, next_classes);
			if (!hydrating || next_class_name !== dom.getAttribute("class")) {
				if (next_class_name == null) dom.removeAttribute("class");
				else if (is_html) dom.className = next_class_name;
				else dom.setAttribute("class", next_class_name);
			}
			/** @type {any} */ dom[CLASS_CACHE] = value;
		} else if (next_classes && prev_classes !== next_classes) for (var key in next_classes) {
			var is_present = !!next_classes[key];
			if (prev_classes == null || is_present !== !!prev_classes[key]) dom.classList.toggle(key, is_present);
		}
		return next_classes;
	}
	//#endregion
	//#region node_modules/svelte/src/internal/client/dom/elements/bindings/select.js
	/**
	* Sets the `selected` attribute on an option so form reset can restore it.
	* @param {HTMLOptionElement} option
	* @param {boolean} selected
	*/
	function set_selected(option, selected) {
		if (selected) {
			if (!option.hasAttribute("selected")) option.setAttribute("selected", "");
		} else option.removeAttribute("selected");
	}
	/**
	* Marks the options matching `__defaultValue` as selected. Without `preserve`
	* a newly matching option gets selected, as an inserted `<option selected>` would.
	* @param {HTMLSelectElement} select
	* @param {boolean} preserve
	*/
	function apply_default_select_value(select, preserve) {
		var value = select.__defaultValue;
		var multiple = select.multiple;
		var values = multiple ? value ?? [] : null;
		if (multiple && !is_array(values)) return;
		var index = select.selectedIndex;
		var selected = preserve && multiple ? new Set(select.selectedOptions) : null;
		for (var option of select.options) {
			var option_value = get_option_value(option);
			set_selected(option, multiple ? values.includes(option_value) : is(option_value, value));
		}
		if (!preserve) return;
		if (selected !== null) for (option of select.options) {
			var was_selected = selected.has(option);
			if (option.selected !== was_selected) option.selected = was_selected;
		}
		else if (select.selectedIndex !== index) select.selectedIndex = index;
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
			if (value == void 0) return;
			if (!is_array(value)) return select_multiple_invalid_value();
			for (var option of select.options) option.selected = value.includes(get_option_value(option));
			return;
		}
		for (option of select.options) if (is(get_option_value(option), value)) {
			option.selected = true;
			return;
		}
		if (!mounting || value !== void 0) select.selectedIndex = -1;
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
			if (entries.every(is_selectedcontent_mutation)) return;
			if ("__defaultValue" in select) apply_default_select_value(select, false);
			if ("__value" in select) select_option(select, select.__value);
		});
		observer.observe(select, {
			childList: true,
			subtree: true,
			attributes: true,
			attributeFilter: ["value"]
		});
		teardown(() => {
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
		var batches = /* @__PURE__ */ new WeakSet();
		var mounting = true;
		listen_to_event_and_reset_event(select, "change", (is_reset) => {
			var query = is_reset ? "[selected]" : ":checked";
			/** @type {unknown} */
			var value;
			if (select.multiple) value = [].map.call(select.querySelectorAll(query), get_option_value);
			else {
				/** @type {HTMLOptionElement | null} */
				var selected_option = select.querySelector(query) ?? select.querySelector("option:not([disabled])");
				value = selected_option && get_option_value(selected_option);
			}
			set(value);
			select.__value = value;
			if (current_batch !== null) batches.add(current_batch);
		});
		effect(() => {
			var value = get();
			if (select === document.activeElement) {
				var batch = async_mode_flag ? previous_batch : current_batch;
				if (batches.has(batch)) return;
			}
			select_option(select, value, mounting);
			if (mounting && value === void 0) {
				/** @type {HTMLOptionElement | null} */
				var selected_option = select.querySelector(":checked");
				if (selected_option !== null) {
					value = get_option_value(selected_option);
					set(value);
				}
			}
			select.__value = value;
			mounting = false;
		});
	}
	/** @param {HTMLOptionElement} option */
	function get_option_value(option) {
		if ("__value" in option) return option.__value;
		else return option.value;
	}
	/**
	* Returns `true` if the mutation stems from the browser mirroring the selected
	* option's content into `<selectedcontent>`, or from us replacing the
	* `<selectedcontent>` element with a clone of itself
	* @param {MutationRecord} entry
	*/
	function is_selectedcontent_mutation(entry) {
		if (entry.target.closest("selectedcontent") !== null) return true;
		if (entry.type === "childList") {
			var nodes = [...entry.addedNodes, ...entry.removedNodes];
			return nodes.length > 0 && nodes.every((node) => node.nodeName === "SELECTEDCONTENT");
		}
		return false;
	}
	//#endregion
	//#region node_modules/svelte/src/internal/client/reactivity/store.js
	/**
	* Whether or not the prop currently being read is a store binding, as in
	* `<Child bind:x={$y} />`. If it is, we treat the prop as mutable even in
	* runes mode, and skip `binding_property_non_reactive` validation
	*/
	var is_store_binding = false;
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
	//#endregion
	//#region node_modules/svelte/src/internal/client/reactivity/props.js
	/** @import { Derived, Effect, Source } from './types.js' */
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
		var runes = !legacy_mode_flag || (flags & 2) !== 0;
		var bindable = (flags & 8) !== 0;
		var lazy = (flags & 16) !== 0;
		var fallback_value = fallback;
		var fallback_dirty = true;
		var fallback_signal = void 0;
		var get_fallback = () => {
			if (lazy && runes) {
				fallback_signal ??= /* @__PURE__ */ derived(fallback);
				return get(fallback_signal);
			}
			if (fallback_dirty) {
				fallback_dirty = false;
				fallback_value = lazy ? untrack(fallback) : fallback;
			}
			return fallback_value;
		};
		/** @type {((v: V) => void) | undefined} */
		let setter;
		if (bindable) {
			var is_entry_props = STATE_SYMBOL in props || LEGACY_PROPS in props;
			setter = get_descriptor(props, key)?.set ?? (is_entry_props && key in props ? (v) => props[key] = v : void 0);
		}
		/** @type {V} */
		var initial_value;
		var is_store_sub = false;
		if (bindable) [initial_value, is_store_sub] = capture_store_binding(() => props[key]);
		else initial_value = props[key];
		if (initial_value === void 0 && fallback !== void 0) {
			initial_value = get_fallback();
			if (setter) {
				if (runes) props_invalid_value(key);
				setter(initial_value);
			}
		}
		/** @type {() => V} */
		var getter;
		if (runes) getter = () => {
			var value = props[key];
			if (value === void 0) return get_fallback();
			fallback_dirty = true;
			return value;
		};
		else getter = () => {
			var value = props[key];
			if (value !== void 0) fallback_value = void 0;
			return value === void 0 ? fallback_value : value;
		};
		if (runes && (flags & 4) === 0) return getter;
		if (setter) {
			var legacy_parent = props.$$legacy;
			return (function(value, mutation) {
				if (arguments.length > 0) {
					if (!runes || !mutation || legacy_parent || is_store_sub)
 /** @type {Function} */ setter(mutation ? getter() : value);
					return value;
				}
				return getter();
			});
		}
		var overridden = false;
		var d = ((flags & 1) !== 0 ? derived : derived_safe_equal)(() => {
			overridden = false;
			return getter();
		});
		if (bindable) get(d);
		var parent_effect = active_effect;
		return (function(value, mutation) {
			if (arguments.length > 0) {
				const new_value = mutation ? get(d) : runes && bindable ? proxy(value) : value;
				set(d, new_value);
				overridden = true;
				if (fallback_value !== void 0) fallback_value = new_value;
				return value;
			}
			if (is_destroying_effect && overridden || (parent_effect.f & 16384) !== 0) return d.v;
			return get(d);
		});
	}
	if (typeof HTMLElement === "function");
	//#endregion
	//#region shared/mountInForm.ts
	/**
	* Hängt eine Svelte-Komponente in die HTML-Element-Komponente eines
	* dforms-/Formio-Formulars ein (Standard-Key "result", siehe
	* src/forms/form.json der Projekte) - direkt in deren ref="html"-Kind statt
	* component.content + redraw(), damit Formio's Hülle erhalten bleibt.
	*
	* Zeichnet Formio die Komponente neu (oder war sie beim Aufruf noch nicht
	* gerendert), ist der Inhalt weg - dann wird die Komponente automatisch neu
	* eingehängt. Zustand, der das überdauern soll, gehört deshalb nicht in die
	* Komponente, sondern in ein .svelte.ts-Modul, das per Prop hereinkommt.
	*/
	function mountInForm(form, component, props, key = "result") {
		let root;
		let instance;
		const mountNow = () => {
			const formComponent = form.getComponent?.(key);
			const host = formComponent?.refs?.html ?? formComponent?.element?.querySelector?.("[ref=\"html\"]") ?? formComponent?.element;
			if (!host) {
				getLogger().warn(`Komponente "${key}" nicht im Formular gefunden (oder noch nicht gerendert).`);
				return;
			}
			if (instance) unmount(instance);
			host.innerHTML = "";
			root = host.ownerDocument.createElement("div");
			host.appendChild(root);
			instance = mount(component, {
				target: root,
				props
			});
		};
		mountNow();
		form.on?.("render", () => {
			if (!root?.isConnected) mountNow();
		});
	}
	//#endregion
	//#region node_modules/svelte/src/internal/disclose-version.js
	if (typeof window !== "undefined") ((window.__svelte ??= {}).v ??= /* @__PURE__ */ new Set()).add("5");
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
	//#region ../../helper/dforms/getForm.ts
	/**
	* Fetches a form by its ID from the d.velop forms API.
	*
	* @param baseUri - The base URI of the d.velop API.
	* @param token - The authorization token to access the API.
	* @param formId - The unique identifier of the form to retrieve.
	* @returns A promise that resolves to an `ApiResponse` containing the form data of type `GetForm`.
	*/
	async function getForm(baseUri, token, formId) {
		const response = await performHttpRequest(`${baseUri}/dforms/api/forms/${formId}`, {
			method: "GET",
			headers: new Headers({
				Authorization: `Bearer ${token}`,
				Accept: "application/json",
				"Content-Type": "application/json"
			})
		});
		if (typeof response.body.definition === "string") response.body.definition = JSON.parse(response.body.definition);
		return response;
	}
	//#endregion
	//#region ../../helper/processstudio/createForm.ts
	/**
	* Legt ein neues, noch leeres Formular in Process Studio an (dieselbe Aktion, die
	* der Formular-Editor beim Klick auf "Neues Formular" ausführt). Das Ergebnis hat
	* noch keine formioFormDefinition (definition ist ein leerer String) – dafür
	* anschließend patchForm aus helper/dforms/patchForm.ts verwenden.
	*
	* @param baseUri - Die Basis-URI der d.velop-API.
	* @param token - Das Autorisierungs-Token für den Zugriff auf die API.
	* @param formId - Die vom Aufrufer vergebene GUID des neuen Formulars.
	* @param name - Der Name des neuen Formulars.
	* @param author - Identity-ID des Erstellers/letzten Bearbeiters (optional).
	* @returns Ein Promise, das zu einer `ApiResponse` mit dem angelegten Formular auflöst.
	*/
	async function createForm(baseUri, token, formId, name, author = "") {
		const url = `${baseUri}/processstudio/components/form`;
		const headers = {
			Authorization: `Bearer ${token}`,
			Accept: "application/json",
			"Content-Type": "application/json"
		};
		const now = (/* @__PURE__ */ new Date()).toISOString();
		const body = { form: {
			id: formId,
			name,
			author,
			lastEditor: author,
			creationDate: now,
			lastModificationDate: now,
			definition: "",
			tags: null,
			automationIds: null,
			readOnly: false,
			versionId: null,
			_links: {
				edit: { href: `/dforms/ui/forms/${formId}/edit` },
				self: { href: `/dforms/api/forms/${formId}` },
				view: { href: `/dforms/ui/forms/${formId}/view` }
			}
		} };
		return await performHttpRequest(url, {
			method: "POST",
			headers,
			body: JSON.stringify(body)
		});
	}
	//#endregion
	//#region ../../helper/processstudio/getAllForms.ts
	async function getAllForms(baseUri, token) {
		return await performHttpRequest(`${baseUri}/processstudio/components/form`, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${token}`,
				Accept: "application/json",
				"Content-Type": "application/json"
			},
			cache: "no-store"
		});
	}
	//#endregion
	//#region ../../helper/dforms/patchForm.ts
	/**
	* Updates an existing form by sending a PATCH request to the specified API endpoint.
	*
	* @template T - The type of the response expected from the API.
	* @param baseUri - The base URI of the API.
	* @param token - The authorization token to access the API.
	* @param formId - The unique identifier of the form to be updated.
	* @param name - The new name for the form.
	* @param definition - The updated definition of the form.
	* @returns A promise that resolves to the API response of type `T`.
	*/
	async function patchForm(baseUri, token, formId, name, definition) {
		const url = `${baseUri}/dforms/api/forms/${formId}`;
		const headers = {
			Authorization: `Bearer ${token}`,
			Accept: "application/json",
			"Content-Type": "application/json"
		};
		const body = {
			id: formId,
			name,
			definition: JSON.stringify(definition)
		};
		return await performHttpRequest(url, {
			method: "PUT",
			headers,
			body: JSON.stringify(body)
		});
	}
	//#endregion
	//#region ../../helper/dforms/newVersion.ts
	/**
	* Creates a new version of an existing form by sending a POST request to the specified API endpoint.
	*
	* @param baseUri - The base URI of the API.
	* @param token - The authorization token to access the API.
	* @param formId - The unique identifier of the form for which a new version is created.
	* @returns A promise that resolves to the API response containing the new version data.
	*/
	async function newVersion(baseUri, token, formId) {
		return await performHttpRequest(`${baseUri}/dforms/api/forms/${formId}/versions`, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${token}`,
				Accept: "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify({})
		});
	}
	//#endregion
	//#region ../../helper/scripting/getAllScripts.ts
	async function getAllScripts(baseUri, token) {
		return await performHttpRequest(`${baseUri}/scripting/script`, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${token}`,
				Accept: "application/json",
				"Content-Type": "application/json"
			}
		});
	}
	//#endregion
	//#region ../../helper/scripting/createScript.ts
	async function createScript(baseUri, token, name) {
		return await performHttpRequest(`${baseUri}/scripting/script`, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${token}`,
				Accept: "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ name })
		});
	}
	//#endregion
	//#region ../../helper/scripting/getScriptVersion.ts
	async function getScriptVersion(baseUri, token, scriptId) {
		return await performHttpRequest(`${baseUri}/scripting/script/${scriptId}/version`, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${token}`,
				Accept: "application/json",
				"Content-Type": "application/json"
			}
		});
	}
	//#endregion
	//#region ../../helper/scripting/patchScript.ts
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
		return await performHttpRequest(`${baseUri}/scripting/script/${scriptId}/version/${scriptVersionId}`, {
			method: "PATCH",
			headers: {
				Authorization: `Bearer ${token}`,
				Accept: "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify(body)
		});
	}
	//#endregion
	//#region src/config/targetForms.ts
	var targetForms = [
		{
			type: "form",
			id: "businesObjectsEditor",
			name: "Business Objects Editor",
			description: "Verwaltet Business-Objects-Modelle und deren Einträge (Anlegen, Bearbeiten, Löschen) direkt im Browser.",
			formId: "cb60481f-c364-4d82-9965-9ce3f25400e4",
			bundlePath: "businesObjectsEditor/formBundle.js"
		},
		{
			type: "form",
			id: "deleteDocuments",
			name: "Dokumente löschen",
			description: "Löscht alle Dokumente einer Kategorie oder aller Kategorien aus dem DMS – mit mehrfacher Sicherheitsabfrage, Löschgrund und Protokoll-Download.",
			formId: "b4b039f1-61db-5faf-b63c-1e5651faf1e7",
			bundlePath: "deleteDocuments/formBundle.js",
			formDefinitionPath: "deleteDocuments/form.json"
		},
		{
			type: "form",
			id: "downloadBatchDocuments",
			name: "Stapel-Download",
			description: "Listet alle Stapel der Eingangsverarbeitung (Inbound) auf und lädt alle Dokumente eines Stapels als eine zusammengeführte PDF-Datei herunter.",
			formId: "393a772c-d2db-5463-9708-488bce1ca6e9",
			bundlePath: "downloadBatchDocuments/formBundle.js",
			formDefinitionPath: "downloadBatchDocuments/form.json"
		},
		{
			type: "combined",
			id: "invoiceFromPurchaseOrder",
			name: "Rechnung aus Bestellung",
			description: "Erzeugt aus einer Bestellung in Business Central eine Beispiel-Rechnung als PDF zum Download – z. B. zum Testen des Rechnungslesers.",
			formId: "b5fe5d8a-13a7-5ff5-81ce-160e029d6621",
			bundlePath: "invoiceFromPurchaseOrder/formBundle.js",
			formDefinitionPath: "invoiceFromPurchaseOrder/form.json",
			scripts: [{
				name: "Rechnung aus Bestellung",
				description: "Erzeugt aus einer Bestellung in Business Central eine Beispiel-Rechnung als PDF zum Download – z. B. zum Testen des Rechnungslesers.",
				bundlePath: "invoiceFromPurchaseOrder/scripts/script.js",
				customerVariables: [
					{
						"key": "erpTenantId",
						"label": "Entra-Tenant-ID",
						"encrypted": false,
						"description": "Microsoft-Entra-Tenant-ID (GUID) des Business-Central-Mandanten."
					},
					{
						"key": "clientId",
						"label": "Client-ID",
						"encrypted": false,
						"description": "Anwendungs-ID (Client-ID) der App-Registrierung mit Zugriff auf die Business-Central-API."
					},
					{
						"key": "clientSecret",
						"label": "Client-Secret",
						"encrypted": true,
						"description": "Geheimer Clientschlüssel der App-Registrierung."
					}
				]
			}]
		},
		{
			type: "form",
			id: "invoiceReaderCleanup",
			name: "Bereinigung Rechnungsleser",
			description: "Listet die Stapel des Rechnungslesers mit Filter nach Name und Datum und löscht bzw. klassifiziert markierte Stapel erneut.",
			formId: "507be658-9883-5549-9cc1-3c7398429594",
			bundlePath: "invoiceReaderCleanup/formBundle.js",
			formDefinitionPath: "invoiceReaderCleanup/form.json"
		},
		{
			type: "combined",
			id: "invoiceReaderStatistics",
			name: "Rechnungsleser-Auswertung",
			description: "Zeigt, wie viele Rechnungen der Rechnungsleser je Mandant und Monat verarbeitet hat – mit Filter und Export als CSV/Excel.",
			formId: "cc9d6f5c-b26d-53d9-b61d-a279ee3ad34c",
			bundlePath: "invoiceReaderStatistics/formBundle.js",
			formDefinitionPath: "invoiceReaderStatistics/form.json",
			scripts: [{
				name: "Rechnungsleser-Auswertung",
				description: "Zeigt, wie viele Rechnungen der Rechnungsleser je Mandant und Monat verarbeitet hat – mit Filter und Export als CSV/Excel.",
				bundlePath: "invoiceReaderStatistics/scripts/script.js",
				customerVariables: [{
					"key": "baseUri",
					"label": "Base-URI",
					"encrypted": false,
					"description": "Adresse des Mandanten, dessen Rechnungsleser ausgewertet wird.",
					"default": "{origin}"
				}, {
					"key": "apiKey",
					"label": "API-Key",
					"encrypted": true,
					"description": "API-Key eines Benutzers mit Zugriff auf den Webindex-Designer des Rechnungslesers."
				}]
			}]
		},
		{
			type: "form",
			id: "onboardingGevisECMDocumentReader",
			name: "Onboarding gevis ECM Rechnungsleser",
			description: "Richtet den Rechnungsleser für gevis ECM in einem Mandanten ein: Stapelprofile, Postfächer, Gruppe, Webindex-Layout, Quell-Mapping sowie Script und Webhook zum Verschieben von Gutschriften.",
			formId: "15a5e3f1-8025-4501-a811-ff37e3851aee",
			bundlePath: "onboardingGevisECMDocumentReader/formBundle.js",
			formDefinitionPath: "onboardingGevisECMDocumentReader/form.json"
		},
		{
			type: "form",
			id: "orderConfirmationCleanup",
			name: "Bereinigung Auftragsbestätigungsleser",
			description: "Listet die Stapel des Auftragsbestätigungslesers mit Filter nach Name und Datum und löscht bzw. klassifiziert markierte Stapel erneut.",
			formId: "0ccc29d0-ab0d-497b-9246-bfdad0a09e4d",
			bundlePath: "orderConfirmationCleanup/formBundle.js",
			formDefinitionPath: "orderConfirmationCleanup/form.json"
		},
		{
			type: "form",
			id: "processAdministration",
			name: "Prozess-Administration",
			description: "Verwaltet die Prozesse in der Systemumgebung.",
			formId: "2c3e00b6-8e00-4a27-9a9e-2b5dee133ca7",
			bundlePath: "processAdministration/formBundle.js",
			formDefinitionPath: "processAdministration/form.json"
		},
		{
			type: "combined",
			id: "userLicenceCounter",
			name: "Benutzer-Lizenzübersicht",
			description: "Zeigt alle Benutzer des Mandanten mit Kennzeichnung als bezahlter, API- oder administrativer Benutzer – mit Filter, Suche und Export als CSV/Excel.",
			formId: "ce3a0bac-79fd-5080-8742-819797a25f19",
			bundlePath: "userLicenceCounter/formBundle.js",
			formDefinitionPath: "userLicenceCounter/form.json",
			scripts: [{
				name: "User-Lizenz-Zähler",
				description: "Zeigt alle Benutzer des Mandanten mit Kennzeichnung als bezahlter, API- oder administrativer Benutzer – mit Filter, Suche und Export als CSV/Excel.",
				bundlePath: "userLicenceCounter/scripts/script.js",
				customerVariables: [{
					"key": "baseUri",
					"label": "Base-URI",
					"encrypted": false,
					"description": "Adresse des Mandanten, gegen den das Script die Benutzer abfragt.",
					"default": "{origin}"
				}, {
					"key": "apiKey",
					"label": "API-Key",
					"encrypted": true,
					"description": "API-Key eines Benutzers mit Leserechten auf die Benutzerverwaltung."
				}]
			}]
		}
	];
	//#endregion
	//#region src/config/publicBundleRepo.ts
	var PUBLIC_BUNDLE_REPO_OWNER = "FOM-MaximilianEllinger";
	var PUBLIC_BUNDLE_REPO_NAME = "dvelop-codebase-bundles";
	var PUBLIC_BUNDLE_REPO_BRANCH = "main";
	var RAW_BASE_URL = `https://raw.githubusercontent.com/${PUBLIC_BUNDLE_REPO_OWNER}/${PUBLIC_BUNDLE_REPO_NAME}`;
	/** Branch-URL - wird vom CDN bis zu 5 Minuten gecacht (max-age=300), daher nur
	* noch Fallback, siehe fetchPublishedFile. */
	var PUBLIC_BUNDLE_REPO_BASE_URL = `${RAW_BASE_URL}/${PUBLIC_BUNDLE_REPO_BRANCH}`;
	var SHA_CACHE_MS = 3e4;
	var cachedSha;
	var pendingSha;
	async function resolveLatestSha() {
		if (cachedSha && Date.now() - cachedSha.at < SHA_CACHE_MS) return cachedSha.sha;
		pendingSha ??= (async () => {
			try {
				const response = await fetch(`https://api.github.com/repos/${PUBLIC_BUNDLE_REPO_OWNER}/${PUBLIC_BUNDLE_REPO_NAME}/commits/${PUBLIC_BUNDLE_REPO_BRANCH}`, {
					headers: { Accept: "application/vnd.github.sha" },
					cache: "no-store"
				});
				const sha = response.ok ? (await response.text()).trim() : "";
				if (!/^[0-9a-f]{40}$/.test(sha)) {
					console.warn(`Artefakt-Repo: neuester Commit nicht ermittelbar (Status ${response.status}) - lade über ${PUBLIC_BUNDLE_REPO_BRANCH}.`);
					return;
				}
				cachedSha = {
					sha,
					at: Date.now()
				};
				return sha;
			} catch (error) {
				console.warn(`Artefakt-Repo: neuester Commit nicht ermittelbar (${error}) - lade über ${PUBLIC_BUNDLE_REPO_BRANCH}.`);
				return;
			} finally {
				pendingSha = void 0;
			}
		})();
		return pendingSha;
	}
	async function fetchText(url) {
		return await fetch(url, { cache: "no-store" });
	}
	/**
	* Lädt eine veröffentlichte Datei (Bundle, form.json, Script) aus dem
	* Artefakt-Repo - bevorzugt über die Commit-URL
	* (raw.githubusercontent.com/<owner>/<repo>/<sha>/<pfad>): die ist je Commit
	* eindeutig und damit nie veraltet, anders als die Branch-URL, die das CDN bis
	* zu 5 Minuten alt ausliefert. Fällt auf die Branch-URL zurück, wenn der SHA
	* nicht ermittelbar ist (z.B. API-Limit) oder die Datei in diesem Commit noch
	* fehlt.
	*
	* @param path - Pfad innerhalb des Artefakt-Repos, z.B. "toolbox/formBundle.js".
	*/
	async function fetchPublishedFile(path) {
		const content = await tryFetchPublishedFile(path);
		if (content === void 0) throw new Error(`Bundle konnte nicht geladen werden (Status 404): ${PUBLIC_BUNDLE_REPO_BASE_URL}/${path}`);
		return content;
	}
	async function tryFetchPublishedFile(path) {
		const sha = await resolveLatestSha();
		if (sha) {
			const response = await fetchText(`${RAW_BASE_URL}/${sha}/${path}`);
			if (response.ok) return await response.text();
			if (response.status !== 404) throw new Error(`Bundle konnte nicht geladen werden (Status ${response.status}): ${path} @ ${sha}`);
		}
		const url = `${PUBLIC_BUNDLE_REPO_BASE_URL}/${path}`;
		const response = await fetchText(url);
		if (response.status === 404) return;
		if (!response.ok) throw new Error(`Bundle konnte nicht geladen werden (Status ${response.status}): ${url}`);
		return await response.text();
	}
	/** Ordner im Artefakt-Repo, z.B. "userLicenceCounter/scripts/script.js" -> "userLicenceCounter". */
	function publishedFolderOf(bundlePath) {
		return bundlePath.split("/")[0];
	}
	/** Veröffentlichter Versionsstand des Ordners, undefined wenn (noch) keine version.json existiert. */
	async function fetchPublishedVersion(folder) {
		const content = await tryFetchPublishedFile(`${folder}/version.json`);
		if (content === void 0) return;
		const version = JSON.parse(content).version;
		return typeof version === "number" ? version : void 0;
	}
	var VERSION_MARKER_PATTERN = /VERSION_COUNTER\s*=\s*(\d+)/;
	function versionMarker(version) {
		return `VERSION_COUNTER = ${version}`;
	}
	/** Setzt den Versions-Marker vor den Bundle-Inhalt (ohne bekannte Version unverändert). */
	function withVersionMarker(content, version) {
		return version === void 0 ? content : `/* ${versionMarker(version)} */\n${content}`;
	}
	/** Liest den Versions-Marker (siehe VERSION_MARKER_PATTERN) aus installiertem Inhalt. */
	function parseVersionMarker(content) {
		const match = content?.match(VERSION_MARKER_PATTERN);
		return match ? parseInt(match[1], 10) : void 0;
	}
	/*!
	* sweetalert2 v11.26.25
	* Released under the MIT License.
	*/
	//#endregion
	//#region src/forms/rollout.ts
	var import_sweetalert2_all = /* @__PURE__ */ __toESM((/* @__PURE__ */ __commonJSMin(((exports, module) => {
		(function(global, factory) {
			typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() : typeof define === "function" && define.amd ? define(factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, global.Sweetalert2 = factory());
		})(exports, (function() {
			"use strict";
			function _assertClassBrand(e, t, n) {
				if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n;
				throw new TypeError("Private element is not present on this object");
			}
			function _checkPrivateRedeclaration(e, t) {
				if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object");
			}
			function _classPrivateFieldGet2(s, a) {
				return s.get(_assertClassBrand(s, a));
			}
			function _classPrivateFieldInitSpec(e, t, a) {
				_checkPrivateRedeclaration(e, t), t.set(e, a);
			}
			function _classPrivateFieldSet2(s, a, r) {
				return s.set(_assertClassBrand(s, a), r), r;
			}
			const RESTORE_FOCUS_TIMEOUT = 100;
			/** @type {GlobalState} */
			const globalState = {};
			const focusPreviousActiveElement = () => {
				if (globalState.previousActiveElement instanceof HTMLElement) {
					globalState.previousActiveElement.focus();
					globalState.previousActiveElement = null;
				} else if (document.body) document.body.focus();
			};
			/**
			* Restore previous active (focused) element
			*
			* @param {boolean} returnFocus
			* @returns {Promise<void>}
			*/
			const restoreActiveElement = (returnFocus) => {
				return new Promise((resolve) => {
					if (!returnFocus) return resolve();
					const x = window.scrollX;
					const y = window.scrollY;
					globalState.restoreFocusTimeout = setTimeout(() => {
						focusPreviousActiveElement();
						resolve();
					}, RESTORE_FOCUS_TIMEOUT);
					window.scrollTo(x, y);
				});
			};
			const swalPrefix = "swal2-";
			const swalClasses = [
				"container",
				"shown",
				"height-auto",
				"iosfix",
				"popup",
				"modal",
				"no-backdrop",
				"no-transition",
				"toast",
				"toast-shown",
				"show",
				"hide",
				"close",
				"title",
				"html-container",
				"actions",
				"confirm",
				"deny",
				"cancel",
				"footer",
				"icon",
				"icon-content",
				"image",
				"input",
				"file",
				"range",
				"select",
				"radio",
				"checkbox",
				"label",
				"textarea",
				"inputerror",
				"input-label",
				"validation-message",
				"progress-steps",
				"active-progress-step",
				"progress-step",
				"progress-step-line",
				"loader",
				"loading",
				"styled",
				"top",
				"top-start",
				"top-end",
				"top-left",
				"top-right",
				"center",
				"center-start",
				"center-end",
				"center-left",
				"center-right",
				"bottom",
				"bottom-start",
				"bottom-end",
				"bottom-left",
				"bottom-right",
				"grow-row",
				"grow-column",
				"grow-fullscreen",
				"rtl",
				"timer-progress-bar",
				"timer-progress-bar-container",
				"scrollbar-measure",
				"icon-success",
				"icon-warning",
				"icon-info",
				"icon-question",
				"icon-error",
				"draggable",
				"dragging"
			].reduce(
				(acc, className) => {
					acc[className] = swalPrefix + className;
					return acc;
				},
				/** @type {SwalClasses} */
				{}
			);
			const iconTypes = [
				"success",
				"warning",
				"info",
				"question",
				"error"
			].reduce(
				(acc, icon) => {
					acc[icon] = swalPrefix + icon;
					return acc;
				},
				/** @type {SwalIcons} */
				{}
			);
			const consolePrefix = "SweetAlert2:";
			/**
			* Capitalize the first letter of a string
			*
			* @param {string} str
			* @returns {string}
			*/
			const capitalizeFirstLetter = (str) => str.charAt(0).toUpperCase() + str.slice(1);
			/**
			* Standardize console warnings
			*
			* @param {string | string[]} message
			*/
			const warn = (message) => {
				console.warn(`${consolePrefix} ${typeof message === "object" ? message.join(" ") : message}`);
			};
			/**
			* Standardize console errors
			*
			* @param {string} message
			*/
			const error = (message) => {
				console.error(`${consolePrefix} ${message}`);
			};
			/**
			* Private global state for `warnOnce`
			*
			* @type {string[]}
			* @private
			*/
			const previousWarnOnceMessages = [];
			/**
			* Show a console warning, but only if it hasn't already been shown
			*
			* @param {string} message
			*/
			const warnOnce = (message) => {
				if (!previousWarnOnceMessages.includes(message)) {
					previousWarnOnceMessages.push(message);
					warn(message);
				}
			};
			/**
			* Show a one-time console warning about deprecated params/methods
			*
			* @param {string} deprecatedParam
			* @param {string?} useInstead
			*/
			const warnAboutDeprecation = (deprecatedParam, useInstead = null) => {
				warnOnce(`"${deprecatedParam}" is deprecated and will be removed in the next major release.${useInstead ? ` Use "${useInstead}" instead.` : ""}`);
			};
			/**
			* If `arg` is a function, call it (with no arguments or context) and return the result.
			* Otherwise, just pass the value through
			*
			* @param {(() => *) | *} arg
			* @returns {*}
			*/
			const callIfFunction = (arg) => typeof arg === "function" ? arg() : arg;
			/**
			* @param {*} arg
			* @returns {boolean}
			*/
			const hasToPromiseFn = (arg) => arg && typeof arg.toPromise === "function";
			/**
			* @param {*} arg
			* @returns {Promise<*>}
			*/
			const asPromise = (arg) => hasToPromiseFn(arg) ? arg.toPromise() : Promise.resolve(arg);
			/**
			* @param {*} arg
			* @returns {boolean}
			*/
			const isPromise = (arg) => arg && Promise.resolve(arg) === arg;
			/**
			* @returns {boolean}
			*/
			const isFirefox = () => navigator.userAgent.includes("Firefox");
			/**
			* Gets the popup container which contains the backdrop and the popup itself.
			*
			* @returns {HTMLElement | null}
			*/
			const getContainer = () => document.body.querySelector(`.${swalClasses.container}`);
			/**
			* @param {string} selectorString
			* @returns {HTMLElement | null}
			*/
			const elementBySelector = (selectorString) => {
				const container = getContainer();
				return container ? container.querySelector(selectorString) : null;
			};
			/**
			* @param {string} className
			* @returns {HTMLElement | null}
			*/
			const elementByClass = (className) => {
				return elementBySelector(`.${className}`);
			};
			/**
			* @returns {HTMLElement | null}
			*/
			const getPopup = () => elementByClass(swalClasses.popup);
			/**
			* @returns {HTMLElement | null}
			*/
			const getIcon = () => elementByClass(swalClasses.icon);
			/**
			* @returns {HTMLElement | null}
			*/
			const getIconContent = () => elementByClass(swalClasses["icon-content"]);
			/**
			* @returns {HTMLElement | null}
			*/
			const getTitle = () => elementByClass(swalClasses.title);
			/**
			* @returns {HTMLElement | null}
			*/
			const getHtmlContainer = () => elementByClass(swalClasses["html-container"]);
			/**
			* @returns {HTMLElement | null}
			*/
			const getImage = () => elementByClass(swalClasses.image);
			/**
			* @returns {HTMLElement | null}
			*/
			const getProgressSteps = () => elementByClass(swalClasses["progress-steps"]);
			/**
			* @returns {HTMLElement | null}
			*/
			const getValidationMessage = () => elementByClass(swalClasses["validation-message"]);
			/**
			* @returns {HTMLButtonElement | null}
			*/
			const getConfirmButton = () => elementBySelector(`.${swalClasses.actions} .${swalClasses.confirm}`);
			/**
			* @returns {HTMLButtonElement | null}
			*/
			const getCancelButton = () => elementBySelector(`.${swalClasses.actions} .${swalClasses.cancel}`);
			/**
			* @returns {HTMLButtonElement | null}
			*/
			const getDenyButton = () => elementBySelector(`.${swalClasses.actions} .${swalClasses.deny}`);
			/**
			* @returns {HTMLElement | null}
			*/
			const getInputLabel = () => elementByClass(swalClasses["input-label"]);
			/**
			* @returns {HTMLElement | null}
			*/
			const getLoader = () => elementBySelector(`.${swalClasses.loader}`);
			/**
			* @returns {HTMLElement | null}
			*/
			const getActions = () => elementByClass(swalClasses.actions);
			/**
			* @returns {HTMLElement | null}
			*/
			const getFooter = () => elementByClass(swalClasses.footer);
			/**
			* @returns {HTMLElement | null}
			*/
			const getTimerProgressBar = () => elementByClass(swalClasses["timer-progress-bar"]);
			/**
			* @returns {HTMLElement | null}
			*/
			const getCloseButton = () => elementByClass(swalClasses.close);
			const focusable = `
  a[href],
  area[href],
  input:not([disabled]),
  select:not([disabled]),
  textarea:not([disabled]),
  button:not([disabled]),
  iframe,
  object,
  embed,
  [tabindex="0"],
  [contenteditable],
  audio[controls],
  video[controls],
  summary
`;
			/**
			* @returns {HTMLElement[]}
			*/
			const getFocusableElements = () => {
				const popup = getPopup();
				if (!popup) return [];
				/** @type {NodeListOf<HTMLElement>} */
				const focusableElementsWithTabindex = popup.querySelectorAll("[tabindex]:not([tabindex=\"-1\"]):not([tabindex=\"0\"])");
				const focusableElementsWithTabindexSorted = Array.from(focusableElementsWithTabindex).sort((a, b) => {
					const tabindexA = parseInt(a.getAttribute("tabindex") || "0");
					const tabindexB = parseInt(b.getAttribute("tabindex") || "0");
					if (tabindexA > tabindexB) return 1;
					else if (tabindexA < tabindexB) return -1;
					return 0;
				});
				/** @type {NodeListOf<HTMLElement>} */
				const otherFocusableElements = popup.querySelectorAll(focusable);
				const otherFocusableElementsFiltered = Array.from(otherFocusableElements).filter((el) => el.getAttribute("tabindex") !== "-1");
				return [...new Set(focusableElementsWithTabindexSorted.concat(otherFocusableElementsFiltered))].filter((el) => isVisible$1(el));
			};
			/**
			* @returns {boolean}
			*/
			const isModal = () => {
				return hasClass(document.body, swalClasses.shown) && !hasClass(document.body, swalClasses["toast-shown"]) && !hasClass(document.body, swalClasses["no-backdrop"]);
			};
			/**
			* @returns {boolean}
			*/
			const isToast = () => {
				const popup = getPopup();
				if (!popup) return false;
				return hasClass(popup, swalClasses.toast);
			};
			/**
			* @returns {boolean}
			*/
			const isLoading = () => {
				const popup = getPopup();
				if (!popup) return false;
				return popup.hasAttribute("data-loading");
			};
			/**
			* Securely set innerHTML of an element
			* https://github.com/sweetalert2/sweetalert2/issues/1926
			*
			* @param {HTMLElement} elem
			* @param {string} html
			*/
			const setInnerHtml = (elem, html) => {
				elem.textContent = "";
				if (html) {
					const parsed = new DOMParser().parseFromString(html, `text/html`);
					const head = parsed.querySelector("head");
					if (head) Array.from(head.childNodes).forEach((child) => {
						elem.appendChild(child);
					});
					const body = parsed.querySelector("body");
					if (body) Array.from(body.childNodes).forEach((child) => {
						if (child instanceof HTMLVideoElement || child instanceof HTMLAudioElement) elem.appendChild(child.cloneNode(true));
						else elem.appendChild(child);
					});
				}
			};
			/**
			* @param {HTMLElement} elem
			* @param {string} className
			* @returns {boolean}
			*/
			const hasClass = (elem, className) => {
				if (!className) return false;
				return className.split(/\s+/).every((cls) => elem.classList.contains(cls));
			};
			/**
			* @param {HTMLElement} elem
			* @param {SweetAlertOptions} params
			*/
			const removeCustomClasses = (elem, params) => {
				Array.from(elem.classList).forEach((className) => {
					if (!Object.values(swalClasses).includes(className) && !Object.values(iconTypes).includes(className) && !Object.values(params.showClass || {}).includes(className)) elem.classList.remove(className);
				});
			};
			/**
			* @param {HTMLElement} elem
			* @param {SweetAlertOptions} params
			* @param {string} className
			*/
			const applyCustomClass = (elem, params, className) => {
				removeCustomClasses(elem, params);
				if (!params.customClass) return;
				const customClass = params.customClass[className];
				if (!customClass) return;
				if (typeof customClass !== "string" && !customClass.forEach) {
					warn(`Invalid type of customClass.${className}! Expected string or iterable object, got "${typeof customClass}"`);
					return;
				}
				addClass(elem, customClass);
			};
			/**
			* @param {HTMLElement} popup
			* @param {import('./renderers/renderInput').InputClass | SweetAlertInput} inputClass
			* @returns {HTMLInputElement | null}
			*/
			const getInput$1 = (popup, inputClass) => {
				if (!inputClass) return null;
				switch (inputClass) {
					case "select":
					case "textarea":
					case "file": return popup.querySelector(`.${swalClasses.popup} > .${swalClasses[inputClass]}`);
					case "checkbox": return popup.querySelector(`.${swalClasses.popup} > .${swalClasses.checkbox} input`);
					case "radio": return popup.querySelector(`.${swalClasses.popup} > .${swalClasses.radio} input:checked`) || popup.querySelector(`.${swalClasses.popup} > .${swalClasses.radio} input:first-child`);
					case "range": return popup.querySelector(`.${swalClasses.popup} > .${swalClasses.range} input`);
					default: return popup.querySelector(`.${swalClasses.popup} > .${swalClasses.input}`);
				}
			};
			/**
			* @param {HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement} input
			*/
			const focusInput = (input) => {
				input.focus();
				if (input.type !== "file") {
					const val = input.value;
					input.value = "";
					input.value = val;
				}
			};
			/**
			* @param {HTMLElement | HTMLElement[] | null} target
			* @param {string | string[] | readonly string[] | undefined} classList
			* @param {boolean} condition
			*/
			const toggleClass = (target, classList, condition) => {
				if (!target || !classList) return;
				const classes = typeof classList === "string" ? classList.split(/\s+/).filter(Boolean) : classList;
				(Array.isArray(target) ? target : [target]).forEach((elem) => {
					classes.forEach((className) => {
						if (condition) elem.classList.add(className);
						else elem.classList.remove(className);
					});
				});
			};
			/**
			* @param {HTMLElement | HTMLElement[] | null} target
			* @param {string | string[] | readonly string[] | undefined} classList
			*/
			const addClass = (target, classList) => {
				toggleClass(target, classList, true);
			};
			/**
			* @param {HTMLElement | HTMLElement[] | null} target
			* @param {string | string[] | readonly string[] | undefined} classList
			*/
			const removeClass = (target, classList) => {
				toggleClass(target, classList, false);
			};
			/**
			* Get direct child of an element by class name
			*
			* @param {HTMLElement} elem
			* @param {string} className
			* @returns {HTMLElement | undefined}
			*/
			const getDirectChildByClass = (elem, className) => Array.from(elem.children).find((child) => child instanceof HTMLElement && hasClass(child, className));
			/**
			* @param {HTMLElement} elem
			* @param {string} property
			* @param {string | number | null | undefined} value
			*/
			const applyNumericalStyle = (elem, property, value) => {
				if (value === `${parseInt(`${value}`)}`) value = parseInt(value);
				if (value || value === 0) elem.style.setProperty(property, typeof value === "number" ? `${value}px` : /** @type {string} */ value);
				else elem.style.removeProperty(property);
			};
			/**
			* @param {HTMLElement | null} elem
			* @param {string} display
			*/
			const show = (elem, display = "flex") => {
				if (!elem) return;
				elem.style.display = display;
			};
			/**
			* @param {HTMLElement | null} elem
			*/
			const hide = (elem) => {
				if (!elem) return;
				elem.style.display = "none";
			};
			/**
			* @param {HTMLElement | null} elem
			* @param {string} display
			*/
			const showWhenInnerHtmlPresent = (elem, display = "block") => {
				if (!elem) return;
				new MutationObserver(() => {
					toggle(elem, elem.innerHTML, display);
				}).observe(elem, {
					childList: true,
					subtree: true
				});
			};
			/**
			* @param {HTMLElement} parent
			* @param {string} selector
			* @param {string} property
			* @param {string} value
			*/
			const setStyle = (parent, selector, property, value) => {
				/** @type {HTMLElement | null} */
				const el = parent.querySelector(selector);
				if (el) el.style.setProperty(property, value);
			};
			/**
			* @param {HTMLElement} elem
			* @param {boolean | string | null | undefined} condition
			* @param {string} display
			*/
			const toggle = (elem, condition, display = "flex") => {
				if (condition) show(elem, display);
				else hide(elem);
			};
			/**
			* borrowed from jquery $(elem).is(':visible') implementation
			*
			* @param {HTMLElement | null} elem
			* @returns {boolean}
			*/
			const isVisible$1 = (elem) => Boolean(elem && (elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length));
			/**
			* @returns {boolean}
			*/
			const allButtonsAreHidden = () => !isVisible$1(getConfirmButton()) && !isVisible$1(getDenyButton()) && !isVisible$1(getCancelButton());
			/**
			* @param {HTMLElement} elem
			* @returns {boolean}
			*/
			const isScrollable = (elem) => Boolean(elem.scrollHeight > elem.clientHeight);
			/**
			* @param {HTMLElement} element
			* @param {HTMLElement} stopElement
			* @returns {boolean}
			*/
			const selfOrParentIsScrollable = (element, stopElement) => {
				let parent = element;
				while (parent && parent !== stopElement) {
					if (isScrollable(parent)) return true;
					parent = parent.parentElement;
				}
				return false;
			};
			/**
			* borrowed from https://stackoverflow.com/a/46352119
			*
			* @param {HTMLElement} elem
			* @returns {boolean}
			*/
			const hasCssAnimation = (elem) => {
				const style = window.getComputedStyle(elem);
				const animDuration = parseFloat(style.getPropertyValue("animation-duration") || "0");
				const transDuration = parseFloat(style.getPropertyValue("transition-duration") || "0");
				return animDuration > 0 || transDuration > 0;
			};
			/**
			* @param {number} timer
			* @param {boolean} reset
			*/
			const animateTimerProgressBar = (timer, reset = false) => {
				const timerProgressBar = getTimerProgressBar();
				if (!timerProgressBar) return;
				if (isVisible$1(timerProgressBar)) {
					if (reset) {
						timerProgressBar.style.transition = "none";
						timerProgressBar.style.width = "100%";
					}
					setTimeout(() => {
						timerProgressBar.style.transition = `width ${timer / 1e3}s linear`;
						timerProgressBar.style.width = "0%";
					}, 10);
				}
			};
			const stopTimerProgressBar = () => {
				const timerProgressBar = getTimerProgressBar();
				if (!timerProgressBar) return;
				const timerProgressBarWidth = parseInt(window.getComputedStyle(timerProgressBar).width);
				timerProgressBar.style.removeProperty("transition");
				timerProgressBar.style.width = "100%";
				const timerProgressBarPercent = timerProgressBarWidth / parseInt(window.getComputedStyle(timerProgressBar).width) * 100;
				timerProgressBar.style.width = `${timerProgressBarPercent}%`;
			};
			/**
			* Detect Node env
			*
			* @returns {boolean}
			*/
			const isNodeEnv = () => typeof window === "undefined" || typeof document === "undefined";
			const sweetHTML = `
 <div aria-labelledby="${swalClasses.title}" aria-describedby="${swalClasses["html-container"]}" class="${swalClasses.popup}" tabindex="-1">
   <button type="button" class="${swalClasses.close}"></button>
   <ul class="${swalClasses["progress-steps"]}"></ul>
   <div class="${swalClasses.icon}"></div>
   <img class="${swalClasses.image}" />
   <h2 class="${swalClasses.title}" id="${swalClasses.title}"></h2>
   <div class="${swalClasses["html-container"]}" id="${swalClasses["html-container"]}"></div>
   <input class="${swalClasses.input}" id="${swalClasses.input}" />
   <input type="file" class="${swalClasses.file}" />
   <div class="${swalClasses.range}">
     <input type="range" />
     <output></output>
   </div>
   <select class="${swalClasses.select}" id="${swalClasses.select}"></select>
   <div class="${swalClasses.radio}"></div>
   <label class="${swalClasses.checkbox}">
     <input type="checkbox" id="${swalClasses.checkbox}" />
     <span class="${swalClasses.label}"></span>
   </label>
   <textarea class="${swalClasses.textarea}" id="${swalClasses.textarea}"></textarea>
   <div class="${swalClasses["validation-message"]}" id="${swalClasses["validation-message"]}"></div>
   <div class="${swalClasses.actions}">
     <div class="${swalClasses.loader}"></div>
     <button type="button" class="${swalClasses.confirm}"></button>
     <button type="button" class="${swalClasses.deny}"></button>
     <button type="button" class="${swalClasses.cancel}"></button>
   </div>
   <div class="${swalClasses.footer}"></div>
   <div class="${swalClasses["timer-progress-bar-container"]}">
     <div class="${swalClasses["timer-progress-bar"]}"></div>
   </div>
 </div>
`.replace(/(^|\n)\s*/g, "");
			/**
			* @returns {boolean}
			*/
			const resetOldContainer = () => {
				const oldContainer = getContainer();
				if (!oldContainer) return false;
				oldContainer.remove();
				removeClass([document.documentElement, document.body], [
					swalClasses["no-backdrop"],
					swalClasses["toast-shown"],
					swalClasses["has-column"]
				]);
				return true;
			};
			const resetValidationMessage$1 = () => {
				if (globalState.currentInstance) globalState.currentInstance.resetValidationMessage();
			};
			const addInputChangeListeners = () => {
				const popup = getPopup();
				if (!popup) return;
				const input = getDirectChildByClass(popup, swalClasses.input);
				const file = getDirectChildByClass(popup, swalClasses.file);
				/** @type {HTMLInputElement | null} */
				const range = popup.querySelector(`.${swalClasses.range} input`);
				/** @type {HTMLOutputElement | null} */
				const rangeOutput = popup.querySelector(`.${swalClasses.range} output`);
				const select = getDirectChildByClass(popup, swalClasses.select);
				/** @type {HTMLInputElement | null} */
				const checkbox = popup.querySelector(`.${swalClasses.checkbox} input`);
				const textarea = getDirectChildByClass(popup, swalClasses.textarea);
				if (input) input.oninput = resetValidationMessage$1;
				if (file) file.onchange = resetValidationMessage$1;
				if (select) select.onchange = resetValidationMessage$1;
				if (checkbox) checkbox.onchange = resetValidationMessage$1;
				if (textarea) textarea.oninput = resetValidationMessage$1;
				if (range && rangeOutput) {
					range.oninput = () => {
						resetValidationMessage$1();
						rangeOutput.value = range.value;
					};
					range.onchange = () => {
						resetValidationMessage$1();
						rangeOutput.value = range.value;
					};
				}
			};
			/**
			* @param {string | HTMLElement} target
			* @returns {HTMLElement}
			*/
			const getTarget = (target) => {
				if (typeof target === "string") {
					const element = document.querySelector(target);
					if (!element) throw new Error(`Target element "${target}" not found`);
					return element;
				}
				return target;
			};
			/**
			* @param {SweetAlertOptions} params
			*/
			const setupAccessibility = (params) => {
				const popup = getPopup();
				if (!popup) return;
				popup.setAttribute("role", params.toast ? "alert" : "dialog");
				popup.setAttribute("aria-live", params.toast ? "polite" : "assertive");
				if (!params.toast) popup.setAttribute("aria-modal", "true");
			};
			/**
			* @param {HTMLElement} targetElement
			*/
			const setupRTL = (targetElement) => {
				if (window.getComputedStyle(targetElement).direction === "rtl") {
					addClass(getContainer(), swalClasses.rtl);
					globalState.isRTL = true;
				}
			};
			/**
			* Add modal + backdrop to DOM
			*
			* @param {SweetAlertOptions} params
			*/
			const init = (params) => {
				const oldContainerExisted = resetOldContainer();
				if (isNodeEnv()) {
					error("SweetAlert2 requires document to initialize");
					return;
				}
				const container = document.createElement("div");
				container.className = swalClasses.container;
				if (oldContainerExisted) addClass(container, swalClasses["no-transition"]);
				setInnerHtml(container, sweetHTML);
				container.dataset["swal2Theme"] = params.theme;
				const targetElement = getTarget(params.target || "body");
				targetElement.appendChild(container);
				if (params.topLayer) {
					container.setAttribute("popover", "");
					container.showPopover();
				}
				setupAccessibility(params);
				setupRTL(targetElement);
				addInputChangeListeners();
			};
			/**
			* @param {HTMLElement | object | string} param
			* @param {HTMLElement} target
			*/
			const parseHtmlToContainer = (param, target) => {
				if (param instanceof HTMLElement) target.appendChild(param);
				else if (typeof param === "object") handleObject(param, target);
				else if (param) setInnerHtml(target, param);
			};
			/**
			* @param {object} param
			* @param {HTMLElement} target
			*/
			const handleObject = (param, target) => {
				if ("jquery" in param) handleJqueryElem(target, param);
				else setInnerHtml(target, param.toString());
			};
			/**
			* @param {HTMLElement} target
			* @param {any} elem
			*/
			const handleJqueryElem = (target, elem) => {
				target.textContent = "";
				if (0 in elem) for (let i = 0; i in elem; i++) target.appendChild(elem[i].cloneNode(true));
				else target.appendChild(elem.cloneNode(true));
			};
			/**
			* @param {SweetAlert} instance
			* @param {SweetAlertOptions} params
			*/
			const renderActions = (instance, params) => {
				const actions = getActions();
				const loader = getLoader();
				if (!actions || !loader) return;
				if (!params.showConfirmButton && !params.showDenyButton && !params.showCancelButton) hide(actions);
				else show(actions);
				applyCustomClass(actions, params, "actions");
				renderButtons(actions, loader, params);
				setInnerHtml(loader, params.loaderHtml || "");
				applyCustomClass(loader, params, "loader");
			};
			/**
			* @param {HTMLElement} actions
			* @param {HTMLElement} loader
			* @param {SweetAlertOptions} params
			*/
			function renderButtons(actions, loader, params) {
				const confirmButton = getConfirmButton();
				const denyButton = getDenyButton();
				const cancelButton = getCancelButton();
				if (!confirmButton || !denyButton || !cancelButton) return;
				renderButton(confirmButton, "confirm", params);
				renderButton(denyButton, "deny", params);
				renderButton(cancelButton, "cancel", params);
				handleButtonsStyling(confirmButton, denyButton, cancelButton, params);
				if (params.reverseButtons) {
					if (params.toast) {
						actions.insertBefore(cancelButton, confirmButton);
						actions.insertBefore(denyButton, confirmButton);
					} else {
						actions.insertBefore(cancelButton, loader);
						actions.insertBefore(denyButton, loader);
						actions.insertBefore(confirmButton, loader);
					}
				}
			}
			/**
			* @param {HTMLElement} confirmButton
			* @param {HTMLElement} denyButton
			* @param {HTMLElement} cancelButton
			* @param {SweetAlertOptions} params
			*/
			function handleButtonsStyling(confirmButton, denyButton, cancelButton, params) {
				if (!params.buttonsStyling) {
					removeClass([
						confirmButton,
						denyButton,
						cancelButton
					], swalClasses.styled);
					return;
				}
				addClass([
					confirmButton,
					denyButton,
					cancelButton
				], swalClasses.styled);
				[
					[
						confirmButton,
						"confirm",
						params.confirmButtonColor
					],
					[
						denyButton,
						"deny",
						params.denyButtonColor
					],
					[
						cancelButton,
						"cancel",
						params.cancelButtonColor
					]
				].forEach(([button, type, color]) => {
					if (color) button.style.setProperty(`--swal2-${type}-button-background-color`, color);
					applyOutlineColor(button);
				});
			}
			/**
			* @param {HTMLElement} button
			*/
			function applyOutlineColor(button) {
				const buttonStyle = window.getComputedStyle(button);
				if (buttonStyle.getPropertyValue("--swal2-action-button-focus-box-shadow")) return;
				const outlineColor = buttonStyle.backgroundColor.replace(/rgba?\((\d+), (\d+), (\d+).*/, "rgba($1, $2, $3, 0.5)");
				button.style.setProperty("--swal2-action-button-focus-box-shadow", buttonStyle.getPropertyValue("--swal2-outline").replace(/ rgba\(.*/, ` ${outlineColor}`));
			}
			/**
			* @param {HTMLElement} button
			* @param {'confirm' | 'deny' | 'cancel'} buttonType
			* @param {SweetAlertOptions} params
			*/
			function renderButton(button, buttonType, params) {
				const buttonName = capitalizeFirstLetter(buttonType);
				toggle(button, params[`show${buttonName}Button`], "inline-block");
				setInnerHtml(button, params[`${buttonType}ButtonText`] || "");
				button.setAttribute("aria-label", params[`${buttonType}ButtonAriaLabel`] || "");
				button.className = swalClasses[buttonType];
				applyCustomClass(button, params, `${buttonType}Button`);
			}
			/**
			* @param {SweetAlert} instance
			* @param {SweetAlertOptions} params
			*/
			const renderCloseButton = (instance, params) => {
				const closeButton = getCloseButton();
				if (!closeButton) return;
				setInnerHtml(closeButton, params.closeButtonHtml || "");
				applyCustomClass(closeButton, params, "closeButton");
				toggle(closeButton, params.showCloseButton);
				closeButton.setAttribute("aria-label", params.closeButtonAriaLabel || "");
			};
			/**
			* @param {SweetAlert} instance
			* @param {SweetAlertOptions} params
			*/
			const renderContainer = (instance, params) => {
				const container = getContainer();
				if (!container) return;
				handleBackdropParam(container, params.backdrop);
				handlePositionParam(container, params.position);
				handleGrowParam(container, params.grow);
				applyCustomClass(container, params, "container");
			};
			/**
			* @param {HTMLElement} container
			* @param {SweetAlertOptions['backdrop']} backdrop
			*/
			function handleBackdropParam(container, backdrop) {
				if (typeof backdrop === "string") container.style.background = backdrop;
				else if (!backdrop) addClass([document.documentElement, document.body], swalClasses["no-backdrop"]);
			}
			/**
			* @param {HTMLElement} container
			* @param {SweetAlertOptions['position']} position
			*/
			function handlePositionParam(container, position) {
				if (!position) return;
				if (position in swalClasses) addClass(container, swalClasses[position]);
				else {
					warn("The \"position\" parameter is not valid, defaulting to \"center\"");
					addClass(container, swalClasses.center);
				}
			}
			/**
			* @param {HTMLElement} container
			* @param {SweetAlertOptions['grow']} grow
			*/
			function handleGrowParam(container, grow) {
				if (!grow) return;
				addClass(container, swalClasses[`grow-${grow}`]);
			}
			/**
			* This module contains `WeakMap`s for each effectively-"private  property" that a `Swal` has.
			* For example, to set the private property "foo" of `this` to "bar", you can `privateProps.foo.set(this, 'bar')`
			* This is the approach that Babel will probably take to implement private methods/fields
			*   https://github.com/tc39/proposal-private-methods
			*   https://github.com/babel/babel/pull/7555
			* Once we have the changes from that PR in Babel, and our core class fits reasonable in *one module*
			*   then we can use that language feature.
			*/
			var privateProps = {
				innerParams: /* @__PURE__ */ new WeakMap(),
				domCache: /* @__PURE__ */ new WeakMap(),
				focusedElement: /* @__PURE__ */ new WeakMap()
			};
			/** @type {InputClass[]} */
			const inputClasses = [
				"input",
				"file",
				"range",
				"select",
				"radio",
				"checkbox",
				"textarea"
			];
			/**
			* @param {SweetAlert} instance
			* @param {SweetAlertOptions} params
			*/
			const renderInput = (instance, params) => {
				const popup = getPopup();
				if (!popup) return;
				const innerParams = privateProps.innerParams.get(instance);
				const rerender = !innerParams || params.input !== innerParams.input;
				inputClasses.forEach((inputClass) => {
					const inputContainer = getDirectChildByClass(popup, swalClasses[inputClass]);
					if (!inputContainer) return;
					setAttributes(inputClass, params.inputAttributes);
					inputContainer.className = swalClasses[inputClass];
					if (rerender) hide(inputContainer);
				});
				if (params.input) {
					if (rerender) showInput(params);
					setCustomClass(params);
				}
			};
			/**
			* @param {SweetAlertOptions} params
			*/
			const showInput = (params) => {
				if (!params.input) return;
				if (!renderInputType[params.input]) {
					error(`Unexpected type of input! Expected ${Object.keys(renderInputType).join(" | ")}, got "${params.input}"`);
					return;
				}
				const inputContainer = getInputContainer(params.input);
				if (!inputContainer) return;
				const input = renderInputType[params.input](inputContainer, params);
				show(inputContainer);
				if (params.inputAutoFocus) setTimeout(() => {
					focusInput(input);
				});
			};
			/**
			* @param {HTMLInputElement} input
			*/
			const removeAttributes = (input) => {
				for (const { name } of Array.from(input.attributes)) if (![
					"id",
					"type",
					"value",
					"style"
				].includes(name)) input.removeAttribute(name);
			};
			/**
			* @param {InputClass} inputClass
			* @param {SweetAlertOptions['inputAttributes']} inputAttributes
			*/
			const setAttributes = (inputClass, inputAttributes) => {
				const popup = getPopup();
				if (!popup) return;
				const input = getInput$1(popup, inputClass);
				if (!input) return;
				removeAttributes(input);
				for (const attr in inputAttributes) input.setAttribute(attr, inputAttributes[attr]);
			};
			/**
			* @param {SweetAlertOptions} params
			*/
			const setCustomClass = (params) => {
				if (!params.input) return;
				const inputContainer = getInputContainer(params.input);
				if (inputContainer) applyCustomClass(inputContainer, params, "input");
			};
			/**
			* @param {HTMLInputElement | HTMLTextAreaElement} input
			* @param {SweetAlertOptions} params
			*/
			const setInputPlaceholder = (input, params) => {
				if (!input.placeholder && params.inputPlaceholder) input.placeholder = params.inputPlaceholder;
			};
			/**
			* @param {Input} input
			* @param {Input} prependTo
			* @param {SweetAlertOptions} params
			*/
			const setInputLabel = (input, prependTo, params) => {
				if (params.inputLabel) {
					const label = document.createElement("label");
					const labelClass = swalClasses["input-label"];
					label.setAttribute("for", input.id);
					label.className = labelClass;
					if (typeof params.customClass === "object") addClass(label, params.customClass.inputLabel);
					label.innerText = params.inputLabel;
					prependTo.insertAdjacentElement("beforebegin", label);
				}
			};
			/**
			* @param {SweetAlertInput} inputType
			* @returns {HTMLElement | undefined}
			*/
			const getInputContainer = (inputType) => {
				const popup = getPopup();
				if (!popup) return;
				return getDirectChildByClass(popup, swalClasses[inputType] || swalClasses.input);
			};
			/**
			* @param {HTMLInputElement | HTMLOutputElement | HTMLTextAreaElement} input
			* @param {SweetAlertOptions['inputValue']} inputValue
			*/
			const checkAndSetInputValue = (input, inputValue) => {
				if (["string", "number"].includes(typeof inputValue)) input.value = `${inputValue}`;
				else if (!isPromise(inputValue)) warn(`Unexpected type of inputValue! Expected "string", "number" or "Promise", got "${typeof inputValue}"`);
			};
			/** @type {Record<SweetAlertInput, (input: Input | HTMLElement, params: SweetAlertOptions) => Input>} */
			const renderInputType = {};
			/**
			* @param {Input | HTMLElement} input
			* @param {SweetAlertOptions} params
			* @returns {Input}
			*/
			renderInputType.text = renderInputType.email = renderInputType.password = renderInputType.number = renderInputType.tel = renderInputType.url = renderInputType.search = renderInputType.date = renderInputType["datetime-local"] = renderInputType.time = renderInputType.week = renderInputType.month = (input, params) => {
				const inputElement = input;
				checkAndSetInputValue(inputElement, params.inputValue);
				setInputLabel(inputElement, inputElement, params);
				setInputPlaceholder(inputElement, params);
				inputElement.type = params.input;
				return inputElement;
			};
			/**
			* @param {Input | HTMLElement} input
			* @param {SweetAlertOptions} params
			* @returns {Input}
			*/
			renderInputType.file = (input, params) => {
				const inputElement = input;
				setInputLabel(inputElement, inputElement, params);
				setInputPlaceholder(inputElement, params);
				return inputElement;
			};
			/**
			* @param {Input | HTMLElement} range
			* @param {SweetAlertOptions} params
			* @returns {Input}
			*/
			renderInputType.range = (range, params) => {
				const rangeContainer = range;
				const rangeInput = rangeContainer.querySelector("input");
				const rangeOutput = rangeContainer.querySelector("output");
				if (rangeInput) {
					checkAndSetInputValue(rangeInput, params.inputValue);
					rangeInput.type = params.input;
					setInputLabel(
						rangeInput,
						/** @type {Input} */
						range,
						params
					);
				}
				if (rangeOutput) checkAndSetInputValue(rangeOutput, params.inputValue);
				return range;
			};
			/**
			* @param {Input | HTMLElement} select
			* @param {SweetAlertOptions} params
			* @returns {Input}
			*/
			renderInputType.select = (select, params) => {
				const selectElement = select;
				selectElement.textContent = "";
				if (params.inputPlaceholder) {
					const placeholder = document.createElement("option");
					setInnerHtml(placeholder, params.inputPlaceholder);
					placeholder.value = "";
					placeholder.disabled = true;
					placeholder.selected = true;
					selectElement.appendChild(placeholder);
				}
				setInputLabel(selectElement, selectElement, params);
				return selectElement;
			};
			/**
			* @param {Input | HTMLElement} radio
			* @returns {Input}
			*/
			renderInputType.radio = (radio) => {
				const radioElement = radio;
				radioElement.textContent = "";
				return radio;
			};
			/**
			* @param {Input | HTMLElement} checkboxContainer
			* @param {SweetAlertOptions} params
			* @returns {Input}
			*/
			renderInputType.checkbox = (checkboxContainer, params) => {
				const popup = getPopup();
				if (!popup) throw new Error("Popup not found");
				const checkbox = getInput$1(popup, "checkbox");
				if (!checkbox) throw new Error("Checkbox input not found");
				checkbox.value = "1";
				checkbox.checked = Boolean(params.inputValue);
				const label = checkboxContainer.querySelector("span");
				if (label) {
					const placeholderOrLabel = params.inputPlaceholder || params.inputLabel;
					if (placeholderOrLabel) setInnerHtml(label, placeholderOrLabel);
				}
				return checkbox;
			};
			/**
			* @param {Input | HTMLElement} textarea
			* @param {SweetAlertOptions} params
			* @returns {Input}
			*/
			renderInputType.textarea = (textarea, params) => {
				const textareaElement = textarea;
				checkAndSetInputValue(textareaElement, params.inputValue);
				setInputPlaceholder(textareaElement, params);
				setInputLabel(textareaElement, textareaElement, params);
				/**
				* @param {HTMLElement} el
				* @returns {number}
				*/
				const getMargin = (el) => parseInt(window.getComputedStyle(el).marginLeft) + parseInt(window.getComputedStyle(el).marginRight);
				setTimeout(() => {
					if ("MutationObserver" in window) {
						const popup = getPopup();
						if (!popup) return;
						const initialPopupWidth = parseInt(window.getComputedStyle(popup).width);
						const textareaResizeHandler = () => {
							if (!document.body.contains(textareaElement)) return;
							const textareaWidth = textareaElement.offsetWidth + getMargin(textareaElement);
							const popupElement = getPopup();
							if (popupElement) {
								if (textareaWidth > initialPopupWidth) popupElement.style.width = `${textareaWidth}px`;
								else applyNumericalStyle(popupElement, "width", params.width);
							}
						};
						new MutationObserver(textareaResizeHandler).observe(textareaElement, {
							attributes: true,
							attributeFilter: ["style"]
						});
					}
				});
				return textareaElement;
			};
			/**
			* @param {SweetAlert} instance
			* @param {SweetAlertOptions} params
			*/
			const renderContent = (instance, params) => {
				const htmlContainer = getHtmlContainer();
				if (!htmlContainer) return;
				showWhenInnerHtmlPresent(htmlContainer);
				applyCustomClass(htmlContainer, params, "htmlContainer");
				if (params.html) {
					parseHtmlToContainer(params.html, htmlContainer);
					show(htmlContainer, "block");
				} else if (params.text) {
					htmlContainer.textContent = params.text;
					show(htmlContainer, "block");
				} else hide(htmlContainer);
				renderInput(instance, params);
			};
			/**
			* @param {SweetAlert} instance
			* @param {SweetAlertOptions} params
			*/
			const renderFooter = (instance, params) => {
				const footer = getFooter();
				if (!footer) return;
				showWhenInnerHtmlPresent(footer);
				toggle(footer, Boolean(params.footer), "block");
				if (params.footer) parseHtmlToContainer(params.footer, footer);
				applyCustomClass(footer, params, "footer");
			};
			/**
			* @param {SweetAlert} instance
			* @param {SweetAlertOptions} params
			*/
			const renderIcon = (instance, params) => {
				const innerParams = privateProps.innerParams.get(instance);
				const icon = getIcon();
				if (!icon) return;
				if (innerParams && params.icon === innerParams.icon) {
					setContent(icon, params);
					applyStyles(icon, params);
					return;
				}
				if (!params.icon && !params.iconHtml) {
					hide(icon);
					return;
				}
				if (params.icon && Object.keys(iconTypes).indexOf(params.icon) === -1) {
					error(`Unknown icon! Expected "success", "error", "warning", "info" or "question", got "${params.icon}"`);
					hide(icon);
					return;
				}
				show(icon);
				setContent(icon, params);
				applyStyles(icon, params);
				addClass(icon, params.showClass && params.showClass.icon);
				window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", adjustSuccessIconBackgroundColor);
			};
			/**
			* @param {HTMLElement} icon
			* @param {SweetAlertOptions} params
			*/
			const applyStyles = (icon, params) => {
				for (const [iconType, iconClassName] of Object.entries(iconTypes)) if (params.icon !== iconType) removeClass(icon, iconClassName);
				addClass(icon, params.icon && iconTypes[params.icon]);
				setColor(icon, params);
				adjustSuccessIconBackgroundColor();
				applyCustomClass(icon, params, "icon");
			};
			const adjustSuccessIconBackgroundColor = () => {
				const popup = getPopup();
				if (!popup) return;
				const popupBackgroundColor = window.getComputedStyle(popup).getPropertyValue("background-color");
				popup.querySelectorAll("[class^=swal2-success-circular-line], .swal2-success-fix").forEach((part) => {
					part.style.backgroundColor = popupBackgroundColor;
				});
			};
			/**
			*
			* @param {SweetAlertOptions} params
			* @returns {string}
			*/
			const successIconHtml = (params) => `
  ${params.animation ? "<div class=\"swal2-success-circular-line-left\"></div>" : ""}
  <span class="swal2-success-line-tip"></span> <span class="swal2-success-line-long"></span>
  <div class="swal2-success-ring"></div>
  ${params.animation ? "<div class=\"swal2-success-fix\"></div>" : ""}
  ${params.animation ? "<div class=\"swal2-success-circular-line-right\"></div>" : ""}
`;
			const errorIconHtml = `
  <span class="swal2-x-mark">
    <span class="swal2-x-mark-line-left"></span>
    <span class="swal2-x-mark-line-right"></span>
  </span>
`;
			/**
			* @param {HTMLElement} icon
			* @param {SweetAlertOptions} params
			*/
			const setContent = (icon, params) => {
				if (!params.icon && !params.iconHtml) return;
				let oldContent = icon.innerHTML;
				let newContent = "";
				if (params.iconHtml) newContent = iconContent(params.iconHtml);
				else if (params.icon === "success") {
					newContent = successIconHtml(params);
					oldContent = oldContent.replace(/ style=".*?"/g, "");
				} else if (params.icon === "error") newContent = errorIconHtml;
				else if (params.icon) newContent = iconContent({
					question: "?",
					warning: "!",
					info: "i"
				}[params.icon]);
				if (oldContent.trim() !== newContent.trim()) setInnerHtml(icon, newContent);
			};
			/**
			* @param {HTMLElement} icon
			* @param {SweetAlertOptions} params
			*/
			const setColor = (icon, params) => {
				if (!params.iconColor) return;
				icon.style.color = params.iconColor;
				icon.style.borderColor = params.iconColor;
				for (const sel of [
					".swal2-success-line-tip",
					".swal2-success-line-long",
					".swal2-x-mark-line-left",
					".swal2-x-mark-line-right"
				]) setStyle(icon, sel, "background-color", params.iconColor);
				setStyle(icon, ".swal2-success-ring", "border-color", params.iconColor);
			};
			/**
			* @param {string} content
			* @returns {string}
			*/
			const iconContent = (content) => `<div class="${swalClasses["icon-content"]}">${content}</div>`;
			/**
			* @param {SweetAlert} instance
			* @param {SweetAlertOptions} params
			*/
			const renderImage = (instance, params) => {
				const image = getImage();
				if (!image) return;
				if (!params.imageUrl) {
					hide(image);
					return;
				}
				show(image, "");
				image.setAttribute("src", params.imageUrl);
				image.setAttribute("alt", params.imageAlt || "");
				applyNumericalStyle(image, "width", params.imageWidth);
				applyNumericalStyle(image, "height", params.imageHeight);
				image.className = swalClasses.image;
				applyCustomClass(image, params, "image");
			};
			let dragging = false;
			let mousedownX = 0;
			let mousedownY = 0;
			let initialX = 0;
			let initialY = 0;
			/**
			* @param {HTMLElement} popup
			*/
			const addDraggableListeners = (popup) => {
				popup.addEventListener("mousedown", down);
				document.body.addEventListener("mousemove", move);
				popup.addEventListener("mouseup", up);
				popup.addEventListener("touchstart", down);
				document.body.addEventListener("touchmove", move);
				popup.addEventListener("touchend", up);
			};
			/**
			* @param {HTMLElement} popup
			*/
			const removeDraggableListeners = (popup) => {
				popup.removeEventListener("mousedown", down);
				document.body.removeEventListener("mousemove", move);
				popup.removeEventListener("mouseup", up);
				popup.removeEventListener("touchstart", down);
				document.body.removeEventListener("touchmove", move);
				popup.removeEventListener("touchend", up);
			};
			/**
			* @param {MouseEvent | TouchEvent} event
			*/
			const down = (event) => {
				const popup = getPopup();
				if (!popup) return;
				const icon = getIcon();
				if (event.target === popup || icon && icon.contains(
					/** @type {HTMLElement} */
					event.target
				)) {
					dragging = true;
					const clientXY = getClientXY(event);
					mousedownX = clientXY.clientX;
					mousedownY = clientXY.clientY;
					initialX = parseInt(popup.style.insetInlineStart) || 0;
					initialY = parseInt(popup.style.insetBlockStart) || 0;
					addClass(popup, "swal2-dragging");
				}
			};
			/**
			* @param {MouseEvent | TouchEvent} event
			*/
			const move = (event) => {
				const popup = getPopup();
				if (!popup) return;
				if (dragging) {
					let { clientX, clientY } = getClientXY(event);
					const deltaX = clientX - mousedownX;
					popup.style.insetInlineStart = `${initialX + (globalState.isRTL ? -deltaX : deltaX)}px`;
					popup.style.insetBlockStart = `${initialY + (clientY - mousedownY)}px`;
				}
			};
			const up = () => {
				const popup = getPopup();
				dragging = false;
				removeClass(popup, "swal2-dragging");
			};
			/**
			* @param {MouseEvent | TouchEvent} event
			* @returns {{ clientX: number, clientY: number }}
			*/
			const getClientXY = (event) => {
				const source = event.type.startsWith("touch") ? event.touches[0] : /** @type {MouseEvent} */ event;
				return {
					clientX: source.clientX,
					clientY: source.clientY
				};
			};
			/**
			* @param {SweetAlert} instance
			* @param {SweetAlertOptions} params
			*/
			const renderPopup = (instance, params) => {
				const container = getContainer();
				const popup = getPopup();
				if (!container || !popup) return;
				if (params.toast) {
					applyNumericalStyle(container, "width", params.width);
					popup.style.width = "100%";
					const loader = getLoader();
					if (loader) popup.insertBefore(loader, getIcon());
				} else applyNumericalStyle(popup, "width", params.width);
				applyNumericalStyle(popup, "padding", params.padding);
				if (params.color) popup.style.color = params.color;
				if (params.background) popup.style.background = params.background;
				hide(getValidationMessage());
				addClasses$1(popup, params);
				if (params.draggable && !params.toast) {
					addClass(popup, swalClasses.draggable);
					addDraggableListeners(popup);
				} else {
					removeClass(popup, swalClasses.draggable);
					removeDraggableListeners(popup);
				}
			};
			/**
			* @param {HTMLElement} popup
			* @param {SweetAlertOptions} params
			*/
			const addClasses$1 = (popup, params) => {
				const showClass = params.showClass || {};
				popup.className = `${swalClasses.popup} ${isVisible$1(popup) ? showClass.popup : ""}`;
				if (params.toast) {
					addClass([document.documentElement, document.body], swalClasses["toast-shown"]);
					addClass(popup, swalClasses.toast);
				} else addClass(popup, swalClasses.modal);
				applyCustomClass(popup, params, "popup");
				if (typeof params.customClass === "string") addClass(popup, params.customClass);
				if (params.icon) addClass(popup, swalClasses[`icon-${params.icon}`]);
			};
			/**
			* @param {SweetAlert} instance
			* @param {SweetAlertOptions} params
			*/
			const renderProgressSteps = (instance, params) => {
				const progressStepsContainer = getProgressSteps();
				if (!progressStepsContainer) return;
				const { progressSteps, currentProgressStep } = params;
				if (!progressSteps || progressSteps.length === 0 || currentProgressStep === void 0) {
					hide(progressStepsContainer);
					return;
				}
				show(progressStepsContainer);
				progressStepsContainer.textContent = "";
				if (currentProgressStep >= progressSteps.length) warn("Invalid currentProgressStep parameter, it should be less than progressSteps.length (currentProgressStep like JS arrays starts from 0)");
				progressSteps.forEach((step, index) => {
					const stepEl = createStepElement(step);
					progressStepsContainer.appendChild(stepEl);
					if (index === currentProgressStep) addClass(stepEl, swalClasses["active-progress-step"]);
					if (index !== progressSteps.length - 1) {
						const lineEl = createLineElement(params);
						progressStepsContainer.appendChild(lineEl);
					}
				});
			};
			/**
			* @param {string} step
			* @returns {HTMLLIElement}
			*/
			const createStepElement = (step) => {
				const stepEl = document.createElement("li");
				addClass(stepEl, swalClasses["progress-step"]);
				setInnerHtml(stepEl, step);
				return stepEl;
			};
			/**
			* @param {SweetAlertOptions} params
			* @returns {HTMLLIElement}
			*/
			const createLineElement = (params) => {
				const lineEl = document.createElement("li");
				addClass(lineEl, swalClasses["progress-step-line"]);
				if (params.progressStepsDistance) applyNumericalStyle(lineEl, "width", params.progressStepsDistance);
				return lineEl;
			};
			/**
			* @param {SweetAlert} instance
			* @param {SweetAlertOptions} params
			*/
			const renderTitle = (instance, params) => {
				const title = getTitle();
				if (!title) return;
				showWhenInnerHtmlPresent(title);
				toggle(title, Boolean(params.title || params.titleText), "block");
				if (params.title) parseHtmlToContainer(params.title, title);
				if (params.titleText) title.innerText = params.titleText;
				applyCustomClass(title, params, "title");
			};
			/**
			* @param {SweetAlert} instance
			* @param {SweetAlertOptions} params
			*/
			const render = (instance, params) => {
				var _globalState$eventEmi;
				renderPopup(instance, params);
				renderContainer(instance, params);
				renderProgressSteps(instance, params);
				renderIcon(instance, params);
				renderImage(instance, params);
				renderTitle(instance, params);
				renderCloseButton(instance, params);
				renderContent(instance, params);
				renderActions(instance, params);
				renderFooter(instance, params);
				const popup = getPopup();
				if (typeof params.didRender === "function" && popup) params.didRender(popup);
				(_globalState$eventEmi = globalState.eventEmitter) === null || _globalState$eventEmi === void 0 || _globalState$eventEmi.emit("didRender", popup);
			};
			const isVisible = () => {
				return isVisible$1(getPopup());
			};
			const clickConfirm = () => {
				var _dom$getConfirmButton;
				return (_dom$getConfirmButton = getConfirmButton()) === null || _dom$getConfirmButton === void 0 ? void 0 : _dom$getConfirmButton.click();
			};
			const clickDeny = () => {
				var _dom$getDenyButton;
				return (_dom$getDenyButton = getDenyButton()) === null || _dom$getDenyButton === void 0 ? void 0 : _dom$getDenyButton.click();
			};
			const clickCancel = () => {
				var _dom$getCancelButton;
				return (_dom$getCancelButton = getCancelButton()) === null || _dom$getCancelButton === void 0 ? void 0 : _dom$getCancelButton.click();
			};
			/** @type {Record<DismissReason, DismissReason>} */
			const DismissReason = Object.freeze({
				cancel: "cancel",
				backdrop: "backdrop",
				close: "close",
				esc: "esc",
				timer: "timer"
			});
			/**
			* @param {GlobalState} globalState
			*/
			const removeKeydownHandler = (globalState) => {
				if (globalState.keydownTarget && globalState.keydownHandlerAdded && globalState.keydownHandler) {
					const handler = globalState.keydownHandler;
					globalState.keydownTarget.removeEventListener("keydown", handler, { capture: globalState.keydownListenerCapture });
					globalState.keydownHandlerAdded = false;
				}
			};
			/**
			* @param {GlobalState} globalState
			* @param {SweetAlertOptions} innerParams
			* @param {(dismiss: DismissReason) => void} dismissWith
			*/
			const addKeydownHandler = (globalState, innerParams, dismissWith) => {
				removeKeydownHandler(globalState);
				if (!innerParams.toast) {
					/** @type {(this: HTMLElement, event: KeyboardEvent) => void} */
					const handler = (e) => keydownHandler(innerParams, e, dismissWith);
					globalState.keydownHandler = handler;
					const target = innerParams.keydownListenerCapture ? window : getPopup();
					if (target) {
						globalState.keydownTarget = target;
						globalState.keydownListenerCapture = innerParams.keydownListenerCapture;
						const eventHandler = handler;
						globalState.keydownTarget.addEventListener("keydown", eventHandler, { capture: globalState.keydownListenerCapture });
						globalState.keydownHandlerAdded = true;
					}
				}
			};
			/**
			* @param {number} index
			* @param {number} increment
			* @returns {boolean} shouldPreventDefault
			*/
			const setFocus = (index, increment) => {
				var _dom$getPopup;
				const focusableElements = getFocusableElements();
				if (focusableElements.length) {
					index = index + increment;
					if (index === -2) index = focusableElements.length - 1;
					if (index === focusableElements.length) index = 0;
					else if (index === -1) index = focusableElements.length - 1;
					focusableElements[index].focus();
					if (isFirefox() && focusableElements[index] instanceof HTMLIFrameElement) return false;
					return true;
				}
				(_dom$getPopup = getPopup()) === null || _dom$getPopup === void 0 || _dom$getPopup.focus();
				return true;
			};
			const arrowKeysNextButton = ["ArrowRight", "ArrowDown"];
			const arrowKeysPreviousButton = ["ArrowLeft", "ArrowUp"];
			/**
			* @param {SweetAlertOptions} innerParams
			* @param {KeyboardEvent} event
			* @param {(dismiss: DismissReason) => void} dismissWith
			*/
			const keydownHandler = (innerParams, event, dismissWith) => {
				if (!innerParams) return;
				if (event.isComposing || event.keyCode === 229) return;
				if (innerParams.stopKeydownPropagation) event.stopPropagation();
				if (event.key === "Enter") handleEnter(event, innerParams);
				else if (event.key === "Tab") handleTab(event);
				else if ([...arrowKeysNextButton, ...arrowKeysPreviousButton].includes(event.key)) handleArrows(event.key);
				else if (event.key === "Escape") handleEsc(event, innerParams, dismissWith);
			};
			/**
			* @param {KeyboardEvent} event
			* @param {SweetAlertOptions} innerParams
			*/
			const handleEnter = (event, innerParams) => {
				if (!callIfFunction(innerParams.allowEnterKey)) return;
				const popup = getPopup();
				if (!popup || !innerParams.input) return;
				const input = getInput$1(popup, innerParams.input);
				if (event.target && input && event.target instanceof HTMLElement && event.target.outerHTML === input.outerHTML) {
					if (["textarea", "file"].includes(innerParams.input)) return;
					clickConfirm();
					event.preventDefault();
				}
			};
			/**
			* @param {KeyboardEvent} event
			*/
			const handleTab = (event) => {
				const targetElement = event.target;
				const btnIndex = getFocusableElements().findIndex((el) => el === targetElement);
				let shouldPreventDefault = true;
				if (!event.shiftKey) shouldPreventDefault = setFocus(btnIndex, 1);
				else shouldPreventDefault = setFocus(btnIndex, -1);
				event.stopPropagation();
				if (shouldPreventDefault) event.preventDefault();
			};
			/**
			* @param {string} key
			*/
			const handleArrows = (key) => {
				const actions = getActions();
				const confirmButton = getConfirmButton();
				const denyButton = getDenyButton();
				const cancelButton = getCancelButton();
				if (!actions || !confirmButton || !denyButton || !cancelButton) return;
				/** @type HTMLElement[] */
				const buttons = [
					confirmButton,
					denyButton,
					cancelButton
				];
				if (document.activeElement instanceof HTMLElement && !buttons.includes(document.activeElement)) return;
				const sibling = arrowKeysNextButton.includes(key) ? "nextElementSibling" : "previousElementSibling";
				let buttonToFocus = document.activeElement;
				if (!buttonToFocus) return;
				for (let i = 0; i < actions.children.length; i++) {
					buttonToFocus = buttonToFocus[sibling];
					if (!buttonToFocus) return;
					if (buttonToFocus instanceof HTMLButtonElement && isVisible$1(buttonToFocus)) break;
				}
				if (buttonToFocus instanceof HTMLButtonElement) buttonToFocus.focus();
			};
			/**
			* @param {KeyboardEvent} event
			* @param {SweetAlertOptions} innerParams
			* @param {(dismiss: DismissReason) => void} dismissWith
			*/
			const handleEsc = (event, innerParams, dismissWith) => {
				event.preventDefault();
				if (callIfFunction(innerParams.allowEscapeKey)) dismissWith(DismissReason.esc);
			};
			/**
			* This module contains `WeakMap`s for each effectively-"private  property" that a `Swal` has.
			* For example, to set the private property "foo" of `this` to "bar", you can `privateProps.foo.set(this, 'bar')`
			* This is the approach that Babel will probably take to implement private methods/fields
			*   https://github.com/tc39/proposal-private-methods
			*   https://github.com/babel/babel/pull/7555
			* Once we have the changes from that PR in Babel, and our core class fits reasonable in *one module*
			*   then we can use that language feature.
			*/
			var privateMethods = {
				swalPromiseResolve: /* @__PURE__ */ new WeakMap(),
				swalPromiseReject: /* @__PURE__ */ new WeakMap()
			};
			const setAriaHidden = () => {
				const container = getContainer();
				Array.from(document.body.children).forEach((el) => {
					if (el.contains(container)) return;
					if (el.hasAttribute("aria-hidden")) el.setAttribute("data-previous-aria-hidden", el.getAttribute("aria-hidden") || "");
					el.setAttribute("aria-hidden", "true");
				});
			};
			const unsetAriaHidden = () => {
				Array.from(document.body.children).forEach((el) => {
					if (el.hasAttribute("data-previous-aria-hidden")) {
						el.setAttribute("aria-hidden", el.getAttribute("data-previous-aria-hidden") || "");
						el.removeAttribute("data-previous-aria-hidden");
					} else el.removeAttribute("aria-hidden");
				});
			};
			const isSafariOrIOS = typeof window !== "undefined" && Boolean(window.GestureEvent);
			const isIOS = isSafariOrIOS && /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
			/**
			* Fix iOS scrolling
			* http://stackoverflow.com/q/39626302
			*/
			const iOSfix = () => {
				if (isSafariOrIOS && !hasClass(document.body, swalClasses.iosfix)) {
					const offset = document.body.scrollTop;
					document.body.style.top = `${offset * -1}px`;
					addClass(document.body, swalClasses.iosfix);
					lockBodyScroll();
				}
			};
			/**
			* https://github.com/sweetalert2/sweetalert2/issues/1246
			*/
			const lockBodyScroll = () => {
				const container = getContainer();
				if (!container) return;
				/** @type {boolean} */
				let preventTouchMove;
				/**
				* @param {TouchEvent} event
				*/
				container.ontouchstart = (event) => {
					preventTouchMove = shouldPreventTouchMove(event);
				};
				/**
				* @param {TouchEvent} event
				*/
				container.ontouchmove = (event) => {
					if (preventTouchMove) {
						event.preventDefault();
						event.stopPropagation();
					}
				};
			};
			/**
			* @param {TouchEvent} event
			* @returns {boolean}
			*/
			const shouldPreventTouchMove = (event) => {
				const target = event.target;
				const container = getContainer();
				const htmlContainer = getHtmlContainer();
				if (!container || !htmlContainer) return false;
				if (isStylus(event) || isZoom(event)) return false;
				if (target === container) return true;
				if (!isScrollable(container) && target instanceof HTMLElement && !selfOrParentIsScrollable(target, htmlContainer) && target.tagName !== "INPUT" && target.tagName !== "TEXTAREA" && !(isScrollable(htmlContainer) && htmlContainer.contains(target))) return true;
				return false;
			};
			/**
			* https://github.com/sweetalert2/sweetalert2/issues/1786
			*
			* @param {TouchEvent} event
			* @returns {boolean}
			*/
			const isStylus = (event) => {
				return Boolean(event.touches && event.touches.length && event.touches[0].touchType === "stylus");
			};
			/**
			* https://github.com/sweetalert2/sweetalert2/issues/1891
			*
			* @param {TouchEvent} event
			* @returns {boolean}
			*/
			const isZoom = (event) => {
				return event.touches && event.touches.length > 1;
			};
			const undoIOSfix = () => {
				if (hasClass(document.body, swalClasses.iosfix)) {
					const offset = parseInt(document.body.style.top, 10);
					removeClass(document.body, swalClasses.iosfix);
					document.body.style.top = "";
					document.body.scrollTop = offset * -1;
				}
			};
			/**
			* Measure scrollbar width for padding body during modal show/hide
			* https://github.com/twbs/bootstrap/blob/master/js/src/modal.js
			*
			* @returns {number}
			*/
			const measureScrollbar = () => {
				const scrollDiv = document.createElement("div");
				scrollDiv.className = swalClasses["scrollbar-measure"];
				document.body.appendChild(scrollDiv);
				const scrollbarWidth = scrollDiv.getBoundingClientRect().width - scrollDiv.clientWidth;
				document.body.removeChild(scrollDiv);
				return scrollbarWidth;
			};
			/**
			* Remember state in cases where opening and handling a modal will fiddle with it.
			* @type {number | null}
			*/
			let previousBodyPadding = null;
			/**
			* @param {string} initialBodyOverflow
			*/
			const replaceScrollbarWithPadding = (initialBodyOverflow) => {
				if (previousBodyPadding !== null) return;
				if (document.body.scrollHeight > window.innerHeight || initialBodyOverflow === "scroll") {
					previousBodyPadding = parseInt(window.getComputedStyle(document.body).getPropertyValue("padding-right"));
					document.body.style.paddingRight = `${previousBodyPadding + measureScrollbar()}px`;
				}
			};
			const undoReplaceScrollbarWithPadding = () => {
				if (previousBodyPadding !== null) {
					document.body.style.paddingRight = `${previousBodyPadding}px`;
					previousBodyPadding = null;
				}
			};
			/**
			* @param {SweetAlert} instance
			* @param {HTMLElement} container
			* @param {boolean} returnFocus
			* @param {(() => void) | undefined} didClose
			*/
			function removePopupAndResetState(instance, container, returnFocus, didClose) {
				if (isToast()) triggerDidCloseAndDispose(instance, didClose);
				else {
					restoreActiveElement(returnFocus).then(() => triggerDidCloseAndDispose(instance, didClose));
					removeKeydownHandler(globalState);
				}
				if (isSafariOrIOS) {
					container.setAttribute("style", "display:none !important");
					container.removeAttribute("class");
					container.innerHTML = "";
				} else container.remove();
				if (isModal()) {
					undoReplaceScrollbarWithPadding();
					undoIOSfix();
					unsetAriaHidden();
				}
				removeBodyClasses();
			}
			/**
			* Remove SweetAlert2 classes from body
			*/
			function removeBodyClasses() {
				removeClass([document.documentElement, document.body], [
					swalClasses.shown,
					swalClasses["height-auto"],
					swalClasses["no-backdrop"],
					swalClasses["toast-shown"]
				]);
			}
			/**
			* Instance method to close sweetAlert
			*
			* @param {SweetAlertResult | undefined} resolveValue
			* @this {SweetAlert}
			*/
			function close(resolveValue) {
				resolveValue = prepareResolveValue(resolveValue);
				const swalPromiseResolve = privateMethods.swalPromiseResolve.get(this);
				const didClose = triggerClosePopup(this);
				if (this.isAwaitingPromise) {
					if (!resolveValue.isDismissed) {
						handleAwaitingPromise(this);
						swalPromiseResolve(resolveValue);
					}
				} else if (didClose) swalPromiseResolve(resolveValue);
			}
			/**
			* @param {SweetAlert} instance
			* @returns {boolean}
			*/
			const triggerClosePopup = (instance) => {
				const popup = getPopup();
				if (!popup) return false;
				const innerParams = privateProps.innerParams.get(instance);
				if (!innerParams || hasClass(popup, innerParams.hideClass.popup)) return false;
				removeClass(popup, innerParams.showClass.popup);
				addClass(popup, innerParams.hideClass.popup);
				const backdrop = getContainer();
				removeClass(backdrop, innerParams.showClass.backdrop);
				addClass(backdrop, innerParams.hideClass.backdrop);
				handlePopupAnimation(instance, popup, innerParams);
				return true;
			};
			/**
			* @param {Error | string} error
			* @this {SweetAlert}
			*/
			function rejectPromise(error) {
				const rejectPromise = privateMethods.swalPromiseReject.get(this);
				handleAwaitingPromise(this);
				if (rejectPromise) rejectPromise(error);
			}
			/**
			* @param {SweetAlert} instance
			*/
			const handleAwaitingPromise = (instance) => {
				if (instance.isAwaitingPromise) {
					delete instance.isAwaitingPromise;
					if (!privateProps.innerParams.get(instance)) instance._destroy();
				}
			};
			/**
			* @param {SweetAlertResult | undefined} resolveValue
			* @returns {SweetAlertResult}
			*/
			const prepareResolveValue = (resolveValue) => {
				if (typeof resolveValue === "undefined") return {
					isConfirmed: false,
					isDenied: false,
					isDismissed: true
				};
				return Object.assign({
					isConfirmed: false,
					isDenied: false,
					isDismissed: false
				}, resolveValue);
			};
			/**
			* @param {SweetAlert} instance
			* @param {HTMLElement} popup
			* @param {SweetAlertOptions} innerParams
			*/
			const handlePopupAnimation = (instance, popup, innerParams) => {
				var _globalState$eventEmi;
				const container = getContainer();
				const animationIsSupported = hasCssAnimation(popup);
				if (typeof innerParams.willClose === "function") innerParams.willClose(popup);
				(_globalState$eventEmi = globalState.eventEmitter) === null || _globalState$eventEmi === void 0 || _globalState$eventEmi.emit("willClose", popup);
				if (animationIsSupported && container) animatePopup(instance, popup, container, Boolean(innerParams.returnFocus), innerParams.didClose);
				else if (container) removePopupAndResetState(instance, container, Boolean(innerParams.returnFocus), innerParams.didClose);
			};
			/**
			* @param {SweetAlert} instance
			* @param {HTMLElement} popup
			* @param {HTMLElement} container
			* @param {boolean} returnFocus
			* @param {(() => void) | undefined} didClose
			*/
			const animatePopup = (instance, popup, container, returnFocus, didClose) => {
				globalState.swalCloseEventFinishedCallback = removePopupAndResetState.bind(null, instance, container, returnFocus, didClose);
				/**
				* @param {AnimationEvent | TransitionEvent} e
				*/
				const swalCloseAnimationFinished = function(e) {
					if (e.target === popup) {
						var _globalState$swalClos;
						(_globalState$swalClos = globalState.swalCloseEventFinishedCallback) === null || _globalState$swalClos === void 0 || _globalState$swalClos.call(globalState);
						delete globalState.swalCloseEventFinishedCallback;
						popup.removeEventListener("animationend", swalCloseAnimationFinished);
						popup.removeEventListener("transitionend", swalCloseAnimationFinished);
					}
				};
				popup.addEventListener("animationend", swalCloseAnimationFinished);
				popup.addEventListener("transitionend", swalCloseAnimationFinished);
			};
			/**
			* @param {SweetAlert} instance
			* @param {(() => void) | undefined} didClose
			*/
			const triggerDidCloseAndDispose = (instance, didClose) => {
				setTimeout(() => {
					var _globalState$eventEmi2;
					if (typeof didClose === "function") didClose.bind(instance.params)();
					(_globalState$eventEmi2 = globalState.eventEmitter) === null || _globalState$eventEmi2 === void 0 || _globalState$eventEmi2.emit("didClose");
					if (instance._destroy) instance._destroy();
				});
			};
			/**
			* Shows loader (spinner), this is useful with AJAX requests.
			* By default the loader be shown instead of the "Confirm" button.
			*
			* @param {HTMLButtonElement | null} [buttonToReplace]
			*/
			const showLoading = (buttonToReplace) => {
				let popup = getPopup();
				if (!popup) new Swal();
				popup = getPopup();
				if (!popup) return;
				const loader = getLoader();
				if (isToast()) hide(getIcon());
				else replaceButton(popup, buttonToReplace);
				show(loader);
				popup.setAttribute("data-loading", "true");
				popup.setAttribute("aria-busy", "true");
				popup.focus();
			};
			/**
			* @param {HTMLElement} popup
			* @param {HTMLButtonElement | null} [buttonToReplace]
			*/
			const replaceButton = (popup, buttonToReplace) => {
				const actions = getActions();
				const loader = getLoader();
				if (!actions || !loader) return;
				if (!buttonToReplace && isVisible$1(getConfirmButton())) buttonToReplace = getConfirmButton();
				show(actions);
				if (buttonToReplace) {
					hide(buttonToReplace);
					loader.setAttribute("data-button-to-replace", buttonToReplace.className);
					actions.insertBefore(loader, buttonToReplace);
				}
				addClass([popup, actions], swalClasses.loading);
			};
			/**
			* @param {SweetAlert} instance
			* @param {SweetAlertOptions} params
			*/
			const handleInputOptionsAndValue = (instance, params) => {
				if (params.input === "select" || params.input === "radio") handleInputOptions(instance, params);
				else if ([
					"text",
					"email",
					"number",
					"tel",
					"textarea"
				].some((i) => i === params.input) && (hasToPromiseFn(params.inputValue) || isPromise(params.inputValue))) {
					showLoading(getConfirmButton());
					handleInputValue(instance, params);
				}
			};
			/**
			* @param {SweetAlert} instance
			* @param {SweetAlertOptions} innerParams
			* @returns {SweetAlertInputValue}
			*/
			const getInputValue = (instance, innerParams) => {
				const input = instance.getInput();
				if (!input) return null;
				switch (innerParams.input) {
					case "checkbox": return getCheckboxValue(input);
					case "radio": return getRadioValue(input);
					case "file": return getFileValue(input);
					default: return innerParams.inputAutoTrim ? input.value.trim() : input.value;
				}
			};
			/**
			* @param {HTMLInputElement} input
			* @returns {number}
			*/
			const getCheckboxValue = (input) => input.checked ? 1 : 0;
			/**
			* @param {HTMLInputElement} input
			* @returns {string | null}
			*/
			const getRadioValue = (input) => input.checked ? input.value : null;
			/**
			* @param {HTMLInputElement} input
			* @returns {FileList | File | null}
			*/
			const getFileValue = (input) => input.files && input.files.length ? input.getAttribute("multiple") !== null ? input.files : input.files[0] : null;
			/**
			* @param {SweetAlert} instance
			* @param {SweetAlertOptions} params
			*/
			const handleInputOptions = (instance, params) => {
				const popup = getPopup();
				if (!popup) return;
				/**
				* @param {*} inputOptions
				*/
				const processInputOptions = (inputOptions) => {
					if (params.input === "select") populateSelectOptions(popup, formatInputOptions(inputOptions), params);
					else if (params.input === "radio") populateRadioOptions(popup, formatInputOptions(inputOptions), params);
				};
				if (hasToPromiseFn(params.inputOptions) || isPromise(params.inputOptions)) {
					showLoading(getConfirmButton());
					asPromise(params.inputOptions).then((inputOptions) => {
						instance.hideLoading();
						processInputOptions(inputOptions);
					});
				} else if (typeof params.inputOptions === "object") processInputOptions(params.inputOptions);
				else error(`Unexpected type of inputOptions! Expected object, Map or Promise, got ${typeof params.inputOptions}`);
			};
			/**
			* @param {SweetAlert} instance
			* @param {SweetAlertOptions} params
			*/
			const handleInputValue = (instance, params) => {
				const input = instance.getInput();
				if (!input) return;
				hide(input);
				asPromise(params.inputValue).then((inputValue) => {
					input.value = params.input === "number" ? `${parseFloat(inputValue) || 0}` : `${inputValue}`;
					show(input);
					input.focus();
					instance.hideLoading();
				}).catch((err) => {
					error(`Error in inputValue promise: ${err}`);
					input.value = "";
					show(input);
					input.focus();
					instance.hideLoading();
				});
			};
			/**
			* @param {HTMLElement} popup
			* @param {InputOptionFlattened[]} inputOptions
			* @param {SweetAlertOptions} params
			*/
			function populateSelectOptions(popup, inputOptions, params) {
				const select = getDirectChildByClass(popup, swalClasses.select);
				if (!select) return;
				/**
				* @param {HTMLElement} parent
				* @param {string} optionLabel
				* @param {string} optionValue
				*/
				const renderOption = (parent, optionLabel, optionValue) => {
					const option = document.createElement("option");
					option.value = optionValue;
					setInnerHtml(option, optionLabel);
					option.selected = isSelected(optionValue, params.inputValue);
					parent.appendChild(option);
				};
				inputOptions.forEach((inputOption) => {
					const optionValue = inputOption[0];
					const optionLabel = inputOption[1];
					if (Array.isArray(optionLabel)) {
						const optgroup = document.createElement("optgroup");
						optgroup.label = optionValue;
						optgroup.disabled = false;
						select.appendChild(optgroup);
						optionLabel.forEach((o) => renderOption(optgroup, o[1], o[0]));
					} else renderOption(select, optionLabel, optionValue);
				});
				select.focus();
			}
			/**
			* @param {HTMLElement} popup
			* @param {InputOptionFlattened[]} inputOptions
			* @param {SweetAlertOptions} params
			*/
			function populateRadioOptions(popup, inputOptions, params) {
				const radio = getDirectChildByClass(popup, swalClasses.radio);
				if (!radio) return;
				inputOptions.forEach((inputOption) => {
					const radioValue = inputOption[0];
					const radioLabel = inputOption[1];
					const radioInput = document.createElement("input");
					const radioLabelElement = document.createElement("label");
					radioInput.type = "radio";
					radioInput.name = swalClasses.radio;
					radioInput.value = radioValue;
					if (isSelected(radioValue, params.inputValue)) radioInput.checked = true;
					const label = document.createElement("span");
					setInnerHtml(label, radioLabel);
					label.className = swalClasses.label;
					radioLabelElement.appendChild(radioInput);
					radioLabelElement.appendChild(label);
					radio.appendChild(radioLabelElement);
				});
				const radios = radio.querySelectorAll("input");
				if (radios.length) radios[0].focus();
			}
			/**
			* Converts `inputOptions` into an array of `[value, label]`s
			*
			* @param {*} inputOptions
			* @typedef {string[]} InputOptionFlattened
			* @returns {InputOptionFlattened[]}
			*/
			const formatInputOptions = (inputOptions) => {
				return (inputOptions instanceof Map ? Array.from(inputOptions) : Object.entries(inputOptions)).map(([key, value]) => [key, typeof value === "object" ? formatInputOptions(value) : value]);
			};
			/**
			* @param {string} optionValue
			* @param {SweetAlertInputValue} inputValue
			* @returns {boolean}
			*/
			const isSelected = (optionValue, inputValue) => Boolean(inputValue) && inputValue != null && inputValue.toString() === optionValue.toString();
			/**
			* @param {SweetAlert} instance
			*/
			const handleConfirmButtonClick = (instance) => {
				const innerParams = privateProps.innerParams.get(instance);
				instance.disableButtons();
				if (innerParams.input) handleConfirmOrDenyWithInput(instance, "confirm");
				else confirm(instance, true);
			};
			/**
			* @param {SweetAlert} instance
			*/
			const handleDenyButtonClick = (instance) => {
				const innerParams = privateProps.innerParams.get(instance);
				instance.disableButtons();
				if (innerParams.returnInputValueOnDeny) handleConfirmOrDenyWithInput(instance, "deny");
				else deny(instance, false);
			};
			/**
			* @param {SweetAlert} instance
			* @param {(dismiss: DismissReason) => void} dismissWith
			*/
			const handleCancelButtonClick = (instance, dismissWith) => {
				instance.disableButtons();
				dismissWith(DismissReason.cancel);
			};
			/**
			* @param {SweetAlert} instance
			* @param {'confirm' | 'deny'} type
			*/
			const handleConfirmOrDenyWithInput = (instance, type) => {
				const innerParams = privateProps.innerParams.get(instance);
				if (!innerParams.input) {
					error(`The "input" parameter is needed to be set when using returnInputValueOn${capitalizeFirstLetter(type)}`);
					return;
				}
				const input = instance.getInput();
				const inputValue = getInputValue(instance, innerParams);
				if (innerParams.inputValidator) handleInputValidator(instance, inputValue, type);
				else if (input && !input.checkValidity()) {
					instance.enableButtons();
					instance.showValidationMessage(innerParams.validationMessage || input.validationMessage);
				} else if (type === "deny") deny(instance, inputValue);
				else confirm(instance, inputValue);
			};
			/**
			* @param {SweetAlert} instance
			* @param {SweetAlertInputValue} inputValue
			* @param {'confirm' | 'deny'} type
			*/
			const handleInputValidator = (instance, inputValue, type) => {
				const innerParams = privateProps.innerParams.get(instance);
				instance.disableInput();
				Promise.resolve().then(() => asPromise(innerParams.inputValidator(inputValue, innerParams.validationMessage))).then((validationMessage) => {
					instance.enableButtons();
					instance.enableInput();
					if (validationMessage) instance.showValidationMessage(validationMessage);
					else if (type === "deny") deny(instance, inputValue);
					else confirm(instance, inputValue);
				});
			};
			/**
			* @param {SweetAlert} instance
			* @param {*} value
			*/
			const deny = (instance, value) => {
				const innerParams = privateProps.innerParams.get(instance);
				if (innerParams.showLoaderOnDeny) showLoading(getDenyButton());
				if (innerParams.preDeny) {
					instance.isAwaitingPromise = true;
					Promise.resolve().then(() => asPromise(innerParams.preDeny(value, innerParams.validationMessage))).then((preDenyValue) => {
						if (preDenyValue === false) {
							instance.hideLoading();
							handleAwaitingPromise(instance);
						} else instance.close(
							/** @type SweetAlertResult */
							{
								isDenied: true,
								value: typeof preDenyValue === "undefined" ? value : preDenyValue
							}
						);
					}).catch((error) => rejectWith(instance, error));
				} else instance.close(
					/** @type SweetAlertResult */
					{
						isDenied: true,
						value
					}
				);
			};
			/**
			* @param {SweetAlert} instance
			* @param {*} value
			*/
			const succeedWith = (instance, value) => {
				instance.close(
					/** @type SweetAlertResult */
					{
						isConfirmed: true,
						value
					}
				);
			};
			/**
			*
			* @param {SweetAlert} instance
			* @param {string} error
			*/
			const rejectWith = (instance, error) => {
				instance.rejectPromise(error);
			};
			/**
			*
			* @param {SweetAlert} instance
			* @param {*} value
			*/
			const confirm = (instance, value) => {
				const innerParams = privateProps.innerParams.get(instance);
				if (innerParams.showLoaderOnConfirm) showLoading();
				if (innerParams.preConfirm) {
					instance.resetValidationMessage();
					instance.isAwaitingPromise = true;
					Promise.resolve().then(() => asPromise(innerParams.preConfirm(value, innerParams.validationMessage))).then((preConfirmValue) => {
						if (isVisible$1(getValidationMessage()) || preConfirmValue === false) {
							instance.hideLoading();
							handleAwaitingPromise(instance);
						} else succeedWith(instance, typeof preConfirmValue === "undefined" ? value : preConfirmValue);
					}).catch((error) => rejectWith(instance, error));
				} else succeedWith(instance, value);
			};
			/**
			* Hides loader and shows back the button which was hidden by .showLoading()
			* @this {SweetAlert}
			*/
			function hideLoading() {
				const innerParams = privateProps.innerParams.get(this);
				if (!innerParams) return;
				const domCache = privateProps.domCache.get(this);
				hide(domCache.loader);
				if (isToast()) {
					if (innerParams.icon) show(getIcon());
				} else showRelatedButton(domCache);
				removeClass([domCache.popup, domCache.actions], swalClasses.loading);
				domCache.popup.removeAttribute("aria-busy");
				domCache.popup.removeAttribute("data-loading");
				this.enableButtons();
			}
			/**
			* @param {DomCache} domCache
			*/
			const showRelatedButton = (domCache) => {
				const dataButtonToReplace = domCache.loader.getAttribute("data-button-to-replace");
				const buttonToReplace = dataButtonToReplace ? domCache.popup.getElementsByClassName(dataButtonToReplace) : [];
				if (buttonToReplace.length) show(
					/** @type {HTMLElement} */
					buttonToReplace[0],
					"inline-block"
				);
				else if (allButtonsAreHidden()) hide(domCache.actions);
			};
			/**
			* Gets the input DOM node, this method works with input parameter.
			*
			* @returns {HTMLInputElement | null}
			* @this {SweetAlert}
			*/
			function getInput() {
				const innerParams = privateProps.innerParams.get(this);
				const domCache = privateProps.domCache.get(this);
				if (!domCache) return null;
				return getInput$1(domCache.popup, innerParams.input);
			}
			/**
			* @param {SweetAlert} instance
			* @param {string[]} buttons
			* @param {boolean} disabled
			*/
			function setButtonsDisabled(instance, buttons, disabled) {
				const domCache = privateProps.domCache.get(instance);
				buttons.forEach((button) => {
					domCache[button].disabled = disabled;
				});
			}
			/**
			* @param {HTMLInputElement | null} input
			* @param {boolean} disabled
			*/
			function setInputDisabled(input, disabled) {
				const popup = getPopup();
				if (!popup || !input) return;
				if (input.type === "radio") popup.querySelectorAll(`[name="${swalClasses.radio}"]`).forEach((radio) => {
					radio.disabled = disabled;
				});
				else input.disabled = disabled;
			}
			/**
			* Enable all the buttons
			* @this {SweetAlert}
			*/
			function enableButtons() {
				setButtonsDisabled(this, [
					"confirmButton",
					"denyButton",
					"cancelButton"
				], false);
				const focusedElement = privateProps.focusedElement.get(this);
				if (focusedElement instanceof HTMLElement && document.activeElement === document.body) focusedElement.focus();
				privateProps.focusedElement.delete(this);
			}
			/**
			* Disable all the buttons
			* @this {SweetAlert}
			*/
			function disableButtons() {
				privateProps.focusedElement.set(this, document.activeElement);
				setButtonsDisabled(this, [
					"confirmButton",
					"denyButton",
					"cancelButton"
				], true);
			}
			/**
			* Enable the input field
			* @this {SweetAlert}
			*/
			function enableInput() {
				setInputDisabled(this.getInput(), false);
			}
			/**
			* Disable the input field
			* @this {SweetAlert}
			*/
			function disableInput() {
				setInputDisabled(this.getInput(), true);
			}
			/**
			* Show block with validation message
			*
			* @param {string} error
			* @this {SweetAlert}
			*/
			function showValidationMessage(error) {
				const domCache = privateProps.domCache.get(this);
				const params = privateProps.innerParams.get(this);
				setInnerHtml(domCache.validationMessage, error);
				domCache.validationMessage.className = swalClasses["validation-message"];
				if (params.customClass && params.customClass.validationMessage) addClass(domCache.validationMessage, params.customClass.validationMessage);
				show(domCache.validationMessage);
				const input = this.getInput();
				if (input) {
					input.setAttribute("aria-invalid", "true");
					input.setAttribute("aria-describedby", swalClasses["validation-message"]);
					focusInput(input);
					addClass(input, swalClasses.inputerror);
				}
			}
			/**
			* Hide block with validation message
			*
			* @this {SweetAlert}
			*/
			function resetValidationMessage() {
				const domCache = privateProps.domCache.get(this);
				if (domCache.validationMessage) hide(domCache.validationMessage);
				const input = this.getInput();
				if (input) {
					input.removeAttribute("aria-invalid");
					input.removeAttribute("aria-describedby");
					removeClass(input, swalClasses.inputerror);
				}
			}
			const defaultParams = {
				title: "",
				titleText: "",
				text: "",
				html: "",
				footer: "",
				icon: void 0,
				iconColor: void 0,
				iconHtml: void 0,
				template: void 0,
				toast: false,
				draggable: false,
				animation: true,
				theme: "light",
				showClass: {
					popup: "swal2-show",
					backdrop: "swal2-backdrop-show",
					icon: "swal2-icon-show"
				},
				hideClass: {
					popup: "swal2-hide",
					backdrop: "swal2-backdrop-hide",
					icon: "swal2-icon-hide"
				},
				customClass: {},
				target: "body",
				color: void 0,
				backdrop: true,
				heightAuto: true,
				allowOutsideClick: true,
				allowEscapeKey: true,
				allowEnterKey: true,
				stopKeydownPropagation: true,
				keydownListenerCapture: false,
				showConfirmButton: true,
				showDenyButton: false,
				showCancelButton: false,
				preConfirm: void 0,
				preDeny: void 0,
				confirmButtonText: "OK",
				confirmButtonAriaLabel: "",
				confirmButtonColor: void 0,
				denyButtonText: "No",
				denyButtonAriaLabel: "",
				denyButtonColor: void 0,
				cancelButtonText: "Cancel",
				cancelButtonAriaLabel: "",
				cancelButtonColor: void 0,
				buttonsStyling: true,
				reverseButtons: false,
				focusConfirm: true,
				focusDeny: false,
				focusCancel: false,
				returnFocus: true,
				showCloseButton: false,
				closeButtonHtml: "&times;",
				closeButtonAriaLabel: "Close this dialog",
				loaderHtml: "",
				showLoaderOnConfirm: false,
				showLoaderOnDeny: false,
				imageUrl: void 0,
				imageWidth: void 0,
				imageHeight: void 0,
				imageAlt: "",
				timer: void 0,
				timerProgressBar: false,
				width: void 0,
				padding: void 0,
				background: void 0,
				input: void 0,
				inputPlaceholder: "",
				inputLabel: "",
				inputValue: "",
				inputOptions: {},
				inputAutoFocus: true,
				inputAutoTrim: true,
				inputAttributes: {},
				inputValidator: void 0,
				returnInputValueOnDeny: false,
				validationMessage: void 0,
				grow: false,
				position: "center",
				progressSteps: [],
				currentProgressStep: void 0,
				progressStepsDistance: void 0,
				willOpen: void 0,
				didOpen: void 0,
				didRender: void 0,
				willClose: void 0,
				didClose: void 0,
				didDestroy: void 0,
				scrollbarPadding: true,
				topLayer: false
			};
			const updatableParams = [
				"allowEscapeKey",
				"allowOutsideClick",
				"background",
				"buttonsStyling",
				"cancelButtonAriaLabel",
				"cancelButtonColor",
				"cancelButtonText",
				"closeButtonAriaLabel",
				"closeButtonHtml",
				"color",
				"confirmButtonAriaLabel",
				"confirmButtonColor",
				"confirmButtonText",
				"currentProgressStep",
				"customClass",
				"denyButtonAriaLabel",
				"denyButtonColor",
				"denyButtonText",
				"didClose",
				"didDestroy",
				"draggable",
				"footer",
				"hideClass",
				"html",
				"icon",
				"iconColor",
				"iconHtml",
				"imageAlt",
				"imageHeight",
				"imageUrl",
				"imageWidth",
				"preConfirm",
				"preDeny",
				"progressSteps",
				"returnFocus",
				"reverseButtons",
				"showCancelButton",
				"showCloseButton",
				"showConfirmButton",
				"showDenyButton",
				"text",
				"title",
				"titleText",
				"theme",
				"willClose"
			];
			/** @type {Record<string, string | undefined>} */
			const deprecatedParams = { allowEnterKey: void 0 };
			const toastIncompatibleParams = [
				"allowOutsideClick",
				"allowEnterKey",
				"backdrop",
				"draggable",
				"focusConfirm",
				"focusDeny",
				"focusCancel",
				"returnFocus",
				"heightAuto",
				"keydownListenerCapture"
			];
			/**
			* Is valid parameter
			*
			* @param {string} paramName
			* @returns {boolean}
			*/
			const isValidParameter = (paramName) => {
				return Object.prototype.hasOwnProperty.call(defaultParams, paramName);
			};
			/**
			* Is valid parameter for Swal.update() method
			*
			* @param {string} paramName
			* @returns {boolean}
			*/
			const isUpdatableParameter = (paramName) => {
				return updatableParams.indexOf(paramName) !== -1;
			};
			/**
			* Is deprecated parameter
			*
			* @param {string} paramName
			* @returns {string | undefined}
			*/
			const isDeprecatedParameter = (paramName) => {
				return deprecatedParams[paramName];
			};
			/**
			* @param {string} param
			*/
			const checkIfParamIsValid = (param) => {
				if (!isValidParameter(param)) warn(`Unknown parameter "${param}"`);
			};
			/**
			* @param {string} param
			*/
			const checkIfToastParamIsValid = (param) => {
				if (toastIncompatibleParams.includes(param)) warn(`The parameter "${param}" is incompatible with toasts`);
			};
			/**
			* @param {string} param
			*/
			const checkIfParamIsDeprecated = (param) => {
				const isDeprecated = isDeprecatedParameter(param);
				if (isDeprecated) warnAboutDeprecation(param, isDeprecated);
			};
			/**
			* Show relevant warnings for given params
			*
			* @param {SweetAlertOptions} params
			*/
			const showWarningsForParams = (params) => {
				if (params.backdrop === false && params.allowOutsideClick) warn("\"allowOutsideClick\" parameter requires `backdrop` parameter to be set to `true`");
				if (params.theme && ![
					"light",
					"dark",
					"auto",
					"minimal",
					"borderless",
					"bootstrap-4",
					"bootstrap-4-light",
					"bootstrap-4-dark",
					"bootstrap-5",
					"bootstrap-5-light",
					"bootstrap-5-dark",
					"material-ui",
					"material-ui-light",
					"material-ui-dark",
					"embed-iframe",
					"bulma",
					"bulma-light",
					"bulma-dark"
				].includes(params.theme)) warn(`Invalid theme "${params.theme}"`);
				for (const param in params) {
					checkIfParamIsValid(param);
					if (params.toast) checkIfToastParamIsValid(param);
					checkIfParamIsDeprecated(param);
				}
			};
			/**
			* Updates popup parameters.
			*
			* @this {any}
			* @param {SweetAlertOptions} params
			*/
			function update(params) {
				const container = getContainer();
				const popup = getPopup();
				const innerParams = privateProps.innerParams.get(this);
				if (!popup || hasClass(popup, innerParams.hideClass.popup)) {
					warn(`You're trying to update the closed or closing popup, that won't work. Use the update() method in preConfirm parameter or show a new popup.`);
					return;
				}
				const validUpdatableParams = filterValidParams(params);
				const updatedParams = Object.assign({}, innerParams, validUpdatableParams);
				showWarningsForParams(updatedParams);
				if (container) container.dataset["swal2Theme"] = updatedParams.theme;
				render(this, updatedParams);
				privateProps.innerParams.set(this, updatedParams);
				Object.defineProperties(this, { params: {
					value: Object.assign({}, this.params, params),
					writable: false,
					enumerable: true
				} });
			}
			/**
			* @param {SweetAlertOptions} params
			* @returns {SweetAlertOptions}
			*/
			const filterValidParams = (params) => {
				/** @type {Record<string, any>} */
				const validUpdatableParams = {};
				Object.keys(params).forEach((param) => {
					if (isUpdatableParameter(param)) validUpdatableParams[param] = params[param];
					else warn(`Invalid parameter to update: ${param}`);
				});
				return validUpdatableParams;
			};
			/**
			* Dispose the current SweetAlert2 instance
			* @this {SweetAlert}
			*/
			function _destroy() {
				var _globalState$eventEmi;
				const domCache = privateProps.domCache.get(this);
				const innerParams = privateProps.innerParams.get(this);
				if (!innerParams) {
					disposeWeakMaps(this);
					return;
				}
				if (domCache.popup && globalState.swalCloseEventFinishedCallback) {
					globalState.swalCloseEventFinishedCallback();
					delete globalState.swalCloseEventFinishedCallback;
				}
				if (typeof innerParams.didDestroy === "function") innerParams.didDestroy();
				(_globalState$eventEmi = globalState.eventEmitter) === null || _globalState$eventEmi === void 0 || _globalState$eventEmi.emit("didDestroy");
				disposeSwal(this);
			}
			/**
			* @param {SweetAlert} instance
			*/
			const disposeSwal = (instance) => {
				disposeWeakMaps(instance);
				delete instance.params;
				delete globalState.keydownHandler;
				delete globalState.keydownTarget;
				delete globalState.currentInstance;
			};
			/**
			* @param {SweetAlert} instance
			*/
			const disposeWeakMaps = (instance) => {
				if (instance.isAwaitingPromise) {
					unsetWeakMaps(privateProps, instance);
					instance.isAwaitingPromise = true;
				} else {
					unsetWeakMaps(privateMethods, instance);
					unsetWeakMaps(privateProps, instance);
					delete instance.isAwaitingPromise;
					delete instance.disableButtons;
					delete instance.enableButtons;
					delete instance.getInput;
					delete instance.disableInput;
					delete instance.enableInput;
					delete instance.hideLoading;
					delete instance.disableLoading;
					delete instance.showValidationMessage;
					delete instance.resetValidationMessage;
					delete instance.close;
					delete instance.closePopup;
					delete instance.closeModal;
					delete instance.closeToast;
					delete instance.rejectPromise;
					delete instance.update;
					delete instance._destroy;
				}
			};
			/**
			* @param {Record<string, WeakMap<any, any>>} obj
			* @param {SweetAlert} instance
			*/
			const unsetWeakMaps = (obj, instance) => {
				for (const i in obj) obj[i].delete(instance);
			};
			var instanceMethods = /*#__PURE__*/ Object.freeze({
				__proto__: null,
				_destroy,
				close,
				closeModal: close,
				closePopup: close,
				closeToast: close,
				disableButtons,
				disableInput,
				disableLoading: hideLoading,
				enableButtons,
				enableInput,
				getInput,
				handleAwaitingPromise,
				hideLoading,
				rejectPromise,
				resetValidationMessage,
				showValidationMessage,
				update
			});
			/**
			* @param {SweetAlertOptions} innerParams
			* @param {DomCache} domCache
			* @param {(dismiss: DismissReason) => void} dismissWith
			*/
			const handlePopupClick = (innerParams, domCache, dismissWith) => {
				if (innerParams.toast) handleToastClick(innerParams, domCache, dismissWith);
				else {
					handleModalMousedown(domCache);
					handleContainerMousedown(domCache);
					handleModalClick(innerParams, domCache, dismissWith);
				}
			};
			/**
			* @param {SweetAlertOptions} innerParams
			* @param {DomCache} domCache
			* @param {(dismiss: DismissReason) => void} dismissWith
			*/
			const handleToastClick = (innerParams, domCache, dismissWith) => {
				domCache.popup.onclick = () => {
					if (innerParams && (isAnyButtonShown(innerParams) || innerParams.timer || innerParams.input)) return;
					dismissWith(DismissReason.close);
				};
			};
			/**
			* @param {SweetAlertOptions} innerParams
			* @returns {boolean}
			*/
			const isAnyButtonShown = (innerParams) => {
				return Boolean(innerParams.showConfirmButton || innerParams.showDenyButton || innerParams.showCancelButton || innerParams.showCloseButton);
			};
			let ignoreOutsideClick = false;
			/**
			* @param {DomCache} domCache
			*/
			const handleModalMousedown = (domCache) => {
				domCache.popup.onmousedown = () => {
					domCache.container.onmouseup = function(e) {
						domCache.container.onmouseup = () => {};
						if (e.target === domCache.container) ignoreOutsideClick = true;
					};
				};
			};
			/**
			* @param {DomCache} domCache
			*/
			const handleContainerMousedown = (domCache) => {
				domCache.container.onmousedown = (e) => {
					if (e.target === domCache.container) e.preventDefault();
					domCache.popup.onmouseup = function(e) {
						domCache.popup.onmouseup = () => {};
						if (e.target === domCache.popup || e.target instanceof HTMLElement && domCache.popup.contains(e.target)) ignoreOutsideClick = true;
					};
				};
			};
			/**
			* @param {SweetAlertOptions} innerParams
			* @param {DomCache} domCache
			* @param {(dismiss: DismissReason) => void} dismissWith
			*/
			const handleModalClick = (innerParams, domCache, dismissWith) => {
				domCache.container.onclick = (e) => {
					if (ignoreOutsideClick) {
						ignoreOutsideClick = false;
						return;
					}
					if (e.target === domCache.container && callIfFunction(innerParams.allowOutsideClick)) dismissWith(DismissReason.backdrop);
				};
			};
			/**
			* @param {unknown} elem
			* @returns {boolean}
			*/
			const isJqueryElement = (elem) => typeof elem === "object" && elem !== null && "jquery" in elem;
			/**
			* @param {unknown} elem
			* @returns {boolean}
			*/
			const isElement = (elem) => elem instanceof Element || isJqueryElement(elem);
			/**
			* @param {ReadonlyArray<unknown>} args
			* @returns {SweetAlertOptions}
			*/
			const argsToParams = (args) => {
				/** @type {Record<string, unknown>} */
				const params = {};
				if (typeof args[0] === "object" && !isElement(args[0])) Object.assign(params, args[0]);
				else [
					"title",
					"html",
					"icon"
				].forEach((name, index) => {
					const arg = args[index];
					if (typeof arg === "string" || isElement(arg)) params[name] = arg;
					else if (arg !== void 0) error(`Unexpected type of ${name}! Expected "string" or "Element", got ${typeof arg}`);
				});
				return params;
			};
			/**
			* Main method to create a new SweetAlert2 popup
			*
			* @this {new (...args: any[]) => any}
			* @param  {...SweetAlertOptions} args
			* @returns {Promise<SweetAlertResult>}
			*/
			function fire(...args) {
				return new this(...args);
			}
			/**
			* Returns an extended version of `Swal` containing `params` as defaults.
			* Useful for reusing Swal configuration.
			*
			* For example:
			*
			* Before:
			* const textPromptOptions = { input: 'text', showCancelButton: true }
			* const {value: firstName} = await Swal.fire({ ...textPromptOptions, title: 'What is your first name?' })
			* const {value: lastName} = await Swal.fire({ ...textPromptOptions, title: 'What is your last name?' })
			*
			* After:
			* const TextPrompt = Swal.mixin({ input: 'text', showCancelButton: true })
			* const {value: firstName} = await TextPrompt('What is your first name?')
			* const {value: lastName} = await TextPrompt('What is your last name?')
			*
			* @param {SweetAlertOptions} mixinParams
			* @returns {SweetAlert}
			* @this {typeof import('../SweetAlert.js').SweetAlert}
			*/
			function mixin(mixinParams) {
				class MixinSwal extends this {
					/**
					* @param {any} params
					* @param {any} priorityMixinParams
					*/
					_main(params, priorityMixinParams) {
						return super._main(params, Object.assign({}, mixinParams, priorityMixinParams));
					}
				}
				return MixinSwal;
			}
			/**
			* If `timer` parameter is set, returns number of milliseconds of timer remained.
			* Otherwise, returns undefined.
			*
			* @returns {number | undefined}
			*/
			const getTimerLeft = () => {
				return globalState.timeout && globalState.timeout.getTimerLeft();
			};
			/**
			* Stop timer. Returns number of milliseconds of timer remained.
			* If `timer` parameter isn't set, returns undefined.
			*
			* @returns {number | undefined}
			*/
			const stopTimer = () => {
				if (globalState.timeout) {
					stopTimerProgressBar();
					return globalState.timeout.stop();
				}
			};
			/**
			* Resume timer. Returns number of milliseconds of timer remained.
			* If `timer` parameter isn't set, returns undefined.
			*
			* @returns {number | undefined}
			*/
			const resumeTimer = () => {
				if (globalState.timeout) {
					const remaining = globalState.timeout.start();
					animateTimerProgressBar(remaining);
					return remaining;
				}
			};
			/**
			* Resume timer. Returns number of milliseconds of timer remained.
			* If `timer` parameter isn't set, returns undefined.
			*
			* @returns {number | undefined}
			*/
			const toggleTimer = () => {
				const timer = globalState.timeout;
				return timer && (timer.running ? stopTimer() : resumeTimer());
			};
			/**
			* Increase timer. Returns number of milliseconds of an updated timer.
			* If `timer` parameter isn't set, returns undefined.
			*
			* @param {number} ms
			* @returns {number | undefined}
			*/
			const increaseTimer = (ms) => {
				if (globalState.timeout) {
					const remaining = globalState.timeout.increase(ms);
					animateTimerProgressBar(remaining, true);
					return remaining;
				}
			};
			/**
			* Check if timer is running. Returns true if timer is running
			* or false if timer is paused or stopped.
			* If `timer` parameter isn't set, returns undefined
			*
			* @returns {boolean}
			*/
			const isTimerRunning = () => {
				return Boolean(globalState.timeout && globalState.timeout.isRunning());
			};
			let bodyClickListenerAdded = false;
			/** @type {Record<string, any>} */
			const clickHandlers = {};
			/**
			* @this {any}
			* @param {string} attr
			*/
			function bindClickHandler(attr = "data-swal-template") {
				clickHandlers[attr] = this;
				if (!bodyClickListenerAdded) {
					document.body.addEventListener("click", bodyClickListener);
					bodyClickListenerAdded = true;
				}
			}
			/**
			* @param {MouseEvent} event
			*/
			const bodyClickListener = (event) => {
				for (let el = event.target; el && el !== document; el = el.parentNode) for (const attr in clickHandlers) {
					const template = el.getAttribute && el.getAttribute(attr);
					if (template) {
						clickHandlers[attr].fire({ template });
						return;
					}
				}
			};
			class EventEmitter {
				constructor() {
					/** @type {Events} */
					this.events = {};
				}
				/**
				* @param {string} eventName
				* @returns {EventHandlers}
				*/
				_getHandlersByEventName(eventName) {
					if (typeof this.events[eventName] === "undefined") this.events[eventName] = [];
					return this.events[eventName];
				}
				/**
				* @param {string} eventName
				* @param {EventHandler} eventHandler
				*/
				on(eventName, eventHandler) {
					const currentHandlers = this._getHandlersByEventName(eventName);
					if (!currentHandlers.includes(eventHandler)) currentHandlers.push(eventHandler);
				}
				/**
				* @param {string} eventName
				* @param {EventHandler} eventHandler
				*/
				once(eventName, eventHandler) {
					/**
					* @param {...any} args
					*/
					const onceFn = (...args) => {
						this.removeListener(eventName, onceFn);
						eventHandler.apply(this, args);
					};
					this.on(eventName, onceFn);
				}
				/**
				* @param {string} eventName
				* @param {...any} args
				*/
				emit(eventName, ...args) {
					this._getHandlersByEventName(eventName).forEach(
						/**
						* @param {EventHandler} eventHandler
						*/
						(eventHandler) => {
							try {
								eventHandler.apply(this, args);
							} catch (error) {
								console.error(error);
							}
						}
					);
				}
				/**
				* @param {string} eventName
				* @param {EventHandler} eventHandler
				*/
				removeListener(eventName, eventHandler) {
					const currentHandlers = this._getHandlersByEventName(eventName);
					const index = currentHandlers.indexOf(eventHandler);
					if (index > -1) currentHandlers.splice(index, 1);
				}
				/**
				* @param {string} eventName
				*/
				removeAllListeners(eventName) {
					if (this.events[eventName] !== void 0) this.events[eventName].length = 0;
				}
				reset() {
					this.events = {};
				}
			}
			globalState.eventEmitter = new EventEmitter();
			/**
			* @param {string} eventName
			* @param {EventHandler} eventHandler
			*/
			const on = (eventName, eventHandler) => {
				if (globalState.eventEmitter) globalState.eventEmitter.on(eventName, eventHandler);
			};
			/**
			* @param {string} eventName
			* @param {EventHandler} eventHandler
			*/
			const once = (eventName, eventHandler) => {
				if (globalState.eventEmitter) globalState.eventEmitter.once(eventName, eventHandler);
			};
			/**
			* @param {string} [eventName]
			* @param {EventHandler} [eventHandler]
			*/
			const off = (eventName, eventHandler) => {
				if (!globalState.eventEmitter) return;
				if (!eventName) {
					globalState.eventEmitter.reset();
					return;
				}
				if (eventHandler) globalState.eventEmitter.removeListener(eventName, eventHandler);
				else globalState.eventEmitter.removeAllListeners(eventName);
			};
			var staticMethods = /*#__PURE__*/ Object.freeze({
				__proto__: null,
				argsToParams,
				bindClickHandler,
				clickCancel,
				clickConfirm,
				clickDeny,
				enableLoading: showLoading,
				fire,
				getActions,
				getCancelButton,
				getCloseButton,
				getConfirmButton,
				getContainer,
				getDenyButton,
				getFocusableElements,
				getFooter,
				getHtmlContainer,
				getIcon,
				getIconContent,
				getImage,
				getInputLabel,
				getLoader,
				getPopup,
				getProgressSteps,
				getTimerLeft,
				getTimerProgressBar,
				getTitle,
				getValidationMessage,
				increaseTimer,
				isDeprecatedParameter,
				isLoading,
				isTimerRunning,
				isUpdatableParameter,
				isValidParameter,
				isVisible,
				mixin,
				off,
				on,
				once,
				resumeTimer,
				showLoading,
				stopTimer,
				toggleTimer
			});
			class Timer {
				/**
				* @param {() => void} callback
				* @param {number} delay
				*/
				constructor(callback, delay) {
					this.callback = callback;
					this.remaining = delay;
					this.running = false;
					this.start();
				}
				/**
				* @returns {number}
				*/
				start() {
					if (!this.running) {
						this.running = true;
						this.started = /* @__PURE__ */ new Date();
						this.id = setTimeout(this.callback, this.remaining);
					}
					return this.remaining;
				}
				/**
				* @returns {number}
				*/
				stop() {
					if (this.started && this.running) {
						this.running = false;
						clearTimeout(this.id);
						this.remaining -= (/* @__PURE__ */ new Date()).getTime() - this.started.getTime();
					}
					return this.remaining;
				}
				/**
				* @param {number} n
				* @returns {number}
				*/
				increase(n) {
					const running = this.running;
					if (running) this.stop();
					this.remaining += n;
					if (running) this.start();
					return this.remaining;
				}
				/**
				* @returns {number}
				*/
				getTimerLeft() {
					if (this.running) {
						this.stop();
						this.start();
					}
					return this.remaining;
				}
				/**
				* @returns {boolean}
				*/
				isRunning() {
					return this.running;
				}
			}
			const swalStringParams = [
				"swal-title",
				"swal-html",
				"swal-footer"
			];
			/**
			* @param {SweetAlertOptions} params
			* @returns {SweetAlertOptions}
			*/
			const getTemplateParams = (params) => {
				const template = typeof params.template === "string" ? document.querySelector(params.template) : params.template;
				if (!template) return {};
				/** @type {DocumentFragment} */
				const templateContent = template.content;
				showWarningsForElements(templateContent);
				return Object.assign(getSwalParams(templateContent), getSwalFunctionParams(templateContent), getSwalButtons(templateContent), getSwalImage(templateContent), getSwalIcon(templateContent), getSwalInput(templateContent), getSwalStringParams(templateContent, swalStringParams));
			};
			/**
			* @param {DocumentFragment} templateContent
			* @returns {Record<string, string | boolean | number>}
			*/
			const getSwalParams = (templateContent) => {
				/** @type {Record<string, string | boolean | number>} */
				const result = {};
				Array.from(templateContent.querySelectorAll("swal-param")).forEach((param) => {
					showWarningsForAttributes(param, ["name", "value"]);
					const paramName = param.getAttribute("name");
					const value = param.getAttribute("value");
					if (!paramName || !value) return;
					if (paramName in defaultParams && typeof defaultParams[paramName] === "boolean") result[paramName] = value !== "false";
					else if (paramName in defaultParams && typeof defaultParams[paramName] === "object") result[paramName] = JSON.parse(value);
					else result[paramName] = value;
				});
				return result;
			};
			/**
			* @param {DocumentFragment} templateContent
			* @returns {Record<string, () => void>}
			*/
			const getSwalFunctionParams = (templateContent) => {
				/** @type {Record<string, () => void>} */
				const result = {};
				Array.from(templateContent.querySelectorAll("swal-function-param")).forEach((param) => {
					const paramName = param.getAttribute("name");
					const value = param.getAttribute("value");
					if (!paramName || !value) return;
					result[paramName] = new Function(`return ${value}`)();
				});
				return result;
			};
			/**
			* @param {DocumentFragment} templateContent
			* @returns {Record<string, string | boolean>}
			*/
			const getSwalButtons = (templateContent) => {
				/** @type {Record<string, string | boolean>} */
				const result = {};
				Array.from(templateContent.querySelectorAll("swal-button")).forEach((button) => {
					showWarningsForAttributes(button, [
						"type",
						"color",
						"aria-label"
					]);
					const type = button.getAttribute("type");
					if (!type || ![
						"confirm",
						"cancel",
						"deny"
					].includes(type)) return;
					result[`${type}ButtonText`] = button.innerHTML;
					result[`show${capitalizeFirstLetter(type)}Button`] = true;
					const color = button.getAttribute("color");
					if (color !== null) result[`${type}ButtonColor`] = color;
					const ariaLabel = button.getAttribute("aria-label");
					if (ariaLabel !== null) result[`${type}ButtonAriaLabel`] = ariaLabel;
				});
				return result;
			};
			/**
			* @param {DocumentFragment} templateContent
			* @returns {Pick<SweetAlertOptions, 'imageUrl' | 'imageWidth' | 'imageHeight' | 'imageAlt'>}
			*/
			const getSwalImage = (templateContent) => {
				const result = {};
				/** @type {HTMLElement | null} */
				const image = templateContent.querySelector("swal-image");
				if (image) {
					showWarningsForAttributes(image, [
						"src",
						"width",
						"height",
						"alt"
					]);
					const src = image.getAttribute("src");
					if (src !== null) result.imageUrl = src || void 0;
					const width = image.getAttribute("width");
					if (width !== null) result.imageWidth = width || void 0;
					const height = image.getAttribute("height");
					if (height !== null) result.imageHeight = height || void 0;
					const alt = image.getAttribute("alt");
					if (alt !== null) result.imageAlt = alt || void 0;
				}
				return result;
			};
			/**
			* @param {DocumentFragment} templateContent
			* @returns {object}
			*/
			const getSwalIcon = (templateContent) => {
				const result = {};
				/** @type {HTMLElement | null} */
				const icon = templateContent.querySelector("swal-icon");
				if (icon) {
					showWarningsForAttributes(icon, ["type", "color"]);
					if (icon.hasAttribute("type")) result.icon = icon.getAttribute("type");
					if (icon.hasAttribute("color")) result.iconColor = icon.getAttribute("color");
					result.iconHtml = icon.innerHTML;
				}
				return result;
			};
			/**
			* @param {DocumentFragment} templateContent
			* @returns {object}
			*/
			const getSwalInput = (templateContent) => {
				/** @type {Record<string, any>} */
				const result = {};
				/** @type {HTMLElement | null} */
				const input = templateContent.querySelector("swal-input");
				if (input) {
					showWarningsForAttributes(input, [
						"type",
						"label",
						"placeholder",
						"value"
					]);
					result.input = input.getAttribute("type") || "text";
					if (input.hasAttribute("label")) result.inputLabel = input.getAttribute("label");
					if (input.hasAttribute("placeholder")) result.inputPlaceholder = input.getAttribute("placeholder");
					if (input.hasAttribute("value")) result.inputValue = input.getAttribute("value");
				}
				/** @type {HTMLElement[]} */
				const inputOptions = Array.from(templateContent.querySelectorAll("swal-input-option"));
				if (inputOptions.length) {
					result.inputOptions = {};
					inputOptions.forEach((option) => {
						showWarningsForAttributes(option, ["value"]);
						const optionValue = option.getAttribute("value");
						if (!optionValue) return;
						const optionName = option.innerHTML;
						result.inputOptions[optionValue] = optionName;
					});
				}
				return result;
			};
			/**
			* @param {DocumentFragment} templateContent
			* @param {string[]} paramNames
			* @returns {Record<string, string>}
			*/
			const getSwalStringParams = (templateContent, paramNames) => {
				/** @type {Record<string, string>} */
				const result = {};
				for (const i in paramNames) {
					const paramName = paramNames[i];
					/** @type {HTMLElement | null} */
					const tag = templateContent.querySelector(paramName);
					if (tag) {
						showWarningsForAttributes(tag, []);
						result[paramName.replace(/^swal-/, "")] = tag.innerHTML.trim();
					}
				}
				return result;
			};
			/**
			* @param {DocumentFragment} templateContent
			*/
			const showWarningsForElements = (templateContent) => {
				const allowedElements = swalStringParams.concat([
					"swal-param",
					"swal-function-param",
					"swal-button",
					"swal-image",
					"swal-icon",
					"swal-input",
					"swal-input-option"
				]);
				Array.from(templateContent.children).forEach((el) => {
					const tagName = el.tagName.toLowerCase();
					if (!allowedElements.includes(tagName)) warn(`Unrecognized element <${tagName}>`);
				});
			};
			/**
			* @param {HTMLElement} el
			* @param {string[]} allowedAttributes
			*/
			const showWarningsForAttributes = (el, allowedAttributes) => {
				Array.from(el.attributes).forEach((attribute) => {
					if (allowedAttributes.indexOf(attribute.name) === -1) warn([`Unrecognized attribute "${attribute.name}" on <${el.tagName.toLowerCase()}>.`, `${allowedAttributes.length ? `Allowed attributes are: ${allowedAttributes.join(", ")}` : "To set the value, use HTML within the element."}`]);
				});
			};
			const SHOW_CLASS_TIMEOUT = 10;
			/**
			* Open popup, add necessary classes and styles, fix scrollbar
			*
			* @param {SweetAlertOptions} params
			*/
			const openPopup = (params) => {
				var _globalState$eventEmi, _globalState$eventEmi2;
				const container = getContainer();
				const popup = getPopup();
				if (!container || !popup) return;
				if (typeof params.willOpen === "function") params.willOpen(popup);
				(_globalState$eventEmi = globalState.eventEmitter) === null || _globalState$eventEmi === void 0 || _globalState$eventEmi.emit("willOpen", popup);
				const initialBodyOverflow = window.getComputedStyle(document.body).overflowY;
				addClasses(container, popup, params);
				setTimeout(() => {
					setScrollingVisibility(container, popup);
				}, SHOW_CLASS_TIMEOUT);
				if (isModal()) {
					fixScrollContainer(container, params.scrollbarPadding !== void 0 ? params.scrollbarPadding : false, initialBodyOverflow);
					setAriaHidden();
				}
				if (isIOS && params.backdrop === false && popup.scrollHeight > container.clientHeight) container.style.pointerEvents = "auto";
				if (!isToast() && !globalState.previousActiveElement) globalState.previousActiveElement = document.activeElement;
				if (typeof params.didOpen === "function") {
					const didOpen = params.didOpen;
					setTimeout(() => didOpen(popup));
				}
				(_globalState$eventEmi2 = globalState.eventEmitter) === null || _globalState$eventEmi2 === void 0 || _globalState$eventEmi2.emit("didOpen", popup);
			};
			/**
			* @param {Event} event
			*/
			const swalOpenAnimationFinished = (event) => {
				const popup = getPopup();
				if (!popup || event.target !== popup) return;
				const container = getContainer();
				if (!container) return;
				popup.removeEventListener("animationend", swalOpenAnimationFinished);
				popup.removeEventListener("transitionend", swalOpenAnimationFinished);
				container.style.overflowY = "auto";
				removeClass(container, swalClasses["no-transition"]);
			};
			/**
			* @param {HTMLElement} container
			* @param {HTMLElement} popup
			*/
			const setScrollingVisibility = (container, popup) => {
				if (hasCssAnimation(popup)) {
					container.style.overflowY = "hidden";
					popup.addEventListener("animationend", swalOpenAnimationFinished);
					popup.addEventListener("transitionend", swalOpenAnimationFinished);
				} else container.style.overflowY = "auto";
			};
			/**
			* @param {HTMLElement} container
			* @param {boolean} scrollbarPadding
			* @param {string} initialBodyOverflow
			*/
			const fixScrollContainer = (container, scrollbarPadding, initialBodyOverflow) => {
				iOSfix();
				if (scrollbarPadding && initialBodyOverflow !== "hidden") replaceScrollbarWithPadding(initialBodyOverflow);
				setTimeout(() => {
					container.scrollTop = 0;
				});
			};
			/**
			* @param {HTMLElement} container
			* @param {HTMLElement} popup
			* @param {SweetAlertOptions} params
			*/
			const addClasses = (container, popup, params) => {
				var _params$showClass;
				if ((_params$showClass = params.showClass) !== null && _params$showClass !== void 0 && _params$showClass.backdrop) addClass(container, params.showClass.backdrop);
				if (params.animation) {
					popup.style.setProperty("opacity", "0", "important");
					show(popup, "grid");
					setTimeout(() => {
						var _params$showClass2;
						if ((_params$showClass2 = params.showClass) !== null && _params$showClass2 !== void 0 && _params$showClass2.popup) addClass(popup, params.showClass.popup);
						popup.style.removeProperty("opacity");
					}, SHOW_CLASS_TIMEOUT);
				} else show(popup, "grid");
				addClass([document.documentElement, document.body], swalClasses.shown);
				if (params.heightAuto && params.backdrop && !params.toast) addClass([document.documentElement, document.body], swalClasses["height-auto"]);
			};
			var defaultInputValidators = {
				/**
				* @param {string} string
				* @param {string} [validationMessage]
				* @returns {Promise<string | void>}
				*/
				email: (string, validationMessage) => {
					return /^[a-zA-Z0-9.+_'-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9-]+$/.test(string) ? Promise.resolve() : Promise.resolve(validationMessage || "Invalid email address");
				},
				/**
				* @param {string} string
				* @param {string} [validationMessage]
				* @returns {Promise<string | void>}
				*/
				url: (string, validationMessage) => {
					return /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-z]{2,63}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)$/.test(string) ? Promise.resolve() : Promise.resolve(validationMessage || "Invalid URL");
				}
			};
			/**
			* @param {SweetAlertOptions} params
			*/
			function setDefaultInputValidators(params) {
				if (params.inputValidator) return;
				if (params.input === "email") params.inputValidator = defaultInputValidators["email"];
				if (params.input === "url") params.inputValidator = defaultInputValidators["url"];
			}
			/**
			* @param {SweetAlertOptions} params
			*/
			function validateCustomTargetElement(params) {
				if (!params.target || typeof params.target === "string" && !document.querySelector(params.target) || typeof params.target !== "string" && !params.target.appendChild) {
					warn("Target parameter is not valid, defaulting to \"body\"");
					params.target = "body";
				}
			}
			/**
			* Set type, text and actions on popup
			*
			* @param {SweetAlertOptions} params
			*/
			function setParameters(params) {
				setDefaultInputValidators(params);
				if (params.showLoaderOnConfirm && !params.preConfirm) warn("showLoaderOnConfirm is set to true, but preConfirm is not defined.\nshowLoaderOnConfirm should be used together with preConfirm, see usage example:\nhttps://sweetalert2.github.io/#ajax-request");
				validateCustomTargetElement(params);
				if (typeof params.title === "string") params.title = params.title.split("\n").join("<br />");
				init(params);
			}
			/** @type {SweetAlert} */
			let currentInstance;
			var _promise = /*#__PURE__*/ new WeakMap();
			class SweetAlert {
				/**
				* @param {...(SweetAlertOptions | string)} args
				* @this {SweetAlert}
				*/
				constructor(...args) {
					/**
					* @type {Promise<SweetAlertResult>}
					*/
					_classPrivateFieldInitSpec(this, _promise, Promise.resolve({
						isConfirmed: false,
						isDenied: false,
						isDismissed: true
					}));
					if (typeof window === "undefined") return;
					currentInstance = this;
					const outerParams = Object.freeze(this.constructor.argsToParams(args));
					/** @type {Readonly<SweetAlertOptions>} */
					this.params = outerParams;
					/** @type {boolean} */
					this.isAwaitingPromise = false;
					_classPrivateFieldSet2(_promise, this, this._main(currentInstance.params));
				}
				/**
				* @param {any} userParams
				* @param {any} mixinParams
				*/
				_main(userParams, mixinParams = {}) {
					showWarningsForParams(Object.assign({}, mixinParams, userParams));
					if (globalState.currentInstance) {
						const swalPromiseResolve = privateMethods.swalPromiseResolve.get(globalState.currentInstance);
						const { isAwaitingPromise } = globalState.currentInstance;
						globalState.currentInstance._destroy();
						if (!isAwaitingPromise) swalPromiseResolve({ isDismissed: true });
						if (isModal()) unsetAriaHidden();
					}
					globalState.currentInstance = currentInstance;
					const innerParams = prepareParams(userParams, mixinParams);
					setParameters(innerParams);
					Object.freeze(innerParams);
					if (globalState.timeout) {
						globalState.timeout.stop();
						delete globalState.timeout;
					}
					clearTimeout(globalState.restoreFocusTimeout);
					const domCache = populateDomCache(currentInstance);
					render(currentInstance, innerParams);
					privateProps.innerParams.set(currentInstance, innerParams);
					return swalPromise(currentInstance, domCache, innerParams);
				}
				/**
				* @param {any} onFulfilled
				*/
				then(onFulfilled) {
					return _classPrivateFieldGet2(_promise, this).then(onFulfilled);
				}
				/**
				* @param {any} onFinally
				*/
				finally(onFinally) {
					return _classPrivateFieldGet2(_promise, this).finally(onFinally);
				}
			}
			/**
			* @param {SweetAlert} instance
			* @param {DomCache} domCache
			* @param {SweetAlertOptions} innerParams
			* @returns {Promise<SweetAlertResult>}
			*/
			const swalPromise = (instance, domCache, innerParams) => {
				return new Promise((resolve, reject) => {
					/**
					* @param {DismissReason} dismiss
					*/
					const dismissWith = (dismiss) => {
						instance.close({
							isDismissed: true,
							dismiss,
							isConfirmed: false,
							isDenied: false
						});
					};
					privateMethods.swalPromiseResolve.set(instance, resolve);
					privateMethods.swalPromiseReject.set(instance, reject);
					domCache.confirmButton.onclick = () => {
						handleConfirmButtonClick(instance);
					};
					domCache.denyButton.onclick = () => {
						handleDenyButtonClick(instance);
					};
					domCache.cancelButton.onclick = () => {
						handleCancelButtonClick(instance, dismissWith);
					};
					domCache.closeButton.onclick = () => {
						dismissWith(DismissReason.close);
					};
					handlePopupClick(innerParams, domCache, dismissWith);
					addKeydownHandler(globalState, innerParams, dismissWith);
					handleInputOptionsAndValue(instance, innerParams);
					openPopup(innerParams);
					setupTimer(globalState, innerParams, dismissWith);
					initFocus(domCache, innerParams);
					setTimeout(() => {
						domCache.container.scrollTop = 0;
					});
				});
			};
			/**
			* @param {SweetAlertOptions} userParams
			* @param {SweetAlertOptions} mixinParams
			* @returns {SweetAlertOptions}
			*/
			const prepareParams = (userParams, mixinParams) => {
				const templateParams = getTemplateParams(userParams);
				const params = Object.assign({}, defaultParams, mixinParams, templateParams, userParams);
				params.showClass = Object.assign({}, defaultParams.showClass, params.showClass);
				params.hideClass = Object.assign({}, defaultParams.hideClass, params.hideClass);
				if (params.animation === false) {
					params.showClass = { backdrop: "swal2-noanimation" };
					params.hideClass = {};
				}
				return params;
			};
			/**
			* @param {SweetAlert} instance
			* @returns {DomCache}
			*/
			const populateDomCache = (instance) => {
				const domCache = (/** @type {DomCache} */ {
					popup: /** @type {HTMLElement} */ getPopup(),
					container: /** @type {HTMLElement} */ getContainer(),
					actions: /** @type {HTMLElement} */ getActions(),
					confirmButton: /** @type {HTMLElement} */ getConfirmButton(),
					denyButton: /** @type {HTMLElement} */ getDenyButton(),
					cancelButton: /** @type {HTMLElement} */ getCancelButton(),
					loader: /** @type {HTMLElement} */ getLoader(),
					closeButton: /** @type {HTMLElement} */ getCloseButton(),
					validationMessage: /** @type {HTMLElement} */ getValidationMessage(),
					progressSteps: /** @type {HTMLElement} */ getProgressSteps()
				});
				privateProps.domCache.set(instance, domCache);
				return domCache;
			};
			/**
			* @param {GlobalState} globalState
			* @param {SweetAlertOptions} innerParams
			* @param {(dismiss: DismissReason) => void} dismissWith
			*/
			const setupTimer = (globalState, innerParams, dismissWith) => {
				const timerProgressBar = getTimerProgressBar();
				hide(timerProgressBar);
				if (innerParams.timer) {
					globalState.timeout = new Timer(() => {
						dismissWith("timer");
						delete globalState.timeout;
					}, innerParams.timer);
					if (innerParams.timerProgressBar && timerProgressBar) {
						show(timerProgressBar);
						applyCustomClass(timerProgressBar, innerParams, "timerProgressBar");
						setTimeout(() => {
							if (globalState.timeout && globalState.timeout.running) animateTimerProgressBar(
								/** @type {number} */
								innerParams.timer
							);
						});
					}
				}
			};
			/**
			* Initialize focus in the popup:
			*
			* 1. If `toast` is `true`, don't steal focus from the document.
			* 2. Else if there is an [autofocus] element, focus it.
			* 3. Else if `focusConfirm` is `true` and confirm button is visible, focus it.
			* 4. Else if `focusDeny` is `true` and deny button is visible, focus it.
			* 5. Else if `focusCancel` is `true` and cancel button is visible, focus it.
			* 6. Else focus the first focusable element in a popup (if any).
			*
			* @param {DomCache} domCache
			* @param {SweetAlertOptions} innerParams
			*/
			const initFocus = (domCache, innerParams) => {
				if (innerParams.toast) return;
				if (!callIfFunction(innerParams.allowEnterKey)) {
					warnAboutDeprecation("allowEnterKey", "preConfirm: () => false");
					domCache.popup.focus();
					return;
				}
				if (focusAutofocus(domCache)) return;
				if (focusButton(domCache, innerParams)) return;
				setFocus(-1, 1);
			};
			/**
			* @param {DomCache} domCache
			* @returns {boolean}
			*/
			const focusAutofocus = (domCache) => {
				const autofocusElements = Array.from(domCache.popup.querySelectorAll("[autofocus]"));
				for (const autofocusElement of autofocusElements) if (autofocusElement instanceof HTMLElement && isVisible$1(autofocusElement)) {
					autofocusElement.focus();
					return true;
				}
				return false;
			};
			/**
			* @param {DomCache} domCache
			* @param {SweetAlertOptions} innerParams
			* @returns {boolean}
			*/
			const focusButton = (domCache, innerParams) => {
				if (innerParams.focusDeny && isVisible$1(domCache.denyButton)) {
					domCache.denyButton.focus();
					return true;
				}
				if (innerParams.focusCancel && isVisible$1(domCache.cancelButton)) {
					domCache.cancelButton.focus();
					return true;
				}
				if (innerParams.focusConfirm && isVisible$1(domCache.confirmButton)) {
					domCache.confirmButton.focus();
					return true;
				}
				return false;
			};
			SweetAlert.prototype.disableButtons = disableButtons;
			SweetAlert.prototype.enableButtons = enableButtons;
			SweetAlert.prototype.getInput = getInput;
			SweetAlert.prototype.disableInput = disableInput;
			SweetAlert.prototype.enableInput = enableInput;
			SweetAlert.prototype.hideLoading = hideLoading;
			SweetAlert.prototype.disableLoading = hideLoading;
			SweetAlert.prototype.showValidationMessage = showValidationMessage;
			SweetAlert.prototype.resetValidationMessage = resetValidationMessage;
			SweetAlert.prototype.close = close;
			SweetAlert.prototype.closePopup = close;
			SweetAlert.prototype.closeModal = close;
			SweetAlert.prototype.closeToast = close;
			SweetAlert.prototype.rejectPromise = rejectPromise;
			SweetAlert.prototype.update = update;
			SweetAlert.prototype._destroy = _destroy;
			Object.assign(SweetAlert, staticMethods);
			Object.keys(instanceMethods).forEach((key) => {
				/**
				* @param {...(SweetAlertOptions | string | undefined)} args
				* @returns {SweetAlertResult | Promise<SweetAlertResult> | undefined}
				*/
				SweetAlert[key] = function(...args) {
					if (currentInstance && currentInstance[key]) return currentInstance[key](...args);
				};
			});
			SweetAlert.DismissReason = DismissReason;
			SweetAlert.version = "11.26.25";
			const Swal = SweetAlert;
			Swal.default = Swal;
			return Swal;
		}));
		if (typeof exports !== "undefined" && exports.Sweetalert2) exports.swal = exports.sweetAlert = exports.Swal = exports.SweetAlert = exports.Sweetalert2;
		"undefined" != typeof document && function(e, t) {
			var n = e.createElement("style");
			if (e.getElementsByTagName("head")[0].appendChild(n), n.styleSheet) n.styleSheet.disabled || (n.styleSheet.cssText = t);
			else try {
				n.innerHTML = t;
			} catch (e) {
				n.innerText = t;
			}
		}(document, ":root{--swal2-outline: 0 0 0 3px rgba(100, 150, 200, 0.5);--swal2-container-padding: 0.625em;--swal2-backdrop: rgba(0, 0, 0, 0.4);--swal2-backdrop-transition: background-color 0.15s;--swal2-width: 32em;--swal2-padding: 0 0 1.25em;--swal2-border: none;--swal2-border-radius: 0.3125rem;--swal2-background: white;--swal2-color: #545454;--swal2-show-animation: swal2-show 0.3s;--swal2-hide-animation: swal2-hide 0.15s forwards;--swal2-icon-zoom: 1;--swal2-title-padding: 0.8em 1em 0;--swal2-html-container-padding: 1em 1.6em 0.3em;--swal2-input-border: 1px solid #d9d9d9;--swal2-input-border-radius: 0.1875em;--swal2-input-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.06), 0 0 0 3px transparent;--swal2-input-background: transparent;--swal2-input-transition: border-color 0.2s, box-shadow 0.2s;--swal2-input-hover-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.06), 0 0 0 3px transparent;--swal2-input-focus-border: 1px solid #b4dbed;--swal2-input-focus-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.06), 0 0 0 3px rgba(100, 150, 200, 0.5);--swal2-progress-step-background: #add8e6;--swal2-validation-message-background: #f0f0f0;--swal2-validation-message-color: #666;--swal2-footer-border-color: #eee;--swal2-footer-background: transparent;--swal2-footer-color: inherit;--swal2-timer-progress-bar-background: rgba(0, 0, 0, 0.3);--swal2-close-button-position: initial;--swal2-close-button-inset: auto;--swal2-close-button-font-size: 2.5em;--swal2-close-button-color: #ccc;--swal2-close-button-transition: color 0.2s, box-shadow 0.2s;--swal2-close-button-outline: initial;--swal2-close-button-box-shadow: inset 0 0 0 3px transparent;--swal2-close-button-focus-box-shadow: inset var(--swal2-outline);--swal2-close-button-hover-transform: none;--swal2-actions-justify-content: center;--swal2-actions-width: auto;--swal2-actions-margin: 1.25em auto 0;--swal2-actions-padding: 0;--swal2-actions-border-radius: 0;--swal2-actions-background: transparent;--swal2-action-button-transition: background-color 0.2s, box-shadow 0.2s;--swal2-action-button-hover: black 10%;--swal2-action-button-active: black 10%;--swal2-confirm-button-box-shadow: none;--swal2-confirm-button-border-radius: 0.25em;--swal2-confirm-button-background-color: #7066e0;--swal2-confirm-button-color: #fff;--swal2-deny-button-box-shadow: none;--swal2-deny-button-border-radius: 0.25em;--swal2-deny-button-background-color: #dc3741;--swal2-deny-button-color: #fff;--swal2-cancel-button-box-shadow: none;--swal2-cancel-button-border-radius: 0.25em;--swal2-cancel-button-background-color: #6e7881;--swal2-cancel-button-color: #fff;--swal2-toast-show-animation: swal2-toast-show 0.5s;--swal2-toast-hide-animation: swal2-toast-hide 0.1s forwards;--swal2-toast-border: none;--swal2-toast-box-shadow: 0 0 1px hsl(0deg 0% 0% / 0.075), 0 1px 2px hsl(0deg 0% 0% / 0.075), 1px 2px 4px hsl(0deg 0% 0% / 0.075), 1px 3px 8px hsl(0deg 0% 0% / 0.075), 2px 4px 16px hsl(0deg 0% 0% / 0.075)}[data-swal2-theme=dark]{--swal2-dark-theme-black: #19191a;--swal2-dark-theme-white: #e1e1e1;--swal2-background: var(--swal2-dark-theme-black);--swal2-color: var(--swal2-dark-theme-white);--swal2-footer-border-color: #555;--swal2-input-background: color-mix(in srgb, var(--swal2-dark-theme-black), var(--swal2-dark-theme-white) 10%);--swal2-validation-message-background: color-mix( in srgb, var(--swal2-dark-theme-black), var(--swal2-dark-theme-white) 10% );--swal2-validation-message-color: var(--swal2-dark-theme-white);--swal2-timer-progress-bar-background: rgba(255, 255, 255, 0.7)}@media(prefers-color-scheme: dark){[data-swal2-theme=auto]{--swal2-dark-theme-black: #19191a;--swal2-dark-theme-white: #e1e1e1;--swal2-background: var(--swal2-dark-theme-black);--swal2-color: var(--swal2-dark-theme-white);--swal2-footer-border-color: #555;--swal2-input-background: color-mix(in srgb, var(--swal2-dark-theme-black), var(--swal2-dark-theme-white) 10%);--swal2-validation-message-background: color-mix( in srgb, var(--swal2-dark-theme-black), var(--swal2-dark-theme-white) 10% );--swal2-validation-message-color: var(--swal2-dark-theme-white);--swal2-timer-progress-bar-background: rgba(255, 255, 255, 0.7)}}body.swal2-shown:not(.swal2-no-backdrop,.swal2-toast-shown){overflow:hidden}body.swal2-height-auto{height:auto !important}body.swal2-no-backdrop .swal2-container{background-color:rgba(0,0,0,0) !important;pointer-events:none}body.swal2-no-backdrop .swal2-container .swal2-popup{pointer-events:auto}body.swal2-no-backdrop .swal2-container .swal2-modal{box-shadow:0 0 10px var(--swal2-backdrop)}body.swal2-toast-shown .swal2-container{box-sizing:border-box;width:360px;max-width:100%;background-color:rgba(0,0,0,0);pointer-events:none}body.swal2-toast-shown .swal2-container.swal2-top{inset:0 auto auto 50%;transform:translateX(-50%)}body.swal2-toast-shown .swal2-container.swal2-top-end,body.swal2-toast-shown .swal2-container.swal2-top-right{inset:0 0 auto auto}body.swal2-toast-shown .swal2-container.swal2-top-start,body.swal2-toast-shown .swal2-container.swal2-top-left{inset:0 auto auto 0}body.swal2-toast-shown .swal2-container.swal2-center-start,body.swal2-toast-shown .swal2-container.swal2-center-left{inset:50% auto auto 0;transform:translateY(-50%)}body.swal2-toast-shown .swal2-container.swal2-center{inset:50% auto auto 50%;transform:translate(-50%, -50%)}body.swal2-toast-shown .swal2-container.swal2-center-end,body.swal2-toast-shown .swal2-container.swal2-center-right{inset:50% 0 auto auto;transform:translateY(-50%)}body.swal2-toast-shown .swal2-container.swal2-bottom-start,body.swal2-toast-shown .swal2-container.swal2-bottom-left{inset:auto auto 0 0}body.swal2-toast-shown .swal2-container.swal2-bottom{inset:auto auto 0 50%;transform:translateX(-50%)}body.swal2-toast-shown .swal2-container.swal2-bottom-end,body.swal2-toast-shown .swal2-container.swal2-bottom-right{inset:auto 0 0 auto}@media print{body.swal2-shown:not(.swal2-no-backdrop,.swal2-toast-shown){overflow-y:scroll !important}body.swal2-shown:not(.swal2-no-backdrop,.swal2-toast-shown)>[aria-hidden=true]{display:none}body.swal2-shown:not(.swal2-no-backdrop,.swal2-toast-shown) .swal2-container{position:static !important}}div:where(.swal2-container){display:grid;position:fixed;z-index:1060;inset:0;box-sizing:border-box;grid-template-areas:\"top-start     top            top-end\" \"center-start  center         center-end\" \"bottom-start  bottom-center  bottom-end\";grid-template-rows:minmax(min-content, auto) minmax(min-content, auto) minmax(min-content, auto);height:100%;padding:var(--swal2-container-padding);overflow-x:hidden;transition:var(--swal2-backdrop-transition);-webkit-overflow-scrolling:touch}div:where(.swal2-container).swal2-backdrop-show,div:where(.swal2-container).swal2-noanimation{background:var(--swal2-backdrop)}div:where(.swal2-container).swal2-backdrop-hide{background:rgba(0,0,0,0) !important}div:where(.swal2-container).swal2-top-start,div:where(.swal2-container).swal2-center-start,div:where(.swal2-container).swal2-bottom-start{grid-template-columns:minmax(0, 1fr) auto auto}div:where(.swal2-container).swal2-top,div:where(.swal2-container).swal2-center,div:where(.swal2-container).swal2-bottom{grid-template-columns:auto minmax(0, 1fr) auto}div:where(.swal2-container).swal2-top-end,div:where(.swal2-container).swal2-center-end,div:where(.swal2-container).swal2-bottom-end{grid-template-columns:auto auto minmax(0, 1fr)}div:where(.swal2-container).swal2-top-start>.swal2-popup{align-self:start}div:where(.swal2-container).swal2-top>.swal2-popup{grid-column:2;place-self:start center}div:where(.swal2-container).swal2-top-end>.swal2-popup,div:where(.swal2-container).swal2-top-right>.swal2-popup{grid-column:3;place-self:start end}div:where(.swal2-container).swal2-center-start>.swal2-popup,div:where(.swal2-container).swal2-center-left>.swal2-popup{grid-row:2;align-self:center}div:where(.swal2-container).swal2-center>.swal2-popup{grid-column:2;grid-row:2;place-self:center center}div:where(.swal2-container).swal2-center-end>.swal2-popup,div:where(.swal2-container).swal2-center-right>.swal2-popup{grid-column:3;grid-row:2;place-self:center end}div:where(.swal2-container).swal2-bottom-start>.swal2-popup,div:where(.swal2-container).swal2-bottom-left>.swal2-popup{grid-column:1;grid-row:3;align-self:end}div:where(.swal2-container).swal2-bottom>.swal2-popup{grid-column:2;grid-row:3;place-self:end center}div:where(.swal2-container).swal2-bottom-end>.swal2-popup,div:where(.swal2-container).swal2-bottom-right>.swal2-popup{grid-column:3;grid-row:3;place-self:end end}div:where(.swal2-container).swal2-grow-row>.swal2-popup,div:where(.swal2-container).swal2-grow-fullscreen>.swal2-popup{grid-column:1/4;width:100%}div:where(.swal2-container).swal2-grow-column>.swal2-popup,div:where(.swal2-container).swal2-grow-fullscreen>.swal2-popup{grid-row:1/4;align-self:stretch}div:where(.swal2-container).swal2-no-transition{transition:none !important}div:where(.swal2-container)[popover]{width:auto;border:0}div:where(.swal2-container) div:where(.swal2-popup){display:none;position:relative;box-sizing:border-box;grid-template-columns:minmax(0, 100%);width:var(--swal2-width);max-width:100%;padding:var(--swal2-padding);border:var(--swal2-border);border-radius:var(--swal2-border-radius);background:var(--swal2-background);color:var(--swal2-color);font-family:inherit;font-size:1rem}div:where(.swal2-container) div:where(.swal2-popup):focus{outline:none}div:where(.swal2-container) div:where(.swal2-popup).swal2-loading{overflow-y:hidden}div:where(.swal2-container) div:where(.swal2-popup).swal2-draggable{cursor:grab}div:where(.swal2-container) div:where(.swal2-popup).swal2-draggable div:where(.swal2-icon){cursor:grab}div:where(.swal2-container) div:where(.swal2-popup).swal2-dragging{cursor:grabbing}div:where(.swal2-container) div:where(.swal2-popup).swal2-dragging div:where(.swal2-icon){cursor:grabbing}div:where(.swal2-container) h2:where(.swal2-title){position:relative;max-width:100%;margin:0;padding:var(--swal2-title-padding);color:inherit;font-size:1.875em;font-weight:600;text-align:center;text-transform:none;overflow-wrap:break-word;cursor:initial}div:where(.swal2-container) div:where(.swal2-actions){display:flex;z-index:1;box-sizing:border-box;flex-wrap:wrap;align-items:center;justify-content:var(--swal2-actions-justify-content);width:var(--swal2-actions-width);margin:var(--swal2-actions-margin);padding:var(--swal2-actions-padding);border-radius:var(--swal2-actions-border-radius);background:var(--swal2-actions-background)}div:where(.swal2-container) div:where(.swal2-loader){display:none;align-items:center;justify-content:center;width:2.2em;height:2.2em;margin:0 1.875em;animation:swal2-rotate-loading 1.5s linear 0s infinite normal;border-width:.25em;border-style:solid;border-radius:100%;border-color:#2778c4 rgba(0,0,0,0) #2778c4 rgba(0,0,0,0)}div:where(.swal2-container) button:where(.swal2-styled){margin:.3125em;padding:.625em 1.1em;transition:var(--swal2-action-button-transition);border:none;box-shadow:0 0 0 3px rgba(0,0,0,0);font-weight:500}div:where(.swal2-container) button:where(.swal2-styled):not([disabled]){cursor:pointer}div:where(.swal2-container) button:where(.swal2-styled):where(.swal2-confirm){border-radius:var(--swal2-confirm-button-border-radius);background:initial;background-color:var(--swal2-confirm-button-background-color);box-shadow:var(--swal2-confirm-button-box-shadow);color:var(--swal2-confirm-button-color);font-size:1em}div:where(.swal2-container) button:where(.swal2-styled):where(.swal2-confirm):hover{background-color:color-mix(in srgb, var(--swal2-confirm-button-background-color), var(--swal2-action-button-hover))}div:where(.swal2-container) button:where(.swal2-styled):where(.swal2-confirm):active{background-color:color-mix(in srgb, var(--swal2-confirm-button-background-color), var(--swal2-action-button-active))}div:where(.swal2-container) button:where(.swal2-styled):where(.swal2-deny){border-radius:var(--swal2-deny-button-border-radius);background:initial;background-color:var(--swal2-deny-button-background-color);box-shadow:var(--swal2-deny-button-box-shadow);color:var(--swal2-deny-button-color);font-size:1em}div:where(.swal2-container) button:where(.swal2-styled):where(.swal2-deny):hover{background-color:color-mix(in srgb, var(--swal2-deny-button-background-color), var(--swal2-action-button-hover))}div:where(.swal2-container) button:where(.swal2-styled):where(.swal2-deny):active{background-color:color-mix(in srgb, var(--swal2-deny-button-background-color), var(--swal2-action-button-active))}div:where(.swal2-container) button:where(.swal2-styled):where(.swal2-cancel){border-radius:var(--swal2-cancel-button-border-radius);background:initial;background-color:var(--swal2-cancel-button-background-color);box-shadow:var(--swal2-cancel-button-box-shadow);color:var(--swal2-cancel-button-color);font-size:1em}div:where(.swal2-container) button:where(.swal2-styled):where(.swal2-cancel):hover{background-color:color-mix(in srgb, var(--swal2-cancel-button-background-color), var(--swal2-action-button-hover))}div:where(.swal2-container) button:where(.swal2-styled):where(.swal2-cancel):active{background-color:color-mix(in srgb, var(--swal2-cancel-button-background-color), var(--swal2-action-button-active))}div:where(.swal2-container) button:where(.swal2-styled):focus-visible{outline:none;box-shadow:var(--swal2-action-button-focus-box-shadow)}div:where(.swal2-container) button:where(.swal2-styled)[disabled]:not(.swal2-loading){opacity:.4}div:where(.swal2-container) button:where(.swal2-styled)::-moz-focus-inner{border:0}div:where(.swal2-container) div:where(.swal2-footer){margin:1em 0 0;padding:1em 1em 0;border-top:1px solid var(--swal2-footer-border-color);background:var(--swal2-footer-background);color:var(--swal2-footer-color);font-size:1em;text-align:center;cursor:initial}div:where(.swal2-container) .swal2-timer-progress-bar-container{position:absolute;right:0;bottom:0;left:0;grid-column:auto !important;overflow:hidden;border-bottom-right-radius:var(--swal2-border-radius);border-bottom-left-radius:var(--swal2-border-radius)}div:where(.swal2-container) div:where(.swal2-timer-progress-bar){width:100%;height:.25em;background:var(--swal2-timer-progress-bar-background)}div:where(.swal2-container) img:where(.swal2-image){max-width:100%;margin:2em auto 1em;cursor:initial}div:where(.swal2-container) button:where(.swal2-close){position:var(--swal2-close-button-position);inset:var(--swal2-close-button-inset);z-index:2;align-items:center;justify-content:center;width:1.2em;height:1.2em;margin-top:0;margin-right:0;margin-bottom:-1.2em;padding:0;overflow:hidden;transition:var(--swal2-close-button-transition);border:none;border-radius:var(--swal2-border-radius);outline:var(--swal2-close-button-outline);background:rgba(0,0,0,0);color:var(--swal2-close-button-color);font-family:monospace;font-size:var(--swal2-close-button-font-size);cursor:pointer;justify-self:end}div:where(.swal2-container) button:where(.swal2-close):hover{transform:var(--swal2-close-button-hover-transform);background:rgba(0,0,0,0);color:#f27474}div:where(.swal2-container) button:where(.swal2-close):focus-visible{outline:none;box-shadow:var(--swal2-close-button-focus-box-shadow)}div:where(.swal2-container) button:where(.swal2-close)::-moz-focus-inner{border:0}div:where(.swal2-container) div:where(.swal2-html-container){z-index:1;justify-content:center;margin:0;padding:var(--swal2-html-container-padding);overflow:auto;color:inherit;font-size:1.125em;font-weight:normal;line-height:normal;text-align:center;overflow-wrap:break-word;word-break:break-word;cursor:initial}div:where(.swal2-container) input:where(.swal2-input),div:where(.swal2-container) input:where(.swal2-file),div:where(.swal2-container) textarea:where(.swal2-textarea),div:where(.swal2-container) select:where(.swal2-select),div:where(.swal2-container) div:where(.swal2-radio),div:where(.swal2-container) label:where(.swal2-checkbox){margin:1em 2em 3px}div:where(.swal2-container) input:where(.swal2-input),div:where(.swal2-container) input:where(.swal2-file),div:where(.swal2-container) textarea:where(.swal2-textarea){box-sizing:border-box;width:auto;transition:var(--swal2-input-transition);border:var(--swal2-input-border);border-radius:var(--swal2-input-border-radius);background:var(--swal2-input-background);box-shadow:var(--swal2-input-box-shadow);color:inherit;font-size:1.125em}div:where(.swal2-container) input:where(.swal2-input).swal2-inputerror,div:where(.swal2-container) input:where(.swal2-file).swal2-inputerror,div:where(.swal2-container) textarea:where(.swal2-textarea).swal2-inputerror{border-color:#f27474 !important;box-shadow:0 0 2px #f27474 !important}div:where(.swal2-container) input:where(.swal2-input):hover,div:where(.swal2-container) input:where(.swal2-file):hover,div:where(.swal2-container) textarea:where(.swal2-textarea):hover{box-shadow:var(--swal2-input-hover-box-shadow)}div:where(.swal2-container) input:where(.swal2-input):focus,div:where(.swal2-container) input:where(.swal2-file):focus,div:where(.swal2-container) textarea:where(.swal2-textarea):focus{border:var(--swal2-input-focus-border);outline:none;box-shadow:var(--swal2-input-focus-box-shadow)}div:where(.swal2-container) input:where(.swal2-input)::placeholder,div:where(.swal2-container) input:where(.swal2-file)::placeholder,div:where(.swal2-container) textarea:where(.swal2-textarea)::placeholder{color:#ccc}div:where(.swal2-container) .swal2-range{margin:1em 2em 3px;background:var(--swal2-background)}div:where(.swal2-container) .swal2-range input{width:80%}div:where(.swal2-container) .swal2-range output{width:20%;color:inherit;font-weight:600;text-align:center}div:where(.swal2-container) .swal2-range input,div:where(.swal2-container) .swal2-range output{height:2.625em;padding:0;font-size:1.125em;line-height:2.625em}div:where(.swal2-container) .swal2-input{height:2.625em;padding:0 .75em}div:where(.swal2-container) .swal2-file{width:75%;margin-right:auto;margin-left:auto;background:var(--swal2-input-background);font-size:1.125em}div:where(.swal2-container) .swal2-textarea{height:6.75em;padding:.75em}div:where(.swal2-container) .swal2-select{min-width:50%;max-width:100%;padding:.375em .625em;background:var(--swal2-input-background);color:inherit;font-size:1.125em}div:where(.swal2-container) .swal2-radio,div:where(.swal2-container) .swal2-checkbox{align-items:center;justify-content:center;background:var(--swal2-background);color:inherit}div:where(.swal2-container) .swal2-radio label,div:where(.swal2-container) .swal2-checkbox label{margin:0 .6em;font-size:1.125em}div:where(.swal2-container) .swal2-radio input,div:where(.swal2-container) .swal2-checkbox input{flex-shrink:0;margin:0 .4em}div:where(.swal2-container) label:where(.swal2-input-label){display:flex;justify-content:center;margin:1em auto 0}div:where(.swal2-container) div:where(.swal2-validation-message){align-items:center;justify-content:center;margin:1em 0 0;padding:.625em;overflow:hidden;background:var(--swal2-validation-message-background);color:var(--swal2-validation-message-color);font-size:1em;font-weight:300}div:where(.swal2-container) div:where(.swal2-validation-message)::before{content:\"!\";display:inline-block;width:1.5em;min-width:1.5em;height:1.5em;margin:0 .625em;border-radius:50%;background-color:#f27474;color:#fff;font-weight:600;line-height:1.5em;text-align:center}div:where(.swal2-container) .swal2-progress-steps{flex-wrap:wrap;align-items:center;max-width:100%;margin:1.25em auto;padding:0;background:rgba(0,0,0,0);font-weight:600}div:where(.swal2-container) .swal2-progress-steps li{display:inline-block;position:relative}div:where(.swal2-container) .swal2-progress-steps .swal2-progress-step{z-index:20;flex-shrink:0;width:2em;height:2em;border-radius:2em;background:#2778c4;color:#fff;line-height:2em;text-align:center}div:where(.swal2-container) .swal2-progress-steps .swal2-progress-step.swal2-active-progress-step{background:#2778c4}div:where(.swal2-container) .swal2-progress-steps .swal2-progress-step.swal2-active-progress-step~.swal2-progress-step{background:var(--swal2-progress-step-background);color:#fff}div:where(.swal2-container) .swal2-progress-steps .swal2-progress-step.swal2-active-progress-step~.swal2-progress-step-line{background:var(--swal2-progress-step-background)}div:where(.swal2-container) .swal2-progress-steps .swal2-progress-step-line{z-index:10;flex-shrink:0;width:2.5em;height:.4em;margin:0 -1px;background:#2778c4}div:where(.swal2-icon){position:relative;box-sizing:content-box;justify-content:center;width:5em;height:5em;margin:2.5em auto .6em;zoom:var(--swal2-icon-zoom);border:.25em solid rgba(0,0,0,0);border-radius:50%;border-color:#000;font-family:inherit;line-height:5em;cursor:default;user-select:none}div:where(.swal2-icon) .swal2-icon-content{display:flex;align-items:center;font-size:3.75em}div:where(.swal2-icon).swal2-error{border-color:#f27474;color:#f27474}div:where(.swal2-icon).swal2-error .swal2-x-mark{position:relative;flex-grow:1}div:where(.swal2-icon).swal2-error [class^=swal2-x-mark-line]{display:block;position:absolute;top:2.3125em;width:2.9375em;height:.3125em;border-radius:.125em;background-color:#f27474}div:where(.swal2-icon).swal2-error [class^=swal2-x-mark-line][class$=left]{left:1.0625em;transform:rotate(45deg)}div:where(.swal2-icon).swal2-error [class^=swal2-x-mark-line][class$=right]{right:1em;transform:rotate(-45deg)}div:where(.swal2-icon).swal2-error.swal2-icon-show{animation:swal2-animate-error-icon .5s}div:where(.swal2-icon).swal2-error.swal2-icon-show .swal2-x-mark{animation:swal2-animate-error-x-mark .5s}div:where(.swal2-icon).swal2-warning{border-color:#f8bb86;color:#f8bb86}div:where(.swal2-icon).swal2-warning.swal2-icon-show{animation:swal2-animate-error-icon .5s}div:where(.swal2-icon).swal2-warning.swal2-icon-show .swal2-icon-content{animation:swal2-animate-i-mark .5s}div:where(.swal2-icon).swal2-info{border-color:#3fc3ee;color:#3fc3ee}div:where(.swal2-icon).swal2-info.swal2-icon-show{animation:swal2-animate-error-icon .5s}div:where(.swal2-icon).swal2-info.swal2-icon-show .swal2-icon-content{animation:swal2-animate-i-mark .8s}div:where(.swal2-icon).swal2-question{border-color:#87adbd;color:#87adbd}div:where(.swal2-icon).swal2-question.swal2-icon-show{animation:swal2-animate-error-icon .5s}div:where(.swal2-icon).swal2-question.swal2-icon-show .swal2-icon-content{animation:swal2-animate-question-mark .8s}div:where(.swal2-icon).swal2-success{border-color:#a5dc86;color:#a5dc86}div:where(.swal2-icon).swal2-success [class^=swal2-success-circular-line]{position:absolute;width:3.75em;height:7.5em;border-radius:50%}div:where(.swal2-icon).swal2-success [class^=swal2-success-circular-line][class$=left]{top:-0.4375em;left:-2.0635em;transform:rotate(-45deg);transform-origin:3.75em 3.75em;border-radius:7.5em 0 0 7.5em}div:where(.swal2-icon).swal2-success [class^=swal2-success-circular-line][class$=right]{top:-0.6875em;left:1.875em;transform:rotate(-45deg);transform-origin:0 3.75em;border-radius:0 7.5em 7.5em 0}div:where(.swal2-icon).swal2-success .swal2-success-ring{position:absolute;z-index:2;top:-0.25em;left:-0.25em;box-sizing:content-box;width:100%;height:100%;border:.25em solid rgba(165,220,134,.3);border-radius:50%}div:where(.swal2-icon).swal2-success .swal2-success-fix{position:absolute;z-index:1;top:.5em;left:1.625em;width:.4375em;height:5.625em;transform:rotate(-45deg)}div:where(.swal2-icon).swal2-success [class^=swal2-success-line]{display:block;position:absolute;z-index:2;height:.3125em;border-radius:.125em;background-color:#a5dc86}div:where(.swal2-icon).swal2-success [class^=swal2-success-line][class$=tip]{top:2.875em;left:.8125em;width:1.5625em;transform:rotate(45deg)}div:where(.swal2-icon).swal2-success [class^=swal2-success-line][class$=long]{top:2.375em;right:.5em;width:2.9375em;transform:rotate(-45deg)}div:where(.swal2-icon).swal2-success.swal2-icon-show .swal2-success-line-tip{animation:swal2-animate-success-line-tip .75s}div:where(.swal2-icon).swal2-success.swal2-icon-show .swal2-success-line-long{animation:swal2-animate-success-line-long .75s}div:where(.swal2-icon).swal2-success.swal2-icon-show .swal2-success-circular-line-right{animation:swal2-rotate-success-circular-line 4.25s ease-in}[class^=swal2]{-webkit-tap-highlight-color:rgba(0,0,0,0)}.swal2-show{animation:var(--swal2-show-animation)}.swal2-hide{animation:var(--swal2-hide-animation)}.swal2-noanimation{transition:none}.swal2-scrollbar-measure{position:absolute;top:-9999px;width:50px;height:50px;overflow:scroll}.swal2-rtl .swal2-close{margin-right:initial;margin-left:0}.swal2-rtl .swal2-timer-progress-bar{right:0;left:auto}.swal2-toast{box-sizing:border-box;grid-column:1/4 !important;grid-row:1/4 !important;grid-template-columns:min-content auto min-content;padding:1em;overflow-y:hidden;border:var(--swal2-toast-border);background:var(--swal2-background);box-shadow:var(--swal2-toast-box-shadow);pointer-events:auto}.swal2-toast>*{grid-column:2}.swal2-toast h2:where(.swal2-title){margin:.5em 1em;padding:0;font-size:1em;text-align:initial}.swal2-toast .swal2-loading{justify-content:center}.swal2-toast input:where(.swal2-input){height:2em;margin:.5em;font-size:1em}.swal2-toast .swal2-validation-message{font-size:1em}.swal2-toast div:where(.swal2-footer){margin:.5em 0 0;padding:.5em 0 0;font-size:.8em}.swal2-toast button:where(.swal2-close){grid-column:3/3;grid-row:1/99;align-self:center;width:.8em;height:.8em;margin:0;font-size:2em}.swal2-toast div:where(.swal2-html-container){margin:.5em 1em;padding:0;overflow:initial;font-size:1em;text-align:initial}.swal2-toast div:where(.swal2-html-container):empty{padding:0}.swal2-toast .swal2-loader{grid-column:1;grid-row:1/99;align-self:center;width:2em;height:2em;margin:.25em}.swal2-toast .swal2-icon{grid-column:1;grid-row:1/99;align-self:center;width:2em;min-width:2em;height:2em;margin:0 .5em 0 0}.swal2-toast .swal2-icon .swal2-icon-content{display:flex;align-items:center;font-size:1.8em;font-weight:bold}.swal2-toast .swal2-icon.swal2-success .swal2-success-ring{width:2em;height:2em}.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line]{top:.875em;width:1.375em}.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=left]{left:.3125em}.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=right]{right:.3125em}.swal2-toast div:where(.swal2-actions){justify-content:flex-start;height:auto;margin:0;margin-top:.5em;padding:0 .5em}.swal2-toast button:where(.swal2-styled){margin:.25em .5em;padding:.4em .6em;font-size:1em}.swal2-toast .swal2-success{border-color:#a5dc86}.swal2-toast .swal2-success [class^=swal2-success-circular-line]{position:absolute;width:1.6em;height:3em;border-radius:50%}.swal2-toast .swal2-success [class^=swal2-success-circular-line][class$=left]{top:-0.8em;left:-0.5em;transform:rotate(-45deg);transform-origin:2em 2em;border-radius:4em 0 0 4em}.swal2-toast .swal2-success [class^=swal2-success-circular-line][class$=right]{top:-0.25em;left:.9375em;transform-origin:0 1.5em;border-radius:0 4em 4em 0}.swal2-toast .swal2-success .swal2-success-ring{width:2em;height:2em}.swal2-toast .swal2-success .swal2-success-fix{top:0;left:.4375em;width:.4375em;height:2.6875em}.swal2-toast .swal2-success [class^=swal2-success-line]{height:.3125em}.swal2-toast .swal2-success [class^=swal2-success-line][class$=tip]{top:1.125em;left:.1875em;width:.75em}.swal2-toast .swal2-success [class^=swal2-success-line][class$=long]{top:.9375em;right:.1875em;width:1.375em}.swal2-toast .swal2-success.swal2-icon-show .swal2-success-line-tip{animation:swal2-toast-animate-success-line-tip .75s}.swal2-toast .swal2-success.swal2-icon-show .swal2-success-line-long{animation:swal2-toast-animate-success-line-long .75s}.swal2-toast.swal2-show{animation:var(--swal2-toast-show-animation)}.swal2-toast.swal2-hide{animation:var(--swal2-toast-hide-animation)}@keyframes swal2-show{0%{transform:translate3d(0, -50px, 0) scale(0.9);opacity:0}100%{transform:translate3d(0, 0, 0) scale(1);opacity:1}}@keyframes swal2-hide{0%{transform:translate3d(0, 0, 0) scale(1);opacity:1}100%{transform:translate3d(0, -50px, 0) scale(0.9);opacity:0}}@keyframes swal2-animate-success-line-tip{0%{top:1.1875em;left:.0625em;width:0}54%{top:1.0625em;left:.125em;width:0}70%{top:2.1875em;left:-0.375em;width:3.125em}84%{top:3em;left:1.3125em;width:1.0625em}100%{top:2.8125em;left:.8125em;width:1.5625em}}@keyframes swal2-animate-success-line-long{0%{top:3.375em;right:2.875em;width:0}65%{top:3.375em;right:2.875em;width:0}84%{top:2.1875em;right:0;width:3.4375em}100%{top:2.375em;right:.5em;width:2.9375em}}@keyframes swal2-rotate-success-circular-line{0%{transform:rotate(-45deg)}5%{transform:rotate(-45deg)}12%{transform:rotate(-405deg)}100%{transform:rotate(-405deg)}}@keyframes swal2-animate-error-x-mark{0%{margin-top:1.625em;transform:scale(0.4);opacity:0}50%{margin-top:1.625em;transform:scale(0.4);opacity:0}80%{margin-top:-0.375em;transform:scale(1.15)}100%{margin-top:0;transform:scale(1);opacity:1}}@keyframes swal2-animate-error-icon{0%{transform:rotateX(100deg);opacity:0}100%{transform:rotateX(0deg);opacity:1}}@keyframes swal2-rotate-loading{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}@keyframes swal2-animate-question-mark{0%{transform:rotateY(-360deg)}100%{transform:rotateY(0)}}@keyframes swal2-animate-i-mark{0%{transform:rotateZ(45deg);opacity:0}25%{transform:rotateZ(-25deg);opacity:.4}50%{transform:rotateZ(15deg);opacity:.8}75%{transform:rotateZ(-5deg);opacity:1}100%{transform:rotateX(0);opacity:1}}@keyframes swal2-toast-show{0%{transform:translateY(-0.625em) rotateZ(2deg)}33%{transform:translateY(0) rotateZ(-2deg)}66%{transform:translateY(0.3125em) rotateZ(2deg)}100%{transform:translateY(0) rotateZ(0deg)}}@keyframes swal2-toast-hide{100%{transform:rotateZ(1deg);opacity:0}}@keyframes swal2-toast-animate-success-line-tip{0%{top:.5625em;left:.0625em;width:0}54%{top:.125em;left:.125em;width:0}70%{top:.625em;left:-0.25em;width:1.625em}84%{top:1.0625em;left:.75em;width:.5em}100%{top:1.125em;left:.1875em;width:.75em}}@keyframes swal2-toast-animate-success-line-long{0%{top:1.625em;right:1.375em;width:0}65%{top:1.25em;right:.9375em;width:0}84%{top:.9375em;right:0;width:1.125em}100%{top:.9375em;right:.1875em;width:1.375em}}");
	})))());
	function getErrorMessage(error) {
		return error instanceof Error ? error.message : String(error);
	}
	async function showSuccessAlert(title, text) {
		await import_sweetalert2_all.default.fire({
			icon: "success",
			title,
			text,
			confirmButtonText: "OK"
		});
	}
	async function showErrorAlert(title, error) {
		await import_sweetalert2_all.default.fire({
			icon: "error",
			title,
			text: getErrorMessage(error),
			confirmButtonText: "OK"
		});
	}
	var TOOLBOX_FORM_ID = "1216ed4f-1d27-491b-b974-150d847f0c2d";
	var TOOLBOX_FORM_NAME = "Toolbox";
	var TOOLBOX_BUNDLE_PATH = "toolbox/formBundle.js";
	var NO_TOKEN = "";
	function escapeHtml(value) {
		return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
	}
	function hasFormPart(target) {
		return target.type !== "script";
	}
	function scriptsOf(target) {
		return target.type === "form" ? [] : target.scripts;
	}
	function toolParts(target) {
		const parts = hasFormPart(target) ? [{
			kind: "form",
			key: "form"
		}] : [];
		scriptsOf(target).forEach((script, index) => parts.push({
			kind: "script",
			key: `script-${index}`,
			script
		}));
		return parts;
	}
	function describeRollout(target, parts, verb) {
		if (parts.length < toolParts(target).length) return `${parts.map((p) => p.kind === "form" ? "Formular" : `Script "${p.script.name}"`).join(" und ")} von "${target.name}" wurde${parts.length > 1 ? "n" : ""} ${verb}.`;
		const scriptCount = scriptsOf(target).length;
		const labels = [hasFormPart(target) ? "Formular" : "", scriptCount === 1 ? "Script" : scriptCount > 1 ? `${scriptCount} Scripts` : ""].filter((p) => p !== "");
		if (labels.length === 1 && scriptCount <= 1) return `"${target.name}" wurde ${verb}.`;
		return `${labels.join(" und ")} von "${target.name}" wurden ${verb}.`;
	}
	function resolveDefault(spec) {
		return (spec.default ?? "").replace(/\{origin\}/g, window.location.origin);
	}
	function isAutomatic(spec) {
		return (spec.default ?? "").trim() === "{origin}";
	}
	function automaticValues(script) {
		return script.customerVariables.filter(isAutomatic).map((spec) => ({
			key: spec.key,
			value: resolveDefault(spec),
			encrypted: spec.encrypted
		}));
	}
	async function promptCustomerVariables(target, scripts) {
		if (scripts.filter((script) => script.customerVariables.some((spec) => !isAutomatic(spec))).length === 0) return new Map(scripts.map((script) => [script.name, automaticValues(script)]));
		const groups = scripts.map((script, scriptIndex) => {
			const fields = script.customerVariables.map((spec, varIndex) => isAutomatic(spec) ? "" : `
<div class="tbx-cv-field">
  <label class="tbx-cv-label" for="tbx-cv-${scriptIndex}-${varIndex}">${escapeHtml(spec.label)}</label>
  <input id="tbx-cv-${scriptIndex}-${varIndex}" class="swal2-input tbx-cv-input" type="${spec.encrypted ? "password" : "text"}"
    autocomplete="${spec.encrypted ? "new-password" : "off"}" value="${escapeHtml(resolveDefault(spec))}">
  ${spec.description ? `<div class="tbx-cv-desc">${escapeHtml(spec.description)}</div>` : ""}
</div>`).join("");
			if (!fields.trim()) return "";
			return `
<fieldset class="tbx-cv-group">
  <legend class="tbx-cv-legend">Script: ${escapeHtml(script.name)}</legend>
  ${fields}
</fieldset>`;
		}).join("");
		const result = await import_sweetalert2_all.default.fire({
			title: `Konfiguration für "${escapeHtml(target.name)}"`,
			html: `
<style>
  .tbx-cv-intro { text-align: left; color: #6c757d; font-size: 0.9em; margin-bottom: 12px; }
  .tbx-cv-group { text-align: left; border: 1px solid #dee2e6; border-radius: 6px; padding: 8px 12px 0; margin: 0 0 12px; }
  .tbx-cv-legend { font-size: 0.95em; font-weight: 600; width: auto; padding: 0 4px; margin: 0; }
  .tbx-cv-field { margin-bottom: 12px; }
  .tbx-cv-label { display: block; font-weight: 600; font-size: 0.9em; margin-bottom: 4px; }
  .tbx-cv-input.swal2-input { width: 100%; margin: 0; box-sizing: border-box; }
  .tbx-cv-desc { color: #6c757d; font-size: 0.85em; margin-top: 4px; }
</style>
<div class="tbx-cv-intro">Die folgenden Scripts benötigen Werte. Verschlüsselte Werte werden nicht im Klartext gespeichert.</div>
${groups}`,
			focusConfirm: false,
			showCancelButton: true,
			confirmButtonText: "Anlegen",
			cancelButtonText: "Abbrechen",
			preConfirm: () => {
				const values = /* @__PURE__ */ new Map();
				for (const [scriptIndex, script] of scripts.entries()) {
					const scriptValues = [];
					for (const [varIndex, spec] of script.customerVariables.entries()) {
						if (isAutomatic(spec)) {
							scriptValues.push({
								key: spec.key,
								value: resolveDefault(spec),
								encrypted: spec.encrypted
							});
							continue;
						}
						const value = document.getElementById(`tbx-cv-${scriptIndex}-${varIndex}`)?.value.trim() ?? "";
						if (value === "") {
							import_sweetalert2_all.default.showValidationMessage(`Bitte "${spec.label}" für Script "${script.name}" angeben.`);
							return false;
						}
						scriptValues.push({
							key: spec.key,
							value,
							encrypted: spec.encrypted
						});
					}
					values.set(script.name, scriptValues);
				}
				return values;
			}
		});
		return result.isConfirmed ? result.value : void 0;
	}
	async function remoteVersionOf(bundlePath) {
		return await fetchPublishedVersion(publishedFolderOf(bundlePath));
	}
	async function checkFormPart(target) {
		try {
			const [existing, remote] = await Promise.all([getForm(window.location.origin, NO_TOKEN, target.formId), remoteVersionOf(target.bundlePath)]);
			return {
				installed: parseVersionMarker(existing.body.definition.customJs),
				remote
			};
		} catch (error) {
			return { error: getErrorMessage(error) };
		}
	}
	async function checkScriptPart(targetScript, loadScripts) {
		try {
			const baseUri = window.location.origin;
			const [allScripts, remote] = await Promise.all([loadScripts(), remoteVersionOf(targetScript.bundlePath)]);
			const script = allScripts.body.find((s) => s.name === targetScript.name);
			if (!script?.id) return {
				missing: true,
				remote
			};
			return {
				installed: parseVersionMarker((await getScriptVersion(baseUri, NO_TOKEN, script.id)).body[0]?.action?.description?.de),
				remote
			};
		} catch (error) {
			return { error: getErrorMessage(error) };
		}
	}
	function isPartOutdated(status) {
		if (status.error) return false;
		if (status.missing) return true;
		if (status.remote === void 0) return false;
		return status.installed === void 0 || status.remote > status.installed;
	}
	function describePartStatus(status) {
		if (status.error) return {
			text: `Fehler: ${status.error}`,
			css: "tbx-status-error"
		};
		if (status.missing) return {
			text: `fehlt${status.remote !== void 0 ? ` – Version ${status.remote} verfügbar` : ""}`,
			css: "tbx-status-outdated"
		};
		if (status.installed === void 0) return {
			text: `Version unbekannt${status.remote !== void 0 ? ` – Version ${status.remote} verfügbar` : ""}`,
			css: "tbx-status-unknown"
		};
		if (status.remote !== void 0 && status.remote > status.installed) return {
			text: `Version ${status.installed} – Version ${status.remote} verfügbar`,
			css: "tbx-status-outdated"
		};
		return {
			text: `Version ${status.installed} – aktuell`,
			css: "tbx-status-ok"
		};
	}
	async function checkToolboxStatus() {
		try {
			const [existing, remote] = await Promise.all([getForm(window.location.origin, NO_TOKEN, TOOLBOX_FORM_ID), fetchPublishedVersion(publishedFolderOf(TOOLBOX_BUNDLE_PATH))]);
			return remote !== void 0 ? {
				installed: parseVersionMarker(existing.body.definition.customJs),
				remote
			} : { error: "Veröffentlichte Version nicht ermittelbar." };
		} catch (error) {
			getLogger().error(`Fehler beim Prüfen auf eine neue Toolbox-Version: ${getErrorMessage(error)}`);
			return { error: getErrorMessage(error) };
		}
	}
	/**
	* Aktualisiert das Toolbox-Formular selbst: lädt sein eigenes Bundle aus dem
	* öffentlichen Artefakt-Repo und patcht es als customJs auf TOOLBOX_FORM_ID.
	* Legt anschließend per newVersion eine neue dforms-Version an. Liefert die
	* installierte Version ("?" = unbekannt). Das gerade laufende Skript bleibt
	* davon unberührt - der Aufrufer lädt die Seite danach neu.
	*/
	async function installToolboxUpdate() {
		const baseUri = window.location.origin;
		const [bundle, version] = await Promise.all([loadLatestBundle(TOOLBOX_BUNDLE_PATH), fetchPublishedVersion(publishedFolderOf(TOOLBOX_BUNDLE_PATH))]);
		const customJsContent = withVersionMarker(bundle, version);
		const installedVersion = version ?? "?";
		const existing = await getForm(baseUri, NO_TOKEN, TOOLBOX_FORM_ID);
		await patchForm(baseUri, NO_TOKEN, TOOLBOX_FORM_ID, TOOLBOX_FORM_NAME, {
			formioFormDefinition: existing.body.definition.formioFormDefinition,
			customCss: existing.body.definition.customCss,
			dvfDefVersion: "1.0",
			customJs: customJsContent
		});
		await newVersion(baseUri, NO_TOKEN, TOOLBOX_FORM_ID);
		return installedVersion;
	}
	async function loadToolLists() {
		const baseUri = window.location.origin;
		const [allForms, allScripts] = await Promise.all([getAllForms(baseUri, NO_TOKEN), getAllScripts(baseUri, NO_TOKEN)]);
		const partExists = (t, part) => part.kind === "form" ? hasFormPart(t) && allForms.body.forms.some((f) => f.id === t.formId) : allScripts.body.some((s) => s.name === part.script.name);
		const isAlreadyLoaded = (t) => toolParts(t).some((part) => partExists(t, part));
		const available = targetForms.filter((t) => !isAlreadyLoaded(t));
		const loadedTargets = targetForms.filter(isAlreadyLoaded);
		getLogger().debug(`refreshToolLists: verfügbar=[${available.map((t) => t.name).join(", ")}], installiert=[${loadedTargets.map((t) => t.name).join(", ")}]`);
		return {
			available,
			loaded: loadedTargets,
			allScripts
		};
	}
	async function checkToolParts(target, loadScripts) {
		const statuses = await Promise.all(toolParts(target).map(async (part) => [part.key, part.kind === "script" ? await checkScriptPart(part.script, loadScripts) : hasFormPart(target) ? await checkFormPart(target) : { error: "Kein Formular konfiguriert." }]));
		return Object.fromEntries(statuses);
	}
	async function formViewUrl(target) {
		const baseUri = window.location.origin;
		const viewHref = (await getAllForms(baseUri, NO_TOKEN)).body.forms.find((f) => f.id === target.formId)?._links?.view?.href;
		if (!viewHref) throw new Error(`dforms hat für Formular "${target.name}" keinen "view"-Link geliefert.`);
		return new URL(viewHref, baseUri).toString();
	}
	/**
	* Holt zuerst den aktuellen Bundle-Inhalt (customJs) des Ziel-Projekts direkt aus dem
	* öffentlichen Artefakt-Repo (kein Auth nötig, dasselbe Repo, in das
	* .github/workflows/publish-bundles.yml bei jedem Push auf main veröffentlicht).
	* Prüft dann anhand der vollständigen Formular-Liste (GET
	* /processstudio/components/form), ob ein Formular mit target.formId schon
	* existiert, statt per GET auf die einzelne Form-ID zu gehen und einen möglichen
	* 404 ("tag:dforms:form_not_found") abzufangen:
	*  - existiert es: vorhandenes Formio-Schema/CSS bleibt (Editor bleibt führend),
	*    nur customJs wird auf den frisch geladenen Bundle-Inhalt (plus
	*    Versions-Marker, siehe withVersionMarker) aktualisiert.
	*  - existiert es nicht: wird per createForm (POST /processstudio/components/form)
	*    neu angelegt und mit einem minimalen Bootstrap-Schema plus dem Bundle-Inhalt
	*    befüllt.
	*/
	async function ensureTargetFormUpToDate(target) {
		const baseUri = window.location.origin;
		const [bundle, version] = await Promise.all([loadLatestBundle(target.bundlePath), remoteVersionOf(target.bundlePath)]);
		const customJsContent = withVersionMarker(bundle, version);
		const codeOwnedFormDefinition = target.formDefinitionPath ? JSON.parse(await loadLatestBundle(target.formDefinitionPath)) : void 0;
		if ((await getAllForms(baseUri, NO_TOKEN)).body.forms.some((f) => f.id === target.formId)) {
			getLogger().debug(`Formular "${target.name}" existiert bereits, aktualisiere customJs.`);
			const existing = await getForm(baseUri, NO_TOKEN, target.formId);
			const definition = {
				formioFormDefinition: codeOwnedFormDefinition ?? existing.body.definition.formioFormDefinition,
				customCss: existing.body.definition.customCss,
				dvfDefVersion: "1.0",
				customJs: customJsContent
			};
			await patchForm(baseUri, NO_TOKEN, target.formId, target.name, definition);
			return definition;
		}
		getLogger().debug(`Formular "${target.name}" existiert noch nicht, lege es neu an.`);
		await createForm(baseUri, NO_TOKEN, target.formId, target.name);
		const definition = {
			formioFormDefinition: codeOwnedFormDefinition ?? {
				display: "form",
				components: []
			},
			customCss: "",
			dvfDefVersion: "1.0",
			customJs: customJsContent
		};
		await patchForm(baseUri, NO_TOKEN, target.formId, target.name, definition);
		return definition;
	}
	/**
	* Analog zu ensureTargetFormUpToDate, aber für Scripts (Process Studio
	* "Scripting"-Modul statt dforms-Formular). Wichtige Unterschiede zu Formularen:
	*  - Scripts haben keine vom Aufrufer wählbare Id: createScript() vergibt die
	*    GUID serverseitig. Ein bereits angelegtes Script wird deshalb über
	*    getAllScripts() anhand seines (eindeutigen) Namens gefunden.
	*  - customerVariables (z.B. ein API-Key, den das Script für eigene Aufrufe
	*    gegen andere d.velop-APIs braucht) werden AUSSCHLIESSLICH gesetzt, wenn
	*    das Script in genau diesem Aufruf neu angelegt wird und Werte übergeben
	*    wurden (beim Erstellen per Dialog abgefragt, siehe createSelectedTool).
	*    Bei einem bereits existierenden Script - also bei jedem Aktualisieren -
	*    werden sie NIE mitgeschickt: ein versehentliches Überschreiben/Leeren
	*    eines bereits gesetzten, verschlüsselten API-Keys ließe sich nicht
	*    rückgängig machen.
	*  - Die Scripting-API liefert den installierten Content über getScriptVersion
	*    NICHT zurück. Deshalb wird der Versions-Marker (veröffentlichte Version
	*    aus version.json) in "action.description" eingetragen (dieses Feld
	*    liefert getScriptVersion zuverlässig zurück) - checkScriptPart liest ihn
	*    von dort. Ein Umweg über die Release-Historie funktioniert nicht, da
	*    patchScript nicht bei jedem Aufruf eine neue Release anlegt.
	*/
	async function ensureTargetScriptUpToDate(targetScript, customerVariables) {
		const baseUri = window.location.origin;
		const [content, version] = await Promise.all([loadLatestBundle(targetScript.bundlePath), remoteVersionOf(targetScript.bundlePath)]);
		const description = version !== void 0 ? `${targetScript.description} (${versionMarker(version)})` : targetScript.description;
		let script = (await getAllScripts(baseUri, NO_TOKEN)).body.find((s) => s.name === targetScript.name);
		let createdNow = false;
		if (!script) {
			getLogger().debug(`Script "${targetScript.name}" existiert noch nicht, lege es neu an.`);
			script = {
				id: (await createScript(baseUri, NO_TOKEN, targetScript.name)).body.id,
				name: targetScript.name
			};
			createdNow = true;
		} else getLogger().debug(`Script "${targetScript.name}" existiert bereits, aktualisiere Content.`);
		if (!script?.id) throw new Error(`Script "${targetScript.name}" konnte nicht angelegt/gefunden werden (keine Id).`);
		const versionId = (await getScriptVersion(baseUri, NO_TOKEN, script.id)).body[0]?.id;
		if (!versionId) throw new Error(`Für Script "${targetScript.name}" wurde keine Version gefunden.`);
		const body = {
			content,
			actionEnabled: true,
			action: {
				display_name: { de: targetScript.name },
				description: { de: description },
				volatile: true,
				execution_mode: "Synchron",
				input_properties: [],
				output_properties: []
			}
		};
		if (createdNow && customerVariables && customerVariables.length > 0) body.customerVariables = customerVariables;
		await patchScript(baseUri, NO_TOKEN, script.id, versionId, body);
	}
	async function rolloutParts(target, parts) {
		const scripts = parts.flatMap((p) => p.kind === "script" ? [p.script] : []);
		let customerVariables;
		const needsValues = scripts.filter((s) => s.customerVariables.length > 0);
		if (needsValues.length > 0) {
			const existing = await getAllScripts(window.location.origin, NO_TOKEN);
			const newScripts = needsValues.filter((s) => !existing.body.some((e) => e.name === s.name));
			if (newScripts.length > 0) {
				customerVariables = await promptCustomerVariables(target, newScripts);
				if (!customerVariables) return false;
			}
		}
		if (parts.some((p) => p.kind === "form") && hasFormPart(target)) await ensureTargetFormUpToDate(target);
		for (const script of scripts) await ensureTargetScriptUpToDate(script, customerVariables?.get(script.name));
		return true;
	}
	async function loadLatestBundle(bundlePath) {
		return await fetchPublishedFile(bundlePath);
	}
	//#endregion
	//#region src/forms/Toolbox.svelte
	var badges = ($$anchor, target = noop) => {
		const scriptCount = /* @__PURE__ */ user_derived(() => scriptsOf(target()).length);
		var fragment = root_3();
		var node = first_child(fragment);
		var consequent = ($$anchor) => {
			append($$anchor, root());
		};
		if_block(node, ($$render) => {
			if (target().type !== "script") $$render(consequent);
		});
		var node_1 = sibling(node, 2);
		var consequent_1 = ($$anchor) => {
			append($$anchor, root_1());
		};
		if_block(node_1, ($$render) => {
			if (target().type === "combined") $$render(consequent_1);
		});
		var node_2 = sibling(node_1, 2);
		var consequent_2 = ($$anchor) => {
			var span_2 = root_2();
			var text = only_child(span_2, true);
			template_effect(() => set_text(text, get(scriptCount) > 1 ? `${get(scriptCount)} Scripts` : "Script"));
			append($$anchor, span_2);
		};
		if_block(node_2, ($$render) => {
			if (target().type !== "form") $$render(consequent_2);
		});
		append($$anchor, fragment);
	};
	var toolCard = ($$anchor, target = noop, actions = noop, parts = noop, hint = noop) => {
		var div = root_8();
		var div_1 = child(div);
		var div_2 = child(div_1);
		var span_3 = child(div_2);
		var text_1 = only_child(span_3, true);
		var node_3 = sibling(span_3);
		badges(node_3, target);
		var node_4 = sibling(node_3, 2);
		var consequent_3 = ($$anchor) => {
			var div_3 = root_4();
			var text_2 = only_child(div_3, true);
			template_effect(() => set_text(text_2, target().description));
			append($$anchor, div_3);
		};
		if_block(node_4, ($$render) => {
			if (target().description) $$render(consequent_3);
		});
		reset(div_2);
		var node_5 = sibling(div_2, 2);
		var consequent_4 = ($$anchor) => {
			var div_4 = root_5();
			snippet(child(div_4), actions);
			reset(div_4);
			append($$anchor, div_4);
		};
		if_block(node_5, ($$render) => {
			if (actions()) $$render(consequent_4);
		});
		reset(div_1);
		var node_7 = sibling(div_1, 2);
		var consequent_5 = ($$anchor) => {
			var ul = root_6();
			let classes;
			snippet(child(ul), parts);
			reset(ul);
			template_effect(() => classes = set_class(ul, 1, "tbx-parts svelte-elr56e", null, classes, { "tbx-parts-combined": target().type === "combined" }));
			append($$anchor, ul);
		};
		if_block(node_7, ($$render) => {
			if (parts()) $$render(consequent_5);
		});
		var node_9 = sibling(node_7, 2);
		var consequent_6 = ($$anchor) => {
			var div_5 = root_7();
			var text_3 = only_child(div_5, true);
			template_effect(() => set_text(text_3, hint()));
			append($$anchor, div_5);
		};
		if_block(node_9, ($$render) => {
			if (hint()) $$render(consequent_6);
		});
		reset(div);
		template_effect(() => set_text(text_1, target().name));
		append($$anchor, div);
	};
	var root = /* @__PURE__ */ from_html(`<span class="tbx-badge tbx-badge-form svelte-elr56e">Formular</span>`);
	var root_1 = /* @__PURE__ */ from_html(`<span class="tbx-badge-link svelte-elr56e">+</span>`);
	var root_2 = /* @__PURE__ */ from_html(`<span class="tbx-badge tbx-badge-script svelte-elr56e"> </span>`);
	var root_3 = /* @__PURE__ */ from_html(`<!> <!> <!>`, 1);
	var root_4 = /* @__PURE__ */ from_html(`<div class="tbx-tool-desc svelte-elr56e"> </div>`);
	var root_5 = /* @__PURE__ */ from_html(`<div class="tbx-actions svelte-elr56e"><!></div>`);
	var root_6 = /* @__PURE__ */ from_html(`<ul><!></ul>`);
	var root_7 = /* @__PURE__ */ from_html(`<div class="tbx-hint svelte-elr56e"> </div>`);
	var root_8 = /* @__PURE__ */ from_html(`<div class="tbx-tool svelte-elr56e"><div class="tbx-tool-header svelte-elr56e"><div><span class="tbx-tool-name svelte-elr56e"> </span><!> <!></div> <!></div> <!> <!></div>`);
	var root_9 = /* @__PURE__ */ from_html(`<div class="tbx-empty svelte-elr56e">Werkzeuge werden geladen…</div>`);
	var root_10 = /* @__PURE__ */ from_html(`<div class="tbx-empty svelte-elr56e">Alle verfügbaren Werkzeuge sind bereits installiert.</div>`);
	var root_11 = /* @__PURE__ */ from_html(`<option> </option>`);
	var root_12 = /* @__PURE__ */ from_html(`<button type="button" class="btn btn-sm btn-outline-secondary"> </button>`);
	var root_13 = /* @__PURE__ */ from_html(`<li class="svelte-elr56e"><span class="tbx-part-label svelte-elr56e"> </span> <span class="tbx-part-status tbx-status-unknown svelte-elr56e"> </span> <!></li>`);
	var root_14 = /* @__PURE__ */ from_html(`<select class="form-control form-control-sm"></select> <!>`, 1);
	var root_15 = /* @__PURE__ */ from_html(`<div class="tbx-status-error svelte-elr56e"> </div>`);
	var root_16 = /* @__PURE__ */ from_html(`<div class="tbx-empty svelte-elr56e">Noch keine Werkzeuge installiert.</div>`);
	var root_17 = /* @__PURE__ */ from_html(`<button type="button" class="btn btn-sm btn-outline-secondary">Öffnen</button>`);
	var root_18 = /* @__PURE__ */ from_html(`<!> <button type="button" class="btn btn-sm btn-primary"> </button>`, 1);
	var root_19 = /* @__PURE__ */ from_html(`<li class="svelte-elr56e"><span class="tbx-part-label svelte-elr56e"> </span> <span> </span> <!></li>`);
	var root_20 = /* @__PURE__ */ from_html(`<div class="tbx-root svelte-elr56e"><div class="tbx-section svelte-elr56e"><div class="tbx-section-header svelte-elr56e"><span class="tbx-section-title svelte-elr56e">Toolbox</span> <div class="tbx-actions svelte-elr56e"><button type="button" class="btn btn-sm btn-primary"> </button></div></div> <div class="tbx-section-body svelte-elr56e"><ul class="tbx-parts svelte-elr56e"><li class="svelte-elr56e"><span class="tbx-part-label svelte-elr56e">Formular</span><span> </span></li></ul></div></div> <div class="tbx-section svelte-elr56e"><div class="tbx-section-header svelte-elr56e"><span class="tbx-section-title svelte-elr56e">Werkzeug hinzufügen</span> <div class="tbx-actions svelte-elr56e"><button type="button" class="btn btn-sm btn-primary"> </button></div></div> <div class="tbx-section-body svelte-elr56e"><!></div></div> <div class="tbx-section svelte-elr56e"><div class="tbx-section-header svelte-elr56e"><span class="tbx-section-title svelte-elr56e">Installierte Werkzeuge</span> <div class="tbx-actions svelte-elr56e"></div></div> <div class="tbx-section-body svelte-elr56e"><!></div></div></div>`);
	var $$css = {
		hash: "svelte-elr56e",
		code: ".tbx-root.svelte-elr56e {display:flex;flex-direction:column;gap:16px;}.tbx-section.svelte-elr56e {border:1px solid #dee2e6;border-radius:6px;background:#fff;}.tbx-section-header.svelte-elr56e {display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap;padding:8px 12px;border-bottom:1px solid #dee2e6;background:#f8f9fa;border-radius:6px 6px 0 0;}.tbx-section-title.svelte-elr56e {font-weight:600;font-size:1.05em;}.tbx-section-body.svelte-elr56e {padding:12px;display:flex;flex-direction:column;gap:10px;}.tbx-actions.svelte-elr56e {display:flex;gap:6px;flex-shrink:0;}.tbx-empty.svelte-elr56e {color:#6c757d;font-style:italic;}.tbx-tool.svelte-elr56e {border:1px solid #dee2e6;border-radius:6px;padding:10px 12px;background:#fff;}.tbx-tool-header.svelte-elr56e {display:flex;justify-content:space-between;align-items:flex-start;gap:12px;flex-wrap:wrap;}.tbx-tool-name.svelte-elr56e {font-weight:600;font-size:1.05em;}.tbx-tool-desc.svelte-elr56e {color:#6c757d;font-size:0.9em;margin-top:4px;}.tbx-badge.svelte-elr56e {display:inline-block;font-size:0.75em;font-weight:600;padding:2px 7px;border-radius:10px;margin-left:6px;vertical-align:middle;}.tbx-badge-form.svelte-elr56e {background:#e7f1ff;color:#0b5ed7;}.tbx-badge-script.svelte-elr56e {background:#fff3cd;color:#997404;}.tbx-badge-link.svelte-elr56e {color:#6c757d;font-size:0.8em;margin-left:4px;vertical-align:middle;}.tbx-parts.svelte-elr56e {list-style:none;margin:8px 0 0;padding:0;font-size:0.9em;}.tbx-section-body.svelte-elr56e > .tbx-parts:where(.svelte-elr56e) {margin-top:0;}.tbx-parts.svelte-elr56e li:where(.svelte-elr56e) {padding:3px 0;display:flex;align-items:center;gap:8px;flex-wrap:wrap;}.tbx-parts-combined.svelte-elr56e {border-left:3px solid #adb5bd;padding-left:10px;}.tbx-part-label.svelte-elr56e {display:inline-block;min-width:80px;font-weight:600;}.tbx-part-status.svelte-elr56e {flex:1 1 auto;}.tbx-hint.svelte-elr56e {color:#6c757d;font-size:0.85em;margin-top:6px;}.tbx-status-ok.svelte-elr56e {color:#198754;}.tbx-status-outdated.svelte-elr56e {color:#b35c00;}.tbx-status-unknown.svelte-elr56e {color:#6c757d;}.tbx-status-error.svelte-elr56e {color:#dc3545;}"
	};
	function Toolbox($$anchor, $$props) {
		push($$props, true);
		append_styles($$anchor, $$css);
		let state = prop($$props, "state", 7);
		const CHECKING_LABEL = "Prüfe…";
		function partLabel(target, part) {
			if (part.kind === "form") return "Formular";
			return `${target.type === "combined" ? "↳ " : ""}Script${scriptsOf(target).length > 1 || part.script.name !== target.name ? `: ${part.script.name}` : ""}`;
		}
		function hasSeveralParts(target) {
			return toolParts(target).length > 1;
		}
		function statusLine(status) {
			return status ? describePartStatus(status) : {
				text: "wird geprüft…",
				css: "tbx-status-unknown"
			};
		}
		function updateButton(statuses) {
			if (statuses.some((s) => !s)) return {
				label: CHECKING_LABEL,
				disabled: true
			};
			const known = statuses;
			if (!known.some((s) => s.error || isPartOutdated(s))) return {
				label: "Aktuell",
				disabled: true
			};
			if (known.length > 1) return {
				label: "Alle aktualisieren",
				disabled: false
			};
			if (known[0]?.missing) return {
				label: "Anlegen",
				disabled: false
			};
			const remote = known[0]?.remote;
			return {
				label: remote !== void 0 ? `Aktualisieren (Version ${remote})` : "Aktualisieren",
				disabled: false
			};
		}
		function partButton(status) {
			if (!status) return {
				label: CHECKING_LABEL,
				disabled: true
			};
			if (!(Boolean(status.error) || isPartOutdated(status))) return {
				label: "Aktuell",
				disabled: true
			};
			if (status.missing) return {
				label: "Anlegen",
				disabled: false
			};
			return {
				label: status.remote !== void 0 && !status.error ? `Aktualisieren (Version ${status.remote})` : "Aktualisieren",
				disabled: false
			};
		}
		function locked(section) {
			return state().busy?.section === section;
		}
		function busyLabel(buttonId, label) {
			return state().busy?.buttonId === buttonId ? state().busy.label : label;
		}
		const toolboxButton = /* @__PURE__ */ user_derived(() => updateButton([state().toolboxStatus]));
		const toolboxLine = /* @__PURE__ */ user_derived(() => statusLine(state().toolboxStatus));
		var div_6 = root_20();
		var div_7 = child(div_6);
		var div_8 = child(div_7);
		var div_9 = sibling(child(div_8), 2);
		var button_1 = child(div_9);
		var text_4 = only_child(button_1, true);
		reset(div_9);
		reset(div_8);
		var div_10 = sibling(div_8, 2);
		var ul_1 = child(div_10);
		var li = child(ul_1);
		var span_4 = sibling(child(li));
		var text_5 = only_child(span_4, true);
		reset(li);
		reset(ul_1);
		reset(div_10);
		reset(div_7);
		var div_11 = sibling(div_7, 2);
		var div_12 = child(div_11);
		var div_13 = sibling(child(div_12), 2);
		var button_2 = child(div_13);
		var text_6 = only_child(button_2, true);
		reset(div_13);
		reset(div_12);
		var div_14 = sibling(div_12, 2);
		var node_10 = child(div_14);
		var consequent_7 = ($$anchor) => {
			append($$anchor, root_9());
		};
		var consequent_8 = ($$anchor) => {
			append($$anchor, root_10());
		};
		var alternate = ($$anchor) => {
			var fragment_1 = root_14();
			var select = first_child(fragment_1);
			each(select, 21, () => state().available, (target) => target.id, ($$anchor, target) => {
				var option = root_11();
				var text_7 = only_child(option, true);
				var option_value = {};
				template_effect(() => {
					set_text(text_7, get(target).name);
					if (option_value !== (option_value = get(target).id)) option.value = (option.__value = option_value) ?? "";
				});
				append($$anchor, option);
			});
			reset(select);
			init_select(select);
			var node_11 = sibling(select, 2);
			var consequent_10 = ($$anchor) => {
				const previewParts = ($$anchor) => {
					var fragment_2 = comment();
					each(first_child(fragment_2), 17, () => toolParts(get(target)), (part) => part.key, ($$anchor, part) => {
						const specs = /* @__PURE__ */ user_derived(() => get(part).kind === "script" ? get(part).script.customerVariables : []);
						var li_1 = root_13();
						var span_5 = child(li_1);
						var text_8 = only_child(span_5, true);
						var span_6 = sibling(span_5, 2);
						var text_9 = only_child(span_6, true);
						var node_13 = sibling(span_6, 2);
						var consequent_9 = ($$anchor) => {
							var button_3 = root_12();
							var text_10 = only_child(button_3, true);
							template_effect(($0, $1) => {
								button_3.disabled = $0;
								set_text(text_10, $1);
							}, [() => locked("available"), () => busyLabel(`${get(target).id}:${get(part).key}`, "Anlegen")]);
							delegated("click", button_3, () => state().rollout("available", `${get(target).id}:${get(part).key}`, get(target), [get(part)], "angelegt"));
							append($$anchor, button_3);
						};
						if_block(node_13, ($$render) => {
							if (get(several)) $$render(consequent_9);
						});
						reset(li_1);
						template_effect(($0, $1) => {
							set_text(text_8, $0);
							set_text(text_9, $1);
						}, [() => partLabel(get(target), get(part)), () => get(specs).length > 0 ? `fragt beim Anlegen ab: ${get(specs).map((s) => s.label).join(", ")}` : "keine Eingaben nötig"]);
						append($$anchor, li_1);
					});
					append($$anchor, fragment_2);
				};
				const target = /* @__PURE__ */ user_derived(() => state().selected);
				const several = /* @__PURE__ */ user_derived(() => hasSeveralParts(get(target)));
				toolCard($$anchor, () => get(target), () => void 0, () => get(target).type === "form" ? void 0 : previewParts, () => get(several) ? "„Erstellen“ legt alle Bestandteile an, einzelne lassen sich über „Anlegen“ separat anlegen." : "");
			};
			if_block(node_11, ($$render) => {
				if (state().selected) $$render(consequent_10);
			});
			template_effect(($0) => select.disabled = $0, [() => locked("available")]);
			bind_select_value(select, () => state().selectedId, ($$value) => state().selectedId = $$value);
			append($$anchor, fragment_1);
		};
		if_block(node_10, ($$render) => {
			if (!state().available) $$render(consequent_7);
			else if (state().available.length === 0) $$render(consequent_8, 1);
			else $$render(alternate, -1);
		});
		reset(div_14);
		reset(div_11);
		var div_17 = sibling(div_11, 2);
		var div_18 = sibling(child(div_17), 2);
		var node_14 = child(div_18);
		var consequent_11 = ($$anchor) => {
			append($$anchor, root_9());
		};
		var consequent_12 = ($$anchor) => {
			var div_20 = root_15();
			var text_11 = only_child(div_20);
			template_effect(() => set_text(text_11, `Installierte Werkzeuge konnten nicht ermittelt werden: ${state().listsError ?? ""}`));
			append($$anchor, div_20);
		};
		var consequent_13 = ($$anchor) => {
			append($$anchor, root_16());
		};
		var alternate_1 = ($$anchor) => {
			var fragment_4 = comment();
			each(first_child(fragment_4), 17, () => state().loaded, (target) => target.id, ($$anchor, target) => {
				const cardActions = ($$anchor) => {
					const button = /* @__PURE__ */ user_derived(() => updateButton(get(parts).map((part) => get(statuses)?.[part.key])));
					var fragment_5 = root_18();
					var node_16 = first_child(fragment_5);
					var consequent_14 = ($$anchor) => {
						var button_4 = root_17();
						template_effect(($0) => button_4.disabled = $0, [() => locked("loaded") || state().opening[get(target).id]]);
						delegated("click", button_4, () => state().open(get(target)));
						append($$anchor, button_4);
					};
					var d = /* @__PURE__ */ user_derived(() => hasFormPart(get(target)));
					if_block(node_16, ($$render) => {
						if (get(d)) $$render(consequent_14);
					});
					var button_5 = sibling(node_16, 2);
					var text_12 = only_child(button_5, true);
					template_effect(($0, $1) => {
						button_5.disabled = $0;
						set_text(text_12, $1);
					}, [() => get(button).disabled || locked("loaded"), () => busyLabel(get(target).id, get(button).label)]);
					delegated("click", button_5, () => state().rollout("loaded", get(target).id, get(target), get(parts), "aktualisiert"));
					append($$anchor, fragment_5);
				};
				const cardParts = ($$anchor) => {
					var fragment_6 = comment();
					each(first_child(fragment_6), 17, () => get(parts), (part) => part.key, ($$anchor, part) => {
						const status = /* @__PURE__ */ user_derived(() => get(statuses)?.[get(part).key]);
						const line = /* @__PURE__ */ user_derived(() => statusLine(get(status)));
						const button = /* @__PURE__ */ user_derived(() => partButton(get(status)));
						var li_2 = root_19();
						var span_7 = child(li_2);
						var text_13 = only_child(span_7, true);
						var span_8 = sibling(span_7, 2);
						var text_14 = only_child(span_8, true);
						var node_18 = sibling(span_8, 2);
						var consequent_15 = ($$anchor) => {
							var button_6 = root_12();
							var text_15 = only_child(button_6, true);
							template_effect(($0, $1) => {
								button_6.disabled = $0;
								set_text(text_15, $1);
							}, [() => get(button).disabled || locked("loaded"), () => busyLabel(`${get(target).id}:${get(part).key}`, get(button).label)]);
							delegated("click", button_6, () => state().rollout("loaded", `${get(target).id}:${get(part).key}`, get(target), [get(part)], get(status)?.missing ? "angelegt" : "aktualisiert"));
							append($$anchor, button_6);
						};
						if_block(node_18, ($$render) => {
							if (get(several)) $$render(consequent_15);
						});
						reset(li_2);
						template_effect(($0) => {
							set_text(text_13, $0);
							set_class(span_8, 1, `tbx-part-status ${get(line).css ?? ""}`, "svelte-elr56e");
							set_text(text_14, get(line).text);
						}, [() => partLabel(get(target), get(part))]);
						append($$anchor, li_2);
					});
					append($$anchor, fragment_6);
				};
				const statuses = /* @__PURE__ */ user_derived(() => state().partStatuses[get(target).id]);
				const parts = /* @__PURE__ */ user_derived(() => toolParts(get(target)));
				const several = /* @__PURE__ */ user_derived(() => hasSeveralParts(get(target)));
				toolCard($$anchor, () => get(target), () => cardActions, () => cardParts, () => "");
			});
			append($$anchor, fragment_4);
		};
		if_block(node_14, ($$render) => {
			if (!state().loaded) $$render(consequent_11);
			else if (state().listsError) $$render(consequent_12, 1);
			else if (state().loaded.length === 0) $$render(consequent_13, 2);
			else $$render(alternate_1, -1);
		});
		reset(div_18);
		reset(div_17);
		reset(div_6);
		template_effect(($0, $1, $2, $3) => {
			button_1.disabled = $0;
			set_text(text_4, $1);
			set_class(span_4, 1, `tbx-part-status ${get(toolboxLine).css ?? ""}`, "svelte-elr56e");
			set_text(text_5, get(toolboxLine).text);
			button_2.disabled = $2;
			set_text(text_6, $3);
		}, [
			() => get(toolboxButton).disabled || locked("toolbox"),
			() => busyLabel("update-toolbox", get(toolboxButton).label),
			() => !state().available?.length || locked("available"),
			() => busyLabel("create", "Erstellen")
		]);
		delegated("click", button_1, () => state().updateToolbox());
		delegated("click", button_2, () => state().createSelected());
		append($$anchor, div_6);
		pop();
	}
	delegate(["click"]);
	//#endregion
	//#region src/forms/toolboxState.svelte.ts
	var ToolboxState = class {
		#toolboxStatus;
		get toolboxStatus() {
			return get(this.#toolboxStatus);
		}
		set toolboxStatus(value) {
			set(this.#toolboxStatus, value, true);
		}
		#available;
		get available() {
			return get(this.#available);
		}
		set available(value) {
			set(this.#available, value, true);
		}
		#loaded;
		get loaded() {
			return get(this.#loaded);
		}
		set loaded(value) {
			set(this.#loaded, value, true);
		}
		#listsError;
		get listsError() {
			return get(this.#listsError);
		}
		set listsError(value) {
			set(this.#listsError, value, true);
		}
		#selectedId;
		get selectedId() {
			return get(this.#selectedId);
		}
		set selectedId(value) {
			set(this.#selectedId, value, true);
		}
		#partStatuses;
		get partStatuses() {
			return get(this.#partStatuses);
		}
		set partStatuses(value) {
			set(this.#partStatuses, value, true);
		}
		#busy;
		get busy() {
			return get(this.#busy);
		}
		set busy(value) {
			set(this.#busy, value, true);
		}
		#opening;
		get opening() {
			return get(this.#opening);
		}
		set opening(value) {
			set(this.#opening, value, true);
		}
		#selected;
		get selected() {
			return get(this.#selected);
		}
		set selected(value) {
			set(this.#selected, value);
		}
		constructor() {
			this.#toolboxStatus = /* @__PURE__ */ state();
			this.#available = /* @__PURE__ */ state();
			this.#loaded = /* @__PURE__ */ state();
			this.#listsError = /* @__PURE__ */ state("");
			this.#selectedId = /* @__PURE__ */ state("");
			this.#partStatuses = /* @__PURE__ */ state(proxy({}));
			this.#busy = /* @__PURE__ */ state();
			this.#opening = /* @__PURE__ */ state(proxy({}));
			this.#selected = /* @__PURE__ */ user_derived(() => this.available?.find((t) => t.id === this.selectedId));
		}
		init() {
			this.checkToolbox();
			this.refreshLists();
		}
		async checkToolbox() {
			this.toolboxStatus = await checkToolboxStatus();
		}
		/**
		* Teilt die Werkzeuge auf "Werkzeug hinzufügen" und "Installierte Werkzeuge"
		* auf und prüft deren Versionsstände. Nach jedem Anlegen/Aktualisieren
		* erneut aufgerufen, damit ein frisch angelegtes Werkzeug direkt in die
		* Liste wandert.
		*/
		async refreshLists() {
			try {
				const { available, loaded, allScripts } = await loadToolLists();
				this.available = available;
				this.selectedId = available[0]?.id ?? "";
				this.loaded = loaded;
				this.listsError = "";
				this.partStatuses = {};
				await Promise.all(loaded.map(async (target) => {
					this.partStatuses[target.id] = await checkToolParts(target, () => Promise.resolve(allScripts));
				}));
			} catch (error) {
				getLogger().error(`Fehler beim Ermitteln bereits angelegter Werkzeuge: ${getErrorMessage(error)}`);
				this.available = [...targetForms];
				this.selectedId = targetForms[0]?.id ?? "";
				this.loaded = [];
				this.listsError = getErrorMessage(error);
			}
		}
		/**
		* Aktualisiert das Toolbox-Formular selbst. Das gerade laufende Skript im
		* Browser-Speicher bleibt davon unberührt - deshalb wird die Seite nach
		* erfolgreichem Patch automatisch neu geladen.
		*/
		async updateToolbox() {
			this.busy = {
				section: "toolbox",
				buttonId: "update-toolbox",
				label: "Aktualisiere…"
			};
			try {
				const version = await installToolboxUpdate();
				getLogger().info(`Toolbox-Formular aktualisiert (Version ${version}). Seite wird neu geladen.`);
				await showSuccessAlert("Toolbox aktualisiert", `Version ${version} wurde erstellt. Die Seite wird jetzt neu geladen, damit die neue Version greift.`);
				window.location.reload();
			} catch (error) {
				getLogger().error(`Fehler beim Aktualisieren des Toolbox-Formulars: ${getErrorMessage(error)}`);
				await showErrorAlert("Fehler beim Aktualisieren der Toolbox", error);
				this.busy = void 0;
			}
		}
		/** "Erstellen": legt ALLE Bestandteile des gewählten Werkzeugs an. */
		async createSelected() {
			const target = this.selected;
			if (!target) {
				await showErrorAlert("Werkzeug konnte nicht angelegt werden", "Bitte zuerst ein Werkzeug auswählen.");
				return;
			}
			await this.rollout("available", "create", target, toolParts(target), "angelegt");
		}
		/**
		* Gemeinsamer Ablauf für alle Buttons, die etwas anlegen oder aktualisieren -
		* ob ein einzelner Bestandteil, mehrere oder das ganze Werkzeug. Sperrt
		* währenddessen alle Buttons des Bereichs (keine parallelen Vorgänge) und
		* baut danach die Werkzeuglisten neu auf - im Erfolgs- wie im Fehler- oder
		* Abbruchfall.
		*/
		async rollout(section, buttonId, target, parts, verb) {
			this.busy = {
				section,
				buttonId,
				label: verb === "angelegt" ? "Lege an…" : "Aktualisiere…"
			};
			try {
				const completed = await rolloutParts(target, parts);
				await this.refreshLists();
				this.busy = void 0;
				if (completed) await showSuccessAlert(verb === "angelegt" ? "Angelegt" : "Aktualisiert", describeRollout(target, parts, verb));
			} catch (error) {
				const action = verb === "angelegt" ? "Anlegen" : "Aktualisieren";
				getLogger().error(`Fehler beim ${action} von "${target.name}": ${getErrorMessage(error)}`);
				await this.refreshLists();
				this.busy = void 0;
				await showErrorAlert(`Fehler beim ${action} von "${target.name}"`, error);
			}
		}
		async open(target) {
			if (!hasFormPart(target)) return;
			this.opening[target.id] = true;
			try {
				window.open(await formViewUrl(target), "_blank", "noopener,noreferrer");
			} catch (error) {
				getLogger().error(`Fehler beim Öffnen von "${target.name}": ${getErrorMessage(error)}`);
				await showErrorAlert(`Fehler beim Öffnen von "${target.name}"`, error);
			} finally {
				this.opening[target.id] = false;
			}
		}
	};
	//#endregion
	//#region src/forms/form.ts
	var logger = initLogger(LogLevel.DEBUG, true);
	function onInitialization(form, instance, data) {
		logger.debug("Toolbox initialisiert.");
		const webform = instance.root;
		const state = new ToolboxState();
		mountInForm(webform, Toolbox, { state }, "content");
		state.init();
		document.addEventListener("keydown", function(event) {
			if (event.ctrlKey && event.key === "F1") {
				console.log("form");
				console.dir(form);
				console.log("instance");
				console.dir(instance);
				console.log("data");
				console.dir(data);
			}
		});
	}
	window.onInitialization = onInitialization;
	//#endregion
})();

//# sourceMappingURL=formBundle.js.map