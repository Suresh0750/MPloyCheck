import { loginSchema, LoginSchemaType } from "@/lib/validators/authSchema"
import { loginUser } from "@/services/api"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast ,Toaster} from "react-hot-toast"
import { useRouter } from "next/navigation"

export const useLogin = ()=>{

    const Router = useRouter()
    const {register,handleSubmit,formState:{errors}} = useForm<LoginSchemaType>({
        resolver:zodResolver(loginSchema)
    })

    const onSubmit = async (data:LoginSchemaType)=>{
        try{
            const result = await loginUser(data)
            toast.success(result?.message)
            console.log(data)
            setTimeout(()=>{
                Router.push('/auth/profile')
            },500)
        }catch(error:any){
            console.log(error)
            toast.error(error?.message)
        }
    }
    return {register,handleSubmit,errors,onSubmit}
}