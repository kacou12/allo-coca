<template>
    <div class="flex flex-col justify-center space-y-3 px-2 py-5  bg-[#F6F6F6] rounded-lg items-center">
        <section class="flex gap-1 items-center">
            <Star :size="16" class="text-[#FDB022]"></Star>
            <Star :size="16" class="text-[#FDB022]"></Star>
            <Star :size="16" class="text-[#FDB022]"></Star>
            <Star :size="16" class="text-[#FDB022]"></Star>
            <Star :size="16" class="text-[#FDB022]"></Star>
        </section>
        <img class="w-[80px] h-[80px] object-cover rounded-full" src="@/assets/allococa/home/clients/avatar-1.png"
            alt="">

        <div class="h-[50px] ">

            <p class="text-sm text-[#4F4F4F] line-clamp-2 text-center">J'ai reçu mon casier en moins de 2h !Très
                pratique pour mes
                soirées entre
                amis.</p>
        </div>

        <p class="text-[#1E1E1E] font-semibold">Fatou B., Yopougon</p>
    </div>
</template>

<script setup lang="ts">
import { Star } from 'lucide-vue-next';


</script>

<style scoped></style>