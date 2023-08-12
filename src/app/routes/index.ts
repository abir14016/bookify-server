import express from "express";
import { UserRoutes } from "../modules/user/user.route";
import { BookRoutes } from "../modules/book/book.route";
import { AuthRoutes } from "../modules/auth/auth.route";
import { WishListRoutes } from "../modules/wishList/wishList.route";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/books",
    route: BookRoutes,
  },
  {
    path: "/wishlist",
    route: WishListRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
