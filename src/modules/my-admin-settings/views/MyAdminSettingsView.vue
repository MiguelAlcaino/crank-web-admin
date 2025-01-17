<script setup lang="ts">
import ChangeMyAdminPassword from '../components/ChangeMyAdminPassword.vue'
import FavoriteSite from '../components/FavoriteSite.vue'
</script>

<template>
  <div>
    <h1>My Settings</h1>

    <div class="row mb-3">
      <div class="col-12">
        <ChangeMyAdminPassword />
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-12">
        <FavoriteSite />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
