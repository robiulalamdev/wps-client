/* eslint-disable react/prop-types */
import { Button } from "@material-tailwind/react";
import { iDashUpload } from "../../../../utils/icons/dashboard-icons/dashicons";
import { iCloseSm, iDashFiledGallery } from "../../../../utils/icons/icons";
import { useState } from "react";
import WPSSpinner from "../../../common/loadings/WPSSpinner";
import { handleWallpaperUploadWithProgress } from "../../../../lib/services/service";
import { useGetMyDraftWallpapersQuery } from "../../../../redux/features/wallpapers/wallpapersApi";

// eslint-disable-next-line no-unused-vars
const AddMediaUploadProgress = ({ upload, setUpload, files, setFiles }) => {
  const { refetch } = useGetMyDraftWallpapersQuery(`?page=${1}&limit=${0}`);
  const handleClose = (index) => {
    let data = [...files];
    data.splice(index, 1);
    setFiles([...data]);
  };

  const [uploadStep, setUploadStep] = useState(1);
  const [uploadLoading, setUploadLoading] = useState(false);

  const handleUpload = async () => {
    if (uploadStep === 1) {
      setUploadStep(2);
    }
    setUploadLoading(true);
    if (files?.length > 0) {
      const result = await handleWallpaperUploadWithProgress(files, setFiles);
      if (result?.results?.length > 0) {
        setFiles([...result.results]);
      }
    }
    setUploadLoading(false);
    refetch();
    setUpload(true);
  };

  return (
    <div className="w-full h-full py-[37px]">
      <div className="flex flex-col justify-between w-full h-full">
        <div className="flex-grow">
          <h1 className="text-[15px] text-center text-[#313131] font-lato leading-normal font-normal mt-[12px] md:mt-0">
            Files
          </h1>
          {uploadStep === 1 && (
            <div className="mt-[10px] max-w-[390px] mx-auto max-h-[500px] overflow-y-auto h-fit">
              {files.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center gap-x-[7px] mt-[15px]"
                >
                  <div className="min-w-[24px] min-h-[24px]">
                    {iDashFiledGallery}
                  </div>
                  <p className="oneLine !text-left inline text-[#313131] text-[12px] font-bakbak-one">
                    {file?.name}
                  </p>
                  <div
                    disabled={uploadLoading}
                    onClick={() => handleClose(index)}
                    className="cursor-pointer"
                  >
                    {iCloseSm}
                  </div>
                </div>
              ))}
            </div>
          )}

          {uploadStep === 2 && (
            <div className="mt-[10px] max-w-[390px] mx-auto max-h-[500px] overflow-y-auto h-fit">
              {files.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center gap-x-[7px] mt-[22px]"
                >
                  <div className="min-w-[24px] min-h-[24px] max-h-[24px] max-w-[24px]">
                    {iDashFiledGallery}
                  </div>
                  <div className="bg-[#0000006b] w-full max-w-full h-[10px] rounded-[100px] overflow-hidden">
                    <div
                      className="h-full rounded-[100px] transition-all duration-500"
                      style={{
                        background: `linear-gradient(268deg, #FDF516 17.83%, #97FD16 51.91%)`,
                        boxShadow: "0px 3px 12px 0px rgba(253, 245, 22, 0.15)",
                        width: file.progress ? `${file.progress}%` : "0%",
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div>
          <h1 className="text-center text-[#313131] font-bakbak-one text-[12px] leading-normal">
            There are {files?.length} files pending for upload
          </h1>
          <div className="h-[1px] !bg-[#5A5A5A] mt-[32px] max-w-[390px] mx-auto w-full"></div>
          <Button
            onClick={() => files?.length > 0 && handleUpload()}
            disabled={files.length < 1 || uploadLoading}
            className="w-[129px] h-[38px] bg-[#5A5A5A] rounded-[5px] shadow-none hover:shadow-none text-[#C4C4C4] font-bakbak-one text-[15px] font-normal leading-normal p-0 normal-case mt-[32px] mx-auto block flex items-center justify-center"
          >
            {uploadLoading && (
              <WPSSpinner className="max-w-[15px] text-white mr-[2px]" />
            )}
            Upload {iDashUpload}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddMediaUploadProgress;
