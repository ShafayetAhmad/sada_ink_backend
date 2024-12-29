"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBlogSchema = exports.createBlogSchema = void 0;
const zod_1 = require("zod");
const objectId = zod_1.z.string().refine((val) => /^[0-9a-fA-F]{24}$/.test(val), {
    message: "Invalid ObjectId format",
});
exports.createBlogSchema = zod_1.z.object({
    title: zod_1.z.string(),
    content: zod_1.z.string(),
    author: objectId.optional(),
    tags: zod_1.z.array(zod_1.z.string()).optional(),
    isPublished: zod_1.z.boolean().optional(),
});
exports.updateBlogSchema = zod_1.z.object({
    title: zod_1.z.string(),
    content: zod_1.z.string(),
    tags: zod_1.z.array(zod_1.z.string()).optional(),
    isPublished: zod_1.z.boolean().optional(),
});
