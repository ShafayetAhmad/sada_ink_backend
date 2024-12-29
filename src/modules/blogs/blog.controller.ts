import { NextFunction, Request, Response } from "express";
import {
  createBlog,
  deleteBlog,
  getBlogById,
  getBlogs,
  updateBlog,
} from "./blog.service";
import { createBlogSchema, updateBlogSchema } from "./blog.validation";
import { Blog } from "./blog.model";
import { User } from "../auth/auth.model";

export const createBlogController = async (
  req: Request & { user?: any },
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(req.body);
    const blogData = createBlogSchema.parse(req.body);
    const blog = await createBlog({
      ...blogData,
      author: req.user._id,
    });
    res.status(201).json({ success: true, data: blog });
  } catch (error) {
    next(error);
  }
};

export const getBlogsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { search, sortBy, sortOrder, filter } = req.query;

    const blogs = await getBlogs(
      search as string,
      sortBy as string,
      sortOrder as "asc" | "desc",
      filter as string
    );

    res.status(200).json({
      success: true,
      message: "Blogs fetched successfully",
      statusCode: 200,
      data: blogs,
    });
  } catch (error) {
    next(error);
  }
};

export const getBlogByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const blog = await getBlogById(id);
    if (!blog) {
      res.status(404).json({ success: false, message: "Blog not found" });
    } else {
      res.status(200).json({ success: true, data: blog });
    }
  } catch (error) {
    next(error);
  }
};

export const updateBlogController = async (
  req: Request & { user?: any },
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const user = req.user;
    const blog = await Blog.findById(id);
    if (!blog) {
      res.status(404).json({ success: false, message: "Blog not found" });
    } else {
      const canUpdate: boolean =
        blog?.author.toString() == user?._id.toString();

      if (!canUpdate) {
        res.status(403).json({ success: false, message: "Access Denied" });
      } else {
        const updateData = updateBlogSchema.parse(req.body);
        const blog = await updateBlog(id, updateData);
        res.status(200).json({
          success: true,
          message: "Blog updated successfully",
          statusCode: 200,
          data: blog,
        });
      }
    }
  } catch (error) {
    next(error);
  }
};

export const deleteBlogController = async (
  req: Request & { user?: any },
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const user = req.user;
    const blog = await Blog.findById(id);
    if (!blog) {
      res.status(404).json({ success: false, message: "Blog not found" });
    } else {
      const canDelete: boolean =
        user?.role === "admin" ||
        blog?.author.toString() === user?._id.toString();

      if (!canDelete) {
        res.status(403).json({ success: false, message: "Access Denied" });
      } else {
        const deletedBlog = await deleteBlog(id);
        res.status(200).json({
          success: true,
          message: "Blog deleted successfully",
          statusCode: 200,
          data: deletedBlog,
        });
      }
    }
  } catch (error) {
    next(error);
  }
};
