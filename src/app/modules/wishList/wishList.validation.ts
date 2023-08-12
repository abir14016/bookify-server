import z from "zod";
import { tags } from "./wishList.constant";

const addToWistListZodSchema = z.object({
  body: z.object({
    user: z.string({
      required_error: "user is required",
    }),
    book: z.string({
      required_error: "book is required",
    }),
    tag: z.enum([...tags] as [string, ...string[]], {
      required_error: "Tag is Required",
    }),
  }),
});

export const WishListValidation = {
  addToWistListZodSchema,
};
