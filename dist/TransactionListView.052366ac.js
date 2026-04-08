import { d as V, H as U, z as N, r, c as F, I, b as s, e as t, f as _, i as g, v as D, F as C, h as k, g as u, j as f, t as n, M as q, Z as B, o, A as z, $ as j } from "./index.8423d6a8.js";
import { u as O } from "./useTransactionRecords.69080b54.js";
import { u as W } from "./useAvailableSites.f93f3824.js";
const X = /* @__PURE__ */ t("h4", null, "List of transactions", -1), $ = { class: "row mb-3" }, G = { class: "col-md-3" }, H = { class: "col-md-2" }, Y = /* @__PURE__ */ j('<option value="">Payment method</option><option value="CREDIT_CARD">Credit Card</option><option value="DIGITAL_WALLET">Digital Wallet</option><option value="APPLE_PAY">Apple Pay</option><option value="AMEX">AMEX</option>', 5), Z = [
  Y
], J = { class: "col-md-2" }, K = /* @__PURE__ */ t("option", { value: "" }, "All Sites", -1), Q = ["value"], tt = { class: "col-md-2" }, et = { class: "col-md-2" }, lt = {
  key: 0,
  class: "text-center py-4"
}, at = /* @__PURE__ */ t("div", {
  class: "spinner-border",
  role: "status"
}, null, -1), ot = [
  at
], st = {
  key: 1,
  class: "alert alert-danger"
}, nt = { key: 2 }, it = { class: "table table-striped table-sm" }, ut = /* @__PURE__ */ t("thead", null, [
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
], -1), rt = { key: 0 }, ct = /* @__PURE__ */ t("td", {
  colspan: "9",
  class: "text-center text-muted py-3"
}, "No transactions found", -1), dt = [
  ct
], mt = ["onClick"], A = 50, yt = /* @__PURE__ */ V({
  __name: "TransactionListView",
  setup(vt) {
    const w = U("https://payments.crank-fit.com/api/graphql/"), a = O(w), { sites: x, fetchSites: L } = W(w), R = N(), c = r(""), d = r(""), m = r(""), v = r(""), p = r(""), h = r(1);
    F(() => a.listResult.value ? Math.ceil(a.listResult.value.totalCount / A) : 1);
    async function y() {
      const l = {};
      c.value && (l.search = c.value), d.value && (l.paymentMethod = d.value), m.value && (l.site = m.value), v.value && (l.startDate = v.value), p.value && (l.endDate = p.value), await a.fetchList(
        Object.keys(l).length > 0 ? l : void 0,
        { page: h.value, limit: A }
      );
    }
    async function M() {
      h.value = 1, await y();
    }
    async function P() {
      c.value = "", d.value = "", m.value = "", v.value = "", p.value = "", h.value = 1, await y();
    }
    async function S(l) {
      h.value = l, await y();
    }
    function E(l) {
      R.push({ name: "admin_transaction_detail", params: { id: l } });
    }
    function T(l) {
      return l ? new Date(l).toLocaleDateString() : "-";
    }
    return I(async () => {
      await L(), await y();
    }), (l, i) => (o(), s("div", null, [
      X,
      t("div", $, [
        t("div", G, [
          _(t("input", {
            type: "text",
            "onUpdate:modelValue": i[0] || (i[0] = (e) => c.value = e),
            class: "form-control form-control-sm",
            placeholder: "Client's name"
          }, null, 512), [
            [g, c.value]
          ])
        ]),
        t("div", H, [
          _(t("select", {
            "onUpdate:modelValue": i[1] || (i[1] = (e) => d.value = e),
            class: "form-control form-control-sm"
          }, Z, 512), [
            [D, d.value]
          ])
        ]),
        t("div", J, [
          _(t("select", {
            "onUpdate:modelValue": i[2] || (i[2] = (e) => m.value = e),
            class: "form-control form-control-sm"
          }, [
            K,
            (o(!0), s(C, null, k(u(x), (e) => (o(), s("option", {
              key: e.code,
              value: e.code
            }, n(e.name), 9, Q))), 128))
          ], 512), [
            [D, m.value]
          ])
        ]),
        t("div", tt, [
          _(t("input", {
            type: "date",
            "onUpdate:modelValue": i[3] || (i[3] = (e) => v.value = e),
            class: "form-control form-control-sm"
          }, null, 512), [
            [g, v.value]
          ])
        ]),
        t("div", et, [
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
            onClick: M
          }, "Filter")
        ])
      ]),
      t("div", { class: "mb-3" }, [
        t("button", {
          class: "btn btn-outline-secondary btn-sm",
          onClick: P
        }, "Clear filter")
      ]),
      u(a).isLoading.value ? (o(), s("div", lt, ot)) : f("", !0),
      u(a).hasError.value ? (o(), s("div", st, n(u(a).errorMessage.value), 1)) : f("", !0),
      u(a).listResult.value && !u(a).isLoading.value ? (o(), s("div", nt, [
        t("table", it, [
          ut,
          t("tbody", null, [
            u(a).listResult.value.items.length === 0 ? (o(), s("tr", rt, dt)) : f("", !0),
            (o(!0), s(C, null, k(u(a).listResult.value.items, (e) => (o(), s("tr", {
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
              t("td", null, [
                (o(!0), s(C, null, k(e.items, (b) => (o(), s("span", {
                  key: b.id,
                  class: "d-block small"
                }, n(b.name) + " (x" + n(b.quantity) + ") ", 1))), 128))
              ]),
              t("td", null, n(e.amount || "0"), 1),
              t("td", null, n(e.authorizationCode || "-"), 1),
              t("td", null, n(e.siteName || "-"), 1),
              t("td", null, [
                t("button", {
                  class: "btn btn-outline-secondary btn-sm",
                  onClick: (b) => E(e.id)
                }, " Show ", 8, mt)
              ])
            ]))), 128))
          ])
        ]),
        u(a).listResult.value ? (o(), q(B, {
          key: 0,
          page: h.value,
          limit: A,
          total: u(a).listResult.value.totalCount,
          onPageChanged: S
        }, null, 8, ["page", "total"])) : f("", !0)
      ])) : f("", !0)
    ]));
  }
});
export {
  yt as default
};
