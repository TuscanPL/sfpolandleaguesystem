<template>
  <div class="flex flex-col justify-center items-center h-screen">
    <fwb-spinner size="10" color="red" />
    <div class="text-lg">Getting User Data</div>
  </div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { useRouter } from 'vue-router'
import { routerPaths } from '@/router/routes'
import { FwbSpinner } from 'flowbite-vue'

const userStore = useUserStore()
const router = useRouter()

onMounted(async () => {
  if (!userStore.isCookiePresent) {
    await waitForCookie()
  }

  router.push(routerPaths.home)
})

async function waitForCookie() {
  const timeout = 500
  const start = Date.now()

  while (!userStore.isCookiePresent) {
    if (Date.now() - start > timeout) {
      return window.location.reload()
    }
    await new Promise((resolve) => setTimeout(resolve, 50))
  }
}
</script>
