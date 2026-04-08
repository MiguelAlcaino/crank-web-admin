import { d as v, z as w, r as u, a as f, b as n, e, w as y, f as m, i as _, t as g, j as x, A as S, o as d, p as k, l as A, B as b, q as V, C as I, y as q } from "./index.13471187.js";
const l = (r) => (k("data-v-5acc1bb8"), r = r(), A(), r), C = { class: "login-container d-flex align-items-center justify-content-center min-vh-100" }, E = {
  class: "card shadow-sm",
  style: { width: "100%", "max-width": "400px" }
}, B = { class: "card-body p-4" }, L = /* @__PURE__ */ l(() => /* @__PURE__ */ e("h4", { class: "card-title text-center mb-4" }, "CRANK Admin", -1)), N = ["onSubmit"], R = { class: "form-group mb-3" }, T = /* @__PURE__ */ l(() => /* @__PURE__ */ e("label", {
  for: "email",
  class: "form-label"
}, "Email", -1)), D = ["disabled"], P = { class: "form-group mb-3" }, j = /* @__PURE__ */ l(() => /* @__PURE__ */ e("label", {
  for: "password",
  class: "form-label"
}, "Password", -1)), M = ["disabled"], U = {
  key: 0,
  class: "alert alert-danger py-2 mb-3",
  role: "alert"
}, z = ["disabled"], K = { key: 0 }, F = /* @__PURE__ */ l(() => /* @__PURE__ */ e("span", {
  class: "spinner-border spinner-border-sm",
  role: "status",
  "aria-hidden": "true"
}, null, -1)), G = { key: 1 }, H = /* @__PURE__ */ v({
  __name: "AdminLoginView",
  setup(r) {
    const p = w(), o = u(!1), t = u(""), a = f({
      email: "",
      password: ""
    });
    async function h() {
      var c;
      if (!a.email || !a.password) {
        t.value = "Email and password are required";
        return;
      }
      o.value = !0, t.value = "";
      try {
        const s = await b.post(
          "/api/admin_login_check",
          {
            email: a.email,
            password: a.password
          },
          { withCredentials: !0 }
        );
        V().setSession(s.data.token), I.startRefreshTokenTimer();
        const i = p.currentRoute.value.query.redirect;
        await p.push(i || { name: "admin_dashboard" });
      } catch (s) {
        b.isAxiosError(s) && ((c = s.response) == null ? void 0 : c.status) === 401 ? t.value = "Invalid email or password" : t.value = "An error occurred. Please try again.";
      } finally {
        o.value = !1;
      }
    }
    return (c, s) => (d(), n("div", C, [
      e("div", E, [
        e("div", B, [
          L,
          e("form", {
            onSubmit: y(h, ["prevent"]),
            autocomplete: "on"
          }, [
            e("div", R, [
              T,
              m(e("input", {
                type: "email",
                "onUpdate:modelValue": s[0] || (s[0] = (i) => a.email = i),
                class: "form-control",
                id: "email",
                placeholder: "admin@example.com",
                autocomplete: "email",
                required: "",
                disabled: o.value
              }, null, 8, D), [
                [_, a.email]
              ])
            ]),
            e("div", P, [
              j,
              m(e("input", {
                type: "password",
                "onUpdate:modelValue": s[1] || (s[1] = (i) => a.password = i),
                class: "form-control",
                id: "password",
                placeholder: "Password",
                autocomplete: "current-password",
                required: "",
                disabled: o.value
              }, null, 8, M), [
                [_, a.password]
              ])
            ]),
            t.value ? (d(), n("div", U, g(t.value), 1)) : x("", !0),
            e("button", {
              type: "submit",
              class: "btn btn-dark btn-block w-100",
              disabled: o.value
            }, [
              o.value ? (d(), n("span", K, [
                F,
                S(" Signing in... ")
              ])) : (d(), n("span", G, "Sign In"))
            ], 8, z)
          ], 40, N)
        ])
      ])
    ]));
  }
});
const O = /* @__PURE__ */ q(H, [["__scopeId", "data-v-5acc1bb8"]]);
export {
  O as default
};
