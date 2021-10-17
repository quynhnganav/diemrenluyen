export const routers = [
    {
        component: 'sv/danh-gia',
        exact: true,
        path: '/sv/danh-gia'
    },
    {
        component: 'sv/cbl/danh-gia',
        exact: true,
        path: '/sv/cbl/danh-gia'
    },
    {
        component: 'sv/cbl/danh-gia-sv',
        exact: true,
        path: '/sv/cbl/danh-gia/:idSV'
    },
    //gv
    {
        component: 'gv/diem-ren-luyen',
        exact: true,
        path: '/gv/diem-ren-luyen'
    },
    {
        component: 'gv/diem-ren-luyen-sv',
        exact: true,
        path: '/gv/diem-ren-luyen/:idSV'
    },
    //admin

    {
        component: 'admin/DM_DiemRenLuyen',
        exact: true,
        path: '/admin/DM_DiemRenLuyen'
    },
    {
        component: 'admin/DM_MauTieuChi',
        exact: true,
        path: '/admin/DM_MauTieuChi'
    },
    {
        component: 'admin/DM_HocKy',
        exact: true,
        path: '/admin/DM_DotDanhGia'
    },
    //common
    {
        component: '404',
        exact: true,
        path: '*'
    }
]
