/* eslint-disable react/prop-types */
import banner from "../../assets/images/profile/banner.png";
import profile from "../../assets/images/official-brands-profile/profile.png";
import useViewImage from "../../lib/hooks/useViewImage";
import OfficialBrandProfileSocial from "./OfficialBrandProfileSocial";
import VerifiedRoleIcon from "../common/global/VerifiedRoleIcon";
import useHighlight from "../../lib/hooks/useHighlight";

const OfficialBrandBanner = ({ user }) => {
  const { highlightUrl } = useHighlight();
  const { viewImg, viewResizeImg } = useViewImage();

  return (
    <div>
      <div className="pl-[4px] md:pl-[29px] relative">
        <div
          className="h-[106px] md:h-[300px] w-full rounded-[10px] relative"
          style={{
            backgroundImage: `url(${
              viewImg(user?.profile?.banner)?.replaceAll(/\\/g, "/") || banner
            })`,
            backgroundPositionX: "center",
            backgroundPositionY: "center",
            backgroundSize: "cover",
          }}
        >
          <div className="rounded-full size-[59px] md:size-[143px] flex justify-center items-center bg-[#00000033] absolute -left-[10px] md:-left-[30px] -bottom-[40px] md:-bottom-[100px]">
            <img
              src={
                viewResizeImg(user?.profile?.profile_image, 125, 125) ||
                profile.src
              }
              alt="profile"
              className="size-[49px] md:size-[125px] rounded-full object-cover"
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between gap-y-[20px]">
          <div className="mt-[8px] md:mt-[12px]">
            <div className="flex items-end md:items-start w-full ml-[60px] md:ml-[128px] gap-x-[32px]">
              <div className="flex flex-col items-start w-full">
                <div className="flex items-center gap-x-[6px]">
                  {user?.name && (
                    <h1 className="text-[#FFF] text-[20px] md:text-[30px] leading-normal font-bakbak-one oneLine m-0 p-0">
                      {user?.name}
                    </h1>
                  )}

                  <VerifiedRoleIcon status={user?.verified} role={user?.role} />
                </div>
                {user?.slug && (
                  <h1 className="text-[#939393] text-[12px] leading-normal font-bold font-lato text-nowrap oneLine hidden md:block mb-[7px]">
                    @{user?.slug}
                  </h1>
                )}

                {user?.profile?.bio && (
                  <p className="text-[#FFF] font-lato text-[15px] font-semibold leading-[22.575px] break-words hidden md:block max-w-[300px]">
                    {highlightUrl(
                      user?.profile?.bio,
                      "text-[#FDF516] cursor-pointer"
                    )}
                  </p>
                )}
              </div>
            </div>
            {user?.profile?.bio && (
              <p className="text-[#FFF] font-lato text-[12px] md:text-[15px] font-semibold leading-[22.575px] break-words md:hidden">
                {highlightUrl(
                  user?.profile?.bio,
                  "text-[#FDF516] cursor-pointer"
                )}
              </p>
            )}
          </div>

          <OfficialBrandProfileSocial author={user} />
        </div>
      </div>
    </div>
  );
};

export default OfficialBrandBanner;
