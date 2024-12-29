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
exports.blockUser = exports.deleteBlog = exports.updateBlog = exports.getBlogById = exports.getBlogs = exports.createBlog = void 0;
const auth_model_1 = require("../auth/auth.model");
const blog_model_1 = require("./blog.model");
const createBlog = (blogData) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = new blog_model_1.Blog(blogData);
    return yield blog.save();
});
exports.createBlog = createBlog;
const getBlogs = (search_1, sortBy_1, ...args_1) => __awaiter(void 0, [search_1, sortBy_1, ...args_1], void 0, function* (search, sortBy, sortOrder = "asc", filter) {
    const query = {};
    if (search) {
        query.$or = [
            { title: { $regex: search, $options: "i" } },
            { content: { $regex: search, $options: "i" } },
        ];
    }
    if (filter) {
        query.author = filter;
    }
    const sortOptions = {};
    if (sortBy) {
        sortOptions[sortBy] = sortOrder === "desc" ? -1 : 1;
    }
    return yield blog_model_1.Blog.find(query)
        .sort(sortOptions)
        .populate("author", "name email");
});
exports.getBlogs = getBlogs;
const getBlogById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield blog_model_1.Blog.findById(id).populate("author", "name email");
});
exports.getBlogById = getBlogById;
const updateBlog = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield blog_model_1.Blog.findByIdAndUpdate(id, updateData, { new: true });
});
exports.updateBlog = updateBlog;
const deleteBlog = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield blog_model_1.Blog.findByIdAndDelete(id);
});
exports.deleteBlog = deleteBlog;
const blockUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield auth_model_1.User.findById(userId);
    if (!user) {
        throw new Error("User Not Found");
    }
    return yield auth_model_1.User.findOneAndUpdate({ _id: userId }, { isBlocked: true }, { new: true });
});
exports.blockUser = blockUser;
