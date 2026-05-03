<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Http\Resources\CategoryResource;
use App\Models\Category;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Response;

class CategoryController extends Controller
{
    /**
     * List categories.
     *
     * @group Categories
     *
     * @authenticated
     */
    public function index(Request $request): AnonymousResourceCollection
    {
        $user = $this->authenticatedUser($request);

        $categories = Category::query()
            ->whereBelongsTo($user)
            ->orderBy('sort_order')
            ->orderBy('name')
            ->get();

        return CategoryResource::collection($categories);
    }

    /**
     * Create a category.
     *
     * @group Categories
     *
     * @authenticated
     */
    public function store(StoreCategoryRequest $request): JsonResponse
    {
        $user = $this->authenticatedUser($request);

        $category = Category::query()->create([
            ...$request->validated(),
            'user_id' => $user->id,
        ]);

        return CategoryResource::make($category)
            ->response()
            ->setStatusCode(201);
    }

    /**
     * Show a category.
     *
     * @group Categories
     *
     * @authenticated
     */
    public function show(Request $request, Category $category): CategoryResource
    {
        $this->ensureCategoryBelongsToUser($request, $category);

        return CategoryResource::make($category);
    }

    /**
     * Update a category.
     *
     * @group Categories
     *
     * @authenticated
     */
    public function update(UpdateCategoryRequest $request, Category $category): CategoryResource
    {
        $this->ensureCategoryBelongsToUser($request, $category);

        $category->update($request->validated());

        return CategoryResource::make($category);
    }

    /**
     * Delete a category.
     *
     * @group Categories
     *
     * @authenticated
     */
    public function destroy(Request $request, Category $category): Response|JsonResponse
    {
        $this->ensureCategoryBelongsToUser($request, $category);

        $expensesCount = $category->expenses()->count();

        if ($expensesCount > 0) {
            return response()->json([
                'message' => "Cannot delete category. {$expensesCount} expenses are linked to it.",
                'expenses_count' => $expensesCount,
            ], 409);
        }

        $category->delete();

        return response()->noContent();
    }

    private function ensureCategoryBelongsToUser(Request $request, Category $category): void
    {
        $user = $this->authenticatedUser($request);

        abort_unless($category->user_id === $user->id, 404);
    }

    private function authenticatedUser(Request $request): User
    {
        $user = $request->user();

        abort_unless($user instanceof User, 401);

        return $user;
    }
}
