import { useState } from "react";
import SidebarChats from "../../components/messages/SidebarChats";
import MainHeader from "../../components/shared/headers/MainHeader";
import { iLeftArrow } from "../../utils/icons/icons";
import { useSelector } from "react-redux";
import { useMyChatsQuery } from "../../redux/features/conversations/conversationApi";
import MessagesContainer from "../../components/messages/MessagesContainer";
import PrivateRoute from "@/middlewares/PrivateRoute";
import MainLayout from "@/layouts/MainLayout";

const Messages = () => {
  const { isLoading, refetch } = useMyChatsQuery();
  const { chats } = useSelector((state) => state.conversation);
  const [selectedTab, setSelectedTab] = useState(0);
  const [open, setOpen] = useState(false);

  // console.log(chats);
  return (
    <>
      <MainHeader />
      <div className="message-container">
        <h1 className="text-[15px] md:text-[25px] font-bakbak-one text-white text-center mb-[15px] md:mb-[40px]">
          Messages
        </h1>
        {/* <div className="border-t-[1px] border-[#5A5A5A] mb-[24px] md:mb-[62px]"></div> */}
        <div className="mb-[24px] md:mb-[62px]"></div>
        <div className="mb-4 mx-auto md:mx-0" style={{ width: "295px" }}>
          <div className="message-tab-container flex justify-around items-center mx-auto">
            {["Inbox", "Sent"]?.map((t, i) => (
              <button
                onClick={() => setSelectedTab(i)}
                className={`${
                  selectedTab === i
                    ? `message-active-btn ${
                        selectedTab === 1 && "!bg-[#DD2E44]"
                      }`
                    : "message-dactive-btn"
                } `}
                key={i}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
        <div
          onClick={() => setOpen(false)}
          className="msg-left-arrow lg:hidden"
        >
          {iLeftArrow}
        </div>
        <section
          className="flex justify-between h-full"
          style={{ maxHeight: "620px", columnGap: "54px" }}
        >
          <div
            className={`${
              open ? "hidden md:block" : "block"
            } message-sidebar flex flex-col items-center gap-4 w-full md:max-w-[295px]`}
          >
            <SidebarChats open={open} setOpen={setOpen} refetch={refetch} />
          </div>
          <MessagesContainer open={open} setOpen={setOpen} />
        </section>
      </div>
    </>
  );
};

export default PrivateRoute(Messages, MainLayout);
