import { d as L, V as k, I as f, r as _, s as x, b as s, e as t, k as E, g as r, _ as g, F as u, h as A, j as d, o, x as h, t as C } from "./index.e45f3cea.js";
const N = /* @__PURE__ */ t("h1", null, "Room Layouts", -1), D = { class: "row" }, V = { class: "col-12 text-right" }, w = /* @__PURE__ */ t("br", null, null, -1), B = { class: "row" }, I = { class: "col-12" }, O = { class: "table" }, R = /* @__PURE__ */ t("thead", null, [
  /* @__PURE__ */ t("tr", null, [
    /* @__PURE__ */ t("th", { class: "text-center" }, "ROOM NAME"),
    /* @__PURE__ */ t("th", { class: "text-center" }, "EDIT"),
    /* @__PURE__ */ t("th", { class: "text-center" }, "DELETE")
  ])
], -1), T = ["index"], S = { class: "text-center" }, $ = ["onClick"], M = /* @__PURE__ */ t("i", { class: "bi bi-pencil-fill" }, null, -1), j = [
  M
], F = { class: "text-center" }, q = ["onClick"], G = /* @__PURE__ */ t("i", { class: "bi bi-trash3-fill" }, null, -1), z = [
  G
], H = { key: 0 }, J = /* @__PURE__ */ t("td", {
  colspan: "3",
  class: "text-center"
}, [
  /* @__PURE__ */ t("p", null, "NO DATA AVAILABLE IN TABLE")
], -1), K = [
  J
], P = { key: 1 }, Q = /* @__PURE__ */ t("td", {
  colspan: "3",
  class: "text-center"
}, "LOADING...", -1), U = [
  Q
], Y = /* @__PURE__ */ L({
  __name: "RoomLayoutListView",
  setup(W) {
    const p = k("gqlApiService");
    f(() => {
      b();
    });
    const n = _(!1), l = _([]);
    async function b() {
      n.value = !0, l.value = await p.roomLayouts(x().site, null), n.value = !1;
    }
    function m(a) {
      console.log("DELETE", a);
    }
    return (a, c) => {
      var i;
      return o(), s(u, null, [
        N,
        t("div", D, [
          t("div", V, [
            E(g, {
              text: "New Rom Layout",
              onOnClick: c[0] || (c[0] = (e) => r(h).push("/admin/room-layout/create")),
              type: "button"
            })
          ])
        ]),
        w,
        t("div", B, [
          t("div", I, [
            t("table", O, [
              R,
              t("tbody", null, [
                (o(!0), s(u, null, A(l.value, (e, y) => (o(), s("tr", {
                  key: e.id,
                  index: y
                }, [
                  t("td", null, C(e.name), 1),
                  t("td", S, [
                    t("button", {
                      type: "button",
                      class: "btn btn-link btn-sm",
                      onClick: (v) => r(h).push("/admin/room-layout/edit/" + e.id)
                    }, j, 8, $)
                  ]),
                  t("td", F, [
                    t("button", {
                      type: "button",
                      class: "btn btn-link btn-sm",
                      onClick: (v) => m(e)
                    }, z, 8, q)
                  ])
                ], 8, T))), 128)),
                !n.value && ((i = l.value) == null ? void 0 : i.length) === 0 ? (o(), s("tr", H, K)) : d("", !0),
                n.value ? (o(), s("tr", P, U)) : d("", !0)
              ])
            ])
          ])
        ])
      ], 64);
    };
  }
});
export {
  Y as default
};
