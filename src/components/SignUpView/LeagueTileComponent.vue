<template>
  <div
    class="w-full xl:w-4/5 xl:m-4 p-3 xl:rounded-2xl relative xl:border xl:shadow-md transition max-h-screen"
  >
    <div class="row mt-2">
      <span class="text-2xl font-medium">{{ league.leagueName }}</span>
    </div>
    <div class="row xl:flex mt-10 w-full">
      <fwb-badge type="dark" class="rounded-full p-1 text-sm w-full xl:w-1/5">
        <template #icon>
          <v-icon class="mr-2" name="la-clock-solid" />
        </template>
        {{ league.leagueStartDate.toDateString() }}
      </fwb-badge>
      <fwb-badge type="dark" class="rounded-full p-1 text-sm mt-2 xl:mt-0 w-full xl:w-1/5">
        <template #icon>
          <v-icon class="mr-2" name="la-calendar-times" />
        </template>
        {{ league.leagueEndDate.toDateString() }}
      </fwb-badge>
      <fwb-badge type="dark" class="rounded-full p-1 text-sm mt-2 xl:mt-0 w-full xl:w-1/5">
        <template #icon>
          <v-icon class="mr-2" name="la-user-solid" />
        </template>
        {{ signedUpUsersAmount }}
      </fwb-badge>
      <div v-if="isUserLoggedIn" class="xl:w-1/5 mt-2 xl:mt-0 xl:ml-auto">
        <fwb-badge
          v-if="!isUserSignedUp"
          type="green"
          class="rounded-full p-1 text-sm w-full hover:bg-green-200 hover:shadow-md hover:cursor-pointer transition"
          @click="handleLeagueSignUpCallback"
        >
          <template #icon>
            <v-icon class="mr-2" name="la-fist-raised-solid" />
          </template>
          Zapisz się!
        </fwb-badge>
        <fwb-badge
          v-else
          type="red"
          class="rounded-full p-1 text-sm w-full hover:bg-red-200 hover:shadow-md hover:cursor-pointer transition"
          @click="handleLeagueSignOutCallback"
        >
          <template #icon>
            <v-icon class="mr-2" name="la-minus-circle-solid" />
          </template>
          Wypisz się
        </fwb-badge>
      </div>
    </div>
    <signed-up-table-component
      v-if="league.leagueSignUps.length"
      :signed-up-users="league.leagueSignUps"
      class="mt-3"
    />
  </div>
</template>
<script setup lang="ts">
import type { League } from '@/models/app/leagueModel'
import type { User } from '@/models/app/userModel'
import { FwbBadge } from 'flowbite-vue'
import { computed } from 'vue'
import SignedUpTableComponent from './SignedUpTableComponent.vue'

interface Props {
  league: League
  user: User
}

interface Emits {
  (e: 'league-sign-up-clicked'): void
  (e: 'league-sign-out-clicked'): void
}

const props = defineProps<Props>()
const emits = defineEmits<Emits>()

const signedUpUsersAmount = computed(() => {
  const playerAmount = props.league.leagueSignUps.length
  if (playerAmount === 1) return '1 gracz'

  return playerAmount ? `${playerAmount} graczy` : 'Brak zapisanych graczy'
})

const isUserSignedUp = computed(() => {
  return props.league.leagueSignUps.filter((c) => c.discordUserId === props.user.userId).length
})

const isUserLoggedIn = computed(() => {
  return Object.keys(props.user).length > 0
})

function handleLeagueSignUpCallback() {
  emits('league-sign-up-clicked')
}

function handleLeagueSignOutCallback() {
  emits('league-sign-out-clicked')
}
</script>
<style scoped>
.closed {
  max-height: 0px;
}

.open {
  max-height: 4000px;
}
</style>
