import { z } from 'zod';

export const merchantSchema = z
  .object({
    // Existing fields, updated to match new requirements
    address: z.string().min(1, "L'adresse est requise."),
    email: z.string().email("L'adresse e-mail n'est pas valide."),
    phone: z.string().min(1, "Le numéro de téléphone est requis."),

    // New fields
    business_name: z.string().min(1, "Le nom commercial est requis."),
    business_type: z.string().min(1, "Le type d'entreprise est requis."),
    // Updated: Added regex validation for registration_no to enforce specific format and length
    registration_no: z.string().min(1, "Le numéro d'enregistrement est requis.")
      .regex(/^CI-ABJ-\d{2}-\d{4}-[A-Z]\d{2}-\d{5}$/, "Le numéro d'enregistrement doit être au format CI-ABJ-XX-YYYY-ZXX-YYYYY (ex: CI-ABJ-03-2020-A10-00001)."),
    tax_id: z.string().min(1, "L'identifiant fiscal est requis."),
    website: z.string().url("L'URL du site web n'est pas valide.").optional(), // Optional field
  }); // Keep .partial() if all fields should remain optional for updates, otherwise remove it.


export const payinChargeSchema = z.object({
  payin_charge: z.number().min(0, "La charge d'entrée doit être un nombre positif ou nul."),
});

export const payoutChargeSchema = z.object({
  payout_charge: z.number().min(0, "La charge d'entrée doit être un nombre positif ou nul."),
});

export const merchantUpdateSchema = merchantSchema.partial();