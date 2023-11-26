<template>
  <div class="basis-16 left-0">
    <sidebar-navigation-component
      class="relative left-0"
      @login="handleLogin"
      @logout="handleLogout"
      :user="userStore.user"
      :is-main-page-visible="configurationStore.isMainPageVisible"
      :is-league-page-visible="configurationStore.isLeaguePageVisible"
      :is-report-scores-page-visible="configurationStore.isReportScoresVisible"
      :is-settings-page-visible="configurationStore.isSettingsVisible"
      :is-upcoming-matches-page-visible="configurationStore.isUpcomingMatchVisible"
      :is-sign-up-page-visible="configurationStore.isSignUpVisible"
    />
  </div>
  <div class="basis-auto w-full">
    <router-view />
  </div>
</template>
<script setup lang="ts">
import { RouterView } from 'vue-router'
import SidebarNavigationComponent from '@/components/Sidebar/SidebarNavigationComponent.vue'
import { computed, onMounted, watch } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { useConfigurationStore } from '@/stores/configurationStore'
import { getUserCookie } from '@/common/cookieHelper'

const userStore = useUserStore()
const configurationStore = useConfigurationStore()

const isCookiePresent = computed(() => {
  return getUserCookie() !== null
})

watch(isCookiePresent, () => {
  userStore.initalizeUser()
})

onMounted(() => {
  userStore.initalizeUser()
  configurationStore.initializeConfigurationValues()
})

async function handleLogin() {
  await userStore.signInWithDiscord()
}

async function handleLogout() {
  await userStore.signOut()
}
</script>
