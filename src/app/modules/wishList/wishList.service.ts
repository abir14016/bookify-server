import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { IWishList } from "./wishList.interface";
import { User } from "../user/user.model";
import { WishList } from "./wishList.model";

//create book function
const addToWishList = async (payload: IWishList): Promise<IWishList> => {
  const isUserExist = await User.findById(payload.user);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  const result = await (
    await (await WishList.create(payload)).populate("user")
  ).populate("book");
  return result;
};

export const WishListService = {
  addToWishList,
};
