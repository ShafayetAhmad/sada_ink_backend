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
exports.isAdmin = exports.isAuthenticated = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_model_1 = require("../../modules/auth/auth.model");
const config_1 = __importDefault(require("../../config"));
const isAuthenticated = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        if (!token)
            res.status(401).json({ success: false, message: "Token required" });
        else {
            const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_secret || "");
            const user = yield auth_model_1.User.findById(decoded.id);
            if (!user || user.isBlocked) {
                res.status(403).json({ success: false, message: "Access denied" });
            }
            req.user = user;
            next();
        }
    }
    catch (error) {
        res.status(401).json({ success: false, message: "Invalid token" });
    }
});
exports.isAuthenticated = isAuthenticated;
const isAdmin = (req, res, next) => {
    if (req.user.role !== "admin") {
        res
            .status(403)
            .json({ success: false, message: "Admin privileges required" });
    }
    next();
};
exports.isAdmin = isAdmin;
