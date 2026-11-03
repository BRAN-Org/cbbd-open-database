function C0(c) {
  return c && c.__esModule && Object.prototype.hasOwnProperty.call(c, "default") ? c.default : c;
}
var mh = { exports: {} }, pe = {};
/**
* @license React
* react.production.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var gh;
function P0() {
  if (gh) return pe;
  gh = 1;
  var c = Symbol.for("react.transitional.element"), N = Symbol.for("react.portal"), k = Symbol.for("react.fragment"), s = Symbol.for("react.strict_mode"), T = Symbol.for("react.profiler"), L = Symbol.for("react.consumer"), $ = Symbol.for("react.context"), B = Symbol.for("react.forward_ref"), I = Symbol.for("react.suspense"), j = Symbol.for("react.memo"), M = Symbol.for("react.lazy"), v = Symbol.for("react.activity"), O = Symbol.for("react.view_transition"), ee = Symbol.iterator;
  function ne(d) {
    return d === null || typeof d != "object" ? null : (d = ee && d[ee] || d["@@iterator"], typeof d == "function" ? d : null);
  }
  var oe = { isMounted: function() {
    return !1;
  }, enqueueForceUpdate: function() {
  }, enqueueReplaceState: function() {
  }, enqueueSetState: function() {
  } }, Z = Object.assign, V = {};
  function Pe(d, z, J) {
    this.props = d, this.context = z, this.refs = V, this.updater = J || oe;
  }
  Pe.prototype.isReactComponent = {}, Pe.prototype.setState = function(d, z) {
    if (typeof d != "object" && typeof d != "function" && d != null) throw Error("takes an object of state variables to update or a function which returns an object of state variables.");
    this.updater.enqueueSetState(this, d, z, "setState");
  }, Pe.prototype.forceUpdate = function(d) {
    this.updater.enqueueForceUpdate(this, d, "forceUpdate");
  };
  function ge() {
  }
  ge.prototype = Pe.prototype;
  function ie(d, z, J) {
    this.props = d, this.context = z, this.refs = V, this.updater = J || oe;
  }
  var fe = ie.prototype = new ge();
  fe.constructor = ie, Z(fe, Pe.prototype), fe.isPureReactComponent = !0;
  var le = Array.isArray;
  function W() {
  }
  var H = { H: null, A: null, T: null, S: null }, Ee = Object.prototype.hasOwnProperty;
  function Ne(d, z, J) {
    var G = J.ref;
    return { $$typeof: c, type: d, key: z, ref: G !== void 0 ? G : null, props: J };
  }
  function Re(d, z) {
    return Ne(d.type, z, d.props);
  }
  function Qe(d) {
    return typeof d == "object" && d !== null && d.$$typeof === c;
  }
  function Ge(d) {
    var z = { "=": "=0", ":": "=2" };
    return "$" + d.replace(/[=:]/g, function(J) {
      return z[J];
    });
  }
  var mn = /\/+/g;
  function Ke(d, z) {
    return typeof d == "object" && d !== null && d.key != null ? Ge("" + d.key) : z.toString(36);
  }
  function C(d) {
    switch (d.status) {
      case "fulfilled":
        return d.value;
      case "rejected":
        throw d.reason;
      default:
        switch (typeof d.status == "string" ? d.then(W, W) : (d.status = "pending", d.then(function(z) {
          d.status === "pending" && (d.status = "fulfilled", d.value = z);
        }, function(z) {
          d.status === "pending" && (d.status = "rejected", d.reason = z);
        })), d.status) {
          case "fulfilled":
            return d.value;
          case "rejected":
            throw d.reason;
        }
    }
    throw d;
  }
  function X(d, z, J, G, me) {
    var be = typeof d;
    (be === "undefined" || be === "boolean") && (d = null);
    var he = !1;
    if (d === null) he = !0;
    else switch (be) {
      case "bigint":
      case "string":
      case "number":
        he = !0;
        break;
      case "object":
        switch (d.$$typeof) {
          case c:
          case N:
            he = !0;
            break;
          case M:
            return he = d._init, X(he(d._payload), z, J, G, me);
        }
    }
    if (he) return me = me(d), he = G === "" ? "." + Ke(d, 0) : G, le(me) ? (J = "", he != null && (J = he.replace(mn, "$&/") + "/"), X(me, z, J, "", function(A) {
      return A;
    })) : me != null && (Qe(me) && (me = Re(me, J + (me.key == null || d && d.key === me.key ? "" : ("" + me.key).replace(mn, "$&/") + "/") + he)), z.push(me)), 1;
    he = 0;
    var q = G === "" ? "." : G + ":";
    if (le(d)) for (var te = 0; te < d.length; te++) G = d[te], be = q + Ke(G, te), he += X(G, z, J, be, me);
    else if (te = ne(d), typeof te == "function") for (d = te.call(d), te = 0; !(G = d.next()).done; ) G = G.value, be = q + Ke(G, te++), he += X(G, z, J, be, me);
    else if (be === "object") {
      if (typeof d.then == "function") return X(C(d), z, J, G, me);
      throw z = String(d), Error("Objects are not valid as a React child (found: " + (z === "[object Object]" ? "object with keys {" + Object.keys(d).join(", ") + "}" : z) + "). If you meant to render a collection of children, use an array instead.");
    }
    return he;
  }
  function re(d, z, J) {
    if (d == null) return d;
    var G = [], me = 0;
    return X(d, G, "", "", function(be) {
      return z.call(J, be, me++);
    }), G;
  }
  function Fe(d) {
    if (d._status === -1) {
      var z = d._result, J = z();
      J.then(function(G) {
        (d._status === 0 || d._status === -1) && (d._status = 1, d._result = G, J.status === void 0 && (J.status = "fulfilled", J.value = G));
      }, function(G) {
        (d._status === 0 || d._status === -1) && (d._status = 2, d._result = G, J.status === void 0 && (J.status = "rejected", J.reason = G));
      }), d._status === -1 && (d._status = 0, d._result = J);
    }
    if (d._status === 1) return d._result.default;
    throw d._result;
  }
  var ze = typeof reportError == "function" ? reportError : function(d) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var z = new window.ErrorEvent("error", { bubbles: !0, cancelable: !0, message: typeof d == "object" && d !== null && typeof d.message == "string" ? String(d.message) : String(d), error: d });
      if (!window.dispatchEvent(z)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", d);
      return;
    }
    console.error(d);
  };
  function xn(d) {
    var z = H.T, J = {};
    J.types = z !== null ? z.types : null, H.T = J;
    try {
      var G = d(), me = H.S;
      me !== null && me(J, G), typeof G == "object" && G !== null && typeof G.then == "function" && G.then(W, ze);
    } catch (be) {
      ze(be);
    } finally {
      z !== null && J.types !== null && (z.types = J.types), H.T = z;
    }
  }
  function Dn(d) {
    var z = H.T;
    if (z !== null) {
      var J = z.types;
      J === null ? z.types = [d] : J.indexOf(d) === -1 && J.push(d);
    } else xn(Dn.bind(null, d));
  }
  var Jn = { map: re, forEach: function(d, z, J) {
    re(d, function() {
      z.apply(this, arguments);
    }, J);
  }, count: function(d) {
    var z = 0;
    return re(d, function() {
      z++;
    }), z;
  }, toArray: function(d) {
    return re(d, function(z) {
      return z;
    }) || [];
  }, only: function(d) {
    if (!Qe(d)) throw Error("React.Children.only expected to receive a single React element child.");
    return d;
  } };
  return pe.Activity = v, pe.Children = Jn, pe.Component = Pe, pe.Fragment = k, pe.Profiler = T, pe.PureComponent = ie, pe.StrictMode = s, pe.Suspense = I, pe.ViewTransition = O, pe.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = H, pe.__COMPILER_RUNTIME = { __proto__: null, c: function(d) {
    return H.H.useMemoCache(d);
  } }, pe.addTransitionType = Dn, pe.cache = function(d) {
    return function() {
      return d.apply(null, arguments);
    };
  }, pe.cacheSignal = function() {
    return null;
  }, pe.cloneElement = function(d, z, J) {
    if (d == null) throw Error("The argument must be a React element, but you passed " + d + ".");
    var G = Z({}, d.props), me = d.key;
    if (z != null) for (be in z.key !== void 0 && (me = "" + z.key), z) !Ee.call(z, be) || be === "key" || be === "__self" || be === "__source" || be === "ref" && z.ref === void 0 || (G[be] = z[be]);
    var be = arguments.length - 2;
    if (be === 1) G.children = J;
    else if (1 < be) {
      for (var he = Array(be), q = 0; q < be; q++) he[q] = arguments[q + 2];
      G.children = he;
    }
    return Ne(d.type, me, G);
  }, pe.createContext = function(d) {
    return d = { $$typeof: $, _currentValue: d, _currentValue2: d, _threadCount: 0, Provider: null, Consumer: null }, d.Provider = d, d.Consumer = { $$typeof: L, _context: d }, d;
  }, pe.createElement = function(d, z, J) {
    var G, me = {}, be = null;
    if (z != null) for (G in z.key !== void 0 && (be = "" + z.key), z) Ee.call(z, G) && G !== "key" && G !== "__self" && G !== "__source" && (me[G] = z[G]);
    var he = arguments.length - 2;
    if (he === 1) me.children = J;
    else if (1 < he) {
      for (var q = Array(he), te = 0; te < he; te++) q[te] = arguments[te + 2];
      me.children = q;
    }
    if (d && d.defaultProps) for (G in he = d.defaultProps, he) me[G] === void 0 && (me[G] = he[G]);
    return Ne(d, be, me);
  }, pe.createRef = function() {
    return { current: null };
  }, pe.forwardRef = function(d) {
    return { $$typeof: B, render: d };
  }, pe.isValidElement = Qe, pe.lazy = function(d) {
    return { $$typeof: M, _payload: { _status: -1, _result: d }, _init: Fe };
  }, pe.memo = function(d, z) {
    return { $$typeof: j, type: d, compare: z === void 0 ? null : z };
  }, pe.startTransition = xn, pe.unstable_useCacheRefresh = function() {
    return H.H.useCacheRefresh();
  }, pe.use = function(d) {
    return H.H.use(d);
  }, pe.useActionState = function(d, z, J) {
    return H.H.useActionState(d, z, J);
  }, pe.useCallback = function(d, z) {
    return H.H.useCallback(d, z);
  }, pe.useContext = function(d) {
    return H.H.useContext(d);
  }, pe.useDebugValue = function() {
  }, pe.useDeferredValue = function(d, z) {
    return H.H.useDeferredValue(d, z);
  }, pe.useEffect = function(d, z) {
    return H.H.useEffect(d, z);
  }, pe.useEffectEvent = function(d) {
    return H.H.useEffectEvent(d);
  }, pe.useId = function() {
    return H.H.useId();
  }, pe.useImperativeHandle = function(d, z, J) {
    return H.H.useImperativeHandle(d, z, J);
  }, pe.useInsertionEffect = function(d, z) {
    return H.H.useInsertionEffect(d, z);
  }, pe.useLayoutEffect = function(d, z) {
    return H.H.useLayoutEffect(d, z);
  }, pe.useMemo = function(d, z) {
    return H.H.useMemo(d, z);
  }, pe.useOptimistic = function(d, z) {
    return H.H.useOptimistic(d, z);
  }, pe.useReducer = function(d, z, J) {
    return H.H.useReducer(d, z, J);
  }, pe.useRef = function(d) {
    return H.H.useRef(d);
  }, pe.useState = function(d) {
    return H.H.useState(d);
  }, pe.useSyncExternalStore = function(d, z, J) {
    return H.H.useSyncExternalStore(d, z, J);
  }, pe.useTransition = function() {
    return H.H.useTransition();
  }, pe.version = "19.3.0", pe;
}
var vh;
function Qu() {
  return vh || (vh = 1, mh.exports = P0()), mh.exports;
}
var xe = Qu();
const Xo = C0(xe);
var Hu = { exports: {} }, Wa = {}, yh = { exports: {} }, bh = {};
/**
* @license React
* scheduler.production.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var wh;
function z0() {
  return wh || (wh = 1, (function(c) {
    function N(C, X) {
      var re = C.length;
      C.push(X);
      e: for (; 0 < re; ) {
        var Fe = re - 1 >>> 1, ze = C[Fe];
        if (0 < T(ze, X)) C[Fe] = X, C[re] = ze, re = Fe;
        else break e;
      }
    }
    function k(C) {
      return C.length === 0 ? null : C[0];
    }
    function s(C) {
      if (C.length === 0) return null;
      var X = C[0], re = C.pop();
      if (re !== X) {
        C[0] = re;
        e: for (var Fe = 0, ze = C.length, xn = ze >>> 1; Fe < xn; ) {
          var Dn = 2 * (Fe + 1) - 1, Jn = C[Dn], d = Dn + 1, z = C[d];
          if (0 > T(Jn, re)) d < ze && 0 > T(z, Jn) ? (C[Fe] = z, C[d] = re, Fe = d) : (C[Fe] = Jn, C[Dn] = re, Fe = Dn);
          else if (d < ze && 0 > T(z, re)) C[Fe] = z, C[d] = re, Fe = d;
          else break e;
        }
      }
      return X;
    }
    function T(C, X) {
      var re = C.sortIndex - X.sortIndex;
      return re !== 0 ? re : C.id - X.id;
    }
    if (c.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var L = performance;
      c.unstable_now = function() {
        return L.now();
      };
    } else {
      var $ = Date, B = $.now();
      c.unstable_now = function() {
        return $.now() - B;
      };
    }
    var I = [], j = [], M = 1, v = null, O = 3, ee = !1, ne = !1, oe = !1, Z = !1, V = typeof setTimeout == "function" ? setTimeout : null, Pe = typeof clearTimeout == "function" ? clearTimeout : null, ge = typeof setImmediate < "u" ? setImmediate : null;
    function ie(C) {
      for (var X = k(j); X !== null; ) {
        if (X.callback === null) s(j);
        else if (X.startTime <= C) s(j), X.sortIndex = X.expirationTime, N(I, X);
        else break;
        X = k(j);
      }
    }
    function fe(C) {
      if (oe = !1, ie(C), !ne) if (k(I) !== null) ne = !0, le || (le = !0, Qe());
      else {
        var X = k(j);
        X !== null && Ke(fe, X.startTime - C);
      }
    }
    var le = !1, W = -1, H = 5, Ee = -1;
    function Ne() {
      return Z ? !0 : !(c.unstable_now() - Ee < H);
    }
    function Re() {
      if (Z = !1, le) {
        var C = c.unstable_now();
        Ee = C;
        var X = !0;
        try {
          e: {
            ne = !1, oe && (oe = !1, Pe(W), W = -1), ee = !0;
            var re = O;
            try {
              n: {
                for (ie(C), v = k(I); v !== null && !(v.expirationTime > C && Ne()); ) {
                  var Fe = v.callback;
                  if (typeof Fe == "function") {
                    v.callback = null, O = v.priorityLevel;
                    var ze = Fe(v.expirationTime <= C);
                    if (C = c.unstable_now(), typeof ze == "function") {
                      v.callback = ze, ie(C), X = !0;
                      break n;
                    }
                    v === k(I) && s(I), ie(C);
                  } else s(I);
                  v = k(I);
                }
                if (v !== null) X = !0;
                else {
                  var xn = k(j);
                  xn !== null && Ke(fe, xn.startTime - C), X = !1;
                }
              }
              break e;
            } finally {
              v = null, O = re, ee = !1;
            }
            X = void 0;
          }
        } finally {
          X ? Qe() : le = !1;
        }
      }
    }
    var Qe;
    if (typeof ge == "function") Qe = function() {
      ge(Re);
    };
    else if (typeof MessageChannel < "u") {
      var Ge = new MessageChannel(), mn = Ge.port2;
      Ge.port1.onmessage = Re, Qe = function() {
        mn.postMessage(null);
      };
    } else Qe = function() {
      V(Re, 0);
    };
    function Ke(C, X) {
      W = V(function() {
        C(c.unstable_now());
      }, X);
    }
    c.unstable_IdlePriority = 5, c.unstable_ImmediatePriority = 1, c.unstable_LowPriority = 4, c.unstable_NormalPriority = 3, c.unstable_Profiling = null, c.unstable_UserBlockingPriority = 2, c.unstable_cancelCallback = function(C) {
      C.callback = null;
    }, c.unstable_forceFrameRate = function(C) {
      0 > C || 125 < C ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : H = 0 < C ? Math.floor(1e3 / C) : 5;
    }, c.unstable_getCurrentPriorityLevel = function() {
      return O;
    }, c.unstable_next = function(C) {
      switch (O) {
        case 1:
        case 2:
        case 3:
          var X = 3;
          break;
        default:
          X = O;
      }
      var re = O;
      O = X;
      try {
        return C();
      } finally {
        O = re;
      }
    }, c.unstable_requestPaint = function() {
      Z = !0;
    }, c.unstable_runWithPriority = function(C, X) {
      switch (C) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          C = 3;
      }
      var re = O;
      O = C;
      try {
        return X();
      } finally {
        O = re;
      }
    }, c.unstable_scheduleCallback = function(C, X, re) {
      var Fe = c.unstable_now();
      switch (typeof re == "object" && re !== null ? (re = re.delay, re = typeof re == "number" && 0 < re ? Fe + re : Fe) : re = Fe, C) {
        case 1:
          var ze = -1;
          break;
        case 2:
          ze = 250;
          break;
        case 5:
          ze = 1073741823;
          break;
        case 4:
          ze = 1e4;
          break;
        default:
          ze = 5e3;
      }
      return ze = re + ze, C = { id: M++, callback: X, priorityLevel: C, startTime: re, expirationTime: ze, sortIndex: -1 }, re > Fe ? (C.sortIndex = re, N(j, C), k(I) === null && C === k(j) && (oe ? (Pe(W), W = -1) : oe = !0, Ke(fe, re - Fe))) : (C.sortIndex = ze, N(I, C), ne || ee || (ne = !0, le || (le = !0, Qe()))), C;
    }, c.unstable_shouldYield = Ne, c.unstable_wrapCallback = function(C) {
      var X = O;
      return function() {
        var re = O;
        O = X;
        try {
          return C.apply(this, arguments);
        } finally {
          O = re;
        }
      };
    };
  })(bh)), bh;
}
var kh;
function _0() {
  return kh || (kh = 1, yh.exports = z0()), yh.exports;
}
var qu = { exports: {} }, An = {};
/**
* @license React
* react-dom.production.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var Sh;
function L0() {
  if (Sh) return An;
  Sh = 1;
  var c = Qu();
  function N(M) {
    var v = "https://react.dev/errors/" + M;
    if (1 < arguments.length) {
      v += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var O = 2; O < arguments.length; O++) v += "&args[]=" + encodeURIComponent(arguments[O]);
    }
    return "Minified React error #" + M + "; visit " + v + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function k() {
  }
  var s = { d: { f: k, r: function() {
    throw Error(N(522));
  }, D: k, C: k, L: k, m: k, X: k, S: k, M: k }, p: 0, findDOMNode: null }, T = Symbol.for("react.portal"), L = Symbol.for("react.recoverable"), $ = Symbol.for("react.optimistic_key");
  function B(M, v, O) {
    var ee = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return { $$typeof: T, key: ee == null ? null : ee === $ ? $ : "" + ee, children: M, containerInfo: v, implementation: O };
  }
  var I = c.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function j(M, v) {
    if (M === "font") return "";
    if (typeof v == "string") return v === "use-credentials" ? v : "";
  }
  return An.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = s, An.browser = function(M) {
    return { $$typeof: L, _reason: M };
  }, An.createPortal = function(M, v) {
    var O = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!v || v.nodeType !== 1 && v.nodeType !== 9 && v.nodeType !== 11) throw Error(N(299));
    return B(M, v, null, O);
  }, An.flushSync = function(M) {
    var v = I.T, O = s.p;
    try {
      if (I.T = null, s.p = 2, M) return M();
    } finally {
      I.T = v, s.p = O, s.d.f();
    }
  }, An.preconnect = function(M, v) {
    typeof M == "string" && (v ? (v = v.crossOrigin, v = typeof v == "string" ? v === "use-credentials" ? v : "" : void 0) : v = null, s.d.C(M, v));
  }, An.prefetchDNS = function(M) {
    typeof M == "string" && s.d.D(M);
  }, An.preinit = function(M, v) {
    if (typeof M == "string" && v && typeof v.as == "string") {
      var O = v.as, ee = j(O, v.crossOrigin), ne = typeof v.integrity == "string" ? v.integrity : void 0, oe = typeof v.fetchPriority == "string" ? v.fetchPriority : void 0;
      O === "style" ? s.d.S(M, typeof v.precedence == "string" ? v.precedence : void 0, { crossOrigin: ee, integrity: ne, fetchPriority: oe }) : O === "script" && s.d.X(M, { crossOrigin: ee, integrity: ne, fetchPriority: oe, nonce: typeof v.nonce == "string" ? v.nonce : void 0 });
    }
  }, An.preinitModule = function(M, v) {
    if (typeof M == "string") if (typeof v == "object" && v !== null) {
      if (v.as == null || v.as === "script") {
        var O = j(v.as, v.crossOrigin);
        s.d.M(M, { crossOrigin: O, integrity: typeof v.integrity == "string" ? v.integrity : void 0, nonce: typeof v.nonce == "string" ? v.nonce : void 0, fetchPriority: typeof v.fetchPriority == "string" ? v.fetchPriority : void 0 });
      }
    } else v == null && s.d.M(M);
  }, An.preload = function(M, v) {
    if (typeof M == "string" && typeof v == "object" && v !== null && typeof v.as == "string") {
      var O = v.as, ee = j(O, v.crossOrigin);
      s.d.L(M, O, { crossOrigin: ee, integrity: typeof v.integrity == "string" ? v.integrity : void 0, nonce: typeof v.nonce == "string" ? v.nonce : void 0, type: typeof v.type == "string" ? v.type : void 0, fetchPriority: typeof v.fetchPriority == "string" ? v.fetchPriority : void 0, referrerPolicy: typeof v.referrerPolicy == "string" ? v.referrerPolicy : void 0, imageSrcSet: typeof v.imageSrcSet == "string" ? v.imageSrcSet : void 0, imageSizes: typeof v.imageSizes == "string" ? v.imageSizes : void 0, media: typeof v.media == "string" ? v.media : void 0 });
    }
  }, An.preloadModule = function(M, v) {
    if (typeof M == "string") if (v) {
      var O = j(v.as, v.crossOrigin);
      s.d.m(M, { as: typeof v.as == "string" && v.as !== "script" ? v.as : void 0, crossOrigin: O, integrity: typeof v.integrity == "string" ? v.integrity : void 0, nonce: typeof v.nonce == "string" ? v.nonce : void 0, fetchPriority: typeof v.fetchPriority == "string" ? v.fetchPriority : void 0 });
    } else s.d.m(M);
  }, An.requestFormReset = function(M) {
    s.d.r(M);
  }, An.unstable_batchedUpdates = function(M, v) {
    return M(v);
  }, An.useFormState = function(M, v, O) {
    return I.H.useFormState(M, v, O);
  }, An.useFormStatus = function() {
    return I.H.useHostTransitionStatus();
  }, An.version = "19.3.0", An;
}
var xh;
function M0() {
  if (xh) return qu.exports;
  xh = 1;
  function c() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(c);
    } catch (N) {
      console.error(N);
    }
  }
  return c(), qu.exports = L0(), qu.exports;
}
/**
* @license React
* react-dom-client.production.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var Eh;
function T0() {
  if (Eh) return Wa;
  Eh = 1;
  var c = _0(), N = Qu(), k = M0();
  function s(e) {
    var n = "https://react.dev/errors/" + e;
    if (1 < arguments.length) {
      n += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var r = 2; r < arguments.length; r++) n += "&args[]=" + encodeURIComponent(arguments[r]);
    }
    return "Minified React error #" + e + "; visit " + n + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function T(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
  }
  function L(e) {
    for (var n = e, r = n; r && !r.alternate; ) n = r, (n.flags & 4098) !== 0 && (e = n.return), r = n.return;
    for (; n.return; ) n = n.return;
    return n.tag === 3 ? e : null;
  }
  function $(e) {
    if (e.tag === 13) {
      var n = e.memoizedState;
      if (n === null && (e = e.alternate, e !== null && (n = e.memoizedState)), n !== null) return n.dehydrated;
    }
    return null;
  }
  function B(e) {
    if (e.tag === 31) {
      var n = e.memoizedState;
      if (n === null && (e = e.alternate, e !== null && (n = e.memoizedState)), n !== null) return n.dehydrated;
    }
    return null;
  }
  function I(e) {
    if (L(e) !== e) throw Error(s(188));
  }
  function j(e) {
    var n = e.alternate;
    if (!n) {
      if (n = L(e), n === null) throw Error(s(188));
      return n !== e ? null : e;
    }
    for (var r = e, t = n; ; ) {
      var o = r.return;
      if (o === null) break;
      var a = o.alternate;
      if (a === null) {
        if (t = o.return, t !== null) {
          r = t;
          continue;
        }
        break;
      }
      if (o.child === a.child) {
        for (a = o.child; a; ) {
          if (a === r) return I(o), e;
          if (a === t) return I(o), n;
          a = a.sibling;
        }
        throw Error(s(188));
      }
      if (r.return !== t.return) r = o, t = a;
      else {
        for (var i = !1, l = o.child; l; ) {
          if (l === r) {
            i = !0, r = o, t = a;
            break;
          }
          if (l === t) {
            i = !0, t = o, r = a;
            break;
          }
          l = l.sibling;
        }
        if (!i) {
          for (l = a.child; l; ) {
            if (l === r) {
              i = !0, r = a, t = o;
              break;
            }
            if (l === t) {
              i = !0, t = a, r = o;
              break;
            }
            l = l.sibling;
          }
          if (!i) throw Error(s(189));
        }
      }
      if (r.alternate !== t) throw Error(s(190));
    }
    if (r.tag !== 3) throw Error(s(188));
    return r.stateNode.current === r ? e : n;
  }
  function M(e) {
    var n = e.tag;
    if (n === 5 || n === 26 || n === 27 || n === 6) return e;
    for (e = e.child; e !== null; ) {
      if (n = M(e), n !== null) return n;
      e = e.sibling;
    }
    return null;
  }
  function v(e, n, r, t, o, a) {
    for (; e !== null; ) {
      if ((e.tag === 5 || e.tag === 27 || e.tag === 6) && r(e, t, o, a) || (e.tag !== 22 || e.memoizedState === null) && (n || e.tag !== 5 && e.tag !== 27) && v(e.child, n, r, t, o, a)) return !0;
      e = e.sibling;
    }
    return !1;
  }
  function O(e) {
    for (e = e.return; e !== null; ) {
      if (e.tag === 3 || e.tag === 5 || e.tag === 27) return e;
      e = e.return;
    }
    return null;
  }
  function ee(e) {
    var n = !1;
    for (e = e.return; e !== null && (e.tag === 4 && (n = !0), !(e.tag === 3 || e.tag === 5 || e.tag === 27)); ) e = e.return;
    return n;
  }
  function ne(e) {
    var n = [null, null], r = O(e);
    return r === null || oe(n, e, r.child, { foundSelf: !1 }), n;
  }
  function oe(e, n, r, t) {
    for (; r !== null; ) {
      if (r === n) t.foundSelf = !0;
      else if (r.tag === 5 || r.tag === 27 || r.tag === 6) {
        if (t.foundSelf) return e[1] = r, !0;
        e[0] = r;
      } else if ((r.tag !== 22 || r.memoizedState === null) && oe(e, n, r.child, t)) return !0;
      r = r.sibling;
    }
    return !1;
  }
  function Z(e) {
    switch (e.tag) {
      case 5:
      case 27:
      case 6:
        return e.stateNode;
      case 3:
        return e.stateNode.containerInfo;
      default:
        throw Error(s(559));
    }
  }
  var V = null, Pe = null;
  function ge(e, n, r) {
    return e === r ? !0 : e === n ? (V = e, !0) : !1;
  }
  function ie(e, n, r) {
    return e === r ? (Pe = e, !1) : e === n ? (Pe !== null && (V = e), !0) : !1;
  }
  function fe(e) {
    if (e === null) return null;
    do
      e = e === null ? null : e.return;
    while (e && e.tag !== 5 && e.tag !== 27 && e.tag !== 3);
    return e || null;
  }
  function le(e, n, r) {
    for (var t = 0, o = e; o; o = r(o)) t++;
    o = 0;
    for (var a = n; a; a = r(a)) o++;
    for (; 0 < t - o; ) e = r(e), t--;
    for (; 0 < o - t; ) n = r(n), o--;
    for (; t--; ) {
      if (e === n || n !== null && e === n.alternate) return e;
      e = r(e), n = r(n);
    }
    return null;
  }
  var W = Object.assign, H = Symbol.for("react.element"), Ee = Symbol.for("react.transitional.element"), Ne = Symbol.for("react.portal"), Re = Symbol.for("react.fragment"), Qe = Symbol.for("react.strict_mode"), Ge = Symbol.for("react.profiler"), mn = Symbol.for("react.consumer"), Ke = Symbol.for("react.context"), C = Symbol.for("react.forward_ref"), X = Symbol.for("react.suspense"), re = Symbol.for("react.suspense_list"), Fe = Symbol.for("react.memo"), ze = Symbol.for("react.lazy"), xn = Symbol.for("react.activity"), Dn = Symbol.for("react.legacy_hidden"), Jn = Symbol.for("react.memo_cache_sentinel"), d = Symbol.for("react.view_transition"), z = Symbol.for("react.recoverable"), J = Symbol.iterator;
  function G(e) {
    return e === null || typeof e != "object" ? null : (e = J && e[J] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var me = Symbol.for("react.client.reference");
  function be(e) {
    if (e == null) return null;
    if (typeof e == "function") return e.$$typeof === me ? null : e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case Re:
        return "Fragment";
      case Ge:
        return "Profiler";
      case Qe:
        return "StrictMode";
      case X:
        return "Suspense";
      case re:
        return "SuspenseList";
      case xn:
        return "Activity";
      case d:
        return "ViewTransition";
    }
    if (typeof e == "object") switch (e.$$typeof) {
      case Ne:
        return "Portal";
      case Ke:
        return e.displayName || "Context";
      case mn:
        return (e._context.displayName || "Context") + ".Consumer";
      case C:
        var n = e.render;
        return e = e.displayName, e || (e = n.displayName || n.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
      case Fe:
        return n = e.displayName || null, n !== null ? n : be(e.type) || "Memo";
      case ze:
        n = e._payload, e = e._init;
        try {
          return be(e(n));
        } catch {
        }
    }
    return null;
  }
  var he = Array.isArray, q = N.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, te = k.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, A = { pending: !1, data: null, method: null, action: null }, Te = [], Fn = -1;
  function an(e) {
    return { current: e };
  }
  function We(e) {
    0 > Fn || (e.current = Te[Fn], Te[Fn] = null, Fn--);
  }
  function Ie(e, n) {
    Fn++, Te[Fn] = e.current, e.current = n;
  }
  var Ze = an(null), qn = an(null), un = an(null), nn = an(null);
  function gn(e, n) {
    switch (Ie(un, n), Ie(qn, e), Ie(Ze, null), n.nodeType) {
      case 9:
      case 11:
        e = (e = n.documentElement) && (e = e.namespaceURI) ? Ep(e) : 0;
        break;
      default:
        if (e = n.tagName, n = n.namespaceURI) n = Ep(n), e = Np(n, e);
        else switch (e) {
          case "svg":
            e = 1;
            break;
          case "math":
            e = 2;
            break;
          default:
            e = 0;
        }
    }
    We(Ze), Ie(Ze, e);
  }
  function rn() {
    We(Ze), We(qn), We(un);
  }
  function vr(e) {
    var n = e.memoizedState;
    n !== null && (qo._currentValue = n.memoizedState, Ie(nn, e)), n = Ze.current;
    var r = Np(n, e.type);
    n !== r && (Ie(qn, e), Ie(Ze, r));
  }
  function _e(e) {
    qn.current === e && (We(Ze), We(qn)), nn.current === e && (We(nn), qo._currentValue = A);
  }
  var yr, er;
  function vn(e) {
    if (yr === void 0) try {
      throw Error();
    } catch (r) {
      var n = r.stack.trim().match(/\n( *(at )?)/);
      yr = n && n[1] || "", er = -1 < r.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < r.stack.indexOf("@") ? "@unknown:0:0" : "";
    }
    return `
` + yr + e + er;
  }
  var Rr = !1;
  function Ur(e, n) {
    if (!e || Rr) return "";
    Rr = !0;
    var r = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var t = { DetermineComponentFrameRoot: function() {
        try {
          if (n) {
            var E = function() {
              throw Error();
            };
            if (Object.defineProperty(E.prototype, "props", { set: function() {
              throw Error();
            } }), typeof Reflect == "object" && Reflect.construct) {
              try {
                Reflect.construct(E, []);
              } catch (R) {
                var h = R;
              }
              Reflect.construct(e, [], E);
            } else {
              try {
                E.call();
              } catch (R) {
                h = R;
              }
              E = !1;
              try {
                var b = Object.getOwnPropertyDescriptor(e.prototype, "props");
                Object.defineProperty(e.prototype, "props", { configurable: !0, set: function() {
                  throw Error();
                } }), E = !0, new e();
              } finally {
                E && (b !== void 0 ? Object.defineProperty(e.prototype, "props", b) : delete e.prototype.props);
              }
            }
          } else {
            try {
              throw Error();
            } catch (R) {
              h = R;
            }
            (E = e()) && typeof E.catch == "function" && E.catch(function() {
            });
          }
        } catch (R) {
          if (R && h && typeof R.stack == "string") return [R.stack, h.stack];
        }
        return [null, null];
      } };
      t.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var o = Object.getOwnPropertyDescriptor(t.DetermineComponentFrameRoot, "name");
      o && o.configurable && Object.defineProperty(t.DetermineComponentFrameRoot, "name", { value: "DetermineComponentFrameRoot" });
      var a = t.DetermineComponentFrameRoot(), i = a[0], l = a[1];
      if (i && l) {
        var u = i.split(`
`), g = l.split(`
`);
        for (o = t = 0; t < u.length && !u[t].includes("DetermineComponentFrameRoot"); ) t++;
        for (; o < g.length && !g[o].includes("DetermineComponentFrameRoot"); ) o++;
        if (t === u.length || o === g.length) for (t = u.length - 1, o = g.length - 1; 1 <= t && 0 <= o && u[t] !== g[o]; ) o--;
        for (; 1 <= t && 0 <= o; t--, o--) if (u[t] !== g[o]) {
          if (t !== 1 || o !== 1) do
            if (t--, o--, 0 > o || u[t] !== g[o]) {
              var w = `
` + u[t].replace(" at new ", " at ");
              return e.displayName && w.includes("<anonymous>") && (w = w.replace("<anonymous>", e.displayName)), w;
            }
          while (1 <= t && 0 <= o);
          break;
        }
      }
    } finally {
      Rr = !1, Error.prepareStackTrace = r;
    }
    return (r = e ? e.displayName || e.name : "") ? vn(r) : "";
  }
  function br(e, n) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return vn(e.type);
      case 16:
        return vn("Lazy");
      case 13:
        return e.child !== n && n !== null ? vn("Suspense Fallback") : vn("Suspense");
      case 19:
        return vn("SuspenseList");
      case 0:
      case 15:
        return Ur(e.type, !1);
      case 11:
        return Ur(e.type.render, !1);
      case 1:
        return Ur(e.type, !0);
      case 31:
        return vn("Activity");
      case 30:
        return vn("ViewTransition");
      default:
        return "";
    }
  }
  function de(e) {
    try {
      var n = "", r = null;
      do
        n += br(e, r), r = e, e = e.return;
      while (e);
      return n;
    } catch (t) {
      return `
Error generating stack: ` + t.message + `
` + t.stack;
    }
  }
  var jn = Object.prototype.hasOwnProperty, ot = c.unstable_scheduleCallback, Vr = c.unstable_cancelCallback, Go = c.unstable_shouldYield, _ = c.unstable_requestPaint, p = c.unstable_now, S = c.unstable_getCurrentPriorityLevel, F = c.unstable_ImmediatePriority, U = c.unstable_UserBlockingPriority, D = c.unstable_NormalPriority, Y = c.unstable_LowPriority, se = c.unstable_IdlePriority, ue = c.log, ke = c.unstable_setDisableYieldValue, je = null, Ce = null;
  function Je(e) {
    if (typeof ue == "function" && ke(e), Ce && typeof Ce.setStrictMode == "function") try {
      Ce.setStrictMode(je, e);
    } catch {
    }
  }
  var we = Math.clz32 ? Math.clz32 : Pr, pn = Math.log, Rn = Math.LN2;
  function Pr(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (pn(e) / Rn | 0) | 0;
  }
  var cn = 256, $n = 262144, zr = 4194304;
  function zn(e) {
    var n = e & 42;
    if (n !== 0) return n;
    switch (e & -e) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
        return 64;
      case 128:
        return 128;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
        return e & -e;
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return e & 3932160;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return e & 62914560;
      case 67108864:
        return 67108864;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 0;
      default:
        return e;
    }
  }
  function at(e, n, r) {
    var t = e.pendingLanes;
    if (t === 0) return 0;
    var o = 0, a = e.suspendedLanes, i = e.pingedLanes;
    e = e.warmLanes;
    var l = t & 134217727;
    return l !== 0 ? (t = l & ~a, t !== 0 ? o = zn(t) : (i &= l, i !== 0 ? o = zn(i) : r || (r = l & ~e, r !== 0 && (o = zn(r))))) : (l = t & ~a, l !== 0 ? o = zn(l) : i !== 0 ? o = zn(i) : r || (r = t & ~e, r !== 0 && (o = zn(r)))), o === 0 ? 0 : n !== 0 && n !== o && (n & a) === 0 && (a = o & -o, r = n & -n, a >= r || a === 32 && (r & 4194048) !== 0) ? n : o;
  }
  function Ot(e, n) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & n) === 0;
  }
  function Ha(e, n) {
    (n & 8) !== 0 && (n |= n & 32);
    var r = e.entangledLanes;
    if (r !== 0) for (e = e.entanglements, r &= n; 0 < r; ) {
      var t = 31 - we(r), o = 1 << t;
      n |= e[t], r &= ~o;
    }
    return n;
  }
  function At(e, n) {
    switch (e) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return n + 250;
      case 16:
      case 32:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return n + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return -1;
      case 67108864:
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function oo() {
    var e = zr;
    return zr <<= 1, (zr & 62914560) === 0 && (zr = 4194304), e;
  }
  function Ko(e) {
    for (var n = [], r = 0; 31 > r; r++) n.push(e);
    return n;
  }
  function Zo(e, n) {
    e.pendingLanes |= n, n !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
  }
  function Uh(e, n, r, t, o, a) {
    var i = e.pendingLanes;
    e.pendingLanes = r, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= r, e.entangledLanes &= r, e.errorRecoveryDisabledLanes &= r, e.shellSuspendCounter = 0;
    var l = e.entanglements, u = e.expirationTimes, g = e.hiddenUpdates;
    for (r = i & ~r; 0 < r; ) {
      var w = 31 - we(r), E = 1 << w;
      l[w] = 0, u[w] = -1;
      var h = g[w];
      if (h !== null) for (g[w] = null, w = 0; w < h.length; w++) {
        var b = h[w];
        b !== null && (b.lane &= -536870913);
      }
      r &= ~E;
    }
    t !== 0 && Ku(e, t, 0), a !== 0 && o === 0 && e.tag !== 0 && (e.suspendedLanes |= a & ~(i & ~n));
  }
  function Ku(e, n, r) {
    e.pendingLanes |= n, e.suspendedLanes &= ~n;
    var t = 31 - we(n);
    e.entangledLanes |= n, e.entanglements[t] = e.entanglements[t] | 1073741824 | r & 261930;
  }
  function Zu(e, n) {
    var r = e.entangledLanes |= n;
    for (e = e.entanglements; r; ) {
      var t = 31 - we(r), o = 1 << t;
      o & n | e[t] & n && (e[t] |= n), r &= ~o;
    }
  }
  function Ju(e, n) {
    var r = n & -n;
    return r = (r & 42) !== 0 ? 1 : yl(r), (r & (e.suspendedLanes | n)) !== 0 ? 0 : r;
  }
  function yl(e) {
    switch (e) {
      case 2:
        e = 1;
        break;
      case 8:
        e = 4;
        break;
      case 32:
        e = 16;
        break;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        e = 128;
        break;
      case 268435456:
        e = 134217728;
        break;
      default:
        e = 0;
    }
    return e;
  }
  function bl(e) {
    return e &= -e, 2 < e ? 8 < e ? (e & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function ec() {
    var e = te.p;
    return e !== 0 ? e : (e = window.event, e === void 0 ? 32 : sh(e.type));
  }
  function nc(e, n) {
    var r = te.p;
    try {
      return te.p = e, n();
    } finally {
      te.p = r;
    }
  }
  var Wr = Math.random().toString(36).slice(2), _n = "__reactFiber$" + Wr, Qn = "__reactProps$" + Wr, ao = "__reactContainer$" + Wr, rc = "__reactEvents$" + Wr, Vh = "__reactListeners$" + Wr, Wh = "__reactHandles$" + Wr, tc = "__reactResources$" + Wr, Jo = "__reactMarker$" + Wr, qa = "__reactLoad$" + Wr;
  function Qa(e) {
    delete e[_n], delete e[Qn], delete e[Vh], delete e[Wh];
  }
  function Dt(e) {
    var n;
    if (n = e[_n]) return n;
    for (var r = e.parentNode; r; ) {
      if (n = r[ao] || r[_n]) {
        if (r = n.alternate, n.child !== null || r !== null && r.child !== null) for (e = Vp(e); e !== null; ) {
          if (r = e[_n]) return r;
          e = Vp(e);
        }
        return n;
      }
      e = r, r = e.parentNode;
    }
    return null;
  }
  function io(e) {
    if (e = e[_n] || e[ao]) {
      var n = e.tag;
      if (n === 5 || n === 6 || n === 13 || n === 31 || n === 26 || n === 27 || n === 3) return e;
    }
    return null;
  }
  function ea(e) {
    var n = e.tag;
    if (n === 5 || n === 26 || n === 27 || n === 6) return e.stateNode;
    throw Error(s(33));
  }
  function lo(e) {
    var n = e[tc];
    return n || (n = e[tc] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), n;
  }
  function En(e) {
    e[Jo] = !0;
  }
  function oc(e) {
    e[qa] = void 0;
  }
  var ac = /* @__PURE__ */ new Set(), ic = {};
  function Ft(e, n) {
    so(e, n), so(e + "Capture", n);
  }
  function so(e, n) {
    for (ic[e] = n, e = 0; e < n.length; e++) ac.add(n[e]);
  }
  var Bh = RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"), lc = {}, sc = {};
  function Hh(e) {
    return jn.call(sc, e) ? !0 : jn.call(lc, e) ? !1 : Bh.test(e) ? sc[e] = !0 : (lc[e] = !0, !1);
  }
  var $e = !1;
  function uc() {
    var e = $e;
    return $e = !1, e;
  }
  function Ya(e, n, r) {
    if (Hh(n)) if (r === null) e.removeAttribute(n);
    else {
      switch (typeof r) {
        case "undefined":
        case "function":
        case "symbol":
          e.removeAttribute(n);
          return;
        case "boolean":
          var t = n.toLowerCase().slice(0, 5);
          if (t !== "data-" && t !== "aria-") {
            e.removeAttribute(n);
            return;
          }
      }
      e.setAttribute(n, r);
    }
  }
  function Xa(e, n, r) {
    if (r === null) e.removeAttribute(n);
    else {
      switch (typeof r) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(n);
          return;
      }
      e.setAttribute(n, r);
    }
  }
  function Br(e, n, r, t) {
    if (t === null) e.removeAttribute(r);
    else {
      switch (typeof t) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(r);
          return;
      }
      e.setAttributeNS(n, r, t);
    }
  }
  function nr(e) {
    switch (typeof e) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return e;
      case "object":
        return e;
      default:
        return "";
    }
  }
  function cc(e) {
    var n = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (n === "checkbox" || n === "radio");
  }
  function qh(e, n, r) {
    var t = Object.getOwnPropertyDescriptor(e.constructor.prototype, n);
    if (!e.hasOwnProperty(n) && typeof t < "u" && typeof t.get == "function" && typeof t.set == "function") {
      var o = t.get, a = t.set;
      return Object.defineProperty(e, n, { configurable: !0, get: function() {
        return o.call(this);
      }, set: function(i) {
        r = "" + i, a.call(this, i);
      } }), Object.defineProperty(e, n, { enumerable: t.enumerable }), { getValue: function() {
        return r;
      }, setValue: function(i) {
        r = "" + i;
      }, stopTracking: function() {
        e._valueTracker = null, delete e[n];
      } };
    }
  }
  function wl(e) {
    if (!e._valueTracker) {
      var n = cc(e) ? "checked" : "value";
      e._valueTracker = qh(e, n, "" + e[n]);
    }
  }
  function fc(e) {
    if (!e) return !1;
    var n = e._valueTracker;
    if (!n) return !0;
    var r = n.getValue(), t = "";
    return e && (t = cc(e) ? e.checked ? "true" : "false" : e.value), e = t, e !== r ? (n.setValue(e), !0) : !1;
  }
  var Qh = /[\n"\\]/g;
  function wr(e) {
    return e.replace(Qh, function(n) {
      return "\\" + n.charCodeAt(0).toString(16) + " ";
    });
  }
  function kl(e, n, r, t, o, a, i, l) {
    e.name = "", i != null && typeof i != "function" && typeof i != "symbol" && typeof i != "boolean" ? e.type = i : e.removeAttribute("type"), n != null ? i === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + nr(n)) : e.value !== "" + nr(n) && (e.value = "" + nr(n)) : i !== "submit" && i !== "reset" || e.removeAttribute("value"), n != null ? i === "number" && e.value == n ? Sl(e, nr(e.value)) : Sl(e, nr(n)) : r != null ? Sl(e, nr(r)) : t != null && e.removeAttribute("value"), o == null && a != null && (e.defaultChecked = !!a), o != null && (e.checked = o && typeof o != "function" && typeof o != "symbol"), l != null && typeof l != "function" && typeof l != "symbol" && typeof l != "boolean" ? e.name = "" + nr(l) : e.removeAttribute("name");
  }
  function dc(e, n, r, t, o, a, i, l) {
    if (a != null && typeof a != "function" && typeof a != "symbol" && typeof a != "boolean" && (e.type = a), n != null || r != null) {
      if (!(a !== "submit" && a !== "reset" || n != null)) {
        wl(e);
        return;
      }
      r = r != null ? "" + nr(r) : "", n = n != null ? "" + nr(n) : r, l || n === e.value || (e.value = n), e.defaultValue = n;
    }
    t = t ?? o, t = typeof t != "function" && typeof t != "symbol" && !!t, e.checked = l ? e.checked : !!t, e.defaultChecked = !!t, i != null && typeof i != "function" && typeof i != "symbol" && typeof i != "boolean" && (e.name = i), wl(e);
  }
  function Sl(e, n) {
    e.defaultValue !== "" + n && (e.defaultValue = "" + n);
  }
  function uo(e, n, r, t) {
    if (e = e.options, n) {
      n = {};
      for (var o = 0; o < r.length; o++) n["$" + r[o]] = !0;
      for (r = 0; r < e.length; r++) o = n.hasOwnProperty("$" + e[r].value), e[r].selected !== o && (e[r].selected = o), o && t && (e[r].defaultSelected = !0);
    } else {
      for (r = "" + nr(r), n = null, o = 0; o < e.length; o++) {
        if (e[o].value === r) {
          e[o].selected = !0, t && (e[o].defaultSelected = !0);
          return;
        }
        n !== null || e[o].disabled || (n = e[o]);
      }
      n !== null && (n.selected = !0);
    }
  }
  function pc(e, n, r) {
    if (n != null && (n = "" + nr(n), n !== e.value && (e.value = n), r == null)) {
      e.defaultValue !== n && (e.defaultValue = n);
      return;
    }
    e.defaultValue = r != null ? "" + nr(r) : "";
  }
  function hc(e, n, r, t) {
    if (n == null) {
      if (t != null) {
        if (r != null) throw Error(s(92));
        if (he(t)) {
          if (1 < t.length) throw Error(s(93));
          t = t[0];
        }
        r = t;
      }
      r == null && (r = ""), n = r;
    }
    r = nr(n), e.defaultValue = r, t = e.textContent, t === r && t !== "" && t !== null && (e.value = t), wl(e);
  }
  function co(e, n) {
    if (n) {
      var r = e.firstChild;
      if (r && r === e.lastChild && r.nodeType === 3) {
        r.nodeValue = n;
        return;
      }
    }
    e.textContent = n;
  }
  var Yh = new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));
  function mc(e, n, r) {
    var t = n.indexOf("--") === 0;
    r == null || typeof r == "boolean" || r === "" ? t ? e.setProperty(n, "") : n === "float" ? e.cssFloat = "" : e[n] = "" : t ? e.setProperty(n, r) : typeof r != "number" || r === 0 || Yh.has(n) ? n === "float" ? e.cssFloat = r : e[n] = ("" + r).trim() : e[n] = r + "px";
  }
  function gc(e, n, r) {
    if (n != null && typeof n != "object") throw Error(s(62));
    if (e = e.style, r != null) {
      for (var t in r) !r.hasOwnProperty(t) || n != null && n.hasOwnProperty(t) || (t.indexOf("--") === 0 ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "", $e = !0);
      for (var o in n) t = n[o], n.hasOwnProperty(o) && r[o] !== t && (mc(e, o, t), $e = !0);
    } else for (var a in n) n.hasOwnProperty(a) && mc(e, a, n[a]);
  }
  function xl(e) {
    if (e.indexOf("-") === -1) return !1;
    switch (e) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var Xh = /* @__PURE__ */ new Map([["acceptCharset", "accept-charset"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"], ["crossOrigin", "crossorigin"], ["accentHeight", "accent-height"], ["alignmentBaseline", "alignment-baseline"], ["arabicForm", "arabic-form"], ["baselineShift", "baseline-shift"], ["capHeight", "cap-height"], ["clipPath", "clip-path"], ["clipRule", "clip-rule"], ["colorInterpolation", "color-interpolation"], ["colorInterpolationFilters", "color-interpolation-filters"], ["colorProfile", "color-profile"], ["colorRendering", "color-rendering"], ["dominantBaseline", "dominant-baseline"], ["enableBackground", "enable-background"], ["fillOpacity", "fill-opacity"], ["fillRule", "fill-rule"], ["floodColor", "flood-color"], ["floodOpacity", "flood-opacity"], ["fontFamily", "font-family"], ["fontSize", "font-size"], ["fontSizeAdjust", "font-size-adjust"], ["fontStretch", "font-stretch"], ["fontStyle", "font-style"], ["fontVariant", "font-variant"], ["fontWeight", "font-weight"], ["glyphName", "glyph-name"], ["glyphOrientationHorizontal", "glyph-orientation-horizontal"], ["glyphOrientationVertical", "glyph-orientation-vertical"], ["horizAdvX", "horiz-adv-x"], ["horizOriginX", "horiz-origin-x"], ["imageRendering", "image-rendering"], ["letterSpacing", "letter-spacing"], ["lightingColor", "lighting-color"], ["markerEnd", "marker-end"], ["markerMid", "marker-mid"], ["markerStart", "marker-start"], ["maskType", "mask-type"], ["overlinePosition", "overline-position"], ["overlineThickness", "overline-thickness"], ["paintOrder", "paint-order"], ["panose-1", "panose-1"], ["pointerEvents", "pointer-events"], ["renderingIntent", "rendering-intent"], ["shapeRendering", "shape-rendering"], ["stopColor", "stop-color"], ["stopOpacity", "stop-opacity"], ["strikethroughPosition", "strikethrough-position"], ["strikethroughThickness", "strikethrough-thickness"], ["strokeDasharray", "stroke-dasharray"], ["strokeDashoffset", "stroke-dashoffset"], ["strokeLinecap", "stroke-linecap"], ["strokeLinejoin", "stroke-linejoin"], ["strokeMiterlimit", "stroke-miterlimit"], ["strokeOpacity", "stroke-opacity"], ["strokeWidth", "stroke-width"], ["textAnchor", "text-anchor"], ["textDecoration", "text-decoration"], ["textRendering", "text-rendering"], ["transformOrigin", "transform-origin"], ["underlinePosition", "underline-position"], ["underlineThickness", "underline-thickness"], ["unicodeBidi", "unicode-bidi"], ["unicodeRange", "unicode-range"], ["unitsPerEm", "units-per-em"], ["vAlphabetic", "v-alphabetic"], ["vHanging", "v-hanging"], ["vIdeographic", "v-ideographic"], ["vMathematical", "v-mathematical"], ["vectorEffect", "vector-effect"], ["vertAdvY", "vert-adv-y"], ["vertOriginX", "vert-origin-x"], ["vertOriginY", "vert-origin-y"], ["wordSpacing", "word-spacing"], ["writingMode", "writing-mode"], ["xmlnsXlink", "xmlns:xlink"], ["xHeight", "x-height"]]), Gh = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Ga(e) {
    return Gh.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
  }
  function _r() {
  }
  var El = null;
  function Nl(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var fo = null, po = null;
  function vc(e) {
    var n = io(e);
    if (n && (e = n.stateNode)) {
      var r = e[Qn] || null;
      e: switch (e = n.stateNode, n.type) {
        case "input":
          if (kl(e, r.value, r.defaultValue, r.defaultValue, r.checked, r.defaultChecked, r.type, r.name), n = r.name, r.type === "radio" && n != null) {
            for (r = e; r.parentNode; ) r = r.parentNode;
            for (r = r.querySelectorAll('input[name="' + wr("" + n) + '"][type="radio"]'), n = 0; n < r.length; n++) {
              var t = r[n];
              if (t !== e && t.form === e.form) {
                var o = t[Qn] || null;
                if (!o) throw Error(s(90));
                kl(t, o.value, o.defaultValue, o.defaultValue, o.checked, o.defaultChecked, o.type, o.name);
              }
            }
            for (n = 0; n < r.length; n++) t = r[n], t.form === e.form && fc(t);
          }
          break e;
        case "textarea":
          pc(e, r.value, r.defaultValue);
          break e;
        case "select":
          n = r.value, n != null && uo(e, !!r.multiple, n, !1);
      }
    }
  }
  var Cl = !1;
  function yc(e, n, r) {
    if (Cl) return e(n, r);
    Cl = !0;
    try {
      var t = e(n);
      return t;
    } finally {
      if (Cl = !1, (fo !== null || po !== null) && (Xi(), fo && (n = fo, e = po, po = fo = null, vc(n), e))) for (n = 0; n < e.length; n++) vc(e[n]);
    }
  }
  function na(e, n) {
    var r = e.stateNode;
    if (r === null) return null;
    var t = r[Qn] || null;
    if (t === null) return null;
    r = t[n];
    e: switch (n) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (t = !t.disabled) || (e = e.type, t = !(e === "button" || e === "input" || e === "select" || e === "textarea")), e = !t;
        break e;
      default:
        e = !1;
    }
    if (e) return null;
    if (r && typeof r != "function") throw Error(s(231, n, typeof r));
    return r;
  }
  var Hr = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Pl = !1;
  if (Hr) try {
    var ra = {};
    Object.defineProperty(ra, "passive", { get: function() {
      Pl = !0;
    } }), window.addEventListener("test", ra, ra), window.removeEventListener("test", ra, ra);
  } catch {
    Pl = !1;
  }
  var it = null, zl = null, Ka = null;
  function bc() {
    if (Ka) return Ka;
    var e, n = zl, r = n.length, t, o = "value" in it ? it.value : it.textContent, a = o.length;
    for (e = 0; e < r && n[e] === o[e]; e++) ;
    var i = r - e;
    for (t = 1; t <= i && n[r - t] === o[a - t]; t++) ;
    return Ka = o.slice(e, 1 < t ? 1 - t : void 0);
  }
  function Za(e) {
    var n = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && n === 13 && (e = 13)) : e = n, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
  }
  function Ja() {
    return !0;
  }
  function wc() {
    return !1;
  }
  function Un(e) {
    function n(r, t, o, a, i) {
      this._reactName = r, this._targetInst = o, this.type = t, this.nativeEvent = a, this.target = i, this.currentTarget = null;
      for (var l in e) e.hasOwnProperty(l) && (r = e[l], this[l] = r ? r(a) : a[l]);
      return this.isDefaultPrevented = (a.defaultPrevented != null ? a.defaultPrevented : a.returnValue === !1) ? Ja : wc, this.isPropagationStopped = wc, this;
    }
    return W(n.prototype, { preventDefault: function() {
      this.defaultPrevented = !0;
      var r = this.nativeEvent;
      r && (r.preventDefault ? r.preventDefault() : typeof r.returnValue != "unknown" && (r.returnValue = !1), this.isDefaultPrevented = Ja);
    }, stopPropagation: function() {
      var r = this.nativeEvent;
      r && (r.stopPropagation ? r.stopPropagation() : typeof r.cancelBubble != "unknown" && (r.cancelBubble = !0), this.isPropagationStopped = Ja);
    }, persist: function() {
    }, isPersistent: Ja }), n;
  }
  var lt = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(e) {
    return e.timeStamp || Date.now();
  }, defaultPrevented: 0, isTrusted: 0 }, ei = Un(lt), ta = W({}, lt, { view: 0, detail: 0 }), Kh = Un(ta), _l, Ll, oa, ni = W({}, ta, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: Tl, button: 0, buttons: 0, relatedTarget: function(e) {
    return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
  }, movementX: function(e) {
    return "movementX" in e ? e.movementX : (e !== oa && (oa && e.type === "mousemove" ? (_l = e.screenX - oa.screenX, Ll = e.screenY - oa.screenY) : Ll = _l = 0, oa = e), _l);
  }, movementY: function(e) {
    return "movementY" in e ? e.movementY : Ll;
  } }), kc = Un(ni), Zh = W({}, ni, { dataTransfer: 0 }), Jh = Un(Zh), em = W({}, ta, { relatedTarget: 0 }), Ml = Un(em), nm = W({}, lt, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), rm = Un(nm), tm = W({}, lt, { clipboardData: function(e) {
    return "clipboardData" in e ? e.clipboardData : window.clipboardData;
  } }), om = Un(tm), am = W({}, lt, { data: 0 }), Sc = Un(am), im = { Esc: "Escape", Spacebar: " ", Left: "ArrowLeft", Up: "ArrowUp", Right: "ArrowRight", Down: "ArrowDown", Del: "Delete", Win: "OS", Menu: "ContextMenu", Apps: "ContextMenu", Scroll: "ScrollLock", MozPrintableKey: "Unidentified" }, lm = { 8: "Backspace", 9: "Tab", 12: "Clear", 13: "Enter", 16: "Shift", 17: "Control", 18: "Alt", 19: "Pause", 20: "CapsLock", 27: "Escape", 32: " ", 33: "PageUp", 34: "PageDown", 35: "End", 36: "Home", 37: "ArrowLeft", 38: "ArrowUp", 39: "ArrowRight", 40: "ArrowDown", 45: "Insert", 46: "Delete", 112: "F1", 113: "F2", 114: "F3", 115: "F4", 116: "F5", 117: "F6", 118: "F7", 119: "F8", 120: "F9", 121: "F10", 122: "F11", 123: "F12", 144: "NumLock", 145: "ScrollLock", 224: "Meta" }, sm = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
  function um(e) {
    var n = this.nativeEvent;
    return n.getModifierState ? n.getModifierState(e) : (e = sm[e]) ? !!n[e] : !1;
  }
  function Tl() {
    return um;
  }
  var cm = W({}, ta, { key: function(e) {
    if (e.key) {
      var n = im[e.key] || e.key;
      if (n !== "Unidentified") return n;
    }
    return e.type === "keypress" ? (e = Za(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? lm[e.keyCode] || "Unidentified" : "";
  }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: Tl, charCode: function(e) {
    return e.type === "keypress" ? Za(e) : 0;
  }, keyCode: function(e) {
    return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
  }, which: function(e) {
    return e.type === "keypress" ? Za(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
  } }), fm = Un(cm), dm = W({}, ni, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), xc = Un(dm), pm = W({}, lt, { submitter: 0 }), hm = Un(pm), mm = W({}, ta, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: Tl }), gm = Un(mm), vm = W({}, lt, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), ym = Un(vm), bm = W({}, ni, { deltaX: function(e) {
    return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
  }, deltaY: function(e) {
    return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
  }, deltaZ: 0, deltaMode: 0 }), wm = Un(bm), km = W({}, lt, { newState: 0, oldState: 0, source: 0 }), Sm = Un(km), xm = [9, 13, 27, 32], Il = Hr && "CompositionEvent" in window, aa = null;
  Hr && "documentMode" in document && (aa = document.documentMode);
  var Em = Hr && "TextEvent" in window && !aa, Ec = Hr && (!Il || aa && 8 < aa && 11 >= aa), Nc = " ", Cc = !1;
  function Pc(e, n) {
    switch (e) {
      case "keyup":
        return xm.indexOf(n.keyCode) !== -1;
      case "keydown":
        return n.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function zc(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var ho = !1;
  function Nm(e, n) {
    switch (e) {
      case "compositionend":
        return zc(n);
      case "keypress":
        return n.which !== 32 ? null : (Cc = !0, Nc);
      case "textInput":
        return e = n.data, e === Nc && Cc ? null : e;
      default:
        return null;
    }
  }
  function Cm(e, n) {
    if (ho) return e === "compositionend" || !Il && Pc(e, n) ? (e = bc(), Ka = zl = it = null, ho = !1, e) : null;
    switch (e) {
      case "paste":
        return null;
      case "keypress":
        if (!(n.ctrlKey || n.altKey || n.metaKey) || n.ctrlKey && n.altKey) {
          if (n.char && 1 < n.char.length) return n.char;
          if (n.which) return String.fromCharCode(n.which);
        }
        return null;
      case "compositionend":
        return Ec && n.locale !== "ko" ? null : n.data;
      default:
        return null;
    }
  }
  var Pm = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
  function _c(e) {
    var n = e && e.nodeName && e.nodeName.toLowerCase();
    return n === "input" ? !!Pm[e.type] : n === "textarea";
  }
  function Lc(e, n, r, t) {
    fo ? po ? po.push(t) : po = [t] : fo = t, n = nl(n, "onChange"), 0 < n.length && (r = new ei("onChange", "change", null, r, t), e.push({ event: r, listeners: n }));
  }
  var ia = null, la = null;
  function zm(e) {
    yp(e, 0);
  }
  function ri(e) {
    var n = ea(e);
    if (fc(n)) return e;
  }
  function Mc(e, n) {
    if (e === "change") return n;
  }
  var Tc = !1;
  if (Hr) {
    var Ol;
    if (Hr) {
      var Al = "oninput" in document;
      if (!Al) {
        var Ic = document.createElement("div");
        Ic.setAttribute("oninput", "return;"), Al = typeof Ic.oninput == "function";
      }
      Ol = Al;
    } else Ol = !1;
    Tc = Ol && (!document.documentMode || 9 < document.documentMode);
  }
  function Oc() {
    ia && (ia.detachEvent("onpropertychange", Ac), la = ia = null);
  }
  function Ac(e) {
    if (e.propertyName === "value" && ri(la)) {
      var n = [];
      Lc(n, la, e, Nl(e)), yc(zm, n);
    }
  }
  function _m(e, n, r) {
    e === "focusin" ? (Oc(), ia = n, la = r, ia.attachEvent("onpropertychange", Ac)) : e === "focusout" && Oc();
  }
  function Lm(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown") return ri(la);
  }
  function Mm(e, n) {
    if (e === "click") return ri(n);
  }
  function Tm(e, n) {
    if (e === "input" || e === "change") return ri(n);
  }
  function Im(e, n) {
    return e === n && (e !== 0 || 1 / e === 1 / n) || e !== e && n !== n;
  }
  var rr = typeof Object.is == "function" ? Object.is : Im;
  function sa(e, n) {
    if (rr(e, n)) return !0;
    if (typeof e != "object" || e === null || typeof n != "object" || n === null) return !1;
    var r = Object.keys(e), t = Object.keys(n);
    if (r.length !== t.length) return !1;
    for (t = 0; t < r.length; t++) {
      var o = r[t];
      if (!jn.call(n, o) || !rr(e[o], n[o])) return !1;
    }
    return !0;
  }
  function Dl(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  function Dc(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function Fc(e, n) {
    var r = Dc(e);
    e = 0;
    for (var t; r; ) {
      if (r.nodeType === 3) {
        if (t = e + r.textContent.length, e <= n && t >= n) return { node: r, offset: n - e };
        e = t;
      }
      e: {
        for (; r; ) {
          if (r.nextSibling) {
            r = r.nextSibling;
            break e;
          }
          r = r.parentNode;
        }
        r = void 0;
      }
      r = Dc(r);
    }
  }
  function jc(e, n) {
    return e && n ? e === n ? !0 : e && e.nodeType === 3 ? !1 : n && n.nodeType === 3 ? jc(e, n.parentNode) : "contains" in e ? e.contains(n) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(n) & 16) : !1 : !1;
  }
  function $c(e) {
    e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
    for (var n = Dl(e.document); n instanceof e.HTMLIFrameElement; ) {
      try {
        var r = typeof n.contentWindow.location.href == "string";
      } catch {
        r = !1;
      }
      if (r) e = n.contentWindow;
      else break;
      n = Dl(e.document);
    }
    return n;
  }
  function Fl(e) {
    var n = e && e.nodeName && e.nodeName.toLowerCase();
    return n && (n === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || n === "textarea" || e.contentEditable === "true");
  }
  var Om = Hr && "documentMode" in document && 11 >= document.documentMode, mo = null, jl = null, ua = null, $l = !1;
  function Rc(e, n, r) {
    var t = r.window === r ? r.document : r.nodeType === 9 ? r : r.ownerDocument;
    $l || mo == null || mo !== Dl(t) || (t = mo, "selectionStart" in t && Fl(t) ? t = { start: t.selectionStart, end: t.selectionEnd } : (t = (t.ownerDocument && t.ownerDocument.defaultView || window).getSelection(), t = { anchorNode: t.anchorNode, anchorOffset: t.anchorOffset, focusNode: t.focusNode, focusOffset: t.focusOffset }), ua && sa(ua, t) || (ua = t, t = nl(jl, "onSelect"), 0 < t.length && (n = new ei("onSelect", "select", null, n, r), e.push({ event: n, listeners: t }), n.target = mo)));
  }
  function jt(e, n) {
    var r = {};
    return r[e.toLowerCase()] = n.toLowerCase(), r["Webkit" + e] = "webkit" + n, r["Moz" + e] = "moz" + n, r;
  }
  var go = { animationend: jt("Animation", "AnimationEnd"), animationiteration: jt("Animation", "AnimationIteration"), animationstart: jt("Animation", "AnimationStart"), transitionrun: jt("Transition", "TransitionRun"), transitionstart: jt("Transition", "TransitionStart"), transitioncancel: jt("Transition", "TransitionCancel"), transitionend: jt("Transition", "TransitionEnd") }, Rl = {}, Uc = {};
  Hr && (Uc = document.createElement("div").style, "AnimationEvent" in window || (delete go.animationend.animation, delete go.animationiteration.animation, delete go.animationstart.animation), "TransitionEvent" in window || delete go.transitionend.transition);
  function $t(e) {
    if (Rl[e]) return Rl[e];
    if (!go[e]) return e;
    var n = go[e], r;
    for (r in n) if (n.hasOwnProperty(r) && r in Uc) return Rl[e] = n[r];
    return e;
  }
  var Vc = $t("animationend"), Wc = $t("animationiteration"), Bc = $t("animationstart"), Am = $t("transitionrun"), Dm = $t("transitionstart"), Fm = $t("transitioncancel"), Hc = $t("transitionend"), qc = /* @__PURE__ */ new Map(), Ul = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error fullscreenChange fullscreenError gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
  Ul.push("scrollEnd");
  function kr(e, n) {
    qc.set(e, n), Ft(n, [e]);
  }
  var jm = 0;
  function qr(e, n) {
    if (e.name != null && e.name !== "auto") return e.name;
    if (n.autoName !== null) return n.autoName;
    e = Nr.identifierPrefix;
    var r = jm++;
    return e = "_" + e + "t_" + r.toString(32) + "_", n.autoName = e;
  }
  function Qc(e) {
    if (e == null || typeof e == "string") return e;
    var n = null, r = Do;
    if (r !== null) for (var t = 0; t < r.length; t++) {
      var o = e[r[t]];
      if (o != null) {
        if (o === "none") return "none";
        n = n == null ? o : n + (" " + o);
      }
    }
    return n ?? e.default;
  }
  function Qr(e, n) {
    return e = Qc(e), n = Qc(n), n == null ? e === "auto" ? null : e : n === "auto" ? null : n;
  }
  var ti = typeof reportError == "function" ? reportError : function(e) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var n = new window.ErrorEvent("error", { bubbles: !0, cancelable: !0, message: typeof e == "object" && e !== null && typeof e.message == "string" ? String(e.message) : String(e), error: e });
      if (!window.dispatchEvent(n)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", e);
      return;
    }
    console.error(e);
  }, ur = [], vo = 0, Vl = 0;
  function oi() {
    for (var e = vo, n = Vl = vo = 0; n < e; ) {
      var r = ur[n];
      ur[n++] = null;
      var t = ur[n];
      ur[n++] = null;
      var o = ur[n];
      ur[n++] = null;
      var a = ur[n];
      if (ur[n++] = null, t !== null && o !== null) {
        var i = t.pending;
        i === null ? o.next = o : (o.next = i.next, i.next = o), t.pending = o;
      }
      a !== 0 && Yc(r, o, a);
    }
  }
  function ai(e, n, r, t) {
    ur[vo++] = e, ur[vo++] = n, ur[vo++] = r, ur[vo++] = t, Vl |= t, e.lanes |= t, e = e.alternate, e !== null && (e.lanes |= t);
  }
  function Wl(e, n, r, t) {
    return ai(e, n, r, t), ii(e);
  }
  function Rt(e, n) {
    return ai(e, null, null, n), ii(e);
  }
  function Yc(e, n, r) {
    e.lanes |= r;
    var t = e.alternate;
    t !== null && (t.lanes |= r);
    for (var o = !1, a = e.return; a !== null; ) a.childLanes |= r, t = a.alternate, t !== null && (t.childLanes |= r), a.tag === 22 && (e = a.stateNode, e === null || e._visibility & 1 || (o = !0)), e = a, a = a.return;
    return e.tag === 3 ? (a = e.stateNode, o && n !== null && (o = 31 - we(r), e = a.hiddenUpdates, t = e[o], t === null ? e[o] = [n] : t.push(n), n.lane = r | 536870912), a) : null;
  }
  function ii(e) {
    if (50 < Ma) throw Ma = 0, Yi = null, Error(s(185));
    for (var n = e.return; n !== null; ) e = n, n = e.return;
    return e.tag === 3 ? e.stateNode : null;
  }
  var yo = {};
  function $m(e, n, r, t) {
    this.tag = e, this.key = r, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = n, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = t, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function Yn(e, n, r, t) {
    return new $m(e, n, r, t);
  }
  function Bl(e) {
    return e = e.prototype, !(!e || !e.isReactComponent);
  }
  function Yr(e, n) {
    var r = e.alternate;
    return r === null ? (r = Yn(e.tag, n, e.key, e.mode), r.elementType = e.elementType, r.type = e.type, r.stateNode = e.stateNode, r.alternate = e, e.alternate = r) : (r.pendingProps = n, r.type = e.type, r.flags = 0, r.subtreeFlags = 0, r.deletions = null), r.flags = e.flags & 1206910976, r.childLanes = e.childLanes, r.lanes = e.lanes, r.child = e.child, r.memoizedProps = e.memoizedProps, r.memoizedState = e.memoizedState, r.updateQueue = e.updateQueue, n = e.dependencies, r.dependencies = n === null ? null : { lanes: n.lanes, firstContext: n.firstContext }, r.sibling = e.sibling, r.index = e.index, r.ref = e.ref, r.refCleanup = e.refCleanup, r;
  }
  function Xc(e, n) {
    e.flags &= 1206910978;
    var r = e.alternate;
    return r === null ? (e.childLanes = 0, e.lanes = n, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = r.childLanes, e.lanes = r.lanes, e.child = r.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = r.memoizedProps, e.memoizedState = r.memoizedState, e.updateQueue = r.updateQueue, e.type = r.type, n = r.dependencies, e.dependencies = n === null ? null : { lanes: n.lanes, firstContext: n.firstContext }), e;
  }
  function li(e, n, r, t, o, a) {
    var i = 0;
    if (t = e, typeof t == "function") Bl(t) && (i = 1);
    else if (typeof t == "string") i = p0(e, r, Ze.current) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
    else e: switch (t) {
      case xn:
        return e = Yn(31, r, n, o), e.elementType = xn, e.lanes = a, e;
      case Re:
        return Ut(r.children, o, a, n);
      case Qe:
        i = 8, o |= 24;
        break;
      case Ge:
        return e = Yn(12, r, n, o | 2), e.elementType = Ge, e.lanes = a, e;
      case X:
        return e = Yn(13, r, n, o), e.elementType = X, e.lanes = a, e;
      case re:
        return e = Yn(19, r, n, o), e.elementType = re, e.lanes = a, e;
      case Dn:
      case d:
        return e = o | 32, e = Yn(30, r, n, e), e.elementType = d, e.lanes = a, e.stateNode = { autoName: null, paired: null, clones: null, ref: null }, e;
      default:
        if (typeof t == "object" && t !== null) switch (t.$$typeof) {
          case Ke:
            i = 10;
            break e;
          case mn:
            i = 9;
            break e;
          case C:
            i = 11;
            break e;
          case Fe:
            i = 14;
            break e;
          case ze:
            i = 16, t = null;
            break e;
        }
        i = 29, r = Error(s(130, e === null ? "null" : typeof e, "")), t = null;
    }
    return n = Yn(i, r, n, o), n.elementType = e, n.type = t, n.lanes = a, n;
  }
  function Ut(e, n, r, t) {
    return e = Yn(7, e, t, n), e.lanes = r, e;
  }
  function Hl(e, n, r) {
    return e = Yn(6, e, null, n), e.lanes = r, e;
  }
  function Gc(e) {
    var n = Yn(18, null, null, 0);
    return n.stateNode = e, n;
  }
  function ql(e, n, r) {
    return n = Yn(4, e.children !== null ? e.children : [], e.key, n), n.lanes = r, n.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }, n;
  }
  var Kc = /* @__PURE__ */ new WeakMap();
  function cr(e, n) {
    if (typeof e == "object" && e !== null) {
      var r = Kc.get(e);
      return r !== void 0 ? r : (n = { value: e, source: n, stack: de(n) }, Kc.set(e, n), n);
    }
    return { value: e, source: n, stack: de(n) };
  }
  var bo = [], wo = 0, si = null, ca = 0, fr = [], dr = 0, st = null, Lr = 1, Mr = "";
  function Xr(e, n) {
    bo[wo++] = ca, bo[wo++] = si, si = e, ca = n;
  }
  function Zc(e, n, r) {
    fr[dr++] = Lr, fr[dr++] = Mr, fr[dr++] = st, st = e;
    var t = Lr;
    e = Mr;
    var o = 32 - we(t) - 1;
    t &= ~(1 << o), r += 1;
    var a = 32 - we(n) + o;
    if (30 < a) {
      var i = o - o % 5;
      a = (t & (1 << i) - 1).toString(32), t >>= i, o -= i, Lr = 1 << 32 - we(n) + o | r << o | t, Mr = a + e;
    } else Lr = 1 << a | r << o | t, Mr = e;
  }
  function ui(e) {
    e.return !== null && (Xr(e, 1), Zc(e, 1, 0));
  }
  function Ql(e) {
    for (; e === si; ) si = bo[--wo], bo[wo] = null, ca = bo[--wo], bo[wo] = null;
    for (; e === st; ) st = fr[--dr], fr[dr] = null, Mr = fr[--dr], fr[dr] = null, Lr = fr[--dr], fr[dr] = null;
  }
  function Jc(e, n) {
    fr[dr++] = Lr, fr[dr++] = Mr, fr[dr++] = st, Lr = n.id, Mr = n.overflow, st = e;
  }
  var Nn = null, tn = null, Se = !1, ut = null, pr = !1, Yl = Error(s(519));
  function ct(e) {
    var n = Error(s(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML", ""));
    throw fa(cr(n, e)), Yl;
  }
  function ef(e) {
    var n = e.stateNode, r = e.type, t = e.memoizedProps;
    switch (n[_n] = e, n[Qn] = t, r) {
      case "dialog":
        Me("cancel", n), Me("close", n);
        break;
      case "iframe":
      case "object":
      case "embed":
        Me("load", n);
        break;
      case "video":
      case "audio":
        for (r = 0; r < Ia.length; r++) Me(Ia[r], n);
        break;
      case "source":
        Me("error", n);
        break;
      case "img":
      case "image":
      case "link":
        Me("error", n), Me("load", n);
        break;
      case "details":
        Me("toggle", n);
        break;
      case "input":
        Me("invalid", n), dc(n, t.value, t.defaultValue, t.checked, t.defaultChecked, t.type, t.name, !0);
        break;
      case "select":
        Me("invalid", n);
        break;
      case "textarea":
        Me("invalid", n), hc(n, t.value, t.defaultValue, t.children);
    }
    r = t.children, typeof r != "string" && typeof r != "number" && typeof r != "bigint" || n.textContent === "" + r || t.suppressHydrationWarning === !0 || Sp(n.textContent, r) ? (t.popover != null && (Me("beforetoggle", n), Me("toggle", n)), t.onScroll != null && Me("scroll", n), t.onScrollEnd != null && Me("scrollend", n), t.onClick != null && (n.onclick = _r), n = !0) : n = !1, n || ct(e, !0);
  }
  function ci(e) {
    for (Nn = e.return; Nn; ) switch (Nn.tag) {
      case 5:
      case 31:
      case 13:
        pr = !1;
        return;
      case 27:
      case 3:
        pr = !0;
        return;
      default:
        Nn = Nn.return;
    }
  }
  function ko(e) {
    if (e !== Nn) return !1;
    if (!Se) return ci(e), Se = !0, !1;
    var n = e.tag, r;
    if ((r = n !== 3 && n !== 27) && ((r = n === 5) && (r = e.type, r = !(r !== "form" && r !== "button") || Nu(e.type, e.memoizedProps)), r = !r), r && tn && ct(e), ci(e), n === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(s(317));
      tn = Up(e);
    } else if (n === 31) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(s(317));
      tn = Up(e);
    } else n === 27 ? (n = tn, Ct(e.type) ? (e = Ou, Ou = null, tn = e) : tn = n) : tn = Nn ? mr(e.stateNode.nextSibling) : null;
    return !0;
  }
  function Vt() {
    tn = Nn = null, Se = !1;
  }
  function Xl() {
    var e = ut;
    return e !== null && (Kn === null ? Kn = e : Kn.push.apply(Kn, e), ut = null), e;
  }
  function fa(e) {
    ut === null ? ut = [e] : ut.push(e);
  }
  var Gl = an(null), Wt = null, Gr = null;
  function ft(e, n, r) {
    Ie(Gl, n._currentValue), n._currentValue = r;
  }
  function Kr(e) {
    e._currentValue = Gl.current, We(Gl);
  }
  function fi(e, n, r) {
    for (; e !== null; ) {
      var t = e.alternate;
      if ((e.childLanes & n) !== n ? (e.childLanes |= n, t !== null && (t.childLanes |= n)) : t !== null && (t.childLanes & n) !== n && (t.childLanes |= n), e === r) break;
      e = e.return;
    }
  }
  function Kl(e, n, r, t) {
    var o = e.child;
    for (o !== null && (o.return = e); o !== null; ) {
      var a = o.dependencies;
      if (a !== null) {
        var i = o.child;
        a = a.firstContext;
        e: for (; a !== null; ) {
          var l = a;
          a = o;
          for (var u = 0; u < n.length; u++) if (l.context === n[u]) {
            a.lanes |= r, l = a.alternate, l !== null && (l.lanes |= r), fi(a.return, r, e), t || (i = null);
            break e;
          }
          a = l.next;
        }
      } else if (o.tag === 18) {
        if (i = o.return, i === null) throw Error(s(341));
        i.lanes |= r, a = i.alternate, a !== null && (a.lanes |= r), fi(i, r, e), i = null;
      } else o.tag === 13 && o.memoizedState !== null && o.memoizedState.dehydrated === null ? (o.lanes |= r, i = o.alternate, i !== null && (i.lanes |= r), fi(o.return, r, e), i = o.child, i = i !== null ? i.sibling : null) : i = o.child;
      if (i !== null) i.return = o;
      else for (i = o; i !== null; ) {
        if (i === e) {
          i = null;
          break;
        }
        if (o = i.sibling, o !== null) {
          o.return = i.return, i = o;
          break;
        }
        i = i.return;
      }
      o = i;
    }
  }
  function Bt(e, n, r, t) {
    e = null;
    for (var o = n, a = !1; o !== null; ) {
      if (!a) {
        if ((o.flags & 524288) !== 0) a = !0;
        else if ((o.flags & 262144) !== 0) break;
      }
      if (o.tag === 10) {
        var i = o.alternate;
        if (i === null) throw Error(s(387));
        if (i = i.memoizedProps, i !== null) {
          var l = o.type;
          rr(o.pendingProps.value, i.value) || (e !== null ? e.push(l) : e = [l]);
        }
      } else if (o === nn.current) {
        if (i = o.alternate, i === null) throw Error(s(387));
        i.memoizedState.memoizedState !== o.memoizedState.memoizedState && (e !== null ? e.push(qo) : e = [qo]);
      }
      o = o.return;
    }
    return e !== null && Kl(n, e, r, t), n.flags |= 262144, e !== null;
  }
  function di(e) {
    for (e = e.firstContext; e !== null; ) {
      if (!rr(e.context._currentValue, e.memoizedValue)) return !0;
      e = e.next;
    }
    return !1;
  }
  function Ht(e) {
    Wt = e, Gr = null, e = e.dependencies, e !== null && (e.firstContext = null);
  }
  function Ln(e) {
    return nf(Wt, e);
  }
  function pi(e, n) {
    return Wt === null && Ht(e), nf(e, n);
  }
  function nf(e, n) {
    var r = n._currentValue;
    if (n = { context: n, memoizedValue: r, next: null }, Gr === null) {
      if (e === null) throw Error(s(308));
      Gr = n, e.dependencies = { lanes: 0, firstContext: n }, e.flags |= 524288;
    } else Gr = Gr.next = n;
    return r;
  }
  var Rm = typeof AbortController < "u" ? AbortController : function() {
    var e = [], n = this.signal = { aborted: !1, addEventListener: function(r, t) {
      e.push(t);
    } };
    this.abort = function() {
      n.aborted = !0, e.forEach(function(r) {
        return r();
      });
    };
  }, Um = c.unstable_scheduleCallback, Vm = c.unstable_NormalPriority, yn = { $$typeof: Ke, Consumer: null, Provider: null, _currentValue: null, _currentValue2: null, _threadCount: 0 };
  function Zl() {
    return { controller: new Rm(), data: /* @__PURE__ */ new Map(), refCount: 0 };
  }
  function da(e) {
    e.refCount--, e.refCount === 0 && Um(Vm, function() {
      e.controller.abort();
    });
  }
  function rf(e, n) {
    if ((e.pendingLanes & 4194048) !== 0) {
      var r = e.transitionTypes;
      for (r === null && (r = e.transitionTypes = []), e = 0; e < n.length; e++) {
        var t = n[e];
        r.indexOf(t) === -1 && r.push(t);
      }
    }
  }
  var pa = null;
  function Wm(e) {
    var n = e.transitionTypes;
    return e.transitionTypes = null, n;
  }
  var ha = null, Jl = 0, qt = 0, So = null;
  function Bm(e, n) {
    if (ha === null) {
      var r = ha = [];
      Jl = 0, qt = gu(), So = { status: "pending", value: void 0, then: function(t) {
        r.push(t);
      } };
    }
    return Jl++, n.then(tf, tf), n;
  }
  function tf() {
    if (--Jl === 0 && (pa = null, ha !== null)) {
      So !== null && (So.status = "fulfilled");
      var e = ha;
      ha = null, qt = 0, So = null;
      for (var n = 0; n < e.length; n++) (0, e[n])();
    }
  }
  function Hm(e, n) {
    var r = [], t = { status: "pending", value: null, reason: null, then: function(o) {
      r.push(o);
    } };
    return e.then(function() {
      t.status = "fulfilled", t.value = n;
      for (var o = 0; o < r.length; o++) (0, r[o])(n);
    }, function(o) {
      for (t.status = "rejected", t.reason = o, o = 0; o < r.length; o++) (0, r[o])(void 0);
    }), t;
  }
  var of = q.S;
  q.S = function(e, n) {
    if (Kd = p(), typeof n == "object" && n !== null && typeof n.then == "function" && Bm(e, n), pa !== null) for (var r = Ro; r !== null; ) rf(r, pa), r = r.next;
    if (r = e.types, r !== null) {
      for (var t = Ro; t !== null; ) rf(t, r), t = t.next;
      if (qt !== 0) {
        t = pa, t === null && (t = pa = []);
        for (var o = 0; o < r.length; o++) {
          var a = r[o];
          t.indexOf(a) === -1 && t.push(a);
        }
      }
    }
    of !== null && of(e, n);
  };
  var Qt = an(null);
  function es() {
    var e = Qt.current;
    return e !== null ? e : en.pooledCache;
  }
  function hi(e, n) {
    n === null ? Ie(Qt, Qt.current) : Ie(Qt, n.pool);
  }
  function af() {
    var e = es();
    return e === null ? null : { parent: yn._currentValue, pool: e };
  }
  var xo = Error(s(460)), ns = Error(s(474)), mi = Error(s(542)), gi = { then: function() {
  } };
  function lf(e) {
    return e = e.status, e === "fulfilled" || e === "rejected";
  }
  function sf(e, n, r) {
    switch (r = e[r], r === void 0 ? e.push(n) : r !== n && (n.then(_r, _r), n = r), n.status) {
      case "fulfilled":
        return n.value;
      case "rejected":
        throw e = n.reason, cf(e), e === void 0 && !("reason" in n) ? Error(s(600)) : e;
      default:
        if (typeof n.status == "string") n.then(_r, _r);
        else {
          if (e = en, e !== null && 100 < e.shellSuspendCounter) throw Error(s(482));
          e = n, e.status = "pending", e.then(function(t) {
            if (n.status === "pending") {
              var o = n;
              o.status = "fulfilled", o.value = t;
            }
          }, function(t) {
            if (n.status === "pending") {
              var o = n;
              o.status = "rejected", o.reason = t;
            }
          });
        }
        switch (n.status) {
          case "fulfilled":
            return n.value;
          case "rejected":
            throw e = n.reason, cf(e), e;
        }
        throw Xt = n, xo;
    }
  }
  function Yt(e) {
    try {
      var n = e._init;
      return n(e._payload);
    } catch (r) {
      throw r !== null && typeof r == "object" && typeof r.then == "function" ? (Xt = r, xo) : r;
    }
  }
  var Xt = null;
  function uf() {
    if (Xt === null) throw Error(s(459));
    var e = Xt;
    return Xt = null, e;
  }
  function cf(e) {
    if (e === xo || e === mi) throw Error(s(483));
  }
  var Eo = null, ma = 0;
  function vi(e) {
    var n = ma;
    return ma += 1, Eo === null && (Eo = []), sf(Eo, e, n);
  }
  function dt(e, n) {
    n = n.props.ref, e.ref = n !== void 0 ? n : null;
  }
  function yi(e, n) {
    throw n.$$typeof === H ? Error(s(525)) : (e = Object.prototype.toString.call(n), Error(s(31, e === "[object Object]" ? "object with keys {" + Object.keys(n).join(", ") + "}" : e)));
  }
  function ff(e) {
    function n(m, f) {
      if (e) {
        var y = m.deletions;
        y === null ? (m.deletions = [f], m.flags |= 16) : y.push(f);
      }
    }
    function r(m, f) {
      if (!e) return null;
      for (; f !== null; ) n(m, f), f = f.sibling;
      return null;
    }
    function t(m) {
      for (var f = /* @__PURE__ */ new Map(); m !== null; ) m.key === null ? f.set(m.index, m) : f.set(m.key, m), m = m.sibling;
      return f;
    }
    function o(m, f) {
      return m = Yr(m, f), m.index = 0, m.sibling = null, m;
    }
    function a(m, f, y) {
      return m.index = y, e ? (y = m.alternate, y !== null ? (y = y.index, y < f ? (m.flags |= 2, f) : y) : (m.flags |= 134217730, f)) : (m.flags |= 1048576, f);
    }
    function i(m) {
      return e && m.alternate === null && (m.flags |= 134217730), m;
    }
    function l(m, f, y, x) {
      return f === null || f.tag !== 6 ? (f = Hl(y, m.mode, x), f.return = m, f) : (f = o(f, y), f.return = m, f);
    }
    function u(m, f, y, x) {
      var Q = y.type;
      return Q === Re ? (m = w(m, f, y.props.children, x, y.key), dt(m, y), m) : f !== null && (f.elementType === Q || typeof Q == "object" && Q !== null && Q.$$typeof === ze && Yt(Q) === f.type) ? (f = o(f, y.props), dt(f, y), f.return = m, f) : (f = li(y.type, y.key, y.props, null, m.mode, x), dt(f, y), f.return = m, f);
    }
    function g(m, f, y, x) {
      return f === null || f.tag !== 4 || f.stateNode.containerInfo !== y.containerInfo || f.stateNode.implementation !== y.implementation ? (f = ql(y, m.mode, x), f.return = m, f) : (f = o(f, y.children || []), f.return = m, f);
    }
    function w(m, f, y, x, Q) {
      return f === null || f.tag !== 7 ? (f = Ut(y, m.mode, x, Q), f.return = m, f) : (f = o(f, y), f.return = m, f);
    }
    function E(m, f, y) {
      if (typeof f == "string" && f !== "" || typeof f == "number" || typeof f == "bigint") return f = Hl("" + f, m.mode, y), f.return = m, f;
      if (typeof f == "object" && f !== null) {
        switch (f.$$typeof) {
          case Ee:
            return y = li(f.type, f.key, f.props, null, m.mode, y), dt(y, f), y.return = m, y;
          case Ne:
            return f = ql(f, m.mode, y), f.return = m, f;
          case ze:
            return f = Yt(f), E(m, f, y);
        }
        if (he(f) || G(f)) return f = Ut(f, m.mode, y, null), f.return = m, f;
        if (typeof f.then == "function") return E(m, vi(f), y);
        if (f.$$typeof === Ke) return E(m, pi(m, f), y);
        yi(m, f);
      }
      return null;
    }
    function h(m, f, y, x) {
      var Q = f !== null ? f.key : null;
      if (typeof y == "string" && y !== "" || typeof y == "number" || typeof y == "bigint") return Q !== null ? null : l(m, f, "" + y, x);
      if (typeof y == "object" && y !== null) {
        switch (y.$$typeof) {
          case Ee:
            return y.key === Q ? u(m, f, y, x) : null;
          case Ne:
            return y.key === Q ? g(m, f, y, x) : null;
          case ze:
            return y = Yt(y), h(m, f, y, x);
        }
        if (he(y) || G(y)) return Q !== null ? null : w(m, f, y, x, null);
        if (typeof y.then == "function") return h(m, f, vi(y), x);
        if (y.$$typeof === Ke) return h(m, f, pi(m, y), x);
        yi(m, y);
      }
      return null;
    }
    function b(m, f, y, x, Q) {
      if (typeof x == "string" && x !== "" || typeof x == "number" || typeof x == "bigint") return m = m.get(y) || null, l(f, m, "" + x, Q);
      if (typeof x == "object" && x !== null) {
        switch (x.$$typeof) {
          case Ee:
            return m = m.get(x.key === null ? y : x.key) || null, u(f, m, x, Q);
          case Ne:
            return m = m.get(x.key === null ? y : x.key) || null, g(f, m, x, Q);
          case ze:
            return x = Yt(x), b(m, f, y, x, Q);
        }
        if (he(x) || G(x)) return m = m.get(y) || null, w(f, m, x, Q, null);
        if (typeof x.then == "function") return b(m, f, y, vi(x), Q);
        if (x.$$typeof === Ke) return b(m, f, y, pi(f, x), Q);
        yi(f, x);
      }
      return null;
    }
    function R(m, f, y, x) {
      for (var Q = null, Ae = null, ae = f, ce = f = 0, kn = null; ae !== null && ce < y.length; ce++) {
        ae.index > ce ? (kn = ae, ae = null) : kn = ae.sibling;
        var De = h(m, ae, y[ce], x);
        if (De === null) {
          ae === null && (ae = kn);
          break;
        }
        e && ae && De.alternate === null && n(m, ae), f = a(De, f, ce), Ae === null ? Q = De : Ae.sibling = De, Ae = De, ae = kn;
      }
      if (ce === y.length) return r(m, ae), Se && Xr(m, ce), Q;
      if (ae === null) {
        for (; ce < y.length; ce++) ae = E(m, y[ce], x), ae !== null && (f = a(ae, f, ce), Ae === null ? Q = ae : Ae.sibling = ae, Ae = ae);
        return Se && Xr(m, ce), Q;
      }
      for (ae = t(ae); ce < y.length; ce++) kn = b(ae, m, ce, y[ce], x), kn !== null && (e && (De = kn.alternate, De !== null && ae.delete(De.key === null ? ce : De.key)), f = a(kn, f, ce), Ae === null ? Q = kn : Ae.sibling = kn, Ae = kn);
      return e && ae.forEach(function(Mt) {
        return n(m, Mt);
      }), Se && Xr(m, ce), Q;
    }
    function K(m, f, y, x) {
      if (y == null) throw Error(s(151));
      for (var Q = null, Ae = null, ae = f, ce = f = 0, kn = null, De = y.next(); ae !== null && !De.done; ce++, De = y.next()) {
        ae.index > ce ? (kn = ae, ae = null) : kn = ae.sibling;
        var Mt = h(m, ae, De.value, x);
        if (Mt === null) {
          ae === null && (ae = kn);
          break;
        }
        e && ae && Mt.alternate === null && n(m, ae), f = a(Mt, f, ce), Ae === null ? Q = Mt : Ae.sibling = Mt, Ae = Mt, ae = kn;
      }
      if (De.done) return r(m, ae), Se && Xr(m, ce), Q;
      if (ae === null) {
        for (; !De.done; ce++, De = y.next()) De = E(m, De.value, x), De !== null && (f = a(De, f, ce), Ae === null ? Q = De : Ae.sibling = De, Ae = De);
        return Se && Xr(m, ce), Q;
      }
      for (ae = t(ae); !De.done; ce++, De = y.next()) De = b(ae, m, ce, De.value, x), De !== null && (e && (kn = De.alternate, kn !== null && ae.delete(kn.key === null ? ce : kn.key)), f = a(De, f, ce), Ae === null ? Q = De : Ae.sibling = De, Ae = De);
      return e && ae.forEach(function(N0) {
        return n(m, N0);
      }), Se && Xr(m, ce), Q;
    }
    function ye(m, f, y, x) {
      if (typeof y == "object" && y !== null && y.type === Re && y.key === null && y.props.ref === void 0 && (y = y.props.children), typeof y == "object" && y !== null) {
        switch (y.$$typeof) {
          case Ee:
            e: {
              for (var Q = y.key; f !== null; ) {
                if (f.key === Q) {
                  if (Q = y.type, Q === Re) {
                    if (f.tag === 7) {
                      r(m, f.sibling), x = o(f, y.props.children), dt(x, y), x.return = m, m = x;
                      break e;
                    }
                  } else if (f.elementType === Q || typeof Q == "object" && Q !== null && Q.$$typeof === ze && Yt(Q) === f.type) {
                    r(m, f.sibling), x = o(f, y.props), dt(x, y), x.return = m, m = x;
                    break e;
                  }
                  r(m, f);
                  break;
                } else n(m, f);
                f = f.sibling;
              }
              y.type === Re ? (x = Ut(y.props.children, m.mode, x, y.key), dt(x, y), x.return = m, m = x) : (x = li(y.type, y.key, y.props, null, m.mode, x), dt(x, y), x.return = m, m = x);
            }
            return i(m);
          case Ne:
            e: {
              for (Q = y.key; f !== null; ) {
                if (f.key === Q) if (f.tag === 4 && f.stateNode.containerInfo === y.containerInfo && f.stateNode.implementation === y.implementation) {
                  r(m, f.sibling), x = o(f, y.children || []), x.return = m, m = x;
                  break e;
                } else {
                  r(m, f);
                  break;
                }
                else n(m, f);
                f = f.sibling;
              }
              x = ql(y, m.mode, x), x.return = m, m = x;
            }
            return i(m);
          case ze:
            return y = Yt(y), ye(m, f, y, x);
        }
        if (he(y)) return R(m, f, y, x);
        if (G(y)) {
          if (Q = G(y), typeof Q != "function") throw Error(s(150));
          return y = Q.call(y), K(m, f, y, x);
        }
        if (typeof y.then == "function") return ye(m, f, vi(y), x);
        if (y.$$typeof === Ke) return ye(m, f, pi(m, y), x);
        yi(m, y);
      }
      return typeof y == "string" && y !== "" || typeof y == "number" || typeof y == "bigint" ? (y = "" + y, f !== null && f.tag === 6 ? (r(m, f.sibling), x = o(f, y), x.return = m, m = x) : (r(m, f), x = Hl(y, m.mode, x), x.return = m, m = x), i(m)) : r(m, f);
    }
    return function(m, f, y, x) {
      try {
        ma = 0;
        var Q = ye(m, f, y, x);
        return Eo = null, Q;
      } catch (ae) {
        if (ae === xo || ae === mi) throw ae;
        var Ae = Yn(29, ae, null, m.mode);
        return Ae.lanes = x, Ae.return = m, Ae;
      } finally {
      }
    };
  }
  var Gt = ff(!0), df = ff(!1), pt = !1;
  function rs(e) {
    e.updateQueue = { baseState: e.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, lanes: 0, hiddenCallbacks: null }, callbacks: null };
  }
  function ts(e, n) {
    e = e.updateQueue, n.updateQueue === e && (n.updateQueue = { baseState: e.baseState, firstBaseUpdate: e.firstBaseUpdate, lastBaseUpdate: e.lastBaseUpdate, shared: e.shared, callbacks: null });
  }
  function ht(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null };
  }
  function mt(e, n, r) {
    var t = e.updateQueue;
    if (t === null) return null;
    if (t = t.shared, (Ue & 2) !== 0) {
      var o = t.pending;
      return o === null ? n.next = n : (n.next = o.next, o.next = n), t.pending = n, n = ii(e), Yc(e, null, r), n;
    }
    return ai(e, t, n, r), ii(e);
  }
  function ga(e, n, r) {
    if (n = n.updateQueue, n !== null && (n = n.shared, (r & 4194048) !== 0)) {
      var t = n.lanes;
      t &= e.pendingLanes, r |= t, n.lanes = r, Zu(e, r);
    }
  }
  function os(e, n) {
    var r = e.updateQueue, t = e.alternate;
    if (t !== null && (t = t.updateQueue, r === t)) {
      var o = null, a = null;
      if (r = r.firstBaseUpdate, r !== null) {
        do {
          var i = { lane: r.lane, tag: r.tag, payload: r.payload, callback: null, next: null };
          a === null ? o = a = i : a = a.next = i, r = r.next;
        } while (r !== null);
        a === null ? o = a = n : a = a.next = n;
      } else o = a = n;
      r = { baseState: t.baseState, firstBaseUpdate: o, lastBaseUpdate: a, shared: t.shared, callbacks: t.callbacks }, e.updateQueue = r;
      return;
    }
    e = r.lastBaseUpdate, e === null ? r.firstBaseUpdate = n : e.next = n, r.lastBaseUpdate = n;
  }
  var as = !1;
  function va() {
    if (as) {
      var e = So;
      if (e !== null) throw e;
    }
  }
  function ya(e, n, r, t) {
    as = !1;
    var o = e.updateQueue;
    pt = !1;
    var a = o.firstBaseUpdate, i = o.lastBaseUpdate, l = o.shared.pending;
    if (l !== null) {
      o.shared.pending = null;
      var u = l, g = u.next;
      u.next = null, i === null ? a = g : i.next = g, i = u;
      var w = e.alternate;
      w !== null && (w = w.updateQueue, l = w.lastBaseUpdate, l !== i && (l === null ? w.firstBaseUpdate = g : l.next = g, w.lastBaseUpdate = u));
    }
    if (a !== null) {
      var E = o.baseState;
      i = 0, w = g = u = null, l = a;
      do {
        var h = l.lane & -536870913, b = h !== l.lane;
        if (b ? (Oe & h) === h : (t & h) === h) {
          h !== 0 && h === qt && (as = !0), w !== null && (w = w.next = { lane: 0, tag: l.tag, payload: l.payload, callback: null, next: null });
          e: {
            var R = e, K = l;
            h = n;
            var ye = r;
            switch (K.tag) {
              case 1:
                if (R = K.payload, typeof R == "function") {
                  E = R.call(ye, E, h);
                  break e;
                }
                E = R;
                break e;
              case 3:
                R.flags = R.flags & -65537 | 128;
              case 0:
                if (R = K.payload, h = typeof R == "function" ? R.call(ye, E, h) : R, h == null) break e;
                E = W({}, E, h);
                break e;
              case 2:
                pt = !0;
            }
          }
          h = l.callback, h !== null && (e.flags |= 64, b && (e.flags |= 8192), b = o.callbacks, b === null ? o.callbacks = [h] : b.push(h));
        } else b = { lane: h, tag: l.tag, payload: l.payload, callback: l.callback, next: null }, w === null ? (g = w = b, u = E) : w = w.next = b, i |= h;
        if (l = l.next, l === null) {
          if (l = o.shared.pending, l === null) break;
          b = l, l = b.next, b.next = null, o.lastBaseUpdate = b, o.shared.pending = null;
        }
      } while (!0);
      w === null && (u = E), o.baseState = u, o.firstBaseUpdate = g, o.lastBaseUpdate = w, a === null && (o.shared.lanes = 0), St |= i, e.lanes = i, e.memoizedState = E;
    }
  }
  function pf(e, n) {
    if (typeof e != "function") throw Error(s(191, e));
    e.call(n);
  }
  function hf(e, n) {
    var r = e.callbacks;
    if (r !== null) for (e.callbacks = null, e = 0; e < r.length; e++) pf(r[e], n);
  }
  var gt = an(null), bi = an(0);
  function mf(e, n) {
    e = rt, Ie(bi, e), Ie(gt, n), rt = e | n.baseLanes;
  }
  function is() {
    Ie(bi, rt), Ie(gt, gt.current);
  }
  function ls() {
    rt = bi.current, We(gt), We(bi);
  }
  var Mn = an(null), Vn = null;
  function vt(e) {
    var n = e.alternate;
    Ie(Tn, Tn.current & 1), Ie(Mn, e), Vn === null && (n === null || gt.current !== null || n.memoizedState !== null) && (Vn = e);
  }
  function ss(e) {
    Ie(Tn, Tn.current), Ie(Mn, e), Vn === null && (Vn = e);
  }
  function gf(e) {
    e.tag === 22 ? (Ie(Tn, Tn.current), Ie(Mn, e), Vn === null && (Vn = e)) : yt();
  }
  function yt() {
    Ie(Tn, Tn.current), Ie(Mn, Mn.current);
  }
  function tr(e) {
    We(Mn), Vn === e && (Vn = null), We(Tn);
  }
  var Tn = an(0);
  function ba(e, n) {
    Ie(Mn, Mn.current), Ie(Tn, n);
  }
  function us(e) {
    We(Tn), We(Mn), Vn === e && (Vn = null);
  }
  function wi(e) {
    for (var n = e; n !== null; ) {
      if (n.tag === 13) {
        var r = n.memoizedState;
        if (r !== null && (r = r.dehydrated, r === null || Tu(r) || Iu(r))) return n;
      } else if (n.tag === 19 && n.memoizedProps.revealOrder !== "independent") {
        if ((n.flags & 128) !== 0) return n;
      } else if (n.child !== null) {
        n.child.return = n, n = n.child;
        continue;
      }
      if (n === e) break;
      for (; n.sibling === null; ) {
        if (n.return === null || n.return === e) return null;
        n = n.return;
      }
      n.sibling.return = n.return, n = n.sibling;
    }
    return null;
  }
  var Zr = 0, ve = null, Ye = null, bn = null, ki = !1, No = !1, Kt = !1, Si = 0, wa = 0, Co = null, qm = 0;
  function fn() {
    throw Error(s(321));
  }
  function cs(e, n) {
    if (n === null) return !1;
    for (var r = 0; r < n.length && r < e.length; r++) if (!rr(e[r], n[r])) return !1;
    return !0;
  }
  function fs(e, n, r, t, o, a) {
    return Zr = a, ve = n, n.memoizedState = null, n.updateQueue = null, n.lanes = 0, q.H = e === null || e.memoizedState === null ? Jf : ed, Kt = !1, a = r(t, o), Kt = !1, No && (a = yf(n, r, t, o)), vf(e), a;
  }
  function vf(e) {
    q.H = _i;
    var n = Ye !== null && Ye.next !== null;
    if (Zr = 0, bn = Ye = ve = null, ki = !1, wa = 0, Co = null, n) throw Error(s(300));
    e === null || wn || (e = e.dependencies, e !== null && di(e) && (wn = !0));
  }
  function yf(e, n, r, t) {
    ve = e;
    var o = 0;
    do {
      if (No && (Co = null), wa = 0, No = !1, 25 <= o) throw Error(s(301));
      if (o += 1, bn = Ye = null, e.updateQueue != null) {
        var a = e.updateQueue;
        a.lastEffect = null, a.events = null, a.stores = null, a.memoCache != null && (a.memoCache.index = 0);
      }
      q.H = eg, a = n(r, t);
    } while (No);
    return a;
  }
  function Qm() {
    var e = q.H, n = e.useState()[0];
    return n = typeof n.then == "function" ? ka(n) : n, e = e.useState()[0], (Ye !== null ? Ye.memoizedState : null) !== e && (ve.flags |= 1024), n;
  }
  function ds() {
    var e = Si !== 0;
    return Si = 0, e;
  }
  function ps(e, n, r) {
    n.updateQueue = e.updateQueue, n.flags &= -2053, e.lanes &= ~r;
  }
  function hs(e) {
    if (ki) {
      for (e = e.memoizedState; e !== null; ) {
        var n = e.queue;
        n !== null && (n.pending = null), e = e.next;
      }
      ki = !1;
    }
    Zr = 0, bn = Ye = ve = null, No = !1, wa = Si = 0, Co = null;
  }
  function Wn() {
    var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return bn === null ? ve.memoizedState = bn = e : bn = bn.next = e, bn;
  }
  function hn() {
    if (Ye === null) {
      var e = ve.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = Ye.next;
    var n = bn === null ? ve.memoizedState : bn.next;
    if (n !== null) bn = n, Ye = e;
    else {
      if (e === null) throw ve.alternate === null ? Error(s(467)) : Error(s(310));
      Ye = e, e = { memoizedState: Ye.memoizedState, baseState: Ye.baseState, baseQueue: Ye.baseQueue, queue: Ye.queue, next: null }, bn === null ? ve.memoizedState = bn = e : bn = bn.next = e;
    }
    return bn;
  }
  function xi() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function ka(e) {
    var n = wa;
    return wa += 1, Co === null && (Co = []), e = sf(Co, e, n), n = ve, (bn === null ? n.memoizedState : bn.next) === null && (n = n.alternate, q.H = n === null || n.memoizedState === null ? Jf : ed), e;
  }
  function Ei(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return ka(e);
      if (e.$$typeof === z) return;
      if (e.$$typeof === Ke) return Ln(e);
    }
    throw Error(s(438, String(e)));
  }
  function ms(e) {
    var n = null, r = ve.updateQueue;
    if (r !== null && (n = r.memoCache), n == null) {
      var t = ve.alternate;
      t !== null && (t = t.updateQueue, t !== null && (t = t.memoCache, t != null && (n = { data: t.data.map(function(o) {
        return o.slice();
      }), index: 0 })));
    }
    if (n == null && (n = { data: [], index: 0 }), r === null && (r = xi(), ve.updateQueue = r), r.memoCache = n, r = n.data[n.index], r === void 0) for (r = n.data[n.index] = Array(e), t = 0; t < e; t++) r[t] = Jn;
    return n.index++, r;
  }
  function Jr(e, n) {
    return typeof n == "function" ? n(e) : n;
  }
  function Ni(e) {
    var n = hn();
    return gs(n, Ye, e);
  }
  function gs(e, n, r) {
    var t = e.queue;
    if (t === null) throw Error(s(311));
    t.lastRenderedReducer = r;
    var o = e.baseQueue, a = t.pending;
    if (a !== null) {
      if (o !== null) {
        var i = o.next;
        o.next = a.next, a.next = i;
      }
      n.baseQueue = o = a, t.pending = null;
    }
    if (a = e.baseState, o === null) e.memoizedState = a;
    else {
      n = o.next;
      var l = i = null, u = null, g = n, w = !1;
      do {
        var E = g.lane & -536870913;
        if (E !== g.lane ? (Oe & E) === E : (Zr & E) === E) {
          var h = g.revertLane;
          if (h === 0) u !== null && (u = u.next = { lane: 0, revertLane: 0, gesture: null, action: g.action, hasEagerState: g.hasEagerState, eagerState: g.eagerState, next: null }), E === qt && (w = !0);
          else if ((Zr & h) === h) {
            g = g.next, h === qt && (w = !0);
            continue;
          } else E = { lane: 0, revertLane: g.revertLane, gesture: null, action: g.action, hasEagerState: g.hasEagerState, eagerState: g.eagerState, next: null }, u === null ? (l = u = E, i = a) : u = u.next = E, ve.lanes |= h, St |= h;
          E = g.action, Kt && r(a, E), a = g.hasEagerState ? g.eagerState : r(a, E);
        } else h = { lane: E, revertLane: g.revertLane, gesture: g.gesture, action: g.action, hasEagerState: g.hasEagerState, eagerState: g.eagerState, next: null }, u === null ? (l = u = h, i = a) : u = u.next = h, ve.lanes |= E, St |= E;
        g = g.next;
      } while (g !== null && g !== n);
      if (u === null ? i = a : u.next = l, !rr(a, e.memoizedState) && (wn = !0, w && (r = So, r !== null))) throw r;
      e.memoizedState = a, e.baseState = i, e.baseQueue = u, t.lastRenderedState = a;
    }
    return o === null && (t.lanes = 0), [e.memoizedState, t.dispatch];
  }
  function vs(e) {
    var n = hn(), r = n.queue;
    if (r === null) throw Error(s(311));
    r.lastRenderedReducer = e;
    var t = r.dispatch, o = r.pending, a = n.memoizedState;
    if (o !== null) {
      r.pending = null;
      var i = o = o.next;
      do
        a = e(a, i.action), i = i.next;
      while (i !== o);
      rr(a, n.memoizedState) || (wn = !0), n.memoizedState = a, n.baseQueue === null && (n.baseState = a), r.lastRenderedState = a;
    }
    return [a, t];
  }
  function bf(e, n, r) {
    var t = ve, o = hn(), a = Se;
    if (a) {
      if (r === void 0) throw Error(s(407));
      r = r();
    } else r = n();
    var i = !rr((Ye || o).memoizedState, r);
    if (i && (o.memoizedState = r, wn = !0), o = o.queue, ws(Sf.bind(null, t, o, e), [e]), e = o.getSnapshot !== n || i || bn !== null && (bn.memoizedState.tag & 1) !== 0, Po(e ? 9 : 8, { destroy: void 0 }, kf.bind(null, t, o, r, n), null), e) {
      if (t.flags |= 2048, en === null) throw Error(s(349));
      a || (Zr & 127) !== 0 || wf(t, n, r);
    }
    return r;
  }
  function wf(e, n, r) {
    e.flags |= 16384, e = { getSnapshot: n, value: r }, n = ve.updateQueue, n === null ? (n = xi(), ve.updateQueue = n, n.stores = [e]) : (r = n.stores, r === null ? n.stores = [e] : r.push(e));
  }
  function kf(e, n, r, t) {
    n.value = r, n.getSnapshot = t, xf(n) && Ef(e);
  }
  function Sf(e, n, r) {
    return r(function() {
      xf(n) && Ef(e);
    });
  }
  function xf(e) {
    var n = e.getSnapshot;
    e = e.value;
    try {
      var r = n();
      return !rr(e, r);
    } catch {
      return !0;
    }
  }
  function Ef(e) {
    var n = Rt(e, 2);
    n !== null && Zn(n, e, 2);
  }
  function ys(e) {
    var n = Wn();
    if (typeof e == "function") {
      var r = e;
      if (e = r(), Kt) {
        Je(!0);
        try {
          r();
        } finally {
          Je(!1);
        }
      }
    }
    return n.memoizedState = n.baseState = e, n.queue = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: Jr, lastRenderedState: e }, n;
  }
  function Nf(e, n, r, t) {
    return e.baseState = r, gs(e, Ye, typeof t == "function" ? t : Jr);
  }
  function Ym(e, n, r, t, o) {
    if (zi(e)) throw Error(s(485));
    if (e = n.action, e !== null) {
      var a = { payload: o, action: e, next: null, isTransition: !0, status: "pending", value: null, reason: null, listeners: [], then: function(i) {
        a.listeners.push(i);
      } };
      q.T !== null ? r(!0) : a.isTransition = !1, t(a), r = n.pending, r === null ? (a.next = n.pending = a, Cf(n, a)) : (a.next = r.next, n.pending = r.next = a);
    }
  }
  function Cf(e, n) {
    var r = n.action, t = n.payload, o = e.state;
    if (n.isTransition) {
      var a = q.T, i = {};
      i.types = a !== null ? a.types : null, q.T = i;
      try {
        var l = r(o, t), u = q.S;
        u !== null && u(i, l), Pf(e, n, l);
      } catch (g) {
        bs(e, n, g);
      } finally {
        a !== null && i.types !== null && (a.types = i.types), q.T = a;
      }
    } else try {
      a = r(o, t), Pf(e, n, a);
    } catch (g) {
      bs(e, n, g);
    }
  }
  function Pf(e, n, r) {
    r !== null && typeof r == "object" && typeof r.then == "function" ? r.then(function(t) {
      zf(e, n, t);
    }, function(t) {
      return bs(e, n, t);
    }) : zf(e, n, r);
  }
  function zf(e, n, r) {
    n.status = "fulfilled", n.value = r, _f(n), e.state = r, n = e.pending, n !== null && (r = n.next, r === n ? e.pending = null : (r = r.next, n.next = r, Cf(e, r)));
  }
  function bs(e, n, r) {
    var t = e.pending;
    if (e.pending = null, t !== null) {
      t = t.next;
      do
        n.status = "rejected", n.reason = r, _f(n), n = n.next;
      while (n !== t);
    }
    e.action = null;
  }
  function _f(e) {
    e = e.listeners;
    for (var n = 0; n < e.length; n++) (0, e[n])();
  }
  function Lf(e, n) {
    return n;
  }
  function Mf(e, n) {
    if (Se) {
      var r = en.formState;
      if (r !== null) {
        e: {
          var t = ve;
          if (Se) {
            if (tn) {
              n: {
                for (var o = tn, a = pr; o.nodeType !== 8; ) {
                  if (!a) {
                    o = null;
                    break n;
                  }
                  if (o = mr(o.nextSibling), o === null) {
                    o = null;
                    break n;
                  }
                }
                a = o.data, o = a === "F!" || a === "F" ? o : null;
              }
              if (o) {
                tn = mr(o.nextSibling), t = o.data === "F!";
                break e;
              }
            }
            ct(t);
          }
          t = !1;
        }
        t && (n = r[0]);
      }
    }
    return r = Wn(), r.memoizedState = r.baseState = n, t = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: Lf, lastRenderedState: n }, r.queue = t, r = Gf.bind(null, ve, t), t.dispatch = r, t = ys(!1), a = Ns.bind(null, ve, !1, t.queue), t = Wn(), o = { state: n, dispatch: null, action: e, pending: null }, t.queue = o, r = Ym.bind(null, ve, o, a, r), o.dispatch = r, t.memoizedState = e, [n, r, !1];
  }
  function Tf(e) {
    var n = hn();
    return If(n, Ye, e);
  }
  function If(e, n, r) {
    if (n = gs(e, n, Lf)[0], e = Ni(Jr)[0], typeof n == "object" && n !== null && typeof n.then == "function") try {
      var t = ka(n);
    } catch (i) {
      throw i === xo ? mi : i;
    }
    else t = n;
    n = hn();
    var o = n.queue, a = o.dispatch;
    return r !== n.memoizedState && (ve.flags |= 2048, Po(9, { destroy: void 0 }, Xm.bind(null, o, r), null)), [t, a, e];
  }
  function Xm(e, n) {
    e.action = n;
  }
  function Of(e) {
    var n = hn(), r = Ye;
    if (r !== null) return If(n, r, e);
    hn(), n = n.memoizedState, r = hn();
    var t = r.queue.dispatch;
    return r.memoizedState = e, [n, t, !1];
  }
  function Po(e, n, r, t) {
    return e = { tag: e, create: r, deps: t, inst: n, next: null }, n = ve.updateQueue, n === null && (n = xi(), ve.updateQueue = n), r = n.lastEffect, r === null ? n.lastEffect = e.next = e : (t = r.next, r.next = e, e.next = t, n.lastEffect = e), e;
  }
  function Af() {
    return hn().memoizedState;
  }
  function Ci(e, n, r, t) {
    var o = Wn();
    ve.flags |= e, o.memoizedState = Po(1 | n, { destroy: void 0 }, r, t === void 0 ? null : t);
  }
  function Pi(e, n, r, t) {
    var o = hn();
    t = t === void 0 ? null : t;
    var a = o.memoizedState.inst;
    Ye !== null && t !== null && cs(t, Ye.memoizedState.deps) ? o.memoizedState = Po(n, a, r, t) : (ve.flags |= e, o.memoizedState = Po(1 | n, a, r, t));
  }
  function Df(e, n) {
    Ci(8390656, 8, e, n);
  }
  function ws(e, n) {
    Pi(2048, 8, e, n);
  }
  function Gm(e) {
    ve.flags |= 4;
    var n = ve.updateQueue;
    if (n === null) n = xi(), ve.updateQueue = n, n.events = [e];
    else {
      var r = n.events;
      r === null ? n.events = [e] : r.push(e);
    }
  }
  function Ff(e) {
    var n = hn().memoizedState;
    return Gm({ ref: n, nextImpl: e }), function() {
      if ((Ue & 2) !== 0) throw Error(s(440));
      return n.impl.apply(void 0, arguments);
    };
  }
  function jf(e, n) {
    return Pi(4, 2, e, n);
  }
  function $f(e, n) {
    return Pi(4, 4, e, n);
  }
  function Rf(e, n) {
    if (typeof n == "function") {
      e = e();
      var r = n(e);
      return function() {
        typeof r == "function" ? r() : n(null);
      };
    }
    if (n != null) return e = e(), n.current = e, function() {
      n.current = null;
    };
  }
  function Uf(e, n, r) {
    r = r != null ? r.concat([e]) : null, Pi(4, 4, Rf.bind(null, n, e), r);
  }
  function ks() {
  }
  function Vf(e, n) {
    var r = hn();
    n = n === void 0 ? null : n;
    var t = r.memoizedState;
    return n !== null && cs(n, t[1]) ? t[0] : (r.memoizedState = [e, n], e);
  }
  function Wf(e, n) {
    var r = hn();
    n = n === void 0 ? null : n;
    var t = r.memoizedState;
    if (n !== null && cs(n, t[1])) return t[0];
    if (t = e(), Kt) {
      Je(!0);
      try {
        e();
      } finally {
        Je(!1);
      }
    }
    return r.memoizedState = [t, n], t;
  }
  function Ss(e, n, r) {
    return r === void 0 || (Zr & 1073741824) !== 0 && (Oe & 261930) === 0 ? e.memoizedState = n : (e.memoizedState = r, e = Jd(), ve.lanes |= e, St |= e, r);
  }
  function Bf(e, n, r, t) {
    return rr(r, n) ? r : gt.current !== null ? (e = Ss(e, r, t), rr(e, n) || (wn = !0), e) : (Zr & 106) === 0 || (Zr & 1073741824) !== 0 && (Oe & 261930) === 0 ? (wn = !0, e.memoizedState = r) : (e = Jd(), ve.lanes |= e, St |= e, n);
  }
  function Hf(e, n, r, t, o) {
    var a = te.p;
    te.p = a !== 0 && 8 > a ? a : 8;
    var i = q.T, l = {};
    l.types = i !== null ? i.types : null, q.T = l, Ns(e, !1, n, r);
    try {
      var u = o(), g = q.S;
      if (g !== null && g(l, u), u !== null && typeof u == "object" && typeof u.then == "function") {
        var w = Hm(u, t);
        Sa(e, n, w, lr(e));
      } else Sa(e, n, t, lr(e));
    } catch (E) {
      Sa(e, n, { then: function() {
      }, status: "rejected", reason: E }, lr());
    } finally {
      te.p = a, i !== null && l.types !== null && (i.types = l.types), q.T = i;
    }
  }
  function Km() {
  }
  function xs(e, n, r, t) {
    if (e.tag !== 5) throw Error(s(476));
    var o = qf(e).queue;
    Hf(e, o, n, A, r === null ? Km : function() {
      return Qf(e), r(t);
    });
  }
  function qf(e) {
    var n = e.memoizedState;
    if (n !== null) return n;
    n = { memoizedState: A, baseState: A, baseQueue: null, queue: { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: Jr, lastRenderedState: A }, next: null };
    var r = {};
    return n.next = { memoizedState: r, baseState: r, baseQueue: null, queue: { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: Jr, lastRenderedState: r }, next: null }, e.memoizedState = n, e = e.alternate, e !== null && (e.memoizedState = n), n;
  }
  function Qf(e) {
    var n = qf(e);
    n.next === null && (n = e.alternate.memoizedState), Sa(e, n.next.queue, {}, lr());
  }
  function Es() {
    return Ln(qo);
  }
  function Yf() {
    return hn().memoizedState;
  }
  function Xf() {
    return hn().memoizedState;
  }
  function Zm(e) {
    for (var n = e.return; n !== null; ) {
      switch (n.tag) {
        case 24:
        case 3:
          var r = lr();
          e = ht(r);
          var t = mt(n, e, r);
          t !== null && (Zn(t, n, r), ga(t, n, r)), n = { cache: Zl() }, e.payload = n;
          return;
      }
      n = n.return;
    }
  }
  function Jm(e, n, r) {
    var t = lr();
    r = { lane: t, revertLane: 0, gesture: null, action: r, hasEagerState: !1, eagerState: null, next: null }, zi(e) ? Kf(n, r) : (r = Wl(e, n, r, t), r !== null && (Zn(r, e, t), Zf(r, n, t)));
  }
  function Gf(e, n, r) {
    var t = lr();
    Sa(e, n, r, t);
  }
  function Sa(e, n, r, t) {
    var o = { lane: t, revertLane: 0, gesture: null, action: r, hasEagerState: !1, eagerState: null, next: null };
    if (zi(e)) Kf(n, o);
    else {
      var a = e.alternate;
      if (e.lanes === 0 && (a === null || a.lanes === 0) && (a = n.lastRenderedReducer, a !== null)) try {
        var i = n.lastRenderedState, l = a(i, r);
        if (o.hasEagerState = !0, o.eagerState = l, rr(l, i)) return ai(e, n, o, 0), en === null && oi(), !1;
      } catch {
      } finally {
      }
      if (r = Wl(e, n, o, t), r !== null) return Zn(r, e, t), Zf(r, n, t), !0;
    }
    return !1;
  }
  function Ns(e, n, r, t) {
    if (t = { lane: 2, revertLane: gu(), gesture: null, action: t, hasEagerState: !1, eagerState: null, next: null }, zi(e)) {
      if (n) throw Error(s(479));
    } else n = Wl(e, r, t, 2), n !== null && Zn(n, e, 2);
  }
  function zi(e) {
    var n = e.alternate;
    return e === ve || n !== null && n === ve;
  }
  function Kf(e, n) {
    No = ki = !0;
    var r = e.pending;
    r === null ? n.next = n : (n.next = r.next, r.next = n), e.pending = n;
  }
  function Zf(e, n, r) {
    if ((r & 4194048) !== 0) {
      var t = n.lanes;
      t &= e.pendingLanes, r |= t, n.lanes = r, Zu(e, r);
    }
  }
  var _i = { readContext: Ln, use: Ei, useCallback: fn, useContext: fn, useEffect: fn, useImperativeHandle: fn, useLayoutEffect: fn, useInsertionEffect: fn, useMemo: fn, useReducer: fn, useRef: fn, useState: fn, useDebugValue: fn, useDeferredValue: fn, useTransition: fn, useSyncExternalStore: fn, useId: fn, useHostTransitionStatus: fn, useFormState: fn, useActionState: fn, useOptimistic: fn, useMemoCache: fn, useCacheRefresh: fn, useEffectEvent: fn }, Jf = { readContext: Ln, use: Ei, useCallback: function(e, n) {
    return Wn().memoizedState = [e, n === void 0 ? null : n], e;
  }, useContext: Ln, useEffect: Df, useImperativeHandle: function(e, n, r) {
    r = r != null ? r.concat([e]) : null, Ci(4194308, 4, Rf.bind(null, n, e), r);
  }, useLayoutEffect: function(e, n) {
    return Ci(4194308, 4, e, n);
  }, useInsertionEffect: function(e, n) {
    Ci(4, 2, e, n);
  }, useMemo: function(e, n) {
    var r = Wn();
    n = n === void 0 ? null : n;
    var t = e();
    if (Kt) {
      Je(!0);
      try {
        e();
      } finally {
        Je(!1);
      }
    }
    return r.memoizedState = [t, n], t;
  }, useReducer: function(e, n, r) {
    var t = Wn();
    if (r !== void 0) {
      var o = r(n);
      if (Kt) {
        Je(!0);
        try {
          r(n);
        } finally {
          Je(!1);
        }
      }
    } else o = n;
    return t.memoizedState = t.baseState = o, e = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: o }, t.queue = e, e = e.dispatch = Jm.bind(null, ve, e), [t.memoizedState, e];
  }, useRef: function(e) {
    var n = Wn();
    return e = { current: e }, n.memoizedState = e;
  }, useState: function(e) {
    e = ys(e);
    var n = e.queue, r = Gf.bind(null, ve, n);
    return n.dispatch = r, [e.memoizedState, r];
  }, useDebugValue: ks, useDeferredValue: function(e, n) {
    var r = Wn();
    return Ss(r, e, n);
  }, useTransition: function() {
    var e = ys(!1);
    return e = Hf.bind(null, ve, e.queue, !0, !1), Wn().memoizedState = e, [!1, e];
  }, useSyncExternalStore: function(e, n, r) {
    var t = ve, o = Wn();
    if (Se) {
      if (r === void 0) throw Error(s(407));
      r = r();
    } else {
      if (r = n(), en === null) throw Error(s(349));
      (Oe & 127) !== 0 || wf(t, n, r);
    }
    o.memoizedState = r;
    var a = { value: r, getSnapshot: n };
    return o.queue = a, Df(Sf.bind(null, t, a, e), [e]), t.flags |= 2048, Po(9, { destroy: void 0 }, kf.bind(null, t, a, r, n), null), r;
  }, useId: function() {
    var e = Wn(), n = en.identifierPrefix;
    if (Se) {
      var r = Mr, t = Lr;
      r = (t & ~(1 << 32 - we(t) - 1)).toString(32) + r, n = "_" + n + "R_" + r, r = Si++, 0 < r && (n += "H" + r.toString(32)), n += "_";
    } else r = qm++, n = "_" + n + "r_" + r.toString(32) + "_";
    return e.memoizedState = n;
  }, useHostTransitionStatus: Es, useFormState: Mf, useActionState: Mf, useOptimistic: function(e) {
    var n = Wn();
    n.memoizedState = n.baseState = e;
    var r = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: null, lastRenderedState: null };
    return n.queue = r, n = Ns.bind(null, ve, !0, r), r.dispatch = n, [e, n];
  }, useMemoCache: ms, useCacheRefresh: function() {
    return Wn().memoizedState = Zm.bind(null, ve);
  }, useEffectEvent: function(e) {
    var n = Wn(), r = { impl: e };
    return n.memoizedState = r, function() {
      if ((Ue & 2) !== 0) throw Error(s(440));
      return r.impl.apply(void 0, arguments);
    };
  } }, ed = { readContext: Ln, use: Ei, useCallback: Vf, useContext: Ln, useEffect: ws, useImperativeHandle: Uf, useInsertionEffect: jf, useLayoutEffect: $f, useMemo: Wf, useReducer: Ni, useRef: Af, useState: function() {
    return Ni(Jr);
  }, useDebugValue: ks, useDeferredValue: function(e, n) {
    var r = hn();
    return Bf(r, Ye.memoizedState, e, n);
  }, useTransition: function() {
    var e = Ni(Jr)[0], n = hn().memoizedState;
    return [typeof e == "boolean" ? e : ka(e), n];
  }, useSyncExternalStore: bf, useId: Yf, useHostTransitionStatus: Es, useFormState: Tf, useActionState: Tf, useOptimistic: function(e, n) {
    var r = hn();
    return Nf(r, Ye, e, n);
  }, useMemoCache: ms, useCacheRefresh: Xf, useEffectEvent: Ff }, eg = { readContext: Ln, use: Ei, useCallback: Vf, useContext: Ln, useEffect: ws, useImperativeHandle: Uf, useInsertionEffect: jf, useLayoutEffect: $f, useMemo: Wf, useReducer: vs, useRef: Af, useState: function() {
    return vs(Jr);
  }, useDebugValue: ks, useDeferredValue: function(e, n) {
    var r = hn();
    return Ye === null ? Ss(r, e, n) : Bf(r, Ye.memoizedState, e, n);
  }, useTransition: function() {
    var e = vs(Jr)[0], n = hn().memoizedState;
    return [typeof e == "boolean" ? e : ka(e), n];
  }, useSyncExternalStore: bf, useId: Yf, useHostTransitionStatus: Es, useFormState: Of, useActionState: Of, useOptimistic: function(e, n) {
    var r = hn();
    return Ye !== null ? Nf(r, Ye, e, n) : (r.baseState = e, [e, r.queue.dispatch]);
  }, useMemoCache: ms, useCacheRefresh: Xf, useEffectEvent: Ff };
  function Cs(e, n, r, t) {
    n = e.memoizedState, r = r(t, n), r = r == null ? n : W({}, n, r), e.memoizedState = r, e.lanes === 0 && (e.updateQueue.baseState = r);
  }
  var Ps = { enqueueSetState: function(e, n, r) {
    e = e._reactInternals;
    var t = lr(), o = ht(t);
    o.payload = n, r != null && (o.callback = r), n = mt(e, o, t), n !== null && (Zn(n, e, t), ga(n, e, t));
  }, enqueueReplaceState: function(e, n, r) {
    e = e._reactInternals;
    var t = lr(), o = ht(t);
    o.tag = 1, o.payload = n, r != null && (o.callback = r), n = mt(e, o, t), n !== null && (Zn(n, e, t), ga(n, e, t));
  }, enqueueForceUpdate: function(e, n) {
    e = e._reactInternals;
    var r = lr(), t = ht(r);
    t.tag = 2, n != null && (t.callback = n), n = mt(e, t, r), n !== null && (Zn(n, e, r), ga(n, e, r));
  } };
  function nd(e, n, r, t, o, a, i) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(t, a, i) : n.prototype && n.prototype.isPureReactComponent ? !sa(r, t) || !sa(o, a) : !0;
  }
  function rd(e, n, r, t) {
    e = n.state, typeof n.componentWillReceiveProps == "function" && n.componentWillReceiveProps(r, t), typeof n.UNSAFE_componentWillReceiveProps == "function" && n.UNSAFE_componentWillReceiveProps(r, t), n.state !== e && Ps.enqueueReplaceState(n, n.state, null);
  }
  function Zt(e, n) {
    var r = n;
    if ("ref" in n) {
      r = {};
      for (var t in n) t !== "ref" && (r[t] = n[t]);
    }
    if (e = e.defaultProps) {
      r === n && (r = W({}, r));
      for (var o in e) r[o] === void 0 && (r[o] = e[o]);
    }
    return r;
  }
  function td(e) {
    ti(e);
  }
  function od(e) {
    console.error(e);
  }
  function ad(e) {
    ti(e);
  }
  function Li(e, n) {
    try {
      var r = e.onUncaughtError;
      r(n.value, { componentStack: n.stack });
    } catch (t) {
      setTimeout(function() {
        throw t;
      });
    }
  }
  function id(e, n, r) {
    try {
      var t = e.onCaughtError;
      t(r.value, { componentStack: r.stack, errorBoundary: n.tag === 1 ? n.stateNode : null });
    } catch (o) {
      setTimeout(function() {
        throw o;
      });
    }
  }
  function zs(e, n, r) {
    return r = ht(r), r.tag = 3, r.payload = { element: null }, r.callback = function() {
      Li(e, n);
    }, r;
  }
  function ld(e) {
    return e = ht(e), e.tag = 3, e;
  }
  function sd(e, n, r, t) {
    var o = r.type.getDerivedStateFromError;
    if (typeof o == "function") {
      var a = t.value;
      e.payload = function() {
        return o(a);
      }, e.callback = function() {
        id(n, r, t);
      };
    }
    var i = r.stateNode;
    i !== null && typeof i.componentDidCatch == "function" && (e.callback = function() {
      id(n, r, t), typeof o != "function" && (xt === null ? xt = /* @__PURE__ */ new Set([this]) : xt.add(this));
      var l = t.stack;
      this.componentDidCatch(t.value, { componentStack: l !== null ? l : "" });
    });
  }
  function ng(e, n, r, t, o) {
    if (r.flags |= 32768, t !== null && typeof t == "object" && typeof t.then == "function") {
      if (n = r.alternate, n !== null && Bt(n, r, o, !0), r = Mn.current, r !== null) {
        switch (r.tag) {
          case 31:
          case 13:
          case 19:
            return Vn === null ? Gi() : r.alternate === null && dn === 0 && (dn = 3), r.flags &= -257, r.flags |= 65536, r.lanes = o, t === gi ? r.flags |= 16384 : (n = r.updateQueue, n === null ? r.updateQueue = /* @__PURE__ */ new Set([t]) : n.add(t), pu(e, t, o)), !1;
          case 22:
            return r.flags |= 65536, t === gi ? r.flags |= 16384 : (n = r.updateQueue, n === null ? (n = { transitions: null, markerInstances: null, retryQueue: /* @__PURE__ */ new Set([t]) }, r.updateQueue = n) : (r = n.retryQueue, r === null ? n.retryQueue = /* @__PURE__ */ new Set([t]) : r.add(t)), pu(e, t, o)), !1;
        }
        throw Error(s(435, r.tag));
      }
      return pu(e, t, o), Gi(), !1;
    }
    if (Se) return n = Mn.current, n !== null ? ((n.flags & 65536) === 0 && (n.flags |= 256), n.flags |= 65536, n.lanes = o, t !== Yl && (e = Error(s(422), { cause: t }), fa(cr(e, r)))) : (t !== Yl && (n = Error(s(423), { cause: t }), fa(cr(n, r))), e = e.current.alternate, e.flags |= 65536, o &= -o, e.lanes |= o, t = cr(t, r), o = zs(e.stateNode, t, o), os(e, o), dn !== 4 && (dn = 2)), !1;
    var a = Error(s(520), { cause: t });
    if (a = cr(a, r), La === null ? La = [a] : La.push(a), dn !== 4 && (dn = 2), n === null) return !0;
    t = cr(t, r), r = n;
    do {
      switch (r.tag) {
        case 3:
          return r.flags |= 65536, e = o & -o, r.lanes |= e, e = zs(r.stateNode, t, e), os(r, e), !1;
        case 1:
          if (n = r.type, a = r.stateNode, (r.flags & 128) === 0 && (typeof n.getDerivedStateFromError == "function" || a !== null && typeof a.componentDidCatch == "function" && (xt === null || !xt.has(a)))) return r.flags |= 65536, o &= -o, r.lanes |= o, o = ld(o), sd(o, e, r, t), os(r, o), !1;
          break;
        case 22:
          if (r.memoizedState !== null) return r.flags |= 65536, !1;
      }
      r = r.return;
    } while (r !== null);
    return !1;
  }
  var _s = Error(s(461)), wn = !1;
  function Sn(e, n, r, t) {
    n.child = e === null ? df(n, null, r, t) : Gt(n, e.child, r, t);
  }
  function ud(e, n, r, t, o) {
    r = r.render;
    var a = n.ref;
    if ("ref" in t) {
      var i = {};
      for (var l in t) l !== "ref" && (i[l] = t[l]);
    } else i = t;
    return Ht(n), t = fs(e, n, r, i, a, o), l = ds(), e !== null && !wn ? (ps(e, n, o), et(e, n, o)) : (Se && l && ui(n), n.flags |= 1, Sn(e, n, t, o), n.child);
  }
  function cd(e, n, r, t, o) {
    if (e === null) {
      var a = r.type;
      return typeof a == "function" && !Bl(a) && a.defaultProps === void 0 && r.compare === null ? (n.tag = 15, n.type = a, fd(e, n, a, t, o)) : (e = li(r.type, null, t, n, n.mode, o), e.ref = n.ref, e.return = n, n.child = e);
    }
    if (a = e.child, !Fs(e, o)) {
      var i = a.memoizedProps;
      if (r = r.compare, r = r !== null ? r : sa, r(i, t) && e.ref === n.ref) return et(e, n, o);
    }
    return n.flags |= 1, e = Yr(a, t), e.ref = n.ref, e.return = n, n.child = e;
  }
  function fd(e, n, r, t, o) {
    if (e !== null) {
      var a = e.memoizedProps;
      if (sa(a, t) && e.ref === n.ref) if (wn = !1, n.pendingProps = t = a, Fs(e, o)) (e.flags & 131072) !== 0 && (wn = !0);
      else return n.lanes = e.lanes, et(e, n, o);
    }
    return Ls(e, n, r, t, o);
  }
  function dd(e, n, r, t) {
    var o = t.children, a = e !== null ? e.memoizedState : null;
    if (e === null && n.stateNode === null && (n.stateNode = { _visibility: 1, _pendingMarkers: null, _retryCache: null, _transitions: null }), t.mode === "hidden") {
      if ((n.flags & 128) !== 0) {
        if (a = a !== null ? a.baseLanes | r : r, e !== null) {
          for (t = n.child = e.child, o = 0; t !== null; ) o = o | t.lanes | t.childLanes, t = t.sibling;
          t = o & ~a;
        } else t = 0, n.child = null;
        return pd(e, n, a, r, t);
      }
      if ((r & 536870912) !== 0) n.memoizedState = { baseLanes: 0, cachePool: null }, e !== null && hi(n, a !== null ? a.cachePool : null), a !== null ? mf(n, a) : is(), gf(n);
      else return t = n.lanes = 536870912, pd(e, n, a !== null ? a.baseLanes | r : r, r, t);
    } else a !== null ? (hi(n, a.cachePool), mf(n, a), yt(), n.memoizedState = null) : (e !== null && hi(n, null), is(), yt());
    return Sn(e, n, o, r), n.child;
  }
  function xa(e, n) {
    return e !== null && e.tag === 22 || n.stateNode !== null || (n.stateNode = { _visibility: 1, _pendingMarkers: null, _retryCache: null, _transitions: null }), n.sibling;
  }
  function pd(e, n, r, t, o) {
    var a = es();
    return a = a === null ? null : { parent: yn._currentValue, pool: a }, n.memoizedState = { baseLanes: r, cachePool: a }, e !== null && hi(n, null), is(), gf(n), e !== null && Bt(e, n, t, !0), n.childLanes = o, null;
  }
  function Mi(e, n) {
    return n = Ti({ mode: n.mode, children: n.children }, e.mode), n.ref = e.ref, e.child = n, n.return = e, n;
  }
  function hd(e, n, r) {
    return Gt(n, e.child, null, r), e = Mi(n, n.pendingProps), e.flags |= 2, tr(n), n.memoizedState = null, e;
  }
  function rg(e, n, r) {
    var t = n.pendingProps, o = (n.flags & 128) !== 0;
    if (n.flags &= -129, e === null) {
      if (Se) {
        if (t.mode === "hidden") return e = Mi(n, t), n.lanes = 536870912, e.memoizedState = { baseLanes: 0, cachePool: null }, xa(null, e);
        if (ss(n), (e = tn) ? (e = Rp(e, pr), e = e !== null && e.data === "&" ? e : null, e !== null && (n.memoizedState = { dehydrated: e, treeContext: st !== null ? { id: Lr, overflow: Mr } : null, retryLane: 536870912, hydrationErrors: null }, r = Gc(e), r.return = n, n.child = r, Nn = n, tn = null)) : e = null, e === null) throw ct(n);
        return n.lanes = 536870912, null;
      }
      return Mi(n, t);
    }
    var a = e.memoizedState;
    if (a !== null) {
      var i = a.dehydrated;
      if (ss(n), o) if (n.flags & 256) n.flags &= -257, n = hd(e, n, r);
      else if (n.memoizedState !== null) n.child = e.child, n.flags |= 128, n = null;
      else throw Error(s(558));
      else if (wn || Bt(e, n, r, !1), o = (r & e.childLanes) !== 0, wn || o) {
        if (gt.current === null) {
          if (t = en, t !== null && (i = Ju(t, r), i !== 0 && i !== a.retryLane)) throw a.retryLane = i, Rt(e, i), Zn(t, e, i), _s;
          Gi();
        }
        n = hd(e, n, r);
      } else e = a.treeContext, tn = mr(i.nextSibling), Nn = n, Se = !0, ut = null, pr = !1, e !== null && Jc(n, e), n = Mi(n, t), n.flags |= 134221824;
      return n;
    }
    return e = Yr(e.child, { mode: t.mode, children: t.children }), e.ref = n.ref, n.child = e, e.return = n, e;
  }
  function zo(e, n) {
    var r = n.ref;
    if (r === null) e !== null && e.ref !== null && (n.flags |= 4194816);
    else {
      if (typeof r != "function" && typeof r != "object") throw Error(s(284));
      (e === null || e.ref !== r) && (n.flags |= 4194816);
    }
  }
  function Ls(e, n, r, t, o) {
    return Ht(n), r = fs(e, n, r, t, void 0, o), t = ds(), e !== null && !wn ? (ps(e, n, o), et(e, n, o)) : (Se && t && ui(n), n.flags |= 1, Sn(e, n, r, o), n.child);
  }
  function md(e, n, r, t, o, a) {
    return Ht(n), n.updateQueue = null, r = yf(n, t, r, o), vf(e), t = ds(), e !== null && !wn ? (ps(e, n, a), et(e, n, a)) : (Se && t && ui(n), n.flags |= 1, Sn(e, n, r, a), n.child);
  }
  function gd(e, n, r, t, o) {
    if (Ht(n), n.stateNode === null) {
      var a = yo, i = r.contextType;
      typeof i == "object" && i !== null && (a = Ln(i)), a = new r(t, a), n.memoizedState = a.state !== null && a.state !== void 0 ? a.state : null, a.updater = Ps, n.stateNode = a, a._reactInternals = n, a = n.stateNode, a.props = t, a.state = n.memoizedState, a.refs = {}, rs(n), i = r.contextType, a.context = typeof i == "object" && i !== null ? Ln(i) : yo, a.state = n.memoizedState, i = r.getDerivedStateFromProps, typeof i == "function" && (Cs(n, r, i, t), a.state = n.memoizedState), typeof r.getDerivedStateFromProps == "function" || typeof a.getSnapshotBeforeUpdate == "function" || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (i = a.state, typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount(), i !== a.state && Ps.enqueueReplaceState(a, a.state, null), ya(n, t, a, o), va(), a.state = n.memoizedState), typeof a.componentDidMount == "function" && (n.flags |= 4194308), t = !0;
    } else if (e === null) {
      a = n.stateNode;
      var l = n.memoizedProps, u = Zt(r, l);
      a.props = u;
      var g = a.context, w = r.contextType;
      i = yo, typeof w == "object" && w !== null && (i = Ln(w));
      var E = r.getDerivedStateFromProps;
      w = typeof E == "function" || typeof a.getSnapshotBeforeUpdate == "function", l = n.pendingProps !== l, w || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (l || g !== i) && rd(n, a, t, i), pt = !1;
      var h = n.memoizedState;
      a.state = h, ya(n, t, a, o), va(), g = n.memoizedState, l || h !== g || pt ? (typeof E == "function" && (Cs(n, r, E, t), g = n.memoizedState), (u = pt || nd(n, r, u, t, h, g, i)) ? (w || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount()), typeof a.componentDidMount == "function" && (n.flags |= 4194308)) : (typeof a.componentDidMount == "function" && (n.flags |= 4194308), n.memoizedProps = t, n.memoizedState = g), a.props = t, a.state = g, a.context = i, t = u) : (typeof a.componentDidMount == "function" && (n.flags |= 4194308), t = !1);
    } else {
      a = n.stateNode, ts(e, n), i = n.memoizedProps, w = Zt(r, i), a.props = w, E = n.pendingProps, h = a.context, g = r.contextType, u = yo, typeof g == "object" && g !== null && (u = Ln(g)), l = r.getDerivedStateFromProps, (g = typeof l == "function" || typeof a.getSnapshotBeforeUpdate == "function") || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (i !== E || h !== u) && rd(n, a, t, u), pt = !1, h = n.memoizedState, a.state = h, ya(n, t, a, o), va();
      var b = n.memoizedState;
      i !== E || h !== b || pt || e !== null && e.dependencies !== null && di(e.dependencies) ? (typeof l == "function" && (Cs(n, r, l, t), b = n.memoizedState), (w = pt || nd(n, r, w, t, h, b, u) || e !== null && e.dependencies !== null && di(e.dependencies)) ? (g || typeof a.UNSAFE_componentWillUpdate != "function" && typeof a.componentWillUpdate != "function" || (typeof a.componentWillUpdate == "function" && a.componentWillUpdate(t, b, u), typeof a.UNSAFE_componentWillUpdate == "function" && a.UNSAFE_componentWillUpdate(t, b, u)), typeof a.componentDidUpdate == "function" && (n.flags |= 4), typeof a.getSnapshotBeforeUpdate == "function" && (n.flags |= 1024)) : (typeof a.componentDidUpdate != "function" || i === e.memoizedProps && h === e.memoizedState || (n.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || i === e.memoizedProps && h === e.memoizedState || (n.flags |= 1024), n.memoizedProps = t, n.memoizedState = b), a.props = t, a.state = b, a.context = u, t = w) : (typeof a.componentDidUpdate != "function" || i === e.memoizedProps && h === e.memoizedState || (n.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || i === e.memoizedProps && h === e.memoizedState || (n.flags |= 1024), t = !1);
    }
    return a = t, zo(e, n), t = (n.flags & 128) !== 0, a || t ? (a = n.stateNode, r = t && typeof r.getDerivedStateFromError != "function" ? null : a.render(), n.flags |= 1, e !== null && t ? (n.child = Gt(n, e.child, null, o), n.child = Gt(n, null, r, o)) : Sn(e, n, r, o), n.memoizedState = a.state, e = n.child) : e = et(e, n, o), e;
  }
  function vd(e, n, r, t) {
    return Vt(), n.flags |= 256, Sn(e, n, r, t), n.child;
  }
  var Ms = { dehydrated: null, treeContext: null, retryLane: 0, hydrationErrors: null };
  function Ts(e) {
    return { baseLanes: e, cachePool: af() };
  }
  function Is(e, n, r) {
    return e = e !== null ? e.childLanes & ~r : 0, n && (e |= ir), e;
  }
  function yd(e, n, r) {
    var t = n.pendingProps, o = !1, a = (n.flags & 128) !== 0, i;
    if ((i = a) || (i = e !== null && e.memoizedState === null ? !1 : (Tn.current & 2) !== 0), i && (o = !0, n.flags &= -129), i = (n.flags & 32) !== 0, n.flags &= -33, e === null) {
      if (Se) {
        if (o ? vt(n) : yt(), (e = tn) ? (e = Rp(e, pr), e = e !== null && e.data !== "&" ? e : null, e !== null && (n.memoizedState = { dehydrated: e, treeContext: st !== null ? { id: Lr, overflow: Mr } : null, retryLane: 536870912, hydrationErrors: null }, r = Gc(e), r.return = n, n.child = r, Nn = n, tn = null)) : e = null, e === null) throw ct(n);
        return Iu(e) ? n.lanes = 32 : n.lanes = 536870912, null;
      }
      return a = t.children, t = t.fallback, o ? (yt(), o = n.mode, a = Ti({ mode: "hidden", children: a }, o), t = Ut(t, o, r, null), a.return = n, t.return = n, a.sibling = t, n.child = a, t = n.child, t.memoizedState = Ts(r), t.childLanes = Is(e, i, r), n.memoizedState = Ms, xa(null, t)) : (vt(n), Os(n, a));
    }
    var l = e.memoizedState;
    if (l !== null) {
      var u = l.dehydrated;
      if (u !== null) return tg(e, n, a, i, t, u, l, r);
    }
    return o ? (yt(), o = t.fallback, a = n.mode, l = e.child, u = l.sibling, t = Yr(l, { mode: "hidden", children: t.children }), t.subtreeFlags = l.subtreeFlags & 1206910976, u !== null ? o = Yr(u, o) : (o = Ut(o, a, r, null), o.flags |= 2), o.return = n, t.return = n, t.sibling = o, n.child = t, xa(null, t), t = n.child, o = e.child.memoizedState, o === null ? o = Ts(r) : (a = o.cachePool, a !== null ? (l = yn._currentValue, a = a.parent !== l ? { parent: l, pool: l } : a) : a = af(), o = { baseLanes: o.baseLanes | r, cachePool: a }), t.memoizedState = o, t.childLanes = Is(e, i, r), n.memoizedState = Ms, xa(e.child, t)) : (vt(n), r = e.child, e = r.sibling, r = Yr(r, { mode: "visible", children: t.children }), r.return = n, r.sibling = null, e !== null && (i = n.deletions, i === null ? (n.deletions = [e], n.flags |= 16) : i.push(e)), n.child = r, n.memoizedState = null, r);
  }
  function Os(e, n) {
    return n = Ti({ mode: "visible", children: n }, e.mode), n.return = e, e.child = n;
  }
  function Ti(e, n) {
    return e = Yn(22, e, null, n), e.lanes = 0, e;
  }
  function Ii(e, n, r) {
    return Gt(n, e.child, null, r), e = Os(n, n.pendingProps.children), e.flags |= 2, n.memoizedState = null, e;
  }
  function tg(e, n, r, t, o, a, i, l) {
    if (r) return n.flags & 256 ? (vt(n), n.flags &= -257, Ii(e, n, l)) : n.memoizedState !== null ? (yt(), n.child = e.child, n.flags |= 128, null) : (yt(), a = o.fallback, i = n.mode, o = Ti({ mode: "visible", children: o.children }, i), a = Ut(a, i, l, null), a.flags |= 2, o.return = n, a.return = n, o.sibling = a, n.child = o, Gt(n, e.child, null, l), o = n.child, o.memoizedState = Ts(l), o.childLanes = Is(e, t, l), n.memoizedState = Ms, xa(null, o));
    if (vt(n), Iu(a)) {
      if (t = a.nextSibling && a.nextSibling.dataset, t) var u = t.dgst;
      return t = u, t !== "" && (o = Error(s(419)), o.stack = "", o.digest = t, fa({ value: o, source: null, stack: null })), Ii(e, n, l);
    }
    if (wn || Bt(e, n, l, !1), t = (l & e.childLanes) !== 0, wn || t) {
      if (gt.current !== null) return Ii(e, n, l);
      if (t = en, t !== null && (o = Ju(t, l), o !== 0 && o !== i.retryLane)) throw i.retryLane = o, Rt(e, o), Zn(t, e, o), _s;
      return Tu(a) || Gi(), Ii(e, n, l);
    }
    return Tu(a) ? (n.flags |= 192, n.child = e.child, null) : (e = i.treeContext, tn = mr(a.nextSibling), Nn = n, Se = !0, ut = null, pr = !1, e !== null && Jc(n, e), n = Os(n, o.children), n.flags |= 134221824, n);
  }
  function bd(e, n, r) {
    e.lanes |= n;
    var t = e.alternate;
    t !== null && (t.lanes |= n), fi(e.return, n, r);
  }
  function wd(e) {
    for (var n = null; e !== null; ) {
      var r = e.alternate;
      r !== null && wi(r) === null && (n = e), e = e.sibling;
    }
    return n;
  }
  function Oi(e, n, r, t, o, a) {
    var i = e.memoizedState;
    i === null ? e.memoizedState = { isBackwards: n, rendering: null, renderingStartTime: 0, last: t, tail: r, tailMode: o, treeForkCount: a } : (i.isBackwards = n, i.rendering = null, i.renderingStartTime = 0, i.last = t, i.tail = r, i.tailMode = o, i.treeForkCount = a);
  }
  function As(e) {
    var n = e.child;
    for (e.child = null; n !== null; ) {
      var r = n.sibling;
      n.sibling = e.child, e.child = n, n = r;
    }
  }
  function Ds(e, n, r) {
    var t = n.pendingProps, o = t.revealOrder, a = t.tail;
    t = t.children;
    var i = Tn.current;
    if (n.flags & 128) return ba(n, i), null;
    var l = (i & 2) !== 0;
    if (l ? (i = i & 1 | 2, n.flags |= 128) : i &= 1, ba(n, i), o === "backwards" && e !== null ? (As(e), Sn(e, n, t, r), As(e)) : Sn(e, n, t, r), t = Se ? ca : 0, !l && e !== null && (e.flags & 128) !== 0) e: for (e = n.child; e !== null; ) {
      if (e.tag === 13) e.memoizedState !== null && bd(e, r, n);
      else if (e.tag === 19) bd(e, r, n);
      else if (e.child !== null) {
        e.child.return = e, e = e.child;
        continue;
      }
      if (e === n) break e;
      for (; e.sibling === null; ) {
        if (e.return === null || e.return === n) break e;
        e = e.return;
      }
      e.sibling.return = e.return, e = e.sibling;
    }
    switch (o) {
      case "backwards":
        r = wd(n.child), r === null ? (o = n.child, n.child = null) : (o = r.sibling, r.sibling = null, As(n)), Oi(n, !0, o, null, a, t);
        break;
      case "unstable_legacy-backwards":
        for (r = null, o = n.child, n.child = null; o !== null; ) {
          if (e = o.alternate, e !== null && wi(e) === null) {
            n.child = o;
            break;
          }
          e = o.sibling, o.sibling = r, r = o, o = e;
        }
        Oi(n, !0, r, null, a, t);
        break;
      case "together":
        Oi(n, !1, null, null, void 0, t);
        break;
      case "independent":
        n.memoizedState = null;
        break;
      default:
        r = wd(n.child), r === null ? (o = n.child, n.child = null) : (o = r.sibling, r.sibling = null), Oi(n, !1, o, r, a, t);
    }
    return n.child;
  }
  function kd(e, n, r) {
    var t = n.pendingProps;
    return ft(n, n.type, t.value), Sn(e, n, t.children, r), n.child;
  }
  function et(e, n, r) {
    if (e !== null && (n.dependencies = e.dependencies), St |= n.lanes, (r & n.childLanes) === 0) if (e !== null) {
      if (Bt(e, n, r, !1), (r & n.childLanes) === 0) return null;
    } else return null;
    if (e !== null && n.child !== e.child) throw Error(s(153));
    if (n.child !== null) {
      for (e = n.child, r = Yr(e, e.pendingProps), n.child = r, r.return = n; e.sibling !== null; ) e = e.sibling, r = r.sibling = Yr(e, e.pendingProps), r.return = n;
      r.sibling = null;
    }
    return n.child;
  }
  function Fs(e, n) {
    return (e.lanes & n) !== 0 ? !0 : (e = e.dependencies, !!(e !== null && di(e)));
  }
  function og(e, n, r) {
    switch (n.tag) {
      case 3:
        gn(n, n.stateNode.containerInfo), ft(n, yn, e.memoizedState.cache), Vt();
        break;
      case 27:
      case 5:
        vr(n);
        break;
      case 4:
        gn(n, n.stateNode.containerInfo);
        break;
      case 10:
        ft(n, n.type, n.memoizedProps.value);
        break;
      case 31:
        if (n.memoizedState !== null) return n.flags |= 128, ss(n), null;
        break;
      case 13:
        var t = n.memoizedState;
        if (t !== null) {
          if (t.dehydrated !== null) return vt(n), n.flags |= 128, null;
          t = Bt(e, n, r, !1);
          var o = n.child.childLanes;
          return t || (r & o) !== 0 ? yd(e, n, r) : (vt(n), e = et(e, n, r), e !== null ? e.sibling : null);
        }
        vt(n);
        break;
      case 19:
        if (n.flags & 128) return Ds(e, n, r);
        if (o = (e.flags & 128) !== 0, t = (r & n.childLanes) !== 0, t || (Bt(e, n, r, !1), t = (r & n.childLanes) !== 0), o) {
          if (t) return Ds(e, n, r);
          n.flags |= 128;
        }
        if (o = n.memoizedState, o !== null && (o.rendering = null, o.tail = null, o.lastEffect = null), ba(n, Tn.current), t) break;
        return null;
      case 22:
        return n.lanes = 0, dd(e, n, r, n.pendingProps);
      case 24:
        ft(n, yn, e.memoizedState.cache);
    }
    return et(e, n, r);
  }
  function Sd(e, n, r) {
    if (e !== null) if (e.memoizedProps !== n.pendingProps) wn = !0;
    else {
      if (!Fs(e, r) && (n.flags & 128) === 0) return wn = !1, og(e, n, r);
      wn = (e.flags & 131072) !== 0;
    }
    else wn = !1, Se && (n.flags & 1048576) !== 0 && Zc(n, ca, n.index);
    switch (n.lanes = 0, n.tag) {
      case 16:
        e: {
          var t = n.pendingProps;
          if (e = Yt(n.elementType), n.type = e, typeof e == "function") Bl(e) ? (t = Zt(e, t), n.tag = 1, n = gd(null, n, e, t, r)) : (n.tag = 0, n = Ls(null, n, e, t, r));
          else {
            if (e != null) {
              var o = e.$$typeof;
              if (o === C) {
                n.tag = 11, n = ud(null, n, e, t, r);
                break e;
              } else if (o === Fe) {
                n.tag = 14, n = cd(null, n, e, t, r);
                break e;
              } else if (o === Ke) {
                n.tag = 10, n.type = e, n = kd(null, n, r);
                break e;
              }
            }
            throw n = be(e) || e, Error(s(306, n, ""));
          }
        }
        return n;
      case 0:
        return Ls(e, n, n.type, n.pendingProps, r);
      case 1:
        return t = n.type, o = Zt(t, n.pendingProps), gd(e, n, t, o, r);
      case 3:
        e: {
          if (gn(n, n.stateNode.containerInfo), e === null) throw Error(s(387));
          t = n.pendingProps;
          var a = n.memoizedState;
          o = a.element, ts(e, n), ya(n, t, null, r);
          var i = n.memoizedState;
          if (t = i.cache, ft(n, yn, t), t !== a.cache && Kl(n, [yn], r, !0), va(), t = i.element, a.isDehydrated) if (a = { element: t, isDehydrated: !1, cache: i.cache }, n.updateQueue.baseState = a, n.memoizedState = a, n.flags & 256) {
            n = vd(e, n, t, r);
            break e;
          } else if (t !== o) {
            o = cr(Error(s(424)), n), fa(o), n = vd(e, n, t, r);
            break e;
          } else {
            switch (e = n.stateNode.containerInfo, e.nodeType) {
              case 9:
                e = e.body;
                break;
              default:
                e = e.nodeName === "HTML" ? e.ownerDocument.body : e;
            }
            for (tn = mr(e.firstChild), Nn = n, Se = !0, ut = null, pr = !0, r = df(n, null, t, r), n.child = r; r; ) r.flags = r.flags & -3 | 134221824, r = r.sibling;
          }
          else {
            if (Vt(), t === o) {
              n = et(e, n, r);
              break e;
            }
            Sn(e, n, t, r);
          }
          n = n.child;
        }
        return n;
      case 26:
        return zo(e, n), e === null ? (r = Qp(n.type, null, n.pendingProps, null)) ? n.memoizedState = r : Se || (n.stateNode = Cp(n.type, n.pendingProps, un.current, n)) : n.memoizedState = Qp(n.type, e.memoizedProps, n.pendingProps, e.memoizedState), null;
      case 27:
        return vr(n), e === null && Se && (t = n.stateNode = Wp(n.type, n.pendingProps, un.current), Nn = n, pr = !0, o = tn, Ct(n.type) ? (Ou = o, tn = mr(t.firstChild)) : tn = o), Sn(e, n, n.pendingProps.children, r), zo(e, n), e === null && (n.flags |= 4194304), n.child;
      case 5:
        return e === null && Se && ((o = t = tn) && (t = Zg(t, n.type, n.pendingProps, pr), t !== null ? (n.stateNode = t, Nn = n, tn = mr(t.firstChild), pr = !1, o = !0) : o = !1), o || ct(n)), vr(n), o = n.type, a = n.pendingProps, i = e !== null ? e.memoizedProps : null, t = a.children, Nu(o, a) ? t = null : i !== null && Nu(o, i) && (n.flags |= 32), n.memoizedState !== null && (o = fs(e, n, Qm, null, null, r), qo._currentValue = o), zo(e, n), Sn(e, n, t, r), n.child;
      case 6:
        return e === null && Se && ((e = r = tn) && (r = Jg(r, n.pendingProps, pr), r !== null ? (n.stateNode = r, Nn = n, tn = null, e = !0) : e = !1), e || ct(n)), null;
      case 13:
        return yd(e, n, r);
      case 4:
        return gn(n, n.stateNode.containerInfo), t = n.pendingProps, e === null ? n.child = Gt(n, null, t, r) : Sn(e, n, t, r), n.child;
      case 11:
        return ud(e, n, n.type, n.pendingProps, r);
      case 7:
        return t = n.pendingProps, zo(e, n), Sn(e, n, t, r), n.child;
      case 8:
        return Sn(e, n, n.pendingProps.children, r), n.child;
      case 12:
        return Sn(e, n, n.pendingProps.children, r), n.child;
      case 10:
        return kd(e, n, r);
      case 9:
        return o = n.type._context, t = n.pendingProps.children, Ht(n), o = Ln(o), t = t(o), n.flags |= 1, Sn(e, n, t, r), n.child;
      case 14:
        return cd(e, n, n.type, n.pendingProps, r);
      case 15:
        return fd(e, n, n.type, n.pendingProps, r);
      case 19:
        return Ds(e, n, r);
      case 31:
        return rg(e, n, r);
      case 22:
        return dd(e, n, r, n.pendingProps);
      case 24:
        return Ht(n), t = Ln(yn), e === null ? (o = es(), o === null && (o = en, a = Zl(), o.pooledCache = a, a.refCount++, a !== null && (o.pooledCacheLanes |= r), o = a), n.memoizedState = { parent: t, cache: o }, rs(n), ft(n, yn, o)) : ((e.lanes & r) !== 0 && (ts(e, n), ya(n, null, null, r), va()), o = e.memoizedState, a = n.memoizedState, o.parent !== t ? (o = { parent: t, cache: t }, n.memoizedState = o, n.lanes === 0 && (n.memoizedState = n.updateQueue.baseState = o), ft(n, yn, t)) : (t = a.cache, ft(n, yn, t), t !== o.cache && Kl(n, [yn], r, !0))), Sn(e, n, n.pendingProps.children, r), n.child;
      case 30:
        return n.stateNode === null && (n.stateNode = { autoName: null, paired: null, clones: null, ref: null }), t = n.pendingProps, t.name != null && t.name !== "auto" ? n.flags |= e === null ? 18882560 : 18874368 : Se && ui(n), e !== null && e.memoizedProps.name !== t.name ? n.flags |= 4194816 : zo(e, n), Sn(e, n, t.children, r), n.child;
      case 29:
        throw n.pendingProps;
    }
    throw Error(s(156, n.tag));
  }
  function nt(e) {
    e.flags |= 4;
  }
  function js(e, n, r, t, o) {
    var a;
    if ((a = (e.mode & 32) !== 0) && (a = r === null ? Kp(n, t) : Kp(n, t) && (t.src !== r.src || t.srcSet !== r.srcSet)), a) {
      if (e.flags |= 16777216, (o & 335544128) === o) if (e.stateNode.complete) e.flags |= 8192;
      else if (tp()) e.flags |= 8192;
      else throw Xt = gi, ns;
    } else e.flags &= -16777217;
  }
  function xd(e, n) {
    if (n.type !== "stylesheet" || (n.state.loading & 4) !== 0) e.flags &= -16777217;
    else if (e.flags |= 16777216, !Zp(n)) if (tp()) e.flags |= 8192;
    else throw Xt = gi, ns;
  }
  function Ai(e, n) {
    n !== null && (e.flags |= 4), e.flags & 16384 && (n = e.tag !== 22 ? oo() : 536870912, e.lanes |= n, Io |= n);
  }
  function Ea(e, n) {
    if (!Se) switch (e.tailMode) {
      case "visible":
        break;
      case "collapsed":
        for (var r = e.tail, t = null; r !== null; ) r.alternate !== null && (t = r), r = r.sibling;
        t === null ? n || e.tail === null ? e.tail = null : e.tail.sibling = null : t.sibling = null;
        break;
      default:
        for (n = e.tail, r = null; n !== null; ) n.alternate !== null && (r = n), n = n.sibling;
        r === null ? e.tail = null : r.sibling = null;
    }
  }
  function on(e) {
    var n = e.alternate !== null && e.alternate.child === e.child, r = 0, t = 0;
    if (n) for (var o = e.child; o !== null; ) r |= o.lanes | o.childLanes, t |= o.subtreeFlags & 1206910976, t |= o.flags & 1206910976, o.return = e, o = o.sibling;
    else for (o = e.child; o !== null; ) r |= o.lanes | o.childLanes, t |= o.subtreeFlags, t |= o.flags, o.return = e, o = o.sibling;
    return e.subtreeFlags |= t, e.childLanes = r, n;
  }
  function ag(e, n, r) {
    var t = n.pendingProps;
    switch (Ql(n), n.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return on(n), null;
      case 1:
        return on(n), null;
      case 3:
        return r = n.stateNode, t = null, e !== null && (t = e.memoizedState.cache), n.memoizedState.cache !== t && (n.flags |= 2048), Kr(yn), rn(), r.pendingContext && (r.context = r.pendingContext, r.pendingContext = null), (e === null || e.child === null) && (ko(n) ? nt(n) : e === null || e.memoizedState.isDehydrated && (n.flags & 256) === 0 || (n.flags |= 1024, Xl())), on(n), null;
      case 26:
        var o = n.type, a = n.memoizedState;
        return e === null ? (nt(n), a !== null ? (on(n), xd(n, a)) : (on(n), js(n, o, null, t, r))) : a ? a !== e.memoizedState ? (nt(n), on(n), xd(n, a)) : (on(n), n.flags &= -16777217) : (e = e.memoizedProps, e !== t && nt(n), on(n), js(n, o, e, t, r)), null;
      case 27:
        if (_e(n), r = un.current, o = n.type, e !== null && n.stateNode != null) e.memoizedProps !== t && nt(n);
        else {
          if (!t) {
            if (n.stateNode === null) throw Error(s(166));
            return on(n), n.subtreeFlags &= -33554433, null;
          }
          e = Ze.current, ko(n) ? ef(n) : (e = Wp(o, t, r), n.stateNode = e, nt(n));
        }
        return on(n), n.subtreeFlags &= -33554433, null;
      case 5:
        if (_e(n), o = n.type, e !== null && n.stateNode != null) e.memoizedProps !== t && nt(n);
        else {
          if (!t) {
            if (n.stateNode === null) throw Error(s(166));
            return on(n), n.subtreeFlags &= -33554433, null;
          }
          if (a = Ze.current, ko(n)) ef(n);
          else {
            var i = Aa(un.current);
            switch (a) {
              case 1:
                a = i.createElementNS("http://www.w3.org/2000/svg", o);
                break;
              case 2:
                a = i.createElementNS("http://www.w3.org/1998/Math/MathML", o);
                break;
              default:
                switch (o) {
                  case "svg":
                    a = i.createElementNS("http://www.w3.org/2000/svg", o);
                    break;
                  case "math":
                    a = i.createElementNS("http://www.w3.org/1998/Math/MathML", o);
                    break;
                  case "script":
                    a = i.createElement("div"), a.innerHTML = "<script><\/script>", a = a.removeChild(a.firstChild);
                    break;
                  case "select":
                    a = typeof t.is == "string" ? i.createElement("select", { is: t.is }) : i.createElement("select"), t.multiple ? a.multiple = !0 : t.size && (a.size = t.size);
                    break;
                  default:
                    a = typeof t.is == "string" ? i.createElement(o, { is: t.is }) : i.createElement(o);
                }
            }
            a[_n] = n, a[Qn] = t;
            e: for (i = n.child; i !== null; ) {
              if (i.tag === 5 || i.tag === 6) a.appendChild(i.stateNode);
              else if (i.tag !== 4 && i.tag !== 27 && i.child !== null) {
                i.child.return = i, i = i.child;
                continue;
              }
              if (i === n) break e;
              for (; i.sibling === null; ) {
                if (i.return === null || i.return === n) break e;
                i = i.return;
              }
              i.sibling.return = i.return, i = i.sibling;
            }
            n.stateNode = a;
            e: switch (On(a, o, t), o) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                t = !!t.autoFocus;
                break e;
              case "img":
                t = !0;
                break e;
              default:
                t = !1;
            }
            t && nt(n);
          }
        }
        return on(n), n.subtreeFlags &= -33554433, js(n, n.type, e === null ? null : e.memoizedProps, n.pendingProps, r), null;
      case 6:
        if (e && n.stateNode != null) e.memoizedProps !== t && nt(n);
        else {
          if (typeof t != "string" && n.stateNode === null) throw Error(s(166));
          if (e = un.current, ko(n)) {
            if (e = n.stateNode, r = n.memoizedProps, t = null, o = Nn, o !== null) switch (o.tag) {
              case 27:
              case 5:
                t = o.memoizedProps;
            }
            e[_n] = n, e = !!(e.nodeValue === r || t !== null && t.suppressHydrationWarning === !0 || Sp(e.nodeValue, r)), e || ct(n, !0);
          } else e = Aa(e).createTextNode(t), e[_n] = n, n.stateNode = e;
        }
        return on(n), null;
      case 31:
        if (r = n.memoizedState, e === null || e.memoizedState !== null) {
          if (t = ko(n), r !== null) {
            if (e === null) {
              if (!t) throw Error(s(318));
              if (e = n.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(s(557));
              e[_n] = n;
            } else Vt(), (n.flags & 128) === 0 && (n.memoizedState = null), n.flags |= 4;
            on(n), e = !1;
          } else r = Xl(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = r), e = !0;
          if (!e) return n.flags & 256 ? (tr(n), n) : (tr(n), null);
          if ((n.flags & 128) !== 0) throw Error(s(558));
        }
        return on(n), null;
      case 13:
        if (t = n.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (o = ko(n), t !== null && t.dehydrated !== null) {
            if (e === null) {
              if (!o) throw Error(s(318));
              if (o = n.memoizedState, o = o !== null ? o.dehydrated : null, !o) throw Error(s(317));
              o[_n] = n;
            } else Vt(), (n.flags & 128) === 0 && (n.memoizedState = null), n.flags |= 4;
            on(n), o = !1;
          } else o = Xl(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = o), o = !0;
          if (!o) return n.flags & 256 ? (tr(n), n) : (tr(n), null);
        }
        return tr(n), (n.flags & 128) !== 0 ? (n.lanes = r, n) : (r = t !== null, e = e !== null && e.memoizedState !== null, r && (t = n.child, o = null, t.alternate !== null && t.alternate.memoizedState !== null && t.alternate.memoizedState.cachePool !== null && (o = t.alternate.memoizedState.cachePool.pool), a = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (a = t.memoizedState.cachePool.pool), a !== o && (t.flags |= 2048)), r !== e && r && (n.child.flags |= 8192), Ai(n, n.updateQueue), on(n), null);
      case 4:
        return rn(), e === null && wu(n.stateNode.containerInfo), n.flags |= 67108864, on(n), null;
      case 10:
        return Kr(n.type), on(n), null;
      case 19:
        if (us(n), t = n.memoizedState, t === null) return on(n), null;
        if (o = (n.flags & 128) !== 0, a = t.rendering, a === null) if (o) Ea(t, !1);
        else {
          if (dn !== 0 || e !== null && (e.flags & 128) !== 0) for (e = n.child; e !== null; ) {
            if (a = wi(e), a !== null) {
              for (n.flags |= 128, Ea(t, !1), e = a.updateQueue, n.updateQueue = e, Ai(n, e), n.subtreeFlags = 0, e = r, r = n.child; r !== null; ) Xc(r, e), r = r.sibling;
              return ba(n, Tn.current & 1 | 2), Se && Xr(n, t.treeForkCount), n.child;
            }
            e = e.sibling;
          }
          t.tail !== null && p() > qi && (n.flags |= 128, o = !0, Ea(t, !1), n.lanes = 4194304);
        }
        else {
          if (!o) if (e = wi(a), e !== null) {
            if (n.flags |= 128, o = !0, e = e.updateQueue, n.updateQueue = e, Ai(n, e), Ea(t, !0), t.tail === null && t.tailMode !== "collapsed" && t.tailMode !== "visible" && !a.alternate && !Se) return on(n), null;
          } else 2 * p() - t.renderingStartTime > qi && r !== 536870912 && (n.flags |= 128, o = !0, Ea(t, !1), n.lanes = 4194304);
          t.isBackwards ? (a.sibling = n.child, n.child = a) : (e = t.last, e !== null ? e.sibling = a : n.child = a, t.last = a);
        }
        if (t.tail !== null) {
          e = t.tail;
          e: {
            for (r = e; r !== null; ) {
              if (r.alternate !== null) {
                r = !1;
                break e;
              }
              r = r.sibling;
            }
            r = !0;
          }
          return t.rendering = e, t.tail = e.sibling, t.renderingStartTime = p(), e.sibling = null, a = Tn.current, a = o ? a & 1 | 2 : a & 1, t.tailMode === "visible" || t.tailMode === "collapsed" || !r || Se ? ba(n, a) : (r = a, Ie(Mn, n), Ie(Tn, r), Vn === null && (Vn = n)), Se && Xr(n, t.treeForkCount), e;
        }
        return on(n), null;
      case 22:
      case 23:
        return tr(n), ls(), t = n.memoizedState !== null, e !== null ? e.memoizedState !== null !== t && (n.flags |= 8192) : t && (n.flags |= 8192), t ? (r & 536870912) !== 0 && (n.flags & 128) === 0 && (on(n), n.subtreeFlags & 6 && (n.flags |= 8192)) : on(n), r = n.updateQueue, r !== null && Ai(n, r.retryQueue), r = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (r = e.memoizedState.cachePool.pool), t = null, n.memoizedState !== null && n.memoizedState.cachePool !== null && (t = n.memoizedState.cachePool.pool), t !== r && (n.flags |= 2048), e !== null && We(Qt), null;
      case 24:
        return r = null, e !== null && (r = e.memoizedState.cache), n.memoizedState.cache !== r && (n.flags |= 2048), Kr(yn), on(n), null;
      case 25:
        return null;
      case 30:
        return n.flags |= 33554432, on(n), null;
    }
    throw Error(s(156, n.tag));
  }
  function ig(e, n) {
    switch (Ql(n), n.tag) {
      case 1:
        return e = n.flags, e & 65536 ? (n.flags = e & -65537 | 128, n) : null;
      case 3:
        return Kr(yn), rn(), e = n.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (n.flags = e & -65537 | 128, n) : null;
      case 26:
      case 27:
      case 5:
        return _e(n), null;
      case 31:
        if (n.memoizedState !== null) {
          if (tr(n), n.alternate === null) throw Error(s(340));
          Vt();
        }
        return e = n.flags, e & 65536 ? (n.flags = e & -65537 | 128, n) : null;
      case 13:
        if (tr(n), e = n.memoizedState, e !== null && e.dehydrated !== null) {
          if (n.alternate === null) throw Error(s(340));
          Vt();
        }
        return e = n.flags, e & 65536 ? (n.flags = e & -65537 | 128, n) : null;
      case 19:
        return us(n), e = n.flags, e & 65536 ? (n.flags = e & -65537 | 128, e = n.memoizedState, e !== null && (e.rendering = null, e.tail = null), n.flags |= 4, n) : null;
      case 4:
        return rn(), null;
      case 10:
        return Kr(n.type), null;
      case 22:
      case 23:
        return tr(n), ls(), e !== null && We(Qt), e = n.flags, e & 65536 ? (n.flags = e & -65537 | 128, n) : null;
      case 24:
        return Kr(yn), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Ed(e, n) {
    switch (Ql(n), n.tag) {
      case 3:
        Kr(yn), rn();
        break;
      case 26:
      case 27:
      case 5:
        _e(n);
        break;
      case 4:
        rn();
        break;
      case 31:
        n.memoizedState !== null && tr(n);
        break;
      case 13:
        tr(n);
        break;
      case 19:
        us(n);
        break;
      case 10:
        Kr(n.type);
        break;
      case 22:
      case 23:
        tr(n), ls(), e !== null && We(Qt);
        break;
      case 24:
        Kr(yn);
    }
  }
  function Na(e, n) {
    try {
      var r = n.updateQueue, t = r !== null ? r.lastEffect : null;
      if (t !== null) {
        var o = t.next;
        r = o;
        do {
          if ((r.tag & e) === e) {
            t = void 0;
            var a = r.create, i = r.inst;
            t = a(), i.destroy = t;
          }
          r = r.next;
        } while (r !== o);
      }
    } catch (l) {
      He(n, n.return, l);
    }
  }
  function bt(e, n, r) {
    try {
      var t = n.updateQueue, o = t !== null ? t.lastEffect : null;
      if (o !== null) {
        var a = o.next;
        t = a;
        do {
          if ((t.tag & e) === e) {
            var i = t.inst, l = i.destroy;
            if (l !== void 0) {
              i.destroy = void 0, o = n;
              var u = r, g = l;
              try {
                g();
              } catch (w) {
                He(o, u, w);
              }
            }
          }
          t = t.next;
        } while (t !== a);
      }
    } catch (w) {
      He(n, n.return, w);
    }
  }
  function Nd(e) {
    var n = e.updateQueue;
    if (n !== null) {
      var r = e.stateNode;
      try {
        hf(n, r);
      } catch (t) {
        He(e, e.return, t);
      }
    }
  }
  function Cd(e, n, r) {
    r.props = Zt(e.type, e.memoizedProps), r.state = e.memoizedState;
    try {
      r.componentWillUnmount();
    } catch (t) {
      He(e, n, t);
    }
  }
  function Tr(e, n) {
    try {
      var r = e.ref;
      if (r !== null) {
        switch (e.tag) {
          case 26:
          case 27:
          case 5:
            var t = e.stateNode;
            break;
          case 30:
            var o = e.stateNode, a = qr(e.memoizedProps, o);
            (o.ref === null || o.ref.name !== a) && (o.ref = Ip(a)), t = o.ref;
            break;
          case 7:
            if (e.stateNode === null) {
              var i = new sr(e);
              v(e.child, !1, Gg, i, void 0, void 0), e.stateNode = i;
            }
            t = e.stateNode;
            break;
          default:
            t = e.stateNode;
        }
        typeof r == "function" ? e.refCleanup = r(t) : r.current = t;
      }
    } catch (l) {
      He(e, n, l);
    }
  }
  function In(e, n) {
    var r = e.ref, t = e.refCleanup;
    if (r !== null) if (typeof t == "function") try {
      t();
    } catch (o) {
      He(e, n, o);
    } finally {
      e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
    }
    else if (typeof r == "function") try {
      r(null);
    } catch (o) {
      He(e, n, o);
    }
    else r.current = null;
  }
  function Di(e, n) {
    if ((e.tag === 5 || e.tag === 27 || e.tag === 6) && e.alternate === null && n !== null) for (var r = 0; r < n.length; r++) $p(e.stateNode, n[r]);
  }
  function Pd(e) {
    for (var n = e.return; n !== null && (Rs(n) && $p(e.stateNode, n.stateNode), !$s(n)); ) n = n.return;
  }
  function Ca(e) {
    for (var n = e.return; n !== null && (Rs(n) && Kg(e.stateNode, n.stateNode), !$s(n)); ) n = n.return;
  }
  function $s(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 27;
  }
  function Rs(e) {
    return e && e.tag === 7 && e.stateNode !== null;
  }
  function Us(e) {
    var n = e.type, r = e.memoizedProps, t = e.stateNode;
    try {
      e: switch (n) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          r.autoFocus && t.focus();
          break e;
        case "img":
          r.src ? t.src = r.src : r.srcSet && (t.srcset = r.srcSet);
      }
    } catch (o) {
      He(e, e.return, o);
    }
  }
  function Vs(e, n, r) {
    try {
      var t = e.stateNode;
      Tg(t, e.type, r, n), t[Qn] = n;
    } catch (o) {
      He(e, e.return, o);
    }
  }
  function zd(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && Ct(e.type) || e.tag === 4;
  }
  function Ws(e) {
    e: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || zd(e.return)) return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
        if (e.tag === 27 && Ct(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue e;
        e.child.return = e, e = e.child;
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function Bs(e, n, r, t) {
    var o = e.tag;
    if (o === 5 || o === 6) o = e.stateNode, n ? (r.nodeType === 9 ? r.body : r.nodeName === "HTML" ? r.ownerDocument.body : r).insertBefore(o, n) : (n = r.nodeType === 9 ? r.body : r.nodeName === "HTML" ? r.ownerDocument.body : r, n.appendChild(o), r = r._reactRootContainer, r != null || n.onclick !== null || (n.onclick = _r)), Di(e, t), $e = !0;
    else if (o !== 4 && (o === 27 && (Di(e, t), t = null, Ct(e.type) && (r = e.stateNode, n = null)), e = e.child, e !== null)) for (Bs(e, n, r, t), e = e.sibling; e !== null; ) Bs(e, n, r, t), e = e.sibling;
  }
  function Fi(e, n, r, t) {
    var o = e.tag;
    if (o === 5 || o === 6) o = e.stateNode, n ? r.insertBefore(o, n) : r.appendChild(o), Di(e, t), $e = !0;
    else if (o !== 4 && (o === 27 && (Di(e, t), t = null, Ct(e.type) && (r = e.stateNode)), e = e.child, e !== null)) for (Fi(e, n, r, t), e = e.sibling; e !== null; ) Fi(e, n, r, t), e = e.sibling;
  }
  function _d(e) {
    var n = e.stateNode, r = e.memoizedProps;
    try {
      for (var t = e.type, o = n.attributes; o.length; ) n.removeAttributeNode(o[0]);
      On(n, t, r), n[_n] = e, n[Qn] = r;
    } catch (a) {
      He(e, e.return, a);
    }
  }
  var ji = !1, or = null;
  function Ld(e) {
    (e.tag === 30 || (e.subtreeFlags & 33554432) !== 0) && (ji = !0);
  }
  var Ir = null;
  function Md() {
    var e = Ir;
    return Ir = null, e;
  }
  var Xn = 0;
  function _o(e, n, r, t, o) {
    return Xn = 0, Td(e.child, n, r, t, o);
  }
  function Td(e, n, r, t, o) {
    for (var a = !1; e !== null; ) {
      if (e.tag === 5) {
        var i = e.stateNode;
        if (t !== null) {
          var l = zu(i);
          t.push(l), l.view && (a = !0);
        } else a || zu(i).view && (a = !0);
        ji = !0, Mp(i, Xn === 0 ? n : n + "_" + Xn, r), Xn++;
      } else (e.tag !== 22 || e.memoizedState === null) && (e.tag === 30 && o || Td(e.child, n, r, t, o) && (a = !0));
      e = e.sibling;
    }
    return a;
  }
  function Or(e, n) {
    for (; e !== null; ) e.tag === 5 ? Tp(e.stateNode, e.memoizedProps) : (e.tag !== 22 || e.memoizedState === null) && (e.tag === 30 && n || Or(e.child, n)), e = e.sibling;
  }
  function $i(e) {
    if ((e.subtreeFlags & 18874368) !== 0) for (e = e.child; e !== null; ) {
      if ((e.tag !== 22 || e.memoizedState === null) && ($i(e), e.tag === 30 && (e.flags & 18874368) !== 0 && e.stateNode.paired)) {
        var n = e.memoizedProps;
        if (n.name == null || n.name === "auto") throw Error(s(544));
        var r = n.name;
        n = Qr(n.default, n.share), n !== "none" && (_o(e, r, n, null, !1) || Or(e.child, !1));
      }
      e = e.sibling;
    }
  }
  function Hs(e, n) {
    if (e.tag === 30) {
      var r = e.stateNode, t = e.memoizedProps, o = qr(t, r), a = Qr(t.default, r.paired ? t.share : t.enter);
      a !== "none" ? _o(e, o, a, null, !1) ? ($i(e), r.paired || n || Fo(e, t.onEnter)) : Or(e.child, !1) : $i(e);
    } else if ((e.subtreeFlags & 33554432) !== 0) for (e = e.child; e !== null; ) Hs(e, n), e = e.sibling;
    else $i(e);
  }
  function qs(e) {
    if (or !== null && or.size !== 0) {
      var n = or;
      if ((e.subtreeFlags & 18874368) !== 0) for (e = e.child; e !== null; ) {
        if (e.tag !== 22 || e.memoizedState === null) {
          if (e.tag === 30 && (e.flags & 18874368) !== 0) {
            var r = e.memoizedProps, t = r.name;
            if (t != null && t !== "auto") {
              var o = n.get(t);
              if (o !== void 0) {
                var a = Qr(r.default, r.share);
                if (a !== "none" && (_o(e, t, a, null, !1) ? (a = e.stateNode, o.paired = a, a.paired = o, Fo(e, r.onShare)) : Or(e.child, !1)), n.delete(t), n.size === 0) break;
              }
            }
          }
          qs(e);
        }
        e = e.sibling;
      }
    }
  }
  function Qs(e) {
    if (e.tag === 30) {
      var n = e.memoizedProps, r = qr(n, e.stateNode), t = or !== null ? or.get(r) : void 0, o = Qr(n.default, t !== void 0 ? n.share : n.exit);
      o !== "none" && (_o(e, r, o, null, !1) ? t !== void 0 ? (o = e.stateNode, t.paired = o, o.paired = t, or.delete(r), Fo(e, n.onShare)) : Fo(e, n.onExit) : Or(e.child, !1)), or !== null && qs(e);
    } else if ((e.subtreeFlags & 33554432) !== 0) for (e = e.child; e !== null; ) Qs(e), e = e.sibling;
    else or !== null && qs(e);
  }
  function Id(e) {
    for (e = e.child; e !== null; ) {
      if (e.tag === 30) {
        var n = e.memoizedProps, r = qr(n, e.stateNode);
        n = Qr(n.default, n.update), e.flags &= -5, n !== "none" && _o(e, r, n, e.memoizedState = [], !1);
      } else (e.subtreeFlags & 33554432) !== 0 && Id(e);
      e = e.sibling;
    }
  }
  function Ys(e) {
    if ((e.subtreeFlags & 18874368) !== 0) for (e = e.child; e !== null; ) {
      if (e.tag !== 22 || e.memoizedState === null) {
        if (e.tag === 30 && (e.flags & 18874368) !== 0) {
          var n = e.stateNode;
          n.paired !== null && (n.paired = null, Or(e.child, !1));
        }
        Ys(e);
      }
      e = e.sibling;
    }
  }
  function Ri(e) {
    if (e.tag === 30) e.stateNode.paired = null, Or(e.child, !1), Ys(e);
    else if ((e.subtreeFlags & 33554432) !== 0) for (e = e.child; e !== null; ) Ri(e), e = e.sibling;
    else Ys(e);
  }
  function Od(e) {
    for (e = e.child; e !== null; ) e.tag === 30 ? Or(e.child, !1) : (e.subtreeFlags & 33554432) !== 0 && Od(e), e = e.sibling;
  }
  function Xs(e, n, r, t, o, a, i) {
    for (var l = !1; n !== null; ) {
      if (n.tag === 5) {
        var u = n.stateNode;
        if (a !== null && Xn < a.length) {
          var g = a[Xn], w = zu(u);
          (g.view || w.view) && (l = !0);
          var E;
          if (E = (e.flags & 4) === 0) if (w.clip) E = !0;
          else {
            E = g.rect;
            var h = w.rect;
            E = E.y !== h.y || E.x !== h.x || E.height !== h.height || E.width !== h.width;
          }
          E && (e.flags |= 4), w.abs ? w = !g.abs : (g = g.rect, w = w.rect, w = g.height !== w.height || g.width !== w.width), w && (e.flags |= 32);
        } else e.flags |= 32;
        (e.flags & 4) !== 0 && Mp(u, Xn === 0 ? r : r + "_" + Xn, o), l && (e.flags & 4) !== 0 || (Ir === null && (Ir = []), Ir.push(u, Xn === 0 ? t : t + "_" + Xn, n.memoizedProps)), Xn++;
      } else (n.tag !== 22 || n.memoizedState === null) && (n.tag === 30 && i ? e.flags |= n.flags & 32 : Xs(e, n.child, r, t, o, a, i) && (l = !0));
      n = n.sibling;
    }
    return l;
  }
  function Ad(e, n) {
    for (e = e.child; e !== null; ) {
      if (e.tag === 30) {
        var r = e.memoizedProps, t = e.stateNode, o = qr(r, t), a = Qr(r.default, r.update), i;
        i = e.memoizedState, e.memoizedState = null, t = e;
        var l = e.child;
        Xn = 0, o = Xs(t, l, o, o, a, i, !1), (e.flags & 4) !== 0 && o && Fo(e, r.onUpdate);
      } else (e.subtreeFlags & 33554432) !== 0 && Ad(e);
      e = e.sibling;
    }
  }
  var Cn = !1, Ve = !1, Ar = !1, Gs = !1, Dd = typeof WeakSet == "function" ? WeakSet : Set, Pn = null, Dr = !1, Pa = !1, Ui = !1, Ks = !1;
  function lg(e, n, r) {
    if (e = e.containerInfo, xu = Qo, e = $c(e), Fl(e)) {
      if ("selectionStart" in e) var t = { start: e.selectionStart, end: e.selectionEnd };
      else e: {
        t = (t = e.ownerDocument) && t.defaultView || window;
        var o = t.getSelection && t.getSelection();
        if (o && o.rangeCount !== 0) {
          t = o.anchorNode;
          var a = o.anchorOffset, i = o.focusNode;
          o = o.focusOffset;
          try {
            t.nodeType, i.nodeType;
          } catch {
            t = null;
            break e;
          }
          var l = 0, u = -1, g = -1, w = 0, E = 0, h = e, b = null;
          n: for (; ; ) {
            for (var R; h !== t || a !== 0 && h.nodeType !== 3 || (u = l + a), h !== i || o !== 0 && h.nodeType !== 3 || (g = l + o), h.nodeType === 3 && (l += h.nodeValue.length), (R = h.firstChild) !== null; ) b = h, h = R;
            for (; ; ) {
              if (h === e) break n;
              if (b === t && ++w === a && (u = l), b === i && ++E === o && (g = l), (R = h.nextSibling) !== null) break;
              h = b, b = h.parentNode;
            }
            h = R;
          }
          t = u === -1 || g === -1 ? null : { start: u, end: g };
        } else t = null;
      }
      t = t || { start: 0, end: 0 };
    } else t = null;
    for (Eu = { focusedElem: e, selectionRange: t }, Qo = !1, r = (r & 335544064) === r, Pn = n, n = r ? 9270 : 1024; Pn !== null; ) {
      if (e = Pn, r && (t = e.deletions, t !== null)) for (a = 0; a < t.length; a++) r && Qs(t[a]);
      if (e.alternate === null && (e.flags & 2) !== 0) r && Ld(e), Vi(r);
      else {
        if (e.tag === 22) {
          if (t = e.alternate, e.memoizedState !== null) {
            t !== null && t.memoizedState === null && r && Qs(t), Vi(r);
            continue;
          } else if (t !== null && t.memoizedState !== null) {
            r && Ld(e), Vi(r);
            continue;
          }
        }
        t = e.child, (e.subtreeFlags & n) !== 0 && t !== null ? (t.return = e, Pn = t) : (r && Id(e), Vi(r));
      }
    }
    or = null;
  }
  function Vi(e) {
    for (; Pn !== null; ) {
      var n = Pn, r = e, t = n.alternate, o = n.flags;
      switch (n.tag) {
        case 0:
        case 11:
        case 15:
          break;
        case 1:
          if ((o & 1024) !== 0 && t !== null) {
            r = void 0, o = t.memoizedProps, t = t.memoizedState;
            var a = n.stateNode;
            try {
              var i = Zt(n.type, o);
              r = a.getSnapshotBeforeUpdate(i, t), a.__reactInternalSnapshotBeforeUpdate = r;
            } catch (l) {
              He(n, n.return, l);
            }
          }
          break;
        case 3:
          if ((o & 1024) !== 0) {
            if (t = n.stateNode.containerInfo, r = t.nodeType, r === 9) Mu(t);
            else if (r === 1) switch (t.nodeName) {
              case "HEAD":
              case "HTML":
              case "BODY":
                Mu(t);
                break;
              default:
                t.textContent = "";
            }
          }
          break;
        case 5:
        case 26:
        case 27:
        case 6:
        case 4:
        case 17:
          break;
        case 30:
          r && t !== null && (r = qr(t.memoizedProps, t.stateNode), o = n.memoizedProps, o = Qr(o.default, o.update), o !== "none" && _o(t, r, o, t.memoizedState = [], !0));
          break;
        default:
          if ((o & 1024) !== 0) throw Error(s(163));
      }
      if (t = n.sibling, t !== null) {
        t.return = n.return, Pn = t;
        break;
      }
      Pn = n.return;
    }
  }
  function Fd(e, n, r) {
    var t = r.flags;
    switch (r.tag) {
      case 0:
      case 11:
      case 15:
        Fr(e, r), t & 4 && Na(5, r);
        break;
      case 1:
        if (Fr(e, r), t & 4) if (e = r.stateNode, n === null) try {
          e.componentDidMount();
        } catch (i) {
          He(r, r.return, i);
        }
        else {
          var o = Zt(r.type, n.memoizedProps);
          n = n.memoizedState;
          try {
            e.componentDidUpdate(o, n, e.__reactInternalSnapshotBeforeUpdate);
          } catch (i) {
            He(r, r.return, i);
          }
        }
        t & 64 && Nd(r), t & 512 && Tr(r, r.return);
        break;
      case 3:
        if (Fr(e, r), t & 64 && (e = r.updateQueue, e !== null)) {
          if (n = null, r.child !== null) switch (r.child.tag) {
            case 27:
            case 5:
              n = r.child.stateNode;
              break;
            case 1:
              n = r.child.stateNode;
          }
          try {
            hf(e, n);
          } catch (i) {
            He(r, r.return, i);
          }
        }
        break;
      case 27:
        n === null && t & 4 && _d(r);
      case 26:
      case 5:
        Fr(e, r), n === null && t & 4 && Us(r), t & 512 && Tr(r, r.return);
        break;
      case 12:
        Fr(e, r);
        break;
      case 31:
        Fr(e, r), t & 4 && Ud(e, r);
        break;
      case 13:
        Fr(e, r), t & 4 && Vd(e, r), t & 64 && (e = r.memoizedState, e !== null && (e = e.dehydrated, e !== null && (r = bg.bind(null, r), e0(e, r))));
        break;
      case 22:
        if (t = r.memoizedState !== null || Cn, !t) {
          var a = n !== null && n.memoizedState !== null || Ve;
          n = Cn, o = Ve, Cn = t, (Ve = a) && !o ? (t = 2, (r.subtreeFlags & 8772) !== 0 && (t |= 1), Er(e, r, t)) : Fr(e, r), Cn = n, Ve = o;
        }
        break;
      case 30:
        Fr(e, r), t & 512 && Tr(r, r.return);
        break;
      case 7:
        t & 512 && Tr(r, r.return);
      default:
        Fr(e, r);
    }
  }
  function Zs(e, n) {
    for (e = e.child; e !== null; ) jd(e, n), e = e.sibling;
  }
  function jd(e, n) {
    switch (e.tag) {
      case 5:
      case 26:
        try {
          var r = e.stateNode;
          if (n) {
            var t = r.style;
            typeof t.setProperty == "function" ? t.setProperty("display", "none", "important") : t.display = "none";
          } else {
            var o = e.stateNode, a = e.memoizedProps.style, i = a != null && a.hasOwnProperty("display") ? a.display : null;
            o.style.display = i == null || typeof i == "boolean" ? "" : ("" + i).trim();
          }
        } catch (u) {
          He(e, e.return, u);
        }
        Js(e, n);
        break;
      case 6:
        try {
          e.stateNode.nodeValue = n ? "" : e.memoizedProps, $e = !0;
        } catch (u) {
          He(e, e.return, u);
        }
        break;
      case 18:
        try {
          var l = e.stateNode;
          n ? Lp(l, !0) : Lp(e.stateNode, !1);
        } catch (u) {
          He(e, e.return, u);
        }
        break;
      case 22:
      case 23:
        e.memoizedState === null && Zs(e, n);
        break;
      default:
        Zs(e, n);
    }
  }
  function Js(e, n) {
    if (e.subtreeFlags & 67108864) for (e = e.child; e !== null; ) {
      e: {
        var r = e, t = n;
        switch (r.tag) {
          case 4:
            jd(r, t);
            break e;
          case 22:
            r.memoizedState === null && Js(r, t);
            break e;
          default:
            Js(r, t);
        }
      }
      e = e.sibling;
    }
  }
  function $d(e) {
    var n = e.alternate;
    n !== null && (e.alternate = null, $d(n)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (n = e.stateNode, n !== null && Qa(n)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  var ln = null, Gn = !1;
  function Sr(e, n, r) {
    for (r = r.child; r !== null; ) Rd(e, n, r), r = r.sibling;
  }
  function Rd(e, n, r) {
    if (Ce && typeof Ce.onCommitFiberUnmount == "function") try {
      Ce.onCommitFiberUnmount(je, r);
    } catch {
    }
    switch (r.tag) {
      case 26:
        Ve || In(r, n), Sr(e, n, r), r.memoizedState ? r.memoizedState.count-- : r.stateNode && !Ve && (r = r.stateNode, r.parentNode.removeChild(r));
        break;
      case 27:
        Ve || In(r, n), Ca(r);
        var t = ln, o = Gn;
        Ct(r.type) && (ln = r.stateNode, Gn = !1), Sr(e, n, r), Bp(r.stateNode, r.type, r.memoizedProps), ln = t, Gn = o;
        break;
      case 5:
        Ve || In(r, n), Ca(r);
      case 6:
        if (r.tag === 6 && Ca(r), t = ln, o = Gn, ln = null, Sr(e, n, r), ln = t, Gn = o, ln !== null) if (Gn) try {
          (ln.nodeType === 9 ? ln.body : ln.nodeName === "HTML" ? ln.ownerDocument.body : ln).removeChild(r.stateNode), $e = !0;
        } catch (a) {
          He(r, n, a);
        }
        else try {
          ln.removeChild(r.stateNode), $e = !0;
        } catch (a) {
          He(r, n, a);
        }
        break;
      case 18:
        ln !== null && (Gn ? (e = ln, _p(e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, r.stateNode), Yo(e)) : _p(ln, r.stateNode));
        break;
      case 4:
        t = ln, o = Gn, ln = r.stateNode.containerInfo, Gn = !0, Sr(e, n, r), ln = t, Gn = o;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        bt(2, r, n), Ve || bt(4, r, n), Sr(e, n, r);
        break;
      case 1:
        Ve || (In(r, n), t = r.stateNode, typeof t.componentWillUnmount == "function" && Cd(r, n, t)), Sr(e, n, r);
        break;
      case 21:
        Sr(e, n, r);
        break;
      case 22:
        Ve = (t = Ve) || r.memoizedState !== null, Sr(e, n, r), Ve = t;
        break;
      case 30:
        In(r, n), Sr(e, n, r);
        break;
      case 7:
        Ve || In(r, n), Sr(e, n, r);
        break;
      default:
        Sr(e, n, r);
    }
  }
  function Ud(e, n) {
    if (n.memoizedState === null && (e = n.alternate, e !== null && (e = e.memoizedState, e !== null))) {
      e = e.dehydrated;
      try {
        Yo(e);
      } catch (r) {
        He(n, n.return, r);
      }
    }
  }
  function Vd(e, n) {
    if (n.memoizedState === null && (e = n.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null)))) try {
      Yo(e);
    } catch (r) {
      He(n, n.return, r);
    }
  }
  function sg(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var n = e.stateNode;
        return n === null && (n = e.stateNode = new Dd()), n;
      case 22:
        return e = e.stateNode, n = e._retryCache, n === null && (n = e._retryCache = new Dd()), n;
      default:
        throw Error(s(435, e.tag));
    }
  }
  function Wi(e, n) {
    var r = sg(e);
    n.forEach(function(t) {
      if (!r.has(t)) {
        r.add(t);
        var o = wg.bind(null, e, t);
        t.then(o, o);
      }
    });
  }
  function Bn(e, n, r) {
    var t = n.deletions;
    if (t !== null) for (var o = 0; o < t.length; o++) {
      var a = t[o], i = e, l = n, u = l;
      e: for (; u !== null; ) {
        switch (u.tag) {
          case 27:
            if (Ct(u.type)) {
              ln = u.stateNode, Gn = !1;
              break e;
            }
            break;
          case 5:
            ln = u.stateNode, Gn = !1;
            break e;
          case 3:
          case 4:
            ln = u.stateNode.containerInfo, Gn = !0;
            break e;
        }
        u = u.return;
      }
      if (ln === null) throw Error(s(160));
      Rd(i, l, a), ln = null, Gn = !1, i = a.alternate, i !== null && (i.return = null), a.return = null;
    }
    if (n.subtreeFlags & 13886) for (n = n.child; n !== null; ) Wd(n, e, r), n = n.sibling;
  }
  var xr = null;
  function Wd(e, n, r) {
    var t = e.alternate, o = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if (o & 4 && (t = e.updateQueue, t = t !== null ? t.events : null, t !== null)) for (var a = 0; a < t.length; a++) {
          var i = t[a];
          i.ref.impl = i.nextImpl;
        }
        Bn(n, e, r), Hn(e), o & 4 && (bt(3, e, e.return), Na(3, e), bt(5, e, e.return));
        break;
      case 1:
        Bn(n, e, r), Hn(e), o & 512 && (Ve || t === null || In(t, t.return)), o & 64 && Cn && (e = e.updateQueue, e !== null && (n = e.callbacks, n !== null && (r = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = r === null ? n : r.concat(n))));
        break;
      case 26:
        if (a = xr, Bn(n, e, r), Hn(e), o & 512 && (Ve || t === null || In(t, t.return)), o & 4) if (o = t !== null ? t.memoizedState : null, r = e.memoizedState, t === null) if (r === null) if (e.stateNode === null) if (Cn) e.stateNode = Cp(e.type, e.memoizedProps, n.containerInfo, e);
        else {
          e: {
            n = e.type, r = e.memoizedProps, o = a.ownerDocument || a;
            n: switch (n) {
              case "title":
                t = o.getElementsByTagName("title")[0], (!t || t[Jo] || t[_n] || t.namespaceURI === "http://www.w3.org/2000/svg" || t.hasAttribute("itemprop")) && (t = o.createElement(n), o.head.insertBefore(t, o.querySelector("head > title"))), On(t, n, r), t[_n] = e, En(t), n = t;
                break e;
              case "link":
                if (a = Gp("link", "href", o).get(n + (r.href || ""))) {
                  for (i = 0; i < a.length; i++) if (t = a[i], t.getAttribute("href") === (r.href == null || r.href === "" ? null : r.href) && t.getAttribute("rel") === (r.rel == null ? null : r.rel) && t.getAttribute("title") === (r.title == null ? null : r.title) && t.getAttribute("crossorigin") === (r.crossOrigin == null ? null : r.crossOrigin)) {
                    a.splice(i, 1);
                    break n;
                  }
                }
                t = o.createElement(n), On(t, n, r), o.head.appendChild(t);
                break;
              case "meta":
                if (a = Gp("meta", "content", o).get(n + (r.content || ""))) {
                  for (i = 0; i < a.length; i++) if (t = a[i], t.getAttribute("content") === (r.content == null ? null : "" + r.content) && t.getAttribute("name") === (r.name == null ? null : r.name) && t.getAttribute("property") === (r.property == null ? null : r.property) && t.getAttribute("http-equiv") === (r.httpEquiv == null ? null : r.httpEquiv) && t.getAttribute("charset") === (r.charSet == null ? null : r.charSet)) {
                    a.splice(i, 1);
                    break n;
                  }
                }
                t = o.createElement(n), On(t, n, r), o.head.appendChild(t);
                break;
              default:
                throw Error(s(468, n));
            }
            t[_n] = e, En(t), n = t;
          }
          e.stateNode = n;
        }
        else Cn || ju(a, e.type, e.stateNode);
        else e.stateNode = Xp(a, r, e.memoizedProps);
        else o !== r ? (o === null ? (n = t.stateNode, n === null || Ve || n.parentNode.removeChild(n)) : o.count--, r === null ? Cn || ju(a, e.type, e.stateNode) : Xp(a, r, e.memoizedProps)) : r === null && e.stateNode !== null && Vs(e, e.memoizedProps, t.memoizedProps);
        break;
      case 27:
        Bn(n, e, r), Hn(e), o & 512 && (Ve || t === null || In(t, t.return)), t !== null && o & 4 && Vs(e, e.memoizedProps, t.memoizedProps);
        break;
      case 5:
        if (a = Ar, Ar = !1, Bn(n, e, r), Ar = a, Hn(e), o & 512 && (Ve || t === null || In(t, t.return)), e.flags & 32) {
          n = e.stateNode;
          try {
            co(n, ""), $e = !0;
          } catch (w) {
            He(e, e.return, w);
          }
        }
        o & 4 && e.stateNode != null && (n = e.memoizedProps, Vs(e, n, t !== null ? t.memoizedProps : n)), o & 1024 && (Gs = !0);
        break;
      case 6:
        if (Bn(n, e, r), Hn(e), o & 4) {
          if (e.stateNode === null) throw Error(s(162));
          n = e.memoizedProps, r = e.stateNode;
          try {
            r.nodeValue = n, $e = !0;
          } catch (w) {
            He(e, e.return, w);
          }
        }
        break;
      case 3:
        if ($e = !1, tl = null, a = xr, xr = Da(n.containerInfo), Bn(n, e, r), xr = a, Hn(e), o & 4 && t !== null && t.memoizedState.isDehydrated) try {
          Yo(n.containerInfo);
        } catch (w) {
          He(e, e.return, w);
        }
        Gs && (Gs = !1, Bd(e)), $e = !1;
        break;
      case 4:
        o = Ar, Ar = Cn, t = uc(), a = xr, xr = Da(e.stateNode.containerInfo), Bn(n, e, r), Hn(e), xr = a, $e && Pa && (Ui = !0), $e = t, Ar = o;
        break;
      case 12:
        Bn(n, e, r), Hn(e);
        break;
      case 31:
        Bn(n, e, r), Hn(e), o & 4 && (n = e.updateQueue, n !== null && (e.updateQueue = null, Wi(e, n)));
        break;
      case 13:
        Bn(n, e, r), Hn(e), e.child.flags & 8192 && e.memoizedState !== null != (t !== null && t.memoizedState !== null) && (Hi = p()), o & 4 && (n = e.updateQueue, n !== null && (e.updateQueue = null, Wi(e, n)));
        break;
      case 22:
        a = e.memoizedState !== null, i = t !== null && t.memoizedState !== null;
        var l = Cn, u = Ve, g = Ar;
        Cn = l || a, Ar = g || a, Ve = u || i, Bn(n, e, r), Ve = u, Ar = g, Cn = l, Hn(e), o & 8192 && (n = e.stateNode, n._visibility = a ? n._visibility & -2 : n._visibility | 1, !a || t === null || i || Cn || Ve || (n = i || Ve, r = Cn, t = Ve, Cn = a || Cn, Ve = n, wt(e, 2), Cn = r, Ve = t), !a && Ar || Zs(e, a)), o & 4 && (n = e.updateQueue, n !== null && (r = n.retryQueue, r !== null && (n.retryQueue = null, Wi(e, r))));
        break;
      case 19:
        Bn(n, e, r), Hn(e), o & 4 && (n = e.updateQueue, n !== null && (e.updateQueue = null, Wi(e, n)));
        break;
      case 30:
        o & 512 && (Ve || t === null || In(t, t.return)), o = uc(), a = Pa, i = (r & 335544064) === r, l = e.memoizedProps, Pa = i && Qr(l.default, l.update) !== "none", Bn(n, e, r), Hn(e), i && t !== null && $e && (e.flags |= 4), Pa = a, $e = o;
        break;
      case 21:
        break;
      case 7:
        o & 512 && (Ve || t === null || In(t, t.return)), t && t.stateNode !== null && (t.stateNode._fragmentFiber = e);
      default:
        Bn(n, e, r), Hn(e);
    }
  }
  function Hn(e) {
    var n = e.flags;
    if (n & 2) {
      try {
        for (var r, t = e.return; t !== null; ) {
          if (zd(t)) {
            r = t;
            break;
          }
          t = t.return;
        }
        t = null;
        for (var o = e.return; o !== null; ) {
          if (Rs(o)) {
            var a = o.stateNode;
            t === null ? t = [a] : t.push(a);
          }
          if ($s(o)) break;
          o = o.return;
        }
        var i = t;
        if (r == null) throw Error(s(160));
        switch (r.tag) {
          case 27:
            var l = r.stateNode, u = Ws(e);
            Fi(e, u, l, i);
            break;
          case 5:
            var g = r.stateNode;
            r.flags & 32 && (co(g, ""), r.flags &= -33);
            var w = Ws(e);
            Fi(e, w, g, i);
            break;
          case 3:
          case 4:
            var E = r.stateNode.containerInfo, h = Ws(e);
            Bs(e, h, E, i);
            break;
          default:
            throw Error(s(161));
        }
      } catch (b) {
        He(e, e.return, b);
      }
      e.flags &= -3;
    }
    n & 4096 && (e.flags &= -4097);
  }
  function Bd(e) {
    if (e.subtreeFlags & 1024) for (e = e.child; e !== null; ) {
      var n = e;
      Bd(n), n.tag === 5 && n.flags & 1024 && (n = n.stateNode, Qo = !0, n.reset(), Qo = !1), e = e.sibling;
    }
  }
  function Lo(e, n) {
    if (n.subtreeFlags & 9270) for (n = n.child; n !== null; ) Hd(n, e), n = n.sibling;
    else Ad(n);
  }
  function Hd(e, n) {
    var r = e.alternate;
    if (r === null) Hs(e, !1);
    else switch (e.tag) {
      case 3:
        if (Ks = Dr = !1, Md(), Lo(n, e), !Dr && !Ui) {
          if (e = Ir, e !== null) for (var t = 0; t < e.length; t += 3) {
            r = e[t];
            var o = e[t + 1];
            Tp(r, e[t + 2]), r = r.ownerDocument.documentElement, r !== null && r.animate({ opacity: [0, 0], pointerEvents: ["none", "none"] }, { duration: 0, fill: "forwards", pseudoElement: "::view-transition-group(" + o + ")" });
          }
          e = n.containerInfo, e = e.nodeType === 9 ? e.documentElement : e.ownerDocument.documentElement, e !== null && e.style.viewTransitionName === "" && (e.style.viewTransitionName = "none", e.animate({ opacity: [0, 0], pointerEvents: ["none", "none"] }, { duration: 0, fill: "forwards", pseudoElement: "::view-transition-group(root)" }), e.animate({ width: [0, 0], height: [0, 0] }, { duration: 0, fill: "forwards", pseudoElement: "::view-transition" })), Ks = !0;
        }
        Ir = null;
        break;
      case 5:
        Lo(n, e);
        break;
      case 4:
        t = Dr, Dr = !1, Lo(n, e), Dr && (Ui = !0), Dr = t;
        break;
      case 22:
        e.memoizedState === null && (r.memoizedState !== null ? Hs(e, !1) : Lo(n, e));
        break;
      case 30:
        t = Dr, o = Md(), Dr = !1, Lo(n, e), Dr && (e.flags |= 4);
        var a = e.memoizedProps, i = e.stateNode;
        n = qr(a, i), i = qr(r.memoizedProps, i);
        var l = Qr(a.default, a.update);
        l === "none" ? n = !1 : (a = r.memoizedState, r.memoizedState = null, r = e.child, Xn = 0, n = Xs(e, r, n, i, l, a, !0), Xn !== (a === null ? 0 : a.length) && (e.flags |= 32)), (e.flags & 4) !== 0 && n ? (Fo(e, e.memoizedProps.onUpdate), Ir = o) : o !== null && (o.push.apply(o, Ir), Ir = o), Dr = (e.flags & 32) !== 0 ? !0 : t;
        break;
      default:
        Lo(n, e);
    }
  }
  function Fr(e, n) {
    if (n.subtreeFlags & 8772) for (n = n.child; n !== null; ) Fd(e, n.alternate, n), n = n.sibling;
  }
  function wt(e, n) {
    for (e = e.child; e !== null; ) {
      var r = e, t = n;
      switch (r.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          bt(4, r, r.return), wt(r, t);
          break;
        case 1:
          In(r, r.return);
          var o = r.stateNode;
          typeof o.componentWillUnmount == "function" && Cd(r, r.return, o), wt(r, t);
          break;
        case 27:
          (t & 2) !== 0 && Bp(r.stateNode, r.type, r.memoizedProps);
        case 5:
          In(r, r.return), r.tag !== 5 && r.tag !== 27 || Ca(r), wt(r, t);
          break;
        case 6:
          Ca(r);
          break;
        case 26:
          In(r, r.return), o = r.stateNode, r.memoizedState !== null || o === null || Ve || o.parentNode.removeChild(o), wt(r, t);
          break;
        case 22:
          r.memoizedState === null && wt(r, t);
          break;
        case 30:
          In(r, r.return), wt(r, t);
          break;
        case 7:
          In(r, r.return);
        default:
          wt(r, t);
      }
      e = e.sibling;
    }
  }
  function Er(e, n, r) {
    for (r = (n.subtreeFlags & 8772) !== 0 ? r : r & -2, n = n.child; n !== null; ) {
      var t = n.alternate, o = e, a = n, i = a.flags, l = (r & 1) !== 0;
      switch (a.tag) {
        case 0:
        case 11:
        case 15:
          Er(o, a, r), Na(4, a);
          break;
        case 1:
          if (Er(o, a, r), t = a, o = t.stateNode, typeof o.componentDidMount == "function") try {
            o.componentDidMount();
          } catch (w) {
            He(t, t.return, w);
          }
          if (t = a, o = t.updateQueue, o !== null) {
            var u = t.stateNode;
            try {
              var g = o.shared.hiddenCallbacks;
              if (g !== null) for (o.shared.hiddenCallbacks = null, o = 0; o < g.length; o++) pf(g[o], u);
            } catch (w) {
              He(t, t.return, w);
            }
          }
          l && i & 64 && Nd(a), Tr(a, a.return);
          break;
        case 27:
          (r & 2) !== 0 && _d(a);
        case 5:
          a.tag !== 5 && a.tag !== 27 || Pd(a), Er(o, a, r), l && t === null && i & 4 && Us(a), Tr(a, a.return);
          break;
        case 6:
          Pd(a);
          break;
        case 26:
          u = a.stateNode, a.memoizedState !== null || u === null || Cn || ju(Da(u.ownerDocument), a.type, u), Er(o, a, r), l && t === null && i & 4 && Us(a), Tr(a, a.return);
          break;
        case 12:
          Er(o, a, r);
          break;
        case 31:
          Er(o, a, r), l && i & 4 && Ud(o, a);
          break;
        case 13:
          Er(o, a, r), l && i & 4 && Vd(o, a);
          break;
        case 22:
          a.memoizedState === null && Er(o, a, r), Tr(a, a.return);
          break;
        case 30:
          Er(o, a, r), Tr(a, a.return);
          break;
        case 7:
          Tr(a, a.return);
        default:
          Er(o, a, r);
      }
      n = n.sibling;
    }
  }
  function eu(e, n) {
    var r = null;
    e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (r = e.memoizedState.cachePool.pool), e = null, n.memoizedState !== null && n.memoizedState.cachePool !== null && (e = n.memoizedState.cachePool.pool), e !== r && (e != null && e.refCount++, r != null && da(r));
  }
  function nu(e, n) {
    e = null, n.alternate !== null && (e = n.alternate.memoizedState.cache), n = n.memoizedState.cache, n !== e && (n.refCount++, e != null && da(e));
  }
  function hr(e, n, r, t) {
    var o = (r & 335544064) === r;
    if (n.subtreeFlags & (o ? 10262 : 10256)) for (n = n.child; n !== null; ) qd(e, n, r, t), n = n.sibling;
    else o && Od(n);
  }
  function qd(e, n, r, t) {
    var o = (r & 335544064) === r;
    o && n.alternate === null && n.return !== null && n.return.alternate !== null && Ri(n);
    var a = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 15:
        hr(e, n, r, t), a & 2048 && Na(9, n);
        break;
      case 1:
        hr(e, n, r, t);
        break;
      case 3:
        hr(e, n, r, t), o && Ks && (e = e.containerInfo, e = e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, e.style.viewTransitionName === "root" && (e.style.viewTransitionName = ""), e = e.ownerDocument.documentElement, e !== null && e.style.viewTransitionName === "none" && (e.style.viewTransitionName = "")), a & 2048 && (a = null, n.alternate !== null && (a = n.alternate.memoizedState.cache), n = n.memoizedState.cache, n !== a && (n.refCount++, a != null && da(a)));
        break;
      case 12:
        if (a & 2048) {
          hr(e, n, r, t), a = n.stateNode;
          try {
            var i = n.memoizedProps, l = i.id, u = i.onPostCommit;
            typeof u == "function" && u(l, n.alternate === null ? "mount" : "update", a.passiveEffectDuration, -0);
          } catch (g) {
            He(n, n.return, g);
          }
        } else hr(e, n, r, t);
        break;
      case 31:
        hr(e, n, r, t);
        break;
      case 13:
        hr(e, n, r, t);
        break;
      case 23:
        break;
      case 22:
        i = n.stateNode, l = n.alternate, n.memoizedState !== null ? (o && l !== null && l.memoizedState === null && Ri(l), i._visibility & 2 ? hr(e, n, r, t) : za(e, n)) : (o && l !== null && l.memoizedState !== null && Ri(n), i._visibility & 2 ? hr(e, n, r, t) : (i._visibility |= 2, Mo(e, n, r, t, (n.subtreeFlags & 10256) !== 0 || !1))), a & 2048 && eu(l, n);
        break;
      case 24:
        hr(e, n, r, t), a & 2048 && nu(n.alternate, n);
        break;
      case 30:
        o && (a = n.alternate, a !== null && (Or(a.child, !0), Or(n.child, !0))), hr(e, n, r, t);
        break;
      default:
        hr(e, n, r, t);
    }
  }
  function Mo(e, n, r, t, o) {
    for (o = o && ((n.subtreeFlags & 10256) !== 0 || !1), n = n.child; n !== null; ) {
      var a = e, i = n, l = r, u = t, g = i.flags;
      switch (i.tag) {
        case 0:
        case 11:
        case 15:
          Mo(a, i, l, u, o), Na(8, i);
          break;
        case 23:
          break;
        case 22:
          var w = i.stateNode;
          i.memoizedState !== null ? w._visibility & 2 ? Mo(a, i, l, u, o) : za(a, i) : (w._visibility |= 2, Mo(a, i, l, u, o)), o && g & 2048 && eu(i.alternate, i);
          break;
        case 24:
          Mo(a, i, l, u, o), o && g & 2048 && nu(i.alternate, i);
          break;
        default:
          Mo(a, i, l, u, o);
      }
      n = n.sibling;
    }
  }
  function za(e, n) {
    if (n.subtreeFlags & 10256) for (n = n.child; n !== null; ) {
      var r = e, t = n, o = t.flags;
      switch (t.tag) {
        case 22:
          za(r, t), o & 2048 && eu(t.alternate, t);
          break;
        case 24:
          za(r, t), o & 2048 && nu(t.alternate, t);
          break;
        default:
          za(r, t);
      }
      n = n.sibling;
    }
  }
  var Jt = 8192;
  function eo(e, n, r) {
    if (e.subtreeFlags & Jt) for (e = e.child; e !== null; ) Qd(e, n, r), e = e.sibling;
  }
  function Qd(e, n, r) {
    switch (e.tag) {
      case 26:
        eo(e, n, r), e.flags & Jt && (e.memoizedState !== null ? h0(r, xr, e.memoizedState, e.memoizedProps) : (e = e.stateNode, (n & 335544128) === n && eh(r, e)));
        break;
      case 5:
        eo(e, n, r), e.flags & Jt && (e = e.stateNode, (n & 335544128) === n && eh(r, e));
        break;
      case 3:
      case 4:
        var t = xr;
        xr = Da(e.stateNode.containerInfo), eo(e, n, r), xr = t;
        break;
      case 22:
        e.memoizedState === null && (t = e.alternate, t !== null && t.memoizedState !== null ? (t = Jt, Jt = 16777216, eo(e, n, r), Jt = t) : eo(e, n, r));
        break;
      case 30:
        if ((e.flags & Jt) !== 0 && (t = e.memoizedProps.name, t != null && t !== "auto")) {
          var o = e.stateNode;
          o.paired = null, or === null && (or = /* @__PURE__ */ new Map()), or.set(t, o);
        }
        eo(e, n, r);
        break;
      default:
        eo(e, n, r);
    }
  }
  function Yd(e) {
    var n = e.alternate;
    if (n !== null && (e = n.child, e !== null)) {
      n.child = null;
      do
        n = e.sibling, e.sibling = null, e = n;
      while (e !== null);
    }
  }
  function _a(e) {
    var n = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (n !== null) for (var r = 0; r < n.length; r++) {
        var t = n[r];
        Pn = t, Gd(t, e);
      }
      Yd(e);
    }
    if (e.subtreeFlags & 10256) for (e = e.child; e !== null; ) Xd(e), e = e.sibling;
  }
  function Xd(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        _a(e), e.flags & 2048 && bt(9, e, e.return);
        break;
      case 3:
        _a(e);
        break;
      case 12:
        _a(e);
        break;
      case 22:
        var n = e.stateNode;
        e.memoizedState !== null && n._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (n._visibility &= -3, Bi(e)) : _a(e);
        break;
      default:
        _a(e);
    }
  }
  function Bi(e) {
    var n = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (n !== null) for (var r = 0; r < n.length; r++) {
        var t = n[r];
        Pn = t, Gd(t, e);
      }
      Yd(e);
    }
    for (e = e.child; e !== null; ) {
      switch (n = e, n.tag) {
        case 0:
        case 11:
        case 15:
          bt(8, n, n.return), Bi(n);
          break;
        case 22:
          r = n.stateNode, r._visibility & 2 && (r._visibility &= -3, Bi(n));
          break;
        default:
          Bi(n);
      }
      e = e.sibling;
    }
  }
  function Gd(e, n) {
    for (; Pn !== null; ) {
      var r = Pn;
      switch (r.tag) {
        case 0:
        case 11:
        case 15:
          bt(8, r, n);
          break;
        case 23:
        case 22:
          if (r.memoizedState !== null && r.memoizedState.cachePool !== null) {
            var t = r.memoizedState.cachePool.pool;
            t != null && t.refCount++;
          }
          break;
        case 24:
          da(r.memoizedState.cache);
      }
      if (t = r.child, t !== null) t.return = r, Pn = t;
      else e: for (r = e; Pn !== null; ) {
        t = Pn;
        var o = t.sibling, a = t.return;
        if ($d(t), t === r) {
          Pn = null;
          break e;
        }
        if (o !== null) {
          o.return = a, Pn = o;
          break e;
        }
        Pn = a;
      }
    }
  }
  var ug = { getCacheForType: function(e) {
    var n = Ln(yn), r = n.data.get(e);
    return r === void 0 && (r = e(), n.data.set(e, r)), r;
  }, cacheSignal: function() {
    return Ln(yn).controller.signal;
  } }, cg = typeof WeakMap == "function" ? WeakMap : Map, Ue = 0, en = null, Le = null, Oe = 0, Be = 0, ar = null, kt = !1, To = !1, ru = !1, rt = 0, dn = 0, St = 0, no = 0, tu = 0, ir = 0, Io = 0, La = null, Kn = null, ou = !1, Hi = 0, Kd = 0, qi = 1 / 0, Qi = null, xt = null, sn = 0, Nr = null, ro = null, jr = 0, au = 0, iu = null, Zd = null, Oo = null, Ao = null, Do = null, Ma = 0, Yi = null;
  function lr() {
    return (Ue & 2) !== 0 && Oe !== 0 ? Oe & -Oe : q.T !== null ? gu() : ec();
  }
  function Jd() {
    if (ir === 0) if ((Oe & 536870912) === 0 || Se) {
      var e = $n;
      $n <<= 1, ($n & 3932160) === 0 && ($n = 262144), ir = e;
    } else ir = 536870912;
    return e = Mn.current, e !== null && (e.flags |= 32), ir;
  }
  function Fo(e, n) {
    if (n != null) {
      var r = e.stateNode, t = r.ref;
      t === null && (t = r.ref = Ip(qr(e.memoizedProps, r))), Ao === null && (Ao = []), Ao.push(n.bind(null, t));
    }
  }
  function Zn(e, n, r) {
    (e === en && (Be === 2 || Be === 9) || e.cancelPendingCommit !== null) && (jo(e, 0), Et(e, Oe, ir, !1)), Zo(e, r), ((Ue & 2) === 0 || e !== en) && (e === en && ((Ue & 2) === 0 && (no |= r), dn === 4 && Et(e, Oe, ir, !1)), $r(e));
  }
  function ep(e, n, r) {
    if ((Ue & 6) !== 0) throw Error(s(327));
    var t = !r && (n & 127) === 0 && (n & e.expiredLanes) === 0 || Ot(e, n), o = t ? pg(e, n) : su(e, n, !0), a = t;
    do {
      if (o === 0) {
        To && !t && Et(e, n, 0, !1);
        break;
      } else {
        if (r = e.current.alternate, a && !fg(r)) {
          o = su(e, n, !1), a = !1;
          continue;
        }
        if (o === 2) {
          if (a = n, e.errorRecoveryDisabledLanes & a) var i = 0;
          else i = e.pendingLanes & -536870913, i = i !== 0 ? i : i & 536870912 ? 536870912 : 0;
          if (i !== 0) {
            n = i;
            e: {
              var l = e;
              o = La;
              var u = l.current.memoizedState.isDehydrated;
              if (u && (jo(l, i).flags |= 256), i = su(l, i, !1), i !== 2 && i !== 6) {
                if (ru && !u) {
                  l.errorRecoveryDisabledLanes |= a, no |= a, o = 4;
                  break e;
                }
                a = Kn, Kn = o, a !== null && (Kn === null ? Kn = a : Kn.push.apply(Kn, a));
              }
              o = i;
            }
            if (a = !1, o !== 2) continue;
          }
        }
        if (o === 1) {
          jo(e, 0), Et(e, n, 0, !0);
          break;
        }
        e: {
          switch (t = e, a = o, a) {
            case 0:
            case 1:
              throw Error(s(345));
            case 4:
              if ((n & 4194048) !== n && (n & 62914560) !== n) break;
            case 6:
              Et(t, n, ir, !kt);
              break e;
            case 2:
              Kn = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(s(329));
          }
          if ((n & 62914560) === n && (o = Hi + 300 - p(), 10 < o)) {
            if (Et(t, n, ir, !kt), at(t, 0, !0) !== 0) break e;
            jr = n, t.timeoutHandle = Pu(np.bind(null, t, r, Kn, Qi, ou, n, ir, no, Io, kt, a, "Throttled", -0, 0), o);
            break e;
          }
          np(t, r, Kn, Qi, ou, n, ir, no, Io, kt, a, null, -0, 0);
        }
      }
      break;
    } while (!0);
    $r(e);
  }
  function np(e, n, r, t, o, a, i, l, u, g, w, E, h, b) {
    e.timeoutHandle = -1;
    var R = n.subtreeFlags, K = (a & 335544064) === a;
    if (E = null, (K || R & 8192 || (R & 16785408) === 16785408) && (E = { stylesheets: null, count: 0, imgCount: 0, imgBytes: 0, suspenseyImages: [], waitingForImages: !0, waitingForViewTransition: !1, unsuspend: _r }, or = null, Qd(n, a, E), K && (R = E, K = e.containerInfo, K = (K.nodeType === 9 ? K : K.ownerDocument).__reactViewTransition, K != null && (R.count++, R.waitingForViewTransition = !0, R = $a.bind(R), K.finished.then(R, R))), R = (a & 62914560) === a ? Hi - p() : (a & 4194048) === a ? Kd - p() : 0, R = m0(E, R), R !== null)) {
      jr = a, e.cancelPendingCommit = R(up.bind(null, e, n, a, r, t, o, i, l, u, g, w, E, null, h, b)), Et(e, a, i, !g);
      return;
    }
    up(e, n, a, r, t, o, i, l, u, g, w, E);
  }
  function fg(e) {
    for (var n = e; ; ) {
      var r = n.tag;
      if ((r === 0 || r === 11 || r === 15) && n.flags & 16384 && (r = n.updateQueue, r !== null && (r = r.stores, r !== null))) for (var t = 0; t < r.length; t++) {
        var o = r[t], a = o.getSnapshot;
        o = o.value;
        try {
          if (!rr(a(), o)) return !1;
        } catch {
          return !1;
        }
      }
      if (r = n.child, n.subtreeFlags & 16384 && r !== null) r.return = n, n = r;
      else {
        if (n === e) break;
        for (; n.sibling === null; ) {
          if (n.return === null || n.return === e) return !0;
          n = n.return;
        }
        n.sibling.return = n.return, n = n.sibling;
      }
    }
    return !0;
  }
  function Et(e, n, r, t) {
    n = Ha(e, n), n &= ~tu, n &= ~no, e.suspendedLanes |= n, e.pingedLanes &= ~n, t && (e.warmLanes |= n), t = e.expirationTimes;
    for (var o = n; 0 < o; ) {
      var a = 31 - we(o), i = 1 << a;
      t[a] = -1, o &= ~i;
    }
    r !== 0 && Ku(e, r, n);
  }
  function Xi() {
    return (Ue & 6) === 0 ? (Ta(0), !1) : !0;
  }
  function lu() {
    if (Le !== null) {
      if (Be === 0) var e = Le.return;
      else e = Le, Gr = Wt = null, hs(e), Eo = null, ma = 0, e = Le;
      for (; e !== null; ) Ed(e.alternate, e), e = e.return;
      Le = null;
    }
  }
  function jo(e, n) {
    var r = e.timeoutHandle;
    return r !== -1 && (e.timeoutHandle = -1, Ag(r)), r = e.cancelPendingCommit, r !== null && (e.cancelPendingCommit = null, r()), jr = 0, lu(), en = e, Le = r = Yr(e.current, null), Oe = n, Be = 0, ar = null, kt = !1, To = Ot(e, n), ru = !1, Io = ir = tu = no = St = dn = 0, Kn = La = null, ou = !1, rt = Ha(e, n), oi(), r;
  }
  function rp(e, n) {
    ve = null, q.H = _i, n === xo || n === mi ? (n = uf(), Be = 3) : n === ns ? (n = uf(), Be = 4) : Be = n === _s ? 8 : n !== null && typeof n == "object" && typeof n.then == "function" ? 6 : 1, ar = n, Le === null && (dn = 1, Li(e, cr(n, e.current)));
  }
  function tp() {
    var e = Mn.current;
    return e === null ? !0 : (Oe & 4194048) === Oe ? Vn === null : (Oe & 62914560) === Oe || (Oe & 536870912) !== 0 ? e === Vn : !1;
  }
  function op() {
    var e = q.H;
    return q.H = _i, e === null ? _i : e;
  }
  function ap() {
    var e = q.A;
    return q.A = ug, e;
  }
  function Gi() {
    dn = 4, kt || (Oe & 4194048) !== Oe && Mn.current !== null || (To = !0), (St & 134217727) === 0 && (no & 134217727) === 0 || en === null || Et(en, Oe, ir, !1);
  }
  function su(e, n, r) {
    var t = Ue;
    Ue |= 2;
    var o = op(), a = ap();
    (en !== e || Oe !== n) && (Qi = null, jo(e, n)), n = !1;
    var i = dn;
    e: do
      try {
        if (Be !== 0 && Le !== null) {
          var l = Le, u = ar;
          switch (Be) {
            case 8:
              lu(), i = 6;
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              Mn.current === null && (n = !0);
              var g = Be;
              if (Be = 0, ar = null, $o(e, l, u, g), r && To) {
                i = 0;
                break e;
              }
              break;
            default:
              g = Be, Be = 0, ar = null, $o(e, l, u, g);
          }
        }
        dg(), i = dn;
        break;
      } catch (w) {
        rp(e, w);
      }
    while (!0);
    return n && e.shellSuspendCounter++, Gr = Wt = null, Ue = t, q.H = o, q.A = a, Le === null && (en = null, Oe = 0, oi()), i;
  }
  function dg() {
    for (; Le !== null; ) ip(Le);
  }
  function pg(e, n) {
    var r = Ue;
    Ue |= 2;
    var t = op(), o = ap();
    en !== e || Oe !== n ? (Qi = null, qi = p() + 500, jo(e, n)) : To = Ot(e, n);
    e: do
      try {
        if (Be !== 0 && Le !== null) {
          n = Le;
          var a = ar;
          n: switch (Be) {
            case 1:
              Be = 0, ar = null, $o(e, n, a, 1);
              break;
            case 2:
            case 9:
              if (lf(a)) {
                Be = 0, ar = null, lp(n);
                break;
              }
              n = function() {
                Be !== 2 && Be !== 9 || en !== e || (Be = 7), $r(e);
              }, a.then(n, n);
              break e;
            case 3:
              Be = 7;
              break e;
            case 4:
              Be = 5;
              break e;
            case 7:
              lf(a) ? (Be = 0, ar = null, lp(n)) : (Be = 0, ar = null, $o(e, n, a, 7));
              break;
            case 5:
              var i = null;
              switch (Le.tag) {
                case 26:
                  i = Le.memoizedState;
                case 5:
                case 27:
                  var l = Le;
                  if (i ? Zp(i) : l.stateNode.complete) {
                    Be = 0, ar = null;
                    var u = l.sibling;
                    if (u !== null) Le = u;
                    else {
                      var g = l.return;
                      g !== null ? (Le = g, Ki(g)) : Le = null;
                    }
                    break n;
                  }
              }
              Be = 0, ar = null, $o(e, n, a, 5);
              break;
            case 6:
              Be = 0, ar = null, $o(e, n, a, 6);
              break;
            case 8:
              lu(), dn = 6;
              break e;
            default:
              throw Error(s(462));
          }
        }
        hg();
        break;
      } catch (w) {
        rp(e, w);
      }
    while (!0);
    return Gr = Wt = null, q.H = t, q.A = o, Ue = r, Le !== null ? 0 : (en = null, Oe = 0, oi(), dn);
  }
  function hg() {
    for (; Le !== null && !Go(); ) ip(Le);
  }
  function ip(e) {
    var n = Sd(e.alternate, e, rt);
    e.memoizedProps = e.pendingProps, n === null ? Ki(e) : Le = n;
  }
  function lp(e) {
    var n = e, r = n.alternate;
    switch (n.tag) {
      case 15:
      case 0:
        n = md(r, n, n.pendingProps, n.type, void 0, Oe);
        break;
      case 11:
        n = md(r, n, n.pendingProps, n.type.render, n.ref, Oe);
        break;
      case 5:
        hs(n);
        var t = n;
        t === Nn && (Se ? (ci(t), t.tag === 5 && t.stateNode != null && (tn = t.stateNode)) : (ci(t), Se = !0));
      default:
        Ed(r, n), n = Le = Xc(n, rt), n = Sd(r, n, rt);
    }
    e.memoizedProps = e.pendingProps, n === null ? Ki(e) : Le = n;
  }
  function $o(e, n, r, t) {
    Gr = Wt = null, hs(n), Eo = null, ma = 0;
    var o = n.return;
    try {
      if (ng(e, o, n, r, Oe)) {
        dn = 1, Li(e, cr(r, e.current)), Le = null;
        return;
      }
    } catch (a) {
      if (o !== null) throw Le = o, a;
      dn = 1, Li(e, cr(r, e.current)), Le = null;
      return;
    }
    n.flags & 32768 ? (Se || t === 1 ? e = !0 : To || (Oe & 536870912) !== 0 ? e = !1 : (kt = e = !0, (t === 2 || t === 9 || t === 3 || t === 6) && (t = Mn.current, t !== null && t.tag === 13 && (t.flags |= 16384))), sp(n, e)) : Ki(n);
  }
  function Ki(e) {
    var n = e;
    do {
      if ((n.flags & 32768) !== 0) {
        sp(n, kt);
        return;
      }
      e = n.return;
      var r = ag(n.alternate, n, rt);
      if (r !== null) {
        Le = r;
        return;
      }
      if (n = n.sibling, n !== null) {
        Le = n;
        return;
      }
      Le = n = e;
    } while (n !== null);
    dn === 0 && (dn = 5);
  }
  function sp(e, n) {
    do {
      var r = ig(e.alternate, e);
      if (r !== null) {
        r.flags &= 32767, Le = r;
        return;
      }
      if (r = e.return, r !== null && (r.flags |= 32768, r.subtreeFlags = 0, r.deletions = null), !n && (e = e.sibling, e !== null)) {
        Le = e;
        return;
      }
      Le = e = r;
    } while (e !== null);
    dn = 6, Le = null;
  }
  function up(e, n, r, t, o, a, i, l, u, g, w, E) {
    e.cancelPendingCommit = null;
    do
      Zi();
    while (sn !== 0);
    if ((Ue & 6) !== 0) throw Error(s(327));
    if (n !== null) {
      if (n === e.current) throw Error(s(177));
      e === en && (Le = en = null, Oe = 0), ro = n, Nr = e, jr = r, iu = o, Zd = t, mg(e, n, r, i, l, u, E);
    }
  }
  function mg(e, n, r, t, o, a, i) {
    var l = n.lanes | n.childLanes;
    if (au = l, l |= Vl, Uh(e, r, l, t, o, a), Ao = null, (r & 335544064) === r ? (Do = Wm(e), t = 10262) : (Do = null, t = 10256), (n.subtreeFlags & t) !== 0 || (n.flags & t) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, kg(D, function() {
      return du(), null;
    })) : (e.callbackNode = null, e.callbackPriority = 0), ji = !1, t = (n.flags & 13878) !== 0, (n.subtreeFlags & 13878) !== 0 || t) {
      t = q.T, q.T = null, o = te.p, te.p = 2, a = Ue, Ue |= 4;
      try {
        lg(e, n, r);
      } finally {
        Ue = a, te.p = o, q.T = t;
      }
    }
    sn = 1, ji ? Oo = Ug(i, e.containerInfo, Do, uu, cu, vg, fu, du, gg) : (uu(), cu(), fu());
  }
  function gg(e) {
    if (sn !== 0) {
      var n = Nr.onRecoverableError;
      n(e, { componentStack: null });
    }
  }
  function vg() {
    sn === 3 && (sn = 0, Hd(ro, Nr), sn = 4);
  }
  function uu() {
    if (sn === 1) {
      sn = 0;
      var e = Nr, n = ro, r = jr, t = (n.flags & 13878) !== 0;
      if ((n.subtreeFlags & 13878) !== 0 || t) {
        t = q.T, q.T = null;
        var o = te.p;
        te.p = 2;
        var a = Ue;
        Ue |= 4;
        try {
          Pa = Ui = !1, Wd(n, e, r), r = Eu;
          var i = $c(e.containerInfo), l = r.focusedElem, u = r.selectionRange;
          if (i !== l && l && l.ownerDocument && jc(l.ownerDocument.documentElement, l)) {
            if (u !== null && Fl(l)) {
              var g = u.start, w = u.end;
              if (w === void 0 && (w = g), "selectionStart" in l) l.selectionStart = g, l.selectionEnd = Math.min(w, l.value.length);
              else {
                var E = l.ownerDocument || document, h = E && E.defaultView || window;
                if (h.getSelection) {
                  var b = h.getSelection(), R = l.textContent.length, K = Math.min(u.start, R), ye = u.end === void 0 ? K : Math.min(u.end, R);
                  !b.extend && K > ye && (i = ye, ye = K, K = i);
                  var m = Fc(l, K), f = Fc(l, ye);
                  if (m && f && (b.rangeCount !== 1 || b.anchorNode !== m.node || b.anchorOffset !== m.offset || b.focusNode !== f.node || b.focusOffset !== f.offset)) {
                    var y = E.createRange();
                    y.setStart(m.node, m.offset), b.removeAllRanges(), K > ye ? (b.addRange(y), b.extend(f.node, f.offset)) : (y.setEnd(f.node, f.offset), b.addRange(y));
                  }
                }
              }
            }
            for (E = [], b = l; b = b.parentNode; ) b.nodeType === 1 && E.push({ element: b, left: b.scrollLeft, top: b.scrollTop });
            for (typeof l.focus == "function" && l.focus(), l = 0; l < E.length; l++) {
              var x = E[l];
              x.element.scrollLeft = x.left, x.element.scrollTop = x.top;
            }
          }
          Qo = !!xu, Eu = xu = null;
        } finally {
          Ue = a, te.p = o, q.T = t;
        }
      }
      e.current = n, sn = 2;
    }
  }
  function cu() {
    if (sn === 2) {
      sn = 0;
      var e = Nr, n = ro, r = (n.flags & 8772) !== 0;
      if ((n.subtreeFlags & 8772) !== 0 || r) {
        r = q.T, q.T = null;
        var t = te.p;
        te.p = 2;
        var o = Ue;
        Ue |= 4;
        try {
          Fd(e, n.alternate, n);
        } finally {
          Ue = o, te.p = t, q.T = r;
        }
      }
      sn = 3;
    }
  }
  function fu() {
    if (sn === 4 || sn === 3) {
      sn = 0;
      var e = Oo;
      Oo = null, _();
      var n = Nr, r = ro, t = jr, o = Zd, a = (t & 335544064) === t ? 10262 : 10256;
      if ((r.subtreeFlags & a) !== 0 || (r.flags & a) !== 0 ? sn = 5 : (sn = 0, ro = Nr = null, cp(n, n.pendingLanes)), a = n.pendingLanes, a === 0 && (xt = null), bl(t), r = r.stateNode, Ce && typeof Ce.onCommitFiberRoot == "function") try {
        Ce.onCommitFiberRoot(je, r, void 0, (r.current.flags & 128) === 128);
      } catch {
      }
      if (o !== null) {
        r = q.T, a = te.p, te.p = 2, q.T = null;
        try {
          for (var i = n.onRecoverableError, l = 0; l < o.length; l++) {
            var u = o[l];
            i(u.value, { componentStack: u.stack });
          }
        } finally {
          q.T = r, te.p = a;
        }
      }
      if (o = Ao, i = Do, Do = null, o !== null && (Ao = null, i === null && (i = []), e !== null)) for (u = 0; u < o.length; u++) r = (0, o[u])(i), r !== void 0 && e.finished.finally(r);
      (jr & 3) !== 0 && Zi(), $r(n), a = n.pendingLanes, (t & 261930) !== 0 && (a & 42) !== 0 ? n === Yi ? Ma++ : (Ma = 0, Yi = n) : (Ma = 0, Yi = null), Ta(0);
    }
  }
  function cp(e, n) {
    (e.pooledCacheLanes &= n) === 0 && (n = e.pooledCache, n != null && (e.pooledCache = null, da(n)));
  }
  function Zi() {
    return Oo !== null && (Oo.skipTransition(), Oo = null), uu(), cu(), fu(), du();
  }
  function du() {
    if (sn !== 5) return !1;
    var e = Nr, n = au;
    au = 0;
    var r = bl(jr), t = q.T, o = te.p;
    try {
      te.p = 32 > r ? 32 : r, q.T = null, r = iu, iu = null;
      var a = Nr, i = jr;
      if (sn = 0, ro = Nr = null, jr = 0, (Ue & 6) !== 0) throw Error(s(331));
      var l = Ue;
      if (Ue |= 4, Xd(a.current), qd(a, a.current, i, r), Ue = l, Ta(0, !1), Ce && typeof Ce.onPostCommitFiberRoot == "function") try {
        Ce.onPostCommitFiberRoot(je, a);
      } catch {
      }
      return !0;
    } finally {
      te.p = o, q.T = t, cp(e, n);
    }
  }
  function fp(e, n, r) {
    n = cr(r, n), n = zs(e.stateNode, n, 2), e = mt(e, n, 2), e !== null && (Zo(e, 2), $r(e));
  }
  function He(e, n, r) {
    if (e.tag === 3) fp(e, e, r);
    else for (; n !== null; ) {
      if (n.tag === 3) {
        fp(n, e, r);
        break;
      } else if (n.tag === 1) {
        var t = n.stateNode;
        if (typeof n.type.getDerivedStateFromError == "function" || typeof t.componentDidCatch == "function" && (xt === null || !xt.has(t))) {
          e = cr(r, e), r = ld(2), t = mt(n, r, 2), t !== null && (sd(r, t, n, e), Zo(t, 2), $r(t));
          break;
        }
      }
      n = n.return;
    }
  }
  function pu(e, n, r) {
    var t = e.pingCache;
    if (t === null) {
      t = e.pingCache = new cg();
      var o = /* @__PURE__ */ new Set();
      t.set(n, o);
    } else o = t.get(n), o === void 0 && (o = /* @__PURE__ */ new Set(), t.set(n, o));
    o.has(r) || (ru = !0, o.add(r), e = yg.bind(null, e, n, r), n.then(e, e));
  }
  function yg(e, n, r) {
    var t = e.pingCache;
    t !== null && t.delete(n), e.pingedLanes |= e.suspendedLanes & r, e.warmLanes &= ~r, en === e && (Oe & r) === r && ((dn === 4 || dn === 3 && (Oe & 62914560) === Oe && 300 > p() - Hi) && (Ue & 2) === 0 ? jo(e, 0) : tu |= r, Io === Oe && (Io = 0)), $r(e);
  }
  function dp(e, n) {
    n === 0 && (n = oo()), e = Rt(e, n), e !== null && (Zo(e, n), $r(e));
  }
  function bg(e) {
    var n = e.memoizedState, r = 0;
    n !== null && (r = n.retryLane), dp(e, r);
  }
  function wg(e, n) {
    var r = 0;
    switch (e.tag) {
      case 31:
      case 13:
        var t = e.stateNode, o = e.memoizedState;
        o !== null && (r = o.retryLane);
        break;
      case 19:
        t = e.stateNode;
        break;
      case 22:
        t = e.stateNode._retryCache;
        break;
      default:
        throw Error(s(314));
    }
    t !== null && t.delete(n), dp(e, r);
  }
  function kg(e, n) {
    return ot(e, n);
  }
  var Ro = null, Uo = null, hu = !1, Ji = !1, mu = !1, Nt = 0;
  function $r(e) {
    e !== Uo && e.next === null && (Uo === null ? Ro = Uo = e : Uo = Uo.next = e), Ji = !0, hu || (hu = !0, xg());
  }
  function Ta(e, n) {
    if (!mu && Ji) {
      mu = !0;
      do
        for (var r = !1, t = Ro; t !== null; ) {
          if (e !== 0) {
            var o = t.pendingLanes;
            if (o === 0) var a = 0;
            else {
              var i = t.suspendedLanes, l = t.pingedLanes;
              a = (1 << 31 - we(42 | e) + 1) - 1, a &= o & ~(i & ~l), a = a & 201326741 ? a & 201326741 | 1 : a ? a | 2 : 0;
            }
            a !== 0 && (r = !0, gp(t, a));
          } else a = Oe, a = at(t, t === en ? a : 0, t.cancelPendingCommit !== null || t.timeoutHandle !== -1), (a & 3) === 0 || Ot(t, a) || (r = !0, gp(t, a));
          t = t.next;
        }
      while (r);
      mu = !1;
    }
  }
  function Sg() {
    pp();
  }
  function pp() {
    Ji = hu = !1;
    var e = 0;
    Nt !== 0 && Og() && (e = Nt);
    for (var n = p(), r = null, t = Ro; t !== null; ) {
      var o = t.next, a = hp(t, n);
      a === 0 ? (t.next = null, r === null ? Ro = o : r.next = o, o === null && (Uo = r)) : (r = t, (e !== 0 || (a & 3) !== 0) && (Ji = !0)), t = o;
    }
    sn !== 0 && sn !== 5 || Ta(e), Nt !== 0 && (Nt = 0);
  }
  function hp(e, n) {
    for (var r = e.suspendedLanes, t = e.pingedLanes, o = e.expirationTimes, a = e.pendingLanes & -62914561; 0 < a; ) {
      var i = 31 - we(a), l = 1 << i, u = o[i];
      u === -1 ? ((l & r) === 0 || (l & t) !== 0) && (o[i] = At(l, n)) : u <= n && (e.expiredLanes |= l), a &= ~l;
    }
    if (n = en, r = Oe, r = at(e, e === n ? r : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), t = e.callbackNode, r === 0 || e === n && (Be === 2 || Be === 9) || e.cancelPendingCommit !== null) return t !== null && t !== null && Vr(t), e.callbackNode = null, e.callbackPriority = 0;
    if ((r & 3) === 0 || Ot(e, r)) {
      if (n = r & -r, n === e.callbackPriority) return n;
      switch (t !== null && Vr(t), bl(r)) {
        case 2:
        case 8:
          r = U;
          break;
        case 32:
          r = D;
          break;
        case 268435456:
          r = se;
          break;
        default:
          r = D;
      }
      return t = mp.bind(null, e), r = ot(r, t), e.callbackPriority = n, e.callbackNode = r, n;
    }
    return t !== null && t !== null && Vr(t), e.callbackPriority = 2, e.callbackNode = null, 2;
  }
  function mp(e, n) {
    if (sn !== 0 && sn !== 5) return e.callbackNode = null, e.callbackPriority = 0, null;
    var r = e.callbackNode;
    if (Zi() && e.callbackNode !== r) return null;
    var t = Oe;
    return t = at(e, e === en ? t : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), t === 0 ? null : (ep(e, t, n), hp(e, p()), e.callbackNode != null && e.callbackNode === r ? mp.bind(null, e) : null);
  }
  function gp(e, n) {
    if (Zi()) return null;
    ep(e, n, !0);
  }
  function xg() {
    Dg(function() {
      (Ue & 6) !== 0 ? ot(F, Sg) : pp();
    });
  }
  function gu() {
    if (Nt === 0) {
      var e = qt;
      e === 0 && (e = cn, cn <<= 1, (cn & 261888) === 0 && (cn = 256)), Nt = e;
    }
    return Nt;
  }
  function vp(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : Ga(e);
  }
  function Eg(e, n, r, t, o) {
    if (n === "submit" && r && r.stateNode === o) {
      var a = vp((o[Qn] || null).action), i = t.submitter;
      i && (n = (n = i[Qn] || null) ? vp(n.formAction) : i.getAttribute("formAction"), n !== null && (a = n, i = null));
      var l = new ei("action", "action", null, t, o);
      e.push({ event: l, listeners: [{ instance: null, listener: function() {
        if (t.defaultPrevented) {
          if (Nt !== 0) {
            var u = new FormData(o, i);
            xs(r, { pending: !0, data: u, method: o.method, action: a }, null, u);
          }
        } else typeof a == "function" && (l.preventDefault(), u = new FormData(o, i), xs(r, { pending: !0, data: u, method: o.method, action: a }, a, u));
      }, currentTarget: o }] });
    }
  }
  for (var vu = 0; vu < Ul.length; vu++) {
    var yu = Ul[vu], Ng = yu.toLowerCase(), Cg = yu[0].toUpperCase() + yu.slice(1);
    kr(Ng, "on" + Cg);
  }
  kr(Vc, "onAnimationEnd"), kr(Wc, "onAnimationIteration"), kr(Bc, "onAnimationStart"), kr("dblclick", "onDoubleClick"), kr("focusin", "onFocus"), kr("focusout", "onBlur"), kr(Am, "onTransitionRun"), kr(Dm, "onTransitionStart"), kr(Fm, "onTransitionCancel"), kr(Hc, "onTransitionEnd"), so("onMouseEnter", ["mouseout", "mouseover"]), so("onMouseLeave", ["mouseout", "mouseover"]), so("onPointerEnter", ["pointerout", "pointerover"]), so("onPointerLeave", ["pointerout", "pointerover"]), Ft("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), Ft("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), Ft("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), Ft("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), Ft("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), Ft("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
  var Ia = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), Pg = new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Ia));
  function yp(e, n) {
    n = (n & 4) !== 0;
    for (var r = 0; r < e.length; r++) {
      var t = e[r], o = t.event;
      t = t.listeners;
      e: {
        var a = void 0;
        if (n) for (var i = t.length - 1; 0 <= i; i--) {
          var l = t[i], u = l.instance, g = l.currentTarget;
          if (l = l.listener, u !== a && o.isPropagationStopped()) break e;
          a = l, o.currentTarget = g;
          try {
            a(o);
          } catch (w) {
            ti(w);
          }
          o.currentTarget = null, a = u;
        }
        else for (i = 0; i < t.length; i++) {
          if (l = t[i], u = l.instance, g = l.currentTarget, l = l.listener, u !== a && o.isPropagationStopped()) break e;
          a = l, o.currentTarget = g;
          try {
            a(o);
          } catch (w) {
            ti(w);
          }
          o.currentTarget = null, a = u;
        }
      }
    }
  }
  function Me(e, n) {
    var r = n[rc];
    r === void 0 && (r = n[rc] = /* @__PURE__ */ new Set());
    var t = e + "__bubble";
    r.has(t) || (bp(n, e, 2, !1), r.add(t));
  }
  function bu(e, n, r) {
    var t = 0;
    n && (t |= 4), bp(r, e, t, n);
  }
  var el = "_reactListening" + Math.random().toString(36).slice(2);
  function wu(e) {
    if (!e[el]) {
      e[el] = !0, ac.forEach(function(r) {
        r !== "selectionchange" && (Pg.has(r) || bu(r, !1, e), bu(r, !0, e));
      });
      var n = e.nodeType === 9 ? e : e.ownerDocument;
      n === null || n[el] || (n[el] = !0, bu("selectionchange", !1, n));
    }
  }
  function bp(e, n, r, t) {
    switch (sh(n)) {
      case 2:
        var o = b0;
        break;
      case 8:
        o = w0;
        break;
      default:
        o = Ru;
    }
    r = o.bind(null, n, r, e), o = void 0, !Pl || n !== "touchstart" && n !== "touchmove" && n !== "wheel" || (o = !0), t ? o !== void 0 ? e.addEventListener(n, r, { capture: !0, passive: o }) : e.addEventListener(n, r, !0) : o !== void 0 ? e.addEventListener(n, r, { passive: o }) : e.addEventListener(n, r, !1);
  }
  function ku(e, n, r, t, o) {
    var a = t;
    if ((n & 1) === 0 && (n & 2) === 0 && t !== null) e: for (; ; ) {
      if (t === null) return;
      var i = t.tag;
      if (i === 3 || i === 4) {
        var l = t.stateNode.containerInfo;
        if (l === o) break;
        if (i === 4) for (i = t.return; i !== null; ) {
          var u = i.tag;
          if ((u === 3 || u === 4) && i.stateNode.containerInfo === o) return;
          i = i.return;
        }
        for (; l !== null; ) {
          if (i = Dt(l), i === null) return;
          if (u = i.tag, u === 5 || u === 6 || u === 26 || u === 27) {
            t = a = i;
            continue e;
          }
          l = l.parentNode;
        }
      }
      t = t.return;
    }
    yc(function() {
      var g = a, w = Nl(r), E = [];
      e: {
        var h = qc.get(e);
        if (h !== void 0) {
          var b = ei, R = e;
          switch (e) {
            case "keypress":
              if (Za(r) === 0) break e;
            case "keydown":
            case "keyup":
              b = fm;
              break;
            case "focusin":
              R = "focus", b = Ml;
              break;
            case "focusout":
              R = "blur", b = Ml;
              break;
            case "beforeblur":
            case "afterblur":
              b = Ml;
              break;
            case "click":
              if (r.button === 2) break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              b = kc;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              b = Jh;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              b = gm;
              break;
            case Vc:
            case Wc:
            case Bc:
              b = rm;
              break;
            case Hc:
              b = ym;
              break;
            case "scroll":
            case "scrollend":
              b = Kh;
              break;
            case "wheel":
              b = wm;
              break;
            case "copy":
            case "cut":
            case "paste":
              b = om;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              b = xc;
              break;
            case "submit":
              b = hm;
              break;
            case "toggle":
            case "beforetoggle":
              b = Sm;
          }
          var K = (n & 4) !== 0, ye = !K && (e === "scroll" || e === "scrollend"), m = K ? h !== null ? h + "Capture" : null : h;
          K = [];
          for (var f = g, y; f !== null; ) {
            var x = f;
            if (y = x.stateNode, x = x.tag, x !== 5 && x !== 26 && x !== 27 || y === null || m === null || (x = na(f, m), x != null && K.push(Oa(f, x, y))), ye) break;
            f = f.return;
          }
          0 < K.length && (h = new b(h, R, null, r, w), E.push({ event: h, listeners: K }));
        }
      }
      if ((n & 7) === 0) {
        e: {
          if (b = e === "mouseover" || e === "pointerover", h = e === "mouseout" || e === "pointerout", b && r !== El && (R = r.relatedTarget || r.fromElement) && (Dt(R) || R[ao])) break e;
          (h || b) && (R = w.window === w ? w : (b = w.ownerDocument) ? b.defaultView || b.parentWindow : window, h ? (b = r.relatedTarget || r.toElement, h = g, b = b ? Dt(b) : null, b !== null && (ye = L(b), K = b.tag, b !== ye || K !== 5 && K !== 27 && K !== 6) && (b = null)) : (h = null, b = g), h !== b && (K = kc, x = "onMouseLeave", m = "onMouseEnter", f = "mouse", (e === "pointerout" || e === "pointerover") && (K = xc, x = "onPointerLeave", m = "onPointerEnter", f = "pointer"), ye = h == null ? R : ea(h), y = b == null ? R : ea(b), R = new K(x, f + "leave", h, r, w), R.target = ye, R.relatedTarget = y, x = null, Dt(w) === g && (K = new K(m, f + "enter", b, r, w), K.target = y, K.relatedTarget = ye, x = K), ye = x, K = h && b ? le(h, b, zg) : null, h !== null && wp(E, R, h, K, !1), b !== null && ye !== null && wp(E, ye, b, K, !0)));
        }
        e: {
          if (h = g ? ea(g) : window, b = h.nodeName && h.nodeName.toLowerCase(), b === "select" || b === "input" && h.type === "file") var Q = Mc;
          else if (_c(h)) if (Tc) Q = Tm;
          else {
            Q = Lm;
            var Ae = _m;
          }
          else b = h.nodeName, !b || b.toLowerCase() !== "input" || h.type !== "checkbox" && h.type !== "radio" ? g && xl(g.elementType) && (Q = Mc) : Q = Mm;
          if (Q && (Q = Q(e, g))) {
            Lc(E, Q, r, w);
            break e;
          }
          Ae && Ae(e, h, g);
        }
        switch (Ae = g ? ea(g) : window, e) {
          case "focusin":
            (_c(Ae) || Ae.contentEditable === "true") && (mo = Ae, jl = g, ua = null);
            break;
          case "focusout":
            ua = jl = mo = null;
            break;
          case "mousedown":
            $l = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            $l = !1, Rc(E, r, w);
            break;
          case "selectionchange":
            if (Om) break;
          case "keydown":
          case "keyup":
            Rc(E, r, w);
        }
        var ae;
        if (Il) e: {
          switch (e) {
            case "compositionstart":
              var ce = "onCompositionStart";
              break e;
            case "compositionend":
              ce = "onCompositionEnd";
              break e;
            case "compositionupdate":
              ce = "onCompositionUpdate";
              break e;
          }
          ce = void 0;
        }
        else ho ? Pc(e, r) && (ce = "onCompositionEnd") : e === "keydown" && r.keyCode === 229 && (ce = "onCompositionStart");
        ce && (Ec && r.locale !== "ko" && (ho || ce !== "onCompositionStart" ? ce === "onCompositionEnd" && ho && (ae = bc()) : (it = w, zl = "value" in it ? it.value : it.textContent, ho = !0)), Ae = nl(g, ce), 0 < Ae.length && (ce = new Sc(ce, e, null, r, w), E.push({ event: ce, listeners: Ae }), ae ? ce.data = ae : (ae = zc(r), ae !== null && (ce.data = ae)))), (ae = Em ? Nm(e, r) : Cm(e, r)) && (ce = nl(g, "onBeforeInput"), 0 < ce.length && (Ae = new Sc("onBeforeInput", "beforeinput", null, r, w), E.push({ event: Ae, listeners: ce }), Ae.data = ae)), Eg(E, e, g, r, w);
      }
      yp(E, n);
    });
  }
  function Oa(e, n, r) {
    return { instance: e, listener: n, currentTarget: r };
  }
  function nl(e, n) {
    for (var r = n + "Capture", t = []; e !== null; ) {
      var o = e, a = o.stateNode;
      if (o = o.tag, o !== 5 && o !== 26 && o !== 27 || a === null || (o = na(e, r), o != null && t.unshift(Oa(e, o, a)), o = na(e, n), o != null && t.push(Oa(e, o, a))), e.tag === 3) return t;
      e = e.return;
    }
    return [];
  }
  function zg(e) {
    if (e === null) return null;
    do
      e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function wp(e, n, r, t, o) {
    for (var a = n._reactName, i = []; r !== null && r !== t; ) {
      var l = r, u = l.alternate, g = l.stateNode;
      if (l = l.tag, u !== null && u === t) break;
      l !== 5 && l !== 26 && l !== 27 || g === null || (u = g, o ? (g = na(r, a), g != null && i.unshift(Oa(r, g, u))) : o || (g = na(r, a), g != null && i.push(Oa(r, g, u)))), r = r.return;
    }
    i.length !== 0 && e.push({ event: n, listeners: i });
  }
  var _g = /\r\n?/g, Lg = /\u0000|\uFFFD/g;
  function kp(e) {
    return (typeof e == "string" ? e : "" + e).replace(_g, `
`).replace(Lg, "");
  }
  function Sp(e, n) {
    return n = kp(n), kp(e) === n;
  }
  function qe(e, n, r, t, o, a) {
    switch (r) {
      case "children":
        if (typeof t == "string") n === "body" || n === "textarea" && t === "" || co(e, t);
        else if (typeof t == "number" || typeof t == "bigint") n !== "body" && co(e, "" + t);
        else return;
        break;
      case "className":
        Xa(e, "class", t);
        break;
      case "tabIndex":
        Xa(e, "tabindex", t);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        Xa(e, r, t);
        break;
      case "style":
        gc(e, t, a);
        return;
      case "data":
        if (n !== "object") {
          Xa(e, "data", t);
          break;
        }
      case "src":
      case "href":
        if (t === "" && (n !== "a" || r !== "href")) {
          e.removeAttribute(r);
          break;
        }
        if (t == null || typeof t == "function" || typeof t == "symbol" || typeof t == "boolean") {
          e.removeAttribute(r);
          break;
        }
        t = Ga(t), e.setAttribute(r, t);
        break;
      case "action":
      case "formAction":
        if (typeof t == "function") {
          e.setAttribute(r, "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");
          break;
        } else typeof a == "function" && (r === "formAction" ? (n !== "input" && qe(e, n, "name", o.name, o, null), qe(e, n, "formEncType", o.formEncType, o, null), qe(e, n, "formMethod", o.formMethod, o, null), qe(e, n, "formTarget", o.formTarget, o, null)) : (qe(e, n, "encType", o.encType, o, null), qe(e, n, "method", o.method, o, null), qe(e, n, "target", o.target, o, null)));
        if (t == null || typeof t == "symbol" || typeof t == "boolean") {
          e.removeAttribute(r);
          break;
        }
        t = Ga(t), e.setAttribute(r, t);
        break;
      case "onClick":
        t != null && (e.onclick = _r);
        return;
      case "onScroll":
        t != null && Me("scroll", e);
        return;
      case "onScrollEnd":
        t != null && Me("scrollend", e);
        return;
      case "dangerouslySetInnerHTML":
        if (t != null) {
          if (typeof t != "object" || !("__html" in t)) throw Error(s(61));
          if (r = t.__html, r != null) {
            if (o.children != null) throw Error(s(60));
            (a == null ? void 0 : a.__html) !== r && (e.innerHTML = r);
          }
        }
        break;
      case "multiple":
        e.multiple = t && typeof t != "function" && typeof t != "symbol";
        break;
      case "muted":
        e.muted = t && typeof t != "function" && typeof t != "symbol";
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "ref":
        break;
      case "autoFocus":
        break;
      case "xlinkHref":
        if (t == null || typeof t == "function" || typeof t == "boolean" || typeof t == "symbol") {
          e.removeAttribute("xlink:href");
          break;
        }
        r = Ga(t), e.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", r);
        break;
      case "contentEditable":
      case "spellCheck":
      case "draggable":
      case "value":
      case "autoReverse":
      case "externalResourcesRequired":
      case "focusable":
      case "preserveAlpha":
        t != null && typeof t != "function" && typeof t != "symbol" ? e.setAttribute(r, t) : e.removeAttribute(r);
        break;
      case "inert":
      case "allowFullScreen":
      case "async":
      case "autoPlay":
      case "controls":
      case "credentialless":
      case "default":
      case "defer":
      case "disabled":
      case "disablePictureInPicture":
      case "disableRemotePlayback":
      case "formNoValidate":
      case "hidden":
      case "loop":
      case "noModule":
      case "noValidate":
      case "open":
      case "playsInline":
      case "readOnly":
      case "required":
      case "reversed":
      case "scoped":
      case "seamless":
      case "itemScope":
        t && typeof t != "function" && typeof t != "symbol" ? e.setAttribute(r, "") : e.removeAttribute(r);
        break;
      case "capture":
      case "download":
        t === !0 ? e.setAttribute(r, "") : t !== !1 && t != null && typeof t != "function" && typeof t != "symbol" ? e.setAttribute(r, t) : e.removeAttribute(r);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        t != null && typeof t != "function" && typeof t != "symbol" && !isNaN(t) && 1 <= t ? e.setAttribute(r, t) : e.removeAttribute(r);
        break;
      case "rowSpan":
      case "start":
        t == null || typeof t == "function" || typeof t == "symbol" || isNaN(t) ? e.removeAttribute(r) : e.setAttribute(r, t);
        break;
      case "popover":
        Me("beforetoggle", e), Me("toggle", e), Ya(e, "popover", t);
        break;
      case "xlinkActuate":
        Br(e, "http://www.w3.org/1999/xlink", "xlink:actuate", t);
        break;
      case "xlinkArcrole":
        Br(e, "http://www.w3.org/1999/xlink", "xlink:arcrole", t);
        break;
      case "xlinkRole":
        Br(e, "http://www.w3.org/1999/xlink", "xlink:role", t);
        break;
      case "xlinkShow":
        Br(e, "http://www.w3.org/1999/xlink", "xlink:show", t);
        break;
      case "xlinkTitle":
        Br(e, "http://www.w3.org/1999/xlink", "xlink:title", t);
        break;
      case "xlinkType":
        Br(e, "http://www.w3.org/1999/xlink", "xlink:type", t);
        break;
      case "xmlBase":
        Br(e, "http://www.w3.org/XML/1998/namespace", "xml:base", t);
        break;
      case "xmlLang":
        Br(e, "http://www.w3.org/XML/1998/namespace", "xml:lang", t);
        break;
      case "xmlSpace":
        Br(e, "http://www.w3.org/XML/1998/namespace", "xml:space", t);
        break;
      case "is":
        Ya(e, "is", t);
        break;
      case "innerText":
      case "textContent":
        return;
      default:
        if (!(2 < r.length) || r[0] !== "o" && r[0] !== "O" || r[1] !== "n" && r[1] !== "N") r = Xh.get(r) || r, Ya(e, r, t);
        else return;
    }
    $e = !0;
  }
  function Su(e, n, r, t, o, a) {
    switch (r) {
      case "style":
        gc(e, t, a);
        return;
      case "dangerouslySetInnerHTML":
        if (t != null) {
          if (typeof t != "object" || !("__html" in t)) throw Error(s(61));
          if (r = t.__html, r != null) {
            if (o.children != null) throw Error(s(60));
            (a == null ? void 0 : a.__html) !== r && (e.innerHTML = r);
          }
        }
        break;
      case "children":
        if (typeof t == "string") co(e, t);
        else if (typeof t == "number" || typeof t == "bigint") co(e, "" + t);
        else return;
        break;
      case "onScroll":
        t != null && Me("scroll", e);
        return;
      case "onScrollEnd":
        t != null && Me("scrollend", e);
        return;
      case "onClick":
        t != null && (e.onclick = _r);
        return;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "innerHTML":
      case "ref":
        return;
      case "innerText":
      case "textContent":
        return;
      default:
        if (!ic.hasOwnProperty(r)) e: {
          if (r[0] === "o" && r[1] === "n" && (o = r.endsWith("Capture"), a = r.slice(2, o ? r.length - 7 : void 0), n = e[Qn] || null, n = n != null ? n[r] : null, typeof n == "function" && e.removeEventListener(a, n, o), typeof t == "function")) {
            typeof n != "function" && n !== null && (r in e ? e[r] = null : e.hasAttribute(r) && e.removeAttribute(r)), e.addEventListener(a, t, o);
            break e;
          }
          $e = !0, r in e ? e[r] = t : t === !0 ? e.setAttribute(r, "") : Ya(e, r, t);
        }
        return;
    }
    $e = !0;
  }
  function On(e, n, r) {
    switch (n) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "img":
        Me("error", e), Me("load", e);
        var t = !1, o = !1, a;
        for (a in r) if (r.hasOwnProperty(a)) {
          var i = r[a];
          if (i != null) switch (a) {
            case "src":
              t = !0;
              break;
            case "srcSet":
              o = !0;
              break;
            case "children":
            case "dangerouslySetInnerHTML":
              throw Error(s(137, n));
            default:
              qe(e, n, a, i, r, null);
          }
        }
        o && qe(e, n, "srcSet", r.srcSet, r, null), t && qe(e, n, "src", r.src, r, null);
        return;
      case "input":
        Me("invalid", e);
        var l = a = i = o = null, u = null, g = null;
        for (t in r) if (r.hasOwnProperty(t)) {
          var w = r[t];
          if (w != null) switch (t) {
            case "name":
              o = w;
              break;
            case "type":
              i = w;
              break;
            case "checked":
              u = w;
              break;
            case "defaultChecked":
              g = w;
              break;
            case "value":
              a = w;
              break;
            case "defaultValue":
              l = w;
              break;
            case "children":
            case "dangerouslySetInnerHTML":
              if (w != null) throw Error(s(137, n));
              break;
            default:
              qe(e, n, t, w, r, null);
          }
        }
        dc(e, a, l, u, g, i, o, !1);
        return;
      case "select":
        Me("invalid", e), t = i = a = null;
        for (o in r) if (r.hasOwnProperty(o) && (l = r[o], l != null)) switch (o) {
          case "value":
            a = l;
            break;
          case "defaultValue":
            i = l;
            break;
          case "multiple":
            t = l;
          default:
            qe(e, n, o, l, r, null);
        }
        n = a, r = i, e.multiple = !!t, n != null ? uo(e, !!t, n, !1) : r != null && uo(e, !!t, r, !0);
        return;
      case "textarea":
        Me("invalid", e), a = o = t = null;
        for (i in r) if (r.hasOwnProperty(i) && (l = r[i], l != null)) switch (i) {
          case "value":
            t = l;
            break;
          case "defaultValue":
            o = l;
            break;
          case "children":
            a = l;
            break;
          case "dangerouslySetInnerHTML":
            if (l != null) throw Error(s(91));
            break;
          default:
            qe(e, n, i, l, r, null);
        }
        hc(e, t, o, a);
        return;
      case "option":
        for (u in r) if (r.hasOwnProperty(u) && (t = r[u], t != null)) switch (u) {
          case "selected":
            e.selected = t && typeof t != "function" && typeof t != "symbol";
            break;
          default:
            qe(e, n, u, t, r, null);
        }
        return;
      case "dialog":
        Me("beforetoggle", e), Me("toggle", e), Me("cancel", e), Me("close", e);
        break;
      case "iframe":
      case "object":
        Me("load", e);
        break;
      case "video":
      case "audio":
        for (t = 0; t < Ia.length; t++) Me(Ia[t], e);
        break;
      case "image":
        Me("error", e), Me("load", e);
        break;
      case "details":
        Me("toggle", e);
        break;
      case "embed":
      case "source":
      case "link":
        Me("error", e), Me("load", e);
      case "area":
      case "base":
      case "br":
      case "col":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "track":
      case "wbr":
      case "menuitem":
        for (g in r) if (r.hasOwnProperty(g) && (t = r[g], t != null)) switch (g) {
          case "children":
          case "dangerouslySetInnerHTML":
            throw Error(s(137, n));
          default:
            qe(e, n, g, t, r, null);
        }
        return;
      default:
        if (xl(n)) {
          for (w in r) r.hasOwnProperty(w) && (t = r[w], t !== void 0 && Su(e, n, w, t, r, void 0));
          return;
        }
    }
    for (l in r) r.hasOwnProperty(l) && (t = r[l], t != null && qe(e, n, l, t, r, null));
  }
  var Mg = {};
  function Tg(e, n, r, t) {
    switch (n) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "input":
        var o = null, a = null, i = null, l = null, u = null, g = null, w = null;
        for (b in r) {
          var E = r[b];
          if (r.hasOwnProperty(b) && E != null) switch (b) {
            case "checked":
              break;
            case "value":
              break;
            case "defaultValue":
              u = E;
            default:
              t.hasOwnProperty(b) || qe(e, n, b, null, t, E);
          }
        }
        for (var h in t) {
          var b = t[h];
          if (E = r[h], t.hasOwnProperty(h) && (b != null || E != null)) switch (h) {
            case "type":
              b !== E && ($e = !0), a = b;
              break;
            case "name":
              b !== E && ($e = !0), o = b;
              break;
            case "checked":
              b !== E && ($e = !0), g = b;
              break;
            case "defaultChecked":
              b !== E && ($e = !0), w = b;
              break;
            case "value":
              b !== E && ($e = !0), i = b;
              break;
            case "defaultValue":
              b !== E && ($e = !0), l = b;
              break;
            case "children":
            case "dangerouslySetInnerHTML":
              if (b != null) throw Error(s(137, n));
              break;
            default:
              b !== E && qe(e, n, h, b, t, E);
          }
        }
        kl(e, i, l, u, g, w, a, o);
        return;
      case "select":
        b = i = l = h = null;
        for (a in r) if (u = r[a], r.hasOwnProperty(a) && u != null) switch (a) {
          case "value":
            break;
          case "multiple":
            b = u;
          default:
            t.hasOwnProperty(a) || qe(e, n, a, null, t, u);
        }
        for (o in t) if (a = t[o], u = r[o], t.hasOwnProperty(o) && (a != null || u != null)) switch (o) {
          case "value":
            a !== u && ($e = !0), h = a;
            break;
          case "defaultValue":
            a !== u && ($e = !0), l = a;
            break;
          case "multiple":
            a !== u && ($e = !0), i = a;
          default:
            a !== u && qe(e, n, o, a, t, u);
        }
        n = l, r = i, t = b, h != null ? uo(e, !!r, h, !1) : !!t != !!r && (n != null ? uo(e, !!r, n, !0) : uo(e, !!r, r ? [] : "", !1));
        return;
      case "textarea":
        b = h = null;
        for (l in r) if (o = r[l], r.hasOwnProperty(l) && o != null && !t.hasOwnProperty(l)) switch (l) {
          case "value":
            break;
          case "children":
            break;
          default:
            qe(e, n, l, null, t, o);
        }
        for (i in t) if (o = t[i], a = r[i], t.hasOwnProperty(i) && (o != null || a != null)) switch (i) {
          case "value":
            o !== a && ($e = !0), h = o;
            break;
          case "defaultValue":
            o !== a && ($e = !0), b = o;
            break;
          case "children":
            break;
          case "dangerouslySetInnerHTML":
            if (o != null) throw Error(s(91));
            break;
          default:
            o !== a && qe(e, n, i, o, t, a);
        }
        pc(e, h, b);
        return;
      case "option":
        for (var R in r) if (h = r[R], r.hasOwnProperty(R) && h != null && !t.hasOwnProperty(R)) switch (R) {
          case "selected":
            e.selected = !1;
            break;
          default:
            qe(e, n, R, null, t, h);
        }
        for (u in t) if (h = t[u], b = r[u], t.hasOwnProperty(u) && h !== b && (h != null || b != null)) switch (u) {
          case "selected":
            h !== b && ($e = !0), e.selected = h && typeof h != "function" && typeof h != "symbol";
            break;
          default:
            qe(e, n, u, h, t, b);
        }
        return;
      case "img":
      case "link":
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
      case "menuitem":
        for (var K in r) h = r[K], r.hasOwnProperty(K) && h != null && !t.hasOwnProperty(K) && qe(e, n, K, null, t, h);
        for (g in t) if (h = t[g], b = r[g], t.hasOwnProperty(g) && h !== b && (h != null || b != null)) switch (g) {
          case "children":
          case "dangerouslySetInnerHTML":
            if (h != null) throw Error(s(137, n));
            break;
          default:
            qe(e, n, g, h, t, b);
        }
        return;
      default:
        if (xl(n)) {
          for (var ye in r) h = r[ye], r.hasOwnProperty(ye) && h !== void 0 && !t.hasOwnProperty(ye) && Su(e, n, ye, void 0, t, h);
          for (w in t) h = t[w], b = r[w], !t.hasOwnProperty(w) || h === b || h === void 0 && b === void 0 || Su(e, n, w, h, t, b);
          return;
        }
    }
    for (var m in r) h = r[m], r.hasOwnProperty(m) && h != null && !t.hasOwnProperty(m) && qe(e, n, m, null, t, h);
    for (E in t) h = t[E], b = r[E], !t.hasOwnProperty(E) || h === b || h == null && b == null || qe(e, n, E, h, t, b);
  }
  function xp(e) {
    switch (e) {
      case "css":
      case "script":
      case "font":
      case "img":
      case "image":
      case "input":
      case "link":
        return !0;
      default:
        return !1;
    }
  }
  function Ig() {
    if (typeof performance.getEntriesByType == "function") {
      for (var e = 0, n = 0, r = performance.getEntriesByType("resource"), t = 0; t < r.length; t++) {
        var o = r[t], a = o.transferSize, i = o.initiatorType, l = o.duration;
        if (a && l && xp(i)) {
          for (i = 0, l = o.responseEnd, t += 1; t < r.length; t++) {
            var u = r[t], g = u.startTime;
            if (g > l) break;
            var w = u.transferSize, E = u.initiatorType;
            w && xp(E) && (u = u.responseEnd, i += w * (u < l ? 1 : (l - g) / (u - g)));
          }
          if (--t, n += 8 * (a + i) / (o.duration / 1e3), e++, 10 < e) break;
        }
      }
      if (0 < e) return n / e / 1e6;
    }
    return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
  }
  var xu = null, Eu = null;
  function Aa(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function Ep(e) {
    switch (e) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function Np(e, n) {
    if (e === 0) switch (n) {
      case "svg":
        return 1;
      case "math":
        return 2;
      default:
        return 0;
    }
    return e === 1 && n === "foreignObject" ? 0 : e;
  }
  function Cp(e, n, r, t) {
    return r = Aa(r).createElement(e), r[_n] = t, r[Qn] = n, On(r, e, n), En(r), r;
  }
  function Nu(e, n) {
    return e === "textarea" || e === "noscript" || typeof n.children == "string" || typeof n.children == "number" || typeof n.children == "bigint" || typeof n.dangerouslySetInnerHTML == "object" && n.dangerouslySetInnerHTML !== null && n.dangerouslySetInnerHTML.__html != null;
  }
  var Cu = null;
  function Og() {
    var e = window.event;
    return e && e.type === "popstate" ? e === Cu ? !1 : (Cu = e, !0) : (Cu = null, !1);
  }
  var Pu = typeof setTimeout == "function" ? setTimeout : void 0, Ag = typeof clearTimeout == "function" ? clearTimeout : void 0, Pp = typeof Promise == "function" ? Promise : void 0, zp = typeof requestAnimationFrame == "function" ? requestAnimationFrame : Pu, Dg = typeof queueMicrotask == "function" ? queueMicrotask : typeof Pp < "u" ? function(e) {
    return Pp.resolve(null).then(e).catch(Fg);
  } : Pu;
  function Fg(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function Ct(e) {
    return e === "head";
  }
  function _p(e, n) {
    var r = n, t = 0;
    do {
      var o = r.nextSibling;
      if (e.removeChild(r), o && o.nodeType === 8) if (r = o.data, r === "/$" || r === "/&") {
        if (t === 0) {
          e.removeChild(o), Yo(n);
          return;
        }
        t--;
      } else if (r === "$" || r === "$?" || r === "$~" || r === "$!" || r === "&") t++;
      else if (r === "html") Au(e.ownerDocument.documentElement);
      else if (r === "head") {
        r = e.ownerDocument.head, Au(r);
        for (var a = r.firstChild; a; ) {
          var i = a.nextSibling, l = a.nodeName;
          a[Jo] || l === "SCRIPT" || l === "STYLE" || l === "LINK" && a.rel.toLowerCase() === "stylesheet" || r.removeChild(a), a = i;
        }
      } else r === "body" && Au(e.ownerDocument.body);
      r = o;
    } while (r);
    Yo(n);
  }
  function Lp(e, n) {
    var r = e;
    e = 0;
    do {
      var t = r.nextSibling;
      if (r.nodeType === 1 ? n ? (r._stashedDisplay = r.style.display, r.style.display = "none") : (r.style.display = r._stashedDisplay || "", r.getAttribute("style") === "" && r.removeAttribute("style")) : r.nodeType === 3 && (n ? (r._stashedText = r.nodeValue, r.nodeValue = "") : r.nodeValue = r._stashedText || ""), t && t.nodeType === 8) if (r = t.data, r === "/$") {
        if (e === 0) break;
        e--;
      } else r !== "$" && r !== "$?" && r !== "$~" && r !== "$!" || e++;
      r = t;
    } while (r);
  }
  function Mp(e, n, r) {
    if (n = CSS.escape(n) !== n ? "r-" + btoa(n).replace(/=/g, "") : n, e.style.viewTransitionName = n, r != null && (e.style.viewTransitionClass = r), r = getComputedStyle(e), r.display === "inline") {
      if (n = e.getClientRects(), n.length === 1) var t = 1;
      else for (var o = t = 0; o < n.length; o++) {
        var a = n[o];
        0 < a.width && 0 < a.height && t++;
      }
      t === 1 && (e = e.style, e.display = n.length === 1 ? "inline-block" : "block", e.marginTop = "-" + r.paddingTop, e.marginBottom = "-" + r.paddingBottom);
    }
  }
  function Tp(e, n) {
    e = e.style, n = n.style;
    var r = n != null ? n.hasOwnProperty("viewTransitionName") ? n.viewTransitionName : n.hasOwnProperty("view-transition-name") ? n["view-transition-name"] : null : null;
    e.viewTransitionName = r == null || typeof r == "boolean" ? "" : ("" + r).trim(), r = n != null ? n.hasOwnProperty("viewTransitionClass") ? n.viewTransitionClass : n.hasOwnProperty("view-transition-class") ? n["view-transition-class"] : null : null, e.viewTransitionClass = r == null || typeof r == "boolean" ? "" : ("" + r).trim(), e.display === "inline-block" && (n == null ? e.display = e.margin = "" : (r = n.display, e.display = r == null || typeof r == "boolean" ? "" : r, r = n.margin, r != null ? e.margin = r : (r = n.hasOwnProperty("marginTop") ? n.marginTop : n["margin-top"], e.marginTop = r == null || typeof r == "boolean" ? "" : r, n = n.hasOwnProperty("marginBottom") ? n.marginBottom : n["margin-bottom"], e.marginBottom = n == null || typeof n == "boolean" ? "" : n)));
  }
  function jg(e, n, r) {
    return r = r.ownerDocument.defaultView, { rect: e, abs: n.position === "absolute" || n.position === "fixed", clip: n.clipPath !== "none" || n.overflow !== "visible" || n.filter !== "none" || n.mask !== "none" || n.mask !== "none" || n.borderRadius !== "0px", view: 0 <= e.bottom && 0 <= e.right && e.top <= r.innerHeight && e.left <= r.innerWidth };
  }
  function zu(e) {
    var n = e.getBoundingClientRect(), r = getComputedStyle(e);
    return jg(n, r, e);
  }
  function $g(e) {
    return e.documentElement.clientHeight;
  }
  function Rg(e) {
    this.addEventListener("load", e), this.addEventListener("error", e);
  }
  function Ug(e, n, r, t, o, a, i, l, u) {
    var g = n.nodeType === 9 ? n : n.ownerDocument;
    try {
      var w = g.startViewTransition({ update: function() {
        var h = g.defaultView, b = h.navigation && h.navigation.transition, R = g.fonts.status;
        t();
        var K = [];
        if (R === "loaded" && ($g(g), g.fonts.status === "loading" && K.push(g.fonts.ready)), R = K.length, e !== null) for (var ye = e.suspenseyImages, m = 0, f = 0; f < ye.length; f++) {
          var y = ye[f];
          if (!y.complete) {
            var x = y.getBoundingClientRect();
            if (0 < x.bottom && 0 < x.right && x.top < h.innerHeight && x.left < h.innerWidth) {
              if (m += Jp(y), m > ol) {
                K.length = R;
                break;
              }
              y = new Promise(Rg.bind(y)), K.push(y);
            }
          }
        }
        if (0 < K.length) return h = Promise.race([Promise.all(K), new Promise(function(Q) {
          return setTimeout(Q, 500);
        })]).then(o, o), (b ? Promise.allSettled([b.finished, h]) : h).then(a, a);
        if (o(), b) return b.finished.then(a, a);
        a();
      }, types: r });
      g.__reactViewTransition = w;
      var E = [];
      return w.ready.then(function() {
        for (var h = g.documentElement.getAnimations({ subtree: !0 }), b = 0; b < h.length; b++) {
          var R = h[b], K = R.effect, ye = K.pseudoElement;
          if (ye != null && ye.startsWith("::view-transition")) {
            E.push(R), R = K.getKeyframes();
            for (var m = ye = void 0, f = !0, y = 0; y < R.length; y++) {
              var x = R[y], Q = x.width;
              if (ye === void 0) ye = Q;
              else if (ye !== Q) {
                f = !1;
                break;
              }
              if (Q = x.height, m === void 0) m = Q;
              else if (m !== Q) {
                f = !1;
                break;
              }
              delete x.width, delete x.height, x.transform === "none" && delete x.transform;
            }
            f && ye !== void 0 && m !== void 0 && (K.setKeyframes(R), f = getComputedStyle(K.target, K.pseudoElement), f.width !== ye || f.height !== m) && (f = R[0], f.width = ye, f.height = m, f = R[R.length - 1], f.width = ye, f.height = m, K.setKeyframes(R));
          }
        }
        i();
      }, function(h) {
        g.__reactViewTransition === w && (g.__reactViewTransition = null);
        try {
          if (typeof h == "object" && h !== null) switch (h.name) {
            case "InvalidStateError":
              (h.message === "View transition was skipped because document visibility state is hidden." || h.message === "Skipping view transition because document visibility state has become hidden." || h.message === "Skipping view transition because viewport size changed." || h.message === "Transition was aborted because of invalid state") && (h = null);
          }
          h !== null && u(h);
        } finally {
          t(), o(), i();
        }
      }), w.finished.finally(function() {
        for (var h = 0; h < E.length; h++) E[h].cancel();
        g.__reactViewTransition === w && (g.__reactViewTransition = null), l();
      }), w;
    } catch {
      return t(), o(), i(), null;
    }
  }
  function to(e, n) {
    this._scope = document.documentElement, this._selector = "::view-transition-" + e + "(" + n + ")";
  }
  to.prototype.animate = function(e, n) {
    return n = typeof n == "number" ? { duration: n } : W({}, n), n.pseudoElement = this._selector, this._scope.animate(e, n);
  }, to.prototype.getAnimations = function() {
    for (var e = this._scope, n = this._selector, r = e.getAnimations({ subtree: !0 }), t = [], o = 0; o < r.length; o++) {
      var a = r[o].effect;
      a !== null && a.target === e && a.pseudoElement === n && t.push(r[o]);
    }
    return t;
  }, to.prototype.getComputedStyle = function() {
    return getComputedStyle(this._scope, this._selector);
  };
  function Ip(e) {
    return { name: e, group: new to("group", e), imagePair: new to("image-pair", e), old: new to("old", e), new: new to("new", e) };
  }
  function sr(e) {
    this._fragmentFiber = e, this._observers = this._eventListeners = null;
  }
  sr.prototype.addEventListener = function(e, n, r) {
    var t = null, o = null;
    if (!(r != null && typeof r != "boolean" && (t = r.signal || null, t !== null && t.aborted))) {
      this._eventListeners === null && (this._eventListeners = []);
      var a = this._eventListeners;
      if (Ap(a, e, n, r) === -1) {
        var i = this, l = n;
        r != null && typeof r != "boolean" && r.once === !0 && (l = function(u) {
          i.removeEventListener(e, n, r), typeof n == "function" ? n.call(this, u) : n.handleEvent(u);
        }), t !== null && (o = i.removeEventListener.bind(i, e, n, r), t.addEventListener("abort", o, { once: !0 }), o = t.removeEventListener.bind(t, "abort", o)), t = Vo(r), a.push({ type: e, listener: n, optionsOrUseCapture: r, attachedListener: l, cleanup: o }), v(this._fragmentFiber.child, !1, Vg, e, l, t);
      }
      this._eventListeners = a;
    }
  };
  function Vg(e, n, r, t) {
    return Z(e).addEventListener(n, r, t), !1;
  }
  sr.prototype.removeEventListener = function(e, n, r) {
    var t = this._eventListeners;
    if (t !== null && (n = Ap(t, e, n, r), n !== -1)) {
      var o = t[n];
      r = o.attachedListener;
      var a = o.cleanup;
      o = Vo(o.optionsOrUseCapture), v(this._fragmentFiber.child, !1, Wg, e, r, o), t.splice(n, 1), a !== null && a();
    }
  };
  function Wg(e, n, r, t) {
    return Z(e).removeEventListener(n, r, t), !1;
  }
  function Vo(e) {
    return e != null && typeof e != "boolean" && (e.once === !0 || e.signal instanceof AbortSignal) ? { capture: e.capture, passive: e.passive } : e;
  }
  function Op(e) {
    return e == null ? "c=0" : typeof e == "boolean" ? "c=" + (e ? "1" : "0") : "c=" + (e.capture ? "1" : "0");
  }
  function Ap(e, n, r, t) {
    if (e.length === 0) return -1;
    t = Op(t);
    for (var o = 0; o < e.length; o++) {
      var a = e[o];
      if (a.type === n && a.listener === r && Op(a.optionsOrUseCapture) === t) return o;
    }
    return -1;
  }
  sr.prototype.dispatchEvent = function(e) {
    var n = O(this._fragmentFiber);
    if (n === null) return !0;
    n = Z(n);
    var r = this._eventListeners;
    if (r !== null && 0 < r.length || !e.bubbles) {
      var t = n.nodeType === 9 ? n.createComment("") : document.createTextNode("");
      if (r) for (var o = 0; o < r.length; o++) {
        var a = r[o];
        t.addEventListener(a.type, a.attachedListener, Vo(a.optionsOrUseCapture));
      }
      if (n.appendChild(t), e = t.dispatchEvent(e), r) for (o = 0; o < r.length; o++) a = r[o], t.removeEventListener(a.type, a.attachedListener, Vo(a.optionsOrUseCapture));
      return n.removeChild(t), e;
    }
    return n.dispatchEvent(e);
  }, sr.prototype.focus = function(e) {
    v(this._fragmentFiber.child, !0, Dp, e, void 0, void 0);
  };
  function Dp(e, n) {
    return e.tag === 6 ? !1 : (e = Z(e), n0(e, n));
  }
  sr.prototype.focusLast = function(e) {
    var n = [];
    v(this._fragmentFiber.child, !0, _u, n, void 0, void 0);
    for (var r = n.length - 1; 0 <= r && !Dp(n[r], e); r--) ;
  };
  function _u(e, n) {
    return n.push(e), !1;
  }
  sr.prototype.blur = function() {
    var e = O(this._fragmentFiber);
    e !== null && (e = Z(e), e = Aa(e).activeElement, e !== null && v(this._fragmentFiber.child, !1, Bg, e, void 0, void 0));
  };
  function Bg(e, n) {
    return e.tag === 6 ? !1 : (e = Z(e), e === n || e.contains(n) ? (n.blur(), !0) : !1);
  }
  sr.prototype.observeUsing = function(e) {
    this._observers === null && (this._observers = /* @__PURE__ */ new Set()), this._observers.add(e), v(this._fragmentFiber.child, !1, Hg, e, void 0, void 0);
  };
  function Hg(e, n) {
    return e.tag === 6 || (e = Z(e), n.observe(e)), !1;
  }
  sr.prototype.unobserveUsing = function(e) {
    var n = this._observers;
    if (n !== null && n.has(e)) {
      n.delete(e), v(this._fragmentFiber.child, !1, qg, e, void 0, void 0);
      for (var r = n = 0; r < Cr.length; r++) {
        var t = Cr[r];
        t.fragmentInstance === this && t.observer === e ? e.unobserve(t.instance) : Cr[n++] = t;
      }
      Cr.length = n;
    }
  };
  function qg(e, n) {
    return e.tag === 6 || (e = Z(e), n.unobserve(e)), !1;
  }
  var Cr = [], Lu = !1;
  function Qg(e, n, r) {
    Cr.push({ fragmentInstance: e, observer: n, instance: r }), Lu || (Lu = !0, r0(function() {
      Lu = !1;
      var t = Cr;
      Cr = [];
      for (var o = 0; o < t.length; o++) {
        var a = t[o];
        a.observer.unobserve(a.instance);
      }
    }));
  }
  sr.prototype.getClientRects = function() {
    var e = [];
    return v(this._fragmentFiber.child, !1, Yg, e, void 0, void 0), e;
  };
  function Yg(e, n) {
    if (e.tag === 6) {
      e = e.stateNode;
      var r = e.ownerDocument.createRange();
      r.selectNodeContents(e), n.push.apply(n, r.getClientRects());
    } else e = Z(e), n.push.apply(n, e.getClientRects());
    return !1;
  }
  sr.prototype.getRootNode = function(e) {
    var n = O(this._fragmentFiber);
    return n === null ? this : Z(n).getRootNode(e);
  }, sr.prototype.compareDocumentPosition = function(e) {
    var n = O(this._fragmentFiber);
    if (n === null) return Node.DOCUMENT_POSITION_DISCONNECTED;
    var r = [];
    v(this._fragmentFiber.child, !1, _u, r, void 0, void 0);
    var t = Z(n);
    if (r.length === 0) {
      if (r = t, ee(this._fragmentFiber)) {
        e: {
          for (n = this._fragmentFiber.return; n !== null; ) {
            if (n.tag === 4) {
              n = n.stateNode.containerInfo;
              break e;
            }
            if (n.tag === 3 || n.tag === 5 || n.tag === 27) break;
            n = n.return;
          }
          n = null;
        }
        n != null && (r = n);
      }
      n = this._fragmentFiber;
      var o = t = r.compareDocumentPosition(e);
      return r === e ? o = Node.DOCUMENT_POSITION_CONTAINS : t & Node.DOCUMENT_POSITION_CONTAINED_BY && (r = ne(n)[1], r === null ? o = Node.DOCUMENT_POSITION_PRECEDING : (e = Z(r).compareDocumentPosition(e), o = e === 0 || e & Node.DOCUMENT_POSITION_FOLLOWING ? Node.DOCUMENT_POSITION_FOLLOWING : Node.DOCUMENT_POSITION_PRECEDING)), o |= Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
    }
    n = Z(r[0]), o = Z(r[r.length - 1]);
    var a = ee(this._fragmentFiber) ? n.parentElement : t;
    if (a == null) return Node.DOCUMENT_POSITION_DISCONNECTED;
    t = a.compareDocumentPosition(n) & Node.DOCUMENT_POSITION_CONTAINED_BY, a = a.compareDocumentPosition(o) & Node.DOCUMENT_POSITION_CONTAINED_BY;
    var i = n.compareDocumentPosition(e), l = o.compareDocumentPosition(e), u = i & Node.DOCUMENT_POSITION_CONTAINED_BY || l & Node.DOCUMENT_POSITION_CONTAINED_BY;
    return l = t && a && i & Node.DOCUMENT_POSITION_FOLLOWING && l & Node.DOCUMENT_POSITION_PRECEDING, n = t && n === e || a && o === e || u || l ? Node.DOCUMENT_POSITION_CONTAINED_BY : !t && n === e || !a && o === e ? Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC : i, n & Node.DOCUMENT_POSITION_DISCONNECTED || n & Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC || Xg(n, this._fragmentFiber, r[0], r[r.length - 1], e) ? n : Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
  };
  function Xg(e, n, r, t, o) {
    var a = Dt(o);
    if (e & Node.DOCUMENT_POSITION_CONTAINED_BY) {
      if (r = !!a) e: {
        for (; a !== null; ) {
          if (a.tag === 7 && (a === n || a.alternate === n)) {
            r = !0;
            break e;
          }
          a = a.return;
        }
        r = !1;
      }
      return r;
    }
    if (e & Node.DOCUMENT_POSITION_CONTAINS) {
      if (a === null) return a = o.ownerDocument, o === a || o === a.documentElement || o === a.body;
      e: {
        for (a = n, n = O(n); a !== null; ) {
          if (!(a.tag !== 5 && a.tag !== 3 && a.tag !== 27 || a !== n && a.alternate !== n)) {
            a = !0;
            break e;
          }
          a = a.return;
        }
        a = !1;
      }
      return a;
    }
    return e & Node.DOCUMENT_POSITION_PRECEDING ? ((n = !!a) && !(n = a === r) && (n = le(r, a, fe), n === null ? n = !1 : (v(n, !0, ge, a, r), a = V, V = null, n = a !== null)), n) : e & Node.DOCUMENT_POSITION_FOLLOWING ? ((n = !!a) && !(n = a === t) && (n = le(t, a, fe), n === null ? n = !1 : (v(n, !0, ie, a, t), a = V, Pe = V = null, n = a !== null)), n) : !1;
  }
  function Fp(e, n) {
    var r = e.ownerDocument.createRange();
    r.selectNodeContents(e), e = r.getBoundingClientRect(), window.scrollTo(window.scrollX + e.left, n ? window.scrollY + e.top : window.scrollY + e.bottom - window.innerHeight);
  }
  sr.prototype.scrollIntoView = function(e) {
    if (typeof e == "object") throw Error(s(566));
    var n = [];
    v(this._fragmentFiber.child, !1, _u, n, void 0, void 0);
    var r = e !== !1;
    if (n.length === 0) {
      var t = ne(this._fragmentFiber);
      if (t = r ? t[1] || t[0] || O(this._fragmentFiber) : t[0] || t[1], t === null) return;
      if (t.tag === 6) {
        e = Z(t), Fp(e, r);
        return;
      }
      if (t = Z(t), t.nodeType !== 9) {
        if (t.nodeType === 11) {
          r = "host" in t ? t.host : null, r !== null && r.scrollIntoView(e);
          return;
        }
        t.scrollIntoView(e);
      }
    }
    for (t = r ? n.length - 1 : 0; t !== (r ? -1 : n.length); ) {
      var o = n[t];
      o.tag === 6 ? (o = Z(o), Fp(o, r)) : Z(o).scrollIntoView(e), t += r ? -1 : 1;
    }
  };
  function Gg(e, n) {
    return e = Z(e), jp(e, n), !1;
  }
  function jp(e, n) {
    e.reactFragments == null && (e.reactFragments = /* @__PURE__ */ new Set()), e.reactFragments.add(n);
  }
  function $p(e, n) {
    var r = n._eventListeners;
    if (r !== null) for (var t = 0; t < r.length; t++) {
      var o = r[t];
      e.addEventListener(o.type, o.attachedListener, Vo(o.optionsOrUseCapture));
    }
    e.nodeType !== 3 && (r = n._observers, r !== null && r.forEach(function(a) {
      for (var i = 0, l = 0; l < Cr.length; l++) {
        var u = Cr[l];
        (u.fragmentInstance !== n || u.observer !== a || u.instance !== e) && (Cr[i++] = u);
      }
      Cr.length = i, a.observe(e);
    }), jp(e, n));
  }
  function Kg(e, n) {
    var r = n._eventListeners;
    if (r !== null) for (var t = 0; t < r.length; t++) {
      var o = r[t];
      e.removeEventListener(o.type, o.attachedListener, Vo(o.optionsOrUseCapture));
    }
    e.nodeType !== 3 && (r = n._observers, r !== null && r.forEach(function(a) {
      typeof a.rootMargin == "string" ? Qg(n, a, e) : a.unobserve(e);
    }), e.reactFragments != null && e.reactFragments.delete(n));
  }
  function Mu(e) {
    var n = e.firstChild;
    for (n && n.nodeType === 10 && (n = n.nextSibling); n; ) {
      var r = n;
      switch (n = n.nextSibling, r.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          Mu(r), Qa(r);
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (r.rel.toLowerCase() === "stylesheet") continue;
      }
      e.removeChild(r);
    }
  }
  function Zg(e, n, r, t) {
    for (; e.nodeType === 1; ) {
      var o = r;
      if (e.nodeName.toLowerCase() !== n.toLowerCase()) {
        if (!t && (e.nodeName !== "INPUT" || e.type !== "hidden")) break;
      } else if (t) {
        if (!e[Jo]) switch (n) {
          case "meta":
            if (!e.hasAttribute("itemprop")) break;
            return e;
          case "link":
            if (a = e.getAttribute("rel"), a === "stylesheet" && e.hasAttribute("data-precedence") || a !== o.rel || e.getAttribute("href") !== (o.href == null || o.href === "" ? null : o.href) || e.getAttribute("crossorigin") !== (o.crossOrigin == null ? null : o.crossOrigin) || e.getAttribute("title") !== (o.title == null ? null : o.title)) break;
            return e;
          case "style":
            if (e.hasAttribute("data-precedence")) break;
            return e;
          case "script":
            if (a = e.getAttribute("src"), (a !== (o.src == null ? null : o.src) || e.getAttribute("type") !== (o.type == null ? null : o.type) || e.getAttribute("crossorigin") !== (o.crossOrigin == null ? null : o.crossOrigin)) && a && e.hasAttribute("async") && !e.hasAttribute("itemprop")) break;
            return e;
          default:
            return e;
        }
      } else if (n === "input" && e.type === "hidden") {
        var a = o.name == null ? null : "" + o.name;
        if (o.type === "hidden" && e.getAttribute("name") === a) return e;
      } else return e;
      if (e = mr(e.nextSibling), e === null) break;
    }
    return null;
  }
  function Jg(e, n, r) {
    if (n === "") return null;
    for (; e.nodeType !== 3; ) if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !r || (e = mr(e.nextSibling), e === null)) return null;
    return e;
  }
  function Rp(e, n) {
    for (; e.nodeType !== 8; ) if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !n || (e = mr(e.nextSibling), e === null)) return null;
    return e;
  }
  function Tu(e) {
    return e.data === "$?" || e.data === "$~";
  }
  function Iu(e) {
    return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
  }
  function e0(e, n) {
    var r = e.ownerDocument;
    if (e.data === "$~") e._reactRetry = n;
    else if (e.data !== "$?" || r.readyState !== "loading") n();
    else {
      var t = function() {
        n(), r.removeEventListener("DOMContentLoaded", t);
      };
      r.addEventListener("DOMContentLoaded", t), e._reactRetry = t;
    }
  }
  function mr(e) {
    for (; e != null; e = e.nextSibling) {
      var n = e.nodeType;
      if (n === 1 || n === 3) break;
      if (n === 8) {
        if (n = e.data, n === "$" || n === "$!" || n === "$?" || n === "$~" || n === "&" || n === "F!" || n === "F") break;
        if (n === "/$" || n === "/&") return null;
      }
    }
    return e;
  }
  var Ou = null;
  function Up(e) {
    e = e.nextSibling;
    for (var n = 0; e; ) {
      if (e.nodeType === 8) {
        var r = e.data;
        if (r === "/$" || r === "/&") {
          if (n === 0) return mr(e.nextSibling);
          n--;
        } else r !== "$" && r !== "$!" && r !== "$?" && r !== "$~" && r !== "&" || n++;
      }
      e = e.nextSibling;
    }
    return null;
  }
  function Vp(e) {
    e = e.previousSibling;
    for (var n = 0; e; ) {
      if (e.nodeType === 8) {
        var r = e.data;
        if (r === "$" || r === "$!" || r === "$?" || r === "$~" || r === "&") {
          if (n === 0) return e;
          n--;
        } else r !== "/$" && r !== "/&" || n++;
      }
      e = e.previousSibling;
    }
    return null;
  }
  function n0(e, n) {
    function r() {
      t = !0;
    }
    if (e.ownerDocument.activeElement === e) return !0;
    var t = !1;
    try {
      e.ownerDocument.addEventListener("focus", r, !0), (e.focus || HTMLElement.prototype.focus).call(e, n);
    } finally {
      e.ownerDocument.removeEventListener("focus", r, !0);
    }
    return t;
  }
  function r0(e) {
    zp(function() {
      zp(function(n) {
        return e(n);
      });
    });
  }
  function Wp(e, n, r) {
    switch (n = Aa(r), e) {
      case "html":
        if (e = n.documentElement, !e) throw Error(s(452));
        return e;
      case "head":
        if (e = n.head, !e) throw Error(s(453));
        return e;
      case "body":
        if (e = n.body, !e) throw Error(s(454));
        return e;
      default:
        throw Error(s(451));
    }
  }
  function Bp(e, n, r) {
    for (var t in r) {
      var o = r[t];
      r.hasOwnProperty(t) && o != null && qe(e, n, t, null, Mg, o);
    }
    r.dangerouslySetInnerHTML != null && (e.textContent = ""), e.onclick === _r && (e.onclick = null), Qa(e);
  }
  function Au(e) {
    for (var n = e.attributes; n.length; ) e.removeAttributeNode(n[0]);
    Qa(e);
  }
  var gr = /* @__PURE__ */ new Map(), Hp = /* @__PURE__ */ new Set();
  function Da(e) {
    if (typeof e.getRootNode == "function") {
      var n = e.getRootNode();
      if (n.nodeType === 9 || n.nodeType === 11) return n;
    }
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  var tt = te.d;
  te.d = { f: t0, r: o0, D: a0, C: i0, L: l0, m: s0, X: c0, S: u0, M: f0 };
  function t0() {
    var e = tt.f(), n = Xi();
    return e || n;
  }
  function o0(e) {
    var n = io(e);
    n !== null && n.tag === 5 && n.type === "form" ? Qf(n) : tt.r(e);
  }
  var Wo = typeof document > "u" ? null : document;
  function qp(e, n, r) {
    var t = Wo;
    if (t && typeof n == "string" && n) {
      var o = wr(n);
      o = 'link[rel="' + e + '"][href="' + o + '"]', typeof r == "string" && (o += '[crossorigin="' + r + '"]'), Hp.has(o) || (Hp.add(o), e = { rel: e, crossOrigin: r, href: n }, t.querySelector(o) === null && (n = t.createElement("link"), On(n, "link", e), En(n), t.head.appendChild(n)));
    }
  }
  function a0(e) {
    tt.D(e), qp("dns-prefetch", e, null);
  }
  function i0(e, n) {
    tt.C(e, n), qp("preconnect", e, n);
  }
  function l0(e, n, r) {
    tt.L(e, n, r);
    var t = Wo;
    if (t && e && n) {
      var o = 'link[rel="preload"][as="' + wr(n) + '"]';
      n === "image" && r && r.imageSrcSet ? (o += '[imagesrcset="' + wr(r.imageSrcSet) + '"]', typeof r.imageSizes == "string" && (o += '[imagesizes="' + wr(r.imageSizes) + '"]')) : o += '[href="' + wr(e) + '"]';
      var a = o;
      switch (n) {
        case "style":
          a = Bo(e);
          break;
        case "script":
          a = Ho(e);
      }
      if (!(gr.has(a) || (e = W({ rel: "preload", href: n === "image" && r && r.imageSrcSet ? void 0 : e, as: n }, r), gr.set(a, e), t.querySelector(o) !== null || n === "style" && t.querySelector(Fa(a)) || n === "script" && t.querySelector(ja(a))))) {
        var i = t.createElement("link");
        On(i, "link", e), n === "style" && (i[qa] = !0, i.onload = i.onerror = function() {
          oc(i);
        }), En(i), t.head.appendChild(i);
      }
    }
  }
  function s0(e, n) {
    tt.m(e, n);
    var r = Wo;
    if (r && e) {
      var t = n && typeof n.as == "string" ? n.as : "script", o = 'link[rel="modulepreload"][as="' + wr(t) + '"][href="' + wr(e) + '"]', a = o;
      switch (t) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          a = Ho(e);
      }
      if (!gr.has(a) && (e = W({ rel: "modulepreload", href: e }, n), gr.set(a, e), r.querySelector(o) === null)) {
        switch (t) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (r.querySelector(ja(a))) return;
        }
        t = r.createElement("link"), On(t, "link", e), En(t), r.head.appendChild(t);
      }
    }
  }
  function u0(e, n, r) {
    tt.S(e, n, r);
    var t = Wo;
    if (t && e) {
      var o = lo(t).hoistableStyles, a = Bo(e);
      n = n || "default";
      var i = o.get(a);
      if (!i) {
        var l = { loading: 0, preload: null };
        if (i = t.querySelector(Fa(a))) l.loading = 5;
        else {
          e = W({ rel: "stylesheet", href: e, "data-precedence": n }, r), (r = gr.get(a)) && Du(e, r);
          var u = i = t.createElement("link");
          En(u), On(u, "link", e), u._p = new Promise(function(g, w) {
            u.onload = g, u.onerror = w;
          }), u.addEventListener("load", function() {
            l.loading |= 1;
          }), u.addEventListener("error", function() {
            l.loading |= 2;
          }), l.loading |= 4, rl(i, n, t);
        }
        i = { type: "stylesheet", instance: i, count: 1, state: l }, o.set(a, i);
      }
    }
  }
  function c0(e, n) {
    tt.X(e, n);
    var r = Wo;
    if (r && e) {
      var t = lo(r).hoistableScripts, o = Ho(e), a = t.get(o);
      a || (a = r.querySelector(ja(o)), a || (e = W({ src: e, async: !0 }, n), (n = gr.get(o)) && Fu(e, n), a = r.createElement("script"), En(a), On(a, "link", e), r.head.appendChild(a)), a = { type: "script", instance: a, count: 1, state: null }, t.set(o, a));
    }
  }
  function f0(e, n) {
    tt.M(e, n);
    var r = Wo;
    if (r && e) {
      var t = lo(r).hoistableScripts, o = Ho(e), a = t.get(o);
      a || (a = r.querySelector(ja(o)), a || (e = W({ src: e, async: !0, type: "module" }, n), (n = gr.get(o)) && Fu(e, n), a = r.createElement("script"), En(a), On(a, "link", e), r.head.appendChild(a)), a = { type: "script", instance: a, count: 1, state: null }, t.set(o, a));
    }
  }
  function Qp(e, n, r, t) {
    var o = (o = un.current) ? Da(o) : null;
    if (!o) throw Error(s(446));
    switch (e) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof r.precedence == "string" && typeof r.href == "string" ? (r = Bo(r.href), n = lo(o).hoistableStyles, t = n.get(r), t || (t = { type: "style", instance: null, count: 0, state: null }, n.set(r, t)), t) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (r.rel === "stylesheet" && typeof r.href == "string" && typeof r.precedence == "string") {
          e = Bo(r.href);
          var a = lo(o).hoistableStyles, i = a.get(e);
          if (i || (o = o.ownerDocument || o, i = { type: "stylesheet", instance: null, count: 0, state: { loading: 0, preload: null } }, a.set(e, i), (a = o.querySelector(Fa(e))) ? a._p || (i.instance = a, i.state.loading = 5) : (a = gr.get(e), a || (a = { rel: "preload", as: "style", href: r.href, crossOrigin: r.crossOrigin, integrity: r.integrity, media: r.media, hrefLang: r.hrefLang, referrerPolicy: r.referrerPolicy }, gr.set(e, a)), d0(o, e, a, i.state))), n && t === null) throw Error(s(528, ""));
          return i;
        }
        if (n && t !== null) throw Error(s(529, ""));
        return null;
      case "script":
        return n = r.async, r = r.src, typeof r == "string" && n && typeof n != "function" && typeof n != "symbol" ? (r = Ho(r), n = lo(o).hoistableScripts, t = n.get(r), t || (t = { type: "script", instance: null, count: 0, state: null }, n.set(r, t)), t) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(s(444, e));
    }
  }
  function Bo(e) {
    return 'href="' + wr(e) + '"';
  }
  function Fa(e) {
    return 'link[rel="stylesheet"][' + e + "]";
  }
  function Yp(e) {
    return W({}, e, { "data-precedence": e.precedence, precedence: null });
  }
  function d0(e, n, r, t) {
    if (n = e.querySelector('link[rel="preload"][as="style"][' + n + "]")) {
      if (n[qa] !== !0) {
        t.loading = 1;
        return;
      }
    } else n = e.createElement("link"), n[qa] = !0, n.onload = n.onerror = oc.bind(null, n), On(n, "link", r), En(n), e.head.appendChild(n);
    t.preload = n, n.addEventListener("load", function() {
      return t.loading |= 1;
    }), n.addEventListener("error", function() {
      return t.loading |= 2;
    });
  }
  function Ho(e) {
    return '[src="' + wr(e) + '"]';
  }
  function ja(e) {
    return "script[async]" + e;
  }
  function Xp(e, n, r) {
    if (n.count++, n.instance === null) switch (n.type) {
      case "style":
        var t = e.querySelector('style[data-href~="' + wr(r.href) + '"]');
        if (t) return n.instance = t, En(t), t;
        var o = W({}, r, { "data-href": r.href, "data-precedence": r.precedence, href: null, precedence: null });
        return t = (e.ownerDocument || e).createElement("style"), En(t), On(t, "style", o), rl(t, r.precedence, e), n.instance = t;
      case "stylesheet":
        o = Bo(r.href);
        var a = e.querySelector(Fa(o));
        if (a) return n.state.loading |= 4, n.instance = a, En(a), a;
        t = Yp(r), (o = gr.get(o)) && Du(t, o), a = (e.ownerDocument || e).createElement("link"), En(a);
        var i = a;
        return i._p = new Promise(function(l, u) {
          i.onload = l, i.onerror = u;
        }), On(a, "link", t), n.state.loading |= 4, rl(a, r.precedence, e), n.instance = a;
      case "script":
        return a = Ho(r.src), (o = e.querySelector(ja(a))) ? (n.instance = o, En(o), o) : (t = r, (o = gr.get(a)) && (t = W({}, r), Fu(t, o)), e = e.ownerDocument || e, o = e.createElement("script"), En(o), On(o, "link", t), e.head.appendChild(o), n.instance = o);
      case "void":
        return null;
      default:
        throw Error(s(443, n.type));
    }
    else n.type === "stylesheet" && (n.state.loading & 4) === 0 && (t = n.instance, n.state.loading |= 4, rl(t, r.precedence, e));
    return n.instance;
  }
  function rl(e, n, r) {
    for (var t = r.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'), o = t.length ? t[t.length - 1] : null, a = o, i = 0; i < t.length; i++) {
      var l = t[i];
      if (l.dataset.precedence === n) a = l;
      else if (a !== o) break;
    }
    a ? a.parentNode.insertBefore(e, a.nextSibling) : (n = r.nodeType === 9 ? r.head : r, n.insertBefore(e, n.firstChild));
  }
  function Du(e, n) {
    e.crossOrigin == null && (e.crossOrigin = n.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = n.referrerPolicy), e.title == null && (e.title = n.title);
  }
  function Fu(e, n) {
    e.crossOrigin == null && (e.crossOrigin = n.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = n.referrerPolicy), e.integrity == null && (e.integrity = n.integrity);
  }
  var tl = null;
  function Gp(e, n, r) {
    if (tl === null) {
      var t = /* @__PURE__ */ new Map(), o = tl = /* @__PURE__ */ new Map();
      o.set(r, t);
    } else o = tl, t = o.get(r), t || (t = /* @__PURE__ */ new Map(), o.set(r, t));
    if (t.has(e)) return t;
    for (t.set(e, null), r = r.getElementsByTagName(e), o = 0; o < r.length; o++) {
      var a = r[o];
      if (!(a[Jo] || a[_n] || e === "link" && a.getAttribute("rel") === "stylesheet") && a.namespaceURI !== "http://www.w3.org/2000/svg") {
        var i = a.getAttribute(n) || "";
        i = e + i;
        var l = t.get(i);
        l ? l.push(a) : t.set(i, [a]);
      }
    }
    return t;
  }
  function ju(e, n, r) {
    e = e.ownerDocument || e, e.head.insertBefore(r, n === "title" ? e.querySelector("head > title") : null);
  }
  function p0(e, n, r) {
    if (r === 1 || n.itemProp != null) return !1;
    switch (e) {
      case "meta":
      case "title":
        return !0;
      case "style":
        if (typeof n.precedence != "string" || typeof n.href != "string" || n.href === "") break;
        return !0;
      case "link":
        if (typeof n.rel != "string" || typeof n.href != "string" || n.href === "" || n.onLoad || n.onError) break;
        switch (n.rel) {
          case "stylesheet":
            return e = n.disabled, typeof n.precedence == "string" && e == null;
          default:
            return !0;
        }
      case "script":
        if (n.async && typeof n.async != "function" && typeof n.async != "symbol" && !n.onLoad && !n.onError && n.src && typeof n.src == "string") return !0;
    }
    return !1;
  }
  function Kp(e, n) {
    return e === "img" && n.src != null && n.src !== "" && n.onLoad == null && n.loading !== "lazy";
  }
  function Zp(e) {
    return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
  }
  function Jp(e) {
    return (e.width || 100) * (e.height || 100) * (typeof devicePixelRatio == "number" ? devicePixelRatio : 1) * 0.25;
  }
  function eh(e, n) {
    typeof n.decode == "function" && (e.imgCount++, n.complete || (e.imgBytes += Jp(n), e.suspenseyImages.push(n)), e = g0.bind(e), n.decode().then(e, e));
  }
  function h0(e, n, r, t) {
    if (r.type === "stylesheet" && (typeof t.media != "string" || matchMedia(t.media).matches !== !1) && (r.state.loading & 4) === 0) {
      if (r.instance === null) {
        var o = Bo(t.href), a = n.querySelector(Fa(o));
        if (a) {
          n = a._p, n !== null && typeof n == "object" && typeof n.then == "function" && (e.count++, e = $a.bind(e), n.then(e, e)), r.state.loading |= 4, r.instance = a, En(a);
          return;
        }
        a = n.ownerDocument || n, t = Yp(t), (o = gr.get(o)) && Du(t, o), a = a.createElement("link"), En(a);
        var i = a;
        i._p = new Promise(function(l, u) {
          i.onload = l, i.onerror = u;
        }), On(a, "link", t), r.instance = a;
      }
      e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(r, n), (n = r.state.preload) && (r.state.loading & 3) === 0 && (e.count++, r = $a.bind(e), n.addEventListener("load", r), n.addEventListener("error", r));
    }
  }
  var ol = 0;
  function m0(e, n) {
    return e.stylesheets && e.count === 0 && il(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(r) {
      var t = setTimeout(function() {
        if (e.stylesheets && il(e, e.stylesheets), e.unsuspend) {
          var a = e.unsuspend;
          e.unsuspend = null, a();
        }
      }, 6e4 + n);
      0 < e.imgBytes && ol === 0 && (ol = 62500 * Ig());
      var o = setTimeout(function() {
        if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && il(e, e.stylesheets), e.unsuspend)) {
          var a = e.unsuspend;
          e.unsuspend = null, a();
        }
      }, (e.imgBytes > ol ? 50 : 800) + n);
      return e.unsuspend = r, function() {
        e.unsuspend = null, clearTimeout(t), clearTimeout(o);
      };
    } : null;
  }
  function nh(e) {
    if (e.count === 0 && (e.imgCount === 0 || !e.waitingForImages)) {
      if (e.stylesheets) il(e, e.stylesheets);
      else if (e.unsuspend) {
        var n = e.unsuspend;
        e.unsuspend = null, n();
      }
    }
  }
  function $a() {
    this.count--, nh(this);
  }
  function g0() {
    this.imgCount--, nh(this);
  }
  var al = null;
  function il(e, n) {
    e.stylesheets = null, e.unsuspend !== null && (e.count++, al = /* @__PURE__ */ new Map(), n.forEach(v0, e), al = null, $a.call(e));
  }
  function v0(e, n) {
    if (!(n.state.loading & 4)) {
      var r = al.get(e);
      if (r) var t = r.get(null);
      else {
        r = /* @__PURE__ */ new Map(), al.set(e, r);
        for (var o = e.querySelectorAll("link[data-precedence],style[data-precedence]"), a = 0; a < o.length; a++) {
          var i = o[a];
          (i.nodeName === "LINK" || i.getAttribute("media") !== "not all") && (r.set(i.dataset.precedence, i), t = i);
        }
        t && r.set(null, t);
      }
      o = n.instance, i = o.getAttribute("data-precedence"), a = r.get(i) || t, a === t && r.set(null, o), r.set(i, o), this.count++, t = $a.bind(this), o.addEventListener("load", t), o.addEventListener("error", t), a ? a.parentNode.insertBefore(o, a.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(o, e.firstChild)), n.state.loading |= 4;
    }
  }
  var qo = { $$typeof: Ke, Provider: null, Consumer: null, _currentValue: A, _currentValue2: A, _threadCount: 0 };
  function y0(e, n, r, t, o, a, i, l, u) {
    this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Ko(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Ko(0), this.hiddenUpdates = Ko(null), this.identifierPrefix = t, this.onUncaughtError = o, this.onCaughtError = a, this.onRecoverableError = i, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = u, this.transitionTypes = null, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function rh(e, n, r, t, o, a, i, l, u, g, w, E) {
    return e = new y0(e, n, r, i, u, g, w, E, l), n = 1, a === !0 && (n |= 24), a = Yn(3, null, null, n), e.current = a, a.stateNode = e, n = Zl(), n.refCount++, e.pooledCache = n, n.refCount++, a.memoizedState = { element: t, isDehydrated: r, cache: n }, rs(a), e;
  }
  function th(e) {
    return e ? (e = yo, e) : yo;
  }
  function oh(e, n, r, t, o, a) {
    o = th(o), t.context === null ? t.context = o : t.pendingContext = o, t = ht(n), t.payload = { element: r }, a = a === void 0 ? null : a, a !== null && (t.callback = a), r = mt(e, t, n), r !== null && (Zn(r, e, n), ga(r, e, n));
  }
  function ah(e, n) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var r = e.retryLane;
      e.retryLane = r !== 0 && r < n ? r : n;
    }
  }
  function $u(e, n) {
    ah(e, n), (e = e.alternate) && ah(e, n);
  }
  function ih(e) {
    if (e.tag === 13 || e.tag === 31) {
      var n = Rt(e, 67108864);
      n !== null && Zn(n, e, 67108864), $u(e, 67108864);
    }
  }
  function lh(e) {
    if (e.tag === 13 || e.tag === 31) {
      var n = lr();
      n = yl(n);
      var r = Rt(e, n);
      r !== null && Zn(r, e, n), $u(e, n);
    }
  }
  var Qo = !0;
  function b0(e, n, r, t) {
    var o = q.T;
    q.T = null;
    var a = te.p;
    try {
      te.p = 2, Ru(e, n, r, t);
    } finally {
      te.p = a, q.T = o;
    }
  }
  function w0(e, n, r, t) {
    var o = q.T;
    q.T = null;
    var a = te.p;
    try {
      te.p = 8, Ru(e, n, r, t);
    } finally {
      te.p = a, q.T = o;
    }
  }
  function Ru(e, n, r, t) {
    if (Qo) {
      var o = Uu(t);
      if (o === null) ku(e, n, t, ll, r), uh(e, t);
      else if (S0(o, e, n, r, t)) t.stopPropagation();
      else if (uh(e, t), n & 4 && -1 < k0.indexOf(e)) {
        for (; o !== null; ) {
          var a = io(o);
          if (a !== null) switch (a.tag) {
            case 3:
              if (a = a.stateNode, a.current.memoizedState.isDehydrated) {
                var i = zn(a.pendingLanes);
                if (i !== 0) {
                  var l = a;
                  for (l.pendingLanes |= 2, l.entangledLanes |= 2; i; ) {
                    var u = 1 << 31 - we(i);
                    l.entanglements[1] |= u, i &= ~u;
                  }
                  $r(a), (Ue & 6) === 0 && (qi = p() + 500, Ta(0));
                }
              }
              break;
            case 31:
            case 13:
              l = Rt(a, 2), l !== null && Zn(l, a, 2), Xi(), $u(a, 2);
          }
          if (a = Uu(t), a === null && ku(e, n, t, ll, r), a === o) break;
          o = a;
        }
        o !== null && t.stopPropagation();
      } else ku(e, n, t, null, r);
    }
  }
  function Uu(e) {
    return e = Nl(e), Vu(e);
  }
  var ll = null;
  function Vu(e) {
    if (ll = null, e = Dt(e), e !== null) {
      var n = L(e);
      if (n === null) e = null;
      else {
        var r = n.tag;
        if (r === 13) {
          if (e = $(n), e !== null) return e;
          e = null;
        } else if (r === 31) {
          if (e = B(n), e !== null) return e;
          e = null;
        } else if (r === 3) {
          if (n.stateNode.current.memoizedState.isDehydrated) return n.tag === 3 ? n.stateNode.containerInfo : null;
          e = null;
        } else n !== e && (e = null);
      }
    }
    return ll = e, null;
  }
  function sh(e) {
    switch (e) {
      case "beforetoggle":
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "seeked":
      case "submit":
      case "toggle":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "fullscreenerror":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 2;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "resize":
      case "scroll":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 8;
      case "message":
        switch (S()) {
          case F:
            return 2;
          case U:
            return 8;
          case D:
          case Y:
            return 32;
          case se:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var Wu = !1, Pt = null, zt = null, _t = null, Ra = /* @__PURE__ */ new Map(), Ua = /* @__PURE__ */ new Map(), Lt = [], k0 = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");
  function uh(e, n) {
    switch (e) {
      case "focusin":
      case "focusout":
        Pt = null;
        break;
      case "dragenter":
      case "dragleave":
        zt = null;
        break;
      case "mouseover":
      case "mouseout":
        _t = null;
        break;
      case "pointerover":
      case "pointerout":
        Ra.delete(n.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Ua.delete(n.pointerId);
    }
  }
  function Va(e, n, r, t, o, a) {
    return e === null || e.nativeEvent !== a ? (e = { blockedOn: n, domEventName: r, eventSystemFlags: t, nativeEvent: a, targetContainers: [o] }, n !== null && (n = io(n), n !== null && ih(n)), e) : (e.eventSystemFlags |= t, n = e.targetContainers, o !== null && n.indexOf(o) === -1 && n.push(o), e);
  }
  function S0(e, n, r, t, o) {
    switch (n) {
      case "focusin":
        return Pt = Va(Pt, e, n, r, t, o), !0;
      case "dragenter":
        return zt = Va(zt, e, n, r, t, o), !0;
      case "mouseover":
        return _t = Va(_t, e, n, r, t, o), !0;
      case "pointerover":
        var a = o.pointerId;
        return Ra.set(a, Va(Ra.get(a) || null, e, n, r, t, o)), !0;
      case "gotpointercapture":
        return a = o.pointerId, Ua.set(a, Va(Ua.get(a) || null, e, n, r, t, o)), !0;
    }
    return !1;
  }
  function ch(e) {
    var n = Dt(e.target);
    if (n !== null) {
      var r = L(n);
      if (r !== null) {
        if (n = r.tag, n === 13) {
          if (n = $(r), n !== null) {
            e.blockedOn = n, nc(e.priority, function() {
              lh(r);
            });
            return;
          }
        } else if (n === 31) {
          if (n = B(r), n !== null) {
            e.blockedOn = n, nc(e.priority, function() {
              lh(r);
            });
            return;
          }
        } else if (n === 3 && r.stateNode.current.memoizedState.isDehydrated) {
          e.blockedOn = r.tag === 3 ? r.stateNode.containerInfo : null;
          return;
        }
      }
    }
    e.blockedOn = null;
  }
  function sl(e) {
    if (e.blockedOn !== null) return !1;
    for (var n = e.targetContainers; 0 < n.length; ) {
      var r = Uu(e.nativeEvent);
      if (r === null) {
        r = e.nativeEvent;
        var t = new r.constructor(r.type, r);
        El = t, r.target.dispatchEvent(t), El = null;
      } else return n = io(r), n !== null && ih(n), e.blockedOn = r, !1;
      n.shift();
    }
    return !0;
  }
  function fh(e, n, r) {
    sl(e) && r.delete(n);
  }
  function x0() {
    Wu = !1, Pt !== null && sl(Pt) && (Pt = null), zt !== null && sl(zt) && (zt = null), _t !== null && sl(_t) && (_t = null), Ra.forEach(fh), Ua.forEach(fh);
  }
  function ul(e, n) {
    e.blockedOn === n && (e.blockedOn = null, Wu || (Wu = !0, c.unstable_scheduleCallback(c.unstable_NormalPriority, x0)));
  }
  var cl = null;
  function dh(e) {
    cl !== e && (cl = e, c.unstable_scheduleCallback(c.unstable_NormalPriority, function() {
      cl === e && (cl = null);
      for (var n = 0; n < e.length; n += 3) {
        var r = e[n], t = e[n + 1], o = e[n + 2];
        if (typeof t != "function") {
          if (Vu(t || r) === null) continue;
          break;
        }
        var a = io(r);
        a !== null && (e.splice(n, 3), n -= 3, xs(a, { pending: !0, data: o, method: r.method, action: t }, t, o));
      }
    }));
  }
  function Yo(e) {
    function n(u) {
      return ul(u, e);
    }
    Pt !== null && ul(Pt, e), zt !== null && ul(zt, e), _t !== null && ul(_t, e), Ra.forEach(n), Ua.forEach(n);
    for (var r = 0; r < Lt.length; r++) {
      var t = Lt[r];
      t.blockedOn === e && (t.blockedOn = null);
    }
    for (; 0 < Lt.length && (r = Lt[0], r.blockedOn === null); ) ch(r), r.blockedOn === null && Lt.shift();
    if (r = (e.ownerDocument || e).$$reactFormReplay, r != null) for (t = 0; t < r.length; t += 3) {
      var o = r[t], a = r[t + 1], i = o[Qn] || null;
      if (typeof a == "function") i || dh(r);
      else if (i) {
        var l = null;
        if (a && a.hasAttribute("formAction")) {
          if (o = a, i = a[Qn] || null) l = i.formAction;
          else if (Vu(o) !== null) continue;
        } else l = i.action;
        typeof l == "function" ? r[t + 1] = l : (r.splice(t, 3), t -= 3), dh(r);
      }
    }
  }
  function ph() {
    function e(a) {
      a.canIntercept && a.info === "react-transition" && a.intercept({ handler: function() {
        return new Promise(function(i) {
          return o = i;
        });
      }, focusReset: "manual", scroll: "manual" });
    }
    function n() {
      o !== null && (o(), o = null), t || setTimeout(r, 20);
    }
    function r() {
      if (!t && !navigation.transition) {
        var a = navigation.currentEntry;
        a && a.url != null && navigation.navigate(a.url, { state: a.getState(), info: "react-transition", history: "replace" });
      }
    }
    if (typeof navigation == "object") {
      var t = !1, o = null;
      return navigation.addEventListener("navigate", e), navigation.addEventListener("navigatesuccess", n), navigation.addEventListener("navigateerror", n), setTimeout(r, 100), function() {
        t = !0, navigation.removeEventListener("navigate", e), navigation.removeEventListener("navigatesuccess", n), navigation.removeEventListener("navigateerror", n), o !== null && (o(), o = null);
      };
    }
  }
  function Bu(e) {
    this._internalRoot = e;
  }
  fl.prototype.render = Bu.prototype.render = function(e) {
    var n = this._internalRoot;
    if (n === null) throw Error(s(409));
    var r = n.current, t = lr();
    oh(r, t, e, n, null, null);
  }, fl.prototype.unmount = Bu.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var n = e.containerInfo;
      oh(e.current, 2, null, e, null, null), Xi(), n[ao] = null;
    }
  };
  function fl(e) {
    this._internalRoot = e;
  }
  fl.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var n = ec();
      e = { blockedOn: null, target: e, priority: n };
      for (var r = 0; r < Lt.length && n !== 0 && n < Lt[r].priority; r++) ;
      Lt.splice(r, 0, e), r === 0 && ch(e);
    }
  };
  var hh = N.version;
  if (hh !== "19.3.0") throw Error(s(527, hh, "19.3.0"));
  te.findDOMNode = function(e) {
    var n = e._reactInternals;
    if (n === void 0) throw typeof e.render == "function" ? Error(s(188)) : (e = Object.keys(e).join(","), Error(s(268, e)));
    return e = j(n), e = e !== null ? M(e) : null, e = e === null ? null : e.stateNode, e;
  };
  var E0 = { bundleType: 0, version: "19.3.0", rendererPackageName: "react-dom", currentDispatcherRef: q, reconcilerVersion: "19.3.0" };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var dl = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!dl.isDisabled && dl.supportsFiber) try {
      je = dl.inject(E0), Ce = dl;
    } catch {
    }
  }
  return Wa.createRoot = function(e, n) {
    if (!T(e)) throw Error(s(299));
    var r = !1, t = "", o = td, a = od, i = ad;
    return n != null && (n.unstable_strictMode === !0 && (r = !0), n.identifierPrefix !== void 0 && (t = n.identifierPrefix), n.onUncaughtError !== void 0 && (o = n.onUncaughtError), n.onCaughtError !== void 0 && (a = n.onCaughtError), n.onRecoverableError !== void 0 && (i = n.onRecoverableError)), n = rh(e, 1, !1, null, null, r, t, null, o, a, i, ph), e[ao] = n.current, wu(e), new Bu(n);
  }, Wa.hydrateRoot = function(e, n, r) {
    if (!T(e)) throw Error(s(299));
    var t = !1, o = "", a = td, i = od, l = ad, u = null;
    return r != null && (r.unstable_strictMode === !0 && (t = !0), r.identifierPrefix !== void 0 && (o = r.identifierPrefix), r.onUncaughtError !== void 0 && (a = r.onUncaughtError), r.onCaughtError !== void 0 && (i = r.onCaughtError), r.onRecoverableError !== void 0 && (l = r.onRecoverableError), r.formState !== void 0 && (u = r.formState)), n = rh(e, 1, !0, n, r ?? null, t, o, u, a, i, l, ph), n.context = th(null), r = n.current, t = lr(), t = yl(t), o = ht(t), o.callback = null, mt(r, o, t), r = t, n.current.lanes = r, Zo(n, r), $r(n), e[ao] = n.current, wu(e), new fl(n);
  }, Wa.version = "19.3.0", Wa;
}
var Nh;
function I0() {
  if (Nh) return Hu.exports;
  Nh = 1;
  function c() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(c);
    } catch (N) {
      console.error(N);
    }
  }
  return c(), Hu.exports = T0(), Hu.exports;
}
var O0 = I0(), Ch = { exports: {} }, Ba = {};
/**
* @license React
* react-jsx-runtime.production.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var Ph;
function A0() {
  if (Ph) return Ba;
  Ph = 1;
  var c = Symbol.for("react.transitional.element"), N = Symbol.for("react.fragment");
  function k(s, T, L) {
    var $ = null;
    if (L !== void 0 && ($ = "" + L), T.key !== void 0 && ($ = "" + T.key), "key" in T) {
      L = {};
      for (var B in T) B !== "key" && (L[B] = T[B]);
    } else L = T;
    return T = L.ref, { $$typeof: c, type: s, key: $, ref: T !== void 0 ? T : null, props: L };
  }
  return Ba.Fragment = N, Ba.jsx = k, Ba.jsxs = k, Ba;
}
var zh;
function D0() {
  return zh || (zh = 1, Ch.exports = A0()), Ch.exports;
}
var P = D0();
const pl = { top: 24, right: 24, bottom: 34, left: 48 };
function Th(c, N, k, s, T, L) {
  const $ = (s == null ? void 0 : s.left) ?? pl.left, B = (s == null ? void 0 : s.right) ?? pl.right, I = (s == null ? void 0 : s.top) ?? pl.top, j = (s == null ? void 0 : s.bottom) ?? pl.bottom, M = s && s.top !== void 0 && s.right !== void 0 && s.bottom !== void 0 && s.left !== void 0 ? s : { top: I, right: B, bottom: j, left: $ }, v = c ? c.length : 0;
  if (v === 0) return { points: [], minVal: T ?? 0, maxVal: L ?? 0, padding: M };
  let O = T !== void 0 ? T : 1 / 0, ee = L !== void 0 ? L : -1 / 0;
  if (T === void 0 || L === void 0) for (let ge = 0; ge < v; ge++) {
    const ie = c[ge], fe = typeof ie == "number" ? ie : ie.value, le = Number.isFinite(fe) ? fe : 0;
    T === void 0 && le < O && (O = le), L === void 0 && le > ee && (ee = le);
  }
  (O === ee || !Number.isFinite(O)) && (O = O > 0 ? 0 : O - 1, ee = ee === 0 ? 1 : ee + 1);
  const ne = Math.max(1, N - $ - B), oe = Math.max(1, k - I - j), Z = ee - O || 1, V = v > 1 ? ne / (v - 1) : ne / 2, Pe = new Array(v);
  for (let ge = 0; ge < v; ge++) {
    const ie = c[ge], fe = typeof ie == "number", le = fe ? Number.isFinite(ie) ? ie : 0 : Number.isFinite(ie.value) ? ie.value : 0, W = fe ? void 0 : ie.label, H = v === 1 ? $ + ne / 2 : $ + ge * V, Ee = I + oe - (le - O) / Z * oe, Ne = Math.round(H * 10) / 10, Re = Math.round(Ee * 10) / 10;
    Pe[ge] = W !== void 0 ? { x: Ne, y: Re, value: le, label: W } : { x: Ne, y: Re, value: le };
  }
  return { points: Pe, minVal: O, maxVal: ee, padding: M };
}
function Ih(c, N = 7) {
  const k = /* @__PURE__ */ new Set();
  if (c <= 0) return k;
  const s = c <= N ? c : Math.max(2, N);
  for (let T = 0; T < s; T++) k.add(c <= N ? T : Math.round(T / (s - 1) * (c - 1)));
  return k;
}
function Xe(c) {
  return Math.round(c * 10) / 10;
}
function gl(c, N = !0, k = 0.25) {
  const s = c.length;
  if (s === 0) return "";
  if (s === 1) return `M ${Xe(c[0].x)},${Xe(c[0].y)}`;
  if (!N || k === 0 || s === 2) {
    const L = new Array(s);
    for (let $ = 0; $ < s; $++) {
      const B = c[$];
      L[$] = `${$ === 0 ? "M" : "L"} ${Xe(B.x)},${Xe(B.y)}`;
    }
    return L.join(" ");
  }
  const T = new Array(s);
  T[0] = `M ${Xe(c[0].x)},${Xe(c[0].y)}`;
  for (let L = 0; L < s - 1; L++) {
    const $ = L > 0 ? c[L - 1] : c[L], B = c[L], I = c[L + 1], j = L < s - 2 ? c[L + 2] : I, M = Xe(B.x + (I.x - $.x) * k), v = Xe(B.y + (I.y - $.y) * k), O = Xe(I.x - (j.x - B.x) * k), ee = Xe(I.y - (j.y - B.y) * k);
    T[L + 1] = `C ${M},${v} ${O},${ee} ${Xe(I.x)},${Xe(I.y)}`;
  }
  return T.join(" ");
}
function Oh(c, N, k = !0, s = 0.25, T) {
  const L = c.length;
  if (L === 0) return "";
  const $ = T ?? gl(c, k, s), B = c[0], I = c[L - 1], j = Xe(N);
  return `${$} L ${Xe(I.x)},${j} L ${Xe(B.x)},${j} Z`;
}
function F0(c, N, k = !0, s = 0.25, T) {
  const L = c.length, $ = N.length;
  if (L === 0) return "";
  const B = T ?? gl(c, k, s);
  if ($ === 0) return `${B} Z`;
  const I = new Array($);
  for (let j = $ - 1, M = 0; j >= 0; j--, M++) {
    const v = N[j];
    I[M] = `L ${Xe(v.x)},${Xe(v.y)}`;
  }
  return `${B} ${I.join(" ")} Z`;
}
function Tt(c, N, k, s, T, L = !0, $ = !1) {
  const B = L && $ ? s / 2 : s, I = Math.max(0, Math.min(T, k / 2, B)), j = L ? I : 0, M = $ ? I : 0, v = Xe(c), O = Xe(N), ee = Xe(k), ne = Xe(s);
  if (j <= 0 && M <= 0) return `M ${v},${O} h ${ee} v ${ne} h ${-ee} Z`;
  const oe = Xe(j), Z = Xe(M), V = [`M ${Xe(c + j)},${O}`];
  return V.push(`h ${Xe(k - 2 * j)}`), j > 0 && V.push(`a ${oe},${oe} 0 0 1 ${oe},${oe}`), V.push(`v ${Xe(s - j - M)}`), M > 0 && V.push(`a ${Z},${Z} 0 0 1 ${-Z},${Z}`), V.push(`h ${Xe(-(k - 2 * M))}`), M > 0 && V.push(`a ${Z},${Z} 0 0 1 ${-Z},${-Z}`), V.push(`v ${Xe(-(s - j - M))}`), j > 0 && V.push(`a ${oe},${oe} 0 0 1 ${oe},${-oe}`), V.push("Z"), V.join(" ");
}
function Ah(c) {
  const { data: N = [], series: k, x: s, y: T, colors: L, defaultPalette: $ = ["#6366f1", "#10b981", "#f59e0b", "#ec4899", "#06b6d4", "#8b5cf6"] } = c, B = L && L.length > 0 ? L : $;
  if (k && k.length > 0) return { data: [], series: k, isMultiSeries: !0 };
  if (!N || N.length === 0) return { data: [], series: void 0, isMultiSeries: !1 };
  if (Array.isArray(T) && T.length > 0) {
    const I = T.map((j, M) => ({ id: `s-${j}-${M}`, name: j, color: B[M % B.length], data: N.map((v) => {
      const O = typeof v == "object" && v !== null && Number(v[j]) || 0, ee = s && typeof v == "object" && v !== null && v[s] !== void 0 ? String(v[s]) : void 0;
      return ee !== void 0 ? { value: O, label: ee } : { value: O };
    }) }));
    return { data: [], series: I, isMultiSeries: !0 };
  }
  return typeof T == "string" ? { data: N.map((I) => {
    const j = typeof I == "object" && I !== null && Number(I[T]) || 0, M = s && typeof I == "object" && I !== null && I[s] !== void 0 ? String(I[s]) : typeof I == "object" && I !== null && I.label !== void 0 ? String(I.label) : void 0;
    return M !== void 0 ? { value: j, label: M } : { value: j };
  }), series: void 0, isMultiSeries: !1 } : s && N.length > 0 && typeof N[0] == "object" && N[0] !== null && "value" in N[0] ? { data: N.map((I) => {
    const j = Number(I.value) || 0, M = I[s] !== void 0 ? String(I[s]) : I.label;
    return M !== void 0 ? { value: j, label: M } : { value: j };
  }), series: void 0, isMultiSeries: !1 } : { data: N, series: void 0, isMultiSeries: !1 };
}
const j0 = "0 10px 30px rgba(0,0,0,.4)", $0 = { default: ["#6366f1", "#070b14", "#1e293b", j0, "#f1f5f9"], tokyonight: ["#7aa2f7", "#1a1b26", "#2f3549", "0 15px 35px rgba(0,0,0,.55)", "#c0caf5", { glow: !0, gradientStartOpacity: 0.28 }], cyberpunk: ["#00f0ff", "#050508", "rgba(0,240,255,.25)", "0 0 35px rgba(0,240,255,.12)", "#00f0ff", { glow: !0, gradientStartOpacity: 0.35 }], glass: ["#10b981", "rgba(15,23,42,.75)", "rgba(255,255,255,.12)", "0 20px 40px rgba(0,0,0,.4)", "#fff", { strokeWidth: 3.5, gradientStartOpacity: 0.35, backdropFilter: "blur(16px)" }], paper: ["#4f46e5", "#f8fafc", "#e2e8f0", "0 10px 25px rgba(0,0,0,.05)", "#0f172a", { gradientStartOpacity: 0.12 }], terminal: ["#22c55e", "#020c04", "rgba(34,197,94,.3)", "0 0 25px rgba(34,197,94,.15)", "#4ade80", { smooth: !1, strokeWidth: 2.5, strokeDasharray: "5 5", fillGradient: !1, glow: !0, fontFamily: "monospace" }] }, hl = Object.fromEntries(Object.entries($0).map(([c, [N, k, s, T, L, $ = {}]]) => {
  const { glow: B = !1, smooth: I = !0, strokeWidth: j = 3, strokeDasharray: M, fillGradient: v = !1, gradientStartOpacity: O = 0.25, ...ee } = $;
  return [c, { color: N, smooth: I, strokeWidth: j, fillGradient: v, gradientStartOpacity: O, showGrid: !0, gridLines: 4, showXAxis: !0, showYAxis: !0, glow: B, strokeDasharray: M, containerStyle: { borderRadius: "16px", padding: "22px", background: k, border: `1px solid ${s}`, boxShadow: T, color: L, ...ee } }];
})), R0 = { top: 24, right: 24, bottom: 34, left: 48 }, It = ["#6366f1", "#10b981", "#f59e0b", "#ec4899", "#06b6d4", "#8b5cf6"], Dh = { position: "absolute", width: "1px", height: "1px", padding: 0, margin: "-1px", overflow: "hidden", clip: "rect(0, 0, 0, 0)", whiteSpace: "nowrap", border: 0 }, _h = (c = []) => {
  if (!c || c.length === 0) return [];
  const N = c.length, k = new Array(N);
  for (let s = 0; s < N; s++) {
    const T = c[s];
    if (typeof T == "number") k[s] = { value: Number.isFinite(T) ? T : 0 };
    else {
      const L = Number.isFinite(T.value) ? T.value : 0;
      k[s] = T.label !== void 0 ? { value: L, label: T.label } : { value: L };
    }
  }
  return k;
}, Fh = { width: "100%", height: "auto", display: "block", overflow: "visible", touchAction: "pan-y" };
function jh(c) {
  var ge;
  const N = c.variant || "default", k = hl[N] || hl.default, s = c.color ?? k.color, T = { ...R0, ...c.padding }, L = xe.useRef(null), [$, B] = xe.useState(null);
  xe.useEffect(() => {
    if (!c.responsive) return;
    const ie = L.current;
    if (!ie) return;
    const fe = () => {
      const W = ie.getBoundingClientRect(), H = Math.floor(W.width);
      H > 0 && B((Ee) => (Ee == null ? void 0 : Ee.width) === H ? Ee : { width: H, height: c.height ?? 220 });
    };
    if (fe(), typeof ResizeObserver > "u") return window.addEventListener("resize", fe), () => window.removeEventListener("resize", fe);
    const le = new ResizeObserver((W) => {
      if (!W.length) return;
      const { width: H } = W[0].contentRect, Ee = Math.floor(H);
      Ee > 0 && B((Ne) => (Ne == null ? void 0 : Ne.width) === Ee ? Ne : { width: Ee, height: c.height ?? 220 });
    });
    return le.observe(ie), () => le.disconnect();
  }, [c.responsive, c.height]);
  const I = ($ == null ? void 0 : $.width) ?? c.width ?? 500, j = ($ == null ? void 0 : $.height) ?? c.height ?? 220, M = Math.max(1, I - T.left - T.right), v = Math.max(1, j - T.top - T.bottom), O = j - T.bottom, ee = c.valueFormatter || ((ie) => String(Math.round(ie))), ne = xe.useId().replace(/:/g, "-"), oe = `gl-${ne}`, Z = c.card !== !1, V = { position: "relative", width: "100%", maxWidth: "100%", boxSizing: "border-box", ...Z ? k.containerStyle : { borderRadius: 0, padding: 0, background: "transparent", border: "none", boxShadow: "none", color: ((ge = k.containerStyle) == null ? void 0 : ge.color) || "currentColor" }, ...c.style }, Pe = c.ariaLabel || c.title || "Interactive chart";
  return { preset: k, color: s, pad: T, width: I, height: j, chartWidth: M, chartHeight: v, baselineY: O, valueFormatter: ee, uid: ne, glowId: oe, containerStyle: V, containerRef: L, ariaLabel: Pe, card: Z, showGrid: c.showGrid ?? k.showGrid ?? !0, gridLines: c.gridLines ?? k.gridLines ?? 4, showXAxis: c.showXAxis ?? k.showXAxis ?? !0, showYAxis: c.showYAxis ?? k.showYAxis ?? !0, glow: c.glow ?? k.glow ?? !1, crosshair: c.crosshair ?? !1, animated: c.animated ?? !0, negativeColor: c.negativeColor ?? "#f7768e", showZeroLine: c.showZeroLine ?? !0 };
}
const Yu = Xo.memo(({ title: c, subtitle: N, metric: k, color: s, marginBottom: T = 14 }) => !c && !k && !N ? null : P.jsxs("div", { style: { display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: T, gap: 8 }, children: [P.jsxs("div", { children: [c && P.jsx("h3", { style: { margin: 0, fontSize: 15, fontWeight: 700 }, children: c }), N && P.jsx("p", { style: { margin: "2px 0 0", fontSize: 12, opacity: 0.75 }, children: N })] }), k && P.jsx("div", { style: { fontSize: 18, fontWeight: 800, color: s, textAlign: "right" }, children: k })] })), Xu = Xo.memo(({ height: c, className: N = "", style: k }) => P.jsx("div", { className: `pure-svg-empty ${N}`, style: { display: "flex", alignItems: "center", justifyContent: "center", color: "#94a3b8", fontSize: 14, ...k, height: c }, children: "No data to display" }));
Xo.memo(({ xPercent: c, yPercent: N, borderColor: k = "#334155", children: s }) => P.jsx("div", { style: { position: "absolute", left: `${c}%`, top: `${N}%`, transform: "translate(-50%, -130%)", backgroundColor: "#0f172a", color: "#ffffff", padding: "4px 8px", borderRadius: 6, fontSize: 12, fontWeight: 700, pointerEvents: "none", whiteSpace: "nowrap", boxShadow: "0 4px 12px rgba(0,0,0,0.4)", border: `1px solid ${k}`, zIndex: 10 }, children: s }));
const $h = Xo.memo(({ showGrid: c = !0, showYAxis: N = !0, gridLines: k = 4, minVal: s, maxVal: T, pad: L, width: $, height: B, valueFormatter: I, showZeroLine: j = !0, zeroY: M }) => {
  if (!c || k <= 1) return null;
  const v = Math.max(1, B - L.top - L.bottom), O = (T - s) / (k - 1), ee = v / (k - 1);
  let ne = "";
  const oe = [];
  for (let V = 0; V < k; V++) {
    const Pe = L.top + V * ee, ge = Math.round(T - V * O);
    ne += `M${L.left} ${Pe}H${$ - L.right}`, N && oe.push(P.jsx("text", { x: L.left - 8, y: Pe + 3.5, children: I(ge) }, V));
  }
  const Z = M !== void 0 ? M : s < 0 && T > 0 ? L.top + (T - 0) / (T - s) * v : void 0;
  return P.jsxs("g", { className: "pure-svg-grid", children: [P.jsx("path", { d: ne, stroke: "currentColor", strokeOpacity: 0.15, strokeDasharray: "3 3", strokeWidth: 1 }), j && Z !== void 0 && P.jsx("line", { x1: L.left, y1: Z, x2: $ - L.right, y2: Z, stroke: "currentColor", strokeOpacity: 0.4, strokeWidth: 1.5 }), N && P.jsx("g", { fill: "currentColor", opacity: 0.65, fontSize: 10, fontWeight: "600", fontFamily: "monospace", textAnchor: "end", children: oe })] });
}), Gu = Xo.memo(({ id: c, color: N }) => P.jsx("filter", { id: c, x: "-50%", y: "-50%", width: "200%", height: "200%", children: P.jsx("feDropShadow", { dx: "0", dy: "0", stdDeviation: "4", floodColor: N, floodOpacity: "0.75" }) })), Rh = Xo.memo(({ x: c, y: N, baselineY: k, padLeft: s, padRight: T, width: L, color: $, valueStr: B, label: I }) => {
  const j = Math.max(34, B.length * 7 + 10), M = I ? Math.max(32, I.length * 7 + 12) : 0, v = Math.max(s + M / 2, Math.min(L - T - M / 2, c));
  return P.jsxs("g", { className: "pure-svg-crosshair", pointerEvents: "none", children: [P.jsx("path", { d: `M${c} ${N}V${k}M${s} ${N}H${c}`, stroke: $, strokeWidth: 1.5, strokeDasharray: "3 3", strokeOpacity: 0.65 }), P.jsxs("g", { fill: $, children: [P.jsx("rect", { x: s - 7 - j, y: N - 9, width: j, height: 18, rx: 4 }), I && P.jsx("rect", { x: v - M / 2, y: k + 7, width: M, height: 18, rx: 4 })] }), P.jsxs("g", { fill: "#fff", fontSize: "10", fontWeight: "700", fontFamily: "monospace", textAnchor: "middle", children: [P.jsx("text", { x: s - 7 - j / 2, y: N + 3.5, children: B }), I && P.jsx("text", { x: v, y: k + 19.5, children: I })] })] });
});
function U0(c) {
  const { data: N = [], series: k, x: s, y: T, stacked: L = !0, stackGap: $ = 0, showLegend: B = !0, radius: I = 6, barGap: j = 0.3, showValues: M = !1, title: v, subtitle: O, metric: ee, labelAngle: ne, maxLabelChars: oe, className: Z = "", onBarHover: V, renderTooltip: Pe } = c, ge = xe.useMemo(() => {
    if (ne !== void 0 && ne !== 0) return !0;
    let _ = 0;
    if (Array.isArray(N)) for (const p of N) typeof p == "object" && p !== null && "label" in p && p.label && (_ = Math.max(_, String(p.label).length));
    if (k) for (const p of k) for (const S of p.data || []) typeof S == "object" && S !== null && "label" in S && S.label && (_ = Math.max(_, String(S.label).length));
    return _ > 8;
  }, [ne, N, k]), ie = xe.useMemo(() => {
    var _;
    return ge ? { ...c.padding, bottom: ((_ = c.padding) == null ? void 0 : _.bottom) ?? 50 } : c.padding;
  }, [ge, c.padding]), fe = jh({ ...c, padding: ie }), { color: le, pad: W, width: H, height: Ee, chartWidth: Ne, chartHeight: Re, baselineY: Qe, valueFormatter: Ge, glowId: mn, containerStyle: Ke, containerRef: C, ariaLabel: X, showGrid: re, gridLines: Fe, showXAxis: ze, showYAxis: xn, glow: Dn, crosshair: Jn, animated: d, negativeColor: z, showZeroLine: J } = fe, [G, me] = xe.useState(null), [be, he] = xe.useState(!1);
  xe.useEffect(() => {
    if (!be) return;
    const _ = (p) => {
      C.current && !C.current.contains(p.target) && (he(!1), me(null), V == null || V(null));
    };
    return document.addEventListener("pointerdown", _), () => {
      document.removeEventListener("pointerdown", _);
    };
  }, [be, V, C]);
  const q = xe.useMemo(() => Ah({ data: N, series: k, x: s, y: T, defaultPalette: It }), [N, k, s, T]), te = q.isMultiSeries, A = xe.useMemo(() => q.series && q.series.length > 0 ? q.series.map((_, p) => ({ id: _.id || `bs-${p}`, name: _.name || `Series ${p + 1}`, color: _.color || It[p % It.length], data: _h(_.data) })) : [{ id: "def", name: "Default", color: le, data: _h(q.data) }], [q, le]), Te = xe.useMemo(() => Math.max(0, ...A.map((_) => _.data.length)), [A]), Fn = xe.useMemo(() => A.find((_) => _.data.some((p) => p.label)) || A[0], [A]), an = (_) => {
    var p;
    return ((p = Fn == null ? void 0 : Fn.data[_]) == null ? void 0 : p.label) || `#${_ + 1}`;
  }, { minVal: We, maxVal: Ie, categoryPosTotals: Ze, categoryNegTotals: qn } = xe.useMemo(() => {
    var S;
    if (Te === 0) return { minVal: 0, maxVal: 1, categoryPosTotals: [], categoryNegTotals: [] };
    if (te && L) {
      const F = new Array(Te), U = new Array(Te);
      let D = 0, Y = 0;
      for (let se = 0; se < Te; se++) {
        let ue = 0, ke = 0;
        for (let je = 0; je < A.length; je++) {
          const Ce = ((S = A[je].data[se]) == null ? void 0 : S.value) || 0;
          Ce > 0 ? ue += Ce : Ce < 0 && (ke += Ce);
        }
        F[se] = ue, U[se] = ke, ke < D && (D = ke), ue > Y && (Y = ue);
      }
      return D === Y && (D = D > 0 ? 0 : D - 1, Y = Y === 0 ? 1 : Y + 1), { minVal: D, maxVal: Y, categoryPosTotals: F, categoryNegTotals: U };
    }
    let _ = 0, p = 0;
    for (const F of A) for (const U of F.data) U.value < _ && (_ = U.value), U.value > p && (p = U.value);
    return _ === p && (_ = _ > 0 ? 0 : _ - 1, p = p === 0 ? 1 : p + 1), { minVal: _, maxVal: p, categoryPosTotals: [], categoryNegTotals: [] };
  }, [A, Te, te, L]), un = Math.max(1e-4, Ie - We), nn = We < 0 && Ie > 0 ? W.top + (Ie - 0) / un * Re : We >= 0 ? Qe : W.top, gn = Te > 0 ? Ne / Te : Ne, rn = Math.max(2, gn * (1 - j)), vr = (gn - rn) / 2, _e = xe.useMemo(() => {
    var p, S, F;
    if (Te === 0) return [];
    const _ = [];
    if (te && L) {
      const U = Math.max(0, $);
      for (let D = 0; D < Te; D++) {
        const Y = W.left + D * gn + vr;
        let se = 0, ue = 0, ke = -1, je = -1;
        const Ce = Ze[D] || 0, Je = qn[D] || 0;
        for (let we = 0; we < A.length; we++) {
          const pn = ((p = A[we].data[D]) == null ? void 0 : p.value) || 0;
          pn > 0 ? ke = we : pn < 0 && je === -1 && (je = we);
        }
        for (let we = 0; we < A.length; we++) {
          const pn = A[we], Rn = ((S = pn.data[D]) == null ? void 0 : S.value) || 0;
          if (Rn === 0 && A.length > 1) continue;
          const Pr = Rn < 0, cn = Math.max(Rn !== 0 ? 2 : 0, Math.abs(Rn) / un * Re);
          let $n = nn, zr = "", zn = 0;
          if (Pr) {
            $n = nn + ue;
            const At = we === je;
            if (U > 0) zn = Math.min(I, rn / 2, cn / 2), zr = Tt(Y, $n, rn, cn, zn, !0, !0), ue += cn + U;
            else {
              zn = Math.min(I, rn / 2, cn);
              const oo = !1, Ko = At;
              zr = Tt(Y, $n, rn, cn + (At ? 0 : 0.5), zn, oo, Ko), ue += cn;
            }
          } else {
            const At = we === ke;
            if ($n = nn - se - cn, U > 0) zn = Math.min(I, rn / 2, cn / 2), zr = Tt(Y, $n, rn, cn, zn, !0, !0), se += cn + U;
            else {
              zn = Math.min(I, rn / 2, cn);
              const oo = At;
              zr = Tt(Y, $n, rn, cn + (At ? 0 : 0.5), zn, oo, !1), se += cn;
            }
          }
          const at = Pr ? Math.abs(Je) : Ce, Ot = at > 0 ? (Math.abs(Rn) / at * 100).toFixed(1) : "0", Ha = Pr && z ? z : pn.color;
          _.push({ key: `${pn.id}-${D}`, seriesIdx: we, catIdx: D, x: Y, y: $n, width: rn, height: cn, rx: zn, path: zr, value: Rn, label: an(D), seriesName: pn.name, seriesColor: Ha, stackTotal: at, percent: Ot });
        }
      }
    } else if (te && !L) {
      const U = A.length, D = Math.max(2, rn / U);
      for (let Y = 0; Y < Te; Y++) for (let se = 0; se < U; se++) {
        const ue = A[se], ke = ((F = ue.data[Y]) == null ? void 0 : F.value) || 0, je = ke < 0, Ce = W.left + Y * gn + vr + se * D, Je = Math.max(ke !== 0 ? 2 : 0, Math.abs(ke) / un * Re), we = Math.min(I, D / 2, Je);
        let pn = nn, Rn = "";
        je ? (pn = nn, Rn = Tt(Ce, pn, D, Je, we, !1, !0)) : (pn = nn - Je, Rn = Tt(Ce, pn, D, Je, we, !0, !1));
        const Pr = je && z ? z : ue.color;
        _.push({ key: `${ue.id}-${Y}`, seriesIdx: se, catIdx: Y, x: Ce, y: pn, width: D, height: Je, rx: we, path: Rn, value: ke, label: an(Y), seriesName: ue.name, seriesColor: Pr });
      }
    } else {
      const U = A[0];
      for (let D = 0; D < Te; D++) {
        const Y = U.data[D], se = (Y == null ? void 0 : Y.value) || 0, ue = se < 0, ke = W.left + D * gn + vr, je = Math.max(se !== 0 ? 2 : 0, Math.abs(se) / un * Re), Ce = Math.min(I, rn / 2, je);
        let Je = nn, we = "";
        ue ? (Je = nn, we = Tt(ke, Je, rn, je, Ce, !1, !0)) : (Je = nn - je, we = Tt(ke, Je, rn, je, Ce, !0, !1));
        const pn = ue && z ? z : U.color;
        _.push({ key: `${U.id}-${D}`, seriesIdx: 0, catIdx: D, x: ke, y: Je, width: rn, height: je, rx: Ce, path: we, value: se, label: (Y == null ? void 0 : Y.label) || an(D), seriesName: U.name, seriesColor: pn });
      }
    }
    return _;
  }, [Te, te, L, $, A, Ze, qn, W.left, W.top, gn, vr, rn, Qe, nn, un, Re, I, Fn, z]), yr = xe.useMemo(() => {
    if (!Te) return !1;
    for (let _ = 0; _ < Te; _++) {
      const p = an(_);
      if (p && (p.length * 6.5 > gn * 0.85 || p.length > 8)) return !0;
    }
    return !1;
  }, [Te, gn, Fn]), er = ne !== void 0 ? ne : yr && gn < 90 ? -35 : 0, vn = er !== 0, Rr = oe !== void 0 ? oe : vn ? 14 : Math.max(5, Math.floor(gn * 0.85 / 7)), Ur = xe.useMemo(() => {
    if (!Te) return /* @__PURE__ */ new Set();
    const _ = Math.floor(Ne / (vn ? 26 : 55));
    if (Te <= _) {
      const S = /* @__PURE__ */ new Set();
      for (let F = 0; F < Te; F++) S.add(F);
      return S;
    }
    const p = Math.min(14, Math.max(2, _));
    return Ih(Te, p);
  }, [Te, Ne, vn]), br = d ? { transition: "y 0.45s cubic-bezier(0.4, 0, 0.2, 1), height 0.45s cubic-bezier(0.4, 0, 0.2, 1)" } : void 0, de = xe.useMemo(() => G && _e.find((_) => _.key === G) || null, [G, _e]), jn = (_) => {
    G !== _.key && (me(_.key), V == null || V({ value: _.value, index: _.catIdx, label: _.label, seriesName: _.seriesName }));
  }, ot = () => {
    be || (me(null), V == null || V(null));
  }, Vr = (_) => {
    if (!_.touches || _.touches.length === 0) return;
    const p = _.touches[0], S = _.currentTarget.getBoundingClientRect();
    if (!S.width || !S.height) return;
    const F = p.clientX - S.left, U = p.clientY - S.top, D = W.left + F / S.width * Ne, Y = W.top + U / S.height * Re, se = Math.max(0, Math.min(Te - 1, Math.floor((D - W.left) / gn))), ue = _e.filter((Ce) => Ce.catIdx === se);
    if (!ue.length) return;
    let ke = ue[0], je = 1 / 0;
    for (const Ce of ue) {
      const Je = Ce.y + Ce.height / 2, we = Math.abs(Je - Y);
      we < je && (je = we, ke = Ce);
    }
    he(!0), jn(ke);
  }, Go = (_) => {
    if (!(!Te || !_e.length)) if (_.key === "ArrowRight") {
      _.preventDefault(), he(!0);
      const p = de ? de.catIdx : -1, S = p < Te - 1 ? p + 1 : 0, F = _e.find((U) => U.catIdx === S);
      F && jn(F);
    } else if (_.key === "ArrowLeft") {
      _.preventDefault(), he(!0);
      const p = de ? de.catIdx : -1, S = p > 0 ? p - 1 : Te - 1, F = _e.find((U) => U.catIdx === S);
      F && jn(F);
    } else if (_.key === "Home") {
      _.preventDefault(), he(!0);
      const p = _e.find((S) => S.catIdx === 0);
      p && jn(p);
    } else if (_.key === "End") {
      _.preventDefault(), he(!0);
      const p = _e.find((S) => S.catIdx === Te - 1);
      p && jn(p);
    } else _.key === "Escape" && (_.preventDefault(), he(!1), me(null), V == null || V(null));
  };
  return Te === 0 ? P.jsx(Xu, { height: Ee, className: Z, style: Ke }) : P.jsxs("div", { ref: C, className: `pure-svg-chart-container ${Z}`, style: Ke, children: [P.jsx(Yu, { title: v, subtitle: O, metric: ee, color: le }), te && B && P.jsx("div", { style: { display: "flex", flexWrap: "wrap", gap: 14, marginBottom: 12, fontSize: 12 }, children: A.map((_) => P.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 6 }, children: [P.jsx("span", { style: { width: 12, height: 12, borderRadius: 3, backgroundColor: _.color, display: "inline-block" } }), P.jsx("span", { style: { opacity: 0.9, fontWeight: 600 }, children: _.name })] }, _.id)) }), P.jsxs("div", { style: { position: "relative", width: "100%", touchAction: "pan-y" }, children: [P.jsxs("svg", { viewBox: `0 0 ${H} ${Ee}`, style: Fh, tabIndex: 0, role: "img", "aria-label": X, onKeyDown: Go, onTouchStart: Vr, onTouchMove: Vr, children: [P.jsx("defs", { children: Dn && P.jsx(Gu, { id: mn, color: le }) }), P.jsx($h, { showGrid: re, showYAxis: xn, gridLines: Fe, minVal: We, maxVal: Ie, pad: W, width: H, height: Ee, valueFormatter: Ge, showZeroLine: J, zeroY: nn }), Jn && de && P.jsx(Rh, { x: de.x + de.width / 2, y: de.y, baselineY: nn, padLeft: W.left, padRight: W.right, width: H, color: de.seriesColor || le, valueStr: Ge(de.value), label: de.label }), _e.map((_) => {
    const p = G === _.key;
    return P.jsxs("g", { children: [M && !te && (Te <= 15 || Ur.has(_.catIdx)) && P.jsx("text", { x: _.x + _.width / 2, y: _.value < 0 ? _.y + _.height + 14 : _.y - 6, textAnchor: "middle", fill: "currentColor", fontSize: "11", fontWeight: "700", children: Ge(_.value) }), P.jsx("path", { d: _.path, fill: _.seriesColor, opacity: p ? 1 : 0.88, filter: Dn ? `url(#${mn})` : void 0, style: { ...br, cursor: "pointer" }, onMouseEnter: () => jn(_), onMouseLeave: ot, onTouchStart: (S) => {
      S.stopPropagation(), he(!0), jn(_);
    } }), _.width < 28 && P.jsx("rect", { x: _.x - Math.max(0, (28 - _.width) / 2), y: _.y, width: Math.max(28, _.width), height: _.height, fill: "transparent", style: { cursor: "pointer" }, onMouseEnter: () => jn(_), onMouseLeave: ot, onTouchStart: (S) => {
      S.stopPropagation(), he(!0), jn(_);
    } })] }, _.key);
  }), ze && Array.from(Ur).map((_) => {
    const p = an(_), S = p.length > Rr ? p.slice(0, Math.max(1, Rr - 1)).trimEnd() + "…" : p, F = W.left + _ * gn + gn / 2, U = vn ? F - 4 : F, D = vn ? Qe + 12 : Qe + 18;
    return P.jsxs("text", { x: U, y: D, textAnchor: vn ? "end" : "middle", transform: vn ? `rotate(${er}, ${U}, ${D})` : void 0, fill: "currentColor", opacity: 0.65, fontSize: "11", fontWeight: "500", children: [P.jsx("title", { children: p }), S] }, _);
  }), de && !M && !Pe && (() => {
    const _ = de.x + de.width / 2, p = de.y, S = de.label ? `${de.label}: ` : "", F = de.percent ? ` (${de.percent}%)` : "", U = `${te ? `${de.seriesName} — ` : ""}${S}${Ge(de.value)}${F}`, D = Math.max(40, U.length * 7 + 16), Y = Math.max(W.left + D / 2, Math.min(H - W.right - D / 2, _)), se = p - 10;
    return P.jsxs("g", { pointerEvents: "none", children: [P.jsx("rect", { x: Y - D / 2, y: se - 16, width: D, height: 20, rx: 5, fill: "#0f172a", stroke: de.seriesColor || le, strokeWidth: 1 }), P.jsx("text", { x: Y, y: se - 2, textAnchor: "middle", fill: "#fff", fontSize: "11", fontWeight: "700", fontFamily: "monospace", children: U })] });
  })()] }), de && !M && Pe && P.jsx("div", { "data-testid": "custom-tooltip", style: { position: "absolute", left: `${(de.x + de.width / 2) / H * 100}%`, top: `${de.y / Ee * 100}%`, transform: "translate(-50%, -100%)", pointerEvents: "none", zIndex: 10, whiteSpace: "nowrap" }, children: Pe({ item: { value: de.value, index: de.catIdx, label: de.label, seriesName: de.seriesName, seriesColor: de.seriesColor, percent: de.percent }, formattedValue: Ge(de.value) }) }), P.jsx("div", { style: Dh, "aria-live": "polite", "aria-atomic": "true", children: de ? `${te ? `${de.seriesName} — ` : ""}${de.label ? `${de.label}: ` : ""}${Ge(de.value)}${de.percent ? ` (${de.percent}%)` : ""}` : "" })] })] });
}
function V0(c, N) {
  const k = c.length;
  if (N >= k || N <= 2 || k <= 2) return c;
  const s = new Array(N);
  let T = 0;
  const L = (k - 2) / (N - 2);
  let $ = 0;
  s[T++] = c[$];
  for (let B = 0; B < N - 2; B++) {
    let I = 0, j = 0;
    const M = Math.floor((B + 1) * L) + 1, v = Math.min(Math.floor((B + 2) * L) + 1, k), O = v - M;
    for (let ie = M; ie < v; ie++) {
      const fe = c[ie], le = typeof fe == "number" ? fe : fe.value;
      I += ie, j += Number.isFinite(le) ? le : 0;
    }
    O > 0 && (I /= O, j /= O);
    const ee = c[$], ne = $, oe = typeof ee == "number" ? ee : ee.value, Z = Math.floor(B * L) + 1, V = Math.min(Math.floor((B + 1) * L) + 1, k);
    let Pe = -1, ge = Z;
    for (let ie = Z; ie < V; ie++) {
      const fe = c[ie], le = typeof fe == "number" ? fe : fe.value, W = Number.isFinite(le) ? le : 0, H = Math.abs((ne - I) * (W - oe) - (ne - ie) * (j - oe));
      H > Pe && (Pe = H, ge = ie);
    }
    s[T++] = c[ge], $ = ge;
  }
  return s[T] = c[k - 1], s;
}
function Lh(c, N) {
  if (!N.length) return null;
  if (typeof c == "number" && c >= 0 && c < N.length) return N[c].x;
  const k = String(c), s = N.find((L) => L.label === k);
  if (s) return s.x;
  const T = new Date(c).getTime();
  if (!isNaN(T)) {
    let L = N[0], $ = 1 / 0;
    for (const B of N) if (B.label) {
      const I = new Date(B.label).getTime();
      if (!isNaN(I)) {
        const j = Math.abs(I - T);
        j < $ && ($ = j, L = B);
      }
    }
    return L.x;
  }
  return null;
}
function W0(c) {
  var _;
  const { data: N, series: k, x: s, y: T, curvature: L = 0.25, dots: $, showDots: B, dotRadius: I, showValues: j = !1, title: M, subtitle: v, metric: O, showLegend: ee = !0, stacked: ne = !1, maxDisplayPoints: oe = 300, className: Z = "", onPointHover: V, renderTooltip: Pe, zones: ge } = c, ie = $ ?? (B !== void 0 ? B ? "always" : "none" : "hover"), fe = jh(c), { preset: le, color: W, pad: H, width: Ee, height: Ne, chartWidth: Re, chartHeight: Qe, baselineY: Ge, valueFormatter: mn, uid: Ke, glowId: C, containerStyle: X, containerRef: re, ariaLabel: Fe, showGrid: ze, gridLines: xn, showXAxis: Dn, showYAxis: Jn, glow: d, crosshair: z, animated: J, showZeroLine: G } = fe, me = c.smooth ?? le.smooth, be = c.strokeWidth ?? le.strokeWidth, he = c.strokeDasharray ?? le.strokeDasharray, q = c.fillGradient ?? le.fillGradient, te = c.gradientStartOpacity ?? le.gradientStartOpacity, [A, Te] = xe.useState(null), [Fn, an] = xe.useState(!1);
  xe.useEffect(() => {
    if (!Fn) return;
    const p = (S) => {
      re.current && !re.current.contains(S.target) && (an(!1), Te(null), V == null || V(null));
    };
    return document.addEventListener("pointerdown", p), () => {
      document.removeEventListener("pointerdown", p);
    };
  }, [Fn, V, re]);
  const We = xe.useMemo(() => Ah({ data: N, series: k, x: s, y: T, colors: c.colors, defaultPalette: It }), [N, k, s, T, c.colors]), Ie = xe.useMemo(() => We.series && We.series.length > 0 ? We.series.map((p, S) => ({ id: p.id || `s-${S}`, name: p.name || `Series ${S + 1}`, data: p.data || [], color: p.color || It[S % It.length], strokeWidth: p.strokeWidth ?? be, strokeDasharray: p.strokeDasharray ?? he, fillGradient: p.fillGradient ?? ((ne || S === 0) && q) })) : [{ id: "def", name: "Default", data: We.data || [], color: W, strokeWidth: be, strokeDasharray: he, fillGradient: q }], [We, W, be, he, q, ne]), Ze = We.isMultiSeries, qn = xe.useMemo(() => {
    if (!Ze || !ne) return Ie.map((F) => ({ ...F, dataWithOrig: F.data }));
    const p = Math.max(0, ...Ie.map((F) => F.data.length)), S = new Array(p).fill(0);
    return Ie.map((F) => {
      const U = F.data.map((D, Y) => {
        const se = Math.max(0, typeof D == "number" ? D : D.value);
        return S[Y] = (S[Y] || 0) + se, { value: S[Y], origValue: se, label: typeof D == "object" ? D.label : void 0 };
      });
      return { ...F, dataWithOrig: U };
    });
  }, [Ie, Ze, ne]), { minVal: un, maxVal: nn } = xe.useMemo(() => {
    let p = 1 / 0, S = -1 / 0;
    for (const F of qn) for (const U of F.dataWithOrig) {
      const D = typeof U == "number" ? U : U.value;
      Number.isFinite(D) && (D < p && (p = D), D > S && (S = D));
    }
    return ne && Ze && (p = Math.min(0, p)), p === 1 / 0 ? { minVal: 0, maxVal: 1 } : (p === S && (p = p > 0 ? 0 : p - 1, S = S === 0 ? 1 : S + 1), { minVal: p, maxVal: S });
  }, [qn, ne, Ze]), gn = Math.max(1e-4, nn - un), rn = un < 0 && nn > 0 ? H.top + (nn - 0) / gn * Qe : un >= 0 ? Ge : H.top, vr = un < 0 && nn > 0 || nn <= 0 ? rn : Ge, _e = xe.useMemo(() => {
    var S;
    const p = [];
    for (let F = 0; F < qn.length; F++) {
      const U = qn[F], D = oe && oe > 2 && U.dataWithOrig.length > oe ? V0(U.dataWithOrig, oe) : U.dataWithOrig, { points: Y } = Th(D, Ee, Ne, H, un, nn);
      if (ne && Ze) for (let ke = 0; ke < Y.length; ke++) Y[ke].originalValue = ((S = D[ke]) == null ? void 0 : S.origValue) ?? Y[ke].value;
      const se = gl(Y, me, L);
      let ue = "";
      U.fillGradient && (ne && Ze && F > 0 ? ue = F0(Y, p[F - 1].points, me, L, se) : ue = Oh(Y, vr, me, L, se)), p.push({ ...U, points: Y, linePath: se, areaPath: ue, gradId: `gr-${Ke}-${F}` });
    }
    return p;
  }, [qn, Ee, Ne, H, vr, un, nn, me, L, Ke, oe, ne, Ze]), yr = Math.max(0, ..._e.map((p) => p.points.length)), er = I ?? (yr > 50 ? 2.5 : yr > 25 ? 3 : 4), vn = c.labelFormatter || ((p) => p), Rr = xe.useMemo(() => {
    var se;
    const p = _e.find((ue) => ue.points.some((ke) => ke.label)) || _e[0];
    if (!p || !p.points.length) return [];
    const S = [];
    for (let ue = 0; ue < p.points.length; ue++) {
      const ke = p.points[ue];
      ke.label && S.push(ke);
    }
    if (!S.length) return [];
    const F = (se = S[0]) != null && se.label ? vn(S[0].label) : "", U = Math.max(45, F.length * 7 + 20), D = Math.min(8, Math.max(2, Math.floor(Re / U))), Y = Ih(S.length, D);
    return Array.from(Y).map((ue) => ({ x: S[ue].x, label: S[ue].label, formattedLabel: S[ue].label ? vn(S[ue].label) : "" }));
  }, [_e, Re, vn]), Ur = J ? { transition: "d 0.45s cubic-bezier(0.4, 0, 0.2, 1), stroke 0.3s, fill 0.3s" } : void 0, br = (p, S, F, U) => {
    const D = { ...p, seriesName: S, seriesColor: F, index: U };
    Te(D), V == null || V(D);
  }, de = () => {
    Fn || (Te(null), V == null || V(null));
  }, jn = (p, S) => {
    let F = null, U, D = 1 / 0, Y, se;
    for (const ue of _e) {
      if (!ue.points.length) continue;
      let ke = 0, je = ue.points.length - 1;
      for (; ke <= je; ) {
        const $n = ke + je >> 1;
        ue.points[$n].x < p ? ke = $n + 1 : je = $n - 1;
      }
      const Ce = Math.max(0, Math.min(ue.points.length - 1, ke)), Je = Math.max(0, Ce - 1), we = Math.abs(ue.points[Je].x - p) < Math.abs(ue.points[Ce].x - p) ? Je : Ce, pn = ue.points[we], Rn = pn.x - p, Pr = pn.y - S, cn = Rn * Rn + Pr * Pr;
      cn < D && (D = cn, F = pn, U = we, Y = ue.name, se = ue.color);
    }
    if (F) {
      if (A && A.x === F.x && A.y === F.y && A.seriesName === Y) return;
      br(F, Y, se, U);
    }
  }, ot = (p) => {
    const S = p.currentTarget.getBoundingClientRect();
    if (!S.width || !S.height) return;
    const F = p.clientX - S.left, U = p.clientY - S.top, D = H.left + F / S.width * Re, Y = H.top + U / S.height * (Ge - H.top);
    jn(D, Y);
  }, Vr = (p) => {
    if (!p.touches || p.touches.length === 0) return;
    const S = p.touches[0], F = p.currentTarget.getBoundingClientRect();
    if (!F.width || !F.height) return;
    const U = S.clientX - F.left, D = S.clientY - F.top, Y = H.left + U / F.width * Re, se = H.top + D / F.height * (Ge - H.top);
    an(!0), jn(Y, se);
  }, Go = (p) => {
    var F;
    const S = ((F = _e[0]) == null ? void 0 : F.points) || [];
    if (S.length) if (p.key === "ArrowRight") {
      p.preventDefault(), an(!0);
      const U = A ? S.findIndex((se) => se.x === A.x && se.y === A.y) : -1, D = U < S.length - 1 ? U + 1 : 0, Y = S[D];
      br(Y, _e[0].name, _e[0].color, D);
    } else if (p.key === "ArrowLeft") {
      p.preventDefault(), an(!0);
      const U = A ? S.findIndex((se) => se.x === A.x && se.y === A.y) : -1, D = U > 0 ? U - 1 : S.length - 1, Y = S[D];
      br(Y, _e[0].name, _e[0].color, D);
    } else p.key === "Home" ? (p.preventDefault(), an(!0), br(S[0], _e[0].name, _e[0].color, 0)) : p.key === "End" ? (p.preventDefault(), an(!0), br(S[S.length - 1], _e[0].name, _e[0].color, S.length - 1)) : p.key === "Escape" && (p.preventDefault(), an(!1), Te(null), V == null || V(null));
  };
  return yr ? P.jsxs("div", { ref: re, className: `pure-svg-chart-container ${Z}`, style: X, children: [P.jsx(Yu, { title: M, subtitle: v, metric: O, color: W, marginBottom: Ze && ee ? 8 : 14 }), Ze && ee && P.jsx("div", { style: { display: "flex", flexWrap: "wrap", gap: 14, marginBottom: 12, fontSize: 12 }, children: _e.map((p) => P.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 6 }, children: [P.jsx("span", { style: { width: 12, height: 3, borderRadius: 2, backgroundColor: p.color, display: "inline-block" } }), P.jsx("span", { style: { opacity: 0.9, fontWeight: 600 }, children: p.name })] }, p.id)) }), P.jsxs("div", { style: { position: "relative", width: "100%", touchAction: "pan-y" }, children: [P.jsxs("svg", { viewBox: `0 0 ${Ee} ${Ne}`, style: Fh, tabIndex: 0, role: "img", "aria-label": Fe, onKeyDown: Go, children: [P.jsxs("defs", { children: [_e.map((p) => p.fillGradient ? P.jsxs("linearGradient", { id: p.gradId, x1: "0", y1: "0", x2: "0", y2: "1", children: [P.jsx("stop", { offset: "0%", stopColor: p.color, stopOpacity: te }), P.jsx("stop", { offset: "100%", stopColor: p.color, stopOpacity: 0 })] }, p.gradId) : null), d && P.jsx(Gu, { id: C, color: W })] }), ge && ge.length > 0 && P.jsx("g", { className: "chart-zones", pointerEvents: "none", children: ge.map((p, S) => {
    var je;
    const F = ((je = _e[0]) == null ? void 0 : je.points) || [];
    if (!F.length) return null;
    const U = Lh(p.startX, F), D = Lh(p.endX, F);
    if (U === null || D === null) return null;
    const Y = Math.min(U, D), se = Math.max(U, D), ue = Math.max(2, se - Y), ke = Math.max(0, Ge - H.top);
    return P.jsxs("g", { children: [P.jsx("rect", { "data-testid": "chart-zone", x: Y, y: H.top, width: ue, height: ke, fill: p.color || "rgba(59, 130, 246, 0.08)", rx: 2 }), p.label && P.jsx("text", { "data-testid": "chart-zone-label", x: Y + ue / 2, y: p.labelPosition === "bottom" ? Ge - 8 : H.top + 14, textAnchor: "middle", fill: "currentColor", opacity: 0.65, fontSize: "10", fontWeight: "600", children: p.label })] }, p.id || `zone-${S}`);
  }) }), P.jsx($h, { showGrid: ze, showYAxis: Jn, gridLines: xn, minVal: un, maxVal: nn, pad: H, width: Ee, height: Ne, valueFormatter: mn, showZeroLine: G, zeroY: rn }), _e.map((p) => p.fillGradient && p.areaPath ? P.jsx("path", { d: p.areaPath, fill: `url(#${p.gradId})`, style: Ur, pointerEvents: "none" }, `a-${p.id}`) : null), _e.map((p) => P.jsx("path", { d: p.linePath, fill: "none", stroke: p.color, strokeWidth: p.strokeWidth, strokeDasharray: p.strokeDasharray, strokeLinecap: "round", strokeLinejoin: "round", filter: d ? `url(#${C})` : void 0, style: Ur, pointerEvents: "none" }, `l-${p.id}`)), z && A && P.jsx(Rh, { x: A.x, y: A.y, baselineY: Ge, padLeft: H.left, padRight: H.right, width: Ee, color: A.seriesColor || W, valueStr: mn(A.originalValue !== void 0 ? A.originalValue : A.value), label: A.label }), j && !Ze && ((_ = _e[0]) == null ? void 0 : _.points.map((p, S) => yr <= 25 || S % Math.ceil(yr / 12) === 0 ? P.jsx("text", { x: p.x, y: p.value < 0 ? p.y + er + 14 : p.y - (er + 6), textAnchor: "middle", fill: "currentColor", fontSize: "11", fontWeight: "700", pointerEvents: "none", children: mn(p.value) }, `val-${S}`) : null)), ie === "always" && _e.map((p) => p.points.map((S, F) => {
    const U = (A == null ? void 0 : A.x) === S.x && (A == null ? void 0 : A.y) === S.y;
    return P.jsxs("g", { children: [P.jsx("circle", { cx: S.x, cy: S.y, r: U ? er * 1.5 : er, fill: U ? "#fff" : p.color, stroke: p.color, strokeWidth: U ? 3 : 2, style: { cursor: "pointer", transition: J ? "all 0.2s" : void 0 }, pointerEvents: "none" }), P.jsx("circle", { cx: S.x, cy: S.y, r: Math.max(16, er * 2.5), fill: "transparent", style: { cursor: "pointer" }, onMouseEnter: () => br(S, p.name, p.color, F), onMouseLeave: de, onTouchStart: (D) => {
      D.stopPropagation(), an(!0), br(S, p.name, p.color, F);
    } })] }, `${p.id}-${F}`);
  })), ie === "hover" && A && P.jsx("circle", { "data-testid": "active-hover-dot", cx: A.x, cy: A.y, r: er * 1.5, fill: "#fff", stroke: A.seriesColor || W, strokeWidth: 3, pointerEvents: "none" }), P.jsx("rect", { x: H.left, y: H.top, width: Re, height: Math.max(0, Ge - H.top), fill: "transparent", style: { cursor: "crosshair" }, onMouseMove: ot, onMouseLeave: de, onTouchStart: Vr, onTouchMove: Vr }), Dn && Rr.map((p, S) => P.jsx("text", { x: p.x, y: Ge + 18, textAnchor: S === 0 ? "start" : S === Rr.length - 1 ? "end" : "middle", fill: "currentColor", opacity: 0.65, fontSize: "11", fontWeight: "500", children: p.formattedLabel }, S)), A && !j && !Pe && (() => {
    const p = A.originalValue !== void 0 ? A.originalValue : A.value, S = (A.seriesName && Ze ? `${A.seriesName}: ` : "") + (A.label ? `${A.label} — ` : "") + mn(p), F = Math.max(40, S.length * 7 + 16), U = Math.max(H.left + F / 2, Math.min(Ee - H.right - F / 2, A.x)), D = A.y - er - 8;
    return P.jsxs("g", { pointerEvents: "none", children: [P.jsx("rect", { x: U - F / 2, y: D - 16, width: F, height: 20, rx: 5, fill: "#0f172a", stroke: A.seriesColor || "#334155", strokeWidth: 1 }), P.jsx("text", { x: U, y: D - 2, textAnchor: "middle", fill: "#fff", fontSize: "11", fontWeight: "700", fontFamily: "monospace", children: S })] });
  })()] }), A && !j && Pe && P.jsx("div", { "data-testid": "custom-tooltip", style: { position: "absolute", left: `${A.x / Ee * 100}%`, top: `${A.y / Ne * 100}%`, transform: "translate(-50%, -100%)", pointerEvents: "none", zIndex: 10, whiteSpace: "nowrap" }, children: Pe({ point: A, seriesName: A.seriesName, seriesColor: A.seriesColor, value: A.originalValue !== void 0 ? A.originalValue : A.value, formattedValue: mn(A.originalValue !== void 0 ? A.originalValue : A.value), allSeriesPoints: Ze ? _e.map((p) => {
    const S = A.index !== void 0 && A.index >= 0 && A.index < p.points.length ? p.points[A.index] : p.points.find((U) => U.x === A.x), F = (S == null ? void 0 : S.originalValue) !== void 0 ? S.originalValue : S ? S.value : 0;
    return { seriesName: p.name, seriesColor: p.color, value: F, formattedValue: mn(F) };
  }) : void 0 }) }), P.jsx("div", { style: Dh, "aria-live": "polite", "aria-atomic": "true", children: A ? `${A.seriesName && Ze ? `${A.seriesName}: ` : ""}${A.label ? `${A.label}, ` : ""}${mn(A.originalValue !== void 0 ? A.originalValue : A.value)}` : "" })] })] }) : P.jsx(Xu, { height: Ne, className: Z, style: X });
}
const B0 = ({ variant: c = "default", data: N = [], size: k = 240, innerRadiusRatio: s = 0.68, title: T, subtitle: L, metric: $, centerLabel: B, centerValue: I, showLegend: j = !0, animated: M = !0, valueFormatter: v = (Z) => String(Math.round(Z)), className: O = "", card: ee = !0, style: ne, onSliceHover: oe }) => {
  var Ke;
  const Z = hl[c] || hl.default, [V, Pe] = xe.useState(null), ge = `d-gl-${xe.useId().replace(/:/g, "-")}`, ie = xe.useMemo(() => N.map((C, X) => ({ label: C.label || `Slice ${X + 1}`, value: Number.isFinite(C.value) && C.value > 0 ? C.value : 0, color: C.color || It[X % It.length] })).filter((C) => C.value > 0), [N]), fe = xe.useMemo(() => ie.reduce((C, X) => C + X.value, 0), [ie]), le = k / 2 * Math.max(0.1, 1 - Math.min(0.9, s)), W = (k - le) / 2, H = 2 * Math.PI * W, Ee = xe.useMemo(() => {
    if (!fe) return [];
    let C = 0;
    const X = ie.length > 1 ? Math.max(2, le * 0.1) : 0;
    return ie.map((re, Fe) => {
      const ze = re.value / fe * H, xn = Math.max(0, ze - X), Dn = `${xn} ${H - xn}`, Jn = -C;
      return C += ze, { ...re, index: Fe, strokeDasharray: Dn, strokeDashoffset: Jn, percentage: (re.value / fe * 100).toFixed(1) };
    });
  }, [ie, fe, H, le]), Ne = (C) => {
    V !== C && (Pe(C), oe == null || oe(C !== null ? ie[C] : null));
  }, Re = { position: "relative", boxSizing: "border-box", width: "100%", ...ee !== !1 ? Z.containerStyle : { borderRadius: 0, padding: 0, background: "transparent", border: "none", boxShadow: "none", color: ((Ke = Z.containerStyle) == null ? void 0 : Ke.color) || "currentColor" }, ...ne };
  if (!ie.length || !fe) return P.jsx(Xu, { height: k, className: O, style: Re });
  const Qe = V !== null ? Ee[V] : null, Ge = Qe ? v(Qe.value) : I !== void 0 ? I : v(fe), mn = Qe ? `${Qe.label} (${Qe.percentage}%)` : B || "Total";
  return P.jsxs("div", { className: `pure-svg-chart-container ${O}`, style: Re, children: [P.jsx(Yu, { title: T, subtitle: L, metric: $, color: Z.color }), P.jsxs("div", { style: { display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: 20 }, children: [P.jsx("div", { style: { position: "relative", width: k, height: k, flexShrink: 0 }, children: P.jsxs("svg", { viewBox: `0 0 ${k} ${k}`, style: { width: "100%", height: "100%", overflow: "visible" }, children: [P.jsx("defs", { children: P.jsx(Gu, { id: ge, color: Z.color }) }), P.jsxs("g", { style: { transform: "rotate(-90deg)", transformOrigin: "center" }, children: [P.jsx("circle", { cx: k / 2, cy: k / 2, r: W, fill: "none", stroke: "currentColor", strokeOpacity: 0.08, strokeWidth: le }), Ee.map((C) => {
    const X = V === C.index;
    return P.jsx("circle", { cx: k / 2, cy: k / 2, r: W, fill: "none", stroke: C.color, strokeWidth: X ? le + 4 : le, strokeDasharray: C.strokeDasharray, strokeDashoffset: C.strokeDashoffset, filter: X ? `url(#${ge})` : void 0, style: { cursor: "pointer", opacity: V === null || X ? 1 : 0.45, transition: M ? "stroke-width 0.25s, opacity 0.25s" : void 0 }, onMouseEnter: () => Ne(C.index), onMouseLeave: () => Ne(null) }, C.index);
  })] }), P.jsx("text", { x: k / 2, y: k / 2 - 2, textAnchor: "middle", fill: Qe ? Qe.color : "currentColor", fontSize: k > 200 ? 20 : 16, fontWeight: "800", children: Ge }), P.jsx("text", { x: k / 2, y: k / 2 + 14, textAnchor: "middle", fill: "currentColor", opacity: 0.7, fontSize: 10, fontWeight: "600", letterSpacing: "0.04em", children: mn })] }) }), j && P.jsx("div", { style: { display: "flex", flexDirection: "column", gap: 8, fontSize: 12, minWidth: 130 }, children: Ee.map((C) => P.jsxs("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, cursor: "pointer", opacity: V === null || V === C.index ? 1 : 0.45, fontWeight: V === C.index ? 700 : 500 }, onMouseEnter: () => Ne(C.index), onMouseLeave: () => Ne(null), children: [P.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 8 }, children: [P.jsx("span", { style: { width: 8, height: 8, borderRadius: "50%", backgroundColor: C.color, display: "inline-block" } }), P.jsx("span", { children: C.label })] }), P.jsxs("span", { style: { fontFamily: "monospace", opacity: 0.85 }, children: [C.percentage, "%"] })] }, C.index)) })] })] });
}, H0 = { top: 3, right: 3, bottom: 3, left: 3 }, q0 = ({ data: c = [], width: N = 120, height: k = 34, color: s = "#6366f1", strokeWidth: T = 2, smooth: L = !0, fillArea: $ = !0, fillOpacity: B = 0.15, showEndDot: I = !0, className: j = "", style: M }) => {
  const v = `sp-${xe.useId().replace(/:/g, "-")}`, { points: O } = Th(c, N, k, H0);
  if (!O.length) return null;
  const ee = gl(O, L, 0.25), ne = $ ? Oh(O, k - 3, L, 0.25, ee) : "", oe = O[O.length - 1];
  return P.jsxs("svg", { viewBox: `0 0 ${N} ${k}`, className: `pure-svg-sparkline ${j}`, style: { width: N, height: k, display: "inline-block", verticalAlign: "middle", overflow: "visible", ...M }, children: [$ && P.jsx("defs", { children: P.jsxs("linearGradient", { id: v, x1: "0", y1: "0", x2: "0", y2: "1", children: [P.jsx("stop", { offset: "0%", stopColor: s, stopOpacity: B }), P.jsx("stop", { offset: "100%", stopColor: s, stopOpacity: 0 })] }) }), $ && ne && P.jsx("path", { d: ne, fill: `url(#${v})`, pointerEvents: "none" }), P.jsx("path", { d: ee, fill: "none", stroke: s, strokeWidth: T, strokeLinecap: "round", strokeLinejoin: "round" }), I && P.jsxs("g", { fill: s, children: [P.jsx("circle", { cx: oe.x, cy: oe.y, r: T * 2.2, opacity: 0.3 }), P.jsx("circle", { cx: oe.x, cy: oe.y, r: T })] })] });
};
async function Y0(c, N = "png", k = "chart", s) {
  var Pe;
  if (typeof window > "u" || typeof document > "u") throw new Error("exportChartAsImage can only be executed in a browser environment with DOM access.");
  const T = c && "current" in c ? c.current : c;
  if (!T) throw new Error("exportChartAsImage: provided target element or ref is null or undefined.");
  const L = T instanceof SVGSVGElement ? T : T.querySelector("svg");
  if (!L) throw new Error("exportChartAsImage: no <svg> element found inside the provided target.");
  const $ = L.cloneNode(!0);
  $.setAttribute("xmlns", "http://www.w3.org/2000/svg"), $.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
  const B = (Pe = L.viewBox) == null ? void 0 : Pe.baseVal, I = L.getBoundingClientRect(), j = B != null && B.width && B.width > 0 ? B.width : I.width || 500, M = B != null && B.height && B.height > 0 ? B.height : I.height || 220;
  $.setAttribute("width", String(j)), $.setAttribute("height", String(M));
  const v = window.getComputedStyle(L).color || "#cbd5e1";
  $.style.color = v;
  const O = new XMLSerializer().serializeToString($);
  if (N === "svg") {
    const ge = new Blob([O], { type: "image/svg+xml;charset=utf-8" });
    Mh(ge, `${k}.svg`);
    return;
  }
  const ee = s != null && s.scale && s.scale > 0 ? s.scale : 2, ne = document.createElement("canvas");
  ne.width = Math.round(j * ee), ne.height = Math.round(M * ee);
  const oe = ne.getContext("2d");
  if (!oe) throw new Error("exportChartAsImage: failed to create 2D canvas context.");
  s != null && s.background && (oe.fillStyle = s.background, oe.fillRect(0, 0, ne.width, ne.height));
  const Z = new Blob([O], { type: "image/svg+xml;charset=utf-8" }), V = URL.createObjectURL(Z);
  return await new Promise((ge, ie) => {
    const fe = new Image();
    fe.onload = () => {
      oe.drawImage(fe, 0, 0, ne.width, ne.height), URL.revokeObjectURL(V), ge();
    }, fe.onerror = (le) => {
      URL.revokeObjectURL(V), ie(new Error(`exportChartAsImage: failed to load SVG into image: ${le}`));
    }, fe.src = V;
  }), new Promise((ge, ie) => {
    ne.toBlob((fe) => {
      if (!fe) {
        ie(new Error("exportChartAsImage: canvas toBlob conversion returned null."));
        return;
      }
      Mh(fe, `${k}.png`), ge();
    }, "image/png");
  });
}
function Mh(c, N) {
  const k = URL.createObjectURL(c), s = document.createElement("a");
  s.href = k, s.download = N, document.body.appendChild(s), s.click(), document.body.removeChild(s), setTimeout(() => URL.revokeObjectURL(k), 1e3);
}
const ml = /* @__PURE__ */ new WeakMap();
function Q0(c) {
  let N = ml.get(c);
  return N || (N = O0.createRoot(c), ml.set(c, N)), N;
}
function vl(c, N) {
  Q0(c).render(N);
}
function X0(c) {
  const N = ml.get(c);
  N && (N.unmount(), ml.delete(c));
}
function G0(c, N) {
  vl(c, xe.createElement(U0, N));
}
function K0(c, N) {
  vl(c, xe.createElement(W0, N));
}
function Z0(c, N) {
  vl(c, xe.createElement(B0, N));
}
function J0(c, N) {
  vl(c, xe.createElement(q0, N));
}
const ev = xe.createElement;
export {
  hl as CHART_VARIANTS,
  Xo as React,
  U0 as SvgBarChart,
  Rh as SvgCrosshair,
  B0 as SvgDonutChart,
  W0 as SvgLineChart,
  q0 as SvgSparkline,
  ev as createElement,
  Y0 as exportChartAsImage,
  Q0 as getOrCreateRoot,
  vl as mountChart,
  G0 as renderBarChart,
  Z0 as renderDonutChart,
  K0 as renderLineChart,
  J0 as renderSparkline,
  X0 as unmountChart
};
