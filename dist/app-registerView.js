import{E as n,F as u,G as i,H as m,J as f,L as r,M as d,N as c,O as A,D as S}from"./chunk-vue3-simple-typeahead.esm.js";/* empty css             */import{C as l}from"./chunk-vue3-context-menu.umd.min.js";import{l as v,f as w,a as b,b as g}from"./chunk-vue3-simple-typeahead.js";import y from"./chunk-RegisterView.js";import"./chunk-ModalComponent.js";v.add(w,b,g);q();async function q(){const t=document.querySelector("#vue-app-parameters"),s=t==null?void 0:t.dataset.token,a=t==null?void 0:t.dataset.gqlUrl,o=t==null?void 0:t.dataset.appDiv,p=t==null?void 0:t.dataset.urlAfterSubmit,e=n({setup(){r("url-after-submit",p),r("gqlApiService",new d(c(a),A(a)))},render:()=>S(y)});e.use(u()).use(i).use(m).use(l),f().setSession(s),e.mount(o)}
