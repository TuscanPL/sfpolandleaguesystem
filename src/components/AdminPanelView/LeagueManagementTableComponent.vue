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
      <fwb-table-row v-for="league in leagues" :key="league.id">
        <fwb-table-cell>{{ league.leagueName }}</fwb-table-cell>
        <fwb-table-cell>{{ getTimeString(league.leagueStartDate) }}</fwb-table-cell>
        <fwb-table-cell>{{ getTimeString(league.leagueEndDate) }}</fwb-table-cell>
        <fwb-table-cell>{{ league.leagueSignUps.length }}</fwb-table-cell>
        <fwb-table-cell>
          <fwb-button
            class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition"
          >
            Edytuj
          </fwb-button>
        </fwb-table-cell>
      </fwb-table-row>
    </fwb-table-body>
  </fwb-table>
</template>
<script setup lang="ts">
import type { League } from '@/models/app/leagueModel'
import {
  FwbTable,
  FwbTableHead,
  FwbTableHeadCell,
  FwbTableBody,
  FwbTableRow,
  FwbTableCell,
  FwbButton
} from 'flowbite-vue'
import { getTimeString } from '@/common/utils'

interface Props {
  leagues: League[]
}

defineProps<Props>()
</script>
