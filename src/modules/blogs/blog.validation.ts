import { z } from "zod";
const objectId = z.string().refine((val) => /^[0-9a-fA-F]{24}$/.test(val), {
  message: "Invalid ObjectId format",
});
export const createBlogSchema = z.object({
  title: z.string(),
  content: z.string(),
  author: objectId.optional(),
  tags: z.array(z.string()).optional(),
  isPublished: z.boolean().optional(),
});

export const updateBlogSchema = z.object({
  title: z.string(),
  content: z.string(),
  tags: z.array(z.string()).optional(),
  isPublished: z.boolean().optional(),
});
