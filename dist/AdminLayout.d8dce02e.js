import { d as U, o as e, b as s, F as k, h, A as l, B as i, t as p, e as _, g as y, y as F, G as H, H as W, c as E, I as j, r as I, J, K as V, k as r, L as c, j as n, w as S, f as T, M, R as N, N as P, D as $ } from "./index.16c8b1f0.js";
import { u as Q } from "./useAvailableSites.be091d6a.js";
import { u as X } from "./useToast.8d180b49.js";
import { u as Y } from "./themeStore.a0dee76d.js";
const Z = { class: "toast-container" }, ee = ["onClick"], se = /* @__PURE__ */ U({
  __name: "AdminToast",
  setup(O) {
    const v = X();
    function C(A) {
      return {
        success: "alert-success",
        error: "alert-danger",
        warning: "alert-warning",
        info: "alert-info"
      }[A] || "alert-info";
    }
    return (A, R) => (e(), s("div", Z, [
      (e(!0), s(k, null, h(y(v).messages.value, (g) => (e(), s("div", {
        key: g.id,
        class: l(["alert", C(g.type)]),
        role: "alert"
      }, [
        i(p(g.message) + " ", 1),
        _("button", {
          type: "button",
          class: "btn-close",
          "aria-label": "Close",
          onClick: (B) => y(v).remove(g.id)
        }, null, 8, ee)
      ], 2))), 128))
    ]));
  }
});
const ae = /* @__PURE__ */ F(se, [["__scopeId", "data-v-bb686ea1"]]), te = { class: "container-fluid" }, ne = { class: "layout-row" }, ie = { class: "nav nav-pills flex-column" }, le = { class: "nav-item" }, oe = {
  key: 0,
  class: "nav-item"
}, ce = {
  key: 1,
  class: "nav-item"
}, re = {
  key: 2,
  class: "nav-item"
}, _e = {
  key: 3,
  class: "nav-item"
}, de = { key: 0 }, ue = { class: "dropdown-menu show" }, me = {
  key: 4,
  class: "nav-item"
}, ve = { key: 0 }, fe = { class: "dropdown-menu show" }, ke = {
  key: 5,
  class: "nav-item"
}, pe = { key: 0 }, ye = { class: "dropdown-menu show" }, he = {
  key: 6,
  class: "nav-item"
}, ge = {
  key: 7,
  class: "nav-item"
}, be = {
  key: 8,
  class: "nav-item"
}, Ce = {
  key: 9,
  class: "nav-item"
}, we = {
  key: 10,
  class: "nav-item"
}, Se = {
  key: 11,
  class: "nav-item"
}, Ae = {
  key: 12,
  class: "nav-item"
}, Re = {
  key: 13,
  class: "nav-item"
}, Le = {
  key: 14,
  class: "nav-item"
}, Ke = {
  key: 15,
  class: "nav-item"
}, xe = {
  key: 16,
  class: "nav-item"
}, De = {
  key: 17,
  class: "nav-item"
}, Te = {
  key: 18,
  class: "nav-item"
}, Me = {
  key: 19,
  class: "nav-item"
}, Ne = {
  key: 20,
  class: "nav-item"
}, Pe = ["onClick"], $e = {
  role: "main",
  class: "main-content pt-3"
}, Be = /* @__PURE__ */ U({
  __name: "AdminLayout",
  setup(O) {
    const v = H(), C = Y(), R = W("https://payments.crank-fit.com/api/graphql/"), { sites: g, fetchSites: B } = Q(R);
    E(() => $.getUser());
    const b = E(
      () => g.value.map((m) => ({ serviceKey: m.code, name: m.name }))
    );
    j(B);
    function L(m) {
      return $.userHasRole(m);
    }
    function u() {
      return L(N.ROLE_SUPER_ADMIN);
    }
    function K() {
      return L(N.ROLE_STAFF) || L(N.ROLE_SUPER_ADMIN);
    }
    function d(m) {
      return v.name === m;
    }
    function x(m, f, o) {
      return v.name === m && v.params[f] === o;
    }
    const w = I(null);
    function D(m) {
      w.value = w.value === m ? null : m;
    }
    const a = I(!1);
    J(
      () => v.name,
      (m) => {
        m === "admin_classes_calendar" ? a.value = !0 : a.value = !1;
      },
      { immediate: !0 }
    );
    function q() {
      a.value = !a.value;
    }
    async function G() {
      await $.logout();
    }
    return (m, f) => {
      const o = V("RouterLink"), z = V("RouterView");
      return e(), s("div", te, [
        _("div", ne, [
          _("nav", {
            style: { "font-size": "14px" },
            class: l(["sidebar d-none d-sm-block", { collapsed: a.value }])
          }, [
            _("ul", ie, [
              _("li", le, [
                _("button", {
                  class: "sidebar-toggle nav-link",
                  onClick: q
                }, [
                  _("i", {
                    class: l(a.value ? "bi bi-chevron-right" : "bi bi-chevron-left")
                  }, null, 2)
                ])
              ]),
              K() && !a.value ? (e(), s("li", oe, [
                r(o, {
                  class: l(["nav-link", { active: d("admin_customers") }]),
                  to: { name: "admin_customers" }
                }, {
                  default: c(() => [
                    i(" Clients ")
                  ]),
                  _: 1
                }, 8, ["class"])
              ])) : n("", !0),
              K() && !a.value ? (e(), s("li", ce, [
                r(o, {
                  class: l(["nav-link", { active: d("admin_classes_calendar") }]),
                  to: { name: "admin_classes_calendar" }
                }, {
                  default: c(() => [
                    i(" Class Schedule ")
                  ]),
                  _: 1
                }, 8, ["class"])
              ])) : n("", !0),
              u() && !a.value ? (e(), s("li", re, [
                r(o, {
                  class: l(["nav-link", { active: d("admin_transactions") }]),
                  to: { name: "admin_transactions" }
                }, {
                  default: c(() => [
                    i(" Transactions ")
                  ]),
                  _: 1
                }, 8, ["class"])
              ])) : n("", !0),
              u() && !a.value ? (e(), s("li", _e, [
                _("a", {
                  class: l(["nav-link dropdown-toggle", { active: y(v).name === "admin_class_schedule_config" }]),
                  href: "#",
                  onClick: f[0] || (f[0] = S((t) => D("classScheduleConfig"), ["prevent"]))
                }, [
                  i(" Class Schedule Config "),
                  (e(!0), s(k, null, h(b.value, (t) => (e(), s(k, {
                    key: t.serviceKey
                  }, [
                    x("admin_class_schedule_config", "site", t.serviceKey) ? (e(), s("span", de, p(t.name), 1)) : n("", !0)
                  ], 64))), 128))
                ], 2),
                T(_("div", ue, [
                  (e(!0), s(k, null, h(b.value, (t) => (e(), P(o, {
                    key: t.serviceKey,
                    class: "dropdown-item",
                    to: { name: "admin_class_schedule_config", params: { site: t.serviceKey } }
                  }, {
                    default: c(() => [
                      i(" Class Schedule Config " + p(t.name), 1)
                    ]),
                    _: 2
                  }, 1032, ["to"]))), 128))
                ], 512), [
                  [M, w.value === "classScheduleConfig"]
                ])
              ])) : n("", !0),
              u() && !a.value ? (e(), s("li", me, [
                _("a", {
                  class: l(["nav-link dropdown-toggle", { active: y(v).name === "admin_room_layout_list" }]),
                  href: "#",
                  onClick: f[1] || (f[1] = S((t) => D("roomLayout"), ["prevent"]))
                }, [
                  i(" Room Layout Config "),
                  (e(!0), s(k, null, h(b.value, (t) => (e(), s(k, {
                    key: t.serviceKey
                  }, [
                    x("admin_room_layout_list", "site", t.serviceKey) ? (e(), s("span", ve, p(t.name), 1)) : n("", !0)
                  ], 64))), 128))
                ], 2),
                T(_("div", fe, [
                  (e(!0), s(k, null, h(b.value, (t) => (e(), P(o, {
                    key: t.serviceKey,
                    class: "dropdown-item",
                    to: { name: "admin_room_layout_list", params: { site: t.serviceKey } }
                  }, {
                    default: c(() => [
                      i(" Room Layout Config " + p(t.name), 1)
                    ]),
                    _: 2
                  }, 1032, ["to"]))), 128))
                ], 512), [
                  [M, w.value === "roomLayout"]
                ])
              ])) : n("", !0),
              u() && !a.value ? (e(), s("li", ke, [
                _("a", {
                  class: l(["nav-link dropdown-toggle", { active: y(v).name === "admin_class_packages" }]),
                  href: "#",
                  onClick: f[2] || (f[2] = S((t) => D("packages"), ["prevent"]))
                }, [
                  i(" Packages "),
                  (e(!0), s(k, null, h(b.value, (t) => (e(), s(k, {
                    key: t.serviceKey
                  }, [
                    x("admin_class_packages", "site", t.serviceKey) ? (e(), s("span", pe, p(t.name), 1)) : n("", !0)
                  ], 64))), 128))
                ], 2),
                T(_("div", ye, [
                  (e(!0), s(k, null, h(b.value, (t) => (e(), P(o, {
                    key: t.serviceKey,
                    class: "dropdown-item",
                    to: { name: "admin_class_packages", params: { site: t.serviceKey } }
                  }, {
                    default: c(() => [
                      i(" Packages " + p(t.name), 1)
                    ]),
                    _: 2
                  }, 1032, ["to"]))), 128))
                ], 512), [
                  [M, w.value === "packages"]
                ])
              ])) : n("", !0),
              u() && !a.value ? (e(), s("li", he, [
                r(o, {
                  class: l(["nav-link", { active: d("admin_gift_cards") }]),
                  to: { name: "admin_gift_cards" }
                }, {
                  default: c(() => [
                    i(" Gift Card ")
                  ]),
                  _: 1
                }, 8, ["class"])
              ])) : n("", !0),
              u() && !a.value ? (e(), s("li", ge, [
                r(o, {
                  class: l(["nav-link", { active: d("admin_customer_gift_cards") }]),
                  to: { name: "admin_customer_gift_cards" }
                }, {
                  default: c(() => [
                    i(" Pending Gift Cards ")
                  ]),
                  _: 1
                }, 8, ["class"])
              ])) : n("", !0),
              u() && !a.value ? (e(), s("li", be, [
                r(o, {
                  class: l(["nav-link", { active: d("admin_payment_links") }]),
                  to: { name: "admin_payment_links" }
                }, {
                  default: c(() => [
                    i(" Payment link ")
                  ]),
                  _: 1
                }, 8, ["class"])
              ])) : n("", !0),
              u() && !a.value ? (e(), s("li", Ce, [
                r(o, {
                  class: l(["nav-link", { active: d("admin_session_types") }]),
                  to: { name: "admin_session_types" }
                }, {
                  default: c(() => [
                    i(" Session Types ")
                  ]),
                  _: 1
                }, 8, ["class"])
              ])) : n("", !0),
              u() && !a.value ? (e(), s("li", we, [
                r(o, {
                  class: l(["nav-link", { active: d("admin_instructor_profiles") }]),
                  to: { name: "admin_instructor_profiles" }
                }, {
                  default: c(() => [
                    i(" Instructor Profiles ")
                  ]),
                  _: 1
                }, 8, ["class"])
              ])) : n("", !0),
              u() && !a.value ? (e(), s("li", Se, [
                r(o, {
                  class: l(["nav-link", { active: d("admin_mindbody_staff") }]),
                  to: { name: "admin_mindbody_staff" }
                }, {
                  default: c(() => [
                    i(" Staff ")
                  ]),
                  _: 1
                }, 8, ["class"])
              ])) : n("", !0),
              u() && !a.value ? (e(), s("li", Ae, [
                r(o, {
                  class: l(["nav-link", { active: d("admin_webhook_events") }]),
                  to: { name: "admin_webhook_events" }
                }, {
                  default: c(() => [
                    i(" Webhook Events ")
                  ]),
                  _: 1
                }, 8, ["class"])
              ])) : n("", !0),
              u() && !a.value ? (e(), s("li", Re, [
                r(o, {
                  class: l(["nav-link", { active: d("admin_users") }]),
                  to: { name: "admin_users" }
                }, {
                  default: c(() => [
                    i(" Admins ")
                  ]),
                  _: 1
                }, 8, ["class"])
              ])) : n("", !0),
              u() && !a.value ? (e(), s("li", Le, [
                r(o, {
                  class: l(["nav-link", { active: d("admin_settings") }]),
                  to: { name: "admin_settings" }
                }, {
                  default: c(() => [
                    i(" Settings ")
                  ]),
                  _: 1
                }, 8, ["class"])
              ])) : n("", !0),
              u() && !a.value ? (e(), s("li", Ke, [
                r(o, {
                  class: l(["nav-link", { active: d("admin_send_notification") }]),
                  to: { name: "admin_send_notification" }
                }, {
                  default: c(() => [
                    i(" Send Notification ")
                  ]),
                  _: 1
                }, 8, ["class"])
              ])) : n("", !0),
              a.value ? n("", !0) : (e(), s("li", xe, [
                r(o, {
                  class: l(["nav-link", { active: d("admin_my_settings") }]),
                  to: { name: "admin_my_settings" }
                }, {
                  default: c(() => [
                    i(" My Settings ")
                  ]),
                  _: 1
                }, 8, ["class"])
              ])),
              K() && !a.value ? (e(), s("li", De, [
                r(o, {
                  class: l(["nav-link", { active: d("admin_blacklisted_phones") }]),
                  to: { name: "admin_blacklisted_phones" }
                }, {
                  default: c(() => [
                    i(" Blacklisted phones ")
                  ]),
                  _: 1
                }, 8, ["class"])
              ])) : n("", !0),
              u() && !a.value ? (e(), s("li", Te, [
                r(o, {
                  class: l(["nav-link", { active: d("admin_mindbody_clients") }]),
                  to: { name: "admin_mindbody_clients" }
                }, {
                  default: c(() => [
                    i(" Report - MB Clients ")
                  ]),
                  _: 1
                }, 8, ["class"])
              ])) : n("", !0),
              a.value ? n("", !0) : (e(), s("li", Me, [
                _("a", {
                  class: "nav-link",
                  href: "#",
                  onClick: f[3] || (f[3] = S((t) => y(C).toggleTheme(), ["prevent"]))
                }, [
                  _("i", {
                    class: l(y(C).isDark ? "bi bi-sun-fill" : "bi bi-moon-stars-fill")
                  }, null, 2),
                  i(" " + p(y(C).isDark ? "Light Mode" : "Dark Mode"), 1)
                ])
              ])),
              a.value ? n("", !0) : (e(), s("li", Ne, [
                _("a", {
                  class: "nav-link",
                  href: "#",
                  onClick: S(G, ["prevent"])
                }, "Logout", 8, Pe)
              ]))
            ])
          ], 2),
          _("main", $e, [
            r(ae),
            r(z)
          ])
        ])
      ]);
    };
  }
});
const Fe = /* @__PURE__ */ F(Be, [["__scopeId", "data-v-e4162ed9"]]);
export {
  Fe as default
};
