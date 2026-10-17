import { d as G, G as j, o as s, b as a, F as y, h as b, A as o, B as l, t as g, e as m, g as e, y as O, H as J, I as Q, J as X, c as F, K as Y, r as U, L as Z, M as V, k as _, N as r, j as i, w as A, f as R, O as T, R as $, P as d, Q as u, T as M, D as B } from "./index.cb70f358.js";
import { u as ee } from "./themeStore.c6b7694c.js";
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
          onClick: (E) => e(h).remove(w.id)
        }, null, 8, ae)
      ], 2))), 128))
    ]));
  }
});
const ne = /* @__PURE__ */ O(te, [["__scopeId", "data-v-bb686ea1"]]), ie = { class: "container-fluid" }, le = { class: "layout-row" }, oe = { class: "nav nav-pills flex-column" }, ce = { class: "nav-item" }, re = {
  key: 0,
  class: "nav-item"
}, de = {
  key: 1,
  class: "nav-item"
}, ue = {
  key: 2,
  class: "nav-item"
}, _e = {
  key: 3,
  class: "nav-item"
}, me = {
  key: 4,
  class: "nav-item"
}, ve = { key: 0 }, ke = { class: "dropdown-menu show" }, fe = {
  key: 5,
  class: "nav-item"
}, ye = { key: 0 }, pe = { class: "dropdown-menu show" }, he = {
  key: 6,
  class: "nav-item"
}, ge = { key: 0 }, be = { class: "dropdown-menu show" }, Ce = {
  key: 7,
  class: "nav-item"
}, we = { key: 0 }, Se = { class: "dropdown-menu show" }, Ae = {
  key: 8,
  class: "nav-item"
}, Le = {
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
}, Te = {
  key: 13,
  class: "nav-item"
}, Me = {
  key: 14,
  class: "nav-item"
}, xe = {
  key: 15,
  class: "nav-item"
}, De = {
  key: 16,
  class: "nav-item"
}, Ie = {
  key: 17,
  class: "nav-item"
}, Ne = {
  key: 18,
  class: "nav-item"
}, $e = {
  key: 19,
  class: "nav-item"
}, Be = {
  key: 20,
  class: "nav-item"
}, Ee = {
  key: 21,
  class: "nav-item"
}, Fe = {
  key: 22,
  class: "nav-item"
}, Ue = ["onClick"], Ve = {
  role: "main",
  class: "main-content pt-3"
}, Ge = /* @__PURE__ */ G({
  __name: "AdminLayout",
  setup(q) {
    const h = J(), L = ee(), D = Q("https://payments.crank-fit.com/api/graphql/"), { sites: w, fetchSites: E } = X(D);
    F(() => B.getUser());
    const C = F(
      () => w.value.map((f) => ({ serviceKey: f.code, name: f.name }))
    );
    Y(E);
    function I(f) {
      return B.userHasRole(f);
    }
    function v() {
      return I($.ROLE_SUPER_ADMIN);
    }
    function N() {
      return I($.ROLE_STAFF) || I($.ROLE_SUPER_ADMIN);
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
      await B.logout();
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
              e(d)(e(u).CustomersList) && N() && !n.value ? (s(), a("li", re, [
                _(c, {
                  class: o(["nav-link", { active: k("admin_customers") }]),
                  to: { name: "admin_customers" }
                }, {
                  default: r(() => [
                    l(" Clients ")
                  ]),
                  _: 1
                }, 8, ["class"])
              ])) : i("", !0),
              e(d)(e(u).ClassesCalendar) && N() && !n.value ? (s(), a("li", de, [
                _(c, {
                  class: o(["nav-link", { active: k("admin_classes_calendar") }]),
                  to: { name: "admin_classes_calendar" }
                }, {
                  default: r(() => [
                    l(" Class Schedule ")
                  ]),
                  _: 1
                }, 8, ["class"])
              ])) : i("", !0),
              e(d)(e(u).Transactions) && v() && !n.value ? (s(), a("li", ue, [
                _(c, {
                  class: o(["nav-link", { active: k("admin_transactions") }]),
                  to: { name: "admin_transactions" }
                }, {
                  default: r(() => [
                    l(" Transactions ")
                  ]),
                  _: 1
                }, 8, ["class"])
              ])) : i("", !0),
              e(d)(e(u).IncompleteFeedbacks) && v() && !n.value ? (s(), a("li", _e, [
                _(c, {
                  class: o(["nav-link", { active: k("admin_incomplete_feedbacks") }]),
                  to: { name: "admin_incomplete_feedbacks" }
                }, {
                  default: r(() => [
                    l(" Incomplete Feedbacks ")
                  ]),
                  _: 1
                }, 8, ["class"])
              ])) : i("", !0),
              e(d)(e(u).ClassScheduleConfig) && v() && !n.value ? (s(), a("li", me, [
                m("a", {
                  class: o(["nav-link dropdown-toggle", { active: e(h).name === "admin_class_schedule_config" }]),
                  href: "#",
                  onClick: p[0] || (p[0] = A((t) => P("classScheduleConfig"), ["prevent"]))
                }, [
                  l(" Class Schedule Config "),
                  (s(!0), a(y, null, b(C.value, (t) => (s(), a(y, {
                    key: t.serviceKey
                  }, [
                    K("admin_class_schedule_config", "site", t.serviceKey) ? (s(), a("span", ve, g(t.name), 1)) : i("", !0)
                  ], 64))), 128))
                ], 2),
                R(m("div", ke, [
                  (s(!0), a(y, null, b(C.value, (t) => (s(), M(c, {
                    key: t.serviceKey,
                    class: "dropdown-item",
                    to: { name: "admin_class_schedule_config", params: { site: t.serviceKey } }
                  }, {
                    default: r(() => [
                      l(" Class Schedule Config " + g(t.name), 1)
                    ]),
                    _: 2
                  }, 1032, ["to"]))), 128))
                ], 512), [
                  [T, S.value === "classScheduleConfig"]
                ])
              ])) : i("", !0),
              e(d)(e(u).RoomLayouts) && v() && !n.value ? (s(), a("li", fe, [
                m("a", {
                  class: o(["nav-link dropdown-toggle", { active: e(h).name === "admin_room_layout_list" }]),
                  href: "#",
                  onClick: p[1] || (p[1] = A((t) => P("roomLayout"), ["prevent"]))
                }, [
                  l(" Room Layout Config "),
                  (s(!0), a(y, null, b(C.value, (t) => (s(), a(y, {
                    key: t.serviceKey
                  }, [
                    K("admin_room_layout_list", "site", t.serviceKey) ? (s(), a("span", ye, g(t.name), 1)) : i("", !0)
                  ], 64))), 128))
                ], 2),
                R(m("div", pe, [
                  (s(!0), a(y, null, b(C.value, (t) => (s(), M(c, {
                    key: t.serviceKey,
                    class: "dropdown-item",
                    to: { name: "admin_room_layout_list", params: { site: t.serviceKey } }
                  }, {
                    default: r(() => [
                      l(" Room Layout Config " + g(t.name), 1)
                    ]),
                    _: 2
                  }, 1032, ["to"]))), 128))
                ], 512), [
                  [T, S.value === "roomLayout"]
                ])
              ])) : i("", !0),
              e(d)(e(u).ClassPackages) && v() && !n.value ? (s(), a("li", he, [
                m("a", {
                  class: o(["nav-link dropdown-toggle", { active: e(h).name === "admin_class_packages" }]),
                  href: "#",
                  onClick: p[2] || (p[2] = A((t) => P("packages"), ["prevent"]))
                }, [
                  l(" Packages "),
                  (s(!0), a(y, null, b(C.value, (t) => (s(), a(y, {
                    key: t.serviceKey
                  }, [
                    K("admin_class_packages", "site", t.serviceKey) ? (s(), a("span", ge, g(t.name), 1)) : i("", !0)
                  ], 64))), 128))
                ], 2),
                R(m("div", be, [
                  (s(!0), a(y, null, b(C.value, (t) => (s(), M(c, {
                    key: t.serviceKey,
                    class: "dropdown-item",
                    to: { name: "admin_class_packages", params: { site: t.serviceKey } }
                  }, {
                    default: r(() => [
                      l(" Packages " + g(t.name), 1)
                    ]),
                    _: 2
                  }, 1032, ["to"]))), 128))
                ], 512), [
                  [T, S.value === "packages"]
                ])
              ])) : i("", !0),
              e(d)(e(u).AdminProducts) && v() && !n.value ? (s(), a("li", Ce, [
                m("a", {
                  class: o(["nav-link dropdown-toggle", { active: e(h).name === "admin_products" }]),
                  href: "#",
                  onClick: p[3] || (p[3] = A((t) => P("adminProducts"), ["prevent"]))
                }, [
                  l(" Packages "),
                  (s(!0), a(y, null, b(C.value, (t) => (s(), a(y, {
                    key: t.serviceKey
                  }, [
                    K("admin_products", "site", t.serviceKey) ? (s(), a("span", we, g(t.name), 1)) : i("", !0)
                  ], 64))), 128))
                ], 2),
                R(m("div", Se, [
                  (s(!0), a(y, null, b(C.value, (t) => (s(), M(c, {
                    key: t.serviceKey,
                    class: "dropdown-item",
                    to: { name: "admin_products", params: { site: t.serviceKey } }
                  }, {
                    default: r(() => [
                      l(" Packages " + g(t.name), 1)
                    ]),
                    _: 2
                  }, 1032, ["to"]))), 128))
                ], 512), [
                  [T, S.value === "adminProducts"]
                ])
              ])) : i("", !0),
              e(d)(e(u).GiftCards) && v() && !n.value ? (s(), a("li", Ae, [
                _(c, {
                  class: o(["nav-link", { active: k("admin_gift_cards") }]),
                  to: { name: "admin_gift_cards" }
                }, {
                  default: r(() => [
                    l(" Gift Card ")
                  ]),
                  _: 1
                }, 8, ["class"])
              ])) : i("", !0),
              e(d)(e(u).CustomerGiftCards) && v() && !n.value ? (s(), a("li", Le, [
                _(c, {
                  class: o(["nav-link", { active: k("admin_customer_gift_cards") }]),
                  to: { name: "admin_customer_gift_cards" }
                }, {
                  default: r(() => [
                    l(" Pending Gift Cards ")
                  ]),
                  _: 1
                }, 8, ["class"])
              ])) : i("", !0),
              e(d)(e(u).PaymentLinks) && v() && !n.value ? (s(), a("li", Ke, [
                _(c, {
                  class: o(["nav-link", { active: k("admin_payment_links") }]),
                  to: { name: "admin_payment_links" }
                }, {
                  default: r(() => [
                    l(" Payment link ")
                  ]),
                  _: 1
                }, 8, ["class"])
              ])) : i("", !0),
              e(d)(e(u).SessionTypes) && v() && !n.value ? (s(), a("li", Pe, [
                _(c, {
                  class: o(["nav-link", { active: k("admin_session_types") }]),
                  to: { name: "admin_session_types" }
                }, {
                  default: r(() => [
                    l(" Session Types ")
                  ]),
                  _: 1
                }, 8, ["class"])
              ])) : i("", !0),
              e(d)(e(u).InstructorProfiles) && v() && !n.value ? (s(), a("li", Re, [
                _(c, {
                  class: o(["nav-link", { active: k("admin_instructor_profiles") }]),
                  to: { name: "admin_instructor_profiles" }
                }, {
                  default: r(() => [
                    l(" Instructor Profiles ")
                  ]),
                  _: 1
                }, 8, ["class"])
              ])) : i("", !0),
              e(d)(e(u).MindbodyStaff) && v() && !n.value ? (s(), a("li", Te, [
                _(c, {
                  class: o(["nav-link", { active: k("admin_mindbody_staff") }]),
                  to: { name: "admin_mindbody_staff" }
                }, {
                  default: r(() => [
                    l(" Staff ")
                  ]),
                  _: 1
                }, 8, ["class"])
              ])) : i("", !0),
              e(d)(e(u).WebhookEvents) && v() && !n.value ? (s(), a("li", Me, [
                _(c, {
                  class: o(["nav-link", { active: k("admin_webhook_events") }]),
                  to: { name: "admin_webhook_events" }
                }, {
                  default: r(() => [
                    l(" Webhook Events ")
                  ]),
                  _: 1
                }, 8, ["class"])
              ])) : i("", !0),
              e(d)(e(u).AdminUsers) && v() && !n.value ? (s(), a("li", xe, [
                _(c, {
                  class: o(["nav-link", { active: k("admin_users") }]),
                  to: { name: "admin_users" }
                }, {
                  default: r(() => [
                    l(" Admins ")
                  ]),
                  _: 1
                }, 8, ["class"])
              ])) : i("", !0),
              e(d)(e(u).SystemSettings) && v() && !n.value ? (s(), a("li", De, [
                _(c, {
                  class: o(["nav-link", { active: k("admin_settings") }]),
                  to: { name: "admin_settings" }
                }, {
                  default: r(() => [
                    l(" Settings ")
                  ]),
                  _: 1
                }, 8, ["class"])
              ])) : i("", !0),
              e(d)(e(u).PushNotifications) && v() && !n.value ? (s(), a("li", Ie, [
                _(c, {
                  class: o(["nav-link", { active: k("admin_send_notification") }]),
                  to: { name: "admin_send_notification" }
                }, {
                  default: r(() => [
                    l(" Send Notification ")
                  ]),
                  _: 1
                }, 8, ["class"])
              ])) : i("", !0),
              e(d)(e(u).MySettings) && !n.value ? (s(), a("li", Ne, [
                _(c, {
                  class: o(["nav-link", { active: k("admin_my_settings") }]),
                  to: { name: "admin_my_settings" }
                }, {
                  default: r(() => [
                    l(" My Settings ")
                  ]),
                  _: 1
                }, 8, ["class"])
              ])) : i("", !0),
              e(d)(e(u).Blacklist) && N() && !n.value ? (s(), a("li", $e, [
                _(c, {
                  class: o(["nav-link", { active: k("admin_blacklisted_phones") }]),
                  to: { name: "admin_blacklisted_phones" }
                }, {
                  default: r(() => [
                    l(" Blacklisted phones ")
                  ]),
                  _: 1
                }, 8, ["class"])
              ])) : i("", !0),
              e(d)(e(u).MindbodyClients) && v() && !n.value ? (s(), a("li", Be, [
                _(c, {
                  class: o(["nav-link", { active: k("admin_mindbody_clients") }]),
                  to: { name: "admin_mindbody_clients" }
                }, {
                  default: r(() => [
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
              n.value ? i("", !0) : (s(), a("li", Fe, [
                m("a", {
                  class: "nav-link",
                  href: "#",
                  onClick: A(z, ["prevent"])
                }, "Logout", 8, Ue)
              ]))
            ])
          ], 2),
          m("main", Ve, [
            _(ne),
            _(H)
          ])
        ])
      ]);
    };
  }
});
const We = /* @__PURE__ */ O(Ge, [["__scopeId", "data-v-20f268cb"]]);
export {
  We as default
};
