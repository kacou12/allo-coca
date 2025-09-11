import { z } from 'zod'

export const webhookSchema = z
  .object({
    environment: z.string().min(1, { message: 'Environment is required' }),
    events: z.string().array().min(1, { message: 'At least one event is required' }), // Modified to be an array of strings
    url: z.string().url({ message: 'Invalid URL' }),
    name: z.string().min(1, { message: 'Name is required' }),
    // secret: z.string().min(1, { message: 'Secret is required' }),
  })
  .partial()
