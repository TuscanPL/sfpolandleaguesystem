<template>
    <fwb-sidebar class="sidebar-option">
        <fwb-sidebar-logo logo="logo.png" name="Liga SFPL" tag="router-link"/>
        <fwb-button v-if="!userStore.user" @click="handleLogin" class="w-full">Zaloguj się</fwb-button>
        <span v-if="userStore.user">{{ userStore.user?.globalName }}</span>
        <sidebar-item label="Strona główna" icon="la-book-open-solid" @click="goTo(routerPaths.home)" />
        <sidebar-item label="Liga" icon="la-fist-raised-solid" @click="goTo(routerPaths.leagueStandings)" />
        <sidebar-item label="Nadchodzące mecze" icon="la-calendar-alt-solid" @click="goTo(routerPaths.upcomingMatches)" />
        <sidebar-item label="Zaraportuj wynik" icon="la-clipboard-check-solid" @click="goTo(routerPaths.reportScores)" />
        <sidebar-item label="Ustawienia" icon="la-user-cog-solid" @click="goTo(routerPaths.userSettings)" />
        <fwb-button v-if="userStore.user" @click="handleLogout" class="w-full" color="red">Wyloguj się</fwb-button>
    </fwb-sidebar>
</template>
<script setup lang="ts">
import { FwbSidebar, FwbSidebarLogo, FwbButton } from 'flowbite-vue';
import SidebarItem from '@/components/Sidebar/SidebarItem.vue'
import { routerPaths } from '@/router/routes'
import { goTo } from '@/common/routeHelper'
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()

async function handleLogin() {
    await userStore.signInWithDiscord()
}

async function handleLogout() {
    await userStore.signOut()
}
</script>
<style lang="css">
</style>