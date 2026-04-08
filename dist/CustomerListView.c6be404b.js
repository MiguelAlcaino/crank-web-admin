import { M as I, r as i, N as D, d as R, G as $, z as T, c as B, H as O, I as j, b as l, e as t, k as H, J as Y, f, i as g, t as n, w as z, j as y, g as r, F as U, h as E, L as G, X as J, o, A as Q } from "./index.cc2eb486.js";
const X = I`
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
`, K = (P) => {
  const V = i(null), _ = i(!1), s = i(!1);
  async function C(m) {
    _.value = !0, s.value = !1;
    try {
      const { page: u, limit: d, ...c } = m, { data: v } = await P.query({
        query: X,
        variables: {
          params: Object.keys(c).length > 0 ? c : void 0,
          pagination: u || d ? { page: u, limit: d } : void 0
        },
        fetchPolicy: "network-only"
      });
      V.value = v.customers;
    } catch {
      s.value = !0;
    } finally {
      _.value = !1;
    }
  }
  return {
    result: D(V),
    isLoading: D(_),
    hasError: D(s),
    fetchCustomers: C
  };
}, W = { class: "d-flex justify-content-between align-items-center mb-3" }, Z = /* @__PURE__ */ t("h4", null, "Clients", -1), tt = ["onSubmit"], et = { class: "input-group" }, st = { class: "input-group-append" }, at = /* @__PURE__ */ t("button", {
  type: "submit",
  class: "btn btn-primary"
}, "Search", -1), ot = {
  key: 0,
  class: "card mb-3"
}, lt = { class: "card-body" }, nt = { class: "row" }, it = { class: "col-md-3" }, rt = /* @__PURE__ */ t("label", { class: "small" }, "Registration From", -1), ut = { class: "col-md-3" }, dt = /* @__PURE__ */ t("label", { class: "small" }, "Registration To", -1), ct = { class: "col-md-3" }, mt = /* @__PURE__ */ t("label", { class: "small" }, "VOD From", -1), vt = { class: "col-md-3" }, pt = /* @__PURE__ */ t("label", { class: "small" }, "VOD To", -1), _t = {
  key: 1,
  class: "text-center py-4"
}, ht = /* @__PURE__ */ t("div", {
  class: "spinner-border",
  role: "status"
}, [
  /* @__PURE__ */ t("span", { class: "sr-only" }, "Loading...")
], -1), bt = [
  ht
], ft = {
  key: 2,
  class: "alert alert-danger"
}, gt = { key: 3 }, yt = { class: "text-muted small" }, Ct = { class: "table table-striped table-sm" }, kt = /* @__PURE__ */ t("thead", null, [
  /* @__PURE__ */ t("tr", null, [
    /* @__PURE__ */ t("th", null, "ID"),
    /* @__PURE__ */ t("th", null, "Name"),
    /* @__PURE__ */ t("th", null, "Email"),
    /* @__PURE__ */ t("th", null, "Phone"),
    /* @__PURE__ */ t("th", null, "Phone Verified"),
    /* @__PURE__ */ t("th", null, "Sites"),
    /* @__PURE__ */ t("th", null, "Actions")
  ])
], -1), wt = {
  key: 0,
  class: "badge badge-success"
}, Vt = {
  key: 1,
  class: "badge badge-secondary"
}, Dt = ["title"], Nt = ["onClick"], Pt = ["onClick"], N = 50, Ut = /* @__PURE__ */ R({
  __name: "CustomerListView",
  setup(P) {
    const _ = $("https://payments.crank-fit.com/api/graphql/"), s = K(_), C = T(), m = i(""), u = i(!1), d = i(""), c = i(""), v = i(""), k = i(""), h = i(1), x = B(() => s.result.value ? Math.ceil(s.result.value.totalCount / N) : 1);
    async function w() {
      await s.fetchCustomers({
        search: m.value || void 0,
        registrationStartDate: d.value || void 0,
        registrationEndDate: c.value || void 0,
        vodStartDate: v.value || void 0,
        vodEndDate: k.value || void 0,
        page: h.value,
        limit: N
      });
    }
    async function S() {
      h.value = 1, await w();
    }
    async function A() {
      m.value = "", d.value = "", c.value = "", v.value = "", k.value = "", h.value = 1, await w();
    }
    async function L(p) {
      h.value = p, await w();
    }
    function M(p) {
      C.push({ name: "admin_customer_profile", params: { id: p } });
    }
    function F(p) {
      C.push({ name: "admin_customer_edit", params: { id: p } });
    }
    return O(w), (p, a) => {
      const q = j("RouterLink");
      return o(), l("div", null, [
        t("div", W, [
          Z,
          H(q, {
            to: { name: "admin_customer_create" },
            class: "btn btn-dark btn-sm"
          }, {
            default: Y(() => [
              Q(" + New Customer ")
            ]),
            _: 1
          })
        ]),
        t("form", {
          onSubmit: z(S, ["prevent"]),
          class: "mb-3"
        }, [
          t("div", et, [
            f(t("input", {
              type: "text",
              "onUpdate:modelValue": a[0] || (a[0] = (e) => m.value = e),
              class: "form-control",
              placeholder: "Search by name, email, or phone..."
            }, null, 512), [
              [g, m.value]
            ]),
            t("div", st, [
              at,
              t("button", {
                type: "button",
                class: "btn btn-outline-secondary",
                onClick: a[1] || (a[1] = (e) => u.value = !u.value)
              }, n(u.value ? "Hide Filters" : "Filters"), 1)
            ])
          ])
        ], 40, tt),
        u.value ? (o(), l("div", ot, [
          t("div", lt, [
            t("div", nt, [
              t("div", it, [
                rt,
                f(t("input", {
                  type: "date",
                  "onUpdate:modelValue": a[2] || (a[2] = (e) => d.value = e),
                  class: "form-control form-control-sm"
                }, null, 512), [
                  [g, d.value]
                ])
              ]),
              t("div", ut, [
                dt,
                f(t("input", {
                  type: "date",
                  "onUpdate:modelValue": a[3] || (a[3] = (e) => c.value = e),
                  class: "form-control form-control-sm"
                }, null, 512), [
                  [g, c.value]
                ])
              ]),
              t("div", ct, [
                mt,
                f(t("input", {
                  type: "date",
                  "onUpdate:modelValue": a[4] || (a[4] = (e) => v.value = e),
                  class: "form-control form-control-sm"
                }, null, 512), [
                  [g, v.value]
                ])
              ]),
              t("div", vt, [
                pt,
                f(t("input", {
                  type: "date",
                  "onUpdate:modelValue": a[5] || (a[5] = (e) => k.value = e),
                  class: "form-control form-control-sm"
                }, null, 512), [
                  [g, k.value]
                ])
              ])
            ]),
            t("div", { class: "mt-2" }, [
              t("button", {
                class: "btn btn-primary btn-sm mr-2",
                onClick: S
              }, "Apply"),
              t("button", {
                class: "btn btn-outline-secondary btn-sm",
                onClick: A
              }, "Clear")
            ])
          ])
        ])) : y("", !0),
        r(s).isLoading.value ? (o(), l("div", _t, bt)) : y("", !0),
        r(s).hasError.value ? (o(), l("div", ft, " Failed to load customers. ")) : y("", !0),
        r(s).result.value && !r(s).isLoading.value ? (o(), l("div", gt, [
          t("p", yt, n(r(s).result.value.totalCount) + " customers found (page " + n(r(s).result.value.page) + " of " + n(x.value) + ") ", 1),
          t("table", Ct, [
            kt,
            t("tbody", null, [
              (o(!0), l(U, null, E(r(s).result.value.items, (e) => (o(), l("tr", {
                key: e.id
              }, [
                t("td", null, n(e.id), 1),
                t("td", null, n(e.user.firstName) + " " + n(e.user.lastName), 1),
                t("td", null, n(e.user.email), 1),
                t("td", null, n(e.user.phone || "-"), 1),
                t("td", null, [
                  e.user.isMobilePhoneVerified ? (o(), l("span", wt, "Yes")) : (o(), l("span", Vt, "No"))
                ]),
                t("td", null, [
                  (o(!0), l(U, null, E(e.user.siteUsers, (b) => (o(), l("span", {
                    key: b.site,
                    class: "badge badge-info mr-1",
                    title: "MB ID: " + (b.externalUserId || "N/A")
                  }, n(b.site), 9, Dt))), 128))
                ]),
                t("td", null, [
                  t("button", {
                    class: "btn btn-outline-secondary btn-sm mr-1",
                    onClick: (b) => M(e.id)
                  }, " View ", 8, Nt),
                  t("button", {
                    class: "btn btn-outline-secondary btn-sm",
                    onClick: (b) => F(e.id)
                  }, " Edit ", 8, Pt)
                ])
              ]))), 128))
            ])
          ]),
          r(s).result.value ? (o(), G(J, {
            key: 0,
            page: h.value,
            limit: N,
            total: r(s).result.value.totalCount,
            onPageChanged: L
          }, null, 8, ["page", "total"])) : y("", !0)
        ])) : y("", !0)
      ]);
    };
  }
});
export {
  Ut as default
};
