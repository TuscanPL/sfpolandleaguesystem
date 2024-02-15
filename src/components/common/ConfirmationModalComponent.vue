<template>
  <fwb-modal v-if="isOpen" @close="emits('onCancel')">
    <template #header>
      <h2 class="text-xl font-bold">{{ title }}</h2>
    </template>
    <template #body>
      <p>{{ text }}</p>
      <p v-if="subtext && subtext.length > 0" class="text-sm italic mt-2">{{ subtext }}</p>
    </template>
    <template #footer>
      <div class="flex justify-between">
        <fwb-button
          class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition"
          @click="emits('onConfirm')"
        >
          {{ confirmButtonText }}
        </fwb-button>
        <fwb-button
          class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition"
          @click="emits('onCancel')"
          v-if="isCancelButtonVisible ?? true"
        >
          {{ cancelButtonText }}
        </fwb-button>
      </div>
    </template>
  </fwb-modal>
</template>
<script setup lang="ts">
import { FwbModal, FwbButton } from 'flowbite-vue'

interface Props {
  isOpen: boolean
  title: string
  text: string
  subtext?: string
  confirmButtonText: string
  cancelButtonText?: string
  isCancelButtonVisible?: boolean
}

interface Events {
  (event: 'onConfirm'): void
  (event: 'onCancel'): void
}

defineProps<Props>()
const emits = defineEmits<Events>()
</script>
