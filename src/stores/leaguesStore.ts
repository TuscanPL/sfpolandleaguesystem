import { mapLeagueDbModelToLeague } from '@/common/mapper'
import { supabase } from '@/common/supabase'
import type { League } from '@/models/app/leagueModel'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLeaguesStore = defineStore('leaguesStore', () => {
  const leagues = ref<League[]>([])

  async function initalizeLeagues(): Promise<any> {
    const { data } = await supabase.from('leagues').select(`
                *,
                league_sign_ups (
                    *
                )
            `)

    if (!data) return Promise.reject()

    leagues.value = data.map<League>((league: any) => mapLeagueDbModelToLeague(league))
    return Promise.resolve()
  }

  async function signUpForLeague(
    leagueId: number,
    discordName: string,
    avatarUrl: string
  ): Promise<any> {
    return await supabase.from('league_sign_ups').insert({
      league_id: leagueId,
      discord_name: discordName,
      avatar_url: avatarUrl
    })
  }

  async function signOutFromLeague(leagueId: number): Promise<any> {
    return await supabase.from('league_sign_ups').delete().eq('league_id', leagueId)
  }

  return {
    signUpForLeague,
    initalizeLeagues,
    signOutFromLeague,
    leagues
  }
})
