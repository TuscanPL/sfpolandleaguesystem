import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import * as LineAwesome from 'oh-vue-icons/icons/la'
import { OhVueIcon, addIcons } from 'oh-vue-icons'

const icons = Object.values({ ...LineAwesome })
addIcons(...icons)

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.component('v-icon', OhVueIcon)

app.mount('#app')
