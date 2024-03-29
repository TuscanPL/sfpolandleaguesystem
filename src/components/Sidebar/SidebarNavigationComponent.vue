<template>
  <fwb-sidebar class="sidebar-option">
    <fwb-sidebar-logo logo="logo.png" name="Liga SFPL" tag="router-link" />
    <fwb-button v-if="!user" @click="handleLoginClicked" class="w-full">Zaloguj się</fwb-button>
    <sidebar-item-component
      v-if="featureFlagConfigurationState.isMainPageVisible"
      label="Strona główna"
      icon="la-book-open-solid"
      @click="goTo(routerPaths.home)"
    />
    <sidebar-item-component
      v-if="featureFlagConfigurationState.isLeaguePageVisible && isAnyLeagueActive && user"
      label="Liga"
      icon="la-fist-raised-solid"
      @click="goTo(routerPaths.leagueStandings)"
    />
    <sidebar-item-component
      v-if="featureFlagConfigurationState.isUpcomingMatchesVisible && isAnyLeagueActive && user"
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
    <sidebar-item-component
      v-if="isAdmin"
      label="Panel administracyjny"
      icon="la-user-shield-solid"
      @click="goTo(routerPaths.adminPanel)"
    />
    <sidebar-login-indicator-component
      @logout-clicked="handleLogoutClicked"
      :user="user"
      :logout-popout-direction="isMobileView ? 'up' : 'right'"
      v-if="user"
    />
  </fwb-sidebar>
</template>
<script setup lang="ts">
import { FwbSidebar, FwbSidebarLogo, FwbButton } from 'flowbite-vue'
import SidebarItemComponent from '@/components/Sidebar/SidebarItemComponent.vue'
import SidebarLoginIndicatorComponent from '@/components/Sidebar/SidebarLoginIndicatorComponent.vue'
import { routerPaths } from '@/router/routes'
import { goTo } from '@/common/routeHelper'
import type { User } from '@/models/app/userModel'
import type { ConfigurationState } from '@/models/app/configurationStateModel'

interface Props {
  user?: User | null
  isCookiePresent: boolean
  featureFlagConfigurationState: ConfigurationState
  isMobileView: boolean
  isAdmin: boolean
  isAnyLeagueActive: boolean
}

interface Emits {
  (e: 'logout'): void
  (e: 'login'): void
}

defineProps<Props>()
const emits = defineEmits<Emits>()

function handleLoginClicked() {
  emits('login')
}

function handleLogoutClicked() {
  emits('logout')
}
</script>

<style lang="css"></style>
