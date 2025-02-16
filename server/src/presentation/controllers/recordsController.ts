

import {Request,Response, NextFunction } from "express";
import RecordsUsecase from "@/application/use_cases/user/RecordsUseCase"; 
import { RecordDTO } from "@/application/dtos/recordDTO";
import { IRecords } from "@/domain/entities/IRecords";
import { HttpStatus } from "@/shared/HttpStatusCode";


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

}
