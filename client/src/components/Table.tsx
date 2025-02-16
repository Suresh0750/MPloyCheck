
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Pagination from "./Pagination";


export interface TableProbs{
    getDatas :(page:number,limit:number,search:string)=>void;
    datas : any
}

export default function Table({getDatas,datas}:TableProbs){

    const search = useSelector((store:RootState)=>store.search)

    const [page,setPage] = useState(1)
    const LIMIT_PAGE = 10


    useEffect(()=>{
    getDatas(page,LIMIT_PAGE,search)
    },[page])
      
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
                    //   onClick={() => handleEdit(record)}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded mr-2 transition duration-300"
                    >
                        Edit
                    </button>
                    <button
                    //   onClick={"() => handleDelete(record.email)"}
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
            totalPages={datas.length}
            onPageChange={setPage}
            />
            {/* // {editingRecord && (
            // <EditModal record={editingRecord} onSave={handleUpdate} onClose={() => setEditingRecord(null)}  records ={records}/>
             */}
            </div>
        </>
    )
}   