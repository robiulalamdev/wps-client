/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { iSend } from "../../utils/icons/icons";
import { useForm } from "react-hook-form";

const SendMessageBox = ({ handleSendMessage }) => {
  const { handleSubmit, register, reset } = useForm();

  const handleMessage = async (data) => {
    handleSendMessage(data);
    reset();
  };
  return (
    <>
      <form
        onSubmit={handleSubmit(handleMessage)}
        className="send-message-box flex justify-between items-center gap-3"
      >
        <div className="flex-grow w-full relative">
          <input
            {...register("message", { required: true })}
            className="px-4 w-full outline-none hover:outline-none focus:border border-[#2924FF]"
            type="text"
            placeholder="Write a message..."
          />
          <button
            type="submit"
            className="absolute block lg:hidden"
            style={{ right: "20px", top: "10px" }}
          >
            {iSend}
          </button>
        </div>
        <button type="submit" className="hidden lg:block submit_button">
          SEND
        </button>
      </form>
    </>
  );
};

export default SendMessageBox;
