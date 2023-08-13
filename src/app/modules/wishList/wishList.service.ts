import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { IWishList } from "./wishList.interface";
import { User } from "../user/user.model";
import { WishList } from "./wishList.model";
import { JwtHelpers } from "../../../helpers/jwtHelpers";
import config from "../../../config";
import { Secret } from "jsonwebtoken";

//create book function
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

const getAllWishListBooks = async (): Promise<IWishList[]> => {
  const result = await WishList.find().populate({
    path: "book",
    populate: { path: "owner" },
  });

  return result;
};

const getMyWishListBooks = async (token: string): Promise<IWishList[]> => {
  const verifiedUser = JwtHelpers.verifyToken(
    token,
    config.jwt.secret as Secret,
  );
  if (!verifiedUser) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized !");
  }

  const result = await WishList.find({ user: verifiedUser.userId }).populate({
    path: "book",
    populate: { path: "owner" },
  });

  return result;
};

export const WishListService = {
  addToWishList,
  getAllWishListBooks,
  getMyWishListBooks,
};
