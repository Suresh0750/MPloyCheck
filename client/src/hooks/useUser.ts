
import { useDispatch } from "react-redux";
import { deleteUser, fetchUsers, logoutUser, updateUser } from "@/services/api";
import { addUser , addCount, currentUser, resetUsers} from "@/redux/slices/useSlice";
import { IUser } from "@/types/user";
import {toast,Toaster} from "react-hot-toast";
import { useRouter } from "next/navigation";
import { resetRecords } from "@/redux/slices/recordSlice";
import { resetSearch } from "@/redux/slices/serachSlice";

export const useUser = ()=>{
   const dispatch = useDispatch()
   const Router = useRouter()

         async function getUser(page:number=1,limit:number=10,search:string=''){
            try {
                const result = await fetchUsers(page, limit, search)
                console.log('total users')
                console.log(result?.[0]?.users)
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
                return    toast.error(error.message,{
                        duration : 1000
                    });
                } else {
                return    toast.error("Failed to delete user!",{
                        duration : 1000
                    });
                }
                
                
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
                return    toast.error(error.message,{
                        duration:1000
                    });
                } else {
                return toast.error("Failed to update user!",{
                        duration:1000
                    });
                }

            }
        }

         const logout = async()=>{
            try {
                
                const result = await logoutUser();
               
                    toast.success(result?.message,{
                        duration:500
                    });
                    dispatch(currentUser({}))
                    dispatch(resetRecords())
                    dispatch(resetUsers())
                    dispatch(resetSearch(''))
                    localStorage.setItem('user','')
                    setTimeout(()=>{
                        Router.refresh()
                    },600)

            } catch (error: unknown) {
                if (error instanceof Error) {
                    toast.error(error.message,{
                        duration:1000
                    });
                } else {
                    toast.error("Failed to logout user!",{
                        duration:1000
                    });
                }
                
            }
         }
   
    return {getUser,onDelete,onUpdate,logout,Toaster}
}   


