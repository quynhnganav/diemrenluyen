(self.webpackChunk=self.webpackChunk||[]).push([[773],{8118:(e,n,t)=>{"use strict";var a=t(7294),i=t(3935),r=t(807),o=t(3727),u=t(5977),c=[{component:"react",path:"/sv"},{component:"vue",path:"/gv"},{component:"sv/danh-gia",path:"/sv/danh-gia"},{component:"admin/DM_MauTieuChi",path:"/admin/DM_MauTieuChi"},{component:"admin/DM_DotDanhGia",path:"/admin/DM_DotDanhGia"},{component:"404",path:"*"}],d=t(5893),s={};c.forEach((function(e){s[e.component]=(0,a.lazy)((function(){return t(1093)("./".concat(e.component))}))})),console.log(s);const l=function(){return(0,d.jsx)(o.VK,{children:(0,d.jsx)(a.Suspense,{fallback:"Loading...",children:(0,d.jsx)(u.rs,{children:c.map((function(e,n){return(0,d.jsx)(u.AW,{exact:!0,path:e.path,component:s[e.component]},n)}))})})})};const h=function(e){var n=e.data;return(0,d.jsx)(r.Z,{data:n,children:(0,d.jsx)(l,{})})};function m(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function M(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}t(1689);var D={},f=document.getElementById("app");if(f){var p=Object.assign({},f.dataset);Object.keys(p).forEach((function(e){D[e]=JSON.parse(p[e])}))}i.render((0,d.jsx)(h,function(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?m(Object(t),!0).forEach((function(n){M(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):m(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}({},D)),f)},1689:(e,n,t)=>{window._=t(6486),window.axios=t(9669),window.axios.defaults.headers.common["X-Requested-With"]="XMLHttpRequest"},807:(e,n,t)=>{"use strict";t.d(n,{Z:()=>c,L:()=>d});var a=t(7294),i=t(5893);function r(e,n){return function(e){if(Array.isArray(e))return e}(e)||function(e,n){var t=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==t)return;var a,i,r=[],o=!0,u=!1;try{for(t=t.call(e);!(o=(a=t.next()).done)&&(r.push(a.value),!n||r.length!==n);o=!0);}catch(e){u=!0,i=e}finally{try{o||null==t.return||t.return()}finally{if(u)throw i}}return r}(e,n)||function(e,n){if(!e)return;if("string"==typeof e)return o(e,n);var t=Object.prototype.toString.call(e).slice(8,-1);"Object"===t&&e.constructor&&(t=e.constructor.name);if("Map"===t||"Set"===t)return Array.from(e);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return o(e,n)}(e,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function o(e,n){(null==n||n>e.length)&&(n=e.length);for(var t=0,a=new Array(n);t<n;t++)a[t]=e[t];return a}var u=(0,a.createContext)();const c=function(e){var n=e.children,t=e.data,o=r((0,a.useState)(t),1)[0];return(0,i.jsx)(u.Provider,{value:{data:o},children:n})};var d=function(){return(0,a.useContext)(u)}},1100:()=>{},1093:(e,n,t)=>{var a={"./404":[38,38],"./404.js":[38,38],"./admin/DM_DotDanhGia":[7306,898,306],"./admin/DM_DotDanhGia/":[7306,898,306],"./admin/DM_DotDanhGia/ModalForm":[3101,898,101],"./admin/DM_DotDanhGia/ModalForm/":[3101,898,101],"./admin/DM_DotDanhGia/ModalForm/index":[3101,898,101],"./admin/DM_DotDanhGia/ModalForm/index.js":[3101,898,101],"./admin/DM_DotDanhGia/index":[7306,898,306],"./admin/DM_DotDanhGia/index.js":[7306,898,306],"./admin/DM_DotDanhGia/index.scss":[3359,898,359],"./admin/DM_MauTieuChi":[5069,898,69],"./admin/DM_MauTieuChi/":[5069,898,69],"./admin/DM_MauTieuChi/ModalChiTiet":[5777,898,777],"./admin/DM_MauTieuChi/ModalChiTiet/":[5777,898,777],"./admin/DM_MauTieuChi/ModalChiTiet/index":[5777,898,777],"./admin/DM_MauTieuChi/ModalChiTiet/index.js":[5777,898,777],"./admin/DM_MauTieuChi/ModalChiTiet/style.scss":[4700,898,700],"./admin/DM_MauTieuChi/ModalForm":[6822,898,822],"./admin/DM_MauTieuChi/ModalForm/":[6822,898,822],"./admin/DM_MauTieuChi/ModalForm/index":[6822,898,822],"./admin/DM_MauTieuChi/ModalForm/index.js":[6822,898,822],"./admin/DM_MauTieuChi/index":[5069,898,69],"./admin/DM_MauTieuChi/index.js":[5069,898,69],"./admin/DM_MauTieuChi/index.scss":[3668,898,668],"./react":[6514,898,514],"./react/":[6514,898,514],"./react/index":[6514,898,514],"./react/index.js":[6514,898,514],"./react/style.scss":[7791,898,791],"./sv/danh-gia":[4838,898,838],"./sv/danh-gia/":[4838,898,838],"./sv/danh-gia/index":[4838,898,838],"./sv/danh-gia/index.js":[4838,898,838],"./vue":[133,133],"./vue/":[133,133],"./vue/index":[133,133],"./vue/index.js":[133,133]};function i(e){if(!t.o(a,e))return Promise.resolve().then((()=>{var n=new Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}));var n=a[e],i=n[0];return Promise.all(n.slice(1).map(t.e)).then((()=>t(i)))}i.keys=()=>Object.keys(a),i.id=1093,e.exports=i}},e=>{var n=n=>e(e.s=n);e.O(0,[170,898],(()=>(n(8118),n(1100))));e.O()}]);