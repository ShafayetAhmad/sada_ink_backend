"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRoutes = void 0;
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../../shared/middlewares/authMiddleware");
const admin_controller_1 = require("./admin.controller");
exports.adminRoutes = express_1.default.Router();
exports.adminRoutes.patch("/users/:userId/block", authMiddleware_1.isAuthenticated, authMiddleware_1.isAdmin, admin_controller_1.blockUser);
exports.adminRoutes.delete("/blogs/:id", authMiddleware_1.isAuthenticated, authMiddleware_1.isAdmin, admin_controller_1.deleteBlog);
