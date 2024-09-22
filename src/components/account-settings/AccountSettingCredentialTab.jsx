import { useContext, useMemo } from "react";
import { Button } from "@material-tailwind/react";
import { AuthContext } from "../../contextApi/AuthContext";
import { useForm } from "react-hook-form";
import { useUpdateCredentialsTabInfoMutation } from "../../redux/features/users/usersApi";
import { SpinnerCircularFixed } from "spinners-react";
import { toast } from "react-toastify";

const AccountSettingCredentialTab = () => {
  const { user } = useContext(AuthContext);
  const [updateCredentialsTabInfo, { isLoading }] =
    useUpdateCredentialsTabInfoMutation();
  const {
    handleSubmit,
    register,
    setError,
    setValue,
    formState: { errors },
  } = useForm();

  const handleInfoUpdate = async (data) => {
    if (data?.new_password || data?.current_password) {
      if (data?.new_password !== data?.current_password) {
        setError("current_password", {
          type: "manual",
          message: "Passwords do not match",
        });
        return;
      }
    }
    const options = {
      data: data,
    };

    const result = await updateCredentialsTabInfo(options);
    if (result?.data?.success) {
      toast.success("Profile Credentials Update Successfully");
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
    }
    if (result?.error?.data?.type === "email") {
      setError("email", {
        type: "manual",
        message: result?.error?.data?.message,
      });
    }
  };

  useMemo(() => {
    if (user) {
      setValue("email", user?.email);
      setValue("warnings", user?.warnings);
    }
  }, [user]);
  return (
    <div>
      <form onSubmit={handleSubmit(handleInfoUpdate)}>
        <div className="pt-[43px] max-w-[218px] mx-auto">
          <h1 className="text-[15px] font-lato text-center text-[#FFF]">
            E-mail
          </h1>
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email format",
              },
            })}
            type="email"
            placeholder="krs@wps.com"
            required={true}
            className="w-full h-[34px] mt-[10px] max-w-[218px] bg-[#00000080] outline-none mx-auto rounded-[30px] px-[18px] font-lato placeholder:text-[12px] placeholder:font-lato text-[#FFFFFF80] placeholder:text-[#FFFFFF80] block"
          />
          {errors.email && (
            <p className="text-[12px] text-center font-lato text-red-600 mt-[22px]">
              {errors.email?.message}
            </p>
          )}
        </div>
        <div className="pt-[32px] max-w-[218px] mx-auto">
          <h1 className="text-[15px] font-lato text-center text-[#FFF]">
            New Password
          </h1>
          <input
            {...register("new_password", {
              required: false,
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
            placeholder="New Password"
            className="w-full h-[34px] mt-[10px] max-w-[218px] bg-[#00000080] outline-none mx-auto rounded-[30px] px-[18px] font-lato placeholder:text-[12px] placeholder:font-lato text-[#FFFFFF80] placeholder:text-[#FFFFFF80] block"
          />
        </div>
        <div className="pt-[32px] max-w-[218px] mx-auto">
          <h1 className="text-[15px] font-lato text-center text-[#FFF]">
            Current Password
          </h1>
          <input
            {...register("current_password", {
              required: false,
            })}
            type="password"
            placeholder="Current Password"
            className="w-full h-[34px] mt-[10px] max-w-[218px] bg-[#00000080] outline-none mx-auto rounded-[30px] px-[18px] font-lato placeholder:text-[12px] placeholder:font-lato text-[#FFFFFF80] placeholder:text-[#FFFFFF80] block"
          />
        </div>
        {errors.current_password && (
          <p className="text-[12px] text-center font-lato text-red-600 mt-[22px]">
            {errors.current_password?.message}
          </p>
        )}
        {errors.new_password && (
          <p className="text-[12px] text-center font-lato text-red-600 mt-[22px]">
            {errors.new_password?.message}
          </p>
        )}

        <p className="text-[12px] text-center font-lato text-[#939393] mt-[22px]">
          Update your existing password. Changing your password will result in
          an automatic logout from all other active sessions.
        </p>

        <div className="pt-[75px] max-w-[413px] mx-auto">
          <h1 className="text-[15px] font-lato text-center text-[#FFF]">
            Warnings / Ban Activity
          </h1>
          <textarea
            {...register("warnings", { required: false })}
            placeholder="No records"
            className="w-full h-[106px] mt-[20px] md:mt-[22px] bg-[#00000080] outline-none mx-auto rounded-[10px] py-[18px] px-[26px] font-bakbak-one placeholder:text-[12px] placeholder:font-bakbak-one text-[#FFFFFF80] placeholder:text-[#FFFFFF80] block"
          ></textarea>
        </div>

        <div className="mt-[42px] max-w-[264px] mx-auto pb-[35px]">
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

export default AccountSettingCredentialTab;
