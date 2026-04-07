<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()
const pageName = computed(() => {
  const name = route.meta.title as string | undefined
  return name || route.name?.toString() || 'Page'
})
</script>

<template>
  <div class="text-center py-5">
    <h4 class="text-muted">{{ pageName }}</h4>
    <p class="text-muted">This page is being migrated. Coming soon.</p>
  </div>
</template>
