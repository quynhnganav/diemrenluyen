(self.webpackChunk=self.webpackChunk||[]).push([[773],{8118:(n,e,i)=>{"use strict";var r=i(7294),t=i(3935),o=i(807),l=i(3727),u=i(5977),a=[{component:"sv/danh-gia",exact:!0,path:"/sv/danh-gia"},{component:"sv/cbl/danh-gia",exact:!0,path:"/sv/cbl/danh-gia"},{component:"sv/cbl/danh-gia-sv",exact:!0,path:"/sv/cbl/danh-gia/:idSV"},{component:"gv/diem-ren-luyen",exact:!0,path:"/gv/diem-ren-luyen"},{component:"gv/diem-ren-luyen-sv",exact:!0,path:"/gv/diem-ren-luyen/:idSV"},{component:"admin/DM_DiemRenLuyen",exact:!0,path:"/admin/DM_DiemRenLuyen"},{component:"admin/DM_MauTieuChi",exact:!0,path:"/admin/DM_MauTieuChi"},{component:"admin/DM_HocKy",exact:!0,path:"/admin/DM_DotDanhGia"},{component:"404",exact:!0,path:"*"}],d=i(5893),c={};a.forEach((function(n){c[n.component]=(0,r.lazy)((function(){return i(1093)("./".concat(n.component))}))}));const s=function(){return(0,d.jsx)(l.VK,{children:(0,d.jsx)(r.Suspense,{fallback:"Loading...",children:(0,d.jsx)(u.rs,{children:a.map((function(n,e){return(0,d.jsx)(u.AW,{exact:n.exact,path:n.path,component:c[n.component]},e)}))})})})};const v=function(n){var e=n.data;return(0,d.jsx)(o.ZP,{data:e,children:(0,d.jsx)(s,{})})};function h(n,e){var i=Object.keys(n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(n);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),i.push.apply(i,r)}return i}function f(n,e,i){return e in n?Object.defineProperty(n,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):n[e]=i,n}i(1689);var m={},p=document.getElementById("app");if(p){var y=Object.assign({},p.dataset);Object.keys(y).forEach((function(n){m[n]=JSON.parse(y[n])}))}t.render((0,d.jsx)(v,function(n){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{};e%2?h(Object(i),!0).forEach((function(e){f(n,e,i[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(i)):h(Object(i)).forEach((function(e){Object.defineProperty(n,e,Object.getOwnPropertyDescriptor(i,e))}))}return n}({},m)),p)},1689:(n,e,i)=>{window._=i(6486),window.axios=i(9669),window.axios.defaults.headers.common["X-Requested-With"]="XMLHttpRequest"},807:(n,e,i)=>{"use strict";i.d(e,{ZP:()=>d,LT:()=>c,YS:()=>s});var r=i(7294),t=i(6659),o=i(5893);function l(n,e){return function(n){if(Array.isArray(n))return n}(n)||function(n,e){var i=null==n?null:"undefined"!=typeof Symbol&&n[Symbol.iterator]||n["@@iterator"];if(null==i)return;var r,t,o=[],l=!0,u=!1;try{for(i=i.call(n);!(l=(r=i.next()).done)&&(o.push(r.value),!e||o.length!==e);l=!0);}catch(n){u=!0,t=n}finally{try{l||null==i.return||i.return()}finally{if(u)throw t}}return o}(n,e)||function(n,e){if(!n)return;if("string"==typeof n)return u(n,e);var i=Object.prototype.toString.call(n).slice(8,-1);"Object"===i&&n.constructor&&(i=n.constructor.name);if("Map"===i||"Set"===i)return Array.from(n);if("Arguments"===i||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i))return u(n,e)}(n,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function u(n,e){(null==e||e>n.length)&&(e=n.length);for(var i=0,r=new Array(e);i<e;i++)r[i]=n[i];return r}var a=(0,r.createContext)();const d=function(n){var e=n.children,i=(n.data,l((0,r.useReducer)(t.I6,{dsSinhViens:[],index:0}),2)),u=i[0],d=i[1];return(0,o.jsx)(a.Provider,{value:{state:u,setState:d},children:e})};var c=function(){return(0,r.useContext)(a)},s=function(){var n=(0,r.useContext)(a),e=n.state,i=n.setState,t=(0,r.useCallback)((function(){i({index:e.index+1})}),[e]),o=(0,r.useCallback)((function(){i({index:e.index-1})}),[e]),l=(0,r.useCallback)((function(n){var r=e.dsSinhViens.findIndex((function(e){return e.id==n}));i({index:r})}),[e]),u=(0,r.useCallback)((function(n){i({dsSinhViens:n})}),[]);return{current:e.dsSinhViens[e.index],next:e.dsSinhViens[e.index+1],prev:e.dsSinhViens[e.index-1],nextSV:t,prevSV:o,gotoSV:l,setIdsSv:u,dsSinhViens:e.dsSinhViens}}},6659:(n,e,i)=>{"use strict";i.d(e,{Fb:()=>s,Mv:()=>v,FT:()=>h,I6:()=>f,c1:()=>m,gz:()=>p,ZF:()=>y,ZC:()=>g,fK:()=>b});var r=i(6486);function t(n,e){return function(n){if(Array.isArray(n))return n}(n)||function(n,e){var i=null==n?null:"undefined"!=typeof Symbol&&n[Symbol.iterator]||n["@@iterator"];if(null==i)return;var r,t,o=[],l=!0,u=!1;try{for(i=i.call(n);!(l=(r=i.next()).done)&&(o.push(r.value),!e||o.length!==e);l=!0);}catch(n){u=!0,t=n}finally{try{l||null==i.return||i.return()}finally{if(u)throw t}}return o}(n,e)||l(n,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function o(n){return function(n){if(Array.isArray(n))return u(n)}(n)||function(n){if("undefined"!=typeof Symbol&&null!=n[Symbol.iterator]||null!=n["@@iterator"])return Array.from(n)}(n)||l(n)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function l(n,e){if(n){if("string"==typeof n)return u(n,e);var i=Object.prototype.toString.call(n).slice(8,-1);return"Object"===i&&n.constructor&&(i=n.constructor.name),"Map"===i||"Set"===i?Array.from(n):"Arguments"===i||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)?u(n,e):void 0}}function u(n,e){(null==e||e>n.length)&&(e=n.length);for(var i=0,r=new Array(e);i<e;i++)r[i]=n[i];return r}function a(n,e){var i=Object.keys(n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(n);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),i.push.apply(i,r)}return i}function d(n){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{};e%2?a(Object(i),!0).forEach((function(e){c(n,e,i[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(i)):a(Object(i)).forEach((function(e){Object.defineProperty(n,e,Object.getOwnPropertyDescriptor(i,e))}))}return n}function c(n,e,i){return e in n?Object.defineProperty(n,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):n[e]=i,n}var s=function(n){var e,i,r,t,o,l,u,a,d,c,s,v,h,f,m,p,y,g,b,x=null!==(e=null==n?void 0:n.total)&&void 0!==e?e:0;return[{id:"xuatsac",xeploai:"Loại xuất sắc có",soluong:null!==(i=null==n?void 0:n.xuatsac)&&void 0!==i?i:0,tyle:"".concat(x<1?0:(null!==(r=null==n?void 0:n.xuatsac)&&void 0!==r?r:0)/x*100,"%")},{id:"tot",xeploai:"Loại tốt có",soluong:null!==(t=null==n?void 0:n.tot)&&void 0!==t?t:0,tyle:x<1?0:(null!==(o=null==n?void 0:n.tot)&&void 0!==o?o:0)/x*100},{id:"kha",xeploai:"Loại khá có",soluong:null!==(l=null==n?void 0:n.kha)&&void 0!==l?l:0,tyle:x<1?0:(null!==(u=null==n?void 0:n.kha)&&void 0!==u?u:0)/x*100},{id:"trungbinh",xeploai:"Loại trung bình có",soluong:null!==(a=null==n?void 0:n.trungbinh)&&void 0!==a?a:0,tyle:x<1?0:(null!==(d=null==n?void 0:n.trungbinh)&&void 0!==d?d:0)/x*100},{id:"yeu",xeploai:"Loại yếu có",soluong:null!==(c=null==n?void 0:n.yeu)&&void 0!==c?c:0,tyle:x<1?0:(null!==(s=null==n?void 0:n.yeu)&&void 0!==s?s:0)/x*100},{id:"kem",xeploai:"Loại kém có",soluong:null!==(v=null==n?void 0:n.kem)&&void 0!==v?v:0,tyle:x<1?0:(null!==(h=null==n?void 0:n.kem)&&void 0!==h?h:0)/x*100},{id:"total",xeploai:"Tổng",isTotal:!0,soluong:x,tyle:x<1?0:((null!==(f=null==n?void 0:n.xuatsac)&&void 0!==f?f:0)+(null!==(m=null==n?void 0:n.tot)&&void 0!==m?m:0)+(null!==(p=null==n?void 0:n.kha)&&void 0!==p?p:0)+(null!==(y=null==n?void 0:n.trungbinh)&&void 0!==y?y:0)+(null!==(g=null==n?void 0:n.yeu)&&void 0!==g?g:0)+(null!==(b=null==n?void 0:n.kem)&&void 0!==b?b:0))/x*100}]},v=function(n){return n||0==n?n<35?"Kém":n<50?"Yếu":n<65?"Trung bình":n<80?"Khá":n<90?"Tốt":n<=100?"Xuất sắc":void 0:""},h=function(n){return n?n.replace(/[àáâãăạảấầẩẫậắằẳẵặ]/g,"a").replace(/[ÀÁÂÃĂẠẢẤẦẨẪẬẮẰẲẴẶ]/g,"A").replace(/[òóôõơọỏốồổỗộớờởỡợ]/g,"o").replace(/[ÒÓÔÕƠỌỎỐỒỔỖỘỚỜỞỠỢ]/g,"O").replace(/[èéêẹẻẽếềểễệ]/g,"e").replace(/[ÈÉÊẸẺẼẾỀỂỄỆ]/g,"E").replace(/[ùúũưụủứừửữự]/g,"u").replace(/[ÙÚŨƯỤỦỨỪỬỮỰ]/g,"U").replace(/[ìíĩỉị]/g,"i").replace(/[ÌÍĨỈỊ]/g,"I").replace(/[ýỳỵỷỹ]/g,"y").replace(/[ÝỲỴỶỸ]/g,"Y").replace(/đ/g,"d").replace(/Đ/g,"D").replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g,"").replace(/\u02C6|\u0306|\u031B/g,"").replace(/\s+/g," ").trim():""};function f(n,e){return d(d({},n),e)}var m=function(){var n=0,e=0,i=function i(t,l,u){var a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0,d=arguments.length>4?arguments[4]:void 0,c=arguments.length>5?arguments[5]:void 0,s=arguments.length>6?arguments[6]:void 0;u?t.id=++n:null!=t&&t.id||(t.id=++n),t.root=l,t.level=++a,t.indexs=d,null!=t&&t.isDiemHocTap&&(e=null==t?void 0:t.id),c["TenTieuChi-".concat(t.id)]=(null==t?void 0:t.TenTieuChi)||"";var v,h=(null==t?void 0:t.SoDiem)||0;(0,r.isEmpty)(t.children)?delete t.children:(h=0,null==t||null===(v=t.children)||void 0===v||v.forEach((function(n,e){h+=i(n,!1,u,a,[].concat(o(d),[e+1]),c,s)})));return s["SoDiem-".concat(t.id)]=h,h};return{renderTree:function(n,r){var t={},o={},l=0;return null==n||n.forEach((function(n,e){l+=i(n,!0,r,0,[e+1],t,o)})),[n,t,o,l,e]},getIdCurrent:function(){return++n}}},p=function(n,e){var i=function n(e,i){var t;if(i==(null==e?void 0:e.id))return null!=e&&e.children||(e.children=[]),null==e||null===(t=e.children)||void 0===t||t.push({TenTieuChi:"",SoDiem:0,Css:""}),!0;if(!(0,r.isEmpty)(e.children))for(var o=0;o<(null==e||null===(l=e.children)||void 0===l?void 0:l.length);o++){var l;if(n(null==e?void 0:e.children[o],i))return!0}return!1};if(-1===e)return n.unshift({TenTieuChi:"",SoDiem:0,Css:""}),n;if(-2===e)return n.push({TenTieuChi:"",SoDiem:0,Css:""}),n;for(var t=0;t<n.length;t++){if(i(n[t],e))return n}return n},y=function(n,e){for(var i=function n(e,i){var t;if((0,r.isEmpty)(null==e?void 0:e.children))return null;if(null!=e&&null!==(t=e.children)&&void 0!==t&&t.find((function(n){return(null==n?void 0:n.id)==i})))return e.children=(0,r.differenceBy)(null==e?void 0:e.children,[{id:i}],"id"),!0;if(!(0,r.isEmpty)(e.children))for(var o=0;o<(null==e||null===(l=e.children)||void 0===l?void 0:l.length);o++){var l;if(n(null==e?void 0:e.children[o],i))return!0}return!1},t=0;t<n.length;t++){var o=n[t];if((null==o?void 0:o.id)==e)return n=(0,r.differenceBy)(n,[{id:e}],"id");if(i(o,e))return n}return n},g=function(n,e,i,t){for(var o=function n(e,i,t,o){if((null==e?void 0:e.id)==i)return e[o]=t,!0;if(!(0,r.isEmpty)(e.children))for(var l=0;l<(null==e||null===(u=e.children)||void 0===u?void 0:u.length);l++){var u;if(n(null==e?void 0:e.children[l],i,t,o))return!0}return!1},l=0;l<n.length;l++){var u=n[l];if((null==u?void 0:u.id)==e)return u[t]=i,n;if(o(u,e,i,t))return n}return n},b=function(n){var e=[],i=0,r=0,o=0,l={};return null==n||n.forEach((function(n,u){var a=t(x(n,!0,0,[u+1],e,l),3),d=a[0],c=a[1],s=a[2];i+=d,r+=c,o+=s})),e.forEach((function(n){delete n.children})),[e,i,l,r,o]},x=function n(e,i){var l=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,u=arguments.length>3?arguments[3]:void 0,a=arguments.length>4?arguments[4]:void 0,c=arguments.length>5?arguments[5]:void 0,s=d(d({},e),{},{root:i,level:++l,index:u,SoDiemSV:(null==e?void 0:e.SoDiemSV)||0,SoDiemCBL:(null==e?void 0:e.SoDiemCBL)||0});a.push(s);var v,h=(null==e?void 0:e.SoDiem)||0,f=(null==e?void 0:e.SoDiemSV)||0,m=(null==e?void 0:e.SoDiemCBL)||0;(0,r.isEmpty)(e.children)?(delete e.children,e.isUnit=!0):(s.isParent=!0,h=0,f=0,m=0,null==e||null===(v=e.children)||void 0===v||v.forEach((function(e,i){var r=t(n(e,!1,l,[].concat(o(u),[i+1]),a,c),3),d=r[0],s=r[1],v=r[2];h+=d,f+=s,m+=v})));return s.SoDiem=h,s["SoDiemSV-".concat(null==e?void 0:e.id)]=f,s["SoDiemCBL-".concat(null==e?void 0:e.id)]=m,c["SoDiemSV-".concat(null==e?void 0:e.id)]=f,c["SoDiemCBL-".concat(null==e?void 0:e.id)]=m,[h,f,m]}},1100:()=>{},1093:(n,e,i)=>{var r={"./404":[38,38],"./404.js":[38,38],"./admin/DM_DiemRenLuyen":[7122,898,122],"./admin/DM_DiemRenLuyen/":[7122,898,122],"./admin/DM_DiemRenLuyen/index":[7122,898,122],"./admin/DM_DiemRenLuyen/index.js":[7122,898,122],"./admin/DM_HocKy":[9614,898,614],"./admin/DM_HocKy/":[9614,898,614],"./admin/DM_HocKy/ModalForm":[1710,898,710],"./admin/DM_HocKy/ModalForm/":[1710,898,710],"./admin/DM_HocKy/ModalForm/index":[1710,898,710],"./admin/DM_HocKy/ModalForm/index.js":[1710,898,710],"./admin/DM_HocKy/index":[9614,898,614],"./admin/DM_HocKy/index.js":[9614,898,614],"./admin/DM_HocKy/style.scss":[3657,898,657],"./admin/DM_MauTieuChi":[5069,898,69],"./admin/DM_MauTieuChi/":[5069,898,69],"./admin/DM_MauTieuChi/ModalChiTiet":[5777,898,777],"./admin/DM_MauTieuChi/ModalChiTiet/":[5777,898,777],"./admin/DM_MauTieuChi/ModalChiTiet/index":[5777,898,777],"./admin/DM_MauTieuChi/ModalChiTiet/index.js":[5777,898,777],"./admin/DM_MauTieuChi/ModalChiTiet/style.scss":[4700,898,700],"./admin/DM_MauTieuChi/ModalForm":[6822,898,822],"./admin/DM_MauTieuChi/ModalForm/":[6822,898,822],"./admin/DM_MauTieuChi/ModalForm/index":[6822,898,822],"./admin/DM_MauTieuChi/ModalForm/index.js":[6822,898,822],"./admin/DM_MauTieuChi/index":[5069,898,69],"./admin/DM_MauTieuChi/index.js":[5069,898,69],"./admin/DM_MauTieuChi/index.scss":[3668,898,668],"./gv/diem-ren-luyen":[6115,898,115],"./gv/diem-ren-luyen-sv":[8505,898,52],"./gv/diem-ren-luyen-sv/":[8505,898,52],"./gv/diem-ren-luyen-sv/index":[8505,898,52],"./gv/diem-ren-luyen-sv/index.js":[8505,898,52],"./gv/diem-ren-luyen/":[6115,898,115],"./gv/diem-ren-luyen/action":[1464,898,464],"./gv/diem-ren-luyen/action.js":[1464,898,464],"./gv/diem-ren-luyen/index":[6115,898,115],"./gv/diem-ren-luyen/index.js":[6115,898,115],"./sv/cbl/danh-gia":[9177,898,177],"./sv/cbl/danh-gia-sv":[7529,898,529],"./sv/cbl/danh-gia-sv/":[7529,898,529],"./sv/cbl/danh-gia-sv/index":[7529,898,529],"./sv/cbl/danh-gia-sv/index.js":[7529,898,529],"./sv/cbl/danh-gia/":[9177,898,177],"./sv/cbl/danh-gia/index":[9177,898,177],"./sv/cbl/danh-gia/index.js":[9177,898,177],"./sv/danh-gia":[4007,898,7],"./sv/danh-gia/":[4007,898,7],"./sv/danh-gia/index":[4007,898,7],"./sv/danh-gia/index.js":[4007,898,7]};function t(n){if(!i.o(r,n))return Promise.resolve().then((()=>{var e=new Error("Cannot find module '"+n+"'");throw e.code="MODULE_NOT_FOUND",e}));var e=r[n],t=e[0];return Promise.all(e.slice(1).map(i.e)).then((()=>i(t)))}t.keys=()=>Object.keys(r),t.id=1093,n.exports=t}},n=>{var e=e=>n(n.s=e);n.O(0,[170,898],(()=>(e(8118),e(1100))));n.O()}]);