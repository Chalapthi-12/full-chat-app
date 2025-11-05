import React from "react";
import "./EmptyChat.css";
import { MessageSquare } from "lucide-react";
const EmptyChat = () => {
  return (
    <>
      <div className="empty-chat flex flex-col items-center justify-center gap-8 flex-grow bg-base-300">
        <MessageSquare
          className="size-8 chat-logo box-content p-2 rounded cursor-pointer bg-primary hover:bg-primary/70 text-primary-content max-sm:size-7"
          id="empty-chat-logo"
        />
        <p className="text-xl text-primary/60">Select a user to start Chat</p>
      </div>
    </>
  );
};

export default EmptyChat;
