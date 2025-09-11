<template>
    <Dialog v-model:open="open">
        <DialogTrigger as-child>

        </DialogTrigger>
        <DialogContent :onInteractOutside="(e) => {
            e.preventDefault();
        }" class="max-w-[90%] rounded-lg sm:max-w-[750px] font-worksans ">
            <!-- bg-[url('/src/assets/images/hexagone.png')]  -->
            <DialogHeader :class="[showDivider ? 'border-b-[1px]' : '']"
                class="flex flex-row justify-between   border-neutral-200">
                <DialogTitle>
                    <h2 class="text-lg font-bold text-red-600">Important : Votre clé secrète</h2>
                </DialogTitle>
                <!-- <DialogDescription>
                        Make changes to your profile here. Click save when you're done.
                    </DialogDescription> -->


                <!-- CLOSE ICON SVG -->
                <!-- <DialogClose class="w-fit rounded-sm opacity-70  
                        transition-opacity hover:opacity-100 
                        disabled:pointer-events-none 
                        data-[state=open]:bg-accent 
                        data-[state=open]:text-muted-foreground border-none">
                        <close-icon></close-icon>

                    </DialogClose> -->


            </DialogHeader>

            <!-- content section -->
            <section :class="`text-sm px-4 py-4 ${backgroudColor}`">
                <div class="space-y-4 p-4 ">


                    <div class=" gap-2 space-y-1 rounded-md bg-[#ffedd5] p-4 text-orange-800 border border-left-4  border-left-[#FA703F]"
                        style="background-color: #FEF3EB; color: #B45309;">

                        <div class="flex items-center gap-2 text-[#771505]">

                            <AlertTriangleIcon class=" w-5 h-5" />
                            <p class="text-[#771505] font-bold">Attention</p>
                        </div>

                        <div>

                            <p>Veuillez copier cette clé immédiatement. Elle ne sera **pas** affichée à nouveau après la
                                fermeture de cette fenêtre.</p>
                        </div>
                    </div>

                    <div class="flex justify-between items-center rounded-md border border-gray-300 bg-gray-50 p-3">
                        <p class="text-xs flex flex-wrap">{{ secretKey }}</p>
                        <CommonClipBoard @copy="isCopied = true" :data-to-copy="secretKey">
                        </CommonClipBoard>

                    </div>

                </div>
            </section>


            <DialogFooter>
                <div class="p-4 w-full flex gap-x-2  border-t-[1px] ">

                    <CustomButton :is-disabled="!isCopied" class="w-full py-[22px] text-sm rounded-lg font-medium"
                        variant="destructive" @click="closeHandler">
                        Fermer
                    </CustomButton>
                    <CustomButton class="w-full py-[22px] text-sm rounded-lg font-medium" variant="default"
                        @click="copyHandler">
                        Copier
                    </CustomButton>
                </div>

            </DialogFooter>

        </DialogContent>
    </Dialog>
</template>
<script setup lang="ts">
import closeIcon from '@/components/svg/closeIcon.vue'
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog'
import DialogClose from '@/components/ui/dialog/DialogClose.vue'

import { ref, type PropType } from 'vue'
import CustomButton from '../buttons/customButton.vue'
import { AlertTriangleIcon } from 'lucide-vue-next'
import { copyToClipBoard } from '@/shared/shared'
import { useToast } from 'vue-toastification'
import CommonClipBoard from './commonClipBoard.vue'


const isCopied = ref(false);
const toast = useToast();

const { secretKey } = defineProps({
    backgroudColor: {
        default: 'bg-[#F5F5F5]',
        type: String as PropType<'bg-neutral-80' | 'bg-white'>
    },
    showDivider: {
        default: true,
        type: Boolean
    },
    secretKey: {
        type: String,
        default: ''
    }
})
// const secretKey = 'secretKeyofjkoekfe6efeok89efe7f7ef7vg74';

// defineEmits(['onSubmit'])

const open = defineModel({ type: Boolean, default: false });
// const open = ref(true);
const emit = defineEmits(['close'])

const closeHandler = () => {
    open.value = false;
    isCopied.value = false;
    emit('close');
}

const copyHandler = () => {
    copyToClipBoard(secretKey)
    isCopied.value = true;
    toast.info("copie effectué", { timeout: 3000 });
}



</script>