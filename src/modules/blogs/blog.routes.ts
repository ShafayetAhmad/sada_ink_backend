import express from "express";
import {
  createBlogController,
  deleteBlogController,
  getBlogByIdController,
  getBlogsController,
  updateBlogController,
} from "./blog.controller";
import { isAuthenticated } from "../../shared/middlewares/authMiddleware";

export const blogRoutes = express.Router();

blogRoutes.post("/", isAuthenticated, createBlogController);
blogRoutes.get("/", getBlogsController);
blogRoutes.get("/:id", getBlogByIdController);
blogRoutes.put("/:id", isAuthenticated, updateBlogController);
blogRoutes.delete("/:id", isAuthenticated, deleteBlogController);
