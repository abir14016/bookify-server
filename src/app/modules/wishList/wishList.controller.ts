import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { IWishList } from "./wishList.interface";
import { WishListService } from "./wishList.service";

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

const getWishListBooks = catchAsync(async (req: Request, res: Response) => {
  const result = await WishListService.getAllWishListBooks();

  sendResponse<IWishList[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Books retrieved successfully",
    data: result,
  });
});

export const WishListController = {
  addToWishList,
  getWishListBooks,
};
