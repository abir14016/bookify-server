import express from "express";
import { WishListController } from "./wishList.controller";
import validateRequest from "../../middlewares/validateRequest";
import { WishListValidation } from "./wishList.validation";

const router = express.Router();

//router for creating a book
router.post(
  "/add",
  validateRequest(WishListValidation.addToWistListZodSchema),
  WishListController.addToWishList,
);

export const WishListRoutes = router;
