import { N as I, r as i, O as D, d as R, H as $, z as B, c as T, I as O, J as j, b as l, e as t, k as H, K as Y, f, i as g, t as n, w as z, j as y, g as r, F as S, h as U, M as J, Z as K, o, B as Q } from "./index.8423d6a8.js";
const Z = I`
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
`, G = (N) => {
  const V = i(null), _ = i(!1), s = i(!1);
  async function C(m) {
    _.value = !0, s.value = !1;
    try {
      const { page: u, limit: d, ...c } = m, { data: v } = await N.query({
        query: Z,
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
}, W = { class: "d-flex justify-content-between align-items-center mb-3" }, X = /* @__PURE__ */ t("h4", null, "Clients", -1), tt = ["onSubmit"], et = { class: "input-group" }, st = /* @__PURE__ */ t("button", {
  type: "submit",
  class: "btn btn-primary"
}, "Search", -1), at = {
  key: 0,
  class: "card mb-3"
}, ot = { class: "card-body" }, lt = { class: "row" }, nt = { class: "col-md-3" }, it = /* @__PURE__ */ t("label", { class: "small" }, "Registration From", -1), rt = { class: "col-md-3" }, ut = /* @__PURE__ */ t("label", { class: "small" }, "Registration To", -1), dt = { class: "col-md-3" }, ct = /* @__PURE__ */ t("label", { class: "small" }, "VOD From", -1), mt = { class: "col-md-3" }, vt = /* @__PURE__ */ t("label", { class: "small" }, "VOD To", -1), pt = {
  key: 1,
  class: "text-center py-4"
}, _t = /* @__PURE__ */ t("div", {
  class: "spinner-border",
  role: "status"
}, [
  /* @__PURE__ */ t("span", { class: "sr-only" }, "Loading...")
], -1), ht = [
  _t
], bt = {
  key: 2,
  class: "alert alert-danger"
}, ft = { key: 3 }, gt = { class: "text-muted small" }, yt = { class: "table table-striped table-sm" }, Ct = /* @__PURE__ */ t("thead", null, [
  /* @__PURE__ */ t("tr", null, [
    /* @__PURE__ */ t("th", null, "ID"),
    /* @__PURE__ */ t("th", null, "Name"),
    /* @__PURE__ */ t("th", null, "Email"),
    /* @__PURE__ */ t("th", null, "Phone"),
    /* @__PURE__ */ t("th", null, "Phone Verified"),
    /* @__PURE__ */ t("th", null, "Sites"),
    /* @__PURE__ */ t("th", null, "Actions")
  ])
], -1), kt = {
  key: 0,
  class: "badge text-bg-success"
}, wt = {
  key: 1,
  class: "badge text-bg-secondary"
}, Vt = ["title"], Dt = ["onClick"], xt = ["onClick"], x = 50, Pt = /* @__PURE__ */ R({
  __name: "CustomerListView",
  setup(N) {
    const _ = $("https://payments.crank-fit.com/api/graphql/"), s = G(_), C = B(), m = i(""), u = i(!1), d = i(""), c = i(""), v = i(""), k = i(""), h = i(1), E = T(() => s.result.value ? Math.ceil(s.result.value.totalCount / x) : 1);
    async function w() {
      await s.fetchCustomers({
        search: m.value || void 0,
        registrationStartDate: d.value || void 0,
        registrationEndDate: c.value || void 0,
        vodStartDate: v.value || void 0,
        vodEndDate: k.value || void 0,
        page: h.value,
        limit: x
      });
    }
    async function P() {
      h.value = 1, await w();
    }
    async function M() {
      m.value = "", d.value = "", c.value = "", v.value = "", k.value = "", h.value = 1, await w();
    }
    async function A(p) {
      h.value = p, await w();
    }
    function F(p) {
      C.push({ name: "admin_customer_profile", params: { id: p } });
    }
    function L(p) {
      C.push({ name: "admin_customer_edit", params: { id: p } });
    }
    return O(w), (p, a) => {
      const q = j("RouterLink");
      return o(), l("div", null, [
        t("div", W, [
          X,
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
          onSubmit: z(P, ["prevent"]),
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
            st,
            t("button", {
              type: "button",
              class: "btn btn-outline-secondary",
              onClick: a[1] || (a[1] = (e) => u.value = !u.value)
            }, n(u.value ? "Hide Filters" : "Filters"), 1)
          ])
        ], 40, tt),
        u.value ? (o(), l("div", at, [
          t("div", ot, [
            t("div", lt, [
              t("div", nt, [
                it,
                f(t("input", {
                  type: "date",
                  "onUpdate:modelValue": a[2] || (a[2] = (e) => d.value = e),
                  class: "form-control form-control-sm"
                }, null, 512), [
                  [g, d.value]
                ])
              ]),
              t("div", rt, [
                ut,
                f(t("input", {
                  type: "date",
                  "onUpdate:modelValue": a[3] || (a[3] = (e) => c.value = e),
                  class: "form-control form-control-sm"
                }, null, 512), [
                  [g, c.value]
                ])
              ]),
              t("div", dt, [
                ct,
                f(t("input", {
                  type: "date",
                  "onUpdate:modelValue": a[4] || (a[4] = (e) => v.value = e),
                  class: "form-control form-control-sm"
                }, null, 512), [
                  [g, v.value]
                ])
              ]),
              t("div", mt, [
                vt,
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
                class: "btn btn-primary btn-sm me-2",
                onClick: P
              }, "Apply"),
              t("button", {
                class: "btn btn-outline-secondary btn-sm",
                onClick: M
              }, "Clear")
            ])
          ])
        ])) : y("", !0),
        r(s).isLoading.value ? (o(), l("div", pt, ht)) : y("", !0),
        r(s).hasError.value ? (o(), l("div", bt, " Failed to load customers. ")) : y("", !0),
        r(s).result.value && !r(s).isLoading.value ? (o(), l("div", ft, [
          t("p", gt, n(r(s).result.value.totalCount) + " customers found (page " + n(r(s).result.value.page) + " of " + n(E.value) + ") ", 1),
          t("table", yt, [
            Ct,
            t("tbody", null, [
              (o(!0), l(S, null, U(r(s).result.value.items, (e) => (o(), l("tr", {
                key: e.id
              }, [
                t("td", null, n(e.id), 1),
                t("td", null, n(e.user.firstName) + " " + n(e.user.lastName), 1),
                t("td", null, n(e.user.email), 1),
                t("td", null, n(e.user.phone || "-"), 1),
                t("td", null, [
                  e.user.isMobilePhoneVerified ? (o(), l("span", kt, "Yes")) : (o(), l("span", wt, "No"))
                ]),
                t("td", null, [
                  (o(!0), l(S, null, U(e.user.siteUsers, (b) => (o(), l("span", {
                    key: b.site,
                    class: "badge text-bg-info me-1",
                    title: "MB ID: " + (b.externalUserId || "N/A")
                  }, n(b.site), 9, Vt))), 128))
                ]),
                t("td", null, [
                  t("button", {
                    class: "btn btn-outline-secondary btn-sm me-1",
                    onClick: (b) => F(e.id)
                  }, " View ", 8, Dt),
                  t("button", {
                    class: "btn btn-outline-secondary btn-sm",
                    onClick: (b) => L(e.id)
                  }, " Edit ", 8, xt)
                ])
              ]))), 128))
            ])
          ]),
          r(s).result.value ? (o(), J(K, {
            key: 0,
            page: h.value,
            limit: x,
            total: r(s).result.value.totalCount,
            onPageChanged: A
          }, null, 8, ["page", "total"])) : y("", !0)
        ])) : y("", !0)
      ]);
    };
  }
});
export {
  Pt as default
};
