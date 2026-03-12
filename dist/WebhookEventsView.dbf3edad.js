import { d as k, b as o, e, E as m, k as g, j as v, F as C, h as D, H as r, o as i, I as R, t as l, w as E, _ as S, J as N, K as W, r as V, L as j, M as z, g as p } from "./index.05ecebeb.js";
const K = {
  class: "btn-group mb-3 w-100",
  role: "group"
}, O = {
  key: 0,
  class: "text-center py-4"
}, P = {
  class: "list-group",
  style: { "max-height": "75vh", "overflow-y": "auto" }
}, q = ["onClick"], H = { class: "d-flex align-items-center" }, J = {
  key: 0,
  class: "badge bg-success me-2"
}, U = /* @__PURE__ */ e("i", { class: "bi bi-check-circle" }, null, -1), G = {
  key: 1,
  class: "badge bg-danger me-2"
}, Q = /* @__PURE__ */ e("i", { class: "bi bi-x-circle" }, null, -1), X = {
  key: 2,
  class: "badge bg-info me-2"
}, Y = /* @__PURE__ */ e("i", { class: "bi bi-arrow-repeat" }, null, -1), Z = {
  key: 3,
  class: "badge bg-warning me-2"
}, x = /* @__PURE__ */ e("i", { class: "bi bi-clock" }, null, -1), ee = { class: "ms-2 text-truncate" }, te = { class: "fw-bold text-truncate" }, se = {
  key: 0,
  class: "badge bg-secondary ms-1"
}, ne = /* @__PURE__ */ e("i", { class: "bi bi-arrow-repeat" }, null, -1), oe = { class: "text-muted" }, ie = {
  key: 0,
  class: "text-center py-4 text-muted"
}, le = {
  key: 1,
  class: "text-center mt-3"
}, ae = ["disabled"], de = {
  key: 0,
  class: "spinner-border spinner-border-sm me-1"
}, re = /* @__PURE__ */ k({
  __name: "WebhookEventList",
  props: {
    events: {},
    selectedEvent: {},
    isLoading: { type: Boolean },
    hasMore: { type: Boolean },
    activeFilter: {}
  },
  emits: ["select", "filter", "loadMore"],
  setup($, { emit: _ }) {
    const a = _;
    function c(t) {
      return new Date(t).toLocaleString();
    }
    return (t, s) => (i(), o("div", null, [
      e("div", K, [
        e("button", {
          type: "button",
          class: m(["btn btn-sm", t.activeFilter === "" ? "btn-primary" : "btn-outline-primary"]),
          onClick: s[0] || (s[0] = (n) => a("filter", ""))
        }, " All ", 2),
        e("button", {
          type: "button",
          class: m(["btn btn-sm", t.activeFilter === "delivered" ? "btn-primary" : "btn-outline-primary"]),
          onClick: s[1] || (s[1] = (n) => a("filter", "delivered"))
        }, " Delivered ", 2),
        e("button", {
          type: "button",
          class: m(["btn btn-sm", t.activeFilter === "failed" ? "btn-primary" : "btn-outline-primary"]),
          onClick: s[2] || (s[2] = (n) => a("filter", "failed"))
        }, " Failed ", 2)
      ]),
      t.isLoading && t.events.length === 0 ? (i(), o("div", O, [
        g(R)
      ])) : v("", !0),
      e("div", P, [
        (i(!0), o(C, null, D(t.events, (n) => {
          var y;
          return i(), o("button", {
            key: n.id,
            type: "button",
            class: m(["list-group-item list-group-item-action", { active: ((y = t.selectedEvent) == null ? void 0 : y.id) === n.id }]),
            onClick: (u) => a("select", n)
          }, [
            e("div", H, [
              n.status === "delivered" ? (i(), o("span", J, [
                U,
                r(" 200 OK ")
              ])) : n.status === "failed" ? (i(), o("span", G, [
                Q,
                r(" Failed ")
              ])) : n.status === "resolved" ? (i(), o("span", X, [
                Y,
                r(" Resolved ")
              ])) : (i(), o("span", Z, [
                x,
                r(" Pending ")
              ])),
              e("div", ee, [
                e("div", te, [
                  r(l(n.eventType) + " ", 1),
                  n.parentEventId ? (i(), o("span", se, [
                    ne,
                    r(" manual retry ")
                  ])) : v("", !0)
                ]),
                e("small", oe, l(c(n.createdAt)), 1)
              ])
            ])
          ], 10, q);
        }), 128)),
        !t.isLoading && t.events.length === 0 ? (i(), o("div", ie, " No events found ")) : v("", !0)
      ]),
      t.hasMore ? (i(), o("div", le, [
        e("button", {
          class: "btn btn-outline-secondary btn-sm",
          disabled: t.isLoading,
          onClick: s[3] || (s[3] = (n) => a("loadMore"))
        }, [
          t.isLoading ? (i(), o("span", de)) : v("", !0),
          r(" Load more ")
        ], 8, ae)
      ])) : v("", !0)
    ]));
  }
}), ce = {
  key: 0,
  class: "text-center text-muted py-5"
}, ve = /* @__PURE__ */ e("i", {
  class: "bi bi-arrow-left-circle",
  style: { "font-size": "2rem" }
}, null, -1), ue = /* @__PURE__ */ e("p", { class: "mt-2" }, "Select an event to view details", -1), be = [
  ve,
  ue
], pe = { key: 1 }, _e = {
  key: 0,
  class: "alert alert-secondary d-flex align-items-center mb-3"
}, me = /* @__PURE__ */ e("i", { class: "bi bi-arrow-repeat me-2" }, null, -1), ye = { class: "card" }, ge = { class: "card-header d-flex justify-content-between align-items-center" }, he = /* @__PURE__ */ e("h5", { class: "mb-0" }, "Delivery attempt", -1), fe = { class: "card-body" }, ke = { class: "table table-borderless mb-0" }, $e = /* @__PURE__ */ e("td", {
  class: "fw-bold",
  style: { width: "180px" }
}, "Event ID", -1), we = /* @__PURE__ */ e("td", { class: "fw-bold" }, "Type", -1), Ee = /* @__PURE__ */ e("td", { class: "fw-bold" }, "Status", -1), Ce = /* @__PURE__ */ e("td", { class: "fw-bold" }, "Attempts", -1), Ie = /* @__PURE__ */ e("td", { class: "fw-bold" }, "Subscription ID", -1), Le = /* @__PURE__ */ e("td", { class: "fw-bold" }, "Created at", -1), Be = /* @__PURE__ */ e("td", { class: "fw-bold" }, "Last attempt at", -1), Fe = /* @__PURE__ */ e("td", { class: "fw-bold" }, "Next retry at", -1), Me = { key: 0 }, Te = /* @__PURE__ */ e("td", { class: "fw-bold" }, "Resolved by", -1), Ae = {
  key: 0,
  class: "card-footer"
}, De = /* @__PURE__ */ k({
  __name: "WebhookEventDetail",
  props: {
    event: {},
    isRetrying: { type: Boolean }
  },
  emits: ["retry", "navigateToEvent"],
  setup($, { emit: _ }) {
    const a = _;
    function c(t) {
      return t ? new Date(t).toLocaleString() : "\u2014";
    }
    return (t, s) => t.event ? (i(), o("div", pe, [
      t.event.parentEventId ? (i(), o("div", _e, [
        me,
        e("span", null, [
          r(" Manual retry triggered by "),
          e("strong", null, l(t.event.triggeredBy), 1),
          r(" \u2014 parent event "),
          e("a", {
            href: "#",
            onClick: s[0] || (s[0] = E((n) => a("navigateToEvent", t.event.parentEventId), ["prevent"]))
          }, [
            e("code", null, l(t.event.parentEventId), 1)
          ])
        ])
      ])) : v("", !0),
      e("div", ye, [
        e("div", ge, [
          he,
          e("span", {
            class: m(["badge", {
              "bg-success": t.event.status === "delivered",
              "bg-danger": t.event.status === "failed",
              "bg-warning": t.event.status === "pending",
              "bg-info": t.event.status === "resolved"
            }])
          }, l(t.event.status), 3)
        ]),
        e("div", fe, [
          e("table", ke, [
            e("tbody", null, [
              e("tr", null, [
                $e,
                e("td", null, [
                  e("code", null, l(t.event.id), 1)
                ])
              ]),
              e("tr", null, [
                we,
                e("td", null, l(t.event.eventType), 1)
              ]),
              e("tr", null, [
                Ee,
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
                Le,
                e("td", null, l(c(t.event.createdAt)), 1)
              ]),
              e("tr", null, [
                Be,
                e("td", null, l(c(t.event.lastAttemptAt)), 1)
              ]),
              e("tr", null, [
                Fe,
                e("td", null, l(c(t.event.nextRetryAt)), 1)
              ]),
              t.event.resolvedByEventId ? (i(), o("tr", Me, [
                Te,
                e("td", null, [
                  e("a", {
                    href: "#",
                    onClick: s[1] || (s[1] = E((n) => a("navigateToEvent", t.event.resolvedByEventId), ["prevent"]))
                  }, [
                    e("code", null, l(t.event.resolvedByEventId), 1)
                  ])
                ])
              ])) : v("", !0)
            ])
          ])
        ]),
        t.event.status === "failed" ? (i(), o("div", Ae, [
          g(S, {
            text: "Retry",
            type: "button",
            variant: "danger",
            "is-loading": t.isRetrying,
            onOnClick: s[2] || (s[2] = (n) => a("retry", t.event.id))
          }, null, 8, ["is-loading"])
        ])) : v("", !0)
      ])
    ])) : (i(), o("div", ce, be));
  }
}), Re = /* @__PURE__ */ e("h1", null, "Webhook Events", -1), Se = { class: "row mt-3" }, Ne = { class: "col-5" }, We = { class: "col-7" }, je = /* @__PURE__ */ k({
  __name: "WebhookEventsView",
  setup($) {
    const _ = N("gqlApiService"), {
      events: a,
      selectedEvent: c,
      isLoading: t,
      hasMore: s,
      nextCursor: n,
      isRetrying: y,
      getWebhookEvents: u,
      retryWebhookEvent: I,
      selectEvent: w
    } = W(_), b = V("");
    let h = null;
    j(() => {
      u(), h = setInterval(() => {
        u(b.value || void 0);
      }, 2e3);
    }), z(() => {
      h && clearInterval(h);
    });
    function L(d) {
      w(d);
    }
    function B(d) {
      b.value = d, u(d || void 0);
    }
    function F() {
      u(b.value || void 0, n.value || void 0);
    }
    async function M(d) {
      await I(d);
    }
    function T(d) {
      b.value && (b.value = "", u());
      const f = a.value.find((A) => A.id === d);
      f && w(f);
    }
    return (d, f) => (i(), o(C, null, [
      Re,
      e("div", Se, [
        e("div", Ne, [
          g(re, {
            events: p(a),
            "selected-event": p(c),
            "is-loading": p(t),
            "has-more": p(s),
            "active-filter": b.value,
            onSelect: L,
            onFilter: B,
            onLoadMore: F
          }, null, 8, ["events", "selected-event", "is-loading", "has-more", "active-filter"])
        ]),
        e("div", We, [
          g(De, {
            event: p(c),
            "is-retrying": p(y),
            onRetry: M,
            onNavigateToEvent: T
          }, null, 8, ["event", "is-retrying"])
        ])
      ])
    ], 64));
  }
});
export {
  je as default
};
