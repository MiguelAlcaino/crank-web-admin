import { d as F, o as e, b as a, F as f, h, A as l, B as i, t as p, e as d, g as y, y as U, G as H, H as W, c as E, I as j, r as I, J, K as V, k as _, L as c, j as n, w as S, f as T, M, R as N, N as P, D as $ } from "./index.b0f32500.js";
import { u as Q } from "./useAvailableSites.68b5c8bf.js";
import { u as X } from "./useToast.8f62be70.js";
import { u as Y } from "./themeStore.fbbef944.js";
const Z = { class: "toast-container" }, ee = ["onClick"], ae = /* @__PURE__ */ F({
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
    return (A, R) => (e(), a("div", Z, [
      (e(!0), a(f, null, h(y(v).messages.value, (g) => (e(), a("div", {
        key: g.id,
        class: l(["alert", C(g.type)]),
        role: "alert"
      }, [
        i(p(g.message) + " ", 1),
        d("button", {
          type: "button",
          class: "btn-close",
          "aria-label": "Close",
          onClick: (B) => y(v).remove(g.id)
        }, null, 8, ee)
      ], 2))), 128))
    ]));
  }
});
const se = /* @__PURE__ */ U(ae, [["__scopeId", "data-v-bb686ea1"]]), te = { class: "container-fluid" }, ne = { class: "layout-row" }, ie = { class: "nav nav-pills flex-column" }, le = { class: "nav-item" }, oe = {
  key: 0,
  class: "nav-item"
}, ce = {
  key: 1,
  class: "nav-item"
}, _e = {
  key: 2,
  class: "nav-item"
}, re = {
  key: 3,
  class: "nav-item"
}, de = {
  key: 4,
  class: "nav-item"
}, ue = { key: 0 }, me = { class: "dropdown-menu show" }, ve = {
  key: 5,
  class: "nav-item"
}, ke = { key: 0 }, fe = { class: "dropdown-menu show" }, pe = {
  key: 6,
  class: "nav-item"
}, ye = { key: 0 }, he = { class: "dropdown-menu show" }, ge = {
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
}, Pe = {
  key: 21,
  class: "nav-item"
}, $e = ["onClick"], Be = {
  role: "main",
  class: "main-content pt-3"
}, Ee = /* @__PURE__ */ F({
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
    function r(m) {
      return v.name === m;
    }
    function x(m, k, o) {
      return v.name === m && v.params[k] === o;
    }
    const w = I(null);
    function D(m) {
      w.value = w.value === m ? null : m;
    }
    const s = I(!1);
    J(
      () => v.name,
      (m) => {
        m === "admin_classes_calendar" ? s.value = !0 : s.value = !1;
      },
      { immediate: !0 }
    );
    function q() {
      s.value = !s.value;
    }
    async function G() {
      await $.logout();
    }
    return (m, k) => {
      const o = V("RouterLink"), z = V("RouterView");
      return e(), a("div", te, [
        d("div", ne, [
          d("nav", {
            style: { "font-size": "14px" },
            class: l(["sidebar d-none d-sm-block", { collapsed: s.value }])
          }, [
            d("ul", ie, [
              d("li", le, [
                d("button", {
                  class: "sidebar-toggle nav-link",
                  onClick: q
                }, [
                  d("i", {
                    class: l(s.value ? "bi bi-chevron-right" : "bi bi-chevron-left")
                  }, null, 2)
                ])
              ]),
              K() && !s.value ? (e(), a("li", oe, [
                _(o, {
                  class: l(["nav-link", { active: r("admin_customers") }]),
                  to: { name: "admin_customers" }
                }, {
                  default: c(() => [
                    i(" Clients ")
                  ]),
                  _: 1
                }, 8, ["class"])
              ])) : n("", !0),
              K() && !s.value ? (e(), a("li", ce, [
                _(o, {
                  class: l(["nav-link", { active: r("admin_classes_calendar") }]),
                  to: { name: "admin_classes_calendar" }
                }, {
                  default: c(() => [
                    i(" Class Schedule ")
                  ]),
                  _: 1
                }, 8, ["class"])
              ])) : n("", !0),
              u() && !s.value ? (e(), a("li", _e, [
                _(o, {
                  class: l(["nav-link", { active: r("admin_transactions") }]),
                  to: { name: "admin_transactions" }
                }, {
                  default: c(() => [
                    i(" Transactions ")
                  ]),
                  _: 1
                }, 8, ["class"])
              ])) : n("", !0),
              u() && !s.value ? (e(), a("li", re, [
                _(o, {
                  class: l(["nav-link", { active: r("admin_incomplete_feedbacks") }]),
                  to: { name: "admin_incomplete_feedbacks" }
                }, {
                  default: c(() => [
                    i(" Incomplete Feedbacks ")
                  ]),
                  _: 1
                }, 8, ["class"])
              ])) : n("", !0),
              u() && !s.value ? (e(), a("li", de, [
                d("a", {
                  class: l(["nav-link dropdown-toggle", { active: y(v).name === "admin_class_schedule_config" }]),
                  href: "#",
                  onClick: k[0] || (k[0] = S((t) => D("classScheduleConfig"), ["prevent"]))
                }, [
                  i(" Class Schedule Config "),
                  (e(!0), a(f, null, h(b.value, (t) => (e(), a(f, {
                    key: t.serviceKey
                  }, [
                    x("admin_class_schedule_config", "site", t.serviceKey) ? (e(), a("span", ue, p(t.name), 1)) : n("", !0)
                  ], 64))), 128))
                ], 2),
                T(d("div", me, [
                  (e(!0), a(f, null, h(b.value, (t) => (e(), P(o, {
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
              u() && !s.value ? (e(), a("li", ve, [
                d("a", {
                  class: l(["nav-link dropdown-toggle", { active: y(v).name === "admin_room_layout_list" }]),
                  href: "#",
                  onClick: k[1] || (k[1] = S((t) => D("roomLayout"), ["prevent"]))
                }, [
                  i(" Room Layout Config "),
                  (e(!0), a(f, null, h(b.value, (t) => (e(), a(f, {
                    key: t.serviceKey
                  }, [
                    x("admin_room_layout_list", "site", t.serviceKey) ? (e(), a("span", ke, p(t.name), 1)) : n("", !0)
                  ], 64))), 128))
                ], 2),
                T(d("div", fe, [
                  (e(!0), a(f, null, h(b.value, (t) => (e(), P(o, {
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
              u() && !s.value ? (e(), a("li", pe, [
                d("a", {
                  class: l(["nav-link dropdown-toggle", { active: y(v).name === "admin_class_packages" }]),
                  href: "#",
                  onClick: k[2] || (k[2] = S((t) => D("packages"), ["prevent"]))
                }, [
                  i(" Packages "),
                  (e(!0), a(f, null, h(b.value, (t) => (e(), a(f, {
                    key: t.serviceKey
                  }, [
                    x("admin_class_packages", "site", t.serviceKey) ? (e(), a("span", ye, p(t.name), 1)) : n("", !0)
                  ], 64))), 128))
                ], 2),
                T(d("div", he, [
                  (e(!0), a(f, null, h(b.value, (t) => (e(), P(o, {
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
              u() && !s.value ? (e(), a("li", ge, [
                _(o, {
                  class: l(["nav-link", { active: r("admin_gift_cards") }]),
                  to: { name: "admin_gift_cards" }
                }, {
                  default: c(() => [
                    i(" Gift Card ")
                  ]),
                  _: 1
                }, 8, ["class"])
              ])) : n("", !0),
              u() && !s.value ? (e(), a("li", be, [
                _(o, {
                  class: l(["nav-link", { active: r("admin_customer_gift_cards") }]),
                  to: { name: "admin_customer_gift_cards" }
                }, {
                  default: c(() => [
                    i(" Pending Gift Cards ")
                  ]),
                  _: 1
                }, 8, ["class"])
              ])) : n("", !0),
              u() && !s.value ? (e(), a("li", Ce, [
                _(o, {
                  class: l(["nav-link", { active: r("admin_payment_links") }]),
                  to: { name: "admin_payment_links" }
                }, {
                  default: c(() => [
                    i(" Payment link ")
                  ]),
                  _: 1
                }, 8, ["class"])
              ])) : n("", !0),
              u() && !s.value ? (e(), a("li", we, [
                _(o, {
                  class: l(["nav-link", { active: r("admin_session_types") }]),
                  to: { name: "admin_session_types" }
                }, {
                  default: c(() => [
                    i(" Session Types ")
                  ]),
                  _: 1
                }, 8, ["class"])
              ])) : n("", !0),
              u() && !s.value ? (e(), a("li", Se, [
                _(o, {
                  class: l(["nav-link", { active: r("admin_instructor_profiles") }]),
                  to: { name: "admin_instructor_profiles" }
                }, {
                  default: c(() => [
                    i(" Instructor Profiles ")
                  ]),
                  _: 1
                }, 8, ["class"])
              ])) : n("", !0),
              u() && !s.value ? (e(), a("li", Ae, [
                _(o, {
                  class: l(["nav-link", { active: r("admin_mindbody_staff") }]),
                  to: { name: "admin_mindbody_staff" }
                }, {
                  default: c(() => [
                    i(" Staff ")
                  ]),
                  _: 1
                }, 8, ["class"])
              ])) : n("", !0),
              u() && !s.value ? (e(), a("li", Re, [
                _(o, {
                  class: l(["nav-link", { active: r("admin_webhook_events") }]),
                  to: { name: "admin_webhook_events" }
                }, {
                  default: c(() => [
                    i(" Webhook Events ")
                  ]),
                  _: 1
                }, 8, ["class"])
              ])) : n("", !0),
              u() && !s.value ? (e(), a("li", Le, [
                _(o, {
                  class: l(["nav-link", { active: r("admin_users") }]),
                  to: { name: "admin_users" }
                }, {
                  default: c(() => [
                    i(" Admins ")
                  ]),
                  _: 1
                }, 8, ["class"])
              ])) : n("", !0),
              u() && !s.value ? (e(), a("li", Ke, [
                _(o, {
                  class: l(["nav-link", { active: r("admin_settings") }]),
                  to: { name: "admin_settings" }
                }, {
                  default: c(() => [
                    i(" Settings ")
                  ]),
                  _: 1
                }, 8, ["class"])
              ])) : n("", !0),
              u() && !s.value ? (e(), a("li", xe, [
                _(o, {
                  class: l(["nav-link", { active: r("admin_send_notification") }]),
                  to: { name: "admin_send_notification" }
                }, {
                  default: c(() => [
                    i(" Send Notification ")
                  ]),
                  _: 1
                }, 8, ["class"])
              ])) : n("", !0),
              s.value ? n("", !0) : (e(), a("li", De, [
                _(o, {
                  class: l(["nav-link", { active: r("admin_my_settings") }]),
                  to: { name: "admin_my_settings" }
                }, {
                  default: c(() => [
                    i(" My Settings ")
                  ]),
                  _: 1
                }, 8, ["class"])
              ])),
              K() && !s.value ? (e(), a("li", Te, [
                _(o, {
                  class: l(["nav-link", { active: r("admin_blacklisted_phones") }]),
                  to: { name: "admin_blacklisted_phones" }
                }, {
                  default: c(() => [
                    i(" Blacklisted phones ")
                  ]),
                  _: 1
                }, 8, ["class"])
              ])) : n("", !0),
              u() && !s.value ? (e(), a("li", Me, [
                _(o, {
                  class: l(["nav-link", { active: r("admin_mindbody_clients") }]),
                  to: { name: "admin_mindbody_clients" }
                }, {
                  default: c(() => [
                    i(" Report - MB Clients ")
                  ]),
                  _: 1
                }, 8, ["class"])
              ])) : n("", !0),
              s.value ? n("", !0) : (e(), a("li", Ne, [
                d("a", {
                  class: "nav-link",
                  href: "#",
                  onClick: k[3] || (k[3] = S((t) => y(C).toggleTheme(), ["prevent"]))
                }, [
                  d("i", {
                    class: l(y(C).isDark ? "bi bi-sun-fill" : "bi bi-moon-stars-fill")
                  }, null, 2),
                  i(" " + p(y(C).isDark ? "Light Mode" : "Dark Mode"), 1)
                ])
              ])),
              s.value ? n("", !0) : (e(), a("li", Pe, [
                d("a", {
                  class: "nav-link",
                  href: "#",
                  onClick: S(G, ["prevent"])
                }, "Logout", 8, $e)
              ]))
            ])
          ], 2),
          d("main", Be, [
            _(se),
            _(z)
          ])
        ])
      ]);
    };
  }
});
const Oe = /* @__PURE__ */ U(Ee, [["__scopeId", "data-v-3c579e7c"]]);
export {
  Oe as default
};
