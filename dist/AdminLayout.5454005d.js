import { d as G, G as j, o as s, b as a, F as y, h as b, A as o, B as l, t as g, e as m, g as e, y as O, H as J, I as Q, J as X, c as E, K as Y, r as U, L as Z, M as V, k as u, N as d, j as i, w as A, f as R, O as M, R as N, P as r, Q as _, T, D as $ } from "./index.dde1f821.js";
import { u as ee } from "./themeStore.dfa86113.js";
const se = { class: "toast-container" }, ae = ["onClick"], te = /* @__PURE__ */ G({
  __name: "AdminToast",
  setup(q) {
    const h = j();
    function L(x) {
      return {
        success: "alert-success",
        error: "alert-danger",
        warning: "alert-warning",
        info: "alert-info"
      }[x] || "alert-info";
    }
    return (x, D) => (s(), a("div", se, [
      (s(!0), a(y, null, b(e(h).messages.value, (w) => (s(), a("div", {
        key: w.id,
        class: o(["alert", L(w.type)]),
        role: "alert"
      }, [
        l(g(w.message) + " ", 1),
        m("button", {
          type: "button",
          class: "btn-close",
          "aria-label": "Close",
          onClick: (B) => e(h).remove(w.id)
        }, null, 8, ae)
      ], 2))), 128))
    ]));
  }
});
const ne = /* @__PURE__ */ O(te, [["__scopeId", "data-v-bb686ea1"]]), ie = { class: "container-fluid" }, le = { class: "layout-row" }, oe = { class: "nav nav-pills flex-column" }, ce = { class: "nav-item" }, de = {
  key: 0,
  class: "nav-item"
}, re = {
  key: 1,
  class: "nav-item"
}, _e = {
  key: 2,
  class: "nav-item"
}, ue = {
  key: 3,
  class: "nav-item"
}, me = {
  key: 4,
  class: "nav-item"
}, ve = {
  key: 5,
  class: "nav-item"
}, ke = { key: 0 }, fe = { class: "dropdown-menu show" }, ye = {
  key: 6,
  class: "nav-item"
}, pe = { key: 0 }, he = { class: "dropdown-menu show" }, ge = {
  key: 7,
  class: "nav-item"
}, be = { key: 0 }, Ce = { class: "dropdown-menu show" }, we = {
  key: 8,
  class: "nav-item"
}, Se = { key: 0 }, Ae = { class: "dropdown-menu show" }, Le = {
  key: 9,
  class: "nav-item"
}, Ke = {
  key: 10,
  class: "nav-item"
}, Pe = {
  key: 11,
  class: "nav-item"
}, Re = {
  key: 12,
  class: "nav-item"
}, Me = {
  key: 13,
  class: "nav-item"
}, Te = {
  key: 14,
  class: "nav-item"
}, xe = {
  key: 15,
  class: "nav-item"
}, De = {
  key: 16,
  class: "nav-item"
}, Fe = {
  key: 17,
  class: "nav-item"
}, Ie = {
  key: 18,
  class: "nav-item"
}, Ne = {
  key: 19,
  class: "nav-item"
}, $e = {
  key: 20,
  class: "nav-item"
}, Be = {
  key: 21,
  class: "nav-item"
}, Ee = {
  key: 22,
  class: "nav-item"
}, Ue = {
  key: 23,
  class: "nav-item"
}, Ve = ["onClick"], Ge = {
  role: "main",
  class: "main-content pt-3"
}, Oe = /* @__PURE__ */ G({
  __name: "AdminLayout",
  setup(q) {
    const h = J(), L = ee(), D = Q("https://payments.crank-fit.com/api/graphql/"), { sites: w, fetchSites: B } = X(D);
    E(() => $.getUser());
    const C = E(
      () => w.value.map((f) => ({ serviceKey: f.code, name: f.name }))
    );
    Y(B);
    function F(f) {
      return $.userHasRole(f);
    }
    function v() {
      return F(N.ROLE_SUPER_ADMIN);
    }
    function I() {
      return F(N.ROLE_STAFF) || F(N.ROLE_SUPER_ADMIN);
    }
    function k(f) {
      return h.name === f;
    }
    function K(f, p, c) {
      return h.name === f && h.params[p] === c;
    }
    const S = U(null);
    function P(f) {
      S.value = S.value === f ? null : f;
    }
    const n = U(!1);
    Z(
      () => h.name,
      (f) => {
        f === "admin_classes_calendar" ? n.value = !0 : n.value = !1;
      },
      { immediate: !0 }
    );
    function W() {
      n.value = !n.value;
    }
    async function z() {
      await $.logout();
    }
    return (f, p) => {
      const c = V("RouterLink"), H = V("RouterView");
      return s(), a("div", ie, [
        m("div", le, [
          m("nav", {
            style: { "font-size": "14px" },
            class: o(["sidebar d-none d-sm-block", { collapsed: n.value }])
          }, [
            m("ul", oe, [
              m("li", ce, [
                m("button", {
                  class: "sidebar-toggle nav-link",
                  onClick: W
                }, [
                  m("i", {
                    class: o(n.value ? "bi bi-chevron-right" : "bi bi-chevron-left")
                  }, null, 2)
                ])
              ]),
              e(r)(e(_).CustomersList) && I() && !n.value ? (s(), a("li", de, [
                u(c, {
                  class: o(["nav-link", { active: k("admin_customers") }]),
                  to: { name: "admin_customers" }
                }, {
                  default: d(() => [
                    l(" Clients ")
                  ]),
                  _: 1
                }, 8, ["class"])
              ])) : i("", !0),
              e(r)(e(_).ClassesCalendar) && I() && !n.value ? (s(), a("li", re, [
                u(c, {
                  class: o(["nav-link", { active: k("admin_classes_calendar") }]),
                  to: { name: "admin_classes_calendar" }
                }, {
                  default: d(() => [
                    l(" Class Schedule ")
                  ]),
                  _: 1
                }, 8, ["class"])
              ])) : i("", !0),
              e(r)(e(_).Transactions) && v() && !n.value ? (s(), a("li", _e, [
                u(c, {
                  class: o(["nav-link", { active: k("admin_transactions") }]),
                  to: { name: "admin_transactions" }
                }, {
                  default: d(() => [
                    l(" Transactions ")
                  ]),
                  _: 1
                }, 8, ["class"])
              ])) : i("", !0),
              e(r)(e(_).IncompleteFeedbacks) && v() && !n.value ? (s(), a("li", ue, [
                u(c, {
                  class: o(["nav-link", { active: k("admin_incomplete_feedbacks") }]),
                  to: { name: "admin_incomplete_feedbacks" }
                }, {
                  default: d(() => [
                    l(" Incomplete Feedbacks ")
                  ]),
                  _: 1
                }, 8, ["class"])
              ])) : i("", !0),
              e(r)(e(_).FailedMessages) && v() && !n.value ? (s(), a("li", me, [
                u(c, {
                  class: o(["nav-link", { active: k("admin_failed_messages") }]),
                  to: { name: "admin_failed_messages" }
                }, {
                  default: d(() => [
                    l(" Failed Messages ")
                  ]),
                  _: 1
                }, 8, ["class"])
              ])) : i("", !0),
              e(r)(e(_).ClassScheduleConfig) && v() && !n.value ? (s(), a("li", ve, [
                m("a", {
                  class: o(["nav-link dropdown-toggle", { active: e(h).name === "admin_class_schedule_config" }]),
                  href: "#",
                  onClick: p[0] || (p[0] = A((t) => P("classScheduleConfig"), ["prevent"]))
                }, [
                  l(" Class Schedule Config "),
                  (s(!0), a(y, null, b(C.value, (t) => (s(), a(y, {
                    key: t.serviceKey
                  }, [
                    K("admin_class_schedule_config", "site", t.serviceKey) ? (s(), a("span", ke, g(t.name), 1)) : i("", !0)
                  ], 64))), 128))
                ], 2),
                R(m("div", fe, [
                  (s(!0), a(y, null, b(C.value, (t) => (s(), T(c, {
                    key: t.serviceKey,
                    class: "dropdown-item",
                    to: { name: "admin_class_schedule_config", params: { site: t.serviceKey } }
                  }, {
                    default: d(() => [
                      l(" Class Schedule Config " + g(t.name), 1)
                    ]),
                    _: 2
                  }, 1032, ["to"]))), 128))
                ], 512), [
                  [M, S.value === "classScheduleConfig"]
                ])
              ])) : i("", !0),
              e(r)(e(_).RoomLayouts) && v() && !n.value ? (s(), a("li", ye, [
                m("a", {
                  class: o(["nav-link dropdown-toggle", { active: e(h).name === "admin_room_layout_list" }]),
                  href: "#",
                  onClick: p[1] || (p[1] = A((t) => P("roomLayout"), ["prevent"]))
                }, [
                  l(" Room Layout Config "),
                  (s(!0), a(y, null, b(C.value, (t) => (s(), a(y, {
                    key: t.serviceKey
                  }, [
                    K("admin_room_layout_list", "site", t.serviceKey) ? (s(), a("span", pe, g(t.name), 1)) : i("", !0)
                  ], 64))), 128))
                ], 2),
                R(m("div", he, [
                  (s(!0), a(y, null, b(C.value, (t) => (s(), T(c, {
                    key: t.serviceKey,
                    class: "dropdown-item",
                    to: { name: "admin_room_layout_list", params: { site: t.serviceKey } }
                  }, {
                    default: d(() => [
                      l(" Room Layout Config " + g(t.name), 1)
                    ]),
                    _: 2
                  }, 1032, ["to"]))), 128))
                ], 512), [
                  [M, S.value === "roomLayout"]
                ])
              ])) : i("", !0),
              e(r)(e(_).ClassPackages) && v() && !n.value ? (s(), a("li", ge, [
                m("a", {
                  class: o(["nav-link dropdown-toggle", { active: e(h).name === "admin_class_packages" }]),
                  href: "#",
                  onClick: p[2] || (p[2] = A((t) => P("packages"), ["prevent"]))
                }, [
                  l(" Packages "),
                  (s(!0), a(y, null, b(C.value, (t) => (s(), a(y, {
                    key: t.serviceKey
                  }, [
                    K("admin_class_packages", "site", t.serviceKey) ? (s(), a("span", be, g(t.name), 1)) : i("", !0)
                  ], 64))), 128))
                ], 2),
                R(m("div", Ce, [
                  (s(!0), a(y, null, b(C.value, (t) => (s(), T(c, {
                    key: t.serviceKey,
                    class: "dropdown-item",
                    to: { name: "admin_class_packages", params: { site: t.serviceKey } }
                  }, {
                    default: d(() => [
                      l(" Packages " + g(t.name), 1)
                    ]),
                    _: 2
                  }, 1032, ["to"]))), 128))
                ], 512), [
                  [M, S.value === "packages"]
                ])
              ])) : i("", !0),
              e(r)(e(_).AdminProducts) && v() && !n.value ? (s(), a("li", we, [
                m("a", {
                  class: o(["nav-link dropdown-toggle", { active: e(h).name === "admin_products" }]),
                  href: "#",
                  onClick: p[3] || (p[3] = A((t) => P("adminProducts"), ["prevent"]))
                }, [
                  l(" Packages "),
                  (s(!0), a(y, null, b(C.value, (t) => (s(), a(y, {
                    key: t.serviceKey
                  }, [
                    K("admin_products", "site", t.serviceKey) ? (s(), a("span", Se, g(t.name), 1)) : i("", !0)
                  ], 64))), 128))
                ], 2),
                R(m("div", Ae, [
                  (s(!0), a(y, null, b(C.value, (t) => (s(), T(c, {
                    key: t.serviceKey,
                    class: "dropdown-item",
                    to: { name: "admin_products", params: { site: t.serviceKey } }
                  }, {
                    default: d(() => [
                      l(" Packages " + g(t.name), 1)
                    ]),
                    _: 2
                  }, 1032, ["to"]))), 128))
                ], 512), [
                  [M, S.value === "adminProducts"]
                ])
              ])) : i("", !0),
              e(r)(e(_).GiftCards) && v() && !n.value ? (s(), a("li", Le, [
                u(c, {
                  class: o(["nav-link", { active: k("admin_gift_cards") }]),
                  to: { name: "admin_gift_cards" }
                }, {
                  default: d(() => [
                    l(" Gift Card ")
                  ]),
                  _: 1
                }, 8, ["class"])
              ])) : i("", !0),
              e(r)(e(_).CustomerGiftCards) && v() && !n.value ? (s(), a("li", Ke, [
                u(c, {
                  class: o(["nav-link", { active: k("admin_customer_gift_cards") }]),
                  to: { name: "admin_customer_gift_cards" }
                }, {
                  default: d(() => [
                    l(" Pending Gift Cards ")
                  ]),
                  _: 1
                }, 8, ["class"])
              ])) : i("", !0),
              e(r)(e(_).PaymentLinks) && v() && !n.value ? (s(), a("li", Pe, [
                u(c, {
                  class: o(["nav-link", { active: k("admin_payment_links") }]),
                  to: { name: "admin_payment_links" }
                }, {
                  default: d(() => [
                    l(" Payment link ")
                  ]),
                  _: 1
                }, 8, ["class"])
              ])) : i("", !0),
              e(r)(e(_).SessionTypes) && v() && !n.value ? (s(), a("li", Re, [
                u(c, {
                  class: o(["nav-link", { active: k("admin_session_types") }]),
                  to: { name: "admin_session_types" }
                }, {
                  default: d(() => [
                    l(" Session Types ")
                  ]),
                  _: 1
                }, 8, ["class"])
              ])) : i("", !0),
              e(r)(e(_).InstructorProfiles) && v() && !n.value ? (s(), a("li", Me, [
                u(c, {
                  class: o(["nav-link", { active: k("admin_instructor_profiles") }]),
                  to: { name: "admin_instructor_profiles" }
                }, {
                  default: d(() => [
                    l(" Instructor Profiles ")
                  ]),
                  _: 1
                }, 8, ["class"])
              ])) : i("", !0),
              e(r)(e(_).MindbodyStaff) && v() && !n.value ? (s(), a("li", Te, [
                u(c, {
                  class: o(["nav-link", { active: k("admin_mindbody_staff") }]),
                  to: { name: "admin_mindbody_staff" }
                }, {
                  default: d(() => [
                    l(" Staff ")
                  ]),
                  _: 1
                }, 8, ["class"])
              ])) : i("", !0),
              e(r)(e(_).WebhookEvents) && v() && !n.value ? (s(), a("li", xe, [
                u(c, {
                  class: o(["nav-link", { active: k("admin_webhook_events") }]),
                  to: { name: "admin_webhook_events" }
                }, {
                  default: d(() => [
                    l(" Webhook Events ")
                  ]),
                  _: 1
                }, 8, ["class"])
              ])) : i("", !0),
              e(r)(e(_).AdminUsers) && v() && !n.value ? (s(), a("li", De, [
                u(c, {
                  class: o(["nav-link", { active: k("admin_users") }]),
                  to: { name: "admin_users" }
                }, {
                  default: d(() => [
                    l(" Admins ")
                  ]),
                  _: 1
                }, 8, ["class"])
              ])) : i("", !0),
              e(r)(e(_).SystemSettings) && v() && !n.value ? (s(), a("li", Fe, [
                u(c, {
                  class: o(["nav-link", { active: k("admin_settings") }]),
                  to: { name: "admin_settings" }
                }, {
                  default: d(() => [
                    l(" Settings ")
                  ]),
                  _: 1
                }, 8, ["class"])
              ])) : i("", !0),
              e(r)(e(_).PushNotifications) && v() && !n.value ? (s(), a("li", Ie, [
                u(c, {
                  class: o(["nav-link", { active: k("admin_send_notification") }]),
                  to: { name: "admin_send_notification" }
                }, {
                  default: d(() => [
                    l(" Send Notification ")
                  ]),
                  _: 1
                }, 8, ["class"])
              ])) : i("", !0),
              e(r)(e(_).MySettings) && !n.value ? (s(), a("li", Ne, [
                u(c, {
                  class: o(["nav-link", { active: k("admin_my_settings") }]),
                  to: { name: "admin_my_settings" }
                }, {
                  default: d(() => [
                    l(" My Settings ")
                  ]),
                  _: 1
                }, 8, ["class"])
              ])) : i("", !0),
              e(r)(e(_).Blacklist) && I() && !n.value ? (s(), a("li", $e, [
                u(c, {
                  class: o(["nav-link", { active: k("admin_blacklisted_phones") }]),
                  to: { name: "admin_blacklisted_phones" }
                }, {
                  default: d(() => [
                    l(" Blacklisted phones ")
                  ]),
                  _: 1
                }, 8, ["class"])
              ])) : i("", !0),
              e(r)(e(_).MindbodyClients) && v() && !n.value ? (s(), a("li", Be, [
                u(c, {
                  class: o(["nav-link", { active: k("admin_mindbody_clients") }]),
                  to: { name: "admin_mindbody_clients" }
                }, {
                  default: d(() => [
                    l(" Report - MB Clients ")
                  ]),
                  _: 1
                }, 8, ["class"])
              ])) : i("", !0),
              n.value ? i("", !0) : (s(), a("li", Ee, [
                m("a", {
                  class: "nav-link",
                  href: "#",
                  onClick: p[4] || (p[4] = A((t) => e(L).toggleTheme(), ["prevent"]))
                }, [
                  m("i", {
                    class: o(e(L).isDark ? "bi bi-sun-fill" : "bi bi-moon-stars-fill")
                  }, null, 2),
                  l(" " + g(e(L).isDark ? "Light Mode" : "Dark Mode"), 1)
                ])
              ])),
              n.value ? i("", !0) : (s(), a("li", Ue, [
                m("a", {
                  class: "nav-link",
                  href: "#",
                  onClick: A(z, ["prevent"])
                }, "Logout", 8, Ve)
              ]))
            ])
          ], 2),
          m("main", Ge, [
            u(ne),
            u(H)
          ])
        ])
      ]);
    };
  }
});
const ze = /* @__PURE__ */ O(Oe, [["__scopeId", "data-v-cc9ef51d"]]);
export {
  ze as default
};
