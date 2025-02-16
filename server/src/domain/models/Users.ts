
// * models types
import { Types } from "mongoose"; 

export interface User{
  readonly userName : string,
  readonly  userID : string,
  readonly  emailID : string,
  readonly  password : string,
  readonly  role : 'user' | 'admin',
  readonly  createAt : Date,
  readonly  updateAt : Date
}