/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { useContext } from "react";
import { AuthContext } from "../../contextApi/AuthContext";
import useViewImage from "../../lib/hooks/useViewImage";
import profile from "../../assets/images/global/header/profile.png";

const SingleMessage = ({ message }) => {
  const { viewResizeImg } = useViewImage();
  const { user } = useContext(AuthContext);
  const { chat } = useSelector((state) => state.conversation);
  return (
    <>
      {message?.senderId === user?._id ? (
        <div className="single-msg-container">
          <img
            src={
              viewResizeImg(user?.profile?.profile_image, 50, 50) || profile.src
            }
            alt=""
          />
          <div className="single-msg-dark">
            <p className="all_break">{message?.message}</p>
          </div>
        </div>
      ) : (
        <div className="single-msg-container">
          {chat?.receiverInfo?.profile_image ? (
            <img
              className="min-w-[50px] max-w-[50px] min-h-[50px] max-h-[50px]"
              src={viewResizeImg(chat?.receiverInfo?.profile_image, 50, 50)}
              alt=""
            />
          ) : (
            <div className="min-w-[50px] max-w-[50px] min-h-[50px] max-h-[50px] rounded-full object-cover flex justify-center items-center bg-[#0000004D] border border-[#78757553]">
              <h1 className="text-white font-bakbak-one text-sm uppercase">
                {chat?.receiverInfo?.username?.slice(0, 2)}
              </h1>
            </div>
          )}

          <div className="single-msg">
            <p className="all_break">{message?.message}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default SingleMessage;
