

"use client"

import { useState,useEffect } from "react"
import {IUser} from '@/types/user'
import { useUser } from "@/hooks/useUser"
import { useDispatch } from "react-redux"
import { currentUser } from "@/redux/slices/useSlice"
import { currentRecordUserId } from "@/redux/slices/recordSlice"
export default function Dashboard(){
    const [userData,setUserData] = useState<IUser | null>(null)
    const {logout,Toaster} = useUser()  

    const dispatch = useDispatch()

    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem('user') || '')
        if(user){
            // * update the redux for after refresh the page
            setUserData(user)
            dispatch(currentUser(user))
            if(user?.role=='user'){
                dispatch(currentRecordUserId(user?._id)) 
            }
        }
    },[])
    
    return(
       <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">User Details</h2>
        <p><strong>Username</strong> : {userData?.userName}</p> 
        <p><strong>Role</strong> : {userData?.role}</p>
        <button 
            className="mt-4 bg-red-500 text-white p-2 rounded"
            onClick={logout}
            >
                Log Out
        </button>
        <Toaster position="top-center" />
       </div>
    )
}   