import { Model, Types } from "mongoose";
import { IUser } from "../user/user.interface";

export type IBook = {
  title: string;
  author: string;
  genre: string;
  imageURL?: string;
  publicationYaer: number;
  owner: Types.ObjectId | IUser;
};

export type BookModel = Model<IBook, Record<string, unknown>>;
