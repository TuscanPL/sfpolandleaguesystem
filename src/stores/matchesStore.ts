import { supabase } from '@/common/supabase';
import type { LeagueMatch, MatchStatus } from '@/models/app/matchModel';
import type { LeagueMatchStub } from '@/models/app/matchModelStub';
import type { TablesInsert } from '@/models/types/supabase';
import type { QueryData } from '@supabase/supabase-js';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useMatchesStore = defineStore('matches', () => {
    const matches = ref<LeagueMatch[]>([])

    async function getAllLeaugeMatches(leagueId: number): Promise<void> {
        const leagueMatchesQuery = supabase.from('league_matches').select('*').eq('league_id', leagueId)
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
        const leagueMatchesQuery = supabase.from('league_matches').insert(matches.map((match) => {
            return {
                league_id: match.leagueId,
                player1_discordid: match.player1Discordid,
                player2_discordid: match.player2Discordid,
                player1_score: match.player1Score,
                player2_score: match.player2Score,
                match_status: match.matchStatus
            } as TablesInsert<'league_matches'>
        }))

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

    return {
        getAllLeaugeMatches,
        removeLeagueMatches,
        createLeagueMatches
    };
});
