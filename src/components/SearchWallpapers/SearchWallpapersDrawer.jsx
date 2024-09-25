/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  Button,
  Drawer,
  Popover,
  PopoverContent,
  PopoverHandler,
} from "@material-tailwind/react";
import React, { useState } from "react";
import {
  iBack,
  iDesktop,
  iDropdown,
  iHandhelds,
  iOther,
  iPhone,
  iTablet,
} from "../../utils/icons/icons";
import { resolutions } from "../../utils/data/data";
import { useRouter } from "next/router";

const tabs2 = ["All", "Illustration", "Photography", "AI"];

const SearchWallpapersDrawer = ({ open, setOpen, tab2, tab3, handleQuery }) => {
  const [dimensions, setDimensions] = useState({ width: null, height: null });
  const router = useRouter();

  const height = router?.query?.height;
  const width = router?.query?.width;
  const screen_type = router?.query?.screen_type;
  const sort_by = router?.query?.sort_by;
  const date = router?.query?.date;

  return (
    <>
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        size={361}
        className="p-0"
      >
        <div className="bg-[#121212] w-full h-full">
          <div className="flex justify-end items-center gap-x-[57px] pt-[18px] pr-[25px]">
            <h1 className="text-[#FFF] text-[20px] font-lato font-bold">
              Wallpapers Settings
            </h1>
            <div onClick={() => setOpen(false)} className="cursor-pointer">
              {iBack}
            </div>
          </div>
          <div className="px-[12px]">
            <div className="bg-[#313131] rounded-[100px] h-[42px] w-full max-w-[327px] flex items-center justify-between px-2 mt-[38px] mx-auto">
              {tabs2.map((t, i) => (
                <Button
                  onClick={() => handleQuery("type", t)}
                  key={i}
                  className={`hover:shadow-none shadow-none p-0 m-0 normal-case font-lato text-[12px] leading-[14.4px] font-semibold min-w-[65px] px-2 h-[32px] ${
                    tab2.toLowerCase() === t.toLowerCase()
                      ? "bg-[#000000B2] !text-white rounded-[100px]"
                      : "bg-transparent !text-[#FFF]"
                  }`}
                >
                  {t}
                </Button>
              ))}
            </div>

            <div className="bg-[#313131] rounded-[100px] h-[42px] max-w-[166px] flex justify-between items-center px-[4px] mt-[49px] mx-auto">
              {["SFW", "NSFW"].map((t, i) => (
                <Button
                  onClick={() => handleQuery("classification", t)}
                  key={i}
                  className={`hover:shadow-none shadow-none p-0 m-0 normal-case font-lato text-[12px] leading-[14.4px] font-bold w-[69px] h-[32px] ${
                    tab3.toLowerCase() === t.toLowerCase()
                      ? `${
                          tab3 === "SFW" ? "bg-[#0AB745]" : "bg-[#FF0F00]"
                        } !text-white rounded-[100px] md:rounded-[23.5px]`
                      : "bg-transparent !text-[#FFF]"
                  }`}
                >
                  {t}
                </Button>
              ))}
            </div>

            <div className="!relative mt-[51px] flex justify-center items-center flex-wrap gap-x-[20px] gap-y-[39px] max-w-[256px] mx-auto">
              <Popover placement="bottom">
                <PopoverHandler>
                  <Button className="shadow-none hover:shadow-none normal-case min-w-[109px] max-w-[109px] h-[42px] bg-[#313131] rounded-[100px] text-[12px] font-lato font-semibold text-[#FFF] flex justify-center items-center !p-0">
                    Resolution{" "}
                    <div className="min-w-[24px] min-h-[24px]">{iDropdown}</div>
                  </Button>
                </PopoverHandler>
                <PopoverContent className="bg-transparent border-none shadow-none p-0 !z-[99999999] w-full max-w-[361px] backdrop-blur-[25px]">
                  <div
                    className="px-[19px] pt-[17px] pb-[10px] rounded-[10px] max-w-[322px] mx-auto"
                    style={{
                      backgroundColor: "#00000080",
                    }}
                  >
                    <div className="grid grid-cols-3 gap-x-[14px] w-fit mx-auto cursor-pointer">
                      <div>
                        <div className="h-fit">
                          <div className="w-[83px] h-[29px] flex justify-center items-center">
                            <h1 className="font-lato text-[12px] text-[#FDF516] font-medium">
                              {resolutions.resolutions1.name}
                            </h1>
                          </div>

                          <div className="grid grid-cols-1 gap-y-[16px] h-fit mt-[5px]">
                            {resolutions.resolutions1.items.map((item, i) => (
                              <div
                                onClick={() => {
                                  item.width === parseInt(width) &&
                                  item.height === parseInt(height)
                                    ? handleQuery(
                                        "dimensions",
                                        {
                                          width: null,
                                          height: null,
                                        },
                                        true
                                      )
                                    : handleQuery("dimensions", {
                                        width: item.width,
                                        height: item.height,
                                      });
                                }}
                                key={i}
                                className={`w-[83px] h-[29px] flex justify-center items-center  ${
                                  item.width === parseInt(width) &&
                                  item.height === parseInt(height)
                                    ? "bg-green-600"
                                    : "bg-[#00000066]"
                                } rounded-[5px]`}
                              >
                                <h1 className="font-lato text-[12px] text-[#FFF] font-medium">
                                  {item.width} × {item.height}
                                </h1>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="h-fit">
                          <div className="w-[83px] h-[29px] flex justify-center items-center">
                            <h1 className="font-lato text-[12px] text-[#FDF516] font-medium">
                              {resolutions.resolutions4.name}
                            </h1>
                          </div>

                          <div className="grid grid-cols-1 gap-y-[16px] h-fit mt-[5px]">
                            {resolutions.resolutions4.items.map((item, i) => (
                              <div
                                onClick={() => {
                                  item.width === parseInt(width) &&
                                  item.height === parseInt(height)
                                    ? handleQuery(
                                        "dimensions",
                                        {
                                          width: null,
                                          height: null,
                                        },
                                        true
                                      )
                                    : handleQuery("dimensions", {
                                        width: item.width,
                                        height: item.height,
                                      });
                                }}
                                key={i}
                                className={`w-[83px] h-[29px] flex justify-center items-center  ${
                                  item.width === parseInt(width) &&
                                  item.height === parseInt(height)
                                    ? "bg-green-600"
                                    : "bg-[#00000066]"
                                } rounded-[5px]`}
                              >
                                <h1 className="font-lato text-[12px] text-[#FFF] font-medium">
                                  {item.width} × {item.height}
                                </h1>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="h-fit">
                          <div className="w-[83px] h-[29px] flex justify-center items-center">
                            <h1 className="font-lato text-[12px] text-[#FDF516] font-medium">
                              {resolutions.resolutions2.name}
                            </h1>
                          </div>

                          <div className="grid grid-cols-1 gap-y-[16px] h-fit mt-[5px]">
                            {resolutions.resolutions2.items.map((item, i) => (
                              <div
                                onClick={() => {
                                  item.width === parseInt(width) &&
                                  item.height === parseInt(height)
                                    ? handleQuery(
                                        "dimensions",
                                        {
                                          width: null,
                                          height: null,
                                        },
                                        true
                                      )
                                    : handleQuery("dimensions", {
                                        width: item.width,
                                        height: item.height,
                                      });
                                }}
                                key={i}
                                className={`w-[83px] h-[29px] flex justify-center items-center  ${
                                  item.width === parseInt(width) &&
                                  item.height === parseInt(height)
                                    ? "bg-green-600"
                                    : "bg-[#00000066]"
                                } rounded-[5px]`}
                              >
                                <h1 className="font-lato text-[12px] text-[#FFF] font-medium">
                                  {item.width} × {item.height}
                                </h1>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="h-fit">
                          <div className="w-[83px] h-[29px] flex justify-center items-center">
                            <h1 className="font-lato text-[12px] text-[#FDF516] font-medium">
                              {resolutions.resolutions3.name}
                            </h1>
                          </div>

                          <div className="grid grid-cols-1 gap-y-[16px] h-fit mt-[5px]">
                            {resolutions.resolutions3.items.map((item, i) => (
                              <div
                                onClick={() => {
                                  item.width === parseInt(width) &&
                                  item.height === parseInt(height)
                                    ? handleQuery(
                                        "dimensions",
                                        {
                                          width: null,
                                          height: null,
                                        },
                                        true
                                      )
                                    : handleQuery("dimensions", {
                                        width: item.width,
                                        height: item.height,
                                      });
                                }}
                                key={i}
                                className={`w-[83px] h-[29px] flex justify-center items-center  ${
                                  item.width === parseInt(width) &&
                                  item.height === parseInt(height)
                                    ? "bg-green-600"
                                    : "bg-[#00000066]"
                                } rounded-[5px]`}
                              >
                                <h1 className="font-lato text-[12px] text-[#FFF] font-medium">
                                  {item.width} × {item.height}
                                </h1>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="h-fit">
                        <div className="w-[83px] h-[29px] flex justify-center items-center">
                          <h1 className="font-lato text-[12px] text-[#FDF516] font-medium">
                            {resolutions.resolutions5.name}
                          </h1>
                        </div>

                        <div className="grid grid-cols-1 gap-y-[16px] h-fit mt-[5px]">
                          {resolutions.resolutions5.items.map((item, i) => (
                            <div
                              onClick={() => {
                                item.width === parseInt(width) &&
                                item.height === parseInt(height)
                                  ? handleQuery(
                                      "dimensions",
                                      {
                                        width: null,
                                        height: null,
                                      },
                                      true
                                    )
                                  : handleQuery("dimensions", {
                                      width: item.width,
                                      height: item.height,
                                    });
                              }}
                              key={i}
                              className={`w-[83px] h-[29px] flex justify-center items-center  ${
                                item.width === parseInt(width) &&
                                item.height === parseInt(height)
                                  ? "bg-green-600"
                                  : "bg-[#00000066]"
                              } rounded-[5px]`}
                            >
                              <h1 className="font-lato text-[12px] text-[#FFF] font-medium">
                                {item.width} × {item.height}
                              </h1>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>

              <Popover placement="bottom-end">
                <PopoverHandler>
                  <Button className="shadow-none hover:shadow-none normal-case min-w-[109px] max-w-[109px] h-[42px] bg-[#313131] rounded-[100px] text-[12px] font-lato font-semibold text-[#FFF] flex justify-center items-center !p-0">
                    Screen Type{" "}
                    <div className="min-w-[24px] min-h-[24px]">{iDropdown}</div>
                  </Button>
                </PopoverHandler>
                <PopoverContent className="bg-transparent border-none shadow-none p-0 !z-[99999999] w-full max-w-[361px] backdrop-blur-[25px]">
                  <div
                    className="px-[19px] pt-[12px] pb-[11px] rounded-[10px] cursor-pointer max-w-[322px] mx-auto w-full"
                    style={{
                      backgroundColor: "rgba(0, 0, 0, 0.50)",
                      backdropFilter: "blur(25px)",
                    }}
                  >
                    <div className="flex justify-center items-center flex-wrap gap-x-[32px] gap-y-[13px]">
                      <div
                        onClick={() => handleQuery("screen_type", "Desktop")}
                        className={`w-[126px] h-[38px] ${
                          "Desktop".toLowerCase() === screen_type?.toLowerCase()
                            ? "bg-green-600"
                            : "bg-[#00000080]"
                        } rounded-[5px] flex justify-center items-center gap-x-[5px] text-[#FFF] font-lato text-[15px] font-semibold`}
                      >
                        {iDesktop} <span>Desktop</span>
                      </div>
                      <div
                        onClick={() => handleQuery("screen_type", "Phones")}
                        className={`w-[126px] h-[38px] ${
                          "Phones".toLowerCase() === screen_type?.toLowerCase()
                            ? "bg-green-600"
                            : "bg-[#00000080]"
                        } rounded-[5px] flex justify-center items-center gap-x-[5px] text-[#FFF] font-lato text-[15px] font-semibold`}
                      >
                        {iPhone} <span>Phones</span>
                      </div>
                      <div
                        onClick={() => handleQuery("screen_type", "Tablets")}
                        className={`w-[126px] h-[38px] ${
                          "Tablets".toLowerCase() === screen_type?.toLowerCase()
                            ? "bg-green-600"
                            : "bg-[#00000080]"
                        } rounded-[5px] flex justify-center items-center gap-x-[5px] text-[#FFF] font-lato text-[15px] font-semibold`}
                      >
                        {iTablet} <span>Tablets</span>
                      </div>
                      <div
                        onClick={() => handleQuery("screen_type", "Handhelds")}
                        className={`w-[126px] h-[38px] ${
                          "Handhelds".toLowerCase() ===
                          screen_type?.toLowerCase()
                            ? "bg-green-600"
                            : "bg-[#00000080]"
                        } rounded-[5px] flex justify-center items-center gap-x-[5px] text-[#FFF] font-lato text-[15px] font-semibold`}
                      >
                        {iHandhelds} <span>Handhelds</span>
                      </div>
                      <div
                        onClick={() => handleQuery("screen_type", "Other")}
                        className={`w-[126px] h-[38px] ${
                          "Other".toLowerCase() === screen_type?.toLowerCase()
                            ? "bg-green-600"
                            : "bg-[#00000080]"
                        } rounded-[5px] flex justify-center items-center gap-x-[5px] text-[#FFF] font-lato text-[15px] font-semibold`}
                      >
                        {iOther} <span>Other</span>
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>

              <Popover placement="bottom">
                <PopoverHandler>
                  <Button className="shadow-none hover:shadow-none normal-case min-w-[109px] max-w-[109px] h-[42px] bg-[#313131] rounded-[100px] text-[12px] font-lato font-semibold text-[#FFF] flex justify-center items-center !p-0">
                    Sort By{" "}
                    <div className="min-w-[24px] min-h-[24px]">{iDropdown}</div>
                  </Button>
                </PopoverHandler>
                <PopoverContent className="bg-transparent border-none shadow-none p-0 !z-[99999999] w-full max-w-[361px] backdrop-blur-[25px]">
                  <div
                    className="px-[19px] pt-[12px] pb-[11px] rounded-[10px] cursor-pointer max-w-[322px] mx-auto w-full"
                    style={{
                      backgroundColor: "rgba(0, 0, 0, 0.50)",
                      backdropFilter: "blur(25px)",
                    }}
                  >
                    <div className="flex flex-col items-center justify-center gap-y-[10px] cursor-pointer">
                      <div
                        onClick={() => handleQuery("sort_by", "Random")}
                        className={`text-[15px] font-lato font-semibold text-[#fff] w-[110px] h-[36px] ${
                          "Random".toLowerCase() === sort_by?.toLowerCase()
                            ? "bg-green-600"
                            : ""
                        } hover:bg-[#00000080] flex justify-center items-center rounded-[5px]`}
                      >
                        Random
                      </div>
                      <div
                        onClick={() => handleQuery("sort_by", "Views")}
                        className={`text-[15px] font-lato font-semibold text-[#fff] w-[110px] h-[36px] ${
                          "Views".toLowerCase() === sort_by?.toLowerCase()
                            ? "bg-green-600"
                            : ""
                        } hover:bg-[#00000080] flex justify-center items-center rounded-[5px]`}
                      >
                        Views
                      </div>
                      <div
                        onClick={() => handleQuery("sort_by", "Favorites")}
                        className={`text-[15px] font-lato font-semibold text-[#fff] w-[110px] h-[36px] ${
                          "Favorites".toLowerCase() === sort_by?.toLowerCase()
                            ? "bg-green-600"
                            : ""
                        } hover:bg-[#00000080] flex justify-center items-center rounded-[5px]`}
                      >
                        Favorites
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>

              <Popover placement="bottom-end">
                <PopoverHandler>
                  <Button className="shadow-none hover:shadow-none normal-case min-w-[109px] max-w-[109px] h-[42px] bg-[#313131] rounded-[100px] text-[12px] font-lato font-semibold text-[#FFF] flex justify-center items-center !p-0">
                    Upload Date{" "}
                    <div className="min-w-[24px] min-h-[24px]">{iDropdown}</div>
                  </Button>
                </PopoverHandler>
                <PopoverContent className="bg-transparent border-none shadow-none p-0 !z-[99999999] w-full max-w-[361px] backdrop-blur-[25px]">
                  <div
                    className="px-[19px] pt-[12px] pb-[11px] rounded-[10px] cursor-pointer max-w-[322px] mx-auto w-full"
                    style={{
                      backgroundColor: "#00000080",
                      backdropFilter: "blur(25px)",
                    }}
                  >
                    <div className="flex flex-col items-center justify-center gap-y-[10px] cursor-pointer">
                      <div
                        onClick={() => handleQuery("date", "Today")}
                        className={`text-[15px] font-lato font-semibold text-[#fff] w-[123px] h-[41px] ${
                          "Today".toLowerCase() === date?.toLowerCase()
                            ? "bg-green-600"
                            : ""
                        } hover:bg-[#00000080] flex justify-center items-center rounded-[5px]`}
                      >
                        Today
                      </div>
                      <div
                        onClick={() => handleQuery("date", "This week")}
                        className={`text-[15px] font-lato font-semibold text-[#fff] w-[123px] h-[41px] ${
                          "This week".toLowerCase() === date?.toLowerCase()
                            ? "bg-green-600"
                            : ""
                        } hover:bg-[#00000080] flex justify-center items-center rounded-[5px]`}
                      >
                        This week
                      </div>
                      <div
                        onClick={() => handleQuery("date", "This Month")}
                        className={`text-[15px] font-lato font-semibold text-[#fff] w-[123px] h-[41px] ${
                          "This Month".toLowerCase() === date?.toLowerCase()
                            ? "bg-green-600"
                            : ""
                        } hover:bg-[#00000080] flex justify-center items-center rounded-[5px]`}
                      >
                        This Month
                      </div>
                      <div
                        onClick={() => handleQuery("date", "This year")}
                        className={`text-[15px] font-lato font-semibold text-[#fff] w-[123px] h-[41px] ${
                          "This year".toLowerCase() === date?.toLowerCase()
                            ? "bg-green-600"
                            : ""
                        } hover:bg-[#00000080] flex justify-center items-center rounded-[5px]`}
                      >
                        This year
                      </div>
                      <div
                        onClick={() => handleQuery("date", "All time")}
                        className={`text-[15px] font-lato font-semibold text-[#fff] w-[123px] h-[41px] ${
                          "All time".toLowerCase() === date?.toLowerCase()
                            ? "bg-green-600"
                            : ""
                        } hover:bg-[#00000080] flex justify-center items-center rounded-[5px]`}
                      >
                        All time
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            <div className="mt-[49px] w-[129px] h-[38px] mx-auto bg-[#2924FF] rounded-[5px] text-[#C4C4C4] text-[15px] font-bakbak-one flex justify-center items-center">
              Save
            </div>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default SearchWallpapersDrawer;
