'use client'
import Table from "@/components/Table"
import { useUser } from "@/hooks/useUser"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store";

export default function User(){
    const {getUser,onDelete,onUpdate} = useUser()
    const useDatas = useSelector((store:RootState)=>store?.user?.datas)
    const totalCount = useSelector((store:RootState)=>store?.user?.totalCount)

    return(
        <>
            <Table getDatas = {getUser} datas ={useDatas} totalCount={totalCount} onDelete={onDelete} updateUser={onUpdate}/>
        </>
    )
}
