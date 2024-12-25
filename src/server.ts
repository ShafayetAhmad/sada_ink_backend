import mongoose from "mongoose";
import config from "./config";
import app from "./app";
import { errorHandler } from "./shared/middlewares/errorHandler";
import router from "./routes";

async function main() {
  try {
    await mongoose.connect(config.db_url as string);
    app.listen(config.port, () => {
      console.log(`Sada Ink Backend listening on port ${config.port}`);
    });
    app.use("/api/", router);
    app.use(errorHandler);
  } catch (error) {
    console.log((error as Error).message);
  }
}

main();
