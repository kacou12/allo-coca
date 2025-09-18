<template>
    <form @submit.prevent="onSubmit" class="mx-5">
        <div class="">
            <label class="block text-[#3D3D3D] text-sm font-medium mb-2" for="fullname">
                Nom complet
            </label>
            <InputField v-model="fullname" placeholder="Entrer votre nom complet" name="fullname" />
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
            <section class="space-y-2 mb-4">
                <p class="text-sm text-[#3D3D3D]  font-medium">Numero de téléphone</p>
                <div class="flex gap-3 w-full max-w-[712px] relative">
                    <Input v-model="phone" class="pl-14 border-[#3D3D3D]" id="email"
                        placeholder="numero de téléphone" />
                    <span
                        class="absolute start-0 inset-y-0 font-bold flex items-center justify-center text-sm px-2 border-r  text-black">
                        +225
                    </span>
                </div>
            </section>
        </div>

        <div class="">
            <label class="block text-[#3D3D3D] text-sm font-medium mb-2" for="password">
                Mot de passe
            </label>
            <PasswordField v-model="password" placeholder="Mot de passe" name="password" />
        </div>
        <div class="mb-6">
            <label class="block text-[#3D3D3D] text-sm font-medium mb-2" for="confirm_password">
                Confirmer le mot de passe
            </label>
            <PasswordField v-model="confirm_password" placeholder="Confirmer le mot de passe" name="confirm_password" />
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

// --- Définir le schéma de validation Zod pour l'inscription ---
// Le schéma inclut la confirmation du mot de passe en utilisant la méthode .refine()
const registerSchema = z.object({
    fullname: z.string().min(1, 'Le nom complet est requis'),
    email: z.string().email('Format d\'email invalide').min(1, 'L\'email est requis'),
    phone: z.string().min(10, 'Numéro de téléphone invalide'), // Exemple de validation simple
    password: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
    confirm_password: z.string().min(1, 'La confirmation du mot de passe est requise'),
}).refine(data => data.password === data.confirm_password, {
    message: 'Les mots de passe ne correspondent pas',
    path: ['confirm_password'], // Le message d'erreur sera affiché sous ce champ
});

// --- Définir le type des données du formulaire à partir du schéma Zod ---
type RegisterForm = z.infer<typeof registerSchema>;

// --- API Service (mock pour l'exemple) ---
// En production, cette fonction serait dans un fichier de service, par exemple `auth-service.ts`
const registerWithCredential = async (credentials: RegisterForm) => {
    // Simuler un appel API réussi
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Inscription réussie pour :', credentials.email);
            resolve({
                data: {
                    user: {
                        first_name: credentials.fullname.split(' ')[0],
                    },
                },
            });
        }, 1000);
    });
};

const router = useRouter();
const toast = useToast();

const fullname = ref('');
const email = ref('');
const phone = ref('');
const password = ref('');
const confirm_password = ref('');

const { handleSubmit, resetForm } = useForm({
    validationSchema: toTypedSchema(registerSchema)
});

const {
    isPending: loading,
    mutate,
} = useMutation({
    mutationFn: (credentials: RegisterForm) => registerWithCredential(credentials),
    onSuccess: async (response) => {
        if (response) {
            // Afficher une notification de succès
            // toast.success(`Bienvenue, ${response.data.user.first_name}!`);

            // // Rediriger vers la page de connexion
            // router.push({ name: 'login', replace: true });

            resetForm();
        }
    },
    onError: (error) => {
        console.error('Erreur d\'inscription:', error);
        toast.error('Une erreur est survenue lors de l\'inscription.');
    },
});

const onSubmit = handleSubmit((values) => {
    // Appel de la mutation pour envoyer les données au serveur
    mutate(values);
});
</script>

<style scoped>
/* Les styles sont les mêmes que ceux du formulaire de connexion */
</style>