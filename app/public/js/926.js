"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[926,983],{3887:(n,e,t)=>{t.d(e,{E:()=>i,w:()=>c});var r=t(7461),a=t(7563),i=function(n){var e="/admin/DM_LopHoc/api?".concat(a.stringify(n,{skipNull:!0,skipEmptyString:!0}));return r.o.get(e)},c=function(n){var e="/admin/DM_LopHoc/api/sync-data?".concat(a.stringify(n,{skipNull:!0,skipEmptyString:!0}));return r.o.get(e)}},4252:(n,e,t)=>{t.d(e,{Z:()=>l});t(7294);var r=t(3379),a=t.n(r),i=t(7684),c={insert:"head",singleton:!1};a()(i.Z,c);i.Z.locals;var o=t(5893);const l=function(n){var e=n.children,t=n.className;return(0,o.jsx)("div",{className:"dimark-wrapper ".concat(t||""),children:e})}},7461:(n,e,t)=>{t.d(e,{o:()=>i});var r=t(9669),a=t.n(r),i=(document.head.querySelector('meta[name="csrf-token"]'),a().create({baseURL:"/",responseType:"json"}))},7926:(n,e,t)=>{t.r(e),t.d(e,{default:()=>m});var r=t(6238),a=t(1230),i=t(5746),c=t(1577),o=t(5113),l=t(8648),u=t(7294),s=(t(807),t(2983),t(4252)),d=t(3887),p=t(5893);function f(n,e){return function(n){if(Array.isArray(n))return n}(n)||function(n,e){var t=null==n?null:"undefined"!=typeof Symbol&&n[Symbol.iterator]||n["@@iterator"];if(null==t)return;var r,a,i=[],c=!0,o=!1;try{for(t=t.call(n);!(c=(r=t.next()).done)&&(i.push(r.value),!e||i.length!==e);c=!0);}catch(n){o=!0,a=n}finally{try{c||null==t.return||t.return()}finally{if(o)throw a}}return i}(n,e)||function(n,e){if(!n)return;if("string"==typeof n)return h(n,e);var t=Object.prototype.toString.call(n).slice(8,-1);"Object"===t&&n.constructor&&(t=n.constructor.name);if("Map"===t||"Set"===t)return Array.from(n);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return h(n,e)}(n,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function h(n,e){(null==e||e>n.length)&&(e=n.length);for(var t=0,r=new Array(e);t<e;t++)r[t]=n[t];return r}const m=function(){var n=f((0,u.useState)([]),2),e=n[0],t=n[1],h=f((0,u.useState)(!1),2),m=h[0],y=h[1];(0,u.useEffect)((function(){v()}),[]);var v=function(){y(!0),d.E().then((function(n){t((null==n?void 0:n.data)||[])})).finally((function(){return y(!1)}))},g=(0,u.useCallback)((function(){y(!0),d.w().then((function(n){l.Z.success({message:"Cập nhật thành công"})})).catch((function(n){l.Z.error({message:"Lỗi khi cập nhật"})})).finally((function(){return y(!1)}))}),[]),k=(0,u.useMemo)((function(){return[{title:"STT",dataIndex:"id",key:"id",width:60,fixed:"left",render:function(n,e,t){return(0,p.jsx)(o.Z,{placement:"top",title:n,children:t+1})}},{title:"Tên lớp",dataIndex:"TenLopHoc",className:"cell-center",key:"TenLopHoc"},{title:"Cố vấn học tập",dataIndex:"GV",key:"GV",render:function(n){var e,t,r;return(0,p.jsx)(o.Z,{placement:"topLeft",title:null==n||null===(e=n.user)||void 0===e?void 0:e.email,children:"".concat(null==n?void 0:n.ChucDanh,". ").concat(null==n||null===(t=n.user)||void 0===t?void 0:t.HoDem," ").concat(null==n||null===(r=n.user)||void 0===r?void 0:r.Ten)})}},{title:"Số lượng sinh viên",dataIndex:"sinh_viens_count",className:"cell-center",key:"sinh_viens_count"},{title:"Đồng bộ",dataIndex:"isSync",key:"isSync",className:"cell-center",width:200,render:function(n){return n?"Đang đồng bộ":"Đã đồng bộ"}}]}),[]);return(0,p.jsx)(s.Z,{className:"dot-danh-gia-wrapper",children:(0,p.jsxs)(a.Z,{className:"bg-white p-3 content",children:[(0,p.jsx)(i.Z,{span:24,children:(0,p.jsx)(a.Z,{children:(0,p.jsx)(i.Z,{children:(0,p.jsx)(c.Z,{type:"primary",onClick:g,children:"Cập nhật"})})})}),(0,p.jsx)(i.Z,{span:24,className:"mt-3",children:(0,p.jsx)(r.Z,{bordered:!0,loading:m,columns:k,scroll:{x:700,y:"calc(100vh - 290px)"},dataSource:e,rowKey:function(n){return null==n?void 0:n.id},pagination:{pageSize:20}})})]})})}},7684:(n,e,t)=>{t.d(e,{Z:()=>i});var r=t(3645),a=t.n(r)()((function(n){return n[1]}));a.push([n.id,".dimark-wrapper{padding:10px 10px 0}.dimark-wrapper .ant-table-thead tr th{background:#2a3f54;color:#fff}.dimark-wrapper .ant-pagination{margin-bottom:0}",""]);const i=a},3037:(n,e,t)=>{t.d(e,{Z:()=>i});var r=t(3645),a=t.n(r)()((function(n){return n[1]}));a.push([n.id,"",""]);const i=a},2983:(n,e,t)=>{t.r(e),t.d(e,{default:()=>o});var r=t(3379),a=t.n(r),i=t(3037),c={insert:"head",singleton:!1};a()(i.Z,c);const o=i.Z.locals||{}}}]);