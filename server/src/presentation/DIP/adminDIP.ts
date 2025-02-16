

import AdminsUsecase from "@/application/use_cases/user/AdminUseCase";
import UserRepository from "@/infrastructure/database/repositories/UserRepository";
import AdminController from "../controllers/adminController";



const userRepository = new UserRepository()
const adminsUsecases = new AdminsUsecase(userRepository)
const adminController= new AdminController(adminsUsecases)



export {adminController}    