import { Link } from "react-router-dom";
import useViewImage from "../../../lib/hooks/useViewImage";
import { useGetTopThreeFavoritesQuery } from "../../../redux/features/wallpapers/wallpapersApi";

const MostFavorited = () => {
  const { viewResizeImg } = useViewImage();
  const { data } = useGetTopThreeFavoritesQuery();

  return (
    <div className="bg-dash-cm-bg rounded-[10px] w-full h-[163px] px-[19px]">
      <h1 className="text-white font-lato text-[15px] font-medium text-center pt-[15px]">
        Most Favorited
      </h1>
      <div className="flex justify-center items-center gap-[10px] mt-[21px] cursor-pointer">
        {data?.data?.map((item, index) => (
          <Link key={index}>
            <div className="flex flex-col justify-center items-center gap-[6px] h-full max-w-[122px] min-w-[122px] w-full">
              <img
                src={viewResizeImg(item?.wallpaper, 122, 60)}
                alt=""
                className="max-w-[122px] min-w-[122px] w-full h-[60px] min-h-[60px] object-cover rounded-[5px] border-[1px] border-transparent hover:border-[1px] hover:border-[#B3FD16] duration-150"
              />
              <h1 className="text-white font-lato text-[15px] font-medium">
                {index + 1}
              </h1>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MostFavorited;
