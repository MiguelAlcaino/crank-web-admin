import { d as O, o as e, b as s, F as v, h, A as i, B as t, t as k, e as c, g as p, y as U, G as z, H, c as N, I as W, r as j, J as B, k as r, K as l, j as o, w as b, f as x, L as D, R, M as E, D as I } from "./index.953ee91d.js";
import { u as J } from "./useAvailableSites.504908c4.js";
import { u as Q } from "./useToast.65cfc904.js";
import { u as X } from "./themeStore.c9125d85.js";
const Y = { class: "toast-container" }, Z = ["onClick"], ee = /* @__PURE__ */ O({
  __name: "AdminToast",
  setup(V) {
    const f = Q();
    function C(A) {
      return {
        success: "alert-success",
        error: "alert-danger",
        warning: "alert-warning",
        info: "alert-info"
      }[A] || "alert-info";
    }
    return (A, L) => (e(), s("div", Y, [
      (e(!0), s(v, null, h(p(f).messages.value, (g) => (e(), s("div", {
        key: g.id,
        class: i(["alert", C(g.type)]),
        role: "alert"
      }, [
        t(k(g.message) + " ", 1),
        c("button", {
          type: "button",
          class: "btn-close",
          "aria-label": "Close",
          onClick: (M) => p(f).remove(g.id)
        }, null, 8, Z)
      ], 2))), 128))
    ]));
  }
});
const se = /* @__PURE__ */ U(ee, [["__scopeId", "data-v-bb686ea1"]]), ae = { class: "container-fluid" }, te = { class: "row" }, ne = {
  style: { "font-size": "14px" },
  class: "col-sm-3 col-md-2 d-none d-sm-block sidebar"
}, oe = { class: "nav nav-pills flex-column" }, ie = {
  key: 0,
  class: "nav-item"
}, le = {
  key: 1,
  class: "nav-item"
}, ce = { key: 0 }, re = { class: "dropdown-menu show" }, _e = {
  key: 2,
  class: "nav-item"
}, de = {
  key: 3,
  class: "nav-item"
}, ue = {
  key: 4,
  class: "nav-item"
}, me = {
  key: 5,
  class: "nav-item"
}, ve = {
  key: 6,
  class: "nav-item"
}, fe = {
  key: 7,
  class: "nav-item"
}, ke = { key: 0 }, pe = { class: "dropdown-menu show" }, ye = {
  key: 8,
  class: "nav-item"
}, he = {
  key: 9,
  class: "nav-item"
}, ge = {
  key: 10,
  class: "nav-item"
}, Ce = {
  key: 11,
  class: "nav-item"
}, we = { key: 0 }, be = { class: "dropdown-menu show" }, Se = {
  key: 12,
  class: "nav-item"
}, Re = {
  key: 13,
  class: "nav-item"
}, Ae = {
  key: 14,
  class: "nav-item"
}, Le = {
  key: 15,
  class: "nav-item"
}, Ke = { class: "nav-item" }, Te = { class: "nav-item" }, xe = { class: "nav-item" }, De = ["onClick"], Ee = {
  role: "main",
  class: "col-sm-9 ms-sm-auto col-md-10 pt-3"
}, Ie = /* @__PURE__ */ O({
  __name: "AdminLayout",
  setup(V) {
    const f = z(), C = X(), L = H("https://payments.crank-fit.com/api/graphql/"), { sites: g, fetchSites: M } = J(L);
    N(() => I.getUser());
    const y = N(
      () => g.value.map((u) => ({ serviceKey: u.code, name: u.name }))
    );
    W(M);
    function S(u) {
      return I.userHasRole(u);
    }
    function d() {
      return S(R.ROLE_SUPER_ADMIN);
    }
    function P() {
      return S(R.ROLE_STAFF) || S(R.ROLE_SUPER_ADMIN);
    }
    function F() {
      return S(R.ROLE_INSTRUCTOR);
    }
    function _(u) {
      return f.name === u;
    }
    function K(u, m, n) {
      return f.name === u && f.params[m] === n;
    }
    const w = j(null);
    function T(u) {
      w.value = w.value === u ? null : u;
    }
    async function q() {
      await I.logout();
    }
    return (u, m) => {
      var $;
      const n = B("RouterLink"), G = B("RouterView");
      return e(), s("div", ae, [
        c("div", te, [
          c("nav", ne, [
            c("ul", oe, [
              d() ? (e(), s("li", ie, [
                r(n, {
                  class: i(["nav-link", { active: _("admin_transactions") }]),
                  to: { name: "admin_transactions" }
                }, {
                  default: l(() => [
                    t(" Transactions ")
                  ]),
                  _: 1
                }, 8, ["class"])
              ])) : o("", !0),
              d() ? (e(), s("li", le, [
                c("a", {
                  class: i(["nav-link dropdown-toggle", { active: p(f).name === "admin_class_packages" }]),
                  href: "#",
                  onClick: m[0] || (m[0] = b((a) => T("packages"), ["prevent"]))
                }, [
                  t(" Packages "),
                  (e(!0), s(v, null, h(y.value, (a) => (e(), s(v, {
                    key: a.serviceKey
                  }, [
                    K("admin_class_packages", "site", a.serviceKey) ? (e(), s("span", ce, k(a.name), 1)) : o("", !0)
                  ], 64))), 128))
                ], 2),
                x(c("div", re, [
                  (e(!0), s(v, null, h(y.value, (a) => (e(), E(n, {
                    key: a.serviceKey,
                    class: "dropdown-item",
                    to: { name: "admin_class_packages", params: { site: a.serviceKey } }
                  }, {
                    default: l(() => [
                      t(" Packages " + k(a.name), 1)
                    ]),
                    _: 2
                  }, 1032, ["to"]))), 128))
                ], 512), [
                  [D, w.value === "packages"]
                ])
              ])) : o("", !0),
              d() ? (e(), s("li", _e, [
                r(n, {
                  class: i(["nav-link", { active: _("admin_customer_gift_cards") }]),
                  to: { name: "admin_customer_gift_cards" }
                }, {
                  default: l(() => [
                    t(" Pending Gift Cards ")
                  ]),
                  _: 1
                }, 8, ["class"])
              ])) : o("", !0),
              d() ? (e(), s("li", de, [
                r(n, {
                  class: i(["nav-link", { active: _("admin_gift_cards") }]),
                  to: { name: "admin_gift_cards" }
                }, {
                  default: l(() => [
                    t(" Gift Card ")
                  ]),
                  _: 1
                }, 8, ["class"])
              ])) : o("", !0),
              d() ? (e(), s("li", ue, [
                r(n, {
                  class: i(["nav-link", { active: _("admin_payment_links") }]),
                  to: { name: "admin_payment_links" }
                }, {
                  default: l(() => [
                    t(" Payment link ")
                  ]),
                  _: 1
                }, 8, ["class"])
              ])) : o("", !0),
              d() ? (e(), s("li", me, [
                r(n, {
                  class: i(["nav-link", { active: _("admin_webhook_events") }]),
                  to: { name: "admin_webhook_events" }
                }, {
                  default: l(() => [
                    t(" Webhook Events ")
                  ]),
                  _: 1
                }, 8, ["class"])
              ])) : o("", !0),
              P() ? (e(), s("li", ve, [
                r(n, {
                  class: i(["nav-link", { active: _("admin_customers") }]),
                  to: { name: "admin_customers" }
                }, {
                  default: l(() => [
                    t(" Clients ")
                  ]),
                  _: 1
                }, 8, ["class"])
              ])) : o("", !0),
              d() ? (e(), s("li", fe, [
                c("a", {
                  class: i(["nav-link dropdown-toggle", { active: p(f).name === "admin_class_schedule_config" }]),
                  href: "#",
                  onClick: m[1] || (m[1] = b((a) => T("classScheduleConfig"), ["prevent"]))
                }, [
                  t(" Class Schedule Config "),
                  (e(!0), s(v, null, h(y.value, (a) => (e(), s(v, {
                    key: a.serviceKey
                  }, [
                    K("admin_class_schedule_config", "site", a.serviceKey) ? (e(), s("span", ke, k(a.name), 1)) : o("", !0)
                  ], 64))), 128))
                ], 2),
                x(c("div", pe, [
                  (e(!0), s(v, null, h(y.value, (a) => (e(), E(n, {
                    key: a.serviceKey,
                    class: "dropdown-item",
                    to: { name: "admin_class_schedule_config", params: { site: a.serviceKey } }
                  }, {
                    default: l(() => [
                      t(" Class Schedule Config " + k(a.name), 1)
                    ]),
                    _: 2
                  }, 1032, ["to"]))), 128))
                ], 512), [
                  [D, w.value === "classScheduleConfig"]
                ])
              ])) : o("", !0),
              d() ? (e(), s("li", ye, [
                r(n, {
                  class: i(["nav-link", { active: _("admin_session_types") }]),
                  to: { name: "admin_session_types" }
                }, {
                  default: l(() => [
                    t(" Session Types ")
                  ]),
                  _: 1
                }, 8, ["class"])
              ])) : o("", !0),
              d() ? (e(), s("li", he, [
                r(n, {
                  class: i(["nav-link", { active: _("admin_instructor_profiles") }]),
                  to: { name: "admin_instructor_profiles" }
                }, {
                  default: l(() => [
                    t(" Instructor Profiles ")
                  ]),
                  _: 1
                }, 8, ["class"])
              ])) : o("", !0),
              F() ? (e(), s("li", ge, [
                r(n, {
                  class: i(["nav-link", { active: _("admin_classes_calendar") }]),
                  to: { name: "admin_classes_calendar", params: { site: (($ = y.value[0]) == null ? void 0 : $.serviceKey) || "dubai" } }
                }, {
                  default: l(() => [
                    t(" Class Schedule ")
                  ]),
                  _: 1
                }, 8, ["class", "to"])
              ])) : o("", !0),
              d() ? (e(), s("li", Ce, [
                c("a", {
                  class: i(["nav-link dropdown-toggle", { active: p(f).name === "admin_room_layout_list" }]),
                  href: "#",
                  onClick: m[2] || (m[2] = b((a) => T("roomLayout"), ["prevent"]))
                }, [
                  t(" Room Layout Config "),
                  (e(!0), s(v, null, h(y.value, (a) => (e(), s(v, {
                    key: a.serviceKey
                  }, [
                    K("admin_room_layout_list", "site", a.serviceKey) ? (e(), s("span", we, k(a.name), 1)) : o("", !0)
                  ], 64))), 128))
                ], 2),
                x(c("div", be, [
                  (e(!0), s(v, null, h(y.value, (a) => (e(), E(n, {
                    key: a.serviceKey,
                    class: "dropdown-item",
                    to: { name: "admin_room_layout_list", params: { site: a.serviceKey } }
                  }, {
                    default: l(() => [
                      t(" Room Layout Config " + k(a.name), 1)
                    ]),
                    _: 2
                  }, 1032, ["to"]))), 128))
                ], 512), [
                  [D, w.value === "roomLayout"]
                ])
              ])) : o("", !0),
              d() ? (e(), s("li", Se, [
                r(n, {
                  class: i(["nav-link", { active: _("admin_mindbody_staff") }]),
                  to: { name: "admin_mindbody_staff" }
                }, {
                  default: l(() => [
                    t(" Staff ")
                  ]),
                  _: 1
                }, 8, ["class"])
              ])) : o("", !0),
              d() ? (e(), s("li", Re, [
                r(n, {
                  class: i(["nav-link", { active: _("admin_settings") }]),
                  to: { name: "admin_settings" }
                }, {
                  default: l(() => [
                    t(" Settings ")
                  ]),
                  _: 1
                }, 8, ["class"])
              ])) : o("", !0),
              P() ? (e(), s("li", Ae, [
                r(n, {
                  class: i(["nav-link", { active: _("admin_blacklisted_phones") }]),
                  to: { name: "admin_blacklisted_phones" }
                }, {
                  default: l(() => [
                    t(" Blacklisted phones ")
                  ]),
                  _: 1
                }, 8, ["class"])
              ])) : o("", !0),
              d() ? (e(), s("li", Le, [
                r(n, {
                  class: i(["nav-link", { active: _("admin_users") }]),
                  to: { name: "admin_users" }
                }, {
                  default: l(() => [
                    t(" Admins ")
                  ]),
                  _: 1
                }, 8, ["class"])
              ])) : o("", !0),
              c("li", Ke, [
                r(n, {
                  class: i(["nav-link", { active: _("admin_my_settings") }]),
                  to: { name: "admin_my_settings" }
                }, {
                  default: l(() => [
                    t(" My Settings ")
                  ]),
                  _: 1
                }, 8, ["class"])
              ]),
              c("li", Te, [
                c("a", {
                  class: "nav-link",
                  href: "#",
                  onClick: m[3] || (m[3] = b((a) => p(C).toggleTheme(), ["prevent"]))
                }, [
                  c("i", {
                    class: i(p(C).isDark ? "bi bi-sun-fill" : "bi bi-moon-stars-fill")
                  }, null, 2),
                  t(" " + k(p(C).isDark ? "Light Mode" : "Dark Mode"), 1)
                ])
              ]),
              c("li", xe, [
                c("a", {
                  class: "nav-link",
                  href: "#",
                  onClick: b(q, ["prevent"])
                }, "Logout", 8, De)
              ])
            ])
          ]),
          c("main", Ee, [
            r(se),
            r(G)
          ])
        ])
      ]);
    };
  }
});
const Be = /* @__PURE__ */ U(Ie, [["__scopeId", "data-v-00c45439"]]);
export {
  Be as default
};
