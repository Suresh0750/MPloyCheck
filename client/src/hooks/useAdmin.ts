import { signupSchema, SignupSchemaType } from "@/lib/validators/authSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {toast,Toaster} from 'react-hot-toast'
import { signUpUser } from "@/services/api"
import { useUser } from "./useUser"
import { resetUsers } from "@/redux/slices/useSlice"
import { useDispatch } from "react-redux"

export const useAdmin = () => {

    const dispatch = useDispatch()
    const {register,handleSubmit,formState:{errors}} = useForm<SignupSchemaType>({
        resolver:zodResolver(signupSchema)
    })
    const {getUser} = useUser() // * call the user data after add the new User by admin
    const onSubmit = (onSuccess?: () => void) => async (data: SignupSchemaType) => {
        try {
            const result = await signUpUser(data); 
            toast.success("User added successfully!",{
                duration:1000
            });
            
            if (onSuccess) {
                onSuccess(); 
                dispatch(resetUsers())
                getUser()
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                toast.error(error.message,{
                    duration:1000
                });
            } else {
                toast.error("Unexpected Error",{
                    duration:1000
                });
            }
        }
    };

    return { register, handleSubmit, errors, onSubmit,Toaster };
};
