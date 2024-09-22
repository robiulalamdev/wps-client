import Link from "next/link";
import logo from "../../../assets/brand/logo.png";
import Image from "next/image";

const AuthHeader = () => {
  return (
    <>
      <div className="flex items-center justify-between w-full mt-[23px]">
        <Link href="/">
          <Image
            src={logo}
            alt="logo"
            className="w-[60px] h-[32px] lg:w-[85px] lg:h-[56px] object-contain cursor-pointer"
          />
        </Link>
      </div>
    </>
  );
};

export default AuthHeader;
