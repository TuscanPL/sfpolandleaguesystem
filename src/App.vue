<template>
  <div class="w-full" v-if="isMobileView">
    <div class="left-0 top-0 absolute z-20 w-full">
      <div
        :class="drawerClass"
        class="absolute top-0 h-screen bg-white transform drop-shadow-md w-full"
        tabindex="-1"
        aria-labelledby="drawer-label"
      >
        <sidebar-navigation-component
          class="relative left-0 w-full"
          @login="handleLogin"
          @logout="handleLogout"
          :user="userStore.user"
          :is-cookie-present="userStore.isCookiePresent"
          :feature-flag-configuration-state="configurationStore.featureFlagStates"
          :isMobileView="isMobileView"
          @click="hideDrawer"
        />
      </div>
    </div>
    <div>
      <router-view class="mb-20" />
      <fwb-footer class="fixed bottom-0 w-full border-t rounded-none">
        <v-icon name="la-bars-solid" id="toggleButton" @click="toggleDrawer" />
      </fwb-footer>
    </div>
  </div>
  <div class="flex w-full" v-else>
    <div class="basis-16 left-0 w-64">
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
    <div class="basis-auto w-full" @click="hideDrawer">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import SidebarNavigationComponent from '@/components/Sidebar/SidebarNavigationComponent.vue'
import { onMounted, ref, computed } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { useConfigurationStore } from '@/stores/configurationStore'
import { FwbFooter } from 'flowbite-vue'
import { useEventListener } from '@vueuse/core'

const userStore = useUserStore()
const configurationStore = useConfigurationStore()

const windowWidth = ref(window.innerWidth)
const isDrawerOpen = ref(false)

const isMobileView = computed(() => {
  return windowWidth.value <= 1170
})

const drawerClass = computed(() => {
  return {
    'transition-transform ease-in-out duration-300': true,
    'translate-x-0': isDrawerOpen.value,
    '-translate-x-full': !isDrawerOpen.value
  }
})

onMounted(() => {
  addEventListeners()

  userStore.initalizeUser()
  configurationStore.initializeConfigurationValues()
})

async function handleLogin() {
  await userStore.signInWithDiscord()
}

async function handleLogout() {
  await userStore.signOut()
}

function addEventListeners() {
  useEventListener(window, 'resize', setWindowWidth)
}

function setWindowWidth() {
  windowWidth.value = window.innerWidth
}

function toggleDrawer() {
  isDrawerOpen.value = !isDrawerOpen.value
}

function hideDrawer() {
  isDrawerOpen.value = false
}
</script>
