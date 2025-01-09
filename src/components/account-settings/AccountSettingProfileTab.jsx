import { useContext, useMemo, useRef, useState } from "react";
import bannerImg from "../../assets/images/profile-settings/banner.png";
import info from "../../assets/icons/profile-settings/info.png";
import { Button } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../contextApi/AuthContext";
import { useUpdateProfileTabInfoMutation } from "../../redux/features/users/usersApi";
import { SpinnerCircularFixed } from "spinners-react";
import useViewImage from "../../lib/hooks/useViewImage";
import { toast } from "react-toastify";
import { DefaultProfile, socialLinkItems } from "../../lib/data/globalData";
import { validateImageSize } from "../../lib/services/service";
import { FIELD_VALIDATIONS } from "../../lib/config";
import { useRouter } from "next/router";

const AccountSettingProfileTab = () => {
  const { user } = useContext(AuthContext);
  const {
    handleSubmit,
    register,
    setError,
    setValue,
    formState: { errors },
  } = useForm();
  const [updateProfileTabInfo, { isLoading }] =
    useUpdateProfileTabInfoMutation();

  const router = useRouter();

  const { viewImg } = useViewImage();

  const [image, setImage] = useState(null);
  const [banner, setBanner] = useState(null);
  const [selectedSocial, setSelectedSocial] = useState(null);
  const [linkValue, setLinkValue] = useState("");

  const imageRef = useRef();
  const bannerRef = useRef();

  const handleUpdate = async (data) => {
    const formData = new FormData();
    if (data?.username) {
      formData.append("username", data?.username);
    }

    formData.append("bio", data?.bio);
    if (image) {
      formData.append("profile_image", image);
    }
    if (banner) {
      formData.append("banner", banner);
    }
    const socials = {
      twitter: user?.profile?.socials?.twitter,
      behance: user?.profile?.socials?.behance,
      dribbble: user?.profile?.socials?.dribbble,
      instagram: user?.profile?.socials?.instagram,
      discord: user?.profile?.socials?.discord,
      threads: user?.profile?.socials?.threads,
      reddit: user?.profile?.socials?.reddit,
      twitch: user?.profile?.socials?.twitch,
    };

    if (selectedSocial?.name) {
      socials[selectedSocial?.name] = linkValue;
      formData.append("socials", JSON.stringify(socials));
    }

    const options = {
      data: formData,
    };

    const result = await updateProfileTabInfo(options);
    if (result?.data?.success) {
      setBanner(null);
      setImage(null);
      toast.success(result?.data?.message);
    } else {
      if (result?.data?.type === "username") {
        setError("username", {
          type: "manual",
          message: result?.data?.message,
        });
      }
    }
    if (result?.error?.data?.type === "email") {
      // alert(result?.error?.data?.message);
    }
  };

  useMemo(() => {
    if (user) {
      setValue("username", user?.username);
      setValue("bio", user?.profile?.bio);

      if (user?.profile?.socials) {
        setSelectedSocial({ name: "twitter" });
        setLinkValue(user?.profile?.socials?.twitter);
      }
    }
  }, [user]);

  const handleSelectSocial = async (social) => {
    if (social?.length > 0) {
      if (social[0] !== selectedSocial?.name) {
        const value = user?.profile?.socials[social[0]];
        setLinkValue(value);
        setSelectedSocial({ name: social[0] });
      }
    }
  };

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

  return (
    <div className="relative">
      <h1
        className="text-center font-lato text-[12px] flex-grow pt-[39px]"
        style={{ color: "rgba(255, 255, 255, 0.50)" }}
      >
        Avatar size is 125x125 pixels, with a maximum file size not exceeding
        5MB.
      </h1>
      <div className="hidden md:block min-w-[147px] max-w-[147px] absolute top-[27px] right-[41px]">
        {user?.verification_status === false && (
          <Button
            onClick={() => router.push("/account-verification")}
            className="font-normal normal-case bg-[#00000080] backdrop-blur w-[147px] h-[38px] rounded-[100px] hover:shadow-none shadow-none font-lato text-[12px] text-[#FFFFFF80] p-0 hidden md:block"
          >
            Request Verification
          </Button>
        )}
      </div>
      <div className="rounded-full size-[80px] flex justify-center items-center bg-[#00000033] mx-auto mt-[12px] md:mt-[17px]">
        <img
          src={viewImg(image || user?.profile?.profile_image) || DefaultProfile}
          alt="profile"
          className="size-[70px] rounded-full object-cover"
        />
      </div>

      <div className="flex justify-center">
        <h1
          onClick={() => imageRef.current.click()}
          className="font-lato text-[15px] text-[#2555FF] mt-[12px] text-center cursor-pointer inline-block"
        >
          Change Profile Avatar
        </h1>
      </div>
      <input
        ref={imageRef}
        type="file"
        accept=".png, .jpg, .jpeg"
        multiple={false}
        onChange={(e) => handleProfileImageInput(e.target.files[0])}
        className="hidden"
      />

      <h1
        className="font-lato text-[12px] text-[#FFFFFF80] mt-[37px] text-center"
        style={{ color: "rgba(255, 255, 255, 0.50)" }}
      >
        Banner size is 1747 x 300 pixels. Ensure that your banner meets this
        size for optimal display, and please note that the maximum file size
        allowed is 10MB.
      </h1>

      <img
        src={viewImg(banner || user?.profile?.banner) || bannerImg}
        alt="profile"
        className="rounded-[5px] w-[232px] h-[40px] mx-auto mt-[16px] md:mt-[17px] object-contain"
      />
      <div className="flex justify-center">
        <h1
          onClick={() => bannerRef.current.click()}
          className="font-lato text-[15px] text-[#2555FF] mt-[11px] text-center cursor-pointer inline-block"
        >
          Change Profile Banner
        </h1>
      </div>

      <input
        ref={bannerRef}
        type="file"
        accept=".png, .jpg, .jpeg"
        multiple={false}
        onChange={(e) => handleBannerImageInput(e.target.files[0])}
        className="hidden"
      />

      <form onSubmit={handleSubmit(handleUpdate)}>
        <div className="mt-[38px] max-w-[264px] mx-auto flex flex-col items-center w-full">
          <div>
            <h1 className="text-[15px] font-lato text-center text-[#FFF]">
              Username{" "}
            </h1>
            <div className="h-[34px] flex items-center gap-x-[7px] mt-[16px]">
              <input
                {...register("username", {
                  required: "Username is required",
                  ...FIELD_VALIDATIONS.USERNAME_VALIDATION,
                })}
                type="text"
                className="w-full h-full flex-grow max-w-[218px] bg-[#00000080] outline-none rounded-[30px] px-[18px] font-bakbak-one placeholder:text-[12px] placeholder:font-bakbak-one text-[#FFFFFF80] placeholder:text-[#FFFFFF80]"
                placeholder="KRS"
                required={true}
              />
              <img src={info.src} alt="profile" className="size-[18px]" />
            </div>
            {errors?.username && (
              <h1 className="font-lato text-[10px] text-[#fd0303] mt-[5px] text-center">
                {errors?.username?.message}
              </h1>
            )}
          </div>
          <div className="mt-[16px] w-full">
            <h1 className="text-[15px] font-lato text-center text-[#FFF]">
              Bio{" "}
            </h1>

            <textarea
              {...register("bio", { required: false })}
              type="text"
              required={false}
              className="w-full min-w-[264px] max-w-[264px] h-[76px] bg-[#00000080] outline-none rounded-[10px] px-[18px] py-[9px] font-bakbak-one placeholder:text-[12px] placeholder:font-bakbak-one text-[#FFFFFF80] placeholder:text-[#FFFFFF80] mt-[13px]"
              placeholder="Write a small bio about you..."
            ></textarea>
          </div>
        </div>

        <h1 className="text-[15px] font-lato text-center text-[#FFF] mt-[17px]">
          Social Links
        </h1>

        <div className="flex justify-center items-center flex-wrap mt-[21px] md:mt-[16px] gap-[20px]">
          {Object.entries(socialLinkItems)?.map((item, index) => (
            <div
              onClick={() => handleSelectSocial(item)}
              key={index}
              className={`w-[30px] min-h-[40px] h-[40px] flex justify-center items-center border-b-[4px] cursor-pointer 
              ${
                selectedSocial?.name === item[0]
                  ? "border-green-600"
                  : "border-transparent hover:border-green-600 duration-100"
              }`}
            >
              <img
                src={item[1].icon.src}
                alt="icon"
                className="max-w-[25px] object-contain"
              />
            </div>
          ))}
        </div>

        <div className="mt-[22px] md:mt-[27px] max-w-[264px] mx-auto pb-[35px]">
          <input
            onChange={(e) => setLinkValue(e.target.value)}
            type="url"
            value={linkValue}
            required={false}
            className="w-full h-[35px] bg-[#00000080] outline-none rounded-[10px] px-[18px] font-bakbak-one placeholder:text-[12px] placeholder:font-bakbak-one text-[#FFFFFF80] placeholder:text-[#FFFFFF80]"
            placeholder="Type link here..."
          />

          {user?.verification_status === false && (
            <Button
              type="button"
              onClick={() => router.push("/account-verification")}
              className="font-normal normal-case bg-[#00000080] w-[147px] h-[38px] rounded-[100px] mx-auto mt-[47px] hover:shadow-none shadow-none font-lato text-[12px] text-[#FFFFFF80] block p-0 md:hidden"
            >
              Request Verification
            </Button>
          )}

          <Button
            type="submit"
            disabled={isLoading}
            className="font-normal normal-case bg-[#2924FF] w-[129px] h-[38px] rounded-[5px] mx-auto mt-[29px] hover:shadow-none shadow-none font-bakbak-one text-[15px] text-[#C4C4C4] inline-block p-0 flex items-center justify-center gap-2"
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
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AccountSettingProfileTab;
