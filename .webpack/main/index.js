/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/motorFcn.js":
/*!*************************!*\
  !*** ./src/motorFcn.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const {
  PythonShell
} = __webpack_require__(/*! python-shell */ "./node_modules/python-shell/index.js");
const runPy = async data => {
  const options = {
    mode: 'json',
    scriptPath: path.join(__dirname, '/src/py/')
  };
  let pyshell = new PythonShell('run_motor.py');
  pyshell.send(data);
  const result = await new Promise((resolve, reject) => {
    pyshell.on('message', msg => {
      return resolve(JSON.parse(msg));
    });
    pyshell.end((err, code, signal) => {
      if (err) return reject(err);
    });
  });
  return result;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (runPy);

/***/ }),

/***/ "./src/shared/constants.js":
/*!*********************************!*\
  !*** ./src/shared/constants.js ***!
  \*********************************/
/***/ ((module) => {

module.exports = {
  channels: {
    NEXT_EVENT: 'nextEvent',
    GET_DATA: 'get_data',
    TEST_EVENT: 'testEvent',
    SEND_DATA: 'sendData'
  }
};

/***/ }),

/***/ "./node_modules/clean-stack/index.js":
/*!*******************************************!*\
  !*** ./node_modules/clean-stack/index.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const os = __webpack_require__(/*! os */ "os");
const extractPathRegex = /\s+at.*(?:\(|\s)(.*)\)?/;
const pathRegex = /^(?:(?:(?:node|(?:internal\/[\w/]*|.*node_modules\/(?:babel-polyfill|pirates)\/.*)?\w+)\.js:\d+:\d+)|native)/;
const homeDir = typeof os.homedir === 'undefined' ? '' : os.homedir();
module.exports = (stack, options) => {
  options = Object.assign({
    pretty: false
  }, options);
  return stack.replace(/\\/g, '/').split('\n').filter(line => {
    const pathMatches = line.match(extractPathRegex);
    if (pathMatches === null || !pathMatches[1]) {
      return true;
    }
    const match = pathMatches[1];

    // Electron
    if (match.includes('.app/Contents/Resources/electron.asar') || match.includes('.app/Contents/Resources/default_app.asar')) {
      return false;
    }
    return !pathRegex.test(match);
  }).filter(line => line.trim() !== '').map(line => {
    if (options.pretty) {
      return line.replace(extractPathRegex, (m, p1) => m.replace(p1, p1.replace(homeDir, '~')));
    }
    return line;
  }).join('\n');
};

/***/ }),

/***/ "./node_modules/electron-is-dev/index.js":
/*!***********************************************!*\
  !*** ./node_modules/electron-is-dev/index.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const electron = __webpack_require__(/*! electron */ "electron");
if (typeof electron === 'string') {
  throw new TypeError('Not running in an Electron environment!');
}
const isEnvSet = ('ELECTRON_IS_DEV' in process.env);
const getFromEnv = Number.parseInt(process.env.ELECTRON_IS_DEV, 10) === 1;
module.exports = isEnvSet ? getFromEnv : !electron.app.isPackaged;

/***/ }),

/***/ "./node_modules/electron-squirrel-startup/index.js":
/*!*********************************************************!*\
  !*** ./node_modules/electron-squirrel-startup/index.js ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var path = __webpack_require__(/*! path */ "path");
var spawn = (__webpack_require__(/*! child_process */ "child_process").spawn);
var debug = __webpack_require__(/*! debug */ "./node_modules/electron-squirrel-startup/node_modules/debug/src/index.js")('electron-squirrel-startup');
var app = (__webpack_require__(/*! electron */ "electron").app);
var run = function (args, done) {
  var updateExe = path.resolve(path.dirname(process.execPath), '..', 'Update.exe');
  debug('Spawning `%s` with args `%s`', updateExe, args);
  spawn(updateExe, args, {
    detached: true
  }).on('close', done);
};
var check = function () {
  if (process.platform === 'win32') {
    var cmd = process.argv[1];
    debug('processing squirrel command `%s`', cmd);
    var target = path.basename(process.execPath);
    if (cmd === '--squirrel-install' || cmd === '--squirrel-updated') {
      run(['--createShortcut=' + target + ''], app.quit);
      return true;
    }
    if (cmd === '--squirrel-uninstall') {
      run(['--removeShortcut=' + target + ''], app.quit);
      return true;
    }
    if (cmd === '--squirrel-obsolete') {
      app.quit();
      return true;
    }
  }
  return false;
};
module.exports = check();

/***/ }),

/***/ "./node_modules/electron-squirrel-startup/node_modules/debug/src/browser.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/electron-squirrel-startup/node_modules/debug/src/browser.js ***!
  \**********************************************************************************/
/***/ ((module, exports, __webpack_require__) => {

/**
 * This is the web browser implementation of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = __webpack_require__(/*! ./debug */ "./node_modules/electron-squirrel-startup/node_modules/debug/src/debug.js");
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = 'undefined' != typeof chrome && 'undefined' != typeof chrome.storage ? chrome.storage.local : localstorage();

/**
 * Colors.
 */

exports.colors = ['lightseagreen', 'forestgreen', 'goldenrod', 'dodgerblue', 'darkorchid', 'crimson'];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

function useColors() {
  // NB: In an Electron preload script, document will be defined but not fully
  // initialized. Since we know we're in Chrome, we'll just detect this case
  // explicitly
  if (typeof window !== 'undefined' && window.process && window.process.type === 'renderer') {
    return true;
  }

  // is webkit? http://stackoverflow.com/a/16459606/376773
  // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
  return typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance ||
  // is firebug? http://stackoverflow.com/a/398120/376773
  typeof window !== 'undefined' && window.console && (window.console.firebug || window.console.exception && window.console.table) ||
  // is firefox >= v31?
  // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
  typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 ||
  // double check webkit in userAgent just in case we are in a worker
  typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
}

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

exports.formatters.j = function (v) {
  try {
    return JSON.stringify(v);
  } catch (err) {
    return '[UnexpectedJSONParseError]: ' + err.message;
  }
};

/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs(args) {
  var useColors = this.useColors;
  args[0] = (useColors ? '%c' : '') + this.namespace + (useColors ? ' %c' : ' ') + args[0] + (useColors ? '%c ' : ' ') + '+' + exports.humanize(this.diff);
  if (!useColors) return;
  var c = 'color: ' + this.color;
  args.splice(1, 0, c, 'color: inherit');

  // the final "%c" is somewhat tricky, because there could be other
  // arguments passed either before or after the %c, so we need to
  // figure out the correct index to insert the CSS into
  var index = 0;
  var lastC = 0;
  args[0].replace(/%[a-zA-Z%]/g, function (match) {
    if ('%%' === match) return;
    index++;
    if ('%c' === match) {
      // we only are interested in the *last* %c
      // (the user may have provided their own)
      lastC = index;
    }
  });
  args.splice(lastC, 0, c);
}

/**
 * Invokes `console.log()` when available.
 * No-op when `console.log` is not a "function".
 *
 * @api public
 */

function log() {
  // this hackery is required for IE8/9, where
  // the `console.log` function doesn't have 'apply'
  return 'object' === typeof console && console.log && Function.prototype.apply.call(console.log, console, arguments);
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */

function save(namespaces) {
  try {
    if (null == namespaces) {
      exports.storage.removeItem('debug');
    } else {
      exports.storage.debug = namespaces;
    }
  } catch (e) {}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
  var r;
  try {
    r = exports.storage.debug;
  } catch (e) {}

  // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
  if (!r && typeof process !== 'undefined' && 'env' in process) {
    r = process.env.DEBUG;
  }
  return r;
}

/**
 * Enable namespaces listed in `localStorage.debug` initially.
 */

exports.enable(load());

/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */

function localstorage() {
  try {
    return window.localStorage;
  } catch (e) {}
}

/***/ }),

/***/ "./node_modules/electron-squirrel-startup/node_modules/debug/src/debug.js":
/*!********************************************************************************!*\
  !*** ./node_modules/electron-squirrel-startup/node_modules/debug/src/debug.js ***!
  \********************************************************************************/
/***/ ((module, exports, __webpack_require__) => {

/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = createDebug.debug = createDebug['default'] = createDebug;
exports.coerce = coerce;
exports.disable = disable;
exports.enable = enable;
exports.enabled = enabled;
exports.humanize = __webpack_require__(/*! ms */ "./node_modules/electron-squirrel-startup/node_modules/ms/index.js");

/**
 * The currently active debug mode names, and names to skip.
 */

exports.names = [];
exports.skips = [];

/**
 * Map of special "%n" handling functions, for the debug "format" argument.
 *
 * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
 */

exports.formatters = {};

/**
 * Previous log timestamp.
 */

var prevTime;

/**
 * Select a color.
 * @param {String} namespace
 * @return {Number}
 * @api private
 */

function selectColor(namespace) {
  var hash = 0,
    i;
  for (i in namespace) {
    hash = (hash << 5) - hash + namespace.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }

  return exports.colors[Math.abs(hash) % exports.colors.length];
}

/**
 * Create a debugger with the given `namespace`.
 *
 * @param {String} namespace
 * @return {Function}
 * @api public
 */

function createDebug(namespace) {
  function debug() {
    // disabled?
    if (!debug.enabled) return;
    var self = debug;

    // set `diff` timestamp
    var curr = +new Date();
    var ms = curr - (prevTime || curr);
    self.diff = ms;
    self.prev = prevTime;
    self.curr = curr;
    prevTime = curr;

    // turn the `arguments` into a proper Array
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    args[0] = exports.coerce(args[0]);
    if ('string' !== typeof args[0]) {
      // anything else let's inspect with %O
      args.unshift('%O');
    }

    // apply any `formatters` transformations
    var index = 0;
    args[0] = args[0].replace(/%([a-zA-Z%])/g, function (match, format) {
      // if we encounter an escaped % then don't increase the array index
      if (match === '%%') return match;
      index++;
      var formatter = exports.formatters[format];
      if ('function' === typeof formatter) {
        var val = args[index];
        match = formatter.call(self, val);

        // now we need to remove `args[index]` since it's inlined in the `format`
        args.splice(index, 1);
        index--;
      }
      return match;
    });

    // apply env-specific formatting (colors, etc.)
    exports.formatArgs.call(self, args);
    var logFn = debug.log || exports.log || console.log.bind(console);
    logFn.apply(self, args);
  }
  debug.namespace = namespace;
  debug.enabled = exports.enabled(namespace);
  debug.useColors = exports.useColors();
  debug.color = selectColor(namespace);

  // env-specific initialization logic for debug instances
  if ('function' === typeof exports.init) {
    exports.init(debug);
  }
  return debug;
}

/**
 * Enables a debug mode by namespaces. This can include modes
 * separated by a colon and wildcards.
 *
 * @param {String} namespaces
 * @api public
 */

function enable(namespaces) {
  exports.save(namespaces);
  exports.names = [];
  exports.skips = [];
  var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
  var len = split.length;
  for (var i = 0; i < len; i++) {
    if (!split[i]) continue; // ignore empty strings
    namespaces = split[i].replace(/\*/g, '.*?');
    if (namespaces[0] === '-') {
      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
    } else {
      exports.names.push(new RegExp('^' + namespaces + '$'));
    }
  }
}

/**
 * Disable debug output.
 *
 * @api public
 */

function disable() {
  exports.enable('');
}

/**
 * Returns true if the given mode name is enabled, false otherwise.
 *
 * @param {String} name
 * @return {Boolean}
 * @api public
 */

function enabled(name) {
  var i, len;
  for (i = 0, len = exports.skips.length; i < len; i++) {
    if (exports.skips[i].test(name)) {
      return false;
    }
  }
  for (i = 0, len = exports.names.length; i < len; i++) {
    if (exports.names[i].test(name)) {
      return true;
    }
  }
  return false;
}

/**
 * Coerce `val`.
 *
 * @param {Mixed} val
 * @return {Mixed}
 * @api private
 */

function coerce(val) {
  if (val instanceof Error) return val.stack || val.message;
  return val;
}

/***/ }),

/***/ "./node_modules/electron-squirrel-startup/node_modules/debug/src/index.js":
/*!********************************************************************************!*\
  !*** ./node_modules/electron-squirrel-startup/node_modules/debug/src/index.js ***!
  \********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * Detect Electron renderer process, which is node, but we should
 * treat as a browser.
 */

if (typeof process !== 'undefined' && process.type === 'renderer') {
  module.exports = __webpack_require__(/*! ./browser.js */ "./node_modules/electron-squirrel-startup/node_modules/debug/src/browser.js");
} else {
  module.exports = __webpack_require__(/*! ./node.js */ "./node_modules/electron-squirrel-startup/node_modules/debug/src/node.js");
}

/***/ }),

/***/ "./node_modules/electron-squirrel-startup/node_modules/debug/src/node.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/electron-squirrel-startup/node_modules/debug/src/node.js ***!
  \*******************************************************************************/
/***/ ((module, exports, __webpack_require__) => {

/**
 * Module dependencies.
 */

var tty = __webpack_require__(/*! tty */ "tty");
var util = __webpack_require__(/*! util */ "util");

/**
 * This is the Node.js implementation of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = __webpack_require__(/*! ./debug */ "./node_modules/electron-squirrel-startup/node_modules/debug/src/debug.js");
exports.init = init;
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;

/**
 * Colors.
 */

exports.colors = [6, 2, 3, 4, 5, 1];

/**
 * Build up the default `inspectOpts` object from the environment variables.
 *
 *   $ DEBUG_COLORS=no DEBUG_DEPTH=10 DEBUG_SHOW_HIDDEN=enabled node script.js
 */

exports.inspectOpts = Object.keys(process.env).filter(function (key) {
  return /^debug_/i.test(key);
}).reduce(function (obj, key) {
  // camel-case
  var prop = key.substring(6).toLowerCase().replace(/_([a-z])/g, function (_, k) {
    return k.toUpperCase();
  });

  // coerce string value into JS value
  var val = process.env[key];
  if (/^(yes|on|true|enabled)$/i.test(val)) val = true;else if (/^(no|off|false|disabled)$/i.test(val)) val = false;else if (val === 'null') val = null;else val = Number(val);
  obj[prop] = val;
  return obj;
}, {});

/**
 * The file descriptor to write the `debug()` calls to.
 * Set the `DEBUG_FD` env variable to override with another value. i.e.:
 *
 *   $ DEBUG_FD=3 node script.js 3>debug.log
 */

var fd = parseInt(process.env.DEBUG_FD, 10) || 2;
if (1 !== fd && 2 !== fd) {
  util.deprecate(function () {}, 'except for stderr(2) and stdout(1), any other usage of DEBUG_FD is deprecated. Override debug.log if you want to use a different log function (https://git.io/debug_fd)')();
}
var stream = 1 === fd ? process.stdout : 2 === fd ? process.stderr : createWritableStdioStream(fd);

/**
 * Is stdout a TTY? Colored output is enabled when `true`.
 */

function useColors() {
  return 'colors' in exports.inspectOpts ? Boolean(exports.inspectOpts.colors) : tty.isatty(fd);
}

/**
 * Map %o to `util.inspect()`, all on a single line.
 */

exports.formatters.o = function (v) {
  this.inspectOpts.colors = this.useColors;
  return util.inspect(v, this.inspectOpts).split('\n').map(function (str) {
    return str.trim();
  }).join(' ');
};

/**
 * Map %o to `util.inspect()`, allowing multiple lines if needed.
 */

exports.formatters.O = function (v) {
  this.inspectOpts.colors = this.useColors;
  return util.inspect(v, this.inspectOpts);
};

/**
 * Adds ANSI color escape codes if enabled.
 *
 * @api public
 */

function formatArgs(args) {
  var name = this.namespace;
  var useColors = this.useColors;
  if (useColors) {
    var c = this.color;
    var prefix = '  \u001b[3' + c + ';1m' + name + ' ' + '\u001b[0m';
    args[0] = prefix + args[0].split('\n').join('\n' + prefix);
    args.push('\u001b[3' + c + 'm+' + exports.humanize(this.diff) + '\u001b[0m');
  } else {
    args[0] = new Date().toUTCString() + ' ' + name + ' ' + args[0];
  }
}

/**
 * Invokes `util.format()` with the specified arguments and writes to `stream`.
 */

function log() {
  return stream.write(util.format.apply(util, arguments) + '\n');
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */

function save(namespaces) {
  if (null == namespaces) {
    // If you set a process.env field to null or undefined, it gets cast to the
    // string 'null' or 'undefined'. Just delete instead.
    delete process.env.DEBUG;
  } else {
    process.env.DEBUG = namespaces;
  }
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
  return process.env.DEBUG;
}

/**
 * Copied from `node/src/node.js`.
 *
 * XXX: It's lame that node doesn't expose this API out-of-the-box. It also
 * relies on the undocumented `tty_wrap.guessHandleType()` which is also lame.
 */

function createWritableStdioStream(fd) {
  var stream;
  var tty_wrap = process.binding('tty_wrap');

  // Note stream._type is used for test-module-load-list.js

  switch (tty_wrap.guessHandleType(fd)) {
    case 'TTY':
      stream = new tty.WriteStream(fd);
      stream._type = 'tty';

      // Hack to have stream not keep the event loop alive.
      // See https://github.com/joyent/node/issues/1726
      if (stream._handle && stream._handle.unref) {
        stream._handle.unref();
      }
      break;
    case 'FILE':
      var fs = __webpack_require__(/*! fs */ "fs");
      stream = new fs.SyncWriteStream(fd, {
        autoClose: false
      });
      stream._type = 'fs';
      break;
    case 'PIPE':
    case 'TCP':
      var net = __webpack_require__(/*! net */ "net");
      stream = new net.Socket({
        fd: fd,
        readable: false,
        writable: true
      });

      // FIXME Should probably have an option in net.Socket to create a
      // stream from an existing fd which is writable only. But for now
      // we'll just add this hack and set the `readable` member to false.
      // Test: ./node test/fixtures/echo.js < /etc/passwd
      stream.readable = false;
      stream.read = null;
      stream._type = 'pipe';

      // FIXME Hack to have stream not keep the event loop alive.
      // See https://github.com/joyent/node/issues/1726
      if (stream._handle && stream._handle.unref) {
        stream._handle.unref();
      }
      break;
    default:
      // Probably an error on in uv_guess_handle()
      throw new Error('Implement me. Unknown stream file type!');
  }

  // For supporting legacy API we put the FD here.
  stream.fd = fd;
  stream._isStdio = true;
  return stream;
}

/**
 * Init logic for `debug` instances.
 *
 * Create a new `inspectOpts` object in case `useColors` is set
 * differently for a particular `debug` instance.
 */

function init(debug) {
  debug.inspectOpts = {};
  var keys = Object.keys(exports.inspectOpts);
  for (var i = 0; i < keys.length; i++) {
    debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
  }
}

/**
 * Enable namespaces listed in `process.env.DEBUG` initially.
 */

exports.enable(load());

/***/ }),

/***/ "./node_modules/electron-squirrel-startup/node_modules/ms/index.js":
/*!*************************************************************************!*\
  !*** ./node_modules/electron-squirrel-startup/node_modules/ms/index.js ***!
  \*************************************************************************/
/***/ ((module) => {

/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

module.exports = function (val, options) {
  options = options || {};
  var type = typeof val;
  if (type === 'string' && val.length > 0) {
    return parse(val);
  } else if (type === 'number' && isNaN(val) === false) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }
  throw new Error('val is not a non-empty string or a valid number. val=' + JSON.stringify(val));
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = String(str);
  if (str.length > 100) {
    return;
  }
  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(str);
  if (!match) {
    return;
  }
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
    default:
      return undefined;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtShort(ms) {
  if (ms >= d) {
    return Math.round(ms / d) + 'd';
  }
  if (ms >= h) {
    return Math.round(ms / h) + 'h';
  }
  if (ms >= m) {
    return Math.round(ms / m) + 'm';
  }
  if (ms >= s) {
    return Math.round(ms / s) + 's';
  }
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtLong(ms) {
  return plural(ms, d, 'day') || plural(ms, h, 'hour') || plural(ms, m, 'minute') || plural(ms, s, 'second') || ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, n, name) {
  if (ms < n) {
    return;
  }
  if (ms < n * 1.5) {
    return Math.floor(ms / n) + ' ' + name;
  }
  return Math.ceil(ms / n) + ' ' + name + 's';
}

/***/ }),

/***/ "./node_modules/electron-unhandled/index.js":
/*!**************************************************!*\
  !*** ./node_modules/electron-unhandled/index.js ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const {
  app,
  dialog,
  clipboard
} = __webpack_require__(/*! electron */ "electron");
const cleanStack = __webpack_require__(/*! clean-stack */ "./node_modules/clean-stack/index.js");
const ensureError = __webpack_require__(/*! ensure-error */ "./node_modules/ensure-error/index.js");
const debounce = __webpack_require__(/*! lodash.debounce */ "./node_modules/lodash.debounce/index.js");
const {
  serializeError
} = __webpack_require__(/*! serialize-error */ "./node_modules/electron-unhandled/node_modules/serialize-error/index.js");
let appName;
let invokeErrorHandler;
const ERROR_HANDLER_CHANNEL = 'electron-unhandled.ERROR';
if (process.type === 'renderer') {
  const {
    ipcRenderer
  } = __webpack_require__(/*! electron */ "electron");
  //	Default to 'App' because I don't think we can populate `appName` reliably here without remote or adding more IPC logic
  invokeErrorHandler = async (title = 'App encountered an error', error) => {
    try {
      await ipcRenderer.invoke(ERROR_HANDLER_CHANNEL, title, error);
      return;
    } catch (invokeError) {
      // eslint-disable-line unicorn/catch-error-name
      if (invokeError.message === 'An object could not be cloned.') {
        // 1. If serialization failed, force the passed arg to an error format
        error = ensureError(error);

        // 2. Then attempt serialization on each property, defaulting to undefined otherwise
        const serialized = serializeError(error);
        // 3. Invoke the error handler again with only the serialized error properties
        ipcRenderer.invoke(ERROR_HANDLER_CHANNEL, title, serialized);
      }
    }
  };
} else {
  appName = 'name' in app ? app.name : app.getName();
  const {
    ipcMain
  } = __webpack_require__(/*! electron */ "electron");
  ipcMain.handle(ERROR_HANDLER_CHANNEL, async (evt, title, error) => {
    handleError(title, error);
  });
}
let installed = false;
let options = {
  logger: console.error,
  showDialog: process.type !== 'renderer' && !__webpack_require__(/*! electron-is-dev */ "./node_modules/electron-is-dev/index.js")
};

// NOTE: The ES6 default for title will only be used if the error is invoked from the main process directly. When invoked via the renderer, it will use the ES6 default from invokeErrorHandler
const handleError = (title = `${appName} encountered an error`, error) => {
  error = ensureError(error);
  try {
    options.logger(error);
  } catch (loggerError) {
    // eslint-disable-line unicorn/catch-error-name
    dialog.showErrorBox('The `logger` option function in electron-unhandled threw an error', ensureError(loggerError).stack);
    return;
  }
  if (options.showDialog) {
    const stack = cleanStack(error.stack);
    if (app.isReady()) {
      const buttons = ['OK', process.platform === 'darwin' ? 'Copy Error' : 'Copy error'];
      if (options.reportButton) {
        buttons.push('Report…');
      }

      // Intentionally not using the `title` option as it's not shown on macOS
      const buttonIndex = dialog.showMessageBoxSync({
        type: 'error',
        buttons,
        defaultId: 0,
        noLink: true,
        message: title,
        detail: cleanStack(error.stack, {
          pretty: true
        })
      });
      if (buttonIndex === 1) {
        clipboard.writeText(`${title}\n${stack}`);
      }
      if (buttonIndex === 2) {
        options.reportButton(error);
      }
    } else {
      dialog.showErrorBox(title, stack);
    }
  }
};
module.exports = inputOptions => {
  if (installed) {
    return;
  }
  installed = true;
  options = {
    ...options,
    ...inputOptions
  };
  if (process.type === 'renderer') {
    //	Debounced because some packages, for example React, because of their error boundry feature, throws many identical uncaught errors
    const errorHandler = debounce(error => {
      invokeErrorHandler('Unhandled Error', error);
    }, 200);
    window.addEventListener('error', event => {
      event.preventDefault();
      errorHandler(event.error || event);
    });
    const rejectionHandler = debounce(reason => {
      invokeErrorHandler('Unhandled Promise Rejection', reason);
    }, 200);
    window.addEventListener('unhandledrejection', event => {
      event.preventDefault();
      rejectionHandler(event.reason);
    });
  } else {
    process.on('uncaughtException', error => {
      handleError('Unhandled Error', error);
    });
    process.on('unhandledRejection', error => {
      handleError('Unhandled Promise Rejection', error);
    });
  }
};
module.exports.logError = (error, options) => {
  options = {
    ...options
  };
  if (typeof invokeErrorHandler === 'function') {
    invokeErrorHandler(options.title, error);
  } else {
    handleError(options.title, error);
  }
};

/***/ }),

/***/ "./node_modules/electron-unhandled/node_modules/serialize-error/index.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/electron-unhandled/node_modules/serialize-error/index.js ***!
  \*******************************************************************************/
/***/ ((module) => {

"use strict";


class NonError extends Error {
  constructor(message) {
    super(NonError._prepareSuperMessage(message));
    Object.defineProperty(this, 'name', {
      value: 'NonError',
      configurable: true,
      writable: true
    });
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, NonError);
    }
  }
  static _prepareSuperMessage(message) {
    try {
      return JSON.stringify(message);
    } catch {
      return String(message);
    }
  }
}
const commonProperties = [{
  property: 'name',
  enumerable: false
}, {
  property: 'message',
  enumerable: false
}, {
  property: 'stack',
  enumerable: false
}, {
  property: 'code',
  enumerable: true
}];
const isCalled = Symbol('.toJSON called');
const toJSON = from => {
  from[isCalled] = true;
  const json = from.toJSON();
  delete from[isCalled];
  return json;
};
const destroyCircular = ({
  from,
  seen,
  to_,
  forceEnumerable,
  maxDepth,
  depth
}) => {
  const to = to_ || (Array.isArray(from) ? [] : {});
  seen.push(from);
  if (depth >= maxDepth) {
    return to;
  }
  if (typeof from.toJSON === 'function' && from[isCalled] !== true) {
    return toJSON(from);
  }
  for (const [key, value] of Object.entries(from)) {
    if (typeof Buffer === 'function' && Buffer.isBuffer(value)) {
      to[key] = '[object Buffer]';
      continue;
    }
    if (typeof value === 'function') {
      continue;
    }
    if (!value || typeof value !== 'object') {
      to[key] = value;
      continue;
    }
    if (!seen.includes(from[key])) {
      depth++;
      to[key] = destroyCircular({
        from: from[key],
        seen: seen.slice(),
        forceEnumerable,
        maxDepth,
        depth
      });
      continue;
    }
    to[key] = '[Circular]';
  }
  for (const {
    property,
    enumerable
  } of commonProperties) {
    if (typeof from[property] === 'string') {
      Object.defineProperty(to, property, {
        value: from[property],
        enumerable: forceEnumerable ? true : enumerable,
        configurable: true,
        writable: true
      });
    }
  }
  return to;
};
const serializeError = (value, options = {}) => {
  const {
    maxDepth = Number.POSITIVE_INFINITY
  } = options;
  if (typeof value === 'object' && value !== null) {
    return destroyCircular({
      from: value,
      seen: [],
      forceEnumerable: true,
      maxDepth,
      depth: 0
    });
  }

  // People sometimes throw things besides Error objects…
  if (typeof value === 'function') {
    // `JSON.stringify()` discards functions. We do too, unless a function is thrown directly.
    return `[Function: ${value.name || 'anonymous'}]`;
  }
  return value;
};
const deserializeError = (value, options = {}) => {
  const {
    maxDepth = Number.POSITIVE_INFINITY
  } = options;
  if (value instanceof Error) {
    return value;
  }
  if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
    const newError = new Error(); // eslint-disable-line unicorn/error-message
    destroyCircular({
      from: value,
      seen: [],
      to_: newError,
      maxDepth,
      depth: 0
    });
    return newError;
  }
  return new NonError(value);
};
module.exports = {
  serializeError,
  deserializeError
};

/***/ }),

/***/ "./node_modules/ensure-error/index.js":
/*!********************************************!*\
  !*** ./node_modules/ensure-error/index.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const util = __webpack_require__(/*! util */ "util");
class NonError extends Error {
  constructor(message) {
    super(util.inspect(message));
    this.name = 'NonError';
    Error.captureStackTrace(this, NonError);
  }
}
module.exports = input => {
  if (!(input instanceof Error)) {
    return new NonError(input);
  }
  const error = input;
  if (!error.name) {
    error.name = error.constructor && error.constructor.name || 'Error';
  }
  if (!error.message) {
    error.message = '<No error message>';
  }
  if (!error.stack) {
    error.stack = new Error(error.message).stack.replace(/\n {4}at /, '\n<Original stack missing>$&');
  }
  return error;
};

/***/ }),

/***/ "./node_modules/lodash.debounce/index.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash.debounce/index.js ***!
  \***********************************************/
/***/ ((module) => {

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
var now = function () {
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
    return lastCallTime === undefined || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
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
  return typeof value == 'symbol' || isObjectLike(value) && objectToString.call(value) == symbolTag;
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
    value = isObject(other) ? other + '' : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
}
module.exports = debounce;

/***/ }),

/***/ "./node_modules/python-shell/index.js":
/*!********************************************!*\
  !*** ./node_modules/python-shell/index.js ***!
  \********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.PythonShell = exports.NewlineTransformer = exports.PythonShellErrorWithLogs = exports.PythonShellError = void 0;
const events_1 = __webpack_require__(/*! events */ "events");
const child_process_1 = __webpack_require__(/*! child_process */ "child_process");
const os_1 = __webpack_require__(/*! os */ "os");
const path_1 = __webpack_require__(/*! path */ "path");
const stream_1 = __webpack_require__(/*! stream */ "stream");
const fs_1 = __webpack_require__(/*! fs */ "fs");
const util_1 = __webpack_require__(/*! util */ "util");
function toArray(source) {
  if (typeof source === 'undefined' || source === null) {
    return [];
  } else if (!Array.isArray(source)) {
    return [source];
  }
  return source;
}
/**
 * adds arguments as properties to obj
 */
function extend(obj, ...args) {
  Array.prototype.slice.call(arguments, 1).forEach(function (source) {
    if (source) {
      for (let key in source) {
        obj[key] = source[key];
      }
    }
  });
  return obj;
}
/**
 * gets a random int from 0-10000000000
 */
function getRandomInt() {
  return Math.floor(Math.random() * 10000000000);
}
const execPromise = (0, util_1.promisify)(child_process_1.exec);
class PythonShellError extends Error {}
exports.PythonShellError = PythonShellError;
class PythonShellErrorWithLogs extends PythonShellError {}
exports.PythonShellErrorWithLogs = PythonShellErrorWithLogs;
/**
 * Takes in a string stream and emits batches seperated by newlines
 */
class NewlineTransformer extends stream_1.Transform {
  _transform(chunk, encoding, callback) {
    let data = chunk.toString();
    if (this._lastLineData) data = this._lastLineData + data;
    const lines = data.split(os_1.EOL);
    this._lastLineData = lines.pop();
    //@ts-ignore this works, node ignores the encoding if it's a number
    lines.forEach(this.push.bind(this));
    callback();
  }
  _flush(done) {
    if (this._lastLineData) this.push(this._lastLineData);
    this._lastLineData = null;
    done();
  }
}
exports.NewlineTransformer = NewlineTransformer;
/**
 * An interactive Python shell exchanging data through stdio
 * @param {string} script    The python script to execute
 * @param {object} [options] The launch options (also passed to child_process.spawn)
 * @param [stdoutSplitter] Optional. Splits stdout into chunks, defaulting to splitting into newline-seperated lines
 * @param [stderrSplitter] Optional. splits stderr into chunks, defaulting to splitting into newline-seperated lines
 * @constructor
 */
class PythonShell extends events_1.EventEmitter {
  /**
   * spawns a python process
   * @param scriptPath path to script. Relative to current directory or options.scriptFolder if specified
   * @param options
   * @param stdoutSplitter Optional. Splits stdout into chunks, defaulting to splitting into newline-seperated lines
   * @param stderrSplitter Optional. splits stderr into chunks, defaulting to splitting into newline-seperated lines
   */
  constructor(scriptPath, options, stdoutSplitter = null, stderrSplitter = null) {
    super();
    /**
     * returns either pythonshell func (if val string) or custom func (if val Function)
     */
    function resolve(type, val) {
      if (typeof val === 'string') {
        // use a built-in function using its name
        return PythonShell[type][val];
      } else if (typeof val === 'function') {
        // use a custom function
        return val;
      }
    }
    if (scriptPath.trim().length == 0) throw Error("scriptPath cannot be empty! You must give a script for python to run");
    let self = this;
    let errorData = '';
    events_1.EventEmitter.call(this);
    options = extend({}, PythonShell.defaultOptions, options);
    let pythonPath;
    if (!options.pythonPath) {
      pythonPath = PythonShell.defaultPythonPath;
    } else pythonPath = options.pythonPath;
    let pythonOptions = toArray(options.pythonOptions);
    let scriptArgs = toArray(options.args);
    this.scriptPath = (0, path_1.join)(options.scriptPath || '', scriptPath);
    this.command = pythonOptions.concat(this.scriptPath, scriptArgs);
    this.mode = options.mode || 'text';
    this.formatter = resolve('format', options.formatter || this.mode);
    this.parser = resolve('parse', options.parser || this.mode);
    // We don't expect users to ever format stderr as JSON so we default to text mode
    this.stderrParser = resolve('parse', options.stderrParser || 'text');
    this.terminated = false;
    this.childProcess = (0, child_process_1.spawn)(pythonPath, this.command, options);
    ['stdout', 'stdin', 'stderr'].forEach(function (name) {
      self[name] = self.childProcess[name];
      self.parser && self[name] && self[name].setEncoding(options.encoding || 'utf8');
    });
    // Node buffers stdout&stderr in batches regardless of newline placement
    // This is troublesome if you want to recieve distinct individual messages
    // for example JSON parsing breaks if it recieves partial JSON
    // so we use newlineTransformer to emit each batch seperated by newline
    if (this.parser && this.stdout) {
      if (!stdoutSplitter) stdoutSplitter = new NewlineTransformer();
      // note that setting the encoding turns the chunk into a string
      stdoutSplitter.setEncoding(options.encoding || 'utf8');
      this.stdout.pipe(stdoutSplitter).on('data', chunk => {
        this.emit('message', self.parser(chunk));
      });
    }
    // listen to stderr and emit errors for incoming data
    if (this.stderrParser && this.stderr) {
      if (!stderrSplitter) stderrSplitter = new NewlineTransformer();
      // note that setting the encoding turns the chunk into a string
      stderrSplitter.setEncoding(options.encoding || 'utf8');
      this.stderr.pipe(stderrSplitter).on('data', chunk => {
        this.emit('stderr', self.stderrParser(chunk));
      });
    }
    if (this.stderr) {
      this.stderr.on('data', function (data) {
        errorData += '' + data;
      });
      this.stderr.on('end', function () {
        self.stderrHasEnded = true;
        terminateIfNeeded();
      });
    } else {
      self.stderrHasEnded = true;
    }
    if (this.stdout) {
      this.stdout.on('end', function () {
        self.stdoutHasEnded = true;
        terminateIfNeeded();
      });
    } else {
      self.stdoutHasEnded = true;
    }
    this.childProcess.on('error', function (err) {
      self.emit('error', err);
    });
    this.childProcess.on('exit', function (code, signal) {
      self.exitCode = code;
      self.exitSignal = signal;
      terminateIfNeeded();
    });
    function terminateIfNeeded() {
      if (!self.stderrHasEnded || !self.stdoutHasEnded || self.exitCode == null && self.exitSignal == null) return;
      let err;
      if (self.exitCode && self.exitCode !== 0) {
        if (errorData) {
          err = self.parseError(errorData);
        } else {
          err = new PythonShellError('process exited with code ' + self.exitCode);
        }
        err = extend(err, {
          executable: pythonPath,
          options: pythonOptions.length ? pythonOptions : null,
          script: self.scriptPath,
          args: scriptArgs.length ? scriptArgs : null,
          exitCode: self.exitCode
        });
        // do not emit error if only a callback is used
        if (self.listeners('pythonError').length || !self._endCallback) {
          self.emit('pythonError', err);
        }
      }
      self.terminated = true;
      self.emit('close');
      self._endCallback && self._endCallback(err, self.exitCode, self.exitSignal);
    }
    ;
  }
  /**
   * checks syntax without executing code
   * @returns rejects promise w/ string error output if syntax failure
   */
  static checkSyntax(code) {
    return __awaiter(this, void 0, void 0, function* () {
      const randomInt = getRandomInt();
      const filePath = (0, os_1.tmpdir)() + path_1.sep + `pythonShellSyntaxCheck${randomInt}.py`;
      const writeFilePromise = (0, util_1.promisify)(fs_1.writeFile);
      return writeFilePromise(filePath, code).then(() => {
        return this.checkSyntaxFile(filePath);
      });
    });
  }
  static getPythonPath() {
    return this.defaultOptions.pythonPath ? this.defaultOptions.pythonPath : this.defaultPythonPath;
  }
  /**
   * checks syntax without executing code
   * @returns {Promise} rejects w/ stderr if syntax failure
   */
  static checkSyntaxFile(filePath) {
    return __awaiter(this, void 0, void 0, function* () {
      const pythonPath = this.getPythonPath();
      let compileCommand = `${pythonPath} -m py_compile ${filePath}`;
      return execPromise(compileCommand);
    });
  }
  /**
   * Runs a Python script and returns collected messages as a promise.
   * If the promise is rejected, the err will probably be of type PythonShellErrorWithLogs
   * @param scriptPath   The path to the script to execute
   * @param options  The execution options
   */
  static run(scriptPath, options) {
    return new Promise((resolve, reject) => {
      let pyshell = new PythonShell(scriptPath, options);
      let output = [];
      pyshell.on('message', function (message) {
        output.push(message);
      }).end(function (err) {
        if (err) {
          err.logs = output;
          reject(err);
        } else resolve(output);
      });
    });
  }
  /**
   * Runs the inputted string of python code and returns collected messages as a promise. DO NOT ALLOW UNTRUSTED USER INPUT HERE!
   * @param code   The python code to execute
   * @param options  The execution options
   * @return a promise with the output from the python script
   */
  static runString(code, options) {
    // put code in temp file
    const randomInt = getRandomInt();
    const filePath = os_1.tmpdir + path_1.sep + `pythonShellFile${randomInt}.py`;
    (0, fs_1.writeFileSync)(filePath, code);
    return PythonShell.run(filePath, options);
  }
  static getVersion(pythonPath) {
    if (!pythonPath) pythonPath = this.getPythonPath();
    return execPromise(pythonPath + " --version");
  }
  static getVersionSync(pythonPath) {
    if (!pythonPath) pythonPath = this.getPythonPath();
    return (0, child_process_1.execSync)(pythonPath + " --version").toString();
  }
  /**
   * Parses an error thrown from the Python process through stderr
   * @param  {string|Buffer} data The stderr contents to parse
   * @return {Error} The parsed error with extended stack trace when traceback is available
   */
  parseError(data) {
    let text = '' + data;
    let error;
    if (/^Traceback/.test(text)) {
      // traceback data is available
      let lines = text.trim().split(os_1.EOL);
      let exception = lines.pop();
      error = new PythonShellError(exception);
      error.traceback = data;
      // extend stack trace
      error.stack += os_1.EOL + '    ----- Python Traceback -----' + os_1.EOL + '  ';
      error.stack += lines.slice(1).join(os_1.EOL + '  ');
    } else {
      // otherwise, create a simpler error with stderr contents
      error = new PythonShellError(text);
    }
    return error;
  }
  /**
   * Sends a message to the Python shell through stdin
   * Override this method to format data to be sent to the Python process
   * @returns {PythonShell} The same instance for chaining calls
   */
  send(message) {
    if (!this.stdin) throw new Error("stdin not open for writing");
    let data = this.formatter ? this.formatter(message) : message;
    if (this.mode !== 'binary') data += os_1.EOL;
    this.stdin.write(data);
    return this;
  }
  /**
   * Closes the stdin stream. Unless python is listening for stdin in a loop
   * this should cause the process to finish its work and close.
   * @returns {PythonShell} The same instance for chaining calls
   */
  end(callback) {
    if (this.childProcess.stdin) {
      this.childProcess.stdin.end();
    }
    this._endCallback = callback;
    return this;
  }
  /**
   * Sends a kill signal to the process
   * @returns {PythonShell} The same instance for chaining calls
   */
  kill(signal) {
    this.terminated = this.childProcess.kill(signal);
    return this;
  }
  /**
   * Alias for kill.
   * @deprecated
   */
  terminate(signal) {
    // todo: remove this next breaking release
    return this.kill(signal);
  }
}
exports.PythonShell = PythonShell;
// starting 2020 python2 is deprecated so we choose 3 as default
PythonShell.defaultPythonPath = process.platform != "win32" ? "python3" : "python";
PythonShell.defaultOptions = {}; //allow global overrides for options
// built-in formatters
PythonShell.format = {
  text: function toText(data) {
    if (!data) return '';else if (typeof data !== 'string') return data.toString();
    return data;
  },
  json: function toJson(data) {
    return JSON.stringify(data);
  }
};
//built-in parsers
PythonShell.parse = {
  text: function asText(data) {
    return data;
  },
  json: function asJson(data) {
    return JSON.parse(data);
  }
};
;

/***/ }),

/***/ "child_process":
/*!********************************!*\
  !*** external "child_process" ***!
  \********************************/
/***/ ((module) => {

"use strict";
module.exports = require("child_process");

/***/ }),

/***/ "electron":
/*!***************************!*\
  !*** external "electron" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("electron");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("events");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ "net":
/*!**********************!*\
  !*** external "net" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("net");

/***/ }),

/***/ "os":
/*!*********************!*\
  !*** external "os" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("os");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ "tty":
/*!**********************!*\
  !*** external "tty" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("tty");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __webpack_require__ !== 'undefined') __webpack_require__.ab = __dirname + "/native_modules/";
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
const {
  app,
  BrowserWindow,
  dialog,
  ipcMain
} = __webpack_require__(/*! electron */ "electron");
const path = __webpack_require__(/*! path */ "path");
const isDev = __webpack_require__(/*! electron-is-dev */ "./node_modules/electron-is-dev/index.js");
const unhandled = __webpack_require__(/*! electron-unhandled */ "./node_modules/electron-unhandled/index.js");
const {
  channels
} = __webpack_require__(/*! ../src/shared/constants */ "./src/shared/constants.js");
//const step = require("./shared/runMotor");
const {
  PythonShell
} = __webpack_require__(/*! python-shell */ "./node_modules/python-shell/index.js");
const runPy = __webpack_require__(/*! ./motorFcn */ "./src/motorFcn.js");
unhandled();

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (__webpack_require__(/*! electron-squirrel-startup */ "./node_modules/electron-squirrel-startup/index.js")) {
  app.quit();
}
const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: true,
      preload: '/Users/declanwrynn/personal_projects/test-console/motor-console/.webpack/renderer/main_window/preload.js'
    }
  });

  // and load the index.html of the app.
  mainWindow.loadURL('http://localhost:3000/main_window');

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

ipcMain.handle('channel:step', async (event, args) => {
  const {
    length,
    number
  } = args;
  const response = await runPy(JSON.stringify({
    length: length,
    number: number
  }));
  if (response.number < 0) {
    response.btnText = "NEXT";
  } else {
    response.btnText = "DONE";
  }
  console.log("py response: ");
  console.log(response);
  return response;
});
})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=index.js.map