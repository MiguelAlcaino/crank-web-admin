import { d as x, r as _, a as D, S as d, c as V, u as $, o, b as a, e, w as q, f as m, v as L, g as l, F as p, h as f, i as I, j as M, k as C, _ as T, t as v, p as j, l as A, m as h, n as b, q as B, s as k, x as E, y as N, z as F } from "./index.10f02e24.js";
const O = (i) => (j("data-v-7e0c0326"), i = i(), A(), i), U = { class: "d-flex justify-content-center h-100" }, z = { class: "card" }, G = { class: "card-body mt-5" }, H = ["onSubmit"], J = { class: "form-row" }, K = { class: "col-md-12 mb-3" }, P = ["value"], Q = ["value"], R = { class: "form-row" }, W = { class: "col-md-12 mb-3" }, X = /* @__PURE__ */ O(() => /* @__PURE__ */ e("label", {
  for: "token",
  class: "input-label"
}, "Token *", -1)), Y = {
  key: 0,
  class: "form-text",
  style: { color: "red" }
}, Z = { class: "row" }, ee = { class: "col-md-12 mb-3" }, se = /* @__PURE__ */ x({
  __name: "LoginView",
  setup(i) {
    const u = _(!1), w = _("dubai"), t = D({
      location: d.Dubai,
      token: ""
    }), y = V(() => ({
      location: {
        required: h.withMessage("Location is required", b)
      },
      token: {
        required: h.withMessage("Token is required", b)
      }
    })), r = $(y, t);
    async function g() {
      await r.value.$validate() && (u.value = !1, S(), B().setSession(t.token), k().setSite(w.value), await E.push({ name: "admin_calendar_class" }));
    }
    function S() {
      const n = N();
      k().setCalendarDates(n.startOf("week").toDate(), n.endOf("week").toDate());
    }
    return (n, c) => (o(), a("div", U, [
      e("div", z, [
        e("div", G, [
          e("form", {
            onSubmit: q(g, ["prevent"]),
            autocomplete: "off"
          }, [
            e("div", J, [
              e("div", K, [
                m(e("select", {
                  class: "custom-select",
                  "onUpdate:modelValue": c[0] || (c[0] = (s) => t.location = s),
                  required: ""
                }, [
                  e("option", {
                    value: l(d).Dubai
                  }, "Dubai", 8, P),
                  e("option", {
                    value: l(d).AbuDhabi
                  }, "Abu Dhabi", 8, Q)
                ], 512), [
                  [L, t.location]
                ]),
                (o(!0), a(p, null, f(l(r).location.$errors, (s) => (o(), a("small", {
                  key: s.$uid,
                  class: "form-text",
                  style: { color: "red" }
                }, v(s.$message), 1))), 128))
              ])
            ]),
            e("div", R, [
              e("div", W, [
                X,
                m(e("textarea", {
                  type: "text",
                  "onUpdate:modelValue": c[1] || (c[1] = (s) => t.token = s),
                  class: "form-control",
                  id: "token",
                  rows: "6",
                  placeholder: "Token",
                  required: ""
                }, null, 512), [
                  [I, t.token]
                ]),
                (o(!0), a(p, null, f(l(r).token.$errors, (s) => (o(), a("small", {
                  key: s.$uid,
                  class: "form-text",
                  style: { color: "red" }
                }, v(s.$message), 1))), 128))
              ])
            ]),
            u.value ? (o(), a("small", Y, " Incorrect Login ")) : M("", !0),
            e("div", Z, [
              e("div", ee, [
                C(T, {
                  class: "btn-block",
                  type: "submit",
                  text: "Login"
                })
              ])
            ])
          ], 40, H)
        ])
      ])
    ]));
  }
});
const oe = /* @__PURE__ */ F(se, [["__scopeId", "data-v-7e0c0326"]]);
export {
  oe as default
};
