


export interface IUser{
    _id? : string;
    userID : string;
    userName : string;
    emailID : string;
    password : string;
    role ? : string;
}



export interface EditUser{
    userID : string;
    Name : string,
    Email : string
}
export interface EditRecord{
    recordName:string,
    data:string,
    accessLevel : 'Read' | 'Write' | 'Admin'
}


export type EditData = EditUser | EditRecord



