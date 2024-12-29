"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_routes_1 = require("../modules/auth/auth.routes");
const blog_routes_1 = require("../modules/blogs/blog.routes");
const admin_routes_1 = require("../modules/admin/admin.routes");
const router = express_1.default.Router();
router.get("/", (req, res) => {
    res.send("Welcome sada ink api");
});
router.use("/auth", auth_routes_1.authRoutes);
router.use("/blogs", blog_routes_1.blogRoutes);
router.use("/admin", admin_routes_1.adminRoutes);
exports.default = router;
