import { Model } from "mongoose";

export type IRatings = [number];

export type IReview = {
  title: string;
  ratings: IRatings;
};

export type ReviewModel = Model<IReview, Record<string, unknown>>;
