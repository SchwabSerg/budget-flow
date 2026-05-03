<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AuthApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_register(): void
    {
        $response = $this->postJson('/api/auth/register', [
            'name' => 'Jane Doe',
            'email' => 'jane@example.com',
            'password' => 'password',
            'password_confirmation' => 'password',
        ]);

        $response
            ->assertCreated()
            ->assertJsonStructure([
                'user' => ['id', 'name', 'email'],
                'token',
            ])
            ->assertJsonPath('user.name', 'Jane Doe')
            ->assertJsonPath('user.email', 'jane@example.com');

        $this->assertDatabaseHas('users', [
            'email' => 'jane@example.com',
        ]);

        $this->assertDatabaseCount('personal_access_tokens', 1);
    }

    public function test_registration_seeds_default_categories(): void
    {
        $this->postJson('/api/auth/register', [
            'name' => 'Jane Doe',
            'email' => 'jane@example.com',
            'password' => 'password',
            'password_confirmation' => 'password',
        ])->assertCreated();

        $user = User::query()->where('email', 'jane@example.com')->firstOrFail();

        $this->assertDatabaseCount('categories', 6);
        $this->assertDatabaseHas('categories', [
            'user_id' => $user->id,
            'name' => 'Coffee',
            'emoji' => '☕',
            'color' => 'amber',
            'sort_order' => 1,
        ]);
        $this->assertDatabaseHas('categories', [
            'user_id' => $user->id,
            'name' => 'Other',
            'emoji' => '💡',
            'color' => 'teal',
            'sort_order' => 6,
        ]);
    }

    public function test_registration_requires_valid_unique_data(): void
    {
        User::factory()->create([
            'email' => 'jane@example.com',
        ]);

        $response = $this->postJson('/api/auth/register', [
            'name' => '',
            'email' => 'jane@example.com',
            'password' => 'short',
            'password_confirmation' => 'different',
        ]);

        $response
            ->assertUnprocessable()
            ->assertJsonValidationErrors(['name', 'email', 'password']);
    }

    public function test_user_can_login(): void
    {
        $user = User::factory()->create([
            'email' => 'jane@example.com',
            'password' => 'password',
        ]);

        $response = $this->postJson('/api/auth/login', [
            'email' => 'jane@example.com',
            'password' => 'password',
        ]);

        $response
            ->assertOk()
            ->assertJsonStructure([
                'user' => ['id', 'name', 'email'],
                'token',
            ])
            ->assertJsonPath('user.id', $user->id)
            ->assertJsonPath('user.email', 'jane@example.com');

        $this->assertDatabaseCount('personal_access_tokens', 1);
    }

    public function test_login_rejects_invalid_credentials(): void
    {
        User::factory()->create([
            'email' => 'jane@example.com',
            'password' => 'password',
        ]);

        $response = $this->postJson('/api/auth/login', [
            'email' => 'jane@example.com',
            'password' => 'wrong-password',
        ]);

        $response
            ->assertUnprocessable()
            ->assertJsonValidationErrors(['email']);

        $this->assertDatabaseCount('personal_access_tokens', 0);
    }

    public function test_authenticated_user_can_be_fetched(): void
    {
        $user = User::factory()->create();
        $plainTextToken = $user->createToken('api')->plainTextToken;

        $response = $this
            ->withToken($plainTextToken)
            ->getJson('/api/auth/user');

        $response
            ->assertOk()
            ->assertJsonPath('user.id', $user->id)
            ->assertJsonPath('user.email', $user->email);
    }

    public function test_authenticated_user_can_logout_current_token(): void
    {
        $user = User::factory()->create();
        $plainTextToken = $user->createToken('api')->plainTextToken;

        $this->assertDatabaseCount('personal_access_tokens', 1);

        $response = $this
            ->withToken($plainTextToken)
            ->postJson('/api/auth/logout');

        $response
            ->assertOk()
            ->assertJson([
                'message' => 'Logged out.',
            ]);

        $this->assertDatabaseCount('personal_access_tokens', 0);
    }

    public function test_protected_auth_routes_require_a_token(): void
    {
        $this->getJson('/api/auth/user')->assertUnauthorized();
        $this->postJson('/api/auth/logout')->assertUnauthorized();
    }
}
