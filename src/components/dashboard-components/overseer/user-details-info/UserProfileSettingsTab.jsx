/* eslint-disable react/prop-types */
import React, { useMemo, useRef, useState } from "react";
import useViewImage from "../../../../lib/hooks/useViewImage";
import { DefaultProfile } from "../../../../lib/data/globalData";
import bannerImg from "../../../../assets/images/profile-settings/banner.png";
import { validateImageSize } from "../../../../lib/services/service";
import { toast } from "react-toastify";
import { Button } from "@material-tailwind/react";
import { SpinnerCircularFixed } from "spinners-react";
import { useModifyProfileSettingsInfoMutation } from "../../../../redux/features/users/usersApi";

const UserProfileSettingsTab = ({ user, setUser }) => {
  const [image, setImage] = useState(null);
  const [banner, setBanner] = useState(null);
  const { viewResizeImg } = useViewImage();

  const [pVisiblity, setPVisiblity] = useState("Visible");
  const [nsfw, setNsfw] = useState("Enabled");
  const [messaging, setMessaging] = useState("Enabled");

  const [modifyProfileSettingsInfo, { isLoading }] =
    useModifyProfileSettingsInfoMutation();

  const imageRef = useRef();
  const bannerRef = useRef();

  const handleProfileImageInput = async (image) => {
    if (image) {
      const result = await validateImageSize(image, 5);
      if (result?.success) {
        setImage(image);
      } else {
        toast.warning(result?.message);
      }
    }
    imageRef.current.value = null;
  };

  const handleBannerImageInput = async (image) => {
    if (image) {
      const result = await validateImageSize(image, 10);
      if (result?.success) {
        setBanner(image);
      } else {
        toast.warning(result?.message);
      }
    }
    bannerRef.current.value = null;
  };

  const handleSave = async () => {
    const formData = new FormData();

    if (banner) {
      formData.append("banner", banner);
    }
    if (image) {
      formData.append("profile_image", image);
    }

    if (pVisiblity) {
      formData.append("profile_visibility", pVisiblity);
    }

    if (nsfw) {
      formData.append("nsfw", nsfw);
    }
    if (messaging) {
      formData.append("messaging", messaging);
    }

    const options = {
      id: user?._id,
      data: formData,
    };
    const result = await modifyProfileSettingsInfo(options);
    if (result?.data?.success) {
      toast.success("Profile update successfully");
      if (result?.data?.data) {
        setUser(result?.data?.data);
      }
    } else {
      toast.error("Profile update unSuccessfully");
    }
  };

  useMemo(() => {
    if (user && user?.profile && user?.settings) {
      setMessaging(user?.settings?.messaging === true ? "Enabled" : "Disabled");
      setNsfw(user?.settings?.nsfw === true ? "Enabled" : "Disabled");
      setPVisiblity(
        user?.settings?.profile_visibility === true ? "Visible" : "Hidden"
      );
    }
  }, [user]);
  return (
    <>
      <h1 className="font-lato font-bold text-[20px] text-[#313131] pl-[14px] pt-[29px]">
        Profile Settings
      </h1>
      <div className="max-w-[425px] mx-auto w-full h-fit mt-[12px]">
        <div className="size-[87px] rounded-full bg-[#00000080] flex justify-center items-center mx-auto">
          <img
            src={
              viewResizeImg(image || user?.profile?.profile_image, 85, 85) ||
              DefaultProfile
            }
            alt=""
            className="size-[75px] rounded-full object-cover"
          />
        </div>
        <h1
          onClick={() => imageRef.current.click()}
          className="font-lato font-normal leading-normal text-[15px] text-[#313131] mt-[14px] text-center cursor-pointer"
        >
          Change Profile Avatar
        </h1>
        <input
          ref={imageRef}
          type="file"
          accept=".png, .jpg, .jpeg"
          multiple={false}
          onChange={(e) => handleProfileImageInput(e.target.files[0])}
          className="hidden"
        />

        <img
          src={
            viewResizeImg(
              banner || user?.profile?.banner,
              232,
              34,
              "contain"
            ) || bannerImg
          }
          alt=""
          className="mt-[34px] mx-auto w-[232px] h-[34px] object-contain rounded-[5px]"
        />

        <input
          ref={bannerRef}
          type="file"
          accept=".png, .jpg, .jpeg"
          multiple={false}
          onChange={(e) => handleBannerImageInput(e.target.files[0])}
          className="hidden"
        />
        <h1
          onClick={() => bannerRef.current.click()}
          className="font-lato font-normal leading-normal text-[15px] text-[#313131] mt-[14px] text-center cursor-pointer"
        >
          Change Profile Banner
        </h1>

        <div className="mt-[27px] grid grid-cols-2 gap-y-[25px] max-w-[425px] mx-auto">
          <div className="flex flex-col items-center">
            <h1 className="font-lato font-normal leading-normal text-[15px] text-[#313131] mt-[14px] ">
              Profile Visibility
            </h1>
            <div className="mt-[29px] bg-[#00000033] w-[172px] h-[45px] rounded-[100px] flex justify-between items-center px-[7px]">
              {["Visible", "Hidden"].map((item, index) => (
                <Button
                  onClick={() => setPVisiblity(item)}
                  key={index}
                  className={`w-[60px] h-[33px] rounded-[100px] p-0 shadow-none hover:shadow-none normal-case
                  text-[12px] font-lato
                  ${
                    item === pVisiblity
                      ? "bg-[#0AB745] text-white "
                      : "bg-transparent text-[#313131]"
                  }
                  `}
                >
                  {item}
                </Button>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-center">
            <h1 className="font-lato font-normal leading-normal text-[15px] text-[#313131] mt-[14px]">
              NSFW
            </h1>
            <div className="mt-[29px] bg-[#00000033] w-[172px] h-[45px] rounded-[100px] flex justify-between items-center px-[6px]">
              {["Enabled", "Disabled"].map((item, index) => (
                <Button
                  onClick={() => setNsfw(item)}
                  key={index}
                  className={`w-[64px] h-[33px] rounded-[100px] p-0 shadow-none hover:shadow-none normal-case
                  text-[12px] font-lato
                  ${
                    item === nsfw
                      ? "bg-[#0AB745] text-white "
                      : "bg-transparent text-[#313131]"
                  }
                  `}
                >
                  {item}
                </Button>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-center">
            <h1 className="font-lato font-normal leading-normal text-[15px] text-[#313131] mt-[14px]">
              Messaging
            </h1>
            <div className="mt-[29px] bg-[#00000033] w-[172px] h-[45px] rounded-[100px] flex justify-between items-center px-[6px]">
              {["Enabled", "Disabled"].map((item, index) => (
                <Button
                  onClick={() => setMessaging(item)}
                  key={index}
                  className={`w-[64px] h-[33px] rounded-[100px] p-0 shadow-none hover:shadow-none normal-case
                  text-[12px] font-lato
                  ${
                    item === messaging
                      ? "bg-[#0AB745] text-white "
                      : "bg-transparent text-[#313131]"
                  }
                  `}
                >
                  {item}
                </Button>
              ))}
            </div>
          </div>
        </div>
        <Button
          disabled={isLoading}
          onClick={() => handleSave()}
          className="w-[154px] h-[39px] bg-[#313131] normal-case rounded-[5px] text-white font-lato text-[15px] font-medium flex justify-center items-center gap-2 shadow-none hover:shadow-none mt-[56px] mx-auto"
        >
          {isLoading && (
            <SpinnerCircularFixed
              size={20}
              thickness={180}
              speed={300}
              color="rgba(255, 255, 255, 1)"
              secondaryColor="rgba(255, 255, 255, 0.42)"
            />
          )}{" "}
          <h1>{isLoading ? "Saving..." : "Save Changes"}</h1>
        </Button>
      </div>
    </>
  );
};

export default UserProfileSettingsTab;
