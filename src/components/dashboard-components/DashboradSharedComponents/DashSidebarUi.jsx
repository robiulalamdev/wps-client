import { Button, IconButton, Tooltip } from "@material-tailwind/react";
import { sidebarBottomItems, sidebarItems } from "../../../utils/data/global";
import {
  iDashLogout,
  iDashSideHr,
  sideLogoCircle,
} from "../../../utils/icons/dashboard-icons/dashicons";
import { useSelector } from "react-redux";
import { DefaultProfile } from "../../../lib/data/globalData";
import { useContext } from "react";
import { AuthContext } from "../../../contextApi/AuthContext";
import { ROLE_DATA } from "../../../lib/config";
import useViewImage from "../../../lib/hooks/useViewImage";
import { useRouter } from "next/router";
import Link from "next/link";
import { IHome } from "@/utils/icons/icons";

const DashSidebarUi = () => {
  const { user, logout } = useContext(AuthContext);
  const { viewResizeImg } = useViewImage();
  const { isOpen } = useSelector((state) => state.global);
  const { totalReports } = useSelector((state) => state.report);
  const { totalRequests } = useSelector((state) => state.verification);
  const router = useRouter();

  return (
    <>
      <div className="max-w-[285px] min-w-[285px] h-full bg-dash-cm-bg rounded-[10px] pb-[19px] relative">
        <div className="flex flex-col justify-between w-full h-full pl-[20px] pr-[13px] overflow-y-auto">
          <div className="h-fit">
            <div className="flex items-center gap-x-[31px] mt-[22px]">
              <Tooltip
                content={
                  <div>
                    <small className="text-[10px] text-center font-lato font-bold block">
                      CTRL + H
                    </small>{" "}
                    {/* <small className="text-[10px] text-center">
                      open to Home
                    </small> */}
                  </div>
                }
              >
                <IconButton
                  onClick={() => router.push("/")}
                  className="w-[26px] h-[26px] bg-transparent hover:bg-[#262626] text-white rounded-[5px] p-0"
                >
                  {IHome}
                </IconButton>
              </Tooltip>
              <div className="flex justify-center items-center gap-x-[8px]">
                <h1 className="font-bakbak-one font-normal text-white text-[15px] tracking-[0] leading-[normal]">
                  WPS / TASE
                </h1>
                <div>{sideLogoCircle}</div>
              </div>
            </div>
            <div className="mt-[55px]">
              <h1 className="font-lato font-extrabold text-white text-[15px] tracking-[0] leading-[normal] whitespace-nowrap">
                Main Menu
              </h1>

              <div className="grid grid-cols-1 gap-y-[15px] mt-[27px]">
                {sidebarItems.map((item, index) => (
                  <Link href={`${item.path}`} key={index}>
                    <Button
                      className={`flex items-center gap-x-[8px] normal-case font-lato font-normal text-white text-[15px] tracking-[0] leading-[normal] whitespace-nowrap w-full h-[43px] pl-[12px] shadow-none hover:shadow-none outline-none 
                    ${
                      router.pathname === item.path
                        ? "bg-[#FF001F] rounded-[10px]"
                        : "bg-transparent"
                    }
                    `}
                    >
                      <div className="min-h-[30px] min-w-[30px] max-h-[30px] max-w-[30px] flex justify-center items-center">
                        {item.icon}
                      </div>{" "}
                      <span>{item.name}</span>
                    </Button>
                  </Link>
                ))}
              </div>
            </div>

            <div className="mx-auto mt-[25px] flex justify-center">
              {iDashSideHr}
            </div>
            <h1 className="font-lato font-extrabold text-white text-[15px] tracking-[0] leading-[normal] whitespace-nowrap mt-[16px]">
              Reports & Requests Center
            </h1>

            <div className="grid grid-cols-1 gap-y-[15px] mt-[22px] h-fit">
              {sidebarBottomItems.map((item, index) => (
                <Link href={`${item.path}`} key={index}>
                  <Button
                    className={`flex items-center gap-x-[8px] normal-case font-lato font-normal text-white text-[15px] tracking-[0] leading-[normal] whitespace-nowrap w-full h-[43px] pl-[12px] shadow-none hover:shadow-none outline-none 
                    ${
                      router.pathname === item.path
                        ? "bg-[#FF001F] rounded-[10px]"
                        : "bg-transparent"
                    }
                    `}
                  >
                    <div className="min-h-[30px] min-w-[30px] max-h-[30px] max-w-[30px] flex justify-center items-center">
                      {item.icon}
                    </div>{" "}
                    <span>{item.name}</span>
                    {router.pathname !== item.path && (
                      <>
                        {item?.name === "Claims / Reports" &&
                          totalReports > 0 && (
                            <div className="min-w-[41px] max-w-[41px] h-[19px] rounded-[20px] backdrop:blur-[1px] flex justify-center items-center text-white font-lato text-[11px] font-medium ml-[2px] bg-[#F00]">
                              {totalReports}
                            </div>
                          )}
                        {item?.name === "Verification Requests" &&
                          totalRequests > 0 && (
                            <div className="min-w-[41px] max-w-[41px] h-[19px] rounded-[20px] backdrop:blur-[1px] flex justify-center items-center text-white font-lato text-[11px] font-medium ml-[2px] bg-[#F00]">
                              {totalRequests}
                            </div>
                          )}
                      </>
                    )}
                  </Button>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h1 className="font-lato font-medium text-white text-[15px] tracking-[0] leading-[normal] whitespace-nowrap mt-[16px]">
              Welcome back
            </h1>
            <div className="flex justify-between items-center mt-[25px]">
              <div className="flex items-center gap-x-[10px]">
                <img
                  src={
                    viewResizeImg(user?.profile?.profile_image, 37, 37) ||
                    DefaultProfile.src
                  }
                  alt=""
                  className="size-[37px] rounded-full object-cover"
                />
                <div>
                  <h1 className="font-lato text-[13px] font-bold text-white">
                    {user?.username}
                  </h1>
                  <p className="font-lato text-[13px] text-[#6A6A6A]">
                    {user?.role === ROLE_DATA.ADMIN && "Administrator"}
                    {user?.role === ROLE_DATA.MOD && "Moderator"}
                  </p>
                </div>
              </div>
              <div
                onClick={() => logout()}
                className="cursor-pointer hover:scale-125 duration-200 ease-in"
              >
                {iDashLogout}
              </div>
            </div>
          </div>
        </div>

        {/* <div
          onClick={() => dispatch(setIsOpen(!isOpen))}
          className="absolute top-[50%] bottom-[50%] -right-2.5 text-white w-[25px] h-[25px] border-[1px] flex justify-center items-center border-gray-800 rounded-full bg-black cursor-pointer"
        >
          {isOpen ? iDashSidebarLeft : iDashSidebarRight}
        </div> */}
      </div>
    </>
  );
};

export default DashSidebarUi;
