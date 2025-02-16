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

        }catch(error:any){
    1        toast.error(error.message)
            console.log(error?.message)
        }
    }
    return {register,handleSubmit,errors,onSubmit,Toaster}
}   



