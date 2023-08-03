import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { IBook } from "./book.interface";
import { BookService } from "./book.service";

//controller for creating a book
const createBook = catchAsync(async (req: Request, res: Response) => {
  const { ...bookData } = req.body;
  const result = await BookService.createBook(bookData);

  sendResponse<IBook>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: `Book created successfully`,
    data: result,
  });
});

export const UserController = {
  createBook,
};
