import { d as N, o as e, b as s, F as u, h as f, A as i, B as t, t as p, e as l, g as y, y as V, G as q, H as G, c as E, I as z, r as H, J as I, k as r, K as c, j as n, w as C, f as K, L as R, R as $, M as L, D as P } from "./index.2ef5045a.js";
import { u as W } from "./useAvailableSites.a93eba1f.js";
import { u as j } from "./useToast.c2708cdf.js";
import { u as J } from "./themeStore.646a452b.js";
const Q = { class: "toast-container" }, X = ["onClick"], Y = /* @__PURE__ */ N({
  __name: "AdminToast",
  setup(U) {
    const k = j();
    function b(x) {
      return {
        success: "alert-success",
        error: "alert-danger",
        warning: "alert-warning",
        info: "alert-info"
      }[x] || "alert-info";
    }
    return (x, D) => (e(), s("div", Q, [
      (e(!0), s(u, null, f(y(k).messages.value, (g) => (e(), s("div", {
        key: g.id,
        class: i(["alert", b(g.type)]),
        role: "alert"
      }, [
        t(p(g.message) + " ", 1),
        l("button", {
          type: "button",
          class: "btn-close",
          "aria-label": "Close",
          onClick: (B) => y(k).remove(g.id)
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
}, _e = { key: 0 }, de = { class: "dropdown-menu show" }, ue = {
  key: 4,
  class: "nav-item"
}, me = { key: 0 }, ve = { class: "dropdown-menu show" }, ke = {
  key: 5,
  class: "nav-item"
}, pe = { key: 0 }, fe = { class: "dropdown-menu show" }, ye = {
  key: 6,
  class: "nav-item"
}, he = {
  key: 7,
  class: "nav-item"
}, ge = {
  key: 8,
  class: "nav-item"
}, we = {
  key: 9,
  class: "nav-item"
}, Ce = {
  key: 10,
  class: "nav-item"
}, be = {
  key: 11,
  class: "nav-item"
}, Se = {
  key: 12,
  class: "nav-item"
}, Ae = {
  key: 13,
  class: "nav-item"
}, Ke = {
  key: 14,
  class: "nav-item"
}, Re = { class: "nav-item" }, Le = {
  key: 15,
  class: "nav-item"
}, xe = {
  key: 16,
  class: "nav-item"
}, De = { class: "nav-item" }, Te = { class: "nav-item" }, Me = ["onClick"], $e = {
  role: "main",
  class: "col-sm-9 ms-sm-auto col-md-10 pt-3"
}, Pe = /* @__PURE__ */ N({
  __name: "AdminLayout",
  setup(U) {
    const k = q(), b = J(), D = G("https://payments.crank-fit.com/api/graphql/"), { sites: g, fetchSites: B } = W(D);
    E(() => P.getUser());
    const h = E(
      () => g.value.map((m) => ({ serviceKey: m.code, name: m.name }))
    );
    z(B);
    function T(m) {
      return P.userHasRole(m);
    }
    function _() {
      return T($.ROLE_SUPER_ADMIN);
    }
    function M() {
      return T($.ROLE_STAFF) || T($.ROLE_SUPER_ADMIN);
    }
    function d(m) {
      return k.name === m;
    }
    function S(m, v, o) {
      return k.name === m && k.params[v] === o;
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
      return e(), s("div", ee, [
        l("div", se, [
          l("nav", ae, [
            l("ul", te, [
              M() ? (e(), s("li", ne, [
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
              M() ? (e(), s("li", oe, [
                l("a", {
                  class: i(["nav-link dropdown-toggle", { active: y(k).name === "admin_classes_calendar" }]),
                  href: "#",
                  onClick: v[0] || (v[0] = C((a) => A("classSchedule"), ["prevent"]))
                }, [
                  t(" Class Schedule "),
                  (e(!0), s(u, null, f(h.value, (a) => (e(), s(u, {
                    key: a.serviceKey
                  }, [
                    S("admin_classes_calendar", "site", a.serviceKey) ? (e(), s("span", ie, p(a.name), 1)) : n("", !0)
                  ], 64))), 128))
                ], 2),
                K(l("div", le, [
                  (e(!0), s(u, null, f(h.value, (a) => (e(), L(o, {
                    key: a.serviceKey,
                    class: "dropdown-item",
                    to: { name: "admin_classes_calendar", params: { site: a.serviceKey } }
                  }, {
                    default: c(() => [
                      t(" Class Schedule " + p(a.name), 1)
                    ]),
                    _: 2
                  }, 1032, ["to"]))), 128))
                ], 512), [
                  [R, w.value === "classSchedule"]
                ])
              ])) : n("", !0),
              _() ? (e(), s("li", ce, [
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
              _() ? (e(), s("li", re, [
                l("a", {
                  class: i(["nav-link dropdown-toggle", { active: y(k).name === "admin_class_schedule_config" }]),
                  href: "#",
                  onClick: v[1] || (v[1] = C((a) => A("classScheduleConfig"), ["prevent"]))
                }, [
                  t(" Class Schedule Config "),
                  (e(!0), s(u, null, f(h.value, (a) => (e(), s(u, {
                    key: a.serviceKey
                  }, [
                    S("admin_class_schedule_config", "site", a.serviceKey) ? (e(), s("span", _e, p(a.name), 1)) : n("", !0)
                  ], 64))), 128))
                ], 2),
                K(l("div", de, [
                  (e(!0), s(u, null, f(h.value, (a) => (e(), L(o, {
                    key: a.serviceKey,
                    class: "dropdown-item",
                    to: { name: "admin_class_schedule_config", params: { site: a.serviceKey } }
                  }, {
                    default: c(() => [
                      t(" Class Schedule Config " + p(a.name), 1)
                    ]),
                    _: 2
                  }, 1032, ["to"]))), 128))
                ], 512), [
                  [R, w.value === "classScheduleConfig"]
                ])
              ])) : n("", !0),
              _() ? (e(), s("li", ue, [
                l("a", {
                  class: i(["nav-link dropdown-toggle", { active: y(k).name === "admin_room_layout_list" }]),
                  href: "#",
                  onClick: v[2] || (v[2] = C((a) => A("roomLayout"), ["prevent"]))
                }, [
                  t(" Room Layout Config "),
                  (e(!0), s(u, null, f(h.value, (a) => (e(), s(u, {
                    key: a.serviceKey
                  }, [
                    S("admin_room_layout_list", "site", a.serviceKey) ? (e(), s("span", me, p(a.name), 1)) : n("", !0)
                  ], 64))), 128))
                ], 2),
                K(l("div", ve, [
                  (e(!0), s(u, null, f(h.value, (a) => (e(), L(o, {
                    key: a.serviceKey,
                    class: "dropdown-item",
                    to: { name: "admin_room_layout_list", params: { site: a.serviceKey } }
                  }, {
                    default: c(() => [
                      t(" Room Layout Config " + p(a.name), 1)
                    ]),
                    _: 2
                  }, 1032, ["to"]))), 128))
                ], 512), [
                  [R, w.value === "roomLayout"]
                ])
              ])) : n("", !0),
              _() ? (e(), s("li", ke, [
                l("a", {
                  class: i(["nav-link dropdown-toggle", { active: y(k).name === "admin_class_packages" }]),
                  href: "#",
                  onClick: v[3] || (v[3] = C((a) => A("packages"), ["prevent"]))
                }, [
                  t(" Packages "),
                  (e(!0), s(u, null, f(h.value, (a) => (e(), s(u, {
                    key: a.serviceKey
                  }, [
                    S("admin_class_packages", "site", a.serviceKey) ? (e(), s("span", pe, p(a.name), 1)) : n("", !0)
                  ], 64))), 128))
                ], 2),
                K(l("div", fe, [
                  (e(!0), s(u, null, f(h.value, (a) => (e(), L(o, {
                    key: a.serviceKey,
                    class: "dropdown-item",
                    to: { name: "admin_class_packages", params: { site: a.serviceKey } }
                  }, {
                    default: c(() => [
                      t(" Packages " + p(a.name), 1)
                    ]),
                    _: 2
                  }, 1032, ["to"]))), 128))
                ], 512), [
                  [R, w.value === "packages"]
                ])
              ])) : n("", !0),
              _() ? (e(), s("li", ye, [
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
              _() ? (e(), s("li", he, [
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
              _() ? (e(), s("li", ge, [
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
              _() ? (e(), s("li", we, [
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
              _() ? (e(), s("li", Ce, [
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
              _() ? (e(), s("li", be, [
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
              _() ? (e(), s("li", Se, [
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
              _() ? (e(), s("li", Ae, [
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
              _() ? (e(), s("li", Ke, [
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
              M() ? (e(), s("li", Le, [
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
              _() ? (e(), s("li", xe, [
                r(o, {
                  class: i(["nav-link", { active: d("admin_mindbody_clients") }]),
                  to: { name: "admin_mindbody_clients" }
                }, {
                  default: c(() => [
                    t(" Report - MB Clients ")
                  ]),
                  _: 1
                }, 8, ["class"])
              ])) : n("", !0),
              l("li", De, [
                l("a", {
                  class: "nav-link",
                  href: "#",
                  onClick: v[4] || (v[4] = C((a) => y(b).toggleTheme(), ["prevent"]))
                }, [
                  l("i", {
                    class: i(y(b).isDark ? "bi bi-sun-fill" : "bi bi-moon-stars-fill")
                  }, null, 2),
                  t(" " + p(y(b).isDark ? "Light Mode" : "Dark Mode"), 1)
                ])
              ]),
              l("li", Te, [
                l("a", {
                  class: "nav-link",
                  href: "#",
                  onClick: C(F, ["prevent"])
                }, "Logout", 8, Me)
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
const Ve = /* @__PURE__ */ V(Pe, [["__scopeId", "data-v-d7f6569f"]]);
export {
  Ve as default
};
