import { f as m, g as N, h as M, i as A, j as R, m as P, u as q, k as I, l as D, o as r, c as _, d as y, n as e, p as $, q as S, w as B, e as t, s as F, t as j, v as z, F as x, x as L, y as h, T as K, z as g, M as O, E as U, A as W, C as H, B as Y, D as J, b as Q } from "./index.ebc216be.js";
const X = (d, f) => {
  const l = m(!1), i = m(!1), u = m(!1), o = m(!1);
  let a = null;
  const s = N({
    grandTotal: 0
  }), C = M(() => ({
    grandTotal: {
      required: A.withMessage("Grand Total is required", R),
      minValue: A.withMessage("Grand Total must be higher than 1", P(1))
    }
  })), b = q(C, s, { $scope: !1 }), T = async () => {
    await b.value.$validate() ? n(a.id, s.grandTotal) : console.error("error form");
  }, p = (v) => {
    f("afterUpdateGiftCard", v);
  }, E = (v) => {
    a = v, b.value.$reset(), s.grandTotal = a.grandTotal, u.value = !0;
  }, k = () => {
    a = null, u.value = !1;
  };
  async function n(v, V) {
    i.value = !1, o.value = !0;
    try {
      const G = await d.updateGiftCard(v, V);
      G && p(G), i.value = !0;
    } catch {
      l.value = !0;
    } finally {
      o.value = !1;
    }
  }
  return {
    hasError: l,
    modalIsVisible: u,
    isSaving: o,
    formData: s,
    v$: b,
    isSuccessful: i,
    openModal: E,
    closeModal: k,
    submitForm: T,
    afterUpdateGiftCard: p,
    onOkSuccess: () => {
      i.value = !1, k();
    }
  };
}, Z = { class: "modal-mask" }, tt = { class: "modal-wrapper" }, et = {
  class: "modal-dialog",
  role: "document"
}, st = { class: "modal-content" }, at = { class: "modal-header border-0" }, lt = /* @__PURE__ */ t("h5", { class: "modal-title" }, "EDIT", -1), ot = {
  type: "button",
  class: "close",
  "data-dismiss": "modal",
  "aria-label": "Close"
}, nt = { class: "modal-body" }, rt = { class: "form-row" }, dt = { class: "col-md-6 mb-3" }, it = /* @__PURE__ */ t("label", {
  for: "grandTotal",
  class: "input-label"
}, "Grand Total *", -1), ct = { class: "input-group" }, ut = { class: "modal-footer border-0" }, ft = /* @__PURE__ */ I({
  __name: "GiftCardEdit",
  props: {
    giftCard: {}
  },
  emits: ["afterUpdateGiftCard"],
  setup(d, { emit: f }) {
    const l = f, {
      modalIsVisible: i,
      isSaving: u,
      formData: o,
      v$: a,
      hasError: s,
      isSuccessful: C,
      openModal: b,
      closeModal: T,
      submitForm: p,
      onOkSuccess: E
    } = X(D("gqlApiService"), l);
    return (k, n) => (r(), _(x, null, [
      y($, {
        text: "Edit",
        size: "sm",
        type: "button",
        onOnClick: n[0] || (n[0] = (c) => e(b)(k.giftCard))
      }),
      e(i) ? (r(), S(K, {
        key: 0,
        name: "modal"
      }, {
        default: B(() => [
          t("div", Z, [
            t("div", tt, [
              t("div", et, [
                t("div", st, [
                  t("div", at, [
                    lt,
                    t("button", ot, [
                      t("span", {
                        "aria-hidden": "true",
                        onClick: n[1] || (n[1] = (...c) => e(T) && e(T)(...c))
                      }, "\xD7")
                    ])
                  ]),
                  t("div", nt, [
                    t("form", {
                      onSubmit: n[3] || (n[3] = F(
                        (...c) => e(p) && e(p)(...c),
                        ["prevent"]
                      )),
                      autocomplete: "off"
                    }, [
                      t("div", rt, [
                        t("div", dt, [
                          it,
                          t("div", ct, [
                            j(t("input", {
                              id: "grandTotal",
                              class: "form-control",
                              "onUpdate:modelValue": n[2] || (n[2] = (c) => e(o).grandTotal = c),
                              type: "number",
                              placeholder: "Grand Total",
                              required: "",
                              step: "1"
                            }, null, 512), [
                              [z, e(o).grandTotal]
                            ])
                          ]),
                          (r(!0), _(x, null, L(e(a).grandTotal.$errors, (c) => (r(), _("small", {
                            key: c.$uid,
                            class: "form-text",
                            style: { color: "red" }
                          }, h(c.$message), 1))), 128))
                        ])
                      ])
                    ], 32)
                  ]),
                  t("div", ut, [
                    y($, {
                      text: "Cancel",
                      type: "button",
                      disabled: e(u),
                      variant: "secondary",
                      onOnClick: e(T)
                    }, null, 8, ["disabled", "onOnClick"]),
                    y($, {
                      text: "UPDATE",
                      type: "button",
                      "is-loading": e(u),
                      onOnClick: e(p)
                    }, null, 8, ["is-loading", "onOnClick"])
                  ])
                ])
              ])
            ])
          ])
        ]),
        _: 1
      })) : g("", !0),
      e(C) ? (r(), S(O, {
        key: 1,
        title: "SUCCESS",
        message: "GIFTCARD WAS SUCCESSFULLY UPDATED.",
        closable: !1,
        onOnOk: e(E),
        "cancel-text": null
      }, null, 8, ["message", "onOnOk"])) : g("", !0),
      e(s) ? (r(), S(O, {
        key: 2,
        title: "Error",
        message: e(U),
        "cancel-text": null,
        onOnOk: n[4] || (n[4] = (c) => s.value = !1)
      }, null, 8, ["message"])) : g("", !0)
    ], 64));
  }
}), _t = () => {
  const d = m(!1), f = m(!1), l = m([]), i = async () => {
    d.value = !0;
    try {
      const o = D("gqlApiService");
      l.value = await o.getGiftCards();
    } catch {
      f.value = !0;
    } finally {
      d.value = !1;
    }
  }, u = (o) => {
    try {
      const a = l.value.findIndex((s) => s.id === o.id);
      if (a !== -1) {
        const s = [...l.value];
        s.splice(a, 1, o), l.value = s;
      }
    } catch (a) {
      console.error(a);
    }
  };
  return W(() => {
    i();
  }), {
    isLoading: d,
    hasError: f,
    giftCards: l,
    afterUpdateGiftCard: u
  };
}, w = (d) => (Y("data-v-7744e5b1"), d = d(), J(), d), mt = { class: "table-responsive" }, pt = { class: "table table-sm table-hover" }, vt = /* @__PURE__ */ w(() => /* @__PURE__ */ t("thead", null, [
  /* @__PURE__ */ t("tr", { class: "text-center" }, [
    /* @__PURE__ */ t("th", null, "SITE"),
    /* @__PURE__ */ t("th", null, "DESCRIPTION"),
    /* @__PURE__ */ t("th", null, "SALE PRICE"),
    /* @__PURE__ */ t("th", null, "GRAND TOTAL"),
    /* @__PURE__ */ t("th", null, "GIFT CARD TERMS"),
    /* @__PURE__ */ t("th", null, "LINK TO PURCHASE"),
    /* @__PURE__ */ t("th", null, "OPTIONS")
  ])
], -1)), ht = { class: "text-center align-middle" }, gt = { class: "text-right align-middle" }, Ct = { class: "text-right align-middle" }, bt = { class: "text-center" }, Tt = ["href"], yt = { key: 0 }, kt = /* @__PURE__ */ w(() => /* @__PURE__ */ t("td", {
  colspan: "7",
  class: "text-center align-middle"
}, [
  /* @__PURE__ */ t("p", null, "NO DATA AVAILABLE IN TABLE")
], -1)), St = [
  kt
], Et = { key: 1 }, Gt = {
  colspan: "7",
  class: "text-center"
}, $t = /* @__PURE__ */ I({
  __name: "GiftCardListView",
  setup(d) {
    const { isLoading: f, giftCards: l, hasError: i, afterUpdateGiftCard: u } = _t();
    return (o, a) => (r(), _("div", null, [
      t("div", mt, [
        t("table", pt, [
          vt,
          t("tbody", null, [
            (r(!0), _(x, null, L(e(l), (s, C) => (r(), _("tr", { key: C }, [
              t("td", ht, h(s.site.name), 1),
              t("td", null, h(s.description), 1),
              t("td", gt, "AED " + h(s.salePrice), 1),
              t("td", Ct, "AED " + h(s.grandTotal), 1),
              t("td", null, h(s.terms), 1),
              t("td", bt, [
                t("a", {
                  href: s.purchaseUrl,
                  class: "btn btn-sm btn-secondary"
                }, "Link", 8, Tt)
              ]),
              t("td", null, [
                y(ft, {
                  giftCard: s,
                  onAfterUpdateGiftCard: e(u)
                }, null, 8, ["giftCard", "onAfterUpdateGiftCard"])
              ])
            ]))), 128)),
            e(l).length === 0 && !e(f) ? (r(), _("tr", yt, St)) : g("", !0),
            e(f) ? (r(), _("tr", Et, [
              t("td", Gt, [
                y(H, { text: "LOADING..." })
              ])
            ])) : g("", !0)
          ])
        ])
      ]),
      e(i) ? (r(), S(O, {
        key: 0,
        title: "Error",
        message: e(U),
        "cancel-text": null,
        onOnOk: a[0] || (a[0] = (s) => i.value = !1)
      }, null, 8, ["message"])) : g("", !0)
    ]));
  }
});
const Ot = /* @__PURE__ */ Q($t, [["__scopeId", "data-v-7744e5b1"]]);
export {
  Ot as default
};
