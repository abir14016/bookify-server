import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { AuthController } from "./auth.controller";
import { AuthValidation } from "./auth.validation";

const router = express.Router();

//router for logging in a user
router.post(
  "/login",
  validateRequest(AuthValidation.loginZodSchema),
  AuthController.loginUser,
);

//router for creating access token using refresh token for user
router.post("/refresh-token", AuthController.refreshToken);

export const AuthRoutes = router;
