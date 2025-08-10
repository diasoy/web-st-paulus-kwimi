<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Community>
 */
class CommunityFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $communityNames = [
            'Komunitas Dewasa',
            'Komunitas Remaja',
            'Komunitas Anak',
            'Komunitas Lansia',
            'Komunitas Pelayanan',
            'Komunitas Musik',
            'Komunitas Doa',
            'Komunitas Pujian',
            'Komunitas Pemuda',
            'Komunitas Wanita'
        ];

        return [
            'name' => fake()->unique()->randomElement($communityNames),
        ];
    }
}
