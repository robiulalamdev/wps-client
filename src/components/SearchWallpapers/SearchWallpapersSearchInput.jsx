import { iSearch } from "../../utils/icons/icons";
import SearchPopover from "../common/search/SearchPopover";

/* eslint-disable react/prop-types */
const SearchWallpapersSearchInput = ({ handleQuery }) => {
  const handleSearch = async (e) => {
    e.preventDefault();
    handleQuery("search", e.target.search.value);
  };

  return (
    <SearchPopover
      handleQuery={handleQuery}
      placement="bottom"
      handler={
        <form
          onSubmit={handleSearch}
          className="bg-[#00000033] rounded-[10px] h-[45px] max-w-[771px] mx-auto w-full flex justify-center items-center pr-[10px]"
        >
          <div className="text-[#5A5A5A] w-[40px] px-[10px] h-full flex justify-center items-center">
            {iSearch}
          </div>
          <input
            name="search"
            type="text"
            placeholder="Find your next wallpaper..."
            className="text-[#5A5A5A] placeholder:text-[#5A5A5A] text-[15px] bg-transparent w-full h-full flex-grow font-lato outline-none border-none"
          />
        </form>
      }
    ></SearchPopover>
  );
};

export default SearchWallpapersSearchInput;
