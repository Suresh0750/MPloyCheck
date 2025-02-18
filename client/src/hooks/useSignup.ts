import { signupSchema, SignupSchemaType } from "@/lib/validators/authSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {toast,Toaster} from 'react-hot-toast'
import { signUpUser } from "@/services/api"
import { useRouter } from "next/navigation"
import { showUserIdToast } from "@/components/showUserIdToast"

export const useSignup = ()=>{
    const Router = useRouter()
    const {register,handleSubmit,formState:{errors}} = useForm<SignupSchemaType>({
        resolver:zodResolver(signupSchema)
    })

    const onSubmit = async (data:SignupSchemaType)=>{
        try{
            const result = await signUpUser(data)
            
            showUserIdToast(result.userId)
            setTimeout(()=>{
                Router.replace('/auth/login')
            },500)

        }catch(error: unknown){
            if(error instanceof Error){
                toast.error(error.message) 
            }else{
                toast.error('Unexpected Error')
            }
        }
    }
    return {register,handleSubmit,errors,onSubmit,Toaster}
}   



