import { d as p, H as g, G as y, z as k, r as C, I as D, b as s, e as t, g as l, j as i, t as n, A as R, F as w, h as x, o as a } from "./index.9bbc4506.js";
import { u as T } from "./useTransactionRecords.c8ae70e5.js";
import { u as A } from "./useToast.b5d2720f.js";
const L = { class: "d-flex justify-content-between align-items-center mb-3" }, N = /* @__PURE__ */ t("h4", null, "Transaction Detail", -1), q = {
  key: 0,
  class: "text-center py-4"
}, z = /* @__PURE__ */ t("div", {
  class: "spinner-border",
  role: "status"
}, null, -1), B = [
  z
], E = {
  key: 1,
  class: "alert alert-danger"
}, I = { key: 2 }, S = { class: "table table-bordered" }, F = /* @__PURE__ */ t("th", { width: "200" }, "ID", -1), H = /* @__PURE__ */ t("th", null, "Customer", -1), V = /* @__PURE__ */ t("th", null, "Email", -1), $ = /* @__PURE__ */ t("th", null, "Site", -1), j = /* @__PURE__ */ t("th", null, "Status", -1), M = /* @__PURE__ */ t("th", null, "Amount", -1), P = /* @__PURE__ */ t("th", null, "Tax", -1), U = /* @__PURE__ */ t("th", null, "Sub Total", -1), G = /* @__PURE__ */ t("th", null, "Card Holder", -1), Q = /* @__PURE__ */ t("th", null, "Last 4 Digits", -1), J = /* @__PURE__ */ t("th", null, "Authorization Code", -1), K = /* @__PURE__ */ t("th", null, "Installments", -1), O = /* @__PURE__ */ t("th", null, "Created", -1), W = { key: 0 }, X = /* @__PURE__ */ t("th", null, "Refund Date", -1), Y = /* @__PURE__ */ t("h5", null, "Items", -1), Z = { class: "table table-sm table-striped" }, tt = /* @__PURE__ */ t("thead", null, [
  /* @__PURE__ */ t("tr", null, [
    /* @__PURE__ */ t("th", null, "Name"),
    /* @__PURE__ */ t("th", null, "Quantity"),
    /* @__PURE__ */ t("th", null, "Price")
  ])
], -1), et = {
  key: 0,
  class: "mt-3"
}, lt = { key: 0 }, nt = {
  key: 1,
  class: "alert alert-warning"
}, st = /* @__PURE__ */ t("p", null, "Are you sure you want to refund this transaction?", -1), at = ["disabled"], ot = { key: 0 }, ut = { key: 1 }, ht = /* @__PURE__ */ p({
  __name: "TransactionDetailView",
  setup(it) {
    const m = g("https://payments.crank-fit.com/api/graphql/"), e = T(m), v = A(), c = y(), b = k(), d = C(!1);
    D(() => {
      e.fetchDetail(c.params.id);
    });
    async function f() {
      await e.refund(c.params.id) && (v.success("The payment has been refunded"), d.value = !1, await e.fetchDetail(c.params.id));
    }
    function _(r) {
      return r ? new Date(r).toLocaleString() : "-";
    }
    return (r, u) => (a(), s("div", null, [
      t("div", L, [
        N,
        t("button", {
          class: "btn btn-outline-secondary btn-sm",
          onClick: u[0] || (u[0] = (o) => l(b).push({ name: "admin_transactions" }))
        }, " Back to list ")
      ]),
      l(e).isLoading.value ? (a(), s("div", q, B)) : i("", !0),
      l(e).hasError.value ? (a(), s("div", E, n(l(e).errorMessage.value), 1)) : i("", !0),
      l(e).detail.value && !l(e).isLoading.value ? (a(), s("div", I, [
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
              V,
              t("td", null, n(l(e).detail.value.customerEmail || "-"), 1)
            ]),
            t("tr", null, [
              $,
              t("td", null, n(l(e).detail.value.siteName || "-"), 1)
            ]),
            t("tr", null, [
              j,
              t("td", null, [
                t("span", {
                  class: R(["badge", l(e).detail.value.status === "refunded" ? "text-bg-warning" : "text-bg-success"])
                }, n(l(e).detail.value.status), 3)
              ])
            ]),
            t("tr", null, [
              M,
              t("td", null, n(l(e).detail.value.amount), 1)
            ]),
            t("tr", null, [
              P,
              t("td", null, n(l(e).detail.value.taxAmount), 1)
            ]),
            t("tr", null, [
              U,
              t("td", null, n(l(e).detail.value.subTotal), 1)
            ]),
            t("tr", null, [
              G,
              t("td", null, n(l(e).detail.value.creditCardHolderName || "-"), 1)
            ]),
            t("tr", null, [
              Q,
              t("td", null, n(l(e).detail.value.creditCardLastFourDigits || "-"), 1)
            ]),
            t("tr", null, [
              J,
              t("td", null, n(l(e).detail.value.authorizationCode || "-"), 1)
            ]),
            t("tr", null, [
              K,
              t("td", null, n(l(e).detail.value.installments), 1)
            ]),
            t("tr", null, [
              O,
              t("td", null, n(_(l(e).detail.value.created)), 1)
            ]),
            l(e).detail.value.refundDate ? (a(), s("tr", W, [
              X,
              t("td", null, n(_(l(e).detail.value.refundDate)), 1)
            ])) : i("", !0)
          ])
        ]),
        Y,
        t("table", Z, [
          tt,
          t("tbody", null, [
            (a(!0), s(w, null, x(l(e).detail.value.items, (o) => {
              var h;
              return a(), s("tr", {
                key: (h = o.id) != null ? h : ""
              }, [
                t("td", null, n(o.name), 1),
                t("td", null, n(o.quantity), 1),
                t("td", null, n(o.amount), 1)
              ]);
            }), 128))
          ])
        ]),
        l(e).detail.value.isRefundable ? (a(), s("div", et, [
          d.value ? (a(), s("div", nt, [
            st,
            t("button", {
              class: "btn btn-danger btn-sm me-2",
              onClick: f,
              disabled: l(e).isRefunding.value
            }, [
              l(e).isRefunding.value ? (a(), s("span", ot, "Processing...")) : (a(), s("span", ut, "Confirm Refund"))
            ], 8, at),
            t("button", {
              class: "btn btn-secondary btn-sm",
              onClick: u[2] || (u[2] = (o) => d.value = !1)
            }, "Cancel")
          ])) : (a(), s("div", lt, [
            t("button", {
              class: "btn btn-danger btn-sm",
              onClick: u[1] || (u[1] = (o) => d.value = !0)
            }, "Refund")
          ]))
        ])) : i("", !0)
      ])) : i("", !0)
    ]));
  }
});
export {
  ht as default
};
