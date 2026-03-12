<script setup lang="ts">
type BadgeItem = Record<string, unknown>

const props = withDefaults(
  defineProps<{
    items?: BadgeItem[] | null
    getLabel: (item: BadgeItem) => string
    getKey?: (item: BadgeItem, index: number) => string | number
    emptyText?: string
    centered?: boolean
  }>(),
  {
    items: () => [],
    getKey: undefined,
    emptyText: '-',
    centered: true
  }
)

const resolveKey = (item: BadgeItem, index: number) => {
  if (props.getKey) {
    return props.getKey(item, index)
  }

  const id = item.id
  return typeof id === 'string' || typeof id === 'number' ? id : index
}
</script>

<template>
  <div
    v-if="items && items.length > 0"
    :class="['badge-list', { 'badge-list-centered': centered }]"
  >
    <span v-for="(item, index) in items" :key="resolveKey(item, index)" class="badge-list-item">
      {{ getLabel(item) }}
    </span>
  </div>
  <span v-else>{{ emptyText }}</span>
</template>

<style scoped>
.badge-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.badge-list-centered {
  justify-content: center;
}

.badge-list-item {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.5rem;
  border-radius: 999px;
  border: 1px solid #dee2e6;
  background-color: #f8f9fa;
  font-size: 0.75rem;
  line-height: 1.2;
  white-space: nowrap;
}
</style>
