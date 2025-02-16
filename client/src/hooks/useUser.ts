
import { useDispatch } from "react-redux";
import { deleteUser, fetchUsers, updateUser } from "@/services/api";
import { addUser , addCount} from "@/redux/slices/useSlice";
import { IUser } from "@/types/user";
import toast from "react-hot-toast";

export const useUser = ()=>{
   const dispatch = useDispatch()

         async function getUser(page:number=1,limit:number=10,search:string=''){
            try {
                const result = await fetchUsers(page, limit, search)
                dispatch(addUser(result?.[0]?.users))
                dispatch(addCount(result?.[0]?.totalCount[0]?.count || 0))
            } catch (error) {
                console.log(error)
            }
         }

         async function onDelete(id:string):  Promise<string> {
            try {
                
                const result = await deleteUser(id)
                
                return result.message
            } catch (error: unknown) {
                if (error instanceof Error) {
                    toast.error(error.message,{
                        duration : 1000
                    });
                } else {
                    toast.error("Failed to delete user!",{
                        duration : 1000
                    });
                }
                
                throw error; 
            }
         }

         async function onUpdate(data: IUser): Promise<string> {
            try {
                const result = await updateUser(data);
                toast.success("User updated successfully!",{
                    duration:1000
                });
                return result;
            } catch (error: unknown) {
                if (error instanceof Error) {
                    toast.error(error.message,{
                        duration:1000
                    });
                } else {
                    toast.error("Failed to update user!",{
                        duration:1000
                    });
                }
                
                throw error; 
            }
        }
   
    return {getUser,onDelete,onUpdate}
}   


