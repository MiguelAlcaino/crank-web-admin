import { d as N, o as e, b as a, F as u, h as f, A as i, B as t, t as k, e as l, g as y, y as V, G as q, H as G, c as B, I as z, r as H, J as I, k as r, K as c, j as n, w as C, f as K, L, R as M, M as R, D as P } from "./index.1064dab9.js";
import { u as W } from "./useAvailableSites.f52f16f4.js";
import { u as j } from "./useToast.b78f487f.js";
import { u as J } from "./themeStore.cbc556e4.js";
const Q = { class: "toast-container" }, X = ["onClick"], Y = /* @__PURE__ */ N({
  __name: "AdminToast",
  setup(U) {
    const p = j();
    function b(x) {
      return {
        success: "alert-success",
        error: "alert-danger",
        warning: "alert-warning",
        info: "alert-info"
      }[x] || "alert-info";
    }
    return (x, D) => (e(), a("div", Q, [
      (e(!0), a(u, null, f(y(p).messages.value, (g) => (e(), a("div", {
        key: g.id,
        class: i(["alert", b(g.type)]),
        role: "alert"
      }, [
        t(k(g.message) + " ", 1),
        l("button", {
          type: "button",
          class: "btn-close",
          "aria-label": "Close",
          onClick: (E) => y(p).remove(g.id)
        }, null, 8, X)
      ], 2))), 128))
    ]));
  }
});
const Z = /* @__PURE__ */ V(Y, [["__scopeId", "data-v-bb686ea1"]]), ee = { class: "container-fluid" }, se = { class: "row" }, ae = {
  style: { "font-size": "14px" },
  class: "col-sm-3 col-md-2 d-none d-sm-block sidebar"
}, te = { class: "nav nav-pills flex-column" }, ne = {
  key: 0,
  class: "nav-item"
}, oe = {
  key: 1,
  class: "nav-item"
}, ie = { key: 0 }, le = { class: "dropdown-menu show" }, ce = {
  key: 2,
  class: "nav-item"
}, re = {
  key: 3,
  class: "nav-item"
}, _e = {
  key: 4,
  class: "nav-item"
}, de = {
  key: 5,
  class: "nav-item"
}, ue = {
  key: 6,
  class: "nav-item"
}, me = {
  key: 7,
  class: "nav-item"
}, ve = { key: 0 }, pe = { class: "dropdown-menu show" }, ke = {
  key: 8,
  class: "nav-item"
}, fe = { key: 0 }, ye = { class: "dropdown-menu show" }, he = {
  key: 9,
  class: "nav-item"
}, ge = {
  key: 10,
  class: "nav-item"
}, we = {
  key: 11,
  class: "nav-item"
}, Ce = { key: 0 }, be = { class: "dropdown-menu show" }, Se = {
  key: 12,
  class: "nav-item"
}, Ae = {
  key: 13,
  class: "nav-item"
}, Ke = {
  key: 14,
  class: "nav-item"
}, Le = {
  key: 15,
  class: "nav-item"
}, Re = { class: "nav-item" }, xe = { class: "nav-item" }, De = { class: "nav-item" }, Te = ["onClick"], $e = {
  role: "main",
  class: "col-sm-9 ms-sm-auto col-md-10 pt-3"
}, Me = /* @__PURE__ */ N({
  __name: "AdminLayout",
  setup(U) {
    const p = q(), b = J(), D = G("https://payments.crank-fit.com/api/graphql/"), { sites: g, fetchSites: E } = W(D);
    B(() => P.getUser());
    const h = B(
      () => g.value.map((m) => ({ serviceKey: m.code, name: m.name }))
    );
    z(E);
    function T(m) {
      return P.userHasRole(m);
    }
    function _() {
      return T(M.ROLE_SUPER_ADMIN);
    }
    function $() {
      return T(M.ROLE_STAFF) || T(M.ROLE_SUPER_ADMIN);
    }
    function d(m) {
      return p.name === m;
    }
    function S(m, v, o) {
      return p.name === m && p.params[v] === o;
    }
    const w = H(null);
    function A(m) {
      w.value = w.value === m ? null : m;
    }
    async function F() {
      await P.logout();
    }
    return (m, v) => {
      const o = I("RouterLink"), O = I("RouterView");
      return e(), a("div", ee, [
        l("div", se, [
          l("nav", ae, [
            l("ul", te, [
              _() ? (e(), a("li", ne, [
                r(o, {
                  class: i(["nav-link", { active: d("admin_transactions") }]),
                  to: { name: "admin_transactions" }
                }, {
                  default: c(() => [
                    t(" Transactions ")
                  ]),
                  _: 1
                }, 8, ["class"])
              ])) : n("", !0),
              _() ? (e(), a("li", oe, [
                l("a", {
                  class: i(["nav-link dropdown-toggle", { active: y(p).name === "admin_class_packages" }]),
                  href: "#",
                  onClick: v[0] || (v[0] = C((s) => A("packages"), ["prevent"]))
                }, [
                  t(" Packages "),
                  (e(!0), a(u, null, f(h.value, (s) => (e(), a(u, {
                    key: s.serviceKey
                  }, [
                    S("admin_class_packages", "site", s.serviceKey) ? (e(), a("span", ie, k(s.name), 1)) : n("", !0)
                  ], 64))), 128))
                ], 2),
                K(l("div", le, [
                  (e(!0), a(u, null, f(h.value, (s) => (e(), R(o, {
                    key: s.serviceKey,
                    class: "dropdown-item",
                    to: { name: "admin_class_packages", params: { site: s.serviceKey } }
                  }, {
                    default: c(() => [
                      t(" Packages " + k(s.name), 1)
                    ]),
                    _: 2
                  }, 1032, ["to"]))), 128))
                ], 512), [
                  [L, w.value === "packages"]
                ])
              ])) : n("", !0),
              _() ? (e(), a("li", ce, [
                r(o, {
                  class: i(["nav-link", { active: d("admin_customer_gift_cards") }]),
                  to: { name: "admin_customer_gift_cards" }
                }, {
                  default: c(() => [
                    t(" Pending Gift Cards ")
                  ]),
                  _: 1
                }, 8, ["class"])
              ])) : n("", !0),
              _() ? (e(), a("li", re, [
                r(o, {
                  class: i(["nav-link", { active: d("admin_gift_cards") }]),
                  to: { name: "admin_gift_cards" }
                }, {
                  default: c(() => [
                    t(" Gift Card ")
                  ]),
                  _: 1
                }, 8, ["class"])
              ])) : n("", !0),
              _() ? (e(), a("li", _e, [
                r(o, {
                  class: i(["nav-link", { active: d("admin_payment_links") }]),
                  to: { name: "admin_payment_links" }
                }, {
                  default: c(() => [
                    t(" Payment link ")
                  ]),
                  _: 1
                }, 8, ["class"])
              ])) : n("", !0),
              _() ? (e(), a("li", de, [
                r(o, {
                  class: i(["nav-link", { active: d("admin_webhook_events") }]),
                  to: { name: "admin_webhook_events" }
                }, {
                  default: c(() => [
                    t(" Webhook Events ")
                  ]),
                  _: 1
                }, 8, ["class"])
              ])) : n("", !0),
              $() ? (e(), a("li", ue, [
                r(o, {
                  class: i(["nav-link", { active: d("admin_customers") }]),
                  to: { name: "admin_customers" }
                }, {
                  default: c(() => [
                    t(" Clients ")
                  ]),
                  _: 1
                }, 8, ["class"])
              ])) : n("", !0),
              $() ? (e(), a("li", me, [
                l("a", {
                  class: i(["nav-link dropdown-toggle", { active: y(p).name === "admin_classes_calendar" }]),
                  href: "#",
                  onClick: v[1] || (v[1] = C((s) => A("classSchedule"), ["prevent"]))
                }, [
                  t(" Class Schedule "),
                  (e(!0), a(u, null, f(h.value, (s) => (e(), a(u, {
                    key: s.serviceKey
                  }, [
                    S("admin_classes_calendar", "site", s.serviceKey) ? (e(), a("span", ve, k(s.name), 1)) : n("", !0)
                  ], 64))), 128))
                ], 2),
                K(l("div", pe, [
                  (e(!0), a(u, null, f(h.value, (s) => (e(), R(o, {
                    key: s.serviceKey,
                    class: "dropdown-item",
                    to: { name: "admin_classes_calendar", params: { site: s.serviceKey } }
                  }, {
                    default: c(() => [
                      t(" Class Schedule " + k(s.name), 1)
                    ]),
                    _: 2
                  }, 1032, ["to"]))), 128))
                ], 512), [
                  [L, w.value === "classSchedule"]
                ])
              ])) : n("", !0),
              _() ? (e(), a("li", ke, [
                l("a", {
                  class: i(["nav-link dropdown-toggle", { active: y(p).name === "admin_class_schedule_config" }]),
                  href: "#",
                  onClick: v[2] || (v[2] = C((s) => A("classScheduleConfig"), ["prevent"]))
                }, [
                  t(" Class Schedule Config "),
                  (e(!0), a(u, null, f(h.value, (s) => (e(), a(u, {
                    key: s.serviceKey
                  }, [
                    S("admin_class_schedule_config", "site", s.serviceKey) ? (e(), a("span", fe, k(s.name), 1)) : n("", !0)
                  ], 64))), 128))
                ], 2),
                K(l("div", ye, [
                  (e(!0), a(u, null, f(h.value, (s) => (e(), R(o, {
                    key: s.serviceKey,
                    class: "dropdown-item",
                    to: { name: "admin_class_schedule_config", params: { site: s.serviceKey } }
                  }, {
                    default: c(() => [
                      t(" Class Schedule Config " + k(s.name), 1)
                    ]),
                    _: 2
                  }, 1032, ["to"]))), 128))
                ], 512), [
                  [L, w.value === "classScheduleConfig"]
                ])
              ])) : n("", !0),
              _() ? (e(), a("li", he, [
                r(o, {
                  class: i(["nav-link", { active: d("admin_session_types") }]),
                  to: { name: "admin_session_types" }
                }, {
                  default: c(() => [
                    t(" Session Types ")
                  ]),
                  _: 1
                }, 8, ["class"])
              ])) : n("", !0),
              _() ? (e(), a("li", ge, [
                r(o, {
                  class: i(["nav-link", { active: d("admin_instructor_profiles") }]),
                  to: { name: "admin_instructor_profiles" }
                }, {
                  default: c(() => [
                    t(" Instructor Profiles ")
                  ]),
                  _: 1
                }, 8, ["class"])
              ])) : n("", !0),
              _() ? (e(), a("li", we, [
                l("a", {
                  class: i(["nav-link dropdown-toggle", { active: y(p).name === "admin_room_layout_list" }]),
                  href: "#",
                  onClick: v[3] || (v[3] = C((s) => A("roomLayout"), ["prevent"]))
                }, [
                  t(" Room Layout Config "),
                  (e(!0), a(u, null, f(h.value, (s) => (e(), a(u, {
                    key: s.serviceKey
                  }, [
                    S("admin_room_layout_list", "site", s.serviceKey) ? (e(), a("span", Ce, k(s.name), 1)) : n("", !0)
                  ], 64))), 128))
                ], 2),
                K(l("div", be, [
                  (e(!0), a(u, null, f(h.value, (s) => (e(), R(o, {
                    key: s.serviceKey,
                    class: "dropdown-item",
                    to: { name: "admin_room_layout_list", params: { site: s.serviceKey } }
                  }, {
                    default: c(() => [
                      t(" Room Layout Config " + k(s.name), 1)
                    ]),
                    _: 2
                  }, 1032, ["to"]))), 128))
                ], 512), [
                  [L, w.value === "roomLayout"]
                ])
              ])) : n("", !0),
              _() ? (e(), a("li", Se, [
                r(o, {
                  class: i(["nav-link", { active: d("admin_mindbody_staff") }]),
                  to: { name: "admin_mindbody_staff" }
                }, {
                  default: c(() => [
                    t(" Staff ")
                  ]),
                  _: 1
                }, 8, ["class"])
              ])) : n("", !0),
              _() ? (e(), a("li", Ae, [
                r(o, {
                  class: i(["nav-link", { active: d("admin_settings") }]),
                  to: { name: "admin_settings" }
                }, {
                  default: c(() => [
                    t(" Settings ")
                  ]),
                  _: 1
                }, 8, ["class"])
              ])) : n("", !0),
              $() ? (e(), a("li", Ke, [
                r(o, {
                  class: i(["nav-link", { active: d("admin_blacklisted_phones") }]),
                  to: { name: "admin_blacklisted_phones" }
                }, {
                  default: c(() => [
                    t(" Blacklisted phones ")
                  ]),
                  _: 1
                }, 8, ["class"])
              ])) : n("", !0),
              _() ? (e(), a("li", Le, [
                r(o, {
                  class: i(["nav-link", { active: d("admin_users") }]),
                  to: { name: "admin_users" }
                }, {
                  default: c(() => [
                    t(" Admins ")
                  ]),
                  _: 1
                }, 8, ["class"])
              ])) : n("", !0),
              l("li", Re, [
                r(o, {
                  class: i(["nav-link", { active: d("admin_my_settings") }]),
                  to: { name: "admin_my_settings" }
                }, {
                  default: c(() => [
                    t(" My Settings ")
                  ]),
                  _: 1
                }, 8, ["class"])
              ]),
              l("li", xe, [
                l("a", {
                  class: "nav-link",
                  href: "#",
                  onClick: v[4] || (v[4] = C((s) => y(b).toggleTheme(), ["prevent"]))
                }, [
                  l("i", {
                    class: i(y(b).isDark ? "bi bi-sun-fill" : "bi bi-moon-stars-fill")
                  }, null, 2),
                  t(" " + k(y(b).isDark ? "Light Mode" : "Dark Mode"), 1)
                ])
              ]),
              l("li", De, [
                l("a", {
                  class: "nav-link",
                  href: "#",
                  onClick: C(F, ["prevent"])
                }, "Logout", 8, Te)
              ])
            ])
          ]),
          l("main", $e, [
            r(Z),
            r(O)
          ])
        ])
      ]);
    };
  }
});
const Ne = /* @__PURE__ */ V(Me, [["__scopeId", "data-v-328b2fc3"]]);
export {
  Ne as default
};
