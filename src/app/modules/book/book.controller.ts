import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { IBook } from "./book.interface";
import { BookService } from "./book.service";
import { bookFilterableFields } from "./book.constant";
import pick from "../../../shared/pick";
import { paginationFields } from "../../../constant/pagination";
import ApiError from "../../../errors/ApiError";

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

//controller for getting all books with pagination, searching and filtering
const getAllBooks = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, bookFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await BookService.getAllBooks(filters, paginationOptions);

  sendResponse<IBook[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Books retrieved successfully",
    meta: result.meta,
    data: result.data,
  });
});

//controller for getting single book
const getSingleBook = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BookService.getSingleBook(id);

  sendResponse<IBook>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: `Book retrieved successfully`,
    data: result,
  });
});

//controller for updating single book
const updateBook = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedData = req.body;
  const token = req.headers.authorization;
  if (!token) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized !");
  }
  const result = await BookService.updateBook(id, updatedData, token);

  sendResponse<IBook>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: `Book updated successfully`,
    data: result,
  });
});

//controller for deleting single cow
const deleteBook = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const token = req.headers.authorization;
  if (!token) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized !");
  }

  const result = await BookService.deleteBook(id, token);

  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book deleted successfully",
    data: result,
  });
});

//controller for review
const review = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedData = req.body;

  const token = req.headers.authorization;
  if (!token) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized !");
  }
  const result = await BookService.review(id, updatedData, token);

  sendResponse<IBook>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: `Review added successfully`,
    data: result,
  });
});

export const BookController = {
  createBook,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBook,
  review,
};
