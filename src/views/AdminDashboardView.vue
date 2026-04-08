<script setup lang="ts">
import { authService } from '@/services/authService'
import { Role } from '@/utils/userRoles'
import { computed } from 'vue'

const user = computed(() => authService.getUser())
const isSuperAdmin = computed(() => authService.userHasRole(Role.ROLE_SUPER_ADMIN))
</script>

<template>
  <div>
    <h4>Admin Dashboard</h4>
    <p class="text-muted">Welcome, {{ user?.username }}</p>

    <div class="row mt-4">
      <div class="col-md-4 mb-3">
        <RouterLink
          v-if="isSuperAdmin"
          :to="{ name: 'admin_transactions' }"
          class="card text-decoration-none"
        >
          <div class="card-body">
            <h6 class="card-title text-dark">Transactions</h6>
            <p class="card-text text-muted small">View and manage payment transactions</p>
          </div>
        </RouterLink>
      </div>
      <div class="col-md-4 mb-3">
        <RouterLink :to="{ name: 'admin_customers' }" class="card text-decoration-none">
          <div class="card-body">
            <h6 class="card-title text-dark">Clients</h6>
            <p class="card-text text-muted small">Manage customer accounts</p>
          </div>
        </RouterLink>
      </div>
      <div class="col-md-4 mb-3">
        <RouterLink
          v-if="isSuperAdmin"
          :to="{ name: 'admin_gift_cards' }"
          class="card text-decoration-none"
        >
          <div class="card-body">
            <h6 class="card-title text-dark">Gift Cards</h6>
            <p class="card-text text-muted small">Manage gift card products</p>
          </div>
        </RouterLink>
      </div>
    </div>
  </div>
</template>
