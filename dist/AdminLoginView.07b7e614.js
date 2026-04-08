import { d as f, z as w, r as u, a as y, b as n, e, w as g, f as m, i as _, t as x, j as k, A as S, o as d, p as A, l as V, B as h, q as I, C as q, y as C } from "./index.cc2eb486.js";
const l = (r) => (A("data-v-ab98da42"), r = r(), V(), r), E = { class: "login-container d-flex align-items-center justify-content-center min-vh-100" }, B = {
  class: "card shadow-sm",
  style: { width: "100%", "max-width": "400px" }
}, L = { class: "card-body p-4" }, N = /* @__PURE__ */ l(() => /* @__PURE__ */ e("h4", { class: "card-title text-center mb-4" }, "CRANK Admin", -1)), R = ["onSubmit"], T = { class: "form-group mb-3" }, D = /* @__PURE__ */ l(() => /* @__PURE__ */ e("label", {
  for: "email",
  class: "form-label"
}, "Email", -1)), P = ["disabled"], U = { class: "form-group mb-3" }, j = /* @__PURE__ */ l(() => /* @__PURE__ */ e("label", {
  for: "password",
  class: "form-label"
}, "Password", -1)), M = ["disabled"], z = {
  key: 0,
  class: "alert alert-danger py-2 mb-3",
  role: "alert"
}, K = ["disabled"], $ = { key: 0 }, F = /* @__PURE__ */ l(() => /* @__PURE__ */ e("span", {
  class: "spinner-border spinner-border-sm",
  role: "status",
  "aria-hidden": "true"
}, null, -1)), G = { key: 1 }, H = /* @__PURE__ */ f({
  __name: "AdminLoginView",
  setup(r) {
    const p = w(), t = u(!1), o = u(""), a = y({
      email: "",
      password: ""
    });
    async function b() {
      var c;
      if (!a.email || !a.password) {
        o.value = "Email and password are required";
        return;
      }
      t.value = !0, o.value = "";
      try {
        const s = "https://payments.crank-fit.com/api/", i = await h.post(
          `${s}admin_login_check`,
          {
            email: a.email,
            password: a.password
          },
          { withCredentials: !0 }
        );
        I().setSession(i.data.token), q.startRefreshTokenTimer();
        const v = p.currentRoute.value.query.redirect;
        await p.push(v || { name: "admin_dashboard" });
      } catch (s) {
        h.isAxiosError(s) && ((c = s.response) == null ? void 0 : c.status) === 401 ? o.value = "Invalid email or password" : o.value = "An error occurred. Please try again.";
      } finally {
        t.value = !1;
      }
    }
    return (c, s) => (d(), n("div", E, [
      e("div", B, [
        e("div", L, [
          N,
          e("form", {
            onSubmit: g(b, ["prevent"]),
            autocomplete: "on"
          }, [
            e("div", T, [
              D,
              m(e("input", {
                type: "email",
                "onUpdate:modelValue": s[0] || (s[0] = (i) => a.email = i),
                class: "form-control",
                id: "email",
                placeholder: "admin@example.com",
                autocomplete: "email",
                required: "",
                disabled: t.value
              }, null, 8, P), [
                [_, a.email]
              ])
            ]),
            e("div", U, [
              j,
              m(e("input", {
                type: "password",
                "onUpdate:modelValue": s[1] || (s[1] = (i) => a.password = i),
                class: "form-control",
                id: "password",
                placeholder: "Password",
                autocomplete: "current-password",
                required: "",
                disabled: t.value
              }, null, 8, M), [
                [_, a.password]
              ])
            ]),
            o.value ? (d(), n("div", z, x(o.value), 1)) : k("", !0),
            e("button", {
              type: "submit",
              class: "btn btn-dark btn-block w-100",
              disabled: t.value
            }, [
              t.value ? (d(), n("span", $, [
                F,
                S(" Signing in... ")
              ])) : (d(), n("span", G, "Sign In"))
            ], 8, K)
          ], 40, R)
        ])
      ])
    ]));
  }
});
const O = /* @__PURE__ */ C(H, [["__scopeId", "data-v-ab98da42"]]);
export {
  O as default
};
