<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\Expense;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Expense>
 */
class ExpenseFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'category_id' => null,
            'title' => fake()->words(3, true),
            'amount_cents' => fake()->numberBetween(100, 100000),
            'currency' => 'UAH',
            'type' => fake()->randomElement(['manual', 'recurring']),
            'expense_date' => fake()->date(),
            'notes' => fake()->optional()->sentence(),
        ];
    }

    public function withCategory(): static
    {
        return $this->state(fn (array $attributes) => [
            'category_id' => Category::factory()->state([
                'user_id' => $attributes['user_id'],
            ]),
        ]);
    }
}
