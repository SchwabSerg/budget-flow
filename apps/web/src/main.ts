import { createApp } from 'vue'
import './style.css'
import App from './app/App.vue'
import { pinia } from './app/providers/pinia'
import { router } from './app/router'

createApp(App).use(pinia).use(router).mount('#app')
