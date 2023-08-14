import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { IWishList } from "./wishList.interface";
import { User } from "../user/user.model";
import { ReadingList, WishList } from "./wishList.model";
import { JwtHelpers } from "../../../helpers/jwtHelpers";
import config from "../../../config";
import { Secret } from "jsonwebtoken";

//create wishlist function
const addToWishList = async (payload: IWishList): Promise<IWishList> => {
  const isUserExist = await User.findById(payload.user);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  const existingWishList = await WishList.findOne({
    user: payload.user,
    book: payload.book,
  });

  if (existingWishList) {
    throw new ApiError(httpStatus.BAD_REQUEST, "You already added this book");
  }

  const result = await (
    await (await WishList.create(payload)).populate("user")
  ).populate({ path: "book", populate: { path: "owner" } });
  return result;
};

//create reading list function
const addToReadingList = async (payload: IWishList): Promise<IWishList> => {
  const isUserExist = await User.findById(payload.user);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  const existingReadingList = await ReadingList.findOne({
    user: payload.user,
    book: payload.book,
  });

  if (existingReadingList) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "You already added this book to reading list !",
    );
  }

  const result = await (
    await (await ReadingList.create(payload)).populate("user")
  ).populate({ path: "book", populate: { path: "owner" } });
  return result;
};

//get all wishlist function [unused]
const getAllWishListBooks = async (): Promise<IWishList[]> => {
  const result = await WishList.find().populate({
    path: "book",
    populate: { path: "owner" },
  });

  return result;
};

//get specific[by user] wishlist function
const getMyWishListBooks = async (token: string): Promise<IWishList[]> => {
  const verifiedUser = JwtHelpers.verifyToken(
    token,
    config.jwt.secret as Secret,
  );
  if (!verifiedUser) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized !");
  }

  const result = await WishList.find({
    user: verifiedUser.userId,
    tag: "will read in future",
  }).populate({
    path: "book",
    populate: { path: "owner" },
  });

  return result;
};

//mark as read reading list function
const markAsRead = async (
  token: string,
  payload: IWishList,
): Promise<IWishList | null> => {
  const verifiedUser = JwtHelpers.verifyToken(
    token,
    config.jwt.secret as Secret,
  );
  if (!verifiedUser) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized !");
  }

  const query = {
    _id: payload?._id,
    user: verifiedUser.userId,
    tag: "currently reading",
  };

  const update = {
    $set: {
      tag: "completed",
    },
  };

  const result = await ReadingList.findOneAndUpdate(query, update).populate({
    path: "book",
    populate: { path: "owner" },
  });

  return result;
};
//get specific[by user] reading list function
const getMyReadingListBooks = async (token: string): Promise<IWishList[]> => {
  const verifiedUser = JwtHelpers.verifyToken(
    token,
    config.jwt.secret as Secret,
  );
  if (!verifiedUser) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized !");
  }

  const result = await ReadingList.find({
    user: verifiedUser.userId,
  })
    .populate("user")
    .populate({
      path: "book",
      populate: { path: "owner" },
    });

  return result;
};

//get specific[by user] completed list function
const getMyCompletedListBooks = async (token: string): Promise<IWishList[]> => {
  const verifiedUser = JwtHelpers.verifyToken(
    token,
    config.jwt.secret as Secret,
  );
  if (!verifiedUser) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized !");
  }

  const result = await ReadingList.find({
    user: verifiedUser.userId,
    tag: "completed",
  }).populate({
    path: "book",
    populate: { path: "owner" },
  });

  return result;
};

export const WishListService = {
  addToWishList,
  getAllWishListBooks,
  getMyWishListBooks,
  addToReadingList,
  getMyReadingListBooks,
  markAsRead,
  getMyCompletedListBooks,
};
