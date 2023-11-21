<template>
  <SidebarNavigationComponent />
  <RouterView />
</template>
<script setup lang="ts">
import { RouterView } from 'vue-router'
import SidebarNavigationComponent from '@/components/Sidebar/SidebarNavigationComponent.vue'
import { computed, onMounted, watch } from 'vue';
import { useUserStore } from '@/stores/userStore';
import { getUserCookie } from '@/common/cookieHelper';

const userStore = useUserStore();

const isCookiePresent = computed(() => {
    return getUserCookie() !== null
})

onMounted(() => {
  userStore.initalizeUser()
})

watch(isCookiePresent, () => {
  userStore.initalizeUser()
})
</script>
