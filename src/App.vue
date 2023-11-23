<template>
  <div class="basis-16 left-0">
    <SidebarNavigationComponent class="relative left-0" @login="handleLogin" @logout="handleLogout" :user="userStore.user"/>
  </div>
  <div class="basis-auto w-full">
    <RouterView />
  </div>
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

watch(isCookiePresent, () => {
  userStore.initalizeUser()
})

onMounted(() => {
  userStore.initalizeUser()
})

async function handleLogin() {
  await userStore.signInWithDiscord()
}

async function handleLogout() {
  await userStore.signOut()
}
</script>
