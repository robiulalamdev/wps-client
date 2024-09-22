/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  Button,
  Popover,
  PopoverContent,
  PopoverHandler,
} from "@material-tailwind/react";
import { useState } from "react";
import {
  iDesktop,
  iDropdown,
  iHandhelds,
  iOther,
  iPhone,
  iRefresh,
  iTablet,
} from "../../utils/icons/icons";

import filter from "../../assets/icons/search-wallpapers/filter.gif";
import { resolutions } from "../../utils/data/data";
import SearchWallpapersDrawer from "./SearchWallpapersDrawer";
import { useNavigate, useSearchParams } from "react-router-dom";

const tabs1 = ["Trending", "New"];
const tabs2 = ["All", "Illustration", "Photography", "AI"];
const tabs3 = ["SFW", "NSFW"];

const SearchWallpapersTabs = ({ tab1, tab2, tab3, handleQuery }) => {
  const [open, setOpen] = useState(false);
  const [dimensions, setDimensions] = useState({ width: null, height: null });
  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();

  const height = searchParams.get("height");
  const width = searchParams.get("width");
  const screen_type = searchParams.get("screen_type");
  const sort_by = searchParams.get("sort_by");
  const date = searchParams.get("date");

  return (
    <>
      <div className="mt-[21px] md:mt-[39px] mb-[26px] md:mb-0 max-w-full overflow-x-auto">
        <div className="flex items-center justify-start lg:justify-center gap-x-[20px]">
          <div className="bg-[#00000033] rounded-[100px] md:rounded-[23.5px] w-[177px] h-[40px] md:w-[192px] md:h-[42px] flex justify-center items-center">
            {tabs1.map((t, i) => (
              <Button
                onClick={() => handleQuery("tn", t)}
                key={i}
                className={`hover:shadow-none shadow-none p-0 m-0 normal-case font-lato text-[12px] leading-[14.4px] font-bold w-[82px] h-[30px] md:min-w-[88px] md:h-[33px]  ${
                  tab1.toLowerCase() === t.toLowerCase()
                    ? "bg-[#000000B2] !text-white rounded-[100px] md:rounded-[23.5px]"
                    : "bg-transparent !text-[#C6C6C6]"
                }`}
              >
                {t}
              </Button>
            ))}
          </div>

          <img
            onClick={() => setOpen(!open)}
            src={filter}
            alt=""
            className="w-[57px] h-[39px] lg:hidden"
          />

          <div className="lg:flex items-center justify-center gap-x-[20px] hidden lg:inline-block">
            <div className="bg-[#00000033] rounded-[100px] md:rounded-[23.5px] h-[40px] w-full md:max-w-[450px] md:h-[42px] md:flex justify-between items-center px-2 hidden md:inline-block">
              {tabs2.map((t, i) => (
                <Button
                  onClick={() => handleQuery("type", t)}
                  key={i}
                  className={`hover:shadow-none shadow-none p-0 m-0 normal-case font-lato text-[12px] leading-[14.4px] font-bold w-[82px] h-[30px] md:min-w-[88px] md:h-[33px]  ${
                    tab2.toLowerCase() === t.toLowerCase()
                      ? "bg-[#000000B2] !text-white rounded-[100px] md:rounded-[23.5px]"
                      : "bg-transparent !text-[#C6C6C6]"
                  }`}
                >
                  {t}
                </Button>
              ))}
            </div>

            <div className="bg-[#00000033] rounded-[100px] md:rounded-[23.5px] min-w-[177px] h-[40px] md:w-[166px] md:h-[42px] flex justify-center items-center px-[4px]">
              {tabs3.map((t, i) => (
                <Button
                  onClick={() => handleQuery("classification", t)}
                  key={i}
                  className={`hover:shadow-none shadow-none p-0 m-0 normal-case font-lato text-[12px] leading-[14.4px] font-bold w-[82px] h-[30px] md:min-w-[65px] md:h-[32px] ${
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

            <Popover placement="bottom-start">
              <PopoverHandler>
                <Button className="shadow-none hover:shadow-none normal-case min-w-[109px] max-w-[109px] h-[42px] bg-[#00000033] rounded-[100px] md:rounded-[23.5px] text-[12px] font-lato font-semibold text-[#FFF] flex justify-center items-center gap-x-[7px] p-0 leading-normal">
                  Resolution <div className="w-fit h-fit">{iDropdown}</div>
                </Button>
              </PopoverHandler>
              <PopoverContent className="bg-transparent border-none shadow-none p-0">
                <div
                  className="px-[32px] pt-[36px] pb-[28px] rounded-[10px]"
                  style={{
                    backgroundColor: "rgba(0, 0, 0, 0.50)",
                    backdropFilter: "blur(25px)",
                  }}
                >
                  <div className="grid grid-cols-5 gap-x-[14px] w-fit mx-auto cursor-pointer">
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
                            className={`w-[83px] h-[29px] flex justify-center items-center rounded-[5px]
                            ${
                              item.width === parseInt(width) &&
                              item.height === parseInt(height)
                                ? "bg-green-600"
                                : "bg-[#00000066]"
                            }
                            `}
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
                            className={`w-[83px] h-[29px] flex justify-center items-center rounded-[5px]
                            ${
                              item.width === parseInt(width) &&
                              item.height === parseInt(height)
                                ? "bg-green-600"
                                : "bg-[#00000066]"
                            }
                            `}
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
                            className={`w-[83px] h-[29px] flex justify-center items-center rounded-[5px]
                            ${
                              item.width === parseInt(width) &&
                              item.height === parseInt(height)
                                ? "bg-green-600"
                                : "bg-[#00000066]"
                            }
                            `}
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
                            className={`w-[83px] h-[29px] flex justify-center items-center rounded-[5px]
                            ${
                              item.width === parseInt(width) &&
                              item.height === parseInt(height)
                                ? "bg-green-600"
                                : "bg-[#00000066]"
                            }
                            `}
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
                            className={`w-[83px] h-[29px] flex justify-center items-center rounded-[5px]
                            ${
                              item.width === parseInt(width) &&
                              item.height === parseInt(height)
                                ? "bg-green-600"
                                : "bg-[#00000066]"
                            }
                            `}
                          >
                            <h1 className="font-lato text-[12px] text-[#FFF] font-medium">
                              {item.width} × {item.height}
                            </h1>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-[25px]">
                    <h1 className="text-center text-[12px] font-lato text-[#FFF]">
                      Auto Detection
                    </h1>
                    <h1 className="text-center text-[12px] font-lato font-medium text-[#FFF] mt-[7px]">
                      Your screen resolution is {screen.width} × {screen.height}
                      .
                    </h1>
                    <h1 className="text-center text-[12px] font-lato text-[#FFF] mt-[25px]">
                      Custom Resolution
                    </h1>

                    <div className="flex justify-center items-start gap-x-[25px] mt-[16px]">
                      <input
                        onChange={(e) =>
                          setDimensions({
                            width: e.target.value,
                            height: dimensions.height,
                          })
                        }
                        type="number"
                        placeholder="Width"
                        className="w-[79px] h-[30px] font-lato placeholder:font-lato bg-[#000000B2] outline-none rounded-[5px] placeholder:text-[#939393] text-[12px] placeholder:text-[12px] text-[#FFF] text-center"
                      />
                      <input
                        onChange={(e) =>
                          setDimensions({
                            width: dimensions.width,
                            height: e.target.value,
                          })
                        }
                        type="number"
                        placeholder="Height"
                        className="w-[79px] h-[30px] font-lato placeholder:font-lato bg-[#000000B2] outline-none rounded-[5px] placeholder:text-[#939393] text-[12px] placeholder:text-[12px] text-[#FFF] text-center"
                      />
                    </div>
                    <Button
                      onClick={() =>
                        handleQuery("dimensions", {
                          width: dimensions.width,
                          height: dimensions.height,
                        })
                      }
                      className="w-[129px] h-[38px] bg-[#2924FF] shadow-none hover:shadow-none normal-case font-normal rounded-[5px] text-[15px] text-[#C4C4C4] font-bakbak-one text-center !mt-[26px] mx-auto flex justify-center items-center"
                    >
                      Search
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            <Popover placement="bottom-start">
              <PopoverHandler>
                <Button className="shadow-none hover:shadow-none normal-case min-w-[118px] max-w-[118px] h-[42px] bg-[#00000033] rounded-[100px] md:rounded-[23.5px] text-[12px] font-lato font-semibold text-[#FFF] flex justify-center items-center gap-x-[7px] p-0 leading-normal">
                  Screen Type <div className="w-fit h-fit">{iDropdown}</div>
                </Button>
              </PopoverHandler>
              <PopoverContent className="bg-transparent border-none shadow-none p-0">
                <div
                  className="px-[30px] pt-[22px] pb-[20px] rounded-[10px] cursor-pointer"
                  style={{
                    backgroundColor: "rgba(0, 0, 0, 0.50)",
                    backdropFilter: "blur(25px)",
                  }}
                >
                  <div className="grid grid-cols-3 gap-x-[15px] gap-y-[13px]">
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
                        "Handhelds".toLowerCase() === screen_type?.toLowerCase()
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
                <Button className="shadow-none hover:shadow-none normal-case min-w-[109px] max-w-[109px] h-[42px] bg-[#00000033] rounded-[100px] md:rounded-[23.5px] text-[12px] font-lato font-semibold text-[#FFF] flex justify-center items-center gap-x-[7px] p-0 leading-normal">
                  Sort By <div className="w-fit h-fit">{iDropdown}</div>
                </Button>
              </PopoverHandler>
              <PopoverContent className="bg-transparent border-none shadow-none p-0">
                <div
                  className="py-[18px] px-[21px] rounded-[5px] flex flex-col items-center justify-center gap-y-[10px] cursor-pointer"
                  style={{
                    backgroundColor: "rgba(0, 0, 0, 0.50)",
                    backdropFilter: "blur(25px)",
                  }}
                >
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
              </PopoverContent>
            </Popover>
            <Popover placement="bottom">
              <PopoverHandler>
                <Button className="shadow-none hover:shadow-none normal-case min-w-[123px] max-w-[123px] h-[42px] bg-[#00000033] rounded-[100px] md:rounded-[23.5px] text-[12px] font-lato font-semibold text-[#FFF] flex justify-center items-center gap-x-[7px] p-0 leading-normal">
                  Upload Date <div className="w-fit h-fit">{iDropdown}</div>
                </Button>
              </PopoverHandler>
              <PopoverContent className="bg-transparent border-none shadow-none p-0">
                <div
                  className="py-[14px] px-[12px] rounded-[5px] flex flex-col items-center justify-center gap-y-[10px] cursor-pointer"
                  style={{
                    backgroundColor: "rgba(0, 0, 0, 0.50)",
                    backdropFilter: "blur(25px)",
                  }}
                >
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
              </PopoverContent>
            </Popover>
            <Button
              onClick={() => {
                navigate("");
                window.location.reload();
              }}
              className="shadow-none hover:shadow-none normal-case min-w-[57px] max-w-[57px] h-[42px] bg-[#00000033] rounded-[9px] text-[12px] font-lato font-semibold text-[#FFF] flex justify-center items-center p-0"
            >
              <div className="min-w-[24px] min-h-[24px]">{iRefresh}</div>
            </Button>
          </div>
        </div>
      </div>

      <SearchWallpapersDrawer
        open={open}
        setOpen={setOpen}
        tab2={tab2}
        tab3={tab3}
        handleQuery={handleQuery}
      />
    </>
  );
};

export default SearchWallpapersTabs;
