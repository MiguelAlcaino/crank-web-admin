import { d as N, H as T, G as A, z as L, r as B, I as q, K as z, b as s, e as t, g as l, j as d, t as n, N as E, L as I, A as S, F as g, h as C, o as a, B as U } from "./index.0af13fe1.js";
import { u as V } from "./useTransactionRecords.3459e0b5.js";
import { u as F } from "./useToast.cde83a42.js";
const H = { class: "d-flex justify-content-between align-items-center mb-3" }, $ = /* @__PURE__ */ t("h4", null, "Transaction Detail", -1), j = {
  key: 0,
  class: "text-center py-4"
}, M = /* @__PURE__ */ t("div", {
  class: "spinner-border",
  role: "status"
}, null, -1), P = [
  M
], G = {
  key: 1,
  class: "alert alert-danger"
}, K = { key: 2 }, Q = { class: "table table-bordered" }, J = /* @__PURE__ */ t("th", { width: "200" }, "ID", -1), O = /* @__PURE__ */ t("th", null, "Customer", -1), W = { key: 1 }, X = /* @__PURE__ */ t("th", null, "Email", -1), Y = /* @__PURE__ */ t("th", null, "Site", -1), Z = /* @__PURE__ */ t("th", null, "Status", -1), tt = /* @__PURE__ */ t("th", null, "Amount", -1), et = /* @__PURE__ */ t("th", null, "Tax", -1), lt = /* @__PURE__ */ t("th", null, "Sub Total", -1), nt = /* @__PURE__ */ t("th", null, "Card Holder", -1), at = /* @__PURE__ */ t("th", null, "Last 4 Digits", -1), st = /* @__PURE__ */ t("th", null, "Authorization Code", -1), ot = /* @__PURE__ */ t("th", null, "Installments", -1), ut = /* @__PURE__ */ t("th", null, "Created", -1), it = { key: 0 }, dt = /* @__PURE__ */ t("th", null, "Refund Date", -1), rt = /* @__PURE__ */ t("h5", null, "Items", -1), ct = { class: "table table-sm table-striped" }, _t = /* @__PURE__ */ t("thead", null, [
  /* @__PURE__ */ t("tr", null, [
    /* @__PURE__ */ t("th", null, "Name"),
    /* @__PURE__ */ t("th", null, "Quantity"),
    /* @__PURE__ */ t("th", null, "Price")
  ])
], -1), ht = {
  key: 0,
  class: "mt-3"
}, mt = { key: 0 }, vt = {
  key: 1,
  class: "alert alert-warning"
}, pt = /* @__PURE__ */ t("p", null, "Are you sure you want to refund this transaction?", -1), bt = ["disabled"], ft = { key: 0 }, yt = { key: 1 }, xt = /* @__PURE__ */ N({
  __name: "TransactionDetailView",
  setup(gt) {
    const k = T("https://payments.crank-fit.com/api/graphql/"), e = V(k), D = F(), _ = A(), w = L(), r = B(!1);
    q(() => {
      e.fetchDetail(_.params.id);
    });
    async function x() {
      await e.refund(_.params.id) && (D.success("The payment has been refunded"), r.value = !1, await e.fetchDetail(_.params.id));
    }
    function h(c) {
      return c ? new Date(c).toLocaleString() : "-";
    }
    return (c, u) => {
      var m, v, p, b;
      const R = z("router-link");
      return a(), s("div", null, [
        t("div", H, [
          $,
          t("button", {
            class: "btn btn-outline-secondary btn-sm",
            onClick: u[0] || (u[0] = (o) => l(w).push({ name: "admin_transactions" }))
          }, " Back to list ")
        ]),
        l(e).isLoading.value ? (a(), s("div", j, P)) : d("", !0),
        l(e).hasError.value ? (a(), s("div", G, n(l(e).errorMessage.value), 1)) : d("", !0),
        l(e).detail.value && !l(e).isLoading.value ? (a(), s("div", K, [
          t("table", Q, [
            t("tbody", null, [
              t("tr", null, [
                J,
                t("td", null, n(l(e).detail.value.id), 1)
              ]),
              t("tr", null, [
                O,
                t("td", null, [
                  (v = (m = l(e).detail.value.siteCustomer) == null ? void 0 : m.identifiableUser) != null && v.id ? (a(), E(R, {
                    key: 0,
                    to: { name: "admin_customer_profile", params: { id: l(e).detail.value.siteCustomer.identifiableUser.id } }
                  }, {
                    default: I(() => [
                      U(n(l(e).detail.value.customerName || "-"), 1)
                    ]),
                    _: 1
                  }, 8, ["to"])) : (a(), s("span", W, n(l(e).detail.value.customerName || "-"), 1))
                ])
              ]),
              t("tr", null, [
                X,
                t("td", null, n(l(e).detail.value.customerEmail || "-"), 1)
              ]),
              t("tr", null, [
                Y,
                t("td", null, n(l(e).detail.value.siteName || "-"), 1)
              ]),
              t("tr", null, [
                Z,
                t("td", null, [
                  t("span", {
                    class: S(["badge", l(e).detail.value.status === "refunded" ? "text-bg-warning" : "text-bg-success"])
                  }, n(l(e).detail.value.status), 3)
                ])
              ]),
              t("tr", null, [
                tt,
                t("td", null, n((p = l(e).detail.value.shoppingCart) == null ? void 0 : p.currency) + " " + n(l(e).detail.value.amount), 1)
              ]),
              t("tr", null, [
                et,
                t("td", null, n(l(e).detail.value.taxAmount), 1)
              ]),
              t("tr", null, [
                lt,
                t("td", null, n((b = l(e).detail.value.shoppingCart) == null ? void 0 : b.currency) + " " + n(l(e).detail.value.subTotal), 1)
              ]),
              t("tr", null, [
                nt,
                t("td", null, n(l(e).detail.value.creditCardHolderName || "-"), 1)
              ]),
              t("tr", null, [
                at,
                t("td", null, n(l(e).detail.value.creditCardLastFourDigits || "-"), 1)
              ]),
              t("tr", null, [
                st,
                t("td", null, n(l(e).detail.value.authorizationCode || "-"), 1)
              ]),
              t("tr", null, [
                ot,
                t("td", null, n(l(e).detail.value.installments), 1)
              ]),
              t("tr", null, [
                ut,
                t("td", null, n(h(l(e).detail.value.created)), 1)
              ]),
              l(e).detail.value.refundDate ? (a(), s("tr", it, [
                dt,
                t("td", null, n(h(l(e).detail.value.refundDate)), 1)
              ])) : d("", !0)
            ])
          ]),
          rt,
          t("table", ct, [
            _t,
            t("tbody", null, [
              l(e).detail.value.shoppingCart ? (a(!0), s(g, { key: 0 }, C(l(e).detail.value.shoppingCart.items, (o) => {
                var i, f, y;
                return a(), s("tr", {
                  key: o.id
                }, [
                  t("td", null, n((i = o.variant.name) != null ? i : "-"), 1),
                  t("td", null, n(o.quantity), 1),
                  t("td", null, n((f = l(e).detail.value.shoppingCart) == null ? void 0 : f.currency) + " " + n((y = o.subtotal) != null ? y : o.variant.price), 1)
                ]);
              }), 128)) : (a(!0), s(g, { key: 1 }, C(l(e).detail.value.items, (o) => {
                var i;
                return a(), s("tr", {
                  key: (i = o.id) != null ? i : ""
                }, [
                  t("td", null, n(o.name), 1),
                  t("td", null, n(o.quantity), 1),
                  t("td", null, n(o.amount), 1)
                ]);
              }), 128))
            ])
          ]),
          l(e).detail.value.isRefundable ? (a(), s("div", ht, [
            r.value ? (a(), s("div", vt, [
              pt,
              t("button", {
                class: "btn btn-danger btn-sm me-2",
                onClick: x,
                disabled: l(e).isRefunding.value
              }, [
                l(e).isRefunding.value ? (a(), s("span", ft, "Processing...")) : (a(), s("span", yt, "Confirm Refund"))
              ], 8, bt),
              t("button", {
                class: "btn btn-secondary btn-sm",
                onClick: u[2] || (u[2] = (o) => r.value = !1)
              }, "Cancel")
            ])) : (a(), s("div", mt, [
              t("button", {
                class: "btn btn-danger btn-sm",
                onClick: u[1] || (u[1] = (o) => r.value = !0)
              }, "Refund")
            ]))
          ])) : d("", !0)
        ])) : d("", !0)
      ]);
    };
  }
});
export {
  xt as default
};
