import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { createI18n } from 'vue-i18n'
import en from './lang/en'
import ar from './lang/ar'

const locale = localStorage.getItem('locale') || 'ar'
localStorage.setItem('locale', locale)

const i18n = createI18n({
    locale,
    messages: { en, ar },
})

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)

app.mount('#app')
