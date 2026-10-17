import { d as h, c as m, M as p, b as x, e as t, t as v, g as e, T as o, N as c, j as d, o as s, P as n, Q as r, D as _, R as f } from "./index.cb70f358.js";
const k = /* @__PURE__ */ t("h4", null, "Admin Dashboard", -1), b = { class: "text-muted" }, g = { class: "row mt-4" }, y = { class: "col-md-4 mb-3" }, C = /* @__PURE__ */ t("div", { class: "card-body" }, [
  /* @__PURE__ */ t("h6", { class: "card-title text-dark" }, "Transactions"),
  /* @__PURE__ */ t("p", { class: "card-text text-muted small" }, "View and manage payment transactions")
], -1), R = { class: "col-md-4 mb-3" }, A = /* @__PURE__ */ t("div", { class: "card-body" }, [
  /* @__PURE__ */ t("h6", { class: "card-title text-dark" }, "Clients"),
  /* @__PURE__ */ t("p", { class: "card-text text-muted small" }, "Manage customer accounts")
], -1), D = { class: "col-md-4 mb-3" }, w = /* @__PURE__ */ t("div", { class: "card-body" }, [
  /* @__PURE__ */ t("h6", { class: "card-title text-dark" }, "Gift Cards"),
  /* @__PURE__ */ t("p", { class: "card-text text-muted small" }, "Manage gift card products")
], -1), S = /* @__PURE__ */ h({
  __name: "AdminDashboardView",
  setup(B) {
    const u = m(() => _.getUser()), i = m(() => _.userHasRole(f.ROLE_SUPER_ADMIN));
    return (L, M) => {
      var l;
      const a = p("RouterLink");
      return s(), x("div", null, [
        k,
        t("p", b, "Welcome, " + v((l = u.value) == null ? void 0 : l.username), 1),
        t("div", g, [
          t("div", y, [
            i.value && e(n)(e(r).Transactions) ? (s(), o(a, {
              key: 0,
              to: { name: "admin_transactions" },
              class: "card text-decoration-none"
            }, {
              default: c(() => [
                C
              ]),
              _: 1
            })) : d("", !0)
          ]),
          t("div", R, [
            e(n)(e(r).CustomersList) ? (s(), o(a, {
              key: 0,
              to: { name: "admin_customers" },
              class: "card text-decoration-none"
            }, {
              default: c(() => [
                A
              ]),
              _: 1
            })) : d("", !0)
          ]),
          t("div", D, [
            i.value && e(n)(e(r).GiftCards) ? (s(), o(a, {
              key: 0,
              to: { name: "admin_gift_cards" },
              class: "card text-decoration-none"
            }, {
              default: c(() => [
                w
              ]),
              _: 1
            })) : d("", !0)
          ])
        ])
      ]);
    };
  }
});
export {
  S as default
};
