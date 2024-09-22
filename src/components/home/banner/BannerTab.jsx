/* eslint-disable react/prop-types */
import { Button } from "@material-tailwind/react";
const tabs1 = ["Trending", "New"];
const tabs2 = ["All", "Illustration", "AI", "Photography"];

const BannerTab = ({ tab1, setTab1, tab2, setTab2 }) => {
  return (
    <div className="py-[10px] md:py-[14px]">
      <div className="flex items-center justify-between md:justify-start gap-3 md:gap-8">
        <div className="bg-[#00000033] rounded-[100px] md:rounded-[23.5px] w-[177px] h-[40px] md:w-[192px] md:h-[42px] flex justify-center items-center">
          {tabs1.map((t, i) => (
            <Button
              onClick={() => setTab1(t)}
              key={i}
              className={`hover:shadow-none shadow-none p-0 m-0 normal-case font-lato text-[12px] leading-[14.4px] font-bold w-[82px] h-[30px] md:min-w-[88px] md:h-[33px]  ${
                tab1 === t
                  ? "bg-[#000000B2] !text-white rounded-[100px] md:rounded-[23.5px]"
                  : "bg-transparent !text-[#C6C6C6]"
              }`}
            >
              {t}
            </Button>
          ))}
        </div>

        <div className="bg-[#00000033] rounded-[100px] md:rounded-[23.5px] h-[40px] w-full md:max-w-[450px] md:h-[42px] md:flex justify-between items-center px-2 hidden md:inline-block">
          {tabs2.map((t, i) => (
            <Button
              onClick={() => setTab2(t)}
              key={i}
              className={`hover:shadow-none shadow-none p-0 m-0 normal-case font-lato text-[12px] leading-[14.4px] font-bold w-[82px] h-[30px] md:min-w-[88px] md:h-[33px]  ${
                tab2 === t
                  ? "bg-[#000000B2] !text-white rounded-[100px] md:rounded-[23.5px]"
                  : "bg-transparent !text-[#C6C6C6]"
              }`}
            >
              {t}
            </Button>
          ))}
        </div>

        <h1 className="text-white text-[23px] leading-[39px] font-bakbak-one md:hidden font-normal">
          Wallpapers
        </h1>
      </div>
    </div>
  );
};

export default BannerTab;
