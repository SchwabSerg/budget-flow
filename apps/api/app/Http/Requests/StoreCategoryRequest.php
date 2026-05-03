<?php

namespace App\Http\Requests;

use App\Models\Category;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreCategoryRequest extends FormRequest
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
            'name' => [
                'required',
                'string',
                'max:120',
                Rule::unique('categories', 'name')->where('user_id', $this->user()?->getAuthIdentifier()),
            ],
            'emoji' => ['required', 'string', 'max:16'],
            'color' => ['required', 'string', Rule::in(Category::ALLOWED_COLORS)],
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
                'description' => 'Design-system category color name.',
                'example' => 'green',
            ],
            'emoji' => [
                'description' => 'Emoji shown as the category icon.',
                'example' => '🛒',
            ],
            'sort_order' => [
                'description' => 'Optional sort position for category lists.',
                'example' => 10,
            ],
        ];
    }
}
