import { Schema, model } from "mongoose";
import { IUser, UserModel } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../../config";

const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

// isUserExist statics
UserSchema.statics.isUserExist = async function (
  email: string,
): Promise<
  (Pick<IUser, "email" | "name" | "password"> & { _id: string }) | null
> {
  return await User.findOne(
    { email },
    { email: 1, name: 1, password: 1, _id: 1 },
  );
};

// isPasswordMatched statics
UserSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string,
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};

//save hash password exactly before saving the document[user] into database
UserSchema.pre("save", async function (next) {
  //hashing password
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );

  next();
});

//model
export const User = model<IUser, UserModel>("User", UserSchema);
