/* eslint-disable react/prop-types */
import { I_Desktop_Tab, I_Phone_Tab, iRefresh } from "@/utils/icons/icons";
import { Button } from "@material-tailwind/react";
const tabs1 = ["Trending", "New", "Top Wallpapers"];
const tabs2 = ["All", "Illustration", "AI", "Photography"];
const tabs3 = ["Desktop", "Mobile"];

const screen_typeTabs = [
  { name: "Mobile", icon: I_Phone_Tab },
  { name: "Desktop", icon: I_Desktop_Tab },
];

const BannerTab = ({ tab1, setTab1, tab2, setTab2, tab3, setTab3 }) => {
  const handleReset = async () => {
    setTab1("Trending");
    setTab2("All");
    setTab3("Desktop");
  };

  return (
    <div className="py-[10px] md:py-[14px] overflow-hidden">
      <div className="flex items-center justify-between md:justify-start gap-3 md:gap-8">
        <div className="!bg-[#20202033] rounded-[100px] md:rounded-[23.5px] min-w-fit h-[40px] md:w-fit md:h-[42px] flex justify-center items-center gap-x-[10px] md:gap-x-[16px] px-[6px]">
          {tabs1.map((t, i) => (
            <Button
              onClick={() => setTab1(t)}
              key={i}
              className={`hover:shadow-none shadow-none p-0 m-0 normal-case font-lato text-[12px] leading-[14.4px] font-bold w-fit h-[30px] md:w-fit md:h-[33px] min-w-[60px] 
      px-[10px] md:px-[16px]  ${
        tab1 === t
          ? "!bg-[#000000B2] !text-white rounded-[100px] md:rounded-[23.5px]"
          : "bg-transparent !text-[#C6C6C6]"
      }`}
            >
              <span className={`${i === 2 ? "hidden md:inline-block" : ""}`}>
                {t}
              </span>
              <span
                className={`${i === 2 ? "inline-block md:hidden" : "hidden"}`}
              >
                {i === 2 ? "Top" : t}
              </span>
            </Button>
          ))}
        </div>

        <div className="bg-[#20202033] rounded-[100px] md:rounded-[23.5px] h-[40px] w-full md:max-w-[450px] md:h-[42px] md:flex justify-between items-center px-2 hidden md:inline-block">
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

        <div className="bg-[#20202033] rounded-[100px] md:rounded-[23.5px] w-[177px] h-[40px] md:w-[192px] md:h-[42px] lg:flex justify-center items-center hidden lg:inline-block">
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

        <div className="bg-[#20202033] rounded-[100px] md:rounded-[23.5px] w-[102px] h-[40px] md:w-[192px] md:h-[42px] flex justify-center items-center lg:hidden">
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

        <Button
          onClick={() => handleReset()}
          className="shadow-none hover:shadow-none normal-case min-w-[57px] max-w-[57px] h-[42px] bg-[#20202033] rounded-[9px] text-[12px] font-lato font-semibold text-[#FFF] flex justify-center items-center p-0"
        >
          <div className="min-w-[24px] min-h-[24px]">{iRefresh}</div>
        </Button>
      </div>
    </div>
  );
};

export default BannerTab;
