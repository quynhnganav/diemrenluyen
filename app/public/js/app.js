(self.webpackChunk=self.webpackChunk||[]).push([[773],{1090:(e,t,r)=>{"use strict";var n=r(7294),o=r(3935),c=r(3727),a=r(5977),s=[{component:"react",path:"/sv"},{component:"vue",path:"/gv"}],i=r(5893),u={};s.forEach((function(e){u[e.component]=(0,n.lazy)((function(){return r(1093)("./".concat(e.component))}))}));const p=function(e){var t=e.data;return console.log(t),(0,i.jsx)(c.VK,{children:(0,i.jsx)(n.Suspense,{fallback:"Loading...",children:(0,i.jsx)(a.rs,{children:s.map((function(e,t){return(0,i.jsx)(a.AW,{exact:!0,path:e.path,component:u[e.component]},t)}))})})})};function f(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function l(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}r(1689);var O={},d=document.getElementById("app");if(d){var b=Object.assign({},d.dataset);Object.keys(b).forEach((function(e){O[e]=JSON.parse(b[e])}))}o.render((0,i.jsx)(p,function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?f(Object(r),!0).forEach((function(t){l(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):f(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}({},O)),d)},1689:(e,t,r)=>{window._=r(6486),window.axios=r(9669),window.axios.defaults.headers.common["X-Requested-With"]="XMLHttpRequest"},1100:()=>{},1093:(e,t,r)=>{var n={"./react":[6514,898,514],"./react/":[6514,898,514],"./react/index":[6514,898,514],"./react/index.js":[6514,898,514],"./react/style.scss":[7791,898,791],"./vue":[133,133],"./vue/":[133,133],"./vue/index":[133,133],"./vue/index.js":[133,133]};function o(e){if(!r.o(n,e))return Promise.resolve().then((()=>{var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}));var t=n[e],o=t[0];return Promise.all(t.slice(1).map(r.e)).then((()=>r(o)))}o.keys=()=>Object.keys(n),o.id=1093,e.exports=o}},e=>{var t=t=>e(e.s=t);e.O(0,[170,898],(()=>(t(1090),t(1100))));e.O()}]);