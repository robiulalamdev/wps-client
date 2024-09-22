/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import MessageConversationArea from "./MessageConversationArea";

const MessagesContainer = ({ open, setOpen }) => {
  const { chat } = useSelector((state) => state.conversation);
  const dispatch = useDispatch();
  return (
    <div
      className={`${
        open ? "block" : "hidden"
      } md:block message-conversation-area flex-grow flex flex-col justify-between gap-3 w-full p-2 md:p-4`}
      style={{ maxHeight: "620px" }}
    >
      {chat && <MessageConversationArea chatId={chat?._id} />}
    </div>
  );
};

export default MessagesContainer;
