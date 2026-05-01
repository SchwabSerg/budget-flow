<?php

namespace App\Http\Requests;

use App\Models\Category;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateCategoryRequest extends FormRequest
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
        /** @var Category|null $category */
        $category = $this->route('category');

        return [
            'name' => [
                'sometimes',
                'required',
                'string',
                'max:120',
                Rule::unique('categories', 'name')
                    ->where('user_id', $this->user()?->getAuthIdentifier())
                    ->ignore($category?->id),
            ],
            'color' => ['nullable', 'string', 'regex:/^#[0-9A-Fa-f]{6}$/'],
            'sort_order' => ['sometimes', 'integer', 'min:0', 'max:65535'],
        ];
    }

    /**
     * @return array<string, array<string, mixed>>
     */
    public function bodyParameters(): array
    {
        return [
            'name' => [
                'description' => 'The category name.',
                'example' => 'Groceries',
            ],
            'color' => [
                'description' => 'Optional display color as a hex value.',
                'example' => '#166D67',
            ],
            'sort_order' => [
                'description' => 'Optional sort position for category lists.',
                'example' => 10,
            ],
        ];
    }
}
