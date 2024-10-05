/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { DefaultProfile } from "../../../lib/data/globalData";
import useViewImage from "../../../lib/hooks/useViewImage";

const SingleVerification = ({ item = null, setSelectedItem, selectedItem }) => {
  const { viewResizeImg } = useViewImage();
  return (
    <div
      onClick={() => setSelectedItem(item)}
      className={`h-[103px] w-full flex items-center px-[15px] gap-[15px] border-b-[1px] border-[#222222]
        ${
          selectedItem?._id === item?._id
            ? "claimSelectBg"
            : "hover:bg-[#D9D9D91A] cursor-pointer"
        }
        `}
    >
      <img
        src={
          viewResizeImg(item?.profile?.profile_image, 40, 40) ||
          DefaultProfile.src
        }
        className="w-[40px] h-[40px] rounded-full object-cover"
      />
      <h1 className="text-white font-lato text-[14px] font-normal leading-normal twoLine">
        <p className="font-bold inline">{item?.user?.username}</p> {item?.title}
      </h1>
    </div>
  );
};

export default SingleVerification;
