<?php

namespace App\Http\Controllers\Auth;

use App\Actions\Categories\SeedDefaultCategoriesAction;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    /**
     * Register a new user.
     *
     * @group Authentication
     *
     * @unauthenticated
     *
     * @bodyParam name string required The user's display name. Example: Jane Doe
     * @bodyParam email string required The user's email address. Example: jane@example.com
     * @bodyParam password string required The user's password. Example: password
     * @bodyParam password_confirmation string required Password confirmation. Example: password
     */
    public function register(RegisterRequest $request, SeedDefaultCategoriesAction $seedDefaultCategories): JsonResponse
    {
        $user = User::query()->create($request->validated());
        $seedDefaultCategories->handle($user);

        return response()->json([
            'user' => $this->userPayload($user),
            'token' => $user->createToken('api')->plainTextToken,
        ], 201);
    }

    /**
     * Log in an existing user.
     *
     * @group Authentication
     *
     * @unauthenticated
     *
     * @bodyParam email string required The user's email address. Example: jane@example.com
     * @bodyParam password string required The user's password. Example: password
     */
    public function login(LoginRequest $request): JsonResponse
    {
        $credentials = $request->validated();
        $user = User::query()->where('email', $credentials['email'])->first();

        if (! $user || ! Hash::check($credentials['password'], $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        return response()->json([
            'user' => $this->userPayload($user),
            'token' => $user->createToken('api')->plainTextToken,
        ]);
    }

    /**
     * Get the authenticated user.
     *
     * @group Authentication
     *
     * @authenticated
     */
    public function user(Request $request): JsonResponse
    {
        /** @var User $user */
        $user = $request->user();

        return response()->json([
            'user' => $this->userPayload($user),
        ]);
    }

    /**
     * Log out the authenticated user.
     *
     * @group Authentication
     *
     * @authenticated
     */
    public function logout(Request $request): JsonResponse
    {
        $request->user()?->currentAccessToken()?->delete();

        return response()->json([
            'message' => 'Logged out.',
        ]);
    }

    /**
     * @return array{id: int, name: string, email: string}
     */
    private function userPayload(User $user): array
    {
        return [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
        ];
    }
}
