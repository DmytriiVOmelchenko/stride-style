<script setup>
import DrawerHead from './DrawerHead.vue'
import AppCardListItem from './AppCardListItem.vue'
import InfoBlock from './InfoBlock.vue'
import { computed, inject, ref } from 'vue'
import axios from 'axios'

const props = defineProps({
  totalPrice: Number,
  vatPrice: Number
})

const { cart } = inject('cart')

const isCreatingOrder = ref(false)
const orderId = ref(null)

const createOrder = async () => {
  try {
    isCreatingOrder.value = true
    const { data } = await axios.post('https://661d3a0de7b95ad7fa6c9b37.mockapi.io/orders', {
      items: cart.value,
      totalPrice: props.totalPrice.value
    })

    cart.value = []

    orderId.value = data.id
  } catch (error) {
    console.log(error)
  } finally {
    isCreatingOrder.value = false
  }
}

const carIsEmpty = computed(() => cart.value.length === 0)

const disabledButton = computed(() => isCreatingOrder.value || carIsEmpty.value)
</script>

<template>
  <div class="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-70"></div>
  <div class="bg-white w-96 h-full fixed right-0 top-0 z-20 p-8">
    <DrawerHead />

    <div v-if="!totalPrice || odrderId" class="flex h-full items-center">
      <InfoBlock
        v-if="!totalPrice && !orderId"
        title="Корзина пуста"
        image-url="/package-icon.png"
        description="Для замовлення Вам потрібно додати товари до корзини"
      />
      <InfoBlock
        v-if="orderId"
        title="Замовлення оформлено"
        image-url="/order-success-icon.png"
        :description="`Ваше замовлення №${orderId} невдовзі буде передено кур’єрській службі`"
      />
    </div>

    <AppCardListItem />

    <div v-if="totalPrice" class="flex flex-col gap-4 mt-7">
      <div class="flex gap-2 items-end">
        <span>Всього:</span>
        <div class="flex-1 border-b border-dashed"></div>
        <b>{{ totalPrice }} грн</b>
      </div>
      <div class="flex gap-2 items-end">
        <span>Податок 20%</span>
        <div class="flex-1 border-b border-dashed"></div>
        <b>{{ vatPrice }} грн</b>
      </div>
      <button
        :disabled="disabledButton"
        @click="createOrder"
        class="mt-4 bg-lime-500 w-full rounded-xl py-2 text-white disabled:bg-slate-300 hover:bg-lime-600 transition active:bg-lime-700 cursor-pointer"
      >
        Оформити замовлення
      </button>
    </div>
  </div>
</template>
