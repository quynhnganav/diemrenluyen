export const routers = [
    //sv
    {
        component: 'react',
        exact: true,
        path: '/sv'
    },
    {
        component: 'vue',
        exact: true,
        path: '/gv'
    },
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

    //admin
    {
        component: 'admin/DM_MauTieuChi',
        exact: true,
        path: '/admin/DM_MauTieuChi'
    },
    {
        component: 'admin/DM_DotDanhGia',
        exact: true,
        path: '/admin/DM_DotDanhGia'
    },
    {
        component: 'admin/DM_LopHoc',
        exact: true,
        path: '/admin/DM_LopHoc'
    },
    {
        component: 'admin/DM_SinhVien',
        exact: true,
        path: '/admin/DM_SinhVien'
    },
    {
        component: 'admin/DM_HocKy',
        exact: true,
        path: '/admin/DM_HocKy'
    },

    //common
    {
        component: '404',
        exact: true,
        path: '*'
    }
]
