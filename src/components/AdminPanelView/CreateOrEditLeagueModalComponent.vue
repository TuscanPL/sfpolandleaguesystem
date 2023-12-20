<template>
  <fwb-modal v-if="isOpen" @close="resetAndCloseModal">
    <template #header>
      <span>{{ headerText }}</span>
    </template>
    <template #body>
      <fwb-input label="Nazwa ligi" v-model="leagueName" class="mb-2" />
      <vue-date-picker placeholder="Data początku ligi" v-model="leagueStartDate" class="mb-2" />
      <vue-date-picker placeholder="Data końca ligi" v-model="leagueEndDate" class="mb-2" />
      <fwb-table v-if="isEditMode">
        <fwb-table-head>
          <fwb-table-head-cell>Użytkownik</fwb-table-head-cell>
          <fwb-table-head-cell>
            <span class="sr-only">Usuń</span>
          </fwb-table-head-cell>
        </fwb-table-head>
        <fwb-table-body>
          <fwb-table-row v-for="user in props.league?.leagueSignUps" :key="user.id">
            <fwb-table-cell>{{ user.discordName }}</fwb-table-cell>
            <fwb-table-cell>
              <fwb-button
                class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition"
                @click="removeUserFromLeague(user.discordUserId, props.league?.id)"
              >
                Usuń
              </fwb-button>
            </fwb-table-cell>
          </fwb-table-row>
        </fwb-table-body>
      </fwb-table>
    </template>
    <template #footer>
      <div class="flex justify-between">
        <fwb-button
          class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition"
          @click="handleSaveButtonClick"
        >
          {{ saveButtonText }}
        </fwb-button>
        <fwb-button
          v-if="isEditMode"
          class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition"
          @click="removeLeague(props.league?.id)"
        >
          Usuń ligę
        </fwb-button>
      </div>
    </template>
  </fwb-modal>
</template>
<script setup lang="ts">
import type { League } from '@/models/app/leagueModel'
import type { LeagueStub } from '@/models/app/leagueStubModel'
import {
  FwbModal,
  FwbButton,
  FwbInput,
  FwbTable,
  FwbTableHead,
  FwbTableBody,
  FwbTableCell,
  FwbTableHeadCell,
  FwbTableRow
} from 'flowbite-vue'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { ref, computed } from 'vue'
import { whenever } from '@vueuse/core'

interface Props {
  isOpen: boolean
  league?: League
}

interface Emits {
  (event: 'onAdd', league: LeagueStub): void
  (event: 'onEdit', league: LeagueStub): void
  (event: 'onRemoveUserFromLeague', userId: string, leagueId: number): void
  (event: 'onRemoveLeague', leagueId: number): void
  (event: 'close'): void
}

const props = defineProps<Props>()
const emits = defineEmits<Emits>()

const leagueName = ref('')
const leagueStartDate = ref('')
const leagueEndDate = ref('')

const isEditMode = computed(() => !!props.league)
const headerText = computed(() => (isEditMode.value ? 'Edytuj ligę' : 'Dodaj nową ligę'))
const saveButtonText = computed(() => (isEditMode.value ? 'Edytuj' : 'Dodaj'))
const isModalOpen = computed(() => props.isOpen)

whenever(isModalOpen, () => {
  if (props.league) {
    leagueName.value = props.league.leagueName
    leagueStartDate.value = props.league.leagueStartDate.toDateString()
    leagueEndDate.value = props.league.leagueEndDate.toDateString()
  }
})

function handleSaveButtonClick() {
  if (isEditMode.value) {
    emits('onEdit', {
      leagueName: leagueName.value,
      leagueStartDate: leagueStartDate.value,
      leagueEndDate: leagueEndDate.value,
      id: props.league?.id
    })
  } else {
    emits('onAdd', {
      leagueName: leagueName.value,
      leagueStartDate: leagueStartDate.value,
      leagueEndDate: leagueEndDate.value
    })
  }
}

function removeUserFromLeague(userId: string, leagueId?: number) {
  if (!leagueId) {
    return // todo: handle error
  }

  emits('onRemoveUserFromLeague', userId, leagueId)
}

function removeLeague(leagueId?: number) {
  if (!leagueId) {
    return // todo: handle error
  }

  emits('onRemoveLeague', leagueId)
}

function resetAndCloseModal() {
  leagueName.value = ''
  leagueStartDate.value = ''
  leagueEndDate.value = ''

  emits('close')
}
</script>
