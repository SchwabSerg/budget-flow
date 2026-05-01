<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateExpenseRequest extends FormRequest
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
            'category_id' => [
                'nullable',
                'integer',
                Rule::exists('categories', 'id')->where('user_id', $this->user()?->getAuthIdentifier()),
            ],
            'title' => ['sometimes', 'required', 'string', 'max:160'],
            'amount_cents' => ['sometimes', 'required', 'integer', 'min:1', 'max:999999999'],
            'currency' => ['sometimes', 'string', 'size:3'],
            'type' => ['sometimes', 'required', 'string', Rule::in(['manual', 'recurring'])],
            'expense_date' => ['sometimes', 'required', 'date'],
            'notes' => ['nullable', 'string', 'max:1000'],
        ];
    }

    /**
     * @return array<string, array<string, mixed>>
     */
    public function bodyParameters(): array
    {
        return [
            'category_id' => [
                'description' => 'Optional category owned by the authenticated user.',
                'example' => 1,
            ],
            'title' => [
                'description' => 'Expense title.',
                'example' => 'Weekly groceries',
            ],
            'amount_cents' => [
                'description' => 'Positive amount stored in minor currency units.',
                'example' => 4250,
            ],
            'currency' => [
                'description' => 'Three-letter currency code.',
                'example' => 'USD',
            ],
            'type' => [
                'description' => 'Expense type.',
                'example' => 'manual',
            ],
            'expense_date' => [
                'description' => 'Date assigned to the expense.',
                'example' => '2026-05-02',
            ],
            'notes' => [
                'description' => 'Optional internal notes.',
                'example' => 'Bought for the weekend.',
            ],
        ];
    }
}
