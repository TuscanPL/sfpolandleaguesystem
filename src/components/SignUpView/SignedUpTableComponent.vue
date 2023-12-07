<template>
  <fwb-table class="drop-shadow-lg rounded-md">
    <fwb-table-head>
      <fwb-table-head-cell>Nick</fwb-table-head-cell>
      <fwb-table-head-cell style="text-align: right">Zapisany</fwb-table-head-cell>
    </fwb-table-head>
    <fwb-table-body>
      <fwb-table-row v-for="user in signedUpUsers" :key="user.id">
        <fwb-table-cell style="text-align: left">
          <div class="row inline-flex justify-start items-center">
            <fwb-avatar class="flex-shrink-0" rounded :img="user.avatarUrl" />
            <span class="ml-3 overflow-hidden overflow-ellipsis">
              {{ user.discordName }}
            </span>
          </div>
        </fwb-table-cell>
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
  FwbTableBody,
  FwbAvatar
} from 'flowbite-vue'

interface Props {
  signedUpUsers: LeagueAssignedUser[]
}

defineProps<Props>()

function getTimeString(createdAt: Date): string {
  return `(${createdAt.getHours()}:${createdAt.getMinutes()}) ${createdAt.toDateString()}`
}
</script>
