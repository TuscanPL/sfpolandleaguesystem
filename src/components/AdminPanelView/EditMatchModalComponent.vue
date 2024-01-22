<template>
  <fwb-modal v-if="isOpen" @close="emits('onClose')">
    <template #header>
      <span>{{ headerText }}</span>
    </template>
    <template #body>
      <fwb-input label="Wynik gracza 1" v-model="player1Score" class="mb-2" />
      <fwb-input label="Wynik gracza 2" v-model="player2Score" class="mb-2" />
      <fwb-input label="Powtórki" v-model="replayIds" class="mb-2" />
      <fwb-select label="Status" v-model="matchStatus" :options="matchStatusOptions" class="mb-2" />
    </template>
    <template #footer>
      <div class="flex justify-between">
        <fwb-button
          class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition"
          @click="handleSaveMatch"
        >
          Zapisz mecz
        </fwb-button>
      </div>
    </template>
  </fwb-modal>
</template>
<script setup lang="ts">
import { MatchStatus, type LeagueMatch } from '@/models/app/matchModel'
import { whenever } from '@vueuse/core'
import { FwbModal, FwbInput, FwbButton, FwbSelect } from 'flowbite-vue'
import { computed, ref } from 'vue'

interface Props {
  isOpen: boolean
  headerText: string
  match?: LeagueMatch
}

interface Emits {
  (event: 'onSave', match: LeagueMatch): void
  (event: 'onClose'): void
}

const props = defineProps<Props>()
const emits = defineEmits<Emits>()

const player1Score = ref('')
const player2Score = ref('')
const replayIds = ref('')
const matchStatus = ref('')
const matchStatusOptions = [
  {
    value: MatchStatus.Upcoming,
    name: 'Nadchodzący'
  },
  {
    value: MatchStatus.Completed,
    name: 'Zakończony'
  },
  {
    value: MatchStatus.Cancelled,
    name: 'Anulowany'
  }
]

const isModalOpen = computed(() => props.isOpen)

whenever(isModalOpen, () => {
  if (props.match) {
    player1Score.value = props.match.player1Score?.toString() ?? '0'
    player2Score.value = props.match.player2Score?.toString() ?? '0'
    replayIds.value = props.match.replayIds?.join(', ') ?? ''
    matchStatus.value = props.match.matchStatus
  }
})

function handleSaveMatch() {
  const match: LeagueMatch = {
    id: props.match?.id ?? 0,
    createdAt: props.match?.createdAt ?? new Date(),
    leagueId: props.match?.leagueId ?? 0,
    player1Discordid: props.match?.player1Discordid ?? '',
    player2Discordid: props.match?.player2Discordid ?? '',
    player1Score: parseInt(player1Score.value),
    player2Score: parseInt(player2Score.value),
    replayIds: replayIds.value.split(',').map((x) => x.trim()),
    matchStatus: matchStatus.value as MatchStatus
  }

  emits('onSave', match)
}
</script>
