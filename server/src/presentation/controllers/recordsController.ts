

import {Request,Response, NextFunction } from "express";
import RecordsUsecase from "@/application/use_cases/user/RecordsUseCase"; 
import { RecordDTO } from "@/application/dtos/recordDTO";
import { IRecords } from "@/domain/entities/IRecords";
import { HttpStatus } from "@/shared/HttpStatusCode";
import { ValidationError } from "@/domain/entities/CustomErrors";


export default class RecordController{

    constructor(private recordUsecase:RecordsUsecase){}

    async execute(req:Request,res:Response,next:NextFunction){
        try {

            const {userId,recordName,data,accessLevel} = req.body
            const recordDTO = new RecordDTO(userId,recordName,data,accessLevel) as IRecords
            const result = this.recordUsecase.create(recordDTO)
            res.status(HttpStatus.Created).json({success:true})
        } catch (error) {
            next(error)
        }
    }
    // http://localhost:3001/api/record/67b230523751a919226fb85c?page=1&limit=10&search=

    async fetchById(req:Request,res:Response,next:NextFunction){
        try {
            if(!req.params.userId) throw new ValidationError('userid is mising')
            const page = req.query?.page || 1
            const limit = req.query?.limit || 10
            const search = req.query?.search || ''
            const userId = req.params.userId
            
            // const result = await this.recordUsecase.fetchRecord({page,search,limit,userId})
            const result :any= []
            res.status(HttpStatus.Created).json({success:true,message:'data successfully fetched',result})
        } catch (error) {
            next(error)
        }
    }
}
