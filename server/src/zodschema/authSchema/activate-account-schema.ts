
import { z } from "zod"

export const activateAccountSchema = z.object({
    email: z.string().email(),
    token: z.string().min(1, { message: "Token is Required" })
})