import { IUser } from "./user.interface";
import { User } from "./user.model";

//create user function
const createUser = async (payload: IUser): Promise<IUser> => {
  const result = await User.create(payload);
  return result;
};

export const UserService = {
  createUser,
};
