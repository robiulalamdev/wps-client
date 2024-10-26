/* eslint-disable react/prop-types */
import { Button, Dialog } from "@material-tailwind/react";
import {
  iDashCopySponsorInfo,
  idashClose,
} from "../../../utils/icons/dashboard-icons/dashicons";
import LazyWallpaper from "../../common/wallpaper/LazyWallpaper";
import { useMemo, useState } from "react";
import { CLIENT_URL } from "../../../lib/config";
import useInputPattern from "../../../lib/hooks/useInputPattern";
import { handleItemSelection } from "../../../lib/services/service";
import { SpinnerCircularFixed } from "spinners-react";
import { toast } from "react-toastify";
import { useGetInfoBySlugMutation } from "@/redux/features/wallpapers/wallpapersApi";

const SponsorUpdateModalForWallpaper = ({
  items = [],
  open,
  onClose,
  handleAdd,
  isLoading = false,
  type,
}) => {
  const [getInfoBySlug] = useGetInfoBySlugMutation();

  const [selectedItems, setSelectedItems] = useState([]);
  const [storedItems, setStoredItems] = useState([]);
  const { handleUrl } = useInputPattern();

  const handleClose = () => {
    setSelectedItems([]);
    onClose(null);
  };

  const handleAction = async () => {
    const items = [];
    for (let i = 0; i < storedItems.length; i++) {
      const element = storedItems[i];

      if (element?._id && element?.slug) {
        const newData = {
          type: type,
          targetId: element?.targetId || "",
          targetType: "Wallpaper",
          serialNo: element?.serialNo || 0,
        };
        items.push(newData);
      }
    }

    setSelectedItems(items);
  };

  const handleAddFeatured = async () => {
    const items = [];
    for (let i = 0; i < storedItems.length; i++) {
      const element = storedItems[i];

      if (element?._id && element?.slug) {
        const newData = {
          type: type,
          targetId: element?.targetId || "",
          targetType: "Wallpaper",
          serialNo: element?.serialNo || 0,
        };
        items.push(newData);
      }
    }

    if (items.length > 0) {
      const result = await handleAdd(items, type);
      if (result?.data?.success) {
        toast.success("Sponsor added successfully");
        handleClose();
      } else {
        toast.error("Sponsor added unSuccessfully");
      }
    } else {
      const result = await handleAdd(items, type);
      if (result?.data?.success) {
        toast.success("Sponsor removed successfully");
        handleClose();
      } else {
        toast.error("Sponsor removed unSuccessfully");
      }
    }
  };

  useMemo(() => {
    if (open) {
      const newItems = [];
      const itemsData = [...items]?.reverse();

      for (let i = 0; i < itemsData.length; i++) {
        const element = itemsData[i];
        newItems.push({
          targetId: element?.targetId || "",
          slug: element.slug || "",
          wallpaper: element.wallpaper || "",
          _id: i + 1 || null,
          load: false,
          no: i + 1,
          serialNo: i + 1,
        });
      }

      if (newItems.length === itemsData.length) {
        setSelectedItems([...newItems]);
      }

      for (let i = 0; i < 4 - itemsData?.length; i++) {
        newItems.push({
          targetId: "",
          slug: "",
          wallpaper: "",
          _id: null,
          load: false,
          no: itemsData.length + i + 1,
          serialNo: 0,
        });
      }

      setStoredItems(newItems);
    }
  }, [items, open]);

  const handleKeyPress = async (e, item = null, index) => {
    const stored = [...storedItems];
    stored[item.no - 1]["load"] = true;
    if (e.key === "Enter" && e.target.value) {
      if (e.target.value.replaceAll(`${CLIENT_URL}/w/`, "")) {
        const options = {
          slug: e.target.value.replaceAll(`${CLIENT_URL}/w/`, ""),
          data: {},
        };
        const result = await getInfoBySlug(options);

        if (result?.data?.data?._id) {
          stored[item.no - 1] = {
            targetId: result?.data?.data?._id,
            slug: result?.data?.data?.slug,
            wallpaper: result?.data?.data?.wallpaper,
            load: false,
            _id: item.no,
            no: item.no,
            serialNo: index + 1,
          };
        } else {
          stored[item.no - 1] = {
            targetId: "",
            slug: "",
            wallpaper: "",
            _id: null,
            load: false,
            no: item.no,
            serialNo: 0,
          };
        }
      }
    } else {
      await handleItemSelection(
        selectedItems,
        setSelectedItems,
        stored[item.no - 1]
      );
      stored[item.no - 1] = {
        targetId: "",
        slug: "",
        wallpaper: "",
        _id: null,
        load: false,
        no: item.no,
        serialNo: 0,
      };
    }
    stored[item.no - 1]["load"] = false;
    setStoredItems(stored);
  };

  useMemo(() => {
    if (storedItems?.length > 0) {
      handleAction();
    }
  }, [storedItems]);

  // console.log(storedItems);

  return (
    <Dialog
      open={true}
      className="bg-transparent flex justify-center items-center outline-none border-none shadow-none"
    >
      <div className="bg-[#D5D5D5] min-w-[1001px] max-w-[1001px] max-h-fit min-h-[553px] rounded-[10px] pt-[32px] pr-[35px] pb-[30px] pl-[44px] relative">
        <h1 className="text-black text-center font-lato text-[25px] leading-normal font-semibold">
          {open}
        </h1>
        <div className="mt-[38px]">
          <div className="grid grid-cols-2 gap-x-[56px]">
            {storedItems?.slice(0, 2)?.map((item, index) => (
              <div
                key={index}
                className="flex justify-between gap-x-[16px] items-start"
              >
                <div
                  key={index}
                  className={`max-w-[200px] w-full h-[140px] rounded-[5px] overflow-hidden relative`}
                >
                  {item?.wallpaper && item?.slug ? (
                    <LazyWallpaper
                      src={item?.wallpaper}
                      alt={item?.wallpaper}
                      maxWidth={200}
                      maxHeight={140}
                      width={200}
                      height={140}
                      className="w-full h-full rounded-[5px] object-cover cursor-pointer"
                    />
                  ) : (
                    <div className="w-full h-full rounded-[5px] object-cover cursor-pointer bg-[#00000080]"></div>
                  )}
                </div>
                <div className="pt-[7px] pb-[12px]">
                  {/* <div className="bg-[#C0C0C0] w-[217px] h-[44px] rounded-[5px] flex items-center gap-[7px] px-[8px]">
                    <div>{iDashCopySponsorInfo}</div>
                    <h1 className="font-lato text-[12px] font-medium text-[#323232] leading-normal">
                      Brand Banner
                    </h1>
                  </div> */}
                  <div className="bg-[#C0C0C0] w-[217px] h-[44px] rounded-[5px] flex items-center gap-[7px] px-[8px] mt-[33px]removed">
                    <div>{iDashCopySponsorInfo}</div>
                    <input
                      onKeyPress={(e) => handleKeyPress(e, item, index)}
                      type="url"
                      defaultValue={
                        item?._id ? `${CLIENT_URL}/w/${item?.slug}` : ""
                      }
                      onInput={(e) => handleUrl(e, `${CLIENT_URL}/w/`)}
                      placeholder="Wallpaper URL"
                      required
                      className="w-full h-full bg-transparent border-none outline-none placeholder:font-lato font-lato text-[12px] font-medium placeholder:text-[#323232] text-[#323232] leading-normal"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          {storedItems?.length > 2 && (
            <div className="grid grid-cols-2 gap-x-[56px] border-t-[1px] border-[#9C9C9C] pt-[26px] mt-[21px]">
              {storedItems?.slice(2, 4)?.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between gap-x-[16px] items-start"
                >
                  <div
                    key={index}
                    className={`max-w-[200px] w-full h-[140px] rounded-[5px] overflow-hidden relative`}
                  >
                    {item?.wallpaper && item?.slug ? (
                      <LazyWallpaper
                        src={item?.wallpaper}
                        alt={item?.wallpaper}
                        maxWidth={200}
                        maxHeight={140}
                        width={200}
                        height={140}
                        className="w-full h-full rounded-[5px] object-cover cursor-pointer"
                      />
                    ) : (
                      <div className="w-full h-full rounded-[5px] object-cover cursor-pointer bg-[#00000080]"></div>
                    )}
                  </div>
                  <div className="pt-[7px] pb-[12px]">
                    {/* <div className="bg-[#C0C0C0] w-[217px] h-[44px] rounded-[5px] flex items-center gap-[7px] px-[8px]">
                      <div>{iDashCopySponsorInfo}</div>
                      <h1 className="font-lato text-[12px] font-medium text-[#323232] leading-normal">
                        Brand Banner
                      </h1>
                    </div> */}
                    <div className="bg-[#C0C0C0] w-[217px] h-[44px] rounded-[5px] flex items-center gap-[7px] px-[8px] mt-[33px]removed">
                      <div>{iDashCopySponsorInfo}</div>
                      <input
                        onKeyPress={(e) => handleKeyPress(e, item, index)}
                        type="url"
                        defaultValue={
                          item?._id ? `${CLIENT_URL}/w/${item?.slug}` : ""
                        }
                        onInput={(e) => handleUrl(e, `${CLIENT_URL}/w/`)}
                        placeholder="Wallpaper URL"
                        required
                        className="w-full h-full bg-transparent border-none outline-none placeholder:font-lato font-lato text-[12px] font-medium placeholder:text-[#323232] text-[#323232] leading-normal"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <Button
          disabled={isLoading}
          onClick={() => handleAddFeatured()}
          className={`w-[129px] h-[38px] rounded-[5px] bg-[#2824ff] shadow-none hover:shadow-none block mx-auto mt-[57px] p-0 text-[15px] text-[#C4C4C4] font-bakbak-one leading-normal normal-case font-normal flex justify-center items-center`}
        >
          {" "}
          {isLoading && (
            <SpinnerCircularFixed
              size={16}
              thickness={180}
              speed={300}
              color="rgba(255, 255, 255, 1)"
              secondaryColor="rgba(255, 255, 255, 0.42)"
              style={{ marginRight: "5px" }}
            />
          )}{" "}
          Save Changes
        </Button>
        <div
          onClick={() => handleClose()}
          className="absolute top-[14px] right-[14px] cursor-pointer"
        >
          {idashClose}
        </div>
      </div>
    </Dialog>
  );
};

export default SponsorUpdateModalForWallpaper;
