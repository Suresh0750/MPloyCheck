import { BaseRepository } from "./BaseRepository" 
import { IRecords } from "@/domain/entities/IRecords"

export default interface IRecordsRepository extends Omit<BaseRepository<IRecords>,'findById'>{
    findByUserId(userId:string) : Promise<IRecords[] | null>
}