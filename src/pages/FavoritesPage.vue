<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import AppCardList from '../components/AppCardList.vue'

const favorites = ref([])

onMounted(async () => {
  const { data } = await axios.get('https://661bb2d365444945d05014a7.mockapi.io/favorites')

  favorites.value = data.map((item) => item.item)

  console.log(favorites.value)
})
</script>

<template>
  <AppCardList :items="favorites" @add-to-favorite="addToFavorite" @add-to-cart="onClickAddPlus" />
</template>
