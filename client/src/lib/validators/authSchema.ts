
import {z} from "zod";

export const passwordSchema = z.string()
.min(6, "Password must be at least 6 characters long")
.regex(/[A-Z]/, "Password must contain at least one uppercase letter")
.regex(/[a-z]/, "Password must contain at least one lowercase letter")
.regex(/\d/, "Password must contain at least one number")
.regex(/[@$!%*?&]/, "Password must contain at least one special character (@, $, !, %, *, ?, &)")


export const loginSchema = z.object({
    userID : z.string().trim().min(5,"User ID must be at least 5 characters"),
    password : passwordSchema,
})


export type LoginSchemaType = z.infer<typeof loginSchema>;


export const signupSchema = z.object({
    userName : z.string().trim().min(3,"User Name must be at least 3 characters"),
    emailID : z.string().trim().email("Invalid email format"),
    password : passwordSchema,
    role : z.boolean().optional().default(false)
})


export type SignupSchemaType =  z.infer<typeof signupSchema>