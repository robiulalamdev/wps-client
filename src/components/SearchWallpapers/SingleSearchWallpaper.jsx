/* eslint-disable react/prop-types */
import { useRouter } from "next/router";
import LazyWallpaper from "../common/wallpaper/LazyWallpaper";
// import SeenOverlay from "../common/SeenOverlay";

const SingleSearchWallpaper = ({ item = null }) => {
  const router = useRouter();
  // const [open, setOpen] = useState(item.isFeatured ? true : false);
  return (
    <>
      <div
        onClick={() => router.push(`/w/${item?.slug}`)}
        // onClick={() => (open ? setOpen(false) : router.push(`/w/${item?.slug}`))}
        className={`w-full h-[152px] md:h-[170px] rounded-[5px] md:rounded-[10px] lg:rounded-[15px] overflow-hidden relative`}
      >
        <LazyWallpaper
          src={item?.wallpaper}
          alt={item?.wallpaper}
          maxWidth={400}
          maxHeight={175}
          width={600}
          height={460}
          imgWidth=""
          imgHeight=""
          className="w-full h-full rounded-[5px] md:rounded-[10px] lg:rounded-[15px] object-cover hover:scale-110 duration-300 cursor-pointer"
        />
        {/* {open && <SeenOverlay />} */}
      </div>
    </>
  );
};

export default SingleSearchWallpaper;
