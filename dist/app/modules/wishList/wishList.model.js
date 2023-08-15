"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReadingList = exports.WishList = void 0;
const mongoose_1 = require("mongoose");
const wishList_constant_1 = require("./wishList.constant");
// main schema[wishlist]
const WishListSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    book: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Book",
        required: true,
    },
    tag: {
        type: String,
        required: true,
        enum: wishList_constant_1.tags,
        // default: "will read in future",
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
    collection: "wishList",
});
//reading list schema
const ReadingListSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    book: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Book",
        required: true,
    },
    tag: {
        type: String,
        required: true,
        enum: wishList_constant_1.tags,
        // default: "will read in future",
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
    collection: "readingList",
});
//wishlist model
exports.WishList = (0, mongoose_1.model)("WishList", WishListSchema);
//reading list model
exports.ReadingList = (0, mongoose_1.model)("ReadingList", ReadingListSchema);
