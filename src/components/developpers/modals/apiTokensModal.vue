<template>


    <CommonModal :handle-submit="onSubmit" backgroud-color="bg-white" v-model:open="open" :showDivider="false">
        <template #trigger>
            <!-- <CommonButton type="default" @action="console.log('wapiti')" title="Créer un compte"></CommonButton> -->
            <CustomButton type="outline">
                <div class="flex items-center gap-2">
                    <UserPlus2 class="w-5 h-5 mr-2" />
                    <span>GENERATE TOKEN</span>
                </div>
            </CustomButton>
        </template>

        <template #title>
            <span>API token</span>
        </template>
        <template #content class="">

            <!-- <ConfirmKeyModal v-model:open="openConfirm"></ConfirmKeyModal> -->
            <!-- First section  -->
            <div class="space-y-4">

                <section class="  ">
                    <div>
                        <p class="flex-1 text-neutral-20 ">Nom</p>
                    </div>
                    <div class=" w-full max-w-[512px]">
                        <InputField name="name" v-model="formState.name" type="text" id="name"
                            placeholder="Api token name" class="py-2 pr-12" required>
                        </InputField>

                    </div>
                </section>
                <section class="">
                    <div>
                        <p class="flex-1 text-neutral-20 ">Environnement</p>
                    </div>
                    <div class="">
                        <SelectField name="environment" v-model="formState.environment" border-color="border-neutral-60"
                            default-width="w-full" title="Environnement" :elements="currenElements">
                        </SelectField>

                    </div>
                </section>

            </div>
        </template>

        <template #footer>
            <div class="flex gap-2 px-6 py-5 w-full">
                <Button class="flex-1 py-[22px] text-sm rounded-lg font-medium" variant="outline" @click="open = false">
                    Annuler
                </Button>
                <Button type="submit" class="flex-1 py-[22px] text-sm rounded-lg bg-primary font-normal"
                    variant="default">
                    Generate
                </Button>
            </div>
        </template>

    </CommonModal>
    <ConfirmKeyModal @close="resetKeyString" :secret-key="keyString" v-model="openConfirm" backgroud-color="bg-white">
    </ConfirmKeyModal>
</template>
<script setup lang="ts">
import CustomButton from '@/components/buttons/customButton.vue';
import CommonModal from '@/components/common/commonModal.vue';
import ConfirmKeyModal from '@/components/common/confirmKeyModal.vue';
import { Button } from '@/components/ui/button';
import InputField from '@/components/vee-validate/InputField.vue';
import SelectField from '@/components/vee-validate/selectField.vue';
import { useCreateKeyMutation } from '@/composables/queries/useKeyQueries';
import { EnvironmentsEnum } from '@/constants/constant.enum';
import type { KeyForm, KeyRequest } from '@/services/keys/key-type';
import { useLoaderStore } from '@/stores/useLoaderStore';
import { toTypedSchema } from '@vee-validate/zod';
import { UserPlus2 } from 'lucide-vue-next';
import { useForm } from 'vee-validate';
import { computed, ref, watch } from 'vue';
import { useToast } from 'vue-toastification';
import { z } from 'zod';

const toast = useToast();

const { canAddLiveKey, canAddSandboxKey } = defineProps({
    canAddLiveKey: {
        type: Boolean,
        required: true
    },
    canAddSandboxKey: {
        type: Boolean,
        required: true
    }
});

const currenElements = computed(() => {
    let elements = [];
    if (canAddLiveKey) {
        elements.push({ name: 'Live', value: EnvironmentsEnum.Live });
    }
    if (canAddSandboxKey) {
        elements.push({ name: 'Sandbox', value: EnvironmentsEnum.Sandbox });
    }
    return elements;

})

const { startLoading, stopLoading } = useLoaderStore();

const open = ref(false);
const openConfirm = ref(false);
const keyString = ref('');

const tokenSchema = z.object({
    name: z.string().min(1, { message: 'Le nom ne peut pas être vide' }).trim(),
    environment: z.nativeEnum(EnvironmentsEnum, { required_error: 'L’environnement est requis' }),

})


const { handleSubmit, resetForm } = useForm({
    validationSchema: toTypedSchema(tokenSchema)
});

const resetKeyString = () => {
    console.log("closing");

    keyString.value = '';
}

const { mutateAsync: createKey } = useCreateKeyMutation();

const initialFormState: KeyForm = {
    name: undefined,
    environment: undefined,
};

const formState = ref<KeyForm>({
    ...initialFormState
});


watch(open, (newValue) => {
    if (newValue) {
        formState.value = { ...initialFormState };
    }
});


const createKeyHandler = async () => {
    startLoading();
    try {

        const keyResponse = await createKey(formState.value as KeyRequest);
        keyString.value = keyResponse!.key;
        open.value = false;
        openConfirm.value = true;
        resetForm();
        toast.success("Le token a bien été crée");
    } catch (err) {

    } finally {
        stopLoading();
    }
}

const onSubmit = handleSubmit(async ({ }) => {
    await createKeyHandler();

});

</script>