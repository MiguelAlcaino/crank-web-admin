import { O as b, r as u, P as f, d as k, H as w, s as N, J as L, I as M, b as n, e as t, g as o, B as E, k as q, a1 as x, j as y, F as A, h as F, o as l, t as m } from "./index.b306f002.js";
import { u as V } from "./useAvailableSites.ed69577b.js";
import { u as C } from "./useToast.3c58b82b.js";
const T = b`
  query MindbodyStaffs($site: SiteEnum!) {
    mindbodyStaffs(site: $site) {
      id
      firstName
      lastName
      email
    }
  }
`, U = b`
  mutation SyncAllMindbodyStaff($site: SiteEnum!) {
    syncAllMindbodyStaff(site: $site)
  }
`, B = (_) => {
  const h = u([]), r = u(!1), e = u(!1), a = u(!1);
  async function v(s) {
    r.value = !0, a.value = !1;
    try {
      const { data: i } = await _.query({
        query: T,
        variables: { site: s },
        fetchPolicy: "network-only"
      });
      h.value = i.mindbodyStaffs;
    } catch {
      a.value = !0;
    } finally {
      r.value = !1;
    }
  }
  async function d(s) {
    e.value = !0, a.value = !1;
    try {
      return await _.mutate({
        mutation: U,
        variables: { site: s }
      }), !0;
    } catch {
      return a.value = !0, !1;
    } finally {
      e.value = !1;
    }
  }
  return {
    staffList: f(h),
    isLoading: f(r),
    isSyncing: f(e),
    hasError: f(a),
    fetchStaff: v,
    syncStaff: d
  };
}, $ = { class: "d-flex justify-content-between align-items-center mb-2" }, I = /* @__PURE__ */ t("h4", null, "Mindbody Staff", -1), j = ["disabled"], D = { key: 0 }, O = /* @__PURE__ */ t("span", {
  class: "spinner-border spinner-border-sm",
  role: "status"
}, null, -1), P = { key: 1 }, Y = { class: "row mb-3" }, z = { class: "col-md-4 col-sm-6 col-12" }, H = {
  key: 0,
  class: "text-center py-4"
}, J = /* @__PURE__ */ t("div", {
  class: "spinner-border",
  role: "status"
}, null, -1), Q = [
  J
], R = {
  key: 1,
  class: "alert alert-danger"
}, G = {
  key: 2,
  class: "table table-striped table-sm"
}, K = /* @__PURE__ */ t("thead", null, [
  /* @__PURE__ */ t("tr", null, [
    /* @__PURE__ */ t("th", null, "ID"),
    /* @__PURE__ */ t("th", null, "First Name"),
    /* @__PURE__ */ t("th", null, "Last Name"),
    /* @__PURE__ */ t("th", null, "Email")
  ])
], -1), W = { key: 0 }, X = /* @__PURE__ */ t("td", {
  colspan: "4",
  class: "text-center text-muted py-3"
}, "No staff found", -1), Z = [
  X
], at = /* @__PURE__ */ k({
  __name: "MindbodyStaffView",
  setup(_) {
    const r = w("https://payments.crank-fit.com/api/graphql/"), e = B(r), { sites: a, fetchSites: v } = V(r), d = C(), s = u(N().site || null);
    async function i() {
      !s.value || await e.fetchStaff(s.value);
    }
    async function p() {
      if (!s.value)
        return;
      await e.syncStaff(s.value) ? (d.success("Staff synchronized successfully from Mindbody"), await i()) : d.error("Failed to sync staff");
    }
    return L(s, i), M(async () => {
      await v(), !s.value && a.value.length > 0 && (s.value = a.value[0].code), await i();
    }), (g, S) => (l(), n("div", null, [
      t("div", $, [
        I,
        t("button", {
          class: "btn btn-primary",
          onClick: p,
          disabled: o(e).isSyncing.value
        }, [
          o(e).isSyncing.value ? (l(), n("span", D, [
            O,
            E(" Syncing... ")
          ])) : (l(), n("span", P, "Sync from Mindbody"))
        ], 8, j)
      ]),
      t("div", Y, [
        t("div", z, [
          q(x, {
            "model-value": s.value,
            "onUpdate:modelValue": S[0] || (S[0] = (c) => s.value = c),
            sites: o(a),
            "is-loading": !1
          }, null, 8, ["model-value", "sites"])
        ])
      ]),
      o(e).isLoading.value ? (l(), n("div", H, Q)) : y("", !0),
      o(e).hasError.value ? (l(), n("div", R, "Failed to load staff.")) : y("", !0),
      o(e).isLoading.value ? y("", !0) : (l(), n("table", G, [
        K,
        t("tbody", null, [
          o(e).staffList.value.length === 0 ? (l(), n("tr", W, Z)) : y("", !0),
          (l(!0), n(A, null, F(o(e).staffList.value, (c) => (l(), n("tr", {
            key: c.id
          }, [
            t("td", null, m(c.id), 1),
            t("td", null, m(c.firstName), 1),
            t("td", null, m(c.lastName), 1),
            t("td", null, m(c.email || "-"), 1)
          ]))), 128))
        ])
      ]))
    ]));
  }
});
export {
  at as default
};
