<template>
  <div class="flex flex-row fixed items-center bottom-20 left-0 p-2 w-full xl:bottom-0 xl:w-64">
    <fwb-card
      @click.stop="handleToggleButton"
      @class.prevent
      class="z-50 min-w-full cursor-pointer"
    >
      <div class="flex items-center p-2">
        <fwb-avatar bordered :img="user?.avatarUrl" rounded />
        <p class="font-medium text-gray-700 dark:text-gray-400 ml-4">
          {{ user?.globalName }}
        </p>
      </div>
    </fwb-card>
    <div class="absolute w-full transition-transform" :class="userButtonClass">
      <fwb-button
        color="red"
        class="z-0 square font-medium"
        v-if="user"
        @click.stop="handleLogoutClicked"
      >
        Wyloguj się
      </fwb-button>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { User } from '@/models/app/userModel'
import { computed, ref } from 'vue'
import { FwbButton, FwbCard, FwbAvatar } from 'flowbite-vue'

interface Props {
  user?: User | null
  logoutPopoutDirection?: 'up' | 'right'
}

interface Emits {
  (e: 'logout-clicked'): void
}

const props = defineProps<Props>()
const emits = defineEmits<Emits>()

const isButtonTransformed = ref(false)

const userButtonClass = computed(() => {
  if (props.logoutPopoutDirection === 'up') {
    return verticalButtonClass.value
  }

  return horizontalButtonClass.value
})

const horizontalButtonClass = computed(() => ({
  'z-1': !isButtonTransformed.value,
  'translate-x-0': !isButtonTransformed.value,
  'translate-x-60': isButtonTransformed.value,
  'ml-4': true
}))

const verticalButtonClass = computed(() => ({
  'z-1': !isButtonTransformed.value,
  'translate-y-0': !isButtonTransformed.value,
  '-translate-y-14': isButtonTransformed.value,
  'ml-4': false
}))

function handleToggleButton() {
  isButtonTransformed.value = !isButtonTransformed.value
}

function handleLogoutClicked() {
  emits('logout-clicked')
}
</script>
