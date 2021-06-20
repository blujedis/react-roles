/*!
 * React-roles v0.0.1
 * (c) Blujedis <blujedicorp@gmail.com>
 * Released under the MIT License.
 */

import React, { createContext, useContext } from 'react';

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var arrayLikeToArray = createCommonjsModule(function (module) {
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

module.exports = _arrayLikeToArray;
module.exports["default"] = module.exports, module.exports.__esModule = true;
});

unwrapExports(arrayLikeToArray);

var arrayWithoutHoles = createCommonjsModule(function (module) {
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return arrayLikeToArray(arr);
}

module.exports = _arrayWithoutHoles;
module.exports["default"] = module.exports, module.exports.__esModule = true;
});

unwrapExports(arrayWithoutHoles);

var iterableToArray = createCommonjsModule(function (module) {
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

module.exports = _iterableToArray;
module.exports["default"] = module.exports, module.exports.__esModule = true;
});

unwrapExports(iterableToArray);

var unsupportedIterableToArray = createCommonjsModule(function (module) {
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
}

module.exports = _unsupportedIterableToArray;
module.exports["default"] = module.exports, module.exports.__esModule = true;
});

unwrapExports(unsupportedIterableToArray);

var nonIterableSpread = createCommonjsModule(function (module) {
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

module.exports = _nonIterableSpread;
module.exports["default"] = module.exports, module.exports.__esModule = true;
});

unwrapExports(nonIterableSpread);

var toConsumableArray = createCommonjsModule(function (module) {
function _toConsumableArray(arr) {
  return arrayWithoutHoles(arr) || iterableToArray(arr) || unsupportedIterableToArray(arr) || nonIterableSpread();
}

module.exports = _toConsumableArray;
module.exports["default"] = module.exports, module.exports.__esModule = true;
});

var _toConsumableArray = unwrapExports(toConsumableArray);

/**
 * Ensures value returned is an array.
 * 
 * @param value the value to ensure as an array.
 * @param def an optional default value.
 * @returns A normalized array.
 */
function ensureArray(value) {
  var def = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  if (typeof value === 'undefined' || value === '') return ensureArray(def);
  if (!Array.isArray(value)) value = [value];
  return value;
}
/**
 * Removes duplicates from array ensuring unique values.
 * 
 * @param roles list of roles to deduplicate.
 */

function dedupe(roles) {
  return roles.sort().filter(function (v, i, a) {
    return !i || v !== a[i - 1];
  });
}
/**
 * Converts an array to an object literal.
 * 
 * @param arr the array to be converted
 * @returns An object literal containing array values as key: value.
 */

function arrayToMap(arr) {
  return Object.fromEntries(arr.map(function (v) {
    return [v, v];
  }));
}
/**
 * Recusively ensures all roles are cascaded.
 * 
 * @param roleSet an object literal containing role definitions.
 */

function cascade(roleSet) {
  var _cascade = function _cascade() {
    var roles = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var result = roles.reduce(function (a, c) {
      return [].concat(_toConsumableArray(a), [c], _toConsumableArray(_cascade((roleSet[c] || []).filter(function (v) {
        return v !== c;
      }))));
    }, []);
    return dedupe(result); // ensure no dupes.
  };

  for (var k in roleSet) {
    roleSet[k] = _cascade(roleSet[k]);
  }

  return roleSet;
}

function _initManager(rolesMap) {
  var allowCascade = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  // All valid role keys.
  var keys = Object.keys(rolesMap);
  var roleSet = init(rolesMap);
  var api = {
    roleSet: roleSet,
    getRole: getRole,
    hasRole: hasRole,
    authorize: authorize
  };
  /**
   * Ensure all values are valid keys in map.
   * 
   * @param map the initialized role map.
   * @returns Validated roles map.
   */

  function validate(map) {
    for (var k in map) {
      var values = ensureArray(map[k]);
      var invalidKeys = values.filter(function (v) {
        return !keys.includes(v);
      });
      if (invalidKeys.length) throw new Error("Roles validation failed, invalid keys detected: [".concat(invalidKeys.join(', '), "]")); // Ensure contains self.

      if (!values.includes(k)) values.unshift(k);
      map[k] = values;
    } // shape changed cast as validated.


    return map;
  }
  /**
   * Validates and cascades roles map.
   * 
   * @param map the roles map to be initialized.
   * @returns A validated roles map.
   */


  function init(map) {
    var validatedMap = validate(map);
    if (!allowCascade) return validatedMap;
    return cascade(validatedMap);
  }
  /**
   * Gets a role set by key.
   * 
   * @param role the role key for obtaining role set.
   * @returns An array of roles for key.
   */


  function getRole(role) {
    return roleSet[role];
  }
  /**
   * A merged set of roles.
   * 
   * @param roles the role keys to be merged.
   * @returns An array of role sets merged.
   */


  function mergeRoles(roles) {
    roles = ensureArray(roles);
    return roles.reduce(function (a, c) {
      return [].concat(_toConsumableArray(a), _toConsumableArray(getRole(c)));
    }, []);
  }
  /**
   * Checks if source roles contain target or required roles.
   * 
   * @param roles the source roles to be compared.
   * @param requires the target roles which are required.
   * @returns A boolean if has role(s).
   */


  function hasRole(roles, requires) {
    var sources = ensureArray(roles);
    var targets = ensureArray(requires);
    if (allowCascade) sources = mergeRoles(sources);
    return sources.some(function (r) {
      return targets.includes(r);
    });
  }

  function authorize(role) {
    for (var _len = arguments.length, roles = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      roles[_key - 1] = arguments[_key];
    }

    roles = [].concat(_toConsumableArray(ensureArray(role)), _toConsumableArray(roles));
    var _denied = [];
    var _allowed = [];
    var authApi = {
      allow: allow,
      deny: deny,
      validate: validate
    };

    function allow(allowed) {
      for (var _len2 = arguments.length, alloweds = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        alloweds[_key2 - 1] = arguments[_key2];
      }

      _allowed = [].concat(_toConsumableArray(ensureArray(allowed)), alloweds);
      return authApi;
    }

    function deny(denied) {
      for (var _len3 = arguments.length, denieds = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        denieds[_key3 - 1] = arguments[_key3];
      }

      _denied = [].concat(_toConsumableArray(ensureArray(denied)), denieds);
      return authApi;
    }

    function validate() {
      var failResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var successResponse = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      if (hasRole(roles, _denied)) return failResponse;
      if (!hasRole(roles, _allowed)) return failResponse;
      return successResponse;
    }

    return authApi;
  }

  return api;
}
function initManager(rolesMap, allowCascade) {
  return _initManager(rolesMap, allowCascade);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function initProvider(manager) {
  var Context = /*#__PURE__*/createContext(manager);

  var Provider = function Provider(_ref) {
    var initialState = _ref.initialState,
        children = _ref.children;

    var _initialState = initialState || manager;

    return /*#__PURE__*/React.createElement(Context.Provider, {
      value: _initialState
    }, children);
  };

  var Consumer = Context.Consumer;
  Context.displayName = 'ReactRolesManager';

  var useRoles = function useRoles() {
    return useContext(Context);
  };

  return {
    Context: Context,
    Provider: Provider,
    Consumer: Consumer,
    useRoles: useRoles
  };
}

var classCallCheck = createCommonjsModule(function (module) {
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

module.exports = _classCallCheck;
module.exports["default"] = module.exports, module.exports.__esModule = true;
});

var _classCallCheck = unwrapExports(classCallCheck);

var createClass = createCommonjsModule(function (module) {
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

module.exports = _createClass;
module.exports["default"] = module.exports, module.exports.__esModule = true;
});

var _createClass = unwrapExports(createClass);

// // Hack so we get correct types in overloads.
var RoleManagerWrapper = /*#__PURE__*/function () {
  function RoleManagerWrapper() {
    _classCallCheck(this, RoleManagerWrapper);
  }

  _createClass(RoleManagerWrapper, [{
    key: "wrapped",
    value: function wrapped(roleMap, allowCascade) {
      return _initManager(roleMap, allowCascade);
    }
  }]);

  return RoleManagerWrapper;
}(); // export type Acl = Record<string | number, string | number> | readonly any[];
// export type Roles<T> = T extends readonly any[] ? Record<string, T[number] | T[number][]> : Record<string, Role<T> | Role<T>[]>;
// export type RoleManager<A extends Acl = any, K extends AnonRole<A> = any, R extends Roles<A> = Roles<A>> = ReturnType<RoleManagerWrapper<A, K, R>['wrapped']>;
// export type AnonRole<T> = T extends readonly any[] ? T[number] : T[keyof T];
// export type Role<T> = T[keyof T];
// export type RoleMap<T extends Record<string | number, string | number>> = { [K in keyof T]?: Role<T> | Role<T>[]; };
// export type RoleMapInternal<T extends Record<string | number, string | number>> = { [K in keyof T]: Role<T>[]; };

var RoleManager = {
  init: initManager,
  initProvider: initProvider,
  arrayToMap: arrayToMap
};

export default RoleManager;
export { RoleManagerWrapper };
