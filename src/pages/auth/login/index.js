import { useContext, useState } from "react";

import bg from "../../../assets/images/auth/login/bg.png";
import { iInfo } from "../../../utils/icons/icons";
import {
  Button,
  Popover,
  PopoverContent,
  PopoverHandler,
} from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { usePostLoginMutation } from "../../../redux/features/users/usersApi";
import { SET_TOKEN, TOKEN_NAME } from "../../../lib/config";
import { SpinnerCircularFixed } from "spinners-react";
import { AuthContext } from "../../../contextApi/AuthContext";
import VerifyModal from "../../../components/common/modals/VerifyModal";
import useViewImage from "../../../lib/hooks/useViewImage";
import { useGetPublicCredentialFeaturedForLoginQuery } from "../../../redux/features/featured/featuredApi";
import AuthContainerFooterLinks from "../../../components/common/global/AuthContainerFooterLinks";
import { useRouter } from "next/router";
import Link from "next/link";
import AuthLayout from "@/layouts/AuthLayout";

const Login = () => {
  const { viewResizeImg } = useViewImage();
  const { data: crlWall, isLoading: crlLoading } =
    useGetPublicCredentialFeaturedForLoginQuery();
  const {
    handleSubmit,
    register,
    setError,
    reset,
    formState: { errors },
  } = useForm();

  const [postLogin, { isLoading }] = usePostLoginMutation();
  const { setUser } = useContext(AuthContext);
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);

  const handleLogin = async (data) => {
    const options = {
      data: data,
    };

    const result = await postLogin(options);
    if (result?.data?.success) {
      if (result?.data?.data?.accessToken) {
        SET_TOKEN(null, result?.data?.data?.accessToken);
        setUser(result?.data?.data?.user);
        router.push("/");
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
            Welcome back; we missed you.
          </h1>
        </div>

        {/* small */}
        <div
          className="w-full max-w-[494px] min-h-[171px] max-h-[171px] h-fit rounded-[10px] md:hidden border"
          style={{
            background: `url(${
              !crlLoading && crlWall?.data?.wallpaper
                ? viewResizeImg(crlWall?.data?.wallpaper, 594, 271)
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
            <Button
              className={`font-normal hover:shadow-none shadow-none p-0 m-0 normal-case font-bakbak-one rounded-[10px] text-[12px] min-w-[105px] h-[31px] bg-white text-[#373737]`}
            >
              Sign In
            </Button>
            <Link href="/auth/signup">
              <Button
                className={`font-normal hover:shadow-none shadow-none p-0 m-0 normal-case font-bakbak-one rounded-[10px] text-[12px] w-[105px] h-[31px] bg-transparent text-[#373737]`}
              >
                Sign Up
              </Button>
            </Link>
          </div>

          <form
            onSubmit={handleSubmit(handleLogin)}
            className="max-w-[400px] md:max-w-[326px] w-full mx-auto mt-[13px] md:mt-[10px]"
          >
            <div className="flex flex-col items-center md:items-start gap-y-[17px]">
              <p className="font-bakbak-one text-[12px] text-[#373737]">
                Email
              </p>
              <input
                {...register("email", { required: true })}
                type="email"
                required={true}
                placeholder="wallpapers@thewallpapersociety.com"
                className="outline-none w-full h-[45px] rounded-[10px] bg-white placeholder:text-[#3737374D] text-[#3737374D] text-[12px] placeholder:text-[12px] px-[15px] font-bakbak-one"
              />
            </div>

            <div className="flex flex-col items-center md:items-start gap-y-[17px] mt-[15px]">
              <p className="font-bakbak-one text-[12px] text-[#373737]">
                Password
              </p>
              <input
                {...register("password", { required: true })}
                type="password"
                placeholder="*****************"
                required={true}
                className="outline-none w-full h-[45px] rounded-[10px] bg-white placeholder:text-[#3737374D] text-[#3737374D] text-[12px] placeholder:text-[12px] px-[15px] font-bakbak-one"
              />
            </div>

            {errors.password && (
              <p className="text-center text-[12px] text-[#F00] mt-[15px] font-lato">
                Sorry, the password you entered is incorrect.{" "}
              </p>
            )}
            {errors.email && (
              <p className="text-center text-[12px] text-[#F00] mt-[15px] font-lato">
                User not found!
              </p>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="font-normal shadow-none hover:shadow-none normal-case bg-black p-0 w-[132px] h-[35px] mt-[44px] md:mt-[42px] mx-auto inline-block rounded-[10px] text-white text-[12px] font-bakbak-one flex items-center justify-center gap-2"
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
              Sign In
            </Button>

            <Link href="/auth/forgot-password">
              <p className="!mt-[17px] md:mt-[12px] text-center text-[#373737] text-[10px] font-bakbak-one">
                Can’t login
              </p>
            </Link>

            {/* <div className="mt-[34px] md:mt-[48px] flex flex-col items-center gap-[12px]">
              <Button
                type="button"
                className="flex justify-center items-center gap-x-[5px] min-w-[163px] px-1 h-[36px] !font-normal bg-[#1877F2] py-0 !normal-case hover:shadow-none shadow-none rounded-[5px]"
              >
                {iFacebook}{" "}
                <p className="text-nowrap text-[12px] font-bakbak-one text-white tracking-[0.5px]">
                  Sign In with Facebook
                </p>
              </Button>

              <Button
                type="button"
                className="flex justify-center items-center gap-x-[5px] min-w-[163px] h-[36px] font-normal bg-white p-0 normal-case hover:shadow-none shadow-none rounded-[5px]"
              >
                {iGoogle}{" "}
                <p className="text-nowrap text-[12px] font-bakbak-one text-[#9F9F9F]">
                  Sign In with Google
                </p>
              </Button>

              <Button
                type="button"
                className="flex justify-center items-center gap-x-[5px] min-w-[163px] h-[36px] font-normal bg-black p-0 normal-case hover:shadow-none shadow-none rounded-[5px]"
              >
                {iApple}{" "}
                <p className="text-nowrap text-[12px] font-bakbak-one text-white">
                  Sign In with Apple
                </p>
              </Button>
            </div> */}
          </form>
          {/* <div className="flex justify-center items-center gap-x-[15px] md:gap-x-[20px] mt-[39px] md:mt-[52px]"> */}
          <div className="flex justify-center items-center gap-x-[10px] sm:gap-x-[15px] md:gap-x-[20px] mt-[110px] md:mt-[231px]">
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

export default Login;

Login.getLayout = function getLayout(page) {
  return <AuthLayout>{page}</AuthLayout>;
};
