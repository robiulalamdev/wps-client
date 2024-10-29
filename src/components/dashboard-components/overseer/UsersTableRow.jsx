/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  Popover,
  PopoverContent,
  PopoverHandler,
  Tooltip,
} from "@material-tailwind/react";
import {
  iDashHrThreeDots,
  iDashSelected,
  iDashUnselected,
} from "../../../utils/icons/dashboard-icons/dashicons";
import { useContext, useState } from "react";
import UserDetailsInfoModal from "./user-details-info/UserDetailsInfoModal";
import UserChangePasswordModal from "./UserChangePasswordModal";
import UserAccountDeletionModal from "./UserAccountDeletionModal";
import useViewImage from "../../../lib/hooks/useViewImage";
import moment from "moment";
import { SocketContext } from "../../../contextApi/SocketContext";
import detailsButton from "../../../assets/icons/global/details.png";
import Image from "next/image";
import { useRouter } from "next/router";
import { I_CopyButton, I_CopyTick } from "@/utils/icons/icons";
import { toast } from "react-toastify";

const UsersTableRow = ({
  data,
  selectedItems,
  handleSelect,
  handleRemoveUsers,
}) => {
  const { viewResizeImg } = useViewImage();
  const [openInfoModal, setOpenInfoModal] = useState(null);
  const [openPassModal, setOpenPassModal] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(null);
  const [open, setOpen] = useState(false);
  const isExist = selectedItems.some((item) => item?._id === data?._id);
  const { socketUsers } = useContext(SocketContext);

  const isActive = socketUsers.has(data?._id);

  const [copied, setCopied] = useState(false);

  const router = useRouter();

  const handleGotoProfile = async (userInfo) => {
    if (userInfo?.slug) {
      router.push(`/profiles/${userInfo?.slug}`);
    }
    setOpen(false);
  };

  const copyTextToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };

  return (
    <>
      <div className="w-full h-fit flex items-center mt-[23px]">
        <div className="text-white font-lato text-[15px] max-w-[50px]">
          <div
            onClick={() => handleSelect(data)}
            className="min-w-[50px] max-w-[50px] flex justify-center items-center cursor-pointer"
          >
            {isExist ? iDashSelected : iDashUnselected}
          </div>
        </div>

        <div className="text-white font-lato text-[15px] oneLine min-w-[170px] max-w-[170px] ml-[37px]">
          {data?.username}
        </div>
        <div className="text-[#8F8F8F] font-lato text-[15px] oneLine text-nowrap min-w-[190px] max-w-[190px] ml-[55px]">
          {data?.email}
        </div>
        <div className="text-[#8F8F8F] font-lato text-[15px] text-nowrap min-w-[75px] max-w-[75px] ml-[55px]">
          <h1
            className={`font-bold  font-lato text-[15px] ${
              (data?.role === "Admin" && "text-[#80FF00]") ||
              (data?.role === "Mod" && "text-[#7000FF]") ||
              (data?.role === "Brand" && "text-[#FF5C00]") ||
              (data?.role === "Brand" && "text-orange-600") ||
              (data?.role === "User" && "text-[#FFFFFF]")
            }`}
          >
            {data?.role}
          </h1>
        </div>
        <div className="text-[#8F8F8F] font-lato text-[15px] text-nowrap min-w-[80px] max-w-[80px] ml-[55px]">
          {data?.status}
        </div>
        <div className="text-[#8F8F8F] font-lato text-[15px] text-nowrap min-w-[90px] max-w-[90px] ml-[55px]">
          {data?.verified ? "Verified" : "Non-Verified"}
        </div>
        <div className="text-[#8F8F8F] font-lato text-[15px] text-nowrap min-w-[85px] max-w-[85px] ml-[55px]">
          0 Reports
        </div>
        <div className="text-[#8F8F8F] font-lato text-[15px] text-nowrap min-w-[120px] max-w-[120px] ml-[55px]">
          <div className="flex items-center gap-[5px] group transition-all duration-150 ease-in">
            {data?.profile?.flag && (
              <img
                src={viewResizeImg(data?.profile?.flag?.toLowerCase(), 16, 12)}
                alt=""
                className="w-[16px] h-[12px]"
              />
            )}
            {data?.profile?.country && (
              <h1 className="group-hover:hidden transition-all duration-150 ease-in">
                <span className="oneLine text-[15px] text-[#8F8F8F] font-lato font-medium leading-normal">
                  {data?.profile?.country}
                </span>
              </h1>
            )}
            {data?.profile?.ip && (
              <div className="hidden group-hover:inline-block w-fit group-hover:flex items-center gap-x-[8px] overflow-hidden transition-all duration-150 ease-in">
                <h1 className="oneLine text-[15px] text-[#8F8F8F] font-lato font-medium leading-normal">
                  {data?.profile?.ip}
                </h1>
                {copied ? (
                  <Tooltip content="Copied">
                    <button
                      onClick={() => copyTextToClipboard(data?.profile?.ip)}
                      className="text-green-500 w-[14px] h-[14px] flex justify-center items-center"
                    >
                      {I_CopyTick}
                    </button>
                  </Tooltip>
                ) : (
                  <Tooltip content="Copy">
                    <button
                      onClick={() => copyTextToClipboard(data?.profile?.ip)}
                      className="w-[14px] h-[14px] flex justify-center items-center"
                    >
                      {I_CopyButton}
                    </button>
                  </Tooltip>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="text-[#8F8F8F] font-lato text-[15px] text-nowrap min-w-[260px] max-w-[260px] ml-[55px]">
          <div className="flex justify-between items-center">
            {isActive ? (
              <h1 className="text-[#80FF00] font-lato text-[15px] font-medium leading-normal">
                Online
              </h1>
            ) : (
              <h1 className="text-[#8F8F8F] font-lato text-[15px] font-medium leading-normal">
                {data?.lastActive ? moment(data?.lastActive).fromNow() : ""}
              </h1>
            )}
            <div className="pr-[3px]">
              <Popover
                handler={() => setOpen(false)}
                open={open}
                placement="left-start"
              >
                <PopoverHandler
                  onClick={() => setOpen(true)}
                  className="cursor-pointer group"
                >
                  <div>
                    <Image
                      src={detailsButton}
                      alt=""
                      width={35}
                      height={35}
                      className="group-hover:block hidden"
                    />
                    <div className="group-hover:hidden min-w-[35px] max-w-[35px] min-h-[35px] max-h-[35px] flex justify-center items-center">
                      {iDashHrThreeDots}
                    </div>
                  </div>
                </PopoverHandler>
                <PopoverContent className="z-50 w-[176px] h-[140px] rounded-[5px] bg-[#D9D9D9] border-none shadow-none pt-[10px] px-[12px] pb-[10px] flex flex-col justify-between items-start">
                  <h1
                    onClick={() => {
                      setOpenInfoModal(data);
                      setOpen(false);
                    }}
                    className="text-[15px] font-lato font-medium text-[#373737] hover:font-semibold transition-all duration-150 ease-in text-nowrap leading-normal cursor-pointer"
                  >
                    Detailed Information
                  </h1>
                  <h1
                    onClick={() => handleGotoProfile(data)}
                    className="text-[15px] font-lato font-medium text-[#373737] hover:font-semibold transition-all duration-150 ease-in text-nowrap leading-normal cursor-pointer"
                  >
                    Go to Profile
                  </h1>
                  <h1
                    onClick={() => {
                      setOpenPassModal(data);
                      setOpen(false);
                    }}
                    className="text-[15px] font-lato font-medium text-[#373737] hover:font-semibold transition-all duration-150 ease-in text-nowrap leading-normal cursor-pointer"
                  >
                    Change Password
                  </h1>
                  <h1
                    onClick={() => {
                      setOpenDeleteModal(data);
                      setOpen(false);
                    }}
                    className="text-[15px] font-lato font-medium text-[#373737] hover:font-semibold transition-all duration-150 ease-in text-nowrap leading-normal cursor-pointer"
                  >
                    Delete User
                  </h1>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
      </div>
      <UserDetailsInfoModal
        open={openInfoModal}
        onClose={() => setOpenInfoModal(null)}
      />
      <UserChangePasswordModal
        open={openPassModal}
        onClose={() => setOpenPassModal(null)}
      />
      <UserAccountDeletionModal
        open={openDeleteModal}
        handleRemoveUsers={handleRemoveUsers}
        onClose={() => setOpenDeleteModal(null)}
      />
    </>
  );
};

export default UsersTableRow;
