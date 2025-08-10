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
        if (!User::where('email', 'admin@stpaulus.com')->exists()) {
            User::factory()->create([
                'name' => 'Administrator',
                'username' => 'admin',
                'email' => 'admin@stpaulus.com',
                'phone_number' => '081234567890',
                'role_id' => $adminRole->id,
                'community_id' => $communities->random()->id,
                'status' => 'active',
            ]);
        }

        if (!User::where('email', 'superadmin@stpaulus.com')->exists()) {
            User::factory()->create([
                'name' => 'Super Admin',
                'username' => 'superadmin',
                'email' => 'superadmin@stpaulus.com',
                'phone_number' => '081234567891',
                'role_id' => $adminRole->id,
                'community_id' => $communities->random()->id,
                'status' => 'active',
            ]);
        }

        // Create test umat users with specific data (only if they don't exist)
        if (!User::where('email', 'john@example.com')->exists()) {
            User::factory()->create([
                'name' => 'John Doe',
                'username' => 'johndoe',
                'email' => 'john@example.com',
                'phone_number' => '081234567892',
                'role_id' => $umatRole->id,
                'community_id' => $communities->random()->id,
                'status' => 'active',
            ]);
        }

        if (!User::where('email', 'jane@example.com')->exists()) {
            User::factory()->create([
                'name' => 'Jane Smith',
                'username' => 'janesmith',
                'email' => 'jane@example.com',
                'phone_number' => '081234567893',
                'role_id' => $umatRole->id,
                'community_id' => $communities->random()->id,
                'status' => 'active',
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
                    ]);
            }

            // Create some inactive users
            User::factory()
                ->count(2)
                ->create([
                    'role_id' => $umatRole->id,
                    'community_id' => $communities->random()->id,
                    'status' => 'inactive',
                ]);

            // Create additional random admin users
            User::factory()
                ->count(1)
                ->create([
                    'role_id' => $adminRole->id,
                    'community_id' => $communities->random()->id,
                    'status' => 'active',
                ]);
        }

        $this->command->info('Created users successfully!');
    }
}
