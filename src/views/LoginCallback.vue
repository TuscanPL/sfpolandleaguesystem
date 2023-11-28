<template>
  <div>You made it into the callback section</div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { useRouter } from 'vue-router'
import { routerPaths } from '@/router/routes'

const userStore = useUserStore()
const router = useRouter()

onMounted(() => {
  if (!userStore.isCookiePresent) {
    window.location.reload()
  }

  router.push(routerPaths.home)
})
</script>
