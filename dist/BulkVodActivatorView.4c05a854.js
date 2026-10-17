import { ac as A, r as u, ae as _, d as O, I as P, G as T, b, g as d, t as k, j as g, e as s, f as h, ai as D, i as I, B as w, w as M, o as f } from "./index.cb70f358.js";
const U = A`
  mutation BulkActivateVod($input: BulkActivateVodInput!) {
    bulkActivateVod(input: $input) {
      processedCount
    }
  }
`, C = A`
  mutation BulkDeactivateVod($mindbodyIds: [Int!]!) {
    bulkDeactivateVod(mindbodyIds: $mindbodyIds) {
      processedCount
    }
  }
`, x = (y) => {
  const c = u(!1), r = u(!1), t = u(""), n = u(null);
  async function v(o, p) {
    var i;
    c.value = !0, r.value = !1, n.value = null;
    try {
      const { data: e } = await y.mutate({
        mutation: U,
        variables: { input: { mindbodyIds: o, vodDays: p } }
      });
      return n.value = (i = e == null ? void 0 : e.bulkActivateVod) != null ? i : null, !0;
    } catch {
      return r.value = !0, t.value = "Failed to activate VOD periods", !1;
    } finally {
      c.value = !1;
    }
  }
  async function m(o) {
    var p;
    c.value = !0, r.value = !1, n.value = null;
    try {
      const { data: i } = await y.mutate({
        mutation: C,
        variables: { mindbodyIds: o }
      });
      return n.value = (p = i == null ? void 0 : i.bulkDeactivateVod) != null ? p : null, !0;
    } catch {
      return r.value = !0, t.value = "Failed to deactivate VOD periods", !1;
    } finally {
      c.value = !1;
    }
  }
  return {
    isProcessing: _(c),
    hasError: _(r),
    errorMessage: _(t),
    lastResult: _(n),
    activateVod: v,
    deactivateVod: m
  };
}, E = /* @__PURE__ */ s("h4", null, "Bulk VOD Activator", -1), N = {
  key: 0,
  class: "alert alert-danger"
}, q = ["onSubmit"], $ = { class: "mb-3" }, R = /* @__PURE__ */ s("label", null, "Operation", -1), S = { class: "form-check form-check-inline" }, F = ["disabled"], K = /* @__PURE__ */ s("label", {
  for: "op-add",
  class: "form-check-label"
}, "Add VOD Periods", -1), L = { class: "form-check form-check-inline" }, j = ["disabled"], G = /* @__PURE__ */ s("label", {
  for: "op-remove",
  class: "form-check-label"
}, "Remove VOD Periods", -1), z = { class: "mb-3" }, H = /* @__PURE__ */ s("label", { for: "mindbodyIds" }, "Mindbody IDs (comma-separated)", -1), J = ["disabled"], Q = {
  key: 0,
  class: "mb-3"
}, W = /* @__PURE__ */ s("label", { for: "vodDays" }, "VOD Days", -1), X = ["disabled"], Y = ["disabled"], Z = { key: 0 }, ee = /* @__PURE__ */ s("span", {
  class: "spinner-border spinner-border-sm",
  role: "status"
}, null, -1), se = { key: 1 }, ae = /* @__PURE__ */ O({
  __name: "BulkVodActivatorView",
  setup(y) {
    const r = P("https://payments.crank-fit.com/api/graphql/"), t = x(r), n = T(), v = u(""), m = u(30), o = u("add");
    function p() {
      return v.value.split(",").map((e) => e.trim()).filter((e) => e.length > 0).map((e) => parseInt(e, 10)).filter((e) => !isNaN(e));
    }
    async function i() {
      var l, V;
      const e = p();
      if (e.length === 0) {
        n.error("Please enter at least one valid Mindbody ID");
        return;
      }
      let a;
      if (o.value === "add") {
        if (m.value < 1) {
          n.error("VOD days must be at least 1");
          return;
        }
        a = await t.activateVod(e, m.value);
      } else
        a = await t.deactivateVod(e);
      if (a) {
        const B = (V = (l = t.lastResult.value) == null ? void 0 : l.processedCount) != null ? V : e.length;
        n.success(`${B} of ${e.length} customers have been processed successfully`), v.value = "";
      }
    }
    return (e, a) => (f(), b("div", null, [
      E,
      d(t).hasError.value ? (f(), b("div", N, k(d(t).errorMessage.value), 1)) : g("", !0),
      s("form", {
        onSubmit: M(i, ["prevent"])
      }, [
        s("div", $, [
          R,
          s("div", null, [
            s("div", S, [
              h(s("input", {
                type: "radio",
                id: "op-add",
                value: "add",
                "onUpdate:modelValue": a[0] || (a[0] = (l) => o.value = l),
                class: "form-check-input",
                disabled: d(t).isProcessing.value
              }, null, 8, F), [
                [D, o.value]
              ]),
              K
            ]),
            s("div", L, [
              h(s("input", {
                type: "radio",
                id: "op-remove",
                value: "remove",
                "onUpdate:modelValue": a[1] || (a[1] = (l) => o.value = l),
                class: "form-check-input",
                disabled: d(t).isProcessing.value
              }, null, 8, j), [
                [D, o.value]
              ]),
              G
            ])
          ])
        ]),
        s("div", z, [
          H,
          h(s("textarea", {
            id: "mindbodyIds",
            "onUpdate:modelValue": a[2] || (a[2] = (l) => v.value = l),
            class: "form-control",
            rows: "4",
            placeholder: "e.g. 100001234, 100005678, 100009012",
            required: "",
            disabled: d(t).isProcessing.value
          }, null, 8, J), [
            [I, v.value]
          ])
        ]),
        o.value === "add" ? (f(), b("div", Q, [
          W,
          h(s("input", {
            id: "vodDays",
            type: "number",
            "onUpdate:modelValue": a[3] || (a[3] = (l) => m.value = l),
            class: "form-control",
            min: "1",
            required: "",
            disabled: d(t).isProcessing.value,
            style: { "max-width": "200px" }
          }, null, 8, X), [
            [
              I,
              m.value,
              void 0,
              { number: !0 }
            ]
          ])
        ])) : g("", !0),
        s("button", {
          type: "submit",
          class: "btn btn-dark",
          disabled: d(t).isProcessing.value
        }, [
          d(t).isProcessing.value ? (f(), b("span", Z, [
            ee,
            w(" Processing... ")
          ])) : (f(), b("span", se, k(o.value === "add" ? "Activate VOD" : "Deactivate VOD"), 1))
        ], 8, Y)
      ], 40, q)
    ]));
  }
});
export {
  ae as default
};
