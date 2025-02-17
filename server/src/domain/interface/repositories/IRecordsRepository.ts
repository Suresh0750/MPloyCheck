import { BaseRepository } from "./BaseRepository" 
import { IRecords } from "@/domain/entities/IRecords"

export default interface IRecordsRepository extends Omit<BaseRepository<IRecords>,'findById'>{
    find(query:any,skip:number,limit:number) : Promise<IRecords[] | null>
}