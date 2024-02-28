import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import * as LineAwesome from 'oh-vue-icons/icons/la'
import { OhVueIcon, addIcons } from 'oh-vue-icons'
import Toast, { POSITION, type PluginOptions } from 'vue-toastification'
import 'vue-toastification/dist/index.css'

const toastOptios: PluginOptions = {
  timeout: 2000,
  position: POSITION.BOTTOM_RIGHT,
  closeOnClick: true,
  draggable: true,
  draggablePercent: 0.6,
  pauseOnHover: true,
  maxToasts: 20,
  newestOnTop: true
}

const icons = Object.values({ ...LineAwesome })
addIcons(...icons)

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Toast, toastOptios)

app.component('v-icon', OhVueIcon)

app.mount('#app')
