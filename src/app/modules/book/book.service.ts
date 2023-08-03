import { IBook } from "./book.interface";
import { Book } from "./book.model";

//create book function
const createBook = async (payload: IBook): Promise<IBook> => {
  const result = await Book.create(payload);
  return result;
};

export const BookService = {
  createBook,
};
