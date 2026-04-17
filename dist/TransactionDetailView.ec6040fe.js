import { d as R, H as w, G as x, z as T, r as A, I as L, b as s, e as t, g as l, j as d, t as n, A as N, F as f, h as y, o as a } from "./index.5deaf125.js";
import { u as q } from "./useTransactionRecords.6532f739.js";
import { u as z } from "./useToast.1e068e0e.js";
const B = { class: "d-flex justify-content-between align-items-center mb-3" }, E = /* @__PURE__ */ t("h4", null, "Transaction Detail", -1), I = {
  key: 0,
  class: "text-center py-4"
}, S = /* @__PURE__ */ t("div", {
  class: "spinner-border",
  role: "status"
}, null, -1), F = [
  S
], H = {
  key: 1,
  class: "alert alert-danger"
}, V = { key: 2 }, $ = { class: "table table-bordered" }, j = /* @__PURE__ */ t("th", { width: "200" }, "ID", -1), M = /* @__PURE__ */ t("th", null, "Customer", -1), P = /* @__PURE__ */ t("th", null, "Email", -1), U = /* @__PURE__ */ t("th", null, "Site", -1), G = /* @__PURE__ */ t("th", null, "Status", -1), Q = /* @__PURE__ */ t("th", null, "Amount", -1), J = /* @__PURE__ */ t("th", null, "Tax", -1), K = /* @__PURE__ */ t("th", null, "Sub Total", -1), O = /* @__PURE__ */ t("th", null, "Card Holder", -1), W = /* @__PURE__ */ t("th", null, "Last 4 Digits", -1), X = /* @__PURE__ */ t("th", null, "Authorization Code", -1), Y = /* @__PURE__ */ t("th", null, "Installments", -1), Z = /* @__PURE__ */ t("th", null, "Created", -1), tt = { key: 0 }, et = /* @__PURE__ */ t("th", null, "Refund Date", -1), lt = /* @__PURE__ */ t("h5", null, "Items", -1), nt = { class: "table table-sm table-striped" }, st = /* @__PURE__ */ t("thead", null, [
  /* @__PURE__ */ t("tr", null, [
    /* @__PURE__ */ t("th", null, "Name"),
    /* @__PURE__ */ t("th", null, "Quantity"),
    /* @__PURE__ */ t("th", null, "Price")
  ])
], -1), at = {
  key: 0,
  class: "mt-3"
}, ut = { key: 0 }, ot = {
  key: 1,
  class: "alert alert-warning"
}, it = /* @__PURE__ */ t("p", null, "Are you sure you want to refund this transaction?", -1), dt = ["disabled"], rt = { key: 0 }, ct = { key: 1 }, pt = /* @__PURE__ */ R({
  __name: "TransactionDetailView",
  setup(_t) {
    const g = w("https://payments.crank-fit.com/api/graphql/"), e = q(g), C = z(), _ = x(), k = T(), r = A(!1);
    L(() => {
      e.fetchDetail(_.params.id);
    });
    async function D() {
      await e.refund(_.params.id) && (C.success("The payment has been refunded"), r.value = !1, await e.fetchDetail(_.params.id));
    }
    function h(c) {
      return c ? new Date(c).toLocaleString() : "-";
    }
    return (c, o) => {
      var v, m;
      return a(), s("div", null, [
        t("div", B, [
          E,
          t("button", {
            class: "btn btn-outline-secondary btn-sm",
            onClick: o[0] || (o[0] = (u) => l(k).push({ name: "admin_transactions" }))
          }, " Back to list ")
        ]),
        l(e).isLoading.value ? (a(), s("div", I, F)) : d("", !0),
        l(e).hasError.value ? (a(), s("div", H, n(l(e).errorMessage.value), 1)) : d("", !0),
        l(e).detail.value && !l(e).isLoading.value ? (a(), s("div", V, [
          t("table", $, [
            t("tbody", null, [
              t("tr", null, [
                j,
                t("td", null, n(l(e).detail.value.id), 1)
              ]),
              t("tr", null, [
                M,
                t("td", null, n(l(e).detail.value.customerName || "-"), 1)
              ]),
              t("tr", null, [
                P,
                t("td", null, n(l(e).detail.value.customerEmail || "-"), 1)
              ]),
              t("tr", null, [
                U,
                t("td", null, n(l(e).detail.value.siteName || "-"), 1)
              ]),
              t("tr", null, [
                G,
                t("td", null, [
                  t("span", {
                    class: N(["badge", l(e).detail.value.status === "refunded" ? "text-bg-warning" : "text-bg-success"])
                  }, n(l(e).detail.value.status), 3)
                ])
              ]),
              t("tr", null, [
                Q,
                t("td", null, n((v = l(e).detail.value.shoppingCart) == null ? void 0 : v.currency) + " " + n(l(e).detail.value.amount), 1)
              ]),
              t("tr", null, [
                J,
                t("td", null, n(l(e).detail.value.taxAmount), 1)
              ]),
              t("tr", null, [
                K,
                t("td", null, n((m = l(e).detail.value.shoppingCart) == null ? void 0 : m.currency) + " " + n(l(e).detail.value.subTotal), 1)
              ]),
              t("tr", null, [
                O,
                t("td", null, n(l(e).detail.value.creditCardHolderName || "-"), 1)
              ]),
              t("tr", null, [
                W,
                t("td", null, n(l(e).detail.value.creditCardLastFourDigits || "-"), 1)
              ]),
              t("tr", null, [
                X,
                t("td", null, n(l(e).detail.value.authorizationCode || "-"), 1)
              ]),
              t("tr", null, [
                Y,
                t("td", null, n(l(e).detail.value.installments), 1)
              ]),
              t("tr", null, [
                Z,
                t("td", null, n(h(l(e).detail.value.created)), 1)
              ]),
              l(e).detail.value.refundDate ? (a(), s("tr", tt, [
                et,
                t("td", null, n(h(l(e).detail.value.refundDate)), 1)
              ])) : d("", !0)
            ])
          ]),
          lt,
          t("table", nt, [
            st,
            t("tbody", null, [
              l(e).detail.value.shoppingCart ? (a(!0), s(f, { key: 0 }, y(l(e).detail.value.shoppingCart.items, (u) => {
                var i, b, p;
                return a(), s("tr", {
                  key: u.id
                }, [
                  t("td", null, n((i = u.variant.name) != null ? i : "-"), 1),
                  t("td", null, n(u.quantity), 1),
                  t("td", null, n((b = l(e).detail.value.shoppingCart) == null ? void 0 : b.currency) + " " + n((p = u.subtotal) != null ? p : u.variant.price), 1)
                ]);
              }), 128)) : (a(!0), s(f, { key: 1 }, y(l(e).detail.value.items, (u) => {
                var i;
                return a(), s("tr", {
                  key: (i = u.id) != null ? i : ""
                }, [
                  t("td", null, n(u.name), 1),
                  t("td", null, n(u.quantity), 1),
                  t("td", null, n(u.amount), 1)
                ]);
              }), 128))
            ])
          ]),
          l(e).detail.value.isRefundable ? (a(), s("div", at, [
            r.value ? (a(), s("div", ot, [
              it,
              t("button", {
                class: "btn btn-danger btn-sm me-2",
                onClick: D,
                disabled: l(e).isRefunding.value
              }, [
                l(e).isRefunding.value ? (a(), s("span", rt, "Processing...")) : (a(), s("span", ct, "Confirm Refund"))
              ], 8, dt),
              t("button", {
                class: "btn btn-secondary btn-sm",
                onClick: o[2] || (o[2] = (u) => r.value = !1)
              }, "Cancel")
            ])) : (a(), s("div", ut, [
              t("button", {
                class: "btn btn-danger btn-sm",
                onClick: o[1] || (o[1] = (u) => r.value = !0)
              }, "Refund")
            ]))
          ])) : d("", !0)
        ])) : d("", !0)
      ]);
    };
  }
});
export {
  pt as default
};
