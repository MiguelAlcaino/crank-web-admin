import { O as L, r as b, P as f, d as I, H as x, G as F, z as T, I as U, c as E, K as $, b as a, e as t, g as s, j as m, t as r, A as N, F as q, h as B, o as l, k as V, L as M, B as P } from "./index.4c9212d3.js";
const R = L`
  mutation CancelSubscription($subscriptionId: ID!) {
    cancelSubscription(input: { subscriptionId: $subscriptionId }) {
      ... on CancelSubscriptionSuccess {
        success
      }
      ... on SubscriptionNotFoundError {
        code
      }
      ... on SubscriptionDoesNotBelongToUserError {
        code
      }
      ... on SubscriptionAlreadyCancelledError {
        code
      }
      ... on UnknownError {
        code
      }
    }
  }
`, O = L`
  query CustomerSubscription($id: ID!) {
    customerSubscription(id: $id) {
      id
      status
      amountCents
      billingInterval
      creditCardLastFourDigits
      createdAt
      cancelledAt
      transactions {
        id
        amount
        status
        created
        customerName
        customerEmail
      }
    }
  }
`, j = (k) => {
  const y = b(null), h = b(!1), e = b(!1), c = b(!1), p = b("");
  async function g(v) {
    h.value = !0, c.value = !1, y.value = null;
    try {
      const { data: i } = await k.query({
        query: O,
        variables: { id: v },
        fetchPolicy: "network-only"
      });
      y.value = i.customerSubscription;
    } catch {
      c.value = !0, p.value = "Failed to load subscription";
    } finally {
      h.value = !1;
    }
  }
  async function w(v) {
    var i;
    e.value = !0, c.value = !1;
    try {
      const { data: u } = await k.mutate({
        mutation: R,
        variables: { subscriptionId: v }
      }), _ = u == null ? void 0 : u.cancelSubscription;
      return _ != null && _.success ? { success: !0 } : { success: !1, errorCode: (i = _ == null ? void 0 : _.code) != null ? i : "UNKNOWN" };
    } catch {
      return c.value = !0, p.value = "Failed to cancel subscription", { success: !1 };
    } finally {
      e.value = !1;
    }
  }
  return {
    detail: f(y),
    isLoading: f(h),
    isCancelling: f(e),
    hasError: f(c),
    errorMessage: f(p),
    fetchDetail: g,
    cancel: w
  };
}, z = { class: "d-flex justify-content-between align-items-center mb-3" }, H = /* @__PURE__ */ t("h4", null, "Subscription Detail", -1), K = {
  key: 0,
  class: "text-center py-4"
}, G = /* @__PURE__ */ t("div", {
  class: "spinner-border",
  role: "status"
}, null, -1), Q = [
  G
], W = {
  key: 1,
  class: "alert alert-danger"
}, Y = { key: 2 }, J = { class: "table table-bordered" }, X = /* @__PURE__ */ t("th", { width: "200" }, "Customer", -1), Z = { key: 0 }, tt = { class: "text-muted" }, et = { key: 1 }, st = /* @__PURE__ */ t("th", null, "Plan", -1), nt = /* @__PURE__ */ t("th", null, "Status", -1), at = /* @__PURE__ */ t("th", null, "Card", -1), lt = /* @__PURE__ */ t("th", null, "Started", -1), ot = { key: 0 }, rt = /* @__PURE__ */ t("th", null, "Cancelled", -1), it = {
  key: 0,
  class: "mt-3"
}, ut = { key: 0 }, ct = {
  key: 1,
  class: "alert alert-warning"
}, dt = /* @__PURE__ */ t("p", null, "Are you sure you want to cancel this subscription?", -1), _t = {
  key: 0,
  class: "text-danger mb-2"
}, vt = ["disabled"], bt = { key: 0 }, mt = { key: 1 }, ht = /* @__PURE__ */ t("h5", { class: "mt-4" }, "Renewal History", -1), pt = {
  key: 1,
  class: "text-muted"
}, gt = {
  key: 2,
  class: "table table-sm table-striped"
}, ft = /* @__PURE__ */ t("thead", null, [
  /* @__PURE__ */ t("tr", null, [
    /* @__PURE__ */ t("th", null, "Date"),
    /* @__PURE__ */ t("th", null, "Amount"),
    /* @__PURE__ */ t("th", null, "Status"),
    /* @__PURE__ */ t("th")
  ])
], -1), Ct = /* @__PURE__ */ I({
  __name: "SubscriptionDetailView",
  setup(k) {
    const h = x("https://payments.crank-fit.com/api/graphql/"), e = j(h), c = F(), p = T();
    U(() => {
      e.fetchDetail(c.params.id);
    });
    function g(n) {
      return n ? new Date(n).toLocaleString() : "\u2014";
    }
    function w(n) {
      return (n / 100).toFixed(2);
    }
    const v = E(() => {
      var o;
      const n = (o = e.detail.value) == null ? void 0 : o.transactions;
      return n != null && n.length ? { name: n[0].customerName, email: n[0].customerEmail } : null;
    }), i = b(!1), u = b(null);
    async function _() {
      var o;
      u.value = null;
      const n = await e.cancel(c.params.id);
      n.success ? (i.value = !1, await e.fetchDetail(c.params.id)) : u.value = (o = n.errorCode) != null ? o : "Unknown error";
    }
    const S = E(() => {
      var n;
      return (n = e.detail.value) != null && n.transactions ? [...e.detail.value.transactions].sort((o, C) => !o.created || !C.created ? 0 : new Date(C.created).getTime() - new Date(o.created).getTime()) : [];
    });
    return (n, o) => {
      const C = $("router-link");
      return l(), a("div", null, [
        t("div", z, [
          H,
          t("button", {
            class: "btn btn-outline-secondary btn-sm",
            onClick: o[0] || (o[0] = (d) => s(p).back())
          }, "Back")
        ]),
        s(e).isLoading.value ? (l(), a("div", K, Q)) : m("", !0),
        s(e).hasError.value ? (l(), a("div", W, r(s(e).errorMessage.value), 1)) : m("", !0),
        s(e).detail.value && !s(e).isLoading.value ? (l(), a("div", Y, [
          t("table", J, [
            t("tbody", null, [
              t("tr", null, [
                X,
                t("td", null, [
                  v.value ? (l(), a("div", Z, [
                    t("div", null, r(v.value.name || "\u2014"), 1),
                    t("small", tt, r(v.value.email), 1)
                  ])) : (l(), a("span", et, "\u2014"))
                ])
              ]),
              t("tr", null, [
                st,
                t("td", null, r(s(e).detail.value.billingInterval) + " \u2014 " + r(w(s(e).detail.value.amountCents)), 1)
              ]),
              t("tr", null, [
                nt,
                t("td", null, [
                  t("span", {
                    class: N(["badge", s(e).detail.value.status === "active" ? "text-bg-success" : "text-bg-warning"])
                  }, r(s(e).detail.value.status), 3)
                ])
              ]),
              t("tr", null, [
                at,
                t("td", null, r(s(e).detail.value.creditCardLastFourDigits ? `****${s(e).detail.value.creditCardLastFourDigits}` : "\u2014"), 1)
              ]),
              t("tr", null, [
                lt,
                t("td", null, r(g(s(e).detail.value.createdAt)), 1)
              ]),
              s(e).detail.value.cancelledAt ? (l(), a("tr", ot, [
                rt,
                t("td", null, r(g(s(e).detail.value.cancelledAt)), 1)
              ])) : m("", !0)
            ])
          ]),
          s(e).detail.value.status === "active" ? (l(), a("div", it, [
            i.value ? (l(), a("div", ct, [
              dt,
              u.value ? (l(), a("div", _t, "Error: " + r(u.value), 1)) : m("", !0),
              t("button", {
                class: "btn btn-danger btn-sm me-2",
                onClick: _,
                disabled: s(e).isCancelling.value
              }, [
                s(e).isCancelling.value ? (l(), a("span", bt, "Processing...")) : (l(), a("span", mt, "Confirm Cancel"))
              ], 8, vt),
              t("button", {
                class: "btn btn-secondary btn-sm",
                onClick: o[2] || (o[2] = (d) => {
                  i.value = !1, u.value = null;
                })
              }, " Back ")
            ])) : (l(), a("div", ut, [
              t("button", {
                class: "btn btn-danger btn-sm",
                onClick: o[1] || (o[1] = (d) => i.value = !0)
              }, "Cancel Subscription")
            ]))
          ])) : m("", !0),
          ht,
          S.value.length ? (l(), a("table", gt, [
            ft,
            t("tbody", null, [
              (l(!0), a(q, null, B(S.value, (d) => {
                var D, A;
                return l(), a("tr", {
                  key: d.id
                }, [
                  t("td", null, r(g(d.created)), 1),
                  t("td", null, r((D = d.amount) != null ? D : "\u2014"), 1),
                  t("td", null, [
                    t("span", {
                      class: N(["badge", d.status === "Success" ? "text-bg-success" : "text-bg-warning"])
                    }, r((A = d.status) != null ? A : "\u2014"), 3)
                  ]),
                  t("td", null, [
                    V(C, {
                      to: { name: "admin_transaction_detail", params: { id: d.id } },
                      class: "btn btn-sm btn-outline-secondary"
                    }, {
                      default: M(() => [
                        P(" View ")
                      ]),
                      _: 2
                    }, 1032, ["to"])
                  ])
                ]);
              }), 128))
            ])
          ])) : (l(), a("div", pt, "No renewal records yet."))
        ])) : m("", !0)
      ]);
    };
  }
});
export {
  Ct as default
};
