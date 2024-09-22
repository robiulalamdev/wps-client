/* eslint-disable react/prop-types */
import LazyWallpaper from "../common/wallpaper/LazyWallpaper";

const MediaCenterFavoriteSingleImage = ({
  wallpaper,
  selectedItems,
  handleSelectFavoriteWallpapers,
}) => {
  const isExist = selectedItems?.some((item) => item?._id === wallpaper?._id);
  return (
    <>
      <div
        onClick={() => handleSelectFavoriteWallpapers(wallpaper)}
        className={`w-full h-[152px] md:h-[138px] overflow-hidden rounded-[10px] relative ${
          isExist ? "border-[2px] border-[#B3FD16]" : ""
        }`}
      >
        <LazyWallpaper
          src={wallpaper.wallpaper?.wallpaper}
          alt={wallpaper.wallpaper?.wallpaper}
          maxWidth={400}
          maxHeight={150}
          width={400}
          height={150}
          className="w-full h-full object-cover hover:scale-110 duration-300 cursor-pointer"
        />
      </div>
    </>
  );
};

export default MediaCenterFavoriteSingleImage;
