<?php

namespace App\Http\Resources;

use App\Models\Category;
use App\Models\Expense;
use DateTimeInterface;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin Expense
 */
class ExpenseResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'category_id' => $this->category_id,
            'title' => $this->title,
            'amount_cents' => $this->amount_cents,
            'currency' => $this->currency,
            'type' => $this->type,
            'expense_date' => $this->formattedExpenseDate(),
            'notes' => $this->notes,
            'category' => $this->whenLoaded('category', function (): ?array {
                if (! $this->category instanceof Category) {
                    return null;
                }

                return [
                    'id' => $this->category->id,
                    'name' => $this->category->name,
                    'color' => $this->category->color,
                ];
            }),
            'created_at' => $this->created_at?->toISOString(),
            'updated_at' => $this->updated_at?->toISOString(),
        ];
    }

    private function formattedExpenseDate(): ?string
    {
        $expenseDate = $this->resource->getAttribute('expense_date');

        if ($expenseDate instanceof DateTimeInterface) {
            return $expenseDate->format('Y-m-d');
        }

        return is_string($expenseDate) ? $expenseDate : null;
    }
}
