/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import Link from "next/link";
import { socialLinkItems } from "../../lib/data/globalData";
import {
  iShare1,
  iShare2,
  iShare3,
  iShare4,
  iShare5,
  iShare6,
} from "../../utils/icons/icons";
import BannerActionButtons from "../profile/BannerActionButtons";

const OfficialBrandProfileSocial = ({ author }) => {
  return (
    <>
      <div className="w-fit flex flex-col md:items-end mt-[8px] md:mt-[22px]">
        <BannerActionButtons author={author} brand={true} />
        <div className="flex items-center justify-start md:justify-end gap-y-[10px] gap-x-[15px] mt-[12px] max-w-[127px] flex-wrap">
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

export default OfficialBrandProfileSocial;
