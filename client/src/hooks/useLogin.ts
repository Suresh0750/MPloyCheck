import { useState } from "react"
import { loginSchema, LoginSchemaType } from "@/lib/validators/authSchema"
import { loginUser } from "@/services/api"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast ,Toaster} from "react-hot-toast"
import { useRouter } from "next/navigation"
import { useDispatch } from "react-redux"
import { currentUser } from "@/redux/slices/useSlice"
import { currentRecordUserId } from "@/redux/slices/recordSlice"


export const useLogin = ()=>{
    const [isLoading,setIsLoading] = useState(false)
    const dispatch = useDispatch()

    const Router = useRouter()
    const {register,handleSubmit,formState:{errors}} = useForm<LoginSchemaType>({
        resolver:zodResolver(loginSchema)
    })

    const onSubmit = async (data:LoginSchemaType)=>{
        try{
            if(isLoading) return
            setIsLoading(true)
            const result = await loginUser(data)
            localStorage.setItem('user',JSON.stringify(result?.userData))
            dispatch(currentUser(result?.userData))  // * add user data in redux
            if(result?.userData?.role=='user'){
                dispatch(currentRecordUserId(result?.userData?._id))
            }
            toast.success(result?.message)
            setTimeout(()=>{
                Router.push('/dashboard')
            },1000)
        }catch(error:unknown){
            if(error instanceof Error){
                toast.error(error?.message)
            }else{
                toast.error("unexpected error is occured")
            }
            
        }finally{
            setIsLoading(false) 
        }
    }
    return {register,handleSubmit,errors,onSubmit,Toaster}
}