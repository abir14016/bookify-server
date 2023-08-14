import { Schema, model } from "mongoose";
import { IWishList, WishListModel } from "./wishList.interface";
import { tags } from "./wishList.constant";

// main schema[wishlist]
const WishListSchema = new Schema<IWishList>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    book: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    tag: {
      type: String,
      required: true,
      enum: tags,
      // default: "will read in future",
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    collection: "wishList",
  },
);

//reading list schema
const ReadingListSchema = new Schema<IWishList>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    book: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    tag: {
      type: String,
      required: true,
      enum: tags,
      // default: "will read in future",
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    collection: "readingList",
  },
);

//wishlist model
export const WishList = model<IWishList, WishListModel>(
  "WishList",
  WishListSchema,
);

//reading list model
export const ReadingList = model<IWishList, WishListModel>(
  "ReadingList",
  ReadingListSchema,
);
