<script setup lang="ts">
defineProps<{
  text?: string
}>()
</script>

<template>
  <div class="spinner-border crankSpiner" role="status">
    <span class="sr-only">Loading...</span>
  </div>
  <p v-if="text">
    <strong>{{ text }}</strong>
  </p>
</template>

<style scoped>
.crankSpiner {
  color: #ff6f60;
}

span {
  font-family: 'Avenir', sans-serif !important;
}
</style>
