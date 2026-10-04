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
	var LEGACY_PROPS = Symbol("legacy props");
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
	* Don't mark this as side-effect-free, hydration needs to walk all nodes
	* @param {any} value
	*/
	function text$1(value = "") {
		if (!hydrating) {
			var t = create_text(value + "");
			assign_nodes(t, t);
			return t;
		}
		var node = hydrate_node;
		if (node.nodeType !== 3) {
			node.before(node = create_text());
			set_hydrate_node(node);
		} else merge_text_nodes(node);
		assign_nodes(node, node);
		return node;
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
	//#region src/forms/eInvoice.ts
	var GUIDELINE_ID = {
		xrechnung: "urn:cen.eu:en16931:2017#compliant#urn:xeinkauf.de:kosit:xrechnung_3.0",
		zugferd: "urn:cen.eu:en16931:2017"
	};
	var BUSINESS_PROCESS_ID = "urn:fdc:peppol.eu:2017:poacc:billing:01.0";
	var FACTURX_FILE_NAME = "factur-x.xml";
	function round2(value) {
		return Math.round(value * 100) / 100;
	}
	function eInvoiceTotals(data) {
		const lineTotal = round2(data.lines.reduce((sum, line) => sum + round2(line.lineTotal), 0));
		const taxTotal = round2(lineTotal * data.vatRate / 100);
		return {
			lineTotal,
			taxTotal,
			grandTotal: round2(lineTotal + taxTotal)
		};
	}
	var UNIT_CODES = {
		STK: "H87",
		"STÜCK": "H87",
		STUECK: "H87",
		ST: "H87",
		PCS: "H87",
		PIECE: "H87",
		KG: "KGM",
		KILO: "KGM",
		G: "GRM",
		GR: "GRM",
		T: "TNE",
		TO: "TNE",
		TONNE: "TNE",
		L: "LTR",
		LTR: "LTR",
		LITER: "LTR",
		ML: "MLT",
		M: "MTR",
		MTR: "MTR",
		METER: "MTR",
		CM: "CMT",
		MM: "MMT",
		KM: "KMT",
		M2: "MTK",
		QM: "MTK",
		"M²": "MTK",
		M3: "MTQ",
		CBM: "MTQ",
		"M³": "MTQ",
		STD: "HUR",
		STUNDE: "HUR",
		H: "HUR",
		HOUR: "HUR",
		MIN: "MIN",
		TAG: "DAY",
		DAY: "DAY",
		WOCHE: "WEE",
		MONAT: "MON",
		PAK: "XPK",
		PAKET: "XPK",
		PCK: "XPK",
		KARTON: "XCT",
		KRT: "XCT",
		PAL: "XPX",
		PALETTE: "XPX",
		ROLLE: "XRO",
		SACK: "XSA",
		SET: "SET",
		PAAR: "PR",
		PAR: "PR",
		PAUSCHAL: "LS",
		PSCH: "LS",
		LS: "LS"
	};
	/** C62 ("Einheit") als Rückfall, wenn der BC-Code unbekannt ist. */
	function unitCode(bcUnit) {
		const key = bcUnit.trim().toUpperCase();
		if (!key) return "C62";
		return UNIT_CODES[key] ?? (/^[A-Z0-9]{2,3}$/.test(key) && Object.values(UNIT_CODES).includes(key) ? key : "C62");
	}
	function missingEInvoiceFields(data, profile) {
		const missing = [];
		const need = (value, label) => {
			if (!value || !value.trim()) missing.push(label);
		};
		need(data.seller.name, "Name des Lieferanten");
		need(data.seller.city, "Ort des Lieferanten");
		need(data.seller.postcode, "PLZ des Lieferanten");
		need(data.seller.country, "Land des Lieferanten");
		need(data.buyer.name, "Name des Käufers");
		need(data.buyer.city, "Ort des Käufers");
		need(data.buyer.postcode, "PLZ des Käufers");
		need(data.buyer.country, "Land des Käufers");
		need(data.iban, "IBAN");
		if (data.vatRate > 0) need(data.seller.vatId, "USt-IdNr. des Lieferanten");
		for (const [party, label] of [[data.seller, "Lieferanten"], [data.buyer, "Käufers"]]) if (party.vatId && !/^[A-Z]{2}[A-Z0-9+*.]{2,13}$/.test(party.vatId)) missing.push(`gültige USt-IdNr. des ${label} (mit Länderkennung, z. B. DE123456789)`);
		if (data.lines.length === 0) missing.push("mindestens eine Rechnungsposition");
		if (profile === "xrechnung") {
			need(data.buyerReference, "Käuferreferenz / Leitweg-ID");
			need(data.seller.email, "E-Mail des Lieferanten");
			need(data.seller.phone, "Telefon des Lieferanten");
			need(data.buyer.email, "E-Mail des Käufers");
		}
		return missing;
	}
	function xml(value) {
		return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
	}
	function amount(value) {
		return round2(value).toFixed(2);
	}
	function decimal(value) {
		return String(Number(value.toFixed(4)));
	}
	function date102(value) {
		const pad = (n) => String(n).padStart(2, "0");
		return `${value.getFullYear()}${pad(value.getMonth() + 1)}${pad(value.getDate())}`;
	}
	function dateTime(tag, value) {
		return `<${tag}><udt:DateTimeString format="102">${date102(value)}</udt:DateTimeString></${tag}>`;
	}
	function optional(tag, value) {
		return value && value.trim() ? `<${tag}>${xml(value.trim())}</${tag}>` : "";
	}
	function address(party) {
		return "<ram:PostalTradeAddress>" + optional("ram:PostcodeCode", party.postcode) + optional("ram:LineOne", party.street) + optional("ram:LineTwo", party.street2) + optional("ram:CityName", party.city) + `<ram:CountryID>${xml(party.country || "DE")}</ram:CountryID></ram:PostalTradeAddress>`;
	}
	function electronicAddress(party) {
		return party.email?.trim() ? `<ram:URIUniversalCommunication><ram:URIID schemeID="EM">${xml(party.email.trim())}</ram:URIID></ram:URIUniversalCommunication>` : "";
	}
	function vatRegistration(party) {
		return party.vatId?.trim() ? `<ram:SpecifiedTaxRegistration><ram:ID schemeID="VA">${xml(party.vatId.trim())}</ram:ID></ram:SpecifiedTaxRegistration>` : "";
	}
	function sellerContact(party) {
		const name = party.contactName || party.name;
		if (!name && !party.phone && !party.email) return "";
		return "<ram:DefinedTradeContact>" + optional("ram:PersonName", name) + (party.phone?.trim() ? `<ram:TelephoneUniversalCommunication><ram:CompleteNumber>${xml(party.phone.trim())}</ram:CompleteNumber></ram:TelephoneUniversalCommunication>` : "") + (party.email?.trim() ? `<ram:EmailURIUniversalCommunication><ram:URIID>${xml(party.email.trim())}</ram:URIID></ram:EmailURIUniversalCommunication>` : "") + "</ram:DefinedTradeContact>";
	}
	function taxCategory(rate) {
		return rate > 0 ? "S" : "Z";
	}
	function buildCiiXml(data, profile) {
		const totals = eInvoiceTotals(data);
		const category = taxCategory(data.vatRate);
		const rate = decimal(data.vatRate);
		const currency = xml(data.currency);
		const lines = data.lines.map((line) => `
    <ram:IncludedSupplyChainTradeLineItem>
      <ram:AssociatedDocumentLineDocument><ram:LineID>${xml(line.id)}</ram:LineID></ram:AssociatedDocumentLineDocument>
      <ram:SpecifiedTradeProduct>${optional("ram:SellerAssignedID", line.itemNo)}<ram:Name>${xml(line.name || line.itemNo || "Position")}</ram:Name></ram:SpecifiedTradeProduct>
      <ram:SpecifiedLineTradeAgreement><ram:NetPriceProductTradePrice><ram:ChargeAmount>${decimal(line.netPrice)}</ram:ChargeAmount></ram:NetPriceProductTradePrice></ram:SpecifiedLineTradeAgreement>
      <ram:SpecifiedLineTradeDelivery><ram:BilledQuantity unitCode="${xml(line.unitCode)}">${decimal(line.quantity)}</ram:BilledQuantity></ram:SpecifiedLineTradeDelivery>
      <ram:SpecifiedLineTradeSettlement>
        <ram:ApplicableTradeTax><ram:TypeCode>VAT</ram:TypeCode><ram:CategoryCode>${category}</ram:CategoryCode><ram:RateApplicablePercent>${rate}</ram:RateApplicablePercent></ram:ApplicableTradeTax>
        <ram:SpecifiedTradeSettlementLineMonetarySummation><ram:LineTotalAmount>${amount(line.lineTotal)}</ram:LineTotalAmount></ram:SpecifiedTradeSettlementLineMonetarySummation>
      </ram:SpecifiedLineTradeSettlement>
    </ram:IncludedSupplyChainTradeLineItem>`).join("");
		return `<?xml version="1.0" encoding="UTF-8"?>
<rsm:CrossIndustryInvoice xmlns:rsm="urn:un:unece:uncefact:data:standard:CrossIndustryInvoice:100" xmlns:ram="urn:un:unece:uncefact:data:standard:ReusableAggregateBusinessInformationEntity:100" xmlns:qdt="urn:un:unece:uncefact:data:standard:QualifiedDataType:100" xmlns:udt="urn:un:unece:uncefact:data:standard:UnqualifiedDataType:100">
  <rsm:ExchangedDocumentContext>
    <ram:BusinessProcessSpecifiedDocumentContextParameter><ram:ID>${BUSINESS_PROCESS_ID}</ram:ID></ram:BusinessProcessSpecifiedDocumentContextParameter>
    <ram:GuidelineSpecifiedDocumentContextParameter><ram:ID>${GUIDELINE_ID[profile]}</ram:ID></ram:GuidelineSpecifiedDocumentContextParameter>
  </rsm:ExchangedDocumentContext>
  <rsm:ExchangedDocument>
    <ram:ID>${xml(data.invoiceNo)}</ram:ID>
    <ram:TypeCode>380</ram:TypeCode>
    ${dateTime("ram:IssueDateTime", data.issueDate)}
    ${data.note ? `<ram:IncludedNote><ram:Content>${xml(data.note)}</ram:Content></ram:IncludedNote>` : ""}
  </rsm:ExchangedDocument>
  <rsm:SupplyChainTradeTransaction>${lines}
    <ram:ApplicableHeaderTradeAgreement>
      ${optional("ram:BuyerReference", data.buyerReference)}
      <ram:SellerTradeParty>
        ${optional("ram:ID", data.seller.id)}
        <ram:Name>${xml(data.seller.name)}</ram:Name>
        ${sellerContact(data.seller)}
        ${address(data.seller)}
        ${electronicAddress(data.seller)}
        ${vatRegistration(data.seller)}
      </ram:SellerTradeParty>
      <ram:BuyerTradeParty>
        <ram:Name>${xml(data.buyer.name)}</ram:Name>
        ${address(data.buyer)}
        ${electronicAddress(data.buyer)}
        ${vatRegistration(data.buyer)}
      </ram:BuyerTradeParty>
      ${data.orderReference ? `<ram:BuyerOrderReferencedDocument><ram:IssuerAssignedID>${xml(data.orderReference)}</ram:IssuerAssignedID></ram:BuyerOrderReferencedDocument>` : ""}
    </ram:ApplicableHeaderTradeAgreement>
    <ram:ApplicableHeaderTradeDelivery>
      ${data.deliveryDate ? `<ram:ActualDeliverySupplyChainEvent>${dateTime("ram:OccurrenceDateTime", data.deliveryDate)}</ram:ActualDeliverySupplyChainEvent>` : ""}
    </ram:ApplicableHeaderTradeDelivery>
    <ram:ApplicableHeaderTradeSettlement>
      <ram:InvoiceCurrencyCode>${currency}</ram:InvoiceCurrencyCode>
      <ram:SpecifiedTradeSettlementPaymentMeans>
        <ram:TypeCode>58</ram:TypeCode>
        <ram:PayeePartyCreditorFinancialAccount><ram:IBANID>${xml(data.iban.replace(/\s+/g, ""))}</ram:IBANID></ram:PayeePartyCreditorFinancialAccount>
      </ram:SpecifiedTradeSettlementPaymentMeans>
      <ram:ApplicableTradeTax>
        <ram:CalculatedAmount>${amount(totals.taxTotal)}</ram:CalculatedAmount>
        <ram:TypeCode>VAT</ram:TypeCode>
        <ram:BasisAmount>${amount(totals.lineTotal)}</ram:BasisAmount>
        <ram:CategoryCode>${category}</ram:CategoryCode>
        <ram:RateApplicablePercent>${rate}</ram:RateApplicablePercent>
      </ram:ApplicableTradeTax>
      <ram:SpecifiedTradePaymentTerms>
        ${optional("ram:Description", data.paymentTerms)}
        ${dateTime("ram:DueDateDateTime", data.dueDate)}
      </ram:SpecifiedTradePaymentTerms>
      <ram:SpecifiedTradeSettlementHeaderMonetarySummation>
        <ram:LineTotalAmount>${amount(totals.lineTotal)}</ram:LineTotalAmount>
        <ram:TaxBasisTotalAmount>${amount(totals.lineTotal)}</ram:TaxBasisTotalAmount>
        <ram:TaxTotalAmount currencyID="${currency}">${amount(totals.taxTotal)}</ram:TaxTotalAmount>
        <ram:GrandTotalAmount>${amount(totals.grandTotal)}</ram:GrandTotalAmount>
        <ram:DuePayableAmount>${amount(totals.grandTotal)}</ram:DuePayableAmount>
      </ram:SpecifiedTradeSettlementHeaderMonetarySummation>
    </ram:ApplicableHeaderTradeSettlement>
  </rsm:SupplyChainTradeTransaction>
</rsm:CrossIndustryInvoice>
`.replace(/\n\s*\n/g, "\n");
	}
	/**
	* Macht aus der PDF ein PDF/A-3b mit eingebettetem factur-x.xml:
	* sRGB-OutputIntent, XMP-Metadaten (PDF/A + Factur-X-Erweiterungsschema,
	* passend zum Info-Dictionary), Anhang mit AFRelationship "Alternative" und
	* /AF im Katalog, Datei-ID im Trailer.
	*/
	async function createFacturXPdf(PDFLib, pdfBytes, ciiXml, meta) {
		const { PDFDocument, PDFName, PDFString, PDFHexString } = PDFLib;
		const pdfDoc = await PDFDocument.load(pdfBytes, { updateMetadata: false });
		const context = pdfDoc.context;
		const catalog = pdfDoc.catalog;
		const now = /* @__PURE__ */ new Date(Math.floor(Date.now() / 1e3) * 1e3);
		const producer = "pdfmake + pdf-lib";
		pdfDoc.setTitle(meta.title);
		pdfDoc.setAuthor(meta.author);
		pdfDoc.setSubject(meta.subject);
		pdfDoc.setCreator(producer);
		pdfDoc.setProducer(producer);
		pdfDoc.setCreationDate(now);
		pdfDoc.setModificationDate(now);
		const xmlBytes = new TextEncoder().encode(ciiXml);
		const fileStream = context.flateStream(xmlBytes, {
			Type: "EmbeddedFile",
			Subtype: "text/xml",
			Params: {
				Size: xmlBytes.length,
				ModDate: PDFString.fromDate(now)
			}
		});
		const fileStreamRef = context.register(fileStream);
		const fileSpec = context.obj({
			Type: "Filespec",
			F: PDFString.of(FACTURX_FILE_NAME),
			UF: PDFHexString.fromText(FACTURX_FILE_NAME),
			EF: {
				F: fileStreamRef,
				UF: fileStreamRef
			},
			Desc: PDFString.of("Factur-X/ZUGFeRD Rechnung"),
			AFRelationship: "Alternative"
		});
		const fileSpecRef = context.register(fileSpec);
		catalog.set(PDFName.of("Names"), context.obj({ EmbeddedFiles: { Names: [PDFHexString.fromText(FACTURX_FILE_NAME), fileSpecRef] } }));
		catalog.set(PDFName.of("AF"), context.obj([fileSpecRef]));
		const iccStream = context.flateStream(buildSrgbIccProfile(), { N: 3 });
		const iccRef = context.register(iccStream);
		const outputIntent = context.obj({
			Type: "OutputIntent",
			S: "GTS_PDFA1",
			OutputConditionIdentifier: PDFString.of("sRGB IEC61966-2.1"),
			Info: PDFString.of("sRGB IEC61966-2.1"),
			DestOutputProfile: iccRef
		});
		catalog.set(PDFName.of("OutputIntents"), context.obj([context.register(outputIntent)]));
		const xmp = buildXmp(meta, producer, now);
		const metadata = context.stream(new TextEncoder().encode(xmp), {
			Type: "Metadata",
			Subtype: "XML"
		});
		catalog.set(PDFName.of("Metadata"), context.register(metadata));
		const id = Array.from(crypto.getRandomValues(/* @__PURE__ */ new Uint8Array(16)), (b) => b.toString(16).padStart(2, "0")).join("");
		context.trailerInfo.ID = context.obj([PDFHexString.of(id), PDFHexString.of(id)]);
		return pdfDoc.save({ useObjectStreams: false });
	}
	function xmpDate(value) {
		return value.toISOString().replace(/\.\d{3}Z$/, "Z");
	}
	function buildXmp(meta, producer, date) {
		const fxProperty = (name, description) => `
            <rdf:li rdf:parseType="Resource">
              <pdfaProperty:name>${name}</pdfaProperty:name>
              <pdfaProperty:valueType>Text</pdfaProperty:valueType>
              <pdfaProperty:category>external</pdfaProperty:category>
              <pdfaProperty:description>${description}</pdfaProperty:description>
            </rdf:li>`;
		return `<?xpacket begin="﻿" id="W5M0MpCehiHzreSzNTczkc9d"?>
<x:xmpmeta xmlns:x="adobe:ns:meta/">
  <rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
    <rdf:Description rdf:about="" xmlns:pdfaid="http://www.aiim.org/pdfa/ns/id/">
      <pdfaid:part>3</pdfaid:part>
      <pdfaid:conformance>B</pdfaid:conformance>
    </rdf:Description>
    <rdf:Description rdf:about="" xmlns:dc="http://purl.org/dc/elements/1.1/">
      <dc:format>application/pdf</dc:format>
      <dc:title><rdf:Alt><rdf:li xml:lang="x-default">${xml(meta.title)}</rdf:li></rdf:Alt></dc:title>
      <dc:creator><rdf:Seq><rdf:li>${xml(meta.author)}</rdf:li></rdf:Seq></dc:creator>
      <dc:description><rdf:Alt><rdf:li xml:lang="x-default">${xml(meta.subject)}</rdf:li></rdf:Alt></dc:description>
    </rdf:Description>
    <rdf:Description rdf:about="" xmlns:xmp="http://ns.adobe.com/xap/1.0/">
      <xmp:CreatorTool>${xml(producer)}</xmp:CreatorTool>
      <xmp:CreateDate>${xmpDate(date)}</xmp:CreateDate>
      <xmp:ModifyDate>${xmpDate(date)}</xmp:ModifyDate>
    </rdf:Description>
    <rdf:Description rdf:about="" xmlns:pdf="http://ns.adobe.com/pdf/1.3/">
      <pdf:Producer>${xml(producer)}</pdf:Producer>
    </rdf:Description>
    <rdf:Description rdf:about="" xmlns:fx="urn:factur-x:pdfa:CrossIndustryDocument:invoice:1p0#">
      <fx:DocumentType>INVOICE</fx:DocumentType>
      <fx:DocumentFileName>${FACTURX_FILE_NAME}</fx:DocumentFileName>
      <fx:Version>1.0</fx:Version>
      <fx:ConformanceLevel>EN 16931</fx:ConformanceLevel>
    </rdf:Description>
    <rdf:Description rdf:about="" xmlns:pdfaExtension="http://www.aiim.org/pdfa/ns/extension/" xmlns:pdfaSchema="http://www.aiim.org/pdfa/ns/schema#" xmlns:pdfaProperty="http://www.aiim.org/pdfa/ns/property#">
      <pdfaExtension:schemas>
        <rdf:Bag>
          <rdf:li rdf:parseType="Resource">
            <pdfaSchema:schema>Factur-X PDFA Extension Schema</pdfaSchema:schema>
            <pdfaSchema:namespaceURI>urn:factur-x:pdfa:CrossIndustryDocument:invoice:1p0#</pdfaSchema:namespaceURI>
            <pdfaSchema:prefix>fx</pdfaSchema:prefix>
            <pdfaSchema:property>
              <rdf:Seq>${fxProperty("DocumentFileName", "The name of the embedded XML document")}${fxProperty("DocumentType", "The type of the hybrid document in capital letters, e.g. INVOICE or ORDER")}${fxProperty("Version", "The actual version of the standard applying to the embedded XML document")}${fxProperty("ConformanceLevel", "The conformance level of the embedded XML document")}
              </rdf:Seq>
            </pdfaSchema:property>
          </rdf:li>
        </rdf:Bag>
      </pdfaExtension:schemas>
    </rdf:Description>
  </rdf:RDF>
</x:xmpmeta>
<?xpacket end="w"?>`;
	}
	/**
	* Minimales ICC-v2-Profil (Monitor, RGB, Matrix/TRC) mit den sRGB-Primärfarben
	* (D50-adaptiert) und Gamma 2.2 - für den PDF/A-OutputIntent.
	*/
	function buildSrgbIccProfile() {
		const text = (s) => Array.from(s, (c) => c.charCodeAt(0));
		const u32 = (v) => [
			v >>> 24 & 255,
			v >>> 16 & 255,
			v >>> 8 & 255,
			v & 255
		];
		const u16 = (v) => [v >>> 8 & 255, v & 255];
		const zeros = (n) => new Array(n).fill(0);
		const s15 = (v) => u32(Math.round(v * 65536) >>> 0);
		const xyz = (x, y, z) => [
			...text("XYZ "),
			...zeros(4),
			...s15(x),
			...s15(y),
			...s15(z)
		];
		const descText = "sRGB IEC61966-2.1";
		const desc = [
			...text("desc"),
			...zeros(4),
			...u32(18),
			...text(descText),
			0,
			...u32(0),
			...u32(0),
			...u16(0),
			0,
			...zeros(67)
		];
		const cprt = [
			...text("text"),
			...zeros(4),
			...text("No copyright, use freely"),
			0
		];
		const curve = [
			...text("curv"),
			...zeros(4),
			...u32(1),
			...u16(563)
		];
		const tags = [
			["desc", desc],
			["cprt", cprt],
			["wtpt", xyz(.9642, 1, .8249)],
			["rXYZ", xyz(.4361, .2225, .0139)],
			["gXYZ", xyz(.3851, .7169, .0971)],
			["bXYZ", xyz(.1431, .0606, .7141)],
			["rTRC", curve],
			["gTRC", curve],
			["bTRC", curve]
		];
		const dataStart = 132 + tags.length * 12;
		const table = [...u32(tags.length)];
		const data = [];
		const offsets = /* @__PURE__ */ new Map();
		for (const [signature, bytes] of tags) {
			let offset = offsets.get(bytes);
			if (offset === void 0) {
				offset = dataStart + data.length;
				data.push(...bytes);
				while (data.length % 4) data.push(0);
				offsets.set(bytes, offset);
			}
			table.push(...text(signature), ...u32(offset), ...u32(bytes.length));
		}
		const header = [
			...u32(dataStart + data.length),
			...zeros(4),
			...u32(34603008),
			...text("mntr"),
			...text("RGB "),
			...text("XYZ "),
			...u16(2e3),
			...u16(1),
			...u16(1),
			...u16(0),
			...u16(0),
			...u16(0),
			...text("acsp"),
			...zeros(4),
			...zeros(4),
			...zeros(4),
			...zeros(4),
			...zeros(8),
			...u32(0),
			...s15(.9642),
			...s15(1),
			...s15(.8249),
			...zeros(4)
		];
		header.push(...zeros(128 - header.length));
		return new Uint8Array([
			...header,
			...table,
			...data
		]);
	}
	//#endregion
	//#region src/forms/invoice.ts
	var PDFMAKE_URL = "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/pdfmake.min.js";
	var PDFMAKE_FONTS_URL = "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/vfs_fonts.js";
	var PDF_LIB_URL = "https://cdnjs.cloudflare.com/ajax/libs/pdf-lib/1.17.1/pdf-lib.min.js";
	var TEST_IBAN = "DE02120300000000202051";
	var PAYMENT_DAYS = 14;
	var EXAMPLE_NOTE = "BEISPIEL – keine echte Rechnung";
	var FORMATS = [
		{
			value: "pdf",
			label: "PDF"
		},
		{
			value: "zugferd",
			label: "ZUGFeRD-PDF (EN 16931)"
		},
		{
			value: "xrechnung",
			label: "XRechnung (XML, CII)"
		}
	];
	function text(value) {
		return value === void 0 || value === null ? "" : String(value).trim();
	}
	function normalizeVatId(value, country) {
		const id = text(value).toUpperCase().replace(/[\s.\-/]/g, "");
		if (!id) return "";
		return /^[A-Z]{2}/.test(id) ? id : `${countryCode(country)}${id}`;
	}
	function num(value) {
		const n = typeof value === "number" ? value : Number(value);
		return Number.isFinite(n) ? n : 0;
	}
	function toInvoiceLines(lines) {
		return lines.filter((line) => line && (line.description || line.no || num(line.quantity))).map((line, index) => {
			const quantity = num(line.quantity);
			const unitPrice = num(line.unitCost ?? line.directUnitCost ?? line.unitPrice);
			const amount = round(line.amount !== void 0 || line.lineAmount !== void 0 ? num(line.amount ?? line.lineAmount) : quantity * unitPrice);
			return {
				position: String(line.lineNo ?? line.sequence ?? index + 1),
				itemNo: String(line.no ?? line.itemNo ?? line.lineObjectNumber ?? ""),
				description: String(line.description ?? ""),
				quantity,
				unit: String(line.unitOfMeasureCode ?? line.unitOfMeasure ?? ""),
				unitPrice,
				amount
			};
		});
	}
	function totals(lines, vatRate) {
		const net = round(lines.reduce((sum, line) => sum + round(line.amount), 0));
		const vat = round(net * vatRate / 100);
		return {
			net,
			vat,
			gross: round(net + vat)
		};
	}
	function round(value) {
		return Math.round(value * 100) / 100;
	}
	function money(value) {
		return value.toLocaleString("de-DE", {
			style: "currency",
			currency: "EUR"
		});
	}
	function quantityText(value) {
		return value.toLocaleString("de-DE", { maximumFractionDigits: 3 });
	}
	function formatDate(value) {
		if (!value) return "";
		const date = new Date(String(value));
		return isNaN(date.getTime()) || date.getFullYear() < 1900 ? "" : date.toLocaleDateString("de-DE");
	}
	function generateInvoiceNumber() {
		const d = /* @__PURE__ */ new Date();
		const pad = (n, len = 2) => String(n).padStart(len, "0");
		return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}${pad(Math.floor(Math.random() * 1e3), 3)}`;
	}
	function vendorAddressLines(vendor) {
		if (!vendor) return [];
		const cityLine = [vendor.postalCode, vendor.city].filter(Boolean).join(" ");
		return [
			vendor.addressLine1 ?? vendor.address,
			vendor.addressLine2 ?? vendor.address2,
			cityLine,
			vendor.country ?? vendor.countryRegionCode
		].map((v) => String(v ?? "").trim()).filter(Boolean);
	}
	function buyerName(details, input) {
		return text(details.buyer?.displayName ?? details.buyer?.name) || input.companyName;
	}
	function addDays(date, days) {
		const result = new Date(date);
		result.setDate(result.getDate() + days);
		return result;
	}
	function parseDate(value) {
		if (!value) return void 0;
		const date = new Date(String(value));
		return isNaN(date.getTime()) || date.getFullYear() < 1900 ? void 0 : date;
	}
	function countryCode(value) {
		const code = text(value).toUpperCase();
		return /^[A-Z]{2}$/.test(code) ? code : "DE";
	}
	function paymentTermsText(dueDate) {
		return `Zahlbar bis ${dueDate.toLocaleDateString("de-DE")} ohne Abzug.`;
	}
	function buildEInvoiceData(details, input, invoiceNo, issueDate) {
		const { order, vendor, buyer } = details;
		const fields = input.eInvoice;
		const party = (source, name, email, extra = {}) => ({
			name,
			street: text(source?.addressLine1 ?? source?.address),
			street2: text(source?.addressLine2 ?? source?.address2),
			postcode: text(source?.postalCode),
			city: text(source?.city),
			country: countryCode(source?.country ?? source?.countryRegionCode),
			email,
			...extra
		});
		const vendorName = text(vendor?.displayName ?? vendor?.name ?? order.buyFromVendorName);
		const dueDate = addDays(issueDate, PAYMENT_DAYS);
		return {
			invoiceNo,
			issueDate,
			dueDate,
			deliveryDate: parseDate(order.expectedReceiptDate ?? order.requestedReceiptDate ?? order.orderDate),
			currency: text(order.currencyCode) || text(buyer?.currencyCode) || "EUR",
			buyerReference: fields.buyerReference.trim(),
			orderReference: text(order.no),
			note: EXAMPLE_NOTE,
			paymentTerms: paymentTermsText(dueDate),
			iban: fields.iban.trim(),
			vatRate: input.vatRate,
			seller: party(vendor, vendorName, fields.sellerEmail.trim(), {
				id: text(vendor?.no ?? order.buyFromVendorNo),
				phone: fields.sellerPhone.trim(),
				vatId: fields.sellerVatId.trim().toUpperCase()
			}),
			buyer: party(buyer, buyerName(details, input), fields.buyerEmail.trim(), { vatId: fields.buyerVatId.trim().toUpperCase() || void 0 }),
			lines: toInvoiceLines(details.lines).filter((line) => line.quantity !== 0 || line.amount !== 0).map((line) => ({
				id: line.position,
				itemNo: line.itemNo,
				name: line.description,
				quantity: line.quantity,
				unitCode: unitCode(line.unit),
				netPrice: line.unitPrice,
				lineTotal: line.amount
			}))
		};
	}
	function loadScriptOnce(src) {
		return new Promise((resolve, reject) => {
			if (document.querySelector(`script[src="${src}"]`)?.getAttribute("data-loaded") === "true") return resolve();
			const script = document.createElement("script");
			script.src = src;
			script.onload = () => {
				script.setAttribute("data-loaded", "true");
				resolve();
			};
			script.onerror = () => reject(/* @__PURE__ */ new Error(`Konnte ${src} nicht laden.`));
			document.head.appendChild(script);
		});
	}
	async function loadPdfMake() {
		const w = window;
		if (!w.pdfMake?.vfs) {
			if (!w.pdfMake) await loadScriptOnce(PDFMAKE_URL);
			await loadScriptOnce(PDFMAKE_FONTS_URL);
		}
		if (!w.pdfMake?.createPdf) throw new Error("pdfmake konnte nicht geladen werden.");
		return w.pdfMake;
	}
	function buildDocDefinition(details, input, invoiceNo, issueDate, eInvoice) {
		const { order, vendor } = details;
		const vatRate = input.vatRate;
		const lines = toInvoiceLines(details.lines);
		const sum = totals(lines, vatRate);
		const buyer = buyerName(details, input);
		const sellerVatId = input.eInvoice.sellerVatId.trim().toUpperCase();
		const buyerVatId = input.eInvoice.buyerVatId.trim().toUpperCase();
		const vendorName = String(vendor?.displayName ?? vendor?.name ?? order.buyFromVendorName ?? "");
		const vendorNo = String(vendor?.no ?? order.buyFromVendorNo ?? "");
		const orderDate = formatDate(order.orderDate ?? order.documentDate ?? order.systemCreatedAt);
		const deliveryDate = formatDate(order.expectedReceiptDate ?? order.requestedReceiptDate) || orderDate;
		const infoRow = (label, value) => [{
			text: label,
			color: "#555"
		}, {
			text: value,
			bold: true,
			alignment: "right"
		}];
		const right = (text) => ({
			text,
			alignment: "right"
		});
		return {
			pageSize: "A4",
			pageMargins: [
				50,
				50,
				50,
				60
			],
			watermark: {
				text: "BEISPIEL",
				color: "#999",
				opacity: .08,
				bold: true
			},
			defaultStyle: { fontSize: 10 },
			footer: (current, count) => ({
				columns: [{
					text: "BEISPIEL – keine echte Rechnung",
					color: "#888",
					fontSize: 8
				}, {
					text: `Seite ${current} von ${count}`,
					alignment: "right",
					color: "#888",
					fontSize: 8
				}],
				margin: [
					50,
					20,
					50,
					0
				]
			}),
			content: [
				{
					text: "BEISPIEL – KEINE echte Rechnung",
					color: "#c0392b",
					bold: true,
					fontSize: 9,
					margin: [
						0,
						0,
						0,
						12
					]
				},
				{ columns: [[
					{
						text: vendorName,
						bold: true,
						fontSize: 12
					},
					...vendorAddressLines(vendor).map((text) => ({ text })),
					...sellerVatId ? [{
						text: `USt-IdNr.: ${sellerVatId}`,
						color: "#555"
					}] : [],
					{ text: "\n" },
					{
						text: "Rechnungsempfänger",
						color: "#555",
						fontSize: 8
					},
					{
						text: buyer,
						bold: true
					},
					...vendorAddressLines(details.buyer).map((text) => ({ text })),
					...buyerVatId ? [{
						text: `USt-IdNr.: ${buyerVatId}`,
						color: "#555"
					}] : []
				], {
					width: 230,
					stack: [{
						text: "Rechnung",
						fontSize: 24,
						bold: true,
						alignment: "right",
						margin: [
							0,
							0,
							0,
							8
						]
					}, {
						table: {
							widths: ["*", "auto"],
							body: [
								infoRow("Rechnungsnummer", invoiceNo),
								infoRow("Rechnungsdatum", issueDate.toLocaleDateString("de-DE")),
								infoRow("Bestellnummer", String(order.no ?? "")),
								...eInvoice?.buyerReference ? [infoRow("Käuferreferenz", eInvoice.buyerReference)] : [],
								infoRow("Lieferantennummer", vendorNo),
								...orderDate ? [infoRow("Bestelldatum", orderDate)] : [],
								...deliveryDate ? [infoRow("Lieferdatum", deliveryDate)] : []
							]
						},
						layout: "noBorders"
					}]
				}] },
				{ text: "\n\n" },
				{
					text: `Für Ihre Bestellung ${order.no ?? ""} berechnen wir Ihnen:`,
					margin: [
						0,
						0,
						0,
						8
					]
				},
				{
					table: {
						headerRows: 1,
						widths: [
							"auto",
							"auto",
							"*",
							"auto",
							"auto",
							"auto",
							"auto"
						],
						body: [[
							"Pos.",
							"Artikel",
							"Beschreibung",
							right("Menge"),
							"Einheit",
							right("Einzelpreis"),
							right("Betrag")
						].map((cell) => typeof cell === "string" ? {
							text: cell,
							bold: true,
							fillColor: "#eeeeee"
						} : {
							...cell,
							bold: true,
							fillColor: "#eeeeee"
						}), ...lines.map((line) => [
							line.position,
							line.itemNo,
							line.description,
							right(quantityText(line.quantity)),
							line.unit,
							right(money(line.unitPrice)),
							right(money(line.amount))
						])]
					},
					layout: "lightHorizontalLines"
				},
				{ columns: [{ text: "" }, {
					width: 230,
					margin: [
						0,
						12,
						0,
						0
					],
					table: {
						widths: ["*", "auto"],
						body: [
							["Nettobetrag", right(money(sum.net))],
							[`zzgl. ${quantityText(vatRate)} % MwSt.`, right(money(sum.vat))],
							[{
								text: "Gesamtbetrag",
								bold: true
							}, {
								text: money(sum.gross),
								bold: true,
								alignment: "right"
							}]
						]
					},
					layout: "lightHorizontalLines"
				}] },
				...eInvoice ? [{ text: `\n${eInvoice.paymentTerms} Bitte überweisen Sie ${money(sum.gross)} auf die IBAN ${eInvoice.iban}.` }] : [],
				{
					text: "\n\nEs gelten unsere allgemeinen Geschäftsbedingungen. Diese sind auf unserer Homepage einzusehen.",
					color: "#555"
				}
			]
		};
	}
	async function loadPdfLib() {
		const w = window;
		if (!w.PDFLib) await loadScriptOnce(PDF_LIB_URL);
		if (!w.PDFLib?.PDFDocument) throw new Error("pdf-lib konnte nicht geladen werden.");
		return w.PDFLib;
	}
	async function createInvoiceFile(details, format, input) {
		const invoiceNo = generateInvoiceNumber();
		const issueDate = /* @__PURE__ */ new Date();
		const baseName = `Rechnung_${String(details.order.no ?? "").replace(/[^\w-]+/g, "_")}_${invoiceNo}`;
		if (format === "xrechnung") {
			const xml = buildCiiXml(buildEInvoiceData(details, input, invoiceNo, issueDate), "xrechnung");
			return {
				blob: new Blob([xml], { type: "application/xml" }),
				fileName: `X${baseName}.xml`,
				contentType: "application/xml",
				invoiceNo
			};
		}
		const eInvoice = format === "zugferd" ? buildEInvoiceData(details, input, invoiceNo, issueDate) : void 0;
		const doc = (await loadPdfMake()).createPdf(buildDocDefinition(details, input, invoiceNo, issueDate, eInvoice));
		const pdf = await new Promise((resolve) => doc.getBlob((b) => resolve(b)));
		if (!eInvoice) return {
			blob: pdf,
			fileName: `${baseName}.pdf`,
			contentType: "application/pdf",
			invoiceNo
		};
		const bytes = await createFacturXPdf(await loadPdfLib(), new Uint8Array(await pdf.arrayBuffer()), buildCiiXml(eInvoice, "zugferd"), {
			title: `Rechnung ${invoiceNo}`,
			author: eInvoice.seller.name || "Lieferant",
			subject: `Rechnung ${invoiceNo} zur Bestellung ${eInvoice.orderReference} (${EXAMPLE_NOTE})`
		});
		return {
			blob: new Blob([bytes], { type: "application/pdf" }),
			fileName: `${baseName}_ZUGFeRD.pdf`,
			contentType: "application/pdf",
			invoiceNo
		};
	}
	function isValidEmail(value) {
		return /^[^\s@<>",;]+@[^\s@<>",;]+\.[^\s@<>",;]+$/.test(value);
	}
	function escapeHtml(value) {
		return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
	}
	function blobToBase64(blob) {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onloadend = () => resolve(String(reader.result).split(",")[1] ?? "");
			reader.onerror = () => reject(reader.error);
			reader.readAsDataURL(blob);
		});
	}
	function utf8ToBase64(value) {
		const bytes = new TextEncoder().encode(value);
		let binary = "";
		bytes.forEach((b) => binary += String.fromCharCode(b));
		return btoa(binary);
	}
	function wrapBase64(value) {
		return value.replace(/.{1,76}/g, "$&\r\n");
	}
	function encodeHeader(value) {
		return /^[\x20-\x7e]*$/.test(value) ? value : `=?UTF-8?B?${utf8ToBase64(value)}?=`;
	}
	function buildEml(to, subject, html, attachment) {
		const boundary = `=_${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`;
		const messageId = `<${Date.now().toString(36)}.${Math.random().toString(36).slice(2)}@${window.location.hostname || "localhost"}>`;
		return [
			`Date: ${(/* @__PURE__ */ new Date()).toUTCString()}`,
			`To: ${to}`,
			`Subject: ${encodeHeader(subject)}`,
			`Message-ID: ${messageId}`,
			"X-Unsent: 1",
			"MIME-Version: 1.0",
			`Content-Type: multipart/mixed; boundary="${boundary}"`,
			"",
			`--${boundary}`,
			"Content-Type: text/html; charset=utf-8",
			"Content-Transfer-Encoding: base64",
			"",
			wrapBase64(utf8ToBase64(html)),
			`--${boundary}`,
			`Content-Type: ${attachment.contentType}; name="${attachment.name}"`,
			"Content-Transfer-Encoding: base64",
			`Content-Disposition: attachment; filename="${attachment.name}"`,
			"",
			wrapBase64(attachment.base64),
			`--${boundary}--`,
			""
		].join("\r\n");
	}
	/** E-Mail-Entwurf mit der Rechnung als Anhang. */
	async function createEml(to, details, file) {
		const html = `<html><body>Sehr geehrte Damen und Herren,<br/><br/>im Anhang finden Sie die Rechnung ${escapeHtml(file.invoiceNo)} zu Ihrer Bestellung ${escapeHtml(String(details.order.no ?? ""))}.<br/><br/>Mit freundlichen Grüßen</body></html>`;
		const eml = buildEml(to, `Rechnung ${file.invoiceNo}`, html, {
			name: file.fileName,
			contentType: file.contentType,
			base64: await blobToBase64(file.blob)
		});
		return {
			blob: new Blob([eml], { type: "message/rfc822" }),
			fileName: file.fileName.replace(/\.(pdf|xml)$/, ".eml")
		};
	}
	//#endregion
	//#region src/forms/InvoiceView.svelte
	var root = /* @__PURE__ */ from_html(`<option> </option>`);
	var root_1 = /* @__PURE__ */ from_html(`<div class="loading svelte-1p3qegx"><span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> </div>`);
	var root_2 = /* @__PURE__ */ from_html(`<div class="error svelte-1p3qegx"><strong>Fehler:</strong> </div>`);
	var root_3 = /* @__PURE__ */ from_html(`<tr><td> </td><td> </td><td> </td><td class="num svelte-1p3qegx"> </td><td> </td><td class="num svelte-1p3qegx"> </td><td class="num svelte-1p3qegx"> </td></tr>`);
	var root_4 = /* @__PURE__ */ from_html(`<tr><td colspan="7" class="muted svelte-1p3qegx">Die Bestellung hat keine Zeilen.</td></tr>`);
	var root_5 = /* @__PURE__ */ from_html(`<label class="field svelte-1p3qegx"><span class="svelte-1p3qegx"> </span> <input class="form-control"/></label>`);
	var root_6 = /* @__PURE__ */ from_html(`<strong>Es fehlen Pflichtangaben:</strong> `, 1);
	var root_7 = /* @__PURE__ */ from_html(`<div class="einvoice svelte-1p3qegx"><div class="einvoice-title svelte-1p3qegx">Angaben für die E-Rechnung</div> <div class="grid svelte-1p3qegx"></div> <div class="hint svelte-1p3qegx"><!></div></div>`);
	var root_8 = /* @__PURE__ */ from_html(`<option></option>`);
	var root_9 = /* @__PURE__ */ from_html(`<div class="preview svelte-1p3qegx"><div class="meta svelte-1p3qegx"><div><span class="svelte-1p3qegx">Bestellung</span> <strong> </strong></div> <div><span class="svelte-1p3qegx">Lieferant</span> <strong> </strong></div> <div><span class="svelte-1p3qegx">Anschrift</span> </div></div> <div class="table-wrap svelte-1p3qegx"><table class="table table-sm table-striped svelte-1p3qegx"><thead class="svelte-1p3qegx"><tr><th class="svelte-1p3qegx">Pos.</th><th class="svelte-1p3qegx">Artikel</th><th class="svelte-1p3qegx">Beschreibung</th><th class="num svelte-1p3qegx">Menge</th><th class="svelte-1p3qegx">Einheit</th><th class="num svelte-1p3qegx">Einzelpreis</th><th class="num svelte-1p3qegx">Betrag</th></tr></thead><tbody></tbody></table></div> <div class="totals svelte-1p3qegx"><div>Netto <strong class="svelte-1p3qegx"> </strong></div> <div>MwSt. <strong class="svelte-1p3qegx"> </strong></div> <div>Gesamt <strong class="svelte-1p3qegx"> </strong></div></div> <!> <div class="actions svelte-1p3qegx"><label class="field svelte-1p3qegx"><span class="svelte-1p3qegx">Format</span> <select class="form-control"></select></label> <label class="field email svelte-1p3qegx"><span class="svelte-1p3qegx">Empfänger der E-Mail</span> <input type="email" class="form-control" list="ipo-mailboxes" placeholder="postfach@….emailinbound.service.d-velop.cloud"/> <datalist id="ipo-mailboxes"></datalist></label> <button type="button" class="btn btn-outline-primary" title="E-Mail-Entwurf mit der Rechnung als Anhang, z. B. an den Rechnungsleser">Als E-Mail (.eml) herunterladen</button> <button type="button" class="btn btn-primary">Rechnung herunterladen</button></div></div>`);
	var root_10 = /* @__PURE__ */ from_html(`<div class="section svelte-1p3qegx"><div class="header svelte-1p3qegx">Rechnung aus Bestellung</div> <div class="body svelte-1p3qegx"><div class="grid svelte-1p3qegx"><label class="field svelte-1p3qegx"><span class="svelte-1p3qegx">Umgebung</span> <select class="form-control"><option>– Umgebung wählen –</option><!></select></label> <label class="field svelte-1p3qegx"><span class="svelte-1p3qegx">Firma</span> <select class="form-control"><option>– Firma wählen –</option><!></select></label> <label class="field svelte-1p3qegx"><span class="svelte-1p3qegx">MwSt.-Satz (%)</span> <input type="number" class="form-control" min="0" max="100" step="0.1"/></label></div> <label class="field order svelte-1p3qegx"><span class="svelte-1p3qegx">Bestellung</span> <input type="search" class="form-control" placeholder="Suchen nach Nummer oder Lieferant…"/> <select class="form-control order-select svelte-1p3qegx"><option> </option><!></select></label> <!> <!> <!></div></div>`);
	var $$css = {
		hash: "svelte-1p3qegx",
		code: ".section.svelte-1p3qegx {border:1px solid #dee2e6;border-radius:6px;background:#fff;}.header.svelte-1p3qegx {padding:10px 12px;border-bottom:1px solid #dee2e6;background:#f8f9fa;border-radius:6px 6px 0 0;font-weight:600;font-size:1.05em;}.body.svelte-1p3qegx {padding:12px;}.grid.svelte-1p3qegx {display:grid;grid-template-columns:repeat(auto-fit, minmax(220px, 1fr));gap:12px;align-items:end;}.field.svelte-1p3qegx {display:block;margin:0;}.field.svelte-1p3qegx > span:where(.svelte-1p3qegx) {display:block;font-size:0.85em;font-weight:600;color:#495057;margin-bottom:3px;}.order.svelte-1p3qegx {margin-top:12px;}.order-select.svelte-1p3qegx {margin-top:4px;}.loading.svelte-1p3qegx {display:flex;align-items:center;gap:8px;color:#6c757d;margin-top:12px;}.error.svelte-1p3qegx {color:#842029;background:#f8d7da;border:1px solid #f5c2c7;border-radius:6px;padding:10px 12px;margin-top:12px;}.preview.svelte-1p3qegx {margin-top:16px;border-top:1px solid #dee2e6;padding-top:12px;}.meta.svelte-1p3qegx {display:flex;flex-wrap:wrap;gap:6px 18px;margin-bottom:10px;}.meta.svelte-1p3qegx span:where(.svelte-1p3qegx) {color:#6c757d;}.table-wrap.svelte-1p3qegx {max-height:45vh;overflow:auto;border:1px solid #dee2e6;border-radius:6px;}table.svelte-1p3qegx {margin:0;font-size:0.9em;}thead.svelte-1p3qegx th:where(.svelte-1p3qegx) {position:sticky;top:0;background:#f8f9fa;white-space:nowrap;}.num.svelte-1p3qegx {text-align:right;white-space:nowrap;font-variant-numeric:tabular-nums;}.totals.svelte-1p3qegx {display:flex;justify-content:flex-end;gap:18px;flex-wrap:wrap;margin-top:10px;}.totals.svelte-1p3qegx strong:where(.svelte-1p3qegx) {font-variant-numeric:tabular-nums;}.actions.svelte-1p3qegx {display:flex;justify-content:flex-end;align-items:flex-end;gap:8px;flex-wrap:wrap;margin-top:12px;}.email.svelte-1p3qegx {flex:0 1 380px;}.einvoice.svelte-1p3qegx {margin-top:14px;padding:10px 12px;border:1px solid #dee2e6;border-radius:6px;background:#f8f9fa;}.einvoice-title.svelte-1p3qegx {font-weight:600;margin-bottom:8px;}.hint.svelte-1p3qegx {margin-top:8px;font-size:0.85em;color:#6c4a00;}.muted.svelte-1p3qegx {color:#adb5bd;font-style:italic;}"
	};
	function InvoiceView($$anchor, $$props) {
		push($$props, true);
		append_styles($$anchor, $$css);
		let state = prop($$props, "state", 7);
		const LOADING_TEXT = {
			environments: "Umgebungen werden geladen…",
			companies: "Firmen werden geladen…",
			orders: "Bestellungen werden geladen…",
			order: "Bestellung wird geladen…",
			pdf: "Rechnung wird erzeugt…"
		};
		const busy = /* @__PURE__ */ user_derived(() => !!state().loading);
		const lines = /* @__PURE__ */ user_derived(() => state().details ? toInvoiceLines(state().details.lines) : []);
		const sum = /* @__PURE__ */ user_derived(() => totals(get(lines), state().vatRate));
		const vendor = /* @__PURE__ */ user_derived(() => state().details?.vendor);
		const vendorName = /* @__PURE__ */ user_derived(() => String(get(vendor)?.displayName ?? get(vendor)?.name ?? state().details?.order.buyFromVendorName ?? ""));
		const eInvoiceFields = /* @__PURE__ */ user_derived(() => [
			{
				key: "iban",
				label: "IBAN des Lieferanten",
				type: "text",
				hint: TEST_IBAN
			},
			{
				key: "buyerReference",
				label: state().format === "xrechnung" ? "Käuferreferenz / Leitweg-ID" : "Käuferreferenz",
				type: "text",
				hint: ""
			},
			{
				key: "sellerEmail",
				label: "E-Mail des Lieferanten",
				type: "email",
				hint: ""
			},
			{
				key: "sellerPhone",
				label: "Telefon des Lieferanten",
				type: "tel",
				hint: ""
			},
			{
				key: "sellerVatId",
				label: "USt-IdNr. des Lieferanten",
				type: "text",
				hint: "DE123456789"
			},
			{
				key: "buyerEmail",
				label: "E-Mail des Käufers",
				type: "email",
				hint: ""
			},
			{
				key: "buyerVatId",
				label: "USt-IdNr. des Käufers (optional)",
				type: "text",
				hint: "DE123456789"
			}
		]);
		function onVatChange(event) {
			state().setVatRate(event.currentTarget.value);
			event.currentTarget.value = String(state().vatRate);
		}
		var div = root_10();
		var div_1 = sibling(child(div), 2);
		var div_2 = child(div_1);
		var label = child(div_2);
		var select = sibling(child(label), 2);
		var option = child(select);
		option.value = option.__value = "";
		each(sibling(option), 17, () => state().environments, (environment) => environment.name, ($$anchor, environment) => {
			var option_1 = root();
			var text = only_child(option_1, true);
			var option_1_value = {};
			template_effect(() => {
				set_text(text, get(environment).type ? `${get(environment).name} (${get(environment).type})` : get(environment).name);
				if (option_1_value !== (option_1_value = get(environment).name)) option_1.value = (option_1.__value = option_1_value) ?? "";
			});
			append($$anchor, option_1);
		});
		reset(select);
		var select_value;
		init_select(select);
		reset(label);
		var label_1 = sibling(label, 2);
		var select_1 = sibling(child(label_1), 2);
		var option_2 = child(select_1);
		option_2.value = option_2.__value = "";
		each(sibling(option_2), 17, () => state().companies, (company) => company.id, ($$anchor, company) => {
			var option_3 = root();
			var text_1 = only_child(option_3, true);
			var option_3_value = {};
			template_effect(() => {
				set_text(text_1, get(company).name);
				if (option_3_value !== (option_3_value = get(company).id)) option_3.value = (option_3.__value = option_3_value) ?? "";
			});
			append($$anchor, option_3);
		});
		reset(select_1);
		var select_1_value;
		init_select(select_1);
		reset(label_1);
		var label_2 = sibling(label_1, 2);
		var input = sibling(child(label_2), 2);
		remove_input_defaults(input);
		reset(label_2);
		reset(div_2);
		var label_3 = sibling(div_2, 2);
		var input_1 = sibling(child(label_3), 2);
		remove_input_defaults(input_1);
		var select_2 = sibling(input_1, 2);
		var option_4 = child(select_2);
		var text_2 = only_child(option_4, true);
		option_4.value = option_4.__value = "";
		each(sibling(option_4), 17, () => state().filteredOrders, (order) => order.no, ($$anchor, order) => {
			var option_5 = root();
			var text_3 = only_child(option_5, true);
			var option_5_value = {};
			template_effect(($0) => {
				set_text(text_3, $0);
				if (option_5_value !== (option_5_value = get(order).no)) option_5.value = (option_5.__value = option_5_value) ?? "";
			}, [() => [
				get(order).no,
				get(order).vendorName || get(order).vendorNo,
				formatDate(get(order).date)
			].filter(Boolean).join(" · ")]);
			append($$anchor, option_5);
		});
		reset(select_2);
		var select_2_value;
		init_select(select_2);
		reset(label_3);
		var node_3 = sibling(label_3, 2);
		var consequent = ($$anchor) => {
			var div_3 = root_1();
			var text_4 = sibling(child(div_3), 1, true);
			reset(div_3);
			template_effect(() => set_text(text_4, LOADING_TEXT[state().loading] ?? ""));
			append($$anchor, div_3);
		};
		if_block(node_3, ($$render) => {
			if (get(busy)) $$render(consequent);
		});
		var node_4 = sibling(node_3, 2);
		var consequent_1 = ($$anchor) => {
			var div_4 = root_2();
			var text_5 = sibling(child(div_4));
			reset(div_4);
			template_effect(() => set_text(text_5, ` ${state().error ?? ""}`));
			append($$anchor, div_4);
		};
		if_block(node_4, ($$render) => {
			if (state().error) $$render(consequent_1);
		});
		var node_5 = sibling(node_4, 2);
		var consequent_4 = ($$anchor) => {
			const details = /* @__PURE__ */ user_derived(() => state().details);
			var div_5 = root_9();
			var div_6 = child(div_5);
			var div_7 = child(div_6);
			var text_6 = only_child(sibling(child(div_7), 2), true);
			reset(div_7);
			var div_8 = sibling(div_7, 2);
			var text_7 = only_child(sibling(child(div_8), 2), true);
			reset(div_8);
			var div_9 = sibling(div_8, 2);
			var text_8 = sibling(child(div_9));
			reset(div_9);
			reset(div_6);
			var div_10 = sibling(div_6, 2);
			var table = child(div_10);
			var tbody = sibling(child(table));
			each(tbody, 23, () => get(lines), (line, index) => `${line.position}|${index}`, ($$anchor, line) => {
				var tr = root_3();
				var td = child(tr);
				var text_9 = only_child(td, true);
				var td_1 = sibling(td);
				var text_10 = only_child(td_1, true);
				var td_2 = sibling(td_1);
				var text_11 = only_child(td_2, true);
				var td_3 = sibling(td_2);
				var text_12 = only_child(td_3, true);
				var td_4 = sibling(td_3);
				var text_13 = only_child(td_4, true);
				var td_5 = sibling(td_4);
				var text_14 = only_child(td_5, true);
				var text_15 = only_child(sibling(td_5), true);
				reset(tr);
				template_effect(($0, $1, $2) => {
					set_text(text_9, get(line).position);
					set_text(text_10, get(line).itemNo);
					set_text(text_11, get(line).description);
					set_text(text_12, $0);
					set_text(text_13, get(line).unit);
					set_text(text_14, $1);
					set_text(text_15, $2);
				}, [
					() => quantityText(get(line).quantity),
					() => money(get(line).unitPrice),
					() => money(get(line).amount)
				]);
				append($$anchor, tr);
			}, ($$anchor) => {
				append($$anchor, root_4());
			});
			reset(tbody);
			reset(table);
			reset(div_10);
			var div_11 = sibling(div_10, 2);
			var div_12 = child(div_11);
			var text_16 = only_child(sibling(child(div_12)), true);
			reset(div_12);
			var div_13 = sibling(div_12, 2);
			var text_17 = only_child(sibling(child(div_13)), true);
			reset(div_13);
			var div_14 = sibling(div_13, 2);
			var text_18 = only_child(sibling(child(div_14)), true);
			reset(div_14);
			reset(div_11);
			var node_6 = sibling(div_11, 2);
			var consequent_3 = ($$anchor) => {
				var div_15 = root_7();
				var div_16 = sibling(child(div_15), 2);
				each(div_16, 21, () => get(eInvoiceFields), (field) => field.key, ($$anchor, field) => {
					var label_4 = root_5();
					var span = child(label_4);
					var text_19 = only_child(span, true);
					var input_2 = sibling(span, 2);
					remove_input_defaults(input_2);
					reset(label_4);
					template_effect(() => {
						set_text(text_19, get(field).label);
						set_attribute(input_2, "type", get(field).type);
						set_attribute(input_2, "placeholder", get(field).hint || void 0);
					});
					bind_value(input_2, () => state().eInvoice[get(field).key], ($$value) => state().eInvoice[get(field).key] = $$value);
					append($$anchor, label_4);
				});
				reset(div_16);
				var div_17 = sibling(div_16, 2);
				var node_7 = child(div_17);
				var consequent_2 = ($$anchor) => {
					var fragment = root_6();
					var text_20 = sibling(first_child(fragment));
					template_effect(($0) => set_text(text_20, ` ${$0 ?? ""}.`), [() => state().missingEInvoiceFields.join(", ")]);
					append($$anchor, fragment);
				};
				var alternate = ($$anchor) => {
					append($$anchor, text$1("Pflichtangaben vollständig."));
				};
				if_block(node_7, ($$render) => {
					if (state().missingEInvoiceFields.length) $$render(consequent_2);
					else $$render(alternate, -1);
				});
				reset(div_17);
				reset(div_15);
				append($$anchor, div_15);
			};
			if_block(node_6, ($$render) => {
				if (state().format !== "pdf") $$render(consequent_3);
			});
			var div_18 = sibling(node_6, 2);
			var label_5 = child(div_18);
			var select_3 = sibling(child(label_5), 2);
			each(select_3, 21, () => FORMATS, (format) => format.value, ($$anchor, format) => {
				var option_6 = root();
				var text_22 = only_child(option_6, true);
				var option_6_value = {};
				template_effect(() => {
					set_text(text_22, get(format).label);
					if (option_6_value !== (option_6_value = get(format).value)) option_6.value = (option_6.__value = option_6_value) ?? "";
				});
				append($$anchor, option_6);
			});
			reset(select_3);
			init_select(select_3);
			reset(label_5);
			var label_6 = sibling(label_5, 2);
			var input_3 = sibling(child(label_6), 2);
			remove_input_defaults(input_3);
			var datalist = sibling(input_3, 2);
			each(datalist, 20, () => state().mailboxes, (mailbox) => mailbox, ($$anchor, mailbox) => {
				var option_7 = root_8();
				var option_7_value = {};
				template_effect(() => {
					if (option_7_value !== (option_7_value = mailbox)) option_7.value = (option_7.__value = option_7_value) ?? "";
				});
				append($$anchor, option_7);
			});
			reset(datalist);
			reset(label_6);
			var button = sibling(label_6, 2);
			var button_1 = sibling(button, 2);
			reset(div_18);
			reset(div_5);
			template_effect(($0, $1, $2, $3, $4, $5) => {
				set_text(text_6, $0);
				set_text(text_7, $1);
				set_text(text_8, ` ${$2 ?? ""}`);
				set_text(text_16, $3);
				set_text(text_17, $4);
				set_text(text_18, $5);
				button.disabled = get(busy);
				button_1.disabled = get(busy);
			}, [
				() => String(get(details).order.no ?? ""),
				() => [get(vendor)?.no ?? get(details).order.buyFromVendorNo, get(vendorName)].filter(Boolean).join(" – "),
				() => vendorAddressLines(get(vendor)).join(", ") || "–",
				() => money(get(sum).net),
				() => money(get(sum).vat),
				() => money(get(sum).gross)
			]);
			bind_select_value(select_3, () => state().format, ($$value) => state().format = $$value);
			bind_value(input_3, () => state().emailTo, ($$value) => state().emailTo = $$value);
			delegated("click", button, () => state().downloadEml());
			delegated("click", button_1, () => state().downloadInvoice());
			append($$anchor, div_5);
		};
		if_block(node_5, ($$render) => {
			if (state().details) $$render(consequent_4);
		});
		reset(div_1);
		reset(div);
		template_effect(() => {
			select.disabled = get(busy);
			if (select_value !== (select_value = state().environment)) select.value = (select.__value = select_value) ?? "", select_option(select, select_value);
			select_1.disabled = get(busy) || !state().environment;
			if (select_1_value !== (select_1_value = state().companyId)) select_1.value = (select_1.__value = select_1_value) ?? "", select_option(select_1, select_1_value);
			set_value(input, state().vatRate);
			input_1.disabled = !state().companyId;
			select_2.disabled = get(busy) || !state().companyId;
			set_text(text_2, state().orders.length ? `– Bestellung wählen (${state().filteredOrders.length} von ${state().orders.length}) –` : "– keine Bestellungen –");
			if (select_2_value !== (select_2_value = state().orderNo)) select_2.value = (select_2.__value = select_2_value) ?? "", select_option(select_2, select_2_value);
		});
		delegated("change", select, (e) => state().selectEnvironment(e.currentTarget.value));
		delegated("change", select_1, (e) => state().selectCompany(e.currentTarget.value));
		delegated("change", input, onVatChange);
		bind_value(input_1, () => state().orderFilter, ($$value) => state().orderFilter = $$value);
		delegated("change", select_2, (e) => state().selectOrder(e.currentTarget.value));
		append($$anchor, div);
		pop();
	}
	delegate(["change", "click"]);
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
	//#region ../../helper/scripting/callScriptEndpoint.ts
	async function callScriptEndpoint(baseUri, scriptId, method, headers, payload) {
		return await performHttpRequest(`${baseUri}/scripting/script/${scriptId}/run`, {
			method,
			headers,
			body: JSON.stringify(payload)
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
	//#endregion
	//#region src/forms/invoiceState.svelte.ts
	var SCRIPT_NAME = "Rechnung aus Bestellung";
	var PREFERRED_MAILBOX = "fruehesscannenmail";
	function getErrorMessage(error) {
		return error && typeof error === "object" && "message" in error ? String(error.message) : String(error);
	}
	/**
	* Zustand und Logik von "Rechnung aus Bestellung": Umgebung, Firma und
	* Bestellung nacheinander wählen (jede Auswahl lädt die nächste Liste), dann
	* Rechnung bzw. E-Mail-Entwurf erzeugen.
	*/
	var InvoiceFromOrder = class {
		#environments;
		get environments() {
			return get(this.#environments);
		}
		set environments(value) {
			set(this.#environments, value, true);
		}
		#companies;
		get companies() {
			return get(this.#companies);
		}
		set companies(value) {
			set(this.#companies, value, true);
		}
		#orders;
		get orders() {
			return get(this.#orders);
		}
		set orders(value) {
			set(this.#orders, value, true);
		}
		#environment;
		get environment() {
			return get(this.#environment);
		}
		set environment(value) {
			set(this.#environment, value, true);
		}
		#companyId;
		get companyId() {
			return get(this.#companyId);
		}
		set companyId(value) {
			set(this.#companyId, value, true);
		}
		#orderNo;
		get orderNo() {
			return get(this.#orderNo);
		}
		set orderNo(value) {
			set(this.#orderNo, value, true);
		}
		#orderFilter;
		get orderFilter() {
			return get(this.#orderFilter);
		}
		set orderFilter(value) {
			set(this.#orderFilter, value, true);
		}
		#vatRate;
		get vatRate() {
			return get(this.#vatRate);
		}
		set vatRate(value) {
			set(this.#vatRate, value, true);
		}
		#emailTo;
		get emailTo() {
			return get(this.#emailTo);
		}
		set emailTo(value) {
			set(this.#emailTo, value, true);
		}
		#mailboxes;
		get mailboxes() {
			return get(this.#mailboxes);
		}
		set mailboxes(value) {
			set(this.#mailboxes, value, true);
		}
		#format;
		get format() {
			return get(this.#format);
		}
		set format(value) {
			set(this.#format, value, true);
		}
		#eInvoice;
		get eInvoice() {
			return get(this.#eInvoice);
		}
		set eInvoice(value) {
			set(this.#eInvoice, value, true);
		}
		#details;
		get details() {
			return get(this.#details);
		}
		set details(value) {
			set(this.#details, value, true);
		}
		#loading;
		get loading() {
			return get(this.#loading);
		}
		set loading(value) {
			set(this.#loading, value, true);
		}
		#error;
		get error() {
			return get(this.#error);
		}
		set error(value) {
			set(this.#error, value, true);
		}
		#filteredOrders;
		get filteredOrders() {
			return get(this.#filteredOrders);
		}
		set filteredOrders(value) {
			set(this.#filteredOrders, value);
		}
		#missingEInvoiceFields;
		get missingEInvoiceFields() {
			return get(this.#missingEInvoiceFields);
		}
		set missingEInvoiceFields(value) {
			set(this.#missingEInvoiceFields, value);
		}
		constructor() {
			this.#environments = /* @__PURE__ */ state(proxy([]));
			this.#companies = /* @__PURE__ */ state(proxy([]));
			this.#orders = /* @__PURE__ */ state(proxy([]));
			this.#environment = /* @__PURE__ */ state("");
			this.#companyId = /* @__PURE__ */ state("");
			this.#orderNo = /* @__PURE__ */ state("");
			this.#orderFilter = /* @__PURE__ */ state("");
			this.#vatRate = /* @__PURE__ */ state(proxy(19));
			this.#emailTo = /* @__PURE__ */ state("");
			this.#mailboxes = /* @__PURE__ */ state(proxy([]));
			this.#format = /* @__PURE__ */ state("pdf");
			this.#eInvoice = /* @__PURE__ */ state(proxy({
				iban: TEST_IBAN,
				buyerReference: "",
				sellerEmail: "",
				sellerPhone: "",
				sellerVatId: "",
				buyerEmail: "",
				buyerVatId: ""
			}));
			this.#details = /* @__PURE__ */ state();
			this.#loading = /* @__PURE__ */ state("");
			this.#error = /* @__PURE__ */ state("");
			this.#filteredOrders = /* @__PURE__ */ user_derived(() => {
				const filter = this.orderFilter.trim().toLowerCase();
				if (!filter) return this.orders;
				return this.orders.filter((o) => `${o.no} ${o.vendorNo} ${o.vendorName}`.toLowerCase().includes(filter));
			});
			this.#missingEInvoiceFields = /* @__PURE__ */ user_derived(() => this.details && this.format !== "pdf" ? missingEInvoiceFields(buildEInvoiceData(this.details, this.input, "0", /* @__PURE__ */ new Date()), this.format) : []);
		}
		/** Eingaben für Rechnung und E-Rechnung (siehe invoice.ts). */
		get input() {
			return {
				vatRate: this.vatRate,
				eInvoice: this.eInvoice,
				companyName: this.companies.find((c) => c.id === this.companyId)?.name ?? ""
			};
		}
		async callScript(payload) {
			const baseUri = window.location.origin;
			if (!this.scriptId) {
				this.scriptId = (await getAllScripts(baseUri, "")).body.find((s) => s.name === SCRIPT_NAME)?.id;
				if (!this.scriptId) throw new Error(`Script "${SCRIPT_NAME}" wurde nicht gefunden - wurde es bereits über die Toolbox angelegt?`);
			}
			try {
				const body = (await callScriptEndpoint(baseUri, this.scriptId, "POST", {
					"Content-Type": "application/json",
					Accept: "application/json"
				}, payload)).body;
				if (!body || typeof body !== "object") throw new Error(`Unerwartete Antwort von Script "${SCRIPT_NAME}" - bitte das Tool über die Toolbox aktualisieren.`);
				return body;
			} catch (error) {
				const message = getErrorMessage(error);
				const match = message.match(/"error"\s*:\s*"((?:[^"\\]|\\.)*)"/);
				throw new Error(match ? JSON.parse(`"${match[1]}"`) : message);
			}
		}
		async runLoading(kind, action) {
			this.loading = kind;
			this.error = "";
			try {
				await action();
			} catch (error) {
				getLogger().error(`Fehler (${kind}): ${getErrorMessage(error)}`);
				this.error = getErrorMessage(error);
			} finally {
				if (this.loading === kind) this.loading = "";
			}
		}
		resetOrders() {
			this.orders = [];
			this.orderNo = "";
			this.orderFilter = "";
			this.details = void 0;
		}
		async loadEnvironments() {
			await this.runLoading("environments", async () => {
				this.environments = (await this.callScript({ method: "getEnvironments" })).environments ?? [];
				if (this.environments.length === 1) await this.selectEnvironment(this.environments[0].name);
			});
		}
		async selectEnvironment(name) {
			this.environment = name;
			this.companies = [];
			this.companyId = "";
			this.resetOrders();
			if (!name) return;
			await this.runLoading("companies", async () => {
				this.companies = [...(await this.callScript({
					method: "getCompanies",
					environment: name
				})).companies ?? []].sort((a, b) => a.name.localeCompare(b.name, "de"));
				if (this.companies.length === 1) await this.selectCompany(this.companies[0].id);
			});
		}
		async selectCompany(id) {
			this.companyId = id;
			this.resetOrders();
			if (!id) return;
			await this.runLoading("orders", async () => {
				this.orders = [...(await this.callScript({
					method: "getOrders",
					environment: this.environment,
					companyId: id
				})).orders ?? []].sort((a, b) => b.no.localeCompare(a.no, "de", { numeric: true }));
			});
		}
		async selectOrder(no) {
			this.orderNo = no;
			this.details = void 0;
			if (!no) return;
			await this.runLoading("order", async () => {
				const details = await this.callScript({
					method: "getOrder",
					environment: this.environment,
					companyId: this.companyId,
					orderNo: no
				});
				if (this.orderNo === no) {
					this.details = details;
					this.eInvoice = {
						iban: this.eInvoice.iban || "DE02120300000000202051",
						buyerReference: String(details.order.no ?? ""),
						sellerEmail: text(details.vendor?.email ?? details.vendor?.eMail),
						sellerPhone: text(details.vendor?.phoneNumber ?? details.vendor?.phoneNo),
						sellerVatId: normalizeVatId(details.vendor?.vatRegistrationNo ?? details.vendor?.vatRegistrationNumber ?? details.vendor?.taxRegistrationNumber, details.vendor?.country ?? details.vendor?.countryRegionCode),
						buyerEmail: text(details.buyer?.email) || this.emailTo,
						buyerVatId: normalizeVatId(details.buyer?.taxRegistrationNumber ?? details.buyer?.vatRegistrationNo, details.buyer?.country)
					};
				}
			});
		}
		/** Übernimmt den MwSt.-Satz, ungültige Werte setzen auf den Standard zurück. */
		setVatRate(raw) {
			const value = Number(raw);
			this.vatRate = Number.isFinite(value) && value >= 0 && value <= 100 ? value : 19;
		}
		async loadMailboxes() {
			try {
				const settings = (await getEmailinboundProfiles(window.location.origin, "")).body.mailStoreSettings ?? [];
				this.mailboxes = settings.map((m) => String(m.mailbox ?? "")).filter(Boolean).sort();
				if (!this.emailTo) this.emailTo = this.mailboxes.find((m) => m.split("@")[0].toLowerCase() === PREFERRED_MAILBOX) ?? settings.find((m) => m.isDefaultMailbox)?.mailbox ?? this.mailboxes[0] ?? "";
			} catch (error) {
				getLogger().warn(`E-Mail-Eingangs-Postfächer nicht ladbar: ${getErrorMessage(error)}`);
			}
		}
		async downloadInvoice() {
			const details = this.details;
			if (!details) return;
			await this.runLoading("pdf", async () => {
				const { blob, fileName } = await createInvoiceFile(details, this.format, this.input);
				downloadBlob(blob, fileName);
			});
		}
		async downloadEml() {
			const details = this.details;
			if (!details) return;
			const to = this.emailTo.trim();
			if (!isValidEmail(to)) {
				this.error = "Bitte eine gültige Empfänger-Adresse angeben.";
				return;
			}
			await this.runLoading("pdf", async () => {
				const file = await createInvoiceFile(details, this.format, this.input);
				const { blob, fileName } = await createEml(to, details, file);
				downloadBlob(blob, fileName);
			});
		}
	};
	//#endregion
	//#region src/forms/form.ts
	var logger = initLogger(LogLevel.INFO);
	window.formInit = function(form, data) {
		logger.debug(`Rechnung aus Bestellung initialisiert.`);
		const state = new InvoiceFromOrder();
		mountInForm(form, InvoiceView, { state });
		state.loadEnvironments();
		state.loadMailboxes();
	};
	//#endregion
})();

//# sourceMappingURL=formBundle.js.map