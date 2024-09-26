/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import MediaCenterSingleCollection from "./MediaCenterSingleCollection";

const MediaCenterCollectionAria = ({
  items = [],
  selectedItems = [],
  handleSelectCollectionWallpapers,
}) => {
  return (
    <div className="flex-grow grid grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-x-[14px] gap-y-[19px] md:gap-x-[32px] md:gap-y-[24px] lg:gap-x-[41px] lg:gap-y-[34px]">
      {items.map((item, index) => (
        <MediaCenterSingleCollection
          key={index}
          data={item}
          selectedItems={selectedItems}
          handleSelectCollectionWallpapers={handleSelectCollectionWallpapers}
        />
      ))}
    </div>
  );
};

export default MediaCenterCollectionAria;
