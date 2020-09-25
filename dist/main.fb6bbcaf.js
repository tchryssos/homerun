// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/lodash.throttle/index.js":[function(require,module,exports) {
var global = arguments[3];
/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function() {
  return root.Date.now();
};

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        result = wait - timeSinceLastCall;

    return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

/**
 * Creates a throttled function that only invokes `func` at most once per
 * every `wait` milliseconds. The throttled function comes with a `cancel`
 * method to cancel delayed `func` invocations and a `flush` method to
 * immediately invoke them. Provide `options` to indicate whether `func`
 * should be invoked on the leading and/or trailing edge of the `wait`
 * timeout. The `func` is invoked with the last arguments provided to the
 * throttled function. Subsequent calls to the throttled function return the
 * result of the last `func` invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the throttled function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.throttle` and `_.debounce`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to throttle.
 * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=true]
 *  Specify invoking on the leading edge of the timeout.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new throttled function.
 * @example
 *
 * // Avoid excessively updating the position while scrolling.
 * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
 *
 * // Invoke `renewToken` when the click event is fired, but not more than once every 5 minutes.
 * var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
 * jQuery(element).on('click', throttled);
 *
 * // Cancel the trailing throttled invocation.
 * jQuery(window).on('popstate', throttled.cancel);
 */
function throttle(func, wait, options) {
  var leading = true,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  if (isObject(options)) {
    leading = 'leading' in options ? !!options.leading : leading;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }
  return debounce(func, wait, {
    'leading': leading,
    'maxWait': wait,
    'trailing': trailing
  });
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

module.exports = throttle;

},{}],"static/Pitcher1.svg":[function(require,module,exports) {
module.exports = "/Pitcher1.7a940650.svg";
},{}],"node_modules/regenerator-runtime/runtime.js":[function(require,module,exports) {
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
  typeof module === "object" ? module.exports : {}
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}

},{}],"node_modules/@babel/runtime/regenerator/index.js":[function(require,module,exports) {
module.exports = require("regenerator-runtime");

},{"regenerator-runtime":"node_modules/regenerator-runtime/runtime.js"}],"node_modules/@babel/runtime/helpers/asyncToGenerator.js":[function(require,module,exports) {
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

module.exports = _asyncToGenerator;
},{}],"js/constants.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rosterTemplate = exports.teamNames = exports.citySuffix = exports.cityNames = exports.hitScaleTarget = exports.pitchScaleTarget = exports.hitXTarget = exports.hitYTarget = exports.pitchYTarget = exports.hitSpeed = exports.frameSpeed = exports.pitchSpeed = exports.fps = void 0;
// START - CONFIG CONSTANTS - START
var fps = 60; // @TODO Find a way to target actual refresh rate

exports.fps = fps;
var pitchSpeed = 3000;
exports.pitchSpeed = pitchSpeed;
var frameSpeed = 1500;
exports.frameSpeed = frameSpeed;
var hitSpeed = 3000;
exports.hitSpeed = hitSpeed;
var pitchYTarget = 20;
exports.pitchYTarget = pitchYTarget;
var hitYTarget = -300;
exports.hitYTarget = hitYTarget;
var hitXTarget = 90;
exports.hitXTarget = hitXTarget;
var pitchScaleTarget = 80;
exports.pitchScaleTarget = pitchScaleTarget;
var hitScaleTarget = 0.5; // END - CONFIG CONSTANTS - END
// START - TEAM CONSTANTS - START

exports.hitScaleTarget = hitScaleTarget;
var cityNames = ['Hangrell', 'Oberome', 'Balbon', 'Ointipe', 'Ralm', 'Yantice', 'Qualmmrock', 'Bont', 'Wail', 'Contbil', 'Peempont', 'Zerti', 'Glom', 'Frautler', 'Lillirat'];
exports.cityNames = cityNames;
var citySuffix = [' City', 'shire', 'berg', ' Center', ' Angeles', ' Village', ' (Cuidad de)', 'ton', ' Crater', '-to', 'ville', ' District', 'berry', ' Circle', ' 10'];
exports.citySuffix = citySuffix;
var teamNames = ['Ghouls', 'Shapes', 'December 12th', 'Yam', 'Rocks', 'Oil Barrels', 'Grime', 'Gloves', 'Bugs', 'Man', 'School Teachers', 'Worms', 'Nails', 'Fast Cars', 'Popcorns']; // END - TEAM CONSTANTS - END
// START - PLAYER CONSTANTS - START

exports.teamNames = teamNames;
var rosterTemplate = [// The 1990 NYM roster
'Kevin Brown', 'David Cone', 'Ron Darling', 'Sid Fernandez', 'John Franco', 'Dwight Gooden', 'Jeff Innis', 'Julio Machado', 'Jeff Musselman', 'Bob Ojeda', 'Alejandro Pena', 'Dan Schatzeder', 'Julio Valera', 'Frank Viola', 'Wally Whitehurst', 'Todd Hundley', 'Dave Liddell', 'Barry Lyons', 'Orlando Mercado', 'Charlie O\'Brien', 'Mackey Sasser', 'Alex Trevino', 'Kevin Baez', 'Mario Diaz', 'Kevin Elster', 'Tom Herr', 'Gregg Jefferies', 'Howard Johnson', 'Dave Magadan', 'Mike Marshall', 'Tom O\'Malley', 'Tim Teufel', 'Kelvin Torve', 'Daryl Boston', 'Chuck Carr', 'Mark Carreon', 'Keith Hughes', 'Chris Jelic', 'Kevin McReynolds', 'Keith Miller', 'Darren Reed', 'Darryl Strawberry', 'Pat Tabler', 'Lou Thornton']; // END - PLAYER CONSTANTS - END

exports.rosterTemplate = rosterTemplate;
},{}],"js/util.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRandomColorString = exports.addAndRemoveClass = exports.getRandomBetween = exports.getRandomItem = exports.getTargetFrameMod = exports.timeout = void 0;

var _constants = require("/js/constants");

var timeout = function timeout(func, ms) {
  return new Promise(function (resolve) {
    return setTimeout(function () {
      func();
      resolve();
    }, ms);
  });
};

exports.timeout = timeout;

var getTargetFrameMod = function getTargetFrameMod(target, speed) {
  var mod = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  return target / (speed / 1000) / _constants.fps * mod;
};

exports.getTargetFrameMod = getTargetFrameMod;

var getRandomItem = function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
};

exports.getRandomItem = getRandomItem;

var getRandomBetween = function getRandomBetween(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

exports.getRandomBetween = getRandomBetween;

var addAndRemoveClass = function addAndRemoveClass(el, classString, time) {
  el.classList.add(classString);
  setTimeout(function () {
    return el.classList.remove(classString);
  }, time);
};

exports.addAndRemoveClass = addAndRemoveClass;

var getRandomColorString = function getRandomColorString() {
  return "#".concat(Math.floor(Math.random() * 16777215).toString(16));
};

exports.getRandomColorString = getRandomColorString;
},{"/js/constants":"js/constants.js"}],"static/Pitcher2.svg":[function(require,module,exports) {
module.exports = "/Pitcher2.035ed2b9.svg";
},{}],"static/Pitcher3.svg":[function(require,module,exports) {
module.exports = "/Pitcher3.b194ca01.svg";
},{}],"js/elements.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.textBox = exports.gameoverText = exports.homerunId = exports.strike = exports.headSheet = exports.mouthSheet = exports.markSheet = exports.stacheSheet = exports.hairSheet = exports.pupilSheet = exports.noseSheet = exports.eyeSheet = exports.atBatText = exports.batterBA = exports.batterWeight = exports.batterHeight = exports.batterPosition = exports.batterNumber = exports.batterName = exports.slidingInfo = exports.batterCount = exports.teamTwoScore = exports.teamOneScore = exports.teamTwoLogo = exports.teamTwoText = exports.teamOneLogo = exports.teamOneText = exports.setSvg3 = exports.setSvg2 = exports.setSvg1 = exports.bat = exports.ball = exports.batterBox = exports.pitcher = void 0;

var _Pitcher = _interopRequireDefault(require("/static/Pitcher1.svg"));

var _Pitcher2 = _interopRequireDefault(require("/static/Pitcher2.svg"));

var _Pitcher3 = _interopRequireDefault(require("/static/Pitcher3.svg"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// START - ELEMENTS - START
var pitcher = document.getElementById('pitcher');
exports.pitcher = pitcher;
var batterBox = document.getElementById('batter-box');
exports.batterBox = batterBox;
var ball = document.getElementById('ball');
exports.ball = ball;
var bat = document.getElementById('bat');
exports.bat = bat;

var setSvg1 = function setSvg1() {
  return pitcher.src = _Pitcher.default;
};

exports.setSvg1 = setSvg1;

var setSvg2 = function setSvg2() {
  return pitcher.src = _Pitcher2.default;
};

exports.setSvg2 = setSvg2;

var setSvg3 = function setSvg3() {
  return pitcher.src = _Pitcher3.default;
};

exports.setSvg3 = setSvg3;
var teamOneText = document.getElementById('team-logo-text-one');
exports.teamOneText = teamOneText;
var teamOneLogo = document.getElementById('team-logo-one');
exports.teamOneLogo = teamOneLogo;
var teamTwoText = document.getElementById('team-logo-text-two');
exports.teamTwoText = teamTwoText;
var teamTwoLogo = document.getElementById('team-logo-two');
exports.teamTwoLogo = teamTwoLogo;
var teamOneScore = document.getElementById('team-score-one');
exports.teamOneScore = teamOneScore;
var teamTwoScore = document.getElementById('team-score-two');
exports.teamTwoScore = teamTwoScore;
var batterCount = document.getElementById('batter-count');
exports.batterCount = batterCount;
var slidingInfo = document.getElementById('sliding-info');
exports.slidingInfo = slidingInfo;
var batterName = document.getElementById('batter-name');
exports.batterName = batterName;
var batterNumber = document.getElementById('batter-number');
exports.batterNumber = batterNumber;
var batterPosition = document.getElementById('batter-position');
exports.batterPosition = batterPosition;
var batterHeight = document.getElementById('batter-height');
exports.batterHeight = batterHeight;
var batterWeight = document.getElementById('batter-weight');
exports.batterWeight = batterWeight;
var batterBA = document.getElementById('batter-ba');
exports.batterBA = batterBA;
var atBatText = document.getElementById('at-bat');
exports.atBatText = atBatText;
var eyeSheet = document.getElementById('eyes');
exports.eyeSheet = eyeSheet;
var noseSheet = document.getElementById('noses');
exports.noseSheet = noseSheet;
var pupilSheet = document.getElementById('pupils');
exports.pupilSheet = pupilSheet;
var hairSheet = document.getElementById('hair');
exports.hairSheet = hairSheet;
var stacheSheet = document.getElementById('stache');
exports.stacheSheet = stacheSheet;
var markSheet = document.getElementById('marks');
exports.markSheet = markSheet;
var mouthSheet = document.getElementById('mouths');
exports.mouthSheet = mouthSheet;
var headSheet = document.getElementById('head');
exports.headSheet = headSheet;
var strike = 'strike';
exports.strike = strike;
var homerunId = 'homerun';
exports.homerunId = homerunId;
var gameoverText = document.getElementById('game-over');
exports.gameoverText = gameoverText;
var textBox = document.getElementById('text-box');
exports.textBox = textBox;
},{"/static/Pitcher1.svg":"static/Pitcher1.svg","/static/Pitcher2.svg":"static/Pitcher2.svg","/static/Pitcher3.svg":"static/Pitcher3.svg"}],"js/state.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setCurrentScoreVal = exports.currentScoreVal = exports.setStrikeCount = exports.strikeCount = exports.setHitScale = exports.hitScale = exports.setScale = exports.scale = exports.setTranslateX = exports.translateX = exports.setHitY = exports.hitY = exports.setTranslateY = exports.translateY = exports.setHitTime = exports.hitTime = exports.setPitchTime = exports.pitchTime = exports.setIsHit = exports.isHit = exports.getIsAnimating = exports.setIsAnimating = exports.isAnimating = void 0;
// START - STATEFUL STUFF - START
var isAnimating = false;
exports.isAnimating = isAnimating;

var setIsAnimating = function setIsAnimating(bool) {
  return exports.isAnimating = isAnimating = bool;
};

exports.setIsAnimating = setIsAnimating;

var getIsAnimating = function getIsAnimating() {
  return isAnimating;
};

exports.getIsAnimating = getIsAnimating;
var isHit = false;
exports.isHit = isHit;

var setIsHit = function setIsHit(bool) {
  return exports.isHit = isHit = bool;
};

exports.setIsHit = setIsHit;
var pitchTime;
exports.pitchTime = pitchTime;

var setPitchTime = function setPitchTime(time) {
  return exports.pitchTime = pitchTime = time;
};

exports.setPitchTime = setPitchTime;
var hitTime;
exports.hitTime = hitTime;

var setHitTime = function setHitTime(time) {
  return exports.hitTime = hitTime = time;
};

exports.setHitTime = setHitTime;
var translateY = 0;
exports.translateY = translateY;

var setTranslateY = function setTranslateY(num) {
  return exports.translateY = translateY = num;
};

exports.setTranslateY = setTranslateY;
var hitY;
exports.hitY = hitY;

var setHitY = function setHitY(num) {
  return exports.hitY = hitY = num;
};

exports.setHitY = setHitY;
var translateX = 0;
exports.translateX = translateX;

var setTranslateX = function setTranslateX(num) {
  return exports.translateX = translateX = num;
};

exports.setTranslateX = setTranslateX;
var scale = 1;
exports.scale = scale;

var setScale = function setScale(num) {
  return exports.scale = scale = num;
};

exports.setScale = setScale;
var hitScale;
exports.hitScale = hitScale;

var setHitScale = function setHitScale(num) {
  return exports.hitScale = hitScale = num;
};

exports.setHitScale = setHitScale;
var strikeCount = 0;
exports.strikeCount = strikeCount;

var setStrikeCount = function setStrikeCount(num) {
  return exports.strikeCount = strikeCount = num;
};

exports.setStrikeCount = setStrikeCount;
var currentScoreVal = 0;
exports.currentScoreVal = currentScoreVal;

var setCurrentScoreVal = function setCurrentScoreVal(num) {
  return exports.currentScoreVal = currentScoreVal = num;
}; // END - STATEFUL STUFF - END


exports.setCurrentScoreVal = setCurrentScoreVal;
},{}],"static/strike.mp3":[function(require,module,exports) {
module.exports = "/strike.60065cbb.mp3";
},{}],"static/hit.mp3":[function(require,module,exports) {
module.exports = "/hit.461f7fb7.mp3";
},{}],"static/crowd.mp3":[function(require,module,exports) {
module.exports = "/crowd.19a6d51a.mp3";
},{}],"static/hr.mp3":[function(require,module,exports) {
module.exports = "/hr.8b7c6c21.mp3";
},{}],"static/go.mp3":[function(require,module,exports) {
module.exports = "/go.01ab405d.mp3";
},{}],"js/audio.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gameOverAudio = exports.homerunAudio = exports.crowdAudio = exports.hitAudio = exports.strikeAudio = void 0;

var _strike = _interopRequireDefault(require("/static/strike.mp3"));

var _hit = _interopRequireDefault(require("/static/hit.mp3"));

var _crowd = _interopRequireDefault(require("/static/crowd.mp3"));

var _hr = _interopRequireDefault(require("/static/hr.mp3"));

var _go = _interopRequireDefault(require("/static/go.mp3"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var strikeAudio = new Audio(_strike.default);
exports.strikeAudio = strikeAudio;
var hitAudio = new Audio(_hit.default);
exports.hitAudio = hitAudio;
var crowdAudio = new Audio(_crowd.default);
exports.crowdAudio = crowdAudio;
crowdAudio.loop = true;
var homerunAudio = new Audio(_hr.default);
exports.homerunAudio = homerunAudio;
var gameOverAudio = new Audio(_go.default);
exports.gameOverAudio = gameOverAudio;
gameOverAudio.loop = true;
},{"/static/strike.mp3":"static/strike.mp3","/static/hit.mp3":"static/hit.mp3","/static/crowd.mp3":"static/crowd.mp3","/static/hr.mp3":"static/hr.mp3","/static/go.mp3":"static/go.mp3"}],"node_modules/@babel/runtime/helpers/arrayWithoutHoles.js":[function(require,module,exports) {
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }
}

module.exports = _arrayWithoutHoles;
},{}],"node_modules/@babel/runtime/helpers/iterableToArray.js":[function(require,module,exports) {
function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

module.exports = _iterableToArray;
},{}],"node_modules/@babel/runtime/helpers/nonIterableSpread.js":[function(require,module,exports) {
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

module.exports = _nonIterableSpread;
},{}],"node_modules/@babel/runtime/helpers/toConsumableArray.js":[function(require,module,exports) {
var arrayWithoutHoles = require("./arrayWithoutHoles");

var iterableToArray = require("./iterableToArray");

var nonIterableSpread = require("./nonIterableSpread");

function _toConsumableArray(arr) {
  return arrayWithoutHoles(arr) || iterableToArray(arr) || nonIterableSpread();
}

module.exports = _toConsumableArray;
},{"./arrayWithoutHoles":"node_modules/@babel/runtime/helpers/arrayWithoutHoles.js","./iterableToArray":"node_modules/@babel/runtime/helpers/iterableToArray.js","./nonIterableSpread":"node_modules/@babel/runtime/helpers/nonIterableSpread.js"}],"js/players.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildPlayerName = exports.generatePlayerPortrait = exports.colorChange = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _elements = require("/js/elements");

var _util = require("/js/util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// START - PORTRAIT GENERATOR - START
var eyeSheetSize = 3;
var noseSheetSize = 4;
var hairSheetSize = 8;
var markSheetSize = 3;
var pupilSheetSize = 3;
var stacheSheetSize = 3;
var mouthSheetSize = 5;

var shiftSheet = function shiftSheet(el, shiftInt) {
  el.style.transform = "translateY(-".concat(shiftInt, "%)");
};

var calcShift = function calcShift(sheetSize) {
  var chunkP = 100 / sheetSize;
  return (0, _util.getRandomBetween)(0, sheetSize) * chunkP;
};

var colorChange = function colorChange(el, overrideH, overrideS, overrideB) {
  el.style.filter = "\n\t\thue-rotate(".concat(overrideH || (0, _util.getRandomBetween)(0, 360), "deg)\n\t\tsaturate(").concat(overrideS || (0, _util.getRandomBetween)(50, 200), "%)\n\t\tbrightness(").concat(overrideB || (0, _util.getRandomBetween)(50, 200), "%)\n\t");
};

exports.colorChange = colorChange;

var generatePlayerPortrait = function generatePlayerPortrait() {
  var headSaturate = (0, _util.getRandomBetween)(25, 150);
  var headBrightness = (0, _util.getRandomBetween)(50, 100);
  colorChange(_elements.headSheet, null, headSaturate, headBrightness);
  var eyeShift = calcShift(eyeSheetSize);
  var noseShift = calcShift(noseSheetSize);
  var hairShift = calcShift(hairSheetSize);
  var pupilShift = calcShift(pupilSheetSize);
  var mouthShift = calcShift(mouthSheetSize);
  shiftSheet(_elements.eyeSheet, eyeShift);
  shiftSheet(_elements.noseSheet, noseShift);
  shiftSheet(_elements.mouthSheet, mouthShift);
  shiftSheet(_elements.hairSheet, hairShift);
  var hairRotation = (0, _util.getRandomBetween)(0, 360);
  var hairSaturate = (0, _util.getRandomBetween)(50, 200);
  var hairBrightness = (0, _util.getRandomBetween)(20, 200);
  colorChange(_elements.hairSheet, hairRotation, hairSaturate, hairBrightness);
  shiftSheet(_elements.pupilSheet, pupilShift);
  colorChange(_elements.pupilSheet);

  if ((0, _util.getRandomBetween)(0, 10) > 6) {
    var stacheShift = calcShift(stacheSheetSize);
    shiftSheet(_elements.stacheSheet, stacheShift);
    colorChange(_elements.stacheSheet, hairRotation, hairSaturate, hairBrightness);
  } else {
    _elements.stacheSheet.style.display = 'none';
  }

  if ((0, _util.getRandomBetween)(0, 10) > 7) {
    var markShift = calcShift(markSheetSize);
    shiftSheet(_elements.markSheet, markShift);
  } else {
    _elements.markSheet.style.display = 'none';
  }
}; // END - PORTRAIT GENERATOR - END
// START - NAME GENERATOR - START


exports.generatePlayerPortrait = generatePlayerPortrait;
var vowels = ['a', 'e', 'i', 'o', 'u', 'y']; // Weightings roughly taken from the actual 1990 Mets roster

var weightedConsonants = [['b', 3], ['c', 4], ['d', 9], ['f', 3], ['g', 3], ['h', 6], ['j', 3], ['k', 4], ['l', 10], ['m', 6], ['n', 12], ['p', 1], ['q', 1], ['r', 16], ['s', 6], ['t', 6], ['v', 4], ['w', 2], ['x', 1], ['z', 1]];
var consonants = weightedConsonants.map(function (c) {
  return c[0];
});
var selectableConstants = []; // @TODO This is a very bad way of handling weighted random letters

weightedConsonants.forEach(function (c) {
  for (var i = 0; i < c[1]; i++) {
    selectableConstants.push(c[0]);
  }
});

var replaceLetter = function replaceLetter(letter, optionArray) {
  var replacement = (0, _util.getRandomItem)(optionArray);

  if (letter === letter.toUpperCase()) {
    return replacement.toUpperCase();
  }

  return replacement;
};

var buildPlayerName = function buildPlayerName(templateName) {
  var letters = templateName.split('');
  return letters.reduce(function (acc, cur, i, arr) {
    var letter = cur;

    if (i && arr[i - 1] === cur) {
      letter = acc[i - 1];
    } else if (vowels.indexOf(cur.toLowerCase()) !== -1) {
      letter = replaceLetter(letter, vowels);
    } else if (consonants.indexOf(cur.toLowerCase()) !== -1) {
      letter = replaceLetter(letter, selectableConstants);
    }

    return [].concat((0, _toConsumableArray2.default)(acc), [letter]);
  }, []).join('');
}; // END - NAME GENERATOR - END


exports.buildPlayerName = buildPlayerName;
},{"@babel/runtime/helpers/toConsumableArray":"node_modules/@babel/runtime/helpers/toConsumableArray.js","/js/elements":"js/elements.js","/js/util":"js/util.js"}],"js/teams.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchNewPlayer = exports.getCityName = void 0;

var _util = require("/js/util");

var _players = require("/js/players");

var _constants = require("/js/constants");

var _elements = require("/js/elements");

var prevCity = '';

var getCityName = function getCityName() {
  var city = (0, _util.getRandomItem)(_constants.cityNames.filter(function (n) {
    return n !== prevCity;
  }));
  prevCity = city;
  var suffix = Math.round(Math.random()) ? (0, _util.getRandomItem)(_constants.citySuffix) : '';
  return "".concat(city).concat(suffix);
}; // END - TEAM UTILS - END


exports.getCityName = getCityName;
var positions = ['P', 'C', '1B', '2B', '3B', 'SS', 'LF', 'CF', 'RF', 'IF', 'OF', 'CL'];

var fetchNewPlayer = function fetchNewPlayer(preventSlide) {
  if (!preventSlide) {
    (0, _util.addAndRemoveClass)(_elements.slidingInfo, 'sliding-info-slide', 5000);
  }

  setTimeout(function () {
    var newBatter = (0, _players.buildPlayerName)((0, _util.getRandomItem)(_constants.rosterTemplate));
    _elements.batterName.textContent = newBatter;
    (0, _players.generatePlayerPortrait)();
    _elements.batterHeight.textContent = "".concat((0, _util.getRandomBetween)(3, 9), "'").concat((0, _util.getRandomBetween)(0, 12), "\"");
    _elements.batterWeight.textContent = "".concat((0, _util.getRandomBetween)(60, 400), " lbs");
    _elements.batterPosition.textContent = (0, _util.getRandomItem)(positions);
    _elements.batterNumber.textContent = "#".concat((0, _util.getRandomBetween)(0, 100));
    _elements.batterBA.textContent = ".".concat((0, _util.getRandomBetween)(100, 500));
  }, preventSlide ? 0 : 2500);
};

exports.fetchNewPlayer = fetchNewPlayer;
},{"/js/util":"js/util.js","/js/players":"js/players.js","/js/constants":"js/constants.js","/js/elements":"js/elements.js"}],"js/animations.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.runPitchAnimation = exports.homerun = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _constants = require("/js/constants");

var _util = require("/js/util");

var _elements = require("/js/elements");

var _state = require("/js/state");

var _audio = require("/js/audio");

var _teams = require("/js/teams");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initialPitch = true; // START - ANIMATION HELPERS - START

var endPitchCycle =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee() {
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _util.timeout)(function () {
              return _elements.ball.style.display = 'none';
            }, _constants.pitchSpeed);

          case 2:
            (0, _state.setIsAnimating)(false);
            _elements.batterBox.style.display = 'block';
            (0, _state.setTranslateY)(0);
            (0, _state.setTranslateX)(0);
            (0, _state.setScale)(1);

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function endPitchCycle() {
    return _ref.apply(this, arguments);
  };
}();

var ballVisible = function ballVisible() {
  _elements.ball.style.display = 'block';
  _elements.ball.style.cursor = 'pointer';
  (0, _state.setPitchTime)(Date.now());
  pitch();
};

var homerun = function homerun() {
  _elements.ball.style.cursor = 'default';

  if (!_state.isHit) {
    _audio.hitAudio.play();

    (0, _state.setIsHit)(true);
    (0, _state.setHitTime)(Date.now());
    (0, _state.setHitY)(_state.translateY);
    (0, _state.setHitScale)(_state.scale);
    toggleText(_elements.homerunId, true);
    setTimeout(function () {
      return _audio.homerunAudio.play();
    }, 300);
    (0, _util.timeout)(function () {
      return toggleText(_elements.homerunId, false);
    }, _constants.hitSpeed);
    var newScore = _state.currentScoreVal + 1;
    (0, _state.setCurrentScoreVal)(newScore);
    setTimeout(function () {
      (0, _util.addAndRemoveClass)(_elements.teamTwoScore, 'big-score', 4000);
      _elements.teamTwoScore.textContent = "".concat(newScore);
      (0, _teams.fetchNewPlayer)();
    }, _constants.hitSpeed);
    endPitchCycle();
  }
};

exports.homerun = homerun;

var toggleText = function toggleText(childId, bool) {
  var el = document.getElementById(childId);
  var bgColor = bool ? 'rgba(0, 0, 0, 0.7)' : 'transparent';
  var elDisplay = bool ? 'block' : 'none';
  _elements.textBox.style.backgroundColor = bgColor;
  el.style.display = elDisplay;
}; // END - ANIMATION HELPERS - END
// START - RAFS - START


var hit = function hit() {
  requestAnimationFrame(function () {
    (0, _state.setTranslateY)(_state.translateY + (0, _util.getTargetFrameMod)(_constants.hitYTarget - _state.hitY, _constants.hitSpeed));
    (0, _state.setScale)(_state.scale + (0, _util.getTargetFrameMod)(_constants.hitScaleTarget - _state.hitScale, _constants.hitSpeed));
    (0, _state.setTranslateX)(_state.translateX + (0, _util.getTargetFrameMod)(_constants.hitXTarget, _constants.hitSpeed));
    _elements.ball.style.transform = "scale(".concat(_state.scale, ") translateY(").concat(_state.translateY, "px) translateX(").concat(_state.translateX, "px)");

    if (Date.now() - _state.hitTime < _constants.hitSpeed) {
      hit();
    }
  });
};

var pitch = function pitch() {
  return requestAnimationFrame(function () {
    if (!_state.isHit) {
      if (Date.now() - _state.pitchTime >= _constants.pitchSpeed) {
        _elements.ball.style.display = 'none';
        return;
      }

      (0, _state.setScale)(_state.scale + (0, _util.getTargetFrameMod)(_constants.pitchScaleTarget, _constants.pitchSpeed));
      (0, _state.setTranslateY)(_state.translateY + (0, _util.getTargetFrameMod)(_constants.pitchYTarget, _constants.pitchSpeed));
      _elements.ball.style.transform = "scale(".concat(_state.scale, ") translateY(").concat(_state.translateY, "px)");
      pitch();
    } else {
      hit();
    }
  });
}; // END - RAFS - END
// START - MAIN ANIMATION - START


var runPitchAnimation =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee2() {
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (initialPitch) {
              _audio.crowdAudio.play();
            }

            if (!(_state.isAnimating === false)) {
              _context2.next = 11;
              break;
            }

            (0, _state.setIsHit)(false);
            (0, _state.setIsAnimating)(true);
            _elements.batterBox.style.display = 'none';
            _context2.next = 7;
            return (0, _util.timeout)(_elements.setSvg2, _constants.frameSpeed);

          case 7:
            _context2.next = 9;
            return (0, _util.timeout)(_elements.setSvg3, _constants.frameSpeed);

          case 9:
            ballVisible();
            setTimeout(function () {
              (0, _elements.setSvg1)();

              if (!_state.isHit) {
                if (_state.strikeCount >= 2) {
                  _elements.textBox.style.backgroundColor = 'black';
                  _elements.batterBox.style.display = 'none';
                  _elements.gameoverText.style.display = 'block';

                  _audio.gameOverAudio.play();

                  _audio.crowdAudio.pause();
                } else {
                  toggleText(_elements.strike, true);

                  _audio.strikeAudio.play();

                  endPitchCycle();
                  setTimeout(function () {
                    toggleText(_elements.strike, false);

                    _audio.strikeAudio.pause();

                    _audio.strikeAudio.currentTime = 0;
                  }, 2000);
                  (0, _state.setStrikeCount)(_state.strikeCount + 1);
                  _elements.batterCount.textContent = "".concat(_state.strikeCount, "-0");
                }
              }
            }, _constants.frameSpeed);

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function runPitchAnimation() {
    return _ref2.apply(this, arguments);
  };
}(); // END - MAIN ANIMATION - END


exports.runPitchAnimation = runPitchAnimation;
},{"@babel/runtime/regenerator":"node_modules/@babel/runtime/regenerator/index.js","@babel/runtime/helpers/asyncToGenerator":"node_modules/@babel/runtime/helpers/asyncToGenerator.js","/js/constants":"js/constants.js","/js/util":"js/util.js","/js/elements":"js/elements.js","/js/state":"js/state.js","/js/audio":"js/audio.js","/js/teams":"js/teams.js"}],"js/main.js":[function(require,module,exports) {
"use strict";

var _lodash = _interopRequireDefault(require("lodash.throttle"));

var _Pitcher = _interopRequireDefault(require("/static/Pitcher1.svg"));

var _animations = require("/js/animations");

var _elements = require("/js/elements");

var _constants = require("/js/constants");

var _util = require("/js/util");

var _teams = require("/js/teams");

var _players = require("/js/players");

var _state = require("/js/state");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// LISTENERS
_elements.batterBox.addEventListener('click', _animations.runPitchAnimation);

_elements.ball.addEventListener('click', _animations.homerun);

if (window.innerWidth >= 600) {
  var trackCursor = (0, _lodash.default)(function (e) {
    _elements.bat.style.top = "".concat(e.y - 140, "px");
    _elements.bat.style.left = "".concat(e.x - 30, "px");
  }, 50);
  document.addEventListener('mousemove', trackCursor);
} // SETUP


var teamNameOne = (0, _util.getRandomItem)(_constants.teamNames);
var teamNameTwo = (0, _util.getRandomItem)(_constants.teamNames.filter(function (n) {
  return n !== teamNameOne;
}));
var cityNameOne = (0, _teams.getCityName)();
var cityNameTwo = (0, _teams.getCityName)();
var teamOneString = "".concat(cityNameOne, " ").concat(teamNameOne);
var teamTwoString = "".concat(cityNameTwo, " ").concat(teamNameTwo);

var getAbvTeam = function getAbvTeam(teamName) {
  return teamName.split(/[^A-Z0-9]/).join('');
};

_elements.teamOneText.textContent = getAbvTeam(teamOneString);
_elements.teamTwoText.textContent = getAbvTeam(teamTwoString);
_elements.teamOneLogo.style.backgroundColor = (0, _util.getRandomColorString)();
_elements.teamTwoLogo.style.backgroundColor = (0, _util.getRandomColorString)();
_elements.teamOneLogo.style.color = (0, _util.getRandomColorString)();
_elements.teamTwoLogo.style.color = (0, _util.getRandomColorString)();
_elements.teamOneScore.textContent = (0, _util.getRandomBetween)(0, 20);
var playerScore = (0, _util.getRandomBetween)(0, 20);
_elements.teamTwoScore.textContent = playerScore;
(0, _state.setCurrentScoreVal)(playerScore);
_elements.batterCount.textContent = '0-0';
(0, _players.colorChange)(_elements.pitcher);
(0, _teams.fetchNewPlayer)(true);
_elements.atBatText.textContent = "NOW AT BAT FOR ".concat(getAbvTeam(teamTwoString).toUpperCase()); // RUN

_elements.pitcher.src = _Pitcher.default;
},{"lodash.throttle":"node_modules/lodash.throttle/index.js","/static/Pitcher1.svg":"static/Pitcher1.svg","/js/animations":"js/animations.js","/js/elements":"js/elements.js","/js/constants":"js/constants.js","/js/util":"js/util.js","/js/teams":"js/teams.js","/js/players":"js/players.js","/js/state":"js/state.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "57061" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/main.js"], null)
//# sourceMappingURL=/main.fb6bbcaf.js.map