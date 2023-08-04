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
    genre: z
      .string({
        required_error: "Genre name is required",
      })
      .optional(),
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

export const BookValidation = {
  createBookZodSchema,
  updateBookZodSchema,
};
