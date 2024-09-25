/* eslint-disable react/prop-types */
import { useState } from "react";
import { iBackArrow } from "../../utils/icons/icons";
import LazyWallpaper from "../common/wallpaper/LazyWallpaper";
import useViewImage from "../../lib/hooks/useViewImage";
import { mediaCollectionStyles } from "../../lib/services/service";
import NoData from "../common/notFound/NoData";
import { useRouter } from "next/router";

const OfficialBrandCollectionWallpapers = ({ collections = [] }) => {
  const { viewResizeImg } = useViewImage();
  const [selectedCollection, setSelectedCollection] = useState(null);
  const router = useRouter();
  return (
    <>
      <div
        className={`flex justify-between items-center mt-[9px] md:mt-[21px] duration-150 ${
          selectedCollection ? "block" : "hidden"
        }`}
      >
        <div
          onClick={() => setSelectedCollection(null)}
          className={`rounded-[10px] w-[48px] h-[50px] flex justify-center items-center bg-[#00000033] cursor-pointer`}
        >
          {iBackArrow}
        </div>
        <h1 className="text-white text-[14px] md:text-[20px] font-lato leading-normal break-words">
          {selectedCollection?.name}
        </h1>
        <h1></h1>
      </div>

      {selectedCollection && (
        <>
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-[14px] gap-y-[14px] md:gap-x-[16px] md:gap-y-[32px] lg:gap-x-[40px] lg:gap-y-[59px] mt-[8px] md:mt-[14px]">
            {selectedCollection?.wallpapers?.map((item, index) => (
              <div
                onClick={() => router.push(`/w/${item?.slug}`)}
                key={index}
                className={`w-full h-[152px] md:h-[138px] rounded-[5px] md:rounded-[7px] lg:rounded-[10px] overflow-hidden relative`}
              >
                <LazyWallpaper
                  src={item?.wallpaper}
                  alt={item?.wallpaper}
                  maxWidth={400}
                  maxHeight={300}
                  width={400}
                  height={300}
                  className="w-full h-full rounded-[5px] md:rounded-[7px] lg:rounded-[10px] object-cover hover:scale-110 duration-300 cursor-pointer"
                />
              </div>
            ))}
          </div>
        </>
      )}
      {collections?.length > 0 && !selectedCollection && (
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-[14px] gap-y-[19px] md:gap-x-[32px] md:gap-y-[24px] lg:gap-x-[41px] lg:gap-y-[34px] mt-[9px] md:mt-[18px]">
          {collections?.map((item, index) => (
            <div key={index} className="">
              <div
                onClick={() => setSelectedCollection(item)}
                className={`${mediaCollectionStyles(
                  item?.wallpapers?.length
                )} bg-black/20 w-full h-[152px] md:h-[138px] rounded-[5px] md:rounded-[7px] lg:rounded-[10px] overflow-hidden relative`}
              >
                {item?.wallpapers?.map((img, i) => (
                  <img
                    key={i}
                    src={viewResizeImg(img?.wallpaper, 200, 138)}
                    alt="wallpaper"
                    className={`w-full h-full object-cover cursor-pointer`}
                  />
                ))}
              </div>
              <h1 className="text-[10px] md:text-[12px] font-lato text-[#FFF] font-semibold text-center mt-[9px] md:mt-[11px] oneLine">
                {item.name}
              </h1>
            </div>
          ))}
        </div>
      )}

      {collections?.length === 0 && (
        <NoData title="This user has not created any collections yet." />
      )}
    </>
  );
};

export default OfficialBrandCollectionWallpapers;
