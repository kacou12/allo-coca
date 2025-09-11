<template>
    <CommonModal backgroud-color="bg-white" v-model:open="open" :showDivider="false">
        <template #trigger>
            <!-- <CommonButton type="default" @action="console.log('wapiti')" title="Créer un compte"></CommonButton> -->
            <CustomButton :padding-y="2" type="destructive">
                <ArrowUpLeftSquare></ArrowUpLeftSquare>
                Transfert
            </CustomButton>
        </template>

        <template #title>
            <span>Transfert</span>
        </template>
        <template #content class="">
            <!-- First section  -->
            <div class="space-y-4">

                <section class="  ">
                    <div>
                        <p class="flex-1 text-neutral-20 ">Montant a transférer</p>
                    </div>
                    <div class=" w-full max-w-[512px] relative">
                        <Input type="amount" id="amount" placeholder="100000" class="py-2 pr-12" required>
                        </Input>
                        <button type="button" class="absolute inset-y-0 right-2 text-neutral-20">
                            FCFA
                        </button>
                    </div>
                </section>


            </div>
        </template>

        <template #footer>
            <div class="flex gap-2 px-6 py-5 w-full">
                <Button class="flex-1 py-[22px] text-sm rounded-lg font-medium" variant="outline" @click="open = false">
                    Annuler
                </Button>
                <Button class="flex-1 py-[22px] text-sm rounded-lg bg-primary font-normal" variant="default">
                    Transferer
                </Button>
            </div>
        </template>

    </CommonModal>
</template>
<script setup lang="ts">
import CustomButton from '@/components/buttons/customButton.vue';
import CommonModal from '@/components/common/commonModal.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowUpLeftSquare } from 'lucide-vue-next';
import { ref } from 'vue';


const open = ref(false);


</script>