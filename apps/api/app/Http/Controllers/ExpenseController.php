<?php

namespace App\Http\Controllers;

use App\Http\Requests\ListExpensesRequest;
use App\Http\Requests\StoreExpenseRequest;
use App\Http\Requests\UpdateExpenseRequest;
use App\Http\Resources\ExpenseResource;
use App\Models\Expense;
use App\Models\User;
use Carbon\CarbonImmutable;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Response;

class ExpenseController extends Controller
{
    /**
     * List expenses.
     *
     * @group Expenses
     *
     * @authenticated
     */
    public function index(ListExpensesRequest $request): AnonymousResourceCollection
    {
        $user = $this->authenticatedUser($request);
        $filters = $request->validated();
        $monthStart = isset($filters['month']) ? $filters['month'].'-01' : null;
        $monthEnd = $monthStart
            ? CarbonImmutable::createFromFormat('Y-m-d', $monthStart)->endOfMonth()->toDateString()
            : null;

        $expenses = Expense::query()
            ->with('category')
            ->whereBelongsTo($user)
            ->when($monthStart && $monthEnd, function ($query) use ($monthStart, $monthEnd): void {
                $query
                    ->whereDate('expense_date', '>=', $monthStart)
                    ->whereDate('expense_date', '<=', $monthEnd);
            })
            ->when(isset($filters['category_id']), fn ($query) => $query->where('category_id', $filters['category_id']))
            ->when(isset($filters['type']), fn ($query) => $query->where('type', $filters['type']))
            ->when(isset($filters['date_from']), fn ($query) => $query->whereDate('expense_date', '>=', $filters['date_from']))
            ->when(isset($filters['date_to']), fn ($query) => $query->whereDate('expense_date', '<=', $filters['date_to']))
            ->orderByDesc('expense_date')
            ->orderByDesc('id')
            ->get();

        return ExpenseResource::collection($expenses);
    }

    /**
     * Create an expense.
     *
     * @group Expenses
     *
     * @authenticated
     */
    public function store(StoreExpenseRequest $request): JsonResponse
    {
        $user = $this->authenticatedUser($request);

        $expense = Expense::query()->create([
            ...$request->validated(),
            'user_id' => $user->id,
        ]);

        return ExpenseResource::make($expense->load('category'))
            ->response()
            ->setStatusCode(201);
    }

    /**
     * Show an expense.
     *
     * @group Expenses
     *
     * @authenticated
     */
    public function show(Request $request, Expense $expense): ExpenseResource
    {
        $this->ensureExpenseBelongsToUser($request, $expense);

        return ExpenseResource::make($expense->load('category'));
    }

    /**
     * Update an expense.
     *
     * @group Expenses
     *
     * @authenticated
     */
    public function update(UpdateExpenseRequest $request, Expense $expense): ExpenseResource
    {
        $this->ensureExpenseBelongsToUser($request, $expense);

        $expense->update($request->validated());

        return ExpenseResource::make($expense->load('category'));
    }

    /**
     * Delete an expense.
     *
     * @group Expenses
     *
     * @authenticated
     */
    public function destroy(Request $request, Expense $expense): Response
    {
        $this->ensureExpenseBelongsToUser($request, $expense);

        $expense->delete();

        return response()->noContent();
    }

    private function ensureExpenseBelongsToUser(Request $request, Expense $expense): void
    {
        $user = $this->authenticatedUser($request);

        abort_unless($expense->user_id === $user->id, 404);
    }

    private function authenticatedUser(Request $request): User
    {
        $user = $request->user();

        abort_unless($user instanceof User, 401);

        return $user;
    }
}
