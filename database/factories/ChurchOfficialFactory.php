<?php

namespace Database\Factories;

use App\Models\ChurchOfficial;
use App\Models\Community;
use Illuminate\Database\Eloquent\Factories\Factory;

class ChurchOfficialFactory extends Factory
{
    protected $model = ChurchOfficial::class;

    public function definition(): array
    {
        $positions = [
            'pastor_paroki',
            'ketua_lingkungan',
            'sekretaris_lingkungan',
            'bendahara_lingkungan',
            'koordinator_wilayah',
            'dewan_paroki',
            'ketua_sie',
            'anggota_sie',
        ];

        $departments = [
            'Liturgi',
            'Sosial',
            'Kesehatan',
            'Pendidikan',
            'Ekonomi',
            'Kepemudaan',
            'Musik',
            null,
        ];

        $startDate = $this->faker->dateTimeBetween('-5 years', '-1 year');
        $endDate = $this->faker->boolean(70) ? $this->faker->dateTimeBetween($startDate, '+3 years') : null;

        return [
            'name' => $this->faker->name(),
            'position' => $this->faker->randomElement($positions),
            'phone' => $this->faker->boolean(80) ? $this->faker->phoneNumber() : null,
            'email' => $this->faker->boolean(60) ? $this->faker->unique()->safeEmail() : null,
            'address' => $this->faker->boolean(70) ? $this->faker->address() : null,
            'photo' => null,
            'community_id' => $this->faker->boolean(70) ? Community::inRandomOrder()->first()?->id : null,
            'department' => $this->faker->randomElement($departments),
            'start_date' => $startDate,
            'end_date' => $endDate,
            'is_active' => $this->faker->boolean(85),
            'notes' => $this->faker->boolean(30) ? $this->faker->paragraph() : null,
        ];
    }

    /**
     * Indicate that the official is a pastor.
     */
    public function pastor(): static
    {
        return $this->state(fn (array $attributes) => [
            'position' => 'pastor_paroki',
            'department' => null,
            'community_id' => null,
            'is_active' => true,
        ]);
    }

    /**
     * Indicate that the official is active.
     */
    public function active(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_active' => true,
            'end_date' => null,
        ]);
    }

    /**
     * Indicate that the official is inactive.
     */
    public function inactive(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_active' => false,
            'end_date' => $this->faker->dateTimeBetween('-1 year', 'now'),
        ]);
    }
}
