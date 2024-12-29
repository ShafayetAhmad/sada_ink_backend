"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("./auth.controller");
const validator_1 = require("../../shared/middlewares/validator");
const auth_validation_1 = require("./auth.validation");
const authMiddleware_1 = require("../../shared/middlewares/authMiddleware");
exports.authRoutes = express_1.default.Router();
exports.authRoutes.get("/", (req, res) => {
    res.send("/login for Login API and /register for Register API");
});
exports.authRoutes.post("/register", (0, validator_1.validator)(auth_validation_1.registerSchema), auth_controller_1.registerController);
exports.authRoutes.post("/login", (0, validator_1.validator)(auth_validation_1.loginSchema), auth_controller_1.loginController);
exports.authRoutes.post("/refresh-token", (0, validator_1.validator)(auth_validation_1.refreshTokenSchema), auth_controller_1.refreshAccessToken);
exports.authRoutes.post("/blockUser", authMiddleware_1.isAdmin, auth_controller_1.blockUserController);
