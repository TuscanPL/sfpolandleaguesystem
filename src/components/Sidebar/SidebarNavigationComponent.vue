<template>
  <fwb-sidebar class="sidebar-option">
    <fwb-sidebar-logo logo="logo.png" name="Liga SFPL" tag="router-link" />
    <fwb-button v-if="!userStore.user" @click="handleLogin" class="w-full">Zaloguj się</fwb-button>
    <sidebar-item label="Strona główna" icon="la-book-open-solid" @click="goTo(routerPaths.home)" />
    <sidebar-item
      label="Liga"
      icon="la-fist-raised-solid"
      @click="goTo(routerPaths.leagueStandings)"
    />
    <sidebar-item
      label="Nadchodzące mecze"
      icon="la-calendar-alt-solid"
      @click="goTo(routerPaths.upcomingMatches)"
    />
    <sidebar-item
      label="Zaraportuj wynik"
      icon="la-clipboard-check-solid"
      @click="goTo(routerPaths.reportScores)"
    />
    <sidebar-item
      label="Ustawienia"
      icon="la-user-cog-solid"
      @click="goTo(routerPaths.userSettings)"
    />
    <sidebar-item
      label="Zapisz się"
      icon="la-file-signature-solid"
      @click="goTo(routerPaths.signUp)"
    />

    <div class="flex flex-col items-start fixed bottom-0 left-0">
      <fwb-card @click="handleToggleButton" class="static z-50">
        <div class="flex items-center static w-60 p-2">
          <fwb-avatar :img="userStore.user?.avatarUrl" rounded />
          <p class="font-normal text-gray-700 dark:text-gray-400 ml-4">
            {{ userStore.user?.globalName }}
          </p>
        </div>
      </fwb-card>
      <div class="absolute w-full transition-transform h-full" :class="buttonClasses">
        <fwb-button
          gradient="red"
          class="h-full z-0 ml-3.5 square"
          v-if="userStore.user"
          @click="handleLogout"
        >
          Wyloguj się
        </fwb-button>
      </div>
    </div>
  </fwb-sidebar>
</template>
<script setup lang="ts">
import { FwbSidebar, FwbSidebarLogo, FwbButton, FwbAvatar, FwbCard } from 'flowbite-vue'
import SidebarItem from '@/components/Sidebar/SidebarItem.vue'
import { routerPaths } from '@/router/routes'
import { goTo } from '@/common/routeHelper'
import { useUserStore } from '@/stores/userStore'
import { ref, computed } from 'vue'

const userStore = useUserStore()
const isButtonTransformed = ref(false)

async function handleLogin() {
  await userStore.signInWithDiscord()
}

async function handleLogout() {
  await userStore.signOut()
}

const buttonClasses = computed(() => ({
  'z-[1]': !isButtonTransformed.value,
  'translate-x-0': !isButtonTransformed.value,
  'translate-x-full z-[2]': isButtonTransformed.value
}))

function handleToggleButton() {
  isButtonTransformed.value = !isButtonTransformed.value
}
</script>

<style lang="css"></style>
