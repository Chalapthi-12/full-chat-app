import jwt from "jsonwebtoken";
import userModel from "../Models/UserModel.js";

const authMiddleware = async (req, res, next) => {
  const token = req.cookies.jwt;

  try {
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token Found",
      });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);

    if (!decode) {
      return res.status(401).json({
        success: false,
        message: "Invalid Token",
      });
    }

    const user = await userModel.findById(decode.userId).select("-password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not Found",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log("error at AuthMiddleware", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export { authMiddleware };
