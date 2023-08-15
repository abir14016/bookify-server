"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishListController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const wishList_service_1 = require("./wishList.service");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
//controller for add to wishlist
const addToWishList = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const wishListData = __rest(req.body, []);
    const result = yield wishList_service_1.WishListService.addToWishList(wishListData);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: `Successfully added to wishlist`,
        data: result,
    });
}));
//controller for add to reading list
const addToReadingList = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const wishListData = __rest(req.body, []);
    const result = yield wishList_service_1.WishListService.addToReadingList(wishListData);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: `Successfully added to readingList`,
        data: result,
    });
}));
//controller for getting all wishlist books[unused]
const getAllWishListBooks = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield wishList_service_1.WishListService.getAllWishListBooks();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Books retrieved successfully",
        data: result,
    });
}));
//controller for getting specific[by user] wishlist books
const getMyWishListBooks = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization;
    if (!token) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "You are not authorized !");
    }
    const result = yield wishList_service_1.WishListService.getMyWishListBooks(token);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "My wishlist books retrieved successfully",
        data: result,
    });
}));
//controller for getting specific[by user] reading list books
const getMyReadingListBooks = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization;
    if (!token) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "You are not authorized !");
    }
    const result = yield wishList_service_1.WishListService.getMyReadingListBooks(token);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "My reading list books retrieved successfully",
        data: result,
    });
}));
//controller for getting specific[by user] completed list books
const getMyCompletedListBooks = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization;
    if (!token) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "You are not authorized !");
    }
    const result = yield wishList_service_1.WishListService.getMyCompletedListBooks(token);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "My completed list books retrieved successfully",
        data: result,
    });
}));
//controller for mark as read
const markAsRead = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const wishListData = __rest(req.body, []);
    const token = req.headers.authorization;
    if (!token) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "You are not authorized !");
    }
    const result = yield wishList_service_1.WishListService.markAsRead(token, wishListData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "mark as completed",
        data: result,
    });
}));
//controller for removing book from wishlist
const removeFromWishList = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const wishListData = __rest(req.body, []);
    const token = req.headers.authorization;
    if (!token) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "You are not authorized !");
    }
    const result = yield wishList_service_1.WishListService.removeFromWishList(token, wishListData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "removed from wishlist",
        data: result,
    });
}));
exports.WishListController = {
    addToWishList,
    getAllWishListBooks,
    getMyWishListBooks,
    addToReadingList,
    getMyReadingListBooks,
    markAsRead,
    getMyCompletedListBooks,
    removeFromWishList,
};
