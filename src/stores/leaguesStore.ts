import { supabase } from '@/common/supabase'
import type { League } from '@/models/app/leagueModel'
import type { Tables, TablesInsert } from '@/models/types/supabase'
import type { QueryData } from '@supabase/supabase-js'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLeaguesStore = defineStore('leaguesStore', () => {
  const leagues = ref<League[]>([])

  async function getLeagues(): Promise<void> {
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

  async function createLeague(
    leagueName: string,
    leagueStartDate: Date,
    leagueEndDate: Date
  ): Promise<null> {
    const { data, error } = await supabase.from('leagues').insert({
      league_name: leagueName,
      league_start_date: leagueStartDate.toDateString(),
      league_end_date: leagueEndDate.toDateString()
    } as TablesInsert<'leagues'>)

    if (error) {
      return Promise.reject(error)
    }

    return data
  }

  async function updateLeague(
    leagueId: number,
    leagueName: string,
    leagueStartDate: Date,
    leagueEndDate: Date
  ): Promise<null> {
    const { data, error } = await supabase
      .from('leagues')
      .update({
        league_name: leagueName,
        league_start_date: leagueStartDate.toDateString(),
        league_end_date: leagueEndDate.toDateString()
      } as TablesInsert<'leagues'>)
      .eq('id', leagueId)

    if (error) {
      return Promise.reject(error)
    }

    return data
  }

  async function deleteLeague(leagueId: number): Promise<null> {
    const { data, error } = await supabase.from('leagues').delete().eq('id', leagueId)

    if (error) {
      return Promise.reject(error)
    }

    return data
  }

  return {
    signUpForLeague,
    getLeagues,
    signOutFromLeague,
    leagues,
    createLeague,
    updateLeague,
    deleteLeague
  }
})
