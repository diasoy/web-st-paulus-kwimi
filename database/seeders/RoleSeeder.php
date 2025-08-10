<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create basic roles with specific IDs
        $roles = [
            ['id' => 1, 'name' => 'admin'],
            ['id' => 2, 'name' => 'umat']
        ];

        foreach ($roles as $role) {
            Role::updateOrCreate(
                ['id' => $role['id']], 
                $role + ['created_at' => now(), 'updated_at' => now()]
            );
        }
    }
}
