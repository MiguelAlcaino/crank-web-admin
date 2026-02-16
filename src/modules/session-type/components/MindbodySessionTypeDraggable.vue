<script setup lang="ts">
import type { MindbodySessionType } from '@/modules/session-type/interfaces'
import { computed } from 'vue'
import Draggable from 'vuedraggable'

const props = defineProps<{
  availableSessionTypes: MindbodySessionType[]
  assignedSessionTypes: MindbodySessionType[]
  isLoading?: boolean
}>()

const emit = defineEmits<{
  'update:assignedSessionTypes': [value: MindbodySessionType[]]
}>()

const localAvailable = computed({
  get: () => props.availableSessionTypes,
  set: () => {}
})

const localAssigned = computed({
  get: () => props.assignedSessionTypes,
  set: (value) => emit('update:assignedSessionTypes', value)
})

const dragOptions = {
  animation: 200,
  group: 'session-types',
  disabled: false,
  ghostClass: 'ghost'
}
</script>

<template>
  <div class="lists">
    <div class="list">
      <h5>Available Mindbody Session Types</h5>
      <div v-if="isLoading" class="text-center p-3">
        <span class="spinner-border spinner-border-sm"></span> Loading...
      </div>
      <div v-else-if="availableSessionTypes.length === 0" class="text-muted p-3">
        No available session types
      </div>
      <div v-else class="scroll-wrapper">
        <Draggable
          v-model="localAvailable"
          v-bind="dragOptions"
          item-key="id"
          class="draggable-area"
          :empty-insert-threshold="0"
        >
          <template #item="{ element }">
            <div class="session-type-item">
              {{ element.name }}
            </div>
          </template>
        </Draggable>
      </div>
    </div>

    <div class="list">
      <h5>Assigned to Session Type</h5>
      <div v-if="assignedSessionTypes.length === 0" class="scroll-wrapper">
        <Draggable
          v-model="localAssigned"
          v-bind="dragOptions"
          item-key="id"
          class="draggable-area empty-dropzone"
          :empty-insert-threshold="0"
        >
          <template #item="{ element }">
            <div class="session-type-item">
              {{ element.name }}
            </div>
          </template>
        </Draggable>
      </div>
      <div v-else class="scroll-wrapper">
        <Draggable
          v-model="localAssigned"
          v-bind="dragOptions"
          item-key="id"
          class="draggable-area"
          :empty-insert-threshold="0"
        >
          <template #item="{ element }">
            <div class="session-type-item">
              {{ element.name }}
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

.scroll-wrapper {
  max-height: 300px;
  overflow-y: auto;
  padding-right: 4px;
  min-height: 60px;
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

.session-type-item {
  padding: 10px;
  margin-bottom: 6px;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 6px;
  cursor: grab;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.session-type-item:active {
  cursor: grabbing;
}

.ghost {
  opacity: 0.4;
  background: #e3f2fd;
}
</style>
