import { iMenu, iSearch, iSearchClose } from "../../../utils/icons/icons";
import logo from "../../../assets/brand/logo.png";
import HeaderDrawer from "./HeaderDrawer";
import HeaderAU from "./HeaderAU";
import HeaderProfile from "./HeaderProfile";
import SearchPopover from "../../common/search/SearchPopover";
import { makeQuery } from "../../../lib/services/service";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { AuthContext } from "@/contextApi/AuthContext";
import Image from "next/image";

const MainHeader = () => {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const query = router.query;

  const search = query?.search;
  const tn = query?.tn || "Trending";
  const type = query?.type;
  const classification = query?.classification;
  const height = query?.height;
  const width = query?.width;
  const screen_type = query?.screen_type;
  const sort_by = query?.sort_by;
  const date = query?.date;
  const tag = query?.tag;
  const name = query?.name;

  const queryObject = {
    search: search || "",
    tn: tn || "Trending",
    type: type || "",
    classification: classification || "",
    width: width || "",
    height: height || "",
    screen_type: screen_type || "",
    sort_by: sort_by || "",
    date: date || "",
    tag: tag || "",
    name: name || "",
  };

  const handleQuery = async (name, value, isDelete = false) => {
    if (name === "dimensions") {
      const query = await makeQuery(
        "",
        "",
        {
          ...queryObject,
          width: value.width,
          height: value.height,
        },
        true, // isDimensions
        isDelete
      );
      window.location.replace(`/wallpapers?${query}`);
    } else {
      const query = await makeQuery(name, value, queryObject, isDelete);
      window.location.replace(`/wallpapers?${query}`);
    }
  };

  return (
    <>
      <div className="lg:flex items-center justify-between w-full gap-x-[20px] my-[23px] hidden lg:inline-block">
        <div className="flex items-center gap-x-[4px] md:gap-x-[20px] flex-grow">
          <Image
            onClick={() => router.push("/")}
            src={logo}
            alt="logo"
            className="w-[85px] h-[56px] object-contain cursor-pointer"
          />
          <SearchPopover
            handleQuery={handleQuery}
            placement="bottom"
            handler={
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
            }
          ></SearchPopover>

          <HeaderAU />
        </div>

        {user && <HeaderProfile />}
      </div>

      <div className="lg:hidden my-[23px]">
        {openSearch ? (
          <SearchPopover
            handleQuery={handleQuery}
            placement="bottom"
            handler={
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
            }
          />
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

export default MainHeader;
