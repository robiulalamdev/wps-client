/* eslint-disable react/prop-types */
import { Button, Dialog } from "@material-tailwind/react";
import {
  iDashCopySponsorInfo,
  idashClose,
} from "../../../utils/icons/dashboard-icons/dashicons";
import LazyWallpaper from "../../common/wallpaper/LazyWallpaper";
import { useGetUserInfoBySlugMutation } from "../../../redux/features/users/usersApi";
import { useMemo, useRef, useState } from "react";
import { CLIENT_URL } from "../../../lib/config";
import useInputPattern from "../../../lib/hooks/useInputPattern";
import { handleItemSelection } from "../../../lib/services/service";
import { SpinnerCircularFixed } from "spinners-react";
import { toast } from "react-toastify";

const SponsorUpdateModal = ({
  items = [],
  open,
  onClose,
  handleAdd,
  isLoading = false,
}) => {
  const [getUserInfoBySlug] = useGetUserInfoBySlugMutation();

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
          type: "Main",
          targetType: "User",
          targetId: element?.userId,
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
          type: "Main",
          targetType: "User",
          targetId: element?.targetId,
          serialNo: element?.serialNo || 0,
        };
        items.push(newData);
      }
    }

    if (Array.isArray(items)) {
      const result = await handleAdd(items, "Main");

      if (result?.data?.success) {
        toast.success("Sponsor added successfully");
        handleClose();
      } else {
        toast.error("Sponsor added unSuccessfully");
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
          banner: element.banner || "",
          slug: element?.slug || "",
          targetId: element?.userId,
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
          banner: "",
          slug: "",
          targetId: null,
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
    // if (e.key === "Enter" && e.target.value) {
    if (e.target.value) {
      if (e.target.value.replaceAll(`${CLIENT_URL}/profiles/`, "")) {
        const options = {
          slug: e.target.value.replaceAll(`${CLIENT_URL}/profiles/`, ""),
          data: {},
        };
        const result = await getUserInfoBySlug(options);

        if (result?.data?.data?._id) {
          stored[item.no - 1] = {
            banner: result?.data?.data.banner || "",
            slug: result?.data?.data?.slug || "",
            targetId: result?.data?.data?._id,
            load: false,
            _id: item.no,
            no: item.no,
            serialNo: index + 1,
          };
        } else {
          stored[item.no - 1] = {
            banner: "",
            slug: "",
            targetId: null,
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
        banner: "",
        slug: "",
        targetId: null,
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

  const typingTimeouts = useRef({});

  const handleInputChange = (e, item, index) => {
    if (typingTimeouts.current[index]) {
      clearTimeout(typingTimeouts.current[index]);
    }

    typingTimeouts.current[index] = setTimeout(() => {
      handleKeyPress(e, item, index);
    }, 1200); // Delay of 1200ms (1.2 seconds); adjust as needed
  };

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
                  {item?.banner && item?.slug ? (
                    <LazyWallpaper
                      src={item?.banner}
                      alt={item?.banner}
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
                      onBlur={(e) => handleKeyPress(e, item, index)}
                      onChange={(e) => handleInputChange(e, item, index)}
                      type="url"
                      defaultValue={
                        item?._id ? `${CLIENT_URL}/profiles/${item?.slug}` : ""
                      }
                      onInput={(e) => handleUrl(e, `${CLIENT_URL}/profiles/`)}
                      placeholder="Profile URL"
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
                    {item?.banner && item?.slug ? (
                      <LazyWallpaper
                        src={item?.banner}
                        alt={item?.banner}
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
                        onBlur={(e) => handleKeyPress(e, item, index)}
                        onChange={(e) => handleInputChange(e, item, index)}
                        type="url"
                        defaultValue={
                          item?._id
                            ? `${CLIENT_URL}/profiles/${item?.slug}`
                            : ""
                        }
                        onInput={(e) => handleUrl(e, `${CLIENT_URL}/profiles/`)}
                        placeholder="Profile URL"
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
          className={`w-[129px] h-[38px] rounded-[5px] !bg-[#2824ff] ${
            selectedItems?.length > 0 ? "bg-[#2824ff]D" : "bg-[#2924FF33]D"
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

export default SponsorUpdateModal;
