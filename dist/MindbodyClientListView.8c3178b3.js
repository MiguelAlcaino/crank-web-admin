import { O as R, r as h, P as _, d as L, H as M, c as q, I, b as s, e, f as x, i as $, w as f, g as r, j as y, t as i, F as P, h as w, A as C, o } from "./index.4c9212d3.js";
const E = R`
  query AdminMindbodyClients($params: AdminMindbodyClientsParams, $pagination: PaginationInput) {
    mindbodyClients(params: $params, pagination: $pagination) {
      items {
        id
        clientId
        firstName
        lastName
        email
        mobilePhone
      }
      totalCount
      page
      limit
    }
  }
`, A = R`
  query AdminMindbodyClient($id: ID!) {
    mindbodyClient(id: $id) {
      id
      clientId
      firstName
      lastName
      email
      mobilePhone
    }
  }
`, D = (g) => {
  const b = h(null), p = h(null), t = h(!1), a = h(!1);
  async function n(u, c) {
    t.value = !0, a.value = !1;
    try {
      const { data: m } = await g.query({
        query: E,
        variables: {
          params: u && Object.keys(u).length > 0 ? u : void 0,
          pagination: c
        },
        fetchPolicy: "network-only"
      });
      b.value = m.mindbodyClients;
    } catch {
      a.value = !0;
    } finally {
      t.value = !1;
    }
  }
  async function d(u) {
    t.value = !0, a.value = !1, p.value = null;
    try {
      const { data: c } = await g.query({
        query: A,
        variables: { id: u },
        fetchPolicy: "network-only"
      });
      p.value = c.mindbodyClient;
    } catch {
      a.value = !0;
    } finally {
      t.value = !1;
    }
  }
  return {
    listResult: _(b),
    detail: _(p),
    isLoading: _(t),
    hasError: _(a),
    fetchList: n,
    fetchDetail: d
  };
}, S = /* @__PURE__ */ e("h4", null, "Report - MB Clients", -1), U = ["onSubmit"], B = { class: "input-group" }, F = /* @__PURE__ */ e("button", {
  type: "submit",
  class: "btn btn-primary"
}, "Search", -1), T = {
  key: 0,
  class: "text-center py-4"
}, V = /* @__PURE__ */ e("div", {
  class: "spinner-border",
  role: "status"
}, null, -1), j = [
  V
], O = {
  key: 1,
  class: "alert alert-danger"
}, Q = { key: 2 }, Y = { class: "text-muted small" }, z = { class: "table table-striped table-sm" }, H = /* @__PURE__ */ e("thead", null, [
  /* @__PURE__ */ e("tr", null, [
    /* @__PURE__ */ e("th", null, "ID"),
    /* @__PURE__ */ e("th", null, "Client ID"),
    /* @__PURE__ */ e("th", null, "First Name"),
    /* @__PURE__ */ e("th", null, "Last Name"),
    /* @__PURE__ */ e("th", null, "Email"),
    /* @__PURE__ */ e("th", null, "Phone")
  ])
], -1), G = { key: 0 }, J = /* @__PURE__ */ e("td", {
  colspan: "6",
  class: "text-center text-muted py-3"
}, "No clients found", -1), K = [
  J
], W = { key: 0 }, X = { class: "pagination pagination-sm" }, Z = ["onClick"], N = 50, le = /* @__PURE__ */ L({
  __name: "MindbodyClientListView",
  setup(g) {
    const p = M("https://payments.crank-fit.com/api/graphql/"), t = D(p), a = h(""), n = h(1), d = q(() => t.listResult.value ? Math.ceil(t.listResult.value.totalCount / N) : 1);
    async function u() {
      await t.fetchList(
        a.value ? { search: a.value } : void 0,
        { page: n.value, limit: N }
      );
    }
    async function c() {
      n.value = 1, await u();
    }
    async function m(k) {
      n.value = k, await u();
    }
    return I(u), (k, v) => (o(), s("div", null, [
      S,
      e("form", {
        onSubmit: f(c, ["prevent"]),
        class: "mb-3"
      }, [
        e("div", B, [
          x(e("input", {
            type: "text",
            "onUpdate:modelValue": v[0] || (v[0] = (l) => a.value = l),
            class: "form-control",
            placeholder: "Search by name, email, or phone..."
          }, null, 512), [
            [$, a.value]
          ]),
          F
        ])
      ], 40, U),
      r(t).isLoading.value ? (o(), s("div", T, j)) : y("", !0),
      r(t).hasError.value ? (o(), s("div", O, "Failed to load clients.")) : y("", !0),
      r(t).listResult.value && !r(t).isLoading.value ? (o(), s("div", Q, [
        e("p", Y, i(r(t).listResult.value.totalCount) + " clients found (page " + i(r(t).listResult.value.page) + " of " + i(d.value) + ") ", 1),
        e("table", z, [
          H,
          e("tbody", null, [
            r(t).listResult.value.items.length === 0 ? (o(), s("tr", G, K)) : y("", !0),
            (o(!0), s(P, null, w(r(t).listResult.value.items, (l) => (o(), s("tr", {
              key: l.id
            }, [
              e("td", null, i(l.id), 1),
              e("td", null, i(l.clientId || "-"), 1),
              e("td", null, i(l.firstName || "-"), 1),
              e("td", null, i(l.lastName || "-"), 1),
              e("td", null, i(l.email || "-"), 1),
              e("td", null, i(l.mobilePhone || "-"), 1)
            ]))), 128))
          ])
        ]),
        d.value > 1 ? (o(), s("nav", W, [
          e("ul", X, [
            e("li", {
              class: C(["page-item", { disabled: n.value === 1 }])
            }, [
              e("a", {
                class: "page-link",
                href: "#",
                onClick: v[1] || (v[1] = f((l) => m(n.value - 1), ["prevent"]))
              }, "Previous")
            ], 2),
            (o(!0), s(P, null, w(Math.min(d.value, 10), (l) => (o(), s("li", {
              key: l,
              class: C(["page-item", { active: l === n.value }])
            }, [
              e("a", {
                class: "page-link",
                href: "#",
                onClick: f((ee) => m(l), ["prevent"])
              }, i(l), 9, Z)
            ], 2))), 128)),
            e("li", {
              class: C(["page-item", { disabled: n.value === d.value }])
            }, [
              e("a", {
                class: "page-link",
                href: "#",
                onClick: v[2] || (v[2] = f((l) => m(n.value + 1), ["prevent"]))
              }, "Next")
            ], 2)
          ])
        ])) : y("", !0)
      ])) : y("", !0)
    ]));
  }
});
export {
  le as default
};
