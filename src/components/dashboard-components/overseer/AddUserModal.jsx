/* eslint-disable react/prop-types */
import { Button, Dialog } from "@material-tailwind/react";
import React from "react";
import {
  iDashUser,
  idashClose,
  idashEmail,
  idashPass,
} from "../../../utils/icons/dashboard-icons/dashicons";
import { useForm } from "react-hook-form";
import { useAddUserMutation } from "../../../redux/features/users/usersApi";
import { SpinnerCircularFixed } from "spinners-react";
import { FIELD_VALIDATIONS } from "../../../lib/config";

const AddUserModal = ({ open, setOpen }) => {
  const [addUser, { isLoading }] = useAddUserMutation();
  const {
    handleSubmit,
    register,
    reset,
    setError,
    formState: { errors },
  } = useForm();

  const handleAddUser = async (data) => {
    const options = {
      data: { ...data, verified: true },
    };

    const result = await addUser(options);
    if (result?.data?.success) {
      reset();
      setOpen(false);
    } else {
      if (result?.data?.type === "email") {
        setError("email", { type: "manual", message: result?.data?.message });
      }
      if (result?.data?.type === "password") {
        setError("password", {
          type: "manual",
          message: result?.data?.message,
        });
      }
      if (result?.data?.type === "username") {
        setError("username", {
          type: "manual",
          message: result?.data?.message,
        });
      }
    }
    if (result?.error?.data?.type === "email") {
      setError("email", {
        type: "manual",
        message: result?.error?.data?.message,
      });
    }
  };

  console.log(errors);
  return (
    <Dialog
      open={open}
      //   handler={() => setOpen(!open)}
      size="xs"
      className="bg-transparent flex justify-center items-center"
    >
      <div className="w-[398px] h-[431px] rounded-[10px] bg-[#D5D5D5] pt-[31px] pr-[25px] pb-[41px] pl-[20px] relative">
        <h1 className="font-lato font-bold text-[20px] text-[#070707]">
          Add a new user
        </h1>
        <form onSubmit={handleSubmit(handleAddUser)}>
          <div className="mt-[32px]">
            <div className="bg-[#C0C0C0] w-full h-[44px] rounded-[5px] flex items-center px-[8px]">
              <div className="pr-[11px]">{iDashUser}</div>
              <input
                {...register("username", {
                  required: "Username is required",
                  ...FIELD_VALIDATIONS.USERNAME_VALIDATION,
                })}
                type="text"
                placeholder="Username"
                className="w-full h-full outline-none border-none bg-transparent font-lato text-[12px] font-medium text-[#323232] placeholder:text-[#323232]"
              />
            </div>
            <p className="mt-[7px] font-lato text-[10px] font-medium text-[#FF0000] h-[8px]">
              {errors.username ? errors.username.message : ""}
            </p>
          </div>
          <div className="mt-[16px]">
            <div className="bg-[#C0C0C0] w-full h-[44px] rounded-[5px] flex items-center px-[8px]">
              <div className="pr-[11px]">{idashEmail}</div>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email format",
                  },
                })}
                type="email"
                placeholder="Email"
                className="w-full h-full outline-none border-none bg-transparent font-lato text-[12px] font-medium text-[#323232] placeholder:text-[#323232]"
              />
            </div>
            <p className="mt-[7px] font-lato text-[10px] font-medium text-[#FF0000] h-[8px]">
              {errors.email ? errors.email.message : ""}
            </p>
          </div>
          <div className="mt-[16px]">
            <div className="bg-[#C0C0C0] w-full h-[44px] rounded-[5px] flex items-center px-[8px]">
              <div className="pr-[11px]">{idashPass}</div>
              <input
                {...register("password", {
                  required: "Password is required",
                  pattern: {
                    value: /^(?!\s)(?!.*\s{2})(?=.*[a-zA-Z0-9]).{6,12}$/, // Requires 6 to 12 characters with no spaces
                    message:
                      "Password must be 6 to 12 characters long with no spaces",
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

          {Object.entries(errors).length > 0 ? (
            <Button
              type="button"
              className="w-[133px] h-[45px] bg-[#C0C0C0] normal-case rounded-[10px] mt-[34px] text-[#585858] font-lato text-[20px] font-medium flex justify-center items-center shadow-none hover:shadow-none mx-auto"
            >
              <h1>Add</h1>
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-[133px] h-[45px] bg-[#8FFF00] normal-case rounded-[10px] mt-[34px] text-[#585858] font-lato text-[20px] font-medium flex justify-center items-center gap-2 shadow-none hover:shadow-none mx-auto"
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
              <h1>Add</h1>
            </Button>
          )}
        </form>

        <div
          onClick={() => setOpen(false)}
          className="absolute top-[14px] right-[13px] cursor-pointer"
        >
          {idashClose}
        </div>
      </div>
    </Dialog>
  );
};

export default AddUserModal;
