/* eslint-disable @next/next/no-img-element */
import {
  IconButton,
  SpeedDial,
  SpeedDialContent,
  SpeedDialHandler,
  Tooltip,
} from "@material-tailwind/react";

import {
  IGoToDashboard,
  iHLove,
  iLock,
  iLogout,
  iSetting,
  iUser,
} from "../../../utils/icons/icons";
import { useContext, useState } from "react";
import { AuthContext } from "../../../contextApi/AuthContext";
import useViewImage from "../../../lib/hooks/useViewImage";
import { DefaultProfile } from "../../../lib/data/globalData";
import { useRouter } from "next/router";
import { ROLE_DATA } from "@/lib/config";
const HeaderProfile = () => {
  const { viewResizeImg } = useViewImage();
  const { logout, user } = useContext(AuthContext);
  const router = useRouter();

  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center gap-x-[11px]">
      {(user?.role === ROLE_DATA.ADMIN || user?.role === ROLE_DATA.MOD) && (
        <Tooltip
          content={
            <div>
              <small className="text-[12px] text-center font-normal font-bakbak-one block">
                CTRL + D
              </small>{" "}
              <small className="text-[10px] text-center">
                open to Dashboard
              </small>
            </div>
          }
        >
          <IconButton
            onClick={() => router.push("/dashboard")}
            className="w-[37px] h-[34px] p-0 bg-[#00000033] text-white hover:text-[#FF001F] rounded-[5px]"
          >
            {IGoToDashboard}
          </IconButton>
        </Tooltip>
      )}

      <div onMouseLeave={() => setOpen(false)}>
        <SpeedDial placement="left" open={open}>
          <SpeedDialHandler onMouseEnter={() => setOpen(true)}>
            <div
              className={`rounded-full cursor-pointer w-[62px] h-[62px] flex justify-center items-center  backdrop-blur-lg ${
                open ? "bg-[#00000050] rounded-l-none" : "bg-[#00000033]"
              }`}
            >
              <img
                src={
                  viewResizeImg(user?.profile?.profile_image, 55, 55) ||
                  DefaultProfile.src
                }
                alt="profile"
                className="w-[50px] h-[50px] rounded-full object-cover"
              />
            </div>
          </SpeedDialHandler>
          {open && (
            <SpeedDialContent
              onMouseEnter={() => setOpen(true)}
              className={`w-[275px] h-[62px] backdrop-blur-lg rounded-[100px] rounded-r-none ml-[5px] flex flex-row justify-start items-center gap-x-[10px] pl-[25px] ${
                open ? "bg-[#00000050]" : "bg-[#00000033]"
              }`}
            >
              <IconButton
                onClick={() => logout()}
                className="p-0 rounded-full bg-transparent hover:bg-black"
              >
                {iLogout}
              </IconButton>
              <IconButton
                onClick={() => router.push("/account-settings")}
                className="p-0 rounded-full bg-transparent hover:bg-black"
              >
                {iSetting}
              </IconButton>
              <IconButton
                onClick={() => router.push("/vault")}
                className="p-0 rounded-full bg-transparent hover:bg-black"
              >
                {iLock}
              </IconButton>
              <IconButton
                onClick={() => router.push("/media-center/favorites")}
                className="p-0 rounded-full bg-transparent hover:bg-black"
              >
                {iHLove}
              </IconButton>
              <IconButton
                onClick={() => router.push("/my-profile")}
                className="p-0 rounded-full bg-transparent hover:bg-black"
              >
                {iUser}
              </IconButton>
            </SpeedDialContent>
          )}
        </SpeedDial>
      </div>
    </div>
  );
};

export default HeaderProfile;
