/* eslint-disable react/prop-types */
import { iSearch } from "../../utils/icons/icons";
import SearchOfficialBrandPopover from "../../components/common/search/SearchOfficialBrandPopover";

const OfficialBrandSearch = ({ handleQuery }) => {
  const handleSearch = async (e) => {
    e.preventDefault();
    handleQuery("search", e.target.search.value);
  };
  return (
    <>
      <SearchOfficialBrandPopover
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
              type="text"
              name="search"
              placeholder="Search your favorite brand, artist or eSports team"
              className="text-[#5A5A5A] placeholder:text-[#5A5A5A] text-[15px] bg-transparent w-full h-full flex-grow font-lato outline-none border-none"
            />
          </form>
        }
      />
    </>
  );
};

export default OfficialBrandSearch;
