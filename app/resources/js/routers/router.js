export const routers = [
    //sv
    {
        component: 'react',
        path: '/sv'
    },
    {
        component: 'vue',
        path: '/gv'
    },
    //gv

    //admin
    {
        component: 'admin/DM_MauTieuChi',
        path: '/admin/DM_MauTieuChi'
    },
    {
        component: 'admin/DM_DotDanhGia',
        path: '/admin/DM_DotDanhGia'
    },

    //common
    {
        component: '404',
        path: '*'
    }
]
