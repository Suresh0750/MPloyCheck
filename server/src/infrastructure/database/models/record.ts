
import {model, Schema} from 'mongoose'
import {Records} from '@/domain/models/Records'

export interface RecordDocuments extends Records, Document{}

const recordSchma = new Schema({
  userId: { 
    type: String,
    required: true,
    ref:'User'
    },  
  recordName: {
    type: String,
    required: true 
    },  
  data: { 
    type: String, 
    required: true 
    },  
  accessLevel: {
    type: String, 
    enum: ["Read", "Write", "Admin"], 
    default: "Read" 
    }
},{timestamps:true,versionKey:false})


export default model<RecordDocuments>("Records",recordSchma,'records')