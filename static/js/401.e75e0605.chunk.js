"use strict";(self.webpackChunkcryptohunter=self.webpackChunkcryptohunter||[]).push([[401],{5401:(e,t,n)=>{n.r(t),n.d(t,{default:()=>g});var s=n(2791),r=n(1614),a=n(890),i=n(5294),o=n(1785),l=n(1052),c=n.n(l),d=n(1087),u=n(7482),h=n(2119),m=n(184);const v=()=>{const{symbol:e,numberWithCommas:t,currency:n}=(0,o.U)(),[r,a]=(0,s.useState)([]),[l,v]=(0,s.useState)(!1),[g,y]=(0,s.useState)(null),p=async()=>{v(!0);const{data:e}=await i.Z.get((0,h.ZF)(n));a(e),v(!1)};(0,s.useEffect)((()=>{p()}),[n]),(0,s.useEffect)((()=>{p()}),[n]);const f=r.map((n=>{var s;let r=(null===n||void 0===n?void 0:n.price_change_percentage_24h)>=0;return(0,m.jsxs)(d.rU,{to:"/coin/".concat(n.id),className:"carouselItem",children:[(0,m.jsx)("img",{src:null===n||void 0===n?void 0:n.image,alt:n.name,height:"80",style:{marginBottom:10}}),(0,m.jsxs)("span",{children:[null===n||void 0===n?void 0:n.symbol,"\xa0",(0,m.jsxs)("span",{style:{color:r>0?"rgb(14, 203, 129)":"red",fontWeight:500},children:[r&&"+",null===n||void 0===n||null===(s=n.price_change_percentage_24h)||void 0===s?void 0:s.toFixed(2),"%"]})]}),(0,m.jsxs)("span",{style:{fontSize:22,fontWeight:500},children:[e," ",t(null===n||void 0===n?void 0:n.current_price.toFixed(2))]})]})}));return(0,m.jsx)("div",{className:"carousel",children:l?(0,m.jsx)(u.Z,{style:{backgroundColor:"red",width:"160vh"}}):(0,m.jsx)(c(),{mouseTracking:!0,infinite:!0,autoPlayInterval:1e3,animationDuration:1500,disableDotsControls:!0,disableButtonsControls:!0,responsive:{0:{items:2},512:{items:4}},items:f,autoPlay:!0})})},g=()=>(0,m.jsx)("div",{className:"banner",children:(0,m.jsxs)(r.Z,{className:"bannerContent",children:[(0,m.jsxs)("div",{className:"tagline",children:[(0,m.jsx)(a.Z,{variant:"h2",style:{fontWeight:"bold",marginBottom:15,fontFamily:"Montserrat",color:"Red"},children:"Crypto Currency"}),(0,m.jsx)(a.Z,{variant:"subtitle2",style:{color:"#FF7F50",textTransform:"capitalize",fontFamily:"Montserrat",fontWeight:"900"},children:"Get all the information regrading crypto currency"})]}),(0,m.jsx)(v,{})]})})}}]);
//# sourceMappingURL=401.e75e0605.chunk.js.map