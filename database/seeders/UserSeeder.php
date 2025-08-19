<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Role;
use App\Models\Community;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Make sure roles and communities exist
        $adminRole = Role::where('name', 'admin')->first();
        $umatRole = Role::where('name', 'umat')->first();
        $communities = Community::all();

        if (!$adminRole || !$umatRole) {
            $this->command->error('Roles not found. Make sure to run RoleSeeder first.');
            return;
        }

        if ($communities->isEmpty()) {
            $this->command->error('Communities not found. Make sure to run CommunitySeeder first.');
            return;
        }

        // Create admin users (only if they don't exist)
        if (!User::where('username', 'admin')->exists()) {
            User::factory()->create([
                'name' => 'Administrator',
                'username' => 'admin',
                'password' => bcrypt('admin123'),
                'role_id' => $adminRole->id,
                'community_id' => $communities->random()->id,
                'status' => 'active',
                'birth_place' => 'Kwimi',
            ]);
        }

        if (!User::where('username', 'superadmin')->exists()) {
            User::factory()->create([
                'name' => 'Super Admin',
                'username' => 'superadmin',
                'password' => bcrypt('superadmin123'),
                'role_id' => $adminRole->id,
                'community_id' => $communities->random()->id,
                'status' => 'active',
                'birth_place' => 'Kwimi',
            ]);
        }

        // Create test umat users with specific data (only if they don't exist)
        if (!User::where('username', 'johndoe')->exists()) {
            User::factory()->create([
                'name' => 'John Doe',
                'username' => 'johndoe',
                'password' => bcrypt('johndoe123'),
                'role_id' => $umatRole->id,
                'community_id' => $communities->random()->id,
                'status' => 'active',
                'birth_place' => 'Jayapura',
            ]);
        }

        if (!User::where('username', 'janesmith')->exists()) {
            User::factory()->create([
                'name' => 'Jane Smith',
                'username' => 'janesmith',
                'password' => bcrypt('janesmith123'),
                'role_id' => $umatRole->id,
                'community_id' => $communities->random()->id,
                'status' => 'active',
                'birth_place' => 'Merauke',
            ]);
        }

        // Create random umat users for each community (only if we don't have many users yet)
        $currentUserCount = User::count();
        if ($currentUserCount < 50) {
            foreach ($communities as $community) {
                User::factory()
                    ->count(rand(3, 6))
                    ->create([
                        'role_id' => $umatRole->id,
                        'community_id' => $community->id,
                        'status' => 'active',
                        'birth_place' => 'Kwimi',
                    ]);
            }

            // Create some inactive users
            User::factory()
                ->count(2)
                ->create([
                    'role_id' => $umatRole->id,
                    'community_id' => $communities->random()->id,
                    'status' => 'inactive',
                    'birth_place' => 'Kwimi',
                ]);

            // Create additional random admin users
            User::factory()
                ->count(1)
                ->create([
                    'role_id' => $adminRole->id,
                    'community_id' => $communities->random()->id,
                    'status' => 'active',
                    'birth_place' => 'Kwimi',
                ]);
        }

        $this->command->info('Created users successfully!');
    }
}
