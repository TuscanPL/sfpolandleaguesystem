<template>
  <div class="w-4/5 mx-auto mt-3 last-match-spacer">
    <upcoming-match-tile-component
      v-for="match in sortedLeagueMatches"
      :key="match.id"
      :match="match"
      :league-sign-ups="leagueSignUps"
      :current-user="currentUser"
      @on-update-match="onUpdateMatch"
    />
  </div>
</template>
<script setup lang="ts">
import UpcomingMatchTileComponent from '@/components/UpcomingMatchesView/UpcomingMatchTileComponent.vue'
import type { LeagueAssignedUser } from '@/models/app/leagueModel'
import { MatchStatus, type LeagueMatch } from '@/models/app/matchModel'
import type { User } from '@/models/app/userModel'
import { computed } from 'vue'

interface Props {
  leagueMatches?: LeagueMatch[]
  leagueSignUps?: LeagueAssignedUser[]
  currentUser?: User | null
}

interface Emits {
  (event: 'onUpdateMatch', match: LeagueMatch): void
}

const props = defineProps<Props>()
const emits = defineEmits<Emits>()

const sortedLeagueMatches = computed(() => {
  if (!props.leagueMatches) {
    return []
  }

  return props.leagueMatches
    .slice()
    .sort((a) => isUpcomingSort(a))
    .sort((a) => isInProgressSort(a))
})

function isInProgressSort(match: LeagueMatch): number {
  return match.matchStatus === MatchStatus.in_progress ? -1 : 1
}

function isUpcomingSort(match: LeagueMatch): number {
  return match.matchStatus === MatchStatus.upcoming ? -1 : 1
}

function onUpdateMatch(match: LeagueMatch): void {
  emits('onUpdateMatch', match)
}
</script>
<style scoped>
.last-match-spacer:last-child {
  margin-bottom: 0.75rem;
}
</style>
