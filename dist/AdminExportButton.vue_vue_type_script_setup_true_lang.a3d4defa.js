import { r as u, d as _, o as i, b as c, e as m, B as b, t as p, g as t, j as f, af as h } from "./index.cb70f358.js";
function E(s, n = document) {
  const e = n.createElement("a");
  e.href = s.url, e.download = s.fileName, e.rel = "noopener", n.body.appendChild(e), e.click(), e.remove();
}
function A(s) {
  const n = Object.entries(s).filter(
    ([, e]) => e != null && e !== ""
  );
  return n.length > 0 ? Object.fromEntries(n) : null;
}
const y = (s, n = E) => {
  const e = u(!1), r = u(!1), o = u(null);
  async function l() {
    e.value = !0, r.value = !1;
    try {
      const a = await s();
      return a ? (o.value = a, n(a), !0) : (r.value = !0, !1);
    } catch {
      return r.value = !0, !1;
    } finally {
      e.value = !1;
    }
  }
  return { isExporting: e, hasError: r, lastExport: o, exportFile: l };
}, k = { class: "d-inline-flex align-items-center gap-2" }, g = ["disabled"], v = /* @__PURE__ */ m("i", { class: "bi bi-file-earmark-excel" }, null, -1), w = {
  key: 0,
  class: "spinner-border spinner-border-sm"
}, N = {
  key: 0,
  class: "small text-danger"
}, B = ["href", "download", "title"], C = /* @__PURE__ */ _({
  __name: "AdminExportButton",
  props: {
    text: {},
    runExport: { type: Function }
  },
  setup(s) {
    const n = s, { isExporting: e, hasError: r, lastExport: o, exportFile: l } = y(() => n.runExport());
    return (a, d) => (i(), c("span", k, [
      m("button", {
        type: "button",
        class: "btn btn-outline-success btn-sm",
        disabled: t(e),
        onClick: d[0] || (d[0] = (...x) => t(l) && t(l)(...x))
      }, [
        v,
        b(" " + p(a.text) + " ", 1),
        t(e) ? (i(), c("span", w)) : f("", !0)
      ], 8, g),
      t(r) ? (i(), c("span", N, "The export failed.")) : t(o) ? (i(), c("a", {
        key: 1,
        class: "small",
        href: t(o).url,
        download: t(o).fileName,
        rel: "noopener",
        title: `Link valid until ${t(h)(t(o).expiresAt).format("HH:mm")}`
      }, " Download " + p(t(o).fileName) + " again ", 9, B)) : f("", !0)
    ]));
  }
});
export {
  C as _,
  A as c
};
