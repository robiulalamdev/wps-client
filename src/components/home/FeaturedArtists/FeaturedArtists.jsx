import { DefaultProfile } from "../../../lib/data/globalData";
import useViewImage from "../../../lib/hooks/useViewImage";
import { useGetPublicArtistsFeaturedQuery } from "../../../redux/features/featured/featuredApi";
import { Button } from "@material-tailwind/react";
import VerifiedRoleIcon from "../../common/global/VerifiedRoleIcon";
import { ROLE_DATA } from "../../../lib/config";
import { useRouter } from "next/router";

const FeaturedArtists = () => {
  const { viewResizeImg } = useViewImage();
  const { data } = useGetPublicArtistsFeaturedQuery();
  const router = useRouter();

  // console.log(data);
  return (
    <>
      {data?.data?.length > 0 && (
        <div>
          <h1 className="text-white text-center font-bakbak-one text-[15px] md:text-[35px] leading-[21px] font-normal mt-[39px] mb-[21px] md:mt-[63px] md:mb-[54px]">
            Featured Artists
          </h1>

          <div
            className="w-full h-fit bg-black/40 rounded-[10px] md:rounded-[40px] py-[8px] sm:py-[13px] md:pt-[29px] px-[8px] sm:px-[14px] md:px-[29px] lg:px-[39px] xl:px-[49px] 2xl:px-[59px] md:pb-[30px]
      grid grid-cols-4 lg:grid-cols-5 gap-x-[4px] sm:gap-x-[9px] lg:gap-x-[33px] xl:gap-x-[43px] 2xl:gap-x-[63px]
      "
          >
            {data.data?.map((artist, index) => (
              <div
                key={index}
                className={`bg-[#00000080] w-full max-w-[150px] md:max-w-[245px] md:w-full h-fit rounded-[5px] md:rounded-[20px] 
                  pt-[9px] pb-[12px] md:py-[18px] xl:py-[31px] px-[4px] mx-auto ${
                    index === 4 && "hidden lg:block"
                  }`}
              >
                <img
                  src={
                    viewResizeImg(artist?.profile_image, 150, 150) ||
                    DefaultProfile.src
                  }
                  alt="profile image"
                  className="w-[44px] h-[44px] md:w-[60px] md:h-[60px] lg:w-[80px] lg:h-[80px] xl:w-[100px] xl:h-[100px] 2xl:w-[130px] 2xl:h-[130px] rounded-full object-cover mx-auto"
                />

                <div className="md:flex items-center justify-center gap-x-[3px] mt-[7px] md:mt-[22px] hidden md:block">
                  <VerifiedRoleIcon
                    status={artist?.verified}
                    role={artist?.role}
                    className="!max-w-[12px] sm:max-w-[14px] md:!max-w-[22px]"
                  />

                  <p className="text-white text-[8px] sm:text-[10px] md:text-[15px] font-bakbak-one oneLine !text-center all_break">
                    {(artist?.role === ROLE_DATA.ARTIST && artist?.name) ||
                      (artist?.role === ROLE_DATA.BRAND && artist?.name) ||
                      artist?.username}
                  </p>
                </div>
                <div className="flex justify-center items-center mt-[8px] md:mt-[18px] lg:mt-[36px]">
                  <Button
                    onClick={() => router.push(`/profiles/${artist?.slug}`)}
                    className="w-[57px] h-[20px] sm:w-[77px] sm:h-[25px] md:w-[107px] md:h-[31px] shadow-none hover:shadow-none font-normal font-bakbak-one !text-[#FFF] text-[6px] sm:text-[8px]  md:text-[13px] normal-case p-0 rounded-[15px] bg-[#131313]"
                  >
                    View Profile
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default FeaturedArtists;
