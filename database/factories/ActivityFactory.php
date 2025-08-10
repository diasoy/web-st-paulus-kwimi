<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Activity>
 */
class ActivityFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $activities = [
            'Kebaktian Minggu',
            'Doa Malam',
            'Sekolah Minggu',
            'Pelayanan Sosial',
            'Retret Spiritual',
            'Pelatihan Musik',
            'Bakti Sosial',
            'Kunjungan Rumah Sakit',
            'Persekutuan Doa',
            'Acara Natal',
            'Acara Paskah',
            'Persekutuan Remaja'
        ];

        $locations = [
            'Gereja St. Paulus',
            'Aula Gereja',
            'Ruang Persekutuan',
            'Halaman Gereja',
            'Rumah Jemaat',
            'Panti Asuhan',
            'Rumah Sakit',
            'Gedung Serbaguna'
        ];

        return [
            'name' => fake()->randomElement($activities),
            'image_url' => fake()->imageUrl(640, 480, 'church', true),
            'location' => fake()->randomElement($locations),
            'time_start' => fake()->time(),
            'date' => fake()->dateTimeBetween('now', '+3 months')->format('Y-m-d'),
            'description' => fake()->paragraphs(2, true),
        ];
    }

    /**
     * Create activity for this week
     */
    public function thisWeek(): static
    {
        return $this->state(fn (array $attributes) => [
            'date' => fake()->dateTimeBetween('now', '+7 days')->format('Y-m-d'),
        ]);
    }

    /**
     * Create activity for next month
     */
    public function nextMonth(): static
    {
        return $this->state(fn (array $attributes) => [
            'date' => fake()->dateTimeBetween('+1 month', '+2 months')->format('Y-m-d'),
        ]);
    }
}
