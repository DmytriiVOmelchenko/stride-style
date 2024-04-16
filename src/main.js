import './assets/main.css'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import { createRouter, createWebHistory } from 'vue-router'

import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)

import HomePage from './pages/HomePage.vue'
import FavoritesPage from './pages/FavoritesPage.vue'

const routes = [
  { path: '/', name: 'home', component: HomePage },
  {
    path: '/favorites',
    name: 'favorites',
    component: FavoritesPage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})
app.use(autoAnimatePlugin).use(router)

app.mount('#app')
