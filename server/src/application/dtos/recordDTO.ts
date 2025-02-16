
import { ValidationError } from "@/domain/entities/CustomErrors";

export class RecordDTO{
    readonly userId: string;
    readonly recordName : string;
    readonly data : string;
    readonly accessLevel : "Read" | "Write" | "Admin"
    
    constructor(userId : string,recordName : string,data : string,accessLevel : "Read" | "Write" | "Admin"){
        if(!userId || !recordName || !data || !accessLevel ) throw new ValidationError('Missing required fields')
            this.userId = userId
            this.recordName = recordName
            this.accessLevel = accessLevel
            this.data = data
    }
}