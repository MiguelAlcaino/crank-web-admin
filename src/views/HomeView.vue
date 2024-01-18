<script setup lang="ts"></script>

<template>
  <main>
    <h1>Admin Panel</h1>
    <h5>Menu</h5>

    <RouterLink key="/admin/calendar-class" to="/admin/calendar-class"> Admin Class</RouterLink>
    <br />
    <RouterLink key="/admin/calendar-class" to="/admin/room-layout/list">
      Admin Room Layout</RouterLink
    >
    <br />
    <RouterLink key="/user/create" to="/user/create"> Create User</RouterLink>
    <br />
  </main>
</template>
