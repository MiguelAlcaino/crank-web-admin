import { d as U, H as N, z as F, r, c as I, I as q, b as s, e as t, f as _, i as g, v as x, F as C, h as k, g as u, j as f, t as n, M as B, Z as z, o, A as j, $ as O } from "./index.6fb1cfad.js";
import { u as W } from "./useTransactionRecords.8d35b941.js";
import { u as X } from "./useAvailableSites.bbdff975.js";
const $ = /* @__PURE__ */ t("h4", null, "List of transactions", -1), G = { class: "row mb-3" }, H = { class: "col-md-3" }, Y = { class: "col-md-2" }, Z = /* @__PURE__ */ O('<option value="">Payment method</option><option value="CREDIT_CARD">Credit Card</option><option value="DIGITAL_WALLET">Digital Wallet</option><option value="APPLE_PAY">Apple Pay</option><option value="AMEX">AMEX</option>', 5), J = [
  Z
], K = { class: "col-md-2" }, Q = /* @__PURE__ */ t("option", { value: "" }, "All Sites", -1), tt = ["value"], et = { class: "col-md-2" }, lt = { class: "col-md-2" }, at = {
  key: 0,
  class: "text-center py-4"
}, ot = /* @__PURE__ */ t("div", {
  class: "spinner-border",
  role: "status"
}, null, -1), st = [
  ot
], nt = {
  key: 1,
  class: "alert alert-danger"
}, it = { key: 2 }, ut = { class: "table table-striped table-sm" }, rt = /* @__PURE__ */ t("thead", null, [
  /* @__PURE__ */ t("tr", null, [
    /* @__PURE__ */ t("th", null, "Customer"),
    /* @__PURE__ */ t("th", null, "Email"),
    /* @__PURE__ */ t("th", null, "Date"),
    /* @__PURE__ */ t("th", null, "Payment Status"),
    /* @__PURE__ */ t("th", null, "Items"),
    /* @__PURE__ */ t("th", null, "Amount"),
    /* @__PURE__ */ t("th", null, "Auth code"),
    /* @__PURE__ */ t("th", null, "Site"),
    /* @__PURE__ */ t("th", null, "Options")
  ])
], -1), ct = { key: 0 }, dt = /* @__PURE__ */ t("td", {
  colspan: "9",
  class: "text-center text-muted py-3"
}, "No transactions found", -1), mt = [
  dt
], vt = ["onClick"], A = 50, bt = /* @__PURE__ */ U({
  __name: "TransactionListView",
  setup(pt) {
    const w = N("https://payments.crank-fit.com/api/graphql/"), a = W(w), { sites: L, fetchSites: R } = X(w), M = F(), c = r(""), d = r(""), m = r(""), v = r(""), p = r(""), h = r(1);
    I(() => a.listResult.value ? Math.ceil(a.listResult.value.totalCount / A) : 1);
    async function y() {
      const l = {};
      c.value && (l.search = c.value), d.value && (l.paymentMethod = d.value), m.value && (l.site = m.value), v.value && (l.startDate = v.value), p.value && (l.endDate = p.value), await a.fetchList(
        Object.keys(l).length > 0 ? l : void 0,
        { page: h.value, limit: A }
      );
    }
    async function P() {
      h.value = 1, await y();
    }
    async function S() {
      c.value = "", d.value = "", m.value = "", v.value = "", p.value = "", h.value = 1, await y();
    }
    async function E(l) {
      h.value = l, await y();
    }
    function T(l) {
      M.push({ name: "admin_transaction_detail", params: { id: l } });
    }
    function V(l) {
      return l ? new Date(l).toLocaleDateString() : "-";
    }
    return q(async () => {
      await R(), await y();
    }), (l, i) => (o(), s("div", null, [
      $,
      t("div", G, [
        t("div", H, [
          _(t("input", {
            type: "text",
            "onUpdate:modelValue": i[0] || (i[0] = (e) => c.value = e),
            class: "form-control form-control-sm",
            placeholder: "Client's name"
          }, null, 512), [
            [g, c.value]
          ])
        ]),
        t("div", Y, [
          _(t("select", {
            "onUpdate:modelValue": i[1] || (i[1] = (e) => d.value = e),
            class: "form-control form-control-sm"
          }, J, 512), [
            [x, d.value]
          ])
        ]),
        t("div", K, [
          _(t("select", {
            "onUpdate:modelValue": i[2] || (i[2] = (e) => m.value = e),
            class: "form-control form-control-sm"
          }, [
            Q,
            (o(!0), s(C, null, k(u(L), (e) => (o(), s("option", {
              key: e.code,
              value: e.code
            }, n(e.name), 9, tt))), 128))
          ], 512), [
            [x, m.value]
          ])
        ]),
        t("div", et, [
          _(t("input", {
            type: "date",
            "onUpdate:modelValue": i[3] || (i[3] = (e) => v.value = e),
            class: "form-control form-control-sm"
          }, null, 512), [
            [g, v.value]
          ])
        ]),
        t("div", lt, [
          _(t("input", {
            type: "date",
            "onUpdate:modelValue": i[4] || (i[4] = (e) => p.value = e),
            class: "form-control form-control-sm"
          }, null, 512), [
            [g, p.value]
          ])
        ]),
        t("div", { class: "col-md-1" }, [
          t("button", {
            class: "btn btn-primary btn-sm",
            onClick: P
          }, "Filter")
        ])
      ]),
      t("div", { class: "mb-3" }, [
        t("button", {
          class: "btn btn-outline-secondary btn-sm",
          onClick: S
        }, "Clear filter")
      ]),
      u(a).isLoading.value ? (o(), s("div", at, st)) : f("", !0),
      u(a).hasError.value ? (o(), s("div", nt, n(u(a).errorMessage.value), 1)) : f("", !0),
      u(a).listResult.value && !u(a).isLoading.value ? (o(), s("div", it, [
        t("table", ut, [
          rt,
          t("tbody", null, [
            u(a).listResult.value.items.length === 0 ? (o(), s("tr", ct, mt)) : f("", !0),
            (o(!0), s(C, null, k(u(a).listResult.value.items, (e) => (o(), s("tr", {
              key: e.id
            }, [
              t("td", null, n(e.customerName || "-"), 1),
              t("td", null, n(e.customerEmail || "-"), 1),
              t("td", null, n(V(e.created)), 1),
              t("td", null, [
                t("span", {
                  class: j(["badge", e.status === "refunded" ? "text-bg-warning" : "text-bg-success"])
                }, n(e.status), 3)
              ]),
              t("td", null, [
                (o(!0), s(C, null, k(e.items, (b) => {
                  var D;
                  return o(), s("span", {
                    key: (D = b.id) != null ? D : "",
                    class: "d-block small"
                  }, n(b.name) + " (x" + n(b.quantity) + ") ", 1);
                }), 128))
              ]),
              t("td", null, n(e.amount || "0"), 1),
              t("td", null, n(e.authorizationCode || "-"), 1),
              t("td", null, n(e.siteName || "-"), 1),
              t("td", null, [
                t("button", {
                  class: "btn btn-outline-secondary btn-sm",
                  onClick: (b) => T(e.id)
                }, " Show ", 8, vt)
              ])
            ]))), 128))
          ])
        ]),
        u(a).listResult.value ? (o(), B(z, {
          key: 0,
          page: h.value,
          limit: A,
          total: u(a).listResult.value.totalCount,
          onPageChanged: E
        }, null, 8, ["page", "total"])) : f("", !0)
      ])) : f("", !0)
    ]));
  }
});
export {
  bt as default
};
