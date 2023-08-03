import { Schema, model } from "mongoose";
import { BookModel, IBook } from "./book.interface";

const BookSchema = new Schema<IBook>(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    imageURL: {
      type: String,
    },
    publicationYear: {
      type: Number,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
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
export const Book = model<IBook, BookModel>("Book", BookSchema);
