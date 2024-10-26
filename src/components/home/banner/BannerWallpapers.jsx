/* eslint-disable react/prop-types */
import LazyWallpaper from "../../common/wallpaper/LazyWallpaper";
import { useRouter } from "next/router";
import FeaturedOverlay from "@/components/common/FeaturedOverlay";

const BannerWallpapers = ({ item = null }) => {
  const router = useRouter();
  return (
    <>
      <div
        onClick={() => router.push(`/w/${item?.slug}`)}
        className="w-full h-[152px] 2xl:h-[190px] overflow-hidden relative rounded-[5px] md:rounded-[10px] 2xl:rounded-[15px]"
      >
        <LazyWallpaper
          src={item?.wallpaper}
          alt={item?.wallpaper}
          maxWidth={400}
          maxHeight={190}
          width={500}
          height={320}
          className="w-full h-full object-cover hover:scale-110 rounded-[5px] md:rounded-[10px] 2xl:rounded-[15px] duration-300 cursor-pointer"
        />
        {item?.isFeatured === true && <FeaturedOverlay />}
      </div>
    </>
  );
};

export default BannerWallpapers;
