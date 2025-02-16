
import { IUserRepository } from "@/domain/interface/repositories/IUserRepository";



export default class AdminsUsecase{
    constructor(private userRepository:IUserRepository){}
    async fetchUser(data:{page:number,search:string,limit:number}){
        const query = data.search?.trim()
        ? { $or: [
            { name: { $regex: data.search.trim(), $options: "i" } },
            { email: { $regex: data.search.trim(), $options: "i" } }
          ] }
        : {};
      
        const skip = (data.page-1)*data.limit
      
        return await this.userRepository.find(query,skip,data.limit)
    }
}


/*

    skip 
    limit
    search

*/