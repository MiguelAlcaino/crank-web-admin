import { d as B, o as u, b, e, t as f, k as F, N as Y, j as k, g as y, X as Z, p as W, l as j, y as G, Y as g, a as Q, r as T, w as ee, f as _, i as O, Z as S, B as I, $ as te, a0 as R, a1 as se, a2 as oe, a3 as ae, H as ie, G as ne, I as le, J as re, c as q, L as ce, K as de, F as ue, h as pe, T as L, a4 as me } from "./index.cb70f358.js";
const be = (t) => (W("data-v-3ad55e5a"), t = t(), j(), t), he = { class: "category-section mb-4" }, ye = { class: "category-title" }, _e = { class: "list-group-item d-flex justify-content-between align-items-center" }, ve = { class: "d-flex align-items-center" }, fe = /* @__PURE__ */ be(() => /* @__PURE__ */ e("i", { class: "bi bi-grip-vertical me-2 drag-handle" }, null, -1)), ge = { class: "fw-bold" }, ke = { class: "ms-2 text-muted" }, Pe = {
  key: 0,
  class: "ms-2 small text-muted"
}, Te = {
  key: 1,
  class: "badge bg-secondary ms-2"
}, Ce = {
  key: 2,
  class: "badge bg-info ms-2"
}, Oe = ["onClick"], Ve = {
  key: 0,
  class: "text-muted text-center py-3 empty-placeholder"
}, De = /* @__PURE__ */ B({
  __name: "AdminProductCategoryList",
  props: {
    title: {},
    products: {},
    groupName: {}
  },
  emits: ["update:products", "edit"],
  setup(t, { emit: l }) {
    const a = l;
    function r(s) {
      return Math.round(s).toString();
    }
    return (s, m) => (u(), b("div", he, [
      e("h5", ye, f(s.title), 1),
      F(y(Z), {
        "model-value": s.products,
        "onUpdate:modelValue": m[0] || (m[0] = (n) => a("update:products", n)),
        group: s.groupName,
        "item-key": "id",
        class: "list-group package-list"
      }, {
        item: Y(({ element: n }) => [
          e("div", _e, [
            e("div", ve, [
              fe,
              e("div", null, [
                e("span", ge, f(n.name), 1),
                e("span", ke, "AED " + f(r(n.price)), 1),
                n.customTitle ? (u(), b("span", Pe, ' (shown as "' + f(n.customTitle) + '") ', 1)) : k("", !0),
                n.isVisible ? k("", !0) : (u(), b("span", Te, "Hidden")),
                n.muviEnabled ? (u(), b("span", Ce, " VOD " + f(n.muviNumberOfDays) + "d ", 1)) : k("", !0)
              ])
            ]),
            e("button", {
              type: "button",
              class: "btn btn-primary btn-sm",
              onClick: (v) => a("edit", n)
            }, " Edit ", 8, Oe)
          ])
        ]),
        _: 1
      }, 8, ["model-value", "group"]),
      s.products.length === 0 ? (u(), b("div", Ve, " No packages in this category. Drag packages here. ")) : k("", !0)
    ]));
  }
});
const Se = /* @__PURE__ */ G(De, [["__scopeId", "data-v-3ad55e5a"]]), U = [
  { category: g.Regular, title: "Regular" },
  { category: g.Trial, title: "Trial" },
  { category: g.Vod, title: "VOD" },
  { category: g.Special, title: "Special" },
  { category: g.Membership, title: "Membership" }
];
function N() {
  return {
    [g.Regular]: [],
    [g.Trial]: [],
    [g.Vod]: [],
    [g.Special]: [],
    [g.Membership]: []
  };
}
function we(t) {
  const l = N();
  for (const a of t)
    l[a.category].push(a);
  for (const { category: a } of U)
    l[a] = l[a].map((r, s) => ({ product: r, index: s })).sort((r, s) => r.product.displayOrder - s.product.displayOrder || r.index - s.index).map(({ product: r }) => r);
  return l;
}
function Ae(t) {
  return U.map(({ category: l }) => ({
    category: l,
    productIds: t[l].map((a) => a.id)
  }));
}
function Me(t) {
  var l, a, r, s, m, n, v;
  return {
    isVisible: t.isVisible,
    customTitle: (l = t.customTitle) != null ? l : "",
    subtitle: (a = t.subtitle) != null ? a : "",
    textPayButton: (r = t.textPayButton) != null ? r : "",
    errorMessageWhenTryingToPurchase: (s = t.errorMessageWhenTryingToPurchase) != null ? s : "",
    popupTitleAfterClickOnBuy: (m = t.popupTitleAfterClickOnBuy) != null ? m : "",
    popupDescriptionAfterClickOnBuy: (n = t.popupDescriptionAfterClickOnBuy) != null ? n : "",
    isMembership: t.isMembership,
    isTrialPackage: t.isTrialPackage,
    isClassPassPackage: t.isClassPassPackage,
    doesItRequireSmsVerification: t.doesItRequireSmsVerification,
    muviEnabled: t.muviEnabled,
    muviNumberOfDays: (v = t.muviNumberOfDays) != null ? v : null
  };
}
function w(t) {
  const l = t.trim();
  return l === "" ? null : l;
}
function xe(t) {
  return {
    isVisible: t.isVisible,
    customTitle: w(t.customTitle),
    subtitle: w(t.subtitle),
    textPayButton: w(t.textPayButton),
    errorMessageWhenTryingToPurchase: w(t.errorMessageWhenTryingToPurchase),
    popupTitleAfterClickOnBuy: w(t.popupTitleAfterClickOnBuy),
    popupDescriptionAfterClickOnBuy: w(t.popupDescriptionAfterClickOnBuy),
    isMembership: t.isMembership,
    isTrialPackage: t.isTrialPackage,
    isClassPassPackage: t.isClassPassPackage,
    doesItRequireSmsVerification: t.doesItRequireSmsVerification,
    muviEnabled: t.muviEnabled,
    muviNumberOfDays: t.muviEnabled ? t.muviNumberOfDays : null
  };
}
function $e(t) {
  return t.muviEnabled && (t.muviNumberOfDays === null || t.muviNumberOfDays < 1) ? "A package that activates VOD needs at least 1 VOD day." : null;
}
function Ee(t) {
  switch (t.__typename) {
    case "AdminProduct":
      return null;
    case "ProductNotFound":
      return "This package no longer exists. Sync the packages and try again.";
    case "InvalidProductVodDaysError":
      return "A package that activates VOD needs at least 1 VOD day.";
  }
}
const p = (t) => (W("data-v-9edbb436"), t = t(), j(), t), Ie = { class: "modal-mask" }, Ne = {
  class: "modal-dialog modal-lg modal-dialog-scrollable",
  role: "document"
}, Be = { class: "modal-content" }, Ue = { class: "modal-header" }, Re = { class: "modal-title" }, qe = ["onSubmit"], Le = { class: "modal-body" }, Fe = { class: "table table-sm align-middle" }, We = /* @__PURE__ */ p(() => /* @__PURE__ */ e("th", null, "Mindbody ID", -1)), je = /* @__PURE__ */ p(() => /* @__PURE__ */ e("th", null, "Mindbody title", -1)), Ge = /* @__PURE__ */ p(() => /* @__PURE__ */ e("th", null, "Mindbody price", -1)), He = { class: "row" }, ze = { class: "col-md-6 mb-3" }, Ke = /* @__PURE__ */ p(() => /* @__PURE__ */ e("label", {
  for: "product-custom-title",
  class: "form-label"
}, "Custom title", -1)), Je = ["placeholder"], Xe = { class: "col-md-6 mb-3" }, Ye = /* @__PURE__ */ p(() => /* @__PURE__ */ e("label", {
  for: "product-subtitle",
  class: "form-label"
}, "Subtitle", -1)), Ze = { class: "col-md-6 mb-3" }, Qe = /* @__PURE__ */ p(() => /* @__PURE__ */ e("label", {
  for: "product-pay-button",
  class: "form-label"
}, "Text inside Pay button", -1)), et = { class: "col-md-6 mb-3" }, tt = /* @__PURE__ */ p(() => /* @__PURE__ */ e("label", {
  for: "product-error-message",
  class: "form-label"
}, " Error message when it's not possible to purchase the package ", -1)), st = { class: "col-md-12 mb-3" }, ot = /* @__PURE__ */ p(() => /* @__PURE__ */ e("label", {
  for: "product-popup-title",
  class: "form-label"
}, " Terms and conditions popup's title ", -1)), at = { class: "col-md-12 mb-3" }, it = /* @__PURE__ */ p(() => /* @__PURE__ */ e("label", {
  for: "product-popup-description",
  class: "form-label"
}, " Terms and conditions displayed in a popup ", -1)), nt = { class: "form-check mb-2" }, lt = /* @__PURE__ */ p(() => /* @__PURE__ */ e("label", {
  class: "form-check-label",
  for: "product-is-visible"
}, " Is visible? (If not checked, it is hidden from the index but still purchasable directly from a link) ", -1)), rt = { class: "form-check mb-2" }, ct = /* @__PURE__ */ p(() => /* @__PURE__ */ e("label", {
  class: "form-check-label",
  for: "product-is-membership"
}, "Is membership?", -1)), dt = { class: "form-check mb-2" }, ut = /* @__PURE__ */ p(() => /* @__PURE__ */ e("label", {
  class: "form-check-label",
  for: "product-is-trial"
}, "Is trial package?", -1)), pt = { class: "form-check mb-2" }, mt = /* @__PURE__ */ p(() => /* @__PURE__ */ e("label", {
  class: "form-check-label",
  for: "product-is-class-pass"
}, " Is ClassPass package? ", -1)), bt = { class: "form-check mb-3" }, ht = /* @__PURE__ */ p(() => /* @__PURE__ */ e("label", {
  class: "form-check-label",
  for: "product-requires-sms"
}, " Does it require SMS authentication? ", -1)), yt = /* @__PURE__ */ p(() => /* @__PURE__ */ e("h6", null, "VOD", -1)), _t = { class: "form-check mb-2" }, vt = /* @__PURE__ */ p(() => /* @__PURE__ */ e("label", {
  class: "form-check-label",
  for: "product-muvi-enabled"
}, " Does it activate VOD for clients? ", -1)), ft = {
  key: 0,
  class: "mb-3 col-md-6"
}, gt = /* @__PURE__ */ p(() => /* @__PURE__ */ e("label", {
  for: "product-muvi-days",
  class: "form-label"
}, " How many VOD days does this package provide? ", -1)), kt = {
  key: 1,
  class: "alert alert-danger mb-0"
}, Pt = { class: "modal-footer" }, Tt = ["disabled"], Ct = {
  key: 0,
  class: "spinner-border spinner-border-sm"
}, Ot = /* @__PURE__ */ B({
  __name: "AdminProductEditModal",
  props: {
    product: {},
    apolloClient: {}
  },
  emits: ["saved", "close"],
  setup(t, { emit: l }) {
    const a = t, r = l, s = Q(Me(a.product)), m = T(!1), n = T(null);
    async function v() {
      if (n.value = $e(s), n.value === null) {
        m.value = !0;
        try {
          const { data: h } = await a.apolloClient.mutate({
            mutation: te,
            variables: { id: a.product.id, input: xe(s) }
          }), o = h == null ? void 0 : h.updateProduct;
          if (!o) {
            n.value = R;
            return;
          }
          if (o.__typename === "AdminProduct") {
            r("saved", o);
            return;
          }
          n.value = Ee(o);
        } catch {
          n.value = R;
        } finally {
          m.value = !1;
        }
      }
    }
    return (h, o) => (u(), b("div", Ie, [
      e("div", Ne, [
        e("div", Be, [
          e("div", Ue, [
            e("h5", Re, "Editing " + f(h.product.name), 1),
            e("button", {
              type: "button",
              class: "btn-close",
              "aria-label": "Close",
              onClick: o[0] || (o[0] = (i) => r("close"))
            })
          ]),
          e("form", {
            onSubmit: ee(v, ["prevent"]),
            autocomplete: "off"
          }, [
            e("div", Le, [
              e("table", Fe, [
                e("tbody", null, [
                  e("tr", null, [
                    We,
                    e("td", null, f(h.product.mindbodyId), 1)
                  ]),
                  e("tr", null, [
                    je,
                    e("td", null, f(h.product.name), 1)
                  ]),
                  e("tr", null, [
                    Ge,
                    e("td", null, "AED " + f(Math.round(h.product.price)), 1)
                  ])
                ])
              ]),
              e("div", He, [
                e("div", ze, [
                  Ke,
                  _(e("input", {
                    id: "product-custom-title",
                    "onUpdate:modelValue": o[1] || (o[1] = (i) => s.customTitle = i),
                    class: "form-control",
                    type: "text",
                    placeholder: h.product.name
                  }, null, 8, Je), [
                    [O, s.customTitle]
                  ])
                ]),
                e("div", Xe, [
                  Ye,
                  _(e("input", {
                    id: "product-subtitle",
                    "onUpdate:modelValue": o[2] || (o[2] = (i) => s.subtitle = i),
                    class: "form-control"
                  }, null, 512), [
                    [O, s.subtitle]
                  ])
                ]),
                e("div", Ze, [
                  Qe,
                  _(e("input", {
                    id: "product-pay-button",
                    "onUpdate:modelValue": o[3] || (o[3] = (i) => s.textPayButton = i),
                    class: "form-control"
                  }, null, 512), [
                    [O, s.textPayButton]
                  ])
                ]),
                e("div", et, [
                  tt,
                  _(e("input", {
                    id: "product-error-message",
                    "onUpdate:modelValue": o[4] || (o[4] = (i) => s.errorMessageWhenTryingToPurchase = i),
                    class: "form-control"
                  }, null, 512), [
                    [O, s.errorMessageWhenTryingToPurchase]
                  ])
                ]),
                e("div", st, [
                  ot,
                  _(e("input", {
                    id: "product-popup-title",
                    "onUpdate:modelValue": o[5] || (o[5] = (i) => s.popupTitleAfterClickOnBuy = i),
                    class: "form-control"
                  }, null, 512), [
                    [O, s.popupTitleAfterClickOnBuy]
                  ])
                ]),
                e("div", at, [
                  it,
                  _(e("textarea", {
                    id: "product-popup-description",
                    "onUpdate:modelValue": o[6] || (o[6] = (i) => s.popupDescriptionAfterClickOnBuy = i),
                    class: "form-control",
                    rows: "4"
                  }, null, 512), [
                    [O, s.popupDescriptionAfterClickOnBuy]
                  ])
                ])
              ]),
              e("div", nt, [
                _(e("input", {
                  id: "product-is-visible",
                  "onUpdate:modelValue": o[7] || (o[7] = (i) => s.isVisible = i),
                  class: "form-check-input",
                  type: "checkbox"
                }, null, 512), [
                  [S, s.isVisible]
                ]),
                lt
              ]),
              e("div", rt, [
                _(e("input", {
                  id: "product-is-membership",
                  "onUpdate:modelValue": o[8] || (o[8] = (i) => s.isMembership = i),
                  class: "form-check-input",
                  type: "checkbox"
                }, null, 512), [
                  [S, s.isMembership]
                ]),
                ct
              ]),
              e("div", dt, [
                _(e("input", {
                  id: "product-is-trial",
                  "onUpdate:modelValue": o[9] || (o[9] = (i) => s.isTrialPackage = i),
                  class: "form-check-input",
                  type: "checkbox"
                }, null, 512), [
                  [S, s.isTrialPackage]
                ]),
                ut
              ]),
              e("div", pt, [
                _(e("input", {
                  id: "product-is-class-pass",
                  "onUpdate:modelValue": o[10] || (o[10] = (i) => s.isClassPassPackage = i),
                  class: "form-check-input",
                  type: "checkbox"
                }, null, 512), [
                  [S, s.isClassPassPackage]
                ]),
                mt
              ]),
              e("div", bt, [
                _(e("input", {
                  id: "product-requires-sms",
                  "onUpdate:modelValue": o[11] || (o[11] = (i) => s.doesItRequireSmsVerification = i),
                  class: "form-check-input",
                  type: "checkbox"
                }, null, 512), [
                  [S, s.doesItRequireSmsVerification]
                ]),
                ht
              ]),
              yt,
              e("div", _t, [
                _(e("input", {
                  id: "product-muvi-enabled",
                  "onUpdate:modelValue": o[12] || (o[12] = (i) => s.muviEnabled = i),
                  class: "form-check-input",
                  type: "checkbox"
                }, null, 512), [
                  [S, s.muviEnabled]
                ]),
                vt
              ]),
              s.muviEnabled ? (u(), b("div", ft, [
                gt,
                _(e("input", {
                  id: "product-muvi-days",
                  "onUpdate:modelValue": o[13] || (o[13] = (i) => s.muviNumberOfDays = i),
                  class: "form-control",
                  type: "number",
                  min: "1"
                }, null, 512), [
                  [
                    O,
                    s.muviNumberOfDays,
                    void 0,
                    { number: !0 }
                  ]
                ])
              ])) : k("", !0),
              n.value ? (u(), b("div", kt, f(n.value), 1)) : k("", !0)
            ]),
            e("div", Pt, [
              e("button", {
                type: "button",
                class: "btn btn-secondary",
                onClick: o[14] || (o[14] = (i) => r("close"))
              }, "Cancel"),
              e("button", {
                type: "submit",
                class: "btn btn-success",
                disabled: m.value
              }, [
                I(" Update "),
                m.value ? (u(), b("span", Ct)) : k("", !0)
              ], 8, Tt)
            ])
          ], 40, qe)
        ])
      ])
    ]));
  }
});
const Vt = /* @__PURE__ */ G(Ot, [["__scopeId", "data-v-9edbb436"]]), Dt = (t, l) => {
  const a = T(N()), r = T(!1), s = T(!1), m = T(!1), n = T(!1);
  function v(d) {
    a.value = we(d);
  }
  async function h() {
    r.value = !0, s.value = !1;
    try {
      const { data: d } = await t.query({
        query: se,
        variables: { site: l.value },
        fetchPolicy: "network-only"
      });
      v(d.adminProducts);
    } catch {
      a.value = N(), s.value = !0;
    } finally {
      r.value = !1;
    }
  }
  function o(d, c) {
    a.value = { ...a.value, [d]: c };
  }
  function i(d) {
    const c = { ...a.value };
    for (const x of Object.keys(c))
      c[x] = c[x].map(
        ($) => $.id === d.id ? d : $
      );
    a.value = c;
  }
  async function A() {
    m.value = !0;
    try {
      const { data: d } = await t.mutate({
        mutation: oe,
        variables: {
          site: l.value,
          input: Ae(a.value)
        }
      }), c = d == null ? void 0 : d.updateProductsOrder;
      return (c == null ? void 0 : c.__typename) === "AdminProductList" ? (v(c.products), "saved") : (c == null ? void 0 : c.__typename) === "ProductNotFound" ? "not_found" : "error";
    } catch {
      return "error";
    } finally {
      m.value = !1;
    }
  }
  async function M() {
    var d;
    n.value = !0;
    try {
      const { data: c } = await t.mutate({
        mutation: ae,
        variables: { site: l.value }
      });
      return v((d = c == null ? void 0 : c.syncProducts) != null ? d : []), !0;
    } catch {
      return !1;
    } finally {
      n.value = !1;
    }
  }
  return {
    groups: a,
    isLoading: r,
    hasLoadError: s,
    isSavingOrder: m,
    isSyncing: n,
    fetchProducts: h,
    setCategory: o,
    replaceProduct: i,
    saveOrder: A,
    sync: M
  };
}, St = { class: "d-flex justify-content-between align-items-center mb-3" }, wt = { class: "mb-0" }, At = ["disabled"], Mt = {
  key: 0,
  class: "spinner-border spinner-border-sm"
}, xt = ["disabled"], $t = {
  key: 0,
  class: "spinner-border spinner-border-sm"
}, Et = /* @__PURE__ */ e("div", { class: "alert alert-info" }, ' Drag & drop packages between the sections and set their order, then click "Save order". This only sets how packages are displayed on the main page; it does not change how they behave. ', -1), It = {
  key: 0,
  class: "text-center py-4"
}, Nt = {
  key: 1,
  class: "alert alert-danger"
}, Bt = {
  key: 2,
  class: "row"
}, Ut = { class: "col-lg-8" }, qt = /* @__PURE__ */ B({
  __name: "AdminProductListView",
  setup(t) {
    const l = ie(), a = ne(), r = le("https://payments.crank-fit.com/api/graphql/"), { sites: s, fetchSites: m } = re(r), n = q(() => l.params.site), v = q(
      () => {
        var P, C;
        return (C = (P = s.value.find((D) => D.code === n.value)) == null ? void 0 : P.name) != null ? C : n.value;
      }
    ), {
      groups: h,
      isLoading: o,
      hasLoadError: i,
      isSavingOrder: A,
      isSyncing: M,
      fetchProducts: d,
      setCategory: c,
      replaceProduct: x,
      saveOrder: $,
      sync: H
    } = Dt(r, n), V = T(null);
    async function z() {
      const P = await $();
      P === "saved" ? a.success("Packages order updated.") : P === "not_found" ? a.error("A package in the list no longer exists. Nothing was changed; reload and retry.") : a.error("The packages order could not be saved.");
    }
    async function K() {
      await H() ? a.success("Packages synchronized with Mindbody.") : a.error("The packages could not be synchronized with Mindbody.");
    }
    function J(P) {
      x(P), V.value = null, a.success(`${P.name} updated.`);
    }
    return ce(n, d), de(() => {
      m(), d();
    }), (P, C) => (u(), b("div", null, [
      e("div", St, [
        e("h4", wt, "Packages " + f(v.value), 1),
        e("div", null, [
          e("button", {
            type: "button",
            class: "btn btn-primary me-2",
            disabled: y(M) || y(o),
            onClick: K
          }, [
            I(" Sync with Mindbody "),
            y(M) ? (u(), b("span", Mt)) : k("", !0)
          ], 8, At),
          e("button", {
            type: "button",
            class: "btn btn-success",
            disabled: y(A) || y(o) || y(i),
            onClick: z
          }, [
            I(" Save order "),
            y(A) ? (u(), b("span", $t)) : k("", !0)
          ], 8, xt)
        ])
      ]),
      Et,
      y(o) ? (u(), b("div", It, [
        F(me, { text: "LOADING..." })
      ])) : y(i) ? (u(), b("div", Nt, "Failed to load the packages.")) : (u(), b("div", Bt, [
        e("div", Ut, [
          (u(!0), b(ue, null, pe(y(U), ({ category: D, title: X }) => (u(), L(Se, {
            key: D,
            title: X,
            products: y(h)[D],
            "group-name": "admin-products",
            "onUpdate:products": (E) => y(c)(D, E),
            onEdit: C[0] || (C[0] = (E) => V.value = E)
          }, null, 8, ["title", "products", "onUpdate:products"]))), 128))
        ])
      ])),
      V.value ? (u(), L(Vt, {
        key: V.value.id,
        product: V.value,
        "apollo-client": y(r),
        onSaved: J,
        onClose: C[1] || (C[1] = (D) => V.value = null)
      }, null, 8, ["product", "apollo-client"])) : k("", !0)
    ]));
  }
});
export {
  qt as default
};
