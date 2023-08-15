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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishListService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const user_model_1 = require("../user/user.model");
const wishList_model_1 = require("./wishList.model");
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const config_1 = __importDefault(require("../../../config"));
//create wishlist function
const addToWishList = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield user_model_1.User.findById(payload.user);
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    const existingWishList = yield wishList_model_1.WishList.findOne({
        user: payload.user,
        book: payload.book,
    });
    if (existingWishList) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "You already added this book");
    }
    const result = yield (yield (yield wishList_model_1.WishList.create(payload)).populate("user")).populate({ path: "book", populate: { path: "owner" } });
    return result;
});
//create reading list function
const addToReadingList = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield user_model_1.User.findById(payload.user);
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    const existingReadingList = yield wishList_model_1.ReadingList.findOne({
        user: payload.user,
        book: payload.book,
    });
    if (existingReadingList) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "You already added this book to reading list !");
    }
    const result = yield (yield (yield wishList_model_1.ReadingList.create(payload)).populate("user")).populate({ path: "book", populate: { path: "owner" } });
    return result;
});
//get all wishlist function [unused]
const getAllWishListBooks = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield wishList_model_1.WishList.find()
        .populate("user")
        .populate({
        path: "book",
        populate: { path: "owner" },
    });
    return result;
});
//get specific[by user] wishlist function
const getMyWishListBooks = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const verifiedUser = jwtHelpers_1.JwtHelpers.verifyToken(token, config_1.default.jwt.secret);
    if (!verifiedUser) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "You are not authorized !");
    }
    const result = yield wishList_model_1.WishList.find({
        user: verifiedUser.userId,
        tag: "will read in future",
    })
        .populate("user")
        .populate({
        path: "book",
        populate: { path: "owner" },
    });
    return result;
});
//mark as read reading list function
const markAsRead = (token, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const verifiedUser = jwtHelpers_1.JwtHelpers.verifyToken(token, config_1.default.jwt.secret);
    if (!verifiedUser) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "You are not authorized !");
    }
    const query = {
        _id: payload === null || payload === void 0 ? void 0 : payload._id,
        user: verifiedUser.userId,
        tag: "currently reading",
    };
    const update = {
        $set: {
            tag: "completed",
        },
    };
    const result = yield wishList_model_1.ReadingList.findOneAndUpdate(query, update)
        .populate("user")
        .populate({
        path: "book",
        populate: { path: "owner" },
    });
    return result;
});
//get specific[by user] reading list function
const getMyReadingListBooks = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const verifiedUser = jwtHelpers_1.JwtHelpers.verifyToken(token, config_1.default.jwt.secret);
    if (!verifiedUser) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "You are not authorized !");
    }
    const result = yield wishList_model_1.ReadingList.find({
        user: verifiedUser.userId,
    })
        .populate("user")
        .populate({
        path: "book",
        populate: { path: "owner" },
    });
    return result;
});
//get specific[by user] completed list function
const getMyCompletedListBooks = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const verifiedUser = jwtHelpers_1.JwtHelpers.verifyToken(token, config_1.default.jwt.secret);
    if (!verifiedUser) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "You are not authorized !");
    }
    const result = yield wishList_model_1.ReadingList.find({
        user: verifiedUser.userId,
        tag: "completed",
    })
        .populate("user")
        .populate({
        path: "book",
        populate: { path: "owner" },
    });
    return result;
});
//remove from wishlist function
const removeFromWishList = (token, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const verifiedUser = jwtHelpers_1.JwtHelpers.verifyToken(token, config_1.default.jwt.secret);
    if (!verifiedUser) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "You are not authorized !");
    }
    const result = yield wishList_model_1.WishList.findOneAndDelete({
        _id: payload._id,
        user: verifiedUser.userId,
        tag: "will read in future",
    })
        .populate("user")
        .populate({
        path: "book",
        populate: { path: "owner" },
    });
    return result;
});
exports.WishListService = {
    addToWishList,
    getAllWishListBooks,
    getMyWishListBooks,
    addToReadingList,
    getMyReadingListBooks,
    markAsRead,
    getMyCompletedListBooks,
    removeFromWishList,
};
