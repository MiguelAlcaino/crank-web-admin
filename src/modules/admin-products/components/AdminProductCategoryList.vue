<script setup lang="ts">
import draggable from 'vuedraggable'

import type { AdminProduct } from '../composables/adminProducts'

interface Props {
  title: string
  products: AdminProduct[]
  groupName: string
}

defineProps<Props>()

const emits = defineEmits<{
  (e: 'update:products', products: AdminProduct[]): void
  (e: 'edit', product: AdminProduct): void
}>()

function formatPrice(price: number): string {
  return Math.round(price).toString()
}
</script>

<template>
  <div class="category-section mb-4">
    <h5 class="category-title">{{ title }}</h5>
    <draggable
      :model-value="products"
      @update:model-value="(value: AdminProduct[]) => emits('update:products', value)"
      :group="groupName"
      item-key="id"
      class="list-group package-list"
    >
      <template #item="{ element }">
        <div class="list-group-item d-flex justify-content-between align-items-center">
          <div class="d-flex align-items-center">
            <i class="bi bi-grip-vertical me-2 drag-handle"></i>
            <div>
              <span class="fw-bold">{{ element.name }}</span>
              <span class="ms-2 text-muted">AED {{ formatPrice(element.price) }}</span>
              <span v-if="element.customTitle" class="ms-2 small text-muted">
                (shown as "{{ element.customTitle }}")
              </span>
              <span v-if="!element.isVisible" class="badge bg-secondary ms-2">Hidden</span>
              <span v-if="element.muviEnabled" class="badge bg-info ms-2">
                VOD {{ element.muviNumberOfDays }}d
              </span>
            </div>
          </div>
          <button type="button" class="btn btn-primary btn-sm" @click="emits('edit', element)">
            Edit
          </button>
        </div>
      </template>
    </draggable>
    <div v-if="products.length === 0" class="text-muted text-center py-3 empty-placeholder">
      No packages in this category. Drag packages here.
    </div>
  </div>
</template>

<style scoped>
.category-title {
  font-family: 'BigJohn', sans-serif;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
}

.package-list {
  min-height: 60px;
  border: 1px dashed var(--bs-border-color);
  border-radius: 4px;
  padding: 4px;
}

.list-group-item {
  cursor: grab;
}

.list-group-item:active {
  cursor: grabbing;
}

.drag-handle {
  cursor: grab;
  color: #adb5bd;
}

.empty-placeholder {
  font-style: italic;
}
</style>
