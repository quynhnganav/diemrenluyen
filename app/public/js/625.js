"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[625],{667:(n,e,i)=>{i.d(e,{Wz:()=>r,Wp:()=>l,t5:()=>o,cV:()=>c,Sk:()=>s});var t=i(7461),a=i(7563),r=function(n){var e="/sv/danh-gia/api?".concat(a.stringify(n,{skipNull:!0,skipEmptyString:!0}));return t.o.get(e)},l=function(n){return t.o.post("/sv/danh-gia",n)},o=function(n){var e="/sv/cbl/danh-gia/api?".concat(a.stringify(n,{skipNull:!0,skipEmptyString:!0}));return t.o.get(e)},c=function(n,e){var i="/sv/cbl/danh-gia/api/sinh-vien/".concat(n,"?").concat(a.stringify(e,{skipNull:!0,skipEmptyString:!0}));return t.o.get(i)},s=function(n,e){var i="/sv/cbl/danh-gia/api/sinh-vien/".concat(n);return t.o.post(i,e)}},4252:(n,e,i)=>{i.d(e,{Z:()=>c});i(7294);var t=i(3379),a=i.n(t),r=i(7684),l={insert:"head",singleton:!1};a()(r.Z,l);r.Z.locals;var o=i(5893);const c=function(n){var e=n.children,i=n.className;return(0,o.jsx)("div",{className:"dimark-wrapper ".concat(i||""),children:e})}},7461:(n,e,i)=>{i.d(e,{o:()=>r});var t=i(9669),a=i.n(t),r=(document.head.querySelector('meta[name="csrf-token"]'),a().create({baseURL:"/",responseType:"json"}))},4449:(n,e,i)=>{i.d(e,{K:()=>t});var t={emptyText:"Không có dữ liệu"}},9625:(n,e,i)=>{i.r(e),i.d(e,{default:()=>S});var t=i(4112),a=i(1230),r=i(5746),l=i(9650),o=i(1577),c=i(5113),s=i(9166),u=i(8648),d=i(3259),h=i(7294),p=i(4252),v=i(4449),f=i(6659),g=i(667),m=i(5977),y=i(807),x=i(5893);function k(n,e){return function(n){if(Array.isArray(n))return n}(n)||function(n,e){var i=null==n?null:"undefined"!=typeof Symbol&&n[Symbol.iterator]||n["@@iterator"];if(null==i)return;var t,a,r=[],l=!0,o=!1;try{for(i=i.call(n);!(l=(t=i.next()).done)&&(r.push(t.value),!e||r.length!==e);l=!0);}catch(n){o=!0,a=n}finally{try{l||null==i.return||i.return()}finally{if(o)throw a}}return r}(n,e)||function(n,e){if(!n)return;if("string"==typeof n)return j(n,e);var i=Object.prototype.toString.call(n).slice(8,-1);"Object"===i&&n.constructor&&(i=n.constructor.name);if("Map"===i||"Set"===i)return Array.from(n);if("Arguments"===i||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i))return j(n,e)}(n,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function j(n,e){(null==e||e>n.length)&&(e=n.length);for(var i=0,t=new Array(e);i<e;i++)t[i]=n[i];return t}d.Z.Option;const S=function(){var n,e=k((0,h.useReducer)(f.I6,{sinhViens:[],loading:!1}),2),i=e[0],j=e[1],S=(0,m.k6)(),Z=(0,y.YS)().setIdsSv;(0,h.useRef)(null);(0,h.useEffect)((function(){w()}),[]);var w=(0,h.useCallback)((function(){j({loading:!0}),g.t5().then((function(n){var e;j({sinhViens:null==n?void 0:n.data}),Z(null==n||null===(e=n.data)||void 0===e?void 0:e.map((function(n){return{id:null==n?void 0:n.id,MaSV:null==n?void 0:n.MaSV,user:null==n?void 0:n.user}})))})).catch((function(n){var e,i;u.Z.warning({message:(null==n||null===(e=n.response)||void 0===e||null===(i=e.data)||void 0===i?void 0:i.message)||"Lỗi khi tải dữ liệu"})})).finally((function(){return j({loading:!1})}))}),[]),b=(0,h.useMemo)((function(){return[{title:"Mã SV",dataIndex:"MaSV",className:"cell-center",width:100,key:"MaSV"},{title:"Họ tên SV",dataIndex:"user",width:220,key:"HoTenSinhVien",render:function(n,e){var i,t,a,r;return(0,x.jsxs)(c.Z,{placement:"top",title:null==n?void 0:n.email,children:[(0,x.jsx)(s.Z,{status:null!=e&&null!==(i=e.danhGia)&&void 0!==i&&i.SinhVienDanhGia&&null!=e&&null!==(t=e.danhGia)&&void 0!==t&&t.CanBoLopDanhGia?"success":null!=e&&null!==(a=e.danhGia)&&void 0!==a&&a.SinhVienDanhGia||null!=e&&null!==(r=e.danhGia)&&void 0!==r&&r.CanBoLopDanhGia?"warning":"error"}),"".concat(null==n?void 0:n.HoDem," ").concat(null==n?void 0:n.Ten)]})}},{title:"Sinh viên đánh giá",dataIndex:"danhGia",className:"cell-center",width:150,key:"isDanhGia",render:function(n){return null!=n&&n.SinhVienDanhGia?"".concat((null==n?void 0:n.TongSoDiemSinhVien)||0):"Chưa đánh giá"}},{title:"CBL đánh giá",dataIndex:"danhGia",className:"cell-center",width:150,key:"cbl",render:function(n){return null!=n&&n.CanBoLopDanhGia?null==n?void 0:n.TongSoDiem:"Chưa đánh giá"}},{title:"Xếp loại",dataIndex:"danhGia",className:"cell-center",width:150,key:"point",render:function(n){return(0,f.Mv)(null==n?void 0:n.TongSoDiem)}},{title:"CVHT duyệt",dataIndex:"danhGia",className:"cell-center",width:150,key:"cvht",render:function(n){return null!=n&&n.GiangVienDuyet?(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(s.Z,{status:"success"}),"Đã duyệt"]}):(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(s.Z,{status:"warning"}),"Chưa duyệt"]})}},{title:"Ghi chú",dataIndex:"TrangThai",className:"cell-center",width:250,key:"ghichu`",render:function(n,e){return"".concat("0"!=n&&n||""," ").concat("0"!=(null==e?void 0:e.GhiChu)&&(null==e?void 0:e.GhiChu)||"")}},{title:"",dataIndex:"id",key:"id",className:"cell-center",render:function(n,e,t){return(0,x.jsxs)(l.Z,{size:"middle",children:[(0,x.jsx)(o.Z,{type:"primary",children:"Duyệt"}),(0,x.jsx)(o.Z,{type:"primary",onClick:function(){var a,r;return S.push("/gv/danh-gia/".concat(n,"?prev=").concat(null===(a=i.sinhViens[t-1])||void 0===a?void 0:a.id,"&next=").concat(null===(r=i.sinhViens[t+1])||void 0===r?void 0:r.id,"&masv=").concat(null==e?void 0:e.MaSV))},children:"Xem Đánh giá"}),(0,x.jsx)(o.Z,{type:"primary",children:"Ghi chú"})]})}}]}),[i.sinhViens]);return(0,x.jsx)(p.Z,{className:"danh-gia-page",children:(0,x.jsxs)(a.Z,{className:"bg-white p-3 content",children:[(0,x.jsx)(r.Z,{span:24,children:(0,x.jsxs)(a.Z,{justify:"space-between",gutter:[5,5],children:[(0,x.jsxs)(r.Z,{children:["Số lượng sinh viên: ",null==i||null===(n=i.sinhViens)||void 0===n?void 0:n.length]}),(0,x.jsx)(r.Z,{children:(0,x.jsxs)(a.Z,{gutter:[5,5],children:[(0,x.jsx)(r.Z,{children:(0,x.jsx)(d.Z,{placeholder:"Chọn lớp nào"})}),(0,x.jsx)(r.Z,{children:(0,x.jsx)(o.Z,{type:"primary",onClick:function(){return window.print()},children:"In bản thống kê"})}),(0,x.jsx)(r.Z,{children:(0,x.jsx)(o.Z,{type:"primary",children:"Xem thống kê"})})]})})]})}),(0,x.jsx)(r.Z,{span:24,className:"mt-3",children:(0,x.jsx)(t.Z,{bordered:!0,loading:i.loading,columns:b,scroll:{x:700,y:"calc(100vh - 250px)"},dataSource:null==i?void 0:i.sinhViens,rowKey:function(n){return null==n?void 0:n.id},pagination:!1,locale:v.K,rowSelection:{type:"checkbox"}})})]})})}},7684:(n,e,i)=>{i.d(e,{Z:()=>r});var t=i(3645),a=i.n(t)()((function(n){return n[1]}));a.push([n.id,".dimark-wrapper{padding:10px 10px 0}.dimark-wrapper .ant-table-thead tr th{background:#2a3f54;color:#fff}.dimark-wrapper .ant-pagination{margin-bottom:0}",""]);const r=a}}]);