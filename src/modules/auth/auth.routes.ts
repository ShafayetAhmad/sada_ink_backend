import express from "express";
import {
  blockUserController,
  loginController,
  refreshAccessToken,
  registerController,
} from "./auth.controller";
import { validator } from "../../shared/middlewares/validator";
import {
  loginSchema,
  refreshTokenSchema,
  registerSchema,
} from "./auth.validation";
import { isAdmin } from "../../shared/middlewares/authMiddleware";
export const authRoutes = express.Router();

authRoutes.get("/", (req, res) => {
  res.send("/login for Login API and /register for Register API");
});
authRoutes.post("/register", validator(registerSchema), registerController);

authRoutes.post("/login", validator(loginSchema), loginController);
authRoutes.post(
  "/refresh-token",
  validator(refreshTokenSchema),
  refreshAccessToken
);

authRoutes.post("/blockUser", isAdmin, blockUserController);
