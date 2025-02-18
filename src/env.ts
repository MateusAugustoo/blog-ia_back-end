import { z } from 'zod'

export const envSchema = z.object({
  PORT: z.coerce.number().default(3333),
  FIREBASE_CREDENTIALS: z.string(),
})

export const env = envSchema.parse(process.env)