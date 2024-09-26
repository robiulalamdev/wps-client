import Link from "next/link";
import { useGetTopCategoriesQuery } from "../../../redux/features/wallpapers/wallpapersApi";

// const categories = [
//   "Anime",
//   "Cars",
//   "AI",
//   "Nature",
//   "Fortnite",
//   "Sci-Fi",
//   "Space",
//   "World of...",
//   "Japan",
//   "Overwatch",
//   "Girls",
//   "Background",
// ];
const TopCategories = () => {
  const { data } = useGetTopCategoriesQuery();
  console.log(data);
  return (
    <div className="bg-dash-cm-bg rounded-[10px] w-full h-[268px] max-h-[268px] mt-[11px] px-[20px] pb-[25px]">
      <h1 className="text-white font-lato text-[15px] font-medium text-center pt-[19px]">
        Top Categories
      </h1>
      <div className="grid grid-cols-3 gap-y-[18px] gap-x-[15px] 2xl:gap-x-[35px] mt-[16px]">
        {data?.data?.map((item, index) => (
          <Link
            target="_blank"
            href={`/tags/${item}`}
            key={index}
            className="flex flex-col justify-center items-center gap-[6px] max-w-[103px] w-full px-1 h-[34px] rounded-[5px] bg-[#181818] hover:bg-[#FF001F] duration-150 cursor-pointer"
          >
            <h1 className="text-white font-lato text-[15px] font-medium all_break oneLine !text-center">
              {item}
            </h1>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TopCategories;
