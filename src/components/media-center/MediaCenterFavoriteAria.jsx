/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import MediaCenterFavoriteSingleImage from "./MediaCenterFavoriteSingleImage";

const MediaCenterFavoriteAria = ({
  items,
  selectedItems,
  handleSelectFavoriteWallpapers,
}) => {
  return (
    <div className="flex-grow grid grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-x-[12px] gap-y-[14px] md:gap-x-[30px] md:gap-y-[19px] lg:gap-x-[40px] lg:gap-y-[47px] ">
      {items?.map((wall, index) => (
        <MediaCenterFavoriteSingleImage
          key={index}
          wallpaper={wall}
          selectedItems={selectedItems}
          handleSelectFavoriteWallpapers={handleSelectFavoriteWallpapers}
        />
      ))}
    </div>
  );
};

export default MediaCenterFavoriteAria;
