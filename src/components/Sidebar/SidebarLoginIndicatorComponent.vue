<template>
    <div class="flex flex-row fixed items-center bottom-0 left-0 w-64 p-2">
      <fwb-card @click="handleToggleButton" class="z-50 w-full cursor-pointer">
        <div class="flex items-center p-2">
          <fwb-avatar bordered :img="user?.avatarUrl" rounded />
          <p class="font-medium text-gray-700 dark:text-gray-400 ml-4">
            {{ user?.globalName }}
          </p>
        </div>
      </fwb-card>
      <div class="absolute w-full transition-transform ml-4" :class="buttonClasses">
        <fwb-button
          color="red"
          class="z-0 square font-medium"
          v-if="user"
          @click="handleLogoutClicked"
        >
          Wyloguj się
        </fwb-button>
      </div>
    </div>
</template>
<script setup lang="ts">
import type { User } from '@/models/app/userModel';
import { computed, ref } from 'vue';
import { FwbButton, FwbCard, FwbAvatar } from 'flowbite-vue'

interface Props {
    user?: User | null
}

interface Emits {
    (e: 'logout-clicked'): void
}

defineProps<Props>()
const emits = defineEmits<Emits>()

const isButtonTransformed = ref(false)

const buttonClasses = computed(() => ({
  'z-1': !isButtonTransformed.value,
  'translate-x-0': !isButtonTransformed.value,
  'translate-x-60': isButtonTransformed.value
}))

function handleToggleButton() {
  isButtonTransformed.value = !isButtonTransformed.value
}

function handleLogoutClicked() {
    emits('logout-clicked')
}
</script>