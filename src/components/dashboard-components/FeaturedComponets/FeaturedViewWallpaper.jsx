/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import LazyWallpaper from "../../common/wallpaper/LazyWallpaper";
import overlay from "../../../assets/images/dashboard-images/sponsor/overlay.png";

const FeaturedViewWallpaper = ({
  data = null,
  selectedItems = [],
  handleSelect,
}) => {
  const isExist = selectedItems.some(
    (item) => item?._id === data?._id && item.no === data?.no
  );
  return (
    <div
      onClick={() => handleSelect(data)}
      className={`max-w-[217px] w-full h-[109px] rounded-[5px] overflow-hidden relative`}
    >
      {data?.wallpaper ? (
        <LazyWallpaper
          src={data?.wallpaper}
          alt={data?.wallpaper}
          maxWidth={217}
          maxHeight={109}
          width={217}
          height={109}
          className="w-full h-full rounded-[5px] object-cover cursor-pointer"
        />
      ) : (
        <div className="w-full h-full !bg-black !bg-opacity-80 rounded-[10px] !absolute top-0 left-0 cursor-pointer">
          <img src={overlay.src} alt="" className="w-full h-full" />
        </div>
      )}

      {!isExist && (
        <div className="w-full h-full !bg-black !bg-opacity-80 rounded-[10px] !absolute top-0 left-0 cursor-pointer">
          <img src={overlay.src} alt="" className="w-full h-full" />
        </div>
      )}

      {data?.load && (
        <div className="w-full h-full !bg-[#403e3efd] rounded-[10px] !absolute top-0 left-0 cursor-pointer z-50">
          <div
            className={`w-full h-full flex items-center justify-center bg-[#00000033] skeleton-loader`}
          >
            <svg
              className="w-[28px] h-[28px] md:w-10 md:h-10 text-[#00000033] animate-pulse"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 18"
            >
              <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeaturedViewWallpaper;
