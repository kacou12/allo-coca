<template>

  <div ref="el" class="h-screen">
    <!-- <toastContainers /> -->
    <!-- <transition name="fade">
      <LoadingBar v-if="loading"></LoadingBar>
    </transition> -->


    <RouterView class="font-worksans" />

  </div>

</template>
<script setup lang="ts">

import { onBeforeMount, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import LoadingBar from './components/loadingBar.vue';

import { storeToRefs } from 'pinia';

import { AppRoute } from './constants/app-route';
import { useToast } from 'vue-toastification';


const route = useRoute();
const isVisited = ref(false);
const toast = useToast();











// ENABLE TO FETCH COUNTRY
// onBeforeMount(async () => {
//   let data = await refetch();
//   setListCountries(countriesData.value?.items!);
// });










</script>

<style scoped>
:root {
  --ms-spinner-color: #fab529;

  --ms-tag-bg: #fab529;

  --ms-group-label-bg-selected: #fab529;

  --ms-group-label-bg-selected-pointed: #fab529;

  --ms-option-bg-selected: #fab529;

  --ms-option-bg-selected-pointed: #166FB8;

}

.dp__theme_light {
  --dp-primary-color: #fab529;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
