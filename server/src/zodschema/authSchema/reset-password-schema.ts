
import { z } from "zod"

export const resetPasswordSchema = z.object({
    newPassword: z.string().min(1, { message: "New Password Required " }),
    confirmPassword: z.string().min(1, { message: "Confirm Password Required" }),
    email: z.string().email(),
    token: z.string().min(1, { message: "Token is required" })
}).refine(data => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
});