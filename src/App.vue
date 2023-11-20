<template>
  <SidebarNavigationComponent />
  <RouterView />
</template>
<script setup lang="ts">
import { RouterView } from 'vue-router'
import SidebarNavigationComponent from 'components/SidebarNavigationComponent.vue'
</script>
