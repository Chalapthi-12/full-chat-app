import express from "express";
import {
  loginAuth,
  LogoutAuth,
  signUpAuth,
  updateProfile,
  checkAuth,
} from "../Controllers/AuthController.js";

import { authMiddleware } from "../Middlewares/AuthMiddleware.js";

const AuthRouter = express.Router();

AuthRouter.post("/login", loginAuth);
AuthRouter.post("/signup", signUpAuth);
AuthRouter.post("/logout", LogoutAuth);
AuthRouter.put("/update-profile", authMiddleware, updateProfile);
AuthRouter.get("/check", authMiddleware, checkAuth);

export default AuthRouter;
