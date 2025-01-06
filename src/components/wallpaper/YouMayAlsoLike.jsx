import { Button } from "@material-tailwind/react";
import Link from "next/link";
import React from "react";
import LazyWallpaper from "../common/wallpaper/LazyWallpaper";
import { useRouter } from "next/router";
import { useGetPopularWallpapersQuery } from "@/redux/features/wallpapers/wallpapersApi";

const YouMayAlsoLike = ({ wallpaper = null }) => {
  const { data: popularWallpapers, isLoading } = useGetPopularWallpapersQuery(
    `?type=${wallpaper?.type ? wallpaper?.type : ""}&wallpaperId=${
      wallpaper?._id ? wallpaper?._id : ""
    }&limit=3`
  );

  console.log(wallpaper);

  const router = useRouter();

  const openWallpaper = (slug) => {
    window.scrollTo(0, 0);
    router.push(`/w/${slug}`);
  };

  return (
    <>
      {!isLoading && popularWallpapers?.data?.length > 0 && (
        <div className="mt-[17px] md:mt-[62px]">
          <h1 className="text-[#939393] font-bakbak-one text-center text-[20px] md:text-[30px]">
            You may also like
          </h1>

          <div className="grid grid-cols-3 gap-x-[16px] md:gap-x-[42px] lg:gap-x-[83px] mt-[17px] md:mt-[32px] lg:mt-[59px]">
            {popularWallpapers?.data?.map((item, index) => (
              <div
                onClick={() => openWallpaper(item.slug)}
                key={index}
                className="w-full h-[160px] md:h-[277px] overflow-hidden rounded-[5px] md:rounded-[10px] relative"
              >
                <LazyWallpaper
                  src={item?.wallpaper}
                  alt={item?.wallpaper}
                  maxWidth={600}
                  maxHeight={400}
                  width={600}
                  height={400}
                  className="w-full h-full object-cover rounded-[5px] md:rounded-[10px] hover:scale-110 duration-300 cursor-pointer"
                />
              </div>
            ))}
            {/* <div className="w-full h-[160px] md:h-[277px] overflow-hidden rounded-[5px] md:rounded-[10px]">
              <img
                onClick={() => router.push("/wallpaper")}
                src={img1}
                alt="image"
                className="w-full h-full object-cover rounded-[5px] md:rounded-[10px] hover:scale-110 duration-300 cursor-pointer"
              />
            </div>
            <div className="w-full h-[160px] md:h-[277px] overflow-hidden rounded-[5px] md:rounded-[10px]">
              <img
                onClick={() => router.push("/wallpaper")}
                src={img2}
                alt="image"
                className="w-full h-full object-cover rounded-[5px] md:rounded-[10px] hover:scale-110 duration-300 cursor-pointer"
              />
            </div>
            <div className="w-full h-[160px] md:h-[277px] overflow-hidden rounded-[5px] md:rounded-[10px]">
              <img
                onClick={() => router.push("/wallpaper")}
                src={img3}
                alt="image"
                className="w-full h-full object-cover rounded-[5px] md:rounded-[10px] hover:scale-110 duration-300 cursor-pointer"
              />
            </div> */}
          </div>

          <Link href="/wallpapers">
            <Button className="bg-[#000000] !text-[#ccc] font-bakbak-one text-[12px] w-[97px] h-[32px] rounded-[15px] shadow-none hover:shadow-none normal-case font-normal mt-[22px] text-nowrap !p-0 mx-auto hidden md:block">
              View more
            </Button>
          </Link>
        </div>
      )}
    </>
  );
};

export default YouMayAlsoLike;
