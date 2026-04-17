import { r as i, P as u } from "./index.b0f32500.js";
const o = i([]);
let c = 0;
function s(e, r, n = 5e3) {
  const t = c++;
  o.value.push({ id: t, type: e, message: r }), n > 0 && setTimeout(() => {
    a(t);
  }, n);
}
function a(e) {
  o.value = o.value.filter((r) => r.id !== e);
}
function m() {
  return {
    messages: u(o),
    success(e) {
      s("success", e);
    },
    error(e) {
      s("error", e);
    },
    warning(e) {
      s("warning", e);
    },
    info(e) {
      s("info", e);
    },
    remove: a
  };
}
export {
  m as u
};
