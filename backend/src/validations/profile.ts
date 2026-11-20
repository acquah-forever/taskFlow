import { z } from 'zod';

export const profileSchema = z.object({
    position: z.string().trim().min(1).max(120),
    bio: z.string().trim().min(1).max(120)
});

export const updateProfileSchema = profileSchema.partial();

export type ProfileInput = z.infer<typeof profileSchema>;
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;