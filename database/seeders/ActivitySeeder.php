<?php

namespace Database\Seeders;

use App\Models\Activity;
use Illuminate\Database\Seeder;

class ActivitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create activities for this week
        Activity::factory()
            ->thisWeek()
            ->count(3)
            ->create();

        // Create activities for next month
        Activity::factory()
            ->nextMonth()
            ->count(5)
            ->create();

        // Create regular random activities
        Activity::factory()
            ->count(10)
            ->create();

        // Create specific activities
        Activity::factory()->create([
            'name' => 'Kebaktian Minggu Pagi',
            'location' => 'Gereja St. Paulus',
            'time_start' => '08:00:00',
            'date' => now()->next('Sunday')->format('Y-m-d'),
            'description' => 'Kebaktian minggu pagi rutin dengan khotbah dan pujian.'
        ]);

        Activity::factory()->create([
            'name' => 'Persekutuan Doa Malam',
            'location' => 'Ruang Persekutuan',
            'time_start' => '19:00:00', 
            'date' => now()->addDays(3)->format('Y-m-d'),
            'description' => 'Waktu persekutuan doa bersama untuk menguatkan iman.'
        ]);
    }
}
