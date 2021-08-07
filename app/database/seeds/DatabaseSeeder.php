<?php

use Illuminate\Database\Seeder;
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
        $admin = User::create([
            'name' => 'appadmin',
            'username' => 'appadmin',
        	'email' => 'admin@gmail.com',
            'password' => bcrypt('123456789')
        ]);
    }
}
