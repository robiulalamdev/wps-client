import LazyWallpaper from "../../common/wallpaper/LazyWallpaper";
import { useGetFeaturedDataQuery } from "../../../redux/features/featured/featuredApi";
import { useRouter } from "next/router";

const FeaturedWallpapers = () => {
  const { data } = useGetFeaturedDataQuery({
    targetType: "Wallpaper",
    type: "Wallpaper",
    limit: 3,
  });
  const router = useRouter();

  return (
    <>
      {data?.data?.length > 2 && (
        <div className="">
          <h1 className="text-white text-center font-bakbak-one text-[15px] md:text-[35px] leading-[21px] font-normal mt-[20px] mb-[28px] md:mt-[106px] md:mb-[52px]">
            Featured Wallpapers
          </h1>

          <div className="md:grid grid-cols-3 gap-x-[55px] gap-y-[44px] hidden md:inline-block">
            {data?.data?.map((item, index) => (
              <div
                key={index}
                onClick={() => router.push(`/w/${item?.slug}`)}
                className="min-h-[279px] max-h-[279px] w-full rounded-[15px] overflow-hidden relative"
              >
                <LazyWallpaper
                  src={item?.wallpaper}
                  alt={item?.wallpaper}
                  maxWidth={494}
                  maxHeight={279}
                  width={694}
                  height={479}
                  className="w-full h-full object-cover hover:scale-110 duration-300 cursor-pointer"
                />
              </div>
            ))}
          </div>

          {/* small */}
          <div className="grid grid-cols-2 gap-x-[6px] gap-y-[10px] md:hidden">
            {data?.data?.map((item, index) => (
              <div
                onClick={() => router.push(`/w/${item?.slug}`)}
                key={index}
                className={`w-full rounded-[10px] overflow-hidden
                  ${
                    index > 0
                      ? ` ${
                          index === 3
                            ? "min-h-[131px] max-h-[131px] col-span-2"
                            : "min-h-[86px] max-h-[86px] col-span-1"
                        }`
                      : "min-h-[131px] max-h-[131px] col-span-2"
                  }
                  `}
              >
                <LazyWallpaper
                  src={item?.wallpaper}
                  alt={item?.wallpaper}
                  maxWidth={494}
                  maxHeight={131}
                  width={694}
                  height={331}
                  className="w-full h-full object-cover hover:scale-110 duration-300 cursor-pointer"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default FeaturedWallpapers;
