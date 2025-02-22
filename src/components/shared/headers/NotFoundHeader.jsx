import { useContext, useState } from "react";
import { iMenu, iSearch, iSearchClose } from "../../../utils/icons/icons";
import logo from "../../../assets/brand/logo.png";
import HeaderDrawer from "./HeaderDrawer";
import HeaderProfile from "./HeaderProfile";
import { AuthContext } from "../../../contextApi/AuthContext";
import { Button } from "@material-tailwind/react";
import Image from "next/image";
import { useRouter } from "next/router";

const NotFoundHeader = () => {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  return (
    <>
      <div className="lg:flex items-center justify-between w-full gap-x-[20px] my-[23px] hidden lg:inline-block">
        <div className="">
          <Image
            onClick={() => router.push("/")}
            src={logo}
            alt="logo"
            className="w-[85px] h-[56px] object-contain cursor-pointer"
          />
        </div>
        <div className="flex items-center justify-center gap-x-[22px] flex-grow">
          <div className="bg-[#00000033] rounded-[10px] h-[45px] max-w-[771px] w-full flex justify-center items-center pr-[10px]">
            <div className="text-[#5A5A5A] w-[40px] px-[10px] h-full flex justify-center items-center">
              {iSearch}
            </div>
            <input
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  router.push(`/wallpapers?search=${e.target.value}`);
                }
              }}
              type="text"
              placeholder="Find your next wallpaper..."
              className="text-[#5A5A5A] placeholder:text-[#5A5A5A] text-[15px] bg-transparent w-full h-full flex-grow font-lato outline-none border-none"
            />
          </div>
          <Button
            onClick={() => router.push("/")}
            className="bg-[#00000033] w-[80px] h-[45px] rounded-[10px] shadow-none hover:shadow-none text-white normal-case font-normal text-[15px] font-bakbak-one p-0 m-0 flex justify-center items-center"
          >
            Home
          </Button>
        </div>

        {user && <HeaderProfile />}
      </div>

      <div className="lg:hidden my-[23px]">
        {openSearch ? (
          <>
            <div className=" flex justify-center items-center gap-3">
              <input
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    router.push(`/wallpapers?search=${e.target.value}`);
                  }
                }}
                type="text"
                placeholder="Find your next wallpaper..."
                className="text-[#5A5A5A] placeholder:text-[#5A5A5A] text-[12px] leading-[14px] bg-[#00000033] rounded-[8px] h-[34px] max-w-[771px] w-full flex-grow font-lato outline-none border-none px-2 "
              />
              <div
                onClick={() => setOpenSearch(!openSearch)}
                className="text-[#FF4D00] flex justify-center items-center h-full"
              >
                {iSearchClose}
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-between gap-[10px] w-full">
            <div className="flex items-center gap-[10px] w-full">
              <Image
                onClick={() => router.push("/")}
                src={logo}
                alt="logo"
                className="w-[60px] h-[32px] object-contain cursor-pointer"
              />
              <div
                onClick={() => setOpenSearch(!openSearch)}
                className="text-white w-[40px] px-[10px] h-full flex justify-center items-center"
              >
                {iSearch}
              </div>
            </div>
            <div
              onClick={() => setOpen(!open)}
              className="text-white cursor-pointer"
            >
              {iMenu}
            </div>
          </div>
        )}
      </div>

      <HeaderDrawer open={open} close={setOpen} />
    </>
  );
};

export default NotFoundHeader;
