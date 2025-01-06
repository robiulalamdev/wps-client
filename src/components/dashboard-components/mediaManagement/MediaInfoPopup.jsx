/* eslint-disable react/prop-types */
import { Button, Dialog } from "@material-tailwind/react";
import { idashClose } from "../../../utils/icons/dashboard-icons/dashicons";
import LazyWallpaper from "../../common/wallpaper/LazyWallpaper";
import moment from "moment";
import useViewImage from "../../../lib/hooks/useViewImage";
import { iGrayClose, iGrayPlush } from "../../../utils/icons/icons";
import { useMemo, useState } from "react";
import {
  useDeleteMediaWallpapersByIdsMutation,
  useUpdateMediaWallTagByIdMutation,
} from "../../../redux/features/wallpapers/wallpapersApi";
import { toast } from "react-toastify";
import { SpinnerCircularFixed } from "spinners-react";
import { handlePastTags } from "@/lib/services/service";

const MediaInfoPopup = ({ wallpaperInfo, setWallpaperInfo }) => {
  const { formatFileSize } = useViewImage();
  const [tags, setTags] = useState([]);
  const [updateMediaWallTagById, { isLoading }] =
    useUpdateMediaWallTagByIdMutation();
  const [deleteMediaWallpapersByIds, { isLoading: deleteLoading }] =
    useDeleteMediaWallpapersByIdsMutation();

  const [editMod, setEditMod] = useState(false);

  const handleAdd = (e) => {
    e.preventDefault();
    setTags([...tags, e.target.tag.value]);
    e.target.reset();
    setEditMod(true);
  };

  const handleRemoveTag = (index) => {
    const data = [...tags];
    data.splice(index, 1);
    setTags([...data]);
    setEditMod(true);
  };

  const handleClose = () => {
    setTags([]);
    setWallpaperInfo(null);
  };

  const handleSave = async () => {
    if (tags?.length < 3) {
      toast.error("A minimum of 3 tags is required");
      return;
    }
    const options = {
      id: wallpaperInfo?._id,
      data: { tags: tags },
    };
    const result = await updateMediaWallTagById(options);
    if (result?.data?.success) {
      handleClose();
      toast.success("Tags updated successfully");
    } else {
      toast.error("Tags updated unSuccessfully");
    }
  };

  const handleDeleteItems = async () => {
    const options = {
      data: { ids: wallpaperInfo?._id },
    };
    const result = await deleteMediaWallpapersByIds(options);
    if (result?.data?.success) {
      handleClose();
      toast.success("Wallpaper deleted successfully");
    } else {
      toast.error("Wallpaper deleted unSuccessfully");
    }
  };

  useMemo(() => {
    if (wallpaperInfo?.tags?.length > 0) {
      setTags([...wallpaperInfo.tags]);
    }
  }, [wallpaperInfo]);
  // console.log(wallpaperInfo);
  return (
    <Dialog
      open={!!wallpaperInfo?._id}
      className="bg-transparent p-0 shadow-none border-none flex justify-center items-center"
    >
      <div className="min-w-[822px] max-w-[822px] w-full max-h-fit min-h-[451px] bg-[#D5D5D5] rounded-[10px] relative">
        <div className="flex justify-between items-start w-full h-full">
          <div className="max-w-[385px] min-w-[385px] w-full h-full border-r-[1px] border-[#C8C8C8]">
            <div className="w-full h-full min-h-[238px] pt-[20px] pl-[20px]">
              <div
                className={`max-w-[350px] w-full h-[189px] rounded-[5px] overflow-hidden relative`}
              >
                <LazyWallpaper
                  src={wallpaperInfo?.wallpaper}
                  alt={wallpaperInfo?.wallpaper}
                  maxWidth={350}
                  maxHeight={189}
                  width={350}
                  height={189}
                  className="w-full h-full rounded-[5px] object-cover cursor-pointer"
                />
              </div>
            </div>
            <div className="w-full min-h-[213px] h-full border-t-[1px] border-[#C8C8C8] flex flex-col justify-end mb-[40px]">
              <div className="flex justify-center items-center gap-x-[18px] mt-[30px]">
                <Button
                  disabled={isLoading || !editMod}
                  onClick={() => handleSave()}
                  className={`w-[129px] h-[38px] ${
                    editMod ? "bg-[#2924FF]" : "bg-[#2924FF33]"
                  } rounded-[5px] shadow-none hover:shadow-none text-[#C4C4C4] font-bakbak-one text-[15px] font-normal leading-normal p-0 normal-case flex justify-center items-center`}
                >
                  {isLoading && (
                    <SpinnerCircularFixed
                      size={16}
                      thickness={180}
                      speed={300}
                      color="rgba(255, 255, 255, 1)"
                      secondaryColor="rgba(255, 255, 255, 0.42)"
                      style={{ marginRight: "5px", display: "inline" }}
                    />
                  )}{" "}
                  Save Changes
                </Button>
                <Button
                  disabled={deleteLoading}
                  onClick={() => handleDeleteItems()}
                  className="w-[129px] h-[38px] bg-[#FF0000] rounded-[5px] shadow-none hover:shadow-none text-[#C4C4C4] font-bakbak-one text-[15px] font-normal leading-normal p-0 normal-case flex justify-center items-center"
                >
                  {deleteLoading && (
                    <SpinnerCircularFixed
                      size={16}
                      thickness={180}
                      speed={300}
                      color="rgba(255, 255, 255, 1)"
                      secondaryColor="rgba(255, 255, 255, 0.42)"
                      style={{ marginRight: "5px", display: "inline" }}
                    />
                  )}{" "}
                  Delete
                </Button>
              </div>
            </div>
          </div>
          <div className="w-full h-full flex-grow">
            <div className="w-full !min-h-[238px] h-full px-[11px] pt-[19px]">
              <div className="flex items-center gap-x-[3px]">
                <h1 className="text-[15px] font-lato font-bold text-[#313131] leading-normal text-nowrap">
                  Posted By:
                </h1>
                <p className="text-[15px] font-lato text-[#313131] font-normal leading-normal">
                  {wallpaperInfo?.user?.username}
                </p>
              </div>
              <div className="flex items-center gap-x-[3px] mt-[20px]">
                <h1 className="text-[15px] font-lato font-bold text-[#313131] leading-normal text-nowrap">
                  Date Posted:
                </h1>
                <p className="text-[15px] font-lato text-[#313131] font-normal leading-normal">
                  {moment(wallpaperInfo?.createdAt).format("MM/DD/YYYY")}
                </p>
              </div>
              <div className="flex items-center gap-x-[3px] mt-[20px]">
                <h1 className="text-[15px] font-lato font-bold text-[#313131] leading-normal text-nowrap">
                  File name:
                </h1>
                <p className="text-[15px] font-lato text-[#313131] font-normal leading-normal oneLine">
                  {wallpaperInfo?.name}
                </p>
              </div>
              <div className="flex items-center gap-x-[3px] mt-[20px]">
                <h1 className="text-[15px] font-lato font-bold text-[#313131] leading-normal text-nowrap">
                  File Size:
                </h1>
                <p className="text-[15px] font-lato text-[#313131] font-normal leading-normal">
                  {formatFileSize(wallpaperInfo?.size)}
                </p>
              </div>
              <div className="flex items-center gap-x-[3px] mt-[20px]">
                <h1 className="text-[15px] font-lato font-bold text-[#313131] leading-normal text-nowrap">
                  Dimensions:
                </h1>
                <p className="text-[15px] font-lato text-[#313131] font-normal leading-normal">
                  {wallpaperInfo?.dimensions?.width} x{" "}
                  {wallpaperInfo?.dimensions?.height}
                </p>
              </div>
            </div>
            <div className="w-full min-h-[213px] h-full border-t-[1px] border-[#C8C8C8] pl-[10px] pr-[16px] pt-[23px]">
              <h1 className="font-lato font-bold text-[15px] text-[#313131]">
                TAGS
              </h1>
              <div className="mt-[13px] bg-[#313131] rounded-[5px] max-h-[149px] min-h-[149px]">
                <form
                  onSubmit={handleAdd}
                  className="w-full h-[40px] flex justify-between items-center relative"
                >
                  <input
                    type="text"
                    name="tag"
                    onPaste={(e) => {handlePastTags(e, tags, setTags)}}
                    placeholder="Add tags here..."
                    className="placeholder:text-white text-[12px] font-lato placeholder:text-[12px] placeholder:font-lato text-white px-2 w-full h-full outline-none bg-transparent flex-grow"
                  />
                  <button type="submit" className="size-[17px] mr-2">
                    {iGrayPlush}
                  </button>
                </form>
                <div className="px-[10px] !pb-[8px] mt-[2px]">
                  <div className="flex items-start flex-wrap gap-x-[7px] gap-y-[11px] max-h-[100px] overflow-y-auto scrollWhite">
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
            </div>
          </div>
        </div>
        <div
          onClick={() => handleClose()}
          className="absolute top-[10px] right-[13px] cursor-pointer"
        >
          {idashClose}
        </div>
      </div>
    </Dialog>
  );
};

export default MediaInfoPopup;
