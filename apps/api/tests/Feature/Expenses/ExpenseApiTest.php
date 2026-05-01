<?php

namespace Tests\Feature\Expenses;

use App\Models\Category;
use App\Models\Expense;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class ExpenseApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_expense_routes_require_authentication(): void
    {
        $expense = Expense::factory()->create();

        $this->getJson('/api/expenses')->assertUnauthorized();
        $this->postJson('/api/expenses')->assertUnauthorized();
        $this->getJson("/api/expenses/{$expense->id}")->assertUnauthorized();
        $this->patchJson("/api/expenses/{$expense->id}")->assertUnauthorized();
        $this->deleteJson("/api/expenses/{$expense->id}")->assertUnauthorized();
    }

    public function test_user_can_list_only_their_expenses(): void
    {
        $user = User::factory()->create();
        $otherUser = User::factory()->create();

        $newerExpense = Expense::factory()->for($user)->create([
            'title' => 'Groceries',
            'expense_date' => '2026-05-10',
        ]);
        $olderExpense = Expense::factory()->for($user)->create([
            'title' => 'Rent',
            'expense_date' => '2026-05-01',
        ]);
        Expense::factory()->for($otherUser)->create([
            'title' => 'Hidden',
            'expense_date' => '2026-05-15',
        ]);

        Sanctum::actingAs($user);

        $response = $this->getJson('/api/expenses');

        $response
            ->assertOk()
            ->assertJsonCount(2, 'data')
            ->assertJsonPath('data.0.id', $newerExpense->id)
            ->assertJsonPath('data.1.id', $olderExpense->id);
    }

    public function test_user_can_filter_expenses(): void
    {
        $user = User::factory()->create();
        $category = Category::factory()->for($user)->create();
        $otherCategory = Category::factory()->for($user)->create();

        $matchingExpense = Expense::factory()->for($user)->for($category)->create([
            'type' => 'manual',
            'expense_date' => '2026-05-10',
        ]);
        Expense::factory()->for($user)->for($category)->create([
            'type' => 'manual',
            'expense_date' => '2026-06-10',
        ]);
        Expense::factory()->for($user)->for($category)->create([
            'type' => 'recurring',
            'expense_date' => '2026-05-10',
        ]);
        Expense::factory()->for($user)->for($otherCategory)->create([
            'type' => 'manual',
            'expense_date' => '2026-05-10',
        ]);

        Sanctum::actingAs($user);

        $response = $this->getJson("/api/expenses?month=2026-05&type=manual&category_id={$category->id}");

        $response
            ->assertOk()
            ->assertJsonCount(1, 'data')
            ->assertJsonPath('data.0.id', $matchingExpense->id);
    }

    public function test_user_can_create_an_expense_with_their_category(): void
    {
        $user = User::factory()->create();
        $category = Category::factory()->for($user)->create([
            'name' => 'Groceries',
        ]);

        Sanctum::actingAs($user);

        $response = $this->postJson('/api/expenses', [
            'category_id' => $category->id,
            'title' => 'Weekly groceries',
            'amount_cents' => 4250,
            'currency' => 'USD',
            'type' => 'manual',
            'expense_date' => '2026-05-02',
            'notes' => 'Bought for the weekend.',
        ]);

        $response
            ->assertCreated()
            ->assertJsonPath('data.title', 'Weekly groceries')
            ->assertJsonPath('data.category.id', $category->id)
            ->assertJsonPath('data.amount_cents', 4250)
            ->assertJsonPath('data.type', 'manual')
            ->assertJsonPath('data.expense_date', '2026-05-02');

        $this->assertDatabaseHas('expenses', [
            'user_id' => $user->id,
            'category_id' => $category->id,
            'title' => 'Weekly groceries',
            'amount_cents' => 4250,
            'type' => 'manual',
        ]);
    }

    public function test_expense_validation_requires_valid_data(): void
    {
        $user = User::factory()->create();
        $otherUser = User::factory()->create();
        $otherCategory = Category::factory()->for($otherUser)->create();

        Sanctum::actingAs($user);

        $response = $this->postJson('/api/expenses', [
            'category_id' => $otherCategory->id,
            'title' => '',
            'amount_cents' => 0,
            'currency' => 'US',
            'type' => 'imported',
            'expense_date' => 'not-a-date',
            'notes' => str_repeat('x', 1001),
        ]);

        $response
            ->assertUnprocessable()
            ->assertJsonValidationErrors([
                'category_id',
                'title',
                'amount_cents',
                'currency',
                'type',
                'expense_date',
                'notes',
            ]);
    }

    public function test_user_can_view_their_expense(): void
    {
        $user = User::factory()->create();
        $category = Category::factory()->for($user)->create();
        $expense = Expense::factory()->for($user)->for($category)->create([
            'title' => 'Groceries',
        ]);

        Sanctum::actingAs($user);

        $response = $this->getJson("/api/expenses/{$expense->id}");

        $response
            ->assertOk()
            ->assertJsonPath('data.id', $expense->id)
            ->assertJsonPath('data.title', 'Groceries')
            ->assertJsonPath('data.category.id', $category->id);
    }

    public function test_user_cannot_view_another_users_expense(): void
    {
        $user = User::factory()->create();
        $otherUser = User::factory()->create();
        $expense = Expense::factory()->for($otherUser)->create();

        Sanctum::actingAs($user);

        $this
            ->getJson("/api/expenses/{$expense->id}")
            ->assertNotFound();
    }

    public function test_user_can_update_their_expense(): void
    {
        $user = User::factory()->create();
        $category = Category::factory()->for($user)->create();
        $expense = Expense::factory()->for($user)->create([
            'title' => 'Old title',
            'amount_cents' => 1000,
            'type' => 'manual',
        ]);

        Sanctum::actingAs($user);

        $response = $this->patchJson("/api/expenses/{$expense->id}", [
            'category_id' => $category->id,
            'title' => 'Updated rent',
            'amount_cents' => 150000,
            'currency' => 'USD',
            'type' => 'recurring',
            'expense_date' => '2026-05-01',
            'notes' => null,
        ]);

        $response
            ->assertOk()
            ->assertJsonPath('data.title', 'Updated rent')
            ->assertJsonPath('data.category.id', $category->id)
            ->assertJsonPath('data.amount_cents', 150000)
            ->assertJsonPath('data.type', 'recurring');

        $this->assertDatabaseHas('expenses', [
            'id' => $expense->id,
            'category_id' => $category->id,
            'title' => 'Updated rent',
            'amount_cents' => 150000,
            'type' => 'recurring',
        ]);
    }

    public function test_user_cannot_update_another_users_expense(): void
    {
        $user = User::factory()->create();
        $otherUser = User::factory()->create();
        $expense = Expense::factory()->for($otherUser)->create();

        Sanctum::actingAs($user);

        $this
            ->patchJson("/api/expenses/{$expense->id}", [
                'title' => 'Updated',
            ])
            ->assertNotFound();
    }

    public function test_user_can_delete_their_expense(): void
    {
        $user = User::factory()->create();
        $expense = Expense::factory()->for($user)->create();

        Sanctum::actingAs($user);

        $this
            ->deleteJson("/api/expenses/{$expense->id}")
            ->assertNoContent();

        $this->assertDatabaseMissing('expenses', [
            'id' => $expense->id,
        ]);
    }
}
