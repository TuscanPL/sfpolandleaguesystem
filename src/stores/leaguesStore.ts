import { supabase } from '@/common/supabase'
import { generateRoundRobinSchedule } from '@/common/tournamentUtils'
import { LeagueStatus, type League } from '@/models/app/leagueModel'
import type { TablesInsert } from '@/models/types/supabase'
import {
  RealtimeChannel,
  type QueryData,
  type RealtimePostgresChangesPayload
} from '@supabase/supabase-js'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useMatchesStore } from './matchesStore'

export const useLeaguesStore = defineStore('leaguesStore', () => {
  const matchesStore = useMatchesStore()

  const leagues = ref<League[]>([])
  const leaguesChannel = ref<RealtimeChannel | null>(null)

  function subscribeToLeagues(): void {
    // Subscribing to deleted events doesn't pass a full payload when RLS is enabled, so we need to re-fetch the leagues. Dirty but works. //MDR
    leaguesChannel.value = supabase
      .channel('leagues')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'leagues' },
        handleLeagueChanges
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'league_sign_ups' },
        handleLeagueSignUpsChanges
      )
      .subscribe()

    async function handleLeagueChanges(
      payload: RealtimePostgresChangesPayload<{ [key: string]: any }>
    ) {
      let leagueIndex = -1

      switch (payload.eventType) {
        case 'INSERT':
          leagues.value.push({
            id: payload.new.id,
            createdAt: new Date(payload.new.created_at),
            leagueName: payload.new.league_name,
            leagueStartDate: new Date(payload.new.league_start_date ?? ''),
            leagueEndDate: new Date(payload.new.league_end_date ?? ''),
            leagueSignUps: [],
            leagueStatus: payload.new.status as LeagueStatus
          } as League)
          break
        case 'UPDATE':
          leagueIndex = leagues.value.findIndex((league) => league.id === payload.new.id)
          if (leagueIndex < 0) return

          leagues.value[leagueIndex] = {
            id: payload.new.id,
            createdAt: new Date(payload.new.created_at),
            leagueName: payload.new.league_name,
            leagueStartDate: new Date(payload.new.league_start_date ?? ''),
            leagueEndDate: new Date(payload.new.league_end_date ?? ''),
            leagueSignUps: leagues.value[leagueIndex].leagueSignUps,
            leagueStatus: payload.new.status as LeagueStatus
          } as League
          break
        case 'DELETE':
          await getLeagues()
          break
      }
    }

    async function handleLeagueSignUpsChanges(
      payload: RealtimePostgresChangesPayload<{ [key: string]: any }>
    ) {
      let leagueIndex = -1
      switch (payload.eventType) {
        case 'INSERT':
          leagueIndex = leagues.value.findIndex((league) => league.id === payload.new.league_id)
          if (leagueIndex < 0) return

          leagues.value[leagueIndex].leagueSignUps.push({
            id: payload.new.id,
            createdAt: new Date(payload.new.created_at),
            discordName: payload.new.discord_name,
            discordUserId: payload.new.user_id,
            avatarUrl: payload.new.avatar_url
          })
          break
        case 'DELETE':
          await getLeagues()
          break
      }
    }
  }

  function unsubscribeFromLeagues(): void {
    if (!leaguesChannel.value) return
    supabase.removeChannel(leaguesChannel.value as RealtimeChannel)
    leaguesChannel.value = null
  }

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
        leagueStatus: league.status as LeagueStatus,
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

  async function removeFromLeague(leagueId: number, discordUserId: string): Promise<null> {
    const { data, error } = await supabase
      .from('league_sign_ups')
      .delete()
      .eq('league_id', leagueId)
      .eq('user_id', discordUserId)

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

  async function startLeague(leagueId: number): Promise<null> {
    const leaguePlayers = leagues.value.find((league) => league.id === leagueId)?.leagueSignUps

    if (!leaguePlayers || leaguePlayers.length < 2) return Promise.reject('No players found')

    const leagueMatches = generateRoundRobinSchedule(leaguePlayers, leagueId)

    try {
      await matchesStore.createLeagueMatches(leagueMatches)
    } catch (error) {
      return Promise.reject(error)
    }

    const { data, error } = await supabase
      .from('leagues')
      .update({ status: LeagueStatus.Started })
      .eq('id', leagueId)

    if (error) {
      return Promise.reject(error)
    }

    return data
  }

  async function stopLeague(leagueId: number): Promise<null> {
    try {
      await matchesStore.removeLeagueMatches(leagueId)
    } catch (error) {
      return Promise.reject(error)
    }

    const { data, error } = await supabase
      .from('leagues')
      .update({ status: LeagueStatus.Draft })
      .eq('id', leagueId)

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
    deleteLeague,
    removeFromLeague,
    subscribeToLeagues,
    unsubscribeFromLeagues,
    startLeague,
    stopLeague
  }
})
