import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="w-full h-fit mt-[145px]">
      <div className="flex flex-col md:flex-row items-start gap-y-[13px] md:gap-x-[189px] font-bakbak-one">
        <h1 className="text-white text-[30px] md:text-[40px] font-bakbak-one">
          THE WALLPAPER SOCIETY
        </h1>

        <div className="flex items-start gap-x-[58px] md:gap-x-[122px]">
          <div className="grid grid-cols-1">
            <p className="text-[15px] md:text-[20px] text-white font-bakbak-one mb-[9px] md:mb-[4px]">
              Navigation
            </p>
            <Link href="/home">
              <p className="text-[#939393] font-bakbak-one text-[15px] mt-[7px] md:mt-[4px]">
                Home
              </p>
            </Link>
            <Link href="/account-settings">
              <p className="text-[#939393] font-bakbak-one text-[15px] mt-[7px] md:mt-[4px]">
                Account
              </p>
            </Link>
            <Link href="/media-center/favorites">
              <p className="text-[#939393] font-bakbak-one text-[15px] mt-[7px] md:mt-[4px]">
                Favorites
              </p>
            </Link>
            <Link href="/messages">
              <p className="text-[#939393] font-bakbak-one text-[15px] mt-[7px] md:mt-[4px]">
                Messages
              </p>
            </Link>
          </div>
          <div className="grid grid-cols-1">
            <p className="text-[15px] md:text-[20px] text-white font-bakbak-one mb-[9px] md:mb-[4px]">
              The Society
            </p>
            <Link href="/about">
              <p className="text-[#939393] font-bakbak-one text-[15px] mt-[7px] md:mt-[4px]">
                About
              </p>
            </Link>
            <Link href="/contact">
              <p className="text-[#939393] font-bakbak-one text-[15px] mt-[7px] md:mt-[4px]">
                Contact
              </p>
            </Link>
            <Link href="/copyright-information">
              <p className="text-[#939393] font-bakbak-one text-[15px] mt-[7px] md:mt-[4px]">
                Copyright Information
              </p>
            </Link>
            <Link href="/socials">
              <p className="text-[#939393] font-bakbak-one text-[15px] mt-[7px] md:mt-[4px]">
                Socials
              </p>
            </Link>
            <Link href="/contact">
              <p className="text-[#939393] font-bakbak-one text-[15px] mt-[7px] md:mt-[4px]">
                Sponsors / Advertisers
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
