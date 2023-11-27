import { defineStore } from 'pinia'
import { supabase } from '@/common/supabase'
import { mapConfigurationOptionDbModelToConfigurationOption } from '@/common/mapper'

export const useConfigurationStore = defineStore('configurationStore', () => {
  const isPageVisible: { [key: string]: boolean } = {
    isMainPageVisible: false,
    isLeaguePageVisible: false,
    isUpcomingMatchesVisible: false,
    isReportScoresVisible: false,
    isSettingsVisible: false,
    isSignUpVisible: false
  }
  async function initializeConfigurationValues() {
    const { data } = await supabase.from('configuration').select()

    const configurationOptions = data?.map((configurationOption: any) => {
      return mapConfigurationOptionDbModelToConfigurationOption(configurationOption)
    })

    for (const configurationOption of configurationOptions!) {
      const key = configurationOption.configurationKey
      const value = JSON.parse(configurationOption.configurationValue)

      if (isPageVisible[key] !== undefined) {
        isPageVisible[key] = value
      }
      console.log(isPageVisible[key])
    }
  }

  return {
    isPageVisible,
    initializeConfigurationValues
  }
})
