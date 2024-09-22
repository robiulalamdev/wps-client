/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Button, Dialog } from "@material-tailwind/react";
import React, { useMemo, useState } from "react";
import { idashClose } from "../../../../utils/icons/dashboard-icons/dashicons";
import AddMediaInputField from "./AddMediaInputField";
import AddMediaEditArea from "./AddMediaEditArea";
import AddMediaFileSelection from "./AddMediaFileSelection";
import AddMediaUploadProgress from "./AddMediaUploadProgress";

const AddMediaPopup = ({ open, onClose }) => {
  const [step, setStep] = useState(1);
  const [files, setFiles] = useState([]);
  const [upload, setUpload] = useState(false);
  const [selectedWallpapers, setSelectedWallpapers] = useState([]);

  const handleSelectFile = (item) => {
    const itemIndex = selectedWallpapers.findIndex((sItem) => sItem === item);
    if (itemIndex !== -1) {
      setSelectedWallpapers(
        selectedWallpapers.filter((sItem) => sItem !== item)
      );
    } else {
      setSelectedWallpapers([...selectedWallpapers, item]);
    }
  };

  const handleClose = () => {
    onClose();
    setStep(1);
    setUpload(false);
    setSelectedWallpapers([]);
    setFiles([]);
  };

  useMemo(() => {
    if (files?.length < 1) {
      setUpload(false);
    }
  }, [files]);

  // console.log(upload);
  return (
    <Dialog
      open={!!open}
      className="bg-transparent p-0 shadow-none border-none flex justify-center items-center"
    >
      <div className="min-w-[1001px] max-w-[1001px] max-h-fit min-h-[800px] bg-[#D5D5D5] rounded-[10px] relative">
        {step === 1 && (
          <div className="grid grid-cols-2 w-full h-full min-h-[800px]">
            {files.length > 0 && !!upload ? (
              <AddMediaFileSelection
                files={files}
                selectedItems={selectedWallpapers}
                handleSelectFile={handleSelectFile}
              />
            ) : (
              <AddMediaInputField
                step={step}
                setStep={setStep}
                files={files}
                setFiles={setFiles}
                upload={upload}
              />
            )}
            {upload && files?.length > 0 && selectedWallpapers?.length > 0 && (
              <AddMediaEditArea
                files={files}
                setStep={setStep}
                selectedImages={selectedWallpapers}
                setSelectedWallpapers={setSelectedWallpapers}
                setFiles={setFiles}
                setUpload={setUpload}
              />
            )}
            {!upload && (
              <AddMediaUploadProgress
                files={files}
                setStep={setStep}
                setFiles={setFiles}
                upload={upload}
                setUpload={setUpload}
              />
            )}
          </div>
        )}
        {step === 2 && (
          <div className="flex flex-col justify-between items-center w-full h-full min-h-[750px] pb-[84px]">
            <span></span>
            <h1 className="font-lato text-[20px] text-center font-medium leading-normal text-[#000000]">
              All wallpapers have been successfully uploaded
            </h1>
            <Button
              onClick={() => handleClose()}
              className="w-[154px] h-[39px] bg-[#313131] rounded-[5px] shadow-none hover:shadow-none text-white font-lato text-[15px] font-medium leading-normal p-0 normal-case"
            >
              Close
            </Button>
          </div>
        )}
        <div
          onClick={() => handleClose()}
          className="absolute top-[13px] right-[15px] cursor-pointer"
        >
          {idashClose}
        </div>
      </div>
    </Dialog>
  );
};

export default AddMediaPopup;
