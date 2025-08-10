<?php

namespace Database\Factories;

use App\Models\Community;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\WorshipSchedule>
 */
class WorshipScheduleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $pics = [
            'Pastor John',
            'Pastor Maria',
            'Pendeta David',
            'Pendeta Sarah',
            'Pastor Michael',
            'Pastor Ruth'
        ];

        $worshipNames = [
            'Kebaktian Minggu Pagi',
            'Kebaktian Minggu Sore',
            'Kebaktian Malam',
            'Kebaktian Doa',
            'Kebaktian Pemuda',
            'Kebaktian Anak',
            'Kebaktian Keluarga',
            'Kebaktian Syukur',
            'Kebaktian Paskah',
            'Kebaktian Natal'
        ];

        return [
            'name' => fake()->randomElement($worshipNames),
            'date' => fake()->dateTimeBetween('now', '+2 months')->format('Y-m-d'),
            'pic' => fake()->randomElement($pics),
            'time_start' => fake()->randomElement(['08:00:00', '10:00:00', '16:00:00', '18:00:00']),
        ];
    }

    /**
     * Create worship schedule for Sunday
     */
    public function sunday(): static
    {
        return $this->state(function (array $attributes) {
            // Find next Sunday
            $nextSunday = fake()->dateTimeBetween('next Sunday', '+8 weeks');
            return [
                'date' => $nextSunday->format('Y-m-d'),
                'time_start' => fake()->randomElement(['08:00:00', '10:00:00']),
            ];
        });
    }

    /**
     * Create evening worship schedule
     */
    public function evening(): static
    {
        return $this->state(fn (array $attributes) => [
            'time_start' => fake()->randomElement(['18:00:00', '19:00:00']),
        ]);
    }
}
