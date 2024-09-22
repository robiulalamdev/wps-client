import { Button } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { SpinnerCircularFixed } from "spinners-react";
import {
  useAddUserMutation,
  useModifyUserLoginInfoMutation,
} from "../../../../redux/features/users/usersApi";
import {
  iDashUser,
  idashEmail,
  idashPass,
} from "../../../../utils/icons/dashboard-icons/dashicons";
import { useMemo } from "react";
import { toast } from "react-toastify";
import { FIELD_VALIDATIONS } from "../../../../lib/config";

const LoginInfoTab = ({ user = null, setUser }) => {
  const [modifyUserLoginInfo, { isLoading }] = useModifyUserLoginInfoMutation();
  const {
    handleSubmit,
    register,
    reset,
    setValue,
    setError,
    formState: { errors },
  } = useForm();

  const handleAddUser = async (data) => {
    if (!data?.username && !data?.password) {
      return;
    }
    const options = {
      id: user?._id,
      data: { username: data?.username, password: data?.password },
    };

    const result = await modifyUserLoginInfo(options);
    if (result?.data?.success) {
      toast.success("Login information update successfully");
      setUser({ ...user, username: data?.username });
    } else {
      if (result?.data?.type === "username") {
        setError("username", {
          type: "manual",
          message: result?.data?.message,
        });
      }
    }
  };

  useMemo(() => {
    if (user) {
      setValue("username", user?.username);
      setValue("email", user?.email);
    }
  }, [user]);

  return (
    <>
      <h1 className="font-lato font-bold text-[20px] text-[#313131] pl-[14px] pt-[19px]">
        Login Information
      </h1>

      <form
        onSubmit={handleSubmit(handleAddUser)}
        className="pl-[13px] mt-[100px]"
      >
        <div className="">
          <div className="bg-[#C0C0C0] w-full h-[39px] rounded-[5px] flex items-center px-[8px]">
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
          <div className="bg-[#C0C0C0] w-full h-[39px] rounded-[5px] flex items-center px-[8px]">
            <div className="pr-[11px]">{idashEmail}</div>
            <input
              {...register("email", {
                required: false,
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format",
                },
              })}
              disabled
              readOnly
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
          <div className="bg-[#C0C0C0] w-full h-[39px] rounded-[5px] flex items-center px-[8px]">
            <div className="pr-[11px]">{idashPass}</div>
            <input
              {...register("password", {
                required: false,
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

        <div className="absolute bottom-[38px] left-[122px] backdrop-blur">
          {Object.entries(errors).length > 0 ? (
            <Button
              type="button"
              className="w-[154px] h-[39px] bg-[#313131] normal-case rounded-[5px] text-white font-lato text-[15px] font-medium flex justify-center items-center shadow-none hover:shadow-none"
            >
              <h1>Save Changes</h1>
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-[154px] h-[39px] bg-[#313131] normal-case rounded-[5px] text-white font-lato text-[15px] font-medium flex justify-center items-center gap-2 shadow-none hover:shadow-none"
            >
              {isLoading && (
                <SpinnerCircularFixed
                  size={16}
                  thickness={180}
                  speed={300}
                  color="rgba(255, 255, 255, 1)"
                  secondaryColor="rgba(255, 255, 255, 0.42)"
                />
              )}{" "}
              <h1>{isLoading ? "Saving..." : "Save Changes"}</h1>
            </Button>
          )}
        </div>
      </form>
    </>
  );
};

export default LoginInfoTab;
