import express from "express";
import { WishListController } from "./wishList.controller";
import validateRequest from "../../middlewares/validateRequest";
import { WishListValidation } from "./wishList.validation";

const router = express.Router();

//router for add to wish list
router.post(
  "/add",
  validateRequest(WishListValidation.addToWistListZodSchema),
  WishListController.addToWishList,
);

router.get("/", WishListController.getWishListBooks);

export const WishListRoutes = router;
