<script setup>
import { computed, provide, ref, watch } from 'vue'
import AppDrawer from './components/AppDrawer.vue'
import AppHeader from './components/AppHeader.vue'

const cart = ref([])
const drawerOpen = ref(false)

const totalPrice = computed(() => cart.value.reduce((acc, item) => acc + item.price, 0))

const vatPrice = computed(() => Math.round(totalPrice.value * 20) / 100)

const closeDrawer = () => {
  drawerOpen.value = false
}

const openDrawer = () => {
  drawerOpen.value = true
}

const addToCart = (item) => {
  cart.value.push(item)
  item.isAdded = true
}

const removeFromCart = (item) => {
  cart.value.splice(cart.value.indexOf(item), 1)
  item.isAdded = false
}

watch(
  cart,
  () => {
    localStorage.setItem('cart', JSON.stringify(cart.value))
  },
  { deep: true }
)

provide('cart', {
  cart,
  closeDrawer,
  openDrawer,
  addToCart,
  removeFromCart
})
</script>

<template>
  <AppDrawer v-if="drawerOpen" :total-price="totalPrice" :vat-price="vatPrice" />
  <div
    class="w-4/5 m-auto bg-gradient-to-t from-zinc-200 to-slate-50 max-h-max mb-10 rounded-xl shadow-xl mt-14 max-sm:w-11/12 max-h-max mt-5"
  >
    <AppHeader :total-price="totalPrice" @open-drawer="openDrawer" />

    <section class="p-10">
      <RouterView />
    </section>
  </div>
</template>
