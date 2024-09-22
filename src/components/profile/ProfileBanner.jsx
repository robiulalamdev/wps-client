/* eslint-disable react/prop-types */
import banner from "../../assets/images/profile/banner.png";
import profile from "../../assets/images/global/header/profile.png";
import ProfileBannerSocials from "./ProfileBannerSocials";
import useViewImage from "../../lib/hooks/useViewImage";
import moment from "moment";
import { useGetProfileActivityByIdQuery } from "../../redux/features/users/usersApi";
import { SocketContext } from "../../contextApi/SocketContext";
import { useContext } from "react";
import VerifiedRoleIcon from "../common/global/VerifiedRoleIcon";
import { ROLE_DATA } from "../../lib/config";
import useHighlight from "../../lib/hooks/useHighlight";

const ProfileBanner = ({ user }) => {
  const { highlightUrl } = useHighlight();
  const { socketUsers } = useContext(SocketContext);
  const { data } = useGetProfileActivityByIdQuery(user?._id);
  const { viewImg, viewResizeImg } = useViewImage();
  // console.log(user);

  const isActive = socketUsers.has(user?._id);
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
                viewResizeImg(user?.profile?.profile_image, 125, 125) || profile
              }
              alt="profile"
              className="size-[49px] md:size-[125px] rounded-full object-cover"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between gap-y-[20px]">
          <div className="mt-[8px] md:mt-[14px]">
            <div className="flex flex-col items-start w-full ml-[60px] md:ml-[128px]">
              <div className="flex items-center gap-x-[6px]">
                <h1 className="text-[#FFF] text-[20px] md:text-[30px] leading-normal font-bakbak-one oneLine">
                  {user?.role === ROLE_DATA.ARTIST
                    ? user?.name
                    : user?.username}
                </h1>
                <VerifiedRoleIcon status={user?.verified} role={user?.role} />
              </div>
              {user?.profile?.bio && (
                <h1 className="text-[#939393] text-[15px] leading-normal font-bakbak-one hidden md:block max-w-[300px] break-words">
                  {/* WPS Admin / AI Art */}
                  {highlightUrl(
                    user?.profile?.bio,
                    "text-[#FDF516] cursor-pointer"
                  )}
                </h1>
              )}
            </div>
            <div className="md:hidden mt-[8px]">
              <div className="flex items-center gap-x-[6px]">
                <h1 className="text-[#939393] text-[12px] leading-normal font-bold font-lato text-nowrap oneLine">
                  @{user?.slug}
                </h1>
              </div>
              {user?.profile?.bio && (
                <h1 className="text-[#939393] text-[12px] font-bold font-lato break-words">
                  {/* Founder & Developer */}
                  {highlightUrl(
                    user?.profile?.bio,
                    "text-[#FDF516] cursor-pointer"
                  )}
                </h1>
              )}
            </div>
          </div>

          <div className="flex-grow max-w-[419px] mx-auto w-full min-h-[46px] max-h-[46px] bg-[#00000033] rounded-[10px] xl:flex justify-between items-center px-[14px] hidden xl:inline-block mt-[14px] md:mt-[26px]">
            <div className="flex items-center gap-x-[12px]">
              <h1 className="text-[#ccc] font-bakbak-one text-[12px]">
                Uploads:
              </h1>{" "}
              <span className="text-[#939393] font-bakbak-one text-[12px]">
                {data?.data?.uploadTotal}
              </span>
            </div>
            <div className="flex items-center gap-x-[12px]">
              <h1 className="text-[#ccc] font-bakbak-one text-[12px]">
                Last Active:
              </h1>{" "}
              {isActive ? (
                <h1 className="text-[#80FF00] font-bakbak-one text-[12px] leading-normal">
                  Online
                </h1>
              ) : (
                <span className="text-[#939393] font-bakbak-one text-[12px] leading-normal">
                  {moment(data?.data?.lastActive).fromNow()}
                </span>
              )}
            </div>
            <div className="flex items-center gap-x-[12px]">
              <h1 className="text-[#ccc] font-bakbak-one text-[12px]">
                Member Since:
              </h1>{" "}
              <span className="text-[#939393] font-bakbak-one text-[12px]">
                {moment(data?.data?.memberSince?.createdAt).format("YYYY")}
              </span>
            </div>
          </div>

          <ProfileBannerSocials author={user} />
        </div>
      </div>
    </div>
  );
};

export default ProfileBanner;
