<template>
  <fwb-sidebar class="sidebar-option">
    <fwb-sidebar-logo logo="logo.png" name="Liga SFPL" tag="router-link" />
    <fwb-button v-if="!user" @click="handleLoginClicked" class="w-full">Zaloguj się</fwb-button>
    <sidebar-mobile-menu
      v-if="isMobileView"
      type="button"
      @click="handleToggleDrawer"
      class="z-30"
    />

    <div
      :class="{
        'transition-transform ease-in-out duration-300': true,
        'translate-x-0': isDrawerOpen,
        '-translate-x-full': !isDrawerOpen
      }"
      id="drawer-example"
      class="absolute top-0 left-0 z-20 h-screen p-4 overflow-y-auto bg-white w-80 dark:bg-gray-800 transform"
      tabindex="-1"
      aria-labelledby="drawer-label"
    >
      <div class="drawer-content">
        <sidebar-item-component
          v-if="featureFlagConfigurationState.isMainPageVisible"
          label="Strona główna"
          icon="la-book-open-solid"
          @click="goTo(routerPaths.home)"
        />
        <sidebar-item-component
          v-if="featureFlagConfigurationState.isLeaguePageVisible"
          label="Liga"
          icon="la-fist-raised-solid"
          @click="goTo(routerPaths.leagueStandings)"
        />
        <sidebar-item-component
          v-if="featureFlagConfigurationState.isUpcomingMatchesVisible"
          label="Nadchodzące mecze"
          icon="la-calendar-alt-solid"
          @click="goTo(routerPaths.upcomingMatches)"
        />
        <sidebar-item-component
          v-if="featureFlagConfigurationState.isReportScoresVisible"
          label="Zaraportuj wynik"
          icon="la-clipboard-check-solid"
          @click="goTo(routerPaths.reportScores)"
        />
        <sidebar-item-component
          v-if="featureFlagConfigurationState.isSettingsVisible"
          label="Ustawienia"
          icon="la-user-cog-solid"
          @click="goTo(routerPaths.userSettings)"
        />
        <sidebar-item-component
          v-if="featureFlagConfigurationState.isSignUpVisible"
          label="Zapisz się"
          icon="la-file-signature-solid"
          @click="goTo(routerPaths.signUp)"
        />
      </div>
    </div>
    <sidebar-login-indicator-component
      @logout-clicked="handleLogoutClicked"
      :user="user"
      v-if="user"
    />
  </fwb-sidebar>
</template>
<script setup lang="ts">
import { FwbSidebar, FwbSidebarLogo, FwbButton } from 'flowbite-vue'
import SidebarItemComponent from '@/components/Sidebar/SidebarItemComponent.vue'
import SidebarLoginIndicatorComponent from '@/components/Sidebar/SidebarLoginIndicatorComponent.vue'
import SidebarMobileMenu from './SidebarMobileMenu.vue'
import { routerPaths } from '@/router/routes'
import { goTo } from '@/common/routeHelper'
import type { User } from '@/models/app/userModel'
import type { ConfigurationState } from '@/models/app/configurationStateModel'
import { ref } from 'vue'

interface Props {
  user?: User | null
  isCookiePresent: boolean
  featureFlagConfigurationState: ConfigurationState
  isMobileView: boolean
}

interface Emits {
  (e: 'logout'): void
  (e: 'login'): void
}

defineProps<Props>()
const emits = defineEmits<Emits>()

const isDrawerOpen = ref(false)

function handleLoginClicked() {
  emits('login')
}

function handleLogoutClicked() {
  emits('logout')
}

function handleToggleDrawer() {
  isDrawerOpen.value = !isDrawerOpen.value
}
</script>

<style lang="css"></style>
