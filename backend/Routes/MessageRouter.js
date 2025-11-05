import express from "express";
import { authMiddleware } from "../Middlewares/AuthMiddleware.js";
import {
  getMessages,
  sendMessage,
  sideBarUsers,
} from "../Controllers/MessageController.js";
const messageRouter = express.Router();

messageRouter.get("/users", authMiddleware, sideBarUsers);
messageRouter.get("/:id", authMiddleware, getMessages);
messageRouter.post("/send/:id", authMiddleware, sendMessage);

export default messageRouter;
