<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ListExpensesRequest extends FormRequest
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
            'month' => ['sometimes', 'date_format:Y-m'],
            'category_id' => [
                'sometimes',
                'integer',
                Rule::exists('categories', 'id')->where('user_id', $this->user()?->getAuthIdentifier()),
            ],
            'type' => ['sometimes', 'string', Rule::in(['manual', 'recurring'])],
            'date_from' => ['sometimes', 'date'],
            'date_to' => ['sometimes', 'date', 'after_or_equal:date_from'],
        ];
    }

    /**
     * @return array<string, array<string, mixed>>
     */
    public function queryParameters(): array
    {
        return [
            'month' => [
                'description' => 'Filter expenses by month in YYYY-MM format.',
                'example' => '2026-05',
            ],
            'category_id' => [
                'description' => 'Filter expenses by one of the current user categories.',
                'example' => 1,
            ],
            'type' => [
                'description' => 'Filter expenses by type.',
                'example' => 'manual',
            ],
            'date_from' => [
                'description' => 'Filter expenses on or after this date.',
                'example' => '2026-05-01',
            ],
            'date_to' => [
                'description' => 'Filter expenses on or before this date.',
                'example' => '2026-05-31',
            ],
        ];
    }
}
