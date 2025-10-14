<template>

    <form @submit.prevent="onSubmit" class="mx-5">
        <div class="">
            <label class="block text-neutral-20 text-sm font-medium mb-2" for="email">
                Email
            </label>
            <InputField v-model="email" placeholder="Entrer votre email" name="email" />
        </div>
        <div class="mb-4"> <label class="block text-neutral-20 text-sm font-medium mb-2" for="password">
                Mot de passe
            </label>
            <PasswordField v-model="password" placeholder="Mot de passe" name="password" />

            <div class="text-right mt-2">
                <Button @click.prevent="$router.push({ name: AppRoute.LOST_PASSWORD.name })" variant="link"> Mot de
                    passe oublié ?</Button>
            </div>
        </div>


        <div class="mb-4 flex items-start">
            <span class="text-neutral-40 text-xs block mt-1">
                En continuant, vous acceptez les conditions générales d'utilisation et les politique de confidentialités
            </span>
        </div>

        <CustomButton :is-loading="loading"
            class=" font-worksans rounded-3xl text-white font-normal   text-[15px] py-[22px] px-4  w-full  hover:bg-primary-40 focus:outline-none focus:ring focus:ring-primary-60">
            Se connecter
        </CustomButton>
    </form>
</template>

<script setup lang="ts">

import { AppRoute } from '@/constants/app-route';
import { loginSchema } from '@/services/auth/auth-schema';
import { loginWithCredential } from '@/services/auth/auth-service';
import type { LoginForm } from '@/services/auth/auth-type';
import { useAuthStore } from '@/stores/useAuthStore';
import { useMutation } from '@tanstack/vue-query';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import CustomButton from '../buttons/customButton.vue';
import InputField from '../vee-validate/InputField.vue';
import PasswordField from '../vee-validate/PasswordField.vue';

import { useToast } from 'vue-toastification';
import { useAuthProfilQuery } from '@/composables/queries/useAuthQueries';
import CommonButton from '../buttons/commonButton.vue';
import { Button } from '../ui/button';

const rememberMe = ref(false)

const password = ref(import.meta.env.PROD ? '' : 'azertyuiop');
const email = ref(import.meta.env.PROD ? '' : 'kacou585@gmail.com');



const route = useRoute();
const router = useRouter();
const { setUser } = useAuthStore();
const toast = useToast();

const { data: userProfil } = useAuthProfilQuery({})

const { handleSubmit, resetForm } = useForm({
    validationSchema: toTypedSchema(loginSchema)
});

const {
    isPending: loading,
    isError,
    error,
    mutate,
} = useMutation({
    mutationFn: (credential: LoginForm) => loginWithCredential(credential),
    onSuccess: async (response) => {
        if (response) {
            // console.log("sucess login", response);
            setUser(response.data!.user);
            // await refetchUserProfil();
            router.push({ name: AppRoute.HOME.name, replace: true }).then(() => {

                toast.success(`Welcome ${response.data!.user.name}!`);
            });
            //   resetForm();
            //   if (route.query?.redirect) {
            //     router.push({ path: route.query.redirect as string, replace: true });
            //   } else {
            //     router.push({ name: AppRoute.DASHBOARD, replace: true });
            //   }
        }
    },
});

const onSubmit = handleSubmit(({ email, password }) => {
    // alert("submit")
    // console.log("submit", email, password);
    mutate({ email, password });
});



</script>

<style scoped></style>