"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogRoutes = void 0;
const express_1 = __importDefault(require("express"));
const blog_controller_1 = require("./blog.controller");
const authMiddleware_1 = require("../../shared/middlewares/authMiddleware");
exports.blogRoutes = express_1.default.Router();
exports.blogRoutes.post("/", authMiddleware_1.isAuthenticated, blog_controller_1.createBlogController);
exports.blogRoutes.get("/", blog_controller_1.getBlogsController);
exports.blogRoutes.get("/:id", blog_controller_1.getBlogByIdController);
exports.blogRoutes.put("/:id", authMiddleware_1.isAuthenticated, blog_controller_1.updateBlogController);
exports.blogRoutes.delete("/:id", authMiddleware_1.isAuthenticated, blog_controller_1.deleteBlogController);
