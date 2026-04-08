import { d as m, c as d, I as _, b as u, e as t, t as h, L as n, J as s, j as r, k as p, o as a, C as l, R as x } from "./index.cc2eb486.js";
const v = /* @__PURE__ */ t("h4", null, "Admin Dashboard", -1), k = { class: "text-muted" }, f = { class: "row mt-4" }, b = { class: "col-md-4 mb-3" }, g = /* @__PURE__ */ t("div", { class: "card-body" }, [
  /* @__PURE__ */ t("h6", { class: "card-title text-dark" }, "Transactions"),
  /* @__PURE__ */ t("p", { class: "card-text text-muted small" }, "View and manage payment transactions")
], -1), y = { class: "col-md-4 mb-3" }, C = /* @__PURE__ */ t("div", { class: "card-body" }, [
  /* @__PURE__ */ t("h6", { class: "card-title text-dark" }, "Clients"),
  /* @__PURE__ */ t("p", { class: "card-text text-muted small" }, "Manage customer accounts")
], -1), R = { class: "col-md-4 mb-3" }, V = /* @__PURE__ */ t("div", { class: "card-body" }, [
  /* @__PURE__ */ t("h6", { class: "card-title text-dark" }, "Gift Cards"),
  /* @__PURE__ */ t("p", { class: "card-text text-muted small" }, "Manage gift card products")
], -1), L = /* @__PURE__ */ m({
  __name: "AdminDashboardView",
  setup(w) {
    const i = d(() => l.getUser()), o = d(() => l.userHasRole(x.ROLE_SUPER_ADMIN));
    return (A, B) => {
      var c;
      const e = _("RouterLink");
      return a(), u("div", null, [
        v,
        t("p", k, "Welcome, " + h((c = i.value) == null ? void 0 : c.username), 1),
        t("div", f, [
          t("div", b, [
            o.value ? (a(), n(e, {
              key: 0,
              to: { name: "admin_transactions" },
              class: "card text-decoration-none"
            }, {
              default: s(() => [
                g
              ]),
              _: 1
            })) : r("", !0)
          ]),
          t("div", y, [
            p(e, {
              to: { name: "admin_customers" },
              class: "card text-decoration-none"
            }, {
              default: s(() => [
                C
              ]),
              _: 1
            })
          ]),
          t("div", R, [
            o.value ? (a(), n(e, {
              key: 0,
              to: { name: "admin_gift_cards" },
              class: "card text-decoration-none"
            }, {
              default: s(() => [
                V
              ]),
              _: 1
            })) : r("", !0)
          ])
        ])
      ]);
    };
  }
});
export {
  L as default
};
