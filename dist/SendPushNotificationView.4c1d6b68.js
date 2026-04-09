import { d as B, V as F, r as o, J as L, b as c, e, f as n, v as M, k as P, K as W, j as I, t as x, i, B as H, o as r } from "./index.2e320136.js";
import { u as $ } from "./useToast.efb48ebc.js";
const J = /* @__PURE__ */ e("div", { class: "d-flex justify-content-between align-items-center mb-4" }, [
  /* @__PURE__ */ e("h4", null, "Send Push Notification")
], -1), O = { class: "card" }, q = { class: "card-body" }, K = { class: "row mb-3" }, R = { class: "col-md-4" }, Y = /* @__PURE__ */ e("label", { class: "form-label" }, "Notification Type", -1), z = /* @__PURE__ */ e("option", { value: "waitlist-booking" }, "Out of Waitlist", -1), G = /* @__PURE__ */ e("option", { value: "late-cancellation" }, "Late Cancellation", -1), Q = [
  z,
  G
], X = { class: "row mb-3" }, Z = { class: "col-md-8" }, ee = /* @__PURE__ */ e("label", { class: "form-label" }, "Customer", -1), te = { class: "position-relative" }, se = ["innerHTML"], le = {
  key: 0,
  class: "spinner-border spinner-border-sm text-primary position-absolute",
  style: { top: "50%", right: "12px", transform: "translateY(-50%)" },
  role: "status"
}, oe = {
  key: 0,
  class: "form-text text-success"
}, ae = /* @__PURE__ */ e("hr", null, null, -1), ne = { key: 0 }, ie = { class: "row mb-3" }, ce = { class: "col-md-5" }, re = /* @__PURE__ */ e("label", { class: "form-label" }, "Class Name", -1), ue = { class: "col-md-4" }, de = /* @__PURE__ */ e("label", { class: "form-label" }, "Class Starts At", -1), me = { key: 1 }, ve = { class: "row mb-3" }, _e = { class: "col-md-5" }, pe = /* @__PURE__ */ e("label", { class: "form-label" }, "Class Name", -1), fe = { class: "col-md-4" }, he = /* @__PURE__ */ e("label", { class: "form-label" }, "Class Starts At", -1), be = { class: "row mb-3" }, ye = { class: "col-md-5" }, Ne = /* @__PURE__ */ e("label", { class: "form-label" }, "Instructor Name", -1), Ce = { class: "col-md-4" }, Se = /* @__PURE__ */ e("label", { class: "form-label" }, "Expires At", -1), we = { class: "row mb-3" }, ge = { class: "col-md-4" }, xe = /* @__PURE__ */ e("label", { class: "form-label" }, "Class ID", -1), ke = { class: "col-md-4" }, Ie = /* @__PURE__ */ e("label", { class: "form-label" }, "Waitlist ID", -1), Ve = { class: "row mt-2" }, Ae = { class: "col-12" }, Ue = ["disabled"], Te = { key: 0 }, De = /* @__PURE__ */ e("span", {
  class: "spinner-border spinner-border-sm",
  role: "status"
}, null, -1), je = { key: 1 }, Le = /* @__PURE__ */ B({
  __name: "SendPushNotificationView",
  setup(Ee) {
    const C = F("gqlApiService"), S = $(), u = o("waitlist-booking"), d = o([]), a = o(null), w = o(!1), N = o(!1), m = o(""), v = o(""), _ = o(""), p = o(""), f = o(""), h = o(""), b = o(""), y = o("");
    function V() {
      a.value = null, d.value = [], k();
    }
    function k() {
      m.value = "", v.value = "", _.value = "", p.value = "", f.value = "", h.value = "", b.value = "", y.value = "";
    }
    async function A(l) {
      d.value = [], a.value = null, !(l.input.length < 3) && (w.value = !0, d.value = await C.searchUser(l.input), w.value = !1);
    }
    function U(l) {
      a.value = l;
    }
    function T(l) {
      return `${l.user.firstName} ${l.user.lastName} - ${l.user.email}`;
    }
    function g(l) {
      return l ? `${l}:00` : "";
    }
    async function D() {
      if (!!a.value) {
        N.value = !0;
        try {
          let l;
          u.value === "waitlist-booking" ? l = await C.adminSendWaitlistBookingNotification({
            customerId: a.value.id,
            className: m.value,
            classStartsAt: g(v.value)
          }) : l = await C.adminSendLateCancellationNotification({
            customerId: a.value.id,
            className: _.value,
            classStartsAt: g(p.value),
            instructorName: f.value,
            classId: h.value,
            waitlistId: b.value,
            expiresAt: g(y.value)
          }), l.__typename === "CustomerNotFoundError" ? S.error("Customer not found") : (S.success("Notification sent successfully"), a.value = null, d.value = [], k());
        } catch {
          S.error("An error occurred while sending the notification");
        } finally {
          N.value = !1;
        }
      }
    }
    const j = () => a.value ? u.value === "waitlist-booking" ? m.value.trim() !== "" && v.value !== "" : _.value.trim() !== "" && p.value !== "" && f.value.trim() !== "" && h.value.trim() !== "" && b.value.trim() !== "" && y.value !== "" : !1;
    return (l, s) => {
      const E = L("vue3-simple-typeahead");
      return r(), c("div", null, [
        J,
        e("div", O, [
          e("div", q, [
            e("div", K, [
              e("div", R, [
                Y,
                n(e("select", {
                  class: "form-select",
                  "onUpdate:modelValue": s[0] || (s[0] = (t) => u.value = t),
                  onChange: V
                }, Q, 544), [
                  [M, u.value]
                ])
              ])
            ]),
            e("div", X, [
              e("div", Z, [
                ee,
                e("div", te, [
                  P(E, {
                    id: "typeahead_notification_user",
                    class: "form-control",
                    placeholder: "Search by name or email (min. 3 characters)",
                    items: d.value,
                    minInputLength: 3,
                    onSelectItem: U,
                    onOnInput: A,
                    itemProjection: T
                  }, {
                    "list-item-text": W((t) => [
                      e("span", {
                        innerHTML: t.boldMatchText(t.itemProjection(t.item))
                      }, null, 8, se)
                    ]),
                    _: 1
                  }, 8, ["items"]),
                  w.value ? (r(), c("div", le)) : I("", !0)
                ]),
                a.value ? (r(), c("div", oe, " Selected: " + x(a.value.user.firstName) + " " + x(a.value.user.lastName) + " (" + x(a.value.user.email) + ") ", 1)) : I("", !0)
              ])
            ]),
            ae,
            u.value === "waitlist-booking" ? (r(), c("div", ne, [
              e("div", ie, [
                e("div", ce, [
                  re,
                  n(e("input", {
                    type: "text",
                    class: "form-control",
                    "onUpdate:modelValue": s[1] || (s[1] = (t) => m.value = t),
                    placeholder: "e.g. CrankFit Dubai"
                  }, null, 512), [
                    [i, m.value]
                  ])
                ]),
                e("div", ue, [
                  de,
                  n(e("input", {
                    type: "datetime-local",
                    class: "form-control",
                    "onUpdate:modelValue": s[2] || (s[2] = (t) => v.value = t)
                  }, null, 512), [
                    [i, v.value]
                  ])
                ])
              ])
            ])) : (r(), c("div", me, [
              e("div", ve, [
                e("div", _e, [
                  pe,
                  n(e("input", {
                    type: "text",
                    class: "form-control",
                    "onUpdate:modelValue": s[3] || (s[3] = (t) => _.value = t),
                    placeholder: "e.g. CrankFit Dubai"
                  }, null, 512), [
                    [i, _.value]
                  ])
                ]),
                e("div", fe, [
                  he,
                  n(e("input", {
                    type: "datetime-local",
                    class: "form-control",
                    "onUpdate:modelValue": s[4] || (s[4] = (t) => p.value = t)
                  }, null, 512), [
                    [i, p.value]
                  ])
                ])
              ]),
              e("div", be, [
                e("div", ye, [
                  Ne,
                  n(e("input", {
                    type: "text",
                    class: "form-control",
                    "onUpdate:modelValue": s[5] || (s[5] = (t) => f.value = t),
                    placeholder: "e.g. John Smith"
                  }, null, 512), [
                    [i, f.value]
                  ])
                ]),
                e("div", Ce, [
                  Se,
                  n(e("input", {
                    type: "datetime-local",
                    class: "form-control",
                    "onUpdate:modelValue": s[6] || (s[6] = (t) => y.value = t)
                  }, null, 512), [
                    [i, y.value]
                  ])
                ])
              ]),
              e("div", we, [
                e("div", ge, [
                  xe,
                  n(e("input", {
                    type: "text",
                    class: "form-control",
                    "onUpdate:modelValue": s[7] || (s[7] = (t) => h.value = t),
                    placeholder: "Class ID"
                  }, null, 512), [
                    [i, h.value]
                  ])
                ]),
                e("div", ke, [
                  Ie,
                  n(e("input", {
                    type: "text",
                    class: "form-control",
                    "onUpdate:modelValue": s[8] || (s[8] = (t) => b.value = t),
                    placeholder: "Waitlist entry ID"
                  }, null, 512), [
                    [i, b.value]
                  ])
                ])
              ])
            ])),
            e("div", Ve, [
              e("div", Ae, [
                e("button", {
                  class: "btn btn-primary",
                  type: "button",
                  disabled: !j() || N.value,
                  onClick: D
                }, [
                  N.value ? (r(), c("span", Te, [
                    De,
                    H(" Sending... ")
                  ])) : (r(), c("span", je, "Send Notification"))
                ], 8, Ue)
              ])
            ])
          ])
        ])
      ]);
    };
  }
});
export {
  Le as default
};
