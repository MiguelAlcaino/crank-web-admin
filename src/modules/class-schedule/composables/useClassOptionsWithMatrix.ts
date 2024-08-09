import { ref } from 'vue'

const spotsTableModeEnabled = ref<boolean>(false)

export const useClassOptionsWithMatrix = () => {
  const toggleSpotsMode = () => {
    spotsTableModeEnabled.value = !spotsTableModeEnabled.value
  }

  return {
    spotsTableModeEnabled,
    toggleSpotsMode
  }
}
