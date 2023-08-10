import z from "zod";
import { genres } from "./book.constant";

const createBookZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: "Title is required",
    }),
    author: z.string({
      required_error: "Author name is required",
    }),
    genre: z.enum([...genres] as [string, ...string[]], {
      required_error: "Genre is Required",
    }),
    imageURL: z.string().optional(),
    publicationYear: z.number({
      required_error: "Publication year is required",
    }),
    owner: z.string({
      required_error: "Owner is is required",
    }),
    reviews: z.array(z.string()).optional(),
  }),
});

//zod schema for updating a book
const updateBookZodSchema = z.object({
  body: z.object({
    title: z
      .string({
        required_error: "Title is required",
      })
      .optional(),
    author: z
      .string({
        required_error: "Author name is required",
      })
      .optional(),
    genre: z.enum([...genres] as [string, ...string[]]).optional(),
    imageURL: z.string().optional(),
    publicationYear: z
      .number({
        required_error: "Publication year is required",
      })
      .optional(),
    owner: z
      .string({
        required_error: "Owner is is required",
      })
      .optional(),
    reviews: z.array(z.string()).optional(),
  }),
});

const reviewZodSchema = z.object({
  body: z.object({
    review: z.string({
      required_error: "Review is required",
    }),
  }),
});

export const BookValidation = {
  createBookZodSchema,
  updateBookZodSchema,
  reviewZodSchema,
};
