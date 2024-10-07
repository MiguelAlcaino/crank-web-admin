<template>
  <div class="unauthorized">
    <h1>Access Denied</h1>
    <p>You do not have permission to access this page.</p>
    <a @click="$router.go(-1)" class="stretched-link" style="cursor: pointer;">Go back</a>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.unauthorized {
  text-align: center;
  margin-top: 50px;
}
</style>
