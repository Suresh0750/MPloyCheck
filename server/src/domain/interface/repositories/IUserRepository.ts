
import { BaseRepository } from "./BaseRepository";
import {IUser} from '@/domain/entities/IUser'
export interface IUserRepository extends Omit<BaseRepository<IUser>,'findById'>{
    findByUserID (entities:{userID:string}) : Promise<IUser | null>
    find(query:any,skip:number,limit:number) : Promise<IUser[]>;
}