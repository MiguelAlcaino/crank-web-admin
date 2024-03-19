import { d as W, o as l, c as a, a as r, b as e, n as ee, e as w, t as y, p as re, f as de, _ as ae, r as o, g as Oe, w as Re, F as V, h as le, i as $, j as X, k as x, M as D, l as q, E as qe, m as B, q as T, s as ke, T as Ie, u as Y, v as P, x as es, y as ss, z as ze, A as ls, B as ts, C as ns, D as as, G as Le, H as Qe, I as os, J as is, K as us, L as rs, N as ds, O as Ge, P as cs, Q as vs, R as ge, S as Ke, U as ms, V as je, W as ps, X as Ze } from "./index.97061165.js";
const _s = { key: 0 }, fs = /* @__PURE__ */ e("i", {
  class: "bi bi-person-fill",
  style: { "font-size": "1.8rem" }
}, null, -1), bs = [
  fs
], ys = { key: 1 }, ks = /* @__PURE__ */ e("i", {
  class: "bi bi-speaker",
  style: { "font-size": "1.8rem" }
}, null, -1), Ss = [
  ks
], Cs = { key: 2 }, hs = /* @__PURE__ */ e("i", {
  class: "bi bi-fan",
  style: { "font-size": "1.8rem" }
}, null, -1), gs = [
  hs
], $s = { key: 3 }, Os = /* @__PURE__ */ e("i", {
  class: "bi bi-tv",
  style: { "font-size": "1.8rem" }
}, null, -1), Is = [
  Os
], Es = /* @__PURE__ */ W({
  __name: "IconPositionNotBookable",
  props: {
    icon: {}
  },
  setup(p) {
    return (E, h) => (l(), a("div", null, [
      E.icon === "instructor" ? (l(), a("div", _s, bs)) : E.icon === "speaker" ? (l(), a("div", ys, Ss)) : E.icon === "fan" ? (l(), a("div", Cs, gs)) : E.icon === "tv" ? (l(), a("div", $s, Is)) : r("", !0)
    ]));
  }
}), Ae = (p) => (re("data-v-0f221a09"), p = p(), de(), p), Ns = { key: 0 }, Rs = /* @__PURE__ */ Ae(() => /* @__PURE__ */ e("br", null, null, -1)), Ls = {
  key: 2,
  class: /* @__PURE__ */ ee(["changeMemberSpot-disabledSpot"])
}, As = { key: 1 }, ws = /* @__PURE__ */ Ae(() => /* @__PURE__ */ e("br", null, null, -1)), Us = {
  key: 1,
  class: /* @__PURE__ */ ee(["empty-spot-not-selectable"])
}, Ms = {
  key: 2,
  class: /* @__PURE__ */ ee(["changeMemberSpot-disabledSpot"])
}, Ts = { key: 2 }, Ds = /* @__PURE__ */ Ae(() => /* @__PURE__ */ e("br", null, null, -1)), xs = /* @__PURE__ */ W({
  __name: "AdminBookableSpotPosition",
  props: {
    spotNumber: {},
    isBooked: { type: Boolean },
    user: {},
    enabled: { type: Boolean },
    selected: { type: Boolean },
    isCheckedIn: { type: Boolean },
    spotAction: {},
    spotSelectionIsDisabled: { type: Boolean, default: !1 }
  },
  emits: ["clickSpot"],
  setup(p, { emit: E }) {
    const h = p, k = E;
    function m() {
      k("clickSpot", h.spotNumber);
    }
    return (t, s) => {
      var f, i, d, _, v, S;
      return t.spotAction === 2 ? (l(), a("div", Ns, [
        t.isBooked ? (l(), a("div", {
          key: 0,
          class: ee(["changeMemberSpot-bookedSpot", t.selected ? "selectedSpot" : ""])
        }, [
          w(y(t.spotNumber + (t.isCheckedIn === !0 ? "\u2713" : "")) + " ", 1),
          Rs,
          w(" " + y((f = t.user) == null ? void 0 : f.firstName) + " " + y((i = t.user) == null ? void 0 : i.lastName), 1)
        ], 2)) : t.enabled ? (l(), a("div", {
          key: 1,
          class: ee(["changeMemberSpot-spotAvailable"]),
          onClick: s[0] || (s[0] = (O) => t.spotSelectionIsDisabled ? null : m())
        }, y(t.spotNumber), 1)) : (l(), a("div", Ls, y(t.spotNumber), 1))
      ])) : t.spotAction === 3 ? (l(), a("div", As, [
        t.isBooked ? (l(), a("div", {
          key: 0,
          onClick: s[1] || (s[1] = (O) => t.selected || t.spotSelectionIsDisabled ? null : m()),
          class: ee([
            "changeMemberSpot-bookedSpot",
            t.selected ? "selectedSpot" : "swapMemberSpot-bookedSpot"
          ])
        }, [
          w(y(t.spotNumber + (t.isCheckedIn === !0 ? "\u2713" : "")) + " ", 1),
          ws,
          w(" " + y((d = t.user) == null ? void 0 : d.firstName) + " " + y((_ = t.user) == null ? void 0 : _.lastName), 1)
        ], 2)) : t.enabled ? (l(), a("div", Us, y(t.spotNumber), 1)) : (l(), a("div", Ms, y(t.spotNumber), 1))
      ])) : (l(), a("div", Ts, [
        t.isBooked ? (l(), a("div", {
          key: 0,
          onClick: s[2] || (s[2] = (O) => t.spotSelectionIsDisabled ? null : m()),
          class: ee([
            t.spotSelectionIsDisabled ? "spotEnabledNotClickable" : "enabledSpot",
            t.selected ? "selectedSpot" : ""
          ])
        }, [
          w(y(t.spotNumber + (t.isCheckedIn === !0 ? "\u2713" : "")) + " ", 1),
          Ds,
          w(" " + y((v = t.user) == null ? void 0 : v.firstName) + " " + y((S = t.user) == null ? void 0 : S.lastName), 1)
        ], 2)) : t.enabled ? (l(), a("div", {
          key: 1,
          class: ee([
            t.spotSelectionIsDisabled ? "spotEnabledNotClickable" : "enabledSpot",
            t.selected ? "selectedSpot" : ""
          ]),
          onClick: s[3] || (s[3] = (O) => t.spotSelectionIsDisabled ? null : m())
        }, y(t.spotNumber), 3)) : (l(), a("div", {
          key: 2,
          class: ee([
            t.spotSelectionIsDisabled ? "disabledSpotNotClickable" : "disabledSpot",
            t.selected ? "selectedSpot" : ""
          ]),
          onClick: s[4] || (s[4] = (O) => t.spotSelectionIsDisabled ? null : m())
        }, y(t.spotNumber), 3))
      ]));
    };
  }
});
const Vs = /* @__PURE__ */ ae(xs, [["__scopeId", "data-v-0f221a09"]]), Bs = {
  class: "table table-sm table-borderless",
  style: { margin: "0 auto", "margin-bottom": "35px" }
}, Hs = /* @__PURE__ */ W({
  __name: "SpotMatrix",
  props: {
    matrix: {},
    showUserInSpots: { type: Boolean, default: !1 },
    selectedSpotNumber: {},
    enrollments: {},
    spotNumberBookedByCurrentUser: {},
    spotAction: {},
    spotSelectionIsDisabled: { type: Boolean, default: !1 }
  },
  emits: ["clickSpot"],
  setup(p, { emit: E }) {
    const h = p, k = E, m = o([]);
    Oe(() => {
      h.matrix && (m.value = s(h.matrix));
    }), Re(
      () => h.matrix,
      (i) => {
        m.value = s(i);
      }
    ), Re(
      () => h.enrollments,
      () => {
        m.value = s(h.matrix);
      }
    );
    function t(i, d, _) {
      return i.icon === "spot" ? {
        x: i.x,
        y: i.y,
        icon: i.icon,
        spotNumber: i.spotNumber,
        user: d,
        enabled: i.enabled,
        isCheckedIn: _
      } : {
        x: i.x,
        y: i.y,
        icon: i.icon
      };
    }
    function s(i) {
      var C, u;
      let d = [], _, v, S;
      for (let R = 0; R < i.length; R++)
        for (let c = 0; c < i.length; c++)
          if (_ = i[c], i[c].y === R) {
            if (d[_.y] === void 0 && d.push([]), v = null, S = !1, _.icon === "spot" && _.spotNumber && h.enrollments)
              for (let n = 0; n < h.enrollments.length; n++) {
                const I = h.enrollments[n];
                if (I.spotNumber === _.spotNumber) {
                  S = I.isCheckedIn, v = (u = (C = I.identifiableSiteUser) == null ? void 0 : C.identifiableUser) == null ? void 0 : u.user;
                  break;
                }
              }
            d[R].push(t(_, v, S));
          }
      let O = [];
      for (let R = 0; R < d.length; R++)
        O.push(
          d[R].sort((c, n) => c.x > n.x ? 1 : c.x < n.x ? -1 : 0)
        );
      return O;
    }
    function f(i) {
      k("clickSpot", {
        spotNumber: i
      });
    }
    return (i, d) => (l(), a("div", null, [
      e("table", Bs, [
        e("tbody", null, [
          (l(!0), a(V, null, le(m.value, (_, v) => (l(), a("tr", {
            key: v,
            class: "text-center"
          }, [
            (l(!0), a(V, null, le(_, (S, O) => {
              var C;
              return l(), a("td", {
                class: "class-position",
                key: O
              }, [
                S.icon === "spot" ? (l(), $(Vs, {
                  key: 0,
                  "spot-number": (C = S.spotNumber) != null ? C : 0,
                  "is-booked": !!S.user,
                  user: S.user,
                  enabled: S.enabled,
                  onClickSpot: f,
                  selected: h.selectedSpotNumber === (S == null ? void 0 : S.spotNumber),
                  "is-checked-in": S.isCheckedIn,
                  "spot-action": i.spotAction,
                  "spot-selection-is-disabled": i.spotSelectionIsDisabled
                }, null, 8, ["spot-number", "is-booked", "user", "enabled", "selected", "is-checked-in", "spot-action", "spot-selection-is-disabled"])) : (l(), $(Es, {
                  key: 1,
                  icon: S.icon
                }, null, 8, ["icon"]))
              ]);
            }), 128))
          ]))), 128))
        ])
      ])
    ]));
  }
});
const Ws = /* @__PURE__ */ ae(Hs, [["__scopeId", "data-v-3776e945"]]), Je = /* @__PURE__ */ W({
  __name: "CheckInCheckOutUserInClass",
  props: {
    enrollmentId: {},
    isCheckedIn: { type: Boolean }
  },
  emits: ["afterCheckInCheckOut"],
  setup(p, { emit: E }) {
    const h = X("gqlApiService"), k = p, m = E, t = o(!1), s = o(!1), f = o("");
    async function i() {
      try {
        t.value = !0;
        var _ = await h.checkinUserInClass(q().site, {
          enrollmentId: k.enrollmentId
        });
        _.__typename === "EnrollmentNotFoundError" && (f.value = qe, s.value = !0), m("afterCheckInCheckOut");
      } catch {
        f.value = B, s.value = !0;
      } finally {
        t.value = !1;
      }
    }
    async function d() {
      try {
        t.value = !0;
        var _ = await h.checkoutUserInClass(q().site, {
          enrollmentId: k.enrollmentId
        });
        _.__typename === "EnrollmentNotFoundError" && (f.value = qe, s.value = !0), m("afterCheckInCheckOut");
      } catch {
        f.value = B, s.value = !0;
      } finally {
        t.value = !1;
      }
    }
    return (_, v) => (l(), a(V, null, [
      _.isCheckedIn ? r("", !0) : (l(), $(x, {
        key: 0,
        text: "Check-In",
        type: "button",
        onOnClick: v[0] || (v[0] = (S) => i()),
        class: "mr-1",
        "is-loading": t.value
      }, null, 8, ["is-loading"])),
      _.isCheckedIn ? (l(), $(x, {
        key: 1,
        text: "Check-Out",
        type: "button",
        onOnClick: v[1] || (v[1] = (S) => d()),
        class: "mr-1",
        "is-loading": t.value
      }, null, 8, ["is-loading"])) : r("", !0),
      s.value ? (l(), $(D, {
        key: 2,
        title: "Error",
        message: f.value,
        "cancel-text": null,
        onOnOk: v[2] || (v[2] = (S) => s.value = !1)
      }, null, 8, ["message"])) : r("", !0)
    ], 64));
  }
}), Ys = (p) => (re("data-v-af02abea"), p = p(), de(), p), Fs = /* @__PURE__ */ Ys(() => /* @__PURE__ */ e("div", {
  class: "spinner-border crankSpiner",
  role: "status"
}, [
  /* @__PURE__ */ e("span", { class: "sr-only" }, "Loading...")
], -1)), Ps = { key: 0 }, qs = /* @__PURE__ */ W({
  __name: "CrankCircularProgressIndicator",
  props: {
    text: {}
  },
  setup(p) {
    return (E, h) => (l(), a(V, null, [
      Fs,
      E.text ? (l(), a("p", Ps, [
        e("strong", null, y(E.text), 1)
      ])) : r("", !0)
    ], 64));
  }
});
const we = /* @__PURE__ */ ae(qs, [["__scopeId", "data-v-af02abea"]]), Ee = (p) => (re("data-v-52330587"), p = p(), de(), p), Gs = { class: "modal-mask" }, Ks = { class: "modal-wrapper" }, js = {
  class: "modal-dialog modal-lg",
  role: "document"
}, Zs = { class: "modal-content" }, zs = { class: "modal-header border-0" }, Qs = { class: "modal-title" }, Js = {
  type: "button",
  class: "close",
  "data-dismiss": "modal",
  "aria-label": "Close"
}, Xs = { class: "modal-body" }, el = {
  key: 0,
  class: "row"
}, sl = { class: "col-12 text-center" }, ll = {
  key: 1,
  class: "row"
}, tl = { class: "col-12" }, nl = /* @__PURE__ */ Ee(() => /* @__PURE__ */ e("hr", null, null, -1)), al = /* @__PURE__ */ Ee(() => /* @__PURE__ */ e("h6", null, "Personal Information", -1)), ol = { class: "row" }, il = { class: "col" }, ul = { class: "col" }, rl = { class: "row" }, dl = { class: "col" }, cl = { class: "col" }, vl = { class: "row" }, ml = { class: "col" }, pl = { class: "col" }, _l = /* @__PURE__ */ Ee(() => /* @__PURE__ */ e("hr", null, null, -1)), fl = /* @__PURE__ */ Ee(() => /* @__PURE__ */ e("h6", null, "Contact Information", -1)), bl = { class: "row" }, yl = { class: "col" }, kl = { class: "col" }, Sl = { class: "row" }, Cl = { class: "col" }, hl = { class: "col" }, gl = { class: "row" }, $l = { class: "col" }, Ol = { class: "col" }, Il = { class: "row" }, El = { class: "col" }, Nl = { class: "col" }, Rl = { class: "modal-footer border-0" }, Ll = /* @__PURE__ */ W({
  __name: "UserProfile",
  props: {
    userId: {}
  },
  setup(p) {
    const E = X("gqlApiService"), h = p, k = o(!1), m = o(!1), t = o(!1), s = o(null);
    function f() {
      i(h.userId), m.value = !0;
    }
    async function i(d) {
      try {
        k.value = !0, s.value = await E.getUser(d);
      } catch {
        t.value = !0;
      } finally {
        k.value = !1;
      }
    }
    return (d, _) => (l(), a(V, null, [
      T(x, {
        text: "View Profile",
        type: "button",
        onOnClick: f
      }),
      m.value ? (l(), $(Ie, {
        key: 0,
        name: "modal"
      }, {
        default: ke(() => {
          var v, S, O, C, u, R, c, n, I, g, L, A, U, M, G, K, ie, Se, ue, Ce, N, b, z, Z, F, Q, j, te, ne, se, J, ce, ve, me, pe, _e, fe, be, ye;
          return [
            e("div", Gs, [
              e("div", Ks, [
                e("div", js, [
                  e("div", Zs, [
                    e("div", zs, [
                      e("h5", Qs, " Profile " + y(s.value !== null ? " - " + ((S = (v = s.value.user) == null ? void 0 : v.firstName) != null ? S : "") + " " + ((C = (O = s.value.user) == null ? void 0 : O.lastName) != null ? C : "") : ""), 1),
                      e("button", Js, [
                        e("span", {
                          "aria-hidden": "true",
                          onClick: _[0] || (_[0] = (he) => m.value = !1)
                        }, "\xD7")
                      ])
                    ]),
                    e("div", Xs, [
                      k.value ? (l(), a("div", el, [
                        e("div", sl, [
                          T(we, { text: "Loading..." })
                        ])
                      ])) : (l(), a("div", ll, [
                        e("div", tl, [
                          e("h5", null, "Email: " + y((R = (u = s.value) == null ? void 0 : u.user) == null ? void 0 : R.email), 1),
                          nl,
                          al,
                          e("div", ol, [
                            e("div", il, [
                              e("p", null, [
                                w(" First Name: "),
                                e("b", null, y((n = (c = s.value) == null ? void 0 : c.user) == null ? void 0 : n.firstName), 1)
                              ])
                            ]),
                            e("div", ul, [
                              e("p", null, [
                                w(" Last Name: "),
                                e("b", null, y((g = (I = s.value) == null ? void 0 : I.user) == null ? void 0 : g.lastName), 1)
                              ])
                            ])
                          ]),
                          e("div", rl, [
                            e("div", dl, [
                              e("p", null, [
                                w(" Gender: "),
                                e("b", null, y(((A = (L = s.value) == null ? void 0 : L.user) == null ? void 0 : A.gender) === "M" ? "Male" : ((M = (U = s.value) == null ? void 0 : U.user) == null ? void 0 : M.gender) === "F" ? "Female" : ""), 1)
                              ])
                            ]),
                            e("div", cl, [
                              e("p", null, [
                                w(" Leaderboard Name: "),
                                e("b", null, y((K = (G = s.value) == null ? void 0 : G.user) == null ? void 0 : K.leaderboardUsername), 1)
                              ])
                            ])
                          ]),
                          e("div", vl, [
                            e("div", ml, [
                              e("p", null, [
                                w(" Date of Birth: "),
                                e("b", null, y(Y(P)((Se = (ie = s.value) == null ? void 0 : ie.user) == null ? void 0 : Se.birthdate).format("DD/MM/YYYY")), 1)
                              ])
                            ]),
                            e("div", pl, [
                              e("p", null, [
                                w(" Weight: "),
                                e("b", null, y((N = (Ce = (ue = s.value) == null ? void 0 : ue.user) == null ? void 0 : Ce.weight) != null ? N : "") + " kg", 1)
                              ])
                            ])
                          ]),
                          _l,
                          fl,
                          e("div", bl, [
                            e("div", yl, [
                              e("p", null, [
                                w(" Country: "),
                                e("b", null, y((Z = (z = (b = s.value) == null ? void 0 : b.user) == null ? void 0 : z.country) == null ? void 0 : Z.name), 1)
                              ])
                            ]),
                            e("div", kl, [
                              e("p", null, [
                                w(" City/State: "),
                                e("b", null, y((j = (Q = (F = s.value) == null ? void 0 : F.user) == null ? void 0 : Q.state) == null ? void 0 : j.name), 1)
                              ])
                            ])
                          ]),
                          e("div", Sl, [
                            e("div", Cl, [
                              e("p", null, [
                                w(" Adress Line 1: "),
                                e("b", null, y((ne = (te = s.value) == null ? void 0 : te.user) == null ? void 0 : ne.address1), 1)
                              ])
                            ]),
                            e("div", hl, [
                              e("p", null, [
                                w(" Adress Line 2: "),
                                e("b", null, y((J = (se = s.value) == null ? void 0 : se.user) == null ? void 0 : J.address2), 1)
                              ])
                            ])
                          ]),
                          e("div", gl, [
                            e("div", $l, [
                              e("p", null, [
                                w(" Mobile Number: "),
                                e("b", null, y((ve = (ce = s.value) == null ? void 0 : ce.user) == null ? void 0 : ve.phone), 1)
                              ])
                            ]),
                            e("div", Ol, [
                              e("p", null, [
                                w(" Emergency Contact Name: "),
                                e("b", null, y((pe = (me = s.value) == null ? void 0 : me.user) == null ? void 0 : pe.emergencyContactName), 1)
                              ])
                            ])
                          ]),
                          e("div", Il, [
                            e("div", El, [
                              e("p", null, [
                                w(" Emergency Contact Number: "),
                                e("b", null, y((fe = (_e = s.value) == null ? void 0 : _e.user) == null ? void 0 : fe.emergencyContactPhone), 1)
                              ])
                            ]),
                            e("div", Nl, [
                              e("p", null, [
                                w(" Emergency Contact Relationship: "),
                                e("b", null, y((ye = (be = s.value) == null ? void 0 : be.user) == null ? void 0 : ye.emergencyContactRelationship), 1)
                              ])
                            ])
                          ])
                        ])
                      ]))
                    ]),
                    e("div", Rl, [
                      T(x, {
                        text: "Close",
                        type: "button",
                        variant: "primary",
                        onOnClick: _[1] || (_[1] = (he) => m.value = !1)
                      })
                    ])
                  ])
                ])
              ])
            ])
          ];
        }),
        _: 1
      })) : r("", !0),
      t.value ? (l(), $(D, {
        key: 1,
        title: "ERROR",
        message: Y(B),
        closable: !1,
        onOnOk: _[2] || (_[2] = (v) => t.value = !1)
      }, null, 8, ["message"])) : r("", !0)
    ], 64));
  }
});
const Xe = /* @__PURE__ */ ae(Ll, [["__scopeId", "data-v-52330587"]]), Ue = (p) => (re("data-v-3c9d3691"), p = p(), de(), p), Al = { class: "table-responsive" }, wl = { class: "table" }, Ul = /* @__PURE__ */ Ue(() => /* @__PURE__ */ e("th", null, "FIRST NAME", -1)), Ml = /* @__PURE__ */ Ue(() => /* @__PURE__ */ e("th", null, "LAST NAME", -1)), Tl = { key: 0 }, Dl = { key: 1 }, xl = { key: 2 }, Vl = ["index"], Bl = { key: 0 }, Hl = { key: 1 }, Wl = ["onClick"], Yl = { key: 2 }, Fl = { key: 0 }, Pl = /* @__PURE__ */ Ue(() => /* @__PURE__ */ e("td", {
  colspan: "4",
  class: "tableMessageNoRecords"
}, " There are no users enrolled in this class ", -1)), ql = [
  Pl
], Gl = /* @__PURE__ */ W({
  __name: "AdminBookedUsersList",
  props: {
    enrollments: {},
    isLoading: { type: Boolean },
    showEditOptions: { type: Boolean, default: !1 }
  },
  emits: ["afterCancelMemberReservation"],
  setup(p, { emit: E }) {
    const h = E, k = X("gqlApiService"), m = o(null), t = o(!1), s = o(!1), f = o(!1), i = o(!1);
    function d(O) {
      t.value = !1, m.value = O, s.value = !0;
    }
    function _() {
      S(m.value, !1);
    }
    function v() {
      S(m.value, !0);
    }
    async function S(O, C) {
      t.value = !0;
      const u = await k.removeUserFromClass(O, C);
      t.value = !1, s.value = !1, f.value = !1, u === "CancelUserEnrollmentSuccess" ? h("afterCancelMemberReservation") : u === "LateCancellationRequiredError" ? (s.value = !1, f.value = !0) : i.value = !0;
    }
    return (O, C) => (l(), a(V, null, [
      e("div", Al, [
        e("table", wl, [
          e("thead", null, [
            e("tr", null, [
              Ul,
              Ml,
              O.showEditOptions ? (l(), a("th", Tl, "SIGN IN")) : r("", !0),
              O.showEditOptions ? (l(), a("th", Dl, "CANCEL RESERVATION")) : r("", !0),
              O.showEditOptions ? (l(), a("th", xl, "VIEW PROFILE")) : r("", !0)
            ])
          ]),
          e("tbody", null, [
            (l(!0), a(V, null, le(O.enrollments, (u, R) => {
              var c, n, I, g, L, A, U, M, G, K;
              return l(), a("tr", {
                key: u.id,
                index: R
              }, [
                e("td", null, y((I = (n = (c = u.identifiableSiteUser) == null ? void 0 : c.identifiableUser) == null ? void 0 : n.user) == null ? void 0 : I.firstName), 1),
                e("td", null, y((A = (L = (g = u.identifiableSiteUser) == null ? void 0 : g.identifiableUser) == null ? void 0 : L.user) == null ? void 0 : A.lastName), 1),
                O.showEditOptions ? (l(), a("td", Bl, [
                  u.id != null && u.isCheckedIn != null ? (l(), $(Je, {
                    key: 0,
                    "enrollment-id": u.id,
                    "is-checked-in": u.isCheckedIn,
                    onAfterCheckInCheckOut: C[0] || (C[0] = (ie) => h("afterCancelMemberReservation"))
                  }, null, 8, ["enrollment-id", "is-checked-in"])) : r("", !0)
                ])) : r("", !0),
                O.showEditOptions ? (l(), a("td", Hl, [
                  e("button", {
                    class: "btn btn-primary",
                    type: "button",
                    onClick: (ie) => d(u.id)
                  }, " CANCEL BOOKING ", 8, Wl)
                ])) : r("", !0),
                O.showEditOptions ? (l(), a("td", Yl, [
                  (M = (U = u.identifiableSiteUser) == null ? void 0 : U.identifiableUser) != null && M.id ? (l(), $(Xe, {
                    key: 0,
                    "user-id": (K = (G = u.identifiableSiteUser) == null ? void 0 : G.identifiableUser) == null ? void 0 : K.id
                  }, null, 8, ["user-id"])) : r("", !0)
                ])) : r("", !0)
              ], 8, Vl);
            }), 128)),
            !O.isLoading && O.enrollments.length === 0 ? (l(), a("tr", Fl, ql)) : r("", !0)
          ])
        ])
      ]),
      s.value ? (l(), $(D, {
        key: 0,
        title: "CANCEL BOOKING",
        message: "Are you sure you want to proceed?",
        "cancel-text": "No",
        "ok-text": "Yes",
        "ok-loading": t.value,
        onOnCancel: C[1] || (C[1] = (u) => s.value = !1),
        onOnOk: C[2] || (C[2] = (u) => _())
      }, null, 8, ["ok-loading"])) : r("", !0),
      f.value ? (l(), $(D, {
        key: 1,
        title: "Warning",
        message: "You are outside the early cancellation window. you can only make a late cancellaiton.",
        "cancel-button-text": "No",
        "confirm-button-text": "Confirm",
        onOnCancel: C[3] || (C[3] = (u) => f.value = !1),
        "ok-loading": t.value,
        onOnOk: C[4] || (C[4] = (u) => v())
      }, null, 8, ["ok-loading"])) : r("", !0),
      i.value ? (l(), $(D, {
        key: 2,
        title: "Error",
        message: Y(B),
        "cancel-text": null,
        onOnOk: C[5] || (C[5] = (u) => i.value = !1)
      }, null, 8, ["message"])) : r("", !0)
    ], 64));
  }
});
const Kl = /* @__PURE__ */ ae(Gl, [["__scopeId", "data-v-3c9d3691"]]), jl = "THE USER HAS BEEN ADDED TO THE WAITLIST SUCCESSFULLY.", Zl = { class: "row" }, zl = { class: "col-8" }, Ql = ["innerHTML"], Jl = { class: "col-4" }, Xl = ["disabled"], et = {
  key: 0,
  class: "spinner-border spinner-border-sm",
  role: "status",
  "aria-hidden": "true"
}, st = /* @__PURE__ */ e("br", null, null, -1), Ne = /* @__PURE__ */ W({
  __name: "EnrollSelectedMemberComponent",
  props: {
    classId: {},
    spotNumber: {},
    enrollButtonText: {},
    isWaitlistBooking: { type: Boolean }
  },
  emits: ["afterEnrolling"],
  setup(p, { emit: E }) {
    const h = X("gqlApiService"), k = p, m = E, t = o([]), s = o(!1), f = o(null), i = o(!1), d = o(""), _ = o(!1), v = o(""), S = o(!1), O = o();
    function C() {
      u(k.classId, f.value.id, k.spotNumber, !0);
    }
    async function u(g, L, A, U) {
      var G, K;
      s.value = !0;
      const M = await h.bookUserIntoClass(
        g,
        L,
        A,
        U,
        k.isWaitlistBooking
      );
      s.value = !1, M === "BookClassSuccess" ? (t.value = [], f.value = null, (G = O.value) == null || G.clearInput(), S.value = !1, m("afterEnrolling")) : M === "AddedToWaitlistSuccess" ? (t.value = [], f.value = null, (K = O.value) == null || K.clearInput(), S.value = !1, v.value = jl, _.value = !0, m("afterEnrolling")) : M === "PaymentRequiredError" ? k.isWaitlistBooking ? (d.value = "This client has no credits in his account.", i.value = !0) : S.value = !0 : (M == "ClassIsFullError" ? d.value = ss : M === "ClientIsOutsideSchedulingWindowError" ? d.value = ze : M === "ClientIsAlreadyBookedError" ? d.value = ls : M === "BookingOverlapsAnotherOneError" ? d.value = ts : M == "WaitlistFullError" ? d.value = ns : M === "ClientIsAlreadyOnWaitlistError" ? d.value = as : d.value = B, i.value = !0);
    }
    function R(g) {
      f.value = g;
    }
    async function c(g) {
      t.value = [], f.value = null, !(g.input.length < 3) && (s.value = !0, t.value = await h.searchSiteUser(
        q().site,
        g.input
      ), s.value = !1);
    }
    function n(g) {
    }
    function I(g) {
      var L, A, U, M, G, K;
      return ((A = (L = g.identifiableUser) == null ? void 0 : L.user) == null ? void 0 : A.firstName) + " " + ((M = (U = g.identifiableUser) == null ? void 0 : U.user) == null ? void 0 : M.lastName) + " - " + ((K = (G = g.identifiableUser) == null ? void 0 : G.user) == null ? void 0 : K.email);
    }
    return (g, L) => {
      const A = es("vue3-simple-typeahead");
      return l(), a(V, null, [
        e("div", Zl, [
          e("div", zl, [
            T(A, {
              id: "typeahead_users",
              class: "custom-select",
              placeholder: "Please enter 3 or more characters",
              items: t.value,
              minInputLength: 3,
              onSelectItem: R,
              onOnInput: c,
              onOnBlur: n,
              itemProjection: I,
              ref_key: "refSimpleTypeahead",
              ref: O
            }, {
              "list-item-text": ke((U) => [
                e("span", {
                  innerHTML: U.boldMatchText(U.itemProjection(U.item))
                }, null, 8, Ql)
              ]),
              _: 1
            }, 8, ["items"])
          ]),
          e("div", Jl, [
            e("button", {
              class: "btn btn-primary",
              type: "button",
              disabled: f.value === null || f.value === void 0 || s.value,
              onClick: L[0] || (L[0] = (U) => C())
            }, [
              w(y(k.enrollButtonText) + " ", 1),
              s.value ? (l(), a("span", et)) : r("", !0)
            ], 8, Xl)
          ])
        ]),
        st,
        S.value ? (l(), $(D, {
          key: 0,
          title: "Warning",
          message: "This client has no credits in his account. Do you want to continue?",
          "cancel-text": "No",
          "ok-text": "Yes",
          onOnCancel: L[1] || (L[1] = (U) => S.value = !1),
          "ok-loading": s.value,
          onOnOk: L[2] || (L[2] = (U) => {
            var M;
            return u(k.classId, (M = f.value) == null ? void 0 : M.id, k.spotNumber, !1);
          })
        }, null, 8, ["ok-loading"])) : r("", !0),
        i.value ? (l(), $(D, {
          key: 1,
          title: "Error",
          message: d.value,
          "cancel-text": null,
          onOnOk: L[3] || (L[3] = (U) => i.value = !1)
        }, null, 8, ["message"])) : r("", !0),
        _.value ? (l(), $(D, {
          key: 2,
          title: "SUCCESS",
          message: v.value,
          "cancel-text": null,
          onOnOk: L[4] || (L[4] = (U) => _.value = !1)
        }, null, 8, ["message"])) : r("", !0)
      ], 64);
    };
  }
}), lt = { class: "modal-mask" }, tt = { class: "modal-wrapper" }, nt = {
  class: "modal-dialog",
  role: "document"
}, at = { class: "modal-content" }, ot = { class: "modal-header border-0" }, it = /* @__PURE__ */ e("h5", { class: "modal-title" }, "CHANGE LAYOUT", -1), ut = {
  type: "button",
  class: "close",
  "data-dismiss": "modal",
  "aria-label": "Close"
}, rt = { class: "modal-body" }, dt = /* @__PURE__ */ e("label", {
  for: "countryRegistration",
  class: "input-label"
}, "Layout Options:", -1), ct = /* @__PURE__ */ e("option", { value: null }, "-- NO ROOM LAYOUT --", -1), vt = ["value"], mt = { class: "modal-footer border-0" }, pt = /* @__PURE__ */ W({
  __name: "ChangeLayoutClass",
  props: {
    classId: {},
    roomLayoutId: {},
    maxCapacity: {}
  },
  emits: ["afterChangingRoomLayout"],
  setup(p, { emit: E }) {
    const h = X("gqlApiService"), k = p, m = E, t = o(!1), s = o(!1), f = o(!1), i = o(!1), d = o(""), _ = o(null), v = o(!1), S = o(!1), O = o([]);
    function C() {
      u(), s.value = !0;
    }
    async function u() {
      _.value = null, d.value = "", O.value = [], i.value = !0, O.value = await h.roomLayouts(
        q().site,
        k.maxCapacity
      ), i.value = !1;
      const c = O.value.find((n) => n.id === k.roomLayoutId);
      c && (d.value = c.name, _.value = c.id);
    }
    async function R() {
      t.value = !0;
      const c = await h.editClass({
        classId: k.classId,
        roomLayoutId: _.value
      });
      t.value = !1, f.value = !1, s.value = !1, c.__typename === "EditClassSuccessResult" ? (m("afterChangingRoomLayout"), S.value = !0) : v.value = !0;
    }
    return (c, n) => (l(), a(V, null, [
      T(x, {
        text: "CHANGE LAYOUT",
        type: "button",
        onOnClick: n[0] || (n[0] = (I) => C())
      }),
      s.value ? (l(), $(Ie, {
        key: 0,
        name: "modal"
      }, {
        default: ke(() => [
          e("div", lt, [
            e("div", tt, [
              e("div", nt, [
                e("div", at, [
                  e("div", ot, [
                    it,
                    e("button", ut, [
                      e("span", {
                        "aria-hidden": "true",
                        onClick: n[1] || (n[1] = (I) => s.value = !1)
                      }, "\xD7")
                    ])
                  ]),
                  e("div", rt, [
                    e("p", null, [
                      w(" Current Layout: "),
                      e("b", null, y(d.value), 1)
                    ]),
                    dt,
                    Le(e("select", {
                      class: "custom-select",
                      "onUpdate:modelValue": n[2] || (n[2] = (I) => _.value = I),
                      id: "countryRegistration",
                      required: ""
                    }, [
                      ct,
                      (l(!0), a(V, null, le(O.value, (I, g) => (l(), a("option", {
                        key: g,
                        value: I.id
                      }, y(I.name), 9, vt))), 128))
                    ], 512), [
                      [Qe, _.value]
                    ])
                  ]),
                  e("div", mt, [
                    _.value !== c.roomLayoutId && !i.value ? (l(), $(x, {
                      key: 0,
                      text: "CHANGE",
                      type: "button",
                      "is-loading": t.value,
                      disabled: _.value === c.roomLayoutId && !i.value,
                      onOnClick: n[3] || (n[3] = (I) => f.value = !0)
                    }, null, 8, ["is-loading", "disabled"])) : r("", !0),
                    T(x, {
                      text: "Cancel",
                      type: "button",
                      disabled: t.value,
                      variant: "secondary",
                      onOnClick: n[4] || (n[4] = (I) => s.value = !1)
                    }, null, 8, ["disabled"])
                  ])
                ])
              ])
            ])
          ])
        ]),
        _: 1
      })) : r("", !0),
      f.value ? (l(), $(D, {
        key: 1,
        title: "Confirm",
        message: "ARE YOU SURE YOU WANT TO CHANGE THE ROOM LAYOUT FOR THIS CLASS?",
        "cancel-text": "No",
        "ok-text": "Yes",
        "ok-loading": t.value,
        onOnCancel: n[5] || (n[5] = (I) => f.value = !1),
        onOnOk: n[6] || (n[6] = (I) => R())
      }, null, 8, ["ok-loading"])) : r("", !0),
      S.value ? (l(), $(D, {
        key: 2,
        title: "SUCCESS",
        message: "ROOM LAYOUT ASSIGNED SUCCESSFULLY.",
        "cancel-text": null,
        "ok-text": "OK",
        onOnOk: n[7] || (n[7] = (I) => S.value = !1)
      })) : r("", !0),
      v.value ? (l(), $(D, {
        key: 3,
        title: "ERROR",
        message: Y(B),
        "cancel-text": null,
        "ok-text": "OK",
        onOnOk: n[8] || (n[8] = (I) => v.value = !1)
      }, null, 8, ["message"])) : r("", !0)
    ], 64));
  }
}), _t = { class: "modal-mask" }, ft = { class: "modal-wrapper" }, bt = {
  class: "modal-dialog modal-lg",
  role: "document"
}, yt = { class: "modal-content" }, kt = { class: "modal-header border-0" }, St = /* @__PURE__ */ e("h5", { class: "modal-title" }, "Waitlist Entries", -1), Ct = {
  type: "button",
  class: "close",
  "data-dismiss": "modal",
  "aria-label": "Close"
}, ht = { class: "modal-body" }, gt = { class: "table-responsive" }, $t = { class: "table table-sm" }, Ot = /* @__PURE__ */ e("thead", null, [
  /* @__PURE__ */ e("tr", { class: "text-center" }, [
    /* @__PURE__ */ e("th", null, "NO"),
    /* @__PURE__ */ e("th", null, "FIRST NAME"),
    /* @__PURE__ */ e("th", null, "LAST NAME"),
    /* @__PURE__ */ e("th", null, "ACTION")
  ])
], -1), It = { class: "text-center align-middle" }, Et = { class: "text-center align-middle" }, Nt = { class: "text-center align-middle" }, Rt = { class: "text-center align-middle" }, Lt = { key: 0 }, At = /* @__PURE__ */ e("td", {
  colspan: "4",
  class: "text-center"
}, [
  /* @__PURE__ */ e("p", null, "NO DATA AVAILABLE IN TABLE")
], -1), wt = [
  At
], Ut = {
  key: 1,
  class: "text-center"
}, Mt = /* @__PURE__ */ e("td", { colspan: "4" }, "LOADING...", -1), Tt = [
  Mt
], Dt = /* @__PURE__ */ W({
  __name: "ViewWaitlistEntries",
  props: {
    classId: {}
  },
  setup(p) {
    const E = X("gqlApiService"), h = p, k = o(!1), m = o(!1), t = o(!1), s = o(""), f = o(!1), i = o(!1), d = o(!1), _ = o(null), v = o([]);
    function S() {
      O(), f.value = !0;
    }
    async function O() {
      v.value = [];
      try {
        i.value = !0, v.value = await E.getClassWaitlistEntries(
          q().site,
          h.classId
        );
      } catch {
        s.value = B, k.value = !0;
      } finally {
        i.value = !1;
      }
    }
    async function C(R) {
      try {
        d.value = !0;
        const c = await E.removeUserFromWaitlist(
          R
        );
        c.success ? (m.value = !0, O()) : c.__typename === "WaitlistEntryNotFoundError" ? (s.value = os, k.value = !0) : (s.value = B, k.value = !0);
      } catch {
        s.value = B, k.value = !0;
      } finally {
        d.value = !1, t.value = !1;
      }
    }
    function u(R) {
      _.value = R.id, t.value = !0;
    }
    return (R, c) => (l(), a(V, null, [
      T(x, {
        text: "View Waitlist",
        type: "button",
        onOnClick: c[0] || (c[0] = (n) => S())
      }),
      f.value ? (l(), $(Ie, {
        key: 0,
        name: "modal"
      }, {
        default: ke(() => [
          e("div", _t, [
            e("div", ft, [
              e("div", bt, [
                e("div", yt, [
                  e("div", kt, [
                    St,
                    e("button", Ct, [
                      e("span", {
                        "aria-hidden": "true",
                        onClick: c[1] || (c[1] = (n) => f.value = !1)
                      }, "\xD7")
                    ])
                  ]),
                  e("div", ht, [
                    e("div", gt, [
                      e("table", $t, [
                        Ot,
                        e("tbody", null, [
                          (l(!0), a(V, null, le(v.value, (n, I) => {
                            var g, L, A, U;
                            return l(), a("tr", { key: I }, [
                              e("td", It, y(I + 1), 1),
                              e("td", Et, y((L = (g = n.identifiableSiteUser) == null ? void 0 : g.identifiableUser.user) == null ? void 0 : L.firstName.toUpperCase()), 1),
                              e("td", Nt, y((U = (A = n.identifiableSiteUser) == null ? void 0 : A.identifiableUser.user) == null ? void 0 : U.lastName.toUpperCase()), 1),
                              e("td", Rt, [
                                T(x, {
                                  text: "REMOVE",
                                  type: "button",
                                  onOnClick: (M) => u(n)
                                }, null, 8, ["onOnClick"])
                              ])
                            ]);
                          }), 128)),
                          v.value.length === 0 && !i.value ? (l(), a("tr", Lt, wt)) : r("", !0),
                          i.value ? (l(), a("tr", Ut, Tt)) : r("", !0)
                        ])
                      ])
                    ])
                  ])
                ])
              ])
            ])
          ])
        ]),
        _: 1
      })) : r("", !0),
      k.value ? (l(), $(D, {
        key: 1,
        title: "ERROR",
        message: s.value,
        closable: !1,
        "cancel-text": null,
        onOnOk: c[2] || (c[2] = (n) => k.value = !1)
      }, null, 8, ["message"])) : r("", !0),
      m.value ? (l(), $(D, {
        key: 2,
        title: "SUCCESS",
        message: "THE USER HAS BEEN SUCCESSFULLY REMOVED FROM THE WAITLIST.",
        "cancel-text": null,
        "ok-text": "OK",
        onOnOk: c[3] || (c[3] = (n) => m.value = !1)
      })) : r("", !0),
      t.value ? (l(), $(D, {
        key: 3,
        title: "CONFIRM",
        message: "ARE YOU SURE YOU WANT TO REMOVE THE USER FROM THE WAITLIST?",
        "cancel-text": "No",
        "ok-text": "Yes",
        "ok-loading": d.value,
        onOnCancel: c[4] || (c[4] = (n) => t.value = !1),
        onOnOk: c[5] || (c[5] = (n) => C(_.value))
      }, null, 8, ["ok-loading"])) : r("", !0)
    ], 64));
  }
}), xt = { class: "modal-mask" }, Vt = { class: "modal-wrapper" }, Bt = {
  class: "modal-dialog",
  role: "document"
}, Ht = { class: "modal-content" }, Wt = { class: "modal-header border-0" }, Yt = /* @__PURE__ */ e("h5", { class: "modal-title" }, "On Hold Spots", -1), Ft = {
  type: "button",
  class: "close",
  "data-dismiss": "modal",
  "aria-label": "Close"
}, Pt = { class: "modal-body" }, qt = /* @__PURE__ */ e("label", {
  for: "onHoldSpotsInput",
  class: "input-label"
}, "On Hold Spots:", -1), Gt = { class: "modal-footer border-0" }, Kt = /* @__PURE__ */ W({
  __name: "SetOnHoldSpots",
  props: {
    classId: {},
    onHoldSpots: {}
  },
  emits: ["afterSetOnHoldSpots"],
  setup(p, { emit: E }) {
    const h = X("gqlApiService"), k = o(!1), m = o(!1), t = o(!1), s = is({
      onHoldSpots: 0
    }), f = us(() => ({
      onHoldSpots: {
        required: Ge.withMessage("On Hold Spots is required", cs),
        minValue: Ge.withMessage("On Hold Spots must be higher than 0", vs(0))
      }
    })), i = rs(f, s), d = p, _ = E;
    function v() {
      s.onHoldSpots = d.onHoldSpots, k.value = !0;
    }
    async function S() {
      if (await i.value.$validate()) {
        m.value = !0;
        const C = await h.editClass({
          classId: d.classId,
          onHoldSpots: s.onHoldSpots
        });
        m.value = !1, C.updated ? (_("afterSetOnHoldSpots"), k.value = !1) : t.value = !0;
      }
    }
    return (O, C) => (l(), a(V, null, [
      T(x, {
        text: "Set On Hold Spots (" + d.onHoldSpots + ")",
        type: "button",
        onOnClick: C[0] || (C[0] = (u) => v())
      }, null, 8, ["text"]),
      k.value ? (l(), $(Ie, {
        key: 0,
        name: "modal"
      }, {
        default: ke(() => [
          e("div", xt, [
            e("div", Vt, [
              e("div", Bt, [
                e("div", Ht, [
                  e("div", Wt, [
                    Yt,
                    e("button", Ft, [
                      e("span", {
                        "aria-hidden": "true",
                        onClick: C[1] || (C[1] = (u) => k.value = !1)
                      }, "\xD7")
                    ])
                  ]),
                  e("div", Pt, [
                    e("p", null, [
                      w(" Current On Hold Spots: "),
                      e("b", null, y(d.onHoldSpots), 1)
                    ]),
                    qt,
                    Le(e("input", {
                      id: "onHoldSpotsInput",
                      class: "form-control",
                      type: "number",
                      placeholder: "On Hold Spots",
                      required: "",
                      "onUpdate:modelValue": C[2] || (C[2] = (u) => s.onHoldSpots = u)
                    }, null, 512), [
                      [ds, s.onHoldSpots]
                    ]),
                    (l(!0), a(V, null, le(Y(i).onHoldSpots.$errors, (u) => (l(), a("small", {
                      key: u.$uid,
                      class: "form-text",
                      style: { color: "red" }
                    }, y(u.$message), 1))), 128))
                  ]),
                  e("div", Gt, [
                    T(x, {
                      text: "Set On Hold Spots",
                      type: "button",
                      "is-loading": m.value,
                      onOnClick: C[3] || (C[3] = (u) => S())
                    }, null, 8, ["is-loading"]),
                    T(x, {
                      text: "Cancel",
                      type: "button",
                      disabled: m.value,
                      variant: "secondary",
                      onOnClick: C[4] || (C[4] = (u) => k.value = !1)
                    }, null, 8, ["disabled"])
                  ])
                ])
              ])
            ])
          ])
        ]),
        _: 1
      })) : r("", !0),
      t.value ? (l(), $(D, {
        key: 1,
        title: "ERROR",
        message: Y(B),
        "cancel-text": null,
        "ok-text": "OK",
        onOnOk: C[5] || (C[5] = (u) => t.value = !1)
      }, null, 8, ["message"])) : r("", !0)
    ], 64));
  }
}), jt = /* @__PURE__ */ W({
  __name: "SyncClassButton",
  props: {
    classId: {}
  },
  emits: ["afterSyncClass"],
  setup(p, { emit: E }) {
    const h = p, k = E, m = X("gqlApiService"), t = o(!1), s = o(!1);
    async function f() {
      t.value = !0;
      try {
        await m.syncClass(q().site, h.classId), k("afterSyncClass");
      } catch {
        s.value = !0;
      } finally {
        t.value = !1;
      }
    }
    return (i, d) => (l(), a(V, null, [
      T(x, {
        text: "SYNC CLASS",
        type: "button",
        "is-loading": t.value,
        onOnClick: f
      }, null, 8, ["is-loading"]),
      s.value ? (l(), $(D, {
        key: 0,
        title: "ERROR",
        message: Y(B),
        closable: !1,
        onOnOk: d[0] || (d[0] = (_) => s.value = !1),
        "cancel-text": null
      }, null, 8, ["message"])) : r("", !0)
    ], 64));
  }
});
var $e = /* @__PURE__ */ ((p) => (p.ROLE_SUPER_ADMIN = "ROLE_SUPER_ADMIN", p.ROLE_ADMIN_MANAGER = "ROLE_ADMIN_MANAGER", p.ROLE_STAFF = "ROLE_STAFF", p.ROLE_USER = "ROLE_USER", p.ROLE_MINDBODY_USER = "ROLE_MINDBODY_USER", p))($e || {});
const oe = (p) => (re("data-v-ed7a83e8"), p = p(), de(), p), Zt = { class: "ClassDetails" }, zt = { key: 0 }, Qt = /* @__PURE__ */ oe(() => /* @__PURE__ */ e("h2", { style: { margin: "0 auto", "text-align": "center" } }, "Please select a class", -1)), Jt = [
  Qt
], Xt = { key: 1 }, en = { class: "row" }, sn = { class: "col-12 text-center" }, ln = { key: 2 }, tn = { class: "row" }, nn = { class: "col-md-10" }, an = { class: "col-md-2" }, on = {
  key: 0,
  class: "row"
}, un = { class: "col-md-12" }, rn = {
  key: 1,
  class: "row"
}, dn = { class: "col-md-12" }, cn = /* @__PURE__ */ oe(() => /* @__PURE__ */ e("hr", null, null, -1)), vn = /* @__PURE__ */ oe(() => /* @__PURE__ */ e("hr", null, null, -1)), mn = /* @__PURE__ */ oe(() => /* @__PURE__ */ e("br", null, null, -1)), pn = { key: 5 }, _n = { key: 0 }, fn = /* @__PURE__ */ oe(() => /* @__PURE__ */ e("h2", null, "Choose an action :", -1)), bn = { key: 1 }, yn = /* @__PURE__ */ oe(() => /* @__PURE__ */ e("h2", null, "Spot is under maintenance", -1)), kn = { key: 2 }, Sn = { key: 3 }, Cn = /* @__PURE__ */ oe(() => /* @__PURE__ */ e("hr", null, null, -1)), hn = /* @__PURE__ */ W({
  __name: "ClassDetails",
  props: {
    classId: {}
  },
  emits: ["availableSpotsChanged"],
  setup(p, { emit: E }) {
    const h = p, k = E;
    Re(
      () => h.classId,
      (N) => {
        g();
      }
    );
    const m = X("gqlApiService"), t = o(!1), s = o(null), f = o([]), i = o(!1), d = o(!1), _ = o(0), v = o(0), S = o(!1), O = o(!1), C = o(!1), u = o({
      title: "",
      message: "",
      isLoading: !1,
      isVisible: !1
    }), R = o({
      isLoading: !1,
      isVisible: !1
    }), c = o({
      isLoading: !1,
      isVisible: !1
    }), n = o({
      spotNumber: null,
      isBooked: null,
      enabled: null,
      enrollmentId: null,
      identifiableUser: null
    }), I = o({
      title: "",
      message: "",
      isLoading: !1,
      isVisible: !1
    });
    Oe(() => {
      g(), S.value = ge.userHasRole($e.ROLE_STAFF), O.value = ge.userHasRole($e.ROLE_SUPER_ADMIN);
    });
    async function g() {
      var N, b, z, Z, F, Q;
      h.classId !== null && (n.value = {}, t.value = !0, s.value = await m.getClassInfoAdmin(
        q().site,
        h.classId
      ), C.value = (b = (N = s.value) == null ? void 0 : N.class.waitListAvailable) != null ? b : !1, f.value = (Z = (z = s.value) == null ? void 0 : z.enrollments.filter(
        (j) => j.enrollmentStatus !== "cancelled" && j.enrollmentStatus !== "lateCancelled"
      )) != null ? Z : [], t.value = !1, _.value = (Q = (F = f.value) == null ? void 0 : F.filter((j) => j.isCheckedIn === !0).length) != null ? Q : 0);
    }
    async function L(N) {
      var b, z;
      if (v.value === 2 && await ie(N.spotNumber), v.value === 3)
        await Se(N.spotNumber);
      else {
        v.value = 0;
        for (let Z = 0; Z < s.value.roomLayout.matrix.length; Z++) {
          const F = s.value.roomLayout.matrix[Z];
          if (F.icon === "spot" && F.spotNumber === N.spotNumber) {
            let Q = !1, j, te, ne;
            if (f.value != null)
              for (let se = 0; se < f.value.length; se++) {
                const J = f.value[se];
                if (j = J.isCheckedIn, F.spotNumber === J.spotNumber && ((b = J.identifiableSiteUser) == null ? void 0 : b.identifiableUser)) {
                  Q = !0, ne = (z = J.identifiableSiteUser) == null ? void 0 : z.identifiableUser, te = J.id;
                  break;
                }
              }
            n.value = {
              spotNumber: F.spotNumber,
              isBooked: Q,
              enabled: F.enabled,
              enrollmentId: te,
              isCheckedIn: j,
              identifiableUser: ne
            };
            break;
          }
        }
      }
    }
    async function A() {
      if (h.classId === null)
        return;
      i.value = !0;
      const N = await m.disableSpot(h.classId, n.value.spotNumber);
      i.value = !1, N === "Success" ? (await g(), k("availableSpotsChanged")) : N === "SpotNotFoundError" ? (u.value.message = Ke, u.value.isVisible = !0) : (u.value.message = B, u.value.isVisible = !0);
    }
    async function U() {
      if (h.classId === null)
        return;
      i.value = !0;
      const N = await m.enableSpot(h.classId, n.value.spotNumber);
      i.value = !1, N === "Success" ? (await g(), k("availableSpotsChanged")) : N === "SpotNotFoundError" ? (u.value.message = Ke, u.value.isVisible = !0) : (u.value.message = B, u.value.isVisible = !0);
    }
    function M() {
      R.value.isLoading = !1, R.value.isVisible = !0;
    }
    async function G() {
      R.value.isLoading = !0;
      const N = await m.removeUserFromClass(n.value.enrollmentId, !1);
      R.value.isLoading = !1, R.value.isVisible = !1, N === "CancelUserEnrollmentSuccess" ? (await g(), k("availableSpotsChanged")) : N === "LateCancellationRequiredError" ? (c.value.isLoading = !1, c.value.isVisible = !0) : (u.value.message = B, u.value.isVisible = !0);
    }
    async function K() {
      c.value.isLoading = !0;
      const N = await m.removeUserFromClass(n.value.enrollmentId, !0);
      c.value.isLoading = !1, c.value.isVisible = !1, N === "CancelUserEnrollmentSuccess" ? (await g(), k("availableSpotsChanged")) : N === "LateCancellationRequiredError" ? (c.value.isLoading = !1, c.value.isVisible = !0) : (u.value.message = B, u.value.isVisible = !0);
    }
    async function ie(N) {
      d.value = !0;
      try {
        const b = await m.editEnrollment(q().site, {
          enrollmentId: n.value.enrollmentId,
          newSpotNumber: N
        });
        b.__typename !== "Enrollment" && (b.__typename === "SpotAlreadyReservedError" ? u.value.message = ms : b.__typename === "ClientIsOutsideSchedulingWindowError" ? u.value.message = ze : b.__typename === "TryToSwitchToSameSpotError" ? u.value.message = je : u.value.message = B, u.value.isVisible = !0);
      } catch {
        u.value.message = B, u.value.isVisible = !0;
      } finally {
        n.value = {}, v.value = 0, await g(), d.value = !1;
      }
    }
    async function Se(N) {
      d.value = !0;
      try {
        const b = await m.swapSpot(q().site, {
          enrollmentId: n.value.enrollmentId,
          newSpotNumber: N
        });
        b.__typename !== "SwapSpotSuccess" && (b.__typename === "TryToSwitchToSameSpotError" && (u.value.message = je), u.value.isVisible = !0);
      } catch {
        u.value.message = B, u.value.isVisible = !0;
      } finally {
        n.value = {}, v.value = 0, await g(), d.value = !1;
      }
    }
    async function ue() {
      k("availableSpotsChanged"), await g(), Ce();
    }
    async function Ce() {
      await new Promise((N) => setTimeout(N, 5e3)), C.value = await m.classWaitlistIsEnabled(q().site, h.classId);
    }
    return (N, b) => {
      var z, Z, F, Q, j, te, ne, se, J, ce, ve, me, pe, _e, fe, be, ye, he, Te, De, xe, Ve, Be, He, We, Ye, Fe, Pe;
      return l(), a(V, null, [
        e("div", Zt, [
          N.classId === null ? (l(), a("div", zt, Jt)) : t.value ? (l(), a("div", Xt, [
            e("div", en, [
              e("div", sn, [
                T(we, { text: "Loading..." })
              ])
            ])
          ])) : (l(), a("div", ln, [
            e("div", tn, [
              e("div", nn, [
                e("h4", null, y((Z = (z = s.value) == null ? void 0 : z.class) == null ? void 0 : Z.name) + " - " + y((F = s.value) == null ? void 0 : F.class.instructorName) + " (" + y(Y(P)((Q = s.value) == null ? void 0 : Q.class.startWithNoTimeZone).format("DD/MM/YYYY")) + ") ", 1),
                e("h5", null, " Time : " + y(Y(P)((j = s.value) == null ? void 0 : j.class.startWithNoTimeZone).format("hh:mm A")) + " | Duration : " + y((ne = (te = s.value) == null ? void 0 : te.class) == null ? void 0 : ne.duration) + " mins ", 1)
              ]),
              e("div", an, [
                ((se = s.value) == null ? void 0 : se.class.id) && O.value ? (l(), $(jt, {
                  key: 0,
                  "class-id": (J = s.value) == null ? void 0 : J.class.id,
                  onAfterSyncClass: b[0] || (b[0] = (H) => g())
                }, null, 8, ["class-id"])) : r("", !0)
              ])
            ]),
            S.value ? (l(), a("div", on, [
              e("div", un, [
                s.value ? (l(), $(pt, {
                  key: 0,
                  "class-id": N.classId,
                  "room-layout-id": (ve = (ce = s.value) == null ? void 0 : ce.roomLayout) == null ? void 0 : ve.id,
                  "max-capacity": (pe = (me = s.value) == null ? void 0 : me.class) == null ? void 0 : pe.maxCapacity,
                  onAfterChangingRoomLayout: b[1] || (b[1] = (H) => g())
                }, null, 8, ["class-id", "room-layout-id", "max-capacity"])) : r("", !0),
                w(" \xA0 "),
                T(Dt, { "class-id": N.classId }, null, 8, ["class-id"]),
                w(" \xA0 "),
                s.value ? (l(), $(Kt, {
                  key: 1,
                  "class-id": N.classId,
                  onAfterSetOnHoldSpots: b[2] || (b[2] = (H) => g()),
                  "on-hold-spots": (_e = s.value) == null ? void 0 : _e.onHoldSpots
                }, null, 8, ["class-id", "on-hold-spots"])) : r("", !0)
              ])
            ])) : r("", !0),
            s.value !== null && C.value === !0 ? (l(), a("div", rn, [
              e("div", dn, [
                cn,
                s.value !== null && C.value === !0 && ((be = (fe = s.value) == null ? void 0 : fe.class) == null ? void 0 : be.showAsDisabled) === !1 ? (l(), $(Ne, {
                  key: 0,
                  "class-id": N.classId,
                  onAfterEnrolling: b[3] || (b[3] = (H) => g()),
                  "spot-number": null,
                  enrollButtonText: "ADD TO WAITLIST",
                  "is-waitlist-booking": !0
                }, null, 8, ["class-id"])) : r("", !0)
              ])
            ])) : r("", !0),
            vn,
            mn,
            s.value !== null && s.value.roomLayout !== null && ((ye = s.value.roomLayout) == null ? void 0 : ye.matrix) !== null ? (l(), $(Ws, {
              key: 2,
              matrix: s.value.roomLayout.matrix,
              "show-user-in-spots": !0,
              selectedSpotNumber: (he = n.value) == null ? void 0 : he.spotNumber,
              onClickSpot: L,
              enrollments: f.value,
              "spot-action": v.value,
              "spot-selection-is-disabled": !S.value
            }, null, 8, ["matrix", "selectedSpotNumber", "enrollments", "spot-action", "spot-selection-is-disabled"])) : r("", !0),
            s.value !== null && s.value.roomLayout === null && s.value.enrollments !== null && C.value === !1 && S.value ? (l(), $(Ne, {
              key: 3,
              "class-id": N.classId,
              onAfterEnrolling: b[4] || (b[4] = (H) => ue()),
              "spot-number": null,
              enrollButtonText: "BOOK",
              "is-waitlist-booking": !1
            }, null, 8, ["class-id"])) : r("", !0),
            s.value !== null && s.value.roomLayout === null && s.value.enrollments !== null ? (l(), $(Kl, {
              key: 4,
              enrollments: f.value,
              isLoading: !1,
              onAfterCancelMemberReservation: b[5] || (b[5] = (H) => ue()),
              "show-edit-options": S.value
            }, null, 8, ["enrollments", "show-edit-options"])) : r("", !0),
            S.value ? (l(), a("div", pn, [
              ((Te = n.value) == null ? void 0 : Te.isBooked) === !1 && n.value.enabled === !0 ? (l(), a("div", _n, [
                fn,
                T(x, {
                  text: "ASSIGN CLIENT",
                  type: "button",
                  onOnClick: b[6] || (b[6] = (H) => v.value = 1),
                  class: "mr-1"
                }),
                T(x, {
                  text: "Put under maintenance",
                  type: "button",
                  onOnClick: A,
                  class: "mr-1",
                  "is-loading": i.value
                }, null, 8, ["is-loading"])
              ])) : r("", !0),
              n.value.enabled === !1 ? (l(), a("div", bn, [
                yn,
                T(x, {
                  text: "Recover from maintenance",
                  type: "button",
                  onOnClick: U,
                  class: "mr-1",
                  "is-loading": i.value
                }, null, 8, ["is-loading"])
              ])) : r("", !0),
              ((De = n.value) == null ? void 0 : De.isBooked) === !0 ? (l(), a("div", kn, [
                e("h2", null, " Spot is reserved for - " + y(((Be = (Ve = (xe = n.value.identifiableUser) == null ? void 0 : xe.user) == null ? void 0 : Ve.firstName) != null ? Be : "") + " " + ((Ye = (We = (He = n.value.identifiableUser) == null ? void 0 : He.user) == null ? void 0 : We.lastName) != null ? Ye : "")), 1),
                v.value !== 2 && v.value !== 3 ? (l(), $(x, {
                  key: 0,
                  text: "CANCEL BOOKING",
                  type: "button",
                  onOnClick: M,
                  class: "mr-1"
                })) : r("", !0),
                v.value !== 3 ? (l(), $(x, {
                  key: 1,
                  text: "CHANGE SPOT",
                  "is-loading": d.value,
                  type: "button",
                  disabled: v.value === 2,
                  onOnClick: b[7] || (b[7] = (H) => v.value = 2),
                  class: "mr-1"
                }, null, 8, ["is-loading", "disabled"])) : r("", !0),
                v.value !== 2 ? (l(), $(x, {
                  key: 2,
                  type: "button",
                  text: "Swap Spot",
                  "is-loading": d.value,
                  disabled: v.value === 3,
                  onOnClick: b[8] || (b[8] = (H) => v.value = 3),
                  class: "mr-1"
                }, null, 8, ["is-loading", "disabled"])) : r("", !0),
                v.value === 2 || v.value === 3 ? (l(), $(x, {
                  key: 3,
                  disabled: d.value,
                  text: "Cancel",
                  type: "button",
                  onOnClick: b[9] || (b[9] = (H) => v.value = 0)
                }, null, 8, ["disabled"])) : r("", !0),
                n.value.enrollmentId != null && n.value.isCheckedIn != null && v.value !== 2 && v.value !== 3 ? (l(), $(Je, {
                  key: 4,
                  "enrollment-id": n.value.enrollmentId,
                  "is-checked-in": n.value.isCheckedIn,
                  onAfterCheckInCheckOut: b[10] || (b[10] = (H) => g())
                }, null, 8, ["enrollment-id", "is-checked-in"])) : r("", !0),
                ((Fe = n.value.identifiableUser) == null ? void 0 : Fe.id) && v.value !== 2 && v.value !== 3 ? (l(), $(Xe, {
                  key: 5,
                  "user-id": (Pe = n.value.identifiableUser) == null ? void 0 : Pe.id
                }, null, 8, ["user-id"])) : r("", !0)
              ])) : r("", !0),
              v.value === 1 ? (l(), a("div", Sn, [
                Cn,
                s.value !== null && n.value.spotNumber !== null && n.value.spotNumber !== void 0 ? (l(), $(Ne, {
                  key: 0,
                  "class-id": N.classId,
                  "spot-number": n.value.spotNumber,
                  enrollButtonText: "Assign",
                  onAfterEnrolling: b[11] || (b[11] = (H) => ue()),
                  "is-waitlist-booking": !1
                }, null, 8, ["class-id", "spot-number"])) : r("", !0)
              ])) : r("", !0)
            ])) : r("", !0)
          ]))
        ]),
        u.value.isVisible ? (l(), $(D, {
          key: 0,
          title: "ERROR",
          message: u.value.message,
          closable: !1,
          onOnOk: b[12] || (b[12] = (H) => u.value.isVisible = !1),
          "cancel-text": null
        }, null, 8, ["message"])) : r("", !0),
        R.value.isVisible ? (l(), $(D, {
          key: 1,
          title: "CANCEL BOOKING",
          message: "Are you sure you want to proceed?",
          "ok-loading": R.value.isLoading,
          onOnCancel: b[13] || (b[13] = (H) => R.value.isVisible = !1),
          onOnOk: b[14] || (b[14] = (H) => G()),
          closable: !1
        }, null, 8, ["ok-loading"])) : r("", !0),
        c.value.isVisible ? (l(), $(D, {
          key: 2,
          title: "Warning",
          message: Y(ps),
          isLoading: c.value.isLoading,
          onOnCancel: b[15] || (b[15] = (H) => c.value.isVisible = !1),
          "ok-text": "CONFIRM",
          onOnOk: b[16] || (b[16] = (H) => K()),
          closable: !1
        }, null, 8, ["message", "isLoading"])) : r("", !0),
        I.value.isVisible ? (l(), $(D, {
          key: 3,
          title: I.value.title,
          message: I.value.message,
          closable: !1,
          onOnOk: b[17] || (b[17] = (H) => I.value.isVisible = !1)
        }, null, 8, ["title", "message"])) : r("", !0)
      ], 64);
    };
  }
});
const gn = /* @__PURE__ */ ae(hn, [["__scopeId", "data-v-ed7a83e8"]]), $n = /* @__PURE__ */ W({
  __name: "SyncAllClassesButton",
  props: {
    disabled: { type: Boolean }
  },
  emits: ["afterSyncAllClasses"],
  setup(p, { emit: E }) {
    const h = p, k = E, m = X("gqlApiService"), t = o(!1), s = o(!1);
    async function f() {
      t.value = !0;
      try {
        await m.syncAllClasses(q().site), k("afterSyncAllClasses");
      } catch {
        s.value = !0;
      } finally {
        t.value = !1;
      }
    }
    return (i, d) => (l(), a(V, null, [
      T(x, {
        text: "SYNC ALL CLASSES",
        type: "button",
        "is-loading": t.value,
        onOnClick: f,
        disabled: h.disabled
      }, null, 8, ["is-loading", "disabled"]),
      s.value ? (l(), $(D, {
        key: 0,
        title: "ERROR",
        message: Y(B),
        closable: !1,
        onOnOk: d[0] || (d[0] = (_) => s.value = !1),
        "cancel-text": null
      }, null, 8, ["message"])) : r("", !0)
    ], 64));
  }
}), On = ["value"], In = /* @__PURE__ */ W({
  __name: "SiteSelector",
  emits: ["afterChangingSite"],
  setup(p, { emit: E }) {
    const h = E, k = o([]), m = o(q().site);
    Oe(() => {
      t();
    });
    function t() {
      k.value = ge.getAvailableSites();
    }
    function s() {
      q().setSite(m.value), h("afterChangingSite");
    }
    return (f, i) => Le((l(), a("select", {
      class: "custom-select",
      "onUpdate:modelValue": i[0] || (i[0] = (d) => m.value = d),
      onChange: i[1] || (i[1] = (d) => s()),
      id: "countryRegistration",
      required: ""
    }, [
      (l(!0), a(V, null, le(k.value, (d, _) => (l(), a("option", {
        key: _,
        value: d.serviceKey
      }, y(d.name), 9, On))), 128))
    ], 544)), [
      [Qe, m.value]
    ]);
  }
}), Me = (p) => (re("data-v-d1739890"), p = p(), de(), p), En = { class: "row ml-1" }, Nn = { class: "col-lg-7 col-md-10 col-sm-12 ml-auto mr-3" }, Rn = /* @__PURE__ */ Me(() => /* @__PURE__ */ e("hr", null, null, -1)), Ln = { class: "ReservationClassList" }, An = { id: "DateRangeSection" }, wn = { style: { display: "flex", "justify-content": "space-between", width: "100%" } }, Un = { id: "prev" }, Mn = /* @__PURE__ */ Me(() => /* @__PURE__ */ e("i", {
  class: "bi bi-caret-left-fill",
  style: { color: "black" }
}, null, -1)), Tn = [
  Mn
], Dn = {
  id: "dateRange",
  style: { "font-weight": "500" }
}, xn = { id: "next" }, Vn = /* @__PURE__ */ Me(() => /* @__PURE__ */ e("i", { class: "bi bi-caret-right-fill" }, null, -1)), Bn = [
  Vn
], Hn = {
  key: 0,
  class: "row"
}, Wn = { class: "col-12 text-center" }, Yn = { id: "ClassesSection" }, Fn = { class: "day" }, Pn = ["onClick"], qn = { style: { display: "inline-block", width: "100%", "align-self": "stretch" } }, Gn = { class: "row" }, Kn = { class: "col-12 text-center" }, jn = /* @__PURE__ */ W({
  __name: "CalendarList",
  emits: ["selectClass"],
  setup(p, { expose: E, emit: h }) {
    P.Ls.en.weekStart = 1;
    const k = X("gqlApiService"), m = o(!1), t = o(!1), s = o(P(Date()).startOf("week").toDate()), f = o(P(Date()).endOf("week").toDate()), i = o([]), d = o(!1), _ = o(null), v = h;
    Oe(() => {
      S(), d.value = ge.userHasRole($e.ROLE_SUPER_ADMIN);
    }), E({
      getCalendarClasses: S
    });
    async function S(c = !0) {
      c && u(null), i.value = [], m.value = !0;
      try {
        const n = await k.getCalendarClassesForList(
          q().site,
          s.value,
          f.value
        );
        let I = null, g = -1;
        for (let L = 0; L < n.length; L++) {
          const A = n[L];
          (I === null || !I.isSame(P(A.startWithNoTimeZone), "day")) && (g++, I = P(A.startWithNoTimeZone), i.value.push({ date: A.startWithNoTimeZone, classes: [] })), i.value[g].classes.push({
            id: A.id,
            name: A.name,
            startWithNoTimeZone: A.startWithNoTimeZone,
            maxCapacity: A.maxCapacity,
            totalBooked: A.totalBooked,
            totalUnderMaintenanceSpots: A.totalUnderMaintenanceSpots,
            showAsDisabled: A.showAsDisabled
          });
        }
      } catch {
        t.value = !0;
      } finally {
        m.value = !1;
      }
    }
    function O() {
      const c = P(s.value);
      s.value = c.subtract(1, "weeks").startOf("week").toDate(), f.value = c.subtract(1, "weeks").endOf("week").toDate(), S();
    }
    function C() {
      const c = P(s.value);
      s.value = c.add(1, "weeks").startOf("week").toDate(), f.value = c.add(1, "weeks").endOf("week").toDate(), S();
    }
    function u(c) {
      _.value = c, v("selectClass", c);
    }
    function R() {
      S();
    }
    return (c, n) => (l(), a(V, null, [
      e("div", En, [
        e("div", Nn, [
          T(In, { onAfterChangingSite: R })
        ])
      ]),
      Rn,
      e("div", Ln, [
        e("div", An, [
          e("div", wn, [
            e("div", Un, [
              e("a", {
                href: "#",
                onClick: n[0] || (n[0] = Ze((I) => O(), ["prevent"]))
              }, Tn)
            ]),
            e("div", Dn, y(Y(P)(s.value).format("DD/MM/YYYY")) + " to " + y(Y(P)(f.value).format("DD/MM/YYYY")), 1),
            e("div", xn, [
              e("a", {
                href: "#",
                onClick: n[1] || (n[1] = Ze((I) => C(), ["prevent"])),
                style: { color: "black" }
              }, Bn)
            ])
          ])
        ]),
        m.value ? (l(), a("div", Hn, [
          e("div", Wn, [
            T(we, { text: "Loading..." })
          ])
        ])) : r("", !0),
        e("div", Yn, [
          (l(!0), a(V, null, le(i.value, (I) => (l(), a("div", {
            class: "ClassDate",
            key: I.date.toISOString
          }, [
            e("span", Fn, y(Y(P)(I.date).format("ddd MMM D, YYYY")), 1),
            (l(!0), a(V, null, le(I.classes, (g) => (l(), a("div", {
              key: g.id,
              style: { cursor: "pointer" },
              onClick: (L) => u(g.id),
              class: ee({ selectedClass: g.id === _.value, disabledClass: g.showAsDisabled })
            }, [
              e("div", null, [
                e("time", null, y(Y(P)(g.startWithNoTimeZone).format("h:mm A")), 1),
                e("desc", qn, y(g.name), 1),
                e("span", null, y("(" + (g.totalBooked + g.totalUnderMaintenanceSpots) + "/" + g.maxCapacity + ")"), 1)
              ])
            ], 10, Pn))), 128))
          ]))), 128))
        ]),
        e("div", Gn, [
          e("div", Kn, [
            d.value ? (l(), $($n, {
              key: 0,
              disabled: !1,
              onAfterSyncAllClasses: n[2] || (n[2] = (I) => S(!0))
            })) : r("", !0)
          ])
        ])
      ]),
      t.value ? (l(), $(D, {
        key: 0,
        title: "Error",
        message: Y(B),
        "cancel-text": null,
        onOnOk: n[3] || (n[3] = (I) => t.value = !1)
      }, null, 8, ["message"])) : r("", !0)
    ], 64));
  }
});
const Zn = /* @__PURE__ */ ae(jn, [["__scopeId", "data-v-d1739890"]]), zn = { class: "row" }, Qn = { class: "col-lg-3 col-md-3 col-sm-4" }, Jn = { class: "col-lg-9 col-md-9 col-sm-8" }, ea = /* @__PURE__ */ W({
  __name: "AdminClassView",
  setup(p) {
    const E = o(null), h = o(null);
    function k(t) {
      E.value = t;
    }
    function m() {
      var t;
      (t = h.value) == null || t.getCalendarClasses(!1);
    }
    return (t, s) => (l(), a("div", zn, [
      e("div", Qn, [
        T(Zn, {
          onSelectClass: k,
          ref_key: "calendarList",
          ref: h
        }, null, 512)
      ]),
      e("div", Jn, [
        T(gn, {
          "class-id": E.value,
          onAvailableSpotsChanged: m
        }, null, 8, ["class-id"])
      ])
    ]));
  }
});
export {
  ea as default
};
