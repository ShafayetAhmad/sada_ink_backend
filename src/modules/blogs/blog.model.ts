import mongoose, { Schema, Document } from "mongoose";

export interface IBlog extends Document {
  title: string;
  content: string;
  author: mongoose.Types.ObjectId;
  tags?: string[];
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const blogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true, minlength: 5 },
    content: { type: String, required: true, minlength: 20 },
    author: { type: Schema.Types.ObjectId, ref: "user", required: true },
    tags: { type: [String], default: [] },
    isPublished: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Blog = mongoose.model<IBlog>("Blog", blogSchema);
