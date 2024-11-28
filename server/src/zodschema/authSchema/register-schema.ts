import { z } from "zod";

export const registerFormSchema = z.object({
    username: z.string().min(1, { message: "Username is Required" }),
    email: z.string().email(),
    password: z.string().min(1, { message: "Password is Required" })
});
