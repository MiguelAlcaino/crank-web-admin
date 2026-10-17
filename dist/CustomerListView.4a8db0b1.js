import { ac as j, r as i, ae as E, d as A, T as M, o as a, ao as Q, I as Y, z, P as H, Q as K, c as S, K as G, M as J, b as l, e as t, k as N, N as W, f as k, i as x, t as r, w as X, g as n, j as b, F as U, h as F, aa as Z, B as tt } from "./index.dde1f821.js";
import { _ as et, c as st } from "./AdminExportButton.vue_vue_type_script_setup_true_lang.bbda5337.js";
const at = j`
  query AdminCustomers($params: AdminCustomersParams, $pagination: PaginationInput) {
    customers(params: $params, pagination: $pagination) {
      items {
        id
        user {
          firstName
          lastName
          email
          phone
          isMobilePhoneVerified
          siteUsers {
            site
            externalUserId
          }
        }
      }
      totalCount
      page
      limit
    }
  }
`, ot = (V) => {
  const _ = i(null), u = i(!1), e = i(!1);
  async function f(p) {
    u.value = !0, e.value = !1;
    try {
      const { page: c, limit: d, ...m } = p, { data: v } = await V.query({
        query: at,
        variables: {
          params: Object.keys(m).length > 0 ? m : void 0,
          pagination: c || d ? { page: c, limit: d } : void 0
        },
        fetchPolicy: "network-only"
      });
      _.value = v.customers;
    } catch {
      e.value = !0;
    } finally {
      u.value = !1;
    }
  }
  return {
    result: E(_),
    isLoading: E(u),
    hasError: E(e),
    fetchCustomers: f
  };
}, lt = /* @__PURE__ */ A({
  __name: "ExportCustomerVodButton",
  props: {
    apolloClient: {},
    params: {}
  },
  setup(V) {
    const _ = V;
    async function u() {
      const { data: e } = await _.apolloClient.mutate({
        mutation: Q,
        variables: { params: st(_.params) }
      });
      return e == null ? void 0 : e.exportCustomerVod;
    }
    return (e, f) => (a(), M(et, {
      text: "Export VOD list",
      "run-export": u
    }));
  }
}), nt = { class: "d-flex justify-content-between align-items-center mb-3" }, rt = /* @__PURE__ */ t("h4", null, "Clients", -1), it = ["onSubmit"], ut = { class: "input-group" }, ct = /* @__PURE__ */ t("button", {
  type: "submit",
  class: "btn btn-primary"
}, "Search", -1), dt = {
  key: 0,
  class: "mb-3"
}, mt = {
  key: 1,
  class: "card mb-3"
}, pt = { class: "card-body" }, vt = { class: "row" }, _t = { class: "col-md-3" }, ht = /* @__PURE__ */ t("label", { class: "small" }, "Registration From", -1), bt = { class: "col-md-3" }, ft = /* @__PURE__ */ t("label", { class: "small" }, "Registration To", -1), gt = { class: "col-md-3" }, yt = /* @__PURE__ */ t("label", { class: "small" }, "VOD From", -1), Ct = { class: "col-md-3" }, kt = /* @__PURE__ */ t("label", { class: "small" }, "VOD To", -1), xt = {
  key: 2,
  class: "text-center py-4"
}, Vt = /* @__PURE__ */ t("div", {
  class: "spinner-border",
  role: "status"
}, [
  /* @__PURE__ */ t("span", { class: "visually-hidden" }, "Loading...")
], -1), Dt = [
  Vt
], Et = {
  key: 3,
  class: "alert alert-danger"
}, wt = { key: 4 }, Pt = { class: "text-muted small" }, St = { class: "table table-striped table-sm" }, Nt = /* @__PURE__ */ t("thead", null, [
  /* @__PURE__ */ t("tr", null, [
    /* @__PURE__ */ t("th", null, "ID"),
    /* @__PURE__ */ t("th", null, "Name"),
    /* @__PURE__ */ t("th", null, "Email"),
    /* @__PURE__ */ t("th", null, "Phone"),
    /* @__PURE__ */ t("th", null, "Phone Verified"),
    /* @__PURE__ */ t("th", null, "Sites"),
    /* @__PURE__ */ t("th", null, "Actions")
  ])
], -1), Ut = {
  key: 0,
  class: "badge text-bg-success"
}, Ft = {
  key: 1,
  class: "badge text-bg-secondary"
}, At = ["title"], Mt = ["onClick"], Lt = ["onClick"], w = 50, Bt = /* @__PURE__ */ A({
  __name: "CustomerListView",
  setup(V) {
    const u = Y("https://payments.crank-fit.com/api/graphql/"), e = ot(u), f = z(), p = i(""), c = i(!1), d = i(""), m = i(""), v = i(""), g = i(""), y = i(1), L = H(K.CustomerVodExport), $ = S(() => ({
      search: p.value,
      registrationStartDate: d.value,
      registrationEndDate: m.value,
      vodStartDate: v.value,
      vodEndDate: g.value
    })), q = S(() => e.result.value ? Math.ceil(e.result.value.totalCount / w) : 1);
    async function D() {
      await e.fetchCustomers({
        search: p.value || void 0,
        registrationStartDate: d.value || void 0,
        registrationEndDate: m.value || void 0,
        vodStartDate: v.value || void 0,
        vodEndDate: g.value || void 0,
        page: y.value,
        limit: w
      });
    }
    async function P() {
      y.value = 1, await D();
    }
    async function B() {
      p.value = "", d.value = "", m.value = "", v.value = "", g.value = "", y.value = 1, await D();
    }
    async function I(h) {
      y.value = h, await D();
    }
    function R(h) {
      f.push({ name: "admin_customer_profile", params: { id: h } });
    }
    function T(h) {
      f.push({ name: "admin_customer_edit", params: { id: h } });
    }
    return G(D), (h, o) => {
      const O = J("RouterLink");
      return a(), l("div", null, [
        t("div", nt, [
          rt,
          N(O, {
            to: { name: "admin_customer_create" },
            class: "btn btn-primary"
          }, {
            default: W(() => [
              tt(" + New Customer ")
            ]),
            _: 1
          })
        ]),
        t("form", {
          onSubmit: X(P, ["prevent"]),
          class: "mb-3"
        }, [
          t("div", ut, [
            k(t("input", {
              type: "text",
              "onUpdate:modelValue": o[0] || (o[0] = (s) => p.value = s),
              class: "form-control",
              placeholder: "Search by name, email, or phone..."
            }, null, 512), [
              [x, p.value]
            ]),
            ct,
            t("button", {
              type: "button",
              class: "btn btn-outline-secondary",
              onClick: o[1] || (o[1] = (s) => c.value = !c.value)
            }, r(c.value ? "Hide Filters" : "Filters"), 1)
          ])
        ], 40, it),
        n(L) ? (a(), l("div", dt, [
          N(lt, {
            "apollo-client": n(u),
            params: $.value
          }, null, 8, ["apollo-client", "params"])
        ])) : b("", !0),
        c.value ? (a(), l("div", mt, [
          t("div", pt, [
            t("div", vt, [
              t("div", _t, [
                ht,
                k(t("input", {
                  type: "date",
                  "onUpdate:modelValue": o[2] || (o[2] = (s) => d.value = s),
                  class: "form-control form-control-sm"
                }, null, 512), [
                  [x, d.value]
                ])
              ]),
              t("div", bt, [
                ft,
                k(t("input", {
                  type: "date",
                  "onUpdate:modelValue": o[3] || (o[3] = (s) => m.value = s),
                  class: "form-control form-control-sm"
                }, null, 512), [
                  [x, m.value]
                ])
              ]),
              t("div", gt, [
                yt,
                k(t("input", {
                  type: "date",
                  "onUpdate:modelValue": o[4] || (o[4] = (s) => v.value = s),
                  class: "form-control form-control-sm"
                }, null, 512), [
                  [x, v.value]
                ])
              ]),
              t("div", Ct, [
                kt,
                k(t("input", {
                  type: "date",
                  "onUpdate:modelValue": o[5] || (o[5] = (s) => g.value = s),
                  class: "form-control form-control-sm"
                }, null, 512), [
                  [x, g.value]
                ])
              ])
            ]),
            t("div", { class: "mt-2" }, [
              t("button", {
                class: "btn btn-primary btn-sm me-2",
                onClick: P
              }, "Apply"),
              t("button", {
                class: "btn btn-outline-secondary btn-sm",
                onClick: B
              }, "Clear")
            ])
          ])
        ])) : b("", !0),
        n(e).isLoading.value ? (a(), l("div", xt, Dt)) : b("", !0),
        n(e).hasError.value ? (a(), l("div", Et, " Failed to load customers. ")) : b("", !0),
        n(e).result.value && !n(e).isLoading.value ? (a(), l("div", wt, [
          t("p", Pt, r(n(e).result.value.totalCount) + " customers found (page " + r(n(e).result.value.page) + " of " + r(q.value) + ") ", 1),
          t("table", St, [
            Nt,
            t("tbody", null, [
              (a(!0), l(U, null, F(n(e).result.value.items, (s) => (a(), l("tr", {
                key: s.id
              }, [
                t("td", null, r(s.id), 1),
                t("td", null, r(s.user.firstName) + " " + r(s.user.lastName), 1),
                t("td", null, r(s.user.email), 1),
                t("td", null, r(s.user.phone || "-"), 1),
                t("td", null, [
                  s.user.isMobilePhoneVerified ? (a(), l("span", Ut, "Yes")) : (a(), l("span", Ft, "No"))
                ]),
                t("td", null, [
                  (a(!0), l(U, null, F(s.user.siteUsers, (C) => (a(), l("span", {
                    key: C.site,
                    class: "badge text-bg-info me-1",
                    title: "MB ID: " + (C.externalUserId || "N/A")
                  }, r(C.site), 9, At))), 128))
                ]),
                t("td", null, [
                  t("button", {
                    class: "btn btn-outline-secondary btn-sm me-1",
                    onClick: (C) => R(s.id)
                  }, " View ", 8, Mt),
                  t("button", {
                    class: "btn btn-outline-secondary btn-sm",
                    onClick: (C) => T(s.id)
                  }, " Edit ", 8, Lt)
                ])
              ]))), 128))
            ])
          ]),
          n(e).result.value ? (a(), M(Z, {
            key: 0,
            page: y.value,
            limit: w,
            total: n(e).result.value.totalCount,
            onPageChanged: I
          }, null, 8, ["page", "total"])) : b("", !0)
        ])) : b("", !0)
      ]);
    };
  }
});
export {
  Bt as default
};
