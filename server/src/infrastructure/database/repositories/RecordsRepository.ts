
import { Model } from "mongoose"
import  Records,{RecordDocuments} from '@/infrastructure/database/models/record'
import IRecordsRepository from "@/domain/interface/repositories/IRecordsRepository"
import { IRecords } from "@/domain/entities/IRecords"

export default class RecordsRepsitory implements IRecordsRepository{
    private RecordsModel : Model<RecordDocuments>
    constructor(){
        this.RecordsModel = Records
    }
    async create(entity: IRecords): Promise<IRecords> {
        return await this.RecordsModel.create(entity)
    }
     async findByUserId(userId: string): Promise<IRecords[]> {
        return await this.RecordsModel.find({ userId });
    }
    async delete(_id: string): Promise<void> {
        await this.RecordsModel.deleteOne({_id})
    }
    async update(entity: IRecords): Promise<void> {
         await this.RecordsModel.updateOne({_id:entity._id},{$set:entity})
    }
    
}