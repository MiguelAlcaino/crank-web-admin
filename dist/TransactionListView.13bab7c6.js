import { d as S, T as V, o as l, a9 as O, I as W, J as X, z as G, P as E, Q as T, r as _, c as P, K as J, b as n, e as t, f as y, i as x, v as R, F as M, h as L, g as s, k as K, j as u, t as i, aa as Q, A as Y, ab as H } from "./index.cb70f358.js";
import { u as Z } from "./useTransactionRecords.10de3dc8.js";
import { _ as tt, c as et } from "./AdminExportButton.vue_vue_type_script_setup_true_lang.a3d4defa.js";
const ot = /* @__PURE__ */ S({
  __name: "ExportTransactionRecordsButton",
  props: {
    apolloClient: {},
    filter: {}
  },
  setup(A) {
    const g = A;
    async function h() {
      const { data: o } = await g.apolloClient.mutate({
        mutation: O,
        variables: { filter: et(g.filter) }
      });
      return o == null ? void 0 : o.exportTransactionRecords;
    }
    return (o, D) => (l(), V(tt, {
      text: "Export to Excel",
      "run-export": h
    }));
  }
}), at = /* @__PURE__ */ t("h4", null, "List of transactions", -1), st = { class: "row mb-3" }, lt = { class: "col-md-3" }, nt = { class: "col-md-2" }, it = /* @__PURE__ */ H('<option value="">Payment method</option><option value="CREDIT_CARD">Credit Card</option><option value="DIGITAL_WALLET">Digital Wallet</option><option value="APPLE_PAY">Apple Pay</option><option value="AMEX">AMEX</option>', 5), rt = [
  it
], ut = { class: "col-md-2" }, ct = /* @__PURE__ */ t("option", { value: "" }, "All Sites", -1), dt = ["value"], mt = { class: "col-md-2" }, pt = { class: "col-md-2" }, vt = {
  key: 0,
  class: "mb-3"
}, _t = {
  key: 1,
  class: "text-center py-4"
}, ht = /* @__PURE__ */ t("div", {
  class: "spinner-border",
  role: "status"
}, null, -1), ft = [
  ht
], yt = {
  key: 2,
  class: "alert alert-danger"
}, bt = { key: 3 }, gt = { class: "table table-striped table-sm" }, Ct = /* @__PURE__ */ t("th", null, "Customer", -1), xt = /* @__PURE__ */ t("th", null, "Email", -1), kt = /* @__PURE__ */ t("th", null, "Date", -1), At = /* @__PURE__ */ t("th", null, "Payment Status", -1), Dt = /* @__PURE__ */ t("th", null, "Amount", -1), wt = { key: 0 }, Et = /* @__PURE__ */ t("th", null, "Auth code", -1), Tt = /* @__PURE__ */ t("th", null, "Site", -1), Pt = /* @__PURE__ */ t("th", null, "Options", -1), Rt = { key: 0 }, Mt = ["colspan"], Lt = { key: 0 }, St = ["onClick"], k = 50, Bt = /* @__PURE__ */ S({
  __name: "TransactionListView",
  setup(A) {
    const h = W("https://payments.crank-fit.com/api/graphql/"), o = Z(h), { sites: D, fetchSites: F } = X(h), N = G(), C = E(T.TransactionPaymentDetails), c = _(""), d = _(""), m = _(""), p = _(""), v = _(""), f = _(1), U = E(T.TransactionsExport), B = P(() => ({
      search: c.value,
      paymentMethod: d.value,
      site: m.value,
      startDate: p.value,
      endDate: v.value
    }));
    P(() => o.listResult.value ? Math.ceil(o.listResult.value.totalCount / k) : 1);
    async function b() {
      const a = {};
      c.value && (a.search = c.value), d.value && (a.paymentMethod = d.value), m.value && (a.site = m.value), p.value && (a.startDate = p.value), v.value && (a.endDate = v.value), await o.fetchList(
        Object.keys(a).length > 0 ? a : void 0,
        { page: f.value, limit: k }
      );
    }
    async function I() {
      f.value = 1, await b();
    }
    async function q() {
      c.value = "", d.value = "", m.value = "", p.value = "", v.value = "", f.value = 1, await b();
    }
    async function z(a) {
      f.value = a, await b();
    }
    function $(a) {
      N.push({ name: "admin_transaction_detail", params: { id: a } });
    }
    function j(a) {
      return a ? new Date(a).toLocaleString() : "-";
    }
    return J(async () => {
      await F(), await b();
    }), (a, r) => (l(), n("div", null, [
      at,
      t("div", st, [
        t("div", lt, [
          y(t("input", {
            type: "text",
            "onUpdate:modelValue": r[0] || (r[0] = (e) => c.value = e),
            class: "form-control form-control-sm",
            placeholder: "Client's name"
          }, null, 512), [
            [x, c.value]
          ])
        ]),
        t("div", nt, [
          y(t("select", {
            "onUpdate:modelValue": r[1] || (r[1] = (e) => d.value = e),
            class: "form-control form-control-sm"
          }, rt, 512), [
            [R, d.value]
          ])
        ]),
        t("div", ut, [
          y(t("select", {
            "onUpdate:modelValue": r[2] || (r[2] = (e) => m.value = e),
            class: "form-control form-control-sm"
          }, [
            ct,
            (l(!0), n(M, null, L(s(D), (e) => (l(), n("option", {
              key: e.code,
              value: e.code
            }, i(e.name), 9, dt))), 128))
          ], 512), [
            [R, m.value]
          ])
        ]),
        t("div", mt, [
          y(t("input", {
            type: "date",
            "onUpdate:modelValue": r[3] || (r[3] = (e) => p.value = e),
            class: "form-control form-control-sm"
          }, null, 512), [
            [x, p.value]
          ])
        ]),
        t("div", pt, [
          y(t("input", {
            type: "date",
            "onUpdate:modelValue": r[4] || (r[4] = (e) => v.value = e),
            class: "form-control form-control-sm"
          }, null, 512), [
            [x, v.value]
          ])
        ]),
        t("div", { class: "col-md-1" }, [
          t("button", {
            class: "btn btn-primary btn-sm",
            onClick: I
          }, "Filter")
        ])
      ]),
      t("div", { class: "mb-3" }, [
        t("button", {
          class: "btn btn-outline-secondary btn-sm",
          onClick: q
        }, "Clear filter")
      ]),
      s(U) ? (l(), n("div", vt, [
        K(ot, {
          "apollo-client": s(h),
          filter: B.value
        }, null, 8, ["apollo-client", "filter"])
      ])) : u("", !0),
      s(o).isLoading.value ? (l(), n("div", _t, ft)) : u("", !0),
      s(o).hasError.value ? (l(), n("div", yt, i(s(o).errorMessage.value), 1)) : u("", !0),
      s(o).listResult.value && !s(o).isLoading.value ? (l(), n("div", bt, [
        t("table", gt, [
          t("thead", null, [
            t("tr", null, [
              Ct,
              xt,
              kt,
              At,
              Dt,
              s(C) ? (l(), n("th", wt, "Payment method")) : u("", !0),
              Et,
              Tt,
              Pt
            ])
          ]),
          t("tbody", null, [
            s(o).listResult.value.items.length === 0 ? (l(), n("tr", Rt, [
              t("td", {
                colspan: s(C) ? 9 : 8,
                class: "text-center text-muted py-3"
              }, " No transactions found ", 8, Mt)
            ])) : u("", !0),
            (l(!0), n(M, null, L(s(o).listResult.value.items, (e) => {
              var w;
              return l(), n("tr", {
                key: e.id
              }, [
                t("td", null, i(e.customerName || "-"), 1),
                t("td", null, i(e.customerEmail || "-"), 1),
                t("td", null, i(j(e.created)), 1),
                t("td", null, [
                  t("span", {
                    class: Y(["badge", e.status === "refunded" ? "text-bg-warning" : "text-bg-success"])
                  }, i(e.status), 3)
                ]),
                t("td", null, i((w = e.shoppingCart) == null ? void 0 : w.currency) + " " + i(e.amount || "0"), 1),
                s(C) ? (l(), n("td", Lt, i(e.paymentMethod || "-"), 1)) : u("", !0),
                t("td", null, i(e.authorizationCode || "-"), 1),
                t("td", null, i(e.siteName || "-"), 1),
                t("td", null, [
                  t("button", {
                    class: "btn btn-outline-secondary btn-sm",
                    onClick: (Vt) => $(e.id)
                  }, " Show ", 8, St)
                ])
              ]);
            }), 128))
          ])
        ]),
        s(o).listResult.value ? (l(), V(Q, {
          key: 0,
          page: f.value,
          limit: k,
          total: s(o).listResult.value.totalCount,
          onPageChanged: z
        }, null, 8, ["page", "total"])) : u("", !0)
      ])) : u("", !0)
    ]));
  }
});
export {
  Bt as default
};
