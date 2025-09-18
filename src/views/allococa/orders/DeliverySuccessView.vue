<template>
    <div class="py-10 spac-y-5 pt-[110px]   maxContain3xl space-y-4 flex flex-col items-center">

        <section class="shadow-md rounded-lg p-4 text-center space-y-3 max-w-[425px] mt-10">
            <div class="w-full flex justify-center">

                <img src="@/assets/allococa/success-delivery.png" alt="">
            </div>

            <p class="font-semibold">🎉 Commande validée avec succès !</p>

            <p class="text-sm">Ton casier est en route.
                Tu recevras un SMS dans quelques instants pour confirmer la
                livraison.</p>

            <p class="font-semibold">Détail express de la commande</p>

            <div class="space-y-2">
                <article class="flex justify-between items-center">
                    <p class="text-xs text-[#454545]">Numéro de commande</p>
                    <p class="text-xs">#AC-2030</p>
                </article>
                <article class="flex justify-between items-center">
                    <p class="text-xs text-[#454545]">Contenu résumé</p>
                    <p class="text-xs">1 casier / 2 packs</p>
                </article>
                <article class="flex justify-between items-center">
                    <p class="text-xs text-[#454545]">Montant total</p>
                    <p class="text-xs">9 600 FCFA</p>
                </article>
            </div>

            <p class="text-sm text-[#6D6D6D]">Paiement à la livraison</p>

            <div class="w-full">
                <Button @click="() => { }"
                    class="w-full py-5 text-sm rounded-[90px] bg-primary-50 hover:bg-primary-60 ">
                    Commander à nouveau
                </Button>

                <Button variant="link" class="text-black">Voir mon historique</Button>
            </div>

        </section>

        <section class="text-sm flex items-center flex-wrap md:flex-nowrap justify-center md:justify-start">
            <p class="text-[#4F4F4F]">Tu n’as pas reçu ton SMS ?</p>
            <Button variant="link" class="text-black">Clique ici pour recevoir un nouveau récapitulatif.</Button>
        </section>

    </div>
</template>

<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue';


</script>

<style scoped></style>