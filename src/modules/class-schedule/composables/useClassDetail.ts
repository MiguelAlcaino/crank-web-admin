import { authService } from '@/services/authService'
import { Role } from '@/utils/userRoles'
import { onMounted, ref } from 'vue'

export const useClassDetail = () => {
  const userCanCheckInCheckOut = ref<boolean>(false)
  const userCanModifyClass = ref<boolean>(false)
  const userCanModifyLayoutClass = ref<boolean>(false)
  const userCanSyncClasses = ref<boolean>(false)
  const userCanSyncClassesWithPiq = ref<boolean>(false)

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

  return {
    userCanCheckInCheckOut,
    userCanModifyClass,
    userCanModifyLayoutClass,
    userCanSyncClasses,
    userCanSyncClassesWithPiq
  }
}
