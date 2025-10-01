<template>
    <div class="py-10 space-y-10 pt-[110px]   max-w-[848px] mx-auto px-5">

        <h3 class="text-clamp-md font-bold font-tcc mt-10">Mes informations de livraison</h3>

        <DeliveryForm></DeliveryForm>

    </div>
</template>

<script setup lang="ts">
import DeliveryForm from '@/components/allococa/forms/deliveryForm.vue';
import Button from '@/components/ui/button/Button.vue';


</script>

<style scoped></style>