import { supabase } from '@/common/supabase'
import { MatchStatus, type LeagueMatch } from '@/models/app/matchModel'
import type { LeagueMatchStub } from '@/models/app/matchModelStub'
import type { TablesInsert } from '@/models/types/supabase'
import type {
  QueryData,
  RealtimeChannel,
  RealtimePostgresChangesPayload
} from '@supabase/supabase-js'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMatchesStore = defineStore('matches', () => {
  const matches = ref<LeagueMatch[]>([])
  const matchesChannel = ref<RealtimeChannel | null>(null)

  function subscribeToMatches(): void {
    matchesChannel.value = supabase
      .channel('league_matches')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'league_matches' },
        handleLeagueMatchesChanges
      )
      .subscribe()

    async function handleLeagueMatchesChanges(
      payload: RealtimePostgresChangesPayload<{ [key: string]: any }>
    ) {
      let matchIndex = -1

      switch (payload.eventType) {
        case 'INSERT':
          matches.value.push({
            id: payload.new.id,
            createdAt: new Date(payload.new.created_at),
            leagueId: payload.new.league_id ?? undefined,
            player1Discordid: payload.new.player1_discordid ?? undefined,
            player2Discordid: payload.new.player2_discordid ?? undefined,
            player1Score: payload.new.player1_score,
            player2Score: payload.new.player2_score,
            replayIds: payload.new.replay_ids?.split(',') ?? undefined,
            matchStatus: payload.new.match_status as MatchStatus
          } as LeagueMatch)
          break
        case 'UPDATE':
          matchIndex = matches.value.findIndex((match) => match.id === payload.new.id)
          if (matchIndex < 0) return

          matches.value[matchIndex] = {
            id: payload.new.id,
            createdAt: new Date(payload.new.created_at),
            leagueId: payload.new.league_id ?? undefined,
            player1Discordid: payload.new.player1_discordid ?? undefined,
            player2Discordid: payload.new.player2_discordid ?? undefined,
            player1Score: payload.new.player1_score,
            player2Score: payload.new.player2_score,
            replayIds: payload.new.replay_ids?.split(',') ?? undefined,
            matchStatus: payload.new.match_status as MatchStatus
          } as LeagueMatch
          break
        case 'DELETE':
          await getAllMatches()
          break
      }
    }
  }

  function unsubscribeFromMatches(): void {
    if (!matchesChannel.value) return
    supabase.removeChannel(matchesChannel.value as RealtimeChannel)
    matchesChannel.value = null
  }

  async function getAllMatches(): Promise<void> {
    const leagueMatchesQuery = supabase.from('league_matches').select('*')
    type leagueMatches = QueryData<typeof leagueMatchesQuery>

    const { data, error } = await leagueMatchesQuery

    if (error) {
      return Promise.reject(error)
    }

    if (!data) {
      return Promise.reject('No data found')
    }

    const leagueMatchesData: leagueMatches = data
    matches.value = leagueMatchesData.map<LeagueMatch>((match) => {
      return {
        id: match.id,
        createdAt: new Date(match.created_at),
        leagueId: match.league_id ?? undefined,
        player1Discordid: match.player1_discordid ?? undefined,
        player2Discordid: match.player2_discordid ?? undefined,
        player1Score: match.player1_score,
        player2Score: match.player2_score,
        replayIds: match.replay_ids?.split(',') ?? undefined,
        matchStatus: match.match_status as MatchStatus
      }
    })
  }

  async function createLeagueMatches(matches: LeagueMatchStub[]): Promise<void> {
    const leagueMatchesQuery = supabase.from('league_matches').insert(
      matches.map((match) => {
        return {
          league_id: match.leagueId,
          player1_discordid: match.player1Discordid,
          player2_discordid: match.player2Discordid,
          player1_score: match.player1Score,
          player2_score: match.player2Score,
          match_status: match.matchStatus
        } as TablesInsert<'league_matches'>
      })
    )

    const { error } = await leagueMatchesQuery
    if (error) {
      return Promise.reject(error)
    }
  }

  async function removeLeagueMatches(leagueId: number): Promise<void> {
    const leagueMatchesQuery = supabase.from('league_matches').delete().eq('league_id', leagueId)
    const { error } = await leagueMatchesQuery

    if (error) {
      return Promise.reject(error)
    }
  }

  async function updateLeagueMatch(match: LeagueMatch): Promise<void> {
    const leagueMatchesQuery = supabase
      .from('league_matches')
      .update({
        player1_discordid: match.player1Discordid,
        player2_discordid: match.player2Discordid,
        player1_score: match.player1Score,
        player2_score: match.player2Score,
        match_status: match.matchStatus
      } as TablesInsert<'league_matches'>)
      .eq('id', match.id)

    const { error } = await leagueMatchesQuery

    if (error) {
      return Promise.reject(error)
    }
  }

  return {
    matches,
    getAllMatches,
    removeLeagueMatches,
    createLeagueMatches,
    subscribeToMatches,
    unsubscribeFromMatches,
    updateLeagueMatch
  }
})
