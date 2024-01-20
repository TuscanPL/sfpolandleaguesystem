<template>
  <div
    class="flex w-full p-10 rounded-[3rem] bg-gradient-to-tr from-gray-300 hover:shadow-lg hover:cursor-pointer transition duration-300 ease-in-out items-center justify-between"
  >
    <span>{{ versusPlayerName }}</span>
    <span>{{ match?.matchStatus }}</span>
  </div>
</template>
<script setup lang="ts">
import { getPlayerNameByDiscordId } from '@/common/tournamentUtils'
import type { LeagueAssignedUser } from '@/models/app/leagueModel'
import type { LeagueMatch } from '@/models/app/matchModel'
import type { User } from '@/models/app/userModel'
import { computed } from 'vue'

interface Props {
  match?: LeagueMatch
  leagueSignUps?: LeagueAssignedUser[]
  currentUser?: User | null
}

const props = defineProps<Props>()

const versusPlayerName = computed(() => {
  return props.currentUser?.userId === props.match?.player1Discordid
    ? getPlayerNameByDiscordId(props.match?.player2Discordid, props.leagueSignUps)
    : getPlayerNameByDiscordId(props.match?.player1Discordid, props.leagueSignUps)
})
</script>
