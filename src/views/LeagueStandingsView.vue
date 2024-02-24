<template>
  <div class="w-full">
    <league-standings-component
      v-for="league in leaguesStore.leagues"
      :key="league.id"
      :league="league"
      :league-matches="matchesStore.matches"
    />
  </div>
</template>
<script setup lang="ts">
import { useLeaguesStore } from '@/stores/leaguesStore'
import { useMatchesStore } from '@/stores/matchesStore'
import { onMounted } from 'vue'
import LeagueStandingsComponent from '@/components/LeagueStandingsView/LeagueStandingsComponent.vue'

const leaguesStore = useLeaguesStore()
const matchesStore = useMatchesStore()

onMounted(async () => {
  await leaguesStore.getLeagues()
  await matchesStore.getAllMatches()
})
</script>
<style lang="css"></style>
