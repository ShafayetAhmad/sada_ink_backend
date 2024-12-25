import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

beforeAll(async () => {
  await mongoose.connect(process.env.DB_URL || "", {});
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});
