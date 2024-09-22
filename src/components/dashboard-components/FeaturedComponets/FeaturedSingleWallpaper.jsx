/* eslint-disable react/prop-types */
import LazyWallpaper from "../../common/wallpaper/LazyWallpaper";

const FeaturedSingleWallpaper = ({ data }) => {
  return (
    <>
      <div className={`w-full h-[115px] rounded-[5px] relative`}>
        <LazyWallpaper
          src={data?.wallpaper}
          alt={data?.wallpaper}
          maxWidth={240}
          maxHeight={115}
          width={240}
          height={115}
          className="w-full h-full rounded-[5px] object-cover cursor-pointer"
        />
      </div>
    </>
  );
};

export default FeaturedSingleWallpaper;
