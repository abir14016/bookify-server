import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { User } from "../user/user.model";
import { IBook, IBookFilters } from "./book.interface";
import { Book } from "./book.model";
import { IPaginationOptions } from "../../../interfaces/paginationOptions";
import { IGenericResponse } from "../../../interfaces/common";
import { PaginationHelpers } from "../../../helpers/paginationHelpers";
import { bookSearchableFields } from "./book.constant";
import { SortOrder } from "mongoose";
import { JwtHelpers } from "../../../helpers/jwtHelpers";
import config from "../../../config";
import { Secret } from "jsonwebtoken";

//create book function
const createBook = async (payload: IBook): Promise<IBook> => {
  const isOwnerExist = await User.findById(payload.owner);
  if (!isOwnerExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  const result = (await Book.create(payload)).populate("owner");
  return result;
};

//get all books with pagination, searching and filtering function
const getAllBooks = async (
  filters: IBookFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IBook[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const { page, limit, skip, sortBy, sortOrder } =
    PaginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  //searching implementation
  if (searchTerm) {
    andConditions.push({
      $or: bookSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: "i", //case insensitive
        },
      })),
    });
  }

  //filtering implementation
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Book.find(whereConditions)
    .populate("owner")
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const count = await Book.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      count,
    },
    data: result,
  };
};

//get single book function
const getSingleBook = async (id: string): Promise<IBook | null> => {
  //checking wheater the book is exist or not
  const isBookExist = await Book.findById(id);
  if (!isBookExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "Book not found !");
  }
  const result = await Book.findById(id).populate("owner");
  return result;
};

//update single book function
const updateBook = async (
  id: string,
  payload: Partial<IBook>,
  token: string,
) => {
  //checking wheater the updated data is emty object or not
  if (!Object.keys(payload).length) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "You did not enter anything to update !",
    );
  }
  //checking wheater the book is exist or not
  const isBookExist = await Book.findById(id);
  if (!isBookExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "Book not found !");
  }

  // Check if the owner ID exists in the User collection if updating owner field
  const isOwnerExist = await User.findOne({ _id: payload.owner });
  // Check if the payload has a seller field
  if (payload.owner) {
    if (!isOwnerExist) {
      throw new ApiError(
        httpStatus.NOT_FOUND,
        "The seller you want to update is not exist !",
      );
    }
  }

  //checking whwther the current user is owner of this book or not
  const verifiedUser = JwtHelpers.verifyToken(
    token,
    config.jwt.secret as Secret,
  );
  if (!verifiedUser) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized !");
  }

  const owner = await User.findById(isBookExist.owner);

  if (!owner) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  if (owner?.email !== verifiedUser?.userEmail) {
    throw new ApiError(httpStatus.FORBIDDEN, "Forbidden !");
  }

  const result = await Book.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  }).populate("owner");
  return result;
};

//delete book function
const deleteBook = async (id: string, token: string): Promise<IBook | null> => {
  //checking wheater the book is exist or not
  const isBookExist = await Book.findById(id);
  if (!isBookExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "Book not found !");
  }

  //checking whwther the current user is owner of this book or not
  const verifiedUser = JwtHelpers.verifyToken(
    token,
    config.jwt.secret as Secret,
  );
  if (!verifiedUser) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized !");
  }

  const owner = await User.findById(isBookExist.owner);

  if (!owner) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  if (owner?.email !== verifiedUser?.userEmail) {
    throw new ApiError(httpStatus.FORBIDDEN, "Forbidden !");
  }

  const result = Book.findByIdAndDelete(id);
  return result;
};

export const BookService = {
  createBook,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBook,
};
