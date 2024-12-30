/* eslint-disable react/prop-types */
import { useRouter } from "next/router";
import LazyWallpaper from "../common/wallpaper/LazyWallpaper";
import FeaturedOverlay from "../common/FeaturedOverlay";
import Link from "next/link";

const SingleSearchWallpaper = ({ item = null }) => {
  const router = useRouter();
  return (
    <>
      <Link
        href={`/w/${item?.slug}`}
        target="_blank"
        // onClick={() => router.push(`/w/${item?.slug}`)}
        className={`w-full h-[152px] md:h-[170px] rounded-[5px] md:rounded-[10px] lg:rounded-[15px] overflow-hidden relative outline-none focus:outline-none`}
      >
        <LazyWallpaper
          src={item?.wallpaper}
          alt={item?.wallpaper}
          maxWidth={400}
          maxHeight={175}
          width={700}
          height={460}
          imgWidth=""
          imgHeight=""
          className="w-full h-full rounded-[5px] md:rounded-[10px] lg:rounded-[15px] object-cover hover:scale-110 duration-300 cursor-pointer"
        />
        {item?.isFeatured === true && <FeaturedOverlay />}
      </Link>
    </>
  );
};

export default SingleSearchWallpaper;
