import express from "express";
import { WishListController } from "./wishList.controller";

const router = express.Router();

//router for creating a book
router.post("/add", WishListController.addToWishList);

export const WishListRoutes = router;
