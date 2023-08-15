import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { ICreateUserResponse, UserService } from "./user.service";
import config from "../../../config";

//controller for creating an user
const createUser = catchAsync(async (req: Request, res: Response) => {
  const { ...user } = req.body;
  const result = await UserService.createUser(user);
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars

  //cookie options for extra security
  const cookieOptions = {
    secure: config.env === "production",
    httpOnly: true,
  };

  //set refreshtoken into cookie
  res.cookie("refreshToken", result.refreshToken, cookieOptions);

  sendResponse<ICreateUserResponse>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: `User created successfully`,
    data: result,
  });
});

export const UserController = {
  createUser,
};
