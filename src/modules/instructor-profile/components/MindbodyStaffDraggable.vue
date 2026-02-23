<script setup lang="ts">
import { computed, ref } from 'vue'
import Draggable from 'vuedraggable'
import type { MindbodyStaff } from '../interfaces'

// Props
const props = defineProps<{
  availableStaff: MindbodyStaff[]
  assignedStaff: MindbodyStaff[]
  isLoading?: boolean
}>()

// Emits
const emit = defineEmits<{
  'update:assignedStaff': [value: MindbodyStaff[]]
}>()

// Computed models for v-model binding with emit
const localAvailable = computed({
  get: () => props.availableStaff,
  set: () => {}
})

const localAssigned = computed({
  get: () => props.assignedStaff,
  set: (value) => emit('update:assignedStaff', value)
})

const dragOptions = {
  animation: 200,
  group: 'staff',
  disabled: false,
  ghostClass: 'ghost'
}

const availableSearch = ref('')
const assignedSearch = ref('')

const normalize = (value: string) => value.trim().toLowerCase()

const matchesStaff = (staff: MindbodyStaff, search: string) => {
  const term = normalize(search)

  if (!term) return true

  return `${staff.firstName} ${staff.lastName}`.toLowerCase().includes(term)
}

const visibleAvailableCount = computed(() =>
  props.availableStaff.filter((staff) => matchesStaff(staff, availableSearch.value)).length
)

const visibleAssignedCount = computed(() =>
  props.assignedStaff.filter((staff) => matchesStaff(staff, assignedSearch.value)).length
)
</script>

<template>
  <div class="lists">
    <!-- Available Staff -->
    <div class="list">
      <h5>Available Mindbody Staff</h5>
      <input
        v-model="availableSearch"
        type="text"
        class="list-search"
        placeholder="Search available staff..."
      />
      <div v-if="isLoading" class="text-center p-3">
        <span class="spinner-border spinner-border-sm"></span> Loading...
      </div>
      <div v-else-if="availableStaff.length === 0" class="text-muted p-3">No available staff</div>
      <div v-else class="scroll-wrapper">
        <div v-if="visibleAvailableCount === 0" class="text-muted p-2">No matches found</div>
        <Draggable
          v-model="localAvailable"
          v-bind="dragOptions"
          item-key="id"
          class="draggable-area"
          :empty-insert-threshold="0"
        >
          <template #item="{ element }">
            <div
              v-show="matchesStaff(element, availableSearch)"
              class="staff-item"
            >
              {{ element.firstName }} {{ element.lastName }}
            </div>
          </template>
        </Draggable>
      </div>
    </div>

    <!-- Assigned Staff -->
    <div class="list">
      <h5>Assigned to Profile</h5>
      <input
        v-model="assignedSearch"
        type="text"
        class="list-search"
        placeholder="Search assigned staff..."
      />
      <div v-if="assignedStaff.length === 0" class="scroll-wrapper">
        <Draggable
          v-model="localAssigned"
          v-bind="dragOptions"
          item-key="id"
          class="draggable-area empty-dropzone"
          :empty-insert-threshold="0"
        >
          <template #item="{ element }">
            <div class="staff-item">{{ element.firstName }} {{ element.lastName }}</div>
          </template>
        </Draggable>
      </div>
      <div v-else class="scroll-wrapper">
        <div v-if="visibleAssignedCount === 0" class="text-muted p-2">No matches found</div>
        <Draggable
          v-model="localAssigned"
          v-bind="dragOptions"
          item-key="id"
          class="draggable-area"
          :empty-insert-threshold="0"
        >
          <template #item="{ element }">
            <div
              v-show="matchesStaff(element, assignedSearch)"
              class="staff-item"
            >
              {{ element.firstName }} {{ element.lastName }}
            </div>
          </template>
        </Draggable>
      </div>
    </div>
  </div>
</template>

<style scoped>
.lists {
  display: flex;
  gap: 24px;
  margin-bottom: 20px;
}

.list {
  flex: 1;
  min-width: 250px;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.list h5 {
  margin-bottom: 12px;
  font-size: 14px;
  font-weight: 600;
}

.list-search {
  width: 100%;
  margin-bottom: 10px;
  padding: 8px 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 13px;
}

.list-search:focus {
  outline: none;
  border-color: #888;
  box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.08);
}

.scroll-wrapper {
  max-height: 300px;
  overflow-y: auto;
  padding-right: 4px;
  min-height: 60px;
}

.scroll-wrapper::-webkit-scrollbar {
  width: 8px;
}

.scroll-wrapper::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.scroll-wrapper::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

.scroll-wrapper::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.draggable-area {
  min-height: 100%;
  display: flex;
  flex-direction: column;
  gap: 0;
}

.empty-dropzone {
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px dashed #ddd;
  border-radius: 4px;
  background-color: #fafafa;
}

.staff-item {
  padding: 10px;
  margin-bottom: 6px;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 6px;
  cursor: grab;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.staff-item:hover {
  border-color: #999;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.staff-item:active {
  cursor: grabbing;
}

.ghost {
  opacity: 0.4;
  background: #e3f2fd;
}
</style>
