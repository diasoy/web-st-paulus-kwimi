<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            RoleSeeder::class,
            CommunitySeeder::class,
            UserSeeder::class,
            AnnouncementSeeder::class,
            ActivitySeeder::class,
            WorshipScheduleSeeder::class,
        ]);
    }
}
