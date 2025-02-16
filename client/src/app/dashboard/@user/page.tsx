'use client'
import Table from "@/components/Table"
import { useUser } from "@/hooks/useUser"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store";

export default function User(){
    const {getUser} = useUser()
    const useDatas = useSelector((store:RootState)=>store.user)

    return(
        <>
            <Table getDatas = {getUser} datas ={useDatas}/>
        </>
    )
}
