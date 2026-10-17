import { d as M, I as N, G as z, H as B, z as E, r as F, P as I, Q as L, K as q, M as S, b as a, e as t, g as e, j as i, t as n, T as U, N as V, A as G, F as _, h as R, o as s, B as H } from "./index.dde1f821.js";
import { u as $ } from "./useTransactionRecords.a8c9f1d6.js";
const j = { class: "d-flex justify-content-between align-items-center mb-3" }, Q = /* @__PURE__ */ t("h4", null, "Transaction Detail", -1), K = {
  key: 0,
  class: "text-center py-4"
}, J = /* @__PURE__ */ t("div", {
  class: "spinner-border",
  role: "status"
}, null, -1), O = [
  J
], W = {
  key: 1,
  class: "alert alert-danger"
}, X = { key: 2 }, Y = {
  key: 0,
  class: "alert alert-danger"
}, Z = { class: "table table-bordered" }, tt = /* @__PURE__ */ t("th", { width: "200" }, "ID", -1), et = /* @__PURE__ */ t("th", null, "Customer", -1), lt = { key: 1 }, nt = /* @__PURE__ */ t("th", null, "Email", -1), st = /* @__PURE__ */ t("th", null, "Site", -1), at = /* @__PURE__ */ t("th", null, "Status", -1), ot = /* @__PURE__ */ t("th", null, "Amount", -1), it = /* @__PURE__ */ t("th", null, "Tax", -1), ut = /* @__PURE__ */ t("th", null, "Sub Total", -1), dt = /* @__PURE__ */ t("th", null, "Card Holder", -1), rt = /* @__PURE__ */ t("th", null, "Last 4 Digits", -1), ct = /* @__PURE__ */ t("th", null, "Authorization Code", -1), _t = /* @__PURE__ */ t("th", null, "Payment Method", -1), ht = /* @__PURE__ */ t("th", null, "Payfort Authorization Code", -1), mt = /* @__PURE__ */ t("th", null, "Country", -1), pt = /* @__PURE__ */ t("th", null, "Mindbody Payment Record ID", -1), vt = /* @__PURE__ */ t("th", null, "Service Expiration", -1), yt = /* @__PURE__ */ t("th", null, "Installments", -1), bt = /* @__PURE__ */ t("th", null, "Created", -1), ft = { key: 1 }, gt = /* @__PURE__ */ t("th", null, "Refund Date", -1), kt = /* @__PURE__ */ t("h5", null, "Items", -1), Ct = { class: "table table-sm table-striped" }, wt = /* @__PURE__ */ t("thead", null, [
  /* @__PURE__ */ t("tr", null, [
    /* @__PURE__ */ t("th", null, "Name"),
    /* @__PURE__ */ t("th", null, "Quantity"),
    /* @__PURE__ */ t("th", null, "Price")
  ])
], -1), Rt = {
  key: 0,
  class: "mb-2"
}, Dt = /* @__PURE__ */ t("summary", null, "Mindbody response", -1), xt = { class: "bg-light p-2 small text-wrap" }, Tt = {
  key: 1,
  class: "mb-2"
}, At = /* @__PURE__ */ t("summary", null, "Payfort response", -1), Pt = { class: "bg-light p-2 small text-wrap" }, Mt = {
  key: 2,
  class: "mb-2"
}, Nt = /* @__PURE__ */ t("summary", null, "Payfort refund response", -1), zt = { class: "bg-light p-2 small text-wrap" }, Bt = {
  key: 2,
  class: "mt-3"
}, Et = { key: 0 }, Ft = {
  key: 1,
  class: "alert alert-warning"
}, It = /* @__PURE__ */ t("p", null, "Are you sure you want to refund this transaction?", -1), Lt = ["disabled"], qt = { key: 0 }, St = { key: 1 }, $t = /* @__PURE__ */ M({
  __name: "TransactionDetailView",
  setup(Ut) {
    const D = N("https://payments.crank-fit.com/api/graphql/"), l = $(D), x = z(), h = B(), T = E(), r = F(!1), m = I(L.TransactionPaymentDetails);
    q(() => {
      l.fetchDetail(h.params.id);
    });
    async function A() {
      await l.refund(h.params.id) && (x.success("The payment has been refunded"), r.value = !1, await l.fetchDetail(h.params.id));
    }
    function p(c) {
      return c ? new Date(c).toLocaleString() : "-";
    }
    return (c, u) => {
      var v, y, b, f, g, k;
      const P = S("router-link");
      return s(), a("div", null, [
        t("div", j, [
          Q,
          t("button", {
            class: "btn btn-outline-secondary btn-sm",
            onClick: u[0] || (u[0] = (o) => e(T).push({ name: "admin_transactions" }))
          }, " Back to list ")
        ]),
        e(l).isLoading.value ? (s(), a("div", K, O)) : i("", !0),
        e(l).hasError.value ? (s(), a("div", W, n(e(l).errorMessage.value), 1)) : i("", !0),
        e(l).detail.value && !e(l).isLoading.value ? (s(), a("div", X, [
          e(m) && e(l).detail.value.mindbodyCheckoutFail ? (s(), a("div", Y, " This transaction was paid but was not registered in Mindbody. Check the Mindbody response below for details. ")) : i("", !0),
          t("table", Z, [
            t("tbody", null, [
              t("tr", null, [
                tt,
                t("td", null, n(e(l).detail.value.id), 1)
              ]),
              t("tr", null, [
                et,
                t("td", null, [
                  (y = (v = e(l).detail.value.siteCustomer) == null ? void 0 : v.identifiableUser) != null && y.id ? (s(), U(P, {
                    key: 0,
                    to: { name: "admin_customer_profile", params: { id: e(l).detail.value.siteCustomer.identifiableUser.id } }
                  }, {
                    default: V(() => [
                      H(n(e(l).detail.value.customerName || "-"), 1)
                    ]),
                    _: 1
                  }, 8, ["to"])) : (s(), a("span", lt, n(e(l).detail.value.customerName || "-"), 1))
                ])
              ]),
              t("tr", null, [
                nt,
                t("td", null, n(e(l).detail.value.customerEmail || "-"), 1)
              ]),
              t("tr", null, [
                st,
                t("td", null, n(e(l).detail.value.siteName || "-"), 1)
              ]),
              t("tr", null, [
                at,
                t("td", null, [
                  t("span", {
                    class: G(["badge", e(l).detail.value.status === "refunded" ? "text-bg-warning" : "text-bg-success"])
                  }, n(e(l).detail.value.status), 3)
                ])
              ]),
              t("tr", null, [
                ot,
                t("td", null, n((b = e(l).detail.value.shoppingCart) == null ? void 0 : b.currency) + " " + n(e(l).detail.value.amount), 1)
              ]),
              t("tr", null, [
                it,
                t("td", null, n(e(l).detail.value.taxAmount), 1)
              ]),
              t("tr", null, [
                ut,
                t("td", null, n((f = e(l).detail.value.shoppingCart) == null ? void 0 : f.currency) + " " + n(e(l).detail.value.subTotal), 1)
              ]),
              t("tr", null, [
                dt,
                t("td", null, n(e(l).detail.value.creditCardHolderName || "-"), 1)
              ]),
              t("tr", null, [
                rt,
                t("td", null, n(e(l).detail.value.creditCardLastFourDigits || "-"), 1)
              ]),
              t("tr", null, [
                ct,
                t("td", null, n(e(l).detail.value.authorizationCode || "-"), 1)
              ]),
              e(m) ? (s(), a(_, { key: 0 }, [
                t("tr", null, [
                  _t,
                  t("td", null, n(e(l).detail.value.paymentMethod || "-"), 1)
                ]),
                t("tr", null, [
                  ht,
                  t("td", null, n(e(l).detail.value.payfortAuthorizationCode || "-"), 1)
                ]),
                t("tr", null, [
                  mt,
                  t("td", null, n(e(l).detail.value.userCountry || "-"), 1)
                ]),
                t("tr", null, [
                  pt,
                  t("td", null, n((g = e(l).detail.value.merchantPurchaseId) != null ? g : "-"), 1)
                ]),
                t("tr", null, [
                  vt,
                  t("td", null, n(p((k = e(l).detail.value.serviceExpirationDate) != null ? k : null)), 1)
                ])
              ], 64)) : i("", !0),
              t("tr", null, [
                yt,
                t("td", null, n(e(l).detail.value.installments), 1)
              ]),
              t("tr", null, [
                bt,
                t("td", null, n(p(e(l).detail.value.created)), 1)
              ]),
              e(l).detail.value.refundDate ? (s(), a("tr", ft, [
                gt,
                t("td", null, n(p(e(l).detail.value.refundDate)), 1)
              ])) : i("", !0)
            ])
          ]),
          kt,
          t("table", Ct, [
            wt,
            t("tbody", null, [
              e(l).detail.value.shoppingCart ? (s(!0), a(_, { key: 0 }, R(e(l).detail.value.shoppingCart.items, (o) => {
                var d, C, w;
                return s(), a("tr", {
                  key: o.id
                }, [
                  t("td", null, n((d = o.variant.name) != null ? d : "-"), 1),
                  t("td", null, n(o.quantity), 1),
                  t("td", null, n((C = e(l).detail.value.shoppingCart) == null ? void 0 : C.currency) + " " + n((w = o.subtotal) != null ? w : o.variant.price), 1)
                ]);
              }), 128)) : (s(!0), a(_, { key: 1 }, R(e(l).detail.value.items, (o) => {
                var d;
                return s(), a("tr", {
                  key: (d = o.id) != null ? d : ""
                }, [
                  t("td", null, n(o.name), 1),
                  t("td", null, n(o.quantity), 1),
                  t("td", null, n(o.amount), 1)
                ]);
              }), 128))
            ])
          ]),
          e(m) ? (s(), a(_, { key: 1 }, [
            e(l).detail.value.merchantResponse ? (s(), a("details", Rt, [
              Dt,
              t("pre", xt, n(e(l).detail.value.merchantResponse), 1)
            ])) : i("", !0),
            e(l).detail.value.paymentGatewayResponse ? (s(), a("details", Tt, [
              At,
              t("pre", Pt, n(e(l).detail.value.paymentGatewayResponse), 1)
            ])) : i("", !0),
            e(l).detail.value.refundResponse ? (s(), a("details", Mt, [
              Nt,
              t("pre", zt, n(e(l).detail.value.refundResponse), 1)
            ])) : i("", !0)
          ], 64)) : i("", !0),
          e(l).detail.value.isRefundable ? (s(), a("div", Bt, [
            r.value ? (s(), a("div", Ft, [
              It,
              t("button", {
                class: "btn btn-danger btn-sm me-2",
                onClick: A,
                disabled: e(l).isRefunding.value
              }, [
                e(l).isRefunding.value ? (s(), a("span", qt, "Processing...")) : (s(), a("span", St, "Confirm Refund"))
              ], 8, Lt),
              t("button", {
                class: "btn btn-secondary btn-sm",
                onClick: u[2] || (u[2] = (o) => r.value = !1)
              }, "Cancel")
            ])) : (s(), a("div", Et, [
              t("button", {
                class: "btn btn-danger btn-sm",
                onClick: u[1] || (u[1] = (o) => r.value = !0)
              }, "Refund")
            ]))
          ])) : i("", !0)
        ])) : i("", !0)
      ]);
    };
  }
});
export {
  $t as default
};
