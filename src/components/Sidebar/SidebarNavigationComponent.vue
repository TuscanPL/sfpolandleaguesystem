<template>
  <fwb-sidebar class="sidebar-option">
    <fwb-sidebar-logo logo="logo.png" name="Liga SFPL" tag="router-link" />
    <fwb-button v-if="!user" @click="handleLoginClicked" class="w-full">Zaloguj się</fwb-button>
    <sidebar-item-component
      label="Strona główna"
      icon="la-book-open-solid"
      @click="goTo(routerPaths.home)"
    />
    <sidebar-item-component
      label="Liga"
      icon="la-fist-raised-solid"
      @click="goTo(routerPaths.leagueStandings)"
    />
    <sidebar-item-component
      label="Nadchodzące mecze"
      icon="la-calendar-alt-solid"
      @click="goTo(routerPaths.upcomingMatches)"
    />
    <sidebar-item-component
      label="Zaraportuj wynik"
      icon="la-clipboard-check-solid"
      @click="goTo(routerPaths.reportScores)"
    />
    <sidebar-item-component
      label="Ustawienia"
      icon="la-user-cog-solid"
      @click="goTo(routerPaths.userSettings)"
    />
    <sidebar-item-component
      label="Zapisz się"
      icon="la-file-signature-solid"
      @click="goTo(routerPaths.signUp)"
    />

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
import { routerPaths } from '@/router/routes'
import { goTo } from '@/common/routeHelper'
import type { User } from '@/models/app/userModel'

interface Props {
  user?: User | null
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
