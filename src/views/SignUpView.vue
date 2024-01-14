<template>
  <div class="w-full">
    <league-tile-component
      v-for="league in leagueStore.leagues"
      :key="league.id"
      :league="league"
      :user="user"
      @league-sign-up-clicked="handleLeagueSignUp(league.id)"
      @league-sign-out-clicked="handleLeagueSignOut(league.id)"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed, onUnmounted } from 'vue'
import { useLeaguesStore } from '@/stores/leaguesStore'
import LeagueTileComponent from '@/components/SignUpView/LeagueTileComponent.vue'
import { useUserStore } from '@/stores/userStore'
import type { User } from '@/models/app/userModel'

const leagueStore = useLeaguesStore()
const userStore = useUserStore()

const user = computed(() => {
  return userStore.user ?? ({} as User)
})

onMounted(() => {
  leagueStore.getLeagues()
  leagueStore.subscribeToLeagues()
})

onUnmounted(() => {
  leagueStore.unsubscribeFromLeagues()
})

async function handleLeagueSignUp(leagueId: number) {
  if (!userStore.user) return

  await leagueStore.signUpForLeague(leagueId, userStore.user.globalName, userStore.user.avatarUrl)
}

async function handleLeagueSignOut(leagueId: number) {
  if (!userStore.user) return

  await leagueStore.signOutFromLeague(leagueId)
}
</script>
