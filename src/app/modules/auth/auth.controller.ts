import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { AuthService } from "./auth.service";
import sendResponse from "../../../shared/sendResponse";
import { ILoginUserResponse } from "./auth.interface";
import httpStatus from "http-status";
import config from "../../../config";

//controller for logging in user [buyer | seller]
const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;
  const result = await AuthService.loginUser(loginData);
  const { refreshToken, ...others } = result;

  //cookie options for extra security
  const cookieOptions = {
    secure: config.env === "production",
    httpOnly: true,
  };

  //set refreshtoken into cookie
  res.cookie("refreshToken", refreshToken, cookieOptions);

  sendResponse<ILoginUserResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User logged in successfully !",
    data: others,
  });
});

export const AuthController = {
  loginUser,
};
