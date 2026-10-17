import { ac as b, r as u, ae as f, d as k, I as w, J as N, G as L, s as M, L as E, K as q, b as n, e as t, g as o, B as x, k as A, as as F, j as y, F as V, h as C, o as l, t as _ } from "./index.dde1f821.js";
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
`, B = (m) => {
  const h = u([]), r = u(!1), e = u(!1), a = u(!1);
  async function v(s) {
    r.value = !0, a.value = !1;
    try {
      const { data: i } = await m.query({
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
      return await m.mutate({
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
}, $ = { class: "d-flex justify-content-between align-items-center mb-2" }, I = /* @__PURE__ */ t("h4", null, "Mindbody Staff", -1), j = ["disabled"], D = { key: 0 }, Y = /* @__PURE__ */ t("span", {
  class: "spinner-border spinner-border-sm",
  role: "status"
}, null, -1), z = { key: 1 }, G = { class: "row mb-3" }, J = { class: "col-md-4 col-sm-6 col-12" }, K = {
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
}, H = /* @__PURE__ */ t("thead", null, [
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
], et = /* @__PURE__ */ k({
  __name: "MindbodyStaffView",
  setup(m) {
    const r = w("https://payments.crank-fit.com/api/graphql/"), e = B(r), { sites: a, fetchSites: v } = N(r), d = L(), s = u(M().site || null);
    async function i() {
      !s.value || await e.fetchStaff(s.value);
    }
    async function p() {
      if (!s.value)
        return;
      await e.syncStaff(s.value) ? (d.success("Staff synchronized successfully from Mindbody"), await i()) : d.error("Failed to sync staff");
    }
    return E(s, i), q(async () => {
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
            Y,
            x(" Syncing... ")
          ])) : (l(), n("span", z, "Sync from Mindbody"))
        ], 8, j)
      ]),
      t("div", G, [
        t("div", J, [
          A(F, {
            "model-value": s.value,
            "onUpdate:modelValue": S[0] || (S[0] = (c) => s.value = c),
            sites: o(a),
            "is-loading": !1
          }, null, 8, ["model-value", "sites"])
        ])
      ]),
      o(e).isLoading.value ? (l(), n("div", K, P)) : y("", !0),
      o(e).hasError.value ? (l(), n("div", Q, "Failed to load staff.")) : y("", !0),
      o(e).isLoading.value ? y("", !0) : (l(), n("table", R, [
        H,
        t("tbody", null, [
          o(e).staffList.value.length === 0 ? (l(), n("tr", W, Z)) : y("", !0),
          (l(!0), n(V, null, C(o(e).staffList.value, (c) => (l(), n("tr", {
            key: c.id
          }, [
            t("td", null, _(c.id), 1),
            t("td", null, _(c.firstName), 1),
            t("td", null, _(c.lastName), 1),
            t("td", null, _(c.email || "-"), 1)
          ]))), 128))
        ])
      ]))
    ]));
  }
});
export {
  et as default
};
