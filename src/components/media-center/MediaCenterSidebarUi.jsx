/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Button } from "@material-tailwind/react";
import React, { useMemo, useState } from "react";
import { toast } from "react-toastify";
import {
  useRemoveFavoritesMutation,
  useUpdateFavoritesMutation,
} from "../../redux/features/favorites/favoritesApi";
import { SpinnerCircularFixed } from "spinners-react";
import {
  useCreateCollectionMutation,
  useRemoveCollectionsByIdsMutation,
  useUpdateCollectionsMutation,
} from "../../redux/features/collections/collectionsApi";
import MediaCenterCreateCollectionModal from "./MediaCenterCreateCollectionModal";

const MediaCenterSidebarUi = ({
  tab,
  setTab,
  items,
  selectedItems,
  resetSelect,
}) => {
  const [hideProfile, setHideProfile] = useState("");
  const [hideCollection, setHideCollection] = useState("");
  const [favoriteUpdateIsLoading, setFavoriteUpdateIsLoading] = useState(false);
  const [collectionUpdateIsLoading, setCollectionUpdateIsLoading] =
    useState(false);
  const [collectionRemoveIsLoading, setCollectionRemoveIsLoading] =
    useState(false);
  const [removeFavorites] = useRemoveFavoritesMutation();
  const [updateFavorites] = useUpdateFavoritesMutation();
  const [updateCollections] = useUpdateCollectionsMutation();
  const [removeCollections] = useRemoveCollectionsByIdsMutation();

  const [open, setOpen] = useState(false);
  const [collectionName, setCollectionName] = useState("");

  const handleRemoveList = async () => {
    const ids = await selectedItems?.map((element) => {
      return element?._id;
    });

    const options = {
      data: { ids: ids },
    };
    const result = await removeFavorites(options);
    if (result?.data?.success) {
      toast.success(result?.data?.message);
      resetSelect([]);
    } else {
      toast.error(result?.data?.message);
    }
  };

  const handleRemoveCollections = async () => {
    setCollectionRemoveIsLoading(true);
    const ids = await selectedItems?.map((element) => {
      return element?._id;
    });

    const options = {
      data: { ids: ids },
    };
    const result = await removeCollections(options);
    if (result?.data?.success) {
      toast.success(result?.data?.message);
      resetSelect([]);
    } else {
      toast.error(result?.data?.message);
    }
    setCollectionRemoveIsLoading(false);
  };

  const handleUpdateFavorites = async () => {
    setFavoriteUpdateIsLoading(true);
    const ids = await selectedItems?.map((element) => {
      return element?._id;
    });

    const options = {
      data: {
        ids: ids,
        updateData: { status: hideProfile === "Visible" ? true : false },
      },
    };
    const result = await updateFavorites(options);
    if (result?.data?.success) {
      toast.success(result?.data?.message);
      resetSelect([]);
    } else {
      toast.error(result?.data?.message);
    }
    setFavoriteUpdateIsLoading(false);
  };

  const handleUpdateCollections = async () => {
    setCollectionUpdateIsLoading(true);
    const ids = await selectedItems?.map((element) => {
      return element?._id;
    });

    const updateData = {
      status: hideCollection === "Visible" ? true : false,
    };

    if (collectionName) {
      updateData["name"] = collectionName;
    }

    const options = {
      data: {
        ids: ids,
        updateData: updateData,
      },
    };
    const result = await updateCollections(options);
    if (result?.data?.success) {
      toast.success(result?.data?.message);
      resetSelect([]);
      setCollectionName("");
    } else {
      toast.error(result?.data?.message);
    }
    setCollectionUpdateIsLoading(false);
  };

  useMemo(() => {
    if (selectedItems?.length > 0) {
      if (tab === "Collections") {
        if (selectedItems?.length === 1) {
          setHideCollection(selectedItems[0]?.status ? "Visible" : "Hidden");
          setCollectionName(selectedItems[0]?.name);
        } else {
          setHideCollection("");
          setCollectionName("");
        }
      } else {
        if (selectedItems?.length === 1) {
          setHideProfile(selectedItems[0]?.status ? "Visible" : "Hidden");
        } else {
          setHideProfile("");
        }
      }
    }
  }, [selectedItems]);

  return (
    <div className="max-w-[295px] min-w-[295px] w-full rounded-[10px] lg:bg-black/20 h-[620px]">
      <h1 className="text-center font-bakbak-one text-[#fff] text-[12px] pt-[13px]">
        Select Wallpapers
      </h1>
      {tab === "Favorites" ? (
        <>
          {selectedItems?.length > 0 && (
            <>
              <h1 className="text-center font-lato text-[#fff] text-[15px] pt-[36px]">
                Remove from list
              </h1>

              <div
                onClick={() => handleRemoveList()}
                className="w-[81px] h-[36px] bg-[#00000033] hover:bg-primary flex justify-center items-center cursor-pointer mt-[18px] mx-auto rounded-full"
              >
                <p className="text-[12px] text-[#fff] text-center font-lato">
                  Remove
                </p>
              </div>

              <h1 className="text-center font-lato text-[#fff] text-[15px] pt-[41px]">
                Hide from profile
              </h1>

              <div className="bg-[#00000033] rounded-[10px] w-[153px] h-[35px] flex justify-between items-center px-[8px] mt-[24px] mx-auto">
                {["Visible", "Hidden"].map((t, i) => (
                  <Button
                    onClick={() => setHideProfile(t)}
                    key={i}
                    className={`hover:shadow-none shadow-none p-0 m-0 normal-case font-lato text-[12px] leading-[14.4px] font-bold w-[58px] h-[27px] ${
                      hideProfile === t
                        ? `${
                            hideProfile === "Visible"
                              ? "bg-[#0AB745]"
                              : "bg-[#FF003D]"
                          } !text-white rounded-[30px]`
                        : "bg-transparent !text-[#C6C6C6]"
                    }`}
                  >
                    {t}
                  </Button>
                ))}
              </div>

              <div className="border-t-[1px] border-[#9393931A] max-w-[234px] w-full mx-auto mt-[35px]"></div>

              <Button
                onClick={() => handleUpdateFavorites()}
                className="font-normal normal-case bg-[#2924FF] w-[129px] h-[38px] rounded-[5px] mx-auto mt-[45px] lg:mt-[207px] hover:shadow-none shadow-none font-bakbak-one text-[15px] text-[#C4C4C4] inline-block p-0 leading-normal flex justify-center items-center gap-2"
              >
                {favoriteUpdateIsLoading && (
                  <SpinnerCircularFixed
                    size={20}
                    thickness={180}
                    speed={300}
                    color="rgba(255, 255, 255, 1)"
                    secondaryColor="rgba(255, 255, 255, 0.42)"
                  />
                )}{" "}
                Submit
              </Button>
            </>
          )}
        </>
      ) : (
        <>
          {selectedItems?.length === 0 && (
            <>
              <h1 className="text-center text-[#fff] text-[15px] font-lato pt-[36px]">
                Create New Collection
              </h1>

              <div
                onClick={() => setOpen(!open)}
                className="w-[81px] h-[36px] bg-[#00000033] flex justify-center items-center cursor-pointer mt-[28px] mx-auto rounded-full"
              >
                <p className="text-[12px] text-[#fff] text-center font-lato">
                  Create
                </p>
              </div>
            </>
          )}
          {selectedItems?.length > 0 && (
            <>
              <h1 className="text-center text-[#fff] text-[15px] font-lato pt-[36px]">
                Create New Collection
              </h1>

              <div
                onClick={() => setOpen(!open)}
                className="w-[81px] h-[36px] bg-[#00000033] flex justify-center items-center cursor-pointer mt-[28px] mx-auto rounded-full"
              >
                <p className="text-[12px] text-[#fff] text-center font-lato">
                  Create
                </p>
              </div>

              {selectedItems?.length === 1 && (
                <>
                  <h1 className="text-center text-[#fff] text-[15px] font-lato pt-[41px]">
                    Rename Collection
                  </h1>

                  <div className="w-[153px] h-[35px] bg-[#00000033] rounded-[12px] flex justify-center items-center mt-[28px] mx-auto">
                    <input
                      type="text"
                      value={collectionName}
                      onChange={(e) => setCollectionName(e.target.value)}
                      className="w-full h-full bg-transparent text-[12px] text-[#939393] text-center font-lato px-[4px] outline-none"
                    />
                    {/* <p className="text-[12px] text-[#939393] text-center font-lato">
                  Select Collection
                </p> */}
                  </div>
                </>
              )}

              <div className="border-t-[1px] border-[#9393931A] max-w-[234px] w-full mx-auto mt-[35px]"></div>

              <h1 className="text-center font-lato text-[#fff] text-[15px] pt-[41px]">
                Hide from profile
              </h1>

              <div className="bg-[#00000033] rounded-[10px] w-[153px] h-[35px] flex justify-between items-center px-[8px] mt-[24px] mx-auto">
                {["Visible", "Hidden"].map((t, i) => (
                  <Button
                    onClick={() => setHideCollection(t)}
                    key={i}
                    className={`hover:shadow-none shadow-none p-0 m-0 normal-case font-lato text-[12px] leading-[14.4px] font-bold w-[58px] h-[27px] ${
                      hideCollection === t
                        ? `${
                            hideCollection === "Visible"
                              ? "bg-[#0AB745]"
                              : "bg-[#FF003D]"
                          } !text-white rounded-[30px]`
                        : "bg-transparent !text-[#C6C6C6]"
                    }`}
                  >
                    {t}
                  </Button>
                ))}
              </div>

              <Button
                onClick={() => handleRemoveCollections()}
                disabled={collectionRemoveIsLoading}
                className={`font-normal normal-case  w-[129px] h-[38px] rounded-[5px] mx-auto mt-[49px] hover:shadow-none shadow-none font-bakbak-one text-[15px] text-[#C4C4C44D] inline-block p-0 leading-normal
            flex justify-center items-center gap-2 ${
              selectedItems?.length > 0
                ? "bg-[#DD2E44] text-[#fff]"
                : "bg-[#484848]"
            }`}
              >
                {collectionRemoveIsLoading && (
                  <SpinnerCircularFixed
                    size={20}
                    thickness={180}
                    speed={300}
                    color="rgba(255, 255, 255, 1)"
                    secondaryColor="rgba(255, 255, 255, 0.42)"
                  />
                )}{" "}
                Delete
              </Button>
              <Button
                onClick={() => handleUpdateCollections()}
                disabled={collectionUpdateIsLoading}
                className="font-normal normal-case bg-[#2924FF] w-[129px] h-[38px] rounded-[5px] mx-auto mt-[15px] hover:shadow-none shadow-none font-bakbak-one text-[15px] text-[#C4C4C4] inline-block p-0 leading-normal flex justify-center items-center gap-2"
              >
                {collectionUpdateIsLoading && (
                  <SpinnerCircularFixed
                    size={20}
                    thickness={180}
                    speed={300}
                    color="rgba(255, 255, 255, 1)"
                    secondaryColor="rgba(255, 255, 255, 0.42)"
                  />
                )}{" "}
                Submit
              </Button>
            </>
          )}
        </>
      )}

      <MediaCenterCreateCollectionModal open={open} close={setOpen} />
    </div>
  );
};

export default MediaCenterSidebarUi;
