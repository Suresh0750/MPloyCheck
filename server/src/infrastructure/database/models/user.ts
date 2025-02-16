import { Schema, Document, model } from "mongoose";
import { User } from "@/domain/models/Users";

export interface UserDocuments extends User, Document {}

const userSchema = new Schema(
  {
    userID: {
      unique: true,
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
      trim: true,
    },
    emailID: {
      unique: true,
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["user", "admin"],
    },
  },
  { timestamps: true,versionKey: false }
);

export default model<UserDocuments>("User", userSchema, "users");
