/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import useViewImage from "../../lib/hooks/useViewImage";
import emptyCollection from "../../assets/images/global/emptyCollection.png";
import { mediaCollectionStyles } from "../../lib/services/service";

const MediaCenterSingleCollection = ({
  data,
  selectedItems,
  handleSelectCollectionWallpapers,
}) => {
  const { viewResizeImg } = useViewImage();

  const isExist = selectedItems?.some((item) => item?._id === data?._id);
  const length = data?.wallpapers?.length || 0;
  // console.log(length);
  return (
    <>
      <div className={``}>
        <div
          onClick={() => handleSelectCollectionWallpapers(data)}
          className={`
             ${mediaCollectionStyles(length)}
            bg-black/20 w-full min-h-[152px] max-h-[152px] md:min-h-[138px] md:max-h-[138px] rounded-[10px] overflow-hidden relative ${
              isExist ? "border-[2px] border-[#B3FD16]" : ""
            }`}
        >
          {data?.wallpapers?.length > 0 ? (
            <>
              {data.wallpapers?.map((img, i) => (
                <img
                  key={i}
                  src={viewResizeImg(img?.wallpaper, 250, 138)}
                  alt="wallpaper"
                  className={`w-full h-full object-cover cursor-pointer`}
                />
              ))}
            </>
          ) : (
            <img
              src={emptyCollection}
              alt="wallpaper"
              className="w-full h-full object-fill cursor-pointer col-span-2"
            />
          )}
        </div>

        {/* <div
          onClick={() => handleSelectCollectionWallpapers(data)}
          className={`grid grid-cols-2 w-full h-[152px] md:h-[138px] rounded-[10px] overflow-hidden relative ${
            isExist ? "border-[2px] border-[#B3FD16]" : ""
          }`}
        >
          {data?.wallpapers?.length > 0 ? (
            <>
              {data.wallpapers?.slice(0, 4).map((img, i) => (
                <img
                  key={i}
                  src={viewResizeImg(img?.wallpaper, 300, 150)}
                  alt="wallpaper"
                  className={`w-full h-full object-cover cursor-pointer ${
                    data?.wallpapers?.length === 1 && "col-span-2"
                  }`}
                />
              ))}
            </>
          ) : (
            <img
              src={emptyCollection}
              alt="wallpaper"
              className="w-full h-full object-fill cursor-pointer col-span-2"
            />
          )}
        </div> */}
        <div className="max-w-[119px] md:max-w-[188px] h-[26px] bg-[#00000033] mt-[13px] md:mt-[9px] flex justify-center items-center mx-auto rounded-[5px]">
          <h1 className="text-[#fff] text-center font-lato text-[12px]">
            {data?.name}
          </h1>
        </div>
      </div>
    </>
  );
};

export default MediaCenterSingleCollection;
