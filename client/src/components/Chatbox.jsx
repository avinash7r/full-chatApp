import React, { useEffect } from "react";
import Chatheader from "./Chatheader.jsx";
import Msginput from "./Msginput.jsx";
import { useMsgStore } from "../store/useMsgStore.js";
import { useAuthStore } from "../store/useAuthStore.js";

const Chatbox = () => {
  const { selectedUser, getMessages, messages } = useMsgStore();
  const { authUser } = useAuthStore();

  useEffect(() => {
    getMessages(selectedUser?._id);
  }, [getMessages, selectedUser?._id]);
  return (
    <div>
      <Chatheader />

      <div className="">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`chat ${
              message.senderId === authUser?._id ? "chat-end" : "chat-start"
            }`}
          >
            <div className="chat-image avatar">
              <div className="w-10 rounded-full border">
              <img
                src={
                  message.senderId === authUser?._id
                    ? authUser.profilePic || "/avatar.png"
                    : selectedUser.profilePic || "/avatar.png"
                }
                alt="profile pic"
              />
              </div>
            </div>
            <div className="chat-bubble flex">
              {message.text}
            </div>
          </div>
        ))}
      </div>

      <Msginput />
    </div>
  );
};

export default Chatbox;
