/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useCallback, useContext, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import { AuthContext } from "../../../../contextApi/AuthContext";
import { iUpload } from "../../../../utils/icons/icons";

const AddMediaInputField = ({ step, setStep, files, setFiles, upload }) => {
  const { user } = useContext(AuthContext);

  const onUpload = useCallback(
    async (acceptedFiles) => {
      if (acceptedFiles) {
        if (files.length >= 15) {
          toast.warning("Maximum 15 wallpapers can be uploaded");
          return;
        } else {
          if (files.length + acceptedFiles.length > 15) {
            toast.warning("Wallpapers Upload Maximum 15");
            return;
          } else {
            const MAX_FILE_SIZE = 20 * 1024 * 1024;
            let isSuccess = true;
            for (let i = 0; i < acceptedFiles.length; i++) {
              const imageFile = acceptedFiles[i];
              if (imageFile.size > MAX_FILE_SIZE) {
                isSuccess = false;
                break;
              }
            }
            if (isSuccess) {
              const merge = [...files, ...acceptedFiles];
              setFiles(merge);
            } else {
              toast.warning(
                "Max upload size is 20MB. Please use a smaller file."
              );
              return;
            }
          }
        }
      }
    },
    [files] // Add files to the dependency array
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onUpload,
    accept: {
      "image/*": [".jpeg", ".png", ".jpg"],
    },
  });
  return (
    <div className="py-[25px] pl-[21px] w-full h-full">
      <div
        {...(!upload && getRootProps())}
        disabled={upload}
        className={`w-full h-full bg-[#313131] rounded-[10px] flex flex-col justify-center items-center gap-[12px] 
              ${isDragActive ? "border border-green-600" : ""}
              `}
      >
        <div className="size-[30px]">{iUpload}</div>
        <h1 className="text-[15px] font-bakbak-one text-[#FFF]">
          Drag and drop files here
        </h1>
        <h1 className="text-[15px] font-bakbak-one text-[#FFF]">or</h1>
        <button
          disabled={upload}
          className="w-[103px] h-[28px] bg-[#000000] bg-opacity-[0.5] rounded-[10px] font-bakbak-one text-[12px] text-[#939393]"
        >
          Select Files
        </button>

        <input
          {...getInputProps()}
          disabled={upload}
          type="file"
          accept=".png, .jpg, .jpeg"
          multiple={true}
          className="hidden"
        />
      </div>
    </div>
  );
};

export default AddMediaInputField;
