"use client"
import Table from "@/components/Table";
import { useRecord } from "@/hooks/useRecord";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";



export default function Record(){
    const {getRecord,onDelete,onUpdate,isLoading}= useRecord()

    const recordDatas = useSelector((store:RootState)=>store?.record?.datas)
    const totalCount = useSelector((store:RootState)=>store?.record?.totalCount)

    return(
        <>
            <Table getDatas= {getRecord} datas ={recordDatas} totalCount={totalCount} onDelete={onDelete} updateUser={onUpdate} isLoading={isLoading}/>
        </>
      
    )
}