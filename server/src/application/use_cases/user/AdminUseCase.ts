
import { IUser } from "@/domain/entities/IUser";
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
    async deleteUser(_id:string){
        await this.userRepository.delete(_id)
    }
    async update(entity:IUser){
        console.log(entity)
        await this.userRepository.update(entity)
    }
}
