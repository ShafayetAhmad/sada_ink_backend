"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validator = void 0;
const zod_1 = require("zod");
const validator = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body);
        next();
    }
    catch (err) {
        if (err instanceof zod_1.ZodError) {
            res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: err.errors,
                stack: err.stack,
            });
        }
        next(err);
    }
};
exports.validator = validator;
