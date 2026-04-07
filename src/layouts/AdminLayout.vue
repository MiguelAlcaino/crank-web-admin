<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { authService } from '@/services/authService'
import { Role } from '@/utils/userRoles'
import type { AdminSite } from '@/modules/shared/interfaces/auth-user'
import AdminToast from '@/modules/shared/components/AdminToast.vue'

const route = useRoute()

const user = computed(() => authService.getUser())
const sites = computed<AdminSite[]>(() => authService.getAvailableSites())

function hasRole(role: Role): boolean {
  return authService.userHasRole(role)
}

function isSuperAdmin(): boolean {
  return hasRole(Role.ROLE_SUPER_ADMIN)
}

function isStaffOrAbove(): boolean {
  return hasRole(Role.ROLE_STAFF) || hasRole(Role.ROLE_SUPER_ADMIN)
}

function isInstructor(): boolean {
  return hasRole(Role.ROLE_INSTRUCTOR)
}

function isActive(routeName: string): boolean {
  return route.name === routeName
}

function isActiveWithParam(routeName: string, paramKey: string, paramValue: string): boolean {
  return route.name === routeName && route.params[paramKey] === paramValue
}

async function logout() {
  await authService.logout()
}
</script>

<template>
  <div class="container-fluid">
    <div class="row">
      <nav
        style="font-size: 14px"
        class="col-sm-3 col-md-2 d-none d-sm-block bg-light sidebar"
      >
        <ul class="nav nav-pills flex-column">
          <!-- Transactions (SUPER_ADMIN) -->
          <li v-if="isSuperAdmin()" class="nav-item">
            <RouterLink
              class="nav-link"
              :class="{ active: isActive('admin_transactions') }"
              :to="{ name: 'admin_transactions' }"
            >
              Transactions
            </RouterLink>
          </li>

          <!-- Packages dropdown (SUPER_ADMIN) -->
          <li v-if="isSuperAdmin()" class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              :class="{ active: route.name === 'admin_class_packages' }"
              data-toggle="dropdown"
              href="#"
              role="button"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Packages
              <template v-for="site in sites" :key="site.serviceKey">
                <span v-if="isActiveWithParam('admin_class_packages', 'site', site.serviceKey)">
                  {{ site.name }}
                </span>
              </template>
            </a>
            <div class="dropdown-menu">
              <RouterLink
                v-for="site in sites"
                :key="site.serviceKey"
                class="dropdown-item"
                :to="{ name: 'admin_class_packages', params: { site: site.serviceKey } }"
              >
                Packages {{ site.name }}
              </RouterLink>
            </div>
          </li>

          <!-- Pending Gift Cards (SUPER_ADMIN) -->
          <li v-if="isSuperAdmin()" class="nav-item">
            <RouterLink
              class="nav-link"
              :class="{ active: isActive('admin_customer_gift_cards') }"
              :to="{ name: 'admin_customer_gift_cards' }"
            >
              Pending Gift Cards
            </RouterLink>
          </li>

          <!-- Gift Card (SUPER_ADMIN) -->
          <li v-if="isSuperAdmin()" class="nav-item">
            <RouterLink
              class="nav-link"
              :class="{ active: isActive('admin_gift_cards') }"
              :to="{ name: 'admin_gift_cards' }"
            >
              Gift Card
            </RouterLink>
          </li>

          <!-- Payment Link (SUPER_ADMIN) -->
          <li v-if="isSuperAdmin()" class="nav-item">
            <RouterLink
              class="nav-link"
              :class="{ active: isActive('admin_payment_links') }"
              :to="{ name: 'admin_payment_links' }"
            >
              Payment link
            </RouterLink>
          </li>

          <!-- Webhook Events (SUPER_ADMIN) -->
          <li v-if="isSuperAdmin()" class="nav-item">
            <RouterLink
              class="nav-link"
              :class="{ active: isActive('admin_webhook_events') }"
              :to="{ name: 'admin_webhook_events' }"
            >
              Webhook Events
            </RouterLink>
          </li>

          <!-- Clients (STAFF or above) -->
          <li v-if="isStaffOrAbove()" class="nav-item">
            <RouterLink
              class="nav-link"
              :class="{ active: isActive('admin_customers') }"
              :to="{ name: 'admin_customers' }"
            >
              Clients
            </RouterLink>
          </li>

          <!-- Report - MB Clients (SUPER_ADMIN) -->
          <li v-if="isSuperAdmin()" class="nav-item">
            <RouterLink
              class="nav-link"
              :class="{ active: isActive('admin_mindbody_clients') }"
              :to="{ name: 'admin_mindbody_clients' }"
            >
              Report- MB clients
            </RouterLink>
          </li>

          <!-- Class Schedule Config dropdown (SUPER_ADMIN) -->
          <li v-if="isSuperAdmin()" class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              :class="{ active: route.name === 'admin_class_schedule_config' }"
              data-toggle="dropdown"
              href="#"
              role="button"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Class Schedule Config
              <template v-for="site in sites" :key="site.serviceKey">
                <span v-if="isActiveWithParam('admin_class_schedule_config', 'site', site.serviceKey)">
                  {{ site.name }}
                </span>
              </template>
            </a>
            <div class="dropdown-menu">
              <RouterLink
                v-for="site in sites"
                :key="site.serviceKey"
                class="dropdown-item"
                :to="{ name: 'admin_class_schedule_config', params: { site: site.serviceKey } }"
              >
                Class Schedule Config {{ site.name }}
              </RouterLink>
            </div>
          </li>

          <!-- Session Types (SUPER_ADMIN) -->
          <li v-if="isSuperAdmin()" class="nav-item">
            <RouterLink
              class="nav-link"
              :class="{ active: isActive('admin_session_types') }"
              :to="{ name: 'admin_session_types' }"
            >
              Session Types
            </RouterLink>
          </li>

          <!-- Instructor Profiles (SUPER_ADMIN) -->
          <li v-if="isSuperAdmin()" class="nav-item">
            <RouterLink
              class="nav-link"
              :class="{ active: isActive('admin_instructor_profiles') }"
              :to="{ name: 'admin_instructor_profiles' }"
            >
              Instructor Profiles
            </RouterLink>
          </li>

          <!-- Class Schedule (INSTRUCTOR with site access) -->
          <li v-if="isInstructor()" class="nav-item">
            <RouterLink
              class="nav-link"
              :class="{ active: isActive('admin_classes_calendar') }"
              :to="{ name: 'admin_classes_calendar', params: { site: 'dubai' } }"
            >
              Class Schedule
            </RouterLink>
          </li>

          <!-- Room Layout Config dropdown (SUPER_ADMIN) -->
          <li v-if="isSuperAdmin()" class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              :class="{ active: route.name === 'admin_room_layout_list' }"
              data-toggle="dropdown"
              href="#"
              role="button"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Room Layout Config
              <template v-for="site in sites" :key="site.serviceKey">
                <span v-if="isActiveWithParam('admin_room_layout_list', 'site', site.serviceKey)">
                  {{ site.name }}
                </span>
              </template>
            </a>
            <div class="dropdown-menu">
              <RouterLink
                v-for="site in sites"
                :key="site.serviceKey"
                class="dropdown-item"
                :to="{ name: 'admin_room_layout_list', params: { site: site.serviceKey } }"
              >
                Room Layout Config {{ site.name }}
              </RouterLink>
            </div>
          </li>

          <!-- Mindbody Staff (SUPER_ADMIN) -->
          <li v-if="isSuperAdmin()" class="nav-item">
            <RouterLink
              class="nav-link"
              :class="{ active: isActive('admin_mindbody_staff') }"
              :to="{ name: 'admin_mindbody_staff' }"
            >
              Staff
            </RouterLink>
          </li>

          <!-- Settings (SUPER_ADMIN) -->
          <li v-if="isSuperAdmin()" class="nav-item">
            <RouterLink
              class="nav-link"
              :class="{ active: isActive('admin_settings') }"
              :to="{ name: 'admin_settings' }"
            >
              Settings
            </RouterLink>
          </li>

          <!-- Blacklisted phones (STAFF or above) -->
          <li v-if="isStaffOrAbove()" class="nav-item">
            <RouterLink
              class="nav-link"
              :class="{ active: isActive('admin_blacklisted_phones') }"
              :to="{ name: 'admin_blacklisted_phones' }"
            >
              Blacklisted phones
            </RouterLink>
          </li>

          <!-- Admins (SUPER_ADMIN) -->
          <li v-if="isSuperAdmin()" class="nav-item">
            <RouterLink
              class="nav-link"
              :class="{ active: isActive('admin_users') }"
              :to="{ name: 'admin_users' }"
            >
              Admins
            </RouterLink>
          </li>

          <!-- My Settings (any admin) -->
          <li class="nav-item">
            <RouterLink
              class="nav-link"
              :class="{ active: isActive('admin_my_settings') }"
              :to="{ name: 'admin_my_settings' }"
            >
              My Settings
            </RouterLink>
          </li>

          <!-- Logout -->
          <li class="nav-item">
            <a class="nav-link" href="#" @click.prevent="logout">Logout</a>
          </li>
        </ul>
      </nav>

      <main role="main" class="col-sm-9 ml-sm-auto col-md-10 pt-3">
        <AdminToast />
        <RouterView />
      </main>
    </div>
  </div>
</template>

<style scoped>
.sidebar {
  padding-top: 10px;
  min-height: calc(100vh - 20px);
}

.sidebar .nav-link {
  color: #333;
}

.sidebar .nav-link.active {
  background-color: #007bff;
  color: #fff;
}

.sidebar .nav-link:hover:not(.active) {
  background-color: #e9ecef;
}

.dropdown-menu {
  position: static;
  float: none;
  border: none;
  box-shadow: none;
  padding-left: 1rem;
}

.dropdown-item {
  font-size: 13px;
}
</style>
