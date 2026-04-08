import { M as C, r as _, N as g, d as B, a as w, c as T, b as r, e, f as M, v as U, F as S, h as I, i as A, A as F, t as h, w as q, o as u, G as D, H as L, j as $, k as V, g as v } from "./index.cc2eb486.js";
import { u as x } from "./useToast.6a51987c.js";
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
`, Q = C`
  mutation DeleteMobileNumberBlacklistEntry($id: ID!) {
    deleteMobileNumberBlacklistEntry(id: $id)
  }
`, Y = (p) => {
  const b = _([]), N = _([]), t = _(!1), n = _(!1), l = _(!1), c = _("");
  async function f() {
    t.value = !0, l.value = !1;
    try {
      const { data: o } = await p.query({
        query: O,
        fetchPolicy: "network-only"
      });
      b.value = o.mobileNumberBlacklist;
    } catch {
      l.value = !0, c.value = "Failed to load blacklist entries";
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
  async function y(o, a) {
    n.value = !0, l.value = !1;
    try {
      const { data: i } = await p.mutate({
        mutation: j,
        variables: { input: { countryId: o, mobilePhoneNumber: a } }
      });
      return i != null && i.createMobileNumberBlacklistEntry && (b.value = [...b.value, i.createMobileNumberBlacklistEntry]), !0;
    } catch {
      return l.value = !0, c.value = "Failed to create entry", !1;
    } finally {
      n.value = !1;
    }
  }
  async function m(o, a, i) {
    n.value = !0, l.value = !1;
    try {
      const { data: s } = await p.mutate({
        mutation: W,
        variables: { id: o, input: { countryId: a, mobilePhoneNumber: i } }
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
      return l.value = !0, c.value = "Failed to update entry", !1;
    } finally {
      n.value = !1;
    }
  }
  async function d(o) {
    n.value = !0, l.value = !1;
    try {
      const { data: a } = await p.mutate({
        mutation: Q,
        variables: { id: o }
      });
      return a != null && a.deleteMobileNumberBlacklistEntry && (b.value = b.value.filter((i) => i.id !== o)), !0;
    } catch {
      return l.value = !0, c.value = "Failed to delete entry", !1;
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
    errorMessage: g(c),
    fetchEntries: f,
    fetchCountries: k,
    createEntry: y,
    updateEntry: m,
    deleteEntry: d
  };
}, G = ["onSubmit"], H = { class: "form-group mb-3" }, K = /* @__PURE__ */ e("label", { for: "country" }, "Country", -1), z = ["disabled"], J = /* @__PURE__ */ e("option", {
  value: "",
  disabled: ""
}, "Select a country", -1), X = ["value"], Z = { class: "form-group mb-3" }, ee = /* @__PURE__ */ e("label", { for: "mobilePhoneNumber" }, "Mobile Phone Number", -1), te = ["disabled"], ne = { class: "d-flex justify-content-end" }, se = ["disabled"], le = ["disabled"], oe = { key: 0 }, ae = /* @__PURE__ */ e("span", {
  class: "spinner-border spinner-border-sm",
  role: "status"
}, null, -1), ie = { key: 1 }, re = /* @__PURE__ */ B({
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
    function c() {
      !n.countryId || !n.mobilePhoneNumber || t("submit", n.countryId, n.mobilePhoneNumber);
    }
    return (y, m) => (u(), r("form", {
      onSubmit: q(c, ["prevent"])
    }, [
      e("div", H, [
        K,
        M(e("select", {
          id: "country",
          "onUpdate:modelValue": m[0] || (m[0] = (d) => n.countryId = d),
          class: "form-control",
          required: "",
          disabled: y.isSaving
        }, [
          J,
          (u(!0), r(S, null, I(y.countries, (d) => (u(), r("option", {
            key: d.id,
            value: d.id
          }, h(d.name) + " (" + h(d.formattedPhoneCode) + ") ", 9, X))), 128))
        ], 8, z), [
          [U, n.countryId]
        ])
      ]),
      e("div", Z, [
        ee,
        M(e("input", {
          id: "mobilePhoneNumber",
          type: "tel",
          "onUpdate:modelValue": m[1] || (m[1] = (d) => n.mobilePhoneNumber = d),
          class: "form-control",
          placeholder: "e.g. 501234567",
          required: "",
          disabled: y.isSaving
        }, null, 8, te), [
          [A, n.mobilePhoneNumber]
        ])
      ]),
      e("div", ne, [
        e("button", {
          type: "button",
          class: "btn btn-secondary mr-2",
          onClick: m[2] || (m[2] = (d) => t("cancel")),
          disabled: y.isSaving
        }, " Cancel ", 8, se),
        e("button", {
          type: "submit",
          class: "btn btn-dark",
          disabled: y.isSaving || !n.countryId || !n.mobilePhoneNumber
        }, [
          y.isSaving ? (u(), r("span", oe, [
            ae,
            F(" Saving... ")
          ])) : (u(), r("span", ie, h(l.value ? "Update" : "Create"), 1))
        ], 8, le)
      ])
    ], 40, G));
  }
}), ue = { class: "d-flex justify-content-between align-items-center mb-3" }, ce = /* @__PURE__ */ e("h4", null, "Blacklisted Phone Numbers", -1), de = {
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
  /* @__PURE__ */ e("span", { class: "sr-only" }, "Loading...")
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
], ge = ["onClick", "disabled"], Ce = ["onClick", "disabled"], Pe = { key: 1 }, $e = ["onClick", "disabled"], Se = /* @__PURE__ */ B({
  __name: "BlacklistView",
  setup(p) {
    const N = D("https://payments.crank-fit.com/api/graphql/"), t = Y(N), n = x(), l = _(!1), c = _(null), f = _(null);
    L(async () => {
      await Promise.all([t.fetchEntries(), t.fetchCountries()]);
    });
    function k() {
      c.value = null, l.value = !0;
    }
    function y(a) {
      c.value = a, l.value = !0;
    }
    function m() {
      l.value = !1, c.value = null;
    }
    async function d(a, i) {
      let s;
      c.value ? (s = await t.updateEntry(c.value.id, a, i), s && n.success("Entry updated successfully")) : (s = await t.createEntry(a, i), s && n.success("Entry created successfully")), s && m();
    }
    async function o(a) {
      await t.deleteEntry(a) && (n.success("Entry deleted successfully"), f.value = null);
    }
    return (a, i) => (u(), r("div", null, [
      e("div", ue, [
        ce,
        l.value ? $("", !0) : (u(), r("button", {
          key: 0,
          class: "btn btn-dark btn-sm",
          onClick: k
        }, " + Add Number "))
      ]),
      l.value ? (u(), r("div", de, [
        e("div", be, [
          e("h6", me, h(c.value ? "Edit Entry" : "Add New Entry"), 1),
          V(re, {
            countries: v(t).countries.value,
            entry: c.value,
            "is-saving": v(t).isSaving.value,
            onSubmit: d,
            onCancel: m
          }, null, 8, ["countries", "entry", "is-saving"])
        ])
      ])) : $("", !0),
      v(t).hasError.value ? (u(), r("div", ye, h(v(t).errorMessage.value), 1)) : $("", !0),
      v(t).isLoading.value ? (u(), r("div", ve, fe)) : (u(), r("table", _e, [
        pe,
        e("tbody", null, [
          v(t).entries.value.length === 0 ? (u(), r("tr", Ne, Ee)) : $("", !0),
          (u(!0), r(S, null, I(v(t).entries.value, (s) => (u(), r("tr", {
            key: s.id
          }, [
            e("td", null, h(s.id), 1),
            e("td", null, h(s.countryName) + " (" + h(s.countryPhoneCode) + ")", 1),
            e("td", null, h(s.mobilePhoneNumber), 1),
            e("td", null, h(s.fullPhoneNumber), 1),
            e("td", null, [
              e("button", {
                class: "btn btn-outline-secondary btn-sm mr-1",
                onClick: (E) => y(s),
                disabled: v(t).isSaving.value
              }, " Edit ", 8, ge),
              f.value !== s.id ? (u(), r("button", {
                key: 0,
                class: "btn btn-outline-danger btn-sm",
                onClick: (E) => f.value = s.id,
                disabled: v(t).isSaving.value
              }, " Delete ", 8, Ce)) : (u(), r("span", Pe, [
                e("button", {
                  class: "btn btn-danger btn-sm mr-1",
                  onClick: (E) => o(s.id),
                  disabled: v(t).isSaving.value
                }, " Confirm ", 8, $e),
                e("button", {
                  class: "btn btn-secondary btn-sm",
                  onClick: i[0] || (i[0] = (E) => f.value = null)
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
  Se as default
};
