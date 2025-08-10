<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Announcement>
 */
class AnnouncementFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->sentence(4),
            'description' => fake()->paragraphs(3, true),
            'image_url' => fake()->imageUrl(640, 480, 'church', true),
            'is_publish' => fake()->boolean(70), // 70% chance to be published
        ];
    }

    /**
     * Create a published announcement
     */
    public function published(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_publish' => true,
        ]);
    }

    /**
     * Create a draft announcement
     */
    public function draft(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_publish' => false,
        ]);
    }
}
