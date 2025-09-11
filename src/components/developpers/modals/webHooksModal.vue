<template>
    <CommonModal :handle-submit="onSubmit" backgroud-color="bg-white" v-model:open="open" :showDivider="false">
        <template #trigger>
            <!-- <CommonButton type="default" @action="console.log('wapiti')" title="Créer un compte"></CommonButton> -->
            <CustomButton type="outline">
                <div class="flex items-center gap-2">
                    <SubtitlesIcon class="w-5 h-5 mr-2" />
                    <span>CREATE SUBSCRITPION</span>
                </div>
            </CustomButton>
        </template>

        <template #title>
            <span>WEB HOOKS</span>
        </template>
        <template #content class="">
            <!-- First section  -->
            <div class="space-y-4">
                <section class="  ">
                    <div>
                        <p class="flex-1 text-neutral-20 ">Nom</p>
                    </div>
                    <div class=" w-full max-w-[512px]">
                        <InputField name="name" v-model="payloadState.name" type="text" id="name"
                            placeholder="WEBHOOK  NAME" class="py-2 pr-12" required>
                        </InputField>

                    </div>
                </section>

                <section class="  ">
                    <div>
                        <p class="flex-1 text-neutral-20 ">URL</p>
                    </div>
                    <div class=" w-full max-w-[512px]">
                        <InputField name="url" v-model="payloadState.url" type="text" id="name"
                            placeholder="https://example.com" class="py-2 pr-12" required>
                        </InputField>

                    </div>
                </section>
                <section class="">
                    <div>
                        <p class="flex-1 text-neutral-20 ">Evenements</p>
                    </div>
                    <div class="">

                        <!-- <CommonMultiselect v-model="payloadState.events" :options="webhookElements" placeholder="event"
                            :animation="0.5" :max-count="2" variant="default">
                        </CommonMultiselect> -->
                        <MultiSelectField :animation="0.5" :max-count="2" variant="default" :options="webhookElements"
                            placeholder="event" name="events" v-model="payloadState.events" :elements="webhookElements">
                        </MultiSelectField>

                    </div>
                </section>
                <section class="">
                    <div>
                        <p class="flex-1 text-neutral-20 ">Environnement</p>
                    </div>
                    <div class="">
                        <!-- <CommonSelect v-model="payloadState.environment" border-color="border-neutral-60"
                            default-width="w-full" title="Environnement" :elements="[
                                { name: 'SandBox', value: EnvironmentsEnum.Sandbox },
                                { name: 'Live', value: EnvironmentsEnum.Live },
                            ]">

                        </CommonSelect> -->

                        <SelectField name="environment" v-model="payloadState.environment"
                            border-color="border-neutral-60" default-width="w-full" title="Environnement"
                            :elements="currenElements">
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
                <Button type="submit" class=" flex-1 py-[22px] text-sm rounded-lg bg-primary font-normal"
                    variant="default">
                    Create
                </Button>
            </div>
        </template>

    </CommonModal>
</template>
<script setup lang="ts">
import CustomButton from '@/components/buttons/customButton.vue';
import CommonModal from '@/components/common/commonModal.vue';
import { Button } from '@/components/ui/button';
import InputField from '@/components/vee-validate/InputField.vue';
import MultiSelectField from '@/components/vee-validate/multiSelectField.vue';
import SelectField from '@/components/vee-validate/selectField.vue';
import { useCreateWebhookMutation } from '@/composables/queries/useWebhookQueries';
import { EnvironmentsEnum, WebhookEnum } from '@/constants/constant.enum';
import type { WebhookPayload } from '@/services/webhook/webhook-type';
import { useLoaderStore } from '@/stores/useLoaderStore';
import { toTypedSchema } from '@vee-validate/zod';
import { SubtitlesIcon } from 'lucide-vue-next';
import { useForm } from 'vee-validate';
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useToast } from 'vue-toastification';
import { z } from 'zod';

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

const webhookSchema = z.object({
    name: z.string().min(1, "Le nom est requis."),
    url: z.string()
        .url("L'URL doit être une URL valide.")
        .min(1, "L'URL est requise.")
        .startsWith('https://', "L'URL doit commencer par 'https://'.") // Added HTTPS validation
        .refine(val => val.includes('.'), "L'URL doit contenir un point."), // Added dot validation
    events: z.array(z.string()).min(1, "Veuillez sélectionner au moins un événement."),
    environment: z.nativeEnum(EnvironmentsEnum, {
        errorMap: () => ({ message: "Veuillez sélectionner un environnement valide." })
    }),
});


const route = useRoute()
const toast = useToast();

const { startLoading } = useLoaderStore();
const { mutateAsync: createWebhook } = useCreateWebhookMutation(route.params.id as string);

const { handleSubmit, resetForm } = useForm({
    validationSchema: toTypedSchema(webhookSchema)
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

const payloadState = ref<WebhookPayload>(
    {
        events: [],
        environment: "",
        // merchant_id: route.params.id as string,
        url: undefined,
        name: undefined

    }
);

const webhookElements = [
    { label: 'Transaction Created', value: WebhookEnum.TransactionCreated },
    { label: 'Transaction Processing', value: WebhookEnum.TransactionProcessing },
    { label: 'Transaction Pending', value: WebhookEnum.TransactionPending },
    { label: 'Transaction Updated', value: WebhookEnum.TransactionUpdated },
    { label: 'Transaction Failed', value: WebhookEnum.TransactionFailed },
    { label: 'Transaction Refunded', value: WebhookEnum.TransactionRefunded },
    { label: 'Transaction Success', value: WebhookEnum.TransactionSuccess },
];

const open = ref(false);

const createWebhookHandler = async () => {

    try {
        startLoading();
        await createWebhook(payloadState.value);
        open.value = false
        resetForm();
        toast.success("Le webhook a bien été crée");
    } catch (err) {

    }


}

const onSubmit = handleSubmit(async ({ }) => {
    await createWebhookHandler();
});



</script>