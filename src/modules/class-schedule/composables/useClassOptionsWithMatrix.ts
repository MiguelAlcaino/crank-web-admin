import { ref } from 'vue'

export const useClassOptionsWithMatrix = () => {
  const spotsTableModeEnabled = ref<boolean>(false)

  const toggleSpotsMode = () => {
    spotsTableModeEnabled.value = !spotsTableModeEnabled.value
  }

  return {
    spotsTableModeEnabled,
    toggleSpotsMode
  }
}
