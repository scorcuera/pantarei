import { z } from 'zod';

export const SkillSchema = z.object({
    name: z.string().min(1, "Name cannot be empty"),
    description: z.string()
});