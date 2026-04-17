import { d as ue, W as ce, s as re, r as l, c as de, I as ve, K as me, b as o, e, f as h, v as K, k as _e, L as pe, j as p, t as r, i as A, g as x, F as H, h as P, B as R, a8 as k, o as n, S as $, w as fe } from "./index.16ec4b64.js";
import { u as he } from "./useToast.78d78ef5.js";
const be = /* @__PURE__ */ e("div", { class: "d-flex justify-content-between align-items-center mb-4" }, [
  /* @__PURE__ */ e("h4", null, "Send Push Notification")
], -1), ye = { class: "card" }, we = { class: "card-body" }, ge = { class: "row mb-3" }, Ce = { class: "col-md-4" }, Se = /* @__PURE__ */ e("label", { class: "form-label" }, "Notification Type", -1), Ne = /* @__PURE__ */ e("option", { value: "waitlist-booking" }, "Out of Waitlist", -1), xe = /* @__PURE__ */ e("option", { value: "late-cancellation" }, "Late Cancellation", -1), ke = [
  Ne,
  xe
], De = { class: "row mb-3" }, Ie = { class: "col-md-8" }, Me = /* @__PURE__ */ e("label", { class: "form-label" }, "Customer", -1), Te = { class: "position-relative" }, We = ["innerHTML"], Ye = {
  key: 0,
  class: "spinner-border spinner-border-sm text-primary position-absolute",
  style: { top: "50%", right: "12px", transform: "translateY(-50%)" },
  role: "status"
}, Ae = {
  key: 0,
  class: "form-text text-success"
}, Ee = /* @__PURE__ */ e("hr", null, null, -1), Fe = { key: 0 }, Le = { class: "row mb-3" }, Ve = { class: "col-md-5" }, Ue = /* @__PURE__ */ e("label", { class: "form-label" }, "Class Name", -1), je = { class: "col-md-4" }, Be = /* @__PURE__ */ e("label", { class: "form-label" }, "Class Starts At", -1), He = { key: 1 }, Pe = { class: "row mb-3" }, $e = { class: "col-md-4" }, qe = /* @__PURE__ */ e("label", { class: "form-label" }, "Site", -1), ze = ["value"], Oe = ["value"], Ze = ["value"], Ke = { class: "row mb-3" }, Re = { class: "col-md-7" }, Ge = /* @__PURE__ */ e("label", { class: "form-label" }, "Class", -1), Je = { class: "position-relative" }, Qe = ["disabled"], Xe = /* @__PURE__ */ e("option", {
  value: "",
  disabled: "",
  selected: ""
}, "Select a class\u2026", -1), et = ["label"], tt = ["value"], st = {
  key: 0,
  class: "spinner-border spinner-border-sm text-primary position-absolute",
  style: { top: "50%", right: "12px", transform: "translateY(-50%)" },
  role: "status"
}, at = {
  key: 0,
  class: "row mb-3"
}, lt = { class: "col-md-4" }, ot = /* @__PURE__ */ e("label", { class: "form-label" }, "Instructor Name", -1), nt = ["value"], it = { class: "col-md-4" }, ut = /* @__PURE__ */ e("label", { class: "form-label" }, "Expires At", -1), ct = {
  key: 1,
  class: "row mb-3"
}, rt = { class: "col-md-5" }, dt = /* @__PURE__ */ e("label", { class: "form-label" }, "Waitlist ID", -1), vt = { class: "position-relative" }, mt = {
  key: 0,
  class: "spinner-border spinner-border-sm text-primary position-absolute",
  style: { top: "50%", right: "12px", transform: "translateY(-50%)" },
  role: "status"
}, _t = {
  key: 1,
  class: "list-group position-absolute w-100 shadow-sm",
  style: { "z-index": "1000", top: "100%", "max-height": "200px", "overflow-y": "auto" }
}, pt = ["onMousedown"], ft = { class: "text-muted me-1" }, ht = {
  key: 2,
  class: "position-absolute w-100 bg-white border rounded p-2 text-muted small",
  style: { "z-index": "1000", top: "100%" }
}, bt = { class: "row mt-2" }, yt = { class: "col-12" }, wt = ["disabled"], gt = { key: 0 }, Ct = /* @__PURE__ */ e("span", {
  class: "spinner-border spinner-border-sm",
  role: "status"
}, null, -1), St = { key: 1 }, It = /* @__PURE__ */ ue({
  __name: "SendPushNotificationView",
  setup(Nt) {
    const b = ce("gqlApiService"), E = he(), G = re(), d = l("waitlist-booking"), y = l([]), u = l(null), F = l(!1), D = l(!1), w = l(""), g = l(""), L = l(""), V = l(""), I = l(""), U = l(""), v = l(""), C = l(""), M = l(G.site), T = l([]), W = l(!1), m = l(null), f = l([]), Y = l(!1), S = l(!1), N = l(!1), J = de(() => {
      const t = {};
      for (const a of T.value) {
        const i = k(a.startWithNoTimeZone).format("YYYY-MM-DD");
        t[i] || (t[i] = []), t[i].push(a);
      }
      return Object.entries(t).sort(([a], [i]) => a.localeCompare(i));
    });
    async function j() {
      W.value = !0, m.value = null, q();
      const t = new Date(), a = k().add(7, "day").toDate();
      T.value = await b.getCalendarClassesForList(M.value, t, a), W.value = !1;
    }
    ve(() => {
      d.value === "late-cancellation" && j();
    });
    function Q() {
      u.value = null, y.value = [], z(), d.value === "late-cancellation" && T.value.length === 0 && j();
    }
    function q() {
      L.value = "", V.value = "", I.value = "", U.value = "", v.value = "", f.value = [], N.value = !1;
    }
    function z() {
      w.value = "", g.value = "", C.value = "", q();
    }
    function X(t) {
      var s, _;
      const a = t.target.value, i = (s = T.value.find((c) => c.id === a)) != null ? s : null;
      m.value = i, i && (U.value = i.id, L.value = i.name, V.value = k(i.startWithNoTimeZone).format("YYYY-MM-DDTHH:mm"), I.value = (_ = i.instructorName) != null ? _ : ""), v.value = "", f.value = [], N.value = !1;
    }
    async function ee() {
      if (!m.value || (S.value = !0, N.value))
        return;
      Y.value = !0;
      const t = await b.getClassWaitlistEntries(M.value, m.value.id);
      f.value = t != null ? t : [], N.value = !0, Y.value = !1;
    }
    function te(t) {
      v.value = t.id, S.value = !1;
    }
    function se() {
      setTimeout(() => {
        S.value = !1;
      }, 150);
    }
    async function ae(t) {
      y.value = [], u.value = null, !(t.input.length < 3) && (F.value = !0, y.value = await b.searchUser(t.input), F.value = !1);
    }
    function le(t) {
      u.value = t;
    }
    function oe(t) {
      return `${t.user.firstName} ${t.user.lastName} - ${t.user.email}`;
    }
    function B(t) {
      return t ? `${t}:00` : "";
    }
    async function ne() {
      if (!!u.value) {
        D.value = !0;
        try {
          let t;
          d.value === "waitlist-booking" ? t = await b.adminSendWaitlistBookingNotification({
            customerId: u.value.id,
            className: w.value,
            classStartsAt: B(g.value)
          }) : t = await b.adminSendLateCancellationNotification({
            customerId: u.value.id,
            className: L.value,
            classStartsAt: B(V.value),
            instructorName: I.value,
            classId: U.value,
            waitlistId: v.value,
            expiresAt: B(C.value)
          }), t.__typename === "CustomerNotFoundError" ? E.error("Customer not found") : (E.success("Notification sent successfully"), u.value = null, y.value = [], z());
        } catch {
          E.error("An error occurred while sending the notification");
        } finally {
          D.value = !1;
        }
      }
    }
    const ie = () => u.value ? d.value === "waitlist-booking" ? w.value.trim() !== "" && g.value !== "" : m.value !== null && v.value.trim() !== "" && C.value !== "" : !1;
    return (t, a) => {
      const i = me("vue3-simple-typeahead");
      return n(), o("div", null, [
        be,
        e("div", ye, [
          e("div", we, [
            e("div", ge, [
              e("div", Ce, [
                Se,
                h(e("select", {
                  class: "form-select",
                  "onUpdate:modelValue": a[0] || (a[0] = (s) => d.value = s),
                  onChange: Q
                }, ke, 544), [
                  [K, d.value]
                ])
              ])
            ]),
            e("div", De, [
              e("div", Ie, [
                Me,
                e("div", Te, [
                  _e(i, {
                    id: "typeahead_notification_user",
                    class: "form-control",
                    placeholder: "Search by name or email (min. 3 characters)",
                    items: y.value,
                    minInputLength: 3,
                    onSelectItem: le,
                    onOnInput: ae,
                    itemProjection: oe
                  }, {
                    "list-item-text": pe((s) => [
                      e("span", {
                        innerHTML: s.boldMatchText(s.itemProjection(s.item))
                      }, null, 8, We)
                    ]),
                    _: 1
                  }, 8, ["items"]),
                  F.value ? (n(), o("div", Ye)) : p("", !0)
                ]),
                u.value ? (n(), o("div", Ae, " Selected: " + r(u.value.user.firstName) + " " + r(u.value.user.lastName) + " (" + r(u.value.user.email) + ") ", 1)) : p("", !0)
              ])
            ]),
            Ee,
            d.value === "waitlist-booking" ? (n(), o("div", Fe, [
              e("div", Le, [
                e("div", Ve, [
                  Ue,
                  h(e("input", {
                    type: "text",
                    class: "form-control",
                    "onUpdate:modelValue": a[1] || (a[1] = (s) => w.value = s),
                    placeholder: "e.g. CrankFit Dubai"
                  }, null, 512), [
                    [A, w.value]
                  ])
                ]),
                e("div", je, [
                  Be,
                  h(e("input", {
                    type: "datetime-local",
                    class: "form-control",
                    "onUpdate:modelValue": a[2] || (a[2] = (s) => g.value = s)
                  }, null, 512), [
                    [A, g.value]
                  ])
                ])
              ])
            ])) : (n(), o("div", He, [
              e("div", Pe, [
                e("div", $e, [
                  qe,
                  h(e("select", {
                    class: "form-select",
                    "onUpdate:modelValue": a[3] || (a[3] = (s) => M.value = s),
                    onChange: j
                  }, [
                    e("option", {
                      value: x($).Dubai
                    }, "Dubai", 8, ze),
                    e("option", {
                      value: x($).AbuDhabi
                    }, "Abu Dhabi", 8, Oe),
                    e("option", {
                      value: x($).TownSquare
                    }, "Town Square", 8, Ze)
                  ], 544), [
                    [K, M.value]
                  ])
                ])
              ]),
              e("div", Ke, [
                e("div", Re, [
                  Ge,
                  e("div", Je, [
                    e("select", {
                      class: "form-select",
                      disabled: W.value,
                      onChange: X
                    }, [
                      Xe,
                      (n(!0), o(H, null, P(J.value, ([s, _]) => (n(), o("optgroup", {
                        key: s,
                        label: x(k)(s).format("dddd, D MMM YYYY")
                      }, [
                        (n(!0), o(H, null, P(_, (c) => (n(), o("option", {
                          key: c.id,
                          value: c.id
                        }, r(x(k)(c.startWithNoTimeZone).format("HH:mm")) + " \u2014 " + r(c.name) + " (" + r(c.instructorName) + ") ", 9, tt))), 128))
                      ], 8, et))), 128))
                    ], 40, Qe),
                    W.value ? (n(), o("div", st)) : p("", !0)
                  ])
                ])
              ]),
              m.value ? (n(), o("div", at, [
                e("div", lt, [
                  ot,
                  e("input", {
                    type: "text",
                    class: "form-control",
                    value: I.value,
                    readonly: ""
                  }, null, 8, nt)
                ]),
                e("div", it, [
                  ut,
                  h(e("input", {
                    type: "datetime-local",
                    class: "form-control",
                    "onUpdate:modelValue": a[4] || (a[4] = (s) => C.value = s)
                  }, null, 512), [
                    [A, C.value]
                  ])
                ])
              ])) : p("", !0),
              m.value ? (n(), o("div", ct, [
                e("div", rt, [
                  dt,
                  e("div", vt, [
                    h(e("input", {
                      type: "text",
                      class: "form-control",
                      "onUpdate:modelValue": a[5] || (a[5] = (s) => v.value = s),
                      placeholder: "Waitlist entry ID",
                      onFocus: ee,
                      onBlur: se,
                      autocomplete: "off"
                    }, null, 544), [
                      [A, v.value]
                    ]),
                    Y.value ? (n(), o("div", mt)) : p("", !0),
                    S.value && f.value.length > 0 ? (n(), o("ul", _t, [
                      (n(!0), o(H, null, P(f.value, (s) => {
                        var _, c, O, Z;
                        return n(), o("li", {
                          key: s.id,
                          class: "list-group-item list-group-item-action",
                          style: { cursor: "pointer", "font-size": "0.875rem" },
                          onMousedown: fe((xt) => te(s), ["prevent"])
                        }, [
                          e("span", ft, r(s.id), 1),
                          R(" \u2014 " + r((Z = (O = (c = (_ = s.identifiableSiteUser) == null ? void 0 : _.identifiableUser) == null ? void 0 : c.user) == null ? void 0 : O.email) != null ? Z : "unknown"), 1)
                        ], 40, pt);
                      }), 128))
                    ])) : S.value && !Y.value && N.value && f.value.length === 0 ? (n(), o("div", ht, " No waitlisted entries for this class \u2014 you can still enter an ID manually ")) : p("", !0)
                  ])
                ])
              ])) : p("", !0)
            ])),
            e("div", bt, [
              e("div", yt, [
                e("button", {
                  class: "btn btn-primary",
                  type: "button",
                  disabled: !ie() || D.value,
                  onClick: ne
                }, [
                  D.value ? (n(), o("span", gt, [
                    Ct,
                    R(" Sending... ")
                  ])) : (n(), o("span", St, "Send Notification"))
                ], 8, wt)
              ])
            ])
          ])
        ])
      ]);
    };
  }
});
export {
  It as default
};
