/* eslint-disable react/prop-types */
import {
  Popover,
  PopoverContent,
  PopoverHandler,
} from "@material-tailwind/react";
import { official_brands } from "../../../utils/data/officialBrands";

const SearchOfficialBrandPopover = ({
  handler = () => {},
  placement = "bottom",
}) => {
  return (
    <Popover placement={placement}>
      <PopoverHandler>{handler}</PopoverHandler>
      <PopoverContent className="px-[18px] py-[15px] m-0 border-[1px] border-[#2F2F2F] rounded-[10px] shadow-none max-w-[771px] w-full bg-[#00000059] backdrop-blur h-fit">
        <div>
          <h1 className="font-bold text-white font-lato text-[15px]">
            Popular Brands
          </h1>
          <div className="bg-white h-[4px] rounded-md max-w-[102px] mt-[8px]"></div>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-5 gap-x-[6px] md:gap-x-[12px] gap-y-[9px] md:gap-y-[23px] mt-[13px]">
          {official_brands.slice(0, 10).map((item, index) => (
            <div key={index} className={``}>
              <div
                className={`w-full h-[50px] md:h-[60px] rounded-[3px] md:rounded-[5px] overflow-hidden`}
              >
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full h-full rounded-[3px] md:rounded-[5px] object-cover hover:scale-110 duration-300 cursor-pointer"
                />
              </div>
              <h1 className="font-bold font-lato text-[8px] md:text-[12px] text-white mt-[3px] md:mt-[6px] text-center">
                {item.name}
              </h1>
            </div>
          ))}
        </div>
        <h1 className="text-center font-bold font-lato text-[15px] mt-[22px] mb-[18px] text-white cursor-pointer">
          See all brands
        </h1>
      </PopoverContent>
    </Popover>
  );
};

export default SearchOfficialBrandPopover;
