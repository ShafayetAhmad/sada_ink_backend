import mongoose, { Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  password: string;
  email: string;
  refreshToken: string;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  refreshToken: { type: String, required: false },
});

export const User = mongoose.model<IUser>("user", userSchema);
