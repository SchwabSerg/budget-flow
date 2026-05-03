<?php

namespace App\Actions\Categories;

use App\Models\Category;
use App\Models\User;

class SeedDefaultCategoriesAction
{
    /**
     * @var list<array{name: string, emoji: string, color: string, sort_order: int}>
     */
    private const DEFAULT_CATEGORIES = [
        ['name' => 'Coffee', 'emoji' => '☕', 'color' => 'amber', 'sort_order' => 1],
        ['name' => 'Groceries', 'emoji' => '🛒', 'color' => 'green', 'sort_order' => 2],
        ['name' => 'Transport', 'emoji' => '🚗', 'color' => 'blue', 'sort_order' => 3],
        ['name' => 'Entertainment', 'emoji' => '🎬', 'color' => 'purple', 'sort_order' => 4],
        ['name' => 'Dining', 'emoji' => '🍽️', 'color' => 'coral', 'sort_order' => 5],
        ['name' => 'Other', 'emoji' => '💡', 'color' => 'teal', 'sort_order' => 6],
    ];

    public function handle(User $user): void
    {
        foreach (self::DEFAULT_CATEGORIES as $category) {
            Category::query()->create([
                ...$category,
                'user_id' => $user->id,
            ]);
        }
    }
}
