


export const useRecord = ()=>{
    
    async function getRecord(page:number=1,limit:number=10,search:string='',userId:string){
                try {
                    const result = await getRecord(page, limit, search,userId)
                    // dispatch(addUser(result?.[0]?.users))
                    // dispatch(addCount(result?.[0]?.totalCount[0]?.count || 0))
                } catch (error) {
                    console.log(error)
                }
             }
    function onDelete(){

    }
    function onUpdate(){
        
    }

    return {getRecord,onDelete,onUpdate}
}