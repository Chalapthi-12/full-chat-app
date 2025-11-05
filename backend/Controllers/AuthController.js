import { generateToken } from "../config/utils.js";
import userModel from "../Models/UserModel.js";
import bcrypt from "bcryptjs";
import cloudinary from "../config/cloudinary.js";

const signUpAuth = async (req, res) => {
  const { userName, email, password } = req.body;
  try {
    if (!userName || !email || !password) {
      return res
        .status(200)
        .json({ success: false, message: "Fill all Fields" });
    }
    if (password.length < 8) {
      return res
        .status(200)
        .json({ success: false, message: "Password should be 8 Characters" });
    }

    const userExists = await userModel.findOne({ email });

    if (userExists) {
      return res
        .status(200)
        .json({ success: false, message: "Email already Exists" });
    }
    const saltRounds = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new userModel({
      userName: userName,
      email: email,
      password: hashedPassword,
    });

    if (newUser) {
      await newUser.save();
      await generateToken(newUser._id, res);

      res.status(200).json({
        success: true,
        message: "Account Created",
        data: {
          userId: newUser._id,
          userName: newUser.userName,
          email: newUser.email,
          profilePic: newUser.profilePic,
        },
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Invalid user Data ",
      });
    }
  } catch (error) {
    console.log("Error at SignUp Controller", error.message);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const loginAuth = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Fill all Fields" });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User doesn't Exist" });
    }
    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Password" });
    }
    generateToken(user._id, res);
    res.status(200).json({
      success: true,
      message: "Login Successful",
      data: {
        userId: user._id,
        userName: user.userName,
        email: user.email,
        profilePic: user.profilePic,
      },
    });
  } catch (error) {
    console.log("error at login control", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const LogoutAuth = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ success: true, message: "Logout Successful" });
  } catch (error) {
    console.log("error at logout control", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const updateProfile = async (req, res) => {
  const { profilePic, userName } = req.body;
  const userId = req.user._id;
  try {
    if (!userName) {
      return res
        .status(400)
        .json({ success: false, message: "Username Required" });
    }
    if (profilePic === "" && userName) {
      const updatedData = await userModel.findByIdAndUpdate(userId, {
        userName: userName,
      });
      res.status(200).json({
        success: true,
        message: "Username Updated",
        data: updatedData,
      });
      return;
    }
    const uploadResponse = await cloudinary.uploader.upload(profilePic, {
      chunked: true,
    });
    const updatedData = await userModel.findByIdAndUpdate(userId, {
      profilePic: uploadResponse.secure_url,
      userName: userName,
    });
    res
      .status(200)
      .json({ success: true, message: "Profile Updated", data: updatedData });
  } catch (error) {
    console.log("error in update profile controller", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
const checkAuth = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("error in check Auth controller", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export { loginAuth, signUpAuth, LogoutAuth, updateProfile, checkAuth };
