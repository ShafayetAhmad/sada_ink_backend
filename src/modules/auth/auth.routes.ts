import express from "express";
import {
  loginController,
  refreshAccessToken,
  registerController,
} from "./auth.controller";
export const authRoutes = express.Router();

authRoutes.get("/", (req, res) => {
  res.send("/login for Login API and /register for Register API");
});
authRoutes.post("/register", registerController);

authRoutes.post("/login", loginController);
authRoutes.post("/refresh-token", refreshAccessToken);
