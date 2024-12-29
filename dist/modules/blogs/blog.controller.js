"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBlogController = exports.updateBlogController = exports.getBlogByIdController = exports.getBlogsController = exports.createBlogController = void 0;
const blog_service_1 = require("./blog.service");
const blog_validation_1 = require("./blog.validation");
const blog_model_1 = require("./blog.model");
const createBlogController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        const blogData = blog_validation_1.createBlogSchema.parse(req.body);
        const blog = yield (0, blog_service_1.createBlog)(Object.assign(Object.assign({}, blogData), { author: req.user._id }));
        res.status(201).json({ success: true, data: blog });
    }
    catch (error) {
        next(error);
    }
});
exports.createBlogController = createBlogController;
const getBlogsController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { search, sortBy, sortOrder, filter } = req.query;
        const blogs = yield (0, blog_service_1.getBlogs)(search, sortBy, sortOrder, filter);
        res.status(200).json({
            success: true,
            message: "Blogs fetched successfully",
            statusCode: 200,
            data: blogs,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getBlogsController = getBlogsController;
const getBlogByIdController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const blog = yield (0, blog_service_1.getBlogById)(id);
        if (!blog) {
            res.status(404).json({ success: false, message: "Blog not found" });
        }
        else {
            res.status(200).json({ success: true, data: blog });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.getBlogByIdController = getBlogByIdController;
const updateBlogController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = req.user;
        const blog = yield blog_model_1.Blog.findById(id);
        if (!blog) {
            res.status(404).json({ success: false, message: "Blog not found" });
        }
        else {
            const canUpdate = (blog === null || blog === void 0 ? void 0 : blog.author.toString()) == (user === null || user === void 0 ? void 0 : user._id.toString());
            if (!canUpdate) {
                res.status(403).json({ success: false, message: "Access Denied" });
            }
            else {
                const updateData = blog_validation_1.updateBlogSchema.parse(req.body);
                const blog = yield (0, blog_service_1.updateBlog)(id, updateData);
                res.status(200).json({
                    success: true,
                    message: "Blog updated successfully",
                    statusCode: 200,
                    data: blog,
                });
            }
        }
    }
    catch (error) {
        next(error);
    }
});
exports.updateBlogController = updateBlogController;
const deleteBlogController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = req.user;
        const blog = yield blog_model_1.Blog.findById(id);
        if (!blog) {
            res.status(404).json({ success: false, message: "Blog not found" });
        }
        else {
            const canDelete = (user === null || user === void 0 ? void 0 : user.role) === "admin" ||
                (blog === null || blog === void 0 ? void 0 : blog.author.toString()) === (user === null || user === void 0 ? void 0 : user._id.toString());
            if (!canDelete) {
                res.status(403).json({ success: false, message: "Access Denied" });
            }
            else {
                const deletedBlog = yield (0, blog_service_1.deleteBlog)(id);
                res.status(200).json({
                    success: true,
                    message: "Blog deleted successfully",
                    statusCode: 200,
                    data: deletedBlog,
                });
            }
        }
    }
    catch (error) {
        next(error);
    }
});
exports.deleteBlogController = deleteBlogController;
