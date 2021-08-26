<?php

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $roles = [
            [
                'name' => 'super_admin',
                'show_name' => 'Super Admin'
            ],
            [
                'name' => 'gvcn',
                'show_name' => 'Giảng viên chủ nhiệm'
            ],
            [
                'name' => 'cbl',
                'show_name' => 'Cán bộ lớp'
            ],
            [
                'name' => 'sv',
                'show_name' => 'Sinh viên'
            ],
        ];

        foreach ($roles as $key => $role) {
            Role::create(['name' => $role["name"], 'show_name' => $role["show_name"], 'is_show' => false, 'is_delete' => false]);
        }

        $permissions = [
            [
                'name' => 'admin-page',
                'show_name' => 'Admin Page'
            ],
            [
                'name' => 'role-list',
                'show_name' => 'Danh sách chức vụ'
            ],
            [
                'name' => 'role-create',
                'show_name' => 'Thêm mới chức vụ'
            ],
            [
                'name' => 'role-edit',
                'show_name' => 'Chỉnh sửa chức vụ'
            ],
            [
                'name' => 'role-delete',
                'show_name' => 'Edit chức vụ'
            ],
            [
                'name' => 'dot-danh-gia-list',
                'show_name' => 'Danh sách đợt đánh giá'
            ],
            [
                'name' => 'dot-danh-gia-create',
                'show_name' => 'Thêm mới đợt đánh giá'
            ],
            [
                'name' => 'dot-danh-gia-edit',
                'show_name' => 'Chỉnh sửa đợt đánh giá'
            ],
            [
                'name' => 'dot-danh-gia-delete',
                'show_name' => 'Xóa đợt đánh giá'
            ],
            [
                'name' => 'user-create',
                'show_name' => 'Thêm mới User'
            ],
            [
                'name' => 'user-edit',
                'show_name' => 'Chỉnh sửa User'
            ],
            [
                'name' => 'user-list-all',
                'show_name' => 'Danh sách user'
            ],
            [
                'name' => 'gv-page',
                'show_name' => 'Vào trang giảng viên'
            ],
            [
                'name' => 'gv-xem-danhsach-danhgia',
                'show_name' => 'Giảng viên xem danh sách đánh giá'
            ],
            [
                'name' => 'gv-danhgia-sv',
                'show_name' => 'Giảng viên đánh giá sv'
            ],
            [
                'name' => 'gv-report',
                'show_name' => 'Giảng viên xem report'
            ],
            [
                'name' => 'cbl-danhgia',
                'show_name' => 'Cán bộ lớp đánh giá cho sinh viên'
            ],
            [
                'name' => 'cbv-baocao',
                'show_name' => 'Cán bộ lớp xem báo cáo'
            ],
            [
                'name' => 'sv-page',
                'show_name' => 'Trang sinh viên'
            ]
        ];

        $role = Role::findByName('super_admin');

        foreach ($permissions as $permission) {
            $permiss = Permission::create(['name' => $permission['name'], 'show_name' => $permission['show_name']]);
            $role->givePermissionTo($permiss);
        }

        $role_gv = Role::findByName('gvcn');

        $permis_gv = [
            'gv-page',
            'gv-xem-danhsach-danhgia',
            'gv-danhgia-sv',
            'gv-report'
        ];
        $permiss_gv = Permission::whereIn('name', $permis_gv)->get();

        foreach ($permiss_gv as $permission) {
            $role_gv->givePermissionTo($permission);
        }

        $permis_cbl = [
            'cbl-danhgia',
            'cbv-baocao'
        ];
        $permiss_cbl = Permission::whereIn('name', $permis_gv)->get();

        $permiss_sv = Permission::findByName('sv-page');

        $role_cbl = Role::findByName('cbl');
        foreach ($permiss_cbl as $permission) {
            $role_cbl->givePermissionTo($permission);
        }
        $role_cbl->givePermissionTo($permiss_sv);
        $role_sv = Role::findByName('sv');
        $role_sv->givePermissionTo($permiss_sv);
    }
}
