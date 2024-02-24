<template>
  <fwb-table-cell style="text-align: left">
    <div class="row inline-flex justify-start items-center">
      <fwb-avatar class="flex-shrink-0" rounded :img="user.avatarUrl" />
      <span class="ml-3 overflow-hidden overflow-ellipsis">
        {{ user.discordName }}
      </span>
    </div>
  </fwb-table-cell>
</template>
<script setup lang="ts">
import type { LeagueAssignedUser } from '@/models/app/leagueModel'
import { FwbTableCell, FwbAvatar } from 'flowbite-vue'

interface Props {
  user: LeagueAssignedUser
}

defineProps<Props>()
</script>
