<template>
  <div class="p-3">
    <LeagueManagementTableComponent :leagues="leagueStore.leagues" />
  </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import { onMounted } from 'vue'
import { routerPaths } from '@/router/routes'
import { useLeaguesStore } from '@/stores/leaguesStore'
import LeagueManagementTableComponent from '@/components/AdminPanelView/LeagueManagementTableComponent.vue'

const userStore = useUserStore()
const leagueStore = useLeaguesStore()
const router = useRouter()

onMounted(() => {
  // if (!userStore.isAdmin) {
  //   router.push(routerPaths.home)
  // }

  leagueStore.getLeagues()
})
</script>
<style lang=""></style>
