import { d as Y, T as L, N as te, ah as le, o as t, e, b as u, k as C, a4 as ne, t as l, j as F, F as S, _ as I, af as oe, p as ge, l as he, y as ye, B as X, ai as N, aj as fe, r as h, ak as pe, al as ve, am as be, an as Me, G as De, I as ke, c as Z, K as $e, h as ee, g as a, aa as Ee, A as Fe, w as Ce } from "./index.dde1f821.js";
const y = (o) => (ge("data-v-03986723"), o = o(), he(), o), we = { class: "modal-mask" }, Ae = { class: "modal-wrapper" }, Ie = {
  class: "modal-dialog modal-lg",
  role: "document"
}, Se = { class: "modal-content" }, Le = { class: "modal-header border-0" }, Re = /* @__PURE__ */ y(() => /* @__PURE__ */ e("h5", { class: "modal-title" }, "Failed message detail", -1)), Oe = { class: "modal-body" }, Pe = {
  key: 0,
  class: "text-center"
}, Te = {
  key: 1,
  class: "alert alert-danger mb-0",
  role: "alert"
}, qe = { class: "table table-sm table-borderless" }, Ne = /* @__PURE__ */ y(() => /* @__PURE__ */ e("th", { scope: "row" }, "ID", -1)), Ge = /* @__PURE__ */ y(() => /* @__PURE__ */ e("th", { scope: "row" }, "Message class", -1)), xe = /* @__PURE__ */ y(() => /* @__PURE__ */ e("th", { scope: "row" }, "Summary", -1)), Be = /* @__PURE__ */ y(() => /* @__PURE__ */ e("th", { scope: "row" }, "Exception", -1)), Ye = /* @__PURE__ */ y(() => /* @__PURE__ */ e("th", { scope: "row" }, "Failed at", -1)), Ue = /* @__PURE__ */ y(() => /* @__PURE__ */ e("th", { scope: "row" }, "Retries", -1)), Ve = /* @__PURE__ */ y(() => /* @__PURE__ */ e("th", { scope: "row" }, "Original transport", -1)), Qe = {
  key: 0,
  class: "mb-3"
}, ze = /* @__PURE__ */ y(() => /* @__PURE__ */ e("h6", null, "Error message", -1)), He = { class: "border rounded p-2 error-message" }, je = {
  key: 1,
  class: "card"
}, Ke = /* @__PURE__ */ y(() => /* @__PURE__ */ e("div", { class: "card-header" }, "Payfort details", -1)), Je = { class: "card-body" }, We = { class: "table table-sm table-borderless mb-0" }, Xe = /* @__PURE__ */ y(() => /* @__PURE__ */ e("th", { scope: "row" }, "Merchant reference", -1)), Ze = /* @__PURE__ */ y(() => /* @__PURE__ */ e("th", { scope: "row" }, "Amount", -1)), es = /* @__PURE__ */ y(() => /* @__PURE__ */ e("th", { scope: "row" }, "Response message", -1)), ss = {
  key: 3,
  class: "text-center mb-0"
}, as = { class: "modal-footer border-0" }, ts = /* @__PURE__ */ Y({
  __name: "FailedMessageDetail",
  props: {
    message: {},
    isLoading: { type: Boolean },
    error: {}
  },
  emits: ["close"],
  setup(o, { emit: c }) {
    const f = c;
    function _(s) {
      return s ? oe(s).format("YYYY-MM-DD HH:mm:ss") : "-";
    }
    return (s, m) => (t(), L(le, { name: "modal" }, {
      default: te(() => {
        var v, M, D, k, b, w;
        return [
          e("div", we, [
            e("div", Ae, [
              e("div", Ie, [
                e("div", Se, [
                  e("div", Le, [
                    Re,
                    e("button", {
                      type: "button",
                      class: "btn-close",
                      "aria-label": "Close",
                      onClick: m[0] || (m[0] = (A) => f("close"))
                    })
                  ]),
                  e("div", Oe, [
                    s.isLoading ? (t(), u("div", Pe, [
                      C(ne, { text: "Loading..." })
                    ])) : s.error ? (t(), u("div", Te, l(s.error), 1)) : s.message ? (t(), u(S, { key: 2 }, [
                      e("table", qe, [
                        e("tbody", null, [
                          e("tr", null, [
                            Ne,
                            e("td", null, [
                              e("code", null, l(s.message.id), 1)
                            ])
                          ]),
                          e("tr", null, [
                            Ge,
                            e("td", null, [
                              e("code", null, l(s.message.messageClass), 1)
                            ])
                          ]),
                          e("tr", null, [
                            xe,
                            e("td", null, l((v = s.message.summary) != null ? v : "-"), 1)
                          ]),
                          e("tr", null, [
                            Be,
                            e("td", null, [
                              e("code", null, l((M = s.message.exceptionClass) != null ? M : "-"), 1)
                            ])
                          ]),
                          e("tr", null, [
                            Ye,
                            e("td", null, l(_(s.message.failedAt)), 1)
                          ]),
                          e("tr", null, [
                            Ue,
                            e("td", null, l(s.message.retryCount), 1)
                          ]),
                          e("tr", null, [
                            Ve,
                            e("td", null, l((D = s.message.originalTransport) != null ? D : "-"), 1)
                          ])
                        ])
                      ]),
                      s.message.errorMessage ? (t(), u("div", Qe, [
                        ze,
                        e("pre", He, l(s.message.errorMessage), 1)
                      ])) : F("", !0),
                      s.message.payfortDetails ? (t(), u("div", je, [
                        Ke,
                        e("div", Je, [
                          e("table", We, [
                            e("tbody", null, [
                              e("tr", null, [
                                Xe,
                                e("td", null, l((k = s.message.payfortDetails.merchantReference) != null ? k : "-"), 1)
                              ]),
                              e("tr", null, [
                                Ze,
                                e("td", null, l((b = s.message.payfortDetails.amount) != null ? b : "-"), 1)
                              ]),
                              e("tr", null, [
                                es,
                                e("td", null, l((w = s.message.payfortDetails.responseMessage) != null ? w : "-"), 1)
                              ])
                            ])
                          ])
                        ])
                      ])) : F("", !0)
                    ], 64)) : (t(), u("p", ss, " Message not found. It may have been retried or discarded already. "))
                  ]),
                  e("div", as, [
                    C(I, {
                      text: "Close",
                      type: "button",
                      variant: "secondary",
                      onOnClick: m[1] || (m[1] = (A) => f("close"))
                    })
                  ])
                ])
              ])
            ])
          ])
        ];
      }),
      _: 1
    }));
  }
});
const ls = /* @__PURE__ */ ye(ts, [["__scopeId", "data-v-03986723"]]), ns = { class: "modal-mask" }, os = { class: "modal-wrapper" }, is = {
  class: "modal-dialog",
  role: "document"
}, rs = { class: "modal-content" }, ds = { class: "modal-header border-0" }, cs = /* @__PURE__ */ e("h5", { class: "modal-title" }, "Discard failed message", -1), us = ["disabled"], _s = { class: "modal-body" }, ms = {
  key: 0,
  class: "text-muted"
}, gs = /* @__PURE__ */ e("p", { class: "mb-0" }, "Are you sure you want to proceed?", -1), hs = { class: "modal-footer border-0" }, ys = /* @__PURE__ */ Y({
  __name: "FailedMessageDiscardConfirm",
  props: {
    messageId: {},
    summary: {},
    isLoading: { type: Boolean }
  },
  emits: ["confirm", "cancel"],
  setup(o, { emit: c }) {
    const f = c;
    return (_, s) => (t(), L(le, { name: "modal" }, {
      default: te(() => [
        e("div", ns, [
          e("div", os, [
            e("div", is, [
              e("div", rs, [
                e("div", ds, [
                  cs,
                  e("button", {
                    type: "button",
                    class: "btn-close",
                    "aria-label": "Close",
                    disabled: _.isLoading,
                    onClick: s[0] || (s[0] = (m) => f("cancel"))
                  }, null, 8, us)
                ]),
                e("div", _s, [
                  e("p", null, [
                    X(" This will permanently remove message "),
                    e("code", null, l(_.messageId), 1),
                    X(" from the failure queue. It will NOT be processed. ")
                  ]),
                  _.summary ? (t(), u("p", ms, l(_.summary), 1)) : F("", !0),
                  gs
                ]),
                e("div", hs, [
                  C(I, {
                    text: "Cancel",
                    type: "button",
                    variant: "secondary",
                    disabled: _.isLoading,
                    onOnClick: s[1] || (s[1] = (m) => f("cancel"))
                  }, null, 8, ["disabled"]),
                  C(I, {
                    text: "Discard",
                    type: "button",
                    variant: "danger",
                    class: "ms-2",
                    "is-loading": _.isLoading,
                    onOnClick: s[2] || (s[2] = (m) => f("confirm"))
                  }, null, 8, ["is-loading"])
                ])
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), B = [
  {
    label: "Payfort feedback",
    queue: N.PayfortTransactionFeedback,
    hasPayfortDetails: !0
  },
  { label: "Default queue", queue: N.Default, hasPayfortDetails: !1 },
  {
    label: "Partner purchases",
    queue: N.PartnerPurchase,
    hasPayfortDetails: !1
  }
], fs = B[0].queue, ps = "The failed messages could not be loaded. Please try again later.", vs = "The failed message could not be loaded. Please try again later.", ie = "Action failed. Please try again later.", bs = "Message not found. It may have been retried or discarded already.", Ms = "Message re-dispatched for processing.", Ds = "Failed message discarded.", se = "Only super admins can manage failed messages.", ks = {
  "user.not_admin": se,
  "user.does_not_have_required_role": se
};
function $s(o, c) {
  switch (c) {
    case "FailedMessageActionSuccess":
      return {
        kind: "success",
        message: o === "retry" ? Ms : Ds
      };
    case "FailedMessageNotFoundError":
      return { kind: "notFound", message: bs };
    default:
      return { kind: "error", message: ie };
  }
}
function G(o, c) {
  return fe(o, ks, c);
}
function ae(o) {
  var c;
  return o ? (c = o.split("\\").pop()) != null ? c : o : "-";
}
function Es(o, c) {
  return c <= 1 && o > 1 ? o - 1 : o;
}
const Fs = (o) => {
  const c = h([]), f = h(0), _ = h(!1), s = h(null), m = h(null), v = h(!1), M = h(null), D = h(null), k = h(null);
  async function b(p, r, d) {
    _.value = !0, s.value = null;
    try {
      const { data: g } = await o.query({
        query: pe,
        variables: { queue: p, pagination: { page: r, limit: d } },
        fetchPolicy: "network-only"
      });
      c.value = g.failedMessages.failedMessages, f.value = g.failedMessages.total;
    } catch (g) {
      s.value = G(g, ps), c.value = [], f.value = 0;
    } finally {
      _.value = !1;
    }
  }
  async function w(p, r) {
    var d;
    v.value = !0, m.value = null, M.value = null;
    try {
      const { data: g } = await o.query({
        query: ve,
        variables: { queue: p, id: r },
        fetchPolicy: "network-only"
      });
      m.value = (d = g.failedMessage) != null ? d : null;
    } catch (g) {
      M.value = G(g, vs);
    } finally {
      v.value = !1;
    }
  }
  async function A(p, r, d) {
    D.value = r, k.value = p;
    try {
      return $s(p, await d());
    } catch (g) {
      return { kind: "error", message: G(g, ie) };
    } finally {
      D.value = null, k.value = null;
    }
  }
  function O(p, r) {
    return A("retry", r, async () => {
      const { data: d } = await o.mutate({
        mutation: be,
        variables: { input: { queue: p, id: r } }
      });
      return d == null ? void 0 : d.retryFailedMessage.__typename;
    });
  }
  function P(p, r) {
    return A("discard", r, async () => {
      const { data: d } = await o.mutate({
        mutation: Me,
        variables: { input: { queue: p, id: r } }
      });
      return d == null ? void 0 : d.discardFailedMessage.__typename;
    });
  }
  return {
    failedMessages: c,
    total: f,
    isLoading: _,
    loadError: s,
    selectedMessage: m,
    isLoadingDetail: v,
    detailError: M,
    actingId: D,
    actingAction: k,
    fetchFailedMessages: b,
    fetchFailedMessage: w,
    retryFailedMessage: O,
    discardFailedMessage: P
  };
}, Cs = /* @__PURE__ */ e("h4", { class: "mb-3" }, "Failed Messages", -1), ws = { class: "nav nav-tabs" }, As = ["onClick"], Is = {
  key: 0,
  class: "alert alert-danger mt-3",
  role: "alert"
}, Ss = { class: "mt-3" }, Ls = { key: 0 }, Rs = { class: "table-responsive" }, Os = { class: "table table-sm table-striped align-middle" }, Ps = /* @__PURE__ */ e("th", null, "ID", -1), Ts = /* @__PURE__ */ e("th", null, "Summary", -1), qs = /* @__PURE__ */ e("th", null, "Merchant Ref", -1), Ns = /* @__PURE__ */ e("th", null, "Amount", -1), Gs = { key: 1 }, xs = /* @__PURE__ */ e("th", null, "Exception", -1), Bs = /* @__PURE__ */ e("th", null, "Failed At", -1), Ys = /* @__PURE__ */ e("th", { class: "text-center" }, "Retries", -1), Us = /* @__PURE__ */ e("th", null, null, -1), Vs = { key: 0 }, Qs = ["colspan"], zs = { key: 1 }, Hs = ["colspan"], js = ["title"], Ks = ["title"], Js = { class: "text-nowrap" }, Ws = { class: "text-center" }, Xs = { class: "text-end text-nowrap" }, x = 25, ea = /* @__PURE__ */ Y({
  __name: "FailedMessagesView",
  setup(o) {
    const c = De(), f = ke("https://payments.crank-fit.com/api/graphql/"), {
      failedMessages: _,
      total: s,
      isLoading: m,
      loadError: v,
      selectedMessage: M,
      isLoadingDetail: D,
      detailError: k,
      actingId: b,
      actingAction: w,
      fetchFailedMessages: A,
      fetchFailedMessage: O,
      retryFailedMessage: P,
      discardFailedMessage: p
    } = Fs(f), r = h(fs), d = h(1), g = h(!1), $ = h(null), T = Z(
      () => {
        var n;
        return (n = B.find((E) => E.queue === r.value)) == null ? void 0 : n.hasPayfortDetails;
      }
    ), U = Z(() => T.value ? 8 : 7);
    function R() {
      return A(r.value, d.value, x);
    }
    function re(n) {
      n !== r.value && (r.value = n, d.value = 1, R());
    }
    function de(n) {
      d.value = n, R();
    }
    function ce(n) {
      return n ? oe(n).format("YYYY-MM-DD HH:mm:ss") : "-";
    }
    function ue(n) {
      g.value = !0, O(r.value, n.id);
    }
    async function _e(n) {
      await V(await P(r.value, n.id));
    }
    async function me() {
      const n = $.value;
      if (n === null)
        return;
      const E = await p(r.value, n.id);
      $.value = null, await V(E);
    }
    async function V(n) {
      if (n.kind === "error") {
        c.error(n.message);
        return;
      }
      n.kind === "success" ? c.success(n.message) : c.warning(n.message), d.value = Es(d.value, _.value.length), await R();
    }
    return $e(R), (n, E) => {
      var Q;
      return t(), u("div", null, [
        Cs,
        e("ul", ws, [
          (t(!0), u(S, null, ee(a(B), (i) => (t(), u("li", {
            key: i.queue,
            class: "nav-item"
          }, [
            e("a", {
              href: "#",
              class: Fe(["nav-link", { active: r.value === i.queue }]),
              onClick: Ce((q) => re(i.queue), ["prevent"])
            }, l(i.label), 11, As)
          ]))), 128))
        ]),
        a(v) ? (t(), u("div", Is, l(a(v)), 1)) : F("", !0),
        e("div", Ss, [
          !a(m) && !a(v) ? (t(), u("p", Ls, l(a(s)) + " record(s) found", 1)) : F("", !0),
          e("div", Rs, [
            e("table", Os, [
              e("thead", null, [
                e("tr", null, [
                  Ps,
                  Ts,
                  T.value ? (t(), u(S, { key: 0 }, [
                    qs,
                    Ns
                  ], 64)) : (t(), u("th", Gs, "Message Class")),
                  xs,
                  Bs,
                  Ys,
                  Us
                ])
              ]),
              e("tbody", null, [
                a(m) ? (t(), u("tr", Vs, [
                  e("td", {
                    colspan: U.value,
                    class: "text-center"
                  }, [
                    C(ne, { text: "Loading..." })
                  ], 8, Qs)
                ])) : a(_).length === 0 && !a(v) ? (t(), u("tr", zs, [
                  e("td", {
                    colspan: U.value,
                    class: "text-center text-muted py-3"
                  }, " No failed messages in this queue ", 8, Hs)
                ])) : (t(!0), u(S, { key: 2 }, ee(a(_), (i) => {
                  var q, z, H, j, K, J;
                  return t(), u("tr", {
                    key: i.id
                  }, [
                    e("td", null, [
                      e("code", null, l(i.id), 1)
                    ]),
                    e("td", null, l((q = i.summary) != null ? q : "-"), 1),
                    T.value ? (t(), u(S, { key: 0 }, [
                      e("td", null, l((H = (z = i.payfortDetails) == null ? void 0 : z.merchantReference) != null ? H : "-"), 1),
                      e("td", null, l((K = (j = i.payfortDetails) == null ? void 0 : j.amount) != null ? K : "-"), 1)
                    ], 64)) : (t(), u("td", {
                      key: 1,
                      title: i.messageClass
                    }, [
                      e("code", null, l(a(ae)(i.messageClass)), 1)
                    ], 8, js)),
                    e("td", {
                      title: (J = i.exceptionClass) != null ? J : void 0
                    }, [
                      e("code", null, l(a(ae)(i.exceptionClass)), 1)
                    ], 8, Ks),
                    e("td", Js, l(ce(i.failedAt)), 1),
                    e("td", Ws, l(i.retryCount), 1),
                    e("td", Xs, [
                      C(I, {
                        text: "View",
                        type: "button",
                        variant: "secondary",
                        size: "sm",
                        disabled: a(b) !== null,
                        onOnClick: (W) => ue(i)
                      }, null, 8, ["disabled", "onOnClick"]),
                      C(I, {
                        text: "Retry",
                        type: "button",
                        size: "sm",
                        class: "ms-1",
                        "is-loading": a(b) === i.id && a(w) === "retry",
                        disabled: a(b) !== null,
                        onOnClick: (W) => _e(i)
                      }, null, 8, ["is-loading", "disabled", "onOnClick"]),
                      C(I, {
                        text: "Discard",
                        type: "button",
                        variant: "danger",
                        size: "sm",
                        class: "ms-1",
                        disabled: a(b) !== null,
                        onOnClick: (W) => $.value = i
                      }, null, 8, ["disabled", "onOnClick"])
                    ])
                  ]);
                }), 128))
              ])
            ])
          ]),
          a(s) > x ? (t(), L(Ee, {
            key: `${r.value}-${a(s)}`,
            page: d.value,
            limit: x,
            total: a(s),
            onPageChanged: de
          }, null, 8, ["page", "total"])) : F("", !0)
        ]),
        g.value ? (t(), L(ls, {
          key: 1,
          message: a(M),
          "is-loading": a(D),
          error: a(k),
          onClose: E[0] || (E[0] = (i) => g.value = !1)
        }, null, 8, ["message", "is-loading", "error"])) : F("", !0),
        $.value !== null ? (t(), L(ys, {
          key: 2,
          "message-id": $.value.id,
          summary: (Q = $.value.summary) != null ? Q : null,
          "is-loading": a(b) === $.value.id && a(w) === "discard",
          onConfirm: me,
          onCancel: E[1] || (E[1] = (i) => $.value = null)
        }, null, 8, ["message-id", "summary", "is-loading"])) : F("", !0)
      ]);
    };
  }
});
export {
  ea as default
};
