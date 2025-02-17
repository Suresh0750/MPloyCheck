

"use client"

import { RootState } from "@/redux/store"
import { useSelector } from "react-redux"

export default function Dashboard(){
    const {userName,role} = useSelector((store:RootState)=>store?.user?.currentUser)
    return(
       <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">User Details</h2>
        <p><strong>Username</strong> : {userName}</p> 
        <p><strong>Role</strong> : {role}</p>
        <button className="mt-4 bg-red-500 text-white p-2 rounded">Log Out</button>
       </div>
    )
}   