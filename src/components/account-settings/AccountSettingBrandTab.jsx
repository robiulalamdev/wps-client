/* eslint-disable no-unused-vars */
import { useContext, useMemo, useRef, useState } from "react";
import bannerImg from "../../assets/images/profile-settings/banner.png";
import { Button } from "@material-tailwind/react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useUpdateBrandTabInfoMutation } from "../../redux/features/users/usersApi";
import { useForm } from "react-hook-form";
import useViewImage from "../../lib/hooks/useViewImage";
import { AuthContext } from "../../contextApi/AuthContext";
import { SpinnerCircularFixed } from "spinners-react";

const AccountSettingBrandTab = () => {
  const [banner, setBanner] = useState(null);

  const bannerRef = useRef();

  const { user } = useContext(AuthContext);
  const {
    handleSubmit,
    register,
    setError,
    setValue,
    formState: { errors },
  } = useForm();
  const [updateBrandTabInfo, { isLoading }] = useUpdateBrandTabInfoMutation();

  const { viewImg } = useViewImage();

  const handleUpdate = async (data) => {
    const formData = new FormData();
    if (data?.name) {
      formData.append("name", data?.name);
    }
    if (banner) {
      formData.append("official_banner", banner);
    }
    const options = {
      data: formData,
    };

    const result = await updateBrandTabInfo(options);
    if (result?.data?.success) {
      setBanner(null);
      toast.success(result?.data?.message);
    } else {
      if (result?.data?.type === "verification") {
        toast.error(result?.data?.message);
      }
    }
    if (result?.error?.data?.type === "email") {
      toast.error(result?.error?.data?.message);
    }
  };

  useMemo(() => {
    if (user) {
      setValue("name", user?.name);
    }
  }, [user]);
  return (
    <div>
      <h1 className="text-center text-[#fff] font-bold text-[15px] md:text-[20px] pt-[38px] leading-normal font-lato">
        Brand Branner
      </h1>

      <h1 className="text-center font-lato text-[10px] md:text-[12px] text-[#FFFFFF80] pt-[23px]">
        This banner could be prominently displayed on the main page. We
        recommend featuring your logo for improved brand identification.
      </h1>

      <img
        src={viewImg(banner || user?.profile?.official_banner) || bannerImg}
        alt="profile"
        className="rounded-[5px] w-[232px] h-[40px] mx-auto mt-[16px] md:mt-[17px] object-contain"
      />
      <div className="flex justify-center">
        <h1
          onClick={() => bannerRef.current.click()}
          className="font-lato text-[15px] text-[#2555FF] mt-[11px] text-center cursor-pointer inline-block"
        >
          Change Brand Banner
        </h1>
      </div>

      <input
        ref={bannerRef}
        type="file"
        accept=".png, .jpg, .jpeg"
        multiple={false}
        onChange={(e) => setBanner(e.target.files[0])}
        className="hidden"
      />

      <form onSubmit={handleSubmit(handleUpdate)}>
        <div className="mt-[38px] max-w-[264px] mx-auto">
          <h1 className="text-center text-[#fff] font-bold text-[15px] md:text-[20px] pt-[38px] leading-normal font-lato">
            Brand Name
          </h1>
          <input
            {...register("name", { required: true })}
            type="text"
            className="w-full h-[34px] mt-[23px] max-w-[218px] bg-[#00000080] outline-none mx-auto rounded-[30px] px-[18px] font-bakbak-one placeholder:text-[12px] placeholder:font-bakbak-one text-[#FFFFFF80] placeholder:text-[#FFFFFF80] block"
          />
        </div>

        <p className="text-center font-lato text-[10px] md:text-[12px] text-[#FFFFFF80] pt-[17px]">
          The brand name will always appear beneath the brand banner. If no
          brand name is selected, it will default to the original username. For
          instance:
        </p>
        <p className="text-center font-lato text-[10px] md:text-[12px] text-[#FFFFFF80]">
          Username: Wallpaper Society
        </p>
        <p className="text-center font-lato text-[10px] md:text-[12px] text-[#FFFFFF80]">
          Brand Name: WPS
        </p>

        <div className="mt-[38px] md:mt-[33px] max-w-[264px] mx-auto pb-[35px]">
          <Button
            type="submit"
            disabled={isLoading}
            className="font-normal normal-case bg-[#2924FF] w-[129px] h-[38px] rounded-[5px] mx-auto hover:shadow-none shadow-none font-bakbak-one text-[15px] text-[#C4C4C4] inline-block p-0 flex justify-center items-center gap-2"
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

export default AccountSettingBrandTab;
