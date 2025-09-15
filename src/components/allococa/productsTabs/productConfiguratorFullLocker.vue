<template>
  <div class="bg-white rounded-xl shadow-lg p-6 mx-auto h-full">
    <div class="flex items-center justify-between  mb-2">
      <h1 class=" font-bold text-gray-800">Je configure mon casier</h1>

      <Button @click="resetQuantities"
        class="text-sm bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition-colors duration-200">
        Réinitialiser
      </Button>
    </div>


    <section class="h-full flex flex-col ">

      <div class="grid grid-cols-1 sm:grid-cols-2  gap-6 mb-8 flex-1 overflow-y-scroll">
        <ProductFullLockerCard :casier-products-data="casierProducts" :key="product.id" v-for="product in products"
          :product="product" @full-increment="updateProductQuantity" />
      </div>


      <!-- section nombre de casier -->
      <article class="flex items-center justify-between mb-8">
        <div class="flex items-center justify-between w-full">
          <div>
            <!-- <label for="locker-count" class="font-semibold text-sm text-gray-700"></label> -->
            <p class="font-semibold text-sm text-gray-700">Nombre de casiers :</p>
          </div>
          <div>
            <input id="locker-count" type="number" v-model.number="desiredLockers" min="1"
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

        <button
          class="flex items-center justify-center w-full px-4 py-3 bg-red-600 text-white rounded-lg font-bold disabled:bg-red-400 disabled:cursor-not-allowed transition-colors duration-200"
          :disabled="!canAddToBasket" @click="addToBasket">
          Ajouter un panier
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 ml-2">
            <path
              d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.75 3.75 0 0 0 3.694 2.46l.305-.011c1.543 0 2.946-.685 3.864-1.76l.006-.008.006-.007-.008.006a2.25 2.25 0 0 1-.302.348c-.919 1.077-2.321 1.762-3.864 1.762A3.75 3.75 0 0 1 8.25 12a.75.75 0 0 0-1.5 0c0 1.03.843 1.868 1.866 1.868h.27l-.006.008c.518-.04 1.02-.238 1.455-.615.435-.377.747-.852.92-1.396.173-.545.215-1.11.127-1.685.088-.575-.107-1.15-.39-1.618a2.25 2.25 0 0 1 .462-2.184l2.558-9.592a.75.75 0 0 0-.362-.278L16.254 3.75H17.25a.75.75 0 0 0 0-1.5H5.894c-.17 0-.318.114-.362.278L2.974 12.592a.75.75 0 0 1-.724-.514L2.25 2.25zM12.75 14.25a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5zm-5.25 0a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5zm-2.25 0a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5zm1.5 0a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5zm5.25 0a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5zm1.5 0a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5z" />
          </svg>
        </button>

        <p class="text-xs text-gray-500 mt-2">
          <span class="text-red-600 font-bold">*</span>
          Constituer au moins un casier ou minimum 5 000 FCFA
        </p>
      </article>
    </section>

  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, ref, watch, type PropType } from 'vue';
import type { CasierProduct, Product } from 'src/services/locker-products/locker-products-type';
import ProductLockerCard from './productLockerCard.vue';
import Button from '@/components/ui/button/Button.vue';
import ProductFullLockerCard from './productFullLockerCard.vue';

const { casierProducts } = defineProps({
  casierProducts: {
    type: Object as PropType<CasierProduct>,
    required: true
  }
})

const emit = defineEmits<{

  (e: 'set:fullQuantity', product: Product): void;
  (e: 'update:casierQuantity', quantity: number): void;
  (e: 'reset:casier'): void;
}>();
const INITIAL_PRODUCTS_DATA =
  [
    { id: '1', name: 'Coca-Cola', description: '', price: 250, quantity: 0, image: 'src/assets/allococa/products/coca.png', variant: '30cl' },
    { id: '2', name: 'Coca-Cola Zéro', description: '', price: 250, quantity: 0, image: 'src/assets/allococa/products/cocktail-fanta.png', variant: '30cl' },
    { id: '3', name: 'Fanta Orange', description: '', price: 250, quantity: 0, image: 'src/assets/allococa/products/fanta.png', variant: '30cl' },
    { id: '4', name: 'Fanta Cocktail', description: '', price: 250, quantity: 0, image: 'src/assets/allococa/products/cocktail-fanta.png', variant: '30cl' },
    { id: '5', name: 'Fanta Fruits rouge', description: '', price: 250, quantity: 0, image: 'src/assets/allococa/products/cocktail-fanta.png', variant: '30cl' },
    { id: '6', name: 'Fanta Pommes', description: '', price: 250, quantity: 0, image: 'src/assets/allococa/products/cocktail-fanta.png', variant: '30cl' },
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

watch(desiredLockers, (newValue) => {
  emit('update:casierQuantity', newValue);
});


// Computed properties
const totalBottles = computed(() => products.value.reduce((sum, p) => sum + p.quantity, 0));
const totalLockers = computed(() => Math.floor(totalBottles.value / CASIER_CAPACITY));
const subTotal = computed(() => products.value.reduce((sum, p) => sum + p.quantity * p.price, 0));
const maxBottles = computed(() => desiredLockers.value * CASIER_CAPACITY);

const canAddToBasket = computed(() => totalBottles.value >= CASIER_CAPACITY && subTotal.value >= MIN_ORDER_AMOUNT);

// Methods
const updateProductQuantity = (product: Product) => {
  emit('set:fullQuantity', product);
};

const resetQuantities = () => {
  products.value = structuredClone(INITIAL_PRODUCTS_DATA);
  desiredLockers.value = 1; // Also reset the locker count
  emit('reset:casier');
};

const addToBasket = () => {
  if (canAddToBasket.value) {
    const selectedProducts = products.value.filter(p => p.quantity > 0);
    console.log("Produits ajoutés au panier :", selectedProducts);
    alert("Produits ajoutés au panier !");
  } else {
    alert("Veuillez remplir au moins un casier ou atteindre 5000 FCFA.");
  }
};
</script>

<style scoped>
/* Les styles spécifiques pour ce composant iront ici */
</style>