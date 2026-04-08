import { M as A, r as u, N as _, d as I, G as M, b, g as n, t as V, j as k, e as s, f as h, Z as g, i as D, A as O, w as P, o as f } from "./index.cc2eb486.js";
import { u as T } from "./useToast.6a51987c.js";
const w = A`
  mutation BulkActivateVod($input: BulkActivateVodInput!) {
    bulkActivateVod(input: $input) {
      processedCount
    }
  }
`, B = A`
  mutation BulkDeactivateVod($mindbodyIds: [Int!]!) {
    bulkDeactivateVod(mindbodyIds: $mindbodyIds) {
      processedCount
    }
  }
`, U = (y) => {
  const c = u(!1), d = u(!1), t = u(""), l = u(null);
  async function v(o, p) {
    var i;
    c.value = !0, d.value = !1, l.value = null;
    try {
      const { data: e } = await y.mutate({
        mutation: w,
        variables: { input: { mindbodyIds: o, vodDays: p } }
      });
      return l.value = (i = e == null ? void 0 : e.bulkActivateVod) != null ? i : null, !0;
    } catch {
      return d.value = !0, t.value = "Failed to activate VOD periods", !1;
    } finally {
      c.value = !1;
    }
  }
  async function m(o) {
    var p;
    c.value = !0, d.value = !1, l.value = null;
    try {
      const { data: i } = await y.mutate({
        mutation: B,
        variables: { mindbodyIds: o }
      });
      return l.value = (p = i == null ? void 0 : i.bulkDeactivateVod) != null ? p : null, !0;
    } catch {
      return d.value = !0, t.value = "Failed to deactivate VOD periods", !1;
    } finally {
      c.value = !1;
    }
  }
  return {
    isProcessing: _(c),
    hasError: _(d),
    errorMessage: _(t),
    lastResult: _(l),
    activateVod: v,
    deactivateVod: m
  };
}, x = /* @__PURE__ */ s("h4", null, "Bulk VOD Activator", -1), N = {
  key: 0,
  class: "alert alert-danger"
}, C = ["onSubmit"], E = { class: "form-group mb-3" }, q = /* @__PURE__ */ s("label", null, "Operation", -1), $ = { class: "form-check form-check-inline" }, R = ["disabled"], S = /* @__PURE__ */ s("label", {
  for: "op-add",
  class: "form-check-label"
}, "Add VOD Periods", -1), F = { class: "form-check form-check-inline" }, K = ["disabled"], L = /* @__PURE__ */ s("label", {
  for: "op-remove",
  class: "form-check-label"
}, "Remove VOD Periods", -1), j = { class: "form-group mb-3" }, G = /* @__PURE__ */ s("label", { for: "mindbodyIds" }, "Mindbody IDs (comma-separated)", -1), Z = ["disabled"], z = {
  key: 0,
  class: "form-group mb-3"
}, H = /* @__PURE__ */ s("label", { for: "vodDays" }, "VOD Days", -1), J = ["disabled"], Q = ["disabled"], W = { key: 0 }, X = /* @__PURE__ */ s("span", {
  class: "spinner-border spinner-border-sm",
  role: "status"
}, null, -1), Y = { key: 1 }, te = /* @__PURE__ */ I({
  __name: "BulkVodActivatorView",
  setup(y) {
    const d = M("https://payments.crank-fit.com/api/graphql/"), t = U(d), l = T(), v = u(""), m = u(30), o = u("add");
    function p() {
      return v.value.split(",").map((e) => e.trim()).filter((e) => e.length > 0).map((e) => parseInt(e, 10)).filter((e) => !isNaN(e));
    }
    async function i() {
      const e = p();
      if (e.length === 0) {
        l.error("Please enter at least one valid Mindbody ID");
        return;
      }
      let a;
      if (o.value === "add") {
        if (m.value < 1) {
          l.error("VOD days must be at least 1");
          return;
        }
        a = await t.activateVod(e, m.value);
      } else
        a = await t.deactivateVod(e);
      a && (l.success(`All ${e.length} customers have been processed successfully`), v.value = "");
    }
    return (e, a) => (f(), b("div", null, [
      x,
      n(t).hasError.value ? (f(), b("div", N, V(n(t).errorMessage.value), 1)) : k("", !0),
      s("form", {
        onSubmit: P(i, ["prevent"])
      }, [
        s("div", E, [
          q,
          s("div", null, [
            s("div", $, [
              h(s("input", {
                type: "radio",
                id: "op-add",
                value: "add",
                "onUpdate:modelValue": a[0] || (a[0] = (r) => o.value = r),
                class: "form-check-input",
                disabled: n(t).isProcessing.value
              }, null, 8, R), [
                [g, o.value]
              ]),
              S
            ]),
            s("div", F, [
              h(s("input", {
                type: "radio",
                id: "op-remove",
                value: "remove",
                "onUpdate:modelValue": a[1] || (a[1] = (r) => o.value = r),
                class: "form-check-input",
                disabled: n(t).isProcessing.value
              }, null, 8, K), [
                [g, o.value]
              ]),
              L
            ])
          ])
        ]),
        s("div", j, [
          G,
          h(s("textarea", {
            id: "mindbodyIds",
            "onUpdate:modelValue": a[2] || (a[2] = (r) => v.value = r),
            class: "form-control",
            rows: "4",
            placeholder: "e.g. 100001234, 100005678, 100009012",
            required: "",
            disabled: n(t).isProcessing.value
          }, null, 8, Z), [
            [D, v.value]
          ])
        ]),
        o.value === "add" ? (f(), b("div", z, [
          H,
          h(s("input", {
            id: "vodDays",
            type: "number",
            "onUpdate:modelValue": a[3] || (a[3] = (r) => m.value = r),
            class: "form-control",
            min: "1",
            required: "",
            disabled: n(t).isProcessing.value,
            style: { "max-width": "200px" }
          }, null, 8, J), [
            [
              D,
              m.value,
              void 0,
              { number: !0 }
            ]
          ])
        ])) : k("", !0),
        s("button", {
          type: "submit",
          class: "btn btn-dark",
          disabled: n(t).isProcessing.value
        }, [
          n(t).isProcessing.value ? (f(), b("span", W, [
            X,
            O(" Processing... ")
          ])) : (f(), b("span", Y, V(o.value === "add" ? "Activate VOD" : "Deactivate VOD"), 1))
        ], 8, Q)
      ], 40, C)
    ]));
  }
});
export {
  te as default
};
