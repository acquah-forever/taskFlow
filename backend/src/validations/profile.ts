import { z } from 'zod';

export const profileSchema = z.object({
    position: z.string().trim().min(1).max(120),
    description: z.string().trim().min(1).max(120)
});

export type ProfileInput = z.infer<typeof profileSchema>;
