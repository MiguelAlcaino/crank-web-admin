<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
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

const sidebarCollapsed = ref(false)

watch(
  () => route.name,
  (name) => {
    if (name === 'admin_classes_calendar') {
      sidebarCollapsed.value = true
    } else {
      sidebarCollapsed.value = false
    }
  },
  { immediate: true }
)

function toggleSidebar() {
  sidebarCollapsed.value = !sidebarCollapsed.value
}

async function logout() {
  await authService.logout()
}
</script>

<template>
  <div class="container-fluid">
    <div class="layout-row">
      <nav
        style="font-size: 14px"
        class="sidebar d-none d-sm-block"
        :class="{ collapsed: sidebarCollapsed }"
      >
        <ul class="nav nav-pills flex-column">
          <!-- Toggle button -->
          <li class="nav-item">
            <button class="sidebar-toggle nav-link" @click="toggleSidebar">
              <i :class="sidebarCollapsed ? 'bi bi-chevron-right' : 'bi bi-chevron-left'"></i>
            </button>
          </li>

          <!-- Clients (STAFF or above) -->
          <li v-if="isStaffOrAbove() && !sidebarCollapsed" class="nav-item">
            <RouterLink
              class="nav-link"
              :class="{ active: isActive('admin_customers') }"
              :to="{ name: 'admin_customers' }"
            >
              Clients
            </RouterLink>
          </li>

          <!-- Class Schedule (STAFF or above) -->
          <li v-if="isStaffOrAbove() && !sidebarCollapsed" class="nav-item">
            <RouterLink
              class="nav-link"
              :class="{ active: isActive('admin_classes_calendar') }"
              :to="{ name: 'admin_classes_calendar' }"
            >
              Class Schedule
            </RouterLink>
          </li>

          <!-- Transactions (SUPER_ADMIN) -->
          <li v-if="isSuperAdmin() && !sidebarCollapsed" class="nav-item">
            <RouterLink
              class="nav-link"
              :class="{ active: isActive('admin_transactions') }"
              :to="{ name: 'admin_transactions' }"
            >
              Transactions
            </RouterLink>
          </li>

          <!-- Incomplete Feedbacks (SUPER_ADMIN) -->
          <li v-if="isSuperAdmin() && !sidebarCollapsed" class="nav-item">
            <RouterLink
              class="nav-link"
              :class="{ active: isActive('admin_incomplete_feedbacks') }"
              :to="{ name: 'admin_incomplete_feedbacks' }"
            >
              Incomplete Feedbacks
            </RouterLink>
          </li>

          <!-- Class Schedule Config dropdown (SUPER_ADMIN) -->
          <li v-if="isSuperAdmin() && !sidebarCollapsed" class="nav-item">
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
          <li v-if="isSuperAdmin() && !sidebarCollapsed" class="nav-item">
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
          <li v-if="isSuperAdmin() && !sidebarCollapsed" class="nav-item">
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
          <li v-if="isSuperAdmin() && !sidebarCollapsed" class="nav-item">
            <RouterLink
              class="nav-link"
              :class="{ active: isActive('admin_gift_cards') }"
              :to="{ name: 'admin_gift_cards' }"
            >
              Gift Card
            </RouterLink>
          </li>

          <!-- Pending Gift Cards (SUPER_ADMIN) -->
          <li v-if="isSuperAdmin() && !sidebarCollapsed" class="nav-item">
            <RouterLink
              class="nav-link"
              :class="{ active: isActive('admin_customer_gift_cards') }"
              :to="{ name: 'admin_customer_gift_cards' }"
            >
              Pending Gift Cards
            </RouterLink>
          </li>

          <!-- Payment Link (SUPER_ADMIN) -->
          <li v-if="isSuperAdmin() && !sidebarCollapsed" class="nav-item">
            <RouterLink
              class="nav-link"
              :class="{ active: isActive('admin_payment_links') }"
              :to="{ name: 'admin_payment_links' }"
            >
              Payment link
            </RouterLink>
          </li>

          <!-- Session Types (SUPER_ADMIN) -->
          <li v-if="isSuperAdmin() && !sidebarCollapsed" class="nav-item">
            <RouterLink
              class="nav-link"
              :class="{ active: isActive('admin_session_types') }"
              :to="{ name: 'admin_session_types' }"
            >
              Session Types
            </RouterLink>
          </li>

          <!-- Instructor Profiles (SUPER_ADMIN) -->
          <li v-if="isSuperAdmin() && !sidebarCollapsed" class="nav-item">
            <RouterLink
              class="nav-link"
              :class="{ active: isActive('admin_instructor_profiles') }"
              :to="{ name: 'admin_instructor_profiles' }"
            >
              Instructor Profiles
            </RouterLink>
          </li>

          <!-- Mindbody Staff (SUPER_ADMIN) -->
          <li v-if="isSuperAdmin() && !sidebarCollapsed" class="nav-item">
            <RouterLink
              class="nav-link"
              :class="{ active: isActive('admin_mindbody_staff') }"
              :to="{ name: 'admin_mindbody_staff' }"
            >
              Staff
            </RouterLink>
          </li>

          <!-- Webhook Events (SUPER_ADMIN) -->
          <li v-if="isSuperAdmin() && !sidebarCollapsed" class="nav-item">
            <RouterLink
              class="nav-link"
              :class="{ active: isActive('admin_webhook_events') }"
              :to="{ name: 'admin_webhook_events' }"
            >
              Webhook Events
            </RouterLink>
          </li>

          <!-- Admins (SUPER_ADMIN) -->
          <li v-if="isSuperAdmin() && !sidebarCollapsed" class="nav-item">
            <RouterLink
              class="nav-link"
              :class="{ active: isActive('admin_users') }"
              :to="{ name: 'admin_users' }"
            >
              Admins
            </RouterLink>
          </li>

          <!-- Settings (SUPER_ADMIN) -->
          <li v-if="isSuperAdmin() && !sidebarCollapsed" class="nav-item">
            <RouterLink
              class="nav-link"
              :class="{ active: isActive('admin_settings') }"
              :to="{ name: 'admin_settings' }"
            >
              Settings
            </RouterLink>
          </li>

          <!-- Send Notification (SUPER_ADMIN) -->
          <li v-if="isSuperAdmin() && !sidebarCollapsed" class="nav-item">
            <RouterLink
              class="nav-link"
              :class="{ active: isActive('admin_send_notification') }"
              :to="{ name: 'admin_send_notification' }"
            >
              Send Notification
            </RouterLink>
          </li>

          <!-- My Settings (any admin) -->
          <li v-if="!sidebarCollapsed" class="nav-item">
            <RouterLink
              class="nav-link"
              :class="{ active: isActive('admin_my_settings') }"
              :to="{ name: 'admin_my_settings' }"
            >
              My Settings
            </RouterLink>
          </li>

          <!-- Blacklisted phones (STAFF or above) -->
          <li v-if="isStaffOrAbove() && !sidebarCollapsed" class="nav-item">
            <RouterLink
              class="nav-link"
              :class="{ active: isActive('admin_blacklisted_phones') }"
              :to="{ name: 'admin_blacklisted_phones' }"
            >
              Blacklisted phones
            </RouterLink>
          </li>

          <!-- Report - MB Clients (SUPER_ADMIN) -->
          <li v-if="isSuperAdmin() && !sidebarCollapsed" class="nav-item">
            <RouterLink
              class="nav-link"
              :class="{ active: isActive('admin_mindbody_clients') }"
              :to="{ name: 'admin_mindbody_clients' }"
            >
              Report - MB Clients
            </RouterLink>
          </li>

          <!-- Dark mode toggle -->
          <li v-if="!sidebarCollapsed" class="nav-item">
            <a class="nav-link" href="#" @click.prevent="themeStore.toggleTheme()">
              <i :class="themeStore.isDark ? 'bi bi-sun-fill' : 'bi bi-moon-stars-fill'"></i>
              {{ themeStore.isDark ? 'Light Mode' : 'Dark Mode' }}
            </a>
          </li>

          <!-- Logout -->
          <li v-if="!sidebarCollapsed" class="nav-item">
            <a class="nav-link" href="#" @click.prevent="logout">Logout</a>
          </li>
        </ul>
      </nav>

      <main role="main" class="main-content pt-3">
        <AdminToast />
        <RouterView />
      </main>
    </div>
  </div>
</template>

<style scoped>
.layout-row {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  font-size: 14px;
  padding-top: 10px;
  background-color: var(--bs-tertiary-bg);
  border-right: 1px solid var(--bs-border-color);
  flex-shrink: 0;
  width: 260px;
  transition: width 0.2s ease;
  overflow: hidden;
}

.sidebar.collapsed {
  width: 48px;
}

.sidebar .nav-link {
  color: var(--bs-body-color);
  white-space: nowrap;
}

.sidebar .nav-link.active {
  background-color: var(--bs-emphasis-color);
  color: var(--bs-body-bg);
}

.sidebar .nav-link:hover:not(.active) {
  background-color: var(--bs-secondary-bg);
}

.sidebar-toggle {
  width: 100%;
  background: none;
  border: none;
  padding: 8px 12px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.sidebar.collapsed .sidebar-toggle {
  justify-content: center;
  padding: 8px;
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

.main-content {
  flex: 1;
  min-width: 0;
  padding-left: 1.5rem;
}
</style>
