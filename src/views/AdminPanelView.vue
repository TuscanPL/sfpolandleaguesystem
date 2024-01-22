<template>
  <div class="p-3">
    <LeagueManagementTableComponent
      :leagues="leagueStore.leagues"
      :matches="matchesStore.matches"
      @on-open-league-modal="handleOpenLeagueModal"
      @on-start-league="handleOpenStartLeagueConfirmationModal"
      @on-stop-league="handleOpenStopLeagueConfirmationModal"
      @on-remove-league="handleRemoveLeagueFromTable"
      @on-edit-match="updateMatch"
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
    <ConfirmationModalComponent
      :is-open="isConfirmLeagueStartModalOpen"
      :title="currentEditingLeagueTitle"
      :text="startLeagueConfirmationModalText"
      confirm-button-text="Wystartuj ligę"
      cancel-button-text="Anuluj"
      @on-confirm="handleStartLeague(leagueToEdit?.id)"
      @on-cancel="isConfirmLeagueStartModalOpen = false"
    />
    <ConfirmationModalComponent
      :is-open="isConfirmLeagueStopModalOpen"
      :title="currentEditingLeagueTitle"
      :text="stopLeagueConfirmationModalText"
      subtext="Uwaga: zatrzymanie ligi spowoduje usunięcie wszystkich jej wyników."
      confirm-button-text="Zatrzymaj ligę"
      cancel-button-text="Anuluj"
      @on-confirm="handleStopLeague(leagueToEdit?.id)"
      @on-cancel="isConfirmLeagueStopModalOpen = false"
    />
  </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { routerPaths } from '@/router/routes'
import { useLeaguesStore } from '@/stores/leaguesStore'
import LeagueManagementTableComponent from '@/components/AdminPanelView/LeagueManagementTableComponent.vue'
import CreateOrEditLeagueModalComponent from '@/components/AdminPanelView/CreateOrEditLeagueModalComponent.vue'
import type { LeagueStub } from '@/models/app/leagueStubModel'
import type { League } from '@/models/app/leagueModel'
import RemoveLeagueConfirmationModalComponent from '@/components/AdminPanelView/RemoveLeagueConfirmationModalComponent.vue'
import ConfirmationModalComponent from '@/components/common/ConfirmationModalComponent.vue'
import { useMatchesStore } from '@/stores/matchesStore'
import type { LeagueMatch } from '@/models/app/matchModel'

const userStore = useUserStore()
const leagueStore = useLeaguesStore()
const matchesStore = useMatchesStore()
const router = useRouter()

const isCreateOrEditLeagueModalOpen = ref(false)
const isRemoveLeagueConfirmationModalOpen = ref(false)
const isConfirmLeagueStartModalOpen = ref(false)
const isConfirmLeagueStopModalOpen = ref(false)

const leagueToEdit = ref<League | undefined>(undefined)

const currentEditingLeagueTitle = computed(() => {
  return leagueToEdit.value?.leagueName ?? ''
})

const startLeagueConfirmationModalText = computed(() => {
  return `Czy chcesz wystartować ligę ${leagueToEdit.value?.leagueName ?? ''}?`
})

const stopLeagueConfirmationModalText = computed(() => {
  return `Czy chcesz zatrzymać ligę ${leagueToEdit.value?.leagueName ?? ''}?`
})

watch(
  leagueStore.leagues,
  () => {
    updateEditingLeague()
  },
  { deep: true }
)

onMounted(() => {
  if (!userStore.isAdmin) {
    router.push(routerPaths.home)
  }

  leagueStore.getLeagues()
  leagueStore.subscribeToLeagues()

  matchesStore.getAllMatches()
  matchesStore.subscribeToMatches()
})

onUnmounted(() => {
  leagueStore.unsubscribeFromLeagues()
  matchesStore.unsubscribeFromMatches()
})

function handleOpenStartLeagueConfirmationModal(leagueId?: number) {
  if (!leagueId) {
    return // todo: handle error
  }

  setEditingLeague(leagueId)
  isConfirmLeagueStartModalOpen.value = true
}

function handleOpenStopLeagueConfirmationModal(leagueId?: number) {
  if (!leagueId) {
    return // todo: handle error
  }

  setEditingLeague(leagueId)
  isConfirmLeagueStopModalOpen.value = true
}

function handleOnOpenConfirmationModal() {
  isRemoveLeagueConfirmationModalOpen.value = true
  isCreateOrEditLeagueModalOpen.value = false
}

function handleOpenLeagueModal(league?: League) {
  leagueToEdit.value = league
  isCreateOrEditLeagueModalOpen.value = true
}

async function handleStartLeague(leagueId?: number) {
  if (!leagueId) {
    return // todo: handle error
  }

  await leagueStore.startLeague(leagueId)
  isConfirmLeagueStartModalOpen.value = false
}

async function handleStopLeague(leagueId?: number) {
  if (!leagueId) {
    return // todo: handle error
  }

  await leagueStore.stopLeague(leagueId)
  isConfirmLeagueStopModalOpen.value = false
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

async function updateMatch(match: LeagueMatch) {
  await matchesStore.updateLeagueMatch(match)
}

function updateEditingLeague() {
  leagueToEdit.value = leagueStore.leagues.find((l) => l.id === leagueToEdit.value?.id)
}

function setEditingLeague(leagueId: number) {
  leagueToEdit.value = leagueStore.leagues.find((l) => l.id === leagueId)
}
</script>
<style lang=""></style>
