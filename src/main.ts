import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './assets/main.css'

import VueTippy from 'vue-tippy'
import 'tippy.js/dist/tippy.css';

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueTippy)

app.mount('#app')
