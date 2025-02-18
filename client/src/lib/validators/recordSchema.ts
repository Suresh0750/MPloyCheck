
import {z} from "zod";
import { recordAccessLevel } from "@/config/constants";

export interface  IRecord{
    readonly _id?: string;
    readonly recordName: string;
    readonly userId?: string;
    readonly data : string;
    readonly accesssLevel : "Read" | "Write" | "Admin"
}


export const recordNameSchema = z.string().trim().min(3,"Record Name must be at least 3 characters")
export const dataSchema = z.string().trim().min(5,"data must be at least 5 characters")


export const recordShema = z.object({
    userId : z.string(),
    recordName : recordNameSchema,
    data : dataSchema,
    accessLevel : z.enum(["Read","Write","Admin"])
})


export type RecordSchemaType = z.infer<typeof recordShema>