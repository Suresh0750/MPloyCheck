


export interface Records{
    readonly _id : string;
    readonly userId : string;
    readonly recordName : string;
    readonly data : string;
    readonly accessLevel : "Read" | "Write" | "Admin";
    readonly  createAt : Date;  
    readonly  updateAt : Date;
}   