import { Model } from "mongoose";

export type IUser = {
  email: string;
  password: string;
  name: string;
};

export type ICreateUserResponse = Omit<IUser, "password">;

export type UserModel = Model<IUser, Record<string, unknown>>;
