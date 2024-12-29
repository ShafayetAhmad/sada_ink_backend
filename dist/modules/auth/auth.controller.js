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
exports.blockUserController = exports.refreshAccessToken = exports.loginController = exports.registerController = void 0;
const auth_service_1 = require("./auth.service");
const blog_service_1 = require("../blogs/blog.service");
const registerController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        const user = yield (0, auth_service_1.registerUser)(name, email, password);
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            statusCode: 201,
            data: { id: user._id, name: user.name, email: user.email },
        });
    }
    catch (error) {
        next(error);
    }
});
exports.registerController = registerController;
const loginController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const { user, accessToken, refreshToken } = yield (0, auth_service_1.loginUser)(email, password);
        res.status(200).json({
            success: true,
            message: "Login successful",
            statusCode: 200,
            data: { token: accessToken },
        });
    }
    catch (err) {
        err.statusCode = 401;
        next(err);
    }
});
exports.loginController = loginController;
const refreshAccessToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) {
            res
                .status(400)
                .json({ success: false, message: "Refresh token is required" });
        }
        else {
            const accessToken = yield (0, auth_service_1.verifyRefreshToken)(refreshToken);
            res.status(200).json({ success: true, data: { accessToken } });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.refreshAccessToken = refreshAccessToken;
const blockUserController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blockUserId = req.body.uid;
        const blockedUser = yield (0, blog_service_1.blockUser)(blockUserId);
        res.status(200).json({
            success: true,
            message: "User has been blocked successfully",
            data: blockedUser,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.blockUserController = blockUserController;
