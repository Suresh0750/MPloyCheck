
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

export const userNameSchema = z.string().trim().min(3,"User Name must be at least 3 characters")

export const emailIDSchema = z.string().trim().email("Invalid email format")


export type LoginSchemaType = z.infer<typeof loginSchema>;


export const signupSchema = z.object({
    userName : userNameSchema,
    emailID : emailIDSchema,
    password : passwordSchema,
    role : z.boolean().optional().default(false)
})


export type SignupSchemaType =  z.infer<typeof signupSchema>

export const userEditeSchema = z.object({
    userName : userNameSchema,
    emailID : emailIDSchema,
})


export type UserEditeSchema = z.infer<typeof userEditeSchema>


export const emailValidator = (emailID:string)=> (/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(emailID)

export const userNameValidator = (name:string)=>(name).trim().length>2