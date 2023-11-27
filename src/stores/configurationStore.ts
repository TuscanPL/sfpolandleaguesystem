import { defineStore } from 'pinia'
import { supabase } from '@/common/supabase'
import { mapConfigurationOptionDbModelToConfigurationOption } from '@/common/mapper'
import { reactive } from 'vue'

interface ConfigurationState {
  isPageVisible: { [key: string]: boolean }
}

export const useConfigurationStore = defineStore('configurationStore', () => {
  const state = reactive<ConfigurationState>({
    isPageVisible: {
      isMainPageVisible: false,
      isLeaguePageVisible: false,
      isUpcomingMatchesVisible: false,
      isReportScoresVisible: false,
      isSettingsVisible: false,
      isSignUpVisible: false
    }
  })
  async function initializeConfigurationValues() {
    const { data } = await supabase.from('configuration').select()

    const configurationOptions = data?.map((configurationOption: any) => {
      return mapConfigurationOptionDbModelToConfigurationOption(configurationOption)
    })

    for (const configurationOption of configurationOptions!) {
      const key = configurationOption.configurationKey
      const value = JSON.parse(configurationOption.configurationValue)

      if (state.isPageVisible[key] !== undefined) {
        state.isPageVisible[key] = value
      }
    }
  }

  return {
    isPageVisible: state.isPageVisible,
    initializeConfigurationValues
  }
})
