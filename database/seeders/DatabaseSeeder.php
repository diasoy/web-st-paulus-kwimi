<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create admin user
        User::factory()->admin()->create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
        ]);

        // Create test umat user
        User::factory()->umat()->create([
            'name' => 'Test Umat',
            'email' => 'umat@example.com',
        ]);

        // Create additional umat users
        User::factory()->umat()->count(5)->create();
    }
}
