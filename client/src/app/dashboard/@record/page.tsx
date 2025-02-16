import Table from "@/components/Table";
import { useRecord } from "@/hooks/useRecord";



export default function Record(){
    const {getRecord,onDelete,onUpdate}= useRecord()
    return(
        <>
            <Table getDatas = {getRecord} datas ={[]} totalCount={12} onDelete={onDelete} updateUser={onUpdate}/>
        </>
      
    )
}