<template>
    <div class="w-4/5 m-4 p-3 rounded-2xl border shadow-md">
        <div class="row mt-2">
            <span class="text-2xl font-medium">{{ league.leagueName }}</span>
        </div>
        <div class="row flex mt-10 w-full">
            <fwb-badge type="dark" class="rounded-full p-1 text-sm w-1/5">
                <template #icon>
                    <v-icon class="mr-2" name="la-clock-solid" />
                </template>
                {{ league.leagueStartDate.toDateString() }}
            </fwb-badge>
            <fwb-badge type="dark" class="rounded-full p-1 text-sm w-1/5">
                <template #icon>
                    <v-icon class="mr-2" name="la-calendar-times" />
                </template>
                {{ league.leagueEndDate.toDateString() }}
            </fwb-badge>
            <fwb-badge type="dark" class="rounded-full p-1 text-sm w-1/5">
                <template #icon>
                    <v-icon class="mr-2" name="la-user-solid" />
                </template>
                {{ signedUpUsersAmount }}
            </fwb-badge>
            <fwb-badge v-if="!isUserSignedUp" type="green" class="rounded-full p-1 text-sm w-1/5 ml-auto hover:bg-green-300 hover:shadow-md hover:cursor-pointer transition" @click="handleLeagueSignUpCallback">
                <template #icon>
                    <v-icon class="mr-2" name="la-fist-raised-solid" />
                </template>
                Zapisz się!
            </fwb-badge>
            <fwb-badge v-else type="red" class="rounded-full p-1 text-sm w-1/5 ml-auto hover:bg-red-300 hover:shadow-md hover:cursor-pointer transition" @click="handleLeagueSignOutCallback">
                <template #icon>
                    <v-icon class="mr-2" name="la-minus-circle-solid" />
                </template>
                Wypisz się
            </fwb-badge>
        </div>
    </div>
</template>
<script setup lang="ts">
import type { League } from '@/models/app/leagueModel';
import type { User } from '@/models/app/userModel';
import { FwbBadge } from 'flowbite-vue';
import { computed } from 'vue';

interface Props {
    league: League,
    user: User
}

interface Emits {
    (e: 'league-sign-up-clicked'): void,
    (e: 'league-sign-out-clicked'): void
}

const props = defineProps<Props>()
const emits = defineEmits<Emits>()

const signedUpUsersAmount = computed(() => {
    const playerAmount = props.league.leagueSignUps.length
    if (playerAmount === 1) 
        return '1 gracz'
    
    return playerAmount ? `${playerAmount} graczy` : 'Brak zapisanych graczy'
})

const isUserSignedUp = computed(() => {
    return props.league.leagueSignUps.filter(c => c.discordName === props.user.globalName).length
})

function handleLeagueSignUpCallback(){
    emits('league-sign-up-clicked')
}

function handleLeagueSignOutCallback(){
    emits('league-sign-out-clicked')
}
</script>