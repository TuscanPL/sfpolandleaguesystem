<template>
  <div class="w-full">
    <upcoming-matches-component
      v-for="league in leaguesStore.leagues"
      :key="league.id"
      :league-matches="getLoggedInPlayerMatchesByLeague(league.id)"
      :current-user="userStore.user"
      :league-sign-ups="league.leagueSignUps"
      @on-update-match="onUpdateMatch"
    />
  </div>
</template>
<script setup lang="ts">
import UpcomingMatchesComponent from '@/components/UpcomingMatchesView/UpcomingMatchesComponent.vue'
import { useMatchesStore } from '@/stores/matchesStore'
import { useLeaguesStore } from '@/stores/leaguesStore'
import { onMounted } from 'vue'
import { useUserStore } from '@/stores/userStore'
import type { LeagueMatch } from '@/models/app/matchModel'
import { getPlayerMatchesByLeague } from '@/common/matchesHelper'

const matchesStore = useMatchesStore()
const leaguesStore = useLeaguesStore()
const userStore = useUserStore()

function getLoggedInPlayerMatchesByLeague(leagueId: number): LeagueMatch[] {
  if (!userStore.user) {
    return []
  }

  return getPlayerMatchesByLeague(leagueId, userStore.user?.userId, matchesStore.matches)
}

onMounted(async () => {
  await leaguesStore.getLeagues()
  await matchesStore.getAllMatches()
})

function onUpdateMatch(match: LeagueMatch) {
  matchesStore.updateLeagueMatch(match)
}
</script>
