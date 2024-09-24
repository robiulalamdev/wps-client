/* eslint-disable react/no-unescaped-entities */
import { useForm } from "react-hook-form";
import bg from "../../../assets/images/auth/forgot-password/bg.png";
import { usePasswordResetMutation } from "../../../redux/features/users/usersApi";
import { iInfo } from "../../../utils/icons/icons";
import {
  Button,
  Popover,
  PopoverContent,
  PopoverHandler,
} from "@material-tailwind/react";
import { SpinnerCircularFixed } from "spinners-react";
import useViewImage from "../../../lib/hooks/useViewImage";
import { useGetPublicCredentialFeaturedForFpQuery } from "../../../redux/features/featured/featuredApi";
import AuthContainerFooterLinks from "../../../components/common/global/AuthContainerFooterLinks";
import { useRouter } from "next/router";
import Link from "next/link";
import AuthLayout from "@/layouts/AuthLayout";

const ForgotPassword = () => {
  const { viewResizeImg } = useViewImage();
  const { data: crlWall, isLoading: crlLoading } =
    useGetPublicCredentialFeaturedForFpQuery();
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors },
  } = useForm();

  const [passwordReset, { isLoading }] = usePasswordResetMutation();

  const router = useRouter();

  const handleResetPassword = async (data) => {
    const options = {
      data: data,
    };

    const result = await passwordReset(options);
    if (result?.data?.success) {
      window.location.replace("/auth/reset-password");
    } else {
      if (result?.data?.type === "email") {
        setError("email", { type: "manual", message: result?.data?.message });
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
      <div className="max-w-[978px] w-full h-[754px] md:min-h-[804px] max-h-[804px] bg-[#D9D9D9] rounded-[10px] md:rounded-[30px] mx-auto grid md:grid-cols-2 px-[21px] py-[19px] lg:px-[27px] lg:py-[29px]">
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
            Forgot your password?
          </h1>
        </div>

        {/* small */}
        <div
          className="w-full max-w-[494px] min-h-[171px] max-h-[171px] h-fit px-[50pxpx] py-[16px] rounded-[10px] md:hidden"
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
        >
          <h1 className="text-[20px] text-[#F4F4F4] font-bakbak-one text-center">
            Forgot your password?
          </h1>
        </div>

        <div className="w-full h-full md:py-[23px] md:pl-[16px] flex flex-col justify-between items-center md:pb-[53px]">
          <div>
            <h1 className="text-[30px] text-[#373737] font-bakbak-one mt-[28px] text-center hidden md:block">
              THE WALLPAPER SOCIETY
            </h1>

            <div className="bg-[#C9C9C9] rounded-[12px] min-w-[217px] max-w-[217px] h-[37px] flex justify-center items-center mx-auto mt-[36px] md:mt-[32px]">
              <Button
                className={`font-normal hover:shadow-none shadow-none p-0 m-0 normal-case font-bakbak-one rounded-[10px] text-[12px] min-w-[105px] h-[31px] bg-white text-[#373737]`}
              >
                Password
              </Button>
              <Link href="/auth/forgot-email">
                <Button
                  className={`font-normal hover:shadow-none shadow-none p-0 m-0 normal-case font-bakbak-one rounded-[10px] text-[12px] w-[105px] h-[31px] bg-transparent text-[#373737]`}
                >
                  E-mail
                </Button>
              </Link>
            </div>
          </div>

          <form
            onSubmit={handleSubmit(handleResetPassword)}
            className="max-w-[400px] md:max-w-[326px] w-full mx-auto"
          >
            <div className="flex flex-col items-center md:items-start gap-y-[17px]">
              <p className="font-bakbak-one text-[12px] text-[#373737]">
                Email
              </p>
              <input
                {...register("email", { required: true })}
                type="email"
                placeholder="wallpapers@thewallpapersociety.com"
                required={true}
                className="outline-none w-full h-[45px] rounded-[10px] bg-white placeholder:text-[#3737374D] text-[#3737374D] text-[12px] placeholder:text-[12px] px-[15px] font-bakbak-one"
              />
            </div>

            {errors.email && (
              <p className="text-center text-[12px] text-[#F00] mt-[15px] font-lato">
                {errors?.email?.message}
              </p>
            )}

            <Button
              type="submit"
              className="font-normal shadow-none hover:shadow-none normal-case bg-black p-0 w-[132px] h-[35px] mt-[102px] md:mt-[28px] mx-auto inline-block rounded-[10px] text-white text-[12px] font-bakbak-one flex items-center justify-center gap-2"
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
              Reset
            </Button>
          </form>

          <div className="flex justify-center items-center gap-x-[10px] sm:gap-x-[15px] md:gap-x-[20px]">
            <AuthContainerFooterLinks />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

ForgotPassword.getLayout = function getLayout(page) {
  return <AuthLayout>{page}</AuthLayout>;
};
