/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Button } from "@material-tailwind/react";
import { useMemo, useState } from "react";
import { iBack, iGrayClose, iGrayPlush } from "../../utils/icons/icons";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  useDeleteWallpapersByIdsMutation,
  useUpdateWallpapersMutation,
} from "../../redux/features/wallpapers/wallpapersApi";
import { SpinnerCircularFixed } from "spinners-react";

const DraftPublishSidebarUi = ({
  setOpen,
  selectedImages,
  resetSelect,
  items,
  currentTab,
}) => {
  const [updateWallpapers] = useUpdateWallpapersMutation();
  const [deleteWallpapersByIds] = useDeleteWallpapersByIdsMutation();
  const [selectTab, setSelectTab] = useState("");
  const [typeTab, setTypeTab] = useState("");
  const [classification, setClassification] = useState("");
  const [screenType, setScreenType] = useState("");
  const [tags, setTags] = useState([]);

  const [source, setSource] = useState("");
  const [author, setAuthor] = useState("");

  const [isUpdateLoading, setIsUpdateLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  const handleAdd = (e) => {
    e.preventDefault();
    setTags([...tags, e.target.tag.value]);
    e.target.reset();
  };

  const handleRemoveTag = (index) => {
    const data = [...tags];
    data.splice(index, 1);
    setTags([...data]);
  };

  const handleSelectTab = (t) => {
    setSelectTab(t);
    if (t === "Select All") {
      resetSelect(items);
    } else {
      resetSelect([]);
    }
  };

  const handleUpdate = async (status) => {
    if (!classification) {
      toast.error("Classification is Required");
      return;
    }
    if (!typeTab) {
      toast.error("Type is Required");
      return;
    }
    if (!screenType) {
      toast.error("Screen Type is Required");
      return;
    }
    if (tags?.length < 3) {
      toast.error("A minimum of 3 tags is required");
      return;
    }
    const updatedData = {};

    if (currentTab) {
      updatedData["status"] = status;
    }

    setIsUpdateLoading(true);
    updatedData["type"] = typeTab;
    updatedData["classification"] = classification;
    updatedData["screen_type"] = screenType;
    updatedData["tags"] = tags;
    if (source) {
      updatedData["source"] = source;
    }
    if (author) {
      updatedData["author"] = author;
    }

    const ids = await selectedImages?.map((element) => {
      return element?._id;
    });

    const options = {
      data: { ids: ids, updateData: updatedData },
    };

    const result = await updateWallpapers(options);
    if (result?.data?.success) {
      toast.success(result?.data?.message);
      setTags([]);
      setTypeTab("");
      setClassification("");
      setScreenType("");
      setAuthor("");
      setSource("");
      resetSelect([]);
    } else {
      toast.error(result?.data?.message);
    }
    setIsUpdateLoading(false);
  };

  const handleDelete = async () => {
    setIsDeleteLoading(true);
    const ids = await selectedImages?.map((element) => {
      return element?._id;
    });

    const options = {
      data: { ids: ids },
    };

    const result = await deleteWallpapersByIds(options);
    if (result?.data?.success) {
      toast.success(result?.data?.message);
      resetSelect([]);
    } else {
      toast.error(result?.data?.message);
    }

    setIsDeleteLoading(false);
  };

  useMemo(() => {
    if (selectedImages?.length > 0) {
      if (selectedImages?.length === 1) {
        setTags(selectedImages[0]?.tags);
        setTypeTab(selectedImages[0]?.type);
        setClassification(selectedImages[0]?.classification);
        setScreenType(selectedImages[0]?.screen_type);
        setAuthor(selectedImages[0]?.author);
        setSource(selectedImages[0]?.source);
      } else {
        setTags([]);
        setTypeTab("");
        setClassification("");
        setScreenType("");
        setAuthor("");
        setSource("");
      }
    }
  }, [selectedImages]);

  const isTrue =
    selectedImages?.length > 0 &&
    !!classification &&
    !!typeTab &&
    tags?.length > 2 &&
    !!screenType;

  return (
    <div className="min-w-[295px] max-w-[300px] w-full h-full bg-[#121212] lg:bg-black/20 rounded-[10px] min-h-[986px] max-h-[1020px] pb-[12px] px-[12px] md:px-[30px] relative">
      <div
        onClick={() => setOpen(false)}
        className="absolute top-[18px] right-[25px] lg:hidden"
      >
        {iBack}
      </div>

      <h1 className="text-center font-bakbak-one text-[#FFF] text-[12px] pt-[25px] md:pt-[11px]">
        Select Wallpapers
      </h1>

      {selectedImages?.length > 0 && (
        <>
          <div className="bg-[#00000033] rounded-[8px] w-[240px] h-[36px] flex justify-between items-center px-[8px] mt-[21px]">
            {["Select All", "Clear Selection"].map((t, i) => (
              <Button
                onClick={() => handleSelectTab(t)}
                key={i}
                className={`hover:shadow-none shadow-none p-0 m-0 normal-case font-lato text-[12px] leading-[14.4px] font-bold min-w-[79px] h-[29px] px-2 hover:bg-[#0AB745] hover:!text-[#fff] ${
                  selectTab === t
                    ? `bg-[#0AB745]... !text-[#fff] rounded-[8px]`
                    : "bg-transparent !text-[#C6C6C6]"
                }`}
              >
                {t}
              </Button>
            ))}
          </div>

          <div className="mt-[24px]">
            <h1 className="text-center font-bakbak-one text-[#FFF] text-[12px] pt-[25px] md:pt-[11px]">
              Choose Type
            </h1>

            <div className="bg-[#00000033] rounded-[8px] w-[240px] h-[36px] flex justify-between items-center gap-x-[2px] !px-[8px] mt-[21px]">
              {["Illustration", "AI", "Photography"].map((t, i) => (
                <Button
                  onClick={() => setTypeTab(t)}
                  key={i}
                  className={`hover:shadow-none shadow-none p-0 m-0 normal-case font-lato text-[12px] leading-[14.4px] font-bold min-w-[70px] h-[29px] px-2 ${
                    typeTab === t
                      ? `bg-[#0AB745] !text-[#fff] rounded-[8px]`
                      : "bg-transparent !text-[#C6C6C6]"
                  }`}
                >
                  {t}
                </Button>
              ))}
            </div>
          </div>

          <div className="mt-[32px]">
            <h1 className="text-center font-bakbak-one text-[#FFF] text-[12px] pt-[25px] md:pt-[11px]">
              Classification
            </h1>

            <div className="bg-[#00000033] rounded-[8px] w-[161px] h-[36px] flex justify-between items-center px-[8px] mx-auto mt-[21px]">
              {/* {["SFW", "Risky", "NSFW"].map((t, i) => ( */}
              {["SFW", "NSFW"].map((t, i) => (
                <Button
                  onClick={() => setClassification(t)}
                  key={i}
                  className={`hover:shadow-none shadow-none p-0 m-0 normal-case font-lato text-[12px] leading-[14.4px] font-bold min-w-[59px] h-[29px] px-2 ${
                    classification === t
                      ? `bg-[#0AB745] !text-[#fff] rounded-[8px]`
                      : "bg-transparent !text-[#C6C6C6]"
                  }`}
                >
                  {t}
                </Button>
              ))}
            </div>
          </div>

          <div className="mt-[24px]">
            <h1 className="text-center font-bakbak-one text-[#FFF] text-[12px] pt-[25px] md:pt-[11px]">
              Screen Type
            </h1>

            <div className="bg-[#00000033] rounded-[8px] w-[240px] h-fit min-h-[82px] flex flex-wrap items-start gap-2 px-[7px] py-[6px] mt-[21px]">
              {["Desktop", "Phones", "Tablets", "Handhelds", "Other"].map(
                (t, i) => (
                  <Button
                    onClick={() => setScreenType(t)}
                    key={i}
                    className={`hover:shadow-none shadow-none p-0 m-0 normal-case font-lato text-[12px] leading-[14.4px] font-bold w-fit h-[29px] px-2 ${
                      screenType === t
                        ? `bg-[#0AB745] !text-[#fff] rounded-[8px]`
                        : "bg-transparent !text-[#C6C6C6]"
                    }`}
                  >
                    {t}
                  </Button>
                )
              )}
            </div>
          </div>

          <div className="border-t-[1px] border-[#9393931A] mt-[40px]"></div>
          <h1 className="mt-[12px] text-center font-lato text-[15px] text-[#FFF]">
            TAGS
          </h1>
          <p
            className="text-center font-lato text-[12px] mt-[11px]"
            style={{ color: "rgba(255, 255, 255, 0.50)" }}
          >
            A minimum of 3 tags is required
          </p>

          <div className="mt-[10px] bg-[#00000033] rounded-[8px] ">
            <form
              onSubmit={handleAdd}
              className="w-full h-[40px] flex justify-between items-center relative"
            >
              <input
                type="text"
                name="tag"
                placeholder="Add tags here..."
                className="placeholder:text-[#5C5C5C] text-[12px] font-lato placeholder:text-[12px] placeholder:font-lato text-[#fff] px-2 w-full h-full outline-none bg-transparent flex-grow"
              />
              <button type="submit" className="size-[17px] mr-2">
                {iGrayPlush}
              </button>
            </form>
            <div className="px-[12px] pb-[18px] mt-[5px]">
              <div className="flex items-start flex-wrap gap-x-[7px] gap-y-[11px] max-h-[90px] overflow-y-auto">
                {tags.map((tag, index) => (
                  <div
                    key={index}
                    className="bg-[#00000066] rounded-[5px] relative w-fit h-[28px] px-[16px] flex justify-center items-center cursor-pointer"
                  >
                    <h1 className="text-[#FFF] text-[12px] font-bakbak-one">
                      {tag}
                    </h1>
                    <div
                      onClick={() => handleRemoveTag(index)}
                      className="absolute top-1 right-1"
                    >
                      {iGrayClose}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <h1 className="text-center font-lato text-[15px] text-[#FFF] mt-[9px]">
            Source & Author
          </h1>

          <input
            onChange={(e) => setSource(e.target.value)}
            value={source}
            type="text"
            placeholder="Source (Optional)"
            className="placeholder:text-[#5C5C5C] text-[12px] font-lato placeholder:text-[12px] placeholder:font-lato text-[#fff] px-2 w-full outline-none bg-[#00000033] h-[35px] rounded-[8px] mt-[20px]"
          />
          <input
            onChange={(e) => setAuthor(e.target.value)}
            value={author}
            type="text"
            placeholder="Author (Optional)"
            className="placeholder:text-[#5C5C5C] text-[12px] font-lato placeholder:text-[12px] placeholder:font-lato text-[#fff] px-2 w-full outline-none bg-[#00000033] h-[35px] rounded-[8px] mt-[21px]"
          />

          {currentTab === "Drafts" ? (
            <button
              onClick={() => handleUpdate("Published")}
              disabled={!isTrue}
              className={`w-[129px] h-[38px] rounded-[5px] mt-[29px] text-[15px] font-bakbak-one inline-block mx-auto  ${
                isTrue
                  ? "text-white bg-[#2924FF]"
                  : "text-[#5C5C5C] bg-[#2924FF33]"
              } flex justify-center items-center gap-2`}
            >
              {isUpdateLoading && (
                <SpinnerCircularFixed
                  size={20}
                  thickness={180}
                  speed={300}
                  color="rgba(255, 255, 255, 1)"
                  secondaryColor="rgba(255, 255, 255, 0.42)"
                />
              )}{" "}
              Publish
            </button>
          ) : (
            <button
              onClick={() => handleUpdate("Published")}
              disabled={!isTrue}
              className={`w-[129px] h-[38px] rounded-[5px] mt-[29px] text-[15px] font-bakbak-one inline-block mx-auto ${
                isTrue
                  ? "text-white bg-[#2924FF]"
                  : "text-[#5C5C5C] bg-[#2924FF33]"
              } flex justify-center items-center gap-2`}
            >
              {isUpdateLoading && (
                <SpinnerCircularFixed
                  size={20}
                  thickness={180}
                  speed={300}
                  color="rgba(255, 255, 255, 1)"
                  secondaryColor="rgba(255, 255, 255, 0.42)"
                />
              )}{" "}
              Save Changes
            </button>
          )}

          {/* bg-[#DD2E4433] */}
          <button
            disabled={isDeleteLoading}
            onClick={() => handleDelete()}
            className="w-[129px] h-[38px] bg-[#ef3049] rounded-[5px] mt-[16px] text-[15px] font-bakbak-one inline-block mx-auto text-[#C4C4C4] flex justify-center items-center gap-2"
          >
            {isDeleteLoading && (
              <SpinnerCircularFixed
                size={20}
                thickness={180}
                speed={300}
                color="rgba(255, 255, 255, 1)"
                secondaryColor="rgba(255, 255, 255, 0.42)"
              />
            )}{" "}
            Delete
          </button>
        </>
      )}
    </div>
  );
};

export default DraftPublishSidebarUi;
