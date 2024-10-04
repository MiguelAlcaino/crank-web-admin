import type { ApiService } from '@/services/apiService'
import { computed, onMounted, reactive, readonly, ref } from 'vue'
import type { AdminUser, Instructor } from '../interfaces'
import { Role } from '@/utils/userRoles'
import useVuelidate from '@vuelidate/core'
import { email, helpers, required } from '@vuelidate/validators'
import type { Site } from '@/modules/shared/interfaces/site'

const selectedAdminUser = ref<AdminUser | null>(null)

export const useAdminUser = (apiService: ApiService) => {
  const hasError = ref<boolean>(false)
  const isLoading = ref<boolean>(false)
  const adminUsers = ref<AdminUser[]>([])
  const modalIsVisible = ref<boolean>(false)
  const isSaving = ref<boolean>(false)

  const instructors = ref<Instructor[]>([])
  const loadingInstructors = ref<boolean>(false)
  const availableSites = ref<Site[]>([])
  const loadingSites = ref<boolean>(false)
  const instructorsControlIsVisible = ref<boolean>(false)

  const roleOptions = [
    { label: 'Super Admin', value: Role.ROLE_SUPER_ADMIN },
    { label: 'Staff', value: Role.ROLE_STAFF },
    { label: 'Instructor', value: Role.ROLE_INSTRUCTOR }
  ]

  const formData = reactive({
    //adminUserId: 0,
    username: '',
    email: '',
    rol: null as string | null,
    linkedInstructorIds: [] as string[],
    linkedSiteCodes: [] as string[]
  })

  const selectedInstructors = computed({
    get() {
      return formData.linkedInstructorIds
        .map((id) => instructors.value.find((instructor) => instructor.id === id))
        .filter((instructor): instructor is Instructor => instructor !== undefined)
    },
    set(selected) {
      formData.linkedInstructorIds = selected.map((instructor) => instructor.id)
    }
  })

  const selectedSites = computed({
    get() {
      return formData.linkedSiteCodes
        .map((code) => availableSites.value.find((site) => site.code === code))
        .filter((site): site is Site => site !== undefined)
    },
    set(selected) {
      formData.linkedSiteCodes = selected.map((site) => site.code)
    }
  })

  const rules = computed(() => {
    return {
      username: {
        required: helpers.withMessage('Username is required', required)
      },
      email: {
        required: helpers.withMessage('Email is required', required),
        email: helpers.withMessage('The email address is not valid', email)
      },
      rol: {
        required: helpers.withMessage('Rol is required', required)
      },
      linkedInstructorIds: {},
      linkedSiteCodes: {}
    }
  })

  const v$ = useVuelidate(rules, formData, { $scope: false })

  onMounted(() => {
    getAdminUsers()
  })

  async function getAdminUsers() {
    hasError.value = false
    isLoading.value = true

    adminUsers.value = []

    try {
      adminUsers.value = (await apiService.getAdminUsers()) as AdminUser[]
    } catch (error) {
      hasError.value = true
    } finally {
      isLoading.value = false
    }
  }

  const openModal = (data: AdminUser | null) => {
    formData.email = ''
    formData.username = ''
    formData.rol = null
    formData.linkedInstructorIds = []
    formData.linkedSiteCodes = []
    selectedInstructors.value = []
    selectedSites.value = []

    instructorsControlIsVisible.value = false
    selectedAdminUser.value = data

    v$.value.$reset()

    if (data) {
      let role = null as string | null

      if (data.roles) {
        if (data.roles.includes(Role.ROLE_SUPER_ADMIN)) {
          role = Role.ROLE_SUPER_ADMIN
        } else if (data.roles.includes(Role.ROLE_STAFF)) {
          role = Role.ROLE_STAFF
        } else if (data.roles.includes(Role.ROLE_INSTRUCTOR)) {
          role = Role.ROLE_INSTRUCTOR
          instructorsControlIsVisible.value = true
        }
      }

      formData.email = data.email
      formData.username = data.username
      formData.rol = role
      formData.linkedInstructorIds = data.linkedInstructors
        ? data.linkedInstructors.map((i) => i.id)
        : []
      formData.linkedSiteCodes = data.linkedSites ? data.linkedSites.map((s) => s.code) : []
    }

    getAvailableSites()
    getAvailableInstructors()

    modalIsVisible.value = true
  }

  const closeModal = () => {
    selectedAdminUser.value = null
    modalIsVisible.value = false
  }

  const submitForm = async () => {
    const isValid = await v$.value.$validate()

    console.log('formData', formData)

    if (isValid) {
      console.log('isValid', isValid)
    }
  }

  const onChangeRole = () => {
    formData.linkedInstructorIds = []
    instructorsControlIsVisible.value = formData.rol === Role.ROLE_INSTRUCTOR
  }

  async function getAvailableInstructors(): Promise<void> {
    instructors.value = []
    loadingInstructors.value = true

    try {
      instructors.value = await apiService.getAvailableInstructors()
    } catch (error) {
      // ignore
    } finally {
      loadingInstructors.value = false
    }
  }

  async function getAvailableSites(): Promise<void> {
    availableSites.value = []
    loadingSites.value = true
    try {
      availableSites.value = await apiService.getAvailableSites()
    } catch (error) {
      // ignore
    } finally {
      loadingSites.value = false
    }
  }

  return {
    roleOptions,

    // Properties
    availableSites: readonly(availableSites),
    isLoading: readonly(isLoading),
    adminUsers: adminUsers,
    modalIsVisible: readonly(modalIsVisible),
    isSaving: readonly(isSaving),
    instructors: readonly(instructors),
    loadingInstructors: readonly(loadingInstructors),
    loadingSites: readonly(loadingSites),
    selectedAdminUser: readonly(selectedAdminUser),
    instructorsControlIsVisible: readonly(instructorsControlIsVisible),
    hasError: hasError,
    v$,
    formData,
    selectedInstructors,
    selectedSites,

    // Methods
    openModal,
    closeModal,
    submitForm,
    onChangeRole
  }
}
