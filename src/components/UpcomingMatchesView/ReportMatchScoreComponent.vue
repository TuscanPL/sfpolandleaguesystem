<template>
  <div class="flex w-full flex-wrap">
    <fwb-button
      v-if="match?.matchStatus === MatchStatus.completed"
      class="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition"
      disabled
    >
      <span>Mecz zakończony <v-icon name="la-flag-checkered-solid" /></span>
    </fwb-button>
    <fwb-button
      v-else-if="match?.matchStatus === MatchStatus.upcoming"
      class="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition"
      @click="setMatchStarted"
    >
      <span>Rozpocznij mecz <v-icon name="la-fist-raised-solid" /></span>
    </fwb-button>
    <fwb-button
      v-else
      class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition"
      @click="setMatchEnded"
    >
      <span>Zapisz mecz <v-icon name="la-save-solid" /></span>
    </fwb-button>
    <div class="mt-10 w-full flex justify-between align-middle">
      <fwb-input
        :disabled="!isMatchStarted"
        type="number"
        v-model="player1Score"
        :label="getPlayerNameLabel(player1Data?.playerName)"
      />
      <fwb-input
        :disabled="!isMatchStarted"
        type="number"
        v-model="player2Score"
        :label="getPlayerNameLabel(player2Data?.playerName)"
      />
    </div>
    <div class="w-full flex mt-10">
      <fwb-input
        :disabled="!isMatchStarted"
        class="w-full"
        v-model="replayIds"
        label="Powtórki"
        placeholder="Wprowadź powtórki oddzielone przecinkiem"
      />
      <fwb-button
        :disabled="!isMatchStarted"
        @click="addReplayIds"
        class="ml-2 h-[42px] self-end bg-green-500 hover:bg-green-700 text-white rounded transition"
      >
        <v-icon name="la-plus-solid" />
      </fwb-button>
    </div>
    <div v-if="isBadgeSectionVisible" class="w-full flex mt-3">
      <fwb-badge
        v-bind:key="replayId"
        v-for="replayId in match?.replayIds"
        @click="removeReplayId(replayId)"
        class="hover:shadow-lg hover:cursor-pointer transition duration-300 ease-in-out"
      >
        {{ replayId }}
      </fwb-badge>
    </div>
    <confirmation-modal-component
      :is-open="isConfirmationModalOpen"
      title="Błąd"
      :text="errorInReplayIdsText"
      confirm-button-text="Ok"
      @onConfirm="onCloseConfirmationModal"
    />
  </div>
</template>
<script setup lang="ts">
import ConfirmationModalComponent from '@/components/common/ConfirmationModalComponent.vue'
import { MatchStatus, type LeagueMatch } from '@/models/app/matchModel'
import type { PlayerScoreStubModel } from '@/models/app/playerScoreStubModel'
import { FwbButton, FwbInput, FwbBadge } from 'flowbite-vue'
import { computed, onMounted, ref, watch } from 'vue'

interface Props {
  player1?: PlayerScoreStubModel
  player2?: PlayerScoreStubModel
  match?: LeagueMatch
}

interface Emits {
  (event: 'onUpdateMatch', match: LeagueMatch): void
}

const props = defineProps<Props>()
const emits = defineEmits<Emits>()

const player1Data = ref<PlayerScoreStubModel>()
const player2Data = ref<PlayerScoreStubModel>()
const player1Score = ref('0')
const player2Score = ref('0')
const replayIds = ref<string>()
const editingMatch = ref<LeagueMatch>()
const isConfirmationModalOpen = ref(false)
const incorrectReplayIds = ref<string[]>([])

const errorInReplayIdsText = computed(() => {
  return `Źle wprowadzone identyfikatory powtórek: ${incorrectReplayIds.value?.join(', ')}`
})

const isBadgeSectionVisible = computed(() => {
  return (
    editingMatch.value?.replayIds?.length !== undefined && editingMatch.value?.replayIds?.length > 0
  )
})

const isMatchStarted = computed(() => {
  return editingMatch.value?.matchStatus === MatchStatus.in_progress
})

onMounted(() => {
  editingMatch.value = props.match
  player1Data.value = props.player1
  player2Data.value = props.player2

  player1Score.value = props.player1?.playerScore?.toString() ?? '0'
  player2Score.value = props.player2?.playerScore?.toString() ?? '0'
})

watch(player1Score, () => {
  if (!player1Data.value) {
    return
  }

  player1Data.value.playerScore = parseInt(player1Score.value)
})

watch(player2Score, () => {
  if (!player2Data.value) {
    return
  }

  player2Data.value.playerScore = parseInt(player2Score.value)
})

function getPlayerNameLabel(playerName?: string): string {
  return `${playerName} (Wynik)`
}

function setMatchStarted(): void {
  if (!editingMatch.value) {
    return
  }

  editingMatch.value.matchStatus = MatchStatus.in_progress
}

function setMatchEnded(): void {
  if (!editingMatch.value) {
    return
  }

  assignPlayerScoreOnMatchEnded()
  determineMatchState()

  emits('onUpdateMatch', editingMatch.value)

  function assignPlayerScoreOnMatchEnded(): void {
    if (!editingMatch.value || !player1Data.value || !player2Data.value) {
      return
    }

    if (player1Data.value.playerDiscordId === editingMatch.value.player1Discordid) {
      editingMatch.value.player1Score = player1Data.value.playerScore ?? 0
      editingMatch.value.player2Score = player2Data.value.playerScore ?? 0
    } else {
      editingMatch.value.player2Score = player1Data.value.playerScore ?? 0
      editingMatch.value.player1Score = player2Data.value.playerScore ?? 0
    }
  }
}

function addReplayIds(): void {
  if (!replayIds.value || !editingMatch?.value?.replayIds) {
    return
  }

  const replays = replayIds.value.replace(/ /g, '').split(',')
  if (replays.length <= 0) {
    return
  }

  if (!validateReplayIds(replays)) {
    isConfirmationModalOpen.value = true
    return
  }

  editingMatch.value.replayIds.push(...replays)
  replayIds.value = ''
}

function removeReplayId(replayId: string): void {
  if (
    !editingMatch?.value?.replayIds ||
    editingMatch.value.matchStatus !== MatchStatus.in_progress
  ) {
    return
  }

  editingMatch.value.replayIds = editingMatch.value.replayIds.filter((id) => id !== replayId)
}

function validateReplayIds(replays: string[]): boolean {
  const regex = new RegExp('^[a-zA-Z0-9]{9}$')
  let isValid = true

  for (const replay of replays) {
    if (!regex.test(replay)) {
      isValid = false
      incorrectReplayIds.value.push(replay)
    }
  }

  return isValid
}

function onCloseConfirmationModal(): void {
  isConfirmationModalOpen.value = false
  incorrectReplayIds.value = []
}

function determineMatchState() {
  if (!editingMatch.value) {
    return
  }

  const player1ScoreTemp = editingMatch.value.player1Score
  const player2ScoreTemp = editingMatch.value.player2Score

  if (player1ScoreTemp < 7 && player2ScoreTemp < 7) {
    editingMatch.value.matchStatus = MatchStatus.in_progress
    return
  }

  if (Math.abs(player1ScoreTemp - player2ScoreTemp) >= 2 && !isAnyScoreOver7()) {
    editingMatch.value.matchStatus = MatchStatus.completed
    return
  }

  if (player1ScoreTemp === 10 || player2ScoreTemp === 10) {
    editingMatch.value.matchStatus = MatchStatus.completed
    return
  }

  editingMatch.value.matchStatus = MatchStatus.in_progress

  function isAnyScoreOver7(): boolean {
    return player1ScoreTemp > 7 || player2ScoreTemp > 7
  }
}
</script>
