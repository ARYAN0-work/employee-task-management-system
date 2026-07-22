import "dotenv/config";
import mongoose from "mongoose";
import app from "./app.js";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);

    console.log("MongoDB Connected");

    app.listen(PORT, () => {
      console.log(`Server is listening `);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

startServer();
