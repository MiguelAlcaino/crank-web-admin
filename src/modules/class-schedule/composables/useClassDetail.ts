import { authService } from '@/services/authService'
import { Role } from '@/utils/userRoles'
import { onMounted, readonly, ref } from 'vue'
import type { ClassInfo, EnrollmentInfo } from '../interfaces/class-detail'

const classInfo = ref<ClassInfo | null>(null)
const enrollments = ref<EnrollmentInfo[]>([])

export const useClassDetail = () => {
  const userCanCheckInCheckOut = ref<boolean>(false)
  const userCanModifyClass = ref<boolean>(false)
  const userCanModifyLayoutClass = ref<boolean>(false)
  const userCanSyncClasses = ref<boolean>(false)
  const userCanSyncClassesWithPiq = ref<boolean>(false)

  const isLoading = ref<boolean>(false)

  onMounted(() => {
    setPermissionsByRole()
  })

  function setPermissionsByRole() {
    userCanCheckInCheckOut.value = authService.userHasRole(Role.ROLE_INSTRUCTOR)
    userCanModifyClass.value = authService.userHasRole(Role.ROLE_STAFF)
    userCanModifyLayoutClass.value = authService.userHasRole(Role.ROLE_SUPER_ADMIN)
    userCanSyncClasses.value = authService.userHasRole(Role.ROLE_STAFF)
    userCanSyncClassesWithPiq.value = authService.userHasRole(Role.ROLE_SUPER_ADMIN)
  }

  function checkInEnrollment(enrollmentId: string, isCheckedIn: boolean) {
    try {
      for (let i = 0; i < enrollments.value.length; i++) {
        if (enrollments.value[i].id === enrollmentId) {
          const mutableEnrollment = { ...enrollments.value[i] }
          mutableEnrollment.isCheckedIn = isCheckedIn
          enrollments.value[i] = mutableEnrollment

          break
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  return {
    // Properties
    userCanCheckInCheckOut: readonly(userCanCheckInCheckOut),
    userCanModifyClass: readonly(userCanModifyClass),
    userCanModifyLayoutClass: readonly(userCanModifyLayoutClass),
    userCanSyncClasses: readonly(userCanSyncClasses),
    userCanSyncClassesWithPiq: readonly(userCanSyncClassesWithPiq),
    isLoading,
    classInfo,
    enrollments,

    // Methods
    checkInEnrollment
  }
}
