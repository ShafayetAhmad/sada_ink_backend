import { User } from "../auth/auth.model";
import { Blog, IBlog } from "./blog.model";

export const createBlog = async (blogData: Partial<IBlog>): Promise<IBlog> => {
  const blog = new Blog(blogData);
  return await blog.save();
};

export const getBlogs = async (
  search?: string,
  sortBy?: string,
  sortOrder: "asc" | "desc" = "asc",
  filter?: string
): Promise<IBlog[]> => {
  const query: any = {};
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { content: { $regex: search, $options: "i" } },
    ];
  }
  if (filter) {
    query.author = filter;
  }

  const sortOptions: any = {};
  if (sortBy) {
    sortOptions[sortBy] = sortOrder === "desc" ? -1 : 1;
  }

  return await Blog.find(query)
    .sort(sortOptions)
    .populate("author", "name email");
};

export const getBlogById = async (id: string): Promise<IBlog | null> => {
  return await Blog.findById(id).populate("author", "name email");
};

export const updateBlog = async (
  id: string,
  updateData: Partial<IBlog>
): Promise<IBlog | null> => {
  return await Blog.findByIdAndUpdate(id, updateData, { new: true });
};

export const deleteBlog = async (id: string): Promise<IBlog | null> => {
  return await Blog.findByIdAndDelete(id);
};

export const blockUser = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User Not Found");
  }

  return await User.findOneAndUpdate(
    { _id: userId },
    { isBlocked: true },
    { new: true }
  );
};
