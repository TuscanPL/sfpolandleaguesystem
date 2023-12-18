import { supabase } from '@/common/supabase'
import type { League } from '@/models/app/leagueModel'
import type { QueryData } from '@supabase/supabase-js'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLeaguesStore = defineStore('leaguesStore', () => {
  const leagues = ref<League[]>([])

  async function initalizeLeagues(): Promise<void> {
    const leaguesWithUsersQuery = supabase.from('leagues').select(`
                *,
                league_sign_ups (
                    *
                )
            `)

    type leaguesWithUsers = QueryData<typeof leaguesWithUsersQuery>

    const { data, error } = await leaguesWithUsersQuery

    if (error) {
      return Promise.reject(error)
    }

    if (!data) {
      return Promise.reject('No data found')
    }

    const leaguesWithUsersData: leaguesWithUsers = data

    leagues.value = leaguesWithUsersData.map<League>((league) => {
      return {
        id: league.id,
        createdAt: new Date(league.created_at),
        leagueName: league.league_name,
        leagueStartDate: new Date(league.league_start_date ?? ''),
        leagueEndDate: new Date(league.league_end_date ?? ''),
        leagueSignUps: league.league_sign_ups.map((user) => {
          return {
            avatarUrl: user.avatar_url,
            createdAt: new Date(user.created_at),
            discordName: user.discord_name,
            discordUserId: user.user_id,
            id: user.id
          }
        })
      } as League
    })

    return Promise.resolve()
  }

  async function signUpForLeague(
    leagueId: number,
    discordName: string,
    avatarUrl: string
  ): Promise<null> {
    const { data, error } = await supabase.from('league_sign_ups').insert({
      league_id: leagueId,
      discord_name: discordName,
      avatar_url: avatarUrl
    })

    if (error) {
      return Promise.reject(error)
    }

    return data
  }

  async function signOutFromLeague(leagueId: number): Promise<null> {
    const { data, error } = await supabase
      .from('league_sign_ups')
      .delete()
      .eq('league_id', leagueId)

    if (error) {
      return Promise.reject(error)
    }

    return data
  }

  return {
    signUpForLeague,
    initalizeLeagues,
    signOutFromLeague,
    leagues
  }
})
