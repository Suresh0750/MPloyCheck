

import {Request,Response, NextFunction } from "express";
import AdminsUsecase from "@/application/use_cases/user/AdminUseCase"; 
import { HttpStatus } from "@/shared/HttpStatusCode";


export default class AdminController{

    constructor(private adminUsecase:AdminsUsecase){}

    async execute(req:Request,res:Response,next:NextFunction){
        try {

            const page = Number(req.query.page) || 1;  
            const limit = Number(req.query.limit) || 10;  
            const search = req.query.search ? String(req.query.search).trim() : ""; 

            const result = await this.adminUsecase.fetchUser({page,search,limit})
            res.status(HttpStatus.Created).json({success:true,message:'successfully fetch the data',result})
        } catch (error) {
            next(error)
        }
    }

}
