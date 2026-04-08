import { d as n, G as c, c as r, b as i, e as s, t as m, o as _ } from "./index.953ee91d.js";
const d = { class: "text-center py-5" }, p = { class: "text-muted" }, l = /* @__PURE__ */ s("p", { class: "text-muted" }, "This page is being migrated. Coming soon.", -1), h = /* @__PURE__ */ n({
  __name: "PlaceholderView",
  setup(u) {
    const t = c(), a = r(() => {
      var e;
      return t.meta.title || ((e = t.name) == null ? void 0 : e.toString()) || "Page";
    });
    return (o, e) => (_(), i("div", d, [
      s("h4", p, m(a.value), 1),
      l
    ]));
  }
});
export {
  h as default
};
