import { Button } from "@material-tailwind/react";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
  useGetDamMessagesQuery,
  useRemoveDamMessagesMutation,
  useSendDamMessageMutation,
} from "../../../../redux/features/conversations/conversationApi";
import { ROLE_DATA } from "../../../../lib/config";
import useHighlight from "../../../../lib/hooks/useHighlight";
import { AuthContext } from "../../../../contextApi/AuthContext";
import useViewImage from "../../../../lib/hooks/useViewImage";
import { DefaultProfile } from "../../../../lib/data/globalData";

const AdminChat = () => {
  const { viewResizeImg } = useViewImage();
  const { user } = useContext(AuthContext);
  const { highlightUrl } = useHighlight();
  const [meta, setMeta] = useState({ page: 1, total: 0, limit: 75 });
  const { data } = useGetDamMessagesQuery(
    `?page=${meta?.page}&limit=${meta?.limit}`
  );
  const [sendDamMessage] = useSendDamMessageMutation();
  const [removeDamMessages, { isLoading: removeLoading }] =
    useRemoveDamMessagesMutation();
  const [messages, setMessages] = useState([]);
  const [scrollBottom, setScrollBottom] = useState(true);
  const { handleSubmit, register, reset } = useForm();

  const handleSend = async (data) => {
    const options = {
      data: { message: data?.message },
    };
    const result = await sendDamMessage(options);
    if (result?.data?.success) {
      setMessages([...messages, result?.data?.data]);
    }
    reset();
  };

  const handleClear = async () => {
    if (messages.length > 0 && user?.role === ROLE_DATA.ADMIN) {
      const options = {
        data: {},
      };
      const result = await removeDamMessages(options);
      if (result?.data?.success) {
        setMessages([]);
      }
    }
  };

  useMemo(() => {
    if (data?.data?.length) {
      if (meta?.page === 1) {
        setMessages(data?.data);
        setMeta(data?.meta);
      } else {
        setMessages([...data.data, ...messages]);
        setMeta(data?.meta);
      }
    }

    setTimeout(() => {
      setScrollBottom(true);
    }, 1000);

    return () => {
      return;
    };
  }, [data?.data]);

  const scrollBottomRef = useRef();
  useEffect(() => {
    if (scrollBottom) {
      if (scrollBottomRef.current) {
        scrollBottomRef.current.scrollIntoView({ behavior: "smooth" });
        scrollBottomRef.current.scrollTop =
          scrollBottomRef.current.scrollHeight;
      }
    }
  }, [messages]);

  return (
    <div className="min-w-[442px] max-w-[442px] bg-dash-cm-bg rounded-[10px] max-h-screen flex flex-col justify-between h-full !p-[11px_12px_19px_11px]">
      <div className="flex flex-col justify-center items-center gap-[7px]">
        <h1 className="text-white font-bakbak-one text-[15px] text-center">
          Admin / Moderators Chat
        </h1>
        {user?.role === ROLE_DATA.ADMIN && (
          <Button
            disabled={removeLoading}
            onClick={() => handleClear()}
            className={`shadow-none hover:shadow-none outline-none normal-case w-[99px] h-[29px] font-lato text-[12px] font-medium rounded-[5px] flex justify-center items-center p-0 ${
              messages?.length > 0
                ? "bg-[#8FFF00] text-[#000000]"
                : "bg-[#000000] text-white"
            }`}
          >
            {removeLoading ? <span>Removing...</span> : <span>Clear chat</span>}
          </Button>
        )}
      </div>
      <div className="flex-grow h-fit overflow-y-auto scroll_off grid grid-cols-1 gap-[26px] flex flex-col justify-between">
        <div></div>
        <div className="flex-grow py-2 gap-6 flex flex-col justify-end w-full">
          {meta?.page * meta?.limit < meta?.total && (
            <div
              onClick={() => {
                setScrollBottom(false);
                setMeta({ ...meta, page: meta?.page + 1 });
              }}
              className="bg-[#000000] w-[100px] h-[38px] rounded-[75px] mx-auto mt-[27px] md:mt-[40px] flex justify-center items-center font-bakbak-one text-[12px] text-[#CCC] cursor-pointer"
            >
              View more
            </div>
          )}

          {messages?.map((item, index) => (
            <div
              key={index}
              className="bg-[#000000] rounded-[20px] p-[9px_9px_9px_12px] h-fit"
            >
              <div className="flex justify-between items-center w-fit">
                <div className="flex items-center gap-[7px]">
                  <img
                    src={
                      viewResizeImg(
                        item?.user?.profile?.profile_image,
                        37,
                        37
                      ) || DefaultProfile
                    }
                    alt=""
                    className="min-w-[37px] min-h-[37px] max-w-[37px] max-h-[37px] object-cover rounded-full"
                  />
                  <div className="min-w-[85px] max-w-[85px]">
                    <h1 className="text-white font-lato text-[13px] font-bold all_break oneLine">
                      {item?.user?.username}
                    </h1>
                    <p className="text-[#6A6A6A] font-lato text-[13px]">
                      {item?.user?.role === ROLE_DATA.ADMIN && "Administrator"}
                      {item?.user?.role === ROLE_DATA.MOD && "Moderator"}
                    </p>
                  </div>
                </div>
                <div className="w-fit pl-[7px]">
                  <svg
                    width="1"
                    height="44"
                    viewBox="0 0 1 44"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <line
                      x1="0.5"
                      y1="2.18558e-08"
                      x2="0.499998"
                      y2="44"
                      stroke="#373737"
                    />
                  </svg>
                </div>
                <p className="text-white font-lato text-[13px] pl-[13px] all_break">
                  {highlightUrl(item?.message, "text-[#FDF516] cursor-pointer")}
                </p>
              </div>
            </div>
          ))}
          <div ref={scrollBottomRef}></div>
        </div>
      </div>
      <form
        onSubmit={handleSubmit(handleSend)}
        className="flex justify-between items-center gap-[8px] mt-[26px]"
      >
        <input
          {...register("message", { required: true })}
          type="text"
          required
          placeholder="Write a message..."
          className="flex-grow outline-none w-full h-[45px] text-white placeholder:text-[#939393] font-bakbak-one text-[12px] bg-[#000000CC] px-[22px] rounded-[10px]"
        />
        <Button
          type="submit"
          className="font-bakbak-one normal-case shadow-none  hover:shadow-none outline-none text-[12px] text-[#939393] bg-[#000000CC] w-[69px] h-[45px] rounded-[10px] p-0 flex justify-center items-center"
        >
          SEND
        </Button>
      </form>
    </div>
  );
};

export default AdminChat;
