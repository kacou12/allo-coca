<template>
    <CommonModal :handle-submit="onSubmit" backgroud-color="bg-white" v-model:open="open" :showDivider="false">
        <template #trigger>
            <CommonButton type="destructive" @action="() => { }" title="modifier le mot de passe">
            </CommonButton>
        </template>

        <template #title>
            <span>Modification du mot de passe</span>
        </template>
        <template #content>
            <div class="space-y-3">
                <section class=" ">
                    <p class=" text-neutral-20 ">ancien mot de passe</p>
                    <div class=" gap-3 w-full ">
                        <PasswordField class="w-full" v-model="userData.oldPassword" placeholder="Mot de passe"
                            name="oldPassword" />
                    </div>
                </section>
                <section class=" ">
                    <p class=" text-neutral-20 ">Nouveau mot de passe</p>
                    <div class=" gap-3 w-full ">
                        <PasswordField class="w-full" v-model="userData.password" placeholder="Nouveau mot de passe"
                            name="password" />
                    </div>
                </section>

                <section class=" ">
                    <p class=" text-neutral-20 ">Confirmation du mot de passe</p>
                    <div class="gap-3 w-full ">
                        <PasswordField v-model="userData.confirmPassword"
                            placeholder="confirmation du nouveau mot de passe" name="confirmPassword" />
                    </div>
                </section>



            </div>
        </template>

        <template #footer>
            <div class="flex gap-2 px-5 py-5 w-full">
                <Button class="flex-1  text-sm rounded-lg font-medium" variant="outline" @click="open = false">
                    Annuler
                </Button>
                <Button type="submit" class="flex-1  text-sm rounded-lg bg-primary font-normal" variant="default">
                    Valider
                </Button>
            </div>

        </template>

    </CommonModal>
</template>
<script setup lang="ts">
import CommonButton from '@/components/buttons/commonButton.vue';
import CommonModal from '@/components/common/commonModal.vue';
import { Button } from '@/components/ui/button';
import PasswordField from '@/components/vee-validate/PasswordField.vue';
import { useUpdateUserPasswordMutation } from '@/composables/queries/useAuthQueries';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { ref, type PropType } from 'vue';
import { useToast } from 'vue-toastification';
import { z } from 'zod';

const passwordsSchema = z.object({
    oldPassword: z
        .string({ required_error: 'Le mot de passe par defaut est requis' }).min(1, { message: 'Le mot de passe est requis' }),
    password: z
        .string({ required_error: 'Le mot de passe est requis' })
        .min(1, { message: 'Le mot de passe ne peut pas être vide' })
        .trim(),
    confirmPassword: z.string().min(1, { message: 'La confirmation du mot de passe est requise' }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ['confirmPassword'],
})

const open = ref(false);
const toast = useToast();



const { handleSubmit, resetForm } = useForm({
    validationSchema: toTypedSchema(passwordsSchema)
});

const { mutateAsync: updateUserPassword } = useUpdateUserPasswordMutation();
const userData = ref({ oldPassword: "", password: "", confirmPassword: "" });



const updatePasswordHandler = async () => {
    try {
        await updateUserPassword({
            password: userData.value.oldPassword,
            new_password: userData.value.password
        });
        open.value = false;
        toast.success("Le mot de passe a été mis à jour avec succès");

    } catch (err) {

    }

};



const onSubmit = handleSubmit(async ({ }) => {
    await updatePasswordHandler();
    resetForm();
});

</script>