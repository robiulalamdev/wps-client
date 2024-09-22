/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import SendMessageBox from "./SendMessageBox";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import {
  useGetMessageByChatIdQuery,
  useSendMessageMutation,
} from "../../redux/features/conversations/conversationApi";
import PageLoading from "../common/loadings/PageLoading";
import SingleMessage from "./SingleMessage";
import { AuthContext } from "../../contextApi/AuthContext";
import {
  setLastMessage,
  setMessagePush,
  setMessages,
} from "../../redux/features/conversations/conversationSlice";

const MessageConversationArea = ({ chatId }) => {
  const { user } = useContext(AuthContext);
  const { data, isLoading } = useGetMessageByChatIdQuery(chatId);
  const [sendMessage] = useSendMessageMutation();
  const { chat, messages } = useSelector((state) => state.conversation);
  const dispatch = useDispatch();

  useMemo(() => {
    if (data?.data?.length > 0) {
      dispatch(setMessages(data?.data));
    }
  }, [data]);

  const handleSendMessage = async (message) => {
    const options = {
      data: {
        chatId: chatId,
        senderId: user?._id,
        members: [chat?.receiverInfo?._id, user?._id],
        message: message?.message,
      },
    };

    const result = await sendMessage(options);
    if (result?.data?.success) {
      dispatch(setMessagePush(result?.data?.data));
      dispatch(setLastMessage(result?.data?.data));
    }
  };

  const scrollBottomRef = useRef();
  useEffect(() => {
    if (scrollBottomRef.current) {
      scrollBottomRef.current.scrollIntoView({ behavior: "smooth" });
      scrollBottomRef.current.scrollTop = scrollBottomRef.current.scrollHeight;
    }
  }, [chat, messages]);

  // console.log(data);
  return (
    <>
      {isLoading ? (
        <PageLoading />
      ) : (
        <div>
          <div
            className="overflow-y-auto max-h-full flex flex-col justify-between"
            style={{ maxHeight: "500px", height: "500px" }}
          >
            <div></div>
            <div className="flex-grow py-2 gap-6 flex flex-col justify-end w-full">
              {messages.map((message, index) => (
                <SingleMessage key={index} message={message} />
              ))}
              <div ref={scrollBottomRef}></div>
            </div>
          </div>
          <SendMessageBox handleSendMessage={handleSendMessage} />
        </div>
      )}
    </>
  );
};

export default MessageConversationArea;
