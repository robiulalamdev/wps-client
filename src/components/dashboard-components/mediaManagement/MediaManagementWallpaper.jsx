/* eslint-disable react/prop-types */
import LazyWallpaper from "../../common/wallpaper/LazyWallpaper";

const MediaManagementWallpaper = ({
  data,
  handleSelectWallpapers,
  selectedItems = [],
}) => {
  const isExist = selectedItems?.some((item) => item?._id === data?._id);
  return (
    <div
      onClick={() => handleSelectWallpapers(data)}
      className={`w-full h-[100px] rounded-[5px] overflow-hidden relative ${
        isExist ? "border-[1px] border-[#B3FD16]" : ""
      }`}
    >
      <LazyWallpaper
        src={data?.wallpaper}
        alt={data?.wallpaper}
        maxWidth={200}
        maxHeight={100}
        width={200}
        height={100}
        className="w-full h-full rounded-[5px] object-cover hover:scale-110 duration-300 cursor-pointer"
      />
    </div>
  );
};

export default MediaManagementWallpaper;
