import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { BookValidation } from "./book.validation";
import { BookController } from "./book.controller";

const router = express.Router();

//router for getting single book
router.get("/:id", BookController.getSingleBook);

//router for creating a book
router.post(
  "/create-book",
  validateRequest(BookValidation.createBookZodSchema),
  BookController.createBook,
);

//router for getting all books with pagination, searching and filtering
router.get("/", BookController.getAllBooks);

export const BookRoutes = router;
