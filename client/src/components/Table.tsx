"use client"
import { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import Pagination from "./Pagination";
import {toast,Toaster} from "react-hot-toast";
import {deleteUser } from "@/redux/slices/useSlice";
import EditModal from "./EditModal";


export interface TableProbs{
    getDatas :(page:number,limit:number,search:string)=>void;
    datas : any,
    totalCount :number,
    onDelete : (id : string)=>void;
    updateUser : (data:any)=>void;
}

export default function Table({getDatas,datas,totalCount,onDelete,updateUser}:TableProbs){

    const search = useSelector((store:RootState)=>store.search)
    const dispatch = useDispatch()

    const [page,setPage] = useState(1)
    const [tableData,setTableData] = useState([]) 
    const [editingRecord,setEditingRecord] = useState(null) 
    const LIMIT_PAGE = 10

    const handleDelete = (id: string) => {
        toast((t) => (
          <div className="flex flex-col items-center gap-2">
            <p className="text-lg font-medium">Are you sure you want to delete?</p>
            <div className="flex gap-3">
              <button
                className="bg-red-500 text-white px-4 py-1 rounded"
                onClick={async () => {
                  toast.dismiss(t.id); 
                  try {
                    await onDelete(id); 
                    toast.success("data deleted successfully");
                    dispatch(deleteUser({id,page}))
                  } catch (error) {
                    toast.error("Failed to delete record");
                    console.error(error);
                  }
                }}
              >
                Confirm
              </button>
              <button
                className="bg-gray-400 text-white px-4 py-1 rounded"
                onClick={() => toast.dismiss(t.id)}
              >
                Cancel
              </button>
            </div>
          </div>
        ), {
          duration: 3000,
          position: "top-center",
        });
      };
      

    useEffect(()=>{
        if(page>datas.length){
            getDatas(page,LIMIT_PAGE,search)
        }
    },[page,search])
      
    return(
        <>
            <div>
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-200">
                <tr>
                <th className="px-4 py-2">ID</th>   
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Actions</th>
                </tr>
            </thead>
            <tbody>
                {datas?.[page-1]?.map((data:any,ind:number) => (
                <tr key={ind} className="border-b hover:bg-gray-100 text-center">
                    <td className="px-4 py-2">{data.userID}</td>
                    <td className="px-4 py-2">{data.userName}</td>
                    <td className="px-4 py-2">{data.emailID}</td>
                    <td className="px-4 py-2">
                    <button
                      onClick={() => setEditingRecord(data)}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded mr-2 transition duration-300"
                    >
                        Edit
                    </button>
                    <button
                      onClick={() => handleDelete(data?._id)}
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded transition duration-300"
                    >
                        Delete
                    </button>
                    </td>
                </tr>
                ))} 
            </tbody>
            </table>
            <Pagination
            currentPage={page}
            totalPages={Math.ceil(totalCount/LIMIT_PAGE)}
            onPageChange={setPage}
            />
             {editingRecord && <EditModal data={editingRecord} onClose={()=>setEditingRecord(null)}  onSave={updateUser}/>}
             <Toaster position="top-center" />
            </div>
        </>   
    )
}   