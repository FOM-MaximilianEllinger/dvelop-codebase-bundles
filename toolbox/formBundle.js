/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/sweetalert2/dist/sweetalert2.all.js"
/*!**********************************************************!*\
  !*** ./node_modules/sweetalert2/dist/sweetalert2.all.js ***!
  \**********************************************************/
(module) {

/*!
* sweetalert2 v11.26.25
* Released under the MIT License.
*/
(function (global, factory) {
   true ? module.exports = factory() :
  0;
})(this, (function () { 'use strict';

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
    } else if (document.body) {
      document.body.focus();
    }
  };

  /**
   * Restore previous active (focused) element
   *
   * @param {boolean} returnFocus
   * @returns {Promise<void>}
   */
  const restoreActiveElement = returnFocus => {
    return new Promise(resolve => {
      if (!returnFocus) {
        return resolve();
      }
      const x = window.scrollX;
      const y = window.scrollY;
      globalState.restoreFocusTimeout = setTimeout(() => {
        focusPreviousActiveElement();
        resolve();
      }, RESTORE_FOCUS_TIMEOUT); // issues/900

      window.scrollTo(x, y);
    });
  };

  const swalPrefix = 'swal2-';

  /**
   * @typedef {Record<SwalClass, string>} SwalClasses
   */

  /**
   * @typedef {'success' | 'warning' | 'info' | 'question' | 'error'} SwalIcon
   * @typedef {Record<SwalIcon, string>} SwalIcons
   */

  /** @type {SwalClass[]} */
  const classNames = ['container', 'shown', 'height-auto', 'iosfix', 'popup', 'modal', 'no-backdrop', 'no-transition', 'toast', 'toast-shown', 'show', 'hide', 'close', 'title', 'html-container', 'actions', 'confirm', 'deny', 'cancel', 'footer', 'icon', 'icon-content', 'image', 'input', 'file', 'range', 'select', 'radio', 'checkbox', 'label', 'textarea', 'inputerror', 'input-label', 'validation-message', 'progress-steps', 'active-progress-step', 'progress-step', 'progress-step-line', 'loader', 'loading', 'styled', 'top', 'top-start', 'top-end', 'top-left', 'top-right', 'center', 'center-start', 'center-end', 'center-left', 'center-right', 'bottom', 'bottom-start', 'bottom-end', 'bottom-left', 'bottom-right', 'grow-row', 'grow-column', 'grow-fullscreen', 'rtl', 'timer-progress-bar', 'timer-progress-bar-container', 'scrollbar-measure', 'icon-success', 'icon-warning', 'icon-info', 'icon-question', 'icon-error', 'draggable', 'dragging'];
  const swalClasses = classNames.reduce((acc, className) => {
    acc[className] = swalPrefix + className;
    return acc;
  }, /** @type {SwalClasses} */{});

  /** @type {SwalIcon[]} */
  const icons = ['success', 'warning', 'info', 'question', 'error'];
  const iconTypes = icons.reduce((acc, icon) => {
    acc[icon] = swalPrefix + icon;
    return acc;
  }, /** @type {SwalIcons} */{});

  const consolePrefix = 'SweetAlert2:';

  /**
   * Capitalize the first letter of a string
   *
   * @param {string} str
   * @returns {string}
   */
  const capitalizeFirstLetter = str => str.charAt(0).toUpperCase() + str.slice(1);

  /**
   * Standardize console warnings
   *
   * @param {string | string[]} message
   */
  const warn = message => {
    console.warn(`${consolePrefix} ${typeof message === 'object' ? message.join(' ') : message}`);
  };

  /**
   * Standardize console errors
   *
   * @param {string} message
   */
  const error = message => {
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
  const warnOnce = message => {
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
    warnOnce(`"${deprecatedParam}" is deprecated and will be removed in the next major release.${useInstead ? ` Use "${useInstead}" instead.` : ''}`);
  };

  /**
   * If `arg` is a function, call it (with no arguments or context) and return the result.
   * Otherwise, just pass the value through
   *
   * @param {(() => *) | *} arg
   * @returns {*}
   */
  const callIfFunction = arg => typeof arg === 'function' ? arg() : arg;

  /**
   * @param {*} arg
   * @returns {boolean}
   */
  const hasToPromiseFn = arg => arg && typeof arg.toPromise === 'function';

  /**
   * @param {*} arg
   * @returns {Promise<*>}
   */
  const asPromise = arg => hasToPromiseFn(arg) ? arg.toPromise() : Promise.resolve(arg);

  /**
   * @param {*} arg
   * @returns {boolean}
   */
  const isPromise = arg => arg && Promise.resolve(arg) === arg;

  /**
   * @returns {boolean}
   */
  const isFirefox = () => navigator.userAgent.includes('Firefox');

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
  const elementBySelector = selectorString => {
    const container = getContainer();
    return container ? container.querySelector(selectorString) : null;
  };

  /**
   * @param {string} className
   * @returns {HTMLElement | null}
   */
  const elementByClass = className => {
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
  const getIconContent = () => elementByClass(swalClasses['icon-content']);

  /**
   * @returns {HTMLElement | null}
   */
  const getTitle = () => elementByClass(swalClasses.title);

  /**
   * @returns {HTMLElement | null}
   */
  const getHtmlContainer = () => elementByClass(swalClasses['html-container']);

  /**
   * @returns {HTMLElement | null}
   */
  const getImage = () => elementByClass(swalClasses.image);

  /**
   * @returns {HTMLElement | null}
   */
  const getProgressSteps = () => elementByClass(swalClasses['progress-steps']);

  /**
   * @returns {HTMLElement | null}
   */
  const getValidationMessage = () => elementByClass(swalClasses['validation-message']);

  /**
   * @returns {HTMLButtonElement | null}
   */
  const getConfirmButton = () => (/** @type {HTMLButtonElement} */elementBySelector(`.${swalClasses.actions} .${swalClasses.confirm}`));

  /**
   * @returns {HTMLButtonElement | null}
   */
  const getCancelButton = () => (/** @type {HTMLButtonElement} */elementBySelector(`.${swalClasses.actions} .${swalClasses.cancel}`));

  /**
   * @returns {HTMLButtonElement | null}
   */
  const getDenyButton = () => (/** @type {HTMLButtonElement} */elementBySelector(`.${swalClasses.actions} .${swalClasses.deny}`));

  /**
   * @returns {HTMLElement | null}
   */
  const getInputLabel = () => elementByClass(swalClasses['input-label']);

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
  const getTimerProgressBar = () => elementByClass(swalClasses['timer-progress-bar']);

  /**
   * @returns {HTMLElement | null}
   */
  const getCloseButton = () => elementByClass(swalClasses.close);

  // https://github.com/jkup/focusable/blob/master/index.js
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
    if (!popup) {
      return [];
    }
    /** @type {NodeListOf<HTMLElement>} */
    const focusableElementsWithTabindex = popup.querySelectorAll('[tabindex]:not([tabindex="-1"]):not([tabindex="0"])');
    const focusableElementsWithTabindexSorted = Array.from(focusableElementsWithTabindex)
    // sort according to tabindex
    .sort((a, b) => {
      const tabindexA = parseInt(a.getAttribute('tabindex') || '0');
      const tabindexB = parseInt(b.getAttribute('tabindex') || '0');
      if (tabindexA > tabindexB) {
        return 1;
      } else if (tabindexA < tabindexB) {
        return -1;
      }
      return 0;
    });

    /** @type {NodeListOf<HTMLElement>} */
    const otherFocusableElements = popup.querySelectorAll(focusable);
    const otherFocusableElementsFiltered = Array.from(otherFocusableElements).filter(el => el.getAttribute('tabindex') !== '-1');
    return [...new Set(focusableElementsWithTabindexSorted.concat(otherFocusableElementsFiltered))].filter(el => isVisible$1(el));
  };

  /**
   * @returns {boolean}
   */
  const isModal = () => {
    return hasClass(document.body, swalClasses.shown) && !hasClass(document.body, swalClasses['toast-shown']) && !hasClass(document.body, swalClasses['no-backdrop']);
  };

  /**
   * @returns {boolean}
   */
  const isToast = () => {
    const popup = getPopup();
    if (!popup) {
      return false;
    }
    return hasClass(popup, swalClasses.toast);
  };

  /**
   * @returns {boolean}
   */
  const isLoading = () => {
    const popup = getPopup();
    if (!popup) {
      return false;
    }
    return popup.hasAttribute('data-loading');
  };

  /**
   * Securely set innerHTML of an element
   * https://github.com/sweetalert2/sweetalert2/issues/1926
   *
   * @param {HTMLElement} elem
   * @param {string} html
   */
  const setInnerHtml = (elem, html) => {
    elem.textContent = '';
    if (html) {
      const parser = new DOMParser();
      const parsed = parser.parseFromString(html, `text/html`);
      const head = parsed.querySelector('head');
      if (head) {
        Array.from(head.childNodes).forEach(child => {
          elem.appendChild(child);
        });
      }
      const body = parsed.querySelector('body');
      if (body) {
        Array.from(body.childNodes).forEach(child => {
          if (child instanceof HTMLVideoElement || child instanceof HTMLAudioElement) {
            elem.appendChild(child.cloneNode(true)); // https://github.com/sweetalert2/sweetalert2/issues/2507
          } else {
            elem.appendChild(child);
          }
        });
      }
    }
  };

  /**
   * @param {HTMLElement} elem
   * @param {string} className
   * @returns {boolean}
   */
  const hasClass = (elem, className) => {
    if (!className) {
      return false;
    }
    return className.split(/\s+/).every(cls => elem.classList.contains(cls));
  };

  /**
   * @param {HTMLElement} elem
   * @param {SweetAlertOptions} params
   */
  const removeCustomClasses = (elem, params) => {
    Array.from(elem.classList).forEach(className => {
      if (!Object.values(swalClasses).includes(className) && !Object.values(iconTypes).includes(className) && !Object.values(params.showClass || {}).includes(className)) {
        elem.classList.remove(className);
      }
    });
  };

  /**
   * @param {HTMLElement} elem
   * @param {SweetAlertOptions} params
   * @param {string} className
   */
  const applyCustomClass = (elem, params, className) => {
    removeCustomClasses(elem, params);
    if (!params.customClass) {
      return;
    }
    const customClass = params.customClass[(/** @type {keyof SweetAlertCustomClass} */className)];
    if (!customClass) {
      return;
    }
    if (typeof customClass !== 'string' && !customClass.forEach) {
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
    if (!inputClass) {
      return null;
    }
    switch (inputClass) {
      case 'select':
      case 'textarea':
      case 'file':
        return popup.querySelector(`.${swalClasses.popup} > .${swalClasses[inputClass]}`);
      case 'checkbox':
        return popup.querySelector(`.${swalClasses.popup} > .${swalClasses.checkbox} input`);
      case 'radio':
        return popup.querySelector(`.${swalClasses.popup} > .${swalClasses.radio} input:checked`) || popup.querySelector(`.${swalClasses.popup} > .${swalClasses.radio} input:first-child`);
      case 'range':
        return popup.querySelector(`.${swalClasses.popup} > .${swalClasses.range} input`);
      default:
        return popup.querySelector(`.${swalClasses.popup} > .${swalClasses.input}`);
    }
  };

  /**
   * @param {HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement} input
   */
  const focusInput = input => {
    input.focus();

    // place cursor at end of text in text input
    if (input.type !== 'file') {
      // http://stackoverflow.com/a/2345915
      const val = input.value;
      input.value = '';
      input.value = val;
    }
  };

  /**
   * @param {HTMLElement | HTMLElement[] | null} target
   * @param {string | string[] | readonly string[] | undefined} classList
   * @param {boolean} condition
   */
  const toggleClass = (target, classList, condition) => {
    if (!target || !classList) {
      return;
    }
    const classes = typeof classList === 'string' ? classList.split(/\s+/).filter(Boolean) : classList;
    const targets = Array.isArray(target) ? target : [target];
    targets.forEach(elem => {
      classes.forEach(className => {
        if (condition) {
          elem.classList.add(className);
        } else {
          elem.classList.remove(className);
        }
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
  const getDirectChildByClass = (elem, className) => (/** @type {HTMLElement | undefined} */
  Array.from(elem.children).find(child => child instanceof HTMLElement && hasClass(child, className)));

  /**
   * @param {HTMLElement} elem
   * @param {string} property
   * @param {string | number | null | undefined} value
   */
  const applyNumericalStyle = (elem, property, value) => {
    if (value === `${parseInt(`${value}`)}`) {
      value = parseInt(value);
    }
    if (value || value === 0) {
      elem.style.setProperty(property, typeof value === 'number' ? `${value}px` : (/** @type {string} */value));
    } else {
      elem.style.removeProperty(property);
    }
  };

  /**
   * @param {HTMLElement | null} elem
   * @param {string} display
   */
  const show = (elem, display = 'flex') => {
    if (!elem) {
      return;
    }
    elem.style.display = display;
  };

  /**
   * @param {HTMLElement | null} elem
   */
  const hide = elem => {
    if (!elem) {
      return;
    }
    elem.style.display = 'none';
  };

  /**
   * @param {HTMLElement | null} elem
   * @param {string} display
   */
  const showWhenInnerHtmlPresent = (elem, display = 'block') => {
    if (!elem) {
      return;
    }
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
    if (el) {
      el.style.setProperty(property, value);
    }
  };

  /**
   * @param {HTMLElement} elem
   * @param {boolean | string | null | undefined} condition
   * @param {string} display
   */
  const toggle = (elem, condition, display = 'flex') => {
    if (condition) {
      show(elem, display);
    } else {
      hide(elem);
    }
  };

  /**
   * borrowed from jquery $(elem).is(':visible') implementation
   *
   * @param {HTMLElement | null} elem
   * @returns {boolean}
   */
  const isVisible$1 = elem => Boolean(elem && (elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length));

  /**
   * @returns {boolean}
   */
  const allButtonsAreHidden = () => !isVisible$1(getConfirmButton()) && !isVisible$1(getDenyButton()) && !isVisible$1(getCancelButton());

  /**
   * @param {HTMLElement} elem
   * @returns {boolean}
   */
  const isScrollable = elem => Boolean(elem.scrollHeight > elem.clientHeight);

  /**
   * @param {HTMLElement} element
   * @param {HTMLElement} stopElement
   * @returns {boolean}
   */
  const selfOrParentIsScrollable = (element, stopElement) => {
    let parent = /** @type {HTMLElement | null} */element;
    while (parent && parent !== stopElement) {
      if (isScrollable(parent)) {
        return true;
      }
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
  const hasCssAnimation = elem => {
    const style = window.getComputedStyle(elem);
    const animDuration = parseFloat(style.getPropertyValue('animation-duration') || '0');
    const transDuration = parseFloat(style.getPropertyValue('transition-duration') || '0');
    return animDuration > 0 || transDuration > 0;
  };

  /**
   * @param {number} timer
   * @param {boolean} reset
   */
  const animateTimerProgressBar = (timer, reset = false) => {
    const timerProgressBar = getTimerProgressBar();
    if (!timerProgressBar) {
      return;
    }
    if (isVisible$1(timerProgressBar)) {
      if (reset) {
        timerProgressBar.style.transition = 'none';
        timerProgressBar.style.width = '100%';
      }
      setTimeout(() => {
        timerProgressBar.style.transition = `width ${timer / 1000}s linear`;
        timerProgressBar.style.width = '0%';
      }, 10);
    }
  };
  const stopTimerProgressBar = () => {
    const timerProgressBar = getTimerProgressBar();
    if (!timerProgressBar) {
      return;
    }
    const timerProgressBarWidth = parseInt(window.getComputedStyle(timerProgressBar).width);
    timerProgressBar.style.removeProperty('transition');
    timerProgressBar.style.width = '100%';
    const timerProgressBarFullWidth = parseInt(window.getComputedStyle(timerProgressBar).width);
    const timerProgressBarPercent = timerProgressBarWidth / timerProgressBarFullWidth * 100;
    timerProgressBar.style.width = `${timerProgressBarPercent}%`;
  };

  /**
   * Detect Node env
   *
   * @returns {boolean}
   */
  const isNodeEnv = () => typeof window === 'undefined' || typeof document === 'undefined';

  const sweetHTML = `
 <div aria-labelledby="${swalClasses.title}" aria-describedby="${swalClasses['html-container']}" class="${swalClasses.popup}" tabindex="-1">
   <button type="button" class="${swalClasses.close}"></button>
   <ul class="${swalClasses['progress-steps']}"></ul>
   <div class="${swalClasses.icon}"></div>
   <img class="${swalClasses.image}" />
   <h2 class="${swalClasses.title}" id="${swalClasses.title}"></h2>
   <div class="${swalClasses['html-container']}" id="${swalClasses['html-container']}"></div>
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
   <div class="${swalClasses['validation-message']}" id="${swalClasses['validation-message']}"></div>
   <div class="${swalClasses.actions}">
     <div class="${swalClasses.loader}"></div>
     <button type="button" class="${swalClasses.confirm}"></button>
     <button type="button" class="${swalClasses.deny}"></button>
     <button type="button" class="${swalClasses.cancel}"></button>
   </div>
   <div class="${swalClasses.footer}"></div>
   <div class="${swalClasses['timer-progress-bar-container']}">
     <div class="${swalClasses['timer-progress-bar']}"></div>
   </div>
 </div>
`.replace(/(^|\n)\s*/g, '');

  /**
   * @returns {boolean}
   */
  const resetOldContainer = () => {
    const oldContainer = getContainer();
    if (!oldContainer) {
      return false;
    }
    oldContainer.remove();
    removeClass([document.documentElement, document.body], [swalClasses['no-backdrop'], swalClasses['toast-shown'],
    // @ts-ignore: 'has-column' is not defined in swalClasses but may be set dynamically
    swalClasses['has-column']]);
    return true;
  };
  const resetValidationMessage$1 = () => {
    if (globalState.currentInstance) {
      globalState.currentInstance.resetValidationMessage();
    }
  };
  const addInputChangeListeners = () => {
    const popup = getPopup();
    if (!popup) {
      return;
    }
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
    if (input) {
      input.oninput = resetValidationMessage$1;
    }
    if (file) {
      file.onchange = resetValidationMessage$1;
    }
    if (select) {
      select.onchange = resetValidationMessage$1;
    }
    if (checkbox) {
      checkbox.onchange = resetValidationMessage$1;
    }
    if (textarea) {
      textarea.oninput = resetValidationMessage$1;
    }
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
  const getTarget = target => {
    if (typeof target === 'string') {
      const element = document.querySelector(target);
      if (!element) {
        throw new Error(`Target element "${target}" not found`);
      }
      return /** @type {HTMLElement} */element;
    }
    return target;
  };

  /**
   * @param {SweetAlertOptions} params
   */
  const setupAccessibility = params => {
    const popup = getPopup();
    if (!popup) {
      return;
    }
    popup.setAttribute('role', params.toast ? 'alert' : 'dialog');
    popup.setAttribute('aria-live', params.toast ? 'polite' : 'assertive');
    if (!params.toast) {
      popup.setAttribute('aria-modal', 'true');
    }
  };

  /**
   * @param {HTMLElement} targetElement
   */
  const setupRTL = targetElement => {
    if (window.getComputedStyle(targetElement).direction === 'rtl') {
      addClass(getContainer(), swalClasses.rtl);
      globalState.isRTL = true;
    }
  };

  /**
   * Add modal + backdrop to DOM
   *
   * @param {SweetAlertOptions} params
   */
  const init = params => {
    // Clean up the old popup container if it exists
    const oldContainerExisted = resetOldContainer();
    if (isNodeEnv()) {
      error('SweetAlert2 requires document to initialize');
      return;
    }
    const container = document.createElement('div');
    container.className = swalClasses.container;
    if (oldContainerExisted) {
      addClass(container, swalClasses['no-transition']);
    }
    setInnerHtml(container, sweetHTML);
    container.dataset['swal2Theme'] = params.theme;
    const targetElement = getTarget(params.target || 'body');
    targetElement.appendChild(container);
    if (params.topLayer) {
      container.setAttribute('popover', '');
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
    // DOM element
    if (param instanceof HTMLElement) {
      target.appendChild(param);
    }

    // Object
    else if (typeof param === 'object') {
      handleObject(param, target);
    }

    // Plain string
    else if (param) {
      setInnerHtml(target, param);
    }
  };

  /**
   * @param {object} param
   * @param {HTMLElement} target
   */
  const handleObject = (param, target) => {
    // JQuery element(s)
    if ('jquery' in param) {
      handleJqueryElem(target, param);
    }

    // For other objects use their string representation
    else {
      setInnerHtml(target, param.toString());
    }
  };

  /**
   * @param {HTMLElement} target
   * @param {any} elem
   */
  const handleJqueryElem = (target, elem) => {
    target.textContent = '';
    if (0 in elem) {
      for (let i = 0; i in elem; i++) {
        target.appendChild(elem[i].cloneNode(true));
      }
    } else {
      target.appendChild(elem.cloneNode(true));
    }
  };

  /**
   * @param {SweetAlert} instance
   * @param {SweetAlertOptions} params
   */
  const renderActions = (instance, params) => {
    const actions = getActions();
    const loader = getLoader();
    if (!actions || !loader) {
      return;
    }

    // Actions (buttons) wrapper
    if (!params.showConfirmButton && !params.showDenyButton && !params.showCancelButton) {
      hide(actions);
    } else {
      show(actions);
    }

    // Custom class
    applyCustomClass(actions, params, 'actions');

    // Render all the buttons
    renderButtons(actions, loader, params);

    // Loader
    setInnerHtml(loader, params.loaderHtml || '');
    applyCustomClass(loader, params, 'loader');
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
    if (!confirmButton || !denyButton || !cancelButton) {
      return;
    }

    // Render buttons
    renderButton(confirmButton, 'confirm', params);
    renderButton(denyButton, 'deny', params);
    renderButton(cancelButton, 'cancel', params);
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
      removeClass([confirmButton, denyButton, cancelButton], swalClasses.styled);
      return;
    }
    addClass([confirmButton, denyButton, cancelButton], swalClasses.styled);

    // Apply custom background colors and outline colors to action buttons
    /** @type {[HTMLElement, string, string | undefined][]} */
    const buttons = [[confirmButton, 'confirm', params.confirmButtonColor], [denyButton, 'deny', params.denyButtonColor], [cancelButton, 'cancel', params.cancelButtonColor]];
    buttons.forEach(([button, type, color]) => {
      if (color) {
        button.style.setProperty(`--swal2-${type}-button-background-color`, color);
      }
      applyOutlineColor(button);
    });
  }

  /**
   * @param {HTMLElement} button
   */
  function applyOutlineColor(button) {
    const buttonStyle = window.getComputedStyle(button);
    if (buttonStyle.getPropertyValue('--swal2-action-button-focus-box-shadow')) {
      // If the button already has a custom outline color, no need to change it
      return;
    }
    const outlineColor = buttonStyle.backgroundColor.replace(/rgba?\((\d+), (\d+), (\d+).*/, 'rgba($1, $2, $3, 0.5)');
    button.style.setProperty('--swal2-action-button-focus-box-shadow', buttonStyle.getPropertyValue('--swal2-outline').replace(/ rgba\(.*/, ` ${outlineColor}`));
  }

  /**
   * @param {HTMLElement} button
   * @param {'confirm' | 'deny' | 'cancel'} buttonType
   * @param {SweetAlertOptions} params
   */
  function renderButton(button, buttonType, params) {
    const buttonName = /** @type {'Confirm' | 'Deny' | 'Cancel'} */capitalizeFirstLetter(buttonType);
    toggle(button, params[`show${buttonName}Button`], 'inline-block');
    setInnerHtml(button, params[`${buttonType}ButtonText`] || ''); // Set caption text
    button.setAttribute('aria-label', params[`${buttonType}ButtonAriaLabel`] || ''); // ARIA label

    // Add buttons custom classes
    button.className = swalClasses[buttonType];
    applyCustomClass(button, params, `${buttonType}Button`);
  }

  /**
   * @param {SweetAlert} instance
   * @param {SweetAlertOptions} params
   */
  const renderCloseButton = (instance, params) => {
    const closeButton = getCloseButton();
    if (!closeButton) {
      return;
    }
    setInnerHtml(closeButton, params.closeButtonHtml || '');

    // Custom class
    applyCustomClass(closeButton, params, 'closeButton');
    toggle(closeButton, params.showCloseButton);
    closeButton.setAttribute('aria-label', params.closeButtonAriaLabel || '');
  };

  /**
   * @param {SweetAlert} instance
   * @param {SweetAlertOptions} params
   */
  const renderContainer = (instance, params) => {
    const container = getContainer();
    if (!container) {
      return;
    }
    handleBackdropParam(container, params.backdrop);
    handlePositionParam(container, params.position);
    handleGrowParam(container, params.grow);

    // Custom class
    applyCustomClass(container, params, 'container');
  };

  /**
   * @param {HTMLElement} container
   * @param {SweetAlertOptions['backdrop']} backdrop
   */
  function handleBackdropParam(container, backdrop) {
    if (typeof backdrop === 'string') {
      container.style.background = backdrop;
    } else if (!backdrop) {
      addClass([document.documentElement, document.body], swalClasses['no-backdrop']);
    }
  }

  /**
   * @param {HTMLElement} container
   * @param {SweetAlertOptions['position']} position
   */
  function handlePositionParam(container, position) {
    if (!position) {
      return;
    }
    if (position in swalClasses) {
      addClass(container, swalClasses[position]);
    } else {
      warn('The "position" parameter is not valid, defaulting to "center"');
      addClass(container, swalClasses.center);
    }
  }

  /**
   * @param {HTMLElement} container
   * @param {SweetAlertOptions['grow']} grow
   */
  function handleGrowParam(container, grow) {
    if (!grow) {
      return;
    }
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
    innerParams: new WeakMap(),
    domCache: new WeakMap(),
    focusedElement: new WeakMap()
  };

  /// <reference path="../../../../sweetalert2.d.ts"/>


  /** @type {InputClass[]} */
  const inputClasses = ['input', 'file', 'range', 'select', 'radio', 'checkbox', 'textarea'];

  /**
   * @param {SweetAlert} instance
   * @param {SweetAlertOptions} params
   */
  const renderInput = (instance, params) => {
    const popup = getPopup();
    if (!popup) {
      return;
    }
    const innerParams = privateProps.innerParams.get(instance);
    const rerender = !innerParams || params.input !== innerParams.input;
    inputClasses.forEach(inputClass => {
      const inputContainer = getDirectChildByClass(popup, swalClasses[inputClass]);
      if (!inputContainer) {
        return;
      }

      // set attributes
      setAttributes(inputClass, params.inputAttributes);

      // set class
      inputContainer.className = swalClasses[inputClass];
      if (rerender) {
        hide(inputContainer);
      }
    });
    if (params.input) {
      if (rerender) {
        showInput(params);
      }
      // set custom class
      setCustomClass(params);
    }
  };

  /**
   * @param {SweetAlertOptions} params
   */
  const showInput = params => {
    if (!params.input) {
      return;
    }
    if (!renderInputType[params.input]) {
      error(`Unexpected type of input! Expected ${Object.keys(renderInputType).join(' | ')}, got "${params.input}"`);
      return;
    }
    const inputContainer = getInputContainer(params.input);
    if (!inputContainer) {
      return;
    }
    const input = renderInputType[params.input](inputContainer, params);
    show(inputContainer);

    // input autofocus
    if (params.inputAutoFocus) {
      setTimeout(() => {
        focusInput(input);
      });
    }
  };

  /**
   * @param {HTMLInputElement} input
   */
  const removeAttributes = input => {
    for (const {
      name
    } of Array.from(input.attributes)) {
      if (!['id', 'type', 'value', 'style'].includes(name)) {
        input.removeAttribute(name);
      }
    }
  };

  /**
   * @param {InputClass} inputClass
   * @param {SweetAlertOptions['inputAttributes']} inputAttributes
   */
  const setAttributes = (inputClass, inputAttributes) => {
    const popup = getPopup();
    if (!popup) {
      return;
    }
    const input = getInput$1(popup, inputClass);
    if (!input) {
      return;
    }
    removeAttributes(input);
    for (const attr in inputAttributes) {
      input.setAttribute(attr, inputAttributes[attr]);
    }
  };

  /**
   * @param {SweetAlertOptions} params
   */
  const setCustomClass = params => {
    if (!params.input) {
      return;
    }
    const inputContainer = getInputContainer(params.input);
    if (inputContainer) {
      applyCustomClass(inputContainer, params, 'input');
    }
  };

  /**
   * @param {HTMLInputElement | HTMLTextAreaElement} input
   * @param {SweetAlertOptions} params
   */
  const setInputPlaceholder = (input, params) => {
    if (!input.placeholder && params.inputPlaceholder) {
      input.placeholder = params.inputPlaceholder;
    }
  };

  /**
   * @param {Input} input
   * @param {Input} prependTo
   * @param {SweetAlertOptions} params
   */
  const setInputLabel = (input, prependTo, params) => {
    if (params.inputLabel) {
      const label = document.createElement('label');
      const labelClass = swalClasses['input-label'];
      label.setAttribute('for', input.id);
      label.className = labelClass;
      if (typeof params.customClass === 'object') {
        addClass(label, params.customClass.inputLabel);
      }
      label.innerText = params.inputLabel;
      prependTo.insertAdjacentElement('beforebegin', label);
    }
  };

  /**
   * @param {SweetAlertInput} inputType
   * @returns {HTMLElement | undefined}
   */
  const getInputContainer = inputType => {
    const popup = getPopup();
    if (!popup) {
      return;
    }
    return getDirectChildByClass(popup, swalClasses[(/** @type {SwalClass} */inputType)] || swalClasses.input);
  };

  /**
   * @param {HTMLInputElement | HTMLOutputElement | HTMLTextAreaElement} input
   * @param {SweetAlertOptions['inputValue']} inputValue
   */
  const checkAndSetInputValue = (input, inputValue) => {
    if (['string', 'number'].includes(typeof inputValue)) {
      input.value = `${inputValue}`;
    } else if (!isPromise(inputValue)) {
      warn(`Unexpected type of inputValue! Expected "string", "number" or "Promise", got "${typeof inputValue}"`);
    }
  };

  /** @type {Record<SweetAlertInput, (input: Input | HTMLElement, params: SweetAlertOptions) => Input>} */
  const renderInputType = {};

  /**
   * @param {Input | HTMLElement} input
   * @param {SweetAlertOptions} params
   * @returns {Input}
   */
  renderInputType.text = renderInputType.email = renderInputType.password = renderInputType.number = renderInputType.tel = renderInputType.url = renderInputType.search = renderInputType.date = renderInputType['datetime-local'] = renderInputType.time = renderInputType.week = renderInputType.month = /** @type {(input: Input | HTMLElement, params: SweetAlertOptions) => Input} */
  (input, params) => {
    // oxfmt-ignore
    const inputElement = /** @type {HTMLInputElement} */input;
    checkAndSetInputValue(inputElement, params.inputValue);
    setInputLabel(inputElement, inputElement, params);
    setInputPlaceholder(inputElement, params);
    // oxfmt-ignore
    inputElement.type = /** @type {string} */params.input;
    return inputElement;
  };

  /**
   * @param {Input | HTMLElement} input
   * @param {SweetAlertOptions} params
   * @returns {Input}
   */
  renderInputType.file = (input, params) => {
    const inputElement = /** @type {HTMLInputElement} */input;
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
    const rangeContainer = /** @type {HTMLElement} */range;
    const rangeInput = rangeContainer.querySelector('input');
    const rangeOutput = rangeContainer.querySelector('output');
    if (rangeInput) {
      checkAndSetInputValue(rangeInput, params.inputValue);
      rangeInput.type = /** @type {string} */params.input;
      setInputLabel(rangeInput, /** @type {Input} */range, params);
    }
    if (rangeOutput) {
      checkAndSetInputValue(rangeOutput, params.inputValue);
    }
    return /** @type {Input} */range;
  };

  /**
   * @param {Input | HTMLElement} select
   * @param {SweetAlertOptions} params
   * @returns {Input}
   */
  renderInputType.select = (select, params) => {
    const selectElement = /** @type {HTMLSelectElement} */select;
    selectElement.textContent = '';
    if (params.inputPlaceholder) {
      const placeholder = document.createElement('option');
      setInnerHtml(placeholder, params.inputPlaceholder);
      placeholder.value = '';
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
  renderInputType.radio = radio => {
    const radioElement = /** @type {HTMLElement} */radio;
    radioElement.textContent = '';
    return /** @type {Input} */radio;
  };

  /**
   * @param {Input | HTMLElement} checkboxContainer
   * @param {SweetAlertOptions} params
   * @returns {Input}
   */
  renderInputType.checkbox = (checkboxContainer, params) => {
    const popup = getPopup();
    if (!popup) {
      throw new Error('Popup not found');
    }
    const checkbox = getInput$1(popup, 'checkbox');
    if (!checkbox) {
      throw new Error('Checkbox input not found');
    }
    checkbox.value = '1';
    checkbox.checked = Boolean(params.inputValue);
    const containerElement = /** @type {HTMLElement} */checkboxContainer;
    const label = containerElement.querySelector('span');
    if (label) {
      const placeholderOrLabel = params.inputPlaceholder || params.inputLabel;
      if (placeholderOrLabel) {
        setInnerHtml(label, placeholderOrLabel);
      }
    }
    return checkbox;
  };

  /**
   * @param {Input | HTMLElement} textarea
   * @param {SweetAlertOptions} params
   * @returns {Input}
   */
  renderInputType.textarea = (textarea, params) => {
    const textareaElement = /** @type {HTMLTextAreaElement} */textarea;
    checkAndSetInputValue(textareaElement, params.inputValue);
    setInputPlaceholder(textareaElement, params);
    setInputLabel(textareaElement, textareaElement, params);

    /**
     * @param {HTMLElement} el
     * @returns {number}
     */
    const getMargin = el => parseInt(window.getComputedStyle(el).marginLeft) + parseInt(window.getComputedStyle(el).marginRight);

    // https://github.com/sweetalert2/sweetalert2/issues/2291
    setTimeout(() => {
      // https://github.com/sweetalert2/sweetalert2/issues/1699
      if ('MutationObserver' in window) {
        const popup = getPopup();
        if (!popup) {
          return;
        }
        const initialPopupWidth = parseInt(window.getComputedStyle(popup).width);
        const textareaResizeHandler = () => {
          // check if texarea is still in document (i.e. popup wasn't closed in the meantime)
          if (!document.body.contains(textareaElement)) {
            return;
          }
          const textareaWidth = textareaElement.offsetWidth + getMargin(textareaElement);
          const popupElement = getPopup();
          if (popupElement) {
            if (textareaWidth > initialPopupWidth) {
              popupElement.style.width = `${textareaWidth}px`;
            } else {
              applyNumericalStyle(popupElement, 'width', params.width);
            }
          }
        };
        new MutationObserver(textareaResizeHandler).observe(textareaElement, {
          attributes: true,
          attributeFilter: ['style']
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
    if (!htmlContainer) {
      return;
    }
    showWhenInnerHtmlPresent(htmlContainer);
    applyCustomClass(htmlContainer, params, 'htmlContainer');

    // Content as HTML
    if (params.html) {
      parseHtmlToContainer(params.html, htmlContainer);
      show(htmlContainer, 'block');
    }

    // Content as plain text
    else if (params.text) {
      htmlContainer.textContent = params.text;
      show(htmlContainer, 'block');
    }

    // No content
    else {
      hide(htmlContainer);
    }
    renderInput(instance, params);
  };

  /**
   * @param {SweetAlert} instance
   * @param {SweetAlertOptions} params
   */
  const renderFooter = (instance, params) => {
    const footer = getFooter();
    if (!footer) {
      return;
    }
    showWhenInnerHtmlPresent(footer);
    toggle(footer, Boolean(params.footer), 'block');
    if (params.footer) {
      parseHtmlToContainer(params.footer, footer);
    }

    // Custom class
    applyCustomClass(footer, params, 'footer');
  };

  /**
   * @param {SweetAlert} instance
   * @param {SweetAlertOptions} params
   */
  const renderIcon = (instance, params) => {
    const innerParams = privateProps.innerParams.get(instance);
    const icon = getIcon();
    if (!icon) {
      return;
    }

    // if the given icon already rendered, apply the styling without re-rendering the icon
    if (innerParams && params.icon === innerParams.icon) {
      // Custom or default content
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

    // Custom or default content
    setContent(icon, params);
    applyStyles(icon, params);

    // Animate icon
    addClass(icon, params.showClass && params.showClass.icon);

    // Re-adjust the success icon on system theme change
    const colorSchemeQueryList = window.matchMedia('(prefers-color-scheme: dark)');
    colorSchemeQueryList.addEventListener('change', adjustSuccessIconBackgroundColor);
  };

  /**
   * @param {HTMLElement} icon
   * @param {SweetAlertOptions} params
   */
  const applyStyles = (icon, params) => {
    for (const [iconType, iconClassName] of Object.entries(iconTypes)) {
      if (params.icon !== iconType) {
        removeClass(icon, iconClassName);
      }
    }
    addClass(icon, params.icon && iconTypes[params.icon]);

    // Icon color
    setColor(icon, params);

    // Success icon background color
    adjustSuccessIconBackgroundColor();

    // Custom class
    applyCustomClass(icon, params, 'icon');
  };

  // Adjust success icon background color to match the popup background color
  const adjustSuccessIconBackgroundColor = () => {
    const popup = getPopup();
    if (!popup) {
      return;
    }
    const popupBackgroundColor = window.getComputedStyle(popup).getPropertyValue('background-color');
    /** @type {NodeListOf<HTMLElement>} */
    const successIconParts = popup.querySelectorAll('[class^=swal2-success-circular-line], .swal2-success-fix');
    successIconParts.forEach(part => {
      part.style.backgroundColor = popupBackgroundColor;
    });
  };

  /**
   *
   * @param {SweetAlertOptions} params
   * @returns {string}
   */
  const successIconHtml = params => `
  ${params.animation ? '<div class="swal2-success-circular-line-left"></div>' : ''}
  <span class="swal2-success-line-tip"></span> <span class="swal2-success-line-long"></span>
  <div class="swal2-success-ring"></div>
  ${params.animation ? '<div class="swal2-success-fix"></div>' : ''}
  ${params.animation ? '<div class="swal2-success-circular-line-right"></div>' : ''}
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
    if (!params.icon && !params.iconHtml) {
      return;
    }
    let oldContent = icon.innerHTML;
    let newContent = '';
    if (params.iconHtml) {
      newContent = iconContent(params.iconHtml);
    } else if (params.icon === 'success') {
      newContent = successIconHtml(params);
      oldContent = oldContent.replace(/ style=".*?"/g, ''); // undo adjustSuccessIconBackgroundColor()
    } else if (params.icon === 'error') {
      newContent = errorIconHtml;
    } else if (params.icon) {
      const defaultIconHtml = {
        question: '?',
        warning: '!',
        info: 'i'
      };
      newContent = iconContent(defaultIconHtml[params.icon]);
    }
    if (oldContent.trim() !== newContent.trim()) {
      setInnerHtml(icon, newContent);
    }
  };

  /**
   * @param {HTMLElement} icon
   * @param {SweetAlertOptions} params
   */
  const setColor = (icon, params) => {
    if (!params.iconColor) {
      return;
    }
    icon.style.color = params.iconColor;
    icon.style.borderColor = params.iconColor;
    for (const sel of ['.swal2-success-line-tip', '.swal2-success-line-long', '.swal2-x-mark-line-left', '.swal2-x-mark-line-right']) {
      setStyle(icon, sel, 'background-color', params.iconColor);
    }
    setStyle(icon, '.swal2-success-ring', 'border-color', params.iconColor);
  };

  /**
   * @param {string} content
   * @returns {string}
   */
  const iconContent = content => `<div class="${swalClasses['icon-content']}">${content}</div>`;

  /**
   * @param {SweetAlert} instance
   * @param {SweetAlertOptions} params
   */
  const renderImage = (instance, params) => {
    const image = getImage();
    if (!image) {
      return;
    }
    if (!params.imageUrl) {
      hide(image);
      return;
    }
    show(image, '');

    // Src, alt
    image.setAttribute('src', params.imageUrl);
    image.setAttribute('alt', params.imageAlt || '');

    // Width, height
    applyNumericalStyle(image, 'width', params.imageWidth);
    applyNumericalStyle(image, 'height', params.imageHeight);

    // Class
    image.className = swalClasses.image;
    applyCustomClass(image, params, 'image');
  };

  let dragging = false;
  let mousedownX = 0;
  let mousedownY = 0;
  let initialX = 0;
  let initialY = 0;

  /**
   * @param {HTMLElement} popup
   */
  const addDraggableListeners = popup => {
    popup.addEventListener('mousedown', down);
    document.body.addEventListener('mousemove', move);
    popup.addEventListener('mouseup', up);
    popup.addEventListener('touchstart', down);
    document.body.addEventListener('touchmove', move);
    popup.addEventListener('touchend', up);
  };

  /**
   * @param {HTMLElement} popup
   */
  const removeDraggableListeners = popup => {
    popup.removeEventListener('mousedown', down);
    document.body.removeEventListener('mousemove', move);
    popup.removeEventListener('mouseup', up);
    popup.removeEventListener('touchstart', down);
    document.body.removeEventListener('touchmove', move);
    popup.removeEventListener('touchend', up);
  };

  /**
   * @param {MouseEvent | TouchEvent} event
   */
  const down = event => {
    const popup = getPopup();
    if (!popup) {
      return;
    }
    const icon = getIcon();
    if (event.target === popup || icon && icon.contains(/** @type {HTMLElement} */event.target)) {
      dragging = true;
      const clientXY = getClientXY(event);
      mousedownX = clientXY.clientX;
      mousedownY = clientXY.clientY;
      initialX = parseInt(popup.style.insetInlineStart) || 0;
      initialY = parseInt(popup.style.insetBlockStart) || 0;
      addClass(popup, 'swal2-dragging');
    }
  };

  /**
   * @param {MouseEvent | TouchEvent} event
   */
  const move = event => {
    const popup = getPopup();
    if (!popup) {
      return;
    }
    if (dragging) {
      let {
        clientX,
        clientY
      } = getClientXY(event);
      const deltaX = clientX - mousedownX;
      // In RTL mode, negate the horizontal delta since insetInlineStart refers to the right edge
      popup.style.insetInlineStart = `${initialX + (globalState.isRTL ? -deltaX : deltaX)}px`;
      popup.style.insetBlockStart = `${initialY + (clientY - mousedownY)}px`;
    }
  };
  const up = () => {
    const popup = getPopup();
    dragging = false;
    removeClass(popup, 'swal2-dragging');
  };

  /**
   * @param {MouseEvent | TouchEvent} event
   * @returns {{ clientX: number, clientY: number }}
   */
  const getClientXY = event => {
    const source = event.type.startsWith('touch') ? /** @type {TouchEvent} */event.touches[0] : (/** @type {MouseEvent} */event);
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
    if (!container || !popup) {
      return;
    }

    // Width
    // https://github.com/sweetalert2/sweetalert2/issues/2170
    if (params.toast) {
      applyNumericalStyle(container, 'width', params.width);
      popup.style.width = '100%';
      const loader = getLoader();
      if (loader) {
        popup.insertBefore(loader, getIcon());
      }
    } else {
      applyNumericalStyle(popup, 'width', params.width);
    }

    // Padding
    applyNumericalStyle(popup, 'padding', params.padding);

    // Color
    if (params.color) {
      popup.style.color = params.color;
    }

    // Background
    if (params.background) {
      popup.style.background = params.background;
    }
    hide(getValidationMessage());

    // Classes
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
    // Default Class + showClass when updating Swal.update({})
    popup.className = `${swalClasses.popup} ${isVisible$1(popup) ? showClass.popup : ''}`;
    if (params.toast) {
      addClass([document.documentElement, document.body], swalClasses['toast-shown']);
      addClass(popup, swalClasses.toast);
    } else {
      addClass(popup, swalClasses.modal);
    }

    // Custom class
    applyCustomClass(popup, params, 'popup');
    // TODO: remove in the next major
    if (typeof params.customClass === 'string') {
      addClass(popup, params.customClass);
    }

    // Icon class (#1842)
    if (params.icon) {
      addClass(popup, swalClasses[`icon-${params.icon}`]);
    }
  };

  /**
   * @param {SweetAlert} instance
   * @param {SweetAlertOptions} params
   */
  const renderProgressSteps = (instance, params) => {
    const progressStepsContainer = getProgressSteps();
    if (!progressStepsContainer) {
      return;
    }
    const {
      progressSteps,
      currentProgressStep
    } = params;
    if (!progressSteps || progressSteps.length === 0 || currentProgressStep === undefined) {
      hide(progressStepsContainer);
      return;
    }
    show(progressStepsContainer);
    progressStepsContainer.textContent = '';
    if (currentProgressStep >= progressSteps.length) {
      warn('Invalid currentProgressStep parameter, it should be less than progressSteps.length ' + '(currentProgressStep like JS arrays starts from 0)');
    }
    progressSteps.forEach((step, index) => {
      const stepEl = createStepElement(step);
      progressStepsContainer.appendChild(stepEl);
      if (index === currentProgressStep) {
        addClass(stepEl, swalClasses['active-progress-step']);
      }
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
  const createStepElement = step => {
    const stepEl = document.createElement('li');
    addClass(stepEl, swalClasses['progress-step']);
    setInnerHtml(stepEl, step);
    return stepEl;
  };

  /**
   * @param {SweetAlertOptions} params
   * @returns {HTMLLIElement}
   */
  const createLineElement = params => {
    const lineEl = document.createElement('li');
    addClass(lineEl, swalClasses['progress-step-line']);
    if (params.progressStepsDistance) {
      applyNumericalStyle(lineEl, 'width', params.progressStepsDistance);
    }
    return lineEl;
  };

  /**
   * @param {SweetAlert} instance
   * @param {SweetAlertOptions} params
   */
  const renderTitle = (instance, params) => {
    const title = getTitle();
    if (!title) {
      return;
    }
    showWhenInnerHtmlPresent(title);
    toggle(title, Boolean(params.title || params.titleText), 'block');
    if (params.title) {
      parseHtmlToContainer(params.title, title);
    }
    if (params.titleText) {
      title.innerText = params.titleText;
    }

    // Custom class
    applyCustomClass(title, params, 'title');
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
    if (typeof params.didRender === 'function' && popup) {
      params.didRender(popup);
    }
    (_globalState$eventEmi = globalState.eventEmitter) === null || _globalState$eventEmi === void 0 || _globalState$eventEmi.emit('didRender', popup);
  };

  /*
   * Global function to determine if SweetAlert2 popup is shown
   */
  const isVisible = () => {
    return isVisible$1(getPopup());
  };

  /*
   * Global function to click 'Confirm' button
   */
  const clickConfirm = () => {
    var _dom$getConfirmButton;
    return (_dom$getConfirmButton = getConfirmButton()) === null || _dom$getConfirmButton === void 0 ? void 0 : _dom$getConfirmButton.click();
  };

  /*
   * Global function to click 'Deny' button
   */
  const clickDeny = () => {
    var _dom$getDenyButton;
    return (_dom$getDenyButton = getDenyButton()) === null || _dom$getDenyButton === void 0 ? void 0 : _dom$getDenyButton.click();
  };

  /*
   * Global function to click 'Cancel' button
   */
  const clickCancel = () => {
    var _dom$getCancelButton;
    return (_dom$getCancelButton = getCancelButton()) === null || _dom$getCancelButton === void 0 ? void 0 : _dom$getCancelButton.click();
  };

  /** @type {Record<DismissReason, DismissReason>} */
  const DismissReason = Object.freeze({
    cancel: 'cancel',
    backdrop: 'backdrop',
    close: 'close',
    esc: 'esc',
    timer: 'timer'
  });

  /**
   * @param {GlobalState} globalState
   */
  const removeKeydownHandler = globalState => {
    if (globalState.keydownTarget && globalState.keydownHandlerAdded && globalState.keydownHandler) {
      const handler = /** @type {EventListenerOrEventListenerObject} */
      /** @type {unknown} */globalState.keydownHandler;
      globalState.keydownTarget.removeEventListener('keydown', handler, {
        capture: globalState.keydownListenerCapture
      });
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
      const handler = e => keydownHandler(innerParams, e, dismissWith);
      globalState.keydownHandler = handler;
      const target = innerParams.keydownListenerCapture ? window : getPopup();
      if (target) {
        globalState.keydownTarget = target;
        globalState.keydownListenerCapture = innerParams.keydownListenerCapture;
        const eventHandler = /** @type {EventListenerOrEventListenerObject} */ /** @type {unknown} */handler;
        globalState.keydownTarget.addEventListener('keydown', eventHandler, {
          capture: globalState.keydownListenerCapture
        });
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
    // search for visible elements and select the next possible match
    if (focusableElements.length) {
      index = index + increment;

      // shift + tab when .swal2-popup is focused
      if (index === -2) {
        index = focusableElements.length - 1;
      }

      // rollover to first item
      if (index === focusableElements.length) {
        index = 0;

        // go to last item
      } else if (index === -1) {
        index = focusableElements.length - 1;
      }
      focusableElements[index].focus();

      // don't prevent default for iframes (Firefox fix)
      // https://github.com/sweetalert2/sweetalert2/issues/2931
      if (isFirefox() && focusableElements[index] instanceof HTMLIFrameElement) {
        return false;
      }
      return true;
    }
    // no visible focusable elements, focus the popup
    (_dom$getPopup = getPopup()) === null || _dom$getPopup === void 0 || _dom$getPopup.focus();
    return true;
  };
  const arrowKeysNextButton = ['ArrowRight', 'ArrowDown'];
  const arrowKeysPreviousButton = ['ArrowLeft', 'ArrowUp'];

  /**
   * @param {SweetAlertOptions} innerParams
   * @param {KeyboardEvent} event
   * @param {(dismiss: DismissReason) => void} dismissWith
   */
  const keydownHandler = (innerParams, event, dismissWith) => {
    if (!innerParams) {
      return; // This instance has already been destroyed
    }

    // Ignore keydown during IME composition
    // https://developer.mozilla.org/en-US/docs/Web/API/Document/keydown_event#ignoring_keydown_during_ime_composition
    // https://github.com/sweetalert2/sweetalert2/issues/720
    // https://github.com/sweetalert2/sweetalert2/issues/2406
    if (event.isComposing || event.keyCode === 229) {
      return;
    }
    if (innerParams.stopKeydownPropagation) {
      event.stopPropagation();
    }

    // ENTER
    if (event.key === 'Enter') {
      handleEnter(event, innerParams);
    }

    // TAB
    else if (event.key === 'Tab') {
      handleTab(event);
    }

    // ARROWS - switch focus between buttons
    else if ([...arrowKeysNextButton, ...arrowKeysPreviousButton].includes(event.key)) {
      handleArrows(event.key);
    }

    // ESC
    else if (event.key === 'Escape') {
      handleEsc(event, innerParams, dismissWith);
    }
  };

  /**
   * @param {KeyboardEvent} event
   * @param {SweetAlertOptions} innerParams
   */
  const handleEnter = (event, innerParams) => {
    // https://github.com/sweetalert2/sweetalert2/issues/2386
    if (!callIfFunction(innerParams.allowEnterKey)) {
      return;
    }
    const popup = getPopup();
    if (!popup || !innerParams.input) {
      return;
    }
    const input = getInput$1(popup, innerParams.input);
    if (event.target && input && event.target instanceof HTMLElement && event.target.outerHTML === input.outerHTML) {
      if (['textarea', 'file'].includes(innerParams.input)) {
        return; // do not submit
      }
      clickConfirm();
      event.preventDefault();
    }
  };

  /**
   * @param {KeyboardEvent} event
   */
  const handleTab = event => {
    const targetElement = event.target;
    const focusableElements = getFocusableElements();
    const btnIndex = focusableElements.findIndex(el => el === targetElement);

    // don't prevent default for iframes (Firefox fix)
    // https://github.com/sweetalert2/sweetalert2/issues/2931
    let shouldPreventDefault = true;

    // Cycle to the next button
    if (!event.shiftKey) {
      shouldPreventDefault = setFocus(btnIndex, 1);
    }

    // Cycle to the prev button
    else {
      shouldPreventDefault = setFocus(btnIndex, -1);
    }
    event.stopPropagation();
    if (shouldPreventDefault) {
      event.preventDefault();
    }
  };

  /**
   * @param {string} key
   */
  const handleArrows = key => {
    const actions = getActions();
    const confirmButton = getConfirmButton();
    const denyButton = getDenyButton();
    const cancelButton = getCancelButton();
    if (!actions || !confirmButton || !denyButton || !cancelButton) {
      return;
    }
    /** @type HTMLElement[] */
    const buttons = [confirmButton, denyButton, cancelButton];
    if (document.activeElement instanceof HTMLElement && !buttons.includes(document.activeElement)) {
      return;
    }
    const sibling = arrowKeysNextButton.includes(key) ? 'nextElementSibling' : 'previousElementSibling';
    let buttonToFocus = document.activeElement;
    if (!buttonToFocus) {
      return;
    }
    for (let i = 0; i < actions.children.length; i++) {
      buttonToFocus = buttonToFocus[sibling];
      if (!buttonToFocus) {
        return;
      }
      if (buttonToFocus instanceof HTMLButtonElement && isVisible$1(buttonToFocus)) {
        break;
      }
    }
    if (buttonToFocus instanceof HTMLButtonElement) {
      buttonToFocus.focus();
    }
  };

  /**
   * @param {KeyboardEvent} event
   * @param {SweetAlertOptions} innerParams
   * @param {(dismiss: DismissReason) => void} dismissWith
   */
  const handleEsc = (event, innerParams, dismissWith) => {
    event.preventDefault();
    if (callIfFunction(innerParams.allowEscapeKey)) {
      dismissWith(DismissReason.esc);
    }
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
    swalPromiseResolve: new WeakMap(),
    swalPromiseReject: new WeakMap()
  };

  // From https://developer.paciellogroup.com/blog/2018/06/the-current-state-of-modal-dialog-accessibility/
  // Adding aria-hidden="true" to elements outside of the active modal dialog ensures that
  // elements not within the active modal dialog will not be surfaced if a user opens a screen
  // reader’s list of elements (headings, form controls, landmarks, etc.) in the document.

  const setAriaHidden = () => {
    const container = getContainer();
    const bodyChildren = Array.from(document.body.children);
    bodyChildren.forEach(el => {
      if (el.contains(container)) {
        return;
      }
      if (el.hasAttribute('aria-hidden')) {
        el.setAttribute('data-previous-aria-hidden', el.getAttribute('aria-hidden') || '');
      }
      el.setAttribute('aria-hidden', 'true');
    });
  };
  const unsetAriaHidden = () => {
    const bodyChildren = Array.from(document.body.children);
    bodyChildren.forEach(el => {
      if (el.hasAttribute('data-previous-aria-hidden')) {
        el.setAttribute('aria-hidden', el.getAttribute('data-previous-aria-hidden') || '');
        el.removeAttribute('data-previous-aria-hidden');
      } else {
        el.removeAttribute('aria-hidden');
      }
    });
  };

  // @ts-ignore
  const isSafariOrIOS = typeof window !== 'undefined' && Boolean(window.GestureEvent); // true for Safari desktop + all iOS browsers https://stackoverflow.com/a/70585394

  // @ts-ignore
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
    if (!container) {
      return;
    }
    /** @type {boolean} */
    let preventTouchMove;
    /**
     * @param {TouchEvent} event
     */
    container.ontouchstart = event => {
      preventTouchMove = shouldPreventTouchMove(event);
    };
    /**
     * @param {TouchEvent} event
     */
    container.ontouchmove = event => {
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
  const shouldPreventTouchMove = event => {
    const target = event.target;
    const container = getContainer();
    const htmlContainer = getHtmlContainer();
    if (!container || !htmlContainer) {
      return false;
    }
    if (isStylus(event) || isZoom(event)) {
      return false;
    }
    if (target === container) {
      return true;
    }
    if (!isScrollable(container) && target instanceof HTMLElement && !selfOrParentIsScrollable(target, htmlContainer) &&
    // #2823
    target.tagName !== 'INPUT' &&
    // #1603
    target.tagName !== 'TEXTAREA' &&
    // #2266
    !(isScrollable(htmlContainer) &&
    // #1944
    htmlContainer.contains(target))) {
      return true;
    }
    return false;
  };

  /**
   * https://github.com/sweetalert2/sweetalert2/issues/1786
   *
   * @param {TouchEvent} event
   * @returns {boolean}
   */
  const isStylus = event => {
    return Boolean(event.touches && event.touches.length &&
    // @ts-ignore - touchType is not a standard property
    event.touches[0].touchType === 'stylus');
  };

  /**
   * https://github.com/sweetalert2/sweetalert2/issues/1891
   *
   * @param {TouchEvent} event
   * @returns {boolean}
   */
  const isZoom = event => {
    return event.touches && event.touches.length > 1;
  };
  const undoIOSfix = () => {
    if (hasClass(document.body, swalClasses.iosfix)) {
      const offset = parseInt(document.body.style.top, 10);
      removeClass(document.body, swalClasses.iosfix);
      document.body.style.top = '';
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
    const scrollDiv = document.createElement('div');
    scrollDiv.className = swalClasses['scrollbar-measure'];
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
  const replaceScrollbarWithPadding = initialBodyOverflow => {
    // for queues, do not do this more than once
    if (previousBodyPadding !== null) {
      return;
    }
    // if the body has overflow
    if (document.body.scrollHeight > window.innerHeight || initialBodyOverflow === 'scroll' // https://github.com/sweetalert2/sweetalert2/issues/2663
    ) {
      // add padding so the content doesn't shift after removal of scrollbar
      previousBodyPadding = parseInt(window.getComputedStyle(document.body).getPropertyValue('padding-right'));
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
    if (isToast()) {
      triggerDidCloseAndDispose(instance, didClose);
    } else {
      restoreActiveElement(returnFocus).then(() => triggerDidCloseAndDispose(instance, didClose));
      removeKeydownHandler(globalState);
    }

    // workaround for https://github.com/sweetalert2/sweetalert2/issues/2088
    // for some reason removing the container in Safari will scroll the document to bottom
    if (isSafariOrIOS) {
      container.setAttribute('style', 'display:none !important');
      container.removeAttribute('class');
      container.innerHTML = '';
    } else {
      container.remove();
    }
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
    removeClass([document.documentElement, document.body], [swalClasses.shown, swalClasses['height-auto'], swalClasses['no-backdrop'], swalClasses['toast-shown']]);
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
      // A swal awaiting for a promise (after a click on Confirm or Deny) cannot be dismissed anymore #2335
      if (!resolveValue.isDismissed) {
        handleAwaitingPromise(this);
        swalPromiseResolve(resolveValue);
      }
    } else if (didClose) {
      // Resolve Swal promise
      swalPromiseResolve(resolveValue);
    }
  }

  /**
   * @param {SweetAlert} instance
   * @returns {boolean}
   */
  const triggerClosePopup = instance => {
    const popup = getPopup();
    if (!popup) {
      return false;
    }
    const innerParams = privateProps.innerParams.get(instance);
    if (!innerParams || hasClass(popup, innerParams.hideClass.popup)) {
      return false;
    }
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
    if (rejectPromise) {
      // Reject Swal promise
      rejectPromise(error);
    }
  }

  /**
   * @param {SweetAlert} instance
   */
  const handleAwaitingPromise = instance => {
    if (instance.isAwaitingPromise) {
      // @ts-ignore
      delete instance.isAwaitingPromise;
      // The instance might have been previously partly destroyed, we must resume the destroy process in this case #2335
      if (!privateProps.innerParams.get(instance)) {
        instance._destroy();
      }
    }
  };

  /**
   * @param {SweetAlertResult | undefined} resolveValue
   * @returns {SweetAlertResult}
   */
  const prepareResolveValue = resolveValue => {
    // When user calls Swal.close()
    if (typeof resolveValue === 'undefined') {
      return {
        isConfirmed: false,
        isDenied: false,
        isDismissed: true
      };
    }
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
    // If animation is supported, animate
    const animationIsSupported = hasCssAnimation(popup);
    if (typeof innerParams.willClose === 'function') {
      innerParams.willClose(popup);
    }
    (_globalState$eventEmi = globalState.eventEmitter) === null || _globalState$eventEmi === void 0 || _globalState$eventEmi.emit('willClose', popup);
    if (animationIsSupported && container) {
      animatePopup(instance, popup, container, Boolean(innerParams.returnFocus), innerParams.didClose);
    } else if (container) {
      // Otherwise, remove immediately
      removePopupAndResetState(instance, container, Boolean(innerParams.returnFocus), innerParams.didClose);
    }
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
    const swalCloseAnimationFinished = function (e) {
      if (e.target === popup) {
        var _globalState$swalClos;
        (_globalState$swalClos = globalState.swalCloseEventFinishedCallback) === null || _globalState$swalClos === void 0 || _globalState$swalClos.call(globalState);
        delete globalState.swalCloseEventFinishedCallback;
        popup.removeEventListener('animationend', swalCloseAnimationFinished);
        popup.removeEventListener('transitionend', swalCloseAnimationFinished);
      }
    };
    popup.addEventListener('animationend', swalCloseAnimationFinished);
    popup.addEventListener('transitionend', swalCloseAnimationFinished);
  };

  /**
   * @param {SweetAlert} instance
   * @param {(() => void) | undefined} didClose
   */
  const triggerDidCloseAndDispose = (instance, didClose) => {
    setTimeout(() => {
      var _globalState$eventEmi2;
      if (typeof didClose === 'function') {
        didClose.bind(instance.params)();
      }
      (_globalState$eventEmi2 = globalState.eventEmitter) === null || _globalState$eventEmi2 === void 0 || _globalState$eventEmi2.emit('didClose');
      // instance might have been destroyed already
      if (instance._destroy) {
        instance._destroy();
      }
    });
  };

  /**
   * Shows loader (spinner), this is useful with AJAX requests.
   * By default the loader be shown instead of the "Confirm" button.
   *
   * @param {HTMLButtonElement | null} [buttonToReplace]
   */
  const showLoading = buttonToReplace => {
    let popup = getPopup();
    if (!popup) {
      new Swal();
    }
    popup = getPopup();
    if (!popup) {
      return;
    }
    const loader = getLoader();
    if (isToast()) {
      hide(getIcon());
    } else {
      replaceButton(popup, buttonToReplace);
    }
    show(loader);
    popup.setAttribute('data-loading', 'true');
    popup.setAttribute('aria-busy', 'true');
    popup.focus();
  };

  /**
   * @param {HTMLElement} popup
   * @param {HTMLButtonElement | null} [buttonToReplace]
   */
  const replaceButton = (popup, buttonToReplace) => {
    const actions = getActions();
    const loader = getLoader();
    if (!actions || !loader) {
      return;
    }
    if (!buttonToReplace && isVisible$1(getConfirmButton())) {
      buttonToReplace = getConfirmButton();
    }
    show(actions);
    if (buttonToReplace) {
      hide(buttonToReplace);
      loader.setAttribute('data-button-to-replace', buttonToReplace.className);
      actions.insertBefore(loader, buttonToReplace);
    }
    addClass([popup, actions], swalClasses.loading);
  };

  /**
   * @param {SweetAlert} instance
   * @param {SweetAlertOptions} params
   */
  const handleInputOptionsAndValue = (instance, params) => {
    if (params.input === 'select' || params.input === 'radio') {
      handleInputOptions(instance, params);
    } else if (['text', 'email', 'number', 'tel', 'textarea'].some(i => i === params.input) && (hasToPromiseFn(params.inputValue) || isPromise(params.inputValue))) {
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
    if (!input) {
      return null;
    }
    switch (innerParams.input) {
      case 'checkbox':
        return getCheckboxValue(input);
      case 'radio':
        return getRadioValue(input);
      case 'file':
        return getFileValue(input);
      default:
        return innerParams.inputAutoTrim ? input.value.trim() : input.value;
    }
  };

  /**
   * @param {HTMLInputElement} input
   * @returns {number}
   */
  const getCheckboxValue = input => input.checked ? 1 : 0;

  /**
   * @param {HTMLInputElement} input
   * @returns {string | null}
   */
  const getRadioValue = input => input.checked ? input.value : null;

  /**
   * @param {HTMLInputElement} input
   * @returns {FileList | File | null}
   */
  const getFileValue = input => input.files && input.files.length ? input.getAttribute('multiple') !== null ? input.files : input.files[0] : null;

  /**
   * @param {SweetAlert} instance
   * @param {SweetAlertOptions} params
   */
  const handleInputOptions = (instance, params) => {
    const popup = getPopup();
    if (!popup) {
      return;
    }
    /**
     * @param {*} inputOptions
     */
    const processInputOptions = inputOptions => {
      if (params.input === 'select') {
        populateSelectOptions(popup, formatInputOptions(inputOptions), params);
      } else if (params.input === 'radio') {
        populateRadioOptions(popup, formatInputOptions(inputOptions), params);
      }
    };
    if (hasToPromiseFn(params.inputOptions) || isPromise(params.inputOptions)) {
      showLoading(getConfirmButton());
      asPromise(params.inputOptions).then(inputOptions => {
        instance.hideLoading();
        processInputOptions(inputOptions);
      });
    } else if (typeof params.inputOptions === 'object') {
      processInputOptions(params.inputOptions);
    } else {
      error(`Unexpected type of inputOptions! Expected object, Map or Promise, got ${typeof params.inputOptions}`);
    }
  };

  /**
   * @param {SweetAlert} instance
   * @param {SweetAlertOptions} params
   */
  const handleInputValue = (instance, params) => {
    const input = instance.getInput();
    if (!input) {
      return;
    }
    hide(input);
    asPromise(params.inputValue).then(inputValue => {
      input.value = params.input === 'number' ? `${parseFloat(inputValue) || 0}` : `${inputValue}`;
      show(input);
      input.focus();
      instance.hideLoading();
    }).catch(err => {
      error(`Error in inputValue promise: ${err}`);
      input.value = '';
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
    if (!select) {
      return;
    }
    /**
     * @param {HTMLElement} parent
     * @param {string} optionLabel
     * @param {string} optionValue
     */
    const renderOption = (parent, optionLabel, optionValue) => {
      const option = document.createElement('option');
      option.value = optionValue;
      setInnerHtml(option, optionLabel);
      option.selected = isSelected(optionValue, params.inputValue);
      parent.appendChild(option);
    };
    inputOptions.forEach(inputOption => {
      const optionValue = inputOption[0];
      const optionLabel = inputOption[1];
      // <optgroup> spec:
      // https://www.w3.org/TR/html401/interact/forms.html#h-17.6
      // "...all OPTGROUP elements must be specified directly within a SELECT element (i.e., groups may not be nested)..."
      // check whether this is a <optgroup>
      if (Array.isArray(optionLabel)) {
        // if it is an array, then it is an <optgroup>
        const optgroup = document.createElement('optgroup');
        optgroup.label = optionValue;
        optgroup.disabled = false; // not configurable for now
        select.appendChild(optgroup);
        optionLabel.forEach(o => renderOption(optgroup, o[1], o[0]));
      } else {
        // case of <option>
        renderOption(select, optionLabel, optionValue);
      }
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
    if (!radio) {
      return;
    }
    inputOptions.forEach(inputOption => {
      const radioValue = inputOption[0];
      const radioLabel = inputOption[1];
      const radioInput = document.createElement('input');
      const radioLabelElement = document.createElement('label');
      radioInput.type = 'radio';
      radioInput.name = swalClasses.radio;
      radioInput.value = radioValue;
      if (isSelected(radioValue, params.inputValue)) {
        radioInput.checked = true;
      }
      const label = document.createElement('span');
      setInnerHtml(label, radioLabel);
      label.className = swalClasses.label;
      radioLabelElement.appendChild(radioInput);
      radioLabelElement.appendChild(label);
      radio.appendChild(radioLabelElement);
    });
    const radios = radio.querySelectorAll('input');
    if (radios.length) {
      radios[0].focus();
    }
  }

  /**
   * Converts `inputOptions` into an array of `[value, label]`s
   *
   * @param {*} inputOptions
   * @typedef {string[]} InputOptionFlattened
   * @returns {InputOptionFlattened[]}
   */
  const formatInputOptions = inputOptions => {
    const entries = inputOptions instanceof Map ? Array.from(inputOptions) : Object.entries(inputOptions);
    return entries.map(([key, value]) => [key, typeof value === 'object' ? formatInputOptions(value) : value]); // case of <optgroup>
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
  const handleConfirmButtonClick = instance => {
    const innerParams = privateProps.innerParams.get(instance);
    instance.disableButtons();
    if (innerParams.input) {
      handleConfirmOrDenyWithInput(instance, 'confirm');
    } else {
      confirm(instance, true);
    }
  };

  /**
   * @param {SweetAlert} instance
   */
  const handleDenyButtonClick = instance => {
    const innerParams = privateProps.innerParams.get(instance);
    instance.disableButtons();
    if (innerParams.returnInputValueOnDeny) {
      handleConfirmOrDenyWithInput(instance, 'deny');
    } else {
      deny(instance, false);
    }
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
    if (innerParams.inputValidator) {
      handleInputValidator(instance, inputValue, type);
    } else if (input && !input.checkValidity()) {
      instance.enableButtons();
      instance.showValidationMessage(innerParams.validationMessage || input.validationMessage);
    } else if (type === 'deny') {
      deny(instance, inputValue);
    } else {
      confirm(instance, inputValue);
    }
  };

  /**
   * @param {SweetAlert} instance
   * @param {SweetAlertInputValue} inputValue
   * @param {'confirm' | 'deny'} type
   */
  const handleInputValidator = (instance, inputValue, type) => {
    const innerParams = privateProps.innerParams.get(instance);
    instance.disableInput();
    const validationPromise = Promise.resolve().then(() => asPromise(innerParams.inputValidator(inputValue, innerParams.validationMessage)));
    validationPromise.then(validationMessage => {
      instance.enableButtons();
      instance.enableInput();
      if (validationMessage) {
        instance.showValidationMessage(validationMessage);
      } else if (type === 'deny') {
        deny(instance, inputValue);
      } else {
        confirm(instance, inputValue);
      }
    });
  };

  /**
   * @param {SweetAlert} instance
   * @param {*} value
   */
  const deny = (instance, value) => {
    const innerParams = privateProps.innerParams.get(instance);
    if (innerParams.showLoaderOnDeny) {
      showLoading(getDenyButton());
    }
    if (innerParams.preDeny) {
      instance.isAwaitingPromise = true; // Flagging the instance as awaiting a promise so it's own promise's reject/resolve methods doesn't get destroyed until the result from this preDeny's promise is received
      const preDenyPromise = Promise.resolve().then(() => asPromise(innerParams.preDeny(value, innerParams.validationMessage)));
      preDenyPromise.then(preDenyValue => {
        if (preDenyValue === false) {
          instance.hideLoading();
          handleAwaitingPromise(instance);
        } else {
          instance.close(/** @type SweetAlertResult */{
            isDenied: true,
            value: typeof preDenyValue === 'undefined' ? value : preDenyValue
          });
        }
      }).catch(error => rejectWith(instance, error));
    } else {
      instance.close(/** @type SweetAlertResult */{
        isDenied: true,
        value
      });
    }
  };

  /**
   * @param {SweetAlert} instance
   * @param {*} value
   */
  const succeedWith = (instance, value) => {
    instance.close(/** @type SweetAlertResult */{
      isConfirmed: true,
      value
    });
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
    if (innerParams.showLoaderOnConfirm) {
      showLoading();
    }
    if (innerParams.preConfirm) {
      instance.resetValidationMessage();
      instance.isAwaitingPromise = true; // Flagging the instance as awaiting a promise so it's own promise's reject/resolve methods doesn't get destroyed until the result from this preConfirm's promise is received
      const preConfirmPromise = Promise.resolve().then(() => asPromise(innerParams.preConfirm(value, innerParams.validationMessage)));
      preConfirmPromise.then(preConfirmValue => {
        if (isVisible$1(getValidationMessage()) || preConfirmValue === false) {
          instance.hideLoading();
          handleAwaitingPromise(instance);
        } else {
          succeedWith(instance, typeof preConfirmValue === 'undefined' ? value : preConfirmValue);
        }
      }).catch(error => rejectWith(instance, error));
    } else {
      succeedWith(instance, value);
    }
  };

  /**
   * Hides loader and shows back the button which was hidden by .showLoading()
   * @this {SweetAlert}
   */
  function hideLoading() {
    // do nothing if popup is closed
    const innerParams = privateProps.innerParams.get(this);
    if (!innerParams) {
      return;
    }
    const domCache = privateProps.domCache.get(this);
    hide(domCache.loader);
    if (isToast()) {
      if (innerParams.icon) {
        show(getIcon());
      }
    } else {
      showRelatedButton(domCache);
    }
    removeClass([domCache.popup, domCache.actions], swalClasses.loading);
    domCache.popup.removeAttribute('aria-busy');
    domCache.popup.removeAttribute('data-loading');
    this.enableButtons();
  }

  /**
   * @param {DomCache} domCache
   */
  const showRelatedButton = domCache => {
    const dataButtonToReplace = domCache.loader.getAttribute('data-button-to-replace');
    const buttonToReplace = dataButtonToReplace ? domCache.popup.getElementsByClassName(dataButtonToReplace) : [];
    if (buttonToReplace.length) {
      show(/** @type {HTMLElement} */buttonToReplace[0], 'inline-block');
    } else if (allButtonsAreHidden()) {
      hide(domCache.actions);
    }
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
    if (!domCache) {
      return null;
    }
    return getInput$1(domCache.popup, innerParams.input);
  }

  /**
   * @param {SweetAlert} instance
   * @param {string[]} buttons
   * @param {boolean} disabled
   */
  function setButtonsDisabled(instance, buttons, disabled) {
    const domCache = privateProps.domCache.get(instance);
    buttons.forEach(button => {
      domCache[button].disabled = disabled;
    });
  }

  /**
   * @param {HTMLInputElement | null} input
   * @param {boolean} disabled
   */
  function setInputDisabled(input, disabled) {
    const popup = getPopup();
    if (!popup || !input) {
      return;
    }
    if (input.type === 'radio') {
      /** @type {NodeListOf<HTMLInputElement>} */
      const radios = popup.querySelectorAll(`[name="${swalClasses.radio}"]`);
      radios.forEach(radio => {
        radio.disabled = disabled;
      });
    } else {
      input.disabled = disabled;
    }
  }

  /**
   * Enable all the buttons
   * @this {SweetAlert}
   */
  function enableButtons() {
    setButtonsDisabled(this, ['confirmButton', 'denyButton', 'cancelButton'], false);
    const focusedElement = privateProps.focusedElement.get(this);
    if (focusedElement instanceof HTMLElement && document.activeElement === document.body) {
      focusedElement.focus();
    }
    privateProps.focusedElement.delete(this);
  }

  /**
   * Disable all the buttons
   * @this {SweetAlert}
   */
  function disableButtons() {
    privateProps.focusedElement.set(this, document.activeElement);
    setButtonsDisabled(this, ['confirmButton', 'denyButton', 'cancelButton'], true);
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
    domCache.validationMessage.className = swalClasses['validation-message'];
    if (params.customClass && params.customClass.validationMessage) {
      addClass(domCache.validationMessage, params.customClass.validationMessage);
    }
    show(domCache.validationMessage);
    const input = this.getInput();
    if (input) {
      input.setAttribute('aria-invalid', 'true');
      input.setAttribute('aria-describedby', swalClasses['validation-message']);
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
    if (domCache.validationMessage) {
      hide(domCache.validationMessage);
    }
    const input = this.getInput();
    if (input) {
      input.removeAttribute('aria-invalid');
      input.removeAttribute('aria-describedby');
      removeClass(input, swalClasses.inputerror);
    }
  }

  const defaultParams = {
    title: '',
    titleText: '',
    text: '',
    html: '',
    footer: '',
    icon: undefined,
    iconColor: undefined,
    iconHtml: undefined,
    template: undefined,
    toast: false,
    draggable: false,
    animation: true,
    theme: 'light',
    showClass: {
      popup: 'swal2-show',
      backdrop: 'swal2-backdrop-show',
      icon: 'swal2-icon-show'
    },
    hideClass: {
      popup: 'swal2-hide',
      backdrop: 'swal2-backdrop-hide',
      icon: 'swal2-icon-hide'
    },
    customClass: {},
    target: 'body',
    color: undefined,
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
    preConfirm: undefined,
    preDeny: undefined,
    confirmButtonText: 'OK',
    confirmButtonAriaLabel: '',
    confirmButtonColor: undefined,
    denyButtonText: 'No',
    denyButtonAriaLabel: '',
    denyButtonColor: undefined,
    cancelButtonText: 'Cancel',
    cancelButtonAriaLabel: '',
    cancelButtonColor: undefined,
    buttonsStyling: true,
    reverseButtons: false,
    focusConfirm: true,
    focusDeny: false,
    focusCancel: false,
    returnFocus: true,
    showCloseButton: false,
    closeButtonHtml: '&times;',
    closeButtonAriaLabel: 'Close this dialog',
    loaderHtml: '',
    showLoaderOnConfirm: false,
    showLoaderOnDeny: false,
    imageUrl: undefined,
    imageWidth: undefined,
    imageHeight: undefined,
    imageAlt: '',
    timer: undefined,
    timerProgressBar: false,
    width: undefined,
    padding: undefined,
    background: undefined,
    input: undefined,
    inputPlaceholder: '',
    inputLabel: '',
    inputValue: '',
    inputOptions: {},
    inputAutoFocus: true,
    inputAutoTrim: true,
    inputAttributes: {},
    inputValidator: undefined,
    returnInputValueOnDeny: false,
    validationMessage: undefined,
    grow: false,
    position: 'center',
    progressSteps: [],
    currentProgressStep: undefined,
    progressStepsDistance: undefined,
    willOpen: undefined,
    didOpen: undefined,
    didRender: undefined,
    willClose: undefined,
    didClose: undefined,
    didDestroy: undefined,
    scrollbarPadding: true,
    topLayer: false
  };
  const updatableParams = ['allowEscapeKey', 'allowOutsideClick', 'background', 'buttonsStyling', 'cancelButtonAriaLabel', 'cancelButtonColor', 'cancelButtonText', 'closeButtonAriaLabel', 'closeButtonHtml', 'color', 'confirmButtonAriaLabel', 'confirmButtonColor', 'confirmButtonText', 'currentProgressStep', 'customClass', 'denyButtonAriaLabel', 'denyButtonColor', 'denyButtonText', 'didClose', 'didDestroy', 'draggable', 'footer', 'hideClass', 'html', 'icon', 'iconColor', 'iconHtml', 'imageAlt', 'imageHeight', 'imageUrl', 'imageWidth', 'preConfirm', 'preDeny', 'progressSteps', 'returnFocus', 'reverseButtons', 'showCancelButton', 'showCloseButton', 'showConfirmButton', 'showDenyButton', 'text', 'title', 'titleText', 'theme', 'willClose'];

  /** @type {Record<string, string | undefined>} */
  const deprecatedParams = {
    allowEnterKey: undefined
  };
  const toastIncompatibleParams = ['allowOutsideClick', 'allowEnterKey', 'backdrop', 'draggable', 'focusConfirm', 'focusDeny', 'focusCancel', 'returnFocus', 'heightAuto', 'keydownListenerCapture'];

  /**
   * Is valid parameter
   *
   * @param {string} paramName
   * @returns {boolean}
   */
  const isValidParameter = paramName => {
    return Object.prototype.hasOwnProperty.call(defaultParams, paramName);
  };

  /**
   * Is valid parameter for Swal.update() method
   *
   * @param {string} paramName
   * @returns {boolean}
   */
  const isUpdatableParameter = paramName => {
    return updatableParams.indexOf(paramName) !== -1;
  };

  /**
   * Is deprecated parameter
   *
   * @param {string} paramName
   * @returns {string | undefined}
   */
  const isDeprecatedParameter = paramName => {
    return deprecatedParams[paramName];
  };

  /**
   * @param {string} param
   */
  const checkIfParamIsValid = param => {
    if (!isValidParameter(param)) {
      warn(`Unknown parameter "${param}"`);
    }
  };

  /**
   * @param {string} param
   */
  const checkIfToastParamIsValid = param => {
    if (toastIncompatibleParams.includes(param)) {
      warn(`The parameter "${param}" is incompatible with toasts`);
    }
  };

  /**
   * @param {string} param
   */
  const checkIfParamIsDeprecated = param => {
    const isDeprecated = isDeprecatedParameter(param);
    if (isDeprecated) {
      warnAboutDeprecation(param, isDeprecated);
    }
  };

  /**
   * Show relevant warnings for given params
   *
   * @param {SweetAlertOptions} params
   */
  const showWarningsForParams = params => {
    if (params.backdrop === false && params.allowOutsideClick) {
      warn('"allowOutsideClick" parameter requires `backdrop` parameter to be set to `true`');
    }
    if (params.theme && !['light', 'dark', 'auto', 'minimal', 'borderless', 'bootstrap-4', 'bootstrap-4-light', 'bootstrap-4-dark', 'bootstrap-5', 'bootstrap-5-light', 'bootstrap-5-dark', 'material-ui', 'material-ui-light', 'material-ui-dark', 'embed-iframe', 'bulma', 'bulma-light', 'bulma-dark'].includes(params.theme)) {
      warn(`Invalid theme "${params.theme}"`);
    }
    for (const param in params) {
      checkIfParamIsValid(param);
      if (params.toast) {
        checkIfToastParamIsValid(param);
      }
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
    if (container) {
      container.dataset['swal2Theme'] = updatedParams.theme;
    }
    render(this, updatedParams);
    privateProps.innerParams.set(this, updatedParams);
    Object.defineProperties(this, {
      params: {
        value: Object.assign({}, this.params, params),
        writable: false,
        enumerable: true
      }
    });
  }

  /**
   * @param {SweetAlertOptions} params
   * @returns {SweetAlertOptions}
   */
  const filterValidParams = params => {
    /** @type {Record<string, any>} */
    const validUpdatableParams = {};
    Object.keys(params).forEach(param => {
      if (isUpdatableParameter(param)) {
        const typedParams = /** @type {Record<string, any>} */params;
        validUpdatableParams[param] = typedParams[param];
      } else {
        warn(`Invalid parameter to update: ${param}`);
      }
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
      disposeWeakMaps(this); // The WeakMaps might have been partly destroyed, we must recall it to dispose any remaining WeakMaps #2335
      return; // This instance has already been destroyed
    }

    // Check if there is another Swal closing
    if (domCache.popup && globalState.swalCloseEventFinishedCallback) {
      globalState.swalCloseEventFinishedCallback();
      delete globalState.swalCloseEventFinishedCallback;
    }
    if (typeof innerParams.didDestroy === 'function') {
      innerParams.didDestroy();
    }
    (_globalState$eventEmi = globalState.eventEmitter) === null || _globalState$eventEmi === void 0 || _globalState$eventEmi.emit('didDestroy');
    disposeSwal(this);
  }

  /**
   * @param {SweetAlert} instance
   */
  const disposeSwal = instance => {
    disposeWeakMaps(instance);
    // Unset this.params so GC will dispose it (#1569)
    // @ts-ignore
    delete instance.params;
    // Unset globalState props so GC will dispose globalState (#1569)
    delete globalState.keydownHandler;
    delete globalState.keydownTarget;
    // Unset currentInstance
    delete globalState.currentInstance;
  };

  /**
   * @param {SweetAlert} instance
   */
  const disposeWeakMaps = instance => {
    // If the current instance is awaiting a promise result, we keep the privateMethods to call them once the promise result is retrieved #2335
    if (instance.isAwaitingPromise) {
      unsetWeakMaps(privateProps, instance);
      instance.isAwaitingPromise = true;
    } else {
      unsetWeakMaps(privateMethods, instance);
      unsetWeakMaps(privateProps, instance);

      // @ts-ignore
      delete instance.isAwaitingPromise;
      // Unset instance methods
      // @ts-ignore
      delete instance.disableButtons;
      // @ts-ignore
      delete instance.enableButtons;
      // @ts-ignore
      delete instance.getInput;
      // @ts-ignore
      delete instance.disableInput;
      // @ts-ignore
      delete instance.enableInput;
      // @ts-ignore
      delete instance.hideLoading;
      // @ts-ignore
      delete instance.disableLoading;
      // @ts-ignore
      delete instance.showValidationMessage;
      // @ts-ignore
      delete instance.resetValidationMessage;
      // @ts-ignore
      delete instance.close;
      // @ts-ignore
      delete instance.closePopup;
      // @ts-ignore
      delete instance.closeModal;
      // @ts-ignore
      delete instance.closeToast;
      // @ts-ignore
      delete instance.rejectPromise;
      // @ts-ignore
      delete instance.update;
      // @ts-ignore
      delete instance._destroy;
    }
  };

  /**
   * @param {Record<string, WeakMap<any, any>>} obj
   * @param {SweetAlert} instance
   */
  const unsetWeakMaps = (obj, instance) => {
    for (const i in obj) {
      obj[i].delete(instance);
    }
  };

  var instanceMethods = /*#__PURE__*/Object.freeze({
    __proto__: null,
    _destroy: _destroy,
    close: close,
    closeModal: close,
    closePopup: close,
    closeToast: close,
    disableButtons: disableButtons,
    disableInput: disableInput,
    disableLoading: hideLoading,
    enableButtons: enableButtons,
    enableInput: enableInput,
    getInput: getInput,
    handleAwaitingPromise: handleAwaitingPromise,
    hideLoading: hideLoading,
    rejectPromise: rejectPromise,
    resetValidationMessage: resetValidationMessage,
    showValidationMessage: showValidationMessage,
    update: update
  });

  /**
   * @param {SweetAlertOptions} innerParams
   * @param {DomCache} domCache
   * @param {(dismiss: DismissReason) => void} dismissWith
   */
  const handlePopupClick = (innerParams, domCache, dismissWith) => {
    if (innerParams.toast) {
      handleToastClick(innerParams, domCache, dismissWith);
    } else {
      // Ignore click events that had mousedown on the popup but mouseup on the container
      // This can happen when the user drags a slider
      handleModalMousedown(domCache);

      // Ignore click events that had mousedown on the container but mouseup on the popup
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
    // Closing toast by internal click
    domCache.popup.onclick = () => {
      if (innerParams && (isAnyButtonShown(innerParams) || innerParams.timer || innerParams.input)) {
        return;
      }
      dismissWith(DismissReason.close);
    };
  };

  /**
   * @param {SweetAlertOptions} innerParams
   * @returns {boolean}
   */
  const isAnyButtonShown = innerParams => {
    return Boolean(innerParams.showConfirmButton || innerParams.showDenyButton || innerParams.showCancelButton || innerParams.showCloseButton);
  };
  let ignoreOutsideClick = false;

  /**
   * @param {DomCache} domCache
   */
  const handleModalMousedown = domCache => {
    domCache.popup.onmousedown = () => {
      domCache.container.onmouseup = function (e) {
        domCache.container.onmouseup = () => {};
        // We only check if the mouseup target is the container because usually it doesn't
        // have any other direct children aside of the popup
        if (e.target === domCache.container) {
          ignoreOutsideClick = true;
        }
      };
    };
  };

  /**
   * @param {DomCache} domCache
   */
  const handleContainerMousedown = domCache => {
    domCache.container.onmousedown = e => {
      // prevent the modal text from being selected on double click on the container (allowOutsideClick: false)
      if (e.target === domCache.container) {
        e.preventDefault();
      }
      domCache.popup.onmouseup = function (e) {
        domCache.popup.onmouseup = () => {};
        // We also need to check if the mouseup target is a child of the popup
        if (e.target === domCache.popup || e.target instanceof HTMLElement && domCache.popup.contains(e.target)) {
          ignoreOutsideClick = true;
        }
      };
    };
  };

  /**
   * @param {SweetAlertOptions} innerParams
   * @param {DomCache} domCache
   * @param {(dismiss: DismissReason) => void} dismissWith
   */
  const handleModalClick = (innerParams, domCache, dismissWith) => {
    domCache.container.onclick = e => {
      if (ignoreOutsideClick) {
        ignoreOutsideClick = false;
        return;
      }
      if (e.target === domCache.container && callIfFunction(innerParams.allowOutsideClick)) {
        dismissWith(DismissReason.backdrop);
      }
    };
  };

  /**
   * @param {unknown} elem
   * @returns {boolean}
   */
  const isJqueryElement = elem => typeof elem === 'object' && elem !== null && 'jquery' in elem;

  /**
   * @param {unknown} elem
   * @returns {boolean}
   */
  const isElement = elem => elem instanceof Element || isJqueryElement(elem);

  /**
   * @param {ReadonlyArray<unknown>} args
   * @returns {SweetAlertOptions}
   */
  const argsToParams = args => {
    /** @type {Record<string, unknown>} */
    const params = {};
    if (typeof args[0] === 'object' && !isElement(args[0])) {
      Object.assign(params, args[0]);
    } else {
      ['title', 'html', 'icon'].forEach((name, index) => {
        const arg = args[index];
        if (typeof arg === 'string' || isElement(arg)) {
          params[name] = arg;
        } else if (arg !== undefined) {
          error(`Unexpected type of ${name}! Expected "string" or "Element", got ${typeof arg}`);
        }
      });
    }
    return /** @type {SweetAlertOptions} */params;
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
    // @ts-ignore: 'this' refers to the SweetAlert constructor
    class MixinSwal extends this {
      /**
       * @param {any} params
       * @param {any} priorityMixinParams
       */
      _main(params, priorityMixinParams) {
        return super._main(params, Object.assign({}, mixinParams, priorityMixinParams));
      }
    }
    // @ts-ignore
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
  const increaseTimer = ms => {
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
  function bindClickHandler(attr = 'data-swal-template') {
    clickHandlers[attr] = this;
    if (!bodyClickListenerAdded) {
      document.body.addEventListener('click', bodyClickListener);
      bodyClickListenerAdded = true;
    }
  }

  /**
   * @param {MouseEvent} event
   */
  const bodyClickListener = event => {
    for (let el = /** @type {any} */event.target; el && el !== document; el = el.parentNode) {
      for (const attr in clickHandlers) {
        const template = el.getAttribute && el.getAttribute(attr);
        if (template) {
          clickHandlers[attr].fire({
            template
          });
          return;
        }
      }
    }
  };

  // Source: https://gist.github.com/mudge/5830382?permalink_comment_id=2691957#gistcomment-2691957

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
      if (typeof this.events[eventName] === 'undefined') {
        // not Set because we need to keep the FIFO order
        // https://github.com/sweetalert2/sweetalert2/pull/2763#discussion_r1748990334
        this.events[eventName] = [];
      }
      return this.events[eventName];
    }

    /**
     * @param {string} eventName
     * @param {EventHandler} eventHandler
     */
    on(eventName, eventHandler) {
      const currentHandlers = this._getHandlersByEventName(eventName);
      if (!currentHandlers.includes(eventHandler)) {
        currentHandlers.push(eventHandler);
      }
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
        // @ts-ignore
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
      eventHandler => {
        try {
          // @ts-ignore
          eventHandler.apply(this, args);
        } catch (error) {
          console.error(error);
        }
      });
    }

    /**
     * @param {string} eventName
     * @param {EventHandler} eventHandler
     */
    removeListener(eventName, eventHandler) {
      const currentHandlers = this._getHandlersByEventName(eventName);
      const index = currentHandlers.indexOf(eventHandler);
      if (index > -1) {
        currentHandlers.splice(index, 1);
      }
    }

    /**
     * @param {string} eventName
     */
    removeAllListeners(eventName) {
      if (this.events[eventName] !== undefined) {
        // https://github.com/sweetalert2/sweetalert2/pull/2763#discussion_r1749239222
        this.events[eventName].length = 0;
      }
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
    if (globalState.eventEmitter) {
      globalState.eventEmitter.on(eventName, eventHandler);
    }
  };

  /**
   * @param {string} eventName
   * @param {EventHandler} eventHandler
   */
  const once = (eventName, eventHandler) => {
    if (globalState.eventEmitter) {
      globalState.eventEmitter.once(eventName, eventHandler);
    }
  };

  /**
   * @param {string} [eventName]
   * @param {EventHandler} [eventHandler]
   */
  const off = (eventName, eventHandler) => {
    if (!globalState.eventEmitter) {
      return;
    }

    // Remove all handlers for all events
    if (!eventName) {
      globalState.eventEmitter.reset();
      return;
    }
    if (eventHandler) {
      // Remove a specific handler
      globalState.eventEmitter.removeListener(eventName, eventHandler);
    } else {
      // Remove all handlers for a specific event
      globalState.eventEmitter.removeAllListeners(eventName);
    }
  };

  var staticMethods = /*#__PURE__*/Object.freeze({
    __proto__: null,
    argsToParams: argsToParams,
    bindClickHandler: bindClickHandler,
    clickCancel: clickCancel,
    clickConfirm: clickConfirm,
    clickDeny: clickDeny,
    enableLoading: showLoading,
    fire: fire,
    getActions: getActions,
    getCancelButton: getCancelButton,
    getCloseButton: getCloseButton,
    getConfirmButton: getConfirmButton,
    getContainer: getContainer,
    getDenyButton: getDenyButton,
    getFocusableElements: getFocusableElements,
    getFooter: getFooter,
    getHtmlContainer: getHtmlContainer,
    getIcon: getIcon,
    getIconContent: getIconContent,
    getImage: getImage,
    getInputLabel: getInputLabel,
    getLoader: getLoader,
    getPopup: getPopup,
    getProgressSteps: getProgressSteps,
    getTimerLeft: getTimerLeft,
    getTimerProgressBar: getTimerProgressBar,
    getTitle: getTitle,
    getValidationMessage: getValidationMessage,
    increaseTimer: increaseTimer,
    isDeprecatedParameter: isDeprecatedParameter,
    isLoading: isLoading,
    isTimerRunning: isTimerRunning,
    isUpdatableParameter: isUpdatableParameter,
    isValidParameter: isValidParameter,
    isVisible: isVisible,
    mixin: mixin,
    off: off,
    on: on,
    once: once,
    resumeTimer: resumeTimer,
    showLoading: showLoading,
    stopTimer: stopTimer,
    toggleTimer: toggleTimer
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
        this.started = new Date();
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
        this.remaining -= new Date().getTime() - this.started.getTime();
      }
      return this.remaining;
    }

    /**
     * @param {number} n
     * @returns {number}
     */
    increase(n) {
      const running = this.running;
      if (running) {
        this.stop();
      }
      this.remaining += n;
      if (running) {
        this.start();
      }
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

  const swalStringParams = ['swal-title', 'swal-html', 'swal-footer'];

  /**
   * @param {SweetAlertOptions} params
   * @returns {SweetAlertOptions}
   */
  const getTemplateParams = params => {
    const template = typeof params.template === 'string' ? (/** @type {HTMLTemplateElement} */document.querySelector(params.template)) : params.template;
    if (!template) {
      return {};
    }
    /** @type {DocumentFragment} */
    const templateContent = template.content;
    showWarningsForElements(templateContent);
    const result = Object.assign(getSwalParams(templateContent), getSwalFunctionParams(templateContent), getSwalButtons(templateContent), getSwalImage(templateContent), getSwalIcon(templateContent), getSwalInput(templateContent), getSwalStringParams(templateContent, swalStringParams));
    return result;
  };

  /**
   * @param {DocumentFragment} templateContent
   * @returns {Record<string, string | boolean | number>}
   */
  const getSwalParams = templateContent => {
    /** @type {Record<string, string | boolean | number>} */
    const result = {};
    /** @type {HTMLElement[]} */
    const swalParams = Array.from(templateContent.querySelectorAll('swal-param'));
    swalParams.forEach(param => {
      showWarningsForAttributes(param, ['name', 'value']);
      const paramName = /** @type {keyof SweetAlertOptions} */param.getAttribute('name');
      const value = param.getAttribute('value');
      if (!paramName || !value) {
        return;
      }
      if (paramName in defaultParams && typeof defaultParams[(/** @type {keyof typeof defaultParams} */paramName)] === 'boolean') {
        result[paramName] = value !== 'false';
      } else if (paramName in defaultParams && typeof defaultParams[(/** @type {keyof typeof defaultParams} */paramName)] === 'object') {
        result[paramName] = JSON.parse(value);
      } else {
        result[paramName] = value;
      }
    });
    return result;
  };

  /**
   * @param {DocumentFragment} templateContent
   * @returns {Record<string, () => void>}
   */
  const getSwalFunctionParams = templateContent => {
    /** @type {Record<string, () => void>} */
    const result = {};
    /** @type {HTMLElement[]} */
    const swalFunctions = Array.from(templateContent.querySelectorAll('swal-function-param'));
    swalFunctions.forEach(param => {
      const paramName = /** @type {keyof SweetAlertOptions} */param.getAttribute('name');
      const value = param.getAttribute('value');
      if (!paramName || !value) {
        return;
      }
      result[paramName] = new Function(`return ${value}`)();
    });
    return result;
  };

  /**
   * @param {DocumentFragment} templateContent
   * @returns {Record<string, string | boolean>}
   */
  const getSwalButtons = templateContent => {
    /** @type {Record<string, string | boolean>} */
    const result = {};
    /** @type {HTMLElement[]} */
    const swalButtons = Array.from(templateContent.querySelectorAll('swal-button'));
    swalButtons.forEach(button => {
      showWarningsForAttributes(button, ['type', 'color', 'aria-label']);
      const type = button.getAttribute('type');
      if (!type || !['confirm', 'cancel', 'deny'].includes(type)) {
        return;
      }
      result[`${type}ButtonText`] = button.innerHTML;
      result[`show${capitalizeFirstLetter(type)}Button`] = true;
      const color = button.getAttribute('color');
      if (color !== null) {
        result[`${type}ButtonColor`] = color;
      }
      const ariaLabel = button.getAttribute('aria-label');
      if (ariaLabel !== null) {
        result[`${type}ButtonAriaLabel`] = ariaLabel;
      }
    });
    return result;
  };

  /**
   * @param {DocumentFragment} templateContent
   * @returns {Pick<SweetAlertOptions, 'imageUrl' | 'imageWidth' | 'imageHeight' | 'imageAlt'>}
   */
  const getSwalImage = templateContent => {
    const result = {};
    /** @type {HTMLElement | null} */
    const image = templateContent.querySelector('swal-image');
    if (image) {
      showWarningsForAttributes(image, ['src', 'width', 'height', 'alt']);
      // getAttribute returns null if attribute is absent; `|| undefined` converts empty string to undefined
      const src = image.getAttribute('src');
      if (src !== null) result.imageUrl = src || undefined;
      const width = image.getAttribute('width');
      if (width !== null) result.imageWidth = width || undefined;
      const height = image.getAttribute('height');
      if (height !== null) result.imageHeight = height || undefined;
      const alt = image.getAttribute('alt');
      if (alt !== null) result.imageAlt = alt || undefined;
    }
    return result;
  };

  /**
   * @param {DocumentFragment} templateContent
   * @returns {object}
   */
  const getSwalIcon = templateContent => {
    const result = {};
    /** @type {HTMLElement | null} */
    const icon = templateContent.querySelector('swal-icon');
    if (icon) {
      showWarningsForAttributes(icon, ['type', 'color']);
      if (icon.hasAttribute('type')) {
        result.icon = icon.getAttribute('type');
      }
      if (icon.hasAttribute('color')) {
        result.iconColor = icon.getAttribute('color');
      }
      result.iconHtml = icon.innerHTML;
    }
    return result;
  };

  /**
   * @param {DocumentFragment} templateContent
   * @returns {object}
   */
  const getSwalInput = templateContent => {
    /** @type {Record<string, any>} */
    const result = {};
    /** @type {HTMLElement | null} */
    const input = templateContent.querySelector('swal-input');
    if (input) {
      showWarningsForAttributes(input, ['type', 'label', 'placeholder', 'value']);
      result.input = input.getAttribute('type') || 'text';
      if (input.hasAttribute('label')) {
        result.inputLabel = input.getAttribute('label');
      }
      if (input.hasAttribute('placeholder')) {
        result.inputPlaceholder = input.getAttribute('placeholder');
      }
      if (input.hasAttribute('value')) {
        result.inputValue = input.getAttribute('value');
      }
    }
    /** @type {HTMLElement[]} */
    const inputOptions = Array.from(templateContent.querySelectorAll('swal-input-option'));
    if (inputOptions.length) {
      result.inputOptions = {};
      inputOptions.forEach(option => {
        showWarningsForAttributes(option, ['value']);
        const optionValue = option.getAttribute('value');
        if (!optionValue) {
          return;
        }
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
        result[paramName.replace(/^swal-/, '')] = tag.innerHTML.trim();
      }
    }
    return result;
  };

  /**
   * @param {DocumentFragment} templateContent
   */
  const showWarningsForElements = templateContent => {
    const allowedElements = swalStringParams.concat(['swal-param', 'swal-function-param', 'swal-button', 'swal-image', 'swal-icon', 'swal-input', 'swal-input-option']);
    Array.from(templateContent.children).forEach(el => {
      const tagName = el.tagName.toLowerCase();
      if (!allowedElements.includes(tagName)) {
        warn(`Unrecognized element <${tagName}>`);
      }
    });
  };

  /**
   * @param {HTMLElement} el
   * @param {string[]} allowedAttributes
   */
  const showWarningsForAttributes = (el, allowedAttributes) => {
    Array.from(el.attributes).forEach(attribute => {
      if (allowedAttributes.indexOf(attribute.name) === -1) {
        warn([`Unrecognized attribute "${attribute.name}" on <${el.tagName.toLowerCase()}>.`, `${allowedAttributes.length ? `Allowed attributes are: ${allowedAttributes.join(', ')}` : 'To set the value, use HTML within the element.'}`]);
      }
    });
  };

  const SHOW_CLASS_TIMEOUT = 10;

  /**
   * Open popup, add necessary classes and styles, fix scrollbar
   *
   * @param {SweetAlertOptions} params
   */
  const openPopup = params => {
    var _globalState$eventEmi, _globalState$eventEmi2;
    const container = getContainer();
    const popup = getPopup();
    if (!container || !popup) {
      return;
    }
    if (typeof params.willOpen === 'function') {
      params.willOpen(popup);
    }
    (_globalState$eventEmi = globalState.eventEmitter) === null || _globalState$eventEmi === void 0 || _globalState$eventEmi.emit('willOpen', popup);
    const bodyStyles = window.getComputedStyle(document.body);
    const initialBodyOverflow = bodyStyles.overflowY;
    addClasses(container, popup, params);

    // scrolling is 'hidden' until animation is done, after that 'auto'
    setTimeout(() => {
      setScrollingVisibility(container, popup);
    }, SHOW_CLASS_TIMEOUT);
    if (isModal()) {
      fixScrollContainer(container, params.scrollbarPadding !== undefined ? params.scrollbarPadding : false, initialBodyOverflow);
      setAriaHidden();
    }

    // https://github.com/sweetalert2/sweetalert2/issues/2923
    if (isIOS && params.backdrop === false && popup.scrollHeight > container.clientHeight) {
      // remove pointer-events: none from container, it breaks scrolling tall popups in iOS
      container.style.pointerEvents = 'auto';
    }
    if (!isToast() && !globalState.previousActiveElement) {
      globalState.previousActiveElement = document.activeElement;
    }
    if (typeof params.didOpen === 'function') {
      const didOpen = params.didOpen;
      setTimeout(() => didOpen(popup));
    }
    (_globalState$eventEmi2 = globalState.eventEmitter) === null || _globalState$eventEmi2 === void 0 || _globalState$eventEmi2.emit('didOpen', popup);
  };

  /**
   * @param {Event} event
   */
  const swalOpenAnimationFinished = event => {
    const popup = getPopup();
    if (!popup || event.target !== popup) {
      return;
    }
    const container = getContainer();
    if (!container) {
      return;
    }
    popup.removeEventListener('animationend', swalOpenAnimationFinished);
    popup.removeEventListener('transitionend', swalOpenAnimationFinished);
    container.style.overflowY = 'auto';

    // no-transition is added in init() in case one swal is opened right after another
    removeClass(container, swalClasses['no-transition']);
  };

  /**
   * @param {HTMLElement} container
   * @param {HTMLElement} popup
   */
  const setScrollingVisibility = (container, popup) => {
    if (hasCssAnimation(popup)) {
      container.style.overflowY = 'hidden';
      popup.addEventListener('animationend', swalOpenAnimationFinished);
      popup.addEventListener('transitionend', swalOpenAnimationFinished);
    } else {
      container.style.overflowY = 'auto';
    }
  };

  /**
   * @param {HTMLElement} container
   * @param {boolean} scrollbarPadding
   * @param {string} initialBodyOverflow
   */
  const fixScrollContainer = (container, scrollbarPadding, initialBodyOverflow) => {
    iOSfix();
    if (scrollbarPadding && initialBodyOverflow !== 'hidden') {
      replaceScrollbarWithPadding(initialBodyOverflow);
    }

    // sweetalert2/issues/1247
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
    if ((_params$showClass = params.showClass) !== null && _params$showClass !== void 0 && _params$showClass.backdrop) {
      addClass(container, params.showClass.backdrop);
    }
    if (params.animation) {
      // this workaround with opacity is needed for https://github.com/sweetalert2/sweetalert2/issues/2059
      popup.style.setProperty('opacity', '0', 'important');
      show(popup, 'grid');
      setTimeout(() => {
        var _params$showClass2;
        // Animate popup right after showing it
        if ((_params$showClass2 = params.showClass) !== null && _params$showClass2 !== void 0 && _params$showClass2.popup) {
          addClass(popup, params.showClass.popup);
        }
        // and remove the opacity workaround
        popup.style.removeProperty('opacity');
      }, SHOW_CLASS_TIMEOUT); // 10ms in order to fix #2062
    } else {
      show(popup, 'grid');
    }
    addClass([document.documentElement, document.body], swalClasses.shown);
    if (params.heightAuto && params.backdrop && !params.toast) {
      addClass([document.documentElement, document.body], swalClasses['height-auto']);
    }
  };

  var defaultInputValidators = {
    /**
     * @param {string} string
     * @param {string} [validationMessage]
     * @returns {Promise<string | void>}
     */
    email: (string, validationMessage) => {
      return /^[a-zA-Z0-9.+_'-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9-]+$/.test(string) ? Promise.resolve() : Promise.resolve(validationMessage || 'Invalid email address');
    },
    /**
     * @param {string} string
     * @param {string} [validationMessage]
     * @returns {Promise<string | void>}
     */
    url: (string, validationMessage) => {
      // taken from https://stackoverflow.com/a/3809435 with a small change from #1306 and #2013
      return /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-z]{2,63}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)$/.test(string) ? Promise.resolve() : Promise.resolve(validationMessage || 'Invalid URL');
    }
  };

  /**
   * @param {SweetAlertOptions} params
   */
  function setDefaultInputValidators(params) {
    // Use default `inputValidator` for supported input types if not provided
    if (params.inputValidator) {
      return;
    }
    if (params.input === 'email') {
      params.inputValidator = defaultInputValidators['email'];
    }
    if (params.input === 'url') {
      params.inputValidator = defaultInputValidators['url'];
    }
  }

  /**
   * @param {SweetAlertOptions} params
   */
  function validateCustomTargetElement(params) {
    // Determine if the custom target element is valid
    if (!params.target || typeof params.target === 'string' && !document.querySelector(params.target) || typeof params.target !== 'string' && !params.target.appendChild) {
      warn('Target parameter is not valid, defaulting to "body"');
      params.target = 'body';
    }
  }

  /**
   * Set type, text and actions on popup
   *
   * @param {SweetAlertOptions} params
   */
  function setParameters(params) {
    setDefaultInputValidators(params);

    // showLoaderOnConfirm && preConfirm
    if (params.showLoaderOnConfirm && !params.preConfirm) {
      warn('showLoaderOnConfirm is set to true, but preConfirm is not defined.\n' + 'showLoaderOnConfirm should be used together with preConfirm, see usage example:\n' + 'https://sweetalert2.github.io/#ajax-request');
    }
    validateCustomTargetElement(params);

    // Replace newlines with <br> in title
    if (typeof params.title === 'string') {
      params.title = params.title.split('\n').join('<br />');
    }
    init(params);
  }

  /** @type {SweetAlert} */
  let currentInstance;
  var _promise = /*#__PURE__*/new WeakMap();
  class SweetAlert {
    /**
     * @param {...(SweetAlertOptions | string)} args
     * @this {SweetAlert}
     */
    constructor(...args) {
      /**
       * @type {Promise<SweetAlertResult>}
       */
      _classPrivateFieldInitSpec(this, _promise, /** @type {Promise<SweetAlertResult>} */
      Promise.resolve({
        isConfirmed: false,
        isDenied: false,
        isDismissed: true
      }));
      // Prevent run in Node env
      if (typeof window === 'undefined') {
        return;
      }
      currentInstance = this;

      // @ts-ignore
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
        const {
          isAwaitingPromise
        } = globalState.currentInstance;
        globalState.currentInstance._destroy();
        if (!isAwaitingPromise) {
          swalPromiseResolve({
            isDismissed: true
          });
        }
        if (isModal()) {
          unsetAriaHidden();
        }
      }
      globalState.currentInstance = currentInstance;
      const innerParams = prepareParams(userParams, mixinParams);
      setParameters(innerParams);
      Object.freeze(innerParams);

      // clear the previous timer
      if (globalState.timeout) {
        globalState.timeout.stop();
        delete globalState.timeout;
      }

      // clear the restore focus timeout
      clearTimeout(globalState.restoreFocusTimeout);
      const domCache = populateDomCache(currentInstance);
      render(currentInstance, innerParams);
      privateProps.innerParams.set(currentInstance, innerParams);
      return swalPromise(currentInstance, domCache, innerParams);
    }

    // `catch` cannot be the name of a module export, so we define our thenable methods here instead
    /**
     * @param {any} onFulfilled
     */
    // oxlint-disable-next-line unicorn/no-thenable
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
      // functions to handle all closings/dismissals
      /**
       * @param {DismissReason} dismiss
       */
      const dismissWith = dismiss => {
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

      // Scroll container to top on open (#1247, #1946)
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
    const params = Object.assign({}, defaultParams, mixinParams, templateParams, userParams); // precedence is described in #2131
    params.showClass = Object.assign({}, defaultParams.showClass, params.showClass);
    params.hideClass = Object.assign({}, defaultParams.hideClass, params.hideClass);
    if (params.animation === false) {
      params.showClass = {
        backdrop: 'swal2-noanimation'
      };
      params.hideClass = {};
    }
    return params;
  };

  /**
   * @param {SweetAlert} instance
   * @returns {DomCache}
   */
  const populateDomCache = instance => {
    const domCache = /** @type {DomCache} */{
      popup: (/** @type {HTMLElement} */getPopup()),
      container: (/** @type {HTMLElement} */getContainer()),
      actions: (/** @type {HTMLElement} */getActions()),
      confirmButton: (/** @type {HTMLElement} */getConfirmButton()),
      denyButton: (/** @type {HTMLElement} */getDenyButton()),
      cancelButton: (/** @type {HTMLElement} */getCancelButton()),
      loader: (/** @type {HTMLElement} */getLoader()),
      closeButton: (/** @type {HTMLElement} */getCloseButton()),
      validationMessage: (/** @type {HTMLElement} */getValidationMessage()),
      progressSteps: (/** @type {HTMLElement} */getProgressSteps())
    };
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
        dismissWith('timer');
        delete globalState.timeout;
      }, innerParams.timer);
      if (innerParams.timerProgressBar && timerProgressBar) {
        show(timerProgressBar);
        applyCustomClass(timerProgressBar, innerParams, 'timerProgressBar');
        setTimeout(() => {
          if (globalState.timeout && globalState.timeout.running) {
            // timer can be already stopped or unset at this point
            animateTimerProgressBar(/** @type {number} */innerParams.timer);
          }
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
    if (innerParams.toast) {
      return;
    }
    // TODO: this is dumb, remove `allowEnterKey` param in the next major version
    if (!callIfFunction(innerParams.allowEnterKey)) {
      warnAboutDeprecation('allowEnterKey', 'preConfirm: () => false');
      domCache.popup.focus();
      return;
    }
    if (focusAutofocus(domCache)) {
      return;
    }
    if (focusButton(domCache, innerParams)) {
      return;
    }
    setFocus(-1, 1);
  };

  /**
   * @param {DomCache} domCache
   * @returns {boolean}
   */
  const focusAutofocus = domCache => {
    const autofocusElements = Array.from(domCache.popup.querySelectorAll('[autofocus]'));
    for (const autofocusElement of autofocusElements) {
      if (autofocusElement instanceof HTMLElement && isVisible$1(autofocusElement)) {
        autofocusElement.focus();
        return true;
      }
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

  // Assign instance methods from src/instanceMethods/*.js to prototype
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

  // Assign static methods from src/staticMethods/*.js to constructor
  Object.assign(SweetAlert, staticMethods);

  // Proxy to instance methods to constructor, for now, for backwards compatibility
  Object.keys(instanceMethods).forEach(key => {
    /**
     * @param {...(SweetAlertOptions | string | undefined)} args
     * @returns {SweetAlertResult | Promise<SweetAlertResult> | undefined}
     */
    // @ts-ignore: Dynamic property assignment for backwards compatibility
    SweetAlert[key] = function (...args) {
      // @ts-ignore
      if (currentInstance && currentInstance[key]) {
        // @ts-ignore
        return currentInstance[key](...args);
      }
      return undefined;
    };
  });
  SweetAlert.DismissReason = DismissReason;
  SweetAlert.version = '11.26.25';

  const Swal = SweetAlert;
  // @ts-ignore
  Swal.default = Swal;

  return Swal;

}));
if (typeof this !== 'undefined' && this.Sweetalert2){this.swal = this.sweetAlert = this.Swal = this.SweetAlert = this.Sweetalert2}
"undefined"!=typeof document&&function(e,t){var n=e.createElement("style");if(e.getElementsByTagName("head")[0].appendChild(n),n.styleSheet)n.styleSheet.disabled||(n.styleSheet.cssText=t);else try{n.innerHTML=t}catch(e){n.innerText=t}}(document,":root{--swal2-outline: 0 0 0 3px rgba(100, 150, 200, 0.5);--swal2-container-padding: 0.625em;--swal2-backdrop: rgba(0, 0, 0, 0.4);--swal2-backdrop-transition: background-color 0.15s;--swal2-width: 32em;--swal2-padding: 0 0 1.25em;--swal2-border: none;--swal2-border-radius: 0.3125rem;--swal2-background: white;--swal2-color: #545454;--swal2-show-animation: swal2-show 0.3s;--swal2-hide-animation: swal2-hide 0.15s forwards;--swal2-icon-zoom: 1;--swal2-title-padding: 0.8em 1em 0;--swal2-html-container-padding: 1em 1.6em 0.3em;--swal2-input-border: 1px solid #d9d9d9;--swal2-input-border-radius: 0.1875em;--swal2-input-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.06), 0 0 0 3px transparent;--swal2-input-background: transparent;--swal2-input-transition: border-color 0.2s, box-shadow 0.2s;--swal2-input-hover-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.06), 0 0 0 3px transparent;--swal2-input-focus-border: 1px solid #b4dbed;--swal2-input-focus-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.06), 0 0 0 3px rgba(100, 150, 200, 0.5);--swal2-progress-step-background: #add8e6;--swal2-validation-message-background: #f0f0f0;--swal2-validation-message-color: #666;--swal2-footer-border-color: #eee;--swal2-footer-background: transparent;--swal2-footer-color: inherit;--swal2-timer-progress-bar-background: rgba(0, 0, 0, 0.3);--swal2-close-button-position: initial;--swal2-close-button-inset: auto;--swal2-close-button-font-size: 2.5em;--swal2-close-button-color: #ccc;--swal2-close-button-transition: color 0.2s, box-shadow 0.2s;--swal2-close-button-outline: initial;--swal2-close-button-box-shadow: inset 0 0 0 3px transparent;--swal2-close-button-focus-box-shadow: inset var(--swal2-outline);--swal2-close-button-hover-transform: none;--swal2-actions-justify-content: center;--swal2-actions-width: auto;--swal2-actions-margin: 1.25em auto 0;--swal2-actions-padding: 0;--swal2-actions-border-radius: 0;--swal2-actions-background: transparent;--swal2-action-button-transition: background-color 0.2s, box-shadow 0.2s;--swal2-action-button-hover: black 10%;--swal2-action-button-active: black 10%;--swal2-confirm-button-box-shadow: none;--swal2-confirm-button-border-radius: 0.25em;--swal2-confirm-button-background-color: #7066e0;--swal2-confirm-button-color: #fff;--swal2-deny-button-box-shadow: none;--swal2-deny-button-border-radius: 0.25em;--swal2-deny-button-background-color: #dc3741;--swal2-deny-button-color: #fff;--swal2-cancel-button-box-shadow: none;--swal2-cancel-button-border-radius: 0.25em;--swal2-cancel-button-background-color: #6e7881;--swal2-cancel-button-color: #fff;--swal2-toast-show-animation: swal2-toast-show 0.5s;--swal2-toast-hide-animation: swal2-toast-hide 0.1s forwards;--swal2-toast-border: none;--swal2-toast-box-shadow: 0 0 1px hsl(0deg 0% 0% / 0.075), 0 1px 2px hsl(0deg 0% 0% / 0.075), 1px 2px 4px hsl(0deg 0% 0% / 0.075), 1px 3px 8px hsl(0deg 0% 0% / 0.075), 2px 4px 16px hsl(0deg 0% 0% / 0.075)}[data-swal2-theme=dark]{--swal2-dark-theme-black: #19191a;--swal2-dark-theme-white: #e1e1e1;--swal2-background: var(--swal2-dark-theme-black);--swal2-color: var(--swal2-dark-theme-white);--swal2-footer-border-color: #555;--swal2-input-background: color-mix(in srgb, var(--swal2-dark-theme-black), var(--swal2-dark-theme-white) 10%);--swal2-validation-message-background: color-mix( in srgb, var(--swal2-dark-theme-black), var(--swal2-dark-theme-white) 10% );--swal2-validation-message-color: var(--swal2-dark-theme-white);--swal2-timer-progress-bar-background: rgba(255, 255, 255, 0.7)}@media(prefers-color-scheme: dark){[data-swal2-theme=auto]{--swal2-dark-theme-black: #19191a;--swal2-dark-theme-white: #e1e1e1;--swal2-background: var(--swal2-dark-theme-black);--swal2-color: var(--swal2-dark-theme-white);--swal2-footer-border-color: #555;--swal2-input-background: color-mix(in srgb, var(--swal2-dark-theme-black), var(--swal2-dark-theme-white) 10%);--swal2-validation-message-background: color-mix( in srgb, var(--swal2-dark-theme-black), var(--swal2-dark-theme-white) 10% );--swal2-validation-message-color: var(--swal2-dark-theme-white);--swal2-timer-progress-bar-background: rgba(255, 255, 255, 0.7)}}body.swal2-shown:not(.swal2-no-backdrop,.swal2-toast-shown){overflow:hidden}body.swal2-height-auto{height:auto !important}body.swal2-no-backdrop .swal2-container{background-color:rgba(0,0,0,0) !important;pointer-events:none}body.swal2-no-backdrop .swal2-container .swal2-popup{pointer-events:auto}body.swal2-no-backdrop .swal2-container .swal2-modal{box-shadow:0 0 10px var(--swal2-backdrop)}body.swal2-toast-shown .swal2-container{box-sizing:border-box;width:360px;max-width:100%;background-color:rgba(0,0,0,0);pointer-events:none}body.swal2-toast-shown .swal2-container.swal2-top{inset:0 auto auto 50%;transform:translateX(-50%)}body.swal2-toast-shown .swal2-container.swal2-top-end,body.swal2-toast-shown .swal2-container.swal2-top-right{inset:0 0 auto auto}body.swal2-toast-shown .swal2-container.swal2-top-start,body.swal2-toast-shown .swal2-container.swal2-top-left{inset:0 auto auto 0}body.swal2-toast-shown .swal2-container.swal2-center-start,body.swal2-toast-shown .swal2-container.swal2-center-left{inset:50% auto auto 0;transform:translateY(-50%)}body.swal2-toast-shown .swal2-container.swal2-center{inset:50% auto auto 50%;transform:translate(-50%, -50%)}body.swal2-toast-shown .swal2-container.swal2-center-end,body.swal2-toast-shown .swal2-container.swal2-center-right{inset:50% 0 auto auto;transform:translateY(-50%)}body.swal2-toast-shown .swal2-container.swal2-bottom-start,body.swal2-toast-shown .swal2-container.swal2-bottom-left{inset:auto auto 0 0}body.swal2-toast-shown .swal2-container.swal2-bottom{inset:auto auto 0 50%;transform:translateX(-50%)}body.swal2-toast-shown .swal2-container.swal2-bottom-end,body.swal2-toast-shown .swal2-container.swal2-bottom-right{inset:auto 0 0 auto}@media print{body.swal2-shown:not(.swal2-no-backdrop,.swal2-toast-shown){overflow-y:scroll !important}body.swal2-shown:not(.swal2-no-backdrop,.swal2-toast-shown)>[aria-hidden=true]{display:none}body.swal2-shown:not(.swal2-no-backdrop,.swal2-toast-shown) .swal2-container{position:static !important}}div:where(.swal2-container){display:grid;position:fixed;z-index:1060;inset:0;box-sizing:border-box;grid-template-areas:\"top-start     top            top-end\" \"center-start  center         center-end\" \"bottom-start  bottom-center  bottom-end\";grid-template-rows:minmax(min-content, auto) minmax(min-content, auto) minmax(min-content, auto);height:100%;padding:var(--swal2-container-padding);overflow-x:hidden;transition:var(--swal2-backdrop-transition);-webkit-overflow-scrolling:touch}div:where(.swal2-container).swal2-backdrop-show,div:where(.swal2-container).swal2-noanimation{background:var(--swal2-backdrop)}div:where(.swal2-container).swal2-backdrop-hide{background:rgba(0,0,0,0) !important}div:where(.swal2-container).swal2-top-start,div:where(.swal2-container).swal2-center-start,div:where(.swal2-container).swal2-bottom-start{grid-template-columns:minmax(0, 1fr) auto auto}div:where(.swal2-container).swal2-top,div:where(.swal2-container).swal2-center,div:where(.swal2-container).swal2-bottom{grid-template-columns:auto minmax(0, 1fr) auto}div:where(.swal2-container).swal2-top-end,div:where(.swal2-container).swal2-center-end,div:where(.swal2-container).swal2-bottom-end{grid-template-columns:auto auto minmax(0, 1fr)}div:where(.swal2-container).swal2-top-start>.swal2-popup{align-self:start}div:where(.swal2-container).swal2-top>.swal2-popup{grid-column:2;place-self:start center}div:where(.swal2-container).swal2-top-end>.swal2-popup,div:where(.swal2-container).swal2-top-right>.swal2-popup{grid-column:3;place-self:start end}div:where(.swal2-container).swal2-center-start>.swal2-popup,div:where(.swal2-container).swal2-center-left>.swal2-popup{grid-row:2;align-self:center}div:where(.swal2-container).swal2-center>.swal2-popup{grid-column:2;grid-row:2;place-self:center center}div:where(.swal2-container).swal2-center-end>.swal2-popup,div:where(.swal2-container).swal2-center-right>.swal2-popup{grid-column:3;grid-row:2;place-self:center end}div:where(.swal2-container).swal2-bottom-start>.swal2-popup,div:where(.swal2-container).swal2-bottom-left>.swal2-popup{grid-column:1;grid-row:3;align-self:end}div:where(.swal2-container).swal2-bottom>.swal2-popup{grid-column:2;grid-row:3;place-self:end center}div:where(.swal2-container).swal2-bottom-end>.swal2-popup,div:where(.swal2-container).swal2-bottom-right>.swal2-popup{grid-column:3;grid-row:3;place-self:end end}div:where(.swal2-container).swal2-grow-row>.swal2-popup,div:where(.swal2-container).swal2-grow-fullscreen>.swal2-popup{grid-column:1/4;width:100%}div:where(.swal2-container).swal2-grow-column>.swal2-popup,div:where(.swal2-container).swal2-grow-fullscreen>.swal2-popup{grid-row:1/4;align-self:stretch}div:where(.swal2-container).swal2-no-transition{transition:none !important}div:where(.swal2-container)[popover]{width:auto;border:0}div:where(.swal2-container) div:where(.swal2-popup){display:none;position:relative;box-sizing:border-box;grid-template-columns:minmax(0, 100%);width:var(--swal2-width);max-width:100%;padding:var(--swal2-padding);border:var(--swal2-border);border-radius:var(--swal2-border-radius);background:var(--swal2-background);color:var(--swal2-color);font-family:inherit;font-size:1rem}div:where(.swal2-container) div:where(.swal2-popup):focus{outline:none}div:where(.swal2-container) div:where(.swal2-popup).swal2-loading{overflow-y:hidden}div:where(.swal2-container) div:where(.swal2-popup).swal2-draggable{cursor:grab}div:where(.swal2-container) div:where(.swal2-popup).swal2-draggable div:where(.swal2-icon){cursor:grab}div:where(.swal2-container) div:where(.swal2-popup).swal2-dragging{cursor:grabbing}div:where(.swal2-container) div:where(.swal2-popup).swal2-dragging div:where(.swal2-icon){cursor:grabbing}div:where(.swal2-container) h2:where(.swal2-title){position:relative;max-width:100%;margin:0;padding:var(--swal2-title-padding);color:inherit;font-size:1.875em;font-weight:600;text-align:center;text-transform:none;overflow-wrap:break-word;cursor:initial}div:where(.swal2-container) div:where(.swal2-actions){display:flex;z-index:1;box-sizing:border-box;flex-wrap:wrap;align-items:center;justify-content:var(--swal2-actions-justify-content);width:var(--swal2-actions-width);margin:var(--swal2-actions-margin);padding:var(--swal2-actions-padding);border-radius:var(--swal2-actions-border-radius);background:var(--swal2-actions-background)}div:where(.swal2-container) div:where(.swal2-loader){display:none;align-items:center;justify-content:center;width:2.2em;height:2.2em;margin:0 1.875em;animation:swal2-rotate-loading 1.5s linear 0s infinite normal;border-width:.25em;border-style:solid;border-radius:100%;border-color:#2778c4 rgba(0,0,0,0) #2778c4 rgba(0,0,0,0)}div:where(.swal2-container) button:where(.swal2-styled){margin:.3125em;padding:.625em 1.1em;transition:var(--swal2-action-button-transition);border:none;box-shadow:0 0 0 3px rgba(0,0,0,0);font-weight:500}div:where(.swal2-container) button:where(.swal2-styled):not([disabled]){cursor:pointer}div:where(.swal2-container) button:where(.swal2-styled):where(.swal2-confirm){border-radius:var(--swal2-confirm-button-border-radius);background:initial;background-color:var(--swal2-confirm-button-background-color);box-shadow:var(--swal2-confirm-button-box-shadow);color:var(--swal2-confirm-button-color);font-size:1em}div:where(.swal2-container) button:where(.swal2-styled):where(.swal2-confirm):hover{background-color:color-mix(in srgb, var(--swal2-confirm-button-background-color), var(--swal2-action-button-hover))}div:where(.swal2-container) button:where(.swal2-styled):where(.swal2-confirm):active{background-color:color-mix(in srgb, var(--swal2-confirm-button-background-color), var(--swal2-action-button-active))}div:where(.swal2-container) button:where(.swal2-styled):where(.swal2-deny){border-radius:var(--swal2-deny-button-border-radius);background:initial;background-color:var(--swal2-deny-button-background-color);box-shadow:var(--swal2-deny-button-box-shadow);color:var(--swal2-deny-button-color);font-size:1em}div:where(.swal2-container) button:where(.swal2-styled):where(.swal2-deny):hover{background-color:color-mix(in srgb, var(--swal2-deny-button-background-color), var(--swal2-action-button-hover))}div:where(.swal2-container) button:where(.swal2-styled):where(.swal2-deny):active{background-color:color-mix(in srgb, var(--swal2-deny-button-background-color), var(--swal2-action-button-active))}div:where(.swal2-container) button:where(.swal2-styled):where(.swal2-cancel){border-radius:var(--swal2-cancel-button-border-radius);background:initial;background-color:var(--swal2-cancel-button-background-color);box-shadow:var(--swal2-cancel-button-box-shadow);color:var(--swal2-cancel-button-color);font-size:1em}div:where(.swal2-container) button:where(.swal2-styled):where(.swal2-cancel):hover{background-color:color-mix(in srgb, var(--swal2-cancel-button-background-color), var(--swal2-action-button-hover))}div:where(.swal2-container) button:where(.swal2-styled):where(.swal2-cancel):active{background-color:color-mix(in srgb, var(--swal2-cancel-button-background-color), var(--swal2-action-button-active))}div:where(.swal2-container) button:where(.swal2-styled):focus-visible{outline:none;box-shadow:var(--swal2-action-button-focus-box-shadow)}div:where(.swal2-container) button:where(.swal2-styled)[disabled]:not(.swal2-loading){opacity:.4}div:where(.swal2-container) button:where(.swal2-styled)::-moz-focus-inner{border:0}div:where(.swal2-container) div:where(.swal2-footer){margin:1em 0 0;padding:1em 1em 0;border-top:1px solid var(--swal2-footer-border-color);background:var(--swal2-footer-background);color:var(--swal2-footer-color);font-size:1em;text-align:center;cursor:initial}div:where(.swal2-container) .swal2-timer-progress-bar-container{position:absolute;right:0;bottom:0;left:0;grid-column:auto !important;overflow:hidden;border-bottom-right-radius:var(--swal2-border-radius);border-bottom-left-radius:var(--swal2-border-radius)}div:where(.swal2-container) div:where(.swal2-timer-progress-bar){width:100%;height:.25em;background:var(--swal2-timer-progress-bar-background)}div:where(.swal2-container) img:where(.swal2-image){max-width:100%;margin:2em auto 1em;cursor:initial}div:where(.swal2-container) button:where(.swal2-close){position:var(--swal2-close-button-position);inset:var(--swal2-close-button-inset);z-index:2;align-items:center;justify-content:center;width:1.2em;height:1.2em;margin-top:0;margin-right:0;margin-bottom:-1.2em;padding:0;overflow:hidden;transition:var(--swal2-close-button-transition);border:none;border-radius:var(--swal2-border-radius);outline:var(--swal2-close-button-outline);background:rgba(0,0,0,0);color:var(--swal2-close-button-color);font-family:monospace;font-size:var(--swal2-close-button-font-size);cursor:pointer;justify-self:end}div:where(.swal2-container) button:where(.swal2-close):hover{transform:var(--swal2-close-button-hover-transform);background:rgba(0,0,0,0);color:#f27474}div:where(.swal2-container) button:where(.swal2-close):focus-visible{outline:none;box-shadow:var(--swal2-close-button-focus-box-shadow)}div:where(.swal2-container) button:where(.swal2-close)::-moz-focus-inner{border:0}div:where(.swal2-container) div:where(.swal2-html-container){z-index:1;justify-content:center;margin:0;padding:var(--swal2-html-container-padding);overflow:auto;color:inherit;font-size:1.125em;font-weight:normal;line-height:normal;text-align:center;overflow-wrap:break-word;word-break:break-word;cursor:initial}div:where(.swal2-container) input:where(.swal2-input),div:where(.swal2-container) input:where(.swal2-file),div:where(.swal2-container) textarea:where(.swal2-textarea),div:where(.swal2-container) select:where(.swal2-select),div:where(.swal2-container) div:where(.swal2-radio),div:where(.swal2-container) label:where(.swal2-checkbox){margin:1em 2em 3px}div:where(.swal2-container) input:where(.swal2-input),div:where(.swal2-container) input:where(.swal2-file),div:where(.swal2-container) textarea:where(.swal2-textarea){box-sizing:border-box;width:auto;transition:var(--swal2-input-transition);border:var(--swal2-input-border);border-radius:var(--swal2-input-border-radius);background:var(--swal2-input-background);box-shadow:var(--swal2-input-box-shadow);color:inherit;font-size:1.125em}div:where(.swal2-container) input:where(.swal2-input).swal2-inputerror,div:where(.swal2-container) input:where(.swal2-file).swal2-inputerror,div:where(.swal2-container) textarea:where(.swal2-textarea).swal2-inputerror{border-color:#f27474 !important;box-shadow:0 0 2px #f27474 !important}div:where(.swal2-container) input:where(.swal2-input):hover,div:where(.swal2-container) input:where(.swal2-file):hover,div:where(.swal2-container) textarea:where(.swal2-textarea):hover{box-shadow:var(--swal2-input-hover-box-shadow)}div:where(.swal2-container) input:where(.swal2-input):focus,div:where(.swal2-container) input:where(.swal2-file):focus,div:where(.swal2-container) textarea:where(.swal2-textarea):focus{border:var(--swal2-input-focus-border);outline:none;box-shadow:var(--swal2-input-focus-box-shadow)}div:where(.swal2-container) input:where(.swal2-input)::placeholder,div:where(.swal2-container) input:where(.swal2-file)::placeholder,div:where(.swal2-container) textarea:where(.swal2-textarea)::placeholder{color:#ccc}div:where(.swal2-container) .swal2-range{margin:1em 2em 3px;background:var(--swal2-background)}div:where(.swal2-container) .swal2-range input{width:80%}div:where(.swal2-container) .swal2-range output{width:20%;color:inherit;font-weight:600;text-align:center}div:where(.swal2-container) .swal2-range input,div:where(.swal2-container) .swal2-range output{height:2.625em;padding:0;font-size:1.125em;line-height:2.625em}div:where(.swal2-container) .swal2-input{height:2.625em;padding:0 .75em}div:where(.swal2-container) .swal2-file{width:75%;margin-right:auto;margin-left:auto;background:var(--swal2-input-background);font-size:1.125em}div:where(.swal2-container) .swal2-textarea{height:6.75em;padding:.75em}div:where(.swal2-container) .swal2-select{min-width:50%;max-width:100%;padding:.375em .625em;background:var(--swal2-input-background);color:inherit;font-size:1.125em}div:where(.swal2-container) .swal2-radio,div:where(.swal2-container) .swal2-checkbox{align-items:center;justify-content:center;background:var(--swal2-background);color:inherit}div:where(.swal2-container) .swal2-radio label,div:where(.swal2-container) .swal2-checkbox label{margin:0 .6em;font-size:1.125em}div:where(.swal2-container) .swal2-radio input,div:where(.swal2-container) .swal2-checkbox input{flex-shrink:0;margin:0 .4em}div:where(.swal2-container) label:where(.swal2-input-label){display:flex;justify-content:center;margin:1em auto 0}div:where(.swal2-container) div:where(.swal2-validation-message){align-items:center;justify-content:center;margin:1em 0 0;padding:.625em;overflow:hidden;background:var(--swal2-validation-message-background);color:var(--swal2-validation-message-color);font-size:1em;font-weight:300}div:where(.swal2-container) div:where(.swal2-validation-message)::before{content:\"!\";display:inline-block;width:1.5em;min-width:1.5em;height:1.5em;margin:0 .625em;border-radius:50%;background-color:#f27474;color:#fff;font-weight:600;line-height:1.5em;text-align:center}div:where(.swal2-container) .swal2-progress-steps{flex-wrap:wrap;align-items:center;max-width:100%;margin:1.25em auto;padding:0;background:rgba(0,0,0,0);font-weight:600}div:where(.swal2-container) .swal2-progress-steps li{display:inline-block;position:relative}div:where(.swal2-container) .swal2-progress-steps .swal2-progress-step{z-index:20;flex-shrink:0;width:2em;height:2em;border-radius:2em;background:#2778c4;color:#fff;line-height:2em;text-align:center}div:where(.swal2-container) .swal2-progress-steps .swal2-progress-step.swal2-active-progress-step{background:#2778c4}div:where(.swal2-container) .swal2-progress-steps .swal2-progress-step.swal2-active-progress-step~.swal2-progress-step{background:var(--swal2-progress-step-background);color:#fff}div:where(.swal2-container) .swal2-progress-steps .swal2-progress-step.swal2-active-progress-step~.swal2-progress-step-line{background:var(--swal2-progress-step-background)}div:where(.swal2-container) .swal2-progress-steps .swal2-progress-step-line{z-index:10;flex-shrink:0;width:2.5em;height:.4em;margin:0 -1px;background:#2778c4}div:where(.swal2-icon){position:relative;box-sizing:content-box;justify-content:center;width:5em;height:5em;margin:2.5em auto .6em;zoom:var(--swal2-icon-zoom);border:.25em solid rgba(0,0,0,0);border-radius:50%;border-color:#000;font-family:inherit;line-height:5em;cursor:default;user-select:none}div:where(.swal2-icon) .swal2-icon-content{display:flex;align-items:center;font-size:3.75em}div:where(.swal2-icon).swal2-error{border-color:#f27474;color:#f27474}div:where(.swal2-icon).swal2-error .swal2-x-mark{position:relative;flex-grow:1}div:where(.swal2-icon).swal2-error [class^=swal2-x-mark-line]{display:block;position:absolute;top:2.3125em;width:2.9375em;height:.3125em;border-radius:.125em;background-color:#f27474}div:where(.swal2-icon).swal2-error [class^=swal2-x-mark-line][class$=left]{left:1.0625em;transform:rotate(45deg)}div:where(.swal2-icon).swal2-error [class^=swal2-x-mark-line][class$=right]{right:1em;transform:rotate(-45deg)}div:where(.swal2-icon).swal2-error.swal2-icon-show{animation:swal2-animate-error-icon .5s}div:where(.swal2-icon).swal2-error.swal2-icon-show .swal2-x-mark{animation:swal2-animate-error-x-mark .5s}div:where(.swal2-icon).swal2-warning{border-color:#f8bb86;color:#f8bb86}div:where(.swal2-icon).swal2-warning.swal2-icon-show{animation:swal2-animate-error-icon .5s}div:where(.swal2-icon).swal2-warning.swal2-icon-show .swal2-icon-content{animation:swal2-animate-i-mark .5s}div:where(.swal2-icon).swal2-info{border-color:#3fc3ee;color:#3fc3ee}div:where(.swal2-icon).swal2-info.swal2-icon-show{animation:swal2-animate-error-icon .5s}div:where(.swal2-icon).swal2-info.swal2-icon-show .swal2-icon-content{animation:swal2-animate-i-mark .8s}div:where(.swal2-icon).swal2-question{border-color:#87adbd;color:#87adbd}div:where(.swal2-icon).swal2-question.swal2-icon-show{animation:swal2-animate-error-icon .5s}div:where(.swal2-icon).swal2-question.swal2-icon-show .swal2-icon-content{animation:swal2-animate-question-mark .8s}div:where(.swal2-icon).swal2-success{border-color:#a5dc86;color:#a5dc86}div:where(.swal2-icon).swal2-success [class^=swal2-success-circular-line]{position:absolute;width:3.75em;height:7.5em;border-radius:50%}div:where(.swal2-icon).swal2-success [class^=swal2-success-circular-line][class$=left]{top:-0.4375em;left:-2.0635em;transform:rotate(-45deg);transform-origin:3.75em 3.75em;border-radius:7.5em 0 0 7.5em}div:where(.swal2-icon).swal2-success [class^=swal2-success-circular-line][class$=right]{top:-0.6875em;left:1.875em;transform:rotate(-45deg);transform-origin:0 3.75em;border-radius:0 7.5em 7.5em 0}div:where(.swal2-icon).swal2-success .swal2-success-ring{position:absolute;z-index:2;top:-0.25em;left:-0.25em;box-sizing:content-box;width:100%;height:100%;border:.25em solid rgba(165,220,134,.3);border-radius:50%}div:where(.swal2-icon).swal2-success .swal2-success-fix{position:absolute;z-index:1;top:.5em;left:1.625em;width:.4375em;height:5.625em;transform:rotate(-45deg)}div:where(.swal2-icon).swal2-success [class^=swal2-success-line]{display:block;position:absolute;z-index:2;height:.3125em;border-radius:.125em;background-color:#a5dc86}div:where(.swal2-icon).swal2-success [class^=swal2-success-line][class$=tip]{top:2.875em;left:.8125em;width:1.5625em;transform:rotate(45deg)}div:where(.swal2-icon).swal2-success [class^=swal2-success-line][class$=long]{top:2.375em;right:.5em;width:2.9375em;transform:rotate(-45deg)}div:where(.swal2-icon).swal2-success.swal2-icon-show .swal2-success-line-tip{animation:swal2-animate-success-line-tip .75s}div:where(.swal2-icon).swal2-success.swal2-icon-show .swal2-success-line-long{animation:swal2-animate-success-line-long .75s}div:where(.swal2-icon).swal2-success.swal2-icon-show .swal2-success-circular-line-right{animation:swal2-rotate-success-circular-line 4.25s ease-in}[class^=swal2]{-webkit-tap-highlight-color:rgba(0,0,0,0)}.swal2-show{animation:var(--swal2-show-animation)}.swal2-hide{animation:var(--swal2-hide-animation)}.swal2-noanimation{transition:none}.swal2-scrollbar-measure{position:absolute;top:-9999px;width:50px;height:50px;overflow:scroll}.swal2-rtl .swal2-close{margin-right:initial;margin-left:0}.swal2-rtl .swal2-timer-progress-bar{right:0;left:auto}.swal2-toast{box-sizing:border-box;grid-column:1/4 !important;grid-row:1/4 !important;grid-template-columns:min-content auto min-content;padding:1em;overflow-y:hidden;border:var(--swal2-toast-border);background:var(--swal2-background);box-shadow:var(--swal2-toast-box-shadow);pointer-events:auto}.swal2-toast>*{grid-column:2}.swal2-toast h2:where(.swal2-title){margin:.5em 1em;padding:0;font-size:1em;text-align:initial}.swal2-toast .swal2-loading{justify-content:center}.swal2-toast input:where(.swal2-input){height:2em;margin:.5em;font-size:1em}.swal2-toast .swal2-validation-message{font-size:1em}.swal2-toast div:where(.swal2-footer){margin:.5em 0 0;padding:.5em 0 0;font-size:.8em}.swal2-toast button:where(.swal2-close){grid-column:3/3;grid-row:1/99;align-self:center;width:.8em;height:.8em;margin:0;font-size:2em}.swal2-toast div:where(.swal2-html-container){margin:.5em 1em;padding:0;overflow:initial;font-size:1em;text-align:initial}.swal2-toast div:where(.swal2-html-container):empty{padding:0}.swal2-toast .swal2-loader{grid-column:1;grid-row:1/99;align-self:center;width:2em;height:2em;margin:.25em}.swal2-toast .swal2-icon{grid-column:1;grid-row:1/99;align-self:center;width:2em;min-width:2em;height:2em;margin:0 .5em 0 0}.swal2-toast .swal2-icon .swal2-icon-content{display:flex;align-items:center;font-size:1.8em;font-weight:bold}.swal2-toast .swal2-icon.swal2-success .swal2-success-ring{width:2em;height:2em}.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line]{top:.875em;width:1.375em}.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=left]{left:.3125em}.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=right]{right:.3125em}.swal2-toast div:where(.swal2-actions){justify-content:flex-start;height:auto;margin:0;margin-top:.5em;padding:0 .5em}.swal2-toast button:where(.swal2-styled){margin:.25em .5em;padding:.4em .6em;font-size:1em}.swal2-toast .swal2-success{border-color:#a5dc86}.swal2-toast .swal2-success [class^=swal2-success-circular-line]{position:absolute;width:1.6em;height:3em;border-radius:50%}.swal2-toast .swal2-success [class^=swal2-success-circular-line][class$=left]{top:-0.8em;left:-0.5em;transform:rotate(-45deg);transform-origin:2em 2em;border-radius:4em 0 0 4em}.swal2-toast .swal2-success [class^=swal2-success-circular-line][class$=right]{top:-0.25em;left:.9375em;transform-origin:0 1.5em;border-radius:0 4em 4em 0}.swal2-toast .swal2-success .swal2-success-ring{width:2em;height:2em}.swal2-toast .swal2-success .swal2-success-fix{top:0;left:.4375em;width:.4375em;height:2.6875em}.swal2-toast .swal2-success [class^=swal2-success-line]{height:.3125em}.swal2-toast .swal2-success [class^=swal2-success-line][class$=tip]{top:1.125em;left:.1875em;width:.75em}.swal2-toast .swal2-success [class^=swal2-success-line][class$=long]{top:.9375em;right:.1875em;width:1.375em}.swal2-toast .swal2-success.swal2-icon-show .swal2-success-line-tip{animation:swal2-toast-animate-success-line-tip .75s}.swal2-toast .swal2-success.swal2-icon-show .swal2-success-line-long{animation:swal2-toast-animate-success-line-long .75s}.swal2-toast.swal2-show{animation:var(--swal2-toast-show-animation)}.swal2-toast.swal2-hide{animation:var(--swal2-toast-hide-animation)}@keyframes swal2-show{0%{transform:translate3d(0, -50px, 0) scale(0.9);opacity:0}100%{transform:translate3d(0, 0, 0) scale(1);opacity:1}}@keyframes swal2-hide{0%{transform:translate3d(0, 0, 0) scale(1);opacity:1}100%{transform:translate3d(0, -50px, 0) scale(0.9);opacity:0}}@keyframes swal2-animate-success-line-tip{0%{top:1.1875em;left:.0625em;width:0}54%{top:1.0625em;left:.125em;width:0}70%{top:2.1875em;left:-0.375em;width:3.125em}84%{top:3em;left:1.3125em;width:1.0625em}100%{top:2.8125em;left:.8125em;width:1.5625em}}@keyframes swal2-animate-success-line-long{0%{top:3.375em;right:2.875em;width:0}65%{top:3.375em;right:2.875em;width:0}84%{top:2.1875em;right:0;width:3.4375em}100%{top:2.375em;right:.5em;width:2.9375em}}@keyframes swal2-rotate-success-circular-line{0%{transform:rotate(-45deg)}5%{transform:rotate(-45deg)}12%{transform:rotate(-405deg)}100%{transform:rotate(-405deg)}}@keyframes swal2-animate-error-x-mark{0%{margin-top:1.625em;transform:scale(0.4);opacity:0}50%{margin-top:1.625em;transform:scale(0.4);opacity:0}80%{margin-top:-0.375em;transform:scale(1.15)}100%{margin-top:0;transform:scale(1);opacity:1}}@keyframes swal2-animate-error-icon{0%{transform:rotateX(100deg);opacity:0}100%{transform:rotateX(0deg);opacity:1}}@keyframes swal2-rotate-loading{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}@keyframes swal2-animate-question-mark{0%{transform:rotateY(-360deg)}100%{transform:rotateY(0)}}@keyframes swal2-animate-i-mark{0%{transform:rotateZ(45deg);opacity:0}25%{transform:rotateZ(-25deg);opacity:.4}50%{transform:rotateZ(15deg);opacity:.8}75%{transform:rotateZ(-5deg);opacity:1}100%{transform:rotateX(0);opacity:1}}@keyframes swal2-toast-show{0%{transform:translateY(-0.625em) rotateZ(2deg)}33%{transform:translateY(0) rotateZ(-2deg)}66%{transform:translateY(0.3125em) rotateZ(2deg)}100%{transform:translateY(0) rotateZ(0deg)}}@keyframes swal2-toast-hide{100%{transform:rotateZ(1deg);opacity:0}}@keyframes swal2-toast-animate-success-line-tip{0%{top:.5625em;left:.0625em;width:0}54%{top:.125em;left:.125em;width:0}70%{top:.625em;left:-0.25em;width:1.625em}84%{top:1.0625em;left:.75em;width:.5em}100%{top:1.125em;left:.1875em;width:.75em}}@keyframes swal2-toast-animate-success-line-long{0%{top:1.625em;right:1.375em;width:0}65%{top:1.25em;right:.9375em;width:0}84%{top:.9375em;right:0;width:1.125em}100%{top:.9375em;right:.1875em;width:1.375em}}");

/***/ },

/***/ "../../helper/dforms/getForm.ts"
/*!**************************************!*\
  !*** ../../helper/dforms/getForm.ts ***!
  \**************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getForm = getForm;
const performHttpRequest_1 = __webpack_require__(/*! ../performHttpRequest/performHttpRequest */ "../../helper/performHttpRequest/performHttpRequest.ts");
/**
 * Fetches a form by its ID from the d.velop forms API.
 *
 * @param baseUri - The base URI of the d.velop API.
 * @param token - The authorization token to access the API.
 * @param formId - The unique identifier of the form to retrieve.
 * @returns A promise that resolves to an `ApiResponse` containing the form data of type `GetForm`.
 */
async function getForm(baseUri, token, formId) {
    const url = `${baseUri}/dforms/api/forms/${formId}`;
    const headers = new Headers({
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
    });
    const options = {
        method: "GET",
        headers,
    };
    const response = await (0, performHttpRequest_1.performHttpRequest)(url, options);
    if (typeof response.body.definition === "string") {
        response.body.definition = JSON.parse(response.body.definition);
    }
    return response;
}


/***/ },

/***/ "../../helper/dforms/newVersion.ts"
/*!*****************************************!*\
  !*** ../../helper/dforms/newVersion.ts ***!
  \*****************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.newVersion = newVersion;
const performHttpRequest_1 = __webpack_require__(/*! ../performHttpRequest/performHttpRequest */ "../../helper/performHttpRequest/performHttpRequest.ts");
/**
 * Creates a new version of an existing form by sending a POST request to the specified API endpoint.
 *
 * @param baseUri - The base URI of the API.
 * @param token - The authorization token to access the API.
 * @param formId - The unique identifier of the form for which a new version is created.
 * @returns A promise that resolves to the API response containing the new version data.
 */
async function newVersion(baseUri, token, formId) {
    const url = `${baseUri}/dforms/api/forms/${formId}/versions`;
    const headers = {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
    };
    const options = {
        method: "POST",
        headers,
        body: JSON.stringify({}),
    };
    return await (0, performHttpRequest_1.performHttpRequest)(url, options);
}


/***/ },

/***/ "../../helper/dforms/patchForm.ts"
/*!****************************************!*\
  !*** ../../helper/dforms/patchForm.ts ***!
  \****************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.patchForm = patchForm;
const performHttpRequest_1 = __webpack_require__(/*! ../performHttpRequest/performHttpRequest */ "../../helper/performHttpRequest/performHttpRequest.ts");
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
        "Content-Type": "application/json",
    };
    const body = {
        id: formId,
        name: name,
        definition: JSON.stringify(definition)
    };
    const options = {
        method: "PUT",
        headers,
        body: JSON.stringify(body),
    };
    return await (0, performHttpRequest_1.performHttpRequest)(url, options);
}


/***/ },

/***/ "../../helper/performHttpRequest/performHttpRequest.ts"
/*!*************************************************************!*\
  !*** ../../helper/performHttpRequest/performHttpRequest.ts ***!
  \*************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

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

/***/ "../../helper/processstudio/createForm.ts"
/*!************************************************!*\
  !*** ../../helper/processstudio/createForm.ts ***!
  \************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createForm = createForm;
const performHttpRequest_1 = __webpack_require__(/*! ../performHttpRequest/performHttpRequest */ "../../helper/performHttpRequest/performHttpRequest.ts");
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
        "Content-Type": "application/json",
    };
    const now = new Date().toISOString();
    const body = {
        form: {
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
                view: { href: `/dforms/ui/forms/${formId}/view` },
            },
        },
    };
    const options = {
        method: "POST",
        headers,
        body: JSON.stringify(body),
    };
    return await (0, performHttpRequest_1.performHttpRequest)(url, options);
}


/***/ },

/***/ "../../helper/processstudio/getAllForms.ts"
/*!*************************************************!*\
  !*** ../../helper/processstudio/getAllForms.ts ***!
  \*************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getAllForms = getAllForms;
const performHttpRequest_1 = __webpack_require__(/*! ../performHttpRequest/performHttpRequest */ "../../helper/performHttpRequest/performHttpRequest.ts");
async function getAllForms(baseUri, token) {
    const url = `${baseUri}/processstudio/components/form`;
    const headers = {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
    };
    const options = {
        method: "GET",
        headers,
        // Ohne dies liefert der Browser bei wiederholten GETs auf dieselbe URL
        // innerhalb der Session teils eine gecachte Antwort zurück - sichtbar z.B.
        // in der Toolbox, deren loadedTools-Grid dann bereits gelöschte Formulare
        // weiterhin als "vorhanden" anzeigt, obwohl sie in dforms nicht mehr
        // existieren. Diese Liste muss immer den aktuellen Stand widerspiegeln.
        cache: "no-store",
    };
    return await (0, performHttpRequest_1.performHttpRequest)(url, options);
}


/***/ },

/***/ "../../helper/scripting/createScript.ts"
/*!**********************************************!*\
  !*** ../../helper/scripting/createScript.ts ***!
  \**********************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createScript = createScript;
const performHttpRequest_1 = __webpack_require__(/*! ../performHttpRequest/performHttpRequest */ "../../helper/performHttpRequest/performHttpRequest.ts");
async function createScript(baseUri, token, name) {
    const url = `${baseUri}/scripting/script`;
    const headers = {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
    };
    const body = {
        name: name
    };
    const options = {
        method: "POST",
        headers,
        body: JSON.stringify(body),
    };
    return await (0, performHttpRequest_1.performHttpRequest)(url, options);
}


/***/ },

/***/ "../../helper/scripting/getAllScripts.ts"
/*!***********************************************!*\
  !*** ../../helper/scripting/getAllScripts.ts ***!
  \***********************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

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

"use strict";

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

/***/ "../../helper/scripting/patchScript.ts"
/*!*********************************************!*\
  !*** ../../helper/scripting/patchScript.ts ***!
  \*********************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

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

/***/ "../../helper/utils/logger.ts"
/*!************************************!*\
  !*** ../../helper/utils/logger.ts ***!
  \************************************/
(__unused_webpack_module, exports) {

"use strict";

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

/***/ "./src/config/publicBundleRepo.ts"
/*!****************************************!*\
  !*** ./src/config/publicBundleRepo.ts ***!
  \****************************************/
(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PUBLIC_BUNDLE_REPO_BASE_URL = void 0;
// Öffentliches Artefakt-Repo, in das eine GitHub Action bei jedem Push auf main
// (siehe .github/workflows/publish-bundles.yml) die gebauten Bundles der einzelnen
// Content-Formular-Projekte kopiert. Öffentlich und ohne Auth abrufbar, deshalb kann
// sowohl der Browser (form.ts) als auch ein Node-Kontext (deployProjectForm.ts) den
// aktuellen Stand direkt per HTTP laden.
// TODO: Owner/Repo/Branch anpassen, falls sich das Artefakt-Repo ändert.
exports.PUBLIC_BUNDLE_REPO_BASE_URL = "https://raw.githubusercontent.com/FOM-MaximilianEllinger/dvelop-codebase-bundles/main";


/***/ },

/***/ "./src/config/targetForms.ts"
/*!***********************************!*\
  !*** ./src/config/targetForms.ts ***!
  \***********************************/
(__unused_webpack_module, exports) {

"use strict";

// AUTO-GENERIERT von projects/Toolbox/generateTargetForms.js - NICHT VON HAND
// BEARBEITEN, jeder "npm run build"/"npm run watch" überschreibt diese Datei.
// Trotzdem mit committet (nicht in .gitignore), damit der Editor/tsc sie auch
// in einem frischen Checkout sofort findet, bevor irgendwer lokal gebaut hat -
// ein veralteter committeter Stand ist unkritisch, da jeder Build (auch in CI)
// sie ohnehin zuerst neu erzeugt.
// Erfasst automatisch jeden projects/Toolbox_*-Ordner (außer Toolbox_Template*)
// als Tool. Anzeigename/Beschreibung optional über <projekt>/toolbox.meta.json
// ({"name": "...", "description": "...", "type": "form"|"script"|"combined"})
// anpassen, sonst wird Name/Beschreibung aus dem Ordnernamen abgeleitet und
// "form" angenommen. Formular-GUID (type "form"/"combined") wird deterministisch
// aus dem Ordnernamen abgeleitet (siehe generateTargetForms.js), außer für
// Tools in dessen PINNED_FORM_IDS. "script"/"combined" bringen ein oder mehrere
// Scripts mit (je Datei in src/scripts/, optional beschrieben unter "scripts"
// in toolbox.meta.json - inkl. eigener customerVariables pro Script). Alle
// Bestandteile eines Werkzeugs werden als EIN Toolbox-Eintrag gemeinsam
// ausgerollt, einzelne Bestandteile lassen sich aber auch separat anlegen/aktualisieren (siehe rolloutParts in src/forms/form.ts).
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.targetForms = void 0;
// Kuratierte Liste der nachladbaren Werkzeuge (Formulare und Scripts) -
// generiert, siehe oben.
exports.targetForms = [
    {
        type: "form",
        id: "businesObjectsEditor",
        name: "Business Objects Editor",
        description: "Verwaltet Business-Objects-Modelle und deren Einträge (Anlegen, Bearbeiten, Löschen) direkt im Browser.",
        formId: "cb60481f-c364-4d82-9965-9ce3f25400e4",
        bundlePath: "businesObjectsEditor/formBundle.js",
    },
    {
        type: "form",
        id: "downloadBatchDocuments",
        name: "Stapel-Download",
        description: "Listet alle Stapel der Eingangsverarbeitung (Inbound) auf und lädt alle Dokumente eines Stapels als eine zusammengeführte PDF-Datei herunter.",
        formId: "393a772c-d2db-5463-9708-488bce1ca6e9",
        bundlePath: "downloadBatchDocuments/formBundle.js",
        formDefinitionPath: "downloadBatchDocuments/form.json",
    },
    {
        type: "form",
        id: "processAdministration",
        name: "Prozess-Administration",
        description: "Verwaltet die Prozesse in der Systemumgebung.",
        formId: "2c3e00b6-8e00-4a27-9a9e-2b5dee133ca7",
        bundlePath: "processAdministration/formBundle.js",
        formDefinitionPath: "processAdministration/form.json",
    },
    {
        type: "combined",
        id: "userLicenceCounter",
        name: "User-Lizenz-Zähler",
        description: "Zählt die lizenzrelevanten Benutzer (ohne technischen Benutzer und @gws.ms-Adressen) und liefert eine HTML-Tabelle mit den Details.",
        formId: "ce3a0bac-79fd-5080-8742-819797a25f19",
        bundlePath: "userLicenceCounter/formBundle.js",
        formDefinitionPath: "userLicenceCounter/form.json",
        scripts: [
            {
                name: "User-Lizenz-Zähler",
                description: "Zählt die lizenzrelevanten Benutzer (ohne technischen Benutzer und @gws.ms-Adressen) und liefert eine HTML-Tabelle mit den Details.",
                bundlePath: "userLicenceCounter/scripts/script.js",
                customerVariables: [{ "key": "baseUri", "label": "Base-URI", "encrypted": false, "description": "Adresse des Mandanten, gegen den das Script die Benutzer abfragt.", "default": "{origin}" }, { "key": "apiKey", "label": "API-Key", "encrypted": true, "description": "API-Key eines Benutzers mit Leserechten auf die Benutzerverwaltung." }],
            },
        ],
    },
];


/***/ },

/***/ "./src/forms/form.ts"
/*!***************************!*\
  !*** ./src/forms/form.ts ***!
  \***************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const getForm_1 = __webpack_require__(/*! ../../../../helper/dforms/getForm */ "../../helper/dforms/getForm.ts");
const createForm_1 = __webpack_require__(/*! ../../../../helper/processstudio/createForm */ "../../helper/processstudio/createForm.ts");
const getAllForms_1 = __webpack_require__(/*! ../../../../helper/processstudio/getAllForms */ "../../helper/processstudio/getAllForms.ts");
const patchForm_1 = __webpack_require__(/*! ../../../../helper/dforms/patchForm */ "../../helper/dforms/patchForm.ts");
const newVersion_1 = __webpack_require__(/*! ../../../../helper/dforms/newVersion */ "../../helper/dforms/newVersion.ts");
const getAllScripts_1 = __webpack_require__(/*! ../../../../helper/scripting/getAllScripts */ "../../helper/scripting/getAllScripts.ts");
const createScript_1 = __webpack_require__(/*! ../../../../helper/scripting/createScript */ "../../helper/scripting/createScript.ts");
const getScriptVersion_1 = __webpack_require__(/*! ../../../../helper/scripting/getScriptVersion */ "../../helper/scripting/getScriptVersion.ts");
const patchScript_1 = __webpack_require__(/*! ../../../../helper/scripting/patchScript */ "../../helper/scripting/patchScript.ts");
const logger_1 = __webpack_require__(/*! ../../../../helper/utils/logger */ "../../helper/utils/logger.ts");
const targetForms_1 = __webpack_require__(/*! ../config/targetForms */ "./src/config/targetForms.ts");
const publicBundleRepo_1 = __webpack_require__(/*! ../config/publicBundleRepo */ "./src/config/publicBundleRepo.ts");
const sweetalert2_1 = __importDefault(__webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.all.js"));
const logger = (0, logger_1.initLogger)(logger_1.LogLevel.DEBUG, true);
function getErrorMessage(error) {
    return error instanceof Error ? error.message : String(error);
}
async function showSuccessAlert(title, text) {
    await sweetalert2_1.default.fire({ icon: "success", title, text, confirmButtonText: "OK" });
}
async function showErrorAlert(title, error) {
    await sweetalert2_1.default.fire({ icon: "error", title, text: getErrorMessage(error), confirmButtonText: "OK" });
}
const TOOLBOX_FORM_ID = "1216ed4f-1d27-491b-b974-150d847f0c2d";
const TOOLBOX_FORM_NAME = "Toolbox";
// Pfad des eigenen Bundles im öffentlichen Artefakt-Repo (wird von
// .github/workflows/publish-bundles.yml dorthin veröffentlicht).
const TOOLBOX_BUNDLE_PATH = "toolbox/formBundle.js";
// Eigener Versionszähler, gepflegt im Sourcecode (nicht auf dem Server
// abgeleitet): bei jeder Änderung, die über die Toolbox-Aktualisierung
// ausgerollt werden soll, hier um 1 erhöhen. So bleibt die Versionsnummer
// unabhängig vom Stand auf der jeweiligen Umgebung korrekt, auch wenn dort
// noch eine ältere Version liegt.
const TOOLBOX_VERSION_COUNTER = 47;
// Alle dforms-Aufrufe laufen über die aktuelle Browser-Session: Bei fetch() an
// dieselbe Origin (window.location.origin) schickt der Browser automatisch das
// Session-Cookie mit, ein manuell eingegebener API-Key ist dafür nicht mehr nötig.
// Die Helper (getForm/createForm/patchForm) erwarten trotzdem einen Token-Parameter
// für den Authorization-Header – der bleibt hier bewusst leer.
const NO_TOKEN = "";
// webpack.form.config.js baut mit mode: "development" (kein Minify), daher
// taucht der Konstantenname im veröffentlichten Bundle unverändert als
// "TOOLBOX_VERSION_COUNTER = <Zahl>;" auf. Das erlaubt es, die im GitHub-Repo
// veröffentlichte Version zu ermitteln, ohne eine eigene Versionsdatei pflegen
// zu müssen.
const VERSION_COUNTER_PATTERN = /TOOLBOX_VERSION_COUNTER\s*=\s*(\d+)/;
// Analog zu VERSION_COUNTER_PATTERN, aber für die Werkzeuge: deren
// Versionszähler heißt in JEDEM Tool-Projekt einheitlich "VERSION_COUNTER"
// (siehe generateTargetForms.js).
const TOOL_VERSION_COUNTER_PATTERN = /VERSION_COUNTER\s*=\s*(\d+)/;
// ---------------------------------------------------------------------------
// Oberfläche
//
// Die komplette Toolbox-Oberfläche (Kopf mit Toolbox-Aktualisierung,
// Werkzeugauswahl mit "Erstellen", Liste der installierten Werkzeuge mit
// "Öffnen"/"Aktualisieren") wird von diesem Skript selbst als HTML in EINE
// HTML-Element-Komponente mit dem Key "content" gerendert. Im Process Studio
// Formular-Editor braucht es dafür nur diese eine (leere) Komponente - keine
// Select-/Button-Komponenten und keine Custom Actions mehr. "Refresh On
// Change" dort NICHT aktivieren; falls Formio die Komponente trotzdem neu
// zeichnet, hängt sich mountToolbox über das "render"-Event automatisch
// wieder ein.
// ---------------------------------------------------------------------------
const contentKey = "content";
// Zuletzt gerenderte Wurzel der Oberfläche - dient zur Erkennung, ob Formio
// die Komponente neu gezeichnet (und unseren Inhalt damit entfernt) hat.
let mountedRoot;
// Zuletzt ermittelte, noch nicht angelegte Werkzeuge (Inhalt der Auswahl).
let availableTargets = [];
function escapeHtml(value) {
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}
function hasFormPart(target) {
    return target.type !== "script";
}
function scriptsOf(target) {
    return target.type === "form" ? [] : target.scripts;
}
function toolParts(target) {
    const parts = hasFormPart(target) ? [{ kind: "form", key: "form" }] : [];
    scriptsOf(target).forEach((script, index) => parts.push({ kind: "script", key: `script-${index}`, script }));
    return parts;
}
// Beschriftung einer Statuszeile. Der Script-Name wird angezeigt, sobald er
// zur Unterscheidung nötig ist (mehrere Scripts oder abweichend vom
// Werkzeugnamen); zum Formular gehörende Scripts werden mit "↳" eingerückt.
function partLabel(target, part) {
    if (part.kind === "form")
        return "Formular";
    const prefix = target.type === "combined" ? "↳ " : "";
    const showName = scriptsOf(target).length > 1 || part.script.name !== target.name;
    return `${prefix}Script${showName ? `: ${escapeHtml(part.script.name)}` : ""}`;
}
// Erfolgsmeldung, die nennt, was tatsächlich ausgerollt wurde - z.B.
// "Formular und 2 Scripts von "X" wurden angelegt." bzw. bei einem einzelnen
// Bestandteil 'Script "Y" von "X" wurde aktualisiert.'
function describeRollout(target, parts, verb) {
    if (parts.length < toolParts(target).length) {
        const names = parts.map((p) => (p.kind === "form" ? "Formular" : `Script "${p.script.name}"`));
        return `${names.join(" und ")} von "${target.name}" wurde${parts.length > 1 ? "n" : ""} ${verb}.`;
    }
    const scriptCount = scriptsOf(target).length;
    const labels = [
        hasFormPart(target) ? "Formular" : "",
        scriptCount === 1 ? "Script" : scriptCount > 1 ? `${scriptCount} Scripts` : "",
    ].filter((p) => p !== "");
    if (labels.length === 1 && scriptCount <= 1)
        return `"${target.name}" wurde ${verb}.`;
    return `${labels.join(" und ")} von "${target.name}" wurden ${verb}.`;
}
function resolveDefault(spec) {
    return (spec.default ?? "").replace(/\{origin\}/g, window.location.origin);
}
// Fragt die customerVariables der übergebenen Scripts in EINEM Swal-Dialog
// ab - gruppiert nach Script, da jedes Script eigene Werte hat. Liefert
// undefined, wenn der Dialog abgebrochen wurde.
async function promptCustomerVariables(target, scripts) {
    const groups = scripts
        .map((script, scriptIndex) => {
        const fields = script.customerVariables
            .map((spec, varIndex) => `
<div class="tbx-cv-field">
  <label class="tbx-cv-label" for="tbx-cv-${scriptIndex}-${varIndex}">${escapeHtml(spec.label)}</label>
  <input id="tbx-cv-${scriptIndex}-${varIndex}" class="swal2-input tbx-cv-input" type="${spec.encrypted ? "password" : "text"}"
    autocomplete="${spec.encrypted ? "new-password" : "off"}" value="${escapeHtml(resolveDefault(spec))}">
  ${spec.description ? `<div class="tbx-cv-desc">${escapeHtml(spec.description)}</div>` : ""}
</div>`)
            .join("");
        return `
<fieldset class="tbx-cv-group">
  <legend class="tbx-cv-legend">Script: ${escapeHtml(script.name)}</legend>
  ${fields}
</fieldset>`;
    })
        .join("");
    const result = await sweetalert2_1.default.fire({
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
            const values = new Map();
            for (const [scriptIndex, script] of scripts.entries()) {
                const scriptValues = [];
                for (const [varIndex, spec] of script.customerVariables.entries()) {
                    const input = document.getElementById(`tbx-cv-${scriptIndex}-${varIndex}`);
                    const value = input?.value.trim() ?? "";
                    if (value === "") {
                        sweetalert2_1.default.showValidationMessage(`Bitte "${spec.label}" für Script "${script.name}" angeben.`);
                        return false;
                    }
                    scriptValues.push({ key: spec.key, value, encrypted: spec.encrypted });
                }
                values.set(script.name, scriptValues);
            }
            return values;
        },
    });
    return result.isConfirmed ? result.value : undefined;
}
// Einheitliche Gestaltung: jeder Bereich hat dieselbe Kopfzeile (Titel links,
// Aktionen rechts), alle Buttons sind "btn-sm" - Hauptaktion "btn-primary",
// Nebenaktion "btn-outline-secondary" -, jedes Werkzeug (auch die Vorschau in
// "Werkzeug hinzufügen") wird als dieselbe Karte dargestellt, und Versionsstände
// (Toolbox wie Werkzeuge) nutzen dieselbe Statuszeile.
const toolboxStyles = `
<style>
  .tbx-root { display: flex; flex-direction: column; gap: 16px; }
  .tbx-section { border: 1px solid #dee2e6; border-radius: 6px; background: #fff; }
  .tbx-section-header { display: flex; justify-content: space-between; align-items: center; gap: 12px; flex-wrap: wrap; padding: 8px 12px; border-bottom: 1px solid #dee2e6; background: #f8f9fa; border-radius: 6px 6px 0 0; }
  .tbx-section-title { font-weight: 600; font-size: 1.05em; }
  .tbx-section-body { padding: 12px; display: flex; flex-direction: column; gap: 10px; }
  .tbx-actions { display: flex; gap: 6px; flex-shrink: 0; }
  .tbx-empty { color: #6c757d; font-style: italic; }
  .tbx-tool { border: 1px solid #dee2e6; border-radius: 6px; padding: 10px 12px; background: #fff; }
  .tbx-tool-header { display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; flex-wrap: wrap; }
  .tbx-tool-name { font-weight: 600; font-size: 1.05em; }
  .tbx-tool-desc { color: #6c757d; font-size: 0.9em; margin-top: 4px; }
  .tbx-badge { display: inline-block; font-size: 0.75em; font-weight: 600; padding: 2px 7px; border-radius: 10px; margin-left: 6px; vertical-align: middle; }
  .tbx-badge-form { background: #e7f1ff; color: #0b5ed7; }
  .tbx-badge-script { background: #fff3cd; color: #997404; }
  .tbx-badge-link { color: #6c757d; font-size: 0.8em; margin-left: 4px; vertical-align: middle; }
  .tbx-parts { list-style: none; margin: 8px 0 0; padding: 0; font-size: 0.9em; }
  .tbx-section-body > .tbx-parts { margin-top: 0; }
  .tbx-parts li { padding: 3px 0; display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
  .tbx-parts-combined { border-left: 3px solid #adb5bd; padding-left: 10px; }
  .tbx-part-label { display: inline-block; min-width: 80px; font-weight: 600; }
  .tbx-part-status { flex: 1 1 auto; }
  .tbx-hint { color: #6c757d; font-size: 0.85em; margin-top: 6px; }
  .tbx-status-ok { color: #198754; }
  .tbx-status-outdated { color: #b35c00; }
  .tbx-status-unknown { color: #6c757d; }
  .tbx-status-error { color: #dc3545; }
</style>`;
const CHECKING_LABEL = "Prüfe…";
function renderButton(action, label, variant, options = {}) {
    const css = variant === "primary" ? "btn-primary" : "btn-outline-secondary";
    const toolId = options.toolId ? ` data-tool-id="${escapeHtml(options.toolId)}"` : "";
    const partKey = options.partKey ? ` data-part-key="${escapeHtml(options.partKey)}"` : "";
    return `<button type="button" class="btn btn-sm ${css}" data-action="${action}"${toolId}${partKey}${options.disabled ? " disabled" : ""}>${label}</button>`;
}
function renderSection(title, actions, regionName, body) {
    return `
  <div class="tbx-section">
    <div class="tbx-section-header">
      <span class="tbx-section-title">${title}</span>
      <div class="tbx-actions">${actions}</div>
    </div>
    <div class="tbx-section-body" data-region="${regionName}">${body}</div>
  </div>`;
}
function renderStatusLine(label, statusRole, statusText = "wird geprüft…", button = "") {
    return `<li data-part="${statusRole}"><span class="tbx-part-label">${label}</span><span class="tbx-part-status tbx-status-unknown">${statusText}</span>${button}</li>`;
}
// Einzel-Buttons pro Bestandteil nur, wenn es mehr als einen gibt - sonst
// macht der Button in der Kopfzeile der Karte bereits genau dasselbe.
function hasSeveralParts(target) {
    return toolParts(target).length > 1;
}
function renderShell() {
    const loading = `<div class="tbx-empty">Werkzeuge werden geladen…</div>`;
    return `${toolboxStyles}
<div class="tbx-root" data-tbx-root>
  ${renderSection("Toolbox", renderButton("update-toolbox", CHECKING_LABEL, "primary", { disabled: true }), "toolbox", `<ul class="tbx-parts">${renderStatusLine("Formular", "toolbox")}</ul>`)}
  ${renderSection("Werkzeug hinzufügen", renderButton("create", "Erstellen", "primary", { disabled: true }), "available", loading)}
  ${renderSection("Installierte Werkzeuge", "", "loaded", loading)}
</div>`;
}
function renderToolBadges(target) {
    const form = `<span class="tbx-badge tbx-badge-form">Formular</span>`;
    const scriptCount = scriptsOf(target).length;
    const script = `<span class="tbx-badge tbx-badge-script">${scriptCount > 1 ? `${scriptCount} Scripts` : "Script"}</span>`;
    if (target.type === "combined")
        return `${form}<span class="tbx-badge-link">+</span>${script}`;
    return target.type === "form" ? form : script;
}
// Gemeinsame Werkzeug-Karte für die Vorschau in "Werkzeug hinzufügen" und die
// Liste "Installierte Werkzeuge" - nur Aktionen, Statuszeilen und Hinweis
// unterscheiden sich.
function renderToolCard(target, options) {
    const combined = target.type === "combined";
    return `
<div class="tbx-tool" data-tool-id="${escapeHtml(target.id)}">
  <div class="tbx-tool-header">
    <div>
      <span class="tbx-tool-name">${escapeHtml(target.name)}</span>${renderToolBadges(target)}
      ${target.description ? `<div class="tbx-tool-desc">${escapeHtml(target.description)}</div>` : ""}
    </div>
    ${options.actions ? `<div class="tbx-actions">${options.actions}</div>` : ""}
  </div>
  ${options.parts ? `<ul class="tbx-parts${combined ? " tbx-parts-combined" : ""}">${options.parts}</ul>` : ""}
  ${options.hint ? `<div class="tbx-hint">${options.hint}</div>` : ""}
</div>`;
}
function renderAvailableTools(targets) {
    if (targets.length === 0) {
        return `<div class="tbx-empty">Alle verfügbaren Werkzeuge sind bereits installiert.</div>`;
    }
    const options = targets
        .map((t) => `<option value="${escapeHtml(t.id)}">${escapeHtml(t.name)}</option>`)
        .join("");
    return `
<select class="form-control form-control-sm" data-role="tool-select">${options}</select>
<div data-role="tool-details">${renderSelectedToolDetails(targets[0])}</div>`;
}
// Vorschau in "Werkzeug hinzufügen": dieselbe Karte wie bei den installierten
// Werkzeugen, statt Versionsständen zeigt jede Zeile, welche Werte beim
// Anlegen für das jeweilige Script abgefragt werden. "Erstellen" in der
// Kopfzeile legt alles an, bei mehreren Bestandteilen kann jeder auch
// einzeln angelegt werden.
function renderSelectedToolDetails(target) {
    if (!target)
        return "";
    const several = hasSeveralParts(target);
    const parts = toolParts(target)
        .map((part) => {
        const specs = part.kind === "script" ? part.script.customerVariables : [];
        const info = specs.length > 0
            ? `fragt beim Anlegen ab: ${specs.map((s) => escapeHtml(s.label)).join(", ")}`
            : "keine Eingaben nötig";
        const button = several
            ? renderButton("part", "Anlegen", "secondary", { toolId: target.id, partKey: part.key })
            : "";
        return renderStatusLine(partLabel(target, part), part.key, info, button);
    })
        .join("");
    return renderToolCard(target, {
        parts: target.type === "form" ? undefined : parts,
        hint: several ? "„Erstellen“ legt alle Bestandteile an, einzelne lassen sich über „Anlegen“ separat anlegen." : undefined,
    });
}
// Karte eines installierten Werkzeugs: der Button in der Kopfzeile
// aktualisiert alle Bestandteile (fehlende werden dabei angelegt), bei
// mehreren Bestandteilen hat zusätzlich jede Statuszeile ihren eigenen
// Button zum Anlegen/Aktualisieren nur dieses Bestandteils.
function renderLoadedTool(target) {
    const several = hasSeveralParts(target);
    const actions = [
        hasFormPart(target) ? renderButton("open", "Öffnen", "secondary", { toolId: target.id }) : "",
        renderButton("update", CHECKING_LABEL, "primary", { toolId: target.id, disabled: true }),
    ].join("");
    const parts = toolParts(target)
        .map((part) => renderStatusLine(partLabel(target, part), part.key, undefined, several ? renderButton("part", CHECKING_LABEL, "secondary", { toolId: target.id, partKey: part.key, disabled: true }) : ""))
        .join("");
    return renderToolCard(target, { actions, parts });
}
function renderLoadedTools(loadedTargets) {
    if (loadedTargets.length === 0) {
        return `<div class="tbx-empty">Noch keine Werkzeuge installiert.</div>`;
    }
    return loadedTargets.map(renderLoadedTool).join("");
}
// Setzt Statuszeile (Text + Farbe) und den zugehörigen Aktualisieren-Button
// einheitlich für Toolbox und Werkzeuge.
function applyStatus(statusElement, status) {
    if (!statusElement)
        return;
    const { text, css } = describePartStatus(status);
    statusElement.textContent = text;
    statusElement.className = `tbx-part-status ${css}`;
}
// Button für ein Werkzeug bzw. die Toolbox als Ganzes. Bei mehreren
// Bestandteilen heißt er "Alle aktualisieren" (fehlende Bestandteile werden
// dabei mit angelegt), sonst trägt er die neue Versionsnummer.
function applyUpdateButton(button, statuses) {
    if (!button)
        return;
    const actionable = statuses.some((s) => s.error || isPartOutdated(s));
    button.disabled = !actionable;
    if (!actionable) {
        button.textContent = "Aktuell";
    }
    else if (statuses.length > 1) {
        button.textContent = "Alle aktualisieren";
    }
    else if (statuses[0]?.missing) {
        button.textContent = "Anlegen";
    }
    else {
        const remote = statuses[0]?.remote;
        button.textContent = remote !== undefined ? `Aktualisieren (Version ${remote})` : "Aktualisieren";
    }
}
// Button eines einzelnen Bestandteils (Formular oder ein Script).
function applyPartButton(button, status) {
    if (!button)
        return;
    const actionable = Boolean(status.error) || isPartOutdated(status);
    button.disabled = !actionable;
    button.dataset.verb = status.missing ? "angelegt" : "aktualisiert";
    button.textContent = !actionable
        ? "Aktuell"
        : status.missing
            ? "Anlegen"
            : status.remote !== undefined && !status.error
                ? `Aktualisieren (Version ${status.remote})`
                : "Aktualisieren";
}
function region(name) {
    return mountedRoot?.querySelector(`[data-region="${name}"]`) ?? null;
}
// Die HTML-Element-Komponente legt ihren Inhalt in ein Kind-Element mit
// ref="html" - dort hinein wird gerendert, damit Formio's eigene Hülle
// erhalten bleibt.
function getContentHost(webform) {
    const component = webform.getComponent?.(contentKey);
    if (!component)
        return undefined;
    return component.refs?.html ?? component.element?.querySelector?.('[ref="html"]') ?? component.element ?? undefined;
}
function onInitialization(form, instance, data) {
    logger.debug("Toolbox initialisiert.");
    // Anders als bei Button-Custom-Actions liefert dieser Init-Hook in "form"
    // kein Objekt mit getComponent() - die echte Webform steckt in
    // instance.root (gleiches Muster wie onFormLoad in
    // projects/CostAccountingWorkflow und projects/GeneralCostAccountingWorkflow).
    const webform = instance.root;
    mountToolbox(webform);
    // Zeichnet Formio die Komponente neu (oder war sie beim Init noch nicht
    // gerendert), ist unser Inhalt weg - dann einfach erneut einhängen.
    webform.on?.("render", () => {
        if (!mountedRoot || !mountedRoot.isConnected)
            mountToolbox(webform);
    });
    document.addEventListener("keydown", function (event) {
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
function mountToolbox(webform) {
    const host = getContentHost(webform);
    if (!host) {
        logger.warn(`HTML-Element-Komponente "${contentKey}" nicht im Formular gefunden (oder noch nicht gerendert).`);
        return;
    }
    host.innerHTML = renderShell();
    mountedRoot = host.querySelector("[data-tbx-root]") ?? undefined;
    if (!mountedRoot)
        return;
    bindToolboxEvents(mountedRoot);
    void checkToolboxVersion();
    void refreshToolLists();
}
// Event-Delegation auf der Wurzel: ein Listener für alle Buttons und die
// Auswahl, damit neu gerenderte Bereiche keine eigenen Listener brauchen.
function bindToolboxEvents(root) {
    root.addEventListener("click", (event) => {
        const button = event.target?.closest?.("button[data-action]");
        if (!button || button.disabled)
            return;
        switch (button.dataset.action) {
            case "update-toolbox":
                void updateToolbox(button);
                return;
            case "create":
                void createSelectedTool(button);
                return;
        }
        const target = targetForms_1.targetForms.find((t) => t.id === button.dataset.toolId);
        if (!target) {
            logger.error(`Kein Werkzeug mit id "${button.dataset.toolId}" in der kuratierten Liste gefunden.`);
            return;
        }
        switch (button.dataset.action) {
            case "open":
                void openLoadedTool(target, button);
                return;
            case "update":
                void runRollout(target, toolParts(target), button, "aktualisiert");
                return;
            case "part": {
                const part = toolParts(target).find((p) => p.key === button.dataset.partKey);
                if (!part)
                    return;
                // In "Werkzeug hinzufügen" wird immer angelegt; bei installierten
                // Werkzeugen setzt applyPartButton, ob der Bestandteil noch fehlt.
                const creating = button.closest('[data-region="available"]') !== null || button.dataset.verb === "angelegt";
                const verb = creating ? "angelegt" : "aktualisiert";
                void runRollout(target, [part], button, verb);
                return;
            }
        }
    });
    root.addEventListener("change", (event) => {
        const select = event.target;
        if (select?.dataset?.role !== "tool-select")
            return;
        const details = region("available")?.querySelector('[data-role="tool-details"]');
        if (details)
            details.innerHTML = renderSelectedToolDetails(targetForms_1.targetForms.find((t) => t.id === select.value));
    });
}
// ---------------------------------------------------------------------------
// Toolbox selbst
// ---------------------------------------------------------------------------
// Vergleicht die hier im Browser laufende Toolbox-Version
// (TOOLBOX_VERSION_COUNTER) mit dem auf GitHub veröffentlichten Bundle und
// zeigt das Ergebnis in derselben Statuszeile/demselben Button-Verhalten wie
// bei den Werkzeugen an.
async function checkToolboxVersion() {
    const section = region("toolbox")?.closest(".tbx-section") ?? null;
    const statusElement = section?.querySelector('li[data-part="toolbox"] .tbx-part-status') ?? null;
    const button = section?.querySelector('button[data-action="update-toolbox"]') ?? null;
    let status;
    try {
        const remoteBundleContent = await loadLatestBundle(TOOLBOX_BUNDLE_PATH);
        const match = remoteBundleContent.match(VERSION_COUNTER_PATTERN);
        status = match
            ? { installed: TOOLBOX_VERSION_COUNTER, remote: parseInt(match[1], 10) }
            : { error: "Veröffentlichte Version nicht ermittelbar." };
    }
    catch (error) {
        logger.error(`Fehler beim Prüfen auf eine neue Toolbox-Version: ${getErrorMessage(error)}`);
        status = { error: getErrorMessage(error) };
    }
    applyStatus(statusElement, status);
    applyUpdateButton(button, [status]);
}
/**
 * Aktualisiert das Toolbox-Formular selbst: lädt sein eigenes Bundle aus dem
 * öffentlichen Artefakt-Repo und patcht es als customJs auf TOOLBOX_FORM_ID.
 * Legt anschließend per newVersion eine neue dforms-Version an. Das gerade
 * laufende Skript im Browser-Speicher bleibt davon unberührt – deshalb wird
 * die Seite nach erfolgreichem Patch automatisch neu geladen.
 */
async function updateToolbox(button) {
    const previousLabel = button.textContent ?? "Aktualisieren";
    button.disabled = true;
    button.textContent = "Aktualisiere…";
    try {
        const baseUri = window.location.origin;
        const customJsContent = await loadLatestBundle(TOOLBOX_BUNDLE_PATH);
        const installedVersionMatch = customJsContent.match(VERSION_COUNTER_PATTERN);
        const installedVersion = installedVersionMatch ? installedVersionMatch[1] : "?";
        const existing = await (0, getForm_1.getForm)(baseUri, NO_TOKEN, TOOLBOX_FORM_ID);
        const definition = {
            formioFormDefinition: existing.body.definition.formioFormDefinition,
            customCss: existing.body.definition.customCss,
            dvfDefVersion: "1.0",
            customJs: customJsContent,
        };
        await (0, patchForm_1.patchForm)(baseUri, NO_TOKEN, TOOLBOX_FORM_ID, TOOLBOX_FORM_NAME, definition);
        await (0, newVersion_1.newVersion)(baseUri, NO_TOKEN, TOOLBOX_FORM_ID);
        logger.info(`Toolbox-Formular aktualisiert (Version ${installedVersion}). Seite wird neu geladen.`);
        await showSuccessAlert("Toolbox aktualisiert", `Version ${installedVersion} wurde erstellt. Die Seite wird jetzt neu geladen, damit die neue Version greift.`);
        window.location.reload();
    }
    catch (error) {
        logger.error(`Fehler beim Aktualisieren des Toolbox-Formulars: ${getErrorMessage(error)}`);
        await showErrorAlert("Fehler beim Aktualisieren der Toolbox", error);
        button.disabled = false;
        button.textContent = previousLabel;
    }
}
// ---------------------------------------------------------------------------
// Werkzeuglisten
// ---------------------------------------------------------------------------
// Lädt einmalig die vollständige dforms-Formular- und Script-Liste und teilt
// die kuratierten targetForms (config/targetForms.ts) danach auf: Werkzeuge,
// die dort noch NICHT existieren, landen in der Auswahl "Werkzeug
// hinzufügen"; Werkzeuge, die schon existieren, in "Installierte Werkzeuge".
// Wird beim Mounten sowie nach jedem Anlegen/Aktualisieren erneut aufgerufen,
// damit ein frisch angelegtes Werkzeug direkt von der Auswahl in die Liste
// wandert, ohne dass die Seite neu geladen werden muss.
async function refreshToolLists() {
    try {
        const baseUri = window.location.origin;
        const [allForms, allScripts] = await Promise.all([
            (0, getAllForms_1.getAllForms)(baseUri, NO_TOKEN),
            (0, getAllScripts_1.getAllScripts)(baseUri, NO_TOKEN),
        ]);
        // Formulare werden über ihre feste formId erkannt, Scripts (die ihre GUID
        // serverseitig bei createScript bekommen, siehe TargetScript) über ihren
        // eindeutigen Namen. Ein Werkzeug gilt als installiert, sobald IRGENDEIN
        // Bestandteil existiert - fehlende Bestandteile zeigt die Karte dann als
        // "fehlt" an und lassen sich dort einzeln oder gesammelt anlegen.
        const partExists = (t, part) => part.kind === "form"
            ? hasFormPart(t) && allForms.body.forms.some((f) => f.id === t.formId)
            : allScripts.body.some((s) => s.name === part.script.name);
        const isAlreadyLoaded = (t) => toolParts(t).some((part) => partExists(t, part));
        availableTargets = targetForms_1.targetForms.filter((t) => !isAlreadyLoaded(t));
        const loadedTargets = targetForms_1.targetForms.filter(isAlreadyLoaded);
        logger.debug(`refreshToolLists: verfügbar=[${availableTargets.map((t) => t.name).join(", ")}], ` +
            `installiert=[${loadedTargets.map((t) => t.name).join(", ")}]`);
        renderAvailableRegion();
        await populateLoadedTools(loadedTargets, () => Promise.resolve(allScripts));
    }
    catch (error) {
        logger.error(`Fehler beim Ermitteln bereits angelegter Werkzeuge: ${getErrorMessage(error)}`);
        // Fallback: Auswahl zeigt sicherheitshalber alle kuratierten Werkzeuge an,
        // statt eines, das eigentlich schon geladen ist, dauerhaft zu verstecken.
        availableTargets = [...targetForms_1.targetForms];
        renderAvailableRegion();
        const loaded = region("loaded");
        if (loaded) {
            loaded.innerHTML = `<div class="tbx-status-error">Installierte Werkzeuge konnten nicht ermittelt werden: ${escapeHtml(getErrorMessage(error))}</div>`;
        }
    }
}
// Rendert Auswahl + Vorschau und setzt den "Erstellen"-Button in der
// Kopfzeile passend (deaktiviert, wenn nichts mehr hinzugefügt werden kann).
function renderAvailableRegion() {
    const available = region("available");
    if (available)
        available.innerHTML = renderAvailableTools(availableTargets);
    const createButton = available?.closest(".tbx-section")?.querySelector('button[data-action="create"]');
    if (createButton) {
        createButton.textContent = "Erstellen";
        createButton.disabled = availableTargets.length === 0;
    }
}
// "Erstellen" in "Werkzeug hinzufügen": legt ALLE Bestandteile des in der
// Auswahl gewählten Werkzeugs an. Danach wandert es per refreshToolLists in
// die Liste der installierten Werkzeuge.
async function createSelectedTool(button) {
    const select = region("available")?.querySelector('[data-role="tool-select"]');
    const target = availableTargets.find((t) => t.id === select?.value);
    if (!target) {
        await showErrorAlert("Werkzeug konnte nicht angelegt werden", "Bitte zuerst ein Werkzeug auswählen.");
        return;
    }
    await runRollout(target, toolParts(target), button, "angelegt");
}
// Gemeinsamer Ablauf für alle Buttons, die etwas anlegen oder aktualisieren -
// ob ein einzelner Bestandteil, mehrere oder das ganze Werkzeug. Sperrt
// währenddessen alle Buttons des Bereichs (keine parallelen Vorgänge) und
// baut danach die Werkzeuglisten neu auf, was auch alle Button-Zustände
// wiederherstellt - im Erfolgs- wie im Fehler- oder Abbruchfall.
async function runRollout(target, parts, button, verb) {
    const section = button.closest(".tbx-section");
    section?.querySelectorAll("button, select").forEach((el) => (el.disabled = true));
    button.textContent = verb === "angelegt" ? "Lege an…" : "Aktualisiere…";
    try {
        const completed = await rolloutParts(target, parts);
        await refreshToolLists();
        if (completed) {
            await showSuccessAlert(verb === "angelegt" ? "Angelegt" : "Aktualisiert", describeRollout(target, parts, verb));
        }
    }
    catch (error) {
        const action = verb === "angelegt" ? "Anlegen" : "Aktualisieren";
        logger.error(`Fehler beim ${action} von "${target.name}": ${getErrorMessage(error)}`);
        await refreshToolLists();
        await showErrorAlert(`Fehler beim ${action} von "${target.name}"`, error);
    }
}
// Befüllt "Installierte Werkzeuge": jedes Werkzeug bekommt eine eigene Karte
// mit Name, Öffnen- (nur mit Formular) und Aktualisieren-Knopf; bei
// "combined"-Tools (Formular + zugehöriges Script, siehe toolbox.meta.json)
// zeigt die Karte beide Bestandteile gemeinsam mit jeweils eigenem
// Versionsstand an.
async function populateLoadedTools(loadedTargets, loadScripts) {
    const loaded = region("loaded");
    if (!loaded)
        return;
    loaded.innerHTML = renderLoadedTools(loadedTargets);
    await Promise.all(loadedTargets.map((target) => updateLoadedToolStatus(loaded, target, loadScripts)));
}
async function remoteVersionOf(bundlePath) {
    const content = await loadLatestBundle(bundlePath);
    const match = content.match(TOOL_VERSION_COUNTER_PATTERN);
    return match ? parseInt(match[1], 10) : undefined;
}
async function checkFormPart(target) {
    try {
        const [existing, remote] = await Promise.all([
            (0, getForm_1.getForm)(window.location.origin, NO_TOKEN, target.formId),
            remoteVersionOf(target.bundlePath),
        ]);
        const match = existing.body.definition.customJs?.match(TOOL_VERSION_COUNTER_PATTERN);
        return { installed: match ? parseInt(match[1], 10) : undefined, remote };
    }
    catch (error) {
        return { error: getErrorMessage(error) };
    }
}
// Scripts liefern ihren installierten Content über getScriptVersion nicht
// zurück - die installierte Version steckt stattdessen als
// VERSION_COUNTER-Marker in "action.description" (siehe
// ensureTargetScriptUpToDate).
async function checkScriptPart(targetScript, loadScripts) {
    try {
        const baseUri = window.location.origin;
        const [allScripts, remote] = await Promise.all([loadScripts(), remoteVersionOf(targetScript.bundlePath)]);
        const script = allScripts.body.find((s) => s.name === targetScript.name);
        if (!script?.id)
            return { missing: true, remote };
        const versions = await (0, getScriptVersion_1.getScriptVersion)(baseUri, NO_TOKEN, script.id);
        const match = versions.body[0]?.action?.description?.de?.match(TOOL_VERSION_COUNTER_PATTERN);
        return { installed: match ? parseInt(match[1], 10) : undefined, remote };
    }
    catch (error) {
        return { error: getErrorMessage(error) };
    }
}
function isPartOutdated(status) {
    if (status.error)
        return false;
    if (status.missing)
        return true;
    if (status.remote === undefined)
        return false;
    // Installierte Version nicht ermittelbar: sicherheitshalber als
    // aktualisierbar behandeln, statt ein mögliches Update zu blockieren.
    return status.installed === undefined || status.remote > status.installed;
}
function describePartStatus(status) {
    if (status.error)
        return { text: `Fehler: ${status.error}`, css: "tbx-status-error" };
    if (status.missing) {
        return { text: `fehlt${status.remote !== undefined ? ` – Version ${status.remote} verfügbar` : ""}`, css: "tbx-status-outdated" };
    }
    if (status.installed === undefined) {
        return {
            text: `Version unbekannt${status.remote !== undefined ? ` – Version ${status.remote} verfügbar` : ""}`,
            css: "tbx-status-unknown",
        };
    }
    if (status.remote !== undefined && status.remote > status.installed) {
        return { text: `Version ${status.installed} – Version ${status.remote} verfügbar`, css: "tbx-status-outdated" };
    }
    return { text: `Version ${status.installed} – aktuell`, css: "tbx-status-ok" };
}
async function updateLoadedToolStatus(container, target, loadScripts) {
    const card = container.querySelector(`.tbx-tool[data-tool-id="${CSS.escape(target.id)}"]`);
    if (!card)
        return;
    const statuses = await Promise.all(toolParts(target).map(async (part) => ({
        part,
        status: part.kind === "script"
            ? await checkScriptPart(part.script, loadScripts)
            : hasFormPart(target)
                ? await checkFormPart(target)
                : { error: "Kein Formular konfiguriert." },
    })));
    for (const { part, status } of statuses) {
        const line = card.querySelector(`li[data-part="${part.key}"]`);
        applyStatus(line?.querySelector(".tbx-part-status") ?? null, status);
        applyPartButton(line?.querySelector('button[data-action="part"]') ?? null, status);
    }
    applyUpdateButton(card.querySelector('button[data-action="update"]'), statuses.map((s) => s.status));
}
// Öffnet das Formular eines Werkzeugs (nur "form"/"combined" - reine Scripts
// haben keine Seite und bekommen keinen Öffnen-Knopf) in einem neuen Tab.
async function openLoadedTool(target, button) {
    if (!hasFormPart(target))
        return;
    button.disabled = true;
    try {
        const baseUri = window.location.origin;
        const allForms = await (0, getAllForms_1.getAllForms)(baseUri, NO_TOKEN);
        const targetForm = allForms.body.forms.find((f) => f.id === target.formId);
        const viewHref = targetForm?._links?.view?.href;
        if (!viewHref) {
            throw new Error(`dforms hat für Formular "${target.name}" keinen "view"-Link geliefert.`);
        }
        window.open(new URL(viewHref, baseUri).toString(), "_blank", "noopener,noreferrer");
    }
    catch (error) {
        logger.error(`Fehler beim Öffnen von "${target.name}": ${getErrorMessage(error)}`);
        await showErrorAlert(`Fehler beim Öffnen von "${target.name}"`, error);
    }
    finally {
        button.disabled = false;
    }
}
// ---------------------------------------------------------------------------
// Ausrollen von Werkzeugen
// ---------------------------------------------------------------------------
/**
 * Holt zuerst den aktuellen Bundle-Inhalt (customJs) des Ziel-Projekts direkt aus dem
 * öffentlichen Artefakt-Repo (kein Auth nötig, dasselbe Repo, in das
 * .github/workflows/publish-bundles.yml bei jedem Push auf main veröffentlicht).
 * Prüft dann anhand der vollständigen Formular-Liste (GET
 * /processstudio/components/form), ob ein Formular mit target.formId schon
 * existiert, statt per GET auf die einzelne Form-ID zu gehen und einen möglichen
 * 404 ("tag:dforms:form_not_found") abzufangen:
 *  - existiert es: vorhandenes Formio-Schema/CSS bleibt (Editor bleibt führend),
 *    nur customJs wird auf den frisch geladenen Bundle-Inhalt aktualisiert.
 *  - existiert es nicht: wird per createForm (POST /processstudio/components/form)
 *    neu angelegt und mit einem minimalen Bootstrap-Schema plus dem Bundle-Inhalt
 *    befüllt.
 */
async function ensureTargetFormUpToDate(target) {
    const baseUri = window.location.origin;
    const customJsContent = await loadLatestBundle(target.bundlePath);
    // Falls das Projekt sein Formio-Schema als Code pflegt (formDefinitionPath
    // gesetzt, kommt 1:1 aus <projekt>/src/forms/form.json), überschreibt dieses
    // Schema bei jedem Update das im Process Studio Formular-Editor gebaute
    // Schema. Ohne formDefinitionPath bleibt das Editor-Schema unangetastet.
    const codeOwnedFormDefinition = target.formDefinitionPath
        ? JSON.parse(await loadLatestBundle(target.formDefinitionPath))
        : undefined;
    const allForms = await (0, getAllForms_1.getAllForms)(baseUri, NO_TOKEN);
    const targetExists = allForms.body.forms.some((f) => f.id === target.formId);
    if (targetExists) {
        logger.debug(`Formular "${target.name}" existiert bereits, aktualisiere customJs.`);
        const existing = await (0, getForm_1.getForm)(baseUri, NO_TOKEN, target.formId);
        const definition = {
            formioFormDefinition: codeOwnedFormDefinition ?? existing.body.definition.formioFormDefinition,
            customCss: existing.body.definition.customCss,
            dvfDefVersion: "1.0",
            customJs: customJsContent,
        };
        await (0, patchForm_1.patchForm)(baseUri, NO_TOKEN, target.formId, target.name, definition);
        return definition;
    }
    logger.debug(`Formular "${target.name}" existiert noch nicht, lege es neu an.`);
    await (0, createForm_1.createForm)(baseUri, NO_TOKEN, target.formId, target.name);
    const definition = {
        // Bootstrap-Schema: ohne formDefinitionPath muss das Feld-Layout danach im
        // Process Studio Formular-Editor gestaltet werden, hier zählt nur das customJs.
        formioFormDefinition: codeOwnedFormDefinition ?? { display: "form", components: [] },
        customCss: "",
        dvfDefVersion: "1.0",
        customJs: customJsContent,
    };
    await (0, patchForm_1.patchForm)(baseUri, NO_TOKEN, target.formId, target.name, definition);
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
 *    NICHT zurück. Deshalb wird derselbe VERSION_COUNTER-Marker, der bereits
 *    im Content steht, zusätzlich in "action.description" eingetragen (dieses
 *    Feld liefert getScriptVersion zuverlässig zurück) - checkScriptPart liest
 *    ihn von dort. Ein Umweg über die Release-Historie funktioniert nicht, da
 *    patchScript nicht bei jedem Aufruf eine neue Release anlegt.
 */
async function ensureTargetScriptUpToDate(targetScript, customerVariables) {
    const baseUri = window.location.origin;
    const content = await loadLatestBundle(targetScript.bundlePath);
    const versionMatch = content.match(TOOL_VERSION_COUNTER_PATTERN);
    const description = versionMatch
        ? `${targetScript.description} (VERSION_COUNTER = ${versionMatch[1]})`
        : targetScript.description;
    const allScripts = await (0, getAllScripts_1.getAllScripts)(baseUri, NO_TOKEN);
    let script = allScripts.body.find((s) => s.name === targetScript.name);
    let createdNow = false;
    if (!script) {
        logger.debug(`Script "${targetScript.name}" existiert noch nicht, lege es neu an.`);
        const created = await (0, createScript_1.createScript)(baseUri, NO_TOKEN, targetScript.name);
        script = { id: created.body.id, name: targetScript.name };
        createdNow = true;
    }
    else {
        logger.debug(`Script "${targetScript.name}" existiert bereits, aktualisiere Content.`);
    }
    if (!script?.id) {
        throw new Error(`Script "${targetScript.name}" konnte nicht angelegt/gefunden werden (keine Id).`);
    }
    const versions = await (0, getScriptVersion_1.getScriptVersion)(baseUri, NO_TOKEN, script.id);
    const versionId = versions.body[0]?.id;
    if (!versionId) {
        throw new Error(`Für Script "${targetScript.name}" wurde keine Version gefunden.`);
    }
    const body = {
        content,
        actionEnabled: true,
        action: {
            display_name: { de: targetScript.name },
            description: { de: description },
            volatile: true,
            execution_mode: "Synchron",
            input_properties: [],
            output_properties: [],
        },
    };
    // Nur bei einem in diesem Aufruf neu angelegten Script, siehe Kommentar an
    // der Funktion.
    if (createdNow && customerVariables && customerVariables.length > 0) {
        body.customerVariables = customerVariables;
    }
    await (0, patchScript_1.patchScript)(baseUri, NO_TOKEN, script.id, versionId, body);
}
// Rollt die übergebenen Bestandteile eines Werkzeugs aus (einen, mehrere oder
// alle - einziger Aufrufpunkt für jedes Anlegen/Aktualisieren). Scripts, die
// dabei NEU angelegt werden und customerVariables brauchen, werden vorher in
// einem Dialog abgefragt - jedes mit seinen eigenen Werten. Liefert false,
// wenn der Dialog abgebrochen wurde (dann wird nichts ausgerollt).
async function rolloutParts(target, parts) {
    const scripts = parts.flatMap((p) => (p.kind === "script" ? [p.script] : []));
    let customerVariables;
    const needsValues = scripts.filter((s) => s.customerVariables.length > 0);
    if (needsValues.length > 0) {
        const existing = await (0, getAllScripts_1.getAllScripts)(window.location.origin, NO_TOKEN);
        const newScripts = needsValues.filter((s) => !existing.body.some((e) => e.name === s.name));
        if (newScripts.length > 0) {
            customerVariables = await promptCustomerVariables(target, newScripts);
            if (!customerVariables)
                return false;
        }
    }
    // Formular zuerst, damit ein Script, das auf das Formular verweist, es
    // beim ersten Aufruf bereits vorfindet.
    if (parts.some((p) => p.kind === "form") && hasFormPart(target)) {
        await ensureTargetFormUpToDate(target);
    }
    for (const script of scripts) {
        await ensureTargetScriptUpToDate(script, customerVariables?.get(script.name));
    }
    return true;
}
async function loadLatestBundle(bundlePath) {
    const url = `${publicBundleRepo_1.PUBLIC_BUNDLE_REPO_BASE_URL}/${bundlePath}`;
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) {
        throw new Error(`Bundle konnte nicht geladen werden (Status ${response.status}): ${url}`);
    }
    return await response.text();
}


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
/******/ 	window.FormLoaderBundle = __webpack_exports__;
/******/ 	
/******/ })()
;
//# sourceMappingURL=formBundle.js.map