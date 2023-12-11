import { defineStore } from 'pinia'
import { supabase } from '@/common/supabase'
import { mapConfigurationOptionDbModelToConfigurationOption } from '@/common/mapper'
import { ref } from 'vue'
import type { ConfigurationState } from '@/models/app/configurationStateModel'

export const useConfigurationStore = defineStore('configurationStore', () => {
  const featureFlagStates = ref<ConfigurationState>({
    isMainPageVisible: ref(false),
    isLeaguePageVisible: ref(false),
    isUpcomingMatchesVisible: ref(false),
    isReportScoresVisible: ref(false),
    isSettingsVisible: ref(false),
    isSignUpVisible: ref(false)
  })

  async function initializeConfigurationValues() {
    const { data } = await supabase.from('configuration').select()

    const configurationOptions = data?.map((configurationOption: any) => {
      return mapConfigurationOptionDbModelToConfigurationOption(configurationOption)
    })

    if (!configurationOptions) {
      return
    }

    for (const configurationOption of configurationOptions) {
      featureFlagStates.value[configurationOption.configurationKey] = JSON.parse(
        configurationOption.configurationValue
      )
    }
  }

  return {
    featureFlagStates,
    initializeConfigurationValues
  }
})
