import type { CartLine } from '@/services/locker-products/locker-products-type'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useCart = defineStore('cart', () => {
  const cart = ref<CartLine[]>([])

  const cartTabValue = ref<"casierCompose"|"casierComplet"|"water">("casierComplet")

  const setCartTabValue = (value: "casierCompose"|"casierComplet"|"water") => {
    cartTabValue.value = value
  }


  const cartQuantityLength = computed(() => {
    return cart.value.reduce((total, item) => {
      return total + item.quantity  
    }, 0);
  })

  const total = computed(() => {
    return cart.value.reduce((total, item) => {
      return total + item.quantity * item.products[0].price
    }, 0)
  })

  const addCartLine= (product: CartLine) => {
    const existingCartLine = cart.value.find(item => item.id === product.id)
    if (existingCartLine) {
      existingCartLine.quantity++
    } else {
      cart.value.push(product)
    }
  }


  const removeCartLine = (product: CartLine) => {
    cart.value = cart.value.filter(item => item.id !== product.id) ;
  }

  const clearCart = () => {
    cart.value = []
  }

  const waterProductDefaultQuantity = (id_water_product: string) => {
  //  const waterCartLine = cart.value.filter(cartLine => cartLine.type === 'water');
  //   [].concat(array1, array2, array3)
  return cart.value.find(cartLine => cartLine.id === id_water_product)?.quantity ?? 0;


    
  }

  return {
    cart,
    total,
    addCartLine,
    removeCartLine,
    clearCart,
    cartQuantityLength,
    waterProductDefaultQuantity,
    // setCartTabValue,
    // cartTabValue
  }
  
},{
  persist: true
})
