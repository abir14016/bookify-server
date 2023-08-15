"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishListRoutes = void 0;
const express_1 = __importDefault(require("express"));
const wishList_controller_1 = require("./wishList.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const wishList_validation_1 = require("./wishList.validation");
const router = express_1.default.Router();
//router for add to wish list
router.post("/add-to-wishlist", (0, validateRequest_1.default)(wishList_validation_1.WishListValidation.addToWistListZodSchema), wishList_controller_1.WishListController.addToWishList);
router.post("/add-to-reading-list", wishList_controller_1.WishListController.addToReadingList);
router.get("/my-wishlist", wishList_controller_1.WishListController.getMyWishListBooks);
router.get("/my-reading-list", wishList_controller_1.WishListController.getMyReadingListBooks);
router.get("/my-completed-list", wishList_controller_1.WishListController.getMyCompletedListBooks);
router.patch("/my-reading-list/mark-as-read", wishList_controller_1.WishListController.markAsRead);
router.delete("/remove-from-wishlist", wishList_controller_1.WishListController.removeFromWishList);
router.get("/", wishList_controller_1.WishListController.getAllWishListBooks);
exports.WishListRoutes = router;
