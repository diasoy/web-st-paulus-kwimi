<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DefaultRoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Clear existing roles if needed
        DB::table('roles')->truncate();
        
        // Insert default roles
        DB::table('roles')->insert([
            [
                'id' => 1,
                'name' => 'admin',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 2,
                'name' => 'umat',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);

        // Create default community too
        DB::table('communities')->insertOrIgnore([
            'id' => 1,
            'name' => 'ST. Paulus Kwimi',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // Create default admin user
        DB::table('users')->insertOrIgnore([
            'name' => 'Administrator',
            'username' => 'admin',
            'email' => 'admin@stpauluskwimi.com',
            'password' => bcrypt('admin123'),
            'phone_number' => '08123456789',
            'address' => 'Jl. Admin',
            'birth_date' => '1990-01-01',
            'gender' => 'male',
            'role_id' => 1,
            'community_id' => 1,
            'status' => 'active',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
