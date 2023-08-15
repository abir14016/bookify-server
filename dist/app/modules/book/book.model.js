"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const mongoose_1 = require("mongoose");
const book_constant_1 = require("./book.constant");
//review schema
const ReviewResponseSchema = new mongoose_1.Schema({
    reviewerName: {
        type: String,
        required: true,
    },
    reviewerEmail: {
        type: String,
        required: true,
    },
    review: {
        type: String,
        required: true,
    },
}, {
    _id: false, // Exclude _id from the subdocument
});
// main schema[book]
const BookSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    author: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true,
        enum: book_constant_1.genres,
    },
    imageURL: {
        type: String,
        unique: true,
    },
    publicationYear: {
        type: Number,
        required: true,
    },
    owner: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    reviews: {
        type: [ReviewResponseSchema],
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
//model
exports.Book = (0, mongoose_1.model)("Book", BookSchema);
