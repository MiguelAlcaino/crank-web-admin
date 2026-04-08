import { N as o, r as l, O as s } from "./index.6fb1cfad.js";
const n = o`
  query AvailableSites {
    availableSites {
      name
      code
    }
  }
`, t = l([]);
let i = !1;
const u = (c) => {
  const a = l(!1);
  async function r() {
    if (!(i && t.value.length > 0)) {
      a.value = !0;
      try {
        const { data: e } = await c.query({
          query: n,
          fetchPolicy: "cache-first"
        });
        e != null && e.availableSites && (t.value = e.availableSites, i = !0);
      } catch (e) {
        console.error("Failed to fetch available sites", e);
      } finally {
        a.value = !1;
      }
    }
  }
  return {
    sites: s(t),
    isLoading: s(a),
    fetchSites: r
  };
};
export {
  u
};
