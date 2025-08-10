<?php

namespace Database\Factories;

use App\Models\Role;
use App\Models\Community;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'username' => fake()->unique()->userName(),
            'email' => fake()->unique()->safeEmail(),
            'phone_number' => fake()->phoneNumber(),
            'password' => static::$password ??= Hash::make('password'),
            'address' => fake()->address(),
            'birth_date' => fake()->dateTimeBetween('-70 years', '-18 years')->format('Y-m-d'),
            'gender' => fake()->randomElement(['male', 'female']),
            'role_id' => Role::factory(),
            'community_id' => Community::factory(),
            'status' => fake()->randomElement(['active', 'inactive']),
        ];
    }

    /**
     * Create an admin user
     */
    public function admin(): static
    {
        return $this->state(function (array $attributes) {
            $adminRole = Role::where('name', 'admin')->first() ?? Role::factory()->create(['name' => 'admin']);
            return [
                'role_id' => $adminRole->id,
                'status' => 'active',
            ];
        });
    }

    /**
     * Create a regular umat user
     */
    public function umat(): static
    {
        return $this->state(function (array $attributes) {
            $umatRole = Role::where('name', 'umat')->first() ?? Role::factory()->create(['name' => 'umat']);
            return [
                'role_id' => $umatRole->id,
                'status' => 'active',
            ];
        });
    }

    /**
     * Create a user with specific community
     */
    public function withCommunity($communityId): static
    {
        return $this->state(fn (array $attributes) => [
            'community_id' => $communityId,
        ]);
    }

    /**
     * Create an active user
     */
    public function active(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'active',
        ]);
    }

    /**
     * Create an inactive user
     */
    public function inactive(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'inactive',
        ]);
    }
}
