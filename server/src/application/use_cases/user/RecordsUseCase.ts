
import { IRecords } from '@/domain/entities/IRecords';
import IRecordsRepository from '@/domain/interface/repositories/IRecordsRepository'

export default class RecordsUsecase{

    constructor(private userRecords:IRecordsRepository){}
    
    async create(entity:IRecords):Promise<IRecords>{
      return  await this.userRecords.create(entity)
    }
    async fetchRecord(data: { page: number; search: string; limit: number; userId: string }): Promise<IRecords[] | null> {
        const { page, search, limit, userId } = data;
        
        // * filter by userId
        const query: any = { userId }; 
      
        if (search.trim()) {
          query.$or = [
            { recordName: { $regex: search.trim(), $options: "i" } } 
          ];
        }
      
        const skip = (page - 1) * limit;
      
        try {
          return await this.userRecords.find(query,skip,limit)
        } catch (error) {
          console.error("Error fetching records:", error);
          return null; // ✅ Handle errors properly
        }
      }
      
    async updateRecord(entity:IRecords) {
        await this.userRecords.update(entity)
    }
    async deleteRecord(_id:string){
        await this.userRecords.delete(_id)
    }
}

