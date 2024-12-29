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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRefreshToken = exports.loginUser = exports.registerUser = void 0;
const auth_model_1 = require("./auth.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const jwt_util_1 = require("../../shared/utils/jwt.util");
const registerUser = (name_1, email_1, password_1, ...args_1) => __awaiter(void 0, [name_1, email_1, password_1, ...args_1], void 0, function* (name, email, password, role = "user") {
    const userExist = yield auth_model_1.User.findOne({ email });
    if (userExist) {
        throw new Error("Email already in use");
    }
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    const newUser = new auth_model_1.User({ name, email, password: hashedPassword, role });
    newUser.save();
    return newUser;
});
exports.registerUser = registerUser;
const loginUser = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield auth_model_1.User.findOne({ email });
    if (!user) {
        throw new Error("Invalid email or password");
    }
    const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error("Invalid email or password");
    }
    const accessToken = (0, jwt_util_1.generateToken)({ id: user._id }, "30d");
    const refreshToken = (0, jwt_util_1.generateToken)({ id: user._id }, "30d");
    user.refreshToken = refreshToken;
    yield user.save();
    return { user, accessToken, refreshToken };
});
exports.loginUser = loginUser;
const verifyRefreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_secret || "");
        const user = yield auth_model_1.User.findById(decoded.id);
        if (!user || user.refreshToken !== token) {
            throw new Error("Invalid refresh token");
        }
        const accessToken = (0, jwt_util_1.generateToken)({ id: user._id }, "15m");
        return accessToken;
    }
    catch (error) {
        throw new Error("Invalid refresh token");
    }
});
exports.verifyRefreshToken = verifyRefreshToken;
