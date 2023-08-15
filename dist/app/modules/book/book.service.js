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
exports.BookService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const user_model_1 = require("../user/user.model");
const book_model_1 = require("./book.model");
const paginationHelpers_1 = require("../../../helpers/paginationHelpers");
const book_constant_1 = require("./book.constant");
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const config_1 = __importDefault(require("../../../config"));
//create book function
const createBook = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isOwnerExist = yield user_model_1.User.findById(payload.owner);
    if (!isOwnerExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    const result = (yield book_model_1.Book.create(payload)).populate("owner");
    return result;
});
//get all books with pagination, searching and filtering function
const getAllBooks = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const { page, limit, skip, sortBy, sortOrder } = paginationHelpers_1.PaginationHelpers.calculatePagination(paginationOptions);
    const andConditions = [];
    //searching implementation
    if (searchTerm) {
        andConditions.push({
            $or: book_constant_1.bookSearchableFields.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: "i", //case insensitive
                },
            })),
        });
    }
    //filtering implementation
    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    const result = yield book_model_1.Book.find(whereConditions)
        .populate("owner")
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const count = yield book_model_1.Book.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            count,
        },
        data: result,
    };
});
//get single book function
const getSingleBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    //checking wheater the book is exist or not
    const isBookExist = yield book_model_1.Book.findById(id);
    if (!isBookExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Book not found !");
    }
    const result = yield book_model_1.Book.findById(id).populate("owner");
    return result;
});
//update single book function
const updateBook = (id, payload, token) => __awaiter(void 0, void 0, void 0, function* () {
    //checking wheater the updated data is emty object or not
    if (!Object.keys(payload).length) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "You did not enter anything to update !");
    }
    //checking wheater the book is exist or not
    const isBookExist = yield book_model_1.Book.findById(id);
    if (!isBookExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Book not found !");
    }
    // Check if the owner ID exists in the User collection if updating owner field
    const isOwnerExist = yield user_model_1.User.findOne({ _id: payload.owner });
    // Check if the payload has a seller field
    if (payload.owner) {
        if (!isOwnerExist) {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "The user you want to update is not exist !");
        }
    }
    //checking whwther the current user is owner of this book or not
    const verifiedUser = jwtHelpers_1.JwtHelpers.verifyToken(token, config_1.default.jwt.secret);
    if (!verifiedUser) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "You are not authorized !");
    }
    const owner = yield user_model_1.User.findById(isBookExist.owner);
    if (!owner) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    if ((owner === null || owner === void 0 ? void 0 : owner.email) !== (verifiedUser === null || verifiedUser === void 0 ? void 0 : verifiedUser.userEmail)) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "Forbidden !");
    }
    const result = yield book_model_1.Book.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    }).populate("owner");
    return result;
});
//delete book function
const deleteBook = (id, token) => __awaiter(void 0, void 0, void 0, function* () {
    //checking wheater the book is exist or not
    const isBookExist = yield book_model_1.Book.findById(id);
    if (!isBookExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Book not found !");
    }
    //checking whwther the current user is owner of this book or not
    const verifiedUser = jwtHelpers_1.JwtHelpers.verifyToken(token, config_1.default.jwt.secret);
    if (!verifiedUser) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "You are not authorized !");
    }
    const owner = yield user_model_1.User.findById(isBookExist.owner);
    if (!owner) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    if ((owner === null || owner === void 0 ? void 0 : owner.email) !== (verifiedUser === null || verifiedUser === void 0 ? void 0 : verifiedUser.userEmail)) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "Forbidden !");
    }
    const result = book_model_1.Book.findByIdAndDelete(id);
    return result;
});
//review
const review = (id, payload, token) => __awaiter(void 0, void 0, void 0, function* () {
    //checking wheater the book is exist or not
    const isBookExist = yield book_model_1.Book.findById(id);
    if (!isBookExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Book not found !");
    }
    const verifiedUser = jwtHelpers_1.JwtHelpers.verifyToken(token, config_1.default.jwt.secret);
    if (!verifiedUser) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "You are not authorized !");
    }
    const reviewer = yield user_model_1.User.findOne({ email: verifiedUser.userEmail });
    const review = {
        reviewerName: reviewer === null || reviewer === void 0 ? void 0 : reviewer.name,
        reviewerEmail: reviewer === null || reviewer === void 0 ? void 0 : reviewer.email,
        review: payload === null || payload === void 0 ? void 0 : payload.review,
    };
    const result = yield book_model_1.Book.findOneAndUpdate({ _id: id }, { $push: { reviews: review } }, { new: true }).populate("owner");
    return result;
});
exports.BookService = {
    createBook,
    getAllBooks,
    getSingleBook,
    updateBook,
    deleteBook,
    review,
};
