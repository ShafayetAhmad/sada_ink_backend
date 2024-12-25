import { NextFunction, Request, Response } from "express";
import { loginUser, registerUser, verifyRefreshToken } from "./auth.service";
import { User } from "./auth.model";

export const registerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body;
    console.log(name, email, password);
    const user = await registerUser(name, email, password);
    res.status(200).json({ success: true, data: user });
    // res.send().status(201)
  } catch (error) {
    next(error);
  }
};

export const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const { user, accessToken, refreshToken } = await loginUser(
      email,
      password
    );
    res
      .status(200)
      .json({ success: true, data: { user, accessToken, refreshToken } });
  } catch (error) {
    next(error);
  }
};

export const refreshAccessToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      res
        .status(400)
        .json({ success: false, message: "Refresh token is required" });
    } else {
      const accessToken = await verifyRefreshToken(refreshToken);
      res.status(200).json({ success: true, data: { accessToken } });
    }
  } catch (error) {
    next(error);
  }
};
