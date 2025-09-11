import { z } from 'zod'

export const keySchema = z
  .object({
    // merchant_id: z.number().min(1),
    environment: z.enum(['live', 'sandbox']),
    name: z.string().min(1),
    // remark: z.string().min(1),
    // status: z.enum(['active', 'inactive']),
  })
  .partial()
