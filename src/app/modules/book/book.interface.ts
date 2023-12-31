import { Model, Types } from "mongoose";
import { IUser } from "../user/user.interface";

export type IReview = {
  review: string;
};

export type IGenre =
  | "Self-Help"
  | "Detective"
  | "Programming"
  | "Thriller"
  | "Science Fiction"
  | "Novel";

export type IReviewResponse = {
  reviewerName: string;
  reviewerEmail: string;
  review: string;
} & Document;

export type IBook = {
  title: string;
  author: string;
  genre: string;
  imageURL?: string;
  publicationYear: number;
  owner: Types.ObjectId | IUser;
  reviews?: [IReviewResponse];
};

export type BookModel = Model<IBook, Record<string, unknown>>;

export type IBookFilters = {
  searchTerm?: string;
  genre?: string;
  publicationYear?: string;
};
