<script setup lang="ts">
defineProps<{
  text?: string
}>()
</script>

<template>
  <div class="spinner-border crankSpinner" role="status">
    <span class="sr-only">Loading...</span>
  </div>
  <p v-if="text">
    <strong>{{ text }}</strong>
  </p>
</template>

<style scoped>
.crankSpinner {
  color: #ff6f60;
}

span {
  font-family: 'Avenir', sans-serif !important;
}
</style>
