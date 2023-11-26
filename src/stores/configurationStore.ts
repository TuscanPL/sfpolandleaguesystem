import { defineStore } from 'pinia'
import { supabase } from '@/common/supabase'
import { ref } from 'vue'
import { mapConfigurationOptionDbModelToConfigurationOption } from '@/common/mapper'

export const useConfigurationStore = defineStore('configurationStore', () => {
  const isMainPageVisible = ref(false)
  const isLeaguePageVisible = ref(false)
  const isUpcomingMatchVisible = ref(false)
  const isSettingsVisible = ref(false)
  const isReportScoresVisible = ref(false)
  const isSignUpVisible = ref(false)

  async function initializeConfigurationValues() {
    const { data } = await supabase.from('configuration').select()

    const configurationOptions = data?.map((configurationOption: any) => {
      return mapConfigurationOptionDbModelToConfigurationOption(configurationOption)
    })

    for (const configurationOption of configurationOptions!) {
      if (configurationOption.configurationKey === 'isMainPageVisible') {
        isMainPageVisible.value = JSON.parse(configurationOption.configurationValue)
      }
      if (configurationOption.configurationKey === 'isLeaguePageVisible') {
        isLeaguePageVisible.value = JSON.parse(configurationOption.configurationValue)
      }
      if (configurationOption.configurationKey === 'isUpcomingMatchesVisible') {
        isUpcomingMatchVisible.value = JSON.parse(configurationOption.configurationValue)
      }
      if (configurationOption.configurationKey === 'isSettingsVisible') {
        isSettingsVisible.value = JSON.parse(configurationOption.configurationValue)
      }
      if (configurationOption.configurationKey === 'isReportScoresVisible') {
        isReportScoresVisible.value = JSON.parse(configurationOption.configurationValue)
      }
      if (configurationOption.configurationKey === 'isSignUpVisible') {
        isSignUpVisible.value = JSON.parse(configurationOption.configurationValue)
      }
    }
  }

  return {
    isMainPageVisible,
    isLeaguePageVisible,
    isUpcomingMatchVisible,
    isSettingsVisible,
    isReportScoresVisible,
    isSignUpVisible,
    initializeConfigurationValues
  }
})
