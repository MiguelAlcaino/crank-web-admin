// vue3-apexcharts does not expose its typings through package.json "exports", so they cannot be
// resolved with `moduleResolution: bundler`. Its typings also type the default export as
// `Component & Plugin`, which Vue 3.5's `app.use()` overloads reject. It is only ever installed as
// a plugin here, so declare it as one.
declare module 'vue3-apexcharts' {
  import type { Plugin } from 'vue'

  const VueApexCharts: Plugin
  export default VueApexCharts
}
