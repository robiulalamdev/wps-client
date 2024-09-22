/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useContext } from "react";
import { AuthContext } from "../../../../contextApi/AuthContext";
import useViewImage from "../../../../lib/hooks/useViewImage";

const AddMediaFileSelection = ({
  files = [],
  selectedItems = [],
  handleSelectFile,
}) => {
  const { user } = useContext(AuthContext);
  const { viewResizeImg } = useViewImage();
  return (
    <div className="py-[25px] pl-[21px] w-full h-full">
      <div
        className={`w-full h-full bg-[#313131] flex flex-col justify-between rounded-[10px] py-[26px] px-[38px]`}
      >
        <div className="flex-grow h-full w-full">
          <div className="grid grid-cols-3 gap-y-[12px] gap-x-[10px] w-full">
            {files.map((file, index) => {
              const isExist = selectedItems?.some((item) => item === file);
              return (
                <div
                  key={index}
                  onClick={() => handleSelectFile(file)}
                  className={`w-full h-[60px] rounded-[5px] overflow-hidden relative ${
                    isExist ? "border-[1px] border-[#B3FD16]" : ""
                  }`}
                >
                  <img
                    src={viewResizeImg(file?.wallpaper, 150, 70)}
                    alt=""
                    className="w-full h-full rounded-[5px] object-cover hover:scale-110 duration-300 cursor-pointer"
                  />
                </div>
              );
            })}
          </div>
        </div>
        <h1 className="font-bakbak-one text-[12px] font-normal text-white leading-normal text-center">
          Please select one or multiple wallpapers
        </h1>
      </div>
    </div>
  );
};

export default AddMediaFileSelection;
