import { User } from "../auth/auth.model";
import { Blog } from "../blogs/blog.model";

export const blockUserService = async (userId: string): Promise<void> => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }

  user.isBlocked = true;
  await user.save();
};

export const deleteBlogService = async (id: string): Promise<void> => {
  const blog = await Blog.findById(id);
  if (!blog) {
    throw new Error("Blog not found");
  }

  await Blog.findByIdAndDelete(id);
};
