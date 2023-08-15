"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = require("../modules/user/user.route");
const book_route_1 = require("../modules/book/book.route");
const auth_route_1 = require("../modules/auth/auth.route");
const wishList_route_1 = require("../modules/wishList/wishList.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: "/users",
        route: user_route_1.UserRoutes,
    },
    {
        path: "/books",
        route: book_route_1.BookRoutes,
    },
    {
        path: "/wishlist",
        route: wishList_route_1.WishListRoutes,
    },
    {
        path: "/auth",
        route: auth_route_1.AuthRoutes,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
