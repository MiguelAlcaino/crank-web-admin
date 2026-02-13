import type { InstructorProfile } from '@/modules/instructor-profile/interfaces/Instructor-profile'
import type { SiteEnum } from '@/modules/shared/interfaces'
import type { ApiService } from '@/services/apiService'
import { appStore } from '@/stores/appStorage'
import { readonly, ref } from 'vue'

const instructorProfiles = ref<InstructorProfile[]>([])

export const useInstructorProfiles = (apiService: ApiService) => {
  const hasLoadError = ref<boolean>(false)
  const hasError = ref<boolean>(false)
  const isLoading = ref<boolean>(false)
  const isSaving = ref<boolean>(false)

  const loadingSites = ref(false)

  async function getInstructorProfiles() {
    hasLoadError.value = false
    isLoading.value = true
    instructorProfiles.value = []

    try {
      instructorProfiles.value = (await apiService.getInstructorProfiles(
        appStore().site,
        null
      )) as InstructorProfile[]
    } catch (error) {
      hasLoadError.value = true
    } finally {
      isLoading.value = false
    }
  }

  async function createInstructorProfile(instructorProfileData: {
    site: SiteEnum
    name: string
    description?: string | null
    active?: boolean
    profilePictureFile?: File
    linkedMindbodyStaffs?: string[]
  }) {
    isSaving.value = true
    hasError.value = false

    try {
      const created = (await apiService.createInstructorProfile(
        instructorProfileData
      )) as InstructorProfile
      const newArr = instructorProfiles.value.slice()
      newArr.push(created)
      instructorProfiles.value = newArr
      return true
    } catch (error) {
      hasError.value = true
      throw error
    } finally {
      isSaving.value = false
    }
  }

  async function updateInstructorProfile(
    id: string,
    instructorProfileData: {
      name?: string
      description?: string | null
      active?: boolean
      profilePictureFile?: File
      linkedMindbodyStaffs?: string[]
    }
  ) {
    isSaving.value = true
    hasError.value = false

    try {
      const updated = (await apiService.updateInstructorProfile(
        id,
        instructorProfileData
      )) as InstructorProfile
      const idx = instructorProfiles.value.findIndex((l) => l.id === id)
      if (idx !== -1) {
        const newArr = instructorProfiles.value.slice()
        newArr[idx] = updated
        instructorProfiles.value = newArr
      }
      return true
    } catch (error) {
      hasError.value = true
      throw error
    } finally {
      isSaving.value = false
    }
  }

  async function deleteInstructorProfile(id: string) {
    isSaving.value = true
    hasError.value = false

    try {
      const success = await apiService.deleteInstructorProfile(id)
      if (success) {
        const idx = instructorProfiles.value.findIndex((l) => l.id === id)

        if (idx !== -1) {
          const newArr = instructorProfiles.value.slice()
          newArr.splice(idx, 1)
          instructorProfiles.value = newArr
        }
      }
      return success
    } catch (error) {
      hasError.value = true
      throw error
    } finally {
      isSaving.value = false
    }
  }

  return {
    // Properties
    isLoading: readonly(isLoading),
    hasError: readonly(hasError),
    hasLoadError: readonly(hasLoadError),
    instructorProfiles: instructorProfiles,

    loadingSites: readonly(loadingSites),

    // Methods
    getInstructorProfiles,
    createInstructorProfile,
    updateInstructorProfile,
    deleteInstructorProfile
  }
}
