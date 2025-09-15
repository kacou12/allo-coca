import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useCart = defineStore('cart', () => {
  const cart = ref([])
  const isLoadingSkeleton = ref(false)

  const startLoadingSkeleton = () => {
    isLoadingSkeleton.value = true
  }

  const stopLoadingSkeleton = () => {
    setTimeout(() => {
      isLoadingSkeleton.value = false
    }, 3000)
  }


  return {
    isLoadingSkeleton,
    startLoadingSkeleton,
    stopLoadingSkeleton,
  }
})
