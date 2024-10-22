/* eslint-disable react/prop-types */
import { I_Desktop_Tab, I_Phone_Tab } from "@/utils/icons/icons";
import { Button } from "@material-tailwind/react";
const tabs1 = ["Trending", "New"];
const tabs2 = ["All", "Illustration", "AI", "Photography"];
const tabs3 = ["Desktop", "Mobile"];

const screen_typeTabs = [
  { name: "Mobile", icon: I_Phone_Tab },
  { name: "Desktop", icon: I_Desktop_Tab },
];

const BannerTab = ({ tab1, setTab1, tab2, setTab2, tab3, setTab3 }) => {
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

        <div className="bg-[#00000033] rounded-[100px] md:rounded-[23.5px] w-[177px] h-[40px] md:w-[192px] md:h-[42px] lg:flex justify-center items-center hidden lg:inline-block">
          {tabs3.map((t, i) => (
            <Button
              onClick={() => setTab3(t)}
              key={i}
              className={`hover:shadow-none shadow-none p-0 m-0 normal-case font-lato text-[12px] leading-[14.4px] font-bold w-[82px] h-[30px] md:min-w-[88px] md:h-[33px]  ${
                tab3 === t
                  ? "bg-[#000000B2] !text-white rounded-[100px] md:rounded-[23.5px]"
                  : "bg-transparent !text-[#C6C6C6]"
              }`}
            >
              {t}
            </Button>
          ))}
        </div>
        <div className="bg-[#00000033] rounded-[100px] md:rounded-[23.5px] w-[102px] h-[40px] md:w-[192px] md:h-[42px] flex justify-center items-center lg:hidden">
          {screen_typeTabs.map((t, i) => (
            <Button
              onClick={() => setTab3(t?.name)}
              key={i}
              className={`hover:shadow-none shadow-none p-0 m-0 normal-case font-lato text-[12px] leading-[14.4px] font-bold w-[42px] h-[30px] md:min-w-[42px] md:h-[33px] flex justify-center items-center  ${
                tab3 === t.name
                  ? "bg-[#000000B2] !text-white rounded-[100px] md:rounded-[23.5px]"
                  : "bg-transparent !text-[#C6C6C6]"
              }`}
            >
              {t.icon}
            </Button>
          ))}
        </div>
        {/* <h1 className="text-white text-[23px] leading-[39px] font-bakbak-one md:hidden font-normal">
          Wallpapers
        </h1> */}
      </div>
    </div>
  );
};

export default BannerTab;
