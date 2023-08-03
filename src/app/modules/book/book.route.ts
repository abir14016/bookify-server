import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { BookValidation } from "./book.validation";
import { BookController } from "./book.controller";

const router = express.Router();

//router for creating a book
router.post(
  "/create-book",
  validateRequest(BookValidation.createBookZodSchema),
  BookController.createBook,
);

export const BookRoutes = router;
