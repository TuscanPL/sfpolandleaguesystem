<template>
  <div class="flex flex-col justify-center items-center h-screen">
    <fwb-spinner size="10" color="red" />
    <div class="text-lg mt-2">Getting User Data</div>
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

onMounted(checkForCookie)

function checkForCookie() {
  if (!userStore.isCookiePresent) {
    setTimeout(() => {
      window.location.reload()
    }, 2000)
  } else {
    router.push(routerPaths.home)
  }
}
</script>
