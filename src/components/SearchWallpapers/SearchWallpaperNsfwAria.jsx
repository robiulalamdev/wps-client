/* eslint-disable react/no-unescaped-entities */
import { Link } from "react-router-dom";
import { iDanger } from "../../utils/icons/icons";

const SearchWallpaperNsfwAria = () => {
  return (
    <div className="bg-[#00000080] rounded-[10px] flex flex-col justify-center items-center h-[633px]">
      <div className="size-[50px] md:size-[85px]">{iDanger}</div>
      <p className="mt-[39px] md:mt-[67px] font-lato text-[10px] md:text-[15px] font-bold text-[#AAA] max-w-[270px] md:max-w-full text-center">
        The NSFW (Not Safe For Work) feature is currently disabled. To re-enable
        it, please navigate to your account settings and, under the "Wallpapers"
        section, activate this setting.
      </p>
      <Link to="/account-settings">
        <div className="mt-[39px] md:mt-[83px] w-[133px] h-[45px] bg-[#000000CC] rounded-[100px] text-[#FFF] text-[12px] md:text-[15px] font-bakbak-one flex justify-center items-center cursor-pointer">
          Settings
        </div>
      </Link>
    </div>
  );
};

export default SearchWallpaperNsfwAria;
