import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { BookValidation } from "./book.validation";
import { BookController } from "./book.controller";

const router = express.Router();

//router for getting single book
router.get("/:id", BookController.getSingleBook);

//router for updating single book
router.patch(
  "/:id",
  validateRequest(BookValidation.updateBookZodSchema),
  BookController.updateBook,
);

//router for deleting single book
router.delete("/:id", BookController.deleteBook);

//router for creating a book
router.post(
  "/create-book",
  validateRequest(BookValidation.createBookZodSchema),
  BookController.createBook,
);

//router for getting all books with pagination, searching and filtering
router.get("/", BookController.getAllBooks);

export const BookRoutes = router;
