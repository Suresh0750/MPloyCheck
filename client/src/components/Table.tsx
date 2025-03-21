"use client"
import { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import Pagination from "./Pagination";
import {toast} from "react-hot-toast";
import {deleteUser } from "@/redux/slices/useSlice";
import EditModal from "./EditModal";
import { currentRecordUserId } from "@/redux/slices/recordSlice";
import { IRecord } from "@/types/record";
import { Triangle } from "react-loader-spinner";
// render(<Triangle
//   visible={true}
//   height="80"
//   width="80"
//   color="#4fa94d"
//   ariaLabel="triangle-loading"
//   wrapperStyle={{}}
//   wrapperClass=""
//   />)

export interface TableProbs{
    getDatas :(page:number,limit:number,search:string,delay?:number,userId?:string)=>void;
    datas : any,
    totalCount :number,
    onDelete : (id : string)=>void;
    updateUser : (data:any)=>void;
    isLoading : boolean
}

export default function Table({getDatas,datas,totalCount,onDelete,updateUser,isLoading}:TableProbs){

    const [isAdmin,setIsAdmin] = useState(false)
    const search = useSelector((store:RootState)=>store.search)
    const role = useSelector((store:RootState)=>store.user?.currentUser?.role)
    const isUserId = useSelector((store:RootState)=>store?.record?.currentRecordUserId) // * is used to show the records
    const dispatch = useDispatch()

    const [page,setPage] = useState(1)
    const [tableData,setTableData] = useState([]) 
    const [editingRecord,setEditingRecord] = useState(null) 

    const handleShowUserRecord = (userID:string)=>{
      dispatch(currentRecordUserId(userID))
    }
    useEffect(()=>{
      if(role){
        setIsAdmin(true)
      }
    },[])

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
    },[page,search,isUserId])

    if(isLoading){
      return(
       <div className="w-full flex justify-center">
         <Triangle
          visible={true}
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="triangle-loading"
          wrapperStyle={{}}
          wrapperClass=""
          />
       </div>
      )
    }
      
    return(
        <>
            <div>
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-200">
                <tr>
                  {
                    isUserId ? (
                      <>
                        <th className="px-4 py-2">No </th>   
                        <th className="px-4 py-2">Record Name</th>
                        <th className="px-4 py-2">Data</th>
                        <th className="px-4 py-2">Access level</th>
                      </>
                    ) : (
                      <>
                        <th className="px-4 py-2">ID</th>   
                        <th className="px-4 py-2">Name</th>
                        <th className="px-4 py-2">Email</th>
                        <th className="px-4 py-2">Actions</th>
                      </>
                    )
                  }
                 
                </tr>
            </thead>
            <tbody>
              {
                isUserId ? 
                (
                  <>
                    {
                      datas?.[page-1]?.map((data:IRecord,ind:number)=>(
                        <tr key={ind} className="border-b hover:bg-gray-100 text-center">
                        <td className="px-4 py-2">{ind+1}</td>
                        <td className="px-4 py-2">{data.recordName}</td>
                        <td className="px-4 py-2">{data.data}</td>
                        <td className="px-4 py-2">
                            {data?.accessLevel}
                        </td>
                    </tr>
                      ))
                    }
                  </>
                ) : (
                  <>
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
                            {
                              isAdmin && (
                                <button 
                                  className="bg-green-500 ml-2 hover:bg-green-600 text-white font-bold py-1 px-2 rounded transition duration-300"
                                  onClick={()=>handleShowUserRecord(data?._id)}
                                  >
                                    See Record
                                  </button>
                              )
                            }
                            </td>
                        </tr>
                      ))} 
                  </> )
                
              }
            </tbody>
            </table>
            <Pagination
            currentPage={page}
            totalPages={Math.ceil(totalCount/LIMIT_PAGE)}
            onPageChange={setPage}
            />
             {editingRecord && <EditModal data={editingRecord} onClose={()=>setEditingRecord(null)}  onSave={updateUser}/>}
            </div>
        </>   
    )
}   