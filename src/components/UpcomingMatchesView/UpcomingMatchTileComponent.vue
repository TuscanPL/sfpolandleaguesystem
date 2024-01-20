<template>
  <div class="flex w-full relative" @click="isReportScoresCardVisible = !isReportScoresCardVisible">
    <div
      class="flex p-10 rounded-[3rem] bg-gradient-to-tr from-gray-300 hover:shadow-lg hover:cursor-pointer transition duration-300 ease-in-out items-center justify-between w-full"
    >
      <span>{{ versusPlayerName }}</span>
      <span>{{ getMatchStatusTranslation(match?.matchStatus) }}</span>
    </div>
    <report-match-score-component class="top-10 w-3/5 mx-auto" v-if="isReportScoresCardVisible" />
  </div>
</template>
<script setup lang="ts">
import { getPlayerNameByDiscordId } from '@/common/tournamentUtils'
import type { LeagueAssignedUser } from '@/models/app/leagueModel'
import type { LeagueMatch } from '@/models/app/matchModel'
import type { User } from '@/models/app/userModel'
import { computed, onMounted, ref } from 'vue'
import { getMatchStatusTranslation } from '@/common/utils'
import ReportMatchScoreComponent from './ReportMatchScoreComponent.vue'

interface Props {
  match?: LeagueMatch
  leagueSignUps?: LeagueAssignedUser[]
  currentUser?: User | null
}

const props = defineProps<Props>()

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
</script>
