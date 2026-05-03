# Task 9.1 - Categories Schema and Management UI

## Status

Done.

## Goal

Migrate categories from arbitrary hex colors to the design-system category model and add the first authenticated settings-based management UI.

## Context

Task 9 is the first backend plus frontend task after the app shell migration. The design system defines category colors as named tokens, so category records now store an emoji and a color name from the approved pool.

## Scope

- Add a migration for category `emoji` and named color values.
- Update category model fillable fields, validation, factories, resources, and Scribe examples.
- Add delete protection when expenses reference a category.
- Seed six starter categories for newly registered users.
- Add `/categories` under the authenticated app shell.
- Replace the settings placeholder with a settings menu.
- Add a categories Pinia store, API wrapper, management screen, create/edit modal, and delete confirmation flow.
- Fix AppLayout content centering on wide viewports.

## Out of Scope

- Expense UI.
- Drag-and-drop category ordering.
- Bulk recategorization.
- Profile editing.
- Any new expense behavior.

## Files Changed

- `apps/api/app/Actions/Categories/SeedDefaultCategoriesAction.php`
- `apps/api/app/Http/Controllers/Auth/AuthController.php`
- `apps/api/app/Http/Controllers/CategoryController.php`
- `apps/api/app/Http/Requests/StoreCategoryRequest.php`
- `apps/api/app/Http/Requests/UpdateCategoryRequest.php`
- `apps/api/app/Http/Resources/CategoryResource.php`
- `apps/api/app/Models/Category.php`
- `apps/api/database/factories/CategoryFactory.php`
- `apps/api/database/migrations/2026_05_02_000003_update_categories_for_design_system.php`
- `apps/api/tests/Feature/Auth/AuthApiTest.php`
- `apps/api/tests/Feature/Categories/CategoryApiTest.php`
- `apps/web/src/app/router/index.ts`
- `apps/web/src/features/categories/`
- `apps/web/src/features/settings/pages/SettingsPage.vue`
- `apps/web/src/layouts/AppLayout.vue`
- `apps/web/src/shared/api/httpClient.ts`

## Acceptance Criteria

- Category API returns `emoji` and named `color` values.
- Invalid category colors are rejected.
- New users receive six default categories during registration.
- Deleting a category linked to expenses returns HTTP 409 with an expense count.
- Settings links to category management.
- Category management supports list, create, edit, and delete flows.
- AppLayout content is centered at wide viewport sizes.
- Backend and frontend tests pass.

## Verification Commands

```bash
make api-migrate-fresh
make api-test
make pint
make phpstan
make scribe-generate
make web-test
make web-build
make web-type-check
```

## Completion Notes

- Used portable Laravel schema/data migration steps instead of database-native enum/check constraints so the migration runs on both PostgreSQL and SQLite.
- Enforced allowed category colors in the model/request layer with `Category::ALLOWED_COLORS`.
- Relied on the existing API 409 response for delete-blocked UI rather than adding a separate preflight endpoint.
