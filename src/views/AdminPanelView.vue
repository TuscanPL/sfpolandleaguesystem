<template>
  <div class="p-3">
    <LeagueManagementTableComponent
      :leagues="leagueStore.leagues"
      @on-open-league-modal="handleOpenLeagueModal"
      @on-start-league="handleStartLeague"
      @on-stop-league="handleStopLeague"
      @on-remove-league="handleRemoveLeagueFromTable"
    />
    <CreateOrEditLeagueModalComponent
      :isOpen="isCreateOrEditLeagueModalOpen"
      :league="leagueToEdit"
      @onAdd="handleAddLeague"
      @onEdit="handleEditLeague"
      @onRemoveUserFromLeague="handleRemoveUserFromLeague"
      @close="isCreateOrEditLeagueModalOpen = false"
      @on-open-confirmation-modal="handleOnOpenConfirmationModal"
    />
    <RemoveLeagueConfirmationModalComponent
      :leagueName="leagueToEdit?.leagueName ?? ''"
      :leagueId="leagueToEdit?.id ?? 0"
      :isOpen="isRemoveLeagueConfirmationModalOpen"
      @onRemoveLeague="handleRemoveLeague"
      @close="isRemoveLeagueConfirmationModalOpen = false"
      />
  </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { routerPaths } from '@/router/routes'
import { useLeaguesStore } from '@/stores/leaguesStore'
import LeagueManagementTableComponent from '@/components/AdminPanelView/LeagueManagementTableComponent.vue'
import CreateOrEditLeagueModalComponent from '@/components/AdminPanelView/CreateOrEditLeagueModalComponent.vue'
import type { LeagueStub } from '@/models/app/leagueStubModel'
import type { League } from '@/models/app/leagueModel'
import RemoveLeagueConfirmationModalComponent from '@/components/AdminPanelView/RemoveLeagueConfirmationModalComponent.vue'

const userStore = useUserStore()
const leagueStore = useLeaguesStore()
const router = useRouter()

const isCreateOrEditLeagueModalOpen = ref(false)
const isRemoveLeagueConfirmationModalOpen = ref(false)
const leagueToEdit = ref<League | undefined>(undefined)

watch(leagueStore.leagues, () => {
  updateEditingLeague()
}, { deep: true })

onMounted(() => {
  if (!userStore.isAdmin) {
    router.push(routerPaths.home)
  }

  leagueStore.getLeagues()
  leagueStore.subscribeToLeagues()
})

onUnmounted(() => {
  leagueStore.unsubscribeFromLeagues()
})

function handleOnOpenConfirmationModal() {
  isRemoveLeagueConfirmationModalOpen.value = true
  isCreateOrEditLeagueModalOpen.value = false
}

function handleOpenLeagueModal(league?: League) {
  leagueToEdit.value = league
  isCreateOrEditLeagueModalOpen.value = true
}

async function handleStartLeague(leagueId: number) {
  await leagueStore.startLeague(leagueId)
}

async function handleStopLeague(leagueId: number) {
  await leagueStore.stopLeague(leagueId)
}

function handleRemoveLeagueFromTable(leagueId: number) {
  leagueToEdit.value = leagueStore.leagues.find((l) => l.id === leagueId)
  updateEditingLeague()
  handleOnOpenConfirmationModal()
}

async function handleAddLeague(league: LeagueStub) {
  await leagueStore.createLeague(
    league.leagueName,
    new Date(league.leagueStartDate),
    new Date(league.leagueEndDate)
  )

  isCreateOrEditLeagueModalOpen.value = false
}

async function handleEditLeague(league: LeagueStub) {
  if (league.id === undefined) {
    return // todo: handle error
  }

  await leagueStore.updateLeague(
    league.id,
    league.leagueName,
    new Date(league.leagueStartDate),
    new Date(league.leagueEndDate)
  )

  isCreateOrEditLeagueModalOpen.value = false
}

async function handleRemoveUserFromLeague(userId: string, leagueId: number) {
  await leagueStore.removeFromLeague(leagueId, userId)
  leagueToEdit.value?.leagueSignUps.splice(
    leagueToEdit.value?.leagueSignUps.findIndex((u) => u.discordUserId === userId),
    1
  )
}

async function handleRemoveLeague(leagueId: number) {
  await leagueStore.deleteLeague(leagueId)
  isRemoveLeagueConfirmationModalOpen.value = false
}

function updateEditingLeague() {
  leagueToEdit.value = leagueStore.leagues.find((l) => l.id === leagueToEdit.value?.id)
}
</script>
<style lang=""></style>
