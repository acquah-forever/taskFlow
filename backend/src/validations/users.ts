import { z } from 'zod';

export const userSchema = z.object({
    username : z.string().min(1).trim(),
    email: z.string().min(1).trim().toLowerCase(),
    password : z.string().min(1).trim()
})

export type UserInput = z.infer<typeof userSchema>