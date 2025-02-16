
import { IRecords } from '@/domain/entities/IRecords';
import IRecordsRepository from '@/domain/interface/repositories/IRecordsRepository'

export default class RecordsUsecase{

    constructor(private userRecords:IRecordsRepository){}
    
    async create(entity:IRecords):Promise<IRecords>{
      return  await this.userRecords.create(entity)
    }
    async fetchRecord(userId:string):Promise<IRecords[] | null>{
        return await this.userRecords.findByUserId(userId)
    }
    async updateRecord(entity:IRecords) {
        await this.userRecords.update(entity)
    }
    async deleteRecord(_id:string){
        await this.userRecords.delete(_id)
    }
}

