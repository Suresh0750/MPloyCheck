

import {Response, NextFunction } from "express";
import AdminsUsecase from "@/application/use_cases/user/AdminUseCase"; 
import { HttpStatus } from "@/shared/HttpStatusCode";
import { ValidationError } from "@/domain/entities/CustomErrors";
import { CustomRequest } from "@/domain/entities/utils";


export default class AdminController{

    constructor(private adminUsecase:AdminsUsecase){}

    async execute(req:CustomRequest,res:Response,next:NextFunction){
        try {

            const page = Number(req.query.page) || 1;  
            const limit = Number(req.query.limit) || 10;  
            const search = req.query.search ? String(req.query.search).trim() : ""; 
            const delay = Number(req.query?.delay) || 3000

            const result = await this.adminUsecase.fetchUser({page,search,limit,delay})
            res.status(HttpStatus.Created).json({success:true,message:'successfully fetch the data',result})
        } catch (error) {
            next(error)
        }
    }
    async deleteUser(req:CustomRequest,res:Response,next:NextFunction){
        try{
            console.log(req.params?.id)
            if(!req.params?.id) throw new ValidationError('ID in missing')
                
            await this.adminUsecase.deleteUser(req.params?.id)
            res.status(HttpStatus.Success).json({success:true,message:'data successfully deleted'})
        }catch(error){
            next(error)
        }
    }
    async updateUser(req:CustomRequest,res:Response,next:NextFunction){
        try {
            await this.adminUsecase.update(req.body)
            res.status(HttpStatus.Success).json({success:true,message:'data successfully update'})
        } catch (error) {
            next(error)
        }
    }
}
