/* eslint-disable react/no-unescaped-entities */
import { useMemo, useState } from "react";
import bg from "../../../assets/images/auth/signup/bg.png";
import { iInfo } from "../../../utils/icons/icons";
import {
  Button,
  Dialog,
  Popover,
  PopoverContent,
  PopoverHandler,
} from "@material-tailwind/react";
import { useEmailVerifyMutation } from "../../../redux/features/users/usersApi";
import useViewImage from "../../../lib/hooks/useViewImage";
import { useGetPublicCredentialFeaturedForEvQuery } from "../../../redux/features/featured/featuredApi";
import Loading from "../../../components/common/loadings/Loading";
import AuthContainerFooterLinks from "../../../components/common/global/AuthContainerFooterLinks";
import { useRouter } from "next/router";
import AuthLayout from "@/layouts/AuthLayout";

const EmailVerify = () => {
  const { viewResizeImg } = useViewImage();
  const { data: crlWall, isLoading: crlLoading } =
    useGetPublicCredentialFeaturedForEvQuery();
  const router = useRouter();
  const token = router.query?.token;
  const [fetchPermit, setFetchPermit] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [verifySuccess, setVerifySuccess] = useState("");

  const [EmailVerify] = useEmailVerifyMutation();

  const handleVerifyEmail = async () => {
    const options = {
      token: token,
      data: {},
    };

    const result = await EmailVerify(options);
    if (result?.data?.success) {
      setVerifySuccess(result?.data?.message);
    } else {
      setVerifySuccess(result?.data?.message);
    }
    if (result?.error?.data?.type === "email") {
      setVerifySuccess(result?.error?.data?.message);
    }

    setIsLoading(false);
  };

  useMemo(() => {
    if (token) {
      if (fetchPermit) {
        setIsLoading(true);
        handleVerifyEmail();
        setFetchPermit(false);
      } else {
        return () => {};
      }
    } else {
      return () => {};
    }
  }, [token]);

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

        <div className="w-full h-full md:py-[23px] md:pl-[16px] flex flex-col justify-between items-center md:pb-[53px]">
          <h1 className="text-[30px] text-[#373737] font-bakbak-one mt-[28px] text-center hidden md:block">
            THE WALLPAPER SOCIETY
          </h1>

          <div className="max-w-[400px] md:max-w-[326px] w-full mx-auto mt-[35px] md:mt-[37px]">
            {!!verifySuccess && (
              <p className="text-center text-[12px] text-[#373737]">
                {verifySuccess}
              </p>
            )}

            <Button
              onClick={() => window.location.replace("/")}
              className="font-normal shadow-none hover:shadow-none normal-case bg-black p-0 w-[132px] h-[35px] mt-[102px] md:mt-[69px] mx-auto block rounded-[10px] text-white text-[12px] font-bakbak-one"
            >
              Return Home
            </Button>
          </div>

          <div className="flex justify-center items-center gap-x-[10px] sm:gap-x-[15px] md:gap-x-[20px]">
            <AuthContainerFooterLinks />
          </div>
        </div>
      </div>

      <Dialog
        open={!!isLoading && !verifySuccess}
        handler={() => {
          setIsLoading(false);
        }}
        size="xs"
        className="px-4 sm:p-0 bg-[#2D2D2D] max-w-[300px] w-full min-h-[282px] relative flex flex-col justify-center items-center gap-4"
      >
        <Loading
          className="!max-h-[300px] max-w-[200px]"
          containerClassName="!max-h-[120px]"
        />
        <h1 className="font-lato text-white font-bold">Wait for few seconds</h1>
      </Dialog>
    </div>
  );
};

export default EmailVerify;

EmailVerify.getLayout = function getLayout(page) {
  return <AuthLayout>{page}</AuthLayout>;
};
