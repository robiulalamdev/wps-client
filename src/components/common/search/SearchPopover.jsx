/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import LazyWallpaper from "../wallpaper/LazyWallpaper";
import { useGetPopularTagsQuery } from "../../../redux/features/wallpapers/wallpapersApi";
import { useGetPublicBrandFeaturedQuery } from "../../../redux/features/featured/featuredApi";
import {
  Button,
  Popover,
  PopoverContent,
  PopoverHandler,
} from "@material-tailwind/react";
import { iPopularHr1, iPopularHr2 } from "../../../utils/icons/icons";
import { useRouter } from "next/router";

const SearchPopover = ({
  handler = () => {},
  handleQuery,
  placement = "bottom",
}) => {
  const { data } = useGetPopularTagsQuery();
  const { data: official_brands } = useGetPublicBrandFeaturedQuery();
  const router = useRouter();
  const { tag, name } = router.query;

  // const tags = searchParams.get("tags");
  const [open, setOpen] = useState(false);

  return (
    <Popover placement={placement}>
      <PopoverHandler>{handler}</PopoverHandler>
      <PopoverContent className="px-[18px] py-[15px] m-0 border-[1px] border-[#2F2F2F] rounded-[10px] shadow-none max-w-[771px] w-full bg-[#00000059] backdrop-blur h-fit">
        <div>
          <div className="flex items-center gap-x-[17px] mb-[10px] cursor-pointer">
            <h1
              onClick={() => setOpen(false)}
              className={`font-bold font-lato text-[15px] ${
                open ? "text-[#8D8D8D]" : "text-[#EBEBEB]"
              }`}
            >
              Popular
            </h1>
            <h1
              onClick={() => setOpen(true)}
              className={`font-bold font-lato text-[15px] ${
                open ? "text-[#EBEBEB]" : "text-[#8D8D8D]"
              }`}
            >
              Featured Official Brands
            </h1>
          </div>
          {open ? iPopularHr2 : iPopularHr1}
        </div>

        {!open && (
          <div className="flex flex-wrap gap-x-[8px] gap-y-[8px] mt-[26px]">
            {data?.data?.map((tagName, index) => (
              <Button
                onClick={() => handleQuery("tag", tagName)}
                type="button"
                key={index}
                className={`outline-none shadow-none hover:shadow-none px-[16px] h-[30px] rounded-[5px] font-normal normal-case text-[#FFF] font-lato text-[13px] flex justify-center items-center
                  ${tag === tagName ? "bg-blue-600" : "bg-[#00000066]"}
                  `}
              >
                {tagName}
              </Button>
            ))}
          </div>
        )}

        {open && official_brands?.data?.length > 0 && (
          <>
            <div className="grid grid-cols-3 md:grid-cols-5 gap-x-[6px] md:gap-x-[12px] gap-y-[9px] md:gap-y-[23px] mt-[17px]">
              {official_brands?.data?.slice(0, 10).map((item, index) => (
                <div key={index} className={``}>
                  <div
                    onClick={() => handleQuery("name", item?.username)}
                    className={`w-full h-[50px] md:h-[60px] rounded-[3px] md:rounded-[5px] overflow-hidden relative`}
                  >
                    <LazyWallpaper
                      src={item?.banner}
                      alt={item?.banner}
                      maxWidth={140}
                      maxHeight={60}
                      width={140}
                      height={60}
                      className="w-full h-full rounded-[3px] md:rounded-[5px] object-cover hover:scale-110 duration-300 cursor-pointer"
                    />
                  </div>
                  <h1
                    onClick={() => handleQuery("name", item?.username)}
                    className={`font-bold font-lato text-[8px] md:text-[12px] mt-[3px] md:mt-[6px] text-center cursor-pointer ${
                      item.username === name
                        ? "text-[#FDF516]"
                        : "text-white hover:text-[#FDF516]"
                    }`}
                  >
                    {item.name}
                  </h1>
                </div>
              ))}
            </div>
            <h1
              onClick={() => router.push("/official-brands")}
              className="text-center font-bold font-lato text-[15px] mt-[22px] mb-[18px] text-white cursor-pointer"
            >
              See all brands
            </h1>
          </>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default SearchPopover;
