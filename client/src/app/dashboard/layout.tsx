"use client";

import { useEffect, useState } from "react";
import SearchBar from "@/components/SearchBar";
import AddUser from "@/components/AddUser";
import { useUser } from "@/hooks/useUser";
import { FaBackward } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { currentRecordUserId, resetRecords } from "@/redux/slices/recordSlice";
import AddRecord from "@/components/AddRecord";
import '../globals.css'

export default function Layout({
  children,
  user,
  record,
}: {
  children: React.ReactNode;
  user: React.ReactNode;
  record: React.ReactNode;
}) {
  const [isUserId, setIsUserId] = useState<string | null>(null);  // * used for admin select user & if the user login means he can't see the all users
  const [role,setRole] = useState<string>('')
  const [addData,setAddData] = useState<boolean>(false)
  const {getUser} = useUser()
  const dispatch = useDispatch()
  const isSelectUser = useSelector((store:RootState)=>store?.record?.currentRecordUserId)


  useEffect(()=>{
    const userData = JSON.parse(localStorage.getItem('user') || '')
    if(userData){
      setRole(userData?.role)
      if(userData.rol=='user'){
        setIsUserId(userData?._id)
      }
    }
  },[])

  useEffect(()=>{
    // * admin select the user
    setIsUserId(isSelectUser)  
  },[isSelectUser])

  return (
    <>
      {children}
      <div className="p-6">
        <div className="flex justify-between">
          <div className="flex text-xl font-semibold">
                <div
                  className={`border-2 border-gray-400 p-3 rounded-lg bg-gradient-to-r from-gray-300 to-gray-400 text-gray-800 font-semibold shadow-md`}
                >
                  {role === "user" || isUserId ? "Record" : "User"}
                </div>

                  {
                    role=='admin'&&isUserId && (
                      <button 
                        className="flex items-center gap-2 border ml-2 border-gray-300 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-lg shadow-md hover:from-blue-600 hover:to-indigo-700 hover:shadow-lg transition-all duration-300"
                        onClick={()=>{
                          dispatch(currentRecordUserId(null))
                          dispatch(resetRecords())
                        }} // * admin back to the user after see the user record
                        >
                        <FaBackward className="text-xl" />
                        Back
                      </button>

                    )
                  }
          </div>
            <div className="flex gap-2">
              <SearchBar />
              <button 
                className="p-2 px-4 bg-rose-600 rounded text-xl m-1"
                onClick={()=>setAddData((data)=>!data)}
                >
                  Add
              </button>
            </div>
        </div>
        <div className="mt-4">{role=='admin'&&!isUserId ? user : record}</div>
      </div>
      {
        addData&&isUserId ? <AddRecord onClose={()=>setAddData(false)} userId={isUserId}/> : (addData && <AddUser onClose={()=>setAddData(false)}  getUser={getUser}/>)
      }
    </>
  );
}
