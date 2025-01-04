import { useForm } from "react-hook-form";
import bg from "../../../assets/images/auth/signup/bg.png";
import { iInfo, iSpinner } from "../../../utils/icons/icons";
import {
  Button,
  Popover,
  PopoverContent,
  PopoverHandler,
} from "@material-tailwind/react";
import { useState } from "react";
import { useCreateUserMutation } from "../../../redux/features/users/usersApi";
import VerifyModal from "../../../components/common/modals/VerifyModal";
import useViewImage from "../../../lib/hooks/useViewImage";
import { useGetPublicCredentialFeaturedForSignupQuery } from "../../../redux/features/featured/featuredApi";
import { FIELD_VALIDATIONS } from "../../../lib/config";
import AuthContainerFooterLinks from "../../../components/common/global/AuthContainerFooterLinks";
import { useRouter } from "next/router";
import Link from "next/link";
import AuthLayout from "@/layouts/AuthLayout";

const Signup = () => {
  const { viewResizeImg } = useViewImage();
  const { data: crlWall, isLoading: crlLoading } =
    useGetPublicCredentialFeaturedForSignupQuery();
  const {
    handleSubmit,
    register,
    setError,
    reset,
    formState: { errors },
  } = useForm();

  const [createUser, { isLoading }] = useCreateUserMutation();

  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);

  const handleCreate = async (data) => {
    const options = {
      data: data,
    };

    const result = await createUser(options);
    if (result?.data?.success) {
      if (result?.data?.type === "verify") {
        router.push("/auth/signup-confirmation");
      }
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
      if (result?.data?.type === "unverified") {
        setOpenModal(true);
        reset();
      }
    }
    if (result?.error?.data?.type === "email") {
      setError("email", {
        type: "manual",
        message: result?.error?.data?.message,
      });
    }
  };

  return (
    <div className="mt-[17px]">
      {/* <h1 className="text-[30px] text-white font-bakbak-one mb-[17px] mt-[27px] text-center md:hidden">
        THE WALLPAPER SOCIETY
      </h1> */}
      <div className="max-w-[978px] w-full md:min-h-[804px] max-h-[804px] bg-[#D9D9D9] rounded-[10px] md:rounded-[30px] mx-auto grid md:grid-cols-2 px-[21px] py-[19px] lg:px-[27px] lg:py-[29px]">
        <div
          className="w-full h-full max-h-[746px] max-w-[494px] rounded-[30px] px-[22px] py-[23px] hidden md:block"
          style={{
            background: `url(${
              !crlLoading && crlWall?.data?.wallpaper
                ? viewResizeImg(crlWall?.data?.wallpaper, 594, 846, "cover")
                : bg
            })`,
            backgroundSize: "cover",
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="flex justify-end">
            <Popover placement="bottom-end">
              <PopoverHandler className="cursor-pointer">
                {iInfo}
              </PopoverHandler>
              <PopoverContent className="p-0 border-none shadow-none">
                <div
                  onClick={() =>
                    router.push(
                      crlWall?.data
                        ? `/w/${crlWall?.data?.slug}`
                        : `/wallpapers`
                    )
                  }
                  className="w-[127px] h-[37px] rounded-[10px] bg-white flex justify-center items-center cursor-pointer"
                >
                  <p className="text-[#151618] font-bold font-lato">
                    Go to wallpaper
                  </p>
                </div>
              </PopoverContent>
            </Popover>
          </div>
          <h1 className="text-[25px] text-[#F4F4F4] font-bakbak-one mt-[28px] text-center">
            Welcome to the Society
          </h1>
        </div>

        {/* small */}
        <div
          className="w-full max-w-[494px] min-h-[171px] max-h-[171px] h-fit rounded-[10px] md:hidden"
          style={{
            background: `url(${
              !crlLoading && crlWall?.data?.wallpaper
                ? viewResizeImg(crlWall?.data?.wallpaper, 594, 271, "cover")
                : bg
            })`,
            backgroundSize: "cover",
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
          }}
        ></div>

        <div className="w-full h-full md:py-[23px] md:pl-[16px]">
          <h1 className="text-[30px] text-[#373737] font-bakbak-one mt-[28px] text-center hidden md:block">
            THE WALLPAPER SOCIETY
          </h1>

          <div className="bg-[#C9C9C9] rounded-[12px] min-w-[217px] max-w-[217px] h-[37px] flex justify-center items-center mx-auto mt-[36px] md:mt-[32px]">
            <Link href="/auth/login">
              <Button
                className={`font-normal hover:shadow-none shadow-none p-0 m-0 normal-case font-bakbak-one rounded-[10px] text-[12px] min-w-[105px] h-[31px] bg-transparent text-[#373737]`}
              >
                Sign In
              </Button>
            </Link>
            <Button
              className={`font-normal hover:shadow-none shadow-none p-0 m-0 normal-case font-bakbak-one rounded-[10px] text-[12px] w-[105px] h-[31px] bg-white text-[#373737]`}
            >
              Sign Up
            </Button>
          </div>

          <form
            onSubmit={handleSubmit(handleCreate)}
            className="max-w-[400px] md:max-w-[326px] w-full mx-auto mt-[35px] md:mt-[37px]"
          >
            <div className="flex flex-col items-center md:items-start gap-y-[17px] mt-[15px]">
              <p className="font-bakbak-one text-[12px] text-[#373737]">
                Username
              </p>
              <input
                {...register("username", {
                  required: "Username is required",
                  ...FIELD_VALIDATIONS.USERNAME_VALIDATION,
                })}
                type="text"
                placeholder="Username"
                required={true}
                className="outline-none w-full h-[45px] rounded-[10px] bg-white placeholder:text-[#3737374D] text-[#3737374D] text-[12px] placeholder:text-[12px] px-[15px] font-bakbak-one"
              />
            </div>

            <div className="flex flex-col items-center md:items-start gap-y-[17px] mt-[13px] md:mt-[10px]">
              <p className="font-bakbak-one text-[12px] text-[#373737]">
                Email
              </p>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email format",
                  },
                })}
                type="email"
                placeholder="wallpapers@thewallpapersociety.com"
                required={true}
                className="outline-none w-full h-[45px] rounded-[10px] bg-white placeholder:text-[#3737374D] text-[#3737374D] text-[12px] placeholder:text-[12px] px-[15px] font-bakbak-one"
              />
            </div>

            <div className="flex flex-col items-center md:items-start gap-y-[17px] mt-[15px]">
              <p className="font-bakbak-one text-[12px] text-[#373737]">
                Password
              </p>
              <input
                {...register("password", {
                  required: "Password is required",
                  ...FIELD_VALIDATIONS.PASSWORD_VALIDATION,
                })}
                type="password"
                placeholder="*****************"
                required={true}
                className="outline-none w-full h-[45px] rounded-[10px] bg-white placeholder:text-[#3737374D] text-[#3737374D] text-[12px] placeholder:text-[12px] px-[15px] font-bakbak-one"
              />
            </div>

            {errors.username && (
              <p className="text-center text-[12px] text-[#F00] mt-[15px] font-lato">
                {errors?.username.message}
              </p>
            )}
            {errors.email && (
              <p className="text-center text-[12px] text-[#F00] mt-[15px] font-lato">
                {errors?.email.message}
              </p>
            )}
            {errors.password && (
              <p className="text-center text-[12px] text-[#F00] mt-[15px] font-lato">
                {errors?.password.message}
              </p>
            )}

            <Button
              type="submit"
              className="font-normal shadow-none hover:shadow-none normal-case bg-black p-0 w-[132px] h-[35px] mt-[44px] md:mt-[42px] mx-auto inline-block rounded-[10px] text-white text-[12px] font-bakbak-one flex items-center justify-center gap-2"
            >
              {isLoading && (
                // <SpinnerCircularFixed
                //   size={20}
                //   thickness={180}
                //   speed={300}
                //   color="rgba(255, 255, 255, 1)"
                //   secondaryColor="rgba(255, 255, 255, 0.42)"
                // />
                <div className="max-w-[18px] text-white">{iSpinner}</div>
              )}{" "}
              Sign Up
            </Button>
          </form>
          <div className="flex justify-center items-center gap-x-[10px] sm:gap-x-[15px] md:gap-x-[20px] mt-[120px] md:mt-[141px]">
            <AuthContainerFooterLinks />
          </div>
        </div>
      </div>

      <VerifyModal
        title="This Email have an account and account is unverified. Please check your email, and verify your email address"
        open={openModal}
        setOpen={setOpenModal}
      />
    </div>
  );
};

export default Signup;

Signup.getLayout = function getLayout(page) {
  return <AuthLayout>{page}</AuthLayout>;
};
