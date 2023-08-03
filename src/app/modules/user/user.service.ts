import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { IUser } from "./user.interface";
import { User } from "./user.model";

//create user function
const createUser = async (payload: IUser): Promise<IUser> => {
  //checking wheater the updated data is emty object or not
  if (!Object.keys(payload).length) {
    throw new ApiError(httpStatus.BAD_REQUEST, "You did not enter anything !");
  }
  const result = await User.create(payload);
  return result;
};

export const UserService = {
  createUser,
};
