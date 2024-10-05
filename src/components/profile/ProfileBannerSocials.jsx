/* eslint-disable react/prop-types */
import Link from "next/link";
import { socialLinkItems } from "../../lib/data/globalData";
import BannerActionButtons from "./BannerActionButtons";

const ProfileBannerSocials = ({ author }) => {
  return (
    <>
      <div className="w-fit flex flex-col md:items-end mt-[14px] md:mt-[26px]">
        <BannerActionButtons author={author} />
        <div className="flex items-center justify-start md:justify-end gap-y-[10px] gap-x-[15px] mt-[12px] max-w-[127px] md:flex-wrap">
          {Object.entries(socialLinkItems)?.map((item, index) => (
            <>
              {author?.profile?.socials[item[0]] && (
                <Link
                  key={index}
                  target="_blank"
                  href={author?.profile?.socials[item[0]]}
                  className="cursor-pointer"
                >
                  <img
                    src={item[1].icon.src}
                    alt="icon"
                    className="max-w-[15px] md:max-w-[25px] object-contain"
                  />
                </Link>
              )}
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProfileBannerSocials;
