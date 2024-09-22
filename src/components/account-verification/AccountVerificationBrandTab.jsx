/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Button } from "@material-tailwind/react";
import React, { useContext, useRef, useState } from "react";
import { iUpload } from "../../utils/icons/icons";
import { AuthContext } from "../../contextApi/AuthContext";
import { SpinnerCircularFixed } from "spinners-react";
import { ACCEPT_FILES } from "../../lib/config";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useVerificationRequestMutation } from "../../redux/features/users/usersApi";
import { useSendVerificationMutation } from "../../redux/features/verification/verificationApi";

const AccountVerificationBrandTab = ({ success, setSuccess }) => {
  const { user } = useContext(AuthContext);
  const [type, setType] = useState("Brand");
  const [file, setFile] = useState(null);

  const imageRef = useRef();

  const {
    handleSubmit,
    register,
    setError,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const [sendVerification, { isLoading }] = useSendVerificationMutation();

  const handleRequest = async (data) => {
    const formData = new FormData();

    formData.append("type", type);
    formData.append("name", data?.name);
    if (file) {
      formData.append("proof_of_identity", file);
    }
    if (data?.url_1) {
      formData.append("links", data?.url_1);
    }
    if (data?.url_2) {
      formData.append("links", data?.url_2);
    }
    const options = {
      data: formData,
    };

    const result = await sendVerification(options);
    if (result?.data?.success) {
      setSuccess(true);
      toast.info(result?.data?.message);
    } else {
      if (result?.data?.type === "exist") {
        reset();
        toast.error(result?.data?.message);
      }
    }
    if (result?.error?.data?.type === "email") {
      toast.info(result?.error?.data?.message);
    }
  };

  return (
    <div className="pb-[49px]">
      <h1 className="text-center text-[#fff] text-[12px] md:text-[15px] font-lato pt-[39px]">
        Type of Request
      </h1>
      <div className="bg-[#00000033] rounded-[100px] w-[172px] h-[45px] flex justify-between items-center px-[8px] mt-[29px] mx-auto">
        {["Brand", "Artist"].map((t, i) => (
          <Button
            onClick={() => setType(t)}
            key={i}
            className={`hover:shadow-none shadow-none p-0 m-0 normal-case font-lato text-[12px] leading-[14.4px] font-bold w-[72px] h-[32px] ${
              type === t
                ? `${
                    type === "Brand" ? "bg-[#0AB745]" : "bg-[#B70A0A]"
                  } !text-white rounded-[100px]`
                : "bg-transparent !text-[#C6C6C6]"
            }`}
          >
            {t}
          </Button>
        ))}
      </div>

      <form onSubmit={handleSubmit(handleRequest)}>
        <h1 className="text-center text-[#fff] text-[12px] md:text-[15px] font-lato pt-[36px]">
          Name of Brand / Artist
        </h1>

        <input
          {...register("name", { required: true })}
          type="text"
          required={true}
          className="w-[194px] h-[43px] mx-auto px-[8px] bg-[#00000080] outline-none font-lato text-[12px] placeholder:text-[12px] placeholder:font-lato text-[#FFFFFF80] placeholder:text-[#FFFFFF80] mt-[26px] block rounded-[10px]"
        />

        <h1 className="text-center text-[#fff] text-[12px] md:text-[15px] font-lato pt-[34px]">
          Links to other verified profiles (optional)
        </h1>

        <input
          {...register("url_1", { required: false })}
          type="text"
          placeholder="URL"
          className="max-w-[309px] w-full h-[37px] mx-auto px-[9px] bg-[#00000080] outline-none font-lato text-[12px] placeholder:text-[12px] placeholder:font-lato text-[#939393] placeholder:text-[#939393] mt-[29px] block rounded-[10px]"
        />
        <input
          {...register("url_2", { required: false })}
          type="text"
          placeholder="URL"
          className="max-w-[309px] w-full h-[37px] mx-auto px-[9px] bg-[#00000080] outline-none font-lato text-[12px] placeholder:text-[12px] placeholder:font-lato text-[#939393] placeholder:text-[#939393] mt-[17px] block rounded-[10px]"
        />

        <h1 className="text-center text-[#fff] text-[12px] md:text-[15px] font-lato pt-[27px]">
          Proof of Identity
        </h1>

        <p className="text-[10px] md:text-[12px] text-[#939393] text-center font-lato mt-[19px]">
          This could be a screenshot, selfie, or any other form of proof to
          verify your identity. Please refrain from uploading government-issued
          IDs.
        </p>

        <div className="max-w-[563px] w-full min-h-[138px] max-h-fit bg-[#00000080] flex flex-col justify-center items-center gap-[7.9px] pt-[6px] pb-[15px] rounded-[10px] mx-auto mt-[25px] relative">
          <div className="size-[30px]">{iUpload}</div>
          <h1 className="text-[15px] font-bakbak-one text-[#FFF]">
            Drag and drop files here
          </h1>
          <h1 className="text-[15px] font-bakbak-one text-[#FFF]">or</h1>
          <button
            type="button"
            onClick={() => imageRef.current.click()}
            className="w-[103px] h-[28px] bg-[#000000] rounded-[10px] font-bakbak-one text-[12px] text-[#939393]"
          >
            Select Files
          </button>
          <input type="text" className="opacity-0 absolute" required={!file} />

          <input
            ref={imageRef}
            onChange={(e) => setFile(e.target.files[0])}
            type="file"
            accept={ACCEPT_FILES.PROOF_OF_IDENTITY}
            multiple={false}
            className="hidden"
            required={true}
          />
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className={`font-normal normal-case  w-[129px] h-[38px] rounded-[5px] mx-auto mt-[26px] hover:shadow-none shadow-none font-bakbak-one text-[15px] text-[#C4C4C4] inline-block p-0 leading-normal flex items-center justify-center gap-2
          ${watch("name") && file ? "bg-[#2924FF]" : "bg-[#5A5A5A]"}
          `}
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
          Submit
        </Button>
      </form>
    </div>
  );
};

export default AccountVerificationBrandTab;
