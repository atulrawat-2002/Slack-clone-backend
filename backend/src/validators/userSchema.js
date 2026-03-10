import z from "zod";


export const userSignupSchema = z.object({
    email: z.string().email(),
    username: z.string().min(3, 'username must contain at least 3 characters'),
    password: z.string()
})

export const userSigninSchema = z.object({
    email: z.string().email(),
    password: z.string()
})