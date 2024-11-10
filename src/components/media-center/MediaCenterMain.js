/* eslint-disable react/prop-types */
import { Button } from "@material-tailwind/react";
import RulesHeader from "../../components/shared/headers/RulesHeader";
import { useMemo, useState } from "react";
import MediaCenterSidebar from "../../components/media-center/MediaCenterSidebar";
import filter from "../../assets/icons/search-wallpapers/filter.gif";
import MediaCenterFavoriteAria from "../../components/media-center/MediaCenterFavoriteAria";
import MediaCenterCollectionAria from "../../components/media-center/MediaCenterCollectionAria";
import { useGetMyFavoritesQuery } from "../../redux/features/favorites/favoritesApi";
import { useGetMyCollectionsQuery } from "../../redux/features/collections/collectionsApi";

const MediaCenterMain = ({ pathname = "Favorites" }) => {
  const { data: favoriteData } = useGetMyFavoritesQuery();
  const { data: collectionData } = useGetMyCollectionsQuery();
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState(pathname || "Favorites");

  const [favoriteWallpapers, setFavoriteWallpapers] = useState([]);
  const [collectionWallpapers, setCollectionWallpapers] = useState([]);
  const [selectedFavoriteWallpapers, setSelectedFavoriteWallpapers] = useState(
    []
  );
  const [selectedCollectionWallpapers, setSelectedCollectionWallpapers] =
    useState([]);

  useMemo(() => {
    if (favoriteData?.data?.length > 0) {
      setFavoriteWallpapers(favoriteData?.data);
    }
  }, [favoriteData]);

  useMemo(() => {
    if (pathname) {
      setTab(pathname);
    }
  }, [pathname]);

  useMemo(() => {
    if (collectionData?.data?.length > 0) {
      setCollectionWallpapers(collectionData?.data);
    }
  }, [collectionData]);

  const handleSelectFavoriteWallpapers = async (item) => {
    const itemIndex = await selectedFavoriteWallpapers.findIndex(
      (sItem) => sItem?._id === item?._id
    );
    if (itemIndex !== -1) {
      const stored = [...selectedFavoriteWallpapers];
      stored.splice(itemIndex, 1);
      setSelectedFavoriteWallpapers(stored);
    } else {
      setSelectedFavoriteWallpapers([...selectedFavoriteWallpapers, item]);
    }
  };

  const handleSelectCollectionWallpapers = async (item) => {
    const itemIndex = await selectedCollectionWallpapers.findIndex(
      (sItem) => sItem?._id === item?._id
    );
    if (itemIndex !== -1) {
      const stored = [...selectedCollectionWallpapers];
      stored.splice(itemIndex, 1);
      setSelectedCollectionWallpapers(stored);
    } else {
      setSelectedCollectionWallpapers([...selectedCollectionWallpapers, item]);
    }
  };

  return (
    <>
      <RulesHeader />
      <div className="">
        <h1 className="text-[15px] md:text-[25px] text-center font-bakbak-one text-[#FFF] mb-[15px] md:mb-[40px]">
          The Command Center
        </h1>
        {/* <div className="border-t-[1px] border-[#5A5A5A] w-full mb-[11px] md:mb-[62px]"></div> */}
        <div className="w-full mb-[11px] md:mb-[62px]"></div>

        <p className="text-center font-lato text-[12px] text-[#939393]">
          All favorite wallpapers and collections will be displayed on your
          public profile unless you make privacy adjustments within the command
          center.
        </p>

        <div className="max-w-[295px] w-full flex justify-start items-center lg:justify-center mb-[24px] md:mb-[30px]">
          <div className="bg-[#00000033] rounded-[100px] w-[172px] h-[45px] flex justify-between items-center px-[8px] mt-[9px] xl:mt-0">
            {["Favorites", "Collections"].map((t, i) => (
              <Button
                onClick={() => setTab(t)}
                key={i}
                className={`hover:shadow-none shadow-none p-0 m-0 normal-case font-lato text-[12px] leading-[14.4px] font-bold w-[72px] h-[32px] ${
                  tab === t
                    ? `bg-[#DD2E44] !text-white rounded-[100px]`
                    : "bg-transparent !text-[#C6C6C6]"
                }`}
              >
                {t}
              </Button>
            ))}
          </div>
          <img
            onClick={() => setOpen(!open)}
            src={filter.src}
            alt=""
            className="w-[57px] h-[39px] lg:hidden"
          />
        </div>

        <div className="flex justify-between items-start gap-x-[42px]">
          {tab === "Favorites" ? (
            <MediaCenterSidebar
              open={open}
              setOpen={setOpen}
              tab={tab}
              setTab={setTab}
              items={favoriteWallpapers}
              selectedItems={selectedFavoriteWallpapers}
              resetSelect={setSelectedFavoriteWallpapers}
            />
          ) : (
            <MediaCenterSidebar
              open={open}
              setOpen={setOpen}
              tab={tab}
              setTab={setTab}
              items={collectionWallpapers}
              selectedItems={selectedCollectionWallpapers}
              resetSelect={setSelectedCollectionWallpapers}
            />
          )}

          {tab === "Favorites" && (
            <MediaCenterFavoriteAria
              items={favoriteWallpapers}
              selectedItems={selectedFavoriteWallpapers}
              handleSelectFavoriteWallpapers={handleSelectFavoriteWallpapers}
            />
          )}

          {tab === "Collections" && (
            <MediaCenterCollectionAria
              items={collectionWallpapers}
              selectedItems={selectedCollectionWallpapers}
              handleSelectCollectionWallpapers={
                handleSelectCollectionWallpapers
              }
            />
          )}
        </div>
      </div>
    </>
  );
};

export default MediaCenterMain;
