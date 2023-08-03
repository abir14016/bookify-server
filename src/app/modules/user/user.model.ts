import { Schema, model } from "mongoose";
import { IUser, UserModel } from "./user.interface";

const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

//model
export const User = model<IUser, UserModel>("User", UserSchema);
