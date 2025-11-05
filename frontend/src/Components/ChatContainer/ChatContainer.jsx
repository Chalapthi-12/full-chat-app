import React, { useEffect, useRef, useState } from "react";
import "./ChatContainer.css";
import { X, Send, Image } from "lucide-react";
import defaultProfilePic from "../../assets/chat-app-profile.webp";
import { useMessageStore } from "../../Store/useMessageStore";
import { useAuthStore } from "../../Store/useAuthStore";

const ChatContainer = ({ userId, selectedUser, setSelectedUser }) => {
  const { getMessages, messages, sendMessage, convertTime, isSendingMessage } =
    useMessageStore();
  const { authUser } = useAuthStore();
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const messageEndRef = useRef(null);

  // TODOO:: To reset the message field while user is switched to other user from sideber
  // TODO:: adding colors and styling the scrollbars in chat container and side bar
  //TODO:: fixing the sidebar width and adjusment on selecting the chat container
  //TODO:: stylin the color of the chat container and message boxes
  //TODO:: adding skeleton classes in the chat container while messages are loaded

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select a image File");
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      const base64Image = reader.result;
      setImagePreview(base64Image);
    };
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  useEffect(() => {
    getMessages(userId);
  }, [getMessages, messages]);
  const onChangeHandler = (e) => {
    setText(e.target.value.trimStart());
  };
  useEffect(() => {
    setText("");
  }, [setText, selectedUser]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (text.length < 1 && imagePreview === null) return;
    try {
      sendMessage(userId, {
        text: text,
        image: imagePreview,
      });
      fileInputRef.current.value = "";
      setText("");
      setImagePreview(null);
    } catch (error) {
      toast.error("Failed to send message");
    }
  };

  return (
    <div
      id="chat-container"
      className="flex-grow bg-base-300 px-6 py-5 relative max-sm:px-2 max-sm:py-2"
    >
      <div
        className="flex flex-row items-center justify-between h-[8vh] z-[999999]"
        id="chat-top"
      >
        <div className="flex flex-row gap-3">
          <div>
            <img
              className="size-12 rounded-full object-cover max-sm:size-10"
              src={selectedUser.profilePic || defaultProfilePic}
              alt=""
            />
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-primary">{selectedUser.userName}</p>
            <p className="text-success">online</p>
          </div>
        </div>
        <div>
          <X
            onClick={() => {
              setSelectedUser({});
            }}
            className="size-8 cursor-pointer text-primary/50"
          />
        </div>
      </div>

      <div
        id="chat-messages"
        className="chat-messages h-[70vh] overflow-y-scroll p-4 scrollbar-none"
      >
        {messages.map((message) => (
          <div key={message._id}>
            {message.receiverId === selectedUser._id ? (
              <div className="chat chat-end">
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full max-sm:w-8">
                    <img
                      alt="profile"
                      src={authUser.profilePic || defaultProfilePic}
                    />
                  </div>
                </div>
                <div className="chat-header">
                  <time className="text-xs opacity-50">
                    {convertTime(message.createdAt)}
                  </time>
                </div>
                <div className="chat-bubble bg-primary text-primary-content">
                  {message.image && (
                    <img
                      className="w-80 object-cover max-sm:w-60"
                      src={message.image}
                      alt="Attachment"
                    />
                  )}
                  {message.text && <p>{message.text}</p>}
                </div>
              </div>
            ) : (
              <div className="chat chat-start">
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full max-sm:w-8">
                    <img
                      src={selectedUser.profilePic || defaultProfilePic}
                      alt="Avatar"
                    />
                  </div>
                </div>
                <div className="chat-header">
                  <time className="text-xs opacity-50">
                    {convertTime(message.createdAt)}
                  </time>
                </div>
                <div className="chat-bubble bg-base-100 text-base-content">
                  {message.image && (
                    <img
                      className="w-80 object-cover max-sm:w-60"
                      src={message.image}
                      alt="Attachment"
                    />
                  )}
                  {message.text && <p>{message.text}</p>}
                </div>
              </div>
            )}
          </div>
        ))}
        {imagePreview && (
          <div className="mb-3 flex items-center gap-2">
            <div className="relative">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-60 object-cover rounded-lg border-zinc-700 bg-white"
              />
              <button
                onClick={removeImage}
                className="absolute -top-0 -right-0 w-8 h-8 rounded-full flex items-center justify-center bg-neutral"
              >
                <X className=" text-red-600" />
              </button>
            </div>
          </div>
        )}
        <div ref={messageEndRef} />
      </div>

      <form
        onSubmit={submitHandler}
        action=""
        method="POST"
        className="flex flex-row items-center justify-between gap-3 w-full"
      >
        <input
          type="text"
          name="text"
          value={text}
          placeholder="Type here"
          className="input input-bordered flex-grow"
          onChange={onChangeHandler}
        />
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleImage}
        />
        <button
          type="button"
          className={`sm:flex btn btn-circle ${
            imagePreview ? "text-emerald-500" : "text-zinc-400"
          }`}
          onClick={() => fileInputRef.current?.click()}
        >
          <Image className="size-15" />
        </button>
        <button
          id="send-btn"
          className="flex items-center justify-center flex-row bg-primary p-2 px-6 rounded-md max-sm:p-2 max-sm:px-4"
        >
          {isSendingMessage ? (
            <span className="loading loading-spinner loading-md"></span>
          ) : (
            <Send className="size-6 text-primary-content font-normal max-sm:size-6" />
          )}
        </button>
      </form>
    </div>
  );
};

export default ChatContainer;
