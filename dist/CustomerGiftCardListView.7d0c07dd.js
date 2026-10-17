import { r as p, aj as T, ak as R, a0 as M, d as N, b as i, e as t, w as L, B as m, t as l, f as A, i as K, j as b, o as n, p as V, l as Y, y as q, G as H, I as U, K as j, M as O, g as C, F as P, h as S, T as B, N as z, af as W } from "./index.cb70f358.js";
const X = 2048 * 1024;
function J(o, r) {
  return o.trim() === "" ? "Paste the gift card code Mindbody issued." : r === null ? "Choose the gift card PDF." : r.type !== "" && r.type !== "application/pdf" ? "The gift card has to be a PDF file." : r.size > X ? "The gift card PDF has to be 2048 KB or smaller." : null;
}
function Q(o) {
  switch (o.__typename) {
    case "CustomerGiftCard":
      return null;
    case "CustomerGiftCardNotFoundError":
      return "This gift card order no longer exists.";
    case "GiftCardCodeRequiredError":
      return "Paste the gift card code Mindbody issued.";
    case "InvalidGiftCardPdfError":
      return o.message || "The gift card has to be a PDF of 2048 KB or smaller.";
  }
}
function Z(o) {
  return [...o.statusHistory].reverse();
}
const tt = (o) => {
  const r = p([]), h = p(!1), d = p(!1), u = p(!1);
  async function _() {
    h.value = !0, d.value = !1;
    try {
      const { data: f } = await o.query({
        query: T,
        fetchPolicy: "network-only"
      });
      r.value = f.customerGiftCards;
    } catch {
      d.value = !0;
    } finally {
      h.value = !1;
    }
  }
  async function c(f, G, e) {
    u.value = !0;
    try {
      const { data: s } = await o.mutate({
        mutation: R,
        variables: { id: f, input: { giftCardCode: G.trim(), pdfGiftCard: e } }
      }), v = s == null ? void 0 : s.updateCustomerGiftCard;
      return v ? Q(v) : M;
    } catch {
      return M;
    } finally {
      u.value = !1;
    }
  }
  return { giftCards: r, isLoading: h, hasLoadError: d, isIssuing: u, fetchGiftCards: _, issueCode: c };
}, g = (o) => (V("data-v-689166f1"), o = o(), Y(), o), et = { class: "modal-mask" }, st = {
  class: "modal-dialog modal-lg",
  role: "document"
}, ot = { class: "modal-content" }, at = { class: "modal-header" }, nt = /* @__PURE__ */ g(() => /* @__PURE__ */ t("h5", { class: "modal-title" }, "Add gift card code", -1)), lt = ["onSubmit"], it = { class: "modal-body" }, rt = { class: "alert alert-danger" }, dt = /* @__PURE__ */ g(() => /* @__PURE__ */ t("strong", null, "BE CAREFUL HERE!", -1)), ut = /* @__PURE__ */ g(() => /* @__PURE__ */ t("br", null, null, -1)), ct = /* @__PURE__ */ g(() => /* @__PURE__ */ t("strong", null, "Payfort", -1)), ft = /* @__PURE__ */ g(() => /* @__PURE__ */ t("br", null, null, -1)), mt = { class: "mb-3" }, _t = /* @__PURE__ */ g(() => /* @__PURE__ */ t("label", {
  for: "gift-card-code",
  class: "form-label"
}, "Gift card code", -1)), pt = { class: "mb-3" }, ht = /* @__PURE__ */ g(() => /* @__PURE__ */ t("label", {
  for: "gift-card-pdf",
  class: "form-label"
}, "Gift card PDF (max 2048 KB)", -1)), vt = {
  key: 0,
  class: "alert alert-danger mb-0"
}, gt = { class: "modal-footer" }, yt = ["disabled"], Ct = {
  key: 0,
  class: "spinner-border spinner-border-sm"
}, bt = /* @__PURE__ */ N({
  __name: "IssueGiftCardCodeModal",
  props: {
    giftCard: {},
    isIssuing: { type: Boolean },
    issue: { type: Function }
  },
  emits: ["issued", "close"],
  setup(o, { emit: r }) {
    const h = o, d = r, u = p(""), _ = p(null), c = p(null);
    function f(e) {
      const s = e.target.files;
      _.value = s && s.length > 0 ? s[0] : null;
    }
    async function G() {
      c.value = J(u.value, _.value), !(c.value !== null || _.value === null) && (c.value = await h.issue(u.value, _.value), c.value === null && d("issued"));
    }
    return (e, s) => {
      var v;
      return n(), i("div", et, [
        t("div", st, [
          t("div", ot, [
            t("div", at, [
              nt,
              t("button", {
                type: "button",
                class: "btn-close",
                "aria-label": "Close",
                onClick: s[0] || (s[0] = (k) => d("close"))
              })
            ]),
            t("form", {
              onSubmit: L(G, ["prevent"]),
              autocomplete: "off"
            }, [
              t("div", it, [
                t("div", rt, [
                  dt,
                  ut,
                  m(" Go to the Mindbody "),
                  t("strong", null, l(e.giftCard.giftCard.site.name), 1),
                  m(" admin panel and sell "),
                  t("strong", null, l(e.giftCard.giftCard.description), 1),
                  m(" to "),
                  t("strong", null, l((v = e.giftCard.customer.user) == null ? void 0 : v.email), 1),
                  m(", and when paying select "),
                  ct,
                  m("."),
                  ft,
                  m(' Copy the gift card code and paste it here, attach the gift card PDF, then press "Send gift card". The PDF is emailed to the customer. ')
                ]),
                t("div", mt, [
                  _t,
                  A(t("input", {
                    id: "gift-card-code",
                    "onUpdate:modelValue": s[1] || (s[1] = (k) => u.value = k),
                    class: "form-control",
                    type: "text"
                  }, null, 512), [
                    [K, u.value]
                  ])
                ]),
                t("div", pt, [
                  ht,
                  t("input", {
                    id: "gift-card-pdf",
                    class: "form-control",
                    type: "file",
                    accept: "application/pdf,.pdf",
                    onChange: f
                  }, null, 32)
                ]),
                c.value ? (n(), i("div", vt, l(c.value), 1)) : b("", !0)
              ]),
              t("div", gt, [
                t("button", {
                  type: "button",
                  class: "btn btn-secondary",
                  onClick: s[2] || (s[2] = (k) => d("close"))
                }, "Cancel"),
                t("button", {
                  type: "submit",
                  class: "btn btn-success",
                  disabled: e.isIssuing
                }, [
                  m(" Send gift card "),
                  e.isIssuing ? (n(), i("span", Ct)) : b("", !0)
                ], 8, yt)
              ])
            ], 40, lt)
          ])
        ])
      ]);
    };
  }
});
const Gt = /* @__PURE__ */ q(bt, [["__scopeId", "data-v-689166f1"]]), kt = /* @__PURE__ */ t("h4", { class: "mb-3" }, "Pending Gift Cards", -1), $t = {
  key: 0,
  class: "text-center py-4"
}, Ft = /* @__PURE__ */ t("div", {
  class: "spinner-border",
  role: "status"
}, null, -1), Dt = [
  Ft
], It = {
  key: 1,
  class: "alert alert-danger"
}, Et = {
  key: 2,
  class: "table-responsive"
}, wt = { class: "table table-sm table-striped align-middle" }, Mt = /* @__PURE__ */ t("thead", null, [
  /* @__PURE__ */ t("tr", null, [
    /* @__PURE__ */ t("th", null, "Id"),
    /* @__PURE__ */ t("th", null, "Site"),
    /* @__PURE__ */ t("th", null, "Gift card"),
    /* @__PURE__ */ t("th", null, "Bought by"),
    /* @__PURE__ */ t("th", null, "Recipient"),
    /* @__PURE__ */ t("th", null, "Status history"),
    /* @__PURE__ */ t("th", null, "Code"),
    /* @__PURE__ */ t("th")
  ])
], -1), Pt = { key: 0 }, St = /* @__PURE__ */ t("td", {
  colspan: "8",
  class: "text-center text-muted py-3"
}, "No pending gift cards", -1), Bt = [
  St
], Nt = { class: "small text-muted" }, xt = {
  key: 0,
  class: "small text-muted"
}, Tt = { class: "mb-0 ps-3 small" }, Rt = ["onClick"], At = /* @__PURE__ */ N({
  __name: "CustomerGiftCardListView",
  setup(o) {
    const r = H(), h = U("https://payments.crank-fit.com/api/graphql/"), { giftCards: d, isLoading: u, hasLoadError: _, isIssuing: c, fetchGiftCards: f, issueCode: G } = tt(h), e = p(null);
    function s($) {
      return W($).format("YYYY-MM-DD HH:mm:ss");
    }
    function v($, F) {
      return G(e.value.id, $, F);
    }
    async function k() {
      r.success("Gift card code saved and the PDF emailed to the customer."), e.value = null, await f();
    }
    return j(f), ($, F) => {
      const x = O("RouterLink");
      return n(), i("div", null, [
        kt,
        C(u) ? (n(), i("div", $t, Dt)) : C(_) ? (n(), i("div", It, "Failed to load the gift cards.")) : (n(), i("div", Et, [
          t("table", wt, [
            Mt,
            t("tbody", null, [
              C(d).length === 0 ? (n(), i("tr", Pt, Bt)) : b("", !0),
              (n(!0), i(P, null, S(C(d), (a) => {
                var I, E, w;
                return n(), i("tr", {
                  key: a.id
                }, [
                  t("td", null, l(a.id), 1),
                  t("td", null, l(a.giftCard.site.name), 1),
                  t("td", null, l(a.giftCard.description), 1),
                  t("td", null, [
                    a.customer.id ? (n(), B(x, {
                      key: 0,
                      to: { name: "admin_customer_profile", params: { id: a.customer.id } }
                    }, {
                      default: z(() => {
                        var y, D;
                        return [
                          m(l((y = a.customer.user) == null ? void 0 : y.firstName) + " " + l((D = a.customer.user) == null ? void 0 : D.lastName), 1)
                        ];
                      }),
                      _: 2
                    }, 1032, ["to"])) : b("", !0),
                    t("div", Nt, l((I = a.customer.user) == null ? void 0 : I.email), 1)
                  ]),
                  t("td", null, [
                    m(l((E = a.recipientName) != null ? E : "-") + " ", 1),
                    a.recipientEmail ? (n(), i("div", xt, l(a.recipientEmail), 1)) : b("", !0)
                  ]),
                  t("td", null, [
                    t("ul", Tt, [
                      (n(!0), i(P, null, S(C(Z)(a), (y, D) => (n(), i("li", { key: D }, l(y.status) + " at " + l(s(y.createdAt)), 1))), 128))
                    ])
                  ]),
                  t("td", null, l((w = a.giftCardCode) != null ? w : "-"), 1),
                  t("td", null, [
                    t("button", {
                      type: "button",
                      class: "btn btn-primary btn-sm",
                      onClick: (y) => e.value = a
                    }, " Add code ", 8, Rt)
                  ])
                ]);
              }), 128))
            ])
          ])
        ])),
        e.value ? (n(), B(Gt, {
          key: e.value.id,
          "gift-card": e.value,
          "is-issuing": C(c),
          issue: v,
          onIssued: k,
          onClose: F[0] || (F[0] = (a) => e.value = null)
        }, null, 8, ["gift-card", "is-issuing"])) : b("", !0)
      ]);
    };
  }
});
export {
  At as default
};
