import { Error as MongooseError } from 'mongoose';
import { IUser } from "@/domain/entities/IUser";
import { IUserRepository } from "@/domain/interface/repositories/IUserRepository";
import User,{UserDocuments} from "../models/user";
import { Model } from "mongoose";
import { AppError } from "@/presentation/middlewares/ErrorHandler";
import { HttpStatus } from "@/shared/HttpStatusCode";


export default class UserRepository implements IUserRepository{
    private UserModel : Model<UserDocuments>
    constructor(){
        this.UserModel = User;
    }
    async create(entity: IUser): Promise<IUser> {
        try {
            return await this.UserModel.create(entity)
        } catch (error:unknown) {
            const mongoError = error as MongooseError & { code?: number };
            if (mongoError?.code === 11000) {
                throw new AppError("Email already exists", HttpStatus.Conflict);
            }
            throw new AppError("Internal Server Error", HttpStatus.InternalServerError);
        }
    }
    async findByUserID(entities: { userID: string; password: string; }): Promise<IUser | null> {
        return await this.UserModel.findOne({userID:entities.userID}).lean()
    }  
    async findByEamil(emailID: string): Promise<IUser | undefined> {
        return (await this.UserModel.findOne({emailID}).lean())?.toObject()
    } 
    async find(query:any,skip:number,limit:number) : Promise<IUser[]>{
        return await this.UserModel.aggregate([
            { $match: query }, 
            {
              $facet: {
                totalCount: [{ $count: "count" }],
                users: [{ $skip: skip }, { $limit: limit }],
              },
            },
          ]);
    }
}


