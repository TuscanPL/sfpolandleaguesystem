<template>
  <div class="absolute flex flex-col justify-center items-center h-screen w-full">
    <fwb-spinner size="10" color="red" />
    <div class="text-lg mt-2">Pobieram dane gracza</div>
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
    }, 5000)
  } else {
    router.push(routerPaths.home)
  }
}
</script>
