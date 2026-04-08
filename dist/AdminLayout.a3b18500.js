import { d as V, o as e, b as s, F as m, h as k, D as i, A as t, t as y, e as _, g as w, p as G, l as z, y as B, E as H, G as W, c as O, H as j, r as J, I as U, k as c, J as l, j as o, w as R, f as I, K as T, R as A, L as E, C as $ } from "./index.cc2eb486.js";
import { u as Q } from "./useAvailableSites.d3fb7001.js";
import { u as X } from "./useToast.6a51987c.js";
const Y = (g) => (G("data-v-886607f6"), g = g(), z(), g), Z = { class: "toast-container" }, ee = ["onClick"], se = /* @__PURE__ */ Y(() => /* @__PURE__ */ _("span", { "aria-hidden": "true" }, "\xD7", -1)), ae = [
  se
], te = /* @__PURE__ */ V({
  __name: "AdminToast",
  setup(g) {
    const v = X();
    function D(S) {
      return {
        success: "alert-success",
        error: "alert-danger",
        warning: "alert-warning",
        info: "alert-info"
      }[S] || "alert-info";
    }
    return (S, L) => (e(), s("div", Z, [
      (e(!0), s(m, null, k(w(v).messages.value, (h) => (e(), s("div", {
        key: h.id,
        class: i(["alert", D(h.type)]),
        role: "alert"
      }, [
        t(y(h.message) + " ", 1),
        _("button", {
          type: "button",
          class: "close",
          "aria-label": "Close",
          onClick: (p) => w(v).remove(h.id)
        }, ae, 8, ee)
      ], 2))), 128))
    ]));
  }
});
const ne = /* @__PURE__ */ B(te, [["__scopeId", "data-v-886607f6"]]), oe = { class: "container-fluid" }, ie = { class: "row" }, le = {
  style: { "font-size": "14px" },
  class: "col-sm-3 col-md-2 d-none d-sm-block bg-light sidebar"
}, ce = { class: "nav nav-pills flex-column" }, _e = {
  key: 0,
  class: "nav-item"
}, re = {
  key: 1,
  class: "nav-item"
}, de = { key: 0 }, ue = { class: "dropdown-menu show" }, me = {
  key: 2,
  class: "nav-item"
}, ve = {
  key: 3,
  class: "nav-item"
}, pe = {
  key: 4,
  class: "nav-item"
}, fe = {
  key: 5,
  class: "nav-item"
}, ke = {
  key: 6,
  class: "nav-item"
}, ye = {
  key: 7,
  class: "nav-item"
}, he = { key: 0 }, ge = { class: "dropdown-menu show" }, Ce = {
  key: 8,
  class: "nav-item"
}, we = {
  key: 9,
  class: "nav-item"
}, Se = {
  key: 10,
  class: "nav-item"
}, be = {
  key: 11,
  class: "nav-item"
}, Re = { key: 0 }, Ae = { class: "dropdown-menu show" }, Le = {
  key: 12,
  class: "nav-item"
}, Ke = {
  key: 13,
  class: "nav-item"
}, xe = {
  key: 14,
  class: "nav-item"
}, Ie = {
  key: 15,
  class: "nav-item"
}, Te = { class: "nav-item" }, Ee = { class: "nav-item" }, $e = ["onClick"], De = {
  role: "main",
  class: "col-sm-9 ml-sm-auto col-md-10 pt-3"
}, Pe = /* @__PURE__ */ V({
  __name: "AdminLayout",
  setup(g) {
    const v = H(), S = W("https://payments.crank-fit.com/api/graphql/"), { sites: L, fetchSites: h } = Q(S);
    O(() => $.getUser());
    const p = O(
      () => L.value.map((u) => ({ serviceKey: u.code, name: u.name }))
    );
    j(h);
    function b(u) {
      return $.userHasRole(u);
    }
    function d() {
      return b(A.ROLE_SUPER_ADMIN);
    }
    function P() {
      return b(A.ROLE_STAFF) || b(A.ROLE_SUPER_ADMIN);
    }
    function M() {
      return b(A.ROLE_INSTRUCTOR);
    }
    function r(u) {
      return v.name === u;
    }
    function K(u, f, n) {
      return v.name === u && v.params[f] === n;
    }
    const C = J(null);
    function x(u) {
      C.value = C.value === u ? null : u;
    }
    async function F() {
      await $.logout();
    }
    return (u, f) => {
      var N;
      const n = U("RouterLink"), q = U("RouterView");
      return e(), s("div", oe, [
        _("div", ie, [
          _("nav", le, [
            _("ul", ce, [
              d() ? (e(), s("li", _e, [
                c(n, {
                  class: i(["nav-link", { active: r("admin_transactions") }]),
                  to: { name: "admin_transactions" }
                }, {
                  default: l(() => [
                    t(" Transactions ")
                  ]),
                  _: 1
                }, 8, ["class"])
              ])) : o("", !0),
              d() ? (e(), s("li", re, [
                _("a", {
                  class: i(["nav-link dropdown-toggle", { active: w(v).name === "admin_class_packages" }]),
                  href: "#",
                  onClick: f[0] || (f[0] = R((a) => x("packages"), ["prevent"]))
                }, [
                  t(" Packages "),
                  (e(!0), s(m, null, k(p.value, (a) => (e(), s(m, {
                    key: a.serviceKey
                  }, [
                    K("admin_class_packages", "site", a.serviceKey) ? (e(), s("span", de, y(a.name), 1)) : o("", !0)
                  ], 64))), 128))
                ], 2),
                I(_("div", ue, [
                  (e(!0), s(m, null, k(p.value, (a) => (e(), E(n, {
                    key: a.serviceKey,
                    class: "dropdown-item",
                    to: { name: "admin_class_packages", params: { site: a.serviceKey } }
                  }, {
                    default: l(() => [
                      t(" Packages " + y(a.name), 1)
                    ]),
                    _: 2
                  }, 1032, ["to"]))), 128))
                ], 512), [
                  [T, C.value === "packages"]
                ])
              ])) : o("", !0),
              d() ? (e(), s("li", me, [
                c(n, {
                  class: i(["nav-link", { active: r("admin_customer_gift_cards") }]),
                  to: { name: "admin_customer_gift_cards" }
                }, {
                  default: l(() => [
                    t(" Pending Gift Cards ")
                  ]),
                  _: 1
                }, 8, ["class"])
              ])) : o("", !0),
              d() ? (e(), s("li", ve, [
                c(n, {
                  class: i(["nav-link", { active: r("admin_gift_cards") }]),
                  to: { name: "admin_gift_cards" }
                }, {
                  default: l(() => [
                    t(" Gift Card ")
                  ]),
                  _: 1
                }, 8, ["class"])
              ])) : o("", !0),
              d() ? (e(), s("li", pe, [
                c(n, {
                  class: i(["nav-link", { active: r("admin_payment_links") }]),
                  to: { name: "admin_payment_links" }
                }, {
                  default: l(() => [
                    t(" Payment link ")
                  ]),
                  _: 1
                }, 8, ["class"])
              ])) : o("", !0),
              d() ? (e(), s("li", fe, [
                c(n, {
                  class: i(["nav-link", { active: r("admin_webhook_events") }]),
                  to: { name: "admin_webhook_events" }
                }, {
                  default: l(() => [
                    t(" Webhook Events ")
                  ]),
                  _: 1
                }, 8, ["class"])
              ])) : o("", !0),
              P() ? (e(), s("li", ke, [
                c(n, {
                  class: i(["nav-link", { active: r("admin_customers") }]),
                  to: { name: "admin_customers" }
                }, {
                  default: l(() => [
                    t(" Clients ")
                  ]),
                  _: 1
                }, 8, ["class"])
              ])) : o("", !0),
              d() ? (e(), s("li", ye, [
                _("a", {
                  class: i(["nav-link dropdown-toggle", { active: w(v).name === "admin_class_schedule_config" }]),
                  href: "#",
                  onClick: f[1] || (f[1] = R((a) => x("classScheduleConfig"), ["prevent"]))
                }, [
                  t(" Class Schedule Config "),
                  (e(!0), s(m, null, k(p.value, (a) => (e(), s(m, {
                    key: a.serviceKey
                  }, [
                    K("admin_class_schedule_config", "site", a.serviceKey) ? (e(), s("span", he, y(a.name), 1)) : o("", !0)
                  ], 64))), 128))
                ], 2),
                I(_("div", ge, [
                  (e(!0), s(m, null, k(p.value, (a) => (e(), E(n, {
                    key: a.serviceKey,
                    class: "dropdown-item",
                    to: { name: "admin_class_schedule_config", params: { site: a.serviceKey } }
                  }, {
                    default: l(() => [
                      t(" Class Schedule Config " + y(a.name), 1)
                    ]),
                    _: 2
                  }, 1032, ["to"]))), 128))
                ], 512), [
                  [T, C.value === "classScheduleConfig"]
                ])
              ])) : o("", !0),
              d() ? (e(), s("li", Ce, [
                c(n, {
                  class: i(["nav-link", { active: r("admin_session_types") }]),
                  to: { name: "admin_session_types" }
                }, {
                  default: l(() => [
                    t(" Session Types ")
                  ]),
                  _: 1
                }, 8, ["class"])
              ])) : o("", !0),
              d() ? (e(), s("li", we, [
                c(n, {
                  class: i(["nav-link", { active: r("admin_instructor_profiles") }]),
                  to: { name: "admin_instructor_profiles" }
                }, {
                  default: l(() => [
                    t(" Instructor Profiles ")
                  ]),
                  _: 1
                }, 8, ["class"])
              ])) : o("", !0),
              M() ? (e(), s("li", Se, [
                c(n, {
                  class: i(["nav-link", { active: r("admin_classes_calendar") }]),
                  to: { name: "admin_classes_calendar", params: { site: ((N = p.value[0]) == null ? void 0 : N.serviceKey) || "dubai" } }
                }, {
                  default: l(() => [
                    t(" Class Schedule ")
                  ]),
                  _: 1
                }, 8, ["class", "to"])
              ])) : o("", !0),
              d() ? (e(), s("li", be, [
                _("a", {
                  class: i(["nav-link dropdown-toggle", { active: w(v).name === "admin_room_layout_list" }]),
                  href: "#",
                  onClick: f[2] || (f[2] = R((a) => x("roomLayout"), ["prevent"]))
                }, [
                  t(" Room Layout Config "),
                  (e(!0), s(m, null, k(p.value, (a) => (e(), s(m, {
                    key: a.serviceKey
                  }, [
                    K("admin_room_layout_list", "site", a.serviceKey) ? (e(), s("span", Re, y(a.name), 1)) : o("", !0)
                  ], 64))), 128))
                ], 2),
                I(_("div", Ae, [
                  (e(!0), s(m, null, k(p.value, (a) => (e(), E(n, {
                    key: a.serviceKey,
                    class: "dropdown-item",
                    to: { name: "admin_room_layout_list", params: { site: a.serviceKey } }
                  }, {
                    default: l(() => [
                      t(" Room Layout Config " + y(a.name), 1)
                    ]),
                    _: 2
                  }, 1032, ["to"]))), 128))
                ], 512), [
                  [T, C.value === "roomLayout"]
                ])
              ])) : o("", !0),
              d() ? (e(), s("li", Le, [
                c(n, {
                  class: i(["nav-link", { active: r("admin_mindbody_staff") }]),
                  to: { name: "admin_mindbody_staff" }
                }, {
                  default: l(() => [
                    t(" Staff ")
                  ]),
                  _: 1
                }, 8, ["class"])
              ])) : o("", !0),
              d() ? (e(), s("li", Ke, [
                c(n, {
                  class: i(["nav-link", { active: r("admin_settings") }]),
                  to: { name: "admin_settings" }
                }, {
                  default: l(() => [
                    t(" Settings ")
                  ]),
                  _: 1
                }, 8, ["class"])
              ])) : o("", !0),
              P() ? (e(), s("li", xe, [
                c(n, {
                  class: i(["nav-link", { active: r("admin_blacklisted_phones") }]),
                  to: { name: "admin_blacklisted_phones" }
                }, {
                  default: l(() => [
                    t(" Blacklisted phones ")
                  ]),
                  _: 1
                }, 8, ["class"])
              ])) : o("", !0),
              d() ? (e(), s("li", Ie, [
                c(n, {
                  class: i(["nav-link", { active: r("admin_users") }]),
                  to: { name: "admin_users" }
                }, {
                  default: l(() => [
                    t(" Admins ")
                  ]),
                  _: 1
                }, 8, ["class"])
              ])) : o("", !0),
              _("li", Te, [
                c(n, {
                  class: i(["nav-link", { active: r("admin_my_settings") }]),
                  to: { name: "admin_my_settings" }
                }, {
                  default: l(() => [
                    t(" My Settings ")
                  ]),
                  _: 1
                }, 8, ["class"])
              ]),
              _("li", Ee, [
                _("a", {
                  class: "nav-link",
                  href: "#",
                  onClick: R(F, ["prevent"])
                }, "Logout", 8, $e)
              ])
            ])
          ]),
          _("main", De, [
            c(ne),
            c(q)
          ])
        ])
      ]);
    };
  }
});
const Ve = /* @__PURE__ */ B(Pe, [["__scopeId", "data-v-97fab483"]]);
export {
  Ve as default
};
