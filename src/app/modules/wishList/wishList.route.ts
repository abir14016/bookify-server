import express from "express";
import { WishListController } from "./wishList.controller";
import validateRequest from "../../middlewares/validateRequest";
import { WishListValidation } from "./wishList.validation";

const router = express.Router();

//router for add to wish list
router.post(
  "/add-to-wishlist",
  validateRequest(WishListValidation.addToWistListZodSchema),
  WishListController.addToWishList,
);

router.post("/add-to-reading-list", WishListController.addToReadingList);
router.get("/my-wishlist", WishListController.getMyWishListBooks);
router.get("/my-reading-list", WishListController.getMyReadingListBooks);
router.get("/my-completed-list", WishListController.getMyCompletedListBooks);
router.patch("/my-reading-list/mark-as-read", WishListController.markAsRead);

router.get("/", WishListController.getAllWishListBooks);

export const WishListRoutes = router;
