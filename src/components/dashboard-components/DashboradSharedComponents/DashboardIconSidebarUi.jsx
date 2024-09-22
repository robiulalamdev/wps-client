import {
  Button,
  Popover,
  PopoverContent,
  PopoverHandler,
} from "@material-tailwind/react";
import { sidebarBottomItems, sidebarItems } from "../../../utils/data/global";
import {
  iDashLogout,
  iDashSideHr,
  iDashSidebarLeft,
  iDashSidebarRight,
  sideLogoCircle,
} from "../../../utils/icons/dashboard-icons/dashicons";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { DefaultProfile } from "../../../lib/data/globalData";
import { setIsOpen } from "../../../redux/features/global/globalSlice";

const DashboardIconSidebarUi = () => {
  const { isOpen } = useSelector((state) => state.global);
  const dispatch = useDispatch();
  const location = useLocation();

  return (
    <>
      <div className="max-w-[80px] min-w-[100px] h-full bg-dash-cm-bg rounded-[10px] pb-[19px] relative">
        <div className="flex flex-col justify-between w-full h-full pl-[13px] pr-[13px] overflow-y-auto">
          <div className="h-fit">
            <div className="flex justify-center items-center mt-[22px]">
              <div>{sideLogoCircle}</div>
            </div>
            <div className="mt-[55px]">
              <div className="grid grid-cols-1 gap-y-[15px] mt-[27px]">
                {sidebarItems.map((item, index) => (
                  <Link to={`${item.path}`} key={index}>
                    <Button
                      className={`flex items-center justify-center normal-case font-lato font-normal text-white text-[15px] tracking-[0] leading-[normal] whitespace-nowrap w-full h-[43px] shadow-none hover:shadow-none outline-none 
                    ${
                      location.pathname === item.path
                        ? "bg-[#FF001F] rounded-[10px]"
                        : "bg-transparent"
                    }
                    `}
                    >
                      <div className="min-h-[30px] min-w-[30px] max-h-[30px] max-w-[30px] flex justify-center items-center">
                        {item.icon}
                      </div>
                    </Button>
                  </Link>
                ))}
              </div>
            </div>

            <div className="mx-auto mt-[25px] flex justify-center">
              {iDashSideHr}
            </div>

            <div className="grid grid-cols-1 gap-y-[15px] mt-[22px] h-fit">
              {sidebarBottomItems.map((item, index) => (
                <Link to={`${item.path}`} key={index}>
                  <Button
                    className={`flex items-center justify-center normal-case font-lato font-normal text-white text-[15px] tracking-[0] leading-[normal] whitespace-nowrap w-full h-[43px] shadow-none hover:shadow-none outline-none 
                    ${
                      location.pathname === item.path
                        ? "bg-[#FF001F] rounded-[10px]"
                        : "bg-transparent"
                    }
                    `}
                  >
                    <div className="min-h-[30px] min-w-[30px] max-h-[30px] max-w-[30px] flex justify-center items-center">
                      {item.icon}
                    </div>
                  </Button>
                </Link>
              ))}
            </div>
          </div>

          <div className="flex justify-center items-center mt-[25px]">
            <Popover placement="right">
              <PopoverHandler>
                <div className="flex items-center gap-x-[10px]  cursor-pointer">
                  <img
                    src={DefaultProfile}
                    alt=""
                    className="size-[37px] rounded-full object-cover"
                  />
                </div>
              </PopoverHandler>
              <PopoverContent className="border-gray-900 shadow flex justify-between items-center bg-dash-cm-bg w-[250px] h-[70px]">
                <div className="flex items-center gap-x-[10px]">
                  <img
                    src={DefaultProfile}
                    alt=""
                    className="size-[37px] rounded-full object-cover"
                  />
                  <div>
                    <h1 className="font-lato text-[13px] font-bold text-white">
                      KRS
                    </h1>
                    <p className="font-lato text-[13px] text-[#6A6A6A]">
                      Administrator
                    </p>
                  </div>
                </div>
                <div>{iDashLogout}</div>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div
          onClick={() => dispatch(setIsOpen(!isOpen))}
          className="absolute top-[50%] bottom-[50%] -right-2.5 text-white w-[25px] h-[25px] border-[1px] flex justify-center items-center border-gray-800 rounded-full bg-black cursor-pointer"
        >
          {isOpen ? iDashSidebarLeft : iDashSidebarRight}
        </div>
      </div>
    </>
  );
};

export default DashboardIconSidebarUi;
