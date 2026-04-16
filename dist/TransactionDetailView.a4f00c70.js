import { d as k, H as C, G as D, z as R, r as w, I as x, b as s, e as t, g as l, j as d, t as n, A as T, F as v, h as b, o as a } from "./index.91bc4b84.js";
import { u as A } from "./useTransactionRecords.9646742b.js";
import { u as L } from "./useToast.81d9a09e.js";
const N = { class: "d-flex justify-content-between align-items-center mb-3" }, q = /* @__PURE__ */ t("h4", null, "Transaction Detail", -1), z = {
  key: 0,
  class: "text-center py-4"
}, B = /* @__PURE__ */ t("div", {
  class: "spinner-border",
  role: "status"
}, null, -1), E = [
  B
], I = {
  key: 1,
  class: "alert alert-danger"
}, S = { key: 2 }, F = { class: "table table-bordered" }, H = /* @__PURE__ */ t("th", { width: "200" }, "ID", -1), V = /* @__PURE__ */ t("th", null, "Customer", -1), $ = /* @__PURE__ */ t("th", null, "Email", -1), j = /* @__PURE__ */ t("th", null, "Site", -1), M = /* @__PURE__ */ t("th", null, "Status", -1), P = /* @__PURE__ */ t("th", null, "Amount", -1), U = /* @__PURE__ */ t("th", null, "Tax", -1), G = /* @__PURE__ */ t("th", null, "Sub Total", -1), Q = /* @__PURE__ */ t("th", null, "Card Holder", -1), J = /* @__PURE__ */ t("th", null, "Last 4 Digits", -1), K = /* @__PURE__ */ t("th", null, "Authorization Code", -1), O = /* @__PURE__ */ t("th", null, "Installments", -1), W = /* @__PURE__ */ t("th", null, "Created", -1), X = { key: 0 }, Y = /* @__PURE__ */ t("th", null, "Refund Date", -1), Z = /* @__PURE__ */ t("h5", null, "Items", -1), tt = { class: "table table-sm table-striped" }, et = /* @__PURE__ */ t("thead", null, [
  /* @__PURE__ */ t("tr", null, [
    /* @__PURE__ */ t("th", null, "Name"),
    /* @__PURE__ */ t("th", null, "Quantity"),
    /* @__PURE__ */ t("th", null, "Price")
  ])
], -1), lt = {
  key: 0,
  class: "mt-3"
}, nt = { key: 0 }, st = {
  key: 1,
  class: "alert alert-warning"
}, at = /* @__PURE__ */ t("p", null, "Are you sure you want to refund this transaction?", -1), ut = ["disabled"], ot = { key: 0 }, it = { key: 1 }, mt = /* @__PURE__ */ k({
  __name: "TransactionDetailView",
  setup(dt) {
    const f = C("https://payments.crank-fit.com/api/graphql/"), e = A(f), p = L(), _ = D(), y = R(), r = w(!1);
    x(() => {
      e.fetchDetail(_.params.id);
    });
    async function g() {
      await e.refund(_.params.id) && (p.success("The payment has been refunded"), r.value = !1, await e.fetchDetail(_.params.id));
    }
    function h(c) {
      return c ? new Date(c).toLocaleString() : "-";
    }
    return (c, o) => (a(), s("div", null, [
      t("div", N, [
        q,
        t("button", {
          class: "btn btn-outline-secondary btn-sm",
          onClick: o[0] || (o[0] = (u) => l(y).push({ name: "admin_transactions" }))
        }, " Back to list ")
      ]),
      l(e).isLoading.value ? (a(), s("div", z, E)) : d("", !0),
      l(e).hasError.value ? (a(), s("div", I, n(l(e).errorMessage.value), 1)) : d("", !0),
      l(e).detail.value && !l(e).isLoading.value ? (a(), s("div", S, [
        t("table", F, [
          t("tbody", null, [
            t("tr", null, [
              H,
              t("td", null, n(l(e).detail.value.id), 1)
            ]),
            t("tr", null, [
              V,
              t("td", null, n(l(e).detail.value.customerName || "-"), 1)
            ]),
            t("tr", null, [
              $,
              t("td", null, n(l(e).detail.value.customerEmail || "-"), 1)
            ]),
            t("tr", null, [
              j,
              t("td", null, n(l(e).detail.value.siteName || "-"), 1)
            ]),
            t("tr", null, [
              M,
              t("td", null, [
                t("span", {
                  class: T(["badge", l(e).detail.value.status === "refunded" ? "text-bg-warning" : "text-bg-success"])
                }, n(l(e).detail.value.status), 3)
              ])
            ]),
            t("tr", null, [
              P,
              t("td", null, n(l(e).detail.value.amount), 1)
            ]),
            t("tr", null, [
              U,
              t("td", null, n(l(e).detail.value.taxAmount), 1)
            ]),
            t("tr", null, [
              G,
              t("td", null, n(l(e).detail.value.subTotal), 1)
            ]),
            t("tr", null, [
              Q,
              t("td", null, n(l(e).detail.value.creditCardHolderName || "-"), 1)
            ]),
            t("tr", null, [
              J,
              t("td", null, n(l(e).detail.value.creditCardLastFourDigits || "-"), 1)
            ]),
            t("tr", null, [
              K,
              t("td", null, n(l(e).detail.value.authorizationCode || "-"), 1)
            ]),
            t("tr", null, [
              O,
              t("td", null, n(l(e).detail.value.installments), 1)
            ]),
            t("tr", null, [
              W,
              t("td", null, n(h(l(e).detail.value.created)), 1)
            ]),
            l(e).detail.value.refundDate ? (a(), s("tr", X, [
              Y,
              t("td", null, n(h(l(e).detail.value.refundDate)), 1)
            ])) : d("", !0)
          ])
        ]),
        Z,
        t("table", tt, [
          et,
          t("tbody", null, [
            l(e).detail.value.shoppingCart ? (a(!0), s(v, { key: 0 }, b(l(e).detail.value.shoppingCart.items, (u) => {
              var i, m;
              return a(), s("tr", {
                key: u.id
              }, [
                t("td", null, n((i = u.variant.name) != null ? i : "-"), 1),
                t("td", null, n(u.quantity), 1),
                t("td", null, n((m = u.subtotal) != null ? m : u.variant.price), 1)
              ]);
            }), 128)) : (a(!0), s(v, { key: 1 }, b(l(e).detail.value.items, (u) => {
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
        l(e).detail.value.isRefundable ? (a(), s("div", lt, [
          r.value ? (a(), s("div", st, [
            at,
            t("button", {
              class: "btn btn-danger btn-sm me-2",
              onClick: g,
              disabled: l(e).isRefunding.value
            }, [
              l(e).isRefunding.value ? (a(), s("span", ot, "Processing...")) : (a(), s("span", it, "Confirm Refund"))
            ], 8, ut),
            t("button", {
              class: "btn btn-secondary btn-sm",
              onClick: o[2] || (o[2] = (u) => r.value = !1)
            }, "Cancel")
          ])) : (a(), s("div", nt, [
            t("button", {
              class: "btn btn-danger btn-sm",
              onClick: o[1] || (o[1] = (u) => r.value = !0)
            }, "Refund")
          ]))
        ])) : d("", !0)
      ])) : d("", !0)
    ]));
  }
});
export {
  mt as default
};
