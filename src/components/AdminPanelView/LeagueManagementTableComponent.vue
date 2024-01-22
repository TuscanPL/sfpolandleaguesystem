<template>
  <fwb-table>
    <fwb-table-head>
      <fwb-table-head-cell>Liga</fwb-table-head-cell>
      <fwb-table-head-cell>Data Startu</fwb-table-head-cell>
      <fwb-table-head-cell>Data Końca</fwb-table-head-cell>
      <fwb-table-head-cell>Ilość uczestników</fwb-table-head-cell>
      <fwb-table-head-cell>
        <span class="sr-only">Edytuj</span>
      </fwb-table-head-cell>
    </fwb-table-head>
    <fwb-table-body>
      <fwb-table-row
        v-for="league in leagues"
        :key="league.id"
        @click="setLeagueContextAndOpenModal(league)"
        :class="getRowHoverClass(league)"
      >
        <fwb-table-cell>{{ league.leagueName }}</fwb-table-cell>
        <fwb-table-cell>{{ getTimeString(league.leagueStartDate) }}</fwb-table-cell>
        <fwb-table-cell>{{ getTimeString(league.leagueEndDate) }}</fwb-table-cell>
        <fwb-table-cell>{{ league.leagueSignUps.length }}</fwb-table-cell>
        <fwb-table-cell>
          <fwb-button
            class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition"
            @click.stop="handleOpenLeagueModal(league)"
          >
            Edytuj
          </fwb-button>
          <fwb-button
            v-if="league.leagueStatus === LeagueStatus.Draft"
            class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition ml-2"
            @click.stop="onStartLeague(league?.id)"
          >
            <v-icon name="la-play-solid" />
          </fwb-button>
          <fwb-button
            v-else-if="league.leagueStatus === LeagueStatus.Started"
            class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition ml-2"
            @click.stop="onStopLeague(league?.id)"
          >
            <v-icon name="la-stop-solid" />
          </fwb-button>
          <fwb-button
            v-else
            class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition ml-2"
            @click.stop="onRemoveLeague(league?.id)"
          >
            <v-icon name="la-trash-alt-solid" />
          </fwb-button>
        </fwb-table-cell>
      </fwb-table-row>
      <fwb-table-row>
        <fwb-table-cell colspan="5">
          <fwb-button
            class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition"
            @click="handleOpenLeagueModal()"
          >
            Dodaj nową ligę
          </fwb-button>
        </fwb-table-cell>
      </fwb-table-row>
    </fwb-table-body>
    <fwb-modal size="5xl" v-if="isPlayersModalOpen" @close="isPlayersModalOpen = false">
      <template #body>
        <league-matches-table-component
          :matches="getLeagueMatches(LeagueContext?.id)"
          :leagueSignUps="LeagueContext?.leagueSignUps"
          @onEditMatch="onEditMatch"
        />
      </template>
    </fwb-modal>
  </fwb-table>
</template>
<script setup lang="ts">
import { LeagueStatus, type League } from '@/models/app/leagueModel'
import {
  FwbTable,
  FwbTableHead,
  FwbTableHeadCell,
  FwbTableBody,
  FwbTableRow,
  FwbTableCell,
  FwbButton,
  FwbModal
} from 'flowbite-vue'
import LeagueMatchesTableComponent from '@/components/AdminPanelView/LeagueMatchesTableComponent.vue'
import { getTimeString } from '@/common/utils'
import type { LeagueMatch } from '@/models/app/matchModel'
import { ref } from 'vue'

interface Props {
  leagues: League[]
  matches: LeagueMatch[]
}

interface Emits {
  (event: 'onOpenLeagueModal', league?: League): void
  (event: 'onStartLeague', leagueId: number): void
  (event: 'onStopLeague', leagueId: number): void
  (event: 'onRemoveLeague', leagueId: number): void
  (e: 'onEditMatch', match: LeagueMatch): void
  (e: 'onRemoveMatch', matchId: number): void
}

const props = defineProps<Props>()
const emits = defineEmits<Emits>()

const isPlayersModalOpen = ref(false)

const LeagueContext = ref<League | undefined>(undefined)

function getRowHoverClass(league: League) {
  if (league.leagueSignUps.length <= 0) {
    return ''
  }

  return 'hover:cursor-pointer hover:bg-gray-100 transition'
}

function handleOpenLeagueModal(league?: League) {
  emits('onOpenLeagueModal', league)
}

function onStartLeague(leagueId: number | undefined) {
  if (!leagueId) {
    return // todo: handle error
  }

  emits('onStartLeague', leagueId)
}

function onStopLeague(leagueId: number | undefined) {
  if (!leagueId) {
    return // todo: handle error
  }

  emits('onStopLeague', leagueId)
}

function onRemoveLeague(leagueId: number | undefined) {
  if (!leagueId) {
    return // todo: handle error
  }

  emits('onRemoveLeague', leagueId)
}

function getLeagueMatches(leagueId?: number) {
  return props.matches.filter((x) => x.leagueId === leagueId)
}

function setLeagueContextAndOpenModal(league?: League) {
  if (!league || league.leagueSignUps.length <= 0) {
    return // todo: handle error
  }

  LeagueContext.value = props.leagues.find((x) => x.id === league.id)
  isPlayersModalOpen.value = true
}

function onEditMatch(match: LeagueMatch) {
  emits('onEditMatch', match)
}
</script>
