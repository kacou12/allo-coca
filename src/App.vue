<template>

  <div ref="el" class="h-screen  ">
    <transition name="fade">
      <LoadingBar v-if="loading"></LoadingBar>
    </transition>


    <RouterView class="font-inter" />
    <!-- <router-view class="font-publicsans" v-slot="{ Component }">
      <Transition name="fade" :appear="true">
        <component :is="Component" />
      </Transition>
    </router-view> -->
  </div>

</template>
<script setup lang="ts">
import { useIsFetching } from '@tanstack/vue-query';
import { storeToRefs } from 'pinia';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import LoadingBar from './components/loadingBar.vue';
import { useLoaderStore } from './composables/queries/useLoader';


const { isLoading: loading } = storeToRefs(useLoaderStore());

const route = useRoute();
const isVisited = ref(false);

const isFetching = useIsFetching(
  // { queryKey: [adminQueryKeys.adminFilters] }
);

// useIsLo

const { startLoading, stopLoading, stopLoadingSkeleton } = useLoaderStore();
const initialLoadingComplete = ref(false);




watch(isFetching, (newValue) => {


  if (newValue > 0 && isVisited.value == false) {
    startLoading();

    isVisited.value = true;
  }
  if (newValue == 0) {
    stopLoading();
    stopLoadingSkeleton();

  }
}, { immediate: true });

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
