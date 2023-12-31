import z from "zod";

const createUserZodSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: "Eamil is required",
      })
      .email(),
    password: z.string({
      required_error: "password is required",
    }),
    name: z.string({
      required_error: "Name is required",
    }),
  }),
});

export const UserValidation = {
  createUserZodSchema,
};
