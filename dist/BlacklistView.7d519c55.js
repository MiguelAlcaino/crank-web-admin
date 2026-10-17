import { ac as C, r as _, ae as g, d as M, a as w, c as T, b as a, e, f as B, v as U, F as S, h as I, i as F, B as q, t as h, w as A, o as i, I as D, G as L, K as V, j as $, k as x, g as v } from "./index.dde1f821.js";
const O = C`
  query MobileNumberBlacklist {
    mobileNumberBlacklist {
      id
      mobilePhoneNumber
      fullPhoneNumber
      countryId
      countryName
      countryPhoneCode
    }
  }
`, R = C`
  query CountriesWithPhoneCodes {
    countriesWithPhoneCodes {
      id
      name
      phoneCode
      formattedPhoneCode
    }
  }
`, j = C`
  mutation CreateMobileNumberBlacklistEntry($input: CreateMobileNumberBlacklistInput!) {
    createMobileNumberBlacklistEntry(input: $input) {
      id
      mobilePhoneNumber
      fullPhoneNumber
      countryId
      countryName
      countryPhoneCode
    }
  }
`, W = C`
  mutation UpdateMobileNumberBlacklistEntry($id: ID!, $input: UpdateMobileNumberBlacklistInput!) {
    updateMobileNumberBlacklistEntry(id: $id, input: $input) {
      id
      mobilePhoneNumber
      fullPhoneNumber
      countryId
      countryName
      countryPhoneCode
    }
  }
`, K = C`
  mutation DeleteMobileNumberBlacklistEntry($id: ID!) {
    deleteMobileNumberBlacklistEntry(id: $id)
  }
`, Q = (p) => {
  const b = _([]), N = _([]), t = _(!1), n = _(!1), l = _(!1), u = _("");
  async function f() {
    t.value = !0, l.value = !1;
    try {
      const { data: o } = await p.query({
        query: O,
        fetchPolicy: "network-only"
      });
      b.value = o.mobileNumberBlacklist;
    } catch {
      l.value = !0, u.value = "Failed to load blacklist entries";
    } finally {
      t.value = !1;
    }
  }
  async function k() {
    try {
      const { data: o } = await p.query({
        query: R,
        fetchPolicy: "network-only"
      });
      N.value = o.countriesWithPhoneCodes;
    } catch (o) {
      console.error("Failed to load countries", o);
    }
  }
  async function y(o, r) {
    n.value = !0, l.value = !1;
    try {
      const { data: c } = await p.mutate({
        mutation: j,
        variables: { input: { countryId: o, mobilePhoneNumber: r } }
      });
      return c != null && c.createMobileNumberBlacklistEntry && (b.value = [...b.value, c.createMobileNumberBlacklistEntry]), !0;
    } catch {
      return l.value = !0, u.value = "Failed to create entry", !1;
    } finally {
      n.value = !1;
    }
  }
  async function m(o, r, c) {
    n.value = !0, l.value = !1;
    try {
      const { data: s } = await p.mutate({
        mutation: W,
        variables: { id: o, input: { countryId: r, mobilePhoneNumber: c } }
      });
      if (s != null && s.updateMobileNumberBlacklistEntry) {
        const E = b.value.findIndex((P) => P.id === o);
        if (E !== -1) {
          const P = b.value.slice();
          P[E] = s.updateMobileNumberBlacklistEntry, b.value = P;
        }
      }
      return !0;
    } catch {
      return l.value = !0, u.value = "Failed to update entry", !1;
    } finally {
      n.value = !1;
    }
  }
  async function d(o) {
    n.value = !0, l.value = !1;
    try {
      return await p.mutate({
        mutation: K,
        variables: { id: o }
      }), b.value = b.value.filter((r) => r.id !== o), !0;
    } catch {
      return l.value = !0, u.value = "Failed to delete entry", !1;
    } finally {
      n.value = !1;
    }
  }
  return {
    entries: g(b),
    countries: g(N),
    isLoading: g(t),
    isSaving: g(n),
    hasError: g(l),
    errorMessage: g(u),
    fetchEntries: f,
    fetchCountries: k,
    createEntry: y,
    updateEntry: m,
    deleteEntry: d
  };
}, Y = ["onSubmit"], G = { class: "mb-3" }, z = /* @__PURE__ */ e("label", { for: "country" }, "Country", -1), H = ["disabled"], J = /* @__PURE__ */ e("option", {
  value: "",
  disabled: ""
}, "Select a country", -1), X = ["value"], Z = { class: "mb-3" }, ee = /* @__PURE__ */ e("label", { for: "mobilePhoneNumber" }, "Mobile Phone Number", -1), te = ["disabled"], ne = { class: "d-flex justify-content-end" }, se = ["disabled"], le = ["disabled"], oe = { key: 0 }, ae = /* @__PURE__ */ e("span", {
  class: "spinner-border spinner-border-sm",
  role: "status"
}, null, -1), ie = { key: 1 }, ue = /* @__PURE__ */ M({
  __name: "BlacklistEntryForm",
  props: {
    countries: {},
    entry: {},
    isSaving: { type: Boolean }
  },
  emits: ["submit", "cancel"],
  setup(p, { emit: b }) {
    var f, k;
    const N = p, t = b, n = w({
      countryId: ((f = N.entry) == null ? void 0 : f.countryId) || "",
      mobilePhoneNumber: ((k = N.entry) == null ? void 0 : k.mobilePhoneNumber) || ""
    }), l = T(() => !!N.entry);
    function u() {
      !n.countryId || !n.mobilePhoneNumber || t("submit", n.countryId, n.mobilePhoneNumber);
    }
    return (y, m) => (i(), a("form", {
      onSubmit: A(u, ["prevent"])
    }, [
      e("div", G, [
        z,
        B(e("select", {
          id: "country",
          "onUpdate:modelValue": m[0] || (m[0] = (d) => n.countryId = d),
          class: "form-control",
          required: "",
          disabled: y.isSaving
        }, [
          J,
          (i(!0), a(S, null, I(y.countries, (d) => (i(), a("option", {
            key: d.id,
            value: d.id
          }, h(d.name) + " (" + h(d.formattedPhoneCode) + ") ", 9, X))), 128))
        ], 8, H), [
          [U, n.countryId]
        ])
      ]),
      e("div", Z, [
        ee,
        B(e("input", {
          id: "mobilePhoneNumber",
          type: "tel",
          "onUpdate:modelValue": m[1] || (m[1] = (d) => n.mobilePhoneNumber = d),
          class: "form-control",
          placeholder: "e.g. 501234567",
          required: "",
          disabled: y.isSaving
        }, null, 8, te), [
          [F, n.mobilePhoneNumber]
        ])
      ]),
      e("div", ne, [
        e("button", {
          type: "button",
          class: "btn btn-secondary me-2",
          onClick: m[2] || (m[2] = (d) => t("cancel")),
          disabled: y.isSaving
        }, " Cancel ", 8, se),
        e("button", {
          type: "submit",
          class: "btn btn-dark",
          disabled: y.isSaving || !n.countryId || !n.mobilePhoneNumber
        }, [
          y.isSaving ? (i(), a("span", oe, [
            ae,
            q(" Saving... ")
          ])) : (i(), a("span", ie, h(l.value ? "Update" : "Create"), 1))
        ], 8, le)
      ])
    ], 40, Y));
  }
}), re = { class: "d-flex justify-content-between align-items-center mb-3" }, ce = /* @__PURE__ */ e("h4", null, "Blacklisted Phone Numbers", -1), de = {
  key: 0,
  class: "card mb-3"
}, be = { class: "card-body" }, me = { class: "card-title" }, ye = {
  key: 1,
  class: "alert alert-danger"
}, ve = {
  key: 2,
  class: "text-center py-4"
}, he = /* @__PURE__ */ e("div", {
  class: "spinner-border",
  role: "status"
}, [
  /* @__PURE__ */ e("span", { class: "visually-hidden" }, "Loading...")
], -1), fe = [
  he
], _e = {
  key: 3,
  class: "table table-striped table-sm"
}, pe = /* @__PURE__ */ e("thead", null, [
  /* @__PURE__ */ e("tr", null, [
    /* @__PURE__ */ e("th", null, "ID"),
    /* @__PURE__ */ e("th", null, "Country"),
    /* @__PURE__ */ e("th", null, "Phone Number"),
    /* @__PURE__ */ e("th", null, "Full Number"),
    /* @__PURE__ */ e("th", null, "Actions")
  ])
], -1), Ne = { key: 0 }, ke = /* @__PURE__ */ e("td", {
  colspan: "5",
  class: "text-center text-muted py-3"
}, "No entries found", -1), Ee = [
  ke
], ge = ["onClick", "disabled"], Ce = ["onClick", "disabled"], Pe = { key: 1 }, $e = ["onClick", "disabled"], Me = /* @__PURE__ */ M({
  __name: "BlacklistView",
  setup(p) {
    const N = D("https://payments.crank-fit.com/api/graphql/"), t = Q(N), n = L(), l = _(!1), u = _(null), f = _(null);
    V(async () => {
      await Promise.all([t.fetchEntries(), t.fetchCountries()]);
    });
    function k() {
      u.value = null, l.value = !0;
    }
    function y(r) {
      u.value = r, l.value = !0;
    }
    function m() {
      l.value = !1, u.value = null;
    }
    async function d(r, c) {
      let s;
      u.value ? (s = await t.updateEntry(u.value.id, r, c), s && n.success("Entry updated successfully")) : (s = await t.createEntry(r, c), s && n.success("Entry created successfully")), s && m();
    }
    async function o(r) {
      await t.deleteEntry(r) && (n.success("Entry deleted successfully"), f.value = null);
    }
    return (r, c) => (i(), a("div", null, [
      e("div", re, [
        ce,
        l.value ? $("", !0) : (i(), a("button", {
          key: 0,
          class: "btn btn-primary",
          onClick: k
        }, " + Add Number "))
      ]),
      l.value ? (i(), a("div", de, [
        e("div", be, [
          e("h6", me, h(u.value ? "Edit Entry" : "Add New Entry"), 1),
          x(ue, {
            countries: v(t).countries.value,
            entry: u.value,
            "is-saving": v(t).isSaving.value,
            onSubmit: d,
            onCancel: m
          }, null, 8, ["countries", "entry", "is-saving"])
        ])
      ])) : $("", !0),
      v(t).hasError.value ? (i(), a("div", ye, h(v(t).errorMessage.value), 1)) : $("", !0),
      v(t).isLoading.value ? (i(), a("div", ve, fe)) : (i(), a("table", _e, [
        pe,
        e("tbody", null, [
          v(t).entries.value.length === 0 ? (i(), a("tr", Ne, Ee)) : $("", !0),
          (i(!0), a(S, null, I(v(t).entries.value, (s) => (i(), a("tr", {
            key: s.id
          }, [
            e("td", null, h(s.id), 1),
            e("td", null, h(s.countryName) + " (" + h(s.countryPhoneCode) + ")", 1),
            e("td", null, h(s.mobilePhoneNumber), 1),
            e("td", null, h(s.fullPhoneNumber), 1),
            e("td", null, [
              e("button", {
                class: "btn btn-outline-secondary btn-sm me-1",
                onClick: (E) => y(s),
                disabled: v(t).isSaving.value
              }, " Edit ", 8, ge),
              f.value !== s.id ? (i(), a("button", {
                key: 0,
                class: "btn btn-outline-danger btn-sm",
                onClick: (E) => f.value = s.id,
                disabled: v(t).isSaving.value
              }, " Delete ", 8, Ce)) : (i(), a("span", Pe, [
                e("button", {
                  class: "btn btn-danger btn-sm me-1",
                  onClick: (E) => o(s.id),
                  disabled: v(t).isSaving.value
                }, " Confirm ", 8, $e),
                e("button", {
                  class: "btn btn-secondary btn-sm",
                  onClick: c[0] || (c[0] = (E) => f.value = null)
                }, " Cancel ")
              ]))
            ])
          ]))), 128))
        ])
      ]))
    ]));
  }
});
export {
  Me as default
};
