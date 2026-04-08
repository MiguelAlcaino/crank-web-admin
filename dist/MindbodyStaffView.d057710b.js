import { M as g, r as d, N as y, d as N, G as M, s as L, $ as A, H as E, b as n, e as t, f as q, v as x, F as b, h as p, g as i, A as F, j as m, o as l, t as u } from "./index.cc2eb486.js";
import { u as C } from "./useAvailableSites.d3fb7001.js";
import { u as T } from "./useToast.6a51987c.js";
const U = g`
  query MindbodyStaffs($site: SiteEnum!) {
    mindbodyStaffs(site: $site) {
      id
      firstName
      lastName
      email
    }
  }
`, V = g`
  mutation SyncAllMindbodyStaff($site: SiteEnum!) {
    syncAllMindbodyStaff(site: $site)
  }
`, $ = (h) => {
  const v = d([]), c = d(!1), e = d(!1), o = d(!1);
  async function _(s) {
    c.value = !0, o.value = !1;
    try {
      const { data: r } = await h.query({
        query: U,
        variables: { site: s },
        fetchPolicy: "network-only"
      });
      v.value = r.mindbodyStaffs;
    } catch {
      o.value = !0;
    } finally {
      c.value = !1;
    }
  }
  async function f(s) {
    e.value = !0, o.value = !1;
    try {
      return await h.mutate({
        mutation: V,
        variables: { site: s }
      }), !0;
    } catch {
      return o.value = !0, !1;
    } finally {
      e.value = !1;
    }
  }
  return {
    staffList: y(v),
    isLoading: y(c),
    isSyncing: y(e),
    hasError: y(o),
    fetchStaff: _,
    syncStaff: f
  };
}, B = { class: "d-flex justify-content-between align-items-center mb-3" }, D = /* @__PURE__ */ t("h4", null, "Mindbody Staff", -1), j = ["value"], I = ["disabled"], Y = { key: 0 }, z = /* @__PURE__ */ t("span", {
  class: "spinner-border spinner-border-sm",
  role: "status"
}, null, -1), G = { key: 1 }, H = {
  key: 0,
  class: "text-center py-4"
}, O = /* @__PURE__ */ t("div", {
  class: "spinner-border",
  role: "status"
}, null, -1), P = [
  O
], Q = {
  key: 1,
  class: "alert alert-danger"
}, R = {
  key: 2,
  class: "table table-striped table-sm"
}, J = /* @__PURE__ */ t("thead", null, [
  /* @__PURE__ */ t("tr", null, [
    /* @__PURE__ */ t("th", null, "ID"),
    /* @__PURE__ */ t("th", null, "First Name"),
    /* @__PURE__ */ t("th", null, "Last Name"),
    /* @__PURE__ */ t("th", null, "Email")
  ])
], -1), K = { key: 0 }, W = /* @__PURE__ */ t("td", {
  colspan: "4",
  class: "text-center text-muted py-3"
}, "No staff found", -1), X = [
  W
], st = /* @__PURE__ */ N({
  __name: "MindbodyStaffView",
  setup(h) {
    const c = M("https://payments.crank-fit.com/api/graphql/"), e = $(c), { sites: o, fetchSites: _ } = C(c), f = T(), s = d(L().site || "");
    async function r() {
      !s.value || await e.fetchStaff(s.value);
    }
    async function k() {
      if (!s.value)
        return;
      await e.syncStaff(s.value) ? (f.success("Staff synchronized successfully from Mindbody"), await r()) : f.error("Failed to sync staff");
    }
    return A(s, r), E(async () => {
      await _(), !s.value && o.value.length > 0 && (s.value = o.value[0].code), await r();
    }), (w, S) => (l(), n("div", null, [
      t("div", B, [
        D,
        t("div", null, [
          q(t("select", {
            "onUpdate:modelValue": S[0] || (S[0] = (a) => s.value = a),
            class: "form-control form-control-sm d-inline-block mr-2",
            style: { width: "auto" }
          }, [
            (l(!0), n(b, null, p(i(o), (a) => (l(), n("option", {
              key: a.code,
              value: a.code
            }, u(a.name), 9, j))), 128))
          ], 512), [
            [x, s.value]
          ]),
          t("button", {
            class: "btn btn-dark btn-sm",
            onClick: k,
            disabled: i(e).isSyncing.value
          }, [
            i(e).isSyncing.value ? (l(), n("span", Y, [
              z,
              F(" Syncing... ")
            ])) : (l(), n("span", G, "Sync from Mindbody"))
          ], 8, I)
        ])
      ]),
      i(e).isLoading.value ? (l(), n("div", H, P)) : m("", !0),
      i(e).hasError.value ? (l(), n("div", Q, "Failed to load staff.")) : m("", !0),
      i(e).isLoading.value ? m("", !0) : (l(), n("table", R, [
        J,
        t("tbody", null, [
          i(e).staffList.value.length === 0 ? (l(), n("tr", K, X)) : m("", !0),
          (l(!0), n(b, null, p(i(e).staffList.value, (a) => (l(), n("tr", {
            key: a.id
          }, [
            t("td", null, u(a.id), 1),
            t("td", null, u(a.firstName), 1),
            t("td", null, u(a.lastName), 1),
            t("td", null, u(a.email || "-"), 1)
          ]))), 128))
        ])
      ]))
    ]));
  }
});
export {
  st as default
};
