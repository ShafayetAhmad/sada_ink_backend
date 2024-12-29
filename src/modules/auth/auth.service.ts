import { User } from "./auth.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../../config";
import { generateToken } from "../../shared/utils/jwt.util";
export const registerUser = async (
  name: string,
  email: string,
  password: string,
  role: "admin" | "user" = "user"
) => {
  const userExist = await User.findOne({ email });
  if (userExist) {
    throw new Error("Email already in use");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ name, email, password: hashedPassword, role });
  newUser.save();
  return newUser;
};

export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }
  const accessToken = generateToken({ id: user._id }, "30d");
  const refreshToken = generateToken({ id: user._id }, "30d");
  user.refreshToken = refreshToken;
  await user.save();
  return { user, accessToken, refreshToken };
};

export const verifyRefreshToken = async (token: string) => {
  try {
    const decoded = jwt.verify(token, config.jwt_secret || "") as {
      id: string;
    };
    const user = await User.findById(decoded.id);
    if (!user || user.refreshToken !== token) {
      throw new Error("Invalid refresh token");
    }
    const accessToken = generateToken({ id: user._id }, "15m");
    return accessToken;
  } catch (error) {
    throw new Error("Invalid refresh token");
  }
};
