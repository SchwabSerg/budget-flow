<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class RegisterRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * @return array<string, list<mixed>>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', 'unique:users,email'],
            'password' => ['required', 'confirmed', Password::defaults()],
        ];
    }

    /**
     * @return array<string, array<string, mixed>>
     */
    public function bodyParameters(): array
    {
        return [
            'name' => [
                'description' => "The user's display name.",
                'example' => 'Jane Doe',
            ],
            'email' => [
                'description' => "The user's email address.",
                'example' => 'jane@example.com',
            ],
            'password' => [
                'description' => "The user's password.",
                'example' => 'password',
            ],
            'password_confirmation' => [
                'description' => 'The password confirmation.',
                'example' => 'password',
            ],
        ];
    }
}
