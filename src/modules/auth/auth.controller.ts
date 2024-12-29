import { NextFunction, Request, Response } from "express";
import { loginUser, registerUser, verifyRefreshToken } from "./auth.service";
import { User } from "./auth.model";
import { blockUser } from "../blogs/blog.service";

export const registerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body;
    console.log(name, email, password);
    const user = await registerUser(name, email, password);
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      statusCode: 201,
      data: { id: user._id, name: user.name, email: user.email },
    });
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
    res.status(200).json({
      success: true,
      message: "Login successful",
      statusCode: 200,
      data: { token: accessToken },
    });
  } catch (err: any) {
    err.statusCode = 401;
    next(err);
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

export const blockUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const blockUserId = req.body.uid; // Extract user ID to block

    const blockedUser = await blockUser(blockUserId);

    res.status(200).json({
      success: true,
      message: "User has been blocked successfully",
      data: blockedUser,
    });
  } catch (err) {
    next(err);
  }
};
