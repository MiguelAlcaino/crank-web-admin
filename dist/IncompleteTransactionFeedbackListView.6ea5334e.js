import { ad as K, ac as $, r as y, ae as k, d as Y, I as j, G, a as Q, K as W, M as z, b as i, e, f as A, i as M, ag as H, g as c, j as v, t as d, F as S, h as J, T as q, aa as X, o as l, N as Z, B as ee } from "./index.cb70f358.js";
const B = {
  "temporal_transaction.not_found": "not_found",
  "temporal_transaction.already_completed": "already_done",
  "temporal_transaction.feedback_in_progress": "in_progress",
  "temporal_transaction.already_sold": "already_sold"
}, D = {
  "Temporal Transaction not found": "not_found",
  "This temporal transactions seemed to be processed successfully already": "already_done"
};
function te(_) {
  var s, o, r;
  const m = K(_);
  if (m && B[m])
    return B[m];
  const f = (r = (o = (s = _ == null ? void 0 : _.graphQLErrors) == null ? void 0 : s[0]) == null ? void 0 : o.extensions) == null ? void 0 : r.debugMessage;
  return typeof f == "string" && D[f] ? D[f] : "error";
}
const se = $`
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
`, ae = $`
  mutation RetryTransactionFeedback($id: ID!) {
    retryTransactionFeedback(id: $id)
  }
`, ne = (_) => {
  const m = y(null), f = y(!1), s = y(!1), o = y(""), r = y(null);
  async function h(n, g) {
    f.value = !0, s.value = !1;
    try {
      const { data: p } = await _.query({
        query: se,
        variables: {
          filter: n && Object.keys(n).length > 0 ? n : void 0,
          pagination: g
        },
        fetchPolicy: "network-only"
      });
      m.value = p.incompleteTransactionFeedbacks;
    } catch {
      s.value = !0, o.value = "Failed to load incomplete feedbacks";
    } finally {
      f.value = !1;
    }
  }
  async function b(n) {
    r.value = n;
    try {
      return await _.mutate({
        mutation: ae,
        variables: { id: n }
      }), "success";
    } catch (g) {
      return te(g);
    } finally {
      r.value = null;
    }
  }
  return {
    listResult: k(m),
    isLoading: k(f),
    hasError: k(s),
    errorMessage: k(o),
    retryingId: k(r),
    fetchList: h,
    retry: b
  };
}, le = /* @__PURE__ */ e("h4", null, "Incomplete Transaction Feedbacks", -1), oe = { class: "row mb-3" }, re = { class: "col-md-4" }, ie = ["onKeyup"], ce = { class: "col-md-3" }, de = {
  key: 0,
  class: "text-center py-4"
}, ue = /* @__PURE__ */ e("div", {
  class: "spinner-border",
  role: "status"
}, null, -1), fe = [
  ue
], _e = {
  key: 1,
  class: "alert alert-danger"
}, pe = { key: 2 }, ye = { class: "text-muted small mb-2" }, me = { class: "table table-striped table-sm" }, he = /* @__PURE__ */ e("thead", null, [
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
], -1), be = { key: 0 }, ge = /* @__PURE__ */ e("td", {
  colspan: "8",
  class: "text-center text-muted py-3"
}, "No incomplete feedbacks found", -1), ve = [
  ge
], ke = /* @__PURE__ */ e("br", null, null, -1), Ce = { class: "text-muted" }, Re = {
  key: 1,
  class: "text-muted"
}, Te = { class: "badge text-bg-warning" }, we = ["disabled", "onClick"], Ue = { key: 0 }, Ie = { key: 1 }, Fe = { key: 2 }, T = 25, xe = /* @__PURE__ */ Y({
  __name: "IncompleteTransactionFeedbackListView",
  setup(_) {
    const f = j("https://payments.crank-fit.com/api/graphql/"), s = ne(f), o = G(), r = y(""), h = y(""), b = y(1), n = Q({});
    function g(a) {
      return a ? new Date(a).toLocaleString() : "-";
    }
    async function p() {
      const a = {};
      r.value && (a.email = r.value), h.value && (a.createdAfter = new Date(h.value).toISOString()), await s.fetchList(
        Object.keys(a).length > 0 ? a : void 0,
        { page: b.value, limit: T }
      );
    }
    async function w() {
      b.value = 1, await p();
    }
    async function O() {
      r.value = "", h.value = "", b.value = 1, await p();
    }
    async function P(a) {
      b.value = a, await p();
    }
    async function V(a) {
      const u = await s.retry(a);
      u === "success" ? o.success("Retry dispatched \u2014 the row will disappear once processing completes") : u === "not_found" ? o.warning("Record not found \u2014 it may have been completed already") : u === "already_done" ? o.info("Already processed successfully") : u === "in_progress" ? o.info("A delivery of this feedback is being processed right now") : u === "already_sold" ? o.warning("Mindbody has already sold this purchase; finish the rest by hand") : o.error("Retry failed \u2014 please try again later"), n[a] = 5;
      const C = setInterval(async () => {
        n[a]--, n[a] <= 0 && (clearInterval(C), delete n[a], await p());
      }, 1e3);
    }
    return W(p), (a, u) => {
      const C = z("router-link");
      return l(), i("div", null, [
        le,
        e("div", oe, [
          e("div", re, [
            A(e("input", {
              type: "text",
              "onUpdate:modelValue": u[0] || (u[0] = (t) => r.value = t),
              class: "form-control form-control-sm",
              placeholder: "Customer email",
              onKeyup: H(w, ["enter"])
            }, null, 40, ie), [
              [M, r.value]
            ])
          ]),
          e("div", ce, [
            A(e("input", {
              type: "date",
              "onUpdate:modelValue": u[1] || (u[1] = (t) => h.value = t),
              class: "form-control form-control-sm"
            }, null, 512), [
              [M, h.value]
            ])
          ]),
          e("div", { class: "col-md-2" }, [
            e("button", {
              class: "btn btn-primary btn-sm me-2",
              onClick: w
            }, "Filter"),
            e("button", {
              class: "btn btn-outline-secondary btn-sm",
              onClick: O
            }, "Clear")
          ])
        ]),
        c(s).isLoading.value ? (l(), i("div", de, fe)) : v("", !0),
        c(s).hasError.value ? (l(), i("div", _e, d(c(s).errorMessage.value), 1)) : v("", !0),
        c(s).listResult.value && !c(s).isLoading.value ? (l(), i("div", pe, [
          e("p", ye, d(c(s).listResult.value.totalCount) + " record(s) found ", 1),
          e("table", me, [
            he,
            e("tbody", null, [
              c(s).listResult.value.items.length === 0 ? (l(), i("tr", be, ve)) : v("", !0),
              (l(!0), i(S, null, J(c(s).listResult.value.items, (t) => {
                var U, I, F, E, x, L;
                return l(), i("tr", {
                  key: t.id
                }, [
                  e("td", null, d((U = t.merchantReference) != null ? U : "-"), 1),
                  e("td", null, [
                    (I = t.siteCustomer) != null && I.identifiableUser ? (l(), i(S, { key: 0 }, [
                      t.siteCustomer.identifiableUser.id ? (l(), q(C, {
                        key: 0,
                        to: { name: "admin_customer_profile", params: { id: t.siteCustomer.identifiableUser.id } }
                      }, {
                        default: Z(() => {
                          var R, N;
                          return [
                            ee(d((R = t.siteCustomer.identifiableUser.user) == null ? void 0 : R.firstName) + " " + d((N = t.siteCustomer.identifiableUser.user) == null ? void 0 : N.lastName), 1)
                          ];
                        }),
                        _: 2
                      }, 1032, ["to"])) : v("", !0),
                      ke,
                      e("small", Ce, d((F = t.siteCustomer.identifiableUser.user) == null ? void 0 : F.email), 1)
                    ], 64)) : (l(), i("span", Re, "\u2014"))
                  ]),
                  e("td", null, d((L = (x = (E = t.siteCustomer) == null ? void 0 : E.siteUserInfo) == null ? void 0 : x.site) != null ? L : "-"), 1),
                  e("td", null, [
                    e("span", Te, d(t.status), 1)
                  ]),
                  e("td", null, d(t.feedbackTryNumber), 1),
                  e("td", null, d(g(t.feedbackStatusUpdatedAt)), 1),
                  e("td", null, d(g(t.created)), 1),
                  e("td", null, [
                    e("button", {
                      class: "btn btn-outline-primary btn-sm",
                      disabled: c(s).retryingId.value === t.id || t.id in n,
                      onClick: (R) => V(t.id)
                    }, [
                      c(s).retryingId.value === t.id ? (l(), i("span", Ue, "Retrying\u2026")) : t.id in n ? (l(), i("span", Ie, "Wait " + d(n[t.id]) + "s", 1)) : (l(), i("span", Fe, "Retry"))
                    ], 8, we)
                  ])
                ]);
              }), 128))
            ])
          ]),
          c(s).listResult.value.totalCount > T ? (l(), q(X, {
            key: 0,
            page: b.value,
            limit: T,
            total: c(s).listResult.value.totalCount,
            onPageChanged: P
          }, null, 8, ["page", "total"])) : v("", !0)
        ])) : v("", !0)
      ]);
    };
  }
});
export {
  xe as default
};
