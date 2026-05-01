<?php

namespace Tests\Feature\Categories;

use App\Models\Category;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class CategoryApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_category_routes_require_authentication(): void
    {
        $category = Category::factory()->create();

        $this->getJson('/api/categories')->assertUnauthorized();
        $this->postJson('/api/categories')->assertUnauthorized();
        $this->getJson("/api/categories/{$category->id}")->assertUnauthorized();
        $this->patchJson("/api/categories/{$category->id}")->assertUnauthorized();
        $this->deleteJson("/api/categories/{$category->id}")->assertUnauthorized();
    }

    public function test_user_can_list_only_their_categories(): void
    {
        $user = User::factory()->create();
        $otherUser = User::factory()->create();

        $second = Category::factory()->for($user)->create([
            'name' => 'Utilities',
            'sort_order' => 20,
        ]);
        $first = Category::factory()->for($user)->create([
            'name' => 'Groceries',
            'sort_order' => 10,
        ]);
        Category::factory()->for($otherUser)->create([
            'name' => 'Hidden',
            'sort_order' => 0,
        ]);

        Sanctum::actingAs($user);

        $response = $this
            ->getJson('/api/categories');

        $response
            ->assertOk()
            ->assertJsonCount(2, 'data')
            ->assertJsonPath('data.0.id', $first->id)
            ->assertJsonPath('data.1.id', $second->id);
    }

    public function test_user_can_create_a_category(): void
    {
        $user = User::factory()->create();

        Sanctum::actingAs($user);

        $response = $this
            ->postJson('/api/categories', [
                'name' => 'Groceries',
                'color' => '#166D67',
                'sort_order' => 10,
            ]);

        $response
            ->assertCreated()
            ->assertJsonPath('data.name', 'Groceries')
            ->assertJsonPath('data.color', '#166D67')
            ->assertJsonPath('data.sort_order', 10);

        $this->assertDatabaseHas('categories', [
            'user_id' => $user->id,
            'name' => 'Groceries',
            'color' => '#166D67',
            'sort_order' => 10,
        ]);
    }

    public function test_category_validation_requires_valid_data(): void
    {
        $user = User::factory()->create();

        Category::factory()->for($user)->create([
            'name' => 'Groceries',
        ]);

        Sanctum::actingAs($user);

        $response = $this
            ->postJson('/api/categories', [
                'name' => 'Groceries',
                'color' => 'green',
                'sort_order' => -1,
            ]);

        $response
            ->assertUnprocessable()
            ->assertJsonValidationErrors(['name', 'color', 'sort_order']);
    }

    public function test_user_can_view_their_category(): void
    {
        $user = User::factory()->create();
        $category = Category::factory()->for($user)->create([
            'name' => 'Groceries',
        ]);

        Sanctum::actingAs($user);

        $response = $this
            ->getJson("/api/categories/{$category->id}");

        $response
            ->assertOk()
            ->assertJsonPath('data.id', $category->id)
            ->assertJsonPath('data.name', 'Groceries');
    }

    public function test_user_cannot_view_another_users_category(): void
    {
        $user = User::factory()->create();
        $otherUser = User::factory()->create();
        $category = Category::factory()->for($otherUser)->create();

        Sanctum::actingAs($user);

        $this
            ->getJson("/api/categories/{$category->id}")
            ->assertNotFound();
    }

    public function test_user_can_update_their_category(): void
    {
        $user = User::factory()->create();
        $category = Category::factory()->for($user)->create([
            'name' => 'Food',
            'color' => '#111111',
            'sort_order' => 10,
        ]);

        Sanctum::actingAs($user);

        $response = $this
            ->patchJson("/api/categories/{$category->id}", [
                'name' => 'Groceries',
                'color' => '#166D67',
                'sort_order' => 20,
            ]);

        $response
            ->assertOk()
            ->assertJsonPath('data.name', 'Groceries')
            ->assertJsonPath('data.color', '#166D67')
            ->assertJsonPath('data.sort_order', 20);

        $this->assertDatabaseHas('categories', [
            'id' => $category->id,
            'name' => 'Groceries',
            'color' => '#166D67',
            'sort_order' => 20,
        ]);
    }

    public function test_user_cannot_update_another_users_category(): void
    {
        $user = User::factory()->create();
        $otherUser = User::factory()->create();
        $category = Category::factory()->for($otherUser)->create();

        Sanctum::actingAs($user);

        $this
            ->patchJson("/api/categories/{$category->id}", [
                'name' => 'Groceries',
            ])
            ->assertNotFound();
    }

    public function test_user_can_delete_their_category(): void
    {
        $user = User::factory()->create();
        $category = Category::factory()->for($user)->create();

        Sanctum::actingAs($user);

        $this
            ->deleteJson("/api/categories/{$category->id}")
            ->assertNoContent();

        $this->assertDatabaseMissing('categories', [
            'id' => $category->id,
        ]);
    }
}
