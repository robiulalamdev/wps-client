import { useState } from "react";
import FeaturedWallpapersModal from "../../../components/dashboard-components/FeaturedComponets/FeaturedWallpapersModal";
import { iDashEdit } from "../../../utils/icons/dashboard-icons/dashicons";
import {
  useAddFeaturedMutation,
  useGetContactFeaturedQuery,
  useGetStaffFeaturedQuery,
} from "../../../redux/features/wallpapers/wallpapersApi";
import FeaturedStaffPicksModal from "../../../components/dashboard-components/FeaturedComponets/FeaturedStaffPicksModal";
import FeaturedContactFormModal from "../../../components/dashboard-components/FeaturedComponets/FeaturedContactFormModal";
import FeaturedCredentialsModal from "../../../components/dashboard-components/FeaturedComponets/FeaturedCredentialsModal";
import FeaturedBrandSearchModal from "../../../components/dashboard-components/FeaturedComponets/FeaturedBrandSearchModal";
import FeaturedArtistsModal from "../../../components/dashboard-components/FeaturedComponets/FeaturedArtistsModal";
import FeaturedSingleWallpaper from "../../../components/dashboard-components/FeaturedComponets/FeaturedSingleWallpaper";
import useViewImage from "../../../lib/hooks/useViewImage";
import {
  useArtistsFeaturedQuery,
  useBrandsFeaturedQuery,
  useCredentialFeaturedQuery,
  useFeaturedWallpaperQuery,
} from "../../../redux/features/featured/featuredApi";
import { DefaultProfile } from "../../../lib/data/globalData";
import LazyWallpaper from "../../../components/common/wallpaper/LazyWallpaper";
import DashboardPrivateRoute from "@/middlewares/DashboardPrivateRoute";
import { ROLE_DATA } from "@/lib/config";
import DashboardLayout from "@/layouts/DashboardLayout";

const Featured = () => {
  const { viewResizeImg } = useViewImage();
  const { data: featuredWall } = useFeaturedWallpaperQuery();
  const { data: featuredContact } = useGetContactFeaturedQuery();
  const { data: featuredStaff } = useGetStaffFeaturedQuery();
  const { data: featuredCredentials } = useCredentialFeaturedQuery();
  const { data: featuredArtists } = useArtistsFeaturedQuery();
  const { data: featuredBrands } = useBrandsFeaturedQuery();

  const [openFWModal, setOpenFWModal] = useState(false);
  const [openFStaffPickModal, setOpenFStaffPickModal] = useState(false);
  const [openFContactFormModal, setOpenFContactFormModal] = useState(false);
  const [openFCredentialsModal, setOpenFCredentialsModal] = useState(false);
  const [openFBrandSearchModal, setOpenFBrandSearchModal] = useState(false);
  const [openFArtistModal, setOpenFArtistModal] = useState(false);

  const [addFeatured, { isLoading }] = useAddFeaturedMutation();

  const handleAddFeatured = async (items = [], type) => {
    const options = {
      data: { items: items, type: type },
    };
    const result = await addFeatured(options);
    return result;
  };

  return (
    <>
      <div className="flex flex-col justify-between w-full h-full gap-y-[36px]">
        <div className="mt-[21px]">
          <h1
            // onClick={() => handleAddFeatured([], [])}
            className="text-center font-bakbak-one text-[30px] leading-normal font-normal text-white"
          >
            Featured
          </h1>
          <div className="flex justify-center items-center gap-x-[9px] mt-[47px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="19"
              viewBox="0 0 22 19"
              fill="none"
            >
              <path
                d="M11 3.99L18.53 17H3.47L11 3.99ZM11 0L0 19H22L11 0ZM12 14H10V16H12V14ZM12 8H10V12H12V8Z"
                fill="#FF0000"
              />
            </svg>
            <p className="text-[15px] font-normal leading-normal text-white font-lato">
              Any modifications implemented here will have immediate effects on
              the content displayed on the main page and other pages modified.
              Please proceed with caution.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 bg-[#121212] rounded-[10px] flex-grow w-full h-full pl-[24px] pr-[18px] overflow-y-auto">
          <div className="border-r-[1px] border-[#1C1C1C] flex-1 pt-[14px] pb-[32px] pr-[12px]">
            <div className="">
              <dir className="w-full h-[52px] rounded-[10px] bg-[#222222] mx-auto flex justify-center items-center cursor-pointer">
                <div
                  onClick={() => setOpenFWModal(!openFWModal)}
                  className="max-w-[276px] w-full h-[40px] rounded-[10px] bg-[#1515154D] flex justify-center items-center gap-x-[8px]"
                >
                  <h1 className="text-white font-lato font-medium text-[15px] leading-normal">
                    Featured Wallpapers
                  </h1>
                  {iDashEdit}
                </div>
              </dir>
              <div className="grid grid-cols-3 gap-x-[18px] mt-[32px] min-h-[115px]">
                {featuredWall?.data?.slice(0, 3).map((item, index) => (
                  <FeaturedSingleWallpaper key={index} data={item} />
                ))}
              </div>
            </div>
            <div className="mt-[24px]">
              <dir className="w-full h-[52px] rounded-[10px] bg-[#222222] mx-auto flex justify-center items-center cursor-pointer">
                <div
                  onClick={() => setOpenFStaffPickModal(!openFStaffPickModal)}
                  className="max-w-[276px] w-full h-[40px] rounded-[10px] bg-[#1515154D] flex justify-center items-center gap-x-[8px]"
                >
                  <h1 className="text-white font-lato font-medium text-[15px] leading-normal">
                    Staff Picks
                  </h1>
                  {iDashEdit}
                </div>
              </dir>
              <div className="grid grid-cols-3 gap-x-[18px] mt-[32px]">
                {featuredStaff?.data?.slice(0, 3).map((item, index) => (
                  <FeaturedSingleWallpaper key={index} data={item} />
                ))}
              </div>
            </div>
            <div className="mt-[24px]">
              <dir className="w-full h-[52px] rounded-[10px] bg-[#222222] mx-auto flex justify-center items-center cursor-pointer">
                <div
                  onClick={() =>
                    setOpenFCredentialsModal(!openFCredentialsModal)
                  }
                  className="max-w-[276px] w-full h-[40px] rounded-[10px] bg-[#1515154D] flex justify-center items-center gap-x-[8px]"
                >
                  <h1 className="text-white font-lato font-medium text-[15px] leading-normal">
                    Credentials
                  </h1>
                  {iDashEdit}
                </div>
              </dir>
              <div className="grid grid-cols-3 gap-x-[18px] mt-[32px]">
                {featuredCredentials?.data?.slice(0, 3).map((item, index) => (
                  <FeaturedSingleWallpaper key={index} data={item} />
                ))}
              </div>
            </div>
          </div>
          <div className="flex-1 pt-[14px] pb-[32px] pl-[12px]">
            <div className="">
              <dir className="w-full h-[52px] rounded-[10px] bg-[#222222] mx-auto flex justify-center items-center cursor-pointer">
                <div
                  onClick={() => setOpenFArtistModal(!openFArtistModal)}
                  className="max-w-[276px] w-full h-[40px] rounded-[10px] bg-[#1515154D] flex justify-center items-center gap-x-[8px]"
                >
                  <h1 className="text-white font-lato font-medium text-[15px] leading-normal">
                    Featured Artists
                  </h1>
                  {iDashEdit}
                </div>
              </dir>
              <div className="flex justify-center items-center gap-x-[60px] min-h-[115px] mt-[32px]">
                {featuredArtists?.data?.slice(0, 5).map((item, index) => (
                  <img
                    key={index}
                    src={
                      viewResizeImg(item?.profile_image, 80, 80) ||
                      DefaultProfile.src
                    }
                    alt=""
                    className="w-[80px] h-[80px] object-cover rounded-full"
                  />
                ))}
              </div>
            </div>
            <div className="mt-[24px]">
              <dir className="w-full h-[52px] rounded-[10px] bg-[#222222] mx-auto flex justify-center items-center cursor-pointer">
                <div
                  onClick={() =>
                    setOpenFContactFormModal(!openFContactFormModal)
                  }
                  className="max-w-[276px] w-full h-[40px] rounded-[10px] bg-[#1515154D] flex justify-center items-center gap-x-[8px]"
                >
                  <h1 className="text-white font-lato font-medium text-[15px] leading-normal">
                    Contact Form
                  </h1>
                  {iDashEdit}
                </div>
              </dir>
              <div className="grid grid-cols-3 gap-x-[18px] mt-[32px]">
                {featuredContact?.data?.slice(0, 3).map((item, index) => (
                  <FeaturedSingleWallpaper key={index} data={item} />
                ))}
              </div>
            </div>
            <div className="mt-[24px]">
              <dir className="w-full h-[52px] rounded-[10px] bg-[#222222] mx-auto flex justify-center items-center cursor-pointer">
                <div
                  onClick={() =>
                    setOpenFBrandSearchModal(!openFBrandSearchModal)
                  }
                  className="max-w-[276px] w-full h-[40px] rounded-[10px] bg-[#1515154D] flex justify-center items-center gap-x-[8px]"
                >
                  <h1 className="text-white font-lato font-medium text-[15px] leading-normal">
                    Featured Brands
                  </h1>
                  {iDashEdit}
                </div>
              </dir>
              <div className="grid grid-cols-3 gap-x-[18px] mt-[32px]">
                {featuredBrands?.data?.slice(0, 3).map((item, index) => (
                  <div
                    key={index}
                    className={`w-full h-[115px] rounded-[5px] relative`}
                  >
                    <LazyWallpaper
                      src={item?.banner}
                      alt={item?.banner}
                      maxWidth={240}
                      maxHeight={115}
                      width={240}
                      height={115}
                      className="w-full h-full rounded-[5px] object-cover cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <FeaturedWallpapersModal
        open={openFWModal}
        name="Featured Wallpapers"
        onClose={setOpenFWModal}
        items={featuredWall?.data?.slice(0, 6) || []}
        handleAdd={handleAddFeatured}
        isLoading={isLoading}
      />
      <FeaturedStaffPicksModal
        open={openFStaffPickModal}
        name="Staff Picks"
        onClose={setOpenFStaffPickModal}
        items={featuredStaff?.data?.slice(0, 6) || []}
        handleAdd={handleAddFeatured}
        isLoading={isLoading}
      />
      <FeaturedContactFormModal
        open={openFContactFormModal}
        name="Contact Form"
        onClose={setOpenFContactFormModal}
        items={featuredContact?.data?.slice(0, 6) || []}
        handleAdd={handleAddFeatured}
        isLoading={isLoading}
      />
      <FeaturedCredentialsModal
        open={openFCredentialsModal}
        name="Credentials"
        onClose={setOpenFCredentialsModal}
        items={featuredCredentials?.data?.slice(0, 6) || []}
        handleAdd={handleAddFeatured}
        isLoading={isLoading}
      />
      <FeaturedBrandSearchModal
        open={openFBrandSearchModal}
        name="Featured Brands"
        onClose={setOpenFBrandSearchModal}
        items={featuredBrands?.data?.slice(0, 10) || []}
        handleAdd={handleAddFeatured}
        isLoading={isLoading}
      />
      <FeaturedArtistsModal
        open={openFArtistModal}
        name="Featured Artists"
        onClose={setOpenFArtistModal}
        items={featuredArtists?.data?.slice(0, 6) || []}
        handleAdd={handleAddFeatured}
        isLoading={isLoading}
      />
    </>
  );
};

export default DashboardPrivateRoute(
  [ROLE_DATA.ADMIN, ROLE_DATA.MOD],
  Featured,
  DashboardLayout
);
