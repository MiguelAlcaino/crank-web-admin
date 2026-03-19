<script setup lang="ts">
import draggable from 'vuedraggable'
import ClassPackageEdit from './ClassPackageEdit.vue'
import type { ClassPackage } from '../interfaces'

interface Props {
  title: string
  packages: ClassPackage[]
  groupName: string
}

defineProps<Props>()

const emits = defineEmits<{
  (e: 'update:packages', packages: ClassPackage[]): void
  (e: 'afterUpdateClassPackage', pkg: ClassPackage): void
}>()

function onDraggableUpdate(value: ClassPackage[]) {
  emits('update:packages', value)
}
</script>

<template>
  <div class="category-section mb-4">
    <h5 class="category-title">{{ title }}</h5>
    <draggable
      :model-value="packages"
      @update:model-value="onDraggableUpdate"
      :group="groupName"
      item-key="id"
      class="list-group package-list"
    >
      <template #item="{ element }">
        <div class="list-group-item d-flex justify-content-between align-items-center">
          <div class="d-flex align-items-center">
            <i class="bi bi-grip-vertical me-2 drag-handle"></i>
            <div>
              <span class="fw-bold">{{ element.title }}</span>
              <span class="ms-2 text-muted">{{ element.currency }}</span>
              <span v-if="!element.isVisible" class="badge bg-secondary ms-2">Hidden</span>
            </div>
          </div>
          <ClassPackageEdit
            :class-package="element"
            @after-update-class-package="(pkg: ClassPackage) => emits('afterUpdateClassPackage', pkg)"
          ></ClassPackageEdit>
        </div>
      </template>
    </draggable>
    <div v-if="packages.length === 0" class="text-muted text-center py-3 empty-placeholder">
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
  border: 1px dashed #dee2e6;
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
