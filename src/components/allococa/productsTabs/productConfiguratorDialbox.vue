<template>
  <div class="bg-white rounded-md shadow-lg p-6 mx-auto h-full">
    <div class="flex items-center justify-between  mb-2">
      <h1 class=" font-bold text-gray-800">Je configure mon casier</h1>

      <Button @click="resetQuantities"
        class="text-sm bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition-colors duration-200">
        Réinitialiser
      </Button>
    </div>


    <section class="h-full flex flex-col ">

      <div class="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-2  gap-6 mb-8 flex-1 overflow-y-scroll">
        <ProductLockerCard :casier-products-data="casierProducts" :key="product.id" v-for="product in products"
          :product="product" @update:quantity="updateProductQuantity" />
      </div>


      <!-- section nombre de casier -->
      <article class="flex items-center justify-between ">
        <div class="flex items-center justify-between w-full">
          <div>
            <!-- <label for="locker-count" class="font-semibold text-sm text-gray-700"></label> -->
            <p class="font-semibold text-sm text-gray-700">Nombre de casiers :</p>
          </div>
          <div>
            <input id="locker-count" type="number" @change="emit('update:casierQuantity', desiredLockers)"
              v-model.number="desiredLockers" min="1"
              class="w-20 p-2 text-center border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500" />
          </div>
        </div>

      </article>

      <article class="space-y-4">
        <div class="flex flex-col sm:flex-row items-end sm:items-center justify-between mb-4">
          <div class="flex flex-col space-y-1 text-right w-full  text-sm">
            <div class="flex items-center justify-between">
              <p class="text-sm text-[#888888]">Nombre de bouteilles</p>
              <p class="font-bold ml-2">{{ totalBottles }} / {{ maxBottles }}</p>
            </div>
            <div class="flex items-center justify-between">
              <p class="text-sm text-[#888888]">Nombre de Casier</p>
              <p class="font-bold ml-2">{{ desiredLockers }} </p>
            </div>
            <div class="flex items-center justify-between">
              <p class="text-sm text-[#888888]">Sous-total</p>
              <p class="font-bold ml-2">{{ subTotal }} FCFA</p>
            </div>
          </div>
        </div>

        <button class="flex items-center justify-center w-full px-4 text-sm py-3 rounded-[90px] transition-colors duration-200 
           disabled:text-[#888888] disabled:bg-[#F6F6F6] disabled:cursor-not-allowed
           bg-red-600 text-white" :disabled="!canAddToBasket" @click="addToBasket">
          <div class="flex items-center justify-between w-full">
            <span v-if="isEdit">Modifier le panier</span>
            <span v-else>Ajouter au panier</span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"
              class="disabled:stroke-[#888888] stroke-white">
              <g clip-path="url(#clip0_13587_449)">
                <path
                  d="M1.7085 1.70801H3.37516L5.59183 12.058C5.67314 12.4371 5.88405 12.7759 6.18826 13.0162C6.49246 13.2565 6.87092 13.3833 7.2585 13.3747H15.4085C15.7878 13.3741 16.1556 13.2441 16.451 13.0062C16.7465 12.7683 16.9519 12.4368 17.0335 12.0663L18.4085 5.87467H4.26683M7.50016 17.4997C7.50016 17.9599 7.12707 18.333 6.66683 18.333C6.20659 18.333 5.8335 17.9599 5.8335 17.4997C5.8335 17.0394 6.20659 16.6663 6.66683 16.6663C7.12707 16.6663 7.50016 17.0394 7.50016 17.4997ZM16.6668 17.4997C16.6668 17.9599 16.2937 18.333 15.8335 18.333C15.3733 18.333 15.0002 17.9599 15.0002 17.4997C15.0002 17.0394 15.3733 16.6663 15.8335 16.6663C16.2937 16.6663 16.6668 17.0394 16.6668 17.4997Z"
                  stroke="#D1D1D1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </g>
              <defs>
                <clipPath id="clip0_13587_449">
                  <rect width="20" height="20" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
        </button>

        <!-- <p class="text-xs text-gray-500 mt-2">
          <span class="text-red-600 font-bold">*</span>
          Constituer au moins un casier ou minimum 5 000 FCFA
        </p> -->
        <div class="h-4">

        </div>
      </article>
    </section>

  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, ref, watch, type PropType } from 'vue';
import type { CartLine, CasierProduct, Product } from 'src/services/locker-products/locker-products-type';
import ProductLockerCard from './productLockerCard.vue';
import Button from '@/components/ui/button/Button.vue';
import { useCart } from '@/composables/queries/useCart';
import { useRoute } from 'vue-router';

const { addCartLine, clearCart, removeCartLine } = useCart();
const route = useRoute();

const { casierProducts } = defineProps({
  casierProducts: {
    type: Object as PropType<CasierProduct>,
    required: true
  }
})

const emit = defineEmits<{
  (e: 'increase:quantity', product: Product): void;
  (e: 'decrease:quantity', product: Product): void;
  (e: 'update:casierQuantity', quantity: number): void;
  (e: 'reset:casier'): void;
  (e: 'cart:addCasier'): void;
  (e: 'cart:editCasier'): void;
}>();
const INITIAL_PRODUCTS_DATA =
  [
    { id: '1', name: 'Coca-Cola', description: '', price: 250, quantity: 0, image: 'coca.png', variant: '30cl' },
    { id: '2', name: 'Coca-Cola Zéro', description: '', price: 250, quantity: 0, image: 'cocktail-fanta.png', variant: '30cl' },
    { id: '3', name: 'Fanta Orange', description: '', price: 250, quantity: 0, image: 'fanta.png', variant: '30cl' },
    { id: '4', name: 'Fanta Cocktail', description: '', price: 250, quantity: 0, image: 'cocktail-fanta.png', variant: '30cl' },
    { id: '5', name: 'Fanta Fruits rouge', description: '', price: 250, quantity: 0, image: 'cocktail-fanta.png', variant: '30cl' },
    { id: '6', name: 'Fanta Pommes', description: '', price: 250, quantity: 0, image: 'cocktail-fanta.png', variant: '30cl' },
  ]
  ;

onBeforeMount(() => {
  products.value = structuredClone(INITIAL_PRODUCTS_DATA.map(product => ({ ...product, quantity: getDefaultProductQuantity(product.id) })));
})

const products = ref(structuredClone(INITIAL_PRODUCTS_DATA));
// const products = ref(structuredClone(INITIAL_PRODUCTS_DATA.map(product => ({ ...product, quantity: getDefaultProductQuantity(product.id) }))));

const getDefaultProductQuantity = (idProduct: string) => {
  return casierProducts.products.find(product => product.id === idProduct)?.quantity ?? 0;
}

const CASIER_CAPACITY = 24;
const MIN_ORDER_AMOUNT = 5000;

// New state for desired number of lockers
const desiredLockers = ref(casierProducts.quantity); // Default to 1 locker

// watch(desiredLockers, (newValue) => {
//   emit('update:casierQuantity', newValue);
// });

const onchangeDesiredLockers = () => {
  emit('update:casierQuantity', desiredLockers.value);
}


// Computed properties
const totalBottles = computed(() => products.value.reduce((sum, p) => sum + p.quantity, 0) * desiredLockers.value);
const totalLockers = computed(() => Math.floor(totalBottles.value / CASIER_CAPACITY));
const subTotal = computed(() => products.value.reduce((sum, p) => sum + p.quantity * p.price, 0) * desiredLockers.value);
const maxBottles = computed(() => desiredLockers.value * CASIER_CAPACITY);

const canAddToBasket = computed(() => totalBottles.value >= CASIER_CAPACITY && subTotal.value >= MIN_ORDER_AMOUNT);

// Methods
const updateProductQuantity = (dataProduct: { id: string, newQuantity: number }) => {
  const product = products.value.find(p => p.id === dataProduct.id);
  if (product) {
    // Only update if the new quantity is within the total limit
    const oldQuantity = product.quantity;
    const newTotalBottles = totalBottles.value - oldQuantity + dataProduct.newQuantity;

    product.quantity = dataProduct.newQuantity;

    if (dataProduct.newQuantity > oldQuantity) {
      emit('increase:quantity', product);
    } else {
      emit('decrease:quantity', product);
    }

    if (newTotalBottles <= maxBottles.value) {
      product.quantity = dataProduct.newQuantity;
    }
  }
};

const isEdit = computed(() => {
  const idCartLine = route.query.id;
  const type = route.query.type;
  return idCartLine && type && type == "locker";
})

const resetQuantities = () => {
  products.value = structuredClone(INITIAL_PRODUCTS_DATA);
  desiredLockers.value = 1; // Also reset the locker count
  emit('reset:casier');
};

const addToBasket = () => {
  // const idCartLine = route.query.id;
  // const type = route.query.type;
  if (isEdit.value) {

    emit('cart:editCasier');
    resetQuantities();

  } else {
    emit('cart:addCasier');
    resetQuantities();
  }

};
</script>

<style scoped>
/* Les styles spécifiques pour ce composant iront ici */
</style>