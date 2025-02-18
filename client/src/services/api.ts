import axios from "axios";
import { SERVER_URL } from "@/config/constants";
import { LoginSchemaType, SignupSchemaType } from "@/lib/validators/authSchema";
import { IUser } from "@/types/user";
import { RecordSchemaType } from "@/lib/validators/recordSchema";

export const axiosInstance = axios.create({
    baseURL :SERVER_URL,
    headers : {
        "Content-Type" : "application/json"
    },
    withCredentials : true,
})

export const handleAxiosError = (error: any) => {
    
    console.log(error)
    const errorMessage = error?.response?.data?.message || "Unexpected error occurred.";

    console.log(errorMessage)   

    return new Error(errorMessage);
};

export const loginUser = async(data:LoginSchemaType)=>{

    try {
        const response = await axiosInstance.post('/api/user/login',data)
        return response.data 
    } catch (error:unknown) {
        throw handleAxiosError(error)
    }
}    
export const signUpUser = async(data:SignupSchemaType)=>{

    try {
        const response = await axiosInstance.post('/api/user/signup',data)
        return response.data 
    } catch (error:unknown) {
        throw handleAxiosError(error)
    }
}           


//  * admin user crud
export const fetchUsers = async (page: number, limit: number, search?: string,delay?:number) => {
    try {
      const response = await axiosInstance.get('/api/admin/users',{
          params: {
              page, 
              limit, 
              search,
              delay,
            },
      })
      return response?.data?.result || []
    } catch (error:unknown) {
        throw handleAxiosError(error);
    }
  };

  export const deleteUser = async(userID:string)=>{
    try{
        const response = await axiosInstance.delete(`/api/admin/users/${userID}`)
        return response?.data
    }catch(error:unknown){
        throw handleAxiosError(error);
    }
  }

  export const updateUser = async(data:IUser)=>{
    try {
        const response = await axiosInstance.put(`/api/admin/users`,data)
        return response.data
    } catch (error:unknown) {
        throw handleAxiosError(error);
    }
  }
  
  export const logoutUser = async()=>{
    try {
        const response = await axiosInstance.post(`/api/user/logout`)
        return response.data
    } catch (error) {
        throw handleAxiosError(error);
    }
  }


/*
    Record API functions
*/

export const fetchRecord = async(page:number,limit:number,search:string,userId:string)=>{
    try{
        const response = await axiosInstance.get(`/api/record/${userId}`,{
            params: {
                page, 
                limit, 
                search,
              },
        })
        return response.data
    }catch(error:unknown){
        throw handleAxiosError(error);
    }
}

export const createRecord = async(data:RecordSchemaType)=>{
    try {
        const response = await axiosInstance.post(`/api/record/create`,data)
        return response.data 
    } catch (error:unknown) {
        throw handleAxiosError(error);
    }
}