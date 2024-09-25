/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useMemo, useState } from "react";
import profile from "../../assets/images/global/header/profile.png";
import {
  iAddTag,
  iDownloadArrow,
  iFilter,
  iWallpaperClose,
} from "../../utils/icons/icons";
import { Button } from "@material-tailwind/react";
import useViewImage from "../../lib/hooks/useViewImage";
import { downloadImageWithWH } from "../../lib/services/service";
import { AuthContext } from "../../contextApi/AuthContext";
import {
  useIncrementWallDownloadMutation,
  useUpdateTagByIdMutation,
} from "../../redux/features/wallpapers/wallpapersApi";
import { toast } from "react-toastify";
import { useGetTotalFavoritesQuery } from "../../redux/features/favorites/favoritesApi";
import { SpinnerCircularFixed } from "spinners-react";
import VerifiedRoleIcon from "../common/global/VerifiedRoleIcon";
import Link from "next/link";

const resulations1 = {
  name: "Ultra Wide",
  items: [
    { width: 2560, height: 1080 },
    { width: 3440, height: 1440 },
    { width: 3840, height: 1600 },
  ],
};

const resulations2 = {
  name: "4:3",
  items: [
    { width: 1280, height: 960 },
    { width: 1600, height: 1200 },
    { width: 1920, height: 1440 },
    { width: 2560, height: 1920 },
    { width: 3840, height: 2880 },
  ],
};

const resulations3 = {
  name: "16:9",
  items: [
    { width: 1280, height: 720 },
    { width: 1600, height: 900 },
    { width: 1920, height: 1080 },
    { width: 2560, height: 1440 },
    { width: 3840, height: 2160 },
  ],
};

const resulations4 = {
  name: "16:10",
  items: [
    { width: 1280, height: 800 },
    { width: 1600, height: 1000 },
    { width: 1920, height: 1200 },
    { width: 2560, height: 1600 },
    { width: 3840, height: 2400 },
  ],
};

const resulations5 = {
  name: "16:9",
  items: [
    { width: 1280, height: 1024 },
    { width: 1600, height: 1280 },
    { width: 1920, height: 1536 },
    { width: 2560, height: 2048 },
    { width: 3840, height: 3072 },
  ],
};

const WallpaperSidebarUi = ({ data }) => {
  const { user } = useContext(AuthContext);
  const { data: favoriteData } = useGetTotalFavoritesQuery(data?._id);
  const [incrementWallDownload] = useIncrementWallDownloadMutation();
  const { formatFileSize, viewResizeImg } = useViewImage();
  const [open, setOpen] = useState(false);
  const [dimensions, setDimensions] = useState({ height: 0, width: 0 });
  const [selectedDm, setSelectedDm] = useState({ height: 0, width: 0 });
  const [tags, setTags] = useState([]);
  const [tagValue, setTagValue] = useState("");
  const [downloading, setDownloading] = useState(false);

  // mutations
  const [updateTagById] = useUpdateTagByIdMutation();

  const handleDimensions = async () => {
    const dm = {
      width: data?.dimensions?.width,
      height: data?.dimensions?.height,
    };
    setDimensions(dm);
    setSelectedDm(dm);
  };

  useEffect(() => {
    if (data?.wallpaper) {
      handleDimensions();
    }
    if (data?.tags?.length > 0) {
      setTags(data?.tags);
    }
  }, [data]);

  const handleIncDownload = async () => {
    const options = {
      data: {},
      wallpaperId: data?._id,
    };
    await incrementWallDownload(options);
  };

  const handleDownload = async () => {
    let result = null;
    if (selectedDm.width > 0 && selectedDm.height > 0) {
      setDownloading(true);
      const url = viewResizeImg(
        data?.wallpaper,
        selectedDm.width,
        selectedDm.height,
        "fill"
      );
      result = await downloadImageWithWH(url, data?.name);
    } else {
      setDownloading(true);
      const url = viewResizeImg(
        data?.wallpaper,
        dimensions.width,
        dimensions.height,
        "fill"
      );
      result = await downloadImageWithWH(url, data?.name);
    }
    setTimeout(() => {
      setDownloading(false);
    }, 600);

    if (result?.success) {
      handleIncDownload();
    }
  };

  // const isAuthor = data?.user === user?._id;

  const handleAdd = async (e) => {
    e.preventDefault();
    const tag = e.target.tag.value;
    if (!tag) return;
    if (tag) {
      const options = {
        id: data?._id,
        data: { tags: [...tags, tag] },
      };
      const result = await updateTagById(options);
      if (result?.data?.success) {
        setTags([...tags, tag]);
        setTagValue("");
        e.target.reset();
        toast.success("New Tag Add Successfully");
      } else {
        toast.error("New Tag Add unSuccessfully");
      }
    }
  };

  const handleSetDm = async (dm) => {
    // console.log(dm);
    setSelectedDm(dm);
    setOpen(false);
  };

  // console.log(data?.author_info);

  return (
    <div className="bg-[#121212] lg:bg-[#00000033] w-full min-h-[802px] max-h-[802px] max-w-[347px] min-w-[347px] rounded-[10px] pt-[15px] px-[19px] pb-[23px] scroll_off">
      <h1 className="text-center font-bakbak-one text-[12px] text-white">
        Posted by
      </h1>

      <div className="flex items-center justify-center gap-x-[32px] mt-[9px]">
        <div className="rounded-full size-[87px] flex justify-center items-center bg-[#00000033]">
          <img
            src={
              viewResizeImg(data?.author_info?.profile_image, 87, 87) || profile
            }
            alt="profile"
            className="w-[75px] h-[75px] rounded-full object-cover"
          />
        </div>
        <div className="flex flex-col items-center gap-[19px]">
          <div className="flex items-center gap-x-[4px]">
            <h1 className="text-white font-bakbak-one text-[20px] oneLine">
              {data?.author_info?.username}
            </h1>
            <VerifiedRoleIcon
              status={data?.author_info?.verified}
              role={data?.author_info?.role}
            />
          </div>
          <Link href={`/profiles/${data?.author_info?.slug}`}>
            <Button className="w-[97px] h-[32px] shadow-none hover:shadow-none text-[#fff] bg-[#000000] font-bakbak-one !text-[11px] normal-case font-normal p-0 leading-normal rounded-[15px]">
              View Profile
            </Button>
          </Link>
        </div>
      </div>
      <div className="border-t-[1px] border-[#393939] w-full mt-[20px] mb-[15px] hidden lg:block"></div>

      {!open && (
        <>
          <h1 className="text-center font-bakbak-one text-[15px] text-[#CCC]">
            Dimensions
          </h1>

          <h1 className="text-center font-bakbak-one mt-[9px] text-[15px] text-[#606060]">
            {data?.dimensions?.width} x {data?.dimensions?.height}
          </h1>
        </>
      )}

      <div className="flex items-center justify-center gap-x-[3px] mt-[5px]">
        <h1 className="text-[12px] font-bakbak-one text-[#CCC]">
          Size Configuration
        </h1>
        <div
          onClick={() => setOpen(!open)}
          className="cursor-pointer min-w-[24px]"
        >
          {open ? iWallpaperClose : iFilter}
        </div>
      </div>

      {open ? (
        <div className="mt-[20px]">
          <h1 className="text-center text-[12px] font-lato text-[#FFF]">
            Auto Detection
          </h1>
          <h1 className="text-center text-[12px] font-lato font-medium text-[#FFF] mt-[7px]">
            Your screen resolution is {screen.width} × {screen.height}.
          </h1>

          <div className="mt-[20px] grid grid-cols-3 gap-x-[15px] gap-y-[9px] max-w-[279px] w-full mx-auto cursor-pointer">
            <div className="h-fit">
              <div className="w-[83px] h-[29px] flex justify-center items-center">
                <h1 className="font-lato text-[12px] text-[#FDF516] font-medium">
                  {resulations1.name}
                </h1>
              </div>

              <div className="grid grid-cols-1 gap-y-[10px] h-fit mt-[5px]">
                {resulations1.items.map((item, i) => (
                  <div
                    onClick={() =>
                      handleSetDm({ width: item.width, height: item.height })
                    }
                    key={i}
                    className={`w-[83px] h-[29px] flex justify-center items-center rounded-[5px] 
                    ${
                      selectedDm.width === item.width &&
                      selectedDm.height === item.height
                        ? "bg-[#2924FF]"
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
              <div className="w-[83px] h-[29px] flex justify-center items-center">
                <h1 className="font-lato text-[12px] text-[#FDF516] font-medium">
                  {resulations2.name}
                </h1>
              </div>

              <div className="grid grid-cols-1 gap-y-[10px] h-fit mt-[5px]">
                {resulations2.items.map((item, i) => (
                  <div
                    onClick={() =>
                      handleSetDm({ width: item.width, height: item.height })
                    }
                    key={i}
                    className={`w-[83px] h-[29px] flex justify-center items-center rounded-[5px] 
                    ${
                      selectedDm.width === item.width &&
                      selectedDm.height === item.height
                        ? "bg-[#2924FF]"
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

            <div className="h-fit col-span-2 grid grid-cols-2 gap-x-[15px] gap-y-[9px]">
              <div>
                <div className="w-[83px] h-[29px] flex justify-center items-center">
                  <h1 className="font-lato text-[12px] text-[#FDF516] font-medium">
                    {resulations3.name}
                  </h1>
                </div>

                <div className="grid grid-cols-1 gap-y-[10px] h-fit mt-[5px]">
                  {resulations3.items.map((item, i) => (
                    <div
                      onClick={() =>
                        handleSetDm({
                          width: item.width,
                          height: item.height,
                        })
                      }
                      key={i}
                      className={`w-[83px] h-[29px] flex justify-center items-center rounded-[5px] 
                      ${
                        selectedDm.width === item.width &&
                        selectedDm.height === item.height
                          ? "bg-[#2924FF]"
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
              <div>
                <div className="w-[83px] h-[29px] flex justify-center items-center">
                  <h1 className="font-lato text-[12px] text-[#FDF516] font-medium">
                    {resulations4.name}
                  </h1>
                </div>

                <div className="grid grid-cols-1 gap-y-[10px] h-fit mt-[5px]">
                  {resulations4.items.map((item, i) => (
                    <div
                      onClick={() =>
                        handleSetDm({
                          width: item.width,
                          height: item.height,
                        })
                      }
                      key={i}
                      className={`w-[83px] h-[29px] flex justify-center items-center rounded-[5px] 
                      ${
                        selectedDm.width === item.width &&
                        selectedDm.height === item.height
                          ? "bg-[#2924FF]"
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

              {/* // last part */}
              <div className="col-span-2">
                <div className="w-[83px] h-fit flex justify-center items-center mx-auto">
                  <h1 className="font-lato text-[12px] text-[#FDF516] font-medium">
                    {resulations5.name}
                  </h1>
                </div>
                <div className="grid grid-cols-2 gap-y-[10px] h-fit mt-[5px]">
                  {resulations5.items.map((item, i) => (
                    <div
                      key={i}
                      onClick={() =>
                        handleSetDm({
                          width: item.width,
                          height: item.height,
                        })
                      }
                      className={`w-[83px] h-[29px] flex justify-center items-center rounded-[5px] 
                      ${
                        selectedDm.width === item.width &&
                        selectedDm.height === item.height
                          ? "bg-[#2924FF]"
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
          </div>

          <div className="max-w-[265px] w-full border-t-[1px] border-[#939393] mt-[23px] mx-auto"></div>
          <h1 className="text-center text-[12px] font-lato text-[#FFF] mt-[13px]">
            Custom Resolution
          </h1>

          <div className="flex justify-center items-start gap-x-[25px] mt-[16px]">
            <input
              onChange={(e) =>
                setSelectedDm({
                  width: e.target.value,
                  height: selectedDm.height,
                })
              }
              value={selectedDm.width}
              type="number"
              placeholder="Width"
              className="w-[79px] h-[30px] font-lato placeholder:font-lato bg-[#000000B2] outline-none rounded-[5px] placeholder:text-[#939393] text-[12px] placeholder:text-[12px] text-[#FFF] text-center"
            />
            <input
              onChange={(e) =>
                setSelectedDm({
                  width: selectedDm.width,
                  height: e.target.value,
                })
              }
              value={selectedDm.height}
              type="number"
              placeholder="Height"
              className="w-[79px] h-[30px] font-lato placeholder:font-lato bg-[#000000B2] outline-none rounded-[5px] placeholder:text-[#939393] text-[12px] placeholder:text-[12px] text-[#FFF] text-center"
            />
          </div>
          <Button
            onClick={() => setOpen(false)}
            className="w-[79px] h-[30px] font-lato bg-[#000000B2] shadow-none hover:shadow-none normal-case font-normal rounded-[5px] text-[11px] text-[#FFF] text-center mt-[16px] mx-auto flex justify-center items-center"
          >
            Generate
          </Button>
        </div>
      ) : (
        <>
          <h1 className="text-center font-bakbak-one text-[15px] text-[#CCC] mt-[19px]">
            Tags
          </h1>
          <h1 className="text-center font-bakbak-one text-[12px] text-[#0AB745] mt-[3px]">
            {data?.classification}
          </h1>

          <div>
            {tags?.length > 0 && (
              <h1 className="text-[#FFF] font-bakbak-one text-[12px]">
                {tags?.map((tag, index) => (
                  <Link
                    key={index}
                    href={`/tags/${tag}`}
                    className="hover:text-[#FDF516]"
                  >
                    #{tag}{" "}
                  </Link>
                ))}
              </h1>
            )}
          </div>

          {/* {isAuthor && ( */}
          <form
            onSubmit={handleAdd}
            className="max-w-[235px] h-[35px] bg-[#00000033] rounded-[7px] mx-auto mt-[34px] flex justify-between items-center px-[10px]"
          >
            <input
              onChange={(e) => setTagValue(e.target.value)}
              type="text"
              name="tag"
              value={tagValue}
              placeholder="Add tags here..."
              className="w-full h-full flex-grow bg-transparent outline-none text-[#fff] placeholder:text-[#FFFFFF33] text-[12px] placeholder:text-[12px] placeholder:font-lato font-lato"
            />
            <button
              type="submit"
              className={`flex justify-center items-center size-[17px]  ${
                tagValue ? "text-white" : "text-[#323232]"
              }`}
            >
              {iAddTag}
            </button>
          </form>
          {/* )} */}

          <div className="max-w-[235px] w-full mt-[17px] mx-auto">
            <h1 className=" text-[#CCC] text-[15px] font-bakbak-one text-center">
              Statistics & Information
            </h1>
            <div className="flex justify-between items-start mt-[4px]">
              <div className="w-fit">
                <div className="flex items-center gap-x-[2px]">
                  <h1 className="text-[#606060] font-bakbak-one text-[12px]">
                    Views:
                  </h1>
                  <h1 className="text-[#CCC] font-bakbak-one text-[12px]">
                    {data?.view}
                  </h1>
                </div>
                <div className="flex items-center gap-x-[2px]">
                  <h1 className="text-[#606060] font-bakbak-one text-[12px]">
                    Category:
                  </h1>
                  <h1 className="text-[#CCC] font-bakbak-one text-[12px]">
                    {data?.type}
                  </h1>
                </div>
              </div>
              <div className="w-fit">
                <div className="flex items-center gap-x-[2px]">
                  <h1 className="text-[#606060] font-bakbak-one text-[12px]">
                    Favorites:
                  </h1>
                  <h1 className="text-[#CCC] font-bakbak-one text-[12px]">
                    {favoriteData?.total}
                  </h1>
                </div>
                <div className="flex items-center gap-x-[2px]">
                  <h1 className="text-[#606060] font-bakbak-one text-[12px]">
                    Size:
                  </h1>
                  <h1 className="text-[#CCC] font-bakbak-one text-[12px]">
                    {formatFileSize(data?.size)}
                  </h1>
                </div>
              </div>
            </div>

            <h1 className="mt-[22px] text-[#ccc] font-bakbak-one text-[15px] text-center">
              Credits
            </h1>
            <div className="w-fit mt-[7px]">
              <div className="flex items-center gap-x-[2px]">
                <h1 className="text-[#606060] font-bakbak-one text-[12px] flex items-center gap-2">
                  Source:{" "}
                  <h1 className="text-[#CCC] font-bakbak-one text-[12px]">
                    {data?.source || ""}
                  </h1>
                </h1>
                <h1 className="text-[#CCC] font-bakbak-one text-[12px]"></h1>
              </div>
              <div className="flex items-center gap-x-[2px]">
                <h1 className="text-[#606060] font-bakbak-one text-[12px] flex items-center gap-2">
                  Original Author:{" "}
                  <h1 className="text-[#CCC] font-bakbak-one text-[12px]">
                    {data?.author || ""}
                  </h1>
                </h1>
                <h1 className="text-[#CCC] font-bakbak-one text-[12px]"></h1>
              </div>
            </div>

            <Button
              onClick={() => handleDownload()}
              className="flex items-center justify-center gap-x-[3px] rounded-[5px] bg-[#2924FF] w-[129px] h-[38px] mx-auto mt-[26px] shadow-none hover:shadow-none font-normal normal-case p-0"
            >
              {downloading && (
                <SpinnerCircularFixed
                  size={18}
                  speed={320}
                  thickness={180}
                  color="white"
                  secondaryColor="gray"
                />
              )}
              <h1 className="text-[15px] text-[#C4C4C4] font-bakbak-one ">
                Download{downloading && "..."}
              </h1>
              {!downloading && (
                <div className="min-w-[21px] min-h-[21px]">
                  {iDownloadArrow}
                </div>
              )}
            </Button>
          </div>

          <div className="max-w-[265px] w-full min-h-[109px] h-fit bg-[#0000003D] rounded-[5px] mt-[20px] mx-auto">
            <h1 className="text-[12px] text-[#5A5A5A] font-bakbak-one pl-[18px] pr-[7px] pt-[6px]">
              Ownership of all images belongs to their <br /> respective
              original owners & illustrators.
            </h1>

            <div className="flex items-center justify-center gap-x-[16px] mt-[15px]">
              <h1 className="text-[#FFF] font-bakbak-one text-[12px]">
                Claim Listing
              </h1>
              <h1 className="text-[#FFF] font-bakbak-one text-[12px]">
                Remove Listing
              </h1>
            </div>
            <div className="flex items-center justify-center gap-x-[9px] mt-[17px] pb-[7px]">
              <Link href="/privacy-policy">
                <h1 className="text-[#FFF] text-[10px] font-semibold font-roboto">
                  Privacy Policy
                </h1>
              </Link>
              <Link href="/terms-and-conditions">
                <h1 className="text-[#FFF] text-[10px] font-semibold font-roboto">
                  Terms and Conditions
                </h1>
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default WallpaperSidebarUi;
