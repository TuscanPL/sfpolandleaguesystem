<template>
  <div class="w-full">
    <upcoming-matches-component
      v-for="league in leaguesStore.leagues"
      :key="league.id"
      :league-matches="getPlayerMatchesByLeagueAndUser(league.id)"
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

const matchesStore = useMatchesStore()
const leaguesStore = useLeaguesStore()
const userStore = useUserStore()

function getPlayerMatchesByLeagueAndUser(leagueId: number) {
  return matchesStore.matches.filter((match) => {
    return (
      (match.player1Discordid === userStore.user?.userId ||
        match.player2Discordid === userStore.user?.userId) &&
      match.leagueId === leagueId
    )
  })
}

onMounted(async () => {
  await leaguesStore.getLeagues()
  await matchesStore.getAllMatches()
})

function onUpdateMatch(match: LeagueMatch) {
  matchesStore.updateLeagueMatch(match)
}
</script>
