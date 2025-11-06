import express, { json } from "express";
import cors from "cors";
import AuthRouter from "../Routes/AuthRouter.js";
import { connectDB } from "../config/db.js";
import dotenv from "dotenv";
import messageRouter from "../Routes/MessageRouter.js";
import cookieParser from "cookie-parser";

const app = express();

//middlewares
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://full-chat-app-1-4grm.onrender.com",
    ],
    credentials: true,
  })
);
app.use(express.json({ limit: "50mb" }));
dotenv.config();
// DB Connection
connectDB();
app.get("/", async (req, res) => {
  res.send("server is running");
});

app.use("/api/auth", AuthRouter);
app.use("/api/message", messageRouter);

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`server is running successfully on port:${port}`);
});
