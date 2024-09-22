/* eslint-disable react/prop-types */
import { Button, Dialog } from "@material-tailwind/react";
import {
  iDashCopySponsorInfo,
  idashClose,
} from "../../../utils/icons/dashboard-icons/dashicons";
import { useMemo, useState } from "react";
import { handleItemSelection } from "../../../lib/services/service";
import { CLIENT_URL } from "../../../lib/config";
import { toast } from "react-toastify";
import useInputPattern from "../../../lib/hooks/useInputPattern";
import useViewImage from "../../../lib/hooks/useViewImage";
import { useGetArtistInfoBySlugMutation } from "../../../redux/features/users/usersApi";
import { SpinnerCircularFixed } from "spinners-react";
import { DefaultProfile } from "../../../lib/data/globalData";

const FeaturedArtistsModal = ({
  open,
  name = "",
  onClose,
  items = [],
  handleAdd,
  isLoading = false,
}) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [storedItems, setStoredItems] = useState([]);
  const { viewResizeImg } = useViewImage();

  const [getArtistInfoBySlug] = useGetArtistInfoBySlugMutation();
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
          type: "Artist",
          targetId: element?.targetId || "",
          targetType: "User",
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
          type: "Artist",
          targetId: element?.targetId || "",
          targetType: "User",
          serialNo: element?.serialNo || 0,
        };
        items.push(newData);
      }
    }
    if (items.length > 0) {
      const result = await handleAdd(items, "Artist");
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
          profile_image: element.profile_image || "",
          slug: element?.slug || "",
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
          profile_image: "",
          slug: "",
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
        const result = await getArtistInfoBySlug(options);
        if (result?.data?.data?._id) {
          stored[item.no - 1] = {
            targetId: result?.data?.data?._id,
            profile_image: result?.data?.data.profile_image || "",
            slug: result?.data?.data?.slug || "",
            load: false,
            _id: item.no,
            no: item.no,
            serialNo: index + 1,
          };
        } else {
          stored[item.no - 1] = {
            targetId: "",
            profile_image: "",
            slug: "",
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
        profile_image: "",
        slug: "",
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

  return (
    <Dialog
      open={open}
      className="bg-transparent flex justify-center items-center outline-none border-none shadow-none"
    >
      <div className="bg-[#D5D5D5] min-w-[1001px] max-w-[1001px] max-h-fit min-h-[553px] rounded-[10px] pt-[32px] px-[107px] pb-[30px] relative">
        <h1 className="text-black text-center font-lato text-[25px] leading-normal font-semibold">
          {name}
        </h1>
        <div className="mt-[38px]">
          <div className="grid grid-cols-2 gap-x-[61px] gap-y-[29px]">
            {storedItems?.map((item, index) => (
              <div key={index} className="flex items-center gap-x-[30px]">
                <div
                  className={`min-w-[90px] max-w-[90px] max-h-[90px] min-h-[90px] bg-[#00000080] rounded-full flex justify-center items-center`}
                >
                  {item?.profile_image && item?.slug && (
                    <img
                      src={viewResizeImg(item?.profile_image, 80, 80)}
                      alt=""
                      className="w-[80px] h-[80px] object-cover rounded-full"
                    />
                  )}
                  {!item?.profile_image && item?.slug && (
                    <img
                      src={DefaultProfile}
                      alt=""
                      className="w-[80px] h-[80px] object-cover rounded-full"
                    />
                  )}
                </div>

                <div className="bg-[#C0C0C0] w-[239px] h-[44px] rounded-[5px] flex items-center gap-[7px] px-[8px]">
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

export default FeaturedArtistsModal;
