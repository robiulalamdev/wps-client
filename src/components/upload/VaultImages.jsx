/* eslint-disable react/prop-types */
import LazyWallpaper from "../common/wallpaper/LazyWallpaper";

const VaultImages = ({ images, selectedImages, handleSelectImages }) => {
  return (
    <>
      <div className="grid grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-y-[12px] md:gap-y-[23px] gap-x-[14px] md:gap-x-[40px] w-full h-full">
        {images?.map((item, index) => (
          <div
            onClick={() => handleSelectImages(item)}
            key={index}
            className={`w-full h-[138px] rounded-[10px] overflow-hidden relative ${
              selectedImages.find((sItem) => sItem?._id === item?._id)
                ? "border-[2px] border-[#B3FD16]"
                : ""
            }`}
          >
            <LazyWallpaper
              src={item?.wallpaper}
              alt={item?.wallpaper}
              maxWidth={200}
              maxHeight={150}
              width={350}
              height={250}
              className="w-full h-full object-cover rounded-[10px] hover:scale-110 duration-300 cursor-pointer"
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default VaultImages;
