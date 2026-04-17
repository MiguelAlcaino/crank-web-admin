import { O as V, r as f, P as k, d as B, H as O, a as K, I as j, K as Q, b as o, e, f as E, i as P, a0 as Y, g as r, j as h, t as i, F as $, h as H, N as D, Z as W, o as l, L as Z, B as z } from "./index.b0f32500.js";
import { u as G } from "./useToast.8f62be70.js";
const J = V`
  query IncompleteFeedbacks(
    $filter: IncompleteTransactionFeedbackFilterInput
    $pagination: PaginationInput
  ) {
    incompleteTransactionFeedbacks(filter: $filter, pagination: $pagination) {
      totalCount
      page
      limit
      items {
        id
        merchantReference
        status
        feedbackTryNumber
        feedbackStatusUpdatedAt
        created
        siteCustomer {
          id
          siteUserInfo {
            site
            externalUserId
          }
          identifiableUser {
            id
            user {
              firstName
              lastName
              email
            }
          }
        }
      }
    }
  }
`, X = V`
  mutation RetryTransactionFeedback($id: ID!) {
    retryTransactionFeedback(id: $id)
  }
`, ee = (T) => {
  const I = f(null), b = f(!1), s = f(!1), m = f(""), u = f(null);
  async function p(n, _) {
    b.value = !0, s.value = !1;
    try {
      const { data: c } = await T.query({
        query: J,
        variables: {
          filter: n && Object.keys(n).length > 0 ? n : void 0,
          pagination: _
        },
        fetchPolicy: "network-only"
      });
      I.value = c.incompleteTransactionFeedbacks;
    } catch {
      s.value = !0, m.value = "Failed to load incomplete feedbacks";
    } finally {
      b.value = !1;
    }
  }
  async function y(n) {
    var _, c, v, C;
    u.value = n;
    try {
      return await T.mutate({
        mutation: X,
        variables: { id: n }
      }), "success";
    } catch (g) {
      const w = (C = (v = (c = (_ = g == null ? void 0 : g.graphQLErrors) == null ? void 0 : _[0]) == null ? void 0 : c.extensions) == null ? void 0 : v.debugMessage) != null ? C : "";
      return w === "Temporal Transaction not found" ? "not_found" : w === "This temporal transactions seemed to be processed successfully already" ? "already_done" : "error";
    } finally {
      u.value = null;
    }
  }
  return {
    listResult: k(I),
    isLoading: k(b),
    hasError: k(s),
    errorMessage: k(m),
    retryingId: k(u),
    fetchList: p,
    retry: y
  };
}, te = /* @__PURE__ */ e("h4", null, "Incomplete Transaction Feedbacks", -1), se = { class: "row mb-3" }, ae = { class: "col-md-4" }, ne = ["onKeyup"], le = { class: "col-md-3" }, oe = {
  key: 0,
  class: "text-center py-4"
}, re = /* @__PURE__ */ e("div", {
  class: "spinner-border",
  role: "status"
}, null, -1), ie = [
  re
], ce = {
  key: 1,
  class: "alert alert-danger"
}, ue = { key: 2 }, de = { class: "text-muted small mb-2" }, fe = { class: "table table-striped table-sm" }, me = /* @__PURE__ */ e("thead", null, [
  /* @__PURE__ */ e("tr", null, [
    /* @__PURE__ */ e("th", null, "Merchant Ref"),
    /* @__PURE__ */ e("th", null, "Customer"),
    /* @__PURE__ */ e("th", null, "Site"),
    /* @__PURE__ */ e("th", null, "Status"),
    /* @__PURE__ */ e("th", null, "Try #"),
    /* @__PURE__ */ e("th", null, "Last Updated"),
    /* @__PURE__ */ e("th", null, "Created"),
    /* @__PURE__ */ e("th", null, "Actions")
  ])
], -1), pe = { key: 0 }, ye = /* @__PURE__ */ e("td", {
  colspan: "8",
  class: "text-center text-muted py-3"
}, "No incomplete feedbacks found", -1), _e = [
  ye
], he = /* @__PURE__ */ e("br", null, null, -1), be = { class: "text-muted" }, ve = {
  key: 1,
  class: "text-muted"
}, ge = { class: "badge text-bg-warning" }, ke = ["disabled", "onClick"], Ce = { key: 0 }, we = { key: 1 }, Te = { key: 2 }, F = 25, Ue = /* @__PURE__ */ B({
  __name: "IncompleteTransactionFeedbackListView",
  setup(T) {
    const b = O("https://payments.crank-fit.com/api/graphql/"), s = ee(b), m = G(), u = f(""), p = f(""), y = f(1), n = K({});
    function _(a) {
      return a ? new Date(a).toLocaleString() : "-";
    }
    async function c() {
      const a = {};
      u.value && (a.email = u.value), p.value && (a.createdAfter = new Date(p.value).toISOString()), await s.fetchList(
        Object.keys(a).length > 0 ? a : void 0,
        { page: y.value, limit: F }
      );
    }
    async function v() {
      y.value = 1, await c();
    }
    async function C() {
      u.value = "", p.value = "", y.value = 1, await c();
    }
    async function g(a) {
      y.value = a, await c();
    }
    async function w(a) {
      const d = await s.retry(a);
      d === "success" ? m.success("Retry dispatched \u2014 the row will disappear once processing completes") : d === "not_found" ? m.warning("Record not found \u2014 it may have been completed already") : d === "already_done" ? m.info("Already processed successfully") : m.error("Retry failed \u2014 please try again later"), n[a] = 5;
      const R = setInterval(async () => {
        n[a]--, n[a] <= 0 && (clearInterval(R), delete n[a], await c());
      }, 1e3);
    }
    return j(c), (a, d) => {
      const R = Q("router-link");
      return l(), o("div", null, [
        te,
        e("div", se, [
          e("div", ae, [
            E(e("input", {
              type: "text",
              "onUpdate:modelValue": d[0] || (d[0] = (t) => u.value = t),
              class: "form-control form-control-sm",
              placeholder: "Customer email",
              onKeyup: Y(v, ["enter"])
            }, null, 40, ne), [
              [P, u.value]
            ])
          ]),
          e("div", le, [
            E(e("input", {
              type: "date",
              "onUpdate:modelValue": d[1] || (d[1] = (t) => p.value = t),
              class: "form-control form-control-sm"
            }, null, 512), [
              [P, p.value]
            ])
          ]),
          e("div", { class: "col-md-2" }, [
            e("button", {
              class: "btn btn-primary btn-sm me-2",
              onClick: v
            }, "Filter"),
            e("button", {
              class: "btn btn-outline-secondary btn-sm",
              onClick: C
            }, "Clear")
          ])
        ]),
        r(s).isLoading.value ? (l(), o("div", oe, ie)) : h("", !0),
        r(s).hasError.value ? (l(), o("div", ce, i(r(s).errorMessage.value), 1)) : h("", !0),
        r(s).listResult.value && !r(s).isLoading.value ? (l(), o("div", ue, [
          e("p", de, i(r(s).listResult.value.totalCount) + " record(s) found ", 1),
          e("table", fe, [
            me,
            e("tbody", null, [
              r(s).listResult.value.items.length === 0 ? (l(), o("tr", pe, _e)) : h("", !0),
              (l(!0), o($, null, H(r(s).listResult.value.items, (t) => {
                var x, L, N, A, M, S;
                return l(), o("tr", {
                  key: t.id
                }, [
                  e("td", null, i((x = t.merchantReference) != null ? x : "-"), 1),
                  e("td", null, [
                    (L = t.siteCustomer) != null && L.identifiableUser ? (l(), o($, { key: 0 }, [
                      t.siteCustomer.identifiableUser.id ? (l(), D(R, {
                        key: 0,
                        to: { name: "admin_customer_profile", params: { id: t.siteCustomer.identifiableUser.id } }
                      }, {
                        default: Z(() => {
                          var U, q;
                          return [
                            z(i((U = t.siteCustomer.identifiableUser.user) == null ? void 0 : U.firstName) + " " + i((q = t.siteCustomer.identifiableUser.user) == null ? void 0 : q.lastName), 1)
                          ];
                        }),
                        _: 2
                      }, 1032, ["to"])) : h("", !0),
                      he,
                      e("small", be, i((N = t.siteCustomer.identifiableUser.user) == null ? void 0 : N.email), 1)
                    ], 64)) : (l(), o("span", ve, "\u2014"))
                  ]),
                  e("td", null, i((S = (M = (A = t.siteCustomer) == null ? void 0 : A.siteUserInfo) == null ? void 0 : M.site) != null ? S : "-"), 1),
                  e("td", null, [
                    e("span", ge, i(t.status), 1)
                  ]),
                  e("td", null, i(t.feedbackTryNumber), 1),
                  e("td", null, i(_(t.feedbackStatusUpdatedAt)), 1),
                  e("td", null, i(_(t.created)), 1),
                  e("td", null, [
                    e("button", {
                      class: "btn btn-outline-primary btn-sm",
                      disabled: r(s).retryingId.value === t.id || t.id in n,
                      onClick: (U) => w(t.id)
                    }, [
                      r(s).retryingId.value === t.id ? (l(), o("span", Ce, "Retrying\u2026")) : t.id in n ? (l(), o("span", we, "Wait " + i(n[t.id]) + "s", 1)) : (l(), o("span", Te, "Retry"))
                    ], 8, ke)
                  ])
                ]);
              }), 128))
            ])
          ]),
          r(s).listResult.value.totalCount > F ? (l(), D(W, {
            key: 0,
            page: y.value,
            limit: F,
            total: r(s).listResult.value.totalCount,
            onPageChanged: g
          }, null, 8, ["page", "total"])) : h("", !0)
        ])) : h("", !0)
      ]);
    };
  }
});
export {
  Ue as default
};
