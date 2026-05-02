import { createApp } from 'vue'
import '@fontsource-variable/inter'
import '@fontsource-variable/bricolage-grotesque'
import './shared/ui/tokens.css'
import './main.css'
import App from './app/App.vue'
import { pinia } from './app/providers/pinia'
import { router } from './app/router'

createApp(App).use(pinia).use(router).mount('#app')
