/* eslint-disable react/prop-types */
import Image from "next/image";
import { ROLE_DATA } from "../../../lib/config";
import { VERIFICATION_ICONS } from "../../../lib/data/globalData";

const VerifiedRoleIcon = ({ status = null, role = null, className = "" }) => {
  return (
    <>
      {status === true && role && (
        <>
          {role === ROLE_DATA.USER && (
            <Image
              src={VERIFICATION_ICONS.USER}
              className={`${
                className
                  ? className
                  : "min-w-[17px] max-w-[17px] min-h-[17px] max-h-[17px] md:min-w-[22px] md:max-w-[22px] md:min-h-[22px] md:max-h-[22px]"
              }`}
            />
          )}
          {role === ROLE_DATA.ARTIST && (
            <Image
              src={VERIFICATION_ICONS.ARTIST}
              className={`${
                className
                  ? className
                  : "min-w-[17px] max-w-[17px] min-h-[17px] max-h-[17px] md:min-w-[22px] md:max-w-[22px] md:min-h-[22px] md:max-h-[22px]"
              }`}
            />
          )}
          {role === ROLE_DATA.BRAND && (
            <Image
              src={VERIFICATION_ICONS.BRAND}
              className={`${
                className
                  ? className
                  : "min-w-[17px] max-w-[17px] min-h-[17px] max-h-[17px] md:min-w-[22px] md:max-w-[22px] md:min-h-[22px] md:max-h-[22px]"
              }`}
            />
          )}
          {role === ROLE_DATA.ADMIN && (
            <Image
              src={VERIFICATION_ICONS.ADMIN}
              className={`${
                className
                  ? className
                  : "min-w-[17px] max-w-[17px] min-h-[17px] max-h-[17px] md:min-w-[22px] md:max-w-[22px] md:min-h-[22px] md:max-h-[22px]"
              }`}
            />
          )}
          {role === ROLE_DATA.MOD && (
            <Image
              src={VERIFICATION_ICONS.MOD}
              className={`${
                className
                  ? className
                  : "min-w-[17px] max-w-[17px] min-h-[17px] max-h-[17px] md:min-w-[22px] md:max-w-[22px] md:min-h-[22px] md:max-h-[22px]"
              }`}
            />
          )}
        </>
      )}
    </>
  );
};

export default VerifiedRoleIcon;
