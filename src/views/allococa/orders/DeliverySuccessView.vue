<template>
    <div class="py-10 spac-y-5 pt-[110px]   maxContain3xl space-y-4 flex flex-col items-center">

        <section class="shadow-md rounded-lg p-4 text-center space-y-3 max-w-[425px] mt-10">
            <div class="w-full flex justify-center">

                <img src="@/assets/allococa/success-delivery.png" alt="">
            </div>

            <p class="font-semibold">🎉 Commande validée avec succès !</p>

            <p class="text-sm">Votre casier est en route.
                Vous recevrez un e-mail dans quelques instants pour confirmer la
                livraison.</p>

            <p class="font-semibold">Détail express de la commande</p>

            <div class="space-y-2">
                <article class="flex justify-between items-center">
                    <p class="text-sm text-[#454545]">Numéro de commande</p>
                    <p class="text-sm font-bold">{{ reference }}</p>
                </article>
                <article class="flex justify-between items-center">
                    <p class="text-sm text-[#454545]">Contenu résumé</p>
                    <p class="text-sm font-bold">{{ totalCasier }} casier(s) / {{ totalPack }} pack(s)</p>
                </article>
                <article class="flex justify-between items-center">
                    <p class="text-sm text-[#454545]">Montant total</p>
                    <p class="text-sm font-bold">{{ formatPrice(subtotal) }}</p>
                </article>
            </div>

            <p class="text-sm text-[#6D6D6D]">Paiement à la livraison</p>

            <div class="w-full">
                <Button @click="$router.push({ name: AppRoute.ORDERS.name })" variant="link" class="text-black">Voir mon
                    historique</Button>
            </div>

        </section>

        <!-- <section class="text-sm flex items-center flex-wrap md:flex-nowrap justify-center md:justify-start">
            <p class="text-[#4F4F4F]">Tu n’as pas reçu ton SMS ?</p>
            <Button variant="link" class="text-black">Clique ici pour recevoir un nouveau récapitulatif.</Button>
        </section> -->

    </div>
</template>

<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue';
import { useCart } from '@/composables/queries/useCart';
import { AppRoute } from '@/constants/app-route';
import { formatPrice } from '@/shared/shared';
import { useRoute, useRouter } from 'vue-router'; // Import useRouter
import { onMounted, watch } from 'vue'; // Import onMounted hook


const route = useRoute();
const router = useRouter(); // Initialize router for programmatic navigation

const totalCasier = route.query['totalCasier']
const totalPack = route.query['totalPack']
const subtotal = parseInt(route.query['subtotal'] as string)
const reference = route.query['reference']

// const { formatCartLineToOrderPayload, total, clearCart } = useCart();

// Set the time for redirection (2 minutes = 120,000 milliseconds)
const REDIRECT_DELAY_MS = 1 * 60 * 1000 * 0.5

// Set a timeout to redirect the user
onMounted(() => {
    setTimeout(() => {

        router.push({ name: AppRoute.HOME.name });

        console.log(`Redirecting after ${REDIRECT_DELAY_MS / 1000} seconds.`);
    }, REDIRECT_DELAY_MS);

});

</script>

<style scoped></style>