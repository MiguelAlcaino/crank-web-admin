import { d as g, b as n, e, E as h, H as r, k as y, j as d, F as E, h as D, o, I as M, t as l, w, _ as N, J as A, K as W, r as V, L as j, g as p } from "./index.f7efcaef.js";
const O = { class: "d-flex justify-content-end mb-2" }, P = ["disabled"], J = {
  class: "btn-group mb-3 w-100",
  role: "group"
}, U = {
  key: 0,
  class: "text-center py-4"
}, z = {
  class: "list-group",
  style: { "max-height": "75vh", "overflow-y": "auto" }
}, K = ["onClick"], q = { class: "d-flex align-items-center" }, H = {
  key: 0,
  class: "badge bg-success me-2"
}, G = /* @__PURE__ */ e("i", { class: "bi bi-check-circle" }, null, -1), Q = {
  key: 1,
  class: "badge bg-danger me-2"
}, X = /* @__PURE__ */ e("i", { class: "bi bi-x-circle" }, null, -1), Y = {
  key: 2,
  class: "badge bg-info me-2"
}, Z = /* @__PURE__ */ e("i", { class: "bi bi-arrow-repeat" }, null, -1), x = {
  key: 3,
  class: "badge bg-warning me-2"
}, ee = /* @__PURE__ */ e("i", { class: "bi bi-clock" }, null, -1), te = { class: "ms-2 text-truncate" }, se = { class: "fw-bold text-truncate" }, ne = {
  key: 0,
  class: "badge bg-secondary ms-1"
}, oe = /* @__PURE__ */ e("i", { class: "bi bi-arrow-repeat" }, null, -1), ie = { class: "text-muted" }, le = {
  key: 0,
  class: "text-center py-4 text-muted"
}, ae = {
  key: 1,
  class: "text-center mt-3"
}, de = ["disabled"], re = {
  key: 0,
  class: "spinner-border spinner-border-sm me-1"
}, ce = /* @__PURE__ */ g({
  __name: "WebhookEventList",
  props: {
    events: {},
    selectedEvent: {},
    isLoading: { type: Boolean },
    hasMore: { type: Boolean },
    activeFilter: {}
  },
  emits: ["select", "filter", "loadMore", "refresh"],
  setup(k, { emit: m }) {
    const a = m;
    function u(i) {
      return new Date(i).toLocaleString();
    }
    return (i, t) => (o(), n("div", null, [
      e("div", O, [
        e("button", {
          class: "btn btn-outline-secondary btn-sm",
          disabled: i.isLoading,
          onClick: t[0] || (t[0] = (s) => a("refresh"))
        }, [
          e("i", {
            class: h(["bi bi-arrow-clockwise", { spin: i.isLoading }])
          }, null, 2),
          r(" Refresh ")
        ], 8, P)
      ]),
      e("div", J, [
        e("button", {
          type: "button",
          class: h(["btn btn-sm", i.activeFilter === "" ? "btn-primary" : "btn-outline-primary"]),
          onClick: t[1] || (t[1] = (s) => a("filter", ""))
        }, " All ", 2),
        e("button", {
          type: "button",
          class: h(["btn btn-sm", i.activeFilter === "delivered" ? "btn-primary" : "btn-outline-primary"]),
          onClick: t[2] || (t[2] = (s) => a("filter", "delivered"))
        }, " Delivered ", 2),
        e("button", {
          type: "button",
          class: h(["btn btn-sm", i.activeFilter === "failed" ? "btn-primary" : "btn-outline-primary"]),
          onClick: t[3] || (t[3] = (s) => a("filter", "failed"))
        }, " Failed ", 2)
      ]),
      i.isLoading && i.events.length === 0 ? (o(), n("div", U, [
        y(M)
      ])) : d("", !0),
      e("div", z, [
        (o(!0), n(E, null, D(i.events, (s) => {
          var v;
          return o(), n("button", {
            key: s.id,
            type: "button",
            class: h(["list-group-item list-group-item-action", { active: ((v = i.selectedEvent) == null ? void 0 : v.id) === s.id }]),
            onClick: (b) => a("select", s)
          }, [
            e("div", q, [
              s.status === "delivered" ? (o(), n("span", H, [
                G,
                r(" 200 OK ")
              ])) : s.status === "failed" ? (o(), n("span", Q, [
                X,
                r(" Failed ")
              ])) : s.status === "resolved" ? (o(), n("span", Y, [
                Z,
                r(" Resolved ")
              ])) : (o(), n("span", x, [
                ee,
                r(" Pending ")
              ])),
              e("div", te, [
                e("div", se, [
                  r(l(s.eventType) + " ", 1),
                  s.parentEventId ? (o(), n("span", ne, [
                    oe,
                    r(" manual retry ")
                  ])) : d("", !0)
                ]),
                e("small", ie, l(u(s.createdAt)), 1)
              ])
            ])
          ], 10, K);
        }), 128)),
        !i.isLoading && i.events.length === 0 ? (o(), n("div", le, " No events found ")) : d("", !0)
      ]),
      i.hasMore ? (o(), n("div", ae, [
        e("button", {
          class: "btn btn-outline-secondary btn-sm",
          disabled: i.isLoading,
          onClick: t[4] || (t[4] = (s) => a("loadMore"))
        }, [
          i.isLoading ? (o(), n("span", re)) : d("", !0),
          r(" Load more ")
        ], 8, de)
      ])) : d("", !0)
    ]));
  }
}), ue = {
  key: 0,
  class: "text-center text-muted py-5"
}, ve = /* @__PURE__ */ e("i", {
  class: "bi bi-arrow-left-circle",
  style: { "font-size": "2rem" }
}, null, -1), be = /* @__PURE__ */ e("p", { class: "mt-2" }, "Select an event to view details", -1), _e = [
  ve,
  be
], pe = { key: 1 }, he = {
  key: 0,
  class: "alert alert-secondary d-flex align-items-center mb-3"
}, me = /* @__PURE__ */ e("i", { class: "bi bi-arrow-repeat me-2" }, null, -1), ye = { class: "card" }, fe = { class: "card-header d-flex justify-content-between align-items-center" }, ge = /* @__PURE__ */ e("h5", { class: "mb-0" }, "Delivery attempt", -1), ke = { class: "card-body" }, $e = { class: "table table-borderless mb-0" }, we = /* @__PURE__ */ e("td", {
  class: "fw-bold",
  style: { width: "180px" }
}, "Event ID", -1), Ee = /* @__PURE__ */ e("td", { class: "fw-bold" }, "Type", -1), Le = /* @__PURE__ */ e("td", { class: "fw-bold" }, "Status", -1), Ce = /* @__PURE__ */ e("td", { class: "fw-bold" }, "Attempts", -1), Ie = /* @__PURE__ */ e("td", { class: "fw-bold" }, "Subscription ID", -1), Re = /* @__PURE__ */ e("td", { class: "fw-bold" }, "Created at", -1), Be = /* @__PURE__ */ e("td", { class: "fw-bold" }, "Last attempt at", -1), Fe = /* @__PURE__ */ e("td", { class: "fw-bold" }, "Next retry at", -1), Se = { key: 0 }, Te = /* @__PURE__ */ e("td", { class: "fw-bold" }, "Destination URL", -1), De = { key: 1 }, Me = /* @__PURE__ */ e("td", { class: "fw-bold" }, "Last error", -1), Ne = { class: "text-danger" }, Ae = { key: 2 }, We = /* @__PURE__ */ e("td", { class: "fw-bold" }, "Resolved by", -1), Ve = {
  key: 0,
  class: "card-body border-top"
}, je = /* @__PURE__ */ e("h6", { class: "fw-bold mb-2" }, "Payload", -1), Oe = {
  class: "bg-light rounded p-3 mb-0",
  style: { "max-height": "400px", overflow: "auto" }
}, Pe = {
  key: 1,
  class: "card-footer"
}, Je = /* @__PURE__ */ g({
  __name: "WebhookEventDetail",
  props: {
    event: {},
    isRetrying: { type: Boolean }
  },
  emits: ["retry", "navigateToEvent"],
  setup(k, { emit: m }) {
    const a = m;
    function u(t) {
      return t ? new Date(t).toLocaleString() : "\u2014";
    }
    function i(t) {
      if (!t)
        return "";
      try {
        return JSON.stringify(JSON.parse(t), null, 2);
      } catch {
        return t;
      }
    }
    return (t, s) => t.event ? (o(), n("div", pe, [
      t.event.parentEventId ? (o(), n("div", he, [
        me,
        e("span", null, [
          r(" Manual retry triggered by "),
          e("strong", null, l(t.event.triggeredBy), 1),
          r(" \u2014 parent event "),
          e("a", {
            href: "#",
            onClick: s[0] || (s[0] = w((v) => a("navigateToEvent", t.event.parentEventId), ["prevent"]))
          }, [
            e("code", null, l(t.event.parentEventId), 1)
          ])
        ])
      ])) : d("", !0),
      e("div", ye, [
        e("div", fe, [
          ge,
          e("span", {
            class: h(["badge", {
              "bg-success": t.event.status === "delivered",
              "bg-danger": t.event.status === "failed",
              "bg-warning": t.event.status === "pending",
              "bg-info": t.event.status === "resolved"
            }])
          }, l(t.event.status), 3)
        ]),
        e("div", ke, [
          e("table", $e, [
            e("tbody", null, [
              e("tr", null, [
                we,
                e("td", null, [
                  e("code", null, l(t.event.id), 1)
                ])
              ]),
              e("tr", null, [
                Ee,
                e("td", null, l(t.event.eventType), 1)
              ]),
              e("tr", null, [
                Le,
                e("td", null, l(t.event.status), 1)
              ]),
              e("tr", null, [
                Ce,
                e("td", null, l(t.event.attempts), 1)
              ]),
              e("tr", null, [
                Ie,
                e("td", null, [
                  e("code", null, l(t.event.subscriptionId), 1)
                ])
              ]),
              e("tr", null, [
                Re,
                e("td", null, l(u(t.event.createdAt)), 1)
              ]),
              e("tr", null, [
                Be,
                e("td", null, l(u(t.event.lastAttemptAt)), 1)
              ]),
              e("tr", null, [
                Fe,
                e("td", null, l(u(t.event.nextRetryAt)), 1)
              ]),
              t.event.destinationUrl ? (o(), n("tr", Se, [
                Te,
                e("td", null, [
                  e("code", null, l(t.event.destinationUrl), 1)
                ])
              ])) : d("", !0),
              t.event.lastError ? (o(), n("tr", De, [
                Me,
                e("td", Ne, l(t.event.lastError), 1)
              ])) : d("", !0),
              t.event.resolvedByEventId ? (o(), n("tr", Ae, [
                We,
                e("td", null, [
                  e("a", {
                    href: "#",
                    onClick: s[1] || (s[1] = w((v) => a("navigateToEvent", t.event.resolvedByEventId), ["prevent"]))
                  }, [
                    e("code", null, l(t.event.resolvedByEventId), 1)
                  ])
                ])
              ])) : d("", !0)
            ])
          ])
        ]),
        t.event.payload ? (o(), n("div", Ve, [
          je,
          e("pre", Oe, [
            e("code", null, l(i(t.event.payload)), 1)
          ])
        ])) : d("", !0),
        t.event.status === "failed" ? (o(), n("div", Pe, [
          y(N, {
            text: "Retry",
            type: "button",
            variant: "danger",
            "is-loading": t.isRetrying,
            onOnClick: s[2] || (s[2] = (v) => a("retry", t.event.id))
          }, null, 8, ["is-loading"])
        ])) : d("", !0)
      ])
    ])) : (o(), n("div", ue, _e));
  }
}), Ue = /* @__PURE__ */ e("h1", null, "Webhook Events", -1), ze = { class: "row mt-3" }, Ke = { class: "col-5" }, qe = { class: "col-7" }, Ge = /* @__PURE__ */ g({
  __name: "WebhookEventsView",
  setup(k) {
    const m = A("gqlApiService"), {
      events: a,
      selectedEvent: u,
      isLoading: i,
      hasMore: t,
      nextCursor: s,
      isRetrying: v,
      getWebhookEvents: b,
      retryWebhookEvent: L,
      selectEvent: $
    } = W(m), _ = V("");
    j(() => {
      b();
    });
    function C() {
      b(_.value || void 0);
    }
    function I(c) {
      $(c);
    }
    function R(c) {
      _.value = c, b(c || void 0);
    }
    function B() {
      b(_.value || void 0, s.value || void 0);
    }
    async function F(c) {
      await L(c);
    }
    function S(c) {
      _.value && (_.value = "", b());
      const f = a.value.find((T) => T.id === c);
      f && $(f);
    }
    return (c, f) => (o(), n(E, null, [
      Ue,
      e("div", ze, [
        e("div", Ke, [
          y(ce, {
            events: p(a),
            "selected-event": p(u),
            "is-loading": p(i),
            "has-more": p(t),
            "active-filter": _.value,
            onSelect: I,
            onFilter: R,
            onLoadMore: B,
            onRefresh: C
          }, null, 8, ["events", "selected-event", "is-loading", "has-more", "active-filter"])
        ]),
        e("div", qe, [
          y(Je, {
            event: p(u),
            "is-retrying": p(v),
            onRetry: F,
            onNavigateToEvent: S
          }, null, 8, ["event", "is-retrying"])
        ])
      ])
    ], 64));
  }
});
export {
  Ge as default
};
