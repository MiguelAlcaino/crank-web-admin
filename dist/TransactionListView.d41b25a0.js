import { d as V, H as N, z as U, r, c as F, I as B, b as u, e as t, f as _, i as g, v as A, F as w, h as D, g as s, j as f, t as n, N as I, Z as q, o as i, A as z, $ as j } from "./index.0af13fe1.js";
import { u as O } from "./useTransactionRecords.3459e0b5.js";
import { u as W } from "./useAvailableSites.1576e46b.js";
const X = /* @__PURE__ */ t("h4", null, "List of transactions", -1), $ = { class: "row mb-3" }, G = { class: "col-md-3" }, H = { class: "col-md-2" }, Y = /* @__PURE__ */ j('<option value="">Payment method</option><option value="CREDIT_CARD">Credit Card</option><option value="DIGITAL_WALLET">Digital Wallet</option><option value="APPLE_PAY">Apple Pay</option><option value="AMEX">AMEX</option>', 5), Z = [
  Y
], J = { class: "col-md-2" }, K = /* @__PURE__ */ t("option", { value: "" }, "All Sites", -1), Q = ["value"], tt = { class: "col-md-2" }, et = { class: "col-md-2" }, lt = {
  key: 0,
  class: "text-center py-4"
}, ot = /* @__PURE__ */ t("div", {
  class: "spinner-border",
  role: "status"
}, null, -1), at = [
  ot
], st = {
  key: 1,
  class: "alert alert-danger"
}, nt = { key: 2 }, it = { class: "table table-striped table-sm" }, ut = /* @__PURE__ */ t("thead", null, [
  /* @__PURE__ */ t("tr", null, [
    /* @__PURE__ */ t("th", null, "Customer"),
    /* @__PURE__ */ t("th", null, "Email"),
    /* @__PURE__ */ t("th", null, "Date"),
    /* @__PURE__ */ t("th", null, "Payment Status"),
    /* @__PURE__ */ t("th", null, "Amount"),
    /* @__PURE__ */ t("th", null, "Auth code"),
    /* @__PURE__ */ t("th", null, "Site"),
    /* @__PURE__ */ t("th", null, "Options")
  ])
], -1), rt = { key: 0 }, ct = /* @__PURE__ */ t("td", {
  colspan: "8",
  class: "text-center text-muted py-3"
}, "No transactions found", -1), dt = [
  ct
], mt = ["onClick"], b = 50, gt = /* @__PURE__ */ V({
  __name: "TransactionListView",
  setup(vt) {
    const C = N("https://payments.crank-fit.com/api/graphql/"), o = O(C), { sites: L, fetchSites: R } = W(C), x = U(), c = r(""), d = r(""), m = r(""), v = r(""), p = r(""), h = r(1);
    F(() => o.listResult.value ? Math.ceil(o.listResult.value.totalCount / b) : 1);
    async function y() {
      const l = {};
      c.value && (l.search = c.value), d.value && (l.paymentMethod = d.value), m.value && (l.site = m.value), v.value && (l.startDate = v.value), p.value && (l.endDate = p.value), await o.fetchList(
        Object.keys(l).length > 0 ? l : void 0,
        { page: h.value, limit: b }
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
    function M(l) {
      x.push({ name: "admin_transaction_detail", params: { id: l } });
    }
    function T(l) {
      return l ? new Date(l).toLocaleString() : "-";
    }
    return B(async () => {
      await R(), await y();
    }), (l, a) => (i(), u("div", null, [
      X,
      t("div", $, [
        t("div", G, [
          _(t("input", {
            type: "text",
            "onUpdate:modelValue": a[0] || (a[0] = (e) => c.value = e),
            class: "form-control form-control-sm",
            placeholder: "Client's name"
          }, null, 512), [
            [g, c.value]
          ])
        ]),
        t("div", H, [
          _(t("select", {
            "onUpdate:modelValue": a[1] || (a[1] = (e) => d.value = e),
            class: "form-control form-control-sm"
          }, Z, 512), [
            [A, d.value]
          ])
        ]),
        t("div", J, [
          _(t("select", {
            "onUpdate:modelValue": a[2] || (a[2] = (e) => m.value = e),
            class: "form-control form-control-sm"
          }, [
            K,
            (i(!0), u(w, null, D(s(L), (e) => (i(), u("option", {
              key: e.code,
              value: e.code
            }, n(e.name), 9, Q))), 128))
          ], 512), [
            [A, m.value]
          ])
        ]),
        t("div", tt, [
          _(t("input", {
            type: "date",
            "onUpdate:modelValue": a[3] || (a[3] = (e) => v.value = e),
            class: "form-control form-control-sm"
          }, null, 512), [
            [g, v.value]
          ])
        ]),
        t("div", et, [
          _(t("input", {
            type: "date",
            "onUpdate:modelValue": a[4] || (a[4] = (e) => p.value = e),
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
      s(o).isLoading.value ? (i(), u("div", lt, at)) : f("", !0),
      s(o).hasError.value ? (i(), u("div", st, n(s(o).errorMessage.value), 1)) : f("", !0),
      s(o).listResult.value && !s(o).isLoading.value ? (i(), u("div", nt, [
        t("table", it, [
          ut,
          t("tbody", null, [
            s(o).listResult.value.items.length === 0 ? (i(), u("tr", rt, dt)) : f("", !0),
            (i(!0), u(w, null, D(s(o).listResult.value.items, (e) => {
              var k;
              return i(), u("tr", {
                key: e.id
              }, [
                t("td", null, n(e.customerName || "-"), 1),
                t("td", null, n(e.customerEmail || "-"), 1),
                t("td", null, n(T(e.created)), 1),
                t("td", null, [
                  t("span", {
                    class: z(["badge", e.status === "refunded" ? "text-bg-warning" : "text-bg-success"])
                  }, n(e.status), 3)
                ]),
                t("td", null, n((k = e.shoppingCart) == null ? void 0 : k.currency) + " " + n(e.amount || "0"), 1),
                t("td", null, n(e.authorizationCode || "-"), 1),
                t("td", null, n(e.siteName || "-"), 1),
                t("td", null, [
                  t("button", {
                    class: "btn btn-outline-secondary btn-sm",
                    onClick: (ht) => M(e.id)
                  }, " Show ", 8, mt)
                ])
              ]);
            }), 128))
          ])
        ]),
        s(o).listResult.value ? (i(), I(q, {
          key: 0,
          page: h.value,
          limit: b,
          total: s(o).listResult.value.totalCount,
          onPageChanged: E
        }, null, 8, ["page", "total"])) : f("", !0)
      ])) : f("", !0)
    ]));
  }
});
export {
  gt as default
};
