import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { IWishList } from "./wishList.interface";
import { WishListService } from "./wishList.service";
import ApiError from "../../../errors/ApiError";

//controller for add to wishlist
const addToWishList = catchAsync(async (req: Request, res: Response) => {
  const { ...wishListData } = req.body;
  const result = await WishListService.addToWishList(wishListData);

  sendResponse<IWishList>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: `Successfully added to wishlist`,
    data: result,
  });
});

const getAllWishListBooks = catchAsync(async (req: Request, res: Response) => {
  const result = await WishListService.getAllWishListBooks();

  sendResponse<IWishList[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Books retrieved successfully",
    data: result,
  });
});

const getMyWishListBooks = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization;
  if (!token) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized !");
  }
  const result = await WishListService.getMyWishListBooks(token);

  sendResponse<IWishList[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "My books retrieved successfully",
    data: result,
  });
});

export const WishListController = {
  addToWishList,
  getAllWishListBooks,
  getMyWishListBooks,
};
