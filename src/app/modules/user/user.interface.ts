/* eslint-disable no-unused-vars */
import { Model } from "mongoose";

export type IUser = {
  email: string;
  password: string;
  name: string;
};

// export type ICreateUserResponse = Omit<IUser, "password">;

//type for statics
export type UserModel = {
  isUserExist(
    email: string,
  ): Promise<
    (Pick<IUser, "email" | "name" | "password"> & { _id: string }) | null
  >;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string,
  ): Promise<boolean>;
} & Model<IUser>;

// export type UserModel = Model<IUser, Record<string, unknown>>;
