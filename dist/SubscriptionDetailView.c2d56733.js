import { O as x, r as m, P as f, d as L, H as B, G as I, z as F, I as T, c as E, K as U, b as n, e as t, g as s, j as b, t as i, A as N, F as $, h as q, o as a, k as V, L as M, B as P } from "./index.fd3e1b74.js";
const R = x`
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
`, O = x`
  query CustomerSubscription($id: ID!) {
    customerSubscription(id: $id) {
      id
      status
      amountCents
      billingInterval
      creditCardLastFourDigits
      createdAt
      cancelledAt
      nextBillingAt
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
  const y = m(null), p = m(!1), e = m(!1), c = m(!1), g = m("");
  async function h(v) {
    p.value = !0, c.value = !1, y.value = null;
    try {
      const { data: r } = await k.query({
        query: O,
        variables: { id: v },
        fetchPolicy: "network-only"
      });
      y.value = r.customerSubscription;
    } catch {
      c.value = !0, g.value = "Failed to load subscription";
    } finally {
      p.value = !1;
    }
  }
  async function w(v) {
    var r;
    e.value = !0, c.value = !1;
    try {
      const { data: u } = await k.mutate({
        mutation: R,
        variables: { subscriptionId: v }
      }), _ = u == null ? void 0 : u.cancelSubscription;
      return _ != null && _.success ? { success: !0 } : { success: !1, errorCode: (r = _ == null ? void 0 : _.code) != null ? r : "UNKNOWN" };
    } catch {
      return c.value = !0, g.value = "Failed to cancel subscription", { success: !1 };
    } finally {
      e.value = !1;
    }
  }
  return {
    detail: f(y),
    isLoading: f(p),
    isCancelling: f(e),
    hasError: f(c),
    errorMessage: f(g),
    fetchDetail: h,
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
}, Y = { key: 2 }, J = { class: "table table-bordered" }, X = /* @__PURE__ */ t("th", { width: "200" }, "Customer", -1), Z = { key: 0 }, tt = { class: "text-muted" }, et = { key: 1 }, st = /* @__PURE__ */ t("th", null, "Plan", -1), nt = /* @__PURE__ */ t("th", null, "Status", -1), at = /* @__PURE__ */ t("th", null, "Card", -1), lt = /* @__PURE__ */ t("th", null, "Started", -1), ot = { key: 0 }, it = /* @__PURE__ */ t("th", null, "Cancelled", -1), rt = { key: 1 }, ut = /* @__PURE__ */ t("th", null, "Next Billing", -1), ct = {
  key: 0,
  class: "mt-3"
}, dt = { key: 0 }, _t = {
  key: 1,
  class: "alert alert-warning"
}, vt = /* @__PURE__ */ t("p", null, "Are you sure you want to cancel this subscription?", -1), bt = {
  key: 0,
  class: "text-danger mb-2"
}, mt = ["disabled"], ht = { key: 0 }, pt = { key: 1 }, gt = /* @__PURE__ */ t("h5", { class: "mt-4" }, "Renewal History", -1), ft = {
  key: 1,
  class: "text-muted"
}, yt = {
  key: 2,
  class: "table table-sm table-striped"
}, Ct = /* @__PURE__ */ t("thead", null, [
  /* @__PURE__ */ t("tr", null, [
    /* @__PURE__ */ t("th", null, "Date"),
    /* @__PURE__ */ t("th", null, "Amount"),
    /* @__PURE__ */ t("th", null, "Status"),
    /* @__PURE__ */ t("th")
  ])
], -1), wt = /* @__PURE__ */ L({
  __name: "SubscriptionDetailView",
  setup(k) {
    const p = B("https://payments.crank-fit.com/api/graphql/"), e = j(p), c = I(), g = F();
    T(() => {
      e.fetchDetail(c.params.id);
    });
    function h(l) {
      return l ? new Date(l).toLocaleString() : "\u2014";
    }
    function w(l) {
      return (l / 100).toFixed(2);
    }
    const v = E(() => {
      var o;
      const l = (o = e.detail.value) == null ? void 0 : o.transactions;
      return l != null && l.length ? { name: l[0].customerName, email: l[0].customerEmail } : null;
    }), r = m(!1), u = m(null);
    async function _() {
      var o;
      u.value = null;
      const l = await e.cancel(c.params.id);
      l.success ? (r.value = !1, await e.fetchDetail(c.params.id)) : u.value = (o = l.errorCode) != null ? o : "Unknown error";
    }
    const S = E(() => {
      var l;
      return (l = e.detail.value) != null && l.transactions ? [...e.detail.value.transactions].sort((o, C) => !o.created || !C.created ? 0 : new Date(C.created).getTime() - new Date(o.created).getTime()) : [];
    });
    return (l, o) => {
      const C = U("router-link");
      return a(), n("div", null, [
        t("div", z, [
          H,
          t("button", {
            class: "btn btn-outline-secondary btn-sm",
            onClick: o[0] || (o[0] = (d) => s(g).back())
          }, "Back")
        ]),
        s(e).isLoading.value ? (a(), n("div", K, Q)) : b("", !0),
        s(e).hasError.value ? (a(), n("div", W, i(s(e).errorMessage.value), 1)) : b("", !0),
        s(e).detail.value && !s(e).isLoading.value ? (a(), n("div", Y, [
          t("table", J, [
            t("tbody", null, [
              t("tr", null, [
                X,
                t("td", null, [
                  v.value ? (a(), n("div", Z, [
                    t("div", null, i(v.value.name || "\u2014"), 1),
                    t("small", tt, i(v.value.email), 1)
                  ])) : (a(), n("span", et, "\u2014"))
                ])
              ]),
              t("tr", null, [
                st,
                t("td", null, i(s(e).detail.value.billingInterval) + " \u2014 " + i(w(s(e).detail.value.amountCents)), 1)
              ]),
              t("tr", null, [
                nt,
                t("td", null, [
                  t("span", {
                    class: N(["badge", s(e).detail.value.status === "active" ? "text-bg-success" : "text-bg-warning"])
                  }, i(s(e).detail.value.status), 3)
                ])
              ]),
              t("tr", null, [
                at,
                t("td", null, i(s(e).detail.value.creditCardLastFourDigits ? `****${s(e).detail.value.creditCardLastFourDigits}` : "\u2014"), 1)
              ]),
              t("tr", null, [
                lt,
                t("td", null, i(h(s(e).detail.value.createdAt)), 1)
              ]),
              s(e).detail.value.cancelledAt ? (a(), n("tr", ot, [
                it,
                t("td", null, i(h(s(e).detail.value.cancelledAt)), 1)
              ])) : b("", !0),
              s(e).detail.value.nextBillingAt ? (a(), n("tr", rt, [
                ut,
                t("td", null, i(h(s(e).detail.value.nextBillingAt)), 1)
              ])) : b("", !0)
            ])
          ]),
          s(e).detail.value.status === "active" ? (a(), n("div", ct, [
            r.value ? (a(), n("div", _t, [
              vt,
              u.value ? (a(), n("div", bt, "Error: " + i(u.value), 1)) : b("", !0),
              t("button", {
                class: "btn btn-danger btn-sm me-2",
                onClick: _,
                disabled: s(e).isCancelling.value
              }, [
                s(e).isCancelling.value ? (a(), n("span", ht, "Processing...")) : (a(), n("span", pt, "Confirm Cancel"))
              ], 8, mt),
              t("button", {
                class: "btn btn-secondary btn-sm",
                onClick: o[2] || (o[2] = (d) => {
                  r.value = !1, u.value = null;
                })
              }, " Back ")
            ])) : (a(), n("div", dt, [
              t("button", {
                class: "btn btn-danger btn-sm",
                onClick: o[1] || (o[1] = (d) => r.value = !0)
              }, "Cancel Subscription")
            ]))
          ])) : b("", !0),
          gt,
          S.value.length ? (a(), n("table", yt, [
            Ct,
            t("tbody", null, [
              (a(!0), n($, null, q(S.value, (d) => {
                var A, D;
                return a(), n("tr", {
                  key: d.id
                }, [
                  t("td", null, i(h(d.created)), 1),
                  t("td", null, i((A = d.amount) != null ? A : "\u2014"), 1),
                  t("td", null, [
                    t("span", {
                      class: N(["badge", d.status === "Success" ? "text-bg-success" : "text-bg-warning"])
                    }, i((D = d.status) != null ? D : "\u2014"), 3)
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
          ])) : (a(), n("div", ft, "No renewal records yet."))
        ])) : b("", !0)
      ]);
    };
  }
});
export {
  wt as default
};
