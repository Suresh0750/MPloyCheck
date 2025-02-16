import axios from "axios";
import { SERVER_URL } from "@/config/constants";
import { LoginSchemaType, SignupSchemaType } from "@/lib/validators/authSchema";

export const axiosInstance = axios.create({
    baseURL :SERVER_URL,
    headers : {
        "Content-Type" : "application/json"
    },
    withCredentials : true,
})

export const handleAxiosError = (error: any) => {
    
    console.log(error)
    const errorMessage = error?.response?.data?.message || error?.response?.data?.message || "Unexpected error occurred.";

    console.log(errorMessage)

    return new Error(errorMessage);
};

export const loginUser = async(data:LoginSchemaType)=>{

    try {
        const response = await axiosInstance.post('/api/user/login',data)
        return response.data 
    } catch (error) {
        throw handleAxiosError(error)
    }
}    
export const signUpUser = async(data:SignupSchemaType)=>{

    try {
        const response = await axiosInstance.post('/api/user/signup',data)
        return response.data 
    } catch (error) {
        throw handleAxiosError(error)
    }
}           

export const fetchUsers = async (page: number, limit: number, search?: string) => {
    try {
      const response = await axiosInstance.get('/api/admin/users',{
          params: {
              page, 
              limit, 
              search,
            },
      })
      return response?.data?.result || []
    } catch (error) {
        throw handleAxiosError(error);
    }
  };
