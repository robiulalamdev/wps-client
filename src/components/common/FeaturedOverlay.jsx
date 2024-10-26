import React from "react";

const FeaturedOverlay = () => {
  return (
    <div
      className="w-fit h-fit px-[14px] md:px-[18px] py-[8px] absolute top-0 left-0 cursor-pointer rounded-br-[5px] md:rounded-br-[10px] 2xl:rounded-br-[15px]"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.70)",
      }}
    >
      <h1 className="text-white font-lato text-[11px] md:text-[14px] leading-normal font-normal">
        Featured
      </h1>
    </div>
  );
};
export default FeaturedOverlay;
