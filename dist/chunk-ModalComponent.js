import{C as R,c as _,l as i,T as S,o as a,h as s,q as E,g as t,s as n,p as d,_ as N}from"./chunk-vue3-simple-typeahead.esm.js";const B="UPS! SORRY, WE DIDN'T SEE THAT COMING!. PLEASE TRY AGAIN OR COMMUNICATE WITH THE TEAM TO RESOLVE THIS ISSUE.",M="THE SPOT WAS NOT FOUND IN THE LIST OF DISABLED SPOTS. THIS ERROR IS VERY UNLIKELY TO HAPPEN.",y="YOU ARE OUTSIDE THE EARLY CANCELLATION WINDOW. YOU CAN ONLY MAKE A LATE CANCELLATION.",P="THE USER IS ALREADY BOOKED IN THIS WAITLIST.",h="THE CLASS IS FULL.",W="THE WAITLIST IF FULL.",g="THE CLASS IS OUTSIDE THE SCHEDULING WINDOW.",v="THE SPOT HAS BEN BOOKED BY ANOTHER USER.",F="THE USER IS ALREADY BOOKED IN THIS CLASS.",K="PLEASE ENTER UNIQUE NAMES FOR SPOTS.",V="WAITLIST ENTRY NOT FOUND",G="ENROLLMENT NOT FOUND",Q="YOU ARE TRYING TO MOVE TO THE SAME SPOT",$="THE USER ARE ALREADY BOOKED IN A OVERLAPPING CLASS AND THIS BOOKING CANNOT BE COMPLETED.",c={class:"modal-mask"},I={class:"modal-wrapper"},L={class:"modal-dialog",role:"document"},A={class:"modal-content"},r={class:"modal-header border-0"},D={class:"modal-title"},p={key:0,type:"button",class:"close","data-dismiss":"modal","aria-label":"Close"},C={class:"modal-body"},m={class:"modal-footer border-0"},u=["disabled"],U={key:0,class:"spinner-border spinner-border-sm",role:"status","aria-hidden":"true"},b=["disabled"],H={key:0,class:"spinner-border spinner-border-sm",role:"status","aria-hidden":"true"},k=R({__name:"ModalComponent",props:{title:{},message:{},cancelText:{default:"Cancel"},okText:{default:"OK"},okLoading:{type:Boolean,default:!1},cancelLoading:{type:Boolean,default:!1},okDisabled:{type:Boolean,default:!1},cancelDisabled:{type:Boolean,default:!1},closable:{type:Boolean,default:!1}},emits:["onOk","onCancel"],setup(Y,{emit:T}){const l=T;return(e,o)=>(a(),_(S,{name:"modal"},{default:i(()=>[s("div",c,[s("div",I,[s("div",L,[s("div",A,[s("div",r,[s("h5",D,E(e.title),1),e.closable?(a(),t("button",p,[s("span",{"aria-hidden":"true",onClick:o[0]||(o[0]=O=>l("onCancel"))},"\xD7")])):n("",!0)]),s("div",C,[s("p",null,E(e.message),1)]),s("div",m,[e.cancelText!==null?(a(),t("button",{key:0,type:"button",class:"btn btn-default",onClick:o[1]||(o[1]=O=>l("onCancel")),disabled:e.cancelDisabled||e.cancelLoading||e.okLoading},[d(E(e.cancelText)+" ",1),e.cancelLoading?(a(),t("span",U)):n("",!0)],8,u)):n("",!0),e.okText!==null?(a(),t("button",{key:1,class:"btn btn-primary",type:"button",disabled:e.okLoading||e.okDisabled||e.cancelLoading,onClick:o[2]||(o[2]=O=>l("onOk"))},[d(E(e.okText)+" ",1),e.okLoading?(a(),t("span",H)):n("",!0)],8,b)):n("",!0)])])])])])]),_:1}))}});const w=N(k,[["__scopeId","data-v-c7d50198"]]);export{B as E,w as M,K as a,G as b,h as c,g as d,F as e,$ as f,W as g,P as h,V as i,M as j,v as k,Q as l,y as m};
