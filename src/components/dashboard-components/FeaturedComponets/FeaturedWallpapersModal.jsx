/* eslint-disable react/prop-types */
import { Button, Dialog } from "@material-tailwind/react";
import {
  iDashCopySponsorInfo,
  idashClose,
} from "../../../utils/icons/dashboard-icons/dashicons";
import { useMemo, useState } from "react";
import FeaturedViewWallpaper from "./FeaturedViewWallpaper";
import { handleItemSelection } from "../../../lib/services/service";
import { SpinnerCircularFixed } from "spinners-react";
import { useGetInfoBySlugMutation } from "../../../redux/features/wallpapers/wallpapersApi";
import useInputPattern from "../../../lib/hooks/useInputPattern";
import { toast } from "react-toastify";
import { CLIENT_URL } from "../../../lib/config";

const FeaturedWallpapersModal = ({
  open,
  name = "",
  onClose,
  items = [],
  handleAdd,
  isLoading = false,
}) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [storedItems, setStoredItems] = useState([]);

  const [getInfoBySlug] = useGetInfoBySlugMutation();
  const { handleUrl } = useInputPattern();

  const handleClose = () => {
    setSelectedItems([]);
    setSelectedItems([]);
    onClose(null);
  };

  const handleAddFeatured = async () => {
    const items = await selectedItems.map((currentItem) => {
      return {
        type: "Wallpaper",
        targetId: currentItem?.targetId || "",
        targetType: "Wallpaper",
        serialNo: currentItem?.serialNo || 0,
      };
    });
    const result = await handleAdd(items, "Wallpaper");
    if (result?.data?.success) {
      toast.success("Featured added successfully");
      handleClose();
    } else {
      toast.error("Featured added unSuccessfully");
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

      for (let i = 0; i < 6 - itemsData?.length; i++) {
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

  const handleSelect = async (selectItem = null) => {
    if (selectItem?._id) {
      handleItemSelection(selectedItems, setSelectedItems, selectItem);
    }
  };

  const handleKeyPress = async (e, item = null, index) => {
    const stored = [...storedItems];
    stored[item.no - 1]["load"] = true;
    if (e.key === "Enter" && e.target.value) {
      if (e.target.value.replaceAll(`${CLIENT_URL}/w/`, "")) {
        const options = {
          data: {},
          slug: e.target.value.replaceAll(`${CLIENT_URL}/w/`, ""),
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

  return (
    <Dialog
      open={open}
      className="bg-transparent flex justify-center items-center outline-none border-none shadow-none"
    >
      <div className="bg-[#D5D5D5] min-w-[1001px] max-w-[1001px] max-h-fit min-h-[553px] rounded-[10px] pt-[32px] px-[80px] pb-[30px] relative">
        <h1 className="text-black text-center font-lato text-[25px] leading-normal font-semibold">
          {name}
        </h1>
        <div className="mt-[38px]">
          <div className="grid grid-cols-3 gap-x-[94px] gap-y-[24px]">
            {storedItems?.map((item, index) => (
              <div key={index} className="">
                <FeaturedViewWallpaper
                  key={index}
                  data={item}
                  selectedItems={selectedItems}
                  handleSelect={handleSelect}
                />
                <div className="bg-[#C0C0C0] w-[217px] h-[44px] rounded-[5px] flex items-center gap-[7px] px-[8px] mt-[12px]">
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
            ))}
          </div>
        </div>

        <Button
          disabled={isLoading}
          onClick={() => handleAddFeatured()}
          className={`w-[129px] h-[38px] rounded-[5px] ${
            selectedItems?.length > 0 ? "bg-[#2824ff]" : "bg-[#2924FF33]"
          } shadow-none hover:shadow-none block mx-auto mt-[57px] p-0 text-[15px] text-[#C4C4C4] font-bakbak-one leading-normal normal-case font-normal flex justify-center items-center`}
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

export default FeaturedWallpapersModal;
