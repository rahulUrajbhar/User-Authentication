import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import db from "./utils/db.js"
import cookieParser from "cookie-parser"
import userRoutes from "./routes/user.routes.js"


dotenv.config()
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cookieParser())
app.use(cors({
    origin:process.env.ORG,
    credentials: true,
    methods:["GET","POST","DELETE","OPTIONS"],
    allowedHeaders :["Content-Type","Authorization"]
}))
app.use(express.json())
app.use(express.urlencoded({extends:true}))

db()
app.use("/api/v1/users", userRoutes)

app.listen(PORT, () => {
  console.log(`Backend is working on ${PORT}`);
});
