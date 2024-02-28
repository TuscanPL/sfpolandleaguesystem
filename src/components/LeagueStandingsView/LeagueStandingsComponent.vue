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
import { type LeagueMatch } from '@/models/app/matchModel'
import { computed, ref } from 'vue'
import MatchHistoryModalComponent from './MatchHistoryModalComponent.vue'
import {
  getPlayerMatches,
  getWonMatches,
  getLostMatches,
  sortMatchesByPoints
} from '@/common/matchesHelper'

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
    return sortMatchesByPoints(a, b, props.leagueMatches, props.league.id)
  })
})

function getScoreString(userId: string): string {
  const playerMatches = getPlayerMatches(userId, props.league.id, props.leagueMatches)
  const wins = getWonMatches(userId, playerMatches).length
  const losses = getLostMatches(userId, playerMatches).length

  if (wins === 0 && losses === 0) {
    return noMatchesPlayed
  }

  return `${wins} - ${losses}`
}

function handleOpenMatchHistoryModal(user: LeagueAssignedUser): void {
  currentPlayer.value = user
  isMatchHistoryOpen.value = true
}

function handleCloseMatchHistoryModal(): void {
  isMatchHistoryOpen.value = false
}
</script>
