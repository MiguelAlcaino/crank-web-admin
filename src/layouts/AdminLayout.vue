<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { authService } from '@/services/authService'
import { newAuthenticatedApolloClient } from '@/services/graphqlClient'
import { Role } from '@/utils/userRoles'
import { useAvailableSites } from '@/modules/shared/composables/useAvailableSites'
import AdminToast from '@/modules/shared/components/AdminToast.vue'
import { useThemeStore } from '@/stores/themeStore'

const route = useRoute()
const themeStore = useThemeStore()
const gqlUrl = import.meta.env.VITE_CRANK_GRAPHQL_SERVER_URL
const apolloClient = newAuthenticatedApolloClient(gqlUrl)
const { sites: availableSites, fetchSites } = useAvailableSites(apolloClient)

const user = computed(() => authService.getUser())
const sites = computed(() =>
  availableSites.value.map((s) => ({ serviceKey: s.code, name: s.name }))
)

onMounted(fetchSites)

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

const openDropdown = ref<string | null>(null)

function toggleDropdown(name: string) {
  openDropdown.value = openDropdown.value === name ? null : name
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
        class="col-sm-3 col-md-2 d-none d-sm-block sidebar"
      >
        <ul class="nav nav-pills flex-column">
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

          <!-- Class Schedule dropdown (STAFF or above) -->
          <li v-if="isStaffOrAbove()" class="nav-item">
            <a
              class="nav-link dropdown-toggle"
              :class="{ active: route.name === 'admin_classes_calendar' }"
              href="#"
              @click.prevent="toggleDropdown('classSchedule')"
            >
              Class Schedule
              <template v-for="site in sites" :key="site.serviceKey">
                <span v-if="isActiveWithParam('admin_classes_calendar', 'site', site.serviceKey)">
                  {{ site.name }}
                </span>
              </template>
            </a>
            <div v-show="openDropdown === 'classSchedule'" class="dropdown-menu show">
              <RouterLink
                v-for="site in sites"
                :key="site.serviceKey"
                class="dropdown-item"
                :to="{ name: 'admin_classes_calendar', params: { site: site.serviceKey } }"
              >
                Class Schedule {{ site.name }}
              </RouterLink>
            </div>
          </li>

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

          <!-- Class Schedule Config dropdown (SUPER_ADMIN) -->
          <li v-if="isSuperAdmin()" class="nav-item">
            <a
              class="nav-link dropdown-toggle"
              :class="{ active: route.name === 'admin_class_schedule_config' }"
              href="#"
              @click.prevent="toggleDropdown('classScheduleConfig')"
            >
              Class Schedule Config
              <template v-for="site in sites" :key="site.serviceKey">
                <span v-if="isActiveWithParam('admin_class_schedule_config', 'site', site.serviceKey)">
                  {{ site.name }}
                </span>
              </template>
            </a>
            <div v-show="openDropdown === 'classScheduleConfig'" class="dropdown-menu show">
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

          <!-- Room Layout Config dropdown (SUPER_ADMIN) -->
          <li v-if="isSuperAdmin()" class="nav-item">
            <a
              class="nav-link dropdown-toggle"
              :class="{ active: route.name === 'admin_room_layout_list' }"
              href="#"
              @click.prevent="toggleDropdown('roomLayout')"
            >
              Room Layout Config
              <template v-for="site in sites" :key="site.serviceKey">
                <span v-if="isActiveWithParam('admin_room_layout_list', 'site', site.serviceKey)">
                  {{ site.name }}
                </span>
              </template>
            </a>
            <div v-show="openDropdown === 'roomLayout'" class="dropdown-menu show">
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

          <!-- Packages dropdown (SUPER_ADMIN) -->
          <li v-if="isSuperAdmin()" class="nav-item">
            <a
              class="nav-link dropdown-toggle"
              :class="{ active: route.name === 'admin_class_packages' }"
              href="#"
              @click.prevent="toggleDropdown('packages')"
            >
              Packages
              <template v-for="site in sites" :key="site.serviceKey">
                <span v-if="isActiveWithParam('admin_class_packages', 'site', site.serviceKey)">
                  {{ site.name }}
                </span>
              </template>
            </a>
            <div v-show="openDropdown === 'packages'" class="dropdown-menu show">
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

          <!-- Report - MB Clients (SUPER_ADMIN) -->
          <li v-if="isSuperAdmin()" class="nav-item">
            <RouterLink
              class="nav-link"
              :class="{ active: isActive('admin_mindbody_clients') }"
              :to="{ name: 'admin_mindbody_clients' }"
            >
              Report - MB Clients
            </RouterLink>
          </li>

          <!-- Dark mode toggle -->
          <li class="nav-item">
            <a class="nav-link" href="#" @click.prevent="themeStore.toggleTheme()">
              <i :class="themeStore.isDark ? 'bi bi-sun-fill' : 'bi bi-moon-stars-fill'"></i>
              {{ themeStore.isDark ? 'Light Mode' : 'Dark Mode' }}
            </a>
          </li>

          <!-- Logout -->
          <li class="nav-item">
            <a class="nav-link" href="#" @click.prevent="logout">Logout</a>
          </li>
        </ul>
      </nav>

      <main role="main" class="col-sm-9 ms-sm-auto col-md-10 pt-3">
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
  background-color: var(--bs-tertiary-bg);
  border-right: 1px solid var(--bs-border-color);
}

.sidebar .nav-link {
  color: var(--bs-body-color);
}

.sidebar .nav-link.active {
  background-color: var(--bs-emphasis-color);
  color: var(--bs-body-bg);
}

.sidebar .nav-link:hover:not(.active) {
  background-color: var(--bs-secondary-bg);
}

.dropdown-menu {
  position: static;
  float: none;
  border: none;
  box-shadow: none;
  padding-left: 1rem;
  background-color: transparent;
}

.dropdown-item {
  font-size: 13px;
  color: var(--bs-body-color);
}

.dropdown-item:hover {
  background-color: var(--bs-tertiary-bg);
  color: var(--bs-body-color);
}
</style>
