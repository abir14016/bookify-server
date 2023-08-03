import z from "zod";

const createBookZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: "Title is required",
    }),
    author: z.string({
      required_error: "Author name is required",
    }),
    genre: z.string({
      required_error: "Genre name is required",
    }),
    imageURL: z.string().optional(),
    publicationYaer: z.number({
      required_error: "Publication year is required",
    }),
    owner: z.string({
      required_error: "Owner is is required",
    }),
  }),
});

export const UserValidation = {
  createBookZodSchema,
};
