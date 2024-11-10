/* eslint-disable react/prop-types */
import { Button, Dialog } from "@material-tailwind/react";
import {
  iDashBrandName,
  iDashCopySponsorInfo,
  idashClose,
} from "../../../utils/icons/dashboard-icons/dashicons";
import { useMemo, useState } from "react";
import LazyWallpaper from "../../common/wallpaper/LazyWallpaper";
import { useGetUserInfoBySlugMutation } from "../../../redux/features/users/usersApi";
import useInputPattern from "../../../lib/hooks/useInputPattern";
import { toast } from "react-toastify";
import { CLIENT_URL } from "../../../lib/config";
import { handleItemSelection } from "../../../lib/services/service";
import { SpinnerCircularFixed } from "spinners-react";

const FeaturedBrandSearchModal = ({
  open,
  name = "",
  onClose,
  items = [],
  handleAdd,
  isLoading = false,
}) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [storedItems, setStoredItems] = useState([]);
  const [getUserInfoBySlug] = useGetUserInfoBySlugMutation();
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
          type: "Brand",
          targetId: element?.targetId || "",
          targetType: "User",
          serialNo: element?.serialNo || 0,
          title: element?.title || "",
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
          type: "Brand",
          targetId: element?.targetId || "",
          targetType: "User",
          serialNo: element?.serialNo || 0,
          title: element?.title || "",
        };
        items.push(newData);
      }
    }

    if (items.length > 0) {
      const result = await handleAdd(items, "Brand");
      if (result?.data?.success) {
        toast.success("Featured added successfully");
        handleClose();
      } else {
        toast.error("Featured added unSuccessfully");
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
          banner: element.banner || "",
          slug: element?.slug || "",
          title: element?.title || "",
          _id: i + 1 || null,
          load: false,
          no: i + 1,
          serialNo: i + 1,
        });
      }

      if (newItems.length === itemsData.length) {
        setSelectedItems([...newItems]);
      }

      for (let i = 0; i < 10 - itemsData?.length; i++) {
        newItems.push({
          targetId: "",
          banner: "",
          slug: "",
          title: "",
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
      if (e.target.value.replaceAll(`${CLIENT_URL}/profiles/`, "")) {
        const options = {
          slug: e.target.value.replaceAll(`${CLIENT_URL}/profiles/`, ""),
          data: {},
        };
        const result = await getUserInfoBySlug(options);
        if (result?.data?.data?._id) {
          stored[item.no - 1] = {
            targetId: result?.data?.data?._id,
            banner: result?.data?.data.banner || "",
            slug: result?.data?.data?.slug || "",
            title: result?.data?.data?.brandName,
            load: false,
            _id: item.no,
            no: item.no,
            serialNo: index + 1,
          };
        } else {
          stored[item.no - 1] = {
            targetId: "",
            banner: "",
            slug: "",
            title: "",
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
        banner: "",
        slug: "",
        title: "",
        _id: null,
        load: false,
        no: item.no,
        serialNo: 0,
      };
    }
    stored[item.no - 1]["load"] = false;
    setStoredItems(stored);
  };

  const handleSetTitleByKeyPress = async (e, item = null) => {
    const stored = [...storedItems];
    stored[item.no - 1]["load"] = true;
    if (e.key === "Enter" && e.target.value) {
      stored[item.no - 1] = { ...stored[item.no - 1], title: e.target.value };
    }
    stored[item.no - 1]["load"] = false;
    setStoredItems(stored);
  };

  useMemo(() => {
    if (storedItems?.length > 0) {
      handleAction();
    }
  }, [storedItems]);

  // console.log(selectedItems);

  const handleSetTitle = async (e, item = null) => {
    const stored = [...storedItems];
    stored[item.no - 1]["load"] = true;
    if (e.target.value) {
      stored[item.no - 1] = { ...stored[item.no - 1], title: e.target.value };
    }
    stored[item.no - 1]["load"] = false;
    setStoredItems(stored);
  };

  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };
  const debouncedSetTitle = debounce(handleSetTitle, 1200);

  return (
    <Dialog
      open={open}
      className="bg-transparent flex justify-center items-center outline-none border-none shadow-none"
    >
      <div className="bg-[#D5D5D5] min-w-[1001px] max-w-[1001px] max-h-fit min-h-[553px] rounded-[10px] pt-[32px] px-[21px] pb-[30px] relative">
        <h1 className="text-black text-center font-lato text-[25px] leading-normal font-semibold">
          {name}
        </h1>
        <div className="mt-[38px]">
          <div className="grid grid-cols-5 gap-x-[15px] gap-y-[18px]">
            {storedItems?.map((item, index) => (
              <div key={index} className="max-w-[180px] w-full">
                <div
                  className={`w-full h-[80px] rounded-[5px] overflow-hidden relative`}
                >
                  {item?.banner && item?.slug ? (
                    <LazyWallpaper
                      src={item?.banner}
                      alt={item?.banner}
                      maxWidth={200}
                      maxHeight={140}
                      width={400}
                      height={140}
                      className="w-full h-full rounded-[5px] object-cover cursor-pointer"
                    />
                  ) : (
                    <div className="w-full h-full rounded-[5px] object-cover cursor-pointer bg-[#00000080]"></div>
                  )}
                </div>

                <div className="bg-[#C0C0C0] w-full h-[35px] rounded-[5px] flex items-center gap-[7px] px-[8px] mt-[9px]">
                  <div>{iDashBrandName}</div>
                  <input
                    onChange={(e) => debouncedSetTitle(e, item)}
                    onKeyPress={(e) => handleSetTitleByKeyPress(e, item)}
                    type="text"
                    defaultValue={item?.title ? item?.title : ""}
                    placeholder="Brand Name"
                    required={true}
                    className="w-full h-full bg-transparent border-none outline-none placeholder:font-lato font-lato text-[12px] font-medium placeholder:text-[#323232] text-[#323232] leading-normal"
                  />
                </div>
                <div className="bg-[#C0C0C0] w-full h-[35px] rounded-[5px] flex items-center gap-[7px] px-[8px] mt-[8px]">
                  <div>{iDashCopySponsorInfo}</div>
                  <input
                    onKeyPress={(e) => handleKeyPress(e, item, index)}
                    type="url"
                    defaultValue={
                      item?._id ? `${CLIENT_URL}/profiles/${item?.slug}` : ""
                    }
                    onInput={(e) => handleUrl(e, `${CLIENT_URL}/profiles/`)}
                    placeholder="Profile url"
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

export default FeaturedBrandSearchModal;
