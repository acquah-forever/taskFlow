import { z } from "zod";  

export const titlesSchema = z.object({
    title: z.string().trim().min(1).max(120),
    description: z.string().trim().min(1).max(120)

}).strict();

export type TitleInput = z.infer<typeof titlesSchema>;