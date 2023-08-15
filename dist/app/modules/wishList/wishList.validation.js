"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishListValidation = void 0;
const zod_1 = __importDefault(require("zod"));
const wishList_constant_1 = require("./wishList.constant");
const addToWistListZodSchema = zod_1.default.object({
    body: zod_1.default.object({
        user: zod_1.default.string({
            required_error: "user is required",
        }),
        book: zod_1.default.string({
            required_error: "book is required",
        }),
        tag: zod_1.default.enum([...wishList_constant_1.tags], {
            required_error: "Tag is Required",
        }),
    }),
});
exports.WishListValidation = {
    addToWistListZodSchema,
};
