import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { User } from "../user/user.model";
import { IBook } from "./book.interface";
import { Book } from "./book.model";

//create book function
const createBook = async (payload: IBook): Promise<IBook> => {
  const isOwnerExist = await User.findById(payload.owner);
  if (!isOwnerExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  const result = (await Book.create(payload)).populate("owner");
  return result;
};

export const BookService = {
  createBook,
};
