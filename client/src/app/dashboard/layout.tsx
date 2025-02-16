"use client";

import { useEffect, useState } from "react";
import SearchBar from "@/components/SearchBar";
import AddUser from "@/components/AddUser";
import { useUser } from "@/hooks/useUser";


export default function Layout({
  children,
  user,
  record,
}: {
  children: React.ReactNode;
  user: React.ReactNode;
  record: React.ReactNode;
}) {
  const [isActive, setIsActive] = useState<"user" | "record">("user");
  const [role,setRole] = useState<string>('')
  const [addData,setAddData] = useState<boolean>(false)
  const {getUser} = useUser()
  useEffect(()=>{
    const userData = JSON.parse(localStorage.getItem('user') || '')
    if(userData){
      setRole(userData?.role)
    }
  },[])
  return (
    <>
      {children}
      <div className="p-6">
        <div className="flex justify-between">
          <div className="flex text-xl font-semibold">
            {
              role!='user' ? (
                <div
                  className={`border-2 border-solid p-2 cursor-pointer ${
                    isActive === "user" ? "bg-gray-300" : ""
                  }`}
                  onClick={() => setIsActive("user")}
                >
                  User
                </div> 
              ) : (
                <div
                    className={`border-2 border-solid p-2 px-4 rounded-md cursor-pointer   ${
                      isActive === "record" ? "bg-gray-300" : ""
                    }`}
                    onClick={() => setIsActive("record")}
                  >
                    Records
                  </div>
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
        <div className="mt-4">{isActive === "user" ? user : record}</div>
      </div>
      {
        addData && <AddUser onClose={()=>setAddData(false)}  getUser={getUser}/>
      }
    </>
  );
}
