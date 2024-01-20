<template>
  <div class="w-4/5 mx-auto mt-3">
    <upcoming-match-tile-component
      v-for="match in leagueMatches"
      class="mt-2"
      :key="match.id"
      :match="match"
      :league-sign-ups="leagueSignUps"
      :current-user="currentUser"
    />
  </div>
</template>
<script setup lang="ts">
import UpcomingMatchTileComponent from '@/components/UpcomingMatchesView/UpcomingMatchTileComponent.vue'
import type { LeagueAssignedUser } from '@/models/app/leagueModel'
import type { LeagueMatch } from '@/models/app/matchModel'
import type { User } from '@/models/app/userModel'

interface Props {
  leagueMatches?: LeagueMatch[]
  leagueSignUps?: LeagueAssignedUser[]
  currentUser?: User | null
}

defineProps<Props>()
</script>
