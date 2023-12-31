import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import {
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from "./auth.interface";
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

  const { email: userEmail, name: userName, _id: userId } = isUserExist;

  //create access token
  const accessToken = JwtHelpers.createToken(
    { userEmail, userName, userId },
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

//refresh token for generating new access token for user function
const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  //verify token
  let verifiedToken = null;
  try {
    verifiedToken = JwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret,
    );
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, "Invalid refresh token");
  }

  //check deleted user's refresh token
  const { userEmail } = verifiedToken;
  const currentUser = await User.findOne({ email: userEmail });
  if (!currentUser) {
    throw new ApiError(httpStatus.FORBIDDEN, "Invalid User");
  }
  const isUserExist = await User.isUserExist(currentUser.email);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User does not exist !");
  }

  //generate new access token
  const newAccessToken = JwtHelpers.createToken(
    {
      email: isUserExist.email,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string,
  );

  return {
    accessToken: newAccessToken,
  };
};

export const AuthService = {
  loginUser,
  refreshToken,
};
