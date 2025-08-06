<template>
    <div class="px-4 w-full">
        <header class="mb-6">
            <h1 class="text-xl font-bold font-merriweathersans">Approvisionnement</h1>
            <p class="text-sm text-[#808080]">Augmenter votre solde de transaction</p>
        </header>

        <BannerWallet></BannerWallet>

        <section class="space-y-4 my-5">
            <p class="font-semibold">Choisissez votre société</p>
            <div class="grid grid-cols-3 gap-5">

                <CanalTransactionModal></CanalTransactionModal>

                <article
                    class="cursor-pointer hover:bg-neutral-80 transition-all  duration-300 flex items-center gap-2 border-[2px] shadow-sm border-[#F5F5F5] rounded-lg p-2">
                    <img class="rounded-md w-[48px] h-[48px] bg-cover" src="@/assets/images/invoices/sodeci.png"
                        alt="canal" />
                    <div class="min-w-[146px]">
                        <p class="font-semibold font-worksans text-sm text-neutral-10">
                            SODECI
                        </p>
                        <p class="text-sm text-[#4B5675]">443210987657</p>
                    </div>
                </article>

                <article
                    class="cursor-pointer hover:bg-neutral-80 transition-all  duration-300 flex items-center gap-2 border-[2px] shadow-sm border-[#F5F5F5] rounded-lg p-2">
                    <img class="rounded-md w-[48px] h-[48px] bg-cover" src="@/assets/images/invoices/cie.png"
                        alt="canal" />
                    <div class="min-w-[146px]">
                        <p class="font-semibold font-worksans text-sm text-neutral-10">
                            CIE
                        </p>
                        <p class="text-sm text-[#4B5675]">173210987870</p>
                    </div>
                </article>
            </div>
        </section>


    </div>
</template>

<script setup lang="ts">


// Définir le type pour une banque

// Déclarer la variable réactive pour les banques

</script>

<style>
/* Ajoutez des styles personnalisés si nécessaire */
</style>