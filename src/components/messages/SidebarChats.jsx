/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import SingleChat from "./SingleChat";
import { Button } from "@material-tailwind/react";
import { useState } from "react";
import { useRemoveChatByIdMutation } from "../../redux/features/conversations/conversationApi";
import { SpinnerCircularFixed } from "spinners-react";
import {
  setChat,
  setMessages,
} from "../../redux/features/conversations/conversationSlice";

const SidebarChats = ({ open, setOpen, refetch }) => {
  const { chats } = useSelector((state) => state.conversation);
  const [isDelete, setIsDelete] = useState(null);

  const [removeChatById, { isLoading }] = useRemoveChatByIdMutation();
  const dispatch = useDispatch();

  const handleDeleteChat = async () => {
    const options = {
      data: {},
      id: isDelete?._id,
    };
    const result = await removeChatById(options);
    if (result?.data?.success) {
      refetch();
    }
    setIsDelete(null);
    dispatch(setChat(null));
    dispatch(setMessages([]));
    setOpen(false);
  };
  return (
    <div className="message-chats-container px-2 py-2">
      {isDelete && (
        <div className="bg-[#000000] rounded-[10px] min-h-[66px] w-full pt-[11px] pb-[11px] px-[8px]">
          <h1 className="text-[13px] font-inter text-white font-medium leading-normal text-center">
            Deleting messages is permanent
          </h1>
          <div className="flex justify-center items-center gap-x-[14px] mt-[7px]">
            <Button
              disabled={isLoading}
              onClick={() => handleDeleteChat()}
              className="w-[75px] h-[24px] rounded-[5px] bg-[#FF0000] p-0 shadow-none hover:shadow-none outline-none normal-case text-[10px] font-semibold leading-normal text-[#FFFFFF] flex items-center justify-center gap-x-[2px]"
            >
              {isLoading && (
                <SpinnerCircularFixed
                  size={14}
                  thickness={180}
                  speed={300}
                  color="rgba(255, 255, 255, 1)"
                  secondaryColor="rgba(255, 255, 255, 0.42)"
                />
              )}{" "}
              Delete
            </Button>
            <Button
              onClick={() => setIsDelete(null)}
              className="w-[75px] h-[24px] rounded-[5px] bg-[#D9D9D9] p-0 shadow-none hover:shadow-none outline-none normal-case text-[10px] font-semibold leading-normal !text-black"
            >
              Close
            </Button>
          </div>
        </div>
      )}

      <div className="overflow-y-auto max-h-full">
        {chats?.map((chat, index) => (
          <SingleChat
            key={index}
            chatData={chat}
            open={open}
            setOpen={setOpen}
            setIsDelete={setIsDelete}
            isDelete={isDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default SidebarChats;
