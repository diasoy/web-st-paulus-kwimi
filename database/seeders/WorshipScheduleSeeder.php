<?php

namespace Database\Seeders;

use App\Models\WorshipSchedule;
use App\Models\Community;
use Illuminate\Database\Seeder;

class WorshipScheduleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $communities = Community::all();

        // Create Sunday worship schedules
        $sundaySchedules = WorshipSchedule::factory()
            ->sunday()
            ->count(8)
            ->create();

        // Create evening worship schedules
        $eveningSchedules = WorshipSchedule::factory()
            ->evening()
            ->count(4)
            ->create();

        // Create regular worship schedules
        $regularSchedules = WorshipSchedule::factory()
            ->count(6)
            ->create();

        // Attach communities to worship schedules
        $allSchedules = $sundaySchedules
            ->concat($eveningSchedules)
            ->concat($regularSchedules);

        foreach ($allSchedules as $schedule) {
            // Attach random 2-4 communities to each worship schedule
            $randomCommunities = $communities
                ->random(rand(2, min(4, $communities->count())))
                ->pluck('id')
                ->toArray();
            
            $schedule->communities()->attach($randomCommunities);
        }

        // Create specific worship schedule with specific communities
        $specialSchedule = WorshipSchedule::factory()->create([
            'date' => now()->next('Sunday')->format('Y-m-d'),
            'pic' => 'Pastor John',
            'time_start' => '10:00:00',
        ]);

        // Attach all communities to the special schedule
        $specialSchedule->communities()->attach($communities->pluck('id')->toArray());
    }
}
