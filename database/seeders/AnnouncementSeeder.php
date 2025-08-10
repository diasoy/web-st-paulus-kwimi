<?php

namespace Database\Seeders;

use App\Models\Announcement;
use Illuminate\Database\Seeder;

class AnnouncementSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create some published announcements
        Announcement::factory()
            ->published()
            ->count(5)
            ->create();

        // Create some draft announcements
        Announcement::factory()
            ->draft()
            ->count(3)
            ->create();

        // Create specific announcements
        Announcement::factory()->create([
            'title' => 'Kebaktian Natal 2025',
            'description' => 'Bergabunglah dengan kami dalam merayakan kelahiran Yesus Kristus pada kebaktian Natal tahun ini.',
            'is_publish' => true,
        ]);

        Announcement::factory()->create([
            'title' => 'Retret Spiritual Tahun Baru',
            'description' => 'Mari bersama-sama menyambut tahun baru dengan retret spiritual yang akan memberkati hidup kita.',
            'is_publish' => true,
        ]);
    }
}
