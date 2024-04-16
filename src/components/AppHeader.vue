<script setup>
defineProps({
  totalPrice: Number
})

const emit = defineEmits(['openDrawer'])
</script>

<template>
  <header
    class="flex justify-between items-center flex-wrap gap-10 border-b border-slate-100 px-10 py-8"
  >
    <router-link to="/">
      <div class="flex items-center gap-4">
        <img src="/Logo-1.png" alt="Logo" class="w-20" />
        <div>
          <h2
            class="text-xl font-bold uppercase bg-gradient-to-t from-green-400 to-gray-400 bg-clip-text text-transparent"
          >
            StrideStyle
          </h2>
          <p class="text-slate-400">Крокуй у стилі з нами</p>
        </div>
      </div>
    </router-link>
    <nav>
      <ul class="flex flex-wrap items-center justify-around gap-10">
        <li
          @click="() => emit('openDrawer')"
          class="flex items-center cursor-pointer gap-3 text-slate-400 hover:text-black"
        >
          <img src="/cart.svg" alt="Cart" />
          <b>{{ totalPrice }} грн</b>
        </li>
        <router-link to="/favorites">
          <li class="flex cursor-pointer gap-3 text-slate-400 hover:text-black">
            <img src="/heart.svg" alt="Heart" />
            <span>Закладки</span>
          </li>
        </router-link>
        <li class="flex items-center cursor-pointer gap-3 text-slate-400 hover:text-black">
          <img src="/profile.svg" alt="Profile" />
          <span>Профіль</span>
        </li>
      </ul>
    </nav>
  </header>
</template>
