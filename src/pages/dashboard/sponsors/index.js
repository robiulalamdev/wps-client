import { iDashEdit } from "../../../utils/icons/dashboard-icons/dashicons";
import SponsorWallpaper from "../../../components/dashboard-components/sponsors/SponsorWallpaper";
import { useState } from "react";
import SponsorUpdateModal from "../../../components/dashboard-components/sponsors/SponsorUpdateModal";
import {
  useAddNewTrendingSponsorMutation,
  useAddSponsorMutation,
  useGetMainSponsorsQuery,
  useGetNewTrendingSponsorsQuery,
  useGetOfficialSponsorsQuery,
} from "../../../redux/features/sponsor/sponsorApi";
import DashboardPrivateRoute from "@/middlewares/DashboardPrivateRoute";
import { ROLE_DATA } from "@/lib/config";
import DashboardLayout from "@/layouts/DashboardLayout";
import SponsorUpdateModalForWallpaper from "@/components/dashboard-components/sponsors/SponsorUpdateModalForWallpaper";

const Sponsors = () => {
  const { data: mainSponsors } = useGetMainSponsorsQuery();
  const { data: officialSponsors } = useGetOfficialSponsorsQuery();
  const { data: newTrendingSponsors } = useGetNewTrendingSponsorsQuery();

  // states
  const [selectedSearch, setSelectedSearch] = useState([]);
  const [selectedTrending, setSelectedTrending] = useState([]);

  const [open, setOpen] = useState(null);

  const handleOpen = (name) => {
    if (name) {
      setOpen(name);
    }
  };

  const [addSponsor, { isLoading }] = useAddSponsorMutation();
  const [addNewTrendingSponsor, { isLoading: newTrendingLoading }] =
    useAddNewTrendingSponsorMutation();

  const handleAdd = async (items = [], type) => {
    const options = {
      data: { items: items, type: type },
    };
    const result = await addSponsor(options);
    return result;
  };

  const handleAddNewTrending = async (items = []) => {
    const options = {
      data: { items: items, type: "Trending" },
    };
    const result = await addNewTrendingSponsor(options);
    return result;
  };

  return (
    <>
      <div className="flex flex-col justify-between w-full h-full gap-y-[36px]">
        <div className="mt-[19px]">
          <h1 className="text-center font-bakbak-one text-[30px] leading-normal font-normal text-white">
            Sponsors
          </h1>
          <div className="flex justify-center items-center gap-x-[9px] mt-[39px]">
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

        {/* section */}
        <div className="grid grid-cols-1 bg-[#121212] rounded-[10px] flex-grow w-full h-full px-[14px] pb-[27px] overflow-y-auto">
          <div>
            <dir className="w-full max- min-h-[52px] rounded-[10px] bg-[#222222] mx-auto flex justify-center items-center cursor-pointer">
              <div
                onClick={() => handleOpen("Main Sponsors")}
                className="max-w-[276px] w-full h-[40px] rounded-[10px] bg-[#1515154D] flex justify-center items-center gap-x-[8px]"
              >
                <h1 className="text-white font-lato font-medium text-[15px] leading-normal">
                  Main Page Sponsors
                </h1>
                {iDashEdit}
              </div>
            </dir>
            <div className="relative grid grid-cols-5 gap-x-[60px] px-[62px] mt-[31px]">
              <SponsorWallpaper
                items={mainSponsors?.data?.slice(0, 5)}
                srcKey="banner"
              />
            </div>
          </div>
          <div className="mt-[24px]removed">
            <dir className="w-full h-[52px] rounded-[10px] bg-[#222222] mx-auto flex justify-center items-center cursor-pointer">
              <div
                onClick={() => handleOpen("Official Wallpapers")}
                className="max-w-[276px] w-full h-[40px] rounded-[10px] bg-[#1515154D] flex justify-center items-center gap-x-[8px]"
              >
                <h1 className="text-white font-lato font-medium text-[15px] leading-normal">
                  Official Wallpapers
                </h1>
                {iDashEdit}
              </div>
            </dir>
            <div className="relative grid grid-cols-5 gap-x-[60px] px-[62px] mt-[37px]">
              <SponsorWallpaper
                items={officialSponsors?.data?.slice(0, 5)}
                srcKey="wallpaper"
              />
            </div>
          </div>
          <div className="mt-[24px]removed">
            <dir className="w-full h-[52px] rounded-[10px] bg-[#222222] mx-auto flex justify-center items-center cursor-pointer">
              <div
                onClick={() => handleOpen("Featured Trending & New")}
                className="max-w-[276px] w-full h-[40px] rounded-[10px] bg-[#1515154D] flex justify-center items-center gap-x-[8px]"
              >
                <h1 className="text-white font-lato font-medium text-[15px] leading-normal">
                  Featured Trending & New
                </h1>
                {iDashEdit}
              </div>
            </dir>
            <div className="relative grid grid-cols-5 gap-x-[60px] px-[62px] mt-[37px]">
              <SponsorWallpaper
                items={newTrendingSponsors?.data?.slice(0, 5)}
                srcKey="wallpaper"
              />
            </div>
          </div>
        </div>
      </div>
      {open === "Main Sponsors" && (
        <SponsorUpdateModal
          items={mainSponsors?.data?.slice(0, 4) || []}
          open={open === "Main Sponsors"}
          name="Main Sponsors"
          onClose={setOpen}
          handleAdd={handleAdd}
          isLoading={isLoading}
        />
      )}
      {open === "Official Wallpapers" && (
        <SponsorUpdateModalForWallpaper
          items={officialSponsors?.data?.slice(0, 4) || []}
          open={open === "Official Wallpapers"}
          name="Official Wallpapers"
          onClose={setOpen}
          handleAdd={handleAdd}
          isLoading={isLoading}
          type="Official"
        />
      )}
      {open === "Featured Trending & New" && (
        <SponsorUpdateModalForWallpaper
          items={newTrendingSponsors?.data?.slice(0, 4) || []}
          open={open === "Featured Trending & New"}
          name="Featured Trending & New"
          onClose={setOpen}
          handleAdd={handleAddNewTrending}
          isLoading={newTrendingLoading}
          type="Trending"
        />
      )}
    </>
  );
};

export default DashboardPrivateRoute(
  [ROLE_DATA.ADMIN, ROLE_DATA.MOD],
  Sponsors,
  DashboardLayout
);
