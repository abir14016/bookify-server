import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { ILoginUser, ILoginUserResponse } from "./auth.interface";
import { JwtHelpers } from "../../../helpers/jwtHelpers";
import config from "../../../config";
import { Secret } from "jsonwebtoken";
import { User } from "../user/user.model";

//user log in function
const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { email, password } = payload;

  //check whetehr the user exist or not
  const isUserExist = await User.isUserExist(email);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User does not exist !");
  }
  //match password
  const isPasswordMatched = await User.isPasswordMatched(
    password,
    isUserExist.password,
  );

  if (isUserExist.password && !isPasswordMatched) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Password is incorrect !");
  }

  const { email: userEmail } = isUserExist;

  //create access token
  const accessToken = JwtHelpers.createToken(
    { userEmail },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string,
  );

  //create refresh token
  const refreshToken = JwtHelpers.createToken(
    { userEmail },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
  };
};

export const AuthService = {
  loginUser,
};
