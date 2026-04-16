import { d as g, z as y, r as _, a as k, b as n, e, A as x, g as u, w as S, f as h, i as f, t as A, j as V, B as C, o as l, p as D, l as I, C as b, q as T, D as q, y as E } from "./index.91bc4b84.js";
import { u as L } from "./themeStore.5ca92fba.js";
const d = (r) => (D("data-v-02f8e1ac"), r = r(), I(), r), B = { class: "login-container d-flex align-items-center justify-content-center min-vh-100 position-relative" }, M = ["title"], N = {
  class: "card shadow-sm",
  style: { width: "100%", "max-width": "400px" }
}, R = { class: "card-body p-4" }, U = /* @__PURE__ */ d(() => /* @__PURE__ */ e("h4", { class: "card-title text-center mb-4" }, "CRANK Admin", -1)), P = ["onSubmit"], j = { class: "mb-3" }, z = /* @__PURE__ */ d(() => /* @__PURE__ */ e("label", {
  for: "email",
  class: "form-label"
}, "Email / Username", -1)), $ = ["disabled"], K = { class: "mb-3" }, F = /* @__PURE__ */ d(() => /* @__PURE__ */ e("label", {
  for: "password",
  class: "form-label"
}, "Password", -1)), G = ["disabled"], H = {
  key: 0,
  class: "alert alert-danger py-2 mb-3",
  role: "alert"
}, J = ["disabled"], O = { key: 0 }, Q = /* @__PURE__ */ d(() => /* @__PURE__ */ e("span", {
  class: "spinner-border spinner-border-sm",
  role: "status",
  "aria-hidden": "true"
}, null, -1)), W = { key: 1 }, X = /* @__PURE__ */ g({
  __name: "AdminLoginView",
  setup(r) {
    const c = L(), p = y(), a = _(!1), o = _(""), t = k({
      email: "",
      password: ""
    });
    async function v() {
      var m;
      if (!t.email || !t.password) {
        o.value = "Email and password are required";
        return;
      }
      a.value = !0, o.value = "";
      try {
        const s = "https://payments.crank-fit.com/api/", i = await b.post(
          `${s}admin_login_check`,
          {
            email: t.email,
            password: t.password
          },
          { withCredentials: !0 }
        );
        T().setSession(i.data.token), q.startRefreshTokenTimer();
        const w = p.currentRoute.value.query.redirect;
        await p.push(w || { name: "admin_dashboard" });
      } catch (s) {
        b.isAxiosError(s) && ((m = s.response) == null ? void 0 : m.status) === 401 ? o.value = "Invalid email or password" : o.value = "An error occurred. Please try again.";
      } finally {
        a.value = !1;
      }
    }
    return (m, s) => (l(), n("div", B, [
      e("button", {
        class: "btn btn-link theme-toggle",
        onClick: s[0] || (s[0] = (i) => u(c).toggleTheme()),
        title: u(c).isDark ? "Light Mode" : "Dark Mode"
      }, [
        e("i", {
          class: x(u(c).isDark ? "bi bi-sun-fill" : "bi bi-moon-stars-fill")
        }, null, 2)
      ], 8, M),
      e("div", N, [
        e("div", R, [
          U,
          e("form", {
            onSubmit: S(v, ["prevent"]),
            autocomplete: "on"
          }, [
            e("div", j, [
              z,
              h(e("input", {
                type: "text",
                "onUpdate:modelValue": s[1] || (s[1] = (i) => t.email = i),
                class: "form-control",
                id: "email",
                placeholder: "admin@example.com",
                autocomplete: "email",
                required: "",
                disabled: a.value
              }, null, 8, $), [
                [f, t.email]
              ])
            ]),
            e("div", K, [
              F,
              h(e("input", {
                type: "password",
                "onUpdate:modelValue": s[2] || (s[2] = (i) => t.password = i),
                class: "form-control",
                id: "password",
                placeholder: "Password",
                autocomplete: "current-password",
                required: "",
                disabled: a.value
              }, null, 8, G), [
                [f, t.password]
              ])
            ]),
            o.value ? (l(), n("div", H, A(o.value), 1)) : V("", !0),
            e("button", {
              type: "submit",
              class: "btn btn-dark w-100",
              disabled: a.value
            }, [
              a.value ? (l(), n("span", O, [
                Q,
                C(" Signing in... ")
              ])) : (l(), n("span", W, "Sign In"))
            ], 8, J)
          ], 40, P)
        ])
      ])
    ]));
  }
});
const ee = /* @__PURE__ */ E(X, [["__scopeId", "data-v-02f8e1ac"]]);
export {
  ee as default
};
