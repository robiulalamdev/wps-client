/* eslint-disable react/prop-types */
import {
  Popover,
  PopoverContent,
  PopoverHandler,
} from "@material-tailwind/react";
import {
  iAdd,
  iAddPlus,
  iAdded,
  iCollectionSolid,
  iGallery,
  iLove,
  iLoveSolid,
} from "../../utils/icons/icons";
import {
  useAddToFavoriteMutation,
  useGetMyFavoritesQuery,
} from "../../redux/features/favorites/favoritesApi";
import { toast } from "react-toastify";
import {
  useGetCollectionListByUserIdQuery,
  useToggleCollectionItemMutation,
} from "../../redux/features/collections/collectionsApi";
import { AuthContext } from "../../contextApi/AuthContext";
import { useContext, useMemo, useRef, useState } from "react";
import MediaCenterCreateCollectionModal from "../media-center/MediaCenterCreateCollectionModal";

const WallpaperFavoriteAndCollection = ({ data }) => {
  const { user } = useContext(AuthContext);
  const [addToFavorite] = useAddToFavoriteMutation();
  const { data: favoriteData } = useGetMyFavoritesQuery();
  const { data: collectionListData } = useGetCollectionListByUserIdQuery({
    userId: user?._id,
    wallpaperId: data?._id,
  });
  const [toggleCollectionItem] = useToggleCollectionItemMutation();
  const [collections, setCollections] = useState([]);
  const [open, setOpen] = useState(false);

  const collectionRef = useRef();

  const handleAddToFavorite = async () => {
    const options = {
      data: { id: data?._id },
    };
    const result = await addToFavorite(options);
    if (result?.data?.success) {
      toast.success(result?.data?.message);
    }
  };

  const handleSearchCollections = async (value) => {
    const stored = [...collectionListData.data.data] || [];
    const result = await collectionListData?.data?.data?.filter((item) =>
      item?.name.toLowerCase().includes(value?.toLowerCase())
    );
    if (value) {
      setCollections(result);
    } else {
      setCollections(stored);
    }
  };

  useMemo(() => {
    if (collectionListData?.data?.data?.length > 0) {
      setCollections(collectionListData?.data?.data);
    }
  }, [collectionListData]);

  const handleToggleCollection = async (id, wallpaperId) => {
    const options = {
      id: id,
      data: { wallpaperId: wallpaperId },
    };
    const result = await toggleCollectionItem(options);
    collectionRef?.current.click();
  };

  const isExist = favoriteData?.data?.find(
    (fav) => fav?.wallpaper?._id === data?._id
  );

  return (
    <>
      <div
        className="absolute top-[21px] lg:top-[21px] right-[22px] lg:right-[27px] grid grid-cols-2 w-[97px] h-[37px] rounded-[5px]"
        style={{ background: "rgba(0, 0, 0, 0.60)" }}
      >
        <Popover placement="bottom-end">
          <PopoverHandler ref={collectionRef}>
            <div className="h-full w-full flex justify-center items-center cursor-pointer">
              {collectionListData?.data?.isExist ? iCollectionSolid : iAdd}
            </div>
          </PopoverHandler>
          <PopoverContent className="min-w-[223px] min-h-[257px] bg-[#000000E5] rounded-[5px] pt-[14px] pr-[19px] pl-[13px] pb-[15px] border-none">
            <div className="flex items-center gap-x-[19px]">
              <input
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearchCollections(e.target.value);
                  }
                }}
                type="text"
                placeholder="Search Collections"
                className="h-[45px] bg-[#FFF] rounded-[5px] outline-none flex-grow w-full px-[8px] min-w-[145px]"
              />
              <div onClick={() => setOpen(!open)} className="cursor-pointer">
                {iAddPlus}
              </div>
            </div>

            {collections?.length > 0 ? (
              <div className="grid grid-cols-1 gap-y-[10px] max-h-[250px] h-fit overflow-y-auto mt-[20px]">
                {collections?.map((item, index) => (
                  <div
                    onClick={() => handleToggleCollection(item?._id, data?._id)}
                    key={index}
                    className="border-b-[1px] border-[#414141] h-9 flex items-center justify-between gap-[6px] cursor-pointer"
                  >
                    <div className="flex items-center gap-[6px]">
                      <div>{iGallery}</div>
                      <h1 className="font-bakbak-one text-[#FFF] hover:text-primary text-[12px]">
                        {item?.name}
                      </h1>
                    </div>
                    {item?.added && (
                      <div className="text-green-600">{iAdded}</div>
                    )}
                  </div>
                ))}

                {/* <div className="border-b-[1px] border-[#414141] h-9 flex items-center gap-[6px]">
                <div>{iGallery}</div>
                <h1 className="font-bakbak-one text-[#FFF] text-[12px]">
                  World of Warcraft
                </h1>
              </div>
              <div className="border-b-[1px] border-[#414141] h-9 flex items-center gap-[6px]">
                <div>{iGallery}</div>
                <h1 className="font-bakbak-one text-[#FFF] text-[12px]">
                  League of Legends
                </h1>
              </div>
              <div className="border-b-[1px] border-[#414141] h-9 flex items-center gap-[6px]">
                <div>{iGallery}</div>
                <h1 className="font-bakbak-one text-[#FFF] text-[12px]">
                  Anime
                </h1>
              </div>
              <div className="h-11 flex items-center gap-[6px]">
                <div>{iGallery}</div>
                <h1 className="font-bakbak-one text-[#FFF] text-[12px]">
                  Landscapes
                </h1>
              </div> */}
              </div>
            ) : (
              <div className="flex justify-center items-center mt-16">
                <h1 className="text-[#fff] font-bakbak-one text-base">
                  No Collections
                </h1>
              </div>
            )}
          </PopoverContent>
        </Popover>
        <div className="h-full w-full flex justify-center items-center">
          <div onClick={() => handleAddToFavorite()} className="cursor-pointer">
            {isExist ? iLoveSolid : iLove}
          </div>
        </div>
      </div>

      <MediaCenterCreateCollectionModal open={open} close={setOpen} />
    </>
  );
};

export default WallpaperFavoriteAndCollection;
