import { Model, Types } from "mongoose";
import { IUser } from "../user/user.interface";
import { IBook } from "../book/book.interface";

export type ITag = "will read in future" | "currently reading" | "completed";

export type IWishList = {
  _id: string;
  user: Types.ObjectId | IUser;
  book: Types.ObjectId | IBook;
  tag: ITag;
};

export type WishListModel = Model<IWishList, Record<string, unknown>>;
