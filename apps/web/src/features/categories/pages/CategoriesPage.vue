<script setup lang="ts">
import { MoreVertical } from 'lucide-vue-next'
import { computed, onMounted, reactive, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { ApiRequestError } from '@/shared/api/httpClient'
import { AppButton, AppCard, AppEmptyState, AppInput, AppListRow, AppModalSheet } from '@/shared/ui'
import { useCategoriesStore } from '../stores/categoriesStore'
import { categoryColors, type Category, type CategoryColor, type CategoryPayload } from '../types/category'

type ModalMode = 'create' | 'edit'

interface CategoryForm {
  name: string
  emoji: string
  color: CategoryColor
}

const categoriesStore = useCategoriesStore()
const { list: categories, loading, error } = storeToRefs(categoriesStore)

const isFormOpen = ref(false)
const formMode = ref<ModalMode>('create')
const selectedCategory = ref<Category | null>(null)
const isActionsOpen = ref(false)
const isDeleteConfirmOpen = ref(false)
const cannotDeleteCategory = ref<Category | null>(null)
const cannotDeleteCount = ref(0)
const formError = ref('')
const deleteError = ref('')
const formErrors = reactive({
  name: '',
  emoji: '',
  color: '',
})
const form = reactive<CategoryForm>({
  name: '',
  emoji: '',
  color: 'coral',
})

const sortedCategories = computed(() => categories.value)
const formTitle = computed(() => formMode.value === 'create' ? 'New category' : 'Edit category')

onMounted(async () => {
  await categoriesStore.fetchAll()
})

function openCreateModal(): void {
  selectedCategory.value = null
  formMode.value = 'create'
  resetForm({ name: '', emoji: '', color: 'coral' })
  isFormOpen.value = true
}

function openEditModal(category: Category): void {
  selectedCategory.value = category
  formMode.value = 'edit'
  resetForm(category)
  isActionsOpen.value = false
  isFormOpen.value = true
}

function openActions(category: Category): void {
  selectedCategory.value = category
  isActionsOpen.value = true
}

function resetForm(values: Pick<CategoryForm, 'name' | 'emoji' | 'color'>): void {
  form.name = values.name
  form.emoji = values.emoji
  form.color = values.color
  formError.value = ''
  formErrors.name = ''
  formErrors.emoji = ''
  formErrors.color = ''
}

function validateForm(): boolean {
  formErrors.name = form.name.trim() ? '' : 'Name is required.'
  formErrors.emoji = form.emoji.trim() ? '' : 'Emoji is required.'
  formErrors.color = form.color ? '' : 'Color is required.'

  return !formErrors.name && !formErrors.emoji && !formErrors.color
}

async function saveCategory(): Promise<void> {
  if (!validateForm()) {
    return
  }

  const payload: CategoryPayload = {
    name: form.name.trim(),
    emoji: form.emoji.trim(),
    color: form.color,
    sort_order: selectedCategory.value?.sort_order ?? sortedCategories.value.length + 1,
  }

  try {
    if (formMode.value === 'edit' && selectedCategory.value) {
      await categoriesStore.update(selectedCategory.value.id, payload)
    } else {
      await categoriesStore.create(payload)
    }

    isFormOpen.value = false
    await categoriesStore.fetchAll()
  } catch (requestError) {
    formError.value = requestError instanceof Error
      ? requestError.message
      : 'Unable to save category.'

    if (requestError instanceof ApiRequestError) {
      formErrors.name = requestError.errors.name?.[0] ?? ''
      formErrors.emoji = requestError.errors.emoji?.[0] ?? ''
      formErrors.color = requestError.errors.color?.[0] ?? ''
    }
  }
}

function openDeleteConfirm(): void {
  isActionsOpen.value = false
  deleteError.value = ''
  isDeleteConfirmOpen.value = true
}

async function deleteSelectedCategory(): Promise<void> {
  if (!selectedCategory.value) {
    return
  }

  try {
    await categoriesStore.deleteOne(selectedCategory.value.id)
    isDeleteConfirmOpen.value = false
    await categoriesStore.fetchAll()
  } catch (requestError) {
    if (requestError instanceof ApiRequestError && requestError.status === 409) {
      cannotDeleteCategory.value = selectedCategory.value
      cannotDeleteCount.value = Number(requestError.payload.expenses_count ?? 0)
      isDeleteConfirmOpen.value = false
      return
    }

    deleteError.value = requestError instanceof Error
      ? requestError.message
      : 'Unable to delete category.'
  }
}

function colorClass(color: CategoryColor): string {
  return `category-color--${color}`
}
</script>

<template>
  <section class="categories-page" aria-labelledby="categories-title">
    <div class="categories-page__intro">
      <h2 id="categories-title" class="categories-page__title">Categories</h2>
      <p class="categories-page__description">Organize expenses with emoji labels and BudgetFlow colors.</p>
    </div>

    <AppButton class="categories-page__add" @click="openCreateModal">Add category</AppButton>

    <p v-if="error" class="categories-page__error">{{ error }}</p>

    <AppCard v-if="sortedCategories.length" padding="md">
      <AppListRow
        v-for="(category, index) in sortedCategories"
        :key="category.id"
        clickable
        :has-border="index !== sortedCategories.length - 1"
        @click="openEditModal(category)"
      >
        <template #leading>
          <span class="categories-page__emoji" :class="colorClass(category.color)">
            {{ category.emoji }}
          </span>
        </template>
        <span class="categories-page__name">{{ category.name }}</span>
        <template #trailing>
          <AppButton
            :aria-label="`Open actions for ${category.name}`"
            size="sm"
            variant="ghost"
            class="categories-page__icon-button"
            @click.stop="openActions(category)"
          >
            <MoreVertical :size="20" aria-hidden="true" />
          </AppButton>
        </template>
      </AppListRow>
    </AppCard>

    <AppEmptyState
      v-else-if="!loading"
      title="No categories yet"
      description="Add categories to organize expenses with emoji labels."
    >
      <template #illustration>🏷️</template>
      <template #action>
        <AppButton @click="openCreateModal">Add category</AppButton>
      </template>
    </AppEmptyState>

    <p v-else class="categories-page__loading">Loading categories...</p>

    <AppModalSheet :open="isFormOpen" :title="formTitle" @close="isFormOpen = false">
      <form class="categories-page__form" @submit.prevent="saveCategory">
        <p v-if="formError" class="categories-page__form-error">{{ formError }}</p>

        <AppInput v-model="form.name" label="Name" :error="formErrors.name" :disabled="loading" />
        <AppInput
          v-model="form.emoji"
          label="Emoji"
          placeholder="📦"
          :error="formErrors.emoji"
          :disabled="loading"
        />

        <fieldset class="categories-page__colors">
          <legend>Color</legend>
          <button
            v-for="color in categoryColors"
            :key="color"
            type="button"
            class="categories-page__color-button"
            :class="[colorClass(color), { 'categories-page__color-button--selected': form.color === color }]"
            :aria-pressed="form.color === color"
            :aria-label="`Choose ${color}`"
            @click="form.color = color"
          ></button>
        </fieldset>
      </form>

      <template #footer>
        <div class="categories-page__modal-actions">
          <AppButton variant="ghost" @click="isFormOpen = false">Cancel</AppButton>
          <AppButton :loading="loading" @click="saveCategory">Save</AppButton>
        </div>
      </template>
    </AppModalSheet>

    <AppModalSheet :open="isActionsOpen" title="Category actions" @close="isActionsOpen = false">
      <div v-if="selectedCategory" class="categories-page__actions">
        <AppButton variant="secondary" @click="openEditModal(selectedCategory)">Edit</AppButton>
        <AppButton variant="destructive" @click="openDeleteConfirm">Delete</AppButton>
      </div>
    </AppModalSheet>

    <AppModalSheet :open="isDeleteConfirmOpen" :title="`Delete ${selectedCategory?.name ?? 'category'}?`" @close="isDeleteConfirmOpen = false">
      <p class="categories-page__description">This category will be removed permanently.</p>
      <p v-if="deleteError" class="categories-page__form-error">{{ deleteError }}</p>

      <template #footer>
        <div class="categories-page__modal-actions">
          <AppButton variant="ghost" @click="isDeleteConfirmOpen = false">Cancel</AppButton>
          <AppButton variant="destructive" :loading="loading" @click="deleteSelectedCategory">Delete</AppButton>
        </div>
      </template>
    </AppModalSheet>

    <AppModalSheet
      :open="Boolean(cannotDeleteCategory)"
      title="Cannot delete"
      @close="cannotDeleteCategory = null"
    >
      <p v-if="cannotDeleteCategory" class="categories-page__description">
        {{ cannotDeleteCategory.name }} has {{ cannotDeleteCount }} expenses linked to it.
        Move them to another category first.
      </p>

      <template #footer>
        <AppButton class="categories-page__add" @click="cannotDeleteCategory = null">Dismiss</AppButton>
      </template>
    </AppModalSheet>
  </section>
</template>

<style scoped>
.categories-page {
  display: grid;
  gap: var(--space-5);
}

.categories-page__intro {
  display: grid;
  gap: var(--space-1);
}

.categories-page__title {
  margin: 0;
  color: var(--color-text-primary);
  font-family: var(--font-display);
  font-size: var(--text-lg);
  font-weight: var(--weight-semibold);
  line-height: var(--leading-snug);
}

.categories-page__description,
.categories-page__loading,
.categories-page__error {
  margin: 0;
  color: var(--color-text-secondary);
  font-size: var(--text-sm);
  line-height: var(--leading-normal);
}

.categories-page__error,
.categories-page__form-error {
  color: var(--color-danger-text);
}

.categories-page__add {
  width: 100%;
}

.categories-page__emoji {
  display: inline-grid;
  width: 36px;
  height: 36px;
  place-items: center;
  border-radius: var(--radius-full);
  font-size: var(--text-md);
}

.categories-page__name {
  color: var(--color-text-primary);
  font-weight: var(--weight-medium);
}

.categories-page__icon-button {
  width: 40px;
  min-height: 40px;
  padding: 0;
}

.categories-page__form,
.categories-page__actions {
  display: grid;
  gap: var(--space-4);
}

.categories-page__form-error {
  margin: 0;
  padding: var(--space-3);
  border-radius: var(--radius-md);
  background: var(--color-danger-bg);
  font-size: var(--text-sm);
  line-height: var(--leading-normal);
}

.categories-page__colors {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  margin: 0;
  padding: 0;
  border: 0;
}

.categories-page__colors legend {
  width: 100%;
  margin-bottom: var(--space-1);
  color: var(--color-text-secondary);
  font-size: var(--text-sm);
  font-weight: var(--weight-medium);
  line-height: var(--leading-normal);
}

.categories-page__color-button {
  width: 40px;
  height: 40px;
  border: 2px solid transparent;
  border-radius: var(--radius-full);
  cursor: pointer;
}

.categories-page__color-button--selected {
  border-color: var(--color-primary-700);
  box-shadow: var(--shadow-focus);
}

.categories-page__modal-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-3);
}

.category-color--coral {
  color: var(--color-cat-coral-text);
  background: var(--color-cat-coral-bg);
}

.category-color--teal {
  color: var(--color-cat-teal-text);
  background: var(--color-cat-teal-bg);
}

.category-color--purple {
  color: var(--color-cat-purple-text);
  background: var(--color-cat-purple-bg);
}

.category-color--pink {
  color: var(--color-cat-pink-text);
  background: var(--color-cat-pink-bg);
}

.category-color--amber {
  color: var(--color-cat-amber-text);
  background: var(--color-cat-amber-bg);
}

.category-color--blue {
  color: var(--color-cat-blue-text);
  background: var(--color-cat-blue-bg);
}

.category-color--green {
  color: var(--color-cat-green-text);
  background: var(--color-cat-green-bg);
}
</style>
