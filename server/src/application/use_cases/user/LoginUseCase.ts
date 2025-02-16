
import { IBcrypt } from "@/domain/interface/services/IBcrypt";
import { IUserRepository } from "@/domain/interface/repositories/IUserRepository";
import { AppError } from "@/presentation/middlewares/ErrorHandler";
import { HttpStatus } from "@/shared/HttpStatusCode";
import { ITokenService } from "@/domain/interface/services/IToken";


export default class LoginUsecase{
    constructor(private userRepository:IUserRepository,private bcrptService : IBcrypt, private jwtService:ITokenService){}
    // * login usecase
    async execute(data:{userID:string,password:string}):Promise<object>{

        const isCheckUser = await this.userRepository.findByUserID({userID:data.userID})
        if(!isCheckUser) throw new AppError("Invalid ID or password",HttpStatus.Unauthorized)

        const isPasswordCheck = await this.bcrptService.comparePass(data.password,isCheckUser.password)
        if(!isPasswordCheck) throw new AppError("Invalid ID or password",HttpStatus.Unauthorized)
        
        const refreshToken = this.jwtService.generateToken({userID:isCheckUser.userID,role:isCheckUser.role},{expiresIn:'1h'})
        const accessToken = this.jwtService.generateToken({userID:isCheckUser.userID,role:isCheckUser.role},{expiresIn:'10m'})  
        return {refreshToken,accessToken,userData:isCheckUser}
    }
}


