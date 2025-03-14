
import { User } from "../models/Users";
export interface IUser extends Omit<User,'createAt' | 'updateAt'> {};


export interface LoginUsecaseResponse {
    refreshToken: string;
    accessToken: string;
    userData: {
        [key :string] : string
    }
  }
  

export type Payload = {
    userID: string;
    userName: string;
    role: string;
    iat: number;
    exp: number;
  };
  
  