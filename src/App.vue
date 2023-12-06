<template>
  <div class="basis-16 left-0">
    <sidebar-navigation-component
      class="relative left-0"
      @login="handleLogin"
      @logout="handleLogout"
      :user="userStore.user"
      :is-cookie-present="userStore.isCookiePresent"
      :feature-flag-configuration-state="configurationStore.featureFlagStates"
      :isMobileView="isMobileView"
    />
  </div>
  <div class="basis-auto w-full">
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import SidebarNavigationComponent from '@/components/Sidebar/SidebarNavigationComponent.vue'
import { onMounted, ref, computed } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { useConfigurationStore } from '@/stores/configurationStore'

const userStore = useUserStore()
const configurationStore = useConfigurationStore()

const screenWidth = ref(window.innerWidth)
const isMobileView = computed(() => {
  return screenWidth.value <= 640 ? true : false
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
