<template>
    <CommonModal :handle-submit="onSubmit" backgroud-color="bg-white" v-model:open="open" :showDivider="false">
        <template #trigger>
            <CustomButton :padding-y="2" type="default">
                <ArrowUpCircle></ArrowUpCircle>
                Approvisionner
            </CustomButton>
        </template>

        <template #title>
            <span>Approvisionnement du solde de transfert</span>
        </template>
        <template #content class="">
            <!-- First section  -->
            <div class="space-y-4">

                <section class="  ">
                    <div>
                        <p class="flex-1 text-neutral-20 ">Montant</p>
                    </div>
                    <div class=" w-full">
                        <CustomInputField type="number" v-model="formState.amount" name="amount" id="amount"
                            placeholder="100000" class="py-2 pr-12" required>
                        </CustomInputField>



                    </div>
                </section>
                <section class="">
                    <div>
                        <p class="flex-1 text-neutral-20 ">Banque</p>
                    </div>
                    <div class="">
                        <SelectField name="bank" v-model="formState.bank" border-color="border-neutral-60"
                            default-width="w-full" title="Banque" :elements="bankElements">
                        </SelectField>

                    </div>
                </section>

                <!-- file select -->
                <FileField name="file_url" v-model="formState.file_url"></FileField>
                <!-- <section>

                    <FadeInAnimation>

                        <div v-if="files == null" class="bg-neutral-80 rounded-md py-8 text-center space-y-3">
                            <article class="space-y-1">

                                <p class="text-sm text-black font-medium">Téléchargez l’image du bordereau de versement
                                </p>

                                <p class="text-xs text-[#999999]">JPEG, PNG, PDF, jusqu'à 50 Mo.</p>
                            </article>

                            <div>

                                <CommonButton @click="openSelectFile" type="outline" title="Parcourir le fichier">
                                </CommonButton>
                            </div>

                        </div>
                        <div class="h-[153px]" v-else>
                            <DocumentType @reset="resetFile" :file-size="files!.item(0)!.size"
                                :file-name="files!.item(0)!.name"
                                :file-type="(files?.item(0)!.type.toLowerCase() as FileTypeEnum)"></DocumentType>
                        </div>
                    </FadeInAnimation>
                </section> -->




            </div>
        </template>

        <template #footer>
            <div class="flex gap-2 px-6 py-5 w-full">


                <Button class="flex-1 py-[22px] text-sm rounded-lg font-medium" variant="outline" @click="open = false">
                    Annuler
                </Button>
                <Button type="submit" class="flex-1 py-[22px] text-sm rounded-lg bg-primary font-normal"
                    variant="default">
                    Terminer
                </Button>
            </div>

        </template>

    </CommonModal>
</template>
<script setup lang="ts">
import CustomButton from '@/components/buttons/customButton.vue';
import CommonModal from '@/components/common/commonModal.vue';
import { Button } from '@/components/ui/button';
import CustomInputField from '@/components/vee-validate/CustomInputField.vue';
import FileField from '@/components/vee-validate/fileField.vue';
import SelectField from '@/components/vee-validate/selectField.vue';
import { useDepositRequestMutation } from '@/composables/useMerchantRequestQueries';
import { MerchantRequestTypeEnum } from '@/constants/constant.enum';
import { BankLists } from '@/services/merchant-request/merchant-request-constants';
import { depositSchema } from '@/services/merchant-request/merchant-request-schema';
import type { MerchantDepositRequest } from '@/services/merchant-request/merchant-request.type';
import { useLoaderStore } from '@/stores/useLoaderStore';
import { toTypedSchema } from '@vee-validate/zod';
import { useFileDialog } from '@vueuse/core';
import { ArrowUpCircle } from 'lucide-vue-next';
import { useForm } from 'vee-validate';
import { computed, ref, watch } from 'vue';
import { useToast } from 'vue-toastification';

const toast = useToast();

const { startLoading } = useLoaderStore();

const { files, open: openSelectFile, reset: resetFile, onCancel, onChange } = useFileDialog({
    accept: 'image/*,application/pdf', // Set to accept only image files
    multiple: false,
});

const { mutateAsync: depositRequest } = useDepositRequestMutation();


const open = ref(false);



const initialFormState: MerchantDepositRequest = {
    amount: undefined,
    bank: undefined,
    file_url: undefined, // Vous pouvez supprimer ceci si le fichier est toujours envoyé directement via FormData
    type: MerchantRequestTypeEnum.Deposit
} as const;
const formState = ref<MerchantDepositRequest>({
    ...initialFormState
})

const [amountModel,] = defineModel('status', {
    set(value: string) {

        return value
    },
    default: undefined,
})



watch(open, (newValue) => {
    if (newValue) {
        formState.value = { ...initialFormState };
        resetFile();
    }
});


const bankElements = computed(() => Object.values(BankLists));

const { handleSubmit, resetForm } = useForm({
    validationSchema: toTypedSchema(depositSchema)
});

const onSubmit = handleSubmit(({ }) => {
    depositRequestHandler();
});

const depositRequestHandler = async () => {
    // formState.value.file_url = files.value!.item!(0)!;

    startLoading();
    await depositRequest(formState.value);
    open.value = false;
    toast.success("La demande d'approvisionnement a bien été soumise");
}


</script>