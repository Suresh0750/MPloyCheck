import { SignupDTO } from "@/application/dtos/userDTO";
import { IUser } from "@/domain/entities/IUser";
import { IUserRepository } from "@/domain/interface/repositories/IUserRepository";
import { IBcrypt } from "@/domain/interface/services/IBcrypt";
import { GENERATE_UNIQUE_ID_KEY } from "@/shared/constants";


export default class SignupUseCase {
    constructor(private userRepository: IUserRepository,private bcrptService:IBcrypt) {}
    
    private async generateUniqueUserID(): Promise<string> {
       
        let userID: string = '';
        let isUnique = false;

        while (!isUnique) {
            userID = '';
            for (let i = 0; i < 5; i++) {
                userID += GENERATE_UNIQUE_ID_KEY.charAt(Math.floor(Math.random() * GENERATE_UNIQUE_ID_KEY.length));
            }   
            
            const existingUser = await this.userRepository.findByUserID({userID});
            if (!existingUser) {
                isUnique = true;
            }
        }
        return userID;
    }

    // * sign up usecase
    async execute(signupDTO: SignupDTO): Promise<IUser> {

        const userID: string = await this.generateUniqueUserID();
        const hashPassword = await this.bcrptService.hashPassword(signupDTO.password)

        const user : IUser = {
            userID,
            userName: signupDTO.userName,
            emailID : signupDTO.emailID,
            password : hashPassword,
            role : signupDTO.role ? "admin" : "user"
        }
       
        return await this.userRepository.create(user);;
    }
    
}
