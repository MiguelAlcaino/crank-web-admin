import { d as S, r as u, a as g, S as c, c as x, u as V, b as t, e, w as q, f as _, v as $, g as i, F as m, h as p, i as D, j as L, k as T, o as a, t as v, _ as I, p as M, l as A, m as f, n as h, q as B, s as E, x as N, y as j } from "./index.e56a8a6d.js";
const C = (n) => (M("data-v-d77866c5"), n = n(), A(), n), F = { class: "d-flex justify-content-center h-100" }, U = { class: "card" }, z = { class: "card-body mt-5" }, G = ["onSubmit"], H = { class: "form-row" }, J = { class: "col-md-12 mb-3" }, K = ["value"], O = ["value"], P = ["value"], Q = { class: "form-row" }, R = { class: "col-md-12 mb-3" }, W = /* @__PURE__ */ C(() => /* @__PURE__ */ e("label", {
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
      location: c.Dubai,
      token: ""
    }), k = x(() => ({
      location: {
        required: f.withMessage("Location is required", h)
      },
      token: {
        required: f.withMessage("Token is required", h)
      }
    })), r = V(k, o);
    async function w() {
      await r.value.$validate() && (d.value = !1, B().setSession(o.token), E().setSite(b.value), await N.push({ name: "home" }));
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
                  class: "custom-select",
                  "onUpdate:modelValue": l[0] || (l[0] = (s) => o.location = s),
                  required: ""
                }, [
                  e("option", {
                    value: i(c).Dubai
                  }, "Dubai", 8, K),
                  e("option", {
                    value: i(c).AbuDhabi
                  }, "Abu Dhabi", 8, O),
                  e("option", {
                    value: i(c).TownSquare
                  }, "Town Square", 8, P)
                ], 512), [
                  [$, o.location]
                ]),
                (a(!0), t(m, null, p(i(r).location.$errors, (s) => (a(), t("small", {
                  key: s.$uid,
                  class: "form-text",
                  style: { color: "red" }
                }, v(s.$message), 1))), 128))
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
                (a(!0), t(m, null, p(i(r).token.$errors, (s) => (a(), t("small", {
                  key: s.$uid,
                  class: "form-text",
                  style: { color: "red" }
                }, v(s.$message), 1))), 128))
              ])
            ]),
            d.value ? (a(), t("small", X, " Incorrect Login ")) : L("", !0),
            e("div", Y, [
              e("div", Z, [
                T(I, {
                  class: "btn-block",
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
const oe = /* @__PURE__ */ j(ee, [["__scopeId", "data-v-d77866c5"]]);
export {
  oe as default
};
