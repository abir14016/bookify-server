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

export const BookService = {
  createBook,
  getAllBooks,
  getSingleBook,
};
