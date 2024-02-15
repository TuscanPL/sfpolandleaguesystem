<template>
  <div class="flex w-full relative mt-2" @click="openReportScoresModal">
    <div
      class="flex p-10 rounded-[3rem] bg-gradient-to-tr from-gray-300 hover:shadow-lg hover:cursor-pointer transition duration-300 ease-in-out items-center justify-between w-full"
    >
      <span>{{ versusPlayerName }}</span>
      <span>{{ getMatchStatusTranslation(match?.matchStatus) }}</span>
    </div>
  </div>
  <fwb-modal v-if="isReportScoresCardVisible" @close="closeReportScoresModal">
    <template #header>
      <span class="text-xl">Zaraportuj wynik!</span>
    </template>
    <template #body>
      <report-match-score-component
        :match="currentMatch"
        :player1-name="getPlayerNameByDiscordId(props.currentUser?.userId, props.leagueSignUps)"
        :player2-name="versusPlayerName"
        @on-update-match="onUpdateMatch"
      />
    </template>
  </fwb-modal>
</template>
<script setup lang="ts">
import { getPlayerNameByDiscordId } from '@/common/tournamentUtils'
import type { LeagueAssignedUser } from '@/models/app/leagueModel'
import type { LeagueMatch } from '@/models/app/matchModel'
import type { User } from '@/models/app/userModel'
import { computed, onMounted, ref } from 'vue'
import { getMatchStatusTranslation } from '@/common/utils'
import ReportMatchScoreComponent from './ReportMatchScoreComponent.vue'
import { FwbModal } from 'flowbite-vue'

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

const versusPlayerName = computed(() => {
  return props.currentUser?.userId === props.match?.player1Discordid
    ? getPlayerNameByDiscordId(props.match?.player2Discordid, props.leagueSignUps)
    : getPlayerNameByDiscordId(props.match?.player1Discordid, props.leagueSignUps)
})

onMounted(() => {
  currentMatch.value = props.match
})

function openReportScoresModal(): void {
  isReportScoresCardVisible.value = true
}

function closeReportScoresModal(): void {
  isReportScoresCardVisible.value = false
}

function onUpdateMatch(match: LeagueMatch): void {
  emits('onUpdateMatch', match)
}
</script>
