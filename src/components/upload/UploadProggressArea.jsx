/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import {
  iCheck,
  iChecked,
  iCloseSm,
  iFiledGalary,
  iUploadUp,
} from "../../utils/icons/icons";
import { useSettingsChangeMutation } from "../../redux/features/users/usersApi";
import { handleWallpaperUploadWithProgress } from "../../lib/services/service";
import WPSSpinner from "../common/loadings/WPSSpinner";
import { useGetMyDraftWallpapersQuery } from "../../redux/features/wallpapers/wallpapersApi";
import { useRouter } from "next/router";
import Link from "next/link";

const UploadProggressArea = ({
  step,
  setStep,
  files,
  setFiles,
  upload,
  setUpload,
}) => {
  const [checked, setChecked] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [settingsChange] = useSettingsChangeMutation();

  const { refetch } = useGetMyDraftWallpapersQuery(`?page=${1}&limit=${0}`);

  const router = useRouter();

  const handleClose = (index) => {
    let data = [...files];
    data.splice(index, 1);
    setFiles([...data]);
  };

  const handleUpload = async () => {
    setStep(3);
    setUploadLoading(true);
    if (files?.length > 0) {
      await handleWallpaperUploadWithProgress(files, setFiles);
    }
    setUploadLoading(false);
    refetch();
    setUpload(true);
  };
  // setUpload(false);
  const handleAcceptCr = async () => {
    const options = {
      data: { acceptCommunityRules: true },
    };
    await settingsChange(options);
  };

  // console.log(user);
  return (
    <div className="md:pl-[26px] h-full w-full">
      {step === 1 && (
        <div className="w-full h-full">
          <h1 className="text-[#FFF] text-[12px] md:text-[15px] text-center mt-[26px] md:mt-0">
            Accept to Continue
          </h1>

          <p className="text-[#FFF] text-[10px] md:text-[12px] font-bakbak-one text-left mt-[15px] md:mt-[117px]">
            We are delighted that you've chosen to join our community. To ensure
            the highest quality of our wallpapers and maintain the integrity of
            our site, we request that you review our community rules before
            proceeding. Your cooperation is greatly appreciated.
          </p>

          <Link href="/community-rules">
            <h1 className="text-center font-bakbak-one text-[12px] md:text-[15px] text-[#FF2E00] mt-[13px] md:mt-[53px]">
              Click to Read the Community Rules
            </h1>
          </Link>

          <div className="mt-[46px] md:mt-[137px]">
            <div className="flex items-center gap-x-[7px] cursor-pointer">
              <div
                onClick={() => setChecked(!checked)}
                className="bg-[#D9D9D9] rounded-[2px] size-[15px]"
              >
                {checked ? iChecked : iCheck}
              </div>

              <h1 className="text-[12px] text-[#FFF] font-bakbak-one">
                I confirm I've read the community rules and want to continue.
              </h1>
            </div>
            <div className="border-t-[1px] border-[#5A5A5A] mt-[12px] mb-[32px] hidden md:block"></div>

            <div
              onClick={() => {
                handleAcceptCr();
                setStep(checked ? 2 : 1);
              }}
              className={`${
                checked ? "bg-[#2924FF]" : "bg-[#5A5A5A]"
              } w-[129px] h-[38px] rounded-[5px] text-[#C4C4C4] text-[15px] font-bakbak-one mt-[45px] md:mt-[32px] flex justify-center items-center mx-auto cursor-pointer`}
            >
              Continue
            </div>
          </div>
        </div>
      )}
      {step >= 2 && (
        <div className="w-full h-full flex flex-col justify-between">
          {step === 2 && (
            <div>
              <h1 className="text-[15px] text-center text-[#FFF] mt-[12px] md:mt-0">
                Files
              </h1>

              <div className="mt-[20px] max-w-[250px] mx-auto max-h-[340px] overflow-y-auto h-fit">
                <>
                  {files.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-x-[7px] mt-[22px]"
                    >
                      <div className="min-w-[24px] min-h-[24px] max-h-[24px] max-w-[24px]">
                        {iFiledGalary}
                      </div>
                      <p className="oneLine text-[#FFF] text-[12px] font-bakbak-one">
                        {file?.name}
                      </p>
                      <div
                        disabled={uploadLoading}
                        onClick={() => handleClose(index)}
                      >
                        {iCloseSm}
                      </div>
                    </div>
                  ))}
                </>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h1 className="text-[15px] text-center text-[#FFF] mt-[12px] md:mt-0">
                Files
              </h1>

              <div className="mt-[20px] max-w-[250px] mx-auto max-h-[340px] overflow-y-auto h-fit">
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-x-[7px] mt-[22px]"
                  >
                    <div className="min-w-[24px] min-h-[24px] max-h-[24px] max-w-[24px]">
                      {iFiledGalary}
                    </div>
                    <div className="bg-[#D9D9D9] w-full max-w-full h-[10px] rounded-[100px] overflow-hidden">
                      <div
                        className="h-full rounded-[100px] transition-all duration-500"
                        style={{
                          background: `linear-gradient(268deg, #FDF516 17.83%, #97FD16 51.91%)`,
                          boxShadow:
                            "0px 3px 12px 0px rgba(253, 245, 22, 0.15)",
                          width: file.progress ? `${file.progress}%` : "0%",
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="">
            <h1 className="text-[12px] text-[#FFF] font-bakbak-one text-center">
              {upload
                ? "Upload complete"
                : `There are ${files?.length} files pending for upload`}
            </h1>
            <div className="border-t-[1px] border-[#5A5A5A] mt-[32px] mb-[32px] hidden md:block"></div>

            <div className="flex justify-center items-center gap-x-[23px] mt-[45px] md:mt-[32px] mb-2">
              {!upload && (
                <button
                  onClick={() => files?.length > 0 && handleUpload()}
                  disabled={files.length < 1 || uploadLoading}
                  className={`${
                    files.length > 0 ? "bg-[#2924FF]" : "bg-[#5A5A5A]"
                  } w-[129px] h-[38px] rounded-[5px] text-[#C4C4C4] text-[15px] font-bakbak-one  md:flex justify-center items-center cursor-pointer flex gap-[5px] outline-none`}
                >
                  {uploadLoading && (
                    <WPSSpinner className="max-w-[15px] text-white" />
                  )}
                  Upload {iUploadUp}
                </button>
              )}

              {upload && (
                <div
                  onClick={() => router.push("/vault")}
                  className={`bg-[#DD2E44] w-[129px] h-[38px] rounded-[5px] text-[#C4C4C4] text-[15px] font-bakbak-one flex justify-center items-center cursor-pointer`}
                >
                  Continue
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadProggressArea;
