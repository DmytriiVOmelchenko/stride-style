<script setup>
import AppCardList from '../components/AppCardList.vue'
import axios from 'axios'
import debounce from 'lodash.debounce'
import { inject, reactive, ref, watch, onMounted } from 'vue'

const items = ref([])

const { cart, addToCart, removeFromCart } = inject('cart')

const filters = reactive({
  sortBy: 'title',
  searchQuery: ''
})

const onClickAddPlus = (item) => {
  if (!item.isAdded) {
    addToCart(item)
  } else {
    removeFromCart(item)
  }
  console.log(cart)
}

const onChangeSelect = (event) => {
  filters.sortBy = event.target.value
}

const onChangeSearchInput = debounce((event) => {
  filters.searchQuery = event.target.value
}, 500)

const addToFavorite = async (item) => {
  try {
    if (!item.isFavorite) {
      const obj = {
        parentId: item.id,
        item
      }
      item.isFavorite = true
      const { data } = await axios.post(
        'https://661bb2d365444945d05014a7.mockapi.io/favorites',
        obj
      )
      item.favoriteId = data.id
    } else {
      item.isFavorite = false
      await axios.delete(`https://661bb2d365444945d05014a7.mockapi.io/favorites/${item.favoriteId}`)
      item.favoriteId = null
    }
  } catch (error) {
    console.log(error)
  }
}
const fetchFavorites = async () => {
  try {
    const { data: favorites } = await axios.get(
      'https://661bb2d365444945d05014a7.mockapi.io/favorites'
    )
    items.value = items.value.map((item) => {
      const favorite = favorites.find((favorite) => favorite.parentId === item.id)
      if (!favorite) {
        return item
      }

      return {
        ...item,
        isFavorite: true,
        favoriteId: favorite.id
      }
    })
  } catch (error) {
    console.log(error)
  }
}

const fetchItems = async () => {
  try {
    const params = {
      sortBy: filters.sortBy
    }
    if (filters.sortBy === 'desc') {
      ;(params.sortBy = 'price'), (params.order = `desc`)
    }

    if (filters.searchQuery) {
      params.search = `${filters.searchQuery}`
    }

    const { data } = await axios.get('https://661bb2d365444945d05014a7.mockapi.io/items', {
      params
    })
    items.value = data
  } catch (error) {
    console.log(error)
  }
}

onMounted(async () => {
  const localCart = localStorage.getItem('cart')
  cart.value = localCart ? JSON.parse(localCart) : []
  await fetchItems()
  await fetchFavorites()
  items.value = items.value.map((item) => ({
    ...item,
    isAdded: false
  }))
})

watch(filters, fetchItems)

watch(cart, () => {
  items.value = items.value.map((item) => ({
    ...item,
    isAdded: cart.value.some((cartItem) => cartItem.id === item.id)
  }))
})
</script>

<template>
  <div class="flex justify-between items-center flex-wrap">
    <h2 class="text-3xl mb-8 font-bold">Всі кросівки</h2>

    <div class="flex gap-4 max-sm:flex-col-reverse">
      <select @change="onChangeSelect" class="py-2 px-3 border rounded-md outline-none">
        <option value="name">За назвою</option>
        <option value="price">За ціною (дешевше)</option>
        <option value="desc">За ціною (дорожче)</option>
      </select>
      <div class="relative">
        <img class="absolute left-4 top-3" src="/search.svg" />
        <input
          @input="onChangeSearchInput"
          class="border rounded-md py-2 pl-11 pr-4 outline-none focus:border-gray-400"
          type="text"
          placeholder="Пошук"
        />
      </div>
    </div>
  </div>
  <div class="mt-10">
    <AppCardList :items="items" @add-to-favorite="addToFavorite" @add-to-cart="onClickAddPlus" />
  </div>
</template>
