import { d as se, i as X, r as v, o as a, c as u, a as _, b as ge, e as y, w as ye, f as e, C as _e, g as m, t as l, u as $, h as te, j as c, W as $e, s as fe, S as Q, k as be, R as Se, l as de, T as Ie, E as le, M as oe, F as Z, p as ve, m as me, n as he, q as pe, v as ke, x as xe, y as Ce } from "./index.bff676e4.js";
const H = (n) => (ve("data-v-f306382c"), n = n(), me(), n), Ne = { class: "modal-mask" }, we = { class: "modal-wrapper" }, Oe = {
  class: "modal-dialog modal-xl modal-dialog-scrollable",
  role: "document"
}, Re = { class: "modal-content" }, Me = { class: "modal-header border-0" }, Te = /* @__PURE__ */ H(() => /* @__PURE__ */ e("h3", { class: "modal-title" }, "WORKOUT SUMMARY", -1)), Ae = {
  type: "button",
  class: "close",
  "data-dismiss": "modal",
  "aria-label": "Close"
}, Ee = { class: "modal-body" }, We = { key: 0 }, Le = {
  key: 0,
  class: "row"
}, De = { class: "col-12 text-center" }, Ue = { key: 1 }, Pe = { class: "row mt-3" }, Fe = { class: "col-12" }, Ye = { class: "col-12 text-center" }, Ve = /* @__PURE__ */ H(() => /* @__PURE__ */ e("br", null, null, -1)), Be = /* @__PURE__ */ H(() => /* @__PURE__ */ e("b", null, "TIME: ", -1)), je = /* @__PURE__ */ H(() => /* @__PURE__ */ e("b", null, "DURATION: ", -1)), qe = /* @__PURE__ */ H(() => /* @__PURE__ */ e("b", null, "INSTRUCTOR: ", -1)), Ke = { class: "row mt-3" }, Ge = { class: "col-12 text-center" }, ze = { class: "row mt-3" }, He = { class: "col-sm-6" }, Je = { class: "col-sm-6" }, Qe = { class: "col-sm-6" }, Xe = { class: "col-sm-6" }, Ze = { class: "col-sm-6" }, es = { class: "col-sm-6" }, ss = { class: "col-sm-6" }, ts = { class: "col-sm-6" }, ls = { class: "modal-footer border-0" }, os = /* @__PURE__ */ se({
  __name: "CustomerWorkoutSummaryModal",
  props: {
    classId: {},
    userId: {},
    enrollmentId: {}
  },
  setup(n) {
    const S = X("gqlApiService"), I = n, r = v(!1), s = v(null), i = v(!1), t = v(!1);
    function f() {
      b(), t.value = !0;
    }
    async function b() {
      s.value = null;
      try {
        r.value = !0, s.value = await S.singleWorkoutStat(I.enrollmentId);
      } catch {
        i.value = !0;
      } finally {
        r.value = !1;
      }
    }
    return (d, o) => (a(), u(Z, null, [
      _(ge, {
        text: "Show Stats",
        type: "button",
        onOnClick: o[0] || (o[0] = (h) => f())
      }),
      t.value ? (a(), y(Ie, {
        key: 0,
        name: "modal"
      }, {
        default: ye(() => {
          var h, p, g, k, x, C, N, w, O, R, M, T, A, E, W, L, D, U, P, F, Y, V, B, j, q, K, G, z;
          return [
            e("div", Ne, [
              e("div", we, [
                e("div", Oe, [
                  e("div", Re, [
                    e("div", Me, [
                      Te,
                      e("button", Ae, [
                        e("span", {
                          "aria-hidden": "true",
                          onClick: o[1] || (o[1] = (J) => t.value = !1)
                        }, "\xD7")
                      ])
                    ]),
                    e("div", Ee, [
                      r.value ? (a(), u("div", We, [
                        r.value ? (a(), u("div", Le, [
                          e("div", De, [
                            _(_e, { text: "Loading..." })
                          ])
                        ])) : m("", !0)
                      ])) : (a(), u("div", Ue, [
                        e("div", Pe, [
                          e("div", Fe, [
                            e("div", Ye, [
                              e("h4", null, l((h = s.value) == null ? void 0 : h.enrollment.class.name), 1),
                              Ve,
                              e("p", null, [
                                Be,
                                e("span", null, l($(te)((p = s.value) == null ? void 0 : p.enrollment.class.start).format("h:mm a")), 1),
                                c(" | "),
                                je,
                                e("span", null, l((g = s.value) == null ? void 0 : g.enrollment.class.duration), 1),
                                c(" mins. ")
                              ]),
                              e("p", null, [
                                qe,
                                c(" " + l((k = s.value) == null ? void 0 : k.enrollment.class.instructorName), 1)
                              ])
                            ])
                          ])
                        ]),
                        e("div", Ke, [
                          e("div", Ge, [
                            (x = s.value) != null && x.adjustedChartPoints ? (a(), y($e, {
                              key: 0,
                              "chart-points": (C = s.value) == null ? void 0 : C.adjustedChartPoints
                            }, null, 8, ["chart-points"])) : m("", !0)
                          ])
                        ]),
                        e("div", ze, [
                          e("div", He, [
                            _(Q, {
                              icon: "duration",
                              value: $(fe)((N = s.value) == null ? void 0 : N.enrollment.class.duration),
                              title: "DURATION"
                            }, null, 8, ["value"])
                          ]),
                          e("div", Je, [
                            _(Q, {
                              icon: "distance",
                              value: ((R = (O = (w = s.value) == null ? void 0 : w.distance) == null ? void 0 : O.toFixed(1)) != null ? R : "0") + "KM",
                              title: "DISTANCE"
                            }, null, 8, ["value"])
                          ]),
                          e("div", Qe, [
                            _(Q, {
                              icon: "calories",
                              value: (A = (T = (M = s.value) == null ? void 0 : M.calories) == null ? void 0 : T.toFixed(1)) != null ? A : "0",
                              title: "CALORIES"
                            }, null, 8, ["value"])
                          ]),
                          e("div", Xe, [
                            _(Q, {
                              icon: "total_energy",
                              value: (L = (W = (E = s.value) == null ? void 0 : E.totalEnergy) == null ? void 0 : W.toFixed(1)) != null ? L : "0",
                              title: "TOTAL ENERGY"
                            }, null, 8, ["value"])
                          ]),
                          e("div", Ze, [
                            _(be, {
                              "class-name": (D = s.value) == null ? void 0 : D.enrollment.class.name,
                              "spot-number": (U = s.value) == null ? void 0 : U.enrollment.enrollmentInfo.spotNumber
                            }, null, 8, ["class-name", "spot-number"])
                          ]),
                          e("div", es, [
                            (P = s.value) != null && P.enrollment.class.id ? (a(), y(Se, {
                              key: 0,
                              "class-id": (F = s.value) == null ? void 0 : F.enrollment.class.id,
                              "user-id": d.userId
                            }, null, 8, ["class-id", "user-id"])) : m("", !0)
                          ]),
                          e("div", ss, [
                            _(de, {
                              title: "POWER",
                              "avg-value": (V = (Y = s.value) == null ? void 0 : Y.averagePower) != null ? V : 0,
                              "high-value": (j = (B = s.value) == null ? void 0 : B.highPower) != null ? j : 0
                            }, null, 8, ["avg-value", "high-value"])
                          ]),
                          e("div", ts, [
                            _(de, {
                              title: "RPM",
                              "avg-value": (K = (q = s.value) == null ? void 0 : q.averageRpm) != null ? K : 0,
                              "high-value": (z = (G = s.value) == null ? void 0 : G.highRpm) != null ? z : 0
                            }, null, 8, ["avg-value", "high-value"])
                          ])
                        ])
                      ]))
                    ]),
                    e("div", ls, [
                      e("button", {
                        class: "btn btn-primary",
                        type: "button",
                        onClick: o[2] || (o[2] = (J) => t.value = !1)
                      }, " CLOSE ")
                    ])
                  ])
                ])
              ])
            ])
          ];
        }),
        _: 1
      })) : m("", !0),
      i.value ? (a(), y(oe, {
        key: 1,
        title: "Error",
        message: $(le),
        "cancel-text": null,
        onOnOk: o[3] || (o[3] = (h) => i.value = !1)
      }, null, 8, ["message"])) : m("", !0)
    ], 64));
  }
});
const as = /* @__PURE__ */ he(os, [["__scopeId", "data-v-f306382c"]]), ee = (n) => (ve("data-v-a3a0e6ed"), n = n(), me(), n), ns = /* @__PURE__ */ ee(() => /* @__PURE__ */ e("div", { class: "row" }, [
  /* @__PURE__ */ e("div", { class: "col-12" }, [
    /* @__PURE__ */ e("h5", null, "WORKOUT STATS")
  ])
], -1)), cs = {
  key: 0,
  class: "row"
}, rs = { class: "col-12 text-center" }, is = {
  key: 1,
  class: "row mt-3"
}, us = { class: "col-12" }, ds = { class: "table-responsive" }, _s = { class: "table table-sm" }, vs = /* @__PURE__ */ ee(() => /* @__PURE__ */ e("thead", null, [
  /* @__PURE__ */ e("tr", { class: "text-center" }, [
    /* @__PURE__ */ e("th", null, "DESCRIPTION"),
    /* @__PURE__ */ e("th", null, "SPOT"),
    /* @__PURE__ */ e("th", null, "DATE"),
    /* @__PURE__ */ e("th", null, "DURATION"),
    /* @__PURE__ */ e("th", null, "TOTAL ENERGY"),
    /* @__PURE__ */ e("th")
  ])
], -1)), ms = { class: "text-center" }, hs = { class: "text-center" }, ps = { class: "text-center" }, gs = { class: "text-center" }, ys = { class: "text-center" }, $s = { key: 0 }, fs = /* @__PURE__ */ ee(() => /* @__PURE__ */ e("td", {
  colspan: "6",
  class: "text-center"
}, [
  /* @__PURE__ */ e("p", null, "NO DATA AVAILABLE IN TABLE")
], -1)), bs = [
  fs
], Ss = { key: 1 }, Is = /* @__PURE__ */ ee(() => /* @__PURE__ */ e("td", {
  colspan: "6",
  class: "text-center"
}, [
  /* @__PURE__ */ e("p", null, "LOADING...")
], -1)), ks = [
  Is
], xs = /* @__PURE__ */ se({
  __name: "CustomerWorkoutStats",
  props: {
    userId: {}
  },
  setup(n) {
    const S = X("gqlApiService"), I = n, r = v(!1), s = v(!1), i = v([]);
    pe(() => {
      t();
    });
    async function t() {
      i.value = [];
      try {
        r.value = !0, i.value = await S.userWorkoutStats(
          ke().site,
          I.userId
        );
      } catch {
        s.value = !0;
      } finally {
        r.value = !1;
      }
    }
    return (f, b) => {
      var d;
      return a(), u(Z, null, [
        ns,
        r.value ? (a(), u("div", cs, [
          e("div", rs, [
            _(_e, { text: "Loading..." })
          ])
        ])) : (a(), u("div", is, [
          e("div", us, [
            e("div", ds, [
              e("table", _s, [
                vs,
                e("tbody", null, [
                  (a(!0), u(Z, null, xe(i.value, (o, h) => {
                    var p, g;
                    return a(), u("tr", { key: h }, [
                      e("td", null, l(o.enrollment.class.name), 1),
                      e("td", ms, l(o.enrollment.enrollmentInfo.spotNumber), 1),
                      e("td", hs, l($(te)(new Date(o.enrollment.class.start)).format("DD/MM/YYYY h:mm A")), 1),
                      e("td", ps, l(o.enrollment.class.duration) + " mins.", 1),
                      e("td", gs, l((g = (p = o.totalEnergy) == null ? void 0 : p.toFixed(1)) != null ? g : "0"), 1),
                      e("td", ys, [
                        _(as, {
                          "enrollment-id": o.enrollment.enrollmentInfo.id,
                          "class-id": o.enrollment.class.id,
                          "user-id": f.userId
                        }, null, 8, ["enrollment-id", "class-id", "user-id"])
                      ])
                    ]);
                  }), 128)),
                  ((d = i.value) == null ? void 0 : d.length) === 0 && !r.value ? (a(), u("tr", $s, bs)) : m("", !0),
                  r.value ? (a(), u("tr", Ss, ks)) : m("", !0)
                ])
              ])
            ])
          ])
        ])),
        s.value ? (a(), y(oe, {
          key: 2,
          title: "Error",
          message: $(le),
          "cancel-text": null,
          onOnOk: b[0] || (b[0] = (o) => s.value = !1)
        }, null, 8, ["message"])) : m("", !0)
      ], 64);
    };
  }
});
const Cs = /* @__PURE__ */ he(xs, [["__scopeId", "data-v-a3a0e6ed"]]), Ns = { class: "row" }, ws = { class: "col-12" }, Os = /* @__PURE__ */ e("hr", null, null, -1), Rs = /* @__PURE__ */ e("h6", null, "Personal Information", -1), Ms = { class: "row" }, Ts = { class: "col" }, As = { class: "col" }, Es = { class: "row" }, Ws = { class: "col" }, Ls = { class: "col" }, Ds = { class: "row" }, Us = { class: "col" }, Ps = { class: "col" }, Fs = /* @__PURE__ */ e("hr", null, null, -1), Ys = /* @__PURE__ */ e("h6", null, "Contact Information", -1), Vs = { class: "row" }, Bs = { class: "col" }, js = { class: "col" }, qs = { class: "row" }, Ks = { class: "col" }, Gs = { class: "col" }, zs = { class: "row" }, Hs = { class: "col" }, Js = { class: "col" }, Qs = { class: "row" }, Xs = { class: "col" }, Zs = { class: "col" }, et = /* @__PURE__ */ e("hr", null, null, -1), st = { class: "row" }, tt = { class: "col-12" };
var lt = /* @__PURE__ */ ((n) => (n.F = "F", n.M = "M", n.N = "N", n))(lt || {});
const nt = /* @__PURE__ */ se({
  __name: "CustomerProfileView",
  setup(n) {
    const S = Ce(), I = X("gqlApiService"), r = v(""), s = v(!1), i = v(!1), t = v(null);
    pe(() => {
      r.value = f(), b(r.value);
    });
    function f() {
      let d = X("userId");
      return d !== void 0 ? d : S.params.id;
    }
    async function b(d) {
      try {
        s.value = !0, t.value = await I.getUser(d);
      } catch {
        i.value = !0;
      } finally {
        s.value = !1;
      }
    }
    return (d, o) => {
      var h, p, g, k, x, C, N, w, O, R, M, T, A, E, W, L, D, U, P, F, Y, V, B, j, q, K, G, z, J, ae, ne, ce, re, ie, ue;
      return a(), u(Z, null, [
        e("div", Ns, [
          e("div", ws, [
            e("h5", null, "Email: " + l((p = (h = t.value) == null ? void 0 : h.user) == null ? void 0 : p.email), 1),
            Os,
            Rs,
            e("div", Ms, [
              e("div", Ts, [
                e("p", null, [
                  c(" First Name: "),
                  e("b", null, l((k = (g = t.value) == null ? void 0 : g.user) == null ? void 0 : k.firstName), 1)
                ])
              ]),
              e("div", As, [
                e("p", null, [
                  c(" Last Name: "),
                  e("b", null, l((C = (x = t.value) == null ? void 0 : x.user) == null ? void 0 : C.lastName), 1)
                ])
              ])
            ]),
            e("div", Es, [
              e("div", Ws, [
                e("p", null, [
                  c(" Gender: "),
                  e("b", null, l(((w = (N = t.value) == null ? void 0 : N.user) == null ? void 0 : w.gender) === "M" ? "Male" : ((R = (O = t.value) == null ? void 0 : O.user) == null ? void 0 : R.gender) === "F" ? "Female" : ""), 1)
                ])
              ]),
              e("div", Ls, [
                e("p", null, [
                  c(" Leaderboard Name: "),
                  e("b", null, l((T = (M = t.value) == null ? void 0 : M.user) == null ? void 0 : T.leaderboardUsername), 1)
                ])
              ])
            ]),
            e("div", Ds, [
              e("div", Us, [
                e("p", null, [
                  c(" Date of Birth: "),
                  e("b", null, l($(te)((E = (A = t.value) == null ? void 0 : A.user) == null ? void 0 : E.birthdate).format("DD/MM/YYYY")), 1)
                ])
              ]),
              e("div", Ps, [
                e("p", null, [
                  c(" Weight: "),
                  e("b", null, l((D = (L = (W = t.value) == null ? void 0 : W.user) == null ? void 0 : L.weight) != null ? D : "") + " kg", 1)
                ])
              ])
            ]),
            Fs,
            Ys,
            e("div", Vs, [
              e("div", Bs, [
                e("p", null, [
                  c(" Country: "),
                  e("b", null, l((F = (P = (U = t.value) == null ? void 0 : U.user) == null ? void 0 : P.country) == null ? void 0 : F.name), 1)
                ])
              ]),
              e("div", js, [
                e("p", null, [
                  c(" City/State: "),
                  e("b", null, l((B = (V = (Y = t.value) == null ? void 0 : Y.user) == null ? void 0 : V.state) == null ? void 0 : B.name), 1)
                ])
              ])
            ]),
            e("div", qs, [
              e("div", Ks, [
                e("p", null, [
                  c(" Adress Line 1: "),
                  e("b", null, l((q = (j = t.value) == null ? void 0 : j.user) == null ? void 0 : q.address1), 1)
                ])
              ]),
              e("div", Gs, [
                e("p", null, [
                  c(" Adress Line 2: "),
                  e("b", null, l((G = (K = t.value) == null ? void 0 : K.user) == null ? void 0 : G.address2), 1)
                ])
              ])
            ]),
            e("div", zs, [
              e("div", Hs, [
                e("p", null, [
                  c(" Mobile Number: "),
                  e("b", null, l((J = (z = t.value) == null ? void 0 : z.user) == null ? void 0 : J.phone), 1)
                ])
              ]),
              e("div", Js, [
                e("p", null, [
                  c(" Emergency Contact Name: "),
                  e("b", null, l((ne = (ae = t.value) == null ? void 0 : ae.user) == null ? void 0 : ne.emergencyContactName), 1)
                ])
              ])
            ]),
            e("div", Qs, [
              e("div", Xs, [
                e("p", null, [
                  c(" Emergency Contact Number: "),
                  e("b", null, l((re = (ce = t.value) == null ? void 0 : ce.user) == null ? void 0 : re.emergencyContactPhone), 1)
                ])
              ]),
              e("div", Zs, [
                e("p", null, [
                  c(" Emergency Contact Relationship: "),
                  e("b", null, l((ue = (ie = t.value) == null ? void 0 : ie.user) == null ? void 0 : ue.emergencyContactRelationship), 1)
                ])
              ])
            ])
          ])
        ]),
        et,
        e("div", st, [
          e("div", tt, [
            r.value ? (a(), y(Cs, {
              key: 0,
              "user-id": r.value
            }, null, 8, ["user-id"])) : m("", !0)
          ])
        ]),
        i.value ? (a(), y(oe, {
          key: 0,
          title: "ERROR",
          message: $(le),
          closable: !1,
          onOnOk: o[0] || (o[0] = (ot) => i.value = !1)
        }, null, 8, ["message"])) : m("", !0)
      ], 64);
    };
  }
});
export {
  lt as GenderEnum,
  nt as default
};
