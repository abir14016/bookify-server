import { Model, Types } from "mongoose";

export type IBook = {
  title: string;
  author: string;
  genre: string;
  imageURL?: string;
  publicationYaer: number;
  owner: Types.ObjectId;
};

export type BookModel = Model<IBook, Record<string, unknown>>;
