import { z } from "@/locales/fr-zod";

export const merchantRequestSchema = z.object({
  address: z.string().min(1, "L'adresse est requise."),
  email: z.string().email("L'adresse e-mail n'est pas valide."),
  phone: z.string().min(1, 'Le numéro de téléphone est requis.'),
  business_name: z.string().min(1, 'Le nom commercial est requis.'),
  business_type: z.string().min(1, "Le type d'entreprise est requis."),
  registration_no: z
    .string()
    .min(1, "Le numéro d'enregistrement est requis.")
    .regex(
      /^CI-ABJ-\d{2}-\d{4}-[A-Z]\d{2}-\d{5}$/,
      "Le numéro d'enregistrement doit être au format CI-ABJ-XX-YYYY-ZXX-YYYYY (ex: CI-ABJ-03-2020-A10-00001).",
    ),
  tax_id: z.string().min(1, "L'identifiant fiscal est requis."),
  website: z.string().url("L'URL du site web n'est pas valide.").optional(),
  status: z.string(),
  type: z.string(),
})

export const rejectMerchantRequestSchema = z
  .object({
    reason: z.string().min(1, 'Le motif du rejet est requis.'),
    status: z.string().min(1, 'Le statut du demande est requis.'),
  })
  .partial()


export const withdrawalSchema = z
  .object({
     amount:  z.string().min(1, "Ce champ est requis").refine((val) => !isNaN(Number(val)), "Le montant doit être un nombre.") // Vérifie si la chaîne peut être convertie en un nombre valide
      .transform(Number) // Transforme la chaîne en nombre
      .pipe(
        z.number()
          .int("Le montant doit être un nombre entier.")
          .positive("Le montant doit être supérieur à 0.")
      ),
    // rib: z.string()
    //   .min(1, 'Le RIB est requis.')
    //   .regex(/^[a-zA-Z0-9]+$/, "Le RIB ne doit contenir que des lettres et des chiffres."),
    // type: z.literal('withdrawal'),
    // Vous pourriez ajouter une validation plus stricte pour le RIB si nécessaire
    // par exemple avec .regex()
  })


export const depositSchema = z
  .object({
    amount:  z.string()
    .min(1, "Ce champ est requis")
    .refine((val) => !isNaN(Number(val)), "Le montant doit être un nombre.") // Vérifie si la chaîne peut être convertie en un nombre valide
      .transform(Number) // Transforme la chaîne en nombre
      .pipe(
        z.number()
          .int("Le montant doit être un nombre entier.")
          .positive("Le montant doit être supérieur à 0.")
      ),
    bank: z.string().min(1, 'Le nom de la banque est requis.'),
    file_url: z.custom<File>(val => val instanceof File, { // Validate that it's an instance of File
    message: "Le bordereau de versement est requis." // Message if no file or not a File object
  })
  .refine(file => file.size <= 50 * 1024 * 1024, `Le fichier doit faire moins de 50 Mo.`) // 50 MB limit
  .refine(file => ['image/jpeg', 'image/png', 'application/pdf'].includes(file.type), `Type de fichier non supporté (JPEG, PNG, PDF uniquement).`),
    // type: z.literal('deposit'),
  })
  

// export type MerchantDepositRequest = z.infer<typeof depositSchema>

// export type MerchantWithdrawalRequest = z.infer<typeof withdrawalSchema>

export type RejectMerchantRequest = z.infer<typeof rejectMerchantRequestSchema>
