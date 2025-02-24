import { z } from 'zod'

export const userSchema = z.object({
  uid: z.string(),
  username: z.string(),
  photo: z.string().nullish(),
  email: z.string().email(),
  name: z.string(),
})