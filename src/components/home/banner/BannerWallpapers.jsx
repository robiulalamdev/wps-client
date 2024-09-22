/* eslint-disable react/prop-types */
import LazyWallpaper from "../../common/wallpaper/LazyWallpaper";
import { useRouter } from "next/router";
// import SeenOverlay from "../../common/SeenOverlay";

const BannerWallpapers = ({ item = null }) => {
  const router = useRouter();
  // const [open, setOpen] = useState(item.isFeatured ? true : false);
  return (
    <>
      <div
        onClick={() => router.push(`/w/${item?.slug}`)}
        // onClick={() => (open ? setOpen(false) : router.push(`/w/${item?.slug}`))}
        className="w-full h-[152px] 2xl:h-[190px] overflow-hidden relative rounded-[5px] md:rounded-[10px] 2xl:rounded-[15px]"
      >
        <LazyWallpaper
          src={item?.wallpaper}
          alt={item?.wallpaper}
          maxWidth={400}
          maxHeight={190}
          width={500}
          height={320}
          // maxWidth={400}
          // maxHeight={220}
          // width={20}
          // height={8}
          className="w-full h-full object-cover hover:scale-110 rounded-[5px] md:rounded-[10px] 2xl:rounded-[15px] duration-300 cursor-pointer"
        />
        {/* {open && <SeenOverlay />} */}
      </div>
    </>
  );
};

export default BannerWallpapers;
