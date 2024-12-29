import express from "express";
import {
  isAdmin,
  isAuthenticated,
} from "../../shared/middlewares/authMiddleware";
import { blockUser, deleteBlog } from "./admin.controller";
export const adminRoutes = express.Router();

adminRoutes.patch("/users/:userId/block", isAuthenticated, isAdmin, blockUser);
adminRoutes.delete("/blogs/:id", isAuthenticated, isAdmin, deleteBlog);
