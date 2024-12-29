// controllers/adminController.ts
import { Request, Response } from "express";
import { blockUserService, deleteBlogService } from "./admin.service";

export const blockUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    await blockUserService(userId);
    res.status(200).json({
      success: true,
      message: "User blocked successfully",
      statusCode: 200,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      statusCode: 500,
    });
  }
};

export const deleteBlog = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await deleteBlogService(id);
    res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
      statusCode: 200,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      statusCode: 500,
    });
  }
};
