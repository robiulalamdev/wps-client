import {
  Button,
  Popover,
  PopoverContent,
  PopoverHandler,
} from "@material-tailwind/react";
import { iLogin, iLogout, iRegister } from "../../../utils/icons/icons";
import { useContext } from "react";
import { AuthContext } from "../../../contextApi/AuthContext";
import { useRouter } from "next/router";
import Link from "next/link";

const HeaderAU = () => {
  const { logout, user } = useContext(AuthContext);
  const router = useRouter();
  return (
    <>
      <div className="min-w-[183px] max-w-[183px] h-[45px] flex justify-between items-center bg-[#00000033] rounded-[10px] py-1">
        <Popover placement="bottom-start">
          <PopoverHandler>
            <Button className="flex-grow shadow-none hover:shadow-none w-full h-full text-white bg-transparent normal-case font-normal text-[15px] font-bakbak-one p-0 m-0 flex justify-center items-center rounded-none">
              Account
            </Button>
          </PopoverHandler>
          <PopoverContent className="p-0 shadow-none border-none bg-transparent">
            {!user?._id && (
              <>
                <div className="p-0 shadow-none border-none rounded-[10px] bg-[#00000080] w-[289px] h-[72px] grid grid-cols-2">
                  <Button
                    onClick={() => router.push("/auth/login")}
                    className="shadow-none hover:shadow-none w-full h-full text-[#fff] bg-transparent normal-case font-normal text-[15px] font-bakbak-one p-0 m-0 flex justify-center items-center gap-x-[7px] border-r border-[#373737] rounded-none"
                  >
                    {iLogin} Login
                  </Button>
                  <Button
                    onClick={() => router.push("/auth/signup")}
                    className="shadow-none hover:shadow-none w-full h-full text-[#fff] bg-transparent normal-case font-normal text-[15px] font-bakbak-one p-0 m-0 flex justify-center items-center gap-x-[7px] rounded-none"
                  >
                    {iRegister} Register
                  </Button>
                </div>
              </>
            )}
            {user?._id && (
              <div
                className="backdrop-blur-md w-[313px] min-h-[180px] rounded-[10px] pt-[28px] pb-[17px]"
                style={{ background: "rgba(0, 0, 0, 0.50)" }}
              >
                <div className="max-w-[240px] mx-auto grid grid-cols-2 h-fit bg-transparent">
                  <div className="border-r-[1px] border-[#292D31] pl-[21px]">
                    <Link href="/my-profile">
                      <p className="text-white text-[15px] font-bakbak-one">
                        Profile
                      </p>
                    </Link>
                    <Link href="/media-center/favorites">
                      <p className="text-white text-[15px] font-bakbak-one mt-[20px]">
                        Favorites
                      </p>
                    </Link>
                    <Link href="/media-center/collections">
                      <p className="text-white text-[15px] font-bakbak-one mt-[20px] mb-[11px]">
                        Collections
                      </p>
                    </Link>
                  </div>

                  <div className="pl-[31px]">
                    <Link href="/messages">
                      <p className="text-white text-[15px] font-bakbak-one">
                        Messages
                      </p>
                    </Link>
                    <Link href="/vault">
                      <p className="text-white text-[15px] font-bakbak-one mt-[20px]">
                        The Vault
                      </p>
                    </Link>
                    <Link href="/account-settings">
                      <p className="text-white text-[15px] font-bakbak-one mt-[20px] mb-[11px]">
                        Settings
                      </p>
                    </Link>
                  </div>

                  <svg
                    width="100%"
                    height="1"
                    viewBox="0 0 359 1"
                    fill="none"
                    className="col-span-2"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <line
                      x1="4.37114e-08"
                      y1="0.5"
                      x2="359"
                      y2="0.500031"
                      stroke="#292D31"
                    />
                  </svg>
                </div>
                <div
                  onClick={() => logout()}
                  className="flex items-center justify-center gap-x-[7px] font-bakbak-one text-[12px] text-[#939393] mt-[9px] cursor-pointer"
                >
                  {iLogout}
                  <p>Log Out</p>
                </div>
              </div>
            )}
          </PopoverContent>
        </Popover>
        <div className="w-[2px] h-[28px] bg-[#292929]"></div>

        <Button
          onClick={() => router.push("/upload")}
          className="flex-grow shadow-none hover:shadow-none w-full h-full text-white bg-transparent normal-case font-normal text-[15px] font-bakbak-one p-0 m-0 flex justify-center items-center rounded-none"
        >
          Upload
        </Button>
      </div>
    </>
  );
};

export default HeaderAU;
