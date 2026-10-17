import { d as f, a6 as x, H as E, c as g, K as A, L as C, r, b as e, e as t, k as N, g as d, _ as D, F as h, h as w, j as p, o, x as m, t as R, s as B } from "./index.cb70f358.js";
const O = /* @__PURE__ */ t("h1", null, "Room Layouts", -1), T = { class: "row" }, V = { class: "col-12 text-right" }, I = /* @__PURE__ */ t("br", null, null, -1), S = { class: "row" }, $ = { class: "col-12" }, M = { class: "table" }, j = /* @__PURE__ */ t("thead", null, [
  /* @__PURE__ */ t("tr", null, [
    /* @__PURE__ */ t("th", { class: "text-center" }, "ROOM NAME"),
    /* @__PURE__ */ t("th", { class: "text-center" }, "EDIT"),
    /* @__PURE__ */ t("th", { class: "text-center" }, "DELETE")
  ])
], -1), F = ["index"], q = { class: "text-center" }, G = ["onClick"], H = /* @__PURE__ */ t("i", { class: "bi bi-pencil-fill" }, null, -1), K = [
  H
], z = { class: "text-center" }, J = ["onClick"], P = /* @__PURE__ */ t("i", { class: "bi bi-trash3-fill" }, null, -1), Q = [
  P
], U = { key: 0 }, W = /* @__PURE__ */ t("td", {
  colspan: "3",
  class: "text-center"
}, [
  /* @__PURE__ */ t("p", null, "NO DATA AVAILABLE IN TABLE")
], -1), X = [
  W
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
        O,
        t("div", T, [
          t("div", V, [
            N(D, {
              text: "New Rom Layout",
              onOnClick: u[0] || (u[0] = (s) => d(m).push("/admin/room-layout/create")),
              type: "button"
            })
          ])
        ]),
        I,
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
                  t("td", q, [
                    t("button", {
                      type: "button",
                      class: "btn btn-link btn-sm",
                      onClick: (k) => d(m).push("/admin/room-layout/edit/" + s.id)
                    }, K, 8, G)
                  ]),
                  t("td", z, [
                    t("button", {
                      type: "button",
                      class: "btn btn-link btn-sm",
                      onClick: (k) => v(s)
                    }, Q, 8, J)
                  ])
                ], 8, F))), 128)),
                !n.value && ((_ = a.value) == null ? void 0 : _.length) === 0 ? (o(), e("tr", U, X)) : p("", !0),
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
