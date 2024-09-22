import { Link } from "react-router-dom";
import useViewImage from "../../../lib/hooks/useViewImage";
import { useGetMostDownloadedQuery } from "../../../redux/features/wallpapers/wallpapersApi";

const MostDownloaded = () => {
  const { viewResizeImg } = useViewImage();
  const { data } = useGetMostDownloadedQuery();
  return (
    <div className="bg-dash-cm-bg rounded-[10px] w-full h-[277px] max-h-[277px] px-[19px] py-[21px] mt-[19px]">
      <h1 className="text-white font-lato text-[15px] font-medium text-center">
        Most Downloaded
      </h1>
      <div className="grid grid-cols-3 gap-x-[10px] gap-y-[12px] mt-[13px]">
        {data?.data?.map((item, index) => (
          <Link
            target="_blank"
            to={`/w/${item?.slug}`}
            key={index}
            className=""
          >
            <img
              src={viewResizeImg(item?.wallpaper, 122, 60)}
              alt=""
              className="max-w-[122px] w-full h-[60px] object-cover rounded-[5px] border-[1px] border-transparent hover:border-[1px] hover:border-[#B3FD16] duration-150"
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MostDownloaded;
