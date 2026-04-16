import { d as f, W as x, G as E, c as g, I as A, J as C, r, b as e, e as t, k as N, g as d, _ as D, F as h, h as w, j as p, o, x as m, t as R, s as B } from "./index.16c8b1f0.js";
const I = /* @__PURE__ */ t("h1", null, "Room Layouts", -1), O = { class: "row" }, T = { class: "col-12 text-right" }, V = /* @__PURE__ */ t("br", null, null, -1), S = { class: "row" }, $ = { class: "col-12" }, M = { class: "table" }, j = /* @__PURE__ */ t("thead", null, [
  /* @__PURE__ */ t("tr", null, [
    /* @__PURE__ */ t("th", { class: "text-center" }, "ROOM NAME"),
    /* @__PURE__ */ t("th", { class: "text-center" }, "EDIT"),
    /* @__PURE__ */ t("th", { class: "text-center" }, "DELETE")
  ])
], -1), F = ["index"], G = { class: "text-center" }, q = ["onClick"], J = /* @__PURE__ */ t("i", { class: "bi bi-pencil-fill" }, null, -1), W = [
  J
], z = { class: "text-center" }, H = ["onClick"], K = /* @__PURE__ */ t("i", { class: "bi bi-trash3-fill" }, null, -1), P = [
  K
], Q = { key: 0 }, U = /* @__PURE__ */ t("td", {
  colspan: "3",
  class: "text-center"
}, [
  /* @__PURE__ */ t("p", null, "NO DATA AVAILABLE IN TABLE")
], -1), X = [
  U
], Y = { key: 1 }, Z = /* @__PURE__ */ t("td", {
  colspan: "3",
  class: "text-center"
}, "LOADING...", -1), tt = [
  Z
], ot = /* @__PURE__ */ f({
  __name: "RoomLayoutListView",
  setup(st) {
    const b = x("gqlApiService"), y = E(), l = g(() => y.params.site || B().site || "dubai");
    A(() => {
      c();
    }), C(l, () => {
      c();
    });
    const n = r(!1), a = r([]);
    async function c() {
      n.value = !0, a.value = await b.roomLayouts(l.value, null), n.value = !1;
    }
    function v(i) {
      console.log("DELETE", i);
    }
    return (i, u) => {
      var _;
      return o(), e(h, null, [
        I,
        t("div", O, [
          t("div", T, [
            N(D, {
              text: "New Rom Layout",
              onOnClick: u[0] || (u[0] = (s) => d(m).push("/admin/room-layout/create")),
              type: "button"
            })
          ])
        ]),
        V,
        t("div", S, [
          t("div", $, [
            t("table", M, [
              j,
              t("tbody", null, [
                (o(!0), e(h, null, w(a.value, (s, L) => (o(), e("tr", {
                  key: s.id,
                  index: L
                }, [
                  t("td", null, R(s.name), 1),
                  t("td", G, [
                    t("button", {
                      type: "button",
                      class: "btn btn-link btn-sm",
                      onClick: (k) => d(m).push("/admin/room-layout/edit/" + s.id)
                    }, W, 8, q)
                  ]),
                  t("td", z, [
                    t("button", {
                      type: "button",
                      class: "btn btn-link btn-sm",
                      onClick: (k) => v(s)
                    }, P, 8, H)
                  ])
                ], 8, F))), 128)),
                !n.value && ((_ = a.value) == null ? void 0 : _.length) === 0 ? (o(), e("tr", Q, X)) : p("", !0),
                n.value ? (o(), e("tr", Y, tt)) : p("", !0)
              ])
            ])
          ])
        ])
      ], 64);
    };
  }
});
export {
  ot as default
};
