<template>
    <fwb-modal @close="emits('close')" v-if="isOpen">
        <template #header>
            <h3 class="text-center">{{ leagueName }}</h3>
        </template>
        <template #body>
            <p class="text-center">Wpisz nazwę ligi aby ją usunąć</p>
            <FwbInput v-model="leagueNameInput" class="mt-2" />
        </template>
        <template #footer>
            <fwb-button :disabled="isRemoveButtonDisabled" @click="emits('onRemoveLeague', leagueId)" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition">Usuń</fwb-button>
        </template>
    </fwb-modal>
</template>
<script setup lang="ts">
import { FwbModal, FwbButton, FwbInput } from 'flowbite-vue';
import { computed, ref } from 'vue';
interface Props {
  leagueName: string,
  leagueId: number,
  isOpen: boolean
}

interface Emits {
  (event: 'onRemoveLeague', leagueId: number): void
  (event: 'close'): void
}

const props = defineProps<Props>()

const emits = defineEmits<Emits>()

const leagueNameInput = ref('')

const isRemoveButtonDisabled = computed(() => leagueNameInput.value !== props.leagueName)
</script>