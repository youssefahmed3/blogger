import * as z from "zod"

export const BlogValidationSchema = z.object({
  body: z.string().min(10, {
      message: "Blog Body must be at least 10 characters.",
    }),
  })