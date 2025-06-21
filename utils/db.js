import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const db = () => {
  mongoose
    .connect(process.env.DB_URL)
    .then(() => {
      console.log("DB connected");
    })
    .catch(() => {
      console.log("DB not connected");
    });
};

export default db