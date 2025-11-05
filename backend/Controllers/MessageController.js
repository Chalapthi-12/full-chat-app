import userModel from "../Models/UserModel.js";
import messageModel from "../Models/MessageModel.js";
import cloudinary from "../config/cloudinary.js";

const sideBarUsers = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await userModel
      .find({ _id: { $ne: loggedInUserId } })
      .select("-password");
    res.status(200).json({
      success: true,
      data: filteredUsers,
    });
  } catch (error) {
    console.log("Error in sideBar message Controller", error.message);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;

    const messages = await messageModel.find({
      $or: [
        {
          senderId: myId,
          receiverId: userToChatId,
        },
        {
          senderId: userToChatId,
          receiverId: myId,
        },
      ],
    });
    res.status(200).json({
      success: true,
      data: messages,
    });
  } catch (error) {
    console.log("Error in get messages user Controller", error.message);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
const sendMessage = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;
    const { text, image } = req.body;
    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }
    const newMessage = new messageModel({
      senderId: myId,
      receiverId: userToChatId,
      text: text,
      image: imageUrl,
    });
    await newMessage.save();

    //todo:: socket.io code goes here
    res.status(201).json({ success: true, newMessage });
  } catch (error) {
    console.log("Error in send Message user Controller", error.message);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
export { sideBarUsers, getMessages, sendMessage };
