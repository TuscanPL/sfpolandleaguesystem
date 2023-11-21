<template>
  <fwb-alert type="success" v-if="showSuccessAlert"> "Zostałeś zapisany!" </fwb-alert>
  <fwb-select v-model="selected" :options="league" label="Liga" />
  <fwb-toast divide v-if="selected">Zapisy zakończą się {{ getEndDate(selected) }}.</fwb-toast>
  <fwb-button gradient="red" @click="submitForm">Zapisz się</fwb-button>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { FwbSelect, FwbToast, FwbButton, FwbAlert } from 'flowbite-vue'

const selected = ref('')
const showSuccessAlert = ref(false)

const league = [
  { value: 'sf', name: 'Street Fighter 6', endDate: '15-09-2023 14:30 GMT' },
  { value: 'tk', name: 'Tekken 8', endDate: '03-12-2022 08:30 GMT' },
  { value: 'gg', name: 'Guilty Gear Xrd', endDate: '20-05-2023 18:00 GMT' }
]
function getEndDate(selectedValue: string): string {
  const selectedLeague = league.find((league) => league.value === selectedValue)
  return selectedLeague ? selectedLeague.endDate : ''
}

const submitForm = () => {
  showSuccessAlert.value = true
}
</script>
