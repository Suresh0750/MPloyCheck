// * This is Dependency injection

import LoginUsecase from '@/application/use_cases/user/LoginUseCase'
import SignupUseCase from '@/application/use_cases/user/SignupUseCase'
import UserRepository from '@/infrastructure/database/repositories/UserRepository'
import { BCryptService } from '@/infrastructure/services/BCryptHashService'
import UserController from '../controllers/usersController'
import JWTService from '@/application/services/JWTService' 



const userRepository = new UserRepository() // * low level module (database)
const bcryptService = new BCryptService 
const signupUseCase = new SignupUseCase(userRepository,bcryptService) // * high level module(Business logic)
const jwtService = new JWTService()
const loginUsecase = new LoginUsecase(userRepository,bcryptService,jwtService)
const userController = new UserController(signupUseCase,loginUsecase)



export {userController}     