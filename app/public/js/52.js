"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[52],{667:(n,e,i)=>{i.d(e,{Wz:()=>a,Wp:()=>r,t5:()=>o,cV:()=>u,Sk:()=>s});var t=i(7461),l=i(7563),a=function(n){var e="/sv/danh-gia/api?".concat(l.stringify(n,{skipNull:!0,skipEmptyString:!0}));return t.o.get(e)},r=function(n){return t.o.post("/sv/danh-gia",n)},o=function(n){var e="/sv/cbl/danh-gia/api?".concat(l.stringify(n,{skipNull:!0,skipEmptyString:!0}));return t.o.get(e)},u=function(n,e){var i="/sv/cbl/danh-gia/api/sinh-vien/".concat(n,"?").concat(l.stringify(e,{skipNull:!0,skipEmptyString:!0}));return t.o.get(i)},s=function(n,e){var i="/sv/cbl/danh-gia/api/sinh-vien/".concat(n);return t.o.post(i,e)}},8697:(n,e,i)=>{i.d(e,{Kq:()=>a,r3:()=>r,vR:()=>o,OM:()=>u,wR:()=>s});var t=i(7461),l=i(7563),a=function(n){var e="/gv/diem-ren-luyen/api/lop?".concat(l.stringify(n,{skipNull:!0,skipEmptyString:!0}));return t.o.get(e)},r=function(n){var e="/gv/diem-ren-luyen/api?".concat(l.stringify(n,{skipNull:!0,skipEmptyString:!0}));return t.o.get(e)},o=function(n,e){var i="/gv/diem-ren-luyen/api/sinh-vien/".concat(n,"?").concat(l.stringify(e,{skipNull:!0,skipEmptyString:!0}));return t.o.get(i)},u=function(n,e){var i="/gv/diem-ren-luyen/api/duyet/".concat(n);return t.o.put(i,e)},s=function(n,e){var i="/gv/diem-ren-luyen/api/nhan-xet/".concat(n);return t.o.put(i,e)}},4252:(n,e,i)=>{i.d(e,{Z:()=>u});i(7294);var t=i(3379),l=i.n(t),a=i(7684),r={insert:"head",singleton:!1};l()(a.Z,r);a.Z.locals;var o=i(5893);const u=function(n){var e=n.children,i=n.className;return(0,o.jsx)("div",{className:"dimark-wrapper ".concat(i||""),children:e})}},6657:(n,e,i)=>{i.d(e,{Z:()=>h});var t=i(7016),l=i(4561),a=i(5779),r=i(963),o=i(7294),u=i(5893);function s(n,e){return function(n){if(Array.isArray(n))return n}(n)||function(n,e){var i=null==n?null:"undefined"!=typeof Symbol&&n[Symbol.iterator]||n["@@iterator"];if(null==i)return;var t,l,a=[],r=!0,o=!1;try{for(i=i.call(n);!(r=(t=i.next()).done)&&(a.push(t.value),!e||a.length!==e);r=!0);}catch(n){o=!0,l=n}finally{try{r||null==i.return||i.return()}finally{if(o)throw l}}return a}(n,e)||function(n,e){if(!n)return;if("string"==typeof n)return c(n,e);var i=Object.prototype.toString.call(n).slice(8,-1);"Object"===i&&n.constructor&&(i=n.constructor.name);if("Map"===i||"Set"===i)return Array.from(n);if("Arguments"===i||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i))return c(n,e)}(n,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function c(n,e){(null==e||e>n.length)&&(e=n.length);for(var i=0,t=new Array(e);i<e;i++)t[i]=n[i];return t}var d=(0,o.forwardRef)((function(n,e){var i=n.onSubmit,c=s((0,o.useState)(!1),2),d=c[0],h=c[1],v=s((0,o.useState)(null),2),f=(v[0],v[1]),m=s((0,o.useState)(!1),2),p=m[0],g=m[1],y=s((0,r.cI)(),1)[0],x=(0,o.useCallback)((function(n,e){f(n),null==y||y.setFieldsValue({value:e}),h(!0)}),[]);(0,o.useImperativeHandle)(e,(function(){return{showModal:x}}));var b=(0,o.useCallback)((function(){h(!1),f(null)}),[]),C=(0,o.useCallback)((function(n){i&&(g(!0),i(null==n?void 0:n.value,(function(n){g(!1),n&&h(!1)})))}),[i]),j=(0,o.useCallback)((function(){y.submit()}),[y]);return(0,u.jsx)(t.Z,{visible:d,onCancel:b,onOk:j,okButtonProps:{loading:p},title:"Ghi chú",okText:"Cập nhật",cancelText:"Hủy",children:(0,u.jsx)(l.Z,{form:y,name:"form-ghichu",onFinish:C,children:(0,u.jsx)(l.Z.Item,{name:"value",children:(0,u.jsx)(a.Z.TextArea,{})})})})}));const h=(0,o.memo)(d)},8487:(n,e,i)=>{i.d(e,{Z:()=>y});var t=i(6238),l=i(5113),a=i(4561),r=i(8835),o=i(963),u=i(7294),s=i(6659),c=i(3379),d=i.n(c),h=i(316),v={insert:"head",singleton:!1};d()(h.Z,v);h.Z.locals;var f=i(5893);function m(n,e){return function(n){if(Array.isArray(n))return n}(n)||function(n,e){var i=null==n?null:"undefined"!=typeof Symbol&&n[Symbol.iterator]||n["@@iterator"];if(null==i)return;var t,l,a=[],r=!0,o=!1;try{for(i=i.call(n);!(r=(t=i.next()).done)&&(a.push(t.value),!e||a.length!==e);r=!0);}catch(n){o=!0,l=n}finally{try{r||null==i.return||i.return()}finally{if(o)throw l}}return a}(n,e)||function(n,e){if(!n)return;if("string"==typeof n)return p(n,e);var i=Object.prototype.toString.call(n).slice(8,-1);"Object"===i&&n.constructor&&(i=n.constructor.name);if("Map"===i||"Set"===i)return Array.from(n);if("Arguments"===i||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i))return p(n,e)}(n,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function p(n,e){(null==e||e>n.length)&&(e=n.length);for(var i=0,t=new Array(e);i<e;i++)t[i]=n[i];return t}var g=(0,u.forwardRef)((function(n,e){var i=n.tree,c=n.loading,d=n.type,h=n.onSuccess,v=m((0,u.useReducer)(s.I6,{raw:[],tieuChis:[],totalSV:0,totalCBL:0,total:0}),2),p=v[0],g=v[1],y=m((0,o.cI)(),1)[0],x=(0,u.useCallback)((function(){var n=document.querySelector(".table-danh-gia .ant-table-body");null==n||n.scroll({behavior:"smooth",top:0})}),[]);(0,u.useEffect)((function(){var n=m((0,s.fK)(i||[]),5),e=n[0],t=n[1],l=n[2],a=n[3],r=n[4];g({tieuChis:e,raw:i,totalSV:a,totalCBL:r,total:t}),null==y||y.setFieldsValue(l),x()}),[i]);var b=(0,u.useCallback)((function(){null==y||y.submit()}),[y]),C=(0,u.useCallback)((function(n){null==y||y.setFields(n)}),[y]),j=(0,u.useCallback)((function(n){console.log(n),h&&h(n)}),[h]);(0,u.useImperativeHandle)(e,(function(){return{submit:b,setFieldsValue:C,scrollToTop:x}}));var S=(0,u.useCallback)((function(n,e,i){var t=(0,s.ZC)(p.raw,e,n,i),l=m((0,s.fK)(t),5),a=l[0],r=l[1],o=l[2],u=l[3],c=l[4];null==y||y.setFieldsValue(o),g({tieuChis:a,raw:t,totalSV:u,totalCBL:c,total:r})}),[p.raw]),Z=(0,u.useMemo)((function(){return[{title:"Nội dung và tiêu chí đánh giá",dataIndex:"TenTieuChi",key:"TenTieuChi",render:function(n,e){return(0,f.jsxs)("p",{className:"TenTieuChi".concat(e.level),children:[(i=null==e?void 0:e.level,t=null==e?void 0:e.index,{1.1:"1.",1.2:"2.",1.3:"3.",1.4:"4.",1.5:"5.",2.1:"a)",2.2:"b)",2.3:"c)",2.4:"d)",2.5:"e)"}["".concat(i,".").concat(t[i-1])]||"-")," ",n," ",null!=e&&e.isDiemHocTap?(0,f.jsx)("strong",{children:"(Điểm được lấy theo hệ thống đào tạo)"}):""]});var i,t}},{title:function(){return(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)("p",{children:"Khung điểm tối đa"}),(0,f.jsxs)("p",{children:["(",p.total,")"]})]})},dataIndex:"SoDiem",className:"cell-center",width:120,key:"SoDiem"},{title:function(){return(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)("p",{children:"Điểm"}),(0,f.jsx)("p",{children:"(do sinh viên tự đánh giá)"}),(0,f.jsxs)("p",{children:["(",p.totalSV,")"]})]})},dataIndex:"myPoint",className:"cell-center",width:130,key:"myPoint",render:function(n,e){return(0,f.jsx)(l.Z,{placement:"top",title:null==e?void 0:e.TenTieuChi,children:(0,f.jsx)(a.Z.Item,{name:"SoDiemSV-".concat(e.id),style:{margin:0},rules:[{required:"true",message:"Nhập điểm"}],children:(0,f.jsx)(r.Z,{disabled:e.isParent||"CBL"===d||!d||e.isDiemHocTap,min:0,max:e.SoDiem,onChange:function(n){return S(n,null==e?void 0:e.id,"SoDiemSV")}})})})}},{title:function(){return(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)("p",{children:"Điểm"}),(0,f.jsx)("p",{children:"(do tập thể lớp đánh giá)"}),(0,f.jsxs)("p",{children:["(",p.totalCBL,")"]})]})},dataIndex:"CBLPoint",className:"cell-center",width:130,key:"CBLPoint",render:function(n,e){return(0,f.jsx)(l.Z,{placement:"top",title:null==e?void 0:e.TenTieuChi,children:(0,f.jsx)(a.Z.Item,{name:"SoDiemCBL-".concat(e.id),style:{margin:0},rules:[{required:"true",message:"Nhập điểm"}],children:(0,f.jsx)(r.Z,{disabled:e.isParent||"SV"===d||!d||e.isDiemHocTap,min:0,max:e.SoDiem,onChange:function(n){return S(n,null==e?void 0:e.id,"SoDiemCBL")}})})})}}]}),[p]);return(0,f.jsx)(f.Fragment,{children:(0,f.jsx)(a.Z,{form:y,name:"form-danh-gia",onFinish:j,children:(0,f.jsx)(t.Z,{columns:Z,bordered:!0,loading:c,dataSource:p.tieuChis,rowKey:function(n){return null==n?void 0:n.id},scroll:{x:700,y:"calc(100vh - 290px)"},pagination:!1,locale:{emptyText:"Không có dữ liệu"},className:"table-danh-gia"})})})}));const y=(0,u.memo)(g)},7461:(n,e,i)=>{i.d(e,{o:()=>a});var t=i(9669),l=i.n(t),a=(document.head.querySelector('meta[name="csrf-token"]'),l().create({baseURL:"/",responseType:"json"}))},8505:(n,e,i)=>{i.r(e),i.d(e,{default:()=>Z});var t=i(1577),l=i(1230),a=i(5746),r=i(8648),o=i(3259),u=i(7294),s=i(4252),c=i(8487),d=i(667),h=i(8697),v=i(6659),f=(i(7461),i(807)),m=i(5977),p=i(8461),g=i(7728),y=i(6657),x=i(6486),b=i(5893);function C(n,e){return function(n){if(Array.isArray(n))return n}(n)||function(n,e){var i=null==n?null:"undefined"!=typeof Symbol&&n[Symbol.iterator]||n["@@iterator"];if(null==i)return;var t,l,a=[],r=!0,o=!1;try{for(i=i.call(n);!(r=(t=i.next()).done)&&(a.push(t.value),!e||a.length!==e);r=!0);}catch(n){o=!0,l=n}finally{try{r||null==i.return||i.return()}finally{if(o)throw l}}return a}(n,e)||function(n,e){if(!n)return;if("string"==typeof n)return j(n,e);var i=Object.prototype.toString.call(n).slice(8,-1);"Object"===i&&n.constructor&&(i=n.constructor.name);if("Map"===i||"Set"===i)return Array.from(n);if("Arguments"===i||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i))return j(n,e)}(n,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function j(n,e){(null==e||e>n.length)&&(e=n.length);for(var i=0,t=new Array(e);i<e;i++)t[i]=n[i];return t}var S=o.Z.Option;const Z=function(){var n,e,i,j,Z,k,T,w,V,G,D,I,N,A=C((0,u.useReducer)(v.I6,{tree:[],dotDanhGia:null,sinhVien:null,loading:!1,danhGia:null}),2),L=A[0],B=A[1],F=(0,m.UO)().idSV,O=(0,m.k6)(),E=(0,f.YS)(),M=E.gotoSV,R=E.current,H=E.next,K=E.prev,P=E.dsSinhViens,q=(0,u.useRef)(null),U=(0,u.useRef)(null);(0,u.useEffect)((function(){F&&(M(F),z(F))}),[F]);var z=(0,u.useCallback)((function(n){B({loading:!0}),h.vR(n).then((function(n){var e,i,t,l,a,o,u,s;B({tree:(null==n||null===(e=n.data)||void 0===e?void 0:e.tieuChi)||[],dotDanhGia:null==n||null===(i=n.data)||void 0===i?void 0:i.dotDanhGia,sinhVien:null==n||null===(t=n.data)||void 0===t?void 0:t.sinhVien,danhGia:null==n||null===(l=n.data)||void 0===l?void 0:l.danhGia}),null!=n&&null!==(a=n.data)&&void 0!==a&&null!==(o=a.danhGia)&&void 0!==o&&o.SinhVienDanhGia||r.Z.warn({message:"Sinh viên chưa đánh giá"}),null!=n&&null!==(u=n.data)&&void 0!==u&&null!==(s=u.danhGia)&&void 0!==s&&s.CanBoLopDanhGia||r.Z.warn({message:"Cán bộ lớp chưa đánh giá"})})).catch((function(n){var e,i;r.Z.warning({message:(null==n||null===(e=n.response)||void 0===e||null===(i=e.data)||void 0===i?void 0:i.message)||"Lỗi khi tải dữ liệu"})})).finally((function(){return B({loading:!1})}))}),[]),$=(0,u.useCallback)((function(n){var e={};Object.keys(n).forEach((function(i){if(i.includes("SoDiemCBL")){var t=i.split("-")[1];e[t]=n[i]}})),B({loading:!0}),d.Sk(F,e).then((function(n){r.Z.success({message:"Cập nhật thành công"})})).catch((function(n){var e;if(console.log(null==n?void 0:n.response),422==(null==n||null===(e=n.response)||void 0===e?void 0:e.status)){var i,t,l=((null==n||null===(i=n.response)||void 0===i?void 0:i.data)||[]).map((function(n){return{name:"SoDiemCBL-".concat(n),errors:["Lỗi"]}}));null==q||null===(t=q.current)||void 0===t||t.setFieldsValue(l)}else r.Z.error({message:"Lỗi"})})).finally((function(){return B({loading:!1})}))}),[q,F]),W=(0,u.useCallback)((function(){H&&O.push("/gv/diem-ren-luyen/".concat(null==H?void 0:H.id))}),[H]),X=(0,u.useCallback)((function(){K&&O.push("/gv/diem-ren-luyen/".concat(null==K?void 0:K.id))}),[K]),Y=(0,u.useCallback)((function(n){n&&O.push("/gv/diem-ren-luyen/".concat(n))}),[]),J=(0,u.useCallback)((function(n){var e,i;null==U||null===(e=U.current)||void 0===e||e.showModal(n,null===(i=L.danhGia)||void 0===i?void 0:i.GiangVienNhanXet)}),[L.danhGia]),Q=(0,u.useCallback)((function(n,e){var i,t;console.log(null==L?void 0:L.danhGia),null!==(i=L.danhGia)&&void 0!==i&&i.id?(B({loading:!0}),h.wR(null===(t=L.danhGia)||void 0===t?void 0:t.id,{nhanXet:n}).then((function(n){B({loading:!1,danhGia:null==n?void 0:n.data}),r.Z.success({message:"Đã nhận xét"})})).catch((function(n){var e,i;console.log(null==n?void 0:n.response),r.Z.error({message:null==n||null===(e=n.response)||void 0===e||null===(i=e.data)||void 0===i?void 0:i.message}),B({loading:!1})})).finally(e)):r.Z.error({message:"Cán bộ lớp chưa đánh giá"})}),[L.danhGia]),_=(0,u.useCallback)((function(){var n,e;null!==(n=L.danhGia)&&void 0!==n&&n.id?(B({loading:!0}),h.OM(null===(e=L.danhGia)||void 0===e?void 0:e.id).then((function(n){B({loading:!1,danhGia:null==n?void 0:n.data}),r.Z.success({message:"Đã duyệt"})})).catch((function(n){var e,i;r.Z.error({message:null==n||null===(e=n.response)||void 0===e||null===(i=e.data)||void 0===i?void 0:i.message}),B({loading:!1})}))):r.Z.error({message:"Cán bộ lớp chưa đánh giá"})}),[L.danhGia]),nn=null!=R&&R.TrangThai?"0"==(null==R?void 0:R.TrangThai)?"":"(".concat(null==R?void 0:R.TrangThai,")"):null!=L&&null!==(n=L.sinhVien)&&void 0!==n&&n.TrangThai?"0"==(null==L||null===(e=L.sinhVien)||void 0===e?void 0:e.TrangThai)?"":"(".concat(null==L||null===(i=L.sinhVien)||void 0===i?void 0:i.TrangThai,")"):"";return(0,b.jsxs)(s.Z,{className:"danh-gia-page",children:[(0,b.jsxs)(l.Z,{className:"bg-white p-3 content",children:[(0,b.jsx)(a.Z,{span:24,children:(0,b.jsxs)(l.Z,{children:[(0,b.jsx)(a.Z,{span:12,children:(0,b.jsx)(l.Z,{children:(0,b.jsx)(a.Z,{children:(0,b.jsx)("p",{children:"".concat((null==R||null===(j=R.user)||void 0===j?void 0:j.HoDem)||(null==L||null===(Z=L.sinhVien)||void 0===Z||null===(k=Z.user)||void 0===k?void 0:k.HoDem)||""," ").concat((null==R||null===(T=R.user)||void 0===T?void 0:T.Ten)||(null==L||null===(w=L.sinhVien)||void 0===w||null===(V=w.user)||void 0===V?void 0:V.Ten)||""," - ").concat((null==R?void 0:R.MaSV)||(null==L||null===(G=L.sinhVien)||void 0===G?void 0:G.MaSV)||""," \n                                        ").concat(L.loading?"":nn)})})})}),(0,b.jsx)(a.Z,{span:12,children:(0,b.jsxs)(l.Z,{justify:"end",gutter:[5,5],children:[P&&P.length>0&&(0,b.jsx)(a.Z,{span:10,children:(0,b.jsx)(o.Z,{showSearch:!0,placeholder:"Chọn sinh viên",notFoundContent:"Không có sinh viên",value:Number(F),filterOption:function(n,e){return(0,v.FT)(e.children.toLowerCase()).indexOf((0,v.FT)(n.toLowerCase()))>=0},style:{width:"100%"},onChange:Y,children:null==P?void 0:P.map((function(n){var e,i;return(0,b.jsx)(S,{value:null==n?void 0:n.id,children:"".concat((null==n?void 0:n.MaSV)||""," - ").concat((null==n||null===(e=n.user)||void 0===e?void 0:e.HoDem)||""," ").concat((null==n||null===(i=n.user)||void 0===i?void 0:i.Ten)||"")},null==n?void 0:n.id)}))})}),(0,b.jsx)(a.Z,{children:(0,b.jsx)(t.Z,{type:"primary",disabled:L.loading||!K,icon:(0,b.jsx)(p.Z,{}),onClick:X})}),(0,b.jsx)(a.Z,{children:(0,b.jsx)(t.Z,{type:"primary",disabled:L.loading||!H,icon:(0,b.jsx)(g.Z,{}),onClick:W})}),(0,b.jsx)(a.Z,{children:(0,b.jsx)(t.Z,{type:"primary",disabled:L.loading,onClick:J,children:"Nhận xét"})}),(0,b.jsx)(a.Z,{children:(0,b.jsx)(t.Z,{type:null!==(D=L.danhGia)&&void 0!==D&&D.GiangVienDuyet?"dashed":"primary",disabled:L.loading||(0,x.isEmpty)(null==L||null===(I=L.danhGia)||void 0===I?void 0:I.CanBoLopDanhGia),onClick:_,children:null!==(N=L.danhGia)&&void 0!==N&&N.GiangVienDuyet?"Bỏ duyệt":"Duyệt"})})]})})]})}),(0,b.jsx)(a.Z,{span:24,className:"mt-3",children:(0,b.jsx)(c.Z,{tree:L.tree,loading:L.loading,ref:q,onSuccess:$})})]}),(0,b.jsx)(y.Z,{ref:U,onSubmit:Q})]})}},7684:(n,e,i)=>{i.d(e,{Z:()=>a});var t=i(3645),l=i.n(t)()((function(n){return n[1]}));l.push([n.id,".dimark-wrapper{padding:10px 10px 0}.dimark-wrapper .ant-table-thead tr th{background:#2a3f54;color:#fff}.dimark-wrapper .ant-pagination{margin-bottom:0}",""]);const a=l},316:(n,e,i)=>{i.d(e,{Z:()=>a});var t=i(3645),l=i.n(t)()((function(n){return n[1]}));l.push([n.id,".TenTieuChi1{font-size:18px;font-weight:700}.TenTieuChi2{font-size:16px;font-style:italic}.TenTieuChi3{font-size:15px;margin-left:5px}",""]);const a=l}}]);