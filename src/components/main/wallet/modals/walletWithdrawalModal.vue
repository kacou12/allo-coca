<template>
    <CommonModal :handle-submit="onSubmit" backgroud-color="bg-white" v-model:open="open" :showDivider="false">
        <template #trigger>
            <CustomButton :padding-y="2" type="outline">
                <ArrowDownCircle>
                </ArrowDownCircle>
                Retrait
            </CustomButton>
        </template>

        <template #title>
            <span>Retrait du solde de collecte</span>
        </template>
        <template #content class="">
            <!-- First section  -->
            <div class="space-y-4">

                <section class="  ">
                    <div>
                        <p class="flex-1 text-neutral-20 ">Montant a retirer</p>
                    </div>
                    <div class=" w-full ">
                        <CustomInputField v-model="formState.amount" name="amount" id="amount" placeholder="100000"
                            class="py-2 pr-12" required>
                        </CustomInputField>

                    </div>
                </section>
                <!-- <section class="  ">
                    <div>
                        <p class="flex-1 text-neutral-20 ">RIB</p>
                    </div>
                    <div class=" w-full max-w-[512px]">
                        <InputField v-model="formState.rib" name="rib" type="text" id="rib"
                            placeholder="NL92ABNA6022027691" class="py-2 pr-12" required>
                        </InputField>
                    </div>
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
                    Retirer
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
import { usewithdrawalRequestMutation } from '@/composables/useMerchantRequestQueries';
import { MerchantRequestTypeEnum } from '@/constants/constant.enum';
import { withdrawalSchema } from '@/services/merchant-request/merchant-request-schema';
import { useLoaderStore } from '@/stores/useLoaderStore';
import { toTypedSchema } from '@vee-validate/zod';
import { ArrowDownCircle } from 'lucide-vue-next';
import { useForm } from 'vee-validate';
import { ref, watch } from 'vue';
import { useToast } from 'vue-toastification';
import InputField from '@/components/vee-validate/InputField.vue';
import type { MerchantWithdrawalRequest } from '@/services/merchant-request/merchant-request.type';
import CustomInputField from '@/components/vee-validate/CustomInputField.vue';

const toast = useToast();

const { startLoading } = useLoaderStore();

const { mutateAsync: withDrawalRequest } = usewithdrawalRequestMutation();

const open = ref(false);

const initialFormState: MerchantWithdrawalRequest = {
    amount: undefined,
    // rib: undefined,
    type: MerchantRequestTypeEnum.Withdrawal
};

const formState = ref<MerchantWithdrawalRequest>({
    amount: undefined,
    // rib: undefined,
    type: MerchantRequestTypeEnum.Withdrawal
})




watch(open, (newValue) => {
    if (newValue) {
        formState.value = { ...initialFormState };
    }
});

const withDrawalRequestHandler = async () => {
    startLoading();
    await withDrawalRequest(formState.value);
    resetForm();
    open.value = false;
    toast.success("La demande de retrait a bien été soumise");
}


const { handleSubmit, resetForm } = useForm({
    validationSchema: toTypedSchema(withdrawalSchema)
});

const onSubmit = handleSubmit(({ }) => {
    withDrawalRequestHandler();
});




</script>