<template>
  <fwb-table>
    <fwb-table-head>
      <fwb-table-head-cell>Gracz 1</fwb-table-head-cell>
      <fwb-table-head-cell>Gracz 2</fwb-table-head-cell>
      <fwb-table-head-cell>Wynik</fwb-table-head-cell>
      <fwb-table-head-cell>Powtórki</fwb-table-head-cell>
      <fwb-table-head-cell>Status</fwb-table-head-cell>
      <fwb-table-head-cell><span class="sr-only" /></fwb-table-head-cell>
    </fwb-table-head>
    <fwb-table-body>
      <fwb-table-row v-for="match in matches" :key="match.id">
        <fwb-table-cell class="font-normal">{{
          getPlayerNameByDiscordId(match.player1Discordid, leagueSignUps)
        }}</fwb-table-cell>
        <fwb-table-cell>{{
          getPlayerNameByDiscordId(match.player2Discordid, leagueSignUps)
        }}</fwb-table-cell>
        <fwb-table-cell>{{ getMatchScore(match) }}</fwb-table-cell>
        <fwb-table-cell>{{ getMatchReplayIds(match) }}</fwb-table-cell>
        <fwb-table-cell>{{ match.matchStatus }}</fwb-table-cell>
        <fwb-table-cell>
          <fwb-button
            class="bg-green-500 hover:bg-green-700 text-white font-bold rounded transition"
            @click="handleMatchEdit(match)"
          >
            <v-icon name="la-edit-solid" />
          </fwb-button>
        </fwb-table-cell>
      </fwb-table-row>
    </fwb-table-body>
    <edit-match-modal-component
      :is-open="isEditMatchModalOpen"
      :match="matchToEdit"
      header-text="Edytuj mecz"
      @on-save="handleSaveMatch"
      @on-close="isEditMatchModalOpen = false"
    />
  </fwb-table>
</template>
<script setup lang="ts">
import {
  FwbTable,
  FwbTableHead,
  FwbTableHeadCell,
  FwbTableBody,
  FwbTableRow,
  FwbTableCell,
  FwbButton
} from 'flowbite-vue'
import { type LeagueMatch } from '@/models/app/matchModel'
import type { LeagueAssignedUser } from '@/models/app/leagueModel'
import EditMatchModalComponent from './EditMatchModalComponent.vue'
import { ref } from 'vue'
import { getPlayerNameByDiscordId } from '@/common/tournamentUtils'

interface Props {
  matches?: LeagueMatch[]
  leagueSignUps?: LeagueAssignedUser[]
}

interface Emits {
  (e: 'onEditMatch', match: LeagueMatch): void
}

const props = defineProps<Props>()
const emits = defineEmits<Emits>()

const isEditMatchModalOpen = ref(false)
const matchToEdit = ref<LeagueMatch>()

function getMatchScore(match: LeagueMatch) {
  return `${match.player1Score} - ${match.player2Score}`
}

function getMatchReplayIds(match: LeagueMatch) {
  return match.replayIds ?? 'Brak powtórek'
}

function handleMatchEdit(match: LeagueMatch) {
  matchToEdit.value = match
  isEditMatchModalOpen.value = true
}

function handleSaveMatch(match: LeagueMatch) {
  isEditMatchModalOpen.value = false
  emits('onEditMatch', match)
}
</script>
