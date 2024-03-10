import { z } from 'zod';

export const UserRegisterSchema = z.object({
    email: z.string().min(1, "Email cannot be empty").email("Invalid email"),
    password: z.string().min(1, "Password cannot be empty").refine(password => /[0-9]/.test(password), { message: "Password must contain at least one digit"}),
    name: z.string().min(1, "Name cannot be empty"),
    role_id: z.number().optional()
});
