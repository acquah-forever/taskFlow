import { z } from 'zod';

export const signupSchema = z.object({
    username : z.string().min(1).trim(),
    email: z.string().min(1).trim().toLowerCase(),
    password : z.string().min(1).trim()
});

export const loginSchema =z.object({
    username: z.string().min(1).trim(),
    password: z.string().min(1).trim()
});

export type SignupInput = z.infer<typeof signupSchema>
export type LoginInput = z.infer<typeof loginSchema>