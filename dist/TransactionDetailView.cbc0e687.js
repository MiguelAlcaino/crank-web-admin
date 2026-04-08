import { d as f, G as p, E as g, z as y, r as k, H as C, b as s, e as t, g as l, j as d, t as n, D, F as R, h as w, o as a } from "./index.cc2eb486.js";
import { u as T } from "./useTransactionRecords.c496dee2.js";
import { u as x } from "./useToast.6a51987c.js";
const A = { class: "d-flex justify-content-between align-items-center mb-3" }, L = /* @__PURE__ */ t("h4", null, "Transaction Detail", -1), N = {
  key: 0,
  class: "text-center py-4"
}, E = /* @__PURE__ */ t("div", {
  class: "spinner-border",
  role: "status"
}, null, -1), q = [
  E
], z = {
  key: 1,
  class: "alert alert-danger"
}, B = { key: 2 }, S = { class: "table table-bordered" }, F = /* @__PURE__ */ t("th", { width: "200" }, "ID", -1), H = /* @__PURE__ */ t("th", null, "Customer", -1), I = /* @__PURE__ */ t("th", null, "Email", -1), V = /* @__PURE__ */ t("th", null, "Site", -1), $ = /* @__PURE__ */ t("th", null, "Status", -1), j = /* @__PURE__ */ t("th", null, "Amount", -1), M = /* @__PURE__ */ t("th", null, "Tax", -1), P = /* @__PURE__ */ t("th", null, "Sub Total", -1), U = /* @__PURE__ */ t("th", null, "Card Holder", -1), G = /* @__PURE__ */ t("th", null, "Last 4 Digits", -1), Q = /* @__PURE__ */ t("th", null, "Authorization Code", -1), J = /* @__PURE__ */ t("th", null, "Installments", -1), K = /* @__PURE__ */ t("th", null, "Created", -1), O = { key: 0 }, W = /* @__PURE__ */ t("th", null, "Refund Date", -1), X = /* @__PURE__ */ t("h5", null, "Items", -1), Y = { class: "table table-sm table-striped" }, Z = /* @__PURE__ */ t("thead", null, [
  /* @__PURE__ */ t("tr", null, [
    /* @__PURE__ */ t("th", null, "Name"),
    /* @__PURE__ */ t("th", null, "Quantity"),
    /* @__PURE__ */ t("th", null, "Price")
  ])
], -1), tt = {
  key: 0,
  class: "mt-3"
}, et = { key: 0 }, lt = {
  key: 1,
  class: "alert alert-warning"
}, nt = /* @__PURE__ */ t("p", null, "Are you sure you want to refund this transaction?", -1), st = ["disabled"], at = { key: 0 }, ot = { key: 1 }, _t = /* @__PURE__ */ f({
  __name: "TransactionDetailView",
  setup(ut) {
    const h = p("https://payments.crank-fit.com/api/graphql/"), e = T(h), m = x(), c = g(), v = y(), i = k(!1);
    C(() => {
      e.fetchDetail(c.params.id);
    });
    async function b() {
      await e.refund(c.params.id) && (m.success("The payment has been refunded"), i.value = !1, await e.fetchDetail(c.params.id));
    }
    function _(r) {
      return r ? new Date(r).toLocaleString() : "-";
    }
    return (r, u) => (a(), s("div", null, [
      t("div", A, [
        L,
        t("button", {
          class: "btn btn-outline-secondary btn-sm",
          onClick: u[0] || (u[0] = (o) => l(v).push({ name: "admin_transactions" }))
        }, " Back to list ")
      ]),
      l(e).isLoading.value ? (a(), s("div", N, q)) : d("", !0),
      l(e).hasError.value ? (a(), s("div", z, n(l(e).errorMessage.value), 1)) : d("", !0),
      l(e).detail.value && !l(e).isLoading.value ? (a(), s("div", B, [
        t("table", S, [
          t("tbody", null, [
            t("tr", null, [
              F,
              t("td", null, n(l(e).detail.value.id), 1)
            ]),
            t("tr", null, [
              H,
              t("td", null, n(l(e).detail.value.customerName || "-"), 1)
            ]),
            t("tr", null, [
              I,
              t("td", null, n(l(e).detail.value.customerEmail || "-"), 1)
            ]),
            t("tr", null, [
              V,
              t("td", null, n(l(e).detail.value.siteName || "-"), 1)
            ]),
            t("tr", null, [
              $,
              t("td", null, [
                t("span", {
                  class: D(["badge", l(e).detail.value.status === "refunded" ? "badge-warning" : "badge-success"])
                }, n(l(e).detail.value.status), 3)
              ])
            ]),
            t("tr", null, [
              j,
              t("td", null, n(l(e).detail.value.amount), 1)
            ]),
            t("tr", null, [
              M,
              t("td", null, n(l(e).detail.value.taxAmount), 1)
            ]),
            t("tr", null, [
              P,
              t("td", null, n(l(e).detail.value.subTotal), 1)
            ]),
            t("tr", null, [
              U,
              t("td", null, n(l(e).detail.value.creditCardHolderName || "-"), 1)
            ]),
            t("tr", null, [
              G,
              t("td", null, n(l(e).detail.value.creditCardLastFourDigits || "-"), 1)
            ]),
            t("tr", null, [
              Q,
              t("td", null, n(l(e).detail.value.authorizationCode || "-"), 1)
            ]),
            t("tr", null, [
              J,
              t("td", null, n(l(e).detail.value.installments), 1)
            ]),
            t("tr", null, [
              K,
              t("td", null, n(_(l(e).detail.value.created)), 1)
            ]),
            l(e).detail.value.refundDate ? (a(), s("tr", O, [
              W,
              t("td", null, n(_(l(e).detail.value.refundDate)), 1)
            ])) : d("", !0)
          ])
        ]),
        X,
        t("table", Y, [
          Z,
          t("tbody", null, [
            (a(!0), s(R, null, w(l(e).detail.value.items, (o) => (a(), s("tr", {
              key: o.id
            }, [
              t("td", null, n(o.name), 1),
              t("td", null, n(o.quantity), 1),
              t("td", null, n(o.amount), 1)
            ]))), 128))
          ])
        ]),
        l(e).detail.value.isRefundable ? (a(), s("div", tt, [
          i.value ? (a(), s("div", lt, [
            nt,
            t("button", {
              class: "btn btn-danger btn-sm mr-2",
              onClick: b,
              disabled: l(e).isRefunding.value
            }, [
              l(e).isRefunding.value ? (a(), s("span", at, "Processing...")) : (a(), s("span", ot, "Confirm Refund"))
            ], 8, st),
            t("button", {
              class: "btn btn-secondary btn-sm",
              onClick: u[2] || (u[2] = (o) => i.value = !1)
            }, "Cancel")
          ])) : (a(), s("div", et, [
            t("button", {
              class: "btn btn-danger btn-sm",
              onClick: u[1] || (u[1] = (o) => i.value = !0)
            }, "Refund")
          ]))
        ])) : d("", !0)
      ])) : d("", !0)
    ]));
  }
});
export {
  _t as default
};
