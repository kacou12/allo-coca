import { i18n } from "@/locales";
import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string({ required_error: i18n.global.t("login.validation.email") })
    .email({ message: i18n.global.t("login.validation.email") })
    .trim(),
  password: z
    .string({ required_error: i18n.global.t("login.validation.password") })
    .min(1, { message: i18n.global.t("login.validation.password") })
    .trim(),
});
export const registerSchema = z.object({
  name: z.string().min(1, 'Le nom complet est requis'),
  address: z.string().min(1, 'L\'adresse est requise').optional(),
  email: z.string().email('Format d\'email invalide').min(1, 'L\'email est requis'),
  phone: z.string().min(10, 'Numéro de téléphone invalide'), // Exemple de validation simple
  password: z
          .string({ required_error: 'Le mot de passe est requis' })
          .min(8, { message: 'Le mot de passe doit contenir au moins 8 caractères' }) // Updated min length to 8
          
          .trim(),
  confirmPassword: z.string({ required_error: 'La confirmation du mot de passe est requise' })
      .min(8, { message: 'La confirmation du mot de passe doit contenir au moins 8 caractères' }) // Updated min length to 8
      // ,
  }).refine(data => data.password === data.confirmPassword, {
      message: 'Les mots de passe ne correspondent pas',
      path: ['confirmPassword'], // Le message d'erreur sera affiché sous ce champ
});

