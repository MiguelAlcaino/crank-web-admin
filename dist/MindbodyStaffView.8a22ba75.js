import { N as g, r as d, O as y, d as N, H as M, s as L, W as E, I as q, b as n, e as t, f as x, v as A, F as b, h as p, g as i, B as F, j as m, o as l, t as u } from "./index.2b55ccef.js";
import { u as C } from "./useAvailableSites.663c25f8.js";
import { u as T } from "./useToast.d2351ccb.js";
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
`, B = (h) => {
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
}, $ = { class: "d-flex justify-content-between align-items-center mb-3" }, D = /* @__PURE__ */ t("h4", null, "Mindbody Staff", -1), I = ["value"], j = ["disabled"], O = { key: 0 }, Y = /* @__PURE__ */ t("span", {
  class: "spinner-border spinner-border-sm",
  role: "status"
}, null, -1), z = { key: 1 }, H = {
  key: 0,
  class: "text-center py-4"
}, P = /* @__PURE__ */ t("div", {
  class: "spinner-border",
  role: "status"
}, null, -1), Q = [
  P
], R = {
  key: 1,
  class: "alert alert-danger"
}, W = {
  key: 2,
  class: "table table-striped table-sm"
}, G = /* @__PURE__ */ t("thead", null, [
  /* @__PURE__ */ t("tr", null, [
    /* @__PURE__ */ t("th", null, "ID"),
    /* @__PURE__ */ t("th", null, "First Name"),
    /* @__PURE__ */ t("th", null, "Last Name"),
    /* @__PURE__ */ t("th", null, "Email")
  ])
], -1), J = { key: 0 }, K = /* @__PURE__ */ t("td", {
  colspan: "4",
  class: "text-center text-muted py-3"
}, "No staff found", -1), X = [
  K
], st = /* @__PURE__ */ N({
  __name: "MindbodyStaffView",
  setup(h) {
    const c = M("https://payments.crank-fit.com/api/graphql/"), e = B(c), { sites: o, fetchSites: _ } = C(c), f = T(), s = d(L().site || "");
    async function r() {
      !s.value || await e.fetchStaff(s.value);
    }
    async function k() {
      if (!s.value)
        return;
      await e.syncStaff(s.value) ? (f.success("Staff synchronized successfully from Mindbody"), await r()) : f.error("Failed to sync staff");
    }
    return E(s, r), q(async () => {
      await _(), !s.value && o.value.length > 0 && (s.value = o.value[0].code), await r();
    }), (w, S) => (l(), n("div", null, [
      t("div", $, [
        D,
        t("div", null, [
          x(t("select", {
            "onUpdate:modelValue": S[0] || (S[0] = (a) => s.value = a),
            class: "form-control form-control-sm d-inline-block me-2",
            style: { width: "auto" }
          }, [
            (l(!0), n(b, null, p(i(o), (a) => (l(), n("option", {
              key: a.code,
              value: a.code
            }, u(a.name), 9, I))), 128))
          ], 512), [
            [A, s.value]
          ]),
          t("button", {
            class: "btn btn-dark btn-sm",
            onClick: k,
            disabled: i(e).isSyncing.value
          }, [
            i(e).isSyncing.value ? (l(), n("span", O, [
              Y,
              F(" Syncing... ")
            ])) : (l(), n("span", z, "Sync from Mindbody"))
          ], 8, j)
        ])
      ]),
      i(e).isLoading.value ? (l(), n("div", H, Q)) : m("", !0),
      i(e).hasError.value ? (l(), n("div", R, "Failed to load staff.")) : m("", !0),
      i(e).isLoading.value ? m("", !0) : (l(), n("table", W, [
        G,
        t("tbody", null, [
          i(e).staffList.value.length === 0 ? (l(), n("tr", J, X)) : m("", !0),
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
