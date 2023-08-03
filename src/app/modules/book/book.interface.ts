import { Model } from "mongoose";

export type IBook = {
  title: string;
  author: string;
  genre: string;
  publicationYaer: number;
};

export type BookModel = Model<IBook, Record<string, unknown>>;
