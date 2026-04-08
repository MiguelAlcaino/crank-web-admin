import { d as S, r as u, a as g, S as r, c as x, u as V, b as t, e, w as q, f as _, v as $, g as i, F as m, h as p, i as D, j as L, k as T, o as a, t as f, _ as I, p as M, l as A, m as v, n as h, q as B, s as E, x as N, y as j } from "./index.00e85111.js";
const C = (n) => (M("data-v-8f4056b4"), n = n(), A(), n), F = { class: "d-flex justify-content-center h-100" }, U = { class: "card" }, z = { class: "card-body mt-5" }, G = ["onSubmit"], H = { class: "form-row" }, J = { class: "col-md-12 mb-3" }, K = ["value"], O = ["value"], P = ["value"], Q = { class: "form-row" }, R = { class: "col-md-12 mb-3" }, W = /* @__PURE__ */ C(() => /* @__PURE__ */ e("label", {
  for: "token",
  class: "input-label"
}, "Token *", -1)), X = {
  key: 0,
  class: "form-text",
  style: { color: "red" }
}, Y = { class: "row" }, Z = { class: "col-md-12 mb-3" }, ee = /* @__PURE__ */ S({
  __name: "LoginView",
  setup(n) {
    const d = u(!1), b = u("dubai"), o = g({
      location: r.Dubai,
      token: ""
    }), k = x(() => ({
      location: {
        required: v.withMessage("Location is required", h)
      },
      token: {
        required: v.withMessage("Token is required", h)
      }
    })), c = V(k, o);
    async function w() {
      await c.value.$validate() && (d.value = !1, B().setSession(o.token), E().setSite(b.value), await N.push({ name: "home" }));
    }
    return (y, l) => (a(), t("div", F, [
      e("div", U, [
        e("div", z, [
          e("form", {
            onSubmit: q(w, ["prevent"]),
            autocomplete: "off"
          }, [
            e("div", H, [
              e("div", J, [
                _(e("select", {
                  class: "form-select",
                  "onUpdate:modelValue": l[0] || (l[0] = (s) => o.location = s),
                  required: ""
                }, [
                  e("option", {
                    value: i(r).Dubai
                  }, "Dubai", 8, K),
                  e("option", {
                    value: i(r).AbuDhabi
                  }, "Abu Dhabi", 8, O),
                  e("option", {
                    value: i(r).TownSquare
                  }, "Town Square", 8, P)
                ], 512), [
                  [$, o.location]
                ]),
                (a(!0), t(m, null, p(i(c).location.$errors, (s) => (a(), t("small", {
                  key: s.$uid,
                  class: "form-text",
                  style: { color: "red" }
                }, f(s.$message), 1))), 128))
              ])
            ]),
            e("div", Q, [
              e("div", R, [
                W,
                _(e("textarea", {
                  type: "text",
                  "onUpdate:modelValue": l[1] || (l[1] = (s) => o.token = s),
                  class: "form-control",
                  id: "token",
                  rows: "6",
                  placeholder: "Token",
                  required: ""
                }, null, 512), [
                  [D, o.token]
                ]),
                (a(!0), t(m, null, p(i(c).token.$errors, (s) => (a(), t("small", {
                  key: s.$uid,
                  class: "form-text",
                  style: { color: "red" }
                }, f(s.$message), 1))), 128))
              ])
            ]),
            d.value ? (a(), t("small", X, " Incorrect Login ")) : L("", !0),
            e("div", Y, [
              e("div", Z, [
                T(I, {
                  class: "",
                  type: "submit",
                  text: "Login"
                })
              ])
            ])
          ], 40, G)
        ])
      ])
    ]));
  }
});
const oe = /* @__PURE__ */ j(ee, [["__scopeId", "data-v-8f4056b4"]]);
export {
  oe as default
};
