<template>
    <form @submit.prevent="onSubmit" class="mx-5">
        <div class="">
            <label class="block text-[#3D3D3D] text-sm font-medium mb-2" for="name">
                Nom complet
            </label>
            <InputField v-model="name" placeholder="Entrer votre nom complet" name="name" />
        </div>
        <div class="">
            <label class="block text-[#3D3D3D] text-sm font-medium mb-2" for="email">
                Email
            </label>
            <InputField v-model="email" placeholder="Entrer votre email" name="email" />
        </div>
        <div class="">
            <!-- <label class="block text-[#3D3D3D] text-sm font-medium mb-2" for="phone">
                Téléphone
            </label>
            <InputField v-model="phone" placeholder="Entrer votre numéro de téléphone" name="phone" /> -->
            <section class="space-y-2 ">
                <p class="text-sm text-[#3D3D3D]  font-medium">Numero de téléphone</p>
                <div class="flex gap-3 w-full max-w-[712px] relative">
                    <!-- <Input v-model="phone" class="pl-14 border-[#3D3D3D]" id="email"
                        placeholder="numero de téléphone" />
                    <span
                        class="absolute start-0 inset-y-0 font-bold flex items-center justify-center text-sm px-2 border-r  text-black">
                        +225
                    </span> -->
                    <InputField v-model="phone" placeholder="0506582036" name="phone" />
                </div>
            </section>
        </div>
        <div class="">
            <label class="block text-[#3D3D3D] text-sm font-medium mb-2" for="address">
                Adresse
            </label>
            <InputField v-model="address" placeholder="Cocody Saint Jean" name="address" />
        </div>

        <div class="">
            <label class="block text-[#3D3D3D] text-sm font-medium mb-2" for="password">
                Mot de passe
            </label>
            <PasswordField v-model="password" placeholder="Mot de passe" name="password" />
        </div>
        <div class="mb-6">
            <label class="block text-[#3D3D3D] text-sm font-medium mb-2" for="confirmPassword">
                Confirmer le mot de passe
            </label>
            <PasswordField v-model="confirmPassword" placeholder="Confirmer le mot de passe" name="confirmPassword" />
        </div>

        <CustomButton :is-loading="loading"
            class="font-worksans rounded-3xl text-white font-normal text-[15px] py-[22px] px-4 w-full hover:bg-primary-40 focus:outline-none focus:ring focus:ring-primary-60">
            Rejoindre la famille
        </CustomButton>


    </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { useMutation } from '@tanstack/vue-query';
import { useToast } from 'vue-toastification';
import * as z from 'zod';

import CustomButton from '@/components/buttons/customButton.vue';
import InputField from '@/components/vee-validate/InputField.vue';
import PasswordField from '@/components/vee-validate/PasswordField.vue';
import Input from '@/components/ui/input/Input.vue';
import type { RegisterForm, RegisterRequest } from '@/services/auth/auth-type';
import { registerSchema } from '@/services/auth/auth-schema';
import { registerUser } from '@/services/auth/auth-service';
import { useAuthStore } from '@/stores/useAuthStore';
import { AppRoute } from '@/constants/app-route';

const { setUser } = useAuthStore();

const {
    isPending: loading,
    isError,
    error,
    mutate,
    mutateAsync
} = useMutation({
    mutationFn: (credential: RegisterRequest) => registerUser(credential),
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

const router = useRouter();
const toast = useToast();

const name = ref('');
const email = ref('');
const phone = ref('');
const password = ref('');
const address = ref('');
const confirmPassword = ref('');

const { handleSubmit, resetForm } = useForm({
    validationSchema: toTypedSchema(registerSchema)
});


const onSubmit = handleSubmit((values) => {
    mutate(values);
});
</script>

<style scoped></style>