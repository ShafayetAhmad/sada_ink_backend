import express from "express";
import { authRoutes } from "../modules/auth/auth.routes";
import { blogRoutes } from "../modules/blogs/blog.routes";
import { adminRoutes } from "../modules/admin/admin.routes";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Welcome sada ink api");
});

router.use("/auth", authRoutes);
router.use("/blogs", blogRoutes);
router.use("/admin", adminRoutes);

export default router;
