"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const config_1 = __importDefault(require("../../config"));
const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    if (config_1.default.node_env === "development") {
        console.error(`[Error] ${err.message}`, err);
    }
    res.status(statusCode).json({
        success: false,
        message: err.message || "Internal Server Error",
        statusCode,
        error: config_1.default.node_env === "development" ? err.message : undefined,
        stack: config_1.default.node_env === "development" ? err.stack : undefined,
    });
};
exports.errorHandler = errorHandler;
