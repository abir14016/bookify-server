"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookValidation = void 0;
const zod_1 = __importDefault(require("zod"));
const book_constant_1 = require("./book.constant");
const createBookZodSchema = zod_1.default.object({
    body: zod_1.default.object({
        title: zod_1.default.string({
            required_error: "Title is required",
        }),
        author: zod_1.default.string({
            required_error: "Author name is required",
        }),
        genre: zod_1.default.enum([...book_constant_1.genres], {
            required_error: "Genre is Required",
        }),
        imageURL: zod_1.default.string().optional(),
        publicationYear: zod_1.default.number({
            required_error: "Publication year is required",
        }),
        owner: zod_1.default.string({
            required_error: "Owner is is required",
        }),
        reviews: zod_1.default.array(zod_1.default.string()).optional(),
    }),
});
//zod schema for updating a book
const updateBookZodSchema = zod_1.default.object({
    body: zod_1.default.object({
        title: zod_1.default
            .string({
            required_error: "Title is required",
        })
            .optional(),
        author: zod_1.default
            .string({
            required_error: "Author name is required",
        })
            .optional(),
        genre: zod_1.default.enum([...book_constant_1.genres]).optional(),
        imageURL: zod_1.default.string().optional(),
        publicationYear: zod_1.default
            .number({
            required_error: "Publication year is required",
        })
            .optional(),
        owner: zod_1.default
            .string({
            required_error: "Owner is is required",
        })
            .optional(),
        reviews: zod_1.default.array(zod_1.default.string()).optional(),
    }),
});
const reviewZodSchema = zod_1.default.object({
    body: zod_1.default.object({
        review: zod_1.default.string({
            required_error: "Review is required",
        }),
    }),
});
exports.BookValidation = {
    createBookZodSchema,
    updateBookZodSchema,
    reviewZodSchema,
};
