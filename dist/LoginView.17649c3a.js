import { d as w, r as u, a as S, S as r, c as x, u as V, b as o, e, w as $, f as _, v as q, g as c, F as m, h as p, i as D, j as L, k as I, o as a, t as f, _ as M, p as T, l as A, m as v, n as h, q as B, s as E, x as N, y as j } from "./index.7307d7ac.js";
const C = (i) => (T("data-v-136f860c"), i = i(), A(), i), F = { class: "d-flex justify-content-center h-100" }, U = { class: "card" }, z = { class: "card-body mt-5" }, G = ["onSubmit"], H = { class: "form-row" }, J = { class: "col-md-12 mb-3" }, K = ["value"], O = ["value"], P = { class: "form-row" }, Q = { class: "col-md-12 mb-3" }, R = /* @__PURE__ */ C(() => /* @__PURE__ */ e("label", {
  for: "token",
  class: "input-label"
}, "Token *", -1)), W = {
  key: 0,
  class: "form-text",
  style: { color: "red" }
}, X = { class: "row" }, Y = { class: "col-md-12 mb-3" }, Z = /* @__PURE__ */ w({
  __name: "LoginView",
  setup(i) {
    const d = u(!1), b = u("dubai"), t = S({
      location: r.Dubai,
      token: ""
    }), k = x(() => ({
      location: {
        required: v.withMessage("Location is required", h)
      },
      token: {
        required: v.withMessage("Token is required", h)
      }
    })), l = V(k, t);
    async function y() {
      await l.value.$validate() && (d.value = !1, B().setSession(t.token), E().setSite(b.value), await N.push({ name: "home" }));
    }
    return (g, n) => (a(), o("div", F, [
      e("div", U, [
        e("div", z, [
          e("form", {
            onSubmit: $(y, ["prevent"]),
            autocomplete: "off"
          }, [
            e("div", H, [
              e("div", J, [
                _(e("select", {
                  class: "custom-select",
                  "onUpdate:modelValue": n[0] || (n[0] = (s) => t.location = s),
                  required: ""
                }, [
                  e("option", {
                    value: c(r).Dubai
                  }, "Dubai", 8, K),
                  e("option", {
                    value: c(r).AbuDhabi
                  }, "Abu Dhabi", 8, O)
                ], 512), [
                  [q, t.location]
                ]),
                (a(!0), o(m, null, p(c(l).location.$errors, (s) => (a(), o("small", {
                  key: s.$uid,
                  class: "form-text",
                  style: { color: "red" }
                }, f(s.$message), 1))), 128))
              ])
            ]),
            e("div", P, [
              e("div", Q, [
                R,
                _(e("textarea", {
                  type: "text",
                  "onUpdate:modelValue": n[1] || (n[1] = (s) => t.token = s),
                  class: "form-control",
                  id: "token",
                  rows: "6",
                  placeholder: "Token",
                  required: ""
                }, null, 512), [
                  [D, t.token]
                ]),
                (a(!0), o(m, null, p(c(l).token.$errors, (s) => (a(), o("small", {
                  key: s.$uid,
                  class: "form-text",
                  style: { color: "red" }
                }, f(s.$message), 1))), 128))
              ])
            ]),
            d.value ? (a(), o("small", W, " Incorrect Login ")) : L("", !0),
            e("div", X, [
              e("div", Y, [
                I(M, {
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
const se = /* @__PURE__ */ j(Z, [["__scopeId", "data-v-136f860c"]]);
export {
  se as default
};
