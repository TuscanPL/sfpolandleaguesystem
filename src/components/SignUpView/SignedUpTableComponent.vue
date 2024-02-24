<template>
  <fwb-table class="drop-shadow-lg rounded-md">
    <fwb-table-head>
      <fwb-table-head-cell>Nick</fwb-table-head-cell>
      <fwb-table-head-cell style="text-align: right">Zapisany</fwb-table-head-cell>
    </fwb-table-head>
    <fwb-table-body>
      <fwb-table-row v-for="user in signedUpUsers" :key="user.id">
        <table-user-cell-component :user="user" />
        <fwb-table-cell>
          {{ getTimeString(user.createdAt) }}
        </fwb-table-cell>
      </fwb-table-row>
    </fwb-table-body>
  </fwb-table>
</template>
<script setup lang="ts">
import type { LeagueAssignedUser } from '@/models/app/leagueModel'
import {
  FwbTable,
  FwbTableHead,
  FwbTableHeadCell,
  FwbTableRow,
  FwbTableCell,
  FwbTableBody
} from 'flowbite-vue'
import TableUserCellComponent from '@/components/common/TableUserCellComponent.vue'
import { getTimeString } from '@/common/utils'

interface Props {
  signedUpUsers: LeagueAssignedUser[]
}

defineProps<Props>()
</script>
