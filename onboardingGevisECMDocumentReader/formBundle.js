(function() {
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
	var get_descriptors = Object.getOwnPropertyDescriptors;
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
	var LOADING_ATTR_SYMBOL = Symbol("");
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
	var IS_XHTML = !!globalThis.document?.contentType && /* @__PURE__ */ globalThis.document.contentType.includes("xml");
	//#endregion
	//#region node_modules/svelte/src/constants.js
	var HYDRATION_ERROR = {};
	var UNINITIALIZED = Symbol("uninitialized");
	var NAMESPACE_HTML = "http://www.w3.org/1999/xhtml";
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
	/**
	* `%name%(...)` can only be used during component initialisation
	* @param {string} name
	* @returns {never}
	*/
	function lifecycle_outside_component(name) {
		throw new Error(`https://svelte.dev/e/lifecycle_outside_component`);
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
	* `%rune%` cannot be used inside an effect cleanup function
	* @param {string} rune
	* @returns {never}
	*/
	function effect_in_teardown(rune) {
		throw new Error(`https://svelte.dev/e/effect_in_teardown`);
	}
	/**
	* Effect cannot be created inside a `$derived` value that was not itself created inside an effect
	* @returns {never}
	*/
	function effect_in_unowned_derived() {
		throw new Error(`https://svelte.dev/e/effect_in_unowned_derived`);
	}
	/**
	* `%rune%` can only be used inside an effect (e.g. during component initialisation)
	* @param {string} rune
	* @returns {never}
	*/
	function effect_orphan(rune) {
		throw new Error(`https://svelte.dev/e/effect_orphan`);
	}
	/**
	* Maximum update depth exceeded. This typically indicates that an effect reads and writes the same piece of state
	* @returns {never}
	*/
	function effect_update_depth_exceeded() {
		throw new Error(`https://svelte.dev/e/effect_update_depth_exceeded`);
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
	/**
	* Synchronously run any queued tasks.
	*/
	function flush_tasks() {
		while (micro_tasks.length > 0) run_micro_tasks();
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
				if (current_batch !== null && !current_batch.is_fork) current_batch.flush();
				result = fn();
			}
			while (true) {
				flush_tasks();
				if (current_batch === null) return result;
				current_batch.flush();
			}
		} finally {
			is_flushing_sync = was_flushing_sync;
		}
	}
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
	* @param {'$effect' | '$effect.pre' | '$inspect'} rune
	*/
	function validate_effect(rune) {
		if (active_effect === null) {
			if (active_reaction === null) effect_orphan(rune);
			effect_in_unowned_derived();
		}
		if (is_destroying_effect) effect_in_teardown(rune);
	}
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
	* Internal representation of `$effect(...)`
	* @param {() => void | (() => void)} fn
	*/
	function user_effect(fn) {
		validate_effect("$effect");
		var flags = active_effect.f;
		if (!active_reaction && (flags & 32) !== 0 && component_context !== null && !component_context.i) {
			var context = component_context;
			(context.e ??= []).push(fn);
		} else return create_user_effect(fn);
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
	* Returns a promise that resolves once any pending state changes have been applied.
	* @returns {Promise<void>}
	*/
	async function tick() {
		if (async_mode_flag) return new Promise((f) => {
			requestAnimationFrame(() => f());
			setTimeout(() => f());
		});
		await Promise.resolve();
		flushSync();
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
	//#region node_modules/svelte/src/internal/client/dom/elements/attributes.js
	/** @import { Blocker, Effect } from '#client' */
	var IS_CUSTOM_ELEMENT = Symbol("is custom element");
	var IS_HTML = Symbol("is html");
	var LINK_TAG = IS_XHTML ? "link" : "LINK";
	var PROGRESS_TAG = IS_XHTML ? "progress" : "PROGRESS";
	/**
	* The value/checked attribute in the template actually corresponds to the defaultValue property, so we need
	* to remove it upon hydration to avoid a bug when someone resets the form value.
	* @param {HTMLInputElement} input
	* @returns {void}
	*/
	function remove_input_defaults(input) {
		if (!hydrating) return;
		var already_removed = false;
		var remove_defaults = () => {
			if (already_removed) return;
			already_removed = true;
			if (input.hasAttribute("value")) {
				var value = input.value;
				set_attribute(input, "value", null);
				input.value = value;
			}
			if (input.hasAttribute("checked")) {
				var checked = input.checked;
				set_attribute(input, "checked", null);
				input.checked = checked;
			}
		};
		/** @type {any} */ input[FORM_RESET_HANDLER] = remove_defaults;
		queue_micro_task(remove_defaults);
		add_form_reset_listener();
	}
	/**
	* @param {Element} element
	* @param {any} value
	*/
	function set_value(element, value) {
		var attributes = get_attributes(element);
		if (attributes.value === (attributes.value = value ?? void 0) || element.value === value && (value !== 0 || element.nodeName !== PROGRESS_TAG)) return;
		element.value = value ?? "";
	}
	/**
	* @param {Element} element
	* @param {boolean} checked
	*/
	function set_checked(element, checked) {
		var attributes = get_attributes(element);
		if (attributes.checked === (attributes.checked = checked ?? void 0)) return;
		element.checked = checked;
	}
	/**
	* @param {Element} element
	* @param {string} attribute
	* @param {string | null} value
	* @param {boolean} [skip_warning]
	*/
	function set_attribute(element, attribute, value, skip_warning) {
		var attributes = get_attributes(element);
		if (hydrating) {
			attributes[attribute] = element.getAttribute(attribute);
			if (attribute === "src" || attribute === "srcset" || attribute === "href" && element.nodeName === LINK_TAG) {
				if (!skip_warning);
				return;
			}
		}
		if (attributes[attribute] === (attributes[attribute] = value)) return;
		if (attribute === "loading") element[LOADING_ATTR_SYMBOL] = value;
		if (value == null) element.removeAttribute(attribute);
		else if (typeof value !== "string" && get_setters(element).has(attribute)) element[attribute] = value;
		else element.setAttribute(attribute, value);
	}
	/**
	*
	* @param {Element} element
	*/
	function get_attributes(element) {
		return element[ATTRIBUTES_CACHE] ??= {
			[IS_CUSTOM_ELEMENT]: element.nodeName.includes("-"),
			[IS_HTML]: element.namespaceURI === NAMESPACE_HTML
		};
	}
	/** @type {Map<string, Set<string>>} */
	var setters_cache = /* @__PURE__ */ new Map();
	/** @param {Element} element */
	function get_setters(element) {
		var cache_key = element.getAttribute("is") || element.nodeName;
		var setters = setters_cache.get(cache_key);
		if (setters) return setters;
		setters_cache.set(cache_key, setters = /* @__PURE__ */ new Set());
		var descriptors;
		var proto = element;
		var element_proto = Element.prototype;
		while (element_proto !== proto) {
			descriptors = get_descriptors(proto);
			for (var key in descriptors) if (descriptors[key].set && key !== "innerHTML" && key !== "textContent" && key !== "innerText") setters.add(key);
			proto = get_prototype_of(proto);
		}
		return setters;
	}
	//#endregion
	//#region node_modules/svelte/src/internal/client/dom/elements/bindings/input.js
	/** @import { Batch } from '../../../reactivity/batch.js' */
	/**
	* @param {HTMLInputElement} input
	* @param {() => unknown} get
	* @param {(value: unknown) => void} set
	* @returns {void}
	*/
	function bind_value(input, get, set = get) {
		var batches = /* @__PURE__ */ new WeakSet();
		listen_to_event_and_reset_event(input, "input", async (is_reset) => {
			/** @type {any} */
			var value = is_reset ? input.defaultValue : input.value;
			value = is_numberlike_input(input) ? to_number(value) : value;
			set(value);
			if (current_batch !== null) batches.add(current_batch);
			await tick();
			if (value !== (value = get())) {
				var start = input.selectionStart;
				var end = input.selectionEnd;
				var length = input.value.length;
				input.value = value ?? "";
				if (end !== null) {
					var new_length = input.value.length;
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
		if (hydrating && input.defaultValue !== input.value || untrack(get) == null && input.value) {
			set(is_numberlike_input(input) ? to_number(input.value) : input.value);
			if (current_batch !== null) batches.add(current_batch);
		}
		render_effect(() => {
			var value = get();
			if (input === document.activeElement) {
				var batch = async_mode_flag ? previous_batch : current_batch;
				if (batches.has(batch)) return;
			}
			if (is_numberlike_input(input) && value === to_number(input.value)) return;
			if (input.type === "date" && !value && !input.value) return;
			if (value !== input.value) input.value = value ?? "";
		});
	}
	/** @type {Set<HTMLInputElement[]>} */
	var pending = /* @__PURE__ */ new Set();
	/**
	* @param {HTMLInputElement[]} inputs
	* @param {null | [number]} group_index
	* @param {HTMLInputElement} input
	* @param {() => unknown} get
	* @param {(value: unknown) => void} set
	* @returns {void}
	*/
	function bind_group(inputs, group_index, input, get, set = get) {
		var is_checkbox = input.getAttribute("type") === "checkbox";
		var binding_group = inputs;
		let hydration_mismatch = false;
		if (group_index !== null) for (var index of group_index) binding_group = binding_group[index] ??= [];
		binding_group.push(input);
		listen_to_event_and_reset_event(input, "change", () => {
			var value = input.__value;
			if (is_checkbox) value = get_binding_group_value(binding_group, value, input.checked);
			set(value);
		}, () => set(is_checkbox ? [] : null));
		render_effect(() => {
			var value = get();
			if (hydrating && input.defaultChecked !== input.checked) {
				hydration_mismatch = true;
				return;
			}
			if (is_checkbox) {
				value = value || [];
				input.checked = value.includes(input.__value);
			} else input.checked = is(input.__value, value);
		});
		teardown(() => {
			var index = binding_group.indexOf(input);
			if (index !== -1) binding_group.splice(index, 1);
		});
		if (!pending.has(binding_group)) {
			pending.add(binding_group);
			queue_micro_task(() => {
				binding_group.sort((a, b) => a.compareDocumentPosition(b) === 4 ? -1 : 1);
				pending.delete(binding_group);
			});
		}
		queue_micro_task(() => {
			if (hydration_mismatch) {
				var value;
				if (is_checkbox) value = get_binding_group_value(binding_group, value, input.checked);
				else value = binding_group.find((input) => input.checked)?.__value;
				set(value);
			}
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
		var value = /* @__PURE__ */ new Set();
		for (var i = 0; i < group.length; i += 1) if (group[i].checked) value.add(group[i].__value);
		if (!checked) value.delete(__value);
		return Array.from(value);
	}
	/**
	* @param {HTMLInputElement} input
	*/
	function is_numberlike_input(input) {
		var type = input.type;
		return type === "number" || type === "range";
	}
	/**
	* @param {string} value
	*/
	function to_number(value) {
		return value === "" ? null : +value;
	}
	//#endregion
	//#region node_modules/svelte/src/internal/client/dom/elements/bindings/this.js
	/** @import { ComponentContext, Effect } from '#client' */
	/**
	* @param {any} bound_value
	* @param {Element} element_or_component
	* @returns {boolean}
	*/
	function is_bound_this(bound_value, element_or_component) {
		return bound_value === element_or_component || bound_value?.[STATE_SYMBOL] === element_or_component;
	}
	/**
	* @param {any} element_or_component
	* @param {(value: unknown, ...parts: unknown[]) => void} update
	* @param {(...parts: unknown[]) => unknown} get_value
	* @param {() => unknown[]} [get_parts] Set if the this binding is used inside an each block,
	* 										returns all the parts of the each block context that are used in the expression
	* @returns {void}
	*/
	function bind_this(element_or_component = mark_as_component(), update, get_value, get_parts) {
		var component_effect = component_context.r;
		var parent = active_effect;
		effect(() => {
			/** @type {unknown[]} */
			var old_parts;
			/** @type {unknown[]} */
			var parts;
			render_effect(() => {
				old_parts = parts;
				parts = get_parts?.() || [];
				untrack(() => {
					if (!is_bound_this(get_value(...parts), element_or_component)) {
						update(element_or_component, ...parts);
						if (old_parts && is_bound_this(get_value(...old_parts), element_or_component)) update(null, ...old_parts);
					}
				});
			});
			return () => {
				let p = parent;
				while (p !== component_effect && p.parent !== null && p.parent.f & 33554432) p = p.parent;
				const teardown = () => {
					if (parts && is_bound_this(get_value(...parts), element_or_component)) update(null, ...parts);
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
	if (typeof HTMLElement === "function");
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
		if (component_context === null) lifecycle_outside_component("onMount");
		if (legacy_mode_flag && component_context.l !== null) init_update_callbacks(component_context).m.push(fn);
		else user_effect(() => {
			const cleanup = untrack(fn);
			if (typeof cleanup === "function") return cleanup;
		});
	}
	/**
	* Legacy-mode: Init callbacks object for onMount/beforeUpdate/afterUpdate
	* @param {ComponentContext} context
	*/
	function init_update_callbacks(context) {
		var l = context.l;
		return l.u ??= {
			a: [],
			b: [],
			m: []
		};
	}
	//#endregion
	//#region ../Toolbox/shared/mountInForm.ts
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
			removePagePadding(host);
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
	var PADDED_MUI_CLASSES = ["MuiContainer-root", "MuiBox-root"];
	/**
	* Entfernt das seitliche Padding der dforms-Seitenelemente (MUI-Container und
	* -Boxen), die das Formular umschließen, damit die Werkzeuge - meist breite
	* Tabellen - die volle Breite nutzen. Bewusst nur die Vorfahren des Formulars,
	* nicht alle MuiBox-root der Seite (die nutzt dforms z.B. auch in Kopfzeile
	* und Navigation). Direkt am Element gesetzt: schlägt die generierten Klassen
	* (z.B. css-1783alc, css-3p1e6c), die sich mit dforms-Updates ändern.
	*/
	function removePagePadding(host) {
		for (let element = host.parentElement; element; element = element.parentElement) if (PADDED_MUI_CLASSES.some((name) => element.classList.contains(name))) {
			element.style.paddingLeft = "0";
			element.style.paddingRight = "0";
		}
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
	//#region ../../helper/classcon-documentreader/masterFile.ts
	/**
	* Stammdaten des Rechnungslesers (CC_Companies.csv, CC_Vendors.csv, ...).
	* Läuft über die Browser-Session des angemeldeten Benutzers - der Upload ist
	* per ASP.NET-Antiforgery-Token geschützt, das zur Session gehört.
	*/
	function masterFileIndexUrl(baseUri, subscriptionId) {
		return `${baseUri}/classcon-documentreader/MasterFile/Index/${encodeURIComponent(subscriptionId)}`;
	}
	var TOKEN_NAME = "__RequestVerificationToken";
	var IFRAME_TIMEOUT_MS$1 = 15e3;
	function findTokenInHtml(html) {
		const doc = new DOMParser().parseFromString(html, "text/html");
		const fromDom = doc.querySelector(`input[name="${TOKEN_NAME}"]`)?.getAttribute("value") ?? doc.querySelector(`meta[name="${TOKEN_NAME}"], meta[name="RequestVerificationToken"]`)?.getAttribute("content");
		if (fromDom) return fromDom;
		for (const pattern of [
			/name=["']__RequestVerificationToken["'][^>]*value=["']([^"']+)["']/i,
			/value=["']([^"']+)["'][^>]*name=["']__RequestVerificationToken["']/i,
			/__RequestVerificationToken["']?\s*[:=,]\s*["']([A-Za-z0-9_\-+/=]{20,})["']/i
		]) {
			const match = html.match(pattern);
			if (match) return match[1];
		}
	}
	function findTokenInIframe(url) {
		return new Promise((resolve) => {
			const iframe = document.createElement("iframe");
			iframe.style.cssText = "position:absolute;width:0;height:0;border:0;visibility:hidden";
			iframe.setAttribute("aria-hidden", "true");
			let poll;
			const finish = (value) => {
				clearTimeout(timer);
				if (poll) clearInterval(poll);
				iframe.remove();
				resolve(value);
			};
			const timer = setTimeout(() => finish(void 0), IFRAME_TIMEOUT_MS$1);
			iframe.onload = () => {
				poll = setInterval(() => {
					try {
						const doc = iframe.contentDocument;
						const token = doc?.querySelector(`input[name="${TOKEN_NAME}"]`)?.getAttribute("value") ?? (doc ? findTokenInHtml(doc.documentElement.outerHTML) : void 0);
						if (token) finish(token);
					} catch {
						finish(void 0);
					}
				}, 250);
			};
			iframe.src = url;
			document.body.appendChild(iframe);
		});
	}
	/**
	* Holt das Antiforgery-Token der Stammdaten-Seite
	* (/classcon-documentreader/MasterFile/Index/<subscriptionId>): erst aus dem
	* HTML, sonst aus der im Hintergrund geöffneten Seite.
	*/
	async function getMasterFileRequestToken(baseUri, subscriptionId) {
		const url = masterFileIndexUrl(baseUri, subscriptionId);
		const response = await fetch(url, {
			method: "GET",
			headers: { Accept: "text/html" },
			credentials: "same-origin"
		});
		if (!response.ok) throw new Error(`Stammdaten-Seite des Rechnungslesers nicht erreichbar (HTTP ${response.status}).`);
		const token = findTokenInHtml(await response.text()) ?? await findTokenInIframe(url);
		if (!token) throw new Error("Sicherheitstoken der Stammdaten-Seite nicht gefunden.");
		return token;
	}
	/**
	* Lädt eine Stammdaten-Datei hoch - wie die Oberfläche:
	* POST /classcon-documentreader/MasterFile/Upload?id=<subscriptionId>
	* als multipart/form-data mit "__RequestVerificationToken" und "file[0]".
	*/
	async function uploadMasterFile(baseUri, subscriptionId, fileName, content) {
		const token = await getMasterFileRequestToken(baseUri, subscriptionId);
		const form = new FormData();
		form.append("__RequestVerificationToken", token);
		form.append("file[0]", new Blob([content], { type: "text/csv" }), fileName);
		await performHttpRequest(`${baseUri}/classcon-documentreader/MasterFile/Upload?id=${encodeURIComponent(subscriptionId)}`, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"X-Requested-With": "XMLHttpRequest"
			},
			body: form,
			credentials: "same-origin"
		});
	}
	/**
	* Baut eine Stammdaten-CSV im Format des Rechnungslesers: UTF-8 ohne BOM,
	* Semikolon als Trennzeichen, CRLF zwischen den Zeilen (wie die Beispiel-
	* dateien). Werte dürfen weder ";" noch Zeilenumbrüche enthalten - vorher
	* prüfen (siehe invalidMasterFileValue).
	*/
	function buildMasterFileCsv(headers, rows) {
		return [headers, ...rows].map((row) => row.join(";")).join("\r\n");
	}
	/** Liefert eine Fehlermeldung, wenn der Wert nicht in die CSV passt. */
	function invalidMasterFileValue(value) {
		if (value.includes(";")) return "darf kein Semikolon enthalten";
		if (/[\r\n]/.test(value)) return "darf keinen Zeilenumbruch enthalten";
	}
	//#endregion
	//#region src/forms/config.svelte.ts
	var SUBDOMAIN = window.location.hostname.split(".")[0];
	var GROUP_FRUEHES_SCANNEN_NAME = "gevis ECM Frühes Scannen";
	var ERP_OPTIONS = [{
		value: "veo",
		label: "VEO",
		description: "gevis ECM mit ERP-System VEO"
	}, {
		value: "gevisR",
		label: "gevis R-Linie",
		description: "gevis ECM mit ERP-System gevis R-Linie"
	}];
	function erpLabel(value) {
		return ERP_OPTIONS.find((option) => option.value === value)?.label ?? "";
	}
	var COMPANY_FILE_NAME = "CC_Companies.csv";
	var COMPANY_COLUMNS = [
		{
			key: "COMPANY_NUM",
			label: "Mandanten-Nr.",
			placeholder: "z.B. 1000",
			required: true
		},
		{
			key: "NAME",
			label: "Name",
			placeholder: "Firmenname",
			required: true
		},
		{
			key: "STR",
			label: "Straße",
			placeholder: "Straße Hausnr."
		},
		{
			key: "ZIP",
			label: "PLZ",
			placeholder: "PLZ"
		},
		{
			key: "CITY",
			label: "Ort",
			placeholder: "Ort"
		},
		{
			key: "COUNTRY",
			label: "Land",
			placeholder: "z.B. DE"
		},
		{
			key: "DEFAULT_CURRENCY",
			label: "Währung",
			placeholder: "z.B. EUR"
		},
		{
			key: "BLACK",
			label: "BLACK",
			placeholder: ""
		},
		{
			key: "ERPTENANT_ID",
			label: "ERP-Mandant-ID",
			placeholder: ""
		},
		{
			key: "COMPANY_ID",
			label: "Company-ID",
			placeholder: ""
		}
	];
	function emptyCompany() {
		return Object.fromEntries(COMPANY_COLUMNS.map((column) => [column.key, ""]));
	}
	var config = proxy({
		erpSystem: "",
		veo: {
			gwsNo: "",
			connectionString: "",
			queueName: `sbq-scan-in-${SUBDOMAIN}`
		},
		sftp: {
			host: "mt-sftp.gws.ms",
			port: "22",
			user: "",
			password: "",
			directory: "/out/dms/scandta"
		},
		companyRows: [emptyCompany()],
		groupMode: "new",
		newGroupName: GROUP_FRUEHES_SCANNEN_NAME,
		selectedGroupId: "",
		availableGroups: [],
		groupsLoadedFor: "",
		groupChoiceTouched: false,
		groupsLoading: false,
		groupsError: ""
	});
	/** Eingegebene Mandanten, getrimmt - komplett leere Zeilen zählen nicht. */
	function filledCompanies() {
		return config.companyRows.map((row) => Object.fromEntries(COMPANY_COLUMNS.map((column) => [column.key, (row[column.key] ?? "").trim()]))).filter((company) => Object.values(company).some(Boolean));
	}
	function isSftpConfigEmpty() {
		return !config.sftp.user.trim() && !config.sftp.password;
	}
	function isVeoConfigEmpty() {
		return !config.veo.gwsNo.trim() && !config.veo.connectionString.trim();
	}
	var SKIP_EMPTY_CONFIG = "Konfiguration leer gelassen - wird nicht angepasst.";
	function validateSftpConfig() {
		const sftp = config.sftp;
		if (!sftp.host.trim()) return "Bitte den SFTP-Host eingeben.";
		const port = Number(sftp.port.trim());
		if (!Number.isInteger(port) || port < 1 || port > 65535) return "Bitte eine gültige Portnummer (1-65535) eingeben.";
		if (!sftp.user.trim() || !sftp.password) return "Bitte Benutzer und Kennwort für den SFTP-Server eingeben.";
		if (!sftp.directory.trim().startsWith("/")) return "Bitte das Verzeichnis auf dem SFTP-Server eingeben (beginnt mit \"/\").";
	}
	function validateVeoConfig() {
		const veo = config.veo;
		if (!/^\d+$/.test(veo.gwsNo.trim())) return "Bitte die GWS-Nr. (nur Ziffern) eingeben.";
		const connection = veo.connectionString.trim();
		if (!/^Endpoint=sb:\/\//i.test(connection) || !/SharedAccessKey=/i.test(connection)) return "Bitte einen gültigen Service Bus Connection String eingeben (beginnt mit \"Endpoint=sb://\", enthält \"SharedAccessKey=\").";
		if (!veo.queueName.trim()) return "Bitte den Queue-Namen eingeben.";
	}
	function validateCompanies() {
		const companies = filledCompanies();
		if (!companies.length) return "Bitte mindestens einen Mandanten für die Stammdaten eintragen.";
		for (const [index, company] of companies.entries()) for (const column of COMPANY_COLUMNS) {
			const value = company[column.key];
			if (column.required && !value) return `Mandanten, Zeile ${index + 1}: „${column.label}“ fehlt.`;
			const problem = invalidMasterFileValue(value);
			if (problem) return `Mandanten, Zeile ${index + 1}: „${column.label}“ ${problem}.`;
		}
		const numbers = companies.map((company) => company.COMPANY_NUM);
		const duplicate = numbers.find((num, i) => numbers.indexOf(num) !== i);
		return duplicate ? `Mandanten-Nr. „${duplicate}“ ist doppelt.` : void 0;
	}
	//#endregion
	//#region ../../helper/identityprovider/getCurrentUserInformation.ts
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
			"Content-Type": "application/json"
		};
		if (token) headers.Authorization = `Bearer ${token}`;
		return await performHttpRequest(url, {
			method: "GET",
			headers
		});
	}
	//#endregion
	//#region ../../helper/identityprovider/createAPIKey.ts
	var CSRF_META_SELECTOR = "meta[name=\"x-csrf-token\"]";
	var CSRF_PAGES = [
		"/identityprovider/config/apikey/create",
		"/identityprovider/config/apikey",
		"/identityprovider/config"
	];
	var IFRAME_TIMEOUT_MS = 15e3;
	function readCsrfMeta(doc) {
		return doc?.querySelector(CSRF_META_SELECTOR)?.getAttribute("content") || void 0;
	}
	async function csrfFromFetch(baseUri, path) {
		try {
			const response = await fetch(`${baseUri}${path}`, {
				method: "GET",
				headers: { Accept: "text/html" },
				credentials: "same-origin"
			});
			if (!response.ok) return void 0;
			return readCsrfMeta(new DOMParser().parseFromString(await response.text(), "text/html"));
		} catch {
			return;
		}
	}
	function csrfFromIframe(baseUri, path) {
		return new Promise((resolve) => {
			const iframe = document.createElement("iframe");
			iframe.style.cssText = "position:absolute;width:0;height:0;border:0;visibility:hidden";
			iframe.setAttribute("aria-hidden", "true");
			const finish = (value) => {
				clearTimeout(timer);
				iframe.remove();
				resolve(value);
			};
			const timer = setTimeout(() => finish(void 0), IFRAME_TIMEOUT_MS);
			iframe.onload = () => {
				try {
					finish(readCsrfMeta(iframe.contentDocument));
				} catch {
					finish(void 0);
				}
			};
			iframe.src = `${baseUri}${path}`;
			document.body.appendChild(iframe);
		});
	}
	/**
	* Holt das Anti-CSRF-Token der Identityprovider-Konfiguration. Die
	* Oberfläche schickt es als Header "x-csrf-token" mit - ohne antwortet
	* POST /identityprovider/config/apikey mit 401 (auch mit gültiger Session).
	* Das Token steht im HTML der Konfigurationsseiten als
	* <meta name="x-csrf-token" content="...">.
	*/
	async function getIdentityProviderCsrfToken(baseUri) {
		for (const path of CSRF_PAGES) {
			const token = await csrfFromFetch(baseUri, path);
			if (token) return token;
		}
		const token = await csrfFromIframe(baseUri, CSRF_PAGES[0]);
		if (token) return token;
		throw new Error("CSRF-Token der Identityprovider-Konfiguration nicht gefunden (meta x-csrf-token).");
	}
	/**
	* Legt einen API-Key für einen Benutzer an - wie die Identityprovider-
	* Oberfläche: POST /identityprovider/config/apikey mit
	* {"id":"create","status":"Unconfirmed","userId":"<id>","label":"<label>"}
	* und Header "x-csrf-token" (siehe getIdentityProviderCsrfToken).
	*
	* @param token - Optional bearer token; ohne Token wird die Browser-Session genutzt.
	*/
	async function createAPIKey(baseUri, token = null, input) {
		const url = `${baseUri}/identityprovider/config/apikey`;
		const headers = {
			Accept: "application/json",
			"Content-Type": "application/json",
			"x-csrf-token": await getIdentityProviderCsrfToken(baseUri)
		};
		if (token) headers.Authorization = `Bearer ${token}`;
		return await performHttpRequest(url, {
			method: "POST",
			headers,
			body: JSON.stringify(input)
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
	//#region src/forms/util.ts
	function escapeHtml(value) {
		return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
	}
	function getErrorMessage(error) {
		return error instanceof Error ? error.message : String(error);
	}
	function hasSwal() {
		return typeof Swal !== "undefined";
	}
	function loadSweetAlert() {
		return new Promise((resolve) => {
			if (hasSwal()) {
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
	//#endregion
	//#region ../../helper/inbound/getBatchProfiles.ts
	/**
	* Retrieves batch profiles from the specified base URI using the provided authentication token.
	*
	* @template GetBatchProfiles - The expected response type for the batch profiles.
	* @param baseUri - The base URI of the API endpoint.
	* @param token - The Bearer token used for authentication.
	* @returns A promise that resolves to the batch profiles of type `GetBatchProfiles`.
	*/
	async function getBatchProfiles(baseUri, token) {
		return await performHttpRequest(`${baseUri}/inbound/batchprofile`, {
			method: "GET",
			headers: {
				"Authorization": `Bearer ${token}`,
				"Accept": "application/json",
				"Content-Type": "application/json"
			}
		});
	}
	//#endregion
	//#region ../../helper/inbound/createBatchProfile.ts
	async function createBatchProfile(baseUri, token, createBatchProfileBody) {
		return await performHttpRequest(`${baseUri}/inbound/batchprofile`, {
			method: "POST",
			headers: {
				"Authorization": `Bearer ${token}`,
				"Accept": "application/json",
				"Content-Type": "application/json; charset=utf-8"
			},
			body: JSON.stringify(createBatchProfileBody)
		});
	}
	//#endregion
	//#region ../../helper/inbound/updateBatchProfile.ts
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
		return await performHttpRequest(new URL(href, baseUri).toString(), {
			method: "PUT",
			headers: {
				...token ? { Authorization: `Bearer ${token}` } : {},
				Accept: "application/json",
				"Content-Type": "application/json; charset=utf-8"
			},
			body: JSON.stringify({
				...body,
				batchProfileId: profile.batchProfileId
			})
		});
	}
	//#endregion
	//#region ../../helper/emailinbound/updateEmailinboundProfile.ts
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
		if (!href) throw new Error(`Für das Postfach "${existing.mailbox}" liefert die API keinen Link zum Aktualisieren.`);
		return await performHttpRequest(new URL(href, baseUri).toString(), {
			method: "PUT",
			headers: {
				...token ? { Authorization: `Bearer ${token}` } : {},
				Accept: "application/json",
				"Content-Type": "application/json; charset=utf-8"
			},
			body: JSON.stringify(payload)
		});
	}
	//#endregion
	//#region ../../helper/dms/getMappingContainers.ts
	/**
	* Liest ein einzelnes Quell-Mapping inkl. seiner Zuordnungen (GET auf den
	* self-Link aus getMappingContainers, z.B.
	* /dms/r/<repositoryId>/mapping/container/<id>).
	*/
	async function getMappingContainer(baseUri, token, container) {
		const href = container._links?.self?.href;
		if (!href) throw new Error(`Für das Quell-Mapping "${container.name}" liefert die API keinen Link.`);
		const headers = {
			...token ? { Authorization: `Bearer ${token}` } : {},
			Accept: "application/hal+json, application/json"
		};
		return await performHttpRequest(new URL(href, baseUri).toString(), {
			method: "GET",
			headers
		});
	}
	/**
	* Speichert ein bestehendes Quell-Mapping (PUT
	* /dms/r/<repositoryId>/mapping/container/<id>) - wie die DMS-Oberfläche mit
	* {"name", "id", "sourceId", "mappingItems": [...]}. mappingItems ersetzt die
	* komplette Liste, also vorher mit getMappingContainer laden und ergänzen.
	*/
	async function updateMappingContainer(baseUri, token, repositoryId, container) {
		if (!container.id) throw new Error(`Quell-Mapping "${container.name}" hat keine Id.`);
		const url = `${baseUri}/dms/r/${repositoryId}/mapping/container/${container.id}`;
		const headers = {
			...token ? { Authorization: `Bearer ${token}` } : {},
			Accept: "application/hal+json, application/json",
			"Content-Type": "application/json"
		};
		const body = {
			name: container.name,
			id: container.id,
			sourceId: container.sourceId,
			mappingItems: container.mappingItems ?? []
		};
		return await performHttpRequest(url, {
			method: "PUT",
			headers,
			body: JSON.stringify(body)
		});
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
		return await performHttpRequest(`${baseUri}/dms/r/${repositoryId}/mapping/container`, {
			method: "GET",
			headers: {
				...token ? { Authorization: `Bearer ${token}` } : {},
				Accept: "application/hal+json, application/json"
			}
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
	//#region ../../helper/usermanagement/createGroup.ts
	async function createGroup(baseUri, token, input) {
		return await performHttpRequest(`${baseUri}/usermanagement/group`, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${token}`,
				Accept: "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify(input)
		});
	}
	//#endregion
	//#region ../../helper/usermanagement/getAllGroups.ts
	/**
	* Retrieves all user groups from the user management service.
	*
	* @param baseUri - The base URI of the user management API.
	* @param token - The bearer token used for authentication.
	* @returns A promise that resolves to an `ApiResponse` containing all groups.
	*/
	async function getAllGroups(baseUri, token) {
		return await performHttpRequest(`${baseUri}/usermanagement/group`, {
			method: "GET",
			headers: {
				"Authorization": `Bearer ${token}`,
				"Accept": "application/json",
				"Content-Type": "application/json"
			}
		});
	}
	//#endregion
	//#region ../../helper/emailinbound/getEmailinboundProfiles.ts
	/**
	* Retrieves the list of email inbound profiles from the specified base URI.
	*
	* @param baseUri - The base URI of the API endpoint.
	* @param token - The bearer token used for authentication.
	* @returns A promise that resolves to an ApiResponse containing the email inbound profiles.
	*/
	async function getEmailinboundProfiles(baseUri, token) {
		return await performHttpRequest(`${baseUri}/emailinbound/settings`, {
			method: "GET",
			headers: {
				"Authorization": `Bearer ${token}`,
				"Accept": "application/json",
				"Content-Type": "application/json; charset=utf-8"
			}
		});
	}
	//#endregion
	//#region ../../helper/emailinbound/createEmailinboundProfile.ts
	async function createEmailinboundProfiles(baseUri, token, payload) {
		return await performHttpRequest(`${baseUri}/emailinbound/settings`, {
			method: "POST",
			headers: {
				"Authorization": `Bearer ${token}`,
				"Accept": "application/json",
				"Content-Type": "application/json; charset=utf-8"
			},
			body: JSON.stringify(payload)
		});
	}
	//#endregion
	//#region ../../helper/webindexlayouter/replaceDocumentReaderWebindexForm.ts
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
		return await performHttpRequest(`${baseUri}/webindexlayouter/api/v1/apps/classcon-documentreader/configuration`, {
			method: "PUT",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json"
			},
			body: webindexLayout
		});
	}
	//#endregion
	//#region ../../helper/webindexlayouter/getWebindexConfigurations.ts
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
		return await performHttpRequest(`${baseUri}/webindexlayouter/api/v1/apps/configurations`, {
			method: "GET",
			headers: {
				...token ? { Authorization: `Bearer ${token}` } : {},
				Accept: "application/json"
			}
		});
	}
	/**
	* Sucht in der Antwort von getWebindexConfigurations die Konfiguration einer
	* App (Standard: Rechnungsleser "classcon-documentreader") - Liste direkt oder
	* unter "configurations"/"apps"/"items"/"value", erkannt am Feld "name" bzw.
	* "appId"/"id". undefined = nicht gefunden.
	*/
	function findWebindexConfiguration(configurations, appName = "classcon-documentreader") {
		const body = configurations;
		const list = Array.isArray(body) ? body : body?.configurations ?? body?.apps ?? body?.items ?? body?.value;
		if (Array.isArray(list)) return list.find((entry) => [
			entry?.name,
			entry?.appId,
			entry?.id,
			entry?.app
		].includes(appName));
		if (body && typeof body === "object" && appName in body) return body[appName];
	}
	(() => {
		const table = /* @__PURE__ */ new Uint32Array(256);
		for (let n = 0; n < 256; n++) {
			let c = n;
			for (let k = 0; k < 8; k++) c = c & 1 ? 3988292384 ^ c >>> 1 : c >>> 1;
			table[n] = c >>> 0;
		}
		return table;
	})();
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
		setTimeout(() => URL.revokeObjectURL(url), 1e3);
	}
	/**
	* Mandantenname für Dateinamen, abgeleitet aus der ersten Stelle des
	* Hostnamens, z.B. "ellinger.d-velop.cloud" -> "Ellinger".
	*/
	function getTenantName(hostname = window.location.hostname) {
		const label = hostname.split(".")[0] ?? "";
		return label ? label.charAt(0).toUpperCase() + label.slice(1) : "";
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
	//#region ../../helper/dms/createSourceMapping.ts
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
		return await performHttpRequest(`${baseUri}/dms/r/${repositoryId}/m`, {
			method: "POST",
			headers: {
				"Authorization": `Bearer ${token}`,
				"Accept": "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify(sourceMapping)
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
	//#region ../../helper/eventbridge/setDmspostimport.ts
	/**
	* Enables the "dmspostimport" event in the EventBridge configuration by sending a PATCH request.
	*
	* @template T - The expected response type.
	* @param baseUri - The base URI of the API endpoint.
	* @param token - The bearer token used for authorization.
	* @returns A promise that resolves to an `ApiResponse<T>` containing the API response.
	*/
	async function setDmspostimport(baseUri, token, activated) {
		return await performHttpRequest(`${baseUri}/eventbridge/config/events`, {
			method: "PATCH",
			headers: {
				"Authorization": `Bearer ${token}`,
				"Accept": "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ events: [{
				id: "dmspostimport",
				enabled: activated
			}] })
		});
	}
	//#endregion
	//#region ../../helper/eventbridge/synchronizeEventbride.ts
	/**
	* Synchronizes the Eventbridge configuration for a given repository by sending a refresh request.
	*
	* @template T - The expected response type.
	* @param baseUri - The base URI of the API endpoint.
	* @param token - The bearer token used for authentication.
	* @param repositoryId - The ID of the repository to synchronize.
	* @returns A promise that resolves to an `ApiResponse<T>` containing the response data.
	*/
	async function synchronizeEventbride(baseUri, token, repositoryId) {
		return await performHttpRequest(`${baseUri}/eventbridge/config/dms/refresh`, {
			method: "POST",
			headers: {
				"Authorization": `Bearer ${token}`,
				"Accept": "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ id: repositoryId })
		});
	}
	//#endregion
	//#region ../../helper/dash/getApps.ts
	/**
	* Retrieves the list of available apps from the dashboard API.
	*
	* @param baseUri - The base URI of the API endpoint.
	* @param token - The bearer token used for authentication.
	* @returns A promise that resolves to an `ApiResponse` containing the `GetApps` data.
	*/
	async function getApps(baseUri, token) {
		return await performHttpRequest(`${baseUri}/dash/api/appsmenu`, {
			method: "GET",
			headers: {
				"Authorization": `Bearer ${token}`,
				"Accept": "application/json",
				"Content-Type": "application/json; charset=utf-8"
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
	//#region ../../helper/classcon-documentreader/setDocumentProcessingConfiguration.ts
	/**
	* Liest die Verarbeitungs-Einstellungen des Rechnungslesers (Seite
	* "Dokumentprüfung"): GET /classcon-documentreader/Configuration/DocumentProcessing?subscriptionId=...
	* liefert HTML, in dem jede Einstellung ein Schalter
	* <button role="switch" id="<Name>" aria-checked="true|false"> ist, z.B.
	* { InvoicePreCheck: true, DuplicateCheck: false, BatchPermissions: true }.
	*
	* @param token - Optional bearer token; ohne Token wird die Browser-Session genutzt.
	*/
	async function getDocumentProcessingConfiguration(baseUri, token, subscriptionId) {
		const response = await performHttpRequest(`${baseUri}/classcon-documentreader/Configuration/DocumentProcessing?subscriptionId=${encodeURIComponent(subscriptionId)}`, {
			method: "GET",
			headers: {
				...token ? { Authorization: `Bearer ${token}` } : {},
				Accept: "text/html"
			}
		});
		if (typeof response.body !== "string" || typeof DOMParser === "undefined") throw new Error("Die Dokumentprüfung des Rechnungslesers konnte nicht gelesen werden.");
		const doc = new DOMParser().parseFromString(response.body, "text/html");
		const result = {};
		doc.querySelectorAll("[role=\"switch\"][id]").forEach((element) => {
			result[element.id] = element.getAttribute("aria-checked") === "true";
		});
		return result;
	}
	/**
	* Schaltet eine Verarbeitungs-Einstellung des Rechnungslesers ein oder aus -
	* wie die Oberfläche: POST /classcon-documentreader/Configuration/DocumentProcessing
	* als Formulardaten
	*   subscriptionID=<id>&configuration={"Name":"<name>","Active":<true|false>}
	* z.B. Name "DuplicateCheck" für die Dublettenprüfung.
	*
	* @param baseUri - The base URI of the API endpoint.
	* @param token - Optional bearer token; ohne Token wird die Browser-Session genutzt.
	* @param subscriptionId - Subscription-ID des Rechnungslesers.
	* @param name - Name der Einstellung, z.B. "DuplicateCheck".
	* @param active - Einstellung aktivieren (true) oder deaktivieren (false).
	*/
	async function setDocumentProcessingConfiguration(baseUri, token, subscriptionId, name, active) {
		return await performHttpRequest(`${baseUri}/classcon-documentreader/Configuration/DocumentProcessing`, {
			method: "POST",
			headers: {
				...token ? { Authorization: `Bearer ${token}` } : {},
				Accept: "application/json",
				"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
			},
			body: new URLSearchParams({
				subscriptionID: subscriptionId,
				configuration: JSON.stringify({
					Name: name,
					Active: active
				})
			}).toString()
		});
	}
	var batchProfileMail_default = {
		name: "Frühes Scannen (Mail)",
		authorizedGroups: [{
			"id": "C7D335FA-C1A1-4BB3-80F6-A1A6415DAE27",
			"displayName": "Alle"
		}],
		authorizedBatchIdpElements: [{
			"id": "DA68014B-8FAF-48DA-904B-F8B360D0B803",
			"displayName": "Ersteller*in des Stapels",
			"elementType": 0
		}],
		errorNotificationRecipients: [{
			"id": "005B1D7A-0899-481F-9E61-DE43C90F1381",
			"displayName": "Bereits berechtigte Gruppen und Personen",
			"elementType": 1
		}],
		authorizedDeleteBatchIdpElements: [{
			"id": "DA68014B-8FAF-48DA-904B-F8B360D0B803",
			"displayName": "Ersteller*in des Stapels",
			"elementType": 0
		}, {
			"id": "005B1D7A-0899-481F-9E61-DE43C90F1381",
			"displayName": "Bereits berechtigte Gruppen und Personen",
			"elementType": 1
		}],
		importProfile: {
			"defaultCategoryId": null,
			"categoryRules": null
		},
		mailBodyCategoryRule: {
			"ruleType": 0,
			"active": false,
			"categoryId": "likeDefaultCategory"
		},
		emailHandling: {
			"import": "3",
			"placeBody": "0",
			"importInlineAttachments": false
		},
		properties: {
			"documentProperties": [],
			"batchProperties": []
		},
		exportProfile: {
			"primaryExportFile": "4",
			"automatedExport": true,
			"exportSystemId": "classcon-documentreader-0189e289-edcc-48ae-974e-3edde2029063_ExportImportProcessAutomated",
			"showExportSystemInstantly": false,
			"exportAdditionalAttachments": true
		},
		allowPageEditing: true,
		respectSignature: true,
		guiRestrictions: {
			"addPagesAvailable": true,
			"deletePagesAvailable": true,
			"movePagesAvailable": true,
			"rotatePagesAvailable": true,
			"editDocumentsAvailable": true,
			"editDocumentPropertiesAvailable": true
		},
		splittingProfile: {
			"active": true,
			"barcodeProfileId": null,
			"regEx": null,
			"removePage": false,
			"splittingMode": "2",
			"maxPageCount": null,
			"regExForSplitting": null
		},
		pageProcessing: {
			"barcodeRecognition": true,
			"textRecognition": true,
			"searchablePdf": true
		},
		compression: {
			"active": false,
			"compression": "-1"
		},
		documentProcessing: {
			"kiProcessing": true,
			"llmProcessing": false
		},
		fileImportRules: {
			"type": 0,
			"regExRules": [
				".*\\.exe$",
				".*\\.dll$",
				".*\\.msi$",
				".*\\.js$",
				".*\\.jar$",
				".*\\.ear$",
				".*\\.war$",
				".*\\.mpkg$",
				".*\\.php\\d?$",
				".*\\.sh$",
				".*\\.swf$",
				".*\\.pm$",
				".*\\.pl$",
				".*\\.ps1$",
				".*\\.com$",
				".*\\.bat$",
				".*\\.cmd$",
				".*\\.vbs$",
				".*\\.vbe$",
				".*\\.jse$",
				".*\\.wsf$",
				".*\\.wsh$",
				".*\\.msc$",
				".*\\.p7c$",
				".*\\.p7m$",
				".*\\.p7s$",
				".*\\.crt$",
				".*\\.der$",
				".*\\.cer$",
				".*\\.pem$",
				".*\\.ics$",
				".*\\.bin$",
				".*\\.vcf$"
			]
		},
		newRegEx: null
	};
	var batchProfileScan_default = {
		name: "Frühes Scannen (Scan)",
		authorizedGroups: [{
			"id": "C7D335FA-C1A1-4BB3-80F6-A1A6415DAE27",
			"displayName": "Alle",
			"elementType": 1
		}],
		authorizedBatchIdpElements: [{
			"id": "DA68014B-8FAF-48DA-904B-F8B360D0B803",
			"displayName": "Ersteller*in des Stapels",
			"elementType": 0
		}],
		errorNotificationRecipients: [{
			"id": "005B1D7A-0899-481F-9E61-DE43C90F1381",
			"displayName": "Bereits berechtigte Gruppen und Personen",
			"elementType": 1
		}],
		authorizedDeleteBatchIdpElements: [{
			"id": "DA68014B-8FAF-48DA-904B-F8B360D0B803",
			"displayName": "Ersteller*in des Stapels",
			"elementType": 0
		}, {
			"id": "005B1D7A-0899-481F-9E61-DE43C90F1381",
			"displayName": "Bereits berechtigte Gruppen und Personen",
			"elementType": 1
		}],
		importProfile: {
			"defaultCategoryId": null,
			"categoryRules": null
		},
		mailBodyCategoryRule: {
			"ruleType": 0,
			"active": false,
			"categoryId": "likeDefaultCategory"
		},
		emailHandling: {
			"import": "3",
			"placeBody": "0",
			"importInlineAttachments": false
		},
		properties: {
			"documentProperties": [],
			"batchProperties": []
		},
		exportProfile: {
			"primaryExportFile": "4",
			"automatedExport": false,
			"exportSystemId": "classcon-documentreader-0189e289-edcc-48ae-974e-3edde2029063_ExportImportProcess",
			"showExportSystemInstantly": false,
			"exportAdditionalAttachments": true
		},
		allowPageEditing: true,
		respectSignature: true,
		guiRestrictions: {
			"addPagesAvailable": true,
			"deletePagesAvailable": true,
			"movePagesAvailable": true,
			"rotatePagesAvailable": true,
			"editDocumentsAvailable": true,
			"editDocumentPropertiesAvailable": true
		},
		splittingProfile: {
			"active": true,
			"barcodeProfileId": null,
			"regEx": null,
			"removePage": false,
			"splittingMode": "0",
			"maxPageCount": null,
			"regExForSplitting": null
		},
		pageProcessing: {
			"barcodeRecognition": true,
			"textRecognition": true,
			"searchablePdf": true
		},
		compression: {
			"active": false,
			"compression": "-1"
		},
		documentProcessing: {
			"kiProcessing": true,
			"llmProcessing": false
		},
		fileImportRules: {
			"type": 0,
			"regExRules": [
				".*\\.exe$",
				".*\\.dll$",
				".*\\.msi$",
				".*\\.js$",
				".*\\.jar$",
				".*\\.ear$",
				".*\\.war$",
				".*\\.mpkg$",
				".*\\.php\\d?$",
				".*\\.sh$",
				".*\\.swf$",
				".*\\.pm$",
				".*\\.pl$",
				".*\\.ps1$",
				".*\\.com$",
				".*\\.bat$",
				".*\\.cmd$",
				".*\\.vbs$",
				".*\\.vbe$",
				".*\\.jse$",
				".*\\.wsf$",
				".*\\.wsh$",
				".*\\.msc$",
				".*\\.p7c$",
				".*\\.p7m$",
				".*\\.p7s$",
				".*\\.crt$",
				".*\\.der$",
				".*\\.cer$",
				".*\\.pem$",
				".*\\.ics$",
				".*\\.bin$",
				".*\\.vcf$"
			]
		},
		newRegEx: null
	};
	var webindexDesignerForm_default = {
		name: "classcon-documentreader",
		baseLayout: /* @__PURE__ */ JSON.parse("{\"DocumentTypeID\":\"INV\",\"CustomDuplicateCheck\":{\"QueryDefinition\":\"SELECT\\n  *\\nFROM\\n  CCLogAttributes AS att\\n  INNER JOIN CCLogDocuments AS doc ON att.DocumentID = doc.DocumentID\\nWHERE\\n  doc.SubscriptionID = @subscriptionID\\n  AND doc.ProcessSequenceID = @processSequenceID\\n  AND doc.Type = 0\\n  AND doc.Category_After = @vendorNumber\\n  AND att.DocumentID <> @documentID\\n  AND att.Attribute_Name = 'InvoiceNumber'\\n  AND att.Attribute_After = @invoiceNumber\",\"QueryMappings\":[{\"ColumnName\":\"@subscriptionID\",\"AttributeID\":\"SubscriptionId\"},{\"ColumnName\":\"@processSequenceID\",\"AttributeID\":\"ProcessSequenceId\"},{\"ColumnName\":\"@documentID\",\"AttributeID\":\"DocumentUID\"},{\"ColumnName\":\"@invoiceNumber\",\"AttributeID\":\"InvoiceNumber\"},{\"ColumnName\":\"@vendorNumber\",\"AttributeID\":\"VENDOR_NUM\"}],\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"DateTargetFormats\":[{\"Code\":\"de\",\"JSFormat\":\"DD.MM.YYYY\",\"Format\":\"dd.MM.yyyy\",\"Pattern\":\"^(0?[1-9]|[12][0-9]|3[01])[.](0?[1-9]|1[012])[.](\\\\d{4})$\"},{\"Code\":\"en-GB\",\"JSFormat\":\"DD/MM/YYYY\",\"Format\":\"dd/MM/yyyy\",\"Pattern\":\"^(0?[1-9]|[12][0-9]|3[01])\\\\/(0?[1-9]|1[012])\\\\/(\\\\d{4})$\"},{\"Code\":\"en-US\",\"JSFormat\":\"MM/DD/YYYY\",\"Format\":\"MM/dd/yyyy\",\"Pattern\":\"^(0?[1-9]|1[012])\\\\/(0?[1-9]|[12][0-9]|3[01])\\\\/(\\\\d{4})$\"},{\"Code\":\"en\",\"JSFormat\":\"DD/MM/YYYY\",\"Format\":\"dd/MM/yyyy\",\"Pattern\":\"^(0?[1-9]|[12][0-9]|3[01])\\\\/(0?[1-9]|1[012])\\\\/(\\\\d{4})$\"},{\"Code\":\"fr\",\"JSFormat\":\"DD/MM/YYYY\",\"Format\":\"dd/MM/yyyy\",\"Pattern\":\"^(0?[1-9]|[12][0-9]|3[01])\\\\/(0?[1-9]|1[012])\\\\/(\\\\d{4})$\"},{\"Code\":\"cs\",\"JSFormat\":\"DD.MM.YYYY\",\"Format\":\"dd.MM.yyyy\",\"Pattern\":\"^(0?[1-9]|[12][0-9]|3[01])[.](0?[1-9]|1[012])[.](\\\\d{4})$\"},{\"Code\":\"da\",\"JSFormat\":\"DD-MM-YYYY\",\"Format\":\"dd-MM-yyyy\",\"Pattern\":\"^(0?[1-9]|[12][0-9]|3[01])-(0?[1-9]|1[012])-(\\\\d{4})$\"},{\"Code\":\"es\",\"JSFormat\":\"DD/MM/YYYY\",\"Format\":\"dd/MM/yyyy\",\"Pattern\":\"^(0?[1-9]|[12][0-9]|3[01])\\\\/(0?[1-9]|1[012])\\\\/(\\\\d{4})$\"},{\"Code\":\"hr\",\"JSFormat\":\"DD.MM.YYYY\",\"Format\":\"dd.MM.yyyy\",\"Pattern\":\"^(0?[1-9]|[12][0-9]|3[01])[.](0?[1-9]|1[012])[.](\\\\d{4})$\"},{\"Code\":\"it\",\"JSFormat\":\"DD/MM/YYYY\",\"Format\":\"dd/MM/yyyy\",\"Pattern\":\"^(0?[1-9]|[12][0-9]|3[01])\\\\/(0?[1-9]|1[012])\\\\/(\\\\d{4})$\"},{\"Code\":\"nl\",\"JSFormat\":\"DD-MM-YYYY\",\"Format\":\"dd-MM-yyyy\",\"Pattern\":\"^(0?[1-9]|[12][0-9]|3[01])-(0?[1-9]|1[012])-(\\\\d{4})$\"},{\"Code\":\"pl\",\"JSFormat\":\"DD.MM.YYYY\",\"Format\":\"dd.MM.yyyy\",\"Pattern\":\"^(0?[1-9]|[12][0-9]|3[01])[.](0?[1-9]|1[012])[.](\\\\d{4})$\"},{\"Code\":\"pt\",\"JSFormat\":\"DD-MM-YYYY\",\"Format\":\"dd-MM-yyyy\",\"Pattern\":\"^(0?[1-9]|[12][0-9]|3[01])-(0?[1-9]|1[012])-(\\\\d{4})$\"},{\"Code\":\"sk\",\"JSFormat\":\"DD.MM.YYYY\",\"Format\":\"dd.MM.yyyy\",\"Pattern\":\"^(0?[1-9]|[12][0-9]|3[01])[.](0?[1-9]|1[012])[.](\\\\d{4})$\"},{\"Code\":\"sr\",\"JSFormat\":\"DD.MM.YYYY\",\"Format\":\"dd.MM.yyyy\",\"Pattern\":\"^(0?[1-9]|[12][0-9]|3[01])[.](0?[1-9]|1[012])[.](\\\\d{4})$\"},{\"Code\":\"zh\",\"JSFormat\":\"YYYY-MM-DD\",\"Format\":\"yyyy-MM-dd\",\"Pattern\":\"^\\\\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])$\"}],\"FloatValueFormats\":[{\"Code\":\"de\",\"ThousandDelimiter\":\"\",\"DecimalPlacesDelimiter\":\",\",\"Pattern\":\"^\\\\d+(,\\\\d+)?$\"},{\"Code\":\"en-GB\",\"ThousandDelimiter\":\"\",\"DecimalPlacesDelimiter\":\".\",\"Pattern\":\"^\\\\d+(\\\\.\\\\d+)?$\"},{\"Code\":\"en-US\",\"ThousandDelimiter\":\"\",\"DecimalPlacesDelimiter\":\".\",\"Pattern\":\"^\\\\d+(\\\\.\\\\d+)?$\"},{\"Code\":\"en\",\"ThousandDelimiter\":\"\",\"DecimalPlacesDelimiter\":\".\",\"Pattern\":\"^\\\\d+(\\\\.\\\\d+)?$\"},{\"Code\":\"fr\",\"ThousandDelimiter\":\"\",\"DecimalPlacesDelimiter\":\",\",\"Pattern\":\"^\\\\d+(,\\\\d+)?$\"},{\"Code\":\"cs\",\"ThousandDelimiter\":\"\",\"DecimalPlacesDelimiter\":\",\",\"Pattern\":\"^\\\\d+(,\\\\d+)?$\"},{\"Code\":\"da\",\"ThousandDelimiter\":\"\",\"DecimalPlacesDelimiter\":\",\",\"Pattern\":\"^\\\\d+(,\\\\d+)?$\"},{\"Code\":\"es\",\"ThousandDelimiter\":\"\",\"DecimalPlacesDelimiter\":\",\",\"Pattern\":\"^\\\\d+(,\\\\d+)?$\"},{\"Code\":\"hr\",\"ThousandDelimiter\":\"\",\"DecimalPlacesDelimiter\":\",\",\"Pattern\":\"^\\\\d+(,\\\\d+)?$\"},{\"Code\":\"it\",\"ThousandDelimiter\":\"\",\"DecimalPlacesDelimiter\":\",\",\"Pattern\":\"^\\\\d+(,\\\\d+)?$\"},{\"Code\":\"nl\",\"ThousandDelimiter\":\"\",\"DecimalPlacesDelimiter\":\",\",\"Pattern\":\"^\\\\d+(,\\\\d+)?$\"},{\"Code\":\"pl\",\"ThousandDelimiter\":\"\",\"DecimalPlacesDelimiter\":\",\",\"Pattern\":\"^\\\\d+(,\\\\d+)?$\"},{\"Code\":\"pt\",\"ThousandDelimiter\":\"\",\"DecimalPlacesDelimiter\":\",\",\"Pattern\":\"^\\\\d+(,\\\\d+)?$\"},{\"Code\":\"sk\",\"ThousandDelimiter\":\"\",\"DecimalPlacesDelimiter\":\",\",\"Pattern\":\"^\\\\d+(,\\\\d+)?$\"},{\"Code\":\"sr\",\"ThousandDelimiter\":\"\",\"DecimalPlacesDelimiter\":\",\",\"Pattern\":\"^\\\\d+(,\\\\d+)?$\"},{\"Code\":\"zh\",\"ThousandDelimiter\":\"\",\"DecimalPlacesDelimiter\":\".\",\"Pattern\":\"^\\\\d+(\\\\.\\\\d+)?$\"}],\"AttributeTypeDefinitions\":[{\"AttributeTypeId\":\"VENDOR_NUM\",\"AttributeTypeDescription\":\"Vendor Number\",\"SemanticType\":0,\"ValueType\":3,\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"DInfSaveOption\":0,\"DClassifyAlias\":\"vendor.VENDOR_NUM\",\"InboundAlias\":null,\"LoggingFlag\":0,\"InterpretAsMultipleValues\":false,\"ModelType\":0,\"TemplatePath\":\"basics.vendor clues\"},{\"AttributeTypeId\":\"InvoiceNumber\",\"AttributeTypeDescription\":\"Invoice Number\",\"SemanticType\":0,\"ValueType\":3,\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"DInfSaveOption\":0,\"DClassifyAlias\":\"invoicenumber\",\"InboundAlias\":null,\"LoggingFlag\":0,\"InterpretAsMultipleValues\":false,\"ModelType\":1,\"TemplatePath\":\"vendor.[TEMPLATE_ID].invoicenumber\"},{\"AttributeTypeId\":\"InvoiceDate\",\"AttributeTypeDescription\":\"Invoice Date\",\"SemanticType\":0,\"ValueType\":2,\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"DInfSaveOption\":0,\"DClassifyAlias\":\"invoicedate.date\",\"InboundAlias\":null,\"LoggingFlag\":0,\"InterpretAsMultipleValues\":false,\"ModelType\":1,\"TemplatePath\":\"vendor.[TEMPLATE_ID].invoicedate\"},{\"AttributeTypeId\":\"CostCenter\",\"AttributeTypeDescription\":\"CostCenter\",\"SemanticType\":0,\"ValueType\":3,\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"DInfSaveOption\":1,\"DClassifyAlias\":\"costcenter\",\"InboundAlias\":null,\"LoggingFlag\":1,\"InterpretAsMultipleValues\":false,\"ModelType\":0,\"TemplatePath\":null},{\"AttributeTypeId\":\"ImpersonalAccount\",\"AttributeTypeDescription\":\"ImpersonalAccount\",\"SemanticType\":0,\"ValueType\":3,\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"DInfSaveOption\":1,\"DClassifyAlias\":\"impersonal-account\",\"InboundAlias\":null,\"LoggingFlag\":1,\"InterpretAsMultipleValues\":false,\"ModelType\":0,\"TemplatePath\":null},{\"AttributeTypeId\":\"9e322012-3cc1-402d-9fd8-f64aad71fbf7\",\"AttributeTypeDescription\":\"Barcode\",\"SemanticType\":0,\"ValueType\":3,\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"DInfSaveOption\":0,\"DClassifyAlias\":null,\"InboundAlias\":null,\"LoggingFlag\":1,\"InterpretAsMultipleValues\":false,\"ModelType\":0,\"TemplatePath\":null},{\"AttributeTypeId\":\"3d6dd2a3-bfc6-4170-b7e5-8d347d449c35\",\"AttributeTypeDescription\":\"Barcode3\",\"SemanticType\":0,\"ValueType\":3,\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"DInfSaveOption\":0,\"DClassifyAlias\":null,\"InboundAlias\":null,\"LoggingFlag\":1,\"InterpretAsMultipleValues\":false,\"ModelType\":0,\"TemplatePath\":null},{\"AttributeTypeId\":\"Notes\",\"AttributeTypeDescription\":\"Notes\",\"SemanticType\":0,\"ValueType\":3,\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"DInfSaveOption\":0,\"DClassifyAlias\":null,\"InboundAlias\":null,\"LoggingFlag\":1,\"InterpretAsMultipleValues\":false,\"ModelType\":0,\"TemplatePath\":null},{\"AttributeTypeId\":\"VENDOR_NAME\",\"AttributeTypeDescription\":\"Vendor Name\",\"SemanticType\":0,\"ValueType\":3,\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"DInfSaveOption\":0,\"DClassifyAlias\":\"vendor.VENDOR_NAME\",\"InboundAlias\":null,\"LoggingFlag\":1,\"InterpretAsMultipleValues\":false,\"ModelType\":0,\"TemplatePath\":null},{\"AttributeTypeId\":\"VENDOR_CITY\",\"AttributeTypeDescription\":\"Vendor City\",\"SemanticType\":0,\"ValueType\":3,\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"DInfSaveOption\":0,\"DClassifyAlias\":\"vendor.VENDOR_CITY\",\"InboundAlias\":null,\"LoggingFlag\":1,\"InterpretAsMultipleValues\":false,\"ModelType\":0,\"TemplatePath\":null},{\"AttributeTypeId\":\"VENDOR_STR\",\"AttributeTypeDescription\":\"VendorStr\",\"SemanticType\":0,\"ValueType\":3,\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"DInfSaveOption\":0,\"DClassifyAlias\":\"vendor.VENDOR_STR\",\"InboundAlias\":null,\"LoggingFlag\":1,\"InterpretAsMultipleValues\":false,\"ModelType\":0,\"TemplatePath\":null},{\"AttributeTypeId\":\"VENDOR_ZIP_CODE\",\"AttributeTypeDescription\":\"VendorZipCode\",\"SemanticType\":0,\"ValueType\":3,\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"DInfSaveOption\":0,\"DClassifyAlias\":\"vendor.VENDOR_ZIP_CODE\",\"InboundAlias\":null,\"LoggingFlag\":1,\"InterpretAsMultipleValues\":false,\"ModelType\":0,\"TemplatePath\":null},{\"AttributeTypeId\":\"VENDOR_VAT_REGISTRATION_ID\",\"AttributeTypeDescription\":\"VendorVatID\",\"SemanticType\":0,\"ValueType\":3,\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"DInfSaveOption\":0,\"DClassifyAlias\":\"vendor.VENDOR_VAT_REGISTRATION_ID\",\"InboundAlias\":null,\"LoggingFlag\":1,\"InterpretAsMultipleValues\":false,\"ModelType\":0,\"TemplatePath\":null},{\"AttributeTypeId\":\"VENDOR_COUNTRY\",\"AttributeTypeDescription\":\"Vendor Country\",\"SemanticType\":0,\"ValueType\":3,\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"DInfSaveOption\":0,\"DClassifyAlias\":null,\"InboundAlias\":null,\"LoggingFlag\":1,\"InterpretAsMultipleValues\":false,\"ModelType\":0,\"TemplatePath\":null},{\"AttributeTypeId\":\"VENDOR_IBAN\",\"AttributeTypeDescription\":\"VENDOR_IBAN\",\"SemanticType\":0,\"ValueType\":3,\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"DInfSaveOption\":0,\"DClassifyAlias\":\"vendor.iban\",\"InboundAlias\":null,\"LoggingFlag\":1,\"InterpretAsMultipleValues\":false,\"ModelType\":0,\"TemplatePath\":null},{\"AttributeTypeId\":\"DEBITOR_NUM\",\"AttributeTypeDescription\":\"DebitorNum\",\"SemanticType\":0,\"ValueType\":3,\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"DInfSaveOption\":0,\"DClassifyAlias\":\"company.COMPANY_NUM\",\"InboundAlias\":null,\"LoggingFlag\":0,\"InterpretAsMultipleValues\":false,\"ModelType\":2,\"TemplatePath\":\"mandant\"},{\"AttributeTypeId\":\"NAME\",\"AttributeTypeDescription\":\"DebitorName\",\"SemanticType\":1,\"ValueType\":3,\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"DInfSaveOption\":0,\"DClassifyAlias\":\"company.NAME\",\"InboundAlias\":null,\"LoggingFlag\":1,\"InterpretAsMultipleValues\":false,\"ModelType\":0,\"TemplatePath\":null},{\"AttributeTypeId\":\"CITY\",\"AttributeTypeDescription\":\"DebitorCity\",\"SemanticType\":0,\"ValueType\":3,\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"DInfSaveOption\":0,\"DClassifyAlias\":\"company.CITY\",\"InboundAlias\":null,\"LoggingFlag\":1,\"InterpretAsMultipleValues\":false,\"ModelType\":0,\"TemplatePath\":null},{\"AttributeTypeId\":\"STR\",\"AttributeTypeDescription\":\"DebitorStr\",\"SemanticType\":0,\"ValueType\":3,\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"DInfSaveOption\":0,\"DClassifyAlias\":\"company.STR\",\"InboundAlias\":null,\"LoggingFlag\":1,\"InterpretAsMultipleValues\":false,\"ModelType\":0,\"TemplatePath\":null},{\"AttributeTypeId\":\"COUNTRY\",\"AttributeTypeDescription\":\"COUNTRY\",\"SemanticType\":0,\"ValueType\":3,\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"DInfSaveOption\":0,\"DClassifyAlias\":\"company.COUNTRY\",\"InboundAlias\":null,\"LoggingFlag\":1,\"InterpretAsMultipleValues\":false,\"ModelType\":0,\"TemplatePath\":null},{\"AttributeTypeId\":\"DEFAULT_CURRENCY\",\"AttributeTypeDescription\":\"DEFAULT_CURRENCY\",\"SemanticType\":0,\"ValueType\":3,\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"DInfSaveOption\":0,\"DClassifyAlias\":\"company.DEFAULT_CURRENCY\",\"InboundAlias\":null,\"LoggingFlag\":2,\"InterpretAsMultipleValues\":false,\"ModelType\":0,\"TemplatePath\":null},{\"AttributeTypeId\":\"GrossAmount\",\"AttributeTypeDescription\":\"GrossAmount\",\"SemanticType\":0,\"ValueType\":1,\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"DInfSaveOption\":0,\"DClassifyAlias\":\"Betragsdaten.Bruttobetrag\",\"InboundAlias\":null,\"LoggingFlag\":0,\"InterpretAsMultipleValues\":false,\"ModelType\":1,\"TemplatePath\":\"vendor.[TEMPLATE_ID].TrustedAmount\"},{\"AttributeTypeId\":\"NetAmount1\",\"AttributeTypeDescription\":\"NetAmount1\",\"SemanticType\":0,\"ValueType\":1,\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"DInfSaveOption\":0,\"DClassifyAlias\":\"Betragsdaten.Nettobetrag\",\"InboundAlias\":null,\"LoggingFlag\":0,\"InterpretAsMultipleValues\":false,\"ModelType\":1,\"TemplatePath\":\"vendor.[TEMPLATE_ID].TrustedNet1\"},{\"AttributeTypeId\":\"VatAmount1\",\"AttributeTypeDescription\":\"VatAmount1\",\"SemanticType\":0,\"ValueType\":1,\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"DInfSaveOption\":0,\"DClassifyAlias\":\"Betragsdaten.Mehrwertsteuerbetrag\",\"InboundAlias\":null,\"LoggingFlag\":0,\"InterpretAsMultipleValues\":false,\"ModelType\":1,\"TemplatePath\":\"vendor.[TEMPLATE_ID].TrustedVatAmount1\"},{\"AttributeTypeId\":\"VatRate1\",\"AttributeTypeDescription\":\"VatRate1\",\"SemanticType\":0,\"ValueType\":1,\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"DInfSaveOption\":0,\"DClassifyAlias\":\"Betragsdaten.Mehrwertsteuersatz\",\"InboundAlias\":null,\"LoggingFlag\":0,\"InterpretAsMultipleValues\":false,\"ModelType\":1,\"TemplatePath\":\"vendor.[TEMPLATE_ID].TrustedVat1\"},{\"AttributeTypeId\":\"OrderNum\",\"AttributeTypeDescription\":\"OrderNum\",\"SemanticType\":0,\"ValueType\":3,\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"DInfSaveOption\":0,\"DClassifyAlias\":\"orders.ORDER_NUM\",\"InboundAlias\":null,\"LoggingFlag\":0,\"InterpretAsMultipleValues\":true,\"ModelType\":2,\"TemplatePath\":\"basics.ordernumber\"},{\"AttributeTypeId\":\"ProjectNumber\",\"AttributeTypeDescription\":\"ProjectNumber\",\"SemanticType\":0,\"ValueType\":3,\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"DInfSaveOption\":0,\"DClassifyAlias\":\"ProjectNumber\",\"InboundAlias\":null,\"LoggingFlag\":0,\"InterpretAsMultipleValues\":false,\"ModelType\":0,\"TemplatePath\":null},{\"AttributeTypeId\":\"ZIP\",\"AttributeTypeDescription\":\"DebitorZip\",\"SemanticType\":0,\"ValueType\":3,\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"DInfSaveOption\":0,\"DClassifyAlias\":\"company.ZIP\",\"InboundAlias\":null,\"LoggingFlag\":1,\"InterpretAsMultipleValues\":false,\"ModelType\":0,\"TemplatePath\":null},{\"AttributeTypeId\":\"NetAmount2\",\"AttributeTypeDescription\":\"NetAmount2\",\"SemanticType\":0,\"ValueType\":1,\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"DInfSaveOption\":0,\"DClassifyAlias\":\"Betragsdaten.Nettobetrag2\",\"InboundAlias\":null,\"LoggingFlag\":0,\"InterpretAsMultipleValues\":false,\"ModelType\":1,\"TemplatePath\":\"vendor.[TEMPLATE_ID].TrustedNet2\"},{\"AttributeTypeId\":\"VatAmount2\",\"AttributeTypeDescription\":\"VatAmount2\",\"SemanticType\":0,\"ValueType\":1,\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"DInfSaveOption\":0,\"DClassifyAlias\":\"Betragsdaten.Mehrwertsteuerbetrag2\",\"InboundAlias\":null,\"LoggingFlag\":0,\"InterpretAsMultipleValues\":false,\"ModelType\":1,\"TemplatePath\":\"vendor.[TEMPLATE_ID].TrustedVatAmount2\"},{\"AttributeTypeId\":\"VatRate2\",\"AttributeTypeDescription\":\"VatRate2\",\"SemanticType\":0,\"ValueType\":1,\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"DInfSaveOption\":0,\"DClassifyAlias\":\"Betragsdaten.Mehrwertsteuersatz2\",\"InboundAlias\":null,\"LoggingFlag\":0,\"InterpretAsMultipleValues\":false,\"ModelType\":1,\"TemplatePath\":\"vendor.[TEMPLATE_ID].TrustedVat2\"},{\"AttributeTypeId\":\"NetAmount3\",\"AttributeTypeDescription\":\"NetAmount3\",\"SemanticType\":0,\"ValueType\":1,\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"DInfSaveOption\":0,\"DClassifyAlias\":null,\"InboundAlias\":null,\"LoggingFlag\":0,\"InterpretAsMultipleValues\":false,\"ModelType\":0,\"TemplatePath\":null},{\"AttributeTypeId\":\"VatAmount3\",\"AttributeTypeDescription\":\"VatAmount3\",\"SemanticType\":0,\"ValueType\":1,\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"DInfSaveOption\":0,\"DClassifyAlias\":null,\"InboundAlias\":null,\"LoggingFlag\":0,\"InterpretAsMultipleValues\":false,\"ModelType\":0,\"TemplatePath\":null},{\"AttributeTypeId\":\"VatRate3\",\"AttributeTypeDescription\":\"VatRate3\",\"SemanticType\":0,\"ValueType\":1,\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"DInfSaveOption\":0,\"DClassifyAlias\":null,\"InboundAlias\":null,\"LoggingFlag\":0,\"InterpretAsMultipleValues\":false,\"ModelType\":0,\"TemplatePath\":null},{\"AttributeTypeId\":\"AdditionalCosts\",\"AttributeTypeDescription\":\"AdditionalCosts\",\"SemanticType\":0,\"ValueType\":1,\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"DInfSaveOption\":0,\"DClassifyAlias\":\"deliverycosts\",\"InboundAlias\":null,\"LoggingFlag\":0,\"InterpretAsMultipleValues\":false,\"ModelType\":0,\"TemplatePath\":null},{\"AttributeTypeId\":\"Discount\",\"AttributeTypeDescription\":\"Discount\",\"SemanticType\":0,\"ValueType\":1,\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"DInfSaveOption\":0,\"DClassifyAlias\":null,\"InboundAlias\":null,\"LoggingFlag\":0,\"InterpretAsMultipleValues\":false,\"ModelType\":0,\"TemplatePath\":null},{\"AttributeTypeId\":\"Issuer\",\"AttributeTypeDescription\":\"Issuer\",\"SemanticType\":0,\"ValueType\":3,\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"DInfSaveOption\":0,\"DClassifyAlias\":null,\"InboundAlias\":null,\"LoggingFlag\":1,\"InterpretAsMultipleValues\":false,\"ModelType\":0,\"TemplatePath\":null},{\"AttributeTypeId\":\"Advisor\",\"AttributeTypeDescription\":\"Advisor\",\"SemanticType\":0,\"ValueType\":3,\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"DInfSaveOption\":0,\"DClassifyAlias\":null,\"InboundAlias\":null,\"LoggingFlag\":1,\"InterpretAsMultipleValues\":false,\"ModelType\":0,\"TemplatePath\":null},{\"AttributeTypeId\":\"Email\",\"AttributeTypeDescription\":\"Email\",\"SemanticType\":0,\"ValueType\":3,\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"DInfSaveOption\":0,\"DClassifyAlias\":null,\"InboundAlias\":null,\"LoggingFlag\":1,\"InterpretAsMultipleValues\":false,\"ModelType\":0,\"TemplatePath\":null},{\"AttributeTypeId\":\"TermOfPayment\",\"AttributeTypeDescription\":\"TermOfPayment\",\"SemanticType\":0,\"ValueType\":3,\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"DInfSaveOption\":0,\"DClassifyAlias\":null,\"InboundAlias\":null,\"LoggingFlag\":1,\"InterpretAsMultipleValues\":false,\"ModelType\":0,\"TemplatePath\":null},{\"AttributeTypeId\":\"GrossAmountCurrency\",\"AttributeTypeDescription\":\"GrossAmountCurrency\",\"SemanticType\":0,\"ValueType\":5,\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"DInfSaveOption\":0,\"DClassifyAlias\":\"currency\",\"InboundAlias\":null,\"LoggingFlag\":0,\"InterpretAsMultipleValues\":false,\"ModelType\":1,\"TemplatePath\":\"vendor.[TEMPLATE_ID].currency\"},{\"AttributeTypeId\":\"DocumentType\",\"AttributeTypeDescription\":\"DocumentType\",\"SemanticType\":0,\"ValueType\":5,\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"DInfSaveOption\":0,\"DClassifyAlias\":\"documenttype\",\"InboundAlias\":null,\"LoggingFlag\":0,\"InterpretAsMultipleValues\":false,\"ModelType\":1,\"TemplatePath\":\"vendor.[TEMPLATE_ID].Documenttype\"},{\"AttributeTypeId\":\"DocumentUID\",\"AttributeTypeDescription\":\"DocumentUID\",\"SemanticType\":16,\"ValueType\":3,\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"DInfSaveOption\":0,\"DClassifyAlias\":null,\"InboundAlias\":null,\"LoggingFlag\":1,\"InterpretAsMultipleValues\":false,\"ModelType\":0,\"TemplatePath\":null},{\"AttributeTypeId\":\"PerformanceDate\",\"AttributeTypeDescription\":\"PerformanceDate\",\"SemanticType\":0,\"ValueType\":2,\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"DInfSaveOption\":0,\"DClassifyAlias\":\"performancedate.date\",\"InboundAlias\":null,\"LoggingFlag\":0,\"InterpretAsMultipleValues\":false,\"ModelType\":1,\"TemplatePath\":\"vendor.[TEMPLATE_ID].performancedate\"},{\"AttributeTypeId\":\"BookingDate\",\"AttributeTypeDescription\":\"BookingDate\",\"SemanticType\":0,\"ValueType\":2,\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"DInfSaveOption\":0,\"DClassifyAlias\":\"performancedate.date\",\"InboundAlias\":null,\"LoggingFlag\":0,\"InterpretAsMultipleValues\":false,\"ModelType\":0,\"TemplatePath\":null},{\"AttributeTypeId\":\"VENDOR_REGISTRATION_ID\",\"AttributeTypeDescription\":\"VENDOR_REGISTRATION_ID\",\"SemanticType\":0,\"ValueType\":3,\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"DInfSaveOption\":0,\"DClassifyAlias\":\"vendor.VENDOR_REGISTRATION_ID\",\"InboundAlias\":null,\"LoggingFlag\":1,\"InterpretAsMultipleValues\":false,\"ModelType\":0,\"TemplatePath\":null},{\"AttributeTypeId\":\"AutoRoutingFlag\",\"AttributeTypeDescription\":\"AutoRoutingFlag\",\"SemanticType\":0,\"ValueType\":3,\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"DInfSaveOption\":0,\"DClassifyAlias\":\"extended_vendor_settings.AutoRoutingFlag\",\"InboundAlias\":null,\"LoggingFlag\":1,\"InterpretAsMultipleValues\":false,\"ModelType\":0,\"TemplatePath\":null},{\"AttributeTypeId\":\"QR-IBAN\",\"AttributeTypeDescription\":\"QR-IBAN\",\"SemanticType\":0,\"ValueType\":3,\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"DInfSaveOption\":0,\"DClassifyAlias\":\"QR-IBAN\",\"InboundAlias\":null,\"LoggingFlag\":1,\"InterpretAsMultipleValues\":false,\"ModelType\":0,\"TemplatePath\":null},{\"AttributeTypeId\":\"QR-REFERENCE\",\"AttributeTypeDescription\":\"QR-REFERENCE\",\"SemanticType\":0,\"ValueType\":3,\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"DInfSaveOption\":0,\"DClassifyAlias\":\"QR-REFERENCE\",\"InboundAlias\":null,\"LoggingFlag\":1,\"InterpretAsMultipleValues\":false,\"ModelType\":0,\"TemplatePath\":null},{\"AttributeTypeId\":\"Custom1\",\"AttributeTypeDescription\":\"Custom1\",\"SemanticType\":0,\"ValueType\":3,\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"DInfSaveOption\":0,\"DClassifyAlias\":\"Custom1\",\"InboundAlias\":null,\"LoggingFlag\":2,\"InterpretAsMultipleValues\":false,\"ModelType\":2,\"TemplatePath\":\"custom1\"},{\"AttributeTypeId\":\"Custom2\",\"AttributeTypeDescription\":\"Custom2\",\"SemanticType\":0,\"ValueType\":3,\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"DInfSaveOption\":0,\"DClassifyAlias\":\"Custom2\",\"InboundAlias\":null,\"LoggingFlag\":2,\"InterpretAsMultipleValues\":false,\"ModelType\":2,\"TemplatePath\":\"custom2\"},{\"AttributeTypeId\":\"Custom3\",\"AttributeTypeDescription\":\"Custom3\",\"SemanticType\":0,\"ValueType\":3,\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"DInfSaveOption\":0,\"DClassifyAlias\":\"Custom3\",\"InboundAlias\":null,\"LoggingFlag\":2,\"InterpretAsMultipleValues\":false,\"ModelType\":1,\"TemplatePath\":\"vendor.[TEMPLATE_ID].custom3\"},{\"AttributeTypeId\":\"Custom4\",\"AttributeTypeDescription\":\"Custom4\",\"SemanticType\":0,\"ValueType\":3,\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"DInfSaveOption\":0,\"DClassifyAlias\":\"Custom4\",\"InboundAlias\":null,\"LoggingFlag\":2,\"InterpretAsMultipleValues\":false,\"ModelType\":1,\"TemplatePath\":\"vendor.[TEMPLATE_ID].custom4\"},{\"AttributeTypeId\":\"Custom5\",\"AttributeTypeDescription\":\"Custom5\",\"SemanticType\":0,\"ValueType\":3,\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"DInfSaveOption\":0,\"DClassifyAlias\":\"Custom5\",\"InboundAlias\":null,\"LoggingFlag\":2,\"InterpretAsMultipleValues\":false,\"ModelType\":0,\"TemplatePath\":null},{\"AttributeTypeId\":\"Custom6\",\"AttributeTypeDescription\":\"Custom6\",\"SemanticType\":0,\"ValueType\":3,\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"DInfSaveOption\":0,\"DClassifyAlias\":\"Custom6\",\"InboundAlias\":null,\"LoggingFlag\":2,\"InterpretAsMultipleValues\":false,\"ModelType\":0,\"TemplatePath\":null},{\"AttributeTypeId\":\"Custom7\",\"AttributeTypeDescription\":\"Custom7\",\"SemanticType\":0,\"ValueType\":3,\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"DInfSaveOption\":0,\"DClassifyAlias\":\"Custom7\",\"InboundAlias\":null,\"LoggingFlag\":2,\"InterpretAsMultipleValues\":false,\"ModelType\":0,\"TemplatePath\":null},{\"AttributeTypeId\":\"Custom8\",\"AttributeTypeDescription\":\"Custom8\",\"SemanticType\":0,\"ValueType\":3,\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"DInfSaveOption\":0,\"DClassifyAlias\":\"Custom8\",\"InboundAlias\":null,\"LoggingFlag\":2,\"InterpretAsMultipleValues\":false,\"ModelType\":0,\"TemplatePath\":null},{\"AttributeTypeId\":\"Custom9\",\"AttributeTypeDescription\":\"Custom9\",\"SemanticType\":0,\"ValueType\":3,\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"DInfSaveOption\":0,\"DClassifyAlias\":\"Custom9\",\"InboundAlias\":null,\"LoggingFlag\":2,\"InterpretAsMultipleValues\":false,\"ModelType\":0,\"TemplatePath\":null},{\"AttributeTypeId\":\"Custom10\",\"AttributeTypeDescription\":\"Custom10\",\"SemanticType\":0,\"ValueType\":3,\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"DInfSaveOption\":0,\"DClassifyAlias\":\"Custom10\",\"InboundAlias\":null,\"LoggingFlag\":2,\"InterpretAsMultipleValues\":false,\"ModelType\":0,\"TemplatePath\":null},{\"AttributeTypeId\":\"Custom11\",\"AttributeTypeDescription\":\"Custom11\",\"SemanticType\":0,\"ValueType\":3,\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"DInfSaveOption\":1,\"DClassifyAlias\":\"Custom11\",\"InboundAlias\":null,\"LoggingFlag\":2,\"InterpretAsMultipleValues\":false,\"ModelType\":0,\"TemplatePath\":null},{\"AttributeTypeId\":\"Custom12\",\"AttributeTypeDescription\":\"Custom12\",\"SemanticType\":0,\"ValueType\":3,\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"DInfSaveOption\":1,\"DClassifyAlias\":\"Custom12\",\"InboundAlias\":null,\"LoggingFlag\":2,\"InterpretAsMultipleValues\":false,\"ModelType\":0,\"TemplatePath\":null},{\"AttributeTypeId\":\"Custom13\",\"AttributeTypeDescription\":\"Custom13\",\"SemanticType\":0,\"ValueType\":3,\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"DInfSaveOption\":1,\"DClassifyAlias\":\"Custom13\",\"InboundAlias\":null,\"LoggingFlag\":2,\"InterpretAsMultipleValues\":false,\"ModelType\":0,\"TemplatePath\":null},{\"AttributeTypeId\":\"Custom14\",\"AttributeTypeDescription\":\"Custom14\",\"SemanticType\":0,\"ValueType\":3,\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"DInfSaveOption\":1,\"DClassifyAlias\":\"Custom14\",\"InboundAlias\":null,\"LoggingFlag\":2,\"InterpretAsMultipleValues\":false,\"ModelType\":0,\"TemplatePath\":null},{\"AttributeTypeId\":\"Custom15\",\"AttributeTypeDescription\":\"Custom15\",\"SemanticType\":0,\"ValueType\":3,\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"DInfSaveOption\":1,\"DClassifyAlias\":\"Custom15\",\"InboundAlias\":null,\"LoggingFlag\":2,\"InterpretAsMultipleValues\":false,\"ModelType\":0,\"TemplatePath\":null},{\"AttributeTypeId\":\"Custom16\",\"AttributeTypeDescription\":\"Custom16\",\"SemanticType\":0,\"ValueType\":3,\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"DInfSaveOption\":1,\"DClassifyAlias\":\"Custom16\",\"InboundAlias\":null,\"LoggingFlag\":2,\"InterpretAsMultipleValues\":false,\"ModelType\":0,\"TemplatePath\":null},{\"AttributeTypeId\":\"Custom17\",\"AttributeTypeDescription\":\"Custom17\",\"SemanticType\":0,\"ValueType\":3,\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"DInfSaveOption\":1,\"DClassifyAlias\":\"Custom17\",\"InboundAlias\":null,\"LoggingFlag\":2,\"InterpretAsMultipleValues\":false,\"ModelType\":0,\"TemplatePath\":null},{\"AttributeTypeId\":\"Custom18\",\"AttributeTypeDescription\":\"Custom18\",\"SemanticType\":0,\"ValueType\":3,\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"DInfSaveOption\":1,\"DClassifyAlias\":\"Custom18\",\"InboundAlias\":null,\"LoggingFlag\":2,\"InterpretAsMultipleValues\":false,\"ModelType\":0,\"TemplatePath\":null},{\"AttributeTypeId\":\"Custom19\",\"AttributeTypeDescription\":\"Custom19\",\"SemanticType\":0,\"ValueType\":3,\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"DInfSaveOption\":1,\"DClassifyAlias\":\"Custom19\",\"InboundAlias\":null,\"LoggingFlag\":2,\"InterpretAsMultipleValues\":false,\"ModelType\":0,\"TemplatePath\":null},{\"AttributeTypeId\":\"Custom20\",\"AttributeTypeDescription\":\"Custom20\",\"SemanticType\":0,\"ValueType\":3,\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"DInfSaveOption\":1,\"DClassifyAlias\":\"Custom20\",\"InboundAlias\":null,\"LoggingFlag\":2,\"InterpretAsMultipleValues\":false,\"ModelType\":0,\"TemplatePath\":null},{\"AttributeTypeId\":\"Inbound_creatorName\",\"AttributeTypeDescription\":\"InboundCreatorName\",\"SemanticType\":0,\"ValueType\":3,\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"DInfSaveOption\":1,\"DClassifyAlias\":null,\"InboundAlias\":null,\"LoggingFlag\":1,\"InterpretAsMultipleValues\":false,\"ModelType\":0,\"TemplatePath\":null},{\"AttributeTypeId\":\"Inbound_importProcessname\",\"AttributeTypeDescription\":\"InboundImportProcessname\",\"SemanticType\":0,\"ValueType\":3,\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"DInfSaveOption\":1,\"DClassifyAlias\":null,\"InboundAlias\":null,\"LoggingFlag\":1,\"InterpretAsMultipleValues\":false,\"ModelType\":0,\"TemplatePath\":null},{\"AttributeTypeId\":\"Inbound_importProcessId\",\"AttributeTypeDescription\":\"InboundImportProcessId\",\"SemanticType\":0,\"ValueType\":3,\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"DInfSaveOption\":1,\"DClassifyAlias\":null,\"InboundAlias\":null,\"LoggingFlag\":1,\"InterpretAsMultipleValues\":false,\"ModelType\":0,\"TemplatePath\":null},{\"AttributeTypeId\":\"Inbound_importDateTime\",\"AttributeTypeDescription\":\"InboundImportDateTime\",\"SemanticType\":0,\"ValueType\":3,\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"DInfSaveOption\":1,\"DClassifyAlias\":null,\"InboundAlias\":null,\"LoggingFlag\":1,\"InterpretAsMultipleValues\":false,\"ModelType\":0,\"TemplatePath\":null},{\"AttributeTypeId\":\"Inbound_documentName\",\"AttributeTypeDescription\":\"InboundDocumentName\",\"SemanticType\":0,\"ValueType\":3,\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"DInfSaveOption\":1,\"DClassifyAlias\":null,\"InboundAlias\":null,\"LoggingFlag\":1,\"InterpretAsMultipleValues\":false,\"ModelType\":0,\"TemplatePath\":null},{\"AttributeTypeId\":\"Inbound_documentCategoryId\",\"AttributeTypeDescription\":\"InboundDocumentCategoryId\",\"SemanticType\":0,\"ValueType\":3,\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"DInfSaveOption\":1,\"DClassifyAlias\":null,\"InboundAlias\":null,\"LoggingFlag\":1,\"InterpretAsMultipleValues\":false,\"ModelType\":0,\"TemplatePath\":null},{\"AttributeTypeId\":\"Inbound_documentCategoryName\",\"AttributeTypeDescription\":\"InboundDocumentCategoryName\",\"SemanticType\":0,\"ValueType\":3,\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"DInfSaveOption\":1,\"DClassifyAlias\":null,\"InboundAlias\":null,\"LoggingFlag\":1,\"InterpretAsMultipleValues\":false,\"ModelType\":0,\"TemplatePath\":null},{\"AttributeTypeId\":\"DocumentGUID\",\"AttributeTypeDescription\":\"DocumentGUID\",\"SemanticType\":0,\"ValueType\":6,\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"DInfSaveOption\":0,\"DClassifyAlias\":null,\"InboundAlias\":null,\"LoggingFlag\":2,\"InterpretAsMultipleValues\":false,\"ModelType\":0,\"TemplatePath\":null},{\"AttributeTypeId\":\"OriginalFileName\",\"AttributeTypeDescription\":\"OriginalFileName\",\"SemanticType\":0,\"ValueType\":6,\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"DInfSaveOption\":0,\"DClassifyAlias\":null,\"InboundAlias\":null,\"LoggingFlag\":1,\"InterpretAsMultipleValues\":false,\"ModelType\":0,\"TemplatePath\":null},{\"AttributeTypeId\":\"BatchCreator\",\"AttributeTypeDescription\":\"BatchCreator\",\"SemanticType\":0,\"ValueType\":6,\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"DInfSaveOption\":0,\"DClassifyAlias\":null,\"InboundAlias\":null,\"LoggingFlag\":1,\"InterpretAsMultipleValues\":false,\"ModelType\":0,\"TemplatePath\":null},{\"AttributeTypeId\":\"BatchEditor\",\"AttributeTypeDescription\":\"BatchEditor\",\"SemanticType\":0,\"ValueType\":6,\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"DInfSaveOption\":0,\"DClassifyAlias\":null,\"InboundAlias\":null,\"LoggingFlag\":1,\"InterpretAsMultipleValues\":false,\"ModelType\":0,\"TemplatePath\":null},{\"AttributeTypeId\":\"CH_QR_IBAN\",\"AttributeTypeDescription\":\"CH_QR_IBAN\",\"SemanticType\":0,\"ValueType\":3,\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"DInfSaveOption\":0,\"DClassifyAlias\":null,\"InboundAlias\":null,\"LoggingFlag\":1,\"InterpretAsMultipleValues\":false,\"ModelType\":0,\"TemplatePath\":null},{\"AttributeTypeId\":\"CH_QR_TYPE\",\"AttributeTypeDescription\":\"CH_QR_TYPE\",\"SemanticType\":0,\"ValueType\":3,\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"DInfSaveOption\":0,\"DClassifyAlias\":null,\"InboundAlias\":null,\"LoggingFlag\":1,\"InterpretAsMultipleValues\":false,\"ModelType\":0,\"TemplatePath\":null},{\"AttributeTypeId\":\"CH_QR_REFERENCE\",\"AttributeTypeDescription\":\"CH_QR_REFERENCE\",\"SemanticType\":0,\"ValueType\":3,\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"DInfSaveOption\":0,\"DClassifyAlias\":null,\"InboundAlias\":null,\"LoggingFlag\":1,\"InterpretAsMultipleValues\":false,\"ModelType\":0,\"TemplatePath\":null},{\"AttributeTypeId\":\"CH_QR_AMOUNT\",\"AttributeTypeDescription\":\"CH_QR_AMOUNT\",\"SemanticType\":0,\"ValueType\":3,\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"DInfSaveOption\":0,\"DClassifyAlias\":null,\"InboundAlias\":null,\"LoggingFlag\":1,\"InterpretAsMultipleValues\":false,\"ModelType\":0,\"TemplatePath\":null},{\"AttributeTypeId\":\"CH_QR_CURENCY\",\"AttributeTypeDescription\":\"CH_QR_CURENCY\",\"SemanticType\":0,\"ValueType\":3,\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"DInfSaveOption\":0,\"DClassifyAlias\":null,\"InboundAlias\":null,\"LoggingFlag\":1,\"InterpretAsMultipleValues\":false,\"ModelType\":0,\"TemplatePath\":null},{\"AttributeTypeId\":\"CH_QR_DESCR_MESSAGE\",\"AttributeTypeDescription\":\"CH_QR_DESCR_MESSAGE\",\"SemanticType\":0,\"ValueType\":3,\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"DInfSaveOption\":0,\"DClassifyAlias\":null,\"InboundAlias\":null,\"LoggingFlag\":1,\"InterpretAsMultipleValues\":false,\"ModelType\":0,\"TemplatePath\":null},{\"AttributeTypeId\":\"CH_QR_DESCR_INFO\",\"AttributeTypeDescription\":\"CH_QR_DESCR_INFO\",\"SemanticType\":0,\"ValueType\":3,\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"DInfSaveOption\":0,\"DClassifyAlias\":null,\"InboundAlias\":null,\"LoggingFlag\":1,\"InterpretAsMultipleValues\":false,\"ModelType\":0,\"TemplatePath\":null},{\"AttributeTypeId\":\"CH_QR_CODE\",\"AttributeTypeDescription\":\"CH_QR_CODE\",\"SemanticType\":0,\"ValueType\":3,\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"DInfSaveOption\":0,\"DClassifyAlias\":null,\"InboundAlias\":null,\"LoggingFlag\":1,\"InterpretAsMultipleValues\":false,\"ModelType\":0,\"TemplatePath\":null},{\"AttributeTypeId\":\"CH_ESR_LINE\",\"AttributeTypeDescription\":\"CH_ESR_LINE\",\"SemanticType\":0,\"ValueType\":3,\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"DInfSaveOption\":0,\"DClassifyAlias\":\"ESLine.ESCodezeile\",\"InboundAlias\":null,\"LoggingFlag\":1,\"InterpretAsMultipleValues\":false,\"ModelType\":0,\"TemplatePath\":null},{\"AttributeTypeId\":\"$DocumentRole$\",\"AttributeTypeDescription\":\"$DocumentRole$\",\"SemanticType\":19,\"ValueType\":3,\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"DInfSaveOption\":1,\"DClassifyAlias\":\"document-role\",\"InboundAlias\":null,\"LoggingFlag\":0,\"InterpretAsMultipleValues\":false,\"ModelType\":0,\"TemplatePath\":null}],\"AttributeTypeStructureDefinitions\":[{\"StructureName\":\"positions\",\"Description\":null,\"DClassifyAlias\":\"Positionen\",\"AttributeTypes\":[{\"AttributeTypeId\":\"Pos.OrderNum\",\"AttributeTypeDescription\":\"Pos.OrderNum\",\"SemanticType\":0,\"ValueType\":3,\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"DInfSaveOption\":0,\"DClassifyAlias\":\"ordernumber\",\"InboundAlias\":null,\"LoggingFlag\":0,\"InterpretAsMultipleValues\":false,\"ModelType\":0,\"TemplatePath\":null},{\"AttributeTypeId\":\"Pos.UPrice\",\"AttributeTypeDescription\":\"Pos.UPrice\",\"SemanticType\":0,\"ValueType\":1,\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"DInfSaveOption\":0,\"DClassifyAlias\":\"unitprice\",\"InboundAlias\":null,\"LoggingFlag\":0,\"InterpretAsMultipleValues\":false,\"ModelType\":1,\"TemplatePath\":\"vendor.[TEMPLATE_ID].Positionstemplate.PosUPrice\"},{\"AttributeTypeId\":\"Pos.SPrice\",\"AttributeTypeDescription\":\"Pos.SPrice\",\"SemanticType\":0,\"ValueType\":1,\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"DInfSaveOption\":0,\"DClassifyAlias\":\"totalamount\",\"InboundAlias\":null,\"LoggingFlag\":0,\"InterpretAsMultipleValues\":false,\"ModelType\":1,\"TemplatePath\":\"vendor.[TEMPLATE_ID].Positionstemplate.PosSPrice\"},{\"AttributeTypeId\":\"Pos.Quantity\",\"AttributeTypeDescription\":\"Pos.Quantity\",\"SemanticType\":0,\"ValueType\":1,\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"DInfSaveOption\":0,\"DClassifyAlias\":\"quantity\",\"InboundAlias\":null,\"LoggingFlag\":0,\"InterpretAsMultipleValues\":false,\"ModelType\":1,\"TemplatePath\":\"vendor.[TEMPLATE_ID].Positionstemplate.PosQuantity\"},{\"AttributeTypeId\":\"Pos.OrderPos\",\"AttributeTypeDescription\":\"Pos.OrderPos\",\"SemanticType\":0,\"ValueType\":3,\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"DInfSaveOption\":0,\"DClassifyAlias\":\"order_item-number\",\"InboundAlias\":null,\"LoggingFlag\":0,\"InterpretAsMultipleValues\":false,\"ModelType\":1,\"TemplatePath\":\"vendor.[TEMPLATE_ID].Positionstemplate.BestellPosnum\"},{\"AttributeTypeId\":\"Pos.DeliveryNote\",\"AttributeTypeDescription\":\"Pos.DeliveryNote\",\"SemanticType\":0,\"ValueType\":3,\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"DInfSaveOption\":0,\"DClassifyAlias\":\"delivery-number\",\"InboundAlias\":null,\"LoggingFlag\":0,\"InterpretAsMultipleValues\":false,\"ModelType\":0,\"TemplatePath\":null},{\"AttributeTypeId\":\"Pos.Article\",\"AttributeTypeDescription\":\"Pos.Article\",\"SemanticType\":0,\"ValueType\":3,\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"DInfSaveOption\":0,\"DClassifyAlias\":\"material-number\",\"InboundAlias\":null,\"LoggingFlag\":0,\"InterpretAsMultipleValues\":false,\"ModelType\":1,\"TemplatePath\":\"vendor.[TEMPLATE_ID].Positionstemplate.MaterialNumber\"},{\"AttributeTypeId\":\"Pos.Description\",\"AttributeTypeDescription\":\"Pos.Description\",\"SemanticType\":0,\"ValueType\":3,\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"DInfSaveOption\":0,\"DClassifyAlias\":\"description\",\"InboundAlias\":null,\"LoggingFlag\":1,\"InterpretAsMultipleValues\":false,\"ModelType\":1,\"TemplatePath\":\"vendor.[TEMPLATE_ID].Positionstemplate.Description\"},{\"AttributeTypeId\":\"Pos.CostCenter\",\"AttributeTypeDescription\":\"Pos.CostCenter\",\"SemanticType\":0,\"ValueType\":3,\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"DInfSaveOption\":0,\"DClassifyAlias\":null,\"InboundAlias\":null,\"LoggingFlag\":1,\"InterpretAsMultipleValues\":false,\"ModelType\":0,\"TemplatePath\":null},{\"AttributeTypeId\":\"Pos.CostUnit\",\"AttributeTypeDescription\":\"Pos.CostUnit\",\"SemanticType\":0,\"ValueType\":3,\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"DInfSaveOption\":0,\"DClassifyAlias\":null,\"InboundAlias\":null,\"LoggingFlag\":1,\"InterpretAsMultipleValues\":false,\"ModelType\":0,\"TemplatePath\":null},{\"AttributeTypeId\":\"Pos.GLAccount\",\"AttributeTypeDescription\":\"Pos.GLAccount\",\"SemanticType\":0,\"ValueType\":3,\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"DInfSaveOption\":0,\"DClassifyAlias\":null,\"InboundAlias\":null,\"LoggingFlag\":1,\"InterpretAsMultipleValues\":false,\"ModelType\":0,\"TemplatePath\":null},{\"AttributeTypeId\":\"Pos.Custom1\",\"AttributeTypeDescription\":\"Pos.Custom1\",\"SemanticType\":0,\"ValueType\":3,\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"DInfSaveOption\":0,\"DClassifyAlias\":\"Pos.Custom1\",\"InboundAlias\":null,\"LoggingFlag\":1,\"InterpretAsMultipleValues\":false,\"ModelType\":0,\"TemplatePath\":null},{\"AttributeTypeId\":\"Pos.Custom2\",\"AttributeTypeDescription\":\"Pos.Custom2\",\"SemanticType\":0,\"ValueType\":3,\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"DInfSaveOption\":0,\"DClassifyAlias\":\"Pos.Custom2\",\"InboundAlias\":null,\"LoggingFlag\":1,\"InterpretAsMultipleValues\":false,\"ModelType\":0,\"TemplatePath\":null},{\"AttributeTypeId\":\"Pos.Custom3\",\"AttributeTypeDescription\":\"Pos.Custom3\",\"SemanticType\":0,\"ValueType\":3,\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"DInfSaveOption\":0,\"DClassifyAlias\":\"Pos.Custom3\",\"InboundAlias\":null,\"LoggingFlag\":1,\"InterpretAsMultipleValues\":false,\"ModelType\":0,\"TemplatePath\":null},{\"AttributeTypeId\":\"Pos.Custom4\",\"AttributeTypeDescription\":\"Pos.Custom4\",\"SemanticType\":0,\"ValueType\":3,\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"DInfSaveOption\":0,\"DClassifyAlias\":\"Pos.Custom4\",\"InboundAlias\":null,\"LoggingFlag\":1,\"InterpretAsMultipleValues\":false,\"ModelType\":0,\"TemplatePath\":null},{\"AttributeTypeId\":\"Pos.Custom5\",\"AttributeTypeDescription\":\"Pos.Custom5\",\"SemanticType\":0,\"ValueType\":3,\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"DInfSaveOption\":0,\"DClassifyAlias\":\"Pos.Custom5\",\"InboundAlias\":null,\"LoggingFlag\":1,\"InterpretAsMultipleValues\":false,\"ModelType\":0,\"TemplatePath\":null},{\"AttributeTypeId\":\"Pos.Custom6\",\"AttributeTypeDescription\":\"Pos.Custom6\",\"SemanticType\":0,\"ValueType\":3,\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"DInfSaveOption\":0,\"DClassifyAlias\":\"Pos.Custom6\",\"InboundAlias\":null,\"LoggingFlag\":1,\"InterpretAsMultipleValues\":false,\"ModelType\":0,\"TemplatePath\":null},{\"AttributeTypeId\":\"Pos.Custom7\",\"AttributeTypeDescription\":\"Pos.Custom7\",\"SemanticType\":0,\"ValueType\":3,\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"DInfSaveOption\":0,\"DClassifyAlias\":\"Pos.Custom7\",\"InboundAlias\":null,\"LoggingFlag\":1,\"InterpretAsMultipleValues\":false,\"ModelType\":0,\"TemplatePath\":null},{\"AttributeTypeId\":\"Pos.Custom8\",\"AttributeTypeDescription\":\"Pos.Custom8\",\"SemanticType\":0,\"ValueType\":3,\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"DInfSaveOption\":0,\"DClassifyAlias\":\"Pos.Custom8\",\"InboundAlias\":null,\"LoggingFlag\":1,\"InterpretAsMultipleValues\":false,\"ModelType\":0,\"TemplatePath\":null},{\"AttributeTypeId\":\"Pos.Custom9\",\"AttributeTypeDescription\":\"Pos.Custom9\",\"SemanticType\":0,\"ValueType\":3,\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"DInfSaveOption\":0,\"DClassifyAlias\":\"Pos.Custom9\",\"InboundAlias\":null,\"LoggingFlag\":1,\"InterpretAsMultipleValues\":false,\"ModelType\":0,\"TemplatePath\":null},{\"AttributeTypeId\":\"Pos.Custom10\",\"AttributeTypeDescription\":\"Pos.Custom10\",\"SemanticType\":0,\"ValueType\":3,\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"DInfSaveOption\":0,\"DClassifyAlias\":\"Pos.Custom10\",\"InboundAlias\":null,\"LoggingFlag\":1,\"InterpretAsMultipleValues\":false,\"ModelType\":0,\"TemplatePath\":null},{\"AttributeTypeId\":\"Pos.Custom11\",\"AttributeTypeDescription\":\"Pos.Custom11\",\"SemanticType\":0,\"ValueType\":3,\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"DInfSaveOption\":0,\"DClassifyAlias\":\"Pos.Custom11\",\"InboundAlias\":null,\"LoggingFlag\":1,\"InterpretAsMultipleValues\":false,\"ModelType\":0,\"TemplatePath\":null},{\"AttributeTypeId\":\"Pos.Custom12\",\"AttributeTypeDescription\":\"Pos.Custom12\",\"SemanticType\":0,\"ValueType\":3,\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"DInfSaveOption\":0,\"DClassifyAlias\":\"Pos.Custom12\",\"InboundAlias\":null,\"LoggingFlag\":1,\"InterpretAsMultipleValues\":false,\"ModelType\":0,\"TemplatePath\":null},{\"AttributeTypeId\":\"Pos.Custom13\",\"AttributeTypeDescription\":\"Pos.Custom13\",\"SemanticType\":0,\"ValueType\":3,\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"DInfSaveOption\":0,\"DClassifyAlias\":\"Pos.Custom13\",\"InboundAlias\":null,\"LoggingFlag\":1,\"InterpretAsMultipleValues\":false,\"ModelType\":0,\"TemplatePath\":null},{\"AttributeTypeId\":\"Pos.Custom14\",\"AttributeTypeDescription\":\"Pos.Custom14\",\"SemanticType\":0,\"ValueType\":3,\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"DInfSaveOption\":0,\"DClassifyAlias\":\"Pos.Custom14\",\"InboundAlias\":null,\"LoggingFlag\":1,\"InterpretAsMultipleValues\":false,\"ModelType\":0,\"TemplatePath\":null},{\"AttributeTypeId\":\"Pos.Custom15\",\"AttributeTypeDescription\":\"Pos.Custom15\",\"SemanticType\":0,\"ValueType\":3,\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"DInfSaveOption\":0,\"DClassifyAlias\":\"Pos.Custom15\",\"InboundAlias\":null,\"LoggingFlag\":1,\"InterpretAsMultipleValues\":false,\"ModelType\":0,\"TemplatePath\":null},{\"AttributeTypeId\":\"Pos.Custom16\",\"AttributeTypeDescription\":\"Pos.Custom16\",\"SemanticType\":0,\"ValueType\":3,\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"DInfSaveOption\":0,\"DClassifyAlias\":\"Pos.Custom16\",\"InboundAlias\":null,\"LoggingFlag\":1,\"InterpretAsMultipleValues\":false,\"ModelType\":0,\"TemplatePath\":null},{\"AttributeTypeId\":\"Pos.Custom17\",\"AttributeTypeDescription\":\"Pos.Custom17\",\"SemanticType\":0,\"ValueType\":3,\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"DInfSaveOption\":0,\"DClassifyAlias\":\"Pos.Custom17\",\"InboundAlias\":null,\"LoggingFlag\":1,\"InterpretAsMultipleValues\":false,\"ModelType\":0,\"TemplatePath\":null},{\"AttributeTypeId\":\"Pos.Custom18\",\"AttributeTypeDescription\":\"Pos.Custom18\",\"SemanticType\":0,\"ValueType\":3,\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"DInfSaveOption\":0,\"DClassifyAlias\":\"Pos.Custom18\",\"InboundAlias\":null,\"LoggingFlag\":1,\"InterpretAsMultipleValues\":false,\"ModelType\":0,\"TemplatePath\":null},{\"AttributeTypeId\":\"Pos.Custom19\",\"AttributeTypeDescription\":\"Pos.Custom19\",\"SemanticType\":0,\"ValueType\":3,\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"DInfSaveOption\":0,\"DClassifyAlias\":\"Pos.Custom19\",\"InboundAlias\":null,\"LoggingFlag\":1,\"InterpretAsMultipleValues\":false,\"ModelType\":0,\"TemplatePath\":null},{\"AttributeTypeId\":\"Pos.Custom20\",\"AttributeTypeDescription\":\"Pos.Custom20\",\"SemanticType\":0,\"ValueType\":3,\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"DInfSaveOption\":0,\"DClassifyAlias\":\"Pos.Custom20\",\"InboundAlias\":null,\"LoggingFlag\":1,\"InterpretAsMultipleValues\":false,\"ModelType\":0,\"TemplatePath\":null},{\"AttributeTypeId\":\"Pos.Zone\",\"AttributeTypeDescription\":\"Pos.Zone\",\"SemanticType\":0,\"ValueType\":3,\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"DInfSaveOption\":0,\"DClassifyAlias\":null,\"InboundAlias\":null,\"LoggingFlag\":2,\"InterpretAsMultipleValues\":false,\"ModelType\":1,\"TemplatePath\":\"vendor.[TEMPLATE_ID].Positionstemplate.PosZone\"}]}],\"AttributeGroups\":[{\"GroupID\":0,\"GroupDescription\":\"Client\",\"MinifiedView\":true,\"AttributeDefinitions\":[{\"AttributeID\":\"DEBITOR_NUM\",\"Description\":\"\",\"LocalizedDescriptions\":{},\"AttributeLabel\":null,\"AttributeIcon\":null,\"AttributeType\":0,\"Required\":true,\"ReadOnly\":false,\"DoAlignStart\":true,\"DefaultValue\":null,\"Values\":[],\"ColumnSizePercent\":0,\"MinLength\":0,\"MaxLength\":0,\"SizeDesktop\":3,\"SizeTablet\":3,\"SizePhone\":4,\"Minified\":{\"SizeDesktop\":3,\"SizeTablet\":3,\"SizePhone\":4},\"Position\":{\"verticalPosition\":0,\"horizontalPosition\":0},\"TabStop\":1,\"ValueConversion\":null,\"Title\":null,\"Pattern\":null,\"QueryAttributes\":[{\"AttributeID\":\"DEBITOR_NUM\",\"AttributeValue\":null,\"AttributeQueryPrefix\":\"%\",\"AttributeQuerySuffix\":\"%\",\"Prefix\":false,\"MultipleParameter\":false}],\"JSSnippets\":[],\"DataBaseDefinition\":{\"QueryDefinition\":\"SELECT\\n  COMPANY_NUM,\\n  NAME,\\n  STR,\\n  ZIP,\\n  CITY,\\n  COUNTRY,\\n  DEFAULT_CURRENCY\\nFROM\\n  dbo.CC_COMPANIES\\nWHERE\\n  COMPANY_NUM LIKE @DEBITOR_NUM\",\"QueryMappings\":[{\"ColumnName\":\"COMPANY_NUM\",\"AttributeID\":\"DEBITOR_NUM\"},{\"ColumnName\":\"NAME\",\"AttributeID\":\"NAME\"},{\"ColumnName\":\"STR\",\"AttributeID\":\"STR\"},{\"ColumnName\":\"ZIP\",\"AttributeID\":\"ZIP\"},{\"ColumnName\":\"CITY\",\"AttributeID\":\"CITY\"},{\"ColumnName\":\"COUNTRY\",\"AttributeID\":\"COUNTRY\"},{\"ColumnName\":\"DEFAULT_CURRENCY\",\"AttributeID\":\"DEFAULT_CURRENCY\"}],\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"IsTransitive\":false,\"PositionCounterpart\":null,\"AutoComplete\":true,\"AllowNegativeAmount\":false},{\"AttributeID\":\"NAME\",\"Description\":null,\"LocalizedDescriptions\":{},\"AttributeLabel\":null,\"AttributeIcon\":null,\"AttributeType\":0,\"Required\":false,\"ReadOnly\":false,\"DoAlignStart\":true,\"DefaultValue\":null,\"Values\":[],\"ColumnSizePercent\":0,\"MinLength\":0,\"MaxLength\":0,\"SizeDesktop\":9,\"SizeTablet\":5,\"SizePhone\":4,\"Minified\":{\"SizeDesktop\":9,\"SizeTablet\":5,\"SizePhone\":4},\"Position\":{\"verticalPosition\":0,\"horizontalPosition\":1},\"TabStop\":2,\"ValueConversion\":null,\"Title\":null,\"Pattern\":null,\"QueryAttributes\":[{\"AttributeID\":\"NAME\",\"AttributeValue\":null,\"AttributeQueryPrefix\":\"%\",\"AttributeQuerySuffix\":\"%\",\"Prefix\":false,\"MultipleParameter\":false}],\"JSSnippets\":[],\"DataBaseDefinition\":{\"QueryDefinition\":\"SELECT\\n  COMPANY_NUM,\\n  NAME,\\n  STR,\\n  ZIP,\\n  CITY,\\n  COUNTRY,\\n  DEFAULT_CURRENCY\\nFROM\\n  dbo.CC_COMPANIES\\nWHERE\\n  NAME LIKE @NAME\",\"QueryMappings\":[{\"ColumnName\":\"COMPANY_NUM\",\"AttributeID\":\"DEBITOR_NUM\"},{\"ColumnName\":\"NAME\",\"AttributeID\":\"NAME\"},{\"ColumnName\":\"STR\",\"AttributeID\":\"STR\"},{\"ColumnName\":\"ZIP\",\"AttributeID\":\"ZIP\"},{\"ColumnName\":\"CITY\",\"AttributeID\":\"CITY\"},{\"ColumnName\":\"COUNTRY\",\"AttributeID\":\"COUNTRY\"},{\"ColumnName\":\"DEFAULT_CURRENCY\",\"AttributeID\":\"DEFAULT_CURRENCY\"}],\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"IsTransitive\":false,\"PositionCounterpart\":null,\"AutoComplete\":true,\"AllowNegativeAmount\":false},{\"AttributeID\":\"STR\",\"Description\":null,\"LocalizedDescriptions\":{},\"AttributeLabel\":null,\"AttributeIcon\":null,\"AttributeType\":0,\"Required\":false,\"ReadOnly\":true,\"DoAlignStart\":true,\"DefaultValue\":null,\"Values\":[],\"ColumnSizePercent\":0,\"MinLength\":0,\"MaxLength\":0,\"SizeDesktop\":4,\"SizeTablet\":3,\"SizePhone\":4,\"Minified\":null,\"Position\":{\"verticalPosition\":1,\"horizontalPosition\":0},\"TabStop\":3,\"ValueConversion\":null,\"Title\":null,\"Pattern\":null,\"QueryAttributes\":[{\"AttributeID\":\"STR\",\"AttributeValue\":null,\"AttributeQueryPrefix\":\"%\",\"AttributeQuerySuffix\":\"%\",\"Prefix\":false,\"MultipleParameter\":false}],\"JSSnippets\":[],\"DataBaseDefinition\":{\"QueryDefinition\":\"SELECT\\n  COMPANY_NUM,\\n  NAME,\\n  STR,\\n  ZIP,\\n  CITY,\\n  COUNTRY,\\n  DEFAULT_CURRENCY\\nFROM\\n  dbo.CC_COMPANIES\\nWHERE\\n  STR LIKE @STR\",\"QueryMappings\":[{\"ColumnName\":\"COMPANY_NUM\",\"AttributeID\":\"DEBITOR_NUM\"},{\"ColumnName\":\"NAME\",\"AttributeID\":\"NAME\"},{\"ColumnName\":\"STR\",\"AttributeID\":\"STR\"},{\"ColumnName\":\"ZIP\",\"AttributeID\":\"ZIP\"},{\"ColumnName\":\"CITY\",\"AttributeID\":\"CITY\"},{\"ColumnName\":\"COUNTRY\",\"AttributeID\":\"COUNTRY\"},{\"ColumnName\":\"DEFAULT_CURRENCY\",\"AttributeID\":\"DEFAULT_CURRENCY\"}],\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"IsTransitive\":false,\"PositionCounterpart\":null,\"AutoComplete\":true,\"AllowNegativeAmount\":false},{\"AttributeID\":\"ZIP\",\"Description\":null,\"LocalizedDescriptions\":{},\"AttributeLabel\":null,\"AttributeIcon\":null,\"AttributeType\":0,\"Required\":false,\"ReadOnly\":true,\"DoAlignStart\":true,\"DefaultValue\":null,\"Values\":[],\"ColumnSizePercent\":0,\"MinLength\":0,\"MaxLength\":0,\"SizeDesktop\":4,\"SizeTablet\":2,\"SizePhone\":4,\"Minified\":null,\"Position\":{\"verticalPosition\":1,\"horizontalPosition\":1},\"TabStop\":4,\"ValueConversion\":null,\"Title\":null,\"Pattern\":null,\"QueryAttributes\":null,\"JSSnippets\":[],\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"IsTransitive\":false,\"PositionCounterpart\":null,\"AutoComplete\":true,\"AllowNegativeAmount\":false},{\"AttributeID\":\"CITY\",\"Description\":null,\"LocalizedDescriptions\":{},\"AttributeLabel\":null,\"AttributeIcon\":null,\"AttributeType\":0,\"Required\":false,\"ReadOnly\":true,\"DoAlignStart\":true,\"DefaultValue\":null,\"Values\":[],\"ColumnSizePercent\":0,\"MinLength\":0,\"MaxLength\":0,\"SizeDesktop\":4,\"SizeTablet\":3,\"SizePhone\":4,\"Minified\":null,\"Position\":{\"verticalPosition\":1,\"horizontalPosition\":2},\"TabStop\":5,\"ValueConversion\":null,\"Title\":null,\"Pattern\":null,\"QueryAttributes\":[{\"AttributeID\":\"CITY\",\"AttributeValue\":null,\"AttributeQueryPrefix\":\"%\",\"AttributeQuerySuffix\":\"%\",\"Prefix\":false,\"MultipleParameter\":false}],\"JSSnippets\":[],\"DataBaseDefinition\":{\"QueryDefinition\":\"SELECT\\n  COMPANY_NUM,\\n  NAME,\\n  STR,\\n  ZIP,\\n  CITY,\\n  COUNTRY,\\n  DEFAULT_CURRENCY\\nFROM\\n  dbo.CC_COMPANIES\\nWHERE\\n  CITY LIKE @CITY\",\"QueryMappings\":[{\"ColumnName\":\"COMPANY_NUM\",\"AttributeID\":\"DEBITOR_NUM\"},{\"ColumnName\":\"NAME\",\"AttributeID\":\"NAME\"},{\"ColumnName\":\"STR\",\"AttributeID\":\"STR\"},{\"ColumnName\":\"ZIP\",\"AttributeID\":\"ZIP\"},{\"ColumnName\":\"CITY\",\"AttributeID\":\"CITY\"},{\"ColumnName\":\"COUNTRY\",\"AttributeID\":\"COUNTRY\"},{\"ColumnName\":\"DEFAULT_CURRENCY\",\"AttributeID\":\"DEFAULT_CURRENCY\"}],\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"IsTransitive\":false,\"PositionCounterpart\":null,\"AutoComplete\":true,\"AllowNegativeAmount\":false}],\"AttributeStructureDefinitions\":[]},{\"GroupID\":1,\"GroupDescription\":\"Sender\",\"MinifiedView\":true,\"AttributeDefinitions\":[{\"AttributeID\":\"VENDOR_NUM\",\"Description\":null,\"LocalizedDescriptions\":{},\"AttributeLabel\":null,\"AttributeIcon\":null,\"AttributeType\":0,\"Required\":true,\"ReadOnly\":false,\"DoAlignStart\":true,\"DefaultValue\":null,\"Values\":[],\"ColumnSizePercent\":0,\"MinLength\":0,\"MaxLength\":0,\"SizeDesktop\":3,\"SizeTablet\":3,\"SizePhone\":4,\"Minified\":{\"SizeDesktop\":3,\"SizeTablet\":3,\"SizePhone\":4},\"Position\":{\"verticalPosition\":0,\"horizontalPosition\":0},\"TabStop\":6,\"ValueConversion\":null,\"Title\":null,\"Pattern\":null,\"QueryAttributes\":[{\"AttributeID\":\"VENDOR_NUM\",\"AttributeValue\":null,\"AttributeQueryPrefix\":\"%\",\"AttributeQuerySuffix\":\"%\",\"Prefix\":false,\"MultipleParameter\":false},{\"AttributeID\":\"DEBITOR_NUM\",\"AttributeValue\":null,\"AttributeQueryPrefix\":\"\",\"AttributeQuerySuffix\":\"\",\"Prefix\":false,\"MultipleParameter\":false}],\"JSSnippets\":[],\"DataBaseDefinition\":{\"QueryDefinition\":\"SELECT\\n  ven.*,\\n  venb.*\\nFROM\\n  dbo.CC_VENDORS AS ven\\n  LEFT JOIN dbo.CC_VENDOR_BANK AS venb ON ven.VENDOR_NUM = venb.VENDOR_NUM\\n  AND ven.COMPANY_NUM = venb.COMPANY_NUM\\nWHERE\\n  ven.COMPANY_NUM = @DEBITOR_NUM\\n  AND ven.VENDOR_NUM LIKE @VENDOR_NUM\",\"QueryMappings\":[{\"ColumnName\":\"VENDOR_NUM\",\"AttributeID\":\"VENDOR_NUM\"},{\"ColumnName\":\"VENDOR_NAME\",\"AttributeID\":\"VENDOR_NAME\"},{\"ColumnName\":\"VENDOR_STR\",\"AttributeID\":\"VENDOR_STR\"},{\"ColumnName\":\"VENDOR_CITY\",\"AttributeID\":\"VENDOR_CITY\"},{\"ColumnName\":\"VENDOR_ZIP_CODE\",\"AttributeID\":\"VENDOR_ZIP_CODE\"},{\"ColumnName\":\"VENDOR_COUNTRY\",\"AttributeID\":\"VENDOR_COUNTRY\"},{\"ColumnName\":\"VENDOR_EMAIL\",\"AttributeID\":\"VENDOR_EMAIL\"},{\"ColumnName\":\"VENDOR_VAT_REGISTRATION_ID\",\"AttributeID\":\"VENDOR_VAT_REGISTRATION_ID\"},{\"ColumnName\":\"VENDOR_REGISTRATION_ID\",\"AttributeID\":\"VENDOR_REGISTRATION_ID\"},{\"ColumnName\":\"IBAN\",\"AttributeID\":\"VENDOR_IBAN\"}],\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"IsTransitive\":false,\"PositionCounterpart\":null,\"AutoComplete\":true,\"AllowNegativeAmount\":false},{\"AttributeID\":\"VENDOR_NAME\",\"Description\":null,\"LocalizedDescriptions\":{},\"AttributeLabel\":null,\"AttributeIcon\":null,\"AttributeType\":0,\"Required\":true,\"ReadOnly\":false,\"DoAlignStart\":true,\"DefaultValue\":null,\"Values\":[],\"ColumnSizePercent\":0,\"MinLength\":0,\"MaxLength\":0,\"SizeDesktop\":9,\"SizeTablet\":5,\"SizePhone\":4,\"Minified\":{\"SizeDesktop\":9,\"SizeTablet\":5,\"SizePhone\":4},\"Position\":{\"verticalPosition\":0,\"horizontalPosition\":1},\"TabStop\":7,\"ValueConversion\":null,\"Title\":null,\"Pattern\":null,\"QueryAttributes\":[{\"AttributeID\":\"VENDOR_NAME\",\"AttributeValue\":null,\"AttributeQueryPrefix\":\"%\",\"AttributeQuerySuffix\":\"%\",\"Prefix\":false,\"MultipleParameter\":false},{\"AttributeID\":\"DEBITOR_NUM\",\"AttributeValue\":null,\"AttributeQueryPrefix\":\"\",\"AttributeQuerySuffix\":\"\",\"Prefix\":false,\"MultipleParameter\":false}],\"JSSnippets\":[],\"DataBaseDefinition\":{\"QueryDefinition\":\"SELECT\\n  ven.*,\\n  venb.*\\nFROM\\n  dbo.CC_VENDORS AS ven\\n  LEFT JOIN dbo.CC_VENDOR_BANK AS venb ON ven.VENDOR_NUM = venb.VENDOR_NUM\\n  AND ven.COMPANY_NUM = venb.COMPANY_NUM\\nWHERE\\n  ven.COMPANY_NUM = @DEBITOR_NUM\\n  AND ven.VENDOR_NAME LIKE @VENDOR_NAME\",\"QueryMappings\":[{\"ColumnName\":\"VENDOR_NUM\",\"AttributeID\":\"VENDOR_NUM\"},{\"ColumnName\":\"VENDOR_NAME\",\"AttributeID\":\"VENDOR_NAME\"},{\"ColumnName\":\"VENDOR_STR\",\"AttributeID\":\"VENDOR_STR\"},{\"ColumnName\":\"VENDOR_CITY\",\"AttributeID\":\"VENDOR_CITY\"},{\"ColumnName\":\"VENDOR_ZIP_CODE\",\"AttributeID\":\"VENDOR_ZIP_CODE\"},{\"ColumnName\":\"VENDOR_COUNTRY\",\"AttributeID\":\"VENDOR_COUNTRY\"},{\"ColumnName\":\"VENDOR_EMAIL\",\"AttributeID\":\"VENDOR_EMAIL\"},{\"ColumnName\":\"VENDOR_VAT_REGISTRATION_ID\",\"AttributeID\":\"VENDOR_VAT_REGISTRATION_ID\"},{\"ColumnName\":\"VENDOR_REGISTRATION_ID\",\"AttributeID\":\"VENDOR_REGISTRATION_ID\"},{\"ColumnName\":\"IBAN\",\"AttributeID\":\"VENDOR_IBAN\"}],\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"IsTransitive\":false,\"PositionCounterpart\":null,\"AutoComplete\":true,\"AllowNegativeAmount\":false},{\"AttributeID\":\"VENDOR_STR\",\"Description\":null,\"LocalizedDescriptions\":{},\"AttributeLabel\":null,\"AttributeIcon\":null,\"AttributeType\":0,\"Required\":false,\"ReadOnly\":true,\"DoAlignStart\":true,\"DefaultValue\":null,\"Values\":[],\"ColumnSizePercent\":0,\"MinLength\":0,\"MaxLength\":0,\"SizeDesktop\":4,\"SizeTablet\":3,\"SizePhone\":4,\"Minified\":null,\"Position\":{\"verticalPosition\":1,\"horizontalPosition\":0},\"TabStop\":8,\"ValueConversion\":null,\"Title\":null,\"Pattern\":null,\"QueryAttributes\":[{\"AttributeID\":\"VENDOR_STR\",\"AttributeValue\":null,\"AttributeQueryPrefix\":\"%\",\"AttributeQuerySuffix\":\"%\",\"Prefix\":false,\"MultipleParameter\":false},{\"AttributeID\":\"DEBITOR_NUM\",\"AttributeValue\":null,\"AttributeQueryPrefix\":\"\",\"AttributeQuerySuffix\":\"\",\"Prefix\":false,\"MultipleParameter\":false}],\"JSSnippets\":[],\"DataBaseDefinition\":{\"QueryDefinition\":\"SELECT\\n  ven.*,\\n  venb.*\\nFROM\\n  dbo.CC_VENDORS AS ven\\n  LEFT JOIN dbo.CC_VENDOR_BANK AS venb ON ven.VENDOR_NUM = venb.VENDOR_NUM\\n  AND ven.COMPANY_NUM = venb.COMPANY_NUM\\nWHERE\\n  ven.COMPANY_NUM = @DEBITOR_NUM\\n  AND ven.VENDOR_STR LIKE @VENDOR_STR\",\"QueryMappings\":[{\"ColumnName\":\"VENDOR_NUM\",\"AttributeID\":\"VENDOR_NUM\"},{\"ColumnName\":\"VENDOR_NAME\",\"AttributeID\":\"VENDOR_NAME\"},{\"ColumnName\":\"VENDOR_STR\",\"AttributeID\":\"VENDOR_STR\"},{\"ColumnName\":\"VENDOR_CITY\",\"AttributeID\":\"VENDOR_CITY\"},{\"ColumnName\":\"VENDOR_ZIP_CODE\",\"AttributeID\":\"VENDOR_ZIP_CODE\"},{\"ColumnName\":\"VENDOR_COUNTRY\",\"AttributeID\":\"VENDOR_COUNTRY\"},{\"ColumnName\":\"VENDOR_EMAIL\",\"AttributeID\":\"VENDOR_EMAIL\"},{\"ColumnName\":\"VENDOR_VAT_REGISTRATION_ID\",\"AttributeID\":\"VENDOR_VAT_REGISTRATION_ID\"},{\"ColumnName\":\"VENDOR_REGISTRATION_ID\",\"AttributeID\":\"VENDOR_REGISTRATION_ID\"},{\"ColumnName\":\"IBAN\",\"AttributeID\":\"VENDOR_IBAN\"}],\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"IsTransitive\":false,\"PositionCounterpart\":null,\"AutoComplete\":true,\"AllowNegativeAmount\":false},{\"AttributeID\":\"VENDOR_ZIP_CODE\",\"Description\":null,\"LocalizedDescriptions\":{},\"AttributeLabel\":null,\"AttributeIcon\":null,\"AttributeType\":0,\"Required\":false,\"ReadOnly\":true,\"DoAlignStart\":true,\"DefaultValue\":null,\"Values\":[],\"ColumnSizePercent\":0,\"MinLength\":0,\"MaxLength\":0,\"SizeDesktop\":4,\"SizeTablet\":2,\"SizePhone\":4,\"Minified\":null,\"Position\":{\"verticalPosition\":1,\"horizontalPosition\":1},\"TabStop\":9,\"ValueConversion\":null,\"Title\":null,\"Pattern\":null,\"QueryAttributes\":[{\"AttributeID\":\"VENDOR_ZIP_CODE\",\"AttributeValue\":null,\"AttributeQueryPrefix\":\"%\",\"AttributeQuerySuffix\":\"%\",\"Prefix\":false,\"MultipleParameter\":false},{\"AttributeID\":\"DEBITOR_NUM\",\"AttributeValue\":null,\"AttributeQueryPrefix\":\"\",\"AttributeQuerySuffix\":\"\",\"Prefix\":false,\"MultipleParameter\":false}],\"JSSnippets\":[],\"DataBaseDefinition\":{\"QueryDefinition\":\"SELECT\\n  ven.*,\\n  venb.*\\nFROM\\n  dbo.CC_VENDORS AS ven\\n  LEFT JOIN dbo.CC_VENDOR_BANK AS venb ON ven.VENDOR_NUM = venb.VENDOR_NUM\\n  AND ven.COMPANY_NUM = venb.COMPANY_NUM\\nWHERE\\n  ven.COMPANY_NUM = @DEBITOR_NUM\\n  AND ven.VENDOR_ZIP_CODE LIKE @VENDOR_ZIP_CODE\",\"QueryMappings\":[{\"ColumnName\":\"VENDOR_NUM\",\"AttributeID\":\"VENDOR_NUM\"},{\"ColumnName\":\"VENDOR_NAME\",\"AttributeID\":\"VENDOR_NAME\"},{\"ColumnName\":\"VENDOR_STR\",\"AttributeID\":\"VENDOR_STR\"},{\"ColumnName\":\"VENDOR_CITY\",\"AttributeID\":\"VENDOR_CITY\"},{\"ColumnName\":\"VENDOR_ZIP_CODE\",\"AttributeID\":\"VENDOR_ZIP_CODE\"},{\"ColumnName\":\"VENDOR_COUNTRY\",\"AttributeID\":\"VENDOR_COUNTRY\"},{\"ColumnName\":\"VENDOR_EMAIL\",\"AttributeID\":\"VENDOR_EMAIL\"},{\"ColumnName\":\"VENDOR_VAT_REGISTRATION_ID\",\"AttributeID\":\"VENDOR_VAT_REGISTRATION_ID\"},{\"ColumnName\":\"VENDOR_REGISTRATION_ID\",\"AttributeID\":\"VENDOR_REGISTRATION_ID\"},{\"ColumnName\":\"IBAN\",\"AttributeID\":\"VENDOR_IBAN\"}],\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"IsTransitive\":false,\"PositionCounterpart\":null,\"AutoComplete\":true,\"AllowNegativeAmount\":false},{\"AttributeID\":\"VENDOR_CITY\",\"Description\":null,\"LocalizedDescriptions\":{},\"AttributeLabel\":null,\"AttributeIcon\":null,\"AttributeType\":0,\"Required\":false,\"ReadOnly\":true,\"DoAlignStart\":true,\"DefaultValue\":null,\"Values\":[],\"ColumnSizePercent\":0,\"MinLength\":0,\"MaxLength\":0,\"SizeDesktop\":4,\"SizeTablet\":3,\"SizePhone\":4,\"Minified\":null,\"Position\":{\"verticalPosition\":1,\"horizontalPosition\":2},\"TabStop\":10,\"ValueConversion\":null,\"Title\":null,\"Pattern\":null,\"QueryAttributes\":[{\"AttributeID\":\"VENDOR_CITY\",\"AttributeValue\":null,\"AttributeQueryPrefix\":\"%\",\"AttributeQuerySuffix\":\"%\",\"Prefix\":false,\"MultipleParameter\":false},{\"AttributeID\":\"DEBITOR_NUM\",\"AttributeValue\":null,\"AttributeQueryPrefix\":\"\",\"AttributeQuerySuffix\":\"\",\"Prefix\":false,\"MultipleParameter\":false}],\"JSSnippets\":[],\"DataBaseDefinition\":{\"QueryDefinition\":\"SELECT\\n  ven.*,\\n  venb.*\\nFROM\\n  dbo.CC_VENDORS AS ven\\n  LEFT JOIN dbo.CC_VENDOR_BANK AS venb ON ven.VENDOR_NUM = venb.VENDOR_NUM\\n  AND ven.COMPANY_NUM = venb.COMPANY_NUM\\nWHERE\\n  ven.COMPANY_NUM = @DEBITOR_NUM\\n  AND ven.VENDOR_CITY LIKE @VENDOR_CITY\",\"QueryMappings\":[{\"ColumnName\":\"VENDOR_NUM\",\"AttributeID\":\"VENDOR_NUM\"},{\"ColumnName\":\"VENDOR_NAME\",\"AttributeID\":\"VENDOR_NAME\"},{\"ColumnName\":\"VENDOR_STR\",\"AttributeID\":\"VENDOR_STR\"},{\"ColumnName\":\"VENDOR_CITY\",\"AttributeID\":\"VENDOR_CITY\"},{\"ColumnName\":\"VENDOR_ZIP_CODE\",\"AttributeID\":\"VENDOR_ZIP_CODE\"},{\"ColumnName\":\"VENDOR_COUNTRY\",\"AttributeID\":\"VENDOR_COUNTRY\"},{\"ColumnName\":\"VENDOR_EMAIL\",\"AttributeID\":\"VENDOR_EMAIL\"},{\"ColumnName\":\"VENDOR_VAT_REGISTRATION_ID\",\"AttributeID\":\"VENDOR_VAT_REGISTRATION_ID\"},{\"ColumnName\":\"VENDOR_REGISTRATION_ID\",\"AttributeID\":\"VENDOR_REGISTRATION_ID\"},{\"ColumnName\":\"IBAN\",\"AttributeID\":\"VENDOR_IBAN\"}],\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"IsTransitive\":false,\"PositionCounterpart\":null,\"AutoComplete\":true,\"AllowNegativeAmount\":false},{\"AttributeID\":\"VENDOR_VAT_REGISTRATION_ID\",\"Description\":null,\"LocalizedDescriptions\":{},\"AttributeLabel\":null,\"AttributeIcon\":null,\"AttributeType\":0,\"Required\":false,\"ReadOnly\":false,\"DoAlignStart\":true,\"DefaultValue\":null,\"Values\":[],\"ColumnSizePercent\":0,\"MinLength\":0,\"MaxLength\":0,\"SizeDesktop\":3,\"SizeTablet\":2,\"SizePhone\":4,\"Minified\":null,\"Position\":{\"verticalPosition\":2,\"horizontalPosition\":0},\"TabStop\":11,\"ValueConversion\":null,\"Title\":null,\"Pattern\":null,\"QueryAttributes\":[{\"AttributeID\":\"VENDOR_VAT_REGISTRATION_ID\",\"AttributeValue\":null,\"AttributeQueryPrefix\":\"%\",\"AttributeQuerySuffix\":\"%\",\"Prefix\":false,\"MultipleParameter\":false},{\"AttributeID\":\"DEBITOR_NUM\",\"AttributeValue\":null,\"AttributeQueryPrefix\":\"\",\"AttributeQuerySuffix\":\"\",\"Prefix\":false,\"MultipleParameter\":false}],\"JSSnippets\":[],\"DataBaseDefinition\":{\"QueryDefinition\":\"SELECT\\n  ven.*,\\n  venb.*\\nFROM\\n  dbo.CC_VENDORS AS ven\\n  LEFT JOIN dbo.CC_VENDOR_BANK AS venb ON ven.VENDOR_NUM = venb.VENDOR_NUM\\n  AND ven.COMPANY_NUM = venb.COMPANY_NUM\\nWHERE\\n  ven.COMPANY_NUM = @DEBITOR_NUM\\n  AND ven.VENDOR_VAT_REGISTRATION_ID LIKE @VENDOR_VAT_REGISTRATION_ID\",\"QueryMappings\":[{\"ColumnName\":\"VENDOR_NUM\",\"AttributeID\":\"VENDOR_NUM\"},{\"ColumnName\":\"VENDOR_NAME\",\"AttributeID\":\"VENDOR_NAME\"},{\"ColumnName\":\"VENDOR_STR\",\"AttributeID\":\"VENDOR_STR\"},{\"ColumnName\":\"VENDOR_CITY\",\"AttributeID\":\"VENDOR_CITY\"},{\"ColumnName\":\"VENDOR_ZIP_CODE\",\"AttributeID\":\"VENDOR_ZIP_CODE\"},{\"ColumnName\":\"VENDOR_COUNTRY\",\"AttributeID\":\"VENDOR_COUNTRY\"},{\"ColumnName\":\"VENDOR_EMAIL\",\"AttributeID\":\"VENDOR_EMAIL\"},{\"ColumnName\":\"VENDOR_VAT_REGISTRATION_ID\",\"AttributeID\":\"VENDOR_VAT_REGISTRATION_ID\"},{\"ColumnName\":\"VENDOR_REGISTRATION_ID\",\"AttributeID\":\"VENDOR_REGISTRATION_ID\"},{\"ColumnName\":\"IBAN\",\"AttributeID\":\"VENDOR_IBAN\"}],\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"IsTransitive\":false,\"PositionCounterpart\":null,\"AutoComplete\":true,\"AllowNegativeAmount\":false},{\"AttributeID\":\"VENDOR_REGISTRATION_ID\",\"Description\":null,\"LocalizedDescriptions\":{},\"AttributeLabel\":null,\"AttributeIcon\":null,\"AttributeType\":0,\"Required\":false,\"ReadOnly\":false,\"DoAlignStart\":true,\"DefaultValue\":null,\"Values\":[],\"ColumnSizePercent\":0,\"MinLength\":0,\"MaxLength\":0,\"SizeDesktop\":3,\"SizeTablet\":2,\"SizePhone\":4,\"Minified\":null,\"Position\":{\"verticalPosition\":2,\"horizontalPosition\":1},\"TabStop\":12,\"ValueConversion\":null,\"Title\":null,\"Pattern\":null,\"QueryAttributes\":[{\"AttributeID\":\"VENDOR_REGISTRATION_ID\",\"AttributeValue\":null,\"AttributeQueryPrefix\":\"%\",\"AttributeQuerySuffix\":\"%\",\"Prefix\":false,\"MultipleParameter\":false},{\"AttributeID\":\"DEBITOR_NUM\",\"AttributeValue\":null,\"AttributeQueryPrefix\":\"\",\"AttributeQuerySuffix\":\"\",\"Prefix\":false,\"MultipleParameter\":false}],\"JSSnippets\":[],\"DataBaseDefinition\":{\"QueryDefinition\":\"SELECT\\n  ven.*,\\n  venb.*\\nFROM\\n  dbo.CC_VENDORS AS ven\\n  LEFT JOIN dbo.CC_VENDOR_BANK AS venb ON ven.VENDOR_NUM = venb.VENDOR_NUM\\n  AND ven.COMPANY_NUM = venb.COMPANY_NUM\\nWHERE\\n  ven.COMPANY_NUM = @DEBITOR_NUM\\n  AND ven.VENDOR_REGISTRATION_ID LIKE @VENDOR_REGISTRATION_ID\",\"QueryMappings\":[{\"ColumnName\":\"VENDOR_NUM\",\"AttributeID\":\"VENDOR_NUM\"},{\"ColumnName\":\"VENDOR_NAME\",\"AttributeID\":\"VENDOR_NAME\"},{\"ColumnName\":\"VENDOR_STR\",\"AttributeID\":\"VENDOR_STR\"},{\"ColumnName\":\"VENDOR_CITY\",\"AttributeID\":\"VENDOR_CITY\"},{\"ColumnName\":\"VENDOR_ZIP_CODE\",\"AttributeID\":\"VENDOR_ZIP_CODE\"},{\"ColumnName\":\"VENDOR_COUNTRY\",\"AttributeID\":\"VENDOR_COUNTRY\"},{\"ColumnName\":\"VENDOR_EMAIL\",\"AttributeID\":\"VENDOR_EMAIL\"},{\"ColumnName\":\"VENDOR_VAT_REGISTRATION_ID\",\"AttributeID\":\"VENDOR_VAT_REGISTRATION_ID\"},{\"ColumnName\":\"VENDOR_REGISTRATION_ID\",\"AttributeID\":\"VENDOR_REGISTRATION_ID\"},{\"ColumnName\":\"IBAN\",\"AttributeID\":\"VENDOR_IBAN\"}],\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"IsTransitive\":false,\"PositionCounterpart\":null,\"AutoComplete\":true,\"AllowNegativeAmount\":false},{\"AttributeID\":\"VENDOR_IBAN\",\"Description\":null,\"LocalizedDescriptions\":{},\"AttributeLabel\":null,\"AttributeIcon\":null,\"AttributeType\":0,\"Required\":false,\"ReadOnly\":false,\"DoAlignStart\":true,\"DefaultValue\":null,\"Values\":[],\"ColumnSizePercent\":0,\"MinLength\":0,\"MaxLength\":0,\"SizeDesktop\":6,\"SizeTablet\":4,\"SizePhone\":4,\"Minified\":null,\"Position\":{\"verticalPosition\":2,\"horizontalPosition\":2},\"TabStop\":13,\"ValueConversion\":null,\"Title\":null,\"Pattern\":null,\"QueryAttributes\":[{\"AttributeID\":\"VENDOR_IBAN\",\"AttributeValue\":null,\"AttributeQueryPrefix\":\"%\",\"AttributeQuerySuffix\":\"%\",\"Prefix\":false,\"MultipleParameter\":false},{\"AttributeID\":\"DEBITOR_NUM\",\"AttributeValue\":null,\"AttributeQueryPrefix\":\"\",\"AttributeQuerySuffix\":\"\",\"Prefix\":false,\"MultipleParameter\":false}],\"JSSnippets\":[],\"DataBaseDefinition\":{\"QueryDefinition\":\"SELECT\\n  ven.*,\\n  venb.*\\nFROM\\n  dbo.CC_VENDORS AS ven\\n  LEFT JOIN dbo.CC_VENDOR_BANK AS venb ON ven.VENDOR_NUM = venb.VENDOR_NUM\\n  AND ven.COMPANY_NUM = venb.COMPANY_NUM\\nWHERE\\n  ven.COMPANY_NUM = @DEBITOR_NUM\\n  AND venb.IBAN LIKE @VENDOR_IBAN\",\"QueryMappings\":[{\"ColumnName\":\"VENDOR_NUM\",\"AttributeID\":\"VENDOR_NUM\"},{\"ColumnName\":\"VENDOR_NAME\",\"AttributeID\":\"VENDOR_NAME\"},{\"ColumnName\":\"VENDOR_STR\",\"AttributeID\":\"VENDOR_STR\"},{\"ColumnName\":\"VENDOR_CITY\",\"AttributeID\":\"VENDOR_CITY\"},{\"ColumnName\":\"VENDOR_ZIP_CODE\",\"AttributeID\":\"VENDOR_ZIP_CODE\"},{\"ColumnName\":\"VENDOR_COUNTRY\",\"AttributeID\":\"VENDOR_COUNTRY\"},{\"ColumnName\":\"VENDOR_EMAIL\",\"AttributeID\":\"VENDOR_EMAIL\"},{\"ColumnName\":\"VENDOR_VAT_REGISTRATION_ID\",\"AttributeID\":\"VENDOR_VAT_REGISTRATION_ID\"},{\"ColumnName\":\"VENDOR_REGISTRATION_ID\",\"AttributeID\":\"VENDOR_REGISTRATION_ID\"},{\"ColumnName\":\"IBAN\",\"AttributeID\":\"VENDOR_IBAN\"}],\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"IsTransitive\":false,\"PositionCounterpart\":null,\"AutoComplete\":true,\"AllowNegativeAmount\":false}],\"AttributeStructureDefinitions\":[]},{\"GroupID\":2,\"GroupDescription\":\"InvoiceData\",\"MinifiedView\":false,\"AttributeDefinitions\":[{\"AttributeID\":\"DocumentType\",\"Description\":null,\"LocalizedDescriptions\":{},\"AttributeLabel\":null,\"AttributeIcon\":null,\"AttributeType\":0,\"Required\":false,\"ReadOnly\":false,\"DoAlignStart\":true,\"DefaultValue\":\"Invoice\",\"Values\":[\"Invoice\",\"CreditAdvice\",\"CorrectionOfInvoice\"],\"ColumnSizePercent\":0,\"MinLength\":0,\"MaxLength\":0,\"SizeDesktop\":4,\"SizeTablet\":4,\"SizePhone\":4,\"Minified\":null,\"Position\":{\"verticalPosition\":0,\"horizontalPosition\":0},\"TabStop\":14,\"ValueConversion\":null,\"Title\":null,\"Pattern\":null,\"QueryAttributes\":null,\"JSSnippets\":[],\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"IsTransitive\":false,\"PositionCounterpart\":null,\"AutoComplete\":true,\"AllowNegativeAmount\":false},{\"AttributeID\":\"InvoiceNumber\",\"Description\":null,\"LocalizedDescriptions\":{},\"AttributeLabel\":null,\"AttributeIcon\":null,\"AttributeType\":0,\"Required\":true,\"ReadOnly\":false,\"DoAlignStart\":true,\"DefaultValue\":null,\"Values\":[],\"ColumnSizePercent\":0,\"MinLength\":0,\"MaxLength\":0,\"SizeDesktop\":8,\"SizeTablet\":4,\"SizePhone\":4,\"Minified\":null,\"Position\":{\"verticalPosition\":0,\"horizontalPosition\":1},\"TabStop\":15,\"ValueConversion\":null,\"Title\":null,\"Pattern\":null,\"QueryAttributes\":null,\"JSSnippets\":[],\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"IsTransitive\":false,\"PositionCounterpart\":null,\"AutoComplete\":true,\"AllowNegativeAmount\":false},{\"AttributeID\":\"InvoiceDate\",\"Description\":null,\"LocalizedDescriptions\":{},\"AttributeLabel\":null,\"AttributeIcon\":null,\"AttributeType\":0,\"Required\":true,\"ReadOnly\":false,\"DoAlignStart\":true,\"DefaultValue\":null,\"Values\":[],\"ColumnSizePercent\":0,\"MinLength\":0,\"MaxLength\":0,\"SizeDesktop\":6,\"SizeTablet\":4,\"SizePhone\":4,\"Minified\":null,\"Position\":{\"verticalPosition\":1,\"horizontalPosition\":0},\"TabStop\":16,\"ValueConversion\":\"ConvertInputDate\",\"Title\":\"dd.mm.YYYY\",\"Pattern\":\"^(0?[1-9]|[12][0-9]|3[01])[.](0?[1-9]|1[012])[.](\\\\d{4})$\",\"QueryAttributes\":null,\"JSSnippets\":[{\"OnMethod\":\"input\",\"Code\":\" clearTimeout(typingInvoiceDateTimer); var element = $(this);  if (element.val()) { typingInvoiceDateTimer = setTimeout( function() { element.val(ConvertInputDate(element.val())); TriggerFieldValidation(element.attr('id')); }, doneTypingInterval); }\\n \"}],\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"IsTransitive\":false,\"PositionCounterpart\":null,\"AutoComplete\":true,\"AllowNegativeAmount\":false},{\"AttributeID\":\"PerformanceDate\",\"Description\":null,\"LocalizedDescriptions\":{},\"AttributeLabel\":null,\"AttributeIcon\":null,\"AttributeType\":0,\"Required\":false,\"ReadOnly\":false,\"DoAlignStart\":true,\"DefaultValue\":null,\"Values\":[],\"ColumnSizePercent\":0,\"MinLength\":0,\"MaxLength\":0,\"SizeDesktop\":6,\"SizeTablet\":4,\"SizePhone\":4,\"Minified\":null,\"Position\":{\"verticalPosition\":1,\"horizontalPosition\":1},\"TabStop\":17,\"ValueConversion\":\"ConvertInputDate\",\"Title\":\"dd.mm.YYYY\",\"Pattern\":\"^(0?[1-9]|[12][0-9]|3[01])[.](0?[1-9]|1[012])[.](\\\\d{4})$\",\"QueryAttributes\":null,\"JSSnippets\":[{\"OnMethod\":\"input\",\"Code\":\" clearTimeout(typingPerformanceDateTimer); var element = $(this);  if (element.val()) { typingPerformanceDateTimer = setTimeout( function() { element.val(ConvertInputDate(element.val())); TriggerFieldValidation(element.attr('id')); }, doneTypingInterval); }\\n \"}],\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"IsTransitive\":false,\"PositionCounterpart\":null,\"AutoComplete\":true,\"AllowNegativeAmount\":false},{\"AttributeID\":\"NetAmount1\",\"Description\":null,\"LocalizedDescriptions\":{},\"AttributeLabel\":null,\"AttributeIcon\":null,\"AttributeType\":0,\"Required\":true,\"ReadOnly\":false,\"DoAlignStart\":false,\"DefaultValue\":\"0.00\",\"Values\":[],\"ColumnSizePercent\":0,\"MinLength\":0,\"MaxLength\":0,\"SizeDesktop\":6,\"SizeTablet\":4,\"SizePhone\":4,\"Minified\":null,\"Position\":{\"verticalPosition\":2,\"horizontalPosition\":0},\"TabStop\":18,\"ValueConversion\":\"ConvertInputFloatWithCustomDelimiter\",\"Title\":null,\"Pattern\":null,\"QueryAttributes\":null,\"JSSnippets\":[{\"OnMethod\":\"input\",\"Code\":\" ConvertInputFloatWithCustomDelimiterOnInput(this);\\n var netAmount1 = Number(GetAttribute(\\\"NetAmount1\\\"));\\n var vatRate1 = Number(GetAttribute(\\\"VatRate1\\\"))/100;\\n var vatAmount1 = netAmount1 * vatRate1;\\n SetAttribute(\\\"VatAmount1\\\", (Math.round((vatAmount1 + Number.EPSILON) * 100) / 100).toFixed(2));\\n\\n var netAmount2 = Number(GetAttribute(\\\"NetAmount2\\\"));\\n var vatRate2 = Number(GetAttribute(\\\"VatRate2\\\"))/100;\\n var grossAmount = netAmount1 * (1 + vatRate1) + netAmount2 * (1 + vatRate2);\\n SetAttribute(\\\"GrossAmount\\\", (Math.round((grossAmount + Number.EPSILON) * 100) / 100).toFixed(2));\"}],\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"IsTransitive\":false,\"PositionCounterpart\":null,\"AutoComplete\":true,\"AllowNegativeAmount\":false},{\"AttributeID\":\"NetAmount2\",\"Description\":null,\"LocalizedDescriptions\":{},\"AttributeLabel\":null,\"AttributeIcon\":null,\"AttributeType\":0,\"Required\":false,\"ReadOnly\":false,\"DoAlignStart\":false,\"DefaultValue\":\"0.00\",\"Values\":[],\"ColumnSizePercent\":0,\"MinLength\":0,\"MaxLength\":0,\"SizeDesktop\":6,\"SizeTablet\":4,\"SizePhone\":4,\"Minified\":null,\"Position\":{\"verticalPosition\":2,\"horizontalPosition\":1},\"TabStop\":21,\"ValueConversion\":\"ConvertInputFloatWithCustomDelimiter\",\"Title\":null,\"Pattern\":null,\"QueryAttributes\":null,\"JSSnippets\":[{\"OnMethod\":\"input\",\"Code\":\" ConvertInputFloatWithCustomDelimiterOnInput(this);\\n var netAmount1 = Number(GetAttribute(\\\"NetAmount1\\\"));\\n var vatRate1 = Number(GetAttribute(\\\"VatRate1\\\"))/100;\\n\\n var netAmount2 = Number(GetAttribute(\\\"NetAmount2\\\"));\\n var vatRate2 = Number(GetAttribute(\\\"VatRate2\\\"))/100;\\n var vatAmount2 = netAmount2 * vatRate2;\\n SetAttribute(\\\"VatAmount2\\\", (Math.round((vatAmount2 + Number.EPSILON) * 100) / 100).toFixed(2));\\n var grossAmount = netAmount1 * (1 + vatRate1) + netAmount2 * (1 + vatRate2);\\n SetAttribute(\\\"GrossAmount\\\", (Math.round((grossAmount + Number.EPSILON) * 100) / 100).toFixed(2));\"}],\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"IsTransitive\":false,\"PositionCounterpart\":null,\"AutoComplete\":true,\"AllowNegativeAmount\":false},{\"AttributeID\":\"VatRate1\",\"Description\":null,\"LocalizedDescriptions\":{},\"AttributeLabel\":null,\"AttributeIcon\":null,\"AttributeType\":0,\"Required\":false,\"ReadOnly\":false,\"DoAlignStart\":false,\"DefaultValue\":\"0.00\",\"Values\":[],\"ColumnSizePercent\":0,\"MinLength\":0,\"MaxLength\":0,\"SizeDesktop\":6,\"SizeTablet\":4,\"SizePhone\":4,\"Minified\":null,\"Position\":{\"verticalPosition\":3,\"horizontalPosition\":0},\"TabStop\":19,\"ValueConversion\":\"ConvertInputFloatWithCustomDelimiter\",\"Title\":null,\"Pattern\":null,\"QueryAttributes\":null,\"JSSnippets\":[{\"OnMethod\":\"input\",\"Code\":\" ConvertInputFloatWithCustomDelimiterOnInput(this);\\n var netAmount1 = Number(GetAttribute(\\\"NetAmount1\\\"));\\n var vatRate1 = Number(GetAttribute(\\\"VatRate1\\\"))/100;\\n var vatAmount1 = netAmount1 * vatRate1;\\n SetAttribute(\\\"VatAmount1\\\", (Math.round((vatAmount1 + Number.EPSILON) * 100) / 100).toFixed(2));\\n\\n var netAmount2 = Number(GetAttribute(\\\"NetAmount2\\\"));\\n var vatRate2 = Number(GetAttribute(\\\"VatRate2\\\"))/100;\\n var grossAmount = netAmount1 * (1 + vatRate1) + netAmount2 * (1 + vatRate2);\\n SetAttribute(\\\"GrossAmount\\\", (Math.round((grossAmount + Number.EPSILON) * 100) / 100).toFixed(2));\"}],\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"IsTransitive\":false,\"PositionCounterpart\":null,\"AutoComplete\":true,\"AllowNegativeAmount\":false},{\"AttributeID\":\"VatRate2\",\"Description\":null,\"LocalizedDescriptions\":{},\"AttributeLabel\":null,\"AttributeIcon\":null,\"AttributeType\":0,\"Required\":false,\"ReadOnly\":false,\"DoAlignStart\":false,\"DefaultValue\":\"0.00\",\"Values\":[],\"ColumnSizePercent\":0,\"MinLength\":0,\"MaxLength\":0,\"SizeDesktop\":6,\"SizeTablet\":4,\"SizePhone\":4,\"Minified\":null,\"Position\":{\"verticalPosition\":3,\"horizontalPosition\":1},\"TabStop\":22,\"ValueConversion\":\"ConvertInputFloatWithCustomDelimiter\",\"Title\":null,\"Pattern\":null,\"QueryAttributes\":null,\"JSSnippets\":[{\"OnMethod\":\"input\",\"Code\":\" ConvertInputFloatWithCustomDelimiterOnInput(this);\\n var netAmount1 = Number(GetAttribute(\\\"NetAmount1\\\"));\\n var vatRate1 = Number(GetAttribute(\\\"VatRate1\\\"))/100;\\n\\n var netAmount2 = Number(GetAttribute(\\\"NetAmount2\\\"));\\n var vatRate2 = Number(GetAttribute(\\\"VatRate2\\\"))/100;\\n var vatAmount2 = netAmount2 * vatRate2;\\n SetAttribute(\\\"VatAmount2\\\", (Math.round((vatAmount2 + Number.EPSILON) * 100) / 100).toFixed(2));\\n var grossAmount = netAmount1 * (1 + vatRate1) + netAmount2 * (1 + vatRate2);\\n SetAttribute(\\\"GrossAmount\\\", (Math.round((grossAmount + Number.EPSILON) * 100) / 100).toFixed(2));\"}],\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"IsTransitive\":false,\"PositionCounterpart\":null,\"AutoComplete\":true,\"AllowNegativeAmount\":false},{\"AttributeID\":\"VatAmount1\",\"Description\":null,\"LocalizedDescriptions\":{},\"AttributeLabel\":null,\"AttributeIcon\":null,\"AttributeType\":0,\"Required\":true,\"ReadOnly\":false,\"DoAlignStart\":false,\"DefaultValue\":\"0.00\",\"Values\":[],\"ColumnSizePercent\":0,\"MinLength\":0,\"MaxLength\":0,\"SizeDesktop\":6,\"SizeTablet\":4,\"SizePhone\":4,\"Minified\":null,\"Position\":{\"verticalPosition\":4,\"horizontalPosition\":0},\"TabStop\":20,\"ValueConversion\":\"ConvertInputFloatWithCustomDelimiter\",\"Title\":null,\"Pattern\":null,\"QueryAttributes\":null,\"JSSnippets\":[{\"OnMethod\":\"input\",\"Code\":\" ConvertInputFloatWithCustomDelimiterOnInput(this);\\n \"}],\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"IsTransitive\":false,\"PositionCounterpart\":null,\"AutoComplete\":true,\"AllowNegativeAmount\":false},{\"AttributeID\":\"VatAmount2\",\"Description\":null,\"LocalizedDescriptions\":{},\"AttributeLabel\":null,\"AttributeIcon\":null,\"AttributeType\":0,\"Required\":false,\"ReadOnly\":false,\"DoAlignStart\":false,\"DefaultValue\":\"0.00\",\"Values\":[],\"ColumnSizePercent\":0,\"MinLength\":0,\"MaxLength\":0,\"SizeDesktop\":6,\"SizeTablet\":4,\"SizePhone\":4,\"Minified\":null,\"Position\":{\"verticalPosition\":4,\"horizontalPosition\":1},\"TabStop\":23,\"ValueConversion\":\"ConvertInputFloatWithCustomDelimiter\",\"Title\":null,\"Pattern\":null,\"QueryAttributes\":null,\"JSSnippets\":[{\"OnMethod\":\"input\",\"Code\":\" ConvertInputFloatWithCustomDelimiterOnInput(this);\\n \"}],\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"IsTransitive\":false,\"PositionCounterpart\":null,\"AutoComplete\":true,\"AllowNegativeAmount\":false},{\"AttributeID\":\"AdditionalCosts\",\"Description\":null,\"LocalizedDescriptions\":{},\"AttributeLabel\":null,\"AttributeIcon\":null,\"AttributeType\":0,\"Required\":false,\"ReadOnly\":false,\"DoAlignStart\":false,\"DefaultValue\":\"0.00\",\"Values\":[],\"ColumnSizePercent\":0,\"MinLength\":0,\"MaxLength\":0,\"SizeDesktop\":12,\"SizeTablet\":8,\"SizePhone\":4,\"Minified\":null,\"Position\":{\"verticalPosition\":5,\"horizontalPosition\":0},\"TabStop\":24,\"ValueConversion\":\"ConvertInputFloatWithCustomDelimiter\",\"Title\":null,\"Pattern\":null,\"QueryAttributes\":null,\"JSSnippets\":[{\"OnMethod\":\"input\",\"Code\":\" ConvertInputFloatWithCustomDelimiterOnInput(this);\\n \"}],\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"IsTransitive\":false,\"PositionCounterpart\":null,\"AutoComplete\":true,\"AllowNegativeAmount\":false},{\"AttributeID\":\"GrossAmount\",\"Description\":null,\"LocalizedDescriptions\":{},\"AttributeLabel\":null,\"AttributeIcon\":null,\"AttributeType\":0,\"Required\":true,\"ReadOnly\":false,\"DoAlignStart\":false,\"DefaultValue\":\"0.00\",\"Values\":[],\"ColumnSizePercent\":0,\"MinLength\":0,\"MaxLength\":0,\"SizeDesktop\":6,\"SizeTablet\":4,\"SizePhone\":4,\"Minified\":null,\"Position\":{\"verticalPosition\":6,\"horizontalPosition\":0},\"TabStop\":25,\"ValueConversion\":\"ConvertInputFloatWithCustomDelimiter\",\"Title\":null,\"Pattern\":null,\"QueryAttributes\":null,\"JSSnippets\":[{\"OnMethod\":\"input\",\"Code\":\" ConvertInputFloatWithCustomDelimiterOnInput(this);\\n \"}],\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"IsTransitive\":false,\"PositionCounterpart\":null,\"AutoComplete\":true,\"AllowNegativeAmount\":false},{\"AttributeID\":\"GrossAmountCurrency\",\"Description\":null,\"LocalizedDescriptions\":{},\"AttributeLabel\":null,\"AttributeIcon\":null,\"AttributeType\":0,\"Required\":false,\"ReadOnly\":false,\"DoAlignStart\":true,\"DefaultValue\":null,\"Values\":[\"\",\"AUD\",\"CAD\",\"CHF\",\"CNY\",\"CZK\",\"DKK\",\"EUR\",\"GBP\",\"HKD\",\"INR\",\"JPY\",\"KRW\",\"MYR\",\"NOK\",\"PLN\",\"RUB\",\"SAR\",\"SEK\",\"SGD\",\"TWD\",\"UAH\",\"USD\",\"ZAR\"],\"ColumnSizePercent\":0,\"MinLength\":0,\"MaxLength\":0,\"SizeDesktop\":6,\"SizeTablet\":4,\"SizePhone\":4,\"Minified\":null,\"Position\":{\"verticalPosition\":6,\"horizontalPosition\":1},\"TabStop\":26,\"ValueConversion\":null,\"Title\":null,\"Pattern\":null,\"QueryAttributes\":null,\"JSSnippets\":[],\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"IsTransitive\":false,\"PositionCounterpart\":null,\"AutoComplete\":true,\"AllowNegativeAmount\":false},{\"AttributeID\":\"OrderNum\",\"Description\":null,\"LocalizedDescriptions\":{},\"AttributeLabel\":null,\"AttributeIcon\":null,\"AttributeType\":0,\"Required\":false,\"ReadOnly\":false,\"DoAlignStart\":true,\"DefaultValue\":null,\"Values\":[],\"ColumnSizePercent\":0,\"MinLength\":0,\"MaxLength\":0,\"SizeDesktop\":12,\"SizeTablet\":8,\"SizePhone\":4,\"Minified\":null,\"Position\":{\"verticalPosition\":7,\"horizontalPosition\":0},\"TabStop\":27,\"ValueConversion\":null,\"Title\":null,\"Pattern\":null,\"QueryAttributes\":[{\"AttributeID\":\"OrderNum\",\"AttributeValue\":null,\"AttributeQueryPrefix\":\"%\",\"AttributeQuerySuffix\":\"%\",\"Prefix\":false,\"MultipleParameter\":true},{\"AttributeID\":\"DEBITOR_NUM\",\"AttributeValue\":null,\"AttributeQueryPrefix\":\"\",\"AttributeQuerySuffix\":\"\",\"Prefix\":false,\"MultipleParameter\":false},{\"AttributeID\":\"VENDOR_NUM\",\"AttributeValue\":null,\"AttributeQueryPrefix\":\"\",\"AttributeQuerySuffix\":\"\",\"Prefix\":false,\"MultipleParameter\":false}],\"JSSnippets\":[],\"DataBaseDefinition\":{\"QueryDefinition\":\"SELECT\\n  COMPANY_NUM,\\n  VENDOR_NUM,\\n  ORDER_NUM\\nFROM\\n  dbo.CC_ORDERS\\nWHERE\\n  COMPANY_NUM = @DEBITOR_NUM\\n  AND VENDOR_NUM = @VENDOR_NUM\\n  AND (ORDER_NUM LIKE @OrderNum)\",\"QueryMappings\":[{\"ColumnName\":\"VENDOR_NUM\",\"AttributeID\":\"VENDOR_NUM\"},{\"ColumnName\":\"COMPANY_NUM\",\"AttributeID\":\"DEBITOR_NUM\"},{\"ColumnName\":\"ORDER_NUM\",\"AttributeID\":\"OrderNum\"}],\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"IsTransitive\":false,\"PositionCounterpart\":null,\"AutoComplete\":true,\"AllowNegativeAmount\":false}],\"AttributeStructureDefinitions\":[]}],\"StructureGroups\":[{\"GroupID\":0,\"GroupDescription\":\"PositionData\",\"MinifiedView\":false,\"AttributeDefinitions\":[],\"AttributeStructureDefinitions\":[{\"AttributeID\":\"positions\",\"AttributeDefinitions\":[{\"AttributeID\":\"Pos.OrderNum\",\"Description\":null,\"LocalizedDescriptions\":{},\"AttributeLabel\":null,\"AttributeIcon\":null,\"AttributeType\":0,\"Required\":false,\"ReadOnly\":false,\"DoAlignStart\":true,\"DefaultValue\":null,\"Values\":[],\"ColumnSizePercent\":15,\"MinLength\":0,\"MaxLength\":0,\"SizeDesktop\":0,\"SizeTablet\":0,\"SizePhone\":0,\"Minified\":null,\"Position\":{\"verticalPosition\":0,\"horizontalPosition\":0},\"TabStop\":0,\"ValueConversion\":null,\"Title\":null,\"Pattern\":null,\"QueryAttributes\":[{\"AttributeID\":\"Pos.OrderNum\",\"AttributeValue\":null,\"AttributeQueryPrefix\":\"%\",\"AttributeQuerySuffix\":\"%\",\"Prefix\":true,\"MultipleParameter\":false},{\"AttributeID\":\"DEBITOR_NUM\",\"AttributeValue\":null,\"AttributeQueryPrefix\":\"\",\"AttributeQuerySuffix\":\"\",\"Prefix\":false,\"MultipleParameter\":false},{\"AttributeID\":\"VENDOR_NUM\",\"AttributeValue\":null,\"AttributeQueryPrefix\":\"\",\"AttributeQuerySuffix\":\"\",\"Prefix\":false,\"MultipleParameter\":false}],\"JSSnippets\":[],\"DataBaseDefinition\":{\"QueryDefinition\":\"SELECT\\n  ORL.ORDER_NUM,\\n  ORL.ORDER_POS,\\n  MATNR,\\n  VENDOR_MATNR,\\n  DESCRIPTION,\\n  UNIT_PRICE,\\n  ORL.QUANTITY,\\n  SUM_PRICE,\\n  PRICE_UNITS,\\n  UNITS,\\n  RECEIPT_NUM\\nFROM\\n  dbo.CC_ORDERLINES AS ORL\\n  INNER JOIN dbo.CC_ORDERS AS ORD ON ORL.ORDER_NUM = ORD.ORDER_NUM\\n  LEFT JOIN dbo.CC_RECEIPTS AS REC ON ORL.ORDER_NUM = REC.ORDER_NUM\\n  AND ORL.ORDER_POS = REC.ORDER_POS\\n  AND ORL.COMPANY_NUM = REC.COMPANY_NUM\\nWHERE\\n  ORL.COMPANY_NUM = @DEBITOR_NUM\\n  AND ORD.VENDOR_NUM = @VENDOR_NUM\\n  AND ORL.ORDER_NUM LIKE @PosOrderNum\",\"QueryMappings\":[{\"ColumnName\":\"ORDER_NUM\",\"AttributeID\":\"Pos.OrderNum\"},{\"ColumnName\":\"ORDER_POS\",\"AttributeID\":\"Pos.OrderPos\"},{\"ColumnName\":\"MATNR\",\"AttributeID\":\"Pos.Article\"},{\"ColumnName\":\"VENDOR_MATNR\",\"AttributeID\":\"Pos.VENDOR_MATNR\"},{\"ColumnName\":\"DESCRIPTION\",\"AttributeID\":\"Pos.Description\"},{\"ColumnName\":\"UNIT_PRICE\",\"AttributeID\":\"Pos.UPrice\"},{\"ColumnName\":\"QUANTITY\",\"AttributeID\":\"Pos.Quantity\"},{\"ColumnName\":\"SUM_PRICE\",\"AttributeID\":\"Pos.SPrice\"},{\"ColumnName\":\"PRICE_UNITS\",\"AttributeID\":\"Pos.PRICE_UNITS\"},{\"ColumnName\":\"UNITS\",\"AttributeID\":\"Pos.UNITS\"},{\"ColumnName\":\"RECEIPT_NUM\",\"AttributeID\":\"Pos.DeliveryNote\"}],\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"IsTransitive\":false,\"PositionCounterpart\":null,\"AutoComplete\":true,\"AllowNegativeAmount\":false},{\"AttributeID\":\"Pos.UPrice\",\"Description\":null,\"LocalizedDescriptions\":{},\"AttributeLabel\":null,\"AttributeIcon\":null,\"AttributeType\":0,\"Required\":true,\"ReadOnly\":false,\"DoAlignStart\":false,\"DefaultValue\":\"0.00\",\"Values\":[],\"ColumnSizePercent\":10,\"MinLength\":0,\"MaxLength\":0,\"SizeDesktop\":0,\"SizeTablet\":0,\"SizePhone\":0,\"Minified\":null,\"Position\":{\"verticalPosition\":0,\"horizontalPosition\":0},\"TabStop\":0,\"ValueConversion\":\"ConvertInputFloatWithCustomDelimiter\",\"Title\":null,\"Pattern\":null,\"QueryAttributes\":null,\"JSSnippets\":[{\"OnMethod\":\"input\",\"Code\":\" ConvertInputFloatWithCustomDelimiterOnInput(this);\\n var rowPrefixValues = this.id.split('___');\\n var structureName = rowPrefixValues[0];\\n var rowIndex = rowPrefixValues[1];\\n var UPrice = Number(GetPositionAttribute('Pos.UPrice', rowIndex, structureName));\\n var quantity = Number(GetPositionAttribute('Pos.Quantity', rowIndex, structureName));\\n SetPositionAttribute('Pos.SPrice', (Math.round(((UPrice * quantity) + Number.EPSILON) * 100) / 100).toFixed(2), rowIndex, structureName);\"}],\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"IsTransitive\":false,\"PositionCounterpart\":null,\"AutoComplete\":true,\"AllowNegativeAmount\":false},{\"AttributeID\":\"Pos.Quantity\",\"Description\":null,\"LocalizedDescriptions\":{},\"AttributeLabel\":null,\"AttributeIcon\":null,\"AttributeType\":0,\"Required\":true,\"ReadOnly\":false,\"DoAlignStart\":false,\"DefaultValue\":\"0\",\"Values\":[],\"ColumnSizePercent\":10,\"MinLength\":0,\"MaxLength\":0,\"SizeDesktop\":0,\"SizeTablet\":0,\"SizePhone\":0,\"Minified\":null,\"Position\":{\"verticalPosition\":0,\"horizontalPosition\":0},\"TabStop\":0,\"ValueConversion\":\"ConvertInputFloatWithCustomDelimiter\",\"Title\":null,\"Pattern\":null,\"QueryAttributes\":null,\"JSSnippets\":[{\"OnMethod\":\"input\",\"Code\":\" ConvertInputFloatWithCustomDelimiterOnInput(this);\\n var rowPrefixValues = this.id.split('___');\\n var structureName = rowPrefixValues[0];\\n var rowIndex = rowPrefixValues[1];\\n var UPrice = Number(GetPositionAttribute('Pos.UPrice', rowIndex, structureName));\\n var quantity = Number(GetPositionAttribute('Pos.Quantity', rowIndex, structureName));\\n SetPositionAttribute('Pos.SPrice', (Math.round(((UPrice * quantity) + Number.EPSILON) * 100) / 100).toFixed(2), rowIndex, structureName);\"}],\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"IsTransitive\":false,\"PositionCounterpart\":null,\"AutoComplete\":true,\"AllowNegativeAmount\":false},{\"AttributeID\":\"Pos.SPrice\",\"Description\":null,\"LocalizedDescriptions\":{},\"AttributeLabel\":null,\"AttributeIcon\":null,\"AttributeType\":0,\"Required\":true,\"ReadOnly\":false,\"DoAlignStart\":false,\"DefaultValue\":\"0.00\",\"Values\":[],\"ColumnSizePercent\":10,\"MinLength\":0,\"MaxLength\":0,\"SizeDesktop\":0,\"SizeTablet\":0,\"SizePhone\":0,\"Minified\":null,\"Position\":{\"verticalPosition\":0,\"horizontalPosition\":0},\"TabStop\":0,\"ValueConversion\":\"ConvertInputFloatWithCustomDelimiter\",\"Title\":null,\"Pattern\":null,\"QueryAttributes\":null,\"JSSnippets\":[{\"OnMethod\":\"input\",\"Code\":\" ConvertInputFloatWithCustomDelimiterOnInput(this);\"}],\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"IsTransitive\":false,\"PositionCounterpart\":null,\"AutoComplete\":true,\"AllowNegativeAmount\":false},{\"AttributeID\":\"Pos.OrderPos\",\"Description\":null,\"LocalizedDescriptions\":{},\"AttributeLabel\":null,\"AttributeIcon\":null,\"AttributeType\":0,\"Required\":false,\"ReadOnly\":false,\"DoAlignStart\":true,\"DefaultValue\":null,\"Values\":[],\"ColumnSizePercent\":10,\"MinLength\":0,\"MaxLength\":0,\"SizeDesktop\":0,\"SizeTablet\":0,\"SizePhone\":0,\"Minified\":null,\"Position\":{\"verticalPosition\":0,\"horizontalPosition\":0},\"TabStop\":0,\"ValueConversion\":null,\"Title\":null,\"Pattern\":null,\"QueryAttributes\":null,\"JSSnippets\":[],\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"IsTransitive\":false,\"PositionCounterpart\":null,\"AutoComplete\":true,\"AllowNegativeAmount\":false},{\"AttributeID\":\"Pos.DeliveryNote\",\"Description\":null,\"LocalizedDescriptions\":{},\"AttributeLabel\":null,\"AttributeIcon\":null,\"AttributeType\":0,\"Required\":false,\"ReadOnly\":false,\"DoAlignStart\":true,\"DefaultValue\":null,\"Values\":[],\"ColumnSizePercent\":10,\"MinLength\":0,\"MaxLength\":0,\"SizeDesktop\":0,\"SizeTablet\":0,\"SizePhone\":0,\"Minified\":null,\"Position\":{\"verticalPosition\":0,\"horizontalPosition\":0},\"TabStop\":0,\"ValueConversion\":null,\"Title\":null,\"Pattern\":null,\"QueryAttributes\":null,\"JSSnippets\":[],\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"IsTransitive\":false,\"PositionCounterpart\":null,\"AutoComplete\":true,\"AllowNegativeAmount\":false},{\"AttributeID\":\"Pos.Article\",\"Description\":null,\"LocalizedDescriptions\":{},\"AttributeLabel\":null,\"AttributeIcon\":null,\"AttributeType\":0,\"Required\":false,\"ReadOnly\":false,\"DoAlignStart\":true,\"DefaultValue\":null,\"Values\":[],\"ColumnSizePercent\":10,\"MinLength\":0,\"MaxLength\":0,\"SizeDesktop\":0,\"SizeTablet\":0,\"SizePhone\":0,\"Minified\":null,\"Position\":{\"verticalPosition\":0,\"horizontalPosition\":0},\"TabStop\":0,\"ValueConversion\":null,\"Title\":null,\"Pattern\":null,\"QueryAttributes\":null,\"JSSnippets\":[],\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"IsTransitive\":false,\"PositionCounterpart\":null,\"AutoComplete\":true,\"AllowNegativeAmount\":false},{\"AttributeID\":\"Pos.Description\",\"Description\":null,\"LocalizedDescriptions\":{},\"AttributeLabel\":null,\"AttributeIcon\":null,\"AttributeType\":0,\"Required\":false,\"ReadOnly\":false,\"DoAlignStart\":true,\"DefaultValue\":null,\"Values\":[],\"ColumnSizePercent\":20,\"MinLength\":0,\"MaxLength\":0,\"SizeDesktop\":0,\"SizeTablet\":0,\"SizePhone\":0,\"Minified\":null,\"Position\":{\"verticalPosition\":0,\"horizontalPosition\":0},\"TabStop\":0,\"ValueConversion\":null,\"Title\":null,\"Pattern\":null,\"QueryAttributes\":null,\"JSSnippets\":[],\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"IsTransitive\":false,\"PositionCounterpart\":null,\"AutoComplete\":true,\"AllowNegativeAmount\":false},{\"AttributeID\":\"ConfigColumn\",\"Description\":null,\"LocalizedDescriptions\":{},\"AttributeLabel\":null,\"AttributeIcon\":null,\"AttributeType\":0,\"Required\":false,\"ReadOnly\":false,\"DoAlignStart\":true,\"DefaultValue\":null,\"Values\":[],\"ColumnSizePercent\":5,\"MinLength\":0,\"MaxLength\":0,\"SizeDesktop\":0,\"SizeTablet\":0,\"SizePhone\":0,\"Minified\":null,\"Position\":{\"verticalPosition\":0,\"horizontalPosition\":0},\"TabStop\":0,\"ValueConversion\":null,\"Title\":null,\"Pattern\":null,\"QueryAttributes\":null,\"JSSnippets\":[],\"DataBaseDefinition\":{\"QueryDefinition\":null,\"QueryMappings\":null,\"HttpDataSourceId\":null,\"IsResultTransformationEnabled\":false},\"IsTransitive\":false,\"PositionCounterpart\":null,\"AutoComplete\":true,\"AllowNegativeAmount\":false}],\"JSSnippets\":[]}]}],\"JSSnippets\":[],\"TemplateDefinition\":{\"TemplateId\":\"VENDOR_NUM\",\"TemplateName\":\"VENDOR_NAME\"}}"),
		layouts: [{
			"DocumentTypeID": "INV_Standard",
			"CustomDuplicateCheck": {
				"QueryDefinition": "",
				"QueryMappings": [],
				"HttpDataSourceId": null,
				"IsResultTransformationEnabled": false
			},
			"DateTargetFormats": [
				{
					"Code": "de",
					"JSFormat": "DD.MM.YYYY",
					"Format": "dd.MM.yyyy",
					"Pattern": "^(0?[1-9]|[12][0-9]|3[01])[.](0?[1-9]|1[012])[.](\\d{4})$"
				},
				{
					"Code": "en-GB",
					"JSFormat": "DD/MM/YYYY",
					"Format": "dd/MM/yyyy",
					"Pattern": "^(0?[1-9]|[12][0-9]|3[01])/(0?[1-9]|1[012])/(\\d{4})$"
				},
				{
					"Code": "en-US",
					"JSFormat": "MM/DD/YYYY",
					"Format": "MM/dd/yyyy",
					"Pattern": "^(0?[1-9]|1[012])/(0?[1-9]|[12][0-9]|3[01])/(\\d{4})$"
				},
				{
					"Code": "en",
					"JSFormat": "DD/MM/YYYY",
					"Format": "dd/MM/yyyy",
					"Pattern": "^(0?[1-9]|[12][0-9]|3[01])/(0?[1-9]|1[012])/(\\d{4})$"
				},
				{
					"Code": "fr",
					"JSFormat": "DD/MM/YYYY",
					"Format": "dd/MM/yyyy",
					"Pattern": "^(0?[1-9]|[12][0-9]|3[01])/(0?[1-9]|1[012])/(\\d{4})$"
				},
				{
					"Code": "cs",
					"JSFormat": "DD.MM.YYYY",
					"Format": "dd.MM.yyyy",
					"Pattern": "^(0?[1-9]|[12][0-9]|3[01])[.](0?[1-9]|1[012])[.](\\d{4})$"
				},
				{
					"Code": "da",
					"JSFormat": "DD-MM-YYYY",
					"Format": "dd-MM-yyyy",
					"Pattern": "^(0?[1-9]|[12][0-9]|3[01])-(0?[1-9]|1[012])-(\\d{4})$"
				},
				{
					"Code": "es",
					"JSFormat": "DD/MM/YYYY",
					"Format": "dd/MM/yyyy",
					"Pattern": "^(0?[1-9]|[12][0-9]|3[01])/(0?[1-9]|1[012])/(\\d{4})$"
				},
				{
					"Code": "hr",
					"JSFormat": "DD.MM.YYYY",
					"Format": "dd.MM.yyyy",
					"Pattern": "^(0?[1-9]|[12][0-9]|3[01])[.](0?[1-9]|1[012])[.](\\d{4})$"
				},
				{
					"Code": "it",
					"JSFormat": "DD/MM/YYYY",
					"Format": "dd/MM/yyyy",
					"Pattern": "^(0?[1-9]|[12][0-9]|3[01])/(0?[1-9]|1[012])/(\\d{4})$"
				},
				{
					"Code": "nl",
					"JSFormat": "DD-MM-YYYY",
					"Format": "dd-MM-yyyy",
					"Pattern": "^(0?[1-9]|[12][0-9]|3[01])-(0?[1-9]|1[012])-(\\d{4})$"
				},
				{
					"Code": "pl",
					"JSFormat": "DD.MM.YYYY",
					"Format": "dd.MM.yyyy",
					"Pattern": "^(0?[1-9]|[12][0-9]|3[01])[.](0?[1-9]|1[012])[.](\\d{4})$"
				},
				{
					"Code": "pt",
					"JSFormat": "DD-MM-YYYY",
					"Format": "dd-MM-yyyy",
					"Pattern": "^(0?[1-9]|[12][0-9]|3[01])-(0?[1-9]|1[012])-(\\d{4})$"
				},
				{
					"Code": "sk",
					"JSFormat": "DD.MM.YYYY",
					"Format": "dd.MM.yyyy",
					"Pattern": "^(0?[1-9]|[12][0-9]|3[01])[.](0?[1-9]|1[012])[.](\\d{4})$"
				},
				{
					"Code": "sr",
					"JSFormat": "DD.MM.YYYY",
					"Format": "dd.MM.yyyy",
					"Pattern": "^(0?[1-9]|[12][0-9]|3[01])[.](0?[1-9]|1[012])[.](\\d{4})$"
				},
				{
					"Code": "zh",
					"JSFormat": "YYYY-MM-DD",
					"Format": "yyyy-MM-dd",
					"Pattern": "^\\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])$"
				}
			],
			"FloatValueFormats": [
				{
					"Code": "de",
					"ThousandDelimiter": "",
					"DecimalPlacesDelimiter": ",",
					"Pattern": "^\\d+(,\\d+)?$"
				},
				{
					"Code": "en-GB",
					"ThousandDelimiter": "",
					"DecimalPlacesDelimiter": ".",
					"Pattern": "^\\d+(\\.\\d+)?$"
				},
				{
					"Code": "en-US",
					"ThousandDelimiter": "",
					"DecimalPlacesDelimiter": ".",
					"Pattern": "^\\d+(\\.\\d+)?$"
				},
				{
					"Code": "en",
					"ThousandDelimiter": "",
					"DecimalPlacesDelimiter": ".",
					"Pattern": "^\\d+(\\.\\d+)?$"
				},
				{
					"Code": "fr",
					"ThousandDelimiter": "",
					"DecimalPlacesDelimiter": ",",
					"Pattern": "^\\d+(,\\d+)?$"
				},
				{
					"Code": "cs",
					"ThousandDelimiter": "",
					"DecimalPlacesDelimiter": ",",
					"Pattern": "^\\d+(,\\d+)?$"
				},
				{
					"Code": "da",
					"ThousandDelimiter": "",
					"DecimalPlacesDelimiter": ",",
					"Pattern": "^\\d+(,\\d+)?$"
				},
				{
					"Code": "es",
					"ThousandDelimiter": "",
					"DecimalPlacesDelimiter": ",",
					"Pattern": "^\\d+(,\\d+)?$"
				},
				{
					"Code": "hr",
					"ThousandDelimiter": "",
					"DecimalPlacesDelimiter": ",",
					"Pattern": "^\\d+(,\\d+)?$"
				},
				{
					"Code": "it",
					"ThousandDelimiter": "",
					"DecimalPlacesDelimiter": ",",
					"Pattern": "^\\d+(,\\d+)?$"
				},
				{
					"Code": "nl",
					"ThousandDelimiter": "",
					"DecimalPlacesDelimiter": ",",
					"Pattern": "^\\d+(,\\d+)?$"
				},
				{
					"Code": "pl",
					"ThousandDelimiter": "",
					"DecimalPlacesDelimiter": ",",
					"Pattern": "^\\d+(,\\d+)?$"
				},
				{
					"Code": "pt",
					"ThousandDelimiter": "",
					"DecimalPlacesDelimiter": ",",
					"Pattern": "^\\d+(,\\d+)?$"
				},
				{
					"Code": "sk",
					"ThousandDelimiter": "",
					"DecimalPlacesDelimiter": ",",
					"Pattern": "^\\d+(,\\d+)?$"
				},
				{
					"Code": "sr",
					"ThousandDelimiter": "",
					"DecimalPlacesDelimiter": ",",
					"Pattern": "^\\d+(,\\d+)?$"
				},
				{
					"Code": "zh",
					"ThousandDelimiter": "",
					"DecimalPlacesDelimiter": ".",
					"Pattern": "^\\d+(\\.\\d+)?$"
				}
			],
			"AttributeTypeDefinitions": [
				{
					"AttributeTypeId": "VENDOR_NUM",
					"AttributeTypeDescription": "Vendor Number",
					"SemanticType": 0,
					"ValueType": 3,
					"DataBaseDefinition": {
						"QueryDefinition": null,
						"QueryMappings": null,
						"HttpDataSourceId": null,
						"IsResultTransformationEnabled": false
					},
					"DInfSaveOption": 0,
					"DClassifyAlias": "vendor.VENDOR_NUM",
					"InboundAlias": null,
					"LoggingFlag": 0,
					"InterpretAsMultipleValues": false,
					"ModelType": 0,
					"TemplatePath": "basics.vendor clues"
				},
				{
					"AttributeTypeId": "InvoiceNumber",
					"AttributeTypeDescription": "Invoice Number",
					"SemanticType": 0,
					"ValueType": 3,
					"DataBaseDefinition": {
						"QueryDefinition": null,
						"QueryMappings": null,
						"HttpDataSourceId": null,
						"IsResultTransformationEnabled": false
					},
					"DInfSaveOption": 0,
					"DClassifyAlias": "invoicenumber",
					"InboundAlias": null,
					"LoggingFlag": 0,
					"InterpretAsMultipleValues": false,
					"ModelType": 1,
					"TemplatePath": "vendor.[TEMPLATE_ID].invoicenumber"
				},
				{
					"AttributeTypeId": "InvoiceDate",
					"AttributeTypeDescription": "Invoice Date",
					"SemanticType": 0,
					"ValueType": 2,
					"DataBaseDefinition": {
						"QueryDefinition": null,
						"QueryMappings": null,
						"HttpDataSourceId": null,
						"IsResultTransformationEnabled": false
					},
					"DInfSaveOption": 0,
					"DClassifyAlias": "invoicedate.date",
					"InboundAlias": null,
					"LoggingFlag": 0,
					"InterpretAsMultipleValues": false,
					"ModelType": 1,
					"TemplatePath": "vendor.[TEMPLATE_ID].invoicedate"
				},
				{
					"AttributeTypeId": "CostCenter",
					"AttributeTypeDescription": "CostCenter",
					"SemanticType": 0,
					"ValueType": 3,
					"DataBaseDefinition": {
						"QueryDefinition": null,
						"QueryMappings": null,
						"HttpDataSourceId": null,
						"IsResultTransformationEnabled": false
					},
					"DInfSaveOption": 1,
					"DClassifyAlias": "costcenter",
					"InboundAlias": null,
					"LoggingFlag": 1,
					"InterpretAsMultipleValues": false,
					"ModelType": 0,
					"TemplatePath": null
				},
				{
					"AttributeTypeId": "ImpersonalAccount",
					"AttributeTypeDescription": "ImpersonalAccount",
					"SemanticType": 0,
					"ValueType": 3,
					"DataBaseDefinition": {
						"QueryDefinition": null,
						"QueryMappings": null,
						"HttpDataSourceId": null,
						"IsResultTransformationEnabled": false
					},
					"DInfSaveOption": 1,
					"DClassifyAlias": "impersonal-account",
					"InboundAlias": null,
					"LoggingFlag": 1,
					"InterpretAsMultipleValues": false,
					"ModelType": 0,
					"TemplatePath": null
				},
				{
					"AttributeTypeId": "9e322012-3cc1-402d-9fd8-f64aad71fbf7",
					"AttributeTypeDescription": "Barcode",
					"SemanticType": 0,
					"ValueType": 3,
					"DataBaseDefinition": {
						"QueryDefinition": null,
						"QueryMappings": null,
						"HttpDataSourceId": null,
						"IsResultTransformationEnabled": false
					},
					"DInfSaveOption": 0,
					"DClassifyAlias": null,
					"InboundAlias": null,
					"LoggingFlag": 1,
					"InterpretAsMultipleValues": false,
					"ModelType": 0,
					"TemplatePath": null
				},
				{
					"AttributeTypeId": "3d6dd2a3-bfc6-4170-b7e5-8d347d449c35",
					"AttributeTypeDescription": "Barcode3",
					"SemanticType": 0,
					"ValueType": 3,
					"DataBaseDefinition": {
						"QueryDefinition": null,
						"QueryMappings": null,
						"HttpDataSourceId": null,
						"IsResultTransformationEnabled": false
					},
					"DInfSaveOption": 0,
					"DClassifyAlias": null,
					"InboundAlias": null,
					"LoggingFlag": 1,
					"InterpretAsMultipleValues": false,
					"ModelType": 0,
					"TemplatePath": null
				},
				{
					"AttributeTypeId": "Notes",
					"AttributeTypeDescription": "Notes",
					"SemanticType": 0,
					"ValueType": 3,
					"DataBaseDefinition": {
						"QueryDefinition": null,
						"QueryMappings": null,
						"HttpDataSourceId": null,
						"IsResultTransformationEnabled": false
					},
					"DInfSaveOption": 0,
					"DClassifyAlias": null,
					"InboundAlias": null,
					"LoggingFlag": 1,
					"InterpretAsMultipleValues": false,
					"ModelType": 0,
					"TemplatePath": null
				},
				{
					"AttributeTypeId": "VENDOR_NAME",
					"AttributeTypeDescription": "Vendor Name",
					"SemanticType": 0,
					"ValueType": 3,
					"DataBaseDefinition": {
						"QueryDefinition": null,
						"QueryMappings": null,
						"HttpDataSourceId": null,
						"IsResultTransformationEnabled": false
					},
					"DInfSaveOption": 0,
					"DClassifyAlias": "vendor.VENDOR_NAME",
					"InboundAlias": null,
					"LoggingFlag": 1,
					"InterpretAsMultipleValues": false,
					"ModelType": 0,
					"TemplatePath": null
				},
				{
					"AttributeTypeId": "VENDOR_CITY",
					"AttributeTypeDescription": "Vendor City",
					"SemanticType": 0,
					"ValueType": 3,
					"DataBaseDefinition": {
						"QueryDefinition": null,
						"QueryMappings": null,
						"HttpDataSourceId": null,
						"IsResultTransformationEnabled": false
					},
					"DInfSaveOption": 0,
					"DClassifyAlias": "vendor.VENDOR_CITY",
					"InboundAlias": null,
					"LoggingFlag": 1,
					"InterpretAsMultipleValues": false,
					"ModelType": 0,
					"TemplatePath": null
				},
				{
					"AttributeTypeId": "VENDOR_STR",
					"AttributeTypeDescription": "VendorStr",
					"SemanticType": 0,
					"ValueType": 3,
					"DataBaseDefinition": {
						"QueryDefinition": null,
						"QueryMappings": null,
						"HttpDataSourceId": null,
						"IsResultTransformationEnabled": false
					},
					"DInfSaveOption": 0,
					"DClassifyAlias": "vendor.VENDOR_STR",
					"InboundAlias": null,
					"LoggingFlag": 1,
					"InterpretAsMultipleValues": false,
					"ModelType": 0,
					"TemplatePath": null
				},
				{
					"AttributeTypeId": "VENDOR_ZIP_CODE",
					"AttributeTypeDescription": "VendorZipCode",
					"SemanticType": 0,
					"ValueType": 3,
					"DataBaseDefinition": {
						"QueryDefinition": null,
						"QueryMappings": null,
						"HttpDataSourceId": null,
						"IsResultTransformationEnabled": false
					},
					"DInfSaveOption": 0,
					"DClassifyAlias": "vendor.VENDOR_ZIP_CODE",
					"InboundAlias": null,
					"LoggingFlag": 1,
					"InterpretAsMultipleValues": false,
					"ModelType": 0,
					"TemplatePath": null
				},
				{
					"AttributeTypeId": "VENDOR_VAT_REGISTRATION_ID",
					"AttributeTypeDescription": "VendorVatID",
					"SemanticType": 0,
					"ValueType": 3,
					"DataBaseDefinition": {
						"QueryDefinition": null,
						"QueryMappings": null,
						"HttpDataSourceId": null,
						"IsResultTransformationEnabled": false
					},
					"DInfSaveOption": 0,
					"DClassifyAlias": "vendor.VENDOR_VAT_REGISTRATION_ID",
					"InboundAlias": null,
					"LoggingFlag": 1,
					"InterpretAsMultipleValues": false,
					"ModelType": 0,
					"TemplatePath": null
				},
				{
					"AttributeTypeId": "VENDOR_COUNTRY",
					"AttributeTypeDescription": "Vendor Country",
					"SemanticType": 0,
					"ValueType": 3,
					"DataBaseDefinition": {
						"QueryDefinition": null,
						"QueryMappings": null,
						"HttpDataSourceId": null,
						"IsResultTransformationEnabled": false
					},
					"DInfSaveOption": 0,
					"DClassifyAlias": null,
					"InboundAlias": null,
					"LoggingFlag": 1,
					"InterpretAsMultipleValues": false,
					"ModelType": 0,
					"TemplatePath": null
				},
				{
					"AttributeTypeId": "VENDOR_IBAN",
					"AttributeTypeDescription": "VENDOR_IBAN",
					"SemanticType": 0,
					"ValueType": 3,
					"DataBaseDefinition": {
						"QueryDefinition": null,
						"QueryMappings": null,
						"HttpDataSourceId": null,
						"IsResultTransformationEnabled": false
					},
					"DInfSaveOption": 0,
					"DClassifyAlias": "vendor.iban",
					"InboundAlias": null,
					"LoggingFlag": 1,
					"InterpretAsMultipleValues": false,
					"ModelType": 0,
					"TemplatePath": null
				},
				{
					"AttributeTypeId": "DEBITOR_NUM",
					"AttributeTypeDescription": "DebitorNum",
					"SemanticType": 0,
					"ValueType": 3,
					"DataBaseDefinition": {
						"QueryDefinition": null,
						"QueryMappings": null,
						"HttpDataSourceId": null,
						"IsResultTransformationEnabled": false
					},
					"DInfSaveOption": 0,
					"DClassifyAlias": "company.COMPANY_NUM",
					"InboundAlias": null,
					"LoggingFlag": 0,
					"InterpretAsMultipleValues": false,
					"ModelType": 0,
					"TemplatePath": null
				},
				{
					"AttributeTypeId": "NAME",
					"AttributeTypeDescription": "DebitorName",
					"SemanticType": 1,
					"ValueType": 3,
					"DataBaseDefinition": {
						"QueryDefinition": "SELECT COMPANY_NUM, NAME, STR, ZIP, CITY, COUNTRY, DEFAULT_CURRENCY FROM dbo.CC_COMPANIES WHERE NAME LIKE @NAME",
						"QueryMappings": [
							{
								"ColumnName": "COMPANY_NUM",
								"AttributeID": "DEBITOR_NUM"
							},
							{
								"ColumnName": "NAME",
								"AttributeID": "NAME"
							},
							{
								"ColumnName": "STR",
								"AttributeID": "STR"
							},
							{
								"ColumnName": "ZIP",
								"AttributeID": "ZIP"
							},
							{
								"ColumnName": "CITY",
								"AttributeID": "CITY"
							},
							{
								"ColumnName": "COUNTRY",
								"AttributeID": "COUNTRY"
							},
							{
								"ColumnName": "DEFAULT_CURRENCY",
								"AttributeID": "DEFAULT_CURRENCY"
							}
						],
						"HttpDataSourceId": null,
						"IsResultTransformationEnabled": false
					},
					"DInfSaveOption": 0,
					"DClassifyAlias": "company.NAME",
					"InboundAlias": null,
					"LoggingFlag": 1,
					"InterpretAsMultipleValues": false,
					"ModelType": 0,
					"TemplatePath": null
				},
				{
					"AttributeTypeId": "CITY",
					"AttributeTypeDescription": "DebitorCity",
					"SemanticType": 0,
					"ValueType": 3,
					"DataBaseDefinition": {
						"QueryDefinition": null,
						"QueryMappings": null,
						"HttpDataSourceId": null,
						"IsResultTransformationEnabled": false
					},
					"DInfSaveOption": 0,
					"DClassifyAlias": "company.CITY",
					"InboundAlias": null,
					"LoggingFlag": 1,
					"InterpretAsMultipleValues": false,
					"ModelType": 0,
					"TemplatePath": null
				},
				{
					"AttributeTypeId": "STR",
					"AttributeTypeDescription": "DebitorStr",
					"SemanticType": 0,
					"ValueType": 3,
					"DataBaseDefinition": {
						"QueryDefinition": null,
						"QueryMappings": null,
						"HttpDataSourceId": null,
						"IsResultTransformationEnabled": false
					},
					"DInfSaveOption": 0,
					"DClassifyAlias": "company.STR",
					"InboundAlias": null,
					"LoggingFlag": 1,
					"InterpretAsMultipleValues": false,
					"ModelType": 0,
					"TemplatePath": null
				},
				{
					"AttributeTypeId": "COUNTRY",
					"AttributeTypeDescription": "COUNTRY",
					"SemanticType": 0,
					"ValueType": 3,
					"DataBaseDefinition": {
						"QueryDefinition": null,
						"QueryMappings": null,
						"HttpDataSourceId": null,
						"IsResultTransformationEnabled": false
					},
					"DInfSaveOption": 0,
					"DClassifyAlias": "company.COUNTRY",
					"InboundAlias": null,
					"LoggingFlag": 1,
					"InterpretAsMultipleValues": false,
					"ModelType": 0,
					"TemplatePath": null
				},
				{
					"AttributeTypeId": "DEFAULT_CURRENCY",
					"AttributeTypeDescription": "DEFAULT_CURRENCY",
					"SemanticType": 0,
					"ValueType": 3,
					"DataBaseDefinition": {
						"QueryDefinition": null,
						"QueryMappings": null,
						"HttpDataSourceId": null,
						"IsResultTransformationEnabled": false
					},
					"DInfSaveOption": 0,
					"DClassifyAlias": "company.DEFAULT_CURRENCY",
					"InboundAlias": null,
					"LoggingFlag": 2,
					"InterpretAsMultipleValues": false,
					"ModelType": 0,
					"TemplatePath": null
				},
				{
					"AttributeTypeId": "GrossAmount",
					"AttributeTypeDescription": "GrossAmount",
					"SemanticType": 0,
					"ValueType": 1,
					"DataBaseDefinition": {
						"QueryDefinition": null,
						"QueryMappings": null,
						"HttpDataSourceId": null,
						"IsResultTransformationEnabled": false
					},
					"DInfSaveOption": 0,
					"DClassifyAlias": "Betragsdaten.Bruttobetrag",
					"InboundAlias": null,
					"LoggingFlag": 0,
					"InterpretAsMultipleValues": false,
					"ModelType": 1,
					"TemplatePath": "vendor.[TEMPLATE_ID].TrustedAmount"
				},
				{
					"AttributeTypeId": "NetAmount1",
					"AttributeTypeDescription": "NetAmount1",
					"SemanticType": 0,
					"ValueType": 1,
					"DataBaseDefinition": {
						"QueryDefinition": null,
						"QueryMappings": null,
						"HttpDataSourceId": null,
						"IsResultTransformationEnabled": false
					},
					"DInfSaveOption": 0,
					"DClassifyAlias": "Betragsdaten.Nettobetrag",
					"InboundAlias": null,
					"LoggingFlag": 0,
					"InterpretAsMultipleValues": false,
					"ModelType": 1,
					"TemplatePath": "vendor.[TEMPLATE_ID].TrustedNet1"
				},
				{
					"AttributeTypeId": "VatAmount1",
					"AttributeTypeDescription": "VatAmount1",
					"SemanticType": 0,
					"ValueType": 1,
					"DataBaseDefinition": {
						"QueryDefinition": null,
						"QueryMappings": null,
						"HttpDataSourceId": null,
						"IsResultTransformationEnabled": false
					},
					"DInfSaveOption": 0,
					"DClassifyAlias": "Betragsdaten.Mehrwertsteuerbetrag",
					"InboundAlias": null,
					"LoggingFlag": 0,
					"InterpretAsMultipleValues": false,
					"ModelType": 1,
					"TemplatePath": "vendor.[TEMPLATE_ID].TrustedVatAmount1"
				},
				{
					"AttributeTypeId": "VatRate1",
					"AttributeTypeDescription": "VatRate1",
					"SemanticType": 0,
					"ValueType": 1,
					"DataBaseDefinition": {
						"QueryDefinition": null,
						"QueryMappings": null,
						"HttpDataSourceId": null,
						"IsResultTransformationEnabled": false
					},
					"DInfSaveOption": 0,
					"DClassifyAlias": "Betragsdaten.Mehrwertsteuersatz",
					"InboundAlias": null,
					"LoggingFlag": 0,
					"InterpretAsMultipleValues": false,
					"ModelType": 1,
					"TemplatePath": "vendor.[TEMPLATE_ID].TrustedVat1"
				},
				{
					"AttributeTypeId": "OrderNum",
					"AttributeTypeDescription": "OrderNum",
					"SemanticType": 0,
					"ValueType": 3,
					"DataBaseDefinition": {
						"QueryDefinition": null,
						"QueryMappings": null,
						"HttpDataSourceId": null,
						"IsResultTransformationEnabled": false
					},
					"DInfSaveOption": 0,
					"DClassifyAlias": "orders.ORDER_NUM",
					"InboundAlias": null,
					"LoggingFlag": 0,
					"InterpretAsMultipleValues": true,
					"ModelType": 2,
					"TemplatePath": "basics.ordernumber"
				},
				{
					"AttributeTypeId": "ProjectNumber",
					"AttributeTypeDescription": "ProjectNumber",
					"SemanticType": 0,
					"ValueType": 3,
					"DataBaseDefinition": {
						"QueryDefinition": null,
						"QueryMappings": null,
						"HttpDataSourceId": null,
						"IsResultTransformationEnabled": false
					},
					"DInfSaveOption": 0,
					"DClassifyAlias": "ProjectNumber",
					"InboundAlias": null,
					"LoggingFlag": 0,
					"InterpretAsMultipleValues": false,
					"ModelType": 0,
					"TemplatePath": null
				},
				{
					"AttributeTypeId": "ZIP",
					"AttributeTypeDescription": "DebitorZip",
					"SemanticType": 0,
					"ValueType": 3,
					"DataBaseDefinition": {
						"QueryDefinition": null,
						"QueryMappings": null,
						"HttpDataSourceId": null,
						"IsResultTransformationEnabled": false
					},
					"DInfSaveOption": 0,
					"DClassifyAlias": "company.ZIP",
					"InboundAlias": null,
					"LoggingFlag": 1,
					"InterpretAsMultipleValues": false,
					"ModelType": 0,
					"TemplatePath": null
				},
				{
					"AttributeTypeId": "NetAmount2",
					"AttributeTypeDescription": "NetAmount2",
					"SemanticType": 0,
					"ValueType": 1,
					"DataBaseDefinition": {
						"QueryDefinition": null,
						"QueryMappings": null,
						"HttpDataSourceId": null,
						"IsResultTransformationEnabled": false
					},
					"DInfSaveOption": 0,
					"DClassifyAlias": "Betragsdaten.Nettobetrag2",
					"InboundAlias": null,
					"LoggingFlag": 0,
					"InterpretAsMultipleValues": false,
					"ModelType": 1,
					"TemplatePath": "vendor.[TEMPLATE_ID].TrustedNet2"
				},
				{
					"AttributeTypeId": "VatAmount2",
					"AttributeTypeDescription": "VatAmount2",
					"SemanticType": 0,
					"ValueType": 1,
					"DataBaseDefinition": {
						"QueryDefinition": null,
						"QueryMappings": null,
						"HttpDataSourceId": null,
						"IsResultTransformationEnabled": false
					},
					"DInfSaveOption": 0,
					"DClassifyAlias": "Betragsdaten.Mehrwertsteuerbetrag2",
					"InboundAlias": null,
					"LoggingFlag": 0,
					"InterpretAsMultipleValues": false,
					"ModelType": 1,
					"TemplatePath": "vendor.[TEMPLATE_ID].TrustedVatAmount2"
				},
				{
					"AttributeTypeId": "VatRate2",
					"AttributeTypeDescription": "VatRate2",
					"SemanticType": 0,
					"ValueType": 1,
					"DataBaseDefinition": {
						"QueryDefinition": null,
						"QueryMappings": null,
						"HttpDataSourceId": null,
						"IsResultTransformationEnabled": false
					},
					"DInfSaveOption": 0,
					"DClassifyAlias": "Betragsdaten.Mehrwertsteuersatz2",
					"InboundAlias": null,
					"LoggingFlag": 0,
					"InterpretAsMultipleValues": false,
					"ModelType": 1,
					"TemplatePath": "vendor.[TEMPLATE_ID].TrustedVat2"
				},
				{
					"AttributeTypeId": "NetAmount3",
					"AttributeTypeDescription": "NetAmount3",
					"SemanticType": 0,
					"ValueType": 1,
					"DataBaseDefinition": {
						"QueryDefinition": null,
						"QueryMappings": null,
						"HttpDataSourceId": null,
						"IsResultTransformationEnabled": false
					},
					"DInfSaveOption": 0,
					"DClassifyAlias": null,
					"InboundAlias": null,
					"LoggingFlag": 0,
					"InterpretAsMultipleValues": false,
					"ModelType": 0,
					"TemplatePath": null
				},
				{
					"AttributeTypeId": "VatAmount3",
					"AttributeTypeDescription": "VatAmount3",
					"SemanticType": 0,
					"ValueType": 1,
					"DataBaseDefinition": {
						"QueryDefinition": null,
						"QueryMappings": null,
						"HttpDataSourceId": null,
						"IsResultTransformationEnabled": false
					},
					"DInfSaveOption": 0,
					"DClassifyAlias": null,
					"InboundAlias": null,
					"LoggingFlag": 0,
					"InterpretAsMultipleValues": false,
					"ModelType": 0,
					"TemplatePath": null
				},
				{
					"AttributeTypeId": "VatRate3",
					"AttributeTypeDescription": "VatRate3",
					"SemanticType": 0,
					"ValueType": 1,
					"DataBaseDefinition": {
						"QueryDefinition": null,
						"QueryMappings": null,
						"HttpDataSourceId": null,
						"IsResultTransformationEnabled": false
					},
					"DInfSaveOption": 0,
					"DClassifyAlias": null,
					"InboundAlias": null,
					"LoggingFlag": 0,
					"InterpretAsMultipleValues": false,
					"ModelType": 0,
					"TemplatePath": null
				},
				{
					"AttributeTypeId": "AdditionalCosts",
					"AttributeTypeDescription": "AdditionalCosts",
					"SemanticType": 0,
					"ValueType": 1,
					"DataBaseDefinition": {
						"QueryDefinition": null,
						"QueryMappings": null,
						"HttpDataSourceId": null,
						"IsResultTransformationEnabled": false
					},
					"DInfSaveOption": 0,
					"DClassifyAlias": "deliverycosts",
					"InboundAlias": null,
					"LoggingFlag": 0,
					"InterpretAsMultipleValues": false,
					"ModelType": 0,
					"TemplatePath": null
				},
				{
					"AttributeTypeId": "Discount",
					"AttributeTypeDescription": "Discount",
					"SemanticType": 0,
					"ValueType": 1,
					"DataBaseDefinition": {
						"QueryDefinition": null,
						"QueryMappings": null,
						"HttpDataSourceId": null,
						"IsResultTransformationEnabled": false
					},
					"DInfSaveOption": 0,
					"DClassifyAlias": null,
					"InboundAlias": null,
					"LoggingFlag": 0,
					"InterpretAsMultipleValues": false,
					"ModelType": 0,
					"TemplatePath": null
				},
				{
					"AttributeTypeId": "Issuer",
					"AttributeTypeDescription": "Issuer",
					"SemanticType": 0,
					"ValueType": 3,
					"DataBaseDefinition": {
						"QueryDefinition": null,
						"QueryMappings": null,
						"HttpDataSourceId": null,
						"IsResultTransformationEnabled": false
					},
					"DInfSaveOption": 0,
					"DClassifyAlias": null,
					"InboundAlias": null,
					"LoggingFlag": 1,
					"InterpretAsMultipleValues": false,
					"ModelType": 0,
					"TemplatePath": null
				},
				{
					"AttributeTypeId": "Advisor",
					"AttributeTypeDescription": "Advisor",
					"SemanticType": 0,
					"ValueType": 3,
					"DataBaseDefinition": {
						"QueryDefinition": null,
						"QueryMappings": null,
						"HttpDataSourceId": null,
						"IsResultTransformationEnabled": false
					},
					"DInfSaveOption": 0,
					"DClassifyAlias": null,
					"InboundAlias": null,
					"LoggingFlag": 1,
					"InterpretAsMultipleValues": false,
					"ModelType": 0,
					"TemplatePath": null
				},
				{
					"AttributeTypeId": "Email",
					"AttributeTypeDescription": "Email",
					"SemanticType": 0,
					"ValueType": 3,
					"DataBaseDefinition": {
						"QueryDefinition": null,
						"QueryMappings": null,
						"HttpDataSourceId": null,
						"IsResultTransformationEnabled": false
					},
					"DInfSaveOption": 0,
					"DClassifyAlias": null,
					"InboundAlias": null,
					"LoggingFlag": 1,
					"InterpretAsMultipleValues": false,
					"ModelType": 0,
					"TemplatePath": null
				},
				{
					"AttributeTypeId": "TermOfPayment",
					"AttributeTypeDescription": "TermOfPayment",
					"SemanticType": 0,
					"ValueType": 3,
					"DataBaseDefinition": {
						"QueryDefinition": null,
						"QueryMappings": null,
						"HttpDataSourceId": null,
						"IsResultTransformationEnabled": false
					},
					"DInfSaveOption": 0,
					"DClassifyAlias": null,
					"InboundAlias": null,
					"LoggingFlag": 1,
					"InterpretAsMultipleValues": false,
					"ModelType": 0,
					"TemplatePath": null
				},
				{
					"AttributeTypeId": "GrossAmountCurrency",
					"AttributeTypeDescription": "GrossAmountCurrency",
					"SemanticType": 0,
					"ValueType": 5,
					"DataBaseDefinition": {
						"QueryDefinition": null,
						"QueryMappings": null,
						"HttpDataSourceId": null,
						"IsResultTransformationEnabled": false
					},
					"DInfSaveOption": 0,
					"DClassifyAlias": "currency",
					"InboundAlias": null,
					"LoggingFlag": 0,
					"InterpretAsMultipleValues": false,
					"ModelType": 1,
					"TemplatePath": "vendor.[TEMPLATE_ID].currency"
				},
				{
					"AttributeTypeId": "DocumentType",
					"AttributeTypeDescription": "DocumentType",
					"SemanticType": 0,
					"ValueType": 5,
					"DataBaseDefinition": {
						"QueryDefinition": null,
						"QueryMappings": null,
						"HttpDataSourceId": null,
						"IsResultTransformationEnabled": false
					},
					"DInfSaveOption": 0,
					"DClassifyAlias": "documenttype",
					"InboundAlias": null,
					"LoggingFlag": 0,
					"InterpretAsMultipleValues": false,
					"ModelType": 1,
					"TemplatePath": "vendor.[TEMPLATE_ID].Documenttype"
				},
				{
					"AttributeTypeId": "DocumentUID",
					"AttributeTypeDescription": "DocumentUID",
					"SemanticType": 16,
					"ValueType": 3,
					"DataBaseDefinition": {
						"QueryDefinition": null,
						"QueryMappings": null,
						"HttpDataSourceId": null,
						"IsResultTransformationEnabled": false
					},
					"DInfSaveOption": 0,
					"DClassifyAlias": null,
					"InboundAlias": null,
					"LoggingFlag": 1,
					"InterpretAsMultipleValues": false,
					"ModelType": 0,
					"TemplatePath": null
				},
				{
					"AttributeTypeId": "PerformanceDate",
					"AttributeTypeDescription": "PerformanceDate",
					"SemanticType": 0,
					"ValueType": 2,
					"DataBaseDefinition": {
						"QueryDefinition": null,
						"QueryMappings": null,
						"HttpDataSourceId": null,
						"IsResultTransformationEnabled": false
					},
					"DInfSaveOption": 0,
					"DClassifyAlias": "performancedate.date",
					"InboundAlias": null,
					"LoggingFlag": 0,
					"InterpretAsMultipleValues": false,
					"ModelType": 1,
					"TemplatePath": "vendor.[TEMPLATE_ID].performancedate"
				},
				{
					"AttributeTypeId": "BookingDate",
					"AttributeTypeDescription": "BookingDate",
					"SemanticType": 0,
					"ValueType": 2,
					"DataBaseDefinition": {
						"QueryDefinition": null,
						"QueryMappings": null,
						"HttpDataSourceId": null,
						"IsResultTransformationEnabled": false
					},
					"DInfSaveOption": 0,
					"DClassifyAlias": "performancedate.date",
					"InboundAlias": null,
					"LoggingFlag": 0,
					"InterpretAsMultipleValues": false,
					"ModelType": 0,
					"TemplatePath": null
				},
				{
					"AttributeTypeId": "VENDOR_REGISTRATION_ID",
					"AttributeTypeDescription": "VENDOR_REGISTRATION_ID",
					"SemanticType": 0,
					"ValueType": 3,
					"DataBaseDefinition": {
						"QueryDefinition": null,
						"QueryMappings": null,
						"HttpDataSourceId": null,
						"IsResultTransformationEnabled": false
					},
					"DInfSaveOption": 0,
					"DClassifyAlias": "vendor.VENDOR_REGISTRATION_ID",
					"InboundAlias": null,
					"LoggingFlag": 1,
					"InterpretAsMultipleValues": false,
					"ModelType": 0,
					"TemplatePath": null
				},
				{
					"AttributeTypeId": "AutoRoutingFlag",
					"AttributeTypeDescription": "AutoRoutingFlag",
					"SemanticType": 0,
					"ValueType": 3,
					"DataBaseDefinition": {
						"QueryDefinition": null,
						"QueryMappings": null,
						"HttpDataSourceId": null,
						"IsResultTransformationEnabled": false
					},
					"DInfSaveOption": 0,
					"DClassifyAlias": "extended_vendor_settings.AutoRoutingFlag",
					"InboundAlias": null,
					"LoggingFlag": 1,
					"InterpretAsMultipleValues": false,
					"ModelType": 0,
					"TemplatePath": null
				},
				{
					"AttributeTypeId": "QR-IBAN",
					"AttributeTypeDescription": "QR-IBAN",
					"SemanticType": 0,
					"ValueType": 3,
					"DataBaseDefinition": {
						"QueryDefinition": null,
						"QueryMappings": null,
						"HttpDataSourceId": null,
						"IsResultTransformationEnabled": false
					},
					"DInfSaveOption": 0,
					"DClassifyAlias": "QR-IBAN",
					"InboundAlias": null,
					"LoggingFlag": 1,
					"InterpretAsMultipleValues": false,
					"ModelType": 0,
					"TemplatePath": null
				},
				{
					"AttributeTypeId": "QR-REFERENCE",
					"AttributeTypeDescription": "QR-REFERENCE",
					"SemanticType": 0,
					"ValueType": 3,
					"DataBaseDefinition": {
						"QueryDefinition": null,
						"QueryMappings": null,
						"HttpDataSourceId": null,
						"IsResultTransformationEnabled": false
					},
					"DInfSaveOption": 0,
					"DClassifyAlias": "QR-REFERENCE",
					"InboundAlias": null,
					"LoggingFlag": 1,
					"InterpretAsMultipleValues": false,
					"ModelType": 0,
					"TemplatePath": null
				},
				{
					"AttributeTypeId": "Custom1",
					"AttributeTypeDescription": "Custom1",
					"SemanticType": 0,
					"ValueType": 3,
					"DataBaseDefinition": {
						"QueryDefinition": null,
						"QueryMappings": null,
						"HttpDataSourceId": null,
						"IsResultTransformationEnabled": false
					},
					"DInfSaveOption": 0,
					"DClassifyAlias": "Custom1",
					"InboundAlias": null,
					"LoggingFlag": 2,
					"InterpretAsMultipleValues": false,
					"ModelType": 0,
					"TemplatePath": null
				},
				{
					"AttributeTypeId": "Custom2",
					"AttributeTypeDescription": "Custom2",
					"SemanticType": 0,
					"ValueType": 3,
					"DataBaseDefinition": {
						"QueryDefinition": null,
						"QueryMappings": null,
						"HttpDataSourceId": null,
						"IsResultTransformationEnabled": false
					},
					"DInfSaveOption": 0,
					"DClassifyAlias": "Custom2",
					"InboundAlias": null,
					"LoggingFlag": 2,
					"InterpretAsMultipleValues": false,
					"ModelType": 0,
					"TemplatePath": null
				},
				{
					"AttributeTypeId": "Custom3",
					"AttributeTypeDescription": "Custom3",
					"SemanticType": 0,
					"ValueType": 3,
					"DataBaseDefinition": {
						"QueryDefinition": null,
						"QueryMappings": null,
						"HttpDataSourceId": null,
						"IsResultTransformationEnabled": false
					},
					"DInfSaveOption": 0,
					"DClassifyAlias": "Custom3",
					"InboundAlias": null,
					"LoggingFlag": 2,
					"InterpretAsMultipleValues": false,
					"ModelType": 0,
					"TemplatePath": null
				},
				{
					"AttributeTypeId": "Custom4",
					"AttributeTypeDescription": "Custom4",
					"SemanticType": 0,
					"ValueType": 3,
					"DataBaseDefinition": {
						"QueryDefinition": null,
						"QueryMappings": null,
						"HttpDataSourceId": null,
						"IsResultTransformationEnabled": false
					},
					"DInfSaveOption": 0,
					"DClassifyAlias": "Custom4",
					"InboundAlias": null,
					"LoggingFlag": 2,
					"InterpretAsMultipleValues": false,
					"ModelType": 0,
					"TemplatePath": null
				},
				{
					"AttributeTypeId": "Custom5",
					"AttributeTypeDescription": "Custom5",
					"SemanticType": 0,
					"ValueType": 3,
					"DataBaseDefinition": {
						"QueryDefinition": null,
						"QueryMappings": null,
						"HttpDataSourceId": null,
						"IsResultTransformationEnabled": false
					},
					"DInfSaveOption": 0,
					"DClassifyAlias": "Custom5",
					"InboundAlias": null,
					"LoggingFlag": 2,
					"InterpretAsMultipleValues": false,
					"ModelType": 0,
					"TemplatePath": null
				},
				{
					"AttributeTypeId": "Custom6",
					"AttributeTypeDescription": "Custom6",
					"SemanticType": 0,
					"ValueType": 3,
					"DataBaseDefinition": {
						"QueryDefinition": null,
						"QueryMappings": null,
						"HttpDataSourceId": null,
						"IsResultTransformationEnabled": false
					},
					"DInfSaveOption": 0,
					"DClassifyAlias": "Custom6",
					"InboundAlias": null,
					"LoggingFlag": 2,
					"InterpretAsMultipleValues": false,
					"ModelType": 0,
					"TemplatePath": null
				},
				{
					"AttributeTypeId": "Custom7",
					"AttributeTypeDescription": "Custom7",
					"SemanticType": 0,
					"ValueType": 3,
					"DataBaseDefinition": {
						"QueryDefinition": null,
						"QueryMappings": null,
						"HttpDataSourceId": null,
						"IsResultTransformationEnabled": false
					},
					"DInfSaveOption": 0,
					"DClassifyAlias": "Custom7",
					"InboundAlias": null,
					"LoggingFlag": 2,
					"InterpretAsMultipleValues": false,
					"ModelType": 0,
					"TemplatePath": null
				},
				{
					"AttributeTypeId": "Custom8",
					"AttributeTypeDescription": "Custom8",
					"SemanticType": 0,
					"ValueType": 3,
					"DataBaseDefinition": {
						"QueryDefinition": null,
						"QueryMappings": null,
						"HttpDataSourceId": null,
						"IsResultTransformationEnabled": false
					},
					"DInfSaveOption": 0,
					"DClassifyAlias": "Custom8",
					"InboundAlias": null,
					"LoggingFlag": 2,
					"InterpretAsMultipleValues": false,
					"ModelType": 0,
					"TemplatePath": null
				},
				{
					"AttributeTypeId": "Custom9",
					"AttributeTypeDescription": "Custom9",
					"SemanticType": 0,
					"ValueType": 3,
					"DataBaseDefinition": {
						"QueryDefinition": null,
						"QueryMappings": null,
						"HttpDataSourceId": null,
						"IsResultTransformationEnabled": false
					},
					"DInfSaveOption": 0,
					"DClassifyAlias": "Custom9",
					"InboundAlias": null,
					"LoggingFlag": 2,
					"InterpretAsMultipleValues": false,
					"ModelType": 0,
					"TemplatePath": null
				},
				{
					"AttributeTypeId": "Custom10",
					"AttributeTypeDescription": "Custom10",
					"SemanticType": 0,
					"ValueType": 3,
					"DataBaseDefinition": {
						"QueryDefinition": null,
						"QueryMappings": null,
						"HttpDataSourceId": null,
						"IsResultTransformationEnabled": false
					},
					"DInfSaveOption": 0,
					"DClassifyAlias": "Custom10",
					"InboundAlias": null,
					"LoggingFlag": 2,
					"InterpretAsMultipleValues": false,
					"ModelType": 0,
					"TemplatePath": null
				},
				{
					"AttributeTypeId": "Custom11",
					"AttributeTypeDescription": "Custom11",
					"SemanticType": 0,
					"ValueType": 3,
					"DataBaseDefinition": {
						"QueryDefinition": null,
						"QueryMappings": null,
						"HttpDataSourceId": null,
						"IsResultTransformationEnabled": false
					},
					"DInfSaveOption": 1,
					"DClassifyAlias": "Custom11",
					"InboundAlias": null,
					"LoggingFlag": 2,
					"InterpretAsMultipleValues": false,
					"ModelType": 0,
					"TemplatePath": null
				},
				{
					"AttributeTypeId": "Custom12",
					"AttributeTypeDescription": "Custom12",
					"SemanticType": 0,
					"ValueType": 3,
					"DataBaseDefinition": {
						"QueryDefinition": null,
						"QueryMappings": null,
						"HttpDataSourceId": null,
						"IsResultTransformationEnabled": false
					},
					"DInfSaveOption": 1,
					"DClassifyAlias": "Custom12",
					"InboundAlias": null,
					"LoggingFlag": 2,
					"InterpretAsMultipleValues": false,
					"ModelType": 0,
					"TemplatePath": null
				},
				{
					"AttributeTypeId": "Custom13",
					"AttributeTypeDescription": "Custom13",
					"SemanticType": 0,
					"ValueType": 3,
					"DataBaseDefinition": {
						"QueryDefinition": null,
						"QueryMappings": null,
						"HttpDataSourceId": null,
						"IsResultTransformationEnabled": false
					},
					"DInfSaveOption": 1,
					"DClassifyAlias": "Custom13",
					"InboundAlias": null,
					"LoggingFlag": 2,
					"InterpretAsMultipleValues": false,
					"ModelType": 0,
					"TemplatePath": null
				},
				{
					"AttributeTypeId": "Custom14",
					"AttributeTypeDescription": "Custom14",
					"SemanticType": 0,
					"ValueType": 3,
					"DataBaseDefinition": {
						"QueryDefinition": null,
						"QueryMappings": null,
						"HttpDataSourceId": null,
						"IsResultTransformationEnabled": false
					},
					"DInfSaveOption": 1,
					"DClassifyAlias": "Custom14",
					"InboundAlias": null,
					"LoggingFlag": 2,
					"InterpretAsMultipleValues": false,
					"ModelType": 0,
					"TemplatePath": null
				},
				{
					"AttributeTypeId": "Custom15",
					"AttributeTypeDescription": "Custom15",
					"SemanticType": 0,
					"ValueType": 3,
					"DataBaseDefinition": {
						"QueryDefinition": null,
						"QueryMappings": null,
						"HttpDataSourceId": null,
						"IsResultTransformationEnabled": false
					},
					"DInfSaveOption": 1,
					"DClassifyAlias": "Custom15",
					"InboundAlias": null,
					"LoggingFlag": 2,
					"InterpretAsMultipleValues": false,
					"ModelType": 0,
					"TemplatePath": null
				},
				{
					"AttributeTypeId": "Custom16",
					"AttributeTypeDescription": "Custom16",
					"SemanticType": 0,
					"ValueType": 3,
					"DataBaseDefinition": {
						"QueryDefinition": null,
						"QueryMappings": null,
						"HttpDataSourceId": null,
						"IsResultTransformationEnabled": false
					},
					"DInfSaveOption": 1,
					"DClassifyAlias": "Custom16",
					"InboundAlias": null,
					"LoggingFlag": 2,
					"InterpretAsMultipleValues": false,
					"ModelType": 0,
					"TemplatePath": null
				},
				{
					"AttributeTypeId": "Custom17",
					"AttributeTypeDescription": "Custom17",
					"SemanticType": 0,
					"ValueType": 3,
					"DataBaseDefinition": {
						"QueryDefinition": null,
						"QueryMappings": null,
						"HttpDataSourceId": null,
						"IsResultTransformationEnabled": false
					},
					"DInfSaveOption": 1,
					"DClassifyAlias": "Custom17",
					"InboundAlias": null,
					"LoggingFlag": 2,
					"InterpretAsMultipleValues": false,
					"ModelType": 0,
					"TemplatePath": null
				},
				{
					"AttributeTypeId": "Custom18",
					"AttributeTypeDescription": "Custom18",
					"SemanticType": 0,
					"ValueType": 3,
					"DataBaseDefinition": {
						"QueryDefinition": null,
						"QueryMappings": null,
						"HttpDataSourceId": null,
						"IsResultTransformationEnabled": false
					},
					"DInfSaveOption": 1,
					"DClassifyAlias": "Custom18",
					"InboundAlias": null,
					"LoggingFlag": 2,
					"InterpretAsMultipleValues": false,
					"ModelType": 0,
					"TemplatePath": null
				},
				{
					"AttributeTypeId": "Custom19",
					"AttributeTypeDescription": "Custom19",
					"SemanticType": 0,
					"ValueType": 3,
					"DataBaseDefinition": {
						"QueryDefinition": null,
						"QueryMappings": null,
						"HttpDataSourceId": null,
						"IsResultTransformationEnabled": false
					},
					"DInfSaveOption": 1,
					"DClassifyAlias": "Custom19",
					"InboundAlias": null,
					"LoggingFlag": 2,
					"InterpretAsMultipleValues": false,
					"ModelType": 0,
					"TemplatePath": null
				},
				{
					"AttributeTypeId": "Custom20",
					"AttributeTypeDescription": "Custom20",
					"SemanticType": 0,
					"ValueType": 3,
					"DataBaseDefinition": {
						"QueryDefinition": null,
						"QueryMappings": null,
						"HttpDataSourceId": null,
						"IsResultTransformationEnabled": false
					},
					"DInfSaveOption": 1,
					"DClassifyAlias": "Custom20",
					"InboundAlias": null,
					"LoggingFlag": 2,
					"InterpretAsMultipleValues": false,
					"ModelType": 0,
					"TemplatePath": null
				},
				{
					"AttributeTypeId": "Inbound_creatorName",
					"AttributeTypeDescription": "InboundCreatorName",
					"SemanticType": 0,
					"ValueType": 3,
					"DataBaseDefinition": {
						"QueryDefinition": null,
						"QueryMappings": null,
						"HttpDataSourceId": null,
						"IsResultTransformationEnabled": false
					},
					"DInfSaveOption": 1,
					"DClassifyAlias": null,
					"InboundAlias": null,
					"LoggingFlag": 1,
					"InterpretAsMultipleValues": false,
					"ModelType": 0,
					"TemplatePath": null
				},
				{
					"AttributeTypeId": "Inbound_importProcessname",
					"AttributeTypeDescription": "InboundImportProcessname",
					"SemanticType": 0,
					"ValueType": 3,
					"DataBaseDefinition": {
						"QueryDefinition": null,
						"QueryMappings": null,
						"HttpDataSourceId": null,
						"IsResultTransformationEnabled": false
					},
					"DInfSaveOption": 1,
					"DClassifyAlias": null,
					"InboundAlias": null,
					"LoggingFlag": 1,
					"InterpretAsMultipleValues": false,
					"ModelType": 0,
					"TemplatePath": null
				},
				{
					"AttributeTypeId": "Inbound_importProcessId",
					"AttributeTypeDescription": "InboundImportProcessId",
					"SemanticType": 0,
					"ValueType": 3,
					"DataBaseDefinition": {
						"QueryDefinition": null,
						"QueryMappings": null,
						"HttpDataSourceId": null,
						"IsResultTransformationEnabled": false
					},
					"DInfSaveOption": 1,
					"DClassifyAlias": null,
					"InboundAlias": null,
					"LoggingFlag": 1,
					"InterpretAsMultipleValues": false,
					"ModelType": 0,
					"TemplatePath": null
				},
				{
					"AttributeTypeId": "Inbound_importDateTime",
					"AttributeTypeDescription": "InboundImportDateTime",
					"SemanticType": 0,
					"ValueType": 3,
					"DataBaseDefinition": {
						"QueryDefinition": null,
						"QueryMappings": null,
						"HttpDataSourceId": null,
						"IsResultTransformationEnabled": false
					},
					"DInfSaveOption": 1,
					"DClassifyAlias": null,
					"InboundAlias": null,
					"LoggingFlag": 1,
					"InterpretAsMultipleValues": false,
					"ModelType": 0,
					"TemplatePath": null
				},
				{
					"AttributeTypeId": "Inbound_documentName",
					"AttributeTypeDescription": "InboundDocumentName",
					"SemanticType": 0,
					"ValueType": 3,
					"DataBaseDefinition": {
						"QueryDefinition": null,
						"QueryMappings": null,
						"HttpDataSourceId": null,
						"IsResultTransformationEnabled": false
					},
					"DInfSaveOption": 1,
					"DClassifyAlias": null,
					"InboundAlias": null,
					"LoggingFlag": 1,
					"InterpretAsMultipleValues": false,
					"ModelType": 0,
					"TemplatePath": null
				},
				{
					"AttributeTypeId": "Inbound_documentCategoryId",
					"AttributeTypeDescription": "InboundDocumentCategoryId",
					"SemanticType": 0,
					"ValueType": 3,
					"DataBaseDefinition": {
						"QueryDefinition": null,
						"QueryMappings": null,
						"HttpDataSourceId": null,
						"IsResultTransformationEnabled": false
					},
					"DInfSaveOption": 1,
					"DClassifyAlias": null,
					"InboundAlias": null,
					"LoggingFlag": 1,
					"InterpretAsMultipleValues": false,
					"ModelType": 0,
					"TemplatePath": null
				},
				{
					"AttributeTypeId": "Inbound_documentCategoryName",
					"AttributeTypeDescription": "InboundDocumentCategoryName",
					"SemanticType": 0,
					"ValueType": 3,
					"DataBaseDefinition": {
						"QueryDefinition": null,
						"QueryMappings": null,
						"HttpDataSourceId": null,
						"IsResultTransformationEnabled": false
					},
					"DInfSaveOption": 1,
					"DClassifyAlias": null,
					"InboundAlias": null,
					"LoggingFlag": 1,
					"InterpretAsMultipleValues": false,
					"ModelType": 0,
					"TemplatePath": null
				},
				{
					"AttributeTypeId": "DocumentGUID",
					"AttributeTypeDescription": "DocumentGUID",
					"SemanticType": 0,
					"ValueType": 6,
					"DataBaseDefinition": {
						"QueryDefinition": null,
						"QueryMappings": null,
						"HttpDataSourceId": null,
						"IsResultTransformationEnabled": false
					},
					"DInfSaveOption": 0,
					"DClassifyAlias": null,
					"InboundAlias": null,
					"LoggingFlag": 2,
					"InterpretAsMultipleValues": false,
					"ModelType": 0,
					"TemplatePath": null
				},
				{
					"AttributeTypeId": "OriginalFileName",
					"AttributeTypeDescription": "OriginalFileName",
					"SemanticType": 0,
					"ValueType": 6,
					"DataBaseDefinition": {
						"QueryDefinition": null,
						"QueryMappings": null,
						"HttpDataSourceId": null,
						"IsResultTransformationEnabled": false
					},
					"DInfSaveOption": 0,
					"DClassifyAlias": null,
					"InboundAlias": null,
					"LoggingFlag": 1,
					"InterpretAsMultipleValues": false,
					"ModelType": 0,
					"TemplatePath": null
				},
				{
					"AttributeTypeId": "BatchCreator",
					"AttributeTypeDescription": "BatchCreator",
					"SemanticType": 0,
					"ValueType": 6,
					"DataBaseDefinition": {
						"QueryDefinition": null,
						"QueryMappings": null,
						"HttpDataSourceId": null,
						"IsResultTransformationEnabled": false
					},
					"DInfSaveOption": 0,
					"DClassifyAlias": null,
					"InboundAlias": null,
					"LoggingFlag": 1,
					"InterpretAsMultipleValues": false,
					"ModelType": 0,
					"TemplatePath": null
				},
				{
					"AttributeTypeId": "BatchEditor",
					"AttributeTypeDescription": "BatchEditor",
					"SemanticType": 0,
					"ValueType": 6,
					"DataBaseDefinition": {
						"QueryDefinition": null,
						"QueryMappings": null,
						"HttpDataSourceId": null,
						"IsResultTransformationEnabled": false
					},
					"DInfSaveOption": 0,
					"DClassifyAlias": null,
					"InboundAlias": null,
					"LoggingFlag": 1,
					"InterpretAsMultipleValues": false,
					"ModelType": 0,
					"TemplatePath": null
				},
				{
					"AttributeTypeId": "CH_QR_IBAN",
					"AttributeTypeDescription": "CH_QR_IBAN",
					"SemanticType": 0,
					"ValueType": 3,
					"DataBaseDefinition": {
						"QueryDefinition": null,
						"QueryMappings": null,
						"HttpDataSourceId": null,
						"IsResultTransformationEnabled": false
					},
					"DInfSaveOption": 0,
					"DClassifyAlias": null,
					"InboundAlias": null,
					"LoggingFlag": 1,
					"InterpretAsMultipleValues": false,
					"ModelType": 0,
					"TemplatePath": null
				},
				{
					"AttributeTypeId": "CH_QR_TYPE",
					"AttributeTypeDescription": "CH_QR_TYPE",
					"SemanticType": 0,
					"ValueType": 3,
					"DataBaseDefinition": {
						"QueryDefinition": null,
						"QueryMappings": null,
						"HttpDataSourceId": null,
						"IsResultTransformationEnabled": false
					},
					"DInfSaveOption": 0,
					"DClassifyAlias": null,
					"InboundAlias": null,
					"LoggingFlag": 1,
					"InterpretAsMultipleValues": false,
					"ModelType": 0,
					"TemplatePath": null
				},
				{
					"AttributeTypeId": "CH_QR_REFERENCE",
					"AttributeTypeDescription": "CH_QR_REFERENCE",
					"SemanticType": 0,
					"ValueType": 3,
					"DataBaseDefinition": {
						"QueryDefinition": null,
						"QueryMappings": null,
						"HttpDataSourceId": null,
						"IsResultTransformationEnabled": false
					},
					"DInfSaveOption": 0,
					"DClassifyAlias": null,
					"InboundAlias": null,
					"LoggingFlag": 1,
					"InterpretAsMultipleValues": false,
					"ModelType": 0,
					"TemplatePath": null
				},
				{
					"AttributeTypeId": "CH_QR_AMOUNT",
					"AttributeTypeDescription": "CH_QR_AMOUNT",
					"SemanticType": 0,
					"ValueType": 3,
					"DataBaseDefinition": {
						"QueryDefinition": null,
						"QueryMappings": null,
						"HttpDataSourceId": null,
						"IsResultTransformationEnabled": false
					},
					"DInfSaveOption": 0,
					"DClassifyAlias": null,
					"InboundAlias": null,
					"LoggingFlag": 1,
					"InterpretAsMultipleValues": false,
					"ModelType": 0,
					"TemplatePath": null
				},
				{
					"AttributeTypeId": "CH_QR_CURENCY",
					"AttributeTypeDescription": "CH_QR_CURENCY",
					"SemanticType": 0,
					"ValueType": 3,
					"DataBaseDefinition": {
						"QueryDefinition": null,
						"QueryMappings": null,
						"HttpDataSourceId": null,
						"IsResultTransformationEnabled": false
					},
					"DInfSaveOption": 0,
					"DClassifyAlias": null,
					"InboundAlias": null,
					"LoggingFlag": 1,
					"InterpretAsMultipleValues": false,
					"ModelType": 0,
					"TemplatePath": null
				},
				{
					"AttributeTypeId": "CH_QR_DESCR_MESSAGE",
					"AttributeTypeDescription": "CH_QR_DESCR_MESSAGE",
					"SemanticType": 0,
					"ValueType": 3,
					"DataBaseDefinition": {
						"QueryDefinition": null,
						"QueryMappings": null,
						"HttpDataSourceId": null,
						"IsResultTransformationEnabled": false
					},
					"DInfSaveOption": 0,
					"DClassifyAlias": null,
					"InboundAlias": null,
					"LoggingFlag": 1,
					"InterpretAsMultipleValues": false,
					"ModelType": 0,
					"TemplatePath": null
				},
				{
					"AttributeTypeId": "CH_QR_DESCR_INFO",
					"AttributeTypeDescription": "CH_QR_DESCR_INFO",
					"SemanticType": 0,
					"ValueType": 3,
					"DataBaseDefinition": {
						"QueryDefinition": null,
						"QueryMappings": null,
						"HttpDataSourceId": null,
						"IsResultTransformationEnabled": false
					},
					"DInfSaveOption": 0,
					"DClassifyAlias": null,
					"InboundAlias": null,
					"LoggingFlag": 1,
					"InterpretAsMultipleValues": false,
					"ModelType": 0,
					"TemplatePath": null
				},
				{
					"AttributeTypeId": "CH_QR_CODE",
					"AttributeTypeDescription": "CH_QR_CODE",
					"SemanticType": 0,
					"ValueType": 3,
					"DataBaseDefinition": {
						"QueryDefinition": null,
						"QueryMappings": null,
						"HttpDataSourceId": null,
						"IsResultTransformationEnabled": false
					},
					"DInfSaveOption": 0,
					"DClassifyAlias": null,
					"InboundAlias": null,
					"LoggingFlag": 1,
					"InterpretAsMultipleValues": false,
					"ModelType": 0,
					"TemplatePath": null
				},
				{
					"AttributeTypeId": "CH_ESR_LINE",
					"AttributeTypeDescription": "CH_ESR_LINE",
					"SemanticType": 0,
					"ValueType": 3,
					"DataBaseDefinition": {
						"QueryDefinition": null,
						"QueryMappings": null,
						"HttpDataSourceId": null,
						"IsResultTransformationEnabled": false
					},
					"DInfSaveOption": 0,
					"DClassifyAlias": "ESLine.ESCodezeile",
					"InboundAlias": null,
					"LoggingFlag": 1,
					"InterpretAsMultipleValues": false,
					"ModelType": 0,
					"TemplatePath": null
				},
				{
					"AttributeTypeId": "$DocumentRole$",
					"AttributeTypeDescription": "$DocumentRole$",
					"SemanticType": 19,
					"ValueType": 3,
					"DataBaseDefinition": {
						"QueryDefinition": null,
						"QueryMappings": null,
						"HttpDataSourceId": null,
						"IsResultTransformationEnabled": false
					},
					"DInfSaveOption": 1,
					"DClassifyAlias": "document-role",
					"InboundAlias": null,
					"LoggingFlag": 0,
					"InterpretAsMultipleValues": false,
					"ModelType": 0,
					"TemplatePath": null
				},
				{
					"AttributeTypeId": "Barcode",
					"AttributeTypeDescription": "Barcode",
					"SemanticType": 0,
					"ValueType": 3,
					"DataBaseDefinition": {
						"QueryDefinition": null,
						"QueryMappings": null,
						"HttpDataSourceId": null,
						"IsResultTransformationEnabled": false
					},
					"DInfSaveOption": 0,
					"DClassifyAlias": null,
					"InboundAlias": "a347de7d-62f5-4c44-8cf0-d963ab40b8e9",
					"LoggingFlag": 1,
					"InterpretAsMultipleValues": false,
					"ModelType": 0,
					"TemplatePath": null
				},
				{
					"AttributeTypeId": "Rechnungstyp",
					"AttributeTypeDescription": "Rechnungstyp",
					"SemanticType": 0,
					"ValueType": 5,
					"DataBaseDefinition": {
						"QueryDefinition": null,
						"QueryMappings": null,
						"HttpDataSourceId": null,
						"IsResultTransformationEnabled": false
					},
					"DInfSaveOption": 0,
					"DClassifyAlias": "Rechnungstyp",
					"InboundAlias": null,
					"LoggingFlag": 0,
					"InterpretAsMultipleValues": false,
					"ModelType": 0,
					"TemplatePath": null
				},
				{
					"AttributeTypeId": "exportXML",
					"AttributeTypeDescription": "exportXML",
					"SemanticType": 0,
					"ValueType": 3,
					"DataBaseDefinition": {
						"QueryDefinition": null,
						"QueryMappings": null,
						"HttpDataSourceId": null,
						"IsResultTransformationEnabled": false
					},
					"DInfSaveOption": 0,
					"DClassifyAlias": null,
					"InboundAlias": null,
					"LoggingFlag": 1,
					"InterpretAsMultipleValues": false,
					"ModelType": 0,
					"TemplatePath": null
				},
				{
					"AttributeTypeId": "debitorMapping",
					"AttributeTypeDescription": "debitorMapping",
					"SemanticType": 0,
					"ValueType": 3,
					"DataBaseDefinition": {
						"QueryDefinition": null,
						"QueryMappings": null,
						"HttpDataSourceId": null,
						"IsResultTransformationEnabled": false
					},
					"DInfSaveOption": 0,
					"DClassifyAlias": null,
					"InboundAlias": null,
					"LoggingFlag": 1,
					"InterpretAsMultipleValues": false,
					"ModelType": 0,
					"TemplatePath": null
				},
				{
					"AttributeTypeId": "Valutadatum",
					"AttributeTypeDescription": "Valutadatum",
					"SemanticType": 0,
					"ValueType": 2,
					"DataBaseDefinition": {
						"QueryDefinition": null,
						"QueryMappings": null,
						"HttpDataSourceId": null,
						"IsResultTransformationEnabled": false
					},
					"DInfSaveOption": 0,
					"DClassifyAlias": "Valutadatum",
					"InboundAlias": null,
					"LoggingFlag": 1,
					"InterpretAsMultipleValues": false,
					"ModelType": 0,
					"TemplatePath": null
				},
				{
					"AttributeTypeId": "OrderNumMulti",
					"AttributeTypeDescription": "OrderNumMulti",
					"SemanticType": 0,
					"ValueType": 3,
					"DataBaseDefinition": {
						"QueryDefinition": null,
						"QueryMappings": null,
						"HttpDataSourceId": null,
						"IsResultTransformationEnabled": false
					},
					"DInfSaveOption": 0,
					"DClassifyAlias": "OrderNumMulti",
					"InboundAlias": null,
					"LoggingFlag": 1,
					"InterpretAsMultipleValues": false,
					"ModelType": 0,
					"TemplatePath": null
				},
				{
					"AttributeTypeId": "Dokumentnummer",
					"AttributeTypeDescription": "Dokumentnummer",
					"SemanticType": 0,
					"ValueType": 3,
					"DataBaseDefinition": {
						"QueryDefinition": null,
						"QueryMappings": null,
						"HttpDataSourceId": null,
						"IsResultTransformationEnabled": false
					},
					"DInfSaveOption": 0,
					"DClassifyAlias": "Dokumentnummer",
					"InboundAlias": null,
					"LoggingFlag": 1,
					"InterpretAsMultipleValues": false,
					"ModelType": 0,
					"TemplatePath": null
				},
				{
					"AttributeTypeId": "DEBITOR_NAME",
					"AttributeTypeDescription": "DEBITOR_NAME",
					"SemanticType": 0,
					"ValueType": 5,
					"DataBaseDefinition": {
						"QueryDefinition": null,
						"QueryMappings": null,
						"HttpDataSourceId": null,
						"IsResultTransformationEnabled": false
					},
					"DInfSaveOption": 0,
					"DClassifyAlias": "DEBITOR_NAME",
					"InboundAlias": null,
					"LoggingFlag": 1,
					"InterpretAsMultipleValues": false,
					"ModelType": 0,
					"TemplatePath": null
				},
				{
					"AttributeTypeId": "IsDuplicate",
					"AttributeTypeDescription": "",
					"SemanticType": 0,
					"ValueType": 4,
					"DataBaseDefinition": {
						"QueryDefinition": null,
						"QueryMappings": null,
						"HttpDataSourceId": null,
						"IsResultTransformationEnabled": false
					},
					"DInfSaveOption": 0,
					"DClassifyAlias": null,
					"InboundAlias": null,
					"LoggingFlag": 1,
					"InterpretAsMultipleValues": false,
					"ModelType": 0
				},
				{
					"AttributeTypeId": "DuplicateDocumentIds",
					"AttributeTypeDescription": "",
					"SemanticType": 0,
					"ValueType": 5,
					"DataBaseDefinition": {
						"QueryDefinition": null,
						"QueryMappings": null,
						"HttpDataSourceId": null,
						"IsResultTransformationEnabled": false
					},
					"DInfSaveOption": 0,
					"DClassifyAlias": null,
					"InboundAlias": null,
					"LoggingFlag": 1,
					"InterpretAsMultipleValues": false,
					"ModelType": 0
				}
			],
			"AttributeTypeStructureDefinitions": [],
			"AttributeGroups": [
				{
					"GroupID": 0,
					"GroupDescription": "Client",
					"MinifiedView": true,
					"AttributeDefinitions": [
						{
							"AttributeID": "DEBITOR_NAME",
							"Description": "",
							"LocalizedDescriptions": {},
							"AttributeLabel": null,
							"AttributeIcon": null,
							"AttributeType": 0,
							"Required": true,
							"ReadOnly": false,
							"DoAlignStart": true,
							"DefaultValue": null,
							"Values": [],
							"ColumnSizePercent": 0,
							"MinLength": 0,
							"MaxLength": 0,
							"SizeDesktop": 12,
							"SizeTablet": 3,
							"SizePhone": 4,
							"Minified": {
								"SizeDesktop": 12,
								"SizeTablet": 3,
								"SizePhone": 4
							},
							"Position": {
								"verticalPosition": 0,
								"horizontalPosition": 0
							},
							"TabStop": 0,
							"ValueConversion": null,
							"Title": null,
							"Pattern": null,
							"QueryAttributes": [],
							"JSSnippets": [{
								"OnMethod": "change",
								"Code": "let debitorName = GetAttribute('DEBITOR_NAME');\r\n\r\nconst sqlQuery = `SELECT * FROM CC_COMPANIES WHERE NAME = '${debitorName}'`;\r\nif (!debitorName || debitorName.trim() === \"\") {\r\n    return;\r\n}\r\n\r\nGetSqlResult(sqlQuery)\r\n    .then(result => {\r\n\r\n        const headers = result.Headers;\r\n\r\n        const idxCompanyERPTenantId = headers.indexOf('ERPTENANT_ID');\r\n        const idxCompanyCompanyNum = headers.indexOf('COMPANY_ID');\r\n\r\n        const row = result.Rows[0];\r\n\r\n        const companyERPTenantId = row.Cells[idxCompanyERPTenantId];\r\n        const companyCompanyNum = row.Cells[idxCompanyCompanyNum];\r\n\r\n        SetAttribute('DEBITOR_NUM', companyCompanyNum);\r\n        SetAttribute('debitorMapping', `${companyERPTenantId}-${companyCompanyNum}`);\r\n\r\n    })\r\n    .catch(console.error);"
							}],
							"DataBaseDefinition": {
								"QueryDefinition": "",
								"QueryMappings": null,
								"HttpDataSourceId": null,
								"IsResultTransformationEnabled": false
							},
							"IsTransitive": false,
							"PositionCounterpart": null,
							"AutoComplete": true,
							"AllowNegativeAmount": false
						},
						{
							"AttributeID": "STR",
							"Description": null,
							"LocalizedDescriptions": {},
							"AttributeLabel": null,
							"AttributeIcon": null,
							"AttributeType": 0,
							"Required": false,
							"ReadOnly": true,
							"DoAlignStart": true,
							"DefaultValue": null,
							"Values": [],
							"ColumnSizePercent": 0,
							"MinLength": 0,
							"MaxLength": 0,
							"SizeDesktop": 4,
							"SizeTablet": 2,
							"SizePhone": 4,
							"Minified": null,
							"Position": {
								"verticalPosition": 1,
								"horizontalPosition": 0
							},
							"TabStop": 1,
							"ValueConversion": null,
							"Title": null,
							"Pattern": null,
							"QueryAttributes": [{
								"AttributeID": "STR",
								"AttributeValue": null,
								"AttributeQueryPrefix": "%",
								"AttributeQuerySuffix": "%",
								"Prefix": false,
								"MultipleParameter": false
							}],
							"JSSnippets": [],
							"DataBaseDefinition": {
								"QueryDefinition": "SELECT\n  COMPANY_NUM,\n  NAME,\n  STR,\n  ZIP,\n  CITY,\n  COUNTRY,\n  DEFAULT_CURRENCY\nFROM\n  dbo.CC_COMPANIES\nWHERE\n  STR LIKE @STR",
								"QueryMappings": [
									{
										"ColumnName": "COMPANY_NUM",
										"AttributeID": "DEBITOR_NUM"
									},
									{
										"ColumnName": "NAME",
										"AttributeID": "NAME"
									},
									{
										"ColumnName": "STR",
										"AttributeID": "STR"
									},
									{
										"ColumnName": "ZIP",
										"AttributeID": "ZIP"
									},
									{
										"ColumnName": "CITY",
										"AttributeID": "CITY"
									},
									{
										"ColumnName": "COUNTRY",
										"AttributeID": "COUNTRY"
									},
									{
										"ColumnName": "DEFAULT_CURRENCY",
										"AttributeID": "DEFAULT_CURRENCY"
									}
								],
								"HttpDataSourceId": null,
								"IsResultTransformationEnabled": false
							},
							"IsTransitive": false,
							"PositionCounterpart": null,
							"AutoComplete": true,
							"AllowNegativeAmount": false
						},
						{
							"AttributeID": "ZIP",
							"Description": null,
							"LocalizedDescriptions": {},
							"AttributeLabel": null,
							"AttributeIcon": null,
							"AttributeType": 0,
							"Required": false,
							"ReadOnly": true,
							"DoAlignStart": true,
							"DefaultValue": null,
							"Values": [],
							"ColumnSizePercent": 0,
							"MinLength": 0,
							"MaxLength": 0,
							"SizeDesktop": 4,
							"SizeTablet": 1,
							"SizePhone": 4,
							"Minified": null,
							"Position": {
								"verticalPosition": 1,
								"horizontalPosition": 1
							},
							"TabStop": 2,
							"ValueConversion": null,
							"Title": null,
							"Pattern": null,
							"QueryAttributes": null,
							"JSSnippets": [],
							"DataBaseDefinition": {
								"QueryDefinition": null,
								"QueryMappings": null,
								"HttpDataSourceId": null,
								"IsResultTransformationEnabled": false
							},
							"IsTransitive": false,
							"PositionCounterpart": null,
							"AutoComplete": true,
							"AllowNegativeAmount": false
						},
						{
							"AttributeID": "CITY",
							"Description": null,
							"LocalizedDescriptions": {},
							"AttributeLabel": null,
							"AttributeIcon": null,
							"AttributeType": 0,
							"Required": false,
							"ReadOnly": true,
							"DoAlignStart": true,
							"DefaultValue": null,
							"Values": [],
							"ColumnSizePercent": 0,
							"MinLength": 0,
							"MaxLength": 0,
							"SizeDesktop": 4,
							"SizeTablet": 2,
							"SizePhone": 4,
							"Minified": null,
							"Position": {
								"verticalPosition": 1,
								"horizontalPosition": 2
							},
							"TabStop": 3,
							"ValueConversion": null,
							"Title": null,
							"Pattern": null,
							"QueryAttributes": [{
								"AttributeID": "CITY",
								"AttributeValue": null,
								"AttributeQueryPrefix": "%",
								"AttributeQuerySuffix": "%",
								"Prefix": false,
								"MultipleParameter": false
							}],
							"JSSnippets": [],
							"DataBaseDefinition": {
								"QueryDefinition": "SELECT\n  COMPANY_NUM,\n  NAME,\n  STR,\n  ZIP,\n  CITY,\n  COUNTRY,\n  DEFAULT_CURRENCY\nFROM\n  dbo.CC_COMPANIES\nWHERE\n  CITY LIKE @CITY",
								"QueryMappings": [
									{
										"ColumnName": "COMPANY_NUM",
										"AttributeID": "DEBITOR_NUM"
									},
									{
										"ColumnName": "NAME",
										"AttributeID": "NAME"
									},
									{
										"ColumnName": "STR",
										"AttributeID": "STR"
									},
									{
										"ColumnName": "ZIP",
										"AttributeID": "ZIP"
									},
									{
										"ColumnName": "CITY",
										"AttributeID": "CITY"
									},
									{
										"ColumnName": "COUNTRY",
										"AttributeID": "COUNTRY"
									},
									{
										"ColumnName": "DEFAULT_CURRENCY",
										"AttributeID": "DEFAULT_CURRENCY"
									}
								],
								"HttpDataSourceId": null,
								"IsResultTransformationEnabled": false
							},
							"IsTransitive": false,
							"PositionCounterpart": null,
							"AutoComplete": true,
							"AllowNegativeAmount": false
						},
						{
							"AttributeID": "DEBITOR_NUM",
							"Description": null,
							"LocalizedDescriptions": {},
							"AttributeLabel": null,
							"AttributeIcon": null,
							"AttributeType": 0,
							"Required": false,
							"ReadOnly": true,
							"DoAlignStart": true,
							"DefaultValue": null,
							"Values": [],
							"ColumnSizePercent": 0,
							"MinLength": 0,
							"MaxLength": 0,
							"SizeDesktop": 6,
							"SizeTablet": 4,
							"SizePhone": 4,
							"Minified": null,
							"Position": {
								"verticalPosition": 2,
								"horizontalPosition": 0
							},
							"TabStop": 4,
							"ValueConversion": null,
							"Title": null,
							"Pattern": null,
							"QueryAttributes": [],
							"JSSnippets": [],
							"DataBaseDefinition": {
								"QueryDefinition": "",
								"QueryMappings": null,
								"HttpDataSourceId": null,
								"IsResultTransformationEnabled": false
							},
							"IsTransitive": false,
							"PositionCounterpart": null,
							"AutoComplete": true,
							"AllowNegativeAmount": true
						},
						{
							"AttributeID": "debitorMapping",
							"Description": null,
							"LocalizedDescriptions": {},
							"AttributeLabel": null,
							"AttributeIcon": null,
							"AttributeType": 0,
							"Required": false,
							"ReadOnly": true,
							"DoAlignStart": true,
							"DefaultValue": null,
							"Values": [],
							"ColumnSizePercent": 0,
							"MinLength": 0,
							"MaxLength": 0,
							"SizeDesktop": 6,
							"SizeTablet": 4,
							"SizePhone": 4,
							"Minified": null,
							"Position": {
								"verticalPosition": 2,
								"horizontalPosition": 1
							},
							"TabStop": 5,
							"ValueConversion": null,
							"Title": null,
							"Pattern": null,
							"QueryAttributes": [],
							"JSSnippets": [],
							"DataBaseDefinition": {
								"QueryDefinition": "",
								"QueryMappings": null,
								"HttpDataSourceId": null,
								"IsResultTransformationEnabled": false
							},
							"IsTransitive": false,
							"PositionCounterpart": null,
							"AutoComplete": true,
							"AllowNegativeAmount": true
						}
					],
					"AttributeStructureDefinitions": []
				},
				{
					"GroupID": 1,
					"GroupDescription": "Sender",
					"MinifiedView": true,
					"AttributeDefinitions": [
						{
							"AttributeID": "VENDOR_NUM",
							"Description": "Lieferant",
							"LocalizedDescriptions": {},
							"AttributeLabel": "Lieferant",
							"AttributeIcon": null,
							"AttributeType": 0,
							"Required": true,
							"ReadOnly": false,
							"DoAlignStart": true,
							"DefaultValue": null,
							"Values": [],
							"ColumnSizePercent": 0,
							"MinLength": 0,
							"MaxLength": 0,
							"SizeDesktop": 6,
							"SizeTablet": 3,
							"SizePhone": 4,
							"Minified": {
								"SizeDesktop": 6,
								"SizeTablet": 3,
								"SizePhone": 4
							},
							"Position": {
								"verticalPosition": 0,
								"horizontalPosition": 0
							},
							"TabStop": 6,
							"ValueConversion": null,
							"Title": null,
							"Pattern": null,
							"QueryAttributes": [{
								"AttributeID": "VENDOR_NUM",
								"AttributeValue": null,
								"AttributeQueryPrefix": "%",
								"AttributeQuerySuffix": "%",
								"Prefix": false,
								"MultipleParameter": false
							}, {
								"AttributeID": "DEBITOR_NAME",
								"AttributeValue": null,
								"AttributeQueryPrefix": "",
								"AttributeQuerySuffix": "",
								"Prefix": false,
								"MultipleParameter": false
							}],
							"JSSnippets": [],
							"DataBaseDefinition": {
								"QueryDefinition": "SELECT\n  TOP 100 ven.*,\n  venb.*\nFROM\n  dbo.CC_VENDORS AS ven\n  LEFT JOIN dbo.CC_VENDOR_BANK AS venb ON ven.VENDOR_NUM = venb.VENDOR_NUM\n  AND ven.COMPANY_NUM = venb.COMPANY_NUM\nWHERE\n  ven.COMPANY_NUM = @DEBITOR_NAME\n  AND (\n    ven.VENDOR_NUM LIKE @VENDOR_NUM\n    OR ven.VENDOR_NAME LIKE @VENDOR_NUM\n  )",
								"QueryMappings": [
									{
										"ColumnName": "VENDOR_NUM",
										"AttributeID": "VENDOR_NUM"
									},
									{
										"ColumnName": "VENDOR_NAME",
										"AttributeID": "VENDOR_NAME"
									},
									{
										"ColumnName": "VENDOR_STR",
										"AttributeID": "VENDOR_STR"
									},
									{
										"ColumnName": "VENDOR_CITY",
										"AttributeID": "VENDOR_CITY"
									},
									{
										"ColumnName": "VENDOR_ZIP_CODE",
										"AttributeID": "VENDOR_ZIP_CODE"
									},
									{
										"ColumnName": "VENDOR_VAT_REGISTRATION_ID",
										"AttributeID": "VENDOR_VAT_REGISTRATION_ID"
									},
									{
										"ColumnName": "VENDOR_REGISTRATION_ID",
										"AttributeID": "VENDOR_REGISTRATION_ID"
									},
									{
										"ColumnName": "IBAN",
										"AttributeID": "VENDOR_IBAN"
									}
								],
								"HttpDataSourceId": null,
								"IsResultTransformationEnabled": false
							},
							"IsTransitive": false,
							"PositionCounterpart": null,
							"AutoComplete": true,
							"AllowNegativeAmount": false
						},
						{
							"AttributeID": "VENDOR_NAME",
							"Description": null,
							"LocalizedDescriptions": {},
							"AttributeLabel": null,
							"AttributeIcon": null,
							"AttributeType": 0,
							"Required": true,
							"ReadOnly": true,
							"DoAlignStart": true,
							"DefaultValue": null,
							"Values": [],
							"ColumnSizePercent": 0,
							"MinLength": 0,
							"MaxLength": 0,
							"SizeDesktop": 6,
							"SizeTablet": 5,
							"SizePhone": 4,
							"Minified": {
								"SizeDesktop": 6,
								"SizeTablet": 5,
								"SizePhone": 4
							},
							"Position": {
								"verticalPosition": 0,
								"horizontalPosition": 1
							},
							"TabStop": 7,
							"ValueConversion": null,
							"Title": null,
							"Pattern": null,
							"QueryAttributes": [{
								"AttributeID": "VENDOR_NAME",
								"AttributeValue": null,
								"AttributeQueryPrefix": "%",
								"AttributeQuerySuffix": "%",
								"Prefix": false,
								"MultipleParameter": false
							}, {
								"AttributeID": "DEBITOR_NUM",
								"AttributeValue": null,
								"AttributeQueryPrefix": "",
								"AttributeQuerySuffix": "",
								"Prefix": false,
								"MultipleParameter": false
							}],
							"JSSnippets": [],
							"DataBaseDefinition": {
								"QueryDefinition": "SELECT\n  ven.*,\n  venb.*\nFROM\n  dbo.CC_VENDORS AS ven\n  LEFT JOIN dbo.CC_VENDOR_BANK AS venb ON ven.VENDOR_NUM = venb.VENDOR_NUM\n  AND ven.COMPANY_NUM = venb.COMPANY_NUM\nWHERE\n  ven.COMPANY_NUM = @DEBITOR_NUM\n  AND ven.VENDOR_NAME LIKE @VENDOR_NAME",
								"QueryMappings": [
									{
										"ColumnName": "VENDOR_NUM",
										"AttributeID": "VENDOR_NUM"
									},
									{
										"ColumnName": "VENDOR_NAME",
										"AttributeID": "VENDOR_NAME"
									},
									{
										"ColumnName": "VENDOR_STR",
										"AttributeID": "VENDOR_STR"
									},
									{
										"ColumnName": "VENDOR_CITY",
										"AttributeID": "VENDOR_CITY"
									},
									{
										"ColumnName": "VENDOR_ZIP_CODE",
										"AttributeID": "VENDOR_ZIP_CODE"
									},
									{
										"ColumnName": "VENDOR_VAT_REGISTRATION_ID",
										"AttributeID": "VENDOR_VAT_REGISTRATION_ID"
									},
									{
										"ColumnName": "VENDOR_REGISTRATION_ID",
										"AttributeID": "VENDOR_REGISTRATION_ID"
									},
									{
										"ColumnName": "IBAN",
										"AttributeID": "VENDOR_IBAN"
									}
								],
								"HttpDataSourceId": null,
								"IsResultTransformationEnabled": false
							},
							"IsTransitive": false,
							"PositionCounterpart": null,
							"AutoComplete": true,
							"AllowNegativeAmount": false
						},
						{
							"AttributeID": "VENDOR_STR",
							"Description": null,
							"LocalizedDescriptions": {},
							"AttributeLabel": null,
							"AttributeIcon": null,
							"AttributeType": 0,
							"Required": false,
							"ReadOnly": true,
							"DoAlignStart": true,
							"DefaultValue": null,
							"Values": [],
							"ColumnSizePercent": 0,
							"MinLength": 0,
							"MaxLength": 0,
							"SizeDesktop": 4,
							"SizeTablet": 3,
							"SizePhone": 4,
							"Minified": null,
							"Position": {
								"verticalPosition": 1,
								"horizontalPosition": 0
							},
							"TabStop": 8,
							"ValueConversion": null,
							"Title": null,
							"Pattern": null,
							"QueryAttributes": [{
								"AttributeID": "VENDOR_STR",
								"AttributeValue": null,
								"AttributeQueryPrefix": "%",
								"AttributeQuerySuffix": "%",
								"Prefix": false,
								"MultipleParameter": false
							}, {
								"AttributeID": "DEBITOR_NUM",
								"AttributeValue": null,
								"AttributeQueryPrefix": "",
								"AttributeQuerySuffix": "",
								"Prefix": false,
								"MultipleParameter": false
							}],
							"JSSnippets": [],
							"DataBaseDefinition": {
								"QueryDefinition": "SELECT\n  ven.*,\n  venb.*\nFROM\n  dbo.CC_VENDORS AS ven\n  LEFT JOIN dbo.CC_VENDOR_BANK AS venb ON ven.VENDOR_NUM = venb.VENDOR_NUM\n  AND ven.COMPANY_NUM = venb.COMPANY_NUM\nWHERE\n  ven.COMPANY_NUM = @DEBITOR_NUM\n  AND ven.VENDOR_STR LIKE @VENDOR_STR",
								"QueryMappings": [
									{
										"ColumnName": "VENDOR_NUM",
										"AttributeID": "VENDOR_NUM"
									},
									{
										"ColumnName": "VENDOR_NAME",
										"AttributeID": "VENDOR_NAME"
									},
									{
										"ColumnName": "VENDOR_STR",
										"AttributeID": "VENDOR_STR"
									},
									{
										"ColumnName": "VENDOR_CITY",
										"AttributeID": "VENDOR_CITY"
									},
									{
										"ColumnName": "VENDOR_ZIP_CODE",
										"AttributeID": "VENDOR_ZIP_CODE"
									},
									{
										"ColumnName": "VENDOR_VAT_REGISTRATION_ID",
										"AttributeID": "VENDOR_VAT_REGISTRATION_ID"
									},
									{
										"ColumnName": "VENDOR_REGISTRATION_ID",
										"AttributeID": "VENDOR_REGISTRATION_ID"
									},
									{
										"ColumnName": "IBAN",
										"AttributeID": "VENDOR_IBAN"
									}
								],
								"HttpDataSourceId": null,
								"IsResultTransformationEnabled": false
							},
							"IsTransitive": false,
							"PositionCounterpart": null,
							"AutoComplete": true,
							"AllowNegativeAmount": false
						},
						{
							"AttributeID": "VENDOR_ZIP_CODE",
							"Description": null,
							"LocalizedDescriptions": {},
							"AttributeLabel": null,
							"AttributeIcon": null,
							"AttributeType": 0,
							"Required": false,
							"ReadOnly": true,
							"DoAlignStart": true,
							"DefaultValue": null,
							"Values": [],
							"ColumnSizePercent": 0,
							"MinLength": 0,
							"MaxLength": 0,
							"SizeDesktop": 4,
							"SizeTablet": 2,
							"SizePhone": 4,
							"Minified": null,
							"Position": {
								"verticalPosition": 1,
								"horizontalPosition": 1
							},
							"TabStop": 9,
							"ValueConversion": null,
							"Title": null,
							"Pattern": null,
							"QueryAttributes": [{
								"AttributeID": "VENDOR_ZIP_CODE",
								"AttributeValue": null,
								"AttributeQueryPrefix": "%",
								"AttributeQuerySuffix": "%",
								"Prefix": false,
								"MultipleParameter": false
							}, {
								"AttributeID": "DEBITOR_NUM",
								"AttributeValue": null,
								"AttributeQueryPrefix": "",
								"AttributeQuerySuffix": "",
								"Prefix": false,
								"MultipleParameter": false
							}],
							"JSSnippets": [],
							"DataBaseDefinition": {
								"QueryDefinition": "SELECT\n  ven.*,\n  venb.*\nFROM\n  dbo.CC_VENDORS AS ven\n  LEFT JOIN dbo.CC_VENDOR_BANK AS venb ON ven.VENDOR_NUM = venb.VENDOR_NUM\n  AND ven.COMPANY_NUM = venb.COMPANY_NUM\nWHERE\n  ven.COMPANY_NUM = @DEBITOR_NUM\n  AND ven.VENDOR_ZIP_CODE LIKE @VENDOR_ZIP_CODE",
								"QueryMappings": [
									{
										"ColumnName": "VENDOR_NUM",
										"AttributeID": "VENDOR_NUM"
									},
									{
										"ColumnName": "VENDOR_NAME",
										"AttributeID": "VENDOR_NAME"
									},
									{
										"ColumnName": "VENDOR_STR",
										"AttributeID": "VENDOR_STR"
									},
									{
										"ColumnName": "VENDOR_CITY",
										"AttributeID": "VENDOR_CITY"
									},
									{
										"ColumnName": "VENDOR_ZIP_CODE",
										"AttributeID": "VENDOR_ZIP_CODE"
									},
									{
										"ColumnName": "VENDOR_VAT_REGISTRATION_ID",
										"AttributeID": "VENDOR_VAT_REGISTRATION_ID"
									},
									{
										"ColumnName": "VENDOR_REGISTRATION_ID",
										"AttributeID": "VENDOR_REGISTRATION_ID"
									},
									{
										"ColumnName": "IBAN",
										"AttributeID": "VENDOR_IBAN"
									}
								],
								"HttpDataSourceId": null,
								"IsResultTransformationEnabled": false
							},
							"IsTransitive": false,
							"PositionCounterpart": null,
							"AutoComplete": true,
							"AllowNegativeAmount": false
						},
						{
							"AttributeID": "VENDOR_CITY",
							"Description": null,
							"LocalizedDescriptions": {},
							"AttributeLabel": null,
							"AttributeIcon": null,
							"AttributeType": 0,
							"Required": false,
							"ReadOnly": true,
							"DoAlignStart": true,
							"DefaultValue": null,
							"Values": [],
							"ColumnSizePercent": 0,
							"MinLength": 0,
							"MaxLength": 0,
							"SizeDesktop": 4,
							"SizeTablet": 3,
							"SizePhone": 4,
							"Minified": null,
							"Position": {
								"verticalPosition": 1,
								"horizontalPosition": 2
							},
							"TabStop": 10,
							"ValueConversion": null,
							"Title": null,
							"Pattern": null,
							"QueryAttributes": [{
								"AttributeID": "VENDOR_CITY",
								"AttributeValue": null,
								"AttributeQueryPrefix": "%",
								"AttributeQuerySuffix": "%",
								"Prefix": false,
								"MultipleParameter": false
							}, {
								"AttributeID": "DEBITOR_NUM",
								"AttributeValue": null,
								"AttributeQueryPrefix": "",
								"AttributeQuerySuffix": "",
								"Prefix": false,
								"MultipleParameter": false
							}],
							"JSSnippets": [],
							"DataBaseDefinition": {
								"QueryDefinition": "SELECT\n  ven.*,\n  venb.*\nFROM\n  dbo.CC_VENDORS AS ven\n  LEFT JOIN dbo.CC_VENDOR_BANK AS venb ON ven.VENDOR_NUM = venb.VENDOR_NUM\n  AND ven.COMPANY_NUM = venb.COMPANY_NUM\nWHERE\n  ven.COMPANY_NUM = @DEBITOR_NUM\n  AND ven.VENDOR_CITY LIKE @VENDOR_CITY",
								"QueryMappings": [
									{
										"ColumnName": "VENDOR_NUM",
										"AttributeID": "VENDOR_NUM"
									},
									{
										"ColumnName": "VENDOR_NAME",
										"AttributeID": "VENDOR_NAME"
									},
									{
										"ColumnName": "VENDOR_STR",
										"AttributeID": "VENDOR_STR"
									},
									{
										"ColumnName": "VENDOR_CITY",
										"AttributeID": "VENDOR_CITY"
									},
									{
										"ColumnName": "VENDOR_ZIP_CODE",
										"AttributeID": "VENDOR_ZIP_CODE"
									},
									{
										"ColumnName": "VENDOR_VAT_REGISTRATION_ID",
										"AttributeID": "VENDOR_VAT_REGISTRATION_ID"
									},
									{
										"ColumnName": "VENDOR_REGISTRATION_ID",
										"AttributeID": "VENDOR_REGISTRATION_ID"
									},
									{
										"ColumnName": "IBAN",
										"AttributeID": "VENDOR_IBAN"
									}
								],
								"HttpDataSourceId": null,
								"IsResultTransformationEnabled": false
							},
							"IsTransitive": false,
							"PositionCounterpart": null,
							"AutoComplete": true,
							"AllowNegativeAmount": false
						},
						{
							"AttributeID": "VENDOR_VAT_REGISTRATION_ID",
							"Description": null,
							"LocalizedDescriptions": {},
							"AttributeLabel": null,
							"AttributeIcon": null,
							"AttributeType": 0,
							"Required": false,
							"ReadOnly": true,
							"DoAlignStart": true,
							"DefaultValue": null,
							"Values": [],
							"ColumnSizePercent": 0,
							"MinLength": 0,
							"MaxLength": 0,
							"SizeDesktop": 3,
							"SizeTablet": 2,
							"SizePhone": 4,
							"Minified": null,
							"Position": {
								"verticalPosition": 2,
								"horizontalPosition": 0
							},
							"TabStop": 11,
							"ValueConversion": null,
							"Title": null,
							"Pattern": null,
							"QueryAttributes": [{
								"AttributeID": "VENDOR_VAT_REGISTRATION_ID",
								"AttributeValue": null,
								"AttributeQueryPrefix": "%",
								"AttributeQuerySuffix": "%",
								"Prefix": false,
								"MultipleParameter": false
							}, {
								"AttributeID": "DEBITOR_NUM",
								"AttributeValue": null,
								"AttributeQueryPrefix": "",
								"AttributeQuerySuffix": "",
								"Prefix": false,
								"MultipleParameter": false
							}],
							"JSSnippets": [],
							"DataBaseDefinition": {
								"QueryDefinition": "SELECT\n  ven.*,\n  venb.*\nFROM\n  dbo.CC_VENDORS AS ven\n  LEFT JOIN dbo.CC_VENDOR_BANK AS venb ON ven.VENDOR_NUM = venb.VENDOR_NUM\n  AND ven.COMPANY_NUM = venb.COMPANY_NUM\nWHERE\n  ven.COMPANY_NUM = @DEBITOR_NUM\n  AND ven.VENDOR_VAT_REGISTRATION_ID LIKE @VENDOR_VAT_REGISTRATION_ID",
								"QueryMappings": [
									{
										"ColumnName": "VENDOR_NUM",
										"AttributeID": "VENDOR_NUM"
									},
									{
										"ColumnName": "VENDOR_NAME",
										"AttributeID": "VENDOR_NAME"
									},
									{
										"ColumnName": "VENDOR_STR",
										"AttributeID": "VENDOR_STR"
									},
									{
										"ColumnName": "VENDOR_CITY",
										"AttributeID": "VENDOR_CITY"
									},
									{
										"ColumnName": "VENDOR_ZIP_CODE",
										"AttributeID": "VENDOR_ZIP_CODE"
									},
									{
										"ColumnName": "VENDOR_VAT_REGISTRATION_ID",
										"AttributeID": "VENDOR_VAT_REGISTRATION_ID"
									},
									{
										"ColumnName": "VENDOR_REGISTRATION_ID",
										"AttributeID": "VENDOR_REGISTRATION_ID"
									},
									{
										"ColumnName": "IBAN",
										"AttributeID": "VENDOR_IBAN"
									}
								],
								"HttpDataSourceId": null,
								"IsResultTransformationEnabled": false
							},
							"IsTransitive": false,
							"PositionCounterpart": null,
							"AutoComplete": true,
							"AllowNegativeAmount": false
						},
						{
							"AttributeID": "VENDOR_REGISTRATION_ID",
							"Description": null,
							"LocalizedDescriptions": {},
							"AttributeLabel": null,
							"AttributeIcon": null,
							"AttributeType": 0,
							"Required": false,
							"ReadOnly": true,
							"DoAlignStart": true,
							"DefaultValue": null,
							"Values": [],
							"ColumnSizePercent": 0,
							"MinLength": 0,
							"MaxLength": 0,
							"SizeDesktop": 3,
							"SizeTablet": 2,
							"SizePhone": 4,
							"Minified": null,
							"Position": {
								"verticalPosition": 2,
								"horizontalPosition": 1
							},
							"TabStop": 12,
							"ValueConversion": null,
							"Title": null,
							"Pattern": null,
							"QueryAttributes": [{
								"AttributeID": "VENDOR_REGISTRATION_ID",
								"AttributeValue": null,
								"AttributeQueryPrefix": "%",
								"AttributeQuerySuffix": "%",
								"Prefix": false,
								"MultipleParameter": false
							}, {
								"AttributeID": "DEBITOR_NUM",
								"AttributeValue": null,
								"AttributeQueryPrefix": "",
								"AttributeQuerySuffix": "",
								"Prefix": false,
								"MultipleParameter": false
							}],
							"JSSnippets": [],
							"DataBaseDefinition": {
								"QueryDefinition": "SELECT\n  ven.*,\n  venb.*\nFROM\n  dbo.CC_VENDORS AS ven\n  LEFT JOIN dbo.CC_VENDOR_BANK AS venb ON ven.VENDOR_NUM = venb.VENDOR_NUM\n  AND ven.COMPANY_NUM = venb.COMPANY_NUM\nWHERE\n  ven.COMPANY_NUM = @DEBITOR_NUM\n  AND ven.VENDOR_REGISTRATION_ID LIKE @VENDOR_REGISTRATION_ID",
								"QueryMappings": [
									{
										"ColumnName": "VENDOR_NUM",
										"AttributeID": "VENDOR_NUM"
									},
									{
										"ColumnName": "VENDOR_NAME",
										"AttributeID": "VENDOR_NAME"
									},
									{
										"ColumnName": "VENDOR_STR",
										"AttributeID": "VENDOR_STR"
									},
									{
										"ColumnName": "VENDOR_CITY",
										"AttributeID": "VENDOR_CITY"
									},
									{
										"ColumnName": "VENDOR_ZIP_CODE",
										"AttributeID": "VENDOR_ZIP_CODE"
									},
									{
										"ColumnName": "VENDOR_VAT_REGISTRATION_ID",
										"AttributeID": "VENDOR_VAT_REGISTRATION_ID"
									},
									{
										"ColumnName": "VENDOR_REGISTRATION_ID",
										"AttributeID": "VENDOR_REGISTRATION_ID"
									},
									{
										"ColumnName": "IBAN",
										"AttributeID": "VENDOR_IBAN"
									}
								],
								"HttpDataSourceId": null,
								"IsResultTransformationEnabled": false
							},
							"IsTransitive": false,
							"PositionCounterpart": null,
							"AutoComplete": true,
							"AllowNegativeAmount": false
						},
						{
							"AttributeID": "VENDOR_IBAN",
							"Description": null,
							"LocalizedDescriptions": {},
							"AttributeLabel": null,
							"AttributeIcon": null,
							"AttributeType": 0,
							"Required": false,
							"ReadOnly": true,
							"DoAlignStart": true,
							"DefaultValue": null,
							"Values": [],
							"ColumnSizePercent": 0,
							"MinLength": 0,
							"MaxLength": 0,
							"SizeDesktop": 6,
							"SizeTablet": 4,
							"SizePhone": 4,
							"Minified": null,
							"Position": {
								"verticalPosition": 2,
								"horizontalPosition": 2
							},
							"TabStop": 13,
							"ValueConversion": null,
							"Title": null,
							"Pattern": null,
							"QueryAttributes": [{
								"AttributeID": "VENDOR_IBAN",
								"AttributeValue": null,
								"AttributeQueryPrefix": "%",
								"AttributeQuerySuffix": "%",
								"Prefix": false,
								"MultipleParameter": false
							}, {
								"AttributeID": "DEBITOR_NUM",
								"AttributeValue": null,
								"AttributeQueryPrefix": "",
								"AttributeQuerySuffix": "",
								"Prefix": false,
								"MultipleParameter": false
							}],
							"JSSnippets": [],
							"DataBaseDefinition": {
								"QueryDefinition": "SELECT\n  ven.*,\n  venb.*\nFROM\n  dbo.CC_VENDORS AS ven\n  LEFT JOIN dbo.CC_VENDOR_BANK AS venb ON ven.VENDOR_NUM = venb.VENDOR_NUM\n  AND ven.COMPANY_NUM = venb.COMPANY_NUM\nWHERE\n  ven.COMPANY_NUM = @DEBITOR_NUM\n  AND venb.IBAN LIKE @VENDOR_IBAN",
								"QueryMappings": [
									{
										"ColumnName": "VENDOR_NUM",
										"AttributeID": "VENDOR_NUM"
									},
									{
										"ColumnName": "VENDOR_NAME",
										"AttributeID": "VENDOR_NAME"
									},
									{
										"ColumnName": "VENDOR_STR",
										"AttributeID": "VENDOR_STR"
									},
									{
										"ColumnName": "VENDOR_CITY",
										"AttributeID": "VENDOR_CITY"
									},
									{
										"ColumnName": "VENDOR_ZIP_CODE",
										"AttributeID": "VENDOR_ZIP_CODE"
									},
									{
										"ColumnName": "VENDOR_VAT_REGISTRATION_ID",
										"AttributeID": "VENDOR_VAT_REGISTRATION_ID"
									},
									{
										"ColumnName": "VENDOR_REGISTRATION_ID",
										"AttributeID": "VENDOR_REGISTRATION_ID"
									},
									{
										"ColumnName": "IBAN",
										"AttributeID": "VENDOR_IBAN"
									}
								],
								"HttpDataSourceId": null,
								"IsResultTransformationEnabled": false
							},
							"IsTransitive": false,
							"PositionCounterpart": null,
							"AutoComplete": true,
							"AllowNegativeAmount": false
						}
					],
					"AttributeStructureDefinitions": []
				},
				{
					"GroupID": 2,
					"GroupDescription": "InvoiceData",
					"MinifiedView": false,
					"AttributeDefinitions": [
						{
							"AttributeID": "DocumentType",
							"Description": null,
							"LocalizedDescriptions": {},
							"AttributeLabel": null,
							"AttributeIcon": null,
							"AttributeType": 0,
							"Required": false,
							"ReadOnly": false,
							"DoAlignStart": true,
							"DefaultValue": "Invoice",
							"Values": ["Invoice", "CreditAdvice"],
							"ColumnSizePercent": 0,
							"MinLength": 0,
							"MaxLength": 0,
							"SizeDesktop": 3,
							"SizeTablet": 1,
							"SizePhone": 4,
							"Minified": null,
							"Position": {
								"verticalPosition": 0,
								"horizontalPosition": 0
							},
							"TabStop": 14,
							"ValueConversion": null,
							"Title": null,
							"Pattern": null,
							"QueryAttributes": null,
							"JSSnippets": [],
							"DataBaseDefinition": {
								"QueryDefinition": null,
								"QueryMappings": null,
								"HttpDataSourceId": null,
								"IsResultTransformationEnabled": false
							},
							"IsTransitive": false,
							"PositionCounterpart": null,
							"AutoComplete": true,
							"AllowNegativeAmount": false
						},
						{
							"AttributeID": "InvoiceDate",
							"Description": null,
							"LocalizedDescriptions": {},
							"AttributeLabel": null,
							"AttributeIcon": null,
							"AttributeType": 0,
							"Required": true,
							"ReadOnly": false,
							"DoAlignStart": true,
							"DefaultValue": null,
							"Values": [],
							"ColumnSizePercent": 0,
							"MinLength": 0,
							"MaxLength": 0,
							"SizeDesktop": 3,
							"SizeTablet": 2,
							"SizePhone": 4,
							"Minified": null,
							"Position": {
								"verticalPosition": 0,
								"horizontalPosition": 1
							},
							"TabStop": 15,
							"ValueConversion": "ConvertInputDate",
							"Title": "dd.mm.YYYY",
							"Pattern": "^(0?[1-9]|[12][0-9]|3[01])[.](0?[1-9]|1[012])[.](\\d{4})$",
							"QueryAttributes": null,
							"JSSnippets": [{
								"OnMethod": "input",
								"Code": "clearTimeout(typingInvoiceDateTimer); var element = $(this); if (element.val()) { typingInvoiceDateTimer = setTimeout(function () { element.val(ConvertInputDate(element.val())); TriggerFieldValidation(element.attr('id')); }, doneTypingInterval); }\n"
							}],
							"DataBaseDefinition": {
								"QueryDefinition": "",
								"QueryMappings": null,
								"HttpDataSourceId": null,
								"IsResultTransformationEnabled": false
							},
							"IsTransitive": false,
							"PositionCounterpart": null,
							"AutoComplete": true,
							"AllowNegativeAmount": false
						},
						{
							"AttributeID": "InvoiceNumber",
							"Description": null,
							"LocalizedDescriptions": {},
							"AttributeLabel": null,
							"AttributeIcon": null,
							"AttributeType": 0,
							"Required": true,
							"ReadOnly": false,
							"DoAlignStart": true,
							"DefaultValue": null,
							"Values": [],
							"ColumnSizePercent": 0,
							"MinLength": 0,
							"MaxLength": 0,
							"SizeDesktop": 6,
							"SizeTablet": 1,
							"SizePhone": 4,
							"Minified": null,
							"Position": {
								"verticalPosition": 0,
								"horizontalPosition": 2
							},
							"TabStop": 16,
							"ValueConversion": null,
							"Title": null,
							"Pattern": null,
							"QueryAttributes": null,
							"JSSnippets": [],
							"DataBaseDefinition": {
								"QueryDefinition": null,
								"QueryMappings": null,
								"HttpDataSourceId": null,
								"IsResultTransformationEnabled": false
							},
							"IsTransitive": false,
							"PositionCounterpart": null,
							"AutoComplete": true,
							"AllowNegativeAmount": false
						},
						{
							"AttributeID": "Rechnungstyp",
							"Description": null,
							"LocalizedDescriptions": {},
							"AttributeLabel": null,
							"AttributeIcon": null,
							"AttributeType": 0,
							"Required": false,
							"ReadOnly": false,
							"DoAlignStart": true,
							"DefaultValue": "Warenrechnung",
							"Values": ["Warenrechnung", "Kostenrechnung"],
							"ColumnSizePercent": 0,
							"MinLength": 0,
							"MaxLength": 0,
							"SizeDesktop": 6,
							"SizeTablet": 2,
							"SizePhone": 4,
							"Minified": null,
							"Position": {
								"verticalPosition": 1,
								"horizontalPosition": 0
							},
							"TabStop": 17,
							"ValueConversion": null,
							"Title": null,
							"Pattern": null,
							"QueryAttributes": [],
							"JSSnippets": [],
							"DataBaseDefinition": {
								"QueryDefinition": null,
								"QueryMappings": null,
								"HttpDataSourceId": null,
								"IsResultTransformationEnabled": false
							},
							"IsTransitive": false,
							"PositionCounterpart": null,
							"AutoComplete": true,
							"AllowNegativeAmount": true
						},
						{
							"AttributeID": "OrderNum",
							"Description": "Bestellnummer(n)",
							"LocalizedDescriptions": {},
							"AttributeLabel": "Bestellnummer(n)",
							"AttributeIcon": null,
							"AttributeType": 0,
							"Required": false,
							"ReadOnly": false,
							"DoAlignStart": true,
							"DefaultValue": null,
							"Values": [],
							"ColumnSizePercent": 0,
							"MinLength": 0,
							"MaxLength": 0,
							"SizeDesktop": 6,
							"SizeTablet": 3,
							"SizePhone": 4,
							"Minified": null,
							"Position": {
								"verticalPosition": 1,
								"horizontalPosition": 1
							},
							"TabStop": 18,
							"ValueConversion": null,
							"Title": null,
							"Pattern": "^([^;]{1,20})(;[^;]{1,20})*$",
							"QueryAttributes": [
								{
									"AttributeID": "OrderNum",
									"AttributeValue": null,
									"AttributeQueryPrefix": "%",
									"AttributeQuerySuffix": "%",
									"Prefix": false,
									"MultipleParameter": true
								},
								{
									"AttributeID": "DEBITOR_NUM",
									"AttributeValue": null,
									"AttributeQueryPrefix": "",
									"AttributeQuerySuffix": "",
									"Prefix": false,
									"MultipleParameter": false
								},
								{
									"AttributeID": "VENDOR_NUM",
									"AttributeValue": null,
									"AttributeQueryPrefix": "",
									"AttributeQuerySuffix": "",
									"Prefix": false,
									"MultipleParameter": false
								}
							],
							"JSSnippets": [],
							"DataBaseDefinition": {
								"QueryDefinition": "SELECT\n  COMPANY_NUM,\n  VENDOR_NUM,\n  ORDER_NUM\nFROM\n  dbo.CC_ORDERS\nWHERE\n  COMPANY_NUM = @DEBITOR_NUM\n  AND VENDOR_NUM = @VENDOR_NUM\n  AND (ORDER_NUM LIKE @OrderNum)",
								"QueryMappings": [
									{
										"ColumnName": "VENDOR_NUM",
										"AttributeID": "VENDOR_NUM"
									},
									{
										"ColumnName": "COMPANY_NUM",
										"AttributeID": "DEBITOR_NUM"
									},
									{
										"ColumnName": "ORDER_NUM",
										"AttributeID": "OrderNum"
									}
								],
								"HttpDataSourceId": null,
								"IsResultTransformationEnabled": false
							},
							"IsTransitive": false,
							"PositionCounterpart": null,
							"AutoComplete": true,
							"AllowNegativeAmount": false
						},
						{
							"AttributeID": "NetAmount1",
							"Description": null,
							"LocalizedDescriptions": {},
							"AttributeLabel": null,
							"AttributeIcon": null,
							"AttributeType": 0,
							"Required": true,
							"ReadOnly": false,
							"DoAlignStart": false,
							"DefaultValue": "0.00",
							"Values": [],
							"ColumnSizePercent": 0,
							"MinLength": 0,
							"MaxLength": 0,
							"SizeDesktop": 6,
							"SizeTablet": 4,
							"SizePhone": 4,
							"Minified": null,
							"Position": {
								"verticalPosition": 2,
								"horizontalPosition": 0
							},
							"TabStop": 19,
							"ValueConversion": "ConvertInputFloatWithCustomDelimiter",
							"Title": null,
							"Pattern": null,
							"QueryAttributes": null,
							"JSSnippets": [{
								"OnMethod": "input",
								"Code": " ConvertInputFloatWithCustomDelimiterOnInput(this);\n var netAmount1 = Number(GetAttribute(\"NetAmount1\"));\n var vatRate1 = Number(GetAttribute(\"VatRate1\"))/100;\n var vatAmount1 = netAmount1 * vatRate1;\n SetAttribute(\"VatAmount1\", vatAmount1.toFixed(2));\n\n var netAmount2 = Number(GetAttribute(\"NetAmount2\"));\n var vatRate2 = Number(GetAttribute(\"VatRate2\"))/100;\n var grossAmount = netAmount1 * (1 + vatRate1) + netAmount2 * (1 + vatRate2);\n SetAttribute(\"GrossAmount\", grossAmount.toFixed(2));"
							}],
							"DataBaseDefinition": {
								"QueryDefinition": null,
								"QueryMappings": null,
								"HttpDataSourceId": null,
								"IsResultTransformationEnabled": false
							},
							"IsTransitive": false,
							"PositionCounterpart": null,
							"AutoComplete": true,
							"AllowNegativeAmount": false
						},
						{
							"AttributeID": "NetAmount2",
							"Description": null,
							"LocalizedDescriptions": {},
							"AttributeLabel": null,
							"AttributeIcon": null,
							"AttributeType": 0,
							"Required": false,
							"ReadOnly": false,
							"DoAlignStart": false,
							"DefaultValue": "0.00",
							"Values": [],
							"ColumnSizePercent": 0,
							"MinLength": 0,
							"MaxLength": 0,
							"SizeDesktop": 6,
							"SizeTablet": 4,
							"SizePhone": 4,
							"Minified": null,
							"Position": {
								"verticalPosition": 2,
								"horizontalPosition": 1
							},
							"TabStop": 20,
							"ValueConversion": "ConvertInputFloatWithCustomDelimiter",
							"Title": null,
							"Pattern": null,
							"QueryAttributes": null,
							"JSSnippets": [{
								"OnMethod": "input",
								"Code": " ConvertInputFloatWithCustomDelimiterOnInput(this);\n var netAmount1 = Number(GetAttribute(\"NetAmount1\"));\n var vatRate1 = Number(GetAttribute(\"VatRate1\"))/100;\n\n var netAmount2 = Number(GetAttribute(\"NetAmount2\"));\n var vatRate2 = Number(GetAttribute(\"VatRate2\"))/100;\n var vatAmount2 = netAmount2 * vatRate2;\n SetAttribute(\"VatAmount2\", vatAmount2.toFixed(2));\n var grossAmount = netAmount1 * (1 + vatRate1) + netAmount2 * (1 + vatRate2);\n SetAttribute(\"GrossAmount\", grossAmount.toFixed(2));"
							}],
							"DataBaseDefinition": {
								"QueryDefinition": null,
								"QueryMappings": null,
								"HttpDataSourceId": null,
								"IsResultTransformationEnabled": false
							},
							"IsTransitive": false,
							"PositionCounterpart": null,
							"AutoComplete": true,
							"AllowNegativeAmount": false
						},
						{
							"AttributeID": "VatRate1",
							"Description": null,
							"LocalizedDescriptions": {},
							"AttributeLabel": null,
							"AttributeIcon": null,
							"AttributeType": 0,
							"Required": false,
							"ReadOnly": false,
							"DoAlignStart": false,
							"DefaultValue": "0.00",
							"Values": [],
							"ColumnSizePercent": 0,
							"MinLength": 0,
							"MaxLength": 0,
							"SizeDesktop": 6,
							"SizeTablet": 4,
							"SizePhone": 4,
							"Minified": null,
							"Position": {
								"verticalPosition": 3,
								"horizontalPosition": 0
							},
							"TabStop": 21,
							"ValueConversion": "ConvertInputFloatWithCustomDelimiter",
							"Title": null,
							"Pattern": null,
							"QueryAttributes": null,
							"JSSnippets": [{
								"OnMethod": "input",
								"Code": "ConvertInputFloatWithCustomDelimiterOnInput(this);\nvar netAmount1 = Number(GetAttribute(\"NetAmount1\"));\nvar vatRate1 = Number(GetAttribute(\"VatRate1\")) / 100;\nvar vatAmount1 = netAmount1 * vatRate1;\nSetAttribute(\"VatAmount1\", vatAmount1.toFixed(2));\n\nvar netAmount2 = Number(GetAttribute(\"NetAmount2\"));\nvar vatRate2 = Number(GetAttribute(\"VatRate2\")) / 100;\nvar grossAmount = netAmount1 * (1 + vatRate1) + netAmount2 * (1 + vatRate2);\nSetAttribute(\"GrossAmount\", grossAmount.toFixed(2));"
							}],
							"DataBaseDefinition": {
								"QueryDefinition": "",
								"QueryMappings": null,
								"HttpDataSourceId": null,
								"IsResultTransformationEnabled": false
							},
							"IsTransitive": false,
							"PositionCounterpart": null,
							"AutoComplete": true,
							"AllowNegativeAmount": false
						},
						{
							"AttributeID": "VatRate2",
							"Description": null,
							"LocalizedDescriptions": {},
							"AttributeLabel": null,
							"AttributeIcon": null,
							"AttributeType": 0,
							"Required": false,
							"ReadOnly": false,
							"DoAlignStart": false,
							"DefaultValue": "0.00",
							"Values": [],
							"ColumnSizePercent": 0,
							"MinLength": 0,
							"MaxLength": 0,
							"SizeDesktop": 6,
							"SizeTablet": 4,
							"SizePhone": 4,
							"Minified": null,
							"Position": {
								"verticalPosition": 3,
								"horizontalPosition": 1
							},
							"TabStop": 22,
							"ValueConversion": "ConvertInputFloatWithCustomDelimiter",
							"Title": null,
							"Pattern": null,
							"QueryAttributes": null,
							"JSSnippets": [{
								"OnMethod": "input",
								"Code": " ConvertInputFloatWithCustomDelimiterOnInput(this);\n var netAmount1 = Number(GetAttribute(\"NetAmount1\"));\n var vatRate1 = Number(GetAttribute(\"VatRate1\"))/100;\n\n var netAmount2 = Number(GetAttribute(\"NetAmount2\"));\n var vatRate2 = Number(GetAttribute(\"VatRate2\"))/100;\n var vatAmount2 = netAmount2 * vatRate2;\n SetAttribute(\"VatAmount2\", vatAmount2.toFixed(2));\n var grossAmount = netAmount1 * (1 + vatRate1) + netAmount2 * (1 + vatRate2);\n SetAttribute(\"GrossAmount\", grossAmount.toFixed(2));"
							}],
							"DataBaseDefinition": {
								"QueryDefinition": null,
								"QueryMappings": null,
								"HttpDataSourceId": null,
								"IsResultTransformationEnabled": false
							},
							"IsTransitive": false,
							"PositionCounterpart": null,
							"AutoComplete": true,
							"AllowNegativeAmount": false
						},
						{
							"AttributeID": "VatAmount1",
							"Description": null,
							"LocalizedDescriptions": {},
							"AttributeLabel": null,
							"AttributeIcon": null,
							"AttributeType": 0,
							"Required": true,
							"ReadOnly": false,
							"DoAlignStart": false,
							"DefaultValue": "0.00",
							"Values": [],
							"ColumnSizePercent": 0,
							"MinLength": 0,
							"MaxLength": 0,
							"SizeDesktop": 6,
							"SizeTablet": 4,
							"SizePhone": 4,
							"Minified": null,
							"Position": {
								"verticalPosition": 4,
								"horizontalPosition": 0
							},
							"TabStop": 23,
							"ValueConversion": "ConvertInputFloatWithCustomDelimiter",
							"Title": null,
							"Pattern": null,
							"QueryAttributes": null,
							"JSSnippets": [{
								"OnMethod": "input",
								"Code": " ConvertInputFloatWithCustomDelimiterOnInput(this);\n "
							}],
							"DataBaseDefinition": {
								"QueryDefinition": null,
								"QueryMappings": null,
								"HttpDataSourceId": null,
								"IsResultTransformationEnabled": false
							},
							"IsTransitive": false,
							"PositionCounterpart": null,
							"AutoComplete": true,
							"AllowNegativeAmount": false
						},
						{
							"AttributeID": "VatAmount2",
							"Description": null,
							"LocalizedDescriptions": {},
							"AttributeLabel": null,
							"AttributeIcon": null,
							"AttributeType": 0,
							"Required": false,
							"ReadOnly": false,
							"DoAlignStart": false,
							"DefaultValue": "0.00",
							"Values": [],
							"ColumnSizePercent": 0,
							"MinLength": 0,
							"MaxLength": 0,
							"SizeDesktop": 6,
							"SizeTablet": 4,
							"SizePhone": 4,
							"Minified": null,
							"Position": {
								"verticalPosition": 4,
								"horizontalPosition": 1
							},
							"TabStop": 24,
							"ValueConversion": "ConvertInputFloatWithCustomDelimiter",
							"Title": null,
							"Pattern": null,
							"QueryAttributes": null,
							"JSSnippets": [{
								"OnMethod": "input",
								"Code": " ConvertInputFloatWithCustomDelimiterOnInput(this);\n "
							}],
							"DataBaseDefinition": {
								"QueryDefinition": null,
								"QueryMappings": null,
								"HttpDataSourceId": null,
								"IsResultTransformationEnabled": false
							},
							"IsTransitive": false,
							"PositionCounterpart": null,
							"AutoComplete": true,
							"AllowNegativeAmount": false
						},
						{
							"AttributeID": "AdditionalCosts",
							"Description": null,
							"LocalizedDescriptions": {},
							"AttributeLabel": null,
							"AttributeIcon": null,
							"AttributeType": 0,
							"Required": false,
							"ReadOnly": false,
							"DoAlignStart": false,
							"DefaultValue": "0.00",
							"Values": [],
							"ColumnSizePercent": 0,
							"MinLength": 0,
							"MaxLength": 0,
							"SizeDesktop": 12,
							"SizeTablet": 8,
							"SizePhone": 4,
							"Minified": null,
							"Position": {
								"verticalPosition": 5,
								"horizontalPosition": 0
							},
							"TabStop": 25,
							"ValueConversion": "ConvertInputFloatWithCustomDelimiter",
							"Title": null,
							"Pattern": null,
							"QueryAttributes": null,
							"JSSnippets": [{
								"OnMethod": "input",
								"Code": " ConvertInputFloatWithCustomDelimiterOnInput(this);\n "
							}],
							"DataBaseDefinition": {
								"QueryDefinition": null,
								"QueryMappings": null,
								"HttpDataSourceId": null,
								"IsResultTransformationEnabled": false
							},
							"IsTransitive": false,
							"PositionCounterpart": null,
							"AutoComplete": true,
							"AllowNegativeAmount": true
						},
						{
							"AttributeID": "GrossAmount",
							"Description": null,
							"LocalizedDescriptions": {},
							"AttributeLabel": null,
							"AttributeIcon": null,
							"AttributeType": 0,
							"Required": true,
							"ReadOnly": false,
							"DoAlignStart": false,
							"DefaultValue": "0.00",
							"Values": [],
							"ColumnSizePercent": 0,
							"MinLength": 0,
							"MaxLength": 0,
							"SizeDesktop": 9,
							"SizeTablet": 4,
							"SizePhone": 4,
							"Minified": null,
							"Position": {
								"verticalPosition": 6,
								"horizontalPosition": 0
							},
							"TabStop": 26,
							"ValueConversion": "ConvertInputFloatWithCustomDelimiter",
							"Title": null,
							"Pattern": null,
							"QueryAttributes": null,
							"JSSnippets": [{
								"OnMethod": "input",
								"Code": " ConvertInputFloatWithCustomDelimiterOnInput(this);\n "
							}],
							"DataBaseDefinition": {
								"QueryDefinition": null,
								"QueryMappings": null,
								"HttpDataSourceId": null,
								"IsResultTransformationEnabled": false
							},
							"IsTransitive": false,
							"PositionCounterpart": null,
							"AutoComplete": true,
							"AllowNegativeAmount": false
						},
						{
							"AttributeID": "GrossAmountCurrency",
							"Description": null,
							"LocalizedDescriptions": {},
							"AttributeLabel": null,
							"AttributeIcon": null,
							"AttributeType": 0,
							"Required": false,
							"ReadOnly": false,
							"DoAlignStart": true,
							"DefaultValue": null,
							"Values": [
								"",
								"AUD",
								"CAD",
								"CHF",
								"CNY",
								"CZK",
								"DKK",
								"EUR",
								"GBP",
								"HKD",
								"INR",
								"JPY",
								"KRW",
								"MYR",
								"NOK",
								"PLN",
								"RUB",
								"SAR",
								"SEK",
								"SGD",
								"TWD",
								"UAH",
								"USD",
								"ZAR"
							],
							"ColumnSizePercent": 0,
							"MinLength": 0,
							"MaxLength": 0,
							"SizeDesktop": 3,
							"SizeTablet": 4,
							"SizePhone": 4,
							"Minified": null,
							"Position": {
								"verticalPosition": 6,
								"horizontalPosition": 1
							},
							"TabStop": 27,
							"ValueConversion": null,
							"Title": null,
							"Pattern": null,
							"QueryAttributes": null,
							"JSSnippets": [],
							"DataBaseDefinition": {
								"QueryDefinition": null,
								"QueryMappings": null,
								"HttpDataSourceId": null,
								"IsResultTransformationEnabled": false
							},
							"IsTransitive": false,
							"PositionCounterpart": null,
							"AutoComplete": true,
							"AllowNegativeAmount": false
						},
						{
							"AttributeID": "Dokumentnummer",
							"Description": null,
							"LocalizedDescriptions": {},
							"AttributeLabel": null,
							"AttributeIcon": null,
							"AttributeType": 0,
							"Required": false,
							"ReadOnly": true,
							"DoAlignStart": true,
							"DefaultValue": null,
							"Values": [],
							"ColumnSizePercent": 0,
							"MinLength": 0,
							"MaxLength": 0,
							"SizeDesktop": 12,
							"SizeTablet": 4,
							"SizePhone": 4,
							"Minified": null,
							"Position": {
								"verticalPosition": 7,
								"horizontalPosition": 0
							},
							"TabStop": 28,
							"ValueConversion": null,
							"Title": null,
							"Pattern": null,
							"QueryAttributes": [],
							"JSSnippets": [{
								"OnMethod": "change",
								"Code": "function generateGUID() {\r\n    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {\r\n        var r = Math.random() * 16 | 0,\r\n            v = c === 'x' ? r : (r & 0x3 | 0x8);\r\n        return v.toString(16);\r\n    });\r\n}\r\n\r\nvar barcodeValue = GetAttribute('Barcode');\r\nif (barcodeValue == '') {\r\n    barcodeValue = generateGUID();\r\n}\r\n\r\nSetAttribute('Barcode', barcodeValue.toUpperCase());\r\n\r\nconst input = document.getElementById('Dokumentnummer');\r\n\r\nif (input) {\r\n    const container = input.closest('.ccAttributeContainer');\r\n    if (container) {\r\n        container.style.display = 'none';\r\n    }\r\n}\r\n"
							}],
							"DataBaseDefinition": {
								"QueryDefinition": "",
								"QueryMappings": null,
								"HttpDataSourceId": null,
								"IsResultTransformationEnabled": false
							},
							"IsTransitive": false,
							"PositionCounterpart": null,
							"AutoComplete": true,
							"AllowNegativeAmount": true
						}
					],
					"AttributeStructureDefinitions": []
				}
			],
			"StructureGroups": [],
			"JSSnippets": [{
				"OnMethod": "documentready",
				"Code": "// Aktuellen Task und Dokument-ID ermitteln\r\nvar taskId = __ActiveTask__.Task;\r\nvar documentId = __ActiveTask__.Document;\r\nvar subscriptionId = taskList[__ActiveTask__.Task].batchTask.subscriptionId;\r\nvar processSequenceId = taskList[__ActiveTask__.Task].batchTask.processSequenceId;\r\nvar invoiceNumber = GetAttribute('InvoiceNumber');\r\nvar vendorNum = GetAttribute('VENDOR_NUM');\r\n\r\nconsole.log({\r\n    taskId: taskId,\r\n    documentId: documentId,\r\n    subscriptionId: subscriptionId,\r\n    processSequenceId: processSequenceId\r\n});\r\n\r\n// Dropdownfeld für Mandant\r\nGetSqlResult('SELECT * FROM CC_COMPANIES')\r\n    .then(result => {\r\n        const companyNumIndex = result.Headers.indexOf('COMPANY_NUM');\r\n        const nameIndex = result.Headers.indexOf('NAME');\r\n\r\n        const selectValues = [];\r\n\r\n        result.Rows.forEach(row => {\r\n            const value = row.Cells[nameIndex];\r\n            const display = row.Cells[nameIndex];\r\n\r\n            selectValues.push([value, display]);\r\n        });\r\n\r\n        SetAttributeSelection('DEBITOR_NAME', selectValues);\r\n\r\n        const sqlQueryCompany = `SELECT * FROM CC_COMPANIES WHERE NAME = '${selectValues[0][0]}'`;\r\n\r\n        console.log(sqlQueryCompany)\r\n\r\n        GetSqlResult(sqlQueryCompany)\r\n            .then(result => {\r\n                const headers = result.Headers;\r\n\r\n                const idxCompanyERPTenantId = headers.indexOf('ERPTENANT_ID');\r\n                const idxCompanyCompanyNum = headers.indexOf('COMPANY_ID');\r\n\r\n                const row = result.Rows[0];\r\n\r\n                const companyERPTenantId = row.Cells[idxCompanyERPTenantId];\r\n                const companyCompanyNum = row.Cells[idxCompanyCompanyNum];\r\n\r\n                SetAttribute('DEBITOR_NUM', companyCompanyNum);\r\n                SetAttribute('debitorMapping', `${companyERPTenantId}-${companyCompanyNum}`);\r\n            })\r\n            .catch(console.error);\r\n    })\r\n    .catch(console.error);\r\n\r\n\r\nlet IsDuplicate = GetAttribute(\"IsDuplicate\");\r\nif (IsDuplicate) {\r\n    showDuplicateWarning()\r\n}\r\n\r\n\r\nfunction showDuplicateWarning() {\r\n    // Definition der Fehlerdaten\r\n    var customValidation = [\r\n        {\r\n            \"errorGroupId\": \"CustomValidation\",\r\n            \"errorGroup\": \"Dublettenprüfung\",\r\n            \"result\": false,\r\n            \"errorMessages\": [\r\n                {\r\n                    \"message\": `Die Rechnung vom Lieferanten ${vendorNum} mit der Rechnungsnummer ${invoiceNumber} wurde bereits verarbeitet.`,\r\n                    \"attributesConcerned\": [\"InvoiceNumber\", \"VENDOR_NUM\"]\r\n                }\r\n            ]\r\n        }\r\n    ];\r\n    // Die Daten in das Live-Objekt taskList schreiben\r\n    if (taskList[taskId]) {\r\n        taskList[taskId].documentModels.forEach(function (doc) {\r\n            if (doc.documentNumber === documentId) {\r\n                doc.validationResults = customValidation;\r\n                if (typeof ElementAddFlag === 'function') {\r\n                    ElementAddFlag(taskId + \"_\" + documentId, \"Rejected\");\r\n                }\r\n            }\r\n        });\r\n    }\r\n\r\n    __ValidationErrors__ = customValidation;\r\n    showDocumentInformation();\r\n}\r\n\r\n\r\n\r\n// Lupe im Feld: löst STRG + F9 im Feld aus.\r\n(function () {\r\n    const FIELD_IDS = [\"VENDOR_NUM\"]; // weitere Felder hier ergänzen\r\n    const ICON_NAME = \"ccCtrlF9Icon\";\r\n\r\n    FIELD_IDS.forEach(function (id) { waitForField(id, 0); });\r\n\r\n    // Wartet, bis das Feld im DOM ist (max. 10 s)\r\n    function waitForField(id, attempt) {\r\n        const input = document.getElementById(id);\r\n        if (input) {\r\n            addIcon(input);\r\n        } else if (attempt < 50) {\r\n            setTimeout(function () { waitForField(id, attempt + 1); }, 200);\r\n        } else {\r\n            console.warn(\"[Lupe] Feld nicht gefunden: \" + id);\r\n        }\r\n    }\r\n\r\n    function addIcon(input) {\r\n        const label = input.closest(\"label\") || input.parentElement;\r\n        if (label.querySelector('[name=\"' + ICON_NAME + '\"]')) return; // nur einmal\r\n\r\n        const icon = document.createElement(\"i\");\r\n        icon.setAttribute(\"name\", ICON_NAME);\r\n        icon.className = \"material-icons\"; // nur für das Lupen-Zeichen\r\n        icon.textContent = \"search\";\r\n        icon.title = \"Suche (STRG + F9)\";\r\n        icon.setAttribute(\"role\", \"button\");\r\n        icon.setAttribute(\"tabindex\", \"0\");\r\n        // Aussehen direkt am Symbol, damit das CSS des Webindex es nicht ausblendet\r\n        icon.style.cssText =\r\n            \"display:inline-flex !important; align-items:center; align-self:center;\" +\r\n            \"position:relative; z-index:2; cursor:pointer; padding:0 4px;\" +\r\n            \"font-size:22px; color:rgba(0,0,0,.54); user-select:none;\";\r\n\r\n        // Fokus im Feld lassen, sonst startet onblur die Hintergrundabfrage (BackgroundQuery)\r\n        icon.addEventListener(\"mousedown\", function (e) { e.preventDefault(); });\r\n        icon.addEventListener(\"click\", function (e) {\r\n            e.preventDefault();\r\n            e.stopPropagation();\r\n            pressCtrlF9(input);\r\n        });\r\n        icon.addEventListener(\"keydown\", function (e) {\r\n            if (e.key === \"Enter\" || e.key === \" \") {\r\n                e.preventDefault();\r\n                pressCtrlF9(input);\r\n            }\r\n        });\r\n\r\n        // Direkt hinter dem Eingabefeld einfügen\r\n        input.insertAdjacentElement(\"afterend\", icon);\r\n        console.log(\"[Lupe] eingefügt in \" + input.id + \" nach \" + (attempt * 200) + \" ms\");\r\n    }\r\n\r\n    function pressCtrlF9(target) {\r\n        target.focus(); // setzt über onfocus das aktive Feld (changeActiveInput)\r\n        [\"keydown\", \"keyup\"].forEach(function (type) {\r\n            const event = new KeyboardEvent(type, {\r\n                key: \"F9\", code: \"F9\", ctrlKey: true, bubbles: true, cancelable: true\r\n            });\r\n            // Ältere Tasten-Handler lesen keyCode/which; das lässt sich im Konstruktor nicht setzen\r\n            Object.defineProperty(event, \"keyCode\", { get: function () { return 120; } });\r\n            Object.defineProperty(event, \"which\", { get: function () { return 120; } });\r\n            target.dispatchEvent(event);\r\n        });\r\n        console.log(\"[Lupe] STRG + F9 ausgelöst in \" + target.id);\r\n        TriggerAttributeQuery(\"VENDOR_NUM\");\r\n    }\r\n})();\r\n"
			}],
			"TemplateDefinition": {
				"TemplateId": "VENDOR_NUM",
				"TemplateName": "VENDOR_NAME"
			}
		}],
		masterDataDefinitions: [
			{
				"TableName": "CC_COMPANIES",
				"Description": "debitorlist",
				"Columns": [
					{
						"ColumnName": "COMPANY_NUM",
						"Description": "Companynumber",
						"ColumnType": 1,
						"MaxLength": 256,
						"CreateIndex": false,
						"TryIdentifyPattern": false,
						"SingleValueEntityName": null,
						"SemanticType": 0,
						"SignificantCharacters": null,
						"DefaultValue": "",
						"CreateFulltextIndex": false
					},
					{
						"ColumnName": "NAME",
						"Description": "Name",
						"ColumnType": 1,
						"MaxLength": 256,
						"CreateIndex": false,
						"TryIdentifyPattern": false,
						"SingleValueEntityName": null,
						"SemanticType": 0,
						"SignificantCharacters": null,
						"DefaultValue": "",
						"CreateFulltextIndex": false
					},
					{
						"ColumnName": "STR",
						"Description": "Street",
						"ColumnType": 1,
						"MaxLength": 256,
						"CreateIndex": false,
						"TryIdentifyPattern": false,
						"SingleValueEntityName": null,
						"SemanticType": 0,
						"SignificantCharacters": null,
						"DefaultValue": "",
						"CreateFulltextIndex": false
					},
					{
						"ColumnName": "CITY",
						"Description": "City",
						"ColumnType": 1,
						"MaxLength": 256,
						"CreateIndex": false,
						"TryIdentifyPattern": false,
						"SingleValueEntityName": null,
						"SemanticType": 0,
						"SignificantCharacters": null,
						"DefaultValue": "",
						"CreateFulltextIndex": false
					},
					{
						"ColumnName": "ZIP",
						"Description": "Zipcode",
						"ColumnType": 1,
						"MaxLength": 15,
						"CreateIndex": false,
						"TryIdentifyPattern": false,
						"SingleValueEntityName": null,
						"SemanticType": 0,
						"SignificantCharacters": null,
						"DefaultValue": "",
						"CreateFulltextIndex": false
					},
					{
						"ColumnName": "COUNTRY",
						"Description": "COUNTRY",
						"ColumnType": 1,
						"MaxLength": 15,
						"CreateIndex": false,
						"TryIdentifyPattern": false,
						"SingleValueEntityName": null,
						"SemanticType": 0,
						"SignificantCharacters": null,
						"DefaultValue": "DE",
						"CreateFulltextIndex": false
					},
					{
						"ColumnName": "DEFAULT_CURRENCY",
						"Description": "DEFAULT_CURRENCY",
						"ColumnType": 1,
						"MaxLength": 15,
						"CreateIndex": false,
						"TryIdentifyPattern": false,
						"SingleValueEntityName": null,
						"SemanticType": 0,
						"SignificantCharacters": null,
						"DefaultValue": "EUR",
						"CreateFulltextIndex": false
					},
					{
						"ColumnName": "BLACK",
						"Description": "blacklistid",
						"ColumnType": 1,
						"MaxLength": 100,
						"CreateIndex": false,
						"TryIdentifyPattern": false,
						"SingleValueEntityName": null,
						"SemanticType": 0,
						"SignificantCharacters": null,
						"DefaultValue": "",
						"CreateFulltextIndex": false
					},
					{
						"ColumnName": "ERPTENANT_ID",
						"Description": null,
						"ColumnType": 1,
						"MaxLength": 1024,
						"CreateIndex": false,
						"TryIdentifyPattern": false,
						"SingleValueEntityName": null,
						"SemanticType": 0,
						"SignificantCharacters": null,
						"DefaultValue": "",
						"CreateFulltextIndex": false
					},
					{
						"ColumnName": "COMPANY_ID",
						"Description": null,
						"ColumnType": 1,
						"MaxLength": 1024,
						"CreateIndex": false,
						"TryIdentifyPattern": false,
						"SingleValueEntityName": null,
						"SemanticType": 0,
						"SignificantCharacters": null,
						"DefaultValue": "",
						"CreateFulltextIndex": false
					}
				]
			},
			{
				"TableName": "CC_VENDORS",
				"Description": "vendorlist",
				"Columns": [
					{
						"ColumnName": "COMPANY_NUM",
						"Description": "Companynumber",
						"ColumnType": 1,
						"MaxLength": 100,
						"CreateIndex": false,
						"TryIdentifyPattern": false,
						"SingleValueEntityName": null,
						"SemanticType": 0,
						"SignificantCharacters": null,
						"DefaultValue": "",
						"CreateFulltextIndex": false
					},
					{
						"ColumnName": "VENDOR_NUM",
						"Description": "Vendornumber",
						"ColumnType": 1,
						"MaxLength": 100,
						"CreateIndex": false,
						"TryIdentifyPattern": false,
						"SingleValueEntityName": null,
						"SemanticType": 0,
						"SignificantCharacters": null,
						"DefaultValue": "",
						"CreateFulltextIndex": false
					},
					{
						"ColumnName": "VENDOR_NAME",
						"Description": "vendorname",
						"ColumnType": 1,
						"MaxLength": 256,
						"CreateIndex": false,
						"TryIdentifyPattern": false,
						"SingleValueEntityName": null,
						"SemanticType": 1,
						"SignificantCharacters": null,
						"DefaultValue": "",
						"CreateFulltextIndex": false
					},
					{
						"ColumnName": "VENDOR_STR",
						"Description": "vendorstreet",
						"ColumnType": 1,
						"MaxLength": 256,
						"CreateIndex": false,
						"TryIdentifyPattern": false,
						"SingleValueEntityName": null,
						"SemanticType": 5,
						"SignificantCharacters": null,
						"DefaultValue": "",
						"CreateFulltextIndex": false
					},
					{
						"ColumnName": "VENDOR_ZIP_CODE",
						"Description": "vendorzipcode",
						"ColumnType": 1,
						"MaxLength": 100,
						"CreateIndex": false,
						"TryIdentifyPattern": false,
						"SingleValueEntityName": null,
						"SemanticType": 4,
						"SignificantCharacters": null,
						"DefaultValue": "",
						"CreateFulltextIndex": false
					},
					{
						"ColumnName": "VENDOR_CITY",
						"Description": "vendorcity",
						"ColumnType": 1,
						"MaxLength": 256,
						"CreateIndex": false,
						"TryIdentifyPattern": false,
						"SingleValueEntityName": null,
						"SemanticType": 3,
						"SignificantCharacters": null,
						"DefaultValue": "",
						"CreateFulltextIndex": false
					},
					{
						"ColumnName": "VENDOR_COUNTRY",
						"Description": "vendorcountry",
						"ColumnType": 1,
						"MaxLength": 256,
						"CreateIndex": false,
						"TryIdentifyPattern": false,
						"SingleValueEntityName": null,
						"SemanticType": 0,
						"SignificantCharacters": null,
						"DefaultValue": "",
						"CreateFulltextIndex": false
					},
					{
						"ColumnName": "VENDOR_EMAIL",
						"Description": "vendoremail",
						"ColumnType": 1,
						"MaxLength": 256,
						"CreateIndex": false,
						"TryIdentifyPattern": false,
						"SingleValueEntityName": null,
						"SemanticType": 0,
						"SignificantCharacters": null,
						"DefaultValue": "",
						"CreateFulltextIndex": false
					},
					{
						"ColumnName": "VENDOR_VAT_REGISTRATION_ID",
						"Description": "vendorVATId",
						"ColumnType": 1,
						"MaxLength": 100,
						"CreateIndex": true,
						"TryIdentifyPattern": false,
						"SingleValueEntityName": null,
						"SemanticType": 0,
						"SignificantCharacters": "[A-Za-z0-9]",
						"DefaultValue": "",
						"CreateFulltextIndex": false
					},
					{
						"ColumnName": "VENDOR_REGISTRATION_ID",
						"Description": "vendorregistrationid",
						"ColumnType": 1,
						"MaxLength": 100,
						"CreateIndex": true,
						"TryIdentifyPattern": false,
						"SingleValueEntityName": null,
						"SemanticType": 0,
						"SignificantCharacters": "[A-Za-z0-9]",
						"DefaultValue": "",
						"CreateFulltextIndex": false
					},
					{
						"ColumnName": "VENDOR_PHONE_NUMBER",
						"Description": "vendorphonenumber",
						"ColumnType": 1,
						"MaxLength": 100,
						"CreateIndex": true,
						"TryIdentifyPattern": false,
						"SingleValueEntityName": null,
						"SemanticType": 0,
						"SignificantCharacters": "[0-9]",
						"DefaultValue": "",
						"CreateFulltextIndex": false
					}
				]
			},
			{
				"TableName": "CC_VENDOR_BANK",
				"Description": "vendorbankdata",
				"Columns": [
					{
						"ColumnName": "COMPANY_NUM",
						"Description": "Companynumber",
						"ColumnType": 1,
						"MaxLength": 100,
						"CreateIndex": false,
						"TryIdentifyPattern": false,
						"SingleValueEntityName": null,
						"SemanticType": 0,
						"SignificantCharacters": null,
						"DefaultValue": "",
						"CreateFulltextIndex": false
					},
					{
						"ColumnName": "VENDOR_NUM",
						"Description": "Vendornumber",
						"ColumnType": 1,
						"MaxLength": 100,
						"CreateIndex": false,
						"TryIdentifyPattern": false,
						"SingleValueEntityName": null,
						"SemanticType": 0,
						"SignificantCharacters": null,
						"DefaultValue": "",
						"CreateFulltextIndex": false
					},
					{
						"ColumnName": "BANK_CODE",
						"Description": "bankcode",
						"ColumnType": 1,
						"MaxLength": 100,
						"CreateIndex": false,
						"TryIdentifyPattern": false,
						"SingleValueEntityName": null,
						"SemanticType": 0,
						"SignificantCharacters": null,
						"DefaultValue": "",
						"CreateFulltextIndex": false
					},
					{
						"ColumnName": "BANK_ACCOUNT",
						"Description": "bankaccount",
						"ColumnType": 1,
						"MaxLength": 100,
						"CreateIndex": false,
						"TryIdentifyPattern": false,
						"SingleValueEntityName": null,
						"SemanticType": 0,
						"SignificantCharacters": null,
						"DefaultValue": "",
						"CreateFulltextIndex": false
					},
					{
						"ColumnName": "IBAN",
						"Description": "IBAN",
						"ColumnType": 1,
						"MaxLength": 100,
						"CreateIndex": true,
						"TryIdentifyPattern": false,
						"SingleValueEntityName": null,
						"SemanticType": 6,
						"SignificantCharacters": "[A-Za-z0-9]",
						"DefaultValue": "",
						"CreateFulltextIndex": false
					},
					{
						"ColumnName": "BIC",
						"Description": "BIC",
						"ColumnType": 1,
						"MaxLength": 100,
						"CreateIndex": false,
						"TryIdentifyPattern": false,
						"SingleValueEntityName": null,
						"SemanticType": 0,
						"SignificantCharacters": null,
						"DefaultValue": "",
						"CreateFulltextIndex": false
					}
				]
			},
			{
				"TableName": "CC_ORDERS",
				"Description": "orders",
				"Columns": [
					{
						"ColumnName": "COMPANY_NUM",
						"Description": "Companynumber",
						"ColumnType": 1,
						"MaxLength": 100,
						"CreateIndex": false,
						"TryIdentifyPattern": false,
						"SingleValueEntityName": null,
						"SemanticType": 0,
						"SignificantCharacters": null,
						"DefaultValue": "",
						"CreateFulltextIndex": false
					},
					{
						"ColumnName": "VENDOR_NUM",
						"Description": "Vendornumber",
						"ColumnType": 1,
						"MaxLength": 100,
						"CreateIndex": false,
						"TryIdentifyPattern": false,
						"SingleValueEntityName": null,
						"SemanticType": 0,
						"SignificantCharacters": null,
						"DefaultValue": "",
						"CreateFulltextIndex": false
					},
					{
						"ColumnName": "ORDER_NUM",
						"Description": "Ordernumber",
						"ColumnType": 1,
						"MaxLength": 100,
						"CreateIndex": false,
						"TryIdentifyPattern": true,
						"SingleValueEntityName": null,
						"SemanticType": 0,
						"SignificantCharacters": null,
						"DefaultValue": "",
						"CreateFulltextIndex": false
					},
					{
						"ColumnName": "PLANNED_DELIVERY_DATE",
						"Description": "DeliveryDate",
						"ColumnType": 1,
						"MaxLength": 100,
						"CreateIndex": false,
						"TryIdentifyPattern": false,
						"SingleValueEntityName": null,
						"SemanticType": 0,
						"SignificantCharacters": null,
						"DefaultValue": "",
						"CreateFulltextIndex": false
					},
					{
						"ColumnName": "ORDER_DATE",
						"Description": "OrderDate",
						"ColumnType": 1,
						"MaxLength": 100,
						"CreateIndex": false,
						"TryIdentifyPattern": false,
						"SingleValueEntityName": null,
						"SemanticType": 0,
						"SignificantCharacters": null,
						"DefaultValue": "",
						"CreateFulltextIndex": false
					}
				]
			},
			{
				"TableName": "CC_ORDERLINES",
				"Description": "orderlines",
				"Columns": [
					{
						"ColumnName": "COMPANY_NUM",
						"Description": "CompanyNumber",
						"ColumnType": 1,
						"MaxLength": 100,
						"CreateIndex": false,
						"TryIdentifyPattern": false,
						"SingleValueEntityName": null,
						"SemanticType": 0,
						"SignificantCharacters": null,
						"DefaultValue": "",
						"CreateFulltextIndex": false
					},
					{
						"ColumnName": "ORDER_NUM",
						"Description": "OrderNumber",
						"ColumnType": 1,
						"MaxLength": 100,
						"CreateIndex": false,
						"TryIdentifyPattern": false,
						"SingleValueEntityName": null,
						"SemanticType": 0,
						"SignificantCharacters": null,
						"DefaultValue": "",
						"CreateFulltextIndex": false
					},
					{
						"ColumnName": "ORDER_POS",
						"Description": "OrderPosNumber",
						"ColumnType": 1,
						"MaxLength": 100,
						"CreateIndex": false,
						"TryIdentifyPattern": false,
						"SingleValueEntityName": null,
						"SemanticType": 0,
						"SignificantCharacters": null,
						"DefaultValue": "",
						"CreateFulltextIndex": false
					},
					{
						"ColumnName": "MATNR",
						"Description": "OrderPosNumber",
						"ColumnType": 1,
						"MaxLength": 100,
						"CreateIndex": false,
						"TryIdentifyPattern": false,
						"SingleValueEntityName": null,
						"SemanticType": 0,
						"SignificantCharacters": null,
						"DefaultValue": "",
						"CreateFulltextIndex": false
					},
					{
						"ColumnName": "VENDOR_MATNR",
						"Description": "OrderPosNumber",
						"ColumnType": 1,
						"MaxLength": 100,
						"CreateIndex": false,
						"TryIdentifyPattern": false,
						"SingleValueEntityName": null,
						"SemanticType": 0,
						"SignificantCharacters": null,
						"DefaultValue": "",
						"CreateFulltextIndex": false
					},
					{
						"ColumnName": "DESCRIPTION",
						"Description": "OrderPosNumber",
						"ColumnType": 1,
						"MaxLength": 100,
						"CreateIndex": false,
						"TryIdentifyPattern": false,
						"SingleValueEntityName": null,
						"SemanticType": 0,
						"SignificantCharacters": null,
						"DefaultValue": "",
						"CreateFulltextIndex": false
					},
					{
						"ColumnName": "UNIT_PRICE",
						"Description": "OrderPosNumber",
						"ColumnType": 2,
						"MaxLength": 100,
						"CreateIndex": false,
						"TryIdentifyPattern": false,
						"SingleValueEntityName": null,
						"SemanticType": 0,
						"SignificantCharacters": null,
						"DefaultValue": "",
						"CreateFulltextIndex": false
					},
					{
						"ColumnName": "QUANTITY",
						"Description": "OrderPosNumber",
						"ColumnType": 2,
						"MaxLength": 100,
						"CreateIndex": false,
						"TryIdentifyPattern": false,
						"SingleValueEntityName": null,
						"SemanticType": 0,
						"SignificantCharacters": null,
						"DefaultValue": "",
						"CreateFulltextIndex": false
					},
					{
						"ColumnName": "SUM_PRICE",
						"Description": "OrderPosNumber",
						"ColumnType": 2,
						"MaxLength": 100,
						"CreateIndex": false,
						"TryIdentifyPattern": false,
						"SingleValueEntityName": null,
						"SemanticType": 0,
						"SignificantCharacters": null,
						"DefaultValue": "",
						"CreateFulltextIndex": false
					},
					{
						"ColumnName": "PRICE_UNITS",
						"Description": "OrderPosNumber",
						"ColumnType": 1,
						"MaxLength": 100,
						"CreateIndex": false,
						"TryIdentifyPattern": false,
						"SingleValueEntityName": null,
						"SemanticType": 0,
						"SignificantCharacters": null,
						"DefaultValue": "",
						"CreateFulltextIndex": false
					},
					{
						"ColumnName": "UNITS",
						"Description": "OrderPosNumber",
						"ColumnType": 1,
						"MaxLength": 100,
						"CreateIndex": false,
						"TryIdentifyPattern": false,
						"SingleValueEntityName": null,
						"SemanticType": 0,
						"SignificantCharacters": null,
						"DefaultValue": "",
						"CreateFulltextIndex": false
					},
					{
						"ColumnName": "PLANNED_DELIVERY_DATE",
						"Description": "DeliveryDate",
						"ColumnType": 1,
						"MaxLength": 100,
						"CreateIndex": false,
						"TryIdentifyPattern": false,
						"SingleValueEntityName": null,
						"SemanticType": 0,
						"SignificantCharacters": null,
						"DefaultValue": "",
						"CreateFulltextIndex": false
					}
				]
			},
			{
				"TableName": "CC_RECEIPTS",
				"Description": "receipts",
				"Columns": [
					{
						"ColumnName": "COMPANY_NUM",
						"Description": "Companynumber",
						"ColumnType": 1,
						"MaxLength": 100,
						"CreateIndex": false,
						"TryIdentifyPattern": false,
						"SingleValueEntityName": null,
						"SemanticType": 0,
						"SignificantCharacters": null,
						"DefaultValue": "",
						"CreateFulltextIndex": false
					},
					{
						"ColumnName": "ORDER_NUM",
						"Description": "Ordernumber",
						"ColumnType": 1,
						"MaxLength": 100,
						"CreateIndex": false,
						"TryIdentifyPattern": false,
						"SingleValueEntityName": null,
						"SemanticType": 0,
						"SignificantCharacters": null,
						"DefaultValue": "",
						"CreateFulltextIndex": false
					},
					{
						"ColumnName": "ORDER_POS",
						"Description": "orderpos",
						"ColumnType": 1,
						"MaxLength": 100,
						"CreateIndex": false,
						"TryIdentifyPattern": false,
						"SingleValueEntityName": null,
						"SemanticType": 0,
						"SignificantCharacters": null,
						"DefaultValue": "",
						"CreateFulltextIndex": false
					},
					{
						"ColumnName": "QUANTITY",
						"Description": "orderpos",
						"ColumnType": 2,
						"MaxLength": 100,
						"CreateIndex": false,
						"TryIdentifyPattern": false,
						"SingleValueEntityName": null,
						"SemanticType": 0,
						"SignificantCharacters": null,
						"DefaultValue": "",
						"CreateFulltextIndex": false
					},
					{
						"ColumnName": "RECEIPT_NUM",
						"Description": "orderpos",
						"ColumnType": 1,
						"MaxLength": 100,
						"CreateIndex": false,
						"TryIdentifyPattern": false,
						"SingleValueEntityName": null,
						"SemanticType": 0,
						"SignificantCharacters": null,
						"DefaultValue": "",
						"CreateFulltextIndex": false
					}
				]
			},
			{
				"TableName": "EXTENDED_VENDOR_SETTINGS",
				"Description": "extendet vendor settings",
				"Columns": [
					{
						"ColumnName": "COMPANY_NUM",
						"Description": "Companynumber",
						"ColumnType": 1,
						"MaxLength": 100,
						"CreateIndex": false,
						"TryIdentifyPattern": false,
						"SingleValueEntityName": null,
						"SemanticType": 0,
						"SignificantCharacters": null,
						"DefaultValue": "",
						"CreateFulltextIndex": false
					},
					{
						"ColumnName": "VENDOR_NUM",
						"Description": "Vendornumber",
						"ColumnType": 1,
						"MaxLength": 100,
						"CreateIndex": false,
						"TryIdentifyPattern": false,
						"SingleValueEntityName": null,
						"SemanticType": 0,
						"SignificantCharacters": null,
						"DefaultValue": "",
						"CreateFulltextIndex": false
					},
					{
						"ColumnName": "AutoRoutingFlag",
						"Description": "AutoRoutingFlag",
						"ColumnType": 1,
						"MaxLength": 100,
						"CreateIndex": false,
						"TryIdentifyPattern": false,
						"SingleValueEntityName": null,
						"SemanticType": 0,
						"SignificantCharacters": null,
						"DefaultValue": "",
						"CreateFulltextIndex": false
					}
				]
			},
			{
				"TableName": "CC_RULES",
				"Description": "CC_RULES",
				"Columns": [
					{
						"ColumnName": "ID",
						"Description": "ID",
						"ColumnType": 0,
						"MaxLength": 100,
						"CreateIndex": false,
						"TryIdentifyPattern": false,
						"SingleValueEntityName": null,
						"SemanticType": 0,
						"SignificantCharacters": null,
						"DefaultValue": "",
						"CreateFulltextIndex": false
					},
					{
						"ColumnName": "EXPORTVALUE",
						"Description": "EXPORTVALUE",
						"ColumnType": 1,
						"MaxLength": 100,
						"CreateIndex": false,
						"TryIdentifyPattern": false,
						"SingleValueEntityName": null,
						"SemanticType": 0,
						"SignificantCharacters": null,
						"DefaultValue": "",
						"CreateFulltextIndex": false
					},
					{
						"ColumnName": "BOOST",
						"Description": "BOOST",
						"ColumnType": 0,
						"MaxLength": 100,
						"CreateIndex": false,
						"TryIdentifyPattern": false,
						"SingleValueEntityName": null,
						"SemanticType": 0,
						"SignificantCharacters": null,
						"DefaultValue": "",
						"CreateFulltextIndex": false
					},
					{
						"ColumnName": "RULEEXPRESSION",
						"Description": "RULEEXPRESSION",
						"ColumnType": 1,
						"MaxLength": 100,
						"CreateIndex": false,
						"TryIdentifyPattern": false,
						"SingleValueEntityName": null,
						"SemanticType": 0,
						"SignificantCharacters": null,
						"DefaultValue": "",
						"CreateFulltextIndex": false
					},
					{
						"ColumnName": "RULESCHEMA",
						"Description": "RULESCHEMA",
						"ColumnType": 1,
						"MaxLength": 15,
						"CreateIndex": true,
						"TryIdentifyPattern": false,
						"SingleValueEntityName": null,
						"SemanticType": 0,
						"SignificantCharacters": null,
						"DefaultValue": "",
						"CreateFulltextIndex": false
					},
					{
						"ColumnName": "CREATEDBY",
						"Description": "CREATEDBY",
						"ColumnType": 1,
						"MaxLength": 100,
						"CreateIndex": false,
						"TryIdentifyPattern": false,
						"SingleValueEntityName": null,
						"SemanticType": 0,
						"SignificantCharacters": null,
						"DefaultValue": "",
						"CreateFulltextIndex": false
					},
					{
						"ColumnName": "CREATEDATE",
						"Description": "CREATEDATE",
						"ColumnType": 1,
						"MaxLength": 100,
						"CreateIndex": false,
						"TryIdentifyPattern": false,
						"SingleValueEntityName": null,
						"SemanticType": 0,
						"SignificantCharacters": null,
						"DefaultValue": "",
						"CreateFulltextIndex": false
					},
					{
						"ColumnName": "UPDATEDBY",
						"Description": "UPDATEDBY",
						"ColumnType": 1,
						"MaxLength": 100,
						"CreateIndex": false,
						"TryIdentifyPattern": false,
						"SingleValueEntityName": null,
						"SemanticType": 0,
						"SignificantCharacters": null,
						"DefaultValue": "",
						"CreateFulltextIndex": false
					},
					{
						"ColumnName": "UPDATEDATE",
						"Description": "UPDATEDATE",
						"ColumnType": 1,
						"MaxLength": 100,
						"CreateIndex": true,
						"TryIdentifyPattern": false,
						"SingleValueEntityName": null,
						"SemanticType": 0,
						"SignificantCharacters": null,
						"DefaultValue": "",
						"CreateFulltextIndex": false
					},
					{
						"ColumnName": "DISABLED",
						"Description": "DISABLED",
						"ColumnType": 0,
						"MaxLength": 100,
						"CreateIndex": true,
						"TryIdentifyPattern": false,
						"SingleValueEntityName": null,
						"SemanticType": 0,
						"SignificantCharacters": null,
						"DefaultValue": "",
						"CreateFulltextIndex": false
					}
				]
			}
		],
		baseMasterDataDefinitions: [
			{
				"TableName": "CC_COMPANIES",
				"Description": "debitorlist",
				"Columns": [
					{
						"ColumnName": "COMPANY_NUM",
						"Description": "Companynumber",
						"ColumnType": 1,
						"MaxLength": 256,
						"CreateIndex": false,
						"TryIdentifyPattern": false,
						"SingleValueEntityName": null,
						"SemanticType": 0,
						"SignificantCharacters": null,
						"DefaultValue": "",
						"CreateFulltextIndex": false
					},
					{
						"ColumnName": "NAME",
						"Description": "Name",
						"ColumnType": 1,
						"MaxLength": 256,
						"CreateIndex": false,
						"TryIdentifyPattern": false,
						"SingleValueEntityName": null,
						"SemanticType": 0,
						"SignificantCharacters": null,
						"DefaultValue": "",
						"CreateFulltextIndex": false
					},
					{
						"ColumnName": "STR",
						"Description": "Street",
						"ColumnType": 1,
						"MaxLength": 256,
						"CreateIndex": false,
						"TryIdentifyPattern": false,
						"SingleValueEntityName": null,
						"SemanticType": 0,
						"SignificantCharacters": null,
						"DefaultValue": "",
						"CreateFulltextIndex": false
					},
					{
						"ColumnName": "CITY",
						"Description": "City",
						"ColumnType": 1,
						"MaxLength": 256,
						"CreateIndex": false,
						"TryIdentifyPattern": false,
						"SingleValueEntityName": null,
						"SemanticType": 0,
						"SignificantCharacters": null,
						"DefaultValue": "",
						"CreateFulltextIndex": false
					},
					{
						"ColumnName": "ZIP",
						"Description": "Zipcode",
						"ColumnType": 1,
						"MaxLength": 15,
						"CreateIndex": false,
						"TryIdentifyPattern": false,
						"SingleValueEntityName": null,
						"SemanticType": 0,
						"SignificantCharacters": null,
						"DefaultValue": "",
						"CreateFulltextIndex": false
					},
					{
						"ColumnName": "COUNTRY",
						"Description": "COUNTRY",
						"ColumnType": 1,
						"MaxLength": 15,
						"CreateIndex": false,
						"TryIdentifyPattern": false,
						"SingleValueEntityName": null,
						"SemanticType": 0,
						"SignificantCharacters": null,
						"DefaultValue": "DE",
						"CreateFulltextIndex": false
					},
					{
						"ColumnName": "DEFAULT_CURRENCY",
						"Description": "DEFAULT_CURRENCY",
						"ColumnType": 1,
						"MaxLength": 15,
						"CreateIndex": false,
						"TryIdentifyPattern": false,
						"SingleValueEntityName": null,
						"SemanticType": 0,
						"SignificantCharacters": null,
						"DefaultValue": "EUR",
						"CreateFulltextIndex": false
					},
					{
						"ColumnName": "BLACK",
						"Description": "blacklistid",
						"ColumnType": 1,
						"MaxLength": 100,
						"CreateIndex": false,
						"TryIdentifyPattern": false,
						"SingleValueEntityName": null,
						"SemanticType": 0,
						"SignificantCharacters": null,
						"DefaultValue": "",
						"CreateFulltextIndex": false
					}
				]
			},
			{
				"TableName": "CC_VENDORS",
				"Description": "vendorlist",
				"Columns": [
					{
						"ColumnName": "COMPANY_NUM",
						"Description": "Companynumber",
						"ColumnType": 1,
						"MaxLength": 100,
						"CreateIndex": false,
						"TryIdentifyPattern": false,
						"SingleValueEntityName": null,
						"SemanticType": 0,
						"SignificantCharacters": null,
						"DefaultValue": "",
						"CreateFulltextIndex": false
					},
					{
						"ColumnName": "VENDOR_NUM",
						"Description": "Vendornumber",
						"ColumnType": 1,
						"MaxLength": 100,
						"CreateIndex": false,
						"TryIdentifyPattern": false,
						"SingleValueEntityName": null,
						"SemanticType": 0,
						"SignificantCharacters": null,
						"DefaultValue": "",
						"CreateFulltextIndex": false
					},
					{
						"ColumnName": "VENDOR_NAME",
						"Description": "vendorname",
						"ColumnType": 1,
						"MaxLength": 256,
						"CreateIndex": false,
						"TryIdentifyPattern": false,
						"SingleValueEntityName": null,
						"SemanticType": 1,
						"SignificantCharacters": null,
						"DefaultValue": "",
						"CreateFulltextIndex": false
					},
					{
						"ColumnName": "VENDOR_STR",
						"Description": "vendorstreet",
						"ColumnType": 1,
						"MaxLength": 256,
						"CreateIndex": false,
						"TryIdentifyPattern": false,
						"SingleValueEntityName": null,
						"SemanticType": 5,
						"SignificantCharacters": null,
						"DefaultValue": "",
						"CreateFulltextIndex": false
					},
					{
						"ColumnName": "VENDOR_ZIP_CODE",
						"Description": "vendorzipcode",
						"ColumnType": 1,
						"MaxLength": 100,
						"CreateIndex": false,
						"TryIdentifyPattern": false,
						"SingleValueEntityName": null,
						"SemanticType": 4,
						"SignificantCharacters": null,
						"DefaultValue": "",
						"CreateFulltextIndex": false
					},
					{
						"ColumnName": "VENDOR_CITY",
						"Description": "vendorcity",
						"ColumnType": 1,
						"MaxLength": 256,
						"CreateIndex": false,
						"TryIdentifyPattern": false,
						"SingleValueEntityName": null,
						"SemanticType": 3,
						"SignificantCharacters": null,
						"DefaultValue": "",
						"CreateFulltextIndex": false
					},
					{
						"ColumnName": "VENDOR_COUNTRY",
						"Description": "vendorcountry",
						"ColumnType": 1,
						"MaxLength": 256,
						"CreateIndex": false,
						"TryIdentifyPattern": false,
						"SingleValueEntityName": null,
						"SemanticType": 0,
						"SignificantCharacters": null,
						"DefaultValue": "",
						"CreateFulltextIndex": false
					},
					{
						"ColumnName": "VENDOR_EMAIL",
						"Description": "vendoremail",
						"ColumnType": 1,
						"MaxLength": 256,
						"CreateIndex": false,
						"TryIdentifyPattern": false,
						"SingleValueEntityName": null,
						"SemanticType": 0,
						"SignificantCharacters": null,
						"DefaultValue": "",
						"CreateFulltextIndex": false
					},
					{
						"ColumnName": "VENDOR_VAT_REGISTRATION_ID",
						"Description": "vendorVATId",
						"ColumnType": 1,
						"MaxLength": 100,
						"CreateIndex": true,
						"TryIdentifyPattern": false,
						"SingleValueEntityName": null,
						"SemanticType": 0,
						"SignificantCharacters": "[A-Za-z0-9]",
						"DefaultValue": "",
						"CreateFulltextIndex": false
					},
					{
						"ColumnName": "VENDOR_REGISTRATION_ID",
						"Description": "vendorregistrationid",
						"ColumnType": 1,
						"MaxLength": 100,
						"CreateIndex": true,
						"TryIdentifyPattern": false,
						"SingleValueEntityName": null,
						"SemanticType": 0,
						"SignificantCharacters": "[A-Za-z0-9]",
						"DefaultValue": "",
						"CreateFulltextIndex": false
					},
					{
						"ColumnName": "VENDOR_PHONE_NUMBER",
						"Description": "vendorphonenumber",
						"ColumnType": 1,
						"MaxLength": 100,
						"CreateIndex": true,
						"TryIdentifyPattern": false,
						"SingleValueEntityName": null,
						"SemanticType": 0,
						"SignificantCharacters": "[0-9]",
						"DefaultValue": "",
						"CreateFulltextIndex": false
					}
				]
			},
			{
				"TableName": "CC_VENDOR_BANK",
				"Description": "vendorbankdata",
				"Columns": [
					{
						"ColumnName": "COMPANY_NUM",
						"Description": "Companynumber",
						"ColumnType": 1,
						"MaxLength": 100,
						"CreateIndex": false,
						"TryIdentifyPattern": false,
						"SingleValueEntityName": null,
						"SemanticType": 0,
						"SignificantCharacters": null,
						"DefaultValue": "",
						"CreateFulltextIndex": false
					},
					{
						"ColumnName": "VENDOR_NUM",
						"Description": "Vendornumber",
						"ColumnType": 1,
						"MaxLength": 100,
						"CreateIndex": false,
						"TryIdentifyPattern": false,
						"SingleValueEntityName": null,
						"SemanticType": 0,
						"SignificantCharacters": null,
						"DefaultValue": "",
						"CreateFulltextIndex": false
					},
					{
						"ColumnName": "BANK_CODE",
						"Description": "bankcode",
						"ColumnType": 1,
						"MaxLength": 100,
						"CreateIndex": false,
						"TryIdentifyPattern": false,
						"SingleValueEntityName": null,
						"SemanticType": 0,
						"SignificantCharacters": null,
						"DefaultValue": "",
						"CreateFulltextIndex": false
					},
					{
						"ColumnName": "BANK_ACCOUNT",
						"Description": "bankaccount",
						"ColumnType": 1,
						"MaxLength": 100,
						"CreateIndex": false,
						"TryIdentifyPattern": false,
						"SingleValueEntityName": null,
						"SemanticType": 0,
						"SignificantCharacters": null,
						"DefaultValue": "",
						"CreateFulltextIndex": false
					},
					{
						"ColumnName": "IBAN",
						"Description": "IBAN",
						"ColumnType": 1,
						"MaxLength": 100,
						"CreateIndex": true,
						"TryIdentifyPattern": false,
						"SingleValueEntityName": null,
						"SemanticType": 6,
						"SignificantCharacters": "[A-Za-z0-9]",
						"DefaultValue": "",
						"CreateFulltextIndex": false
					},
					{
						"ColumnName": "BIC",
						"Description": "BIC",
						"ColumnType": 1,
						"MaxLength": 100,
						"CreateIndex": false,
						"TryIdentifyPattern": false,
						"SingleValueEntityName": null,
						"SemanticType": 0,
						"SignificantCharacters": null,
						"DefaultValue": "",
						"CreateFulltextIndex": false
					}
				]
			},
			{
				"TableName": "CC_ORDERS",
				"Description": "orders",
				"Columns": [
					{
						"ColumnName": "COMPANY_NUM",
						"Description": "Companynumber",
						"ColumnType": 1,
						"MaxLength": 100,
						"CreateIndex": false,
						"TryIdentifyPattern": false,
						"SingleValueEntityName": null,
						"SemanticType": 0,
						"SignificantCharacters": null,
						"DefaultValue": "",
						"CreateFulltextIndex": false
					},
					{
						"ColumnName": "VENDOR_NUM",
						"Description": "Vendornumber",
						"ColumnType": 1,
						"MaxLength": 100,
						"CreateIndex": false,
						"TryIdentifyPattern": false,
						"SingleValueEntityName": null,
						"SemanticType": 0,
						"SignificantCharacters": null,
						"DefaultValue": "",
						"CreateFulltextIndex": false
					},
					{
						"ColumnName": "ORDER_NUM",
						"Description": "Ordernumber",
						"ColumnType": 1,
						"MaxLength": 100,
						"CreateIndex": false,
						"TryIdentifyPattern": true,
						"SingleValueEntityName": null,
						"SemanticType": 0,
						"SignificantCharacters": null,
						"DefaultValue": "",
						"CreateFulltextIndex": false
					},
					{
						"ColumnName": "PLANNED_DELIVERY_DATE",
						"Description": "DeliveryDate",
						"ColumnType": 1,
						"MaxLength": 100,
						"CreateIndex": false,
						"TryIdentifyPattern": false,
						"SingleValueEntityName": null,
						"SemanticType": 0,
						"SignificantCharacters": null,
						"DefaultValue": "",
						"CreateFulltextIndex": false
					},
					{
						"ColumnName": "ORDER_DATE",
						"Description": "OrderDate",
						"ColumnType": 1,
						"MaxLength": 100,
						"CreateIndex": false,
						"TryIdentifyPattern": false,
						"SingleValueEntityName": null,
						"SemanticType": 0,
						"SignificantCharacters": null,
						"DefaultValue": "",
						"CreateFulltextIndex": false
					}
				]
			},
			{
				"TableName": "CC_ORDERLINES",
				"Description": "orderlines",
				"Columns": [
					{
						"ColumnName": "COMPANY_NUM",
						"Description": "CompanyNumber",
						"ColumnType": 1,
						"MaxLength": 100,
						"CreateIndex": false,
						"TryIdentifyPattern": false,
						"SingleValueEntityName": null,
						"SemanticType": 0,
						"SignificantCharacters": null,
						"DefaultValue": "",
						"CreateFulltextIndex": false
					},
					{
						"ColumnName": "ORDER_NUM",
						"Description": "OrderNumber",
						"ColumnType": 1,
						"MaxLength": 100,
						"CreateIndex": false,
						"TryIdentifyPattern": false,
						"SingleValueEntityName": null,
						"SemanticType": 0,
						"SignificantCharacters": null,
						"DefaultValue": "",
						"CreateFulltextIndex": false
					},
					{
						"ColumnName": "ORDER_POS",
						"Description": "OrderPosNumber",
						"ColumnType": 1,
						"MaxLength": 100,
						"CreateIndex": false,
						"TryIdentifyPattern": false,
						"SingleValueEntityName": null,
						"SemanticType": 0,
						"SignificantCharacters": null,
						"DefaultValue": "",
						"CreateFulltextIndex": false
					},
					{
						"ColumnName": "MATNR",
						"Description": "OrderPosNumber",
						"ColumnType": 1,
						"MaxLength": 100,
						"CreateIndex": false,
						"TryIdentifyPattern": false,
						"SingleValueEntityName": null,
						"SemanticType": 0,
						"SignificantCharacters": null,
						"DefaultValue": "",
						"CreateFulltextIndex": false
					},
					{
						"ColumnName": "VENDOR_MATNR",
						"Description": "OrderPosNumber",
						"ColumnType": 1,
						"MaxLength": 100,
						"CreateIndex": false,
						"TryIdentifyPattern": false,
						"SingleValueEntityName": null,
						"SemanticType": 0,
						"SignificantCharacters": null,
						"DefaultValue": "",
						"CreateFulltextIndex": false
					},
					{
						"ColumnName": "DESCRIPTION",
						"Description": "OrderPosNumber",
						"ColumnType": 1,
						"MaxLength": 100,
						"CreateIndex": false,
						"TryIdentifyPattern": false,
						"SingleValueEntityName": null,
						"SemanticType": 0,
						"SignificantCharacters": null,
						"DefaultValue": "",
						"CreateFulltextIndex": false
					},
					{
						"ColumnName": "UNIT_PRICE",
						"Description": "OrderPosNumber",
						"ColumnType": 2,
						"MaxLength": 100,
						"CreateIndex": false,
						"TryIdentifyPattern": false,
						"SingleValueEntityName": null,
						"SemanticType": 0,
						"SignificantCharacters": null,
						"DefaultValue": "",
						"CreateFulltextIndex": false
					},
					{
						"ColumnName": "QUANTITY",
						"Description": "OrderPosNumber",
						"ColumnType": 2,
						"MaxLength": 100,
						"CreateIndex": false,
						"TryIdentifyPattern": false,
						"SingleValueEntityName": null,
						"SemanticType": 0,
						"SignificantCharacters": null,
						"DefaultValue": "",
						"CreateFulltextIndex": false
					},
					{
						"ColumnName": "SUM_PRICE",
						"Description": "OrderPosNumber",
						"ColumnType": 2,
						"MaxLength": 100,
						"CreateIndex": false,
						"TryIdentifyPattern": false,
						"SingleValueEntityName": null,
						"SemanticType": 0,
						"SignificantCharacters": null,
						"DefaultValue": "",
						"CreateFulltextIndex": false
					},
					{
						"ColumnName": "PRICE_UNITS",
						"Description": "OrderPosNumber",
						"ColumnType": 1,
						"MaxLength": 100,
						"CreateIndex": false,
						"TryIdentifyPattern": false,
						"SingleValueEntityName": null,
						"SemanticType": 0,
						"SignificantCharacters": null,
						"DefaultValue": "",
						"CreateFulltextIndex": false
					},
					{
						"ColumnName": "UNITS",
						"Description": "OrderPosNumber",
						"ColumnType": 1,
						"MaxLength": 100,
						"CreateIndex": false,
						"TryIdentifyPattern": false,
						"SingleValueEntityName": null,
						"SemanticType": 0,
						"SignificantCharacters": null,
						"DefaultValue": "",
						"CreateFulltextIndex": false
					},
					{
						"ColumnName": "PLANNED_DELIVERY_DATE",
						"Description": "DeliveryDate",
						"ColumnType": 1,
						"MaxLength": 100,
						"CreateIndex": false,
						"TryIdentifyPattern": false,
						"SingleValueEntityName": null,
						"SemanticType": 0,
						"SignificantCharacters": null,
						"DefaultValue": "",
						"CreateFulltextIndex": false
					}
				]
			},
			{
				"TableName": "CC_RECEIPTS",
				"Description": "receipts",
				"Columns": [
					{
						"ColumnName": "COMPANY_NUM",
						"Description": "Companynumber",
						"ColumnType": 1,
						"MaxLength": 100,
						"CreateIndex": false,
						"TryIdentifyPattern": false,
						"SingleValueEntityName": null,
						"SemanticType": 0,
						"SignificantCharacters": null,
						"DefaultValue": "",
						"CreateFulltextIndex": false
					},
					{
						"ColumnName": "ORDER_NUM",
						"Description": "Ordernumber",
						"ColumnType": 1,
						"MaxLength": 100,
						"CreateIndex": false,
						"TryIdentifyPattern": false,
						"SingleValueEntityName": null,
						"SemanticType": 0,
						"SignificantCharacters": null,
						"DefaultValue": "",
						"CreateFulltextIndex": false
					},
					{
						"ColumnName": "ORDER_POS",
						"Description": "orderpos",
						"ColumnType": 1,
						"MaxLength": 100,
						"CreateIndex": false,
						"TryIdentifyPattern": false,
						"SingleValueEntityName": null,
						"SemanticType": 0,
						"SignificantCharacters": null,
						"DefaultValue": "",
						"CreateFulltextIndex": false
					},
					{
						"ColumnName": "QUANTITY",
						"Description": "orderpos",
						"ColumnType": 2,
						"MaxLength": 100,
						"CreateIndex": false,
						"TryIdentifyPattern": false,
						"SingleValueEntityName": null,
						"SemanticType": 0,
						"SignificantCharacters": null,
						"DefaultValue": "",
						"CreateFulltextIndex": false
					},
					{
						"ColumnName": "RECEIPT_NUM",
						"Description": "orderpos",
						"ColumnType": 1,
						"MaxLength": 100,
						"CreateIndex": false,
						"TryIdentifyPattern": false,
						"SingleValueEntityName": null,
						"SemanticType": 0,
						"SignificantCharacters": null,
						"DefaultValue": "",
						"CreateFulltextIndex": false
					}
				]
			},
			{
				"TableName": "EXTENDED_VENDOR_SETTINGS",
				"Description": "extendet vendor settings",
				"Columns": [
					{
						"ColumnName": "COMPANY_NUM",
						"Description": "Companynumber",
						"ColumnType": 1,
						"MaxLength": 100,
						"CreateIndex": false,
						"TryIdentifyPattern": false,
						"SingleValueEntityName": null,
						"SemanticType": 0,
						"SignificantCharacters": null,
						"DefaultValue": "",
						"CreateFulltextIndex": false
					},
					{
						"ColumnName": "VENDOR_NUM",
						"Description": "Vendornumber",
						"ColumnType": 1,
						"MaxLength": 100,
						"CreateIndex": false,
						"TryIdentifyPattern": false,
						"SingleValueEntityName": null,
						"SemanticType": 0,
						"SignificantCharacters": null,
						"DefaultValue": "",
						"CreateFulltextIndex": false
					},
					{
						"ColumnName": "AutoRoutingFlag",
						"Description": "AutoRoutingFlag",
						"ColumnType": 1,
						"MaxLength": 100,
						"CreateIndex": false,
						"TryIdentifyPattern": false,
						"SingleValueEntityName": null,
						"SemanticType": 0,
						"SignificantCharacters": null,
						"DefaultValue": "",
						"CreateFulltextIndex": false
					}
				]
			},
			{
				"TableName": "CC_RULES",
				"Description": "CC_RULES",
				"Columns": [
					{
						"ColumnName": "ID",
						"Description": "ID",
						"ColumnType": 0,
						"MaxLength": 100,
						"CreateIndex": false,
						"TryIdentifyPattern": false,
						"SingleValueEntityName": null,
						"SemanticType": 0,
						"SignificantCharacters": null,
						"DefaultValue": "",
						"CreateFulltextIndex": false
					},
					{
						"ColumnName": "EXPORTVALUE",
						"Description": "EXPORTVALUE",
						"ColumnType": 1,
						"MaxLength": 100,
						"CreateIndex": false,
						"TryIdentifyPattern": false,
						"SingleValueEntityName": null,
						"SemanticType": 0,
						"SignificantCharacters": null,
						"DefaultValue": "",
						"CreateFulltextIndex": false
					},
					{
						"ColumnName": "BOOST",
						"Description": "BOOST",
						"ColumnType": 0,
						"MaxLength": 100,
						"CreateIndex": false,
						"TryIdentifyPattern": false,
						"SingleValueEntityName": null,
						"SemanticType": 0,
						"SignificantCharacters": null,
						"DefaultValue": "",
						"CreateFulltextIndex": false
					},
					{
						"ColumnName": "RULEEXPRESSION",
						"Description": "RULEEXPRESSION",
						"ColumnType": 1,
						"MaxLength": 100,
						"CreateIndex": false,
						"TryIdentifyPattern": false,
						"SingleValueEntityName": null,
						"SemanticType": 0,
						"SignificantCharacters": null,
						"DefaultValue": "",
						"CreateFulltextIndex": false
					},
					{
						"ColumnName": "RULESCHEMA",
						"Description": "RULESCHEMA",
						"ColumnType": 1,
						"MaxLength": 15,
						"CreateIndex": true,
						"TryIdentifyPattern": false,
						"SingleValueEntityName": null,
						"SemanticType": 0,
						"SignificantCharacters": null,
						"DefaultValue": "",
						"CreateFulltextIndex": false
					},
					{
						"ColumnName": "CREATEDBY",
						"Description": "CREATEDBY",
						"ColumnType": 1,
						"MaxLength": 100,
						"CreateIndex": false,
						"TryIdentifyPattern": false,
						"SingleValueEntityName": null,
						"SemanticType": 0,
						"SignificantCharacters": null,
						"DefaultValue": "",
						"CreateFulltextIndex": false
					},
					{
						"ColumnName": "CREATEDATE",
						"Description": "CREATEDATE",
						"ColumnType": 1,
						"MaxLength": 100,
						"CreateIndex": false,
						"TryIdentifyPattern": false,
						"SingleValueEntityName": null,
						"SemanticType": 0,
						"SignificantCharacters": null,
						"DefaultValue": "",
						"CreateFulltextIndex": false
					},
					{
						"ColumnName": "UPDATEDBY",
						"Description": "UPDATEDBY",
						"ColumnType": 1,
						"MaxLength": 100,
						"CreateIndex": false,
						"TryIdentifyPattern": false,
						"SingleValueEntityName": null,
						"SemanticType": 0,
						"SignificantCharacters": null,
						"DefaultValue": "",
						"CreateFulltextIndex": false
					},
					{
						"ColumnName": "UPDATEDATE",
						"Description": "UPDATEDATE",
						"ColumnType": 1,
						"MaxLength": 100,
						"CreateIndex": true,
						"TryIdentifyPattern": false,
						"SingleValueEntityName": null,
						"SemanticType": 0,
						"SignificantCharacters": null,
						"DefaultValue": "",
						"CreateFulltextIndex": false
					},
					{
						"ColumnName": "DISABLED",
						"Description": "DISABLED",
						"ColumnType": 0,
						"MaxLength": 100,
						"CreateIndex": true,
						"TryIdentifyPattern": false,
						"SingleValueEntityName": null,
						"SemanticType": 0,
						"SignificantCharacters": null,
						"DefaultValue": "",
						"CreateFulltextIndex": false
					}
				]
			}
		],
		httpDataSources: [],
		appSettings: {
			"DocumentClassAttributeId": null,
			"DefaultLayout": "INV_Standard",
			"TenantDbConnectionString": null
		},
		dihAppName: "dih"
	};
	//#endregion
	//#region dist/scripts/gutschriftenVerschieben.js?raw
	var gutschriftenVerschieben_default = "//#region ../../helper/utils/logger.ts\nvar LogLevel = /* @__PURE__ */ function(LogLevel) {\n	LogLevel[LogLevel[\"DEBUG\"] = 0] = \"DEBUG\";\n	LogLevel[LogLevel[\"INFO\"] = 1] = \"INFO\";\n	LogLevel[LogLevel[\"WARN\"] = 2] = \"WARN\";\n	LogLevel[LogLevel[\"ERROR\"] = 3] = \"ERROR\";\n	return LogLevel;\n}({});\nvar Logger = class {\n	level;\n	showTimestamp;\n	constructor(options = {}) {\n		this.level = options.level ?? LogLevel.INFO;\n		this.showTimestamp = options.showTimestamp ?? true;\n	}\n	formatMessage(level, message) {\n		const paddedLevel = level.toUpperCase().padEnd(5, \" \");\n		return `${this.showTimestamp ? `[${(/* @__PURE__ */ new Date()).toISOString()}] ` : \"\"}${paddedLevel}: ${message}`;\n	}\n	debug(message, ...args) {\n		if (this.level <= LogLevel.DEBUG) console.debug(this.formatMessage(\"debug\", message), ...args);\n	}\n	info(message, ...args) {\n		if (this.level <= LogLevel.INFO) console.info(this.formatMessage(\"info\", message), ...args);\n	}\n	warn(message, ...args) {\n		if (this.level <= LogLevel.WARN) console.warn(this.formatMessage(\"warn\", message), ...args);\n	}\n	error(message, ...args) {\n		if (this.level <= LogLevel.ERROR) console.error(this.formatMessage(\"error\", message), ...args);\n	}\n	setLevel(newLevel) {\n		this.level = newLevel;\n	}\n};\nvar loggerInstance;\nfunction initLogger(level = LogLevel.INFO, showTimestamp = true) {\n	if (!loggerInstance) loggerInstance = new Logger({\n		level,\n		showTimestamp\n	});\n	return loggerInstance;\n}\nfunction getLogger() {\n	if (!loggerInstance) loggerInstance = new Logger({\n		level: LogLevel.DEBUG,\n		showTimestamp: true\n	});\n	return loggerInstance;\n}\n//#endregion\n//#region ../../helper/performHttpRequest/performHttpRequest.ts\n/**\n* Performs an HTTP request and returns a structured response.\n*\n* @template T - The expected type of the response body.\n* @param {string} url - The URL to which the request is sent.\n* @param {RequestInit} options - The options for the HTTP request, such as method, headers, and body.\n* @returns {Promise<ApiResponse<T>>} A promise that resolves to an `ApiResponse` object containing the response details.\n* @throws {Error} Throws an error if the HTTP response status is not OK (status code outside the range 200-299).\n*\n* The function attempts to parse the response body based on the `Content-Type` header:\n* - If the `Content-Type` includes \"application/json\", it parses the body as JSON.\n* - Otherwise, it parses the body as plain text.\n*\n* If the response is not OK, the function throws an error with the status code and error message.\n*/\nvar logger$1 = getLogger();\nasync function performHttpRequest(url, options) {\n	let body = {};\n	let errorMessage = \"\";\n	let response;\n	logger$1.debug(`[Request] ${options.method} ${url} | Headers: ${JSON.stringify(options.headers)} | Body: ${!(options.body instanceof Uint8Array) && options.body !== void 0 ? options.body : \"[Binary body omitted]\"}`);\n	try {\n		response = await fetch(url, options);\n	} catch (err) {\n		throw new Error(`Network error during fetch: ${err.message}`);\n	}\n	const contentType = response.headers.get(\"content-type\") || \"\";\n	const parseBody = async () => {\n		try {\n			if (contentType.includes(\"application/json\") || contentType.includes(\"application/hal+json\")) return await response.json();\n			else if (contentType.includes(\"application/octet-stream\") || contentType.includes(\"application/pdf\")) {\n				const arrayBuffer = await response.arrayBuffer();\n				return new Uint8Array(arrayBuffer);\n			} else return await response.text();\n		} catch (e) {\n			return;\n		}\n	};\n	if (response.ok) {\n		const result = await parseBody();\n		if (result !== void 0) body = result;\n	} else {\n		const errorBody = await parseBody();\n		errorMessage = typeof errorBody === \"string\" ? errorBody : JSON.stringify(errorBody);\n		throw new Error(`HTTP error! status: ${response.status}, message: ${errorMessage}`);\n	}\n	return {\n		status: response.status,\n		statusText: response.statusText,\n		body,\n		bodyUsed: response.bodyUsed,\n		headers: response.headers,\n		ok: response.ok,\n		redirected: response.redirected,\n		type: response.type,\n		url: response.url\n	};\n}\n//#endregion\n//#region ../../helper/dms/getRepositories.ts\nasync function getRepositories(baseUri, token) {\n	return await performHttpRequest(`${baseUri}/dms/r`, {\n		method: \"GET\",\n		headers: {\n			\"Authorization\": `Bearer ${token}`,\n			\"Accept\": \"application/json\",\n			\"Content-Type\": \"application/json\"\n		}\n	});\n}\n//#endregion\n//#region ../../helper/dms/getSpecificDocument.ts\n/**\n* Retrieves a specific document from the DMS (Document Management System) using the provided parameters.\n*\n* @param baseUri - The base URI of the DMS API.\n* @param token - The authorization token to access the DMS API.\n* @param repositoryId - The ID of the repository where the document is stored.\n* @param documentId - The ID of the specific document to retrieve.\n* @returns A promise that resolves to an `ApiResponse` containing the `GetSpecificDocument` data.\n*\n* @throws Will throw an error if the HTTP request fails or the response is invalid.\n*/\nasync function getSpecificDocument(baseUri, token, repositoryId, documentId) {\n	return await performHttpRequest(`${baseUri}/dms/r/${repositoryId}/o2/${documentId}`, {\n		method: \"GET\",\n		headers: {\n			\"Authorization\": `Bearer ${token}`,\n			\"Accept\": \"application/json\",\n			\"Content-Type\": \"application/json\"\n		}\n	});\n}\n//#endregion\n//#region ../../helper/dms/getSpecificDocumentWithDefaultSource.ts\n/**\n* Retrieves a specific document from the DMS (Document Management System) using the default source.\n*\n* @param baseUri - The base URI of the DMS API.\n* @param token - The authorization token to access the DMS API.\n* @param repositoryId - The ID of the repository where the document is stored.\n* @param documentId - The ID of the document to retrieve.\n* @returns A promise that resolves to an `ApiResponse` containing the document details.\n*\n* @template GetSpecificDocumentWithDefaultSource - The expected response type for the document details.\n*/\nasync function getSpecificDocumentWithDefaultSource(baseUri, token, repositoryId, documentId) {\n	return await performHttpRequest(`${baseUri}/dms/r/${repositoryId}/o2m/${documentId}?sourceid=/dms/r/${repositoryId}/source`, {\n		method: \"GET\",\n		headers: {\n			\"Authorization\": `Bearer ${token}`,\n			\"Accept\": \"application/json\",\n			\"Content-Type\": \"application/json\"\n		}\n	});\n}\n//#endregion\n//#region ../../helper/dms/getDocumentPropertyValue.ts\n/**\n* Liest den Wert einer DMS-Eigenschaft über ihre GUID (wie im Quell-Mapping\n* bzw. in updateDocument verwendet). /dms/r/<repo>/o2/<id> liefert die\n* Eigenschaften nur mit ihrer internen Nummer (z.B. \"91\") - deshalb zuerst\n* über die Standardquelle (/o2m/<id>?sourceid=…), deren Eigenschaften nach\n* GUID benannt sind; /o2 dient als Rückfall und für die Kategorie.\n*/\nasync function getDocumentPropertyValue(baseUri, token, repositoryId, documentId, propertyGuid) {\n	const debug = [];\n	let value = \"\";\n	try {\n		const withSource = (await getSpecificDocumentWithDefaultSource(baseUri, token, repositoryId, documentId)).body;\n		value = findValue(withSource, propertyGuid);\n		debug.push(`o2m: ${describe(withSource)}`);\n	} catch (error) {\n		debug.push(`o2m fehlgeschlagen: ${error}`);\n	}\n	const document = (await getSpecificDocument(baseUri, token, repositoryId, documentId)).body;\n	if (!value) {\n		value = findValue(document, propertyGuid);\n		debug.push(`o2: ${describe(document)}`);\n	}\n	return {\n		value,\n		category: document.category,\n		debug: debug.join(\" | \")\n	};\n}\nfunction findValue(source, guid) {\n	const key = guid.toLowerCase();\n	const matches = (p) => [\n		p?.key,\n		p?.id,\n		p?.uuid\n	].some((k) => typeof k === \"string\" && k.toLowerCase() === key);\n	const lists = [\n		source?.sourceProperties,\n		source?.objectProperties,\n		source?.multivalueProperties\n	];\n	for (const list of lists) {\n		const property = Array.isArray(list) ? list.find(matches) : void 0;\n		if (!property) continue;\n		const raw = property.value ?? property.displayValue ?? (Array.isArray(property.values) ? property.values[0]?.value ?? property.values[0] : property.values && typeof property.values === \"object\" ? Object.values(property.values)[0] : void 0);\n		const text = raw === void 0 || raw === null ? \"\" : String(raw).trim();\n		if (text) return text;\n	}\n	return \"\";\n}\nfunction describe(source) {\n	const lists = [\n		\"sourceProperties\",\n		\"objectProperties\",\n		\"multivalueProperties\"\n	].filter((name) => Array.isArray(source?.[name])).map((name) => `${name}[${source[name].length}] ${source[name].slice(0, 40).map((p) => `${p.name ?? \"\"}(${p.key ?? p.uuid ?? p.id})=${JSON.stringify(p.value ?? p.values ?? \"\")}`).join(\", \")}`);\n	return lists.length ? lists.join(\"; \") : `Felder: ${Object.keys(source ?? {}).join(\", \")}`;\n}\n//#endregion\n//#region ../../helper/dms/updateDocument.ts\nasync function updateDocument(baseUri, token, repositoryId, documentId, sourceCategory, sourceProperties) {\n	const url = `${baseUri}/dms/r/${repositoryId}/o2m/${documentId}`;\n	const headers = {\n		Authorization: `Bearer ${token}`,\n		Accept: \"application/json\",\n		\"Content-Type\": \"application/json\"\n	};\n	const body = {\n		sourceCategory,\n		sourceId: `/dms/r/${repositoryId}/source`,\n		sourceProperties\n	};\n	return await performHttpRequest(url, {\n		method: \"PUT\",\n		headers,\n		body: JSON.stringify(body)\n	});\n}\n//#endregion\n//#region src/scripts/gutschriftenVerschieben.ts\n/**\n* \"Rechnungsleser: Gutschriften verschieben\" (ehemals\n* projects/_OLD/moveDocumentsOfDocumentReader/script.mjs, bisher nur per\n* DMS-Webhook aufgerufen): prüft beim Dokument mit der übergebenen DocId die\n* Dokumentart des Rechnungslesers und\n*  - verschiebt Gutschriften (\"3\", \"Gutschrift\", \"CreditAdvice\" oder der Wert\n*    aus fieldDocumentTypeValueMatch) in die Kategorie categoryCreditMemoGUID\n*    und setzt die Dokumentart auf \"Gutschrift\",\n*  - setzt bei Rechnungen (\"2\", \"Rechnung\", \"Invoice\", \"CorrectionOfInvoice\")\n*    die Dokumentart auf \"Rechnung\" (Kategorie bleibt),\n*  - lässt leere/unbekannte Werte unverändert (protokolliert die Eigenschaften\n*    des Dokuments zur Diagnose).\n*\n* Wird vom Onboarding-Formular (src/forms/form.ts) als Process-Studio-Aktion\n* mit dem Eingabeparameter \"docId\" (wie im BPMN \"Rechnungsleser Gutschriften\n* verschieben\" verwendet) angelegt; der Code wird beim Build als\n* Text ins Formular-Bundle übernommen (\"?raw\"-Import in src/forms/form.ts).\n* Aus Kompatibilität wird auch der Body eines DMS-Webhooks ({ doc: { id } })\n* verstanden.\n*\n* customerVariables (werden vom Formular nur beim Neuanlegen gesetzt):\n* apiKey, categoryCreditMemoGUID, fieldDocumentTypeGUID,\n* fieldDocumentTypeValueMatch.\n*/\nvar logger = initLogger(LogLevel.INFO);\n/** Name des Eingabeparameters der Aktion. */\nvar DOC_ID_INPUT = \"docId\";\nmodule.exports = async (req, res) => {\n	try {\n		const body = parseBody(req);\n		const documentId = body?.[DOC_ID_INPUT] ?? body?.DocId ?? body?.doc?.id;\n		if (!documentId) {\n			respond(res, 400, {\n				success: false,\n				message: `Eingabeparameter \"${DOC_ID_INPUT}\" fehlt.`\n			});\n			return;\n		}\n		const baseUri = req.get(\"x-dv-baseuri\");\n		const apiKey = req.var(\"apiKey\");\n		const categoryCreditMemo = req.var(\"categoryCreditMemoGUID\");\n		const fieldDocumentType = req.var(\"fieldDocumentTypeGUID\");\n		const valueMatch = req.var(\"fieldDocumentTypeValueMatch\");\n		const repositoryId = (await getRepositories(baseUri, apiKey)).body.repositories[0]?.id;\n		if (!repositoryId) throw new Error(\"Kein DMS-Repository gefunden.\");\n		let document = await getDocumentPropertyValue(baseUri, apiKey, repositoryId, documentId, fieldDocumentType);\n		let documentType = document.value;\n		if (!documentType) {\n			await new Promise((resolve) => setTimeout(resolve, RELOAD_DELAY_MS));\n			document = await getDocumentPropertyValue(baseUri, apiKey, repositoryId, documentId, fieldDocumentType);\n			documentType = document.value;\n		}\n		const kind = classify(documentType, valueMatch);\n		if (!kind) {\n			const message = `Dokument ${documentId}: Dokumentart \"${documentType}\" nicht erkannt (Feld ${fieldDocumentType}) - unverändert.`;\n			logger.warn(`${message} Gelesen: ${document.debug.slice(0, 4e3)}`);\n			respond(res, 200, {\n				success: true,\n				changed: false,\n				creditMemo: false,\n				message\n			});\n			return;\n		}\n		const isCreditMemo = kind === \"creditMemo\";\n		const targetCategory = isCreditMemo ? categoryCreditMemo : document.category;\n		if (!targetCategory) throw new Error(`Kategorie von Dokument ${documentId} konnte nicht ermittelt werden.`);\n		await updateDocument(baseUri, apiKey, repositoryId, documentId, targetCategory, { properties: [{\n			key: fieldDocumentType,\n			values: [isCreditMemo ? \"Gutschrift\" : \"Rechnung\"]\n		}] });\n		const message = isCreditMemo ? `Dokument ${documentId} (Dokumentart \"${documentType}\") als Gutschrift in Kategorie ${categoryCreditMemo} verschoben.` : `Dokument ${documentId} (Dokumentart \"${documentType}\") als Rechnung gekennzeichnet.`;\n		logger.info(message);\n		respond(res, 200, {\n			success: true,\n			changed: true,\n			creditMemo: isCreditMemo,\n			message\n		});\n	} catch (error) {\n		const message = error instanceof Error ? error.message : String(error);\n		logger.error(`Fehler: ${message}`);\n		respond(res, 500, {\n			success: false,\n			message\n		});\n	}\n};\nvar RELOAD_DELAY_MS = 3e3;\nvar CREDIT_MEMO_VALUES = [\n	\"3\",\n	\"gutschrift\",\n	\"creditadvice\"\n];\nvar INVOICE_VALUES = [\n	\"2\",\n	\"rechnung\",\n	\"invoice\",\n	\"correctionofinvoice\"\n];\nfunction classify(value, valueMatch) {\n	const normalized = value.trim().toLowerCase();\n	if (!normalized) return void 0;\n	if (CREDIT_MEMO_VALUES.includes(normalized) || valueMatch && normalized === valueMatch.trim().toLowerCase()) return \"creditMemo\";\n	return INVOICE_VALUES.includes(normalized) ? \"invoice\" : void 0;\n}\nfunction parseBody(req) {\n	try {\n		return req.json?.() ?? {};\n	} catch {\n		return {};\n	}\n}\nfunction respond(res, status, body) {\n	res.status(status).set(\"Content-Type\", \"application/json\").send(JSON.stringify(body));\n}\n//#endregion\n\n//# sourceMappingURL=gutschriftenVerschieben.js.map";
	//#endregion
	//#region dist/scripts/preExport.js?raw
	var preExport_default = "//#region ../../helper/utils/logger.ts\nvar LogLevel = /* @__PURE__ */ function(LogLevel) {\n	LogLevel[LogLevel[\"DEBUG\"] = 0] = \"DEBUG\";\n	LogLevel[LogLevel[\"INFO\"] = 1] = \"INFO\";\n	LogLevel[LogLevel[\"WARN\"] = 2] = \"WARN\";\n	LogLevel[LogLevel[\"ERROR\"] = 3] = \"ERROR\";\n	return LogLevel;\n}({});\nvar Logger = class {\n	level;\n	showTimestamp;\n	constructor(options = {}) {\n		this.level = options.level ?? LogLevel.INFO;\n		this.showTimestamp = options.showTimestamp ?? true;\n	}\n	formatMessage(level, message) {\n		const paddedLevel = level.toUpperCase().padEnd(5, \" \");\n		return `${this.showTimestamp ? `[${(/* @__PURE__ */ new Date()).toISOString()}] ` : \"\"}${paddedLevel}: ${message}`;\n	}\n	debug(message, ...args) {\n		if (this.level <= LogLevel.DEBUG) console.debug(this.formatMessage(\"debug\", message), ...args);\n	}\n	info(message, ...args) {\n		if (this.level <= LogLevel.INFO) console.info(this.formatMessage(\"info\", message), ...args);\n	}\n	warn(message, ...args) {\n		if (this.level <= LogLevel.WARN) console.warn(this.formatMessage(\"warn\", message), ...args);\n	}\n	error(message, ...args) {\n		if (this.level <= LogLevel.ERROR) console.error(this.formatMessage(\"error\", message), ...args);\n	}\n	setLevel(newLevel) {\n		this.level = newLevel;\n	}\n};\nvar loggerInstance;\nfunction initLogger(level = LogLevel.INFO, showTimestamp = true) {\n	if (!loggerInstance) loggerInstance = new Logger({\n		level,\n		showTimestamp\n	});\n	return loggerInstance;\n}\n//#endregion\n//#region src/scripts/preExport.ts\n/**\n* \"Rechnungsleser: PreExport\": wird vom Rechnungsleser vor dem Export\n* aufgerufen (Extension Point \"IR_Business_BeforeExportHook\", Typ\n* ScriptingApp, Profil \"PreExportScript\" - hinterlegt vom Onboarding-Formular).\n* Bekommt die Attribute des Dokuments als JSON und liefert sie verändert\n* zurück:\n*  - DocumentType wird zum ERP-Code: CreditAdvice -> \"3\", alles andere\n*    (Invoice, CorrectionOfInvoice, unbekannt) -> \"2\".\n*    Alle übrigen Attribute bleiben unverändert.\n*\n* Wird der Hook erneut mit einem bereits umgesetzten Dokument aufgerufen\n* (DocumentType ist dann schon \"2\"/\"3\"), greift der Standardfall - der Code\n* bleibt \"2\" bzw. wird aus \"3\" zu \"2\"; daher \"3\" ausdrücklich beibehalten.\n*/\nvar logger = initLogger(LogLevel.INFO);\nvar DOCUMENT_TYPE_FIELD = \"DocumentType\";\nvar MAPPING = {\n	Invoice: \"2\",\n	CreditAdvice: \"3\",\n	CorrectionOfInvoice: \"2\"\n};\nvar KNOWN_CODES = /* @__PURE__ */ new Set([\"2\", \"3\"]);\nmodule.exports = async (req, res) => {\n	try {\n		const body = parseBody(req);\n		const documentType = String(body[DOCUMENT_TYPE_FIELD] ?? \"\");\n		const mapped = MAPPING[documentType];\n		if (mapped) body[DOCUMENT_TYPE_FIELD] = mapped;\n		else if (!KNOWN_CODES.has(documentType)) body[DOCUMENT_TYPE_FIELD] = \"2\";\n		logger.info(`DocumentType \"${documentType}\" -> \"${body[DOCUMENT_TYPE_FIELD]}\".`);\n		res.status(200).set(\"Content-Type\", \"application/json\").send(JSON.stringify(body));\n	} catch (error) {\n		const message = error instanceof Error ? error.message : String(error);\n		logger.error(`Fehler: ${message}`);\n		res.status(500).set(\"Content-Type\", \"application/json\").send(JSON.stringify({ error: message }));\n	}\n};\nfunction parseBody(req) {\n	try {\n		const body = req.json?.();\n		return body && typeof body === \"object\" ? body : {};\n	} catch {\n		return {};\n	}\n}\n//#endregion\n\n//# sourceMappingURL=preExport.js.map";
	//#endregion
	//#region dist/scripts/duplicateDetection.js?raw
	var duplicateDetection_default = "//#region ../../helper/utils/logger.ts\nvar LogLevel = /* @__PURE__ */ function(LogLevel) {\n	LogLevel[LogLevel[\"DEBUG\"] = 0] = \"DEBUG\";\n	LogLevel[LogLevel[\"INFO\"] = 1] = \"INFO\";\n	LogLevel[LogLevel[\"WARN\"] = 2] = \"WARN\";\n	LogLevel[LogLevel[\"ERROR\"] = 3] = \"ERROR\";\n	return LogLevel;\n}({});\nvar Logger = class {\n	level;\n	showTimestamp;\n	constructor(options = {}) {\n		this.level = options.level ?? LogLevel.INFO;\n		this.showTimestamp = options.showTimestamp ?? true;\n	}\n	formatMessage(level, message) {\n		const paddedLevel = level.toUpperCase().padEnd(5, \" \");\n		return `${this.showTimestamp ? `[${(/* @__PURE__ */ new Date()).toISOString()}] ` : \"\"}${paddedLevel}: ${message}`;\n	}\n	debug(message, ...args) {\n		if (this.level <= LogLevel.DEBUG) console.debug(this.formatMessage(\"debug\", message), ...args);\n	}\n	info(message, ...args) {\n		if (this.level <= LogLevel.INFO) console.info(this.formatMessage(\"info\", message), ...args);\n	}\n	warn(message, ...args) {\n		if (this.level <= LogLevel.WARN) console.warn(this.formatMessage(\"warn\", message), ...args);\n	}\n	error(message, ...args) {\n		if (this.level <= LogLevel.ERROR) console.error(this.formatMessage(\"error\", message), ...args);\n	}\n	setLevel(newLevel) {\n		this.level = newLevel;\n	}\n};\nvar loggerInstance;\nfunction initLogger(level = LogLevel.INFO, showTimestamp = true) {\n	if (!loggerInstance) loggerInstance = new Logger({\n		level,\n		showTimestamp\n	});\n	return loggerInstance;\n}\nfunction getLogger() {\n	if (!loggerInstance) loggerInstance = new Logger({\n		level: LogLevel.DEBUG,\n		showTimestamp: true\n	});\n	return loggerInstance;\n}\n//#endregion\n//#region ../../helper/performHttpRequest/performHttpRequest.ts\n/**\n* Performs an HTTP request and returns a structured response.\n*\n* @template T - The expected type of the response body.\n* @param {string} url - The URL to which the request is sent.\n* @param {RequestInit} options - The options for the HTTP request, such as method, headers, and body.\n* @returns {Promise<ApiResponse<T>>} A promise that resolves to an `ApiResponse` object containing the response details.\n* @throws {Error} Throws an error if the HTTP response status is not OK (status code outside the range 200-299).\n*\n* The function attempts to parse the response body based on the `Content-Type` header:\n* - If the `Content-Type` includes \"application/json\", it parses the body as JSON.\n* - Otherwise, it parses the body as plain text.\n*\n* If the response is not OK, the function throws an error with the status code and error message.\n*/\nvar logger$1 = getLogger();\nasync function performHttpRequest(url, options) {\n	let body = {};\n	let errorMessage = \"\";\n	let response;\n	logger$1.debug(`[Request] ${options.method} ${url} | Headers: ${JSON.stringify(options.headers)} | Body: ${!(options.body instanceof Uint8Array) && options.body !== void 0 ? options.body : \"[Binary body omitted]\"}`);\n	try {\n		response = await fetch(url, options);\n	} catch (err) {\n		throw new Error(`Network error during fetch: ${err.message}`);\n	}\n	const contentType = response.headers.get(\"content-type\") || \"\";\n	const parseBody = async () => {\n		try {\n			if (contentType.includes(\"application/json\") || contentType.includes(\"application/hal+json\")) return await response.json();\n			else if (contentType.includes(\"application/octet-stream\") || contentType.includes(\"application/pdf\")) {\n				const arrayBuffer = await response.arrayBuffer();\n				return new Uint8Array(arrayBuffer);\n			} else return await response.text();\n		} catch (e) {\n			return;\n		}\n	};\n	if (response.ok) {\n		const result = await parseBody();\n		if (result !== void 0) body = result;\n	} else {\n		const errorBody = await parseBody();\n		errorMessage = typeof errorBody === \"string\" ? errorBody : JSON.stringify(errorBody);\n		throw new Error(`HTTP error! status: ${response.status}, message: ${errorMessage}`);\n	}\n	return {\n		status: response.status,\n		statusText: response.statusText,\n		body,\n		bodyUsed: response.bodyUsed,\n		headers: response.headers,\n		ok: response.ok,\n		redirected: response.redirected,\n		type: response.type,\n		url: response.url\n	};\n}\n//#endregion\n//#region ../../helper/webindexlayouter/executeSqlQuery.ts\n/**\n* Führt eine SQL-Abfrage auf der Datenbank einer App aus - wie der\n* Webindex-Designer (z.B. für eigene Dublettenprüfungen):\n* POST /webindexlayouter/api/v1/apps/<app>/sqlResult\n* mit { connectionString: null, sqlQuery }.\n* connectionString null = Standard-Datenbank der App (z.B. die Protokoll-\n* Tabellen CCLogDocuments/CCLogAttributes des Rechnungslesers).\n*\n* @param token - API-Key; leer = Browser-Session.\n* @param app - App-Name, z.B. \"classcon-documentreader\".\n*/\nasync function executeSqlQuery(baseUri, token, app, sqlQuery, connectionString = null) {\n	return await performHttpRequest(`${baseUri}/webindexlayouter/api/v1/apps/${encodeURIComponent(app)}/sqlResult`, {\n		method: \"POST\",\n		headers: {\n			...token ? { Authorization: `Bearer ${token}` } : {},\n			Accept: \"application/json\",\n			\"Content-Type\": \"application/json\"\n		},\n		body: JSON.stringify({\n			connectionString,\n			sqlQuery\n		})\n	});\n}\n//#endregion\n//#region src/scripts/duplicateDetection.ts\n/**\n* \"Rechnungsleser: Dublettenerkennung\": wird vom Rechnungsleser nach der\n* Extraktion aufgerufen (Extension Point \"IR_Business_PostExtractionScript\",\n* Typ ScriptingApp, Profil \"PostExtractionScript\" - hinterlegt vom\n* Onboarding-Formular). Bekommt die Attribute des Dokuments als JSON und\n* liefert sie zurück.\n*\n* Sucht im Protokoll des Rechnungslesers (CCLogDocuments/CCLogAttributes, per\n* SQL über den Webindex-Designer) nach Dokumenten mit derselben\n* Lieferantennummer (VENDOR_NUM) UND derselben Rechnungsnummer\n* (InvoiceNumber). Das aktuelle Dokument selbst (DocumentUID) zählt nicht.\n* Bei einer Dublette werden die Attribute IsDuplicate (true) und\n* DuplicateDocumentIds (Ids der früheren Dokumente) gesetzt - im Typ des\n* Attributs im Rechnungsleser (Text-Attribut: \"true\" bzw. kommagetrennte Ids).\n*\n* customerVariables (vom Onboarding-Formular nur beim Neuanlegen gesetzt):\n* apiKey (verschlüsselt). Die Mandanten-Adresse kommt aus dem Header\n* \"x-dv-baseuri\".\n*/\nvar logger = initLogger(LogLevel.INFO);\nvar APP = \"classcon-documentreader\";\nvar VENDOR_FIELD = \"VENDOR_NUM\";\nvar INVOICE_FIELD = \"InvoiceNumber\";\nvar DOCUMENT_ID_FIELD = \"DocumentUID\";\nvar DUPLICATE_FLAG_FIELD = \"IsDuplicate\";\nvar DUPLICATE_IDS_FIELD = \"DuplicateDocumentIds\";\nmodule.exports = async (req, res) => {\n	await dumpRequest(req);\n	const body = parseBody(req);\n	logger.info(`Eingang: ${JSON.stringify(body).slice(0, 4e3)}`);\n	try {\n		const vendorNum = attribute(body, VENDOR_FIELD);\n		const invoiceNumber = attribute(body, INVOICE_FIELD);\n		if (!vendorNum || !invoiceNumber) logger.info(`Keine Prüfung: ${VENDOR_FIELD} \"${vendorNum}\" / ${INVOICE_FIELD} \"${invoiceNumber}\" unvollständig.`);\n		else {\n			const duplicates = await findDuplicates(req.get(\"x-dv-baseuri\"), req.var(\"apiKey\"), vendorNum, invoiceNumber, attribute(body, DOCUMENT_ID_FIELD));\n			logger.info(`Lieferant \"${vendorNum}\", Rechnung \"${invoiceNumber}\": ${duplicates.length} Dublette(n) ${JSON.stringify(duplicates)}`);\n			if (duplicates.length > 0) {\n				setAttribute(body, DUPLICATE_FLAG_FIELD, true);\n				setAttribute(body, DUPLICATE_IDS_FIELD, duplicates.map((d) => d.documentId));\n			}\n		}\n	} catch (error) {\n		logger.error(`Dublettenprüfung fehlgeschlagen: ${error instanceof Error ? error.message : String(error)}`);\n	}\n	logger.info(`Antwort: ${JSON.stringify(body).slice(0, 4e3)}`);\n	res.status(200).set(\"Content-Type\", \"application/json\").send(JSON.stringify(body));\n};\nasync function findDuplicates(baseUri, apiKey, vendorNum, invoiceNumber, currentDocumentId) {\n	const sqlQuery = `\nSELECT\n  doc.DocumentId,\n  aV.Attribute_After AS VendorNum,\n  aI.Attribute_After AS InvoiceNumber\nFROM\n  CCLogDocuments AS doc\n  JOIN CCLogAttributes AS aV ON aV.DocumentID = doc.DocumentID\n    AND aV.Attribute_Name = '${VENDOR_FIELD}'\n    AND aV.Attribute_After = ${sqlString(vendorNum)}\n  JOIN CCLogAttributes AS aI ON aI.DocumentID = doc.DocumentID\n    AND aI.Attribute_Name = '${INVOICE_FIELD}'\n    AND aI.Attribute_After = ${sqlString(invoiceNumber)}${currentDocumentId ? `\nWHERE\n  doc.DocumentID <> ${sqlString(currentDocumentId)}` : \"\"}`;\n	logger.debug(`SQL Query: ${sqlQuery}`);\n	const result = (await executeSqlQuery(baseUri, apiKey, APP, sqlQuery)).body;\n	const headers = (result?.headers ?? []).map((h) => h.toLowerCase());\n	const column = (cells, name) => cells[headers.indexOf(name.toLowerCase())] ?? \"\";\n	return (result?.rows ?? []).map((row) => ({\n		documentId: column(row.cells ?? [], \"DocumentId\"),\n		vendorNum: column(row.cells ?? [], \"VendorNum\"),\n		invoiceNumber: column(row.cells ?? [], \"InvoiceNumber\")\n	}));\n}\nfunction sqlString(value) {\n	return `N'${value.replace(/'/g, \"''\")}'`;\n}\nfunction attribute(body, name) {\n	const key = name.toLowerCase();\n	for (const [field, value] of Object.entries(body)) if (field.toLowerCase() === key && value !== null && typeof value !== \"object\") return String(value).trim();\n	for (const value of Object.values(body)) {\n		if (!Array.isArray(value)) continue;\n		for (const entry of value) if (String(entry?.Name ?? entry?.AttributeName ?? entry?.Id ?? entry?.name ?? \"\").toLowerCase() === key) return String(entry?.Value ?? entry?.value ?? \"\").trim();\n	}\n	return \"\";\n}\nfunction setAttribute(body, name, value) {\n	body[name] = typeof body[name] === \"string\" ? Array.isArray(value) ? value.join(\", \") : String(value) : value;\n}\nfunction parseBody(req) {\n	try {\n		const body = req.json?.();\n		return body && typeof body === \"object\" ? body : {};\n	} catch {\n		return {};\n	}\n}\nasync function dumpRequest(req) {\n	const members = {};\n	for (let o = req; o && o !== Object.prototype; o = Object.getPrototypeOf(o)) for (const key of Object.getOwnPropertyNames(o)) if (!(key in members)) members[key] = typeof req[key];\n	logger.info(`req-Member: ${JSON.stringify(members)}`);\n	for (const [key, type] of Object.entries(members)) {\n		if (type === \"function\" || key === \"constructor\") continue;\n		try {\n			logger.info(`req.${key} = ${JSON.stringify(req[key]).slice(0, 4e3)}`);\n		} catch {\n			logger.info(`req.${key} = <nicht serialisierbar>`);\n		}\n	}\n	try {\n		logger.info(`req.text() = ${String(req.text?.()).slice(0, 4e3)}`);\n	} catch {}\n	for (const name of [\n		\"variables\",\n		\"data\",\n		\"systemBaseUri\",\n		\"currentUser\"\n	]) try {\n		const value = await Promise.resolve(req[name]());\n		logger.info(`req.${name}() = ${JSON.stringify(value)?.slice(0, 4e3)}`);\n	} catch (e) {\n		logger.info(`req.${name}() fehlgeschlagen: ${e instanceof Error ? e.message : String(e)}`);\n	}\n	try {\n		logger.info(`req.authSessionId() vorhanden: ${!!await Promise.resolve(req.authSessionId())}`);\n	} catch {}\n	for (const h of [\n		\"x-dv-baseuri\",\n		\"x-dv-tenant-id\",\n		\"x-dv-user-id\",\n		\"x-dv-sign\",\n		\"x-dv-request-id\",\n		\"x-dv-profile\",\n		\"x-dv-batch-id\",\n		\"x-dv-document-id\",\n		\"content-type\",\n		\"user-agent\",\n		\"accept-language\"\n	]) try {\n		const v = req.get(h);\n		if (v) logger.info(`header ${h} = ${v}`);\n	} catch {}\n}\n//#endregion\n\n//# sourceMappingURL=duplicateDetection.js.map";
	//#endregion
	//#region dist/scripts/dokumenttypAnpassen.js?raw
	var dokumenttypAnpassen_default = "//#region ../../helper/utils/logger.ts\nvar LogLevel = /* @__PURE__ */ function(LogLevel) {\n	LogLevel[LogLevel[\"DEBUG\"] = 0] = \"DEBUG\";\n	LogLevel[LogLevel[\"INFO\"] = 1] = \"INFO\";\n	LogLevel[LogLevel[\"WARN\"] = 2] = \"WARN\";\n	LogLevel[LogLevel[\"ERROR\"] = 3] = \"ERROR\";\n	return LogLevel;\n}({});\nvar Logger = class {\n	level;\n	showTimestamp;\n	constructor(options = {}) {\n		this.level = options.level ?? LogLevel.INFO;\n		this.showTimestamp = options.showTimestamp ?? true;\n	}\n	formatMessage(level, message) {\n		const paddedLevel = level.toUpperCase().padEnd(5, \" \");\n		return `${this.showTimestamp ? `[${(/* @__PURE__ */ new Date()).toISOString()}] ` : \"\"}${paddedLevel}: ${message}`;\n	}\n	debug(message, ...args) {\n		if (this.level <= LogLevel.DEBUG) console.debug(this.formatMessage(\"debug\", message), ...args);\n	}\n	info(message, ...args) {\n		if (this.level <= LogLevel.INFO) console.info(this.formatMessage(\"info\", message), ...args);\n	}\n	warn(message, ...args) {\n		if (this.level <= LogLevel.WARN) console.warn(this.formatMessage(\"warn\", message), ...args);\n	}\n	error(message, ...args) {\n		if (this.level <= LogLevel.ERROR) console.error(this.formatMessage(\"error\", message), ...args);\n	}\n	setLevel(newLevel) {\n		this.level = newLevel;\n	}\n};\nvar loggerInstance;\nfunction initLogger(level = LogLevel.INFO, showTimestamp = true) {\n	if (!loggerInstance) loggerInstance = new Logger({\n		level,\n		showTimestamp\n	});\n	return loggerInstance;\n}\nfunction getLogger() {\n	if (!loggerInstance) loggerInstance = new Logger({\n		level: LogLevel.DEBUG,\n		showTimestamp: true\n	});\n	return loggerInstance;\n}\n//#endregion\n//#region ../../helper/performHttpRequest/performHttpRequest.ts\n/**\n* Performs an HTTP request and returns a structured response.\n*\n* @template T - The expected type of the response body.\n* @param {string} url - The URL to which the request is sent.\n* @param {RequestInit} options - The options for the HTTP request, such as method, headers, and body.\n* @returns {Promise<ApiResponse<T>>} A promise that resolves to an `ApiResponse` object containing the response details.\n* @throws {Error} Throws an error if the HTTP response status is not OK (status code outside the range 200-299).\n*\n* The function attempts to parse the response body based on the `Content-Type` header:\n* - If the `Content-Type` includes \"application/json\", it parses the body as JSON.\n* - Otherwise, it parses the body as plain text.\n*\n* If the response is not OK, the function throws an error with the status code and error message.\n*/\nvar logger$1 = getLogger();\nasync function performHttpRequest(url, options) {\n	let body = {};\n	let errorMessage = \"\";\n	let response;\n	logger$1.debug(`[Request] ${options.method} ${url} | Headers: ${JSON.stringify(options.headers)} | Body: ${!(options.body instanceof Uint8Array) && options.body !== void 0 ? options.body : \"[Binary body omitted]\"}`);\n	try {\n		response = await fetch(url, options);\n	} catch (err) {\n		throw new Error(`Network error during fetch: ${err.message}`);\n	}\n	const contentType = response.headers.get(\"content-type\") || \"\";\n	const parseBody = async () => {\n		try {\n			if (contentType.includes(\"application/json\") || contentType.includes(\"application/hal+json\")) return await response.json();\n			else if (contentType.includes(\"application/octet-stream\") || contentType.includes(\"application/pdf\")) {\n				const arrayBuffer = await response.arrayBuffer();\n				return new Uint8Array(arrayBuffer);\n			} else return await response.text();\n		} catch (e) {\n			return;\n		}\n	};\n	if (response.ok) {\n		const result = await parseBody();\n		if (result !== void 0) body = result;\n	} else {\n		const errorBody = await parseBody();\n		errorMessage = typeof errorBody === \"string\" ? errorBody : JSON.stringify(errorBody);\n		throw new Error(`HTTP error! status: ${response.status}, message: ${errorMessage}`);\n	}\n	return {\n		status: response.status,\n		statusText: response.statusText,\n		body,\n		bodyUsed: response.bodyUsed,\n		headers: response.headers,\n		ok: response.ok,\n		redirected: response.redirected,\n		type: response.type,\n		url: response.url\n	};\n}\n//#endregion\n//#region ../../helper/dms/getRepositories.ts\nasync function getRepositories(baseUri, token) {\n	return await performHttpRequest(`${baseUri}/dms/r`, {\n		method: \"GET\",\n		headers: {\n			\"Authorization\": `Bearer ${token}`,\n			\"Accept\": \"application/json\",\n			\"Content-Type\": \"application/json\"\n		}\n	});\n}\n//#endregion\n//#region ../../helper/dms/getSpecificDocument.ts\n/**\n* Retrieves a specific document from the DMS (Document Management System) using the provided parameters.\n*\n* @param baseUri - The base URI of the DMS API.\n* @param token - The authorization token to access the DMS API.\n* @param repositoryId - The ID of the repository where the document is stored.\n* @param documentId - The ID of the specific document to retrieve.\n* @returns A promise that resolves to an `ApiResponse` containing the `GetSpecificDocument` data.\n*\n* @throws Will throw an error if the HTTP request fails or the response is invalid.\n*/\nasync function getSpecificDocument(baseUri, token, repositoryId, documentId) {\n	return await performHttpRequest(`${baseUri}/dms/r/${repositoryId}/o2/${documentId}`, {\n		method: \"GET\",\n		headers: {\n			\"Authorization\": `Bearer ${token}`,\n			\"Accept\": \"application/json\",\n			\"Content-Type\": \"application/json\"\n		}\n	});\n}\n//#endregion\n//#region ../../helper/dms/getSpecificDocumentWithDefaultSource.ts\n/**\n* Retrieves a specific document from the DMS (Document Management System) using the default source.\n*\n* @param baseUri - The base URI of the DMS API.\n* @param token - The authorization token to access the DMS API.\n* @param repositoryId - The ID of the repository where the document is stored.\n* @param documentId - The ID of the document to retrieve.\n* @returns A promise that resolves to an `ApiResponse` containing the document details.\n*\n* @template GetSpecificDocumentWithDefaultSource - The expected response type for the document details.\n*/\nasync function getSpecificDocumentWithDefaultSource(baseUri, token, repositoryId, documentId) {\n	return await performHttpRequest(`${baseUri}/dms/r/${repositoryId}/o2m/${documentId}?sourceid=/dms/r/${repositoryId}/source`, {\n		method: \"GET\",\n		headers: {\n			\"Authorization\": `Bearer ${token}`,\n			\"Accept\": \"application/json\",\n			\"Content-Type\": \"application/json\"\n		}\n	});\n}\n//#endregion\n//#region ../../helper/dms/getDocumentPropertyValue.ts\n/**\n* Liest den Wert einer DMS-Eigenschaft über ihre GUID (wie im Quell-Mapping\n* bzw. in updateDocument verwendet). /dms/r/<repo>/o2/<id> liefert die\n* Eigenschaften nur mit ihrer internen Nummer (z.B. \"91\") - deshalb zuerst\n* über die Standardquelle (/o2m/<id>?sourceid=…), deren Eigenschaften nach\n* GUID benannt sind; /o2 dient als Rückfall und für die Kategorie.\n*/\nasync function getDocumentPropertyValue(baseUri, token, repositoryId, documentId, propertyGuid) {\n	const debug = [];\n	let value = \"\";\n	try {\n		const withSource = (await getSpecificDocumentWithDefaultSource(baseUri, token, repositoryId, documentId)).body;\n		value = findValue(withSource, propertyGuid);\n		debug.push(`o2m: ${describe(withSource)}`);\n	} catch (error) {\n		debug.push(`o2m fehlgeschlagen: ${error}`);\n	}\n	const document = (await getSpecificDocument(baseUri, token, repositoryId, documentId)).body;\n	if (!value) {\n		value = findValue(document, propertyGuid);\n		debug.push(`o2: ${describe(document)}`);\n	}\n	return {\n		value,\n		category: document.category,\n		debug: debug.join(\" | \")\n	};\n}\nfunction findValue(source, guid) {\n	const key = guid.toLowerCase();\n	const matches = (p) => [\n		p?.key,\n		p?.id,\n		p?.uuid\n	].some((k) => typeof k === \"string\" && k.toLowerCase() === key);\n	const lists = [\n		source?.sourceProperties,\n		source?.objectProperties,\n		source?.multivalueProperties\n	];\n	for (const list of lists) {\n		const property = Array.isArray(list) ? list.find(matches) : void 0;\n		if (!property) continue;\n		const raw = property.value ?? property.displayValue ?? (Array.isArray(property.values) ? property.values[0]?.value ?? property.values[0] : property.values && typeof property.values === \"object\" ? Object.values(property.values)[0] : void 0);\n		const text = raw === void 0 || raw === null ? \"\" : String(raw).trim();\n		if (text) return text;\n	}\n	return \"\";\n}\nfunction describe(source) {\n	const lists = [\n		\"sourceProperties\",\n		\"objectProperties\",\n		\"multivalueProperties\"\n	].filter((name) => Array.isArray(source?.[name])).map((name) => `${name}[${source[name].length}] ${source[name].slice(0, 40).map((p) => `${p.name ?? \"\"}(${p.key ?? p.uuid ?? p.id})=${JSON.stringify(p.value ?? p.values ?? \"\")}`).join(\", \")}`);\n	return lists.length ? lists.join(\"; \") : `Felder: ${Object.keys(source ?? {}).join(\", \")}`;\n}\n//#endregion\n//#region ../../helper/dms/updateDocument.ts\nasync function updateDocument(baseUri, token, repositoryId, documentId, sourceCategory, sourceProperties) {\n	const url = `${baseUri}/dms/r/${repositoryId}/o2m/${documentId}`;\n	const headers = {\n		Authorization: `Bearer ${token}`,\n		Accept: \"application/json\",\n		\"Content-Type\": \"application/json\"\n	};\n	const body = {\n		sourceCategory,\n		sourceId: `/dms/r/${repositoryId}/source`,\n		sourceProperties\n	};\n	return await performHttpRequest(url, {\n		method: \"PUT\",\n		headers,\n		body: JSON.stringify(body)\n	});\n}\n//#endregion\n//#region src/scripts/dokumenttypAnpassen.ts\n/**\n* \"Rechnungsleser: Dokumenttyp anpassen\": der Rechnungsleser übergibt den\n* Dokumenttyp als ERP-Code (siehe src/scripts/preExport.ts: Rechnung 2,\n* Gutschrift 3) - im DMS-Feld fieldDocumentTypeGUID landet daher \"2\" bzw.\n* \"3\". Dieses Skript setzt beim Dokument mit der übergebenen DocId den\n* lesbaren Wert: \"2\" -> \"Rechnung\", \"3\" -> \"Gutschrift\". Andere Werte bleiben\n* unverändert, die Kategorie ebenfalls.\n*\n* Wird vom Onboarding-Formular (src/forms/form.ts) als Process-Studio-Aktion\n* mit dem Eingabeparameter \"docId\" angelegt; der Code wird beim Build als Text\n* ins Formular-Bundle übernommen (\"?raw\"-Import in src/forms/form.ts). Aus\n* Kompatibilität wird auch der Body eines DMS-Webhooks ({ doc: { id } })\n* verstanden.\n*\n* customerVariables (werden vom Formular nur beim Neuanlegen gesetzt):\n* apiKey, fieldDocumentTypeGUID.\n*/\nvar logger = initLogger(LogLevel.INFO);\n/** Name des Eingabeparameters der Aktion. */\nvar DOC_ID_INPUT = \"docId\";\n/** ERP-Code -> Dokumenttyp im DMS. */\nvar DOCUMENT_TYPES = {\n	\"2\": \"Rechnung\",\n	\"3\": \"Gutschrift\"\n};\nmodule.exports = async (req, res) => {\n	try {\n		const body = parseBody(req);\n		const documentId = body?.[DOC_ID_INPUT] ?? body?.DocId ?? body?.doc?.id;\n		if (!documentId) {\n			respond(res, 400, {\n				success: false,\n				message: `Eingabeparameter \"${DOC_ID_INPUT}\" fehlt.`\n			});\n			return;\n		}\n		const baseUri = req.get(\"x-dv-baseuri\");\n		const apiKey = req.var(\"apiKey\");\n		const fieldDocumentType = req.var(\"fieldDocumentTypeGUID\");\n		const repositoryId = (await getRepositories(baseUri, apiKey)).body.repositories[0]?.id;\n		if (!repositoryId) throw new Error(\"Kein DMS-Repository gefunden.\");\n		const document = await getDocumentPropertyValue(baseUri, apiKey, repositoryId, documentId, fieldDocumentType);\n		const current = document.value;\n		const target = DOCUMENT_TYPES[current];\n		if (!target) {\n			const message = `Dokument ${documentId}: Dokumenttyp \"${current}\" - keine Anpassung nötig.`;\n			logger.info(current ? message : `${message} Gelesen: ${document.debug.slice(0, 4e3)}`);\n			respond(res, 200, {\n				success: true,\n				changed: false,\n				documentType: current,\n				message\n			});\n			return;\n		}\n		if (!document.category) throw new Error(`Kategorie von Dokument ${documentId} konnte nicht ermittelt werden.`);\n		await updateDocument(baseUri, apiKey, repositoryId, documentId, document.category, { properties: [{\n			key: fieldDocumentType,\n			values: [target]\n		}] });\n		const message = `Dokument ${documentId}: Dokumenttyp \"${current}\" -> \"${target}\".`;\n		logger.info(message);\n		respond(res, 200, {\n			success: true,\n			changed: true,\n			documentType: target,\n			message\n		});\n	} catch (error) {\n		const message = error instanceof Error ? error.message : String(error);\n		logger.error(`Fehler: ${message}`);\n		respond(res, 500, {\n			success: false,\n			message\n		});\n	}\n};\nfunction parseBody(req) {\n	try {\n		return req.json?.() ?? {};\n	} catch {\n		return {};\n	}\n}\nfunction respond(res, status, body) {\n	res.status(status).set(\"Content-Type\", \"application/json\").send(JSON.stringify(body));\n}\n//#endregion\n\n//# sourceMappingURL=dokumenttypAnpassen.js.map";
	//#endregion
	//#region src/data/Rechnungsleser Gutschriften verschieben_v1.bpmn?raw
	var Rechnungsleser_Gutschriften_verschieben_v1_default = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\"?>\n<bpmn:definitions xmlns:bpmn=\"http://www.omg.org/spec/BPMN/20100524/MODEL\" xmlns:bpmndi=\"http://www.omg.org/spec/BPMN/20100524/DI\" xmlns:camunda=\"http://camunda.org/schema/1.0/bpmn\" xmlns:dc=\"http://www.omg.org/spec/DD/20100524/DC\" xmlns:di=\"http://www.omg.org/spec/DD/20100524/DI\" xmlns:modeler=\"http://camunda.org/schema/modeler/1.0\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" exporter=\"d.velop process modeler\" exporterVersion=\"1.1.0\" expressionLanguage=\"http://www.w3.org/1999/XPath\" id=\"definitions_p-77b509e1-e27b-4696-8ea7-b1eb3875692e\" modeler:executionPlatform=\"Camunda Platform\" modeler:executionPlatformVersion=\"7.15.0\" targetNamespace=\"http://bpmn.io/schema/bpmn\" typeLanguage=\"http://www.w3.org/2001/XMLSchema\">\n    \n  <bpmn:process id=\"p-77b509e1-e27b-4696-8ea7-b1eb3875692e\" isClosed=\"false\" isExecutable=\"true\" name=\"Rechnungsleser Ablage\" processType=\"None\">\n        \n    <bpmn:extensionElements>\n            \n      <camunda:properties>\n                \n        <camunda:property name=\"service:/process/services/actions:in:actionId\" value=\"String\"/>\n                \n        <camunda:property name=\"service:/process/services/actions:in:executingUser\" value=\"Identity\"/>\n                \n        <camunda:property name=\"service:/process/services/actions:in:actionPayload\" value=\"InternalObject\"/>\n                \n        <camunda:property name=\"service:/process/services/actions:out:status\" value=\"Number\"/>\n                \n        <camunda:property name=\"service:/process/services/actions:out:actionOutput\" value=\"InternalObject\"/>\n                \n        <camunda:property name=\"variable:docId*\" value=\"String!\"/>\n                \n        <camunda:property name=\"variable:documentType*\" value=\"String!\"/>\n              \n      </camunda:properties>\n          \n    </bpmn:extensionElements>\n        \n    <bpmn:startEvent id=\"StartEvent_1\" isInterrupting=\"true\" parallelMultiple=\"false\">\n            \n      <bpmn:extensionElements>\n                \n        <camunda:properties>\n                    \n          <camunda:property name=\"event:0\" value=\"eventbridge_dmspostimport\"/>\n                    \n          <camunda:property name=\"event:0:app\" value=\"eventbridge\"/>\n                    \n          <camunda:property name=\"event:0:name\" value=\"Ablage Gutschrift\"/>\n                    \n          <camunda:property name=\"start:action\" value=\"false\"/>\n                    \n          <camunda:property name=\"event:0:filter\" value=\"{&quot;and&quot;:[{&quot;==&quot;:[{&quot;var&quot;:&quot;doc.categoryId&quot;},&quot;fc3d3e6d-46f6-4fcd-84e3-db79e14b2751&quot;]}]}\"/>\n                    \n          <camunda:property name=\"event:0:input:docId\" value=\"${input.getValue(&quot;$['doc']['id']&quot;)}\"/>\n                    \n          <camunda:property name=\"event:0:input:process.instance.businessKey\" value=\"${input.getValue(&quot;$['doc']['id']&quot;)}\"/>\n                    \n          <camunda:property name=\"event:0:input:documentType\" value=\"${input.getValue(&quot;$['doc']['properties']['717f4480-f16c-4838-96a3-f69a01eb41f1']&quot;)}\"/>\n                  \n        </camunda:properties>\n              \n      </bpmn:extensionElements>\n            \n      <bpmn:outgoing>Flow_0abuizb</bpmn:outgoing>\n          \n    </bpmn:startEvent>\n        \n    <bpmn:endEvent id=\"Event_1fwwxqz\">\n            \n      <bpmn:incoming>Flow_1u7n32v</bpmn:incoming>\n          \n    </bpmn:endEvent>\n        \n    <bpmn:sequenceFlow id=\"Flow_0abuizb\" sourceRef=\"StartEvent_1\" targetRef=\"Gateway_16mvw8q\"/>\n        \n    <bpmn:subProcess completionQuantity=\"1\" id=\"Activity_1k6yh1s\" isForCompensation=\"false\" name=\"Gutschriften verschieben\" startQuantity=\"1\" triggeredByEvent=\"false\">\n            \n      <bpmn:documentation textFormat=\"text/plain\">#action</bpmn:documentation>\n            \n      <bpmn:incoming>Flow_08vwwlt</bpmn:incoming>\n            \n      <bpmn:outgoing>Flow_103dkkw</bpmn:outgoing>\n            \n      <bpmn:startEvent id=\"Activity_0qxarpb-StartEvent-0\" isInterrupting=\"true\" name=\"Gutschriften verschieben (Start)\" parallelMultiple=\"false\"/>\n            \n      <bpmn:sequenceFlow id=\"Activity_0qxarpb-SequenceFlow-0\" sourceRef=\"Activity_0qxarpb-StartEvent-0\" targetRef=\"Activity_0qxarpb-SendTask-0\"/>\n            \n      <bpmn:sendTask camunda:asyncBefore=\"true\" camunda:delegateExpression=\"${asyncService}\" completionQuantity=\"1\" id=\"Activity_0qxarpb-SendTask-0\" implementation=\"##WebService\" isForCompensation=\"false\" name=\"Gutschriften verschieben (Request)\" startQuantity=\"1\">\n                \n        <bpmn:extensionElements>\n                    \n          <camunda:inputOutput>\n                        \n            <camunda:inputParameter name=\"service.uri\">/process/services/actions</camunda:inputParameter>\n                        \n            <camunda:inputParameter name=\"actionId\">scripting_9d930749-7dee-4be1-bf6e-0275eeb74954-beba2cd5-81a2-4b56-b0f1-34d131922b25</camunda:inputParameter>\n                        \n            <camunda:inputParameter name=\"actionPayload[$.docId]\">${variables.get('docId')}</camunda:inputParameter>\n                      \n          </camunda:inputOutput>\n                  \n        </bpmn:extensionElements>\n              \n      </bpmn:sendTask>\n            \n      <bpmn:sequenceFlow id=\"Activity_0qxarpb-SequenceFlow-1\" sourceRef=\"Activity_0qxarpb-SendTask-0\" targetRef=\"Activity_0qxarpb-ReceiveTask-0\"/>\n            \n      <bpmn:receiveTask camunda:asyncAfter=\"true\" completionQuantity=\"1\" id=\"Activity_0qxarpb-ReceiveTask-0\" implementation=\"##WebService\" instantiate=\"false\" isForCompensation=\"false\" name=\"Gutschriften verschieben (Response)\" startQuantity=\"1\"/>\n            \n      <bpmn:sequenceFlow id=\"Activity_0qxarpb-SequenceFlow-2\" sourceRef=\"Activity_0qxarpb-ReceiveTask-0\" targetRef=\"Activity_0qxarpb-EndEvent-0\"/>\n            \n      <bpmn:endEvent id=\"Activity_0qxarpb-EndEvent-0\" name=\"Gutschriften verschieben (End)\"/>\n          \n    </bpmn:subProcess>\n        \n    <bpmn:exclusiveGateway default=\"Flow_1qkzf07\" gatewayDirection=\"Unspecified\" id=\"Gateway_16mvw8q\">\n            \n      <bpmn:incoming>Flow_0abuizb</bpmn:incoming>\n            \n      <bpmn:outgoing>Flow_08vwwlt</bpmn:outgoing>\n            \n      <bpmn:outgoing>Flow_1qkzf07</bpmn:outgoing>\n          \n    </bpmn:exclusiveGateway>\n        \n    <bpmn:sequenceFlow id=\"Flow_08vwwlt\" sourceRef=\"Gateway_16mvw8q\" targetRef=\"Activity_1k6yh1s\">\n            \n      <bpmn:conditionExpression xsi:type=\"bpmn:tFormalExpression\">#{variables.get('documentType') == '3'}</bpmn:conditionExpression>\n          \n    </bpmn:sequenceFlow>\n        \n    <bpmn:sequenceFlow id=\"Flow_1u7n32v\" sourceRef=\"Activity_1sy5d4a\" targetRef=\"Event_1fwwxqz\"/>\n        \n    <bpmn:subProcess completionQuantity=\"1\" id=\"Activity_1sy5d4a\" isForCompensation=\"false\" name=\"Dokumenttyp anpassen\" startQuantity=\"1\" triggeredByEvent=\"false\">\n            \n      <bpmn:documentation textFormat=\"text/plain\">#action</bpmn:documentation>\n            \n      <bpmn:incoming>Flow_1qkzf07</bpmn:incoming>\n            \n      <bpmn:incoming>Flow_103dkkw</bpmn:incoming>\n            \n      <bpmn:outgoing>Flow_1u7n32v</bpmn:outgoing>\n            \n      <bpmn:startEvent id=\"Activity_1k6uaoo-StartEvent-0\" isInterrupting=\"true\" name=\"Dokumenttyp anpassen (Start)\" parallelMultiple=\"false\"/>\n            \n      <bpmn:sequenceFlow id=\"Activity_1k6uaoo-SequenceFlow-0\" sourceRef=\"Activity_1k6uaoo-StartEvent-0\" targetRef=\"Activity_1k6uaoo-SendTask-0\"/>\n            \n      <bpmn:sendTask camunda:asyncBefore=\"true\" camunda:delegateExpression=\"${asyncService}\" completionQuantity=\"1\" id=\"Activity_1k6uaoo-SendTask-0\" implementation=\"##WebService\" isForCompensation=\"false\" name=\"Dokumenttyp anpassen (Request)\" startQuantity=\"1\">\n                \n        <bpmn:extensionElements>\n                    \n          <camunda:inputOutput>\n                        \n            <camunda:inputParameter name=\"service.uri\">/process/services/actions</camunda:inputParameter>\n                        \n            <camunda:inputParameter name=\"actionId\">scripting_881742d0-9cb3-4101-9358-e323f294f01d-9a187c06-a581-4888-aa16-6eacfee8eceb</camunda:inputParameter>\n                        \n            <camunda:inputParameter name=\"actionPayload[$.docId]\">${variables.get('docId')}</camunda:inputParameter>\n                      \n          </camunda:inputOutput>\n                  \n        </bpmn:extensionElements>\n              \n      </bpmn:sendTask>\n            \n      <bpmn:sequenceFlow id=\"Activity_1k6uaoo-SequenceFlow-1\" sourceRef=\"Activity_1k6uaoo-SendTask-0\" targetRef=\"Activity_1k6uaoo-ReceiveTask-0\"/>\n            \n      <bpmn:receiveTask camunda:asyncAfter=\"true\" completionQuantity=\"1\" id=\"Activity_1k6uaoo-ReceiveTask-0\" implementation=\"##WebService\" instantiate=\"false\" isForCompensation=\"false\" name=\"Dokumenttyp anpassen (Response)\" startQuantity=\"1\"/>\n            \n      <bpmn:sequenceFlow id=\"Activity_1k6uaoo-SequenceFlow-2\" sourceRef=\"Activity_1k6uaoo-ReceiveTask-0\" targetRef=\"Activity_1k6uaoo-EndEvent-0\"/>\n            \n      <bpmn:endEvent id=\"Activity_1k6uaoo-EndEvent-0\" name=\"Dokumenttyp anpassen (End)\"/>\n          \n    </bpmn:subProcess>\n        \n    <bpmn:sequenceFlow id=\"Flow_1qkzf07\" sourceRef=\"Gateway_16mvw8q\" targetRef=\"Activity_1sy5d4a\"/>\n        \n    <bpmn:sequenceFlow id=\"Flow_103dkkw\" sourceRef=\"Activity_1k6yh1s\" targetRef=\"Activity_1sy5d4a\"/>\n      \n  </bpmn:process>\n    \n  <bpmndi:BPMNDiagram id=\"BPMNDiagram_1\">\n        \n    <bpmndi:BPMNPlane bpmnElement=\"p-77b509e1-e27b-4696-8ea7-b1eb3875692e\" id=\"BPMNPlane_1\">\n            \n      <bpmndi:BPMNShape bpmnElement=\"StartEvent_1\" id=\"_BPMNShape_StartEvent_2\">\n                \n        <dc:Bounds height=\"36\" width=\"36\" x=\"112\" y=\"100\"/>\n              \n      </bpmndi:BPMNShape>\n            \n      <bpmndi:BPMNShape bpmnElement=\"Event_1fwwxqz\" id=\"Event_1fwwxqz_di\">\n                \n        <dc:Bounds height=\"36\" width=\"36\" x=\"572\" y=\"100\"/>\n              \n      </bpmndi:BPMNShape>\n            \n      <bpmndi:BPMNShape bpmnElement=\"Activity_1k6yh1s\" id=\"Activity_0qxarpb_di\">\n                \n        <dc:Bounds height=\"80\" width=\"100\" x=\"260\" y=\"-20\"/>\n                \n        <bpmndi:BPMNLabel/>\n              \n      </bpmndi:BPMNShape>\n            \n      <bpmndi:BPMNShape bpmnElement=\"Gateway_16mvw8q\" id=\"Gateway_16mvw8q_di\" isMarkerVisible=\"true\">\n                \n        <dc:Bounds height=\"50\" width=\"50\" x=\"185\" y=\"93\"/>\n              \n      </bpmndi:BPMNShape>\n            \n      <bpmndi:BPMNShape bpmnElement=\"Activity_1sy5d4a\" id=\"Activity_1k6uaoo_di\">\n                \n        <dc:Bounds height=\"80\" width=\"100\" x=\"430\" y=\"78\"/>\n                \n        <bpmndi:BPMNLabel/>\n              \n      </bpmndi:BPMNShape>\n            \n      <bpmndi:BPMNEdge bpmnElement=\"Flow_0abuizb\" id=\"Flow_0abuizb_di\">\n                \n        <di:waypoint x=\"148\" y=\"118\"/>\n                \n        <di:waypoint x=\"185\" y=\"118\"/>\n              \n      </bpmndi:BPMNEdge>\n            \n      <bpmndi:BPMNEdge bpmnElement=\"Flow_08vwwlt\" id=\"Flow_08vwwlt_di\">\n                \n        <di:waypoint x=\"210\" y=\"93\"/>\n                \n        <di:waypoint x=\"210\" y=\"20\"/>\n                \n        <di:waypoint x=\"260\" y=\"20\"/>\n              \n      </bpmndi:BPMNEdge>\n            \n      <bpmndi:BPMNEdge bpmnElement=\"Flow_1u7n32v\" id=\"Flow_1u7n32v_di\">\n                \n        <di:waypoint x=\"530\" y=\"118\"/>\n                \n        <di:waypoint x=\"572\" y=\"118\"/>\n              \n      </bpmndi:BPMNEdge>\n            \n      <bpmndi:BPMNEdge bpmnElement=\"Flow_1qkzf07\" id=\"Flow_1qkzf07_di\">\n                \n        <di:waypoint x=\"235\" y=\"118\"/>\n                \n        <di:waypoint x=\"430\" y=\"118\"/>\n              \n      </bpmndi:BPMNEdge>\n            \n      <bpmndi:BPMNEdge bpmnElement=\"Flow_103dkkw\" id=\"Flow_103dkkw_di\">\n                \n        <di:waypoint x=\"360\" y=\"20\"/>\n                \n        <di:waypoint x=\"390\" y=\"20\"/>\n                \n        <di:waypoint x=\"390\" y=\"118\"/>\n                \n        <di:waypoint x=\"430\" y=\"118\"/>\n              \n      </bpmndi:BPMNEdge>\n          \n    </bpmndi:BPMNPlane>\n      \n  </bpmndi:BPMNDiagram>\n    \n  <bpmndi:BPMNDiagram id=\"BPMNDiagram_02nsx8j\">\n        \n    <bpmndi:BPMNPlane bpmnElement=\"Activity_1k6yh1s\" id=\"BPMNPlane_1ob96s9\"/>\n      \n  </bpmndi:BPMNDiagram>\n    \n  <bpmndi:BPMNDiagram id=\"BPMNDiagram_0o4vzza\">\n        \n    <bpmndi:BPMNPlane bpmnElement=\"Activity_1sy5d4a\" id=\"BPMNPlane_0kkfbp4\"/>\n      \n  </bpmndi:BPMNDiagram>\n  \n</bpmn:definitions>";
	//#endregion
	//#region ../../helper/processstudio/processComponents.ts
	function jsonHeaders(token) {
		return {
			...token ? { Authorization: `Bearer ${token}` } : {},
			Accept: "application/json",
			"Content-Type": "application/json"
		};
	}
	/**
	* Lässt Process Studio eine Komponente (z.B. BPMN-Inhalt) auflösen/prüfen -
	* wie der Import in der Oberfläche vor dem Deployment:
	* POST /processstudio/components/resolve mit { type, content }.
	*/
	async function resolveComponent(baseUri, token, type, content) {
		return await performHttpRequest(`${baseUri}/processstudio/components/resolve`, {
			method: "POST",
			headers: jsonHeaders(token),
			body: JSON.stringify({
				type,
				content
			})
		});
	}
	/**
	* Prüft, ob eine Komponente schon existiert:
	* POST /processstudio/components/exists mit { id, name, type }.
	* Die Antwort wird tolerant ausgewertet (true bzw. { exists: true }).
	*/
	async function componentExists(baseUri, token, id, name, type) {
		const body = (await performHttpRequest(`${baseUri}/processstudio/components/exists`, {
			method: "POST",
			headers: jsonHeaders(token),
			body: JSON.stringify({
				id,
				name,
				type
			})
		})).body;
		if (typeof body === "boolean") return body;
		if (typeof body === "string") return body.trim().toLowerCase() === "true";
		return body?.exists === true || body?.idExists === true || body?.nameExists === true;
	}
	/**
	* Deployt einen BPMN-Prozess (neue Version, falls er schon existiert):
	* POST /processstudio/components/process/deployment mit { type: "process", content }.
	*/
	async function deployProcess(baseUri, token, content) {
		return await performHttpRequest(`${baseUri}/processstudio/components/process/deployment`, {
			method: "POST",
			headers: jsonHeaders(token),
			body: JSON.stringify({
				type: "process",
				content
			})
		});
	}
	//#endregion
	//#region ../../helper/classcon-documentreader/d3EndpointService.ts
	var FIELDS$2 = [
		"ApiKey",
		"RepositoryId",
		"D3Owner",
		"EndpointServiceOutputStructure"
	];
	function endpointUrl$2(baseUri, subscriptionId) {
		return `${baseUri}/classcon-documentreader/Configuration/D3EndpointService?subscriptionId=${encodeURIComponent(subscriptionId)}`;
	}
	function authHeaders$3(token) {
		return token ? { Authorization: `Bearer ${token}` } : {};
	}
	function pick$1(raw) {
		const lookup = new Map(Object.entries(raw).map(([key, value]) => [key.toLowerCase(), value]));
		const result = {};
		for (const field of FIELDS$2) {
			const value = lookup.get(field.toLowerCase());
			if (value !== void 0 && value !== null) result[field] = String(value);
		}
		return result;
	}
	function parseHtml$2(html) {
		if (typeof DOMParser === "undefined") return void 0;
		const doc = new DOMParser().parseFromString(html, "text/html");
		const raw = {};
		doc.querySelectorAll("input[name], select[name], textarea[name]").forEach((element) => {
			if ((element.tagName === "INPUT" ? element.type : "") === "radio" && !element.checked) return;
			if (FIELDS$2.some((field) => field.toLowerCase() === element.name.toLowerCase())) raw[element.name] = element.value;
		});
		const result = pick$1(raw);
		return Object.keys(result).length ? result : void 0;
	}
	/**
	* Liest das eingerichtete Zielsystem
	* (GET /classcon-documentreader/Configuration/D3EndpointService?subscriptionId=...).
	* Versteht JSON und die HTML-Konfigurationsseite. undefined = nicht lesbar.
	*/
	async function getD3EndpointService(baseUri, token, subscriptionId) {
		const response = await performHttpRequest(endpointUrl$2(baseUri, subscriptionId), {
			method: "GET",
			headers: {
				...authHeaders$3(token),
				Accept: "application/json, text/html;q=0.9"
			}
		});
		if (typeof response.body === "string") try {
			return pick$1(JSON.parse(response.body));
		} catch {
			return parseHtml$2(response.body);
		}
		return response.body && typeof response.body === "object" ? pick$1(response.body) : void 0;
	}
	/**
	* Richtet das Zielsystem ein - wie die Oberfläche: POST als Formulardaten
	* ApiKey=...&RepositoryId=...&D3Owner=Editor&EndpointServiceOutputStructure=MainDocWithAttachments.
	*/
	async function saveD3EndpointService(baseUri, token, subscriptionId, settings) {
		const body = new URLSearchParams();
		for (const field of FIELDS$2) body.set(field, settings[field]);
		return await performHttpRequest(endpointUrl$2(baseUri, subscriptionId), {
			method: "POST",
			headers: {
				...authHeaders$3(token),
				Accept: "application/json",
				"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
			},
			body: body.toString()
		});
	}
	//#endregion
	//#region ../../helper/eventbridge/getEventbridgeConfig.ts
	/**
	* Liest die Eventbridge-Konfiguration: GET /eventbridge/config/events.
	* Enthält die aktivierten Ereignisse (samt Webhook im DMS) und wann welches
	* Repository zuletzt synchronisiert wurde.
	*
	* @param token - API-Key; leer = Browser-Session.
	*/
	async function getEventbridgeConfig(baseUri, token) {
		return (await performHttpRequest(`${baseUri}/eventbridge/config/events`, {
			method: "GET",
			headers: {
				...token ? { Authorization: `Bearer ${token}` } : {},
				Accept: "application/json"
			}
		})).body;
	}
	//#endregion
	//#region ../../helper/classcon-documentreader/serviceBusEndpointMapping.ts
	var PREFIX = "ServiceBusMapping.ServiceBusAttributeMappings";
	function mappingUrl(baseUri, subscriptionId, endpointServiceName, documentClass, save) {
		const params = new URLSearchParams({ subscriptionId });
		if (save) params.set("saveMapping", "true");
		params.set("endpointServiceName", endpointServiceName);
		params.set("documentClass", documentClass);
		return `${baseUri}/classcon-documentreader/Configuration/ServiceBusEndpointService?${params}`;
	}
	function authHeaders$2(token) {
		return token ? { Authorization: `Bearer ${token}` } : {};
	}
	function toCrlf(text) {
		return text.replace(/\r?\n/g, "\r\n");
	}
	/**
	* Speichert das Export-Mapping eines Zielsystems - wie die Oberfläche:
	* POST .../ServiceBusEndpointService?subscriptionId=...&saveMapping=true&endpointServiceName=...&documentClass=...
	* als Formulardaten (ASP.NET-Liste mit "...Index"-Feldern, StyleSheet usw.).
	*/
	async function saveServiceBusEndpointMapping(baseUri, token, subscriptionId, endpointServiceName, documentClass, mapping) {
		const body = new URLSearchParams();
		mapping.AttributeMappings.forEach((row, i) => {
			body.append(`${PREFIX}.Index`, String(i));
			body.append(`${PREFIX}[${i}].JsonOutputName`, row.JsonOutputName);
			body.append(`${PREFIX}[${i}].AttributeName`, row.AttributeName);
			body.append(`${PREFIX}[${i}].DefaultValue`, row.DefaultValue);
			body.append(`${PREFIX}[${i}].ServiceBusDataType`, row.ServiceBusDataType);
			body.append(`${PREFIX}[${i}].Export`, row.Export ? "True" : "False");
		});
		body.append("IsCustomTemplate", mapping.IsCustomTemplate ? "true" : "false");
		body.append("StyleSheet", toCrlf(mapping.StyleSheet));
		body.append("DefaultStyleSheetName", mapping.DefaultStyleSheetName);
		body.append("ServiceBusExportType", mapping.ServiceBusExportType);
		return await performHttpRequest(mappingUrl(baseUri, subscriptionId, endpointServiceName, documentClass, true), {
			method: "POST",
			headers: {
				...authHeaders$2(token),
				Accept: "application/json, text/html;q=0.9",
				"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
			},
			body: body.toString()
		});
	}
	//#endregion
	//#region src/data/sftpExportStylesheet.xsl?raw
	var sftpExportStylesheet_default = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<xsl:stylesheet xmlns:xsl=\"http://www.w3.org/1999/XSL/Transform\" version=\"2.0\"  xmlns:xs=\"http://www.w3.org/2001/XMLSchema\">	\n  \n  <xsl:output method=\"text\"/>\n	\n  <xsl:template match=\"/root\">\n  <xsl:for-each select=\"exportXML\">\n	<xsl:value-of select=\"translate(translate(current(),'&lt;','&lt;'), '&gt;', '&gt;')\"/>\n   </xsl:for-each>\n   </xsl:template>\n </xsl:stylesheet>";
	//#endregion
	//#region ../../helper/classcon-documentreader/sftpEndpointService.ts
	var FIELDS$1 = [
		"Host",
		"Port",
		"User",
		"Password",
		"Directory"
	];
	function endpointUrl$1(baseUri, subscriptionId) {
		return `${baseUri}/classcon-documentreader/Configuration/SftpEndpointService?subscriptionId=${encodeURIComponent(subscriptionId)}`;
	}
	function authHeaders$1(token) {
		return token ? { Authorization: `Bearer ${token}` } : {};
	}
	function pick(raw) {
		const lookup = new Map(Object.entries(raw).map(([key, value]) => [key.toLowerCase(), value]));
		const result = {};
		for (const field of FIELDS$1) {
			const value = lookup.get(field.toLowerCase());
			if (value !== void 0 && value !== null) result[field] = String(value);
		}
		return result;
	}
	function parseHtml$1(html) {
		if (typeof DOMParser === "undefined") return void 0;
		const doc = new DOMParser().parseFromString(html, "text/html");
		const raw = {};
		doc.querySelectorAll("input[name], textarea[name]").forEach((element) => {
			if (FIELDS$1.some((field) => field.toLowerCase() === element.name.toLowerCase())) raw[element.name] = element.value;
		});
		const result = pick(raw);
		return Object.keys(result).length ? result : void 0;
	}
	/**
	* Liest das eingerichtete SFTP-Zielsystem
	* (GET /classcon-documentreader/Configuration/SftpEndpointService?subscriptionId=...).
	* Versteht JSON und die HTML-Konfigurationsseite. undefined = nicht lesbar.
	* Das Kennwort liefert die Seite ggf. nicht (oder maskiert) mit.
	*/
	async function getSftpEndpointService(baseUri, token, subscriptionId) {
		const response = await performHttpRequest(endpointUrl$1(baseUri, subscriptionId), {
			method: "GET",
			headers: {
				...authHeaders$1(token),
				Accept: "application/json, text/html;q=0.9"
			}
		});
		if (typeof response.body === "string") try {
			return pick(JSON.parse(response.body));
		} catch {
			return parseHtml$1(response.body);
		}
		return response.body && typeof response.body === "object" ? pick(response.body) : void 0;
	}
	/**
	* Richtet das SFTP-Zielsystem ein - wie die Oberfläche: POST als
	* Formulardaten Host=...&Port=22&User=...&Password=...&Directory=...
	*/
	async function saveSftpEndpointService(baseUri, token, subscriptionId, settings) {
		const body = new URLSearchParams();
		for (const field of FIELDS$1) body.set(field, settings[field]);
		return await performHttpRequest(endpointUrl$1(baseUri, subscriptionId), {
			method: "POST",
			headers: {
				...authHeaders$1(token),
				Accept: "application/json",
				"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
			},
			body: body.toString()
		});
	}
	//#endregion
	//#region ../../helper/classcon-documentreader/endpointServices.ts
	/**
	* Liefert die Namen der im Rechnungsleser eingerichteten Zielsysteme, z.B.
	* ["D3EndpointService", "MetadataEndpointService"].
	*
	* Quelle ist die Übersichtsseite "Zielsysteme"
	* (GET /classcon-documentreader/Configuration?subscriptionId=...), die jedes
	* eingerichtete Zielsystem als <li class="mdc-list-item" id="<Name>"> listet.
	* Die Details eines Zielsystems liefert GET
	* /classcon-documentreader/Configuration/<Name>?subscriptionId=... (siehe
	* d3EndpointService.ts / metadataEndpointService.ts).
	*/
	async function getConfiguredEndpointServices(baseUri, token, subscriptionId) {
		const response = await performHttpRequest(`${baseUri}/classcon-documentreader/Configuration?subscriptionId=${encodeURIComponent(subscriptionId)}`, {
			method: "GET",
			headers: {
				...token ? { Authorization: `Bearer ${token}` } : {},
				Accept: "text/html"
			}
		});
		if (typeof response.body !== "string" || typeof DOMParser === "undefined") throw new Error("Die Zielsysteme des Rechnungslesers konnten nicht gelesen werden.");
		const doc = new DOMParser().parseFromString(response.body, "text/html");
		return Array.from(doc.querySelectorAll(".mdc-list-group li.mdc-list-item[id]")).map((item) => item.getAttribute("id") ?? "").filter(Boolean);
	}
	//#endregion
	//#region ../../helper/classcon-documentreader/metadataEndpointService.ts
	var SCALAR_FIELDS = [
		"ServiceBusConnectionString",
		"QueueName",
		"ReferencedTargetSystem"
	];
	function endpointUrl(baseUri, subscriptionId) {
		return `${baseUri}/classcon-documentreader/Configuration/MetadataEndpointService?subscriptionId=${encodeURIComponent(subscriptionId)}`;
	}
	function authHeaders(token) {
		return token ? { Authorization: `Bearer ${token}` } : {};
	}
	function fromJson(raw) {
		const lookup = new Map(Object.entries(raw).map(([key, value]) => [key.toLowerCase(), value]));
		const result = {};
		for (const field of SCALAR_FIELDS) {
			const value = lookup.get(field.toLowerCase());
			if (value !== void 0 && value !== null) result[field] = String(value);
		}
		const properties = lookup.get("properties");
		if (Array.isArray(properties)) result.Properties = properties.map((p) => ({
			Name: String(p?.Name ?? p?.name ?? ""),
			Value: String(p?.Value ?? p?.value ?? "")
		}));
		return result;
	}
	function fromHtml(html) {
		if (typeof DOMParser === "undefined") return void 0;
		const doc = new DOMParser().parseFromString(html, "text/html");
		const result = {};
		const properties = /* @__PURE__ */ new Map();
		doc.querySelectorAll("input[name], select[name], textarea[name]").forEach((element) => {
			if ((element.tagName === "INPUT" ? element.type : "") === "radio" && !element.checked) return;
			const property = element.name.match(/^Properties\[(\d+)\]\.(Name|Value)$/i);
			if (property) {
				const entry = properties.get(Number(property[1])) ?? {
					Name: "",
					Value: ""
				};
				entry[property[2].toLowerCase() === "name" ? "Name" : "Value"] = element.value;
				properties.set(Number(property[1]), entry);
				return;
			}
			const field = SCALAR_FIELDS.find((f) => f.toLowerCase() === element.name.toLowerCase());
			if (field) result[field] = element.value;
		});
		if (properties.size) result.Properties = [...properties.keys()].sort((a, b) => a - b).map((i) => properties.get(i));
		return Object.keys(result).length ? result : void 0;
	}
	/**
	* Liest den eingerichteten Metadaten-Endpunkt
	* (GET /classcon-documentreader/Configuration/MetadataEndpointService?subscriptionId=...).
	* Versteht JSON und die HTML-Konfigurationsseite. undefined = nicht lesbar.
	*/
	async function getMetadataEndpointService(baseUri, token, subscriptionId) {
		const response = await performHttpRequest(endpointUrl(baseUri, subscriptionId), {
			method: "GET",
			headers: {
				...authHeaders(token),
				Accept: "application/json, text/html;q=0.9"
			}
		});
		if (typeof response.body === "string") try {
			return fromJson(JSON.parse(response.body));
		} catch {
			return fromHtml(response.body);
		}
		return response.body && typeof response.body === "object" ? fromJson(response.body) : void 0;
	}
	/**
	* Richtet den Metadaten-Endpunkt ein - wie die Oberfläche: POST als
	* Formulardaten ServiceBusConnectionString, QueueName, ReferencedTargetSystem
	* und Properties[i].Name / Properties[i].Value.
	*/
	async function saveMetadataEndpointService(baseUri, token, subscriptionId, settings) {
		const body = new URLSearchParams();
		for (const field of SCALAR_FIELDS) body.set(field, settings[field]);
		settings.Properties.forEach((property, index) => {
			body.set(`Properties[${index}].Name`, property.Name);
			body.set(`Properties[${index}].Value`, property.Value);
		});
		return await performHttpRequest(endpointUrl(baseUri, subscriptionId), {
			method: "POST",
			headers: {
				...authHeaders(token),
				Accept: "application/json",
				"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
			},
			body: body.toString()
		});
	}
	//#endregion
	//#region ../../helper/identityprovider/impersonateWhitelist.ts
	function whitelistUrl(baseUri) {
		return `${baseUri}/identityprovider/config/impersonatewhitelist`;
	}
	/**
	* Prüft, ob eine App als vertrauenswürdige App (Impersonation) eingetragen
	* ist. Wertet nur eine JSON-Antwort aus (Liste von App-Namen, direkt oder in
	* einem Feld) - undefined, wenn der Stand nicht eindeutig lesbar ist (z.B.
	* HTML-Seite, die auch die NICHT eingetragenen Apps auflistet).
	*/
	async function isAppImpersonationWhitelisted(baseUri, app) {
		try {
			const response = await fetch(whitelistUrl(baseUri), {
				method: "GET",
				headers: { Accept: "application/json" },
				credentials: "same-origin"
			});
			if (!response.ok || !(response.headers.get("content-type") ?? "").includes("json")) return void 0;
			const body = await response.json();
			const lists = Array.isArray(body) ? [body] : Object.values(body ?? {}).filter(Array.isArray);
			if (!lists.length) return void 0;
			return lists.some((list) => list.some((entry) => (typeof entry === "string" ? entry : entry?.appName ?? entry?.name ?? entry?.id) === app));
		} catch {
			return;
		}
	}
	/**
	* Trägt eine App als vertrauenswürdige App ein - wie die Identityprovider-
	* Oberfläche: POST /identityprovider/config/impersonatewhitelist mit
	* {"addApp":"<app>"} und Header "x-csrf-token". Läuft über die
	* Browser-Session (Konfigurationsbereich des Identityproviders).
	*/
	async function addAppToImpersonationWhitelist(baseUri, app) {
		await performHttpRequest(whitelistUrl(baseUri), {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				"x-csrf-token": await getIdentityProviderCsrfToken(baseUri)
			},
			body: JSON.stringify({ addApp: app })
		});
	}
	//#endregion
	//#region ../../helper/classcon-documentreader/extensionPoints.ts
	var FIELDS = [
		"NodeId",
		"IsActivated",
		"ExtensionPointType",
		"ConnectionString",
		"QueueName",
		"ScriptingAppEndpoint",
		"ScriptingEngineProfile"
	];
	function extensionPointsUrl(baseUri, subscriptionId) {
		return `${baseUri}/classcon-documentreader/Configuration/ExtensionPoints?subscriptionId=${encodeURIComponent(subscriptionId)}`;
	}
	function toExtensionPoint(raw) {
		const lookup = new Map(Object.entries(raw).map(([key, value]) => [key.toLowerCase(), value]));
		const text = (field) => {
			const value = lookup.get(field.toLowerCase());
			return value === void 0 || value === null ? "" : String(value);
		};
		return {
			NodeId: text("NodeId"),
			IsActivated: [
				"true",
				"on",
				"1"
			].includes(text("IsActivated").toLowerCase()),
			ExtensionPointType: text("ExtensionPointType"),
			ConnectionString: text("ConnectionString"),
			QueueName: text("QueueName"),
			ScriptingAppEndpoint: text("ScriptingAppEndpoint"),
			ScriptingEngineProfile: text("ScriptingEngineProfile")
		};
	}
	function parseJson(body) {
		const data = body;
		const list = Array.isArray(data) ? data : data?.ExtensionPoints ?? data?.extensionPoints;
		return Array.isArray(list) ? list.map(toExtensionPoint) : void 0;
	}
	function parseHtml(html) {
		if (typeof DOMParser === "undefined") return;
		const doc = new DOMParser().parseFromString(html, "text/html");
		const entries = /* @__PURE__ */ new Map();
		const checkboxes = /* @__PURE__ */ new Set();
		doc.querySelectorAll("input[name], select[name], textarea[name]").forEach((element) => {
			const match = element.name.match(/^ExtensionPoints\[(\d+)\]\.(\w+)$/);
			if (!match) return;
			const index = Number(match[1]);
			const field = match[2];
			const entry = entries.get(index) ?? {};
			entries.set(index, entry);
			const type = element.tagName === "INPUT" ? element.type : "";
			if (type === "checkbox") {
				checkboxes.add(element.name);
				entry[field] = element.checked ? "true" : "false";
			} else if (type === "radio") {
				if (element.checked) entry[field] = element.value;
			} else if (!checkboxes.has(element.name)) entry[field] = element.value;
		});
		if (entries.size === 0) return;
		return [...entries.keys()].sort((a, b) => a - b).map((index) => toExtensionPoint(entries.get(index)));
	}
	/**
	* Liest ALLE Extension Points eines Rechnungslesers
	* (GET /classcon-documentreader/Configuration/ExtensionPoints?subscriptionId=...).
	* Versteht eine JSON-Antwort sowie die HTML-Konfigurationsseite (nur im
	* Browser). Wirft, wenn keine Einträge erkennbar sind - saveExtensionPoints
	* darf nie mit einer unvollständigen Liste aufgerufen werden, sonst würden
	* die übrigen Extension Points überschrieben.
	*/
	async function getExtensionPoints(baseUri, token, subscriptionId) {
		const headers = {
			...token ? { Authorization: `Bearer ${token}` } : {},
			Accept: "application/json, text/html;q=0.9"
		};
		const response = await performHttpRequest(extensionPointsUrl(baseUri, subscriptionId), {
			method: "GET",
			headers
		});
		const points = typeof response.body === "string" ? parseHtml(response.body) ?? (() => {
			try {
				return parseJson(JSON.parse(response.body));
			} catch {
				return;
			}
		})() : parseJson(response.body);
		if (!points || points.length === 0) throw new Error("Die Extension Points des Rechnungslesers konnten nicht gelesen werden - es wird nichts gespeichert.");
		return points;
	}
	/**
	* Speichert die KOMPLETTE Liste der Extension Points (POST, Formulardaten
	* "ExtensionPoints[i].<Feld>" wie die Konfigurationsseite). Immer vorher mit
	* getExtensionPoints laden und nur den gewünschten Eintrag ändern.
	*/
	async function saveExtensionPoints(baseUri, token, subscriptionId, points) {
		const headers = {
			...token ? { Authorization: `Bearer ${token}` } : {},
			Accept: "application/json",
			"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
		};
		const body = new URLSearchParams();
		points.forEach((point, index) => {
			for (const field of FIELDS) body.append(`ExtensionPoints[${index}].${field}`, String(point[field] ?? ""));
		});
		return await performHttpRequest(extensionPointsUrl(baseUri, subscriptionId), {
			method: "POST",
			headers,
			body: body.toString()
		});
	}
	//#endregion
	//#region src/forms/steps.ts
	var BASE_URI$1 = window.location.origin;
	var ADMIN_GROUP_NAME = "Administrative group for the tenant";
	var PROFILE_MAIL_NAME = "Frühes Scannen (Mail)";
	var PROFILE_SCAN_NAME = "Frühes Scannen (Scan)";
	var CREDIT_MEMO_SCRIPT_NAME = "Rechnungsleser: Gutschriften verschieben";
	var PRE_EXPORT_SCRIPT_NAME = "Rechnungsleser: PreExport";
	var BEFORE_EXPORT_NODE_ID = "IR_Business_BeforeExportHook";
	var BEFORE_EXPORT_PROFILE = "PreExportScript";
	var DUPLICATE_DETECTION_SCRIPT_NAME = "Rechnungsleser: Dublettenerkennung";
	var POST_EXTRACTION_NODE_ID = "IR_Business_PostExtractionScript";
	var POST_EXTRACTION_PROFILE = "PostExtractionScript";
	var CREDIT_MEMO_INPUT_DOC_ID = "docId";
	var CREDIT_MEMO_VARIABLES = [
		{
			key: "categoryCreditMemoGUID",
			value: "52a84dbc-31bf-4351-9c16-4852dc2e816d",
			encrypted: false
		},
		{
			key: "fieldDocumentTypeGUID",
			value: "717f4480-f16c-4838-96a3-f69a01eb41f1",
			encrypted: false
		},
		{
			key: "fieldDocumentTypeValueMatch",
			value: "3",
			encrypted: false
		}
	];
	var DOCUMENT_TYPE_SCRIPT_NAME = "Rechnungsleser: Dokumenttyp anpassen";
	var DOCUMENT_TYPE_INPUT_DOC_ID = "docId";
	var DOCUMENT_TYPE_VARIABLES = [{
		key: "fieldDocumentTypeGUID",
		value: "717f4480-f16c-4838-96a3-f69a01eb41f1",
		encrypted: false
	}];
	var LEGACY_SCRIPT_NAMES = {
		[CREDIT_MEMO_SCRIPT_NAME]: ["Rechnungsleser Gutschriften verschieben"],
		[PRE_EXPORT_SCRIPT_NAME]: ["Rechnungsleser PreExport"],
		[DUPLICATE_DETECTION_SCRIPT_NAME]: ["Rechnungsleser Dublettenerkennung"]
	};
	var API_KEY_LABEL = "Onboarding Gevis ECM Document Reader";
	var MAILBOXES = [{
		mailbox: "fruehesscannenmail",
		description: PROFILE_MAIL_NAME,
		profileName: PROFILE_MAIL_NAME
	}, {
		mailbox: "fruehesscannenscan",
		description: PROFILE_SCAN_NAME,
		profileName: PROFILE_SCAN_NAME
	}];
	var SOURCE_MAPPING = {
		name: "Rechnungsleser",
		sourceId: "/classcon-documentreader/sources/invoices",
		mappingItems: [
			{
				source: "InvoiceNumber",
				destination: "9ebfdb3d-e096-49ba-b854-56e09b39db5a",
				isSystemProperty: false,
				regexIgnoreCase: false,
				type: 0
			},
			{
				source: "documentCategory",
				destination: "fc3d3e6d-46f6-4fcd-84e3-db79e14b2751",
				isSystemProperty: false,
				regexIgnoreCase: false,
				type: 1
			},
			{
				source: "VENDOR_NUM",
				destination: "17d56c68-f74d-40ca-989c-9ecd80c773bd",
				isSystemProperty: false,
				regexIgnoreCase: false,
				type: 0
			},
			{
				source: "VENDOR_NAME",
				destination: "348219f7-cd82-42bd-aa3d-57dafc4bf9ef",
				isSystemProperty: false,
				regexIgnoreCase: false,
				type: 0
			},
			{
				source: "OrderNum",
				destination: "1c13a20f-cf94-460a-ba49-3dd83cbce609",
				isSystemProperty: false,
				regexIgnoreCase: false,
				type: 0
			},
			{
				source: "Rechnungstyp",
				destination: "e6bef93c-ac18-40bb-8afb-93ba48b3b176",
				isSystemProperty: false,
				regexIgnoreCase: false,
				type: 0
			},
			{
				source: "InvoiceDate",
				destination: "e16f89a9-a8de-4f55-b287-415e4a543701",
				isSystemProperty: false,
				regexIgnoreCase: false,
				type: 0
			},
			{
				source: "NAME",
				destination: "49f2d260-5fc4-4331-9da6-aa553a5ee044",
				isSystemProperty: false,
				regexIgnoreCase: false,
				type: 0
			},
			{
				source: "GrossAmount",
				destination: "3d07a2af-546f-4360-8254-daeec02dd101",
				isSystemProperty: false,
				regexIgnoreCase: false,
				type: 0
			},
			{
				source: "NetAmount1",
				destination: "98ff7208-08d6-4f7a-bf19-63c1b61c12e1",
				isSystemProperty: false,
				regexIgnoreCase: false,
				type: 0
			},
			{
				source: "NetAmount2",
				destination: "7342cada-e4b0-481a-bd22-990555287524",
				isSystemProperty: false,
				regexIgnoreCase: false,
				type: 0
			},
			{
				source: "VatRate1",
				destination: "8a23cfb1-a13f-40b4-aec9-126b451f3b22",
				isSystemProperty: false,
				regexIgnoreCase: false,
				type: 0
			},
			{
				source: "VatRate2",
				destination: "81f354c2-a6ef-492a-bbda-a7eefe5bb9dd",
				isSystemProperty: false,
				regexIgnoreCase: false,
				type: 0
			},
			{
				source: "Barcode",
				destination: "property_document_number",
				isSystemProperty: true,
				regexIgnoreCase: false,
				type: 0
			},
			{
				source: "DocumentType",
				destination: "717f4480-f16c-4838-96a3-f69a01eb41f1",
				isSystemProperty: false,
				regexIgnoreCase: false,
				type: 0
			}
		]
	};
	async function ensureSwal() {
		await loadSweetAlert();
		if (typeof Swal === "undefined") throw new Error("Dialog-Bibliothek (SweetAlert2) konnte nicht geladen werden.");
	}
	async function confirmWarning(title, html, confirmText) {
		await ensureSwal();
		return !!(await Swal.fire({
			icon: "warning",
			title,
			html,
			showCancelButton: true,
			confirmButtonColor: "#dc3545",
			confirmButtonText: confirmText,
			cancelButtonText: "Abbrechen",
			focusCancel: true
		})).isConfirmed;
	}
	async function downloadCurrentWebindexLayout(apiKey) {
		const configurations = (await getWebindexConfigurations(BASE_URI$1, apiKey)).body;
		const current = findWebindexConfiguration(configurations) ?? configurations;
		const content = typeof current === "string" ? current : JSON.stringify(current, null, 2);
		if (!content || content === "{}") throw new Error("Das aktuelle Webindex-Layout ist leer oder konnte nicht gelesen werden.");
		const date = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
		const fileName = [
			getTenantName(),
			"Webindex-Layout_Rechnungsleser",
			date
		].filter(Boolean).join("_") + ".json";
		downloadBlob(new Blob([content], { type: "application/json" }), fileName);
	}
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
				return { backup: !!Swal.getPopup().querySelector("#onb-swal-backup")?.checked };
			}
		});
		if (!result.isConfirmed) return false;
		if (result.value?.backup) try {
			await downloadCurrentWebindexLayout(apiKey);
		} catch (error) {
			await Swal.fire({
				icon: "error",
				title: "Sicherung fehlgeschlagen",
				html: `Das aktuelle Layout konnte nicht heruntergeladen werden - es wurde <strong>nichts überschrieben</strong>.<br><br>${escapeHtml(getErrorMessage(error))}`
			});
			return false;
		}
		return true;
	}
	function done(text) {
		return {
			state: "done",
			text
		};
	}
	function missing(text) {
		return {
			state: "missing",
			text
		};
	}
	async function getRepositoryId(apiKey) {
		const repositoryId = (await getRepositories(BASE_URI$1, apiKey)).body.repositories?.[0]?.id;
		if (!repositoryId) throw new Error("Kein DMS-Repository gefunden.");
		return repositoryId;
	}
	async function findScriptByName(apiKey, name) {
		const scripts = (await getAllScripts(BASE_URI$1, apiKey)).body ?? [];
		for (const candidate of [name, ...LEGACY_SCRIPT_NAMES[name] ?? []]) {
			const script = scripts.find((s) => s.name === candidate && s.id);
			if (script?.id) return {
				id: script.id,
				name: candidate
			};
		}
	}
	async function findScriptIdByName(apiKey, name) {
		return (await findScriptByName(apiKey, name))?.id;
	}
	function legacyNameNote(found, name) {
		return found.name === name ? "" : ` Noch unter altem Namen „${found.name}“ - bitte im Process Studio in „${name}“ umbenennen.`;
	}
	function scriptRunUrl(scriptId) {
		return `${BASE_URI$1}/scripting/script/${scriptId}/run`;
	}
	function isHookConfigured(point, endpoint) {
		return !!point && point.IsActivated && point.ExtensionPointType === "ScriptingApp" && point.ScriptingAppEndpoint === endpoint;
	}
	function bpmnProcessInfo(bpmn) {
		const tag = bpmn.match(/<bpmn:process\b[^>]*>/)?.[0] ?? "";
		const id = tag.match(/\bid="([^"]+)"/)?.[1];
		const name = tag.match(/\bname="([^"]+)"/)?.[1];
		if (!id || !name) throw new Error("Prozess-Id/-Name im BPMN nicht gefunden.");
		return {
			id,
			name
		};
	}
	async function bpmnForTenant(apiKey) {
		const scriptId = await findCreditMemoScriptId(apiKey);
		if (!scriptId) throw new Error(`Skript „${CREDIT_MEMO_SCRIPT_NAME}“ nicht gefunden - bitte zuerst das Skript anlegen.`);
		const version = (await getScriptVersion(BASE_URI$1, apiKey, scriptId)).body[0];
		if (!version?.id) throw new Error(`Für „${CREDIT_MEMO_SCRIPT_NAME}“ wurde keine Version gefunden.`);
		if (!version.actionEnabled) throw new Error(`„${CREDIT_MEMO_SCRIPT_NAME}“ ist noch keine Aktion - bitte zuerst den Skript-Schritt ausführen.`);
		const actionId = `scripting_${version.action?.id ?? `${scriptId}-${version.id}`}`;
		const pattern = /(<camunda:inputParameter name="actionId">)scripting_[^<]+(<\/camunda:inputParameter>)/g;
		if (!pattern.test("<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\"?>\n<bpmn:definitions xmlns:bpmn=\"http://www.omg.org/spec/BPMN/20100524/MODEL\" xmlns:bpmndi=\"http://www.omg.org/spec/BPMN/20100524/DI\" xmlns:camunda=\"http://camunda.org/schema/1.0/bpmn\" xmlns:dc=\"http://www.omg.org/spec/DD/20100524/DC\" xmlns:di=\"http://www.omg.org/spec/DD/20100524/DI\" xmlns:modeler=\"http://camunda.org/schema/modeler/1.0\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" exporter=\"d.velop process modeler\" exporterVersion=\"1.1.0\" expressionLanguage=\"http://www.w3.org/1999/XPath\" id=\"definitions_p-77b509e1-e27b-4696-8ea7-b1eb3875692e\" modeler:executionPlatform=\"Camunda Platform\" modeler:executionPlatformVersion=\"7.15.0\" targetNamespace=\"http://bpmn.io/schema/bpmn\" typeLanguage=\"http://www.w3.org/2001/XMLSchema\">\n    \n  <bpmn:process id=\"p-77b509e1-e27b-4696-8ea7-b1eb3875692e\" isClosed=\"false\" isExecutable=\"true\" name=\"Rechnungsleser Ablage\" processType=\"None\">\n        \n    <bpmn:extensionElements>\n            \n      <camunda:properties>\n                \n        <camunda:property name=\"service:/process/services/actions:in:actionId\" value=\"String\"/>\n                \n        <camunda:property name=\"service:/process/services/actions:in:executingUser\" value=\"Identity\"/>\n                \n        <camunda:property name=\"service:/process/services/actions:in:actionPayload\" value=\"InternalObject\"/>\n                \n        <camunda:property name=\"service:/process/services/actions:out:status\" value=\"Number\"/>\n                \n        <camunda:property name=\"service:/process/services/actions:out:actionOutput\" value=\"InternalObject\"/>\n                \n        <camunda:property name=\"variable:docId*\" value=\"String!\"/>\n                \n        <camunda:property name=\"variable:documentType*\" value=\"String!\"/>\n              \n      </camunda:properties>\n          \n    </bpmn:extensionElements>\n        \n    <bpmn:startEvent id=\"StartEvent_1\" isInterrupting=\"true\" parallelMultiple=\"false\">\n            \n      <bpmn:extensionElements>\n                \n        <camunda:properties>\n                    \n          <camunda:property name=\"event:0\" value=\"eventbridge_dmspostimport\"/>\n                    \n          <camunda:property name=\"event:0:app\" value=\"eventbridge\"/>\n                    \n          <camunda:property name=\"event:0:name\" value=\"Ablage Gutschrift\"/>\n                    \n          <camunda:property name=\"start:action\" value=\"false\"/>\n                    \n          <camunda:property name=\"event:0:filter\" value=\"{&quot;and&quot;:[{&quot;==&quot;:[{&quot;var&quot;:&quot;doc.categoryId&quot;},&quot;fc3d3e6d-46f6-4fcd-84e3-db79e14b2751&quot;]}]}\"/>\n                    \n          <camunda:property name=\"event:0:input:docId\" value=\"${input.getValue(&quot;$['doc']['id']&quot;)}\"/>\n                    \n          <camunda:property name=\"event:0:input:process.instance.businessKey\" value=\"${input.getValue(&quot;$['doc']['id']&quot;)}\"/>\n                    \n          <camunda:property name=\"event:0:input:documentType\" value=\"${input.getValue(&quot;$['doc']['properties']['717f4480-f16c-4838-96a3-f69a01eb41f1']&quot;)}\"/>\n                  \n        </camunda:properties>\n              \n      </bpmn:extensionElements>\n            \n      <bpmn:outgoing>Flow_0abuizb</bpmn:outgoing>\n          \n    </bpmn:startEvent>\n        \n    <bpmn:endEvent id=\"Event_1fwwxqz\">\n            \n      <bpmn:incoming>Flow_1u7n32v</bpmn:incoming>\n          \n    </bpmn:endEvent>\n        \n    <bpmn:sequenceFlow id=\"Flow_0abuizb\" sourceRef=\"StartEvent_1\" targetRef=\"Gateway_16mvw8q\"/>\n        \n    <bpmn:subProcess completionQuantity=\"1\" id=\"Activity_1k6yh1s\" isForCompensation=\"false\" name=\"Gutschriften verschieben\" startQuantity=\"1\" triggeredByEvent=\"false\">\n            \n      <bpmn:documentation textFormat=\"text/plain\">#action</bpmn:documentation>\n            \n      <bpmn:incoming>Flow_08vwwlt</bpmn:incoming>\n            \n      <bpmn:outgoing>Flow_103dkkw</bpmn:outgoing>\n            \n      <bpmn:startEvent id=\"Activity_0qxarpb-StartEvent-0\" isInterrupting=\"true\" name=\"Gutschriften verschieben (Start)\" parallelMultiple=\"false\"/>\n            \n      <bpmn:sequenceFlow id=\"Activity_0qxarpb-SequenceFlow-0\" sourceRef=\"Activity_0qxarpb-StartEvent-0\" targetRef=\"Activity_0qxarpb-SendTask-0\"/>\n            \n      <bpmn:sendTask camunda:asyncBefore=\"true\" camunda:delegateExpression=\"${asyncService}\" completionQuantity=\"1\" id=\"Activity_0qxarpb-SendTask-0\" implementation=\"##WebService\" isForCompensation=\"false\" name=\"Gutschriften verschieben (Request)\" startQuantity=\"1\">\n                \n        <bpmn:extensionElements>\n                    \n          <camunda:inputOutput>\n                        \n            <camunda:inputParameter name=\"service.uri\">/process/services/actions</camunda:inputParameter>\n                        \n            <camunda:inputParameter name=\"actionId\">scripting_9d930749-7dee-4be1-bf6e-0275eeb74954-beba2cd5-81a2-4b56-b0f1-34d131922b25</camunda:inputParameter>\n                        \n            <camunda:inputParameter name=\"actionPayload[$.docId]\">${variables.get('docId')}</camunda:inputParameter>\n                      \n          </camunda:inputOutput>\n                  \n        </bpmn:extensionElements>\n              \n      </bpmn:sendTask>\n            \n      <bpmn:sequenceFlow id=\"Activity_0qxarpb-SequenceFlow-1\" sourceRef=\"Activity_0qxarpb-SendTask-0\" targetRef=\"Activity_0qxarpb-ReceiveTask-0\"/>\n            \n      <bpmn:receiveTask camunda:asyncAfter=\"true\" completionQuantity=\"1\" id=\"Activity_0qxarpb-ReceiveTask-0\" implementation=\"##WebService\" instantiate=\"false\" isForCompensation=\"false\" name=\"Gutschriften verschieben (Response)\" startQuantity=\"1\"/>\n            \n      <bpmn:sequenceFlow id=\"Activity_0qxarpb-SequenceFlow-2\" sourceRef=\"Activity_0qxarpb-ReceiveTask-0\" targetRef=\"Activity_0qxarpb-EndEvent-0\"/>\n            \n      <bpmn:endEvent id=\"Activity_0qxarpb-EndEvent-0\" name=\"Gutschriften verschieben (End)\"/>\n          \n    </bpmn:subProcess>\n        \n    <bpmn:exclusiveGateway default=\"Flow_1qkzf07\" gatewayDirection=\"Unspecified\" id=\"Gateway_16mvw8q\">\n            \n      <bpmn:incoming>Flow_0abuizb</bpmn:incoming>\n            \n      <bpmn:outgoing>Flow_08vwwlt</bpmn:outgoing>\n            \n      <bpmn:outgoing>Flow_1qkzf07</bpmn:outgoing>\n          \n    </bpmn:exclusiveGateway>\n        \n    <bpmn:sequenceFlow id=\"Flow_08vwwlt\" sourceRef=\"Gateway_16mvw8q\" targetRef=\"Activity_1k6yh1s\">\n            \n      <bpmn:conditionExpression xsi:type=\"bpmn:tFormalExpression\">#{variables.get('documentType') == '3'}</bpmn:conditionExpression>\n          \n    </bpmn:sequenceFlow>\n        \n    <bpmn:sequenceFlow id=\"Flow_1u7n32v\" sourceRef=\"Activity_1sy5d4a\" targetRef=\"Event_1fwwxqz\"/>\n        \n    <bpmn:subProcess completionQuantity=\"1\" id=\"Activity_1sy5d4a\" isForCompensation=\"false\" name=\"Dokumenttyp anpassen\" startQuantity=\"1\" triggeredByEvent=\"false\">\n            \n      <bpmn:documentation textFormat=\"text/plain\">#action</bpmn:documentation>\n            \n      <bpmn:incoming>Flow_1qkzf07</bpmn:incoming>\n            \n      <bpmn:incoming>Flow_103dkkw</bpmn:incoming>\n            \n      <bpmn:outgoing>Flow_1u7n32v</bpmn:outgoing>\n            \n      <bpmn:startEvent id=\"Activity_1k6uaoo-StartEvent-0\" isInterrupting=\"true\" name=\"Dokumenttyp anpassen (Start)\" parallelMultiple=\"false\"/>\n            \n      <bpmn:sequenceFlow id=\"Activity_1k6uaoo-SequenceFlow-0\" sourceRef=\"Activity_1k6uaoo-StartEvent-0\" targetRef=\"Activity_1k6uaoo-SendTask-0\"/>\n            \n      <bpmn:sendTask camunda:asyncBefore=\"true\" camunda:delegateExpression=\"${asyncService}\" completionQuantity=\"1\" id=\"Activity_1k6uaoo-SendTask-0\" implementation=\"##WebService\" isForCompensation=\"false\" name=\"Dokumenttyp anpassen (Request)\" startQuantity=\"1\">\n                \n        <bpmn:extensionElements>\n                    \n          <camunda:inputOutput>\n                        \n            <camunda:inputParameter name=\"service.uri\">/process/services/actions</camunda:inputParameter>\n                        \n            <camunda:inputParameter name=\"actionId\">scripting_881742d0-9cb3-4101-9358-e323f294f01d-9a187c06-a581-4888-aa16-6eacfee8eceb</camunda:inputParameter>\n                        \n            <camunda:inputParameter name=\"actionPayload[$.docId]\">${variables.get('docId')}</camunda:inputParameter>\n                      \n          </camunda:inputOutput>\n                  \n        </bpmn:extensionElements>\n              \n      </bpmn:sendTask>\n            \n      <bpmn:sequenceFlow id=\"Activity_1k6uaoo-SequenceFlow-1\" sourceRef=\"Activity_1k6uaoo-SendTask-0\" targetRef=\"Activity_1k6uaoo-ReceiveTask-0\"/>\n            \n      <bpmn:receiveTask camunda:asyncAfter=\"true\" completionQuantity=\"1\" id=\"Activity_1k6uaoo-ReceiveTask-0\" implementation=\"##WebService\" instantiate=\"false\" isForCompensation=\"false\" name=\"Dokumenttyp anpassen (Response)\" startQuantity=\"1\"/>\n            \n      <bpmn:sequenceFlow id=\"Activity_1k6uaoo-SequenceFlow-2\" sourceRef=\"Activity_1k6uaoo-ReceiveTask-0\" targetRef=\"Activity_1k6uaoo-EndEvent-0\"/>\n            \n      <bpmn:endEvent id=\"Activity_1k6uaoo-EndEvent-0\" name=\"Dokumenttyp anpassen (End)\"/>\n          \n    </bpmn:subProcess>\n        \n    <bpmn:sequenceFlow id=\"Flow_1qkzf07\" sourceRef=\"Gateway_16mvw8q\" targetRef=\"Activity_1sy5d4a\"/>\n        \n    <bpmn:sequenceFlow id=\"Flow_103dkkw\" sourceRef=\"Activity_1k6yh1s\" targetRef=\"Activity_1sy5d4a\"/>\n      \n  </bpmn:process>\n    \n  <bpmndi:BPMNDiagram id=\"BPMNDiagram_1\">\n        \n    <bpmndi:BPMNPlane bpmnElement=\"p-77b509e1-e27b-4696-8ea7-b1eb3875692e\" id=\"BPMNPlane_1\">\n            \n      <bpmndi:BPMNShape bpmnElement=\"StartEvent_1\" id=\"_BPMNShape_StartEvent_2\">\n                \n        <dc:Bounds height=\"36\" width=\"36\" x=\"112\" y=\"100\"/>\n              \n      </bpmndi:BPMNShape>\n            \n      <bpmndi:BPMNShape bpmnElement=\"Event_1fwwxqz\" id=\"Event_1fwwxqz_di\">\n                \n        <dc:Bounds height=\"36\" width=\"36\" x=\"572\" y=\"100\"/>\n              \n      </bpmndi:BPMNShape>\n            \n      <bpmndi:BPMNShape bpmnElement=\"Activity_1k6yh1s\" id=\"Activity_0qxarpb_di\">\n                \n        <dc:Bounds height=\"80\" width=\"100\" x=\"260\" y=\"-20\"/>\n                \n        <bpmndi:BPMNLabel/>\n              \n      </bpmndi:BPMNShape>\n            \n      <bpmndi:BPMNShape bpmnElement=\"Gateway_16mvw8q\" id=\"Gateway_16mvw8q_di\" isMarkerVisible=\"true\">\n                \n        <dc:Bounds height=\"50\" width=\"50\" x=\"185\" y=\"93\"/>\n              \n      </bpmndi:BPMNShape>\n            \n      <bpmndi:BPMNShape bpmnElement=\"Activity_1sy5d4a\" id=\"Activity_1k6uaoo_di\">\n                \n        <dc:Bounds height=\"80\" width=\"100\" x=\"430\" y=\"78\"/>\n                \n        <bpmndi:BPMNLabel/>\n              \n      </bpmndi:BPMNShape>\n            \n      <bpmndi:BPMNEdge bpmnElement=\"Flow_0abuizb\" id=\"Flow_0abuizb_di\">\n                \n        <di:waypoint x=\"148\" y=\"118\"/>\n                \n        <di:waypoint x=\"185\" y=\"118\"/>\n              \n      </bpmndi:BPMNEdge>\n            \n      <bpmndi:BPMNEdge bpmnElement=\"Flow_08vwwlt\" id=\"Flow_08vwwlt_di\">\n                \n        <di:waypoint x=\"210\" y=\"93\"/>\n                \n        <di:waypoint x=\"210\" y=\"20\"/>\n                \n        <di:waypoint x=\"260\" y=\"20\"/>\n              \n      </bpmndi:BPMNEdge>\n            \n      <bpmndi:BPMNEdge bpmnElement=\"Flow_1u7n32v\" id=\"Flow_1u7n32v_di\">\n                \n        <di:waypoint x=\"530\" y=\"118\"/>\n                \n        <di:waypoint x=\"572\" y=\"118\"/>\n              \n      </bpmndi:BPMNEdge>\n            \n      <bpmndi:BPMNEdge bpmnElement=\"Flow_1qkzf07\" id=\"Flow_1qkzf07_di\">\n                \n        <di:waypoint x=\"235\" y=\"118\"/>\n                \n        <di:waypoint x=\"430\" y=\"118\"/>\n              \n      </bpmndi:BPMNEdge>\n            \n      <bpmndi:BPMNEdge bpmnElement=\"Flow_103dkkw\" id=\"Flow_103dkkw_di\">\n                \n        <di:waypoint x=\"360\" y=\"20\"/>\n                \n        <di:waypoint x=\"390\" y=\"20\"/>\n                \n        <di:waypoint x=\"390\" y=\"118\"/>\n                \n        <di:waypoint x=\"430\" y=\"118\"/>\n              \n      </bpmndi:BPMNEdge>\n          \n    </bpmndi:BPMNPlane>\n      \n  </bpmndi:BPMNDiagram>\n    \n  <bpmndi:BPMNDiagram id=\"BPMNDiagram_02nsx8j\">\n        \n    <bpmndi:BPMNPlane bpmnElement=\"Activity_1k6yh1s\" id=\"BPMNPlane_1ob96s9\"/>\n      \n  </bpmndi:BPMNDiagram>\n    \n  <bpmndi:BPMNDiagram id=\"BPMNDiagram_0o4vzza\">\n        \n    <bpmndi:BPMNPlane bpmnElement=\"Activity_1sy5d4a\" id=\"BPMNPlane_0kkfbp4\"/>\n      \n  </bpmndi:BPMNDiagram>\n  \n</bpmn:definitions>")) throw new Error("Im BPMN wurde kein Aufruf einer Skript-Aktion gefunden.");
		return Rechnungsleser_Gutschriften_verschieben_v1_default.replace(pattern, `$1${actionId}$2`);
	}
	async function findCreditMemoScriptId(apiKey) {
		return findScriptIdByName(apiKey, CREDIT_MEMO_SCRIPT_NAME);
	}
	function normalizeGroupName(name) {
		return (name ?? "").normalize("NFC").replace(/\s+/g, " ").trim().toLowerCase();
	}
	async function loadGroups(apiKey) {
		const [management, scim] = await Promise.all([getAllGroups(BASE_URI$1, apiKey).then((r) => r.body.groups ?? []).catch(() => []), getGroups(BASE_URI$1, apiKey).then((r) => r.body.resources ?? []).catch(() => [])]);
		const groups = /* @__PURE__ */ new Map();
		for (const group of management) if (group.id && group.name) groups.set(group.id.toLowerCase(), {
			id: group.id,
			name: group.name
		});
		for (const group of scim) if (group.id && group.displayName && !groups.has(group.id.toLowerCase())) groups.set(group.id.toLowerCase(), {
			id: group.id,
			name: group.displayName
		});
		if (groups.size === 0) throw new Error("Gruppen konnten nicht geladen werden - ist der API-Key gültig?");
		return [...groups.values()];
	}
	function findGroupId(groups, name, id) {
		const wanted = normalizeGroupName(name);
		return groups.find((group) => id && group.id.toLowerCase() === id.toLowerCase() || normalizeGroupName(group.name) === wanted)?.id;
	}
	function findGroup(groups, name, id) {
		const groupId = findGroupId(groups, name, id);
		return groups.find((group) => group.id === groupId);
	}
	function newGroupBody(name, id, userMembers) {
		return {
			name,
			id,
			isGlobalGroup: false,
			isScimProvisioned: false,
			isTenantAdminGroup: false,
			showChangeToGlobalGroupButton: true,
			groupTypes: [],
			groupMembers: [],
			idpGroupMembers: [],
			userMembers,
			idpUserMembers: []
		};
	}
	var impersonationAdded = false;
	var DOCUMENT_READER_APP = "classcon-documentreader";
	async function targetEndpointSettings(apiKey) {
		return {
			ApiKey: apiKey,
			RepositoryId: await getRepositoryId(apiKey),
			D3Owner: "Editor",
			EndpointServiceOutputStructure: "MainDocWithAttachments"
		};
	}
	function companiesCsv(list) {
		return buildMasterFileCsv(COMPANY_COLUMNS.map((column) => column.key), list.map((company) => COMPANY_COLUMNS.map((column) => company[column.key] ?? "")));
	}
	async function isEndpointConfigured(apiKey, name) {
		return (await getConfiguredEndpointServices(BASE_URI$1, apiKey, await findDocumentReaderSubscriptionId(apiKey))).includes(name);
	}
	function sftpEndpointSettings() {
		return {
			Host: config.sftp.host.trim(),
			Port: config.sftp.port.trim(),
			User: config.sftp.user.trim(),
			Password: config.sftp.password,
			Directory: config.sftp.directory.trim()
		};
	}
	var SFTP_DOCUMENT_CLASS = "INV_Standard";
	var SFTP_EXPORT_MAPPING = {
		AttributeMappings: [{
			JsonOutputName: "exportXML",
			AttributeName: "exportXML",
			DefaultValue: "",
			ServiceBusDataType: "String",
			Export: true
		}],
		IsCustomTemplate: true,
		StyleSheet: sftpExportStylesheet_default,
		DefaultStyleSheetName: "",
		ServiceBusExportType: "XML"
	};
	async function readSftpEndpoint(apiKey) {
		try {
			return await getSftpEndpointService(BASE_URI$1, apiKey, await findDocumentReaderSubscriptionId(apiKey));
		} catch {
			return;
		}
	}
	function veoMetadataSettings() {
		return {
			ServiceBusConnectionString: config.veo.connectionString.trim(),
			QueueName: config.veo.queueName.trim(),
			ReferencedTargetSystem: "D3EndpointService",
			Properties: [
				{
					Name: "DvelopTenant",
					Value: SUBDOMAIN
				},
				{
					Name: "GWSNo",
					Value: config.veo.gwsNo.trim()
				},
				{
					Name: "ExportType",
					Value: "JSON"
				},
				{
					Name: "type",
					Value: "docreader"
				},
				{
					Name: "subtype",
					Value: "rechnung"
				},
				{
					Name: "erptype",
					Value: "veo"
				},
				{
					Name: "CustomerId",
					Value: "DynamicProp_debitorMapping"
				}
			]
		};
	}
	function samePropertyList(a, b) {
		const key = (list) => list.map((p) => `${p.Name}=${p.Value}`).sort().join("\n");
		return !!a && key(a) === key(b);
	}
	async function readMetadataEndpoint(apiKey) {
		try {
			return await getMetadataEndpointService(BASE_URI$1, apiKey, await findDocumentReaderSubscriptionId(apiKey));
		} catch {
			return;
		}
	}
	async function readEndpointService(apiKey) {
		try {
			return await getD3EndpointService(BASE_URI$1, apiKey, await findDocumentReaderSubscriptionId(apiKey));
		} catch {
			return;
		}
	}
	var documentReaderSubscriptionId = "";
	async function findDocumentReaderSubscriptionId(apiKey) {
		if (documentReaderSubscriptionId) return documentReaderSubscriptionId;
		const fromApps = await getApps(BASE_URI$1, apiKey).then((r) => r.body.widgets?.find((w) => w.id === "classcon-documentreader/indexing")?.target_uri?.split("/").pop()).catch(() => void 0);
		const fromFeatures = fromApps ? void 0 : await getDocumentReaderFeatures(BASE_URI$1, apiKey).then((r) => r.body.features?.find((f) => f.url?.includes("classcon-documentreader"))?.url?.split("/").pop()).catch(() => void 0);
		const subscriptionId = fromApps || fromFeatures;
		if (!subscriptionId) throw new Error("Subscription-ID des Rechnungslesers nicht gefunden - ist der Rechnungsleser im Mandanten gebucht?");
		documentReaderSubscriptionId = subscriptionId;
		return subscriptionId;
	}
	async function initGroupSelection(apiKey) {
		config.availableGroups = (await loadGroups(apiKey)).sort((a, b) => a.name.localeCompare(b.name, "de"));
		config.groupsLoadedFor = apiKey;
		if (config.groupChoiceTouched || config.selectedGroupId && config.availableGroups.some((group) => group.id === config.selectedGroupId)) return;
		const standard = findGroup(config.availableGroups, GROUP_FRUEHES_SCANNEN_NAME);
		if (standard) {
			config.groupMode = "existing";
			config.selectedGroupId = standard.id;
		}
	}
	async function resolveTargetGroup(apiKey) {
		const groups = await loadGroups(apiKey);
		if (config.groupMode === "existing") {
			const group = groups.find((g) => g.id === config.selectedGroupId);
			if (!group) throw new Error("Bitte in der Konfiguration eine vorhandene Gruppe auswählen.");
			return group;
		}
		const group = findGroup(groups, config.newGroupName);
		if (!group) throw new Error(`Gruppe „${config.newGroupName}“ existiert noch nicht - bitte zuerst den Schritt „Berechtigungsgruppe“ ausführen.`);
		return group;
	}
	function exists(text) {
		return {
			state: "exists",
			text
		};
	}
	function mailboxMatches(mailbox, name) {
		return mailbox === name || !!mailbox?.startsWith(`${name}@`);
	}
	async function findMailbox(apiKey, name) {
		return ((await getEmailinboundProfiles(BASE_URI$1, apiKey)).body.mailStoreSettings ?? []).find((setting) => mailboxMatches(setting.mailbox, name));
	}
	async function findBatchProfile(apiKey, name) {
		return ((await getBatchProfiles(BASE_URI$1, apiKey)).body.profiles ?? []).find((profile) => profile.name === name);
	}
	function unique(values) {
		return [...new Set(values.filter((value) => !!value))];
	}
	function batchProfileStep(id, template) {
		return {
			id,
			title: `Stapelprofil „${template.name}“`,
			description: "Eingangsverarbeitung, berechtigt wird die Gruppe aus Schritt 1 - ein vorhandenes Profil wird mit den Einstellungen der Vorlage aktualisiert.",
			async check(apiKey) {
				return await findBatchProfile(apiKey, template.name) ? exists("Vorhanden - Einstellungen werden aktualisiert.") : missing("Profil fehlt.");
			},
			async run(apiKey) {
				const group = await resolveTargetGroup(apiKey);
				const body = {
					...template,
					authorizedGroups: [{
						id: group.id,
						displayName: group.name,
						elementType: 1
					}]
				};
				const existing = await findBatchProfile(apiKey, template.name);
				if (existing) {
					await updateBatchProfile(BASE_URI$1, apiKey, existing, body);
					return "Profil aktualisiert.";
				}
				await createBatchProfile(BASE_URI$1, apiKey, body);
				return "Profil angelegt.";
			}
		};
	}
	function mailboxStep(entry) {
		return {
			id: `mailbox-${entry.mailbox}`,
			title: `Postfach „${entry.mailbox}“`,
			description: `${entry.mailbox}@${SUBDOMAIN}.emailinbound… → Stapelprofil „${entry.profileName}“, berechtigt wird die Gruppe aus Schritt 1.`,
			async check(apiKey) {
				return await findMailbox(apiKey, entry.mailbox) ? exists("Vorhanden - Einstellungen werden aktualisiert.") : missing("Postfach fehlt.");
			},
			async run(apiKey) {
				const adminGroupId = findGroupId(await loadGroups(apiKey), ADMIN_GROUP_NAME);
				if (!adminGroupId) throw new Error(`Gruppe „${ADMIN_GROUP_NAME}“ nicht gefunden.`);
				const scanGroupId = (await resolveTargetGroup(apiKey)).id;
				const profileId = (await findBatchProfile(apiKey, entry.profileName))?.batchProfileId;
				if (!profileId) throw new Error(`Stapelprofil „${entry.profileName}“ nicht gefunden - bitte zuerst das Stapelprofil anlegen.`);
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
					authorizedInboundGroupIds: unique([adminGroupId, scanGroupId]),
					authorizedInboundUserIds: existing?.authorizedInboundUserIds ?? [],
					informOnErrorGroupIds: unique([...existing?.informOnErrorGroupIds ?? [], adminGroupId]),
					informOnErrorUserIds: existing?.informOnErrorUserIds ?? [],
					batchProperties: [],
					documentProperties: []
				};
				if (existing) {
					await updateEmailinboundProfile(BASE_URI$1, apiKey, existing, payload);
					return "Postfach aktualisiert.";
				}
				await createEmailinboundProfiles(BASE_URI$1, apiKey, payload);
				return "Postfach angelegt.";
			}
		};
	}
	async function findSourceMapping(apiKey) {
		const repositoryId = await getRepositoryId(apiKey);
		return {
			repositoryId,
			existing: ((await getMappingContainers(BASE_URI$1, apiKey, repositoryId)).body.containers ?? []).find((c) => c.sourceId === SOURCE_MAPPING.sourceId)
		};
	}
	function actionScriptStep(options) {
		const { id, title, scriptName, content, actionDescription, inputDocId, variables, variablesText } = options;
		return {
			id,
			title,
			description: `„${scriptName}“ als Aktion mit Eingabeparameter „${inputDocId}“ - beim Anlegen werden ${variablesText} hinterlegt, bei einem vorhandenen Skript nur Code und Aktion aktualisiert; hinterlegte Werte bleiben unverändert.`,
			async check(apiKey) {
				const found = await findScriptByName(apiKey, scriptName);
				return found ? exists(`Vorhanden - Code und Aktion werden aktualisiert.${legacyNameNote(found, scriptName)}`) : missing("Skript fehlt.");
			},
			async run(apiKey) {
				let scriptId = await findScriptIdByName(apiKey, scriptName);
				const createdNow = !scriptId;
				if (!scriptId) {
					scriptId = (await createScript(BASE_URI$1, apiKey, scriptName)).body.id;
					if (!scriptId) throw new Error(`„${scriptName}“ konnte nicht angelegt werden (keine Id).`);
				}
				const versionId = (await getScriptVersion(BASE_URI$1, apiKey, scriptId)).body[0]?.id;
				if (!versionId) throw new Error(`Für „${scriptName}“ wurde keine Version gefunden.`);
				const body = {
					content,
					actionEnabled: true,
					action: {
						display_name: { de: scriptName },
						description: { de: actionDescription },
						volatile: true,
						execution_mode: "Synchron",
						input_properties: [{
							id: inputDocId,
							type: "String",
							title: { de: "Dokument-ID" },
							required: true
						}],
						output_properties: []
					}
				};
				if (createdNow) body.customerVariables = [{
					key: "apiKey",
					value: apiKey,
					encrypted: true
				}, ...variables];
				await patchScript(BASE_URI$1, apiKey, scriptId, versionId, body);
				return createdNow ? "Skript als Aktion angelegt." : "Code und Aktion aktualisiert.";
			}
		};
	}
	function hookScriptStep(options) {
		const { id, scriptName, content, description, withApiKey } = options;
		return {
			id,
			title: `Skript „${scriptName}“`,
			description,
			async check(apiKey) {
				const found = await findScriptByName(apiKey, scriptName);
				return found ? exists(`Vorhanden - Code wird aktualisiert.${legacyNameNote(found, scriptName)}`) : missing("Skript fehlt.");
			},
			async run(apiKey) {
				let scriptId = await findScriptIdByName(apiKey, scriptName);
				const createdNow = !scriptId;
				if (!scriptId) {
					scriptId = (await createScript(BASE_URI$1, apiKey, scriptName)).body.id;
					if (!scriptId) throw new Error(`„${scriptName}“ konnte nicht angelegt werden (keine Id).`);
				}
				const versionId = (await getScriptVersion(BASE_URI$1, apiKey, scriptId)).body[0]?.id;
				if (!versionId) throw new Error(`Für „${scriptName}“ wurde keine Version gefunden.`);
				const body = { content };
				if (createdNow && withApiKey) body.customerVariables = [{
					key: "apiKey",
					value: apiKey,
					encrypted: true
				}];
				await patchScript(BASE_URI$1, apiKey, scriptId, versionId, body);
				return createdNow ? "Skript angelegt." : "Code aktualisiert.";
			}
		};
	}
	async function updateExtensionPoint(apiKey, nodeId, profile, change) {
		const subscriptionId = await findDocumentReaderSubscriptionId(apiKey);
		const points = await getExtensionPoints(BASE_URI$1, apiKey, subscriptionId);
		const index = points.findIndex((p) => p.NodeId === nodeId);
		const base = index >= 0 ? points[index] : {
			NodeId: nodeId,
			IsActivated: false,
			ExtensionPointType: "",
			ConnectionString: "",
			QueueName: "",
			ScriptingAppEndpoint: "",
			ScriptingEngineProfile: profile
		};
		const next = [...points];
		const updated = change({
			...base,
			ScriptingEngineProfile: base.ScriptingEngineProfile || profile
		});
		if (index >= 0) next[index] = updated;
		else next.push(updated);
		await saveExtensionPoints(BASE_URI$1, apiKey, subscriptionId, next);
	}
	async function findExtensionPoint(apiKey, nodeId) {
		return (await getExtensionPoints(BASE_URI$1, apiKey, await findDocumentReaderSubscriptionId(apiKey))).find((p) => p.NodeId === nodeId);
	}
	function extensionPointActivateStep(options) {
		const { id, title, nodeId, profile } = options;
		return {
			id,
			title,
			description: `Aktiviert ${nodeId} im Rechnungsleser. Typ und hinterlegtes Skript bleiben unverändert, alle übrigen Extension Points ebenfalls.`,
			async check(apiKey) {
				const point = await findExtensionPoint(apiKey, nodeId);
				if (!point) return missing(`${nodeId} nicht gefunden - wird ergänzt und aktiviert.`);
				return point.IsActivated ? done("Aktiv.") : missing("Nicht aktiv.");
			},
			async run(apiKey) {
				await updateExtensionPoint(apiKey, nodeId, profile, (point) => ({
					...point,
					IsActivated: true
				}));
				return "Aktiviert.";
			}
		};
	}
	function extensionPointAssignStep(options) {
		const { id, title, nodeId, profile, scriptName } = options;
		const isAssigned = (point, endpoint) => !!point && point.ExtensionPointType === "ScriptingApp" && point.ScriptingAppEndpoint === endpoint;
		return {
			id,
			title,
			description: `Hinterlegt das Skript „${scriptName}“ an ${nodeId} (Typ ScriptingApp). Alle übrigen Extension Points bleiben unverändert - sie werden vorher gelesen und unverändert mitgesendet.`,
			async check(apiKey) {
				const scriptId = await findScriptIdByName(apiKey, scriptName);
				if (!scriptId) return missing("Skript fehlt noch.");
				const point = await findExtensionPoint(apiKey, nodeId);
				if (isAssigned(point, scriptRunUrl(scriptId))) return done(`Ruft „${scriptName}“ auf.`);
				if (!point) return missing(`${nodeId} nicht gefunden - wird ergänzt.`);
				const current = point.ExtensionPointType === "ScriptingApp" ? point.ScriptingAppEndpoint : point.ExtensionPointType;
				return current ? exists(`Aktuell: ${current} - wird auf „${scriptName}“ umgestellt.`) : missing("Kein Skript hinterlegt.");
			},
			async beforeRun(apiKey) {
				const scriptId = await findScriptIdByName(apiKey, scriptName);
				const point = await findExtensionPoint(apiKey, nodeId);
				if (!point?.IsActivated || !point.ExtensionPointType || scriptId && isAssigned(point, scriptRunUrl(scriptId))) return true;
				const current = point.ExtensionPointType === "ScriptingApp" ? `ScriptingApp <code>${escapeHtml(point.ScriptingAppEndpoint)}</code>` : escapeHtml(point.ExtensionPointType);
				return confirmWarning("Extension Point umstellen?", `<strong>Achtung:</strong> ${escapeHtml(nodeId)} ist aktiv und nutzt aktuell ${current}. Er wird auf das Skript „${escapeHtml(scriptName)}“ (ScriptingApp) umgestellt - die bisherige Verarbeitung an dieser Stelle entfällt.`, "Umstellen");
			},
			async run(apiKey) {
				const scriptId = await findScriptIdByName(apiKey, scriptName);
				if (!scriptId) throw new Error(`Skript „${scriptName}“ nicht gefunden - bitte zuerst das Skript anlegen.`);
				const endpoint = scriptRunUrl(scriptId);
				if (isAssigned(await findExtensionPoint(apiKey, nodeId), endpoint)) return "Bereits hinterlegt.";
				await updateExtensionPoint(apiKey, nodeId, profile, (point) => ({
					...point,
					ExtensionPointType: "ScriptingApp",
					ScriptingAppEndpoint: endpoint
				}));
				return `„${scriptName}“ hinterlegt.`;
			}
		};
	}
	function extensionPointStep(options) {
		const { id, title, nodeId, profile, scriptName } = options;
		return {
			id,
			title,
			description: `Aktiviert ${nodeId} im Rechnungsleser und hinterlegt das Skript „${scriptName}“ (ScriptingApp). Alle übrigen Extension Points bleiben unverändert - sie werden vorher gelesen und unverändert mitgesendet.`,
			async check(apiKey) {
				const scriptId = await findScriptIdByName(apiKey, scriptName);
				if (!scriptId) return missing("Skript fehlt noch.");
				const point = (await getExtensionPoints(BASE_URI$1, apiKey, await findDocumentReaderSubscriptionId(apiKey))).find((p) => p.NodeId === nodeId);
				if (isHookConfigured(point, scriptRunUrl(scriptId))) return done(`Aktiv, ruft „${scriptName}“ auf.`);
				if (!point) return missing(`${nodeId} nicht gefunden - wird ergänzt.`);
				const current = point.ExtensionPointType === "ScriptingApp" ? point.ScriptingAppEndpoint : point.ExtensionPointType;
				return point.IsActivated || point.ScriptingAppEndpoint ? exists(`Aktuell: ${point.IsActivated ? "aktiv" : "inaktiv"}${current ? `, ${current}` : ""} - wird auf „${scriptName}“ umgestellt.`) : missing("Nicht aktiv.");
			},
			async beforeRun(apiKey) {
				const scriptId = await findScriptIdByName(apiKey, scriptName);
				const point = (await getExtensionPoints(BASE_URI$1, apiKey, await findDocumentReaderSubscriptionId(apiKey))).find((p) => p.NodeId === nodeId);
				if (!point?.IsActivated || scriptId && isHookConfigured(point, scriptRunUrl(scriptId))) return true;
				const current = point.ExtensionPointType === "ScriptingApp" ? `ScriptingApp <code>${escapeHtml(point.ScriptingAppEndpoint)}</code>` : escapeHtml(point.ExtensionPointType || "unbekannt");
				return confirmWarning("Extension Point umstellen?", `<strong>Achtung:</strong> ${escapeHtml(nodeId)} ist bereits aktiv (${current}). Er wird auf das Skript „${escapeHtml(scriptName)}“ (ScriptingApp) umgestellt - die bisherige Verarbeitung an dieser Stelle entfällt.`, "Umstellen");
			},
			async run(apiKey) {
				const scriptId = await findScriptIdByName(apiKey, scriptName);
				if (!scriptId) throw new Error(`Skript „${scriptName}“ nicht gefunden - bitte zuerst das Skript anlegen.`);
				const subscriptionId = await findDocumentReaderSubscriptionId(apiKey);
				const points = await getExtensionPoints(BASE_URI$1, apiKey, subscriptionId);
				const endpoint = scriptRunUrl(scriptId);
				const index = points.findIndex((p) => p.NodeId === nodeId);
				if (index >= 0 && isHookConfigured(points[index], endpoint)) return "Bereits hinterlegt.";
				const updated = {
					...index >= 0 ? points[index] : {
						ConnectionString: "",
						QueueName: ""
					},
					NodeId: nodeId,
					IsActivated: true,
					ExtensionPointType: "ScriptingApp",
					ScriptingAppEndpoint: endpoint,
					ScriptingEngineProfile: index >= 0 && points[index].ScriptingEngineProfile || profile
				};
				const next = [...points];
				if (index >= 0) next[index] = updated;
				else next.push(updated);
				await saveExtensionPoints(BASE_URI$1, apiKey, subscriptionId, next);
				return `„${scriptName}“ hinterlegt und aktiviert.`;
			}
		};
	}
	var steps = [
		{
			id: "targetGroup",
			title: "Berechtigungsgruppe",
			description: "Die in der Konfiguration gewählte Gruppe, die in den Stapelprofilen und Postfächern berechtigt wird. Eine neue Gruppe wird hier angelegt, eine vorhandene bleibt unverändert.",
			async check(apiKey) {
				const groups = await loadGroups(apiKey);
				if (config.groupMode === "existing") {
					const group = groups.find((g) => g.id === config.selectedGroupId);
					return group ? done(`Verwendet: „${group.name}“.`) : missing("Bitte eine vorhandene Gruppe auswählen.");
				}
				if (!config.newGroupName.trim()) return missing("Bitte einen Gruppennamen eingeben.");
				const group = findGroup(groups, config.newGroupName);
				return group ? done(`„${group.name}“ existiert bereits und wird verwendet.`) : missing(`„${config.newGroupName.trim()}“ wird angelegt.`);
			},
			async run(apiKey) {
				if (config.groupMode === "existing") return `Verwendet: „${(await resolveTargetGroup(apiKey)).name}“.`;
				const name = config.newGroupName.trim();
				if (!name) throw new Error("Bitte einen Gruppennamen eingeben.");
				if (findGroup(await loadGroups(apiKey), name)) return "Bereits vorhanden - wird verwendet.";
				await createGroup(BASE_URI$1, apiKey, newGroupBody(name, crypto.randomUUID(), []));
				config.availableGroups = (await loadGroups(apiKey)).sort((a, b) => a.name.localeCompare(b.name, "de"));
				return `Gruppe „${name}“ angelegt.`;
			}
		},
		batchProfileStep("profileMail", batchProfileMail_default),
		batchProfileStep("profileScan", batchProfileScan_default),
		...MAILBOXES.map(mailboxStep),
		{
			id: "webindex",
			title: "Webindex-Layout",
			description: "Ersetzt das Webindex-Designer-Layout des Rechnungslesers durch die gevis-ECM-Vorlage.",
			beforeRun: confirmWebindexOverwrite,
			async check() {
				return {
					state: "manual",
					text: "Nicht prüfbar - wird beim Ausführen überschrieben."
				};
			},
			async run(apiKey) {
				await replaceDocumentReaderWebindexForm(BASE_URI$1, apiKey, JSON.stringify(webindexDesignerForm_default));
				return "Layout ersetzt.";
			}
		},
		{
			id: "sourceMapping",
			title: "Quell-Mapping „Rechnungsleser“",
			description: `Zuordnung der Rechnungsleser-Felder zu den DMS-Eigenschaften (erstes Repository, Quelle ${SOURCE_MAPPING.sourceId}). Bei einem vorhandenen Mapping werden die Vorlagen-Zuordnungen aktualisiert bzw. ergänzt, weitere Zuordnungen bleiben erhalten.`,
			async beforeRun(apiKey) {
				const { existing } = await findSourceMapping(apiKey);
				if (!existing) return true;
				const current = (await getMappingContainer(BASE_URI$1, apiKey, existing)).body;
				const changes = (SOURCE_MAPPING.mappingItems ?? []).flatMap((item) => {
					const before = current.mappingItems?.find((existingItem) => existingItem.source === item.source);
					return before && before.destination !== item.destination ? [`<li><code>${escapeHtml(item.source ?? "")}</code>: ${escapeHtml(before.destination ?? "–")} → ${escapeHtml(item.destination ?? "–")}</li>`] : [];
				});
				if (changes.length === 0) return true;
				return confirmWarning("Achtung: Zuordnungen werden geändert", `Im Quell-Mapping „${escapeHtml(current.name ?? existing.name ?? "")}“ zeigen folgende Felder danach auf ein <strong>anderes Ziel</strong>:
         <ul style="text-align:left;font-size:0.85em;margin-top:8px">${changes.join("")}</ul>
         Neue Felder werden ergänzt, alle übrigen Zuordnungen bleiben unverändert.`, "Zuordnungen ändern");
			},
			async check(apiKey) {
				const { existing } = await findSourceMapping(apiKey);
				return existing ? exists(`Vorhanden als „${existing.name ?? SOURCE_MAPPING.name}“ - Zuordnungen werden aktualisiert.`) : missing("Mapping fehlt.");
			},
			async run(apiKey) {
				const { repositoryId, existing } = await findSourceMapping(apiKey);
				if (!existing) {
					await createSourceMapping(BASE_URI$1, apiKey, repositoryId, SOURCE_MAPPING);
					return "Quell-Mapping angelegt.";
				}
				const current = (await getMappingContainer(BASE_URI$1, apiKey, existing)).body;
				const items = [...current.mappingItems ?? []];
				let updated = 0;
				let added = 0;
				for (const item of SOURCE_MAPPING.mappingItems ?? []) {
					const index = items.findIndex((existingItem) => existingItem.source === item.source);
					if (index >= 0) {
						items[index] = {
							...items[index],
							...item
						};
						updated++;
					} else {
						items.push({ ...item });
						added++;
					}
				}
				const id = current.id ?? existing._links?.self?.href?.split("/").pop();
				await updateMappingContainer(BASE_URI$1, apiKey, repositoryId, {
					name: current.name ?? existing.name,
					id,
					sourceId: current.sourceId ?? existing.sourceId,
					mappingItems: items
				});
				return `Quell-Mapping aktualisiert (${updated} geändert, ${added} ergänzt, ${items.length - updated - added} weitere beibehalten).`;
			}
		},
		actionScriptStep({
			id: "creditMemoScript",
			title: "Skript „Gutschriften verschieben“",
			scriptName: CREDIT_MEMO_SCRIPT_NAME,
			content: gutschriftenVerschieben_default,
			actionDescription: "Verschiebt eine Gutschrift des Rechnungslesers in die Gutschrift-Kategorie bzw. kennzeichnet das Dokument als Rechnung.",
			inputDocId: CREDIT_MEMO_INPUT_DOC_ID,
			variables: CREDIT_MEMO_VARIABLES,
			variablesText: "API-Key und Kategorien"
		}),
		actionScriptStep({
			id: "documentTypeScript",
			title: `Skript „${DOCUMENT_TYPE_SCRIPT_NAME}“`,
			scriptName: DOCUMENT_TYPE_SCRIPT_NAME,
			content: dokumenttypAnpassen_default,
			actionDescription: "Setzt den Dokumenttyp im DMS vom ERP-Code auf den Klartext: 2 = Rechnung, 3 = Gutschrift.",
			inputDocId: DOCUMENT_TYPE_INPUT_DOC_ID,
			variables: DOCUMENT_TYPE_VARIABLES,
			variablesText: "API-Key und Dokumenttyp-Eigenschaft"
		}),
		hookScriptStep({
			id: "preExportScript",
			scriptName: PRE_EXPORT_SCRIPT_NAME,
			content: preExport_default,
			description: "Wird vom Rechnungsleser vor dem Export aufgerufen: setzt DocumentType auf den ERP-Code (Gutschrift 3, sonst 2) - alle übrigen Attribute bleiben unverändert. Ein vorhandenes Skript bekommt nur den aktuellen Code."
		}),
		extensionPointStep({
			id: "beforeExportHook",
			title: "Extension Point „vor dem Export“",
			nodeId: BEFORE_EXPORT_NODE_ID,
			profile: BEFORE_EXPORT_PROFILE,
			scriptName: PRE_EXPORT_SCRIPT_NAME
		}),
		hookScriptStep({
			id: "duplicateDetectionScript",
			scriptName: DUPLICATE_DETECTION_SCRIPT_NAME,
			content: duplicateDetection_default,
			withApiKey: true,
			description: "Wird vom Rechnungsleser nach der Extraktion aufgerufen und sucht per SQL im Protokoll des Rechnungslesers nach Rechnungen mit gleicher Lieferantennummer und Rechnungsnummer. Beim Neuanlegen wird der API-Key hinterlegt; ein vorhandenes Skript bekommt nur den aktuellen Code."
		}),
		extensionPointActivateStep({
			id: "postExtractionActivate",
			title: "Extension Point „nach der Extraktion“ aktivieren",
			nodeId: POST_EXTRACTION_NODE_ID,
			profile: POST_EXTRACTION_PROFILE
		}),
		extensionPointAssignStep({
			id: "postExtractionAssign",
			title: "Extension Point „nach der Extraktion“: Skript hinterlegen",
			nodeId: POST_EXTRACTION_NODE_ID,
			profile: POST_EXTRACTION_PROFILE,
			scriptName: DUPLICATE_DETECTION_SCRIPT_NAME
		}),
		{
			id: "eventbridgeHook",
			title: "Eventbridge: DMS-Ereignis aktivieren",
			description: "Aktiviert das DMS-Ereignis „dmspostimport“ in der Eventbridge. Beliebig wiederholbar.",
			async check(apiKey) {
				const event = (await getEventbridgeConfig(BASE_URI$1, apiKey)).events?.find((e) => e.id === "dmspostimport");
				return event?.enabled ? done("„dmspostimport“ ist aktiv.") : missing(event ? "„dmspostimport“ ist deaktiviert." : "„dmspostimport“ ist nicht eingerichtet.");
			},
			async run(apiKey) {
				await setDmspostimport(BASE_URI$1, apiKey, true);
				return "„dmspostimport“ aktiviert.";
			}
		},
		{
			id: "eventbridgeSync",
			title: "Eventbridge synchronisieren",
			description: "Synchronisiert die Eventbridge mit dem DMS-Repository - dabei wird der Webhook für „dmspostimport“ im DMS angelegt. Wird pauschal ausgeführt, beliebig wiederholbar.",
			async check(apiKey) {
				const repositoryId = await getRepositoryId(apiKey);
				const sync = (await getEventbridgeConfig(BASE_URI$1, apiKey)).dmsSynchronization?.find((entry) => entry.repoId === repositoryId);
				const when = sync?.lastUpdateTime ? new Date(sync.lastUpdateTime).toLocaleString("de-DE") : "";
				return exists(when ? `Zuletzt synchronisiert am ${when} - wird erneut synchronisiert.` : "Wird synchronisiert.");
			},
			async run(apiKey) {
				await synchronizeEventbride(BASE_URI$1, apiKey, await getRepositoryId(apiKey));
				return "Synchronisierung ausgeführt.";
			}
		},
		{
			id: "creditMemoProcess",
			title: `Prozess „${bpmnProcessInfo(Rechnungsleser_Gutschriften_verschieben_v1_default).name}“`,
			description: "Startet bei der Ablage einer Gutschrift (Eventbridge „dmspostimport“) die Aktion „Gutschriften verschieben“ - benötigt Skript und Eventbridge. Die Aktions-Id im BPMN wird beim Hochladen auf das Skript dieses Mandanten gesetzt; ein vorhandener Prozess bekommt eine neue Version.",
			async check(apiKey) {
				const { id, name } = bpmnProcessInfo(Rechnungsleser_Gutschriften_verschieben_v1_default);
				return await componentExists(BASE_URI$1, apiKey, id, name, "process") ? exists("Vorhanden - wird als neue Version deployt.") : missing("Prozess fehlt.");
			},
			async run(apiKey) {
				const content = await bpmnForTenant(apiKey);
				const { id, name } = bpmnProcessInfo(content);
				const existedBefore = await componentExists(BASE_URI$1, apiKey, id, name, "process");
				await resolveComponent(BASE_URI$1, apiKey, "process", content);
				await deployProcess(BASE_URI$1, apiKey, content);
				return existedBefore ? "Neue Version deployt." : "Prozess deployt.";
			}
		},
		{
			id: "duplicateCheck",
			title: "Dublettenprüfung ausschalten",
			description: "Schaltet die Dublettenprüfung („DuplicateCheck“) in der Dokumentverarbeitung des Rechnungslesers aus. Beliebig wiederholbar.",
			async check(apiKey) {
				const settings = await getDocumentProcessingConfiguration(BASE_URI$1, apiKey, await findDocumentReaderSubscriptionId(apiKey));
				if (!("DuplicateCheck" in settings)) return missing("Einstellung „DuplicateCheck“ nicht gefunden - wird ausgeschaltet.");
				return settings.DuplicateCheck ? missing("Dublettenprüfung ist eingeschaltet.") : done("Dublettenprüfung ist ausgeschaltet.");
			},
			async run(apiKey) {
				await setDocumentProcessingConfiguration(BASE_URI$1, apiKey, await findDocumentReaderSubscriptionId(apiKey), "DuplicateCheck", false);
				return "Dublettenprüfung ausgeschaltet.";
			}
		},
		{
			id: "masterDataCompanies",
			title: "Stammdaten: Mandanten",
			skipReason: () => filledCompanies().length ? void 0 : "Keine Mandanten erfasst - Stammdaten werden nicht angepasst.",
			description: `Erzeugt aus den Mandanten der Konfiguration ${COMPANY_FILE_NAME} und lädt sie in die Stammdaten des Rechnungslesers hoch. Die vorhandene Datei wird ersetzt.`,
			beforeRun: () => confirmWarning("Stammdaten ersetzen?", `<strong>Achtung:</strong> ${COMPANY_FILE_NAME} wird mit ${filledCompanies().length} Mandant(en) aus der Konfiguration hochgeladen und ersetzt die vorhandenen Mandanten-Stammdaten.`, "Hochladen"),
			async check() {
				return {
					state: "manual",
					text: `${filledCompanies().length} Mandant(en) aus der Konfiguration - nicht prüfbar, wird beim Ausführen hochgeladen.`
				};
			},
			async run(apiKey) {
				if (!filledCompanies().length) throw new Error("Keine Mandanten erfasst - bitte in der Konfiguration eintragen.");
				await uploadMasterFile(BASE_URI$1, await findDocumentReaderSubscriptionId(apiKey), COMPANY_FILE_NAME, companiesCsv(filledCompanies()));
				return `${COMPANY_FILE_NAME} mit ${filledCompanies().length} Mandant(en) hochgeladen.`;
			}
		},
		{
			id: "targetSystem",
			title: "Zielsystem des Rechnungslesers",
			description: "Richtet das Zielsystem (d.3-Endpunkt) ein: dieses DMS-Repository, der API-Key aus der Konfiguration, Besitzer „Editor“, Ausgabe „Hauptdokument mit Anhängen“.",
			async check(apiKey) {
				if (!await isEndpointConfigured(apiKey, "D3EndpointService")) return missing("Nicht eingerichtet.");
				const current = await readEndpointService(apiKey);
				if (!current) return exists("Eingerichtet - Einstellungen nicht lesbar, werden beim Ausführen überschrieben.");
				const target = await targetEndpointSettings(apiKey);
				const sameSettings = current.RepositoryId === target.RepositoryId && current.D3Owner === target.D3Owner && current.EndpointServiceOutputStructure === target.EndpointServiceOutputStructure;
				if (sameSettings && current.ApiKey === target.ApiKey) return done("Eingerichtet.");
				if (sameSettings && current.ApiKey) return exists("Eingerichtet, aber mit einem anderen API-Key - wird auf den aktuellen umgestellt.");
				return current.RepositoryId ? exists("Abweichend eingerichtet - wird aktualisiert.") : missing("Nicht eingerichtet.");
			},
			async beforeRun(apiKey) {
				if (!await isEndpointConfigured(apiKey, "D3EndpointService")) return true;
				const current = await readEndpointService(apiKey);
				const target = await targetEndpointSettings(apiKey);
				if (current && current.RepositoryId === target.RepositoryId && current.ApiKey === target.ApiKey) return true;
				return confirmWarning("Zielsystem überschreiben?", `Der Rechnungsleser hat bereits ein Zielsystem „d.velop documents“${current?.RepositoryId ? ` (Repository <code>${current.RepositoryId}</code>)` : ""}. Es wird durch dieses Repository und den API-Key aus der Konfiguration ersetzt.`, "Überschreiben");
			},
			async run(apiKey) {
				await saveD3EndpointService(BASE_URI$1, apiKey, await findDocumentReaderSubscriptionId(apiKey), await targetEndpointSettings(apiKey));
				return "Zielsystem eingerichtet.";
			}
		},
		{
			id: "metadataEndpoint",
			title: "Metadaten-Endpunkt VEO (Service Bus)",
			erp: ["veo"],
			skipReason: () => isVeoConfigEmpty() ? SKIP_EMPTY_CONFIG : void 0,
			description: "Richtet den Metadaten-Endpunkt des Rechnungslesers für VEO ein: Service Bus Connection String und Queue aus der Konfiguration, Bezug auf das Zielsystem und die Eigenschaften DvelopTenant, GWSNo, ExportType, type, subtype, erptype und CustomerId.",
			async check(apiKey) {
				if (!await isEndpointConfigured(apiKey, "MetadataEndpointService")) return missing("Nicht eingerichtet.");
				const current = await readMetadataEndpoint(apiKey);
				if (!current) return exists("Eingerichtet - Einstellungen nicht lesbar, werden beim Ausführen überschrieben.");
				const target = veoMetadataSettings();
				const same = current.QueueName === target.QueueName && current.ReferencedTargetSystem === target.ReferencedTargetSystem && samePropertyList(current.Properties, target.Properties);
				if (same && current.ServiceBusConnectionString === target.ServiceBusConnectionString) return done(`Eingerichtet (Queue ${target.QueueName}).`);
				if (same) return exists("Eingerichtet, aber mit anderem Connection String - wird aktualisiert.");
				return current.QueueName ? exists(`Abweichend eingerichtet (Queue ${current.QueueName}) - wird aktualisiert.`) : missing("Nicht eingerichtet.");
			},
			async beforeRun(apiKey) {
				if (!await isEndpointConfigured(apiKey, "MetadataEndpointService")) return true;
				const current = await readMetadataEndpoint(apiKey);
				const target = veoMetadataSettings();
				if (current?.QueueName === target.QueueName) return true;
				return confirmWarning("Metadaten-Endpunkt überschreiben?", current?.QueueName ? `Der Rechnungsleser sendet aktuell an die Queue <code>${escapeHtml(current.QueueName)}</code>. Sie wird durch <code>${escapeHtml(target.QueueName)}</code> ersetzt.` : `Ein Metadaten-Endpunkt ist bereits eingerichtet. Er wird mit der Queue <code>${escapeHtml(target.QueueName)}</code> und den Angaben aus der Konfiguration überschrieben.`, "Überschreiben");
			},
			async run(apiKey) {
				await saveMetadataEndpointService(BASE_URI$1, apiKey, await findDocumentReaderSubscriptionId(apiKey), veoMetadataSettings());
				return "Metadaten-Endpunkt eingerichtet.";
			}
		},
		{
			id: "sftpEndpoint",
			title: "SFTP-Zielsystem gevis R-Linie",
			erp: ["gevisR"],
			skipReason: () => isSftpConfigEmpty() ? SKIP_EMPTY_CONFIG : void 0,
			description: "Richtet den SFTP-Server aus der Konfiguration als Zielsystem des Rechnungslesers ein (Host, Port, Benutzer, Kennwort, Verzeichnis).",
			async check(apiKey) {
				if (!await isEndpointConfigured(apiKey, "SftpEndpointService")) return missing("Nicht eingerichtet.");
				const current = await readSftpEndpoint(apiKey);
				if (!current) return exists("Eingerichtet - Einstellungen nicht lesbar, werden beim Ausführen überschrieben.");
				const target = sftpEndpointSettings();
				const same = current.Host === target.Host && current.Port === target.Port && current.User === target.User && current.Directory === target.Directory;
				if (same && (!current.Password || current.Password === target.Password)) return done(`Eingerichtet (${target.User}@${target.Host}:${target.Port}${target.Directory}).`);
				return exists(same ? "Eingerichtet, aber mit anderem Kennwort - wird aktualisiert." : `Abweichend eingerichtet (${current.User ?? "?"}@${current.Host ?? "?"}:${current.Port ?? "?"}${current.Directory ?? ""}) - wird aktualisiert.`);
			},
			async beforeRun(apiKey) {
				if (!await isEndpointConfigured(apiKey, "SftpEndpointService")) return true;
				const current = await readSftpEndpoint(apiKey);
				const target = sftpEndpointSettings();
				if (current && current.Host === target.Host && current.User === target.User && current.Directory === target.Directory) return true;
				return confirmWarning("SFTP-Zielsystem überschreiben?", current?.Host ? `Der Rechnungsleser übergibt aktuell an <code>${escapeHtml(`${current.User ?? ""}@${current.Host}:${current.Port ?? ""}${current.Directory ?? ""}`)}</code>. Das wird durch <code>${escapeHtml(`${target.User}@${target.Host}:${target.Port}${target.Directory}`)}</code> ersetzt.` : "Ein SFTP-Zielsystem ist bereits eingerichtet. Es wird mit den Angaben aus der Konfiguration überschrieben.", "Überschreiben");
			},
			async run(apiKey) {
				await saveSftpEndpointService(BASE_URI$1, apiKey, await findDocumentReaderSubscriptionId(apiKey), sftpEndpointSettings());
				return "SFTP-Zielsystem eingerichtet.";
			}
		},
		{
			id: "sftpExportMapping",
			title: "SFTP-Zielsystem: Export konfigurieren",
			erp: ["gevisR"],
			description: `Konfiguriert den Export des SFTP-Zielsystems für die Dokumentklasse ${SFTP_DOCUMENT_CLASS}: Attribut „exportXML“ wird exportiert und per XSLT-Vorlage als XML-Datei auf den SFTP-Server geschrieben.`,
			beforeRun: () => confirmWarning("Export-Konfiguration überschreiben?", `<strong>Achtung:</strong> Die Export-Konfiguration des SFTP-Zielsystems (Dokumentklasse ${SFTP_DOCUMENT_CLASS}) wird vollständig durch die Vorlage ersetzt - Attribut-Zuordnungen und XSLT-Vorlage. Die aktuelle Konfiguration wird nicht gesichert.`, "Überschreiben"),
			async check(apiKey) {
				if (!await isEndpointConfigured(apiKey, "SftpEndpointService")) return missing("SFTP-Zielsystem fehlt noch.");
				return {
					state: "manual",
					text: "Nicht prüfbar - wird beim Ausführen überschrieben."
				};
			},
			async run(apiKey) {
				if (!await isEndpointConfigured(apiKey, "SftpEndpointService")) throw new Error("Das SFTP-Zielsystem fehlt noch - bitte zuerst den Schritt „SFTP-Zielsystem gevis R-Linie“ ausführen.");
				await saveServiceBusEndpointMapping(BASE_URI$1, apiKey, await findDocumentReaderSubscriptionId(apiKey), "SftpEndpointService", SFTP_DOCUMENT_CLASS, SFTP_EXPORT_MAPPING);
				return "Export konfiguriert.";
			}
		},
		{
			id: "trustedApp",
			title: "Rechnungsleser als vertrauenswürdige App",
			description: `Trägt „${DOCUMENT_READER_APP}“ im Identityprovider als vertrauenswürdige App ein (darf im Namen von Benutzern handeln). Läuft mit der Anmeldung des aktuellen Benutzers - dafür sind Administrationsrechte nötig.`,
			async check() {
				if (impersonationAdded) return done("In dieser Sitzung eingetragen.");
				const whitelisted = await isAppImpersonationWhitelisted(BASE_URI$1, DOCUMENT_READER_APP);
				if (whitelisted) return done("Eingetragen.");
				return missing(whitelisted === false ? "Nicht eingetragen." : "Wird eingetragen.");
			},
			async run() {
				await addAppToImpersonationWhitelist(BASE_URI$1, DOCUMENT_READER_APP);
				impersonationAdded = true;
				return "Als vertrauenswürdige App eingetragen.";
			}
		}
	];
	//#endregion
	//#region src/forms/onboardingState.svelte.ts
	var BASE_URI = window.location.origin;
	function unknownStatuses() {
		return Object.fromEntries(steps.map((step) => [step.id, {
			state: "unknown",
			text: ""
		}]));
	}
	var view = proxy({
		page: "config",
		apiKey: "",
		statuses: unknownStatuses(),
		busy: false,
		message: void 0
	});
	/** Schritte, die für das gewählte ERP-System gelten. */
	function activeSteps() {
		return steps.filter((step) => !step.erp || config.erpSystem !== "" && step.erp.includes(config.erpSystem));
	}
	function resetStatuses() {
		view.statuses = unknownStatuses();
	}
	function setStatus(stepId, status) {
		view.statuses[stepId] = status;
	}
	function statusOf(step) {
		return view.statuses[step.id].state;
	}
	/** API-Key geändert: alte Prüfergebnisse gelten nicht mehr. */
	function setApiKey(value) {
		if (view.apiKey === value) return;
		view.apiKey = value;
		resetStatuses();
	}
	function groupLabel() {
		if (config.groupMode === "existing") return config.availableGroups.find((group) => group.id === config.selectedGroupId)?.name ?? "–";
		return `${config.newGroupName.trim()} (neu)`;
	}
	/** Lädt die Gruppen für den eingegebenen API-Key (einmal pro Key). */
	async function loadGroupChoices() {
		const key = view.apiKey.trim();
		if (!key || config.groupsLoading || config.groupsLoadedFor === key) return;
		config.groupsLoading = true;
		config.groupsError = "";
		try {
			await initGroupSelection(key);
		} catch (error) {
			config.availableGroups = [];
			config.groupsLoadedFor = "";
			config.groupsError = getErrorMessage(error);
		} finally {
			config.groupsLoading = false;
		}
	}
	function setGroupMode(mode) {
		config.groupMode = mode;
		config.groupChoiceTouched = true;
	}
	async function withBusy(action) {
		if (view.busy) return;
		view.busy = true;
		try {
			await action();
		} finally {
			view.busy = false;
		}
	}
	async function checkStep(step) {
		const skip = step.skipReason?.();
		if (skip) {
			setStatus(step.id, {
				state: "skipped",
				text: skip
			});
			return;
		}
		setStatus(step.id, {
			state: "checking",
			text: ""
		});
		try {
			setStatus(step.id, await step.check(view.apiKey.trim()));
		} catch (error) {
			getLogger().error(`Prüfung "${step.title}" fehlgeschlagen: ${getErrorMessage(error)}`);
			setStatus(step.id, {
				state: "error",
				text: getErrorMessage(error)
			});
		}
	}
	async function checkAll() {
		view.message = {
			kind: "info",
			text: "Status wird geprüft…"
		};
		for (const step of activeSteps()) await checkStep(step);
		const counts = activeSteps().map(statusOf);
		const open = counts.filter((state) => state === "missing").length;
		const existing = counts.filter((state) => state === "exists").length;
		const errors = counts.filter((state) => state === "error").length;
		const skipped = counts.filter((state) => state === "skipped").length;
		view.message = errors > 0 ? {
			kind: "error",
			text: `${errors} Schritt(e) konnten nicht geprüft werden - ist der API-Key gültig?`
		} : {
			kind: open > 0 ? "info" : "ok",
			text: `${open} fehlend, ${existing} vorhanden (können aktualisiert werden)${skipped ? `, ${skipped} übersprungen (Konfiguration leer)` : ""}.`
		};
	}
	function checkAllSteps() {
		return withBusy(checkAll);
	}
	async function runStep(step) {
		setStatus(step.id, {
			state: "running",
			text: ""
		});
		try {
			const result = await step.run(view.apiKey.trim());
			getLogger().info(`${step.title}: ${result}`);
			const status = await step.check(view.apiKey.trim());
			setStatus(step.id, status.state === "missing" || status.state === "error" ? {
				...status,
				text: `${result} ${status.text}`.trim()
			} : {
				state: "done",
				text: result
			});
			return true;
		} catch (error) {
			getLogger().error(`Schritt "${step.title}" fehlgeschlagen: ${getErrorMessage(error)}`);
			setStatus(step.id, {
				state: "error",
				text: getErrorMessage(error)
			});
			return false;
		}
	}
	async function runSingle(step) {
		const skip = step.skipReason?.();
		if (skip) {
			view.message = {
				kind: "info",
				text: `„${step.title}“: ${skip}`
			};
			return;
		}
		await withBusy(async () => {
			if (step.beforeRun) try {
				if (!await step.beforeRun(view.apiKey.trim())) return;
			} catch (error) {
				view.message = {
					kind: "error",
					text: getErrorMessage(error)
				};
				return;
			}
			view.message = await runStep(step) ? {
				kind: "ok",
				text: `„${step.title}“ ausgeführt.`
			} : {
				kind: "error",
				text: `„${step.title}“ ist fehlgeschlagen - Details in der Statusspalte.`
			};
		});
	}
	var ACTION_VERBS = {
		missing: "anlegen",
		exists: "aktualisieren",
		manual: "ausführen"
	};
	async function runBatch(states, title) {
		await withBusy(async () => {
			await checkAll();
			const todo = activeSteps().filter((step) => states.includes(statusOf(step)));
			if (todo.length === 0) {
				view.message = {
					kind: "ok",
					text: "Nichts zu tun."
				};
				return;
			}
			try {
				await ensureSwal();
			} catch (error) {
				view.message = {
					kind: "error",
					text: getErrorMessage(error)
				};
				return;
			}
			const list = todo.map((step) => `<li><strong>${escapeHtml(step.title)}</strong> – ${ACTION_VERBS[statusOf(step)] ?? "ausführen"}</li>`).join("");
			if (!(await Swal.fire({
				icon: "question",
				title,
				html: `<ul style="text-align:left;margin:0 auto;display:inline-block">${list}</ul>`,
				showCancelButton: true,
				confirmButtonText: "Ausführen",
				cancelButtonText: "Abbrechen"
			})).isConfirmed) {
				view.message = void 0;
				return;
			}
			for (const step of todo) {
				if (step.beforeRun && !await step.beforeRun(view.apiKey.trim())) {
					view.message = {
						kind: "info",
						text: `Abgebrochen bei „${step.title}“ - die Schritte davor wurden ausgeführt.`
					};
					return;
				}
				if (!await runStep(step)) {
					view.message = {
						kind: "error",
						text: `Abgebrochen bei „${step.title}“ - Details in der Statusspalte.`
					};
					return;
				}
			}
			view.message = {
				kind: "ok",
				text: `${todo.length} Schritt(e) ausgeführt.`
			};
		});
	}
	async function goToSteps() {
		const apiKey = view.apiKey.trim();
		if (!apiKey || config.erpSystem === "") {
			view.message = {
				kind: "error",
				text: "Bitte API-Key eingeben und das ERP-Zielsystem auswählen."
			};
			return;
		}
		const configError = (config.erpSystem === "veo" && !isVeoConfigEmpty() ? validateVeoConfig() : config.erpSystem === "gevisR" && !isSftpConfigEmpty() ? validateSftpConfig() : void 0) ?? (filledCompanies().length ? validateCompanies() : void 0);
		if (configError) {
			view.message = {
				kind: "error",
				text: configError
			};
			return;
		}
		let valid = false;
		await withBusy(async () => {
			view.message = {
				kind: "info",
				text: "API-Key wird geprüft…"
			};
			try {
				await getRepositoryId(apiKey);
				const firstLoad = config.groupsLoadedFor !== apiKey;
				await initGroupSelection(apiKey);
				if (firstLoad) {
					config.groupsError = "";
					view.message = {
						kind: "info",
						text: "Vorhandene Gruppen wurden geladen - bitte die Berechtigungsgruppe prüfen und erneut auf „Weiter“ klicken."
					};
					return;
				}
				valid = true;
			} catch (error) {
				view.message = {
					kind: "error",
					text: `Der API-Key funktioniert nicht: ${getErrorMessage(error)}`
				};
			}
		});
		if (!valid) return;
		const groupError = config.groupMode === "existing" ? config.availableGroups.some((group) => group.id === config.selectedGroupId) ? void 0 : "Bitte eine vorhandene Berechtigungsgruppe auswählen." : config.newGroupName.trim() ? void 0 : "Bitte einen Namen für die neue Berechtigungsgruppe eingeben.";
		if (groupError) {
			view.message = {
				kind: "error",
				text: groupError
			};
			return;
		}
		view.page = "steps";
		view.message = void 0;
		resetStatuses();
		await withBusy(checkAll);
	}
	function goToConfig() {
		view.page = "config";
		view.message = void 0;
	}
	var currentUserId;
	function getCookie(name) {
		return document.cookie.split("; ").find((row) => row.startsWith(`${name}=`))?.split("=")[1];
	}
	async function getCurrentUserId() {
		if (!currentUserId) currentUserId = (await getCurrentUserInformation(BASE_URI, getCookie("AuthSessionId") || null)).body.id;
		return currentUserId;
	}
	function userLabel(user) {
		const name = `${user.name?.givenName ?? ""} ${user.name?.familyName ?? ""}`.trim() || user.displayName || "";
		const login = user.emails?.[0]?.value || user.userName || "";
		return name && login && name !== login ? `${name} (${login})` : name || login || user.id || "";
	}
	async function askApiKeyRequest() {
		const [users, ownId] = await Promise.all([getAllUsers(BASE_URI, ""), getCurrentUserId().catch(() => void 0)]);
		const options = users.filter((user) => !!user.id).map((user) => ({
			id: user.id,
			label: userLabel(user)
		})).sort((a, b) => a.label.localeCompare(b.label, "de"));
		if (options.length === 0) throw new Error("Es wurden keine Benutzer gefunden.");
		const renderOptions = (term) => options.filter((option) => !term || option.label.toLowerCase().includes(term)).map((option) => `<option value="${escapeHtml(option.id)}" ${option.id === ownId ? "selected" : ""}>${escapeHtml(option.label)}</option>`).join("");
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
					if (!select) return;
					const previous = select.value;
					select.innerHTML = renderOptions(search.value.trim().toLowerCase());
					if ([...select.options].some((option) => option.value === previous)) select.value = previous;
					else if (select.options.length > 0) select.selectedIndex = 0;
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
				return {
					userId,
					label
				};
			}
		});
		return result.isConfirmed ? result.value : void 0;
	}
	async function createNewApiKey(request) {
		const body = (await createAPIKey(BASE_URI, null, {
			id: "create",
			status: "Unconfirmed",
			userId: request.userId,
			label: request.label
		})).body;
		const problems = (body.problemMessages ?? []).map((problem) => typeof problem === "string" ? problem : JSON.stringify(problem));
		if (body.saveOk === false || problems.length > 0) throw new Error(`Der Identityprovider hat den API-Key nicht gespeichert${problems.length ? `: ${problems.join("; ")}` : "."}`);
		const key = body.apiKeyDto?.key;
		if (!key) throw new Error("Der API-Key wurde angelegt, aber nicht zurückgeliefert - bitte in der Benutzerverwaltung prüfen.");
		return key;
	}
	async function createKey() {
		let created = false;
		await withBusy(async () => {
			try {
				await loadSweetAlert();
				if (!hasSwal()) throw new Error("Dialog-Bibliothek (SweetAlert2) konnte nicht geladen werden.");
				view.message = {
					kind: "info",
					text: "Benutzer werden geladen…"
				};
				const request = await askApiKeyRequest();
				if (!request) {
					view.message = void 0;
					return;
				}
				view.apiKey = await createNewApiKey(request);
				created = true;
				resetStatuses();
				view.message = {
					kind: "ok",
					text: `API-Key „${request.label}“ erstellt und eingetragen.`
				};
			} catch (error) {
				getLogger().error(`API-Key konnte nicht erstellt werden: ${getErrorMessage(error)}`);
				view.message = {
					kind: "error",
					text: `API-Key konnte nicht erstellt werden: ${getErrorMessage(error)}`
				};
			}
		});
		if (created && view.page === "steps") await withBusy(checkAll);
	}
	//#endregion
	//#region src/forms/Onboarding.svelte
	var messageBox = ($$anchor) => {
		var fragment = comment();
		var node = first_child(fragment);
		var consequent = ($$anchor) => {
			var div = root();
			var text = only_child(div, true);
			template_effect(() => {
				set_class(div, 1, `message message-${view.message.kind ?? ""}`, "svelte-1sl4uka");
				set_text(text, view.message.text);
			});
			append($$anchor, div);
		};
		if_block(node, ($$render) => {
			if (view.message) $$render(consequent);
		});
		append($$anchor, fragment);
	};
	var root = /* @__PURE__ */ from_html(`<div> </div>`);
	var root_1 = /* @__PURE__ */ from_html(`<option> </option>`);
	var root_2 = /* @__PURE__ */ from_html(`<div class="block-desc svelte-1sl4uka"> </div>`);
	var root_3 = /* @__PURE__ */ from_html(`<label><input type="radio" name="onb-erp" class="svelte-1sl4uka"/> <span class="erp-label svelte-1sl4uka"> <span class="erp-desc svelte-1sl4uka"> </span></span></label>`);
	var root_4 = /* @__PURE__ */ from_html(`<div class="block svelte-1sl4uka"><div class="block-title svelte-1sl4uka">VEO-Anbindung</div> <div class="block-desc svelte-1sl4uka">Leer lassen, um den vorhandenen Endpunkt nicht anzupassen.</div> <div class="grid svelte-1sl4uka"><label class="svelte-1sl4uka">GWS-Nr.<input type="text" inputmode="numeric" autocomplete="off" class="form-control form-control-sm" placeholder="z.B. 12345"/></label> <label class="svelte-1sl4uka">Queue-Name<input type="text" autocomplete="off" class="form-control form-control-sm"/></label> <label class="wide svelte-1sl4uka">Service Bus Connection String<input type="password" autocomplete="off" class="form-control form-control-sm" placeholder="Endpoint=sb://…;SharedAccessKeyName=…;SharedAccessKey=…"/></label></div></div>`);
	var root_5 = /* @__PURE__ */ from_html(`<div class="block svelte-1sl4uka"><div class="block-title svelte-1sl4uka">gevis R-Linie – SFTP-Server</div> <div class="block-desc svelte-1sl4uka">Benutzer und Kennwort leer lassen, um das vorhandene SFTP-Zielsystem nicht anzupassen.</div> <div class="grid svelte-1sl4uka"><label class="svelte-1sl4uka">Host<input type="text" autocomplete="off" class="form-control form-control-sm"/></label> <label class="svelte-1sl4uka">Port<input type="text" inputmode="numeric" autocomplete="off" class="form-control form-control-sm"/></label> <label class="svelte-1sl4uka">Benutzer<input type="text" autocomplete="off" class="form-control form-control-sm"/></label> <label class="svelte-1sl4uka">Kennwort<input type="password" autocomplete="new-password" class="form-control form-control-sm"/></label> <label class="wide svelte-1sl4uka">Verzeichnis<input type="text" autocomplete="off" class="form-control form-control-sm"/></label></div></div>`);
	var root_6 = /* @__PURE__ */ from_html(`<th class="svelte-1sl4uka"> </th>`);
	var root_7 = /* @__PURE__ */ from_html(`<td class="svelte-1sl4uka"><input type="text" class="form-control form-control-sm svelte-1sl4uka"/></td>`);
	var root_8 = /* @__PURE__ */ from_html(`<tr><!><td class="svelte-1sl4uka"><button type="button" class="btn btn-sm btn-link text-danger p-0" title="Zeile entfernen">✕</button></td></tr>`);
	var root_9 = /* @__PURE__ */ from_html(`<div class="section svelte-1sl4uka"><div class="header svelte-1sl4uka"><div class="title svelte-1sl4uka">Onboarding gevis ECM Rechnungsleser – Konfiguration</div> <div class="hint svelte-1sl4uka">Mandant <strong> </strong> · Schritt 1 von 2</div></div> <div class="body svelte-1sl4uka"><div class="block svelte-1sl4uka"><div class="block-title svelte-1sl4uka">API-Key</div> <div class="block-desc svelte-1sl4uka">Wird auch im Gutschriften-Skript hinterlegt.</div> <div class="key svelte-1sl4uka"><input type="password" autocomplete="off" class="form-control form-control-sm key-input svelte-1sl4uka" placeholder="API-Key eingeben…" aria-label="API-Key"/> <button type="button" class="btn btn-sm btn-outline-secondary svelte-1sl4uka" title="Legt für einen Benutzer einen neuen API-Key an">Neuen API-Key erstellen</button></div></div> <div class="block svelte-1sl4uka"><div class="block-title svelte-1sl4uka">Berechtigungsgruppe</div> <div class="block-desc svelte-1sl4uka">Wird in Stapelprofilen und Postfächern berechtigt.</div> <div class="group-options svelte-1sl4uka"><label class="group-option svelte-1sl4uka"><input type="radio" name="onb-group-mode" value="new"/> <span class="group-label svelte-1sl4uka">Neue Gruppe anlegen:</span> <input type="text" class="form-control form-control-sm group-input svelte-1sl4uka" placeholder="Gruppenname"/></label> <label class="group-option svelte-1sl4uka"><input type="radio" name="onb-group-mode" value="existing"/> <span class="group-label svelte-1sl4uka">Vorhandene Gruppe verwenden:</span> <select class="form-control form-control-sm group-input svelte-1sl4uka"><option>– Gruppe auswählen –</option><!></select></label></div> <!></div> <div class="block svelte-1sl4uka"><div class="block-title svelte-1sl4uka">ERP-Zielsystem</div> <div class="block-desc svelte-1sl4uka">An welches ERP-System übergibt der Rechnungsleser?</div> <div class="erp-options svelte-1sl4uka"></div></div> <!> <!> <div class="block svelte-1sl4uka"><div class="block-title svelte-1sl4uka">Stammdaten: Mandanten</div> <div class="block-desc svelte-1sl4uka">Ergibt <code> </code>. * = Pflichtfeld. Leer lassen, um die Stammdaten nicht anzupassen.</div> <div class="company-wrap svelte-1sl4uka"><table class="company-table svelte-1sl4uka"><thead><tr><!><th class="svelte-1sl4uka"></th></tr></thead><tbody></tbody></table></div> <button type="button" class="btn btn-sm btn-outline-secondary mt-2">+ Mandant hinzufügen</button></div> <!> <div class="actions svelte-1sl4uka"><button type="button" class="btn btn-sm btn-primary svelte-1sl4uka">Weiter</button></div></div></div>`);
	var root_10 = /* @__PURE__ */ from_html(`<span class="status-text svelte-1sl4uka"> </span>`);
	var root_11 = /* @__PURE__ */ from_html(`<tr><td class="nr svelte-1sl4uka"> </td><td class="svelte-1sl4uka"><div class="step-title svelte-1sl4uka"> </div><div class="step-desc svelte-1sl4uka"> </div></td><td class="status svelte-1sl4uka"><span> </span> <!></td><td class="action svelte-1sl4uka"><button type="button" class="btn btn-sm btn-outline-primary"> </button></td></tr>`);
	var root_12 = /* @__PURE__ */ from_html(`<div class="section svelte-1sl4uka"><div class="header svelte-1sl4uka"><div class="title svelte-1sl4uka">Onboarding gevis ECM Rechnungsleser</div> <div class="hint svelte-1sl4uka">Mandant <strong> </strong> · Schritt 2 von 2</div> <div class="summary svelte-1sl4uka"><span>ERP-Zielsystem: <strong class="svelte-1sl4uka"> </strong></span> <span>Gruppe: <strong class="svelte-1sl4uka"> </strong></span> <span>API-Key: <strong class="svelte-1sl4uka"> </strong></span> <button type="button" class="btn btn-sm btn-link p-0">Konfiguration ändern</button></div></div> <div class="body svelte-1sl4uka"><div class="key svelte-1sl4uka"><button type="button" class="btn btn-sm btn-outline-secondary svelte-1sl4uka">Status prüfen</button></div> <!> <div class="table-wrap svelte-1sl4uka"><table class="table table-sm svelte-1sl4uka"><thead class="svelte-1sl4uka"><tr><th class="nr svelte-1sl4uka">Nr.</th><th class="svelte-1sl4uka">Schritt</th><th class="svelte-1sl4uka">Status</th><th class="svelte-1sl4uka"></th></tr></thead><tbody></tbody></table></div> <div class="actions svelte-1sl4uka"><button type="button" class="btn btn-sm btn-outline-primary svelte-1sl4uka">Alle fehlenden anlegen</button> <button type="button" class="btn btn-sm btn-primary svelte-1sl4uka">Alles anlegen / aktualisieren</button></div></div></div>`);
	var $$css = {
		hash: "svelte-1sl4uka",
		code: ".section.svelte-1sl4uka {border:1px solid #dee2e6;border-radius:6px;background:#fff;}.header.svelte-1sl4uka {padding:10px 12px;border-bottom:1px solid #dee2e6;background:#f8f9fa;border-radius:6px 6px 0 0;}.title.svelte-1sl4uka {font-weight:600;font-size:1.05em;}.hint.svelte-1sl4uka {color:#6c757d;font-size:0.85em;margin-top:4px;}.body.svelte-1sl4uka {padding:12px;}.key.svelte-1sl4uka {display:flex;gap:6px;flex-wrap:wrap;align-items:flex-end;margin-bottom:12px;}.key-input.svelte-1sl4uka {flex:1 1 340px;min-width:0;}.key.svelte-1sl4uka .btn:where(.svelte-1sl4uka), .actions.svelte-1sl4uka .btn:where(.svelte-1sl4uka) {white-space:nowrap;}.message.svelte-1sl4uka {border-radius:6px;padding:8px 12px;margin-bottom:12px;font-size:0.9em;}.message-info.svelte-1sl4uka {background:#e7f1ff;color:#084298;border:1px solid #b6d4fe;}.message-ok.svelte-1sl4uka {background:#d1e7dd;color:#0f5132;border:1px solid #badbcc;}.message-error.svelte-1sl4uka {background:#f8d7da;color:#842029;border:1px solid #f5c2c7;}.table-wrap.svelte-1sl4uka {border:1px solid #dee2e6;border-radius:6px;overflow:auto;}table.table.svelte-1sl4uka {margin:0;font-size:0.9em;}.table.svelte-1sl4uka thead:where(.svelte-1sl4uka) th:where(.svelte-1sl4uka) {background:#f8f9fa;border-bottom:1px solid #dee2e6;white-space:nowrap;}.table.svelte-1sl4uka td:where(.svelte-1sl4uka) {vertical-align:middle;}.nr.svelte-1sl4uka {color:#6c757d;width:2.5em;text-align:right;}.step-title.svelte-1sl4uka {font-weight:600;}.step-desc.svelte-1sl4uka {color:#6c757d;font-size:0.85em;}.status.svelte-1sl4uka {min-width:180px;}.status-text.svelte-1sl4uka {display:block;font-size:0.8em;color:#6c757d;margin-top:2px;}.badge-state.svelte-1sl4uka {display:inline-block;font-size:0.75em;font-weight:600;padding:2px 8px;border-radius:10px;white-space:nowrap;}.badge-unknown.svelte-1sl4uka {background:#e9ecef;color:#495057;}.badge-checking.svelte-1sl4uka, .badge-running.svelte-1sl4uka {background:#e7f1ff;color:#084298;}.badge-done.svelte-1sl4uka {background:#d1e7dd;color:#0f5132;}.badge-exists.svelte-1sl4uka {background:#cfe2ff;color:#084298;}.badge-missing.svelte-1sl4uka {background:#fff3cd;color:#997404;}.badge-manual.svelte-1sl4uka {background:#e2e3e5;color:#41464b;}.badge-skipped.svelte-1sl4uka {background:#f1f3f5;color:#868e96;}.badge-error.svelte-1sl4uka {background:#f8d7da;color:#842029;}.action.svelte-1sl4uka {text-align:right;white-space:nowrap;}.actions.svelte-1sl4uka {display:flex;justify-content:flex-end;gap:6px;flex-wrap:wrap;margin-top:12px;}.block.svelte-1sl4uka {margin-bottom:18px;}.block-title.svelte-1sl4uka {font-weight:600;margin-bottom:2px;}.block-desc.svelte-1sl4uka {color:#6c757d;font-size:0.85em;margin-bottom:6px;}.company-wrap.svelte-1sl4uka {overflow-x:auto;}.company-table.svelte-1sl4uka {border-collapse:collapse;font-size:0.85em;width:100%;}.company-table.svelte-1sl4uka th:where(.svelte-1sl4uka) {text-align:left;padding:2px 4px;white-space:nowrap;font-weight:600;}.company-table.svelte-1sl4uka td:where(.svelte-1sl4uka) {padding:2px;}.company-table.svelte-1sl4uka input:where(.svelte-1sl4uka) {min-width:110px;width:100%;}.grid.svelte-1sl4uka {display:grid;grid-template-columns:repeat(auto-fit, minmax(220px, 1fr));gap:8px 12px;}.grid.svelte-1sl4uka label:where(.svelte-1sl4uka) {display:flex;flex-direction:column;gap:4px;font-size:0.85em;margin:0;}.wide.svelte-1sl4uka {grid-column:1 / -1;}.erp-options.svelte-1sl4uka {display:flex;gap:10px;flex-wrap:wrap;}.erp.svelte-1sl4uka {display:flex;gap:8px;align-items:flex-start;border:1px solid #dee2e6;border-radius:6px;padding:10px 12px;cursor:pointer;min-width:220px;margin:0;}.erp.svelte-1sl4uka:hover {border-color:#86b7fe;}.erp-selected.svelte-1sl4uka {border-color:#0d6efd;background:#f1f6ff;}.erp.svelte-1sl4uka input:where(.svelte-1sl4uka) {margin-top:3px;}.erp-label.svelte-1sl4uka {font-weight:600;}.erp-desc.svelte-1sl4uka {display:block;color:#6c757d;font-size:0.8em;font-weight:normal;}.summary.svelte-1sl4uka {display:flex;gap:14px;flex-wrap:wrap;align-items:center;font-size:0.85em;margin-top:6px;}.summary.svelte-1sl4uka strong:where(.svelte-1sl4uka) {font-weight:600;}.group-options.svelte-1sl4uka {display:flex;flex-direction:column;gap:6px;margin-top:8px;}.group-option.svelte-1sl4uka {display:flex;gap:8px;align-items:center;flex-wrap:wrap;font-size:0.85em;margin:0;}.group-label.svelte-1sl4uka {width:15em;flex:0 0 auto;}.group-input.svelte-1sl4uka {width:280px;max-width:100%;}"
	};
	function Onboarding($$anchor, $$props) {
		push($$props, true);
		append_styles($$anchor, $$css);
		const binding_group = [];
		const STATE_LABELS = {
			unknown: "Nicht geprüft",
			checking: "Wird geprüft…",
			running: "Wird ausgeführt…",
			done: "Erledigt",
			exists: "Vorhanden",
			missing: "Fehlt",
			manual: "Manuell",
			error: "Fehler",
			skipped: "Übersprungen"
		};
		const RUN_LABELS = {
			unknown: "Ausführen",
			checking: "Ausführen",
			running: "Läuft…",
			done: "Erneut ausführen",
			exists: "Aktualisieren",
			missing: "Anlegen",
			manual: "Ausführen",
			error: "Erneut versuchen",
			skipped: "Übersprungen"
		};
		const hasKey = /* @__PURE__ */ user_derived(() => view.apiKey.trim() !== "");
		const groupHint = /* @__PURE__ */ user_derived(() => config.groupsLoading ? "Vorhandene Gruppen werden geladen…" : config.groupsError ? `Gruppen konnten nicht geladen werden: ${config.groupsError}` : config.groupsLoadedFor ? "" : "Vorhandene Gruppen werden geladen, sobald ein API-Key eingegeben ist.");
		let companyBody = /* @__PURE__ */ state(void 0);
		onMount(() => {
			if (view.page === "config") loadGroupChoices();
		});
		function showConfig() {
			goToConfig();
			loadGroupChoices();
		}
		function preventSubmit(event) {
			if (event.key === "Enter") event.preventDefault();
		}
		function onKeyKeydown(event) {
			if (event.key === "Enter") {
				event.preventDefault();
				setApiKey(event.currentTarget.value);
				goToSteps();
			}
		}
		async function addCompany() {
			config.companyRows.push(emptyCompany());
			await tick();
			get(companyBody)?.lastElementChild?.querySelector("input")?.focus();
		}
		function removeCompany(index) {
			if (config.companyRows.length > 1) config.companyRows.splice(index, 1);
			else config.companyRows[0] = emptyCompany();
		}
		var fragment_1 = comment();
		var node_1 = first_child(fragment_1);
		var consequent_4 = ($$anchor) => {
			var div_1 = root_9();
			var div_2 = child(div_1);
			var div_3 = sibling(child(div_2), 2);
			var text_1 = only_child(sibling(child(div_3)), true);
			next();
			reset(div_3);
			reset(div_2);
			var div_4 = sibling(div_2, 2);
			var div_5 = child(div_4);
			var div_6 = sibling(child(div_5), 4);
			var input = child(div_6);
			remove_input_defaults(input);
			var button = sibling(input, 2);
			reset(div_6);
			reset(div_5);
			var div_7 = sibling(div_5, 2);
			var div_8 = sibling(child(div_7), 4);
			var label = child(div_8);
			var input_1 = child(label);
			remove_input_defaults(input_1);
			var input_2 = sibling(input_1, 4);
			remove_input_defaults(input_2);
			reset(label);
			var label_1 = sibling(label, 2);
			var input_3 = child(label_1);
			remove_input_defaults(input_3);
			var select = sibling(input_3, 4);
			var option_1 = child(select);
			option_1.value = option_1.__value = "";
			each(sibling(option_1), 17, () => config.availableGroups, (group) => group.id, ($$anchor, group) => {
				var option_2 = root_1();
				var text_2 = only_child(option_2, true);
				var option_2_value = {};
				template_effect(() => {
					set_text(text_2, get(group).name);
					if (option_2_value !== (option_2_value = get(group).id)) option_2.value = (option_2.__value = option_2_value) ?? "";
				});
				append($$anchor, option_2);
			});
			reset(select);
			var select_value;
			init_select(select);
			reset(label_1);
			reset(div_8);
			var node_3 = sibling(div_8, 2);
			var consequent_1 = ($$anchor) => {
				var div_9 = root_2();
				var text_3 = only_child(div_9, true);
				template_effect(() => set_text(text_3, get(groupHint)));
				append($$anchor, div_9);
			};
			if_block(node_3, ($$render) => {
				if (get(groupHint)) $$render(consequent_1);
			});
			reset(div_7);
			var div_10 = sibling(div_7, 2);
			var div_11 = sibling(child(div_10), 4);
			each(div_11, 21, () => ERP_OPTIONS, (option) => option.value, ($$anchor, option) => {
				var label_2 = root_3();
				let classes;
				var input_4 = child(label_2);
				remove_input_defaults(input_4);
				var input_4_value;
				var span = sibling(input_4, 2);
				var text_4 = child(span, true);
				var text_5 = only_child(sibling(text_4), true);
				reset(span);
				reset(label_2);
				template_effect(() => {
					classes = set_class(label_2, 1, "erp svelte-1sl4uka", null, classes, { "erp-selected": config.erpSystem === get(option).value });
					if (input_4_value !== (input_4_value = get(option).value)) input_4.value = (input_4.__value = input_4_value) ?? "";
					set_text(text_4, get(option).label);
					set_text(text_5, get(option).description);
				});
				bind_group(binding_group, [], input_4, () => {
					get(option).value;
					return config.erpSystem;
				}, ($$value) => config.erpSystem = $$value);
				append($$anchor, label_2);
			});
			reset(div_11);
			reset(div_10);
			var node_4 = sibling(div_10, 2);
			var consequent_2 = ($$anchor) => {
				var div_12 = root_4();
				var div_13 = sibling(child(div_12), 4);
				var label_3 = child(div_13);
				var input_5 = sibling(child(label_3));
				remove_input_defaults(input_5);
				reset(label_3);
				var label_4 = sibling(label_3, 2);
				var input_6 = sibling(child(label_4));
				remove_input_defaults(input_6);
				reset(label_4);
				var label_5 = sibling(label_4, 2);
				var input_7 = sibling(child(label_5));
				remove_input_defaults(input_7);
				reset(label_5);
				reset(div_13);
				reset(div_12);
				delegated("keydown", input_5, preventSubmit);
				bind_value(input_5, () => config.veo.gwsNo, ($$value) => config.veo.gwsNo = $$value);
				delegated("keydown", input_6, preventSubmit);
				bind_value(input_6, () => config.veo.queueName, ($$value) => config.veo.queueName = $$value);
				delegated("keydown", input_7, preventSubmit);
				bind_value(input_7, () => config.veo.connectionString, ($$value) => config.veo.connectionString = $$value);
				append($$anchor, div_12);
			};
			if_block(node_4, ($$render) => {
				if (config.erpSystem === "veo") $$render(consequent_2);
			});
			var node_5 = sibling(node_4, 2);
			var consequent_3 = ($$anchor) => {
				var div_14 = root_5();
				var div_15 = sibling(child(div_14), 4);
				var label_6 = child(div_15);
				var input_8 = sibling(child(label_6));
				remove_input_defaults(input_8);
				reset(label_6);
				var label_7 = sibling(label_6, 2);
				var input_9 = sibling(child(label_7));
				remove_input_defaults(input_9);
				reset(label_7);
				var label_8 = sibling(label_7, 2);
				var input_10 = sibling(child(label_8));
				remove_input_defaults(input_10);
				reset(label_8);
				var label_9 = sibling(label_8, 2);
				var input_11 = sibling(child(label_9));
				remove_input_defaults(input_11);
				reset(label_9);
				var label_10 = sibling(label_9, 2);
				var input_12 = sibling(child(label_10));
				remove_input_defaults(input_12);
				reset(label_10);
				reset(div_15);
				reset(div_14);
				delegated("keydown", input_8, preventSubmit);
				bind_value(input_8, () => config.sftp.host, ($$value) => config.sftp.host = $$value);
				delegated("keydown", input_9, preventSubmit);
				bind_value(input_9, () => config.sftp.port, ($$value) => config.sftp.port = $$value);
				delegated("keydown", input_10, preventSubmit);
				bind_value(input_10, () => config.sftp.user, ($$value) => config.sftp.user = $$value);
				delegated("keydown", input_11, preventSubmit);
				bind_value(input_11, () => config.sftp.password, ($$value) => config.sftp.password = $$value);
				delegated("keydown", input_12, preventSubmit);
				bind_value(input_12, () => config.sftp.directory, ($$value) => config.sftp.directory = $$value);
				append($$anchor, div_14);
			};
			if_block(node_5, ($$render) => {
				if (config.erpSystem === "gevisR") $$render(consequent_3);
			});
			var div_16 = sibling(node_5, 2);
			var div_17 = sibling(child(div_16), 2);
			var text_6 = only_child(sibling(child(div_17)), true);
			next();
			reset(div_17);
			var div_18 = sibling(div_17, 2);
			var table = child(div_18);
			var thead = child(table);
			var tr = child(thead);
			each(child(tr), 17, () => COMPANY_COLUMNS, (column) => column.key, ($$anchor, column) => {
				var th = root_6();
				var text_7 = only_child(th);
				template_effect(() => set_text(text_7, `${get(column).label ?? ""}${get(column).required ? " *" : ""}`));
				append($$anchor, th);
			});
			next();
			reset(tr);
			reset(thead);
			var tbody = sibling(thead);
			each(tbody, 22, () => config.companyRows, (row) => row, ($$anchor, row, index) => {
				var tr_1 = root_8();
				var node_7 = child(tr_1);
				each(node_7, 17, () => COMPANY_COLUMNS, (column) => column.key, ($$anchor, column) => {
					var td = root_7();
					var input_13 = child(td);
					remove_input_defaults(input_13);
					reset(td);
					template_effect(() => {
						set_attribute(input_13, "placeholder", get(column).placeholder);
						set_attribute(input_13, "aria-label", get(column).label);
					});
					delegated("keydown", input_13, preventSubmit);
					bind_value(input_13, () => row[get(column).key], ($$value) => row[get(column).key] = $$value);
					append($$anchor, td);
				});
				var button_1 = only_child(sibling(node_7));
				reset(tr_1);
				delegated("click", button_1, () => removeCompany(get(index)));
				append($$anchor, tr_1);
			});
			reset(tbody);
			bind_this(tbody, ($$value) => set(companyBody, $$value), () => get(companyBody));
			reset(table);
			reset(div_18);
			var button_2 = sibling(div_18, 2);
			reset(div_16);
			var node_8 = sibling(div_16, 2);
			messageBox(node_8);
			var button_3 = only_child(sibling(node_8, 2));
			reset(div_4);
			reset(div_1);
			template_effect(() => {
				set_text(text_1, SUBDOMAIN);
				set_value(input, view.apiKey);
				button.disabled = view.busy;
				set_checked(input_1, config.groupMode === "new");
				set_value(input_2, config.newGroupName);
				set_checked(input_3, config.groupMode === "existing");
				input_3.disabled = !config.availableGroups.length;
				select.disabled = !config.availableGroups.length;
				if (select_value !== (select_value = config.selectedGroupId)) select.value = (select.__value = select_value) ?? "", select_option(select, select_value);
				set_text(text_6, COMPANY_FILE_NAME);
				button_3.disabled = view.busy || !get(hasKey) || config.erpSystem === "";
			});
			delegated("input", input, (e) => setApiKey(e.currentTarget.value));
			delegated("change", input, (e) => {
				setApiKey(e.currentTarget.value);
				loadGroupChoices();
			});
			delegated("keydown", input, onKeyKeydown);
			delegated("click", button, () => createKey());
			delegated("change", input_1, () => setGroupMode("new"));
			delegated("input", input_2, (e) => {
				config.newGroupName = e.currentTarget.value;
				setGroupMode("new");
			});
			delegated("keydown", input_2, preventSubmit);
			delegated("change", input_3, () => setGroupMode("existing"));
			delegated("change", select, (e) => {
				config.selectedGroupId = e.currentTarget.value;
				setGroupMode("existing");
			});
			delegated("click", button_2, addCompany);
			delegated("click", button_3, () => goToSteps());
			append($$anchor, div_1);
		};
		var alternate = ($$anchor) => {
			var div_20 = root_12();
			var div_21 = child(div_20);
			var div_22 = sibling(child(div_21), 2);
			var text_8 = only_child(sibling(child(div_22)), true);
			next();
			reset(div_22);
			var div_23 = sibling(div_22, 2);
			var span_2 = child(div_23);
			var text_9 = only_child(sibling(child(span_2)), true);
			reset(span_2);
			var span_3 = sibling(span_2, 2);
			var text_10 = only_child(sibling(child(span_3)), true);
			reset(span_3);
			var span_4 = sibling(span_3, 2);
			var text_11 = only_child(sibling(child(span_4)));
			reset(span_4);
			var button_4 = sibling(span_4, 2);
			reset(div_23);
			reset(div_21);
			var div_24 = sibling(div_21, 2);
			var div_25 = child(div_24);
			var button_5 = only_child(div_25);
			var node_9 = sibling(div_25, 2);
			messageBox(node_9);
			var div_26 = sibling(node_9, 2);
			var table_1 = child(div_26);
			var tbody_1 = sibling(child(table_1));
			each(tbody_1, 23, activeSteps, (step) => step.id, ($$anchor, step, index) => {
				const status = /* @__PURE__ */ user_derived(() => view.statuses[get(step).id]);
				var tr_2 = root_11();
				var td_2 = child(tr_2);
				var text_12 = only_child(td_2, true);
				var td_3 = sibling(td_2);
				var div_27 = child(td_3);
				var text_13 = only_child(div_27, true);
				var text_14 = only_child(sibling(div_27), true);
				reset(td_3);
				var td_4 = sibling(td_3);
				var span_5 = child(td_4);
				var text_15 = only_child(span_5, true);
				var node_10 = sibling(span_5, 2);
				var consequent_5 = ($$anchor) => {
					var span_6 = root_10();
					var text_16 = only_child(span_6, true);
					template_effect(() => set_text(text_16, get(status).text));
					append($$anchor, span_6);
				};
				if_block(node_10, ($$render) => {
					if (get(status).text) $$render(consequent_5);
				});
				reset(td_4);
				var td_5 = sibling(td_4);
				var button_6 = child(td_5);
				var text_17 = only_child(button_6, true);
				reset(td_5);
				reset(tr_2);
				template_effect(() => {
					set_text(text_12, get(index) + 1);
					set_text(text_13, get(step).title);
					set_text(text_14, get(step).description);
					set_class(span_5, 1, `badge-state badge-${get(status).state ?? ""}`, "svelte-1sl4uka");
					set_text(text_15, STATE_LABELS[get(status).state]);
					button_6.disabled = view.busy || !get(hasKey) || get(status).state === "skipped";
					set_text(text_17, RUN_LABELS[get(status).state]);
				});
				delegated("click", button_6, () => runSingle(get(step)));
				append($$anchor, tr_2);
			});
			reset(tbody_1);
			reset(table_1);
			reset(div_26);
			var div_29 = sibling(div_26, 2);
			var button_7 = child(div_29);
			var button_8 = sibling(button_7, 2);
			reset(div_29);
			reset(div_24);
			reset(div_20);
			template_effect(($0, $1, $2) => {
				set_text(text_8, SUBDOMAIN);
				set_text(text_9, $0);
				set_text(text_10, $1);
				set_text(text_11, `••••${$2 ?? ""}`);
				button_4.disabled = view.busy;
				button_5.disabled = view.busy || !get(hasKey);
				button_7.disabled = view.busy || !get(hasKey);
				button_8.disabled = view.busy || !get(hasKey);
			}, [
				() => erpLabel(config.erpSystem),
				() => groupLabel(),
				() => view.apiKey.trim().slice(-4)
			]);
			delegated("click", button_4, showConfig);
			delegated("click", button_5, () => checkAllSteps());
			delegated("click", button_7, () => runBatch(["missing"], "Fehlende Schritte anlegen?"));
			delegated("click", button_8, () => runBatch([
				"missing",
				"exists",
				"manual"
			], "Alles anlegen bzw. aktualisieren?"));
			append($$anchor, div_20);
		};
		if_block(node_1, ($$render) => {
			if (view.page === "config") $$render(consequent_4);
			else $$render(alternate, -1);
		});
		append($$anchor, fragment_1);
		pop();
	}
	delegate([
		"input",
		"change",
		"keydown",
		"click"
	]);
	//#endregion
	//#region src/forms/form.ts
	var logger = initLogger(LogLevel.INFO);
	window.formInit = function(form, data) {
		logger.debug("Onboarding-Formular initialisiert.");
		mountInForm(form, Onboarding, {});
	};
	//#endregion
})();

//# sourceMappingURL=formBundle.js.map