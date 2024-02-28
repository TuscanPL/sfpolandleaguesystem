<template>
  <div class="flex w-full relative mt-2" @click="openReportScoresModal">
    <div :class="tileClass">
      <span>{{ versusPlayerName }}</span>
      <span>{{ matchStatusTranslationLabel }}</span>
    </div>
  </div>
  <fwb-modal v-if="isReportScoresCardVisible" @close="closeReportScoresModal">
    <template #header>
      <span class="text-xl">Zaraportuj wynik!</span>
    </template>
    <template #body>
      <report-match-score-component
        :match="currentMatch"
        :player1="loggedInPlayerStub"
        :player2="versusPlayerStub"
        @on-update-match="onUpdateMatch"
      />
    </template>
  </fwb-modal>
</template>
<script setup lang="ts">
import { getPlayerNameByDiscordId } from '@/common/tournamentUtils'
import type { LeagueAssignedUser } from '@/models/app/leagueModel'
import { MatchStatus, type LeagueMatch } from '@/models/app/matchModel'
import type { User } from '@/models/app/userModel'
import { computed, onMounted, ref } from 'vue'
import { getMatchStatusTranslation } from '@/common/utils'
import ReportMatchScoreComponent from './ReportMatchScoreComponent.vue'
import { FwbModal } from 'flowbite-vue'
import type { PlayerScoreStubModel } from '@/models/app/playerScoreStubModel'
import { getOpposingPlayerName, getWinningPlayerId } from '@/common/matchesHelper'

interface Props {
  match?: LeagueMatch
  leagueSignUps?: LeagueAssignedUser[]
  currentUser?: User | null
}

interface Emits {
  (event: 'onUpdateMatch', match: LeagueMatch): void
}

const props = defineProps<Props>()
const emits = defineEmits<Emits>()

const isReportScoresCardVisible = ref(false)
const currentMatch = ref<LeagueMatch>()
const loggedInPlayerStub = ref<PlayerScoreStubModel>()
const versusPlayerStub = ref<PlayerScoreStubModel>()

const versusPlayerName = computed(() => {
  if (!props.currentUser || !currentMatch.value || !props.leagueSignUps) {
    return ''
  }

  return getOpposingPlayerName(props.currentUser?.userId, currentMatch.value, props.leagueSignUps)
})

const matchStatusTranslationLabel = computed(() => {
  return getMatchStatusTranslation(props.match?.matchStatus)
})

const tileClass = computed(() => {
  return `flex p-10 rounded-[3rem] bg-gradient-to-tr ${determineGradientColor()} hover:shadow-lg hover:cursor-pointer transition duration-300 ease-in-out items-center justify-between w-full`
})

onMounted(() => {
  currentMatch.value = props.match
  loggedInPlayerStub.value = getLoggedInPlayerStub()
  versusPlayerStub.value = getVersusPlayerStub()
})

function getLoggedInPlayerStub(): PlayerScoreStubModel {
  return props.currentUser?.userId === props.match?.player1Discordid
    ? getPlayerStub(currentMatch.value?.player1Discordid, currentMatch.value?.player1Score)
    : getPlayerStub(currentMatch.value?.player2Discordid, currentMatch.value?.player2Score)
}

function getVersusPlayerStub(): PlayerScoreStubModel {
  return props.currentUser?.userId === props.match?.player1Discordid
    ? getPlayerStub(props.match?.player2Discordid, props.match?.player2Score)
    : getPlayerStub(props.match?.player1Discordid, props.match?.player1Score)
}

function openReportScoresModal(): void {
  isReportScoresCardVisible.value = true
}

function closeReportScoresModal(): void {
  isReportScoresCardVisible.value = false
}

function onUpdateMatch(match: LeagueMatch): void {
  emits('onUpdateMatch', match)
}

function getPlayerStub(discordId?: string, score?: number): PlayerScoreStubModel {
  if (discordId === undefined || score === undefined) {
    return {
      playerDiscordId: '',
      playerScore: 0
    }
  }

  return {
    playerDiscordId: discordId,
    playerName: getPlayerNameByDiscordId(discordId, props.leagueSignUps),
    playerScore: score
  }
}

function determineGradientColor() {
  if (!currentMatch.value || currentMatch.value?.matchStatus !== MatchStatus.completed) {
    return 'from-gray-300'
  }

  return getWinningPlayerId(currentMatch.value) === props.currentUser?.userId
    ? 'from-green-300'
    : 'from-red-300'
}
</script>
