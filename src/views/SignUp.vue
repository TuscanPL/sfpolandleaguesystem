<template>
  <fwb-alert type="success" v-if="showSuccessAlert">
    Your form is submitted successfully!
  </fwb-alert>
  <fwb-input v-model="name" label="Name" />
  <fwb-select v-model="selected" :options="league" label="League" />
  <fwb-toast divide v-if="selected"> Sign up will end on {{ getEndDate(selected) }}. </fwb-toast>
  <fwb-button gradient="red" @click="submitForm">Confirm</fwb-button>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { FwbInput, FwbSelect, FwbToast, FwbButton, FwbAlert } from 'flowbite-vue'

const name = ref('')
const selected = ref('')
const showSuccessAlert = ref(false)

const league = [
  { value: 'sf', name: 'Street Fighter 6', endDate: '15-09-2023 14:30 GMT' },
  { value: 'tk', name: 'Tekken 8', endDate: '03-12-2022 08:30 GMT' },
  { value: 'gg', name: 'Guilty Gear Xrd', endDate: '20-05-2023 18:00 GMT' }
]

const getEndDate = (selectedValue: string) => {
  const selectedLeague = league.find((league) => league.value === selectedValue)
  return selectedLeague ? selectedLeague.endDate : ''
}

const submitForm = () => {
  showSuccessAlert.value = true
}
</script>
