import type { ApiService } from '@/services/apiService'
import { readonly, ref } from 'vue'
import type { InstructorProfile } from '@/modules/instructor-profile/interfaces/Instructor-profile'

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
        null
      )) as InstructorProfile[]
    } catch (error) {
      hasLoadError.value = true
    } finally {
      isLoading.value = false
    }
  }

  async function createInstructorProfile(instructorProfileData: {
    name: string
    description?: string | null
    active?: boolean
    profilePictureFile?: File
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
      return false
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
      return false
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
      return false
    } finally {
      isSaving.value = false
    }
  }

  async function linkMindbodyStaff(profileId: string, staffIds: string[]) {
    isSaving.value = true
    hasError.value = false

    try {
      const updated = await apiService.linkMindbodyStaffToProfile(profileId, staffIds)
      const idx = instructorProfiles.value.findIndex((p) => p.id === profileId)
      if (idx !== -1) {
        const newArr = instructorProfiles.value.slice()
        newArr[idx] = updated
        instructorProfiles.value = newArr
      }
      return true
    } catch (error) {
      hasError.value = true
      return false
    } finally {
      isSaving.value = false
    }
  }

  async function unlinkMindbodyStaff(profileId: string, staffIds: string[]) {
    isSaving.value = true
    hasError.value = false

    try {
      const updated = await apiService.unlinkMindbodyStaffFromProfile(profileId, staffIds)
      const idx = instructorProfiles.value.findIndex((p) => p.id === profileId)
      if (idx !== -1) {
        const newArr = instructorProfiles.value.slice()
        newArr[idx] = updated
        instructorProfiles.value = newArr
      }
      return true
    } catch (error) {
      hasError.value = true
      return false
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
    deleteInstructorProfile,
    linkMindbodyStaff,
    unlinkMindbodyStaff
  }
}
