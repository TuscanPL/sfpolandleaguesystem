<template>
  <div class="p-3">
    <LeagueManagementTableComponent
      :leagues="leagueStore.leagues"
      :onOnOpenLeagueModal="handleOpenLeagueModal"
    />
    <CreateOrEditLeagueModalComponent
      :isOpen="isCreateOrEditLeagueModalOpen"
      :league="leagueToEdit"
      @onAdd="handleAddLeague"
      @onEdit="handleEditLeague"
      @onRemoveUserFromLeague="handleRemoveUserFromLeague"
      @onRemoveLeague="handleRemoveLeague"
      @close="isCreateOrEditLeagueModalOpen = false"
    />
  </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import { onMounted, ref } from 'vue'
import { routerPaths } from '@/router/routes'
import { useLeaguesStore } from '@/stores/leaguesStore'
import LeagueManagementTableComponent from '@/components/AdminPanelView/LeagueManagementTableComponent.vue'
import CreateOrEditLeagueModalComponent from '@/components/AdminPanelView/CreateOrEditLeagueModalComponent.vue'
import type { LeagueStub } from '@/models/app/leagueStubModel'
import type { League } from '@/models/app/leagueModel'

const userStore = useUserStore()
const leagueStore = useLeaguesStore()
const router = useRouter()

const isCreateOrEditLeagueModalOpen = ref(false)
const leagueToEdit = ref<League | undefined>(undefined)

onMounted(() => {
  // if (!userStore.isAdmin) {
  //   router.push(routerPaths.home)
  // }

  leagueStore.getLeagues()
})

function handleOpenLeagueModal(league?: League) {
  leagueToEdit.value = league
  isCreateOrEditLeagueModalOpen.value = true
}

function handleAddLeague(league: LeagueStub) {
  leagueStore.createLeague(
    league.leagueName,
    new Date(league.leagueStartDate),
    new Date(league.leagueEndDate)
  )

  isCreateOrEditLeagueModalOpen.value = false
}

function handleEditLeague(league: LeagueStub) {
  if (league.id === undefined) {
    return // todo: handle error
  }

  leagueStore.updateLeague(
    league.id,
    league.leagueName,
    new Date(league.leagueStartDate),
    new Date(league.leagueEndDate)
  )

  isCreateOrEditLeagueModalOpen.value = false
}

function handleRemoveUserFromLeague(userId: string, leagueId: number) {
  leagueStore.removeFromLeague(leagueId, userId)
}

function handleRemoveLeague(leagueId: number) {
  leagueStore.deleteLeague(leagueId)
}
</script>
<style lang=""></style>
