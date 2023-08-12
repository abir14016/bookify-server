import { Schema, model } from "mongoose";
import { BookModel, IBook, IReviewResponse } from "./book.interface";
import { genres } from "./book.constant";

//review schema
const ReviewResponseSchema = new Schema<IReviewResponse>(
  {
    reviewerName: {
      type: String,
      required: true,
    },
    reviewerEmail: {
      type: String,
      required: true,
    },
    review: {
      type: String,
      required: true,
    },
  },
  {
    _id: false, // Exclude _id from the subdocument
  },
);

// main schema[book]
const BookSchema = new Schema<IBook>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    author: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
      enum: genres,
    },
    imageURL: {
      type: String,
      unique: true,
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
    reviews: {
      type: [ReviewResponseSchema],
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
