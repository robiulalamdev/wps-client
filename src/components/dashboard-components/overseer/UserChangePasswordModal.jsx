/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Button, Dialog } from "@material-tailwind/react";
import React from "react";
import {
  iDashUserForChagnePass,
  idashClose,
  idashPass,
} from "../../../utils/icons/dashboard-icons/dashicons";
import { useForm } from "react-hook-form";
import { useModifyUserPasswordMutation } from "../../../redux/features/users/usersApi";
import { toast } from "react-toastify";

const UserChangePasswordModal = ({ open, onClose }) => {
  const {
    handleSubmit,
    register,
    setValue,
    setError,
    formState: { errors },
  } = useForm();
  const [modifyUserPassword, { isLoading }] = useModifyUserPasswordMutation();

  const handleSave = async (data) => {
    if (data?.password !== data?.repeat_password) {
      setError("repeat_password", {
        type: "manual",
        message: "Passwords do not match",
      });
      return;
    } else {
      const options = {
        id: open?._id,
        data: { password: data?.password },
      };
      const result = await modifyUserPassword(options);
      if (result?.data?.success) {
        toast.success("Password changed successfully");
      } else {
        toast.error("Password changed unSuccessfully");
      }
      onClose();
    }
  };
  return (
    <Dialog
      open={!!open?._id}
      size="md"
      className="bg-transparent p-0 outline-none flex justify-center items-center"
    >
      <div className="min-w-[398px] max-w-[398px] min-h-[344px] max-h-fit bg-[#D5D5D5] rounded-[10px] px-[23px] pt-[29px] pb-[17px] relative">
        <h1 className="font-lato text-[18px] font-bold leading-normal text-[#313131] text-center">
          Change Password
        </h1>

        <div className="flex items-center justify-center gap-x-[11px] mt-[27px] mb-[7px]">
          {iDashUserForChagnePass}
          <h1 className="font-lato text-[18px] font-bold leading-normal text-[#313131] text-center">
            {open?.username}
          </h1>
        </div>

        <svg
          width="355"
          height="2"
          viewBox="0 0 355 2"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M1 1H354" stroke="#C8C8C8" stroke-linecap="round" />
        </svg>

        <form onSubmit={handleSubmit(handleSave)} className="">
          <div className="mt-[16px]">
            <div className="bg-[#C0C0C0] w-full h-[44px] rounded-[5px] flex items-center px-[8px]">
              <div className="pr-[11px]">{idashPass}</div>
              <input
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters long",
                  },
                  maxLength: {
                    value: 12,
                    message: "Password must be no more than 12 characters long",
                  },
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])(?!.*\s).{6,12}$/,
                    message:
                      "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character, with no spaces",
                  },
                })}
                type="password"
                placeholder="Password"
                className="w-full h-full outline-none border-none bg-transparent font-lato text-[12px] font-medium text-[#323232] placeholder:text-[#323232]"
              />
            </div>
            <p className="mt-[7px] font-lato text-[10px] font-medium text-[#FF0000] h-[8px]">
              {errors.password ? errors.password.message : ""}
            </p>
          </div>
          <div className="mt-[16px]">
            <div className="bg-[#C0C0C0] w-full h-[44px] rounded-[5px] flex items-center px-[8px]">
              <div className="pr-[11px]">{idashPass}</div>
              <input
                {...register("repeat_password", {
                  required: "Repeat password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters long",
                  },
                  maxLength: {
                    value: 12,
                    message: "Password must be no more than 12 characters long",
                  },
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])(?!.*\s).{6,12}$/,
                    message:
                      "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character, with no spaces",
                  },
                })}
                type="password"
                placeholder="Repeat Password"
                className="w-full h-full outline-none border-none bg-transparent font-lato text-[12px] font-medium text-[#323232] placeholder:text-[#323232]"
              />
            </div>
            <p className="mt-[7px] font-lato text-[10px] font-medium text-[#FF0000] h-[8px]">
              {errors.repeat_password ? errors.repeat_password.message : ""}
            </p>
          </div>

          <div className="flex justify-center items-center">
            <Button
              disabled={isLoading}
              type="submit"
              className="w-[190px] h-[45px] bg-[#C0C0C0] rounded-[10px] mt-[34px] shadow-none hover:shadow-none text-[#585858] font-lato text-[20px] font-medium leading-normal mx-auto normal-case p-0"
            >
              {isLoading ? "Changing..." : "Change"}
            </Button>
          </div>
        </form>

        <div
          onClick={onClose}
          className="absolute top-[14px] right-[13px] cursor-pointer"
        >
          {idashClose}
        </div>
      </div>
    </Dialog>
  );
};

export default UserChangePasswordModal;
