
import { useDispatch } from "react-redux";
import { fetchUsers } from "@/services/api";
import { addUser , addCount} from "@/redux/slices/useSlice";

export const useUser = ()=>{
   const dispatch = useDispatch()

         async function getUser(page:number,limit:number,search:string){
            try {
                const result = await fetchUsers(page, limit, search)
                dispatch(addUser(result?.[0]?.users))
                dispatch(addCount(result?.[0]?.totalCount[0]?.count || 0))
            } catch (error) {
                console.log(error)
            }
         }
   
    return {getUser}
}   


