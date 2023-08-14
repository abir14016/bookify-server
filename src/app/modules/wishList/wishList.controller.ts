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

//controller for add to reading list
const addToReadingList = catchAsync(async (req: Request, res: Response) => {
  const { ...wishListData } = req.body;
  const result = await WishListService.addToReadingList(wishListData);

  sendResponse<IWishList>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: `Successfully added to readingList`,
    data: result,
  });
});

//controller for getting all wishlist books[unused]
const getAllWishListBooks = catchAsync(async (req: Request, res: Response) => {
  const result = await WishListService.getAllWishListBooks();

  sendResponse<IWishList[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Books retrieved successfully",
    data: result,
  });
});

//controller for getting specific[by user] wishlist books
const getMyWishListBooks = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization;
  if (!token) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized !");
  }
  const result = await WishListService.getMyWishListBooks(token);

  sendResponse<IWishList[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "My wishlist books retrieved successfully",
    data: result,
  });
});

//controller for getting specific[by user] reading list books
const getMyReadingListBooks = catchAsync(
  async (req: Request, res: Response) => {
    const token = req.headers.authorization;
    if (!token) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized !");
    }
    const result = await WishListService.getMyReadingListBooks(token);

    sendResponse<IWishList[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "My reading list books retrieved successfully",
      data: result,
    });
  },
);

//controller for getting specific[by user] completed list books
const getMyCompletedListBooks = catchAsync(
  async (req: Request, res: Response) => {
    const token = req.headers.authorization;
    if (!token) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized !");
    }
    const result = await WishListService.getMyCompletedListBooks(token);

    sendResponse<IWishList[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "My completed list books retrieved successfully",
      data: result,
    });
  },
);

//controller for mark as read
const markAsRead = catchAsync(async (req: Request, res: Response) => {
  const { ...wishListData } = req.body;
  const token = req.headers.authorization;
  if (!token) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized !");
  }
  const result = await WishListService.markAsRead(token, wishListData);

  sendResponse<IWishList>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "mark as completed",
    data: result,
  });
});

export const WishListController = {
  addToWishList,
  getAllWishListBooks,
  getMyWishListBooks,
  addToReadingList,
  getMyReadingListBooks,
  markAsRead,
  getMyCompletedListBooks,
};
