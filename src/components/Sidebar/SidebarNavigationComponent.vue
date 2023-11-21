<template>
  <fwb-sidebar class="sidebar-option">
    <fwb-sidebar-logo logo="logo.png" name="Liga SFPL" tag="router-link" />
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
  </fwb-sidebar>
</template>
<script setup lang="ts">
import { FwbSidebar, FwbSidebarLogo } from 'flowbite-vue'
import SidebarItem from '@/components/Sidebar/SidebarItem.vue'
import { routerPaths } from '@/router/routes'
import { goTo } from '@/common/routeHelper'
</script>
<style lang="css"></style>
