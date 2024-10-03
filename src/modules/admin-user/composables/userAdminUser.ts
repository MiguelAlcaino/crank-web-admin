import type { ApiService } from '@/services/apiService'
import { computed, onMounted, reactive, readonly, ref } from 'vue'
import type { AdminUser, Instructor } from '../interfaces'
import { SiteEnum } from '@/modules/shared/interfaces'
import { Role } from '@/utils/userRoles'
import useVuelidate from '@vuelidate/core'
import { email, helpers, required } from '@vuelidate/validators'
import type { Site } from '@/modules/shared/interfaces/site'

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

  const roleOptions = [
    { label: 'Super Admin', value: Role.ROLE_SUPER_ADMIN },
    { label: 'Staff', value: Role.ROLE_STAFF },
    { label: 'Instructor', value: Role.ROLE_INSTRUCTOR }
  ]

  const formData = reactive({
    //adminUserId: 0,
    username: '',
    email: '',
    rol: null as Role | null,
    linkedInstructorIds: [],
    linkedSiteCodes: []
  })

  const rules = computed(() => {
    return {
      username: {
        required: helpers.withMessage('Username is required', required)
      },
      email: {
        required: helpers.withMessage('Username is required', required),
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
      adminUsers.value = [
        {
          email: 'username1@mail.com',
          id: '1',
          linkedInstructors: [
            { id: '1', name: 'Instructor 1', site: { code: SiteEnum.Dubai, name: 'Dubai' } }
          ],
          linkedSites: [{ name: 'Dubai', code: SiteEnum.Dubai }],
          roles: [Role.ROLE_SUPER_ADMIN],
          username: 'username1'
        }
      ] // await apiService.getAdminUsers()
    } catch (error) {
      hasError.value = true
    } finally {
      isLoading.value = false
    }
  }

  const openModal = (data: AdminUser | null) => {
    //giftCard = data

    //v$.value.$reset()
    //formData.grandTotal = giftCard.grandTotal

    getAvailableSites()
    getAvailableInstructors()

    modalIsVisible.value = true
  }

  const closeModal = () => {
    //giftCard = null
    modalIsVisible.value = false
  }

  const submitForm = async () => {}

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
    adminUsers: readonly(adminUsers),
    modalIsVisible: readonly(modalIsVisible),
    isSaving: readonly(isSaving),
    instructors: readonly(instructors),
    loadingInstructors: readonly(loadingInstructors),
    loadingSites: readonly(loadingSites),
    hasError: hasError,
    v$,
    formData,

    // Methods
    openModal,
    closeModal,
    submitForm
  }
}
