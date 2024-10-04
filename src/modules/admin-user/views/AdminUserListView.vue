<script setup lang="ts">
import type { ApiService } from '@/services/apiService'
import { useAdminUser } from '../composables/userAdminUser'
import { inject } from 'vue'

import CrankCircularProgressIndicator from '@/modules/shared/components/CrankCircularProgressIndicator.vue'
import ModalComponent from '@/modules/shared/components/ModalComponent.vue'
import AdminUserCreate from '../components/AdminUserCreate.vue'
import AdminUserEdit from '../components/AdminUserEdit.vue'

import { ERROR_UNKNOWN } from '@/utils/errorMessages'
import ResetPassword from '../components/ResetPassword.vue'

const { isLoading, hasError, adminUsers } = useAdminUser(inject<ApiService>('gqlApiService')!)
</script>

<template>
  <div class="row">
    <div class="col-6">
      <h4>Users List</h4>
    </div>
    <div class="col-6 pull-right">
      <AdminUserCreate></AdminUserCreate>
    </div>
  </div>
  <div class="row">
    <div class="col-12">
      <hr />
    </div>
  </div>

  <div class="row">
    <div class="col-12">
      <div class="table-responsive">
        <table class="table table-sm table-hover">
          <thead>
            <tr class="text-center">
              <th>USERNAME</th>
              <th>EMAIL</th>
              <th>SITES</th>
              <th>ROLES</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in adminUsers" :key="index">
              <td>{{ item.username }}</td>
              <td>{{ item.email }}</td>
              <td>
                <ul class="no-bullets">
                  <li v-for="site in item.linkedSites" :key="site.code">{{ site.name }}</li>
                </ul>
              </td>
              <td class="text-center">
                <ul class="no-bullets">
                  <li v-for="role in item.roles" :key="role">{{ role }}</li>
                </ul>
              </td>
              <td class="d-flex align-items-center justify-content-center">
                <div class="mr-2">
                  <AdminUserEdit :admin-user="item"></AdminUserEdit>
                </div>
                <ResetPassword :admin-user="item"></ResetPassword>
              </td>
            </tr>
            <tr v-if="adminUsers.length === 0 && !isLoading">
              <td colspan="5" class="text-center align-middle">
                <p>NO DATA AVAILABLE IN TABLE</p>
              </td>
            </tr>
            <tr v-if="isLoading">
              <td colspan="5" class="text-center">
                <CrankCircularProgressIndicator text="LOADING..."></CrankCircularProgressIndicator>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <!-- Error Modal -->
  <ModalComponent
    v-if="hasError"
    title="Error"
    :message="ERROR_UNKNOWN"
    :cancel-text="null"
    @on-ok="hasError = false"
  >
  </ModalComponent>
</template>

<style scoped>
.no-bullets {
  list-style-type: none;
  padding-left: 0;
}

.pull-right {
  display: flex;
  justify-content: flex-end;
}
</style>
