import { O as zn, r as zt, P as ke, a2 as Tt, a3 as fr, d as tr, I as er, a4 as cr, J as Dn, a5 as hr, a6 as Zn, H as dr, b as Qt, e as Rt, g as Ht, B as Wn, j as Bn, t as vr, w as pr, f as yr, a7 as gr, k as mr, o as Xt } from "./index.36e40b88.js";
import { u as br } from "./useToast.c5620082.js";
const _r = zn`
  query SystemSettings {
    systemSettings {
      id
      sendSuccessfulPurchaseEmail
      textBottomIndexPage
    }
  }
`, Or = zn`
  mutation UpdateSystemSettings($input: UpdateSystemSettingsInput!) {
    updateSystemSettings(input: $input) {
      id
      sendSuccessfulPurchaseEmail
      textBottomIndexPage
    }
  }
`, Er = zn`
  mutation ClearSystemCache {
    clearSystemCache
  }
`, Ar = (R) => {
  const U = zt(null), m = zt(!1), d = zt(!1), f = zt(!1), E = zt("");
  async function b() {
    m.value = !0, f.value = !1;
    try {
      const { data: y } = await R.query({
        query: _r,
        fetchPolicy: "network-only"
      });
      U.value = y.systemSettings;
    } catch {
      f.value = !0, E.value = "Failed to load system settings";
    } finally {
      m.value = !1;
    }
  }
  async function _(y, h) {
    d.value = !0, f.value = !1;
    try {
      const { data: o } = await R.mutate({
        mutation: Or,
        variables: { input: { sendSuccessfulPurchaseEmail: y, textBottomIndexPage: h } }
      });
      return o != null && o.updateSystemSettings && (U.value = o.updateSystemSettings), !0;
    } catch {
      return f.value = !0, E.value = "Failed to update settings", !1;
    } finally {
      d.value = !1;
    }
  }
  async function g() {
    d.value = !0, f.value = !1;
    try {
      const { data: y } = await R.mutate({
        mutation: Er
      });
      return !!(y != null && y.clearSystemCache);
    } catch {
      return f.value = !0, E.value = "Failed to clear cache", !1;
    } finally {
      d.value = !1;
    }
  }
  return {
    settings: ke(U),
    isLoading: ke(m),
    isSaving: ke(d),
    hasError: ke(f),
    errorMessage: ke(E),
    fetchSettings: b,
    updateSettings: _,
    clearCache: g
  };
};
var nr = { exports: {} };
/*!
 * Quill Editor v1.3.7
 * https://quilljs.com/
 * Copyright (c) 2014, Jason Chen
 * Copyright (c) 2013, salesforce.com
 */
(function(R, U) {
  (function(d, f) {
    R.exports = f();
  })(typeof self < "u" ? self : Tt, function() {
    return function(m) {
      var d = {};
      function f(E) {
        if (d[E])
          return d[E].exports;
        var b = d[E] = {
          i: E,
          l: !1,
          exports: {}
        };
        return m[E].call(b.exports, b, b.exports, f), b.l = !0, b.exports;
      }
      return f.m = m, f.c = d, f.d = function(E, b, _) {
        f.o(E, b) || Object.defineProperty(E, b, {
          configurable: !1,
          enumerable: !0,
          get: _
        });
      }, f.n = function(E) {
        var b = E && E.__esModule ? function() {
          return E.default;
        } : function() {
          return E;
        };
        return f.d(b, "a", b), b;
      }, f.o = function(E, b) {
        return Object.prototype.hasOwnProperty.call(E, b);
      }, f.p = "", f(f.s = 109);
    }([
      function(m, d, f) {
        Object.defineProperty(d, "__esModule", { value: !0 });
        var E = f(17), b = f(18), _ = f(19), g = f(45), y = f(46), h = f(47), o = f(48), t = f(49), e = f(12), s = f(32), l = f(33), u = f(31), r = f(1), i = {
          Scope: r.Scope,
          create: r.create,
          find: r.find,
          query: r.query,
          register: r.register,
          Container: E.default,
          Format: b.default,
          Leaf: _.default,
          Embed: o.default,
          Scroll: g.default,
          Block: h.default,
          Inline: y.default,
          Text: t.default,
          Attributor: {
            Attribute: e.default,
            Class: s.default,
            Style: l.default,
            Store: u.default
          }
        };
        d.default = i;
      },
      function(m, d, f) {
        var E = this && this.__extends || function() {
          var u = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(r, i) {
            r.__proto__ = i;
          } || function(r, i) {
            for (var c in i)
              i.hasOwnProperty(c) && (r[c] = i[c]);
          };
          return function(r, i) {
            u(r, i);
            function c() {
              this.constructor = r;
            }
            r.prototype = i === null ? Object.create(i) : (c.prototype = i.prototype, new c());
          };
        }();
        Object.defineProperty(d, "__esModule", { value: !0 });
        var b = function(u) {
          E(r, u);
          function r(i) {
            var c = this;
            return i = "[Parchment] " + i, c = u.call(this, i) || this, c.message = i, c.name = c.constructor.name, c;
          }
          return r;
        }(Error);
        d.ParchmentError = b;
        var _ = {}, g = {}, y = {}, h = {};
        d.DATA_KEY = "__blot";
        var o;
        (function(u) {
          u[u.TYPE = 3] = "TYPE", u[u.LEVEL = 12] = "LEVEL", u[u.ATTRIBUTE = 13] = "ATTRIBUTE", u[u.BLOT = 14] = "BLOT", u[u.INLINE = 7] = "INLINE", u[u.BLOCK = 11] = "BLOCK", u[u.BLOCK_BLOT = 10] = "BLOCK_BLOT", u[u.INLINE_BLOT = 6] = "INLINE_BLOT", u[u.BLOCK_ATTRIBUTE = 9] = "BLOCK_ATTRIBUTE", u[u.INLINE_ATTRIBUTE = 5] = "INLINE_ATTRIBUTE", u[u.ANY = 15] = "ANY";
        })(o = d.Scope || (d.Scope = {}));
        function t(u, r) {
          var i = s(u);
          if (i == null)
            throw new b("Unable to create " + u + " blot");
          var c = i, n = u instanceof Node || u.nodeType === Node.TEXT_NODE ? u : c.create(r);
          return new c(n, r);
        }
        d.create = t;
        function e(u, r) {
          return r === void 0 && (r = !1), u == null ? null : u[d.DATA_KEY] != null ? u[d.DATA_KEY].blot : r ? e(u.parentNode, r) : null;
        }
        d.find = e;
        function s(u, r) {
          r === void 0 && (r = o.ANY);
          var i;
          if (typeof u == "string")
            i = h[u] || _[u];
          else if (u instanceof Text || u.nodeType === Node.TEXT_NODE)
            i = h.text;
          else if (typeof u == "number")
            u & o.LEVEL & o.BLOCK ? i = h.block : u & o.LEVEL & o.INLINE && (i = h.inline);
          else if (u instanceof HTMLElement) {
            var c = (u.getAttribute("class") || "").split(/\s+/);
            for (var n in c)
              if (i = g[c[n]], i)
                break;
            i = i || y[u.tagName];
          }
          return i == null ? null : r & o.LEVEL & i.scope && r & o.TYPE & i.scope ? i : null;
        }
        d.query = s;
        function l() {
          for (var u = [], r = 0; r < arguments.length; r++)
            u[r] = arguments[r];
          if (u.length > 1)
            return u.map(function(n) {
              return l(n);
            });
          var i = u[0];
          if (typeof i.blotName != "string" && typeof i.attrName != "string")
            throw new b("Invalid definition");
          if (i.blotName === "abstract")
            throw new b("Cannot register abstract class");
          if (h[i.blotName || i.attrName] = i, typeof i.keyName == "string")
            _[i.keyName] = i;
          else if (i.className != null && (g[i.className] = i), i.tagName != null) {
            Array.isArray(i.tagName) ? i.tagName = i.tagName.map(function(n) {
              return n.toUpperCase();
            }) : i.tagName = i.tagName.toUpperCase();
            var c = Array.isArray(i.tagName) ? i.tagName : [i.tagName];
            c.forEach(function(n) {
              (y[n] == null || i.className == null) && (y[n] = i);
            });
          }
          return i;
        }
        d.register = l;
      },
      function(m, d, f) {
        var E = f(51), b = f(11), _ = f(3), g = f(20), y = String.fromCharCode(0), h = function(o) {
          Array.isArray(o) ? this.ops = o : o != null && Array.isArray(o.ops) ? this.ops = o.ops : this.ops = [];
        };
        h.prototype.insert = function(o, t) {
          var e = {};
          return o.length === 0 ? this : (e.insert = o, t != null && typeof t == "object" && Object.keys(t).length > 0 && (e.attributes = t), this.push(e));
        }, h.prototype.delete = function(o) {
          return o <= 0 ? this : this.push({ delete: o });
        }, h.prototype.retain = function(o, t) {
          if (o <= 0)
            return this;
          var e = { retain: o };
          return t != null && typeof t == "object" && Object.keys(t).length > 0 && (e.attributes = t), this.push(e);
        }, h.prototype.push = function(o) {
          var t = this.ops.length, e = this.ops[t - 1];
          if (o = _(!0, {}, o), typeof e == "object") {
            if (typeof o.delete == "number" && typeof e.delete == "number")
              return this.ops[t - 1] = { delete: e.delete + o.delete }, this;
            if (typeof e.delete == "number" && o.insert != null && (t -= 1, e = this.ops[t - 1], typeof e != "object"))
              return this.ops.unshift(o), this;
            if (b(o.attributes, e.attributes)) {
              if (typeof o.insert == "string" && typeof e.insert == "string")
                return this.ops[t - 1] = { insert: e.insert + o.insert }, typeof o.attributes == "object" && (this.ops[t - 1].attributes = o.attributes), this;
              if (typeof o.retain == "number" && typeof e.retain == "number")
                return this.ops[t - 1] = { retain: e.retain + o.retain }, typeof o.attributes == "object" && (this.ops[t - 1].attributes = o.attributes), this;
            }
          }
          return t === this.ops.length ? this.ops.push(o) : this.ops.splice(t, 0, o), this;
        }, h.prototype.chop = function() {
          var o = this.ops[this.ops.length - 1];
          return o && o.retain && !o.attributes && this.ops.pop(), this;
        }, h.prototype.filter = function(o) {
          return this.ops.filter(o);
        }, h.prototype.forEach = function(o) {
          this.ops.forEach(o);
        }, h.prototype.map = function(o) {
          return this.ops.map(o);
        }, h.prototype.partition = function(o) {
          var t = [], e = [];
          return this.forEach(function(s) {
            var l = o(s) ? t : e;
            l.push(s);
          }), [t, e];
        }, h.prototype.reduce = function(o, t) {
          return this.ops.reduce(o, t);
        }, h.prototype.changeLength = function() {
          return this.reduce(function(o, t) {
            return t.insert ? o + g.length(t) : t.delete ? o - t.delete : o;
          }, 0);
        }, h.prototype.length = function() {
          return this.reduce(function(o, t) {
            return o + g.length(t);
          }, 0);
        }, h.prototype.slice = function(o, t) {
          o = o || 0, typeof t != "number" && (t = 1 / 0);
          for (var e = [], s = g.iterator(this.ops), l = 0; l < t && s.hasNext(); ) {
            var u;
            l < o ? u = s.next(o - l) : (u = s.next(t - l), e.push(u)), l += g.length(u);
          }
          return new h(e);
        }, h.prototype.compose = function(o) {
          var t = g.iterator(this.ops), e = g.iterator(o.ops), s = [], l = e.peek();
          if (l != null && typeof l.retain == "number" && l.attributes == null) {
            for (var u = l.retain; t.peekType() === "insert" && t.peekLength() <= u; )
              u -= t.peekLength(), s.push(t.next());
            l.retain - u > 0 && e.next(l.retain - u);
          }
          for (var r = new h(s); t.hasNext() || e.hasNext(); )
            if (e.peekType() === "insert")
              r.push(e.next());
            else if (t.peekType() === "delete")
              r.push(t.next());
            else {
              var i = Math.min(t.peekLength(), e.peekLength()), c = t.next(i), n = e.next(i);
              if (typeof n.retain == "number") {
                var v = {};
                typeof c.retain == "number" ? v.retain = i : v.insert = c.insert;
                var S = g.attributes.compose(c.attributes, n.attributes, typeof c.retain == "number");
                if (S && (v.attributes = S), r.push(v), !e.hasNext() && b(r.ops[r.ops.length - 1], v)) {
                  var w = new h(t.rest());
                  return r.concat(w).chop();
                }
              } else
                typeof n.delete == "number" && typeof c.retain == "number" && r.push(n);
            }
          return r.chop();
        }, h.prototype.concat = function(o) {
          var t = new h(this.ops.slice());
          return o.ops.length > 0 && (t.push(o.ops[0]), t.ops = t.ops.concat(o.ops.slice(1))), t;
        }, h.prototype.diff = function(o, t) {
          if (this.ops === o.ops)
            return new h();
          var e = [this, o].map(function(i) {
            return i.map(function(c) {
              if (c.insert != null)
                return typeof c.insert == "string" ? c.insert : y;
              var n = i === o ? "on" : "with";
              throw new Error("diff() called " + n + " non-document");
            }).join("");
          }), s = new h(), l = E(e[0], e[1], t), u = g.iterator(this.ops), r = g.iterator(o.ops);
          return l.forEach(function(i) {
            for (var c = i[1].length; c > 0; ) {
              var n = 0;
              switch (i[0]) {
                case E.INSERT:
                  n = Math.min(r.peekLength(), c), s.push(r.next(n));
                  break;
                case E.DELETE:
                  n = Math.min(c, u.peekLength()), u.next(n), s.delete(n);
                  break;
                case E.EQUAL:
                  n = Math.min(u.peekLength(), r.peekLength(), c);
                  var v = u.next(n), S = r.next(n);
                  b(v.insert, S.insert) ? s.retain(n, g.attributes.diff(v.attributes, S.attributes)) : s.push(S).delete(n);
                  break;
              }
              c -= n;
            }
          }), s.chop();
        }, h.prototype.eachLine = function(o, t) {
          t = t || `
`;
          for (var e = g.iterator(this.ops), s = new h(), l = 0; e.hasNext(); ) {
            if (e.peekType() !== "insert")
              return;
            var u = e.peek(), r = g.length(u) - e.peekLength(), i = typeof u.insert == "string" ? u.insert.indexOf(t, r) - r : -1;
            if (i < 0)
              s.push(e.next());
            else if (i > 0)
              s.push(e.next(i));
            else {
              if (o(s, e.next(1).attributes || {}, l) === !1)
                return;
              l += 1, s = new h();
            }
          }
          s.length() > 0 && o(s, {}, l);
        }, h.prototype.transform = function(o, t) {
          if (t = !!t, typeof o == "number")
            return this.transformPosition(o, t);
          for (var e = g.iterator(this.ops), s = g.iterator(o.ops), l = new h(); e.hasNext() || s.hasNext(); )
            if (e.peekType() === "insert" && (t || s.peekType() !== "insert"))
              l.retain(g.length(e.next()));
            else if (s.peekType() === "insert")
              l.push(s.next());
            else {
              var u = Math.min(e.peekLength(), s.peekLength()), r = e.next(u), i = s.next(u);
              if (r.delete)
                continue;
              i.delete ? l.push(i) : l.retain(u, g.attributes.transform(r.attributes, i.attributes, t));
            }
          return l.chop();
        }, h.prototype.transformPosition = function(o, t) {
          t = !!t;
          for (var e = g.iterator(this.ops), s = 0; e.hasNext() && s <= o; ) {
            var l = e.peekLength(), u = e.peekType();
            if (e.next(), u === "delete") {
              o -= Math.min(l, o - s);
              continue;
            } else
              u === "insert" && (s < o || !t) && (o += l);
            s += l;
          }
          return o;
        }, m.exports = h;
      },
      function(m, d) {
        var f = Object.prototype.hasOwnProperty, E = Object.prototype.toString, b = Object.defineProperty, _ = Object.getOwnPropertyDescriptor, g = function(e) {
          return typeof Array.isArray == "function" ? Array.isArray(e) : E.call(e) === "[object Array]";
        }, y = function(e) {
          if (!e || E.call(e) !== "[object Object]")
            return !1;
          var s = f.call(e, "constructor"), l = e.constructor && e.constructor.prototype && f.call(e.constructor.prototype, "isPrototypeOf");
          if (e.constructor && !s && !l)
            return !1;
          var u;
          for (u in e)
            ;
          return typeof u > "u" || f.call(e, u);
        }, h = function(e, s) {
          b && s.name === "__proto__" ? b(e, s.name, {
            enumerable: !0,
            configurable: !0,
            value: s.newValue,
            writable: !0
          }) : e[s.name] = s.newValue;
        }, o = function(e, s) {
          if (s === "__proto__")
            if (f.call(e, s)) {
              if (_)
                return _(e, s).value;
            } else
              return;
          return e[s];
        };
        m.exports = function t() {
          var e, s, l, u, r, i, c = arguments[0], n = 1, v = arguments.length, S = !1;
          for (typeof c == "boolean" && (S = c, c = arguments[1] || {}, n = 2), (c == null || typeof c != "object" && typeof c != "function") && (c = {}); n < v; ++n)
            if (e = arguments[n], e != null)
              for (s in e)
                l = o(c, s), u = o(e, s), c !== u && (S && u && (y(u) || (r = g(u))) ? (r ? (r = !1, i = l && g(l) ? l : []) : i = l && y(l) ? l : {}, h(c, { name: s, newValue: t(S, i, u) })) : typeof u < "u" && h(c, { name: s, newValue: u }));
          return c;
        };
      },
      function(m, d, f) {
        Object.defineProperty(d, "__esModule", {
          value: !0
        }), d.default = d.BlockEmbed = d.bubbleFormats = void 0;
        var E = function() {
          function p(O, k) {
            for (var L = 0; L < k.length; L++) {
              var D = k[L];
              D.enumerable = D.enumerable || !1, D.configurable = !0, "value" in D && (D.writable = !0), Object.defineProperty(O, D.key, D);
            }
          }
          return function(O, k, L) {
            return k && p(O.prototype, k), L && p(O, L), O;
          };
        }(), b = function p(O, k, L) {
          O === null && (O = Function.prototype);
          var D = Object.getOwnPropertyDescriptor(O, k);
          if (D === void 0) {
            var z = Object.getPrototypeOf(O);
            return z === null ? void 0 : p(z, k, L);
          } else {
            if ("value" in D)
              return D.value;
            var $ = D.get;
            return $ === void 0 ? void 0 : $.call(L);
          }
        }, _ = f(3), g = c(_), y = f(2), h = c(y), o = f(0), t = c(o), e = f(16), s = c(e), l = f(6), u = c(l), r = f(7), i = c(r);
        function c(p) {
          return p && p.__esModule ? p : { default: p };
        }
        function n(p, O) {
          if (!(p instanceof O))
            throw new TypeError("Cannot call a class as a function");
        }
        function v(p, O) {
          if (!p)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return O && (typeof O == "object" || typeof O == "function") ? O : p;
        }
        function S(p, O) {
          if (typeof O != "function" && O !== null)
            throw new TypeError("Super expression must either be null or a function, not " + typeof O);
          p.prototype = Object.create(O && O.prototype, { constructor: { value: p, enumerable: !1, writable: !0, configurable: !0 } }), O && (Object.setPrototypeOf ? Object.setPrototypeOf(p, O) : p.__proto__ = O);
        }
        var w = 1, T = function(p) {
          S(O, p);
          function O() {
            return n(this, O), v(this, (O.__proto__ || Object.getPrototypeOf(O)).apply(this, arguments));
          }
          return E(O, [{
            key: "attach",
            value: function() {
              b(O.prototype.__proto__ || Object.getPrototypeOf(O.prototype), "attach", this).call(this), this.attributes = new t.default.Attributor.Store(this.domNode);
            }
          }, {
            key: "delta",
            value: function() {
              return new h.default().insert(this.value(), (0, g.default)(this.formats(), this.attributes.values()));
            }
          }, {
            key: "format",
            value: function(L, D) {
              var z = t.default.query(L, t.default.Scope.BLOCK_ATTRIBUTE);
              z != null && this.attributes.attribute(z, D);
            }
          }, {
            key: "formatAt",
            value: function(L, D, z, $) {
              this.format(z, $);
            }
          }, {
            key: "insertAt",
            value: function(L, D, z) {
              if (typeof D == "string" && D.endsWith(`
`)) {
                var $ = t.default.create(P.blotName);
                this.parent.insertBefore($, L === 0 ? this : this.next), $.insertAt(0, D.slice(0, -1));
              } else
                b(O.prototype.__proto__ || Object.getPrototypeOf(O.prototype), "insertAt", this).call(this, L, D, z);
            }
          }]), O;
        }(t.default.Embed);
        T.scope = t.default.Scope.BLOCK_BLOT;
        var P = function(p) {
          S(O, p);
          function O(k) {
            n(this, O);
            var L = v(this, (O.__proto__ || Object.getPrototypeOf(O)).call(this, k));
            return L.cache = {}, L;
          }
          return E(O, [{
            key: "delta",
            value: function() {
              return this.cache.delta == null && (this.cache.delta = this.descendants(t.default.Leaf).reduce(function(L, D) {
                return D.length() === 0 ? L : L.insert(D.value(), A(D));
              }, new h.default()).insert(`
`, A(this))), this.cache.delta;
            }
          }, {
            key: "deleteAt",
            value: function(L, D) {
              b(O.prototype.__proto__ || Object.getPrototypeOf(O.prototype), "deleteAt", this).call(this, L, D), this.cache = {};
            }
          }, {
            key: "formatAt",
            value: function(L, D, z, $) {
              D <= 0 || (t.default.query(z, t.default.Scope.BLOCK) ? L + D === this.length() && this.format(z, $) : b(O.prototype.__proto__ || Object.getPrototypeOf(O.prototype), "formatAt", this).call(this, L, Math.min(D, this.length() - L - 1), z, $), this.cache = {});
            }
          }, {
            key: "insertAt",
            value: function(L, D, z) {
              if (z != null)
                return b(O.prototype.__proto__ || Object.getPrototypeOf(O.prototype), "insertAt", this).call(this, L, D, z);
              if (D.length !== 0) {
                var $ = D.split(`
`), J = $.shift();
                J.length > 0 && (L < this.length() - 1 || this.children.tail == null ? b(O.prototype.__proto__ || Object.getPrototypeOf(O.prototype), "insertAt", this).call(this, Math.min(L, this.length() - 1), J) : this.children.tail.insertAt(this.children.tail.length(), J), this.cache = {});
                var H = this;
                $.reduce(function(j, N) {
                  return H = H.split(j, !0), H.insertAt(0, N), N.length;
                }, L + J.length);
              }
            }
          }, {
            key: "insertBefore",
            value: function(L, D) {
              var z = this.children.head;
              b(O.prototype.__proto__ || Object.getPrototypeOf(O.prototype), "insertBefore", this).call(this, L, D), z instanceof s.default && z.remove(), this.cache = {};
            }
          }, {
            key: "length",
            value: function() {
              return this.cache.length == null && (this.cache.length = b(O.prototype.__proto__ || Object.getPrototypeOf(O.prototype), "length", this).call(this) + w), this.cache.length;
            }
          }, {
            key: "moveChildren",
            value: function(L, D) {
              b(O.prototype.__proto__ || Object.getPrototypeOf(O.prototype), "moveChildren", this).call(this, L, D), this.cache = {};
            }
          }, {
            key: "optimize",
            value: function(L) {
              b(O.prototype.__proto__ || Object.getPrototypeOf(O.prototype), "optimize", this).call(this, L), this.cache = {};
            }
          }, {
            key: "path",
            value: function(L) {
              return b(O.prototype.__proto__ || Object.getPrototypeOf(O.prototype), "path", this).call(this, L, !0);
            }
          }, {
            key: "removeChild",
            value: function(L) {
              b(O.prototype.__proto__ || Object.getPrototypeOf(O.prototype), "removeChild", this).call(this, L), this.cache = {};
            }
          }, {
            key: "split",
            value: function(L) {
              var D = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
              if (D && (L === 0 || L >= this.length() - w)) {
                var z = this.clone();
                return L === 0 ? (this.parent.insertBefore(z, this), this) : (this.parent.insertBefore(z, this.next), z);
              } else {
                var $ = b(O.prototype.__proto__ || Object.getPrototypeOf(O.prototype), "split", this).call(this, L, D);
                return this.cache = {}, $;
              }
            }
          }]), O;
        }(t.default.Block);
        P.blotName = "block", P.tagName = "P", P.defaultChild = "break", P.allowedChildren = [u.default, t.default.Embed, i.default];
        function A(p) {
          var O = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
          return p == null || (typeof p.formats == "function" && (O = (0, g.default)(O, p.formats())), p.parent == null || p.parent.blotName == "scroll" || p.parent.statics.scope !== p.statics.scope) ? O : A(p.parent, O);
        }
        d.bubbleFormats = A, d.BlockEmbed = T, d.default = P;
      },
      function(m, d, f) {
        Object.defineProperty(d, "__esModule", {
          value: !0
        }), d.default = d.overload = d.expandConfig = void 0;
        var E = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(H) {
          return typeof H;
        } : function(H) {
          return H && typeof Symbol == "function" && H.constructor === Symbol && H !== Symbol.prototype ? "symbol" : typeof H;
        }, b = function() {
          function H(j, N) {
            var I = [], M = !0, K = !1, C = void 0;
            try {
              for (var q = j[Symbol.iterator](), F; !(M = (F = q.next()).done) && (I.push(F.value), !(N && I.length === N)); M = !0)
                ;
            } catch (G) {
              K = !0, C = G;
            } finally {
              try {
                !M && q.return && q.return();
              } finally {
                if (K)
                  throw C;
              }
            }
            return I;
          }
          return function(j, N) {
            if (Array.isArray(j))
              return j;
            if (Symbol.iterator in Object(j))
              return H(j, N);
            throw new TypeError("Invalid attempt to destructure non-iterable instance");
          };
        }(), _ = function() {
          function H(j, N) {
            for (var I = 0; I < N.length; I++) {
              var M = N[I];
              M.enumerable = M.enumerable || !1, M.configurable = !0, "value" in M && (M.writable = !0), Object.defineProperty(j, M.key, M);
            }
          }
          return function(j, N, I) {
            return N && H(j.prototype, N), I && H(j, I), j;
          };
        }();
        f(50);
        var g = f(2), y = A(g), h = f(14), o = A(h), t = f(8), e = A(t), s = f(9), l = A(s), u = f(0), r = A(u), i = f(15), c = A(i), n = f(3), v = A(n), S = f(10), w = A(S), T = f(34), P = A(T);
        function A(H) {
          return H && H.__esModule ? H : { default: H };
        }
        function p(H, j, N) {
          return j in H ? Object.defineProperty(H, j, { value: N, enumerable: !0, configurable: !0, writable: !0 }) : H[j] = N, H;
        }
        function O(H, j) {
          if (!(H instanceof j))
            throw new TypeError("Cannot call a class as a function");
        }
        var k = (0, w.default)("quill"), L = function() {
          _(H, null, [{
            key: "debug",
            value: function(N) {
              N === !0 && (N = "log"), w.default.level(N);
            }
          }, {
            key: "find",
            value: function(N) {
              return N.__quill || r.default.find(N);
            }
          }, {
            key: "import",
            value: function(N) {
              return this.imports[N] == null && k.error("Cannot import " + N + ". Are you sure it was registered?"), this.imports[N];
            }
          }, {
            key: "register",
            value: function(N, I) {
              var M = this, K = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
              if (typeof N != "string") {
                var C = N.attrName || N.blotName;
                typeof C == "string" ? this.register("formats/" + C, N, I) : Object.keys(N).forEach(function(q) {
                  M.register(q, N[q], I);
                });
              } else
                this.imports[N] != null && !K && k.warn("Overwriting " + N + " with", I), this.imports[N] = I, (N.startsWith("blots/") || N.startsWith("formats/")) && I.blotName !== "abstract" ? r.default.register(I) : N.startsWith("modules") && typeof I.register == "function" && I.register();
            }
          }]);
          function H(j) {
            var N = this, I = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
            if (O(this, H), this.options = D(j, I), this.container = this.options.container, this.container == null)
              return k.error("Invalid Quill container", j);
            this.options.debug && H.debug(this.options.debug);
            var M = this.container.innerHTML.trim();
            this.container.classList.add("ql-container"), this.container.innerHTML = "", this.container.__quill = this, this.root = this.addContainer("ql-editor"), this.root.classList.add("ql-blank"), this.root.setAttribute("data-gramm", !1), this.scrollingContainer = this.options.scrollingContainer || this.root, this.emitter = new e.default(), this.scroll = r.default.create(this.root, {
              emitter: this.emitter,
              whitelist: this.options.formats
            }), this.editor = new o.default(this.scroll), this.selection = new c.default(this.scroll, this.emitter), this.theme = new this.options.theme(this, this.options), this.keyboard = this.theme.addModule("keyboard"), this.clipboard = this.theme.addModule("clipboard"), this.history = this.theme.addModule("history"), this.theme.init(), this.emitter.on(e.default.events.EDITOR_CHANGE, function(C) {
              C === e.default.events.TEXT_CHANGE && N.root.classList.toggle("ql-blank", N.editor.isBlank());
            }), this.emitter.on(e.default.events.SCROLL_UPDATE, function(C, q) {
              var F = N.selection.lastRange, G = F && F.length === 0 ? F.index : void 0;
              z.call(N, function() {
                return N.editor.update(null, q, G);
              }, C);
            });
            var K = this.clipboard.convert(`<div class='ql-editor' style="white-space: normal;">` + M + "<p><br></p></div>");
            this.setContents(K), this.history.clear(), this.options.placeholder && this.root.setAttribute("data-placeholder", this.options.placeholder), this.options.readOnly && this.disable();
          }
          return _(H, [{
            key: "addContainer",
            value: function(N) {
              var I = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
              if (typeof N == "string") {
                var M = N;
                N = document.createElement("div"), N.classList.add(M);
              }
              return this.container.insertBefore(N, I), N;
            }
          }, {
            key: "blur",
            value: function() {
              this.selection.setRange(null);
            }
          }, {
            key: "deleteText",
            value: function(N, I, M) {
              var K = this, C = $(N, I, M), q = b(C, 4);
              return N = q[0], I = q[1], M = q[3], z.call(this, function() {
                return K.editor.deleteText(N, I);
              }, M, N, -1 * I);
            }
          }, {
            key: "disable",
            value: function() {
              this.enable(!1);
            }
          }, {
            key: "enable",
            value: function() {
              var N = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0;
              this.scroll.enable(N), this.container.classList.toggle("ql-disabled", !N);
            }
          }, {
            key: "focus",
            value: function() {
              var N = this.scrollingContainer.scrollTop;
              this.selection.focus(), this.scrollingContainer.scrollTop = N, this.scrollIntoView();
            }
          }, {
            key: "format",
            value: function(N, I) {
              var M = this, K = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : e.default.sources.API;
              return z.call(this, function() {
                var C = M.getSelection(!0), q = new y.default();
                if (C == null)
                  return q;
                if (r.default.query(N, r.default.Scope.BLOCK))
                  q = M.editor.formatLine(C.index, C.length, p({}, N, I));
                else {
                  if (C.length === 0)
                    return M.selection.format(N, I), q;
                  q = M.editor.formatText(C.index, C.length, p({}, N, I));
                }
                return M.setSelection(C, e.default.sources.SILENT), q;
              }, K);
            }
          }, {
            key: "formatLine",
            value: function(N, I, M, K, C) {
              var q = this, F = void 0, G = $(N, I, M, K, C), V = b(G, 4);
              return N = V[0], I = V[1], F = V[2], C = V[3], z.call(this, function() {
                return q.editor.formatLine(N, I, F);
              }, C, N, 0);
            }
          }, {
            key: "formatText",
            value: function(N, I, M, K, C) {
              var q = this, F = void 0, G = $(N, I, M, K, C), V = b(G, 4);
              return N = V[0], I = V[1], F = V[2], C = V[3], z.call(this, function() {
                return q.editor.formatText(N, I, F);
              }, C, N, 0);
            }
          }, {
            key: "getBounds",
            value: function(N) {
              var I = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, M = void 0;
              typeof N == "number" ? M = this.selection.getBounds(N, I) : M = this.selection.getBounds(N.index, N.length);
              var K = this.container.getBoundingClientRect();
              return {
                bottom: M.bottom - K.top,
                height: M.height,
                left: M.left - K.left,
                right: M.right - K.left,
                top: M.top - K.top,
                width: M.width
              };
            }
          }, {
            key: "getContents",
            value: function() {
              var N = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0, I = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : this.getLength() - N, M = $(N, I), K = b(M, 2);
              return N = K[0], I = K[1], this.editor.getContents(N, I);
            }
          }, {
            key: "getFormat",
            value: function() {
              var N = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : this.getSelection(!0), I = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
              return typeof N == "number" ? this.editor.getFormat(N, I) : this.editor.getFormat(N.index, N.length);
            }
          }, {
            key: "getIndex",
            value: function(N) {
              return N.offset(this.scroll);
            }
          }, {
            key: "getLength",
            value: function() {
              return this.scroll.length();
            }
          }, {
            key: "getLeaf",
            value: function(N) {
              return this.scroll.leaf(N);
            }
          }, {
            key: "getLine",
            value: function(N) {
              return this.scroll.line(N);
            }
          }, {
            key: "getLines",
            value: function() {
              var N = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0, I = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Number.MAX_VALUE;
              return typeof N != "number" ? this.scroll.lines(N.index, N.length) : this.scroll.lines(N, I);
            }
          }, {
            key: "getModule",
            value: function(N) {
              return this.theme.modules[N];
            }
          }, {
            key: "getSelection",
            value: function() {
              var N = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1;
              return N && this.focus(), this.update(), this.selection.getRange()[0];
            }
          }, {
            key: "getText",
            value: function() {
              var N = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0, I = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : this.getLength() - N, M = $(N, I), K = b(M, 2);
              return N = K[0], I = K[1], this.editor.getText(N, I);
            }
          }, {
            key: "hasFocus",
            value: function() {
              return this.selection.hasFocus();
            }
          }, {
            key: "insertEmbed",
            value: function(N, I, M) {
              var K = this, C = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : H.sources.API;
              return z.call(this, function() {
                return K.editor.insertEmbed(N, I, M);
              }, C, N);
            }
          }, {
            key: "insertText",
            value: function(N, I, M, K, C) {
              var q = this, F = void 0, G = $(N, 0, M, K, C), V = b(G, 4);
              return N = V[0], F = V[2], C = V[3], z.call(this, function() {
                return q.editor.insertText(N, I, F);
              }, C, N, I.length);
            }
          }, {
            key: "isEnabled",
            value: function() {
              return !this.container.classList.contains("ql-disabled");
            }
          }, {
            key: "off",
            value: function() {
              return this.emitter.off.apply(this.emitter, arguments);
            }
          }, {
            key: "on",
            value: function() {
              return this.emitter.on.apply(this.emitter, arguments);
            }
          }, {
            key: "once",
            value: function() {
              return this.emitter.once.apply(this.emitter, arguments);
            }
          }, {
            key: "pasteHTML",
            value: function(N, I, M) {
              this.clipboard.dangerouslyPasteHTML(N, I, M);
            }
          }, {
            key: "removeFormat",
            value: function(N, I, M) {
              var K = this, C = $(N, I, M), q = b(C, 4);
              return N = q[0], I = q[1], M = q[3], z.call(this, function() {
                return K.editor.removeFormat(N, I);
              }, M, N);
            }
          }, {
            key: "scrollIntoView",
            value: function() {
              this.selection.scrollIntoView(this.scrollingContainer);
            }
          }, {
            key: "setContents",
            value: function(N) {
              var I = this, M = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e.default.sources.API;
              return z.call(this, function() {
                N = new y.default(N);
                var K = I.getLength(), C = I.editor.deleteText(0, K), q = I.editor.applyDelta(N), F = q.ops[q.ops.length - 1];
                F != null && typeof F.insert == "string" && F.insert[F.insert.length - 1] === `
` && (I.editor.deleteText(I.getLength() - 1, 1), q.delete(1));
                var G = C.compose(q);
                return G;
              }, M);
            }
          }, {
            key: "setSelection",
            value: function(N, I, M) {
              if (N == null)
                this.selection.setRange(null, I || H.sources.API);
              else {
                var K = $(N, I, M), C = b(K, 4);
                N = C[0], I = C[1], M = C[3], this.selection.setRange(new i.Range(N, I), M), M !== e.default.sources.SILENT && this.selection.scrollIntoView(this.scrollingContainer);
              }
            }
          }, {
            key: "setText",
            value: function(N) {
              var I = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e.default.sources.API, M = new y.default().insert(N);
              return this.setContents(M, I);
            }
          }, {
            key: "update",
            value: function() {
              var N = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : e.default.sources.USER, I = this.scroll.update(N);
              return this.selection.update(N), I;
            }
          }, {
            key: "updateContents",
            value: function(N) {
              var I = this, M = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e.default.sources.API;
              return z.call(this, function() {
                return N = new y.default(N), I.editor.applyDelta(N, M);
              }, M, !0);
            }
          }]), H;
        }();
        L.DEFAULTS = {
          bounds: null,
          formats: null,
          modules: {},
          placeholder: "",
          readOnly: !1,
          scrollingContainer: null,
          strict: !0,
          theme: "default"
        }, L.events = e.default.events, L.sources = e.default.sources, L.version = "1.3.7", L.imports = {
          delta: y.default,
          parchment: r.default,
          "core/module": l.default,
          "core/theme": P.default
        };
        function D(H, j) {
          if (j = (0, v.default)(!0, {
            container: H,
            modules: {
              clipboard: !0,
              keyboard: !0,
              history: !0
            }
          }, j), !j.theme || j.theme === L.DEFAULTS.theme)
            j.theme = P.default;
          else if (j.theme = L.import("themes/" + j.theme), j.theme == null)
            throw new Error("Invalid theme " + j.theme + ". Did you register it?");
          var N = (0, v.default)(!0, {}, j.theme.DEFAULTS);
          [N, j].forEach(function(K) {
            K.modules = K.modules || {}, Object.keys(K.modules).forEach(function(C) {
              K.modules[C] === !0 && (K.modules[C] = {});
            });
          });
          var I = Object.keys(N.modules).concat(Object.keys(j.modules)), M = I.reduce(function(K, C) {
            var q = L.import("modules/" + C);
            return q == null ? k.error("Cannot load " + C + " module. Are you sure you registered it?") : K[C] = q.DEFAULTS || {}, K;
          }, {});
          return j.modules != null && j.modules.toolbar && j.modules.toolbar.constructor !== Object && (j.modules.toolbar = {
            container: j.modules.toolbar
          }), j = (0, v.default)(!0, {}, L.DEFAULTS, { modules: M }, N, j), ["bounds", "container", "scrollingContainer"].forEach(function(K) {
            typeof j[K] == "string" && (j[K] = document.querySelector(j[K]));
          }), j.modules = Object.keys(j.modules).reduce(function(K, C) {
            return j.modules[C] && (K[C] = j.modules[C]), K;
          }, {}), j;
        }
        function z(H, j, N, I) {
          if (this.options.strict && !this.isEnabled() && j === e.default.sources.USER)
            return new y.default();
          var M = N == null ? null : this.getSelection(), K = this.editor.delta, C = H();
          if (M != null && (N === !0 && (N = M.index), I == null ? M = J(M, C, j) : I !== 0 && (M = J(M, N, I, j)), this.setSelection(M, e.default.sources.SILENT)), C.length() > 0) {
            var q, F = [e.default.events.TEXT_CHANGE, C, K, j];
            if ((q = this.emitter).emit.apply(q, [e.default.events.EDITOR_CHANGE].concat(F)), j !== e.default.sources.SILENT) {
              var G;
              (G = this.emitter).emit.apply(G, F);
            }
          }
          return C;
        }
        function $(H, j, N, I, M) {
          var K = {};
          return typeof H.index == "number" && typeof H.length == "number" ? typeof j != "number" ? (M = I, I = N, N = j, j = H.length, H = H.index) : (j = H.length, H = H.index) : typeof j != "number" && (M = I, I = N, N = j, j = 0), (typeof N > "u" ? "undefined" : E(N)) === "object" ? (K = N, M = I) : typeof N == "string" && (I != null ? K[N] = I : M = N), M = M || e.default.sources.API, [H, j, K, M];
        }
        function J(H, j, N, I) {
          if (H == null)
            return null;
          var M = void 0, K = void 0;
          if (j instanceof y.default) {
            var C = [H.index, H.index + H.length].map(function(V) {
              return j.transformPosition(V, I !== e.default.sources.USER);
            }), q = b(C, 2);
            M = q[0], K = q[1];
          } else {
            var F = [H.index, H.index + H.length].map(function(V) {
              return V < j || V === j && I === e.default.sources.USER ? V : N >= 0 ? V + N : Math.max(j, V + N);
            }), G = b(F, 2);
            M = G[0], K = G[1];
          }
          return new i.Range(M, K - M);
        }
        d.expandConfig = D, d.overload = $, d.default = L;
      },
      function(m, d, f) {
        Object.defineProperty(d, "__esModule", {
          value: !0
        });
        var E = function() {
          function u(r, i) {
            for (var c = 0; c < i.length; c++) {
              var n = i[c];
              n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(r, n.key, n);
            }
          }
          return function(r, i, c) {
            return i && u(r.prototype, i), c && u(r, c), r;
          };
        }(), b = function u(r, i, c) {
          r === null && (r = Function.prototype);
          var n = Object.getOwnPropertyDescriptor(r, i);
          if (n === void 0) {
            var v = Object.getPrototypeOf(r);
            return v === null ? void 0 : u(v, i, c);
          } else {
            if ("value" in n)
              return n.value;
            var S = n.get;
            return S === void 0 ? void 0 : S.call(c);
          }
        }, _ = f(7), g = o(_), y = f(0), h = o(y);
        function o(u) {
          return u && u.__esModule ? u : { default: u };
        }
        function t(u, r) {
          if (!(u instanceof r))
            throw new TypeError("Cannot call a class as a function");
        }
        function e(u, r) {
          if (!u)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return r && (typeof r == "object" || typeof r == "function") ? r : u;
        }
        function s(u, r) {
          if (typeof r != "function" && r !== null)
            throw new TypeError("Super expression must either be null or a function, not " + typeof r);
          u.prototype = Object.create(r && r.prototype, { constructor: { value: u, enumerable: !1, writable: !0, configurable: !0 } }), r && (Object.setPrototypeOf ? Object.setPrototypeOf(u, r) : u.__proto__ = r);
        }
        var l = function(u) {
          s(r, u);
          function r() {
            return t(this, r), e(this, (r.__proto__ || Object.getPrototypeOf(r)).apply(this, arguments));
          }
          return E(r, [{
            key: "formatAt",
            value: function(c, n, v, S) {
              if (r.compare(this.statics.blotName, v) < 0 && h.default.query(v, h.default.Scope.BLOT)) {
                var w = this.isolate(c, n);
                S && w.wrap(v, S);
              } else
                b(r.prototype.__proto__ || Object.getPrototypeOf(r.prototype), "formatAt", this).call(this, c, n, v, S);
            }
          }, {
            key: "optimize",
            value: function(c) {
              if (b(r.prototype.__proto__ || Object.getPrototypeOf(r.prototype), "optimize", this).call(this, c), this.parent instanceof r && r.compare(this.statics.blotName, this.parent.statics.blotName) > 0) {
                var n = this.parent.isolate(this.offset(), this.length());
                this.moveChildren(n), n.wrap(this);
              }
            }
          }], [{
            key: "compare",
            value: function(c, n) {
              var v = r.order.indexOf(c), S = r.order.indexOf(n);
              return v >= 0 || S >= 0 ? v - S : c === n ? 0 : c < n ? -1 : 1;
            }
          }]), r;
        }(h.default.Inline);
        l.allowedChildren = [l, h.default.Embed, g.default], l.order = [
          "cursor",
          "inline",
          "underline",
          "strike",
          "italic",
          "bold",
          "script",
          "link",
          "code"
        ], d.default = l;
      },
      function(m, d, f) {
        Object.defineProperty(d, "__esModule", {
          value: !0
        });
        var E = f(0), b = _(E);
        function _(t) {
          return t && t.__esModule ? t : { default: t };
        }
        function g(t, e) {
          if (!(t instanceof e))
            throw new TypeError("Cannot call a class as a function");
        }
        function y(t, e) {
          if (!t)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return e && (typeof e == "object" || typeof e == "function") ? e : t;
        }
        function h(t, e) {
          if (typeof e != "function" && e !== null)
            throw new TypeError("Super expression must either be null or a function, not " + typeof e);
          t.prototype = Object.create(e && e.prototype, { constructor: { value: t, enumerable: !1, writable: !0, configurable: !0 } }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e);
        }
        var o = function(t) {
          h(e, t);
          function e() {
            return g(this, e), y(this, (e.__proto__ || Object.getPrototypeOf(e)).apply(this, arguments));
          }
          return e;
        }(b.default.Text);
        d.default = o;
      },
      function(m, d, f) {
        Object.defineProperty(d, "__esModule", {
          value: !0
        });
        var E = function() {
          function i(c, n) {
            for (var v = 0; v < n.length; v++) {
              var S = n[v];
              S.enumerable = S.enumerable || !1, S.configurable = !0, "value" in S && (S.writable = !0), Object.defineProperty(c, S.key, S);
            }
          }
          return function(c, n, v) {
            return n && i(c.prototype, n), v && i(c, v), c;
          };
        }(), b = function i(c, n, v) {
          c === null && (c = Function.prototype);
          var S = Object.getOwnPropertyDescriptor(c, n);
          if (S === void 0) {
            var w = Object.getPrototypeOf(c);
            return w === null ? void 0 : i(w, n, v);
          } else {
            if ("value" in S)
              return S.value;
            var T = S.get;
            return T === void 0 ? void 0 : T.call(v);
          }
        }, _ = f(54), g = o(_), y = f(10), h = o(y);
        function o(i) {
          return i && i.__esModule ? i : { default: i };
        }
        function t(i, c) {
          if (!(i instanceof c))
            throw new TypeError("Cannot call a class as a function");
        }
        function e(i, c) {
          if (!i)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return c && (typeof c == "object" || typeof c == "function") ? c : i;
        }
        function s(i, c) {
          if (typeof c != "function" && c !== null)
            throw new TypeError("Super expression must either be null or a function, not " + typeof c);
          i.prototype = Object.create(c && c.prototype, { constructor: { value: i, enumerable: !1, writable: !0, configurable: !0 } }), c && (Object.setPrototypeOf ? Object.setPrototypeOf(i, c) : i.__proto__ = c);
        }
        var l = (0, h.default)("quill:events"), u = ["selectionchange", "mousedown", "mouseup", "click"];
        u.forEach(function(i) {
          document.addEventListener(i, function() {
            for (var c = arguments.length, n = Array(c), v = 0; v < c; v++)
              n[v] = arguments[v];
            [].slice.call(document.querySelectorAll(".ql-container")).forEach(function(S) {
              if (S.__quill && S.__quill.emitter) {
                var w;
                (w = S.__quill.emitter).handleDOM.apply(w, n);
              }
            });
          });
        });
        var r = function(i) {
          s(c, i);
          function c() {
            t(this, c);
            var n = e(this, (c.__proto__ || Object.getPrototypeOf(c)).call(this));
            return n.listeners = {}, n.on("error", l.error), n;
          }
          return E(c, [{
            key: "emit",
            value: function() {
              l.log.apply(l, arguments), b(c.prototype.__proto__ || Object.getPrototypeOf(c.prototype), "emit", this).apply(this, arguments);
            }
          }, {
            key: "handleDOM",
            value: function(v) {
              for (var S = arguments.length, w = Array(S > 1 ? S - 1 : 0), T = 1; T < S; T++)
                w[T - 1] = arguments[T];
              (this.listeners[v.type] || []).forEach(function(P) {
                var A = P.node, p = P.handler;
                (v.target === A || A.contains(v.target)) && p.apply(void 0, [v].concat(w));
              });
            }
          }, {
            key: "listenDOM",
            value: function(v, S, w) {
              this.listeners[v] || (this.listeners[v] = []), this.listeners[v].push({ node: S, handler: w });
            }
          }]), c;
        }(g.default);
        r.events = {
          EDITOR_CHANGE: "editor-change",
          SCROLL_BEFORE_UPDATE: "scroll-before-update",
          SCROLL_OPTIMIZE: "scroll-optimize",
          SCROLL_UPDATE: "scroll-update",
          SELECTION_CHANGE: "selection-change",
          TEXT_CHANGE: "text-change"
        }, r.sources = {
          API: "api",
          SILENT: "silent",
          USER: "user"
        }, d.default = r;
      },
      function(m, d, f) {
        Object.defineProperty(d, "__esModule", {
          value: !0
        });
        function E(_, g) {
          if (!(_ instanceof g))
            throw new TypeError("Cannot call a class as a function");
        }
        var b = function _(g) {
          var y = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
          E(this, _), this.quill = g, this.options = y;
        };
        b.DEFAULTS = {}, d.default = b;
      },
      function(m, d, f) {
        Object.defineProperty(d, "__esModule", {
          value: !0
        });
        var E = ["error", "warn", "log", "info"], b = "warn";
        function _(y) {
          if (E.indexOf(y) <= E.indexOf(b)) {
            for (var h, o = arguments.length, t = Array(o > 1 ? o - 1 : 0), e = 1; e < o; e++)
              t[e - 1] = arguments[e];
            (h = console)[y].apply(h, t);
          }
        }
        function g(y) {
          return E.reduce(function(h, o) {
            return h[o] = _.bind(console, o, y), h;
          }, {});
        }
        _.level = g.level = function(y) {
          b = y;
        }, d.default = g;
      },
      function(m, d, f) {
        var E = Array.prototype.slice, b = f(52), _ = f(53), g = m.exports = function(t, e, s) {
          return s || (s = {}), t === e ? !0 : t instanceof Date && e instanceof Date ? t.getTime() === e.getTime() : !t || !e || typeof t != "object" && typeof e != "object" ? s.strict ? t === e : t == e : o(t, e, s);
        };
        function y(t) {
          return t == null;
        }
        function h(t) {
          return !(!t || typeof t != "object" || typeof t.length != "number" || typeof t.copy != "function" || typeof t.slice != "function" || t.length > 0 && typeof t[0] != "number");
        }
        function o(t, e, s) {
          var l, u;
          if (y(t) || y(e) || t.prototype !== e.prototype)
            return !1;
          if (_(t))
            return _(e) ? (t = E.call(t), e = E.call(e), g(t, e, s)) : !1;
          if (h(t)) {
            if (!h(e) || t.length !== e.length)
              return !1;
            for (l = 0; l < t.length; l++)
              if (t[l] !== e[l])
                return !1;
            return !0;
          }
          try {
            var r = b(t), i = b(e);
          } catch {
            return !1;
          }
          if (r.length != i.length)
            return !1;
          for (r.sort(), i.sort(), l = r.length - 1; l >= 0; l--)
            if (r[l] != i[l])
              return !1;
          for (l = r.length - 1; l >= 0; l--)
            if (u = r[l], !g(t[u], e[u], s))
              return !1;
          return typeof t == typeof e;
        }
      },
      function(m, d, f) {
        Object.defineProperty(d, "__esModule", { value: !0 });
        var E = f(1), b = function() {
          function _(g, y, h) {
            h === void 0 && (h = {}), this.attrName = g, this.keyName = y;
            var o = E.Scope.TYPE & E.Scope.ATTRIBUTE;
            h.scope != null ? this.scope = h.scope & E.Scope.LEVEL | o : this.scope = E.Scope.ATTRIBUTE, h.whitelist != null && (this.whitelist = h.whitelist);
          }
          return _.keys = function(g) {
            return [].map.call(g.attributes, function(y) {
              return y.name;
            });
          }, _.prototype.add = function(g, y) {
            return this.canAdd(g, y) ? (g.setAttribute(this.keyName, y), !0) : !1;
          }, _.prototype.canAdd = function(g, y) {
            var h = E.query(g, E.Scope.BLOT & (this.scope | E.Scope.TYPE));
            return h == null ? !1 : this.whitelist == null ? !0 : typeof y == "string" ? this.whitelist.indexOf(y.replace(/["']/g, "")) > -1 : this.whitelist.indexOf(y) > -1;
          }, _.prototype.remove = function(g) {
            g.removeAttribute(this.keyName);
          }, _.prototype.value = function(g) {
            var y = g.getAttribute(this.keyName);
            return this.canAdd(g, y) && y ? y : "";
          }, _;
        }();
        d.default = b;
      },
      function(m, d, f) {
        Object.defineProperty(d, "__esModule", {
          value: !0
        }), d.default = d.Code = void 0;
        var E = function() {
          function T(P, A) {
            var p = [], O = !0, k = !1, L = void 0;
            try {
              for (var D = P[Symbol.iterator](), z; !(O = (z = D.next()).done) && (p.push(z.value), !(A && p.length === A)); O = !0)
                ;
            } catch ($) {
              k = !0, L = $;
            } finally {
              try {
                !O && D.return && D.return();
              } finally {
                if (k)
                  throw L;
              }
            }
            return p;
          }
          return function(P, A) {
            if (Array.isArray(P))
              return P;
            if (Symbol.iterator in Object(P))
              return T(P, A);
            throw new TypeError("Invalid attempt to destructure non-iterable instance");
          };
        }(), b = function() {
          function T(P, A) {
            for (var p = 0; p < A.length; p++) {
              var O = A[p];
              O.enumerable = O.enumerable || !1, O.configurable = !0, "value" in O && (O.writable = !0), Object.defineProperty(P, O.key, O);
            }
          }
          return function(P, A, p) {
            return A && T(P.prototype, A), p && T(P, p), P;
          };
        }(), _ = function T(P, A, p) {
          P === null && (P = Function.prototype);
          var O = Object.getOwnPropertyDescriptor(P, A);
          if (O === void 0) {
            var k = Object.getPrototypeOf(P);
            return k === null ? void 0 : T(k, A, p);
          } else {
            if ("value" in O)
              return O.value;
            var L = O.get;
            return L === void 0 ? void 0 : L.call(p);
          }
        }, g = f(2), y = i(g), h = f(0), o = i(h), t = f(4), e = i(t), s = f(6), l = i(s), u = f(7), r = i(u);
        function i(T) {
          return T && T.__esModule ? T : { default: T };
        }
        function c(T, P) {
          if (!(T instanceof P))
            throw new TypeError("Cannot call a class as a function");
        }
        function n(T, P) {
          if (!T)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return P && (typeof P == "object" || typeof P == "function") ? P : T;
        }
        function v(T, P) {
          if (typeof P != "function" && P !== null)
            throw new TypeError("Super expression must either be null or a function, not " + typeof P);
          T.prototype = Object.create(P && P.prototype, { constructor: { value: T, enumerable: !1, writable: !0, configurable: !0 } }), P && (Object.setPrototypeOf ? Object.setPrototypeOf(T, P) : T.__proto__ = P);
        }
        var S = function(T) {
          v(P, T);
          function P() {
            return c(this, P), n(this, (P.__proto__ || Object.getPrototypeOf(P)).apply(this, arguments));
          }
          return P;
        }(l.default);
        S.blotName = "code", S.tagName = "CODE";
        var w = function(T) {
          v(P, T);
          function P() {
            return c(this, P), n(this, (P.__proto__ || Object.getPrototypeOf(P)).apply(this, arguments));
          }
          return b(P, [{
            key: "delta",
            value: function() {
              var p = this, O = this.domNode.textContent;
              return O.endsWith(`
`) && (O = O.slice(0, -1)), O.split(`
`).reduce(function(k, L) {
                return k.insert(L).insert(`
`, p.formats());
              }, new y.default());
            }
          }, {
            key: "format",
            value: function(p, O) {
              if (!(p === this.statics.blotName && O)) {
                var k = this.descendant(r.default, this.length() - 1), L = E(k, 1), D = L[0];
                D != null && D.deleteAt(D.length() - 1, 1), _(P.prototype.__proto__ || Object.getPrototypeOf(P.prototype), "format", this).call(this, p, O);
              }
            }
          }, {
            key: "formatAt",
            value: function(p, O, k, L) {
              if (O !== 0 && !(o.default.query(k, o.default.Scope.BLOCK) == null || k === this.statics.blotName && L === this.statics.formats(this.domNode))) {
                var D = this.newlineIndex(p);
                if (!(D < 0 || D >= p + O)) {
                  var z = this.newlineIndex(p, !0) + 1, $ = D - z + 1, J = this.isolate(z, $), H = J.next;
                  J.format(k, L), H instanceof P && H.formatAt(0, p - z + O - $, k, L);
                }
              }
            }
          }, {
            key: "insertAt",
            value: function(p, O, k) {
              if (k == null) {
                var L = this.descendant(r.default, p), D = E(L, 2), z = D[0], $ = D[1];
                z.insertAt($, O);
              }
            }
          }, {
            key: "length",
            value: function() {
              var p = this.domNode.textContent.length;
              return this.domNode.textContent.endsWith(`
`) ? p : p + 1;
            }
          }, {
            key: "newlineIndex",
            value: function(p) {
              var O = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
              if (O)
                return this.domNode.textContent.slice(0, p).lastIndexOf(`
`);
              var k = this.domNode.textContent.slice(p).indexOf(`
`);
              return k > -1 ? p + k : -1;
            }
          }, {
            key: "optimize",
            value: function(p) {
              this.domNode.textContent.endsWith(`
`) || this.appendChild(o.default.create("text", `
`)), _(P.prototype.__proto__ || Object.getPrototypeOf(P.prototype), "optimize", this).call(this, p);
              var O = this.next;
              O != null && O.prev === this && O.statics.blotName === this.statics.blotName && this.statics.formats(this.domNode) === O.statics.formats(O.domNode) && (O.optimize(p), O.moveChildren(this), O.remove());
            }
          }, {
            key: "replace",
            value: function(p) {
              _(P.prototype.__proto__ || Object.getPrototypeOf(P.prototype), "replace", this).call(this, p), [].slice.call(this.domNode.querySelectorAll("*")).forEach(function(O) {
                var k = o.default.find(O);
                k == null ? O.parentNode.removeChild(O) : k instanceof o.default.Embed ? k.remove() : k.unwrap();
              });
            }
          }], [{
            key: "create",
            value: function(p) {
              var O = _(P.__proto__ || Object.getPrototypeOf(P), "create", this).call(this, p);
              return O.setAttribute("spellcheck", !1), O;
            }
          }, {
            key: "formats",
            value: function() {
              return !0;
            }
          }]), P;
        }(e.default);
        w.blotName = "code-block", w.tagName = "PRE", w.TAB = "  ", d.Code = S, d.default = w;
      },
      function(m, d, f) {
        Object.defineProperty(d, "__esModule", {
          value: !0
        });
        var E = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(H) {
          return typeof H;
        } : function(H) {
          return H && typeof Symbol == "function" && H.constructor === Symbol && H !== Symbol.prototype ? "symbol" : typeof H;
        }, b = function() {
          function H(j, N) {
            var I = [], M = !0, K = !1, C = void 0;
            try {
              for (var q = j[Symbol.iterator](), F; !(M = (F = q.next()).done) && (I.push(F.value), !(N && I.length === N)); M = !0)
                ;
            } catch (G) {
              K = !0, C = G;
            } finally {
              try {
                !M && q.return && q.return();
              } finally {
                if (K)
                  throw C;
              }
            }
            return I;
          }
          return function(j, N) {
            if (Array.isArray(j))
              return j;
            if (Symbol.iterator in Object(j))
              return H(j, N);
            throw new TypeError("Invalid attempt to destructure non-iterable instance");
          };
        }(), _ = function() {
          function H(j, N) {
            for (var I = 0; I < N.length; I++) {
              var M = N[I];
              M.enumerable = M.enumerable || !1, M.configurable = !0, "value" in M && (M.writable = !0), Object.defineProperty(j, M.key, M);
            }
          }
          return function(j, N, I) {
            return N && H(j.prototype, N), I && H(j, I), j;
          };
        }(), g = f(2), y = O(g), h = f(20), o = O(h), t = f(0), e = O(t), s = f(13), l = O(s), u = f(24), r = O(u), i = f(4), c = O(i), n = f(16), v = O(n), S = f(21), w = O(S), T = f(11), P = O(T), A = f(3), p = O(A);
        function O(H) {
          return H && H.__esModule ? H : { default: H };
        }
        function k(H, j, N) {
          return j in H ? Object.defineProperty(H, j, { value: N, enumerable: !0, configurable: !0, writable: !0 }) : H[j] = N, H;
        }
        function L(H, j) {
          if (!(H instanceof j))
            throw new TypeError("Cannot call a class as a function");
        }
        var D = /^[ -~]*$/, z = function() {
          function H(j) {
            L(this, H), this.scroll = j, this.delta = this.getDelta();
          }
          return _(H, [{
            key: "applyDelta",
            value: function(N) {
              var I = this, M = !1;
              this.scroll.update();
              var K = this.scroll.length();
              return this.scroll.batchStart(), N = J(N), N.reduce(function(C, q) {
                var F = q.retain || q.delete || q.insert.length || 1, G = q.attributes || {};
                if (q.insert != null) {
                  if (typeof q.insert == "string") {
                    var V = q.insert;
                    V.endsWith(`
`) && M && (M = !1, V = V.slice(0, -1)), C >= K && !V.endsWith(`
`) && (M = !0), I.scroll.insertAt(C, V);
                    var Q = I.scroll.line(C), nt = b(Q, 2), it = nt[0], at = nt[1], ft = (0, p.default)({}, (0, i.bubbleFormats)(it));
                    if (it instanceof c.default) {
                      var ht = it.descendant(e.default.Leaf, at), mt = b(ht, 1), gt = mt[0];
                      ft = (0, p.default)(ft, (0, i.bubbleFormats)(gt));
                    }
                    G = o.default.attributes.diff(ft, G) || {};
                  } else if (E(q.insert) === "object") {
                    var W = Object.keys(q.insert)[0];
                    if (W == null)
                      return C;
                    I.scroll.insertAt(C, W, q.insert[W]);
                  }
                  K += F;
                }
                return Object.keys(G).forEach(function(Y) {
                  I.scroll.formatAt(C, F, Y, G[Y]);
                }), C + F;
              }, 0), N.reduce(function(C, q) {
                return typeof q.delete == "number" ? (I.scroll.deleteAt(C, q.delete), C) : C + (q.retain || q.insert.length || 1);
              }, 0), this.scroll.batchEnd(), this.update(N);
            }
          }, {
            key: "deleteText",
            value: function(N, I) {
              return this.scroll.deleteAt(N, I), this.update(new y.default().retain(N).delete(I));
            }
          }, {
            key: "formatLine",
            value: function(N, I) {
              var M = this, K = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
              return this.scroll.update(), Object.keys(K).forEach(function(C) {
                if (!(M.scroll.whitelist != null && !M.scroll.whitelist[C])) {
                  var q = M.scroll.lines(N, Math.max(I, 1)), F = I;
                  q.forEach(function(G) {
                    var V = G.length();
                    if (!(G instanceof l.default))
                      G.format(C, K[C]);
                    else {
                      var Q = N - G.offset(M.scroll), nt = G.newlineIndex(Q + F) - Q + 1;
                      G.formatAt(Q, nt, C, K[C]);
                    }
                    F -= V;
                  });
                }
              }), this.scroll.optimize(), this.update(new y.default().retain(N).retain(I, (0, w.default)(K)));
            }
          }, {
            key: "formatText",
            value: function(N, I) {
              var M = this, K = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
              return Object.keys(K).forEach(function(C) {
                M.scroll.formatAt(N, I, C, K[C]);
              }), this.update(new y.default().retain(N).retain(I, (0, w.default)(K)));
            }
          }, {
            key: "getContents",
            value: function(N, I) {
              return this.delta.slice(N, N + I);
            }
          }, {
            key: "getDelta",
            value: function() {
              return this.scroll.lines().reduce(function(N, I) {
                return N.concat(I.delta());
              }, new y.default());
            }
          }, {
            key: "getFormat",
            value: function(N) {
              var I = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, M = [], K = [];
              I === 0 ? this.scroll.path(N).forEach(function(q) {
                var F = b(q, 1), G = F[0];
                G instanceof c.default ? M.push(G) : G instanceof e.default.Leaf && K.push(G);
              }) : (M = this.scroll.lines(N, I), K = this.scroll.descendants(e.default.Leaf, N, I));
              var C = [M, K].map(function(q) {
                if (q.length === 0)
                  return {};
                for (var F = (0, i.bubbleFormats)(q.shift()); Object.keys(F).length > 0; ) {
                  var G = q.shift();
                  if (G == null)
                    return F;
                  F = $((0, i.bubbleFormats)(G), F);
                }
                return F;
              });
              return p.default.apply(p.default, C);
            }
          }, {
            key: "getText",
            value: function(N, I) {
              return this.getContents(N, I).filter(function(M) {
                return typeof M.insert == "string";
              }).map(function(M) {
                return M.insert;
              }).join("");
            }
          }, {
            key: "insertEmbed",
            value: function(N, I, M) {
              return this.scroll.insertAt(N, I, M), this.update(new y.default().retain(N).insert(k({}, I, M)));
            }
          }, {
            key: "insertText",
            value: function(N, I) {
              var M = this, K = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
              return I = I.replace(/\r\n/g, `
`).replace(/\r/g, `
`), this.scroll.insertAt(N, I), Object.keys(K).forEach(function(C) {
                M.scroll.formatAt(N, I.length, C, K[C]);
              }), this.update(new y.default().retain(N).insert(I, (0, w.default)(K)));
            }
          }, {
            key: "isBlank",
            value: function() {
              if (this.scroll.children.length == 0)
                return !0;
              if (this.scroll.children.length > 1)
                return !1;
              var N = this.scroll.children.head;
              return N.statics.blotName !== c.default.blotName || N.children.length > 1 ? !1 : N.children.head instanceof v.default;
            }
          }, {
            key: "removeFormat",
            value: function(N, I) {
              var M = this.getText(N, I), K = this.scroll.line(N + I), C = b(K, 2), q = C[0], F = C[1], G = 0, V = new y.default();
              q != null && (q instanceof l.default ? G = q.newlineIndex(F) - F + 1 : G = q.length() - F, V = q.delta().slice(F, F + G - 1).insert(`
`));
              var Q = this.getContents(N, I + G), nt = Q.diff(new y.default().insert(M).concat(V)), it = new y.default().retain(N).concat(nt);
              return this.applyDelta(it);
            }
          }, {
            key: "update",
            value: function(N) {
              var I = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [], M = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : void 0, K = this.delta;
              if (I.length === 1 && I[0].type === "characterData" && I[0].target.data.match(D) && e.default.find(I[0].target)) {
                var C = e.default.find(I[0].target), q = (0, i.bubbleFormats)(C), F = C.offset(this.scroll), G = I[0].oldValue.replace(r.default.CONTENTS, ""), V = new y.default().insert(G), Q = new y.default().insert(C.value()), nt = new y.default().retain(F).concat(V.diff(Q, M));
                N = nt.reduce(function(it, at) {
                  return at.insert ? it.insert(at.insert, q) : it.push(at);
                }, new y.default()), this.delta = K.compose(N);
              } else
                this.delta = this.getDelta(), (!N || !(0, P.default)(K.compose(N), this.delta)) && (N = K.diff(this.delta, M));
              return N;
            }
          }]), H;
        }();
        function $(H, j) {
          return Object.keys(j).reduce(function(N, I) {
            return H[I] == null || (j[I] === H[I] ? N[I] = j[I] : Array.isArray(j[I]) ? j[I].indexOf(H[I]) < 0 && (N[I] = j[I].concat([H[I]])) : N[I] = [j[I], H[I]]), N;
          }, {});
        }
        function J(H) {
          return H.reduce(function(j, N) {
            if (N.insert === 1) {
              var I = (0, w.default)(N.attributes);
              return delete I.image, j.insert({ image: N.attributes.image }, I);
            }
            if (N.attributes != null && (N.attributes.list === !0 || N.attributes.bullet === !0) && (N = (0, w.default)(N), N.attributes.list ? N.attributes.list = "ordered" : (N.attributes.list = "bullet", delete N.attributes.bullet)), typeof N.insert == "string") {
              var M = N.insert.replace(/\r\n/g, `
`).replace(/\r/g, `
`);
              return j.insert(M, N.attributes);
            }
            return j.push(N);
          }, new y.default());
        }
        d.default = z;
      },
      function(m, d, f) {
        Object.defineProperty(d, "__esModule", {
          value: !0
        }), d.default = d.Range = void 0;
        var E = function() {
          function T(P, A) {
            var p = [], O = !0, k = !1, L = void 0;
            try {
              for (var D = P[Symbol.iterator](), z; !(O = (z = D.next()).done) && (p.push(z.value), !(A && p.length === A)); O = !0)
                ;
            } catch ($) {
              k = !0, L = $;
            } finally {
              try {
                !O && D.return && D.return();
              } finally {
                if (k)
                  throw L;
              }
            }
            return p;
          }
          return function(P, A) {
            if (Array.isArray(P))
              return P;
            if (Symbol.iterator in Object(P))
              return T(P, A);
            throw new TypeError("Invalid attempt to destructure non-iterable instance");
          };
        }(), b = function() {
          function T(P, A) {
            for (var p = 0; p < A.length; p++) {
              var O = A[p];
              O.enumerable = O.enumerable || !1, O.configurable = !0, "value" in O && (O.writable = !0), Object.defineProperty(P, O.key, O);
            }
          }
          return function(P, A, p) {
            return A && T(P.prototype, A), p && T(P, p), P;
          };
        }(), _ = f(0), g = r(_), y = f(21), h = r(y), o = f(11), t = r(o), e = f(8), s = r(e), l = f(10), u = r(l);
        function r(T) {
          return T && T.__esModule ? T : { default: T };
        }
        function i(T) {
          if (Array.isArray(T)) {
            for (var P = 0, A = Array(T.length); P < T.length; P++)
              A[P] = T[P];
            return A;
          } else
            return Array.from(T);
        }
        function c(T, P) {
          if (!(T instanceof P))
            throw new TypeError("Cannot call a class as a function");
        }
        var n = (0, u.default)("quill:selection"), v = function T(P) {
          var A = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
          c(this, T), this.index = P, this.length = A;
        }, S = function() {
          function T(P, A) {
            var p = this;
            c(this, T), this.emitter = A, this.scroll = P, this.composing = !1, this.mouseDown = !1, this.root = this.scroll.domNode, this.cursor = g.default.create("cursor", this), this.lastRange = this.savedRange = new v(0, 0), this.handleComposition(), this.handleDragging(), this.emitter.listenDOM("selectionchange", document, function() {
              p.mouseDown || setTimeout(p.update.bind(p, s.default.sources.USER), 1);
            }), this.emitter.on(s.default.events.EDITOR_CHANGE, function(O, k) {
              O === s.default.events.TEXT_CHANGE && k.length() > 0 && p.update(s.default.sources.SILENT);
            }), this.emitter.on(s.default.events.SCROLL_BEFORE_UPDATE, function() {
              if (!!p.hasFocus()) {
                var O = p.getNativeRange();
                O != null && O.start.node !== p.cursor.textNode && p.emitter.once(s.default.events.SCROLL_UPDATE, function() {
                  try {
                    p.setNativeRange(O.start.node, O.start.offset, O.end.node, O.end.offset);
                  } catch {
                  }
                });
              }
            }), this.emitter.on(s.default.events.SCROLL_OPTIMIZE, function(O, k) {
              if (k.range) {
                var L = k.range, D = L.startNode, z = L.startOffset, $ = L.endNode, J = L.endOffset;
                p.setNativeRange(D, z, $, J);
              }
            }), this.update(s.default.sources.SILENT);
          }
          return b(T, [{
            key: "handleComposition",
            value: function() {
              var A = this;
              this.root.addEventListener("compositionstart", function() {
                A.composing = !0;
              }), this.root.addEventListener("compositionend", function() {
                if (A.composing = !1, A.cursor.parent) {
                  var p = A.cursor.restore();
                  if (!p)
                    return;
                  setTimeout(function() {
                    A.setNativeRange(p.startNode, p.startOffset, p.endNode, p.endOffset);
                  }, 1);
                }
              });
            }
          }, {
            key: "handleDragging",
            value: function() {
              var A = this;
              this.emitter.listenDOM("mousedown", document.body, function() {
                A.mouseDown = !0;
              }), this.emitter.listenDOM("mouseup", document.body, function() {
                A.mouseDown = !1, A.update(s.default.sources.USER);
              });
            }
          }, {
            key: "focus",
            value: function() {
              this.hasFocus() || (this.root.focus(), this.setRange(this.savedRange));
            }
          }, {
            key: "format",
            value: function(A, p) {
              if (!(this.scroll.whitelist != null && !this.scroll.whitelist[A])) {
                this.scroll.update();
                var O = this.getNativeRange();
                if (!(O == null || !O.native.collapsed || g.default.query(A, g.default.Scope.BLOCK))) {
                  if (O.start.node !== this.cursor.textNode) {
                    var k = g.default.find(O.start.node, !1);
                    if (k == null)
                      return;
                    if (k instanceof g.default.Leaf) {
                      var L = k.split(O.start.offset);
                      k.parent.insertBefore(this.cursor, L);
                    } else
                      k.insertBefore(this.cursor, O.start.node);
                    this.cursor.attach();
                  }
                  this.cursor.format(A, p), this.scroll.optimize(), this.setNativeRange(this.cursor.textNode, this.cursor.textNode.data.length), this.update();
                }
              }
            }
          }, {
            key: "getBounds",
            value: function(A) {
              var p = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, O = this.scroll.length();
              A = Math.min(A, O - 1), p = Math.min(A + p, O - 1) - A;
              var k = void 0, L = this.scroll.leaf(A), D = E(L, 2), z = D[0], $ = D[1];
              if (z == null)
                return null;
              var J = z.position($, !0), H = E(J, 2);
              k = H[0], $ = H[1];
              var j = document.createRange();
              if (p > 0) {
                j.setStart(k, $);
                var N = this.scroll.leaf(A + p), I = E(N, 2);
                if (z = I[0], $ = I[1], z == null)
                  return null;
                var M = z.position($, !0), K = E(M, 2);
                return k = K[0], $ = K[1], j.setEnd(k, $), j.getBoundingClientRect();
              } else {
                var C = "left", q = void 0;
                return k instanceof Text ? ($ < k.data.length ? (j.setStart(k, $), j.setEnd(k, $ + 1)) : (j.setStart(k, $ - 1), j.setEnd(k, $), C = "right"), q = j.getBoundingClientRect()) : (q = z.domNode.getBoundingClientRect(), $ > 0 && (C = "right")), {
                  bottom: q.top + q.height,
                  height: q.height,
                  left: q[C],
                  right: q[C],
                  top: q.top,
                  width: 0
                };
              }
            }
          }, {
            key: "getNativeRange",
            value: function() {
              var A = document.getSelection();
              if (A == null || A.rangeCount <= 0)
                return null;
              var p = A.getRangeAt(0);
              if (p == null)
                return null;
              var O = this.normalizeNative(p);
              return n.info("getNativeRange", O), O;
            }
          }, {
            key: "getRange",
            value: function() {
              var A = this.getNativeRange();
              if (A == null)
                return [null, null];
              var p = this.normalizedToRange(A);
              return [p, A];
            }
          }, {
            key: "hasFocus",
            value: function() {
              return document.activeElement === this.root;
            }
          }, {
            key: "normalizedToRange",
            value: function(A) {
              var p = this, O = [[A.start.node, A.start.offset]];
              A.native.collapsed || O.push([A.end.node, A.end.offset]);
              var k = O.map(function(z) {
                var $ = E(z, 2), J = $[0], H = $[1], j = g.default.find(J, !0), N = j.offset(p.scroll);
                return H === 0 ? N : j instanceof g.default.Container ? N + j.length() : N + j.index(J, H);
              }), L = Math.min(Math.max.apply(Math, i(k)), this.scroll.length() - 1), D = Math.min.apply(Math, [L].concat(i(k)));
              return new v(D, L - D);
            }
          }, {
            key: "normalizeNative",
            value: function(A) {
              if (!w(this.root, A.startContainer) || !A.collapsed && !w(this.root, A.endContainer))
                return null;
              var p = {
                start: { node: A.startContainer, offset: A.startOffset },
                end: { node: A.endContainer, offset: A.endOffset },
                native: A
              };
              return [p.start, p.end].forEach(function(O) {
                for (var k = O.node, L = O.offset; !(k instanceof Text) && k.childNodes.length > 0; )
                  if (k.childNodes.length > L)
                    k = k.childNodes[L], L = 0;
                  else if (k.childNodes.length === L)
                    k = k.lastChild, L = k instanceof Text ? k.data.length : k.childNodes.length + 1;
                  else
                    break;
                O.node = k, O.offset = L;
              }), p;
            }
          }, {
            key: "rangeToNative",
            value: function(A) {
              var p = this, O = A.collapsed ? [A.index] : [A.index, A.index + A.length], k = [], L = this.scroll.length();
              return O.forEach(function(D, z) {
                D = Math.min(L - 1, D);
                var $ = void 0, J = p.scroll.leaf(D), H = E(J, 2), j = H[0], N = H[1], I = j.position(N, z !== 0), M = E(I, 2);
                $ = M[0], N = M[1], k.push($, N);
              }), k.length < 2 && (k = k.concat(k)), k;
            }
          }, {
            key: "scrollIntoView",
            value: function(A) {
              var p = this.lastRange;
              if (p != null) {
                var O = this.getBounds(p.index, p.length);
                if (O != null) {
                  var k = this.scroll.length() - 1, L = this.scroll.line(Math.min(p.index, k)), D = E(L, 1), z = D[0], $ = z;
                  if (p.length > 0) {
                    var J = this.scroll.line(Math.min(p.index + p.length, k)), H = E(J, 1);
                    $ = H[0];
                  }
                  if (!(z == null || $ == null)) {
                    var j = A.getBoundingClientRect();
                    O.top < j.top ? A.scrollTop -= j.top - O.top : O.bottom > j.bottom && (A.scrollTop += O.bottom - j.bottom);
                  }
                }
              }
            }
          }, {
            key: "setNativeRange",
            value: function(A, p) {
              var O = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : A, k = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : p, L = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : !1;
              if (n.info("setNativeRange", A, p, O, k), !(A != null && (this.root.parentNode == null || A.parentNode == null || O.parentNode == null))) {
                var D = document.getSelection();
                if (D != null)
                  if (A != null) {
                    this.hasFocus() || this.root.focus();
                    var z = (this.getNativeRange() || {}).native;
                    if (z == null || L || A !== z.startContainer || p !== z.startOffset || O !== z.endContainer || k !== z.endOffset) {
                      A.tagName == "BR" && (p = [].indexOf.call(A.parentNode.childNodes, A), A = A.parentNode), O.tagName == "BR" && (k = [].indexOf.call(O.parentNode.childNodes, O), O = O.parentNode);
                      var $ = document.createRange();
                      $.setStart(A, p), $.setEnd(O, k), D.removeAllRanges(), D.addRange($);
                    }
                  } else
                    D.removeAllRanges(), this.root.blur(), document.body.focus();
              }
            }
          }, {
            key: "setRange",
            value: function(A) {
              var p = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, O = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : s.default.sources.API;
              if (typeof p == "string" && (O = p, p = !1), n.info("setRange", A), A != null) {
                var k = this.rangeToNative(A);
                this.setNativeRange.apply(this, i(k).concat([p]));
              } else
                this.setNativeRange(null);
              this.update(O);
            }
          }, {
            key: "update",
            value: function() {
              var A = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : s.default.sources.USER, p = this.lastRange, O = this.getRange(), k = E(O, 2), L = k[0], D = k[1];
              if (this.lastRange = L, this.lastRange != null && (this.savedRange = this.lastRange), !(0, t.default)(p, this.lastRange)) {
                var z;
                !this.composing && D != null && D.native.collapsed && D.start.node !== this.cursor.textNode && this.cursor.restore();
                var $ = [s.default.events.SELECTION_CHANGE, (0, h.default)(this.lastRange), (0, h.default)(p), A];
                if ((z = this.emitter).emit.apply(z, [s.default.events.EDITOR_CHANGE].concat($)), A !== s.default.sources.SILENT) {
                  var J;
                  (J = this.emitter).emit.apply(J, $);
                }
              }
            }
          }]), T;
        }();
        function w(T, P) {
          try {
            P.parentNode;
          } catch {
            return !1;
          }
          return P instanceof Text && (P = P.parentNode), T.contains(P);
        }
        d.Range = v, d.default = S;
      },
      function(m, d, f) {
        Object.defineProperty(d, "__esModule", {
          value: !0
        });
        var E = function() {
          function s(l, u) {
            for (var r = 0; r < u.length; r++) {
              var i = u[r];
              i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(l, i.key, i);
            }
          }
          return function(l, u, r) {
            return u && s(l.prototype, u), r && s(l, r), l;
          };
        }(), b = function s(l, u, r) {
          l === null && (l = Function.prototype);
          var i = Object.getOwnPropertyDescriptor(l, u);
          if (i === void 0) {
            var c = Object.getPrototypeOf(l);
            return c === null ? void 0 : s(c, u, r);
          } else {
            if ("value" in i)
              return i.value;
            var n = i.get;
            return n === void 0 ? void 0 : n.call(r);
          }
        }, _ = f(0), g = y(_);
        function y(s) {
          return s && s.__esModule ? s : { default: s };
        }
        function h(s, l) {
          if (!(s instanceof l))
            throw new TypeError("Cannot call a class as a function");
        }
        function o(s, l) {
          if (!s)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return l && (typeof l == "object" || typeof l == "function") ? l : s;
        }
        function t(s, l) {
          if (typeof l != "function" && l !== null)
            throw new TypeError("Super expression must either be null or a function, not " + typeof l);
          s.prototype = Object.create(l && l.prototype, { constructor: { value: s, enumerable: !1, writable: !0, configurable: !0 } }), l && (Object.setPrototypeOf ? Object.setPrototypeOf(s, l) : s.__proto__ = l);
        }
        var e = function(s) {
          t(l, s);
          function l() {
            return h(this, l), o(this, (l.__proto__ || Object.getPrototypeOf(l)).apply(this, arguments));
          }
          return E(l, [{
            key: "insertInto",
            value: function(r, i) {
              r.children.length === 0 ? b(l.prototype.__proto__ || Object.getPrototypeOf(l.prototype), "insertInto", this).call(this, r, i) : this.remove();
            }
          }, {
            key: "length",
            value: function() {
              return 0;
            }
          }, {
            key: "value",
            value: function() {
              return "";
            }
          }], [{
            key: "value",
            value: function() {
            }
          }]), l;
        }(g.default.Embed);
        e.blotName = "break", e.tagName = "BR", d.default = e;
      },
      function(m, d, f) {
        var E = this && this.__extends || function() {
          var o = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t, e) {
            t.__proto__ = e;
          } || function(t, e) {
            for (var s in e)
              e.hasOwnProperty(s) && (t[s] = e[s]);
          };
          return function(t, e) {
            o(t, e);
            function s() {
              this.constructor = t;
            }
            t.prototype = e === null ? Object.create(e) : (s.prototype = e.prototype, new s());
          };
        }();
        Object.defineProperty(d, "__esModule", { value: !0 });
        var b = f(44), _ = f(30), g = f(1), y = function(o) {
          E(t, o);
          function t(e) {
            var s = o.call(this, e) || this;
            return s.build(), s;
          }
          return t.prototype.appendChild = function(e) {
            this.insertBefore(e);
          }, t.prototype.attach = function() {
            o.prototype.attach.call(this), this.children.forEach(function(e) {
              e.attach();
            });
          }, t.prototype.build = function() {
            var e = this;
            this.children = new b.default(), [].slice.call(this.domNode.childNodes).reverse().forEach(function(s) {
              try {
                var l = h(s);
                e.insertBefore(l, e.children.head || void 0);
              } catch (u) {
                if (u instanceof g.ParchmentError)
                  return;
                throw u;
              }
            });
          }, t.prototype.deleteAt = function(e, s) {
            if (e === 0 && s === this.length())
              return this.remove();
            this.children.forEachAt(e, s, function(l, u, r) {
              l.deleteAt(u, r);
            });
          }, t.prototype.descendant = function(e, s) {
            var l = this.children.find(s), u = l[0], r = l[1];
            return e.blotName == null && e(u) || e.blotName != null && u instanceof e ? [u, r] : u instanceof t ? u.descendant(e, r) : [null, -1];
          }, t.prototype.descendants = function(e, s, l) {
            s === void 0 && (s = 0), l === void 0 && (l = Number.MAX_VALUE);
            var u = [], r = l;
            return this.children.forEachAt(s, l, function(i, c, n) {
              (e.blotName == null && e(i) || e.blotName != null && i instanceof e) && u.push(i), i instanceof t && (u = u.concat(i.descendants(e, c, r))), r -= n;
            }), u;
          }, t.prototype.detach = function() {
            this.children.forEach(function(e) {
              e.detach();
            }), o.prototype.detach.call(this);
          }, t.prototype.formatAt = function(e, s, l, u) {
            this.children.forEachAt(e, s, function(r, i, c) {
              r.formatAt(i, c, l, u);
            });
          }, t.prototype.insertAt = function(e, s, l) {
            var u = this.children.find(e), r = u[0], i = u[1];
            if (r)
              r.insertAt(i, s, l);
            else {
              var c = l == null ? g.create("text", s) : g.create(s, l);
              this.appendChild(c);
            }
          }, t.prototype.insertBefore = function(e, s) {
            if (this.statics.allowedChildren != null && !this.statics.allowedChildren.some(function(l) {
              return e instanceof l;
            }))
              throw new g.ParchmentError("Cannot insert " + e.statics.blotName + " into " + this.statics.blotName);
            e.insertInto(this, s);
          }, t.prototype.length = function() {
            return this.children.reduce(function(e, s) {
              return e + s.length();
            }, 0);
          }, t.prototype.moveChildren = function(e, s) {
            this.children.forEach(function(l) {
              e.insertBefore(l, s);
            });
          }, t.prototype.optimize = function(e) {
            if (o.prototype.optimize.call(this, e), this.children.length === 0)
              if (this.statics.defaultChild != null) {
                var s = g.create(this.statics.defaultChild);
                this.appendChild(s), s.optimize(e);
              } else
                this.remove();
          }, t.prototype.path = function(e, s) {
            s === void 0 && (s = !1);
            var l = this.children.find(e, s), u = l[0], r = l[1], i = [[this, e]];
            return u instanceof t ? i.concat(u.path(r, s)) : (u != null && i.push([u, r]), i);
          }, t.prototype.removeChild = function(e) {
            this.children.remove(e);
          }, t.prototype.replace = function(e) {
            e instanceof t && e.moveChildren(this), o.prototype.replace.call(this, e);
          }, t.prototype.split = function(e, s) {
            if (s === void 0 && (s = !1), !s) {
              if (e === 0)
                return this;
              if (e === this.length())
                return this.next;
            }
            var l = this.clone();
            return this.parent.insertBefore(l, this.next), this.children.forEachAt(e, this.length(), function(u, r, i) {
              u = u.split(r, s), l.appendChild(u);
            }), l;
          }, t.prototype.unwrap = function() {
            this.moveChildren(this.parent, this.next), this.remove();
          }, t.prototype.update = function(e, s) {
            var l = this, u = [], r = [];
            e.forEach(function(i) {
              i.target === l.domNode && i.type === "childList" && (u.push.apply(u, i.addedNodes), r.push.apply(r, i.removedNodes));
            }), r.forEach(function(i) {
              if (!(i.parentNode != null && i.tagName !== "IFRAME" && document.body.compareDocumentPosition(i) & Node.DOCUMENT_POSITION_CONTAINED_BY)) {
                var c = g.find(i);
                c != null && (c.domNode.parentNode == null || c.domNode.parentNode === l.domNode) && c.detach();
              }
            }), u.filter(function(i) {
              return i.parentNode == l.domNode;
            }).sort(function(i, c) {
              return i === c ? 0 : i.compareDocumentPosition(c) & Node.DOCUMENT_POSITION_FOLLOWING ? 1 : -1;
            }).forEach(function(i) {
              var c = null;
              i.nextSibling != null && (c = g.find(i.nextSibling));
              var n = h(i);
              (n.next != c || n.next == null) && (n.parent != null && n.parent.removeChild(l), l.insertBefore(n, c || void 0));
            });
          }, t;
        }(_.default);
        function h(o) {
          var t = g.find(o);
          if (t == null)
            try {
              t = g.create(o);
            } catch {
              t = g.create(g.Scope.INLINE), [].slice.call(o.childNodes).forEach(function(s) {
                t.domNode.appendChild(s);
              }), o.parentNode && o.parentNode.replaceChild(t.domNode, o), t.attach();
            }
          return t;
        }
        d.default = y;
      },
      function(m, d, f) {
        var E = this && this.__extends || function() {
          var o = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t, e) {
            t.__proto__ = e;
          } || function(t, e) {
            for (var s in e)
              e.hasOwnProperty(s) && (t[s] = e[s]);
          };
          return function(t, e) {
            o(t, e);
            function s() {
              this.constructor = t;
            }
            t.prototype = e === null ? Object.create(e) : (s.prototype = e.prototype, new s());
          };
        }();
        Object.defineProperty(d, "__esModule", { value: !0 });
        var b = f(12), _ = f(31), g = f(17), y = f(1), h = function(o) {
          E(t, o);
          function t(e) {
            var s = o.call(this, e) || this;
            return s.attributes = new _.default(s.domNode), s;
          }
          return t.formats = function(e) {
            if (typeof this.tagName == "string")
              return !0;
            if (Array.isArray(this.tagName))
              return e.tagName.toLowerCase();
          }, t.prototype.format = function(e, s) {
            var l = y.query(e);
            l instanceof b.default ? this.attributes.attribute(l, s) : s && l != null && (e !== this.statics.blotName || this.formats()[e] !== s) && this.replaceWith(e, s);
          }, t.prototype.formats = function() {
            var e = this.attributes.values(), s = this.statics.formats(this.domNode);
            return s != null && (e[this.statics.blotName] = s), e;
          }, t.prototype.replaceWith = function(e, s) {
            var l = o.prototype.replaceWith.call(this, e, s);
            return this.attributes.copy(l), l;
          }, t.prototype.update = function(e, s) {
            var l = this;
            o.prototype.update.call(this, e, s), e.some(function(u) {
              return u.target === l.domNode && u.type === "attributes";
            }) && this.attributes.build();
          }, t.prototype.wrap = function(e, s) {
            var l = o.prototype.wrap.call(this, e, s);
            return l instanceof t && l.statics.scope === this.statics.scope && this.attributes.move(l), l;
          }, t;
        }(g.default);
        d.default = h;
      },
      function(m, d, f) {
        var E = this && this.__extends || function() {
          var y = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(h, o) {
            h.__proto__ = o;
          } || function(h, o) {
            for (var t in o)
              o.hasOwnProperty(t) && (h[t] = o[t]);
          };
          return function(h, o) {
            y(h, o);
            function t() {
              this.constructor = h;
            }
            h.prototype = o === null ? Object.create(o) : (t.prototype = o.prototype, new t());
          };
        }();
        Object.defineProperty(d, "__esModule", { value: !0 });
        var b = f(30), _ = f(1), g = function(y) {
          E(h, y);
          function h() {
            return y !== null && y.apply(this, arguments) || this;
          }
          return h.value = function(o) {
            return !0;
          }, h.prototype.index = function(o, t) {
            return this.domNode === o || this.domNode.compareDocumentPosition(o) & Node.DOCUMENT_POSITION_CONTAINED_BY ? Math.min(t, 1) : -1;
          }, h.prototype.position = function(o, t) {
            var e = [].indexOf.call(this.parent.domNode.childNodes, this.domNode);
            return o > 0 && (e += 1), [this.parent.domNode, e];
          }, h.prototype.value = function() {
            var o;
            return o = {}, o[this.statics.blotName] = this.statics.value(this.domNode) || !0, o;
          }, h.scope = _.Scope.INLINE_BLOT, h;
        }(b.default);
        d.default = g;
      },
      function(m, d, f) {
        var E = f(11), b = f(3), _ = {
          attributes: {
            compose: function(y, h, o) {
              typeof y != "object" && (y = {}), typeof h != "object" && (h = {});
              var t = b(!0, {}, h);
              o || (t = Object.keys(t).reduce(function(s, l) {
                return t[l] != null && (s[l] = t[l]), s;
              }, {}));
              for (var e in y)
                y[e] !== void 0 && h[e] === void 0 && (t[e] = y[e]);
              return Object.keys(t).length > 0 ? t : void 0;
            },
            diff: function(y, h) {
              typeof y != "object" && (y = {}), typeof h != "object" && (h = {});
              var o = Object.keys(y).concat(Object.keys(h)).reduce(function(t, e) {
                return E(y[e], h[e]) || (t[e] = h[e] === void 0 ? null : h[e]), t;
              }, {});
              return Object.keys(o).length > 0 ? o : void 0;
            },
            transform: function(y, h, o) {
              if (typeof y != "object")
                return h;
              if (typeof h == "object") {
                if (!o)
                  return h;
                var t = Object.keys(h).reduce(function(e, s) {
                  return y[s] === void 0 && (e[s] = h[s]), e;
                }, {});
                return Object.keys(t).length > 0 ? t : void 0;
              }
            }
          },
          iterator: function(y) {
            return new g(y);
          },
          length: function(y) {
            return typeof y.delete == "number" ? y.delete : typeof y.retain == "number" ? y.retain : typeof y.insert == "string" ? y.insert.length : 1;
          }
        };
        function g(y) {
          this.ops = y, this.index = 0, this.offset = 0;
        }
        g.prototype.hasNext = function() {
          return this.peekLength() < 1 / 0;
        }, g.prototype.next = function(y) {
          y || (y = 1 / 0);
          var h = this.ops[this.index];
          if (h) {
            var o = this.offset, t = _.length(h);
            if (y >= t - o ? (y = t - o, this.index += 1, this.offset = 0) : this.offset += y, typeof h.delete == "number")
              return { delete: y };
            var e = {};
            return h.attributes && (e.attributes = h.attributes), typeof h.retain == "number" ? e.retain = y : typeof h.insert == "string" ? e.insert = h.insert.substr(o, y) : e.insert = h.insert, e;
          } else
            return { retain: 1 / 0 };
        }, g.prototype.peek = function() {
          return this.ops[this.index];
        }, g.prototype.peekLength = function() {
          return this.ops[this.index] ? _.length(this.ops[this.index]) - this.offset : 1 / 0;
        }, g.prototype.peekType = function() {
          return this.ops[this.index] ? typeof this.ops[this.index].delete == "number" ? "delete" : typeof this.ops[this.index].retain == "number" ? "retain" : "insert" : "retain";
        }, g.prototype.rest = function() {
          if (this.hasNext()) {
            if (this.offset === 0)
              return this.ops.slice(this.index);
            var y = this.offset, h = this.index, o = this.next(), t = this.ops.slice(this.index);
            return this.offset = y, this.index = h, [o].concat(t);
          } else
            return [];
        }, m.exports = _;
      },
      function(m, d) {
        var f = function() {
          function E(l, u) {
            return u != null && l instanceof u;
          }
          var b;
          try {
            b = Map;
          } catch {
            b = function() {
            };
          }
          var _;
          try {
            _ = Set;
          } catch {
            _ = function() {
            };
          }
          var g;
          try {
            g = Promise;
          } catch {
            g = function() {
            };
          }
          function y(l, u, r, i, c) {
            typeof u == "object" && (r = u.depth, i = u.prototype, c = u.includeNonEnumerable, u = u.circular);
            var n = [], v = [], S = typeof Buffer < "u";
            typeof u > "u" && (u = !0), typeof r > "u" && (r = 1 / 0);
            function w(T, P) {
              if (T === null)
                return null;
              if (P === 0)
                return T;
              var A, p;
              if (typeof T != "object")
                return T;
              if (E(T, b))
                A = new b();
              else if (E(T, _))
                A = new _();
              else if (E(T, g))
                A = new g(function(j, N) {
                  T.then(function(I) {
                    j(w(I, P - 1));
                  }, function(I) {
                    N(w(I, P - 1));
                  });
                });
              else if (y.__isArray(T))
                A = [];
              else if (y.__isRegExp(T))
                A = new RegExp(T.source, s(T)), T.lastIndex && (A.lastIndex = T.lastIndex);
              else if (y.__isDate(T))
                A = new Date(T.getTime());
              else {
                if (S && Buffer.isBuffer(T))
                  return Buffer.allocUnsafe ? A = Buffer.allocUnsafe(T.length) : A = new Buffer(T.length), T.copy(A), A;
                E(T, Error) ? A = Object.create(T) : typeof i > "u" ? (p = Object.getPrototypeOf(T), A = Object.create(p)) : (A = Object.create(i), p = i);
              }
              if (u) {
                var O = n.indexOf(T);
                if (O != -1)
                  return v[O];
                n.push(T), v.push(A);
              }
              E(T, b) && T.forEach(function(j, N) {
                var I = w(N, P - 1), M = w(j, P - 1);
                A.set(I, M);
              }), E(T, _) && T.forEach(function(j) {
                var N = w(j, P - 1);
                A.add(N);
              });
              for (var k in T) {
                var L;
                p && (L = Object.getOwnPropertyDescriptor(p, k)), !(L && L.set == null) && (A[k] = w(T[k], P - 1));
              }
              if (Object.getOwnPropertySymbols)
                for (var D = Object.getOwnPropertySymbols(T), k = 0; k < D.length; k++) {
                  var z = D[k], $ = Object.getOwnPropertyDescriptor(T, z);
                  $ && !$.enumerable && !c || (A[z] = w(T[z], P - 1), $.enumerable || Object.defineProperty(A, z, {
                    enumerable: !1
                  }));
                }
              if (c)
                for (var J = Object.getOwnPropertyNames(T), k = 0; k < J.length; k++) {
                  var H = J[k], $ = Object.getOwnPropertyDescriptor(T, H);
                  $ && $.enumerable || (A[H] = w(T[H], P - 1), Object.defineProperty(A, H, {
                    enumerable: !1
                  }));
                }
              return A;
            }
            return w(l, r);
          }
          y.clonePrototype = function(u) {
            if (u === null)
              return null;
            var r = function() {
            };
            return r.prototype = u, new r();
          };
          function h(l) {
            return Object.prototype.toString.call(l);
          }
          y.__objToStr = h;
          function o(l) {
            return typeof l == "object" && h(l) === "[object Date]";
          }
          y.__isDate = o;
          function t(l) {
            return typeof l == "object" && h(l) === "[object Array]";
          }
          y.__isArray = t;
          function e(l) {
            return typeof l == "object" && h(l) === "[object RegExp]";
          }
          y.__isRegExp = e;
          function s(l) {
            var u = "";
            return l.global && (u += "g"), l.ignoreCase && (u += "i"), l.multiline && (u += "m"), u;
          }
          return y.__getRegExpFlags = s, y;
        }();
        typeof m == "object" && m.exports && (m.exports = f);
      },
      function(m, d, f) {
        Object.defineProperty(d, "__esModule", {
          value: !0
        });
        var E = function() {
          function A(p, O) {
            var k = [], L = !0, D = !1, z = void 0;
            try {
              for (var $ = p[Symbol.iterator](), J; !(L = (J = $.next()).done) && (k.push(J.value), !(O && k.length === O)); L = !0)
                ;
            } catch (H) {
              D = !0, z = H;
            } finally {
              try {
                !L && $.return && $.return();
              } finally {
                if (D)
                  throw z;
              }
            }
            return k;
          }
          return function(p, O) {
            if (Array.isArray(p))
              return p;
            if (Symbol.iterator in Object(p))
              return A(p, O);
            throw new TypeError("Invalid attempt to destructure non-iterable instance");
          };
        }(), b = function() {
          function A(p, O) {
            for (var k = 0; k < O.length; k++) {
              var L = O[k];
              L.enumerable = L.enumerable || !1, L.configurable = !0, "value" in L && (L.writable = !0), Object.defineProperty(p, L.key, L);
            }
          }
          return function(p, O, k) {
            return O && A(p.prototype, O), k && A(p, k), p;
          };
        }(), _ = function A(p, O, k) {
          p === null && (p = Function.prototype);
          var L = Object.getOwnPropertyDescriptor(p, O);
          if (L === void 0) {
            var D = Object.getPrototypeOf(p);
            return D === null ? void 0 : A(D, O, k);
          } else {
            if ("value" in L)
              return L.value;
            var z = L.get;
            return z === void 0 ? void 0 : z.call(k);
          }
        }, g = f(0), y = n(g), h = f(8), o = n(h), t = f(4), e = n(t), s = f(16), l = n(s), u = f(13), r = n(u), i = f(25), c = n(i);
        function n(A) {
          return A && A.__esModule ? A : { default: A };
        }
        function v(A, p) {
          if (!(A instanceof p))
            throw new TypeError("Cannot call a class as a function");
        }
        function S(A, p) {
          if (!A)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return p && (typeof p == "object" || typeof p == "function") ? p : A;
        }
        function w(A, p) {
          if (typeof p != "function" && p !== null)
            throw new TypeError("Super expression must either be null or a function, not " + typeof p);
          A.prototype = Object.create(p && p.prototype, { constructor: { value: A, enumerable: !1, writable: !0, configurable: !0 } }), p && (Object.setPrototypeOf ? Object.setPrototypeOf(A, p) : A.__proto__ = p);
        }
        function T(A) {
          return A instanceof e.default || A instanceof t.BlockEmbed;
        }
        var P = function(A) {
          w(p, A);
          function p(O, k) {
            v(this, p);
            var L = S(this, (p.__proto__ || Object.getPrototypeOf(p)).call(this, O));
            return L.emitter = k.emitter, Array.isArray(k.whitelist) && (L.whitelist = k.whitelist.reduce(function(D, z) {
              return D[z] = !0, D;
            }, {})), L.domNode.addEventListener("DOMNodeInserted", function() {
            }), L.optimize(), L.enable(), L;
          }
          return b(p, [{
            key: "batchStart",
            value: function() {
              this.batch = !0;
            }
          }, {
            key: "batchEnd",
            value: function() {
              this.batch = !1, this.optimize();
            }
          }, {
            key: "deleteAt",
            value: function(k, L) {
              var D = this.line(k), z = E(D, 2), $ = z[0], J = z[1], H = this.line(k + L), j = E(H, 1), N = j[0];
              if (_(p.prototype.__proto__ || Object.getPrototypeOf(p.prototype), "deleteAt", this).call(this, k, L), N != null && $ !== N && J > 0) {
                if ($ instanceof t.BlockEmbed || N instanceof t.BlockEmbed) {
                  this.optimize();
                  return;
                }
                if ($ instanceof r.default) {
                  var I = $.newlineIndex($.length(), !0);
                  if (I > -1 && ($ = $.split(I + 1), $ === N)) {
                    this.optimize();
                    return;
                  }
                } else if (N instanceof r.default) {
                  var M = N.newlineIndex(0);
                  M > -1 && N.split(M + 1);
                }
                var K = N.children.head instanceof l.default ? null : N.children.head;
                $.moveChildren(N, K), $.remove();
              }
              this.optimize();
            }
          }, {
            key: "enable",
            value: function() {
              var k = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0;
              this.domNode.setAttribute("contenteditable", k);
            }
          }, {
            key: "formatAt",
            value: function(k, L, D, z) {
              this.whitelist != null && !this.whitelist[D] || (_(p.prototype.__proto__ || Object.getPrototypeOf(p.prototype), "formatAt", this).call(this, k, L, D, z), this.optimize());
            }
          }, {
            key: "insertAt",
            value: function(k, L, D) {
              if (!(D != null && this.whitelist != null && !this.whitelist[L])) {
                if (k >= this.length())
                  if (D == null || y.default.query(L, y.default.Scope.BLOCK) == null) {
                    var z = y.default.create(this.statics.defaultChild);
                    this.appendChild(z), D == null && L.endsWith(`
`) && (L = L.slice(0, -1)), z.insertAt(0, L, D);
                  } else {
                    var $ = y.default.create(L, D);
                    this.appendChild($);
                  }
                else
                  _(p.prototype.__proto__ || Object.getPrototypeOf(p.prototype), "insertAt", this).call(this, k, L, D);
                this.optimize();
              }
            }
          }, {
            key: "insertBefore",
            value: function(k, L) {
              if (k.statics.scope === y.default.Scope.INLINE_BLOT) {
                var D = y.default.create(this.statics.defaultChild);
                D.appendChild(k), k = D;
              }
              _(p.prototype.__proto__ || Object.getPrototypeOf(p.prototype), "insertBefore", this).call(this, k, L);
            }
          }, {
            key: "leaf",
            value: function(k) {
              return this.path(k).pop() || [null, -1];
            }
          }, {
            key: "line",
            value: function(k) {
              return k === this.length() ? this.line(k - 1) : this.descendant(T, k);
            }
          }, {
            key: "lines",
            value: function() {
              var k = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0, L = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Number.MAX_VALUE, D = function z($, J, H) {
                var j = [], N = H;
                return $.children.forEachAt(J, H, function(I, M, K) {
                  T(I) ? j.push(I) : I instanceof y.default.Container && (j = j.concat(z(I, M, N))), N -= K;
                }), j;
              };
              return D(this, k, L);
            }
          }, {
            key: "optimize",
            value: function() {
              var k = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], L = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
              this.batch !== !0 && (_(p.prototype.__proto__ || Object.getPrototypeOf(p.prototype), "optimize", this).call(this, k, L), k.length > 0 && this.emitter.emit(o.default.events.SCROLL_OPTIMIZE, k, L));
            }
          }, {
            key: "path",
            value: function(k) {
              return _(p.prototype.__proto__ || Object.getPrototypeOf(p.prototype), "path", this).call(this, k).slice(1);
            }
          }, {
            key: "update",
            value: function(k) {
              if (this.batch !== !0) {
                var L = o.default.sources.USER;
                typeof k == "string" && (L = k), Array.isArray(k) || (k = this.observer.takeRecords()), k.length > 0 && this.emitter.emit(o.default.events.SCROLL_BEFORE_UPDATE, L, k), _(p.prototype.__proto__ || Object.getPrototypeOf(p.prototype), "update", this).call(this, k.concat([])), k.length > 0 && this.emitter.emit(o.default.events.SCROLL_UPDATE, L, k);
              }
            }
          }]), p;
        }(y.default.Scroll);
        P.blotName = "scroll", P.className = "ql-editor", P.tagName = "DIV", P.defaultChild = "block", P.allowedChildren = [e.default, t.BlockEmbed, c.default], d.default = P;
      },
      function(m, d, f) {
        Object.defineProperty(d, "__esModule", {
          value: !0
        }), d.SHORTKEY = d.default = void 0;
        var E = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(q) {
          return typeof q;
        } : function(q) {
          return q && typeof Symbol == "function" && q.constructor === Symbol && q !== Symbol.prototype ? "symbol" : typeof q;
        }, b = function() {
          function q(F, G) {
            var V = [], Q = !0, nt = !1, it = void 0;
            try {
              for (var at = F[Symbol.iterator](), ft; !(Q = (ft = at.next()).done) && (V.push(ft.value), !(G && V.length === G)); Q = !0)
                ;
            } catch (ht) {
              nt = !0, it = ht;
            } finally {
              try {
                !Q && at.return && at.return();
              } finally {
                if (nt)
                  throw it;
              }
            }
            return V;
          }
          return function(F, G) {
            if (Array.isArray(F))
              return F;
            if (Symbol.iterator in Object(F))
              return q(F, G);
            throw new TypeError("Invalid attempt to destructure non-iterable instance");
          };
        }(), _ = function() {
          function q(F, G) {
            for (var V = 0; V < G.length; V++) {
              var Q = G[V];
              Q.enumerable = Q.enumerable || !1, Q.configurable = !0, "value" in Q && (Q.writable = !0), Object.defineProperty(F, Q.key, Q);
            }
          }
          return function(F, G, V) {
            return G && q(F.prototype, G), V && q(F, V), F;
          };
        }(), g = f(21), y = A(g), h = f(11), o = A(h), t = f(3), e = A(t), s = f(2), l = A(s), u = f(20), r = A(u), i = f(0), c = A(i), n = f(5), v = A(n), S = f(10), w = A(S), T = f(9), P = A(T);
        function A(q) {
          return q && q.__esModule ? q : { default: q };
        }
        function p(q, F, G) {
          return F in q ? Object.defineProperty(q, F, { value: G, enumerable: !0, configurable: !0, writable: !0 }) : q[F] = G, q;
        }
        function O(q, F) {
          if (!(q instanceof F))
            throw new TypeError("Cannot call a class as a function");
        }
        function k(q, F) {
          if (!q)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return F && (typeof F == "object" || typeof F == "function") ? F : q;
        }
        function L(q, F) {
          if (typeof F != "function" && F !== null)
            throw new TypeError("Super expression must either be null or a function, not " + typeof F);
          q.prototype = Object.create(F && F.prototype, { constructor: { value: q, enumerable: !1, writable: !0, configurable: !0 } }), F && (Object.setPrototypeOf ? Object.setPrototypeOf(q, F) : q.__proto__ = F);
        }
        var D = (0, w.default)("quill:keyboard"), z = /Mac/i.test(navigator.platform) ? "metaKey" : "ctrlKey", $ = function(q) {
          L(F, q), _(F, null, [{
            key: "match",
            value: function(V, Q) {
              return Q = C(Q), ["altKey", "ctrlKey", "metaKey", "shiftKey"].some(function(nt) {
                return !!Q[nt] !== V[nt] && Q[nt] !== null;
              }) ? !1 : Q.key === (V.which || V.keyCode);
            }
          }]);
          function F(G, V) {
            O(this, F);
            var Q = k(this, (F.__proto__ || Object.getPrototypeOf(F)).call(this, G, V));
            return Q.bindings = {}, Object.keys(Q.options.bindings).forEach(function(nt) {
              nt === "list autofill" && G.scroll.whitelist != null && !G.scroll.whitelist.list || Q.options.bindings[nt] && Q.addBinding(Q.options.bindings[nt]);
            }), Q.addBinding({ key: F.keys.ENTER, shiftKey: null }, I), Q.addBinding({ key: F.keys.ENTER, metaKey: null, ctrlKey: null, altKey: null }, function() {
            }), /Firefox/i.test(navigator.userAgent) ? (Q.addBinding({ key: F.keys.BACKSPACE }, { collapsed: !0 }, H), Q.addBinding({ key: F.keys.DELETE }, { collapsed: !0 }, j)) : (Q.addBinding({ key: F.keys.BACKSPACE }, { collapsed: !0, prefix: /^.?$/ }, H), Q.addBinding({ key: F.keys.DELETE }, { collapsed: !0, suffix: /^.?$/ }, j)), Q.addBinding({ key: F.keys.BACKSPACE }, { collapsed: !1 }, N), Q.addBinding({ key: F.keys.DELETE }, { collapsed: !1 }, N), Q.addBinding({ key: F.keys.BACKSPACE, altKey: null, ctrlKey: null, metaKey: null, shiftKey: null }, { collapsed: !0, offset: 0 }, H), Q.listen(), Q;
          }
          return _(F, [{
            key: "addBinding",
            value: function(V) {
              var Q = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, nt = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, it = C(V);
              if (it == null || it.key == null)
                return D.warn("Attempted to add invalid keyboard binding", it);
              typeof Q == "function" && (Q = { handler: Q }), typeof nt == "function" && (nt = { handler: nt }), it = (0, e.default)(it, Q, nt), this.bindings[it.key] = this.bindings[it.key] || [], this.bindings[it.key].push(it);
            }
          }, {
            key: "listen",
            value: function() {
              var V = this;
              this.quill.root.addEventListener("keydown", function(Q) {
                if (!Q.defaultPrevented) {
                  var nt = Q.which || Q.keyCode, it = (V.bindings[nt] || []).filter(function(dt) {
                    return F.match(Q, dt);
                  });
                  if (it.length !== 0) {
                    var at = V.quill.getSelection();
                    if (!(at == null || !V.quill.hasFocus())) {
                      var ft = V.quill.getLine(at.index), ht = b(ft, 2), mt = ht[0], gt = ht[1], W = V.quill.getLeaf(at.index), Y = b(W, 2), tt = Y[0], et = Y[1], X = at.length === 0 ? [tt, et] : V.quill.getLeaf(at.index + at.length), st = b(X, 2), ot = st[0], lt = st[1], St = tt instanceof c.default.Text ? tt.value().slice(0, et) : "", Ot = ot instanceof c.default.Text ? ot.value().slice(lt) : "", pt = {
                        collapsed: at.length === 0,
                        empty: at.length === 0 && mt.length() <= 1,
                        format: V.quill.getFormat(at),
                        offset: gt,
                        prefix: St,
                        suffix: Ot
                      }, Jt = it.some(function(dt) {
                        if (dt.collapsed != null && dt.collapsed !== pt.collapsed || dt.empty != null && dt.empty !== pt.empty || dt.offset != null && dt.offset !== pt.offset)
                          return !1;
                        if (Array.isArray(dt.format)) {
                          if (dt.format.every(function(It) {
                            return pt.format[It] == null;
                          }))
                            return !1;
                        } else if (E(dt.format) === "object" && !Object.keys(dt.format).every(function(It) {
                          return dt.format[It] === !0 ? pt.format[It] != null : dt.format[It] === !1 ? pt.format[It] == null : (0, o.default)(dt.format[It], pt.format[It]);
                        }))
                          return !1;
                        return dt.prefix != null && !dt.prefix.test(pt.prefix) || dt.suffix != null && !dt.suffix.test(pt.suffix) ? !1 : dt.handler.call(V, at, pt) !== !0;
                      });
                      Jt && Q.preventDefault();
                    }
                  }
                }
              });
            }
          }]), F;
        }(P.default);
        $.keys = {
          BACKSPACE: 8,
          TAB: 9,
          ENTER: 13,
          ESCAPE: 27,
          LEFT: 37,
          UP: 38,
          RIGHT: 39,
          DOWN: 40,
          DELETE: 46
        }, $.DEFAULTS = {
          bindings: {
            bold: K("bold"),
            italic: K("italic"),
            underline: K("underline"),
            indent: {
              key: $.keys.TAB,
              format: ["blockquote", "indent", "list"],
              handler: function(F, G) {
                if (G.collapsed && G.offset !== 0)
                  return !0;
                this.quill.format("indent", "+1", v.default.sources.USER);
              }
            },
            outdent: {
              key: $.keys.TAB,
              shiftKey: !0,
              format: ["blockquote", "indent", "list"],
              handler: function(F, G) {
                if (G.collapsed && G.offset !== 0)
                  return !0;
                this.quill.format("indent", "-1", v.default.sources.USER);
              }
            },
            "outdent backspace": {
              key: $.keys.BACKSPACE,
              collapsed: !0,
              shiftKey: null,
              metaKey: null,
              ctrlKey: null,
              altKey: null,
              format: ["indent", "list"],
              offset: 0,
              handler: function(F, G) {
                G.format.indent != null ? this.quill.format("indent", "-1", v.default.sources.USER) : G.format.list != null && this.quill.format("list", !1, v.default.sources.USER);
              }
            },
            "indent code-block": M(!0),
            "outdent code-block": M(!1),
            "remove tab": {
              key: $.keys.TAB,
              shiftKey: !0,
              collapsed: !0,
              prefix: /\t$/,
              handler: function(F) {
                this.quill.deleteText(F.index - 1, 1, v.default.sources.USER);
              }
            },
            tab: {
              key: $.keys.TAB,
              handler: function(F) {
                this.quill.history.cutoff();
                var G = new l.default().retain(F.index).delete(F.length).insert("	");
                this.quill.updateContents(G, v.default.sources.USER), this.quill.history.cutoff(), this.quill.setSelection(F.index + 1, v.default.sources.SILENT);
              }
            },
            "list empty enter": {
              key: $.keys.ENTER,
              collapsed: !0,
              format: ["list"],
              empty: !0,
              handler: function(F, G) {
                this.quill.format("list", !1, v.default.sources.USER), G.format.indent && this.quill.format("indent", !1, v.default.sources.USER);
              }
            },
            "checklist enter": {
              key: $.keys.ENTER,
              collapsed: !0,
              format: { list: "checked" },
              handler: function(F) {
                var G = this.quill.getLine(F.index), V = b(G, 2), Q = V[0], nt = V[1], it = (0, e.default)({}, Q.formats(), { list: "checked" }), at = new l.default().retain(F.index).insert(`
`, it).retain(Q.length() - nt - 1).retain(1, { list: "unchecked" });
                this.quill.updateContents(at, v.default.sources.USER), this.quill.setSelection(F.index + 1, v.default.sources.SILENT), this.quill.scrollIntoView();
              }
            },
            "header enter": {
              key: $.keys.ENTER,
              collapsed: !0,
              format: ["header"],
              suffix: /^$/,
              handler: function(F, G) {
                var V = this.quill.getLine(F.index), Q = b(V, 2), nt = Q[0], it = Q[1], at = new l.default().retain(F.index).insert(`
`, G.format).retain(nt.length() - it - 1).retain(1, { header: null });
                this.quill.updateContents(at, v.default.sources.USER), this.quill.setSelection(F.index + 1, v.default.sources.SILENT), this.quill.scrollIntoView();
              }
            },
            "list autofill": {
              key: " ",
              collapsed: !0,
              format: { list: !1 },
              prefix: /^\s*?(\d+\.|-|\*|\[ ?\]|\[x\])$/,
              handler: function(F, G) {
                var V = G.prefix.length, Q = this.quill.getLine(F.index), nt = b(Q, 2), it = nt[0], at = nt[1];
                if (at > V)
                  return !0;
                var ft = void 0;
                switch (G.prefix.trim()) {
                  case "[]":
                  case "[ ]":
                    ft = "unchecked";
                    break;
                  case "[x]":
                    ft = "checked";
                    break;
                  case "-":
                  case "*":
                    ft = "bullet";
                    break;
                  default:
                    ft = "ordered";
                }
                this.quill.insertText(F.index, " ", v.default.sources.USER), this.quill.history.cutoff();
                var ht = new l.default().retain(F.index - at).delete(V + 1).retain(it.length() - 2 - at).retain(1, { list: ft });
                this.quill.updateContents(ht, v.default.sources.USER), this.quill.history.cutoff(), this.quill.setSelection(F.index - V, v.default.sources.SILENT);
              }
            },
            "code exit": {
              key: $.keys.ENTER,
              collapsed: !0,
              format: ["code-block"],
              prefix: /\n\n$/,
              suffix: /^\s+$/,
              handler: function(F) {
                var G = this.quill.getLine(F.index), V = b(G, 2), Q = V[0], nt = V[1], it = new l.default().retain(F.index + Q.length() - nt - 2).retain(1, { "code-block": null }).delete(1);
                this.quill.updateContents(it, v.default.sources.USER);
              }
            },
            "embed left": J($.keys.LEFT, !1),
            "embed left shift": J($.keys.LEFT, !0),
            "embed right": J($.keys.RIGHT, !1),
            "embed right shift": J($.keys.RIGHT, !0)
          }
        };
        function J(q, F) {
          var G, V = q === $.keys.LEFT ? "prefix" : "suffix";
          return G = {
            key: q,
            shiftKey: F,
            altKey: null
          }, p(G, V, /^$/), p(G, "handler", function(nt) {
            var it = nt.index;
            q === $.keys.RIGHT && (it += nt.length + 1);
            var at = this.quill.getLeaf(it), ft = b(at, 1), ht = ft[0];
            return ht instanceof c.default.Embed ? (q === $.keys.LEFT ? F ? this.quill.setSelection(nt.index - 1, nt.length + 1, v.default.sources.USER) : this.quill.setSelection(nt.index - 1, v.default.sources.USER) : F ? this.quill.setSelection(nt.index, nt.length + 1, v.default.sources.USER) : this.quill.setSelection(nt.index + nt.length + 1, v.default.sources.USER), !1) : !0;
          }), G;
        }
        function H(q, F) {
          if (!(q.index === 0 || this.quill.getLength() <= 1)) {
            var G = this.quill.getLine(q.index), V = b(G, 1), Q = V[0], nt = {};
            if (F.offset === 0) {
              var it = this.quill.getLine(q.index - 1), at = b(it, 1), ft = at[0];
              if (ft != null && ft.length() > 1) {
                var ht = Q.formats(), mt = this.quill.getFormat(q.index - 1, 1);
                nt = r.default.attributes.diff(ht, mt) || {};
              }
            }
            var gt = /[\uD800-\uDBFF][\uDC00-\uDFFF]$/.test(F.prefix) ? 2 : 1;
            this.quill.deleteText(q.index - gt, gt, v.default.sources.USER), Object.keys(nt).length > 0 && this.quill.formatLine(q.index - gt, gt, nt, v.default.sources.USER), this.quill.focus();
          }
        }
        function j(q, F) {
          var G = /^[\uD800-\uDBFF][\uDC00-\uDFFF]/.test(F.suffix) ? 2 : 1;
          if (!(q.index >= this.quill.getLength() - G)) {
            var V = {}, Q = 0, nt = this.quill.getLine(q.index), it = b(nt, 1), at = it[0];
            if (F.offset >= at.length() - 1) {
              var ft = this.quill.getLine(q.index + 1), ht = b(ft, 1), mt = ht[0];
              if (mt) {
                var gt = at.formats(), W = this.quill.getFormat(q.index, 1);
                V = r.default.attributes.diff(gt, W) || {}, Q = mt.length();
              }
            }
            this.quill.deleteText(q.index, G, v.default.sources.USER), Object.keys(V).length > 0 && this.quill.formatLine(q.index + Q - 1, G, V, v.default.sources.USER);
          }
        }
        function N(q) {
          var F = this.quill.getLines(q), G = {};
          if (F.length > 1) {
            var V = F[0].formats(), Q = F[F.length - 1].formats();
            G = r.default.attributes.diff(Q, V) || {};
          }
          this.quill.deleteText(q, v.default.sources.USER), Object.keys(G).length > 0 && this.quill.formatLine(q.index, 1, G, v.default.sources.USER), this.quill.setSelection(q.index, v.default.sources.SILENT), this.quill.focus();
        }
        function I(q, F) {
          var G = this;
          q.length > 0 && this.quill.scroll.deleteAt(q.index, q.length);
          var V = Object.keys(F.format).reduce(function(Q, nt) {
            return c.default.query(nt, c.default.Scope.BLOCK) && !Array.isArray(F.format[nt]) && (Q[nt] = F.format[nt]), Q;
          }, {});
          this.quill.insertText(q.index, `
`, V, v.default.sources.USER), this.quill.setSelection(q.index + 1, v.default.sources.SILENT), this.quill.focus(), Object.keys(F.format).forEach(function(Q) {
            V[Q] == null && (Array.isArray(F.format[Q]) || Q !== "link" && G.quill.format(Q, F.format[Q], v.default.sources.USER));
          });
        }
        function M(q) {
          return {
            key: $.keys.TAB,
            shiftKey: !q,
            format: { "code-block": !0 },
            handler: function(G) {
              var V = c.default.query("code-block"), Q = G.index, nt = G.length, it = this.quill.scroll.descendant(V, Q), at = b(it, 2), ft = at[0], ht = at[1];
              if (ft != null) {
                var mt = this.quill.getIndex(ft), gt = ft.newlineIndex(ht, !0) + 1, W = ft.newlineIndex(mt + ht + nt), Y = ft.domNode.textContent.slice(gt, W).split(`
`);
                ht = 0, Y.forEach(function(tt, et) {
                  q ? (ft.insertAt(gt + ht, V.TAB), ht += V.TAB.length, et === 0 ? Q += V.TAB.length : nt += V.TAB.length) : tt.startsWith(V.TAB) && (ft.deleteAt(gt + ht, V.TAB.length), ht -= V.TAB.length, et === 0 ? Q -= V.TAB.length : nt -= V.TAB.length), ht += tt.length + 1;
                }), this.quill.update(v.default.sources.USER), this.quill.setSelection(Q, nt, v.default.sources.SILENT);
              }
            }
          };
        }
        function K(q) {
          return {
            key: q[0].toUpperCase(),
            shortKey: !0,
            handler: function(G, V) {
              this.quill.format(q, !V.format[q], v.default.sources.USER);
            }
          };
        }
        function C(q) {
          if (typeof q == "string" || typeof q == "number")
            return C({ key: q });
          if ((typeof q > "u" ? "undefined" : E(q)) === "object" && (q = (0, y.default)(q, !1)), typeof q.key == "string")
            if ($.keys[q.key.toUpperCase()] != null)
              q.key = $.keys[q.key.toUpperCase()];
            else if (q.key.length === 1)
              q.key = q.key.toUpperCase().charCodeAt(0);
            else
              return null;
          return q.shortKey && (q[z] = q.shortKey, delete q.shortKey), q;
        }
        d.default = $, d.SHORTKEY = z;
      },
      function(m, d, f) {
        Object.defineProperty(d, "__esModule", {
          value: !0
        });
        var E = function() {
          function r(i, c) {
            var n = [], v = !0, S = !1, w = void 0;
            try {
              for (var T = i[Symbol.iterator](), P; !(v = (P = T.next()).done) && (n.push(P.value), !(c && n.length === c)); v = !0)
                ;
            } catch (A) {
              S = !0, w = A;
            } finally {
              try {
                !v && T.return && T.return();
              } finally {
                if (S)
                  throw w;
              }
            }
            return n;
          }
          return function(i, c) {
            if (Array.isArray(i))
              return i;
            if (Symbol.iterator in Object(i))
              return r(i, c);
            throw new TypeError("Invalid attempt to destructure non-iterable instance");
          };
        }(), b = function r(i, c, n) {
          i === null && (i = Function.prototype);
          var v = Object.getOwnPropertyDescriptor(i, c);
          if (v === void 0) {
            var S = Object.getPrototypeOf(i);
            return S === null ? void 0 : r(S, c, n);
          } else {
            if ("value" in v)
              return v.value;
            var w = v.get;
            return w === void 0 ? void 0 : w.call(n);
          }
        }, _ = function() {
          function r(i, c) {
            for (var n = 0; n < c.length; n++) {
              var v = c[n];
              v.enumerable = v.enumerable || !1, v.configurable = !0, "value" in v && (v.writable = !0), Object.defineProperty(i, v.key, v);
            }
          }
          return function(i, c, n) {
            return c && r(i.prototype, c), n && r(i, n), i;
          };
        }(), g = f(0), y = t(g), h = f(7), o = t(h);
        function t(r) {
          return r && r.__esModule ? r : { default: r };
        }
        function e(r, i) {
          if (!(r instanceof i))
            throw new TypeError("Cannot call a class as a function");
        }
        function s(r, i) {
          if (!r)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return i && (typeof i == "object" || typeof i == "function") ? i : r;
        }
        function l(r, i) {
          if (typeof i != "function" && i !== null)
            throw new TypeError("Super expression must either be null or a function, not " + typeof i);
          r.prototype = Object.create(i && i.prototype, { constructor: { value: r, enumerable: !1, writable: !0, configurable: !0 } }), i && (Object.setPrototypeOf ? Object.setPrototypeOf(r, i) : r.__proto__ = i);
        }
        var u = function(r) {
          l(i, r), _(i, null, [{
            key: "value",
            value: function() {
            }
          }]);
          function i(c, n) {
            e(this, i);
            var v = s(this, (i.__proto__ || Object.getPrototypeOf(i)).call(this, c));
            return v.selection = n, v.textNode = document.createTextNode(i.CONTENTS), v.domNode.appendChild(v.textNode), v._length = 0, v;
          }
          return _(i, [{
            key: "detach",
            value: function() {
              this.parent != null && this.parent.removeChild(this);
            }
          }, {
            key: "format",
            value: function(n, v) {
              if (this._length !== 0)
                return b(i.prototype.__proto__ || Object.getPrototypeOf(i.prototype), "format", this).call(this, n, v);
              for (var S = this, w = 0; S != null && S.statics.scope !== y.default.Scope.BLOCK_BLOT; )
                w += S.offset(S.parent), S = S.parent;
              S != null && (this._length = i.CONTENTS.length, S.optimize(), S.formatAt(w, i.CONTENTS.length, n, v), this._length = 0);
            }
          }, {
            key: "index",
            value: function(n, v) {
              return n === this.textNode ? 0 : b(i.prototype.__proto__ || Object.getPrototypeOf(i.prototype), "index", this).call(this, n, v);
            }
          }, {
            key: "length",
            value: function() {
              return this._length;
            }
          }, {
            key: "position",
            value: function() {
              return [this.textNode, this.textNode.data.length];
            }
          }, {
            key: "remove",
            value: function() {
              b(i.prototype.__proto__ || Object.getPrototypeOf(i.prototype), "remove", this).call(this), this.parent = null;
            }
          }, {
            key: "restore",
            value: function() {
              if (!(this.selection.composing || this.parent == null)) {
                var n = this.textNode, v = this.selection.getNativeRange(), S = void 0, w = void 0, T = void 0;
                if (v != null && v.start.node === n && v.end.node === n) {
                  var P = [n, v.start.offset, v.end.offset];
                  S = P[0], w = P[1], T = P[2];
                }
                for (; this.domNode.lastChild != null && this.domNode.lastChild !== this.textNode; )
                  this.domNode.parentNode.insertBefore(this.domNode.lastChild, this.domNode);
                if (this.textNode.data !== i.CONTENTS) {
                  var A = this.textNode.data.split(i.CONTENTS).join("");
                  this.next instanceof o.default ? (S = this.next.domNode, this.next.insertAt(0, A), this.textNode.data = i.CONTENTS) : (this.textNode.data = A, this.parent.insertBefore(y.default.create(this.textNode), this), this.textNode = document.createTextNode(i.CONTENTS), this.domNode.appendChild(this.textNode));
                }
                if (this.remove(), w != null) {
                  var p = [w, T].map(function(k) {
                    return Math.max(0, Math.min(S.data.length, k - 1));
                  }), O = E(p, 2);
                  return w = O[0], T = O[1], {
                    startNode: S,
                    startOffset: w,
                    endNode: S,
                    endOffset: T
                  };
                }
              }
            }
          }, {
            key: "update",
            value: function(n, v) {
              var S = this;
              if (n.some(function(T) {
                return T.type === "characterData" && T.target === S.textNode;
              })) {
                var w = this.restore();
                w && (v.range = w);
              }
            }
          }, {
            key: "value",
            value: function() {
              return "";
            }
          }]), i;
        }(y.default.Embed);
        u.blotName = "cursor", u.className = "ql-cursor", u.tagName = "span", u.CONTENTS = "\uFEFF", d.default = u;
      },
      function(m, d, f) {
        Object.defineProperty(d, "__esModule", {
          value: !0
        });
        var E = f(0), b = y(E), _ = f(4), g = y(_);
        function y(s) {
          return s && s.__esModule ? s : { default: s };
        }
        function h(s, l) {
          if (!(s instanceof l))
            throw new TypeError("Cannot call a class as a function");
        }
        function o(s, l) {
          if (!s)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return l && (typeof l == "object" || typeof l == "function") ? l : s;
        }
        function t(s, l) {
          if (typeof l != "function" && l !== null)
            throw new TypeError("Super expression must either be null or a function, not " + typeof l);
          s.prototype = Object.create(l && l.prototype, { constructor: { value: s, enumerable: !1, writable: !0, configurable: !0 } }), l && (Object.setPrototypeOf ? Object.setPrototypeOf(s, l) : s.__proto__ = l);
        }
        var e = function(s) {
          t(l, s);
          function l() {
            return h(this, l), o(this, (l.__proto__ || Object.getPrototypeOf(l)).apply(this, arguments));
          }
          return l;
        }(b.default.Container);
        e.allowedChildren = [g.default, _.BlockEmbed, e], d.default = e;
      },
      function(m, d, f) {
        Object.defineProperty(d, "__esModule", {
          value: !0
        }), d.ColorStyle = d.ColorClass = d.ColorAttributor = void 0;
        var E = function() {
          function u(r, i) {
            for (var c = 0; c < i.length; c++) {
              var n = i[c];
              n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(r, n.key, n);
            }
          }
          return function(r, i, c) {
            return i && u(r.prototype, i), c && u(r, c), r;
          };
        }(), b = function u(r, i, c) {
          r === null && (r = Function.prototype);
          var n = Object.getOwnPropertyDescriptor(r, i);
          if (n === void 0) {
            var v = Object.getPrototypeOf(r);
            return v === null ? void 0 : u(v, i, c);
          } else {
            if ("value" in n)
              return n.value;
            var S = n.get;
            return S === void 0 ? void 0 : S.call(c);
          }
        }, _ = f(0), g = y(_);
        function y(u) {
          return u && u.__esModule ? u : { default: u };
        }
        function h(u, r) {
          if (!(u instanceof r))
            throw new TypeError("Cannot call a class as a function");
        }
        function o(u, r) {
          if (!u)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return r && (typeof r == "object" || typeof r == "function") ? r : u;
        }
        function t(u, r) {
          if (typeof r != "function" && r !== null)
            throw new TypeError("Super expression must either be null or a function, not " + typeof r);
          u.prototype = Object.create(r && r.prototype, { constructor: { value: u, enumerable: !1, writable: !0, configurable: !0 } }), r && (Object.setPrototypeOf ? Object.setPrototypeOf(u, r) : u.__proto__ = r);
        }
        var e = function(u) {
          t(r, u);
          function r() {
            return h(this, r), o(this, (r.__proto__ || Object.getPrototypeOf(r)).apply(this, arguments));
          }
          return E(r, [{
            key: "value",
            value: function(c) {
              var n = b(r.prototype.__proto__ || Object.getPrototypeOf(r.prototype), "value", this).call(this, c);
              return n.startsWith("rgb(") ? (n = n.replace(/^[^\d]+/, "").replace(/[^\d]+$/, ""), "#" + n.split(",").map(function(v) {
                return ("00" + parseInt(v).toString(16)).slice(-2);
              }).join("")) : n;
            }
          }]), r;
        }(g.default.Attributor.Style), s = new g.default.Attributor.Class("color", "ql-color", {
          scope: g.default.Scope.INLINE
        }), l = new e("color", "color", {
          scope: g.default.Scope.INLINE
        });
        d.ColorAttributor = e, d.ColorClass = s, d.ColorStyle = l;
      },
      function(m, d, f) {
        Object.defineProperty(d, "__esModule", {
          value: !0
        }), d.sanitize = d.default = void 0;
        var E = function() {
          function l(u, r) {
            for (var i = 0; i < r.length; i++) {
              var c = r[i];
              c.enumerable = c.enumerable || !1, c.configurable = !0, "value" in c && (c.writable = !0), Object.defineProperty(u, c.key, c);
            }
          }
          return function(u, r, i) {
            return r && l(u.prototype, r), i && l(u, i), u;
          };
        }(), b = function l(u, r, i) {
          u === null && (u = Function.prototype);
          var c = Object.getOwnPropertyDescriptor(u, r);
          if (c === void 0) {
            var n = Object.getPrototypeOf(u);
            return n === null ? void 0 : l(n, r, i);
          } else {
            if ("value" in c)
              return c.value;
            var v = c.get;
            return v === void 0 ? void 0 : v.call(i);
          }
        }, _ = f(6), g = y(_);
        function y(l) {
          return l && l.__esModule ? l : { default: l };
        }
        function h(l, u) {
          if (!(l instanceof u))
            throw new TypeError("Cannot call a class as a function");
        }
        function o(l, u) {
          if (!l)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return u && (typeof u == "object" || typeof u == "function") ? u : l;
        }
        function t(l, u) {
          if (typeof u != "function" && u !== null)
            throw new TypeError("Super expression must either be null or a function, not " + typeof u);
          l.prototype = Object.create(u && u.prototype, { constructor: { value: l, enumerable: !1, writable: !0, configurable: !0 } }), u && (Object.setPrototypeOf ? Object.setPrototypeOf(l, u) : l.__proto__ = u);
        }
        var e = function(l) {
          t(u, l);
          function u() {
            return h(this, u), o(this, (u.__proto__ || Object.getPrototypeOf(u)).apply(this, arguments));
          }
          return E(u, [{
            key: "format",
            value: function(i, c) {
              if (i !== this.statics.blotName || !c)
                return b(u.prototype.__proto__ || Object.getPrototypeOf(u.prototype), "format", this).call(this, i, c);
              c = this.constructor.sanitize(c), this.domNode.setAttribute("href", c);
            }
          }], [{
            key: "create",
            value: function(i) {
              var c = b(u.__proto__ || Object.getPrototypeOf(u), "create", this).call(this, i);
              return i = this.sanitize(i), c.setAttribute("href", i), c.setAttribute("rel", "noopener noreferrer"), c.setAttribute("target", "_blank"), c;
            }
          }, {
            key: "formats",
            value: function(i) {
              return i.getAttribute("href");
            }
          }, {
            key: "sanitize",
            value: function(i) {
              return s(i, this.PROTOCOL_WHITELIST) ? i : this.SANITIZED_URL;
            }
          }]), u;
        }(g.default);
        e.blotName = "link", e.tagName = "A", e.SANITIZED_URL = "about:blank", e.PROTOCOL_WHITELIST = ["http", "https", "mailto", "tel"];
        function s(l, u) {
          var r = document.createElement("a");
          r.href = l;
          var i = r.href.slice(0, r.href.indexOf(":"));
          return u.indexOf(i) > -1;
        }
        d.default = e, d.sanitize = s;
      },
      function(m, d, f) {
        Object.defineProperty(d, "__esModule", {
          value: !0
        });
        var E = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(u) {
          return typeof u;
        } : function(u) {
          return u && typeof Symbol == "function" && u.constructor === Symbol && u !== Symbol.prototype ? "symbol" : typeof u;
        }, b = function() {
          function u(r, i) {
            for (var c = 0; c < i.length; c++) {
              var n = i[c];
              n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(r, n.key, n);
            }
          }
          return function(r, i, c) {
            return i && u(r.prototype, i), c && u(r, c), r;
          };
        }(), _ = f(23), g = o(_), y = f(107), h = o(y);
        function o(u) {
          return u && u.__esModule ? u : { default: u };
        }
        function t(u, r) {
          if (!(u instanceof r))
            throw new TypeError("Cannot call a class as a function");
        }
        var e = 0;
        function s(u, r) {
          u.setAttribute(r, u.getAttribute(r) !== "true");
        }
        var l = function() {
          function u(r) {
            var i = this;
            t(this, u), this.select = r, this.container = document.createElement("span"), this.buildPicker(), this.select.style.display = "none", this.select.parentNode.insertBefore(this.container, this.select), this.label.addEventListener("mousedown", function() {
              i.togglePicker();
            }), this.label.addEventListener("keydown", function(c) {
              switch (c.keyCode) {
                case g.default.keys.ENTER:
                  i.togglePicker();
                  break;
                case g.default.keys.ESCAPE:
                  i.escape(), c.preventDefault();
                  break;
              }
            }), this.select.addEventListener("change", this.update.bind(this));
          }
          return b(u, [{
            key: "togglePicker",
            value: function() {
              this.container.classList.toggle("ql-expanded"), s(this.label, "aria-expanded"), s(this.options, "aria-hidden");
            }
          }, {
            key: "buildItem",
            value: function(i) {
              var c = this, n = document.createElement("span");
              return n.tabIndex = "0", n.setAttribute("role", "button"), n.classList.add("ql-picker-item"), i.hasAttribute("value") && n.setAttribute("data-value", i.getAttribute("value")), i.textContent && n.setAttribute("data-label", i.textContent), n.addEventListener("click", function() {
                c.selectItem(n, !0);
              }), n.addEventListener("keydown", function(v) {
                switch (v.keyCode) {
                  case g.default.keys.ENTER:
                    c.selectItem(n, !0), v.preventDefault();
                    break;
                  case g.default.keys.ESCAPE:
                    c.escape(), v.preventDefault();
                    break;
                }
              }), n;
            }
          }, {
            key: "buildLabel",
            value: function() {
              var i = document.createElement("span");
              return i.classList.add("ql-picker-label"), i.innerHTML = h.default, i.tabIndex = "0", i.setAttribute("role", "button"), i.setAttribute("aria-expanded", "false"), this.container.appendChild(i), i;
            }
          }, {
            key: "buildOptions",
            value: function() {
              var i = this, c = document.createElement("span");
              c.classList.add("ql-picker-options"), c.setAttribute("aria-hidden", "true"), c.tabIndex = "-1", c.id = "ql-picker-options-" + e, e += 1, this.label.setAttribute("aria-controls", c.id), this.options = c, [].slice.call(this.select.options).forEach(function(n) {
                var v = i.buildItem(n);
                c.appendChild(v), n.selected === !0 && i.selectItem(v);
              }), this.container.appendChild(c);
            }
          }, {
            key: "buildPicker",
            value: function() {
              var i = this;
              [].slice.call(this.select.attributes).forEach(function(c) {
                i.container.setAttribute(c.name, c.value);
              }), this.container.classList.add("ql-picker"), this.label = this.buildLabel(), this.buildOptions();
            }
          }, {
            key: "escape",
            value: function() {
              var i = this;
              this.close(), setTimeout(function() {
                return i.label.focus();
              }, 1);
            }
          }, {
            key: "close",
            value: function() {
              this.container.classList.remove("ql-expanded"), this.label.setAttribute("aria-expanded", "false"), this.options.setAttribute("aria-hidden", "true");
            }
          }, {
            key: "selectItem",
            value: function(i) {
              var c = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, n = this.container.querySelector(".ql-selected");
              if (i !== n && (n != null && n.classList.remove("ql-selected"), i != null && (i.classList.add("ql-selected"), this.select.selectedIndex = [].indexOf.call(i.parentNode.children, i), i.hasAttribute("data-value") ? this.label.setAttribute("data-value", i.getAttribute("data-value")) : this.label.removeAttribute("data-value"), i.hasAttribute("data-label") ? this.label.setAttribute("data-label", i.getAttribute("data-label")) : this.label.removeAttribute("data-label"), c))) {
                if (typeof Event == "function")
                  this.select.dispatchEvent(new Event("change"));
                else if ((typeof Event > "u" ? "undefined" : E(Event)) === "object") {
                  var v = document.createEvent("Event");
                  v.initEvent("change", !0, !0), this.select.dispatchEvent(v);
                }
                this.close();
              }
            }
          }, {
            key: "update",
            value: function() {
              var i = void 0;
              if (this.select.selectedIndex > -1) {
                var c = this.container.querySelector(".ql-picker-options").children[this.select.selectedIndex];
                i = this.select.options[this.select.selectedIndex], this.selectItem(c);
              } else
                this.selectItem(null);
              var n = i != null && i !== this.select.querySelector("option[selected]");
              this.label.classList.toggle("ql-active", n);
            }
          }]), u;
        }();
        d.default = l;
      },
      function(m, d, f) {
        Object.defineProperty(d, "__esModule", {
          value: !0
        });
        var E = f(0), b = D(E), _ = f(5), g = D(_), y = f(4), h = D(y), o = f(16), t = D(o), e = f(25), s = D(e), l = f(24), u = D(l), r = f(35), i = D(r), c = f(6), n = D(c), v = f(22), S = D(v), w = f(7), T = D(w), P = f(55), A = D(P), p = f(42), O = D(p), k = f(23), L = D(k);
        function D(z) {
          return z && z.__esModule ? z : { default: z };
        }
        g.default.register({
          "blots/block": h.default,
          "blots/block/embed": y.BlockEmbed,
          "blots/break": t.default,
          "blots/container": s.default,
          "blots/cursor": u.default,
          "blots/embed": i.default,
          "blots/inline": n.default,
          "blots/scroll": S.default,
          "blots/text": T.default,
          "modules/clipboard": A.default,
          "modules/history": O.default,
          "modules/keyboard": L.default
        }), b.default.register(h.default, t.default, u.default, n.default, S.default, T.default), d.default = g.default;
      },
      function(m, d, f) {
        Object.defineProperty(d, "__esModule", { value: !0 });
        var E = f(1), b = function() {
          function _(g) {
            this.domNode = g, this.domNode[E.DATA_KEY] = { blot: this };
          }
          return Object.defineProperty(_.prototype, "statics", {
            get: function() {
              return this.constructor;
            },
            enumerable: !0,
            configurable: !0
          }), _.create = function(g) {
            if (this.tagName == null)
              throw new E.ParchmentError("Blot definition missing tagName");
            var y;
            return Array.isArray(this.tagName) ? (typeof g == "string" && (g = g.toUpperCase(), parseInt(g).toString() === g && (g = parseInt(g))), typeof g == "number" ? y = document.createElement(this.tagName[g - 1]) : this.tagName.indexOf(g) > -1 ? y = document.createElement(g) : y = document.createElement(this.tagName[0])) : y = document.createElement(this.tagName), this.className && y.classList.add(this.className), y;
          }, _.prototype.attach = function() {
            this.parent != null && (this.scroll = this.parent.scroll);
          }, _.prototype.clone = function() {
            var g = this.domNode.cloneNode(!1);
            return E.create(g);
          }, _.prototype.detach = function() {
            this.parent != null && this.parent.removeChild(this), delete this.domNode[E.DATA_KEY];
          }, _.prototype.deleteAt = function(g, y) {
            var h = this.isolate(g, y);
            h.remove();
          }, _.prototype.formatAt = function(g, y, h, o) {
            var t = this.isolate(g, y);
            if (E.query(h, E.Scope.BLOT) != null && o)
              t.wrap(h, o);
            else if (E.query(h, E.Scope.ATTRIBUTE) != null) {
              var e = E.create(this.statics.scope);
              t.wrap(e), e.format(h, o);
            }
          }, _.prototype.insertAt = function(g, y, h) {
            var o = h == null ? E.create("text", y) : E.create(y, h), t = this.split(g);
            this.parent.insertBefore(o, t);
          }, _.prototype.insertInto = function(g, y) {
            y === void 0 && (y = null), this.parent != null && this.parent.children.remove(this);
            var h = null;
            g.children.insertBefore(this, y), y != null && (h = y.domNode), (this.domNode.parentNode != g.domNode || this.domNode.nextSibling != h) && g.domNode.insertBefore(this.domNode, h), this.parent = g, this.attach();
          }, _.prototype.isolate = function(g, y) {
            var h = this.split(g);
            return h.split(y), h;
          }, _.prototype.length = function() {
            return 1;
          }, _.prototype.offset = function(g) {
            return g === void 0 && (g = this.parent), this.parent == null || this == g ? 0 : this.parent.children.offset(this) + this.parent.offset(g);
          }, _.prototype.optimize = function(g) {
            this.domNode[E.DATA_KEY] != null && delete this.domNode[E.DATA_KEY].mutations;
          }, _.prototype.remove = function() {
            this.domNode.parentNode != null && this.domNode.parentNode.removeChild(this.domNode), this.detach();
          }, _.prototype.replace = function(g) {
            g.parent != null && (g.parent.insertBefore(this, g.next), g.remove());
          }, _.prototype.replaceWith = function(g, y) {
            var h = typeof g == "string" ? E.create(g, y) : g;
            return h.replace(this), h;
          }, _.prototype.split = function(g, y) {
            return g === 0 ? this : this.next;
          }, _.prototype.update = function(g, y) {
          }, _.prototype.wrap = function(g, y) {
            var h = typeof g == "string" ? E.create(g, y) : g;
            return this.parent != null && this.parent.insertBefore(h, this.next), h.appendChild(this), h;
          }, _.blotName = "abstract", _;
        }();
        d.default = b;
      },
      function(m, d, f) {
        Object.defineProperty(d, "__esModule", { value: !0 });
        var E = f(12), b = f(32), _ = f(33), g = f(1), y = function() {
          function h(o) {
            this.attributes = {}, this.domNode = o, this.build();
          }
          return h.prototype.attribute = function(o, t) {
            t ? o.add(this.domNode, t) && (o.value(this.domNode) != null ? this.attributes[o.attrName] = o : delete this.attributes[o.attrName]) : (o.remove(this.domNode), delete this.attributes[o.attrName]);
          }, h.prototype.build = function() {
            var o = this;
            this.attributes = {};
            var t = E.default.keys(this.domNode), e = b.default.keys(this.domNode), s = _.default.keys(this.domNode);
            t.concat(e).concat(s).forEach(function(l) {
              var u = g.query(l, g.Scope.ATTRIBUTE);
              u instanceof E.default && (o.attributes[u.attrName] = u);
            });
          }, h.prototype.copy = function(o) {
            var t = this;
            Object.keys(this.attributes).forEach(function(e) {
              var s = t.attributes[e].value(t.domNode);
              o.format(e, s);
            });
          }, h.prototype.move = function(o) {
            var t = this;
            this.copy(o), Object.keys(this.attributes).forEach(function(e) {
              t.attributes[e].remove(t.domNode);
            }), this.attributes = {};
          }, h.prototype.values = function() {
            var o = this;
            return Object.keys(this.attributes).reduce(function(t, e) {
              return t[e] = o.attributes[e].value(o.domNode), t;
            }, {});
          }, h;
        }();
        d.default = y;
      },
      function(m, d, f) {
        var E = this && this.__extends || function() {
          var y = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(h, o) {
            h.__proto__ = o;
          } || function(h, o) {
            for (var t in o)
              o.hasOwnProperty(t) && (h[t] = o[t]);
          };
          return function(h, o) {
            y(h, o);
            function t() {
              this.constructor = h;
            }
            h.prototype = o === null ? Object.create(o) : (t.prototype = o.prototype, new t());
          };
        }();
        Object.defineProperty(d, "__esModule", { value: !0 });
        var b = f(12);
        function _(y, h) {
          var o = y.getAttribute("class") || "";
          return o.split(/\s+/).filter(function(t) {
            return t.indexOf(h + "-") === 0;
          });
        }
        var g = function(y) {
          E(h, y);
          function h() {
            return y !== null && y.apply(this, arguments) || this;
          }
          return h.keys = function(o) {
            return (o.getAttribute("class") || "").split(/\s+/).map(function(t) {
              return t.split("-").slice(0, -1).join("-");
            });
          }, h.prototype.add = function(o, t) {
            return this.canAdd(o, t) ? (this.remove(o), o.classList.add(this.keyName + "-" + t), !0) : !1;
          }, h.prototype.remove = function(o) {
            var t = _(o, this.keyName);
            t.forEach(function(e) {
              o.classList.remove(e);
            }), o.classList.length === 0 && o.removeAttribute("class");
          }, h.prototype.value = function(o) {
            var t = _(o, this.keyName)[0] || "", e = t.slice(this.keyName.length + 1);
            return this.canAdd(o, e) ? e : "";
          }, h;
        }(b.default);
        d.default = g;
      },
      function(m, d, f) {
        var E = this && this.__extends || function() {
          var y = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(h, o) {
            h.__proto__ = o;
          } || function(h, o) {
            for (var t in o)
              o.hasOwnProperty(t) && (h[t] = o[t]);
          };
          return function(h, o) {
            y(h, o);
            function t() {
              this.constructor = h;
            }
            h.prototype = o === null ? Object.create(o) : (t.prototype = o.prototype, new t());
          };
        }();
        Object.defineProperty(d, "__esModule", { value: !0 });
        var b = f(12);
        function _(y) {
          var h = y.split("-"), o = h.slice(1).map(function(t) {
            return t[0].toUpperCase() + t.slice(1);
          }).join("");
          return h[0] + o;
        }
        var g = function(y) {
          E(h, y);
          function h() {
            return y !== null && y.apply(this, arguments) || this;
          }
          return h.keys = function(o) {
            return (o.getAttribute("style") || "").split(";").map(function(t) {
              var e = t.split(":");
              return e[0].trim();
            });
          }, h.prototype.add = function(o, t) {
            return this.canAdd(o, t) ? (o.style[_(this.keyName)] = t, !0) : !1;
          }, h.prototype.remove = function(o) {
            o.style[_(this.keyName)] = "", o.getAttribute("style") || o.removeAttribute("style");
          }, h.prototype.value = function(o) {
            var t = o.style[_(this.keyName)];
            return this.canAdd(o, t) ? t : "";
          }, h;
        }(b.default);
        d.default = g;
      },
      function(m, d, f) {
        Object.defineProperty(d, "__esModule", {
          value: !0
        });
        var E = function() {
          function g(y, h) {
            for (var o = 0; o < h.length; o++) {
              var t = h[o];
              t.enumerable = t.enumerable || !1, t.configurable = !0, "value" in t && (t.writable = !0), Object.defineProperty(y, t.key, t);
            }
          }
          return function(y, h, o) {
            return h && g(y.prototype, h), o && g(y, o), y;
          };
        }();
        function b(g, y) {
          if (!(g instanceof y))
            throw new TypeError("Cannot call a class as a function");
        }
        var _ = function() {
          function g(y, h) {
            b(this, g), this.quill = y, this.options = h, this.modules = {};
          }
          return E(g, [{
            key: "init",
            value: function() {
              var h = this;
              Object.keys(this.options.modules).forEach(function(o) {
                h.modules[o] == null && h.addModule(o);
              });
            }
          }, {
            key: "addModule",
            value: function(h) {
              var o = this.quill.constructor.import("modules/" + h);
              return this.modules[h] = new o(this.quill, this.options.modules[h] || {}), this.modules[h];
            }
          }]), g;
        }();
        _.DEFAULTS = {
          modules: {}
        }, _.themes = {
          default: _
        }, d.default = _;
      },
      function(m, d, f) {
        Object.defineProperty(d, "__esModule", {
          value: !0
        });
        var E = function() {
          function r(i, c) {
            for (var n = 0; n < c.length; n++) {
              var v = c[n];
              v.enumerable = v.enumerable || !1, v.configurable = !0, "value" in v && (v.writable = !0), Object.defineProperty(i, v.key, v);
            }
          }
          return function(i, c, n) {
            return c && r(i.prototype, c), n && r(i, n), i;
          };
        }(), b = function r(i, c, n) {
          i === null && (i = Function.prototype);
          var v = Object.getOwnPropertyDescriptor(i, c);
          if (v === void 0) {
            var S = Object.getPrototypeOf(i);
            return S === null ? void 0 : r(S, c, n);
          } else {
            if ("value" in v)
              return v.value;
            var w = v.get;
            return w === void 0 ? void 0 : w.call(n);
          }
        }, _ = f(0), g = o(_), y = f(7), h = o(y);
        function o(r) {
          return r && r.__esModule ? r : { default: r };
        }
        function t(r, i) {
          if (!(r instanceof i))
            throw new TypeError("Cannot call a class as a function");
        }
        function e(r, i) {
          if (!r)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return i && (typeof i == "object" || typeof i == "function") ? i : r;
        }
        function s(r, i) {
          if (typeof i != "function" && i !== null)
            throw new TypeError("Super expression must either be null or a function, not " + typeof i);
          r.prototype = Object.create(i && i.prototype, { constructor: { value: r, enumerable: !1, writable: !0, configurable: !0 } }), i && (Object.setPrototypeOf ? Object.setPrototypeOf(r, i) : r.__proto__ = i);
        }
        var l = "\uFEFF", u = function(r) {
          s(i, r);
          function i(c) {
            t(this, i);
            var n = e(this, (i.__proto__ || Object.getPrototypeOf(i)).call(this, c));
            return n.contentNode = document.createElement("span"), n.contentNode.setAttribute("contenteditable", !1), [].slice.call(n.domNode.childNodes).forEach(function(v) {
              n.contentNode.appendChild(v);
            }), n.leftGuard = document.createTextNode(l), n.rightGuard = document.createTextNode(l), n.domNode.appendChild(n.leftGuard), n.domNode.appendChild(n.contentNode), n.domNode.appendChild(n.rightGuard), n;
          }
          return E(i, [{
            key: "index",
            value: function(n, v) {
              return n === this.leftGuard ? 0 : n === this.rightGuard ? 1 : b(i.prototype.__proto__ || Object.getPrototypeOf(i.prototype), "index", this).call(this, n, v);
            }
          }, {
            key: "restore",
            value: function(n) {
              var v = void 0, S = void 0, w = n.data.split(l).join("");
              if (n === this.leftGuard)
                if (this.prev instanceof h.default) {
                  var T = this.prev.length();
                  this.prev.insertAt(T, w), v = {
                    startNode: this.prev.domNode,
                    startOffset: T + w.length
                  };
                } else
                  S = document.createTextNode(w), this.parent.insertBefore(g.default.create(S), this), v = {
                    startNode: S,
                    startOffset: w.length
                  };
              else
                n === this.rightGuard && (this.next instanceof h.default ? (this.next.insertAt(0, w), v = {
                  startNode: this.next.domNode,
                  startOffset: w.length
                }) : (S = document.createTextNode(w), this.parent.insertBefore(g.default.create(S), this.next), v = {
                  startNode: S,
                  startOffset: w.length
                }));
              return n.data = l, v;
            }
          }, {
            key: "update",
            value: function(n, v) {
              var S = this;
              n.forEach(function(w) {
                if (w.type === "characterData" && (w.target === S.leftGuard || w.target === S.rightGuard)) {
                  var T = S.restore(w.target);
                  T && (v.range = T);
                }
              });
            }
          }]), i;
        }(g.default.Embed);
        d.default = u;
      },
      function(m, d, f) {
        Object.defineProperty(d, "__esModule", {
          value: !0
        }), d.AlignStyle = d.AlignClass = d.AlignAttribute = void 0;
        var E = f(0), b = _(E);
        function _(t) {
          return t && t.__esModule ? t : { default: t };
        }
        var g = {
          scope: b.default.Scope.BLOCK,
          whitelist: ["right", "center", "justify"]
        }, y = new b.default.Attributor.Attribute("align", "align", g), h = new b.default.Attributor.Class("align", "ql-align", g), o = new b.default.Attributor.Style("align", "text-align", g);
        d.AlignAttribute = y, d.AlignClass = h, d.AlignStyle = o;
      },
      function(m, d, f) {
        Object.defineProperty(d, "__esModule", {
          value: !0
        }), d.BackgroundStyle = d.BackgroundClass = void 0;
        var E = f(0), b = g(E), _ = f(26);
        function g(o) {
          return o && o.__esModule ? o : { default: o };
        }
        var y = new b.default.Attributor.Class("background", "ql-bg", {
          scope: b.default.Scope.INLINE
        }), h = new _.ColorAttributor("background", "background-color", {
          scope: b.default.Scope.INLINE
        });
        d.BackgroundClass = y, d.BackgroundStyle = h;
      },
      function(m, d, f) {
        Object.defineProperty(d, "__esModule", {
          value: !0
        }), d.DirectionStyle = d.DirectionClass = d.DirectionAttribute = void 0;
        var E = f(0), b = _(E);
        function _(t) {
          return t && t.__esModule ? t : { default: t };
        }
        var g = {
          scope: b.default.Scope.BLOCK,
          whitelist: ["rtl"]
        }, y = new b.default.Attributor.Attribute("direction", "dir", g), h = new b.default.Attributor.Class("direction", "ql-direction", g), o = new b.default.Attributor.Style("direction", "direction", g);
        d.DirectionAttribute = y, d.DirectionClass = h, d.DirectionStyle = o;
      },
      function(m, d, f) {
        Object.defineProperty(d, "__esModule", {
          value: !0
        }), d.FontClass = d.FontStyle = void 0;
        var E = function() {
          function r(i, c) {
            for (var n = 0; n < c.length; n++) {
              var v = c[n];
              v.enumerable = v.enumerable || !1, v.configurable = !0, "value" in v && (v.writable = !0), Object.defineProperty(i, v.key, v);
            }
          }
          return function(i, c, n) {
            return c && r(i.prototype, c), n && r(i, n), i;
          };
        }(), b = function r(i, c, n) {
          i === null && (i = Function.prototype);
          var v = Object.getOwnPropertyDescriptor(i, c);
          if (v === void 0) {
            var S = Object.getPrototypeOf(i);
            return S === null ? void 0 : r(S, c, n);
          } else {
            if ("value" in v)
              return v.value;
            var w = v.get;
            return w === void 0 ? void 0 : w.call(n);
          }
        }, _ = f(0), g = y(_);
        function y(r) {
          return r && r.__esModule ? r : { default: r };
        }
        function h(r, i) {
          if (!(r instanceof i))
            throw new TypeError("Cannot call a class as a function");
        }
        function o(r, i) {
          if (!r)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return i && (typeof i == "object" || typeof i == "function") ? i : r;
        }
        function t(r, i) {
          if (typeof i != "function" && i !== null)
            throw new TypeError("Super expression must either be null or a function, not " + typeof i);
          r.prototype = Object.create(i && i.prototype, { constructor: { value: r, enumerable: !1, writable: !0, configurable: !0 } }), i && (Object.setPrototypeOf ? Object.setPrototypeOf(r, i) : r.__proto__ = i);
        }
        var e = {
          scope: g.default.Scope.INLINE,
          whitelist: ["serif", "monospace"]
        }, s = new g.default.Attributor.Class("font", "ql-font", e), l = function(r) {
          t(i, r);
          function i() {
            return h(this, i), o(this, (i.__proto__ || Object.getPrototypeOf(i)).apply(this, arguments));
          }
          return E(i, [{
            key: "value",
            value: function(n) {
              return b(i.prototype.__proto__ || Object.getPrototypeOf(i.prototype), "value", this).call(this, n).replace(/["']/g, "");
            }
          }]), i;
        }(g.default.Attributor.Style), u = new l("font", "font-family", e);
        d.FontStyle = u, d.FontClass = s;
      },
      function(m, d, f) {
        Object.defineProperty(d, "__esModule", {
          value: !0
        }), d.SizeStyle = d.SizeClass = void 0;
        var E = f(0), b = _(E);
        function _(h) {
          return h && h.__esModule ? h : { default: h };
        }
        var g = new b.default.Attributor.Class("size", "ql-size", {
          scope: b.default.Scope.INLINE,
          whitelist: ["small", "large", "huge"]
        }), y = new b.default.Attributor.Style("size", "font-size", {
          scope: b.default.Scope.INLINE,
          whitelist: ["10px", "18px", "32px"]
        });
        d.SizeClass = g, d.SizeStyle = y;
      },
      function(m, d, f) {
        m.exports = {
          align: {
            "": f(76),
            center: f(77),
            right: f(78),
            justify: f(79)
          },
          background: f(80),
          blockquote: f(81),
          bold: f(82),
          clean: f(83),
          code: f(58),
          "code-block": f(58),
          color: f(84),
          direction: {
            "": f(85),
            rtl: f(86)
          },
          float: {
            center: f(87),
            full: f(88),
            left: f(89),
            right: f(90)
          },
          formula: f(91),
          header: {
            1: f(92),
            2: f(93)
          },
          italic: f(94),
          image: f(95),
          indent: {
            "+1": f(96),
            "-1": f(97)
          },
          link: f(98),
          list: {
            ordered: f(99),
            bullet: f(100),
            check: f(101)
          },
          script: {
            sub: f(102),
            super: f(103)
          },
          strike: f(104),
          underline: f(105),
          video: f(106)
        };
      },
      function(m, d, f) {
        Object.defineProperty(d, "__esModule", {
          value: !0
        }), d.getLastChangeIndex = d.default = void 0;
        var E = function() {
          function c(n, v) {
            for (var S = 0; S < v.length; S++) {
              var w = v[S];
              w.enumerable = w.enumerable || !1, w.configurable = !0, "value" in w && (w.writable = !0), Object.defineProperty(n, w.key, w);
            }
          }
          return function(n, v, S) {
            return v && c(n.prototype, v), S && c(n, S), n;
          };
        }(), b = f(0), _ = t(b), g = f(5), y = t(g), h = f(9), o = t(h);
        function t(c) {
          return c && c.__esModule ? c : { default: c };
        }
        function e(c, n) {
          if (!(c instanceof n))
            throw new TypeError("Cannot call a class as a function");
        }
        function s(c, n) {
          if (!c)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return n && (typeof n == "object" || typeof n == "function") ? n : c;
        }
        function l(c, n) {
          if (typeof n != "function" && n !== null)
            throw new TypeError("Super expression must either be null or a function, not " + typeof n);
          c.prototype = Object.create(n && n.prototype, { constructor: { value: c, enumerable: !1, writable: !0, configurable: !0 } }), n && (Object.setPrototypeOf ? Object.setPrototypeOf(c, n) : c.__proto__ = n);
        }
        var u = function(c) {
          l(n, c);
          function n(v, S) {
            e(this, n);
            var w = s(this, (n.__proto__ || Object.getPrototypeOf(n)).call(this, v, S));
            return w.lastRecorded = 0, w.ignoreChange = !1, w.clear(), w.quill.on(y.default.events.EDITOR_CHANGE, function(T, P, A, p) {
              T !== y.default.events.TEXT_CHANGE || w.ignoreChange || (!w.options.userOnly || p === y.default.sources.USER ? w.record(P, A) : w.transform(P));
            }), w.quill.keyboard.addBinding({ key: "Z", shortKey: !0 }, w.undo.bind(w)), w.quill.keyboard.addBinding({ key: "Z", shortKey: !0, shiftKey: !0 }, w.redo.bind(w)), /Win/i.test(navigator.platform) && w.quill.keyboard.addBinding({ key: "Y", shortKey: !0 }, w.redo.bind(w)), w;
          }
          return E(n, [{
            key: "change",
            value: function(S, w) {
              if (this.stack[S].length !== 0) {
                var T = this.stack[S].pop();
                this.stack[w].push(T), this.lastRecorded = 0, this.ignoreChange = !0, this.quill.updateContents(T[S], y.default.sources.USER), this.ignoreChange = !1;
                var P = i(T[S]);
                this.quill.setSelection(P);
              }
            }
          }, {
            key: "clear",
            value: function() {
              this.stack = { undo: [], redo: [] };
            }
          }, {
            key: "cutoff",
            value: function() {
              this.lastRecorded = 0;
            }
          }, {
            key: "record",
            value: function(S, w) {
              if (S.ops.length !== 0) {
                this.stack.redo = [];
                var T = this.quill.getContents().diff(w), P = Date.now();
                if (this.lastRecorded + this.options.delay > P && this.stack.undo.length > 0) {
                  var A = this.stack.undo.pop();
                  T = T.compose(A.undo), S = A.redo.compose(S);
                } else
                  this.lastRecorded = P;
                this.stack.undo.push({
                  redo: S,
                  undo: T
                }), this.stack.undo.length > this.options.maxStack && this.stack.undo.shift();
              }
            }
          }, {
            key: "redo",
            value: function() {
              this.change("redo", "undo");
            }
          }, {
            key: "transform",
            value: function(S) {
              this.stack.undo.forEach(function(w) {
                w.undo = S.transform(w.undo, !0), w.redo = S.transform(w.redo, !0);
              }), this.stack.redo.forEach(function(w) {
                w.undo = S.transform(w.undo, !0), w.redo = S.transform(w.redo, !0);
              });
            }
          }, {
            key: "undo",
            value: function() {
              this.change("undo", "redo");
            }
          }]), n;
        }(o.default);
        u.DEFAULTS = {
          delay: 1e3,
          maxStack: 100,
          userOnly: !1
        };
        function r(c) {
          var n = c.ops[c.ops.length - 1];
          return n == null ? !1 : n.insert != null ? typeof n.insert == "string" && n.insert.endsWith(`
`) : n.attributes != null ? Object.keys(n.attributes).some(function(v) {
            return _.default.query(v, _.default.Scope.BLOCK) != null;
          }) : !1;
        }
        function i(c) {
          var n = c.reduce(function(S, w) {
            return S += w.delete || 0, S;
          }, 0), v = c.length() - n;
          return r(c) && (v -= 1), v;
        }
        d.default = u, d.getLastChangeIndex = i;
      },
      function(m, d, f) {
        Object.defineProperty(d, "__esModule", {
          value: !0
        }), d.default = d.BaseTooltip = void 0;
        var E = function() {
          function I(M, K) {
            for (var C = 0; C < K.length; C++) {
              var q = K[C];
              q.enumerable = q.enumerable || !1, q.configurable = !0, "value" in q && (q.writable = !0), Object.defineProperty(M, q.key, q);
            }
          }
          return function(M, K, C) {
            return K && I(M.prototype, K), C && I(M, C), M;
          };
        }(), b = function I(M, K, C) {
          M === null && (M = Function.prototype);
          var q = Object.getOwnPropertyDescriptor(M, K);
          if (q === void 0) {
            var F = Object.getPrototypeOf(M);
            return F === null ? void 0 : I(F, K, C);
          } else {
            if ("value" in q)
              return q.value;
            var G = q.get;
            return G === void 0 ? void 0 : G.call(C);
          }
        }, _ = f(3), g = P(_), y = f(2), h = P(y), o = f(8), t = P(o), e = f(23), s = P(e), l = f(34), u = P(l), r = f(59), i = P(r), c = f(60), n = P(c), v = f(28), S = P(v), w = f(61), T = P(w);
        function P(I) {
          return I && I.__esModule ? I : { default: I };
        }
        function A(I, M) {
          if (!(I instanceof M))
            throw new TypeError("Cannot call a class as a function");
        }
        function p(I, M) {
          if (!I)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return M && (typeof M == "object" || typeof M == "function") ? M : I;
        }
        function O(I, M) {
          if (typeof M != "function" && M !== null)
            throw new TypeError("Super expression must either be null or a function, not " + typeof M);
          I.prototype = Object.create(M && M.prototype, { constructor: { value: I, enumerable: !1, writable: !0, configurable: !0 } }), M && (Object.setPrototypeOf ? Object.setPrototypeOf(I, M) : I.__proto__ = M);
        }
        var k = [!1, "center", "right", "justify"], L = ["#000000", "#e60000", "#ff9900", "#ffff00", "#008a00", "#0066cc", "#9933ff", "#ffffff", "#facccc", "#ffebcc", "#ffffcc", "#cce8cc", "#cce0f5", "#ebd6ff", "#bbbbbb", "#f06666", "#ffc266", "#ffff66", "#66b966", "#66a3e0", "#c285ff", "#888888", "#a10000", "#b26b00", "#b2b200", "#006100", "#0047b2", "#6b24b2", "#444444", "#5c0000", "#663d00", "#666600", "#003700", "#002966", "#3d1466"], D = [!1, "serif", "monospace"], z = ["1", "2", "3", !1], $ = ["small", !1, "large", "huge"], J = function(I) {
          O(M, I);
          function M(K, C) {
            A(this, M);
            var q = p(this, (M.__proto__ || Object.getPrototypeOf(M)).call(this, K, C)), F = function G(V) {
              if (!document.body.contains(K.root))
                return document.body.removeEventListener("click", G);
              q.tooltip != null && !q.tooltip.root.contains(V.target) && document.activeElement !== q.tooltip.textbox && !q.quill.hasFocus() && q.tooltip.hide(), q.pickers != null && q.pickers.forEach(function(Q) {
                Q.container.contains(V.target) || Q.close();
              });
            };
            return K.emitter.listenDOM("click", document.body, F), q;
          }
          return E(M, [{
            key: "addModule",
            value: function(C) {
              var q = b(M.prototype.__proto__ || Object.getPrototypeOf(M.prototype), "addModule", this).call(this, C);
              return C === "toolbar" && this.extendToolbar(q), q;
            }
          }, {
            key: "buildButtons",
            value: function(C, q) {
              C.forEach(function(F) {
                var G = F.getAttribute("class") || "";
                G.split(/\s+/).forEach(function(V) {
                  if (!!V.startsWith("ql-") && (V = V.slice(3), q[V] != null))
                    if (V === "direction")
                      F.innerHTML = q[V][""] + q[V].rtl;
                    else if (typeof q[V] == "string")
                      F.innerHTML = q[V];
                    else {
                      var Q = F.value || "";
                      Q != null && q[V][Q] && (F.innerHTML = q[V][Q]);
                    }
                });
              });
            }
          }, {
            key: "buildPickers",
            value: function(C, q) {
              var F = this;
              this.pickers = C.map(function(V) {
                if (V.classList.contains("ql-align"))
                  return V.querySelector("option") == null && N(V, k), new n.default(V, q.align);
                if (V.classList.contains("ql-background") || V.classList.contains("ql-color")) {
                  var Q = V.classList.contains("ql-background") ? "background" : "color";
                  return V.querySelector("option") == null && N(V, L, Q === "background" ? "#ffffff" : "#000000"), new i.default(V, q[Q]);
                } else
                  return V.querySelector("option") == null && (V.classList.contains("ql-font") ? N(V, D) : V.classList.contains("ql-header") ? N(V, z) : V.classList.contains("ql-size") && N(V, $)), new S.default(V);
              });
              var G = function() {
                F.pickers.forEach(function(Q) {
                  Q.update();
                });
              };
              this.quill.on(t.default.events.EDITOR_CHANGE, G);
            }
          }]), M;
        }(u.default);
        J.DEFAULTS = (0, g.default)(!0, {}, u.default.DEFAULTS, {
          modules: {
            toolbar: {
              handlers: {
                formula: function() {
                  this.quill.theme.tooltip.edit("formula");
                },
                image: function() {
                  var M = this, K = this.container.querySelector("input.ql-image[type=file]");
                  K == null && (K = document.createElement("input"), K.setAttribute("type", "file"), K.setAttribute("accept", "image/png, image/gif, image/jpeg, image/bmp, image/x-icon"), K.classList.add("ql-image"), K.addEventListener("change", function() {
                    if (K.files != null && K.files[0] != null) {
                      var C = new FileReader();
                      C.onload = function(q) {
                        var F = M.quill.getSelection(!0);
                        M.quill.updateContents(new h.default().retain(F.index).delete(F.length).insert({ image: q.target.result }), t.default.sources.USER), M.quill.setSelection(F.index + 1, t.default.sources.SILENT), K.value = "";
                      }, C.readAsDataURL(K.files[0]);
                    }
                  }), this.container.appendChild(K)), K.click();
                },
                video: function() {
                  this.quill.theme.tooltip.edit("video");
                }
              }
            }
          }
        });
        var H = function(I) {
          O(M, I);
          function M(K, C) {
            A(this, M);
            var q = p(this, (M.__proto__ || Object.getPrototypeOf(M)).call(this, K, C));
            return q.textbox = q.root.querySelector('input[type="text"]'), q.listen(), q;
          }
          return E(M, [{
            key: "listen",
            value: function() {
              var C = this;
              this.textbox.addEventListener("keydown", function(q) {
                s.default.match(q, "enter") ? (C.save(), q.preventDefault()) : s.default.match(q, "escape") && (C.cancel(), q.preventDefault());
              });
            }
          }, {
            key: "cancel",
            value: function() {
              this.hide();
            }
          }, {
            key: "edit",
            value: function() {
              var C = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "link", q = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
              this.root.classList.remove("ql-hidden"), this.root.classList.add("ql-editing"), q != null ? this.textbox.value = q : C !== this.root.getAttribute("data-mode") && (this.textbox.value = ""), this.position(this.quill.getBounds(this.quill.selection.savedRange)), this.textbox.select(), this.textbox.setAttribute("placeholder", this.textbox.getAttribute("data-" + C) || ""), this.root.setAttribute("data-mode", C);
            }
          }, {
            key: "restoreFocus",
            value: function() {
              var C = this.quill.scrollingContainer.scrollTop;
              this.quill.focus(), this.quill.scrollingContainer.scrollTop = C;
            }
          }, {
            key: "save",
            value: function() {
              var C = this.textbox.value;
              switch (this.root.getAttribute("data-mode")) {
                case "link": {
                  var q = this.quill.root.scrollTop;
                  this.linkRange ? (this.quill.formatText(this.linkRange, "link", C, t.default.sources.USER), delete this.linkRange) : (this.restoreFocus(), this.quill.format("link", C, t.default.sources.USER)), this.quill.root.scrollTop = q;
                  break;
                }
                case "video":
                  C = j(C);
                case "formula": {
                  if (!C)
                    break;
                  var F = this.quill.getSelection(!0);
                  if (F != null) {
                    var G = F.index + F.length;
                    this.quill.insertEmbed(G, this.root.getAttribute("data-mode"), C, t.default.sources.USER), this.root.getAttribute("data-mode") === "formula" && this.quill.insertText(G + 1, " ", t.default.sources.USER), this.quill.setSelection(G + 2, t.default.sources.USER);
                  }
                  break;
                }
              }
              this.textbox.value = "", this.hide();
            }
          }]), M;
        }(T.default);
        function j(I) {
          var M = I.match(/^(?:(https?):\/\/)?(?:(?:www|m)\.)?youtube\.com\/watch.*v=([a-zA-Z0-9_-]+)/) || I.match(/^(?:(https?):\/\/)?(?:(?:www|m)\.)?youtu\.be\/([a-zA-Z0-9_-]+)/);
          return M ? (M[1] || "https") + "://www.youtube.com/embed/" + M[2] + "?showinfo=0" : (M = I.match(/^(?:(https?):\/\/)?(?:www\.)?vimeo\.com\/(\d+)/)) ? (M[1] || "https") + "://player.vimeo.com/video/" + M[2] + "/" : I;
        }
        function N(I, M) {
          var K = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
          M.forEach(function(C) {
            var q = document.createElement("option");
            C === K ? q.setAttribute("selected", "selected") : q.setAttribute("value", C), I.appendChild(q);
          });
        }
        d.BaseTooltip = H, d.default = J;
      },
      function(m, d, f) {
        Object.defineProperty(d, "__esModule", { value: !0 });
        var E = function() {
          function b() {
            this.head = this.tail = null, this.length = 0;
          }
          return b.prototype.append = function() {
            for (var _ = [], g = 0; g < arguments.length; g++)
              _[g] = arguments[g];
            this.insertBefore(_[0], null), _.length > 1 && this.append.apply(this, _.slice(1));
          }, b.prototype.contains = function(_) {
            for (var g, y = this.iterator(); g = y(); )
              if (g === _)
                return !0;
            return !1;
          }, b.prototype.insertBefore = function(_, g) {
            !_ || (_.next = g, g != null ? (_.prev = g.prev, g.prev != null && (g.prev.next = _), g.prev = _, g === this.head && (this.head = _)) : this.tail != null ? (this.tail.next = _, _.prev = this.tail, this.tail = _) : (_.prev = null, this.head = this.tail = _), this.length += 1);
          }, b.prototype.offset = function(_) {
            for (var g = 0, y = this.head; y != null; ) {
              if (y === _)
                return g;
              g += y.length(), y = y.next;
            }
            return -1;
          }, b.prototype.remove = function(_) {
            !this.contains(_) || (_.prev != null && (_.prev.next = _.next), _.next != null && (_.next.prev = _.prev), _ === this.head && (this.head = _.next), _ === this.tail && (this.tail = _.prev), this.length -= 1);
          }, b.prototype.iterator = function(_) {
            return _ === void 0 && (_ = this.head), function() {
              var g = _;
              return _ != null && (_ = _.next), g;
            };
          }, b.prototype.find = function(_, g) {
            g === void 0 && (g = !1);
            for (var y, h = this.iterator(); y = h(); ) {
              var o = y.length();
              if (_ < o || g && _ === o && (y.next == null || y.next.length() !== 0))
                return [y, _];
              _ -= o;
            }
            return [null, 0];
          }, b.prototype.forEach = function(_) {
            for (var g, y = this.iterator(); g = y(); )
              _(g);
          }, b.prototype.forEachAt = function(_, g, y) {
            if (!(g <= 0))
              for (var h = this.find(_), o = h[0], t = h[1], e, s = _ - t, l = this.iterator(o); (e = l()) && s < _ + g; ) {
                var u = e.length();
                _ > s ? y(e, _ - s, Math.min(g, s + u - _)) : y(e, 0, Math.min(u, _ + g - s)), s += u;
              }
          }, b.prototype.map = function(_) {
            return this.reduce(function(g, y) {
              return g.push(_(y)), g;
            }, []);
          }, b.prototype.reduce = function(_, g) {
            for (var y, h = this.iterator(); y = h(); )
              g = _(g, y);
            return g;
          }, b;
        }();
        d.default = E;
      },
      function(m, d, f) {
        var E = this && this.__extends || function() {
          var o = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t, e) {
            t.__proto__ = e;
          } || function(t, e) {
            for (var s in e)
              e.hasOwnProperty(s) && (t[s] = e[s]);
          };
          return function(t, e) {
            o(t, e);
            function s() {
              this.constructor = t;
            }
            t.prototype = e === null ? Object.create(e) : (s.prototype = e.prototype, new s());
          };
        }();
        Object.defineProperty(d, "__esModule", { value: !0 });
        var b = f(17), _ = f(1), g = {
          attributes: !0,
          characterData: !0,
          characterDataOldValue: !0,
          childList: !0,
          subtree: !0
        }, y = 100, h = function(o) {
          E(t, o);
          function t(e) {
            var s = o.call(this, e) || this;
            return s.scroll = s, s.observer = new MutationObserver(function(l) {
              s.update(l);
            }), s.observer.observe(s.domNode, g), s.attach(), s;
          }
          return t.prototype.detach = function() {
            o.prototype.detach.call(this), this.observer.disconnect();
          }, t.prototype.deleteAt = function(e, s) {
            this.update(), e === 0 && s === this.length() ? this.children.forEach(function(l) {
              l.remove();
            }) : o.prototype.deleteAt.call(this, e, s);
          }, t.prototype.formatAt = function(e, s, l, u) {
            this.update(), o.prototype.formatAt.call(this, e, s, l, u);
          }, t.prototype.insertAt = function(e, s, l) {
            this.update(), o.prototype.insertAt.call(this, e, s, l);
          }, t.prototype.optimize = function(e, s) {
            var l = this;
            e === void 0 && (e = []), s === void 0 && (s = {}), o.prototype.optimize.call(this, s);
            for (var u = [].slice.call(this.observer.takeRecords()); u.length > 0; )
              e.push(u.pop());
            for (var r = function(v, S) {
              S === void 0 && (S = !0), !(v == null || v === l) && v.domNode.parentNode != null && (v.domNode[_.DATA_KEY].mutations == null && (v.domNode[_.DATA_KEY].mutations = []), S && r(v.parent));
            }, i = function(v) {
              v.domNode[_.DATA_KEY] == null || v.domNode[_.DATA_KEY].mutations == null || (v instanceof b.default && v.children.forEach(i), v.optimize(s));
            }, c = e, n = 0; c.length > 0; n += 1) {
              if (n >= y)
                throw new Error("[Parchment] Maximum optimize iterations reached");
              for (c.forEach(function(v) {
                var S = _.find(v.target, !0);
                S != null && (S.domNode === v.target && (v.type === "childList" ? (r(_.find(v.previousSibling, !1)), [].forEach.call(v.addedNodes, function(w) {
                  var T = _.find(w, !1);
                  r(T, !1), T instanceof b.default && T.children.forEach(function(P) {
                    r(P, !1);
                  });
                })) : v.type === "attributes" && r(S.prev)), r(S));
              }), this.children.forEach(i), c = [].slice.call(this.observer.takeRecords()), u = c.slice(); u.length > 0; )
                e.push(u.pop());
            }
          }, t.prototype.update = function(e, s) {
            var l = this;
            s === void 0 && (s = {}), e = e || this.observer.takeRecords(), e.map(function(u) {
              var r = _.find(u.target, !0);
              return r == null ? null : r.domNode[_.DATA_KEY].mutations == null ? (r.domNode[_.DATA_KEY].mutations = [u], r) : (r.domNode[_.DATA_KEY].mutations.push(u), null);
            }).forEach(function(u) {
              u == null || u === l || u.domNode[_.DATA_KEY] == null || u.update(u.domNode[_.DATA_KEY].mutations || [], s);
            }), this.domNode[_.DATA_KEY].mutations != null && o.prototype.update.call(this, this.domNode[_.DATA_KEY].mutations, s), this.optimize(e, s);
          }, t.blotName = "scroll", t.defaultChild = "block", t.scope = _.Scope.BLOCK_BLOT, t.tagName = "DIV", t;
        }(b.default);
        d.default = h;
      },
      function(m, d, f) {
        var E = this && this.__extends || function() {
          var h = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(o, t) {
            o.__proto__ = t;
          } || function(o, t) {
            for (var e in t)
              t.hasOwnProperty(e) && (o[e] = t[e]);
          };
          return function(o, t) {
            h(o, t);
            function e() {
              this.constructor = o;
            }
            o.prototype = t === null ? Object.create(t) : (e.prototype = t.prototype, new e());
          };
        }();
        Object.defineProperty(d, "__esModule", { value: !0 });
        var b = f(18), _ = f(1);
        function g(h, o) {
          if (Object.keys(h).length !== Object.keys(o).length)
            return !1;
          for (var t in h)
            if (h[t] !== o[t])
              return !1;
          return !0;
        }
        var y = function(h) {
          E(o, h);
          function o() {
            return h !== null && h.apply(this, arguments) || this;
          }
          return o.formats = function(t) {
            if (t.tagName !== o.tagName)
              return h.formats.call(this, t);
          }, o.prototype.format = function(t, e) {
            var s = this;
            t === this.statics.blotName && !e ? (this.children.forEach(function(l) {
              l instanceof b.default || (l = l.wrap(o.blotName, !0)), s.attributes.copy(l);
            }), this.unwrap()) : h.prototype.format.call(this, t, e);
          }, o.prototype.formatAt = function(t, e, s, l) {
            if (this.formats()[s] != null || _.query(s, _.Scope.ATTRIBUTE)) {
              var u = this.isolate(t, e);
              u.format(s, l);
            } else
              h.prototype.formatAt.call(this, t, e, s, l);
          }, o.prototype.optimize = function(t) {
            h.prototype.optimize.call(this, t);
            var e = this.formats();
            if (Object.keys(e).length === 0)
              return this.unwrap();
            var s = this.next;
            s instanceof o && s.prev === this && g(e, s.formats()) && (s.moveChildren(this), s.remove());
          }, o.blotName = "inline", o.scope = _.Scope.INLINE_BLOT, o.tagName = "SPAN", o;
        }(b.default);
        d.default = y;
      },
      function(m, d, f) {
        var E = this && this.__extends || function() {
          var y = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(h, o) {
            h.__proto__ = o;
          } || function(h, o) {
            for (var t in o)
              o.hasOwnProperty(t) && (h[t] = o[t]);
          };
          return function(h, o) {
            y(h, o);
            function t() {
              this.constructor = h;
            }
            h.prototype = o === null ? Object.create(o) : (t.prototype = o.prototype, new t());
          };
        }();
        Object.defineProperty(d, "__esModule", { value: !0 });
        var b = f(18), _ = f(1), g = function(y) {
          E(h, y);
          function h() {
            return y !== null && y.apply(this, arguments) || this;
          }
          return h.formats = function(o) {
            var t = _.query(h.blotName).tagName;
            if (o.tagName !== t)
              return y.formats.call(this, o);
          }, h.prototype.format = function(o, t) {
            _.query(o, _.Scope.BLOCK) != null && (o === this.statics.blotName && !t ? this.replaceWith(h.blotName) : y.prototype.format.call(this, o, t));
          }, h.prototype.formatAt = function(o, t, e, s) {
            _.query(e, _.Scope.BLOCK) != null ? this.format(e, s) : y.prototype.formatAt.call(this, o, t, e, s);
          }, h.prototype.insertAt = function(o, t, e) {
            if (e == null || _.query(t, _.Scope.INLINE) != null)
              y.prototype.insertAt.call(this, o, t, e);
            else {
              var s = this.split(o), l = _.create(t, e);
              s.parent.insertBefore(l, s);
            }
          }, h.prototype.update = function(o, t) {
            navigator.userAgent.match(/Trident/) ? this.build() : y.prototype.update.call(this, o, t);
          }, h.blotName = "block", h.scope = _.Scope.BLOCK_BLOT, h.tagName = "P", h;
        }(b.default);
        d.default = g;
      },
      function(m, d, f) {
        var E = this && this.__extends || function() {
          var g = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(y, h) {
            y.__proto__ = h;
          } || function(y, h) {
            for (var o in h)
              h.hasOwnProperty(o) && (y[o] = h[o]);
          };
          return function(y, h) {
            g(y, h);
            function o() {
              this.constructor = y;
            }
            y.prototype = h === null ? Object.create(h) : (o.prototype = h.prototype, new o());
          };
        }();
        Object.defineProperty(d, "__esModule", { value: !0 });
        var b = f(19), _ = function(g) {
          E(y, g);
          function y() {
            return g !== null && g.apply(this, arguments) || this;
          }
          return y.formats = function(h) {
          }, y.prototype.format = function(h, o) {
            g.prototype.formatAt.call(this, 0, this.length(), h, o);
          }, y.prototype.formatAt = function(h, o, t, e) {
            h === 0 && o === this.length() ? this.format(t, e) : g.prototype.formatAt.call(this, h, o, t, e);
          }, y.prototype.formats = function() {
            return this.statics.formats(this.domNode);
          }, y;
        }(b.default);
        d.default = _;
      },
      function(m, d, f) {
        var E = this && this.__extends || function() {
          var y = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(h, o) {
            h.__proto__ = o;
          } || function(h, o) {
            for (var t in o)
              o.hasOwnProperty(t) && (h[t] = o[t]);
          };
          return function(h, o) {
            y(h, o);
            function t() {
              this.constructor = h;
            }
            h.prototype = o === null ? Object.create(o) : (t.prototype = o.prototype, new t());
          };
        }();
        Object.defineProperty(d, "__esModule", { value: !0 });
        var b = f(19), _ = f(1), g = function(y) {
          E(h, y);
          function h(o) {
            var t = y.call(this, o) || this;
            return t.text = t.statics.value(t.domNode), t;
          }
          return h.create = function(o) {
            return document.createTextNode(o);
          }, h.value = function(o) {
            var t = o.data;
            return t.normalize && (t = t.normalize()), t;
          }, h.prototype.deleteAt = function(o, t) {
            this.domNode.data = this.text = this.text.slice(0, o) + this.text.slice(o + t);
          }, h.prototype.index = function(o, t) {
            return this.domNode === o ? t : -1;
          }, h.prototype.insertAt = function(o, t, e) {
            e == null ? (this.text = this.text.slice(0, o) + t + this.text.slice(o), this.domNode.data = this.text) : y.prototype.insertAt.call(this, o, t, e);
          }, h.prototype.length = function() {
            return this.text.length;
          }, h.prototype.optimize = function(o) {
            y.prototype.optimize.call(this, o), this.text = this.statics.value(this.domNode), this.text.length === 0 ? this.remove() : this.next instanceof h && this.next.prev === this && (this.insertAt(this.length(), this.next.value()), this.next.remove());
          }, h.prototype.position = function(o, t) {
            return [this.domNode, o];
          }, h.prototype.split = function(o, t) {
            if (t === void 0 && (t = !1), !t) {
              if (o === 0)
                return this;
              if (o === this.length())
                return this.next;
            }
            var e = _.create(this.domNode.splitText(o));
            return this.parent.insertBefore(e, this.next), this.text = this.statics.value(this.domNode), e;
          }, h.prototype.update = function(o, t) {
            var e = this;
            o.some(function(s) {
              return s.type === "characterData" && s.target === e.domNode;
            }) && (this.text = this.statics.value(this.domNode));
          }, h.prototype.value = function() {
            return this.text;
          }, h.blotName = "text", h.scope = _.Scope.INLINE_BLOT, h;
        }(b.default);
        d.default = g;
      },
      function(m, d, f) {
        var E = document.createElement("div");
        if (E.classList.toggle("test-class", !1), E.classList.contains("test-class")) {
          var b = DOMTokenList.prototype.toggle;
          DOMTokenList.prototype.toggle = function(_, g) {
            return arguments.length > 1 && !this.contains(_) == !g ? g : b.call(this, _);
          };
        }
        String.prototype.startsWith || (String.prototype.startsWith = function(_, g) {
          return g = g || 0, this.substr(g, _.length) === _;
        }), String.prototype.endsWith || (String.prototype.endsWith = function(_, g) {
          var y = this.toString();
          (typeof g != "number" || !isFinite(g) || Math.floor(g) !== g || g > y.length) && (g = y.length), g -= _.length;
          var h = y.indexOf(_, g);
          return h !== -1 && h === g;
        }), Array.prototype.find || Object.defineProperty(Array.prototype, "find", {
          value: function(g) {
            if (this === null)
              throw new TypeError("Array.prototype.find called on null or undefined");
            if (typeof g != "function")
              throw new TypeError("predicate must be a function");
            for (var y = Object(this), h = y.length >>> 0, o = arguments[1], t, e = 0; e < h; e++)
              if (t = y[e], g.call(o, t, e, y))
                return t;
          }
        }), document.addEventListener("DOMContentLoaded", function() {
          document.execCommand("enableObjectResizing", !1, !1), document.execCommand("autoUrlDetect", !1, !1);
        });
      },
      function(m, d) {
        var f = -1, E = 1, b = 0;
        function _(n, v, S) {
          if (n == v)
            return n ? [[b, n]] : [];
          (S < 0 || n.length < S) && (S = null);
          var w = o(n, v), T = n.substring(0, w);
          n = n.substring(w), v = v.substring(w), w = t(n, v);
          var P = n.substring(n.length - w);
          n = n.substring(0, n.length - w), v = v.substring(0, v.length - w);
          var A = g(n, v);
          return T && A.unshift([b, T]), P && A.push([b, P]), s(A), S != null && (A = r(A, S)), A = i(A), A;
        }
        function g(n, v) {
          var S;
          if (!n)
            return [[E, v]];
          if (!v)
            return [[f, n]];
          var w = n.length > v.length ? n : v, T = n.length > v.length ? v : n, P = w.indexOf(T);
          if (P != -1)
            return S = [
              [E, w.substring(0, P)],
              [b, T],
              [E, w.substring(P + T.length)]
            ], n.length > v.length && (S[0][0] = S[2][0] = f), S;
          if (T.length == 1)
            return [[f, n], [E, v]];
          var A = e(n, v);
          if (A) {
            var p = A[0], O = A[1], k = A[2], L = A[3], D = A[4], z = _(p, k), $ = _(O, L);
            return z.concat([[b, D]], $);
          }
          return y(n, v);
        }
        function y(n, v) {
          for (var S = n.length, w = v.length, T = Math.ceil((S + w) / 2), P = T, A = 2 * T, p = new Array(A), O = new Array(A), k = 0; k < A; k++)
            p[k] = -1, O[k] = -1;
          p[P + 1] = 0, O[P + 1] = 0;
          for (var L = S - w, D = L % 2 != 0, z = 0, $ = 0, J = 0, H = 0, j = 0; j < T; j++) {
            for (var N = -j + z; N <= j - $; N += 2) {
              var I = P + N, M;
              N == -j || N != j && p[I - 1] < p[I + 1] ? M = p[I + 1] : M = p[I - 1] + 1;
              for (var K = M - N; M < S && K < w && n.charAt(M) == v.charAt(K); )
                M++, K++;
              if (p[I] = M, M > S)
                $ += 2;
              else if (K > w)
                z += 2;
              else if (D) {
                var C = P + L - N;
                if (C >= 0 && C < A && O[C] != -1) {
                  var q = S - O[C];
                  if (M >= q)
                    return h(n, v, M, K);
                }
              }
            }
            for (var F = -j + J; F <= j - H; F += 2) {
              var C = P + F, q;
              F == -j || F != j && O[C - 1] < O[C + 1] ? q = O[C + 1] : q = O[C - 1] + 1;
              for (var G = q - F; q < S && G < w && n.charAt(S - q - 1) == v.charAt(w - G - 1); )
                q++, G++;
              if (O[C] = q, q > S)
                H += 2;
              else if (G > w)
                J += 2;
              else if (!D) {
                var I = P + L - F;
                if (I >= 0 && I < A && p[I] != -1) {
                  var M = p[I], K = P + M - I;
                  if (q = S - q, M >= q)
                    return h(n, v, M, K);
                }
              }
            }
          }
          return [[f, n], [E, v]];
        }
        function h(n, v, S, w) {
          var T = n.substring(0, S), P = v.substring(0, w), A = n.substring(S), p = v.substring(w), O = _(T, P), k = _(A, p);
          return O.concat(k);
        }
        function o(n, v) {
          if (!n || !v || n.charAt(0) != v.charAt(0))
            return 0;
          for (var S = 0, w = Math.min(n.length, v.length), T = w, P = 0; S < T; )
            n.substring(P, T) == v.substring(P, T) ? (S = T, P = S) : w = T, T = Math.floor((w - S) / 2 + S);
          return T;
        }
        function t(n, v) {
          if (!n || !v || n.charAt(n.length - 1) != v.charAt(v.length - 1))
            return 0;
          for (var S = 0, w = Math.min(n.length, v.length), T = w, P = 0; S < T; )
            n.substring(n.length - T, n.length - P) == v.substring(v.length - T, v.length - P) ? (S = T, P = S) : w = T, T = Math.floor((w - S) / 2 + S);
          return T;
        }
        function e(n, v) {
          var S = n.length > v.length ? n : v, w = n.length > v.length ? v : n;
          if (S.length < 4 || w.length * 2 < S.length)
            return null;
          function T($, J, H) {
            for (var j = $.substring(H, H + Math.floor($.length / 4)), N = -1, I = "", M, K, C, q; (N = J.indexOf(j, N + 1)) != -1; ) {
              var F = o(
                $.substring(H),
                J.substring(N)
              ), G = t(
                $.substring(0, H),
                J.substring(0, N)
              );
              I.length < G + F && (I = J.substring(N - G, N) + J.substring(N, N + F), M = $.substring(0, H - G), K = $.substring(H + F), C = J.substring(0, N - G), q = J.substring(N + F));
            }
            return I.length * 2 >= $.length ? [
              M,
              K,
              C,
              q,
              I
            ] : null;
          }
          var P = T(
            S,
            w,
            Math.ceil(S.length / 4)
          ), A = T(
            S,
            w,
            Math.ceil(S.length / 2)
          ), p;
          if (!P && !A)
            return null;
          A ? P ? p = P[4].length > A[4].length ? P : A : p = A : p = P;
          var O, k, L, D;
          n.length > v.length ? (O = p[0], k = p[1], L = p[2], D = p[3]) : (L = p[0], D = p[1], O = p[2], k = p[3]);
          var z = p[4];
          return [O, k, L, D, z];
        }
        function s(n) {
          n.push([b, ""]);
          for (var v = 0, S = 0, w = 0, T = "", P = "", A; v < n.length; )
            switch (n[v][0]) {
              case E:
                w++, P += n[v][1], v++;
                break;
              case f:
                S++, T += n[v][1], v++;
                break;
              case b:
                S + w > 1 ? (S !== 0 && w !== 0 && (A = o(P, T), A !== 0 && (v - S - w > 0 && n[v - S - w - 1][0] == b ? n[v - S - w - 1][1] += P.substring(0, A) : (n.splice(0, 0, [
                  b,
                  P.substring(0, A)
                ]), v++), P = P.substring(A), T = T.substring(A)), A = t(P, T), A !== 0 && (n[v][1] = P.substring(P.length - A) + n[v][1], P = P.substring(0, P.length - A), T = T.substring(0, T.length - A))), S === 0 ? n.splice(
                  v - w,
                  S + w,
                  [E, P]
                ) : w === 0 ? n.splice(
                  v - S,
                  S + w,
                  [f, T]
                ) : n.splice(
                  v - S - w,
                  S + w,
                  [f, T],
                  [E, P]
                ), v = v - S - w + (S ? 1 : 0) + (w ? 1 : 0) + 1) : v !== 0 && n[v - 1][0] == b ? (n[v - 1][1] += n[v][1], n.splice(v, 1)) : v++, w = 0, S = 0, T = "", P = "";
                break;
            }
          n[n.length - 1][1] === "" && n.pop();
          var p = !1;
          for (v = 1; v < n.length - 1; )
            n[v - 1][0] == b && n[v + 1][0] == b && (n[v][1].substring(n[v][1].length - n[v - 1][1].length) == n[v - 1][1] ? (n[v][1] = n[v - 1][1] + n[v][1].substring(0, n[v][1].length - n[v - 1][1].length), n[v + 1][1] = n[v - 1][1] + n[v + 1][1], n.splice(v - 1, 1), p = !0) : n[v][1].substring(0, n[v + 1][1].length) == n[v + 1][1] && (n[v - 1][1] += n[v + 1][1], n[v][1] = n[v][1].substring(n[v + 1][1].length) + n[v + 1][1], n.splice(v + 1, 1), p = !0)), v++;
          p && s(n);
        }
        var l = _;
        l.INSERT = E, l.DELETE = f, l.EQUAL = b, m.exports = l;
        function u(n, v) {
          if (v === 0)
            return [b, n];
          for (var S = 0, w = 0; w < n.length; w++) {
            var T = n[w];
            if (T[0] === f || T[0] === b) {
              var P = S + T[1].length;
              if (v === P)
                return [w + 1, n];
              if (v < P) {
                n = n.slice();
                var A = v - S, p = [T[0], T[1].slice(0, A)], O = [T[0], T[1].slice(A)];
                return n.splice(w, 1, p, O), [w + 1, n];
              } else
                S = P;
            }
          }
          throw new Error("cursor_pos is out of bounds!");
        }
        function r(n, v) {
          var S = u(n, v), w = S[1], T = S[0], P = w[T], A = w[T + 1];
          if (P == null)
            return n;
          if (P[0] !== b)
            return n;
          if (A != null && P[1] + A[1] === A[1] + P[1])
            return w.splice(T, 2, A, P), c(w, T, 2);
          if (A != null && A[1].indexOf(P[1]) === 0) {
            w.splice(T, 2, [A[0], P[1]], [0, P[1]]);
            var p = A[1].slice(P[1].length);
            return p.length > 0 && w.splice(T + 2, 0, [A[0], p]), c(w, T, 3);
          } else
            return n;
        }
        function i(n) {
          for (var v = !1, S = function(A) {
            return A.charCodeAt(0) >= 56320 && A.charCodeAt(0) <= 57343;
          }, w = function(A) {
            return A.charCodeAt(A.length - 1) >= 55296 && A.charCodeAt(A.length - 1) <= 56319;
          }, T = 2; T < n.length; T += 1)
            n[T - 2][0] === b && w(n[T - 2][1]) && n[T - 1][0] === f && S(n[T - 1][1]) && n[T][0] === E && S(n[T][1]) && (v = !0, n[T - 1][1] = n[T - 2][1].slice(-1) + n[T - 1][1], n[T][1] = n[T - 2][1].slice(-1) + n[T][1], n[T - 2][1] = n[T - 2][1].slice(0, -1));
          if (!v)
            return n;
          for (var P = [], T = 0; T < n.length; T += 1)
            n[T][1].length > 0 && P.push(n[T]);
          return P;
        }
        function c(n, v, S) {
          for (var w = v + S - 1; w >= 0 && w >= v - 1; w--)
            if (w + 1 < n.length) {
              var T = n[w], P = n[w + 1];
              T[0] === P[1] && n.splice(w, 2, [T[0], T[1] + P[1]]);
            }
          return n;
        }
      },
      function(m, d) {
        d = m.exports = typeof Object.keys == "function" ? Object.keys : f, d.shim = f;
        function f(E) {
          var b = [];
          for (var _ in E)
            b.push(_);
          return b;
        }
      },
      function(m, d) {
        var f = function() {
          return Object.prototype.toString.call(arguments);
        }() == "[object Arguments]";
        d = m.exports = f ? E : b, d.supported = E;
        function E(_) {
          return Object.prototype.toString.call(_) == "[object Arguments]";
        }
        d.unsupported = b;
        function b(_) {
          return _ && typeof _ == "object" && typeof _.length == "number" && Object.prototype.hasOwnProperty.call(_, "callee") && !Object.prototype.propertyIsEnumerable.call(_, "callee") || !1;
        }
      },
      function(m, d) {
        var f = Object.prototype.hasOwnProperty, E = "~";
        function b() {
        }
        Object.create && (b.prototype = /* @__PURE__ */ Object.create(null), new b().__proto__ || (E = !1));
        function _(y, h, o) {
          this.fn = y, this.context = h, this.once = o || !1;
        }
        function g() {
          this._events = new b(), this._eventsCount = 0;
        }
        g.prototype.eventNames = function() {
          var h = [], o, t;
          if (this._eventsCount === 0)
            return h;
          for (t in o = this._events)
            f.call(o, t) && h.push(E ? t.slice(1) : t);
          return Object.getOwnPropertySymbols ? h.concat(Object.getOwnPropertySymbols(o)) : h;
        }, g.prototype.listeners = function(h, o) {
          var t = E ? E + h : h, e = this._events[t];
          if (o)
            return !!e;
          if (!e)
            return [];
          if (e.fn)
            return [e.fn];
          for (var s = 0, l = e.length, u = new Array(l); s < l; s++)
            u[s] = e[s].fn;
          return u;
        }, g.prototype.emit = function(h, o, t, e, s, l) {
          var u = E ? E + h : h;
          if (!this._events[u])
            return !1;
          var r = this._events[u], i = arguments.length, c, n;
          if (r.fn) {
            switch (r.once && this.removeListener(h, r.fn, void 0, !0), i) {
              case 1:
                return r.fn.call(r.context), !0;
              case 2:
                return r.fn.call(r.context, o), !0;
              case 3:
                return r.fn.call(r.context, o, t), !0;
              case 4:
                return r.fn.call(r.context, o, t, e), !0;
              case 5:
                return r.fn.call(r.context, o, t, e, s), !0;
              case 6:
                return r.fn.call(r.context, o, t, e, s, l), !0;
            }
            for (n = 1, c = new Array(i - 1); n < i; n++)
              c[n - 1] = arguments[n];
            r.fn.apply(r.context, c);
          } else {
            var v = r.length, S;
            for (n = 0; n < v; n++)
              switch (r[n].once && this.removeListener(h, r[n].fn, void 0, !0), i) {
                case 1:
                  r[n].fn.call(r[n].context);
                  break;
                case 2:
                  r[n].fn.call(r[n].context, o);
                  break;
                case 3:
                  r[n].fn.call(r[n].context, o, t);
                  break;
                case 4:
                  r[n].fn.call(r[n].context, o, t, e);
                  break;
                default:
                  if (!c)
                    for (S = 1, c = new Array(i - 1); S < i; S++)
                      c[S - 1] = arguments[S];
                  r[n].fn.apply(r[n].context, c);
              }
          }
          return !0;
        }, g.prototype.on = function(h, o, t) {
          var e = new _(o, t || this), s = E ? E + h : h;
          return this._events[s] ? this._events[s].fn ? this._events[s] = [this._events[s], e] : this._events[s].push(e) : (this._events[s] = e, this._eventsCount++), this;
        }, g.prototype.once = function(h, o, t) {
          var e = new _(o, t || this, !0), s = E ? E + h : h;
          return this._events[s] ? this._events[s].fn ? this._events[s] = [this._events[s], e] : this._events[s].push(e) : (this._events[s] = e, this._eventsCount++), this;
        }, g.prototype.removeListener = function(h, o, t, e) {
          var s = E ? E + h : h;
          if (!this._events[s])
            return this;
          if (!o)
            return --this._eventsCount === 0 ? this._events = new b() : delete this._events[s], this;
          var l = this._events[s];
          if (l.fn)
            l.fn === o && (!e || l.once) && (!t || l.context === t) && (--this._eventsCount === 0 ? this._events = new b() : delete this._events[s]);
          else {
            for (var u = 0, r = [], i = l.length; u < i; u++)
              (l[u].fn !== o || e && !l[u].once || t && l[u].context !== t) && r.push(l[u]);
            r.length ? this._events[s] = r.length === 1 ? r[0] : r : --this._eventsCount === 0 ? this._events = new b() : delete this._events[s];
          }
          return this;
        }, g.prototype.removeAllListeners = function(h) {
          var o;
          return h ? (o = E ? E + h : h, this._events[o] && (--this._eventsCount === 0 ? this._events = new b() : delete this._events[o])) : (this._events = new b(), this._eventsCount = 0), this;
        }, g.prototype.off = g.prototype.removeListener, g.prototype.addListener = g.prototype.on, g.prototype.setMaxListeners = function() {
          return this;
        }, g.prefixed = E, g.EventEmitter = g, typeof m < "u" && (m.exports = g);
      },
      function(m, d, f) {
        Object.defineProperty(d, "__esModule", {
          value: !0
        }), d.matchText = d.matchSpacing = d.matchNewline = d.matchBlot = d.matchAttributor = d.default = void 0;
        var E = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(W) {
          return typeof W;
        } : function(W) {
          return W && typeof Symbol == "function" && W.constructor === Symbol && W !== Symbol.prototype ? "symbol" : typeof W;
        }, b = function() {
          function W(Y, tt) {
            var et = [], X = !0, st = !1, ot = void 0;
            try {
              for (var lt = Y[Symbol.iterator](), St; !(X = (St = lt.next()).done) && (et.push(St.value), !(tt && et.length === tt)); X = !0)
                ;
            } catch (Ot) {
              st = !0, ot = Ot;
            } finally {
              try {
                !X && lt.return && lt.return();
              } finally {
                if (st)
                  throw ot;
              }
            }
            return et;
          }
          return function(Y, tt) {
            if (Array.isArray(Y))
              return Y;
            if (Symbol.iterator in Object(Y))
              return W(Y, tt);
            throw new TypeError("Invalid attempt to destructure non-iterable instance");
          };
        }(), _ = function() {
          function W(Y, tt) {
            for (var et = 0; et < tt.length; et++) {
              var X = tt[et];
              X.enumerable = X.enumerable || !1, X.configurable = !0, "value" in X && (X.writable = !0), Object.defineProperty(Y, X.key, X);
            }
          }
          return function(Y, tt, et) {
            return tt && W(Y.prototype, tt), et && W(Y, et), Y;
          };
        }(), g = f(3), y = O(g), h = f(2), o = O(h), t = f(0), e = O(t), s = f(5), l = O(s), u = f(10), r = O(u), i = f(9), c = O(i), n = f(36), v = f(37), S = f(13), w = O(S), T = f(26), P = f(38), A = f(39), p = f(40);
        function O(W) {
          return W && W.__esModule ? W : { default: W };
        }
        function k(W, Y, tt) {
          return Y in W ? Object.defineProperty(W, Y, { value: tt, enumerable: !0, configurable: !0, writable: !0 }) : W[Y] = tt, W;
        }
        function L(W, Y) {
          if (!(W instanceof Y))
            throw new TypeError("Cannot call a class as a function");
        }
        function D(W, Y) {
          if (!W)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return Y && (typeof Y == "object" || typeof Y == "function") ? Y : W;
        }
        function z(W, Y) {
          if (typeof Y != "function" && Y !== null)
            throw new TypeError("Super expression must either be null or a function, not " + typeof Y);
          W.prototype = Object.create(Y && Y.prototype, { constructor: { value: W, enumerable: !1, writable: !0, configurable: !0 } }), Y && (Object.setPrototypeOf ? Object.setPrototypeOf(W, Y) : W.__proto__ = Y);
        }
        var $ = (0, r.default)("quill:clipboard"), J = "__ql-matcher", H = [[Node.TEXT_NODE, gt], [Node.TEXT_NODE, ft], ["br", nt], [Node.ELEMENT_NODE, ft], [Node.ELEMENT_NODE, Q], [Node.ELEMENT_NODE, ht], [Node.ELEMENT_NODE, V], [Node.ELEMENT_NODE, mt], ["li", at], ["b", G.bind(G, "bold")], ["i", G.bind(G, "italic")], ["style", it]], j = [n.AlignAttribute, P.DirectionAttribute].reduce(function(W, Y) {
          return W[Y.keyName] = Y, W;
        }, {}), N = [n.AlignStyle, v.BackgroundStyle, T.ColorStyle, P.DirectionStyle, A.FontStyle, p.SizeStyle].reduce(function(W, Y) {
          return W[Y.keyName] = Y, W;
        }, {}), I = function(W) {
          z(Y, W);
          function Y(tt, et) {
            L(this, Y);
            var X = D(this, (Y.__proto__ || Object.getPrototypeOf(Y)).call(this, tt, et));
            return X.quill.root.addEventListener("paste", X.onPaste.bind(X)), X.container = X.quill.addContainer("ql-clipboard"), X.container.setAttribute("contenteditable", !0), X.container.setAttribute("tabindex", -1), X.matchers = [], H.concat(X.options.matchers).forEach(function(st) {
              var ot = b(st, 2), lt = ot[0], St = ot[1];
              !et.matchVisual && St === ht || X.addMatcher(lt, St);
            }), X;
          }
          return _(Y, [{
            key: "addMatcher",
            value: function(et, X) {
              this.matchers.push([et, X]);
            }
          }, {
            key: "convert",
            value: function(et) {
              if (typeof et == "string")
                return this.container.innerHTML = et.replace(/\>\r?\n +\</g, "><"), this.convert();
              var X = this.quill.getFormat(this.quill.selection.savedRange.index);
              if (X[w.default.blotName]) {
                var st = this.container.innerText;
                return this.container.innerHTML = "", new o.default().insert(st, k({}, w.default.blotName, X[w.default.blotName]));
              }
              var ot = this.prepareMatching(), lt = b(ot, 2), St = lt[0], Ot = lt[1], pt = F(this.container, St, Ot);
              return C(pt, `
`) && pt.ops[pt.ops.length - 1].attributes == null && (pt = pt.compose(new o.default().retain(pt.length() - 1).delete(1))), $.log("convert", this.container.innerHTML, pt), this.container.innerHTML = "", pt;
            }
          }, {
            key: "dangerouslyPasteHTML",
            value: function(et, X) {
              var st = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : l.default.sources.API;
              if (typeof et == "string")
                this.quill.setContents(this.convert(et), X), this.quill.setSelection(0, l.default.sources.SILENT);
              else {
                var ot = this.convert(X);
                this.quill.updateContents(new o.default().retain(et).concat(ot), st), this.quill.setSelection(et + ot.length(), l.default.sources.SILENT);
              }
            }
          }, {
            key: "onPaste",
            value: function(et) {
              var X = this;
              if (!(et.defaultPrevented || !this.quill.isEnabled())) {
                var st = this.quill.getSelection(), ot = new o.default().retain(st.index), lt = this.quill.scrollingContainer.scrollTop;
                this.container.focus(), this.quill.selection.update(l.default.sources.SILENT), setTimeout(function() {
                  ot = ot.concat(X.convert()).delete(st.length), X.quill.updateContents(ot, l.default.sources.USER), X.quill.setSelection(ot.length() - st.length, l.default.sources.SILENT), X.quill.scrollingContainer.scrollTop = lt, X.quill.focus();
                }, 1);
              }
            }
          }, {
            key: "prepareMatching",
            value: function() {
              var et = this, X = [], st = [];
              return this.matchers.forEach(function(ot) {
                var lt = b(ot, 2), St = lt[0], Ot = lt[1];
                switch (St) {
                  case Node.TEXT_NODE:
                    st.push(Ot);
                    break;
                  case Node.ELEMENT_NODE:
                    X.push(Ot);
                    break;
                  default:
                    [].forEach.call(et.container.querySelectorAll(St), function(pt) {
                      pt[J] = pt[J] || [], pt[J].push(Ot);
                    });
                    break;
                }
              }), [X, st];
            }
          }]), Y;
        }(c.default);
        I.DEFAULTS = {
          matchers: [],
          matchVisual: !0
        };
        function M(W, Y, tt) {
          return (typeof Y > "u" ? "undefined" : E(Y)) === "object" ? Object.keys(Y).reduce(function(et, X) {
            return M(et, X, Y[X]);
          }, W) : W.reduce(function(et, X) {
            return X.attributes && X.attributes[Y] ? et.push(X) : et.insert(X.insert, (0, y.default)({}, k({}, Y, tt), X.attributes));
          }, new o.default());
        }
        function K(W) {
          if (W.nodeType !== Node.ELEMENT_NODE)
            return {};
          var Y = "__ql-computed-style";
          return W[Y] || (W[Y] = window.getComputedStyle(W));
        }
        function C(W, Y) {
          for (var tt = "", et = W.ops.length - 1; et >= 0 && tt.length < Y.length; --et) {
            var X = W.ops[et];
            if (typeof X.insert != "string")
              break;
            tt = X.insert + tt;
          }
          return tt.slice(-1 * Y.length) === Y;
        }
        function q(W) {
          if (W.childNodes.length === 0)
            return !1;
          var Y = K(W);
          return ["block", "list-item"].indexOf(Y.display) > -1;
        }
        function F(W, Y, tt) {
          return W.nodeType === W.TEXT_NODE ? tt.reduce(function(et, X) {
            return X(W, et);
          }, new o.default()) : W.nodeType === W.ELEMENT_NODE ? [].reduce.call(W.childNodes || [], function(et, X) {
            var st = F(X, Y, tt);
            return X.nodeType === W.ELEMENT_NODE && (st = Y.reduce(function(ot, lt) {
              return lt(X, ot);
            }, st), st = (X[J] || []).reduce(function(ot, lt) {
              return lt(X, ot);
            }, st)), et.concat(st);
          }, new o.default()) : new o.default();
        }
        function G(W, Y, tt) {
          return M(tt, W, !0);
        }
        function V(W, Y) {
          var tt = e.default.Attributor.Attribute.keys(W), et = e.default.Attributor.Class.keys(W), X = e.default.Attributor.Style.keys(W), st = {};
          return tt.concat(et).concat(X).forEach(function(ot) {
            var lt = e.default.query(ot, e.default.Scope.ATTRIBUTE);
            lt != null && (st[lt.attrName] = lt.value(W), st[lt.attrName]) || (lt = j[ot], lt != null && (lt.attrName === ot || lt.keyName === ot) && (st[lt.attrName] = lt.value(W) || void 0), lt = N[ot], lt != null && (lt.attrName === ot || lt.keyName === ot) && (lt = N[ot], st[lt.attrName] = lt.value(W) || void 0));
          }), Object.keys(st).length > 0 && (Y = M(Y, st)), Y;
        }
        function Q(W, Y) {
          var tt = e.default.query(W);
          if (tt == null)
            return Y;
          if (tt.prototype instanceof e.default.Embed) {
            var et = {}, X = tt.value(W);
            X != null && (et[tt.blotName] = X, Y = new o.default().insert(et, tt.formats(W)));
          } else
            typeof tt.formats == "function" && (Y = M(Y, tt.blotName, tt.formats(W)));
          return Y;
        }
        function nt(W, Y) {
          return C(Y, `
`) || Y.insert(`
`), Y;
        }
        function it() {
          return new o.default();
        }
        function at(W, Y) {
          var tt = e.default.query(W);
          if (tt == null || tt.blotName !== "list-item" || !C(Y, `
`))
            return Y;
          for (var et = -1, X = W.parentNode; !X.classList.contains("ql-clipboard"); )
            (e.default.query(X) || {}).blotName === "list" && (et += 1), X = X.parentNode;
          return et <= 0 ? Y : Y.compose(new o.default().retain(Y.length() - 1).retain(1, { indent: et }));
        }
        function ft(W, Y) {
          return C(Y, `
`) || (q(W) || Y.length() > 0 && W.nextSibling && q(W.nextSibling)) && Y.insert(`
`), Y;
        }
        function ht(W, Y) {
          if (q(W) && W.nextElementSibling != null && !C(Y, `

`)) {
            var tt = W.offsetHeight + parseFloat(K(W).marginTop) + parseFloat(K(W).marginBottom);
            W.nextElementSibling.offsetTop > W.offsetTop + tt * 1.5 && Y.insert(`
`);
          }
          return Y;
        }
        function mt(W, Y) {
          var tt = {}, et = W.style || {};
          return et.fontStyle && K(W).fontStyle === "italic" && (tt.italic = !0), et.fontWeight && (K(W).fontWeight.startsWith("bold") || parseInt(K(W).fontWeight) >= 700) && (tt.bold = !0), Object.keys(tt).length > 0 && (Y = M(Y, tt)), parseFloat(et.textIndent || 0) > 0 && (Y = new o.default().insert("	").concat(Y)), Y;
        }
        function gt(W, Y) {
          var tt = W.data;
          if (W.parentNode.tagName === "O:P")
            return Y.insert(tt.trim());
          if (tt.trim().length === 0 && W.parentNode.classList.contains("ql-clipboard"))
            return Y;
          if (!K(W.parentNode).whiteSpace.startsWith("pre")) {
            var et = function(st, ot) {
              return ot = ot.replace(/[^\u00a0]/g, ""), ot.length < 1 && st ? " " : ot;
            };
            tt = tt.replace(/\r\n/g, " ").replace(/\n/g, " "), tt = tt.replace(/\s\s+/g, et.bind(et, !0)), (W.previousSibling == null && q(W.parentNode) || W.previousSibling != null && q(W.previousSibling)) && (tt = tt.replace(/^\s+/, et.bind(et, !1))), (W.nextSibling == null && q(W.parentNode) || W.nextSibling != null && q(W.nextSibling)) && (tt = tt.replace(/\s+$/, et.bind(et, !1)));
          }
          return Y.insert(tt);
        }
        d.default = I, d.matchAttributor = V, d.matchBlot = Q, d.matchNewline = ft, d.matchSpacing = ht, d.matchText = gt;
      },
      function(m, d, f) {
        Object.defineProperty(d, "__esModule", {
          value: !0
        });
        var E = function() {
          function s(l, u) {
            for (var r = 0; r < u.length; r++) {
              var i = u[r];
              i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(l, i.key, i);
            }
          }
          return function(l, u, r) {
            return u && s(l.prototype, u), r && s(l, r), l;
          };
        }(), b = function s(l, u, r) {
          l === null && (l = Function.prototype);
          var i = Object.getOwnPropertyDescriptor(l, u);
          if (i === void 0) {
            var c = Object.getPrototypeOf(l);
            return c === null ? void 0 : s(c, u, r);
          } else {
            if ("value" in i)
              return i.value;
            var n = i.get;
            return n === void 0 ? void 0 : n.call(r);
          }
        }, _ = f(6), g = y(_);
        function y(s) {
          return s && s.__esModule ? s : { default: s };
        }
        function h(s, l) {
          if (!(s instanceof l))
            throw new TypeError("Cannot call a class as a function");
        }
        function o(s, l) {
          if (!s)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return l && (typeof l == "object" || typeof l == "function") ? l : s;
        }
        function t(s, l) {
          if (typeof l != "function" && l !== null)
            throw new TypeError("Super expression must either be null or a function, not " + typeof l);
          s.prototype = Object.create(l && l.prototype, { constructor: { value: s, enumerable: !1, writable: !0, configurable: !0 } }), l && (Object.setPrototypeOf ? Object.setPrototypeOf(s, l) : s.__proto__ = l);
        }
        var e = function(s) {
          t(l, s);
          function l() {
            return h(this, l), o(this, (l.__proto__ || Object.getPrototypeOf(l)).apply(this, arguments));
          }
          return E(l, [{
            key: "optimize",
            value: function(r) {
              b(l.prototype.__proto__ || Object.getPrototypeOf(l.prototype), "optimize", this).call(this, r), this.domNode.tagName !== this.statics.tagName[0] && this.replaceWith(this.statics.blotName);
            }
          }], [{
            key: "create",
            value: function() {
              return b(l.__proto__ || Object.getPrototypeOf(l), "create", this).call(this);
            }
          }, {
            key: "formats",
            value: function() {
              return !0;
            }
          }]), l;
        }(g.default);
        e.blotName = "bold", e.tagName = ["STRONG", "B"], d.default = e;
      },
      function(m, d, f) {
        Object.defineProperty(d, "__esModule", {
          value: !0
        }), d.addControls = d.default = void 0;
        var E = function() {
          function p(O, k) {
            var L = [], D = !0, z = !1, $ = void 0;
            try {
              for (var J = O[Symbol.iterator](), H; !(D = (H = J.next()).done) && (L.push(H.value), !(k && L.length === k)); D = !0)
                ;
            } catch (j) {
              z = !0, $ = j;
            } finally {
              try {
                !D && J.return && J.return();
              } finally {
                if (z)
                  throw $;
              }
            }
            return L;
          }
          return function(O, k) {
            if (Array.isArray(O))
              return O;
            if (Symbol.iterator in Object(O))
              return p(O, k);
            throw new TypeError("Invalid attempt to destructure non-iterable instance");
          };
        }(), b = function() {
          function p(O, k) {
            for (var L = 0; L < k.length; L++) {
              var D = k[L];
              D.enumerable = D.enumerable || !1, D.configurable = !0, "value" in D && (D.writable = !0), Object.defineProperty(O, D.key, D);
            }
          }
          return function(O, k, L) {
            return k && p(O.prototype, k), L && p(O, L), O;
          };
        }(), _ = f(2), g = r(_), y = f(0), h = r(y), o = f(5), t = r(o), e = f(10), s = r(e), l = f(9), u = r(l);
        function r(p) {
          return p && p.__esModule ? p : { default: p };
        }
        function i(p, O, k) {
          return O in p ? Object.defineProperty(p, O, { value: k, enumerable: !0, configurable: !0, writable: !0 }) : p[O] = k, p;
        }
        function c(p, O) {
          if (!(p instanceof O))
            throw new TypeError("Cannot call a class as a function");
        }
        function n(p, O) {
          if (!p)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return O && (typeof O == "object" || typeof O == "function") ? O : p;
        }
        function v(p, O) {
          if (typeof O != "function" && O !== null)
            throw new TypeError("Super expression must either be null or a function, not " + typeof O);
          p.prototype = Object.create(O && O.prototype, { constructor: { value: p, enumerable: !1, writable: !0, configurable: !0 } }), O && (Object.setPrototypeOf ? Object.setPrototypeOf(p, O) : p.__proto__ = O);
        }
        var S = (0, s.default)("quill:toolbar"), w = function(p) {
          v(O, p);
          function O(k, L) {
            c(this, O);
            var D = n(this, (O.__proto__ || Object.getPrototypeOf(O)).call(this, k, L));
            if (Array.isArray(D.options.container)) {
              var z = document.createElement("div");
              P(z, D.options.container), k.container.parentNode.insertBefore(z, k.container), D.container = z;
            } else
              typeof D.options.container == "string" ? D.container = document.querySelector(D.options.container) : D.container = D.options.container;
            if (!(D.container instanceof HTMLElement)) {
              var $;
              return $ = S.error("Container required for toolbar", D.options), n(D, $);
            }
            return D.container.classList.add("ql-toolbar"), D.controls = [], D.handlers = {}, Object.keys(D.options.handlers).forEach(function(J) {
              D.addHandler(J, D.options.handlers[J]);
            }), [].forEach.call(D.container.querySelectorAll("button, select"), function(J) {
              D.attach(J);
            }), D.quill.on(t.default.events.EDITOR_CHANGE, function(J, H) {
              J === t.default.events.SELECTION_CHANGE && D.update(H);
            }), D.quill.on(t.default.events.SCROLL_OPTIMIZE, function() {
              var J = D.quill.selection.getRange(), H = E(J, 1), j = H[0];
              D.update(j);
            }), D;
          }
          return b(O, [{
            key: "addHandler",
            value: function(L, D) {
              this.handlers[L] = D;
            }
          }, {
            key: "attach",
            value: function(L) {
              var D = this, z = [].find.call(L.classList, function(J) {
                return J.indexOf("ql-") === 0;
              });
              if (!!z) {
                if (z = z.slice(3), L.tagName === "BUTTON" && L.setAttribute("type", "button"), this.handlers[z] == null) {
                  if (this.quill.scroll.whitelist != null && this.quill.scroll.whitelist[z] == null) {
                    S.warn("ignoring attaching to disabled format", z, L);
                    return;
                  }
                  if (h.default.query(z) == null) {
                    S.warn("ignoring attaching to nonexistent format", z, L);
                    return;
                  }
                }
                var $ = L.tagName === "SELECT" ? "change" : "click";
                L.addEventListener($, function(J) {
                  var H = void 0;
                  if (L.tagName === "SELECT") {
                    if (L.selectedIndex < 0)
                      return;
                    var j = L.options[L.selectedIndex];
                    j.hasAttribute("selected") ? H = !1 : H = j.value || !1;
                  } else
                    L.classList.contains("ql-active") ? H = !1 : H = L.value || !L.hasAttribute("value"), J.preventDefault();
                  D.quill.focus();
                  var N = D.quill.selection.getRange(), I = E(N, 1), M = I[0];
                  if (D.handlers[z] != null)
                    D.handlers[z].call(D, H);
                  else if (h.default.query(z).prototype instanceof h.default.Embed) {
                    if (H = prompt("Enter " + z), !H)
                      return;
                    D.quill.updateContents(new g.default().retain(M.index).delete(M.length).insert(i({}, z, H)), t.default.sources.USER);
                  } else
                    D.quill.format(z, H, t.default.sources.USER);
                  D.update(M);
                }), this.controls.push([z, L]);
              }
            }
          }, {
            key: "update",
            value: function(L) {
              var D = L == null ? {} : this.quill.getFormat(L);
              this.controls.forEach(function(z) {
                var $ = E(z, 2), J = $[0], H = $[1];
                if (H.tagName === "SELECT") {
                  var j = void 0;
                  if (L == null)
                    j = null;
                  else if (D[J] == null)
                    j = H.querySelector("option[selected]");
                  else if (!Array.isArray(D[J])) {
                    var N = D[J];
                    typeof N == "string" && (N = N.replace(/\"/g, '\\"')), j = H.querySelector('option[value="' + N + '"]');
                  }
                  j == null ? (H.value = "", H.selectedIndex = -1) : j.selected = !0;
                } else if (L == null)
                  H.classList.remove("ql-active");
                else if (H.hasAttribute("value")) {
                  var I = D[J] === H.getAttribute("value") || D[J] != null && D[J].toString() === H.getAttribute("value") || D[J] == null && !H.getAttribute("value");
                  H.classList.toggle("ql-active", I);
                } else
                  H.classList.toggle("ql-active", D[J] != null);
              });
            }
          }]), O;
        }(u.default);
        w.DEFAULTS = {};
        function T(p, O, k) {
          var L = document.createElement("button");
          L.setAttribute("type", "button"), L.classList.add("ql-" + O), k != null && (L.value = k), p.appendChild(L);
        }
        function P(p, O) {
          Array.isArray(O[0]) || (O = [O]), O.forEach(function(k) {
            var L = document.createElement("span");
            L.classList.add("ql-formats"), k.forEach(function(D) {
              if (typeof D == "string")
                T(L, D);
              else {
                var z = Object.keys(D)[0], $ = D[z];
                Array.isArray($) ? A(L, z, $) : T(L, z, $);
              }
            }), p.appendChild(L);
          });
        }
        function A(p, O, k) {
          var L = document.createElement("select");
          L.classList.add("ql-" + O), k.forEach(function(D) {
            var z = document.createElement("option");
            D !== !1 ? z.setAttribute("value", D) : z.setAttribute("selected", "selected"), L.appendChild(z);
          }), p.appendChild(L);
        }
        w.DEFAULTS = {
          container: null,
          handlers: {
            clean: function() {
              var O = this, k = this.quill.getSelection();
              if (k != null)
                if (k.length == 0) {
                  var L = this.quill.getFormat();
                  Object.keys(L).forEach(function(D) {
                    h.default.query(D, h.default.Scope.INLINE) != null && O.quill.format(D, !1);
                  });
                } else
                  this.quill.removeFormat(k, t.default.sources.USER);
            },
            direction: function(O) {
              var k = this.quill.getFormat().align;
              O === "rtl" && k == null ? this.quill.format("align", "right", t.default.sources.USER) : !O && k === "right" && this.quill.format("align", !1, t.default.sources.USER), this.quill.format("direction", O, t.default.sources.USER);
            },
            indent: function(O) {
              var k = this.quill.getSelection(), L = this.quill.getFormat(k), D = parseInt(L.indent || 0);
              if (O === "+1" || O === "-1") {
                var z = O === "+1" ? 1 : -1;
                L.direction === "rtl" && (z *= -1), this.quill.format("indent", D + z, t.default.sources.USER);
              }
            },
            link: function(O) {
              O === !0 && (O = prompt("Enter link URL:")), this.quill.format("link", O, t.default.sources.USER);
            },
            list: function(O) {
              var k = this.quill.getSelection(), L = this.quill.getFormat(k);
              O === "check" ? L.list === "checked" || L.list === "unchecked" ? this.quill.format("list", !1, t.default.sources.USER) : this.quill.format("list", "unchecked", t.default.sources.USER) : this.quill.format("list", O, t.default.sources.USER);
            }
          }
        }, d.default = w, d.addControls = P;
      },
      function(m, d) {
        m.exports = '<svg viewbox="0 0 18 18"> <polyline class="ql-even ql-stroke" points="5 7 3 9 5 11"></polyline> <polyline class="ql-even ql-stroke" points="13 7 15 9 13 11"></polyline> <line class=ql-stroke x1=10 x2=8 y1=5 y2=13></line> </svg>';
      },
      function(m, d, f) {
        Object.defineProperty(d, "__esModule", {
          value: !0
        });
        var E = function() {
          function s(l, u) {
            for (var r = 0; r < u.length; r++) {
              var i = u[r];
              i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(l, i.key, i);
            }
          }
          return function(l, u, r) {
            return u && s(l.prototype, u), r && s(l, r), l;
          };
        }(), b = function s(l, u, r) {
          l === null && (l = Function.prototype);
          var i = Object.getOwnPropertyDescriptor(l, u);
          if (i === void 0) {
            var c = Object.getPrototypeOf(l);
            return c === null ? void 0 : s(c, u, r);
          } else {
            if ("value" in i)
              return i.value;
            var n = i.get;
            return n === void 0 ? void 0 : n.call(r);
          }
        }, _ = f(28), g = y(_);
        function y(s) {
          return s && s.__esModule ? s : { default: s };
        }
        function h(s, l) {
          if (!(s instanceof l))
            throw new TypeError("Cannot call a class as a function");
        }
        function o(s, l) {
          if (!s)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return l && (typeof l == "object" || typeof l == "function") ? l : s;
        }
        function t(s, l) {
          if (typeof l != "function" && l !== null)
            throw new TypeError("Super expression must either be null or a function, not " + typeof l);
          s.prototype = Object.create(l && l.prototype, { constructor: { value: s, enumerable: !1, writable: !0, configurable: !0 } }), l && (Object.setPrototypeOf ? Object.setPrototypeOf(s, l) : s.__proto__ = l);
        }
        var e = function(s) {
          t(l, s);
          function l(u, r) {
            h(this, l);
            var i = o(this, (l.__proto__ || Object.getPrototypeOf(l)).call(this, u));
            return i.label.innerHTML = r, i.container.classList.add("ql-color-picker"), [].slice.call(i.container.querySelectorAll(".ql-picker-item"), 0, 7).forEach(function(c) {
              c.classList.add("ql-primary");
            }), i;
          }
          return E(l, [{
            key: "buildItem",
            value: function(r) {
              var i = b(l.prototype.__proto__ || Object.getPrototypeOf(l.prototype), "buildItem", this).call(this, r);
              return i.style.backgroundColor = r.getAttribute("value") || "", i;
            }
          }, {
            key: "selectItem",
            value: function(r, i) {
              b(l.prototype.__proto__ || Object.getPrototypeOf(l.prototype), "selectItem", this).call(this, r, i);
              var c = this.label.querySelector(".ql-color-label"), n = r && r.getAttribute("data-value") || "";
              c && (c.tagName === "line" ? c.style.stroke = n : c.style.fill = n);
            }
          }]), l;
        }(g.default);
        d.default = e;
      },
      function(m, d, f) {
        Object.defineProperty(d, "__esModule", {
          value: !0
        });
        var E = function() {
          function s(l, u) {
            for (var r = 0; r < u.length; r++) {
              var i = u[r];
              i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(l, i.key, i);
            }
          }
          return function(l, u, r) {
            return u && s(l.prototype, u), r && s(l, r), l;
          };
        }(), b = function s(l, u, r) {
          l === null && (l = Function.prototype);
          var i = Object.getOwnPropertyDescriptor(l, u);
          if (i === void 0) {
            var c = Object.getPrototypeOf(l);
            return c === null ? void 0 : s(c, u, r);
          } else {
            if ("value" in i)
              return i.value;
            var n = i.get;
            return n === void 0 ? void 0 : n.call(r);
          }
        }, _ = f(28), g = y(_);
        function y(s) {
          return s && s.__esModule ? s : { default: s };
        }
        function h(s, l) {
          if (!(s instanceof l))
            throw new TypeError("Cannot call a class as a function");
        }
        function o(s, l) {
          if (!s)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return l && (typeof l == "object" || typeof l == "function") ? l : s;
        }
        function t(s, l) {
          if (typeof l != "function" && l !== null)
            throw new TypeError("Super expression must either be null or a function, not " + typeof l);
          s.prototype = Object.create(l && l.prototype, { constructor: { value: s, enumerable: !1, writable: !0, configurable: !0 } }), l && (Object.setPrototypeOf ? Object.setPrototypeOf(s, l) : s.__proto__ = l);
        }
        var e = function(s) {
          t(l, s);
          function l(u, r) {
            h(this, l);
            var i = o(this, (l.__proto__ || Object.getPrototypeOf(l)).call(this, u));
            return i.container.classList.add("ql-icon-picker"), [].forEach.call(i.container.querySelectorAll(".ql-picker-item"), function(c) {
              c.innerHTML = r[c.getAttribute("data-value") || ""];
            }), i.defaultItem = i.container.querySelector(".ql-selected"), i.selectItem(i.defaultItem), i;
          }
          return E(l, [{
            key: "selectItem",
            value: function(r, i) {
              b(l.prototype.__proto__ || Object.getPrototypeOf(l.prototype), "selectItem", this).call(this, r, i), r = r || this.defaultItem, this.label.innerHTML = r.innerHTML;
            }
          }]), l;
        }(g.default);
        d.default = e;
      },
      function(m, d, f) {
        Object.defineProperty(d, "__esModule", {
          value: !0
        });
        var E = function() {
          function g(y, h) {
            for (var o = 0; o < h.length; o++) {
              var t = h[o];
              t.enumerable = t.enumerable || !1, t.configurable = !0, "value" in t && (t.writable = !0), Object.defineProperty(y, t.key, t);
            }
          }
          return function(y, h, o) {
            return h && g(y.prototype, h), o && g(y, o), y;
          };
        }();
        function b(g, y) {
          if (!(g instanceof y))
            throw new TypeError("Cannot call a class as a function");
        }
        var _ = function() {
          function g(y, h) {
            var o = this;
            b(this, g), this.quill = y, this.boundsContainer = h || document.body, this.root = y.addContainer("ql-tooltip"), this.root.innerHTML = this.constructor.TEMPLATE, this.quill.root === this.quill.scrollingContainer && this.quill.root.addEventListener("scroll", function() {
              o.root.style.marginTop = -1 * o.quill.root.scrollTop + "px";
            }), this.hide();
          }
          return E(g, [{
            key: "hide",
            value: function() {
              this.root.classList.add("ql-hidden");
            }
          }, {
            key: "position",
            value: function(h) {
              var o = h.left + h.width / 2 - this.root.offsetWidth / 2, t = h.bottom + this.quill.root.scrollTop;
              this.root.style.left = o + "px", this.root.style.top = t + "px", this.root.classList.remove("ql-flip");
              var e = this.boundsContainer.getBoundingClientRect(), s = this.root.getBoundingClientRect(), l = 0;
              if (s.right > e.right && (l = e.right - s.right, this.root.style.left = o + l + "px"), s.left < e.left && (l = e.left - s.left, this.root.style.left = o + l + "px"), s.bottom > e.bottom) {
                var u = s.bottom - s.top, r = h.bottom - h.top + u;
                this.root.style.top = t - r + "px", this.root.classList.add("ql-flip");
              }
              return l;
            }
          }, {
            key: "show",
            value: function() {
              this.root.classList.remove("ql-editing"), this.root.classList.remove("ql-hidden");
            }
          }]), g;
        }();
        d.default = _;
      },
      function(m, d, f) {
        Object.defineProperty(d, "__esModule", {
          value: !0
        });
        var E = function() {
          function A(p, O) {
            var k = [], L = !0, D = !1, z = void 0;
            try {
              for (var $ = p[Symbol.iterator](), J; !(L = (J = $.next()).done) && (k.push(J.value), !(O && k.length === O)); L = !0)
                ;
            } catch (H) {
              D = !0, z = H;
            } finally {
              try {
                !L && $.return && $.return();
              } finally {
                if (D)
                  throw z;
              }
            }
            return k;
          }
          return function(p, O) {
            if (Array.isArray(p))
              return p;
            if (Symbol.iterator in Object(p))
              return A(p, O);
            throw new TypeError("Invalid attempt to destructure non-iterable instance");
          };
        }(), b = function A(p, O, k) {
          p === null && (p = Function.prototype);
          var L = Object.getOwnPropertyDescriptor(p, O);
          if (L === void 0) {
            var D = Object.getPrototypeOf(p);
            return D === null ? void 0 : A(D, O, k);
          } else {
            if ("value" in L)
              return L.value;
            var z = L.get;
            return z === void 0 ? void 0 : z.call(k);
          }
        }, _ = function() {
          function A(p, O) {
            for (var k = 0; k < O.length; k++) {
              var L = O[k];
              L.enumerable = L.enumerable || !1, L.configurable = !0, "value" in L && (L.writable = !0), Object.defineProperty(p, L.key, L);
            }
          }
          return function(p, O, k) {
            return O && A(p.prototype, O), k && A(p, k), p;
          };
        }(), g = f(3), y = c(g), h = f(8), o = c(h), t = f(43), e = c(t), s = f(27), l = c(s), u = f(15), r = f(41), i = c(r);
        function c(A) {
          return A && A.__esModule ? A : { default: A };
        }
        function n(A, p) {
          if (!(A instanceof p))
            throw new TypeError("Cannot call a class as a function");
        }
        function v(A, p) {
          if (!A)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return p && (typeof p == "object" || typeof p == "function") ? p : A;
        }
        function S(A, p) {
          if (typeof p != "function" && p !== null)
            throw new TypeError("Super expression must either be null or a function, not " + typeof p);
          A.prototype = Object.create(p && p.prototype, { constructor: { value: A, enumerable: !1, writable: !0, configurable: !0 } }), p && (Object.setPrototypeOf ? Object.setPrototypeOf(A, p) : A.__proto__ = p);
        }
        var w = [[{ header: ["1", "2", "3", !1] }], ["bold", "italic", "underline", "link"], [{ list: "ordered" }, { list: "bullet" }], ["clean"]], T = function(A) {
          S(p, A);
          function p(O, k) {
            n(this, p), k.modules.toolbar != null && k.modules.toolbar.container == null && (k.modules.toolbar.container = w);
            var L = v(this, (p.__proto__ || Object.getPrototypeOf(p)).call(this, O, k));
            return L.quill.container.classList.add("ql-snow"), L;
          }
          return _(p, [{
            key: "extendToolbar",
            value: function(k) {
              k.container.classList.add("ql-snow"), this.buildButtons([].slice.call(k.container.querySelectorAll("button")), i.default), this.buildPickers([].slice.call(k.container.querySelectorAll("select")), i.default), this.tooltip = new P(this.quill, this.options.bounds), k.container.querySelector(".ql-link") && this.quill.keyboard.addBinding({ key: "K", shortKey: !0 }, function(L, D) {
                k.handlers.link.call(k, !D.format.link);
              });
            }
          }]), p;
        }(e.default);
        T.DEFAULTS = (0, y.default)(!0, {}, e.default.DEFAULTS, {
          modules: {
            toolbar: {
              handlers: {
                link: function(p) {
                  if (p) {
                    var O = this.quill.getSelection();
                    if (O == null || O.length == 0)
                      return;
                    var k = this.quill.getText(O);
                    /^\S+@\S+\.\S+$/.test(k) && k.indexOf("mailto:") !== 0 && (k = "mailto:" + k);
                    var L = this.quill.theme.tooltip;
                    L.edit("link", k);
                  } else
                    this.quill.format("link", !1);
                }
              }
            }
          }
        });
        var P = function(A) {
          S(p, A);
          function p(O, k) {
            n(this, p);
            var L = v(this, (p.__proto__ || Object.getPrototypeOf(p)).call(this, O, k));
            return L.preview = L.root.querySelector("a.ql-preview"), L;
          }
          return _(p, [{
            key: "listen",
            value: function() {
              var k = this;
              b(p.prototype.__proto__ || Object.getPrototypeOf(p.prototype), "listen", this).call(this), this.root.querySelector("a.ql-action").addEventListener("click", function(L) {
                k.root.classList.contains("ql-editing") ? k.save() : k.edit("link", k.preview.textContent), L.preventDefault();
              }), this.root.querySelector("a.ql-remove").addEventListener("click", function(L) {
                if (k.linkRange != null) {
                  var D = k.linkRange;
                  k.restoreFocus(), k.quill.formatText(D, "link", !1, o.default.sources.USER), delete k.linkRange;
                }
                L.preventDefault(), k.hide();
              }), this.quill.on(o.default.events.SELECTION_CHANGE, function(L, D, z) {
                if (L != null) {
                  if (L.length === 0 && z === o.default.sources.USER) {
                    var $ = k.quill.scroll.descendant(l.default, L.index), J = E($, 2), H = J[0], j = J[1];
                    if (H != null) {
                      k.linkRange = new u.Range(L.index - j, H.length());
                      var N = l.default.formats(H.domNode);
                      k.preview.textContent = N, k.preview.setAttribute("href", N), k.show(), k.position(k.quill.getBounds(k.linkRange));
                      return;
                    }
                  } else
                    delete k.linkRange;
                  k.hide();
                }
              });
            }
          }, {
            key: "show",
            value: function() {
              b(p.prototype.__proto__ || Object.getPrototypeOf(p.prototype), "show", this).call(this), this.root.removeAttribute("data-mode");
            }
          }]), p;
        }(t.BaseTooltip);
        P.TEMPLATE = ['<a class="ql-preview" rel="noopener noreferrer" target="_blank" href="about:blank"></a>', '<input type="text" data-formula="e=mc^2" data-link="https://quilljs.com" data-video="Embed URL">', '<a class="ql-action"></a>', '<a class="ql-remove"></a>'].join(""), d.default = T;
      },
      function(m, d, f) {
        Object.defineProperty(d, "__esModule", {
          value: !0
        });
        var E = f(29), b = X(E), _ = f(36), g = f(38), y = f(64), h = f(65), o = X(h), t = f(66), e = X(t), s = f(67), l = X(s), u = f(37), r = f(26), i = f(39), c = f(40), n = f(56), v = X(n), S = f(68), w = X(S), T = f(27), P = X(T), A = f(69), p = X(A), O = f(70), k = X(O), L = f(71), D = X(L), z = f(72), $ = X(z), J = f(73), H = X(J), j = f(13), N = X(j), I = f(74), M = X(I), K = f(75), C = X(K), q = f(57), F = X(q), G = f(41), V = X(G), Q = f(28), nt = X(Q), it = f(59), at = X(it), ft = f(60), ht = X(ft), mt = f(61), gt = X(mt), W = f(108), Y = X(W), tt = f(62), et = X(tt);
        function X(st) {
          return st && st.__esModule ? st : { default: st };
        }
        b.default.register({
          "attributors/attribute/direction": g.DirectionAttribute,
          "attributors/class/align": _.AlignClass,
          "attributors/class/background": u.BackgroundClass,
          "attributors/class/color": r.ColorClass,
          "attributors/class/direction": g.DirectionClass,
          "attributors/class/font": i.FontClass,
          "attributors/class/size": c.SizeClass,
          "attributors/style/align": _.AlignStyle,
          "attributors/style/background": u.BackgroundStyle,
          "attributors/style/color": r.ColorStyle,
          "attributors/style/direction": g.DirectionStyle,
          "attributors/style/font": i.FontStyle,
          "attributors/style/size": c.SizeStyle
        }, !0), b.default.register({
          "formats/align": _.AlignClass,
          "formats/direction": g.DirectionClass,
          "formats/indent": y.IndentClass,
          "formats/background": u.BackgroundStyle,
          "formats/color": r.ColorStyle,
          "formats/font": i.FontClass,
          "formats/size": c.SizeClass,
          "formats/blockquote": o.default,
          "formats/code-block": N.default,
          "formats/header": e.default,
          "formats/list": l.default,
          "formats/bold": v.default,
          "formats/code": j.Code,
          "formats/italic": w.default,
          "formats/link": P.default,
          "formats/script": p.default,
          "formats/strike": k.default,
          "formats/underline": D.default,
          "formats/image": $.default,
          "formats/video": H.default,
          "formats/list/item": s.ListItem,
          "modules/formula": M.default,
          "modules/syntax": C.default,
          "modules/toolbar": F.default,
          "themes/bubble": Y.default,
          "themes/snow": et.default,
          "ui/icons": V.default,
          "ui/picker": nt.default,
          "ui/icon-picker": ht.default,
          "ui/color-picker": at.default,
          "ui/tooltip": gt.default
        }, !0), d.default = b.default;
      },
      function(m, d, f) {
        Object.defineProperty(d, "__esModule", {
          value: !0
        }), d.IndentClass = void 0;
        var E = function() {
          function l(u, r) {
            for (var i = 0; i < r.length; i++) {
              var c = r[i];
              c.enumerable = c.enumerable || !1, c.configurable = !0, "value" in c && (c.writable = !0), Object.defineProperty(u, c.key, c);
            }
          }
          return function(u, r, i) {
            return r && l(u.prototype, r), i && l(u, i), u;
          };
        }(), b = function l(u, r, i) {
          u === null && (u = Function.prototype);
          var c = Object.getOwnPropertyDescriptor(u, r);
          if (c === void 0) {
            var n = Object.getPrototypeOf(u);
            return n === null ? void 0 : l(n, r, i);
          } else {
            if ("value" in c)
              return c.value;
            var v = c.get;
            return v === void 0 ? void 0 : v.call(i);
          }
        }, _ = f(0), g = y(_);
        function y(l) {
          return l && l.__esModule ? l : { default: l };
        }
        function h(l, u) {
          if (!(l instanceof u))
            throw new TypeError("Cannot call a class as a function");
        }
        function o(l, u) {
          if (!l)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return u && (typeof u == "object" || typeof u == "function") ? u : l;
        }
        function t(l, u) {
          if (typeof u != "function" && u !== null)
            throw new TypeError("Super expression must either be null or a function, not " + typeof u);
          l.prototype = Object.create(u && u.prototype, { constructor: { value: l, enumerable: !1, writable: !0, configurable: !0 } }), u && (Object.setPrototypeOf ? Object.setPrototypeOf(l, u) : l.__proto__ = u);
        }
        var e = function(l) {
          t(u, l);
          function u() {
            return h(this, u), o(this, (u.__proto__ || Object.getPrototypeOf(u)).apply(this, arguments));
          }
          return E(u, [{
            key: "add",
            value: function(i, c) {
              if (c === "+1" || c === "-1") {
                var n = this.value(i) || 0;
                c = c === "+1" ? n + 1 : n - 1;
              }
              return c === 0 ? (this.remove(i), !0) : b(u.prototype.__proto__ || Object.getPrototypeOf(u.prototype), "add", this).call(this, i, c);
            }
          }, {
            key: "canAdd",
            value: function(i, c) {
              return b(u.prototype.__proto__ || Object.getPrototypeOf(u.prototype), "canAdd", this).call(this, i, c) || b(u.prototype.__proto__ || Object.getPrototypeOf(u.prototype), "canAdd", this).call(this, i, parseInt(c));
            }
          }, {
            key: "value",
            value: function(i) {
              return parseInt(b(u.prototype.__proto__ || Object.getPrototypeOf(u.prototype), "value", this).call(this, i)) || void 0;
            }
          }]), u;
        }(g.default.Attributor.Class), s = new e("indent", "ql-indent", {
          scope: g.default.Scope.BLOCK,
          whitelist: [1, 2, 3, 4, 5, 6, 7, 8]
        });
        d.IndentClass = s;
      },
      function(m, d, f) {
        Object.defineProperty(d, "__esModule", {
          value: !0
        });
        var E = f(4), b = _(E);
        function _(t) {
          return t && t.__esModule ? t : { default: t };
        }
        function g(t, e) {
          if (!(t instanceof e))
            throw new TypeError("Cannot call a class as a function");
        }
        function y(t, e) {
          if (!t)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return e && (typeof e == "object" || typeof e == "function") ? e : t;
        }
        function h(t, e) {
          if (typeof e != "function" && e !== null)
            throw new TypeError("Super expression must either be null or a function, not " + typeof e);
          t.prototype = Object.create(e && e.prototype, { constructor: { value: t, enumerable: !1, writable: !0, configurable: !0 } }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e);
        }
        var o = function(t) {
          h(e, t);
          function e() {
            return g(this, e), y(this, (e.__proto__ || Object.getPrototypeOf(e)).apply(this, arguments));
          }
          return e;
        }(b.default);
        o.blotName = "blockquote", o.tagName = "blockquote", d.default = o;
      },
      function(m, d, f) {
        Object.defineProperty(d, "__esModule", {
          value: !0
        });
        var E = function() {
          function e(s, l) {
            for (var u = 0; u < l.length; u++) {
              var r = l[u];
              r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(s, r.key, r);
            }
          }
          return function(s, l, u) {
            return l && e(s.prototype, l), u && e(s, u), s;
          };
        }(), b = f(4), _ = g(b);
        function g(e) {
          return e && e.__esModule ? e : { default: e };
        }
        function y(e, s) {
          if (!(e instanceof s))
            throw new TypeError("Cannot call a class as a function");
        }
        function h(e, s) {
          if (!e)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return s && (typeof s == "object" || typeof s == "function") ? s : e;
        }
        function o(e, s) {
          if (typeof s != "function" && s !== null)
            throw new TypeError("Super expression must either be null or a function, not " + typeof s);
          e.prototype = Object.create(s && s.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), s && (Object.setPrototypeOf ? Object.setPrototypeOf(e, s) : e.__proto__ = s);
        }
        var t = function(e) {
          o(s, e);
          function s() {
            return y(this, s), h(this, (s.__proto__ || Object.getPrototypeOf(s)).apply(this, arguments));
          }
          return E(s, null, [{
            key: "formats",
            value: function(u) {
              return this.tagName.indexOf(u.tagName) + 1;
            }
          }]), s;
        }(_.default);
        t.blotName = "header", t.tagName = ["H1", "H2", "H3", "H4", "H5", "H6"], d.default = t;
      },
      function(m, d, f) {
        Object.defineProperty(d, "__esModule", {
          value: !0
        }), d.default = d.ListItem = void 0;
        var E = function() {
          function n(v, S) {
            for (var w = 0; w < S.length; w++) {
              var T = S[w];
              T.enumerable = T.enumerable || !1, T.configurable = !0, "value" in T && (T.writable = !0), Object.defineProperty(v, T.key, T);
            }
          }
          return function(v, S, w) {
            return S && n(v.prototype, S), w && n(v, w), v;
          };
        }(), b = function n(v, S, w) {
          v === null && (v = Function.prototype);
          var T = Object.getOwnPropertyDescriptor(v, S);
          if (T === void 0) {
            var P = Object.getPrototypeOf(v);
            return P === null ? void 0 : n(P, S, w);
          } else {
            if ("value" in T)
              return T.value;
            var A = T.get;
            return A === void 0 ? void 0 : A.call(w);
          }
        }, _ = f(0), g = e(_), y = f(4), h = e(y), o = f(25), t = e(o);
        function e(n) {
          return n && n.__esModule ? n : { default: n };
        }
        function s(n, v, S) {
          return v in n ? Object.defineProperty(n, v, { value: S, enumerable: !0, configurable: !0, writable: !0 }) : n[v] = S, n;
        }
        function l(n, v) {
          if (!(n instanceof v))
            throw new TypeError("Cannot call a class as a function");
        }
        function u(n, v) {
          if (!n)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return v && (typeof v == "object" || typeof v == "function") ? v : n;
        }
        function r(n, v) {
          if (typeof v != "function" && v !== null)
            throw new TypeError("Super expression must either be null or a function, not " + typeof v);
          n.prototype = Object.create(v && v.prototype, { constructor: { value: n, enumerable: !1, writable: !0, configurable: !0 } }), v && (Object.setPrototypeOf ? Object.setPrototypeOf(n, v) : n.__proto__ = v);
        }
        var i = function(n) {
          r(v, n);
          function v() {
            return l(this, v), u(this, (v.__proto__ || Object.getPrototypeOf(v)).apply(this, arguments));
          }
          return E(v, [{
            key: "format",
            value: function(w, T) {
              w === c.blotName && !T ? this.replaceWith(g.default.create(this.statics.scope)) : b(v.prototype.__proto__ || Object.getPrototypeOf(v.prototype), "format", this).call(this, w, T);
            }
          }, {
            key: "remove",
            value: function() {
              this.prev == null && this.next == null ? this.parent.remove() : b(v.prototype.__proto__ || Object.getPrototypeOf(v.prototype), "remove", this).call(this);
            }
          }, {
            key: "replaceWith",
            value: function(w, T) {
              return this.parent.isolate(this.offset(this.parent), this.length()), w === this.parent.statics.blotName ? (this.parent.replaceWith(w, T), this) : (this.parent.unwrap(), b(v.prototype.__proto__ || Object.getPrototypeOf(v.prototype), "replaceWith", this).call(this, w, T));
            }
          }], [{
            key: "formats",
            value: function(w) {
              return w.tagName === this.tagName ? void 0 : b(v.__proto__ || Object.getPrototypeOf(v), "formats", this).call(this, w);
            }
          }]), v;
        }(h.default);
        i.blotName = "list-item", i.tagName = "LI";
        var c = function(n) {
          r(v, n), E(v, null, [{
            key: "create",
            value: function(w) {
              var T = w === "ordered" ? "OL" : "UL", P = b(v.__proto__ || Object.getPrototypeOf(v), "create", this).call(this, T);
              return (w === "checked" || w === "unchecked") && P.setAttribute("data-checked", w === "checked"), P;
            }
          }, {
            key: "formats",
            value: function(w) {
              if (w.tagName === "OL")
                return "ordered";
              if (w.tagName === "UL")
                return w.hasAttribute("data-checked") ? w.getAttribute("data-checked") === "true" ? "checked" : "unchecked" : "bullet";
            }
          }]);
          function v(S) {
            l(this, v);
            var w = u(this, (v.__proto__ || Object.getPrototypeOf(v)).call(this, S)), T = function(A) {
              if (A.target.parentNode === S) {
                var p = w.statics.formats(S), O = g.default.find(A.target);
                p === "checked" ? O.format("list", "unchecked") : p === "unchecked" && O.format("list", "checked");
              }
            };
            return S.addEventListener("touchstart", T), S.addEventListener("mousedown", T), w;
          }
          return E(v, [{
            key: "format",
            value: function(w, T) {
              this.children.length > 0 && this.children.tail.format(w, T);
            }
          }, {
            key: "formats",
            value: function() {
              return s({}, this.statics.blotName, this.statics.formats(this.domNode));
            }
          }, {
            key: "insertBefore",
            value: function(w, T) {
              if (w instanceof i)
                b(v.prototype.__proto__ || Object.getPrototypeOf(v.prototype), "insertBefore", this).call(this, w, T);
              else {
                var P = T == null ? this.length() : T.offset(this), A = this.split(P);
                A.parent.insertBefore(w, A);
              }
            }
          }, {
            key: "optimize",
            value: function(w) {
              b(v.prototype.__proto__ || Object.getPrototypeOf(v.prototype), "optimize", this).call(this, w);
              var T = this.next;
              T != null && T.prev === this && T.statics.blotName === this.statics.blotName && T.domNode.tagName === this.domNode.tagName && T.domNode.getAttribute("data-checked") === this.domNode.getAttribute("data-checked") && (T.moveChildren(this), T.remove());
            }
          }, {
            key: "replace",
            value: function(w) {
              if (w.statics.blotName !== this.statics.blotName) {
                var T = g.default.create(this.statics.defaultChild);
                w.moveChildren(T), this.appendChild(T);
              }
              b(v.prototype.__proto__ || Object.getPrototypeOf(v.prototype), "replace", this).call(this, w);
            }
          }]), v;
        }(t.default);
        c.blotName = "list", c.scope = g.default.Scope.BLOCK_BLOT, c.tagName = ["OL", "UL"], c.defaultChild = "list-item", c.allowedChildren = [i], d.ListItem = i, d.default = c;
      },
      function(m, d, f) {
        Object.defineProperty(d, "__esModule", {
          value: !0
        });
        var E = f(56), b = _(E);
        function _(t) {
          return t && t.__esModule ? t : { default: t };
        }
        function g(t, e) {
          if (!(t instanceof e))
            throw new TypeError("Cannot call a class as a function");
        }
        function y(t, e) {
          if (!t)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return e && (typeof e == "object" || typeof e == "function") ? e : t;
        }
        function h(t, e) {
          if (typeof e != "function" && e !== null)
            throw new TypeError("Super expression must either be null or a function, not " + typeof e);
          t.prototype = Object.create(e && e.prototype, { constructor: { value: t, enumerable: !1, writable: !0, configurable: !0 } }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e);
        }
        var o = function(t) {
          h(e, t);
          function e() {
            return g(this, e), y(this, (e.__proto__ || Object.getPrototypeOf(e)).apply(this, arguments));
          }
          return e;
        }(b.default);
        o.blotName = "italic", o.tagName = ["EM", "I"], d.default = o;
      },
      function(m, d, f) {
        Object.defineProperty(d, "__esModule", {
          value: !0
        });
        var E = function() {
          function s(l, u) {
            for (var r = 0; r < u.length; r++) {
              var i = u[r];
              i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(l, i.key, i);
            }
          }
          return function(l, u, r) {
            return u && s(l.prototype, u), r && s(l, r), l;
          };
        }(), b = function s(l, u, r) {
          l === null && (l = Function.prototype);
          var i = Object.getOwnPropertyDescriptor(l, u);
          if (i === void 0) {
            var c = Object.getPrototypeOf(l);
            return c === null ? void 0 : s(c, u, r);
          } else {
            if ("value" in i)
              return i.value;
            var n = i.get;
            return n === void 0 ? void 0 : n.call(r);
          }
        }, _ = f(6), g = y(_);
        function y(s) {
          return s && s.__esModule ? s : { default: s };
        }
        function h(s, l) {
          if (!(s instanceof l))
            throw new TypeError("Cannot call a class as a function");
        }
        function o(s, l) {
          if (!s)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return l && (typeof l == "object" || typeof l == "function") ? l : s;
        }
        function t(s, l) {
          if (typeof l != "function" && l !== null)
            throw new TypeError("Super expression must either be null or a function, not " + typeof l);
          s.prototype = Object.create(l && l.prototype, { constructor: { value: s, enumerable: !1, writable: !0, configurable: !0 } }), l && (Object.setPrototypeOf ? Object.setPrototypeOf(s, l) : s.__proto__ = l);
        }
        var e = function(s) {
          t(l, s);
          function l() {
            return h(this, l), o(this, (l.__proto__ || Object.getPrototypeOf(l)).apply(this, arguments));
          }
          return E(l, null, [{
            key: "create",
            value: function(r) {
              return r === "super" ? document.createElement("sup") : r === "sub" ? document.createElement("sub") : b(l.__proto__ || Object.getPrototypeOf(l), "create", this).call(this, r);
            }
          }, {
            key: "formats",
            value: function(r) {
              if (r.tagName === "SUB")
                return "sub";
              if (r.tagName === "SUP")
                return "super";
            }
          }]), l;
        }(g.default);
        e.blotName = "script", e.tagName = ["SUB", "SUP"], d.default = e;
      },
      function(m, d, f) {
        Object.defineProperty(d, "__esModule", {
          value: !0
        });
        var E = f(6), b = _(E);
        function _(t) {
          return t && t.__esModule ? t : { default: t };
        }
        function g(t, e) {
          if (!(t instanceof e))
            throw new TypeError("Cannot call a class as a function");
        }
        function y(t, e) {
          if (!t)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return e && (typeof e == "object" || typeof e == "function") ? e : t;
        }
        function h(t, e) {
          if (typeof e != "function" && e !== null)
            throw new TypeError("Super expression must either be null or a function, not " + typeof e);
          t.prototype = Object.create(e && e.prototype, { constructor: { value: t, enumerable: !1, writable: !0, configurable: !0 } }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e);
        }
        var o = function(t) {
          h(e, t);
          function e() {
            return g(this, e), y(this, (e.__proto__ || Object.getPrototypeOf(e)).apply(this, arguments));
          }
          return e;
        }(b.default);
        o.blotName = "strike", o.tagName = "S", d.default = o;
      },
      function(m, d, f) {
        Object.defineProperty(d, "__esModule", {
          value: !0
        });
        var E = f(6), b = _(E);
        function _(t) {
          return t && t.__esModule ? t : { default: t };
        }
        function g(t, e) {
          if (!(t instanceof e))
            throw new TypeError("Cannot call a class as a function");
        }
        function y(t, e) {
          if (!t)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return e && (typeof e == "object" || typeof e == "function") ? e : t;
        }
        function h(t, e) {
          if (typeof e != "function" && e !== null)
            throw new TypeError("Super expression must either be null or a function, not " + typeof e);
          t.prototype = Object.create(e && e.prototype, { constructor: { value: t, enumerable: !1, writable: !0, configurable: !0 } }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e);
        }
        var o = function(t) {
          h(e, t);
          function e() {
            return g(this, e), y(this, (e.__proto__ || Object.getPrototypeOf(e)).apply(this, arguments));
          }
          return e;
        }(b.default);
        o.blotName = "underline", o.tagName = "U", d.default = o;
      },
      function(m, d, f) {
        Object.defineProperty(d, "__esModule", {
          value: !0
        });
        var E = function() {
          function u(r, i) {
            for (var c = 0; c < i.length; c++) {
              var n = i[c];
              n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(r, n.key, n);
            }
          }
          return function(r, i, c) {
            return i && u(r.prototype, i), c && u(r, c), r;
          };
        }(), b = function u(r, i, c) {
          r === null && (r = Function.prototype);
          var n = Object.getOwnPropertyDescriptor(r, i);
          if (n === void 0) {
            var v = Object.getPrototypeOf(r);
            return v === null ? void 0 : u(v, i, c);
          } else {
            if ("value" in n)
              return n.value;
            var S = n.get;
            return S === void 0 ? void 0 : S.call(c);
          }
        }, _ = f(0), g = h(_), y = f(27);
        function h(u) {
          return u && u.__esModule ? u : { default: u };
        }
        function o(u, r) {
          if (!(u instanceof r))
            throw new TypeError("Cannot call a class as a function");
        }
        function t(u, r) {
          if (!u)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return r && (typeof r == "object" || typeof r == "function") ? r : u;
        }
        function e(u, r) {
          if (typeof r != "function" && r !== null)
            throw new TypeError("Super expression must either be null or a function, not " + typeof r);
          u.prototype = Object.create(r && r.prototype, { constructor: { value: u, enumerable: !1, writable: !0, configurable: !0 } }), r && (Object.setPrototypeOf ? Object.setPrototypeOf(u, r) : u.__proto__ = r);
        }
        var s = ["alt", "height", "width"], l = function(u) {
          e(r, u);
          function r() {
            return o(this, r), t(this, (r.__proto__ || Object.getPrototypeOf(r)).apply(this, arguments));
          }
          return E(r, [{
            key: "format",
            value: function(c, n) {
              s.indexOf(c) > -1 ? n ? this.domNode.setAttribute(c, n) : this.domNode.removeAttribute(c) : b(r.prototype.__proto__ || Object.getPrototypeOf(r.prototype), "format", this).call(this, c, n);
            }
          }], [{
            key: "create",
            value: function(c) {
              var n = b(r.__proto__ || Object.getPrototypeOf(r), "create", this).call(this, c);
              return typeof c == "string" && n.setAttribute("src", this.sanitize(c)), n;
            }
          }, {
            key: "formats",
            value: function(c) {
              return s.reduce(function(n, v) {
                return c.hasAttribute(v) && (n[v] = c.getAttribute(v)), n;
              }, {});
            }
          }, {
            key: "match",
            value: function(c) {
              return /\.(jpe?g|gif|png)$/.test(c) || /^data:image\/.+;base64/.test(c);
            }
          }, {
            key: "sanitize",
            value: function(c) {
              return (0, y.sanitize)(c, ["http", "https", "data"]) ? c : "//:0";
            }
          }, {
            key: "value",
            value: function(c) {
              return c.getAttribute("src");
            }
          }]), r;
        }(g.default.Embed);
        l.blotName = "image", l.tagName = "IMG", d.default = l;
      },
      function(m, d, f) {
        Object.defineProperty(d, "__esModule", {
          value: !0
        });
        var E = function() {
          function u(r, i) {
            for (var c = 0; c < i.length; c++) {
              var n = i[c];
              n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(r, n.key, n);
            }
          }
          return function(r, i, c) {
            return i && u(r.prototype, i), c && u(r, c), r;
          };
        }(), b = function u(r, i, c) {
          r === null && (r = Function.prototype);
          var n = Object.getOwnPropertyDescriptor(r, i);
          if (n === void 0) {
            var v = Object.getPrototypeOf(r);
            return v === null ? void 0 : u(v, i, c);
          } else {
            if ("value" in n)
              return n.value;
            var S = n.get;
            return S === void 0 ? void 0 : S.call(c);
          }
        }, _ = f(4), g = f(27), y = h(g);
        function h(u) {
          return u && u.__esModule ? u : { default: u };
        }
        function o(u, r) {
          if (!(u instanceof r))
            throw new TypeError("Cannot call a class as a function");
        }
        function t(u, r) {
          if (!u)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return r && (typeof r == "object" || typeof r == "function") ? r : u;
        }
        function e(u, r) {
          if (typeof r != "function" && r !== null)
            throw new TypeError("Super expression must either be null or a function, not " + typeof r);
          u.prototype = Object.create(r && r.prototype, { constructor: { value: u, enumerable: !1, writable: !0, configurable: !0 } }), r && (Object.setPrototypeOf ? Object.setPrototypeOf(u, r) : u.__proto__ = r);
        }
        var s = ["height", "width"], l = function(u) {
          e(r, u);
          function r() {
            return o(this, r), t(this, (r.__proto__ || Object.getPrototypeOf(r)).apply(this, arguments));
          }
          return E(r, [{
            key: "format",
            value: function(c, n) {
              s.indexOf(c) > -1 ? n ? this.domNode.setAttribute(c, n) : this.domNode.removeAttribute(c) : b(r.prototype.__proto__ || Object.getPrototypeOf(r.prototype), "format", this).call(this, c, n);
            }
          }], [{
            key: "create",
            value: function(c) {
              var n = b(r.__proto__ || Object.getPrototypeOf(r), "create", this).call(this, c);
              return n.setAttribute("frameborder", "0"), n.setAttribute("allowfullscreen", !0), n.setAttribute("src", this.sanitize(c)), n;
            }
          }, {
            key: "formats",
            value: function(c) {
              return s.reduce(function(n, v) {
                return c.hasAttribute(v) && (n[v] = c.getAttribute(v)), n;
              }, {});
            }
          }, {
            key: "sanitize",
            value: function(c) {
              return y.default.sanitize(c);
            }
          }, {
            key: "value",
            value: function(c) {
              return c.getAttribute("src");
            }
          }]), r;
        }(_.BlockEmbed);
        l.blotName = "video", l.className = "ql-video", l.tagName = "IFRAME", d.default = l;
      },
      function(m, d, f) {
        Object.defineProperty(d, "__esModule", {
          value: !0
        }), d.default = d.FormulaBlot = void 0;
        var E = function() {
          function c(n, v) {
            for (var S = 0; S < v.length; S++) {
              var w = v[S];
              w.enumerable = w.enumerable || !1, w.configurable = !0, "value" in w && (w.writable = !0), Object.defineProperty(n, w.key, w);
            }
          }
          return function(n, v, S) {
            return v && c(n.prototype, v), S && c(n, S), n;
          };
        }(), b = function c(n, v, S) {
          n === null && (n = Function.prototype);
          var w = Object.getOwnPropertyDescriptor(n, v);
          if (w === void 0) {
            var T = Object.getPrototypeOf(n);
            return T === null ? void 0 : c(T, v, S);
          } else {
            if ("value" in w)
              return w.value;
            var P = w.get;
            return P === void 0 ? void 0 : P.call(S);
          }
        }, _ = f(35), g = e(_), y = f(5), h = e(y), o = f(9), t = e(o);
        function e(c) {
          return c && c.__esModule ? c : { default: c };
        }
        function s(c, n) {
          if (!(c instanceof n))
            throw new TypeError("Cannot call a class as a function");
        }
        function l(c, n) {
          if (!c)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return n && (typeof n == "object" || typeof n == "function") ? n : c;
        }
        function u(c, n) {
          if (typeof n != "function" && n !== null)
            throw new TypeError("Super expression must either be null or a function, not " + typeof n);
          c.prototype = Object.create(n && n.prototype, { constructor: { value: c, enumerable: !1, writable: !0, configurable: !0 } }), n && (Object.setPrototypeOf ? Object.setPrototypeOf(c, n) : c.__proto__ = n);
        }
        var r = function(c) {
          u(n, c);
          function n() {
            return s(this, n), l(this, (n.__proto__ || Object.getPrototypeOf(n)).apply(this, arguments));
          }
          return E(n, null, [{
            key: "create",
            value: function(S) {
              var w = b(n.__proto__ || Object.getPrototypeOf(n), "create", this).call(this, S);
              return typeof S == "string" && (window.katex.render(S, w, {
                throwOnError: !1,
                errorColor: "#f00"
              }), w.setAttribute("data-value", S)), w;
            }
          }, {
            key: "value",
            value: function(S) {
              return S.getAttribute("data-value");
            }
          }]), n;
        }(g.default);
        r.blotName = "formula", r.className = "ql-formula", r.tagName = "SPAN";
        var i = function(c) {
          u(n, c), E(n, null, [{
            key: "register",
            value: function() {
              h.default.register(r, !0);
            }
          }]);
          function n() {
            s(this, n);
            var v = l(this, (n.__proto__ || Object.getPrototypeOf(n)).call(this));
            if (window.katex == null)
              throw new Error("Formula module requires KaTeX.");
            return v;
          }
          return n;
        }(t.default);
        d.FormulaBlot = r, d.default = i;
      },
      function(m, d, f) {
        Object.defineProperty(d, "__esModule", {
          value: !0
        }), d.default = d.CodeToken = d.CodeBlock = void 0;
        var E = function() {
          function S(w, T) {
            for (var P = 0; P < T.length; P++) {
              var A = T[P];
              A.enumerable = A.enumerable || !1, A.configurable = !0, "value" in A && (A.writable = !0), Object.defineProperty(w, A.key, A);
            }
          }
          return function(w, T, P) {
            return T && S(w.prototype, T), P && S(w, P), w;
          };
        }(), b = function S(w, T, P) {
          w === null && (w = Function.prototype);
          var A = Object.getOwnPropertyDescriptor(w, T);
          if (A === void 0) {
            var p = Object.getPrototypeOf(w);
            return p === null ? void 0 : S(p, T, P);
          } else {
            if ("value" in A)
              return A.value;
            var O = A.get;
            return O === void 0 ? void 0 : O.call(P);
          }
        }, _ = f(0), g = l(_), y = f(5), h = l(y), o = f(9), t = l(o), e = f(13), s = l(e);
        function l(S) {
          return S && S.__esModule ? S : { default: S };
        }
        function u(S, w) {
          if (!(S instanceof w))
            throw new TypeError("Cannot call a class as a function");
        }
        function r(S, w) {
          if (!S)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return w && (typeof w == "object" || typeof w == "function") ? w : S;
        }
        function i(S, w) {
          if (typeof w != "function" && w !== null)
            throw new TypeError("Super expression must either be null or a function, not " + typeof w);
          S.prototype = Object.create(w && w.prototype, { constructor: { value: S, enumerable: !1, writable: !0, configurable: !0 } }), w && (Object.setPrototypeOf ? Object.setPrototypeOf(S, w) : S.__proto__ = w);
        }
        var c = function(S) {
          i(w, S);
          function w() {
            return u(this, w), r(this, (w.__proto__ || Object.getPrototypeOf(w)).apply(this, arguments));
          }
          return E(w, [{
            key: "replaceWith",
            value: function(P) {
              this.domNode.textContent = this.domNode.textContent, this.attach(), b(w.prototype.__proto__ || Object.getPrototypeOf(w.prototype), "replaceWith", this).call(this, P);
            }
          }, {
            key: "highlight",
            value: function(P) {
              var A = this.domNode.textContent;
              this.cachedText !== A && ((A.trim().length > 0 || this.cachedText == null) && (this.domNode.innerHTML = P(A), this.domNode.normalize(), this.attach()), this.cachedText = A);
            }
          }]), w;
        }(s.default);
        c.className = "ql-syntax";
        var n = new g.default.Attributor.Class("token", "hljs", {
          scope: g.default.Scope.INLINE
        }), v = function(S) {
          i(w, S), E(w, null, [{
            key: "register",
            value: function() {
              h.default.register(n, !0), h.default.register(c, !0);
            }
          }]);
          function w(T, P) {
            u(this, w);
            var A = r(this, (w.__proto__ || Object.getPrototypeOf(w)).call(this, T, P));
            if (typeof A.options.highlight != "function")
              throw new Error("Syntax module requires highlight.js. Please include the library on the page before Quill.");
            var p = null;
            return A.quill.on(h.default.events.SCROLL_OPTIMIZE, function() {
              clearTimeout(p), p = setTimeout(function() {
                A.highlight(), p = null;
              }, A.options.interval);
            }), A.highlight(), A;
          }
          return E(w, [{
            key: "highlight",
            value: function() {
              var P = this;
              if (!this.quill.selection.composing) {
                this.quill.update(h.default.sources.USER);
                var A = this.quill.getSelection();
                this.quill.scroll.descendants(c).forEach(function(p) {
                  p.highlight(P.options.highlight);
                }), this.quill.update(h.default.sources.SILENT), A != null && this.quill.setSelection(A, h.default.sources.SILENT);
              }
            }
          }]), w;
        }(t.default);
        v.DEFAULTS = {
          highlight: function() {
            return window.hljs == null ? null : function(S) {
              var w = window.hljs.highlightAuto(S);
              return w.value;
            };
          }(),
          interval: 1e3
        }, d.CodeBlock = c, d.CodeToken = n, d.default = v;
      },
      function(m, d) {
        m.exports = '<svg viewbox="0 0 18 18"> <line class=ql-stroke x1=3 x2=15 y1=9 y2=9></line> <line class=ql-stroke x1=3 x2=13 y1=14 y2=14></line> <line class=ql-stroke x1=3 x2=9 y1=4 y2=4></line> </svg>';
      },
      function(m, d) {
        m.exports = '<svg viewbox="0 0 18 18"> <line class=ql-stroke x1=15 x2=3 y1=9 y2=9></line> <line class=ql-stroke x1=14 x2=4 y1=14 y2=14></line> <line class=ql-stroke x1=12 x2=6 y1=4 y2=4></line> </svg>';
      },
      function(m, d) {
        m.exports = '<svg viewbox="0 0 18 18"> <line class=ql-stroke x1=15 x2=3 y1=9 y2=9></line> <line class=ql-stroke x1=15 x2=5 y1=14 y2=14></line> <line class=ql-stroke x1=15 x2=9 y1=4 y2=4></line> </svg>';
      },
      function(m, d) {
        m.exports = '<svg viewbox="0 0 18 18"> <line class=ql-stroke x1=15 x2=3 y1=9 y2=9></line> <line class=ql-stroke x1=15 x2=3 y1=14 y2=14></line> <line class=ql-stroke x1=15 x2=3 y1=4 y2=4></line> </svg>';
      },
      function(m, d) {
        m.exports = '<svg viewbox="0 0 18 18"> <g class="ql-fill ql-color-label"> <polygon points="6 6.868 6 6 5 6 5 7 5.942 7 6 6.868"></polygon> <rect height=1 width=1 x=4 y=4></rect> <polygon points="6.817 5 6 5 6 6 6.38 6 6.817 5"></polygon> <rect height=1 width=1 x=2 y=6></rect> <rect height=1 width=1 x=3 y=5></rect> <rect height=1 width=1 x=4 y=7></rect> <polygon points="4 11.439 4 11 3 11 3 12 3.755 12 4 11.439"></polygon> <rect height=1 width=1 x=2 y=12></rect> <rect height=1 width=1 x=2 y=9></rect> <rect height=1 width=1 x=2 y=15></rect> <polygon points="4.63 10 4 10 4 11 4.192 11 4.63 10"></polygon> <rect height=1 width=1 x=3 y=8></rect> <path d=M10.832,4.2L11,4.582V4H10.708A1.948,1.948,0,0,1,10.832,4.2Z></path> <path d=M7,4.582L7.168,4.2A1.929,1.929,0,0,1,7.292,4H7V4.582Z></path> <path d=M8,13H7.683l-0.351.8a1.933,1.933,0,0,1-.124.2H8V13Z></path> <rect height=1 width=1 x=12 y=2></rect> <rect height=1 width=1 x=11 y=3></rect> <path d=M9,3H8V3.282A1.985,1.985,0,0,1,9,3Z></path> <rect height=1 width=1 x=2 y=3></rect> <rect height=1 width=1 x=6 y=2></rect> <rect height=1 width=1 x=3 y=2></rect> <rect height=1 width=1 x=5 y=3></rect> <rect height=1 width=1 x=9 y=2></rect> <rect height=1 width=1 x=15 y=14></rect> <polygon points="13.447 10.174 13.469 10.225 13.472 10.232 13.808 11 14 11 14 10 13.37 10 13.447 10.174"></polygon> <rect height=1 width=1 x=13 y=7></rect> <rect height=1 width=1 x=15 y=5></rect> <rect height=1 width=1 x=14 y=6></rect> <rect height=1 width=1 x=15 y=8></rect> <rect height=1 width=1 x=14 y=9></rect> <path d=M3.775,14H3v1H4V14.314A1.97,1.97,0,0,1,3.775,14Z></path> <rect height=1 width=1 x=14 y=3></rect> <polygon points="12 6.868 12 6 11.62 6 12 6.868"></polygon> <rect height=1 width=1 x=15 y=2></rect> <rect height=1 width=1 x=12 y=5></rect> <rect height=1 width=1 x=13 y=4></rect> <polygon points="12.933 9 13 9 13 8 12.495 8 12.933 9"></polygon> <rect height=1 width=1 x=9 y=14></rect> <rect height=1 width=1 x=8 y=15></rect> <path d=M6,14.926V15H7V14.316A1.993,1.993,0,0,1,6,14.926Z></path> <rect height=1 width=1 x=5 y=15></rect> <path d=M10.668,13.8L10.317,13H10v1h0.792A1.947,1.947,0,0,1,10.668,13.8Z></path> <rect height=1 width=1 x=11 y=15></rect> <path d=M14.332,12.2a1.99,1.99,0,0,1,.166.8H15V12H14.245Z></path> <rect height=1 width=1 x=14 y=15></rect> <rect height=1 width=1 x=15 y=11></rect> </g> <polyline class=ql-stroke points="5.5 13 9 5 12.5 13"></polyline> <line class=ql-stroke x1=11.63 x2=6.38 y1=11 y2=11></line> </svg>';
      },
      function(m, d) {
        m.exports = '<svg viewbox="0 0 18 18"> <rect class="ql-fill ql-stroke" height=3 width=3 x=4 y=5></rect> <rect class="ql-fill ql-stroke" height=3 width=3 x=11 y=5></rect> <path class="ql-even ql-fill ql-stroke" d=M7,8c0,4.031-3,5-3,5></path> <path class="ql-even ql-fill ql-stroke" d=M14,8c0,4.031-3,5-3,5></path> </svg>';
      },
      function(m, d) {
        m.exports = '<svg viewbox="0 0 18 18"> <path class=ql-stroke d=M5,4H9.5A2.5,2.5,0,0,1,12,6.5v0A2.5,2.5,0,0,1,9.5,9H5A0,0,0,0,1,5,9V4A0,0,0,0,1,5,4Z></path> <path class=ql-stroke d=M5,9h5.5A2.5,2.5,0,0,1,13,11.5v0A2.5,2.5,0,0,1,10.5,14H5a0,0,0,0,1,0,0V9A0,0,0,0,1,5,9Z></path> </svg>';
      },
      function(m, d) {
        m.exports = '<svg class="" viewbox="0 0 18 18"> <line class=ql-stroke x1=5 x2=13 y1=3 y2=3></line> <line class=ql-stroke x1=6 x2=9.35 y1=12 y2=3></line> <line class=ql-stroke x1=11 x2=15 y1=11 y2=15></line> <line class=ql-stroke x1=15 x2=11 y1=11 y2=15></line> <rect class=ql-fill height=1 rx=0.5 ry=0.5 width=7 x=2 y=14></rect> </svg>';
      },
      function(m, d) {
        m.exports = '<svg viewbox="0 0 18 18"> <line class="ql-color-label ql-stroke ql-transparent" x1=3 x2=15 y1=15 y2=15></line> <polyline class=ql-stroke points="5.5 11 9 3 12.5 11"></polyline> <line class=ql-stroke x1=11.63 x2=6.38 y1=9 y2=9></line> </svg>';
      },
      function(m, d) {
        m.exports = '<svg viewbox="0 0 18 18"> <polygon class="ql-stroke ql-fill" points="3 11 5 9 3 7 3 11"></polygon> <line class="ql-stroke ql-fill" x1=15 x2=11 y1=4 y2=4></line> <path class=ql-fill d=M11,3a3,3,0,0,0,0,6h1V3H11Z></path> <rect class=ql-fill height=11 width=1 x=11 y=4></rect> <rect class=ql-fill height=11 width=1 x=13 y=4></rect> </svg>';
      },
      function(m, d) {
        m.exports = '<svg viewbox="0 0 18 18"> <polygon class="ql-stroke ql-fill" points="15 12 13 10 15 8 15 12"></polygon> <line class="ql-stroke ql-fill" x1=9 x2=5 y1=4 y2=4></line> <path class=ql-fill d=M5,3A3,3,0,0,0,5,9H6V3H5Z></path> <rect class=ql-fill height=11 width=1 x=5 y=4></rect> <rect class=ql-fill height=11 width=1 x=7 y=4></rect> </svg>';
      },
      function(m, d) {
        m.exports = '<svg viewbox="0 0 18 18"> <path class=ql-fill d=M14,16H4a1,1,0,0,1,0-2H14A1,1,0,0,1,14,16Z /> <path class=ql-fill d=M14,4H4A1,1,0,0,1,4,2H14A1,1,0,0,1,14,4Z /> <rect class=ql-fill x=3 y=6 width=12 height=6 rx=1 ry=1 /> </svg>';
      },
      function(m, d) {
        m.exports = '<svg viewbox="0 0 18 18"> <path class=ql-fill d=M13,16H5a1,1,0,0,1,0-2h8A1,1,0,0,1,13,16Z /> <path class=ql-fill d=M13,4H5A1,1,0,0,1,5,2h8A1,1,0,0,1,13,4Z /> <rect class=ql-fill x=2 y=6 width=14 height=6 rx=1 ry=1 /> </svg>';
      },
      function(m, d) {
        m.exports = '<svg viewbox="0 0 18 18"> <path class=ql-fill d=M15,8H13a1,1,0,0,1,0-2h2A1,1,0,0,1,15,8Z /> <path class=ql-fill d=M15,12H13a1,1,0,0,1,0-2h2A1,1,0,0,1,15,12Z /> <path class=ql-fill d=M15,16H5a1,1,0,0,1,0-2H15A1,1,0,0,1,15,16Z /> <path class=ql-fill d=M15,4H5A1,1,0,0,1,5,2H15A1,1,0,0,1,15,4Z /> <rect class=ql-fill x=2 y=6 width=8 height=6 rx=1 ry=1 /> </svg>';
      },
      function(m, d) {
        m.exports = '<svg viewbox="0 0 18 18"> <path class=ql-fill d=M5,8H3A1,1,0,0,1,3,6H5A1,1,0,0,1,5,8Z /> <path class=ql-fill d=M5,12H3a1,1,0,0,1,0-2H5A1,1,0,0,1,5,12Z /> <path class=ql-fill d=M13,16H3a1,1,0,0,1,0-2H13A1,1,0,0,1,13,16Z /> <path class=ql-fill d=M13,4H3A1,1,0,0,1,3,2H13A1,1,0,0,1,13,4Z /> <rect class=ql-fill x=8 y=6 width=8 height=6 rx=1 ry=1 transform="translate(24 18) rotate(-180)"/> </svg>';
      },
      function(m, d) {
        m.exports = '<svg viewbox="0 0 18 18"> <path class=ql-fill d=M11.759,2.482a2.561,2.561,0,0,0-3.53.607A7.656,7.656,0,0,0,6.8,6.2C6.109,9.188,5.275,14.677,4.15,14.927a1.545,1.545,0,0,0-1.3-.933A0.922,0.922,0,0,0,2,15.036S1.954,16,4.119,16s3.091-2.691,3.7-5.553c0.177-.826.36-1.726,0.554-2.6L8.775,6.2c0.381-1.421.807-2.521,1.306-2.676a1.014,1.014,0,0,0,1.02.56A0.966,0.966,0,0,0,11.759,2.482Z></path> <rect class=ql-fill height=1.6 rx=0.8 ry=0.8 width=5 x=5.15 y=6.2></rect> <path class=ql-fill d=M13.663,12.027a1.662,1.662,0,0,1,.266-0.276q0.193,0.069.456,0.138a2.1,2.1,0,0,0,.535.069,1.075,1.075,0,0,0,.767-0.3,1.044,1.044,0,0,0,.314-0.8,0.84,0.84,0,0,0-.238-0.619,0.8,0.8,0,0,0-.594-0.239,1.154,1.154,0,0,0-.781.3,4.607,4.607,0,0,0-.781,1q-0.091.15-.218,0.346l-0.246.38c-0.068-.288-0.137-0.582-0.212-0.885-0.459-1.847-2.494-.984-2.941-0.8-0.482.2-.353,0.647-0.094,0.529a0.869,0.869,0,0,1,1.281.585c0.217,0.751.377,1.436,0.527,2.038a5.688,5.688,0,0,1-.362.467,2.69,2.69,0,0,1-.264.271q-0.221-.08-0.471-0.147a2.029,2.029,0,0,0-.522-0.066,1.079,1.079,0,0,0-.768.3A1.058,1.058,0,0,0,9,15.131a0.82,0.82,0,0,0,.832.852,1.134,1.134,0,0,0,.787-0.3,5.11,5.11,0,0,0,.776-0.993q0.141-.219.215-0.34c0.046-.076.122-0.194,0.223-0.346a2.786,2.786,0,0,0,.918,1.726,2.582,2.582,0,0,0,2.376-.185c0.317-.181.212-0.565,0-0.494A0.807,0.807,0,0,1,14.176,15a5.159,5.159,0,0,1-.913-2.446l0,0Q13.487,12.24,13.663,12.027Z></path> </svg>';
      },
      function(m, d) {
        m.exports = '<svg viewBox="0 0 18 18"> <path class=ql-fill d=M10,4V14a1,1,0,0,1-2,0V10H3v4a1,1,0,0,1-2,0V4A1,1,0,0,1,3,4V8H8V4a1,1,0,0,1,2,0Zm6.06787,9.209H14.98975V7.59863a.54085.54085,0,0,0-.605-.60547h-.62744a1.01119,1.01119,0,0,0-.748.29688L11.645,8.56641a.5435.5435,0,0,0-.022.8584l.28613.30762a.53861.53861,0,0,0,.84717.0332l.09912-.08789a1.2137,1.2137,0,0,0,.2417-.35254h.02246s-.01123.30859-.01123.60547V13.209H12.041a.54085.54085,0,0,0-.605.60547v.43945a.54085.54085,0,0,0,.605.60547h4.02686a.54085.54085,0,0,0,.605-.60547v-.43945A.54085.54085,0,0,0,16.06787,13.209Z /> </svg>';
      },
      function(m, d) {
        m.exports = '<svg viewBox="0 0 18 18"> <path class=ql-fill d=M16.73975,13.81445v.43945a.54085.54085,0,0,1-.605.60547H11.855a.58392.58392,0,0,1-.64893-.60547V14.0127c0-2.90527,3.39941-3.42187,3.39941-4.55469a.77675.77675,0,0,0-.84717-.78125,1.17684,1.17684,0,0,0-.83594.38477c-.2749.26367-.561.374-.85791.13184l-.4292-.34082c-.30811-.24219-.38525-.51758-.1543-.81445a2.97155,2.97155,0,0,1,2.45361-1.17676,2.45393,2.45393,0,0,1,2.68408,2.40918c0,2.45312-3.1792,2.92676-3.27832,3.93848h2.79443A.54085.54085,0,0,1,16.73975,13.81445ZM9,3A.99974.99974,0,0,0,8,4V8H3V4A1,1,0,0,0,1,4V14a1,1,0,0,0,2,0V10H8v4a1,1,0,0,0,2,0V4A.99974.99974,0,0,0,9,3Z /> </svg>';
      },
      function(m, d) {
        m.exports = '<svg viewbox="0 0 18 18"> <line class=ql-stroke x1=7 x2=13 y1=4 y2=4></line> <line class=ql-stroke x1=5 x2=11 y1=14 y2=14></line> <line class=ql-stroke x1=8 x2=10 y1=14 y2=4></line> </svg>';
      },
      function(m, d) {
        m.exports = '<svg viewbox="0 0 18 18"> <rect class=ql-stroke height=10 width=12 x=3 y=4></rect> <circle class=ql-fill cx=6 cy=7 r=1></circle> <polyline class="ql-even ql-fill" points="5 12 5 11 7 9 8 10 11 7 13 9 13 12 5 12"></polyline> </svg>';
      },
      function(m, d) {
        m.exports = '<svg viewbox="0 0 18 18"> <line class=ql-stroke x1=3 x2=15 y1=14 y2=14></line> <line class=ql-stroke x1=3 x2=15 y1=4 y2=4></line> <line class=ql-stroke x1=9 x2=15 y1=9 y2=9></line> <polyline class="ql-fill ql-stroke" points="3 7 3 11 5 9 3 7"></polyline> </svg>';
      },
      function(m, d) {
        m.exports = '<svg viewbox="0 0 18 18"> <line class=ql-stroke x1=3 x2=15 y1=14 y2=14></line> <line class=ql-stroke x1=3 x2=15 y1=4 y2=4></line> <line class=ql-stroke x1=9 x2=15 y1=9 y2=9></line> <polyline class=ql-stroke points="5 7 5 11 3 9 5 7"></polyline> </svg>';
      },
      function(m, d) {
        m.exports = '<svg viewbox="0 0 18 18"> <line class=ql-stroke x1=7 x2=11 y1=7 y2=11></line> <path class="ql-even ql-stroke" d=M8.9,4.577a3.476,3.476,0,0,1,.36,4.679A3.476,3.476,0,0,1,4.577,8.9C3.185,7.5,2.035,6.4,4.217,4.217S7.5,3.185,8.9,4.577Z></path> <path class="ql-even ql-stroke" d=M13.423,9.1a3.476,3.476,0,0,0-4.679-.36,3.476,3.476,0,0,0,.36,4.679c1.392,1.392,2.5,2.542,4.679.36S14.815,10.5,13.423,9.1Z></path> </svg>';
      },
      function(m, d) {
        m.exports = '<svg viewbox="0 0 18 18"> <line class=ql-stroke x1=7 x2=15 y1=4 y2=4></line> <line class=ql-stroke x1=7 x2=15 y1=9 y2=9></line> <line class=ql-stroke x1=7 x2=15 y1=14 y2=14></line> <line class="ql-stroke ql-thin" x1=2.5 x2=4.5 y1=5.5 y2=5.5></line> <path class=ql-fill d=M3.5,6A0.5,0.5,0,0,1,3,5.5V3.085l-0.276.138A0.5,0.5,0,0,1,2.053,3c-0.124-.247-0.023-0.324.224-0.447l1-.5A0.5,0.5,0,0,1,4,2.5v3A0.5,0.5,0,0,1,3.5,6Z></path> <path class="ql-stroke ql-thin" d=M4.5,10.5h-2c0-.234,1.85-1.076,1.85-2.234A0.959,0.959,0,0,0,2.5,8.156></path> <path class="ql-stroke ql-thin" d=M2.5,14.846a0.959,0.959,0,0,0,1.85-.109A0.7,0.7,0,0,0,3.75,14a0.688,0.688,0,0,0,.6-0.736,0.959,0.959,0,0,0-1.85-.109></path> </svg>';
      },
      function(m, d) {
        m.exports = '<svg viewbox="0 0 18 18"> <line class=ql-stroke x1=6 x2=15 y1=4 y2=4></line> <line class=ql-stroke x1=6 x2=15 y1=9 y2=9></line> <line class=ql-stroke x1=6 x2=15 y1=14 y2=14></line> <line class=ql-stroke x1=3 x2=3 y1=4 y2=4></line> <line class=ql-stroke x1=3 x2=3 y1=9 y2=9></line> <line class=ql-stroke x1=3 x2=3 y1=14 y2=14></line> </svg>';
      },
      function(m, d) {
        m.exports = '<svg class="" viewbox="0 0 18 18"> <line class=ql-stroke x1=9 x2=15 y1=4 y2=4></line> <polyline class=ql-stroke points="3 4 4 5 6 3"></polyline> <line class=ql-stroke x1=9 x2=15 y1=14 y2=14></line> <polyline class=ql-stroke points="3 14 4 15 6 13"></polyline> <line class=ql-stroke x1=9 x2=15 y1=9 y2=9></line> <polyline class=ql-stroke points="3 9 4 10 6 8"></polyline> </svg>';
      },
      function(m, d) {
        m.exports = '<svg viewbox="0 0 18 18"> <path class=ql-fill d=M15.5,15H13.861a3.858,3.858,0,0,0,1.914-2.975,1.8,1.8,0,0,0-1.6-1.751A1.921,1.921,0,0,0,12.021,11.7a0.50013,0.50013,0,1,0,.957.291h0a0.914,0.914,0,0,1,1.053-.725,0.81,0.81,0,0,1,.744.762c0,1.076-1.16971,1.86982-1.93971,2.43082A1.45639,1.45639,0,0,0,12,15.5a0.5,0.5,0,0,0,.5.5h3A0.5,0.5,0,0,0,15.5,15Z /> <path class=ql-fill d=M9.65,5.241a1,1,0,0,0-1.409.108L6,7.964,3.759,5.349A1,1,0,0,0,2.192,6.59178Q2.21541,6.6213,2.241,6.649L4.684,9.5,2.241,12.35A1,1,0,0,0,3.71,13.70722q0.02557-.02768.049-0.05722L6,11.036,8.241,13.65a1,1,0,1,0,1.567-1.24277Q9.78459,12.3777,9.759,12.35L7.316,9.5,9.759,6.651A1,1,0,0,0,9.65,5.241Z /> </svg>';
      },
      function(m, d) {
        m.exports = '<svg viewbox="0 0 18 18"> <path class=ql-fill d=M15.5,7H13.861a4.015,4.015,0,0,0,1.914-2.975,1.8,1.8,0,0,0-1.6-1.751A1.922,1.922,0,0,0,12.021,3.7a0.5,0.5,0,1,0,.957.291,0.917,0.917,0,0,1,1.053-.725,0.81,0.81,0,0,1,.744.762c0,1.077-1.164,1.925-1.934,2.486A1.423,1.423,0,0,0,12,7.5a0.5,0.5,0,0,0,.5.5h3A0.5,0.5,0,0,0,15.5,7Z /> <path class=ql-fill d=M9.651,5.241a1,1,0,0,0-1.41.108L6,7.964,3.759,5.349a1,1,0,1,0-1.519,1.3L4.683,9.5,2.241,12.35a1,1,0,1,0,1.519,1.3L6,11.036,8.241,13.65a1,1,0,0,0,1.519-1.3L7.317,9.5,9.759,6.651A1,1,0,0,0,9.651,5.241Z /> </svg>';
      },
      function(m, d) {
        m.exports = '<svg viewbox="0 0 18 18"> <line class="ql-stroke ql-thin" x1=15.5 x2=2.5 y1=8.5 y2=9.5></line> <path class=ql-fill d=M9.007,8C6.542,7.791,6,7.519,6,6.5,6,5.792,7.283,5,9,5c1.571,0,2.765.679,2.969,1.309a1,1,0,0,0,1.9-.617C13.356,4.106,11.354,3,9,3,6.2,3,4,4.538,4,6.5a3.2,3.2,0,0,0,.5,1.843Z></path> <path class=ql-fill d=M8.984,10C11.457,10.208,12,10.479,12,11.5c0,0.708-1.283,1.5-3,1.5-1.571,0-2.765-.679-2.969-1.309a1,1,0,1,0-1.9.617C4.644,13.894,6.646,15,9,15c2.8,0,5-1.538,5-3.5a3.2,3.2,0,0,0-.5-1.843Z></path> </svg>';
      },
      function(m, d) {
        m.exports = '<svg viewbox="0 0 18 18"> <path class=ql-stroke d=M5,3V9a4.012,4.012,0,0,0,4,4H9a4.012,4.012,0,0,0,4-4V3></path> <rect class=ql-fill height=1 rx=0.5 ry=0.5 width=12 x=3 y=15></rect> </svg>';
      },
      function(m, d) {
        m.exports = '<svg viewbox="0 0 18 18"> <rect class=ql-stroke height=12 width=12 x=3 y=3></rect> <rect class=ql-fill height=12 width=1 x=5 y=3></rect> <rect class=ql-fill height=12 width=1 x=12 y=3></rect> <rect class=ql-fill height=2 width=8 x=5 y=8></rect> <rect class=ql-fill height=1 width=3 x=3 y=5></rect> <rect class=ql-fill height=1 width=3 x=3 y=7></rect> <rect class=ql-fill height=1 width=3 x=3 y=10></rect> <rect class=ql-fill height=1 width=3 x=3 y=12></rect> <rect class=ql-fill height=1 width=3 x=12 y=5></rect> <rect class=ql-fill height=1 width=3 x=12 y=7></rect> <rect class=ql-fill height=1 width=3 x=12 y=10></rect> <rect class=ql-fill height=1 width=3 x=12 y=12></rect> </svg>';
      },
      function(m, d) {
        m.exports = '<svg viewbox="0 0 18 18"> <polygon class=ql-stroke points="7 11 9 13 11 11 7 11"></polygon> <polygon class=ql-stroke points="7 7 9 5 11 7 7 7"></polygon> </svg>';
      },
      function(m, d, f) {
        Object.defineProperty(d, "__esModule", {
          value: !0
        }), d.default = d.BubbleTooltip = void 0;
        var E = function w(T, P, A) {
          T === null && (T = Function.prototype);
          var p = Object.getOwnPropertyDescriptor(T, P);
          if (p === void 0) {
            var O = Object.getPrototypeOf(T);
            return O === null ? void 0 : w(O, P, A);
          } else {
            if ("value" in p)
              return p.value;
            var k = p.get;
            return k === void 0 ? void 0 : k.call(A);
          }
        }, b = function() {
          function w(T, P) {
            for (var A = 0; A < P.length; A++) {
              var p = P[A];
              p.enumerable = p.enumerable || !1, p.configurable = !0, "value" in p && (p.writable = !0), Object.defineProperty(T, p.key, p);
            }
          }
          return function(T, P, A) {
            return P && w(T.prototype, P), A && w(T, A), T;
          };
        }(), _ = f(3), g = u(_), y = f(8), h = u(y), o = f(43), t = u(o), e = f(15), s = f(41), l = u(s);
        function u(w) {
          return w && w.__esModule ? w : { default: w };
        }
        function r(w, T) {
          if (!(w instanceof T))
            throw new TypeError("Cannot call a class as a function");
        }
        function i(w, T) {
          if (!w)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return T && (typeof T == "object" || typeof T == "function") ? T : w;
        }
        function c(w, T) {
          if (typeof T != "function" && T !== null)
            throw new TypeError("Super expression must either be null or a function, not " + typeof T);
          w.prototype = Object.create(T && T.prototype, { constructor: { value: w, enumerable: !1, writable: !0, configurable: !0 } }), T && (Object.setPrototypeOf ? Object.setPrototypeOf(w, T) : w.__proto__ = T);
        }
        var n = [["bold", "italic", "link"], [{ header: 1 }, { header: 2 }, "blockquote"]], v = function(w) {
          c(T, w);
          function T(P, A) {
            r(this, T), A.modules.toolbar != null && A.modules.toolbar.container == null && (A.modules.toolbar.container = n);
            var p = i(this, (T.__proto__ || Object.getPrototypeOf(T)).call(this, P, A));
            return p.quill.container.classList.add("ql-bubble"), p;
          }
          return b(T, [{
            key: "extendToolbar",
            value: function(A) {
              this.tooltip = new S(this.quill, this.options.bounds), this.tooltip.root.appendChild(A.container), this.buildButtons([].slice.call(A.container.querySelectorAll("button")), l.default), this.buildPickers([].slice.call(A.container.querySelectorAll("select")), l.default);
            }
          }]), T;
        }(t.default);
        v.DEFAULTS = (0, g.default)(!0, {}, t.default.DEFAULTS, {
          modules: {
            toolbar: {
              handlers: {
                link: function(T) {
                  T ? this.quill.theme.tooltip.edit() : this.quill.format("link", !1);
                }
              }
            }
          }
        });
        var S = function(w) {
          c(T, w);
          function T(P, A) {
            r(this, T);
            var p = i(this, (T.__proto__ || Object.getPrototypeOf(T)).call(this, P, A));
            return p.quill.on(h.default.events.EDITOR_CHANGE, function(O, k, L, D) {
              if (O === h.default.events.SELECTION_CHANGE)
                if (k != null && k.length > 0 && D === h.default.sources.USER) {
                  p.show(), p.root.style.left = "0px", p.root.style.width = "", p.root.style.width = p.root.offsetWidth + "px";
                  var z = p.quill.getLines(k.index, k.length);
                  if (z.length === 1)
                    p.position(p.quill.getBounds(k));
                  else {
                    var $ = z[z.length - 1], J = p.quill.getIndex($), H = Math.min($.length() - 1, k.index + k.length - J), j = p.quill.getBounds(new e.Range(J, H));
                    p.position(j);
                  }
                } else
                  document.activeElement !== p.textbox && p.quill.hasFocus() && p.hide();
            }), p;
          }
          return b(T, [{
            key: "listen",
            value: function() {
              var A = this;
              E(T.prototype.__proto__ || Object.getPrototypeOf(T.prototype), "listen", this).call(this), this.root.querySelector(".ql-close").addEventListener("click", function() {
                A.root.classList.remove("ql-editing");
              }), this.quill.on(h.default.events.SCROLL_OPTIMIZE, function() {
                setTimeout(function() {
                  if (!A.root.classList.contains("ql-hidden")) {
                    var p = A.quill.getSelection();
                    p != null && A.position(A.quill.getBounds(p));
                  }
                }, 1);
              });
            }
          }, {
            key: "cancel",
            value: function() {
              this.show();
            }
          }, {
            key: "position",
            value: function(A) {
              var p = E(T.prototype.__proto__ || Object.getPrototypeOf(T.prototype), "position", this).call(this, A), O = this.root.querySelector(".ql-tooltip-arrow");
              if (O.style.marginLeft = "", p === 0)
                return p;
              O.style.marginLeft = -1 * p - O.offsetWidth / 2 + "px";
            }
          }]), T;
        }(o.BaseTooltip);
        S.TEMPLATE = ['<span class="ql-tooltip-arrow"></span>', '<div class="ql-tooltip-editor">', '<input type="text" data-formula="e=mc^2" data-link="https://quilljs.com" data-video="Embed URL">', '<a class="ql-close"></a>', "</div>"].join(""), d.BubbleTooltip = S, d.default = v;
      },
      function(m, d, f) {
        m.exports = f(63);
      }
    ]).default;
  });
})(nr);
const Cn = /* @__PURE__ */ fr(nr.exports);
var Kt = -1, Bt = 1, jt = 0;
function xe(R, U, m, d) {
  if (R === U)
    return R ? [[jt, R]] : [];
  if (m != null) {
    var f = Nr(R, U, m);
    if (f)
      return f;
  }
  var E = Kn(R, U), b = R.substring(0, E);
  R = R.substring(E), U = U.substring(E), E = $n(R, U);
  var _ = R.substring(R.length - E);
  R = R.substring(0, R.length - E), U = U.substring(0, U.length - E);
  var g = wr(R, U);
  return b && g.unshift([jt, b]), _ && g.push([jt, _]), rr(g, d), g;
}
function wr(R, U) {
  var m;
  if (!R)
    return [[Bt, U]];
  if (!U)
    return [[Kt, R]];
  var d = R.length > U.length ? R : U, f = R.length > U.length ? U : R, E = d.indexOf(f);
  if (E !== -1)
    return m = [
      [Bt, d.substring(0, E)],
      [jt, f],
      [Bt, d.substring(E + f.length)]
    ], R.length > U.length && (m[0][0] = m[2][0] = Kt), m;
  if (f.length === 1)
    return [[Kt, R], [Bt, U]];
  var b = Sr(R, U);
  if (b) {
    var _ = b[0], g = b[1], y = b[2], h = b[3], o = b[4], t = xe(_, y), e = xe(g, h);
    return t.concat([[jt, o]], e);
  }
  return Tr(R, U);
}
function Tr(R, U) {
  for (var m = R.length, d = U.length, f = Math.ceil((m + d) / 2), E = f, b = 2 * f, _ = new Array(b), g = new Array(b), y = 0; y < b; y++)
    _[y] = -1, g[y] = -1;
  _[E + 1] = 0, g[E + 1] = 0;
  for (var h = m - d, o = h % 2 !== 0, t = 0, e = 0, s = 0, l = 0, u = 0; u < f; u++) {
    for (var r = -u + t; r <= u - e; r += 2) {
      var i = E + r, c;
      r === -u || r !== u && _[i - 1] < _[i + 1] ? c = _[i + 1] : c = _[i - 1] + 1;
      for (var n = c - r; c < m && n < d && R.charAt(c) === U.charAt(n); )
        c++, n++;
      if (_[i] = c, c > m)
        e += 2;
      else if (n > d)
        t += 2;
      else if (o) {
        var v = E + h - r;
        if (v >= 0 && v < b && g[v] !== -1) {
          var S = m - g[v];
          if (c >= S)
            return Yn(R, U, c, n);
        }
      }
    }
    for (var w = -u + s; w <= u - l; w += 2) {
      var v = E + w, S;
      w === -u || w !== u && g[v - 1] < g[v + 1] ? S = g[v + 1] : S = g[v - 1] + 1;
      for (var T = S - w; S < m && T < d && R.charAt(m - S - 1) === U.charAt(d - T - 1); )
        S++, T++;
      if (g[v] = S, S > m)
        l += 2;
      else if (T > d)
        s += 2;
      else if (!o) {
        var i = E + h - w;
        if (i >= 0 && i < b && _[i] !== -1) {
          var c = _[i], n = E + c - i;
          if (S = m - S, c >= S)
            return Yn(R, U, c, n);
        }
      }
    }
  }
  return [[Kt, R], [Bt, U]];
}
function Yn(R, U, m, d) {
  var f = R.substring(0, m), E = U.substring(0, d), b = R.substring(m), _ = U.substring(d), g = xe(f, E), y = xe(b, _);
  return g.concat(y);
}
function Kn(R, U) {
  if (!R || !U || R.charAt(0) !== U.charAt(0))
    return 0;
  for (var m = 0, d = Math.min(R.length, U.length), f = d, E = 0; m < f; )
    R.substring(E, f) == U.substring(E, f) ? (m = f, E = m) : d = f, f = Math.floor((d - m) / 2 + m);
  return ir(R.charCodeAt(f - 1)) && f--, f;
}
function $n(R, U) {
  if (!R || !U || R.slice(-1) !== U.slice(-1))
    return 0;
  for (var m = 0, d = Math.min(R.length, U.length), f = d, E = 0; m < f; )
    R.substring(R.length - f, R.length - E) == U.substring(U.length - f, U.length - E) ? (m = f, E = m) : d = f, f = Math.floor((d - m) / 2 + m);
  return or(R.charCodeAt(R.length - f)) && f--, f;
}
function Sr(R, U) {
  var m = R.length > U.length ? R : U, d = R.length > U.length ? U : R;
  if (m.length < 4 || d.length * 2 < m.length)
    return null;
  function f(e, s, l) {
    for (var u = e.substring(l, l + Math.floor(e.length / 4)), r = -1, i = "", c, n, v, S; (r = s.indexOf(u, r + 1)) !== -1; ) {
      var w = Kn(
        e.substring(l),
        s.substring(r)
      ), T = $n(
        e.substring(0, l),
        s.substring(0, r)
      );
      i.length < T + w && (i = s.substring(
        r - T,
        r
      ) + s.substring(r, r + w), c = e.substring(0, l - T), n = e.substring(l + w), v = s.substring(0, r - T), S = s.substring(r + w));
    }
    return i.length * 2 >= e.length ? [
      c,
      n,
      v,
      S,
      i
    ] : null;
  }
  var E = f(m, d, Math.ceil(m.length / 4)), b = f(m, d, Math.ceil(m.length / 2)), _;
  if (!E && !b)
    return null;
  b ? E ? _ = E[4].length > b[4].length ? E : b : _ = b : _ = E;
  var g, y, h, o;
  R.length > U.length ? (g = _[0], y = _[1], h = _[2], o = _[3]) : (h = _[0], o = _[1], g = _[2], y = _[3]);
  var t = _[4];
  return [g, y, h, o, t];
}
function rr(R, U) {
  R.push([jt, ""]);
  for (var m = 0, d = 0, f = 0, E = "", b = "", _; m < R.length; ) {
    if (m < R.length - 1 && !R[m][1]) {
      R.splice(m, 1);
      continue;
    }
    switch (R[m][0]) {
      case Bt:
        f++, b += R[m][1], m++;
        break;
      case Kt:
        d++, E += R[m][1], m++;
        break;
      case jt:
        var g = m - f - d - 1;
        if (U) {
          if (g >= 0 && lr(R[g][1])) {
            var y = R[g][1].slice(-1);
            if (R[g][1] = R[g][1].slice(0, -1), E = y + E, b = y + b, !R[g][1]) {
              R.splice(g, 1), m--;
              var h = g - 1;
              R[h] && R[h][0] === Bt && (f++, b = R[h][1] + b, h--), R[h] && R[h][0] === Kt && (d++, E = R[h][1] + E, h--), g = h;
            }
          }
          if (ar(R[m][1])) {
            var y = R[m][1].charAt(0);
            R[m][1] = R[m][1].slice(1), E += y, b += y;
          }
        }
        if (m < R.length - 1 && !R[m][1]) {
          R.splice(m, 1);
          break;
        }
        if (E.length > 0 || b.length > 0) {
          E.length > 0 && b.length > 0 && (_ = Kn(b, E), _ !== 0 && (g >= 0 ? R[g][1] += b.substring(0, _) : (R.splice(0, 0, [jt, b.substring(0, _)]), m++), b = b.substring(_), E = E.substring(_)), _ = $n(b, E), _ !== 0 && (R[m][1] = b.substring(b.length - _) + R[m][1], b = b.substring(0, b.length - _), E = E.substring(0, E.length - _)));
          var o = f + d;
          E.length === 0 && b.length === 0 ? (R.splice(m - o, o), m = m - o) : E.length === 0 ? (R.splice(m - o, o, [Bt, b]), m = m - o + 1) : b.length === 0 ? (R.splice(m - o, o, [Kt, E]), m = m - o + 1) : (R.splice(m - o, o, [Kt, E], [Bt, b]), m = m - o + 2);
        }
        m !== 0 && R[m - 1][0] === jt ? (R[m - 1][1] += R[m][1], R.splice(m, 1)) : m++, f = 0, d = 0, E = "", b = "";
        break;
    }
  }
  R[R.length - 1][1] === "" && R.pop();
  var t = !1;
  for (m = 1; m < R.length - 1; )
    R[m - 1][0] === jt && R[m + 1][0] === jt && (R[m][1].substring(R[m][1].length - R[m - 1][1].length) === R[m - 1][1] ? (R[m][1] = R[m - 1][1] + R[m][1].substring(0, R[m][1].length - R[m - 1][1].length), R[m + 1][1] = R[m - 1][1] + R[m + 1][1], R.splice(m - 1, 1), t = !0) : R[m][1].substring(0, R[m + 1][1].length) == R[m + 1][1] && (R[m - 1][1] += R[m + 1][1], R[m][1] = R[m][1].substring(R[m + 1][1].length) + R[m + 1][1], R.splice(m + 1, 1), t = !0)), m++;
  t && rr(R, U);
}
function ir(R) {
  return R >= 55296 && R <= 56319;
}
function or(R) {
  return R >= 56320 && R <= 57343;
}
function ar(R) {
  return or(R.charCodeAt(0));
}
function lr(R) {
  return ir(R.charCodeAt(R.length - 1));
}
function kr(R) {
  for (var U = [], m = 0; m < R.length; m++)
    R[m][1].length > 0 && U.push(R[m]);
  return U;
}
function Fn(R, U, m, d) {
  return lr(R) || ar(d) ? null : kr([
    [jt, R],
    [Kt, U],
    [Bt, m],
    [jt, d]
  ]);
}
function Nr(R, U, m) {
  var d = typeof m == "number" ? { index: m, length: 0 } : m.oldRange, f = typeof m == "number" ? null : m.newRange, E = R.length, b = U.length;
  if (d.length === 0 && (f === null || f.length === 0)) {
    var _ = d.index, g = R.slice(0, _), y = R.slice(_), h = f ? f.index : null;
    t: {
      var o = _ + b - E;
      if (h !== null && h !== o || o < 0 || o > b)
        break t;
      var t = U.slice(0, o), e = U.slice(o);
      if (e !== y)
        break t;
      var s = Math.min(_, o), l = g.slice(0, s), u = t.slice(0, s);
      if (l !== u)
        break t;
      var r = g.slice(s), i = t.slice(s);
      return Fn(l, r, i, y);
    }
    t: {
      if (h !== null && h !== _)
        break t;
      var c = _, t = U.slice(0, c), e = U.slice(c);
      if (t !== g)
        break t;
      var n = Math.min(E - c, b - c), v = y.slice(y.length - n), S = e.slice(e.length - n);
      if (v !== S)
        break t;
      var r = y.slice(0, y.length - n), i = e.slice(0, e.length - n);
      return Fn(g, r, i, v);
    }
  }
  if (d.length > 0 && f && f.length === 0) {
    t: {
      var l = R.slice(0, d.index), v = R.slice(d.index + d.length), s = l.length, n = v.length;
      if (b < s + n)
        break t;
      var u = U.slice(0, s), S = U.slice(b - n);
      if (l !== u || v !== S)
        break t;
      var r = R.slice(s, E - n), i = U.slice(s, b - n);
      return Fn(l, r, i, v);
    }
  }
  return null;
}
function Qe(R, U, m) {
  return xe(R, U, m, !0);
}
Qe.INSERT = Bt;
Qe.DELETE = Kt;
Qe.EQUAL = jt;
var xr = Qe, We = { exports: {} };
(function(R, U) {
  var m = 200, d = "__lodash_hash_undefined__", f = 9007199254740991, E = "[object Arguments]", b = "[object Array]", _ = "[object Boolean]", g = "[object Date]", y = "[object Error]", h = "[object Function]", o = "[object GeneratorFunction]", t = "[object Map]", e = "[object Number]", s = "[object Object]", l = "[object Promise]", u = "[object RegExp]", r = "[object Set]", i = "[object String]", c = "[object Symbol]", n = "[object WeakMap]", v = "[object ArrayBuffer]", S = "[object DataView]", w = "[object Float32Array]", T = "[object Float64Array]", P = "[object Int8Array]", A = "[object Int16Array]", p = "[object Int32Array]", O = "[object Uint8Array]", k = "[object Uint8ClampedArray]", L = "[object Uint16Array]", D = "[object Uint32Array]", z = /[\\^$.*+?()[\]{}|]/g, $ = /\w*$/, J = /^\[object .+?Constructor\]$/, H = /^(?:0|[1-9]\d*)$/, j = {};
  j[E] = j[b] = j[v] = j[S] = j[_] = j[g] = j[w] = j[T] = j[P] = j[A] = j[p] = j[t] = j[e] = j[s] = j[u] = j[r] = j[i] = j[c] = j[O] = j[k] = j[L] = j[D] = !0, j[y] = j[h] = j[n] = !1;
  var N = typeof Tt == "object" && Tt && Tt.Object === Object && Tt, I = typeof self == "object" && self && self.Object === Object && self, M = N || I || Function("return this")(), K = U && !U.nodeType && U, C = K && !0 && R && !R.nodeType && R, q = C && C.exports === K;
  function F(a, x) {
    return a.set(x[0], x[1]), a;
  }
  function G(a, x) {
    return a.add(x), a;
  }
  function V(a, x) {
    for (var B = -1, Z = a ? a.length : 0; ++B < Z && x(a[B], B, a) !== !1; )
      ;
    return a;
  }
  function Q(a, x) {
    for (var B = -1, Z = x.length, ut = a.length; ++B < Z; )
      a[ut + B] = x[B];
    return a;
  }
  function nt(a, x, B, Z) {
    var ut = -1, rt = a ? a.length : 0;
    for (Z && rt && (B = a[++ut]); ++ut < rt; )
      B = x(B, a[ut], ut, a);
    return B;
  }
  function it(a, x) {
    for (var B = -1, Z = Array(a); ++B < a; )
      Z[B] = x(B);
    return Z;
  }
  function at(a, x) {
    return a == null ? void 0 : a[x];
  }
  function ft(a) {
    var x = !1;
    if (a != null && typeof a.toString != "function")
      try {
        x = !!(a + "");
      } catch {
      }
    return x;
  }
  function ht(a) {
    var x = -1, B = Array(a.size);
    return a.forEach(function(Z, ut) {
      B[++x] = [ut, Z];
    }), B;
  }
  function mt(a, x) {
    return function(B) {
      return a(x(B));
    };
  }
  function gt(a) {
    var x = -1, B = Array(a.size);
    return a.forEach(function(Z) {
      B[++x] = Z;
    }), B;
  }
  var W = Array.prototype, Y = Function.prototype, tt = Object.prototype, et = M["__core-js_shared__"], X = function() {
    var a = /[^.]+$/.exec(et && et.keys && et.keys.IE_PROTO || "");
    return a ? "Symbol(src)_1." + a : "";
  }(), st = Y.toString, ot = tt.hasOwnProperty, lt = tt.toString, St = RegExp(
    "^" + st.call(ot).replace(z, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  ), Ot = q ? M.Buffer : void 0, pt = M.Symbol, Jt = M.Uint8Array, dt = mt(Object.getPrototypeOf, Object), It = Object.create, Le = tt.propertyIsEnumerable, Xe = W.splice, ve = Object.getOwnPropertySymbols, ae = Ot ? Ot.isBuffer : void 0, qe = mt(Object.keys, Object), le = Dt(M, "DataView"), te = Dt(M, "Map"), Mt = Dt(M, "Promise"), ue = Dt(M, "Set"), pe = Dt(M, "WeakMap"), ee = Dt(Object, "create"), ye = Pt(le), ne = Pt(te), ge = Pt(Mt), me = Pt(ue), be = Pt(pe), Wt = pt ? pt.prototype : void 0, Re = Wt ? Wt.valueOf : void 0;
  function $t(a) {
    var x = -1, B = a ? a.length : 0;
    for (this.clear(); ++x < B; ) {
      var Z = a[x];
      this.set(Z[0], Z[1]);
    }
  }
  function Je() {
    this.__data__ = ee ? ee(null) : {};
  }
  function tn(a) {
    return this.has(a) && delete this.__data__[a];
  }
  function en(a) {
    var x = this.__data__;
    if (ee) {
      var B = x[a];
      return B === d ? void 0 : B;
    }
    return ot.call(x, a) ? x[a] : void 0;
  }
  function je(a) {
    var x = this.__data__;
    return ee ? x[a] !== void 0 : ot.call(x, a);
  }
  function _e(a, x) {
    var B = this.__data__;
    return B[a] = ee && x === void 0 ? d : x, this;
  }
  $t.prototype.clear = Je, $t.prototype.delete = tn, $t.prototype.get = en, $t.prototype.has = je, $t.prototype.set = _e;
  function Et(a) {
    var x = -1, B = a ? a.length : 0;
    for (this.clear(); ++x < B; ) {
      var Z = a[x];
      this.set(Z[0], Z[1]);
    }
  }
  function nn() {
    this.__data__ = [];
  }
  function rn(a) {
    var x = this.__data__, B = fe(x, a);
    if (B < 0)
      return !1;
    var Z = x.length - 1;
    return B == Z ? x.pop() : Xe.call(x, B, 1), !0;
  }
  function on(a) {
    var x = this.__data__, B = fe(x, a);
    return B < 0 ? void 0 : x[B][1];
  }
  function an(a) {
    return fe(this.__data__, a) > -1;
  }
  function ln(a, x) {
    var B = this.__data__, Z = fe(B, a);
    return Z < 0 ? B.push([a, x]) : B[Z][1] = x, this;
  }
  Et.prototype.clear = nn, Et.prototype.delete = rn, Et.prototype.get = on, Et.prototype.has = an, Et.prototype.set = ln;
  function kt(a) {
    var x = -1, B = a ? a.length : 0;
    for (this.clear(); ++x < B; ) {
      var Z = a[x];
      this.set(Z[0], Z[1]);
    }
  }
  function un() {
    this.__data__ = {
      hash: new $t(),
      map: new (te || Et)(),
      string: new $t()
    };
  }
  function sn(a) {
    return ie(this, a).delete(a);
  }
  function fn(a) {
    return ie(this, a).get(a);
  }
  function cn(a) {
    return ie(this, a).has(a);
  }
  function hn(a, x) {
    return ie(this, a).set(a, x), this;
  }
  kt.prototype.clear = un, kt.prototype.delete = sn, kt.prototype.get = fn, kt.prototype.has = cn, kt.prototype.set = hn;
  function Lt(a) {
    this.__data__ = new Et(a);
  }
  function dn() {
    this.__data__ = new Et();
  }
  function vn(a) {
    return this.__data__.delete(a);
  }
  function pn(a) {
    return this.__data__.get(a);
  }
  function yn(a) {
    return this.__data__.has(a);
  }
  function gn(a, x) {
    var B = this.__data__;
    if (B instanceof Et) {
      var Z = B.__data__;
      if (!te || Z.length < m - 1)
        return Z.push([a, x]), this;
      B = this.__data__ = new kt(Z);
    }
    return B.set(a, x), this;
  }
  Lt.prototype.clear = dn, Lt.prototype.delete = vn, Lt.prototype.get = pn, Lt.prototype.has = yn, Lt.prototype.set = gn;
  function se(a, x) {
    var B = we(a) || he(a) ? it(a.length, String) : [], Z = B.length, ut = !!Z;
    for (var rt in a)
      (x || ot.call(a, rt)) && !(ut && (rt == "length" || Ln(rt, Z))) && B.push(rt);
    return B;
  }
  function Ie(a, x, B) {
    var Z = a[x];
    (!(ot.call(a, x) && Fe(Z, B)) || B === void 0 && !(x in a)) && (a[x] = B);
  }
  function fe(a, x) {
    for (var B = a.length; B--; )
      if (Fe(a[B][0], x))
        return B;
    return -1;
  }
  function Ct(a, x) {
    return a && Ae(x, Se(x), a);
  }
  function Oe(a, x, B, Z, ut, rt, ct) {
    var vt;
    if (Z && (vt = rt ? Z(a, ut, rt, ct) : Z(a)), vt !== void 0)
      return vt;
    if (!Ut(a))
      return a;
    var bt = we(a);
    if (bt) {
      if (vt = xn(a), !x)
        return Sn(a, vt);
    } else {
      var yt = Vt(a), Nt = yt == h || yt == o;
      if (Ue(a))
        return ce(a, x);
      if (yt == s || yt == E || Nt && !rt) {
        if (ft(a))
          return rt ? a : {};
        if (vt = Ft(Nt ? {} : a), !x)
          return kn(a, Ct(vt, a));
      } else {
        if (!j[yt])
          return rt ? a : {};
        vt = Pn(a, yt, Oe, x);
      }
    }
    ct || (ct = new Lt());
    var qt = ct.get(a);
    if (qt)
      return qt;
    if (ct.set(a, vt), !bt)
      var _t = B ? Nn(a) : Se(a);
    return V(_t || a, function(xt, At) {
      _t && (At = xt, xt = a[At]), Ie(vt, At, Oe(xt, x, B, Z, At, a, ct));
    }), vt;
  }
  function mn(a) {
    return Ut(a) ? It(a) : {};
  }
  function bn(a, x, B) {
    var Z = x(a);
    return we(a) ? Z : Q(Z, B(a));
  }
  function _n(a) {
    return lt.call(a);
  }
  function On(a) {
    if (!Ut(a) || Rn(a))
      return !1;
    var x = Te(a) || ft(a) ? St : J;
    return x.test(Pt(a));
  }
  function En(a) {
    if (!Be(a))
      return qe(a);
    var x = [];
    for (var B in Object(a))
      ot.call(a, B) && B != "constructor" && x.push(B);
    return x;
  }
  function ce(a, x) {
    if (x)
      return a.slice();
    var B = new a.constructor(a.length);
    return a.copy(B), B;
  }
  function Ee(a) {
    var x = new a.constructor(a.byteLength);
    return new Jt(x).set(new Jt(a)), x;
  }
  function re(a, x) {
    var B = x ? Ee(a.buffer) : a.buffer;
    return new a.constructor(B, a.byteOffset, a.byteLength);
  }
  function Me(a, x, B) {
    var Z = x ? B(ht(a), !0) : ht(a);
    return nt(Z, F, new a.constructor());
  }
  function De(a) {
    var x = new a.constructor(a.source, $.exec(a));
    return x.lastIndex = a.lastIndex, x;
  }
  function An(a, x, B) {
    var Z = x ? B(gt(a), !0) : gt(a);
    return nt(Z, G, new a.constructor());
  }
  function wn(a) {
    return Re ? Object(Re.call(a)) : {};
  }
  function Tn(a, x) {
    var B = x ? Ee(a.buffer) : a.buffer;
    return new a.constructor(B, a.byteOffset, a.length);
  }
  function Sn(a, x) {
    var B = -1, Z = a.length;
    for (x || (x = Array(Z)); ++B < Z; )
      x[B] = a[B];
    return x;
  }
  function Ae(a, x, B, Z) {
    B || (B = {});
    for (var ut = -1, rt = x.length; ++ut < rt; ) {
      var ct = x[ut], vt = Z ? Z(B[ct], a[ct], ct, B, a) : void 0;
      Ie(B, ct, vt === void 0 ? a[ct] : vt);
    }
    return B;
  }
  function kn(a, x) {
    return Ae(a, Gt(a), x);
  }
  function Nn(a) {
    return bn(a, Se, Gt);
  }
  function ie(a, x) {
    var B = a.__data__;
    return qn(x) ? B[typeof x == "string" ? "string" : "hash"] : B.map;
  }
  function Dt(a, x) {
    var B = at(a, x);
    return On(B) ? B : void 0;
  }
  var Gt = ve ? mt(ve, Object) : In, Vt = _n;
  (le && Vt(new le(new ArrayBuffer(1))) != S || te && Vt(new te()) != t || Mt && Vt(Mt.resolve()) != l || ue && Vt(new ue()) != r || pe && Vt(new pe()) != n) && (Vt = function(a) {
    var x = lt.call(a), B = x == s ? a.constructor : void 0, Z = B ? Pt(B) : void 0;
    if (Z)
      switch (Z) {
        case ye:
          return S;
        case ne:
          return t;
        case ge:
          return l;
        case me:
          return r;
        case be:
          return n;
      }
    return x;
  });
  function xn(a) {
    var x = a.length, B = a.constructor(x);
    return x && typeof a[0] == "string" && ot.call(a, "index") && (B.index = a.index, B.input = a.input), B;
  }
  function Ft(a) {
    return typeof a.constructor == "function" && !Be(a) ? mn(dt(a)) : {};
  }
  function Pn(a, x, B, Z) {
    var ut = a.constructor;
    switch (x) {
      case v:
        return Ee(a);
      case _:
      case g:
        return new ut(+a);
      case S:
        return re(a, Z);
      case w:
      case T:
      case P:
      case A:
      case p:
      case O:
      case k:
      case L:
      case D:
        return Tn(a, Z);
      case t:
        return Me(a, Z, B);
      case e:
      case i:
        return new ut(a);
      case u:
        return De(a);
      case r:
        return An(a, Z, B);
      case c:
        return wn(a);
    }
  }
  function Ln(a, x) {
    return x = x == null ? f : x, !!x && (typeof a == "number" || H.test(a)) && a > -1 && a % 1 == 0 && a < x;
  }
  function qn(a) {
    var x = typeof a;
    return x == "string" || x == "number" || x == "symbol" || x == "boolean" ? a !== "__proto__" : a === null;
  }
  function Rn(a) {
    return !!X && X in a;
  }
  function Be(a) {
    var x = a && a.constructor, B = typeof x == "function" && x.prototype || tt;
    return a === B;
  }
  function Pt(a) {
    if (a != null) {
      try {
        return st.call(a);
      } catch {
      }
      try {
        return a + "";
      } catch {
      }
    }
    return "";
  }
  function Ce(a) {
    return Oe(a, !0, !0);
  }
  function Fe(a, x) {
    return a === x || a !== a && x !== x;
  }
  function he(a) {
    return jn(a) && ot.call(a, "callee") && (!Le.call(a, "callee") || lt.call(a) == E);
  }
  var we = Array.isArray;
  function de(a) {
    return a != null && He(a.length) && !Te(a);
  }
  function jn(a) {
    return ze(a) && de(a);
  }
  var Ue = ae || Mn;
  function Te(a) {
    var x = Ut(a) ? lt.call(a) : "";
    return x == h || x == o;
  }
  function He(a) {
    return typeof a == "number" && a > -1 && a % 1 == 0 && a <= f;
  }
  function Ut(a) {
    var x = typeof a;
    return !!a && (x == "object" || x == "function");
  }
  function ze(a) {
    return !!a && typeof a == "object";
  }
  function Se(a) {
    return de(a) ? se(a) : En(a);
  }
  function In() {
    return [];
  }
  function Mn() {
    return !1;
  }
  R.exports = Ce;
})(We, We.exports);
var Ye = { exports: {} };
(function(R, U) {
  var m = 200, d = "__lodash_hash_undefined__", f = 1, E = 2, b = 9007199254740991, _ = "[object Arguments]", g = "[object Array]", y = "[object AsyncFunction]", h = "[object Boolean]", o = "[object Date]", t = "[object Error]", e = "[object Function]", s = "[object GeneratorFunction]", l = "[object Map]", u = "[object Number]", r = "[object Null]", i = "[object Object]", c = "[object Promise]", n = "[object Proxy]", v = "[object RegExp]", S = "[object Set]", w = "[object String]", T = "[object Symbol]", P = "[object Undefined]", A = "[object WeakMap]", p = "[object ArrayBuffer]", O = "[object DataView]", k = "[object Float32Array]", L = "[object Float64Array]", D = "[object Int8Array]", z = "[object Int16Array]", $ = "[object Int32Array]", J = "[object Uint8Array]", H = "[object Uint8ClampedArray]", j = "[object Uint16Array]", N = "[object Uint32Array]", I = /[\\^$.*+?()[\]{}|]/g, M = /^\[object .+?Constructor\]$/, K = /^(?:0|[1-9]\d*)$/, C = {};
  C[k] = C[L] = C[D] = C[z] = C[$] = C[J] = C[H] = C[j] = C[N] = !0, C[_] = C[g] = C[p] = C[h] = C[O] = C[o] = C[t] = C[e] = C[l] = C[u] = C[i] = C[v] = C[S] = C[w] = C[A] = !1;
  var q = typeof Tt == "object" && Tt && Tt.Object === Object && Tt, F = typeof self == "object" && self && self.Object === Object && self, G = q || F || Function("return this")(), V = U && !U.nodeType && U, Q = V && !0 && R && !R.nodeType && R, nt = Q && Q.exports === V, it = nt && q.process, at = function() {
    try {
      return it && it.binding && it.binding("util");
    } catch {
    }
  }(), ft = at && at.isTypedArray;
  function ht(a, x) {
    for (var B = -1, Z = a == null ? 0 : a.length, ut = 0, rt = []; ++B < Z; ) {
      var ct = a[B];
      x(ct, B, a) && (rt[ut++] = ct);
    }
    return rt;
  }
  function mt(a, x) {
    for (var B = -1, Z = x.length, ut = a.length; ++B < Z; )
      a[ut + B] = x[B];
    return a;
  }
  function gt(a, x) {
    for (var B = -1, Z = a == null ? 0 : a.length; ++B < Z; )
      if (x(a[B], B, a))
        return !0;
    return !1;
  }
  function W(a, x) {
    for (var B = -1, Z = Array(a); ++B < a; )
      Z[B] = x(B);
    return Z;
  }
  function Y(a) {
    return function(x) {
      return a(x);
    };
  }
  function tt(a, x) {
    return a.has(x);
  }
  function et(a, x) {
    return a == null ? void 0 : a[x];
  }
  function X(a) {
    var x = -1, B = Array(a.size);
    return a.forEach(function(Z, ut) {
      B[++x] = [ut, Z];
    }), B;
  }
  function st(a, x) {
    return function(B) {
      return a(x(B));
    };
  }
  function ot(a) {
    var x = -1, B = Array(a.size);
    return a.forEach(function(Z) {
      B[++x] = Z;
    }), B;
  }
  var lt = Array.prototype, St = Function.prototype, Ot = Object.prototype, pt = G["__core-js_shared__"], Jt = St.toString, dt = Ot.hasOwnProperty, It = function() {
    var a = /[^.]+$/.exec(pt && pt.keys && pt.keys.IE_PROTO || "");
    return a ? "Symbol(src)_1." + a : "";
  }(), Le = Ot.toString, Xe = RegExp(
    "^" + Jt.call(dt).replace(I, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  ), ve = nt ? G.Buffer : void 0, ae = G.Symbol, qe = G.Uint8Array, le = Ot.propertyIsEnumerable, te = lt.splice, Mt = ae ? ae.toStringTag : void 0, ue = Object.getOwnPropertySymbols, pe = ve ? ve.isBuffer : void 0, ee = st(Object.keys, Object), ye = Gt(G, "DataView"), ne = Gt(G, "Map"), ge = Gt(G, "Promise"), me = Gt(G, "Set"), be = Gt(G, "WeakMap"), Wt = Gt(Object, "create"), Re = Pt(ye), $t = Pt(ne), Je = Pt(ge), tn = Pt(me), en = Pt(be), je = ae ? ae.prototype : void 0, _e = je ? je.valueOf : void 0;
  function Et(a) {
    var x = -1, B = a == null ? 0 : a.length;
    for (this.clear(); ++x < B; ) {
      var Z = a[x];
      this.set(Z[0], Z[1]);
    }
  }
  function nn() {
    this.__data__ = Wt ? Wt(null) : {}, this.size = 0;
  }
  function rn(a) {
    var x = this.has(a) && delete this.__data__[a];
    return this.size -= x ? 1 : 0, x;
  }
  function on(a) {
    var x = this.__data__;
    if (Wt) {
      var B = x[a];
      return B === d ? void 0 : B;
    }
    return dt.call(x, a) ? x[a] : void 0;
  }
  function an(a) {
    var x = this.__data__;
    return Wt ? x[a] !== void 0 : dt.call(x, a);
  }
  function ln(a, x) {
    var B = this.__data__;
    return this.size += this.has(a) ? 0 : 1, B[a] = Wt && x === void 0 ? d : x, this;
  }
  Et.prototype.clear = nn, Et.prototype.delete = rn, Et.prototype.get = on, Et.prototype.has = an, Et.prototype.set = ln;
  function kt(a) {
    var x = -1, B = a == null ? 0 : a.length;
    for (this.clear(); ++x < B; ) {
      var Z = a[x];
      this.set(Z[0], Z[1]);
    }
  }
  function un() {
    this.__data__ = [], this.size = 0;
  }
  function sn(a) {
    var x = this.__data__, B = ce(x, a);
    if (B < 0)
      return !1;
    var Z = x.length - 1;
    return B == Z ? x.pop() : te.call(x, B, 1), --this.size, !0;
  }
  function fn(a) {
    var x = this.__data__, B = ce(x, a);
    return B < 0 ? void 0 : x[B][1];
  }
  function cn(a) {
    return ce(this.__data__, a) > -1;
  }
  function hn(a, x) {
    var B = this.__data__, Z = ce(B, a);
    return Z < 0 ? (++this.size, B.push([a, x])) : B[Z][1] = x, this;
  }
  kt.prototype.clear = un, kt.prototype.delete = sn, kt.prototype.get = fn, kt.prototype.has = cn, kt.prototype.set = hn;
  function Lt(a) {
    var x = -1, B = a == null ? 0 : a.length;
    for (this.clear(); ++x < B; ) {
      var Z = a[x];
      this.set(Z[0], Z[1]);
    }
  }
  function dn() {
    this.size = 0, this.__data__ = {
      hash: new Et(),
      map: new (ne || kt)(),
      string: new Et()
    };
  }
  function vn(a) {
    var x = Dt(this, a).delete(a);
    return this.size -= x ? 1 : 0, x;
  }
  function pn(a) {
    return Dt(this, a).get(a);
  }
  function yn(a) {
    return Dt(this, a).has(a);
  }
  function gn(a, x) {
    var B = Dt(this, a), Z = B.size;
    return B.set(a, x), this.size += B.size == Z ? 0 : 1, this;
  }
  Lt.prototype.clear = dn, Lt.prototype.delete = vn, Lt.prototype.get = pn, Lt.prototype.has = yn, Lt.prototype.set = gn;
  function se(a) {
    var x = -1, B = a == null ? 0 : a.length;
    for (this.__data__ = new Lt(); ++x < B; )
      this.add(a[x]);
  }
  function Ie(a) {
    return this.__data__.set(a, d), this;
  }
  function fe(a) {
    return this.__data__.has(a);
  }
  se.prototype.add = se.prototype.push = Ie, se.prototype.has = fe;
  function Ct(a) {
    var x = this.__data__ = new kt(a);
    this.size = x.size;
  }
  function Oe() {
    this.__data__ = new kt(), this.size = 0;
  }
  function mn(a) {
    var x = this.__data__, B = x.delete(a);
    return this.size = x.size, B;
  }
  function bn(a) {
    return this.__data__.get(a);
  }
  function _n(a) {
    return this.__data__.has(a);
  }
  function On(a, x) {
    var B = this.__data__;
    if (B instanceof kt) {
      var Z = B.__data__;
      if (!ne || Z.length < m - 1)
        return Z.push([a, x]), this.size = ++B.size, this;
      B = this.__data__ = new Lt(Z);
    }
    return B.set(a, x), this.size = B.size, this;
  }
  Ct.prototype.clear = Oe, Ct.prototype.delete = mn, Ct.prototype.get = bn, Ct.prototype.has = _n, Ct.prototype.set = On;
  function En(a, x) {
    var B = he(a), Z = !B && Fe(a), ut = !B && !Z && de(a), rt = !B && !Z && !ut && ze(a), ct = B || Z || ut || rt, vt = ct ? W(a.length, String) : [], bt = vt.length;
    for (var yt in a)
      (x || dt.call(a, yt)) && !(ct && (yt == "length" || ut && (yt == "offset" || yt == "parent") || rt && (yt == "buffer" || yt == "byteLength" || yt == "byteOffset") || Pn(yt, bt))) && vt.push(yt);
    return vt;
  }
  function ce(a, x) {
    for (var B = a.length; B--; )
      if (Ce(a[B][0], x))
        return B;
    return -1;
  }
  function Ee(a, x, B) {
    var Z = x(a);
    return he(a) ? Z : mt(Z, B(a));
  }
  function re(a) {
    return a == null ? a === void 0 ? P : r : Mt && Mt in Object(a) ? Vt(a) : Be(a);
  }
  function Me(a) {
    return Ut(a) && re(a) == _;
  }
  function De(a, x, B, Z, ut) {
    return a === x ? !0 : a == null || x == null || !Ut(a) && !Ut(x) ? a !== a && x !== x : An(a, x, B, Z, De, ut);
  }
  function An(a, x, B, Z, ut, rt) {
    var ct = he(a), vt = he(x), bt = ct ? g : Ft(a), yt = vt ? g : Ft(x);
    bt = bt == _ ? i : bt, yt = yt == _ ? i : yt;
    var Nt = bt == i, qt = yt == i, _t = bt == yt;
    if (_t && de(a)) {
      if (!de(x))
        return !1;
      ct = !0, Nt = !1;
    }
    if (_t && !Nt)
      return rt || (rt = new Ct()), ct || ze(a) ? Ae(a, x, B, Z, ut, rt) : kn(a, x, bt, B, Z, ut, rt);
    if (!(B & f)) {
      var xt = Nt && dt.call(a, "__wrapped__"), At = qt && dt.call(x, "__wrapped__");
      if (xt || At) {
        var Yt = xt ? a.value() : a, Zt = At ? x.value() : x;
        return rt || (rt = new Ct()), ut(Yt, Zt, B, Z, rt);
      }
    }
    return _t ? (rt || (rt = new Ct()), Nn(a, x, B, Z, ut, rt)) : !1;
  }
  function wn(a) {
    if (!He(a) || qn(a))
      return !1;
    var x = Ue(a) ? Xe : M;
    return x.test(Pt(a));
  }
  function Tn(a) {
    return Ut(a) && Te(a.length) && !!C[re(a)];
  }
  function Sn(a) {
    if (!Rn(a))
      return ee(a);
    var x = [];
    for (var B in Object(a))
      dt.call(a, B) && B != "constructor" && x.push(B);
    return x;
  }
  function Ae(a, x, B, Z, ut, rt) {
    var ct = B & f, vt = a.length, bt = x.length;
    if (vt != bt && !(ct && bt > vt))
      return !1;
    var yt = rt.get(a);
    if (yt && rt.get(x))
      return yt == x;
    var Nt = -1, qt = !0, _t = B & E ? new se() : void 0;
    for (rt.set(a, x), rt.set(x, a); ++Nt < vt; ) {
      var xt = a[Nt], At = x[Nt];
      if (Z)
        var Yt = ct ? Z(At, xt, Nt, x, a, rt) : Z(xt, At, Nt, a, x, rt);
      if (Yt !== void 0) {
        if (Yt)
          continue;
        qt = !1;
        break;
      }
      if (_t) {
        if (!gt(x, function(Zt, oe) {
          if (!tt(_t, oe) && (xt === Zt || ut(xt, Zt, B, Z, rt)))
            return _t.push(oe);
        })) {
          qt = !1;
          break;
        }
      } else if (!(xt === At || ut(xt, At, B, Z, rt))) {
        qt = !1;
        break;
      }
    }
    return rt.delete(a), rt.delete(x), qt;
  }
  function kn(a, x, B, Z, ut, rt, ct) {
    switch (B) {
      case O:
        if (a.byteLength != x.byteLength || a.byteOffset != x.byteOffset)
          return !1;
        a = a.buffer, x = x.buffer;
      case p:
        return !(a.byteLength != x.byteLength || !rt(new qe(a), new qe(x)));
      case h:
      case o:
      case u:
        return Ce(+a, +x);
      case t:
        return a.name == x.name && a.message == x.message;
      case v:
      case w:
        return a == x + "";
      case l:
        var vt = X;
      case S:
        var bt = Z & f;
        if (vt || (vt = ot), a.size != x.size && !bt)
          return !1;
        var yt = ct.get(a);
        if (yt)
          return yt == x;
        Z |= E, ct.set(a, x);
        var Nt = Ae(vt(a), vt(x), Z, ut, rt, ct);
        return ct.delete(a), Nt;
      case T:
        if (_e)
          return _e.call(a) == _e.call(x);
    }
    return !1;
  }
  function Nn(a, x, B, Z, ut, rt) {
    var ct = B & f, vt = ie(a), bt = vt.length, yt = ie(x), Nt = yt.length;
    if (bt != Nt && !ct)
      return !1;
    for (var qt = bt; qt--; ) {
      var _t = vt[qt];
      if (!(ct ? _t in x : dt.call(x, _t)))
        return !1;
    }
    var xt = rt.get(a);
    if (xt && rt.get(x))
      return xt == x;
    var At = !0;
    rt.set(a, x), rt.set(x, a);
    for (var Yt = ct; ++qt < bt; ) {
      _t = vt[qt];
      var Zt = a[_t], oe = x[_t];
      if (Z)
        var Vn = ct ? Z(oe, Zt, _t, x, a, rt) : Z(Zt, oe, _t, a, x, rt);
      if (!(Vn === void 0 ? Zt === oe || ut(Zt, oe, B, Z, rt) : Vn)) {
        At = !1;
        break;
      }
      Yt || (Yt = _t == "constructor");
    }
    if (At && !Yt) {
      var Ke = a.constructor, $e = x.constructor;
      Ke != $e && "constructor" in a && "constructor" in x && !(typeof Ke == "function" && Ke instanceof Ke && typeof $e == "function" && $e instanceof $e) && (At = !1);
    }
    return rt.delete(a), rt.delete(x), At;
  }
  function ie(a) {
    return Ee(a, Se, xn);
  }
  function Dt(a, x) {
    var B = a.__data__;
    return Ln(x) ? B[typeof x == "string" ? "string" : "hash"] : B.map;
  }
  function Gt(a, x) {
    var B = et(a, x);
    return wn(B) ? B : void 0;
  }
  function Vt(a) {
    var x = dt.call(a, Mt), B = a[Mt];
    try {
      a[Mt] = void 0;
      var Z = !0;
    } catch {
    }
    var ut = Le.call(a);
    return Z && (x ? a[Mt] = B : delete a[Mt]), ut;
  }
  var xn = ue ? function(a) {
    return a == null ? [] : (a = Object(a), ht(ue(a), function(x) {
      return le.call(a, x);
    }));
  } : In, Ft = re;
  (ye && Ft(new ye(new ArrayBuffer(1))) != O || ne && Ft(new ne()) != l || ge && Ft(ge.resolve()) != c || me && Ft(new me()) != S || be && Ft(new be()) != A) && (Ft = function(a) {
    var x = re(a), B = x == i ? a.constructor : void 0, Z = B ? Pt(B) : "";
    if (Z)
      switch (Z) {
        case Re:
          return O;
        case $t:
          return l;
        case Je:
          return c;
        case tn:
          return S;
        case en:
          return A;
      }
    return x;
  });
  function Pn(a, x) {
    return x = x == null ? b : x, !!x && (typeof a == "number" || K.test(a)) && a > -1 && a % 1 == 0 && a < x;
  }
  function Ln(a) {
    var x = typeof a;
    return x == "string" || x == "number" || x == "symbol" || x == "boolean" ? a !== "__proto__" : a === null;
  }
  function qn(a) {
    return !!It && It in a;
  }
  function Rn(a) {
    var x = a && a.constructor, B = typeof x == "function" && x.prototype || Ot;
    return a === B;
  }
  function Be(a) {
    return Le.call(a);
  }
  function Pt(a) {
    if (a != null) {
      try {
        return Jt.call(a);
      } catch {
      }
      try {
        return a + "";
      } catch {
      }
    }
    return "";
  }
  function Ce(a, x) {
    return a === x || a !== a && x !== x;
  }
  var Fe = Me(function() {
    return arguments;
  }()) ? Me : function(a) {
    return Ut(a) && dt.call(a, "callee") && !le.call(a, "callee");
  }, he = Array.isArray;
  function we(a) {
    return a != null && Te(a.length) && !Ue(a);
  }
  var de = pe || Mn;
  function jn(a, x) {
    return De(a, x);
  }
  function Ue(a) {
    if (!He(a))
      return !1;
    var x = re(a);
    return x == e || x == s || x == y || x == n;
  }
  function Te(a) {
    return typeof a == "number" && a > -1 && a % 1 == 0 && a <= b;
  }
  function He(a) {
    var x = typeof a;
    return a != null && (x == "object" || x == "function");
  }
  function Ut(a) {
    return a != null && typeof a == "object";
  }
  var ze = ft ? Y(ft) : Tn;
  function Se(a) {
    return we(a) ? En(a) : Sn(a);
  }
  function In() {
    return [];
  }
  function Mn() {
    return !1;
  }
  R.exports = jn;
})(Ye, Ye.exports);
var Gn = {}, ur = Tt && Tt.__importDefault || function(R) {
  return R && R.__esModule ? R : { default: R };
};
Object.defineProperty(Gn, "__esModule", { value: !0 });
var Pr = ur(We.exports), Lr = ur(Ye.exports), Hn;
(function(R) {
  function U(E, b, _) {
    E === void 0 && (E = {}), b === void 0 && (b = {}), typeof E != "object" && (E = {}), typeof b != "object" && (b = {});
    var g = Pr.default(b);
    _ || (g = Object.keys(g).reduce(function(h, o) {
      return g[o] != null && (h[o] = g[o]), h;
    }, {}));
    for (var y in E)
      E[y] !== void 0 && b[y] === void 0 && (g[y] = E[y]);
    return Object.keys(g).length > 0 ? g : void 0;
  }
  R.compose = U;
  function m(E, b) {
    E === void 0 && (E = {}), b === void 0 && (b = {}), typeof E != "object" && (E = {}), typeof b != "object" && (b = {});
    var _ = Object.keys(E).concat(Object.keys(b)).reduce(function(g, y) {
      return Lr.default(E[y], b[y]) || (g[y] = b[y] === void 0 ? null : b[y]), g;
    }, {});
    return Object.keys(_).length > 0 ? _ : void 0;
  }
  R.diff = m;
  function d(E, b) {
    E === void 0 && (E = {}), b === void 0 && (b = {}), E = E || {};
    var _ = Object.keys(b).reduce(function(g, y) {
      return b[y] !== E[y] && E[y] !== void 0 && (g[y] = b[y]), g;
    }, {});
    return Object.keys(E).reduce(function(g, y) {
      return E[y] !== b[y] && b[y] === void 0 && (g[y] = null), g;
    }, _);
  }
  R.invert = d;
  function f(E, b, _) {
    if (_ === void 0 && (_ = !1), typeof E != "object")
      return b;
    if (typeof b == "object") {
      if (!_)
        return b;
      var g = Object.keys(b).reduce(function(y, h) {
        return E[h] === void 0 && (y[h] = b[h]), y;
      }, {});
      return Object.keys(g).length > 0 ? g : void 0;
    }
  }
  R.transform = f;
})(Hn || (Hn = {}));
Gn.default = Hn;
var Ge = {}, Ve = {}, Qn;
function qr() {
  if (Qn)
    return Ve;
  Qn = 1;
  var R = Tt && Tt.__importDefault || function(d) {
    return d && d.__esModule ? d : { default: d };
  };
  Object.defineProperty(Ve, "__esModule", { value: !0 });
  var U = R(sr()), m = function() {
    function d(f) {
      this.ops = f, this.index = 0, this.offset = 0;
    }
    return d.prototype.hasNext = function() {
      return this.peekLength() < 1 / 0;
    }, d.prototype.next = function(f) {
      f || (f = 1 / 0);
      var E = this.ops[this.index];
      if (E) {
        var b = this.offset, _ = U.default.length(E);
        if (f >= _ - b ? (f = _ - b, this.index += 1, this.offset = 0) : this.offset += f, typeof E.delete == "number")
          return { delete: f };
        var g = {};
        return E.attributes && (g.attributes = E.attributes), typeof E.retain == "number" ? g.retain = f : typeof E.insert == "string" ? g.insert = E.insert.substr(b, f) : g.insert = E.insert, g;
      } else
        return { retain: 1 / 0 };
    }, d.prototype.peek = function() {
      return this.ops[this.index];
    }, d.prototype.peekLength = function() {
      return this.ops[this.index] ? U.default.length(this.ops[this.index]) - this.offset : 1 / 0;
    }, d.prototype.peekType = function() {
      return this.ops[this.index] ? typeof this.ops[this.index].delete == "number" ? "delete" : typeof this.ops[this.index].retain == "number" ? "retain" : "insert" : "retain";
    }, d.prototype.rest = function() {
      if (this.hasNext()) {
        if (this.offset === 0)
          return this.ops.slice(this.index);
        var f = this.offset, E = this.index, b = this.next(), _ = this.ops.slice(this.index);
        return this.offset = f, this.index = E, [b].concat(_);
      } else
        return [];
    }, d;
  }();
  return Ve.default = m, Ve;
}
var Xn;
function sr() {
  if (Xn)
    return Ge;
  Xn = 1;
  var R = Tt && Tt.__importDefault || function(d) {
    return d && d.__esModule ? d : { default: d };
  };
  Object.defineProperty(Ge, "__esModule", { value: !0 });
  var U = R(qr()), m;
  return function(d) {
    function f(b) {
      return new U.default(b);
    }
    d.iterator = f;
    function E(b) {
      return typeof b.delete == "number" ? b.delete : typeof b.retain == "number" ? b.retain : typeof b.insert == "string" ? b.insert.length : 1;
    }
    d.length = E;
  }(m || (m = {})), Ge.default = m, Ge;
}
var Pe = Tt && Tt.__importDefault || function(R) {
  return R && R.__esModule ? R : { default: R };
}, Ze = Pe(xr), Rr = Pe(We.exports), Un = Pe(Ye.exports), Ne = Pe(Gn), wt = Pe(sr()), jr = String.fromCharCode(0), Ir = function() {
  function R(U) {
    Array.isArray(U) ? this.ops = U : U != null && Array.isArray(U.ops) ? this.ops = U.ops : this.ops = [];
  }
  return R.prototype.insert = function(U, m) {
    var d = {};
    return typeof U == "string" && U.length === 0 ? this : (d.insert = U, m != null && typeof m == "object" && Object.keys(m).length > 0 && (d.attributes = m), this.push(d));
  }, R.prototype.delete = function(U) {
    return U <= 0 ? this : this.push({ delete: U });
  }, R.prototype.retain = function(U, m) {
    if (U <= 0)
      return this;
    var d = { retain: U };
    return m != null && typeof m == "object" && Object.keys(m).length > 0 && (d.attributes = m), this.push(d);
  }, R.prototype.push = function(U) {
    var m = this.ops.length, d = this.ops[m - 1];
    if (U = Rr.default(U), typeof d == "object") {
      if (typeof U.delete == "number" && typeof d.delete == "number")
        return this.ops[m - 1] = { delete: d.delete + U.delete }, this;
      if (typeof d.delete == "number" && U.insert != null && (m -= 1, d = this.ops[m - 1], typeof d != "object"))
        return this.ops.unshift(U), this;
      if (Un.default(U.attributes, d.attributes)) {
        if (typeof U.insert == "string" && typeof d.insert == "string")
          return this.ops[m - 1] = { insert: d.insert + U.insert }, typeof U.attributes == "object" && (this.ops[m - 1].attributes = U.attributes), this;
        if (typeof U.retain == "number" && typeof d.retain == "number")
          return this.ops[m - 1] = { retain: d.retain + U.retain }, typeof U.attributes == "object" && (this.ops[m - 1].attributes = U.attributes), this;
      }
    }
    return m === this.ops.length ? this.ops.push(U) : this.ops.splice(m, 0, U), this;
  }, R.prototype.chop = function() {
    var U = this.ops[this.ops.length - 1];
    return U && U.retain && !U.attributes && this.ops.pop(), this;
  }, R.prototype.filter = function(U) {
    return this.ops.filter(U);
  }, R.prototype.forEach = function(U) {
    this.ops.forEach(U);
  }, R.prototype.map = function(U) {
    return this.ops.map(U);
  }, R.prototype.partition = function(U) {
    var m = [], d = [];
    return this.forEach(function(f) {
      var E = U(f) ? m : d;
      E.push(f);
    }), [m, d];
  }, R.prototype.reduce = function(U, m) {
    return this.ops.reduce(U, m);
  }, R.prototype.changeLength = function() {
    return this.reduce(function(U, m) {
      return m.insert ? U + wt.default.length(m) : m.delete ? U - m.delete : U;
    }, 0);
  }, R.prototype.length = function() {
    return this.reduce(function(U, m) {
      return U + wt.default.length(m);
    }, 0);
  }, R.prototype.slice = function(U, m) {
    U === void 0 && (U = 0), m === void 0 && (m = 1 / 0);
    for (var d = [], f = wt.default.iterator(this.ops), E = 0; E < m && f.hasNext(); ) {
      var b = void 0;
      E < U ? b = f.next(U - E) : (b = f.next(m - E), d.push(b)), E += wt.default.length(b);
    }
    return new R(d);
  }, R.prototype.compose = function(U) {
    var m = wt.default.iterator(this.ops), d = wt.default.iterator(U.ops), f = [], E = d.peek();
    if (E != null && typeof E.retain == "number" && E.attributes == null) {
      for (var b = E.retain; m.peekType() === "insert" && m.peekLength() <= b; )
        b -= m.peekLength(), f.push(m.next());
      E.retain - b > 0 && d.next(E.retain - b);
    }
    for (var _ = new R(f); m.hasNext() || d.hasNext(); )
      if (d.peekType() === "insert")
        _.push(d.next());
      else if (m.peekType() === "delete")
        _.push(m.next());
      else {
        var g = Math.min(m.peekLength(), d.peekLength()), y = m.next(g), h = d.next(g);
        if (typeof h.retain == "number") {
          var o = {};
          typeof y.retain == "number" ? o.retain = g : o.insert = y.insert;
          var t = Ne.default.compose(y.attributes, h.attributes, typeof y.retain == "number");
          if (t && (o.attributes = t), _.push(o), !d.hasNext() && Un.default(_.ops[_.ops.length - 1], o)) {
            var e = new R(m.rest());
            return _.concat(e).chop();
          }
        } else
          typeof h.delete == "number" && typeof y.retain == "number" && _.push(h);
      }
    return _.chop();
  }, R.prototype.concat = function(U) {
    var m = new R(this.ops.slice());
    return U.ops.length > 0 && (m.push(U.ops[0]), m.ops = m.ops.concat(U.ops.slice(1))), m;
  }, R.prototype.diff = function(U, m) {
    if (this.ops === U.ops)
      return new R();
    var d = [this, U].map(function(g) {
      return g.map(function(y) {
        if (y.insert != null)
          return typeof y.insert == "string" ? y.insert : jr;
        var h = g === U ? "on" : "with";
        throw new Error("diff() called " + h + " non-document");
      }).join("");
    }), f = new R(), E = Ze.default(d[0], d[1], m), b = wt.default.iterator(this.ops), _ = wt.default.iterator(U.ops);
    return E.forEach(function(g) {
      for (var y = g[1].length; y > 0; ) {
        var h = 0;
        switch (g[0]) {
          case Ze.default.INSERT:
            h = Math.min(_.peekLength(), y), f.push(_.next(h));
            break;
          case Ze.default.DELETE:
            h = Math.min(y, b.peekLength()), b.next(h), f.delete(h);
            break;
          case Ze.default.EQUAL:
            h = Math.min(b.peekLength(), _.peekLength(), y);
            var o = b.next(h), t = _.next(h);
            Un.default(o.insert, t.insert) ? f.retain(h, Ne.default.diff(o.attributes, t.attributes)) : f.push(t).delete(h);
            break;
        }
        y -= h;
      }
    }), f.chop();
  }, R.prototype.eachLine = function(U, m) {
    m === void 0 && (m = `
`);
    for (var d = wt.default.iterator(this.ops), f = new R(), E = 0; d.hasNext(); ) {
      if (d.peekType() !== "insert")
        return;
      var b = d.peek(), _ = wt.default.length(b) - d.peekLength(), g = typeof b.insert == "string" ? b.insert.indexOf(m, _) - _ : -1;
      if (g < 0)
        f.push(d.next());
      else if (g > 0)
        f.push(d.next(g));
      else {
        if (U(f, d.next(1).attributes || {}, E) === !1)
          return;
        E += 1, f = new R();
      }
    }
    f.length() > 0 && U(f, {}, E);
  }, R.prototype.invert = function(U) {
    var m = new R();
    return this.reduce(function(d, f) {
      if (f.insert)
        m.delete(wt.default.length(f));
      else {
        if (f.retain && f.attributes == null)
          return m.retain(f.retain), d + f.retain;
        if (f.delete || f.retain && f.attributes) {
          var E = f.delete || f.retain, b = U.slice(d, d + E);
          return b.forEach(function(_) {
            f.delete ? m.push(_) : f.retain && f.attributes && m.retain(wt.default.length(_), Ne.default.invert(f.attributes, _.attributes));
          }), d + E;
        }
      }
      return d;
    }, 0), m.chop();
  }, R.prototype.transform = function(U, m) {
    if (m === void 0 && (m = !1), m = !!m, typeof U == "number")
      return this.transformPosition(U, m);
    for (var d = U, f = wt.default.iterator(this.ops), E = wt.default.iterator(d.ops), b = new R(); f.hasNext() || E.hasNext(); )
      if (f.peekType() === "insert" && (m || E.peekType() !== "insert"))
        b.retain(wt.default.length(f.next()));
      else if (E.peekType() === "insert")
        b.push(E.next());
      else {
        var _ = Math.min(f.peekLength(), E.peekLength()), g = f.next(_), y = E.next(_);
        if (g.delete)
          continue;
        y.delete ? b.push(y) : b.retain(_, Ne.default.transform(g.attributes, y.attributes, m));
      }
    return b.chop();
  }, R.prototype.transformPosition = function(U, m) {
    m === void 0 && (m = !1), m = !!m;
    for (var d = wt.default.iterator(this.ops), f = 0; d.hasNext() && f <= U; ) {
      var E = d.peekLength(), b = d.peekType();
      if (d.next(), b === "delete") {
        U -= Math.min(E, U - f);
        continue;
      } else
        b === "insert" && (f < U || !m) && (U += E);
      f += E;
    }
    return U;
  }, R.Op = wt.default, R.AttributeMap = Ne.default, R;
}(), Mr = Ir;
/*!
 * VueQuill @vueup/vue-quill v1.2.0
 * https://vueup.github.io/vue-quill/
 * 
 * Includes quill v1.3.7
 * https://quilljs.com/
 * 
 * Copyright (c) 2023 Ahmad Luthfi Masruri
 * Released under the MIT license
 * Date: 2023-05-12T08:44:03.742Z
 */
const Jn = {
  essential: [
    [{ header: [1, 2, 3, 4, 5, 6, !1] }],
    ["bold", "italic", "underline"],
    [{ list: "ordered" }, { list: "bullet" }, { align: [] }],
    ["blockquote", "code-block", "link"],
    [{ color: [] }, "clean"]
  ],
  minimal: [
    [{ header: 1 }, { header: 2 }],
    ["bold", "italic", "underline"],
    [{ list: "ordered" }, { list: "bullet" }, { align: [] }]
  ],
  full: [
    ["bold", "italic", "underline", "strike"],
    ["blockquote", "code-block"],
    [{ header: 1 }, { header: 2 }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ direction: "rtl" }],
    [{ size: ["small", !1, "large", "huge"] }],
    [{ header: [1, 2, 3, 4, 5, 6, !1] }],
    [{ color: [] }, { background: [] }],
    [{ font: [] }],
    [{ align: [] }],
    ["link", "video", "image"],
    ["clean"]
  ]
}, Dr = tr({
  name: "QuillEditor",
  inheritAttrs: !1,
  props: {
    content: {
      type: [String, Object]
    },
    contentType: {
      type: String,
      default: "delta",
      validator: (R) => ["delta", "html", "text"].includes(R)
    },
    enable: {
      type: Boolean,
      default: !0
    },
    readOnly: {
      type: Boolean,
      default: !1
    },
    placeholder: {
      type: String,
      required: !1
    },
    theme: {
      type: String,
      default: "snow",
      validator: (R) => ["snow", "bubble", ""].includes(R)
    },
    toolbar: {
      type: [String, Array, Object],
      required: !1,
      validator: (R) => typeof R == "string" && R !== "" ? R.charAt(0) === "#" ? !0 : Object.keys(Jn).indexOf(R) !== -1 : !0
    },
    modules: {
      type: Object,
      required: !1
    },
    options: {
      type: Object,
      required: !1
    },
    globalOptions: {
      type: Object,
      required: !1
    }
  },
  emits: [
    "textChange",
    "selectionChange",
    "editorChange",
    "update:content",
    "focus",
    "blur",
    "ready"
  ],
  setup: (R, U) => {
    er(() => {
      E();
    }), cr(() => {
      m = null;
    });
    let m, d;
    const f = zt(), E = () => {
      var p;
      if (!!f.value) {
        if (d = b(), R.modules)
          if (Array.isArray(R.modules))
            for (const O of R.modules)
              Cn.register(`modules/${O.name}`, O.module);
          else
            Cn.register(`modules/${R.modules.name}`, R.modules.module);
        m = new Cn(f.value, d), c(R.content), m.on("text-change", o), m.on("selection-change", e), m.on("editor-change", s), R.theme !== "bubble" && f.value.classList.remove("ql-bubble"), R.theme !== "snow" && f.value.classList.remove("ql-snow"), (p = m.getModule("toolbar")) === null || p === void 0 || p.container.addEventListener("mousedown", (O) => {
          O.preventDefault();
        }), U.emit("ready", m);
      }
    }, b = () => {
      const p = {};
      if (R.theme !== "" && (p.theme = R.theme), R.readOnly && (p.readOnly = R.readOnly), R.placeholder && (p.placeholder = R.placeholder), R.toolbar && R.toolbar !== "" && (p.modules = {
        toolbar: (() => {
          if (typeof R.toolbar == "object")
            return R.toolbar;
          if (typeof R.toolbar == "string")
            return R.toolbar.charAt(0) === "#" ? R.toolbar : Jn[R.toolbar];
        })()
      }), R.modules) {
        const O = (() => {
          var k, L;
          const D = {};
          if (Array.isArray(R.modules))
            for (const z of R.modules)
              D[z.name] = (k = z.options) !== null && k !== void 0 ? k : {};
          else
            D[R.modules.name] = (L = R.modules.options) !== null && L !== void 0 ? L : {};
          return D;
        })();
        p.modules = Object.assign({}, p.modules, O);
      }
      return Object.assign({}, R.globalOptions, R.options, p);
    }, _ = (p) => typeof p == "object" && p ? p.slice() : p, g = (p) => Object.values(p.ops).some((O) => !O.retain || Object.keys(O).length !== 1);
    let y;
    const h = (p) => {
      if (typeof y == typeof p) {
        if (p === y)
          return !0;
        if (typeof p == "object" && p && typeof y == "object" && y)
          return !g(y.diff(p));
      }
      return !1;
    }, o = (p, O, k) => {
      y = _(i()), h(R.content) || U.emit("update:content", y), U.emit("textChange", { delta: p, oldContents: O, source: k });
    }, t = zt(), e = (p, O, k) => {
      t.value = !!(m != null && m.hasFocus()), U.emit("selectionChange", { range: p, oldRange: O, source: k });
    };
    Dn(t, (p) => {
      p ? U.emit("focus", f) : U.emit("blur", f);
    });
    const s = (...p) => {
      p[0] === "text-change" && U.emit("editorChange", {
        name: p[0],
        delta: p[1],
        oldContents: p[2],
        source: p[3]
      }), p[0] === "selection-change" && U.emit("editorChange", {
        name: p[0],
        range: p[1],
        oldRange: p[2],
        source: p[3]
      });
    }, l = () => f.value, u = () => {
      var p;
      return (p = m == null ? void 0 : m.getModule("toolbar")) === null || p === void 0 ? void 0 : p.container;
    }, r = () => {
      if (m)
        return m;
      throw `The quill editor hasn't been instantiated yet,
                  make sure to call this method when the editor ready
                  or use v-on:ready="onReady(quill)" event instead.`;
    }, i = (p, O) => R.contentType === "html" ? S() : R.contentType === "text" ? n(p, O) : m == null ? void 0 : m.getContents(p, O), c = (p, O = "api") => {
      const k = p || (R.contentType === "delta" ? new Mr() : "");
      R.contentType === "html" ? w(k) : R.contentType === "text" ? v(k, O) : m == null || m.setContents(k, O), y = _(k);
    }, n = (p, O) => {
      var k;
      return (k = m == null ? void 0 : m.getText(p, O)) !== null && k !== void 0 ? k : "";
    }, v = (p, O = "api") => {
      m == null || m.setText(p, O);
    }, S = () => {
      var p;
      return (p = m == null ? void 0 : m.root.innerHTML) !== null && p !== void 0 ? p : "";
    }, w = (p) => {
      m && (m.root.innerHTML = p);
    }, T = (p, O = "api") => {
      const k = m == null ? void 0 : m.clipboard.convert(p);
      k && (m == null || m.setContents(k, O));
    }, P = () => {
      m == null || m.focus();
    }, A = () => {
      Zn(() => {
        var p;
        !U.slots.toolbar && m && ((p = m.getModule("toolbar")) === null || p === void 0 || p.container.remove()), E();
      });
    };
    return Dn(() => R.content, (p) => {
      if (!m || !p || h(p))
        return;
      const O = m.getSelection();
      O && Zn(() => m == null ? void 0 : m.setSelection(O)), c(p);
    }, { deep: !0 }), Dn(() => R.enable, (p) => {
      m && m.enable(p);
    }), {
      editor: f,
      getEditor: l,
      getToolbar: u,
      getQuill: r,
      getContents: i,
      setContents: c,
      getHTML: S,
      setHTML: w,
      pasteHTML: T,
      focus: P,
      getText: n,
      setText: v,
      reinit: A
    };
  },
  render() {
    var R, U;
    return [
      (U = (R = this.$slots).toolbar) === null || U === void 0 ? void 0 : U.call(R),
      hr("div", { ref: "editor", ...this.$attrs })
    ];
  }
});
const Br = { class: "d-flex justify-content-between align-items-center mb-3" }, Cr = /* @__PURE__ */ Rt("h4", null, "System Settings", -1), Fr = ["disabled"], Ur = { key: 0 }, Hr = /* @__PURE__ */ Rt("span", {
  class: "spinner-border spinner-border-sm",
  role: "status"
}, null, -1), zr = { key: 1 }, Kr = {
  key: 0,
  class: "text-center py-4"
}, $r = /* @__PURE__ */ Rt("div", {
  class: "spinner-border",
  role: "status"
}, [
  /* @__PURE__ */ Rt("span", { class: "visually-hidden" }, "Loading...")
], -1), Gr = [
  $r
], Vr = {
  key: 1,
  class: "alert alert-danger"
}, Zr = ["onSubmit"], Wr = { class: "mb-3" }, Yr = { class: "form-check" }, Qr = ["disabled"], Xr = /* @__PURE__ */ Rt("label", {
  class: "form-check-label",
  for: "sendEmail"
}, " Send successful purchase email ", -1), Jr = { class: "mb-3" }, ti = /* @__PURE__ */ Rt("label", null, "Text bottom index page", -1), ei = ["disabled"], ni = { key: 0 }, ri = /* @__PURE__ */ Rt("span", {
  class: "spinner-border spinner-border-sm",
  role: "status"
}, null, -1), ii = { key: 1 }, li = /* @__PURE__ */ tr({
  __name: "SystemSettingsView",
  setup(R) {
    const m = dr("https://payments.crank-fit.com/api/graphql/"), d = Ar(m), f = br(), E = zt(!0), b = zt(""), _ = zt(!1);
    er(async () => {
      await d.fetchSettings(), d.settings.value && (E.value = d.settings.value.sendSuccessfulPurchaseEmail, b.value = d.settings.value.textBottomIndexPage || "");
    });
    async function g() {
      await d.updateSettings(E.value, b.value || null) ? f.success("System settings have been updated successfully") : f.error("Failed to update settings");
    }
    async function y() {
      _.value = !0, await d.clearCache() ? f.success("The cache has been cleared successfully") : f.error("Failed to clear cache"), _.value = !1;
    }
    return (h, o) => (Xt(), Qt("div", null, [
      Rt("div", Br, [
        Cr,
        Rt("button", {
          class: "btn btn-primary",
          onClick: y,
          disabled: _.value || Ht(d).isSaving.value
        }, [
          _.value ? (Xt(), Qt("span", Ur, [
            Hr,
            Wn(" Clearing... ")
          ])) : (Xt(), Qt("span", zr, "Reset Cache"))
        ], 8, Fr)
      ]),
      Ht(d).isLoading.value ? (Xt(), Qt("div", Kr, Gr)) : Bn("", !0),
      Ht(d).hasError.value ? (Xt(), Qt("div", Vr, vr(Ht(d).errorMessage.value), 1)) : Bn("", !0),
      !Ht(d).isLoading.value && Ht(d).settings.value ? (Xt(), Qt("form", {
        key: 2,
        onSubmit: pr(g, ["prevent"])
      }, [
        Rt("div", Wr, [
          Rt("div", Yr, [
            yr(Rt("input", {
              type: "checkbox",
              class: "form-check-input",
              id: "sendEmail",
              "onUpdate:modelValue": o[0] || (o[0] = (t) => E.value = t),
              disabled: Ht(d).isSaving.value
            }, null, 8, Qr), [
              [gr, E.value]
            ]),
            Xr
          ])
        ]),
        Rt("div", Jr, [
          ti,
          mr(Ht(Dr), {
            content: b.value,
            "onUpdate:content": o[1] || (o[1] = (t) => b.value = t),
            "content-type": "html",
            theme: "snow",
            toolbar: [
              ["bold", "italic", "underline", "strike"],
              [{ list: "ordered" }, { list: "bullet" }],
              [{ header: [1, 2, 3, !1] }],
              ["link"],
              ["clean"]
            ]
          }, null, 8, ["content"])
        ]),
        Rt("button", {
          type: "submit",
          class: "btn btn-dark",
          disabled: Ht(d).isSaving.value
        }, [
          Ht(d).isSaving.value ? (Xt(), Qt("span", ni, [
            ri,
            Wn(" Saving... ")
          ])) : (Xt(), Qt("span", ii, "Save Settings"))
        ], 8, ei)
      ], 40, Zr)) : Bn("", !0)
    ]));
  }
});
export {
  li as default
};
