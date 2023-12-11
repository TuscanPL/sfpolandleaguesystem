<template>
  <div>This will be the admin panel</div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import { onMounted } from 'vue'
import { routerPaths } from '@/router/routes'

const userStore = useUserStore()
const router = useRouter()

onMounted(() => {
  if (!userStore.isAdmin) {
    router.push(routerPaths.home)
  }
})
</script>
<style lang=""></style>
