<?php

use Illuminate\Database\Seeder;

use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Models\User;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {

        $this->call(PermissionSeeder::class);
        $user = User::where('username', 'appadmin')->first();
        if (empty($user)) {
            $user = User::create([
                'HoDem' => 'appadmin',
                'Ten' => 'root',
                'HoTenKhongDau' => 'appadmin root',
                'username' => 'appadmin',
                'email' => 'maiquang1470@gmail.com',
                'password' => bcrypt('admin_di3mrenluy3n@vku2021'),
                'isAdmin' => TRUE,
                'isRoot' => TRUE
            ]);
        }
        $role = Role::where('name','super_admin')->first();
        $user->assignRole($role->name);
    }
}
