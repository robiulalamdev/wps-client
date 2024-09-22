import { useEffect, useState } from "react";
import useViewImage from "../../../lib/hooks/useViewImage";
import { useGetFeaturedDataQuery } from "../../../redux/features/featured/featuredApi";
import LazyWallpaper from "../../common/wallpaper/LazyWallpaper";
import { useRouter } from "next/router";

const Sponsor = () => {
  const { data } = useGetFeaturedDataQuery({
    targetType: "Wallpaper",
    type: "Staff",
    limit: 3,
  });
  const [wallpapers, setWallpapers] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (data?.data?.length > 0) {
      setWallpapers(data?.data);
    }
  }, [data]);

  return (
    <>
      {wallpapers?.length > 2 && (
        <div>
          <h1 className="font-bakbak-one text-[15px] md:text-[35px] text-center text-white mt-[38px] mb-[23px] md:mt-[78px] md:mb-[59px]">
            The <span className="text-[#FDF516]">WPS</span> Staff Picks
          </h1>

          <div className="md:grid grid-cols-2 gap-x-[36px] hidden md:inline-block">
            <div
              onClick={() => router.push(`/w/${wallpapers[0]?.slug}`)}
              className="min-h-[535px] max-h-[535px] rounded-[30px] overflow-hidden relative"
            >
              <LazyWallpaper
                src={wallpapers[0]?.wallpaper}
                alt=""
                maxWidth={1000}
                maxHeight={685}
                width={1000}
                height={685}
                className="w-full h-full object-cover hover:scale-110 duration-300 cursor-pointer"
              />
            </div>
            <div className="grid grid-cols-1 gap-y-[29px]">
              <div
                onClick={() => router.push(`/w/${wallpapers[1]?.slug}`)}
                className="h-[253px] rounded-[30px] overflow-hidden relative"
              >
                <LazyWallpaper
                  src={wallpapers[1]?.wallpaper}
                  alt=""
                  maxWidth={1000}
                  maxHeight={600}
                  width={1000}
                  height={600}
                  className="w-full h-full object-cover hover:scale-110 duration-300 cursor-pointer"
                />
              </div>
              <div
                onClick={() => router.push(`/w/${wallpapers[2]?.slug}`)}
                className="h-[253px] rounded-[30px] overflow-hidden relative"
              >
                <LazyWallpaper
                  src={wallpapers[2]?.wallpaper}
                  alt=""
                  maxWidth={1000}
                  maxHeight={600}
                  width={1000}
                  height={600}
                  className="w-full h-full object-cover hover:scale-110 duration-300 cursor-pointer"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-[9px] md:hidden">
            <div
              onClick={() => router.push(`/w/${wallpapers[0]?.slug}`)}
              className="min-h-[194px] max-h-[194px] rounded-[12px] overflow-hidden relative"
            >
              <LazyWallpaper
                src={wallpapers[0]?.wallpaper}
                alt=""
                maxWidth={348}
                maxHeight={250}
                width={348}
                height={250}
                className="w-full h-full object-cover hover:scale-110 duration-300 cursor-pointer"
              />
            </div>
            <div className="grid grid-cols-1 gap-y-[10px]">
              <div
                onClick={() => router.push(`/w/${wallpapers[1]?.slug}`)}
                className="h-[92px] rounded-[12px] overflow-hidden relative"
              >
                <LazyWallpaper
                  src={wallpapers[1]?.wallpaper}
                  alt=""
                  maxWidth={296}
                  maxHeight={150}
                  width={296}
                  height={150}
                  className="w-full h-full object-cover hover:scale-110 duration-300 cursor-pointer"
                />
              </div>
              <div
                onClick={() => router.push(`/w/${wallpapers[2]?.slug}`)}
                className="h-[92px] rounded-[12px] overflow-hidden relative"
              >
                <LazyWallpaper
                  src={wallpapers[2]?.wallpaper}
                  alt=""
                  maxWidth={296}
                  maxHeight={150}
                  width={296}
                  height={150}
                  className="w-full h-full object-cover hover:scale-110 duration-300 cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sponsor;
