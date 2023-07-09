import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import routes from 'virtual:generated-pages'
import { createPinia } from 'pinia'
import App from './App.vue'
import '@unocss/reset/tailwind.css'
import 'uno.css'
import 'virtual:unocss-devtools'

const app = createApp({
  render: () => h(App),
  devtools: {
    hide: false,
  },
})
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})
app.use(router)
app.use(createPinia())
app.mount('#app')
