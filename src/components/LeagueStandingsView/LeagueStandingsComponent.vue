<template>
  <div class="w-4/5 mx-auto mt-3">
    <fwb-table>
      <fwb-table-head>
        <fwb-table-head-cell>Nick</fwb-table-head-cell>
        <fwb-table-head-cell>Wygrane - Przegrane</fwb-table-head-cell>
        <fwb-table-head-cell style="text-align: right">Mecze</fwb-table-head-cell>
      </fwb-table-head>
      <fwb-table-body>
        <fwb-table-row v-for="user in orderedPlayers" :key="user.id">
          <table-user-cell-component :user="user" />
          <fwb-table-cell>{{ getScoreString(user.discordUserId) }}</fwb-table-cell>
          <fwb-table-cell>
            <fwb-button
              class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition"
              @click="handleOpenMatchHistoryModal(user)"
            >
              Historia meczy
            </fwb-button>
          </fwb-table-cell>
        </fwb-table-row>
      </fwb-table-body>
    </fwb-table>
    <match-history-modal-component
      :is-open="isMatchHistoryOpen"
      :current-player="currentPlayer"
      :league-id="props.league.id"
      :matches="props.leagueMatches"
      :players="props.league.leagueSignUps"
      @on-close="handleCloseMatchHistoryModal"
    />
  </div>
</template>
<script setup lang="ts">
import TableUserCellComponent from '@/components/common/TableUserCellComponent.vue'
import {
  FwbTable,
  FwbTableHead,
  FwbTableHeadCell,
  FwbTableRow,
  FwbTableCell,
  FwbTableBody,
  FwbButton
} from 'flowbite-vue'
import type { League, LeagueAssignedUser } from '@/models/app/leagueModel'
import { MatchStatus, type LeagueMatch } from '@/models/app/matchModel'
import { computed, ref } from 'vue'
import MatchHistoryModalComponent from './MatchHistoryModalComponent.vue'

interface Props {
  league: League
  leagueMatches: LeagueMatch[]
}

const props = defineProps<Props>()
const noMatchesPlayed = 'Brak rozegranych meczy'

const isMatchHistoryOpen = ref(false)
const currentPlayer = ref<LeagueAssignedUser>()

const orderedPlayers = computed(() => {
  return props.league.leagueSignUps.slice().sort((a, b) => {
    const comparedScore = getScoreString(b.discordUserId)
    if (comparedScore === noMatchesPlayed) {
      return -1
    }

    return getScoreString(b.discordUserId).localeCompare(getScoreString(a.discordUserId))
  })
})

function getPlayerMatches(userId: string): LeagueMatch[] {
  return props.leagueMatches.filter((match) => {
    return (
      match.leagueId === props.league.id &&
      (match.player1Discordid === userId || match.player2Discordid === userId)
    )
  })
}

function getScoreString(userId: string): string {
  const wins = getPlayerMatches(userId).filter((match) => {
    return match.matchStatus === MatchStatus.completed && isMatchWon(userId, match)
  }).length

  const losses = getPlayerMatches(userId).filter((match) => {
    return match.matchStatus === MatchStatus.completed && isMatchLost(userId, match)
  }).length

  if (wins === 0 && losses === 0) {
    return noMatchesPlayed
  }

  return `${wins} - ${losses}`
}

function isMatchWon(userId: string, match: LeagueMatch): boolean {
  return match.player1Discordid === userId
    ? match.player1Score > match.player2Score
    : match.player2Score > match.player1Score
}

function isMatchLost(userId: string, match: LeagueMatch): boolean {
  return match.player1Discordid === userId
    ? match.player1Score < match.player2Score
    : match.player2Score < match.player1Score
}

function handleOpenMatchHistoryModal(user: LeagueAssignedUser): void {
  currentPlayer.value = user
  isMatchHistoryOpen.value = true
}

function handleCloseMatchHistoryModal(): void {
  isMatchHistoryOpen.value = false
}
</script>
