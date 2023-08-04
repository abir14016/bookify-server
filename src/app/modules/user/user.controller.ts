import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { ICreateUserResponse } from "./user.interface";
import httpStatus from "http-status";
import { UserService } from "./user.service";

//controller for creating an user
const createUser = catchAsync(async (req: Request, res: Response) => {
  const { ...user } = req.body;
  const result = await UserService.createUser(user);
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const { password, ...others } = result;

  sendResponse<ICreateUserResponse>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: `User created successfully`,
    data: others,
  });
});

export const UserController = {
  createUser,
};
